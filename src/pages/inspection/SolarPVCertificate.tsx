/**
 * SolarPVCertificate.tsx
 * Solar PV Installation Certificate (MCS Compliance)
 * For MCS-certified solar PV installations per BS EN 62446 + BS 7671
 *
 * Features:
 * - 8-layer auto-save via useReportSync
 * - Draft recovery dialog
 * - PDF generation with Part P notification
 * - Smart auto-fill from Business Settings
 */

import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppReview } from '@/hooks/useAppReview';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { formatSolarPVJson } from '@/utils/solarPVJsonFormatter';
import { createNotificationFromCertificate } from '@/utils/notificationHelper';

import SolarPVFormTabs from '@/components/inspection/solar-pv/SolarPVFormTabs';
import CertShellHeader from '@/components/inspection/shared/CertShellHeader';
import { useSolarPVTabs, SolarPVTabValue } from '@/hooks/useSolarPVTabs';
import { getDefaultSolarPVFormData, SolarPVFormData } from '@/types/solar-pv';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import CertificateGenerationDialog from '@/components/inspection/CertificateGenerationDialog';
import { useReportSync } from '@/hooks/useReportSync';
import { ConflictResolutionDialog } from '@/components/inspection/ConflictResolutionDialog';
import { useCertLock } from '@/hooks/useCertLock';
import CertLockBar from '@/components/inspection/CertLockBar';
import { cn } from '@/lib/utils';

const REPORT_TYPE = 'solar-pv' as const;

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function SolarPVCertificate() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { recordPositiveAction } = useAppReview();

  const isNew = id === 'new' || !id;

  // State
  const [formData, setFormData] = useState<SolarPVFormData>(getDefaultSolarPVFormData());
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showGenerationDialog, setShowGenerationDialog] = useState(false);
  const [generatedPdfUrl, setGeneratedPdfUrl] = useState<string | null>(null);
  const [pdfFilename, setPdfFilename] = useState('SolarPV-Certificate.pdf');
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(!isNew);
  const [savedReportId, setSavedReportId] = useState<string | null>(
    id !== 'new' ? id || null : null
  );

  // Email dialog state
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [emailRecipient, setEmailRecipient] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  // Lock + versioning (ELE-1037). enabled:!isLocked below gates autosave;
  // lockReport is wrapped after useReportSync to flush pending edits first.
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
    onAmended: (newId) => navigate(`/electrician/inspection-testing/solar-pv/${newId}`),
  });
  const [showRecoveryDialog, setShowRecoveryDialog] = useState(false);
  const [recoveryDraft, setRecoveryDraft] = useState<{ data: any; lastModified: Date } | null>(
    null
  );

  // ─── Report sync (replaces all custom sync code) ──────────────────────
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
      window.history.replaceState(null, '', `/electrician/inspection-testing/solar-pv/${newId}`);
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
  const tabProps = useSolarPVTabs(formData);

  // Company profile for branding
  const { companyProfile } = useCompanyProfile();

  // Track certificate opened
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) trackFeatureUse(user.id, 'certificate_opened', { type: 'solar-pv' });
    });
  }, []);

  // Check if company branding is available
  const hasSavedCompanyBranding = !!(
    companyProfile?.company_name ||
    companyProfile?.logo_url ||
    companyProfile?.logo_data_url
  );

  // Load company branding for PDF
  const loadCompanyBranding = () => {
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
      companyAccentColor: companyProfile.primary_color || '#f59e0b',
      registrationSchemeLogo:
        companyProfile.scheme_logo_data_url || companyProfile.registration_scheme_logo || '',
      registrationScheme: companyProfile.registration_scheme || '',
    };
  };

  // Auto-fill installer declaration from company profile on new certs
  useEffect(() => {
    if (!isNew || !companyProfile || formData.installerDeclaration?.installerCompany) return;
    const fullAddress = companyProfile.company_postcode
      ? `${companyProfile.company_address || ''}, ${companyProfile.company_postcode}`
      : companyProfile.company_address || '';
    setFormData((prev: any) => ({
      ...prev,
      installerDeclaration: {
        ...prev.installerDeclaration,
        installerCompany:
          companyProfile.company_name || prev.installerDeclaration?.installerCompany || '',
        installerPhone:
          companyProfile.company_phone || prev.installerDeclaration?.installerPhone || '',
        installerEmail:
          companyProfile.company_email || prev.installerDeclaration?.installerEmail || '',
        installerAddress: fullAddress || prev.installerDeclaration?.installerAddress || '',
        installerDate:
          prev.installerDeclaration?.installerDate || new Date().toISOString().split('T')[0],
      },
    }));
  }, [isNew, companyProfile]);

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

          // Check if local draft is newer than cloud
          const localDraft = draftStorage.loadDraft(REPORT_TYPE, id);
          const report = await reportCloud.getReportData(id, authUser.id);

          if (report) {
            // Check if we have a newer local version
            if (localDraft && draftStorage.isLocalDraftNewer(REPORT_TYPE, id, report.updated_at)) {
              setFormData({ ...getDefaultSolarPVFormData(), ...localDraft.data });
              toast.info('Loaded local changes (newer than cloud)');
            } else {
              setFormData({ ...getDefaultSolarPVFormData(), ...report });
            }
          } else if (localDraft) {
            // No cloud data but have local draft
            setFormData({ ...getDefaultSolarPVFormData(), ...localDraft.data });
            toast.info('Loaded from local storage');
          }
        } catch (error) {
          console.error('[SolarPV] Failed to load report:', error);
          // Try to load from local storage as fallback
          const localDraft = draftStorage.loadDraft(REPORT_TYPE, id);
          if (localDraft) {
            setFormData({ ...getDefaultSolarPVFormData(), ...localDraft.data });
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
    setFormData((prev: SolarPVFormData) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  // Handle draft recovery
  const handleRecoverDraft = () => {
    if (recoveryDraft) {
      setFormData({ ...getDefaultSolarPVFormData(), ...recoveryDraft.data });
      toast.success('Draft recovered');
    } else {
      const recovered = recoverDraft();
      if (recovered) {
        setFormData({ ...getDefaultSolarPVFormData(), ...recovered });
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
      console.error('[SolarPV] Save failed:', error);
      toast.error('Cloud save failed - saved locally');
    } finally {
      setIsSaving(false);
    }
  };

  // Fetch this report's uploaded photos (inspection_photos table) so they
  // reach the formatter — the Sign off tab uploads via useInspectionPhotos,
  // which stores rows against the report's database uuid, not formData.photos.
  const fetchReportPhotos = async (): Promise<
    { id: string; url: string; caption: string; category: string }[]
  > => {
    if (!savedReportId) return [];
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return [];
      // Resolve the database uuid the same way useInspectionPhotos does
      const { data: reportRow } = await supabase
        .from('reports')
        .select('id')
        .eq('report_id', savedReportId)
        .eq('user_id', user.id)
        .maybeSingle();
      const dbId = reportRow?.id || savedReportId;
      const { data: photoRows } = await supabase
        .from('inspection_photos')
        .select('id, photo_url, caption')
        .eq('report_id', dbId)
        .order('created_at');
      return (photoRows || []).map((p: any) => ({
        id: p.id,
        url: p.photo_url,
        caption: p.caption || '',
        category: 'general',
      }));
    } catch (err) {
      console.warn('[SolarPV] Failed to fetch report photos:', err);
      return [];
    }
  };

  // Open the email dialog (prefill from client email)
  const handleEmailCertificate = () => {
    if (!savedReportId) {
      toast.error('Please save the certificate first before emailing.');
      return;
    }
    if (formData.clientEmail) setEmailRecipient(formData.clientEmail);
    setShowEmailDialog(true);
  };

  // Send the certificate by email via send-certificate-resend
  const handleSendEmail = async () => {
    if (!emailRecipient || !emailRecipient.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }
    setIsSendingEmail(true);
    try {
      // Send the formatted payload so the function can generate + attach the
      // PDF even when the user emails before ever tapping Generate.
      let formattedData: Record<string, unknown> | undefined;
      try {
        const photos = await fetchReportPhotos();
        formattedData = formatSolarPVJson({
          ...formData,
          certificateNumber: formData.certificateNumber || `SPV-${Date.now()}`,
          photos,
        } as any);
      } catch {
        formattedData = undefined; // fall back to server-side pdf_payload
      }
      const { data: result, error: fnError } = await supabase.functions.invoke(
        'send-certificate-resend',
        { body: { reportId: savedReportId, recipientEmail: emailRecipient, formattedData } }
      );
      if (fnError) {
        let errorMessage = fnError.message;
        try {
          const parsed = JSON.parse(fnError.message);
          errorMessage = parsed.error || parsed.message || fnError.message;
        } catch {
          /* keep */
        }
        if (fnError.context?.body) {
          try {
            const bodyError =
              typeof fnError.context.body === 'string'
                ? JSON.parse(fnError.context.body)
                : fnError.context.body;
            if (bodyError.error) errorMessage = bodyError.error;
          } catch {
            /* keep */
          }
        }
        throw new Error(errorMessage);
      }
      if (!result?.success) throw new Error(result?.error || 'Failed to send');
      toast.success(
        result?.pdfAttached
          ? `Certificate emailed to ${emailRecipient} with the PDF attached`
          : `Certificate emailed to ${emailRecipient}`
      );
      setShowEmailDialog(false);
      setEmailRecipient('');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to send certificate email.');
    } finally {
      setIsSendingEmail(false);
    }
  };

  // Generate certificate PDF
  const handleGenerateCertificate = async () => {
    setIsGenerating(true);
    setGeneratedPdfUrl(null);
    setGenerationError(null);
    setShowGenerationDialog(true);
    try {
      await syncNowImmediate();

      // Generate certificate number if not set
      let dataWithCertNumber = {
        ...formData,
        certificateNumber: formData.certificateNumber || `SPV-${Date.now()}`,
      };

      // Merge company branding from Business Settings if available
      if (hasSavedCompanyBranding) {
        const branding = loadCompanyBranding();
        if (branding) {
          dataWithCertNumber = {
            ...dataWithCertNumber,
            companyLogo: branding.companyLogo || dataWithCertNumber.companyLogo,
            companyName:
              branding.companyName ||
              dataWithCertNumber.companyName ||
              dataWithCertNumber.installerCompany,
            companyAddress: branding.companyAddress || dataWithCertNumber.companyAddress,
            companyPhone: branding.companyPhone || dataWithCertNumber.companyPhone,
            companyEmail: branding.companyEmail || dataWithCertNumber.companyEmail,
            accentColor: branding.companyAccentColor || dataWithCertNumber.accentColor,
            registrationSchemeLogo:
              branding.registrationSchemeLogo || dataWithCertNumber.registrationSchemeLogo,
            registrationScheme:
              branding.registrationScheme || dataWithCertNumber.registrationScheme,
          };
        }
      }

      // Auto-resolve scheme logo if scheme is set but logo is missing or is a placeholder SVG
      const schemeName = dataWithCertNumber.registrationScheme;
      const currentLogo = dataWithCertNumber.registrationSchemeLogo || '';
      const isPlaceholderLogo =
        !currentLogo || currentLogo.length < 2000 || currentLogo.includes('image/svg+xml');
      if (schemeName && schemeName !== 'none' && schemeName !== 'other' && isPlaceholderLogo) {
        try {
          const { getSchemeInfo } = await import('@/constants/schemeLogos');
          const info = getSchemeInfo(schemeName);
          if (info) {
            const resp = await fetch(info.logoPath);
            const blob = await resp.blob();
            const dataUrl = await new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result as string);
              reader.onerror = reject;
              reader.readAsDataURL(blob);
            });
            dataWithCertNumber = { ...dataWithCertNumber, registrationSchemeLogo: dataUrl };
          }
        } catch (err) {
          console.warn('[SolarPV] Failed to resolve scheme logo:', err);
        }
      }

      // Inject uploaded photos so the template's photos page renders
      const photos = await fetchReportPhotos();

      // Format data for PDF generation using MCS compliant formatter
      const pdfData = formatSolarPVJson({ ...dataWithCertNumber, photos } as any);

      // Call edge function
      const { data: functionData, error: functionError } = await supabase.functions.invoke(
        'generate-solar-pv-pdf',
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
        'SolarPV',
        formData.certificateNumber || 'SPV',
        formData.clientName || 'Client',
        formData.commissioningDate || new Date()
      );

      setGeneratedPdfUrl(functionData.pdfUrl);
      setPdfFilename(filename);

      // Save pdf_url to reports table and create Part P notification
      if (savedReportId) {
        // Solar PV is always Part P notifiable (new circuit to dwelling)
        const {
          data: { user },
        } = await supabase.auth.getUser();

        // ELE-413: Save PDF to permanent Supabase Storage (PDFMonkey URLs expire in 7 days)
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
            console.warn('[SolarPV] Permanent PDF storage failed, using temp URL:', storageErr);
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

        if (user) {
          await createNotificationFromCertificate(savedReportId, 'solar-pv', formData, user.id);
        }
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

  // Navigate to quote builder
  const handleCreateQuote = () => {
    const url = createQuoteFromCertificate({
      clientName: formData.clientName || '',
      clientEmail: formData.clientEmail || '',
      clientPhone: formData.clientPhone || '',
      clientAddress: formData.clientAddress || '',
      installationAddress: formData.installationAddress || formData.clientAddress || '',
      certificateType: 'Solar PV',
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
      clientPhone: formData.clientPhone || '',
      clientAddress: formData.clientAddress || '',
      installationAddress: formData.installationAddress || formData.clientAddress || '',
      certificateType: 'Solar PV',
      certificateReference: formData.certificateNumber || '',
      reportId: savedReportId || undefined,
      pdfUrl: generatedPdfUrl || formData.pdfUrl || formData.pdf_url || undefined,
    });
    navigate(url);
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
            <AlertDialogTitle className="text-white text-base font-bold">
              Recover unsaved work?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-white text-sm">
              We found an unsaved Solar PV certificate from{' '}
              {recoveryDraft?.lastModified.toLocaleString()}.
              {recoveryDraft?.data?.clientName && (
                <span className="block mt-2 font-medium text-elec-yellow">
                  Client: {recoveryDraft.data.clientName}
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col gap-2 sm:flex-col sm:space-x-0">
            <AlertDialogAction
              onClick={handleRecoverDraft}
              className="w-full h-11 rounded-xl bg-elec-yellow font-semibold text-black hover:bg-elec-yellow/90 active:scale-[0.98] transition-all touch-manipulation"
            >
              Recover draft
            </AlertDialogAction>
            <AlertDialogCancel
              onClick={handleDiscardDraft}
              className="w-full h-11 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white font-medium hover:bg-white/[0.08] active:scale-[0.98] transition-all touch-manipulation mt-0"
            >
              Start fresh
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Shell header — fixed bar with progress ring + full-width step tabs */}
      <CertShellHeader
        onBack={() => navigate('/electrician/inspection-testing?section=specialist')}
        title="Solar PV"
        subtitle={
          formData.certificateNumber ? `${formData.certificateNumber} · BS EN 62446` : null
        }
        isSaving={isSaving}
        onManualSave={handleSaveDraft}
        syncStatus={syncStatus}
        progressPercent={tabProps.getProgressPercentage()}
        steps={[
          { id: 'installation', label: 'Details' },
          { id: 'system', label: 'System' },
          { id: 'grid', label: 'Grid' },
          { id: 'testing', label: 'Testing' },
          { id: 'signoff', label: 'Sign off' },
        ]}
        currentTab={tabProps.currentTab}
        onTabChange={(tab) => {
          tabProps.setCurrentTab(tab as SolarPVTabValue);
          syncOnTabChange();
          window.scrollTo({ top: 0 });
        }}
        completedTabs={{
          installation: !!tabProps.isTabComplete('installation'),
          system: !!tabProps.isTabComplete('system'),
          grid: !!tabProps.isTabComplete('grid'),
          testing: !!tabProps.isTabComplete('testing'),
          signoff: !!tabProps.isTabComplete('signoff'),
        }}
      />

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

      {/* Main Content */}
      <main className="-mx-3 px-4 py-4 pb-36 sm:mx-auto sm:px-4 lg:max-w-[1600px] lg:px-8">
        <div
          className={cn(isLocked && 'pointer-events-none select-none opacity-95')}
          aria-disabled={isLocked || undefined}
        >
          <SolarPVFormTabs
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
            }}
            onGenerateCertificate={handleGenerateCertificate}
            onCreateInvoice={handleCreateInvoice}
            onEmailCertificate={handleEmailCertificate}
            canEmail={!!savedReportId}
            reportId={savedReportId}
            onSaveDraft={handleSaveDraft}
            canGenerateCertificate={!isGenerating}
            completedTabs={{
              installation: tabProps.isTabComplete('installation'),
              system: tabProps.isTabComplete('system'),
              grid: tabProps.isTabComplete('grid'),
              testing: tabProps.isTabComplete('testing'),
              signoff: tabProps.isTabComplete('signoff'),
            }}
          />
        </div>
      </main>
      <CertificateGenerationDialog
        open={showGenerationDialog}
        onOpenChange={setShowGenerationDialog}
        isGenerating={isGenerating}
        pdfUrl={generatedPdfUrl}
        pdfFilename={pdfFilename}
        errorMessage={generationError}
        documentLabel="Certificate"
      />

      {/* Email Dialog */}
      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent className="max-w-[90vw] sm:max-w-md bg-[#111114] border border-white/[0.1] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-white text-base font-bold">Email certificate</DialogTitle>
            <DialogDescription className="text-white/85 text-sm">
              Enter the recipient's email address.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-3">
            <div>
              <label
                htmlFor="solar-pv-email"
                className="mb-1 block text-[12px] font-medium text-white"
              >
                Recipient email
              </label>
              <Input
                id="solar-pv-email"
                type="email"
                placeholder="client@example.com"
                value={emailRecipient}
                onChange={(e) => setEmailRecipient(e.target.value)}
                disabled={isSendingEmail}
                className="input-underline h-11 rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base text-white focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none touch-manipulation"
              />
            </div>
            {formData.clientEmail && emailRecipient !== formData.clientEmail && (
              <button
                onClick={() => setEmailRecipient(formData.clientEmail)}
                className="w-full h-11 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-[13px] font-medium hover:bg-white/[0.08] touch-manipulation active:scale-[0.98] transition-all"
              >
                Use client email: {formData.clientEmail}
              </button>
            )}
          </div>
          {/* Plain column footer — DialogFooter's sm:space-x-2 skews stacked
              buttons sideways, so the two never sat level. */}
          <div className="flex flex-col gap-2">
            <Button
              onClick={handleSendEmail}
              disabled={isSendingEmail || !emailRecipient}
              className="h-12 w-full rounded-xl bg-elec-yellow text-[15px] font-semibold text-black transition-all hover:bg-elec-yellow/90 active:scale-[0.98] disabled:bg-elec-yellow disabled:text-black disabled:opacity-100 touch-manipulation"
            >
              {isSendingEmail ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin text-black" />
                  Sending…
                </>
              ) : (
                'Send certificate'
              )}
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowEmailDialog(false)}
              disabled={isSendingEmail}
              className="h-12 w-full rounded-xl border border-white/[0.1] bg-white/[0.04] font-medium text-white transition-all hover:bg-white/[0.08] hover:text-white active:scale-[0.98] disabled:opacity-40 touch-manipulation"
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <ConflictResolutionDialog conflict={activeConflict} onResolve={resolveConflict} />
    </div>
  );
}
