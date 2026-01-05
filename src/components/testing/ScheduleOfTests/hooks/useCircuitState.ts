import { useState, useCallback, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { TestResult } from '@/types/testResult';
import { twinAndEarthCpcFor, normaliseCableSize } from '@/utils/twinAndEarth';

interface UseCircuitStateOptions {
  initialResults?: TestResult[];
  onSave: (results: TestResult[]) => void;
  autoSaveDebounceMs?: number;
}

interface CircuitStateReturn {
  testResults: TestResult[];
  setTestResults: React.Dispatch<React.SetStateAction<TestResult[]>>;
  addCircuit: () => { circuitNumber: string };
  createCircuit: (useAutoFill?: boolean, circuitType?: string, suggestions?: Partial<TestResult>) => void;
  updateCircuit: (id: string, field: keyof TestResult, value: string) => void;
  removeCircuit: (id: string) => void;
  removeAllCircuits: () => void;
  bulkUpdate: (id: string, updates: Partial<TestResult>) => void;
  bulkFieldUpdate: (field: keyof TestResult, value: string) => void;
  undoLastDelete: () => void;
  canUndo: boolean;
  isBulkUpdating: boolean;
  newCircuitNumber: string;
}

/**
 * Custom hook for managing circuit test results state
 * Extracted from EICRScheduleOfTests for cleaner architecture
 */
export function useCircuitState({
  initialResults = [],
  onSave,
  autoSaveDebounceMs = 1000,
}: UseCircuitStateOptions): CircuitStateReturn {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [lastDeleted, setLastDeleted] = useState<{ circuit: TestResult; index: number } | null>(null);
  const [newCircuitNumber, setNewCircuitNumber] = useState('');
  const [isBulkUpdating, setIsBulkUpdating] = useState(false);

  const saveTimeoutRef = useRef<NodeJS.Timeout>();
  const lastSavedHashRef = useRef('');

  // Compute hash for change detection
  const computeResultsHash = (results: TestResult[]) =>
    results
      .map((r) => `${r.id}:${r.circuitDesignation}:${r.zs}:${r.maxZs}:${r.protectiveDeviceRating}`)
      .join('|');

  // Initialize from props
  useEffect(() => {
    if (initialResults && initialResults.length > 0) {
      setTestResults(initialResults);
    } else {
      // Create initial empty result
      const initialResult = createEmptyCircuit('1');
      setTestResults([initialResult]);
      onSave([initialResult]);
    }
  }, []);

  // Sync with external data changes
  useEffect(() => {
    if (Array.isArray(initialResults) && initialResults.length > 0) {
      setTestResults(initialResults);
    }
  }, []);

  // Auto-save with debounce
  useEffect(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      const nextHash = computeResultsHash(testResults);
      if (nextHash === lastSavedHashRef.current) return;
      onSave(testResults);
      lastSavedHashRef.current = nextHash;
    }, autoSaveDebounceMs);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [testResults, onSave, autoSaveDebounceMs]);

  // Save on unmount
  useEffect(() => {
    return () => {
      onSave(testResults);
    };
  }, [testResults, onSave]);

  // Create empty circuit template
  const createEmptyCircuit = (circuitNumber: string): TestResult => ({
    id: crypto.randomUUID(),
    circuitDesignation: `C${circuitNumber}`,
    circuitNumber: circuitNumber,
    circuitDescription: '',
    circuitType: '',
    type: '',
    referenceMethod: '',
    liveSize: '',
    cpcSize: '',
    protectiveDeviceType: '',
    protectiveDeviceRating: '',
    protectiveDeviceKaRating: '',
    protectiveDeviceLocation: '',
    bsStandard: '',
    cableSize: '',
    protectiveDevice: '',
    r1r2: '',
    r2: '',
    ringContinuityLive: '',
    ringContinuityNeutral: '',
    ringR1: '',
    ringRn: '',
    ringR2: '',
    insulationTestVoltage: '',
    insulationResistance: '',
    insulationLiveNeutral: '',
    insulationLiveEarth: '',
    insulationNeutralEarth: '',
    polarity: '',
    zs: '',
    maxZs: '',
    pointsServed: '',
    rcdRating: '',
    rcdOneX: '',
    rcdTestButton: '',
    afddTest: '',
    pfc: '',
    pfcLiveNeutral: '',
    pfcLiveEarth: '',
    functionalTesting: '',
    notes: '',
    typeOfWiring: '',
    rcdBsStandard: '',
    rcdType: '',
    rcdRatingA: '',
  });

  // Add new circuit (returns circuit number for dialog)
  const addCircuit = useCallback(() => {
    const nextCircuitNumber = (testResults.length + 1).toString();
    setNewCircuitNumber(nextCircuitNumber);
    return { circuitNumber: nextCircuitNumber };
  }, [testResults.length]);

  // Create circuit with optional auto-fill
  const createCircuit = useCallback((
    useAutoFill = false,
    circuitType?: string,
    suggestions?: Partial<TestResult>
  ) => {
    const baseResult = createEmptyCircuit(newCircuitNumber);

    // Apply auto-fill suggestions if provided
    const newResult = suggestions
      ? {
          ...baseResult,
          ...suggestions,
          circuitDescription: circuitType || '',
          type: circuitType || '',
          autoFilled: true,
        }
      : baseResult;

    const updatedResults = [...testResults, newResult];
    setTestResults(updatedResults);
    onSave(updatedResults);
  }, [newCircuitNumber, testResults, onSave]);

  // Update single circuit field
  const updateCircuit = useCallback((id: string, field: keyof TestResult, value: string) => {
    setTestResults((prev) => {
      const updatedResults = prev.map((result) => {
        if (result.id === id) {
          const updatedResult = { ...result, [field]: value };

          // Clear autoFilled flag when user manually edits
          if (result.autoFilled && field !== 'autoFilled') {
            updatedResult.autoFilled = false;
          }

          // Auto-update circuit designation from number
          if (field === 'circuitNumber' && value) {
            updatedResult.circuitDesignation = `C${value}`;
          }

          // Legacy field synchronisation
          if (field === 'liveSize') {
            updatedResult.cableSize = value;
            // Auto-calculate CPC for T&E
            const cpc = twinAndEarthCpcFor(normaliseCableSize(value));
            if (cpc) updatedResult.cpcSize = cpc;
          } else if (field === 'protectiveDeviceRating') {
            updatedResult.protectiveDevice = value;
          } else if (field === 'cableSize') {
            updatedResult.liveSize = value;
          } else if (field === 'protectiveDevice') {
            updatedResult.protectiveDeviceRating = value.replace(/\D/g, '');
          }

          return updatedResult;
        }
        return result;
      });
      return updatedResults;
    });
  }, []);

  // Remove circuit with undo capability
  const removeCircuit = useCallback((id: string) => {
    setTestResults((prev) => {
      const index = prev.findIndex((result) => result.id === id);
      if (index === -1) return prev;

      const deletedCircuit = prev[index];
      setLastDeleted({ circuit: deletedCircuit, index });

      const updatedResults = prev.filter((result) => result.id !== id);
      onSave(updatedResults);

      toast.success('Circuit deleted', {
        description: `Circuit ${deletedCircuit.circuitNumber || deletedCircuit.circuitDesignation} removed`,
        action: {
          label: 'Undo',
          onClick: () => {
            setTestResults((current) => {
              const restored = [...current];
              restored.splice(index, 0, deletedCircuit);
              onSave(restored);
              return restored;
            });
            setLastDeleted(null);
          },
        },
      });

      return updatedResults;
    });
  }, [onSave]);

  // Remove all circuits
  const removeAllCircuits = useCallback(() => {
    if (window.confirm('Are you sure you want to remove all test results? This action cannot be undone.')) {
      setTestResults([]);
      onSave([]);
    }
  }, [onSave]);

  // Bulk update single circuit with multiple fields
  const bulkUpdate = useCallback((id: string, updates: Partial<TestResult>) => {
    setTestResults((prev) => {
      const updatedResults = prev.map((result) => {
        if (result.id === id) {
          const updatedResult = { ...result, ...updates };

          // Apply same auto-update logic
          if (updates.circuitNumber) {
            updatedResult.circuitDesignation = `C${updates.circuitNumber}`;
          }
          if (updates.liveSize) {
            updatedResult.cableSize = updates.liveSize;
          }
          if (updates.protectiveDeviceRating) {
            updatedResult.protectiveDevice = updates.protectiveDeviceRating;
          }
          if (updates.cableSize) {
            updatedResult.liveSize = updates.cableSize;
          }
          if (updates.protectiveDevice) {
            updatedResult.protectiveDeviceRating = updates.protectiveDevice.replace(/\D/g, '');
          }

          return updatedResult;
        }
        return result;
      });
      onSave(updatedResults);
      return updatedResults;
    });
  }, [onSave]);

  // Bulk update all circuits with same field value
  const bulkFieldUpdate = useCallback((field: keyof TestResult, value: string) => {
    setIsBulkUpdating(true);
    setTestResults((prev) => {
      const updatedResults = prev.map((result) => ({
        ...result,
        [field]: value,
        autoFilled: result.autoFilled ? false : result.autoFilled,
      }));
      onSave(updatedResults);
      return updatedResults;
    });
    setTimeout(() => setIsBulkUpdating(false), 100);
  }, [onSave]);

  // Undo last delete
  const undoLastDelete = useCallback(() => {
    if (!lastDeleted) return;

    setTestResults((prev) => {
      const updatedResults = [...prev];
      updatedResults.splice(lastDeleted.index, 0, lastDeleted.circuit);
      onSave(updatedResults);
      return updatedResults;
    });

    setLastDeleted(null);
    toast.success('Circuit restored');
  }, [lastDeleted, onSave]);

  return {
    testResults,
    setTestResults,
    addCircuit,
    createCircuit,
    updateCircuit,
    removeCircuit,
    removeAllCircuits,
    bulkUpdate,
    bulkFieldUpdate,
    undoLastDelete,
    canUndo: !!lastDeleted,
    isBulkUpdating,
    newCircuitNumber,
  };
}

export default useCircuitState;
