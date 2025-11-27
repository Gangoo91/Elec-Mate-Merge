import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, Download, RotateCcw, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { SendToAgentDropdown } from "@/components/install-planner-v2/SendToAgentDropdown";
import TestingSummaryStats from "./results/TestingSummaryStats";
import TestingProcedureDisplay from "./TestingProcedureDisplay";
import CertificationRequirements from "./CertificationRequirements";
import { CalculationBreakdown } from "./CalculationBreakdown";
import { TestSequenceValidator } from "./TestSequenceValidator";
import type { CommissioningResponse } from "@/types/commissioning-response";

interface CommissioningResultsProps {
  results: CommissioningResponse;
  projectName: string;
  location: string;
  installationDate: string;
  onStartOver: () => void;
}

const CommissioningResults = ({ 
  results, 
  projectName, 
  location, 
  installationDate,
  onStartOver 
}: CommissioningResultsProps) => {
  
  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(results, null, 2));
    toast.success("Copied to clipboard");
  };

  const handleCopyChecklist = () => {
    if (!results?.structuredData?.testingProcedure) {
      toast.error("No testing procedure to copy");
      return;
    }

    const { deadTests, liveTests, visualInspection } = results.structuredData.testingProcedure;

    let markdown = "# Testing Checklist\n\n";

    if (visualInspection?.checkpoints && Array.isArray(visualInspection.checkpoints)) {
      markdown += "## Visual Inspection\n";
      visualInspection.checkpoints.forEach((c) => {
        markdown += `- [ ] ${c.item} - ${c.requirement}\n`;
      });
      markdown += "\n";
    }

    if (deadTests && Array.isArray(deadTests)) {
      markdown += "## Dead Tests (Isolation Required)\n";
      deadTests.forEach((t, i) => {
        markdown += `### ${i + 1}. ${t.testName}\n`;
        markdown += `**Expected**: ${t.acceptanceCriteria}\n`;
        markdown += `**Result**: _________  **Pass/Fail**: ___\n\n`;
      });
    }

    if (liveTests && Array.isArray(liveTests)) {
      markdown += "## Live Tests\n";
      liveTests.forEach((t, i) => {
        markdown += `### ${i + 1}. ${t.testName}\n`;
        markdown += `**Expected**: ${t.acceptanceCriteria}\n`;
        markdown += `**Result**: _________  **Pass/Fail**: ___\n\n`;
      });
    }

    navigator.clipboard.writeText(markdown);
    toast.success("Testing checklist copied!", {
      description: "Paste into notes app for on-site use"
    });
  };

  const handleExportPDF = () => {
    try {
      const { generateEICSchedulePDF } = require('@/utils/pdf-generators/eic-schedule-pdf');
      
      const pdfData = {
        projectName: projectName || 'Untitled Project',
        installationAddress: location || 'Not specified',
        inspector: 'AI Testing Specialist',
        inspectionDate: installationDate || new Date().toISOString().split('T')[0],
        circuits: results.circuits || [],
        overallResult: results.overallResult || 'Pass',
        notes: results.notes
      };
      
      const pdf = generateEICSchedulePDF(pdfData);
      pdf.save(`EIC-Schedule-${projectName || 'Document'}-${new Date().toISOString().split('T')[0]}.pdf`);
      
      toast.success("PDF exported", { description: "EIC Schedule downloaded successfully" });
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error("Export failed", { description: "Could not generate PDF" });
    }
  };

  // Extract all BS 7671 regulations from tests
  const allRegulations = new Set<string>();
  
  if (results.structuredData?.testingProcedure?.deadTests) {
    results.structuredData.testingProcedure.deadTests.forEach((test: any) => {
      if (test.regulation) {
        allRegulations.add(test.regulation);
      }
    });
  }
  
  if (results.structuredData?.testingProcedure?.liveTests) {
    results.structuredData.testingProcedure.liveTests.forEach((test: any) => {
      if (test.regulation) {
        allRegulations.add(test.regulation);
      }
    });
  }

  const sortedRegulations = Array.from(allRegulations).sort();

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      {/* Testing Summary */}
      <div className="mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-white">
          Testing Summary
        </h2>
      </div>
      <TestingSummaryStats results={results} />

      {/* Action Buttons - Visible on all devices */}
      <Card className="p-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Button 
            size="sm" 
            variant="outline"
            onClick={handleCopy}
            className="touch-manipulation"
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={handleCopyChecklist}
            disabled={!results?.structuredData}
            className="touch-manipulation"
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy Checklist
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={handleExportPDF}
            className="touch-manipulation"
          >
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <SendToAgentDropdown 
            currentAgent="commissioning"
            currentOutput={results}
          />
          <Button 
            size="sm" 
            variant="ghost"
            onClick={onStartOver}
            className="touch-manipulation ml-auto"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Start Over
          </Button>
        </div>
      </Card>

      {/* Testing Procedure */}
      {results.structuredData?.testingProcedure && (
        <>
          <div className="mb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-white">
              Testing Procedures
            </h2>
          </div>
          <Card className="p-4 sm:p-6">
            <TestingProcedureDisplay procedure={results.structuredData.testingProcedure} />
          </Card>
        </>
      )}

      {/* Regulatory Compliance Section */}
      {sortedRegulations.length > 0 && (
        <>
          <div className="mb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-white">
              Applicable BS 7671 Regulations
            </h2>
          </div>
          <Card className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {sortedRegulations.map((regulation, index) => (
                <div
                  key={index}
                  className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 hover:bg-green-500/20 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="bg-green-500/20 rounded-full p-2 shrink-0">
                      <CheckCircle2 className="h-5 w-5 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-white text-sm">
                        {regulation}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}

      {/* Certification Requirements */}
      {results.structuredData?.certification && (
        <>
          <div className="mb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-white">
              Certification Requirements
            </h2>
          </div>
          <Card className="p-4 sm:p-6">
            <CertificationRequirements certification={results.structuredData.certification} />
          </Card>
        </>
      )}

      {/* Raw Response (if no structured data) */}
      {!results.structuredData && results.response && (
        <Card className="p-4 sm:p-6">
          <div className="prose prose-invert prose-sm max-w-none">
            <div className="whitespace-pre-wrap text-sm text-white">
              {results.response}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default CommissioningResults;
