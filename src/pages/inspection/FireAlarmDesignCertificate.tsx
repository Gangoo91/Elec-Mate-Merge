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
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { trackFeatureUse } from '@/components/ActivityTracker';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';

import FireAlarmG1FormTabs from '@/components/inspection/fire-alarm/FireAlarmG1FormTabs';
import { useFireAlarmG1Tabs } from '@/hooks/useFireAlarmG1Tabs';
import { getDefaultFireAlarmFormData } from '@/types/fire-alarm';
import { useFireAlarmSmartForm } from '@/hooks/inspection/useFireAlarmSmartForm';
import CertificateGenerationDialog from '@/components/inspection/CertificateGenerationDialog';
import { useReportSync } from '@/hooks/useReportSync';
import { SyncStatusBadge } from '@/components/inspection/SyncStatusBadge';
import { generateCertificateNumber } from '@/utils/certificateNumbering';
import { formatFireAlarmG1Json } from '@/utils/fireAlarmG1JsonFormatter';

const REPORT_TYPE = 'fire-alarm-design' as const;

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
  const [savedReportId, setSavedReportId] = useState<string | null>(id !== 'new' ? id || null : null);
  const [showRecoveryDialog, setShowRecoveryDialog] = useState(false);
  const [recoveryDraft, setRecoveryDraft] = useState<{ data: Record<string, any>; lastModified: Date } | null>(null);

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
    enabled: !isLoading,
    onReportCreated: (newId) => {
      setSavedReportId(newId);
      window.history.replaceState(null, '', `/electrician/inspection-testing/fire-alarm-design/${newId}`);
    },
  });

  const tabProps = useFireAlarmG1Tabs(formData);
  const { loadCompanyBranding, hasSavedCompanyBranding } = useFireAlarmSmartForm();
  const { companyProfile } = useCompanyProfile();

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
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        const { data: report } = await supabase
          .from('reports')
          .select('data')
          .eq('report_id', id)
          .eq('user_id', user.id)
          .maybeSingle();
        if (report?.data) setFormData(report.data as any);
      } catch (err) { console.error('Failed to load report:', err); }
      finally { setIsLoading(false); }
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
    } catch { toast.error('Save failed'); }
    finally { setIsSaving(false); }
  };

  // Pre-generation validation
  const getMissingFields = () => {
    const missing: { field: string; tab: string }[] = [];
    if (!formData.clientName) missing.push({ field: 'Client Name', tab: 'client' });
    if (!formData.premisesAddress) missing.push({ field: 'Premises Address', tab: 'client' });
    if (!formData.fraReference) missing.push({ field: 'FRA Reference', tab: 'client' });
    if (!formData.systemCategory) missing.push({ field: 'System Category', tab: 'design' });
    if (!formData.designBasis) missing.push({ field: 'Design Basis', tab: 'design' });
    if (!formData.categoryJustification) missing.push({ field: 'Category Justification', tab: 'design' });
    if (!formData.designerName) missing.push({ field: 'Designer Name', tab: 'declaration' });
    if (!formData.designerSignature) missing.push({ field: 'Designer Signature', tab: 'declaration' });
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
      let dataWithBranding = { ...formData, certificateNumber: formData.certificateNumber || `FA/G1-${Date.now()}` };
      if (hasSavedCompanyBranding) {
        const branding = loadCompanyBranding();
        if (branding) {
          dataWithBranding = { ...dataWithBranding, ...branding, companyName: branding.companyName || dataWithBranding.designerCompany };
        }
      }
      const pdfData = formatFireAlarmG1Json(dataWithBranding);

      // Save payload
      if (savedReportId) {
        await supabase.from('reports').update({ pdf_payload: pdfData }).eq('report_id', savedReportId);
      }

      const { data: functionData, error: functionError } = await supabase.functions.invoke('generate-fire-alarm-pdf', { body: { formData: pdfData, templateId: '7DE2F415-5A70-414A-9FB3-707FB92D0F14' } });
      if (functionError) throw new Error(functionError.message);
      if (!functionData?.success || !functionData?.pdfUrl) throw new Error(functionData?.error || 'No PDF URL');

      setGeneratedPdfUrl(functionData.pdfUrl);
      setPdfFilename(`FA-G1-Design-${formData.certificateNumber || 'cert'}.pdf`);
      toast.success('Design certificate generated');
    } catch (error: any) {
      setGenerationError(error.message);
      toast.error('PDF generation failed');
    } finally { setIsGenerating(false); }
  };

  const handleCreateInvoice = async () => {
    toast('Invoice creation coming soon');
  };

  if (isLoading) {
    return (
      <div className="bg-background min-h-screen p-4">
        <Skeleton className="h-12 w-48 mb-4" />
        <Skeleton className="h-64 w-full" />
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
              We found an unsaved G1 Design Certificate.
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
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 border border-red-500/20">G1</span>
                </div>
                <p className="text-[10px] text-white uppercase tracking-wider mt-0.5">Design Certificate</p>
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

      {/* Main Content */}
      <main className="py-4 pb-48 sm:px-4 sm:pb-8">
        <FireAlarmG1FormTabs
          currentTab={tabProps.currentTab}
          onTabChange={(tab) => { tabProps.setCurrentTab(tab as any); syncOnTabChange(); }}
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
