import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Copy, TestTube } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface TestPdfTemplateMappingProps {
  formData: any;
}

const TestPdfTemplateMapping: React.FC<TestPdfTemplateMappingProps> = ({ formData }) => {
  const [testPayload, setTestPayload] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  // Generate a sample test payload that matches the PDF Monkey template structure
  const generateTestPayload = () => {
    // Detect if this is EIC form data based on presence of EIC-specific fields
    const isEICForm = formData.designerName || formData.constructorName || formData.inspectorName;
    
    const samplePayload = isEICForm ? generateEICPayload() : generateMinorWorksPayload();
    setTestPayload(JSON.stringify(samplePayload, null, 2));
  };

  const generateEICPayload = () => {
    return {
      certificate: {
        type: "EIC",
        number: formData.certificateNumber || "EIC-2024-TEST123",
        issue_date: new Date().toLocaleDateString('en-GB'),
        generated_date: new Date().toISOString(),
      },
      client: {
        name: formData.clientName || "Test Client Ltd",
        address: formData.clientAddress || "123 Test Street, Test City, Test County",
        contact_person: formData.contactPerson || "Jane Smith",
      },
      installation: {
        address: formData.installationAddress || "123 Test Street, Test City, Test County",
        postcode: formData.postcode || "TE5 7IN",
        description: formData.installationDescription || "New electrical installation for residential property",
        purpose: formData.purposeOfInstallation || "Domestic dwelling",
      },
      supply: {
        voltage: formData.supplyVoltage || "230V",
        frequency: formData.frequency?.replace('Hz', '') || "50",
        phases: formData.supplyPhases === '1' ? 'Single Phase' : 'Three Phase',
        supply_type: formData.supplyType || "TN-C-S",
        external_fault_current: formData.externalFaultCurrent || "16kA",
      },
      earthing: {
        arrangement: formData.earthingArrangement || "TN-C-S (PME)",
        main_conductor_size: formData.mainEarthingConductorSize || "16mm²",
        main_conductor_type: formData.mainEarthingConductorType || "Copper",
        electrode_resistance: formData.electrodeResistance || "N/A",
      },
      bonding: {
        main_protective_size: formData.mainBondingConductorSize || "10mm²",
        water: Boolean(formData.bondingWater),
        gas: Boolean(formData.bondingGas),
        oil: Boolean(formData.bondingOil),
        structural: Boolean(formData.bondingStructural),
        other: Boolean(formData.bondingOther),
        other_description: formData.bondingOtherDescription || "",
      },
      circuits: formData.circuits?.map((circuit: any, index: number) => ({
        reference: circuit.circuitReference || `C${index + 1}`,
        description: circuit.description || `Circuit ${index + 1}`,
        type: circuit.type || "Lighting",
        protection: circuit.protection || "MCB",
        rating: circuit.rating || "6A",
        live_conductor: circuit.liveConductor || "1.5mm²",
        cpc_conductor: circuit.cpcConductor || "1.5mm²",
        method: circuit.installationMethod || "A",
        voltage_drop: circuit.voltageDrop || "2.3V",
        disconnection_time: circuit.disconnectionTime || "0.4s",
        zs: circuit.zs || "7.67Ω",
        test_results: {
          continuity: circuit.continuity || "0.85Ω",
          insulation_resistance: circuit.insulationResistance || ">999MΩ",
          polarity: circuit.polarity || "Correct",
          rcd_operation: circuit.rcdOperation || "25ms",
          rcd_bs_standard: circuit.rcdBsStandard || "BS EN 61008",
          rcd_type: circuit.rcdType || "AC",
          rcd_rating: circuit.rcdRating || "30mA",
          rcd_rating_a: circuit.rcdRatingA || "40A",
        }
      })) || [],
      inspection: {
        overall_assessment: formData.overallAssessment || "Satisfactory",
        defects_identified: Boolean(formData.defectsIdentified),
        remedial_work_required: Boolean(formData.remedialWorkRequired),
        next_inspection_due: formData.nextInspectionDue || new Date(Date.now() + 5 * 365 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB'),
      },
      observations: formData.observations?.map((obs: any) => ({
        code: obs.defectCode?.toUpperCase() || 'C3',
        description: obs.description || obs.item,
        location: obs.location || "General",
        recommendation: obs.recommendation || "Monitor",
        photo_evidence: obs.photoEvidence || [],
        photo_count: obs.photoEvidence?.length || 0
      })) || [],
      declarations: {
        designer: {
          name: formData.designerName || "John Designer",
          qualifications: formData.designerQualifications || "C&G 2391, IET Member",
          company: formData.designerCompany || "Design Electrical Ltd",
          date: formData.designerDate || new Date().toLocaleDateString('en-GB'),
          signature_url: formData.designerSignature || "",
        },
        constructor: {
          name: formData.constructorName || "Mike Constructor",
          qualifications: formData.constructorQualifications || "C&G Level 3, NICEIC",
          company: formData.constructorCompany || "Build Electrical Ltd",
          date: formData.constructorDate || new Date().toLocaleDateString('en-GB'),
          signature_url: formData.constructorSignature || "",
        },
        inspector: {
          name: formData.inspectorName || "Sarah Inspector",
          qualifications: formData.inspectorQualifications || "C&G 2391, Inspection Specialist",
          company: formData.inspectorCompany || "Test & Inspect Ltd",
          date: formData.inspectorDate || new Date().toLocaleDateString('en-GB'),
          signature_url: formData.inspectorSignature || "",
        }
      },
      compliance: {
        bs7671: Boolean(formData.bs7671Compliance),
        building_regulations: Boolean(formData.buildingRegsCompliance),
        competent_person_scheme: Boolean(formData.competentPersonScheme),
        additional_notes: formData.additionalNotes || "Test EIC certificate generated for template verification",
      },
      generated_at: new Date().toLocaleString('en-GB'),
    };
  };

  const generateMinorWorksPayload = () => {
    return {
      certificate: {
        number: formData.certificateNumber || "MW-2024-TEST123",
        issue_date: formData.workDate || "28/09/2024",
        generated_date: new Date().toISOString(),
      },
      client: {
        name: formData.clientName || "Test Client Ltd",
        person_ordering: formData.personOrderingWork || "John Smith",
      },
      installation: {
        address: formData.propertyAddress || "123 Test Street, Test City, Test County",
        postcode: formData.postcode || "TE5 7IN",
      },
      work: {
        date_commenced: formData.workDate || "28/09/2024",
        date_completed: formData.dateOfCompletion || "28/09/2024",
        type: formData.workType || "new-circuit",
        location: formData.workLocation || "Kitchen",
        description: formData.workDescription || "Installation of new 32A radial circuit for electric cooker",
        departures: formData.departuresFromBS7671 || "None",
      },
      inspection: {
        next_due: formData.nextInspectionDue || "28/09/2029",
      },
      contractor: {
        name: formData.contractorName || "Test Electrical Ltd",
        address: formData.contractorAddress || "456 Contractor Ave, Business Park",
      },
      supply: {
        voltage: formData.supplyVoltage || "230V",
        frequency: formData.frequency?.replace('Hz', '') || "50",
        phases: formData.supplyPhases === '1' ? 'Single Phase' : 'Three Phase',
      },
      earthing: {
        type: formData.earthingArrangement || "TN-C-S (PME)",
        main_conductor: formData.mainEarthingConductorSize || "16",
      },
      bonding: {
        main_protective: formData.mainBondingConductorSize || "10",
        water: Boolean(formData.bondingWater),
        gas: Boolean(formData.bondingGas),
        oil: Boolean(formData.bondingOil),
        structural: Boolean(formData.bondingStructural),
        other: Boolean(formData.bondingOther),
      },
      circuit: {
        db: formData.distributionBoard || "DB1",
        designation: formData.circuitDesignation || "C1",
        description: formData.circuitDescription || "Cooker circuit",
      },
      protection: {
        type: formData.protectiveDeviceType || "MCB Type B",
        rating: formData.protectiveDeviceRating || "32A",
        capacity: formData.protectiveDeviceKaRating || "6kA",
        rcd: Boolean(formData.rcdProtected),
        rcbo: Boolean(formData.rcbo),
        afdd: Boolean(formData.afdd),
        spd: Boolean(formData.spd),
      },
      cable: {
        live_size: formData.liveConductorSize || "6.0mm²",
        cpc_size: formData.cpcSize || "2.5mm²",
        type: formData.cableType || "Twin & Earth (T&E)",
        method: formData.installationMethod || "C - Clipped direct",
        reference: formData.referenceMethod || "C",
      },
      tests: {
        r1_r2: formData.continuityR1R2 || "0.85",
        polarity: formData.polarity || "Correct",
        functional: formData.functionalTesting || "Satisfactory",
        zs: formData.earthFaultLoopImpedance || "1.44",
        zs_max: formData.maxPermittedZs || "1.44",
        pfc: formData.prospectiveFaultCurrent || "2.3",
        ir_voltage: formData.insulationTestVoltage || "500V DC",
        ir_ln: formData.insulationLiveNeutral || ">999",
        ir_le: formData.insulationLiveEarth || ">999",
        ir_ne: formData.insulationNeutralEarth || ">999",
        rcd_present: Boolean(formData.rcdRating),
        rcd_rating: formData.rcdRating || "30",
        rcd_time: formData.rcdOperatingTime || "25",
        rcd_button: formData.rcdTestButton || "Satisfactory",
      },
      equipment: {
        model: formData.testEquipmentModel || "Megger MFT1741 - Multifunction Tester",
        serial: formData.testEquipmentSerial || "254561",
        calibration: formData.testEquipmentCalDate || "23/10/2026",
        temperature: formData.testTemperature || "20°C",
      },
      observations: formData.observations?.map((obs: any) => ({
        code: obs.defectCode?.toUpperCase() || 'C3',
        description: obs.description || obs.item,
        photo_evidence: obs.photoEvidence || [],
        photo_count: obs.photoEvidence?.length || 0
      })) || [],
      declaration: {
        name: formData.electricianName || "John Electrician",
        position: formData.position || "Qualified Electrician",
        qualification: formData.qualificationLevel || "City & Guilds Level 3",
        scheme: formData.schemeProvider || "NICEIC",
        registration: formData.registrationNumber || "TEST123456",
        date: formData.signatureDate || "28/09/2024",
        bs7671: Boolean(formData.bs7671Compliance),
        accurate: Boolean(formData.testResultsAccurate),
        safe: Boolean(formData.workSafety),
        partp: Boolean(formData.partPNotification),
        signature_url: formData.signatureUrl || "",
        notes: formData.additionalNotes || "Test certificate generated for template verification",
      },
      generated_at: new Date().toLocaleString('en-GB'),
    };
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(testPayload);
    toast({
      title: "Copied to Clipboard",
      description: "Test payload has been copied to your clipboard",
    });
  };

  const testPdfGeneration = async () => {
    if (!testPayload) {
      toast({
        title: "No Test Payload",
        description: "Please generate a test payload first",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const payload = JSON.parse(testPayload);
      // Get template ID from settings or use default
      const { offlineStorage } = await import('@/utils/offlineStorage');
      const credentials = await offlineStorage.getApiCredentials('pdfMonkey');
      const savedTemplateId = credentials.templateId;
      
      // Call the edge function with test data
      const { data: functionData, error: functionError } = await supabase.functions.invoke('generate-minor-works-pdf', {
        body: {
          formData: payload,
          templateId: savedTemplateId // Use configured template ID
        }
      });

      if (functionError) {
        console.error('Edge function error:', functionError);
        toast({
          title: "Test Failed",
          description: `Edge function error: ${functionError.message}`,
          variant: "destructive",
        });
        return;
      }

      const result = functionData;
      
      if (result.success) {
        toast({
          title: "Test PDF Generated Successfully!",
          description: "PDF Monkey template mapping is working correctly",
        });
        // Open the PDF in a new tab
        window.open(result.pdfUrl, '_blank');
      } else {
        toast({
          title: "Test Failed",
          description: result.error || "Failed to generate test PDF",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Test Error",
        description: "Failed to test PDF generation",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Detect if this is EIC form data based on presence of EIC-specific fields
  const isEICForm = formData.designerName || formData.constructorName || formData.inspectorName;

  const fieldMappingStatus = isEICForm ? [
    { section: 'Certificate Header', fields: ['type', 'number', 'issue_date'], status: 'mapped' },
    { section: 'Client Details', fields: ['name', 'address', 'contact_person'], status: 'mapped' },
    { section: 'Installation', fields: ['address', 'postcode', 'description', 'purpose'], status: 'mapped' },
    { section: 'Supply Details', fields: ['voltage', 'frequency', 'phases', 'supply_type'], status: 'mapped' },
    { section: 'Earthing System', fields: ['arrangement', 'main_conductor_size', 'electrode_resistance'], status: 'mapped' },
    { section: 'Protective Bonding', fields: ['main_protective_size', 'water', 'gas', 'oil'], status: 'mapped' },
    { section: 'Circuit Schedule', fields: ['reference', 'description', 'protection', 'rating'], status: 'mapped' },
    { section: 'Test Results', fields: ['continuity', 'insulation_resistance', 'polarity', 'rcd_operation'], status: 'mapped' },
    { section: 'Inspection', fields: ['overall_assessment', 'defects_identified', 'next_inspection_due'], status: 'mapped' },
    { section: 'Designer Declaration', fields: ['name', 'qualifications', 'company', 'signature_url'], status: 'mapped' },
    { section: 'Constructor Declaration', fields: ['name', 'qualifications', 'company', 'signature_url'], status: 'mapped' },
    { section: 'Inspector Declaration', fields: ['name', 'qualifications', 'company', 'signature_url'], status: 'mapped' },
    { section: 'Compliance', fields: ['bs7671', 'building_regulations', 'competent_person_scheme'], status: 'mapped' },
  ] : [
    { section: 'Certificate Header', fields: ['number', 'issue_date'], status: 'mapped' },
    { section: 'Client Details', fields: ['name', 'person_ordering'], status: 'mapped' },
    { section: 'Installation', fields: ['address', 'postcode'], status: 'mapped' },
    { section: 'Work Details', fields: ['type', 'location', 'description'], status: 'mapped' },
    { section: 'Supply & Earthing', fields: ['voltage', 'frequency', 'phases', 'type'], status: 'mapped' },
    { section: 'Bonding', fields: ['water', 'gas', 'oil', 'structural', 'other'], status: 'mapped' },
    { section: 'Circuit Details', fields: ['db', 'designation', 'description'], status: 'mapped' },
    { section: 'Protection', fields: ['type', 'rating', 'rcd', 'rcbo'], status: 'mapped' },
    { section: 'Cable Details', fields: ['live_size', 'cpc_size', 'type'], status: 'mapped' },
    { section: 'Test Results', fields: ['r1_r2', 'polarity', 'zs', 'ir_ln'], status: 'mapped' },
    { section: 'Equipment', fields: ['model', 'serial', 'calibration'], status: 'consolidated' },
    { section: 'Declaration', fields: ['name', 'bs7671', 'accurate', 'safe'], status: 'mapped' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TestTube className="h-5 w-5" />
          PDF Template Mapping Test Harness
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Field Mapping Status */}
        <div>
          <h4 className="font-medium mb-3">Field Mapping Status</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {fieldMappingStatus.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-2 border rounded">
                <span className="text-sm">{item.section}</span>
                <Badge variant={
                  item.status === 'mapped' ? 'default' : 
                  item.status === 'new' ? 'secondary' : 'outline'
                }>
                  {item.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Test Payload Generation */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-2">
            <Button 
              onClick={generateTestPayload} 
              variant="outline"
              size="sm"
              className="w-full sm:w-auto text-xs sm:text-sm"
            >
              Generate Test Payload
            </Button>
            {testPayload && (
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-2 sm:ml-auto">
                <Button 
                  onClick={copyToClipboard} 
                  variant="outline" 
                  size="sm"
                  className="w-full sm:w-auto text-xs sm:text-sm"
                >
                  <Copy className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  Copy
                </Button>
                <Button 
                  onClick={testPdfGeneration} 
                  disabled={isGenerating}
                  size="sm"
                  className="w-full sm:w-auto text-xs sm:text-sm bg-yellow-600 hover:bg-yellow-700 text-black font-medium"
                >
                  {isGenerating ? 'Testing...' : 'Test PDF'}
                </Button>
              </div>
            )}
          </div>

          {testPayload && (
            <Textarea
              value={testPayload}
              onChange={(e) => setTestPayload(e.target.value)}
              rows={15}
              className="font-mono text-xs"
              placeholder="Test payload will appear here..."
            />
          )}
        </div>

        <div className="text-xs text-muted-foreground p-3 bg-muted rounded">
          <strong>Instructions:</strong>
          <ul className="mt-1 space-y-1">
            <li>1. Click "Generate Test Payload" to create sample data</li>
            <li>2. Review the JSON structure matches your PDF Monkey template</li>
            <li>3. Click "Test PDF Generation" to verify the mapping works</li>
            <li>4. Check the generated PDF for correct field population</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestPdfTemplateMapping;