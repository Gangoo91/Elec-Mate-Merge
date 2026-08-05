/**
 * The teaching content behind each step of the Inspection & Testing path.
 *
 * Kept separate from `itLearningPath.ts`, which is the structural spine (order,
 * keys, phase). This file is what an apprentice actually reads.
 *
 * The shape is deliberate. A step used to expand into three bullet points and a
 * "Mark as learned" button, which taught nothing and recorded a tap. Each step
 * now runs: why it matters → how it is done → a worked example with real
 * numbers → questions you have to get right. Completion is earned by answering,
 * not by self-certifying.
 *
 * Conductor resistances used in the worked examples are the BS 7671 Table I1
 * values already in `eic-transformer.ts` (2.5mm² = 7.41 mΩ/m, 1.5mm² = 12.1
 * mΩ/m). Zs limits come from `zsLimits.ts`. Nothing here is invented: every
 * number can be traced to the same tables the certificates validate against.
 */

export interface CheckQuestion {
  q: string;
  options: string[];
  /** Index into `options`. */
  answer: number;
  /** Shown after answering, right or wrong — the teaching is in here. */
  explain: string;
}

export interface StepContent {
  /**
   * The regulation this test sits under, taken from `bs7671_facets` — not from
   * memory. Where a step is not a BS 7671 test at all (safe isolation is HSE
   * territory) that is said plainly, rather than a plausible-looking number
   * being attached to it.
   */
  regulation: string;
  /** What goes wrong in the real world if this test is skipped or fudged. */
  why: string;
  /** The procedure, in the order it is carried out. */
  how: string[];
  /** A worked example with real figures. */
  worked: { title: string; lines: string[]; verdict: string };
  questions: CheckQuestion[];
}

export const STEP_CONTENT: Record<string, StepContent> = {
  'safe-isolation': {
    regulation:
      'Not a BS 7671 test — this is HSE GS38 and the Electricity at Work Regulations',
    why: 'Every year electricians are killed or badly burned working on circuits they believed were dead. Almost always the circuit was switched off but never proved dead, or the wrong way was switched off.',
    how: [
      'Identify the circuit, and get permission to isolate it.',
      'Isolate at the point of supply — switch off and, where possible, withdraw the fuse or lock off the breaker.',
      'Secure the isolation: lock off, keep the only key, fit a warning notice.',
      'Prove your voltage indicator works on a known live source or a proving unit.',
      'Test the circuit dead — line to neutral, line to earth, neutral to earth. All combinations.',
      'Prove your voltage indicator still works on the proving unit. If it failed between the two checks, your dead reading meant nothing.',
    ],
    worked: {
      title: 'Proving a lighting circuit dead',
      lines: [
        'Proving unit → indicator reads 230 V. Indicator works.',
        'L–N: 0 V · L–E: 0 V · N–E: 0 V',
        'Proving unit → indicator reads 230 V again. Still working.',
      ],
      verdict: 'Safe to work. Both proving checks passed, so the zeros are trustworthy.',
    },
    questions: [
      {
        q: 'You test a circuit dead, then your voltage indicator fails when you re-prove it. What does your dead reading tell you?',
        options: [
          'The circuit is dead — you tested it',
          'Nothing at all — re-isolate and start again',
          "It's fine as long as the breaker is off",
        ],
        answer: 1,
        explain:
          'A faulty indicator reads zero on a live conductor. If it failed at any point after the first prove, the zeros prove nothing and the whole test is void.',
      },
      {
        q: 'Which instrument is acceptable for proving dead?',
        options: [
          'A multimeter on the AC volts range',
          'A non-contact voltage pen',
          'An approved voltage indicator to GS38',
        ],
        answer: 2,
        explain:
          'Only an approved voltage indicator to GS38. A multimeter can be on the wrong range and read zero on a live conductor; a non-contact pen cannot prove absence of voltage.',
      },
    ],
  },

  'continuity-cpc': {
    regulation:
      'BS 7671 Reg 643.2.1 — covers the earthing conductor, every circuit protective conductor, and all main protective bonding conductors',
    why: 'If the cpc is broken or high-resistance, a fault will not clear. The metalwork stays live and the breaker never trips — the exact condition automatic disconnection is meant to prevent.',
    how: [
      'Isolate and prove dead first.',
      'Null the test leads, or note their resistance and subtract it.',
      'R1+R2 method: link line and cpc together at the board.',
      'Test between line and cpc at each point on the circuit.',
      'The furthest point gives the highest reading — that is the value you record.',
      'Compare against what the cable length and csa say it should be.',
    ],
    worked: {
      title: '18 m of 2.5/1.5 twin and earth',
      lines: [
        'R1 (2.5mm²) = 7.41 mΩ/m × 18 m = 0.133 Ω',
        'R2 (1.5mm²) = 12.1 mΩ/m × 18 m = 0.218 Ω',
        'Expected R1+R2 = 0.351 Ω',
        'Measured at the furthest socket: 0.36 Ω',
      ],
      verdict: 'Sound — the measurement matches the calculation, so the cpc is continuous.',
    },
    questions: [
      {
        q: 'You calculate R1+R2 should be 0.35 Ω but measure 0.04 Ω. What is the most likely cause?',
        options: [
          'A very good connection',
          'A parallel path — bonding or steelwork carrying the test current',
          'The cable is shorter than you thought',
        ],
        answer: 1,
        explain:
          'A reading far below the calculation means current is returning by another route. That path may not be there under fault conditions, so it can hide a broken cpc.',
      },
      {
        q: 'Why null the test leads first?',
        options: [
          'To calibrate the instrument to the cable',
          'Because lead resistance adds to every reading and inflates the result',
          'It is optional on modern testers',
        ],
        answer: 1,
        explain:
          'Lead resistance can be a few hundredths of an ohm. On a short circuit with a low expected R1+R2, that is a large proportion of the reading.',
      },
    ],
  },

  'continuity-ring': {
    regulation:
      'BS 7671 Reg 643.2 — the cpc must be routed as a ring, both ends back to the origin, so that automatic disconnection works on a fault',
    why: 'A ring with a broken leg behaves as a long radial. Cable that was sized on the basis of current splitting two ways now carries it all one way, and can overheat without the breaker ever operating.',
    how: [
      'Isolate and prove dead. Null the leads.',
      'Step 1 — measure end to end: r1 (line), rn (neutral), r2 (cpc), with each pair disconnected from each other.',
      'Step 2 — cross-connect line of one leg to neutral of the other, and measure at each socket. Readings should be near identical.',
      'Step 3 — repeat cross-connected line to cpc. Measure at each socket.',
      'The step 3 readings are your R1+R2 for the circuit.',
    ],
    worked: {
      title: '2.5/1.5 ring, end-to-end readings',
      lines: [
        'r1 = 0.52 Ω · rn = 0.53 Ω · r2 = 0.86 Ω',
        'r1 and rn agree, so the ring is continuous.',
        'Expected reading at each socket = (r1 + r2) / 4 = (0.52 + 0.86) / 4 = 0.345 Ω',
        'Measured at sockets: 0.34 – 0.36 Ω across all of them',
      ],
      verdict: 'A healthy ring — consistent readings mean no interconnection and no broken leg.',
    },
    questions: [
      {
        q: 'At the board r1 and rn agree nicely, but socket readings vary from 0.28 Ω to 0.51 Ω. What does that suggest?',
        options: [
          'Normal variation — sockets are at different distances',
          'An interconnection in the ring',
          'The cpc is undersized',
        ],
        answer: 1,
        explain:
          'On a correct ring every socket reads roughly the same, because each is the same total loop away. Widely varying readings mean the ring has been bridged somewhere.',
      },
      {
        q: 'For 2.5mm² line with a 1.5mm² cpc, roughly what should r2 be compared with r1?',
        options: ['About the same', 'About 1.67 times r1', 'About half r1'],
        answer: 1,
        explain:
          'Resistance is inversely proportional to csa, so 2.5 ÷ 1.5 = 1.67. A cpc reading close to r1 suggests it is not the size you think it is.',
      },
    ],
  },

  'insulation-resistance': {
    regulation:
      'BS 7671 Reg 643.3.1(a) — measured between live conductors. Minimum values and test voltages come from Table 64',
    why: 'Degraded insulation is how live conductors find earth, or each other. It causes nuisance tripping, fires, and shocks — and it develops long before it fails completely, which is why the trend matters more than the pass mark.',
    how: [
      'Isolate and prove dead. Warn anyone nearby — this test applies 500 V.',
      'Disconnect or bypass anything that cannot take 500 V DC: dimmers, electronics, SPDs, LED drivers.',
      'Remove lamps and switch all functional switches to on so the whole circuit is included.',
      'Test between live conductors, and between live conductors joined together and earth.',
      'Record the lowest value obtained.',
    ],
    worked: {
      title: 'A 230 V lighting circuit',
      lines: [
        'Test voltage: 500 V DC',
        'L–N: >299 MΩ · L–E: >299 MΩ · N–E: >299 MΩ',
        'Minimum permitted: 1.0 MΩ (BS 7671 Table 64)',
      ],
      verdict: 'Sound. Hundreds of megohms is what healthy insulation looks like.',
    },
    questions: [
      {
        q: 'A circuit reads 1.4 MΩ. The minimum is 1.0 MΩ. What should you do?',
        options: [
          'Record it as a pass and move on',
          'Pass it, but investigate — it is far below what healthy insulation reads',
          'Fail it immediately',
        ],
        answer: 1,
        explain:
          'It technically complies, but a sound circuit reads hundreds of megohms. A value that close to the limit is deterioration in progress and warrants investigation and a note on the certificate.',
      },
      {
        q: 'What test voltage do you use on a SELV circuit?',
        options: ['500 V DC', '250 V DC', '1000 V DC'],
        answer: 1,
        explain:
          'Table 64 gives 250 V DC for SELV and PELV, with a 0.5 MΩ minimum. Using 500 V risks damaging equipment on the circuit.',
      },
    ],
  },

  polarity: {
    regulation:
      'BS 7671 Reg 643.6 — verifies that single-pole switching devices are connected in the line conductor only',
    why: 'Reversed polarity leaves a circuit live when it looks switched off. Someone changes a lamp with the switch off and gets a shock from a conductor that should have been isolated.',
    how: [
      'Isolate and prove dead.',
      'Link line and cpc at the origin, as for the R1+R2 test.',
      'Confirm at every point that single-pole devices — switches, fuses, circuit-breakers — are in the line conductor.',
      'Confirm the centre contact of Edison screw lampholders is connected to line.',
      'Confirm socket-outlet wiring is correct at every outlet, not just the first.',
      'Repeat as a live check once energised.',
    ],
    worked: {
      title: 'A switched lighting point',
      lines: [
        'Switch off: no continuity through the switch — the break is in the line.',
        'Switch on: continuity restored.',
        'Lampholder centre contact reads to line, not neutral.',
      ],
      verdict: 'Correct polarity. Switching the light off genuinely isolates the lamp.',
    },
    questions: [
      {
        q: 'Why is proving polarity only at the consumer unit not enough?',
        options: [
          'It is enough — the board feeds everything',
          'A crossover further along still passes that check and leaves a switched neutral',
          'Because the board is not part of the circuit',
        ],
        answer: 1,
        explain:
          'Polarity can be correct at the origin and reversed at an accessory further down. Every point has to be confirmed.',
      },
      {
        q: 'A single-pole switch has been wired into the neutral. What is the danger?',
        options: [
          'None, the light still works',
          'The lamp stays live when switched off',
          'The circuit will trip on load',
        ],
        answer: 1,
        explain:
          'The light appears off, but the lampholder remains at line potential. Anyone changing the lamp is exposed to a live conductor.',
      },
    ],
  },

  'earth-fault-loop-impedance': {
    regulation:
      'BS 7671 Reg 643.7.1 · maximum Zs values from Table 41.3. A4:2026 moved the loop impedance material into Appendix 3',
    why: 'The whole of automatic disconnection depends on this. If Zs is too high, not enough fault current flows, the device takes too long to operate, and metalwork stays live long enough to kill.',
    how: [
      'Measure Ze at the origin, with the main earthing conductor disconnected from the earthing terminal.',
      'Reconnect, and re-prove the main earthing conductor.',
      'Measure Zs at the furthest point of each circuit.',
      'Check Zs ≈ Ze + (R1+R2). If it is not, something is wrong with one of the three.',
      'Compare against the maximum for that device, allowing for conductor temperature.',
    ],
    worked: {
      title: 'A 32 A Type B ring final',
      lines: [
        'Ze = 0.35 Ω · R1+R2 = 0.35 Ω',
        'Expected Zs = 0.35 + 0.35 = 0.70 Ω',
        'Measured Zs = 0.72 Ω',
        'Maximum for a B32 = 1.37 Ω (BS 7671 Table 41.3)',
        'Cold-measured rule-of-thumb limit = 1.37 × 0.8 = 1.10 Ω',
      ],
      verdict: 'Comfortable pass — 0.72 Ω is well inside even the 0.8 factor limit.',
    },
    questions: [
      {
        q: 'You measure 1.42 Ω on a 32 A Type B circuit. The table maximum is 1.37 Ω. What is the result?',
        options: [
          'A pass — it is within 5%',
          'A fail — it exceeds the maximum permitted Zs',
          'A pass if the RCD works',
        ],
        answer: 1,
        explain:
          'It exceeds the limit, so disconnection cannot be guaranteed in time. There is no tolerance to spend: the table figure already has Cmin applied.',
      },
      {
        q: 'Why apply a 0.8 factor when testing on site?',
        options: [
          'To build in a safety margin for the client',
          'Because you measure on cold conductors, and resistance rises as they warm under load',
          'Because instruments read 20% low',
        ],
        answer: 1,
        explain:
          'Table values assume conductors at operating temperature. A cold reading is optimistic, so comparing against 80% of the table figure keeps you honest.',
      },
    ],
  },

  'prospective-fault-current': {
    regulation:
      'BS 7671 Reg 434.1 — determined at every relevant point by calculation, measurement or enquiry. Methods sit in Appendix 14, which A4:2026 redefined for exactly this',
    why: 'If a fault current exceeds what the protective device can safely interrupt, the device does not just fail — it can rupture explosively at the board.',
    how: [
      'Measure prospective short-circuit current between line and neutral.',
      'Measure prospective earth-fault current between line and earth.',
      'Record the higher of the two — that is the prospective fault current.',
      'On three-phase, measure between phases as well and take the highest.',
      'Compare against the breaking capacity marked on the devices.',
    ],
    worked: {
      title: 'A domestic origin',
      lines: [
        'PSCC (L–N) = 1.2 kA',
        'PEFC (L–E) = 0.8 kA',
        'Record the higher: 1.2 kA',
        'Devices marked 6 kA breaking capacity',
      ],
      verdict: 'Adequate — 1.2 kA is well within the 6 kA the devices can interrupt.',
    },
    questions: [
      {
        q: 'PSCC is 0.9 kA and PEFC is 1.4 kA. What do you record?',
        options: ['0.9 kA', '1.4 kA', 'The average, 1.15 kA'],
        answer: 1,
        explain:
          'You record the highest value, because the device has to cope with the worst case. Measuring only line to neutral would have missed it here.',
      },
      {
        q: 'What is the prospective fault current compared against?',
        options: [
          "The device's breaking capacity",
          'The circuit design current',
          'The maximum Zs',
        ],
        answer: 0,
        explain:
          "It is compared against the breaking capacity marked on the protective device — the largest current it can interrupt safely.",
      },
    ],
  },

  'rcd-operation': {
    regulation:
      'BS 7671 Reg 643.8 where the RCD provides additional protection, using test equipment to BS EN 61557-6 (Reg 643.1)',
    why: 'An RCD is the last line of defence when someone contacts a live part, or when a cable is driven through. It either operates in tens of milliseconds or it does not protect anyone. Guidance Note 3 also warns that this test uses the supply voltage and can put earthed metalwork at a hazardous touch potential — control access to exposed conductive parts while you do it.',
    how: [
      'Test with the load disconnected where practicable.',
      'At 1× rated residual current, it must trip within 300 ms for a general non-delay type. A Type S must trip between 130 ms and 500 ms.',
      'At 5× rated residual current, it must trip within 40 ms.',
      'Test on both polarities (0° and 180°) and record the longer time.',
      'A half-current check (no trip at ½× IΔn) is standard practice from the device standard rather than a BS 7671 requirement — useful, because tripping there points to a faulty device or high standing leakage.',
      'Finally, operate the integral test button to prove the mechanism.',
    ],
    worked: {
      title: 'A 30 mA RCD',
      lines: [
        '½× (15 mA): no trip ✓',
        '1× (30 mA): 24 ms and 27 ms — worst case 27 ms, limit 300 ms ✓',
        '5× (150 mA): 18 ms and 21 ms — worst case 21 ms, limit 40 ms ✓',
      ],
      verdict: 'Passes on both polarities with a good margin.',
    },
    questions: [
      {
        q: 'A general non-delay 30 mA RCD trips in 240 ms at its rated residual current. Does it pass?',
        options: [
          'No — it must trip within 40 ms',
          'Yes — the limit at 1× IΔn is 300 ms',
          'Only if it is a Type S',
        ],
        answer: 1,
        explain:
          'At 1× IΔn a general non-delay type must operate within 300 ms, so 240 ms passes. The 40 ms figure belongs to the 5× test. A Type S is different again — it must trip between 130 ms and 500 ms, because it is deliberately delayed to discriminate with RCDs downstream.',
      },
      {
        q: 'Is the integral test button sufficient evidence the RCD is working?',
        options: [
          'Yes, that is what it is for',
          'No — it proves the mechanism moves but not that it trips within the required time',
          'Yes, if pressed twice',
        ],
        answer: 1,
        explain:
          'The button confirms the mechanism operates. Only an instrument test measures the disconnection time, which is what actually protects someone.',
      },
    ],
  },

  'functional-testing': {
    regulation:
      'BS 7671 Reg 643.10 — the main switch, manual operation of circuit-breakers, RCDs and AFDDs, and every RCD test button',
    why: 'Everything can pass every measurement and still not work. Functional testing is the only step that checks the installation does what the client actually asked for.',
    how: [
      'Operate all switchgear, controls and interlocks.',
      'Check every RCD and RCBO test button.',
      'Confirm motors, controls and automatic devices work as intended.',
      'Check equipment is correctly assembled, adjusted and installed.',
      'Confirm labelling, warning notices and the schedule at the board are correct and legible.',
    ],
    worked: {
      title: 'Consumer unit change, final checks',
      lines: [
        'All breakers operate and reset.',
        'RCD test buttons trip their devices.',
        'Two-way lighting works from both switch positions.',
        'Board is labelled and the schedule matches what is installed.',
      ],
      verdict: 'Complete — the installation works, and the next person can understand it.',
    },
    questions: [
      {
        q: 'The board is labelled from the old installation and no longer matches. Does that matter?',
        options: [
          'No, the circuits all work',
          'Yes — the next person isolates the wrong circuit believing the label',
          'Only for commercial installations',
        ],
        answer: 1,
        explain:
          'A wrong label is a safety defect. Someone will rely on it to isolate, and will work on a circuit they believe is dead.',
      },
      {
        q: 'When is functional testing carried out?',
        options: [
          'Before the dead tests',
          'After the installation is energised and the other tests have passed',
          'Only if the client asks',
        ],
        answer: 1,
        explain:
          'It is the last step, once everything else has proved the installation is safe to energise and use.',
      },
    ],
  },
};
