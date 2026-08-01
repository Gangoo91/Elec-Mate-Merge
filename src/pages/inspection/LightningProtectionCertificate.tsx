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
import { toast } from 'sonner';
import { reportCloud } from '@/utils/reportCloud';
import { draftStorage } from '@/utils/draftStorage';
import { supabase } from '@/integrations/supabase/client';
import { trackFeatureUse } from '@/components/ActivityTracker';

import LPFormTabs from '@/components/inspection/lightning-protection/LPFormTabs';
import CertShellHeader from '@/components/inspection/shared/CertShellHeader';
import { useLightningProtectionTabs, LPTabValue } from '@/hooks/useLightningProtectionTabs';
import { getDefaultLightningProtectionFormData } from '@/types/lightning-protection';
import { useLightningProtectionSmartForm } from '@/hooks/inspection/useLightningProtectionSmartForm';
import CertificateGenerationDialog from '@/components/inspection/CertificateGenerationDialog';
import { useReportSync } from '@/hooks/useReportSync';
import { formatLightningProtectionJson } from '@/utils/lightningProtectionJsonFormatter';
import { useCertLock } from '@/hooks/useCertLock';
import CertLockBar from '@/components/inspection/CertLockBar';
import { cn } from '@/lib/utils';
import { ConflictResolutionDialog } from '@/components/inspection/ConflictResolutionDialog';

const REPORT_TYPE = 'lightning-protection' as const;

/* eslint-disable @typescript-eslint/no-explicit-any */

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
    onAmended: (newId) => navigate(`/electrician/inspection-testing/lightning-protection/${newId}`),
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
    onReportCreated: (newId) => {
      setSavedReportId(newId);
      window.history.replaceState(null, '', `/electrician/inspection-testing/lightning-protection/${newId}`);
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
    isCurrentTabComplete, isTabComplete, getProgressPercentage,
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

      // Single payload builder — same formatter as bulk export and email, so
      // boolean/array coercions and next-due fallbacks apply on every path.
      const payload = formatLightningProtectionJson(dataWithCertNumber);

      const { data: functionData, error: functionError } = await supabase.functions.invoke('generate-lightning-protection-pdf', { body: { formData: payload } });
      if (functionError) throw new Error(functionError.message || 'PDF generation failed');
      if (!functionData?.download_url) throw new Error('No PDF URL returned');

      let permanentPdfUrl = functionData.download_url;
      try {
        const { saveCertificatePdf } = await import('@/utils/certificate-pdf-storage');
        const { permanentUrl, storagePath } = await saveCertificatePdf(functionData.download_url, user.id, savedReportId!, dataWithCertNumber.certificateNumber);
        permanentPdfUrl = permanentUrl;
        await supabase.from('reports').update({ storage_path: storagePath, pdf_url: permanentPdfUrl, pdf_generated_at: new Date().toISOString(), status: 'completed', pdf_payload: payload }).eq('report_id', savedReportId);
      } catch (storageErr) {
        console.warn('[LP] Storage failed:', storageErr);
        await supabase.from('reports').update({ pdf_url: permanentPdfUrl, pdf_generated_at: new Date().toISOString(), status: 'completed', pdf_payload: payload }).eq('report_id', savedReportId);
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
      {/* Shell header — fixed bar with progress ring + full-width step tabs */}
      <CertShellHeader
        onBack={() => navigate(-1)}
        title="Lightning Protection"
        subtitle={formData.certificateNumber ? `${formData.certificateNumber} · BS EN 62305` : null}
        isSaving={isSaving}
        onManualSave={handleSaveDraft}
        syncStatus={syncStatus}
        progressPercent={getProgressPercentage()}
        steps={[
          { id: 'certificate', label: 'Site' },
          { id: 'installation', label: 'Install' },
          { id: 'visual', label: 'Visual' },
          { id: 'testing', label: 'Testing' },
          { id: 'observations', label: 'Sign off' },
        ]}
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab as LPTabValue);
          syncOnTabChange();
          window.scrollTo({ top: 0 });
        }}
        completedTabs={{
          certificate: !!isTabComplete('certificate'),
          installation: !!isTabComplete('installation'),
          visual: !!isTabComplete('visual'),
          testing: !!isTabComplete('testing'),
          observations: !!isTabComplete('observations'),
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
        <LPFormTabs
          formData={formData} onUpdate={handleUpdate}
          currentTab={currentTab} onTabChange={handleTabChange}
          currentTabIndex={currentTabIndex} totalTabs={totalTabs}
          canNavigateNext={canNavigateNext} canNavigatePrevious={canNavigatePrevious}
          onNext={navigateNext} onPrevious={navigatePrevious}
          isCurrentTabComplete={isCurrentTabComplete} progress={getProgressPercentage()}
          onGenerate={handleGenerateCertificate} isGenerating={isGenerating}
          reportId={savedReportId}
        />
      </div>
      </main>

      <AlertDialog open={showRecoveryDialog} onOpenChange={setShowRecoveryDialog}>
        <AlertDialogContent className="max-w-[90vw] sm:max-w-md bg-[#111114] border border-white/[0.08] rounded-2xl shadow-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white text-base font-bold">Recover unsaved work?</AlertDialogTitle>
            <AlertDialogDescription className="text-white text-sm">
              We found an unsaved lightning protection certificate
              {recoveryDraft?.lastModified ? ` from ${recoveryDraft.lastModified.toLocaleString()}` : ''}.
              Would you like to recover it?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col gap-2 sm:flex-col sm:space-x-0">
            <AlertDialogAction onClick={handleRecoverDraft} className="w-full h-11 rounded-xl bg-elec-yellow font-semibold text-black hover:bg-elec-yellow/90 active:scale-[0.98] transition-all touch-manipulation">Recover draft</AlertDialogAction>
            <AlertDialogCancel onClick={handleDiscardDraft} className="w-full h-11 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white font-medium hover:bg-white/[0.08] active:scale-[0.98] transition-all touch-manipulation mt-0">Start fresh</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {activeConflict && <ConflictResolutionDialog conflict={activeConflict} onResolve={resolveConflict} />}
      {showGenerationDialog && <CertificateGenerationDialog open={showGenerationDialog} onOpenChange={setShowGenerationDialog} isGenerating={isGenerating} pdfUrl={generatedPdfUrl} pdfFilename={pdfFilename} errorMessage={generationError} documentLabel="Lightning Protection" />}
    </div>
  );
}
