/**
 * useMFTInstrument
 *
 * Manages MFT instrument state: dial position, TEST button,
 * reading display, and sound integration.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import type {
  AM2RigCircuit,
  DialPosition,
  MFTState,
  TestReading,
} from '@/types/am2-testing-simulator';
import { generateReading } from '@/data/mftReadingEngine';
import { useMultimeterSounds } from './useMultimeterSounds';

interface UseMFTInstrumentOptions {
  circuit: AM2RigCircuit | null;
  activeTestPointId: string | null;
  activeSubTest?: string;
  onReadingComplete?: (reading: TestReading) => void;
  /** Applied before the sound and the callback (planted problems, ring position, leads). */
  adjustReading?: (reading: TestReading) => TestReading;
  /** Assessment: the same neutral beep for every reading — the sound mustn't judge it. */
  neutralSounds?: boolean;
}

export function useMFTInstrument({
  circuit,
  activeTestPointId,
  activeSubTest,
  onReadingComplete,
  adjustReading,
  neutralSounds,
}: UseMFTInstrumentOptions) {
  const sounds = useMultimeterSounds();
  const [state, setState] = useState<MFTState>({
    dialPosition: 'OFF',
    isTestActive: false,
    currentReading: null,
    displayMode: 'idle',
    leadConnected: false,
  });

  const testingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // A test still running when the learner leaves the circuit must not land
  // later — in another circuit, or in a fresh run after "Start again".
  useEffect(
    () => () => {
      if (testingTimeoutRef.current) clearTimeout(testingTimeoutRef.current);
    },
    []
  );

  const setDialPosition = useCallback(
    (position: DialPosition) => {
      sounds.modeClick();
      // Turning the dial ends a test in progress — its reading never lands.
      if (testingTimeoutRef.current) clearTimeout(testingTimeoutRef.current);
      testingTimeoutRef.current = null;
      setState((prev) => ({
        ...prev,
        dialPosition: position,
        isTestActive: false,
        currentReading: null,
        displayMode: position === 'OFF' ? 'idle' : 'idle',
      }));
    },
    [sounds]
  );

  const runTest = useCallback(() => {
    if (!circuit || !activeTestPointId || state.dialPosition === 'OFF') return;

    // Check if the selected test point supports this dial position
    const testPoint = circuit.testPoints.find((tp) => tp.id === activeTestPointId);
    if (!testPoint || !testPoint.availableTests.includes(state.dialPosition)) {
      sounds.abnormalAlert();
      return;
    }

    // Play appropriate sound
    switch (state.dialPosition) {
      case 'CONTINUITY':
        sounds.continuityBeep();
        break;
      case 'IR_250V':
      case 'IR_500V':
        sounds.irWhine();
        break;
      default:
        sounds.probeTap();
    }

    // Set testing state
    setState((prev) => ({
      ...prev,
      isTestActive: true,
      displayMode: 'testing',
      currentReading: null,
    }));

    // Generate reading after simulated measurement time
    const measureTime = state.dialPosition.startsWith('IR')
      ? 1200
      : state.dialPosition.startsWith('RCD')
        ? 800
        : 600;

    if (testingTimeoutRef.current) clearTimeout(testingTimeoutRef.current);
    testingTimeoutRef.current = setTimeout(() => {
      const raw = generateReading({
        circuit,
        testPointId: activeTestPointId,
        dialPosition: state.dialPosition,
        subTest: activeSubTest,
      });
      const reading = adjustReading ? adjustReading(raw) : raw;

      // Compliance sound — judged on the reading actually shown. Neutral in Assessment.
      if (neutralSounds || reading.compliant) {
        sounds.successChime();
      } else {
        sounds.abnormalAlert();
      }

      setState((prev) => ({
        ...prev,
        isTestActive: false,
        currentReading: reading,
        displayMode: 'result',
      }));

      onReadingComplete?.(reading);
    }, measureTime);
  }, [
    circuit,
    activeTestPointId,
    activeSubTest,
    state.dialPosition,
    sounds,
    onReadingComplete,
    adjustReading,
    neutralSounds,
  ]);

  const clearReading = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentReading: null,
      displayMode: 'idle',
    }));
  }, []);

  const reset = useCallback(() => {
    if (testingTimeoutRef.current) {
      clearTimeout(testingTimeoutRef.current);
    }
    setState({
      dialPosition: 'OFF',
      isTestActive: false,
      currentReading: null,
      displayMode: 'idle',
      leadConnected: false,
    });
  }, []);

  return {
    state,
    setDialPosition,
    runTest,
    clearReading,
    reset,
  };
}
