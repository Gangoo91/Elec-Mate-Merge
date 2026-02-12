/**
 * AM2 Fault Finding Scenarios
 *
 * Based on the real AM2 assessment: 7 random faults across circuit types.
 * All faults are WIRING faults — no faulty components.
 * Four categories: open circuit, short circuit, reversed polarity, high resistance.
 * Only tools allowed: multimeter (continuity and insulation resistance).
 */

export type FaultType = 'open_circuit' | 'short_circuit' | 'reversed_polarity' | 'high_resistance';
export type TestMode = 'continuity' | 'insulation';

export interface TestReading {
  id: string;
  label: string;
  mode: TestMode;
  reading: string; // The display value: "0.35", "OL", "150.0"
  unit: string; // "Ω" or "MΩ"
  isAbnormal: boolean;
  isKey: boolean; // Is this a key reading for diagnosis?
}

export interface TestPoint {
  id: string;
  location: string;
  description: string;
  tests: TestReading[];
}

export interface DiagnosisOption {
  id: string;
  label: string;
  isCorrect: boolean;
}

export interface FaultScenario {
  id: string;
  circuitType: string;
  circuitName: string;
  circuitIcon: string; // Lucide icon name hint
  symptom: string;
  faultType: FaultType;
  testPoints: TestPoint[];
  diagnosisOptions: DiagnosisOption[];
  correctFaultType: FaultType;
  correctLocation: string;
  rectification: string;
  explanation: string;
  optimalMethod: string; // How an expert would find it
}

// --- Fault Scenario Pool ---
// One scenario per circuit type. Sessions pick 7 randomly.

export const FAULT_SCENARIOS: FaultScenario[] = [
  // 1. RING MAIN — Short circuit L-E
  {
    id: 'ring-lpe-short',
    circuitType: 'ring_main',
    circuitName: 'Ring Final Circuit',
    circuitIcon: 'Plug',
    symptom:
      'The RCD trips immediately when the MCB for the ring final circuit is switched on. No load is connected.',
    faultType: 'short_circuit',
    testPoints: [
      {
        id: 'ring-db',
        location: 'Distribution Board',
        description: 'Ring final MCB outgoing terminals',
        tests: [
          {
            id: 'ring-db-ln',
            label: 'L to N',
            mode: 'insulation',
            reading: '250.0',
            unit: 'MΩ',
            isAbnormal: false,
            isKey: false,
          },
          {
            id: 'ring-db-le',
            label: 'L to CPC',
            mode: 'insulation',
            reading: '0.15',
            unit: 'MΩ',
            isAbnormal: true,
            isKey: true,
          },
          {
            id: 'ring-db-ne',
            label: 'N to CPC',
            mode: 'insulation',
            reading: '280.0',
            unit: 'MΩ',
            isAbnormal: false,
            isKey: false,
          },
          {
            id: 'ring-db-cont-l',
            label: 'L end-to-end',
            mode: 'continuity',
            reading: '0.85',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
        ],
      },
      {
        id: 'ring-s1',
        location: 'Socket 1',
        description: 'First socket on the ring — disconnect and test each side',
        tests: [
          {
            id: 'ring-s1-le-left',
            label: 'L to CPC (board side)',
            mode: 'insulation',
            reading: '300.0',
            unit: 'MΩ',
            isAbnormal: false,
            isKey: true,
          },
          {
            id: 'ring-s1-le-right',
            label: 'L to CPC (far side)',
            mode: 'insulation',
            reading: '0.15',
            unit: 'MΩ',
            isAbnormal: true,
            isKey: true,
          },
        ],
      },
      {
        id: 'ring-s2',
        location: 'Socket 2',
        description: 'Second socket — between Socket 1 and Socket 3',
        tests: [
          {
            id: 'ring-s2-le',
            label: 'L to CPC',
            mode: 'insulation',
            reading: '0.12',
            unit: 'MΩ',
            isAbnormal: true,
            isKey: true,
          },
          {
            id: 'ring-s2-cont',
            label: 'L to N',
            mode: 'continuity',
            reading: '0.30',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
        ],
      },
      {
        id: 'ring-s3',
        location: 'Socket 3',
        description: 'Third socket — test from this end',
        tests: [
          {
            id: 'ring-s3-le',
            label: 'L to CPC',
            mode: 'insulation',
            reading: '310.0',
            unit: 'MΩ',
            isAbnormal: false,
            isKey: false,
          },
        ],
      },
    ],
    diagnosisOptions: [
      {
        id: 'a',
        label: 'Open circuit in line conductor between Socket 1 and Socket 2',
        isCorrect: false,
      },
      { id: 'b', label: 'Short circuit between line and CPC near Socket 2', isCorrect: true },
      { id: 'c', label: 'Reversed polarity at Socket 2', isCorrect: false },
      { id: 'd', label: 'High resistance in CPC at the distribution board', isCorrect: false },
    ],
    correctFaultType: 'short_circuit',
    correctLocation: 'Between Socket 1 and Socket 2, on the line to CPC',
    rectification:
      'Replace or repair the cable between Socket 1 and Socket 2. Check for damage to insulation at fixings or bends.',
    explanation:
      'The low insulation resistance reading (0.15 MΩ) between L and CPC at the board confirms an insulation fault. By disconnecting at Socket 1, the board side reads normal but the far side stays low — localising the fault between Socket 1 and Socket 2.',
    optimalMethod:
      '1. IR test at board (L-CPC low = fault confirmed). 2. Disconnect at midpoint. 3. Test each half. 4. The half with low IR contains the fault. 5. Narrow down further if needed.',
  },

  // 2. LIGHTING — Open circuit at intermediate switch
  {
    id: 'lighting-open-int',
    circuitType: 'lighting',
    circuitName: '2-Way & Intermediate Lighting',
    circuitIcon: 'Lightbulb',
    symptom:
      'The light operates from one 2-way switch but not when the intermediate switch is used. The light was working before the intermediate switch was replaced.',
    faultType: 'open_circuit',
    testPoints: [
      {
        id: 'light-db',
        location: 'Distribution Board',
        description: 'Lighting MCB outgoing terminals',
        tests: [
          {
            id: 'light-db-cont',
            label: 'L continuity to light',
            mode: 'continuity',
            reading: 'OL',
            unit: 'Ω',
            isAbnormal: true,
            isKey: false,
          },
          {
            id: 'light-db-ir',
            label: 'L to N insulation',
            mode: 'insulation',
            reading: '200.0',
            unit: 'MΩ',
            isAbnormal: false,
            isKey: false,
          },
        ],
      },
      {
        id: 'light-sw1',
        location: '2-Way Switch 1',
        description: 'First 2-way switch — strappers connect to intermediate',
        tests: [
          {
            id: 'light-sw1-s1',
            label: 'Strapper 1 to intermediate',
            mode: 'continuity',
            reading: '0.25',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
          {
            id: 'light-sw1-s2',
            label: 'Strapper 2 to intermediate',
            mode: 'continuity',
            reading: '0.20',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
        ],
      },
      {
        id: 'light-int',
        location: 'Intermediate Switch',
        description: 'Intermediate switch — strappers cross over here',
        tests: [
          {
            id: 'light-int-in1',
            label: 'Input strapper 1 to output strapper 1',
            mode: 'continuity',
            reading: '0.15',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
          {
            id: 'light-int-in2',
            label: 'Input strapper 2 to output strapper 2',
            mode: 'continuity',
            reading: 'OL',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
          {
            id: 'light-int-cross',
            label: 'Input strapper 2 to output strapper 1',
            mode: 'continuity',
            reading: '0.18',
            unit: 'Ω',
            isAbnormal: false,
            isKey: true,
          },
        ],
      },
      {
        id: 'light-sw2',
        location: '2-Way Switch 2',
        description: 'Second 2-way switch',
        tests: [
          {
            id: 'light-sw2-common',
            label: 'Common to switch wire',
            mode: 'continuity',
            reading: '0.30',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
        ],
      },
    ],
    diagnosisOptions: [
      {
        id: 'a',
        label: 'Open circuit — strapper connected to wrong terminal at intermediate switch',
        isCorrect: true,
      },
      { id: 'b', label: 'Short circuit between strappers', isCorrect: false },
      { id: 'c', label: 'Open circuit in switch wire at 2-way switch 2', isCorrect: false },
      { id: 'd', label: 'Reversed polarity at the light fitting', isCorrect: false },
    ],
    correctFaultType: 'open_circuit',
    correctLocation: 'At the intermediate switch — strapper connected to the wrong terminal',
    rectification:
      'Reconnect strapper 2 to the correct output terminal on the intermediate switch. The strappers must cross correctly through the switch.',
    explanation:
      'Continuity through one strapper path is fine (0.15Ω) but the other reads OL. However, testing cross-ways (input 2 to output 1) gives a reading — the strappers are on the wrong terminals. This happened when the intermediate switch was replaced.',
    optimalMethod:
      '1. Test continuity through each strapper pair at the intermediate switch. 2. If one reads OL, test cross-ways. 3. A reading cross-ways confirms the strappers are swapped on the switch terminals.',
  },

  // 3. 3-PHASE MOTOR (DOL) — Open circuit on one phase
  {
    id: 'motor-open-phase',
    circuitType: 'motor_dol',
    circuitName: '3-Phase Motor (DOL Starter)',
    circuitIcon: 'Cog',
    symptom:
      'The motor hums loudly but does not start. The overload trips after a few seconds. All three phases are confirmed present at the isolator.',
    faultType: 'open_circuit',
    testPoints: [
      {
        id: 'motor-isolator',
        location: 'TPN Isolator',
        description: 'Three-phase isolator outgoing side',
        tests: [
          {
            id: 'motor-iso-l1',
            label: 'L1 continuity to DOL',
            mode: 'continuity',
            reading: '0.20',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
          {
            id: 'motor-iso-l2',
            label: 'L2 continuity to DOL',
            mode: 'continuity',
            reading: '0.25',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
          {
            id: 'motor-iso-l3',
            label: 'L3 continuity to DOL',
            mode: 'continuity',
            reading: '0.22',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
        ],
      },
      {
        id: 'motor-dol',
        location: 'DOL Starter',
        description: 'Direct-on-line starter — contactor and overload',
        tests: [
          {
            id: 'motor-dol-l1',
            label: 'L1 through contactor to motor',
            mode: 'continuity',
            reading: '0.35',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
          {
            id: 'motor-dol-l2',
            label: 'L2 through contactor to motor',
            mode: 'continuity',
            reading: 'OL',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
          {
            id: 'motor-dol-l3',
            label: 'L3 through contactor to motor',
            mode: 'continuity',
            reading: '0.30',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
        ],
      },
      {
        id: 'motor-terminals',
        location: 'Motor Terminal Box',
        description: 'Motor terminals T1, T2, T3',
        tests: [
          {
            id: 'motor-t1-t2',
            label: 'T1 to T2 (winding)',
            mode: 'continuity',
            reading: '2.50',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
          {
            id: 'motor-t2-t3',
            label: 'T2 to T3 (winding)',
            mode: 'continuity',
            reading: '2.45',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
          {
            id: 'motor-t1-t3',
            label: 'T1 to T3 (winding)',
            mode: 'continuity',
            reading: '2.55',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
        ],
      },
    ],
    diagnosisOptions: [
      { id: 'a', label: 'Motor winding fault — open circuit in T2 winding', isCorrect: false },
      { id: 'b', label: 'Open circuit on L2 between DOL starter and motor', isCorrect: true },
      { id: 'c', label: 'Overload set incorrectly', isCorrect: false },
      { id: 'd', label: 'Reversed phase rotation at the isolator', isCorrect: false },
    ],
    correctFaultType: 'open_circuit',
    correctLocation: 'In the cable between DOL starter output and motor on L2',
    rectification:
      'Check the SY cable connection at the DOL starter L2 output terminal and the motor terminal box. Re-terminate or replace the cable.',
    explanation:
      'All three phases reach the DOL from the isolator (OK). But L2 through the contactor to the motor reads OL — open circuit. The motor windings test fine (balanced ~2.5Ω between all terminals). So the fault is in the cable between DOL and motor on L2.',
    optimalMethod:
      '1. Test continuity through each phase from DOL to motor. 2. OL on L2 = open circuit. 3. Verify motor windings are balanced. 4. Fault is in the cable, not the motor.',
  },

  // 4. EARTH BONDING — High resistance
  {
    id: 'bonding-high-r',
    circuitType: 'bonding',
    circuitName: 'Protective Bonding',
    circuitIcon: 'Shield',
    symptom:
      'During testing, the main bonding conductor to the water pipe shows an unusually high reading. The bonding conductor appears to be connected.',
    faultType: 'high_resistance',
    testPoints: [
      {
        id: 'bond-met',
        location: 'Main Earthing Terminal',
        description: 'MET — where all bonding conductors connect',
        tests: [
          {
            id: 'bond-met-gas',
            label: 'MET to gas pipe bond',
            mode: 'continuity',
            reading: '0.10',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
          {
            id: 'bond-met-water',
            label: 'MET to water pipe bond',
            mode: 'continuity',
            reading: '8.50',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
        ],
      },
      {
        id: 'bond-water-clamp',
        location: 'Water Pipe Bonding Clamp',
        description: 'Earth clamp on the incoming water pipe',
        tests: [
          {
            id: 'bond-clamp-pipe',
            label: 'Clamp to pipe (direct)',
            mode: 'continuity',
            reading: '7.80',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
          {
            id: 'bond-clamp-cond',
            label: 'Clamp to bonding conductor',
            mode: 'continuity',
            reading: '0.15',
            unit: 'Ω',
            isAbnormal: false,
            isKey: true,
          },
        ],
      },
      {
        id: 'bond-gas-clamp',
        location: 'Gas Pipe Bonding Clamp',
        description: 'Earth clamp on the incoming gas pipe',
        tests: [
          {
            id: 'bond-gas-clamp-pipe',
            label: 'Clamp to pipe',
            mode: 'continuity',
            reading: '0.05',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
        ],
      },
    ],
    diagnosisOptions: [
      { id: 'a', label: 'Open circuit in bonding conductor', isCorrect: false },
      {
        id: 'b',
        label: 'High resistance at the water pipe bonding clamp connection',
        isCorrect: true,
      },
      { id: 'c', label: 'Bonding conductor undersized', isCorrect: false },
      { id: 'd', label: 'MET connection loose', isCorrect: false },
    ],
    correctFaultType: 'high_resistance',
    correctLocation: 'Water pipe bonding clamp — corroded or loose connection to pipe',
    rectification:
      'Clean the pipe surface, tighten or replace the bonding clamp. Re-test to confirm reading below 0.05Ω.',
    explanation:
      'The bonding conductor itself is fine (clamp to conductor = 0.15Ω). But clamp to pipe reads 7.80Ω — the high resistance is at the clamp-to-pipe interface. Corrosion or a loose clamp is preventing a good earth connection.',
    optimalMethod:
      '1. Test MET to each pipe. 2. High reading on water = fault. 3. Test at the clamp: conductor side vs pipe side. 4. High reading clamp-to-pipe confirms corroded/loose clamp.',
  },

  // 5. SMOKE/CO DETECTOR — Reversed polarity
  {
    id: 'co-reversed-pol',
    circuitType: 'smoke_co',
    circuitName: 'CO Detector Circuit',
    circuitIcon: 'AlertTriangle',
    symptom:
      'The carbon monoxide detector does not power on after installation. The fuse in the FCU is intact and the MCB is on.',
    faultType: 'reversed_polarity',
    testPoints: [
      {
        id: 'co-db',
        location: 'Distribution Board',
        description: '6A MCB for CO detector circuit',
        tests: [
          {
            id: 'co-db-l-out',
            label: 'L outgoing continuity',
            mode: 'continuity',
            reading: '0.40',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
          {
            id: 'co-db-ir',
            label: 'L to N insulation',
            mode: 'insulation',
            reading: '300.0',
            unit: 'MΩ',
            isAbnormal: false,
            isKey: false,
          },
        ],
      },
      {
        id: 'co-fcu',
        location: 'Fused Connection Unit',
        description: 'FCU supplying the CO detector via FP200 cable',
        tests: [
          {
            id: 'co-fcu-l-in',
            label: 'Board L to FCU L terminal',
            mode: 'continuity',
            reading: '0.40',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
          {
            id: 'co-fcu-l-out',
            label: 'Board L to FCU load L',
            mode: 'continuity',
            reading: 'OL',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
          {
            id: 'co-fcu-n-out',
            label: 'Board L to FCU load N',
            mode: 'continuity',
            reading: '0.45',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
        ],
      },
      {
        id: 'co-detector',
        location: 'CO Detector',
        description: 'CO detector terminals',
        tests: [
          {
            id: 'co-det-polarity',
            label: 'L terminal to board L',
            mode: 'continuity',
            reading: 'OL',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
          {
            id: 'co-det-n-to-l',
            label: 'N terminal to board L',
            mode: 'continuity',
            reading: '0.50',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
        ],
      },
    ],
    diagnosisOptions: [
      { id: 'a', label: 'Open circuit in FP200 cable', isCorrect: false },
      { id: 'b', label: 'Fuse blown in FCU', isCorrect: false },
      {
        id: 'c',
        label: 'Reversed polarity — L and N swapped at the FCU load side',
        isCorrect: true,
      },
      { id: 'd', label: 'Short circuit in the detector', isCorrect: false },
    ],
    correctFaultType: 'reversed_polarity',
    correctLocation: 'At the FCU — line and neutral cables swapped on the load side terminals',
    rectification:
      'Swap the line and neutral connections on the load side of the FCU. Re-test polarity before energising.',
    explanation:
      "Board L to FCU line terminal is fine (0.40Ω) — supply side correct. But board L to FCU load L reads OL, while board L to FCU load N reads 0.45Ω. Line and neutral are swapped on the load side. The detector won't work with reversed polarity.",
    optimalMethod:
      '1. Confirm supply reaches FCU line terminal. 2. Test from board L to each load terminal. 3. If L goes to N position = reversed polarity. 4. Swap connections at FCU load side.',
  },

  // 6. DATA CIRCUIT — Open circuit
  {
    id: 'data-open',
    circuitType: 'data',
    circuitName: 'Data Circuit (Cat 5)',
    circuitIcon: 'Network',
    symptom: 'The data connection at one outlet is not working. The patch panel end tests fine.',
    faultType: 'open_circuit',
    testPoints: [
      {
        id: 'data-patch',
        location: 'Patch Panel',
        description: 'Patch panel termination point',
        tests: [
          {
            id: 'data-pair1',
            label: 'Pair 1 (pins 4-5) to outlet',
            mode: 'continuity',
            reading: '0.80',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
          {
            id: 'data-pair2',
            label: 'Pair 2 (pins 1-2) to outlet',
            mode: 'continuity',
            reading: 'OL',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
          {
            id: 'data-pair3',
            label: 'Pair 3 (pins 3-6) to outlet',
            mode: 'continuity',
            reading: '0.75',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
          {
            id: 'data-pair4',
            label: 'Pair 4 (pins 7-8) to outlet',
            mode: 'continuity',
            reading: '0.82',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
        ],
      },
      {
        id: 'data-outlet',
        location: 'Data Outlet',
        description: 'RJ45 data outlet',
        tests: [
          {
            id: 'data-out-pair2',
            label: 'Pair 2 pins at outlet',
            mode: 'continuity',
            reading: 'OL',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
        ],
      },
    ],
    diagnosisOptions: [
      {
        id: 'a',
        label: 'Open circuit on Pair 2 (pins 1-2) — damaged or broken conductor',
        isCorrect: true,
      },
      { id: 'b', label: 'Short circuit between Pair 2 and Pair 3', isCorrect: false },
      { id: 'c', label: 'Crossed pairs at the patch panel', isCorrect: false },
      { id: 'd', label: 'All pairs damaged in the cable', isCorrect: false },
    ],
    correctFaultType: 'open_circuit',
    correctLocation: 'Cat 5 cable — Pair 2 (pins 1-2) has a broken conductor',
    rectification:
      'Replace the Cat 5 cable or re-terminate both ends. Check for damage where the cable crosses other services.',
    explanation:
      'Three of four pairs test fine with good continuity. Pair 2 reads OL from both ends — open circuit on that pair. The cable is likely damaged at a bend, fixing, or where it bridges over 230V cables on the tray.',
    optimalMethod:
      '1. Test each pair end-to-end. 2. The pair with OL is the fault. 3. With data cables, a single damaged pair causes total connection failure.',
  },

  // 7. 3-PHASE SOCKET — Reversed phase rotation
  {
    id: 'tpn-reversed',
    circuitType: 'tpn_socket',
    circuitName: '3-Phase Socket (TPN Isolator)',
    circuitIcon: 'Zap',
    symptom:
      'A phase rotation tester at the 16A 3-phase socket outlet shows incorrect phase sequence. The supply at the distribution board is confirmed correct.',
    faultType: 'reversed_polarity',
    testPoints: [
      {
        id: 'tpn-db',
        location: 'Distribution Board',
        description: 'TPN MCB outgoing terminals',
        tests: [
          {
            id: 'tpn-db-l1',
            label: 'L1 at board to L1 at socket',
            mode: 'continuity',
            reading: 'OL',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
          {
            id: 'tpn-db-l2',
            label: 'L2 at board to L2 at socket',
            mode: 'continuity',
            reading: '0.35',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
          {
            id: 'tpn-db-l3',
            label: 'L3 at board to L3 at socket',
            mode: 'continuity',
            reading: 'OL',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
        ],
      },
      {
        id: 'tpn-isolator',
        location: 'TPN Isolator',
        description: 'Three-phase isolator feeding the socket',
        tests: [
          {
            id: 'tpn-iso-l1-in',
            label: 'Board L1 to isolator L1 in',
            mode: 'continuity',
            reading: '0.30',
            unit: 'Ω',
            isAbnormal: false,
            isKey: true,
          },
          {
            id: 'tpn-iso-l1-out',
            label: 'Board L1 to isolator L3 out',
            mode: 'continuity',
            reading: '0.40',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
          {
            id: 'tpn-iso-l3-in',
            label: 'Board L3 to isolator L3 in',
            mode: 'continuity',
            reading: '0.32',
            unit: 'Ω',
            isAbnormal: false,
            isKey: true,
          },
          {
            id: 'tpn-iso-l3-out',
            label: 'Board L3 to isolator L1 out',
            mode: 'continuity',
            reading: '0.38',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
        ],
      },
    ],
    diagnosisOptions: [
      { id: 'a', label: 'Open circuit on L1 in the SWA cable', isCorrect: false },
      {
        id: 'b',
        label: 'Reversed polarity — L1 and L3 swapped at the TPN isolator',
        isCorrect: true,
      },
      { id: 'c', label: 'Neutral and earth crossed at the socket', isCorrect: false },
      { id: 'd', label: 'Phase failure on the incoming supply', isCorrect: false },
    ],
    correctFaultType: 'reversed_polarity',
    correctLocation: 'At the TPN isolator — L1 and L3 are connected to the wrong terminals',
    rectification:
      'Swap L1 and L3 connections at the TPN isolator. Re-test phase rotation at the socket to confirm correct sequence.',
    explanation:
      'Board L1 to socket L1 reads OL, but board L1 to isolator L1 input is fine (0.30Ω). Board L1 connects through to isolator L3 output (0.40Ω) — the phases are crossed at the isolator. L1 and L3 were terminated on the wrong output terminals.',
    optimalMethod:
      '1. Test each phase end-to-end (board to socket). 2. L1 and L3 show OL — suspicious. 3. Test board L1 to isolator input (OK) then to each output terminal. 4. L1 exits on L3 position = phases swapped.',
  },

  // 8. S-PLAN HEATING — Open circuit in zone valve
  {
    id: 'splan-open-valve',
    circuitType: 'splan',
    circuitName: 'S-Plan Heating System',
    circuitIcon: 'Thermometer',
    symptom:
      'The heating zone valve does not open when the room thermostat calls for heat. The programmer is set to heating ON and the thermostat is calling.',
    faultType: 'open_circuit',
    testPoints: [
      {
        id: 'splan-programmer',
        location: 'Programmer / Wiring Centre',
        description: 'Central wiring centre connections',
        tests: [
          {
            id: 'splan-prog-ht',
            label: 'Heating output to valve motor',
            mode: 'continuity',
            reading: 'OL',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
          {
            id: 'splan-prog-hw',
            label: 'Hot water output to HW valve',
            mode: 'continuity',
            reading: '0.45',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
          {
            id: 'splan-prog-n',
            label: 'Neutral to valve neutral',
            mode: 'continuity',
            reading: '0.30',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
        ],
      },
      {
        id: 'splan-stat',
        location: 'Room Thermostat',
        description: 'Thermostat switching the heating demand',
        tests: [
          {
            id: 'splan-stat-cont',
            label: 'Thermostat contacts (calling)',
            mode: 'continuity',
            reading: '0.05',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
        ],
      },
      {
        id: 'splan-valve',
        location: 'Heating Zone Valve',
        description: 'Motorised 2-port zone valve',
        tests: [
          {
            id: 'splan-valve-motor',
            label: 'Valve motor winding',
            mode: 'continuity',
            reading: '12.0',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
          {
            id: 'splan-valve-grey',
            label: 'Grey wire (motor) to wiring centre',
            mode: 'continuity',
            reading: 'OL',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
          {
            id: 'splan-valve-orange',
            label: 'Orange wire (end switch) to wiring centre',
            mode: 'continuity',
            reading: '0.35',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
        ],
      },
    ],
    diagnosisOptions: [
      { id: 'a', label: 'Faulty zone valve motor', isCorrect: false },
      { id: 'b', label: 'Room thermostat not making contact', isCorrect: false },
      {
        id: 'c',
        label: 'Open circuit on the grey (motor) wire between wiring centre and zone valve',
        isCorrect: true,
      },
      { id: 'd', label: 'Programmer not sending heating demand', isCorrect: false },
    ],
    correctFaultType: 'open_circuit',
    correctLocation: 'Grey wire (motor feed) between the wiring centre and the heating zone valve',
    rectification:
      'Check and re-terminate the grey wire at both the wiring centre and the zone valve. Replace the cable if damaged.',
    explanation:
      'The thermostat contacts are closed (calling). The valve motor winding reads 12Ω (healthy). But the grey wire from wiring centre to valve reads OL — the motor feed is disconnected. The orange wire (end switch) is fine, confirming the cable route is there but one conductor is broken or disconnected.',
    optimalMethod:
      '1. Check thermostat contacts (OK). 2. Check programmer output to valve (OL = fault in this path). 3. Test valve motor winding (OK = valve not faulty). 4. Test grey wire end-to-end (OL = broken conductor). 5. Fault is in the grey wire connection.',
  },

  // =========================================================================
  // ADDITIONAL SCENARIOS — 22 new faults (3–4 per circuit type)
  // =========================================================================

  // 9. RING MAIN — Open circuit in neutral
  {
    id: 'ring-open-neutral',
    circuitType: 'ring_main',
    circuitName: 'Ring Final Circuit',
    circuitIcon: 'Plug',
    symptom:
      'One double socket on the ring has no power. The MCB has not tripped and other sockets on the ring work normally.',
    faultType: 'open_circuit',
    testPoints: [
      {
        id: 'ring-n-db',
        location: 'Distribution Board',
        description: 'Ring final MCB outgoing terminals',
        tests: [
          {
            id: 'ring-n-db-l-end',
            label: 'L end-to-end',
            mode: 'continuity',
            reading: '0.90',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
          {
            id: 'ring-n-db-n-end',
            label: 'N end-to-end',
            mode: 'continuity',
            reading: 'OL',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
          {
            id: 'ring-n-db-cpc-end',
            label: 'CPC end-to-end',
            mode: 'continuity',
            reading: '1.20',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
          {
            id: 'ring-n-db-ir',
            label: 'L to N insulation',
            mode: 'insulation',
            reading: '280.0',
            unit: 'MΩ',
            isAbnormal: false,
            isKey: false,
          },
        ],
      },
      {
        id: 'ring-n-s2',
        location: 'Socket 2 (Dead Socket)',
        description: 'The socket with no power — disconnect and test each side',
        tests: [
          {
            id: 'ring-n-s2-n-left',
            label: 'N to board (left side)',
            mode: 'continuity',
            reading: '0.35',
            unit: 'Ω',
            isAbnormal: false,
            isKey: true,
          },
          {
            id: 'ring-n-s2-n-right',
            label: 'N to board (right side)',
            mode: 'continuity',
            reading: 'OL',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
          {
            id: 'ring-n-s2-l',
            label: 'L continuity',
            mode: 'continuity',
            reading: '0.40',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
        ],
      },
      {
        id: 'ring-n-s3',
        location: 'Socket 3',
        description: 'Next socket along the ring from Socket 2',
        tests: [
          {
            id: 'ring-n-s3-n',
            label: 'N to Socket 2 N',
            mode: 'continuity',
            reading: 'OL',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
        ],
      },
    ],
    diagnosisOptions: [
      {
        id: 'a',
        label: 'Open circuit in neutral conductor between Socket 2 and Socket 3',
        isCorrect: true,
      },
      { id: 'b', label: 'MCB faulty — not feeding the ring', isCorrect: false },
      { id: 'c', label: 'Short circuit between L and CPC at Socket 2', isCorrect: false },
      { id: 'd', label: 'CPC disconnected at Socket 2', isCorrect: false },
    ],
    correctFaultType: 'open_circuit',
    correctLocation: 'Neutral conductor between Socket 2 and Socket 3',
    rectification:
      'Check the neutral termination at Socket 2 and Socket 3. Re-strip and re-terminate the neutral conductor, or replace the cable if the conductor is damaged.',
    explanation:
      'L and CPC end-to-end readings are fine — the ring is intact on those conductors. But N end-to-end reads OL, confirming a break in the neutral. Disconnecting at Socket 2 and testing each side shows the board side is fine but the far side to Socket 3 reads OL. The break is between Socket 2 and Socket 3.',
    optimalMethod:
      '1. End-to-end test at DB — N reads OL (fault confirmed). 2. Disconnect at midpoint socket. 3. Test N each side. 4. The side reading OL contains the break. 5. Narrow down to the cable section.',
  },

  // 10. RING MAIN — Reversed polarity at fused spur
  {
    id: 'ring-reversed-spur',
    circuitType: 'ring_main',
    circuitName: 'Ring Final Circuit',
    circuitIcon: 'Plug',
    symptom:
      'A socket tester at the fused spur outlet shows reversed polarity. The spur was recently added by another electrician.',
    faultType: 'reversed_polarity',
    testPoints: [
      {
        id: 'spur-fcu',
        location: 'Fused Connection Unit',
        description: 'FCU supplying the fused spur',
        tests: [
          {
            id: 'spur-fcu-l-in',
            label: 'Board L to FCU line terminal',
            mode: 'continuity',
            reading: '0.45',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
          {
            id: 'spur-fcu-l-load',
            label: 'Board L to FCU load L',
            mode: 'continuity',
            reading: 'OL',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
          {
            id: 'spur-fcu-n-load',
            label: 'Board L to FCU load N',
            mode: 'continuity',
            reading: '0.50',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
        ],
      },
      {
        id: 'spur-socket',
        location: 'Spur Socket Outlet',
        description: 'The socket showing reversed polarity',
        tests: [
          {
            id: 'spur-sock-l',
            label: 'Socket L terminal to board L',
            mode: 'continuity',
            reading: 'OL',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
          {
            id: 'spur-sock-n',
            label: 'Socket N terminal to board L',
            mode: 'continuity',
            reading: '0.55',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
          {
            id: 'spur-sock-ir',
            label: 'L to N insulation',
            mode: 'insulation',
            reading: '310.0',
            unit: 'MΩ',
            isAbnormal: false,
            isKey: false,
          },
        ],
      },
      {
        id: 'spur-ring-tap',
        location: 'Ring Tap-Off Point',
        description: 'Where the spur connects to the ring',
        tests: [
          {
            id: 'spur-tap-l',
            label: 'Ring L to spur L',
            mode: 'continuity',
            reading: '0.20',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
          {
            id: 'spur-tap-n',
            label: 'Ring N to spur N',
            mode: 'continuity',
            reading: '0.22',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
        ],
      },
    ],
    diagnosisOptions: [
      { id: 'a', label: 'Short circuit at the socket outlet', isCorrect: false },
      {
        id: 'b',
        label: 'Reversed polarity — L and N swapped at the FCU load terminals',
        isCorrect: true,
      },
      { id: 'c', label: 'Fuse blown in the FCU', isCorrect: false },
      { id: 'd', label: 'CPC disconnected at the spur socket', isCorrect: false },
    ],
    correctFaultType: 'reversed_polarity',
    correctLocation: 'FCU load side — line and neutral cables connected to the wrong terminals',
    rectification:
      'Swap the line and neutral connections on the load side of the FCU. Re-test polarity at the spur socket before energising.',
    explanation:
      'The supply side of the FCU is correct — board L reaches FCU line terminal (0.45Ω). But board L continues through to the load N terminal (0.50Ω) instead of load L (OL). The cables are swapped on the FCU load side. The ring tap-off and cable are fine.',
    optimalMethod:
      '1. Test from board L to FCU line terminal (OK = supply correct). 2. Test board L to each load terminal. 3. If L reaches N position = reversed polarity at FCU load side. 4. Swap connections.',
  },

  // 11. RING MAIN — High resistance joint
  {
    id: 'ring-high-r-joint',
    circuitType: 'ring_main',
    circuitName: 'Ring Final Circuit',
    circuitIcon: 'Plug',
    symptom:
      'During testing, the R1+R2 reading at Socket 3 is significantly higher than expected. The socket faceplate feels warm after prolonged use.',
    faultType: 'high_resistance',
    testPoints: [
      {
        id: 'ring-hr-db',
        location: 'Distribution Board',
        description: 'Ring final MCB outgoing terminals',
        tests: [
          {
            id: 'ring-hr-db-r1r2',
            label: 'R1+R2 (L-CPC cross-connect)',
            mode: 'continuity',
            reading: '0.65',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
          {
            id: 'ring-hr-db-l-end',
            label: 'L end-to-end',
            mode: 'continuity',
            reading: '0.92',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
        ],
      },
      {
        id: 'ring-hr-s2',
        location: 'Socket 2',
        description: 'Socket before the problem socket',
        tests: [
          {
            id: 'ring-hr-s2-r1r2',
            label: 'R1+R2 at Socket 2',
            mode: 'continuity',
            reading: '0.48',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
        ],
      },
      {
        id: 'ring-hr-s3',
        location: 'Socket 3 (Warm Socket)',
        description: 'The socket with the high reading',
        tests: [
          {
            id: 'ring-hr-s3-r1r2',
            label: 'R1+R2 at Socket 3',
            mode: 'continuity',
            reading: '5.80',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
          {
            id: 'ring-hr-s3-l-term',
            label: 'L terminal to cable conductor',
            mode: 'continuity',
            reading: '4.90',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
          {
            id: 'ring-hr-s3-n-term',
            label: 'N terminal to cable conductor',
            mode: 'continuity',
            reading: '0.05',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
        ],
      },
      {
        id: 'ring-hr-s4',
        location: 'Socket 4',
        description: 'Socket after the problem socket',
        tests: [
          {
            id: 'ring-hr-s4-r1r2',
            label: 'R1+R2 at Socket 4',
            mode: 'continuity',
            reading: '0.52',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
        ],
      },
    ],
    diagnosisOptions: [
      { id: 'a', label: 'Open circuit in CPC at Socket 3', isCorrect: false },
      { id: 'b', label: 'Undersized cable on the spur to Socket 3', isCorrect: false },
      { id: 'c', label: 'High resistance joint at Socket 3 line terminal', isCorrect: true },
      { id: 'd', label: 'Loose neutral at the distribution board', isCorrect: false },
    ],
    correctFaultType: 'high_resistance',
    correctLocation: 'Socket 3 — line conductor termination (loose or corroded terminal)',
    rectification:
      'Remove the socket, re-strip the line conductor to expose clean copper, re-terminate tightly. If the terminal is damaged, replace the socket.',
    explanation:
      'R1+R2 at sockets either side of Socket 3 are normal (~0.5Ω). At Socket 3 it jumps to 5.80Ω. Testing the line terminal directly to the conductor shows 4.90Ω — the resistance is at the terminal connection itself, not in the cable. Likely a loose screw or corroded conductor.',
    optimalMethod:
      '1. R1+R2 at each socket along the ring. 2. Sudden jump at Socket 3 = fault here. 3. Test each terminal to its conductor. 4. High reading on L terminal confirms the joint.',
  },

  // 12. LIGHTING — Short circuit L-N
  {
    id: 'lighting-short-ln',
    circuitType: 'lighting',
    circuitName: 'Lighting Circuit',
    circuitIcon: 'Lightbulb',
    symptom:
      'The 6A lighting MCB trips immediately when switched on. All lamps have been removed. The circuit was recently rewired.',
    faultType: 'short_circuit',
    testPoints: [
      {
        id: 'light-sh-db',
        location: 'Distribution Board',
        description: 'Lighting MCB outgoing terminals',
        tests: [
          {
            id: 'light-sh-db-ir-ln',
            label: 'L to N insulation',
            mode: 'insulation',
            reading: '0.08',
            unit: 'MΩ',
            isAbnormal: true,
            isKey: true,
          },
          {
            id: 'light-sh-db-ir-le',
            label: 'L to CPC insulation',
            mode: 'insulation',
            reading: '320.0',
            unit: 'MΩ',
            isAbnormal: false,
            isKey: false,
          },
          {
            id: 'light-sh-db-ir-ne',
            label: 'N to CPC insulation',
            mode: 'insulation',
            reading: '300.0',
            unit: 'MΩ',
            isAbnormal: false,
            isKey: false,
          },
        ],
      },
      {
        id: 'light-sh-jb',
        location: 'Junction Box',
        description: 'Junction box in the ceiling void — feeds two ceiling roses',
        tests: [
          {
            id: 'light-sh-jb-board-side',
            label: 'L to N IR (board side)',
            mode: 'insulation',
            reading: '310.0',
            unit: 'MΩ',
            isAbnormal: false,
            isKey: true,
          },
          {
            id: 'light-sh-jb-rose-side',
            label: 'L to N IR (rose side)',
            mode: 'insulation',
            reading: '0.06',
            unit: 'MΩ',
            isAbnormal: true,
            isKey: true,
          },
        ],
      },
      {
        id: 'light-sh-rose',
        location: 'Ceiling Rose',
        description: 'Ceiling rose — all lamps removed',
        tests: [
          {
            id: 'light-sh-rose-ln',
            label: 'L to N at rose',
            mode: 'continuity',
            reading: '0.10',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
          {
            id: 'light-sh-rose-le',
            label: 'L to CPC at rose',
            mode: 'insulation',
            reading: '350.0',
            unit: 'MΩ',
            isAbnormal: false,
            isKey: false,
          },
        ],
      },
    ],
    diagnosisOptions: [
      {
        id: 'a',
        label: 'Short circuit between line and neutral at the ceiling rose',
        isCorrect: true,
      },
      { id: 'b', label: 'Earth fault on the switch wire', isCorrect: false },
      { id: 'c', label: 'Faulty MCB not holding', isCorrect: false },
      { id: 'd', label: 'Short circuit at the junction box', isCorrect: false },
    ],
    correctFaultType: 'short_circuit',
    correctLocation:
      'At the ceiling rose — line and neutral conductors touching or incorrectly terminated',
    rectification:
      'Open the ceiling rose and check terminations. Separate or re-strip conductors where L and N are touching. Re-test insulation resistance before energising.',
    explanation:
      "IR test at the board shows L-N at 0.08MΩ (below the 1MΩ minimum). L-E and N-E are fine, so it's not an earth fault. Disconnecting at the junction box shows the board side is fine (310MΩ) but the rose side is low (0.06MΩ). At the rose, L-N continuity reads 0.10Ω — dead short. The conductors are touching at the rose.",
    optimalMethod:
      '1. IR at board — L-N low (fault confirmed). 2. L-E and N-E fine (not an earth fault). 3. Disconnect at junction box, test each side. 4. Rose side low = fault beyond junction box. 5. Inspect ceiling rose — L and N touching.',
  },

  // 13. LIGHTING — Reversed polarity (switch in neutral)
  {
    id: 'lighting-reversed-pol',
    circuitType: 'lighting',
    circuitName: 'Lighting Circuit',
    circuitIcon: 'Lightbulb',
    symptom:
      'The light works, but a polarity test shows that the switch is breaking the neutral, not the line. The lamp holder is permanently live even when the switch is off.',
    faultType: 'reversed_polarity',
    testPoints: [
      {
        id: 'light-rp-db',
        location: 'Distribution Board',
        description: 'Lighting MCB outgoing terminals',
        tests: [
          {
            id: 'light-rp-db-l-cont',
            label: 'Board L to switch common',
            mode: 'continuity',
            reading: 'OL',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
          {
            id: 'light-rp-db-n-cont',
            label: 'Board N to switch common',
            mode: 'continuity',
            reading: '0.30',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
        ],
      },
      {
        id: 'light-rp-sw',
        location: 'Light Switch',
        description: 'Single-gang one-way switch plate',
        tests: [
          {
            id: 'light-rp-sw-common',
            label: 'Switch common to rose terminal',
            mode: 'continuity',
            reading: '0.25',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
        ],
      },
      {
        id: 'light-rp-rose',
        location: 'Ceiling Rose',
        description: 'Ceiling rose loop-in terminals',
        tests: [
          {
            id: 'light-rp-rose-live',
            label: 'Lamp L terminal to board L',
            mode: 'continuity',
            reading: '0.20',
            unit: 'Ω',
            isAbnormal: false,
            isKey: true,
          },
          {
            id: 'light-rp-rose-n',
            label: 'Lamp N terminal to board N',
            mode: 'continuity',
            reading: 'OL',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
          {
            id: 'light-rp-rose-sw',
            label: 'Lamp N terminal to switch',
            mode: 'continuity',
            reading: '0.28',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
        ],
      },
    ],
    diagnosisOptions: [
      { id: 'a', label: 'Open circuit in the switch wire', isCorrect: false },
      {
        id: 'b',
        label: 'Reversed polarity — L and N swapped at the ceiling rose loop-in',
        isCorrect: true,
      },
      { id: 'c', label: 'Switch contacts stuck closed', isCorrect: false },
      { id: 'd', label: 'Earth fault at the ceiling rose', isCorrect: false },
    ],
    correctFaultType: 'reversed_polarity',
    correctLocation:
      'At the ceiling rose — permanent line and neutral connected to the wrong loop-in terminals, putting the switch in the neutral',
    rectification:
      'Swap the line and neutral connections at the ceiling rose loop-in terminals so the switch breaks the line conductor. Re-test polarity.',
    explanation:
      "Board L doesn't reach the switch common (OL) — but board N does (0.30Ω). The switch is breaking the neutral instead of the line. At the rose, the lamp's L terminal connects directly to board L (permanent live), while the switched connection goes to neutral. L and N are swapped at the loop-in.",
    optimalMethod:
      "1. Test board L to switch common — OL means line isn't reaching the switch. 2. Test board N to switch common — reading confirms neutral is being switched. 3. L and N are swapped at the ceiling rose loop-in terminals.",
  },

  // 14. LIGHTING — High resistance at loop-in
  {
    id: 'lighting-high-r-loop',
    circuitType: 'lighting',
    circuitName: 'Lighting Circuit',
    circuitIcon: 'Lightbulb',
    symptom:
      'One light on the circuit is noticeably dimmer than the others. The lamp is new and the correct wattage. The light sometimes flickers.',
    faultType: 'high_resistance',
    testPoints: [
      {
        id: 'light-hr-db',
        location: 'Distribution Board',
        description: 'Lighting MCB outgoing terminals',
        tests: [
          {
            id: 'light-hr-db-ir',
            label: 'L to N insulation',
            mode: 'insulation',
            reading: '290.0',
            unit: 'MΩ',
            isAbnormal: false,
            isKey: false,
          },
        ],
      },
      {
        id: 'light-hr-rose1',
        location: 'Ceiling Rose 1 (Normal)',
        description: 'First rose on the circuit — working normally',
        tests: [
          {
            id: 'light-hr-rose1-l',
            label: 'Board L to rose L',
            mode: 'continuity',
            reading: '0.35',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
        ],
      },
      {
        id: 'light-hr-rose2',
        location: 'Ceiling Rose 2 (Dim Light)',
        description: 'The rose with the dim, flickering light',
        tests: [
          {
            id: 'light-hr-rose2-l',
            label: 'Board L to rose L',
            mode: 'continuity',
            reading: '6.20',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
          {
            id: 'light-hr-rose2-n',
            label: 'Board N to rose N',
            mode: 'continuity',
            reading: '0.40',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
          {
            id: 'light-hr-rose2-loop',
            label: 'Loop-in L terminal to incoming cable L',
            mode: 'continuity',
            reading: '5.60',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
        ],
      },
      {
        id: 'light-hr-rose3',
        location: 'Ceiling Rose 3',
        description: 'Third rose — fed from Rose 2',
        tests: [
          {
            id: 'light-hr-rose3-l',
            label: 'Board L to rose L',
            mode: 'continuity',
            reading: '6.40',
            unit: 'Ω',
            isAbnormal: true,
            isKey: false,
          },
        ],
      },
    ],
    diagnosisOptions: [
      { id: 'a', label: 'Faulty lamp holder at Rose 2', isCorrect: false },
      { id: 'b', label: 'Open circuit in the switch wire at Rose 2', isCorrect: false },
      {
        id: 'c',
        label: 'High resistance joint at the loop-in terminal on Rose 2',
        isCorrect: true,
      },
      { id: 'd', label: 'Undersized cable feeding Rose 2', isCorrect: false },
    ],
    correctFaultType: 'high_resistance',
    correctLocation: 'Ceiling Rose 2 — line conductor loop-in terminal (loose or corroded)',
    rectification:
      'Open Rose 2, re-strip the line conductor, clean the terminal, and re-tighten. Replace the rose if the terminal is damaged.',
    explanation:
      "Rose 1 reads fine (0.35Ω). Rose 2 line reads 6.20Ω — a big jump. Testing the loop-in terminal directly shows 5.60Ω at that one connection. Rose 3 is also high because it's fed through Rose 2. The fault is at the loop-in terminal on Rose 2.",
    optimalMethod:
      '1. Test L continuity to each rose. 2. Sudden increase at Rose 2 = fault here. 3. Test the loop-in terminal connection directly. 4. High reading confirms loose/corroded terminal.',
  },

  // 15. 3-PHASE MOTOR — Short circuit between phases
  {
    id: 'motor-short-phases',
    circuitType: 'motor_dol',
    circuitName: '3-Phase Motor (DOL Starter)',
    circuitIcon: 'Cog',
    symptom:
      'The MCCB trips instantly when the DOL starter contactor is energised. The motor has been disconnected and the fault persists with just the cable connected.',
    faultType: 'short_circuit',
    testPoints: [
      {
        id: 'motor-sh-isolator',
        location: 'TPN Isolator',
        description: 'Three-phase isolator — motor disconnected at terminal box',
        tests: [
          {
            id: 'motor-sh-iso-l1l2',
            label: 'L1 to L2 insulation',
            mode: 'insulation',
            reading: '0.10',
            unit: 'MΩ',
            isAbnormal: true,
            isKey: true,
          },
          {
            id: 'motor-sh-iso-l1l3',
            label: 'L1 to L3 insulation',
            mode: 'insulation',
            reading: '280.0',
            unit: 'MΩ',
            isAbnormal: false,
            isKey: false,
          },
          {
            id: 'motor-sh-iso-l2l3',
            label: 'L2 to L3 insulation',
            mode: 'insulation',
            reading: '260.0',
            unit: 'MΩ',
            isAbnormal: false,
            isKey: false,
          },
        ],
      },
      {
        id: 'motor-sh-dol',
        location: 'DOL Starter',
        description: 'Direct-on-line starter — test cable each side of contactor',
        tests: [
          {
            id: 'motor-sh-dol-in-l1l2',
            label: 'L1 to L2 IR (input side)',
            mode: 'insulation',
            reading: '300.0',
            unit: 'MΩ',
            isAbnormal: false,
            isKey: true,
          },
          {
            id: 'motor-sh-dol-out-l1l2',
            label: 'L1 to L2 IR (output side)',
            mode: 'insulation',
            reading: '0.08',
            unit: 'MΩ',
            isAbnormal: true,
            isKey: true,
          },
        ],
      },
      {
        id: 'motor-sh-cable',
        location: 'SY Cable (DOL to Motor)',
        description: 'Cable between DOL starter and motor terminal box',
        tests: [
          {
            id: 'motor-sh-cable-l1l2',
            label: 'L1 to L2 at motor end',
            mode: 'insulation',
            reading: '0.09',
            unit: 'MΩ',
            isAbnormal: true,
            isKey: true,
          },
          {
            id: 'motor-sh-cable-le',
            label: 'All phases to earth',
            mode: 'insulation',
            reading: '350.0',
            unit: 'MΩ',
            isAbnormal: false,
            isKey: false,
          },
        ],
      },
    ],
    diagnosisOptions: [
      {
        id: 'a',
        label: 'Motor winding fault — short between L1 and L2 windings',
        isCorrect: false,
      },
      {
        id: 'b',
        label: 'Short circuit between L1 and L2 in the cable from DOL to motor',
        isCorrect: true,
      },
      { id: 'c', label: 'Contactor contacts welded closed', isCorrect: false },
      { id: 'd', label: 'Earth fault on L1', isCorrect: false },
    ],
    correctFaultType: 'short_circuit',
    correctLocation: 'SY cable between DOL starter and motor — L1 and L2 conductors shorted',
    rectification:
      'Replace the SY cable between the DOL starter and motor terminal box. Check the cable route for damage from vibration or abrasion.',
    explanation:
      "IR between L1 and L2 is low (0.10MΩ) at the isolator. At the DOL, the input side is fine (300MΩ) but the output side reads 0.08MΩ — the fault is in the cable after the DOL. The motor is disconnected, so it's not a winding fault. Phases to earth are fine, so it's not an earth fault.",
    optimalMethod:
      "1. IR test all phase combinations at isolator — L1-L2 low. 2. Disconnect at DOL and test input vs output side. 3. Input fine, output low = cable fault. 4. Motor disconnected confirms it's the cable.",
  },

  // 16. 3-PHASE MOTOR — Reversed rotation
  {
    id: 'motor-reversed-rotation',
    circuitType: 'motor_dol',
    circuitName: '3-Phase Motor (DOL Starter)',
    circuitIcon: 'Cog',
    symptom:
      'The motor runs but in the wrong direction. The pump it drives is pushing water backwards. The motor was recently re-terminated after the cable was replaced.',
    faultType: 'reversed_polarity',
    testPoints: [
      {
        id: 'motor-rev-isolator',
        location: 'TPN Isolator',
        description: 'Three-phase isolator outgoing side',
        tests: [
          {
            id: 'motor-rev-iso-l1',
            label: 'Board L1 to isolator L1 out',
            mode: 'continuity',
            reading: '0.20',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
          {
            id: 'motor-rev-iso-l2',
            label: 'Board L2 to isolator L2 out',
            mode: 'continuity',
            reading: '0.22',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
          {
            id: 'motor-rev-iso-l3',
            label: 'Board L3 to isolator L3 out',
            mode: 'continuity',
            reading: '0.21',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
        ],
      },
      {
        id: 'motor-rev-terminal',
        location: 'Motor Terminal Box',
        description: 'Motor terminals U1, V1, W1',
        tests: [
          {
            id: 'motor-rev-t-l1',
            label: 'Board L1 to U1 terminal',
            mode: 'continuity',
            reading: '0.40',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
          {
            id: 'motor-rev-t-l2',
            label: 'Board L2 to V1 terminal',
            mode: 'continuity',
            reading: 'OL',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
          {
            id: 'motor-rev-t-l3',
            label: 'Board L3 to W1 terminal',
            mode: 'continuity',
            reading: 'OL',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
          {
            id: 'motor-rev-t-l2w',
            label: 'Board L2 to W1 terminal',
            mode: 'continuity',
            reading: '0.42',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
          {
            id: 'motor-rev-t-l3v',
            label: 'Board L3 to V1 terminal',
            mode: 'continuity',
            reading: '0.38',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
        ],
      },
    ],
    diagnosisOptions: [
      {
        id: 'a',
        label: 'Motor windings connected in the wrong star/delta configuration',
        isCorrect: false,
      },
      {
        id: 'b',
        label: 'Two phases swapped at the motor terminal box (L2 and L3)',
        isCorrect: true,
      },
      { id: 'c', label: 'Phase failure causing single-phase running', isCorrect: false },
      { id: 'd', label: 'Overload relay set too high', isCorrect: false },
    ],
    correctFaultType: 'reversed_polarity',
    correctLocation:
      'Motor terminal box — L2 and L3 connected to the wrong terminals (V1 and W1 swapped)',
    rectification:
      'Swap L2 and L3 connections at the motor terminal box. Re-test phase rotation and confirm correct direction of motor rotation.',
    explanation:
      "Supply reaches the isolator correctly on all three phases. But at the motor, L2 goes to W1 and L3 goes to V1 — they're swapped. This reverses the phase sequence and the motor runs backwards. The cable was replaced and re-terminated incorrectly.",
    optimalMethod:
      "1. Confirm correct phase sequence at isolator (all OK). 2. Test each phase board-to-motor terminal. 3. L2 and L3 don't reach their correct terminals. 4. Cross-test confirms they're swapped. 5. Swap at motor terminal box.",
  },

  // 17. 3-PHASE MOTOR — High resistance at DOL
  {
    id: 'motor-high-r-dol',
    circuitType: 'motor_dol',
    circuitName: '3-Phase Motor (DOL Starter)',
    circuitIcon: 'Cog',
    symptom:
      'The motor starts slowly and draws excessive current on L3. The overload has tripped twice this week. The DOL starter body is warm to touch.',
    faultType: 'high_resistance',
    testPoints: [
      {
        id: 'motor-hr-dol',
        location: 'DOL Starter',
        description: 'DOL starter terminals — contactor open',
        tests: [
          {
            id: 'motor-hr-dol-l1',
            label: 'L1 input to L1 output terminal',
            mode: 'continuity',
            reading: '0.05',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
          {
            id: 'motor-hr-dol-l2',
            label: 'L2 input to L2 output terminal',
            mode: 'continuity',
            reading: '0.06',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
          {
            id: 'motor-hr-dol-l3',
            label: 'L3 input to L3 output terminal',
            mode: 'continuity',
            reading: '6.50',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
        ],
      },
      {
        id: 'motor-hr-dol-detail',
        location: 'DOL L3 Terminal (Detail)',
        description: 'Closer inspection of L3 path through DOL',
        tests: [
          {
            id: 'motor-hr-dol-l3-in',
            label: 'L3 cable to input terminal',
            mode: 'continuity',
            reading: '0.04',
            unit: 'Ω',
            isAbnormal: false,
            isKey: true,
          },
          {
            id: 'motor-hr-dol-l3-out',
            label: 'L3 output terminal to cable',
            mode: 'continuity',
            reading: '6.30',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
        ],
      },
      {
        id: 'motor-hr-motor',
        location: 'Motor Terminal Box',
        description: 'Motor terminals',
        tests: [
          {
            id: 'motor-hr-motor-wind',
            label: 'Motor windings (all phases)',
            mode: 'continuity',
            reading: '2.50',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
        ],
      },
    ],
    diagnosisOptions: [
      { id: 'a', label: 'Motor winding fault on L3', isCorrect: false },
      { id: 'b', label: 'Overload relay set incorrectly', isCorrect: false },
      {
        id: 'c',
        label: 'High resistance connection at L3 output terminal on the DOL starter',
        isCorrect: true,
      },
      { id: 'd', label: 'SY cable damaged between DOL and motor', isCorrect: false },
    ],
    correctFaultType: 'high_resistance',
    correctLocation: 'DOL starter — L3 output terminal (loose connection or corroded terminal)',
    rectification:
      'Re-strip and re-terminate the L3 cable at the DOL output terminal. Clean the terminal, tighten securely. Replace the terminal block if damaged.',
    explanation:
      'L1 and L2 through the DOL read fine (~0.05Ω). L3 reads 6.50Ω — massively high. The input terminal is fine (0.04Ω), so the resistance is at the output terminal connection. Motor windings are balanced (2.50Ω all phases). The high resistance causes voltage drop on L3, unbalanced currents, and overheating.',
    optimalMethod:
      '1. Test continuity through each phase of the DOL. 2. L3 much higher = fault. 3. Test L3 input terminal (fine) vs output terminal (high) to localise. 4. Re-terminate at output.',
  },

  // 18. BONDING — Open circuit supplementary bonding
  {
    id: 'bonding-open-supp',
    circuitType: 'bonding',
    circuitName: 'Supplementary Bonding',
    circuitIcon: 'Shield',
    symptom:
      'During inspection, supplementary bonding in the bathroom shows no continuity between the metal bath waste and the earth terminal of a nearby socket.',
    faultType: 'open_circuit',
    testPoints: [
      {
        id: 'bond-supp-bath',
        location: 'Bath Waste',
        description: 'Metal bath waste fitting with bonding clamp',
        tests: [
          {
            id: 'bond-supp-bath-sock',
            label: 'Bath waste to socket CPC',
            mode: 'continuity',
            reading: 'OL',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
          {
            id: 'bond-supp-bath-clamp',
            label: 'Bath waste to bonding conductor',
            mode: 'continuity',
            reading: '0.08',
            unit: 'Ω',
            isAbnormal: false,
            isKey: true,
          },
        ],
      },
      {
        id: 'bond-supp-route',
        location: 'Bonding Conductor Route',
        description: 'The 4mm² conductor running under the bath',
        tests: [
          {
            id: 'bond-supp-route-end1',
            label: 'Conductor at bath end to socket earth',
            mode: 'continuity',
            reading: 'OL',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
          {
            id: 'bond-supp-route-end2',
            label: 'Conductor at socket end to socket CPC',
            mode: 'continuity',
            reading: '0.05',
            unit: 'Ω',
            isAbnormal: false,
            isKey: true,
          },
        ],
      },
      {
        id: 'bond-supp-socket',
        location: 'Bathroom Socket',
        description: 'Shaver socket with earth terminal',
        tests: [
          {
            id: 'bond-supp-sock-cpc',
            label: 'Socket CPC to MET',
            mode: 'continuity',
            reading: '0.40',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
        ],
      },
    ],
    diagnosisOptions: [
      { id: 'a', label: 'Bonding clamp corroded on the bath waste', isCorrect: false },
      {
        id: 'b',
        label: 'Open circuit in the supplementary bonding conductor — broken mid-run',
        isCorrect: true,
      },
      { id: 'c', label: 'Socket CPC disconnected from the MET', isCorrect: false },
      { id: 'd', label: 'Bath waste is plastic — no bonding path', isCorrect: false },
    ],
    correctFaultType: 'open_circuit',
    correctLocation:
      'Supplementary bonding conductor broken mid-run between the bath waste clamp and the socket earth terminal',
    rectification:
      'Trace and replace the 4mm² supplementary bonding conductor. Re-test continuity to confirm a reading below 0.05Ω between exposed metalwork and the nearest earth terminal.',
    explanation:
      "The clamp to conductor reads fine (0.08Ω) — clamp is good. The conductor at the socket end to socket CPC is fine (0.05Ω) — that end is terminated. But end-to-end the conductor reads OL — it's broken somewhere in the middle, likely where it runs under the bath.",
    optimalMethod:
      '1. Test bath waste to nearest earth terminal — OL (fault confirmed). 2. Test each end of the bonding conductor separately. 3. Both ends terminate fine, but end-to-end reads OL = conductor broken mid-run.',
  },

  // 19. BONDING — Bonding to plastic pipe section
  {
    id: 'bonding-plastic-pipe',
    circuitType: 'bonding',
    circuitName: 'Protective Bonding',
    circuitIcon: 'Shield',
    symptom:
      'Main bonding conductor to the water service reads high despite the clamp looking secure. The water company recently replaced part of the incoming pipe.',
    faultType: 'high_resistance',
    testPoints: [
      {
        id: 'bond-plast-met',
        location: 'Main Earthing Terminal',
        description: 'MET — all bonding conductors connect here',
        tests: [
          {
            id: 'bond-plast-met-gas',
            label: 'MET to gas pipe',
            mode: 'continuity',
            reading: '0.08',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
          {
            id: 'bond-plast-met-water',
            label: 'MET to water pipe (at clamp)',
            mode: 'continuity',
            reading: '0.12',
            unit: 'Ω',
            isAbnormal: false,
            isKey: true,
          },
        ],
      },
      {
        id: 'bond-plast-clamp',
        location: 'Water Pipe Bonding Clamp',
        description: 'Bonding clamp position on the water pipe',
        tests: [
          {
            id: 'bond-plast-clamp-before',
            label: 'Clamp to pipe (consumer side)',
            mode: 'continuity',
            reading: '0.05',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
          {
            id: 'bond-plast-clamp-after',
            label: 'Clamp to pipe (street side, beyond joint)',
            mode: 'continuity',
            reading: 'OL',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
        ],
      },
      {
        id: 'bond-plast-pipe',
        location: 'Pipe Joint',
        description: 'Where the old metal pipe meets the new section',
        tests: [
          {
            id: 'bond-plast-joint-metal',
            label: 'Old metal pipe to new section',
            mode: 'continuity',
            reading: 'OL',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
        ],
      },
    ],
    diagnosisOptions: [
      { id: 'a', label: 'Bonding clamp is corroded', isCorrect: false },
      { id: 'b', label: 'Bonding conductor too small for the pipe diameter', isCorrect: false },
      {
        id: 'c',
        label:
          'Plastic pipe section has broken the earth continuity path — clamp is on the wrong side',
        isCorrect: true,
      },
      { id: 'd', label: 'MET connection is loose', isCorrect: false },
    ],
    correctFaultType: 'high_resistance',
    correctLocation:
      'Water pipe — plastic section installed by the water company has broken earth continuity. The bonding clamp is on the consumer side of the plastic section.',
    rectification:
      "Relocate the bonding clamp to the street side of the plastic section (on the metallic incoming pipe before it enters the property), or bond to an alternative metallic point on the consumer's side. Confirm the installation complies with BS 7671 and inform the customer about the pipe change.",
    explanation:
      "The bonding conductor and clamp are fine — clamp to consumer-side pipe reads 0.05Ω. But the pipe beyond the joint reads OL — there's a plastic section. The water company replaced a section with plastic, breaking the earth path. The clamp needs to be on the metallic section of the incoming pipe.",
    optimalMethod:
      '1. Test MET to water pipe — reads OK at clamp (misleading). 2. Test clamp to pipe either side of any joints. 3. OL beyond the joint = no metallic path. 4. Identify plastic pipe section. 5. Relocate clamp.',
  },

  // 20. SMOKE/CO — Open circuit interconnect
  {
    id: 'smoke-open-intercon',
    circuitType: 'smoke_co',
    circuitName: 'Smoke Detector Circuit',
    circuitIcon: 'AlertTriangle',
    symptom:
      'All smoke detectors power on individually, but pressing the test button on one detector does not trigger the others. They previously interconnected correctly.',
    faultType: 'open_circuit',
    testPoints: [
      {
        id: 'smoke-oc-det1',
        location: 'Detector 1 (Hallway)',
        description: 'First detector — powers on, test works locally',
        tests: [
          {
            id: 'smoke-oc-det1-l',
            label: 'L supply from board',
            mode: 'continuity',
            reading: '0.45',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
          {
            id: 'smoke-oc-det1-int',
            label: 'Interconnect wire to Detector 2',
            mode: 'continuity',
            reading: '0.30',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
        ],
      },
      {
        id: 'smoke-oc-det2',
        location: 'Detector 2 (Landing)',
        description: 'Second detector — junction point',
        tests: [
          {
            id: 'smoke-oc-det2-int-in',
            label: 'Interconnect from Detector 1',
            mode: 'continuity',
            reading: '0.32',
            unit: 'Ω',
            isAbnormal: false,
            isKey: true,
          },
          {
            id: 'smoke-oc-det2-int-out',
            label: 'Interconnect to Detector 3',
            mode: 'continuity',
            reading: 'OL',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
        ],
      },
      {
        id: 'smoke-oc-det3',
        location: 'Detector 3 (Kitchen)',
        description: 'Third detector — not responding to interconnect',
        tests: [
          {
            id: 'smoke-oc-det3-l',
            label: 'L supply from board',
            mode: 'continuity',
            reading: '0.50',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
          {
            id: 'smoke-oc-det3-int',
            label: 'Interconnect wire at Detector 3',
            mode: 'continuity',
            reading: 'OL',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
        ],
      },
    ],
    diagnosisOptions: [
      {
        id: 'a',
        label: 'Detector 3 is faulty — interconnect circuit not responding',
        isCorrect: false,
      },
      {
        id: 'b',
        label: 'Open circuit on the interconnect wire between Detector 2 and Detector 3',
        isCorrect: true,
      },
      {
        id: 'c',
        label: 'Interconnect wire connected to wrong terminal on Detector 2',
        isCorrect: false,
      },
      { id: 'd', label: 'MCB for smoke circuit needs resetting', isCorrect: false },
    ],
    correctFaultType: 'open_circuit',
    correctLocation: 'Interconnect wire between Detector 2 and Detector 3 — broken or disconnected',
    rectification:
      'Check the interconnect wire termination at Detector 2 and Detector 3. Re-terminate or replace the cable. Test by triggering one detector and confirming all others sound.',
    explanation:
      "All detectors have mains power (L supply fine). Interconnect from Det 1 to Det 2 is fine (0.30Ω). But Det 2 to Det 3 reads OL — the interconnect wire is broken in this section. Det 3's interconnect also reads OL from its end, confirming the break.",
    optimalMethod:
      '1. Test interconnect between each pair of detectors. 2. Det 1–2 fine, Det 2–3 OL = fault in this section. 3. Check terminations at both ends of the break.',
  },

  // 21. SMOKE/CO — Short circuit L-E
  {
    id: 'smoke-short-le',
    circuitType: 'smoke_co',
    circuitName: 'Smoke Detector Circuit',
    circuitIcon: 'AlertTriangle',
    symptom:
      'The RCD trips as soon as the smoke detector MCB is switched on. No detectors are connected — just the cable.',
    faultType: 'short_circuit',
    testPoints: [
      {
        id: 'smoke-sh-db',
        location: 'Distribution Board',
        description: 'Smoke detector MCB outgoing terminals',
        tests: [
          {
            id: 'smoke-sh-db-le',
            label: 'L to CPC insulation',
            mode: 'insulation',
            reading: '0.12',
            unit: 'MΩ',
            isAbnormal: true,
            isKey: true,
          },
          {
            id: 'smoke-sh-db-ln',
            label: 'L to N insulation',
            mode: 'insulation',
            reading: '350.0',
            unit: 'MΩ',
            isAbnormal: false,
            isKey: false,
          },
          {
            id: 'smoke-sh-db-ne',
            label: 'N to CPC insulation',
            mode: 'insulation',
            reading: '330.0',
            unit: 'MΩ',
            isAbnormal: false,
            isKey: false,
          },
        ],
      },
      {
        id: 'smoke-sh-jb',
        location: 'Junction Box (Loft)',
        description: 'Junction box in the loft feeding the detector circuit',
        tests: [
          {
            id: 'smoke-sh-jb-board',
            label: 'L to CPC IR (board side)',
            mode: 'insulation',
            reading: '320.0',
            unit: 'MΩ',
            isAbnormal: false,
            isKey: true,
          },
          {
            id: 'smoke-sh-jb-det',
            label: 'L to CPC IR (detector side)',
            mode: 'insulation',
            reading: '0.10',
            unit: 'MΩ',
            isAbnormal: true,
            isKey: true,
          },
        ],
      },
      {
        id: 'smoke-sh-cable',
        location: 'FP200 Cable Run',
        description: 'FP200 cable from junction box to detector position',
        tests: [
          {
            id: 'smoke-sh-cable-le',
            label: 'L to CPC at detector end',
            mode: 'continuity',
            reading: '0.15',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
        ],
      },
    ],
    diagnosisOptions: [
      { id: 'a', label: 'RCD is faulty and tripping without a fault', isCorrect: false },
      {
        id: 'b',
        label: 'Short circuit between line and earth in the FP200 cable to the detector',
        isCorrect: true,
      },
      { id: 'c', label: 'Neutral and earth crossed at the junction box', isCorrect: false },
      { id: 'd', label: 'Smoke detector base is shorting to the back box', isCorrect: false },
    ],
    correctFaultType: 'short_circuit',
    correctLocation:
      'FP200 cable between the junction box and detector position — L conductor touching CPC (likely damaged by a screw or nail)',
    rectification:
      'Replace the FP200 cable section. Check the cable route for nails, screws, or sharp edges that caused the damage. Re-test insulation resistance before re-energising.',
    explanation:
      'IR at the board shows L-CPC at 0.12MΩ — well below the 1MΩ minimum. L-N and N-CPC are fine. At the junction box, the board side is fine but the detector side reads 0.10MΩ. The fault is in the cable between the junction box and the detector. Likely a screw or nail has penetrated the FP200 cable.',
    optimalMethod:
      '1. IR at board — L-CPC low (earth fault confirmed). 2. L-N and N-CPC fine (fault is specifically L-CPC). 3. Disconnect at junction box, test each side. 4. Detector side low = fault in that cable run.',
  },

  // 22. SMOKE/CO — High resistance connection
  {
    id: 'smoke-high-r-conn',
    circuitType: 'smoke_co',
    circuitName: 'CO Detector Circuit',
    circuitIcon: 'AlertTriangle',
    symptom:
      'One CO detector intermittently loses mains power and switches to battery backup. The green mains LED flickers on and off. Other detectors on the same circuit are fine.',
    faultType: 'high_resistance',
    testPoints: [
      {
        id: 'smoke-hr-det1',
        location: 'Detector 1 (Working)',
        description: 'First detector on the circuit — working normally',
        tests: [
          {
            id: 'smoke-hr-det1-l',
            label: 'Board L to Detector 1',
            mode: 'continuity',
            reading: '0.50',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
        ],
      },
      {
        id: 'smoke-hr-det2',
        location: 'Detector 2 (Intermittent)',
        description: 'The problem detector — mains LED flickering',
        tests: [
          {
            id: 'smoke-hr-det2-l',
            label: 'Board L to Detector 2',
            mode: 'continuity',
            reading: '7.30',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
          {
            id: 'smoke-hr-det2-n',
            label: 'Board N to Detector 2 N',
            mode: 'continuity',
            reading: '0.55',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
          {
            id: 'smoke-hr-det2-base',
            label: 'Base plate L terminal to cable L',
            mode: 'continuity',
            reading: '6.80',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
        ],
      },
      {
        id: 'smoke-hr-jb',
        location: 'Junction Box',
        description: 'Junction box feeding Detector 2',
        tests: [
          {
            id: 'smoke-hr-jb-l',
            label: 'JB L terminal to Detector 2 cable L',
            mode: 'continuity',
            reading: '0.30',
            unit: 'Ω',
            isAbnormal: false,
            isKey: true,
          },
        ],
      },
    ],
    diagnosisOptions: [
      { id: 'a', label: 'Faulty CO detector — internal fault', isCorrect: false },
      {
        id: 'b',
        label: 'High resistance connection at Detector 2 base plate L terminal',
        isCorrect: true,
      },
      { id: 'c', label: 'Junction box terminal loose', isCorrect: false },
      { id: 'd', label: 'FP200 cable conductor damaged', isCorrect: false },
    ],
    correctFaultType: 'high_resistance',
    correctLocation:
      'Detector 2 base plate — line conductor termination (loose or poorly stripped)',
    rectification:
      "Re-strip the line conductor at the detector base plate, ensure clean copper, and re-terminate tightly. Check all connections at the base plate while it's open.",
    explanation:
      'Board L to Detector 2 reads 7.30Ω — massively high. Board N is fine (0.55Ω). The cable from the junction box to Detector 2 is fine (JB to cable reads 0.30Ω). But at the base plate, the L terminal to cable reads 6.80Ω — the high resistance is at the base plate termination, not the cable.',
    optimalMethod:
      '1. Test L continuity to each detector. 2. Detector 2 is high — fault confirmed. 3. Test cable end-to-end from JB (OK) then base plate terminal (high). 4. Fault is at the base plate termination.',
  },

  // 23. DATA — Short circuit between pairs
  {
    id: 'data-short-pairs',
    circuitType: 'data',
    circuitName: 'Data Circuit (Cat 5)',
    circuitIcon: 'Network',
    symptom:
      'The data connection works but is extremely slow with constant packet loss. The cable was recently run alongside 230V power cables on a shared tray.',
    faultType: 'short_circuit',
    testPoints: [
      {
        id: 'data-sh-patch',
        location: 'Patch Panel',
        description: 'Patch panel termination',
        tests: [
          {
            id: 'data-sh-pair1',
            label: 'Pair 1 (4-5) continuity',
            mode: 'continuity',
            reading: '0.78',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
          {
            id: 'data-sh-pair2',
            label: 'Pair 2 (1-2) continuity',
            mode: 'continuity',
            reading: '0.80',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
          {
            id: 'data-sh-pair3',
            label: 'Pair 3 (3-6) continuity',
            mode: 'continuity',
            reading: '0.76',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
          {
            id: 'data-sh-pair4',
            label: 'Pair 4 (7-8) continuity',
            mode: 'continuity',
            reading: '0.82',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
          {
            id: 'data-sh-cross12',
            label: 'Pair 1 to Pair 2 (pin 4 to pin 1)',
            mode: 'insulation',
            reading: '0.50',
            unit: 'MΩ',
            isAbnormal: true,
            isKey: true,
          },
          {
            id: 'data-sh-cross34',
            label: 'Pair 3 to Pair 4 (pin 3 to pin 7)',
            mode: 'insulation',
            reading: '200.0',
            unit: 'MΩ',
            isAbnormal: false,
            isKey: false,
          },
        ],
      },
      {
        id: 'data-sh-outlet',
        location: 'Data Outlet',
        description: 'RJ45 data outlet at the desk',
        tests: [
          {
            id: 'data-sh-out-cross',
            label: 'Pair 1 to Pair 2 at outlet',
            mode: 'insulation',
            reading: '0.45',
            unit: 'MΩ',
            isAbnormal: true,
            isKey: true,
          },
        ],
      },
    ],
    diagnosisOptions: [
      { id: 'a', label: 'Open circuit on one pair causing retransmission', isCorrect: false },
      {
        id: 'b',
        label:
          'Short circuit / low insulation between Pair 1 and Pair 2 — likely cable damage from shared tray',
        isCorrect: true,
      },
      { id: 'c', label: 'Pairs terminated in wrong order (T568A vs T568B)', isCorrect: false },
      { id: 'd', label: 'Patch panel port faulty', isCorrect: false },
    ],
    correctFaultType: 'short_circuit',
    correctLocation:
      'Cat 5 cable — insulation breakdown between Pair 1 and Pair 2, likely caused by cable damage on the shared tray with 230V cables',
    rectification:
      'Replace the Cat 5 cable. Ensure proper separation from 230V cables per BS 7671 (50mm minimum, or use segregated compartments). Use shielded cable if running parallel to power.',
    explanation:
      'All four pairs have good end-to-end continuity — no breaks. But insulation between Pair 1 and Pair 2 reads 0.50MΩ at both ends — the pairs are partially shorted. This causes crosstalk and packet errors. Running alongside 230V power cables on a shared tray likely damaged the outer sheath and pair insulation.',
    optimalMethod:
      '1. Continuity test all pairs — all OK (no open circuits). 2. Cross-pair insulation test — Pair 1 to Pair 2 low (fault). 3. Other pair combinations fine. 4. Replace cable and separate from power cables.',
  },

  // 24. DATA — Crossed pairs (T568A/B mismatch)
  {
    id: 'data-crossed-pairs',
    circuitType: 'data',
    circuitName: 'Data Circuit (Cat 5)',
    circuitIcon: 'Network',
    symptom:
      'No network connection at the outlet. All pairs show continuity but the switch port light does not illuminate when patched. Cable was terminated by an apprentice.',
    faultType: 'reversed_polarity',
    testPoints: [
      {
        id: 'data-xp-patch',
        location: 'Patch Panel',
        description: 'Patch panel termination — terminated to T568B standard',
        tests: [
          {
            id: 'data-xp-pin1-pin1',
            label: 'Patch pin 1 to outlet pin 1',
            mode: 'continuity',
            reading: 'OL',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
          {
            id: 'data-xp-pin1-pin3',
            label: 'Patch pin 1 to outlet pin 3',
            mode: 'continuity',
            reading: '0.75',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
          {
            id: 'data-xp-pin2-pin2',
            label: 'Patch pin 2 to outlet pin 2',
            mode: 'continuity',
            reading: 'OL',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
          {
            id: 'data-xp-pin2-pin6',
            label: 'Patch pin 2 to outlet pin 6',
            mode: 'continuity',
            reading: '0.72',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
          {
            id: 'data-xp-pin3-pin1',
            label: 'Patch pin 3 to outlet pin 1',
            mode: 'continuity',
            reading: '0.78',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
        ],
      },
      {
        id: 'data-xp-outlet',
        location: 'Data Outlet',
        description: 'RJ45 outlet — check termination standard',
        tests: [
          {
            id: 'data-xp-out-ir',
            label: 'Overall cable insulation',
            mode: 'insulation',
            reading: '250.0',
            unit: 'MΩ',
            isAbnormal: false,
            isKey: false,
          },
        ],
      },
    ],
    diagnosisOptions: [
      { id: 'a', label: 'Cable damaged — multiple pairs broken', isCorrect: false },
      {
        id: 'b',
        label: 'Crossed pairs — outlet terminated to T568A, patch panel to T568B',
        isCorrect: true,
      },
      { id: 'c', label: 'Short circuit between pairs', isCorrect: false },
      { id: 'd', label: 'Patch panel port damaged', isCorrect: false },
    ],
    correctFaultType: 'reversed_polarity',
    correctLocation:
      'Data outlet — terminated to T568A standard while the patch panel is T568B. Pins are crossed.',
    rectification:
      'Re-terminate the data outlet to T568B standard to match the patch panel. Both ends must use the same standard. Re-test all pairs pin-to-pin.',
    explanation:
      "Pin 1 at the patch doesn't reach pin 1 at the outlet — instead it reaches pin 3. Pin 2 reaches pin 6, and pin 3 reaches pin 1. This is the classic T568A vs T568B mismatch. One end uses the white-orange/orange colour code, the other uses white-green/green on the same pins. All pairs are intact but in the wrong order.",
    optimalMethod:
      "1. Pin-to-pin continuity test. 2. Pins don't match (1→3, 2→6, 3→1). 3. This pattern = T568A/T568B mismatch. 4. Check which standard the patch panel uses and re-terminate the outlet to match.",
  },

  // 25. 3-PHASE SOCKET — Open circuit on one phase
  {
    id: 'tpn-open-phase',
    circuitType: 'tpn_socket',
    circuitName: '3-Phase Socket (TPN Isolator)',
    circuitIcon: 'Zap',
    symptom:
      '3-phase equipment does not start when plugged into the 16A socket. A voltage test shows only two phases present at the socket outlet.',
    faultType: 'open_circuit',
    testPoints: [
      {
        id: 'tpn-oc-db',
        location: 'Distribution Board',
        description: 'TPN MCB outgoing terminals',
        tests: [
          {
            id: 'tpn-oc-db-l1',
            label: 'L1 continuity to socket',
            mode: 'continuity',
            reading: '0.30',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
          {
            id: 'tpn-oc-db-l2',
            label: 'L2 continuity to socket',
            mode: 'continuity',
            reading: '0.32',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
          {
            id: 'tpn-oc-db-l3',
            label: 'L3 continuity to socket',
            mode: 'continuity',
            reading: 'OL',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
        ],
      },
      {
        id: 'tpn-oc-iso',
        location: 'TPN Isolator',
        description: 'Three-phase isolator',
        tests: [
          {
            id: 'tpn-oc-iso-l3-in',
            label: 'Board L3 to isolator L3 input',
            mode: 'continuity',
            reading: '0.28',
            unit: 'Ω',
            isAbnormal: false,
            isKey: true,
          },
          {
            id: 'tpn-oc-iso-l3-out',
            label: 'Isolator L3 output to socket L3',
            mode: 'continuity',
            reading: 'OL',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
        ],
      },
      {
        id: 'tpn-oc-socket',
        location: '3-Phase Socket',
        description: '16A 3-phase socket outlet',
        tests: [
          {
            id: 'tpn-oc-sock-l3',
            label: 'Socket L3 pin to SWA cable L3',
            mode: 'continuity',
            reading: 'OL',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
        ],
      },
    ],
    diagnosisOptions: [
      { id: 'a', label: 'MCB faulty — not feeding L3', isCorrect: false },
      {
        id: 'b',
        label: 'Open circuit on L3 in the SWA cable between isolator and socket',
        isCorrect: true,
      },
      { id: 'c', label: 'Socket outlet damaged — L3 pin broken', isCorrect: false },
      { id: 'd', label: 'Neutral lost causing voltage imbalance', isCorrect: false },
    ],
    correctFaultType: 'open_circuit',
    correctLocation: 'SWA cable between TPN isolator and socket — L3 conductor is open circuit',
    rectification:
      'Check SWA cable terminations at both ends for L3. Re-terminate the gland and conductor. If the conductor is damaged within the cable, replace the SWA section.',
    explanation:
      'L1 and L2 reach the socket fine. L3 reaches the isolator input (0.28Ω) but reads OL from isolator output to socket. The break is in the SWA cable between the isolator and socket on L3. Likely a damaged conductor or poor termination at the gland.',
    optimalMethod:
      '1. Test each phase end-to-end (board to socket). 2. L3 reads OL. 3. Test L3 board to isolator input (OK). 4. Isolator output to socket (OL) = fault in the cable between them.',
  },

  // 26. 3-PHASE SOCKET — Short circuit phase-earth
  {
    id: 'tpn-short-pe',
    circuitType: 'tpn_socket',
    circuitName: '3-Phase Socket (TPN Isolator)',
    circuitIcon: 'Zap',
    symptom:
      'The RCD protecting the 3-phase socket circuit trips immediately when the TPN MCB is switched on. No load is connected to the socket.',
    faultType: 'short_circuit',
    testPoints: [
      {
        id: 'tpn-sh-db',
        location: 'Distribution Board',
        description: 'TPN MCB outgoing terminals',
        tests: [
          {
            id: 'tpn-sh-db-l1e',
            label: 'L1 to CPC insulation',
            mode: 'insulation',
            reading: '310.0',
            unit: 'MΩ',
            isAbnormal: false,
            isKey: false,
          },
          {
            id: 'tpn-sh-db-l2e',
            label: 'L2 to CPC insulation',
            mode: 'insulation',
            reading: '0.09',
            unit: 'MΩ',
            isAbnormal: true,
            isKey: true,
          },
          {
            id: 'tpn-sh-db-l3e',
            label: 'L3 to CPC insulation',
            mode: 'insulation',
            reading: '290.0',
            unit: 'MΩ',
            isAbnormal: false,
            isKey: false,
          },
        ],
      },
      {
        id: 'tpn-sh-iso',
        location: 'TPN Isolator',
        description: 'Three-phase isolator — disconnect SWA at output side',
        tests: [
          {
            id: 'tpn-sh-iso-l2e-in',
            label: 'L2 to CPC IR (board side)',
            mode: 'insulation',
            reading: '320.0',
            unit: 'MΩ',
            isAbnormal: false,
            isKey: true,
          },
          {
            id: 'tpn-sh-iso-l2e-out',
            label: 'L2 to CPC IR (socket side)',
            mode: 'insulation',
            reading: '0.07',
            unit: 'MΩ',
            isAbnormal: true,
            isKey: true,
          },
        ],
      },
      {
        id: 'tpn-sh-gland',
        location: 'SWA Cable Gland (Socket End)',
        description: 'SWA gland and termination at the socket',
        tests: [
          {
            id: 'tpn-sh-gland-l2',
            label: 'L2 conductor to SWA armour',
            mode: 'continuity',
            reading: '0.08',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
        ],
      },
    ],
    diagnosisOptions: [
      { id: 'a', label: 'RCD is faulty', isCorrect: false },
      { id: 'b', label: 'Neutral-earth fault in the SWA cable', isCorrect: false },
      {
        id: 'c',
        label: 'Short circuit between L2 and earth (SWA armour) at the socket gland',
        isCorrect: true,
      },
      { id: 'd', label: 'L2 and L3 shorted in the cable', isCorrect: false },
    ],
    correctFaultType: 'short_circuit',
    correctLocation: 'SWA cable gland at the socket end — L2 conductor is touching the SWA armour',
    rectification:
      'Strip back the SWA cable at the socket gland, separate L2 from the armour, re-terminate with proper gland and shroud. Re-test insulation resistance on all phases to earth.',
    explanation:
      'IR testing shows L2-CPC at 0.09MΩ — earth fault on L2. Disconnecting at the isolator shows the board side is fine but the socket side is low. At the socket gland, L2 conductor to SWA armour reads 0.08Ω — the conductor is touching the armour inside the gland.',
    optimalMethod:
      '1. IR on all phases to CPC — L2 low (earth fault confirmed). 2. Disconnect at isolator, test each side. 3. Socket side low = fault in cable/gland. 4. Test L2 to armour at gland — short confirmed.',
  },

  // 27. 3-PHASE SOCKET — High resistance at SWA gland
  {
    id: 'tpn-high-r-gland',
    circuitType: 'tpn_socket',
    circuitName: '3-Phase Socket (TPN Isolator)',
    circuitIcon: 'Zap',
    symptom:
      'During testing, the Zs reading at the 3-phase socket is much higher than expected. The Ze at the board is normal. The SWA cable run is only 15 metres.',
    faultType: 'high_resistance',
    testPoints: [
      {
        id: 'tpn-hr-db',
        location: 'Distribution Board',
        description: 'TPN MCB outgoing terminals',
        tests: [
          {
            id: 'tpn-hr-db-r1r2',
            label: 'R1+R2 (L1 to CPC)',
            mode: 'continuity',
            reading: '4.80',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
          {
            id: 'tpn-hr-db-l1-cont',
            label: 'L1 continuity to socket',
            mode: 'continuity',
            reading: '0.35',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
        ],
      },
      {
        id: 'tpn-hr-gland-iso',
        location: 'SWA Gland (Isolator End)',
        description: 'SWA gland and earth termination at the isolator',
        tests: [
          {
            id: 'tpn-hr-gland-iso-armour',
            label: 'SWA armour to earth bar',
            mode: 'continuity',
            reading: '0.06',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
        ],
      },
      {
        id: 'tpn-hr-gland-sock',
        location: 'SWA Gland (Socket End)',
        description: 'SWA gland and earth termination at the socket',
        tests: [
          {
            id: 'tpn-hr-gland-sock-armour',
            label: 'SWA armour to socket earth terminal',
            mode: 'continuity',
            reading: '4.20',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
          {
            id: 'tpn-hr-gland-sock-gland',
            label: 'Gland body to SWA armour',
            mode: 'continuity',
            reading: '3.90',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
        ],
      },
    ],
    diagnosisOptions: [
      { id: 'a', label: 'SWA cable conductor undersized for the run', isCorrect: false },
      {
        id: 'b',
        label: 'High resistance at the SWA gland at the socket end — poor armour connection',
        isCorrect: true,
      },
      { id: 'c', label: 'Earth bar connection loose at the distribution board', isCorrect: false },
      { id: 'd', label: 'Socket earth terminal disconnected', isCorrect: false },
    ],
    correctFaultType: 'high_resistance',
    correctLocation:
      'SWA cable gland at the socket end — the gland is not making proper contact with the SWA armour',
    rectification:
      'Remove and re-make the SWA gland at the socket end. Ensure the armour wires are properly fanned out and the gland nut is tight. Fit an earth tail from the gland to the socket earth terminal. Re-test R1+R2.',
    explanation:
      "L1 continuity to the socket is fine (0.35Ω) — conductors are good. But R1+R2 reads 4.80Ω — the CPC path has high resistance. The gland at the isolator end is fine (0.06Ω). At the socket end, gland body to armour reads 3.90Ω — the gland isn't gripping the armour properly. This means the earth path via the SWA armour has high resistance, giving a high Zs.",
    optimalMethod:
      '1. R1+R2 high but L continuity OK = CPC path issue. 2. Test gland connections at each end. 3. Socket end gland reads high = poor armour contact. 4. Re-make gland.',
  },

  // 28. S-PLAN — Short circuit in thermostat wiring
  {
    id: 'splan-short-stat',
    circuitType: 'splan',
    circuitName: 'S-Plan Heating System',
    circuitIcon: 'Thermometer',
    symptom:
      'The 3A fuse in the boiler fused spur keeps blowing when the heating is switched on at the programmer. Hot water circuit works normally.',
    faultType: 'short_circuit',
    testPoints: [
      {
        id: 'splan-sh-wc',
        location: 'Wiring Centre',
        description: 'Central wiring centre connections',
        tests: [
          {
            id: 'splan-sh-wc-ht-ir',
            label: 'Heating call wire to neutral insulation',
            mode: 'insulation',
            reading: '0.05',
            unit: 'MΩ',
            isAbnormal: true,
            isKey: true,
          },
          {
            id: 'splan-sh-wc-hw-ir',
            label: 'Hot water call wire to neutral insulation',
            mode: 'insulation',
            reading: '250.0',
            unit: 'MΩ',
            isAbnormal: false,
            isKey: false,
          },
        ],
      },
      {
        id: 'splan-sh-stat',
        location: 'Room Thermostat',
        description: 'Room thermostat — disconnect thermostat cable',
        tests: [
          {
            id: 'splan-sh-stat-cable-ir',
            label: 'Call wire to neutral in stat cable',
            mode: 'insulation',
            reading: '0.04',
            unit: 'MΩ',
            isAbnormal: true,
            isKey: true,
          },
          {
            id: 'splan-sh-stat-unit',
            label: 'Thermostat terminals (unit disconnected)',
            mode: 'insulation',
            reading: '300.0',
            unit: 'MΩ',
            isAbnormal: false,
            isKey: true,
          },
        ],
      },
      {
        id: 'splan-sh-route',
        location: 'Cable Route',
        description: 'The cable running from wiring centre to room thermostat',
        tests: [
          {
            id: 'splan-sh-route-vis',
            label: 'Cable at damage point (under floorboard)',
            mode: 'continuity',
            reading: '0.02',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
        ],
      },
    ],
    diagnosisOptions: [
      { id: 'a', label: 'Faulty room thermostat — internal short', isCorrect: false },
      {
        id: 'b',
        label: 'Short circuit in the cable between wiring centre and room thermostat',
        isCorrect: true,
      },
      { id: 'c', label: 'Zone valve motor shorted', isCorrect: false },
      { id: 'd', label: 'Fused spur is faulty', isCorrect: false },
    ],
    correctFaultType: 'short_circuit',
    correctLocation:
      'Cable from wiring centre to room thermostat — short circuit between call wire and neutral, likely damaged by a floorboard nail',
    rectification:
      'Replace the cable between the wiring centre and room thermostat. Route away from nails and screws. Use cable clips or conduit where the cable crosses under floorboards.',
    explanation:
      'IR on the heating call wire to neutral is 0.05MΩ — short circuit. The hot water side is fine (250MΩ). Disconnecting at the thermostat, the cable still reads low but the thermostat itself is fine when disconnected. The fault is in the cable, not the thermostat. Likely a nail through the cable under the floorboards.',
    optimalMethod:
      '1. IR at wiring centre — heating call wire low (fault confirmed). 2. HW side fine (isolates to heating circuit). 3. Disconnect thermostat — cable still low, stat fine when disconnected = cable fault. 4. Replace cable.',
  },

  // 29. S-PLAN — Permanent/switched live swapped
  {
    id: 'splan-reversed-live',
    circuitType: 'splan',
    circuitName: 'S-Plan Heating System',
    circuitIcon: 'Thermometer',
    symptom:
      'The boiler fires as soon as the programmer is switched on regardless of thermostat or zone valve position. The system was recently re-wired at the wiring centre.',
    faultType: 'reversed_polarity',
    testPoints: [
      {
        id: 'splan-rv-wc',
        location: 'Wiring Centre',
        description: 'Central wiring centre — check terminal connections',
        tests: [
          {
            id: 'splan-rv-wc-perm-l',
            label: 'Permanent live terminal to board L',
            mode: 'continuity',
            reading: '0.35',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
          {
            id: 'splan-rv-wc-boiler-call',
            label: 'Boiler call terminal to board L',
            mode: 'continuity',
            reading: '0.38',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
        ],
      },
      {
        id: 'splan-rv-valve',
        location: 'Heating Zone Valve',
        description: 'Motorised zone valve end switch',
        tests: [
          {
            id: 'splan-rv-valve-orange',
            label: 'Orange wire (end switch) to wiring centre',
            mode: 'continuity',
            reading: '0.40',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
          {
            id: 'splan-rv-valve-endswitch',
            label: 'End switch status (valve closed)',
            mode: 'continuity',
            reading: 'OL',
            unit: 'Ω',
            isAbnormal: false,
            isKey: true,
          },
        ],
      },
      {
        id: 'splan-rv-boiler',
        location: 'Boiler',
        description: 'Boiler call for heat terminals',
        tests: [
          {
            id: 'splan-rv-boiler-call',
            label: 'Boiler call terminal to board L',
            mode: 'continuity',
            reading: '0.40',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
          {
            id: 'splan-rv-boiler-perm',
            label: 'Boiler permanent live to board L',
            mode: 'continuity',
            reading: '0.36',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
        ],
      },
    ],
    diagnosisOptions: [
      { id: 'a', label: 'Zone valve end switch stuck closed', isCorrect: false },
      { id: 'b', label: 'Room thermostat stuck calling for heat', isCorrect: false },
      {
        id: 'c',
        label:
          'Reversed polarity at wiring centre — boiler call terminal has permanent live instead of switched live',
        isCorrect: true,
      },
      { id: 'd', label: 'Programmer faulty — sending constant demand', isCorrect: false },
    ],
    correctFaultType: 'reversed_polarity',
    correctLocation:
      'Wiring centre — the boiler call terminal is connected to permanent live instead of the zone valve end switch output',
    rectification:
      'Rewire the boiler call at the wiring centre to receive its live from the zone valve end switch (orange wire) output, not from permanent live. Re-test the sequence: thermostat calls → valve opens → end switch makes → boiler fires.',
    explanation:
      'The boiler call terminal has continuity to board L (0.38Ω) even with the zone valve closed and end switch open (OL). This means the boiler call is wired to permanent live — it fires whenever the programmer is on. It should be wired to the zone valve end switch output, so the boiler only fires after the valve has opened.',
    optimalMethod:
      "1. Check boiler call terminal to board L — has continuity even with valve closed (shouldn't). 2. Zone valve end switch is open (OL) — confirms valve not calling boiler. 3. Boiler call is on permanent live instead of switched. 4. Rewire at wiring centre.",
  },

  // 30. S-PLAN — High resistance at wiring centre terminal
  {
    id: 'splan-high-r-wc',
    circuitType: 'splan',
    circuitName: 'S-Plan Heating System',
    circuitIcon: 'Thermometer',
    symptom:
      "The heating zone valve opens very slowly and sometimes gets stuck halfway. The motor can be heard humming but the valve doesn't fully open. A new valve was fitted recently and works fine when tested directly.",
    faultType: 'high_resistance',
    testPoints: [
      {
        id: 'splan-hr-wc',
        location: 'Wiring Centre',
        description: 'Wiring centre terminal block',
        tests: [
          {
            id: 'splan-hr-wc-grey',
            label: 'Grey wire terminal to valve grey wire',
            mode: 'continuity',
            reading: '8.20',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
          {
            id: 'splan-hr-wc-white',
            label: 'White wire (neutral) terminal to valve',
            mode: 'continuity',
            reading: '0.30',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
          {
            id: 'splan-hr-wc-orange',
            label: 'Orange wire terminal to valve',
            mode: 'continuity',
            reading: '0.35',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
        ],
      },
      {
        id: 'splan-hr-wc-detail',
        location: 'Wiring Centre Terminal (Grey)',
        description: 'Close inspection of the grey wire terminal',
        tests: [
          {
            id: 'splan-hr-wc-grey-in',
            label: 'Supply side of terminal block',
            mode: 'continuity',
            reading: '0.05',
            unit: 'Ω',
            isAbnormal: false,
            isKey: true,
          },
          {
            id: 'splan-hr-wc-grey-out',
            label: 'Valve side of terminal block',
            mode: 'continuity',
            reading: '7.80',
            unit: 'Ω',
            isAbnormal: true,
            isKey: true,
          },
        ],
      },
      {
        id: 'splan-hr-valve',
        location: 'Zone Valve',
        description: 'Valve motor terminals',
        tests: [
          {
            id: 'splan-hr-valve-motor',
            label: 'Valve motor winding',
            mode: 'continuity',
            reading: '12.5',
            unit: 'Ω',
            isAbnormal: false,
            isKey: false,
          },
        ],
      },
    ],
    diagnosisOptions: [
      { id: 'a', label: 'Zone valve motor failing — winding breaking down', isCorrect: false },
      { id: 'b', label: 'Cable damaged between wiring centre and valve', isCorrect: false },
      { id: 'c', label: 'Programmer not giving full voltage to heating output', isCorrect: false },
      {
        id: 'd',
        label: 'High resistance at the grey wire terminal in the wiring centre',
        isCorrect: true,
      },
    ],
    correctFaultType: 'high_resistance',
    correctLocation:
      'Wiring centre terminal block — grey wire (motor feed) connection is loose or corroded',
    rectification:
      'Remove the grey wire from the terminal block, clean the conductor, re-strip to expose fresh copper, and re-terminate tightly. If the terminal block is damaged, replace it.',
    explanation:
      'The valve motor winding is fine (12.5Ω — normal for a zone valve). Neutral and orange wires are fine. But the grey wire reads 8.20Ω end-to-end. Testing each side of the wiring centre terminal block shows the supply side is fine (0.05Ω) but the valve side reads 7.80Ω. The high resistance is at the terminal connection, causing a voltage drop that starves the motor.',
    optimalMethod:
      '1. Test each wire end-to-end from wiring centre to valve. 2. Grey wire high = fault in this path. 3. Test each side of the terminal block. 4. Supply side OK, valve side high = terminal connection is the fault.',
  },
];

/**
 * Pick a random session of 7 faults (one per circuit type where possible).
 * If fewer than 7 circuit types, pad with random extras.
 */
export function pickSessionFaults(count = 7): FaultScenario[] {
  // Group by circuit type
  const byType = new Map<string, FaultScenario[]>();
  for (const s of FAULT_SCENARIOS) {
    const arr = byType.get(s.circuitType) || [];
    arr.push(s);
    byType.set(s.circuitType, arr);
  }

  // Pick one from each type
  const selected: FaultScenario[] = [];
  for (const [, scenarios] of byType) {
    const pick = scenarios[Math.floor(Math.random() * scenarios.length)];
    selected.push(pick);
  }

  // Shuffle the selected ones
  for (let i = selected.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [selected[i], selected[j]] = [selected[j], selected[i]];
  }

  return selected.slice(0, count);
}
