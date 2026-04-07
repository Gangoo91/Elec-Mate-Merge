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
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { trackFeatureUse } from '@/components/ActivityTracker';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import FireAlarmG6FormTabs from '@/components/inspection/fire-alarm/FireAlarmG6FormTabs';
import { useFireAlarmG6Tabs } from '@/hooks/useFireAlarmG6Tabs';
import { getDefaultFireAlarmFormData } from '@/types/fire-alarm';
import { useFireAlarmSmartForm } from '@/hooks/inspection/useFireAlarmSmartForm';
import CertificateGenerationDialog from '@/components/inspection/CertificateGenerationDialog';
import { useReportSync } from '@/hooks/useReportSync';
import { SyncStatusBadge } from '@/components/inspection/SyncStatusBadge';
import { generateCertificateNumber } from '@/utils/certificateNumbering';
import { formatFireAlarmG6Json } from '@/utils/fireAlarmG6JsonFormatter';

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
  const [showRecoveryDialog, setShowRecoveryDialog] = useState(false);
  const [recoveryDraft, setRecoveryDraft] = useState<{
    data: Record<string, any>;
    lastModified: Date;
  } | null>(null);

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
    enabled: !isLoading,
    onReportCreated: (newId) => {
      setSavedReportId(newId);
      window.history.replaceState(
        null,
        '',
        `/electrician/inspection-testing/fire-alarm-inspection/${newId}`
      );
    },
  });

  const tabProps = useFireAlarmG6Tabs(formData);
  const { loadCompanyBranding, hasSavedCompanyBranding } = useFireAlarmSmartForm();

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
    } catch (e: any) {
      setGenerationError(e.message);
      toast.error('PDF generation failed');
    } finally {
      setIsGenerating(false);
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
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Recover Unsaved Work?</AlertDialogTitle>
            <AlertDialogDescription>
              We found an unsaved G6 Inspection Certificate.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleDiscardDraft}>Start Fresh</AlertDialogCancel>
            <AlertDialogAction onClick={handleRecoverDraft}>Recover Draft</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="bg-background">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white touch-manipulation active:scale-95"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-bold text-white">Fire Alarm</h1>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 border border-red-500/20">
                    G6
                  </span>
                </div>
                <p className="text-[10px] text-white uppercase tracking-wider mt-0.5">
                  Inspection Certificate
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <SyncStatusBadge status={syncStatus} />
              <button
                onClick={handleSaveDraft}
                disabled={isSaving}
                className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white touch-manipulation active:scale-95 disabled:opacity-50"
              >
                {isSaving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="h-[1px] bg-gradient-to-r from-red-500/40 via-red-500/20 to-transparent" />
      </div>

      <main className="py-4 pb-48 sm:px-4 sm:pb-8">
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
        />
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
    </div>
  );
}
