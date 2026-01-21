/**
 * ScheduleOfTests - Refactored Component
 *
 * Clean orchestrator component that uses extracted hooks and subcomponents.
 * Original EICRScheduleOfTests.tsx was 1,414 lines - this is ~180 lines.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { TestResult } from '@/types/testResult';
import { useOrientation } from '@/hooks/useOrientation';
import { getTableViewPreference, setTableViewPreference } from '@/utils/mobileTableUtils';

// Extracted hooks
import { useCircuitState, useAIAnalysis, useBulkOperations } from './hooks';

// UI Components
import { ScheduleHeader } from './ScheduleHeader';
import { CircuitList } from './CircuitList';
import { ProgressDashboard } from './ProgressDashboard';

// Existing components (will migrate later)
import EnhancedTestResultDesktopTable from '@/components/EnhancedTestResultDesktopTable';
import MobileOptimizedTestTable from '@/components/mobile/MobileOptimizedTestTable';
import { MobileHorizontalScrollTable } from '@/components/mobile/MobileHorizontalScrollTable';
import TestAnalytics from '@/components/TestAnalytics';

// Dialogs (will extract later)
import { BoardPhotoCapture } from '@/components/testing/BoardPhotoCapture';
import TestResultsPhotoCapture from '@/components/testing/TestResultsPhotoCapture';
import { SimpleCircuitTable } from '@/components/testing/SimpleCircuitTable';
import TestResultsReviewDialog from '@/components/testing/TestResultsReviewDialog';
import ScribbleToTableDialog from '@/components/mobile/ScribbleToTableDialog';
import SmartAutoFillPromptDialog from '@/components/SmartAutoFillPromptDialog';
import MobileSmartAutoFill from '@/components/mobile/MobileSmartAutoFill';
import QuickRcdPresets from '@/components/QuickRcdPresets';
import BulkInfillDialog from '@/components/BulkInfillDialog';

// Info sections
import TestInstrumentInfo from '@/components/TestInstrumentInfo';
import TestMethodInfo from '@/components/TestMethodInfo';
import DistributionBoardVerificationSection from '@/components/testing/DistributionBoardVerificationSection';

import { Button } from '@/components/ui/button';
import { BarChart3, Wrench, Zap, FileText, X, Camera } from 'lucide-react';

interface ScheduleOfTestsProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

/**
 * Main Schedule of Tests component - clean orchestrator
 */
export const ScheduleOfTests: React.FC<ScheduleOfTestsProps> = ({
  formData,
  onUpdate,
}) => {
  const orientation = useOrientation();
  const useMobileView = orientation.isMobile && !orientation.isLandscape;

  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showAutoFillPrompt, setShowAutoFillPrompt] = useState(false);

  // Load view preference
  useEffect(() => {
    getTableViewPreference().then(setViewMode);
  }, []);

  // Save handler
  const handleSave = useCallback((results: TestResult[]) => {
    onUpdate('scheduleOfTests', results);
  }, [onUpdate]);

  // Circuit state management
  const circuitState = useCircuitState({
    initialResults: formData.scheduleOfTests,
    onSave: handleSave,
  });

  // AI analysis features
  const aiAnalysis = useAIAnalysis({
    testResults: circuitState.testResults,
    setTestResults: circuitState.setTestResults,
    onSave: handleSave,
  });

  // Bulk operations
  const bulkOps = useBulkOperations({
    testResults: circuitState.testResults,
    setTestResults: circuitState.setTestResults,
    onSave: handleSave,
  });

  // View toggle handler
  const toggleViewMode = useCallback(() => {
    const newMode = viewMode === 'table' ? 'card' : 'table';
    setViewMode(newMode);
    setTableViewPreference(newMode);
  }, [viewMode]);

  // Add circuit with auto-fill prompt
  const handleAddCircuit = useCallback(() => {
    circuitState.addCircuit();
    setShowAutoFillPrompt(true);
  }, [circuitState]);

  return (
    <div className="pb-20 lg:pb-4">
      {/* Header */}
      <ScheduleHeader
        circuitCount={circuitState.testResults.length}
        viewMode={viewMode}
        isMobile={useMobileView}
        onAddCircuit={handleAddCircuit}
        onScanBoard={aiAnalysis.openBoardCapture}
        onScanTestResults={aiAnalysis.openTestResultsScan}
        onScribbleToTable={aiAnalysis.openScribbleDialog}
        onSmartAutoFill={bulkOps.openSmartAutoFill}
        onRcdPresets={bulkOps.openRcdPresets}
        onBulkInfill={bulkOps.openBulkInfill}
        onQuickFillRcd={bulkOps.openQuickFillPanel}
        onToggleViewMode={toggleViewMode}
        onRemoveAllCircuits={circuitState.removeAllCircuits}
        onShowAnalytics={() => setShowAnalytics(!showAnalytics)}
      />

      {/* Progress Dashboard - Mobile Only */}
      {useMobileView && circuitState.testResults.length > 0 && (
        <div className="px-3 pt-3">
          <ProgressDashboard
            circuits={circuitState.testResults}
          />
        </div>
      )}

      {/* Circuit List */}
      {useMobileView ? (
        viewMode === 'card' ? (
          <CircuitList
            circuits={circuitState.testResults}
            onUpdate={circuitState.updateCircuit}
            onRemove={circuitState.removeCircuit}
            onBulkUpdate={circuitState.bulkUpdate}
            viewMode={viewMode}
            className="mt-3 px-3"
          />
        ) : (
          <div className="w-full mt-3">
            <MobileHorizontalScrollTable
              testResults={circuitState.testResults}
              onUpdate={circuitState.updateCircuit}
              onRemove={circuitState.removeCircuit}
              onBulkUpdate={circuitState.bulkUpdate}
              onBulkFieldUpdate={circuitState.bulkFieldUpdate}
            />
          </div>
        )
      ) : (
        <div className="w-full space-y-6 py-6 lg:py-8 px-4 lg:px-6 bg-elec-gray border border-primary/30 rounded-xl shadow-lg shadow-black/10">
          <div data-autofill-section>
            <EnhancedTestResultDesktopTable
              testResults={circuitState.testResults}
              onUpdate={circuitState.updateCircuit}
              onRemove={circuitState.removeCircuit}
              allResults={circuitState.testResults}
              onBulkUpdate={circuitState.bulkUpdate}
              onAddCircuit={handleAddCircuit}
              onBulkFieldUpdate={circuitState.bulkFieldUpdate}
            />
          </div>

          {/* Analytics Button */}
          <div className="flex justify-center pt-6 border-t border-border/50">
            <Button
              onClick={() => setShowAnalytics(!showAnalytics)}
              size="default"
              variant="outline"
              className="h-10 px-6 gap-2 text-base"
              disabled={circuitState.testResults.length === 0}
            >
              <BarChart3 className="h-4 w-4" />
              Test Results Analytics
            </Button>
          </div>

          {showAnalytics && circuitState.testResults.length > 0 && (
            <TestAnalytics testResults={circuitState.testResults} />
          )}
        </div>
      )}

      {/* Mobile Analytics - Expandable */}
      {useMobileView && circuitState.testResults.length > 0 && showAnalytics && (
        <div className="px-3 py-4 space-y-4">
          <TestAnalytics testResults={circuitState.testResults} />
        </div>
      )}

      {/* Info Sections */}
      <InfoSections formData={formData} onUpdate={onUpdate} />

      {/* All Dialogs */}
      <Dialogs
        aiAnalysis={aiAnalysis}
        bulkOps={bulkOps}
        circuitState={circuitState}
        showAutoFillPrompt={showAutoFillPrompt}
        setShowAutoFillPrompt={setShowAutoFillPrompt}
      />
    </div>
  );
};

// Info Sections component
const InfoSections: React.FC<{ formData: any; onUpdate: (field: string, value: any) => void }> = ({
  formData,
  onUpdate,
}) => (
  <div className="w-full space-y-6 p-4 lg:p-6 pb-20 lg:pb-6 mt-6 bg-elec-gray rounded-xl border border-primary/30 shadow-lg shadow-black/10">
    {/* Two-column layout on xl screens */}
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {/* Test Instrument Info */}
      <div className="space-y-3">
        <h3 className="text-sm sm:text-base font-semibold flex items-center gap-2 px-1">
          <Wrench className="h-4 w-4 text-elec-yellow" />
          Test Instrument Information
        </h3>
        <div className="bg-background/50 rounded-lg p-4">
          <TestInstrumentInfo formData={formData} onUpdate={onUpdate} />
        </div>
      </div>

      {/* Distribution Board Verification */}
      <div className="space-y-3">
        <h3 className="text-sm sm:text-base font-semibold flex items-center gap-2 px-1">
          <Zap className="h-4 w-4 text-elec-yellow" />
          Distribution Board Verification
        </h3>
        <div className="bg-background/50 rounded-lg p-4">
          <DistributionBoardVerificationSection
            data={{
              dbReference: formData.dbReference || '',
              zdb: formData.zdb || '',
              ipf: formData.ipf || '',
              confirmedCorrectPolarity: formData.confirmedCorrectPolarity || false,
              confirmedPhaseSequence: formData.confirmedPhaseSequence || false,
              spdOperationalStatus: formData.spdOperationalStatus || false,
              spdNA: formData.spdNA || false,
            }}
            onUpdate={(field, value) => onUpdate(field, value)}
          />
        </div>
      </div>
    </div>

    <div className="h-px bg-muted/30" />

    {/* Test Method - Full Width */}
    <div className="space-y-3">
      <h3 className="text-sm sm:text-base font-semibold flex items-center gap-2 px-1">
        <FileText className="h-4 w-4 text-elec-yellow" />
        Test Method & Notes
      </h3>
      <div className="bg-background/50 rounded-lg p-4">
        <TestMethodInfo formData={formData} onUpdate={onUpdate} />
      </div>
    </div>
  </div>
);

// Dialogs component (renders all dialogs)
const Dialogs: React.FC<{
  aiAnalysis: ReturnType<typeof useAIAnalysis>;
  bulkOps: ReturnType<typeof useBulkOperations>;
  circuitState: ReturnType<typeof useCircuitState>;
  showAutoFillPrompt: boolean;
  setShowAutoFillPrompt: (show: boolean) => void;
}> = ({ aiAnalysis, bulkOps, circuitState, showAutoFillPrompt, setShowAutoFillPrompt }) => (
  <>
    {/* Board Capture - Tool Sheet Pattern */}
    {aiAnalysis.showBoardCapture && (
      <>
        <div className="tool-sheet-overlay" onClick={aiAnalysis.closeBoardCapture} />
        <div className="tool-sheet-container">
          <div className="tool-sheet-handle md:hidden" />
          <div className="tool-sheet-header">
            <div className="tool-sheet-title">
              <Camera className="h-5 w-5 text-elec-yellow" />
              AI Board Scanner
            </div>
            <Button variant="ghost" size="icon" onClick={aiAnalysis.closeBoardCapture}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="tool-sheet-content">
            <BoardPhotoCapture
              onAnalysisComplete={aiAnalysis.handleBoardAnalysisComplete}
              onClose={aiAnalysis.closeBoardCapture}
              renderContentOnly={true}
            />
          </div>
        </div>
      </>
    )}

    {/* Test Results Scan - Tool Sheet Pattern */}
    {aiAnalysis.showTestResultsScan && (
      <>
        <div className="tool-sheet-overlay" onClick={aiAnalysis.closeTestResultsScan} />
        <div className="tool-sheet-container">
          <div className="tool-sheet-handle md:hidden" />
          <div className="tool-sheet-header">
            <div className="tool-sheet-title">
              <Camera className="h-5 w-5 text-elec-yellow" />
              Scan Test Results
            </div>
            <Button variant="ghost" size="icon" onClick={aiAnalysis.closeTestResultsScan}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="tool-sheet-content">
            <TestResultsPhotoCapture
              onAnalysisComplete={aiAnalysis.handleTestResultsAnalysisComplete}
              onClose={aiAnalysis.closeTestResultsScan}
              renderContentOnly={true}
            />
          </div>
        </div>
      </>
    )}

    {/* AI Review - Tool Sheet Pattern */}
    {aiAnalysis.showAIReview && aiAnalysis.detectedCircuits && (
      <>
        <div className="tool-sheet-overlay" onClick={aiAnalysis.closeAIReview} />
        <div className="tool-sheet-container">
          <div className="tool-sheet-handle md:hidden" />
          <div className="tool-sheet-header">
            <div className="tool-sheet-title">
              <Zap className="h-5 w-5 text-elec-yellow" />
              Review Detected Circuits
            </div>
            <Button variant="ghost" size="icon" onClick={aiAnalysis.closeAIReview}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="tool-sheet-content">
            <SimpleCircuitTable
              circuits={aiAnalysis.detectedCircuits.circuits || []}
              board={aiAnalysis.detectedCircuits.board || {}}
              onApply={aiAnalysis.handleApplyAICircuits}
              onClose={aiAnalysis.closeAIReview}
            />
          </div>
        </div>
      </>
    )}

    {/* Test Results Review */}
    {aiAnalysis.showTestResultsReview && aiAnalysis.extractedTestResults && (
      <TestResultsReviewDialog
        open={aiAnalysis.showTestResultsReview}
        onClose={aiAnalysis.closeTestResultsReview}
        extractedData={aiAnalysis.extractedTestResults}
        onAccept={aiAnalysis.handleAcceptTestResults}
      />
    )}

    {/* Scribble Dialog */}
    {aiAnalysis.showScribbleDialog && (
      <ScribbleToTableDialog
        onCircuitsAdded={aiAnalysis.handleScribbleCircuits}
        onClose={aiAnalysis.closeScribbleDialog}
      />
    )}

    {/* Auto Fill Prompt */}
    <SmartAutoFillPromptDialog
      open={showAutoFillPrompt}
      onOpenChange={setShowAutoFillPrompt}
      onUseAutoFill={(circuitType, suggestions) => {
        circuitState.createCircuit(true, circuitType, suggestions);
        setShowAutoFillPrompt(false);
      }}
      onSkip={() => {
        circuitState.createCircuit(false);
        setShowAutoFillPrompt(false);
      }}
      circuitNumber={circuitState.newCircuitNumber}
    />

    {/* Smart Auto Fill - Tool Sheet Pattern */}
    {bulkOps.showSmartAutoFillDialog && (
      <>
        <div className="tool-sheet-overlay" onClick={bulkOps.closeSmartAutoFill} />
        <div className="tool-sheet-container">
          <div className="tool-sheet-handle md:hidden" />
          <div className="tool-sheet-header">
            <div className="tool-sheet-title">
              <Zap className="h-5 w-5 text-elec-yellow" />
              Smart Circuit Auto-Fill
            </div>
            <Button variant="ghost" size="icon" onClick={bulkOps.closeSmartAutoFill}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="tool-sheet-content">
            <MobileSmartAutoFill
              testResults={circuitState.testResults}
              onUpdate={circuitState.bulkUpdate}
            />
          </div>
        </div>
      </>
    )}

    {/* RCD Presets - Tool Sheet Pattern */}
    {bulkOps.showRcdPresetsDialog && (
      <>
        <div className="tool-sheet-overlay" onClick={bulkOps.closeRcdPresets} />
        <div className="tool-sheet-container">
          <div className="tool-sheet-handle md:hidden" />
          <div className="tool-sheet-header">
            <div className="tool-sheet-title">
              <Zap className="h-5 w-5 text-elec-yellow" />
              Quick RCD Presets
            </div>
            <Button variant="ghost" size="icon" onClick={bulkOps.closeRcdPresets}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="tool-sheet-content">
            <QuickRcdPresets
              testResults={circuitState.testResults.map((r) => ({
                id: r.id,
                circuitDesignation: r.circuitDesignation,
              }))}
              onApplyToCircuits={bulkOps.handleApplyRcdPreset}
            />
          </div>
        </div>
      </>
    )}

    {/* Bulk Infill */}
    <BulkInfillDialog
      open={bulkOps.showBulkInfillDialog}
      onOpenChange={(open) => (open ? bulkOps.openBulkInfill() : bulkOps.closeBulkInfill())}
      testResults={circuitState.testResults}
      onApply={bulkOps.handleBulkInfill}
    />
  </>
);

export default ScheduleOfTests;
