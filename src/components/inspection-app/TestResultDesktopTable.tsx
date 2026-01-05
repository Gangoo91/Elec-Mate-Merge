
import React, { useState } from 'react';
import { Table, TableBody } from '@/components/ui/table';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { TestResult } from '@/types/testResult';
import TestResultDesktopTableHeader from './TestResultDesktopTableHeader';
import TestResultDesktopTableRow from './TestResultDesktopTableRow';
import CompactCircuitAutoFillSection from './CompactCircuitAutoFillSection';
import RegulationValidationControls from './RegulationValidationControls';

interface TestResultDesktopTableProps {
  testResults: TestResult[];
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
  onRemove: (id: string) => void;
  allResults: TestResult[];
  onBulkUpdate?: (id: string, updates: Partial<TestResult>) => void;
}

const TestResultDesktopTable: React.FC<TestResultDesktopTableProps> = ({ 
  testResults, 
  onUpdate, 
  onRemove,
  onBulkUpdate
}) => {
  const [showRegulationStatus, setShowRegulationStatus] = useState(false);

  // Create a bulk update handler that matches the mobile interface
  const handleBulkUpdate = (id: string, updates: Partial<TestResult>) => {
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
  };

  // Empty state check
  const isEmpty = testResults.length === 0;

  return (
    <div className="w-full space-y-4">
      {/* Compact Smart Auto-Fill Section */}
      {!isEmpty && (
        <CompactCircuitAutoFillSection 
          testResults={testResults}
          onUpdate={handleBulkUpdate}
        />
      )}

      {/* Desktop Table */}
      <div className="border-2 border-border rounded-lg bg-background shadow-sm overflow-hidden">
        {isEmpty ? (
          <div className="text-center py-16 px-4">
            <div className="text-4xl mb-4">⚡</div>
            <p className="text-lg font-medium text-foreground mb-2">No circuits added yet</p>
            <p className="text-muted-foreground mb-6">
              Start by adding your first circuit using the "+ Add Circuit" button above
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" size="sm">
                📚 View Tutorial
              </Button>
              <Button variant="default" size="sm">
                ⚡ Load Example
              </Button>
            </div>
          </div>
        ) : (
          <ScrollArea className="w-full">
            <div className="min-w-max w-full bg-background">
              <Table className="text-sm border-collapse table-fixed">
                <TestResultDesktopTableHeader showRegulationStatus={showRegulationStatus} />
                <TableBody>
                  {testResults.map((result, index) => (
                    <TestResultDesktopTableRow
                      key={result.id}
                      result={result}
                      onUpdate={onUpdate}
                      onRemove={onRemove}
                      showRegulationStatus={showRegulationStatus}
                      rowNumber={index + 1}
                    />
                  ))}
                </TableBody>
              </Table>
            </div>
            <ScrollBar orientation="horizontal" className="h-3" />
          </ScrollArea>
        )}
      </div>

      {/* Regulation Validation Controls */}
      {!isEmpty && (
        <RegulationValidationControls
          testResults={testResults}
          showRegulationStatus={showRegulationStatus}
          onToggleRegulationStatus={setShowRegulationStatus}
        />
      )}

      <div className="text-xs text-muted-foreground mt-3 text-center space-y-1">
        <div className="font-medium">BS 7671 Schedule of Test Results</div>
        <div>
          ⌨️ <strong>Navigation:</strong> Tab/Enter to navigate • Right-click for copy/paste options
        </div>
      </div>
    </div>
  );
};

export default TestResultDesktopTable;
