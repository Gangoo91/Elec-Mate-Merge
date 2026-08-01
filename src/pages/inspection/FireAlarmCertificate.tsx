/**
 * FireAlarmCertificate.tsx
 * Fire Alarm System Certificate (BS 5839)
 * For installation, commissioning, and periodic testing
 *
 * Features:
 * - 8-layer auto-save via useReportSync
 * - Draft recovery dialog
 * - PDF generation with email & quote/invoice creation
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAppReview } from '@/hooks/useAppReview';
import { useParams, useNavigate } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { maybePromptLogBook } from '@/utils/fireAlarmLogBookPrompt';
import { reportCloud } from '@/utils/reportCloud';
import { draftStorage } from '@/utils/draftStorage';
import {
  createQuoteFromCertificate,
  createInvoiceFromCertificate,
} from '@/utils/certificateToQuote';
import { supabase } from '@/integrations/supabase/client';
import { trackFeatureUse } from '@/components/ActivityTracker';
import { formatFireAlarmJson } from '@/utils/fireAlarmG2JsonFormatter';
import { useCertificateEmail } from '@/hooks/useCertificateEmail';
import { EmailCertificateDialog } from '@/components/certificate-completion/EmailCertificateDialog';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';

import FireAlarmFormTabs from '@/components/inspection/fire-alarm/FireAlarmFormTabs';
import CertShellHeader from '@/components/inspection/shared/CertShellHeader';
import { useFireAlarmTabs, type FireAlarmTabValue } from '@/hooks/useFireAlarmTabs';
import { getDefaultFireAlarmFormData } from '@/types/fire-alarm';
import { useFireAlarmSmartForm } from '@/hooks/inspection/useFireAlarmSmartForm';
import CertificateGenerationDialog from '@/components/inspection/CertificateGenerationDialog';
import { useReportSync } from '@/hooks/useReportSync';
import { useCertLock } from '@/hooks/useCertLock';
import CertLockBar from '@/components/inspection/CertLockBar';
import { cn } from '@/lib/utils';
import { generateCertificateNumber } from '@/utils/certificateNumbering';

const REPORT_TYPE = 'fire-alarm' as const;

const FA_STEPS = [
  { id: 'client', label: 'Client' },
  { id: 'system', label: 'System' },
  { id: 'zones', label: 'Zones' },
  { id: 'equipment', label: 'Equipment' },
  { id: 'declarations', label: 'Sign off' },
];

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function FireAlarmCertificate() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { recordPositiveAction } = useAppReview();

  const isNew = id === 'new' || !id;

  // State
  const [formData, setFormData] = useState<Record<string, any>>(getDefaultFireAlarmFormData());
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showGenerationDialog, setShowGenerationDialog] = useState(false);
  const [generatedPdfUrl, setGeneratedPdfUrl] = useState<string | null>(null);
  const [pdfFilename, setPdfFilename] = useState('FireAlarm-Certificate.pdf');
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(!isNew);
  const [savedReportId, setSavedReportId] = useState<string | null>(
    id !== 'new' ? id || null : null
  );
  const [showRecoveryDialog, setShowRecoveryDialog] = useState(false);
  const [recoveryDraft, setRecoveryDraft] = useState<{
    data: Record<string, any>;
    lastModified: Date;
  } | null>(null);

  // ─── Report sync (replaces all custom sync code) ──────────────────────
    // Lock + versioning (ELE-1037). enabled:!isLocked below gates autosave.
  const {
    isLocked,
    lockedAt,
    editVersion,
    lockReport: lockReportBase,
    amendReport,
    databaseId,
    openReport,
    hasVersions,
  } = useCertLock({
    reportId: savedReportId,
    onAmended: (newId) => navigate(`/electrician/inspection-testing/fire-alarm/${newId}`),
  });

const {
    status: syncStatus,
    saveNow,
    syncNowImmediate,
    hasRecoverableDraft,
    recoverDraft,
    discardDraft,
    onTabChange: syncOnTabChange,
    activeConflict,
    resolveConflict,
  } = useReportSync({
    reportId: savedReportId,
    reportType: REPORT_TYPE,
    formData,
    enabled: !isLoading && !isLocked,
    isHydrating: isLoading, // Gate autosave while loading from cloud — prevents blank-overwrite race.
    onReportCreated: (newId) => {
      setSavedReportId(newId);
      window.history.replaceState(null, '', `/electrician/inspection-testing/fire-alarm/${newId}`);
    },
  });

  // Issue & Lock — flush pending edits first, then lock.
  const lockReport = useCallback(async () => {
    try {
      await syncNowImmediate?.();
    } catch {
      /* best-effort flush */
    }
    await lockReportBase();
  }, [syncNowImmediate, lockReportBase]);

  // Hooks for tabs
  const tabProps = useFireAlarmTabs(formData);

  // Smart form hook for company branding
  const { loadCompanyBranding, hasSavedCompanyBranding } = useFireAlarmSmartForm();

  // Company profile for email
  const { companyProfile } = useCompanyProfile();

  // General site photos (Photos section) live in the inspection_photos table —
  // nothing writes them into formData.photos, so fetch them before formatting.
  const [generalPhotoUrls, setGeneralPhotoUrls] = useState<string[]>([]);

  const fetchGeneralPhotoUrls = useCallback(async (): Promise<string[]> => {
    if (!savedReportId) return [];
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return [];
      const { data: reportRow } = await supabase
        .from('reports')
        .select('id')
        .eq('report_id', savedReportId)
        .eq('user_id', user.id)
        .maybeSingle();
      if (!reportRow?.id) return [];
      const { data: photoRows } = await supabase
        .from('inspection_photos')
        .select('photo_url')
        .eq('report_id', reportRow.id)
        .eq('item_id', 'general-photos')
        .order('created_at');
      return (photoRows || []).map((p: any) => p.photo_url).filter(Boolean);
    } catch {
      return [];
    }
  }, [savedReportId]);

  // Build the formatter input: cert number fallback + company branding + photos.
  // Shared by Generate and Email so both produce the same PDF payload.
  const buildPdfFormData = useCallback(
    (photos: string[]): Record<string, any> => {
      let merged: Record<string, any> = {
        ...formData,
        certificateNumber: formData.certificateNumber || `FA-${Date.now()}`,
        photos: [...(Array.isArray(formData.photos) ? formData.photos : []), ...photos],
      };

      if (hasSavedCompanyBranding) {
        const branding = loadCompanyBranding();
        if (branding) {
          merged = {
            ...merged,
            companyLogo: branding.companyLogo || merged.companyLogo,
            companyName: branding.companyName || merged.companyName || merged.installerCompany,
            companyAddress: branding.companyAddress || merged.companyAddress,
            companyPhone: branding.companyPhone || merged.companyPhone,
            companyEmail: branding.companyEmail || merged.companyEmail,
            accentColor: branding.accentColor || merged.accentColor,
            registrationSchemeLogo:
              branding.registrationSchemeLogo || merged.registrationSchemeLogo,
            registrationScheme: branding.registrationScheme || merged.registrationScheme,
          };
        }
      }

      return merged;
    },
    [formData, hasSavedCompanyBranding, loadCompanyBranding]
  );

  // Auto-generate certificate number for new certs
  useEffect(() => {
    if (!isNew || formData.certificateNumber) return;
    generateCertificateNumber('fire-alarm').then((num) => {
      setFormData((prev) => ({ ...prev, certificateNumber: num }));
    });
  }, [isNew]);

  // Track certificate opened
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) trackFeatureUse(user.id, 'certificate_opened', { type: 'fire-alarm' });
    });
  }, []);

  // Email state
  const [showEmailDialog, setShowEmailDialog] = useState(false);

  // Formatted payload for email — built while the dialog is open so the edge
  // function can generate + attach a fresh PDF (avoids the pre-Generate 422
  // and stale pdf_payload after post-Generate edits).
  const emailFormattedData = useMemo(() => {
    if (!showEmailDialog) return undefined;
    try {
      return formatFireAlarmJson(buildPdfFormData(generalPhotoUrls));
    } catch {
      return undefined; // fall back to server-side pdf_payload
    }
  }, [showEmailDialog, buildPdfFormData, generalPhotoUrls]);

  // Email hook
  const { sendCertificateEmail, isLoading: isEmailSending } = useCertificateEmail({
    certificateType: 'fire-alarm',
    reportId: savedReportId || '',
    certificateNumber: formData.certificateNumber,
    clientName: formData.clientName,
    clientEmail: formData.clientEmail,
    installationAddress: formData.premisesAddress,
    inspectionDate: formData.commissioningDate,
    companyName: companyProfile?.company_name,
    formattedData: emailFormattedData,
  });

  // Check for recoverable draft on mount
  useEffect(() => {
    if (isNew && hasRecoverableDraft) {
      const draft = draftStorage.loadDraft(REPORT_TYPE, null);
      if (draft) {
        setRecoveryDraft(draft);
        setShowRecoveryDialog(true);
      }
    }
  }, [isNew, hasRecoverableDraft]);

  // Load existing report or local draft
  useEffect(() => {
    const loadReport = async () => {
      if (!isNew && id) {
        try {
          const {
            data: { user: authUser },
          } = await supabase.auth.getUser();
          if (!authUser) {
            setIsLoading(false);
            return;
          }

          const localDraft = draftStorage.loadDraft(REPORT_TYPE, id);
          const report = await reportCloud.getReportData(id, authUser.id);

          if (report) {
            if (localDraft && draftStorage.isLocalDraftNewer(REPORT_TYPE, id, report.updated_at)) {
              setFormData({ ...getDefaultFireAlarmFormData(), ...localDraft.data });
              toast.info('Loaded local changes (newer than cloud)');
            } else {
              setFormData({ ...getDefaultFireAlarmFormData(), ...report });
            }
          } else if (localDraft) {
            setFormData({ ...getDefaultFireAlarmFormData(), ...localDraft.data });
            toast.info('Loaded from local storage');
          }
        } catch (error) {
          console.error('[FireAlarm] Failed to load report:', error);
          const localDraft = draftStorage.loadDraft(REPORT_TYPE, id);
          if (localDraft) {
            setFormData({ ...getDefaultFireAlarmFormData(), ...localDraft.data });
            toast.warning('Loaded from local backup (cloud unavailable)');
          } else {
            toast.error('Failed to load certificate');
          }
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    loadReport();
  }, [id, isNew]);

  // Update form field
  const handleUpdate = useCallback((field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  // Handle draft recovery
  const handleRecoverDraft = () => {
    if (recoveryDraft) {
      setFormData({ ...getDefaultFireAlarmFormData(), ...recoveryDraft.data });
      toast.success('Draft recovered');
    } else {
      const recovered = recoverDraft();
      if (recovered) {
        setFormData({ ...getDefaultFireAlarmFormData(), ...recovered });
        toast.success('Draft recovered');
      }
    }
    setShowRecoveryDialog(false);
    setRecoveryDraft(null);
  };

  const handleDiscardDraft = () => {
    discardDraft();
    setShowRecoveryDialog(false);
    setRecoveryDraft(null);
  };

  // Manual save draft (explicit user action)
  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      const result = await saveNow();
      if (result.success) {
        toast.success('Saved to cloud');
      } else {
        toast.error('Cloud save failed - saved locally');
      }
    } catch (error) {
      console.error('[FireAlarm] Save failed:', error);
      toast.error('Cloud save failed - saved locally');
    } finally {
      setIsSaving(false);
    }
  };

  // Pre-generation validation
  const getMissingFields = () => {
    const missing: { field: string; tab: string }[] = [];
    if (!formData.clientName) missing.push({ field: 'Client Name', tab: 'client' });
    if (!formData.premisesAddress) missing.push({ field: 'Premises Address', tab: 'client' });
    if (!formData.systemCategory) missing.push({ field: 'System Category', tab: 'system' });
    if (!formData.systemMake) missing.push({ field: 'Panel Make', tab: 'system' });
    if (!formData.installerSignature) missing.push({ field: 'Installer Signature', tab: 'declarations' });
    if (!formData.overallResult) missing.push({ field: 'Overall Result', tab: 'declarations' });
    return missing;
  };

  // Generate certificate PDF
  const handleGenerateCertificate = async () => {
    const missing = getMissingFields();
    if (missing.length > 0) {
      const fieldList = missing.map((m) => m.field).join(', ');
      toast.error(`Missing required fields: ${fieldList}`);
      // Navigate to the first tab with missing fields
      const firstTab = missing[0].tab;
      tabProps.setCurrentTab(firstTab);
      return;
    }

    setIsGenerating(true);
    setGeneratedPdfUrl(null);
    setGenerationError(null);
    setShowGenerationDialog(true);
    try {
      await syncNowImmediate();

      // Pull general site photos from inspection_photos so they reach the PDF
      const generalPhotos = await fetchGeneralPhotoUrls();
      setGeneralPhotoUrls(generalPhotos);

      const dataWithCertNumber = buildPdfFormData(generalPhotos);

      const pdfData = formatFireAlarmJson(dataWithCertNumber);

      // Save formatted payload for email/reports page reuse
      if (savedReportId) {
        await supabase
          .from('reports')
          .update({ pdf_payload: pdfData })
          .eq('report_id', savedReportId);
      }

      const { data: functionData, error: functionError } = await supabase.functions.invoke(
        'generate-fire-alarm-pdf',
        {
          body: { formData: pdfData },
        }
      );

      if (functionError) {
        throw new Error(functionError.message || 'Failed to generate PDF');
      }

      if (!functionData?.success || !functionData?.pdfUrl) {
        throw new Error(functionData?.error || 'No PDF URL returned');
      }

      const { generatePdfFilename } = await import('@/utils/pdfFilenameGenerator');
      const filename = generatePdfFilename(
        'FireAlarm',
        formData.certificateNumber || 'FA',
        formData.clientName || 'Client',
        formData.commissioningDate || new Date()
      );

      setGeneratedPdfUrl(functionData.pdfUrl);
      setPdfFilename(filename);

      // ELE-413: Save pdf_url to reports table and persist to Supabase Storage
      if (savedReportId) {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        let permanentPdfUrl = functionData.pdfUrl;
        if (user) {
          try {
            const { saveCertificatePdf } = await import('@/utils/certificate-pdf-storage');
            const { permanentUrl, storagePath } = await saveCertificatePdf(
              functionData.pdfUrl,
              user.id,
              savedReportId,
              formData.certificateNumber
            );
            permanentPdfUrl = permanentUrl;

            await supabase
              .from('reports')
              .update({ storage_path: storagePath })
              .eq('report_id', savedReportId);
          } catch (storageErr) {
            console.warn('[FireAlarm] Permanent PDF storage failed, using temp URL:', storageErr);
          }
        }

        await supabase
          .from('reports')
          .update({
            pdf_url: permanentPdfUrl,
            pdf_generated_at: new Date().toISOString(),
            status: 'completed',
          })
          .eq('report_id', savedReportId);
      }

      toast.success('Certificate generated successfully');
      maybePromptLogBook(formData, navigate);
      recordPositiveAction();
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Failed to generate certificate';
      setGenerationError(msg);
      toast.error(msg);
    } finally {
      setIsGenerating(false);
    }
  };

  // Navigate to quote builder
  const handleCreateQuote = () => {
    const url = createQuoteFromCertificate({
      clientName: formData.clientName || '',
      clientEmail: formData.clientEmail || '',
      clientPhone: formData.clientTelephone || '',
      clientAddress: formData.clientAddress || '',
      installationAddress: formData.premisesAddress || '',
      certificateType: 'Fire Alarm',
      certificateReference: formData.certificateNumber || '',
      reportId: savedReportId || undefined,
    });
    navigate(url);
  };

  // Navigate to invoice builder
  const handleCreateInvoice = () => {
    const url = createInvoiceFromCertificate({
      clientName: formData.clientName || '',
      clientEmail: formData.clientEmail || '',
      clientPhone: formData.clientTelephone || '',
      clientAddress: formData.clientAddress || '',
      installationAddress: formData.premisesAddress || '',
      certificateType: 'Fire Alarm',
      certificateReference: formData.certificateNumber || '',
      reportId: savedReportId || undefined,
      pdfUrl: generatedPdfUrl || formData.pdfUrl || formData.pdf_url || undefined,
    });
    navigate(url);
  };

  // Email handler
  const handleSendEmail = async (email: string, cc?: string[], message?: string) => {
    try {
      await syncNowImmediate();
      await sendCertificateEmail({
        recipientEmail: email,
        cc,
        customMessage: message,
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to send email');
      throw error;
    }
  };

  if (isLoading) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-elec-yellow" />
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Recovery Dialog */}
      <AlertDialog open={showRecoveryDialog} onOpenChange={setShowRecoveryDialog}>
        <AlertDialogContent className="max-w-[90vw] sm:max-w-md bg-[#111114] border border-white/[0.08] rounded-2xl shadow-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white text-base font-bold">Recover unsaved work?</AlertDialogTitle>
            <AlertDialogDescription className="text-white text-sm">
              We found an unsaved fire alarm certificate from{' '}
              {recoveryDraft?.lastModified.toLocaleString()}.
              {recoveryDraft?.data?.clientName && (
                <span className="block mt-2 font-medium text-elec-yellow">
                  Client: {recoveryDraft.data.clientName}
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col gap-2 sm:flex-col sm:space-x-0">
            <AlertDialogAction onClick={handleRecoverDraft} className="w-full h-11 rounded-xl bg-elec-yellow font-semibold text-black hover:bg-elec-yellow/90 active:scale-[0.98] transition-all touch-manipulation">Recover draft</AlertDialogAction>
            <AlertDialogCancel onClick={handleDiscardDraft} className="w-full h-11 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white font-medium hover:bg-white/[0.08] active:scale-[0.98] transition-all touch-manipulation mt-0">Start fresh</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Shell header — fixed bar with progress ring + full-width step tabs */}
      <CertShellHeader
        onBack={() => navigate(-1)}
        title="Fire alarm installation"
        subtitle={formData.certificateNumber ? `${formData.certificateNumber} · BS 5839-1` : null}
        isSaving={isSaving}
        onManualSave={handleSaveDraft}
        syncStatus={syncStatus}
        progressPercent={tabProps.getProgressPercentage()}
        steps={FA_STEPS}
        currentTab={tabProps.currentTab}
        onTabChange={(tab) => {
          tabProps.setCurrentTab(tab as FireAlarmTabValue);
          syncOnTabChange();
          window.scrollTo({ top: 0 });
        }}
        completedTabs={{
          client: !!tabProps.isTabComplete('client'),
          system: !!tabProps.isTabComplete('system'),
          zones: !!tabProps.isTabComplete('zones'),
          equipment: !!tabProps.isTabComplete('equipment'),
          declarations: !!tabProps.isTabComplete('declarations'),
        }}
      />

      {/* Main Content - Edge-to-edge on mobile, padded on desktop */}
      {/* ELE-1037 — lock / version bar */}
      <CertLockBar
        isLocked={isLocked}
        lockedAt={lockedAt}
        editVersion={editVersion}
        canIssue={!isLocked && !!savedReportId}
        onLock={lockReport}
        onAmend={amendReport}
        databaseId={databaseId}
        hasVersions={hasVersions}
        onOpenVersion={openReport}
      />

      <main className="-mx-3 px-4 py-4 pb-36 sm:mx-auto sm:px-4 lg:max-w-[1600px] lg:px-8">
        <div className={cn(isLocked && 'pointer-events-none select-none opacity-95')} aria-disabled={isLocked || undefined}>
        <FireAlarmFormTabs
          currentTab={tabProps.currentTab}
          onTabChange={(tab) => {
            tabProps.setCurrentTab(tab);
            syncOnTabChange();
          }}
          canAccessTab={tabProps.canAccessTab}
          formData={formData}
          onUpdate={handleUpdate}
          savedReportId={savedReportId}
          tabNavigationProps={{
            currentTab: tabProps.currentTab,
            currentTabIndex: tabProps.currentTabIndex,
            totalTabs: tabProps.tabs.length,
            canNavigateNext: tabProps.canNavigateNext,
            canNavigatePrevious: tabProps.canNavigatePrevious,
            navigateNext: tabProps.navigateNext,
            navigatePrevious: tabProps.navigatePrevious,
            getProgressPercentage: tabProps.getProgressPercentage,
            isCurrentTabComplete: tabProps.isCurrentTabComplete,
            onGenerateCertificate: handleGenerateCertificate,
            canGenerateCertificate: !isGenerating,
            whatsApp: {
              type: 'fire-alarm',
              id: savedReportId || id || 'new',
              recipientPhone: formData.clientTelephone || '',
              recipientName: formData.clientName || '',
              documentLabel: 'Fire Alarm Certificate',
            },
          }}
          onGenerateCertificate={handleGenerateCertificate}
          onCreateInvoice={handleCreateInvoice}
          onSaveDraft={handleSaveDraft}
          canGenerateCertificate={!isGenerating}
          onOpenEmailDialog={() => {
            setShowEmailDialog(true);
            // Refresh general photos so the emailed PDF includes them
            fetchGeneralPhotoUrls().then(setGeneralPhotoUrls);
          }}
          canEmail={!!savedReportId}
        />
      </div>
      </main>

      {/* Email Certificate Dialog */}
      <EmailCertificateDialog
        open={showEmailDialog}
        onOpenChange={setShowEmailDialog}
        certificateType="Fire Alarm"
        certificateNumber={formData.certificateNumber}
        clientName={formData.clientName}
        clientEmail={formData.clientEmail}
        installationAddress={formData.premisesAddress}
        inspectionDate={formData.commissioningDate}
        companyName={companyProfile?.company_name}
        onSend={handleSendEmail}
        isLoading={isEmailSending}
      />

      <CertificateGenerationDialog
        open={showGenerationDialog}
        onOpenChange={setShowGenerationDialog}
        isGenerating={isGenerating}
        pdfUrl={generatedPdfUrl}
        pdfFilename={pdfFilename}
        errorMessage={generationError}
        documentLabel="Certificate"
      />

    </div>
  );
}
