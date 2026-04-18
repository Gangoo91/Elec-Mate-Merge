/**
 * LightningProtectionCertificate.tsx
 * Lightning Protection System Test Certificate — BS EN 62305
 *
 * Features:
 * - 8-layer auto-save via useReportSync
 * - Tappable visual inspection checklist with photo per item
 * - Dynamic test schedules (earth, continuity, bonding, SPD, separation)
 * - Auto pass/fail thresholds (10Ω, 1Ω, 0.2Ω)
 * - Auto next-test-due from LPS class
 * - C1/C2/C3 observation severity coding
 * - Down conductor spacing validation
 */

import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { reportCloud } from '@/utils/reportCloud';
import { draftStorage } from '@/utils/draftStorage';
import { supabase } from '@/integrations/supabase/client';
import { trackFeatureUse } from '@/components/ActivityTracker';

import LPFormTabs from '@/components/inspection/lightning-protection/LPFormTabs';
import { useLightningProtectionTabs } from '@/hooks/useLightningProtectionTabs';
import { getDefaultLightningProtectionFormData } from '@/types/lightning-protection';
import { useLightningProtectionSmartForm } from '@/hooks/inspection/useLightningProtectionSmartForm';
import CertificateGenerationDialog from '@/components/inspection/CertificateGenerationDialog';
import { useReportSync } from '@/hooks/useReportSync';
import { SyncStatusBadge } from '@/components/inspection/SyncStatusBadge';
import { ConflictResolutionDialog } from '@/components/inspection/ConflictResolutionDialog';

const REPORT_TYPE = 'lightning-protection' as const;

export default function LightningProtectionCertificate() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = id === 'new' || !id;

  const [formData, setFormData] = useState<any>(getDefaultLightningProtectionFormData());
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showGenerationDialog, setShowGenerationDialog] = useState(false);
  const [generatedPdfUrl, setGeneratedPdfUrl] = useState<string | null>(null);
  const [pdfFilename, setPdfFilename] = useState('LP-Certificate.pdf');
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(!isNew);
  const [savedReportId, setSavedReportId] = useState<string | null>(id !== 'new' ? id || null : null);
  const [showRecoveryDialog, setShowRecoveryDialog] = useState(false);
  const [recoveryDraft, setRecoveryDraft] = useState<{ data: any; lastModified: Date } | null>(null);

  const {
    status: syncStatus, saveNow, syncNowImmediate,
    hasRecoverableDraft, recoverDraft, discardDraft,
    onTabChange: syncOnTabChange, activeConflict, resolveConflict,
  } = useReportSync({
    reportId: savedReportId,
    reportType: REPORT_TYPE,
    formData,
    enabled: !isLoading,
    isHydrating: isLoading, // Gate autosave while loading from cloud — prevents blank-overwrite race.
    onReportCreated: (newId) => {
      setSavedReportId(newId);
      window.history.replaceState(null, '', `/electrician/inspection-testing/lightning-protection/${newId}`);
    },
  });

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) trackFeatureUse(user.id, 'certificate_opened', { type: 'lightning-protection' });
    });
  }, []);

  useEffect(() => {
    if (isNew || !id) { setIsLoading(false); return; }
    const loadReport = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) { setIsLoading(false); return; }
        const reportData = await reportCloud.getReportData(id, user.id);
        if (reportData) { setFormData((prev: any) => ({ ...getDefaultLightningProtectionFormData(), ...prev, ...(reportData as any) })); setSavedReportId(id); }
      } catch (err) { console.error('Failed to load LP cert:', err); }
      finally { setIsLoading(false); }
    };
    loadReport();
  }, [id, isNew]);

  useEffect(() => {
    if (!isNew || !hasRecoverableDraft) return;
    const draft = draftStorage.loadDraft(REPORT_TYPE, null);
    if (draft) { setRecoveryDraft(draft); setShowRecoveryDialog(true); }
  }, [isNew, hasRecoverableDraft]);

  const handleRecoverDraft = () => { if (recoveryDraft) { setFormData((prev: any) => ({ ...getDefaultLightningProtectionFormData(), ...prev, ...recoveryDraft.data })); recoverDraft(); } setShowRecoveryDialog(false); };
  const handleDiscardDraft = () => { discardDraft(); setShowRecoveryDialog(false); };
  const handleUpdate = useCallback((field: string, value: any) => { setFormData((prev: any) => ({ ...prev, [field]: value })); }, []);

  const {
    currentTab, setCurrentTab, currentTabIndex, totalTabs,
    canNavigateNext, canNavigatePrevious, navigateNext, navigatePrevious,
    isCurrentTabComplete, getProgressPercentage,
  } = useLightningProtectionTabs(formData);

  const { hasSavedCompanyBranding, loadCompanyBranding } = useLightningProtectionSmartForm();

  const handleTabChange = (tab: any) => { setCurrentTab(tab); syncOnTabChange(); };
  const handleSaveDraft = async () => { setIsSaving(true); try { await saveNow(); toast.success('Draft saved'); } catch { toast.error('Failed to save'); } finally { setIsSaving(false); } };

  const handleGenerateCertificate = async () => {
    if (!formData.overallResult) { toast.error('Please select an overall result'); return; }
    if (!formData.inspectorSignature) { toast.error('Inspector signature required'); return; }

    setIsGenerating(true);
    setShowGenerationDialog(true);
    setGenerationError(null);

    try {
      await syncNowImmediate();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not signed in');

      let dataWithCertNumber = { ...formData, certificateNumber: formData.certificateNumber || `LP-${Date.now().toString(36).toUpperCase()}` };
      if (hasSavedCompanyBranding) { const branding = loadCompanyBranding(); if (branding) dataWithCertNumber = { ...dataWithCertNumber, ...branding }; }

      const { data: functionData, error: functionError } = await supabase.functions.invoke('generate-lightning-protection-pdf', { body: { formData: dataWithCertNumber } });
      if (functionError) throw new Error(functionError.message || 'PDF generation failed');
      if (!functionData?.download_url) throw new Error('No PDF URL returned');

      let permanentPdfUrl = functionData.download_url;
      try {
        const { saveCertificatePdf } = await import('@/utils/certificate-pdf-storage');
        const { permanentUrl, storagePath } = await saveCertificatePdf(functionData.download_url, user.id, savedReportId!, dataWithCertNumber.certificateNumber);
        permanentPdfUrl = permanentUrl;
        await supabase.from('reports').update({ storage_path: storagePath, pdf_url: permanentPdfUrl, pdf_generated_at: new Date().toISOString(), status: 'completed' }).eq('report_id', savedReportId);
      } catch (storageErr) {
        console.warn('[LP] Storage failed:', storageErr);
        await supabase.from('reports').update({ pdf_url: permanentPdfUrl, pdf_generated_at: new Date().toISOString(), status: 'completed' }).eq('report_id', savedReportId);
      }

      setGeneratedPdfUrl(permanentPdfUrl);
      setPdfFilename(`LP-${dataWithCertNumber.certificateNumber}.pdf`);
      toast.success('Lightning protection certificate generated');
    } catch (error: any) {
      console.error('[LP] Generation error:', error);
      setGenerationError(error.message);
      toast.error(error.message || 'PDF generation failed');
    } finally { setIsGenerating(false); }
  };

  if (isLoading) return <div className="p-4 space-y-4"><Skeleton className="h-12 w-full" /><Skeleton className="h-64 w-full" /><Skeleton className="h-64 w-full" /></div>;

  return (
    <div className="bg-background min-h-screen">
      <div className="bg-background">
        <div className="px-2 py-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white touch-manipulation active:scale-[0.98]">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <div>
                <h1 className="text-sm font-bold text-white leading-tight">Lightning Protection</h1>
                {formData.certificateNumber && <p className="text-[10px] text-white font-mono mt-0.5">{formData.certificateNumber}</p>}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <SyncStatusBadge status={syncStatus} />
              <button onClick={handleSaveDraft} disabled={isSaving} className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white touch-manipulation active:scale-[0.98] disabled:opacity-50">
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
        <div className="h-[1px] bg-gradient-to-r from-elec-yellow/40 via-elec-yellow/20 to-transparent" />
      </div>

      <main className="py-4 pb-48 sm:px-4 sm:pb-8">
        <LPFormTabs
          formData={formData} onUpdate={handleUpdate}
          currentTab={currentTab} onTabChange={handleTabChange}
          currentTabIndex={currentTabIndex} totalTabs={totalTabs}
          canNavigateNext={canNavigateNext} canNavigatePrevious={canNavigatePrevious}
          onNext={navigateNext} onPrevious={navigatePrevious}
          isCurrentTabComplete={isCurrentTabComplete} progress={getProgressPercentage()}
          onGenerate={handleGenerateCertificate} isGenerating={isGenerating}
        />
      </main>

      <AlertDialog open={showRecoveryDialog} onOpenChange={setShowRecoveryDialog}>
        <AlertDialogContent className="bg-[#1a1a1e] border-white/[0.08] text-white">
          <AlertDialogHeader><AlertDialogTitle className="text-white">Recover Draft?</AlertDialogTitle><AlertDialogDescription className="text-white">A previous unsaved lightning protection certificate was found. Would you like to recover it?</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel onClick={handleDiscardDraft} className="border-white/[0.12] text-white hover:bg-white/[0.06]">Discard</AlertDialogCancel><AlertDialogAction onClick={handleRecoverDraft} className="bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow hover:bg-elec-yellow/30">Recover Draft</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {activeConflict && <ConflictResolutionDialog conflict={activeConflict} onResolve={(r) => resolveConflict(r === 'local' ? 'local' : 'remote')} />}
      {showGenerationDialog && <CertificateGenerationDialog open={showGenerationDialog} onOpenChange={setShowGenerationDialog} isGenerating={isGenerating} pdfUrl={generatedPdfUrl} filename={pdfFilename} error={generationError} certificateType="Lightning Protection" />}
    </div>
  );
}
