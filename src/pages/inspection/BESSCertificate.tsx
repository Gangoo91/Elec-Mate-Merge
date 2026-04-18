/**
 * BESSCertificate.tsx
 * Battery Energy Storage System Commissioning Certificate
 * IET CoP for EESS + MCS MIS 3002 + BS 7671:2018+A3:2024
 *
 * Features:
 * - 8-layer auto-save via useReportSync
 * - Draft recovery dialog
 * - Chemistry-aware test guidance
 * - Pre-filled G98 grid protection settings
 * - Auto G98/G99 determination
 * - PME earthing decision tree
 * - MCS compliance validation before PDF generation
 * - PDF generation with company branding
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

import BESSFormTabs from '@/components/inspection/bess/BESSFormTabs';
import { useBESSTabs } from '@/hooks/useBESSTabs';
import { getDefaultBESSFormData } from '@/types/bess';
import { useBESSSmartForm } from '@/hooks/inspection/useBESSSmartForm';
import CertificateGenerationDialog from '@/components/inspection/CertificateGenerationDialog';
import { formatBESSJson } from '@/utils/bessJsonFormatter';
import { useReportSync } from '@/hooks/useReportSync';
import { SyncStatusBadge } from '@/components/inspection/SyncStatusBadge';
import { ConflictResolutionDialog } from '@/components/inspection/ConflictResolutionDialog';

const REPORT_TYPE = 'bess' as const;

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function BESSCertificate() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = id === 'new' || !id;

  const [formData, setFormData] = useState<any>(getDefaultBESSFormData());
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showGenerationDialog, setShowGenerationDialog] = useState(false);
  const [generatedPdfUrl, setGeneratedPdfUrl] = useState<string | null>(null);
  const [pdfFilename, setPdfFilename] = useState('BESS-Certificate.pdf');
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(!isNew);
  const [savedReportId, setSavedReportId] = useState<string | null>(id !== 'new' ? id || null : null);
  const [customerId, setCustomerId] = useState<string | undefined>(undefined);
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
    customerId,
    onReportCreated: (newId) => {
      setSavedReportId(newId);
      window.history.replaceState(null, '', `/electrician/inspection-testing/bess/${newId}`);
    },
  });

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) trackFeatureUse(user.id, 'certificate_opened', { type: 'bess' });
    });
  }, []);

  // Load existing report
  useEffect(() => {
    if (isNew || !id) { setIsLoading(false); return; }
    const loadReport = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) { setIsLoading(false); return; }
        const reportData = await reportCloud.getReportData(id, user.id);
        if (reportData) {
          setFormData((prev: any) => ({ ...getDefaultBESSFormData(), ...prev, ...(reportData as any) }));
          setSavedReportId(id);
        }
      } catch (err) { console.error('Failed to load BESS cert:', err); }
      finally { setIsLoading(false); }
    };
    loadReport();
  }, [id, isNew]);

  // Draft recovery
  useEffect(() => {
    if (!isNew || !hasRecoverableDraft) return;
    const draft = draftStorage.loadDraft(REPORT_TYPE, null);
    if (draft) { setRecoveryDraft(draft); setShowRecoveryDialog(true); }
  }, [isNew, hasRecoverableDraft]);

  const handleRecoverDraft = () => {
    if (recoveryDraft) {
      setFormData((prev: any) => ({ ...getDefaultBESSFormData(), ...prev, ...recoveryDraft.data }));
      recoverDraft();
    }
    setShowRecoveryDialog(false);
  };

  const handleDiscardDraft = () => { discardDraft(); setShowRecoveryDialog(false); };

  const handleUpdate = useCallback((field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  }, []);

  const {
    currentTab, setCurrentTab, currentTabIndex, totalTabs,
    canNavigateNext, canNavigatePrevious, navigateNext, navigatePrevious,
    isCurrentTabComplete, getProgressPercentage,
  } = useBESSTabs(formData);

  const { hasSavedCompanyBranding, loadCompanyBranding, getMCSMissingFields } = useBESSSmartForm();

  const handleTabChange = (tab: any) => { setCurrentTab(tab); syncOnTabChange(); };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    try { await saveNow(); toast.success('Draft saved'); }
    catch { toast.error('Failed to save'); }
    finally { setIsSaving(false); }
  };

  const handleGenerateCertificate = async () => {
    // MCS validation
    const missing = getMCSMissingFields(formData);
    if (missing.length > 0) {
      toast.error(`MCS fields missing: ${missing.slice(0, 3).join(', ')}${missing.length > 3 ? ` +${missing.length - 3} more` : ''}`);
      return;
    }

    setIsGenerating(true);
    setShowGenerationDialog(true);
    setGenerationError(null);

    try {
      await syncNowImmediate();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not signed in');

      let dataWithCertNumber = {
        ...formData,
        certificateNumber: formData.certificateNumber || `BESS-${Date.now().toString(36).toUpperCase()}`,
      };

      const branding = hasSavedCompanyBranding ? loadCompanyBranding() : null;
      const pdfData = formatBESSJson(dataWithCertNumber, branding || undefined);

      const { data: functionData, error: functionError } = await supabase.functions.invoke(
        'generate-bess-pdf',
        { body: { formData: pdfData } }
      );

      if (functionError) throw new Error(functionError.message || 'PDF generation failed');
      if (!functionData?.download_url) throw new Error('No PDF URL returned');

      let permanentPdfUrl = functionData.download_url;
      try {
        const { saveCertificatePdf } = await import('@/utils/certificate-pdf-storage');
        const { permanentUrl, storagePath } = await saveCertificatePdf(
          functionData.download_url, user.id, savedReportId!, dataWithCertNumber.certificateNumber
        );
        permanentPdfUrl = permanentUrl;
        await supabase.from('reports').update({
          storage_path: storagePath, pdf_url: permanentPdfUrl,
          pdf_generated_at: new Date().toISOString(), status: 'completed',
        }).eq('report_id', savedReportId);
      } catch (storageErr) {
        console.warn('[BESS] Storage failed, using temp URL:', storageErr);
        await supabase.from('reports').update({
          pdf_url: permanentPdfUrl, pdf_generated_at: new Date().toISOString(), status: 'completed',
        }).eq('report_id', savedReportId);
      }

      setGeneratedPdfUrl(permanentPdfUrl);
      setPdfFilename(`BESS-${dataWithCertNumber.certificateNumber}.pdf`);
      toast.success('BESS certificate generated');
    } catch (error: any) {
      console.error('[BESS] Generation error:', error);
      setGenerationError(error.message);
      toast.error(error.message || 'PDF generation failed');
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Header — EIC pattern */}
      <div className="bg-background">
        <div className="px-2 py-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => navigate(-1)}
                className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white touch-manipulation active:scale-[0.98]"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <div>
                <h1 className="text-sm font-bold text-white leading-tight">BESS Certificate</h1>
                {formData.certificateNumber && (
                  <p className="text-[10px] text-white font-mono mt-0.5">{formData.certificateNumber}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <SyncStatusBadge status={syncStatus} />
              <button
                onClick={handleSaveDraft}
                disabled={isSaving}
                className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white touch-manipulation active:scale-[0.98] disabled:opacity-50"
              >
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
        <div className="h-[1px] bg-gradient-to-r from-elec-yellow/40 via-elec-yellow/20 to-transparent" />
      </div>

      {/* Form — full-width mobile */}
      <main className="py-4 pb-48 sm:px-4 sm:pb-8">
        <BESSFormTabs
          formData={formData}
          onUpdate={handleUpdate}
          currentTab={currentTab}
          onTabChange={handleTabChange}
          currentTabIndex={currentTabIndex}
          totalTabs={totalTabs}
          canNavigateNext={canNavigateNext}
          canNavigatePrevious={canNavigatePrevious}
          onNext={navigateNext}
          onPrevious={navigatePrevious}
          isCurrentTabComplete={isCurrentTabComplete}
          progress={getProgressPercentage()}
          customerId={customerId}
          onCustomerIdChange={setCustomerId}
          onGenerate={handleGenerateCertificate}
          reportId={savedReportId || undefined}
          onSaveFirst={saveNow}
          isGenerating={isGenerating}
        />
      </main>

      {/* Draft recovery dialog */}
      <AlertDialog open={showRecoveryDialog} onOpenChange={setShowRecoveryDialog}>
        <AlertDialogContent className="bg-[#1a1a1e] border-white/[0.08] text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Recover Draft?</AlertDialogTitle>
            <AlertDialogDescription className="text-white">
              A previous unsaved BESS certificate was found{recoveryDraft?.lastModified ? ` from ${recoveryDraft.lastModified.toLocaleDateString('en-GB')}` : ''}. Would you like to recover it?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleDiscardDraft} className="border-white/[0.12] text-white hover:bg-white/[0.06]">Discard</AlertDialogCancel>
            <AlertDialogAction onClick={handleRecoverDraft} className="bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow hover:bg-elec-yellow/30">Recover Draft</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Conflict resolution */}
      {activeConflict && (
        <ConflictResolutionDialog
          conflict={activeConflict}
          onResolve={(resolution) => {
            if (resolution === 'local') resolveConflict('local');
            else if (resolution === 'remote') { resolveConflict('remote'); }
          }}
        />
      )}

      {/* PDF generation dialog */}
      {showGenerationDialog && (
        <CertificateGenerationDialog
          open={showGenerationDialog}
          onOpenChange={setShowGenerationDialog}
          isGenerating={isGenerating}
          pdfUrl={generatedPdfUrl}
          filename={pdfFilename}
          error={generationError}
          certificateType="BESS"
        />
      )}
    </div>
  );
}
