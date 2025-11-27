import { useState } from "react";
import { toast } from "sonner";
import { SendToAgentDropdown } from "@/components/install-planner-v2/SendToAgentDropdown";
import { ProgressHeroBar } from "./redesign/ProgressHeroBar";
import { TestSection } from "./redesign/TestSection";
import { ChecklistItem } from "./redesign/ChecklistItem";
import { TestCard } from "./redesign/TestCard";
import { Eye, Zap, AlertTriangle } from "lucide-react";
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
  const [completedVisual, setCompletedVisual] = useState<Set<number>>(new Set());
  
  const visualCount = results.structuredData?.testingProcedure?.visualInspection?.checkpoints?.length || 0;
  const deadCount = results.structuredData?.testingProcedure?.deadTests?.length || 0;
  const liveCount = results.structuredData?.testingProcedure?.liveTests?.length || 0;
  const totalItems = visualCount + deadCount + liveCount;
  
  const completionPercentage = totalItems > 0 
    ? Math.round((completedVisual.size / totalItems) * 100)
    : 0;

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

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Progress Bar */}
      <ProgressHeroBar
        results={results}
        onCopyChecklist={handleCopyChecklist}
        onExportPDF={handleExportPDF}
        onStartOver={onStartOver}
        completionPercentage={completionPercentage}
      />

      {/* Send to Agent */}
      <div className="flex justify-end">
        <SendToAgentDropdown 
          currentAgent="commissioning"
          currentOutput={results}
        />
      </div>

      {/* Visual Inspection Section */}
      {results.structuredData?.testingProcedure?.visualInspection && (
        <TestSection
          title="Visual Inspection"
          icon={<Eye />}
          count={visualCount}
          variant="visual"
        >
          {results.structuredData.testingProcedure.visualInspection.safetyNotes && (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-amber-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="font-semibold text-amber-300 mb-2">Safety Notes</div>
                  <ul className="space-y-1 text-sm text-white">
                    {results.structuredData.testingProcedure.visualInspection.safetyNotes.map((note, i) => (
                      <li key={i}>• {note}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
          {results.structuredData.testingProcedure.visualInspection.checkpoints.map((checkpoint, index) => (
            <ChecklistItem
              key={index}
              item={checkpoint.item}
              requirement={checkpoint.requirement}
              reference={checkpoint.reference}
              onToggle={(checked) => {
                setCompletedVisual(prev => {
                  const newSet = new Set(prev);
                  if (checked) {
                    newSet.add(index);
                  } else {
                    newSet.delete(index);
                  }
                  return newSet;
                });
              }}
            />
          ))}
        </TestSection>
      )}

      {/* Dead Tests Section */}
      {results.structuredData?.testingProcedure?.deadTests && deadCount > 0 && (
        <TestSection
          title="Dead Tests (Isolation Required)"
          icon={<Zap />}
          count={deadCount}
          variant="dead"
        >
          {results.structuredData.testingProcedure.deadTests.map((test, index) => (
            <TestCard
              key={index}
              test={test}
              index={index}
              variant="dead"
            />
          ))}
        </TestSection>
      )}

      {/* Live Tests Section */}
      {results.structuredData?.testingProcedure?.liveTests && liveCount > 0 && (
        <TestSection
          title="Live Tests"
          icon={<Zap />}
          count={liveCount}
          variant="live"
        >
          {results.structuredData.testingProcedure.liveTests.map((test, index) => (
            <TestCard
              key={index}
              test={test}
              index={index}
              variant="live"
            />
          ))}
        </TestSection>
      )}

      {/* Raw Response (if no structured data) */}
      {!results.structuredData && results.response && (
        <div className="bg-background/40 border-2 border-border/40 rounded-xl p-6">
          <div className="prose prose-invert prose-sm max-w-none">
            <div className="whitespace-pre-wrap text-sm text-white">
              {results.response}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommissioningResults;
