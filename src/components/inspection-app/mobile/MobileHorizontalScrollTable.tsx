import React, { useRef } from 'react';
import { Table, TableBody, TableRow, TableCell } from '@/components/ui/table';
import { TestResult } from '@/types/testResult';
import { MobileHorizontalScrollTableHeader } from './MobileHorizontalScrollTableHeader';
import { MobileHorizontalScrollTableRow } from './MobileHorizontalScrollTableRow';
import { toast } from 'sonner';

interface MobileHorizontalScrollTableProps {
  testResults: TestResult[];
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
  onRemove: (id: string) => void;
  onBulkUpdate?: (id: string, updates: Partial<TestResult>) => void;
  onBulkFieldUpdate?: (field: keyof TestResult, value: string) => void;
}

export const MobileHorizontalScrollTable: React.FC<MobileHorizontalScrollTableProps> = ({
  testResults,
  onUpdate,
  onRemove,
  onBulkUpdate,
  onBulkFieldUpdate,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleFillAllRcdTestButton = () => {
    if (onBulkFieldUpdate) {
      onBulkFieldUpdate('rcdTestButton', '✓');
    } else {
      testResults.forEach(result => {
        onUpdate(result.id, 'rcdTestButton', '✓');
      });
    }
    toast.success(`✓ All ${testResults.length} circuits set to Pass`, {
      description: 'RCD Test Button operation',
      duration: 2000,
    });
  };

  const handleFillAllAfdd = () => {
    if (onBulkFieldUpdate) {
      onBulkFieldUpdate('afddTest', '✓');
    } else {
      testResults.forEach(result => {
        onUpdate(result.id, 'afddTest', '✓');
      });
    }
    toast.success(`✓ All ${testResults.length} circuits set to Pass`, {
      description: 'AFDD Test operation',
      duration: 2000,
    });
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
    toast.success(`✓ All RCD Rating (A) set to ${value}A`, {
      description: `${testResults.length} circuit${testResults.length > 1 ? 's' : ''} updated`,
      duration: 2000,
    });
  };

  const handleApplyRcdPreset = (circuitIds: string[], preset: { bsStandard: string; type: string; rating: string; ratingA: string; label: string }) => {
    // Use onBulkUpdate if available for atomic updates, otherwise batch with requestAnimationFrame
    if (onBulkUpdate) {
      circuitIds.forEach(id => {
        onBulkUpdate(id, {
          rcdBsStandard: preset.bsStandard,
          rcdType: preset.type,
          rcdRating: preset.rating,
          rcdRatingA: preset.ratingA,
        });
      });
    } else {
      // Batch updates properly using requestAnimationFrame
      circuitIds.forEach(id => {
        requestAnimationFrame(() => {
          onUpdate(id, 'rcdBsStandard', preset.bsStandard);
          onUpdate(id, 'rcdType', preset.type);
          onUpdate(id, 'rcdRating', preset.rating);
          onUpdate(id, 'rcdRatingA', preset.ratingA);
        });
      });
    }
    
    toast.success(`✓ ${preset.label} Applied`, {
      description: `RCD details set for ${circuitIds.length} circuit${circuitIds.length > 1 ? 's' : ''}`,
      duration: 2000,
    });
  };

  return (
    <div className="w-screen relative left-[calc(-50vw+50%)]">
      {/* Table Container - Full bleed, edge-to-edge */}
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto overflow-y-visible"
        style={{
          WebkitOverflowScrolling: 'touch',
          scrollBehavior: 'smooth',
          overscrollBehaviorX: 'contain',
          touchAction: 'pan-x',
        }}
      >
        <Table className="relative border-collapse w-full">
          <MobileHorizontalScrollTableHeader 
            onFillAllRcdTestButton={handleFillAllRcdTestButton}
            onFillAllAfdd={handleFillAllAfdd}
            onFillAllRcdBsStandard={handleFillAllRcdBsStandard}
            onFillAllRcdType={handleFillAllRcdType}
            onFillAllRcdRating={handleFillAllRcdRating}
            onFillAllRcdRatingA={handleFillAllRcdRatingA}
          />
          <TableBody>
            {/* Spacer row to create gap for sticky header */}
            <TableRow className="h-14">
              <TableCell colSpan={100} className="p-0 border-0 bg-transparent" />
            </TableRow>
            {testResults.map((result) => (
              <MobileHorizontalScrollTableRow
                key={result.id}
                result={result}
                onUpdate={onUpdate}
                onRemove={onRemove}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
