
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useOptionalVoiceFormContext, FormField } from '@/contexts/VoiceFormContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Plus, BarChart3, Zap, Camera, LayoutGrid, Table2, Shield, X, PenTool, FileText, Wrench, ClipboardList, ClipboardCheck, Wand2, Sparkles, MoreVertical, Layout, Table, Pen, Mic } from 'lucide-react';
import { TestResult } from '@/types/testResult';
import EnhancedTestResultDesktopTable from '../EnhancedTestResultDesktopTable';
import MobileOptimizedTestTable from '../mobile/MobileOptimizedTestTable';
import { MobileHorizontalScrollTable } from '../mobile/MobileHorizontalScrollTable';
import MobileSmartAutoFill from '../mobile/MobileSmartAutoFill';
import QuickRcdPresets from '../QuickRcdPresets';
import TestInstrumentInfo from '../TestInstrumentInfo';
import TestMethodInfo from '../TestMethodInfo';
import TestAnalytics from '../TestAnalytics';
import DistributionBoardVerificationSection from '../testing/DistributionBoardVerificationSection';
import SmartAutoFillPromptDialog from '../SmartAutoFillPromptDialog';

import { BoardPhotoCapture } from '../testing/BoardPhotoCapture';
import { SimpleCircuitTable } from '../testing/SimpleCircuitTable';
import TestResultsPhotoCapture from '../testing/TestResultsPhotoCapture';
import TestResultsReviewDialog from '../testing/TestResultsReviewDialog';
import ScribbleToTableDialog from '../mobile/ScribbleToTableDialog';
import BulkInfillDialog from '../BulkInfillDialog';
import { useOrientation } from '@/hooks/useOrientation';
import { toast } from 'sonner';
import { twinAndEarthCpcFor, normaliseCableSize } from '@/utils/twinAndEarth';
import { calculatePointsServed } from '@/types/autoFillTypes';
import { getTableViewPreference, setTableViewPreference } from '@/utils/mobileTableUtils';
import { getMaxZsFromDeviceDetails } from '@/utils/zsCalculations';
import { getDefaultBsStandard } from '@/types/protectiveDeviceTypes';

interface EICScheduleOfTestingProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

const EICScheduleOfTesting: React.FC<EICScheduleOfTestingProps> = ({ formData, onUpdate }) => {
  const voiceForm = useOptionalVoiceFormContext();
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [selectedCircuitIndex, setSelectedCircuitIndex] = useState(0);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showAutoFillPrompt, setShowAutoFillPrompt] = useState(false);
  const [newCircuitNumber, setNewCircuitNumber] = useState('');
  
  const [showPhotoCapture, setShowPhotoCapture] = useState(false);
  const [detectedCircuits, setDetectedCircuits] = useState<any>(null);
  const [showCircuitReview, setShowCircuitReview] = useState(false);
  const [showTestResultsScan, setShowTestResultsScan] = useState(false);
  const [extractedTestResults, setExtractedTestResults] = useState<any>(null);
  const [showTestResultsReview, setShowTestResultsReview] = useState(false);
  const [mobileViewType, setMobileViewType] = useState<'table' | 'card'>('table');
  const [showScribbleDialog, setShowScribbleDialog] = useState(false);
  const [showSmartAutoFillDialog, setShowSmartAutoFillDialog] = useState(false);
  const [showRcdPresetsDialog, setShowRcdPresetsDialog] = useState(false);
  const [showBulkInfillDialog, setShowBulkInfillDialog] = useState(false);
  const [lastDeleted, setLastDeleted] = useState<{ circuit: TestResult; index: number } | null>(null);
  const orientation = useOrientation();
  
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

  // Initialize test results from form data
  useEffect(() => {
    if (formData.scheduleOfTests && formData.scheduleOfTests.length > 0) {
      // Normalize legacy data - remove K/Z curves for MCB/RCBO devices
      const bsStandardRequiresCurve = (bs: string): boolean => bs === 'MCB' || bs === 'RCBO';
      const normalizedResults = formData.scheduleOfTests.map((result: TestResult) => {
        const needsCurve = bsStandardRequiresCurve(result.bsStandard || '');
        const validCurves = ['B', 'C', 'D'];
        
        if (needsCurve && result.protectiveDeviceCurve && !validCurves.includes(result.protectiveDeviceCurve)) {
          // Clear invalid curves (K, Z, etc.) for MCB/RCBO
          return { ...result, protectiveDeviceCurve: '' };
        } else if (!needsCurve && result.protectiveDeviceCurve) {
          // Clear curve for fuses/other devices
          return { ...result, protectiveDeviceCurve: '' };
        }
        return result;
      });
      setTestResults(normalizedResults);
    } else {
      // Initial result with basic defaults for EIC
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
      default:
        return false;
    }
  }, [testResults, selectedCircuitIndex]);

  // Register with voice form context
  useEffect(() => {
    if (!voiceForm) return;

    voiceForm.registerForm({
      formId: 'eic-schedule-of-testing',
      formName: 'EIC Schedule of Testing',
      fields: voiceFields,
      actions: ['add_circuit', 'next_circuit', 'previous_circuit', 'select_circuit', 'remove_circuit', 'set_polarity_ok'],
      onFillField: handleVoiceFillField,
      onAction: handleVoiceAction,
      onSubmit: () => {
        toast.success('Schedule of Testing saved');
        return true;
      },
      onClear: () => {
        setTestResults([]);
        setSelectedCircuitIndex(0);
        return true;
      },
    });

    return () => {
      voiceForm.unregisterForm('eic-schedule-of-testing');
    };
  }, [voiceForm, voiceFields, handleVoiceFillField, handleVoiceAction]);

  const addTestResult = () => {
    const nextCircuitNumber = (testResults.length + 1).toString();
    setNewCircuitNumber(nextCircuitNumber);
    setShowAutoFillPrompt(true);
  };

  const handleAIAnalysisComplete = (data: any) => {
    setDetectedCircuits(data);
    setShowPhotoCapture(false);
    setShowCircuitReview(true);
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
    // Find blank rows to fill first
    const blankIndices: number[] = [];
    testResults.forEach((result, idx) => {
      if (isBlankRow(result)) {
        blankIndices.push(idx);
      }
    });

    const updatedResults = [...testResults];
    const remainingCircuits: any[] = [];

    circuits.forEach((circuit, circuitIdx) => {
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
      const circuitNumber = (updatedResults.length + 1).toString();
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
        // Three-phase fields
        phaseType: phaseType,
        phaseRotation: phaseType === '3P' ? '' : undefined,
        lineToLineVoltage: phaseType === '3P' ? '' : undefined,
      };
      updatedResults.push(newResult);
    });

    setTestResults(updatedResults);
    onUpdate('scheduleOfTests', updatedResults);
    setShowCircuitReview(false);
    setDetectedCircuits([]);
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

  return (
    <>
      {/* MOBILE FULL-WIDTH LAYOUT */}
      {useMobileView ? (
        <div className="w-full">
          {/* Mobile Sticky Header */}
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

              <div className="w-px h-8 bg-border/50" />

              {/* AI Board Scanner - Direct Access */}
              <Button 
                variant="outline" 
                size="sm"
                className="h-9 w-9 p-0 shrink-0 hover:bg-primary/10 hover:border-primary/30 transition-all duration-200"
                title="AI Scan Board"
                onClick={() => setShowPhotoCapture(true)}
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
                  <DropdownMenuItem onClick={() => setShowScribbleDialog(true)}>
                    <Pen className="mr-2 h-4 w-4" />
                    Text to Circuits
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowTestResultsScan(true)}>
                    <ClipboardList className="mr-2 h-4 w-4" />
                    Scan Test Notes
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
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Voice Button - Active when VoiceFormContext is available */}
              <Button
                variant="outline"
                size="sm"
                className={`h-9 w-9 p-0 shrink-0 transition-all duration-200 ${
                  voiceForm?.activeForm?.formId === 'eic-schedule-of-testing'
                    ? 'bg-primary/20 border-primary ring-2 ring-primary/30'
                    : 'hover:bg-primary/10 hover:border-primary/30'
                }`}
                title={voiceForm ? `Voice Assistant - Circuit ${selectedCircuitIndex + 1} selected` : 'Voice Assistant'}
                onClick={() => {
                  if (voiceForm) {
                    toast.success('Voice ready for Schedule of Testing', {
                      description: `Say "add circuit" or fill fields like "set zs to 0.45"`,
                      duration: 3000
                    });
                  } else {
                    toast.info('Voice assistant available when using the Electrician Voice FAB');
                  }
                }}
              >
                <Mic className={`h-4 w-4 ${voiceForm?.activeForm?.formId === 'eic-schedule-of-testing' ? 'text-primary animate-pulse' : 'text-primary'}`} />
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
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>


          {/* Mobile Table - Full Width */}
          <div className="w-full bg-background/30 pt-3">
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

          {/* Information Sections - Mobile Only - BELOW TABLE */}
          <div className="w-full space-y-4 p-4 bg-background/50">
            {/* Test Instrument Information */}
            <Card>
              <CardHeader className="p-4 pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Wrench className="h-5 w-5" />
                  Test Instrument Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-3 bg-card/30">
                <TestInstrumentInfo formData={formData} onUpdate={onUpdate} />
              </CardContent>
            </Card>

            {/* Distribution Board Verification */}
            <Card>
              <CardHeader className="p-4 pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Distribution Board Verification
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-3 bg-card/30">
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
              </CardContent>
            </Card>

            {/* Test Method & Notes */}
            <Card>
              <CardHeader className="p-4 pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Test Method & Notes
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-3">
                <TestMethodInfo formData={formData} onUpdate={onUpdate} />
              </CardContent>
            </Card>
          </div>


          {/* Analytics Section */}
          {testResults.length > 0 && (
            <div className="border-t border-border/50 p-4 space-y-4">
              <Button 
                onClick={() => setShowAnalytics(!showAnalytics)} 
                size="default" 
                variant="outline" 
                className="w-full gap-2 h-11 touch-manipulation"
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
        /* DESKTOP LAYOUT - MATCHING EICR */
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
                  onClick={() => setShowPhotoCapture(true)} 
                  size="sm" 
                  variant="outline"
                  className="h-9 text-sm px-4 gap-2 border-transparent hover:bg-muted"
                >
                  <Camera className="h-4 w-4" />
                  Scan Board
                </Button>
                <Button 
                  onClick={() => setShowTestResultsScan(true)} 
                  size="sm" 
                  variant="outline"
                  className="h-9 text-sm px-4 gap-2 border-transparent hover:bg-muted"
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
          <div className="flex justify-center pt-6 border-t border-border/50 px-4 md:px-8 lg:px-12 xl:px-16">
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

      {/* INFO SECTIONS - Desktop only (mobile has own implementation) */}
      {!useMobileView && (
        <div className="space-y-8 p-6 lg:p-8 bg-elec-gray rounded-xl border border-primary/30 shadow-lg shadow-black/10">
          <TestInstrumentInfo formData={formData} onUpdate={onUpdate} />
          
          <div className="h-px bg-muted/50" />

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
          
          <div className="h-px bg-muted/50" />

          <TestMethodInfo formData={formData} onUpdate={onUpdate} />
        </div>
      )}

      {/* Dialogs - Render outside conditional blocks */}
      
      {/* AI Board Photo Capture - Tool Sheet Pattern */}
      {showPhotoCapture && (
        <>
          <div className="tool-sheet-overlay" onClick={() => setShowPhotoCapture(false)} />
          <div className="tool-sheet-container">
            <div className="tool-sheet-handle md:hidden" />
            <div className="tool-sheet-header">
              <div className="tool-sheet-title">
                <Camera className="h-5 w-5 text-elec-yellow" />
                AI Board Scanner
              </div>
              <Button variant="ghost" size="icon" onClick={() => setShowPhotoCapture(false)} className="text-white/70 hover:text-white hover:bg-white/10">
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="tool-sheet-content">
              <BoardPhotoCapture
                onAnalysisComplete={handleAIAnalysisComplete}
                onClose={() => setShowPhotoCapture(false)}
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
      {showCircuitReview && detectedCircuits && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="max-h-[90vh] overflow-auto w-full">
            <SimpleCircuitTable
              circuits={detectedCircuits.circuits || []}
              board={detectedCircuits.board || { make: 'Unknown', model: 'Unknown', mainSwitch: 'Unknown', spd: 'Unknown', totalWays: 0 }}
              onApply={handleApplyAICircuitsFromTable}
              onClose={() => {
                setShowCircuitReview(false);
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

    </>
  );
};

export default EICScheduleOfTesting;
