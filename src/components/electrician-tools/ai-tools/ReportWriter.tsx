
import { useState } from "react";
import { FileText, Loader } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const ReportWriter = () => {
  const [reportType, setReportType] = useState("eicr");
  const [reportPrompt, setReportPrompt] = useState("");
  const [isReportLoading, setIsReportLoading] = useState(false);
  const [reportOutput, setReportOutput] = useState("");

  const handleReportGeneration = async () => {
    if (reportPrompt.trim() === "") {
      toast({
        title: "Incomplete Information",
        description: "Please provide details for the report.",
        variant: "destructive",
      });
      return;
    }

    setIsReportLoading(true);
    setReportOutput("");

    try {
      // In a real implementation, this would call an edge function to generate the report
      const response = await generateReport(reportType, reportPrompt);
      setReportOutput(response);
      
      toast({
        title: "Report Generated",
        description: `Your ${reportType.toUpperCase()} report has been created.`,
      });
    } catch (error) {
      console.error('Report Generation Error:', error);
      toast({
        title: "Error",
        description: "Failed to generate report",
        variant: "destructive",
      });
    } finally {
      setIsReportLoading(false);
    }
  };

  // This function simulates report generation - in production this would call an AI API
  const generateReport = async (type: string, details: string): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const reports: Record<string, string> = {
          eicr: `# Electrical Installation Condition Report\n\nBased on the details provided, I've generated the following EICR:\n\n## Property Details\n- Address: ${details.includes("address") ? details.split("address:")[1]?.split("\n")[0] || "Not specified" : "Not specified"}\n\n## Assessment\nThe electrical installation has been assessed and appears to be in ${details.includes("poor") ? "UNSATISFACTORY" : "SATISFACTORY"} condition.\n\n## Recommendations\n1. Next inspection recommended: 5 years\n2. ${details.includes("poor") ? "Immediate remedial action is required for circuits C1-C3" : "No immediate remedial work is required"}\n\n## Declaration\nI certify that this document represents an accurate assessment of the condition of the electrical installation based on the information provided.`,
          minorworks: `# Minor Electrical Works Certificate\n\nBased on the details provided, I've generated the following certificate:\n\n## Work Details\n- Description: ${details.split("\n")[0] || "Electrical modifications"}\n- Date of work: ${new Date().toLocaleDateString()}\n\n## Declaration\nThe electrical work described above has been designed, constructed, inspected and tested in accordance with BS 7671:2018 (18th Edition of the IEE Wiring Regulations).\n\n## Results\nAll appropriate tests have been carried out and the results confirm that the modified circuit meets the requirements of BS 7671:2018.`,
          nic: `# NIC EIC Certificate\n\nBased on the details provided, I've generated the following NIC EIC certificate:\n\n## Installation Details\n- Description: ${details.split("\n")[0] || "New electrical installation"}\n- Address: ${details.includes("address") ? details.split("address:")[1]?.split("\n")[0] || "Not specified" : "Not specified"}\n\n## Tests Conducted\n- Continuity of protective conductors: PASS\n- Insulation resistance: PASS\n- Earth fault loop impedance: PASS\n- Operation of RCDs: PASS\n\n## Declaration\nI certify that the electrical installation work described above has been designed, constructed, inspected and tested in accordance with BS 7671:2018 and no defects were identified.`
        };
        
        resolve(reports[type] || "Report could not be generated with the given information.");
      }, 2000);
    });
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <FileText className="h-5 w-5 text-elec-yellow" />
          Report Writer
        </CardTitle>
        <CardDescription>
          AI-powered tool to generate professional electrical reports
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-3 mb-4">
          <Button 
            variant={reportType === "eicr" ? "default" : "outline"} 
            size="sm"
            onClick={() => setReportType("eicr")}
            className="flex-grow md:flex-grow-0"
          >
            EICR
          </Button>
          <Button 
            variant={reportType === "minorworks" ? "default" : "outline"} 
            size="sm"
            onClick={() => setReportType("minorworks")}
            className="flex-grow md:flex-grow-0"
          >
            Minor Works
          </Button>
          <Button 
            variant={reportType === "nic" ? "default" : "outline"} 
            size="sm"
            onClick={() => setReportType("nic")}
            className="flex-grow md:flex-grow-0"
          >
            NIC EIC
          </Button>
        </div>
        
        <p className="text-sm text-muted-foreground">
          Enter the details for your {reportType === "eicr" ? "Electrical Installation Condition Report" : 
            reportType === "minorworks" ? "Minor Electrical Works Certificate" : "NIC EIC Certificate"}
        </p>
        
        <Textarea
          placeholder={`e.g., ${
            reportType === "eicr" ? "Domestic property inspection at address: 123 Main Street. Installation appears in good condition with no visible defects." : 
            reportType === "minorworks" ? "Replaced socket outlet in kitchen. All tests completed successfully." : 
            "New consumer unit installation at address: 123 Main Street."
          }`}
          className="min-h-[100px]"
          value={reportPrompt}
          onChange={(e) => setReportPrompt(e.target.value)}
        />
        
        <Button 
          className="w-full" 
          onClick={handleReportGeneration} 
          disabled={isReportLoading}
        >
          {isReportLoading ? (
            <>
              <Loader className="h-4 w-4 mr-2 animate-spin" /> 
              Generating Report...
            </>
          ) : (
            `Generate ${reportType.toUpperCase()} Report`
          )}
        </Button>

        {reportOutput && (
          <div className="mt-6 p-4 bg-elec-dark rounded-md">
            <h3 className="text-lg font-semibold mb-2 text-elec-yellow">Generated Report:</h3>
            <div className="text-sm whitespace-pre-wrap">
              {reportOutput.split('\n').map((line, index) => (
                <p key={index} className={line.startsWith('#') || line.startsWith('##') ? 'text-elec-yellow font-semibold mt-3' : 'my-2'}>
                  {line}
                </p>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              Download as PDF
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReportWriter;
