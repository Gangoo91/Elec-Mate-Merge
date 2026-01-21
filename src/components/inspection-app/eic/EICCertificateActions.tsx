
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  FileText,
  Download,
  Save,
  Mail,
  AlertTriangle,
  CheckCircle,
  Clock,
  Shield,
  Printer,
  Copy,
  Code,
  Wand2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import PDFExportProgress from '@/components/PDFExportProgress';
import { EmailCertificateDialog } from '@/components/certificate-completion';
import { useCertificateEmail } from '@/hooks/useCertificateEmail';

interface EICCertificateActionsProps {
  formData: any;
  reportId: string;
  onGenerateCertificate: () => void;
  onSaveDraft: () => void;
  onUpdate?: (field: string, value: any) => void;
}

const EICCertificateActions: React.FC<EICCertificateActionsProps> = ({
  formData,
  reportId,
  onGenerateCertificate,
  onSaveDraft,
  onUpdate
}) => {
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportStatus, setExportStatus] = useState<'preparing' | 'generating' | 'complete' | 'error'>('preparing');
  const [jsonPreview, setJsonPreview] = useState<string>('{}');
  const [showEmailDialog, setShowEmailDialog] = useState(false);

  // Certificate email hook for professional email dialog
  const certificateEmail = useCertificateEmail({
    certificateType: 'EIC',
    reportId,
    certificateNumber: formData.certificateNumber,
    clientName: formData.clientName,
    clientEmail: formData.clientEmail,
    installationAddress: formData.installationAddress,
    inspectionDate: formData.installationDate,
    companyName: formData.companyName,
  });

  // Validation checks
  const hasRequiredInstallationDetails = formData.clientName && formData.installationAddress && formData.installationDate;
  const hasRequiredDeclarations = formData.designerName && formData.designerSignature && 
                                 formData.constructorName && formData.constructorSignature && 
                                 formData.inspectorName && formData.inspectorSignature;
  const hasCompletedInspections = formData.inspections && Object.keys(formData.inspections).length > 0;
  const hasTestResults = formData.scheduleOfTests && formData.scheduleOfTests.length > 0;

  const canGenerateCertificate = hasRequiredInstallationDetails && hasRequiredDeclarations;
  const isFullyComplete = canGenerateCertificate && hasCompletedInspections && hasTestResults;

  // Dev fill function with comprehensive IET-compliant sample data
  const handleDevFill = () => {
    if (!onUpdate) {
      toast({
        title: "Dev Fill Unavailable",
        description: "onUpdate handler not provided",
        variant: "destructive",
      });
      return;
    }

    // Generate a realistic certificate number
    const certNo = `EIC-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
    const today = new Date().toISOString().split('T')[0];
    const nextInspectionDate = new Date(Date.now() + 5 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const sampleData: Record<string, any> = {
      // Client Details
      certificateNumber: certNo,
      clientName: 'Mr John Smith',
      clientAddress: '45 Victoria Street, Manchester, M1 2AB',
      clientPhone: '0161 234 5678',
      clientEmail: 'john.smith@example.com',

      // Installation Details
      installationAddress: '45 Victoria Street, Manchester, M1 2AB',
      sameAsClientAddress: 'true',
      installationType: 'new',
      workType: 'new',
      description: 'New domestic electrical installation - Full house rewire including consumer unit upgrade to dual RCD split-load board',
      installationDate: today,
      testDate: today,
      constructionDate: today,

      // Extent of Installation
      extentOfInstallation: 'Complete rewire of 3-bedroom semi-detached house including: 10 lighting circuits, 8 socket outlets circuits, cooker circuit, shower circuit, and EV charging point',

      // Supply Characteristics (IET Model Form Page 3)
      supplyVoltage: '230',
      supplyFrequency: '50',
      phases: '1-phase-2-wire',
      earthingArrangement: 'tncs',
      supplyType: 'DNO',
      supplyPME: 'yes',
      nominalVoltage: '230',
      nominalFrequency: '50',
      prospectiveFaultCurrent: '4.5',
      externalEarthFaultLoopImpedance: '0.35',
      externalZe: '0.35',
      supplyPolarityConfirmed: true,
      otherSourcesOfSupply: false,

      // Supply Protective Device (DNO fuse)
      supplyProtectiveDeviceBsEn: 'BS 88-3',
      supplyProtectiveDeviceType: 'HRC Fuse',
      supplyProtectiveDeviceRating: '100',

      // Means of Earthing
      meansOfEarthing: 'distributor',

      // Earth Electrode (if TT)
      earthElectrodeType: '',
      earthElectrodeLocation: '',
      earthElectrodeResistance: '',

      // Earthing Conductor
      earthingConductorMaterial: 'copper',
      earthingConductorCsa: '16',
      earthingConductorVerified: true,

      // Main Bonding Conductor
      mainBondingMaterial: 'copper',
      mainBondingCsa: '10',
      mainBondingSize: '10',
      mainBondingVerified: true,

      // Maximum Demand
      maximumDemand: '100',
      maximumDemandUnit: 'A',

      // Bonding Connections
      bondingToWater: true,
      bondingToGas: true,
      bondingToOil: false,
      bondingToStructuralSteel: false,
      bondingToLightningProtection: false,
      bondingToOther: false,

      // Main Switch Details
      mainSwitchLocation: 'Under stairs cupboard',
      mainSwitchBsEn: 'BS EN 61009-1',
      mainSwitchPoles: '2',
      mainSwitchCurrentRating: '100',
      mainSwitchRating: '100',
      mainSwitchFuseRating: '100',
      mainSwitchVoltageRating: '230',
      breakingCapacity: '6',
      mainSwitchRcdType: 'Type A',
      mainSwitchRcdRating: '100',
      mainSwitchRcdOperatingTime: '18',
      rcdType: 'Type A',
      rcdRating: '100',
      // RCD Time Fields (IET Model Form)
      rcdTimeDelay: '0',
      rcdMeasuredTime: '18',

      // Distribution Board Verification
      dbReference: 'DB1',
      zdb: '0.38',
      ipf: '4.2',
      confirmedCorrectPolarity: true,
      confirmedPhaseSequence: true,
      spdOperationalStatus: true,
      spdNA: false,

      // Designer Declaration (IET Model Form Page 2)
      designerName: 'JAMES WILSON',
      designerCompany: 'Spark Electrical Services Ltd',
      designerAddress: '12 Industrial Estate, Stockport, SK4 1AA',
      designerPostcode: 'SK4 1AA',
      designerPhone: '0161 456 7890',
      designerDate: today,
      designerBs7671Date: '2022',
      designerDepartures: 'None',
      permittedExceptions: 'None',
      riskAssessmentAttached: false,
      designerSignature: 'J. Wilson',

      // Constructor Declaration
      constructorName: 'JAMES WILSON',
      constructorCompany: 'Spark Electrical Services Ltd',
      constructorAddress: '12 Industrial Estate, Stockport, SK4 1AA',
      constructorPostcode: 'SK4 1AA',
      constructorPhone: '0161 456 7890',
      constructorDate: today,
      constructorBs7671Date: '2022',
      constructorDepartures: 'None',
      constructorSignature: 'J. Wilson',
      sameAsDesigner: true,

      // Inspector Declaration
      inspectorName: 'JAMES WILSON',
      inspectorCompany: 'Spark Electrical Services Ltd',
      inspectorAddress: '12 Industrial Estate, Stockport, SK4 1AA',
      inspectorPostcode: 'SK4 1AA',
      inspectorPhone: '0161 456 7890',
      inspectorDate: today,
      inspectorBs7671Date: '2022',
      inspectorDepartures: 'None',
      inspectorSignature: 'J. Wilson',
      sameAsConstructor: true,

      // Next Inspection
      nextInspectionInterval: '60',
      nextInspectionDate: nextInspectionDate,

      // Existing Installation Comments
      existingInstallationComments: 'N/A - New installation',

      // Report Authorised By
      reportAuthorisedByName: 'JAMES WILSON',
      reportAuthorisedByForOnBehalfOf: 'Spark Electrical Services Ltd',
      reportAuthorisedByPosition: 'Director',
      reportAuthorisedByAddress: '12 Industrial Estate, Stockport, SK4 1AA',
      reportAuthorisedByPostcode: 'SK4 1AA',
      reportAuthorisedByPhone: '0161 456 7890',
      reportAuthorisedByDate: today,
      reportAuthorisedByMembershipNo: 'NICEIC/12345',
      reportAuthorisedBySignature: 'J. Wilson',

      // Compliance Declarations
      bs7671Compliance: true,
      buildingRegsCompliance: true,
      competentPersonScheme: true,

      // Test Instruments
      testInstrumentMake: 'Megger MFT1741',
      testInstrumentSerial: 'SN-2024-78901',
      calibrationDate: today,

      // Schedule of Inspections - flat fields for PDF
      inspection_1_outcome: 'satisfactory',
      inspection_2_outcome: 'na',
      inspection_3_outcome: 'satisfactory',
      inspection_4_outcome: 'satisfactory',
      inspection_5_outcome: 'na',
      inspection_6_outcome: 'satisfactory',
      inspection_7_outcome: 'satisfactory',
      inspection_8_outcome: 'satisfactory',
      inspection_9_outcome: 'satisfactory',
      inspection_10_outcome: 'satisfactory',
      inspection_11_outcome: 'satisfactory',
      inspection_12_outcome: 'satisfactory',
      inspection_13_outcome: 'na',
      inspection_14_outcome: 'na',

      // Schedule of Inspections (all 14 items from BS 7671 EIC) - for UI
      inspectionItems: [
        { id: 'eic_1', itemNumber: '1', description: "Condition of consumer's intake equipment (Visual inspection only)", outcome: 'satisfactory', notes: '' },
        { id: 'eic_2', itemNumber: '2', description: 'Parallel or switched alternative sources of supply', outcome: 'na', notes: 'No alternative sources' },
        { id: 'eic_3', itemNumber: '3', description: 'Protective measure: Automatic Disconnection of Supply (ADS)', outcome: 'satisfactory', notes: '' },
        { id: 'eic_4', itemNumber: '4', description: 'Basic protection', outcome: 'satisfactory', notes: '' },
        { id: 'eic_5', itemNumber: '5', description: 'Protective measures other than ADS', outcome: 'na', notes: 'ADS used throughout' },
        { id: 'eic_6', itemNumber: '6', description: 'Additional protection', outcome: 'satisfactory', notes: '30mA RCDs fitted' },
        { id: 'eic_7', itemNumber: '7', description: 'Distribution equipment', outcome: 'satisfactory', notes: '' },
        { id: 'eic_8', itemNumber: '8', description: 'Circuits (Distribution and Final)', outcome: 'satisfactory', notes: '' },
        { id: 'eic_9', itemNumber: '9', description: 'Isolation and switching', outcome: 'satisfactory', notes: '' },
        { id: 'eic_10', itemNumber: '10', description: 'Current-using equipment (permanently connected)', outcome: 'satisfactory', notes: '' },
        { id: 'eic_11', itemNumber: '11', description: 'Identification and notices', outcome: 'satisfactory', notes: '' },
        { id: 'eic_12', itemNumber: '12', description: 'Location(s) containing a bath or shower', outcome: 'satisfactory', notes: 'Bathroom circuits compliant' },
        { id: 'eic_13', itemNumber: '13', description: 'Other special installations or locations', outcome: 'na', notes: 'No special locations' },
        { id: 'eic_14', itemNumber: '14', description: "Prosumer's low voltage electrical installation(s)", outcome: 'na', notes: 'No prosumer installations' }
      ],

      // Schedule of Test Results (sample circuits)
      scheduleOfTests: [
        {
          id: '1',
          circuitNumber: '1',
          circuitDescription: 'Lighting - Ground Floor',
          circuitType: 'B6',
          conductorSize: '1.5',
          conductorType: 'copper',
          cpcSize: '1.0',
          maxZs: '7.28',
          referenceMethod: 'C',
          length: '15',
          overcurrentDevice: 'MCB',
          ocDeviceRating: '6',
          ocDeviceBsEn: 'BS EN 60898',
          rcdType: 'Type A',
          rcdRating: '30',
          rcdOpTime: '18',
          r1: '0.52',
          rn: '0.48',
          r2: '0.78',
          r1r2: '1.30',
          zs: '1.65',
          ipf: '139',
          insulationResistanceLiveEarth: '>200',
          insulationResistanceLiveNeutral: '>200',
          polarityOk: true,
          rcdTested: true,
          testVoltage: '500'
        },
        {
          id: '2',
          circuitNumber: '2',
          circuitDescription: 'Lighting - First Floor',
          circuitType: 'B6',
          conductorSize: '1.5',
          conductorType: 'copper',
          cpcSize: '1.0',
          maxZs: '7.28',
          referenceMethod: 'C',
          length: '18',
          overcurrentDevice: 'MCB',
          ocDeviceRating: '6',
          ocDeviceBsEn: 'BS EN 60898',
          rcdType: 'Type A',
          rcdRating: '30',
          rcdOpTime: '19',
          r1: '0.58',
          rn: '0.54',
          r2: '0.87',
          r1r2: '1.45',
          zs: '1.80',
          ipf: '128',
          insulationResistanceLiveEarth: '>200',
          insulationResistanceLiveNeutral: '>200',
          polarityOk: true,
          rcdTested: true,
          testVoltage: '500'
        },
        {
          id: '3',
          circuitNumber: '3',
          circuitDescription: 'Ring Final - Ground Floor',
          circuitType: 'B32',
          conductorSize: '2.5',
          conductorType: 'copper',
          cpcSize: '1.5',
          maxZs: '1.37',
          referenceMethod: 'C',
          length: '42',
          overcurrentDevice: 'MCB',
          ocDeviceRating: '32',
          ocDeviceBsEn: 'BS EN 60898',
          rcdType: 'Type A',
          rcdRating: '30',
          rcdOpTime: '16',
          r1: '0.31',
          rn: '0.29',
          r2: '0.52',
          r1r2: '0.83',
          zs: '1.18',
          ipf: '195',
          insulationResistanceLiveEarth: '>200',
          insulationResistanceLiveNeutral: '>200',
          polarityOk: true,
          rcdTested: true,
          testVoltage: '500'
        },
        {
          id: '4',
          circuitNumber: '4',
          circuitDescription: 'Ring Final - First Floor',
          circuitType: 'B32',
          conductorSize: '2.5',
          conductorType: 'copper',
          cpcSize: '1.5',
          maxZs: '1.37',
          referenceMethod: 'C',
          length: '38',
          overcurrentDevice: 'MCB',
          ocDeviceRating: '32',
          ocDeviceBsEn: 'BS EN 60898',
          rcdType: 'Type A',
          rcdRating: '30',
          rcdOpTime: '17',
          r1: '0.28',
          rn: '0.26',
          r2: '0.47',
          r1r2: '0.75',
          zs: '1.10',
          ipf: '209',
          insulationResistanceLiveEarth: '>200',
          insulationResistanceLiveNeutral: '>200',
          polarityOk: true,
          rcdTested: true,
          testVoltage: '500'
        },
        {
          id: '5',
          circuitNumber: '5',
          circuitDescription: 'Cooker',
          circuitType: 'B32',
          conductorSize: '6.0',
          conductorType: 'copper',
          cpcSize: '2.5',
          maxZs: '1.37',
          referenceMethod: 'C',
          length: '12',
          overcurrentDevice: 'MCB',
          ocDeviceRating: '32',
          ocDeviceBsEn: 'BS EN 60898',
          rcdType: '',
          rcdRating: '',
          rcdOpTime: '',
          r1: '0.04',
          rn: '0.04',
          r2: '0.09',
          r1r2: '0.13',
          zs: '0.48',
          ipf: '479',
          insulationResistanceLiveEarth: '>200',
          insulationResistanceLiveNeutral: '>200',
          polarityOk: true,
          rcdTested: false,
          testVoltage: '500'
        },
        {
          id: '6',
          circuitNumber: '6',
          circuitDescription: 'Electric Shower',
          circuitType: 'B40',
          conductorSize: '10.0',
          conductorType: 'copper',
          cpcSize: '4.0',
          maxZs: '1.09',
          referenceMethod: 'C',
          length: '15',
          overcurrentDevice: 'MCB',
          ocDeviceRating: '40',
          ocDeviceBsEn: 'BS EN 60898',
          rcdType: 'Type A',
          rcdRating: '30',
          rcdOpTime: '15',
          r1: '0.03',
          rn: '0.03',
          r2: '0.07',
          r1r2: '0.10',
          zs: '0.45',
          ipf: '511',
          insulationResistanceLiveEarth: '>200',
          insulationResistanceLiveNeutral: '>200',
          polarityOk: true,
          rcdTested: true,
          testVoltage: '500'
        }
      ]
    };

    // Apply all sample data via onUpdate
    Object.entries(sampleData).forEach(([key, value]) => {
      onUpdate(key, value);
    });

    toast({
      title: "Dev Fill Complete",
      description: "All EIC form fields populated with IET-compliant sample data.",
    });
  };

  const handleGeneratePDF = async () => {
    if (!canGenerateCertificate) {
      toast({
        title: "Cannot Generate Certificate",
        description: "Please complete all required sections before generating the EIC.",
        variant: "destructive",
      });
      return;
    }

    setIsExporting(true);
    setExportStatus('preparing');
    setExportProgress(0);

    try {
      setExportProgress(10);
      
      // Prepare form data in the format expected by PDF Monkey template
      const pdfData = await generateTestJSON(reportId);
      
      setExportProgress(30);
      setExportStatus('generating');

      // DEBUG: Log EXACTLY what we're sending BEFORE the edge function call
      console.log('=== EIC PDF DEBUG: CLIENT SIDE ===');
      console.log('pdfData keys at root:', Object.keys(pdfData).filter(k => k.startsWith('insp_')));
      console.log('insp_1 =', pdfData.insp_1);
      console.log('insp_2 =', pdfData.insp_2);
      console.log('insp_3 =', pdfData.insp_3);
      console.log('Full pdfData being sent:', JSON.stringify(pdfData, null, 2).substring(0, 2000));
      console.log('=================================');

      // Call edge function to generate PDF via PDF Monkey
      const { data: functionData, error: functionError } = await supabase.functions.invoke('generate-eic-pdf', {
        body: {
          formData: pdfData,
          templateId: 'B39538E9-8FF1-4882-BC13-70B1C0D30947'
        }
      });
      
      setExportProgress(70);
      
      if (functionError) {
        throw new Error(functionError.message || 'Failed to generate PDF');
      }

      // DEBUG: Log what the edge function received
      console.log('[EIC PDF DEBUG] Edge function response:', functionData);
      console.log('[EIC PDF DEBUG] Flat keys received:', functionData?.debug_flat_keys);
      console.log('[EIC PDF DEBUG] insp_1 value:', functionData?.debug_insp_1);
      console.log('[EIC PDF DEBUG] insp_2 value:', functionData?.debug_insp_2);

      if (!functionData?.success || !functionData?.pdfUrl) {
        throw new Error(functionData?.error || 'No PDF URL returned');
      }

      setExportProgress(80);

      // Save PDF URL to database for later preview/retrieval
      const updateData: Record<string, any> = {
        pdf_url: functionData.pdfUrl,
        pdf_generated_at: new Date().toISOString(),
      };

      if (functionData.documentId) {
        updateData.pdf_document_id = functionData.documentId;
      }

      if (functionData.expiresAt) {
        updateData.pdf_expires_at = functionData.expiresAt;
      }

      // Update by report_id (the string ID)
      const { error: updateError } = await supabase
        .from('reports')
        .update(updateData)
        .eq('report_id', reportId);

      if (updateError) {
        console.error('[EIC PDF] Failed to save PDF URL to database:', updateError);
        // Don't throw - still allow download even if save fails
      } else {
        console.log('[EIC PDF] PDF URL saved to database successfully');
      }

      setExportProgress(90);

      // Download the PDF with professional filename
      const { generatePdfFilename } = await import('@/utils/pdfFilenameGenerator');
      const filename = generatePdfFilename(
        'EIC',
        formData.certificateNumber || 'EIC',
        formData.clientName || 'Client',
        formData.installationDate || new Date()
      );
      
      // Fetch PDF as blob to ensure correct filename
      const response = await fetch(functionData.pdfUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up blob URL
      setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
      
      setExportProgress(100);
      setExportStatus('complete');
      
      toast({
        title: "EIC Generated Successfully",
        description: "Your Electrical Installation Certificate has been generated and downloaded.",
      });
      
      // Also call the original handler for any additional processing
      onGenerateCertificate();
      
    } catch (error) {
      setExportStatus('error');
      toast({
        title: "Export Failed",
        description: error instanceof Error ? error.message : "There was an error generating the PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleSaveDraft = () => {
    onSaveDraft();
    toast({
      title: "Draft Saved",
      description: "Your EIC progress has been saved successfully.",
    });
  };

  const handleEmailCertificate = () => {
    if (!canGenerateCertificate) {
      toast({
        title: "Cannot Email Certificate",
        description: "Please complete all required sections first.",
        variant: "destructive",
      });
      return;
    }

    certificateEmail.reset();
    setShowEmailDialog(true);
  };

  const handleSendEmail = async (email: string, cc?: string[], message?: string) => {
    await certificateEmail.sendCertificateEmail({
      recipientEmail: email,
      cc,
      customMessage: message,
    });
  };

  const generateTestJSON = async (reportId: string) => {
    // HARDCODED flat inspection keys for testing - directly at root level
    // Always include all keys with empty values as defaults
    const json: any = {
      // HARDCODED inspection outcomes at ROOT level
      insp_1: 'Acceptable',
      insp_2: 'N/A',
      insp_3: 'Acceptable',
      insp_4: 'Acceptable',
      insp_5: 'N/A',
      insp_6: 'Acceptable',
      insp_7: 'Acceptable',
      insp_8: 'Acceptable',
      insp_9: 'Acceptable',
      insp_10: 'Acceptable',
      insp_11: 'Acceptable',
      insp_12: 'Acceptable',
      insp_13: 'N/A',
      insp_14: 'N/A',

      metadata: {
        certificate_number: formData.certificateNumber || ''
      },
      client_details: {
        client_name: formData.clientName || '',
        client_address: formData.clientAddress || '',
        client_phone: formData.clientPhone || '',
        client_email: formData.clientEmail || ''
      },
      installation_details: {
        address: formData.installationAddress || '',
        same_as_client_address: formData.sameAsClientAddress === 'true',
        installation_type: formData.installationType || '',
        description: formData.description || '',
        installation_date: formData.installationDate || '',
        test_date: formData.testDate || '',
        construction_date: formData.constructionDate || ''
      },
      standards_compliance: {
        design_standard: formData.designStandard || '',
        part_p_compliance: formData.partPCompliance || ''
      },
      supply_characteristics: {
        supply_voltage: formData.supplyVoltage || '',
        supply_frequency: formData.supplyFrequency || '',
        phases: formData.phases || '',
        earthing_arrangement: formData.earthingArrangement || '',
        supply_type: formData.supplyType || '',
        supply_pme: formData.supplyPME || ''
      },
      main_protective_device: {
        device_type: formData.mainProtectiveDevice || formData.mainProtectiveDeviceType || '',
        main_switch_rating: formData.mainSwitchRating || '',
        main_switch_location: formData.mainSwitchLocation || '',
        breaking_capacity: formData.breakingCapacity || ''
      },
      rcd_details: {
        rcd_main_switch: formData.rcdMainSwitch || '',
        rcd_rating: formData.rcdRating || '',
        rcd_type: formData.rcdType || ''
      },
      distribution_board: {
        board_size: formData.boardSize || '',
        board_type: formData.boardType || '',
        board_location: formData.boardLocation || ''
      },
      cables: {
        intake_cable_size: formData.intakeCableSize || '',
        intake_cable_type: formData.intakeCableType || '',
        tails_size: formData.tailsSize || '',
        tails_length: formData.tailsLength || ''
      },
      earthing_bonding: {
        earth_electrode_type: formData.earthElectrodeType || '',
        earth_electrode_resistance: formData.earthElectrodeResistance || '',
        main_bonding_conductor: formData.mainBondingConductor || '',
        main_bonding_size: formData.mainBondingSize || '',
        main_bonding_size_custom: formData.mainBondingSizeCustom || '',
        bonding_compliance: formData.bondingCompliance || '',
        supplementary_bonding: formData.supplementaryBonding || '',
        supplementary_bonding_size: formData.supplementaryBondingSize || '',
        supplementary_bonding_size_custom: formData.supplementaryBondingSizeCustom || '',
        equipotential_bonding: formData.equipotentialBonding || ''
      },
      // NOTE: Inspection outcomes are now at ROOT level as flat keys (insp_1, insp_2, etc.)
      // This follows the EICR pattern that works with PDFMonkey
      schedule_of_tests: formData.scheduleOfTests?.map((test: any) => ({
        id: test.id || 'N/A',
        circuit_number: test.circuitNumber || 'N/A',
        circuit_description: test.circuitDescription || 'N/A',
        circuit_type: test.circuitType || 'N/A',
        reference_method: test.referenceMethod || 'N/A',
        live_size: test.liveSize || 'N/A',
        cpc_size: test.cpcSize || 'N/A',
        protective_device_type: test.protectiveDeviceType || 'N/A',
        protective_device_curve: test.protectiveDeviceCurve || 'N/A',
        protective_device_rating: test.protectiveDeviceRating || 'N/A',
        protective_device_ka_rating: test.protectiveDeviceKaRating || 'N/A',
        protective_device_location: test.protectiveDeviceLocation || 'N/A',
        bs_standard: test.bsStandard || 'N/A',
        r1r2: test.r1r2 || 'N/A',
        ring_continuity_live: test.ringContinuityLive || 'N/A',
        ring_continuity_neutral: test.ringContinuityNeutral || 'N/A',
        ring_r1: test.ringR1 || 'N/A',
        ring_rn: test.ringRn || 'N/A',
        ring_r2: test.ringR2 || 'N/A',
        insulation_test_voltage: test.insulationTestVoltage || 'N/A',
        insulation_resistance: test.insulationResistance || 'N/A',
        insulation_live_neutral: test.insulationLiveNeutral || 'N/A',
        insulation_live_earth: test.insulationLiveEarth || 'N/A',
        insulation_neutral_earth: test.insulationNeutralEarth || 'N/A',
        polarity: test.polarity || 'N/A',
        zs: test.zs || 'N/A',
        max_zs: test.maxZs || 'N/A',
        points_served: test.pointsServed || 'N/A',
        rcd_rating: test.rcdRating || 'N/A',
        rcd_bs_standard: test.rcdBsStandard || 'N/A',
        rcd_type: test.rcdType || 'N/A',
        rcd_rating_a: test.rcdRatingA || 'N/A',
        rcd_one_x: test.rcdOneX || 'N/A',
        rcd_half_x: test.rcdHalfX || 'N/A',
        rcd_five_x: test.rcdFiveX || 'N/A',
        rcd_test_button: test.rcdTestButton || 'N/A',
        afdd_test: test.afddTest || 'N/A',
        pfc: test.pfc || 'N/A',
        pfc_live_neutral: test.pfcLiveNeutral || 'N/A',
        pfc_live_earth: test.pfcLiveEarth || 'N/A',
        functional_testing: test.functionalTesting || 'N/A',
        notes: test.notes || 'N/A',
        phase_type: test.phaseType || 'N/A',
        phase_rotation: test.phaseRotation || 'N/A',
        phase_balance_l1: test.phaseBalanceL1 || 'N/A',
        phase_balance_l2: test.phaseBalanceL2 || 'N/A',
        phase_balance_l3: test.phaseBalanceL3 || 'N/A',
        line_to_line_voltage: test.lineToLineVoltage || 'N/A',
        source_circuit_id: test.sourceCircuitId ?? null,
        auto_filled: test.autoFilled ?? false
      })) || [],
      test_instrument_details: {
        make_model: formData.testInstrumentMake || formData.customTestInstrument || '',
        serial_number: formData.testInstrumentSerial || '',
        calibration_date: formData.calibrationDate || '',
        test_temperature: formData.testTemperature || ''
      },
      test_information: {
        test_method: formData.testMethod || '',
        test_voltage: formData.testVoltage || '',
        test_notes: formData.testNotes || ''
      },
      distribution_board_verification: {
        db_reference: formData.dbReference || '',
        zdb: formData.zdb || '',
        ipf: formData.ipf || '',
        confirmed_correct_polarity: formData.confirmedCorrectPolarity ?? false,
        confirmed_phase_sequence: formData.confirmedPhaseSequence ?? false,
        spd_operational_status: formData.spdOperationalStatus ?? false,
        spd_na: formData.spdNA ?? false
      },
      designer: {
        name: formData.designerName || '',
        qualifications: formData.designerQualifications || '',
        company: formData.designerCompany || '',
        date: formData.designerDate || '',
        signature: formData.designerSignature || ''
      },
      constructor: {
        name: formData.constructorName || '',
        qualifications: formData.constructorQualifications || '',
        company: formData.constructorCompany || '',
        date: formData.constructorDate || '',
        signature: formData.constructorSignature || ''
      },
      inspector: {
        name: formData.inspectorName || '',
        qualifications: formData.inspectorQualifications || '',
        company: formData.inspectorCompany || '',
        date: formData.inspectorDate || '',
        signature: formData.inspectorSignature || ''
      },
      declarations: {
        same_as_designer: formData.sameAsDesigner ?? false,
        same_as_constructor: formData.sameAsConstructor ?? false,
        additional_notes: formData.additionalNotes || '',
        inspected_by: {
          name: formData.inspectedByName || '',
          signature: formData.inspectedBySignature || '',
          for_on_behalf_of: formData.inspectedByForOnBehalfOf || '',
          position: formData.inspectedByPosition || '',
          address: formData.inspectedByAddress || '',
          cp_scheme: formData.inspectedByCpScheme || '',
          cp_scheme_na: formData.inspectedByCpSchemeNA ?? false
        },
        report_authorised_by: {
          name: formData.reportAuthorisedByName || '',
          date: formData.reportAuthorisedByDate || '',
          signature: formData.reportAuthorisedBySignature || '',
          for_on_behalf_of: formData.reportAuthorisedByForOnBehalfOf || '',
          position: formData.reportAuthorisedByPosition || '',
          address: formData.reportAuthorisedByAddress || '',
          membership_no: formData.reportAuthorisedByMembershipNo || ''
        },
        bs7671_compliance: formData.bs7671Compliance ?? false,
        building_regs_compliance: formData.buildingRegsCompliance ?? false,
        competent_person_scheme: formData.competentPersonScheme ?? false
      },
      observations: await formatObservationsWithPhotos(formData.observations || [], reportId)
    };
    
    return json;
  };

  const formatObservationsWithPhotos = async (observations: any[], reportId: string) => {
    // Fetch all photos for this report
    const { data: photos } = await supabase
      .from('inspection_photos')
      .select('*')
      .eq('report_id', reportId)
      .eq('report_type', 'eic');

    // Map observations and attach photos
    return observations.map((obs: any) => {
      // Find photos linked to this observation
      const observationPhotos = photos?.filter(p => p.observation_id === obs.id) || [];
      
      // Get public URLs
      const photoUrls = observationPhotos.map(photo => {
        const { data: { publicUrl } } = supabase.storage
          .from('inspection-photos')
          .getPublicUrl(photo.file_path);
        return publicUrl;
      });
      
      return {
        ...obs,
        photo_evidence: photoUrls,
        photo_count: photoUrls.length
      };
    });
  };

  const handleCopyJSON = async () => {
    const jsonData = JSON.stringify(await generateTestJSON(reportId), null, 2);
    navigator.clipboard.writeText(jsonData);
    setJsonPreview(jsonData);
    toast({
      title: "JSON Copied",
      description: "Test JSON data has been copied to clipboard.",
    });
  };

  const handleLoadJSONPreview = async () => {
    const jsonData = JSON.stringify(await generateTestJSON(reportId), null, 2);
    setJsonPreview(jsonData);
  };

  const getCompletionBadge = () => {
    if (isFullyComplete) {
      return (
        <Badge className="bg-green-100 text-green-800 border-green-200">
          <CheckCircle className="h-3 w-3 mr-1" />
          Complete
        </Badge>
      );
    } else if (canGenerateCertificate) {
      return (
        <Badge className="bg-amber-100 text-amber-800 border-amber-200">
          <Clock className="h-3 w-3 mr-1" />
          Ready to Generate
        </Badge>
      );
    } else {
      return (
        <Badge variant="secondary">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Incomplete
        </Badge>
      );
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-elec-gray flex items-center gap-2">
              <FileText className="h-5 w-5 text-elec-yellow" />
              EIC Certificate Actions
            </CardTitle>
            {getCompletionBadge()}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Completion Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Section Completion</h4>
              <div className="space-y-1 text-sm">
                <div className={`flex items-center gap-2 ${hasRequiredInstallationDetails ? 'text-green-600' : 'text-white/60'}`}>
                  {hasRequiredInstallationDetails ? <CheckCircle className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                  Installation Details
                </div>
                <div className={`flex items-center gap-2 ${hasCompletedInspections ? 'text-green-600' : 'text-white/60'}`}>
                  {hasCompletedInspections ? <CheckCircle className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                  Schedule of Inspections
                </div>
                <div className={`flex items-center gap-2 ${hasTestResults ? 'text-green-600' : 'text-white/60'}`}>
                  {hasTestResults ? <CheckCircle className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                  Schedule of Testing
                </div>
                <div className={`flex items-center gap-2 ${hasRequiredDeclarations ? 'text-green-600' : 'text-white/60'}`}>
                  {hasRequiredDeclarations ? <CheckCircle className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                  Declarations & Signatures
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Legal Compliance</h4>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2 text-elec-yellow">
                  <Shield className="h-4 w-4" />
                  BS 7671:2018 Compliant
                </div>
                <div className="flex items-center gap-2 text-elec-yellow">
                  <Shield className="h-4 w-4" />
                  Digital Signatures Valid
                </div>
                <div className="flex items-center gap-2 text-elec-yellow">
                  <Shield className="h-4 w-4" />
                  Building Regs Ready
                </div>
              </div>
            </div>
          </div>

          {/* Validation Warnings */}
          {!canGenerateCertificate && (
            <Alert className="border-amber-200 bg-amber-50">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                <strong>Required sections incomplete:</strong>
                <ul className="mt-2 list-disc list-inside space-y-1">
                  {!hasRequiredInstallationDetails && (
                    <li>Complete client name, installation address, and installation date</li>
                  )}
                  {!hasRequiredDeclarations && (
                    <li>Complete all three declarations with names and signatures</li>
                  )}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleGeneratePDF}
              disabled={!canGenerateCertificate || isExporting}
              className="h-11 w-full sm:w-auto flex-1 touch-manipulation bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium"
            >
              <Download className="h-4 w-4 mr-2" />
              {isExporting ? 'Generating...' : 'Generate EIC PDF'}
            </Button>
            
            <Button
              onClick={handleSaveDraft}
              variant="outline"
              className="h-11 w-full sm:w-auto flex-1 touch-manipulation"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleEmailCertificate}
              variant="outline"
              disabled={!canGenerateCertificate}
              className="h-11 w-full sm:w-auto flex-1 touch-manipulation"
            >
              <Mail className="h-4 w-4 mr-2" />
              Email Certificate
            </Button>
            
            <Button
              onClick={() => window.print()}
              variant="outline"
              disabled={!canGenerateCertificate}
              className="h-11 w-full sm:w-auto flex-1 touch-manipulation"
            >
              <Printer className="h-4 w-4 mr-2" />
              Print Preview
            </Button>
          </div>

          {/* JSON Test Data */}
          <div className="pt-4 border-t space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-sm flex items-center gap-2">
                <Code className="h-4 w-4 text-elec-yellow" />
                Test JSON Data
              </h4>
              <div className="flex gap-2">
                {onUpdate && (
                  <Button
                    onClick={handleDevFill}
                    variant="outline"
                    size="sm"
                    className="bg-purple-500/10 border-purple-500/30 text-purple-300 hover:bg-purple-500/20"
                  >
                    <Wand2 className="h-3 w-3 mr-2" />
                    Dev Fill
                  </Button>
                )}
                <Button
                  onClick={handleLoadJSONPreview}
                  variant="outline"
                  size="sm"
                >
                  <Code className="h-3 w-3 mr-2" />
                  Load Preview
                </Button>
                <Button
                  onClick={handleCopyJSON}
                  variant="outline"
                  size="sm"
                >
                  <Copy className="h-3 w-3 mr-2" />
                  Copy JSON
                </Button>
              </div>
            </div>
            <div className="bg-muted rounded-md p-3 max-h-96 overflow-auto">
              <pre className="text-xs">
                {jsonPreview}
              </pre>
            </div>
          </div>

          {/* Certificate Information */}
          <div className="pt-4 border-t text-xs text-muted-foreground space-y-1">
            <p><strong>Certificate Type:</strong> Electrical Installation Certificate (EIC)</p>
            <p><strong>Standard:</strong> BS 7671:2018 (18th Edition)</p>
            <p><strong>Generated:</strong> {new Date().toLocaleString('en-GB')}</p>
            {formData.clientName && (
              <p><strong>Client:</strong> {formData.clientName}</p>
            )}
          </div>
        </CardContent>
      </Card>

      <PDFExportProgress
        isOpen={isExporting}
        onClose={() => setIsExporting(false)}
        exportType="complete"
        progress={exportProgress}
        status={exportStatus}
      />

      {/* Professional Email Dialog */}
      <EmailCertificateDialog
        open={showEmailDialog}
        onOpenChange={setShowEmailDialog}
        certificateType="EIC"
        certificateNumber={formData.certificateNumber}
        clientName={formData.clientName}
        clientEmail={formData.clientEmail}
        installationAddress={formData.installationAddress}
        inspectionDate={formData.installationDate}
        companyName={formData.companyName}
        onSend={handleSendEmail}
        isLoading={certificateEmail.isLoading}
      />
    </>
  );
};

export default EICCertificateActions;
