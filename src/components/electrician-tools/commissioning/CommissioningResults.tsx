import { useState, useEffect } from "react";
import { toast } from "sonner";
import { SendToAgentDropdown } from "@/components/install-planner-v2/SendToAgentDropdown";
import { ProgressHeroBar } from "./redesign/ProgressHeroBar";
import { CertificateDataSection } from "./CertificateDataSection";
import { CircuitScheduleSection } from "./redesign/CircuitScheduleSection";
import { CommissioningHeroSummary } from "./redesign/CommissioningHeroSummary";
import { CommissioningTestStepCard } from "./redesign/CommissioningTestStepCard";
import { TestSection } from "./redesign/TestSection";
import { Zap, Save, Trash2, Clock, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCommissioningProgress } from "@/hooks/useCommissioningProgress";
import type { CommissioningResponse } from "@/types/commissioning-response";

interface CommissioningResultsProps {
  results: CommissioningResponse;
  projectName: string;
  location: string;
  installationDate: string;
  installationType: string;
  originalQuery?: string;
  onStartOver: () => void;
}

const CommissioningResults = ({ 
  results, 
  projectName, 
  location, 
  installationDate,
  installationType,
  originalQuery,
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

  // Combine dead and live tests into sequential steps
  const allTests = [
    ...(results.structuredData?.testingProcedure?.deadTests || []),
    ...(results.structuredData?.testingProcedure?.liveTests || [])
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Original Query Display */}
      {originalQuery && (
        <Card className="bg-gradient-to-r from-elec-yellow/10 to-elec-yellow/5 border-2 border-elec-yellow/30 p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <Zap className="h-6 w-6 text-elec-yellow flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-foreground/70 mb-2 uppercase tracking-wide">
                Original Request
              </h3>
              <p className="text-lg text-foreground leading-relaxed">
                {originalQuery}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Hero Summary */}
      <CommissioningHeroSummary
        deadTestsCount={results.structuredData?.testingProcedure?.deadTests?.length || 0}
        liveTestsCount={results.structuredData?.testingProcedure?.liveTests?.length || 0}
        totalTests={allTests.length}
        completedTests={completedTests}
        estimatedDuration="2-4 hours"
        riskLevel="medium"
      />

      {/* Simplified Progress Bar */}
      <div className="bg-card border border-elec-yellow/20 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-elec-yellow" />
            <div>
              <p className="text-sm font-semibold text-foreground">
                Testing Progress: {completedTests}/{allTests.length} Tests
              </p>
              {progress && (
                <p className="text-xs text-foreground/60">
                  Last saved: {new Date(progress.lastSaved).toLocaleTimeString()}
                </p>
              )}
            </div>
          </div>
          <span className="text-2xl font-bold text-elec-yellow">{completionPercentage}%</span>
        </div>
        <div className="w-full bg-background/50 rounded-full h-3">
          <div 
            className="bg-elec-yellow h-3 rounded-full transition-all duration-300"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {/* Test Procedure Steps */}
      {results.structuredData?.testingProcedure && (
        <div className="space-y-6">
          {/* Dead Tests Section */}
          {results.structuredData.testingProcedure.deadTests && 
           results.structuredData.testingProcedure.deadTests.length > 0 && (
            <TestSection
              title="Dead Tests (Isolation Required)"
              icon={<XCircle className="h-6 w-6" />}
              count={results.structuredData.testingProcedure.deadTests.length}
              variant="dead"
            >
              {results.structuredData.testingProcedure.deadTests.map((test, idx) => (
                <CommissioningTestStepCard
                  key={idx}
                  step={test}
                  stepNumber={idx + 1}
                  onToggleComplete={(stepId, completed) => {
                    recordTestResult({
                      stepId,
                      testName: test.testName,
                      passed: completed
                    });
                  }}
                  isCompleted={!!getTestResult(`step-${idx + 1}`)}
                />
              ))}
            </TestSection>
          )}

          {/* Live Tests Section */}
          {results.structuredData.testingProcedure.liveTests && 
           results.structuredData.testingProcedure.liveTests.length > 0 && (
            <TestSection
              title="Live Tests (Circuits Energised)"
              icon={<Zap className="h-6 w-6" />}
              count={results.structuredData.testingProcedure.liveTests.length}
              variant="live"
            >
              {results.structuredData.testingProcedure.liveTests.map((test, idx) => {
                const stepNumber = (results.structuredData?.testingProcedure?.deadTests?.length || 0) + idx + 1;
                return (
                  <CommissioningTestStepCard
                    key={idx}
                    step={test}
                    stepNumber={stepNumber}
                    onToggleComplete={(stepId, completed) => {
                      recordTestResult({
                        stepId,
                        testName: test.testName,
                        passed: completed
                      });
                    }}
                    isCompleted={!!getTestResult(`step-${stepNumber}`)}
                  />
                );
              })}
            </TestSection>
          )}
        </div>
      )}

      {/* Raw Response (if no structured data) */}
      {!results.structuredData && results.response && (
        <div className="bg-background/40 border-2 border-border/40 rounded-xl p-6">
          <div className="prose prose-invert prose-sm max-w-none">
            <div className="whitespace-pre-wrap text-sm text-foreground">
              {results.response}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommissioningResults;
