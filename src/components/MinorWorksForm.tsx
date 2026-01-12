import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import StartNewEICRDialog from '@/components/StartNewEICRDialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { sanitizeTextInput } from '@/utils/inputSanitization';
import MinorWorksPdfGenerator from '@/components/pdf/MinorWorksPdfGenerator';
import { useEICAutoSave } from '@/hooks/useEICAutoSave';
import { useCloudSync } from '@/hooks/useCloudSync';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { useSmartDefaults } from '@/hooks/useSmartDefaults';
import { useFormValidation } from '@/hooks/useFormValidation';
import { useMinorWorksTabs } from '@/hooks/useMinorWorksTabs';

// New tab-based components
import MWFormHeader from '@/components/minor-works/MWFormHeader';
import MWStepIndicator from '@/components/minor-works/MWStepIndicator';
import MWTabNavigation from '@/components/minor-works/MWTabNavigation';
import MWDetailsTab from '@/components/minor-works/MWDetailsTab';
import MWCircuitTab from '@/components/minor-works/MWCircuitTab';
import MWTestingTab from '@/components/minor-works/MWTestingTab';
import MWDeclarationTab from '@/components/minor-works/MWDeclarationTab';

interface ZsLimits {
  [key: string]: { [rating: string]: number };
}

// BS 7671 Table 41.3 - MCBs to BS EN 60898 and RCBOs to BS EN 61009 (0.4s disconnection)
const ZS_LIMITS: ZsLimits = {
  'mcb-b': { '6': 7.28, '10': 4.37, '16': 2.73, '20': 2.19, '25': 1.75, '32': 1.37, '40': 1.09, '50': 0.87, '63': 0.69, '80': 0.55, '100': 0.44 },
  'mcb-c': { '6': 3.64, '10': 2.19, '16': 1.37, '20': 1.09, '25': 0.87, '32': 0.68, '40': 0.55, '50': 0.44, '63': 0.35, '80': 0.27, '100': 0.22 },
  'mcb-d': { '6': 1.82, '10': 1.09, '16': 0.68, '20': 0.55, '25': 0.44, '32': 0.34, '40': 0.27, '50': 0.22, '63': 0.17, '80': 0.14, '100': 0.11 },
  'rcbo': { '6': 7.28, '10': 4.37, '16': 2.73, '20': 2.19, '25': 1.75, '32': 1.37, '40': 1.09, '50': 0.87, '63': 0.69, '80': 0.55, '100': 0.44 }
};

const MinorWorksForm = ({ onBack, initialReportId }: { onBack: () => void; initialReportId?: string | null }) => {
  const location = useLocation();
  const [userId, setUserId] = useState<string | null>(null);
  const [currentReportId, setCurrentReportId] = useState<string | null>(initialReportId || null);
  const [authChecked, setAuthChecked] = useState(false);

  // Capture customer data from navigation state
  const customerIdFromNav = location.state?.customerId;
  const customerDataFromNav = location.state?.customerData;

  const [formData, setFormData] = useState<any>({
    // Certificate Header
    certificateNumber: '',

    // Client & Installation Details
    propertyAddress: '',
    postcode: '',
    clientName: '',
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

    // Supply & Earthing Details
    supplyVoltage: '230V',
    frequency: '50Hz',
    supplyPhases: '1',
    earthingArrangement: '',
    mainEarthingConductorSize: '',
    mainEarthingConductorSizeCustom: '',
    mainBondingConductorSize: '',
    mainBondingConductorSizeCustom: '',

    // Bonding Connections
    bondingWater: false,
    bondingGas: false,
    bondingOil: false,
    bondingStructural: false,
    bondingOther: false,

    // Circuit Details
    distributionBoard: '',
    circuitDesignation: '',
    circuitDescription: '',
    protectiveDeviceType: '',
    protectiveDeviceRating: '',
    protectiveDeviceKaRating: '',

    // Protection checkboxes
    protectionRcd: false,
    protectionRcbo: false,
    protectionAfdd: false,
    protectionSpd: false,
    liveConductorSize: '',
    cpcSize: '',
    cableType: '',
    installationMethod: '',
    referenceMethod: '',

    // Test Results
    continuityR1R2: '',
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
    rcdTestButton: '',
    rcboTripTime: '',

    // AFDD Testing
    afddTestButton: '',
    afddTripTime: '',

    // SPD Testing
    spdIndicatorStatus: '',
    spdTestButton: '',
    spdVisualInspection: '',

    // Ring Circuit Continuity Tests
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
    position: '',
    qualificationLevel: '',
    schemeProvider: '',
    registrationNumber: '',
    signatureDate: '',
    signature: '',
    bs7671Compliance: false,
    testResultsAccurate: false,
    workSafety: false,
    partPNotification: false,
    additionalNotes: ''
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
    canNavigateNext,
    canNavigatePrevious,
    navigateNext,
    navigatePrevious,
    getProgressPercentage,
    isTabComplete,
    getCurrentTabLabel
  } = useMinorWorksTabs(formData);

  // Smart defaults and validation
  const { defaults, hasDefaults, applyDefaults, saveDefaults } = useSmartDefaults(userId || undefined);
  const validation = useFormValidation(formData);

  // Cloud sync
  const { loadFromCloud, isAuthenticated, isOnline, syncToCloud, syncState } = useCloudSync({
    reportId: currentReportId,
    reportType: 'minor-works',
    data: formData,
    enabled: true,
    customerId: customerIdFromNav,
  });

  // Auto-save hook
  const {
    isSaving,
    lastSaveTime,
    hasUnsavedChanges,
    manualSave: autoSaveManualSave,
    loadFromLocalStorage: loadFromIndexedDB,
    clearAutoSave
  } = useEICAutoSave({
    formData,
    interval: 30,
    reportType: 'minor-works',
    onSave: async (data) => {
      await syncToCloud(false);
    },
    enabled: true
  });

  // Pre-fill customer details if navigating from customer page
  useEffect(() => {
    if (customerDataFromNav && !initialReportId) {
      setFormData((prev: any) => ({
        ...prev,
        clientName: customerDataFromNav.name || '',
        propertyAddress: customerDataFromNav.address || '',
      }));
    }
  }, [customerDataFromNav, initialReportId]);

  // Fetch user ID on mount
  useEffect(() => {
    const fetchUserId = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUserId(user.id);
    };
    fetchUserId();
  }, []);

  // Auto-fill Max Permitted Zs based on protective device
  useEffect(() => {
    if (formData.protectiveDeviceType && formData.protectiveDeviceRating) {
      const deviceType = formData.protectiveDeviceType.toLowerCase();
      const rating = formData.protectiveDeviceRating;

      let zsKey = null;
      if (deviceType.includes('mcb') && deviceType.includes('type b')) {
        zsKey = 'mcb-b';
      } else if (deviceType.includes('mcb') && deviceType.includes('type c')) {
        zsKey = 'mcb-c';
      } else if (deviceType.includes('rcbo')) {
        zsKey = 'rcbo';
      }

      if (zsKey && ZS_LIMITS[zsKey]?.[rating]) {
        handleUpdate('maxPermittedZs', ZS_LIMITS[zsKey][rating].toString());
      }
    }
  }, [formData.protectiveDeviceType, formData.protectiveDeviceRating]);

  // Auto-set Phase Rotation based on supply phases
  useEffect(() => {
    if (formData.supplyPhases === '1') {
      handleUpdate('phaseRotation', 'na');
    } else if (formData.supplyPhases === '3' && formData.phaseRotation === 'na') {
      handleUpdate('phaseRotation', '');
    }
  }, [formData.supplyPhases]);

  // Track when authentication has been checked
  useEffect(() => {
    if (isAuthenticated !== undefined) {
      setAuthChecked(true);
    }
  }, [isAuthenticated]);

  // Load from cloud if initialReportId is provided
  useEffect(() => {
    if (initialReportId && authChecked) {
      if (!isAuthenticated) {
        toast({
          title: 'Cannot load report',
          description: 'Please sign in to load reports.',
          variant: 'destructive',
        });
        return;
      }

      if (!isOnline) {
        toast({
          title: 'Cannot load report',
          description: 'You are offline.',
          variant: 'destructive',
        });
        return;
      }

      loadFromCloud(initialReportId).then(cloudData => {
        if (cloudData) {
          console.log('Loaded Minor Works from cloud:', cloudData);
          setFormData(cloudData);
        } else {
          toast({
            title: 'Report not found',
            description: 'Could not load the requested report.',
            variant: 'destructive',
          });
        }
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

  // Generate certificate number on mount if needed
  const certNumberGenerated = React.useRef(false);
  useEffect(() => {
    const initCertificateNumber = async () => {
      if (!formData.certificateNumber && !currentReportId && !certNumberGenerated.current) {
        certNumberGenerated.current = true;
        const { generateCertificateNumber } = await import('@/utils/certificateNumbering');
        const certNumber = await generateCertificateNumber('minor-works');
        setFormData((prev: any) => ({ ...prev, certificateNumber: certNumber }));
      }
    };
    initCertificateNumber();
  }, []);

  const handleUpdate = (field: string, value: any) => {
    const sanitizedValue = typeof value === 'string' ? sanitizeTextInput(value) : value;
    setFormData((prev: any) => ({ ...prev, [field]: sanitizedValue }));
  };

  const handleSaveDraft = async () => {
    await autoSaveManualSave();
    const result = await syncToCloud(true);
    if (result && typeof result === 'object' && 'reportId' in result && result.reportId) {
      setCurrentReportId(result.reportId as string);

      if (customerIdFromNav && result.reportId) {
        const { linkCustomerToReport } = await import('@/utils/customerHelper');
        await linkCustomerToReport(result.reportId as string, customerIdFromNav);
      }

      toast({
        title: "Draft Saved",
        description: "Your Minor Works Certificate draft has been saved.",
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
      supplyVoltage: '230V',
      frequency: '50Hz',
      supplyPhases: '1',
      earthingArrangement: '',
      mainEarthingConductorSize: '',
      mainEarthingConductorSizeCustom: '',
      mainBondingConductorSize: '',
      mainBondingConductorSizeCustom: '',
      bondingWater: false,
      bondingGas: false,
      bondingOil: false,
      bondingStructural: false,
      bondingOther: false,
      distributionBoard: '',
      circuitDesignation: '',
      circuitDescription: '',
      protectiveDeviceType: '',
      protectiveDeviceRating: '',
      protectiveDeviceKaRating: '',
      protectionRcd: false,
      protectionRcbo: false,
      protectionAfdd: false,
      protectionSpd: false,
      liveConductorSize: '',
      cpcSize: '',
      cableType: '',
      installationMethod: '',
      referenceMethod: '',
      continuityR1R2: '',
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
      rcdTestButton: '',
      rcboTripTime: '',
      afddTestButton: '',
      afddTripTime: '',
      spdIndicatorStatus: '',
      spdTestButton: '',
      spdVisualInspection: '',
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
      position: '',
      qualificationLevel: '',
      schemeProvider: '',
      registrationNumber: '',
      signatureDate: '',
      signature: '',
      bs7671Compliance: false,
      testResultsAccurate: false,
      workSafety: false,
      partPNotification: false,
      additionalNotes: ''
    });
    setCurrentReportId(null);
    setShowStartNewDialog(false);
    toast({
      title: "New Minor Works Certificate started",
      description: "Started a new Minor Works Certificate.",
    });
  };

  const handleDuplicate = async () => {
    const { generateCertificateNumber } = await import('@/utils/certificateNumbering');
    const certificateNumber = await generateCertificateNumber('minor-works');

    const duplicatedData: any = (typeof structuredClone === 'function'
      ? structuredClone(formData)
      : JSON.parse(JSON.stringify(formData)));

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
      title: "Report duplicated",
      description: `New certificate number: ${certificateNumber}`,
    });
  };

  const isFormValid = () => {
    const required = [
      'propertyAddress', 'clientName', 'workDate', 'workDescription',
      'earthingArrangement', 'circuitDesignation', 'protectiveDeviceType',
      'protectiveDeviceRating', 'polarity', 'electricianName', 'position',
      'signatureDate', 'bs7671Compliance', 'testResultsAccurate', 'workSafety'
    ];

    return required.every(field => {
      if (typeof formData[field] === 'boolean') {
        return formData[field] === true;
      }
      return formData[field]?.toString().trim();
    });
  };

  const canGenerateCertificate = () => {
    return isFormValid();
  };

  // Determine if current tab has required fields for "Mark as Complete" functionality
  const currentTabHasRequiredFields = () => {
    const requiredFieldsByTab: Record<string, string[]> = {
      details: ['clientName', 'propertyAddress', 'workDate', 'workDescription', 'earthingArrangement'],
      circuit: ['circuitDesignation', 'protectiveDeviceType', 'protectiveDeviceRating', 'liveConductorSize'],
      testing: ['continuityR1R2', 'polarity', 'earthFaultLoopImpedance'],
      declaration: ['electricianName', 'position', 'signatureDate', 'signature']
    };
    return requiredFieldsByTab[currentTab]?.length > 0;
  };

  // Handle PDF generation success
  const handlePdfSuccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication Error",
          description: "Unable to verify user. Please log in again.",
          variant: "destructive",
        });
        return;
      }

      const reportIdToUpdate = currentReportId || formData.certificateNumber;

      const completedData = {
        ...formData,
        certificateGenerated: true,
        certificateGeneratedAt: new Date().toISOString(),
        status: 'completed'
      };

      const { error: updateError } = await supabase
        .from('reports')
        .update({
          status: 'completed',
          data: completedData,
          updated_at: new Date().toISOString(),
          last_synced_at: new Date().toISOString()
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
        title: "Certificate Completed",
        description: "Your Minor Works certificate has been marked as completed.",
      });
    } catch (error) {
      console.error('Failed to mark as completed:', error);
      toast({
        title: "Status Update Failed",
        description: "Certificate generated but status may not have updated.",
        variant: "destructive",
      });
    }
  };

  // Render current tab content
  const renderTabContent = () => {
    const tabAnimation = {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -10 },
      transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }
    };

    switch (currentTab) {
      case 'details':
        return (
          <motion.div key="details" {...tabAnimation}>
            <MWDetailsTab formData={formData} onUpdate={handleUpdate} />
          </motion.div>
        );
      case 'circuit':
        return (
          <motion.div key="circuit" {...tabAnimation}>
            <MWCircuitTab formData={formData} onUpdate={handleUpdate} />
          </motion.div>
        );
      case 'testing':
        return (
          <motion.div key="testing" {...tabAnimation}>
            <MWTestingTab formData={formData} onUpdate={handleUpdate} />
          </motion.div>
        );
      case 'declaration':
        return (
          <motion.div key="declaration" {...tabAnimation}>
            <MWDeclarationTab formData={formData} onUpdate={handleUpdate} />

            {/* PDF Generation in Declaration tab */}
            <div className="mt-6 space-y-4">
              <div className="eicr-section-card p-4 sm:p-6">
                <MinorWorksPdfGenerator
                  formData={formData}
                  isFormValid={canGenerateCertificate()}
                  reportId={currentReportId || formData.certificateNumber}
                  userId={userId || undefined}
                  onSuccess={handlePdfSuccess}
                />

                {!isFormValid() && (
                  <Alert className="mt-4 border-orange-500/30 bg-orange-500/10">
                    <AlertTriangle className="h-4 w-4 text-orange-400" />
                    <AlertDescription className="text-orange-300">
                      Please complete all required fields (*) before generating the certificate.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background prevent-shortcuts">
      {/* Header */}
      <MWFormHeader
        onBack={onBack}
        isSaving={isSaving}
        hasUnsavedChanges={hasUnsavedChanges}
        onManualSave={handleSaveDraft}
        onStartNew={handleStartNew}
        formData={formData}
        syncState={syncState}
        isOnline={isOnline}
        isAuthenticated={isAuthenticated}
        currentTabLabel={getCurrentTabLabel()}
        progressPercentage={getProgressPercentage()}
      />

      {/* Main Content */}
      <div className="lg:pt-0 pt-0">
        <div className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          {/* Step Indicator */}
          <MWStepIndicator
            currentTab={currentTab}
            onTabChange={setTab}
            isTabComplete={isTabComplete}
          />

          {/* Tab Content */}
          <div className="mt-6 pb-32">
            <AnimatePresence mode="wait">
              {renderTabContent()}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <MWTabNavigation
        currentTab={currentTab}
        currentTabIndex={currentTabIndex}
        totalTabs={totalTabs}
        canNavigateNext={canNavigateNext}
        canNavigatePrevious={canNavigatePrevious}
        navigateNext={navigateNext}
        navigatePrevious={navigatePrevious}
        getProgressPercentage={getProgressPercentage}
        isCurrentTabComplete={isTabComplete(currentTab)}
        currentTabHasRequiredFields={currentTabHasRequiredFields()}
        onToggleComplete={() => {}}
        onGenerateCertificate={() => {}}
        canGenerateCertificate={canGenerateCertificate()}
        showGenerate={currentTab === 'declaration'}
      />

      <StartNewEICRDialog
        isOpen={showStartNewDialog}
        onClose={() => setShowStartNewDialog(false)}
        onConfirm={confirmStartNew}
        onDuplicate={handleDuplicate}
        hasUnsavedChanges={hasUnsavedChanges}
      />
    </div>
  );
};

export default MinorWorksForm;
