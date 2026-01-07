import React, { useState, useCallback } from 'react';
import { Table, TableBody } from '@/components/ui/table';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { TestResult } from '@/types/testResult';
import { Zap, BookOpen, FileSpreadsheet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EnhancedTestResultDesktopTableHeader from './EnhancedTestResultDesktopTableHeader';
import EnhancedTestResultDesktopTableRow from './EnhancedTestResultDesktopTableRow';
import RegulationValidationControls from './RegulationValidationControls';
import { toast } from 'sonner';
import { getMaxZsFromDeviceDetails } from '@/utils/zsCalculations';

interface EnhancedTestResultDesktopTableProps {
  testResults: TestResult[];
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
  onRemove: (id: string) => void;
  allResults: TestResult[];
  onBulkUpdate?: (id: string, updates: Partial<TestResult>) => void;
  onAddCircuit: () => void;
  onBulkFieldUpdate?: (field: keyof TestResult, value: string) => void;
}

const EnhancedTestResultDesktopTable: React.FC<EnhancedTestResultDesktopTableProps> = ({ 
  testResults, 
  onUpdate, 
  onRemove,
  onBulkUpdate,
  onAddCircuit,
  onBulkFieldUpdate
}) => {
  const [showRegulationStatus, setShowRegulationStatus] = useState(false);
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());

  // Create a bulk update handler that matches the mobile interface
  const handleBulkUpdate = useCallback((id: string, updates: Partial<TestResult>) => {
    if (onBulkUpdate) {
      onBulkUpdate(id, updates);
    } else {
      // Fallback to individual updates if onBulkUpdate is not provided
      Object.entries(updates).forEach(([field, value]) => {
        if (value !== undefined && value !== null) {
          onUpdate(id, field as keyof TestResult, String(value));
        }
      });
    }
  }, [onBulkUpdate, onUpdate]);

  const toggleGroupCollapse = (groupName: string) => {
    const newCollapsed = new Set(collapsedGroups);
    if (newCollapsed.has(groupName)) {
      newCollapsed.delete(groupName);
    } else {
      newCollapsed.add(groupName);
    }
    setCollapsedGroups(newCollapsed);
  };

  const handleFillAllRcdTestButton = () => {
    if (onBulkFieldUpdate) {
      onBulkFieldUpdate('rcdTestButton', '✓');
    } else {
      testResults.forEach(result => {
        onUpdate(result.id, 'rcdTestButton', '✓');
      });
    }
    toast.success(`All ${testResults.length} RCD Test Button fields filled with Pass`);
  };

  const handleFillAllAfdd = () => {
    if (onBulkFieldUpdate) {
      onBulkFieldUpdate('afddTest', '✓');
    } else {
      testResults.forEach(result => {
        onUpdate(result.id, 'afddTest', '✓');
      });
    }
    toast.success(`All ${testResults.length} AFDD fields filled with Pass ✓`);
  };

  const handleFillAllRcdBsStandard = (value: string) => {
    if (onBulkFieldUpdate) {
      onBulkFieldUpdate('rcdBsStandard', value);
    } else {
      testResults.forEach(result => {
        onUpdate(result.id, 'rcdBsStandard', value);
      });
    }
    toast.success(`All RCD BS Standard fields filled with ${value}`);
  };

  const handleFillAllRcdType = (value: string) => {
    if (onBulkFieldUpdate) {
      onBulkFieldUpdate('rcdType', value);
    } else {
      testResults.forEach(result => {
        onUpdate(result.id, 'rcdType', value);
      });
    }
    toast.success(`All RCD Type fields filled with ${value}`);
  };

  const handleFillAllRcdRating = (value: string) => {
    if (onBulkFieldUpdate) {
      onBulkFieldUpdate('rcdRating', value);
    } else {
      testResults.forEach(result => {
        onUpdate(result.id, 'rcdRating', value);
      });
    }
    toast.success(`All RCD IΔn fields filled with ${value}mA`);
  };

  const handleFillAllRcdRatingA = (value: string) => {
    if (onBulkFieldUpdate) {
      onBulkFieldUpdate('rcdRatingA', value);
    } else {
      testResults.forEach(result => {
        onUpdate(result.id, 'rcdRatingA', value);
      });
    }
    toast.success(`All RCD Rating (A) fields filled with ${value}A`);
  };

  const handleFillAllMaxZs = () => {
    let successCount = 0;
    let skippedCount = 0;
    
    testResults.forEach(result => {
      // Skip if Max Zs is already filled
      if (result.maxZs && result.maxZs.trim() !== '') {
        skippedCount++;
        return;
      }
      
      const bsStandard = result.bsStandard;
      const curve = result.protectiveDeviceCurve;
      const rating = result.protectiveDeviceRating;
      
      // Check if we have required data
      if (!bsStandard || !rating) {
        skippedCount++;
        return;
      }
      
      // For MCB/RCBO, curve is required
      // Import the helper at the top of the file
      const bsStandardRequiresCurve = (bs: string): boolean => bs === 'MCB' || bs === 'RCBO';
      const needsCurve = bsStandardRequiresCurve(bsStandard);
      if (needsCurve && !curve) {
        skippedCount++;
        return;
      }
      
      // Calculate Max Zs
      const maxZs = getMaxZsFromDeviceDetails(bsStandard, curve || '', rating);
      if (maxZs !== null) {
        onUpdate(result.id, 'maxZs', maxZs.toString());
        successCount++;
      } else {
        skippedCount++;
      }
    });
    
    // Show user feedback
    if (successCount > 0) {
      toast.success(`Max Zs auto-filled for ${successCount} circuit${successCount > 1 ? 's' : ''}`);
    }
    if (skippedCount > 0) {
      toast.info(`${skippedCount} circuit${skippedCount > 1 ? 's' : ''} skipped (already filled or missing protective device details)`);
    }
    if (successCount === 0 && skippedCount === 0) {
      toast.error('No circuits available to fill');
    }
  };

  const isEmpty = testResults.length === 0;

  return (
    <div className="w-full space-y-6">
      {/* Table - Full width edge-to-edge */}
      <div className="w-full">
        {isEmpty ? (
          <div className="border-2 border-dashed border-border rounded-lg bg-background/50 p-12 text-center">
            <Zap className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium mb-2">No Circuits Added Yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Start by adding your first circuit using the "+ Add Circuit" button above. 
              You can also auto-fill from existing circuit schedules.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" size="sm" onClick={() => window.open('/learning', '_blank')}>
                <BookOpen className="h-4 w-4 mr-2" />
                View Tutorial
              </Button>
              <Button onClick={onAddCircuit}>
                <Zap className="h-4 w-4 mr-2" />
                Add First Circuit
              </Button>
            </div>
          </div>
        ) : (
        <div className="sot-table-wrapper">
          <ScrollArea className="w-full h-[calc(100vh-180px)]" style={{ overscrollBehaviorX: 'contain' }}>
            <div className="min-w-max">
              <Table useWrapper={false} className="text-sm border-collapse w-full">
                  <EnhancedTestResultDesktopTableHeader 
                    showRegulationStatus={showRegulationStatus}
                    collapsedGroups={collapsedGroups}
                    onToggleGroup={toggleGroupCollapse}
                    onFillAllRcdTestButton={handleFillAllRcdTestButton}
                    onFillAllAfdd={handleFillAllAfdd}
                    onFillAllRcdBsStandard={handleFillAllRcdBsStandard}
                    onFillAllRcdType={handleFillAllRcdType}
                    onFillAllRcdRating={handleFillAllRcdRating}
                    onFillAllRcdRatingA={handleFillAllRcdRatingA}
                    onFillAllMaxZs={handleFillAllMaxZs}
                  />
                  <TableBody>
                     {testResults.map((result, index) => (
                      <EnhancedTestResultDesktopTableRow
                        key={result.id}
                        result={result}
                        onUpdate={onUpdate}
                        onRemove={onRemove}
                        onBulkUpdate={handleBulkUpdate}
                        showRegulationStatus={showRegulationStatus}
                        collapsedGroups={collapsedGroups}
                        rowNumber={index + 1}
                      />
                    ))}
              </TableBody>
            </Table>
          </div>
          <ScrollBar orientation="horizontal" className="h-3 sticky bottom-0 z-40 bg-background border-t border-border shadow-[0_-2px_8px_rgba(0,0,0,0.1)]" />
          <ScrollBar orientation="vertical" className="w-3 z-40 opacity-100" />
        </ScrollArea>
          </div>
        )}
      </div>

      {/* Regulation Validation Controls */}
      <RegulationValidationControls
        testResults={testResults}
        showRegulationStatus={showRegulationStatus}
        onToggleRegulationStatus={setShowRegulationStatus}
      />

      {!isEmpty && (
        <div className="text-xs text-muted-foreground mt-2 text-center space-y-1">
          <div className="font-medium">BS 7671 Schedule of Test Results</div>
          <div>
            ⌨️ <strong>Tab Navigation:</strong> Tab/Shift+Tab to navigate • Enter moves down • Arrow keys navigate cells
          </div>
          <div>
            📋 <strong>Copy/Paste:</strong> Right-click for copy/paste options
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedTestResultDesktopTable;