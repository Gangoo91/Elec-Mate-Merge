import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useOptionalVoiceFormContext, FormField } from '@/contexts/VoiceFormContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Plus, BarChart3, Zap, Camera, LayoutGrid, Table2, Shield, X, PenTool, FileText, Wrench, ClipboardList, ClipboardCheck, Wand2, Sparkles, MoreVertical, Layout, Table, Trash2, Grid, Pen, Mic } from 'lucide-react';
import { toast } from 'sonner';
import { TestResult } from '@/types/testResult';
import EnhancedTestResultDesktopTable from './EnhancedTestResultDesktopTable';
import MobileOptimizedTestTable from './mobile/MobileOptimizedTestTable';
import { MobileHorizontalScrollTable } from './mobile/MobileHorizontalScrollTable';
import MobileSmartAutoFill from './mobile/MobileSmartAutoFill';
import QuickRcdPresets from './QuickRcdPresets';
import QuickFillRcdPanel from './QuickFillRcdPanel';
import TestInstrumentInfo from './TestInstrumentInfo';
import TestMethodInfo from './TestMethodInfo';
import TestAnalytics from './TestAnalytics';
import DistributionBoardVerificationSection from './testing/DistributionBoardVerificationSection';
import SmartAutoFillPromptDialog from './SmartAutoFillPromptDialog';

import { BoardPhotoCapture } from './testing/BoardPhotoCapture';
import { SimpleCircuitTable } from './testing/SimpleCircuitTable';
import TestResultsPhotoCapture from './testing/TestResultsPhotoCapture';
import TestResultsReviewDialog from './testing/TestResultsReviewDialog';
import ScribbleToTableDialog from './mobile/ScribbleToTableDialog';
import BulkInfillDialog from './BulkInfillDialog';
import { useOrientation } from '@/hooks/useOrientation';
import { useInlineVoice } from '@/hooks/useInlineVoice';
import { twinAndEarthCpcFor, normaliseCableSize } from '@/utils/twinAndEarth';
import { getTableViewPreference, setTableViewPreference } from '@/utils/mobileTableUtils';
import { resolveDropdownValue } from '@/utils/voiceDropdownResolver';
import { resolveFieldName } from '@/utils/voiceFieldAliases';
import { calculatePointsServed } from '@/types/autoFillTypes';
import { getMaxZsFromDeviceDetails } from '@/utils/zsCalculations';
import { getDefaultBsStandard } from '@/types/protectiveDeviceTypes';

interface EICRScheduleOfTestsProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

const EICRScheduleOfTests = ({ formData, onUpdate }: EICRScheduleOfTestsProps) => {
  const voiceForm = useOptionalVoiceFormContext();
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [selectedCircuitIndex, setSelectedCircuitIndex] = useState(0);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showAutoFillPrompt, setShowAutoFillPrompt] = useState(false);
  const [newCircuitNumber, setNewCircuitNumber] = useState('');
  
  const [showBoardCapture, setShowBoardCapture] = useState(false);
  const [detectedCircuits, setDetectedCircuits] = useState<any>(null);
  const [showAIReview, setShowAIReview] = useState(false);
  const [showTestResultsScan, setShowTestResultsScan] = useState(false);
  const [extractedTestResults, setExtractedTestResults] = useState<any>(null);
  const [showTestResultsReview, setShowTestResultsReview] = useState(false);
  const [mobileViewType, setMobileViewType] = useState<'table' | 'card'>('card'); // Default to card view for mobile-first experience
  const [isBulkUpdating, setIsBulkUpdating] = useState(false);
  const [showSmartAutoFillDialog, setShowSmartAutoFillDialog] = useState(false);
  const [showRcdPresetsDialog, setShowRcdPresetsDialog] = useState(false);
  const [showScribbleDialog, setShowScribbleDialog] = useState(false);
  const [showBulkInfillDialog, setShowBulkInfillDialog] = useState(false);
  const [showQuickFillPanel, setShowQuickFillPanel] = useState(false);
  const [lastDeleted, setLastDeleted] = useState<{ circuit: TestResult; index: number } | null>(null);
  const orientation = useOrientation();

  // Voice tool call handler for ElevenLabs integration
  const handleVoiceToolCall = useCallback((toolName: string, params: Record<string, unknown>): string => {
    console.log('[Voice] Tool call:', toolName, params);

    if (toolName === 'fill_schedule_of_tests') {
      const action = params.action as string;

      switch (action) {
        case 'add_circuit': {
          const circuitType = params.circuit_type as string || params.description as string || '';
          const count = typeof params.count === 'number' ? params.count : 1;
          let addedCount = 0;

          for (let i = 0; i < count; i++) {
            const nextNum = (testResults.length + i + 1).toString();
            const newCircuit: TestResult = {
              id: crypto.randomUUID(),
              circuitDesignation: `C${nextNum}`,
              circuitNumber: nextNum,
              circuitDescription: circuitType,
              circuitType: circuitType,
              type: circuitType,
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
            };
            setTestResults(prev => [...prev, newCircuit]);
            addedCount++;
          }
          setSelectedCircuitIndex(testResults.length + addedCount - 1);
          toast.success(`Added ${addedCount} circuit${addedCount > 1 ? 's' : ''}${circuitType ? ` (${circuitType})` : ''}`);
          return `Added ${addedCount} ${circuitType || 'circuit'}${addedCount > 1 ? 's' : ''}`;
        }

        case 'update_field': {
          const circuitNum = params.circuit_number as number | undefined;
          const field = resolveFieldName(params.field as string) || params.field as string;
          const value = resolveDropdownValue(field, params.value as string);

          const targetIndex = circuitNum !== undefined
            ? testResults.findIndex(r => r.circuitNumber === String(circuitNum) || r.circuitDesignation === `C${circuitNum}`)
            : selectedCircuitIndex;

          if (targetIndex >= 0 && targetIndex < testResults.length) {
            setTestResults(prev => prev.map((circuit, idx) =>
              idx === targetIndex ? { ...circuit, [field]: value } : circuit
            ));
            toast.success(`Set ${field} to ${value} on circuit ${circuitNum || selectedCircuitIndex + 1}`);
            return `Set ${field} to ${value}`;
          }
          return 'Circuit not found';
        }

        case 'update_multiple_fields': {
          const circuitNum = params.circuit_number as number | undefined;
          const fields = params.fields as Record<string, string> | undefined;

          const targetIndex = circuitNum !== undefined
            ? testResults.findIndex(r => r.circuitNumber === String(circuitNum) || r.circuitDesignation === `C${circuitNum}`)
            : selectedCircuitIndex;

          if (targetIndex >= 0 && targetIndex < testResults.length && fields) {
            const resolvedFields: Partial<TestResult> = {};
            Object.entries(fields).forEach(([key, val]) => {
              const resolvedKey = resolveFieldName(key) || key;
              resolvedFields[resolvedKey as keyof TestResult] = resolveDropdownValue(resolvedKey, val);
            });

            setTestResults(prev => prev.map((circuit, idx) =>
              idx === targetIndex ? { ...circuit, ...resolvedFields } : circuit
            ));
            toast.success(`Updated ${Object.keys(fields).length} fields on circuit ${circuitNum || selectedCircuitIndex + 1}`);
            return `Updated ${Object.keys(fields).length} fields`;
          }
          return 'Circuit not found or no fields provided';
        }

        case 'next_circuit': {
          if (selectedCircuitIndex < testResults.length - 1) {
            setSelectedCircuitIndex(prev => prev + 1);
            toast.info(`Now on circuit C${testResults[selectedCircuitIndex + 1]?.circuitNumber || selectedCircuitIndex + 2}`);
            return `Moved to circuit ${selectedCircuitIndex + 2}`;
          }
          return 'Already on the last circuit';
        }

        case 'previous_circuit': {
          if (selectedCircuitIndex > 0) {
            setSelectedCircuitIndex(prev => prev - 1);
            toast.info(`Now on circuit C${testResults[selectedCircuitIndex - 1]?.circuitNumber || selectedCircuitIndex}`);
            return `Moved to circuit ${selectedCircuitIndex}`;
          }
          return 'Already on the first circuit';
        }

        case 'select_circuit': {
          const num = params.circuit_number as number;
          const idx = testResults.findIndex(r => r.circuitNumber === String(num) || r.circuitDesignation === `C${num}`);
          if (idx >= 0) {
            setSelectedCircuitIndex(idx);
            toast.info(`Selected circuit C${num}`);
            return `Selected circuit ${num}`;
          }
          return `Circuit ${num} not found`;
        }

        case 'delete_circuit': {
          const num = params.circuit_number as number | undefined;
          const targetIdx = num !== undefined
            ? testResults.findIndex(r => r.circuitNumber === String(num) || r.circuitDesignation === `C${num}`)
            : selectedCircuitIndex;

          if (targetIdx >= 0 && targetIdx < testResults.length) {
            const removed = testResults[targetIdx];
            setTestResults(prev => prev.filter((_, i) => i !== targetIdx));
            if (selectedCircuitIndex >= testResults.length - 1 && selectedCircuitIndex > 0) {
              setSelectedCircuitIndex(prev => prev - 1);
            }
            toast.success(`Removed circuit ${removed?.circuitDesignation}`);
            return `Deleted circuit ${removed?.circuitDesignation}`;
          }
          return 'Circuit not found';
        }

        case 'get_status': {
          const summary = testResults.map((c, i) => {
            const missing: string[] = [];
            if (!c.zs) missing.push('Zs');
            if (!c.r1r2) missing.push('R1+R2');
            if (!c.insulationLiveEarth) missing.push('IR L-E');
            if (!c.polarity) missing.push('polarity');
            return `C${i + 1}: ${missing.length === 0 ? 'Complete' : `Missing ${missing.length} fields`}`;
          });
          const complete = testResults.filter(c => c.zs && c.r1r2 && c.insulationLiveEarth && c.polarity).length;
          return `${testResults.length} circuits total, ${complete} complete. ${summary.join('. ')}`;
        }

        default:
          return 'Unknown action';
      }
    }

    if (toolName === 'bulk_fill_circuits') {
      const field = resolveFieldName(params.field as string) || params.field as string;
      const value = resolveDropdownValue(field, params.value as string);
      const onlyEmpty = params.only_empty as boolean;
      const board = params.board as string | undefined;

      let count = 0;
      setTestResults(prev => prev.map(circuit => {
        // Board filter
        if (board) {
          const isOnBoard = circuit.protectiveDeviceLocation?.toLowerCase().includes(board.toLowerCase()) ||
                            circuit.notes?.toLowerCase().includes(board.toLowerCase());
          if (!isOnBoard) return circuit;
        }
        // Only empty filter
        if (onlyEmpty && circuit[field as keyof TestResult]) return circuit;

        count++;
        return { ...circuit, [field]: value };
      }));

      toast.success(`Set ${field} to ${value} on ${count} circuits`);
      return `Set ${field} to ${value} on ${count} circuits`;
    }

    return 'Unknown tool';
  }, [testResults, selectedCircuitIndex]);

  const { isConnecting: voiceConnecting, isActive: voiceActive, toggleVoice } = useInlineVoice({
    onToolCall: handleVoiceToolCall,
  });
  const saveTimeoutRef = useRef<NodeJS.Timeout>();
  const lastSavedHashRef = useRef('');
  const computeResultsHash = (results: TestResult[]) =>
    results
      .map((r) => `${r.id}:${r.circuitDesignation}:${r.zs}:${r.maxZs}:${r.protectiveDeviceRating}`)
      .join('|');
  
  
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
  
  const toggleMobileView = () => {
    const newView = mobileViewType === 'table' ? 'card' : 'table';
    setMobileViewType(newView);
    setTableViewPreference(newView);
  };
  
  // Helper functions for intelligent defaults based on BS 7671
  const getDefaultReferenceMethod = (circuitType: string, cableSize: string): string => {
    if (!circuitType) return '';
    const type = circuitType.toLowerCase();
    if (type.includes('lighting')) return 'C';
    if (type.includes('socket') || type.includes('ring')) return 'C';
    if (type.includes('cooker') || type.includes('shower')) return 'B';
    if (type.includes('immersion')) return 'C';
    return 'C'; // Default reference method
  };

  // NOTE: We no longer use getDefaultCpcSize - replaced by twinAndEarthCpcFor utility

  // Initialize test results from form data
  useEffect(() => {
    if (formData.scheduleOfTests && formData.scheduleOfTests.length > 0) {
      setTestResults(formData.scheduleOfTests);
    } else {
      // Initial result with basic defaults
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
        rcdRatingA: ''
      };
      setTestResults([initialResult]);
      // Write initial result to formData so voice updates can apply immediately
      onUpdate('scheduleOfTests', [initialResult]);
    }
  }, []);

  // Load initial data from formData on mount only (like EIC pattern)
  useEffect(() => {
    if (Array.isArray(formData.scheduleOfTests) && formData.scheduleOfTests.length > 0) {
      const incoming = formData.scheduleOfTests as TestResult[];
      setTestResults(incoming);
    }
  }, []);

  // Voice form fields for circuit testing
  const voiceFields: FormField[] = useMemo(() => [
    { name: 'circuit_number', aliases: ['circuit', 'number', 'circuit num'] },
    { name: 'circuit_description', aliases: ['description', 'desc', 'circuit desc'] },
    { name: 'circuit_type', aliases: ['type', 'circuit type'] },
    { name: 'protective_device_rating', aliases: ['rating', 'breaker rating', 'mcb rating', 'device rating'] },
    { name: 'protective_device_type', aliases: ['device type', 'breaker type', 'mcb type'] },
    { name: 'cable_size', aliases: ['cable', 'live size', 'conductor size'] },
    { name: 'cpc_size', aliases: ['cpc', 'earth size', 'earth conductor'] },
    { name: 'reference_method', aliases: ['ref method', 'installation method'] },
    { name: 'zs', aliases: ['earth fault loop', 'impedance', 'loop impedance', 'zed s'] },
    { name: 'max_zs', aliases: ['max impedance', 'maximum zs', 'max zed s'] },
    { name: 'r1r2', aliases: ['r1 plus r2', 'continuity', 'r1 r2'] },
    { name: 'r2', aliases: ['earth continuity', 'r 2'] },
    { name: 'insulation_resistance', aliases: ['ir', 'insulation', 'meg'] },
    { name: 'polarity', aliases: ['pol'] },
    { name: 'rcd_type', aliases: ['rcd', 'residual current device type'] },
    { name: 'rcd_rating', aliases: ['rcd ma', 'rcd milliamps', 'trip rating'] },
    { name: 'rcd_trip_time', aliases: ['trip time', 'rcd time', 'disconnect time'] },
    { name: 'points_served', aliases: ['points', 'outlets'] },
    { name: 'notes', aliases: ['note', 'comment', 'remarks'] },
  ], []);

  // Handle voice field fill
  const handleVoiceFillField = useCallback((fieldName: string, value: string) => {
    if (testResults.length === 0) {
      toast.error('No circuits to update. Add a circuit first.');
      return;
    }

    const currentCircuit = testResults[selectedCircuitIndex];
    if (!currentCircuit) {
      toast.error('No circuit selected');
      return;
    }

    // Map voice field names to TestResult fields
    const fieldMapping: Record<string, keyof TestResult> = {
      'circuit_number': 'circuitNumber',
      'circuit_description': 'circuitDescription',
      'circuit_type': 'circuitType',
      'protective_device_rating': 'protectiveDeviceRating',
      'protective_device_type': 'protectiveDeviceType',
      'cable_size': 'liveSize',
      'cpc_size': 'cpcSize',
      'reference_method': 'referenceMethod',
      'zs': 'zs',
      'max_zs': 'maxZs',
      'r1r2': 'r1r2',
      'r2': 'r2',
      'insulation_resistance': 'insulationResistance',
      'polarity': 'polarity',
      'rcd_type': 'rcdType',
      'rcd_rating': 'rcdRating',
      'rcd_trip_time': 'rcdOneX',
      'points_served': 'pointsServed',
      'notes': 'notes',
    };

    const resultField = fieldMapping[fieldName];
    if (resultField) {
      setTestResults(prev => {
        const updated = [...prev];
        updated[selectedCircuitIndex] = {
          ...updated[selectedCircuitIndex],
          [resultField]: value,
        };
        return updated;
      });
      toast.success(`Set ${fieldName.replace(/_/g, ' ')} to "${value}"`);
    }
  }, [testResults, selectedCircuitIndex]);

  // Handle voice actions
  const handleVoiceAction = useCallback((action: string, params: Record<string, unknown>) => {
    switch (action) {
      case 'add_circuit': {
        const circuitType = params.type as string || '';
        const nextNum = (testResults.length + 1).toString();
        const newCircuit: TestResult = {
          id: crypto.randomUUID(),
          circuitDesignation: `C${nextNum}`,
          circuitNumber: nextNum,
          circuitDescription: circuitType,
          circuitType: circuitType,
          type: circuitType,
          referenceMethod: '',
          liveSize: '',
          cpcSize: '',
          protectiveDeviceType: '',
          protectiveDeviceRating: params.rating as string || '',
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
        };
        setTestResults(prev => [...prev, newCircuit]);
        setSelectedCircuitIndex(testResults.length);
        toast.success(`Added circuit C${nextNum}${circuitType ? ` (${circuitType})` : ''}`);
        return true;
      }
      case 'next_circuit': {
        if (selectedCircuitIndex < testResults.length - 1) {
          setSelectedCircuitIndex(prev => prev + 1);
          toast.info(`Now on circuit C${testResults[selectedCircuitIndex + 1]?.circuitNumber || selectedCircuitIndex + 2}`);
        } else {
          toast.info('Already on the last circuit');
        }
        return true;
      }
      case 'previous_circuit': {
        if (selectedCircuitIndex > 0) {
          setSelectedCircuitIndex(prev => prev - 1);
          toast.info(`Now on circuit C${testResults[selectedCircuitIndex - 1]?.circuitNumber || selectedCircuitIndex}`);
        } else {
          toast.info('Already on the first circuit');
        }
        return true;
      }
      case 'select_circuit': {
        const num = parseInt(params.number as string, 10);
        const idx = testResults.findIndex(r => r.circuitNumber === String(num) || r.circuitDesignation === `C${num}`);
        if (idx >= 0) {
          setSelectedCircuitIndex(idx);
          toast.info(`Selected circuit C${num}`);
        } else {
          toast.error(`Circuit ${num} not found`);
        }
        return true;
      }
      case 'remove_circuit': {
        if (testResults.length > 0) {
          const removed = testResults[selectedCircuitIndex];
          setTestResults(prev => prev.filter((_, i) => i !== selectedCircuitIndex));
          if (selectedCircuitIndex >= testResults.length - 1 && selectedCircuitIndex > 0) {
            setSelectedCircuitIndex(prev => prev - 1);
          }
          toast.success(`Removed circuit ${removed?.circuitDesignation || selectedCircuitIndex + 1}`);
        }
        return true;
      }
      case 'set_polarity_ok': {
        if (testResults.length > 0) {
          setTestResults(prev => {
            const updated = [...prev];
            updated[selectedCircuitIndex] = { ...updated[selectedCircuitIndex], polarity: '✓' };
            return updated;
          });
          toast.success('Polarity marked as OK');
        }
        return true;
      }
      case 'set_test_result': {
        const fieldName = params.field as keyof TestResult;
        const value = params.value as string;
        const circuitNum = params.circuit_number as number | undefined;

        // Determine which circuit to update
        const targetIndex = circuitNum !== undefined
          ? testResults.findIndex(r => r.circuitNumber === String(circuitNum) || r.circuitDesignation === `C${circuitNum}`)
          : selectedCircuitIndex;

        if (targetIndex >= 0 && targetIndex < testResults.length) {
          setTestResults(prev => {
            const updated = [...prev];
            updated[targetIndex] = { ...updated[targetIndex], [fieldName]: value };
            return updated;
          });
          toast.success(`Set ${fieldName} to ${value}`);
          return true;
        } else {
          toast.error(`Circuit not found`);
          return false;
        }
      }

      // BULK CIRCUIT TOOLS
      case 'update_all_circuits':
      case 'set_field_all_circuits': {
        const field = params.field as string;
        const value = params.value as string;
        if (!field || value === undefined) {
          toast.error('Missing field or value');
          return false;
        }
        const resolvedField = resolveFieldName(field) as keyof TestResult;
        const resolvedValue = resolveDropdownValue(resolvedField, value);
        setTestResults(prev => prev.map(circuit => ({
          ...circuit,
          [resolvedField]: resolvedValue
        })));
        toast.success(`Set ${field} to ${value} for all ${testResults.length} circuits`);
        return true;
      }

      case 'set_circuit_field': {
        const circuitNumber = params.circuit_number as number;
        const field = params.field as string;
        const value = params.value as string;
        if (!circuitNumber || !field || value === undefined) {
          toast.error('Missing circuit number, field, or value');
          return false;
        }
        const resolvedField = resolveFieldName(field) as keyof TestResult;
        const resolvedValue = resolveDropdownValue(resolvedField, value);
        const targetIdx = testResults.findIndex(r =>
          r.circuitNumber === String(circuitNumber) || r.circuitDesignation === `C${circuitNumber}`
        );
        if (targetIdx >= 0) {
          setTestResults(prev => prev.map((circuit, idx) =>
            idx === targetIdx ? { ...circuit, [resolvedField]: resolvedValue } : circuit
          ));
          toast.success(`Set circuit ${circuitNumber} ${field} to ${value}`);
          return true;
        } else {
          toast.error(`Circuit ${circuitNumber} not found`);
          return false;
        }
      }

      case 'set_multiple_fields': {
        const circuitNumber = params.circuit_number as number | undefined;
        const targetIdx = circuitNumber
          ? testResults.findIndex(r => r.circuitNumber === String(circuitNumber) || r.circuitDesignation === `C${circuitNumber}`)
          : selectedCircuitIndex;
        if (targetIdx < 0 || targetIdx >= testResults.length) {
          toast.error(circuitNumber ? `Circuit ${circuitNumber} not found` : 'No circuit selected');
          return false;
        }
        const fieldsToUpdate: Partial<TestResult> = {};
        let fieldCount = 0;
        const possibleFields = ['zs', 'r1r2', 'polarity', 'insulationTestVoltage', 'insulationLiveEarth', 'insulationLiveNeutral', 'rcdOneX', 'pfc'];
        possibleFields.forEach(f => {
          if (params[f] !== undefined && params[f] !== null) {
            const resolvedField = resolveFieldName(f) as keyof TestResult;
            const resolvedValue = resolveDropdownValue(resolvedField, params[f] as string);
            fieldsToUpdate[resolvedField] = resolvedValue;
            fieldCount++;
          }
        });
        if (fieldCount === 0) {
          toast.error('No valid fields provided');
          return false;
        }
        setTestResults(prev => prev.map((circuit, idx) =>
          idx === targetIdx ? { ...circuit, ...fieldsToUpdate } : circuit
        ));
        toast.success(`Updated ${fieldCount} fields on circuit ${targetIdx + 1}`);
        return true;
      }

      case 'get_circuits_status': {
        const summary = testResults.map((c, i) => {
          const missing: string[] = [];
          if (!c.zs) missing.push('Zs');
          if (!c.r1r2) missing.push('R1+R2');
          if (!c.insulationTestVoltage) missing.push('IR voltage');
          if (!c.insulationLiveEarth) missing.push('IR L-E');
          if (!c.insulationLiveNeutral) missing.push('IR L-N');
          if (!c.polarity) missing.push('polarity');
          if (!c.rcdOneX && c.rcdType) missing.push('RCD time');
          return `C${i + 1}: ${missing.length === 0 ? 'Complete' : `Missing: ${missing.join(', ')}`}`;
        });
        return summary.join('\n');
      }

      // SUB-BOARD TOOLS
      case 'select_board': {
        const board = params.board as string;
        toast.info(`Selected board: ${board}`);
        return true;
      }

      case 'add_circuit_to_board': {
        const board = params.board as string;
        const circuitType = params.type as string || '';
        const rating = params.rating as string || '';
        const description = params.description as string || circuitType;
        const nextNum = (testResults.length + 1).toString();
        const newCircuit: TestResult = {
          id: crypto.randomUUID(),
          circuitDesignation: `C${nextNum}`,
          circuitNumber: nextNum,
          circuitDescription: description,
          circuitType: circuitType,
          type: circuitType,
          referenceMethod: '',
          liveSize: '',
          cpcSize: '',
          protectiveDeviceType: '',
          protectiveDeviceRating: rating,
          protectiveDeviceKaRating: '',
          protectiveDeviceLocation: board || 'Consumer Unit',
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
          notes: board ? `Board: ${board}` : '',
          typeOfWiring: '',
          rcdBsStandard: '',
          rcdType: '',
          rcdRatingA: '',
        };
        setTestResults(prev => [...prev, newCircuit]);
        setSelectedCircuitIndex(testResults.length);
        toast.success(`Added circuit C${nextNum} to ${board || 'main board'}`);
        return true;
      }

      case 'set_board_field_all_circuits': {
        const board = params.board as string;
        const field = params.field as string;
        const value = params.value as string;
        if (!field || value === undefined) {
          toast.error('Missing field or value');
          return false;
        }
        const resolvedField = resolveFieldName(field) as keyof TestResult;
        const resolvedValue = resolveDropdownValue(resolvedField, value);
        // Filter circuits by board (using protectiveDeviceLocation or notes containing board name)
        let count = 0;
        setTestResults(prev => prev.map(circuit => {
          const isOnBoard = board
            ? (circuit.protectiveDeviceLocation?.toLowerCase().includes(board.toLowerCase()) ||
               circuit.notes?.toLowerCase().includes(board.toLowerCase()))
            : true;
          if (isOnBoard) {
            count++;
            return { ...circuit, [resolvedField]: resolvedValue };
          }
          return circuit;
        }));
        toast.success(`Set ${field} to ${value} for ${count} circuits on ${board || 'all boards'}`);
        return true;
      }

      case 'get_board_status': {
        const board = params.board as string | undefined;
        const filteredCircuits = board
          ? testResults.filter(c =>
              c.protectiveDeviceLocation?.toLowerCase().includes(board.toLowerCase()) ||
              c.notes?.toLowerCase().includes(board.toLowerCase())
            )
          : testResults;
        if (filteredCircuits.length === 0) {
          return board ? `No circuits found on board: ${board}` : 'No circuits in schedule';
        }
        const summary = filteredCircuits.map((c, i) => {
          const missing: string[] = [];
          if (!c.zs) missing.push('Zs');
          if (!c.r1r2) missing.push('R1+R2');
          if (!c.insulationTestVoltage) missing.push('IR voltage');
          if (!c.polarity) missing.push('polarity');
          return `${c.circuitDesignation}: ${missing.length === 0 ? 'Complete' : `Missing: ${missing.join(', ')}`}`;
        });
        return `${board || 'All boards'} (${filteredCircuits.length} circuits):\n${summary.join('\n')}`;
      }

      case 'scan_board': {
        const board = params.board as string;
        toast.info(`Opening board scanner for: ${board || 'main board'}`);
        setShowBoardCapture(true);
        return true;
      }

      default:
        return false;
    }
  }, [testResults, selectedCircuitIndex]);

  // Register with voice form context
  useEffect(() => {
    if (!voiceForm) return;

    voiceForm.registerForm({
      formId: 'eicr-schedule-of-tests',
      formName: 'EICR Schedule of Tests',
      fields: voiceFields,
      actions: [
        'add_circuit', 'next_circuit', 'previous_circuit', 'select_circuit', 'remove_circuit', 'set_polarity_ok', 'set_test_result',
        // Bulk circuit tools (update_all_circuits is the ElevenLabs action name)
        'update_all_circuits', 'set_field_all_circuits', 'set_circuit_field', 'set_multiple_fields', 'get_circuits_status',
        // Sub-board tools
        'select_board', 'add_circuit_to_board', 'set_board_field_all_circuits', 'get_board_status', 'scan_board'
      ],
      onFillField: handleVoiceFillField,
      onAction: handleVoiceAction,
      onSubmit: () => {
        toast.success('Schedule of Tests saved');
        return true;
      },
      onClear: () => {
        setTestResults([]);
        setSelectedCircuitIndex(0);
        return true;
      },
    });

    return () => {
      voiceForm.unregisterForm('eicr-schedule-of-tests');
    };
  }, [voiceForm, voiceFields, handleVoiceFillField, handleVoiceAction]);

  const addTestResult = () => {
    const nextCircuitNumber = (testResults.length + 1).toString();
    setNewCircuitNumber(nextCircuitNumber);
    setShowAutoFillPrompt(true);
  };

  const handleCreateCircuit = (useAutoFill: boolean = false, circuitType?: string, suggestions?: Partial<TestResult>) => {
    const baseResult: TestResult = {
      id: crypto.randomUUID(),
      circuitDesignation: `C${newCircuitNumber}`,
      circuitNumber: newCircuitNumber,
      circuitDescription: circuitType || '',
      circuitType: circuitType || '',
      type: circuitType || '',
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
      rcdRatingA: ''
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
    
    // If user chose to use auto-fill, we'll scroll to the auto-fill section
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


  // Auto-save after user stops typing (1 second debounce) with save loop guard
  useEffect(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    saveTimeoutRef.current = setTimeout(() => {
      const nextHash = computeResultsHash(testResults);
      if (nextHash === lastSavedHashRef.current) return;
      onUpdate('scheduleOfTests', testResults);
      lastSavedHashRef.current = nextHash;
    }, 1000);
    
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [testResults, onUpdate]);

  // Save immediately when component unmounts
  useEffect(() => {
    return () => {
      onUpdate('scheduleOfTests', testResults);
    };
  }, [testResults, onUpdate]);

  const removeAllTestResults = () => {
    if (window.confirm('Are you sure you want to remove all test results? This action cannot be undone.')) {
      setTestResults([]);
      onUpdate('scheduleOfTests', []);
    }
  };

  const updateTestResult = useCallback((id: string, field: keyof TestResult, value: string) => {
    setTestResults(prev => {
      const updatedResults = prev.map(result => {
        if (result.id === id) {
          const updatedResult = { ...result, [field]: value };
          
          // Clear autoFilled flag when user manually edits
          if (result.autoFilled && field !== 'autoFilled') {
            updatedResult.autoFilled = false;
          }
          
          // Basic auto-update logic for circuit designation
          if (field === 'circuitNumber' && value) {
            updatedResult.circuitDesignation = `C${value}`;
          }
          
          // Maintain legacy field synchronisation for backward compatibility
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
      return updatedResults;
    });
  }, []);

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

  // Enhanced bulk update handler for desktop auto-fill
  const handleBulkUpdate = useCallback((id: string, updates: Partial<TestResult>) => {
    setTestResults(prev => {
      const updatedResults = prev.map(result => {
        if (result.id === id) {
          const updatedResult = { ...result, ...updates };
          
          // Apply the same auto-update logic as in updateTestResult
          if (updates.circuitNumber) {
            updatedResult.circuitDesignation = `C${updates.circuitNumber}`;
          }
          
          // Maintain legacy field synchronisation for backward compatibility
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
    setIsBulkUpdating(true);
    setTestResults(prev => {
      const updatedResults = prev.map(result => ({
        ...result,
        [field]: value,
        // Clear autoFilled flag when user makes bulk changes
        autoFilled: result.autoFilled ? false : result.autoFilled
      }));
      onUpdate('scheduleOfTests', updatedResults);
      return updatedResults;
    });
    setTimeout(() => setIsBulkUpdating(false), 100);
  };

  // Quick Fill RCD handlers
  const handleFillAllRcdBsStandard = (value: string) => {
    setIsBulkUpdating(true);
    const updatedResults = testResults.map(result => ({
      ...result,
      rcdBsStandard: value
    }));
    setTestResults(updatedResults);
    onUpdate('scheduleOfTests', updatedResults);
    setTimeout(() => setIsBulkUpdating(false), 100);
    toast.success(`Applied RCD BS Standard "${value}" to all circuits`);
  };

  const handleFillAllRcdType = (value: string) => {
    setIsBulkUpdating(true);
    const updatedResults = testResults.map(result => ({
      ...result,
      rcdType: value
    }));
    setTestResults(updatedResults);
    onUpdate('scheduleOfTests', updatedResults);
    setTimeout(() => setIsBulkUpdating(false), 100);
    toast.success(`Applied RCD Type "${value}" to all circuits`);
  };

  const handleFillAllRcdRating = (value: string) => {
    setIsBulkUpdating(true);
    const updatedResults = testResults.map(result => ({
      ...result,
      rcdRating: value
    }));
    setTestResults(updatedResults);
    onUpdate('scheduleOfTests', updatedResults);
    setTimeout(() => setIsBulkUpdating(false), 100);
    toast.success(`Applied RCD IΔn "${value}" to all circuits`);
  };

  const handleFillAllRcdRatingA = (value: string) => {
    setIsBulkUpdating(true);
    const updatedResults = testResults.map(result => ({
      ...result,
      rcdRatingA: value
    }));
    setTestResults(updatedResults);
    onUpdate('scheduleOfTests', updatedResults);
    setTimeout(() => setIsBulkUpdating(false), 100);
    toast.success(`Applied RCD Rating "${value}A" to all circuits`);
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

  // AI Photo Analysis Handlers
  const handleAIAnalysisComplete = (data: any) => {
    setDetectedCircuits(data);
    setShowBoardCapture(false);
    setShowAIReview(true);
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
      // Use the circuit_reference from AI if available, otherwise generate one
      const circuitRef = circuit.circuit_reference || `C${testResults.length + index + 1}`;

      // Derive combined BS Standard (e.g., "MCB (BS EN 60898)")
      const incomingType: string = circuit.protective_device?.type || '';
      const upper = incomingType.toUpperCase();
      const baseType = upper.includes('RCBO') ? 'RCBO' : upper.includes('RCD') ? 'RCD' : upper.includes('MCB') ? 'MCB' : upper.includes('FUSE') ? 'Fuse' : incomingType;
      const incomingBs: string = circuit.protective_device?.bs_standard || '';
      const bsFromType = getDefaultBsStandard(baseType || 'MCB');
      const finalBs = incomingBs && incomingBs.includes('(') ? incomingBs : (bsFromType || incomingBs);

      return {
        id: nextId,
        circuitNumber: circuitRef,
        circuitDesignation: circuitRef,
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
        rcdBsStandard: circuit.protective_device?.rcd_details?.bs_standard || '',
        rcdType: circuit.protective_device?.rcd_details?.rcd_type || '',
        rcdRatingA: circuit.protective_device?.rcd_details?.rating_a || '',
        cableSize: circuit.conductor_sizes?.live || '',
        protectiveDevice: circuit.protective_device?.rating || '',
        r1r2: circuit.tests?.r1_r2?.value || '',
        r2: '',
        ringContinuityLive: circuit.tests?.ring_continuity_live?.value || '',
        ringContinuityNeutral: circuit.tests?.ring_continuity_neutral?.value || '',
        ringR1: circuit.tests?.ring_r1_live?.value || '',
        ringRn: circuit.tests?.ring_rn_neutral?.value || '',
        ringR2: circuit.tests?.ring_r2_cpc?.value || '',
        insulationTestVoltage: circuit.tests?.insulation_resistance?.test_voltage || '500',
        insulationResistance: circuit.tests?.insulation_resistance?.value || '',
        insulationLiveNeutral: circuit.tests?.insulation_live_neutral?.value || '',
        insulationLiveEarth: circuit.tests?.insulation_live_earth?.value || '',
        insulationNeutralEarth: circuit.tests?.insulation_neutral_earth?.value || '',
        polarity: circuit.tests?.polarity?.result || '',
        zs: circuit.tests?.zs?.value || '',
        maxZs: circuit.tests?.zs?.max_zs || '',
        pointsServed: circuit.points_served || '',
        rcdRating: circuit.tests?.rcd_rating || '',
        rcdOneX: circuit.tests?.rcd_trip_time?.value || '',
        rcdTestButton: circuit.tests?.rcd_test_button || '',
        afddTest: circuit.tests?.afdd_test || '',
        pfc: circuit.tests?.pfc?.value || '',
        pfcLiveNeutral: circuit.tests?.pfc_live_neutral?.value || '',
        pfcLiveEarth: circuit.tests?.pfc_live_earth?.value || '',
        functionalTesting: circuit.tests?.functional_testing || '',
        notes: `AI detected from test results (${circuit.confidence} confidence) - Please verify. ${circuit.notes || ''}`.trim(),
        autoFilled: true
      };
    });

    // Add to existing test results
    const updatedResults = [...testResults, ...transformedResults];
    setTestResults(updatedResults);
    onUpdate('scheduleOfTests', updatedResults);
    setShowTestResultsReview(false);
    setExtractedTestResults(null);
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
      protectiveDeviceCurve: circuit.protectiveDeviceCurve || circuit.curve || '',
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

  // Convert Circuit[] format from SimpleCircuitTable to TestResult format
  const convertCircuitsToTestResults = (circuits: any[]): any[] => {
    return circuits.map(circuit => {
      // Use helper function to get correct full BS standard format
      const bsStandard = getDefaultBsStandard(circuit.device || 'MCB');

      return {
        circuitDescription: circuit.label || '',
        protectiveDeviceType: circuit.device || 'MCB',
        protectiveDeviceCurve: circuit.curve || '',
        protectiveDeviceRating: circuit.rating?.toString() || '',
        bsStandard: bsStandard,
        circuitType: circuit.label?.toLowerCase().includes('socket') ? 'Sockets' : 
                     circuit.label?.toLowerCase().includes('light') ? 'Lighting' : '',
        liveSize: circuit.liveConductorSize || (circuit.rating && circuit.rating <= 10 ? '1.5' :
                  circuit.rating && circuit.rating <= 20 ? '2.5' :
                  circuit.rating && circuit.rating <= 32 ? '4.0' : '2.5'),
        cpcSize: circuit.cpcSize || '',
        referenceMethod: 'C',
        protectiveDeviceKaRating: circuit.kaRating || '6kA',
        confidence: circuit.confidence,
      };
    });
  };

  const handleApplyAICircuitsFromTable = (circuits: any[]) => {
    const converted = convertCircuitsToTestResults(circuits);
    handleApplyAICircuits(converted);
  };

  const handleApplyAICircuits = (selectedCircuits: any[]) => {
    // Find blank rows to fill first
    const blankIndices: number[] = [];
    testResults.forEach((result, idx) => {
      if (isBlankRow(result)) {
        blankIndices.push(idx);
      }
    });

    const updatedResults = [...testResults];
    const remainingCircuits: any[] = [];

    selectedCircuits.forEach((circuit, circuitIdx) => {
      const normalisedCircuit = normaliseAICircuit(circuit);
      
      // If we have a blank slot, fill it
      if (blankIndices.length > 0) {
        const blankIdx = blankIndices.shift()!;
        const existingResult = updatedResults[blankIdx];
        const circuitNumber = existingResult.circuitNumber;
        
        const liveSize = normalisedCircuit.liveSize;
        const circuitType = normalisedCircuit.circuitType || '';
        const circuitDesc = normalisedCircuit.circuitDescription || '';
        
        // Circuit type detection
        const isRingCircuit = circuitType.toLowerCase().includes('ring');
        const isLightingCircuit = circuitType.toLowerCase().includes('lighting') || 
                                   circuitDesc.toLowerCase().includes('light');
        const isSocketCircuit = circuitType.toLowerCase().includes('socket');
        const isBathroomCircuit = circuitDesc.toLowerCase().includes('bathroom');
        const isOutdoorCircuit = circuitDesc.toLowerCase().includes('outdoor') || 
                                  circuitDesc.toLowerCase().includes('garden');
        
        const isRCBOOrRCD = normalisedCircuit.protectiveDeviceType.toUpperCase().includes('RCD') || 
                            normalisedCircuit.protectiveDeviceType.toUpperCase().includes('RCBO');
        const requiresRCD = isSocketCircuit || isBathroomCircuit || isOutdoorCircuit || isRCBOOrRCD;
        
        updatedResults[blankIdx] = {
          ...existingResult,
          circuitDescription: circuitDesc,
          circuitType: circuitType,
          type: circuitType,
          referenceMethod: normalisedCircuit.referenceMethod,
          liveSize: liveSize,
          cpcSize: normalisedCircuit.cpcSize, // Already corrected by normaliseAICircuit
          protectiveDeviceType: normalisedCircuit.protectiveDeviceType,
          protectiveDeviceCurve: normalisedCircuit.protectiveDeviceCurve || '',
          protectiveDeviceRating: normalisedCircuit.protectiveDeviceRating,
          protectiveDeviceKaRating: normalisedCircuit.protectiveDeviceKaRating,
          protectiveDeviceLocation: 'Consumer Unit',
          bsStandard: normalisedCircuit.bsStandard,
          cableSize: liveSize,
          protectiveDevice: `${normalisedCircuit.protectiveDeviceType} ${normalisedCircuit.protectiveDeviceRating}`.trim(),
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
          notes: `AI detected (${circuit.confidence || 'unknown'} confidence) - Please verify all values`,
          autoFilled: true
        };
      } else {
        // No blank slots, add to remaining
        remainingCircuits.push(normalisedCircuit);
      }
    });

    // Append remaining circuits that didn't fit in blank slots
    remainingCircuits.forEach((circuit, index) => {
      const circuitNumber = (updatedResults.length + 1).toString();
      const liveSize = circuit.liveSize;
      const circuitType = circuit.circuitType || '';
      const circuitDesc = circuit.circuitDescription || '';
      
      const isRingCircuit = circuitType.toLowerCase().includes('ring');
      const isLightingCircuit = circuitType.toLowerCase().includes('lighting') || 
                                 circuitDesc.toLowerCase().includes('light');
      const isSocketCircuit = circuitType.toLowerCase().includes('socket');
      const isBathroomCircuit = circuitDesc.toLowerCase().includes('bathroom');
      const isOutdoorCircuit = circuitDesc.toLowerCase().includes('outdoor') || 
                                circuitDesc.toLowerCase().includes('garden');
      
      const isRCBOOrRCD = circuit.protectiveDeviceType.toUpperCase().includes('RCD') || 
                          circuit.protectiveDeviceType.toUpperCase().includes('RCBO');
      const requiresRCD = isSocketCircuit || isBathroomCircuit || isOutdoorCircuit || isRCBOOrRCD;
      
      const newResult: TestResult = {
        id: crypto.randomUUID(),
        circuitNumber: circuitNumber,
        circuitDesignation: `C${circuitNumber}`,
        circuitDescription: circuitDesc,
        circuitType: circuitType,
        type: circuitType,
        referenceMethod: circuit.referenceMethod,
        liveSize: liveSize,
        cpcSize: circuit.cpcSize, // Already corrected by normaliseAICircuit
        protectiveDeviceType: circuit.protectiveDeviceType,
        protectiveDeviceCurve: circuit.protectiveDeviceCurve || '',
        protectiveDeviceRating: circuit.protectiveDeviceRating,
        protectiveDeviceKaRating: circuit.protectiveDeviceKaRating,
        protectiveDeviceLocation: 'Consumer Unit',
        bsStandard: circuit.bsStandard,
        cableSize: liveSize,
        protectiveDevice: `${circuit.protectiveDeviceType} ${circuit.protectiveDeviceRating}`.trim(),
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
        notes: `AI detected (${circuit.confidence || 'unknown'} confidence) - Please verify all values`,
        autoFilled: true,
        typeOfWiring: '',
        rcdBsStandard: '',
        rcdType: '',
        rcdRatingA: ''
      };
      updatedResults.push(newResult);
    });

    setTestResults(updatedResults);
    onUpdate('scheduleOfTests', updatedResults);
    setShowAIReview(false);
    setDetectedCircuits([]);
  };

  return (
    <div className="pb-20 lg:pb-4">
      {/* MOBILE FULL-WIDTH LAYOUT */}
      {useMobileView ? (
        <div className="w-full">
          {/* Title Section */}
          <div className="px-4 py-3 border-b border-border/50 bg-background">
            <h2 className="text-xl font-bold text-foreground">Schedule of Tests</h2>
            <span className="text-sm text-muted-foreground">{testResults.length} {testResults.length === 1 ? 'circuit' : 'circuits'}</span>
          </div>

          {/* Sticky Toolbar */}
          <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm px-3 py-2 flex items-center gap-2 justify-end">
            <div className="flex items-center gap-2">
              {/* Primary Add Button */}
              <Button
                variant="outline"
                size="sm"
                className="h-9 px-3 shrink-0 hover:bg-primary/10 hover:border-primary/30 transition-all duration-200"
                onClick={addTestResult}
              >
                <Plus className="h-4 w-4 mr-1 text-primary" />
                <span className="text-sm font-medium">Add</span>
              </Button>

              {/* View Toggle - Prominent on mobile */}
              <Button
                variant={mobileViewType === 'card' ? 'default' : 'outline'}
                size="sm"
                className={`h-9 px-3 shrink-0 transition-all duration-200 touch-manipulation ${
                  mobileViewType === 'card'
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-primary/10 hover:border-primary/30'
                }`}
                onClick={() => {
                  const newView = mobileViewType === 'table' ? 'card' : 'table';
                  setMobileViewType(newView);
                  setTableViewPreference(newView);
                }}
                title={mobileViewType === 'card' ? 'Switch to Table View' : 'Switch to Card View'}
              >
                {mobileViewType === 'card' ? (
                  <><LayoutGrid className="h-4 w-4 mr-1" /><span className="text-sm font-medium">Cards</span></>
                ) : (
                  <><Table2 className="h-4 w-4 mr-1" /><span className="text-sm font-medium">Table</span></>
                )}
              </Button>

              <div className="w-px h-8 bg-border/50" />

              {/* AI Board Scanner - Direct Access */}
              <Button 
                variant="outline" 
                size="sm"
                className="h-9 w-9 p-0 shrink-0 hover:bg-primary/10 hover:border-primary/30 transition-all duration-200"
                title="AI Scan Board"
                onClick={() => setShowBoardCapture(true)}
              >
                <Camera className="h-4 w-4 text-primary" />
              </Button>

              {/* AI Tools */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="h-9 w-9 p-0 shrink-0 hover:bg-primary/10 hover:border-primary/30 transition-all duration-200"
                    title="AI Tools"
                  >
                    <Wand2 className="h-4 w-4 text-primary" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-background z-50">
                  <DropdownMenuItem onClick={() => setShowTestResultsScan(true)}>
                    <FileText className="mr-2 h-4 w-4" />
                    AI Scan Test Results
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowScribbleDialog(true)}>
                    <Pen className="mr-2 h-4 w-4" />
                    Scribble to Table
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Smart Tools */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="h-9 w-9 p-0 shrink-0 hover:bg-primary/10 hover:border-primary/30 transition-all duration-200"
                    title="Smart Tools"
                  >
                    <Sparkles className="h-4 w-4 text-primary" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-background z-50">
                  <DropdownMenuItem onClick={() => setShowSmartAutoFillDialog(true)}>
                    <Zap className="mr-2 h-4 w-4" />
                    Smart Auto-Fill
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowRcdPresetsDialog(true)}>
                    <Shield className="mr-2 h-4 w-4" />
                    Quick RCD Presets
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowBulkInfillDialog(true)}>
                    <Grid className="mr-2 h-4 w-4" />
                    Bulk Infill
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Voice Button - Direct ElevenLabs connection */}
              <Button
                variant="outline"
                size="sm"
                className={`h-9 w-9 p-0 shrink-0 transition-all duration-200 ${
                  voiceActive
                    ? 'bg-green-500/20 border-green-500 ring-2 ring-green-500/30'
                    : voiceConnecting
                    ? 'bg-yellow-500/20 border-yellow-500 animate-pulse'
                    : 'hover:bg-primary/10 hover:border-primary/30'
                }`}
                title={voiceActive ? 'Voice active - click to stop' : 'Start voice input'}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Voice button clicked directly!');
                  toggleVoice();
                }}
                disabled={voiceConnecting}
              >
                <Mic className={`h-4 w-4 ${voiceActive ? 'text-green-500 animate-pulse' : voiceConnecting ? 'text-yellow-500' : 'text-primary'}`} />
              </Button>

              {/* More Options */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 w-9 p-0 shrink-0 hover:bg-primary/10 hover:border-primary/30 transition-all duration-200"
                    title="More Options"
                  >
                    <MoreVertical className="h-4 w-4 text-primary" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-background z-50">
                  <DropdownMenuItem 
                    onClick={() => {
                      const newView = mobileViewType === 'table' ? 'card' : 'table';
                      setMobileViewType(newView);
                      setTableViewPreference(newView);
                    }}
                  >
                    {mobileViewType === 'table' ? (
                      <><Layout className="mr-2 h-4 w-4" /> Switch to Card View</>
                    ) : (
                      <><Table className="mr-2 h-4 w-4" /> Switch to Table View</>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowQuickFillPanel(true)}>
                    <Zap className="mr-2 h-4 w-4 text-primary" />
                    Quick Fill RCD
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={removeAllTestResults}
                    className="text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Clear All Circuits
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Mobile Table - Full Width */}
          <div className="w-full mt-3">
            {mobileViewType === 'table' ? (
              <MobileHorizontalScrollTable
                testResults={testResults}
                onUpdate={updateTestResult}
                onRemove={removeTestResult}
                onBulkUpdate={handleBulkUpdate}
                onBulkFieldUpdate={handleBulkFieldUpdate}
              />
            ) : (
              <MobileOptimizedTestTable
                testResults={testResults}
                onUpdate={updateTestResult}
                onRemove={removeTestResult}
                onBulkUpdate={handleBulkUpdate}
              />
            )}
          </div>

          {/* Analytics Section */}
          {testResults.length > 0 && (
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
              {showAnalytics && (
                <TestAnalytics testResults={testResults} />
              )}
            </div>
          )}
        </div>
      ) : (
        /* DESKTOP LAYOUT - MATCHING MOBILE STRUCTURE */
        <div className="w-full space-y-8 py-6 lg:py-8 px-0 bg-elec-gray border border-primary/30 rounded-xl shadow-lg shadow-black/10">
          {/* HEADER SECTION */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-8">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-foreground">Circuit Test Results</h3>
              <p className="text-sm text-muted-foreground">
                Enter test results for each circuit according to BS 7671
              </p>
            </div>
            {/* ACTIONS - Better grouped */}
            <div className="flex flex-wrap gap-3 w-full sm:w-auto">
              {/* AI Tools Group */}
              <div className="flex gap-2 p-2 rounded-lg bg-card/50 border border-elec-blue/30">
                <Button 
                  onClick={() => setShowBoardCapture(true)} 
                  size="sm" 
                  variant="outline"
                  className="h-9 text-sm px-4 gap-2 text-foreground bg-background/50 hover:bg-accent hover:text-accent-foreground"
                >
                  <Camera className="h-4 w-4" />
                  Scan Board
                </Button>
                <Button 
                  onClick={() => setShowTestResultsScan(true)} 
                  size="sm" 
                  variant="outline"
                  className="h-9 text-sm px-4 gap-2 text-foreground bg-background/50 hover:bg-accent hover:text-accent-foreground"
                >
                  <ClipboardList className="h-4 w-4" />
                  Scan Results
                </Button>
              </div>
              
              {/* Smart Tools Group */}
              <div className="flex gap-2 p-2 rounded-lg bg-card/50 border border-elec-yellow/30">
                <Button 
                  onClick={() => setShowScribbleDialog(true)} 
                  size="sm" 
                  variant="outline"
                  className="h-9 text-sm px-4 gap-2 border-transparent hover:bg-muted"
                >
                  <PenTool className="h-4 w-4" />
                  Text to Circuits
                </Button>
                <Button 
                  onClick={() => setShowSmartAutoFillDialog(true)} 
                  size="sm" 
                  variant="outline"
                  className="h-9 text-sm px-4 gap-2 border-transparent hover:bg-muted"
                >
                  <Zap className="h-4 w-4" />
                  Smart Auto-Fill
                </Button>
                <Button 
                  onClick={() => setShowBulkInfillDialog(true)} 
                  size="sm" 
                  variant="outline"
                  className="h-9 text-sm px-4 gap-2 border-transparent hover:bg-muted"
                >
                  <ClipboardCheck className="h-4 w-4" />
                  Bulk Infill
                </Button>
              </div>
              
              {/* Primary Actions */}
              <div className="flex gap-2">
                <Button onClick={addTestResult} size="sm" className="h-9 px-4 gap-2">
                  <Plus className="h-4 w-4" />
                  Add Circuit
                </Button>
                {testResults.length > 0 && (
                  <Button 
                    onClick={removeAllTestResults} 
                    size="sm" 
                    variant="destructive"
                    className="h-9 px-4 gap-2"
                  >
                    Remove All
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* TABLE - Full width, no card wrapper */}
          <div data-autofill-section className="mt-6">
            <EnhancedTestResultDesktopTable 
              testResults={testResults}
              onUpdate={updateTestResult}
              onRemove={removeTestResult}
              allResults={testResults}
              onBulkUpdate={handleBulkUpdate}
              onAddCircuit={addTestResult}
              onBulkFieldUpdate={handleBulkFieldUpdate}
            />
          </div>

          {/* ANALYTICS BUTTON - At bottom */}
          <div className="flex justify-center pt-6 border-t border-border/50">
            <Button 
              onClick={() => setShowAnalytics(!showAnalytics)} 
              size="default"
              variant="outline" 
              className="h-10 px-6 gap-2 text-base"
              disabled={testResults.length === 0}
            >
              <BarChart3 className="h-4 w-4" />
              Test Results Analytics
            </Button>
          </div>

          {showAnalytics && testResults.length > 0 && (
            <TestAnalytics testResults={testResults} />
          )}
        </div>
      )}

      {/* SHARED INFO SECTIONS - Appears for both mobile and desktop */}
      <div className="w-full space-y-6 p-4 lg:p-8 pb-20 lg:pb-4 mt-6 bg-elec-gray rounded-xl border border-primary/30 shadow-lg shadow-black/10">
        {/* Test Instrument Information */}
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

        {/* Distribution Board Verification */}
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

        {/* Test Method & Notes */}
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
          <div className="flex-1 overflow-y-auto p-4">
            <QuickFillRcdPanel
              onFillAllRcdBsStandard={handleFillAllRcdBsStandard}
              onFillAllRcdType={handleFillAllRcdType}
              onFillAllRcdRating={handleFillAllRcdRating}
              onFillAllRcdRatingA={handleFillAllRcdRatingA}
            />
          </div>
        </div>
      )}

      {/* SHARED DIALOGS - Tool Sheet Pattern */}
      {/* AI Board Photo Capture - Tool Sheet Pattern */}
      {showBoardCapture && (
        <>
          <div className="tool-sheet-overlay" onClick={() => setShowBoardCapture(false)} />
          <div className="tool-sheet-container">
            <div className="tool-sheet-handle md:hidden" />
            <div className="tool-sheet-header">
              <div className="tool-sheet-title">
                <Camera className="h-5 w-5 text-elec-yellow" />
                AI Board Scanner
              </div>
              <Button variant="ghost" size="icon" onClick={() => setShowBoardCapture(false)} className="text-white/70 hover:text-white hover:bg-white/10">
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="tool-sheet-content">
              <BoardPhotoCapture
                onAnalysisComplete={handleAIAnalysisComplete}
                onClose={() => setShowBoardCapture(false)}
                renderContentOnly={true}
              />
            </div>
          </div>
        </>
      )}

      {/* Test Results Photo Capture - Tool Sheet Pattern */}
      {showTestResultsScan && (
        <>
          <div className="tool-sheet-overlay" onClick={() => setShowTestResultsScan(false)} />
          <div className="tool-sheet-container">
            <div className="tool-sheet-handle md:hidden" />
            <div className="tool-sheet-header">
              <div className="tool-sheet-title">
                <FileText className="h-5 w-5 text-elec-yellow" />
                Scan Test Results
              </div>
              <Button variant="ghost" size="icon" onClick={() => setShowTestResultsScan(false)} className="text-white/70 hover:text-white hover:bg-white/10">
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="tool-sheet-content">
              <TestResultsPhotoCapture
                onAnalysisComplete={handleTestResultsAnalysisComplete}
                onClose={() => setShowTestResultsScan(false)}
              />
            </div>
          </div>
        </>
      )}

      {/* AI Circuit Review */}
      {showAIReview && detectedCircuits && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="max-h-[90vh] overflow-auto w-full">
            <SimpleCircuitTable
              circuits={detectedCircuits.circuits || []}
              board={detectedCircuits.board || { make: 'Unknown', model: 'Unknown', mainSwitch: 'Unknown', spd: 'Unknown', totalWays: 0 }}
              onApply={handleApplyAICircuitsFromTable}
              onClose={() => {
                setShowAIReview(false);
                setDetectedCircuits(null);
              }}
            />
          </div>
        </div>
      )}

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

      {/* Smart Auto-Fill Prompt Dialog */}
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
                Smart Auto-Fill
              </div>
              <Button variant="ghost" size="icon" onClick={() => setShowSmartAutoFillDialog(false)} className="text-white/70 hover:text-white hover:bg-white/10">
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
              <Button variant="ghost" size="icon" onClick={() => setShowRcdPresetsDialog(false)} className="text-white/70 hover:text-white hover:bg-white/10">
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="tool-sheet-content">
              <QuickRcdPresets
                testResults={testResults.map(r => ({ id: r.id, circuitDesignation: r.circuitDesignation }))}
                onApplyToCircuits={(circuitIds, preset) => {
                  // Batch update all circuits at once
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

                  // Show success toast
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

      {/* Scribble to Table Dialog - Mobile Only */}
      {showScribbleDialog && (
        <ScribbleToTableDialog
          onCircuitsAdded={(newCircuits) => {
            const updatedResults = [...testResults, ...newCircuits];
            setTestResults(updatedResults);
            onUpdate('scheduleOfTests', updatedResults);
            setShowScribbleDialog(false);
            toast.success('Circuits Added', {
              description: `Successfully added ${newCircuits.length} circuit(s) from text`,
              duration: 2000,
            });
          }}
          onClose={() => setShowScribbleDialog(false)}
        />
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

export default EICRScheduleOfTests;
