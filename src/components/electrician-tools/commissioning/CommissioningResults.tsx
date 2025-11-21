import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, Download, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { SendToAgentDropdown } from "@/components/install-planner-v2/SendToAgentDropdown";
import TestingSummaryStats from "./results/TestingSummaryStats";
import TestingProcedureDisplay from "./TestingProcedureDisplay";
import CertificationRequirements from "./CertificationRequirements";
import { RAGQualityBadge } from "./RAGQualityBadge";
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

    if (visualInspection?.checkpoints) {
      markdown += "## Visual Inspection\n";
      visualInspection.checkpoints.forEach((c) => {
        markdown += `- [ ] ${c.item} - ${c.requirement}\n`;
      });
      markdown += "\n";
    }

    if (deadTests) {
      markdown += "## Dead Tests (Isolation Required)\n";
      deadTests.forEach((t, i) => {
        markdown += `### ${i + 1}. ${t.testName}\n`;
        markdown += `**Expected**: ${t.acceptanceCriteria}\n`;
        markdown += `**Result**: _________  **Pass/Fail**: ___\n\n`;
      });
    }

    if (liveTests) {
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

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      {/* Summary Stats */}
      <TestingSummaryStats results={results} />

      {/* RAG Quality Indicator */}
      {results.metadata?.ragQualityMetrics && (
        <RAGQualityBadge 
          gn3ProceduresFound={results.metadata.ragQualityMetrics.gn3ProceduresFound || 0}
          regulationsFound={results.metadata.ragQualityMetrics.regulationsFound || 0}
        />
      )}

      {/* Action Buttons */}
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
        <Card className="p-4 sm:p-6">
          <TestingProcedureDisplay procedure={results.structuredData.testingProcedure} />
        </Card>
      )}

      {/* Certification Requirements */}
      {results.structuredData?.certification && (
        <Card className="p-4 sm:p-6">
          <CertificationRequirements certification={results.structuredData.certification} />
        </Card>
      )}

      {/* Raw Response (if no structured data) */}
      {!results.structuredData && results.response && (
        <Card className="p-4 sm:p-6">
          <div className="prose prose-invert prose-sm max-w-none">
            <div className="whitespace-pre-wrap text-sm text-muted-foreground">
              {results.response}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default CommissioningResults;
