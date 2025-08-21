import React, { useState, useRef } from "react";
import { FileText, Loader, Download, Copy, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Form imports
import { EICRForm, type EICRFormData } from "./forms/EICRForm";
import { MinorWorksForm, type MinorWorksFormData } from "./forms/MinorWorksForm";
import { PeriodicInspectionForm, type PeriodicInspectionFormData } from "./forms/PeriodicInspectionForm";
import { EVChargerForm, type EVChargerFormData } from "./forms/EVChargerForm";
import { ConsumerUnitForm, type ConsumerUnitFormData } from "./forms/ConsumerUnitForm";
import { RCDTestForm, type RCDTestFormData } from "./forms/RCDTestForm";

const ReportWriter = () => {
  const { toast } = useToast();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [reportPrompt, setReportPrompt] = useState("");
  const [generatedReport, setGeneratedReport] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Form data states
  const [formData, setFormData] = useState<any>(null);

  const reportTemplates = [
    {
      id: "eicr",
      name: "EICR (Electrical Installation Condition Report)",
      description: "Comprehensive inspection report for existing electrical installations"
    },
    {
      id: "minor-works",
      name: "Minor Electrical Installation Works Certificate",
      description: "Certificate for small electrical works and additions"
    },
    {
      id: "periodic-inspection",
      name: "Periodic Inspection Report",
      description: "Regular inspection report for ongoing electrical safety"
    },
    {
      id: "ev-charger",
      name: "EV Charger Installation Certificate",
      description: "Installation certificate for electric vehicle charging points"
    },
    {
      id: "consumer-unit",
      name: "Consumer Unit Installation Certificate",
      description: "Certificate for new or replacement consumer units"
    },
    {
      id: "rcd-test",
      name: "RCD Test Certificate",
      description: "Testing certificate for residual current devices"
    }
  ];

  // Form change handlers
  const handleFormChange = (data: any) => {
    setFormData(data);
  };

  // Build comprehensive prompt from form data + additional notes
  const buildPromptFromForm = () => {
    if (!formData || !selectedTemplate) return reportPrompt;

    let structuredPrompt = "";
    
    switch (selectedTemplate) {
      case "eicr":
        const eicrData = formData as EICRFormData;
        structuredPrompt = `
Generate a comprehensive EICR (Electrical Installation Condition Report) with the following details:

CLIENT DETAILS:
- Client Name: ${eicrData.clientName}
- Client Address: ${eicrData.clientAddress}
- Client Phone: ${eicrData.clientPhone || 'Not provided'}

INSTALLATION DETAILS:
- Installation Address: ${eicrData.installationAddress}
- Installation Description: ${eicrData.installationDescription}
- Estimated Age: ${eicrData.estimatedAge}
- Earthing Arrangements: ${eicrData.earthingArrangements}
- Supply Characteristics: ${eicrData.supplyCharacteristics}
- Main Switch Rating: ${eicrData.mainSwitchRating}

INSPECTION DETAILS:
- Extent of Inspection: ${eicrData.extentOfInspection}
- Limitations: ${eicrData.limitations || 'None specified'}

FAULTS AND OBSERVATIONS:
- Faults Found: ${eicrData.faultsFound}
${eicrData.c1Faults ? `- C1 Faults (Danger Present): ${eicrData.c1Faults}` : ''}
${eicrData.c2Faults ? `- C2 Faults (Potentially Dangerous): ${eicrData.c2Faults}` : ''}
${eicrData.c3Faults ? `- C3 Faults (Improvement Recommended): ${eicrData.c3Faults}` : ''}
${eicrData.fiImprovements ? `- FI (Further Investigation): ${eicrData.fiImprovements}` : ''}

OVERALL ASSESSMENT:
- Overall Assessment: ${eicrData.overallAssessment}
- Next Inspection Recommended: ${eicrData.nextInspectionRecommended || 'Not specified'}

INSPECTOR DETAILS:
- Inspector Name: ${eicrData.inspectorName}
- Inspector Qualification: ${eicrData.inspectorQualification}
- Inspection Date: ${eicrData.inspectionDate}

${reportPrompt ? `ADDITIONAL NOTES: ${reportPrompt}` : ''}

Please generate a professional EICR report following BS 7671:2018 standards.`;
        break;

      case "minor-works":
        const minorData = formData as MinorWorksFormData;
        structuredPrompt = `
Generate a Minor Electrical Installation Works Certificate with the following details:

CLIENT & INSTALLATION:
- Client Name: ${minorData.clientName}
- Installation Address: ${minorData.installationAddress}

WORK DETAILS:
- Work Description: ${minorData.workDescription}
- Circuit Details: ${minorData.circuitDetails}
- Test Results: ${minorData.testResults}
- Work Compliant: ${minorData.workCompliant}

INSTALLER DETAILS:
- Installer Name: ${minorData.installerName}
- Completion Date: ${minorData.completionDate}

${reportPrompt ? `ADDITIONAL NOTES: ${reportPrompt}` : ''}

Please generate a professional minor works certificate following BS 7671:2018 standards.`;
        break;

      case "periodic-inspection":
        const periodicData = formData as PeriodicInspectionFormData;
        structuredPrompt = `
Generate a Periodic Inspection Report with the following details:

CLIENT & INSTALLATION:
- Client Name: ${periodicData.clientName}
- Installation Address: ${periodicData.installationAddress}
- Last Inspection Date: ${periodicData.lastInspectionDate || 'Not specified'}

INSPECTION DETAILS:
- Inspection Type: ${periodicData.inspectionType}
- Overall Condition: ${periodicData.overallCondition}
- Observations Found: ${periodicData.observationsFound || 'None specified'}
- Recommended Actions: ${periodicData.recommendedActions || 'None specified'}
- Next Inspection Due: ${periodicData.nextInspectionDue}

INSPECTOR DETAILS:
- Inspector Name: ${periodicData.inspectorName}
- Inspection Date: ${periodicData.inspectionDate}

${reportPrompt ? `ADDITIONAL NOTES: ${reportPrompt}` : ''}

Please generate a professional periodic inspection report following BS 7671:2018 standards.`;
        break;

      case "ev-charger":
        const evData = formData as EVChargerFormData;
        structuredPrompt = `
Generate an EV Charger Installation Certificate with the following details:

CLIENT & INSTALLATION:
- Client Name: ${evData.clientName}
- Installation Address: ${evData.installationAddress}

CHARGER DETAILS:
- Charger Type: ${evData.chargerType}
- Charger Power: ${evData.chargerPower}
- Installation Location: ${evData.installationLocation}
- Earthing Arrangement: ${evData.earthingArrangement}

TESTING & COMPLIANCE:
- Test Results: ${evData.testResults}
- Installation Compliant: ${evData.installationCompliant}
- Special Requirements: ${evData.specialRequirements || 'None specified'}

INSTALLER DETAILS:
- Installer Name: ${evData.installerName}
- Installation Date: ${evData.installationDate}

${reportPrompt ? `ADDITIONAL NOTES: ${reportPrompt}` : ''}

Please generate a professional EV charger installation certificate following BS 7671:2018 and IET Code of Practice standards.`;
        break;

      case "consumer-unit":
        const cuData = formData as ConsumerUnitFormData;
        structuredPrompt = `
Generate a Consumer Unit Installation/Replacement Certificate with the following details:

CLIENT & INSTALLATION:
- Client Name: ${cuData.clientName}
- Installation Address: ${cuData.installationAddress}

CONSUMER UNIT DETAILS:
- Unit Type: ${cuData.unitType}
- Unit Make: ${cuData.unitMake}
- Unit Model: ${cuData.unitModel}
- Installation Type: ${cuData.installationType}
- Circuit Count: ${cuData.circuitCount}
- RCD Protection: ${cuData.rcdProtection}

TESTING & COMPLIANCE:
- Test Results: ${cuData.testResults}
- Installation Compliant: ${cuData.installationCompliant}

INSTALLER DETAILS:
- Installer Name: ${cuData.installerName}
- Installation Date: ${cuData.installationDate}

${reportPrompt ? `ADDITIONAL NOTES: ${reportPrompt}` : ''}

Please generate a professional consumer unit installation certificate following BS 7671:2018 standards.`;
        break;

      case "rcd-test":
        const rcdData = formData as RCDTestFormData;
        structuredPrompt = `
Generate an RCD Test Certificate with the following details:

CLIENT & INSTALLATION:
- Client Name: ${rcdData.clientName}
- Installation Address: ${rcdData.installationAddress}

RCD DETAILS:
- RCD Type: ${rcdData.rcdType}
- RCD Location: ${rcdData.rcdLocation}
- Test Type: ${rcdData.testType}

TEST RESULTS:
- Test Results: ${rcdData.testResults}
- RCD Condition: ${rcdData.rcdCondition}
- Action Required: ${rcdData.actionRequired || 'None specified'}

TESTER DETAILS:
- Tester Name: ${rcdData.testerName}
- Test Date: ${rcdData.testDate}

${reportPrompt ? `ADDITIONAL NOTES: ${reportPrompt}` : ''}

Please generate a professional RCD test certificate following BS 7671:2018 standards.`;
        break;

      default:
        structuredPrompt = reportPrompt;
    }

    return structuredPrompt;
  };

  const handleGenerateReport = async () => {
    if (!selectedTemplate || !formData) {
      toast({
        title: "Missing Information",
        description: "Please select a template and complete the form before generating a report.",
        variant: "destructive"
      });
      return;
    }
    
    setIsGenerating(true);
    
    try {
      console.log('Calling generate-electrical-report function with:', {
        template: selectedTemplate,
        formData,
        additionalNotes: reportPrompt
      });

      const { data, error } = await supabase.functions.invoke('generate-electrical-report', {
        body: {
          template: selectedTemplate,
          formData: formData,
          additionalNotes: reportPrompt
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message || 'Failed to generate report');
      }

      console.log('Report generation successful');
      setGeneratedReport(data.report);
      
      toast({
        title: "Report Generated",
        description: "Your professional electrical report has been generated successfully.",
        variant: "success"
      });
    } catch (error) {
      console.error('Error generating report:', error);
      toast({
        title: "Generation Failed",
        description: error.message || "Failed to generate report. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedReport);
    setCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "Report content has been copied to your clipboard."
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-elec-dark">
      <div className="px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <FileText className="h-6 w-6 text-elec-yellow" />
              <h1 className="text-2xl font-bold text-white">AI Report Writer</h1>
            </div>
            <p className="text-muted-foreground">
              Generate professional electrical reports and certificates using AI
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            {/* Template Selection */}
            <Card className="bg-elec-gray border-elec-yellow/30 p-6">
              <h3 className="text-lg font-medium text-elec-yellow mb-4">Choose Report Template</h3>
              <Select value={selectedTemplate} onValueChange={(value) => {
                setSelectedTemplate(value);
                setFormData(null); // Reset form data when template changes
              }}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/30 text-white">
                  <SelectValue placeholder="Select a report template" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/30">
                  {reportTemplates.map((template) => (
                    <SelectItem 
                      key={template.id} 
                      value={template.id}
                      className="text-white hover:bg-elec-yellow/10 focus:bg-elec-yellow/10"
                    >
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedTemplate && (
                <div className="mt-4 p-3 bg-elec-dark/50 rounded-md">
                  <p className="text-sm text-muted-foreground">
                    {reportTemplates.find(t => t.id === selectedTemplate)?.description}
                  </p>
                </div>
              )}
            </Card>

            {/* Template-Specific Form */}
            {selectedTemplate && (
              <Card className="bg-elec-gray border-elec-yellow/30 p-6">
                <h3 className="text-lg font-medium text-elec-yellow mb-4">Report Details</h3>
                {selectedTemplate === "eicr" && (
                  <EICRForm onFormChange={handleFormChange} />
                )}
                {selectedTemplate === "minor-works" && (
                  <MinorWorksForm onFormChange={handleFormChange} />
                )}
                {selectedTemplate === "periodic-inspection" && (
                  <PeriodicInspectionForm onFormChange={handleFormChange} />
                )}
                {selectedTemplate === "ev-charger" && (
                  <EVChargerForm onFormChange={handleFormChange} />
                )}
                {selectedTemplate === "consumer-unit" && (
                  <ConsumerUnitForm onFormChange={handleFormChange} />
                )}
                {selectedTemplate === "rcd-test" && (
                  <RCDTestForm onFormChange={handleFormChange} />
                )}
              </Card>
            )}

            {/* Generated Report Display */}
            {generatedReport && (
              <Card className="bg-elec-gray border-elec-yellow/30 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-elec-yellow">Generated Report</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyToClipboard}
                    className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
                <div className="bg-elec-dark/50 rounded-md p-4 whitespace-pre-wrap text-white">
                  {generatedReport}
                </div>
              </Card>
            )}
          </div>

          {/* Additional Notes & Generate */}
          <div className="mt-6">
            <Card className="bg-elec-gray border-elec-yellow/30 p-6">
              <h3 className="text-lg font-medium text-elec-yellow mb-4">Additional Notes (Optional)</h3>
              <div className="space-y-3">
                <Textarea
                  ref={textareaRef}
                  placeholder="Add any additional notes or specific requirements for the report..."
                  className="min-h-[80px] max-h-32 resize-none bg-elec-dark border-elec-yellow/30 text-white placeholder:text-muted-foreground focus:border-elec-yellow/50 focus:ring-1 focus:ring-elec-yellow/50"
                  value={reportPrompt}
                  onChange={(e) => setReportPrompt(e.target.value)}
                />
                <Button 
                  className="w-full bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 h-12 text-base font-semibold" 
                  onClick={handleGenerateReport} 
                  disabled={isGenerating || !selectedTemplate || !formData}
                >
                  {isGenerating ? (
                    <>
                      <Loader className="h-5 w-5 mr-2 animate-spin" /> 
                      Generating...
                    </>
                  ) : (
                    'Generate Report'
                  )}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportWriter;