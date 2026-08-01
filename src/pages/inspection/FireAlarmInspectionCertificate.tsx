/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * FireAlarmInspectionCertificate.tsx
 * Fire Alarm Inspection Certificate (G6) — BS 5839-1:2025
 */

import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { trackFeatureUse } from '@/components/ActivityTracker';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import CertShellHeader from '@/components/inspection/shared/CertShellHeader';
import FireAlarmG6FormTabs from '@/components/inspection/fire-alarm/FireAlarmG6FormTabs';
import { useFireAlarmG6Tabs } from '@/hooks/useFireAlarmG6Tabs';
import { getDefaultFireAlarmFormData } from '@/types/fire-alarm';
import { useFireAlarmSmartForm } from '@/hooks/inspection/useFireAlarmSmartForm';
import CertificateGenerationDialog from '@/components/inspection/CertificateGenerationDialog';
import { useReportSync } from '@/hooks/useReportSync';
import { useCertLock } from '@/hooks/useCertLock';
import CertLockBar from '@/components/inspection/CertLockBar';
import { cn } from '@/lib/utils';
import { generateCertificateNumber } from '@/utils/certificateNumbering';
import { formatFireAlarmG6Json } from '@/utils/fireAlarmG6JsonFormatter';
import { EmailCertificateDialog } from '@/components/certificate-completion/EmailCertificateDialog';

const REPORT_TYPE = 'fire-alarm-inspection' as const;

export default function FireAlarmInspectionCertificate() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = id === 'new' || !id;

  const [formData, setFormData] = useState<Record<string, any>>({
    ...getDefaultFireAlarmFormData(),
    certificateType: 'inspection',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showGenerationDialog, setShowGenerationDialog] = useState(false);
  const [generatedPdfUrl, setGeneratedPdfUrl] = useState<string | null>(null);
  const [pdfFilename, setPdfFilename] = useState('FireAlarm-G6-Inspection.pdf');
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(!isNew);
  const [savedReportId, setSavedReportId] = useState<string | null>(
    id !== 'new' ? id || null : null
  );
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [isEmailSending, setIsEmailSending] = useState(false);
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
    onAmended: (newId) => navigate(`/electrician/inspection-testing/fire-alarm-inspection/${newId}`),
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
        `/electrician/inspection-testing/fire-alarm-inspection/${newId}`
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

  const tabProps = useFireAlarmG6Tabs(formData);
  const { loadCompanyBranding, hasSavedCompanyBranding } = useFireAlarmSmartForm();
  const { companyProfile } = useCompanyProfile();

  // Photos live in the inspection_photos table keyed by the reports.id uuid —
  // resolve it the same way useInspectionPhotos does, then map to {url, caption}
  // so the formatter's photos passthrough reaches the PDF payload.
  const fetchInspectionPhotos = useCallback(async (): Promise<
    { url: string; caption: string }[]
  > => {
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
        .select('file_path, fault_description')
        .eq('report_id', reportRow.id)
        .order('uploaded_at');
      return (photoRows || [])
        .filter((p) => p.file_path)
        .map((p) => ({
          url: supabase.storage.from('inspection-photos').getPublicUrl(p.file_path).data.publicUrl,
          caption: p.fault_description || '',
        }));
    } catch {
      return [];
    }
  }, [savedReportId]);

  useEffect(() => {
    if (!isNew || formData.certificateNumber) return;
    generateCertificateNumber('fire-alarm-inspection').then((num) =>
      setFormData((prev) => ({ ...prev, certificateNumber: num }))
    );
  }, [isNew]);
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) trackFeatureUse(user.id, 'certificate_opened', { type: 'fire-alarm-inspection' });
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
    if (!formData.clientName && !formData.premisesAddress) {
      toast.error('Enter client or premises details first');
      return;
    }
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

  const handleGenerateCertificate = async () => {
    const missing: string[] = [];
    if (!formData.clientName) missing.push('Client Name');
    if (!formData.premisesAddress) missing.push('Premises Address');
    if (!formData.inspectorSignature) missing.push('Inspector Signature');
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
        certificateNumber: formData.certificateNumber || `FA/G6-${Date.now()}`,
      };
      if (hasSavedCompanyBranding) {
        const b = loadCompanyBranding();
        if (b) data = { ...data, ...b };
      }
      // Inject captured photos so they reach the PDF payload
      const photos = await fetchInspectionPhotos();
      data = { ...data, photos };
      const pdfData = formatFireAlarmG6Json(data);
      if (savedReportId)
        await supabase
          .from('reports')
          .update({ pdf_payload: pdfData })
          .eq('report_id', savedReportId);
      const { data: fn, error: fnErr } = await supabase.functions.invoke(
        'generate-fire-alarm-pdf',
        { body: { formData: pdfData, templateId: '24C2EA56-CDC8-4777-AD17-7B1764AC0C2D' } }
      );
      if (fnErr) throw new Error(fnErr.message);
      if (!fn?.success || !fn?.pdfUrl) throw new Error(fn?.error || 'No PDF URL');
      setGeneratedPdfUrl(fn.pdfUrl);
      setPdfFilename(`FA-G6-${formData.certificateNumber || 'cert'}.pdf`);
      toast.success('Inspection certificate generated');

      // ELE-1397: close the loop — the inspection becomes a service entry in
      // the building's log book, so next year's cert pulls it back out.
      if (data.linkedLogBookId) {
        try {
          const {
            data: { user: authUser },
          } = await supabase.auth.getUser();
          if (authUser) {
            const entryDate = new Date().toISOString().slice(0, 10);
            const db = supabase as any;
            // Regenerating the same cert must not double-log the visit
            const certRef = data.certificateNumber || '';
            const { data: existing } = await db
              .from('fire_alarm_log_entries')
              .select('id')
              .eq('log_book_id', data.linkedLogBookId)
              .eq('entry_type', 'service')
              .eq('data->>cert_ref', certRef)
              .limit(1);
            if (existing?.length) return;
            await db.from('fire_alarm_log_entries').insert({
              log_book_id: data.linkedLogBookId,
              user_id: authUser.id,
              entry_type: 'service',
              entry_date: entryDate,
              tester_name: data.inspectorName || '',
              data: {
                contractor: data.inspectorCompany || data.companyName || '',
                scope: 'Periodic inspection and test (BS 5839-1 G6)',
                outcome:
                  data.overallResult === 'satisfactory' ? 'Satisfactory' : 'Unsatisfactory',
                next_due: data.nextInspectionDue || '',
                cert_ref: data.certificateNumber || '',
              },
            });
            await db
              .from('fire_alarm_log_books')
              .update({ last_service_date: entryDate })
              .eq('id', data.linkedLogBookId);
          }
        } catch (logErr) {
          console.warn('Log book write-back failed (non-blocking):', logErr);
        }
      }
    } catch (e: any) {
      setGenerationError(e.message);
      toast.error('PDF generation failed');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSendEmail = async (recipientEmail: string, cc?: string[], customMessage?: string) => {
    if (!savedReportId) throw new Error('Save the report before emailing the certificate');
    setIsEmailSending(true);
    try {
      // Format current form data so pre-Generate emails still attach a PDF
      let formattedData: Record<string, any> | undefined;
      try {
        let data = {
          ...formData,
          certificateNumber: formData.certificateNumber || `FA/G6-${Date.now()}`,
          photos: await fetchInspectionPhotos(),
        };
        if (hasSavedCompanyBranding) {
          const b = loadCompanyBranding();
          if (b) data = { ...data, ...b };
        }
        formattedData = formatFireAlarmG6Json(data);
      } catch {
        formattedData = undefined;
      }
      const { data: result, error: fnErr } = await supabase.functions.invoke(
        'send-certificate-resend',
        { body: { reportId: savedReportId, recipientEmail, cc, customMessage, formattedData } }
      );
      if (fnErr) throw new Error(fnErr.message || 'Failed to send certificate email');
      if (!result?.success)
        throw new Error(result?.error || result?.hint || 'Failed to send certificate email');
      if (result.pdfAttached) toast.success(`Certificate emailed to ${recipientEmail}`);
      else toast.success(`Email sent to ${recipientEmail} — PDF attachment unavailable`);
    } finally {
      setIsEmailSending(false);
    }
  };

  if (isLoading)
    return (
      <div className="bg-background min-h-screen p-4">
        <Skeleton className="h-12 w-48 mb-4" />
        <Skeleton className="h-64 w-full" />
      </div>
    );

  return (
    <div className="bg-background min-h-screen">
      <AlertDialog open={showRecoveryDialog} onOpenChange={setShowRecoveryDialog}>
        <AlertDialogContent className="max-w-[90vw] sm:max-w-md bg-[#111114] border border-white/[0.08] rounded-2xl shadow-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white text-base font-bold">Recover unsaved work?</AlertDialogTitle>
            <AlertDialogDescription className="text-white text-sm">
              We found an unsaved fire alarm inspection certificate.
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
        title="Fire Alarm Inspection"
        subtitle={
          formData.certificateNumber ? `${formData.certificateNumber} · BS 5839-1` : null
        }
        isSaving={isSaving}
        onManualSave={handleSaveDraft}
        syncStatus={syncStatus}
        progressPercent={tabProps.getProgressPercentage()}
        steps={[
          { id: 'project', label: 'Project' },
          { id: 'scope', label: 'Scope' },
          { id: 'tests', label: 'Tests' },
          { id: 'defects', label: 'Defects' },
          { id: 'declaration', label: 'Sign off' },
        ]}
        currentTab={tabProps.currentTab}
        onTabChange={(tab) => {
          tabProps.setCurrentTab(tab as any);
          syncOnTabChange();
          window.scrollTo({ top: 0 });
        }}
        completedTabs={{
          project: !!tabProps.isTabComplete('project'),
          scope: !!tabProps.isTabComplete('scope'),
          tests: !!tabProps.isTabComplete('tests'),
          defects: !!tabProps.isTabComplete('defects'),
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
        <FireAlarmG6FormTabs
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
          onCreateInvoice={() => toast('Invoice creation coming soon')}
          onSaveDraft={handleSaveDraft}
          canGenerateCertificate={!isGenerating}
          onOpenEmailDialog={() => setShowEmailDialog(true)}
          canEmail={!!savedReportId}
          reportId={savedReportId}
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
        inspectionDate={formData.inspectionDate}
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
