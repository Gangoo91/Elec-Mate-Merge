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
import { InspectionView } from './InspectionView';
import { BondingView } from './BondingView';
import { OriginView } from './OriginView';
import { FunctionalView } from './FunctionalView';
import { FUNC_ITEMS } from '@/data/am2/sectionBFunctional';
import { SEQ_POINTS } from '@/data/am2/sectionBOrigin';
import type { TestReading } from '@/types/am2-testing-simulator';
import type { SimMode } from '@/data/am2/sectionBRules';

interface TestingSimulatorProps {
  /** Fires once the run is scored; `score` is that run's result (0–100). */
  onSessionComplete?: (score?: number) => void;
  /** Skip the mode choice — the Mock AM2 day always runs as an Assessment. */
  forceMode?: SimMode;
}

export function TestingSimulator({ onSessionComplete, forceMode }: TestingSimulatorProps) {
  const { user } = useAuth();
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
    startMode,
    energise,
    nullLeads,
    logMistake,
    deadDone,
    resumedAt,
    answerInspection,
    finishInspection,
    updateBonding,
    deenergise,
    updateOrigin,
    updateFunctional,
    rectify,
    rectifyBond,
    updateEICDetail,
    updateEICCert,
  } = useTestingSimulator({ persistFor: forceMode ? null : (user?.id ?? null) });

  // Mock day: straight into Assessment, no mode choice.
  useEffect(() => {
    if (forceMode && state.mode === null) startMode(forceMode);
  }, [forceMode, state.mode, startMode]);

  const sounds = useMultimeterSounds();
  const { saveScore } = useAM2Readiness();
  const savedRef = useRef(false);

  // Save the run when it reaches the summary. Every mode is saved (so the
  // mistake history is complete); only Assessment counts towards "ready" —
  // useAM2Sections filters on component_scores.mode.
  useEffect(() => {
    if (state.phase === 'summary' && state.score && !savedRef.current) {
      savedRef.current = true;
      const { marking, mode, seconds, overall } = state.score;
      if (mode === 'assessment') saveScore('testingSequence', overall);

      if (user) {
        saveAM2Session(user.id, {
          sessionType: 'testing_sequence',
          overallScore: overall,
          componentScores: {
            mode,
            inspection: marking.inspection,
            bonding: marking.bonding,
            testing: marking.testing,
            schedule: marking.schedule,
            problems: marking.problems,
            origin: marking.origin,
            functional: marking.functional,
            paperwork: marking.paperwork,
          },
          sessionData: {
            mistakes: marking.mistakes.map((m) => ({ tag: m.tag, circuitId: m.circuitId ?? null })),
            caught: marking.caught.map((c) => ({
              kind: c.problem.kind,
              caught: c.caught,
              fixed: !!c.fixed,
              retested: !!c.retested,
            })),
          },
          timeSpentSeconds: seconds,
        });
      }

      onSessionComplete?.(overall);
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

  // From an empty box on the schedule straight to the circuit that fills it.
  const handleGoToCircuit = useCallback(
    (circuitId: number) => {
      setShowEIC(false);
      handleSelectCircuit(circuitId);
    },
    [handleSelectCircuit]
  );

  const handleBackToRig = useCallback(() => {
    setShowEIC(false);
    backToRig();
  }, [backToRig]);

  // ── Phase Rendering ───────────────────────────────────────

  if (state.phase === 'summary' && state.score) {
    return (
      <SessionSummary
        score={state.score}
        inspection={state.inspection}
        forced={!!forceMode}
        onTryAgain={() => startMode(state.score!.mode)}
        onBackToRig={forceMode ? () => startMode(forceMode) : resetSession}
      />
    );
  }

  // EIC as overlay when in testing phase
  if (showEIC && state.phase === 'testing') {
    return (
      <EICSheet
        eic={state.eic}
        circuitProgress={state.circuitProgress}
        mode={state.mode ?? 'learn'}
        backLabel={activeCircuit ? `Circuit ${activeCircuit.id}` : 'The rig'}
        onClose={handleCloseEIC}
        onUpdateResult={updateEICResult}
        onUpdateDetail={updateEICDetail}
        onUpdateCert={updateEICCert}
        onGoToCircuit={handleGoToCircuit}
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
        mode={state.mode ?? 'learn'}
        energised={state.energised}
        leadsNulled={state.leadsNulled}
        seeded={state.seeded}
        onNullLeads={nullLeads}
        onLogMistake={logMistake}
        onReadingComplete={handleReadingComplete}
        onBack={handleBackToRig}
        onOpenEIC={handleOpenEIC}
        fixes={state.fixes}
        onRectify={rectify}
        onDeenergise={deenergise}
      />
    );
  }

  if (state.phase === 'inspection' && state.mode) {
    return (
      <InspectionView
        mode={state.mode}
        inspection={state.inspection}
        onAnswer={answerInspection}
        onFinish={finishInspection}
        onBack={() => setPhase('rig-select')}
      />
    );
  }

  if (state.phase === 'bonding' && state.mode) {
    return (
      <BondingView
        mode={state.mode}
        bonding={state.bonding}
        energised={state.energised}
        onUpdate={updateBonding}
        onBack={() => setPhase('rig-select')}
        onRectify={rectifyBond}
      />
    );
  }

  if (state.phase === 'origin' && state.mode) {
    return (
      <OriginView
        mode={state.mode}
        origin={state.origin}
        energised={state.energised}
        onUpdate={updateOrigin}
        onBack={() => setPhase('rig-select')}
      />
    );
  }

  if (state.phase === 'functional' && state.mode) {
    return (
      <FunctionalView
        mode={state.mode}
        functional={state.functional}
        origin={state.origin}
        energised={state.energised}
        onUpdate={updateFunctional}
        onBack={() => setPhase('rig-select')}
      />
    );
  }

  // EIC from rig-select phase
  if (state.phase === 'eic' || showEIC) {
    return (
      <EICSheet
        eic={state.eic}
        circuitProgress={state.circuitProgress}
        mode={state.mode ?? 'learn'}
        backLabel="The rig"
        onClose={() => {
          setShowEIC(false);
          setPhase('rig-select');
        }}
        onUpdateResult={updateEICResult}
        onUpdateDetail={updateEICDetail}
        onUpdateCert={updateEICCert}
        onGoToCircuit={handleGoToCircuit}
        onFinish={handleFinish}
      />
    );
  }

  // Default: rig-select
  return (
    <AM2RigOverview
      circuitProgress={state.circuitProgress}
      overallProgress={overallProgress}
      eic={state.eic}
      mode={state.mode}
      energised={state.energised}
      deadDone={deadDone}
      sessionStartTime={state.sessionStartTime}
      resumedAt={resumedAt}
      inspectionDone={state.inspection.done}
      inspectionJudged={Object.keys(state.inspection.answers).length}
      onOpenInspection={() => setPhase('inspection')}
      bondingDone={state.bonding.done}
      bondingTested={Object.keys(state.bonding.readings).length}
      onOpenBonding={() => setPhase('bonding')}
      originTaken={
        [state.origin.ze, state.origin.pscc, state.origin.pefc].filter(Boolean).length +
        SEQ_POINTS.filter((p) => state.origin.seq[p.id]).length
      }
      earthOff={state.origin.earthOff}
      onOpenOrigin={() => setPhase('origin')}
      functionalChecked={FUNC_ITEMS.filter((i) => state.functional.verdicts[i.id]).length}
      onOpenFunctional={() => setPhase('functional')}
      onDeenergise={deenergise}
      onChangeMode={resetSession}
      locked={!!forceMode}
      onEarlyEnergise={() =>
        logMistake({
          tag: 'live_before_dead',
          what: 'Tried to energise the board before every dead test was done.',
          fix: 'Reg 643.1: every dead test — continuity, insulation resistance, polarity — before the supply goes on.',
        })
      }
      onStartMode={startMode}
      onEnergise={energise}
      onSelectCircuit={handleSelectCircuit}
      onOpenSchedule={() => setPhase('eic')}
    />
  );
}
