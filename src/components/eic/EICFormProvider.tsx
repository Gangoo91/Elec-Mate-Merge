import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
} from 'react';
import { useEICObservations, EICObservation } from '@/hooks/useEICObservations';
import { useEICAutoSave } from '@/hooks/useEICAutoSave';
import { useCloudSync } from '@/hooks/useCloudSync';
import { useReportId } from '@/hooks/useReportId';
import { useToast } from '@/hooks/use-toast';
import { useAppReview } from '@/hooks/useAppReview';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { isNotifiableWork, createNotificationFromCertificate } from '@/utils/notificationHelper';
import { sanitizeTextInput } from '@/utils/inputSanitization';
import { draftStorage } from '@/utils/draftStorage';
import { getCableSizeForRating, getCpcForLive, BS_STANDARD_MAP } from '@/utils/circuitDefaults';
import { getMaxZsFromDeviceDetails } from '@/utils/zsCalculations';
import {
  validateLoadedData,
  saveToLocalStorageBackup,
  logIntegrityEvent,
} from '@/utils/dataIntegrity';
import { CertificatePhotoProvider } from '@/contexts/CertificatePhotoContext';
import { StickyFormSyncBar, type SyncState } from '@/components/ui/SyncStatusIndicator';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';
import { useDesignedCircuit, useUpdateDesignedCircuitStatus } from '@/hooks/useDesignedCircuits';

interface EICFormContextType {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  getLatestFormData: () => any;
  currentReportId: string | null;
  effectiveReportId: string;
  showStartNewDialog: boolean;
  setShowStartNewDialog: (v: boolean) => void;
  handleStartNew: () => void;
  confirmStartNew: () => Promise<void>;
  confirmDuplicate: () => Promise<void>;
  handleManualSave: () => Promise<void>;
  handleGenerateCertificate: () => Promise<void>;
  syncState: any;
  isOnline: boolean;
  isAuthenticated: boolean;
  isSaving: boolean;
  hasUnsavedChanges: boolean;
  lastSavedTime: Date | null;
  syncNow: (() => void) | undefined;
  onTabChange: (() => void) | undefined;
  getSyncIndicatorState: () => SyncState;
  observations: EICObservation[];
  observationsProps: {
    observations: EICObservation[];
    reportId: string;
    onAddObservation: () => string;
    onUpdateObservation: (id: string, field: keyof EICObservation, value: any) => void;
    onRemoveObservation: (id: string) => void;
    onAutoCreateObservation: (inspectionItem: {
      id: string;
      item: string;
      clause: string;
    }) => string;
    onNavigateToObservations: () => void;
    onSyncToInspectionItem?: (inspectionItemId: string, newOutcome: string) => void;
  };
  showBoardScan: boolean;
  setShowBoardScan: (v: boolean) => void;
  handleBoardScanComplete: (data: any) => void;
  isLoadingDesign: boolean;
  canGenerateCertificate: () => boolean;
}

const EICFormContext = createContext<EICFormContextType | undefined>(undefined);

export const useEICForm = () => {
  const context = useContext(EICFormContext);
  if (!context) {
    throw new Error('useEICForm must be used within EICFormProvider');
  }
  return context;
};

interface EICFormProviderProps {
  children: React.ReactNode;
  initialReportId?: string | null;
  designId?: string | null;
}

export const EICFormProvider: React.FC<EICFormProviderProps> = ({
  children,
  initialReportId,
  designId,
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { recordPositiveAction } = useAppReview();
  const lastSaveErrorToastRef = useRef<number>(0);

  // Capture customer data from navigation state
  const customerIdFromNav = location.state?.customerId;
  const customerDataFromNav = location.state?.customerData;

  const [formData, setFormData] = useState({
    certificateNumber: '',
    clientName: '',
    clientAddress: '',
    installationAddress: '',
    installationDate: '',
    installationType: 'domestic',
    constructionDate: '',
    description: '',
    designStandard: 'BS7671',
    partPCompliance: '',
    supplyVoltage: '230',
    supplyFrequency: '50',
    phases: 'single',
    earthingArrangement: 'tncs',
    supplyType: '',
    mainProtectiveDevice: '',
    mainSwitchRating: '',
    mainSwitchLocation: '',
    earthElectrodeType: '',
    earthElectrodeResistance: '',
    mainBondingConductor: '',
    supplementaryBonding: '',
    inspections: {},
    inspectionItems: [],
    scheduleOfTests: [],
    distributionBoards: [],
    testMethod: '',
    testVoltage: '',
    testNotes: '',
    testInstruments: '',
    designerName: '',
    designerQualifications: '',
    designerCompany: '',
    designerDate: new Date().toISOString().split('T')[0],
    designerSignature: '',
    constructorName: '',
    constructorQualifications: '',
    constructorCompany: '',
    constructorDate: new Date().toISOString().split('T')[0],
    constructorSignature: '',
    inspectorName: '',
    inspectorQualifications: '',
    inspectorCompany: '',
    inspectorDate: new Date().toISOString().split('T')[0],
    inspectorSignature: '',
    sameAsDesigner: false,
    sameAsConstructor: false,
    additionalNotes: '',
    inspectedBySignature: '',
    reportAuthorisedBySignature: '',
    inspectedByName: '',
    inspectedByForOnBehalfOf: '',
    inspectedByPosition: '',
    inspectedByAddress: '',
    inspectedByCpScheme: '',
    inspectedByCpSchemeNA: false,
    reportAuthorisedByName: '',
    reportAuthorisedByDate: new Date().toISOString().split('T')[0],
    reportAuthorisedByForOnBehalfOf: '',
    reportAuthorisedByPosition: '',
    reportAuthorisedByAddress: '',
    reportAuthorisedByMembershipNo: '',
    bs7671Compliance: false,
    buildingRegsCompliance: false,
    competentPersonScheme: false,
    completedSections: {},
    observations: [],
  });

  // Ref to always have the latest formData
  const formDataRef = useRef<any>(formData);
  useLayoutEffect(() => {
    formDataRef.current = formData;
  }, [formData]);

  const getLatestFormData = useCallback(() => formDataRef.current, []);

  // State
  const [currentReportId, setCurrentReportId] = useState<string | null>(initialReportId || null);
  const [showStartNewDialog, setShowStartNewDialog] = useState(false);
  const [showBoardScan, setShowBoardScan] = useState(false);
  const [hasLoadedDesign, setHasLoadedDesign] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<Date | null>(null);

  // Fetch design data if designId is provided (from Circuit Designer)
  const { data: designData, isLoading: isLoadingDesign } = useDesignedCircuit(designId || '');
  const updateDesignStatus = useUpdateDesignedCircuitStatus();

  // Generate and manage temporary report ID for photo uploads
  const { effectiveReportId } = useReportId({
    reportType: 'eic',
    currentReportId,
  });

  // Auto-save hook
  const {
    isSaving,
    lastSaveTime,
    hasUnsavedChanges,
    manualSave,
    loadFromLocalStorage,
    clearAutoSave,
  } = useEICAutoSave({
    formData,
    interval: 30,
    enabled: true,
  });

  // Load saved data from IndexedDB on mount
  useEffect(() => {
    const loadData = async () => {
      const savedData = await loadFromLocalStorage();
      if (savedData?.formData) {
        if (initialReportId) {
          const certificateNumber =
            savedData.formData.certificateNumber || formData.certificateNumber;
          setFormData({ ...savedData.formData, certificateNumber });
        } else {
          const { certificateNumber: _discarded, ...dataWithoutCertNumber } = savedData.formData;
          setFormData((prev) => ({ ...prev, ...dataWithoutCertNumber }));
        }
      }
    };
    loadData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-recover drafts for NEW reports
  const draftRecoveryAttempted = useRef(false);
  useEffect(() => {
    if (initialReportId || draftRecoveryAttempted.current) return;
    draftRecoveryAttempted.current = true;

    const draft = draftStorage.loadDraft('eic', null);
    if (draft?.data && !formData.clientName) {
      if (
        draft.data.clientName ||
        draft.data.installationAddress ||
        (draft.data.scheduleOfTests && draft.data.scheduleOfTests.length > 0)
      ) {
        console.log('[EIC] Auto-recovering draft for new report');
        const { certificateNumber: _discarded, ...draftDataWithoutCertNumber } = draft.data;
        setFormData((prev) => ({
          ...prev,
          ...draftDataWithoutCertNumber,
          certificateNumber: prev.certificateNumber,
        }));
        toast({
          title: 'Draft recovered',
          description: 'Your previous work has been restored.',
        });
      }
    }
  }, [initialReportId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Generate certificate number on mount if needed
  const certNumberGenerated = useRef(false);
  useEffect(() => {
    const initCertificateNumber = async () => {
      if (!formData.certificateNumber && !currentReportId && !certNumberGenerated.current) {
        certNumberGenerated.current = true;
        const { generateCertificateNumber } = await import('@/utils/certificateNumbering');
        const certNumber = await generateCertificateNumber('eic');
        console.log('[EIC] Generated certificate number:', certNumber);
        setFormData((prev) => ({ ...prev, certificateNumber: certNumber }));
      }
    };
    initCertificateNumber();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Cloud sync integration
  const handleReportCreated = useCallback((newReportId: string) => {
    console.log('[EIC] Auto-sync created report:', newReportId);
    setCurrentReportId(newReportId);
  }, []);

  const {
    syncState,
    syncToCloud,
    loadFromCloud,
    isOnline,
    isAuthenticated,
    authCheckComplete,
    syncNow,
    onTabChange,
  } = useCloudSync({
    reportId: currentReportId,
    reportType: 'eic',
    data: formData,
    enabled: true,
    customerId: customerIdFromNav,
    onReportCreated: handleReportCreated,
  });

  const loadFromCloudRef = useRef(loadFromCloud);
  loadFromCloudRef.current = loadFromCloud;

  // beforeunload handler
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (formData && currentReportId) {
        draftStorage.saveDraft('eic', currentReportId, formData);
        console.log('[EIC] Saved draft on beforeunload');
      } else if (formData && (formData.clientName || formData.installationAddress)) {
        draftStorage.saveDraft('eic', null, formData);
        console.log('[EIC] Saved new draft on beforeunload');
      }

      const hasUnsyncedChanges = syncState.status !== 'synced';
      const hasMeaningfulData = formData.clientName || formData.installationAddress;

      if (hasUnsyncedChanges && hasMeaningfulData) {
        if (isOnline && isAuthenticated && syncNow) {
          console.log('[EIC] Attempting quick sync on beforeunload');
          syncNow();
        }
        e.preventDefault();
        e.returnValue =
          'Your certificate has NOT been saved to the cloud. If you leave, you may lose your work on other devices.';
        return;
      }

      const isCurrentlySyncing = syncState.status === 'syncing' || syncState.queuedChanges > 0;
      if (isCurrentlySyncing) {
        e.preventDefault();
        e.returnValue = 'Your certificate is still saving. Are you sure you want to leave?';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [
    formData,
    currentReportId,
    syncState.status,
    syncState.queuedChanges,
    isOnline,
    isAuthenticated,
    syncNow,
  ]);

  // Pre-fill customer details from navigation
  useEffect(() => {
    if (customerDataFromNav && !initialReportId) {
      setFormData((prev) => ({
        ...prev,
        clientName: customerDataFromNav.name || '',
        clientAddress: customerDataFromNav.address || '',
        installationAddress: customerDataFromNav.address || '',
      }));
    }
  }, [customerDataFromNav, initialReportId]);

  // Pre-populate form from Circuit Designer design data
  useEffect(() => {
    if (designData && !hasLoadedDesign && !initialReportId) {
      const scheduleData = designData.schedule_data;

      const transformedCircuits =
        scheduleData.circuits?.map((circuit: any, idx: number) => ({
          id: `design-${Date.now()}-${idx + 1}`,
          circuitNumber: circuit.circuitNumber || (idx + 1).toString(),
          circuitDesignation: `C${idx + 1}`,
          circuitDescription: circuit.circuitDescription || circuit.name || '',
          circuitType: circuit.loadType || '',
          phaseType: circuit.phaseType || (circuit.phases === 3 ? '3P' : '1P'),
          referenceMethod: circuit.referenceMethod || circuit.installationMethod || '',
          pointsServed: circuit.pointsServed || '',
          liveSize: circuit.liveSize || circuit.cableSize?.toString() || '',
          cpcSize: circuit.cpcSize || '',
          bsStandard: circuit.bsStandard || 'BS EN 60898',
          protectiveDeviceType:
            circuit.protectiveDeviceType || circuit.protectionDevice?.type || 'MCB',
          protectiveDeviceCurve:
            circuit.protectiveDeviceCurve || circuit.protectionDevice?.curve || 'B',
          protectiveDeviceRating:
            circuit.protectiveDeviceRating || circuit.protectionDevice?.rating?.toString() || '',
          protectiveDeviceKaRating: circuit.protectiveDeviceKaRating || '6',
          expectedR1R2: circuit.r1r2 || circuit.expectedTestResults?.r1r2?.at20C || '',
          expectedZs: circuit.zs || circuit.calculations?.zs?.toString() || '',
          expectedMaxZs: circuit.maxZs || circuit.calculations?.maxZs?.toString() || '',
          r1r2: '',
          zs: '',
          maxZs: circuit.maxZs || circuit.calculations?.maxZs?.toString() || '',
          insulationTestVoltage: circuit.insulationTestVoltage || '500V',
          insulationLiveNeutral: '',
          insulationLiveEarth: '',
          polarity: '',
          rcdRating: circuit.rcdRating || (circuit.rcdProtected ? '30mA' : ''),
          rcdType: circuit.rcdType || '',
          rcdOneX: '',
          rcdFiveX: '',
          pfc: '',
          functionalTesting: '',
          autoFilled: true,
          fromDesigner: true,
          notes: 'Pre-filled from AI Circuit Designer - verify on-site',
        })) || [];

      setFormData((prev) => ({
        ...prev,
        installationAddress: designData.installation_address || prev.installationAddress,
        clientName: scheduleData.projectInfo?.clientName || prev.clientName,
        description: scheduleData.projectInfo?.projectName || prev.description,
        supplyVoltage: scheduleData.supply?.voltage?.toString() || '230',
        phases: scheduleData.supply?.phases === 3 ? 'three' : 'single',
        earthingArrangement: (scheduleData.supply?.earthingSystem || 'TN-C-S')
          .toLowerCase()
          .replace(/-/g, ''),
        scheduleOfTests: transformedCircuits,
        designSourceId: designId,
        designSourceDate: designData.created_at,
      }));

      setHasLoadedDesign(true);

      toast({
        title: 'Design Loaded',
        description: `${transformedCircuits.length} circuits pre-filled from Circuit Designer. Enter actual test readings on-site.`,
      });

      if (designId) {
        updateDesignStatus.mutate({ id: designId, status: 'in-progress' });
      }
    }
  }, [designData, hasLoadedDesign, designId, initialReportId, toast, updateDesignStatus]);

  // Load from cloud if initialReportId is provided
  useEffect(() => {
    if (initialReportId && authCheckComplete) {
      const localDraft = draftStorage.loadDraft('eic', initialReportId);

      if (!isAuthenticated) {
        if (localDraft?.data) {
          console.log('[EIC] Using local draft (not authenticated)');
          const certificateNumber = localDraft.data.certificateNumber || formData.certificateNumber;
          setFormData({ ...localDraft.data, certificateNumber });
          setCurrentReportId(initialReportId);
          toast({
            title: 'Loaded from local storage',
            description: 'Sign in to sync with cloud.',
          });
          return;
        }

        toast({
          title: 'Cannot load report',
          description: 'Please sign in to load reports.',
          variant: 'destructive',
        });
        return;
      }

      if (!isOnline) {
        if (localDraft?.data) {
          console.log('[EIC] Using local draft (offline)');
          const certificateNumber = localDraft.data.certificateNumber || formData.certificateNumber;
          setFormData({ ...localDraft.data, certificateNumber });
          setCurrentReportId(initialReportId);
          toast({
            title: 'Loaded from local storage',
            description: 'Changes will sync when online.',
          });
          return;
        }

        toast({
          title: 'Cannot load report',
          description: 'You are offline.',
          variant: 'destructive',
        });
        return;
      }

      loadFromCloudRef.current(initialReportId).then((cloudResult) => {
        if (cloudResult && cloudResult.data && typeof cloudResult.data === 'object') {
          const data = cloudResult.data as any;
          const cloudTime = new Date(data.updated_at || data.last_synced_at || 0).getTime();
          const localTime = localDraft?.lastModified
            ? new Date(localDraft.lastModified).getTime()
            : 0;

          console.log('[EIC] Comparing timestamps - Cloud:', cloudTime, 'Local:', localTime);

          const integrity = validateLoadedData(data, 'eic');

          if (!integrity.hasData) {
            logIntegrityEvent('load_empty', {
              reportType: 'eic',
              reportId: initialReportId,
              fieldCount: integrity.fieldCount,
              error: integrity.warnings.join('; '),
            });

            if (localDraft?.data) {
              const localIntegrity = validateLoadedData(localDraft.data, 'eic');
              if (localIntegrity.hasData) {
                console.log('[EIC] Cloud data empty, using local backup');
                const certificateNumber =
                  localDraft.data.certificateNumber || formData.certificateNumber;
                setFormData({ ...localDraft.data, certificateNumber });
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
            console.log('[EIC] Using LOCAL draft (newer than cloud)');
            const certificateNumber =
              localDraft.data.certificateNumber || formData.certificateNumber;
            setFormData({ ...localDraft.data, certificateNumber });
            logIntegrityEvent('load_success', {
              reportType: 'eic',
              reportId: initialReportId,
              fieldCount: Object.keys(localDraft.data).length,
              source: 'local',
            });
            toast({
              title: 'Recovered unsaved changes',
              description: 'Your recent edits have been restored.',
            });
          } else {
            console.log('[EIC] Using CLOUD data');
            const certificateNumber = data.certificateNumber || formData.certificateNumber;
            setFormData({ ...data, certificateNumber });
            logIntegrityEvent('load_success', {
              reportType: 'eic',
              reportId: initialReportId,
              fieldCount: integrity.fieldCount,
              source: 'cloud',
            });
          }
          setCurrentReportId(initialReportId);
        } else if (localDraft?.data) {
          console.log('[EIC] Cloud load failed, using local draft');
          const certificateNumber = localDraft.data.certificateNumber || formData.certificateNumber;
          setFormData({ ...localDraft.data, certificateNumber });
          setCurrentReportId(initialReportId);
          logIntegrityEvent('recovery_success', {
            reportType: 'eic',
            reportId: initialReportId,
            source: 'local',
          });
          toast({
            title: 'Loaded from local storage',
            description: 'Cloud sync will retry automatically.',
          });
        } else {
          logIntegrityEvent('recovery_failed', {
            reportType: 'eic',
            reportId: initialReportId,
            error: 'No data found in cloud or local',
          });
          toast({
            title: 'Report not found',
            description: 'Could not load the requested report.',
            variant: 'destructive',
          });
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialReportId, authCheckComplete, isAuthenticated, isOnline]);

  // Observations hook
  const {
    observations,
    addObservation,
    updateObservation,
    removeObservation,
    autoCreateObservation,
  } = useEICObservations(formData.observations);

  // Update observations in form data when they change
  useEffect(() => {
    setFormData((prev) => ({ ...prev, observations }));
  }, [observations]);

  // Form update handler
  const updateFormData = useCallback((field: string, value: any) => {
    if (field === 'certificateNumber') {
      console.warn('Certificate number cannot be modified');
      return;
    }

    setFormData((prev) => {
      const resolvedValue = typeof value === 'function' ? value(prev[field]) : value;
      const sanitizedValue =
        typeof resolvedValue === 'string' ? sanitizeTextInput(resolvedValue) : resolvedValue;
      return { ...prev, [field]: sanitizedValue };
    });
  }, []);

  const handleStartNew = () => {
    setShowStartNewDialog(true);
  };

  // Board scan completion handler
  const handleBoardScanComplete = useCallback(
    (data: { board: any; circuits: any[]; metadata?: any; warnings?: string[] }) => {
      const newCircuits = data.circuits.map((circuit, index) => {
        const ratingAmps = circuit.rating || null;
        const deviceCategory = circuit.device || 'MCB';
        const deviceCurve = circuit.curve || 'B';

        const liveSize = getCableSizeForRating(ratingAmps) || '2.5mm';
        const cpcSize = getCpcForLive(liveSize) || '1.5mm';
        const bsStandard = BS_STANDARD_MAP[deviceCategory] || 'MCB (BS EN 60898)';
        const maxZs = getMaxZsFromDeviceDetails(
          bsStandard,
          deviceCurve,
          ratingAmps?.toString() || '',
          circuit.label || ''
        );

        return {
          id: `circuit-${Date.now()}-${index}`,
          circuitNumber: circuit.position?.toString() || String(index + 1),
          circuitDesignation: `C${circuit.position?.toString() || String(index + 1)}`,
          circuitDescription: circuit.label || `Circuit ${index + 1}`,
          circuitType: '',
          type: '',
          protectiveDeviceType: deviceCategory,
          protectiveDeviceRating: ratingAmps?.toString() || '',
          protectiveDeviceCurve: deviceCurve,
          bsStandard: bsStandard,
          liveSize: liveSize,
          cpcSize: cpcSize,
          maxZs: maxZs?.toString() || '',
          phaseType: circuit.phase === '3P' ? '3P' : ('1P' as '1P' | '3P'),
          rcdBsStandard: deviceCategory === 'RCBO' ? 'RCBO (BS EN 61009)' : '',
          rcdType: deviceCategory === 'RCBO' ? 'A' : '',
          rcdRating: deviceCategory === 'RCBO' ? '30' : '',
          r1r2: '',
          r2: '',
          zs: '',
          polarity: '',
          insulationTestVoltage: '500',
          insulationLiveNeutral: '',
          insulationLiveEarth: '',
          rcdOneX: '',
          autoFilled: true,
          notes: circuit.notes || '',
        };
      });

      const existingCircuits = formDataRef.current.scheduleOfTests || [];
      updateFormData('scheduleOfTests', [...existingCircuits, ...newCircuits]);

      if (data.board) {
        updateFormData('boardBrand', data.board.make || '');
        updateFormData('boardModel', data.board.model || '');
        updateFormData('mainSwitchRating', data.board.mainSwitch || '');
      }

      setShowBoardScan(false);

      toast({
        title: 'Board Scanned Successfully',
        description: `${newCircuits.length} circuits detected and added to schedule.`,
      });
    },
    [updateFormData, toast]
  );

  const confirmStartNew = async () => {
    clearAutoSave();
    setCurrentReportId(null);
    const { generateCertificateNumber } = await import('@/utils/certificateNumbering');
    const certificateNumber = await generateCertificateNumber('eic');
    console.log('[EIC] Starting fresh report with new certificate number:', certificateNumber);
    setFormData({
      certificateNumber,
      clientName: '',
      clientAddress: '',
      installationAddress: '',
      installationDate: '',
      installationType: 'domestic',
      constructionDate: '',
      description: '',
      designStandard: 'BS7671',
      partPCompliance: '',
      supplyVoltage: '230',
      supplyFrequency: '50',
      phases: 'single',
      earthingArrangement: 'tncs',
      supplyType: '',
      mainProtectiveDevice: '',
      mainSwitchRating: '',
      mainSwitchLocation: '',
      earthElectrodeType: '',
      earthElectrodeResistance: '',
      mainBondingConductor: '',
      supplementaryBonding: '',
      inspections: {},
      scheduleOfTests: [],
      distributionBoards: [],
      testMethod: '',
      testVoltage: '',
      testNotes: '',
      testInstruments: '',
      designerName: '',
      designerQualifications: '',
      designerCompany: '',
      designerDate: new Date().toISOString().split('T')[0],
      designerSignature: '',
      constructorName: '',
      constructorQualifications: '',
      constructorCompany: '',
      constructorDate: new Date().toISOString().split('T')[0],
      constructorSignature: '',
      inspectorName: '',
      inspectorQualifications: '',
      inspectorCompany: '',
      inspectorDate: new Date().toISOString().split('T')[0],
      inspectorSignature: '',
      sameAsDesigner: false,
      sameAsConstructor: false,
      additionalNotes: '',
      inspectedBySignature: '',
      reportAuthorisedBySignature: '',
      inspectedByName: '',
      inspectedByForOnBehalfOf: '',
      inspectedByPosition: '',
      inspectedByAddress: '',
      inspectedByCpScheme: '',
      inspectedByCpSchemeNA: false,
      reportAuthorisedByName: '',
      reportAuthorisedByDate: new Date().toISOString().split('T')[0],
      reportAuthorisedByForOnBehalfOf: '',
      reportAuthorisedByPosition: '',
      reportAuthorisedByAddress: '',
      reportAuthorisedByMembershipNo: '',
      bs7671Compliance: false,
      buildingRegsCompliance: false,
      competentPersonScheme: false,
      completedSections: {},
      inspectionItems: [],
      observations: [],
    });
    setShowStartNewDialog(false);
    toast({
      title: 'New EIC started',
      description: 'Started a new EIC report.',
    });
  };

  const confirmDuplicate = async () => {
    const { generateCertificateNumber } = await import('@/utils/certificateNumbering');
    const certificateNumber = await generateCertificateNumber('eic');

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
    delete duplicatedData.certificateGenerated;
    delete duplicatedData.certificateGeneratedAt;
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

  const canGenerateCertificate = useCallback(() => {
    return true;
  }, []);

  const handleGenerateCertificate = async () => {
    try {
      const completedData = {
        ...formData,
        certificateGenerated: true,
        certificateGeneratedAt: new Date().toISOString(),
        status: 'completed',
      };

      setFormData(completedData);
      await manualSave();

      const result = await syncToCloud(true);
      if (result && typeof result === 'object' && 'reportId' in result) {
        setCurrentReportId(result.reportId as string);
      }

      console.log('Generating EIC certificate...', formData);

      const isNotifiable = isNotifiableWork(
        formData.description || '',
        formData.installationAddress || '',
        formData.scheduleOfTests?.some((circuit: any) => circuit.isNew === true)
      );

      if (isNotifiable) {
        let complianceWarning = false;
        if (
          formData.scheduleOfTests &&
          Array.isArray(formData.scheduleOfTests) &&
          formData.scheduleOfTests.length > 0
        ) {
          const { checkAllResultsCompliance } = require('@/utils/autoRegChecker');
          const complianceResult = checkAllResultsCompliance(formData.scheduleOfTests);
          const hasFailures = complianceResult.some((result: any) =>
            result.warnings.some((w: any) => w.severity === 'error')
          );
          if (hasFailures) {
            complianceWarning = true;
            toast({
              title: 'Compliance Warning',
              description:
                'Test results show BS7671 compliance issues. Part P notification will include these non-compliances.',
              variant: 'destructive',
              duration: 8000,
            });
          }
        }

        try {
          const {
            data: { user },
          } = await supabase.auth.getUser();
          if (user && result.reportId) {
            const notificationResult = await createNotificationFromCertificate(
              result.reportId as string,
              'eic',
              formData,
              user.id
            );

            if (notificationResult.success) {
              queryClient.invalidateQueries({ queryKey: ['notifications'] });
              queryClient.invalidateQueries({ queryKey: ['recent-certificates'] });
              queryClient.invalidateQueries({ queryKey: ['my-reports'] });

              toast({
                title: 'EIC Generated Successfully',
                description:
                  'Part P notification created. Submission required within 30 days of completion date.',
                action: (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate('/?section=notifications')}
                  >
                    <Bell className="h-3 w-3 mr-1" />
                    View Notifications
                  </Button>
                ),
              });
            } else {
              throw new Error(notificationResult.error);
            }
          }
        } catch (notificationError) {
          console.error('Notification creation failed:', notificationError);
          toast({
            title: 'EIC Generated',
            description:
              'Certificate created successfully, but notification creation failed. You can create it manually from the Notifications page.',
          });
        }
      } else {
        queryClient.invalidateQueries({ queryKey: ['recent-certificates'] });
        queryClient.invalidateQueries({ queryKey: ['my-reports'] });

        toast({
          title: 'EIC Generated',
          description: 'Your Electrical Installation Certificate has been generated successfully.',
        });
      }

      clearAutoSave();
    } catch (error) {
      toast({
        title: 'Generation Failed',
        description: 'There was an error generating the certificate. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleManualSave = async () => {
    await manualSave();

    const reportIdForBackup = currentReportId || effectiveReportId;
    if (reportIdForBackup && formData.clientName) {
      saveToLocalStorageBackup('eic', reportIdForBackup, formData);
      logIntegrityEvent('backup_saved', {
        reportType: 'eic',
        reportId: reportIdForBackup,
        fieldCount: Object.keys(formData).filter((k) => !k.startsWith('_')).length,
      });
    }

    const result = await syncToCloud(true);

    if (!result || !result.success) {
      if (formData.clientName || formData.installationAddress) {
        const now = Date.now();
        if (now - lastSaveErrorToastRef.current > 30000) {
          lastSaveErrorToastRef.current = now;
          toast({
            title: 'Save failed',
            description: 'Unable to save EIC. Please check your connection and try again.',
            variant: 'destructive',
          });
        }
      }
      return;
    }

    setLastSavedTime(new Date());

    if (result.reportId) {
      setCurrentReportId(result.reportId as string);

      if (customerIdFromNav && result.reportId) {
        const { linkCustomerToReport } = await import('@/utils/customerHelper');
        await linkCustomerToReport(result.reportId as string, customerIdFromNav);
      }

      toast({
        title: 'EIC Saved',
        description: 'Your certificate has been saved successfully.',
      });

      recordPositiveAction();
    }

    queryClient.invalidateQueries({ queryKey: ['recent-certificates'] });
    queryClient.invalidateQueries({ queryKey: ['my-reports'] });
  };

  // Observations helpers
  const handleNavigateToObservations = () => {
    const observationsElement = document.getElementById('eic-observations-section');
    if (observationsElement) {
      observationsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleAddObservation = () => {
    const newObsId = addObservation({
      item: 'General observation',
      defectCode: 'C2',
      description: '',
      recommendation: '',
      rectified: false,
    });

    setTimeout(() => handleNavigateToObservations(), 100);
    return newObsId;
  };

  const handleSyncObservationToInspectionItem = useCallback(
    (inspectionItemId: string, newOutcome: string) => {
      console.log(
        `[EICForm] Syncing observation change to inspection item ${inspectionItemId}: ${newOutcome}`
      );

      const items = formDataRef.current.inspectionItems || [];
      const updatedItems = items.map((item: any) =>
        item.id === inspectionItemId ? { ...item, outcome: newOutcome, inspected: true } : item
      );

      updateFormData('inspectionItems', updatedItems);
    },
    [updateFormData]
  );

  const observationsProps = {
    observations,
    reportId: effectiveReportId,
    onAddObservation: handleAddObservation,
    onUpdateObservation: updateObservation,
    onRemoveObservation: removeObservation,
    onAutoCreateObservation: autoCreateObservation,
    onNavigateToObservations: handleNavigateToObservations,
    onSyncToInspectionItem: handleSyncObservationToInspectionItem,
  };

  // Convert sync status to SyncState for the indicator
  const getSyncIndicatorState = useCallback((): SyncState => {
    if (!isOnline) return 'offline';
    if (syncState.status === 'error') return 'error';
    if (syncState.status === 'syncing') return 'syncing';
    if (syncState.status === 'synced') return 'synced';
    if (hasUnsavedChanges) return 'unsaved';
    return 'synced';
  }, [isOnline, syncState.status, hasUnsavedChanges]);

  const contextValue: EICFormContextType = {
    formData,
    updateFormData,
    getLatestFormData,
    currentReportId,
    effectiveReportId,
    showStartNewDialog,
    setShowStartNewDialog,
    handleStartNew,
    confirmStartNew,
    confirmDuplicate,
    handleManualSave,
    handleGenerateCertificate,
    syncState,
    isOnline,
    isAuthenticated,
    isSaving,
    hasUnsavedChanges,
    lastSavedTime,
    syncNow,
    onTabChange,
    getSyncIndicatorState,
    observations,
    observationsProps,
    showBoardScan,
    setShowBoardScan,
    handleBoardScanComplete,
    isLoadingDesign: !!(designId && isLoadingDesign),
    canGenerateCertificate,
  };

  return (
    <EICFormContext.Provider value={contextValue}>
      <CertificatePhotoProvider
        certificateNumber={formData.certificateNumber || ''}
        certificateType="eic"
        clientName={formData.clientName || ''}
        installationAddress={formData.installationAddress || formData.clientAddress || ''}
      >
        <StickyFormSyncBar
          state={getSyncIndicatorState()}
          lastSaved={lastSavedTime}
          isOnline={isOnline}
          onRetry={syncNow}
          certificateNumber={formData.certificateNumber}
        />
        {children}
      </CertificatePhotoProvider>
    </EICFormContext.Provider>
  );
};
