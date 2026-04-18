import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// AnimatePresence removed - using SmartTabs animations
import StartNewEICRDialog from '@/components/StartNewEICRDialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { sanitizeTextInput } from '@/utils/inputSanitization';
import { draftStorage } from '@/utils/draftStorage';
import {
  validateLoadedData,
  saveToLocalStorageBackup,
  logIntegrityEvent,
} from '@/utils/dataIntegrity';
import MinorWorksPdfGenerator from '@/components/pdf/MinorWorksPdfGenerator';
import { useEICAutoSave } from '@/hooks/useEICAutoSave';
import { useCloudSync } from '@/hooks/useCloudSync';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { useSmartDefaults } from '@/hooks/useSmartDefaults';
import { useFormValidation } from '@/hooks/useFormValidation';
import { useMinorWorksTabs } from '@/hooks/useMinorWorksTabs';
// minorWorksDevFill.ts kept for future use — UI access removed
import { CertificatePhotoProvider } from '@/contexts/CertificatePhotoContext';
import { getZsLimitFromDeviceString } from '@/data/zsLimits';

// New tab-based components
import MWFormHeader from '@/components/minor-works/MWFormHeader';
import MWDetailsTab from '@/components/minor-works/MWDetailsTab';
import MWCircuitTab from '@/components/minor-works/MWCircuitTab';
import MWTestingTab from '@/components/minor-works/MWTestingTab';
import MWDeclarationTab from '@/components/minor-works/MWDeclarationTab';
import EICRTabNavigation from '@/components/EICRTabNavigation';
import { SmartTabs, SmartTab } from '@/components/ui/smart-tabs';
import { useMinorWorksSmartForm } from '@/hooks/useMinorWorksSmartForm';

const MinorWorksForm = ({
  onBack,
  initialReportId,
}: {
  onBack: () => void;
  initialReportId?: string | null;
}) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [userId, setUserId] = useState<string | null>(null);
  const [currentReportId, setCurrentReportId] = useState<string | null>(initialReportId || null);
  const [authChecked, setAuthChecked] = useState(false);
  // True while initial cloud hydration is in-flight. Gates cloud autosave to prevent
  // the blank initial form state overwriting real data. See 2026-04-17 incident.
  const [isLoadingReport, setIsLoadingReport] = useState<boolean>(!!initialReportId);

  // Capture customer data from navigation state
  const customerIdFromNav = location.state?.customerId;
  const customerDataFromNav = location.state?.customerData;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [formData, setFormData] = useState<any>({
    // Certificate Header
    certificateNumber: '',

    // Client & Installation Details
    propertyAddress: '',
    postcode: '',
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    workDate: '',
    dateOfCompletion: '',
    personOrderingWork: '',
    contractorName: '',
    contractorAddress: '',
    nextInspectionDue: '',

    // Work Description
    workDescription: '',
    workType: '',
    workLocation: '',
    departuresFromBS7671: '',
    permittedExceptions: '',
    riskAssessmentAttached: false,
    commentsOnExistingInstallation: '',

    // Supply & Earthing Details
    supplyVoltage: '230V',
    frequency: '50Hz',
    supplyPhases: '1',
    earthingArrangement: '',
    zdb: '',
    earthingConductorPresent: false,
    mainEarthingConductorSize: '',
    mainEarthingConductorSizeCustom: '',
    mainEarthingConductorMaterial: 'copper',
    mainBondingConductorSize: '',
    mainBondingConductorSizeCustom: '',

    // Bonding Connections
    bondingWater: false,
    bondingGas: false,
    bondingOil: false,
    bondingStructural: false,
    bondingOther: false,
    bondingOtherSpecify: '',

    // Circuit Details
    distributionBoard: '',
    dbLocationType: '',
    circuitDesignation: '',
    circuitDescription: '',
    circuitType: 'radial',
    overcurrentDeviceBsEn: '',
    protectiveDeviceType: '',
    protectiveDeviceRating: '',
    protectiveDeviceKaRating: '',

    // Protection checkboxes
    protectionRcd: false,
    protectionRcbo: false,
    protectionAfdd: false,
    protectionSpd: false,
    rcdBsEn: '',
    rcdType: '',
    rcdRatingAmps: '',
    rcdIdn: '',
    afddBsEn: '',
    afddRating: '',
    spdBsEn: '',
    spdType: '',
    numberOfConductors: '',
    liveConductorSize: '',
    cpcSize: '',
    cableType: '',
    installationMethod: '',
    referenceMethod: '',

    // Test Results
    continuityR1R2: '',
    r2Continuity: '',
    insulationLiveLive: '',
    insulationLiveNeutral: '',
    insulationLiveEarth: '',
    insulationNeutralEarth: '',
    insulationTestVoltage: '500V',
    polarity: '',
    earthFaultLoopImpedance: '',
    maxPermittedZs: '',
    prospectiveFaultCurrent: '',
    functionalTesting: '',

    // RCD/RCBO Testing
    rcdRating: '',
    rcdOneX: '',
    rcdFiveX: '',
    rcdHalfX: '',
    rcdTestButton: '',
    rcboTripTime: '',

    // AFDD Testing
    afddTestButton: '',
    afddTripTime: '',

    // SPD Testing
    spdIndicatorStatus: '',
    spdTestButton: '',
    spdVisualInspection: '',

    // Ring Circuit Continuity Tests (IET Official fields)
    ringR1: '',
    ringRn: '',
    ringR2: '',
    // Legacy ring circuit fields
    ringR1EndToEnd: '',
    ringRnEndToEnd: '',
    ringR2EndToEnd: '',
    ringR1Cross: '',
    ringRnCross: '',
    ringR2Cross: '',
    ringFinalContinuity: '',

    // Earth Electrode & Phase Rotation
    earthElectrodeResistance: '',
    phaseRotation: '',

    // Test Equipment
    testEquipmentModel: '',
    testEquipmentSerial: '',
    testEquipmentCalDate: '',
    testTemperature: '20°C',

    // Legacy individual tester fields
    continuityTesterMake: '',
    continuityTesterSerial: '',
    continuityTesterCalDate: '',
    insulationTesterMake: '',
    insulationTesterSerial: '',
    insulationTesterCalDate: '',
    loopTesterMake: '',
    loopTesterSerial: '',
    loopTesterCalDate: '',

    // Declaration
    electricianName: '',
    forAndOnBehalfOf: '',
    electricianPhone: '',
    electricianEmail: '',
    position: '',
    qualificationLevel: '',
    schemeProvider: '',
    registrationNumber: '',
    signatureDate: '',
    signature: '',
    // Consolidated IET declaration (replaces bs7671Compliance, testResultsAccurate, workSafety)
    ietDeclaration: false,
    // Legacy fields kept for backwards compatibility
    bs7671Compliance: false,
    testResultsAccurate: false,
    workSafety: false,
    partPNotification: false,
    copyProvided: false,
    additionalNotes: '',
  });

  const [showStartNewDialog, setShowStartNewDialog] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<Date | null>(null);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Tab navigation hook
  const {
    currentTab,
    setTab,
    currentTabIndex,
    totalTabs,
    canNavigateNext,
    canNavigatePrevious,
    navigateNext,
    navigatePrevious,
    getProgressPercentage,
    isTabComplete,
    toggleTabComplete,
    hasRequiredFields,
    getCurrentTabLabel,
  } = useMinorWorksTabs(formData);

  // Smart defaults and validation
  const { defaults, hasDefaults, applyDefaults, saveDefaults } = useSmartDefaults(
    userId || undefined
  );
  const validation = useFormValidation(formData);

  // Smart form auto-fill from Business Settings
  const {
    loading: smartFormLoading,
    hasAppliedDefaults: hasAppliedSmartDefaults,
    hasSavedElectricianDetails,
    hasSavedTestEquipment,
    loadElectricianDetails,
    loadTestEquipment,
    loadContractorDetails,
    getAvailableInstruments,
    applySmartDefaults,
  } = useMinorWorksSmartForm();

  // Callback when auto-sync creates a new report - keeps component state in sync
  const handleReportCreated = React.useCallback((newReportId: string) => {
    console.log('[MinorWorks] Auto-sync created report:', newReportId);
    setCurrentReportId(newReportId);
  }, []);

  // Cloud sync
  const { loadFromCloud, isAuthenticated, isOnline, syncToCloud, syncState, syncNow, onTabChange } =
    useCloudSync({
      reportId: currentReportId,
      reportType: 'minor-works',
      data: formData,
      enabled: true,
      customerId: customerIdFromNav,
      onReportCreated: handleReportCreated,
      // Gate autosave until cloud load finishes — prevents blank-overwrite race.
      isHydrating: isLoadingReport,
    });

  // Auto-save hook
  const {
    isSaving,
    lastSaveTime,
    hasUnsavedChanges,
    manualSave: autoSaveManualSave,
    loadFromLocalStorage: loadFromIndexedDB,
    clearAutoSave,
  } = useEICAutoSave({
    formData,
    interval: 30,
    reportType: 'minor-works',
    onSave: async (data) => {
      await syncToCloud(false);
    },
    enabled: true,
  });

  // Pre-fill customer details if navigating from customer page
  useEffect(() => {
    if (customerDataFromNav && !initialReportId) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setFormData((prev: any) => ({
        ...prev,
        clientName: customerDataFromNav.name || '',
        propertyAddress: customerDataFromNav.address || '',
      }));
    }
  }, [customerDataFromNav, initialReportId]);

  // Auto-fill from Business Settings for new certificates
  useEffect(() => {
    // Only apply smart defaults if:
    // 1. Not loading an existing report
    // 2. Smart form has finished loading
    // 3. Haven't already applied defaults
    if (!initialReportId && !smartFormLoading && !hasAppliedSmartDefaults) {
      applySmartDefaults(formData, handleUpdate);

      // Apply remembered earthing arrangement from previous certificates
      if (hasDefaults && defaults.earthingArrangement && !formData.earthingArrangement) {
        handleUpdate('earthingArrangement', defaults.earthingArrangement);
      }
    }
  }, [initialReportId, smartFormLoading, hasAppliedSmartDefaults]);

  // Fetch user ID on mount
  useEffect(() => {
    const fetchUserId = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) setUserId(user.id);
    };
    fetchUserId();
  }, []);

  // Auto-fill Max Permitted Zs based on protective device using BS 7671 tables
  useEffect(() => {
    if (formData.protectiveDeviceType && formData.protectiveDeviceRating) {
      const rating = parseInt(formData.protectiveDeviceRating, 10);
      if (isNaN(rating)) return;

      // Build device string for lookup
      const deviceType = formData.protectiveDeviceType;
      const circuitDesc = formData.circuitDescription || '';

      const zsResult = getZsLimitFromDeviceString(deviceType, rating, circuitDesc);

      if (zsResult?.maxZs) {
        handleUpdate('maxPermittedZs', zsResult.maxZs.toString());
      }
    }
  }, [formData.protectiveDeviceType, formData.protectiveDeviceRating, formData.circuitDescription]);

  // Auto-set Phase Rotation based on supply phases
  useEffect(() => {
    if (formData.supplyPhases === '1') {
      handleUpdate('phaseRotation', 'na');
    } else if (formData.supplyPhases === '3' && formData.phaseRotation === 'na') {
      handleUpdate('phaseRotation', '');
    }
  }, [formData.supplyPhases]);

  // Auto-fill RCD rating on Testing tab from Circuit tab's IΔn
  useEffect(() => {
    if (formData.rcdIdn && !formData.rcdRating) {
      handleUpdate('rcdRating', formData.rcdIdn);
    }
  }, [formData.rcdIdn]);

  // Auto-fill dateOfCompletion from workDate
  useEffect(() => {
    if (formData.workDate && !formData.dateOfCompletion) {
      handleUpdate('dateOfCompletion', formData.workDate);
    }
  }, [formData.workDate]);

  // Auto-fill nextInspectionDue = workDate + 1 year
  useEffect(() => {
    if (formData.workDate && !formData.nextInspectionDue) {
      const d = new Date(formData.workDate);
      d.setFullYear(d.getFullYear() + 1);
      handleUpdate('nextInspectionDue', d.toISOString().split('T')[0]);
    }
  }, [formData.workDate]);

  // ALWAYS save to localStorage before unload - never lose data
  // Also attempt cloud sync and warn user if data hasn't synced
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // CRITICAL: Save current form data to localStorage immediately
      // This is synchronous and fast - ensures data is never lost
      if (formData && currentReportId) {
        draftStorage.saveDraft('minor-works', currentReportId, formData);
        console.log('[MinorWorks] Saved draft on beforeunload');
      } else if (formData && (formData.clientName || formData.propertyAddress)) {
        // For new reports, save to 'new' key
        draftStorage.saveDraft('minor-works', null, formData);
        console.log('[MinorWorks] Saved new draft on beforeunload');
      }

      // Check if we have unsynced changes to the cloud
      const hasUnsyncedChanges = syncState.status !== 'synced';
      const hasMeaningfulData = formData.clientName || formData.propertyAddress;

      if (hasUnsyncedChanges && hasMeaningfulData) {
        // ALWAYS warn the user if data hasn't synced to cloud
        e.preventDefault();
        e.returnValue =
          'Your certificate has NOT been saved to the cloud. If you leave, you may lose your work on other devices.';
        return;
      }

      // Legacy check for syncing state
      const isCurrentlySyncing = syncState.status === 'syncing' || syncState.queuedChanges > 0;
      if (isCurrentlySyncing) {
        e.preventDefault();
        e.returnValue = 'Your certificate is still saving. Are you sure you want to leave?';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [formData, currentReportId, syncState.status, syncState.queuedChanges]);

  // Track when authentication has been checked - wait for actual session check
  useEffect(() => {
    // Only mark as checked after a brief delay to allow auth to resolve
    // This prevents race conditions with the initial auth state
    if (initialReportId) {
      const timer = setTimeout(() => {
        setAuthChecked(true);
      }, 500); // Give auth time to resolve
      return () => clearTimeout(timer);
    }
  }, [initialReportId]);

  // Load from cloud if initialReportId is provided - with localStorage priority
  useEffect(() => {
    if (initialReportId && authChecked) {
      // Step 1: Check localStorage for a draft of this report
      const localDraft = draftStorage.loadDraft('minor-works', initialReportId);

      if (!isAuthenticated) {
        // If not authenticated but have local draft, use it
        if (localDraft?.data) {
          console.log('[MinorWorks] Using local draft (not authenticated)');
          setFormData(localDraft.data);
          setCurrentReportId(initialReportId);
          toast({
            title: 'Loaded from local storage',
            description: 'Sign in to sync with cloud.',
          });
          setIsLoadingReport(false);
          return;
        }

        toast({
          title: 'Cannot load report',
          description: 'Please sign in to load reports.',
          variant: 'destructive',
        });
        setIsLoadingReport(false);
        return;
      }

      if (!isOnline) {
        // If offline but have local draft, use it
        if (localDraft?.data) {
          console.log('[MinorWorks] Using local draft (offline)');
          setFormData(localDraft.data);
          setCurrentReportId(initialReportId);
          toast({
            title: 'Loaded from local storage',
            description: 'Changes will sync when online.',
          });
          setIsLoadingReport(false);
          return;
        }

        toast({
          title: 'Cannot load report',
          description: 'You are offline.',
          variant: 'destructive',
        });
        setIsLoadingReport(false);
        return;
      }

      // Step 2: Load from cloud
      loadFromCloud(initialReportId).then((cloudResult) => {
        // Step 3: Compare timestamps - use whichever is NEWER
        // cloudResult is now { data, databaseId } format
        if (cloudResult && cloudResult.data && typeof cloudResult.data === 'object') {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data = cloudResult.data as any;
          // Use the database timestamp from cloudResult (not data.updated_at which is the form JSON and won't have this field)
          const cloudTime = new Date(
            cloudResult.updatedAt || cloudResult.lastSyncedAt || data.updated_at || 0
          ).getTime();
          const localTime = localDraft?.lastModified
            ? new Date(localDraft.lastModified).getTime()
            : 0;

          console.log('[MinorWorks] Comparing timestamps - Cloud:', cloudTime, 'Local:', localTime);

          // Validate data integrity before using
          const integrity = validateLoadedData(data, 'minor-works');

          if (!integrity.hasData) {
            // Data loaded but appears empty - this is suspicious
            logIntegrityEvent('load_empty', {
              reportType: 'minor-works',
              reportId: initialReportId,
              fieldCount: integrity.fieldCount,
              error: integrity.warnings.join('; '),
            });

            // Try localStorage backup if cloud data is empty
            if (localDraft?.data) {
              const localIntegrity = validateLoadedData(localDraft.data, 'minor-works');
              if (localIntegrity.hasData) {
                console.log('[MinorWorks] Cloud data empty, using local backup');
                setFormData(localDraft.data);
                setCurrentReportId(initialReportId);
                toast({
                  title: 'Data recovered from local backup',
                  description: 'Cloud data appeared empty. Your local version was restored.',
                });
                return;
              }
            }
          }

          if (localDraft?.data && localTime > cloudTime) {
            // Local is newer - use local data
            console.log('[MinorWorks] Using LOCAL draft (newer than cloud)');
            setFormData(localDraft.data);
            logIntegrityEvent('load_success', {
              reportType: 'minor-works',
              reportId: initialReportId,
              fieldCount: Object.keys(localDraft.data).length,
              source: 'local',
            });
            toast({
              title: 'Recovered unsaved changes',
              description: 'Your recent edits have been restored.',
            });
          } else {
            // Cloud is newer or same - use cloud data
            console.log('[MinorWorks] Using CLOUD data');
            setFormData(data);
            logIntegrityEvent('load_success', {
              reportType: 'minor-works',
              reportId: initialReportId,
              fieldCount: integrity.fieldCount,
              source: 'cloud',
            });
          }
          setCurrentReportId(initialReportId);
        } else if (localDraft?.data) {
          // Cloud failed but we have local - use local
          console.log('[MinorWorks] Cloud load failed, using local draft');
          setFormData(localDraft.data);
          setCurrentReportId(initialReportId);
          logIntegrityEvent('recovery_success', {
            reportType: 'minor-works',
            reportId: initialReportId,
            source: 'local',
          });
          toast({
            title: 'Loaded from local storage',
            description: 'Cloud sync will retry automatically.',
          });
        } else {
          logIntegrityEvent('recovery_failed', {
            reportType: 'minor-works',
            reportId: initialReportId,
            error: 'No data found in cloud or local',
          });
          toast({
            title: 'Report not found',
            description: 'Could not load the requested report.',
            variant: 'destructive',
          });
        }
      }).finally(() => {
        // Hydration complete — release the autosave gate.
        setIsLoadingReport(false);
      });
    }
  }, [initialReportId, authChecked, isAuthenticated, isOnline, loadFromCloud]);

  // Load saved data on mount from IndexedDB
  useEffect(() => {
    if (!initialReportId) {
      const loadSavedData = async () => {
        try {
          const savedState = await loadFromIndexedDB();
          if (savedState?.formData) {
            setFormData(savedState.formData);
          }
        } catch (error) {
          console.error('Failed to load saved form data:', error);
        }
      };
      loadSavedData();
    }
  }, [initialReportId, loadFromIndexedDB]);

  // Auto-recover drafts for NEW reports from localStorage
  // This ensures work isn't lost if the user navigates away and comes back
  const draftRecoveryAttempted = React.useRef(false);
  useEffect(() => {
    // Only for NEW reports (no initialReportId)
    if (initialReportId || draftRecoveryAttempted.current) return;
    draftRecoveryAttempted.current = true;

    const draft = draftStorage.loadDraft('minor-works', null);
    if (draft?.data && !formData.clientName) {
      // Auto-recover if form is empty and draft has meaningful data
      if (draft.data.clientName || draft.data.propertyAddress || draft.data.workDescription) {
        console.log('[MinorWorks] Auto-recovering draft for new report');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setFormData((prev: any) => ({
          ...prev,
          ...draft.data,
          // Preserve any existing certificate number
          certificateNumber: prev.certificateNumber || draft.data.certificateNumber,
        }));
        toast({
          title: 'Draft recovered',
          description: 'Your previous work has been restored.',
        });
      }
    }
  }, [initialReportId]);

  // Generate certificate number on mount if needed
  const certNumberGenerated = React.useRef(false);
  useEffect(() => {
    const initCertificateNumber = async () => {
      if (!formData.certificateNumber && !currentReportId && !certNumberGenerated.current) {
        certNumberGenerated.current = true;
        const { generateCertificateNumber } = await import('@/utils/certificateNumbering');
        const certNumber = await generateCertificateNumber('minor-works');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setFormData((prev: any) => ({ ...prev, certificateNumber: certNumber }));
      }
    };
    initCertificateNumber();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUpdate = (field: string, value: any) => {
    const sanitizedValue = typeof value === 'string' ? sanitizeTextInput(value) : value;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFormData((prev: any) => ({ ...prev, [field]: sanitizedValue }));
  };

  const handleSaveDraft = async () => {
    await autoSaveManualSave();

    // Persist earthing arrangement and other smart defaults for future certificates
    saveDefaults(formData);

    // CRITICAL: Always save to localStorage backup BEFORE cloud sync
    // This ensures data is never lost even if cloud fails
    const reportIdForBackup = currentReportId || formData.certificateNumber;
    if (reportIdForBackup && formData.clientName) {
      saveToLocalStorageBackup('minor-works', reportIdForBackup, formData);
      logIntegrityEvent('backup_saved', {
        reportType: 'minor-works',
        reportId: reportIdForBackup,
        fieldCount: Object.keys(formData).filter((k: string) => !k.startsWith('_')).length,
      });
    }

    const result = await syncToCloud(true);
    if (result && typeof result === 'object' && 'reportId' in result && result.reportId) {
      setCurrentReportId(result.reportId as string);
      setLastSavedTime(new Date());

      if (customerIdFromNav && result.reportId) {
        const { linkCustomerToReport } = await import('@/utils/customerHelper');
        await linkCustomerToReport(result.reportId as string, customerIdFromNav);
      }

      toast({
        title: 'Draft Saved',
        description: 'Your Minor Works Certificate draft has been saved.',
      });
    } else if (!result?.success) {
      // Error toast - useCloudSync shows "Cannot save yet" if form empty
      // Show generic error only if form has data
      if (formData.clientName || formData.propertyAddress) {
        toast({
          title: 'Save failed',
          description: 'Unable to save. Please check your connection and try again.',
          variant: 'destructive',
        });
      }
    }
  };

  const handleStartNew = () => {
    setShowStartNewDialog(true);
  };

  const confirmStartNew = async () => {
    const { generateCertificateNumber } = await import('@/utils/certificateNumbering');
    const certificateNumber = await generateCertificateNumber('minor-works');

    setFormData({
      certificateNumber,
      propertyAddress: '',
      postcode: '',
      clientName: '',
      clientEmail: '',
      workDate: '',
      dateOfCompletion: '',
      personOrderingWork: '',
      contractorName: '',
      contractorAddress: '',
      nextInspectionDue: '',
      workDescription: '',
      workType: '',
      workLocation: '',
      departuresFromBS7671: '',
      permittedExceptions: '',
      riskAssessmentAttached: false,
      commentsOnExistingInstallation: '',
      supplyVoltage: '230V',
      frequency: '50Hz',
      supplyPhases: '1',
      earthingArrangement: '',
      zdb: '',
      earthingConductorPresent: false,
      mainEarthingConductorSize: '',
      mainEarthingConductorSizeCustom: '',
      mainEarthingConductorMaterial: 'copper',
      mainBondingConductorSize: '',
      mainBondingConductorSizeCustom: '',
      bondingWater: false,
      bondingGas: false,
      bondingOil: false,
      bondingStructural: false,
      bondingOther: false,
      bondingOtherSpecify: '',
      distributionBoard: '',
      dbLocationType: '',
      circuitDesignation: '',
      circuitDescription: '',
      circuitType: 'radial',
      overcurrentDeviceBsEn: '',
      protectiveDeviceType: '',
      protectiveDeviceRating: '',
      protectiveDeviceKaRating: '',
      protectionRcd: false,
      protectionRcbo: false,
      protectionAfdd: false,
      protectionSpd: false,
      rcdBsEn: '',
      rcdType: '',
      rcdRatingAmps: '',
      rcdIdn: '',
      afddBsEn: '',
      afddRating: '',
      spdBsEn: '',
      spdType: '',
      numberOfConductors: '',
      liveConductorSize: '',
      cpcSize: '',
      cableType: '',
      installationMethod: '',
      referenceMethod: '',
      continuityR1R2: '',
      r2Continuity: '',
      insulationLiveLive: '',
      insulationLiveNeutral: '',
      insulationLiveEarth: '',
      insulationNeutralEarth: '',
      insulationTestVoltage: '500V',
      polarity: '',
      earthFaultLoopImpedance: '',
      maxPermittedZs: '',
      prospectiveFaultCurrent: '',
      functionalTesting: '',
      rcdRating: '',
      rcdOneX: '',
      rcdFiveX: '',
      rcdHalfX: '',
      rcdTestButton: '',
      rcboTripTime: '',
      afddTestButton: '',
      afddTripTime: '',
      spdIndicatorStatus: '',
      spdTestButton: '',
      spdVisualInspection: '',
      ringR1: '',
      ringRn: '',
      ringR2: '',
      ringR1EndToEnd: '',
      ringRnEndToEnd: '',
      ringR2EndToEnd: '',
      ringR1Cross: '',
      ringRnCross: '',
      ringR2Cross: '',
      ringFinalContinuity: '',
      earthElectrodeResistance: '',
      phaseRotation: '',
      testEquipmentModel: '',
      testEquipmentSerial: '',
      testEquipmentCalDate: '',
      testTemperature: '20°C',
      continuityTesterMake: '',
      continuityTesterSerial: '',
      continuityTesterCalDate: '',
      insulationTesterMake: '',
      insulationTesterSerial: '',
      insulationTesterCalDate: '',
      loopTesterMake: '',
      loopTesterSerial: '',
      loopTesterCalDate: '',
      electricianName: '',
      forAndOnBehalfOf: '',
      electricianPhone: '',
      electricianEmail: '',
      position: '',
      qualificationLevel: '',
      schemeProvider: '',
      registrationNumber: '',
      signatureDate: '',
      signature: '',
      ietDeclaration: false,
      bs7671Compliance: false,
      testResultsAccurate: false,
      workSafety: false,
      partPNotification: false,
      copyProvided: false,
      additionalNotes: '',
    });
    setCurrentReportId(null);
    setShowStartNewDialog(false);
    toast({
      title: 'New Minor Works Certificate started',
      description: 'Started a new Minor Works Certificate.',
    });
  };

  const handleDuplicate = async () => {
    const { generateCertificateNumber } = await import('@/utils/certificateNumbering');
    const certificateNumber = await generateCertificateNumber('minor-works');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const duplicatedData: any =
      typeof structuredClone === 'function'
        ? structuredClone(formData)
        : JSON.parse(JSON.stringify(formData));

    delete duplicatedData.id;
    delete duplicatedData.report_id;
    delete duplicatedData.pdf_url;
    delete duplicatedData.pdf_generated_at;
    delete duplicatedData.created_at;
    delete duplicatedData.updated_at;
    duplicatedData.certificateNumber = certificateNumber;
    duplicatedData.status = 'draft';

    setFormData(duplicatedData);
    setCurrentReportId(null);
    setShowStartNewDialog(false);

    toast({
      title: 'Report duplicated',
      description: `New certificate number: ${certificateNumber}`,
    });
  };

  // Duplicate for next circuit — keeps client/address/earthing/declaration, clears circuit + tests
  const handleDuplicateForNextCircuit = async () => {
    const { generateCertificateNumber } = await import('@/utils/certificateNumbering');
    const certificateNumber = await generateCertificateNumber('minor-works');

    // Fields to KEEP from the current cert
    const keepFields = [
      // Client details
      'clientName', 'clientPhone', 'clientEmail', 'personOrderingWork',
      'propertyAddress', 'postcode',
      // Work dates
      'workDate', 'dateOfCompletion', 'nextInspectionDue',
      // Supply & earthing — same installation
      'supplyVoltage', 'supplyPhases', 'frequency',
      'earthingArrangement', 'zdb', 'earthingConductorPresent',
      'mainEarthingConductorSize', 'mainEarthingConductorMaterial',
      'mainBondingConductorSize',
      'bondingWater', 'bondingGas', 'bondingOil', 'bondingStructural', 'bondingOther',
      'bondingOtherSpecify',
      // Declaration — same electrician
      'electricianName', 'forAndOnBehalfOf', 'position',
      'qualificationLevel', 'schemeProvider', 'registrationNumber',
      'contractorAddress', 'electricianPhone', 'electricianEmail',
      'signature', 'signatureDate',
      'ietDeclaration', 'partPNotification', 'copyProvided',
      // Test equipment — same instrument
      'testEquipmentModel', 'testEquipmentSerial', 'testEquipmentCalDate', 'testTemperature',
      // Branding
      'companyLogo', 'companyName', 'companyAddress', 'companyPhone', 'companyEmail',
      'brandingTagline', 'brandingAccentColor', 'brandingWebsite', 'schemeLogo',
    ];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newData: any = {};
    for (const field of keepFields) {
      if (formData[field] !== undefined) {
        newData[field] = formData[field];
      }
    }
    newData.certificateNumber = certificateNumber;
    newData.status = 'draft';

    setFormData(newData);
    setCurrentReportId(null);
    setTab('circuit');

    toast({
      title: 'New circuit certificate created',
      description: `Client & earthing details kept. Fill in the new circuit details.`,
    });
  };

  // Handle PDF generation success
  const handlePdfSuccess = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: 'Authentication Error',
          description: 'Unable to verify user. Please log in again.',
          variant: 'destructive',
        });
        return;
      }

      const reportIdToUpdate = currentReportId || formData.certificateNumber;

      const completedData = {
        ...formData,
        certificateGenerated: true,
        certificateGeneratedAt: new Date().toISOString(),
        status: 'completed',
      };

      const { error: updateError } = await supabase
        .from('reports')
        .update({
          status: 'completed',
          data: completedData,
          updated_at: new Date().toISOString(),
          last_synced_at: new Date().toISOString(),
        })
        .eq('report_id', reportIdToUpdate)
        .eq('user_id', user.id);

      if (updateError) {
        console.error('Failed to update status:', updateError);
        throw updateError;
      }

      console.log('✅ Certificate status updated to completed in database');

      setFormData(completedData);

      queryClient.invalidateQueries({ queryKey: ['recent-certificates'] });
      queryClient.invalidateQueries({ queryKey: ['my-reports'] });
      queryClient.invalidateQueries({ queryKey: ['customer-reports'] });

      await clearAutoSave();

      toast({
        title: 'Certificate Completed',
        description: 'Your Minor Works certificate has been marked as completed.',
      });
    } catch (error) {
      console.error('Failed to mark as completed:', error);
      toast({
        title: 'Status Update Failed',
        description: 'Certificate generated but status may not have updated.',
        variant: 'destructive',
      });
    }
  };

  // Shared nav props for inline EICRTabNavigation in each tab
  const navProps = {
    currentTab,
    currentTabIndex,
    totalTabs,
    canNavigateNext,
    canNavigatePrevious,
    navigateNext,
    navigatePrevious,
    getProgressPercentage,
    isCurrentTabComplete: isTabComplete(currentTab),
    currentTabHasRequiredFields: hasRequiredFields(currentTab),
    onToggleComplete: () => toggleTabComplete(currentTab, handleUpdate),
    lastTabLabel: 'Complete',
  };

  // Build SmartTabs configuration
  const smartTabs: SmartTab[] = [
    {
      value: 'details',
      label: 'Client & Details',
      shortLabel: 'Details',
      content: (
        <>
          <MWDetailsTab formData={formData} onUpdate={handleUpdate} isMobile={isMobile} />
          <EICRTabNavigation {...navProps} />
        </>
      ),
    },
    {
      value: 'circuit',
      label: 'Circuit Details',
      shortLabel: 'Circuit',
      content: (
        <>
          <MWCircuitTab formData={formData} onUpdate={handleUpdate} isMobile={isMobile} />
          <EICRTabNavigation {...navProps} />
        </>
      ),
    },
    {
      value: 'testing',
      label: 'Test Results',
      shortLabel: 'Tests',
      content: (
        <>
          <MWTestingTab formData={formData} onUpdate={handleUpdate} isMobile={isMobile} />
          <EICRTabNavigation {...navProps} />
        </>
      ),
    },
    {
      value: 'declaration',
      label: 'Declaration',
      shortLabel: 'Declare',
      content: (
        <>
          <MWDeclarationTab formData={formData} onUpdate={handleUpdate} isMobile={isMobile} />

          {/* Certificate Actions — matches EIC pattern */}
          <div className="mt-6">
            <MinorWorksPdfGenerator
              formData={formData}
              isFormValid={true}
              reportId={currentReportId || formData.certificateNumber}
              userId={userId || undefined}
              onSuccess={handlePdfSuccess}
              onSaveDraft={handleSaveDraft}
              onDuplicateForNextCircuit={handleDuplicateForNextCircuit}
            />
          </div>

          <EICRTabNavigation {...navProps} />
        </>
      ),
    },
  ];

  // Build completed tabs map for SmartTabs
  const completedTabs: Record<string, boolean> = {
    details: isTabComplete('details'),
    circuit: isTabComplete('circuit'),
    testing: isTabComplete('testing'),
    declaration: isTabComplete('declaration'),
  };

  return (
    <CertificatePhotoProvider
      certificateNumber={formData.certificateNumber || ''}
      certificateType="minor-works"
      clientName={formData.clientName || ''}
      installationAddress={formData.installationAddress || formData.clientAddress || ''}
    >
      <div className="min-h-screen bg-background prevent-shortcuts">
        {/* Header — EICR pattern */}
        <div className="bg-background">
          <div className="px-2 py-2.5">
            <MWFormHeader
              onBack={onBack}
              isSaving={isSaving}
              onManualSave={handleSaveDraft}
              formData={formData}
              syncState={syncState}
              isOnline={isOnline}
              isAuthenticated={isAuthenticated}
            />
          </div>
          <div className="h-[1px] bg-gradient-to-r from-elec-yellow/40 via-elec-yellow/20 to-transparent" />
        </div>

        {/* Main Content — full-width mobile */}
        <div className="py-4 pb-48 sm:px-4 sm:pb-8">
          <SmartTabs
            tabs={smartTabs}
            value={currentTab}
            onValueChange={(value) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              setTab(value as any);
              onTabChange?.(value);
            }}
            completedTabs={completedTabs}
            showProgress={true}
          />
        </div>

        <StartNewEICRDialog
          isOpen={showStartNewDialog}
          onClose={() => setShowStartNewDialog(false)}
          onConfirm={confirmStartNew}
          onDuplicate={handleDuplicate}
          hasUnsavedChanges={hasUnsavedChanges}
        />
      </div>
    </CertificatePhotoProvider>
  );
};

export default MinorWorksForm;
