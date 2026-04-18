/**
 * EmergencyLightingCertificate.tsx
 * Emergency Lighting Certificate (BS 5266)
 *
 * Features:
 * - 8-layer auto-save via useReportSync
 * - Draft recovery dialog
 * - PDF generation via PDF Monkey
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
import { reportCloud } from '@/utils/reportCloud';
import { draftStorage } from '@/utils/draftStorage';
import { supabase } from '@/integrations/supabase/client';
import { trackFeatureUse } from '@/components/ActivityTracker';

import EmergencyLightingFormTabs from '@/components/inspection/emergency-lighting/EmergencyLightingFormTabs';
import { useEmergencyLightingTabs } from '@/hooks/useEmergencyLightingTabs';
import {
  getDefaultEmergencyLightingFormData,
  EmergencyLightingFormData,
} from '@/types/emergency-lighting';
import { useEmergencyLightingSmartForm } from '@/hooks/inspection/useEmergencyLightingSmartForm';
import { formatEmergencyLightingJson } from '@/utils/emergencyLightingJsonFormatter';
import CertificateGenerationDialog from '@/components/inspection/CertificateGenerationDialog';
import { useReportSync } from '@/hooks/useReportSync';
import { SyncStatusBadge } from '@/components/inspection/SyncStatusBadge';
import { ConflictResolutionDialog } from '@/components/inspection/ConflictResolutionDialog';

const REPORT_TYPE = 'emergency-lighting' as const;

export default function EmergencyLightingCertificate() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const isNew = id === 'new' || !id;

  // State
  const [formData, setFormData] = useState<EmergencyLightingFormData>(
    getDefaultEmergencyLightingFormData()
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showGenerationDialog, setShowGenerationDialog] = useState(false);
  const [generatedPdfUrl, setGeneratedPdfUrl] = useState<string | null>(null);
  const [pdfFilename, setPdfFilename] = useState('EmergencyLighting-Certificate.pdf');
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(!isNew);
  const [savedReportId, setSavedReportId] = useState<string | null>(
    id !== 'new' ? id || null : null
  );
  const [showRecoveryDialog, setShowRecoveryDialog] = useState(false);
  const [recoveryDraft, setRecoveryDraft] = useState<{
    data: EmergencyLightingFormData;
    lastModified: Date;
  } | null>(null);

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
    onReportCreated: (newId) => {
      setSavedReportId(newId);
      window.history.replaceState(
        null,
        '',
        `/electrician/inspection-testing/emergency-lighting/${newId}`
      );
    },
  });

  // Track certificate opened
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) trackFeatureUse(user.id, 'certificate_opened', { type: 'emergency-lighting' });
    });
  }, []);

  // Smart form hook for company branding and auto-fill
  const { loadCompanyBranding, hasSavedCompanyBranding } = useEmergencyLightingSmartForm();

  // Hooks for tabs
  const tabProps = useEmergencyLightingTabs(formData);

  // Check for recoverable draft on mount
  useEffect(() => {
    if (isNew && hasRecoverableDraft) {
      // Load preview for the recovery dialog
      const draft = draftStorage.loadDraft(REPORT_TYPE, null);
      if (draft) {
        setRecoveryDraft(draft as { data: EmergencyLightingFormData; lastModified: Date });
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
              setFormData({ ...getDefaultEmergencyLightingFormData(), ...localDraft.data });
              toast.info('Loaded local changes (newer than cloud)');
            } else {
              setFormData({ ...getDefaultEmergencyLightingFormData(), ...report });
            }
          } else if (localDraft) {
            setFormData({ ...getDefaultEmergencyLightingFormData(), ...localDraft.data });
            toast.info('Loaded from local storage');
          }
        } catch (error) {
          console.error('[EmergencyLighting] Failed to load report:', error);
          const localDraft = draftStorage.loadDraft(REPORT_TYPE, id);
          if (localDraft) {
            setFormData({ ...getDefaultEmergencyLightingFormData(), ...localDraft.data });
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
  const handleUpdate = useCallback(
    (field: string, value: EmergencyLightingFormData[keyof EmergencyLightingFormData]) => {
      setFormData((prev: EmergencyLightingFormData) => ({
        ...prev,
        [field]: value,
      }));
    },
    []
  );

  // Handle draft recovery
  const handleRecoverDraft = () => {
    if (recoveryDraft) {
      setFormData({ ...getDefaultEmergencyLightingFormData(), ...recoveryDraft.data });
      toast.success('Draft recovered');
    } else {
      const recovered = recoverDraft();
      if (recovered) {
        setFormData({ ...getDefaultEmergencyLightingFormData(), ...recovered });
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
      console.error('[EmergencyLighting] Save failed:', error);
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
      // Sync latest data to cloud before PDF generation
      await syncNowImmediate();

      // Generate certificate number if not set
      let dataWithCertNumber = {
        ...formData,
        certificateNumber: formData.certificateNumber || `EL-${Date.now()}`,
      };

      // Merge company branding from Business Settings if available
      if (hasSavedCompanyBranding) {
        const branding = loadCompanyBranding();
        if (branding) {
          dataWithCertNumber = {
            ...dataWithCertNumber,
            companyLogo: branding.companyLogo || dataWithCertNumber.companyLogo,
            companyName:
              branding.companyName ||
              dataWithCertNumber.companyName ||
              dataWithCertNumber.testerCompany,
            companyAddress: branding.companyAddress || dataWithCertNumber.companyAddress,
            companyPhone: branding.companyPhone || dataWithCertNumber.companyPhone,
            companyEmail: branding.companyEmail || dataWithCertNumber.companyEmail,
            companyWebsite: branding.companyWebsite || dataWithCertNumber.companyWebsite,
            accentColor: branding.companyAccentColor || dataWithCertNumber.accentColor,
            registrationSchemeLogo:
              branding.registrationSchemeLogo || dataWithCertNumber.registrationSchemeLogo,
            registrationScheme:
              branding.registrationScheme || dataWithCertNumber.registrationScheme,
            registrationNumber:
              branding.registrationNumber || dataWithCertNumber.registrationNumber,
          };
        }
      }

      // Auto-resolve scheme logo if scheme is set but logo is missing/placeholder
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
          console.warn('[EmergencyLighting] Failed to resolve scheme logo:', err);
        }
      }

      // Use the JSON formatter to prepare PDF data
      const pdfData = formatEmergencyLightingJson(dataWithCertNumber);

      // Save formatted payload for email/reports page reuse
      if (savedReportId) {
        await supabase
          .from('reports')
          .update({ pdf_payload: pdfData })
          .eq('report_id', savedReportId);
      }

      // Call edge function
      const { data: functionData, error: functionError } = await supabase.functions.invoke(
        'generate-emergency-lighting-pdf',
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
        'EmergencyLighting',
        dataWithCertNumber.certificateNumber || 'EL',
        dataWithCertNumber.clientName || 'Client',
        dataWithCertNumber.testDate || new Date()
      );

      setGeneratedPdfUrl(functionData.pdfUrl);
      setPdfFilename(filename);

      // ELE-413: Save pdf_url to reports table and persist to Supabase Storage
      if (savedReportId) {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        let permanentPdfUrl = functionData.pdfUrl;
        if (user) {
          try {
            const { saveCertificatePdf } = await import('@/utils/certificate-pdf-storage');
            const { permanentUrl, storagePath } = await saveCertificatePdf(
              functionData.pdfUrl,
              user.id,
              savedReportId,
              dataWithCertNumber.certificateNumber
            );
            permanentPdfUrl = permanentUrl;

            await supabase
              .from('reports')
              .update({ storage_path: storagePath })
              .eq('report_id', savedReportId);
          } catch (storageErr) {
            console.warn(
              '[EmergencyLighting] Permanent PDF storage failed, using temp URL:',
              storageErr
            );
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
      }

      toast.success('Certificate generated successfully');
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
      <div className="bg-background min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Skeleton className="h-12 w-48 mb-4" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Recovery Dialog */}
      <AlertDialog open={showRecoveryDialog} onOpenChange={setShowRecoveryDialog}>
        <AlertDialogContent className="bg-[#1a1a1e] border-white/[0.08] text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Recover Unsaved Work?</AlertDialogTitle>
            <AlertDialogDescription className="text-white">
              We found an unsaved Emergency Lighting certificate from{' '}
              {recoveryDraft?.lastModified.toLocaleString()}.
              {recoveryDraft?.data?.clientName && (
                <span className="block mt-2 font-medium">
                  Client: {recoveryDraft.data.clientName}
                </span>
              )}
              {recoveryDraft?.data?.premisesAddress && (
                <span className="block mt-1 text-sm">
                  Premises: {recoveryDraft.data.premisesAddress}
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={handleDiscardDraft}
              className="border-white/[0.12] text-white hover:bg-white/[0.06]"
            >
              Start Fresh
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRecoverDraft}
              className="bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow hover:bg-elec-yellow/30"
            >
              Recover Draft
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Header — EIC pattern */}
      <div className="bg-background">
        <div className="px-2 py-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => navigate('/electrician/inspection-testing?section=specialist')}
                className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white touch-manipulation active:scale-[0.98]"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <div>
                <h1 className="text-sm font-bold text-white leading-tight">Emergency Lighting</h1>
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
                disabled={isSaving}
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
        <div className="h-[1px] bg-gradient-to-r from-elec-yellow/40 via-elec-yellow/20 to-transparent" />
      </div>

      {/* Main Content */}
      <main className="py-4 pb-48 sm:px-4 sm:pb-8">
        <EmergencyLightingFormTabs
          currentTab={tabProps.currentTab}
          onTabChange={(tab) => {
            tabProps.setCurrentTab(tab);
            syncOnTabChange();
          }}
          canAccessTab={tabProps.canAccessTab}
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
            onGenerateCertificate: handleGenerateCertificate,
            canGenerateCertificate: !isGenerating,
            reportId: savedReportId,
            formData: formData,
            whatsApp: {
              type: 'emergency-lighting',
              id: savedReportId || id || 'new',
              recipientPhone: formData.clientTelephone || '',
              recipientName: formData.clientName || '',
              documentLabel: 'Emergency Lighting Certificate',
            },
          }}
          onGenerateCertificate={handleGenerateCertificate}
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
        errorMessage={generationError}
        documentLabel="Certificate"
      />
      {activeConflict && (
        <ConflictResolutionDialog conflict={activeConflict} onResolve={resolveConflict} />
      )}
    </div>
  );
}
