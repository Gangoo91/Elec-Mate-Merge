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

import { useState, useEffect, useCallback } from 'react';
import { useAppReview } from '@/hooks/useAppReview';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
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
import { ArrowLeft, Bell, Save, Download, Loader2, Mail } from 'lucide-react';
import { toast } from 'sonner';
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
import { useFireAlarmTabs } from '@/hooks/useFireAlarmTabs';
import { getDefaultFireAlarmFormData } from '@/types/fire-alarm';
import { useFireAlarmSmartForm } from '@/hooks/inspection/useFireAlarmSmartForm';
import CertificateGenerationDialog from '@/components/inspection/CertificateGenerationDialog';
import { useReportSync } from '@/hooks/useReportSync';
import { SyncStatusBadge } from '@/components/inspection/SyncStatusBadge';
import { generateCertificateNumber } from '@/utils/certificateNumbering';

const REPORT_TYPE = 'fire-alarm' as const;

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
    enabled: !isLoading,
    onReportCreated: (newId) => {
      setSavedReportId(newId);
      window.history.replaceState(null, '', `/electrician/inspection-testing/fire-alarm/${newId}`);
    },
  });

  // Hooks for tabs
  const tabProps = useFireAlarmTabs(formData);

  // Smart form hook for company branding
  const { loadCompanyBranding, hasSavedCompanyBranding } = useFireAlarmSmartForm();

  // Company profile for email
  const { companyProfile } = useCompanyProfile();

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

      let dataWithCertNumber = {
        ...formData,
        certificateNumber: formData.certificateNumber || `FA-${Date.now()}`,
      };

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
            accentColor: branding.accentColor || dataWithCertNumber.accentColor,
            registrationSchemeLogo:
              branding.registrationSchemeLogo || dataWithCertNumber.registrationSchemeLogo,
            registrationScheme:
              branding.registrationScheme || dataWithCertNumber.registrationScheme,
          };
        }
      }

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
      <div className="bg-background min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Skeleton className="h-12 w-48 mb-4" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Recovery Dialog */}
      <AlertDialog open={showRecoveryDialog} onOpenChange={setShowRecoveryDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Recover Unsaved Work?</AlertDialogTitle>
            <AlertDialogDescription>
              We found an unsaved Fire Alarm certificate from{' '}
              {recoveryDraft?.lastModified.toLocaleString()}.
              {recoveryDraft?.data?.clientName && (
                <span className="block mt-2 font-medium">
                  Client: {recoveryDraft.data.clientName}
                </span>
              )}
              Would you like to recover this work?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleDiscardDraft}>Start Fresh</AlertDialogCancel>
            <AlertDialogAction onClick={handleRecoverDraft}>Recover Draft</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Header */}
      <div className="bg-background">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white touch-manipulation active:scale-95">
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-bold text-white">Fire Alarm</h1>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 border border-red-500/20">G2</span>
                </div>
                <p className="text-[10px] text-white uppercase tracking-wider mt-0.5">Installation Certificate</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <SyncStatusBadge status={syncStatus} />
              <button onClick={handleSaveDraft} disabled={isSaving} className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white touch-manipulation active:scale-95 disabled:opacity-50">
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
        <div className="h-[1px] bg-gradient-to-r from-red-500/40 via-red-500/20 to-transparent" />
      </div>

      {/* Main Content - Edge-to-edge on mobile, padded on desktop */}
      <main className="py-4 pb-48 sm:px-4 sm:pb-8">
        <FireAlarmFormTabs
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
          onOpenEmailDialog={() => setShowEmailDialog(true)}
          canEmail={!!savedReportId}
        />
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
