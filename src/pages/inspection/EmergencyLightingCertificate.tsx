/**
 * EmergencyLightingCertificate.tsx
 * Emergency Lighting Certificate (BS 5266)
 * For installation, commissioning, and periodic testing
 *
 * Features:
 * - Smart auto-fill from Business Settings
 * - Luminaire database with 30+ UK models
 * - BS 5266 / EN 1838 compliance validation
 * - Real-time lux and test result validation
 * - Auto-calculate next test dates (monthly/annual)
 * - Auto-save to localStorage (crash recovery)
 * - Auto-sync to cloud (never lose data)
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  ArrowLeft,
  Lightbulb,
  Save,
  Download,
  Loader2,
  Cloud,
  CloudOff,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import { reportCloud } from '@/utils/reportCloud';
import { WhatsAppShareButton } from '@/components/ui/WhatsAppShareButton';
import { draftStorage } from '@/utils/draftStorage';
import { supabase } from '@/integrations/supabase/client';

import EmergencyLightingFormTabs from '@/components/inspection/emergency-lighting/EmergencyLightingFormTabs';
import { useEmergencyLightingTabs } from '@/hooks/useEmergencyLightingTabs';
import { getDefaultEmergencyLightingFormData } from '@/types/emergency-lighting';
import { useEmergencyLightingSmartForm } from '@/hooks/inspection/useEmergencyLightingSmartForm';
import { formatEmergencyLightingJson } from '@/utils/emergencyLightingJsonFormatter';

// Constants
const REPORT_TYPE = 'emergency-lighting';
const AUTO_SAVE_INTERVAL = 10000; // 10 seconds
const CLOUD_SYNC_DEBOUNCE = 30000; // 30 seconds

type SyncStatus = 'synced' | 'syncing' | 'pending' | 'offline' | 'error';

export default function EmergencyLightingCertificate() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const isNew = id === 'new' || !id;

  // State
  const [formData, setFormData] = useState<any>(getDefaultEmergencyLightingFormData());
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(!isNew);
  const [savedReportId, setSavedReportId] = useState<string | null>(
    id !== 'new' ? id || null : null
  );
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('synced');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showRecoveryDialog, setShowRecoveryDialog] = useState(false);
  const [recoveryDraft, setRecoveryDraft] = useState<{ data: any; lastModified: Date } | null>(
    null
  );
  const [user, setUser] = useState<any>(null);

  // Refs for auto-save
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const cloudSyncTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastSavedDataRef = useRef<string>('');
  const hasUnsavedChangesRef = useRef(false);

  // Smart form hook for company branding and auto-fill
  const { loadCompanyBranding, hasSavedCompanyBranding } = useEmergencyLightingSmartForm();

  // Hooks for tabs
  const tabProps = useEmergencyLightingTabs(formData);

  // Track online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Trigger cloud sync when back online
      if (hasUnsavedChangesRef.current) {
        syncToCloud();
      }
    };
    const handleOffline = () => {
      setIsOnline(false);
      setSyncStatus('offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Get current user
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Check for recoverable draft on mount
  useEffect(() => {
    if (isNew) {
      const hasRecoverable = draftStorage.hasRecoverableDraft(REPORT_TYPE);
      if (hasRecoverable) {
        const draft = draftStorage.loadDraft(REPORT_TYPE, null);
        if (draft) {
          setRecoveryDraft(draft);
          setShowRecoveryDialog(true);
        }
      }
    }
  }, [isNew]);

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

          // Check if local draft is newer than cloud
          const localDraft = draftStorage.loadDraft(REPORT_TYPE, id);
          const report = await reportCloud.getReportData(id, authUser.id);

          if (report) {
            // Check if we have a newer local version
            if (localDraft && draftStorage.isLocalDraftNewer(REPORT_TYPE, id, report.updated_at)) {
              setFormData({ ...getDefaultEmergencyLightingFormData(), ...localDraft.data });
              toast.info('Loaded local changes (newer than cloud)');
            } else {
              setFormData({ ...getDefaultEmergencyLightingFormData(), ...report });
            }
            lastSavedDataRef.current = JSON.stringify(report);
          } else if (localDraft) {
            // No cloud data but have local draft
            setFormData({ ...getDefaultEmergencyLightingFormData(), ...localDraft.data });
            toast.info('Loaded from local storage');
          }
        } catch (error) {
          console.error('[EmergencyLighting] Failed to load report:', error);
          // Try to load from local storage as fallback
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

  // Save to localStorage (fast, synchronous)
  const saveToLocalStorage = useCallback(() => {
    const reportId = savedReportId || null;
    draftStorage.saveDraft(REPORT_TYPE, reportId, formData);
    console.log('[EmergencyLighting] Saved to localStorage');
  }, [formData, savedReportId]);

  // Sync to cloud (debounced)
  const syncToCloud = useCallback(async () => {
    if (!user || !isOnline) {
      setSyncStatus(isOnline ? 'pending' : 'offline');
      return;
    }

    const currentData = JSON.stringify(formData);
    if (currentData === lastSavedDataRef.current) {
      return; // No changes to sync
    }

    setSyncStatus('syncing');

    try {
      const dataToSave = {
        ...formData,
        client_name: formData.clientName,
        installation_address: formData.premisesAddress,
      };

      if (savedReportId) {
        const result = await reportCloud.updateReport(savedReportId, user.id, dataToSave);
        if (result.success) {
          lastSavedDataRef.current = currentData;
          hasUnsavedChangesRef.current = false;
          setSyncStatus('synced');
          // Clear local draft after successful sync
          draftStorage.clearDraft(REPORT_TYPE, savedReportId);
        } else {
          throw new Error(result.error?.message || 'Sync failed');
        }
      } else {
        // Create new report
        const result = await reportCloud.createReport(user.id, 'emergency-lighting', dataToSave);
        if (result.success && result.reportId) {
          setSavedReportId(result.reportId);
          lastSavedDataRef.current = currentData;
          hasUnsavedChangesRef.current = false;
          setSyncStatus('synced');
          // Update URL without navigation
          window.history.replaceState(
            null,
            '',
            `/electrician/inspection-testing/emergency-lighting/${result.reportId}`
          );
          // Clear the "new" draft
          draftStorage.clearDraft(REPORT_TYPE, null);
        } else {
          throw new Error(result.error?.message || 'Failed to create');
        }
      }
    } catch (error) {
      console.error('[EmergencyLighting] Cloud sync failed:', error);
      setSyncStatus('error');
      // Data is still safe in localStorage
    }
  }, [formData, savedReportId, user, isOnline]);

  // Auto-save effect - runs every 10 seconds
  useEffect(() => {
    autoSaveTimerRef.current = setInterval(() => {
      if (hasUnsavedChangesRef.current) {
        saveToLocalStorage();
      }
    }, AUTO_SAVE_INTERVAL);

    return () => {
      if (autoSaveTimerRef.current) {
        clearInterval(autoSaveTimerRef.current);
      }
    };
  }, [saveToLocalStorage]);

  // Cloud sync effect - runs 30 seconds after last change
  useEffect(() => {
    if (cloudSyncTimerRef.current) {
      clearTimeout(cloudSyncTimerRef.current);
    }

    if (hasUnsavedChangesRef.current && isOnline) {
      cloudSyncTimerRef.current = setTimeout(() => {
        syncToCloud();
      }, CLOUD_SYNC_DEBOUNCE);
    }

    return () => {
      if (cloudSyncTimerRef.current) {
        clearTimeout(cloudSyncTimerRef.current);
      }
    };
  }, [formData, syncToCloud, isOnline]);

  // CRITICAL: Save before page unload
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Always save to localStorage immediately
      if (
        formData &&
        (formData.clientName || formData.premisesAddress || (formData.luminaires || []).length > 0)
      ) {
        draftStorage.saveDraft(REPORT_TYPE, savedReportId, formData);
        console.log('[EmergencyLighting] Emergency save on beforeunload');
      }

      // Warn user if there are unsynced changes
      if (hasUnsavedChangesRef.current && syncStatus !== 'synced') {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
        return e.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [formData, savedReportId, syncStatus]);

  // Update form field
  const handleUpdate = useCallback((field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
    hasUnsavedChangesRef.current = true;
    setSyncStatus('pending');
  }, []);

  // Handle draft recovery
  const handleRecoverDraft = () => {
    if (recoveryDraft) {
      setFormData({ ...getDefaultEmergencyLightingFormData(), ...recoveryDraft.data });
      toast.success('Draft recovered');
    }
    setShowRecoveryDialog(false);
    setRecoveryDraft(null);
  };

  const handleDiscardDraft = () => {
    draftStorage.clearDraft(REPORT_TYPE, null);
    setShowRecoveryDialog(false);
    setRecoveryDraft(null);
  };

  // Manual save draft (explicit user action)
  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      // Always save to localStorage first
      saveToLocalStorage();

      if (!user) {
        toast.error('Please sign in to save to cloud');
        setIsSaving(false);
        return;
      }

      const dataToSave = {
        ...formData,
        status: 'draft',
        client_name: formData.clientName,
        installation_address: formData.premisesAddress,
      };

      if (savedReportId) {
        const result = await reportCloud.updateReport(savedReportId, user.id, dataToSave);
        if (result.success) {
          lastSavedDataRef.current = JSON.stringify(formData);
          hasUnsavedChangesRef.current = false;
          setSyncStatus('synced');
          draftStorage.clearDraft(REPORT_TYPE, savedReportId);
          toast.success('Saved to cloud');
        } else {
          throw new Error(result.error?.message || 'Failed to save');
        }
      } else {
        const result = await reportCloud.createReport(user.id, 'emergency-lighting', dataToSave);
        if (result.success && result.reportId) {
          setSavedReportId(result.reportId);
          lastSavedDataRef.current = JSON.stringify(formData);
          hasUnsavedChangesRef.current = false;
          setSyncStatus('synced');
          draftStorage.clearDraft(REPORT_TYPE, null);
          toast.success('Saved to cloud');
          window.history.replaceState(
            null,
            '',
            `/electrician/inspection-testing/emergency-lighting/${result.reportId}`
          );
        } else {
          throw new Error(result.error?.message || 'Failed to create report');
        }
      }
    } catch (error) {
      console.error('[EmergencyLighting] Save failed:', error);
      toast.error('Cloud save failed - saved locally');
      setSyncStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  // Generate certificate PDF
  const handleGenerateCertificate = async () => {
    setIsGenerating(true);
    try {
      // Save first
      await handleSaveDraft();

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
            accentColor: branding.companyAccentColor || dataWithCertNumber.accentColor,
            registrationSchemeLogo:
              branding.registrationSchemeLogo || dataWithCertNumber.registrationSchemeLogo,
            registrationScheme:
              branding.registrationScheme || dataWithCertNumber.registrationScheme,
          };
        }
      }

      // Use the JSON formatter to prepare PDF data with all proper formatting
      const pdfData = formatEmergencyLightingJson(dataWithCertNumber);

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

      // Download the PDF
      const { generatePdfFilename } = await import('@/utils/pdfFilenameGenerator');
      const filename = generatePdfFilename(
        'EmergencyLighting',
        dataWithCertNumber.certificateNumber || 'EL',
        dataWithCertNumber.clientName || 'Client',
        dataWithCertNumber.testDate || new Date()
      );

      const response = await fetch(functionData.pdfUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 100);

      toast.success('Certificate generated and downloaded');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to generate certificate');
    } finally {
      setIsGenerating(false);
    }
  };

  // Render sync status indicator
  const renderSyncStatus = () => {
    switch (syncStatus) {
      case 'synced':
        return (
          <Badge className="bg-green-500/20 text-green-400 border-0 text-[10px] px-2 py-0.5 font-semibold gap-1">
            <CheckCircle2 className="h-3 w-3" />
            Saved
          </Badge>
        );
      case 'syncing':
        return (
          <Badge className="bg-blue-500/20 text-blue-400 border-0 text-[10px] px-2 py-0.5 font-semibold gap-1">
            <Loader2 className="h-3 w-3 animate-spin" />
            Syncing
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400 border-0 text-[10px] px-2 py-0.5 font-semibold gap-1">
            <Cloud className="h-3 w-3" />
            Unsaved
          </Badge>
        );
      case 'offline':
        return (
          <Badge className="bg-orange-500/20 text-orange-400 border-0 text-[10px] px-2 py-0.5 font-semibold gap-1">
            <CloudOff className="h-3 w-3" />
            Offline
          </Badge>
        );
      case 'error':
        return (
          <Badge className="bg-red-500/20 text-red-400 border-0 text-[10px] px-2 py-0.5 font-semibold gap-1">
            <AlertCircle className="h-3 w-3" />
            Error
          </Badge>
        );
      default:
        return null;
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
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Recover Unsaved Work?</AlertDialogTitle>
            <AlertDialogDescription>
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
              Would you like to recover this work?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleDiscardDraft}>Start Fresh</AlertDialogCancel>
            <AlertDialogAction onClick={handleRecoverDraft}>Recover Draft</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Mobile-First Header */}
      <div className="bg-[#242428] border-b border-amber-500/20 sticky top-0 z-10 pt-[env(safe-area-inset-top)]">
        <div className="px-4 py-3">
          {/* Top Row - Back & Actions */}
          <div className="flex items-center justify-between mb-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-white/60 hover:text-white hover:bg-white/10 -ml-2 h-11 px-2 touch-manipulation active:scale-[0.98] transition-transform"
              onClick={() => navigate('/electrician/inspection-testing')}
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>

            <div className="flex items-center gap-2">
              {renderSyncStatus()}

              <Button
                variant="ghost"
                size="icon"
                onClick={handleSaveDraft}
                disabled={isSaving}
                className="h-11 w-11 text-white/60 hover:text-white hover:bg-white/10 touch-manipulation active:scale-[0.98] transition-transform"
                aria-label="Save draft"
              >
                {isSaving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
              </Button>

              <Button
                size="sm"
                onClick={handleGenerateCertificate}
                disabled={isGenerating}
                className="bg-amber-500 hover:bg-amber-600 text-white h-11 px-3 font-semibold rounded-lg touch-manipulation active:scale-[0.98] transition-transform"
                aria-label="Generate certificate PDF"
              >
                {isGenerating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
              </Button>

              <WhatsAppShareButton
                type="emergency-lighting"
                id={savedReportId || id || 'new'}
                recipientPhone={formData.clientTelephone || ''}
                recipientName={formData.clientName || ''}
                documentLabel="Emergency Lighting Certificate"
                variant="ghost"
                className="h-11 w-11 touch-manipulation active:scale-[0.98] transition-transform"
              />
            </div>
          </div>

          {/* Title Row */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center">
              <Lightbulb className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white">
                {isNew ? 'New Emergency Lighting' : 'Emergency Lighting'}
              </h1>
              <h1 className="text-base font-bold text-white -mt-0.5">Certificate</h1>
              <p className="text-[11px] text-white/50">BS 5266 Compliance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Edge-to-edge on mobile, padded on desktop */}
      <main className="py-4 pb-4 sm:px-4 sm:pb-8">
        <EmergencyLightingFormTabs
          currentTab={tabProps.currentTab}
          onTabChange={tabProps.setCurrentTab}
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
          }}
          onGenerateCertificate={handleGenerateCertificate}
          onSaveDraft={handleSaveDraft}
          canGenerateCertificate={!isGenerating}
        />
      </main>
    </div>
  );
}
