/**
 * useTestingSimulator
 *
 * Main state machine for the AM2 Testing Simulator.
 * Manages phases, circuit progress, readings, and EIC auto-population.
 */

import { useReducer, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type {
  TestingSimulatorState,
  TestingSimulatorAction,
  CircuitProgress,
  TestReading,
  SimulatorScore,
  EICCircuitDetail,
  EICTestResult,
  EICScheduleState,
  DialPosition,
} from '@/types/am2-testing-simulator';
import { AM2_RIG_CIRCUITS } from '@/data/am2RigCircuits';
import {
  allDeadDone,
  answerKey,
  markRun,
  matchTest,
  naCols,
  seedProblems,
  type SimMistake,
  type SimMode,
} from '@/data/am2/sectionBRules';
import { getIRTestVoltage } from '@/data/mftReadingEngine';
import { BONDS, EMPTY_BONDING, seedBonding, type BondingState } from '@/data/am2/sectionBBonding';
import {
  INSPECTION_ITEMS,
  EMPTY_INSPECTION,
  seedInspection,
  type InspectionVerdict,
} from '@/data/am2/sectionBInspection';
import { EMPTY_ORIGIN, seedOrigin, type OriginState } from '@/data/am2/sectionBOrigin';
import {
  EMPTY_FUNCTIONAL,
  seedExtraFault,
  type FunctionalState,
} from '@/data/am2/sectionBFunctional';
import {
  BOND_FIX_OPTIONS,
  resolveFix,
  staleForOption,
  type FixRecord,
} from '@/data/am2/sectionBRectify';
import { RIG_DRAWINGS, blankDetails, certKey, detailsKey } from '@/data/am2/sectionBDetails';
import type { BondId } from '@/data/am2/sectionBBonding';

// ── Initial EIC State ───────────────────────────────────────

/** The schedule with every N/A box written in (Learn). */
function withNaFilled(eic: EICScheduleState): EICScheduleState {
  return {
    ...eic,
    testResults: eic.testResults.map((r) => {
      const c = AM2_RIG_CIRCUITS.find((x) => String(x.id) === r.circuitNumber);
      if (!c) return r;
      return { ...r, ...Object.fromEntries(naCols(c).map((k) => [k, 'N/A'])) };
    }),
  };
}

/** Learn: columns 1–16 and the drawn details filled in for you. Practise and
 *  Assessment: the learner writes them (round 6 — NET: the candidate completes
 *  the certificate and both schedules). */
function buildInitialEIC(mode: SimMode | null = 'learn'): EICScheduleState {
  const prefilled = mode === 'learn' || mode === null;
  const circuitDetails: EICCircuitDetail[] = AM2_RIG_CIRCUITS.map((c) =>
    prefilled ? detailsKey(c) : blankDetails(c)
  );

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
      clientName: 'AM2 practice centre',
      installationAddress: 'Practice rig, training workshop',
      descriptionOfWork: 'New installation — seven final circuits on the practice rig',
      designerName: 'You (candidate)',
      installerName: 'You (candidate)',
      inspectorName: 'You (candidate)',
      // The rig feeds a three-phase motor, so the supply is three-phase.
      supplyType: 'AC, three-phase, four-wire',
      supplyVoltage: 'U 400 V · U₀ 230 V · 50 Hz',
      // Written by the learner outside Learn; Ze and Ipf from their own readings.
      earthingArrangement: prefilled ? 'TN-C-S' : '',
      zeAtOrigin: '',
      pfcAtOrigin: '',
      mainSwitchRating: prefilled ? RIG_DRAWINGS.mainSwitchRating : '',
      earthingConductorCsa: prefilled ? RIG_DRAWINGS.earthingConductor : '',
      bondingConductorCsa: prefilled ? RIG_DRAWINGS.bondingConductor : '',
    },
    circuitDetails,
    testResults,
    headerFields: {
      dbReference: 'DB1',
      location: 'Practice rig',
      ze: '',
      ipf: '',
      // Was pre-filled L1-L2-L3: it's a check you do (Reg 643.9).
      phaseSequence: '',
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

export const INITIAL_STATE: TestingSimulatorState = {
  mode: null,
  energised: false,
  leadsNulled: false,
  seeded: [],
  mistakes: [],
  inspection: EMPTY_INSPECTION,
  bonding: EMPTY_BONDING,
  origin: EMPTY_ORIGIN,
  functional: EMPTY_FUNCTIONAL,
  fixes: [],
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
        // R₁+R₂ taken at each point with the link at the board is the polarity
        // check on the dead circuit (GN3), so tick column 26 — unless this
        // circuit has its own polarity test (the two-way lighting).
        const own = AM2_RIG_CIRCUITS.find((c) => c.id === reading.circuitId)?.requiredTests.some(
          (t) => t.subTest === 'polarity'
        );
        if (!own && !result.polarity) result.polarity = 'OK';
      } else if (reading.subTest === 'ln') {
        // Ring step 2 proves the ring — it has no column on the schedule.
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
  }

  newResults[resultIndex] = result;
  return { ...eic, testResults: newResults };
}

// ── Score ───────────────────────────────────────────────────

function calculateScore(state: TestingSimulatorState): SimulatorScore {
  const completed: Record<number, string[]> = {};
  const readings: Record<number, TestReading[]> = {};
  for (const [id, p] of Object.entries(state.circuitProgress)) {
    completed[Number(id)] = p.completedTests;
    readings[Number(id)] = p.readings;
  }
  const marking = markRun({
    mode: state.mode ?? 'learn',
    completed,
    readings,
    sheet: state.eic.testResults,
    seeded: state.seeded,
    runMistakes: state.mistakes,
    inspection: state.inspection,
    bonding: state.bonding,
    origin: state.origin,
    functional: state.functional,
    fixes: state.fixes,
    details: state.eic.circuitDetails,
    certificate: { ...state.eic.certificate, phaseSequence: state.eic.headerFields.phaseSequence },
  });
  return {
    overall: marking.overall,
    mode: state.mode ?? 'learn',
    seconds: Math.round((Date.now() - state.sessionStartTime) / 1000),
    marking,
  };
}

/** Learn mode: the schedule is written for you, exactly as the key has it. */
function writeRowFromKey(eic: EICScheduleState, circuitId: number, readings: TestReading[]) {
  const c = AM2_RIG_CIRCUITS.find((x) => x.id === circuitId);
  if (!c) return eic;
  const key = answerKey(c, readings);
  return {
    ...eic,
    testResults: eic.testResults.map((r) =>
      r.circuitNumber === String(circuitId) ? { ...r, ...key } : r
    ),
  };
}

/** Learn: the certificate's supply details follow the learner's own readings. */
function withLearnCertificate(state: TestingSimulatorState): TestingSimulatorState {
  if (state.mode !== 'learn') return state;
  const k = certKey(state.origin);
  return {
    ...state,
    eic: {
      ...state.eic,
      certificate: {
        ...state.eic.certificate,
        zeAtOrigin: k.zeAtOrigin,
        pfcAtOrigin: k.pfcAtOrigin,
      },
      headerFields: {
        ...state.eic.headerFields,
        ze: k.zeAtOrigin,
        ipf: k.pfcAtOrigin,
        phaseSequence: k.phaseSequence,
      },
    },
  };
}

/** A functional item to be operated and judged again. */
function clearFunc(f: FunctionalState, id: 'twoWay' | 'dol'): FunctionalState {
  const operated = { ...f.operated };
  delete operated[id];
  const verdicts = { ...f.verdicts };
  delete verdicts[id];
  return { ...f, operated, verdicts, done: false };
}

// ── Reducer ─────────────────────────────────────────────────

/** Exported for the check script, which drives it directly. */
export function reducer(
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

      // Which required test this reading satisfies
      const circuit = AM2_RIG_CIRCUITS.find((c) => c.id === circuitId);
      const newMistakes: SimMistake[] = [];
      const marked = state.mode === 'practise' || state.mode === 'assessment';
      if (circuit) {
        const matchingTest = matchTest(circuit, reading);
        if (matchingTest && !progress.completedTests.includes(matchingTest.id)) {
          // Out of order: an earlier step on this circuit still not done.
          const skipped = circuit.requiredTests.find(
            (t) => t.gn3Step < matchingTest.gn3Step && !progress.completedTests.includes(t.id)
          );
          // Once per skipped test — skipping one step isn't a fresh mistake
          // for every test that follows it.
          const already =
            skipped &&
            state.mistakes.some(
              (m) =>
                m.tag === 'out_of_order' &&
                m.circuitId === circuitId &&
                m.what.endsWith(`before “${skipped.description}”.`)
            );
          if (skipped && marked && !already) {
            newMistakes.push({
              tag: 'out_of_order',
              circuitId,
              what: `Circuit ${circuitId}: “${matchingTest.description}” before “${skipped.description}”.`,
              fix: 'Continuity, then insulation resistance, then polarity, then the live tests (Reg 643.1).',
            });
          }
          // Reg 642.1: inspection precedes testing. Once per run.
          if (
            marked &&
            !state.inspection.done &&
            // Every check judged counts, even if they left without tapping "done".
            !INSPECTION_ITEMS.every((i) => state.inspection.answers[i.id]) &&
            !state.mistakes.some((m) => m.tag === 'inspect_first') &&
            !newMistakes.some((m) => m.tag === 'inspect_first')
          )
            newMistakes.push({
              tag: 'inspect_first',
              circuitId,
              what: 'Testing started before the visual inspection was finished.',
              fix: 'Reg 642.1: inspection precedes testing. Inspect the whole rig first, then test.',
            });
          progress.completedTests = [...progress.completedTests, matchingTest.id];
        } else if (
          !matchingTest &&
          marked &&
          // A polarity check on a circuit where R₁+R₂ proves it: extra, not wrong.
          !(reading.dialPosition === 'CONTINUITY' && reading.subTest === 'polarity')
        ) {
          newMistakes.push({
            tag: 'not_a_test',
            circuitId,
            what: `Circuit ${circuitId}: that range and connection at that point isn’t one of this circuit’s tests.`,
            fix: 'Check which test you are doing before you connect — the schedule column tells you what is needed.',
          });
        }
      }

      progress.readings = [...progress.readings, reading];
      progress.status =
        progress.completedTests.length >= progress.totalTests
          ? 'complete'
          : progress.completedTests.length > 0
            ? 'partial'
            : 'untested';

      // Learn: the schedule fills itself from the key. Practise/assessment:
      // the readings go in the log and the learner writes the schedule.
      const newEIC =
        state.mode === 'learn' || state.mode === null
          ? writeRowFromKey(applyReadingToEIC(state.eic, reading), circuitId, progress.readings)
          : state.eic;

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
        mistakes: newMistakes.length ? [...state.mistakes, ...newMistakes] : state.mistakes,
      };
    }

    case 'SET_MODE':
      return {
        ...INITIAL_STATE,
        circuitProgress: buildInitialProgress(),
        // Learn: the schedule fills itself in, so its N/A boxes are there from
        // the start — the learner can't write them, and an early finish
        // shouldn't count them as missed.
        eic:
          action.mode === 'learn'
            ? withNaFilled(buildInitialEIC('learn'))
            : buildInitialEIC(action.mode),
        mode: action.mode,
        seeded: action.seeded,
        inspection: action.inspection,
        bonding: action.bonding,
        origin: action.origin,
        functional: action.functional,
        fixes: [],
        sessionStartTime: Date.now(),
      };

    case 'UPDATE_BONDING': {
      const m = action.mistake;
      // One of each kind of bonding slip per run — the same slip on both
      // clamps is one mistake.
      // Leads not nulled is one omission per run, wherever it happens — the
      // same rule as LOG_MISTAKE, so the order you test in doesn't change it.
      const seen = (x: SimMistake) =>
        !!m && x.tag === m.tag && (m.tag === 'leads_not_nulled' || x.what === m.what);
      const log = m && !state.mistakes.some(seen) ? [m] : [];
      return {
        ...state,
        bonding: { ...state.bonding, ...action.patch },
        mistakes: log.length ? [...state.mistakes, ...log] : state.mistakes,
      };
    }

    case 'ANSWER_INSPECTION':
      return {
        ...state,
        inspection: {
          ...state.inspection,
          answers: { ...state.inspection.answers, [action.id]: action.verdict },
        },
      };

    case 'FINISH_INSPECTION':
      return { ...state, inspection: { ...state.inspection, done: true }, phase: 'rig-select' };

    case 'ENERGISE': {
      const completed: Record<number, string[]> = {};
      for (const [id, p] of Object.entries(state.circuitProgress))
        completed[Number(id)] = p.completedTests;
      // Never with the main earthing conductor off the MET.
      if (state.origin.earthOff) {
        const marked = state.mode === 'practise' || state.mode === 'assessment';
        const seen = state.mistakes.some(
          (m) => m.tag === 'earth_left_off' && m.what.startsWith('Tried to energise')
        );
        return marked && !seen
          ? {
              ...state,
              mistakes: [
                ...state.mistakes,
                {
                  tag: 'earth_left_off',
                  what: 'Tried to energise the board with the main earthing conductor disconnected.',
                  fix: 'Reconnect the main earthing conductor straight after the Ze reading — before anything goes live.',
                },
              ],
            }
          : state;
      }
      // The main bonding is a dead test too (Reg 643.2.1).
      const bondsDone = BONDS.every((b) => state.bonding.readings[b.id]);
      return allDeadDone(completed) && bondsDone ? { ...state, energised: true } : state;
    }

    case 'DEENERGISE':
      return { ...state, energised: false };

    case 'UPDATE_ORIGIN':
    case 'UPDATE_FUNCTIONAL': {
      const m = action.mistake;
      const log = m && !state.mistakes.some((x) => x.tag === m.tag && x.what === m.what) ? [m] : [];
      const next =
        action.type === 'UPDATE_ORIGIN'
          ? { ...state, origin: { ...state.origin, ...action.patch } }
          : { ...state, functional: { ...state.functional, ...action.patch } };
      return {
        ...withLearnCertificate(next),
        mistakes: log.length ? [...state.mistakes, ...log] : state.mistakes,
      };
    }

    case 'RECTIFY': {
      // Repairs are done dead (the UI asks for the board to be isolated first).
      const c = AM2_RIG_CIRCUITS.find((x) => x.id === action.circuitId);
      if (!c || state.energised) return state;
      const now = Date.now();
      const r = resolveFix(c, action.optionId, state.seeded, state.origin, state.functional);
      // What the repair disturbs is the same whether it cured anything or not —
      // otherwise the screen tells an Assessment candidate their fix was right.
      const disturbed = staleForOption(c, action.optionId);
      let next: TestingSimulatorState = state;
      if (!r.target) {
        // One mistake per wrong repair per circuit, however many times it's tried.
        const already = state.fixes.some(
          (f) => !f.right && f.circuitId === c.id && f.optionId === action.optionId
        );
        if (!already)
          next = {
            ...state,
            fixes: [
              ...state.fixes,
              {
                circuitId: c.id,
                optionId: action.optionId,
                right: false,
                at: now,
                stale: disturbed,
              },
            ],
          };
      } else {
        next = {
          ...state,
          fixes: [
            ...state.fixes,
            {
              circuitId: c.id,
              optionId: action.optionId,
              right: true,
              target: r.target,
              at: now,
              stale: disturbed,
            },
          ],
        };
        if (r.target.startsWith('problem:')) {
          const testId = r.target.slice('problem:'.length);
          next.seeded = state.seeded.map((p) => (p.testId === testId ? { ...p, fixedAt: now } : p));
        }
        if (r.target === 'phase') next.origin = { ...next.origin, phaseFixedAt: now };
        if (r.target.startsWith('func:')) next.functional = { ...next.functional, fixedAt: now };
      }
      // Stations the repair touched are cleared either way.
      if (action.optionId === 'swap_lines') {
        const seq = { ...next.origin.seq };
        delete seq.motor;
        const verdicts = { ...next.origin.verdicts };
        delete verdicts.motor;
        next = { ...next, origin: { ...next.origin, seq, verdicts } };
        next = { ...next, functional: clearFunc(next.functional, 'dol') };
      }
      if (action.optionId === 'fix_twoway')
        next = { ...next, functional: clearFunc(next.functional, 'twoWay') };
      if (action.optionId === 'fix_stop')
        next = { ...next, functional: clearFunc(next.functional, 'dol') };
      if (disturbed.length) {
        const p = next.circuitProgress[c.id];
        const completedTests = p.completedTests.filter((id) => !disturbed.includes(id));
        const readings = p.readings.map((x) => {
          const t = matchTest(c, x);
          return t && disturbed.includes(t.id) ? { ...x, stale: true } : x;
        });
        next = {
          ...next,
          circuitProgress: {
            ...next.circuitProgress,
            [c.id]: {
              ...p,
              completedTests,
              readings,
              status:
                completedTests.length >= p.totalTests
                  ? 'complete'
                  : completedTests.length
                    ? 'partial'
                    : 'untested',
            },
          },
        };
        if (state.mode === 'learn') next.eic = writeRowFromKey(next.eic, c.id, readings);
      }
      return withLearnCertificate(next);
    }

    case 'RECTIFY_BOND': {
      if (state.energised) return state;
      const bond = action.bond as BondId;
      const opt = BOND_FIX_OPTIONS.find((o) => o.id === action.optionId);
      const fault = state.bonding.fault;
      const now = Date.now();
      const cured = !!opt?.right && fault?.bond === bond;
      // Any work on the bond means testing it again — cleared whether or not
      // the repair cured it, so the screen gives nothing away.
      const readings = { ...state.bonding.readings };
      delete readings[bond];
      const verdicts = { ...state.bonding.verdicts };
      delete verdicts[bond];
      const nulledAt = { ...state.bonding.nulledAt };
      delete nulledAt[bond];
      const bonding = {
        ...state.bonding,
        readings,
        verdicts,
        nulledAt,
        done: false,
        ...(cured ? { fault: null, fixedFault: fault, fixedAt: now } : {}),
      };
      const already =
        !cured &&
        state.fixes.some((f) => !f.right && f.bond === bond && f.optionId === action.optionId);
      return {
        ...state,
        bonding,
        fixes: already
          ? state.fixes
          : [
              ...state.fixes,
              {
                circuitId: null,
                bond,
                optionId: action.optionId,
                right: cured,
                ...(cured ? { target: `bond:${bond}` } : {}),
                at: now,
                stale: [],
              },
            ],
      };
    }

    case 'NULL_LEADS':
      return { ...state, leadsNulled: true };

    case 'LOG_MISTAKE':
      // One omission, one mistake: not nulling the leads counts once per run,
      // however many circuits it carries through.
      if (
        action.mistake.tag === 'leads_not_nulled' &&
        state.mistakes.some((m) => m.tag === 'leads_not_nulled')
      )
        return state;
      return { ...state, mistakes: [...state.mistakes, action.mistake] };

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

    case 'UPDATE_EIC_DETAIL':
      return {
        ...state,
        eic: {
          ...state.eic,
          circuitDetails: state.eic.circuitDetails.map((d) =>
            d.circuitNumber === action.circuitNumber ? { ...d, [action.field]: action.value } : d
          ),
        },
      };

    case 'UPDATE_EIC_CERT': {
      const { field, value } = action;
      // The phase sequence lives on the schedule's header; Ze and Ipf on both.
      const headerFields = { ...state.eic.headerFields };
      if (field === 'phaseSequence') headerFields.phaseSequence = value;
      if (field === 'zeAtOrigin') headerFields.ze = value;
      if (field === 'pfcAtOrigin') headerFields.ipf = value;
      return {
        ...state,
        eic: {
          ...state.eic,
          headerFields,
          certificate:
            field === 'phaseSequence'
              ? state.eic.certificate
              : { ...state.eic.certificate, [field]: value },
        },
      };
    }

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
        circuitProgress: buildInitialProgress(),
        eic: buildInitialEIC(),
        sessionStartTime: Date.now(),
      };

    case 'RESTORE':
      return action.state;

    default:
      return state;
  }
}

// ── Keeping a run if the page closes ────────────────────────
// Section B is a long sitting. A run is saved to this browser as it goes and
// brought back on the rig page when the learner returns. The clock carries
// the time already spent, not the time away. A save is dropped after a week,
// or if the rig's tests have changed since (old readings wouldn't fit).

// One key per user, so on a shared college PC one learner's run never
// touches another's.
const runKey = (userId: string) => `am2-section-b-run:${userId}`;
const RUN_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
const RIG_FINGERPRINT = AM2_RIG_CIRCUITS.map(
  (c) => `${c.id}:${c.requiredTests.map((t) => t.id).join(',')}`
).join('|');

interface SavedRun {
  rig: string;
  savedAt: number;
  elapsedMs: number;
  state: TestingSimulatorState;
}

function readSavedRun(userId: string): SavedRun | null {
  try {
    // The first version kept one shared key; it's superseded by the per-user one.
    localStorage.removeItem('am2-section-b-run');
    const raw = localStorage.getItem(runKey(userId));
    if (!raw) return null;
    const run = JSON.parse(raw) as SavedRun;
    if (
      run.rig !== RIG_FINGERPRINT ||
      Date.now() - run.savedAt > RUN_MAX_AGE_MS ||
      !run.state?.mode ||
      !run.state.inspection ||
      !run.state.bonding ||
      // Saved before the origin, functional and repair stations existed.
      !run.state.origin ||
      !run.state.functional ||
      !run.state.fixes
    ) {
      localStorage.removeItem(runKey(userId));
      return null;
    }
    return run;
  } catch {
    return null;
  }
}

/** Save the run — or, once it's finished or cleared, remove it. */
function writeSavedRun(userId: string, state: TestingSimulatorState) {
  try {
    if (!state.mode || state.phase === 'summary') {
      localStorage.removeItem(runKey(userId));
      return;
    }
    const run: SavedRun = {
      rig: RIG_FINGERPRINT,
      savedAt: Date.now(),
      elapsedMs: Date.now() - state.sessionStartTime,
      state,
    };
    localStorage.setItem(runKey(userId), JSON.stringify(run));
  } catch {
    /* storage full or blocked — the run carries on unsaved */
  }
}

// ── Hook ────────────────────────────────────────────────────

export function useTestingSimulator({ persistFor }: { persistFor?: string | null } = {}) {
  const [state, dispatch] = useReducer(reducer, {
    ...INITIAL_STATE,
    sessionStartTime: Date.now(),
  });

  // Bring back a run left part-way, once we know who is signed in. If the
  // signed-in user changes, the run on screen was theirs: clear it first.
  const [resumedAt, setResumedAt] = useState<number | null>(null);
  const restoredFor = useRef<string | null>(null);
  useEffect(() => {
    if (!persistFor || restoredFor.current === persistFor) return;
    const switched = restoredFor.current !== null;
    restoredFor.current = persistFor;
    if (switched) {
      dispatch({ type: 'RESET_SESSION' });
      setResumedAt(null);
    }
    const run = readSavedRun(persistFor);
    if (!run || (!switched && state.mode !== null)) return;
    dispatch({
      type: 'RESTORE',
      state: {
        ...run.state,
        // Back on the rig page, meter off, clock carrying the time already spent.
        phase: 'rig-select',
        activeCircuitId: null,
        activeTestPointId: null,
        mft: { ...INITIAL_STATE.mft },
        score: null,
        sessionStartTime: Date.now() - run.elapsedMs,
      },
    });
    setResumedAt(run.savedAt);
  }, [persistFor, state.mode]);

  // Save as it goes — at most twice a second, and straight away when the page
  // is hidden or closed, so time spent thinking isn't lost from the clock.
  const latest = useRef(state);
  latest.current = state;
  useEffect(() => {
    if (!persistFor || restoredFor.current !== persistFor) return;
    const t = setTimeout(() => writeSavedRun(persistFor, latest.current), 500);
    return () => clearTimeout(t);
  }, [persistFor, state]);
  useEffect(() => {
    if (!persistFor) return;
    const flush = () => {
      if (restoredFor.current === persistFor) writeSavedRun(persistFor, latest.current);
    };
    const onVisibility = () => document.visibilityState === 'hidden' && flush();
    window.addEventListener('pagehide', flush);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      flush();
      window.removeEventListener('pagehide', flush);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [persistFor]);

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

  /** Start a run in a mode; practise and assessment get planted problems. */
  const startMode = useCallback((mode: SimMode) => {
    setResumedAt(null);
    dispatch({
      type: 'SET_MODE',
      mode,
      seeded: seedProblems(mode),
      inspection: seedInspection(mode),
      bonding: seedBonding(mode),
      ...(() => {
        const extra = seedExtraFault(mode);
        return {
          origin: seedOrigin(extra === 'phase'),
          functional: { ...EMPTY_FUNCTIONAL, fault: extra === 'phase' ? null : extra },
        };
      })(),
    });
  }, []);
  const energise = useCallback(() => dispatch({ type: 'ENERGISE' }), []);
  const answerInspection = useCallback(
    (id: string, verdict: InspectionVerdict) =>
      dispatch({ type: 'ANSWER_INSPECTION', id, verdict }),
    []
  );
  const finishInspection = useCallback(() => dispatch({ type: 'FINISH_INSPECTION' }), []);
  const updateBonding = useCallback(
    (patch: Partial<BondingState>, mistake?: SimMistake) =>
      dispatch({ type: 'UPDATE_BONDING', patch, mistake }),
    []
  );
  const nullLeads = useCallback(() => dispatch({ type: 'NULL_LEADS' }), []);
  const deenergise = useCallback(() => dispatch({ type: 'DEENERGISE' }), []);
  const updateOrigin = useCallback(
    (patch: Partial<OriginState>, mistake?: SimMistake) =>
      dispatch({ type: 'UPDATE_ORIGIN', patch, mistake }),
    []
  );
  const updateFunctional = useCallback(
    (patch: Partial<FunctionalState>, mistake?: SimMistake) =>
      dispatch({ type: 'UPDATE_FUNCTIONAL', patch, mistake }),
    []
  );
  const rectify = useCallback(
    (circuitId: number, optionId: string) => dispatch({ type: 'RECTIFY', circuitId, optionId }),
    []
  );
  const rectifyBond = useCallback(
    (bond: string, optionId: string) => dispatch({ type: 'RECTIFY_BOND', bond, optionId }),
    []
  );
  const updateEICDetail = useCallback(
    (circuitNumber: string, field: string, value: string) =>
      dispatch({ type: 'UPDATE_EIC_DETAIL', circuitNumber, field, value }),
    []
  );
  const updateEICCert = useCallback(
    (field: string, value: string) => dispatch({ type: 'UPDATE_EIC_CERT', field, value }),
    []
  );
  const logMistake = useCallback(
    (mistake: SimMistake) => dispatch({ type: 'LOG_MISTAKE', mistake }),
    []
  );

  const deadDone = useMemo(() => {
    const completed: Record<number, string[]> = {};
    for (const [id, p] of Object.entries(state.circuitProgress))
      completed[Number(id)] = p.completedTests;
    return allDeadDone(completed) && BONDS.every((b) => state.bonding.readings[b.id]);
  }, [state.circuitProgress, state.bonding.readings]);

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
  };
}
