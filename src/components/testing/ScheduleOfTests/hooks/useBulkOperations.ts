import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { TestResult } from '@/types/testResult';

interface BulkOperationsState {
  showSmartAutoFillDialog: boolean;
  showRcdPresetsDialog: boolean;
  showBulkInfillDialog: boolean;
  showQuickFillPanel: boolean;
}

interface UseBulkOperationsOptions {
  testResults: TestResult[];
  setTestResults: React.Dispatch<React.SetStateAction<TestResult[]>>;
  onSave: (results: TestResult[]) => void;
}

/**
 * Custom hook for bulk operations on circuits
 * Handles RCD presets, bulk infill, smart auto-fill dialogs
 */
export function useBulkOperations({
  testResults,
  setTestResults,
  onSave,
}: UseBulkOperationsOptions) {
  const [state, setState] = useState<BulkOperationsState>({
    showSmartAutoFillDialog: false,
    showRcdPresetsDialog: false,
    showBulkInfillDialog: false,
    showQuickFillPanel: false,
  });

  // Dialog toggles
  const openSmartAutoFill = useCallback(() => {
    setState((s) => ({ ...s, showSmartAutoFillDialog: true }));
  }, []);

  const closeSmartAutoFill = useCallback(() => {
    setState((s) => ({ ...s, showSmartAutoFillDialog: false }));
  }, []);

  const openRcdPresets = useCallback(() => {
    setState((s) => ({ ...s, showRcdPresetsDialog: true }));
  }, []);

  const closeRcdPresets = useCallback(() => {
    setState((s) => ({ ...s, showRcdPresetsDialog: false }));
  }, []);

  const openBulkInfill = useCallback(() => {
    setState((s) => ({ ...s, showBulkInfillDialog: true }));
  }, []);

  const closeBulkInfill = useCallback(() => {
    setState((s) => ({ ...s, showBulkInfillDialog: false }));
  }, []);

  const openQuickFillPanel = useCallback(() => {
    setState((s) => ({ ...s, showQuickFillPanel: true }));
  }, []);

  const closeQuickFillPanel = useCallback(() => {
    setState((s) => ({ ...s, showQuickFillPanel: false }));
  }, []);

  // Bulk infill handler
  const handleBulkInfill = useCallback(
    (value: string, mode: 'all' | 'empty') => {
      const fillableFields: (keyof TestResult)[] = [
        'typeOfWiring',
        'referenceMethod',
        'pointsServed',
        'liveSize',
        'cpcSize',
        'bsStandard',
        'protectiveDeviceType',
        'protectiveDeviceCurve',
        'protectiveDeviceRating',
        'protectiveDeviceKaRating',
        'maxZs',
        'rcdBsStandard',
        'rcdType',
        'rcdRating',
        'rcdRatingA',
        'ringR1',
        'ringRn',
        'ringR2',
        'r1r2',
        'r2',
        'insulationTestVoltage',
        'insulationLiveNeutral',
        'insulationLiveEarth',
        'polarity',
        'zs',
        'rcdOneX',
        'rcdTestButton',
        'afddTest',
        'pfc',
        'notes',
      ];

      let updatedCount = 0;

      const updatedResults = testResults.map((result) => {
        let updatedResult = { ...result };
        let hasChanges = false;

        fillableFields.forEach((field) => {
          const currentValue = result[field];
          const isEmpty = !currentValue || currentValue.toString().trim() === '';

          if (mode === 'all' || (mode === 'empty' && isEmpty)) {
            (updatedResult as any)[field] = value;
            updatedCount++;
            hasChanges = true;
          }
        });

        if (hasChanges && result.autoFilled) {
          updatedResult.autoFilled = false;
        }

        return updatedResult;
      });

      setTestResults(updatedResults);
      onSave(updatedResults);

      toast.success(`Filled ${updatedCount} fields with "${value}"`);
      setState((s) => ({ ...s, showBulkInfillDialog: false }));
    },
    [testResults, setTestResults, onSave]
  );

  // Quick Fill RCD handlers
  const handleFillAllRcdBsStandard = useCallback(
    (value: string) => {
      const updatedResults = testResults.map((result) => ({
        ...result,
        rcdBsStandard: value,
      }));
      setTestResults(updatedResults);
      onSave(updatedResults);
      toast.success(`Applied RCD BS Standard "${value}" to all circuits`);
    },
    [testResults, setTestResults, onSave]
  );

  const handleFillAllRcdType = useCallback(
    (value: string) => {
      const updatedResults = testResults.map((result) => ({
        ...result,
        rcdType: value,
      }));
      setTestResults(updatedResults);
      onSave(updatedResults);
      toast.success(`Applied RCD Type "${value}" to all circuits`);
    },
    [testResults, setTestResults, onSave]
  );

  const handleFillAllRcdRating = useCallback(
    (value: string) => {
      const updatedResults = testResults.map((result) => ({
        ...result,
        rcdRating: value,
      }));
      setTestResults(updatedResults);
      onSave(updatedResults);
      toast.success(`Applied RCD IΔn "${value}" to all circuits`);
    },
    [testResults, setTestResults, onSave]
  );

  const handleFillAllRcdRatingA = useCallback(
    (value: string) => {
      const updatedResults = testResults.map((result) => ({
        ...result,
        rcdRatingA: value,
      }));
      setTestResults(updatedResults);
      onSave(updatedResults);
      toast.success(`Applied RCD Rating "${value}A" to all circuits`);
    },
    [testResults, setTestResults, onSave]
  );

  // Apply RCD preset to selected circuits
  const handleApplyRcdPreset = useCallback(
    (
      circuitIds: string[],
      preset: {
        label: string;
        bsStandard: string;
        type: string;
        rating: string;
        ratingA: string;
      }
    ) => {
      const updatedResults = testResults.map((result) => {
        if (circuitIds.includes(result.id)) {
          return {
            ...result,
            rcdBsStandard: preset.bsStandard,
            rcdType: preset.type,
            rcdRating: preset.rating,
            rcdRatingA: preset.ratingA,
          };
        }
        return result;
      });

      setTestResults(updatedResults);
      onSave(updatedResults);
      setState((s) => ({ ...s, showRcdPresetsDialog: false }));

      toast.success(`${preset.label} Applied`, {
        description: `RCD details set for ${circuitIds.length} circuit${circuitIds.length > 1 ? 's' : ''}`,
        duration: 2000,
      });
    },
    [testResults, setTestResults, onSave]
  );

  return {
    // State
    ...state,
    // Dialog toggles
    openSmartAutoFill,
    closeSmartAutoFill,
    openRcdPresets,
    closeRcdPresets,
    openBulkInfill,
    closeBulkInfill,
    openQuickFillPanel,
    closeQuickFillPanel,
    // Handlers
    handleBulkInfill,
    handleFillAllRcdBsStandard,
    handleFillAllRcdType,
    handleFillAllRcdRating,
    handleFillAllRcdRatingA,
    handleApplyRcdPreset,
  };
}

export default useBulkOperations;
