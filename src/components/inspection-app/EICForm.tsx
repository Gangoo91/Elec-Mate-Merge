import React, { useState, useEffect } from 'react';
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
import { checkAllResultsCompliance } from '@/utils/autoRegChecker';
import EICFormHeader from './eic/EICFormHeader';
import EICFormTabs from './eic/EICFormTabs';
import StartNewEICRDialog from './StartNewEICRDialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Save, Upload, AlertTriangle, Bell } from 'lucide-react';

const EICForm = ({ onBack, initialReportId }: { onBack: () => void; initialReportId?: string | null }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  
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
    
    // Supply & Earthing
    supplyVoltage: '',
    supplyFrequency: '50',
    phases: '',
    earthingArrangement: '',
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
    reportAuthorisedByDate: '',
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
  const [authChecked, setAuthChecked] = useState(false);
  const [showStartNewDialog, setShowStartNewDialog] = useState(false);

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
  useEffect(() => {
    const loadData = async () => {
      const savedData = await loadFromLocalStorage();
      if (savedData?.formData) {
        // Preserve certificate number if it exists, otherwise keep the generated one
        const certificateNumber = savedData.formData.certificateNumber || formData.certificateNumber;
        setFormData({ ...savedData.formData, certificateNumber });
      }
    };
    loadData();
  }, []); // Empty dependency array - only run once on mount

  // Generate certificate number on mount if needed - Prevent regeneration
  const certNumberGenerated = React.useRef(false);
  useEffect(() => {
    const initCertificateNumber = async () => {
      if (!formData.certificateNumber && !currentReportId && !certNumberGenerated.current) {
        certNumberGenerated.current = true;
        const { generateCertificateNumber } = await import('@/utils/certificateNumbering');
        const certNumber = await generateCertificateNumber('eic');
        setFormData(prev => ({ ...prev, certificateNumber: certNumber }));
      }
    };
    initCertificateNumber();
  }, []);

  // Cloud sync integration
  const { syncState, syncToCloud, loadFromCloud, isOnline, isAuthenticated } = useCloudSync({
    reportId: currentReportId,
    reportType: 'eic',
    data: formData,
    enabled: true,
    customerId: customerIdFromNav,
  });

  // Warn before closing tab if there are unsynchronised changes
  useEffect(() => {
    const hasUnsaved = syncState.status === 'syncing' || syncState.queuedChanges > 0;
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsaved) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [syncState.status, syncState.queuedChanges]);
  
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
        if (cloudData && typeof cloudData === 'object') {
          const data = cloudData as any;
          const certificateNumber = data.certificateNumber || formData.certificateNumber;
          setFormData({ ...data, certificateNumber });
          setCurrentReportId(initialReportId);
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

  // Observations hook
  const {
    observations,
    addObservation,
    updateObservation,
    removeObservation,
    autoCreateObservation
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
    getProgressPercentage
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
    
    // Sanitize string inputs to prevent XSS
    const sanitizedValue = typeof value === 'string' ? sanitizeTextInput(value) : value;
    setFormData(prev => ({ ...prev, [field]: sanitizedValue }));
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

  const confirmStartNew = async () => {
    clearAutoSave();
    // Generate new certificate number for new report
    const { generateCertificateNumber } = await import('@/utils/certificateNumbering');
    const certificateNumber = await generateCertificateNumber('eic');
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
      supplyVoltage: '',
      supplyFrequency: '50',
      phases: '',
      earthingArrangement: '',
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
      reportAuthorisedByDate: '',
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

  // Determine if certificate can be generated with BS7671 compliance validation
  const canGenerateCertificate = () => {
    const requiredInstallationFields = [
      'clientName', 'installationAddress', 'installationDate',
      'installationType', 'supplyVoltage', 'supplyFrequency',
      'earthingArrangement', 'mainProtectiveDevice'
    ];
    
    const requiredDeclarationFields = [
      'designerName', 'constructorName', 'inspectorName'
    ];
    
    const hasInstallation = requiredInstallationFields.every(
      field => formData[field] && formData[field].toString().trim() !== ''
    );
    
    const hasDeclarations = requiredDeclarationFields.every(
      field => formData[field] && formData[field].toString().trim() !== ''
    );
    
    // Check BS7671 compliance for test results
    if (formData.scheduleOfTests && Array.isArray(formData.scheduleOfTests) && formData.scheduleOfTests.length > 0) {
      const complianceResult = checkAllResultsCompliance(formData.scheduleOfTests);
      
      // Block if critical failures exist
      const hasCriticalFailures = Array.from(complianceResult.values()).some(
        (result) => result.warnings.some((w) => 
          w.severity === 'critical' && (
            w.title.includes('Zs') || 
            w.title.includes('Insulation') ||
            w.title.includes('polarity') ||
            w.description.includes('Zs exceeds') ||
            w.description.includes('Insulation resistance') ||
            w.description.includes('polarity')
          )
        )
      );
      
      if (hasCriticalFailures) {
        return false;
      }
    }
    
    return hasInstallation && hasDeclarations;
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
      
      
      // Check if work is notifiable under Part P
      const isNotifiable = isNotifiableWork(
        formData.description || '',
        formData.installationAddress || '',
        formData.scheduleOfTests?.some((circuit: any) => circuit.isNew === true)
      );

      if (isNotifiable) {
        // Validate signatures are present before creating notification
        const hasAllSignatures = formData.designerSignature && 
                                 formData.constructorSignature && 
                                 formData.inspectorSignature;
        
        if (!hasAllSignatures) {
          toast({
            title: "Signatures Required",
            description: "All designer, constructor, and inspector signatures must be completed before Part P notification can be created.",
            variant: "destructive",
          });
        } else {
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
            toast({
              title: "EIC Generated",
              description: "Certificate created successfully, but notification creation failed. You can create it manually from the Notifications page.",
            });
          }
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
      // Only show generic error for other failures
      if (formData.clientName || formData.installationAddress) {
        toast({
          title: 'Save failed',
          description: 'Unable to save EIC. Please check your connection and try again.',
          variant: 'destructive',
        });
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

  return (
    <>
      <div className="p-2 sm:p-4 space-y-3 sm:space-y-6">
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
        />
        
        <div className="px-2 md:px-4">
          <EICFormTabs
            currentTab={currentTab}
            onTabChange={handleTabChange}
            canAccessTab={canAccessTab}
            formData={formData}
            onUpdate={handleUpdate}
            tabNavigationProps={tabNavigationProps}
            observationsProps={observationsProps}
            onGenerateCertificate={handleGenerateCertificate}
            onSaveDraft={handleSaveDraft}
            canGenerateCertificate={canGenerateCertificate()}
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
  );
};

export default EICForm;
