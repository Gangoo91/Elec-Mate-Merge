
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useInspectorProfiles } from '@/hooks/useInspectorProfiles';
import { useCloudSync } from '@/hooks/useCloudSync';
import { useReportId } from '@/hooks/useReportId';
import { useLocation } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { sanitizeTextInput } from '@/utils/inputSanitization';
import OfflineBanner from '@/components/OfflineBanner';
import { CreateCustomerDialog } from '@/components/CreateCustomerDialog';
import { 
  findCustomerByName, 
  createCustomerFromCertificate, 
  linkCustomerToReport 
} from '@/utils/customerHelper';
import { supabase } from '@/integrations/supabase/client';

interface EICRFormContextType {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  currentReportId: string | null;
  effectiveReportId: string;
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
  const [isLoadingReport, setIsLoadingReport] = useState(!!initialReportId);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [showCustomerDialog, setShowCustomerDialog] = useState(false);
  const [pendingReportId, setPendingReportId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const lastSaveErrorToastRef = useRef<number>(0);

  // Capture customer data from navigation state
  const customerIdFromNav = location.state?.customerId;
  const customerDataFromNav = location.state?.customerData;

  // Generate and manage temporary report ID for photo uploads
  const { effectiveReportId } = useReportId({
    reportType: 'eicr',
    currentReportId,
  });

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
    
    // Supply Characteristics
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
    
    // Earthing & Bonding
    earthElectrodeResistance: '',
    mainBondingSize: '',
    mainBondingSizeCustom: '',
    mainBondingLocations: '',
    bondingCompliance: '',
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
    reportAuthorisedByDate: '',
    reportAuthorisedByForOnBehalfOf: '',
    reportAuthorisedByPosition: '',
    reportAuthorisedByAddress: '',
    reportAuthorisedByMembershipNo: '',
    
    // Inspector Details
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

  // Cloud sync integration - primary persistence layer
  const {
    syncState,
    syncToCloud,
    loadFromCloud,
    isOnline,
    isAuthenticated,
    processOfflineQueue,
  } = useCloudSync({
    reportId: currentReportId,
    reportType: 'eicr',
    data: formData,
    enabled: true,
    customerId: customerIdFromNav,
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

  // Track when authentication has been checked
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUserId(session?.user?.id || null);
      if (isAuthenticated !== undefined) {
        setAuthChecked(true);
      }
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id || null);
    });

    return () => subscription.unsubscribe();
  }, [isAuthenticated]);

  // Load report from cloud on initial mount
  useEffect(() => {
    const loadInitialData = async () => {
      if (!initialReportId) {
        setIsLoadingReport(false);
        return;
      }

      // Don't attempt to load until auth state has been checked
      if (!authChecked) {
        return;
      }

      setIsLoadingReport(true);
      
      if (!isAuthenticated) {
        toast({
          title: 'Cannot load report',
          description: 'Please sign in to load reports.',
          variant: 'destructive',
        });
        setIsLoadingReport(false);
        return;
      }
      
      if (!isOnline) {
        toast({
          title: 'Cannot load report',
          description: 'You are offline.',
          variant: 'destructive',
        });
        setIsLoadingReport(false);
        return;
      }

      const cloudData = await loadFromCloud(initialReportId);
      if (cloudData && typeof cloudData === 'object') {
        
        const loadedData = cloudData as any;
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
      } else {
        toast({
          title: 'Report not found',
          description: 'Could not load the requested report from cloud.',
          variant: 'destructive',
        });
      }
      
      setIsLoadingReport(false);
    };

    loadInitialData();
  }, [initialReportId, authChecked, isAuthenticated, isOnline]);

  // Auto-fill inspector details from default profile when starting new report
  useEffect(() => {
    if (isLoadingProfiles || initialReportId) return;
    if (isFormEmpty(formData)) {
      loadDefaultInspectorProfile();
    }
  }, [isLoadingProfiles, initialReportId]);

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
    setFormData(prev => ({ ...prev, [field]: sanitizedValue }));
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
    
    const result = await syncToCloud(true);
    
    if (result.success) {
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
      earthElectrodeResistance: '',
      mainBondingSize: '',
      mainBondingSizeCustom: '',
      mainBondingLocations: '',
      bondingCompliance: '',
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

  const contextValue: EICRFormContextType = {
    formData,
    updateFormData,
    currentReportId,
    effectiveReportId,
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
  };

  return (
    <EICRFormContext.Provider value={contextValue}>
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
    </EICRFormContext.Provider>
  );
};
