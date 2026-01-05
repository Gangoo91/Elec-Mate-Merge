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

// Existing components (will migrate later)
import EnhancedTestResultDesktopTable from '@/components/inspection-app/EnhancedTestResultDesktopTable';
import MobileOptimizedTestTable from '@/components/inspection-app/mobile/MobileOptimizedTestTable';
import { MobileHorizontalScrollTable } from '@/components/inspection-app/mobile/MobileHorizontalScrollTable';
import TestAnalytics from '@/components/inspection-app/TestAnalytics';

// Dialogs (will extract later)
import { BoardPhotoCapture } from '@/components/inspection-app/testing/BoardPhotoCapture';
import TestResultsPhotoCapture from '@/components/inspection-app/testing/TestResultsPhotoCapture';
import { SimpleCircuitTable } from '@/components/inspection-app/testing/SimpleCircuitTable';
import TestResultsReviewDialog from '@/components/inspection-app/testing/TestResultsReviewDialog';
import ScribbleToTableDialog from '@/components/inspection-app/mobile/ScribbleToTableDialog';
import SmartAutoFillPromptDialog from '@/components/inspection-app/SmartAutoFillPromptDialog';
import MobileSmartAutoFill from '@/components/inspection-app/mobile/MobileSmartAutoFill';
import QuickRcdPresets from '@/components/inspection-app/QuickRcdPresets';
import BulkInfillDialog from '@/components/inspection-app/BulkInfillDialog';

// Info sections
import TestInstrumentInfo from '@/components/inspection-app/TestInstrumentInfo';
import TestMethodInfo from '@/components/inspection-app/TestMethodInfo';
import DistributionBoardVerificationSection from '@/components/inspection-app/testing/DistributionBoardVerificationSection';

import { Button } from '@/components/ui/button';
import { BarChart3, Wrench, Zap, FileText, X } from 'lucide-react';

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

      {/* Circuit List */}
      {useMobileView ? (
        viewMode === 'card' ? (
          <CircuitList
            circuits={circuitState.testResults}
            onUpdate={circuitState.updateCircuit}
            onRemove={circuitState.removeCircuit}
            onBulkUpdate={circuitState.bulkUpdate}
            viewMode={viewMode}
            className="mt-3"
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
        <div className="w-full space-y-8 py-6 lg:py-8 px-0 bg-elec-gray border border-primary/30 rounded-xl shadow-lg shadow-black/10">
          <div data-autofill-section className="mt-6">
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

      {/* Mobile Analytics */}
      {useMobileView && circuitState.testResults.length > 0 && (
        <div className="border-t p-4 space-y-4">
          <Button
            onClick={() => setShowAnalytics(!showAnalytics)}
            size="sm"
            variant="outline"
            className="w-full gap-2 h-11"
          >
            <BarChart3 className="h-4 w-4" />
            Test Results Analytics
          </Button>
          {showAnalytics && <TestAnalytics testResults={circuitState.testResults} />}
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
  <div className="w-full space-y-6 p-4 lg:p-8 pb-20 lg:pb-4 mt-6 bg-elec-gray rounded-xl border border-primary/30 shadow-lg shadow-black/10">
    <div className="space-y-3">
      <h3 className="text-sm sm:text-base font-semibold flex items-center gap-2 px-1">
        <Wrench className="h-4 w-4 text-elec-yellow" />
        Test Instrument Information
      </h3>
      <div className="bg-background/50 rounded-lg p-3">
        <TestInstrumentInfo formData={formData} onUpdate={onUpdate} />
      </div>
    </div>

    <div className="h-px bg-muted/50" />

    <div className="space-y-3">
      <h3 className="text-sm sm:text-base font-semibold flex items-center gap-2 px-1">
        <Zap className="h-4 w-4 text-elec-yellow" />
        Distribution Board Verification
      </h3>
      <div className="bg-background/50 rounded-lg p-3">
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

    <div className="h-px bg-muted/50" />

    <div className="space-y-3">
      <h3 className="text-sm sm:text-base font-semibold flex items-center gap-2 px-1">
        <FileText className="h-4 w-4 text-elec-yellow" />
        Test Method & Notes
      </h3>
      <div className="bg-background/50 rounded-lg p-3">
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
    {/* Board Capture */}
    {aiAnalysis.showBoardCapture && (
      <DialogOverlay>
        <BoardPhotoCapture
          onAnalysisComplete={aiAnalysis.handleBoardAnalysisComplete}
          onClose={aiAnalysis.closeBoardCapture}
        />
      </DialogOverlay>
    )}

    {/* Test Results Scan */}
    {aiAnalysis.showTestResultsScan && (
      <DialogOverlay>
        <TestResultsPhotoCapture
          onAnalysisComplete={aiAnalysis.handleTestResultsAnalysisComplete}
          onClose={aiAnalysis.closeTestResultsScan}
        />
      </DialogOverlay>
    )}

    {/* AI Review */}
    {aiAnalysis.showAIReview && aiAnalysis.detectedCircuits && (
      <DialogOverlay className="p-4">
        <div className="max-h-[90vh] overflow-auto w-full">
          <SimpleCircuitTable
            circuits={aiAnalysis.detectedCircuits.circuits || []}
            board={aiAnalysis.detectedCircuits.board || {}}
            onApply={aiAnalysis.handleApplyAICircuits}
            onClose={aiAnalysis.closeAIReview}
          />
        </div>
      </DialogOverlay>
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

    {/* Smart Auto Fill */}
    {bulkOps.showSmartAutoFillDialog && (
      <DialogOverlay>
        <div className="bg-background rounded-lg max-w-2xl w-full">
          <DialogHeader title="Smart Circuit Auto-Fill" onClose={bulkOps.closeSmartAutoFill} />
          <div className="p-4">
            <MobileSmartAutoFill
              testResults={circuitState.testResults}
              onUpdate={circuitState.bulkUpdate}
            />
          </div>
        </div>
      </DialogOverlay>
    )}

    {/* RCD Presets */}
    {bulkOps.showRcdPresetsDialog && (
      <DialogOverlay>
        <div className="bg-background rounded-lg max-w-2xl w-full">
          <DialogHeader title="Quick RCD Presets" onClose={bulkOps.closeRcdPresets} />
          <div className="p-4">
            <QuickRcdPresets
              testResults={circuitState.testResults.map((r) => ({
                id: r.id,
                circuitDesignation: r.circuitDesignation,
              }))}
              onApplyToCircuits={bulkOps.handleApplyRcdPreset}
            />
          </div>
        </div>
      </DialogOverlay>
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

// Helper components
const DialogOverlay: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <div className={`fixed inset-0 bg-black/50 flex items-center justify-center p-3 md:p-4 z-50 ${className}`}>
    <div className="max-w-2xl w-full">{children}</div>
  </div>
);

const DialogHeader: React.FC<{ title: string; onClose: () => void }> = ({ title, onClose }) => (
  <div className="flex items-center justify-between p-4 border-b">
    <h3 className="text-lg font-semibold">{title}</h3>
    <Button variant="ghost" size="sm" onClick={onClose}>
      <X className="h-4 w-4" />
    </Button>
  </div>
);

export default ScheduleOfTests;
