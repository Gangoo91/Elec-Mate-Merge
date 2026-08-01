/**
 * PATTestingCertificate.tsx
 * PAT Testing Certificate (IET Code of Practice)
 * Portable Appliance Test Register/Log
 *
 * Features:
 * - 8-layer auto-save: 2s debounced localStorage → 3s cloud → visibilitychange → Capacitor → beforeunload → SW Background Sync → 30s backup
 * - Email certificate via Resend
 * - PDF generation via PDF Monkey
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
import { reportCloud } from '@/utils/reportCloud';
import { draftStorage } from '@/utils/draftStorage';
import {
  createQuoteFromCertificate,
  createInvoiceFromCertificate,
} from '@/utils/certificateToQuote';
import { supabase } from '@/integrations/supabase/client';
import { trackFeatureUse } from '@/components/ActivityTracker';

import PATTestingFormTabs from '@/components/inspection/pat-testing/PATTestingFormTabs';
import CertShellHeader from '@/components/inspection/shared/CertShellHeader';
import { usePATTestingTabs, PATTestingTabValue } from '@/hooks/usePATTestingTabs';
import { getDefaultPATTestingFormData, Appliance } from '@/types/pat-testing';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { formatPATTestingJson } from '@/utils/patTestingJsonFormatter';
import { useCertificateEmail } from '@/hooks/useCertificateEmail';
import { EmailCertificateDialog } from '@/components/certificate-completion/EmailCertificateDialog';
import CertificateGenerationDialog from '@/components/inspection/CertificateGenerationDialog';
import { useReportSync } from '@/hooks/useReportSync';
import { useCertLock } from '@/hooks/useCertLock';
import CertLockBar from '@/components/inspection/CertLockBar';
import { cn } from '@/lib/utils';
import { ConflictResolutionDialog } from '@/components/inspection/ConflictResolutionDialog';

// ─── Constants ───────────────────────────────────────────────────────────────
const REPORT_TYPE = 'pat-testing' as const;

export default function PATTestingCertificate() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { recordPositiveAction } = useAppReview();

  const isNew = id === 'new' || !id;

  // ─── State ───────────────────────────────────────────────────────────────
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [formData, setFormData] = useState<any>(getDefaultPATTestingFormData());
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showGenerationDialog, setShowGenerationDialog] = useState(false);
  const [generatedPdfUrl, setGeneratedPdfUrl] = useState<string | null>(null);
  const [pdfFilename, setPdfFilename] = useState('PAT-Certificate.pdf');
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(!isNew);
  const [savedReportId, setSavedReportId] = useState<string | null>(
    id !== 'new' ? id || null : null
  );
  const [showEmailDialog, setShowEmailDialog] = useState(false);

  // Per-appliance test sheet state
  const [activeApplianceId, setActiveApplianceId] = useState<string | null>(null);
  const [copiedApplianceData, setCopiedApplianceData] = useState<Partial<Appliance> | null>(null);

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
    onAmended: (newId) => navigate(`/electrician/inspection-testing/pat-testing/${newId}`),
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
      window.history.replaceState(null, '', `/electrician/inspection-testing/pat-testing/${newId}`);
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

  // ─── Draft recovery state ────────────────────────────────────────────
  const [showRecoveryDialog, setShowRecoveryDialog] = useState(false);
  const [recoveryDraft, setRecoveryDraft] = useState<{
    data: Record<string, unknown>;
    lastModified: Date;
  } | null>(null);

  // Track certificate opened
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) trackFeatureUse(user.id, 'certificate_opened', { type: 'pat-testing' });
    });
  }, []);

  // Check for recoverable draft on mount
  useEffect(() => {
    if (isNew && hasRecoverableDraft) {
      const draft = draftStorage.loadDraft(REPORT_TYPE, null);
      if (draft) {
        setRecoveryDraft(draft as { data: Record<string, unknown>; lastModified: Date });
        setShowRecoveryDialog(true);
      }
    }
  }, [isNew, hasRecoverableDraft]);

  const handleRecoverDraft = () => {
    if (recoveryDraft) {
      setFormData({ ...getDefaultPATTestingFormData(), ...recoveryDraft.data });
      toast.success('Draft recovered');
    } else {
      const recovered = recoverDraft();
      if (recovered) {
        setFormData({ ...getDefaultPATTestingFormData(), ...recovered });
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

  // Hooks for tabs
  const tabProps = usePATTestingTabs(formData);

  // Company profile for branding
  const { companyProfile } = useCompanyProfile();

  // Check if company branding is available
  const hasSavedCompanyBranding = !!(
    companyProfile?.company_name ||
    companyProfile?.logo_url ||
    companyProfile?.logo_data_url
  );

  // ─── Load company branding for PDF ──────────────────────────────────────
  const loadCompanyBranding = useCallback(() => {
    if (!companyProfile) return null;

    const fullAddress = companyProfile.company_postcode
      ? `${companyProfile.company_address || ''}, ${companyProfile.company_postcode}`
      : companyProfile.company_address || '';

    return {
      companyLogo: companyProfile.logo_data_url || companyProfile.logo_url || '',
      companyName: companyProfile.company_name || '',
      companyAddress: fullAddress,
      companyPhone: companyProfile.company_phone || '',
      companyEmail: companyProfile.company_email || '',
      companyAccentColor: companyProfile.primary_color || '#3b82f6',
      companyTagline: ((companyProfile as Record<string, unknown>).company_tagline as string) || '',
      companyWebsite: ((companyProfile as Record<string, unknown>).company_website as string) || '',
      registrationSchemeLogo:
        companyProfile.scheme_logo_data_url || companyProfile.registration_scheme_logo || '',
      registrationScheme: companyProfile.registration_scheme || '',
      registrationNumber: companyProfile.registration_number || '',
    };
  }, [companyProfile]);

  // ─── Email hook ──────────────────────────────────────────────────────────
  // Formatted payload for the email path so send-certificate-resend can
  // generate + attach the PDF even before the user ever taps Generate
  // (without it, a pre-Generate email 422s — no pdf_payload exists yet).
  const emailFormattedData = useMemo(() => {
    try {
      const branding = hasSavedCompanyBranding ? loadCompanyBranding() : null;
      return formatPATTestingJson(formData, branding || undefined);
    } catch {
      return undefined; // fall back to server-side pdf_payload
    }
  }, [formData, hasSavedCompanyBranding, loadCompanyBranding]);

  const { sendCertificateEmail, isLoading: isEmailSending } = useCertificateEmail({
    certificateType: 'pat-testing',
    reportId: savedReportId || '',
    certificateNumber: formData.certificateNumber,
    clientName: formData.clientName,
    clientEmail: formData.clientEmail,
    installationAddress: formData.siteAddress,
    inspectionDate: formData.testDate,
    companyName: companyProfile?.company_name,
    formattedData: emailFormattedData,
  });

  // ─── Load existing report ───────────────────────────────────────────────
  useEffect(() => {
    const loadReport = async () => {
      if (!isNew && id) {
        try {
          const {
            data: { user },
          } = await supabase.auth.getUser();
          if (!user) return;

          // Check for local draft first
          const localDraft = draftStorage.loadDraft(REPORT_TYPE, id);
          const report = await reportCloud.getReportByReportId(id, user.id);

          let loadedData: typeof formData | null = null;

          if (localDraft && report) {
            const isLocalNewer = draftStorage.isLocalDraftNewer(REPORT_TYPE, id, report.updated_at);

            if (isLocalNewer) {
              console.log('[PAT] Loading from local draft (newer than cloud)');
              loadedData = { ...getDefaultPATTestingFormData(), ...localDraft.data };
            } else {
              console.log('[PAT] Loading from cloud (newer than local)');
              loadedData = { ...getDefaultPATTestingFormData(), ...report.data };
            }
          } else if (report && report.data) {
            console.log('[PAT] Loading from cloud');
            loadedData = { ...getDefaultPATTestingFormData(), ...report.data };
          } else if (localDraft) {
            console.log('[PAT] Loading from local draft (no cloud data)');
            loadedData = { ...getDefaultPATTestingFormData(), ...localDraft.data };
          }

          if (loadedData) {
            setFormData(loadedData);
          }
        } catch (error) {
          console.error('Failed to load report:', error);

          const fallbackDraft = draftStorage.loadDraft(REPORT_TYPE, id);
          if (fallbackDraft) {
            console.log('[PAT] Loading from local draft (cloud failed)');
            setFormData({ ...getDefaultPATTestingFormData(), ...fallbackDraft.data });
          } else {
            toast.error('Failed to load certificate');
          }
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadReport();
  }, [id, isNew]);

  // ─── Update form field ──────────────────────────────────────────────────
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUpdate = useCallback((field: string, value: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  // ─── Manual save draft ──────────────────────────────────────────────────
  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      const result = await saveNow();
      if (result.success) {
        toast.success('Draft saved');
      } else {
        toast.error('Failed to save draft');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to save draft');
    } finally {
      setIsSaving(false);
    }
  };

  // ─── Generate certificate PDF ───────────────────────────────────────────
  const handleGenerateCertificate = async () => {
    setIsGenerating(true);
    setGeneratedPdfUrl(null);
    setGenerationError(null);
    setShowGenerationDialog(true);
    try {
      // Sync latest data to cloud before PDF generation
      await syncNowImmediate();

      // Get company branding
      const branding = hasSavedCompanyBranding ? loadCompanyBranding() : null;

      // Prepare PDF data using dedicated formatter
      const pdfData = formatPATTestingJson(formData, {
        companyLogo: branding?.companyLogo,
        companyName: branding?.companyName,
        companyAddress: branding?.companyAddress,
        companyPhone: branding?.companyPhone,
        companyEmail: branding?.companyEmail,
        companyTagline: branding?.companyTagline,
        companyAccentColor: branding?.companyAccentColor,
        companyWebsite: branding?.companyWebsite,
        registrationScheme: branding?.registrationScheme,
        registrationNumber: branding?.registrationNumber,
        registrationSchemeLogo: branding?.registrationSchemeLogo,
      });

      // Save formatted payload for email/reports page reuse
      if (savedReportId) {
        await supabase
          .from('reports')
          .update({ pdf_payload: pdfData })
          .eq('report_id', savedReportId);
      }

      // Debug log
      console.log('[PAT] PDF payload keys:', Object.keys(pdfData));
      console.log('[PAT] Client details:', pdfData.client_details);
      console.log('[PAT] Appliances count:', pdfData.appliances?.length);
      console.log('[PAT] Summary:', pdfData.summary);

      // Call edge function
      const { data: functionData, error: functionError } = await supabase.functions.invoke(
        'generate-pat-testing-pdf',
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

      // Download the PDF
      const { generatePdfFilename } = await import('@/utils/pdfFilenameGenerator');
      const filename = generatePdfFilename(
        'PAT',
        formData.certificateNumber || 'PAT',
        formData.clientName || 'Client',
        formData.testDate || new Date()
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
            console.warn('[PAT] Permanent PDF storage failed, using temp URL:', storageErr);
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
      recordPositiveAction();
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Failed to generate certificate';
      setGenerationError(msg);
      toast.error(msg);
    } finally {
      setIsGenerating(false);
    }
  };

  // ─── Email handler ──────────────────────────────────────────────────────
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

  // ─── Navigate to quote builder ──────────────────────────────────────────
  const handleCreateQuote = () => {
    const url = createQuoteFromCertificate({
      clientName: formData.clientName || '',
      clientEmail: formData.clientEmail || '',
      clientPhone: formData.clientTelephone || '',
      clientAddress: formData.clientAddress || '',
      installationAddress: formData.siteAddress || '',
      certificateType: 'PAT Testing',
      certificateReference: formData.certificateNumber || '',
      reportId: savedReportId || undefined,
    });
    navigate(url);
  };

  // ─── Navigate to invoice builder ────────────────────────────────────────
  const handleCreateInvoice = () => {
    const url = createInvoiceFromCertificate({
      clientName: formData.clientName || '',
      clientEmail: formData.clientEmail || '',
      clientPhone: formData.clientTelephone || '',
      clientAddress: formData.clientAddress || '',
      installationAddress: formData.siteAddress || '',
      certificateType: 'PAT Testing',
      certificateReference: formData.certificateNumber || '',
      reportId: savedReportId || undefined,
      pdfUrl: generatedPdfUrl || formData.pdfUrl || formData.pdf_url || undefined,
    });
    navigate(url);
  };

  // ─── Loading state ──────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-elec-yellow" />
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Draft Recovery Dialog */}
      <AlertDialog open={showRecoveryDialog} onOpenChange={setShowRecoveryDialog}>
        <AlertDialogContent className="max-w-[90vw] sm:max-w-md bg-[#111114] border border-white/[0.08] rounded-2xl shadow-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white text-base font-bold">Recover unsaved work?</AlertDialogTitle>
            <AlertDialogDescription className="text-white text-sm">
              We found an unsaved PAT Testing certificate from{' '}
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
        title="PAT Testing"
        subtitle={formData.certificateNumber ? `${formData.certificateNumber} · IET CoP` : null}
        isSaving={isSaving}
        onManualSave={handleSaveDraft}
        syncStatus={syncStatus}
        progressPercent={tabProps.getProgressPercentage()}
        steps={[
          { id: 'client', label: 'Client' },
          { id: 'appliances', label: 'Items' },
          { id: 'declarations', label: 'Sign off' },
        ]}
        currentTab={tabProps.currentTab}
        onTabChange={(tab) => {
          tabProps.setCurrentTab(tab as PATTestingTabValue);
          syncOnTabChange();
          window.scrollTo({ top: 0 });
        }}
        completedTabs={{
          client: !!tabProps.isTabComplete('client'),
          appliances: !!tabProps.isTabComplete('appliances'),
          declarations: !!tabProps.isTabComplete('declarations'),
        }}
      />

      {/* Main Content */}
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
        <PATTestingFormTabs
          currentTab={tabProps.currentTab}
          onTabChange={(tab) => {
            tabProps.setCurrentTab(tab);
            syncOnTabChange();
          }}
          canAccessTab={tabProps.canAccessTab}
          formData={formData}
          onUpdate={handleUpdate}
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
            onOpenEmailDialog: () => {
              if (!savedReportId) {
                toast.error('Please save the certificate first before emailing.');
                return;
              }
              setShowEmailDialog(true);
            },
            whatsApp: {
              type: 'pat-testing',
              id: savedReportId || id || 'new',
              recipientPhone: formData.clientTelephone || '',
              recipientName: formData.clientName || '',
              documentLabel: 'PAT Testing Certificate',
            },
          }}
          onGenerateCertificate={handleGenerateCertificate}
          onCreateInvoice={handleCreateInvoice}
          onSaveDraft={handleSaveDraft}
          canGenerateCertificate={!isGenerating}
          activeApplianceId={activeApplianceId}
          onOpenAppliance={setActiveApplianceId}
          onCloseAppliance={() => setActiveApplianceId(null)}
          copiedApplianceData={copiedApplianceData}
          onCopyApplianceData={setCopiedApplianceData}
        />
      </div>
      </main>

      {/* Email Certificate Dialog */}
      <EmailCertificateDialog
        open={showEmailDialog}
        onOpenChange={setShowEmailDialog}
        certificateType="PAT Testing"
        certificateNumber={formData.certificateNumber}
        clientName={formData.clientName}
        clientEmail={formData.clientEmail}
        installationAddress={formData.siteAddress}
        inspectionDate={formData.testDate}
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

      <ConflictResolutionDialog conflict={activeConflict} onResolve={resolveConflict} />
    </div>
  );
}
