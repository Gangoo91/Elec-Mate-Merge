import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// Step transitions handled by the v3 shell (keyed animate-mw-step-in/back)
import StartNewEICRDialog from '@/components/StartNewEICRDialog';
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
import { useUiPreferences } from '@/hooks/useUiPreferences';
import { useCloudSync } from '@/hooks/useCloudSync';
import { useQsReviewStatus } from '@/hooks/useQsReview';
import { useCertLock } from '@/hooks/useCertLock';
import CertLockBar from '@/components/inspection/CertLockBar';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { useSmartDefaults } from '@/hooks/useSmartDefaults';
import { useMinorWorksTabs, type MWTabValue } from '@/hooks/useMinorWorksTabs';
// minorWorksDevFill.ts kept for future use — UI access removed
import { CertificatePhotoProvider } from '@/contexts/CertificatePhotoContext';
import { getZsLimitFromDeviceString } from '@/data/zsLimits';

// Minor Works shell (cert redesign v3) + tab components
import MWShellHeader, { MW_STEPS } from '@/components/minor-works/MWShellHeader';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import MWStickyFooter from '@/components/minor-works/MWStickyFooter';
import DuplicatedFromBanner from '@/components/certificates/DuplicatedFromBanner';
import LastCertSuggestionCard from '@/components/certificates/LastCertSuggestionCard';
import { useCertPrefill } from '@/hooks/useCertPrefill';
import MWDetailsTab from '@/components/minor-works/MWDetailsTab';
import MWCircuitTab from '@/components/minor-works/MWCircuitTab';
import MWTestingTab from '@/components/minor-works/MWTestingTab';
import MWDeclarationTab from '@/components/minor-works/MWDeclarationTab';
import { useMinorWorksValidation } from '@/hooks/useMinorWorksValidation';
import { useMinorWorksSmartForm } from '@/hooks/useMinorWorksSmartForm';

const MinorWorksForm = ({
  onBack,
  initialReportId,
}: {
  onBack: () => void;
  initialReportId?: string | null;
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [currentReportId, setCurrentReportId] = useState<string | null>(initialReportId || null);

  // Lock + versioning (ELE-1037). enabled:!isLocked below gates both autosave
  // mechanisms; lockReport is wrapped after the sync hooks to flush first.
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
    reportId: currentReportId,
    onAmended: (newId) =>
      navigate(
        `/electrician/inspection-testing?section=minor-works&reportId=${encodeURIComponent(newId)}`
      ),
  });

  // QS approval auto-locks the cert; this also freezes autosave the moment a QS
  // approves, closing the same-session window before the lock loads so React
  // re-serialisation can't drift the approved content hash (ELE-1183).
  const { data: qsReviewForGate } = useQsReviewStatus(currentReportId || undefined);
  const isQsApproved = qsReviewForGate?.status === 'approved';
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
    // BS 7671 amendment date — A4:2026 (default 15/04/2026, IET publication date)
    // Used in Section A item 4 (departures cite) + Section E declaration text.
    bsAmendmentDate: '2026-04-15',

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

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Tab navigation hook
  const {
    currentTab,
    setTab,
    currentTabIndex,
    totalTabs,
    canNavigatePrevious,
    navigateNext,
    navigatePrevious,
    isTabComplete,
  } = useMinorWorksTabs(formData);

  // Single source of truth for progress — the same field-based percentage the
  // validation checklist counts. The header ring renders it; tapping the ring
  // opens a bottom sheet listing exactly which required fields are missing.
  const mwValidation = useMinorWorksValidation(formData);
  const [showMissingSheet, setShowMissingSheet] = useState(false);

  // Thumb-zone issue actions — MinorWorksPdfGenerator keeps this ref current so
  // the sticky footer can trigger Generate / Email / Invoice on the Sign off step.
  const pdfActionsRef = React.useRef<{
    generate: () => void;
    email: () => void;
    invoice: () => void;
  } | null>(null);

  // Slide direction for the step transition — back navigation slides the other way.
  const prevTabIndexRef = React.useRef(currentTabIndex);
  const isNavigatingBack = currentTabIndex < prevTabIndexRef.current;
  React.useEffect(() => {
    prevTabIndexRef.current = currentTabIndex;
  }, [currentTabIndex]);

  // Every route into a step behaves identically — header tabs and footer nav
  // both flush the sync hook and land at the top of the step.
  const handleTabChange = (tab: MWTabValue) => {
    setTab(tab);
    onTabChange?.(tab);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  // Smart defaults
  const { defaults, hasDefaults, saveDefaults } = useSmartDefaults(userId || undefined);

  // Smart form auto-fill from Business Settings
  const {
    loading: smartFormLoading,
    hasAppliedDefaults: hasAppliedSmartDefaults,
    applySmartDefaults,
  } = useMinorWorksSmartForm();

  // Callback when auto-sync creates a new report - keeps component state in sync
  const handleReportCreated = React.useCallback((newReportId: string) => {
    console.log('[MinorWorks] Auto-sync created report:', newReportId);
    setCurrentReportId(newReportId);
  }, []);

  // User preference: auto-save drafts (Settings → Preferences). Manual saves are unaffected.
  const { preferences: uiPrefs } = useUiPreferences();

  // Cloud sync
  const {
    loadFromCloud,
    isAuthenticated,
    isOnline,
    syncToCloud,
    syncState,
    syncNow,
    syncNowImmediate,
    onTabChange,
  } = useCloudSync({
    reportId: currentReportId,
    reportType: 'minor-works',
    data: formData,
    // Locked or QS-approved certificates never autosave — they are immutable records.
    enabled: !isLocked && !isQsApproved && uiPrefs.autosave_drafts,
    customerId: customerIdFromNav,
    onReportCreated: handleReportCreated,
    // Gate autosave until cloud load finishes — prevents blank-overwrite race.
    isHydrating: isLoadingReport,
  });

  // Auto-save hook
  const {
    isSaving,
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
    enabled: !isLocked && !isQsApproved && uiPrefs.autosave_drafts,
  });

  // Issue & Lock — flush pending edits first, then lock.
  const lockReport = React.useCallback(async () => {
    try {
      await syncNowImmediate?.();
    } catch {
      /* best-effort flush */
    }
    await lockReportBase();
  }, [syncNowImmediate, lockReportBase]);

  // Pre-fill customer details if navigating from customer page — parity with EICR + EIC.
  useEffect(() => {
    if (customerDataFromNav && !initialReportId) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setFormData((prev: any) => ({
        ...prev,
        clientName: customerDataFromNav.name || '',
        clientPhone: customerDataFromNav.phone || '',
        clientEmail: customerDataFromNav.email || '',
        propertyAddress: customerDataFromNav.address || '',
      }));
    }
  }, [customerDataFromNav, initialReportId]);

  // Default workDate to today on a brand-new MW. Guarded so editing an existing
  // cert never has its saved workDate overwritten.
  useEffect(() => {
    if (initialReportId) return;
    if (formData.workDate) return;
    const today = new Date().toISOString().split('T')[0];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFormData((prev: any) => ({ ...prev, workDate: today }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialReportId]);

  // Default signatureDate to today on a brand-new MW (committed, not just
  // displayed) — saves a guaranteed date-picker round trip per cert. Same
  // guard pattern as workDate so loaded certs keep their saved date.
  useEffect(() => {
    if (initialReportId) return;
    if (formData.signatureDate) return;
    const today = new Date().toISOString().split('T')[0];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFormData((prev: any) => ({ ...prev, signatureDate: today }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialReportId]);

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

  // Auto-set Phase Rotation based on supply phases. MWDetailsTab writes
  // 'Single'/'Three' while older drafts (and the init default) store '1'/'3' —
  // accept both token sets so toggling Three → Single re-sets N/A correctly.
  useEffect(() => {
    const phases = String(formData.supplyPhases || '');
    if (phases === '1' || phases === 'Single') {
      handleUpdate('phaseRotation', 'na');
    } else if ((phases === '3' || phases === 'Three') && formData.phaseRotation === 'na') {
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

  // Auto-fill nextInspectionDue = workDate + 5 years — the common MW case
  // (addition tied to the next domestic EICR cycle). The 1/3/5/10 year chips
  // on the Details tab let the sparky override.
  useEffect(() => {
    if (formData.workDate && !formData.nextInspectionDue) {
      const d = new Date(formData.workDate);
      d.setFullYear(d.getFullYear() + 5);
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
      loadFromCloud(initialReportId)
        .then((cloudResult) => {
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

            console.log(
              '[MinorWorks] Comparing timestamps - Cloud:',
              cloudTime,
              'Local:',
              localTime
            );

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
        })
        .finally(() => {
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
          // The draft's original number is canonical — the mount-time generator
          // may have already landed a fresh one (async race), which must lose.
          certificateNumber: draft.data.certificateNumber || prev.certificateNumber,
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
        // Fill only if still empty at commit time — draft recovery may have
        // restored the original number while generation was in flight.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setFormData((prev: any) => ({
          ...prev,
          certificateNumber: prev.certificateNumber || certNumber,
        }));
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
    // Locked/QS-approved certs are immutable records — manual save must respect
    // the same freeze that gates autosave (re-serialisation drifts the content
    // hash, ELE-1183 incident class).
    if (isLocked || isQsApproved) return;
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
      bsAmendmentDate: '2026-04-15',
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
      signatureDate: new Date().toISOString().split('T')[0],
      signature: '',
      ietDeclaration: false,
      bs7671Compliance: false,
      testResultsAccurate: false,
      workSafety: false,
      partPNotification: false,
      copyProvided: false,
      additionalNotes: '',
    });
    // The report we're walking away from keeps its own keyed local draft,
    // which would otherwise resurrect on the next open (EICR parity).
    draftStorage.clearDraft('minor-works', currentReportId);
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

    // A duplicate is a NEW job — it must not arrive pre-signed and pre-dated
    // for work that hasn't happened yet. Supply / earthing / circuit STRUCTURE
    // carries over; the attestation and the work dates don't. (The separate
    // "next circuit" duplicate deliberately keeps the signature — same visit.)
    duplicatedData.signature = '';
    duplicatedData.signatureDate = '';
    duplicatedData.workDate = '';
    duplicatedData.dateOfCompletion = '';
    duplicatedData.certificateGenerated = false;
    duplicatedData.certificateGeneratedAt = '';

    // The abandoned form's local draft must not resurrect into this new cert.
    draftStorage.clearDraft('minor-works', currentReportId);

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
      'clientName',
      'clientPhone',
      'clientEmail',
      'personOrderingWork',
      'propertyAddress',
      'postcode',
      // Work dates
      'workDate',
      'dateOfCompletion',
      'nextInspectionDue',
      // Supply & earthing — same installation
      'supplyVoltage',
      'supplyPhases',
      'frequency',
      'earthingArrangement',
      'zdb',
      'earthingConductorPresent',
      'mainEarthingConductorSize',
      'mainEarthingConductorMaterial',
      'mainBondingConductorSize',
      'bondingWater',
      'bondingGas',
      'bondingOil',
      'bondingStructural',
      'bondingOther',
      'bondingOtherSpecify',
      // Declaration — same electrician
      'electricianName',
      'forAndOnBehalfOf',
      'position',
      'qualificationLevel',
      'schemeProvider',
      'registrationNumber',
      'contractorAddress',
      'electricianPhone',
      'electricianEmail',
      'signature',
      'signatureDate',
      'ietDeclaration',
      'partPNotification',
      'copyProvided',
      // Test equipment — same instrument
      'testEquipmentModel',
      'testEquipmentSerial',
      'testEquipmentCalDate',
      'testTemperature',
      // Branding
      'companyLogo',
      'companyName',
      'companyAddress',
      'companyPhone',
      'companyEmail',
      'brandingTagline',
      'brandingAccentColor',
      'brandingWebsite',
      'schemeLogo',
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

  // Handle PDF generation success. The generator passes the report_id it
  // actually saved under (it creates the report itself when none exists) —
  // never fall back to certificateNumber, which is NOT a report_id and
  // silently updates 0 rows.
  const handlePdfSuccess = async (savedReportId?: string) => {
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

      const reportIdToUpdate = savedReportId || currentReportId;
      if (!reportIdToUpdate) {
        console.warn('[MinorWorks] No report_id available — skipping completed-status update');
        return;
      }
      if (savedReportId && savedReportId !== currentReportId) {
        setCurrentReportId(savedReportId);
      }

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

  // Tab content map — same tab components, rendered inside the v3 shell.
  // The shell (header tabs + sticky footer) replaces the per-tab inline nav.
  const tabContent: Record<string, React.ReactNode> = {
    details: <MWDetailsTab formData={formData} onUpdate={handleUpdate} />,
    circuit: <MWCircuitTab formData={formData} onUpdate={handleUpdate} />,
    testing: <MWTestingTab formData={formData} onUpdate={handleUpdate} />,
    declaration: (
      <>
        <MWDeclarationTab formData={formData} onUpdate={handleUpdate} />

        {/* Certificate Actions — matches EIC pattern. reportId is the REAL
            report_id or undefined — certificateNumber is never a valid
            fallback (it matches no reports row). */}
        <div className="mt-6">
          <MinorWorksPdfGenerator
            formData={formData}
            reportId={currentReportId ?? undefined}
            userId={userId || undefined}
            onSuccess={handlePdfSuccess}
            onReportIdChange={handleReportCreated}
            onSaveDraft={handleSaveDraft}
            onDuplicateForNextCircuit={handleDuplicateForNextCircuit}
            actionsRef={pdfActionsRef}
          />
        </div>
      </>
    ),
  };

  // Build completed tabs map for the shell header
  const completedTabs: Record<string, boolean> = {
    details: isTabComplete('details'),
    circuit: isTabComplete('circuit'),
    testing: isTabComplete('testing'),
    declaration: isTabComplete('declaration'),
  };

  // Last-cert prompt — soft suggestion to copy supply / earthing / BS amendment
  // from the user's most recent Minor Works at the same address.
  const prefillAddress =
    (formData.propertyAddress as string) ||
    (formData.installationAddress as string) ||
    (formData.clientAddress as string) ||
    '';
  const {
    suggestion: lastCertSuggestion,
    dismiss: dismissLastCert,
    buildPatch,
  } = useCertPrefill(prefillAddress, 'minor-works', {
    excludeReportId: currentReportId || undefined,
  });

  const handleApplyLastCert = () => {
    const patch = buildPatch();
    Object.entries(patch).forEach(([key, value]) => handleUpdate(key, value));
    dismissLastCert();
  };

  return (
    <CertificatePhotoProvider
      certificateNumber={formData.certificateNumber || ''}
      certificateType="minor-works"
      clientName={formData.clientName || ''}
      installationAddress={formData.propertyAddress || formData.clientAddress || ''}
    >
      <div className="min-h-screen bg-background prevent-shortcuts">
        {/* v3 shell header — back · title/cert no · save word · progress ring · full-width step tabs */}
        <MWShellHeader
          onBack={onBack}
          formData={formData}
          isSaving={isSaving}
          onManualSave={handleSaveDraft}
          syncState={syncState}
          saveDisabled={isLocked || isQsApproved}
          isOnline={isOnline}
          progressPercent={mwValidation.completionPercentage}
          onProgressTap={() => setShowMissingSheet(true)}
          currentTab={currentTab}
          onTabChange={handleTabChange}
          completedTabs={completedTabs}
        />


        {/* ELE-1037 — lock / version bar */}
        <CertLockBar
          isLocked={isLocked}
          lockedAt={lockedAt}
          editVersion={editVersion}
          canIssue={!isLocked && !!currentReportId && !!formData.signature && !!formData.workDate}
          onLock={lockReport}
          onAmend={amendReport}
          databaseId={databaseId}
          hasVersions={hasVersions}
          onOpenVersion={openReport}
        />

        {/* ELE-881 — provenance banner */}
        {formData.duplicatedFrom && (
          <DuplicatedFromBanner
            sourceCertNumber={formData.duplicatedFrom}
            onDismiss={() => handleUpdate('duplicatedFrom', '')}
          />
        )}

        {/* Last cert at this address — soft suggestion to copy supply/earthing data forward */}
        {!isLocked && lastCertSuggestion && (
          <div className="-mx-3 px-4 pt-3 sm:mx-0">
            <LastCertSuggestionCard
              suggestion={lastCertSuggestion}
              onApply={handleApplyLastCert}
              onDismiss={dismissLastCert}
            />
          </div>
        )}

        {/* Main Content — counters Layout px-3 on mobile (-mx-3) then re-applies
            px-4 so the tab interiors' -mx-4 cards land truly edge-to-edge.
            Same arithmetic as EVChargingCertificate's main; the lg right inset
            reserves the fixed validation rail. Read-only when the cert is locked. */}
        <div
          className={cn(
            '-mx-3 px-4 py-4 sm:mx-auto sm:px-4 lg:px-8',
            // Sign off carries the two-row issue footer — needs extra clearance.
            currentTab === 'declaration' ? 'pb-48 sm:pb-40 lg:pb-28' : 'pb-32 sm:pb-24',
            isLocked && 'pointer-events-none select-none opacity-95'
          )}
          aria-disabled={isLocked || undefined}
        >
          {/* Current step — keyed so each change replays the lateral slide.
              motion-safe collapses it under reduced-motion. */}
          <div
            key={currentTab}
            className={cn(
              'lg:max-w-[1600px]',
              isNavigatingBack ? 'motion-safe:animate-mw-step-back' : 'motion-safe:animate-mw-step-in'
            )}
          >
            {tabContent[currentTab]}
          </div>
        </div>

        {/* v3 shell footer — single sticky step bar replaces per-tab inline nav */}
        {!isLocked && (
          <MWStickyFooter
            currentTabIndex={currentTabIndex}
            totalTabs={totalTabs}
            canNavigatePrevious={canNavigatePrevious}
            navigateNext={() => {
      // Instant, and BEFORE the step swaps.
      //
      // `behavior: 'smooth'` here fought the step's own slide-in: the keyed
      // content was replaced at once, the 260ms translateX played, and the
      // window animated its scroll separately over a longer duration — two
      // motions at different speeds, which reads as a jolt. Worse when the new
      // step is shorter, because the browser clamps the scroll instantly first
      // and then smooth-scrolls the remainder.
      //
      // The explicit `behavior` beats the global `scroll-behavior: smooth` in
      // index.css, so this really is instant. Scrolling first means the new
      // step mounts already at the top and only the slide animates.
      window.scrollTo({ top: 0, behavior: 'auto' });
              navigateNext();
              onTabChange?.();
            }}
            navigatePrevious={() => {
      // Instant, and BEFORE the step swaps.
      //
      // `behavior: 'smooth'` here fought the step's own slide-in: the keyed
      // content was replaced at once, the 260ms translateX played, and the
      // window animated its scroll separately over a longer duration — two
      // motions at different speeds, which reads as a jolt. Worse when the new
      // step is shorter, because the browser clamps the scroll instantly first
      // and then smooth-scrolls the remainder.
      //
      // The explicit `behavior` beats the global `scroll-behavior: smooth` in
      // index.css, so this really is instant. Scrolling first means the new
      // step mounts already at the top and only the slide animates.
      window.scrollTo({ top: 0, behavior: 'auto' });
              navigatePrevious();
              onTabChange?.();
            }}
            onEmail={() => pdfActionsRef.current?.email()}
            onInvoice={() => pdfActionsRef.current?.invoice()}
            onGenerate={() => pdfActionsRef.current?.generate()}
          />
        )}

        <StartNewEICRDialog
          isOpen={showStartNewDialog}
          onClose={() => setShowStartNewDialog(false)}
          onConfirm={confirmStartNew}
          onDuplicate={handleDuplicate}
          hasUnsavedChanges={hasUnsavedChanges}
        />

        {/* Tap-the-ring — what's still missing, grouped by step, jump straight there */}
        <Sheet open={showMissingSheet} onOpenChange={setShowMissingSheet}>
          <SheetContent
            side="bottom"
            className="h-[85vh] rounded-t-2xl border-white/[0.1] p-0 overflow-hidden"
          >
            <div className="flex h-full flex-col bg-background">
              <div className="border-b border-white/[0.08] px-4 pb-3 pt-4">
                <h2 className="text-base font-bold text-white">
                  {mwValidation.errors.length === 0 ? 'Ready to issue' : 'Still to complete'}
                </h2>
                <p className="text-[12px] text-white tabular-nums">
                  {mwValidation.completionPercentage}% complete
                  {mwValidation.errors.length > 0 &&
                    ` · ${mwValidation.errors.length} required ${
                      mwValidation.errors.length === 1 ? 'field' : 'fields'
                    } remaining`}
                </p>
              </div>
              <div className="flex-1 space-y-5 overflow-y-auto px-4 py-4">
                {mwValidation.errors.length === 0 ? (
                  <p className="text-sm text-white">
                    Everything required is filled in. Head to Sign off to generate the
                    certificate.
                  </p>
                ) : (
                  MW_STEPS.map((step) => {
                    const items = mwValidation.errors.filter((e) => e.tab === step.id);
                    if (items.length === 0) return null;
                    return (
                      <div key={step.id}>
                        <h3 className="mb-2 text-[13px] font-semibold text-white">
                          {step.label}
                        </h3>
                        <div className="space-y-1.5">
                          {items.map((item) => (
                            <button
                              key={item.field}
                              type="button"
                              onClick={() => {
                                setShowMissingSheet(false);
                                handleTabChange(step.id);
                              }}
                              className="flex h-11 w-full items-center justify-between rounded-xl border border-white/[0.1] bg-white/[0.04] px-3.5 text-left text-sm font-medium text-white touch-manipulation transition-transform active:scale-[0.99]"
                            >
                              <span className="truncate">{item.message}</span>
                              <span className="ml-3 shrink-0 text-[11.5px] font-semibold text-elec-yellow">
                                Go
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </CertificatePhotoProvider>
  );
};

export default MinorWorksForm;
