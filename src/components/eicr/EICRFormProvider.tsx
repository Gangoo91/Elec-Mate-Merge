
import React, { createContext, useContext, useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useInspectorProfiles } from '@/hooks/useInspectorProfiles';
import { useCloudSync, SyncNowImmediateResult } from '@/hooks/useCloudSync';
import { useReportId } from '@/hooks/useReportId';
import { useLocation } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { sanitizeTextInput } from '@/utils/inputSanitization';
import { draftStorage } from '@/utils/draftStorage';
import {
  validateLoadedData,
  saveToLocalStorageBackup,
  logIntegrityEvent
} from '@/utils/dataIntegrity';
import OfflineBanner from '@/components/OfflineBanner';
import { CreateCustomerDialog } from '@/components/CreateCustomerDialog';
import { CertificatePhotoProvider } from '@/contexts/CertificatePhotoContext';
import { StickyFormSyncBar, type SyncState } from '@/components/ui/SyncStatusIndicator';
import {
  findCustomerByName,
  createCustomerFromCertificate,
  linkCustomerToReport
} from '@/utils/customerHelper';
import { supabase } from '@/integrations/supabase/client';

interface EICRFormContextType {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  getLatestFormData: () => any;  // Returns the absolute latest form data (bypasses closure issues)
  currentReportId: string | null;
  effectiveReportId: string;
  databaseId: string | null;  // The actual database UUID for queries
  setCurrentReportId: (id: string | null) => void;
  showStartNewDialog: boolean;
  setShowStartNewDialog: (value: boolean) => void;
  handleStartNew: () => void;
  confirmStartNew: () => void;
  confirmDuplicate: () => void;
  handleLoadSavePoint: (data: any) => void;
  handleManualSave: () => Promise<void>;
  syncState: any;
  isOnline: boolean;
  isAuthenticated: boolean;
  isLoadingReport: boolean;
  lastSavedTime: Date | null;
  syncNow: (() => void) | undefined;
  syncNowImmediate: (() => Promise<SyncNowImmediateResult>) | undefined;  // For PDF generation - returns saved data
  getSyncIndicatorState: () => SyncState;
}

const EICRFormContext = createContext<EICRFormContextType | undefined>(undefined);

export const useEICRForm = () => {
  const context = useContext(EICRFormContext);
  if (!context) {
    throw new Error('useEICRForm must be used within EICRFormProvider');
  }
  return context;
};

interface EICRFormProviderProps {
  children: React.ReactNode;
  initialReportId?: string | null;
}

export const EICRFormProvider: React.FC<EICRFormProviderProps> = ({
  children,
  initialReportId
}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const location = useLocation();
  const { getDefaultProfile, isLoading: isLoadingProfiles } = useInspectorProfiles();
  const [showStartNewDialog, setShowStartNewDialog] = useState(false);
  const [currentReportId, setCurrentReportId] = useState<string | null>(initialReportId || null);
  const [databaseId, setDatabaseId] = useState<string | null>(null);  // Actual database UUID
  const [isLoadingReport, setIsLoadingReport] = useState(!!initialReportId);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showCustomerDialog, setShowCustomerDialog] = useState(false);
  const [pendingReportId, setPendingReportId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [lastSavedTime, setLastSavedTime] = useState<Date | null>(null);
  const lastSaveErrorToastRef = useRef<number>(0);
  
  // Capture customer data from navigation state
  const customerIdFromNav = location.state?.customerId;
  const customerDataFromNav = location.state?.customerData;

  // Generate and manage temporary report ID for photo uploads
  const { effectiveReportId } = useReportId({
    reportType: 'eicr',
    currentReportId,
  });

  // Ref to always have the latest formData - bypasses React closure issues
  const formDataRef = useRef<any>(null);

  const [formData, setFormData] = useState(() => {
    // If loading specific report, will be set in useEffect
    // Otherwise initialize with certificate number to be generated
    return {
      // Certificate Details
      certificateNumber: '',  // Will be generated asynchronously
    
    // Client Details
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    clientAddress: '',
    sameAsClientAddress: 'false',
    installationAddress: '',
    description: '',
    installationType: '',
    estimatedAge: '',
    ageUnit: 'years',
    evidenceOfAlterations: 'no',
    alterationsDetails: '',
    lastInspectionType: 'unknown',
    dateOfLastInspection: '',
    
    // Purpose & Inspection Details
    purposeOfInspection: '',
    otherPurpose: '',
    inspectionDate: '',
    nextInspectionDate: '',
    inspectionInterval: '',
    extentOfInspection: '',
    limitationsOfInspection: '',
    
    // Supply Characteristics - Default to most common UK domestic values
    dnoName: '',
    mpan: '',
    cutoutLocation: '',
    supplyVoltage: '230',
    supplyVoltageCustom: '',
    supplyFrequency: '50',
    phases: 'single',
    supplyPME: '',
    earthingArrangement: 'tncs',
    earthElectrodeType: '',
    mainProtectiveDevice: '',
    mainProtectiveDeviceCustom: '',
    rcdMainSwitch: '',
    rcdRating: '',
    rcdType: '',
    mainSwitchRating: '',
    breakingCapacity: '',
    serviceEntry: '',
    supplyType: '',

    // Earthing & Bonding
    earthElectrodeResistance: '',
    mainEarthingConductorType: '',
    mainEarthingConductorSize: '',
    mainEarthingConductorSizeCustom: '',
    mainBondingConductorType: '',
    mainBondingSize: '',
    mainBondingSizeCustom: '',
    mainBondingLocations: '',
    bondingCompliance: '',
    supplementaryBonding: '',
    supplementaryBondingSize: '',
    supplementaryBondingSizeCustom: '',
    equipotentialBonding: '',
    
    // Consumer Unit
    cuLocation: '',
    cuManufacturer: '',
    cuType: '',
    
    // Electrical Installation Details
    boardSize: '',
    intakeCableSize: '',
    intakeCableType: '',
    tailsSize: '',
    tailsLength: '',
    circuits: [],
    scheduleOfTests: [],
    distributionBoards: [],

    // Test Instrument Details
    testInstrumentMake: '',
    customTestInstrument: '',
    testInstrumentSerial: '',
    calibrationDate: '',
    testTemperature: '',
    testMethod: '',
    testVoltage: '',
    testNotes: '',

    // Standards Compliance
    designStandard: 'BS7671',
    partPCompliance: '',
    bs7671Compliance: false,
    buildingRegsCompliance: false,
    
    // Overall Assessment
    overallAssessment: '',
    satisfactoryForContinuedUse: '',
    additionalComments: '',
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
    
    // Inspector Details
    inspectorName: '',
    inspectorQualifications: '',
    inspectorSignature: '',
    inspectorDate: new Date().toISOString().split('T')[0],
    companyDetails: '',
    registrationScheme: '',
    registrationNumber: '',
    registrationExpiry: '',
    insuranceProvider: '',
    insurancePolicyNumber: '',
    insuranceCoverage: '',
    insuranceExpiry: '',
    companyName: '',
    companyAddress: '',
    companyPhone: '',
    companyEmail: '',
    companyLogo: '',
    companyWebsite: '',
    companyTagline: '',
    companyAccentColor: '',
    companyRegistrationNumber: '',
    vatNumber: '',
    
    // Inspection Data
    inspectionItems: [],
    defectObservations: [],
    generalObservations: [],
    
    // Metadata
    completedSections: {},
    
    // Legacy support
    observations: [],
    };
  });

  // CRITICAL: Keep the ref always in sync with the latest formData
  // useLayoutEffect runs SYNCHRONOUSLY after DOM updates but before paint/user events
  // This ensures the ref is ALWAYS up-to-date when getLatestFormData() is called
  useLayoutEffect(() => {
    formDataRef.current = formData;
    console.log('[EICRFormProvider] formDataRef updated (sync):', {
      scheduleOfTests: formData.scheduleOfTests?.length || 0,
      inspectionItems: formData.inspectionItems?.length || 0,
      defectObservations: formData.defectObservations?.length || 0,
      clientName: formData.clientName || 'empty'
    });
  }, [formData]);

  // Getter function that returns the absolute latest formData from the ref
  // Use this in async callbacks (like PDF generation) to avoid stale closure data
  const getLatestFormData = useCallback(() => {
    const refData = formDataRef.current;
    const closureData = formData;

    console.log('[getLatestFormData] ===== DATA COMPARISON =====');
    console.log('[getLatestFormData] REF scheduleOfTests:', refData?.scheduleOfTests?.length || 0);
    console.log('[getLatestFormData] CLOSURE scheduleOfTests:', closureData?.scheduleOfTests?.length || 0);
    console.log('[getLatestFormData] REF clientName:', refData?.clientName || 'empty');
    console.log('[getLatestFormData] CLOSURE clientName:', closureData?.clientName || 'empty');
    console.log('[getLatestFormData] Using:', refData ? 'REF' : 'CLOSURE');
    console.log('[getLatestFormData] ============================');

    return refData || closureData;
  }, [formData]);

  // Callback when auto-sync creates a new report - keeps component state in sync
  const handleReportCreated = React.useCallback((newReportId: string) => {
    console.log('[EICR] Auto-sync created report:', newReportId);
    setCurrentReportId(newReportId);
  }, []);

  // Cloud sync integration - primary persistence layer
  const {
    syncState,
    syncToCloud,
    loadFromCloud,
    isOnline,
    isAuthenticated,
    authCheckComplete,
    processOfflineQueue,
    syncNow,
    syncNowImmediate,
    onTabChange,
  } = useCloudSync({
    reportId: currentReportId,
    reportType: 'eicr',
    data: formData,
    enabled: true,
    customerId: customerIdFromNav,
    onReportCreated: handleReportCreated,
  });

  // Helper function to check if form is empty (for auto-filling profile)
  const isFormEmpty = (data: any) => {
    return !data.clientName && !data.inspectorName && !data.circuits?.length;
  };

  // Helper function to load default inspector profile
  const loadDefaultInspectorProfile = () => {
    const defaultProfile = getDefaultProfile();
    if (defaultProfile) {
      setFormData(prev => ({
        ...prev,
        inspectorName: defaultProfile.name,
        inspectorQualifications: defaultProfile.qualifications.join(', '),
        inspectorSignature: defaultProfile.signatureData || '',
        registrationScheme: defaultProfile.registrationScheme || '',
        registrationNumber: defaultProfile.registrationNumber || '',
        registrationExpiry: defaultProfile.registrationExpiry || '',
        insuranceProvider: defaultProfile.insuranceProvider || '',
        insurancePolicyNumber: defaultProfile.insurancePolicyNumber || '',
        insuranceCoverage: defaultProfile.insuranceCoverage || '',
        insuranceExpiry: defaultProfile.insuranceExpiry || '',
        companyName: defaultProfile.companyName || '',
        companyAddress: defaultProfile.companyAddress || '',
        companyPhone: defaultProfile.companyPhone || '',
        companyEmail: defaultProfile.companyEmail || '',
        companyLogo: defaultProfile.companyLogo || '',
        companyWebsite: defaultProfile.companyWebsite || '',
        companyRegistrationNumber: defaultProfile.companyRegistrationNumber || '',
        vatNumber: defaultProfile.vatNumber || '',
      }));
    }
  };

  // Track user ID for customer linking
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUserId(session?.user?.id || null);
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Load report from cloud on initial mount - with localStorage priority
  useEffect(() => {
    const loadInitialData = async () => {
      if (!initialReportId) {
        setIsLoadingReport(false);
        return;
      }

      // Don't attempt to load until auth state has been checked
      if (!authCheckComplete) {
        return;
      }

      console.log('[EICR] Loading report:', initialReportId);
      setIsLoadingReport(true);

      // Step 1: Check localStorage for a draft of this report
      const localDraft = draftStorage.loadDraft('eicr', initialReportId);

      if (!isAuthenticated) {
        // If not authenticated but have local draft, use it
        if (localDraft?.data) {
          console.log('[EICR] Using local draft (not authenticated)');
          const loadedData = localDraft.data;
          setFormData(prev => ({
            ...prev,
            ...loadedData,
            inspectionItems: loadedData.inspectionItems || [],
            circuits: loadedData.circuits || [],
            scheduleOfTests: loadedData.scheduleOfTests || [],
            defectObservations: loadedData.defectObservations || [],
            generalObservations: loadedData.generalObservations || [],
            observations: loadedData.observations || [],
            certificateNumber: loadedData.certificateNumber || prev.certificateNumber,
          }));
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
          console.log('[EICR] Using local draft (offline)');
          const loadedData = localDraft.data;
          setFormData(prev => ({
            ...prev,
            ...loadedData,
            inspectionItems: loadedData.inspectionItems || [],
            circuits: loadedData.circuits || [],
            scheduleOfTests: loadedData.scheduleOfTests || [],
            defectObservations: loadedData.defectObservations || [],
            generalObservations: loadedData.generalObservations || [],
            observations: loadedData.observations || [],
            certificateNumber: loadedData.certificateNumber || prev.certificateNumber,
          }));
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
      const cloudResult = await loadFromCloud(initialReportId);

      // Step 3: Compare timestamps - use whichever is NEWER
      if (cloudResult && cloudResult.data && typeof cloudResult.data === 'object') {
        const loadedCloudData = cloudResult.data as any;
        const cloudTime = new Date(loadedCloudData.updated_at || loadedCloudData.last_synced_at || 0).getTime();
        const localTime = localDraft?.lastModified ? new Date(localDraft.lastModified).getTime() : 0;

        // Store the database UUID for photo queries
        if (cloudResult.databaseId) {
          console.log('[EICR] Stored database UUID:', cloudResult.databaseId);
          setDatabaseId(cloudResult.databaseId);
        }

        console.log('[EICR] Comparing timestamps - Cloud:', cloudTime, 'Local:', localTime);

        // Validate data integrity before using
        const integrity = validateLoadedData(loadedCloudData, 'eicr');

        if (!integrity.hasData) {
          // Data loaded but appears empty - this is suspicious
          logIntegrityEvent('load_empty', {
            reportType: 'eicr',
            reportId: initialReportId,
            fieldCount: integrity.fieldCount,
            error: integrity.warnings.join('; ')
          });

          // Try localStorage backup if cloud data is empty
          if (localDraft?.data) {
            const localIntegrity = validateLoadedData(localDraft.data, 'eicr');
            if (localIntegrity.hasData) {
              console.log('[EICR] Cloud data empty, using local backup');
              const loadedData = localDraft.data;
              setFormData(prev => ({
                ...prev,
                ...loadedData,
                inspectionItems: loadedData.inspectionItems || [],
                circuits: loadedData.circuits || [],
                scheduleOfTests: loadedData.scheduleOfTests || [],
                defectObservations: loadedData.defectObservations || [],
                generalObservations: loadedData.generalObservations || [],
                observations: loadedData.observations || [],
                certificateNumber: loadedData.certificateNumber || prev.certificateNumber,
              }));
              setCurrentReportId(initialReportId);
              toast({
                title: 'Data recovered from local backup',
                description: 'Cloud data appeared empty. Your local version was restored.',
              });
              setIsLoadingReport(false);
              return;
            }
          }
        }

        if (localDraft?.data && localTime > cloudTime) {
          // Local is newer - use local data
          console.log('[EICR] Using LOCAL draft (newer than cloud by', Math.round((localTime - cloudTime) / 1000), 'seconds)');
          const loadedData = localDraft.data;
          setFormData(prev => ({
            ...prev,
            ...loadedData,
            inspectionItems: loadedData.inspectionItems || [],
            circuits: loadedData.circuits || [],
            scheduleOfTests: loadedData.scheduleOfTests || [],
            defectObservations: loadedData.defectObservations || [],
            generalObservations: loadedData.generalObservations || [],
            observations: loadedData.observations || [],
            certificateNumber: loadedData.certificateNumber || prev.certificateNumber,
          }));
          logIntegrityEvent('load_success', {
            reportType: 'eicr',
            reportId: initialReportId,
            fieldCount: Object.keys(loadedData).length,
            source: 'local'
          });
          toast({
            title: 'Recovered unsaved changes',
            description: 'Your recent edits have been restored.',
          });
        } else {
          // Cloud is newer or same - use cloud data
          console.log('[EICR] Using CLOUD data');
          setFormData(prev => ({
            ...prev,
            ...loadedCloudData,
            inspectionItems: loadedCloudData.inspectionItems || [],
            circuits: loadedCloudData.circuits || [],
            scheduleOfTests: loadedCloudData.scheduleOfTests || [],
            defectObservations: loadedCloudData.defectObservations || [],
            generalObservations: loadedCloudData.generalObservations || [],
            observations: loadedCloudData.observations || [],
            certificateNumber: loadedCloudData.certificateNumber || prev.certificateNumber,
          }));
          logIntegrityEvent('load_success', {
            reportType: 'eicr',
            reportId: initialReportId,
            fieldCount: integrity.fieldCount,
            source: 'cloud'
          });
        }
        setCurrentReportId(initialReportId);
      } else if (localDraft?.data) {
        // Cloud failed but we have local - use local
        console.log('[EICR] Cloud load failed, using local draft');
        const loadedData = localDraft.data;
        setFormData(prev => ({
          ...prev,
          ...loadedData,
          inspectionItems: loadedData.inspectionItems || [],
          circuits: loadedData.circuits || [],
          scheduleOfTests: loadedData.scheduleOfTests || [],
          defectObservations: loadedData.defectObservations || [],
          generalObservations: loadedData.generalObservations || [],
          observations: loadedData.observations || [],
          certificateNumber: loadedData.certificateNumber || prev.certificateNumber,
        }));
        setCurrentReportId(initialReportId);
        logIntegrityEvent('recovery_success', {
          reportType: 'eicr',
          reportId: initialReportId,
          source: 'local'
        });
        toast({
          title: 'Loaded from local storage',
          description: 'Cloud sync will retry automatically.',
        });
      } else {
        logIntegrityEvent('recovery_failed', {
          reportType: 'eicr',
          reportId: initialReportId,
          error: 'No data found in cloud or local'
        });
        toast({
          title: 'Report not found',
          description: 'Could not load the requested report.',
          variant: 'destructive',
        });
      }

      setIsLoadingReport(false);
    };

    loadInitialData();
  }, [initialReportId, authCheckComplete, isAuthenticated, isOnline]);

  // Auto-fill inspector details from default profile when starting new report
  useEffect(() => {
    if (isLoadingProfiles || initialReportId) return;
    if (isFormEmpty(formData)) {
      loadDefaultInspectorProfile();
    }
  }, [isLoadingProfiles, initialReportId]);

  // Auto-recover drafts for NEW reports (no reportId)
  // This ensures work isn't lost if the user navigates away and comes back
  const draftRecoveryAttempted = useRef(false);
  useEffect(() => {
    // Only for NEW reports, after initial load completes
    if (initialReportId || isLoadingReport || draftRecoveryAttempted.current) return;
    draftRecoveryAttempted.current = true;

    const draft = draftStorage.loadDraft('eicr', null);
    if (draft?.data && !formData.clientName) {
      // Auto-recover if form is empty and draft has meaningful data
      if (draft.data.clientName || draft.data.installationAddress ||
          (draft.data.circuits && draft.data.circuits.length > 0) ||
          (draft.data.scheduleOfTests && draft.data.scheduleOfTests.length > 0)) {
        console.log('[EICR] Auto-recovering draft for new report');
        setFormData(prev => ({
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
  }, [initialReportId, isLoadingReport]);

  // Pre-fill customer details if navigating from customer page
  useEffect(() => {
    if (customerDataFromNav && !initialReportId) {
      setFormData(prev => ({
        ...prev,
        clientName: customerDataFromNav.name || '',
        clientPhone: customerDataFromNav.phone || '',
        clientEmail: customerDataFromNav.email || '',
        clientAddress: customerDataFromNav.address || '',
        installationAddress: customerDataFromNav.address || '',
      }));
    }
  }, [customerDataFromNav, initialReportId]);

  // Generate certificate number on mount if needed - Prevent regeneration
  const certNumberGenerated = React.useRef(false);
  useEffect(() => {
    const initCertificateNumber = async () => {
      if (!formData.certificateNumber && !currentReportId && !initialReportId && !certNumberGenerated.current) {
        certNumberGenerated.current = true;
        const { generateCertificateNumber } = await import('@/utils/certificateNumbering');
        const certNumber = await generateCertificateNumber('eicr');
        setFormData(prev => ({ ...prev, certificateNumber: certNumber }));
      }
    };
    initCertificateNumber();
  }, []);

  const updateFormData = (field: string, value: any) => {
    if (field === 'certificateNumber') {
      console.warn('Certificate number cannot be modified');
      return;
    }

    // Sanitize string inputs to prevent XSS
    const sanitizedValue = typeof value === 'string' ? sanitizeTextInput(value) : value;

    // DEBUG: Log every form data update
    console.log('[updateFormData] Updating field:', field,
      Array.isArray(sanitizedValue) ? `(${sanitizedValue.length} items)` :
      typeof sanitizedValue === 'object' ? '(object)' : sanitizedValue);

    setFormData(prev => {
      const newData = { ...prev, [field]: sanitizedValue };
      console.log('[updateFormData] New state will have:', {
        scheduleOfTests: newData.scheduleOfTests?.length || 0,
        inspectionItems: newData.inspectionItems?.length || 0,
        defectObservations: newData.defectObservations?.length || 0
      });
      return newData;
    });
    setHasUnsavedChanges(true);
  };

  const handleManualSave = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save your report.",
        variant: "destructive",
      });
      return;
    }

    // Mark as completed if inspector has signed off
    const updatedData = {
      ...formData,
      status: formData.satisfactoryForContinuedUse && formData.inspectorSignature ? 'completed' :
              (formData.clientName || formData.inspectionDate) ? 'in-progress' : 'draft'
    };

    setFormData(updatedData);

    // CRITICAL: Always save to localStorage backup BEFORE cloud sync
    // This ensures data is never lost even if cloud fails
    const reportIdForBackup = currentReportId || effectiveReportId;
    if (reportIdForBackup && updatedData.clientName) {
      saveToLocalStorageBackup('eicr', reportIdForBackup, updatedData);
      logIntegrityEvent('backup_saved', {
        reportType: 'eicr',
        reportId: reportIdForBackup,
        fieldCount: Object.keys(updatedData).filter(k => !k.startsWith('_')).length
      });
    }

    const result = await syncToCloud(true);
    
    if (result.success) {
      setLastSavedTime(new Date());

      if (result.reportId) {
        setCurrentReportId(result.reportId);

        // Link to customer if navigated from customer page
        if (customerIdFromNav && result.reportId) {
          await linkCustomerToReport(result.reportId, customerIdFromNav);
        }

        // Check if we should prompt to create customer
        if (userId && formData.clientName && !customerIdFromNav) {
          const existingCustomer = await findCustomerByName(userId, formData.clientName);
          if (!existingCustomer) {
            setPendingReportId(result.reportId);
            setShowCustomerDialog(true);
          }
        }
      }
      setHasUnsavedChanges(false);
      
      // Invalidate queries to refresh dashboard
      queryClient.invalidateQueries({ queryKey: ['recent-certificates'] });
      queryClient.invalidateQueries({ queryKey: ['my-reports'] });
      queryClient.invalidateQueries({ queryKey: ['expiry-reminders'] });
      
      toast({
        title: "Saved",
        description: "Your EICR report has been saved to the cloud.",
      });
    } else if (!isOnline) {
      toast({
        title: "Queued for sync",
        description: "You're offline. Changes will sync when you reconnect.",
      });
    } else {
      // Debounce error toasts - only show once per 30 seconds
      const now = Date.now();
      if (now - lastSaveErrorToastRef.current > 30000) {
        lastSaveErrorToastRef.current = now;
        toast({
          title: "Save failed",
          description: "Failed to save the report. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleCreateCustomer = async (customerData: {
    name: string;
    email?: string;
    phone?: string;
    address?: string;
    notes?: string;
  }) => {
    if (!userId || !pendingReportId) return;

    const result = await createCustomerFromCertificate(userId, customerData);
    if (result.error) {
      toast({
        title: "Failed to create customer",
        description: "Could not save customer details.",
        variant: "destructive",
      });
      return;
    }

    // Link customer to report
    await linkCustomerToReport(pendingReportId, result.id);
    
    // Invalidate customer queries
    queryClient.invalidateQueries({ queryKey: ['customers'] });
    
    toast({
      title: "Customer created",
      description: `${customerData.name} has been added to your customers.`,
    });
    
    setPendingReportId(null);
  };

  const handleStartNew = () => {
    if (hasUnsavedChanges) {
      setShowStartNewDialog(true);
    } else {
      confirmStartNew();
    }
  };

  const confirmStartNew = async () => {
    const { generateCertificateNumber } = await import('@/utils/certificateNumbering');
    const certificateNumber = await generateCertificateNumber('eicr');
    const newFormData = {
      certificateNumber,
      clientName: '',
      clientPhone: '',
      clientEmail: '',
      clientAddress: '',
      sameAsClientAddress: 'false',
      installationAddress: '',
      description: '',
      installationType: '',
      estimatedAge: '',
      ageUnit: 'years',
      evidenceOfAlterations: 'no',
      alterationsDetails: '',
      lastInspectionType: 'unknown',
      dateOfLastInspection: '',
      purposeOfInspection: '',
      otherPurpose: '',
      inspectionDate: '',
      nextInspectionDate: '',
      inspectionInterval: '',
      extentOfInspection: '',
      limitationsOfInspection: '',
      dnoName: '',
      mpan: '',
      cutoutLocation: '',
      supplyVoltage: '',
      supplyVoltageCustom: '',
      supplyFrequency: '50',
      phases: '',
      supplyPME: '',
      earthingArrangement: '',
      earthElectrodeType: '',
      mainProtectiveDevice: '',
      mainProtectiveDeviceCustom: '',
      rcdMainSwitch: '',
      rcdRating: '',
      rcdType: '',
      mainSwitchRating: '',
      breakingCapacity: '',
      serviceEntry: '',
      supplyType: '',
      earthElectrodeResistance: '',
      mainEarthingConductorType: '',
      mainEarthingConductorSize: '',
      mainEarthingConductorSizeCustom: '',
      mainBondingConductorType: '',
      mainBondingSize: '',
      mainBondingSizeCustom: '',
      mainBondingLocations: '',
      bondingCompliance: '',
      supplementaryBonding: '',
      supplementaryBondingSize: '',
      supplementaryBondingSizeCustom: '',
      equipotentialBonding: '',
      cuLocation: '',
      cuManufacturer: '',
      cuType: '',
      boardSize: '',
      intakeCableSize: '',
      intakeCableType: '',
      tailsSize: '',
      tailsLength: '',
      circuits: [],
      scheduleOfTests: [],
      distributionBoards: [],
      testInstrumentMake: '',
      customTestInstrument: '',
      testInstrumentSerial: '',
      calibrationDate: '',
      testTemperature: '',
      testMethod: '',
      testVoltage: '',
      testNotes: '',
      designStandard: 'BS7671',
      partPCompliance: '',
      bs7671Compliance: false,
      buildingRegsCompliance: false,
      overallAssessment: '',
      satisfactoryForContinuedUse: '',
      additionalComments: '',
      inspectedBySignature: '',
      reportAuthorisedBySignature: '',
      inspectedByName: '',
      inspectedByForOnBehalfOf: '',
      inspectedByPosition: '',
      inspectedByAddress: '',
      inspectedByCpScheme: '',
      inspectedByCpSchemeNA: false,
      reportAuthorisedByName: '',
      reportAuthorisedByDate: '',
      reportAuthorisedByForOnBehalfOf: '',
      reportAuthorisedByPosition: '',
      reportAuthorisedByAddress: '',
      reportAuthorisedByMembershipNo: '',
      inspectorName: '',
      inspectorQualifications: '',
      inspectorSignature: '',
      inspectorDate: '',
      companyDetails: '',
      registrationScheme: '',
      registrationNumber: '',
      registrationExpiry: '',
      insuranceProvider: '',
      insurancePolicyNumber: '',
      insuranceCoverage: '',
      insuranceExpiry: '',
      companyName: '',
      companyAddress: '',
      companyPhone: '',
      companyEmail: '',
      companyLogo: '',
      companyWebsite: '',
      companyTagline: '',
      companyAccentColor: '',
      companyRegistrationNumber: '',
      vatNumber: '',
      inspectionItems: [],
      defectObservations: [],
      generalObservations: [],
      completedSections: {},
      observations: [],
    };
    
    setFormData(newFormData);
    setCurrentReportId(null);
    setShowStartNewDialog(false);
    setHasUnsavedChanges(false);
    
    setTimeout(() => loadDefaultInspectorProfile(), 0);
    
    toast({
      title: "New EICR started",
      description: "Started a new EICR report.",
    });
  };

  const confirmDuplicate = async () => {
    const { generateCertificateNumber } = await import('@/utils/certificateNumbering');
    const certificateNumber = await generateCertificateNumber('eicr');
    
    // Deep clone current form data with polyfill (preserves Date objects)
    const duplicatedData: any = (typeof structuredClone === 'function' 
      ? structuredClone(formData)
      : JSON.parse(JSON.stringify(formData)));
    
    // Reset metadata fields
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
    setHasUnsavedChanges(true);
    
    toast({
      title: "Report duplicated",
      description: `New certificate number: ${certificateNumber}`,
    });
  };

  const handleLoadSavePoint = async (data: any) => {
    let certificateNumber = data.certificateNumber;
    if (!certificateNumber) {
      const { generateCertificateNumber } = await import('@/utils/certificateNumbering');
      certificateNumber = await generateCertificateNumber('eicr');
    }
    setFormData({ ...data, certificateNumber });
    setHasUnsavedChanges(false);
  };

  // Convert sync status to SyncState for the indicator
  const getSyncIndicatorState = (): SyncState => {
    if (!isOnline) return 'offline';
    if (syncState.status === 'error') return 'error';
    if (syncState.status === 'syncing') return 'syncing';
    if (syncState.status === 'synced') return 'synced';
    if (hasUnsavedChanges) return 'unsaved';
    return 'synced';
  };

  const contextValue: EICRFormContextType = {
    formData,
    updateFormData,
    getLatestFormData,
    currentReportId,
    effectiveReportId,
    databaseId,
    setCurrentReportId,
    showStartNewDialog,
    setShowStartNewDialog,
    handleStartNew,
    confirmStartNew,
    confirmDuplicate,
    handleLoadSavePoint,
    handleManualSave,
    syncState,
    isOnline,
    isAuthenticated,
    isLoadingReport,
    lastSavedTime,
    syncNow,
    syncNowImmediate,
    getSyncIndicatorState,
  };

  return (
    <EICRFormContext.Provider value={contextValue}>
      <CertificatePhotoProvider
        certificateNumber={formData.certificateNumber || ''}
        certificateType="eicr"
        clientName={formData.clientName || ''}
        installationAddress={formData.installationAddress || formData.clientAddress || ''}
      >
        {/* Prominent sync status bar - always visible */}
        <StickyFormSyncBar
          state={getSyncIndicatorState()}
          lastSaved={lastSavedTime}
          isOnline={isOnline}
          onRetry={syncNow}
          certificateNumber={formData.certificateNumber}
        />
        {syncState.queuedChanges > 0 && (
          <OfflineBanner
            queuedChanges={syncState.queuedChanges}
            isOnline={isOnline}
            onRetry={processOfflineQueue}
          />
        )}
        {children}
        <CreateCustomerDialog
          open={showCustomerDialog}
          onOpenChange={setShowCustomerDialog}
          onConfirm={handleCreateCustomer}
          prefillData={{
            name: formData.clientName || '',
            email: formData.clientEmail || '',
            phone: formData.clientPhone || '',
            address: formData.installationAddress || formData.clientAddress || '',
          }}
        />
      </CertificatePhotoProvider>
    </EICRFormContext.Provider>
  );
};
