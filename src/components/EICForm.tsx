import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useEICTabs } from '@/hooks/useEICTabs';
import { useEICObservations } from '@/hooks/useEICObservations';
import { useEICAutoSave } from '@/hooks/useEICAutoSave';
import { useCloudSync } from '@/hooks/useCloudSync';
import { useReportId } from '@/hooks/useReportId';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { isNotifiableWork, createNotificationFromCertificate } from '@/utils/notificationHelper';
import { sanitizeTextInput } from '@/utils/inputSanitization';
import { draftStorage } from '@/utils/draftStorage';
import { checkAllResultsCompliance } from '@/utils/autoRegChecker';
import { getCableSizeForRating, getCpcForLive, BS_STANDARD_MAP } from '@/utils/circuitDefaults';
import { getMaxZsFromDeviceDetails } from '@/utils/zsCalculations';
import { CertificatePhotoProvider } from '@/contexts/CertificatePhotoContext';
import EICFormHeader from './eic/EICFormHeader';
import EICFormTabs from './eic/EICFormTabs';
import StartNewEICRDialog from './StartNewEICRDialog';
import { BoardScannerOverlay } from './testing/BoardScannerOverlay';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Save, Upload, AlertTriangle, Bell, CircuitBoard, Zap } from 'lucide-react';
import { useDesignedCircuit, useUpdateDesignedCircuitStatus } from '@/hooks/useDesignedCircuits';

const EICForm = ({ onBack, initialReportId, designId }: { onBack: () => void; initialReportId?: string | null; designId?: string | null }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const lastSaveErrorToastRef = useRef<number>(0);

  // Capture customer data from navigation state
  const customerIdFromNav = location.state?.customerId;
  const customerDataFromNav = location.state?.customerData;
  
  const [formData, setFormData] = useState({
    // Certificate Details
    certificateNumber: '',  // Will be generated asynchronously
    
    // Installation Details
    clientName: '',
    clientAddress: '',
    installationAddress: '',
    installationDate: '',
    installationType: 'domestic',
    constructionDate: '',
    description: '',
    designStandard: 'BS7671',
    partPCompliance: '',
    
    // Supply & Earthing - Default to most common UK domestic values
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
    
    // Schedule of Inspections
    inspections: {},
    inspectionItems: [],
    
    // Schedule of Testing
    scheduleOfTests: [],

    // Distribution Boards (multi-board support)
    distributionBoards: [],

    // Test Information
    testMethod: '',
    testVoltage: '',
    testNotes: '',
    testInstruments: '',
    
    // Declarations
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
    
    // Compliance checkboxes
    bs7671Compliance: false,
    buildingRegsCompliance: false,
    competentPersonScheme: false,
    
    // Form state
    completedSections: {},
    
    // Observations
    observations: []
  });

  // State for cloud sync
  const [currentReportId, setCurrentReportId] = useState<string | null>(initialReportId || null);
  const [showStartNewDialog, setShowStartNewDialog] = useState(false);
  const [showBoardScan, setShowBoardScan] = useState(false);
  const [hasLoadedDesign, setHasLoadedDesign] = useState(false);

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
    clearAutoSave
  } = useEICAutoSave({
    formData,
    interval: 30, // Auto-save every 30 seconds
    enabled: true
  });

  // Load saved data from IndexedDB on mount
  // NOTE: For NEW reports (no initialReportId), do NOT restore certificate number - always generate fresh
  useEffect(() => {
    const loadData = async () => {
      const savedData = await loadFromLocalStorage();
      if (savedData?.formData) {
        // For NEW reports, don't preserve old certificate numbers from localStorage
        // This ensures each new EIC gets a unique certificate number
        if (initialReportId) {
          // EXISTING report - preserve the certificate number
          const certificateNumber = savedData.formData.certificateNumber || formData.certificateNumber;
          setFormData({ ...savedData.formData, certificateNumber });
        } else {
          // NEW report - discard old certificate number, let generation effect create new one
          const { certificateNumber: _discarded, ...dataWithoutCertNumber } = savedData.formData;
          setFormData(prev => ({ ...prev, ...dataWithoutCertNumber }));
        }
      }
    };
    loadData();
  }, []); // Empty dependency array - only run once on mount

  // Auto-recover drafts for NEW reports from localStorage
  // This ensures work isn't lost if the user navigates away and comes back
  // NOTE: For NEW reports, don't recover certificate numbers - always generate fresh
  const draftRecoveryAttempted = useRef(false);
  useEffect(() => {
    // Only for NEW reports (no initialReportId)
    if (initialReportId || draftRecoveryAttempted.current) return;
    draftRecoveryAttempted.current = true;

    const draft = draftStorage.loadDraft('eic', null);
    if (draft?.data && !formData.clientName) {
      // Auto-recover if form is empty and draft has meaningful data
      if (draft.data.clientName || draft.data.installationAddress ||
          (draft.data.scheduleOfTests && draft.data.scheduleOfTests.length > 0)) {
        console.log('[EIC] Auto-recovering draft for new report');
        // Don't preserve old certificate number for NEW reports - generate fresh
        const { certificateNumber: _discarded, ...draftDataWithoutCertNumber } = draft.data;
        setFormData(prev => ({
          ...prev,
          ...draftDataWithoutCertNumber,
          // Keep current cert number (will be generated by separate effect)
          certificateNumber: prev.certificateNumber,
        }));
        toast({
          title: 'Draft recovered',
          description: 'Your previous work has been restored.',
        });
      }
    }
  }, [initialReportId]);

  // Generate certificate number on mount if needed - Prevent regeneration
  const certNumberGenerated = React.useRef(false);
  useEffect(() => {
    const initCertificateNumber = async () => {
      if (!formData.certificateNumber && !currentReportId && !certNumberGenerated.current) {
        certNumberGenerated.current = true;
        const { generateCertificateNumber } = await import('@/utils/certificateNumbering');
        const certNumber = await generateCertificateNumber('eic');
        console.log('[EIC] Generated certificate number:', certNumber);
        setFormData(prev => ({ ...prev, certificateNumber: certNumber }));
      }
    };
    initCertificateNumber();
  }, []);

  // Cloud sync integration
  // onReportCreated callback ensures component state stays in sync when auto-sync creates a new report
  const handleReportCreated = useCallback((newReportId: string) => {
    console.log('[EIC] Auto-sync created report:', newReportId);
    setCurrentReportId(newReportId);
  }, []);

  const { syncState, syncToCloud, loadFromCloud, isOnline, isAuthenticated, authCheckComplete, syncNow, onTabChange } = useCloudSync({
    reportId: currentReportId,
    reportType: 'eic',
    data: formData,
    enabled: true,
    customerId: customerIdFromNav,
    onReportCreated: handleReportCreated,
  });

  // Stable ref for loadFromCloud to avoid re-triggering the cloud load effect
  const loadFromCloudRef = useRef(loadFromCloud);
  loadFromCloudRef.current = loadFromCloud;

  // ALWAYS save to localStorage before unload - never lose data
  // Also attempt cloud sync and warn user if data hasn't synced
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // CRITICAL: Save current form data to localStorage immediately
      // This is synchronous and fast - ensures data is never lost
      if (formData && currentReportId) {
        draftStorage.saveDraft('eic', currentReportId, formData);
        console.log('[EIC] Saved draft on beforeunload');
      } else if (formData && (formData.clientName || formData.installationAddress)) {
        // For new reports, save to 'new' key
        draftStorage.saveDraft('eic', null, formData);
        console.log('[EIC] Saved new draft on beforeunload');
      }

      // Check if we have unsynced changes to the cloud
      // 'queued' status from useCloudSync also includes 'unsaved' state
      const hasUnsyncedChanges = syncState.status !== 'synced';
      const hasMeaningfulData = formData.clientName || formData.installationAddress;

      if (hasUnsyncedChanges && hasMeaningfulData) {
        // Attempt a quick sync if online and authenticated
        // Note: This is a last-ditch effort - the sync may not complete before page closes
        if (isOnline && isAuthenticated && syncNow) {
          console.log('[EIC] Attempting quick sync on beforeunload');
          // Fire and forget - we can't await in beforeunload
          syncNow();
        }

        // ALWAYS warn the user if data hasn't synced to cloud
        e.preventDefault();
        // Custom message for the warning dialog
        e.returnValue = 'Your certificate has NOT been saved to the cloud. If you leave, you may lose your work on other devices.';
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
  }, [formData, currentReportId, syncState.status, syncState.queuedChanges, isOnline, isAuthenticated, syncNow]);
  
  // Pre-fill customer details if navigating from customer page
  useEffect(() => {
    if (customerDataFromNav && !initialReportId) {
      setFormData(prev => ({
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

      // Transform design circuits to test results format
      const transformedCircuits = scheduleData.circuits?.map((circuit: any, idx: number) => ({
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
        protectiveDeviceType: circuit.protectiveDeviceType || circuit.protectionDevice?.type || 'MCB',
        protectiveDeviceCurve: circuit.protectiveDeviceCurve || circuit.protectionDevice?.curve || 'B',
        protectiveDeviceRating: circuit.protectiveDeviceRating || circuit.protectionDevice?.rating?.toString() || '',
        protectiveDeviceKaRating: circuit.protectiveDeviceKaRating || '6',
        // Expected values from design (shown as guidance)
        expectedR1R2: circuit.r1r2 || circuit.expectedTestResults?.r1r2?.at20C || '',
        expectedZs: circuit.zs || circuit.calculations?.zs?.toString() || '',
        expectedMaxZs: circuit.maxZs || circuit.calculations?.maxZs?.toString() || '',
        // Actual test values (to be filled on-site)
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
        notes: 'Pre-filled from AI Circuit Designer - verify on-site'
      })) || [];

      // Pre-populate form data
      setFormData(prev => ({
        ...prev,
        installationAddress: designData.installation_address || prev.installationAddress,
        clientName: scheduleData.projectInfo?.clientName || prev.clientName,
        description: scheduleData.projectInfo?.projectName || prev.description,
        supplyVoltage: scheduleData.supply?.voltage?.toString() || '230',
        phases: scheduleData.supply?.phases === 3 ? 'three' : 'single',
        earthingArrangement: (scheduleData.supply?.earthingSystem || 'TN-C-S').toLowerCase().replace(/-/g, ''),
        scheduleOfTests: transformedCircuits,
        // Store design source reference
        designSourceId: designId,
        designSourceDate: designData.created_at,
      }));

      setHasLoadedDesign(true);

      toast({
        title: 'Design Loaded',
        description: `${transformedCircuits.length} circuits pre-filled from Circuit Designer. Enter actual test readings on-site.`,
      });

      // Update design status to 'in-progress'
      if (designId) {
        updateDesignStatus.mutate({ id: designId, status: 'in-progress' });
      }
    }
  }, [designData, hasLoadedDesign, designId, initialReportId, toast, updateDesignStatus]);

  // Load from cloud if initialReportId is provided - with localStorage priority
  useEffect(() => {
    if (initialReportId && authCheckComplete) {
      // Step 1: Check localStorage for a draft of this report
      const localDraft = draftStorage.loadDraft('eic', initialReportId);

      if (!isAuthenticated) {
        // If not authenticated but have local draft, use it
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
        // If offline but have local draft, use it
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

      // Step 2: Load from cloud (use ref to avoid stale dep loop)
      loadFromCloudRef.current(initialReportId).then(cloudData => {
        // Step 3: Compare timestamps - use whichever is NEWER
        if (cloudData && typeof cloudData === 'object') {
          const data = cloudData as any;
          const cloudTime = new Date(data.updated_at || data.last_synced_at || 0).getTime();
          const localTime = localDraft?.lastModified ? new Date(localDraft.lastModified).getTime() : 0;

          console.log('[EIC] Comparing timestamps - Cloud:', cloudTime, 'Local:', localTime);

          if (localDraft?.data && localTime > cloudTime) {
            // Local is newer - use local data
            console.log('[EIC] Using LOCAL draft (newer than cloud)');
            const certificateNumber = localDraft.data.certificateNumber || formData.certificateNumber;
            setFormData({ ...localDraft.data, certificateNumber });
            toast({
              title: 'Recovered unsaved changes',
              description: 'Your recent edits have been restored.',
            });
          } else {
            // Cloud is newer or same - use cloud data
            console.log('[EIC] Using CLOUD data');
            const certificateNumber = data.certificateNumber || formData.certificateNumber;
            setFormData({ ...data, certificateNumber });
          }
          setCurrentReportId(initialReportId);
        } else if (localDraft?.data) {
          // Cloud failed but we have local - use local
          console.log('[EIC] Cloud load failed, using local draft');
          const certificateNumber = localDraft.data.certificateNumber || formData.certificateNumber;
          setFormData({ ...localDraft.data, certificateNumber });
          setCurrentReportId(initialReportId);
          toast({
            title: 'Loaded from local storage',
            description: 'Cloud sync will retry automatically.',
          });
        } else {
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
    removeObservationForInspectionItem
  } = useEICObservations(formData.observations);

  // Tabs hook
  const {
    currentTab,
    setCurrentTab,
    currentTabIndex,
    totalTabs,
    canAccessTab,
    hasRequiredFields,
    isTabComplete,
    toggleTabComplete,
    canNavigateNext,
    canNavigatePrevious,
    navigateNext,
    navigatePrevious,
    getProgressPercentage,
    getCurrentTabLabel
  } = useEICTabs(formData);

  // Prevent space bar from triggering anything - removed keyboard shortcut handling
  
  // Removed auto-save restore dialog check

  // Update observations in form data when they change
  useEffect(() => {
    setFormData(prev => ({ ...prev, observations }));
  }, [observations]);

  const handleUpdate = (field: string, value: any) => {
    // Prevent certificate number from being changed
    if (field === 'certificateNumber') {
      console.warn('Certificate number cannot be modified');
      return;
    }

    setFormData(prev => {
      // Support functional updaters for array fields (prevents stale closure bugs)
      const resolvedValue = typeof value === 'function' ? value(prev[field]) : value;
      // Sanitize string inputs to prevent XSS
      const sanitizedValue = typeof resolvedValue === 'string' ? sanitizeTextInput(resolvedValue) : resolvedValue;
      return { ...prev, [field]: sanitizedValue };
    });
  };

  const handleTabChange = (value: string) => {
    setCurrentTab(value as any);
  };

  const handleToggleComplete = () => {
    toggleTabComplete(currentTab, handleUpdate);
  };

  const handleStartNew = () => {
    setShowStartNewDialog(true);
  };

  // Handle board scan completion - populate circuits
  // BoardPhotoCapture returns: { circuits, board, metadata, warnings, decisions }
  const handleBoardScanComplete = useCallback((data: {
    board: any;
    circuits: any[];
    metadata?: any;
    warnings?: string[];
  }) => {
    // Convert detected circuits to test results format
    // BoardPhotoCapture already transforms circuits to: { position, label, device, rating, curve, ... }
    const newCircuits = data.circuits.map((circuit, index) => {
      const ratingAmps = circuit.rating || null;
      const deviceCategory = circuit.device || 'MCB';
      const deviceCurve = circuit.curve || 'B';

      // Get cable size from detected rating
      const liveSize = getCableSizeForRating(ratingAmps) || '2.5mm';
      const cpcSize = getCpcForLive(liveSize) || '1.5mm';

      // Get BS standard from device category
      const bsStandard = BS_STANDARD_MAP[deviceCategory] || 'MCB (BS EN 60898)';

      // Calculate Max Zs from detected device
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
        // Use DETECTED device values
        protectiveDeviceType: deviceCategory,
        protectiveDeviceRating: ratingAmps?.toString() || '',
        protectiveDeviceCurve: deviceCurve,
        bsStandard: bsStandard,
        // Cable sizes from detected rating
        liveSize: liveSize,
        cpcSize: cpcSize,
        // Max Zs calculated from BS 7671 tables
        maxZs: maxZs?.toString() || '',
        phaseType: circuit.phase === '3P' ? '3P' : '1P' as '1P' | '3P',
        // RCD details if RCBO
        rcdBsStandard: deviceCategory === 'RCBO' ? 'RCBO (BS EN 61009)' : '',
        rcdType: deviceCategory === 'RCBO' ? 'A' : '',
        rcdRating: deviceCategory === 'RCBO' ? '30' : '',
        // Default test values - user must fill these
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

    // Merge with existing circuits
    const existingCircuits = formData.scheduleOfTests || [];
    handleUpdate('scheduleOfTests', [...existingCircuits, ...newCircuits]);

    // Store board info - BoardPhotoCapture returns: { make, model, mainSwitch, spd, totalWays, ... }
    if (data.board) {
      handleUpdate('boardBrand', data.board.make || '');
      handleUpdate('boardModel', data.board.model || '');
      handleUpdate('mainSwitchRating', data.board.mainSwitch || '');
    }

    setShowBoardScan(false);

    toast({
      title: 'Board Scanned Successfully',
      description: `${newCircuits.length} circuits detected and added to schedule.`,
    });
  }, [formData.scheduleOfTests, handleUpdate, toast]);

  const confirmStartNew = async () => {
    clearAutoSave();
    // Clear the current report ID so this is treated as a NEW report
    setCurrentReportId(null);
    // Generate new certificate number for new report
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
      observations: []
    });
    setShowStartNewDialog(false);
    toast({
      title: "New EIC started",
      description: "Started a new EIC report.",
    });
  };

  const handleDuplicate = async () => {
    const { generateCertificateNumber } = await import('@/utils/certificateNumbering');
    const certificateNumber = await generateCertificateNumber('eic');
    
    // Deep clone current form data with polyfill (preserves Date objects)
    const duplicatedData: any = (typeof structuredClone === 'function' 
      ? structuredClone(formData)
      : JSON.parse(JSON.stringify(formData)));
    
    // Reset metadata fields (might exist from cloud-loaded reports)
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
      title: "Report duplicated",
      description: `New certificate number: ${certificateNumber}`,
    });
  };

  const handleLoadSavePoint = async (data: any) => {
    // Preserve certificate number if it exists in saved data, otherwise generate new one
    let certificateNumber = data.certificateNumber;
    if (!certificateNumber) {
      const { generateCertificateNumber } = await import('@/utils/certificateNumbering');
      certificateNumber = await generateCertificateNumber('eic');
    }
    setFormData({ ...data, certificateNumber });
    toast({
      title: "Save Point Loaded",
      description: "Your saved EIC has been restored successfully.",
    });
  };

  // Allow PDF generation without strict field validation
  const canGenerateCertificate = () => {
    return true;
  };

  const handleGenerateCertificate = async () => {
    try {
      // Mark certificate as completed
      const completedData = {
        ...formData,
        certificateGenerated: true,
        certificateGeneratedAt: new Date().toISOString(),
        status: 'completed'
      };
      
      setFormData(completedData);
      
      // Save current state before generating
      await manualSave();
      
      // Sync to cloud with completed data
      const result = await syncToCloud(true);
      if (result && typeof result === 'object' && 'reportId' in result) {
        setCurrentReportId(result.reportId as string);
      }
      
      console.log('Generating EIC certificate...', formData);
      
      // Check if work is notifiable under Part P
      const isNotifiable = isNotifiableWork(
        formData.description || '',
        formData.installationAddress || '',
        formData.scheduleOfTests?.some((circuit: any) => circuit.isNew === true)
      );

      if (isNotifiable) {
        // Note: Signature is NOT required for Part P notification tracking
        // The notification tracks the 30-day submission deadline regardless of signature status

        // Check BS7671 compliance before creating Part P notification
          let complianceWarning = false;
          if (formData.scheduleOfTests && Array.isArray(formData.scheduleOfTests) && formData.scheduleOfTests.length > 0) {
            const { checkAllResultsCompliance } = require('@/utils/autoRegChecker');
            const complianceResult = checkAllResultsCompliance(formData.scheduleOfTests);
            const hasFailures = complianceResult.some(
              (result: any) => result.warnings.some((w: any) => w.severity === 'error')
            );
            if (hasFailures) {
              complianceWarning = true;
              toast({
                title: "Compliance Warning",
                description: "Test results show BS7671 compliance issues. Part P notification will include these non-compliances.",
                variant: "destructive",
                duration: 8000,
              });
            }
          }
          
          // Create Part P notification (with warning if non-compliant)
          try {
            const { data: { user } } = await supabase.auth.getUser();
            if (user && result.reportId) {
              const notificationResult = await createNotificationFromCertificate(
                result.reportId as string,
                'eic',
                formData,
                user.id
              );

              if (notificationResult.success) {
                // Invalidate notifications query to update dashboard
                queryClient.invalidateQueries({ queryKey: ['notifications'] });
                
                // Invalidate dashboard queries to show updated status
                queryClient.invalidateQueries({ queryKey: ['recent-certificates'] });
                queryClient.invalidateQueries({ queryKey: ['my-reports'] });
                
                toast({
                  title: "EIC Generated Successfully",
                  description: "Part P notification created. Submission required within 30 days of completion date.",
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
              title: "EIC Generated",
              description: "Certificate created successfully, but notification creation failed. You can create it manually from the Notifications page.",
            });
          }
      } else {
        // Invalidate dashboard queries to show updated status
        queryClient.invalidateQueries({ queryKey: ['recent-certificates'] });
        queryClient.invalidateQueries({ queryKey: ['my-reports'] });
        
        toast({
          title: "EIC Generated",
          description: "Your Electrical Installation Certificate has been generated successfully.",
        });
      }
      
      // Clear auto-save after successful generation
      clearAutoSave();
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "There was an error generating the certificate. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSaveDraft = async () => {
    await manualSave();
    
    // Sync to cloud
    const result = await syncToCloud(true);
    
    // Check if save was successful
    if (!result || !result.success) {
      // Toast already shown by useCloudSync if form is too empty
      // Only show generic error for other failures - debounced to prevent spam
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
    
    if (result.reportId) {
      setCurrentReportId(result.reportId as string);
      
      // Link to customer if navigated from customer page
      if (customerIdFromNav && result.reportId) {
        const { linkCustomerToReport } = await import('@/utils/customerHelper');
        await linkCustomerToReport(result.reportId as string, customerIdFromNav);
      }
      
      toast({
        title: 'EIC Saved',
        description: 'Your certificate has been saved successfully.',
      });
    }
    
    // Invalidate queries to refresh dashboard
    queryClient.invalidateQueries({ queryKey: ['recent-certificates'] });
    queryClient.invalidateQueries({ queryKey: ['my-reports'] });
  };

  const handleNavigateToObservations = () => {
    const observationsElement = document.getElementById('eic-observations-section');
    if (observationsElement) {
      observationsElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  const handleAddObservation = () => {
    const newObsId = addObservation({
      item: 'General observation',
      defectCode: 'C2',
      description: '',
      recommendation: '',
      rectified: false
    });
    
    setTimeout(() => handleNavigateToObservations(), 100);
    return newObsId;
  };

  const tabNavigationProps = {
    currentTab,
    currentTabIndex,
    totalTabs,
    canNavigateNext: canNavigateNext(),
    canNavigatePrevious: canNavigatePrevious(),
    navigateNext,
    navigatePrevious,
    getProgressPercentage,
    isCurrentTabComplete: isTabComplete(currentTab),
    currentTabHasRequiredFields: hasRequiredFields(currentTab),
    onToggleComplete: handleToggleComplete,
    onGenerateCertificate: handleGenerateCertificate,
    canGenerateCertificate: canGenerateCertificate()
  };

  const handleSyncObservationToInspectionItem = (inspectionItemId: string, newOutcome: string) => {
    console.log(`[EICForm] Syncing observation change to inspection item ${inspectionItemId}: ${newOutcome}`);
    
    const items = formData.inspectionItems || [];
    const updatedItems = items.map((item: any) => 
      item.id === inspectionItemId 
        ? { ...item, outcome: newOutcome, inspected: true }
        : item
    );
    
    handleUpdate('inspectionItems', updatedItems);
  };

  const observationsProps = {
    observations,
    reportId: effectiveReportId,
    onAddObservation: handleAddObservation,
    onUpdateObservation: updateObservation,
    onRemoveObservation: removeObservation,
    onAutoCreateObservation: autoCreateObservation,
    onNavigateToObservations: handleNavigateToObservations,
    onSyncToInspectionItem: handleSyncObservationToInspectionItem
  };

  // Calculate completed sections for progress
  const completedSections = new Set<number>();
  if (formData.clientName && formData.installationAddress && formData.phases && formData.earthingArrangement) {
    completedSections.add(0);
  }
  if (formData.inspectionItems?.length > 0) {
    completedSections.add(1);
  }
  if (formData.scheduleOfTests?.length > 0) {
    completedSections.add(2);
  }
  if (formData.designerName && formData.constructorName && formData.inspectorName) {
    completedSections.add(3);
  }

  // If board scan is open, render full-screen scanner overlay
  if (showBoardScan) {
    return (
      <BoardScannerOverlay
        onAnalysisComplete={handleBoardScanComplete}
        onClose={() => setShowBoardScan(false)}
        title="Scan Distribution Board"
      />
    );
  }

  // Loading state for design
  if (designId && isLoadingDesign) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center space-y-4">
          <div className="p-4 rounded-full bg-elec-yellow/10 inline-flex">
            <CircuitBoard className="h-8 w-8 text-elec-yellow animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Loading Design</h3>
            <p className="text-sm text-muted-foreground">Pre-filling circuits from Circuit Designer...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <CertificatePhotoProvider
      certificateNumber={formData.certificateNumber || ''}
      certificateType="eic"
      clientName={formData.clientName || ''}
      installationAddress={formData.installationAddress || formData.clientAddress || ''}
    >
      <>
        <div className="p-2 sm:p-4 space-y-3 sm:space-y-6">
          {/* Design Source Banner */}
          {(formData as any).designSourceId && (
            <Alert className="bg-elec-yellow/10 border-elec-yellow/30">
              <Zap className="h-4 w-4 text-elec-yellow" />
              <AlertDescription className="text-elec-yellow">
                <span className="font-medium">Circuit Designer Integration:</span>{' '}
                {formData.scheduleOfTests?.length || 0} circuits pre-filled with expected test values. Enter actual readings on-site.
              </AlertDescription>
            </Alert>
          )}

          <EICFormHeader
            onBack={onBack}
            isSaving={isSaving}
            hasUnsavedChanges={hasUnsavedChanges}
            onManualSave={handleSaveDraft}
            onStartNew={handleStartNew}
            formData={formData}
            syncState={syncState}
            isOnline={isOnline}
            isAuthenticated={isAuthenticated}
            currentTab={currentTabIndex}
            currentTabLabel={getCurrentTabLabel ? getCurrentTabLabel() : ''}
            progressPercentage={getProgressPercentage()}
            completedSections={completedSections}
            onOpenBoardScan={() => setShowBoardScan(true)}
            onSyncNow={syncNow}
          />

          <div className="px-2 md:px-4">
            <EICFormTabs
              currentTab={currentTab}
              onTabChange={handleTabChange}
              canAccessTab={canAccessTab}
              isTabComplete={isTabComplete}
              formData={formData}
              onUpdate={handleUpdate}
              tabNavigationProps={tabNavigationProps}
              observationsProps={observationsProps}
              onGenerateCertificate={handleGenerateCertificate}
              onSaveDraft={handleSaveDraft}
              canGenerateCertificate={canGenerateCertificate()}
              onSyncOnTabChange={onTabChange}
            />
          </div>
        </div>

        {/* Auto-save dialog removed - use Save Points instead */}

        <StartNewEICRDialog
          isOpen={showStartNewDialog}
          onClose={() => setShowStartNewDialog(false)}
          onConfirm={confirmStartNew}
          onDuplicate={handleDuplicate}
          hasUnsavedChanges={hasUnsavedChanges}
        />
      </>
    </CertificatePhotoProvider>
  );
};

export default EICForm;
