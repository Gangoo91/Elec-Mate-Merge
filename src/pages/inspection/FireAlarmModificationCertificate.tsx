/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Fire Alarm Modification Certificate (G7) — BS 5839-1:2025
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
import { supabase } from '@/integrations/supabase/client';
import { trackFeatureUse } from '@/components/ActivityTracker';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import CertShellHeader from '@/components/inspection/shared/CertShellHeader';
import FireAlarmG7FormTabs from '@/components/inspection/fire-alarm/FireAlarmG7FormTabs';
import { useFireAlarmG7Tabs } from '@/hooks/useFireAlarmG7Tabs';
import { getDefaultFireAlarmFormData } from '@/types/fire-alarm';
import { useFireAlarmSmartForm } from '@/hooks/inspection/useFireAlarmSmartForm';
import CertificateGenerationDialog from '@/components/inspection/CertificateGenerationDialog';
import { useReportSync } from '@/hooks/useReportSync';
import { useCertLock } from '@/hooks/useCertLock';
import CertLockBar from '@/components/inspection/CertLockBar';
import { cn } from '@/lib/utils';
import { generateCertificateNumber } from '@/utils/certificateNumbering';
import { formatFireAlarmG7Json } from '@/utils/fireAlarmG7JsonFormatter';
import { createInvoiceFromCertificate } from '@/utils/certificateToQuote';

const REPORT_TYPE = 'fire-alarm-modification' as const;

export default function FireAlarmModificationCertificate() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = id === 'new' || !id;

  const [formData, setFormData] = useState<Record<string, any>>({
    ...getDefaultFireAlarmFormData(),
    certificateType: 'modification',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showGenerationDialog, setShowGenerationDialog] = useState(false);
  const [generatedPdfUrl, setGeneratedPdfUrl] = useState<string | null>(null);
  const [pdfFilename, setPdfFilename] = useState('FireAlarm-G7-Modification.pdf');
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(!isNew);
  const [savedReportId, setSavedReportId] = useState<string | null>(
    id !== 'new' ? id || null : null
  );
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [emailRecipient, setEmailRecipient] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
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
    onAmended: (newId) => navigate(`/electrician/inspection-testing/fire-alarm-modification/${newId}`),
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
        `/electrician/inspection-testing/fire-alarm-modification/${newId}`
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

  const tabProps = useFireAlarmG7Tabs(formData);
  const { loadCompanyBranding, hasSavedCompanyBranding } = useFireAlarmSmartForm();

  useEffect(() => {
    if (!isNew || formData.certificateNumber) return;
    generateCertificateNumber('fire-alarm-modification').then((num) =>
      setFormData((prev) => ({ ...prev, certificateNumber: num }))
    );
  }, [isNew]);
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) trackFeatureUse(user.id, 'certificate_opened', { type: 'fire-alarm-modification' });
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

  // Photos live in the inspection_photos table (keyed by the report row's
  // UUID), not in formData — fetch and inject at format time so the
  // formatter's photos/has_photos/photo_count keys are populated.
  const fetchReportPhotos = useCallback(async (): Promise<{ url: string; caption: string }[]> => {
    if (!savedReportId) return [];
    try {
      // report_id in inspection_photos is a UUID — look it up from the text report_id
      const { data: report } = await supabase
        .from('reports')
        .select('id')
        .eq('report_id', savedReportId)
        .maybeSingle();
      if (!report?.id) return [];
      const { data: photoRows } = await supabase
        .from('inspection_photos')
        .select('file_path, fault_description')
        .eq('report_id', report.id)
        .order('uploaded_at');
      return (photoRows || []).map((p) => {
        // Resized via Supabase image transform so PDFMonkey downloads
        // thumbnails, not multi-MB phone originals (same as the EIC formatter).
        const {
          data: { publicUrl },
        } = supabase.storage.from('inspection-photos').getPublicUrl(p.file_path, {
          transform: { width: 1000, height: 1400, resize: 'contain', quality: 60 },
        });
        return { url: publicUrl, caption: p.fault_description || '' };
      });
    } catch {
      return [];
    }
  }, [savedReportId]);

  // Merge branding + cert number fallback, fetch photos, then run the G7
  // formatter — the PDF template expects the formatter's snake_case keys.
  const buildFormattedPayload = useCallback(async () => {
    let data = {
      ...formData,
      certificateNumber: formData.certificateNumber || `FA/G7-${Date.now()}`,
    };
    if (hasSavedCompanyBranding) {
      const b = loadCompanyBranding();
      if (b) data = { ...data, ...b };
    }
    const photos = await fetchReportPhotos();
    return formatFireAlarmG7Json({ ...data, photos });
  }, [formData, hasSavedCompanyBranding, loadCompanyBranding, fetchReportPhotos]);

  const handleGenerateCertificate = async () => {
    const missing: string[] = [];
    if (!formData.clientName) missing.push('Client Name');
    if (!formData.premisesAddress) missing.push('Premises Address');
    if (!formData.originalCertRef) missing.push('Original Cert Reference');
    if (!formData.modificationDescription) missing.push('Modification Description');
    if (!formData.modifierSignature) missing.push('Modifier Signature');
    if (!formData.overallResult) missing.push('Overall Result');
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
      const payload = await buildFormattedPayload();

      if (savedReportId)
        await supabase
          .from('reports')
          .update({ pdf_payload: payload })
          .eq('report_id', savedReportId);
      const { data: fn, error: fnErr } = await supabase.functions.invoke(
        'generate-fire-alarm-pdf',
        { body: { formData: payload, templateId: '5ECD2939-5CE2-4E98-8E47-32F25975C352' } }
      );
      if (fnErr) throw new Error(fnErr.message);
      if (!fn?.success || !fn?.pdfUrl) throw new Error(fn?.error || 'No PDF URL');
      setGeneratedPdfUrl(fn.pdfUrl);
      setPdfFilename(`FA-G7-${formData.certificateNumber || 'cert'}.pdf`);
      toast.success('Modification certificate generated');
    } catch (e: any) {
      setGenerationError(e.message);
      toast.error('PDF generation failed');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleOpenEmailDialog = () => {
    if (!savedReportId) {
      toast.error('Please save the certificate first before emailing.');
      return;
    }
    if (formData.clientEmail) setEmailRecipient(formData.clientEmail);
    setShowEmailDialog(true);
  };

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
        formattedData = await buildFormattedPayload();
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

  const handleCreateInvoice = () => {
    const url = createInvoiceFromCertificate({
      clientName: formData.clientName || '',
      clientEmail: formData.clientEmail || '',
      clientPhone: formData.clientTelephone || '',
      clientAddress: formData.clientAddress || '',
      installationAddress: formData.premisesAddress || '',
      certificateType: 'Fire Alarm Modification',
      certificateReference: formData.certificateNumber || '',
      reportId: savedReportId || undefined,
      pdfUrl: generatedPdfUrl || formData.pdfUrl || undefined,
    });
    navigate(url);
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
              We found an unsaved fire alarm modification certificate.
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
        title="Fire Alarm Modification"
        subtitle={
          formData.certificateNumber ? `${formData.certificateNumber} · BS 5839-1` : null
        }
        isSaving={isSaving}
        onManualSave={handleSaveDraft}
        syncStatus={syncStatus}
        progressPercent={tabProps.getProgressPercentage()}
        steps={[
          { id: 'project', label: 'Project' },
          { id: 'modification', label: 'Changes' },
          { id: 'testing', label: 'Testing' },
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
          modification: !!tabProps.isTabComplete('modification'),
          testing: !!tabProps.isTabComplete('testing'),
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
        <FireAlarmG7FormTabs
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

      <CertificateGenerationDialog
        open={showGenerationDialog}
        onOpenChange={setShowGenerationDialog}
        isGenerating={isGenerating}
        pdfUrl={generatedPdfUrl}
        pdfFilename={pdfFilename}
        error={generationError}
        documentLabel="Certificate"
      />

      {/* Email dialog */}
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
              <label htmlFor="g7-email" className="mb-1 block text-[12px] font-medium text-white">
                Recipient email
              </label>
              <Input
                id="g7-email"
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
    </div>
  );
}
