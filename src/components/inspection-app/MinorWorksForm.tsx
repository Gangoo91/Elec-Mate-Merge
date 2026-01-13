import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import StartNewEICRDialog from '@/components/StartNewEICRDialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ArrowLeft, FileCheck, Save, CheckCircle, AlertTriangle, ChevronDown, ChevronUp, User, FileText, TestTube, Shield, Zap, Activity, Clock, Sparkles, WifiOff } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';
import { sanitizeTextInput } from '@/utils/inputSanitization';
import MinorWorksPdfGenerator from '@/components/pdf/MinorWorksPdfGenerator';
import { useReportSync } from '@/hooks/useReportSync';
import TestInstrumentInfo from '@/components/TestInstrumentInfo';
import { SmartCircuitDetails } from '@/components/minor-works/SmartCircuitDetails';
import { useSectionCompletion } from '@/hooks/useSectionCompletion';
import { SectionHeader } from '@/components/ui/section-header';
import SignatureInput from '@/components/signature/SignatureInput';
import { DraftRecoveryDialog } from '@/components/ui/DraftRecoveryDialog';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import IntelligentInput from '@/components/minor-works/IntelligentInput';
import { ComplianceCheckpoint } from '@/components/minor-works/ComplianceCheckpoint';
import { useSmartDefaults } from '@/hooks/useSmartDefaults';
import { useFormValidation } from '@/hooks/useFormValidation';

interface ZsLimits {
  [key: string]: { [rating: string]: number };
}

// Common electrical test instruments used in the UK
const commonTestInstruments = [
  { value: 'Fluke 1664 FC', label: 'Fluke 1664 FC - Multifunction Installer Tester' },
  { value: 'Fluke 1663', label: 'Fluke 1663 - Multifunction Installation Tester' },
  { value: 'Fluke 1662', label: 'Fluke 1662 - Multifunction Installation Tester' },
  { value: 'Megger MFT1741', label: 'Megger MFT1741 - Multifunction Tester' },
  { value: 'Megger MFT1730', label: 'Megger MFT1730 - Multifunction Tester' },
  { value: 'Megger MFT1720', label: 'Megger MFT1720 - Multifunction Tester' },
  { value: 'Kewtech KT65DL', label: 'Kewtech KT65DL - Multifunction Tester' },
  { value: 'Kewtech KT64DL', label: 'Kewtech KT64DL - Digital Multifunction Tester' },
  { value: 'Martindale VI13700', label: 'Martindale VI13700 - 18th Edition Tester' },
  { value: 'Socket & See SOK50', label: 'Socket & See SOK50 - Socket Tester' },
  { value: 'Metrel MI3102H', label: 'Metrel MI3102H - EurotestXE' },
  { value: 'Robin KMP450', label: 'Robin KMP450 - Multifunction Tester' },
  { value: 'Seaward Supernova', label: 'Seaward Supernova - Multifunction Tester' },
  { value: 'TIS MFT1552', label: 'TIS MFT1552 - Multifunction Tester' },
  { value: 'Other', label: 'Other (Manual Entry)' }
];

// BS 7671 Table 41.3 - MCBs to BS EN 60898 and RCBOs to BS EN 61009 (0.4s disconnection)
const ZS_LIMITS: ZsLimits = {
  // Type B MCBs - Table 41.3(a)
  'mcb-b': { '6': 7.28, '10': 4.37, '16': 2.73, '20': 2.19, '25': 1.75, '32': 1.37, '40': 1.09, '50': 0.87, '63': 0.69, '80': 0.55, '100': 0.44 },
  // Type C MCBs - Table 41.3(b)
  'mcb-c': { '6': 3.64, '10': 2.19, '16': 1.37, '20': 1.09, '25': 0.87, '32': 0.68, '40': 0.55, '50': 0.44, '63': 0.35, '80': 0.27, '100': 0.22 },
  // Type D MCBs - Table 41.3(c)
  'mcb-d': { '6': 1.82, '10': 1.09, '16': 0.68, '20': 0.55, '25': 0.44, '32': 0.34, '40': 0.27, '50': 0.22, '63': 0.17, '80': 0.14, '100': 0.11 },
  // RCBOs use same values as Type B MCBs
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
    certificateNumber: '',  // Will be generated asynchronously
    
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
    mainEarthingConductorSizeCustom: '', // For custom sizes
    mainBondingConductorSize: '',
    mainBondingConductorSizeCustom: '', // For custom sizes
    
    // Bonding Connections (NEW - for template compatibility)
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
    
    // Protection checkboxes (NEW - for template compatibility)
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
    rcboTripTime: '', // Overcurrent test for RCBO
    
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
    ringFinalContinuity: '', // Standalone ring final continuity
    
    // Earth Electrode & Phase Rotation
    earthElectrodeResistance: '',
    phaseRotation: '',
    
    // Test Equipment (Consolidated for template)
    testEquipmentModel: '',
    testEquipmentSerial: '',
    testEquipmentCalDate: '',
    testTemperature: '20°C',
    
    // Legacy individual tester fields (for backwards compatibility)
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
    signature: '', // Digital signature data
    bs7671Compliance: false,
    testResultsAccurate: false,
    workSafety: false,
    partPNotification: false,
    additionalNotes: ''
  });
  
  const [showStartNewDialog, setShowStartNewDialog] = useState(false);
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    certificate: true,
    client: true,
    work: true,
    supply: true,
    circuit: true,
    tests: true,
    equipment: true,
    declaration: true
  });
  
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // New: Smart defaults and validation
  const { defaults, hasDefaults, applyDefaults, saveDefaults } = useSmartDefaults(userId || undefined);
  const validation = useFormValidation(formData);


  // Section completion tracking
  const sectionCompletion = useSectionCompletion(formData);

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
    reportType: 'minor-works',
    formData,
    enabled: true,
    customerId: customerIdFromNav,
  });

  // Derive saving state from sync status
  const isSaving = syncStatus.local === 'saving' || syncStatus.cloud === 'syncing';
  const hasUnsavedChanges = syncStatus.local === 'unsaved' || syncStatus.cloud !== 'synced';

  // State for draft recovery
  const [showDraftRecovery, setShowDraftRecovery] = useState(false);

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
      setFormData((prev: any) => ({ ...prev, ...recoveredData }));
      toast({
        title: "Draft recovered",
        description: "Your unsaved Minor Works work has been restored.",
      });
    }
    setShowDraftRecovery(false);
  };

  // Handle draft discard
  const handleDiscardDraft = () => {
    discardDraft();
    setShowDraftRecovery(false);
  };
  
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

      loadReport(initialReportId).then(cloudData => {
        if (cloudData) {
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
  }, [initialReportId, authChecked, isAuthenticated, isOnline, loadReport]);

  // Draft recovery is now handled by useReportSync and DraftRecoveryDialog

  // Generate certificate number on mount if needed - Prevent regeneration
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
    // Sanitize string inputs to prevent XSS
    const sanitizedValue = typeof value === 'string' ? sanitizeTextInput(value) : value;
    setFormData(prev => ({ ...prev, [field]: sanitizedValue }));
  };

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(`section-${sectionId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Highlight the section briefly
      element.classList.add('ring-2', 'ring-primary', 'ring-offset-2');
      setTimeout(() => {
        element.classList.remove('ring-2', 'ring-primary', 'ring-offset-2');
      }, 2000);
      
      // Open the section if it's closed
      if (!openSections[sectionId]) {
        toggleSection(sectionId);
      }
    }
  };

  const handleSaveDraft = async () => {
    // Use best-in-class saveNow() - handles local save, cloud sync, and offline queuing
    const result = await saveNow();

    if (result && typeof result === 'object' && 'reportId' in result && result.reportId) {
      setCurrentReportId(result.reportId as string);

      // Link to customer if navigated from customer page
      if (customerIdFromNav && result.reportId) {
        const { linkCustomerToReport } = await import('@/utils/customerHelper');
        await linkCustomerToReport(result.reportId as string, customerIdFromNav);
      }
    } else if (!result?.success) {
      // Show generic error only if form has data
      if (formData.clientName || formData.propertyAddress) {
        toast({
          title: 'Save failed',
          description: 'Unable to save. Please check your connection and try again.',
          variant: 'destructive',
        });
      }
    }

    // Invalidate queries to refresh dashboard
    queryClient.invalidateQueries({ queryKey: ['recent-certificates'] });
    queryClient.invalidateQueries({ queryKey: ['my-reports'] });
  };

  const handleStartNew = () => {
    setShowStartNewDialog(true);
  };

  const confirmStartNew = async () => {
    const { generateCertificateNumber } = await import('@/utils/certificateNumbering');
    const certificateNumber = await generateCertificateNumber('minor-works');
    
    // Reset to empty form
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

  // Remove this function as PDF generation is now handled by MinorWorksPdfGenerator
  // const handleGenerateCertificate = () => { ... }

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

  const getCompletionPercentage = () => {
    const allFields = Object.keys(formData).filter(key => key !== 'maxPermittedZs');
    const filledFields = allFields.filter(field => {
      if (typeof formData[field] === 'boolean') {
        return formData[field] === true;
      }
      return formData[field]?.toString().trim();
    }).length;
    
    return Math.round((filledFields / allFields.length) * 100);
  };

  const canGenerateCertificate = () => {
    const complianceScore = getComplianceItems().overallScore;
    const hasFailures = getComplianceItems().items.some(item => item.status === 'fail');
    return complianceScore >= 80 && !hasFailures;
  };

  const getComplianceItems = () => {
    const items = [
      {
        id: 'earthing',
        label: 'Earthing System Identified',
        status: (formData.earthingArrangement ? 'pass' : 'pending') as 'pass' | 'fail' | 'pending' | 'warning',
        regulation: 'Reg 411.3',
        message: formData.earthingArrangement ? `${formData.earthingArrangement.toUpperCase()} system` : 'Awaiting input',
        section: 'section-supply',
        details: formData.earthingArrangement ? `${formData.earthingArrangement.toUpperCase()} system identified` : 'Complete the Supply & Earthing section'
      },
      {
        id: 'continuity',
        label: 'Continuity (R1+R2)',
        status: (formData.continuityR1R2 
          ? parseFloat(formData.continuityR1R2) < 2.0 ? 'pass' : 'warning'
          : 'pending') as 'pass' | 'fail' | 'pending' | 'warning',
        regulation: 'Reg 643.2',
        message: formData.continuityR1R2 
          ? parseFloat(formData.continuityR1R2) < 2.0 
            ? `${formData.continuityR1R2}Ω - Within normal range`
            : `${formData.continuityR1R2}Ω - Unusually high, verify reading`
          : 'Awaiting test',
        section: 'section-tests',
        details: formData.continuityR1R2 
          ? `R1+R2 = ${formData.continuityR1R2}Ω. Typical values are below 2.0Ω for most circuits.`
          : 'Perform continuity test in Test Results section'
      },
      {
        id: 'insulation',
        label: 'Insulation Resistance ≥ 1.0 MΩ',
        status: (formData.insulationLiveNeutral
          ? parseFloat(formData.insulationLiveNeutral) >= 1.0 ? 'pass' : 'fail'
          : 'pending') as 'pass' | 'fail' | 'pending' | 'warning',
        regulation: 'Reg 643.3',
        message: formData.insulationLiveNeutral
          ? parseFloat(formData.insulationLiveNeutral) >= 1.0
            ? `${formData.insulationLiveNeutral} MΩ - Compliant`
            : `${formData.insulationLiveNeutral} MΩ - FAIL: Below 1.0 MΩ minimum`
          : 'Awaiting test',
        section: 'section-tests',
        details: formData.insulationLiveNeutral
          ? `Insulation resistance: ${formData.insulationLiveNeutral} MΩ. BS 7671 requires minimum 1.0 MΩ at 500V.`
          : 'Perform insulation resistance test in Test Results section'
      },
      {
        id: 'zs',
        label: 'Zs ≤ Maximum Permitted',
        status: (formData.earthFaultLoopImpedance && formData.maxPermittedZs
          ? parseFloat(formData.earthFaultLoopImpedance) <= parseFloat(formData.maxPermittedZs) ? 'pass' : 'fail'
          : 'pending') as 'pass' | 'fail' | 'pending' | 'warning',
        regulation: 'Reg 411.4.4',
        message: formData.earthFaultLoopImpedance && formData.maxPermittedZs
          ? parseFloat(formData.earthFaultLoopImpedance) <= parseFloat(formData.maxPermittedZs)
            ? `${formData.earthFaultLoopImpedance}Ω ≤ ${formData.maxPermittedZs}Ω - Compliant`
            : `${formData.earthFaultLoopImpedance}Ω > ${formData.maxPermittedZs}Ω - FAIL: Exceeds limit`
          : 'Awaiting test or device rating',
        section: 'section-tests',
        details: formData.earthFaultLoopImpedance && formData.maxPermittedZs
          ? `Measured Zs: ${formData.earthFaultLoopImpedance}Ω, Maximum permitted: ${formData.maxPermittedZs}Ω based on protective device.`
          : 'Complete protective device details and perform Zs test'
      },
      {
        id: 'polarity',
        label: 'Polarity Correct',
        status: (formData.polarity === 'correct' ? 'pass' : formData.polarity ? 'fail' : 'pending') as 'pass' | 'fail' | 'pending' | 'warning',
        regulation: 'Reg 643.7',
        message: formData.polarity === 'correct' 
          ? 'All conductors correctly terminated'
          : formData.polarity 
            ? 'FAIL: Polarity error detected'
            : 'Awaiting test',
        section: 'section-tests',
        details: formData.polarity === 'correct'
          ? 'All conductors are correctly terminated according to polarity requirements.'
          : formData.polarity
            ? 'Polarity error detected. Check conductor terminations.'
            : 'Perform polarity test in Test Results section'
      },
      {
        id: 'rcd',
        label: 'RCD/RCBO Protection',
        status: (formData.protectionRcd || formData.protectionRcbo ? 'pass' : 'pending') as 'pass' | 'fail' | 'pending' | 'warning',
        regulation: 'Reg 415.1',
        message: formData.protectionRcd || formData.protectionRcbo
          ? 'Additional protection provided'
          : 'Verify if additional protection required',
        section: 'section-circuit',
        details: formData.protectionRcd || formData.protectionRcbo
          ? 'Additional protection (RCD/RCBO) is installed for shock protection.'
          : 'Verify if additional protection is required for this circuit'
      }
    ];

    const passCount = items.filter(i => i.status === 'pass').length;
    const totalCount = items.length;
    const overallScore = Math.round((passCount / totalCount) * 100);

    return { items, overallScore };
  };

  const validateTestResult = (field: string, value: string) => {
    if (field === 'earthFaultLoopImpedance' && formData.maxPermittedZs) {
      const measured = parseFloat(value);
      const limit = parseFloat(formData.maxPermittedZs);
      if (!isNaN(measured) && !isNaN(limit)) {
        return measured <= limit;
      }
    }
    return true;
  };

  const workTypeOptions = {
    'new-circuit': 'New circuit installation',
    'socket-outlet': 'Additional socket outlet(s)',
    'lighting-point': 'Additional lighting point(s)',
    'cooker-circuit': 'Cooker circuit installation',
    'shower-circuit': 'Electric shower circuit',
    'immersion-heater': 'Immersion heater circuit',
    'replacement': 'Replacement of accessories/equipment',
    'other': 'Other (specify in description)'
  };

  const earthingOptions = [
    { value: 'tn-c-s', label: 'TN-C-S (PME)' },
    { value: 'tn-s', label: 'TN-S' },
    { value: 'tt', label: 'TT' },
    { value: 'it', label: 'IT' }
  ];

  const installationMethods = [
    { value: 'A1', label: 'A1 - Conduit (thermoplastic) in wall' },
    { value: 'A2', label: 'A2 - Conduit (metal) in wall' },
    { value: 'B1', label: 'B1 - Conduit (thermoplastic) on wall' },
    { value: 'B2', label: 'B2 - Conduit (metal) on wall' },
    { value: 'C', label: 'C - Clipped direct' },
    { value: 'D1', label: 'D1 - Underground duct' },
    { value: 'D2', label: 'D2 - Direct in ground' },
    { value: 'E', label: 'E - In air (overhead)' },
    { value: 'F', label: 'F - On cable tray' },
    { value: 'G', label: 'G - In cable ducting' }
  ];


  return (
    <div className="min-h-screen mobile-safe-area prevent-shortcuts">
      <div className="space-y-6 md:space-y-8 animate-fade-in px-4 sm:px-6 md:px-8 pb-8 md:pb-12 max-w-7xl mx-auto pt-4 md:pt-6">
        {/* Hub-Style Header */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-elec-yellow/10">
                <FileCheck className="h-6 w-6 sm:h-7 sm:w-7 text-elec-yellow" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Minor Works
                </h1>
                {formData.certificateNumber && (
                  <p className="text-sm text-muted-foreground font-mono">
                    {formData.certificateNumber}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {!isOnline && (
                <Badge variant="outline" className="text-orange-500 border-orange-500/30 bg-orange-500/10">
                  <WifiOff className="h-3 w-3 mr-1" />
                  Offline
                </Badge>
              )}
              {hasUnsavedChanges && (
                <Badge variant="outline" className="text-amber-500 border-amber-500/30">
                  <Clock className="h-3 w-3 mr-1" />
                  Unsaved
                </Badge>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={handleSaveDraft}
                className="h-10 gap-2 bg-elec-yellow text-black hover:bg-elec-yellow/90"
              >
                <Save className="h-4 w-4" />
                <span className="hidden sm:inline">Save</span>
              </Button>
              <Button variant="outline" onClick={onBack} className="h-10 gap-2">
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back</span>
              </Button>
            </div>
          </div>
          <p className="text-base text-muted-foreground max-w-2xl">
            BS 7671:2018+A3:2024 - Minor Electrical Installation Works Certificate
          </p>
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Completion Progress</span>
              <span className="font-medium text-elec-yellow">{getCompletionPercentage()}%</span>
            </div>
            <Progress value={getCompletionPercentage()} className="h-2" />
          </div>
        </div>

        {/* Smart Defaults Alert */}
        {hasDefaults && !formData.contractorName && (
          <div>
            <Alert className="bg-blue-500/10 border-blue-500/30">
              <Sparkles className="h-4 w-4 text-blue-400" />
              <AlertDescription>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <span className="text-sm flex-1">We've prepared some common values based on your previous certificates</span>
                  <Button 
                    size="sm" 
                    variant="default"
                    onClick={() => {
                      const defaultValues = applyDefaults();
                      setFormData(prev => ({ ...prev, ...defaultValues }));
                      toast({
                        title: "Defaults Applied",
                        description: "Common values have been filled in",
                      });
                    }}
                    className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-foreground min-h-[44px]"
                  >
                    Apply Suggestions
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        )}


        {/* Main Layout - Flex with Sidebar */}
        <div className="flex gap-6">
          {/* Main Form Area - Scrollable */}
          <div className="flex-1 min-w-0 space-y-6">
        {/* Certificate Reference - Enhanced */}
        <Card id="section-certificate" className="bg-card border border-border overflow-hidden">
          <Collapsible open={openSections.certificate} onOpenChange={() => toggleSection('certificate')}>
            <SectionHeader 
              title="Certificate Reference Number" 
              icon={FileCheck}
              isOpen={openSections.certificate}
              color="primary"
              completionPercentage={formData.certificateNumber ? 100 : 0}
              isComplete={!!formData.certificateNumber}
            />
            <CollapsibleContent>
              <CardContent className="space-y-6 p-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-elec-yellow/10 via-transparent to-blue-500/10 rounded-xl blur-xl"></div>
                  <div className="relative bg-card/90 backdrop-blur-sm rounded-xl p-8 border-2 border-border">
                    <div className="max-w-md mx-auto space-y-4">
                      <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-elec-yellow to-elec-yellow/80 flex items-center justify-center shadow-lg shadow-elec-yellow/20">
                          <FileCheck className="h-6 w-6 text-black" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg">Certificate Reference</h4>
                          <p className="text-xs text-muted-foreground">Unique identifier</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-sm font-medium flex items-center gap-2">
                          Certificate Number
                          <span className="text-red-400">*</span>
                        </Label>
                        <div className="relative">
                          <Input
                            id="certificateNumber"
                            placeholder="MW-2025-0036"
                            value={formData.certificateNumber}
                            onChange={(e) => handleUpdate('certificateNumber', e.target.value.toUpperCase())}
                            className="text-center font-mono text-xl font-bold h-14 tracking-wider"
                            required
                          />
                          {formData.certificateNumber && (
                            <CheckCircle className="absolute right-3 top-4 h-5 w-5 text-green-500 success-icon" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground text-center">
                          Use your company's standard numbering system
                        </p>
                      </div>
                      
                      <div className="pt-4 border-t border-border/50">
                        <p className="text-xs text-center text-muted-foreground">
                          Issued in accordance with <span className="text-elec-yellow font-medium">BS 7671:2018+A3:2024</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Part 1: Client & Installation Details */}
        <Card id="section-client" className="overflow-hidden bg-card border border-border">
          <Collapsible open={openSections.client} onOpenChange={() => toggleSection('client')}>
            <SectionHeader 
              title="Part 1: Client & Installation Details" 
              icon={User}
              isOpen={openSections.client}
              color="primary"
              completionPercentage={sectionCompletion.client}
              isComplete={sectionCompletion.client === 100}
            />
            <CollapsibleContent>
              <CardContent className="space-y-6 p-6">
                {/* Client Information Group */}
                <div className="bg-card/30 rounded-lg p-4 space-y-4 border border-border/50">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                    <h4 className="text-sm font-medium text-neutral-300">Client Information</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <Label htmlFor="clientName">Client Name *</Label>
                      <Input
                        id="clientName"
                        placeholder="Enter client's full name"
                        value={formData.clientName}
                        onChange={(e) => handleUpdate('clientName', e.target.value)}
                        className={formData.clientName ? 'field-complete' : ''}
                      />
                      {formData.clientName && formData.clientName.length >= 2 && (
                        <CheckCircle className="absolute right-3 top-9 h-4 w-4 text-green-500 success-icon" />
                      )}
                    </div>
                    <div>
                      <Label htmlFor="personOrderingWork">
                        Person Ordering Work 
                        <span className="text-xs text-muted-foreground ml-1">(Optional)</span>
                      </Label>
                      <Input
                        id="personOrderingWork"
                        placeholder="If different from client"
                        value={formData.personOrderingWork}
                        onChange={(e) => handleUpdate('personOrderingWork', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Property Location Group */}
                <div className="bg-card/30 rounded-lg p-4 space-y-4 border border-border/50">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                    <h4 className="text-sm font-medium text-neutral-300">Property Location</h4>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-2 relative">
                      <Label htmlFor="propertyAddress">Property Address *</Label>
                      <Textarea
                        id="propertyAddress"
                        placeholder="Complete installation address"
                        value={formData.propertyAddress}
                        onChange={(e) => handleUpdate('propertyAddress', e.target.value)}
                        rows={3}
                      />
                      {formData.propertyAddress && formData.propertyAddress.length >= 10 && (
                        <CheckCircle className="absolute right-3 top-9 h-4 w-4 text-green-500 success-icon" />
                      )}
                    </div>
                    <div className="relative">
                      <Label htmlFor="postcode">Postcode</Label>
                      <Input
                        id="postcode"
                        placeholder="SW1A 1AA"
                        value={formData.postcode}
                        onChange={(e) => handleUpdate('postcode', e.target.value.toUpperCase())}
                      />
                      {formData.postcode && formData.postcode.length >= 5 && (
                        <CheckCircle className="absolute right-3 top-9 h-4 w-4 text-green-500 success-icon" />
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        UK postcode format
                      </p>
                    </div>
                  </div>
                </div>

                {/* Project Dates Group */}
                <div className="bg-card/30 rounded-lg p-4 space-y-4 border border-border/50">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                    <h4 className="text-sm font-medium text-neutral-300">Project Dates</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                      <Label htmlFor="workDate">
                        Date Work Commenced *
                      </Label>
                      <Input
                        id="workDate"
                        type="date"
                        value={formData.workDate}
                        onChange={(e) => handleUpdate('workDate', e.target.value)}
                        max={new Date().toISOString().split('T')[0]}
                        className="cursor-pointer"
                      />
                      {formData.workDate && (
                        <CheckCircle className="absolute right-3 top-9 h-4 w-4 text-green-500 success-icon" />
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        When did work begin on site?
                      </p>
                    </div>
                    <div className="relative">
                      <Label htmlFor="dateOfCompletion">Date of Completion</Label>
                      <Input
                        id="dateOfCompletion"
                        type="date"
                        value={formData.dateOfCompletion}
                        onChange={(e) => handleUpdate('dateOfCompletion', e.target.value)}
                        min={formData.workDate}
                        max={new Date().toISOString().split('T')[0]}
                        className="cursor-pointer"
                      />
                      {formData.dateOfCompletion && (
                        <CheckCircle className="absolute right-3 top-9 h-4 w-4 text-green-500 success-icon" />
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        When was all work finished?
                      </p>
                    </div>
                    <div className="relative">
                      <Label htmlFor="nextInspectionDue">Next Inspection Due</Label>
                      <Input
                        id="nextInspectionDue"
                        type="date"
                        value={formData.nextInspectionDue}
                        onChange={(e) => handleUpdate('nextInspectionDue', e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="cursor-pointer"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const futureDate = new Date();
                          futureDate.setFullYear(futureDate.getFullYear() + 5);
                          handleUpdate('nextInspectionDue', futureDate.toISOString().split('T')[0]);
                        }}
                        className="absolute right-12 top-9 text-xs text-blue-400 hover:text-blue-300 underline"
                      >
                        +5yr
                      </button>
                      <p className="text-xs text-muted-foreground mt-1">
                        Typical: 5yr domestic, 3yr commercial
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contractor Information Group */}
                <div className="bg-card/30 rounded-lg p-4 space-y-4 border border-border/50">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                    <h4 className="text-sm font-medium text-neutral-300">Contractor Information</h4>
                  </div>
                  <div>
                    <Label htmlFor="contractorName">Contractor Name</Label>
                    <Input
                      id="contractorName"
                      placeholder="Electrical contractor company name"
                      value={formData.contractorName}
                      onChange={(e) => handleUpdate('contractorName', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="contractorAddress">Contractor Address</Label>
                    <Textarea
                      id="contractorAddress"
                      placeholder="Complete contractor address"
                      value={formData.contractorAddress}
                      onChange={(e) => handleUpdate('contractorAddress', e.target.value)}
                      rows={2}
                    />
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

            {/* Part 2: Description of Work */}
            <Card id="section-work" className="overflow-hidden bg-card border border-border">
          <Collapsible open={openSections.work} onOpenChange={() => toggleSection('work')}>
            <SectionHeader 
              title="Part 2: Description of Work" 
              icon={FileText}
              isOpen={openSections.work}
              color="secondary"
              completionPercentage={sectionCompletion.work}
              isComplete={sectionCompletion.work === 100}
            />
            <CollapsibleContent>
              <CardContent className="space-y-6 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="workType">Type of Work *</Label>
                    <Select value={formData.workType} onValueChange={(value) => handleUpdate('workType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type of work" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border z-50">
                        {Object.entries(workTypeOptions).map(([value, label]) => (
                          <SelectItem key={value} value={value}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="workLocation">Location of Work</Label>
                    <Input
                      id="workLocation"
                      placeholder="e.g., Kitchen, First floor"
                      value={formData.workLocation}
                      onChange={(e) => handleUpdate('workLocation', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="workDescription">Detailed Description of Work *</Label>
                  <Textarea
                    id="workDescription"
                    placeholder="Provide detailed description of work carried out, including equipment installed and technical details..."
                    value={formData.workDescription}
                    onChange={(e) => handleUpdate('workDescription', e.target.value)}
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="departuresFromBS7671">Departures from BS 7671 (if any)</Label>
                  <Textarea
                    id="departuresFromBS7671"
                    placeholder="Record any departures from BS 7671 requirements and justification..."
                    value={formData.departuresFromBS7671}
                    onChange={(e) => handleUpdate('departuresFromBS7671', e.target.value)}
                    rows={2}
                  />
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

            {/* Part 3: Supply & Earthing */}
            <Card id="section-supply" className="overflow-hidden bg-card border border-border">
          <Collapsible open={openSections.supply} onOpenChange={() => toggleSection('supply')}>
            <SectionHeader 
              title="Part 3: Supply & Earthing" 
              icon={Zap}
              isOpen={openSections.supply}
              color="amber-500"
              completionPercentage={sectionCompletion.supply}
              isComplete={sectionCompletion.supply === 100}
            />
            <CollapsibleContent>
              <CardContent className="space-y-6 p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="supplyVoltage">Nominal Voltage</Label>
                    <Select value={formData.supplyVoltage} onValueChange={(value) => handleUpdate('supplyVoltage', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border z-50">
                        <SelectItem value="230V">230V</SelectItem>
                        <SelectItem value="400V">400V</SelectItem>
                        <SelectItem value="110V">110V</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="frequency">Frequency</Label>
                    <Input
                      id="frequency"
                      value={formData.frequency}
                      onChange={(e) => handleUpdate('frequency', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="supplyPhases">No. of Phases</Label>
                    <Select value={formData.supplyPhases} onValueChange={(value) => handleUpdate('supplyPhases', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border z-50">
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="earthingArrangement">Earthing Arrangement *</Label>
                    <Select value={formData.earthingArrangement} onValueChange={(value) => handleUpdate('earthingArrangement', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border z-50">
                        {earthingOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label className="text-sm font-medium">Bonding Connections Present</Label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="bondingWater"
                        checked={formData.bondingWater}
                        onCheckedChange={(checked) => handleUpdate('bondingWater', checked)}
                        className="border-white/50 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow"
                      />
                      <Label htmlFor="bondingWater" className="text-sm">Water</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="bondingGas"
                        checked={formData.bondingGas}
                        onCheckedChange={(checked) => handleUpdate('bondingGas', checked)}
                        className="border-white/50 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow"
                      />
                      <Label htmlFor="bondingGas" className="text-sm">Gas</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="bondingOil"
                        checked={formData.bondingOil}
                        onCheckedChange={(checked) => handleUpdate('bondingOil', checked)}
                        className="border-white/50 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow"
                      />
                      <Label htmlFor="bondingOil" className="text-sm">Oil</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="bondingStructural"
                        checked={formData.bondingStructural}
                        onCheckedChange={(checked) => handleUpdate('bondingStructural', checked)}
                        className="border-white/50 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow"
                      />
                      <Label htmlFor="bondingStructural" className="text-sm">Structural Steel</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="bondingOther"
                        checked={formData.bondingOther}
                        onCheckedChange={(checked) => handleUpdate('bondingOther', checked)}
                        className="border-white/50 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow"
                      />
                      <Label htmlFor="bondingOther" className="text-sm">Other</Label>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="mainEarthingConductorSize">Main Earthing Conductor (mm²)</Label>
                    <Select
                      value={formData.mainEarthingConductorSize || ''}
                      onValueChange={(value) => handleUpdate('mainEarthingConductorSize', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select conductor size" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border z-50">
                        <SelectItem value="6mm">6mm²</SelectItem>
                        <SelectItem value="10mm">10mm²</SelectItem>
                        <SelectItem value="16mm">16mm²</SelectItem>
                        <SelectItem value="25mm">25mm²</SelectItem>
                        <SelectItem value="35mm">35mm²</SelectItem>
                        <SelectItem value="50mm">50mm²</SelectItem>
                        <SelectItem value="70mm">70mm²</SelectItem>
                        <SelectItem value="95mm">95mm²</SelectItem>
                        <SelectItem value="custom">Other/Custom</SelectItem>
                      </SelectContent>
                    </Select>
                    {formData.mainEarthingConductorSize === 'custom' && (
                      <Input
                        placeholder="Enter custom size (mm²)"
                        value={formData.mainEarthingConductorSizeCustom || ''}
                        onChange={(e) => handleUpdate('mainEarthingConductorSizeCustom', e.target.value)}
                        className="mt-2"
                        inputMode="numeric"
                      />
                    )}
                  </div>
                  <div>
                    <Label htmlFor="mainBondingConductorSize">Main Protective Bonding (mm²)</Label>
                    <Select
                      value={formData.mainBondingConductorSize || ''}
                      onValueChange={(value) => handleUpdate('mainBondingConductorSize', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select conductor size" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border z-50">
                        <SelectItem value="2.5mm">2.5mm²</SelectItem>
                        <SelectItem value="4mm">4mm²</SelectItem>
                        <SelectItem value="6mm">6mm²</SelectItem>
                        <SelectItem value="10mm">10mm²</SelectItem>
                        <SelectItem value="16mm">16mm²</SelectItem>
                        <SelectItem value="25mm">25mm²</SelectItem>
                        <SelectItem value="35mm">35mm²</SelectItem>
                        <SelectItem value="custom">Other/Custom</SelectItem>
                      </SelectContent>
                    </Select>
                    {formData.mainBondingConductorSize === 'custom' && (
                      <Input
                        placeholder="Enter custom size (mm²)"
                        value={formData.mainBondingConductorSizeCustom || ''}
                        onChange={(e) => handleUpdate('mainBondingConductorSizeCustom', e.target.value)}
                        className="mt-2"
                        inputMode="numeric"
                      />
                    )}
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Part 4: Circuit Details - Enhanced Smart Version */}
        <div id="section-circuit">
          <SmartCircuitDetails
            formData={formData}
            handleUpdate={handleUpdate}
            openSections={openSections}
            toggleSection={toggleSection}
            installationMethods={installationMethods}
          />
        </div>

        {/* Part 5: Test Results */}
        <Card id="section-tests" className="overflow-hidden bg-card border border-border">
          <Collapsible open={openSections.tests} onOpenChange={() => toggleSection('tests')}>
            <SectionHeader 
              title="Part 5: Test Results" 
              icon={TestTube}
              isOpen={openSections.tests}
              color="green-500"
              completionPercentage={sectionCompletion.tests}
              isComplete={sectionCompletion.tests === 100}
            />
            <CollapsibleContent>
              <CardContent className="space-y-6 p-6">
                <Alert variant="info">
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    All tests must be carried out using calibrated instruments in accordance with BS 7671:2018+A3:2024
                  </AlertDescription>
                </Alert>

                {/* DEAD TESTS Section */}
                <div className="rounded-lg p-6 space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Shield className="h-5 w-5" />
                    <h3 className="text-lg font-semibold">Dead Tests (Circuit Isolated)</h3>
                  </div>

                  {/* Continuity Testing */}
                  <div className="bg-card/50 rounded-lg p-6 border border-border space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                        <h4 className="font-medium text-sm">Continuity of Protective Conductors</h4>
                      </div>
                      {formData.continuityR1R2 && parseFloat(formData.continuityR1R2) < 0.5 && (
                        <Badge className="bg-green-600 text-foreground">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Pass
                        </Badge>
                      )}
                    </div>
                    
                    {/* Check if it's a ring circuit */}
                    {formData.circuitDesignation?.toLowerCase().includes('ring') || 
                     formData.circuitDescription?.toLowerCase().includes('ring') ? (
                      <div className="space-y-4">
                      <Alert variant="info">
                        <AlertDescription className="text-xs">
                          Ring final circuit detected. Record both end-to-end and cross-connection readings.
                        </AlertDescription>
                      </Alert>
                        
                        {/* End-to-End Readings */}
                        <div>
                          <Label className="text-sm font-medium mb-2 block">End-to-End Readings (Ω)</Label>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <Label htmlFor="ringR1EndToEnd" className="text-xs text-muted-foreground">R1 (Live)</Label>
                              <Input
                                id="ringR1EndToEnd"
                                type="number"
                                step="0.01"
                                placeholder="e.g., 0.42"
                                value={formData.ringR1EndToEnd}
                                onChange={(e) => handleUpdate('ringR1EndToEnd', e.target.value)}
                              />
                            </div>
                            <div>
                              <Label htmlFor="ringRnEndToEnd" className="text-xs text-muted-foreground">Rn (Neutral)</Label>
                              <Input
                                id="ringRnEndToEnd"
                                type="number"
                                step="0.01"
                                placeholder="e.g., 0.42"
                                value={formData.ringRnEndToEnd}
                                onChange={(e) => handleUpdate('ringRnEndToEnd', e.target.value)}
                              />
                            </div>
                            <div>
                              <Label htmlFor="ringR2EndToEnd" className="text-xs text-muted-foreground">R2 (CPC)</Label>
                              <Input
                                id="ringR2EndToEnd"
                                type="number"
                                step="0.01"
                                placeholder="e.g., 0.68"
                                value={formData.ringR2EndToEnd}
                                onChange={(e) => handleUpdate('ringR2EndToEnd', e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Cross-Connection Readings */}
                        <div>
                          <Label className="text-sm font-medium mb-2 block">Cross-Connection Readings (Ω)</Label>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <Label htmlFor="ringR1Cross" className="text-xs text-muted-foreground">r1 (Live)</Label>
                              <Input
                                id="ringR1Cross"
                                type="number"
                                step="0.01"
                                placeholder="e.g., 0.21"
                                value={formData.ringR1Cross}
                                onChange={(e) => handleUpdate('ringR1Cross', e.target.value)}
                              />
                            </div>
                            <div>
                              <Label htmlFor="ringRnCross" className="text-xs text-muted-foreground">rn (Neutral)</Label>
                              <Input
                                id="ringRnCross"
                                type="number"
                                step="0.01"
                                placeholder="e.g., 0.21"
                                value={formData.ringRnCross}
                                onChange={(e) => handleUpdate('ringRnCross', e.target.value)}
                              />
                            </div>
                            <div>
                              <Label htmlFor="ringR2Cross" className="text-xs text-muted-foreground">r2 (CPC)</Label>
                              <Input
                                id="ringR2Cross"
                                type="number"
                                step="0.01"
                                placeholder="e.g., 0.34"
                                value={formData.ringR2Cross}
                                onChange={(e) => handleUpdate('ringR2Cross', e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        {/* R1+R2 (calculated or measured) */}
                        <div>
                          <Label htmlFor="continuityR1R2">R1+R2 at Furthest Point (Ω)</Label>
                          <Input
                            id="continuityR1R2"
                            type="number"
                            step="0.01"
                            placeholder="Should be ≈ (R1+R2)/4"
                            value={formData.continuityR1R2}
                            onChange={(e) => handleUpdate('continuityR1R2', e.target.value)}
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            For ring circuits, R1+R2 should be approximately (R1+R2 end-to-end)/4
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="relative">
                        <Label htmlFor="continuityR1R2">R1+R2 (Ω)</Label>
                        <Input
                          id="continuityR1R2"
                          type="number"
                          step="0.001"
                          placeholder="0.000"
                          value={formData.continuityR1R2}
                          onChange={(e) => handleUpdate('continuityR1R2', e.target.value)}
                          className={`font-mono ${
                            formData.continuityR1R2 && parseFloat(formData.continuityR1R2) < 0.5
                              ? 'border-green-500/50 focus:border-green-500'
                              : ''
                          }`}
                        />
                        {formData.continuityR1R2 && parseFloat(formData.continuityR1R2) < 0.5 && (
                          <CheckCircle className="absolute right-3 top-9 h-4 w-4 text-green-500 success-icon" />
                        )}
                        <p className="text-xs text-muted-foreground mt-1">
                          Continuity of protective conductor (BS 7671 Reg 612.2.1)
                        </p>
                      </div>
                      )}
                    
                    {formData.continuityR1R2 && parseFloat(formData.continuityR1R2) < 0.5 && (
                      <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg fade-in-up">
                        <p className="text-xs text-blue-300 flex items-center gap-2">
                          <CheckCircle className="h-3.5 w-3.5 flex-shrink-0" />
                          <span>
                            <strong>BS 7671 Compliance:</strong> Typical values less than 0.5 Ω for domestic circuits are satisfactory.
                          </span>
                        </p>
                      </div>
                    )}
                  </div>

                  <Separator />

                  {/* Ring Final Continuity - Standalone Field */}
                <div className="space-y-4">
                    <h4 className="font-medium text-sm">Ring Final Continuity</h4>
                    <div>
                      <Label htmlFor="ringFinalContinuity">Ring Final Continuity (Ω)</Label>
                      <Input
                        id="ringFinalContinuity"
                        type="text"
                        placeholder="e.g., 0.42 or N/A"
                        value={formData.ringFinalContinuity}
                        onChange={(e) => handleUpdate('ringFinalContinuity', e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Record ring final continuity test result or enter "N/A" if not applicable (BS 7671 Reg 612.2.2)
                      </p>
                    </div>
                  </div>

                  <Separator />

                  {/* Insulation Resistance */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                      <h4 className="font-medium text-sm">Insulation Resistance (MΩ)</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <Label htmlFor="insulationTestVoltage">Test Voltage</Label>
                        <Select value={formData.insulationTestVoltage} onValueChange={(value) => handleUpdate('insulationTestVoltage', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-border z-50">
                            <SelectItem value="250V">250V DC</SelectItem>
                            <SelectItem value="500V">500V DC</SelectItem>
                            <SelectItem value="1000V">1000V DC</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="insulationLiveNeutral">Live-Neutral</Label>
                        <Input
                          id="insulationLiveNeutral"
                          type="number"
                          step="0.1"
                          placeholder="MΩ"
                          value={formData.insulationLiveNeutral}
                          onChange={(e) => handleUpdate('insulationLiveNeutral', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="insulationLiveEarth">Live-Earth</Label>
                        <Input
                          id="insulationLiveEarth"
                          type="number"
                          step="0.1"
                          placeholder="MΩ"
                          value={formData.insulationLiveEarth}
                          onChange={(e) => handleUpdate('insulationLiveEarth', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="insulationNeutralEarth">Neutral-Earth</Label>
                        <Input
                          id="insulationNeutralEarth"
                          type="number"
                          step="0.1"
                          placeholder="MΩ"
                          value={formData.insulationNeutralEarth}
                          onChange={(e) => handleUpdate('insulationNeutralEarth', e.target.value)}
                        />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Minimum acceptable: 1.0MΩ (BS 7671 Regulation 612.3.2)
                    </p>
                  </div>

                  <Separator />

                  {/* Earth Electrode Resistance */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-sm">Earth Electrode Resistance Test</h4>
                    <div className="max-w-xs">
                      <Label htmlFor="earthElectrodeResistance">Electrode Resistance (Ω)</Label>
                      <Input
                        id="earthElectrodeResistance"
                        type="text"
                        placeholder="e.g., 45.2 or N/A"
                        value={formData.earthElectrodeResistance}
                        onChange={(e) => handleUpdate('earthElectrodeResistance', e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Required for TT earthing systems. Enter "N/A" if not applicable (BS 7671 Reg 612.7)
                      </p>
                    </div>
                  </div>

                  <Separator />

                  {/* Polarity */}
                  <div>
                    <h4 className="font-medium text-sm mb-2">Polarity Test</h4>
                    <div className="max-w-xs">
                      <Label htmlFor="polarity">Polarity *</Label>
                      <Select value={formData.polarity} onValueChange={(value) => handleUpdate('polarity', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select result" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border z-50">
                          <SelectItem value="correct">✓ Correct</SelectItem>
                          <SelectItem value="incorrect">✗ Incorrect</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground mt-1">
                        Verify correct phase/neutral connections (BS 7671 Reg 612.6)
                      </p>
                    </div>
                  </div>
                </div>

                {/* LIVE TESTS Section */}
                <div className="rounded-lg p-6 space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="h-5 w-5" />
                    <h3 className="text-lg font-semibold">Live Tests (Circuit Energised)</h3>
                  </div>

                  {/* Earth Fault Loop Impedance */}
                  <div className="bg-card/50 rounded-lg p-6 border border-border space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-elec-yellow"></div>
                        <h4 className="font-medium text-sm">Earth Fault Loop Impedance (Zs)</h4>
                      </div>
                      {formData.earthFaultLoopImpedance && formData.maxPermittedZs && 
                       validateTestResult('earthFaultLoopImpedance', formData.earthFaultLoopImpedance) && (
                        <Badge className="bg-green-600 text-foreground">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Pass
                        </Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative">
                        <Label htmlFor="earthFaultLoopImpedance">Measured Zs (Ω) *</Label>
                        <Input
                          id="earthFaultLoopImpedance"
                          type="number"
                          step="0.01"
                          placeholder="e.g., 0.45"
                          value={formData.earthFaultLoopImpedance}
                          onChange={(e) => handleUpdate('earthFaultLoopImpedance', e.target.value)}
                          className={`font-mono ${
                            formData.earthFaultLoopImpedance && formData.maxPermittedZs && validateTestResult('earthFaultLoopImpedance', formData.earthFaultLoopImpedance)
                              ? 'border-green-500/50 focus:border-green-500'
                              : !validateTestResult('earthFaultLoopImpedance', formData.earthFaultLoopImpedance) && formData.maxPermittedZs
                              ? 'border-red-500 focus:border-red-500'
                              : ''
                          }`}
                        />
                        {formData.earthFaultLoopImpedance && formData.maxPermittedZs && validateTestResult('earthFaultLoopImpedance', formData.earthFaultLoopImpedance) && (
                          <CheckCircle className="absolute right-3 top-9 h-4 w-4 text-green-500 success-icon" />
                        )}
                        <p className="text-xs text-muted-foreground mt-1">
                          Earth fault loop impedance (BS 7671 Reg 612.9)
                        </p>
                      </div>
                      <div>
                        <Label htmlFor="maxPermittedZs">Max Permitted Zs (Ω)</Label>
                        <Input
                          id="maxPermittedZs"
                          type="number"
                          step="0.01"
                          placeholder="e.g., 2.30"
                          value={formData.maxPermittedZs}
                          onChange={(e) => handleUpdate('maxPermittedZs', e.target.value)}
                          className="font-mono"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          From BS 7671 Appendix 3 (auto-filled)
                        </p>
                      </div>
                    </div>
                    {formData.earthFaultLoopImpedance && formData.maxPermittedZs && !validateTestResult('earthFaultLoopImpedance', formData.earthFaultLoopImpedance) && (
                      <Alert className="border-red-500/50 bg-red-500/10 fade-in-up">
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                        <AlertDescription className="text-xs">
                          <strong>Zs value exceeds maximum permitted ({formData.maxPermittedZs} Ω)</strong>
                          <br />
                          Measured: {formData.earthFaultLoopImpedance} Ω. This installation does not comply with BS 7671 and requires remedial work.
                        </AlertDescription>
                      </Alert>
                    )}
                    {formData.maxPermittedZs && (
                      <p className="text-xs text-muted-foreground">
                        Max permitted: {formData.maxPermittedZs}Ω (BS 7671 Table 41.3)
                      </p>
                    )}
                  </div>

                  <Separator />

                  {/* Prospective Fault Current */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-sm">Prospective Fault Current (PFC)</h4>
                    <div className="max-w-xs">
                      <Label htmlFor="prospectiveFaultCurrent">PFC (kA)</Label>
                      <Input
                        id="prospectiveFaultCurrent"
                        type="number"
                        step="0.1"
                        placeholder="kA value"
                        value={formData.prospectiveFaultCurrent}
                        onChange={(e) => handleUpdate('prospectiveFaultCurrent', e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Verify protective device has adequate breaking capacity
                      </p>
                    </div>
                  </div>

                  <Separator />

                  {/* Phase Rotation Test */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-sm">Phase Rotation Test</h4>
                    <div className="max-w-xs">
                      <Label htmlFor="phaseRotation">Phase Rotation</Label>
                      <Select 
                        value={formData.phaseRotation} 
                        onValueChange={(value) => handleUpdate('phaseRotation', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select result" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border z-50">
                          <SelectItem value="correct">✓ Correct (L1-L2-L3)</SelectItem>
                          <SelectItem value="incorrect">✗ Incorrect</SelectItem>
                          <SelectItem value="na">N/A (Single Phase)</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground mt-1">
                        Required for three-phase circuits. Select "N/A" for single phase (BS 7671 Reg 612.12)
                      </p>
                    </div>
                  </div>

                  <Separator />


                  {/* RCD/RCBO Testing */}
                  {(formData.protectiveDeviceType === 'rcbo' ||
                    formData.protectionRcd || 
                    formData.protectionRcbo) && (
                    <>
                      <Separator />
                      
                      <div className="space-y-4 bg-card/50 rounded-lg p-6 border border-border">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5"></div>
                          <div className="space-y-4 flex-1">
                            <h4 className="font-medium text-sm">
                              {formData.protectionRcbo ? 'RCBO Testing (RCD + Overcurrent)' : 'RCD Testing'}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {formData.protectionRcbo 
                                ? 'RCBOs combine RCD and MCB protection - test both functions (BS 7671 Reg 643.10)'
                                : 'Test RCD protection using 1×IΔn test (BS 7671 Reg 643.10)'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="rcdRating">RCD Rating (mA)</Label>
                            <Select value={formData.rcdRating} onValueChange={(value) => handleUpdate('rcdRating', value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select rating" />
                              </SelectTrigger>
                              <SelectContent className="bg-card border-border z-50">
                                <SelectItem value="30">30mA</SelectItem>
                                <SelectItem value="100">100mA</SelectItem>
                                <SelectItem value="300">300mA</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <Label htmlFor="rcdOneX">RCD 1×IΔn Trip Time (ms)</Label>
                            <Input
                              id="rcdOneX"
                              type="number"
                              step="1"
                              placeholder="Max 300ms"
                              value={formData.rcdOneX}
                              onChange={(e) => handleUpdate('rcdOneX', e.target.value)}
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              ≤300ms for general use, ≤40ms for special locations
                            </p>
                          </div>
                          
                          {formData.protectionRcbo && (
                            <div>
                              <Label htmlFor="rcboTripTime">RCBO Overcurrent Trip Test (ms) - Optional</Label>
                              <Input
                                id="rcboTripTime"
                                type="number"
                                step="1"
                                placeholder="e.g. 150"
                                value={formData.rcboTripTime}
                                onChange={(e) => handleUpdate('rcboTripTime', e.target.value)}
                              />
                              <p className="text-xs text-muted-foreground mt-1">
                                Test MCB function of RCBO using test button or load
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  {/* AFDD Testing - Conditional on AFDD Protection */}
                  {formData.protectionAfdd && (
                    <>
                      <Separator />
                      
                      <div className="space-y-4 bg-card/50 rounded-lg p-6 border border-border">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-amber-400 mt-1.5"></div>
                          <div className="space-y-4 flex-1">
                            <h4 className="font-medium text-sm">AFDD (Arc Fault Detection Device) Testing</h4>
                            <p className="text-xs text-muted-foreground">
                              AFDDs must be tested using the device test button to verify correct operation (BS 7671 Reg 643.10, BS EN 62606)
                            </p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="afddTestButton">AFDD Test Button Operation</Label>
                            <Select 
                              value={formData.afddTestButton} 
                              onValueChange={(value) => handleUpdate('afddTestButton', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select result" />
                              </SelectTrigger>
                              <SelectContent className="bg-card border-border z-50">
                                <SelectItem value="satisfactory">✓ Satisfactory</SelectItem>
                                <SelectItem value="unsatisfactory">✗ Unsatisfactory</SelectItem>
                              </SelectContent>
                            </Select>
                            <p className="text-xs text-muted-foreground mt-1">
                              Device must trip when test button is pressed
                            </p>
                          </div>
                          
                          <div>
                            <Label htmlFor="afddTripTime">AFDD Trip Time (ms) - Optional</Label>
                            <Input
                              id="afddTripTime"
                              type="number"
                              step="1"
                              placeholder="e.g. 200"
                              value={formData.afddTripTime}
                              onChange={(e) => handleUpdate('afddTripTime', e.target.value)}
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              Some testers can measure AFDD trip time
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* SPD Testing - Conditional on SPD Protection */}
                  {formData.protectionSpd && (
                    <>
                      <Separator />
                      
                      <div className="space-y-4 bg-card/50 rounded-lg p-6 border border-border">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-elec-yellow mt-1.5"></div>
                          <div className="space-y-4 flex-1">
                            <h4 className="font-medium text-sm">SPD (Surge Protection Device) Testing</h4>
                            <p className="text-xs text-muted-foreground">
                              SPDs must be inspected and tested to verify correct installation and operation (BS 7671 Reg 534.4, BS EN 62305)
                            </p>
                          </div>
                        </div>
                        
                        <div className="max-w-xs">
                          <Label htmlFor="spdTestingOverall">SPD Testing Result</Label>
                          <Select 
                            value={
                              formData.spdIndicatorStatus === 'normal' && 
                              formData.spdTestButton === 'satisfactory' && 
                              formData.spdVisualInspection === 'satisfactory' 
                                ? 'all-ok' 
                                : formData.spdIndicatorStatus === 'na' && 
                                  formData.spdTestButton === 'na' && 
                                  formData.spdVisualInspection === 'na'
                                  ? 'na'
                                  : 'issue'
                            }
                            onValueChange={(value) => {
                              if (value === 'all-ok') {
                                handleUpdate('spdIndicatorStatus', 'normal');
                                handleUpdate('spdTestButton', 'satisfactory');
                                handleUpdate('spdVisualInspection', 'satisfactory');
                              } else if (value === 'na') {
                                handleUpdate('spdIndicatorStatus', 'na');
                                handleUpdate('spdTestButton', 'na');
                                handleUpdate('spdVisualInspection', 'na');
                              }
                              // For 'issue', leave fields for manual entry below
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select result" />
                            </SelectTrigger>
                            <SelectContent className="bg-card border-border z-50">
                              <SelectItem value="all-ok">✓ All Satisfactory</SelectItem>
                              <SelectItem value="issue">✗ Issue Found</SelectItem>
                              <SelectItem value="na">N/A</SelectItem>
                            </SelectContent>
                          </Select>
                          <p className="text-xs text-muted-foreground mt-1">
                            Overall SPD testing outcome
                          </p>
                        </div>
                      </div>
                    </>
                  )}

                  <Separator />

                  {/* Functional Testing */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-sm">Functional Testing</h4>
                    <div className="max-w-xs">
                      <Label htmlFor="functionalTesting">Test Result</Label>
                      <Select value={formData.functionalTesting} onValueChange={(value) => handleUpdate('functionalTesting', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select result" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border z-50">
                          <SelectItem value="satisfactory">✓ Satisfactory</SelectItem>
                          <SelectItem value="unsatisfactory">✗ Unsatisfactory</SelectItem>
                          <SelectItem value="na">N/A</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground mt-1">
                        Test operation of switches, controls, and protective devices
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Test Equipment */}
        <Card id="section-equipment" className="overflow-hidden bg-card border border-border">
          <Collapsible open={openSections.equipment} onOpenChange={() => toggleSection('equipment')}>
            <SectionHeader 
              title="Test Equipment Used" 
              icon={Activity}
              isOpen={openSections.equipment}
              color="purple-500"
              completionPercentage={sectionCompletion.equipment}
              isComplete={sectionCompletion.equipment === 100}
            />
            <CollapsibleContent>
              <CardContent className="space-y-6 p-6">
                {/* Consolidated Test Equipment Section */}
                <div className="bg-card/50 rounded-lg p-6 space-y-4">
                  <h4 className="font-medium text-sm text-primary">Primary Test Equipment</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="testEquipmentModel">Test Instrument Make/Model</Label>
                      {formData.testEquipmentModel !== 'Other' ? (
                        <Select 
                          value={formData.testEquipmentModel || ''} 
                          onValueChange={(value) => {
                            handleUpdate('testEquipmentModel', value);
                            if (value !== 'Other' && formData.customTestEquipment) {
                              handleUpdate('customTestEquipment', '');
                            }
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select test instrument..." />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-border z-50 max-h-64">
                            {commonTestInstruments.map((instrument) => (
                              <SelectItem key={instrument.value} value={instrument.value}>
                                {instrument.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="space-y-4">
                          <Input
                            id="customTestEquipment"
                            value={formData.customTestEquipment || ''}
                            onChange={(e) => handleUpdate('customTestEquipment', e.target.value)}
                            placeholder="Enter custom instrument details..."
                          />
                          <button
                            type="button"
                            onClick={() => handleUpdate('testEquipmentModel', '')}
                            className="text-xs text-primary hover:text-primary/80 underline"
                          >
                            Back to dropdown selection
                          </button>
                        </div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="testEquipmentSerial">Serial Number</Label>
                      <Input
                        id="testEquipmentSerial"
                        placeholder="Serial number"
                        value={formData.testEquipmentSerial}
                        onChange={(e) => handleUpdate('testEquipmentSerial', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="testEquipmentCalDate">Calibration Date</Label>
                      <Input
                        id="testEquipmentCalDate"
                        type="date"
                        value={formData.testEquipmentCalDate}
                        onChange={(e) => handleUpdate('testEquipmentCalDate', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="testTemperature">Test Temperature (°C)</Label>
                      <Input
                        id="testTemperature"
                        placeholder="e.g., 20°C"
                        value={formData.testTemperature}
                        onChange={(e) => handleUpdate('testTemperature', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>


        {/* Declaration */}
        <Card id="section-declaration" className="overflow-hidden bg-card border border-border">
          <Collapsible open={openSections.declaration} onOpenChange={() => toggleSection('declaration')}>
            <SectionHeader 
              title="Declaration" 
              icon={CheckCircle}
              isOpen={openSections.declaration}
              color="green-600"
              completionPercentage={sectionCompletion.declaration}
              isComplete={sectionCompletion.declaration === 100}
            />
            <CollapsibleContent>
              <CardContent className="space-y-6 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="electricianName">Name of Electrician *</Label>
                    <Input
                      id="electricianName"
                      placeholder="Full name"
                      value={formData.electricianName}
                      onChange={(e) => handleUpdate('electricianName', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="position">Position/Role *</Label>
                    <Input
                      id="position"
                      placeholder="e.g., Electrician, Supervisor"
                      value={formData.position}
                      onChange={(e) => handleUpdate('position', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="qualificationLevel">Qualification Level</Label>
                    <Select value={formData.qualificationLevel} onValueChange={(value) => handleUpdate('qualificationLevel', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select qualification" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="level2">City & Guilds Level 2</SelectItem>
                        <SelectItem value="level3">City & Guilds Level 3</SelectItem>
                        <SelectItem value="nvq2">NVQ Level 2</SelectItem>
                        <SelectItem value="nvq3">NVQ Level 3</SelectItem>
                        <SelectItem value="degree">Electrical Engineering Degree</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="schemeProvider">Competent Person Scheme</Label>
                    <Select value={formData.schemeProvider} onValueChange={(value) => handleUpdate('schemeProvider', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select scheme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="niceic">NICEIC</SelectItem>
                        <SelectItem value="napit">NAPIT</SelectItem>
                        <SelectItem value="elecsa">ELECSA</SelectItem>
                        <SelectItem value="stroma">Stroma</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="registrationNumber">Registration Number</Label>
                    <Input
                      id="registrationNumber"
                      placeholder="Registration/membership number"
                      value={formData.registrationNumber}
                      onChange={(e) => handleUpdate('registrationNumber', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="signatureDate">Signature Date *</Label>
                    <Input
                      id="signatureDate"
                      type="date"
                      value={formData.signatureDate}
                      onChange={(e) => handleUpdate('signatureDate', e.target.value)}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">I/We certify that:</h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="bs7671Compliance"
                        checked={formData.bs7671Compliance}
                        onCheckedChange={(checked) => handleUpdate('bs7671Compliance', checked)}
                      />
                      <Label htmlFor="bs7671Compliance" className="text-sm leading-relaxed">
                        The work described in this certificate has been designed, constructed, inspected and tested in accordance with BS 7671:2018+A3:2024 *
                      </Label>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="testResultsAccurate"
                        checked={formData.testResultsAccurate}
                        onCheckedChange={(checked) => handleUpdate('testResultsAccurate', checked)}
                      />
                      <Label htmlFor="testResultsAccurate" className="text-sm leading-relaxed">
                        The test results recorded in this certificate are accurate and relate to the work described *
                      </Label>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="workSafety"
                        checked={formData.workSafety}
                        onCheckedChange={(checked) => handleUpdate('workSafety', checked)}
                      />
                      <Label htmlFor="workSafety" className="text-sm leading-relaxed">
                        The work is safe to energise and use *
                      </Label>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="partPNotification"
                        checked={formData.partPNotification}
                        onCheckedChange={(checked) => handleUpdate('partPNotification', checked)}
                      />
                      <Label htmlFor="partPNotification" className="text-sm leading-relaxed">
                        Where applicable, Part P notification has been submitted or is not required
                      </Label>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Digital Signature */}
                <div className="space-y-4">
                  <SignatureInput
                    label="Digital Signature"
                    value={formData.signature}
                    onChange={(signature) => handleUpdate('signature', signature)}
                    placeholder="Sign here or type your name"
                    required={false}
                  />
                </div>

                <div>
                  <Label htmlFor="additionalNotes">Additional Notes</Label>
                  <Textarea
                    id="additionalNotes"
                    placeholder="Any additional information or comments..."
                    value={formData.additionalNotes}
                    onChange={(e) => handleUpdate('additionalNotes', e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>


        {/* Validation Summary */}
        {getCompletionPercentage() >= 80 && getCompletionPercentage() < 100 && (
          <Alert className="border-amber-500/50 bg-amber-500/10 fade-in-up">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <AlertDescription>
              <p className="font-medium mb-2 text-amber-300">Almost there! Complete these required fields:</p>
              <ul className="text-sm space-y-1 ml-4 text-amber-200">
                {!formData.certificateNumber && <li>• Certificate reference number</li>}
                {!formData.clientName && <li>• Client name</li>}
                {!formData.propertyAddress && <li>• Property address</li>}
                {!formData.workDate && <li>• Date work commenced</li>}
                {!formData.workDescription && <li>• Work description</li>}
                {!formData.earthingArrangement && <li>• Earthing arrangement</li>}
                {!formData.circuitDesignation && <li>• Circuit designation</li>}
                {!formData.protectiveDeviceType && <li>• Protective device type</li>}
                {!formData.polarity && <li>• Polarity test result</li>}
                {!formData.electricianName && <li>• Electrician name</li>}
                {!formData.position && <li>• Position/role</li>}
                {!formData.signatureDate && <li>• Signature date</li>}
                {!formData.bs7671Compliance && <li>• BS 7671 compliance declaration</li>}
                {!formData.testResultsAccurate && <li>• Test results accuracy declaration</li>}
                {!formData.workSafety && <li>• Work safety declaration</li>}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {/* BS 7671 Compliance Checkpoint - Before PDF Generation */}
        <div className="mt-8">
          <ComplianceCheckpoint
            items={getComplianceItems().items}
            overallScore={getComplianceItems().overallScore}
            onItemClick={scrollToSection}
            formData={formData}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-6">
          <MinorWorksPdfGenerator
            formData={formData}
            isFormValid={isFormValid() && canGenerateCertificate()}
            reportId={currentReportId || formData.certificateNumber}
            userId={userId || undefined}
            onSuccess={async () => {
              try {
                // Get current user
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
                
                // Create completed data object
                const completedData = {
                  ...formData,
                  certificateGenerated: true,
                  certificateGeneratedAt: new Date().toISOString(),
                  status: 'completed'
                };
                
                // Directly update database with completed status
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
                  throw updateError;
                }
                
                
                // Update local state
                setFormData(completedData);
                
                // Invalidate dashboard queries to refresh
                queryClient.invalidateQueries({ queryKey: ['recent-certificates'] });
                queryClient.invalidateQueries({ queryKey: ['my-reports'] });
                queryClient.invalidateQueries({ queryKey: ['customer-reports'] });
                
                // Clear draft after successful completion
                discardDraft();
                
                toast({
                  title: "Certificate Completed",
                  description: "Your Minor Works certificate has been marked as completed.",
                });
              } catch (error) {
                toast({
                  title: "Status Update Failed",
                  description: "Certificate generated but status may not have updated.",
                  variant: "destructive",
                });
              }
            }}
          />
          
          <Button 
            variant="outline" 
            onClick={handleSaveDraft}
            className="h-12"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
        </div>

        {!isFormValid() && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Please complete all required fields (*) before generating the certificate.
            </AlertDescription>
          </Alert>
        )}
        </div>
      </div>

      </div>
      
      <StartNewEICRDialog
        isOpen={showStartNewDialog}
        onClose={() => setShowStartNewDialog(false)}
        onConfirm={confirmStartNew}
        onDuplicate={handleDuplicate}
        hasUnsavedChanges={hasUnsavedChanges}
      />

      <DraftRecoveryDialog
        open={showDraftRecovery}
        reportType="minor-works"
        draftPreview={draftPreview}
        onRecover={handleRecoverDraft}
        onDiscard={handleDiscardDraft}
      />
    </div>
  );
};

export default MinorWorksForm;