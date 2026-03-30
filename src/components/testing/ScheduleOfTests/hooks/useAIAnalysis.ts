/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { TestResult } from '@/types/testResult';
import { twinAndEarthCpcFor, normaliseCableSize } from '@/utils/twinAndEarth';
import { calculatePointsServed } from '@/types/autoFillTypes';
import { getMaxZsFromDeviceDetails } from '@/utils/zsCalculations';
import { getDefaultBsStandard } from '@/types/protectiveDeviceTypes';

interface AIAnalysisState {
  showBoardCapture: boolean;
  showTestResultsScan: boolean;
  showAIReview: boolean;
  showTestResultsReview: boolean;
  showScribbleDialog: boolean;
  detectedCircuits: any;
  extractedTestResults: any;
}

interface UseAIAnalysisOptions {
  testResults: TestResult[];
  setTestResults: React.Dispatch<React.SetStateAction<TestResult[]>>;
  onSave: (results: TestResult[]) => void;
}

/**
 * Custom hook for AI analysis features
 * Handles board scanning, test results OCR, and circuit detection
 */
export function useAIAnalysis({ testResults, setTestResults, onSave }: UseAIAnalysisOptions) {
  const [state, setState] = useState<AIAnalysisState>({
    showBoardCapture: false,
    showTestResultsScan: false,
    showAIReview: false,
    showTestResultsReview: false,
    showScribbleDialog: false,
    detectedCircuits: null,
    extractedTestResults: null,
  });

  // Open/close handlers
  const openBoardCapture = useCallback(() => {
    setState((s) => ({ ...s, showBoardCapture: true }));
  }, []);

  const closeBoardCapture = useCallback(() => {
    setState((s) => ({ ...s, showBoardCapture: false }));
  }, []);

  const openTestResultsScan = useCallback(() => {
    setState((s) => ({ ...s, showTestResultsScan: true }));
  }, []);

  const closeTestResultsScan = useCallback(() => {
    setState((s) => ({ ...s, showTestResultsScan: false }));
  }, []);

  const openScribbleDialog = useCallback(() => {
    setState((s) => ({ ...s, showScribbleDialog: true }));
  }, []);

  const closeScribbleDialog = useCallback(() => {
    setState((s) => ({ ...s, showScribbleDialog: false }));
  }, []);

  // Utility: Fix protective device terminology
  const fixProtectiveDeviceType = (type: string): string => {
    if (!type) return type;
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

  // Utility: Normalise AI circuit values
  const normaliseAICircuit = (circuit: any) => {
    const normaliseReferenceMethod = (method: string): string => {
      if (!method) return 'C';
      if (method.includes('103') || method.toLowerCase().includes('stud wall')) return 'B';
      if (method.includes('C') || method.toLowerCase().includes('clipped')) return 'C';
      if (method.includes('A')) return 'A';
      return 'C';
    };

    const getDeviceBaseType = (type: string): string => {
      if (!type) return '';
      const upper = type.toUpperCase();
      if (upper.includes('RCBO')) return 'RCBO';
      if (upper.includes('RCD')) return 'RCD';
      if (upper.includes('MCB')) return 'MCB';
      if (upper.includes('FUSE')) return 'Fuse';
      return type;
    };

    const normaliseRating = (rating: string): string => {
      if (!rating) return '';
      return rating.replace(/[^\d]/g, '');
    };

    const deviceType = fixProtectiveDeviceType(circuit.protectiveDeviceType || '');
    const baseDeviceType = getDeviceBaseType(deviceType);
    const canonicalLiveSize = normaliseCableSize(circuit.liveSize || '');
    const correctCpcSize = twinAndEarthCpcFor(canonicalLiveSize);
    const combinedBs = getDefaultBsStandard(baseDeviceType);

    return {
      ...circuit,
      liveSize: canonicalLiveSize,
      cpcSize: correctCpcSize,
      referenceMethod: normaliseReferenceMethod(circuit.referenceMethod || ''),
      protectiveDeviceType: baseDeviceType,
      protectiveDeviceCurve: circuit.protectiveDeviceCurve || circuit.curve || '',
      protectiveDeviceRating: normaliseRating(circuit.protectiveDeviceRating || ''),
      protectiveDeviceKaRating: circuit.protectiveDeviceKaRating || '6kA',
      bsStandard: circuit.bsStandard?.includes('(') ? circuit.bsStandard : combinedBs,
    };
  };

  // Utility: Calculate maxZs
  const calculateMaxZsForCircuit = (bsStandard: string, curve: string, rating: string): string => {
    if (!bsStandard || !rating) return '';
    const maxZs = getMaxZsFromDeviceDetails(bsStandard, curve, rating);
    return maxZs !== null ? maxZs.toFixed(2) : '';
  };

  // Utility: Check if row is blank
  const isBlankRow = (result: TestResult): boolean => {
    // Catch the default init row explicitly (id='1' with no description)
    if (result.id === '1' && (!result.circuitDescription || result.circuitDescription.trim() === '')) {
      return true;
    }
    // A row is blank if it has no meaningful data filled in
    const hasDescription = result.circuitDescription && result.circuitDescription.trim() !== '';
    const hasDevice = result.protectiveDeviceType && result.protectiveDeviceType.trim() !== '';
    const hasRating = result.protectiveDeviceRating && result.protectiveDeviceRating.trim() !== '';
    const hasTestData = !!(result.r1r2 || result.zs || result.insulationResistance || result.insulationLiveEarth);
    return !hasDescription && !hasDevice && !hasRating && !hasTestData;
  };

  // Handler: Board analysis complete
  const handleBoardAnalysisComplete = useCallback((data: any) => {
    setState((s) => ({
      ...s,
      detectedCircuits: data,
      showBoardCapture: false,
      showAIReview: true,
    }));
  }, []);

  // Handler: Test results analysis complete
  const handleTestResultsAnalysisComplete = useCallback((data: any) => {
    setState((s) => ({
      ...s,
      extractedTestResults: data,
      showTestResultsScan: false,
      showTestResultsReview: true,
    }));
  }, []);

  // Handler: Accept extracted test results
  const handleAcceptTestResults = useCallback(
    (selectedCircuits: any[]) => {
      const transformedResults = selectedCircuits.map((circuit, index) => {
        const nextId = (testResults.length + index + 1).toString();
        const circuitRef = circuit.circuit_reference || `C${testResults.length + index + 1}`;

        const incomingType: string = circuit.protective_device?.type || '';
        const upper = incomingType.toUpperCase();
        const baseType = upper.includes('RCBO')
          ? 'RCBO'
          : upper.includes('RCD')
            ? 'RCD'
            : upper.includes('MCB')
              ? 'MCB'
              : upper.includes('FUSE')
                ? 'Fuse'
                : incomingType;
        const incomingBs: string = circuit.protective_device?.bs_standard || '';
        const bsFromType = getDefaultBsStandard(baseType || 'MCB');
        const finalBs =
          incomingBs && incomingBs.includes('(') ? incomingBs : bsFromType || incomingBs;

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
          notes: circuit.notes || '',
          autoFilled: true,
          typeOfWiring: '',
        } as TestResult;
      });

      const updatedResults = [...testResults, ...transformedResults];
      setTestResults(updatedResults);
      onSave(updatedResults);
      setState((s) => ({
        ...s,
        showTestResultsReview: false,
        extractedTestResults: null,
      }));
    },
    [testResults, setTestResults, onSave]
  );

  // Handler: Apply AI detected circuits from board scan
  const handleApplyAICircuits = useCallback(
    (selectedCircuits: any[]) => {
      console.log('[handleApplyAICircuits] Called with', selectedCircuits.length, 'circuits');
      try {
      // Remove all blank/empty rows — AI scan replaces them cleanly
      const blankCount = testResults.filter((r) => isBlankRow(r)).length;
      console.log('[handleApplyAICircuits] Existing rows:', testResults.length, 'blank:', blankCount);
      const nonBlankResults = testResults.filter((result) => !isBlankRow(result));
      const updatedResults = [...nonBlankResults];

      // Detect if this is a three-phase board
      const boardLayout = state.detectedCircuits?.board?.boardLayout || '';
      const isThreePhaseBoard =
        boardLayout.startsWith('3P') ||
        selectedCircuits.some((c: any) => c.phase === '3P' || c.phaseType === '3P');

      if (isThreePhaseBoard) {
        console.log('[handleApplyAICircuits] Three-phase TP&N board detected, using Way/Phase numbering');
      }

      selectedCircuits.forEach((rawCircuit) => {
        const circuit = normaliseAICircuit(rawCircuit);
        const isThreePole = circuit.phase === '3P';
        const liveSize = circuit.liveSize;
        const circuitType = circuit.circuitType || '';
        const circuitDesc = circuit.circuitDescription || '';

        const isRingCircuit = circuitType.toLowerCase().includes('ring');
        const isSocketCircuit = circuitType.toLowerCase().includes('socket');
        const isBathroomCircuit = circuitDesc.toLowerCase().includes('bathroom');
        const isOutdoorCircuit =
          circuitDesc.toLowerCase().includes('outdoor') ||
          circuitDesc.toLowerCase().includes('garden');
        const isRCBOOrRCD =
          circuit.protectiveDeviceType.toUpperCase().includes('RCD') ||
          circuit.protectiveDeviceType.toUpperCase().includes('RCBO');
        const requiresRCD = isSocketCircuit || isBathroomCircuit || isOutdoorCircuit || isRCBOOrRCD;

        // Three-phase board: C1 L1, C1 L2, C1 L3, C2 L1...
        // Single-phase board: C1, C2, C3...
        // Three-pole device on 3P board: C5 L1,L2,L3
        let circuitDesignation: string;
        let circuitNum: string;

        // Use AI-provided way_number and phase_designation if available
        const aiWayNumber = (rawCircuit as any).wayNumber || (rawCircuit as any).way_number;
        const aiPhaseDesignation = (rawCircuit as any).phaseDesignation || (rawCircuit as any).phase_designation;

        if (isThreePhaseBoard && aiWayNumber && aiPhaseDesignation) {
          // AI provided way/phase — use directly (e.g. "Way 1 L1", "Way 9 L1,L2,L3")
          circuitDesignation = `Way ${aiWayNumber} ${aiPhaseDesignation}`;
          circuitNum = aiWayNumber.toString();
        } else if (isThreePhaseBoard) {
          // Fallback: sequential numbering with phase index
          const seqNum = updatedResults.length + 1;
          const fallbackWay = Math.ceil(seqNum / 3);
          const fallbackPhase = ['L1', 'L2', 'L3'][(seqNum - 1) % 3];
          circuitDesignation = isThreePole
            ? `Way ${fallbackWay} L1,L2,L3`
            : `Way ${fallbackWay} ${fallbackPhase}`;
          circuitNum = fallbackWay.toString();
        } else {
          // Single-phase board — simple sequential
          circuitNum = (updatedResults.length + 1).toString();
          circuitDesignation = `C${circuitNum}`;
        }

        const newResult: TestResult = {
          id: crypto.randomUUID(),
          circuitNumber: circuitNum,
          circuitDesignation: circuitDesignation,
          circuitDescription: circuitDesc,
          circuitType: circuitType,
          type: circuitType,
          referenceMethod: circuit.referenceMethod,
          liveSize: liveSize,
          cpcSize: circuit.cpcSize,
          protectiveDeviceType: circuit.protectiveDeviceType,
          protectiveDeviceCurve: circuit.protectiveDeviceCurve || '',
          protectiveDeviceRating: circuit.protectiveDeviceRating,
          protectiveDeviceKaRating: circuit.protectiveDeviceKaRating,
          protectiveDeviceLocation: 'Consumer Unit',
          bsStandard: circuit.bsStandard,
          cableSize: liveSize,
          protectiveDevice:
            `${circuit.protectiveDeviceType} ${circuit.protectiveDeviceRating}`.trim(),
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
          pointsServed: calculatePointsServed(
            circuitDesc,
            circuitType,
            circuit.protectiveDeviceType
          ),
          rcdRating: requiresRCD ? '30mA' : '',
          rcdOneX: '',
          rcdTestButton: '',
          afddTest: '',
          pfc: '',
          pfcLiveNeutral: '',
          pfcLiveEarth: '',
          functionalTesting: 'Satisfactory',
          notes: '',
          autoFilled: true,
          typeOfWiring: '',
          rcdBsStandard: isRCBOOrRCD ? 'RCBO (BS EN 61009)' : '',
          rcdType: isRCBOOrRCD ? 'A' : '',
          rcdRatingA: requiresRCD ? '30' : '',
          phaseType: isThreePole ? '3P' : (isThreePhaseBoard ? '1P' : (circuit.phase || '1P')),
          notes: isThreePole ? '3-pole device (L1,L2,L3)' : '',
        };
        updatedResults.push(newResult);
      });

      console.log('[handleApplyAICircuits] Setting', updatedResults.length, 'test results');
      setTestResults(updatedResults);
      onSave(updatedResults);
      setState((s) => ({
        ...s,
        showAIReview: false,
        detectedCircuits: null,
      }));

      toast.success(`Added ${selectedCircuits.length} circuits from AI scan`);
      } catch (err) {
        console.error('[handleApplyAICircuits] CRASH:', err);
        toast.error('Failed to apply circuits: ' + (err instanceof Error ? err.message : String(err)));
      }
    },
    [testResults, setTestResults, onSave, state.detectedCircuits]
  );

  // Close AI review
  const closeAIReview = useCallback(() => {
    setState((s) => ({
      ...s,
      showAIReview: false,
      detectedCircuits: null,
    }));
  }, []);

  // Close test results review
  const closeTestResultsReview = useCallback(() => {
    setState((s) => ({
      ...s,
      showTestResultsReview: false,
      extractedTestResults: null,
    }));
  }, []);

  // Handle scribble to circuits
  const handleScribbleCircuits = useCallback(
    (newCircuits: TestResult[]) => {
      const updatedResults = [...testResults, ...newCircuits];
      setTestResults(updatedResults);
      onSave(updatedResults);
      setState((s) => ({ ...s, showScribbleDialog: false }));
      toast.success('Circuits Added', {
        description: `Successfully added ${newCircuits.length} circuit(s) from text`,
        duration: 2000,
      });
    },
    [testResults, setTestResults, onSave]
  );

  return {
    // State
    ...state,
    // Open/close handlers
    openBoardCapture,
    closeBoardCapture,
    openTestResultsScan,
    closeTestResultsScan,
    openScribbleDialog,
    closeScribbleDialog,
    closeAIReview,
    closeTestResultsReview,
    // Analysis handlers
    handleBoardAnalysisComplete,
    handleTestResultsAnalysisComplete,
    handleAcceptTestResults,
    handleApplyAICircuits,
    handleScribbleCircuits,
  };
}

export default useAIAnalysis;
