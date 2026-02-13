/**
 * TestingSimulator v2
 *
 * Root orchestrator with seamless switching between testing and EIC.
 * Phases: rig-select → testing (with EIC overlay) → summary
 *
 * The EIC is now an overlay that can be toggled without losing
 * testing state, making it easy to switch back and forth.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTestingSimulator } from '@/hooks/am2/useTestingSimulator';
import { useMultimeterSounds } from '@/hooks/am2/useMultimeterSounds';
import { useAM2Readiness } from '@/hooks/am2/useAM2Readiness';
import { useAuth } from '@/contexts/AuthContext';
import { saveAM2Session } from '@/hooks/am2/saveAM2Session';
import { AM2RigOverview } from './AM2RigOverview';
import { CircuitTestView } from './CircuitTestView';
import { EICSheet } from './EICSheet';
import { SessionSummary } from './SessionSummary';
import type { TestReading } from '@/types/am2-testing-simulator';

interface TestingSimulatorProps {
  onSessionComplete?: () => void;
}

export function TestingSimulator({ onSessionComplete }: TestingSimulatorProps) {
  const {
    state,
    activeCircuit,
    overallProgress,
    selectCircuit,
    completeTest,
    setPhase,
    updateEICResult,
    backToRig,
    calculateFinalScore,
    resetSession,
  } = useTestingSimulator();

  const sounds = useMultimeterSounds();
  const { saveScore } = useAM2Readiness();
  const { user } = useAuth();
  const savedRef = useRef(false);

  // Save score when session reaches summary phase
  useEffect(() => {
    if (state.phase === 'summary' && state.score && !savedRef.current) {
      savedRef.current = true;
      saveScore('testingSequence', state.score.overall);

      if (user) {
        saveAM2Session(user.id, {
          sessionType: 'testing_sequence',
          overallScore: state.score.overall,
          componentScores: {
            sequenceAccuracy: state.score.sequenceAccuracy,
            readingCorrectness: state.score.readingCorrectness,
            scheduleCompleteness: state.score.scheduleCompleteness,
          },
        });
      }

      onSessionComplete?.();
    }

    if (state.phase === 'rig-select') {
      savedRef.current = false;
    }
  }, [state.phase, state.score, saveScore, user, onSessionComplete]);

  // EIC overlay state — separate from phase so we don't lose testing context
  const [showEIC, setShowEIC] = useState(false);

  const handleSelectCircuit = useCallback(
    (circuitId: number) => {
      sounds.sessionStart();
      selectCircuit(circuitId);
    },
    [sounds, selectCircuit]
  );

  const handleReadingComplete = useCallback(
    (reading: TestReading) => {
      completeTest(reading);
    },
    [completeTest]
  );

  const handleOpenEIC = useCallback(() => {
    setShowEIC(true);
  }, []);

  const handleCloseEIC = useCallback(() => {
    setShowEIC(false);
  }, []);

  const handleFinish = useCallback(() => {
    setShowEIC(false);
    calculateFinalScore();
  }, [calculateFinalScore]);

  const handleBackToRig = useCallback(() => {
    setShowEIC(false);
    backToRig();
  }, [backToRig]);

  // ── Phase Rendering ───────────────────────────────────────

  if (state.phase === 'summary' && state.score) {
    return (
      <SessionSummary score={state.score} onTryAgain={resetSession} onBackToRig={resetSession} />
    );
  }

  // EIC as overlay when in testing phase
  if (showEIC && state.phase === 'testing') {
    return (
      <EICSheet
        eic={state.eic}
        onClose={handleCloseEIC}
        onUpdateResult={updateEICResult}
        onFinish={handleFinish}
      />
    );
  }

  if (state.phase === 'testing' && activeCircuit) {
    const progress = state.circuitProgress[activeCircuit.id];
    return (
      <CircuitTestView
        circuit={activeCircuit}
        progress={progress}
        gn3Step={state.gn3CurrentStep}
        onReadingComplete={handleReadingComplete}
        onBack={handleBackToRig}
        onOpenEIC={handleOpenEIC}
      />
    );
  }

  // EIC from rig-select phase
  if (state.phase === 'eic' || showEIC) {
    return (
      <EICSheet
        eic={state.eic}
        onClose={() => {
          setShowEIC(false);
          setPhase('rig-select');
        }}
        onUpdateResult={updateEICResult}
        onFinish={handleFinish}
      />
    );
  }

  // Default: rig-select
  return (
    <AM2RigOverview
      circuitProgress={state.circuitProgress}
      overallProgress={overallProgress}
      onSelectCircuit={handleSelectCircuit}
    />
  );
}
