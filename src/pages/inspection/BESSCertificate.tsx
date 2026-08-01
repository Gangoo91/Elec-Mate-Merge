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
import { toast } from 'sonner';
import { reportCloud } from '@/utils/reportCloud';
import { draftStorage } from '@/utils/draftStorage';
import { supabase } from '@/integrations/supabase/client';
import { trackFeatureUse } from '@/components/ActivityTracker';

import BESSFormTabs from '@/components/inspection/bess/BESSFormTabs';
import CertShellHeader from '@/components/inspection/shared/CertShellHeader';
import { useBESSTabs } from '@/hooks/useBESSTabs';
import { getDefaultBESSFormData } from '@/types/bess';
import { useBESSSmartForm } from '@/hooks/inspection/useBESSSmartForm';
import CertificateGenerationDialog from '@/components/inspection/CertificateGenerationDialog';
import { formatBESSJson, fetchBESSReportPhotos } from '@/utils/bessJsonFormatter';
import { useReportSync } from '@/hooks/useReportSync';
import { useCertLock } from '@/hooks/useCertLock';
import CertLockBar from '@/components/inspection/CertLockBar';
import { cn } from '@/lib/utils';
import { ConflictResolutionDialog } from '@/components/inspection/ConflictResolutionDialog';

const REPORT_TYPE = 'bess' as const;

const BESS_STEPS = [
  { id: 'installation', label: 'Install' },
  { id: 'system-design', label: 'Design' },
  { id: 'electrical', label: 'Electrical' },
  { id: 'testing', label: 'Testing' },
  { id: 'declarations', label: 'Sign off' },
];

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
    onAmended: (newId) => navigate(`/electrician/inspection-testing/bess/${newId}`),
  });

const {
    status: syncStatus, saveNow, syncNowImmediate,
    hasRecoverableDraft, recoverDraft, discardDraft,
    onTabChange: syncOnTabChange, activeConflict, resolveConflict,
  } = useReportSync({
    reportId: savedReportId,
    reportType: REPORT_TYPE,
    formData,
    enabled: !isLoading && !isLocked,
    isHydrating: isLoading, // Gate autosave while loading from cloud — prevents blank-overwrite race.
    customerId,
    onReportCreated: (newId) => {
      setSavedReportId(newId);
      window.history.replaceState(null, '', `/electrician/inspection-testing/bess/${newId}`);
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
    isCurrentTabComplete, isTabComplete, getProgressPercentage,
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

      // Photo evidence lives in the inspection_photos table (nothing writes
      // formData.photos) — fetch and inject it so it reaches the PDF payload.
      const photos = savedReportId ? await fetchBESSReportPhotos(savedReportId) : [];

      const dataWithCertNumber = {
        ...formData,
        photos,
        certificateNumber: formData.certificateNumber || `BESS-${Date.now().toString(36).toUpperCase()}`,
      };

      const branding = hasSavedCompanyBranding ? loadCompanyBranding() : null;
      const pdfData = formatBESSJson(dataWithCertNumber, branding || undefined);

      // Persist the payload so server-side email regeneration has a source —
      // every autosave NULLs pdf_payload, so repopulate it at generate (EV pattern).
      if (savedReportId) {
        await supabase
          .from('reports')
          .update({ pdf_payload: pdfData })
          .eq('report_id', savedReportId);
      }

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
      {/* Shell header — fixed bar with progress ring + full-width step tabs */}
      <CertShellHeader
        onBack={() => navigate(-1)}
        title="BESS"
        subtitle={formData.certificateNumber ? `${formData.certificateNumber} · IET CoP` : null}
        isSaving={isSaving}
        onManualSave={handleSaveDraft}
        syncStatus={syncStatus}
        progressPercent={getProgressPercentage()}
        steps={BESS_STEPS}
        currentTab={currentTab}
        onTabChange={(tab) => {
          handleTabChange(tab);
          window.scrollTo({ top: 0 });
        }}
        completedTabs={{
          installation: !!isTabComplete('installation'),
          'system-design': !!isTabComplete('system-design'),
          electrical: !!isTabComplete('electrical'),
          testing: !!isTabComplete('testing'),
          declarations: !!isTabComplete('declarations'),
        }}
      />

      {/* Form — full-width mobile */}
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
      </div>
      </main>

      {/* Draft recovery dialog */}
      <AlertDialog open={showRecoveryDialog} onOpenChange={setShowRecoveryDialog}>
        <AlertDialogContent className="max-w-[90vw] sm:max-w-md bg-[#111114] border border-white/[0.08] rounded-2xl shadow-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white text-base font-bold">Recover unsaved work?</AlertDialogTitle>
            <AlertDialogDescription className="text-white text-sm">
              A previous unsaved BESS certificate was found{recoveryDraft?.lastModified ? ` from ${recoveryDraft.lastModified.toLocaleDateString('en-GB')}` : ''}. Would you like to recover it?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col gap-2 sm:flex-col sm:space-x-0">
            <AlertDialogAction onClick={handleRecoverDraft} className="w-full h-11 rounded-xl bg-elec-yellow font-semibold text-black hover:bg-elec-yellow/90 active:scale-[0.98] transition-all touch-manipulation">Recover draft</AlertDialogAction>
            <AlertDialogCancel onClick={handleDiscardDraft} className="w-full h-11 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white font-medium hover:bg-white/[0.08] active:scale-[0.98] transition-all touch-manipulation mt-0">Discard</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Conflict resolution */}
      {activeConflict && (
        <ConflictResolutionDialog
          conflict={activeConflict}
          onResolve={resolveConflict}
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
