/**
 * EVChargingCertificate.tsx
 * EV Charging Point Installation Certificate (IET Code of Practice)
 *
 * Features:
 * - 8-layer auto-save via useReportSync
 * - Draft recovery dialog
 * - PDF generation with Part P notification
 */

import { useState, useEffect, useCallback } from 'react';
import { useAppReview } from '@/hooks/useAppReview';
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
import { reportCloud } from '@/utils/reportCloud';
import { createNotificationFromCertificate } from '@/utils/notificationHelper';
import { draftStorage } from '@/utils/draftStorage';
import { supabase } from '@/integrations/supabase/client';
import { trackFeatureUse } from '@/components/ActivityTracker';
import { formatEVChargingJson } from '@/utils/evChargingJsonFormatter';

import EVChargingFormTabs from '@/components/inspection/ev-charging/EVChargingFormTabs';
import { useEVChargingTabs } from '@/hooks/useEVChargingTabs';
import { getDefaultEVChargingFormData } from '@/types/ev-charging';
import { useEVChargingSmartForm } from '@/hooks/inspection/useEVChargingSmartForm';
import CertificateGenerationDialog from '@/components/inspection/CertificateGenerationDialog';
import { useReportSync } from '@/hooks/useReportSync';
import { SyncStatusBadge } from '@/components/inspection/SyncStatusBadge';
import { ConflictResolutionDialog } from '@/components/inspection/ConflictResolutionDialog';

const REPORT_TYPE = 'ev-charging' as const;

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function EVChargingCertificate() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { recordPositiveAction } = useAppReview();

  const isNew = id === 'new' || !id;

  // State
  const [formData, setFormData] = useState<any>(getDefaultEVChargingFormData());
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showGenerationDialog, setShowGenerationDialog] = useState(false);
  const [generatedPdfUrl, setGeneratedPdfUrl] = useState<string | null>(null);
  const [pdfFilename, setPdfFilename] = useState('EVCharging-Certificate.pdf');
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(!isNew);
  const [savedReportId, setSavedReportId] = useState<string | null>(
    id !== 'new' ? id || null : null
  );
  const [customerId, setCustomerId] = useState<string | undefined>(undefined);
  const [showRecoveryDialog, setShowRecoveryDialog] = useState(false);
  const [recoveryDraft, setRecoveryDraft] = useState<{ data: any; lastModified: Date } | null>(
    null
  );

  // ─── Report sync (replaces all custom sync code) ──────────────────────
  const {
    status: syncStatus,
    saveNow,
    syncNowImmediate,
    hasRecoverableDraft,
    recoverDraft,
    discardDraft,
    onTabChange: syncOnTabChange,
    activeConflict,
    resolveConflict,
  } = useReportSync({
    reportId: savedReportId,
    reportType: REPORT_TYPE,
    formData,
    enabled: !isLoading,
    isHydrating: isLoading, // Gate autosave while loading from cloud — prevents blank-overwrite race.
    customerId,
    onReportCreated: (newId) => {
      setSavedReportId(newId);
      window.history.replaceState(null, '', `/electrician/inspection-testing/ev-charging/${newId}`);
    },
  });

  // Track certificate opened
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) trackFeatureUse(user.id, 'certificate_opened', { type: 'ev-charging' });
    });
  }, []);

  // Smart form hook for company branding and auto-fill
  const { loadCompanyBranding, hasSavedCompanyBranding } = useEVChargingSmartForm();

  // Hooks for tabs
  const tabProps = useEVChargingTabs(formData);

  // Check for recoverable draft on mount
  useEffect(() => {
    if (isNew && hasRecoverableDraft) {
      const draft = draftStorage.loadDraft(REPORT_TYPE, null);
      if (draft) {
        setRecoveryDraft(draft);
        setShowRecoveryDialog(true);
      }
    }
  }, [isNew, hasRecoverableDraft]);

  // Load existing report or local draft
  useEffect(() => {
    const loadReport = async () => {
      if (!isNew && id) {
        try {
          const {
            data: { user: authUser },
          } = await supabase.auth.getUser();
          if (!authUser) {
            setIsLoading(false);
            return;
          }

          const localDraft = draftStorage.loadDraft(REPORT_TYPE, id);
          const report = await reportCloud.getReportData(id, authUser.id);

          if (report) {
            if (localDraft && draftStorage.isLocalDraftNewer(REPORT_TYPE, id, report.updated_at)) {
              setFormData({ ...getDefaultEVChargingFormData(), ...localDraft.data });
              toast.info('Loaded local changes (newer than cloud)');
            } else {
              setFormData({ ...getDefaultEVChargingFormData(), ...report });
            }
          } else if (localDraft) {
            setFormData({ ...getDefaultEVChargingFormData(), ...localDraft.data });
            toast.info('Loaded from local storage');
          }
        } catch (error) {
          console.error('[EVCharging] Failed to load report:', error);
          const localDraft = draftStorage.loadDraft(REPORT_TYPE, id);
          if (localDraft) {
            setFormData({ ...getDefaultEVChargingFormData(), ...localDraft.data });
            toast.warning('Loaded from local backup (cloud unavailable)');
          } else {
            toast.error('Failed to load certificate');
          }
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    loadReport();
  }, [id, isNew]);

  // Update form field
  const handleUpdate = useCallback((field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  // Handle draft recovery
  const handleRecoverDraft = () => {
    if (recoveryDraft) {
      setFormData({ ...getDefaultEVChargingFormData(), ...recoveryDraft.data });
      toast.success('Draft recovered');
    } else {
      const recovered = recoverDraft();
      if (recovered) {
        setFormData({ ...getDefaultEVChargingFormData(), ...recovered });
        toast.success('Draft recovered');
      }
    }
    setShowRecoveryDialog(false);
    setRecoveryDraft(null);
  };

  const handleDiscardDraft = () => {
    discardDraft();
    setShowRecoveryDialog(false);
    setRecoveryDraft(null);
  };

  // Manual save draft
  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      const result = await saveNow();
      if (result.success) {
        toast.success('Saved to cloud');
      } else {
        toast.error('Cloud save failed - saved locally');
      }
    } catch (error) {
      console.error('[EVCharging] Save failed:', error);
      toast.error('Cloud save failed - saved locally');
    } finally {
      setIsSaving(false);
    }
  };

  // Generate certificate PDF
  const handleGenerateCertificate = async () => {
    setIsGenerating(true);
    setGeneratedPdfUrl(null);
    setGenerationError(null);
    setShowGenerationDialog(true);
    try {
      await syncNowImmediate();

      let dataWithCertNumber = {
        ...formData,
        certificateNumber: formData.certificateNumber || `EVC-${Date.now()}`,
      };

      if (hasSavedCompanyBranding) {
        const branding = loadCompanyBranding();
        if (branding) {
          dataWithCertNumber = {
            ...dataWithCertNumber,
            companyLogo: branding.companyLogo || dataWithCertNumber.companyLogo,
            companyName:
              branding.companyName ||
              dataWithCertNumber.companyName ||
              dataWithCertNumber.installerCompany,
            companyAddress: branding.companyAddress || dataWithCertNumber.companyAddress,
            companyPhone: branding.companyPhone || dataWithCertNumber.companyPhone,
            companyEmail: branding.companyEmail || dataWithCertNumber.companyEmail,
            companyAccentColor:
              branding.companyAccentColor || dataWithCertNumber.companyAccentColor,
            registrationSchemeLogo:
              branding.registrationSchemeLogo || dataWithCertNumber.registrationSchemeLogo,
            registrationScheme:
              branding.registrationScheme || dataWithCertNumber.registrationScheme,
            registrationNumber:
              branding.registrationNumber || dataWithCertNumber.registrationNumber,
            companyWebsite: branding.companyWebsite || dataWithCertNumber.companyWebsite,
            companyTagline: branding.companyTagline || dataWithCertNumber.companyTagline,
          };
        }
      }

      // Auto-resolve scheme logo
      const schemeName = dataWithCertNumber.registrationScheme;
      const currentLogo = dataWithCertNumber.registrationSchemeLogo || '';
      const isPlaceholderLogo =
        !currentLogo || currentLogo.length < 2000 || currentLogo.includes('image/svg+xml');
      if (schemeName && schemeName !== 'none' && schemeName !== 'other' && isPlaceholderLogo) {
        try {
          const { getSchemeInfo } = await import('@/constants/schemeLogos');
          const info = getSchemeInfo(schemeName);
          if (info) {
            const resp = await fetch(info.logoPath);
            const blob = await resp.blob();
            const dataUrl = await new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result as string);
              reader.onerror = reject;
              reader.readAsDataURL(blob);
            });
            dataWithCertNumber = { ...dataWithCertNumber, registrationSchemeLogo: dataUrl };
          }
        } catch (err) {
          console.warn('[EVCharging] Failed to resolve scheme logo:', err);
        }
      }

      const pdfData = formatEVChargingJson(dataWithCertNumber);

      if (savedReportId) {
        await supabase
          .from('reports')
          .update({ pdf_payload: pdfData })
          .eq('report_id', savedReportId);
      }

      const { data: functionData, error: functionError } = await supabase.functions.invoke(
        'generate-ev-charging-pdf',
        {
          body: { formData: pdfData },
        }
      );

      if (functionError) {
        throw new Error(functionError.message || 'Failed to generate PDF');
      }

      if (!functionData?.success || !functionData?.pdfUrl) {
        throw new Error(functionData?.error || 'No PDF URL returned');
      }

      const { generatePdfFilename } = await import('@/utils/pdfFilenameGenerator');
      const filename = generatePdfFilename(
        'EVCharging',
        formData.certificateNumber || 'EVC',
        formData.clientName || 'Client',
        formData.installationDate || new Date()
      );

      setGeneratedPdfUrl(functionData.pdfUrl);
      setPdfFilename(filename);

      // Save pdf_url and create Part P notification
      if (savedReportId) {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        // ELE-413: Save PDF to permanent Supabase Storage (PDFMonkey URLs expire in 7 days)
        let permanentPdfUrl = functionData.pdfUrl;
        if (user) {
          try {
            const { saveCertificatePdf } = await import('@/utils/certificate-pdf-storage');
            const { permanentUrl, storagePath } = await saveCertificatePdf(
              functionData.pdfUrl,
              user.id,
              savedReportId,
              formData.certificateNumber
            );
            permanentPdfUrl = permanentUrl;

            await supabase
              .from('reports')
              .update({ storage_path: storagePath })
              .eq('report_id', savedReportId);
          } catch (storageErr) {
            console.warn('[EVCharging] Permanent PDF storage failed, using temp URL:', storageErr);
          }
        }

        await supabase
          .from('reports')
          .update({
            pdf_url: permanentPdfUrl,
            pdf_generated_at: new Date().toISOString(),
            status: 'completed',
          })
          .eq('report_id', savedReportId);

        if (user) {
          await createNotificationFromCertificate(savedReportId, 'ev-charging', formData, user.id);
        }
      }

      toast.success('Certificate generated successfully');
      recordPositiveAction();
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Failed to generate certificate';
      setGenerationError(msg);
      toast.error(msg);
    } finally {
      setIsGenerating(false);
    }
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
            <AlertDialogTitle className="text-white text-base font-bold">Recover Unsaved Work?</AlertDialogTitle>
            <AlertDialogDescription className="text-white text-sm">
              We found an unsaved EV Charging certificate from{' '}
              {recoveryDraft?.lastModified.toLocaleString()}.
              {recoveryDraft?.data?.clientName && (
                <span className="block mt-2 font-medium text-elec-yellow">
                  Client: {recoveryDraft.data.clientName}
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col gap-2 sm:flex-col">
            <AlertDialogAction onClick={handleRecoverDraft} className="w-full h-11 rounded-xl bg-elec-yellow/15 border border-elec-yellow/25 text-elec-yellow font-medium hover:bg-elec-yellow/25 active:scale-[0.98] transition-all touch-manipulation">Recover Draft</AlertDialogAction>
            <AlertDialogCancel onClick={handleDiscardDraft} className="w-full h-11 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white font-medium hover:bg-white/[0.08] active:scale-[0.98] transition-all touch-manipulation mt-0">Start Fresh</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Header — matches EICR/EIC/MW pattern */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm">
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
                <h1 className="text-sm font-bold text-white leading-tight">EV Charging</h1>
                {formData.certificateNumber && (
                  <p className="text-[10px] text-white font-mono mt-0.5">
                    {formData.certificateNumber}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <SyncStatusBadge status={syncStatus} />
              <button
                onClick={handleSaveDraft}
                disabled={isSaving || syncStatus.cloud === 'syncing'}
                className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white touch-manipulation active:scale-[0.98] disabled:opacity-50"
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
        <div className="h-[2px] bg-gradient-to-r from-elec-yellow/40 via-elec-yellow/20 to-transparent" />
      </div>

      {/* Main Content */}
      <main className="py-4 pb-4 sm:px-4 sm:pb-8">
        <EVChargingFormTabs
          currentTab={tabProps.currentTab}
          onTabChange={(tab) => {
            tabProps.setCurrentTab(tab);
            syncOnTabChange();
          }}
          canAccessTab={tabProps.canAccessTab}
          formData={formData}
          onUpdate={handleUpdate}
          customerId={customerId}
          onCustomerIdChange={setCustomerId}
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
            onGenerateCertificate: handleGenerateCertificate,
            canGenerateCertificate: !isGenerating,
            whatsApp: formData.clientTelephone
              ? {
                  type: 'ev-charging',
                  id: savedReportId || 'new',
                  recipientPhone: formData.clientTelephone,
                  recipientName: formData.clientName || 'Client',
                  documentLabel: 'EV Charging Certificate',
                }
              : undefined,
          }}
          onGenerateCertificate={handleGenerateCertificate}
          onSaveDraft={handleSaveDraft}
          canGenerateCertificate={!isGenerating}
          reportId={savedReportId}
        />
      </main>
      <CertificateGenerationDialog
        open={showGenerationDialog}
        onOpenChange={setShowGenerationDialog}
        isGenerating={isGenerating}
        pdfUrl={generatedPdfUrl}
        pdfFilename={pdfFilename}
        errorMessage={generationError}
        documentLabel="Certificate"
      />

      <ConflictResolutionDialog conflict={activeConflict} onResolve={resolveConflict} />
    </div>
  );
}
