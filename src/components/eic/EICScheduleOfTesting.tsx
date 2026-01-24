
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Plus, BarChart3, Zap, Camera, Grid, Shield, X, PenTool, FileText, Wrench, ClipboardList, ClipboardCheck, Wand2, Sparkles, MoreVertical, Layout, Table, Trash2, Pen, ChevronDown, TestTube, Mic, Check, CheckCircle } from 'lucide-react';
import { TestResult } from '@/types/testResult';
import { DistributionBoard, MAIN_BOARD_ID, createDefaultBoard, generateBoardId, getNextSubBoardName } from '@/types/distributionBoard';
import { migrateToMultiBoard, getCircuitsForBoard, formatBoardsForFormData } from '@/utils/boardMigration';
import BoardSection, { BoardToolCallbacks } from '../testing/BoardSection';
import BoardManagement from '../testing/BoardManagement';
import EnhancedTestResultDesktopTable from '../EnhancedTestResultDesktopTable';
import MobileOptimizedTestTable from '../mobile/MobileOptimizedTestTable';
import { MobileHorizontalScrollTable } from '../mobile/MobileHorizontalScrollTable';
import { CircuitList } from '../testing/ScheduleOfTests/CircuitList';
import MobileSmartAutoFill from '../mobile/MobileSmartAutoFill';
import QuickRcdPresets from '../QuickRcdPresets';
import QuickFillRcdPanel from '../QuickFillRcdPanel';
import QuickFillIrPanel from '../QuickFillIrPanel';
import TestInstrumentInfo from '../TestInstrumentInfo';
import TestMethodInfo from '../TestMethodInfo';
import TestAnalytics from '../TestAnalytics';
import SmartAutoFillPromptDialog from '../SmartAutoFillPromptDialog';

import { BoardScannerOverlay } from '@/components/testing/BoardScannerOverlay';
import TestResultsPhotoCapture from '../testing/TestResultsPhotoCapture';
import TestResultsReviewDialog from '../testing/TestResultsReviewDialog';
import ScribbleToTableDialog from '../mobile/ScribbleToTableDialog';
import BulkInfillDialog from '../BulkInfillDialog';
import { useOrientation } from '@/hooks/useOrientation';
import { useInlineVoice } from '@/hooks/useInlineVoice';
import { toast } from 'sonner';
import { twinAndEarthCpcFor, normaliseCableSize } from '@/utils/twinAndEarth';
import { calculatePointsServed } from '@/types/autoFillTypes';
import { getTableViewPreference, setTableViewPreference } from '@/utils/mobileTableUtils';
import { getMaxZsFromDeviceDetails } from '@/utils/zsCalculations';
import { getDefaultBsStandard } from '@/types/protectiveDeviceTypes';
import { createCircuitWithDefaults } from '@/utils/circuitDefaults';
import { resolveFieldName } from '@/utils/voiceFieldAliases';
import { resolveDropdownValue } from '@/utils/voiceDropdownResolver';

interface EICScheduleOfTestingProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

/**
 * DebouncedInput - Input with local state and debounced updates
 * Prevents focus loss on mobile by not triggering parent re-renders on every keystroke
 */
const DebouncedInput = React.memo(({
  value,
  onChange,
  className,
  style,
  ...props
}: {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: any;
}) => {
  const [localValue, setLocalValue] = React.useState(value || '');
  const debounceTimerRef = React.useRef<NodeJS.Timeout>();

  // Sync local value when prop changes
  React.useEffect(() => {
    setLocalValue(value || '');
  }, [value]);

  // Debounced onChange handler
  const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      onChange(newValue);
    }, 300);
  }, [onChange]);

  // Cleanup timer on unmount
  React.useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return (
    <input
      value={localValue}
      onChange={handleChange}
      className={className}
      style={style}
      {...props}
    />
  );
});

DebouncedInput.displayName = 'DebouncedInput';

const EICScheduleOfTesting: React.FC<EICScheduleOfTestingProps> = ({ formData, onUpdate }) => {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [distributionBoards, setDistributionBoards] = useState<DistributionBoard[]>([]);
  const [expandedBoards, setExpandedBoards] = useState<Set<string>>(new Set([MAIN_BOARD_ID]));
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showAutoFillPrompt, setShowAutoFillPrompt] = useState(false);
  const [newCircuitNumber, setNewCircuitNumber] = useState('');

  const [showPhotoCapture, setShowPhotoCapture] = useState(false);
  const [showTestResultsScan, setShowTestResultsScan] = useState(false);
  const [extractedTestResults, setExtractedTestResults] = useState<any>(null);
  const [showTestResultsReview, setShowTestResultsReview] = useState(false);
  const [mobileViewType, setMobileViewType] = useState<'table' | 'card'>('card');
  const [showScribbleDialog, setShowScribbleDialog] = useState(false);
  const [showSmartAutoFillDialog, setShowSmartAutoFillDialog] = useState(false);
  const [showRcdPresetsDialog, setShowRcdPresetsDialog] = useState(false);
  const [showBulkInfillDialog, setShowBulkInfillDialog] = useState(false);
  const [showQuickFillPanel, setShowQuickFillPanel] = useState(false);
  const [lastDeleted, setLastDeleted] = useState<{ circuit: TestResult; index: number } | null>(null);
  const [activeToolPanel, setActiveToolPanel] = useState<'ai' | 'smart' | null>(null);
  const [selectedCircuitIndex, setSelectedCircuitIndex] = useState(0);
  const [activeBoardId, setActiveBoardId] = useState<string | null>(null);
  const orientation = useOrientation();

  // Voice tool call handler - connects ElevenLabs agent to component state
  // Handles fill_eic tool with actions: add_circuit, update_field, next, previous, select, remove
  const handleVoiceToolCall = useCallback((toolName: string, params: Record<string, unknown>): string => {
    console.log('[Voice] Tool call:', toolName, params);

    // Handle fill_eic tool (the single tool for all EIC actions)
    if (toolName === 'fill_eic' || toolName === 'fill_eicr') {
      const action = params.action as string;

      switch (action) {
        case 'add_circuit': {
          const circuitType = params.circuit_type as string || 'other';
          const description = params.description as string || '';
          const nextNum = (testResults.length + 1).toString();

          // Create circuit with ALL 32 fields pre-filled using BS7671 defaults
          const newCircuit = createCircuitWithDefaults(circuitType, nextNum, description);

          setTestResults(prev => [...prev, newCircuit]);
          setSelectedCircuitIndex(testResults.length);
          toast.success(`Added ${newCircuit.circuitType} circuit C${nextNum}`);
          return `Added ${newCircuit.circuitType} circuit ${nextNum} with all defaults filled`;
        }

        case 'update_field': {
          const field = params.field as string;
          let value = params.value as string;
          const circuitNum = params.circuit_number as number | undefined;

          // Resolve spoken field name to actual property name
          const resolvedField = resolveFieldName(field) || field;

          // Resolve dropdown values (e.g., "OK" -> "Correct" for polarity)
          value = resolveDropdownValue(resolvedField, value);

          const targetIndex = circuitNum !== undefined
            ? testResults.findIndex(r => r.circuitNumber === String(circuitNum) || r.circuitDesignation === `C${circuitNum}`)
            : selectedCircuitIndex;

          if (targetIndex >= 0 && targetIndex < testResults.length) {
            setTestResults(prev => {
              const updated = [...prev];
              updated[targetIndex] = { ...updated[targetIndex], [resolvedField]: value };
              return updated;
            });
            toast.success(`Set ${resolvedField} to ${value}`);
            return `Set ${resolvedField} to ${value} on circuit ${targetIndex + 1}`;
          }
          return 'No circuit selected - add a circuit first';
        }

        case 'next': {
          if (selectedCircuitIndex < testResults.length - 1) {
            const newIndex = selectedCircuitIndex + 1;
            setSelectedCircuitIndex(newIndex);
            toast.info(`Now on circuit ${newIndex + 1}`);
            return `Moved to circuit ${newIndex + 1}`;
          }
          return 'Already on the last circuit';
        }

        case 'previous': {
          if (selectedCircuitIndex > 0) {
            const newIndex = selectedCircuitIndex - 1;
            setSelectedCircuitIndex(newIndex);
            toast.info(`Now on circuit ${newIndex + 1}`);
            return `Moved to circuit ${newIndex + 1}`;
          }
          return 'Already on the first circuit';
        }

        case 'select': {
          const num = params.circuit_number as number;
          const idx = testResults.findIndex(r =>
            r.circuitNumber === String(num) || r.circuitDesignation === `C${num}`
          );
          if (idx >= 0) {
            setSelectedCircuitIndex(idx);
            toast.info(`Selected circuit ${num}`);
            return `Selected circuit ${num}`;
          }
          return `Circuit ${num} not found`;
        }

        case 'delete_circuit': {
          const circuitNum = params.circuit_number as number | undefined;
          const removeIdx = circuitNum !== undefined
            ? testResults.findIndex(r => r.circuitNumber === String(circuitNum) || r.circuitDesignation === `C${circuitNum}`)
            : selectedCircuitIndex;

          if (removeIdx >= 0 && removeIdx < testResults.length) {
            const removed = testResults[removeIdx];
            setTestResults(prev => {
              // Remove the circuit
              const filtered = prev.filter((_, i) => i !== removeIdx);
              // Renumber all remaining circuits
              return filtered.map((circuit, i) => ({
                ...circuit,
                circuitNumber: (i + 1).toString(),
                circuitDesignation: `C${i + 1}`,
              }));
            });
            // Adjust selected index if needed
            if (selectedCircuitIndex >= testResults.length - 1 && selectedCircuitIndex > 0) {
              setSelectedCircuitIndex(prev => Math.max(0, prev - 1));
            }
            toast.success(`Deleted circuit ${removed?.circuitDesignation || removeIdx + 1}, renumbered remaining`);
            return `Deleted circuit and renumbered remaining circuits`;
          }
          return 'No circuits to delete';
        }

        case 'move_circuit': {
          const circuitNum = params.circuit_number as number | undefined;
          const toPosition = params.to_position as number | undefined;

          if (circuitNum === undefined || toPosition === undefined) {
            return 'Need both circuit_number and to_position for move';
          }

          const fromIdx = testResults.findIndex(r => r.circuitNumber === String(circuitNum) || r.circuitDesignation === `C${circuitNum}`);
          const toIdx = toPosition - 1;

          if (fromIdx < 0 || fromIdx >= testResults.length) {
            return `Circuit ${circuitNum} not found`;
          }
          if (toIdx < 0 || toIdx >= testResults.length) {
            return `Invalid position ${toPosition}`;
          }
          if (fromIdx === toIdx) {
            return `Circuit ${circuitNum} is already at position ${toPosition}`;
          }

          setTestResults(prev => {
            const updated = [...prev];
            const [movedCircuit] = updated.splice(fromIdx, 1);
            updated.splice(toIdx, 0, movedCircuit);
            return updated.map((circuit, i) => ({
              ...circuit,
              circuitNumber: (i + 1).toString(),
              circuitDesignation: `C${i + 1}`,
            }));
          });

          setSelectedCircuitIndex(toIdx);
          toast.success(`Moved circuit to position ${toPosition}, renumbered all circuits`);
          return `Moved circuit ${circuitNum} to position ${toPosition}`;
        }

        case 'complete': {
          toast.success('Schedule of tests complete!');
          return 'Schedule marked as complete';
        }

        case 'select_board': {
          const boardName = params.board_name as string;
          if (!boardName) return 'Need board name to select';
          const board = distributionBoards.find(b =>
            b.name.toLowerCase().includes(boardName.toLowerCase()) ||
            b.reference?.toLowerCase().includes(boardName.toLowerCase()) ||
            b.id.toLowerCase().includes(boardName.toLowerCase())
          );
          if (board) {
            setExpandedBoards(new Set([board.id]));
            toast.success(`Switched to ${board.name}`);
            return `Selected board: ${board.name}`;
          }
          return `Board "${boardName}" not found. Available: ${distributionBoards.map(b => b.name).join(', ')}`;
        }

        case 'get_missing_tests': {
          const circuitNum = params.circuit_number as number || selectedCircuitIndex + 1;
          const circuit = testResults.find(r =>
            r.circuitNumber === String(circuitNum) || r.circuitDesignation === `C${circuitNum}`
          );
          if (!circuit) return `Circuit ${circuitNum} not found`;

          const missing: string[] = [];
          if (!circuit.r1r2) missing.push('R1+R2');
          if (!circuit.zs) missing.push('Zs');
          if (!circuit.insulationLiveEarth && !circuit.insulationResistance) missing.push('insulation');
          if (!circuit.polarity || circuit.polarity === '') missing.push('polarity');

          const hasRcd = circuit.protectiveDeviceType === 'RCBO' || circuit.protectiveDeviceType === 'RCD';
          if (hasRcd && !circuit.rcdOneX) missing.push('RCD trip time');

          if (circuit.circuitType?.toLowerCase().includes('ring')) {
            if (!circuit.ringR1) missing.push('ring R1');
            if (!circuit.ringRn) missing.push('ring Rn');
            if (!circuit.ringR2) missing.push('ring R2');
          }

          if (missing.length === 0) {
            toast.success(`Circuit ${circuitNum} complete!`);
            return `Circuit ${circuitNum} has all required tests`;
          }
          toast.info(`Circuit ${circuitNum} needs: ${missing.join(', ')}`);
          return `Circuit ${circuitNum} needs: ${missing.join(', ')}`;
        }

        // BULK CIRCUIT OPERATIONS - Fill same value across ALL circuits
        case 'update_all_circuits':
        case 'set_field_all_circuits': {
          const field = params.field as string;
          let value = params.value as string;
          if (!field || !value) return 'Need field and value for bulk update';

          const resolvedField = resolveFieldName(field) || field;
          value = resolveDropdownValue(resolvedField, value);

          setTestResults(prev => prev.map(circuit => ({
            ...circuit,
            [resolvedField]: value
          })));

          toast.success(`Set ${resolvedField} to ${value} for all ${testResults.length} circuits`);
          return `Set ${resolvedField} to ${value} for all ${testResults.length} circuits`;
        }

        case 'set_circuit_field': {
          const circuitNum = params.circuit_number as number;
          const field = params.field as string;
          let value = params.value as string;
          if (!circuitNum || !field || !value) return 'Need circuit_number, field, and value';

          const resolvedField = resolveFieldName(field) || field;
          value = resolveDropdownValue(resolvedField, value);

          const idx = circuitNum - 1;
          if (idx < 0 || idx >= testResults.length) {
            return `Circuit ${circuitNum} not found`;
          }

          setTestResults(prev => prev.map((circuit, i) =>
            i === idx ? { ...circuit, [resolvedField]: value } : circuit
          ));

          toast.success(`Set C${circuitNum} ${resolvedField} to ${value}`);
          return `Set circuit ${circuitNum} ${resolvedField} to ${value}`;
        }

        case 'set_multiple_fields': {
          const circuitNum = params.circuit_number as number | undefined;
          const targetIdx = circuitNum !== undefined ? circuitNum - 1 : selectedCircuitIndex;

          if (targetIdx < 0 || targetIdx >= testResults.length) {
            return 'Invalid circuit number';
          }

          const fieldUpdates: Record<string, string> = {};
          const fieldKeys = ['zs', 'r1r2', 'polarity', 'insulationTestVoltage', 'insulationLiveEarth', 'insulationLiveNeutral', 'rcdOneX', 'pfc'];

          for (const key of fieldKeys) {
            const value = params[key] as string | undefined;
            if (value) {
              const resolvedField = resolveFieldName(key) || key;
              fieldUpdates[resolvedField] = resolveDropdownValue(resolvedField, value);
            }
          }

          if (Object.keys(fieldUpdates).length === 0) {
            return 'No fields provided to update';
          }

          setTestResults(prev => prev.map((circuit, i) =>
            i === targetIdx ? { ...circuit, ...fieldUpdates } : circuit
          ));

          const fieldCount = Object.keys(fieldUpdates).length;
          toast.success(`Updated ${fieldCount} fields on C${targetIdx + 1}`);
          return `Updated ${fieldCount} fields on circuit ${targetIdx + 1}`;
        }

        case 'get_circuits_status': {
          const statusLines = testResults.map((circuit, i) => {
            const missing: string[] = [];
            if (!circuit.zs) missing.push('Zs');
            if (!circuit.r1r2) missing.push('R1+R2');
            if (!circuit.insulationTestVoltage) missing.push('IR voltage');
            if (!circuit.insulationLiveEarth && !circuit.insulationResistance) missing.push('IR reading');
            if (!circuit.polarity) missing.push('polarity');

            const hasRcd = circuit.protectiveDeviceType === 'RCBO' || circuit.protectiveDeviceType === 'RCD';
            if (hasRcd && !circuit.rcdOneX) missing.push('RCD time');

            const status = missing.length === 0 ? 'Complete' : `Missing: ${missing.join(', ')}`;
            return `C${i + 1}: ${status}`;
          });

          const completeCount = statusLines.filter(s => s.includes('Complete')).length;
          toast.info(`${completeCount}/${testResults.length} circuits complete`);
          return statusLines.join('\n');
        }

        // SUB-BOARD OPERATIONS
        case 'add_circuit_to_board': {
          const boardName = params.board as string;
          const circuitType = params.type as string || 'other';
          const description = params.description as string || '';

          const board = distributionBoards.find(b =>
            b.name.toLowerCase().includes(boardName.toLowerCase()) ||
            b.reference?.toLowerCase().includes(boardName.toLowerCase()) ||
            b.id.toLowerCase().includes(boardName.toLowerCase())
          );

          if (!board) {
            return `Board "${boardName}" not found. Available: ${distributionBoards.map(b => b.name).join(', ')}`;
          }

          const boardCircuits = testResults.filter(c => c.boardId === board.id);
          const nextNum = (boardCircuits.length + 1).toString();
          const newCircuit = createCircuitWithDefaults(circuitType, nextNum, description);
          newCircuit.boardId = board.id;

          setTestResults(prev => [...prev, newCircuit]);
          setExpandedBoards(new Set([board.id]));
          toast.success(`Added circuit to ${board.name}`);
          return `Added ${circuitType} circuit to ${board.name}`;
        }

        case 'set_board_field_all_circuits': {
          const boardName = params.board as string;
          const field = params.field as string;
          let value = params.value as string;

          const board = distributionBoards.find(b =>
            b.name.toLowerCase().includes(boardName.toLowerCase()) ||
            b.reference?.toLowerCase().includes(boardName.toLowerCase()) ||
            b.id.toLowerCase().includes(boardName.toLowerCase())
          );

          if (!board) {
            return `Board "${boardName}" not found`;
          }

          const resolvedField = resolveFieldName(field) || field;
          value = resolveDropdownValue(resolvedField, value);

          const boardCircuitCount = testResults.filter(c => c.boardId === board.id).length;

          setTestResults(prev => prev.map(circuit =>
            circuit.boardId === board.id
              ? { ...circuit, [resolvedField]: value }
              : circuit
          ));

          toast.success(`Set ${resolvedField} to ${value} for all ${boardCircuitCount} circuits on ${board.name}`);
          return `Set ${resolvedField} to ${value} for all ${boardCircuitCount} circuits on ${board.name}`;
        }

        case 'get_board_status': {
          const boardName = params.board as string | undefined;

          const boardsToCheck = boardName
            ? distributionBoards.filter(b =>
                b.name.toLowerCase().includes(boardName.toLowerCase()) ||
                b.id.toLowerCase().includes(boardName.toLowerCase())
              )
            : distributionBoards;

          if (boardsToCheck.length === 0) {
            return `Board "${boardName}" not found`;
          }

          const statusLines = boardsToCheck.map(board => {
            const boardCircuits = testResults.filter(c => c.boardId === board.id);
            const complete = boardCircuits.filter(c =>
              c.zs && c.polarity && (c.insulationLiveEarth || c.insulationResistance)
            ).length;

            return `${board.name}: ${complete}/${boardCircuits.length} circuits complete`;
          });

          return statusLines.join('\n');
        }

        case 'scan_board': {
          const boardName = params.board as string;
          const board = distributionBoards.find(b =>
            b.name.toLowerCase().includes(boardName.toLowerCase()) ||
            b.id.toLowerCase().includes(boardName.toLowerCase())
          );

          if (!board) {
            return `Board "${boardName}" not found`;
          }

          // Open the photo capture for this board
          setExpandedBoards(new Set([board.id]));
          setShowPhotoCapture(true);
          toast.info(`Opening scanner for ${board.name}`);
          return `Opening board scanner for ${board.name}. Please take a photo of the board.`;
        }

        default:
          console.log('[Voice] Unknown action:', action);
          return `Unknown action: ${action}`;
      }
    }

    console.log('[Voice] Unknown tool:', toolName, params);
    return `Unknown tool: ${toolName}`;
  }, [testResults, selectedCircuitIndex, distributionBoards]);

  const { isConnecting: voiceConnecting, isActive: voiceActive, toggleVoice } = useInlineVoice({
    onToolCall: handleVoiceToolCall,
  });

  // Create board-specific tool callbacks
  const createBoardTools = useCallback((boardId: string): BoardToolCallbacks => ({
    onScanBoard: () => {
      setActiveBoardId(boardId);
      setShowPhotoCapture(true);
    },
    onScanTestResults: () => {
      setActiveBoardId(boardId);
      setShowTestResultsScan(true);
    },
    onScribbleToTable: () => {
      setActiveBoardId(boardId);
      setShowScribbleDialog(true);
    },
    onSmartAutoFill: () => {
      setActiveBoardId(boardId);
      setShowSmartAutoFillDialog(true);
    },
    onQuickRcdPresets: () => {
      setActiveBoardId(boardId);
      setShowRcdPresetsDialog(true);
    },
    onBulkInfill: () => {
      setActiveBoardId(boardId);
      setShowBulkInfillDialog(true);
    },
    onVoiceToggle: toggleVoice,
    voiceActive,
    voiceConnecting,
  }), [toggleVoice, voiceActive, voiceConnecting]);

  // Calculate completion stats for progress indicator
  const { completedCount, progressPercent, pendingCount } = useMemo(() => {
    const completed = testResults.filter(r =>
      r.zs && r.polarity && (r.insulationLiveEarth || r.insulationResistance)
    ).length;
    const percent = testResults.length > 0
      ? Math.round((completed / testResults.length) * 100)
      : 0;
    return {
      completedCount: completed,
      progressPercent: percent,
      pendingCount: testResults.length - completed
    };
  }, [testResults]);

  // Load mobile view preference
  useEffect(() => {
    const loadViewPref = async () => {
      const pref = await getTableViewPreference();
      setMobileViewType(pref);
    };
    loadViewPref();
  }, []);
  
  // Use mobile optimized view on mobile devices in portrait mode
  const useMobileView = orientation.isMobile && !orientation.isLandscape;

  const toggleMobileView = async () => {
    const newView = mobileViewType === 'table' ? 'card' : 'table';
    setMobileViewType(newView);
    await setTableViewPreference(newView);
  };

  // Initialize boards and test results from form data
  useEffect(() => {
    // Migrate to multi-board structure (handles both legacy and new format)
    const { distributionBoards: migratedBoards, scheduleOfTests: migratedCircuits } = migrateToMultiBoard(formData);
    setDistributionBoards(migratedBoards);

    if (migratedCircuits && migratedCircuits.length > 0) {
      // Normalize legacy data - remove K/Z curves for MCB/RCBO devices
      const bsStandardRequiresCurve = (bs: string): boolean => bs === 'MCB' || bs === 'RCBO';
      const normalizedResults = migratedCircuits.map((result: TestResult) => {
        const needsCurve = bsStandardRequiresCurve(result.bsStandard || '');
        const validCurves = ['B', 'C', 'D'];

        if (needsCurve && result.protectiveDeviceCurve && !validCurves.includes(result.protectiveDeviceCurve)) {
          return { ...result, protectiveDeviceCurve: '' };
        } else if (!needsCurve && result.protectiveDeviceCurve) {
          return { ...result, protectiveDeviceCurve: '' };
        }
        return result;
      });
      setTestResults(normalizedResults);
    } else {
      // Initial result with basic defaults for EIC - assigned to main board
      const initialResult: TestResult = {
        id: '1',
        circuitDesignation: 'C1',
        circuitNumber: '1',
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
        boardId: MAIN_BOARD_ID
      };
      setTestResults([initialResult]);
    }
  }, []);

  // Current board for adding circuits (defaults to main)
  const [currentBoardId, setCurrentBoardId] = useState<string>(MAIN_BOARD_ID);

  const addTestResult = (boardId?: string) => {
    const targetBoardId = boardId || currentBoardId;
    setCurrentBoardId(targetBoardId);
    const nextCircuitNumber = (testResults.length + 1).toString();
    setNewCircuitNumber(nextCircuitNumber);
    setShowAutoFillPrompt(true);
  };

  // Add a circuit directly to a specific board
  const addCircuitToBoard = (boardId: string) => {
    const boardCircuits = getCircuitsForBoard(testResults, boardId);
    // Use board-specific circuit count, not global count
    const nextCircuitNum = boardCircuits.length + 1;
    const newResult: TestResult = {
      id: Date.now().toString(),
      circuitDesignation: `C${nextCircuitNum}`,
      circuitNumber: nextCircuitNum.toString(),
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
      boardId: boardId
    };
    const updatedResults = [...testResults, newResult];
    setTestResults(updatedResults);
    onUpdate('scheduleOfTests', updatedResults);
    toast.success(`Circuit C${nextCircuitNum} added`);
  };

  // Board management functions
  const handleAddBoard = () => {
    const newBoard = createDefaultBoard(
      generateBoardId(),
      getNextSubBoardName(distributionBoards),
      distributionBoards.length
    );
    const updatedBoards = [...distributionBoards, newBoard];
    setDistributionBoards(updatedBoards);
    setExpandedBoards(prev => new Set([...prev, newBoard.id]));

    // Save boards to formData
    const formDataUpdate = formatBoardsForFormData(updatedBoards, testResults);
    Object.entries(formDataUpdate).forEach(([key, value]) => {
      onUpdate(key, value);
    });

    toast.success(`${newBoard.name} added`);
  };

  const handleRemoveBoard = (boardId: string) => {
    if (boardId === MAIN_BOARD_ID) {
      toast.error('Cannot remove Main CU');
      return;
    }

    const boardToRemove = distributionBoards.find(b => b.id === boardId);
    const boardCircuits = getCircuitsForBoard(testResults, boardId);

    // Move circuits to main board
    const updatedResults = testResults.map(c =>
      c.boardId === boardId ? { ...c, boardId: MAIN_BOARD_ID } : c
    );

    // Remove the board
    const updatedBoards = distributionBoards
      .filter(b => b.id !== boardId)
      .map((b, index) => ({ ...b, order: index }));

    setDistributionBoards(updatedBoards);
    setTestResults(updatedResults);
    setExpandedBoards(prev => {
      const next = new Set(prev);
      next.delete(boardId);
      return next;
    });

    // Save to formData
    const formDataUpdate = formatBoardsForFormData(updatedBoards, updatedResults);
    Object.entries(formDataUpdate).forEach(([key, value]) => {
      onUpdate(key, value);
    });

    toast.success(`${boardToRemove?.name || 'Board'} removed. ${boardCircuits.length > 0 ? `${boardCircuits.length} circuit(s) moved to Main CU.` : ''}`);
  };

  const handleUpdateBoard = (boardId: string, field: keyof DistributionBoard, value: any) => {
    const updatedBoards = distributionBoards.map(b =>
      b.id === boardId ? { ...b, [field]: value, updatedAt: new Date() } : b
    );
    setDistributionBoards(updatedBoards);

    // Save to formData
    const formDataUpdate = formatBoardsForFormData(updatedBoards, testResults);
    Object.entries(formDataUpdate).forEach(([key, value]) => {
      onUpdate(key, value);
    });
  };

  const toggleBoardExpanded = (boardId: string) => {
    setExpandedBoards(prev => {
      const next = new Set(prev);
      if (next.has(boardId)) {
        next.delete(boardId);
      } else {
        next.add(boardId);
      }
      return next;
    });
  };

  const handleAIAnalysisComplete = (data: any) => {
    // BoardScannerOverlay handles the review internally, so we receive confirmed circuits
    if (data.circuits && data.circuits.length > 0) {
      handleApplyAICircuitsFromTable(data.circuits);
      toast.success(`Added ${data.circuits.length} circuit(s) from AI scan`);
    }
    setActiveBoardId(null);
  };

  // Test Results Scanner Handlers
  const handleTestResultsAnalysisComplete = (data: any) => {
    setExtractedTestResults(data);
    setShowTestResultsScan(false);
    setShowTestResultsReview(true);
  };

  const handleAcceptTestResults = (selectedCircuits: any[]) => {
    // Transform extracted test results to TestResult format
    const transformedResults = selectedCircuits.map((circuit, index) => {
      const nextId = (testResults.length + index + 1).toString();
      const nextCircuitNum = (testResults.length + index + 1).toString();

      // Derive combined BS Standard (e.g., "MCB (BS EN 60898)")
      const incomingType: string = circuit.protective_device?.type || '';
      const upper = incomingType.toUpperCase();
      const baseType = upper.includes('RCBO') ? 'RCBO' : upper.includes('RCD') ? 'RCD' : upper.includes('MCB') ? 'MCB' : upper.includes('FUSE') ? 'Fuse' : incomingType;
      const incomingBs: string = circuit.protective_device?.bs_standard || '';
      const bsFromType = getDefaultBsStandard(baseType || 'MCB');
      const finalBs = incomingBs && incomingBs.includes('(') ? incomingBs : (bsFromType || incomingBs);

      return {
        id: nextId,
        circuitNumber: circuit.circuit_reference || nextCircuitNum,
        circuitDesignation: circuit.circuit_reference || `C${nextCircuitNum}`,
        circuitDescription: circuit.circuit_description || '',
        circuitType: circuit.circuit_type || '',
        type: circuit.circuit_type || '',
        referenceMethod: '',
        liveSize: circuit.conductor_sizes?.live || '',
        cpcSize: circuit.conductor_sizes?.cpc || '',
        protectiveDeviceType: circuit.protective_device?.type || '',
        protectiveDeviceRating: circuit.protective_device?.rating || '',
        protectiveDeviceCurve: circuit.protective_device?.curve || '',
        protectiveDeviceKaRating: circuit.protective_device?.ka_rating || '',
        protectiveDeviceLocation: circuit.protective_device?.location || '',
        bsStandard: finalBs,
        cableSize: circuit.conductor_sizes?.live || '',
        protectiveDevice: circuit.protective_device?.rating || '',
        r1r2: circuit.tests?.r1_r2?.value || '',
        r2: '',
        ringContinuityLive: circuit.tests?.ring_continuity_live?.value || '',
        ringContinuityNeutral: circuit.tests?.ring_continuity_neutral?.value || '',
        ringR1: '',
        ringRn: '',
        ringR2: '',
        insulationTestVoltage: circuit.tests?.insulation_resistance?.test_voltage || '500',
        insulationResistance: circuit.tests?.insulation_resistance?.value || '',
        insulationLiveNeutral: '',
        insulationLiveEarth: '',
        insulationNeutralEarth: '',
        polarity: circuit.tests?.polarity?.result || '',
        zs: circuit.tests?.zs?.value || '',
        maxZs: circuit.tests?.zs?.max_zs || '',
        pointsServed: circuit.points_served || '',
        rcdRating: circuit.tests?.rcd_rating || '',
        rcdOneX: circuit.tests?.rcd_trip_time?.value || '',
        rcdTestButton: circuit.tests?.rcd_test_button || '',
        afddTest: circuit.tests?.afdd_test || '',
        pfc: circuit.tests?.pfc?.value || '',
        pfcLiveNeutral: '',
        pfcLiveEarth: '',
        functionalTesting: circuit.tests?.functional_testing || '',
        notes: `AI detected from test results (${circuit.confidence} confidence) - Please verify. ${circuit.notes || ''}`.trim(),
        autoFilled: true,
        typeOfWiring: '',
        rcdBsStandard: '',
        rcdType: '',
        rcdRatingA: ''
      };
    });

    // Add to existing test results
    const updatedResults = [...testResults, ...transformedResults];
    setTestResults(updatedResults);
    onUpdate('scheduleOfTests', updatedResults);
    setShowTestResultsReview(false);
    setExtractedTestResults(null);
    toast.success(`Added ${transformedResults.length} circuit(s) from test results scan`);
  };

  // Utility function to fix protective device terminology
  const fixProtectiveDeviceType = (type: string): string => {
    if (!type) return type;
    
    // Map Type 1/2/3 to Type B/C/D (UK standard)
    if (type.includes('Type 1') || type.includes('Type1')) {
      return type.replace(/Type ?1/gi, 'Type B');
    }
    if (type.includes('Type 2') || type.includes('Type2')) {
      return type.replace(/Type ?2/gi, 'Type C');
    }
    if (type.includes('Type 3') || type.includes('Type3')) {
      return type.replace(/Type ?3/gi, 'Type D');
    }
    return type;
  };

  // Helper to check if a row is blank
  const isBlankRow = (result: TestResult): boolean => {
    return !result.circuitDescription && 
           !result.protectiveDeviceType && 
           !result.protectiveDeviceRating &&
           !result.liveSize;
  };

  // Normalise AI circuit values to match UI Select options
  const normaliseAICircuit = (circuit: any) => {
    // Normalise reference method to single letter
    const normaliseReferenceMethod = (method: string): string => {
      if (!method) return 'C';
      if (method.includes('103') || method.toLowerCase().includes('stud wall')) return 'B';
      if (method.includes('C') || method.toLowerCase().includes('clipped')) return 'C';
      if (method.includes('A')) return 'A';
      return 'C'; // Default
    };

    // Extract base protective device type (MCB Type B → MCB)
    const getDeviceBaseType = (type: string): string => {
      if (!type) return '';
      const upper = type.toUpperCase();
      if (upper.includes('RCBO')) return 'RCBO';
      if (upper.includes('RCD')) return 'RCD';
      if (upper.includes('MCB')) return 'MCB';
      if (upper.includes('FUSE')) return 'Fuse';
      return type;
    };

    // Get BS Standard based on device type
    const getBsStandard = (deviceType: string): string => {
      const upper = deviceType.toUpperCase();
      if (upper.includes('MCB')) return 'BS EN 60898';
      if (upper.includes('RCBO')) return 'BS EN 61009';
      if (upper.includes('RCD')) return 'BS EN 61008';
      if (upper.includes('FUSE')) return 'BS 1361';
      return 'BS EN 60898';
    };

    // Extract numeric rating: 6A → 6, 16A → 16
    const normaliseRating = (rating: string): string => {
      if (!rating) return '';
      return rating.replace(/[^\d]/g, '');
    };

    const deviceType = fixProtectiveDeviceType(circuit.protectiveDeviceType || '');
    const baseDeviceType = getDeviceBaseType(deviceType);
    
    // Normalise live size and ALWAYS apply correct T&E CPC sizing
    const canonicalLiveSize = normaliseCableSize(circuit.liveSize || '');
    const correctCpcSize = twinAndEarthCpcFor(canonicalLiveSize);
    
    const combinedBs = getDefaultBsStandard(baseDeviceType);
    return {
      ...circuit,
      liveSize: canonicalLiveSize,
      cpcSize: correctCpcSize, // Always use correct T&E CPC, ignoring AI's value
      referenceMethod: normaliseReferenceMethod(circuit.referenceMethod || ''),
      protectiveDeviceType: baseDeviceType,
      protectiveDeviceRating: normaliseRating(circuit.protectiveDeviceRating || ''),
      protectiveDeviceKaRating: circuit.protectiveDeviceKaRating || '6kA',
      bsStandard: circuit.bsStandard && circuit.bsStandard.includes('(') ? circuit.bsStandard : combinedBs
    };
  };

  // Calculate maxZs from device details (with 80% derating applied)
  const calculateMaxZsForCircuit = (
    bsStandard: string, 
    curve: string, 
    rating: string
  ): string => {
    if (!bsStandard || !rating) return '';
    
    const maxZs = getMaxZsFromDeviceDetails(bsStandard, curve, rating);
    return maxZs !== null ? maxZs.toFixed(2) : '';
  };

  // Convert Circuit[] format to Partial<TestResult>[] format
  const convertCircuitsToTestResults = (circuits: any[]): Partial<TestResult>[] => {
    return circuits.map(circuit => ({
      circuitDescription: circuit.label || '',
      protectiveDeviceType: circuit.device || 'MCB',
      bsStandard: getDefaultBsStandard(circuit.device || 'MCB'),
      protectiveDeviceRating: circuit.rating?.toString() || '',
      circuitType: circuit.label?.toLowerCase().includes('socket') ? 'Sockets' : 
                   circuit.label?.toLowerCase().includes('light') ? 'Lighting' : '',
      liveSize: circuit.rating && circuit.rating <= 10 ? '1.5' :
                circuit.rating && circuit.rating <= 20 ? '2.5' :
                circuit.rating && circuit.rating <= 32 ? '4.0' : '2.5',
      referenceMethod: 'C',
      protectiveDeviceKaRating: '6kA',
      // Three-phase detection
      phaseType: circuit.phase || '1P',
    }));
  };

  const handleApplyAICircuitsFromTable = (circuits: any[]) => {
    const converted = convertCircuitsToTestResults(circuits);
    handleApplyAICircuits(converted);
  };

  const handleApplyAICircuits = (circuits: Partial<TestResult>[]) => {
    // Determine target board - use activeBoardId or default to main board
    const targetBoardId = activeBoardId || distributionBoards[0]?.id || MAIN_BOARD_ID;

    // Get existing circuits for the target board to calculate proper numbering
    const existingBoardCircuits = getCircuitsForBoard(testResults, targetBoardId);

    // Find blank rows for this specific board to fill first
    const blankIndices: number[] = [];
    testResults.forEach((result, idx) => {
      if (result.boardId === targetBoardId && isBlankRow(result)) {
        blankIndices.push(idx);
      }
    });

    const updatedResults = [...testResults];
    const remainingCircuits: any[] = [];
    let addedCount = 0; // Track how many circuits we've added for numbering

    circuits.forEach((circuit, circuitIdx) => {
      const normalisedCircuit = normaliseAICircuit(circuit);

      // If we have a blank slot for this board, fill it
      if (blankIndices.length > 0) {
        const blankIdx = blankIndices.shift()!;
        const existingResult = updatedResults[blankIdx];
        const circuitNumber = existingResult.circuitNumber;

        const liveSize = normalisedCircuit.liveSize;
        const circuitType = normalisedCircuit.circuitType || '';
        const circuitDesc = normalisedCircuit.circuitDescription || '';

        // Circuit type detection
        const isRingCircuit = circuitType.toLowerCase().includes('ring');
        const isSocketCircuit = circuitType.toLowerCase().includes('socket');
        const isBathroomCircuit = circuitDesc.toLowerCase().includes('bathroom');
        const isOutdoorCircuit = circuitDesc.toLowerCase().includes('outdoor') ||
                                  circuitDesc.toLowerCase().includes('garden');

        const isRCBOOrRCD = normalisedCircuit.protectiveDeviceType.toUpperCase().includes('RCD') ||
                            normalisedCircuit.protectiveDeviceType.toUpperCase().includes('RCBO');
        const requiresRCD = isSocketCircuit || isBathroomCircuit || isOutdoorCircuit || isRCBOOrRCD;

        // Determine phase type (default to 1P if not specified)
        const phaseType = normalisedCircuit.phaseType || '1P';

        updatedResults[blankIdx] = {
          ...existingResult,
          circuitDescription: circuitDesc,
          circuitType: circuitType,
          type: circuitType,
          referenceMethod: normalisedCircuit.referenceMethod,
          liveSize: liveSize,
          cpcSize: normalisedCircuit.cpcSize,
          cableSize: liveSize,
          protectiveDeviceType: normalisedCircuit.protectiveDeviceType,
          protectiveDeviceRating: normalisedCircuit.protectiveDeviceRating,
          protectiveDeviceKaRating: normalisedCircuit.protectiveDeviceKaRating,
          protectiveDevice: `${normalisedCircuit.protectiveDeviceType} ${normalisedCircuit.protectiveDeviceRating}`.trim(),
          protectiveDeviceLocation: 'Consumer Unit',
          bsStandard: normalisedCircuit.bsStandard,
          maxZs: calculateMaxZsForCircuit(
            normalisedCircuit.bsStandard,
            normalisedCircuit.protectiveDeviceCurve,
            normalisedCircuit.protectiveDeviceRating
          ),
          ringContinuityLive: isRingCircuit ? '' : 'N/A',
          ringContinuityNeutral: isRingCircuit ? '' : 'N/A',
          insulationTestVoltage: '500V',
          polarity: 'Satisfactory',
          pointsServed: calculatePointsServed(circuitDesc, circuitType, normalisedCircuit.protectiveDeviceType),
          rcdRating: requiresRCD ? '30mA' : '',
          functionalTesting: 'Satisfactory',
          notes: `AI detected from board scan - Please verify all values`,
          autoFilled: true,
          // Three-phase fields
          phaseType: phaseType,
          phaseRotation: phaseType === '3P' ? '' : undefined,
          lineToLineVoltage: phaseType === '3P' ? '' : undefined,
        };
      } else {
        // No blank slots, add to remaining
        remainingCircuits.push(normalisedCircuit);
      }
    });

    // Append remaining circuits that didn't fit in blank slots
    remainingCircuits.forEach((circuit, index) => {
      // Use board-specific circuit count + circuits already added in this loop
      const circuitNumber = (existingBoardCircuits.length + addedCount + 1).toString();
      addedCount++;

      const liveSize = circuit.liveSize;
      const circuitType = circuit.circuitType || '';
      const circuitDesc = circuit.circuitDescription || '';

      const isRingCircuit = circuitType.toLowerCase().includes('ring');
      const isSocketCircuit = circuitType.toLowerCase().includes('socket');
      const isBathroomCircuit = circuitDesc.toLowerCase().includes('bathroom');
      const isOutdoorCircuit = circuitDesc.toLowerCase().includes('outdoor') ||
                                circuitDesc.toLowerCase().includes('garden');

      const isRCBOOrRCD = circuit.protectiveDeviceType.toUpperCase().includes('RCD') ||
                          circuit.protectiveDeviceType.toUpperCase().includes('RCBO');
      const requiresRCD = isSocketCircuit || isBathroomCircuit || isOutdoorCircuit || isRCBOOrRCD;

      // Determine phase type (default to 1P if not specified)
      const phaseType = circuit.phaseType || '1P';

      const newResult: TestResult = {
        id: `test-${Date.now()}-${Math.random()}`,
        circuitNumber: circuitNumber,
        circuitDescription: circuitDesc,
        circuitDesignation: `C${circuitNumber}`,
        circuitType: circuitType,
        type: circuitType,
        referenceMethod: circuit.referenceMethod,
        liveSize: liveSize,
        cpcSize: circuit.cpcSize,
        cableSize: liveSize,
        protectiveDeviceType: circuit.protectiveDeviceType,
        protectiveDeviceRating: circuit.protectiveDeviceRating,
        protectiveDeviceKaRating: circuit.protectiveDeviceKaRating,
        protectiveDevice: `${circuit.protectiveDeviceType} ${circuit.protectiveDeviceRating}`.trim(),
        protectiveDeviceLocation: 'Consumer Unit',
        bsStandard: circuit.bsStandard,
        r1r2: '',
        r2: '',
        ringContinuityLive: isRingCircuit ? '' : 'N/A',
        ringContinuityNeutral: isRingCircuit ? '' : 'N/A',
        ringR1: isRingCircuit ? '' : 'N/A',
        ringRn: isRingCircuit ? '' : 'N/A',
        ringR2: isRingCircuit ? '' : 'N/A',
        insulationTestVoltage: '500V',
        insulationResistance: '',
        insulationLiveNeutral: '',
        insulationLiveEarth: '',
        insulationNeutralEarth: '',
        polarity: 'Satisfactory',
        zs: '',
        maxZs: calculateMaxZsForCircuit(
          circuit.bsStandard,
          circuit.protectiveDeviceCurve,
          circuit.protectiveDeviceRating
        ),
        pointsServed: calculatePointsServed(circuitDesc, circuitType, circuit.protectiveDeviceType),
        rcdRating: requiresRCD ? '30mA' : '',
        rcdOneX: '',
        rcdTestButton: '',
        afddTest: '',
        pfc: '',
        pfcLiveNeutral: '',
        pfcLiveEarth: '',
        functionalTesting: 'Satisfactory',
        notes: `AI detected from board scan - Please verify all values`,
        autoFilled: true,
        typeOfWiring: '',
        rcdBsStandard: '',
        rcdType: '',
        rcdRatingA: '',
        // Board assignment
        boardId: targetBoardId,
        // Three-phase fields
        phaseType: phaseType,
        phaseRotation: phaseType === '3P' ? '' : undefined,
        lineToLineVoltage: phaseType === '3P' ? '' : undefined,
      };
      updatedResults.push(newResult);
    });

    setTestResults(updatedResults);
    onUpdate('scheduleOfTests', updatedResults);
  };

  const handleCreateCircuit = (
    useAutoFill: boolean = false, 
    circuitType?: string, 
    suggestions?: Partial<TestResult>
  ) => {
    const baseResult: TestResult = {
      id: Date.now().toString(),
      circuitDesignation: `C${newCircuitNumber}`,
      circuitNumber: newCircuitNumber,
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
      phaseType: '1P',
      autoFilled: useAutoFill
    };

    // Apply auto-fill suggestions if provided
    const newResult = suggestions ? {
      ...baseResult,
      ...suggestions,
      circuitDescription: circuitType || '',
      type: circuitType || '',
      autoFilled: true
    } : baseResult;
    const updatedResults = [...testResults, newResult];
    setTestResults(updatedResults);
    onUpdate('scheduleOfTests', updatedResults);
    setShowAutoFillPrompt(false);
    
    if (useAutoFill) {
      setTimeout(() => {
        const autoFillSection = document.querySelector('[data-autofill-section]');
        if (autoFillSection) {
          autoFillSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  };

  const undoDelete = useCallback(() => {
    if (!lastDeleted) return;
    
    setTestResults(prev => {
      const updatedResults = [...prev];
      updatedResults.splice(lastDeleted.index, 0, lastDeleted.circuit);
      onUpdate('scheduleOfTests', updatedResults);
      return updatedResults;
    });
    
    setLastDeleted(null);
    toast.success('Circuit restored');
  }, [lastDeleted, onUpdate]);

  const removeTestResult = useCallback((id: string) => {
    setTestResults(prev => {
      const index = prev.findIndex(result => result.id === id);
      if (index === -1) return prev;
      
      const deletedCircuit = prev[index];
      setLastDeleted({ circuit: deletedCircuit, index });
      
      const updatedResults = prev.filter(result => result.id !== id);
      onUpdate('scheduleOfTests', updatedResults);
      
      toast.success('Circuit deleted', {
        description: `Circuit ${deletedCircuit.circuitNumber || deletedCircuit.circuitDesignation} removed`,
        action: {
          label: 'Undo',
          onClick: () => {
            setTestResults(current => {
              const restored = [...current];
              restored.splice(index, 0, deletedCircuit);
              onUpdate('scheduleOfTests', restored);
              return restored;
            });
            setLastDeleted(null);
          },
        },
      });
      
      return updatedResults;
    });
  }, [onUpdate]);

  const removeAllTestResults = () => {
    if (window.confirm('Are you sure you want to remove all test results? This action cannot be undone.')) {
      setTestResults([]);
      onUpdate('scheduleOfTests', []);
    }
  };

  // Bulk infill handler
  const handleBulkInfill = (value: string, mode: 'all' | 'empty') => {
    const fillableFields: (keyof TestResult)[] = [
      'typeOfWiring', 'referenceMethod', 'pointsServed',
      'liveSize', 'cpcSize',
      'bsStandard', 'protectiveDeviceType', 'protectiveDeviceCurve', 
      'protectiveDeviceRating', 'protectiveDeviceKaRating', 'maxZs',
      'rcdBsStandard', 'rcdType', 'rcdRating', 'rcdRatingA',
      'ringR1', 'ringRn', 'ringR2',
      'r1r2', 'r2',
      'insulationTestVoltage', 'insulationLiveNeutral', 'insulationLiveEarth',
      'polarity', 'zs',
      'rcdOneX', 'rcdTestButton', 'afddTest',
      'pfc', 'notes'
    ];

    let updatedCount = 0;
    
    // Build updated results in a single pass
    const updatedResults = testResults.map(result => {
      let updatedResult = { ...result };
      let hasChanges = false;
      
      fillableFields.forEach(field => {
        const currentValue = result[field];
        const isEmpty = !currentValue || currentValue.toString().trim() === '';
        
        if (mode === 'all' || (mode === 'empty' && isEmpty)) {
          (updatedResult as any)[field] = value;
          updatedCount++;
          hasChanges = true;
        }
      });
      
      // Clear autoFilled flag if any changes made
      if (hasChanges && result.autoFilled) {
        updatedResult.autoFilled = false;
      }
      
      return updatedResult;
    });
    
    // Single state update
    setTestResults(updatedResults);
    onUpdate('scheduleOfTests', updatedResults);

    toast.success(`Filled ${updatedCount} fields with "${value}"`);
    setShowBulkInfillDialog(false);
  };

  const updateTestResult = useCallback((id: string, field: keyof TestResult, value: string) => {
    setTestResults(prev => {
      const updatedResults = prev.map(result => {
        if (result.id === id) {
          const updatedResult = { ...result, [field]: value };
          
          if (result.autoFilled && field !== 'autoFilled') {
            updatedResult.autoFilled = false;
          }
          
          if (field === 'circuitNumber' && value) {
            updatedResult.circuitDesignation = `C${value}`;
          }
          
          // Maintain legacy field synchronisation
          if (field === 'liveSize') {
            updatedResult.cableSize = value;
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
      onUpdate('scheduleOfTests', updatedResults);
      return updatedResults;
    });
  }, [onUpdate]);

  const handleBulkUpdate = useCallback((id: string, updates: Partial<TestResult>) => {
    setTestResults(prev => {
      const updatedResults = prev.map(result => {
        if (result.id === id) {
          const updatedResult = { ...result, ...updates };
          
          if (updates.circuitNumber) {
            updatedResult.circuitDesignation = `C${updates.circuitNumber}`;
          }
          
          // Maintain legacy field synchronisation
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
      onUpdate('scheduleOfTests', updatedResults);
      return updatedResults;
    });
  }, [onUpdate]);

  // Bulk field update - sets a single field to the same value for all test results
  const handleBulkFieldUpdate = (field: keyof TestResult, value: string) => {
    const updatedResults = testResults.map(result => ({
      ...result,
      [field]: value,
      // Clear autoFilled flag when user makes bulk changes
      autoFilled: result.autoFilled ? false : result.autoFilled
    }));
    setTestResults(updatedResults);
    onUpdate('scheduleOfTests', updatedResults);
  };

  // Quick Fill RCD handlers
  const handleFillAllRcdBsStandard = (value: string) => {
    handleBulkFieldUpdate('rcdBsStandard', value);
  };

  const handleFillAllRcdType = (value: string) => {
    handleBulkFieldUpdate('rcdType', value);
  };

  const handleFillAllRcdRating = (value: string) => {
    handleBulkFieldUpdate('rcdRating', value);
  };

  const handleFillAllRcdRatingA = (value: string) => {
    handleBulkFieldUpdate('rcdRatingA', value);
  };

  // Quick Fill IR handlers
  const handleFillAllInsulationVoltage = (value: string) => {
    handleBulkFieldUpdate('insulationTestVoltage', value);
  };

  const handleFillAllInsulationLiveNeutral = (value: string) => {
    handleBulkFieldUpdate('insulationLiveNeutral', value);
  };

  const handleFillAllInsulationLiveEarth = (value: string) => {
    handleBulkFieldUpdate('insulationLiveEarth', value);
  };

  return (
    <div className="pb-20 lg:pb-4">
      {/* MOBILE FULL-WIDTH LAYOUT - Clean Edge-to-Edge Design (EICR Pattern) */}
      {useMobileView ? (
        <div className="min-h-screen bg-background -mx-4">
          {/* Voice Status Indicator - Shows at top when active */}
          {voiceActive && (
            <div className="p-4 bg-green-500/20 border-b border-green-500/30">
              <div className="flex items-center justify-center gap-2">
                <Mic className="h-4 w-4 text-green-400 animate-pulse" />
                <span className="text-sm text-green-400 font-medium">Voice Active - Say "Add circuit" or test values</span>
              </div>
            </div>
          )}

          {/* Distribution Boards - Edge to Edge */}
          <div className="pb-4">
            {distributionBoards
              .sort((a, b) => a.order - b.order)
              .map(board => {
                const boardCircuits = getCircuitsForBoard(testResults, board.id);
                const boardCompletedCount = boardCircuits.filter(r =>
                  r.zs && r.polarity && (r.insulationLiveEarth || r.insulationResistance)
                ).length;
                const boardProgressPercent = boardCircuits.length > 0
                  ? Math.round((boardCompletedCount / boardCircuits.length) * 100)
                  : 0;
                const isComplete = boardProgressPercent === 100;

                return (
                  <Collapsible
                    key={board.id}
                    open={expandedBoards.has(board.id)}
                    onOpenChange={() => toggleBoardExpanded(board.id)}
                  >
                    {/* Board Header */}
                    <CollapsibleTrigger className="w-full" asChild>
                      <button className="w-full flex items-center gap-3 p-4 text-left touch-manipulation transition-colors bg-card/50 border-y border-border/30 active:bg-card/90">
                        {/* Progress Ring */}
                        <div className="relative flex-shrink-0">
                          <svg className="w-12 h-12 -rotate-90">
                            <circle
                              cx="24"
                              cy="24"
                              r="20"
                              strokeWidth="3"
                              stroke="currentColor"
                              fill="none"
                              className="text-border/30"
                            />
                            <circle
                              cx="24"
                              cy="24"
                              r="20"
                              strokeWidth="3"
                              stroke="currentColor"
                              fill="none"
                              strokeDasharray={`${boardProgressPercent * 1.26} 126`}
                              strokeLinecap="round"
                              className={isComplete ? "text-green-500" : "text-elec-yellow"}
                            />
                          </svg>
                          <div className={`absolute inset-0 flex items-center justify-center text-sm font-bold ${isComplete ? "text-green-400" : "text-elec-yellow"}`}>
                            {isComplete ? <CheckCircle className="h-5 w-5" /> : <Zap className="h-5 w-5" />}
                          </div>
                        </div>

                        {/* Board Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className={`font-semibold text-base ${isComplete ? "text-green-400" : "text-foreground"}`}>
                            {board.name}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                            <span>{boardCircuits.length} circuit{boardCircuits.length !== 1 ? 's' : ''}</span>
                            <span>·</span>
                            <span className={isComplete ? "text-green-400 font-medium" : boardProgressPercent > 0 ? "text-elec-yellow font-medium" : ""}>
                              {boardProgressPercent}% complete
                            </span>
                          </div>
                        </div>

                        {/* Chevron */}
                        <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${expandedBoards.has(board.id) ? 'rotate-180' : ''}`} />
                      </button>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      {/* Board Details */}
                      <div className="p-4 bg-card/30 border-b border-border/20 space-y-3">
                        {/* Board Reference & Location */}
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs text-muted-foreground uppercase tracking-wide block mb-1">Reference</label>
                            <DebouncedInput
                              type="text"
                              value={board.reference || ''}
                              onChange={(value) => handleUpdateBoard(board.id, 'reference', value)}
                              placeholder={board.name}
                              className="w-full h-10 px-3 rounded-lg bg-card border border-border/50 text-sm focus:border-elec-yellow focus:outline-none touch-manipulation"
                              style={{ fontSize: '16px' }}
                            />
                          </div>
                          <div>
                            <label className="text-xs text-muted-foreground uppercase tracking-wide block mb-1">Location</label>
                            <DebouncedInput
                              type="text"
                              value={board.location || ''}
                              onChange={(value) => handleUpdateBoard(board.id, 'location', value)}
                              placeholder="e.g., Garage, Kitchen"
                              className="w-full h-10 px-3 rounded-lg bg-card border border-border/50 text-sm focus:border-elec-yellow focus:outline-none touch-manipulation"
                              style={{ fontSize: '16px' }}
                            />
                          </div>
                        </div>

                        {/* ZDB & IPF Row */}
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs text-muted-foreground uppercase tracking-wide block mb-1">Z<sub>DB</sub> (Ω)</label>
                            <div className="relative">
                              <DebouncedInput
                                type="text"
                                inputMode="decimal"
                                value={board.zdb || ''}
                                onChange={(value) => handleUpdateBoard(board.id, 'zdb', value)}
                                placeholder="0.00"
                                className="w-full h-10 px-3 pr-8 rounded-lg bg-card border border-border/50 text-sm focus:border-elec-yellow focus:outline-none touch-manipulation"
                                style={{ fontSize: '16px' }}
                              />
                              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">Ω</span>
                            </div>
                          </div>
                          <div>
                            <label className="text-xs text-muted-foreground uppercase tracking-wide block mb-1">I<sub>PF</sub> (kA)</label>
                            <div className="relative">
                              <DebouncedInput
                                type="text"
                                inputMode="decimal"
                                value={board.ipf || ''}
                                onChange={(value) => handleUpdateBoard(board.id, 'ipf', value)}
                                placeholder="0.0"
                                className="w-full h-10 px-3 pr-8 rounded-lg bg-card border border-border/50 text-sm focus:border-elec-yellow focus:outline-none touch-manipulation"
                                style={{ fontSize: '16px' }}
                              />
                              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">kA</span>
                            </div>
                          </div>
                        </div>

                        {/* Quick Checks */}
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => handleUpdateBoard(board.id, 'confirmedCorrectPolarity', !board.confirmedCorrectPolarity)}
                            className={`h-10 rounded-lg text-sm font-medium transition-all touch-manipulation active:scale-95 flex items-center gap-2 px-3 ${
                              board.confirmedCorrectPolarity
                                ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                                : 'bg-card border border-border/50 text-muted-foreground'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${board.confirmedCorrectPolarity ? 'bg-green-500 border-green-500' : 'border-muted-foreground'}`}>
                              {board.confirmedCorrectPolarity && <Check className="h-3 w-3 text-white" />}
                            </div>
                            <span className="flex-1 text-left">Polarity</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleUpdateBoard(board.id, 'confirmedPhaseSequence', !board.confirmedPhaseSequence)}
                            className={`h-10 rounded-lg text-sm font-medium transition-all touch-manipulation active:scale-95 flex items-center gap-2 px-3 ${
                              board.confirmedPhaseSequence
                                ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                                : 'bg-card border border-border/50 text-muted-foreground'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${board.confirmedPhaseSequence ? 'bg-green-500 border-green-500' : 'border-muted-foreground'}`}>
                              {board.confirmedPhaseSequence && <Check className="h-3 w-3 text-white" />}
                            </div>
                            <span className="flex-1 text-left">Phase Seq</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleUpdateBoard(board.id, 'spdOperationalStatus', !board.spdOperationalStatus)}
                            className={`h-10 rounded-lg text-sm font-medium transition-all touch-manipulation active:scale-95 flex items-center gap-2 px-3 ${
                              board.spdOperationalStatus
                                ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                                : 'bg-card border border-border/50 text-muted-foreground'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${board.spdOperationalStatus ? 'bg-green-500 border-green-500' : 'border-muted-foreground'}`}>
                              {board.spdOperationalStatus && <Check className="h-3 w-3 text-white" />}
                            </div>
                            <span className="flex-1 text-left">SPD OK</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleUpdateBoard(board.id, 'spdNA', !board.spdNA)}
                            className={`h-10 rounded-lg text-sm font-medium transition-all touch-manipulation active:scale-95 flex items-center gap-2 px-3 ${
                              board.spdNA
                                ? 'bg-elec-yellow/20 border border-elec-yellow/30 text-elec-yellow'
                                : 'bg-card border border-border/50 text-muted-foreground'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${board.spdNA ? 'bg-elec-yellow border-elec-yellow' : 'border-muted-foreground'}`}>
                              {board.spdNA && <Check className="h-3 w-3 text-black" />}
                            </div>
                            <span className="flex-1 text-left">SPD N/A</span>
                          </button>
                        </div>

                      </div>

                      {/* Tools Bar - Above Circuit Table */}
                      <div className="-mx-4 grid grid-cols-[1fr_1fr_48px] gap-2 p-4 bg-background border-y border-border/30">
                        <Button
                          className="h-12 rounded-xl bg-elec-yellow text-black font-bold hover:bg-elec-yellow/90 touch-manipulation active:scale-95"
                          onClick={() => { setActiveBoardId(board.id); setShowPhotoCapture(true); }}
                        >
                          <Camera className="h-5 w-5 mr-2" />
                          AI Scan
                        </Button>
                        <Button
                          className="h-12 rounded-xl bg-card border border-border/50 text-foreground font-semibold hover:bg-card/80 touch-manipulation active:scale-95"
                          onClick={() => addCircuitToBoard(board.id)}
                        >
                          <Plus className="h-5 w-5 mr-2" />
                          Add Circuit
                        </Button>
                        <Button
                          className={`h-12 w-12 rounded-xl touch-manipulation active:scale-95 ${
                            voiceActive
                              ? 'bg-green-500 text-white'
                              : voiceConnecting
                              ? 'bg-yellow-500 text-black animate-pulse'
                              : 'bg-purple-600 text-white'
                          }`}
                          onClick={toggleVoice}
                          disabled={voiceConnecting}
                        >
                          <Mic className={`h-5 w-5 ${voiceActive ? 'animate-pulse' : ''}`} />
                        </Button>
                      </div>

                      {/* Circuit Table */}
                      <div className="bg-background">
                        {boardCircuits.length === 0 ? (
                          <div className="p-8 text-center">
                            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-3">
                              <Zap className="h-6 w-6 text-white/30" />
                            </div>
                            <p className="text-sm text-white/50 mb-3">No circuits yet</p>
                            <Button
                              onClick={() => addCircuitToBoard(board.id)}
                              className="h-11 bg-elec-yellow text-black font-medium hover:bg-elec-yellow/90 touch-manipulation"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add First Circuit
                            </Button>
                          </div>
                        ) : mobileViewType === 'table' ? (
                          <MobileHorizontalScrollTable
                            testResults={boardCircuits}
                            onUpdate={updateTestResult}
                            onRemove={removeTestResult}
                            onBulkUpdate={handleBulkUpdate}
                            onBulkFieldUpdate={handleBulkFieldUpdate}
                          />
                        ) : (
                          <div className="p-4">
                            <CircuitList
                              circuits={boardCircuits}
                              onUpdate={updateTestResult}
                              onRemove={removeTestResult}
                              onBulkUpdate={handleBulkUpdate}
                              viewMode="card"
                              className="px-0"
                            />
                          </div>
                        )}

                        {/* Add Circuit to This Board */}
                        {boardCircuits.length > 0 && (
                          <div className="p-4 border-t border-border/20">
                            <Button
                              onClick={() => addCircuitToBoard(board.id)}
                              variant="outline"
                              className="w-full h-11 border-dashed border-white/20 text-white/60 hover:bg-white/5 touch-manipulation"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add Circuit to {board.name}
                            </Button>
                          </div>
                        )}
                      </div>

                      {/* Board Actions Footer */}
                      {board.id !== MAIN_BOARD_ID && (
                        <div className="p-3 bg-card/30 border-t border-border/20 flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">
                            {boardCircuits.length} circuit{boardCircuits.length !== 1 ? 's' : ''} in this board
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveBoard(board.id)}
                            className="h-8 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          >
                            <Trash2 className="h-3.5 w-3.5 mr-1" />
                            Remove Board
                          </Button>
                        </div>
                      )}
                    </CollapsibleContent>
                  </Collapsible>
                );
              })}

            {/* Add Board Button */}
            <div className="p-4">
              <Button
                onClick={handleAddBoard}
                variant="outline"
                className="w-full h-12 border-dashed border-white/20 text-white/60 hover:bg-white/5 touch-manipulation"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Distribution Board
              </Button>
            </div>

            {/* View Toggle */}
            <div className="px-4 pb-2 flex items-center justify-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMobileView}
                className="h-9 text-xs gap-1.5 text-muted-foreground hover:text-foreground"
              >
                {mobileViewType === 'table' ? <Layout className="h-3.5 w-3.5" /> : <Table className="h-3.5 w-3.5" />}
                Switch to {mobileViewType === 'table' ? 'Card' : 'Table'} View
              </Button>
            </div>
          </div>
        </div>
      ) : (
        /* DESKTOP LAYOUT - Premium Professional Dashboard */
        <div className="w-full space-y-6 py-6">
          {/* Hero Card */}
          <div className="testing-hero p-6">
            <div className="relative z-10">
              {/* Header Row */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-elec-yellow/20 border border-elec-yellow/30">
                    <TestTube className="h-8 w-8 text-elec-yellow" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Schedule of Tests</h2>
                    <p className="text-sm text-white/60">
                      BS 7671 compliant circuit testing & verification
                    </p>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="flex gap-3">
                  <div className="testing-stat-card min-w-[80px]">
                    <span className="text-2xl font-bold text-white">{testResults.length}</span>
                    <span className="text-xs text-white/50">Circuits</span>
                  </div>
                  <div className="testing-stat-card min-w-[80px]">
                    <span className="text-2xl font-bold text-green-400">{completedCount}</span>
                    <span className="text-xs text-white/50">Complete</span>
                  </div>
                  <div className="testing-stat-card min-w-[80px]">
                    <span className="text-2xl font-bold text-amber-400">{pendingCount}</span>
                    <span className="text-xs text-white/50">Pending</span>
                  </div>
                  <div className="testing-stat-card min-w-[80px]">
                    <span className="text-2xl font-bold text-elec-yellow">{progressPercent}%</span>
                    <span className="text-xs text-white/50">Progress</span>
                  </div>
                </div>
              </div>

              {/* Single row of tools */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {/* Primary tools - left */}
                <Button
                  onClick={() => setShowPhotoCapture(true)}
                  variant="outline"
                  className="h-10 sm:h-11 bg-white/5 border-white/20 hover:bg-white/10 text-white"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  AI Board Scan
                </Button>

                <Button
                  onClick={toggleVoice}
                  disabled={voiceConnecting}
                  variant="outline"
                  className={`h-10 sm:h-11 ${
                    voiceActive
                      ? 'bg-green-600 hover:bg-green-700 border-green-400/30 text-white'
                      : voiceConnecting
                      ? 'bg-yellow-600 animate-pulse border-yellow-400/30 text-white'
                      : 'bg-white/5 border-white/20 hover:bg-white/10 text-white'
                  }`}
                >
                  <Mic className={`h-4 w-4 mr-2 ${voiceActive ? 'animate-pulse' : ''}`} />
                  {voiceActive ? 'Tap to Stop' : voiceConnecting ? 'Connecting...' : 'Voice Assistant'}
                </Button>

                <Button
                  onClick={addTestResult}
                  variant="outline"
                  className="h-10 sm:h-11 bg-white/5 border-white/20 hover:bg-white/10 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Circuit
                </Button>

                {/* Spacer */}
                <div className="flex-1 min-w-0" />

                {/* Secondary tools - right */}
                <Button
                  onClick={() => setShowAnalytics(!showAnalytics)}
                  variant="ghost"
                  className="h-10 sm:h-11 text-white/60 hover:text-white hover:bg-white/10"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analytics
                </Button>

                {testResults.length > 0 && (
                  <Button
                    onClick={removeAllTestResults}
                    variant="ghost"
                    className="h-10 sm:h-11 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear All
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Analytics Section */}
          {showAnalytics && testResults.length > 0 && (
            <div className="testing-table-container p-4">
              <TestAnalytics testResults={testResults} />
            </div>
          )}

          {/* Board Management Header */}
          <BoardManagement
            boards={distributionBoards}
            onAddBoard={handleAddBoard}
            totalCircuits={testResults.length}
          />

          {/* Distribution Boards with Circuit Tables */}
          <div className="space-y-4" data-autofill-section>
            {distributionBoards
              .sort((a, b) => a.order - b.order)
              .map(board => {
                const boardCircuits = getCircuitsForBoard(testResults, board.id);
                return (
                  <BoardSection
                    key={board.id}
                    board={board}
                    isExpanded={expandedBoards.has(board.id)}
                    onToggleExpanded={() => toggleBoardExpanded(board.id)}
                    onUpdateBoard={handleUpdateBoard}
                    onRemoveBoard={handleRemoveBoard}
                    onAddCircuit={() => addCircuitToBoard(board.id)}
                    circuitCount={boardCircuits.length}
                    completedCount={boardCircuits.filter(r =>
                      r.zs && r.polarity && (r.insulationLiveEarth || r.insulationResistance)
                    ).length}
                    showTools={true}
                    tools={createBoardTools(board.id)}
                  >
                    <EnhancedTestResultDesktopTable
                      testResults={boardCircuits}
                      onUpdate={updateTestResult}
                      onRemove={removeTestResult}
                      allResults={testResults}
                      onBulkUpdate={handleBulkUpdate}
                      onAddCircuit={() => addCircuitToBoard(board.id)}
                      onBulkFieldUpdate={handleBulkFieldUpdate}
                    />
                  </BoardSection>
                );
              })}
          </div>
        </div>
      )}

      {/* SHARED INFO SECTIONS - Responsive Layout */}
      {useMobileView ? (
        /* Mobile: Collapsible Accordions */
        <div className="px-4 pb-24 space-y-2 mt-4">
          {/* Test Instrument Info */}
          <div className="testing-info-section">
            <Collapsible>
              <CollapsibleTrigger asChild>
                <button className="testing-info-header">
                  <span className="flex items-center gap-2">
                    <Wrench className="h-4 w-4 text-elec-yellow" />
                    Test Instruments
                  </span>
                  <ChevronDown className="h-4 w-4 text-white/50 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 pb-4">
                <TestInstrumentInfo formData={formData} onUpdate={onUpdate} />
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Test Method & Notes */}
          <div className="testing-info-section">
            <Collapsible>
              <CollapsibleTrigger asChild>
                <button className="testing-info-header">
                  <span className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-elec-yellow" />
                    Test Method & Notes
                  </span>
                  <ChevronDown className="h-4 w-4 text-white/50 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 pb-4">
                <TestMethodInfo formData={formData} onUpdate={onUpdate} />
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      ) : (
        /* Desktop: Horizontal Card Grid */
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="testing-info-section p-4">
            <h3 className="text-sm font-semibold text-white/90 flex items-center gap-2 mb-4">
              <Wrench className="h-4 w-4 text-elec-yellow" />
              Test Instruments
            </h3>
            <TestInstrumentInfo formData={formData} onUpdate={onUpdate} />
          </div>

          <div className="testing-info-section p-4">
            <h3 className="text-sm font-semibold text-white/90 flex items-center gap-2 mb-4">
              <FileText className="h-4 w-4 text-elec-yellow" />
              Test Method & Notes
            </h3>
            <TestMethodInfo formData={formData} onUpdate={onUpdate} />
          </div>
        </div>
      )}

      {/* Quick Fill RCD Panel Dialog */}
      {showQuickFillPanel && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Quick Fill RCD Details</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowQuickFillPanel(false)}
              className="h-9 w-9 p-0"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <QuickFillRcdPanel
              onFillAllRcdBsStandard={handleFillAllRcdBsStandard}
              onFillAllRcdType={handleFillAllRcdType}
              onFillAllRcdRating={handleFillAllRcdRating}
              onFillAllRcdRatingA={handleFillAllRcdRatingA}
            />
            <QuickFillIrPanel
              onFillAllInsulationVoltage={handleFillAllInsulationVoltage}
              onFillAllInsulationLiveNeutral={handleFillAllInsulationLiveNeutral}
              onFillAllInsulationLiveEarth={handleFillAllInsulationLiveEarth}
            />
          </div>
        </div>
      )}

      {/* Dialogs - Render outside conditional blocks */}
      
      {/* AI Board Scanner - Unified Overlay */}
      {showPhotoCapture && (
        <BoardScannerOverlay
          onClose={() => {
            setShowPhotoCapture(false);
            setActiveBoardId(null);
          }}
          onAnalysisComplete={(data) => {
            handleAIAnalysisComplete(data);
            setShowPhotoCapture(false);
          }}
          title="Scan Distribution Board"
        />
      )}

      {/* Test Results Photo Capture - Tool Sheet Pattern */}
      {showTestResultsScan && (
        <>
          <div className="tool-sheet-overlay" onClick={() => setShowTestResultsScan(false)} />
          <div className="tool-sheet-container">
            <div className="tool-sheet-handle md:hidden" />
            <div className="tool-sheet-header">
              <div className="tool-sheet-title">
                <Camera className="h-5 w-5 text-elec-yellow" />
                Scan Test Results
              </div>
              <Button variant="ghost" size="icon" onClick={() => setShowTestResultsScan(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="tool-sheet-content">
              <TestResultsPhotoCapture
                onAnalysisComplete={handleTestResultsAnalysisComplete}
                onClose={() => setShowTestResultsScan(false)}
                renderContentOnly={true}
              />
            </div>
          </div>
        </>
      )}

      {/* AI Circuit Review now handled by BoardScannerOverlay's CircuitReviewSheet */}

      {/* Test Results Review Dialog */}
      {showTestResultsReview && extractedTestResults && (
        <TestResultsReviewDialog
          open={showTestResultsReview}
          onClose={() => {
            setShowTestResultsReview(false);
            setExtractedTestResults(null);
          }}
          extractedData={extractedTestResults}
          onAccept={handleAcceptTestResults}
        />
      )}

      {/* Scribble to Table Dialog */}
      {showScribbleDialog && (
        <ScribbleToTableDialog
          onCircuitsAdded={(newCircuits) => {
            const updatedResults = [...testResults, ...newCircuits];
            setTestResults(updatedResults);
            onUpdate('scheduleOfTests', updatedResults);
            setShowScribbleDialog(false);
            toast.success(`Added ${newCircuits.length} circuit(s) from text`);
          }}
          onClose={() => setShowScribbleDialog(false)}
        />
      )}

      {/* Smart Auto-Fill Dialog */}
      <SmartAutoFillPromptDialog
        open={showAutoFillPrompt}
        onOpenChange={setShowAutoFillPrompt}
        onUseAutoFill={(circuitType, suggestions) => handleCreateCircuit(true, circuitType, suggestions)}
        onSkip={() => handleCreateCircuit(false)}
        circuitNumber={newCircuitNumber}
      />

      {/* Smart Auto-Fill Dialog - Tool Sheet Pattern */}
      {showSmartAutoFillDialog && (
        <>
          <div className="tool-sheet-overlay" onClick={() => setShowSmartAutoFillDialog(false)} />
          <div className="tool-sheet-container">
            <div className="tool-sheet-handle md:hidden" />
            <div className="tool-sheet-header">
              <div className="tool-sheet-title">
                <Zap className="h-5 w-5 text-elec-yellow" />
                Smart Circuit Auto-Fill
              </div>
              <Button variant="ghost" size="icon" onClick={() => setShowSmartAutoFillDialog(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="tool-sheet-content">
              <MobileSmartAutoFill
                testResults={testResults}
                onUpdate={handleBulkUpdate}
              />
            </div>
          </div>
        </>
      )}

      {/* RCD Presets Dialog - Tool Sheet Pattern */}
      {showRcdPresetsDialog && (
        <>
          <div className="tool-sheet-overlay" onClick={() => setShowRcdPresetsDialog(false)} />
          <div className="tool-sheet-container">
            <div className="tool-sheet-handle md:hidden" />
            <div className="tool-sheet-header">
              <div className="tool-sheet-title">
                <Shield className="h-5 w-5 text-elec-yellow" />
                Quick RCD Presets
              </div>
              <Button variant="ghost" size="icon" onClick={() => setShowRcdPresetsDialog(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="tool-sheet-content">
              <QuickRcdPresets
                testResults={testResults.map(r => ({ id: r.id, circuitDesignation: r.circuitDesignation }))}
                onApplyToCircuits={(circuitIds, preset) => {
                  const updatedResults = testResults.map(result => {
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
                  onUpdate('scheduleOfTests', updatedResults);
                  setShowRcdPresetsDialog(false);

                  toast.success(`✓ ${preset.label} Applied`, {
                    description: `RCD details set for ${circuitIds.length} circuit${circuitIds.length > 1 ? 's' : ''}`,
                    duration: 2000,
                  });
                }}
              />
            </div>
          </div>
        </>
      )}

      {/* Bulk Infill Dialog */}
      <BulkInfillDialog
        open={showBulkInfillDialog}
        onOpenChange={setShowBulkInfillDialog}
        testResults={testResults}
        onApply={handleBulkInfill}
      />
    </div>
  );
};

export default EICScheduleOfTesting;
