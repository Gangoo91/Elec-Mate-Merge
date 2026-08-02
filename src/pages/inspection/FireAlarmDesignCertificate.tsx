/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * FireAlarmDesignCertificate.tsx
 * Fire Alarm Design Certificate (G1) — BS 5839-1:2025
 *
 * Features:
 * - 8-layer auto-save via useReportSync
 * - Draft recovery dialog
 * - PDF generation
 */

import { useState, useEffect, useCallback } from 'react';
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
import { supabase } from '@/integrations/supabase/client';
import { fireAlarmTemplateId } from '@/utils/fireAlarmPdfRouting';
import { trackFeatureUse } from '@/components/ActivityTracker';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';

import FireAlarmG1FormTabs from '@/components/inspection/fire-alarm/FireAlarmG1FormTabs';
import CertShellHeader from '@/components/inspection/shared/CertShellHeader';
import { useFireAlarmG1Tabs, type FAG1TabValue } from '@/hooks/useFireAlarmG1Tabs';
import { getDefaultFireAlarmFormData } from '@/types/fire-alarm';
import { useFireAlarmSmartForm } from '@/hooks/inspection/useFireAlarmSmartForm';
import CertificateGenerationDialog from '@/components/inspection/CertificateGenerationDialog';
import { useReportSync } from '@/hooks/useReportSync';
import { useCertLock } from '@/hooks/useCertLock';
import CertLockBar from '@/components/inspection/CertLockBar';
import { cn } from '@/lib/utils';
import { generateCertificateNumber } from '@/utils/certificateNumbering';
import { formatFireAlarmG1Json } from '@/utils/fireAlarmG1JsonFormatter';
import { createInvoiceFromCertificate } from '@/utils/certificateToQuote';
import { useCertificateEmail } from '@/hooks/useCertificateEmail';
import { EmailCertificateDialog } from '@/components/certificate-completion/EmailCertificateDialog';

const REPORT_TYPE = 'fire-alarm-design' as const;

const G1_STEPS = [
  { id: 'client', label: 'Client' },
  { id: 'design', label: 'Design' },
  { id: 'devices', label: 'Devices' },
  { id: 'declaration', label: 'Sign off' },
];

export default function FireAlarmDesignCertificate() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = id === 'new' || !id;

  const [formData, setFormData] = useState<Record<string, any>>({
    ...getDefaultFireAlarmFormData(),
    certificateType: 'design',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showGenerationDialog, setShowGenerationDialog] = useState(false);
  const [generatedPdfUrl, setGeneratedPdfUrl] = useState<string | null>(null);
  const [pdfFilename, setPdfFilename] = useState('FireAlarm-G1-Design.pdf');
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
    onAmended: (newId) => navigate(`/electrician/inspection-testing/fire-alarm-design/${newId}`),
  });

const {
    status: syncStatus,
    saveNow,
    syncNowImmediate,
    hasRecoverableDraft,
    recoverDraft,
    discardDraft,
    onTabChange: syncOnTabChange,
  } = useReportSync({
    reportId: savedReportId,
    reportType: REPORT_TYPE,
    formData,
    enabled: !isLoading && !isLocked,
    isHydrating: isLoading, // Gate autosave while loading from cloud — prevents blank-overwrite race.
    onReportCreated: (newId) => {
      setSavedReportId(newId);
      window.history.replaceState(
        null,
        '',
        `/electrician/inspection-testing/fire-alarm-design/${newId}`
      );
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

  const tabProps = useFireAlarmG1Tabs(formData);
  const { loadCompanyBranding, hasSavedCompanyBranding } = useFireAlarmSmartForm();
  const { companyProfile } = useCompanyProfile();

  // Email dialog state
  const [showEmailDialog, setShowEmailDialog] = useState(false);

  // Build the PDF payload (branding + certificate number fallback) — shared by
  // Generate and Email so pre-Generate emails still attach a PDF.
  const buildPdfPayload = useCallback(() => {
    let dataWithBranding: Record<string, any> = {
      ...formData,
      certificateNumber: formData.certificateNumber || `FA/G1-${Date.now()}`,
    };
    if (hasSavedCompanyBranding) {
      const branding = loadCompanyBranding();
      if (branding) {
        dataWithBranding = {
          ...dataWithBranding,
          ...branding,
          companyName: branding.companyName || dataWithBranding.designerCompany,
        };
      }
    }
    return formatFireAlarmG1Json(dataWithBranding);
  }, [formData, hasSavedCompanyBranding, loadCompanyBranding]);

  // Formatted payload for email sends — try/catch so a formatter error falls
  // back to the server-side pdf_payload rather than blocking the send.
  const emailFormattedData = (() => {
    try {
      return buildPdfPayload();
    } catch {
      return undefined;
    }
  })();

  const { sendCertificateEmail, isLoading: isEmailSending } = useCertificateEmail({
    certificateType: 'fire-alarm',
    reportId: savedReportId || '',
    certificateNumber: formData.certificateNumber,
    clientName: formData.clientName,
    clientEmail: formData.clientEmail,
    installationAddress: formData.premisesAddress,
    inspectionDate: formData.designDate,
    companyName: companyProfile?.company_name,
    formattedData: emailFormattedData,
    // All five fire alarm certs share generate-fire-alarm-pdf, whose default
    // template is G2 — without this an emailed cert regenerated against it.
    templateId: fireAlarmTemplateId('fire-alarm-design'),
  });

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

  // Auto-generate cert number
  useEffect(() => {
    if (!isNew || formData.certificateNumber) return;
    generateCertificateNumber('fire-alarm-design').then((num) => {
      setFormData((prev) => ({ ...prev, certificateNumber: num }));
    });
  }, [isNew]);

  // Track cert opened
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) trackFeatureUse(user.id, 'certificate_opened', { type: 'fire-alarm-design' });
    });
  }, []);

  // Load existing cert
  useEffect(() => {
    if (isNew) {
      setIsLoading(false);
      if (hasRecoverableDraft) {
        const draft = recoverDraft();
        if (draft) {
          setRecoveryDraft({ data: draft, lastModified: new Date() });
          setShowRecoveryDialog(true);
        }
      }
      return;
    }
    const loadReport = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;
        const { data: report } = await supabase
          .from('reports')
          .select('data')
          .eq('report_id', id)
          .eq('user_id', user.id)
          .maybeSingle();
        if (report?.data) setFormData(report.data as any);
      } catch (err) {
        console.error('Failed to load report:', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadReport();
  }, [id, isNew]);

  const handleUpdate = useCallback((field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleRecoverDraft = () => {
    if (recoveryDraft?.data) setFormData(recoveryDraft.data);
    setShowRecoveryDialog(false);
  };

  const handleDiscardDraft = () => {
    discardDraft();
    setShowRecoveryDialog(false);
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      const result = await syncNowImmediate();
      if (result?.success) toast.success('Saved to cloud');
      else toast.error('Cloud save failed - saved locally');
    } catch {
      toast.error('Save failed');
    } finally {
      setIsSaving(false);
    }
  };

  // Pre-generation validation
  const getMissingFields = () => {
    const missing: { field: string; tab: string }[] = [];
    if (!formData.clientName) missing.push({ field: 'Client Name', tab: 'client' });
    if (!formData.premisesAddress) missing.push({ field: 'Premises Address', tab: 'client' });
    if (!formData.fraReference) missing.push({ field: 'FRA Reference', tab: 'client' });
    if (!formData.systemCategory) missing.push({ field: 'System Category', tab: 'design' });
    if (!formData.designBasis) missing.push({ field: 'Design Basis', tab: 'design' });
    if (!formData.categoryJustification)
      missing.push({ field: 'Category Justification', tab: 'design' });
    if (!formData.designerName) missing.push({ field: 'Designer Name', tab: 'declaration' });
    if (!formData.designerSignature)
      missing.push({ field: 'Designer Signature', tab: 'declaration' });
    return missing;
  };

  const handleGenerateCertificate = async () => {
    const missing = getMissingFields();
    if (missing.length > 0) {
      toast.error(`Missing: ${missing.map((m) => m.field).join(', ')}`);
      tabProps.setCurrentTab(missing[0].tab as any);
      return;
    }

    setIsGenerating(true);
    setGeneratedPdfUrl(null);
    setGenerationError(null);
    setShowGenerationDialog(true);
    try {
      await syncNowImmediate();
      const pdfData = buildPdfPayload();

      // Save payload
      if (savedReportId) {
        await supabase
          .from('reports')
          .update({ pdf_payload: pdfData })
          .eq('report_id', savedReportId);
      }

      const { data: functionData, error: functionError } = await supabase.functions.invoke(
        'generate-fire-alarm-pdf',
        { body: { formData: pdfData, templateId: fireAlarmTemplateId('fire-alarm-design') } }
      );
      if (functionError) throw new Error(functionError.message);
      if (!functionData?.success || !functionData?.pdfUrl)
        throw new Error(functionData?.error || 'No PDF URL');

      setGeneratedPdfUrl(functionData.pdfUrl);
      setPdfFilename(`FA-G1-Design-${formData.certificateNumber || 'cert'}.pdf`);
      toast.success('Design certificate generated');
    } catch (error: any) {
      setGenerationError(error.message);
      toast.error('PDF generation failed');
    } finally {
      setIsGenerating(false);
    }
  };

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
      pdfUrl: generatedPdfUrl || formData.pdfUrl || undefined,
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
            <AlertDialogTitle className="text-white text-base font-bold">Recover unsaved work?</AlertDialogTitle>
            <AlertDialogDescription className="text-white text-sm">
              We found an unsaved fire alarm design certificate. Would you like to recover this
              work?
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
        title="Fire alarm design"
        subtitle={formData.certificateNumber ? `${formData.certificateNumber} · BS 5839-1` : null}
        isSaving={isSaving}
        onManualSave={handleSaveDraft}
        syncStatus={syncStatus}
        progressPercent={tabProps.getProgressPercentage()}
        steps={G1_STEPS}
        currentTab={tabProps.currentTab}
        onTabChange={(tab) => {
          tabProps.setCurrentTab(tab as FAG1TabValue);
          syncOnTabChange();
          window.scrollTo({ top: 0 });
        }}
        completedTabs={{
          client: !!tabProps.isTabComplete('client'),
          design: !!tabProps.isTabComplete('design'),
          devices: !!tabProps.isTabComplete('devices'),
          declaration: !!tabProps.isTabComplete('declaration'),
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
        <FireAlarmG1FormTabs
          currentTab={tabProps.currentTab}
          onTabChange={(tab) => {
            tabProps.setCurrentTab(tab as any);
            syncOnTabChange();
          }}
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
          }}
          onGenerateCertificate={handleGenerateCertificate}
          onCreateInvoice={handleCreateInvoice}
          onSaveDraft={handleSaveDraft}
          canGenerateCertificate={!isGenerating}
          onOpenEmailDialog={() => setShowEmailDialog(true)}
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
        inspectionDate={formData.designDate}
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
