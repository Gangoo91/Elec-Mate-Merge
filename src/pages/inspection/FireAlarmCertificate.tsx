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
import { formatFireAlarmJson } from '@/utils/fireAlarmJsonFormatter';
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
import { ConflictResolutionDialog } from '@/components/inspection/ConflictResolutionDialog';

const REPORT_TYPE = 'fire-alarm' as const;

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function FireAlarmCertificate() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

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

  // Generate certificate PDF
  const handleGenerateCertificate = async () => {
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

      toast.success('Certificate generated successfully');
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

      {/* Mobile-First Header */}
      <div className="bg-[#242428] border-b border-elec-yellow/20 sticky top-0 z-10">
        <div className="px-4 py-3">
          {/* Top Row - Back & Actions */}
          <div className="flex items-center justify-between mb-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:text-white hover:bg-white/10 -ml-2 h-11 px-3 touch-manipulation active:scale-[0.98] transition-transform"
              onClick={() => navigate('/electrician/inspection-testing')}
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>

            <div className="flex items-center gap-2">
              <SyncStatusBadge status={syncStatus} />

              <Button
                variant="ghost"
                size="icon"
                onClick={handleSaveDraft}
                disabled={isSaving}
                aria-label="Save draft"
                className="h-11 w-11 text-white hover:text-white hover:bg-white/10 touch-manipulation active:scale-[0.98] transition-transform"
              >
                {isSaving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowEmailDialog(true)}
                disabled={!savedReportId}
                aria-label="Email certificate"
                className="h-11 w-11 text-white hover:text-white hover:bg-white/10 touch-manipulation active:scale-[0.98] transition-transform"
              >
                <Mail className="h-4 w-4" />
              </Button>

              <Button
                size="sm"
                onClick={handleGenerateCertificate}
                disabled={isGenerating}
                aria-label="Generate certificate PDF"
                className="bg-red-500 hover:bg-red-600 text-white h-11 px-3 font-semibold rounded-lg touch-manipulation active:scale-[0.98] transition-transform"
              >
                {isGenerating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Title Row */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/15 flex items-center justify-center">
              <Bell className="h-5 w-5 text-red-400" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white">
                {isNew ? 'New Fire Alarm' : 'Fire Alarm'}
              </h1>
              <h1 className="text-base font-bold text-white -mt-0.5">Certificate</h1>
              <p className="text-[11px] text-white">BS 5839 Compliance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Edge-to-edge on mobile, padded on desktop */}
      <main className="py-4 pb-4 sm:px-4 sm:pb-8">
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

      <ConflictResolutionDialog conflict={activeConflict} onResolve={resolveConflict} />
    </div>
  );
}
