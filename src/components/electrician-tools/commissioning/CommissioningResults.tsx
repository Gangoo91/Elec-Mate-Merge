import { useState, useEffect } from "react";
import { toast } from "sonner";
import { SendToAgentDropdown } from "@/components/install-planner-v2/SendToAgentDropdown";
import { ProgressHeroBar } from "./redesign/ProgressHeroBar";
import { TestingOverviewSection } from "./redesign/TestingOverviewSection";
import { CertificateDataSection } from "./CertificateDataSection";
import { CircuitScheduleSection } from "./redesign/CircuitScheduleSection";
import { Zap, Save, Trash2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCommissioningProgress } from "@/hooks/useCommissioningProgress";
import type { CommissioningResponse } from "@/types/commissioning-response";

interface CommissioningResultsProps {
  results: CommissioningResponse;
  projectName: string;
  location: string;
  installationDate: string;
  installationType: string;
  onStartOver: () => void;
}

const CommissioningResults = ({ 
  results, 
  projectName, 
  location, 
  installationDate,
  installationType,
  onStartOver 
}: CommissioningResultsProps) => {
  const {
    progress,
    hasExistingSession,
    initializeSession,
    resumeSession,
    recordTestResult,
    recordVisualCheck,
    updateCompletionPercentage,
    clearProgress,
    exportProgress,
    getTestResult,
    getVisualCheck,
  } = useCommissioningProgress(projectName, location, installationDate, installationType);

  // Initialize or resume session
  useEffect(() => {
    if (!progress && !hasExistingSession) {
      initializeSession();
    } else if (hasExistingSession) {
      resumeSession();
    }
  }, [progress, hasExistingSession, initializeSession, resumeSession]);
  
  const deadCount = results.structuredData?.testingProcedure?.deadTests?.length || 0;
  const liveCount = results.structuredData?.testingProcedure?.liveTests?.length || 0;
  const totalItems = deadCount + liveCount;
  
  // Calculate completion from saved test results
  const completedTests = Object.keys(progress?.testResults || {}).length;
  const completionPercentage = totalItems > 0 
    ? Math.round((completedTests / totalItems) * 100)
    : 0;

  // Update completion percentage whenever it changes
  useEffect(() => {
    updateCompletionPercentage(completionPercentage);
  }, [completionPercentage, updateCompletionPercentage]);

  const handleCopyChecklist = () => {
    if (!results?.structuredData?.testingProcedure) {
      toast.error("No testing procedure to copy");
      return;
    }

    const { deadTests, liveTests, visualInspection } = results.structuredData.testingProcedure;

    let markdown = "# Testing Checklist\n\n";

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

  const handleClearProgress = () => {
    if (confirm("Are you sure you want to clear all saved progress? This cannot be undone.")) {
      clearProgress();
      toast.success("Progress cleared", { description: "All test results have been removed" });
    }
  };

  const handleExportProgress = () => {
    const json = exportProgress();
    if (json) {
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `commissioning-backup-${projectName.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("Progress exported", { description: "Backup file downloaded" });
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

      {/* Progress Status & Actions */}
      {progress && (
        <div className="bg-card border border-elec-yellow/20 rounded-lg p-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-elec-yellow" />
              <div>
                <p className="text-sm font-semibold text-white">Progress Auto-Saved</p>
                <p className="text-xs text-white/60">
                  Last saved: {new Date(progress.lastSaved).toLocaleTimeString()}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleExportProgress}
                variant="outline"
                size="sm"
                className="border-elec-yellow/30 hover:bg-elec-yellow/10"
              >
                <Save className="h-4 w-4 mr-2" />
                Backup
              </Button>
              <Button
                onClick={handleClearProgress}
                variant="outline"
                size="sm"
                className="border-red-500/30 hover:bg-red-500/10 text-red-400"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Certificate Pre-Fill Data */}
      <CertificateDataSection
        progress={progress}
        projectName={projectName}
        location={location}
        installationDate={installationDate}
      />

      {/* Send to Agent */}
      <div className="flex justify-end">
        <SendToAgentDropdown 
          currentAgent="commissioning"
          currentOutput={results}
        />
      </div>

      {/* Circuit Schedule Section */}
      {results.structuredData?.circuitSchedule && results.structuredData.circuitSchedule.length > 0 && (
        <CircuitScheduleSection circuits={results.structuredData.circuitSchedule} />
      )}

      {/* Testing Procedures */}
      {results.structuredData?.testingProcedure && (
        <TestingOverviewSection 
          deadTests={results.structuredData.testingProcedure.deadTests}
          liveTests={results.structuredData.testingProcedure.liveTests}
        />
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
