/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * FireAlarmCommissioningCertificate.tsx
 * Fire Alarm Commissioning Certificate (G3) — BS 5839-1:2025
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
import { maybePromptLogBook } from '@/utils/fireAlarmLogBookPrompt';
import { supabase } from '@/integrations/supabase/client';
import { trackFeatureUse } from '@/components/ActivityTracker';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import FireAlarmG3FormTabs from '@/components/inspection/fire-alarm/FireAlarmG3FormTabs';
import CertShellHeader from '@/components/inspection/shared/CertShellHeader';
import { useFireAlarmG3Tabs, type FAG3TabValue } from '@/hooks/useFireAlarmG3Tabs';
import { getDefaultFireAlarmFormData } from '@/types/fire-alarm';
import { useFireAlarmSmartForm } from '@/hooks/inspection/useFireAlarmSmartForm';
import CertificateGenerationDialog from '@/components/inspection/CertificateGenerationDialog';
import { useReportSync } from '@/hooks/useReportSync';
import { useCertLock } from '@/hooks/useCertLock';
import CertLockBar from '@/components/inspection/CertLockBar';
import { cn } from '@/lib/utils';
import { generateCertificateNumber } from '@/utils/certificateNumbering';
import { formatFireAlarmG3Json } from '@/utils/fireAlarmG3JsonFormatter';
import { createInvoiceFromCertificate } from '@/utils/certificateToQuote';
import { useCertificateEmail } from '@/hooks/useCertificateEmail';
import { EmailCertificateDialog } from '@/components/certificate-completion/EmailCertificateDialog';

const REPORT_TYPE = 'fire-alarm-commissioning' as const;

const G3_STEPS = [
  { id: 'project', label: 'Project' },
  { id: 'tests', label: 'Tests' },
  { id: 'sound', label: 'Sound' },
  { id: 'handover', label: 'Handover' },
  { id: 'declaration', label: 'Sign off' },
];

export default function FireAlarmCommissioningCertificate() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = id === 'new' || !id;

  const [formData, setFormData] = useState<Record<string, any>>({
    ...getDefaultFireAlarmFormData(),
    certificateType: 'commissioning',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showGenerationDialog, setShowGenerationDialog] = useState(false);
  const [generatedPdfUrl, setGeneratedPdfUrl] = useState<string | null>(null);
  const [pdfFilename, setPdfFilename] = useState('FireAlarm-G3-Commissioning.pdf');
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(!isNew);
  const [savedReportId, setSavedReportId] = useState<string | null>(
    id !== 'new' ? id || null : null
  );
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [emailPhotos, setEmailPhotos] = useState<string[]>([]);
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
    onAmended: (newId) => navigate(`/electrician/inspection-testing/fire-alarm-commissioning/${newId}`),
  });

const {
    status: syncStatus,
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
        `/electrician/inspection-testing/fire-alarm-commissioning/${newId}`
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

  const tabProps = useFireAlarmG3Tabs(formData);
  const { loadCompanyBranding, hasSavedCompanyBranding } = useFireAlarmSmartForm();
  const { companyProfile } = useCompanyProfile();

  // inspection_photos stores the reports.id UUID (not the text report_id) —
  // resolve it first, then build resized public URLs so PDFMonkey downloads
  // thumbnails rather than multi-MB phone originals.
  const fetchReportPhotos = useCallback(async (): Promise<string[]> => {
    if (!savedReportId) return [];
    try {
      const { data: report } = await supabase
        .from('reports')
        .select('id')
        .eq('report_id', savedReportId)
        .maybeSingle();
      if (!report?.id) return [];
      const { data: photoRows } = await supabase
        .from('inspection_photos')
        .select('file_path')
        .eq('report_id', report.id)
        .order('uploaded_at');
      return (photoRows || []).map((p) => {
        const {
          data: { publicUrl },
        } = supabase.storage.from('inspection-photos').getPublicUrl(p.file_path, {
          transform: { width: 1000, height: 1400, resize: 'contain', quality: 60 },
        });
        return publicUrl;
      });
    } catch {
      return []; // photos are best-effort — never block generation or email
    }
  }, [savedReportId]);

  // Formatted payload for the email path — lets send-certificate-resend
  // generate + attach the PDF even before the user ever taps Generate.
  let emailFormattedData: Record<string, any> | undefined;
  try {
    emailFormattedData = formatFireAlarmG3Json({
      ...formData,
      certificateNumber: formData.certificateNumber || `FA/G3-${Date.now()}`,
      photos: emailPhotos,
    });
  } catch {
    emailFormattedData = undefined; // fall back to server-side pdf_payload
  }

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

  useEffect(() => {
    if (!isNew || formData.certificateNumber) return;
    generateCertificateNumber('fire-alarm-commissioning').then((num) =>
      setFormData((prev) => ({ ...prev, certificateNumber: num }))
    );
  }, [isNew]);
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user)
        trackFeatureUse(user.id, 'certificate_opened', { type: 'fire-alarm-commissioning' });
    });
  }, []);

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
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;
      const { data: report } = await supabase
        .from('reports')
        .select('data')
        .eq('report_id', id)
        .eq('user_id', user.id)
        .maybeSingle();
      if (report?.data) setFormData(report.data as any);
      setIsLoading(false);
    });
  }, [id, isNew]);

  const handleUpdate = useCallback(
    (field: string, value: any) => setFormData((prev) => ({ ...prev, [field]: value })),
    []
  );
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

  const handleOpenEmailDialog = async () => {
    // Refresh photos first so the emailed PDF includes them — state lands
    // (and formattedData recomputes) before the user can press Send.
    try {
      setEmailPhotos(await fetchReportPhotos());
    } catch {
      /* best-effort */
    }
    setShowEmailDialog(true);
  };

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
      pdfUrl: generatedPdfUrl || undefined,
    });
    navigate(url);
  };

  const handleGenerateCertificate = async () => {
    const missing: string[] = [];
    if (!formData.clientName) missing.push('Client Name');
    if (!formData.premisesAddress) missing.push('Premises Address');
    if (!formData.commissionerSignature) missing.push('Commissioner Signature');
    if (!formData.overallResult) missing.push('Overall Result');
    const pt = formData.panelTests || {};
    if (!pt.powerOnTest) missing.push('Panel Tests');
    if (missing.length > 0) {
      toast.error(`Missing: ${missing.join(', ')}`);
      return;
    }

    setIsGenerating(true);
    setGeneratedPdfUrl(null);
    setGenerationError(null);
    setShowGenerationDialog(true);
    try {
      await syncNowImmediate();
      let data = {
        ...formData,
        certificateNumber: formData.certificateNumber || `FA/G3-${Date.now()}`,
      };
      if (hasSavedCompanyBranding) {
        const b = loadCompanyBranding();
        if (b) data = { ...data, ...b };
      }
      // Commissioning photos live in inspection_photos, not formData —
      // merge them in so the PDF's photos section is populated.
      const photos = await fetchReportPhotos();
      data = { ...data, photos };
      const pdfData = formatFireAlarmG3Json(data);
      if (savedReportId)
        await supabase
          .from('reports')
          .update({ pdf_payload: pdfData })
          .eq('report_id', savedReportId);
      const { data: fn, error: fnErr } = await supabase.functions.invoke(
        'generate-fire-alarm-pdf',
        { body: { formData: pdfData, templateId: '2EC2B796-CC4A-4ECA-AB6D-DCCE8EE229FF' } }
      );
      if (fnErr) throw new Error(fnErr.message);
      if (!fn?.success || !fn?.pdfUrl) throw new Error(fn?.error || 'No PDF URL');
      setGeneratedPdfUrl(fn.pdfUrl);
      setPdfFilename(`FA-G3-${formData.certificateNumber || 'cert'}.pdf`);
      toast.success('Commissioning certificate generated');
      maybePromptLogBook(formData, navigate);
    } catch (e: any) {
      setGenerationError(e.message);
      toast.error('PDF generation failed');
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoading)
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-elec-yellow" />
      </div>
    );

  return (
    <div className="bg-background min-h-screen">
      <AlertDialog open={showRecoveryDialog} onOpenChange={setShowRecoveryDialog}>
        <AlertDialogContent className="max-w-[90vw] sm:max-w-md bg-[#111114] border border-white/[0.08] rounded-2xl shadow-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white text-base font-bold">Recover unsaved work?</AlertDialogTitle>
            <AlertDialogDescription className="text-white text-sm">
              We found an unsaved fire alarm commissioning certificate.
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
        title="Fire alarm commissioning"
        subtitle={formData.certificateNumber ? `${formData.certificateNumber} · BS 5839-1` : null}
        isSaving={isSaving}
        onManualSave={handleSaveDraft}
        syncStatus={syncStatus}
        progressPercent={tabProps.getProgressPercentage()}
        steps={G3_STEPS}
        currentTab={tabProps.currentTab}
        onTabChange={(tab) => {
          tabProps.setCurrentTab(tab as FAG3TabValue);
          syncOnTabChange();
          window.scrollTo({ top: 0 });
        }}
        completedTabs={{
          project: !!tabProps.isTabComplete('project'),
          tests: !!tabProps.isTabComplete('tests'),
          sound: !!tabProps.isTabComplete('sound'),
          handover: !!tabProps.isTabComplete('handover'),
          declaration: !!tabProps.isTabComplete('declaration'),
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

      <main className="-mx-3 px-4 py-4 pb-36 sm:mx-auto sm:px-4 lg:max-w-[1600px] lg:px-8">
        <div className={cn(isLocked && 'pointer-events-none select-none opacity-95')} aria-disabled={isLocked || undefined}>
        <FireAlarmG3FormTabs
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
          onOpenEmailDialog={handleOpenEmailDialog}
          canEmail={!!savedReportId}
          reportId={savedReportId || undefined}
        />
      </div>
      </main>

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
        error={generationError}
        documentLabel="Certificate"
      />
    </div>
  );
}
