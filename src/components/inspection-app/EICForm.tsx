import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useEICTabs } from '@/hooks/useEICTabs';
import { useEICObservations } from '@/hooks/useEICObservations';
import { useReportSync } from '@/hooks/useReportSync';
import { useReportId } from '@/hooks/useReportId';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { isNotifiableWork, createNotificationFromCertificate } from '@/utils/notificationHelper';
import { useLinkDesignToCertificate } from '@/hooks/useDesignedCircuits';
import { sanitizeTextInput } from '@/utils/inputSanitization';
import { checkAllResultsCompliance } from '@/utils/autoRegChecker';
import EICFormHeader from './eic/EICFormHeader';
import EICFormTabs from './eic/EICFormTabs';
import StartNewEICRDialog from './StartNewEICRDialog';
import { DraftRecoveryDialog } from '@/components/ui/DraftRecoveryDialog';
import CustomerSelector from './CustomerSelector';
import { Customer } from '@/hooks/useCustomers';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';

const EICForm = ({ onBack, initialReportId, designId }: { onBack: () => void; initialReportId?: string | null; designId?: string | null }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const lastSaveErrorToastRef = useRef<number>(0);

  // Link design to certificate when EIC is completed
  const linkDesignToCertificate = useLinkDesignToCertificate();

  // Capture customer data from navigation state
  const customerIdFromNav = location.state?.customerId;
  const customerDataFromNav = location.state?.customerData;

  // Customer selection state - can be set via navigation OR via CustomerSelector UI
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(customerIdFromNav || null);

  // Handle customer selection from CustomerSelector
  const handleCustomerSelect = useCallback((customerId: string | null, customer: Customer | null) => {
    setSelectedCustomerId(customerId);
    // Prefill form data from selected customer
    if (customer) {
      setFormData(prev => ({
        ...prev,
        clientName: prev.clientName || customer.name || '',
        clientAddress: prev.clientAddress || customer.address || '',
        installationAddress: prev.installationAddress || customer.address || '',
      }));
    }
  }, []);

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
  const [showDraftRecovery, setShowDraftRecovery] = useState(false);

  // Generate and manage temporary report ID for photo uploads
  const { effectiveReportId } = useReportId({
    reportType: 'eic',
    currentReportId,
  });

  // Best-in-class sync integration - handles auto-save, cloud sync, and offline queue
  const {
    status: syncStatus,
    saveNow,
    loadReport,
    isOnline,
    isAuthenticated,
    hasRecoverableDraft,
    draftPreview,
    recoverDraft,
    discardDraft,
  } = useReportSync({
    reportId: currentReportId,
    reportType: 'eic',
    formData,
    enabled: true,
    customerId: selectedCustomerId,
  });

  // Map new status to legacy syncState format for backwards compatibility
  const syncState = {
    status: syncStatus.cloud === 'synced' ? 'synced' :
            syncStatus.cloud === 'syncing' ? 'syncing' :
            syncStatus.cloud === 'queued' || syncStatus.cloud === 'offline' ? 'queued' :
            'error',
    lastSyncTime: syncStatus.lastCloudSync?.getTime(),
    errorMessage: syncStatus.errorMessage,
    queuedChanges: syncStatus.queuedChanges,
  };

  // Derive saving state from sync status
  const isSaving = syncStatus.local === 'saving' || syncStatus.cloud === 'syncing';
  const hasUnsavedChanges = syncStatus.local === 'unsaved' || syncStatus.cloud !== 'synced';

  // Show draft recovery dialog when recoverable draft detected
  useEffect(() => {
    if (hasRecoverableDraft && !currentReportId && !initialReportId) {
      setShowDraftRecovery(true);
    }
  }, [hasRecoverableDraft, currentReportId, initialReportId]);

  // Handle draft recovery
  const handleRecoverDraft = () => {
    const recoveredData = recoverDraft();
    if (recoveredData) {
      setFormData(prev => ({ ...prev, ...recoveredData }));
      toast({
        title: "Draft recovered",
        description: "Your unsaved EIC work has been restored.",
      });
    }
    setShowDraftRecovery(false);
  };

  // Handle draft discard
  const handleDiscardDraft = () => {
    discardDraft();
    setShowDraftRecovery(false);
  };

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

      loadReport(initialReportId).then(cloudData => {
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
  }, [initialReportId, authChecked, isAuthenticated, isOnline, loadReport]);

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
    discardDraft(); // Clear any draft data
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

      // Sync to cloud with completed data using best-in-class saveNow()
      const result = await saveNow();
      if (result && typeof result === 'object' && 'reportId' in result) {
        setCurrentReportId(result.reportId as string);

        // Link design to certificate if this EIC was created from a circuit design
        if (designId) {
          try {
            await linkDesignToCertificate.mutateAsync({
              designId,
              certificateId: result.reportId as string
            });
          } catch (linkError) {
            console.error('Failed to link design to certificate:', linkError);
            // Non-blocking - certificate was still saved successfully
          }
        }
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
      
      // Clear draft after successful generation
      discardDraft();
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "There was an error generating the certificate. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSaveDraft = async () => {
    // Use best-in-class saveNow() - handles local save, cloud sync, and offline queuing
    const result = await saveNow();

    // Check if save was successful
    if (!result || !result.success) {
      // Only show generic error for failures - debounced to prevent spam
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
      <div className="min-h-screen mobile-safe-area">
        <div className="space-y-6 md:space-y-8 animate-fade-in px-4 sm:px-6 md:px-8 pb-8 md:pb-12 max-w-7xl mx-auto pt-4 md:pt-6">
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

        {/* Customer Selection */}
        <CustomerSelector
          selectedCustomerId={selectedCustomerId}
          onCustomerSelect={handleCustomerSelect}
        />

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

      <DraftRecoveryDialog
        open={showDraftRecovery}
        reportType="eic"
        draftPreview={draftPreview}
        onRecover={handleRecoverDraft}
        onDiscard={handleDiscardDraft}
      />
    </>
  );
};

export default EICForm;
