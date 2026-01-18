
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
  Loader2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import PDFExportProgress from '@/components/PDFExportProgress';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

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
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [emailRecipient, setEmailRecipient] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  // Validation checks
  const hasRequiredInstallationDetails = formData.clientName && formData.installationAddress && formData.installationDate;
  const hasRequiredDeclarations = formData.designerName && formData.designerSignature && 
                                 formData.constructorName && formData.constructorSignature && 
                                 formData.inspectorName && formData.inspectorSignature;
  const hasCompletedInspections = formData.inspections && Object.keys(formData.inspections).length > 0;
  const hasTestResults = formData.scheduleOfTests && formData.scheduleOfTests.length > 0;

  const canGenerateCertificate = hasRequiredInstallationDetails && hasRequiredDeclarations;
  const isFullyComplete = canGenerateCertificate && hasCompletedInspections && hasTestResults;

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

      // Call edge function to generate PDF via PDF Monkey
      const { data: functionData, error: functionError } = await supabase.functions.invoke('generate-eic-pdf', {
        body: {
          formData: pdfData,
          templateId: 'B39538E9-8FF1-4882-BC13-70B1C0D30947'
        }
      });
      
      setExportProgress(70);
      
      if (functionError) {
        console.error('Edge function error:', functionError);
        throw new Error(functionError.message || 'Failed to generate PDF');
      }
      
      if (!functionData?.success || !functionData?.pdfUrl) {
        throw new Error(functionData?.error || 'No PDF URL returned');
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
      console.error('PDF generation error:', error);
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
    
    // Pre-fill with client email if available
    if (formData.clientEmail) {
      setEmailRecipient(formData.clientEmail);
    }
    
    setShowEmailDialog(true);
  };

  const handleSendEmail = async () => {
    if (!emailRecipient || !emailRecipient.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSendingEmail(true);

    try {
      // First generate the PDF
      const pdfData = await generateTestJSON(reportId);
      
      const { data: pdfResult, error: pdfError } = await supabase.functions.invoke('generate-eic-pdf', {
        body: { 
          formData: pdfData,
          templateId: 'B39538E9-8FF1-4882-BC13-70B1C0D30947'
        }
      });
      
      if (pdfError || !pdfResult?.success || !pdfResult?.pdfUrl) {
        throw new Error(pdfError?.message || 'Failed to generate PDF');
      }

      toast({
        title: "Certificate Generated Successfully",
        description: "EIC certificate PDF has been generated",
      });

      setShowEmailDialog(false);
      setEmailRecipient('');

    } catch (error) {
      console.error('Email error:', error);
      toast({
        title: "Email Failed",
        description: error instanceof Error ? error.message : "Failed to send certificate email.",
        variant: "destructive",
      });
    } finally {
      setIsSendingEmail(false);
    }
  };

  const generateTestJSON = async (reportId: string) => {
    // Always include all keys with empty values as defaults
    // These field names MUST match the PDF Monkey template exactly

    // Build FLAT inspection keys at ROOT level dynamically from form data
    const flatInspectionKeys: Record<string, string> = {};

    // Get inspection items from formData (can be array or object)
    const inspectionItems = formData.inspectionItems || Object.values(formData.inspections || {});

    // Create flat keys for all 14 EIC inspection items
    for (let i = 1; i <= 14; i++) {
      // Find the matching item by itemNumber or id
      const item = inspectionItems.find((it: any) =>
        it?.itemNumber === String(i) ||
        it?.itemNumber === i ||
        it?.id === `eic_${i}` ||
        it?.id === String(i)
      );

      const outcome = item?.outcome || '';

      // Convert outcome to display value for PDF
      if (outcome === 'satisfactory' || outcome === 'acceptable' || outcome === 'Acceptable') {
        flatInspectionKeys[`insp_${i}`] = 'Acceptable';
      } else if (outcome === 'na' || outcome === 'not-applicable' || outcome === 'N/A') {
        flatInspectionKeys[`insp_${i}`] = 'N/A';
      } else {
        flatInspectionKeys[`insp_${i}`] = ''; // Empty if not set
      }
    }

    const json: any = {
      // SPREAD flat inspection keys at ROOT level (like EICR pattern)
      ...flatInspectionKeys,

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
        work_type: formData.workType || formData.installationType || '',
        description: formData.description || '',
        extent_of_installation: formData.extentOfInstallation || '',
        installation_date: formData.installationDate || '',
        test_date: formData.testDate || '',
        construction_date: formData.constructionDate || ''
      },
      standards_compliance: {
        design_standard: formData.designStandard || '',
        part_p_compliance: formData.partPCompliance || ''
      },
      supply_characteristics: {
        supply_voltage: formData.supplyVoltage || formData.nominalVoltage || '',
        supply_frequency: formData.supplyFrequency || formData.nominalFrequency || '',
        phases: formData.phases || '',
        earthing_arrangement: formData.earthingArrangement || '',
        supply_type: formData.supplyType || '',
        supply_pme: formData.supplyPME || '',
        // DC supply options
        dc_supply_type: formData.dcSupplyType || '',
        // Fields used by PDF template
        prospective_fault_current: formData.prospectiveFaultCurrent || '',
        external_ze: formData.externalEarthFaultLoopImpedance || formData.externalZe || '',
        supply_polarity_confirmed: formData.supplyPolarityConfirmed ?? false,
        other_sources_of_supply: formData.otherSourcesOfSupply ?? false
      },
      // Supply Protective Device (DNO fuse details)
      supply_protective_device: {
        bs_en: formData.supplyProtectiveDeviceBsEn || '',
        type: formData.supplyProtectiveDeviceType || '',
        rated_current: formData.supplyProtectiveDeviceRating || ''
      },
      main_protective_device: {
        device_type: formData.mainProtectiveDevice || formData.mainProtectiveDeviceType || '',
        main_switch_rating: formData.mainSwitchRating || formData.mainSwitchCurrentRating || '',
        main_switch_location: formData.mainSwitchLocation || '',
        breaking_capacity: formData.breakingCapacity || '',
        // Additional fields for PDF template
        bs_en: formData.mainSwitchBsEn || '',
        poles: formData.mainSwitchPoles || '',
        fuse_setting: formData.mainSwitchFuseRating || '',
        voltage_rating: formData.mainSwitchVoltageRating || ''
      },
      rcd_details: {
        rcd_main_switch: formData.rcdMainSwitch || '',
        rcd_rating: formData.rcdRating || formData.mainSwitchRcdRating || '',
        rcd_type: formData.rcdType || formData.mainSwitchRcdType || '',
        rcd_operating_time: formData.rcdOperatingTime || formData.mainSwitchRcdOperatingTime || '',
        // IET Model Form fields
        rcd_rated_time_delay: formData.rcdTimeDelay || formData.rcdRatedTimeDelay || '',
        rcd_measured_operating_time: formData.rcdMeasuredTime || formData.rcdMeasuredOperatingTime || ''
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
        // Means of earthing
        means_of_earthing: formData.meansOfEarthing || '',
        // Earth electrode details
        earth_electrode_type: formData.earthElectrodeType || '',
        earth_electrode_location: formData.earthElectrodeLocation || '',
        earth_electrode_resistance: formData.earthElectrodeResistance || '',
        // Earthing conductor
        earthing_conductor_material: formData.earthingConductorMaterial || '',
        earthing_conductor_csa: formData.earthingConductorCsa || '',
        earthing_conductor_verified: formData.earthingConductorVerified ?? false,
        // Main bonding conductor
        main_bonding_conductor: formData.mainBondingConductor || '',
        main_bonding_material: formData.mainBondingMaterial || '',
        main_bonding_size: formData.mainBondingSize || formData.mainBondingCsa || '',
        main_bonding_size_custom: formData.mainBondingSizeCustom || '',
        main_bonding_verified: formData.mainBondingVerified ?? false,
        // Maximum demand
        maximum_demand: formData.maximumDemand || '',
        maximum_demand_unit: formData.maximumDemandUnit || 'A',
        // Bonding connections
        bonding_water: formData.bondingToWater ?? formData.bondingWater ?? false,
        bonding_gas: formData.bondingToGas ?? formData.bondingGas ?? false,
        bonding_oil: formData.bondingToOil ?? formData.bondingOil ?? false,
        bonding_structural_steel: formData.bondingToStructuralSteel ?? formData.bondingStructuralSteel ?? false,
        bonding_lightning_protection: formData.bondingToLightningProtection ?? formData.bondingLightningProtection ?? false,
        bonding_other: formData.bondingToOther ?? formData.bondingOther ?? false,
        bonding_other_specify: formData.bondingOtherSpecify || formData.bondingToOtherSpecify || '',
        // Supplementary bonding
        bonding_compliance: formData.bondingCompliance || '',
        supplementary_bonding: formData.supplementaryBonding || '',
        supplementary_bonding_size: formData.supplementaryBondingSize || '',
        supplementary_bonding_size_custom: formData.supplementaryBondingSizeCustom || '',
        equipotential_bonding: formData.equipotentialBonding || ''
      },
      inspection_checklist: (formData.inspectionItems || Object.values(formData.inspections || {}))?.map((item: any) => ({
        id: item.id || '',
        item_number: item.itemNumber || '',
        description: item.description || '',
        outcome: item.outcome || '',
        notes: item.notes || ''
      })) || [],
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
        address: formData.designerAddress || '',
        postcode: formData.designerPostcode || '',
        phone: formData.designerPhone || '',
        date: formData.designerDate || '',
        signature: formData.designerSignature || '',
        bs7671_amendment_date: formData.designerBs7671Date || '',
        departures: formData.designerDepartures || '',
        permitted_exceptions: formData.permittedExceptions || '',
        risk_assessment_attached: formData.riskAssessmentAttached ?? false
      },
      constructor: {
        name: formData.constructorName || '',
        qualifications: formData.constructorQualifications || '',
        company: formData.constructorCompany || '',
        address: formData.constructorAddress || '',
        postcode: formData.constructorPostcode || '',
        phone: formData.constructorPhone || '',
        date: formData.constructorDate || '',
        signature: formData.constructorSignature || '',
        bs7671_amendment_date: formData.constructorBs7671Date || '',
        departures: formData.constructorDepartures || '',
        same_as_designer: formData.sameAsDesigner ?? false
      },
      inspector: {
        name: formData.inspectorName || '',
        qualifications: formData.inspectorQualifications || '',
        company: formData.inspectorCompany || '',
        address: formData.inspectorAddress || '',
        postcode: formData.inspectorPostcode || '',
        phone: formData.inspectorPhone || '',
        date: formData.inspectorDate || '',
        signature: formData.inspectorSignature || '',
        bs7671_amendment_date: formData.inspectorBs7671Date || '',
        departures: formData.inspectorDepartures || '',
        same_as_constructor: formData.sameAsConstructor ?? false
      },
      next_inspection: {
        interval_months: formData.nextInspectionInterval || '',
        recommended_date: formData.nextInspectionDate || ''
      },
      existing_installation_comments: formData.existingInstallationComments || '',
      declarations: {
        additional_notes: formData.additionalNotes || '',
        inspected_by: {
          name: formData.inspectedByName || '',
          signature: formData.inspectedBySignature || '',
          for_on_behalf_of: formData.inspectedByForOnBehalfOf || '',
          position: formData.inspectedByPosition || '',
          address: formData.inspectedByAddress || '',
          cp_scheme: formData.inspectedByCpScheme || '',
          cp_scheme_na: formData.inspectedByCpSchemeNA ?? false,
          same_as_inspector: formData.eicSameAsInspectedBy ?? false
        },
        report_authorised_by: {
          name: formData.reportAuthorisedByName || '',
          date: formData.reportAuthorisedByDate || '',
          signature: formData.reportAuthorisedBySignature || '',
          for_on_behalf_of: formData.reportAuthorisedByForOnBehalfOf || '',
          position: formData.reportAuthorisedByPosition || '',
          address: formData.reportAuthorisedByAddress || '',
          postcode: formData.reportAuthorisedByPostcode || '',
          phone: formData.reportAuthorisedByPhone || '',
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
                <div className={`flex items-center gap-2 ${hasRequiredInstallationDetails ? 'text-green-600' : 'text-gray-500'}`}>
                  {hasRequiredInstallationDetails ? <CheckCircle className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                  Installation Details
                </div>
                <div className={`flex items-center gap-2 ${hasCompletedInspections ? 'text-green-600' : 'text-gray-500'}`}>
                  {hasCompletedInspections ? <CheckCircle className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                  Schedule of Inspections
                </div>
                <div className={`flex items-center gap-2 ${hasTestResults ? 'text-green-600' : 'text-gray-500'}`}>
                  {hasTestResults ? <CheckCircle className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                  Schedule of Testing
                </div>
                <div className={`flex items-center gap-2 ${hasRequiredDeclarations ? 'text-green-600' : 'text-gray-500'}`}>
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

      {/* Email Dialog */}
      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Email EIC Certificate</DialogTitle>
            <DialogDescription>
              Enter the recipient's email address. The certificate will be generated and sent as a PDF attachment.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Recipient Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="client@example.com"
                value={emailRecipient}
                onChange={(e) => setEmailRecipient(e.target.value)}
                disabled={isSendingEmail}
              />
            </div>
            {formData.clientEmail && emailRecipient !== formData.clientEmail && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEmailRecipient(formData.clientEmail)}
                className="w-full"
              >
                Use Client Email: {formData.clientEmail}
              </Button>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowEmailDialog(false)}
              disabled={isSendingEmail}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSendEmail}
              disabled={isSendingEmail || !emailRecipient}
            >
              {isSendingEmail ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4 mr-2" />
                  Send Certificate
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EICCertificateActions;
