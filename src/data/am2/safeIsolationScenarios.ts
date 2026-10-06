/**
 * Safe isolation scenarios for the AM2 simulator (Section C).
 *
 * Jobs grouped by NET's three Section C tasks: replace a single-phase piece
 * of equipment, replace a three-phase piece of equipment, and isolate a
 * distribution board. A run sets one job of each. (For tasks 1 and 2 every
 * other circuit stays on — so switching off the main switch is a trap.)
 *
 * The procedure is modelled as actions with prerequisites rather than one
 * fixed list, because more than one order is correct — the tester can be
 * proved before or after you switch off, and the lock and the notice can go
 * on in either order. What can't move: you identify before you switch off,
 * you secure the isolation before you test, you prove the tester before AND
 * after the dead test, and the dead test covers every conductor combination
 * at the point of work. (Grounded in the HSE safe-working guidance in the
 * RAG; written in our own words and not named to the learner.)
 */

export type IsolationActionId =
  | 'identify'
  | 'inform'
  | 'switchOff'
  | 'lockOff'
  | 'notice'
  | 'selectTester'
  | 'proveBefore'
  | 'proveDead'
  | 'proveAfter';

export interface IsolationAction {
  id: IsolationActionId;
  /** What the apprentice taps. */
  label: string;
  /** Must all be done first. */
  needs: IsolationActionId[];
  /** Shown when tapped too early — why it can't come yet. */
  tooEarly: string;
}

/** What kind of mistake — drives "Your weak spots" for Section C. */
export type IsolationTag =
  | 'unsafe_tester'
  | 'key'
  | 'local_switch'
  | 'wrong_point'
  | 'too_early'
  | 'missed_pair'
  | 'live_reading'
  | 'prove_after'
  | 'prove_before'
  | 'not_informed';

export const ISOLATION_TAG_LABEL: Record<IsolationTag, string> = {
  unsafe_tester: 'Proving dead with the wrong instrument',
  key: 'Not keeping the key',
  local_switch: 'Relying on a local or control switch',
  wrong_point: 'Isolating at the wrong point',
  too_early: 'Steps in an unsafe order',
  missed_pair: 'Dead test not on every pair',
  live_reading: 'Carrying on after a live reading',
  prove_after: 'Ignoring a failed re-prove',
  prove_before: 'Tester not proved before and after the dead test',
  not_informed: 'Not telling people the supply is going off',
};

export interface IsolationTrap {
  id: string;
  label: string;
  /** Why it's wrong. Always shown, always counts as a mistake. */
  why: string;
  tag: IsolationTag;
}

export interface IsolationScenario {
  id: string;
  title: string;
  kind: string;
  brief: string;
  /** Where the dead test is done, for the prove-dead step. */
  pointOfWork: string;
  /** Every pair that has to read 0 V. */
  testPairs: string[];
  actions: IsolationAction[];
  traps: IsolationTrap[];
  /** Optional twist: the dead test reads live because the wrong circuit
   *  was isolated. The apprentice has to choose what to do. */
  liveTwist?: {
    reading: string;
    pair: string;
    choices: Array<{ label: string; correct: boolean; why: string; critical?: boolean }>;
  };
  /** Optional twist: the indicator fails on the proving unit after the
   *  dead test, so the 0 V readings can't be trusted. */
  proveAfterFails?: {
    choices: Array<{ label: string; correct: boolean; why: string }>;
  };
  /** One line for the recap. */
  takeaway: string;
}

const COMMON_TRAPS: IsolationTrap[] = [
  {
    id: 'ncv',
    label: 'Check it with a non-contact voltage detector',
    why: "A non-contact detector can miss a live conductor and can't prove anything is dead. It's fine for tracing which circuit is which, never for proving dead.",
    tag: 'unsafe_tester',
  },
  {
    id: 'multimeter',
    label: 'Use a multimeter on its AC volts range',
    why: 'A multimeter can be left on the wrong range or function and show nothing on a live conductor. Prove dead with a two-pole voltage indicator on shrouded leads, fused or current-limited as the maker specifies.',
    tag: 'unsafe_tester',
  },
  {
    id: 'keyAway',
    label: 'Leave the padlock key with the supervisor',
    why: "The key stays with you. If anyone else holds it, they can re-energise the circuit you're working on.",
    tag: 'key',
  },
];

const PROVE_ACTIONS: IsolationAction[] = [
  {
    id: 'selectTester',
    label: 'Pick up a two-pole voltage indicator with shrouded, protected leads',
    needs: [],
    tooEarly: '',
  },
  {
    id: 'proveBefore',
    label: 'Prove the voltage indicator on the proving unit',
    needs: ['selectTester'],
    tooEarly: 'Choose the instrument you are going to prove first.',
  },
];

function proveDeadAction(where: string): IsolationAction {
  return {
    id: 'proveDead',
    label: `Prove dead at ${where}`,
    needs: ['lockOff', 'notice', 'proveBefore'],
    tooEarly:
      'Not yet. Before you test, the isolation has to be locked and signed, and the indicator has to be proved working — otherwise a 0 V reading tells you nothing you can rely on.',
  };
}

/** NET's step 2: tell the people affected before you switch off. */
const INFORM: IsolationAction = {
  id: 'inform',
  label: 'Tell the people affected that the supply is going off',
  needs: [],
  tooEarly: '',
};

/** Shown when switching off before telling anyone. */
export const INFORM_FIRST =
  'Tell the people affected first. Someone may be relying on that supply — computers, a process — and knowing it’s off stops anyone switching it back on.';

const PROVE_AFTER: IsolationAction = {
  id: 'proveAfter',
  label: 'Prove the voltage indicator on the proving unit again',
  needs: ['proveDead'],
  tooEarly:
    'Proving it again only means something after the dead test — it shows the indicator was still working when it read 0 V.',
};

export const SAFE_ISOLATION_SCENARIOS: IsolationScenario[] = [
  {
    id: 'immersion',
    title: 'Replace an immersion heater element',
    kind: 'Single-phase equipment',
    brief:
      'A customer’s immersion heater has stopped heating. It is fed on its own radial from a 16 A MCB in the consumer unit, through a double-pole switch beside the cylinder. You are going to change the element.',
    pointOfWork: 'the heater terminals',
    testPairs: ['L–N', 'L–E', 'N–E'],
    actions: [
      {
        id: 'identify',
        label: 'Identify the immersion circuit on the schedule and confirm it at the cylinder',
        needs: [],
        tooEarly: '',
      },
      INFORM,
      {
        id: 'switchOff',
        label: 'Switch off the 16 A immersion MCB',
        needs: ['identify', 'inform'],
        tooEarly: 'You can’t switch off until you know which device feeds the heater.',
      },
      {
        id: 'lockOff',
        label: 'Fit an MCB lock-off and your padlock, and keep the key',
        needs: ['switchOff'],
        tooEarly: 'There’s nothing to lock off yet — switch the circuit off first.',
      },
      {
        id: 'notice',
        label: 'Fit a “Danger — do not switch on” notice at the consumer unit',
        needs: ['switchOff'],
        tooEarly: 'The notice goes on the device you have switched off — do that first.',
      },
      ...PROVE_ACTIONS,
      proveDeadAction('the heater terminals'),
      PROVE_AFTER,
    ],
    traps: [
      ...COMMON_TRAPS,
      {
        id: 'dpOnly',
        label: 'Turn off the double-pole switch by the cylinder and start work',
        why: 'A local switch can be turned back on by anyone passing. Isolate at the consumer unit and lock it off so it can’t be.',
        tag: 'local_switch',
      },
    ],
    takeaway:
      'A local switch is not secure isolation — lock off at the board and prove dead at the terminals you’ll touch.',
  },
  {
    id: 'threePhase',
    title: 'Work on a three-phase sub-board',
    kind: 'Isolate a distribution board',
    brief:
      'A small three-phase distribution board in a workshop is fed from a 63 A four-pole rotary isolator on the wall beside it. You need to replace a damaged busbar shield inside the board.',
    pointOfWork: 'the incoming terminals of the sub-board',
    testPairs: ['L1–L2', 'L2–L3', 'L3–L1', 'L1–N', 'L2–N', 'L3–N', 'L1–E', 'L2–E', 'L3–E', 'N–E'],
    actions: [
      {
        id: 'identify',
        label: 'Confirm the rotary isolator feeds this board (labels and cable route)',
        needs: [],
        tooEarly: '',
      },
      INFORM,
      {
        id: 'switchOff',
        label: 'Turn the rotary isolator to OFF',
        needs: ['identify', 'inform'],
        tooEarly: 'Make sure this isolator really feeds the board before you rely on it.',
      },
      {
        id: 'lockOff',
        label: 'Padlock the isolator handle in the OFF position and keep the key',
        needs: ['switchOff'],
        tooEarly: 'Turn the isolator off before you try to lock it.',
      },
      {
        id: 'notice',
        label: 'Fit a “Danger — do not switch on” notice to the isolator',
        needs: ['switchOff'],
        tooEarly: 'The notice goes on the isolator once it’s off.',
      },
      ...PROVE_ACTIONS,
      proveDeadAction('the incoming terminals of the sub-board'),
      PROVE_AFTER,
    ],
    traps: [
      ...COMMON_TRAPS,
      {
        id: 'mainsOnly',
        label: 'Turn off the board’s own main switch instead of the isolator',
        why: 'The board’s main switch leaves its own incoming terminals live — which is exactly where you’re working. Isolate upstream, at the rotary isolator.',
        tag: 'wrong_point',
      },
    ],
    takeaway:
      'On three-phase, every conductor combination is a separate test: phase to phase, phase to neutral, phase to earth, and neutral to earth.',
  },
  {
    id: 'ring',
    title: 'Add a spur to a ring final',
    kind: 'Single-phase equipment',
    brief:
      'You are adding a fused spur to the kitchen ring in a house. The consumer unit schedule says the kitchen ring is on the 32 A RCBO in way 4. You will be working at the kitchen socket nearest the worktop.',
    pointOfWork: 'the kitchen socket you’re working on',
    testPairs: ['L–N', 'L–E', 'N–E'],
    actions: [
      {
        id: 'identify',
        label: 'Find the kitchen ring on the schedule (way 4, 32 A RCBO)',
        needs: [],
        tooEarly: '',
      },
      INFORM,
      {
        id: 'switchOff',
        label: 'Switch off the way 4 RCBO',
        needs: ['identify', 'inform'],
        tooEarly: 'Identify the circuit before you switch anything off.',
      },
      {
        id: 'lockOff',
        label: 'Fit an RCBO lock-off and your padlock, and keep the key',
        needs: ['switchOff'],
        tooEarly: 'Switch it off before you lock it off.',
      },
      {
        id: 'notice',
        label: 'Fit a “Danger — do not switch on” notice at the consumer unit',
        needs: ['switchOff'],
        tooEarly: 'The notice goes on once the device is off.',
      },
      ...PROVE_ACTIONS,
      proveDeadAction('the kitchen socket'),
      PROVE_AFTER,
    ],
    traps: [
      ...COMMON_TRAPS,
      {
        id: 'plugTester',
        label: 'Plug in a socket tester — no lights means it’s dead',
        why: 'A plug-in tester only checks what it’s designed to show and needs its own proving. It isn’t a dead test. Use the two-pole indicator on each conductor pair.',
        tag: 'unsafe_tester',
      },
    ],
    liveTwist: {
      reading: '231 V',
      pair: 'L–N',
      choices: [
        {
          label:
            'Stop. The circuit isn’t isolated — go back and find what really feeds this socket',
          correct: true,
          why: 'Right. A proved indicator reading 231 V means the socket is live. Schedules are often out of date; the circuit you locked off isn’t this one.',
        },
        {
          label: 'The indicator must be faulty — re-prove it and test again',
          correct: false,
          // Re-checking while still treating it as live isn't unsafe — just not
          // the first move. Second best, not critical.
          critical: false,
          why: 'Fine to double-check — but you proved the indicator before the test, so treat 231 V as real and the socket as live while you do. The first move is to find what really feeds it.',
        },
        {
          label: 'Switch off the main switch so everything is dead, and carry on',
          correct: false,
          why: 'That hides the problem rather than solving it — the wrong circuit is still identified and locked off, and the main switch isn’t locked. Find the right circuit and isolate that.',
        },
      ],
    },
    takeaway:
      'The schedule tells you where to start, not what’s true. The dead test at the point of work is what catches a wrong label.',
  },
  {
    id: 'motor',
    title: 'Change a contactor coil on a motor starter',
    kind: 'Three-phase equipment',
    brief:
      'A pump motor in a plant room runs from a direct-on-line starter. The starter is fed from a triple-pole-and-neutral isolator on the wall beside it. The contactor coil has failed and you are going to replace it.',
    pointOfWork: 'the incoming terminals of the starter',
    testPairs: ['L1–L2', 'L2–L3', 'L3–L1', 'L1–N', 'L2–N', 'L3–N', 'L1–E', 'L2–E', 'L3–E', 'N–E'],
    actions: [
      {
        id: 'identify',
        label: 'Confirm the wall isolator feeds this starter (labels and cable route)',
        needs: [],
        tooEarly: '',
      },
      INFORM,
      {
        id: 'switchOff',
        label: 'Turn the isolator to OFF',
        needs: ['identify', 'inform'],
        tooEarly: 'Make sure this isolator really feeds the starter before you rely on it.',
      },
      {
        id: 'lockOff',
        label: 'Padlock the isolator in the OFF position and keep the key',
        needs: ['switchOff'],
        tooEarly: 'Turn the isolator off before you try to lock it.',
      },
      {
        id: 'notice',
        label: 'Fit a “Danger — do not switch on” notice to the isolator',
        needs: ['switchOff'],
        tooEarly: 'The notice goes on the isolator once it’s off.',
      },
      ...PROVE_ACTIONS,
      proveDeadAction('the incoming terminals of the starter'),
      PROVE_AFTER,
    ],
    traps: [
      ...COMMON_TRAPS,
      {
        id: 'stopButton',
        label: 'Press the red stop button on the starter and start work',
        why: 'A stop button is a control device — it stops the motor by dropping out the contactor, without opening the supply to the starter (Reg 537.3.1.3). The incoming terminals stay live. Isolate at the isolator and lock it.',
        tag: 'local_switch',
      },
    ],
    takeaway:
      'Stopping a machine isn’t isolating it. The control circuit can drop out with the supply still on the starter.',
  },
  {
    id: 'cooker',
    title: 'Replace a cooker control unit',
    kind: 'Single-phase equipment',
    brief:
      'The cooker control unit in a kitchen has a cracked switch. It is fed on its own radial from a 32 A MCB in the consumer unit. You are going to replace the unit itself.',
    pointOfWork: 'the incoming terminals of the cooker control unit',
    testPairs: ['L–N', 'L–E', 'N–E'],
    actions: [
      {
        id: 'identify',
        label: 'Identify the cooker circuit on the schedule and confirm it at the unit',
        needs: [],
        tooEarly: '',
      },
      INFORM,
      {
        id: 'switchOff',
        label: 'Switch off the 32 A cooker MCB',
        needs: ['identify', 'inform'],
        tooEarly: 'You can’t switch off until you know which device feeds the cooker unit.',
      },
      {
        id: 'lockOff',
        label: 'Fit an MCB lock-off and your padlock, and keep the key',
        needs: ['switchOff'],
        tooEarly: 'There’s nothing to lock off yet — switch the circuit off first.',
      },
      {
        id: 'notice',
        label: 'Fit a “Danger — do not switch on” notice at the consumer unit',
        needs: ['switchOff'],
        tooEarly: 'The notice goes on the device you have switched off — do that first.',
      },
      ...PROVE_ACTIONS,
      proveDeadAction('the incoming terminals of the cooker control unit'),
      PROVE_AFTER,
    ],
    traps: [
      ...COMMON_TRAPS,
      {
        id: 'ccuSwitch',
        label: 'Turn off the switch on the cooker control unit and start work',
        why: 'That switch is on the unit you’re replacing — its incoming terminals stay live with it off, and anyone can turn it back on. Isolate at the consumer unit and lock it.',
        tag: 'local_switch',
      },
    ],
    proveAfterFails: {
      choices: [
        {
          label:
            'The dead test can’t be trusted. Get a working indicator, prove it, repeat the dead test, then prove it again',
          correct: true,
          why: 'Right. If the indicator fails afterwards, you don’t know whether it was working when it read 0 V. The dead test has to be done again with an indicator proved before and after.',
        },
        {
          label: 'Every pair read 0 V, so it’s dead — carry on',
          correct: false,
          why: 'The 0 V readings only count if the indicator was working at the time. A failed re-prove means it may have failed before or during the test.',
        },
        {
          label: 'Change the indicator’s batteries and carry on without testing again',
          correct: false,
          why: 'New batteries don’t make the earlier readings trustworthy. Prove the indicator, repeat the dead test, and prove it again.',
        },
      ],
    },
    takeaway:
      'Proving the indicator afterwards is what makes the 0 V readings count. If it fails, the dead test hasn’t happened.',
  },
  {
    id: 'lighting',
    title: 'Replace a hallway ceiling light',
    kind: 'Single-phase equipment',
    brief:
      'A customer wants the pendant in their hallway replaced with a new light fitting. The lighting circuit is on a 6 A MCB in the consumer unit, with loop-in wiring at the ceiling rose.',
    pointOfWork: 'the terminals at the ceiling rose',
    // A loop-in rose also carries the switched line — test it too.
    testPairs: ['L–N', 'L–E', 'L–SL', 'N–E', 'SL–N', 'SL–E'],
    actions: [
      {
        id: 'identify',
        label: 'Identify the hallway lighting circuit on the schedule and confirm it',
        needs: [],
        tooEarly: '',
      },
      INFORM,
      {
        id: 'switchOff',
        label: 'Switch off the 6 A lighting MCB',
        needs: ['identify', 'inform'],
        tooEarly: 'Identify the circuit before you switch anything off.',
      },
      {
        id: 'lockOff',
        label: 'Fit an MCB lock-off and your padlock, and keep the key',
        needs: ['switchOff'],
        tooEarly: 'Switch it off before you lock it off.',
      },
      {
        id: 'notice',
        label: 'Fit a “Danger — do not switch on” notice at the consumer unit',
        needs: ['switchOff'],
        tooEarly: 'The notice goes on once the device is off.',
      },
      ...PROVE_ACTIONS,
      proveDeadAction('the ceiling rose terminals'),
      PROVE_AFTER,
    ],
    traps: [
      ...COMMON_TRAPS,
      {
        id: 'wallSwitch',
        label: 'Turn the light off at the wall switch and start work',
        why: 'A light switch only breaks the switched line. With loop-in wiring the permanent line and neutral at the ceiling rose stay live. Isolate at the consumer unit and lock it.',
        tag: 'local_switch',
      },
    ],
    takeaway:
      'A light switch is functional switching, not isolation. At a loop-in rose there is more live than the switched line.',
  },
];

/**
 * Safe Working Practices and Planning (AM2S v1, the first hour of the day):
 * isolate the assessment unit distribution board before the composite
 * installation. Kept out of SAFE_ISOLATION_SCENARIOS so Section C never deals
 * it. From the NET AM2S v1 Pre-Assessment Manual (v2025.03) — its six steps,
 * the 10 combinations on the OUTGOING side of the isolator in NET's order,
 * and its common errors: testing at the wrong position on the switch, not
 * proving the tester before and after, not keeping the key secure, no
 * warning notice. Our wording.
 */
export const ASSESSMENT_BOARD_ISOLATION: IsolationScenario = {
  id: 'assessmentBoard',
  title: 'Isolate the assessment unit distribution board',
  kind: 'Safe working: the assessment board',
  brief:
    'Before you start the composite installation, isolate the TP&N assessment unit distribution board in your bay. It is fed through a four-pole isolator beside the board. The assessor watches the whole procedure.',
  pointOfWork: 'the outgoing side of the isolator',
  testPairs: ['L1–L2', 'L1–L3', 'L1–N', 'L1–E', 'L2–L3', 'L2–N', 'L2–E', 'L3–N', 'L3–E', 'N–E'],
  actions: [
    {
      id: 'identify',
      label: 'Identify the point of isolation for the assessment board',
      needs: [],
      tooEarly: '',
    },
    {
      ...INFORM,
      label: 'Tell the assessor — your customer today — that you are isolating the supply',
    },
    {
      id: 'switchOff',
      label: 'Operate the isolator to OFF',
      needs: ['identify', 'inform'],
      tooEarly: 'Identify the point of isolation before you operate anything.',
    },
    {
      id: 'lockOff',
      label: 'Lock the isolator off and put the key somewhere secure — on you',
      needs: ['switchOff'],
      tooEarly: 'Operate the isolator to OFF before you lock it.',
    },
    {
      id: 'notice',
      label: 'Fit a warning notice to the isolator',
      needs: ['switchOff'],
      tooEarly: 'The notice goes on once the isolator is off.',
    },
    ...PROVE_ACTIONS,
    proveDeadAction('the outgoing side of the isolator — all 10 combinations'),
    PROVE_AFTER,
  ],
  traps: [
    ...COMMON_TRAPS,
    {
      id: 'supplySide',
      label: 'Test on the incoming (supply) side of the isolator',
      why: 'The incoming side of the isolator is still live when it is off — that is testing at the wrong position on the switch. Test on the outgoing side, where the board you are about to work on starts.',
      tag: 'wrong_point',
    },
    {
      id: 'keyInLock',
      label: 'Leave the key in the padlock so it’s easy to find later',
      why: 'If the key isn’t secure, someone else can take it and re-energise the board you’re working on. It stays on you.',
      tag: 'key',
    },
  ],
  takeaway:
    'Ten combinations on the outgoing side of the isolator — and the indicator proved before and after.',
};
