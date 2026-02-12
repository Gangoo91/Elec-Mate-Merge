/**
 * useTestingSimulator
 *
 * Main state machine for the AM2 Testing Simulator.
 * Manages phases, circuit progress, readings, and EIC auto-population.
 */

import { useReducer, useCallback, useMemo } from 'react';
import type {
  TestingSimulatorState,
  TestingSimulatorAction,
  CircuitProgress,
  TestReading,
  SimulatorScore,
  EICCircuitDetail,
  EICTestResult,
  EICScheduleState,
} from '@/types/am2-testing-simulator';
import { AM2_RIG_CIRCUITS, AM2_ZE } from '@/data/am2RigCircuits';
import { getIRTestVoltage } from '@/data/mftReadingEngine';

// ── Initial EIC State ───────────────────────────────────────

function buildInitialEIC(): EICScheduleState {
  const circuitDetails: EICCircuitDetail[] = AM2_RIG_CIRCUITS.map((c) => ({
    circuitNumber: String(c.id),
    circuitDescription: c.name,
    typeOfWiring: c.wiringType,
    referenceMethod: c.referenceMethod,
    pointsServed: c.pointsServed,
    liveMm2: c.liveMm2,
    cpcMm2: c.cpcMm2,
    ocpdBsStandard: c.bsStandard,
    ocpdType: `Type ${c.mcbType}`,
    ocpdRating: String(c.mcbRating),
    breakingCapacity: String(c.breakingCapacity),
    maxPermittedZs: c.maxZs.toFixed(2),
    rcdBsStandard: c.rcdBsStandard || '',
    rcdType: c.rcdType || '',
    rcdIdn: c.rcdRating ? String(c.rcdRating) : '',
    rcdRating: c.hasRcd ? String(c.mcbRating) : '',
  }));

  const testResults: EICTestResult[] = AM2_RIG_CIRCUITS.map((c) => ({
    circuitNumber: String(c.id),
    ringR1: '',
    ringRn: '',
    ringR2: '',
    r1r2: '',
    r2: '',
    irTestVoltage: '',
    irLiveLive: '',
    irLiveEarth: '',
    polarity: '',
    maxMeasuredZs: '',
    rcdDisconnectionTime: '',
    rcdTestButton: '',
    afddTest: '',
    remarks: '',
  }));

  return {
    certificate: {
      clientName: 'AM2 Assessment Centre',
      installationAddress: 'AM2 Practical Rig, Training Workshop',
      descriptionOfWork: 'New installation — AM2 practical assessment rig',
      designerName: 'Candidate',
      installerName: 'Candidate',
      inspectorName: 'Candidate',
      supplyType: 'TN-C-S',
      supplyVoltage: '230V',
      earthingArrangement: 'TN-C-S (PME)',
      zeAtOrigin: AM2_ZE.toFixed(2),
      pfcAtOrigin: '',
    },
    circuitDetails,
    testResults,
    headerFields: {
      dbReference: 'DB1',
      location: 'AM2 Training Workshop',
      ze: AM2_ZE.toFixed(2),
      ipf: '',
      phaseSequence: 'L1-L2-L3',
      correctPolarity: '',
      operationalStatus: '',
      spdDetails: 'N/A',
    },
  };
}

// ── Initial State ───────────────────────────────────────────

function buildInitialProgress(): Record<number, CircuitProgress> {
  const progress: Record<number, CircuitProgress> = {};
  for (const circuit of AM2_RIG_CIRCUITS) {
    progress[circuit.id] = {
      circuitId: circuit.id,
      completedTests: [],
      totalTests: circuit.requiredTests.length,
      readings: [],
      status: 'untested',
    };
  }
  return progress;
}

const INITIAL_STATE: TestingSimulatorState = {
  phase: 'rig-select',
  activeCircuitId: null,
  activeTestPointId: null,
  mft: {
    dialPosition: 'OFF',
    isTestActive: false,
    currentReading: null,
    displayMode: 'idle',
    leadConnected: false,
  },
  circuitProgress: buildInitialProgress(),
  eic: buildInitialEIC(),
  gn3CurrentStep: 0,
  sessionStartTime: Date.now(),
  score: null,
};

// ── Auto-populate EIC from reading ──────────────────────────

function applyReadingToEIC(eic: EICScheduleState, reading: TestReading): EICScheduleState {
  const resultIndex = eic.testResults.findIndex(
    (r) => r.circuitNumber === String(reading.circuitId)
  );
  if (resultIndex === -1) return eic;

  const newResults = [...eic.testResults];
  const result = { ...newResults[resultIndex] };

  switch (reading.dialPosition) {
    case 'CONTINUITY':
      if (reading.subTest === 'r1') {
        result.ringR1 = reading.displayValue;
      } else if (reading.subTest === 'rn') {
        result.ringRn = reading.displayValue;
      } else if (reading.subTest === 'r2') {
        result.ringR2 = reading.displayValue;
      } else if (reading.subTest === 'r1r2') {
        result.r1r2 = reading.displayValue;
      } else if (reading.subTest === 'polarity') {
        result.polarity = reading.compliant ? 'OK' : 'FAIL';
      } else {
        result.r1r2 = reading.displayValue;
      }
      break;

    case 'IR_250V':
    case 'IR_500V':
      result.irTestVoltage = getIRTestVoltage(reading.dialPosition);
      if (reading.subTest === 'L-L') {
        result.irLiveLive = reading.displayValue;
      } else if (reading.subTest === 'L-E') {
        result.irLiveEarth = reading.displayValue;
      }
      break;

    case 'LOOP_ZS':
      result.maxMeasuredZs = reading.displayValue;
      break;

    case 'RCD_30':
    case 'RCD_100':
    case 'RCD_300':
      if (reading.subTest === 'test_button') {
        result.rcdTestButton = reading.displayValue;
      } else {
        result.rcdDisconnectionTime = reading.displayValue;
      }
      break;

    case 'PFC':
      // PFC goes to header field
      return {
        ...eic,
        headerFields: {
          ...eic.headerFields,
          ipf: reading.displayValue,
        },
        certificate: {
          ...eic.certificate,
          pfcAtOrigin: reading.displayValue,
        },
      };
  }

  newResults[resultIndex] = result;
  return { ...eic, testResults: newResults };
}

// ── Score Calculator ────────────────────────────────────────

function calculateScore(state: TestingSimulatorState): SimulatorScore {
  const circuits = AM2_RIG_CIRCUITS;
  let totalRequired = 0;
  let completed = 0;
  let compliantReadings = 0;
  let totalReadings = 0;
  let inOrderCount = 0;
  let totalOrderChecks = 0;

  for (const circuit of circuits) {
    const progress = state.circuitProgress[circuit.id];
    if (!progress) continue;

    totalRequired += circuit.requiredTests.length;
    completed += progress.completedTests.length;

    for (const reading of progress.readings) {
      totalReadings++;
      if (reading.compliant) compliantReadings++;
    }

    // Check GN3 sequence order
    let lastStep = -1;
    for (const testId of progress.completedTests) {
      const reqTest = circuit.requiredTests.find((t) => t.id === testId);
      if (reqTest) {
        totalOrderChecks++;
        if (reqTest.gn3Step >= lastStep) {
          inOrderCount++;
        }
        lastStep = reqTest.gn3Step;
      }
    }
  }

  // Schedule completeness
  const eicResults = state.eic.testResults;
  let filledColumns = 0;
  let totalColumns = 0;
  for (const result of eicResults) {
    const fields = [
      result.r1r2,
      result.irTestVoltage,
      result.irLiveLive,
      result.irLiveEarth,
      result.maxMeasuredZs,
    ];
    totalColumns += fields.length;
    filledColumns += fields.filter((f) => f !== '').length;
  }

  const sequenceAccuracy =
    totalOrderChecks > 0 ? Math.round((inOrderCount / totalOrderChecks) * 100) : 0;
  const readingCorrectness =
    totalReadings > 0 ? Math.round((compliantReadings / totalReadings) * 100) : 0;
  const scheduleCompleteness =
    totalColumns > 0 ? Math.round((filledColumns / totalColumns) * 100) : 0;

  const overall = Math.round(
    sequenceAccuracy * 0.35 + readingCorrectness * 0.35 + scheduleCompleteness * 0.3
  );

  return {
    sequenceAccuracy,
    readingCorrectness,
    scheduleCompleteness,
    overall,
  };
}

// ── Reducer ─────────────────────────────────────────────────

function reducer(
  state: TestingSimulatorState,
  action: TestingSimulatorAction
): TestingSimulatorState {
  switch (action.type) {
    case 'SELECT_CIRCUIT':
      return {
        ...state,
        phase: 'testing',
        activeCircuitId: action.circuitId,
        activeTestPointId: null,
        mft: { ...INITIAL_STATE.mft },
        gn3CurrentStep: 0,
      };

    case 'SELECT_TEST_POINT':
      return {
        ...state,
        activeTestPointId: action.testPointId,
        mft: {
          ...state.mft,
          currentReading: null,
          displayMode: 'idle',
        },
      };

    case 'SET_DIAL_POSITION':
      return {
        ...state,
        mft: {
          ...state.mft,
          dialPosition: action.position,
          currentReading: null,
          displayMode: action.position === 'OFF' ? 'idle' : 'idle',
        },
      };

    case 'START_TEST':
      return {
        ...state,
        mft: {
          ...state.mft,
          isTestActive: true,
          displayMode: 'testing',
          currentReading: null,
        },
      };

    case 'COMPLETE_TEST': {
      const { reading } = action;
      const circuitId = reading.circuitId;
      const progress = { ...state.circuitProgress[circuitId] };

      // Find matching required test
      const circuit = AM2_RIG_CIRCUITS.find((c) => c.id === circuitId);
      if (circuit) {
        const matchingTest = circuit.requiredTests.find(
          (t) =>
            t.testPointId === reading.testPointId &&
            t.dialPosition === reading.dialPosition &&
            (t.subTest === reading.subTest || (!t.subTest && !reading.subTest))
        );
        if (matchingTest && !progress.completedTests.includes(matchingTest.id)) {
          progress.completedTests = [...progress.completedTests, matchingTest.id];
        }
      }

      progress.readings = [...progress.readings, reading];
      progress.status =
        progress.completedTests.length >= progress.totalTests
          ? 'complete'
          : progress.completedTests.length > 0
            ? 'partial'
            : 'untested';

      // Auto-populate EIC
      const newEIC = applyReadingToEIC(state.eic, reading);

      // Update GN3 step
      let gn3Step = state.gn3CurrentStep;
      if (circuit) {
        const lastCompleted = circuit.requiredTests.find(
          (t) => t.id === progress.completedTests[progress.completedTests.length - 1]
        );
        if (lastCompleted && lastCompleted.gn3Step > gn3Step) {
          gn3Step = lastCompleted.gn3Step;
        }
      }

      return {
        ...state,
        mft: {
          ...state.mft,
          isTestActive: false,
          currentReading: reading,
          displayMode: 'result',
        },
        circuitProgress: {
          ...state.circuitProgress,
          [circuitId]: progress,
        },
        eic: newEIC,
        gn3CurrentStep: gn3Step,
      };
    }

    case 'CLEAR_READING':
      return {
        ...state,
        mft: {
          ...state.mft,
          currentReading: null,
          displayMode: 'idle',
        },
      };

    case 'SET_PHASE':
      return { ...state, phase: action.phase };

    case 'UPDATE_EIC_RESULT': {
      const idx = state.eic.testResults.findIndex(
        (r) => r.circuitNumber === String(action.circuitId)
      );
      if (idx === -1) return state;
      const newResults = [...state.eic.testResults];
      newResults[idx] = {
        ...newResults[idx],
        [action.field]: action.value,
      };
      return {
        ...state,
        eic: { ...state.eic, testResults: newResults },
      };
    }

    case 'BACK_TO_RIG':
      return {
        ...state,
        phase: 'rig-select',
        activeCircuitId: null,
        activeTestPointId: null,
        mft: { ...INITIAL_STATE.mft },
      };

    case 'CALCULATE_SCORE':
      return {
        ...state,
        score: calculateScore(state),
        phase: 'summary',
      };

    case 'RESET_SESSION':
      return {
        ...INITIAL_STATE,
        sessionStartTime: Date.now(),
      };

    default:
      return state;
  }
}

// ── Hook ────────────────────────────────────────────────────

export function useTestingSimulator() {
  const [state, dispatch] = useReducer(reducer, {
    ...INITIAL_STATE,
    sessionStartTime: Date.now(),
  });

  const activeCircuit = useMemo(
    () =>
      state.activeCircuitId
        ? (AM2_RIG_CIRCUITS.find((c) => c.id === state.activeCircuitId) ?? null)
        : null,
    [state.activeCircuitId]
  );

  const overallProgress = useMemo(() => {
    let completed = 0;
    let total = 0;
    for (const progress of Object.values(state.circuitProgress)) {
      completed += progress.completedTests.length;
      total += progress.totalTests;
    }
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  }, [state.circuitProgress]);

  const selectCircuit = useCallback(
    (circuitId: number) => dispatch({ type: 'SELECT_CIRCUIT', circuitId }),
    []
  );

  const selectTestPoint = useCallback(
    (testPointId: string) => dispatch({ type: 'SELECT_TEST_POINT', testPointId }),
    []
  );

  const setDialPosition = useCallback(
    (position: DialPosition) => dispatch({ type: 'SET_DIAL_POSITION', position }),
    []
  );

  const completeTest = useCallback(
    (reading: TestReading) => dispatch({ type: 'COMPLETE_TEST', reading }),
    []
  );

  const clearReading = useCallback(() => dispatch({ type: 'CLEAR_READING' }), []);

  const setPhase = useCallback(
    (phase: TestingSimulatorState['phase']) => dispatch({ type: 'SET_PHASE', phase }),
    []
  );

  const updateEICResult = useCallback(
    (circuitId: number, field: string, value: string) =>
      dispatch({ type: 'UPDATE_EIC_RESULT', circuitId, field, value }),
    []
  );

  const backToRig = useCallback(() => dispatch({ type: 'BACK_TO_RIG' }), []);

  const calculateFinalScore = useCallback(() => dispatch({ type: 'CALCULATE_SCORE' }), []);

  const resetSession = useCallback(() => dispatch({ type: 'RESET_SESSION' }), []);

  return {
    state,
    activeCircuit,
    overallProgress,
    selectCircuit,
    selectTestPoint,
    setDialPosition,
    completeTest,
    clearReading,
    setPhase,
    updateEICResult,
    backToRig,
    calculateFinalScore,
    resetSession,
  };
}
