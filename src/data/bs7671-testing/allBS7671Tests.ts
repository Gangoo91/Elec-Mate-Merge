export interface BS7671TestStep {
  id: string;
  title: string;
  instruction: string;
  expectedResult: string;
  safetyWarning?: string;
  tips?: string[];
  equipment: string[];
  regulationReference?: string;
  realWorldExample?: string;
  apprenticeTip?: string;
  troubleshooting?: string[];
}

export interface BS7671Test {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  purpose: string;
  testLimits: Array<{
    parameter: string;
    limit: string;
    unit: string;
  }>;
  commonIssues: string[];
  steps: BS7671TestStep[];
  regulationClause: string;
}

export const allBS7671Tests: BS7671Test[] = [
  // ─── Test 1: Protective Conductor Continuity ───
  {
    id: 'continuity-protective-conductor',
    title: 'Protective Conductor Continuity',
    description: 'Test the continuity of protective conductors to ensure effective earthing',
    duration: '10-15 mins',
    difficulty: 'Beginner',
    purpose:
      'To verify the continuity of protective conductors and ensure they provide an effective earth fault path',
    testLimits: [
      { parameter: 'Resistance', limit: '≤ 1.67 × line conductor resistance', unit: 'Ω' },
    ],
    commonIssues: [
      'Poor connections at earth terminals',
      'Broken or damaged earth conductors',
      'High resistance readings due to corrosion',
    ],
    regulationClause: 'BS 7671:2018+A3:2024 Regulation 612.2.1',
    steps: [
      {
        id: 'safe-isolation',
        title: 'Safe Isolation and Preparation',
        instruction:
          'Isolate the circuit at the distribution board. Lock off with an MCB lock or warning label. Use a voltage indicator (GS38 compliant) to prove the circuit is dead — test between L-N, L-E, and N-E. Prove your tester on a known live source before and after.',
        expectedResult: 'Voltage indicator confirms 0V on all three tests. Circuit is proven dead.',
        safetyWarning:
          'A broken earth conductor means there is no protection against electric shock on that circuit. Never skip safe isolation — it is the single most important safety step.',
        tips: [
          'Use a proving unit to confirm your voltage indicator works',
          'Lock off at the DB — do not rely on someone not switching it back on',
        ],
        equipment: [
          'Voltage indicator (GS38)',
          'Proving unit',
          'MCB lock-off device',
          'Warning labels',
        ],
        regulationReference: 'GN3 Section 10.3.1',
        apprenticeTip:
          'A broken earth path means a fault cannot trip the MCB. The metalwork stays live and the next person to touch it gets a shock — potentially fatal. This test proves that path is intact.',
        realWorldExample:
          'On a new-build, plaster dust packed into earth terminals can create a high-resistance connection that passes a quick visual check but fails under fault current. Always clean terminals before testing.',
      },
      {
        id: 'null-leads',
        title: 'Null Test Leads',
        instruction:
          'Set your MFT to low-resistance continuity mode (200Ω range). Connect both test leads together and press the null/zero button to remove lead resistance from your readings.',
        expectedResult:
          'Display reads 0.00Ω after nulling. Lead resistance (typically 0.1-0.3Ω) has been subtracted.',
        tips: [
          'Always null before every session and after changing leads',
          'If null value is above 0.5Ω, replace or repair your test leads',
        ],
        equipment: ['Multifunction Tester', 'Test leads'],
        apprenticeTip:
          'Your test leads have their own resistance (typically 0.1-0.3Ω). If you do not null them out, that extra resistance gets added to every single reading — making your results inaccurate and potentially masking a genuine problem.',
      },
      {
        id: 'connect-db',
        title: 'Connect at Distribution Board',
        instruction:
          'Connect one test lead to the line conductor terminal for the circuit under test at the DB. If using the long-lead method (R1+R2), connect between line and CPC at the DB end.',
        expectedResult:
          'Secure connection at the DB with good electrical contact on clean terminals.',
        tips: [
          'Label which MCB you are testing — busy boards with 12+ ways are easy to mix up',
          'Use crocodile clips for a hands-free connection at the DB',
        ],
        equipment: ['Multifunction Tester', 'Test leads', 'Crocodile clips', 'Labels'],
        realWorldExample:
          'On a busy 18-way consumer unit, it is easy to clip onto the wrong MCB terminal. Always trace the conductor visually and label it before testing. Getting the wrong circuit invalidates your results.',
      },
      {
        id: 'bridge-furthest',
        title: 'Bridge Line and CPC at Furthest Point',
        instruction:
          'At the furthest point of the circuit (last socket, last light, etc.), bridge the line conductor to the CPC using a wander lead or by linking at the accessory terminal.',
        expectedResult:
          'Solid bridge connection creating a continuous loop from DB line terminal through the circuit and back via the CPC.',
        tips: [
          'The furthest point gives the highest (worst-case) resistance — this is what goes on the certificate',
          'For lighting circuits, the furthest point is usually the last ceiling rose',
        ],
        equipment: ['Wander lead or short jumper wire'],
        troubleshooting: [
          'No reading at all (OL) — check wander lead connections, then test circuit in sections to locate the break',
          'Intermittent reading — loose terminal at an intermediate point, often a junction box',
          'Reading much higher than expected — corroded terminal or partially broken conductor, test each section individually',
        ],
      },
      {
        id: 'take-measurement',
        title: 'Take and Verify Measurement',
        instruction:
          'Press the test button on your MFT. Record the R1+R2 value displayed. The reading represents the total resistance of the line conductor out to the furthest point plus the CPC back to the DB.',
        expectedResult:
          'Typical domestic readings: 0.05-2.0Ω depending on cable length and size. The measured R1+R2 must be consistent with the cable type and length used.',
        tips: [
          'A suspiciously low reading (close to 0Ω) could indicate a short between L and E — investigate before proceeding',
          'Compare with calculated values: for 2.5/1.5mm² T+E, expect roughly 25.51mΩ/m for R1+R2',
        ],
        equipment: ['Multifunction Tester'],
        apprenticeTip:
          'This R1+R2 value is critical — it gets added to Ze (external earth fault loop impedance) to calculate Zs. If R1+R2 is too high, the circuit cannot disconnect fast enough under fault conditions.',
      },
      {
        id: 'record-remove',
        title: 'Record Results and Remove Bridges',
        instruction:
          'Record the measured R1+R2 value on the schedule of test results against the correct circuit number. Then remove the wander lead/bridge at the furthest point. Verify the circuit reads open-loop (OL) to confirm the bridge is removed.',
        expectedResult:
          'All readings recorded on the certificate. Bridge removed and confirmed by OL reading.',
        tips: [
          'Always remove bridges before moving to the next test — a forgotten bridge creates a direct short when re-energised',
          'Double-check circuit numbers against the DB schedule',
        ],
        equipment: ['Test certificate', 'Pen'],
        apprenticeTip:
          'Leaving a wander lead bridging line to earth is a direct short circuit. When the circuit is re-energised, the MCB will trip immediately — or worse, the wander lead could overheat and start a fire before the MCB trips. Always do a final check.',
      },
    ],
  },

  // ─── Test 2: Ring Final Circuit Continuity ───
  {
    id: 'ring-circuit-continuity',
    title: 'Ring Final Circuit Continuity',
    description: 'Comprehensive testing of ring final circuits for continuity and correct wiring',
    duration: '15-20 mins',
    difficulty: 'Intermediate',
    purpose: 'To verify the continuity and correct wiring of ring final circuits',
    testLimits: [
      { parameter: 'End-to-end resistance', limit: 'Typically < 1', unit: 'Ω' },
      { parameter: 'Cross-connection test', limit: 'Equal readings ±0.05', unit: 'Ω' },
      { parameter: 'Final R1+R2', limit: '≈ 1/4 of end-to-end', unit: 'Ω' },
    ],
    commonIssues: [
      'Broken ring circuit',
      'Incorrect wiring of sockets',
      'Spurs wired as part of ring',
    ],
    regulationClause: 'BS 7671:2018+A3:2024 Regulation 612.2.2',
    steps: [
      {
        id: 'safe-isolation',
        title: 'Safe Isolation and Circuit Identification',
        instruction:
          'Isolate the ring circuit at the distribution board. Prove dead using a GS38-compliant voltage indicator. Identify both legs of the ring at the DB — there should be two line, two neutral, and two earth conductors for each ring circuit.',
        expectedResult: 'Circuit proven dead. Both legs of the ring clearly identified at the DB.',
        safetyWarning:
          'Ensure circuit is isolated and locked off. Prove dead before touching any conductors.',
        tips: [
          'On older installations, rings may share a neutral with another circuit — check carefully',
          'Label both legs clearly (Leg A and Leg B) to avoid confusion',
        ],
        equipment: ['Voltage indicator (GS38)', 'Proving unit', 'MCB lock-off device', 'Labels'],
        apprenticeTip:
          'A broken ring means half the sockets are fed by a single cable that was designed to share the load between two paths. Overloaded cables overheat — this test catches that before it causes a fire.',
        realWorldExample:
          'An old spur taken off the ring can look like the second leg of the ring at the DB. If you see three cables at a socket instead of two, it is likely a spur — trace the wiring before assuming it is part of the ring.',
      },
      {
        id: 'null-leads',
        title: 'Null Test Leads',
        instruction:
          'Set your MFT to low-resistance continuity mode. Connect both test leads together and null/zero the instrument to eliminate lead resistance from all subsequent readings.',
        expectedResult: 'Display reads 0.00Ω after nulling.',
        tips: [
          'Re-null whenever you change test leads or they get warm from handling',
          'Lead resistance above 0.5Ω indicates damaged leads — replace them',
        ],
        equipment: ['Multifunction Tester', 'Test leads'],
        apprenticeTip:
          'Even 0.2Ω of un-nulled lead resistance will throw off your cross-connection readings and could make a broken ring appear to pass. Null every time.',
      },
      {
        id: 'end-to-end',
        title: 'End-to-End Continuity (L-L, N-N, E-E)',
        instruction:
          'At the DB, measure the resistance between the two ends of each conductor pair: Line to Line (r1), Neutral to Neutral (rn), and Earth to Earth (r2). Record all three values.',
        expectedResult:
          'Typical readings: L-L and N-N should be similar (both 2.5mm² in standard T+E). E-E will be higher (1.5mm² CPC). Example for 30m ring: r1 ≈ 0.44Ω, rn ≈ 0.44Ω, r2 ≈ 0.73Ω.',
        tips: [
          'If L-L ≠ N-N significantly, suspect a cross-connection or broken ring in one conductor',
          'For 2.5/1.5mm² T+E: expect r2 to be approximately 1.67× r1 (ratio of resistances per metre)',
        ],
        equipment: ['Multifunction Tester', 'Test leads'],
        troubleshooting: [
          'OL reading on one pair — that conductor ring is broken, test in sections to locate the break',
          'L-L reading much lower than N-N — suspect a spur has been incorrectly identified as a ring leg',
          'All three readings identical — unusual, double-check you are not measuring the same conductor twice',
        ],
      },
      {
        id: 'cross-connection',
        title: 'Cross-Connection Setup',
        instruction:
          'At the DB, cross-connect: join Line of Leg A to Neutral of Leg B, and Neutral of Leg A to Line of Leg B. Use Wago 221 connectors for clean, reliable temporary connections. This creates a figure-of-eight circuit through the ring.',
        expectedResult:
          'Cross-connections secure and verified. The figure-of-eight path is complete.',
        tips: [
          'Draw the figure-of-eight diagram before connecting — it makes the logic much clearer',
          'Wago 221 lever connectors are ideal — quick, reliable, and easy to remove after testing',
        ],
        equipment: ['Multifunction Tester', 'Test leads', 'Wago 221 connectors'],
        realWorldExample:
          'Using Wago 221 connectors for cross-connections is much cleaner than twisting wires together. They grip securely, release easily, and you can see the conductor through the clear housing to confirm a good connection.',
        apprenticeTip:
          'The cross-connection creates a figure-of-eight so that at every socket, you are measuring the resistance of half the ring via line and half via neutral. If the ring is complete, all sockets should read the same.',
      },
      {
        id: 'test-each-socket',
        title: 'Test at Each Socket Outlet',
        instruction:
          'With cross-connections in place, test between line and neutral at every socket on the ring. Record each reading. All readings should be substantially the same — the highest reading indicates the midpoint of the ring.',
        expectedResult:
          'All readings within 0.05Ω of each other. Expected value ≈ (r1 + rn) / 4. The highest reading identifies the midpoint socket.',
        tips: [
          'If one socket reads significantly higher, it may be a spur rather than part of the ring',
          'The midpoint socket should read approximately (r1 + rn) / 4',
        ],
        equipment: ['Multifunction Tester', 'Test leads'],
        troubleshooting: [
          'One socket reads much higher than others — likely a spur, not part of the ring',
          'Progressively increasing readings — ring may be broken, with all sockets fed from one leg',
          'Reading at one socket is very low — possible cross-connection fault in the wiring',
        ],
      },
      {
        id: 'cross-connection-earth',
        title: 'Repeat Cross-Connection for Earth',
        instruction:
          'Remove the L-N cross-connections. Now cross-connect: Line of Leg A to Earth of Leg B, and Earth of Leg A to Line of Leg B. Test between line and earth at each socket outlet.',
        expectedResult:
          'All readings within 0.05Ω of each other. Expected value ≈ (r1 + r2) / 4. The highest reading is the worst-case R1+R2 for the ring.',
        tips: [
          'The highest reading from this test is the R1+R2 value that goes on the certificate',
          'This reading gets added to Ze to calculate Zs — if it is too high, the circuit fails',
        ],
        equipment: ['Multifunction Tester', 'Test leads', 'Wago 221 connectors'],
        apprenticeTip:
          'The highest R1+R2 from this cross-connection test represents the worst-case earth fault path on the ring. This is the value that determines whether the circuit can disconnect fast enough to protect someone from a shock.',
      },
      {
        id: 'reconnect-verify',
        title: 'Reconnect and Final Verification',
        instruction:
          'Remove all cross-connections and reconnect the ring circuit normally at the DB. Verify each conductor pair is back in its correct terminal. Tighten all terminals to the correct torque.',
        expectedResult:
          'Ring circuit reconnected correctly. Final check: R1+R2 at the furthest socket ≈ ¼ of end-to-end readings.',
        tips: [
          'Always verify the ring is correctly reconnected — swapped legs will cause problems',
          'Check all terminal screws are tight — a loose connection is an arc fault risk',
        ],
        equipment: ['Multifunction Tester', 'Test leads', 'Torque screwdriver'],
        realWorldExample:
          'After testing, a loose terminal at the DB is a common cause of arcing and overheating. Use a torque screwdriver if specified by the manufacturer — over-tightening can damage the terminal, under-tightening allows movement.',
      },
    ],
  },

  // ─── Test 3: Insulation Resistance Testing ───
  {
    id: 'insulation-resistance-testing',
    title: 'Insulation Resistance Testing',
    description: 'Test insulation resistance between conductors to ensure electrical safety',
    duration: '15-25 mins',
    difficulty: 'Intermediate',
    purpose: 'To verify the integrity of cable insulation and prevent dangerous leakage currents',
    testLimits: [
      { parameter: 'Circuits ≤ 500V', limit: '≥ 1', unit: 'MΩ' },
      { parameter: 'SELV/PELV circuits (250V DC test)', limit: '≥ 0.5', unit: 'MΩ' },
      { parameter: 'Above 500V circuits (1000V DC test)', limit: '≥ 1.0', unit: 'MΩ' },
    ],
    commonIssues: [
      'Moisture ingress in cables',
      'Damaged cable insulation',
      'Electronic equipment not isolated',
    ],
    regulationClause: 'BS 7671:2018+A3:2024 Regulation 612.3',
    steps: [
      {
        id: 'isolate-equipment',
        title: 'Identify and Isolate Sensitive Equipment',
        instruction:
          'Survey the installation and disconnect or isolate ALL electronic and sensitive equipment: LED drivers, dimmer switches, smart thermostats, induction hobs, USB sockets, surge protection devices (SPDs), smoke detectors with electronics, RCBOs with electronic trip mechanisms, PIR sensors, and any equipment with a microprocessor.',
        expectedResult:
          'All sensitive equipment identified, listed, and disconnected. Only passive components (cable, switches, basic socket outlets) remain connected.',
        safetyWarning:
          '500V DC applied during this test WILL destroy electronic components. You are liable for the cost of replacement if equipment is damaged due to inadequate isolation.',
        tips: [
          'Walk every room and make a written list of items disconnected — you will need it to reconnect afterwards',
          'Modern kitchens are full of electronics: induction hobs, LED under-cabinet lights, smart appliances, USB sockets',
        ],
        equipment: ['Multifunction Tester', 'Notepad for disconnection list'],
        apprenticeTip:
          '500V DC will destroy electronic components instantly — LED drivers, smart thermostats, USB sockets, induction hob controllers. If you break it, it comes out of your pocket. Take 10 minutes to disconnect everything properly.',
        realWorldExample:
          'A modern kitchen can have 6+ electronic items on a single ring: LED plinth lights, under-cabinet LEDs, USB sockets, induction hob, smart extractor, and a boiling water tap. Miss one and you are buying a replacement.',
      },
      {
        id: 'set-test-voltage',
        title: 'Set MFT to Correct Test Voltage',
        instruction:
          'Select the correct insulation resistance test voltage on your MFT based on the circuit nominal voltage: 250V DC for SELV/PELV circuits, 500V DC for circuits up to and including 500V (most domestic), 1000V DC for circuits above 500V. This is specified in BS 7671 Table 6A.',
        expectedResult: 'MFT set to the correct test voltage for the circuit under test.',
        tips: [
          'Most domestic circuits are 230V nominal — use 500V DC test voltage',
          'SELV circuits (doorbells, bathroom shaver supplies) use 250V DC test voltage',
          'Three-phase 400V circuits still use 500V DC (nominal is ≤500V)',
        ],
        equipment: ['Multifunction Tester'],
        regulationReference: 'BS 7671 Table 6A',
        apprenticeTip:
          'Table 6A is one of the most referenced tables in BS 7671 — it tells you exactly which test voltage and minimum insulation resistance to use. Learn it by heart: 250V test = 0.5MΩ min, 500V test = 1MΩ min, 1000V test = 1MΩ min.',
      },
      {
        id: 'link-live-conductors',
        title: 'Link Live Conductors at DB',
        instruction:
          'At the distribution board, temporarily link all line conductors together and all neutral conductors together. This allows you to test all circuits simultaneously rather than individually, saving considerable time on larger boards.',
        expectedResult:
          'All line conductors linked. All neutral conductors linked. Ready for bulk testing.',
        tips: [
          'Linking L+N saves 12 separate tests on a 12-way board — well worth the setup time',
          'Use Wago connectors or a purpose-made linking bar for clean temporary connections',
        ],
        equipment: ['Multifunction Tester', 'Wago connectors or linking bar'],
        apprenticeTip:
          'On a 12-way board, testing each circuit individually L-E, N-E, and L-N means 36 tests. Linking all lines together and all neutrals together lets you do it in 3 tests. Same result, fraction of the time.',
      },
      {
        id: 'test-live-to-earth',
        title: 'Test Live Conductors to Earth',
        instruction:
          'Connect one test lead to the linked live conductors (L+N) and the other to the main earth terminal. Press and hold the test button until the reading stabilises (typically 15-30 seconds for long cable runs).',
        expectedResult:
          'Minimum 1MΩ for 500V test. New installations typically read 200MΩ+ (often exceeding the meter range). Existing installations: 2MΩ+ is normal, below 2MΩ warrants investigation.',
        safetyWarning:
          '500V DC is present on all conductors during this test. Do not touch any exposed metalwork. Place warning signs at the DB.',
        tips: [
          'Allow the reading to fully stabilise — capacitance in long cable runs causes the reading to climb slowly',
          'A reading that starts high then slowly drops may indicate moisture ingress',
        ],
        equipment: ['Multifunction Tester', 'Insulation test leads', 'Warning signs'],
        apprenticeTip:
          'New cable should read well over 200MΩ — often the meter just shows a > symbol because it is beyond range. If you get anything below 2MΩ on a new installation, something is seriously wrong — probably a nail through a cable.',
      },
      {
        id: 'test-line-neutral',
        title: 'Test Line to Neutral',
        instruction:
          'Remove the link between line and neutral conductors. Test between the linked line conductors and the linked neutral conductors.',
        expectedResult: 'Minimum 1MΩ. Similar to the L-E reading on a healthy installation.',
        tips: [
          'If this reading is significantly lower than L-E, suspect a piece of equipment still connected (especially one with a filter capacitor)',
          'On lighting circuits, ensure all switches are in the ON position to include the switch wire in the test',
        ],
        equipment: ['Multifunction Tester', 'Insulation test leads'],
        troubleshooting: [
          'Low reading (below 1MΩ) — check all equipment is disconnected, especially items with EMC filters',
          'Reading drops slowly over time — moisture ingress in cable run, especially outdoor or underground sections',
          'Zero or near-zero reading — direct short between L and N, likely nail/screw damage or crushed cable',
        ],
      },
      {
        id: 'test-neutral-earth',
        title: 'Test Neutral to Earth',
        instruction: 'Test between the linked neutral conductors and the main earth terminal.',
        expectedResult: 'Minimum 1MΩ. Should be similar to the other two readings.',
        tips: [
          'In TN-C-S systems, you MUST disconnect the incoming neutral before this test — neutral and earth are bonded at the supply',
          'If you cannot disconnect the incoming neutral, record it as N/A with an explanation',
        ],
        equipment: ['Multifunction Tester', 'Insulation test leads'],
        apprenticeTip:
          'In a TN-C-S (PME) system, neutral and earth are bonded together at the supply transformer. If you do not disconnect the incoming neutral, you are testing the bond — not the insulation. The reading will be very low and it is correct, but it is not an insulation resistance reading.',
      },
      {
        id: 'reconnect-verify',
        title: 'Reconnect All Equipment and Verify',
        instruction:
          'Remove all temporary links at the DB. Reconnect all equipment that was disconnected (use your list). Re-energise the installation and verify every circuit is working correctly — power up and physically check each one.',
        expectedResult:
          'All equipment reconnected and functioning. All circuits operational. No tripped MCBs or RCDs.',
        tips: [
          'Work through your disconnection list methodically — missing one item means a callback',
          'Power up and check every circuit: lights, sockets, cooker, immersion, outside lights',
        ],
        equipment: ['Disconnection list', 'Voltage indicator'],
        realWorldExample:
          'The worst callback is the customer phoning 3 days later because their LED kitchen lights do not work. You disconnected the driver for insulation testing and forgot to reconnect it. Power up and physically verify every circuit before you leave.',
      },
    ],
  },

  // ─── Test 4: Polarity Testing ───
  {
    id: 'polarity-testing',
    title: 'Polarity Testing',
    description: 'Verify correct polarity of all electrical connections',
    duration: '10-15 mins',
    difficulty: 'Beginner',
    purpose:
      'To ensure phase and neutral conductors are correctly connected and switches interrupt the phase conductor',
    testLimits: [
      { parameter: 'Switch connections', limit: 'Phase conductor only', unit: '-' },
      { parameter: 'Socket outlets', limit: 'Correct polarity', unit: '-' },
      { parameter: 'Screw-in lampholders', limit: 'Phase to centre contact', unit: '-' },
    ],
    commonIssues: [
      'Reversed phase and neutral connections',
      'Switches connected to neutral instead of phase',
      'Incorrect socket wiring',
    ],
    regulationClause: 'BS 7671:2018+A3:2024 Regulation 612.6',
    steps: [
      {
        id: 'visual-inspection-db',
        title: 'Visual Inspection at DB',
        instruction:
          'With the installation isolated and proven dead, visually inspect all connections at the distribution board. Verify that all MCBs are connected on the line (brown) conductor, all neutral conductors (blue) go to the neutral bar, and all CPCs (green/yellow) go to the earth bar.',
        expectedResult:
          'All connections at the DB are correctly polarised. No cross-wired circuits visible.',
        safetyWarning:
          'Ensure installation is fully isolated before inspection. Prove dead on every circuit.',
        tips: [
          'Old wiring colours: red = line, black = neutral, bare/green = earth',
          'Check for DIY work where colours may have been swapped or non-standard cables used',
        ],
        equipment: ['Voltage indicator (GS38)', 'Torch'],
        apprenticeTip:
          'If a switch is wired in the neutral instead of the line, the light works fine — but the lampholder is permanently live even with the switch off. Someone changing a bulb gets a fatal shock from something that appears to be switched off.',
      },
      {
        id: 'continuity-polarity',
        title: 'Continuity-Based Polarity Test',
        instruction:
          'With the installation isolated, use the continuity function of your MFT. Connect one lead to the line busbar at the DB. At each accessory, test that continuity exists between the DB line busbar and the line terminal of the accessory. Repeat for switches — verify the switch breaks the line conductor, not the neutral.',
        expectedResult:
          'Continuity confirmed between DB line busbar and line terminals at all accessories. Switches interrupt the line conductor.',
        tips: [
          'For lighting circuits, turn all light switches to the ON position to create a continuous path through the switch wire',
          'Two-way switching: test with switches in both positions to verify correct wiring',
        ],
        equipment: ['Multifunction Tester', 'Test leads', 'Wander lead'],
        troubleshooting: [
          'Continuity to neutral terminal instead of line — conductors are reversed at the accessory',
          'No continuity with switch ON — switch may be wired in a spur or the switch wire is broken',
          'Continuity on both line and neutral from DB line — short circuit in the cable',
        ],
      },
      {
        id: 'edison-screw',
        title: 'Check Edison Screw Lampholders',
        instruction:
          'At every Edison screw (ES/E27) lampholder, verify that the line conductor connects to the centre pin contact, NOT the screw thread. The screw thread is the part that can be touched during bulb changing and must be connected to neutral.',
        expectedResult: 'Line conductor connected to centre pin on all Edison screw lampholders.',
        tips: [
          'Use continuity from DB line busbar to the centre pin to confirm correct polarity',
          'Bayonet cap (BC/B22) lampholders do not have the same risk — but still check polarity',
        ],
        equipment: ['Multifunction Tester', 'Test leads'],
        apprenticeTip:
          'The screw thread on an Edison screw lampholder is the touchable part — your fingers grip it when screwing in a bulb. If line is on the thread instead of the centre pin, you are gripping a live conductor. This is why polarity matters on lampholders specifically.',
      },
      {
        id: 'live-verification',
        title: 'Live Test Verification',
        instruction:
          'After dead testing is complete, re-energise the installation. Use an approved voltage indicator (GS38 compliant) to verify correct polarity at each socket outlet and accessible point. Prove your tester before and after on a known live source.',
        expectedResult:
          'Voltage present between L-N and L-E at all socket outlets. No voltage between N-E (or very low). Phase confirmed at correct terminals.',
        safetyWarning:
          'Live testing — use GS38-compliant test leads, appropriate PPE, and safe working practices. Prove your tester before and after use.',
        tips: [
          'A plug-in socket tester shows basic polarity but cannot detect all faults — it is not a substitute for proper testing',
          'Check that RCDs have been reset after re-energising',
        ],
        equipment: ['Approved voltage indicator (GS38)', 'PPE', 'Proving unit'],
        realWorldExample:
          "A cheap plug-in socket tester will show 'correct' even when the earth is missing on some fault combinations. They are useful as a quick check but never rely on them as your only polarity verification.",
      },
      {
        id: 'record-document',
        title: 'Record and Document',
        instruction:
          'Record polarity test results in the polarity column of the schedule of test results. Mark each circuit as correct or note any faults found and corrected.',
        expectedResult:
          'All circuits documented with polarity confirmation on the test certificate.',
        tips: [
          'If you found and corrected a reversed polarity, re-test after the correction and record the final result',
          'Note any circuits where polarity could not be verified (e.g. fixed equipment not accessible)',
        ],
        equipment: ['Test certificate', 'Pen'],
      },
    ],
  },

  // ─── Test 5: Earth Fault Loop Impedance (Zs) ───
  {
    id: 'earth-fault-loop-impedance',
    title: 'Earth Fault Loop Impedance (Zs)',
    description: 'Measure earth fault loop impedance to ensure adequate fault protection',
    duration: '10-15 mins',
    difficulty: 'Intermediate',
    purpose:
      'To verify that the earth fault loop impedance is low enough to ensure automatic disconnection in the event of an earth fault',
    testLimits: [
      { parameter: 'Ring circuits (32A Type B MCB)', limit: '≤ 1.37', unit: 'Ω' },
      { parameter: 'Radial circuits (20A Type B MCB)', limit: '≤ 2.19', unit: 'Ω' },
      { parameter: 'Lighting circuits (6A Type B MCB)', limit: '≤ 7.28', unit: 'Ω' },
    ],
    commonIssues: [
      'High external earth fault loop impedance',
      'Poor earthing arrangements',
      'Long cable runs increasing impedance',
    ],
    regulationClause: 'BS 7671:2018+A3:2024 Regulation 612.9',
    steps: [
      {
        id: 'preparation-rcd',
        title: 'Preparation and RCD Bypass',
        instruction:
          'Set your MFT to earth fault loop impedance (Zs) mode. If the circuit is protected by an RCD, you must either use the no-trip (2-wire) Zs function on your MFT, or temporarily bypass the RCD with a proper bypass link. The Zs test injects current that will trip an RCD every time without bypass.',
        expectedResult: 'MFT set to Zs mode. RCD bypassed or no-trip mode selected.',
        safetyWarning:
          'If bypassing an RCD, use a proper bypass link — never jam a wire behind the RCD or tape the mechanism. Remove the bypass immediately after testing.',
        tips: [
          'Most modern MFTs have a no-trip (2-wire) Zs function — use it where possible to avoid bypassing',
          'If you must bypass, use a purpose-made RCD bypass link rated for the circuit',
        ],
        equipment: ['Multifunction Tester', 'Test leads', 'RCD bypass link (if needed)'],
        apprenticeTip:
          'The Zs test works by injecting a pulse of current through the earth fault loop. An RCD sees this as an earth fault (which it is, briefly) and trips. Without no-trip mode or a bypass, you will trip the RCD every single time you press the test button.',
        realWorldExample:
          'A proper bypass link connects across the RCD load and line terminals temporarily. Never use a piece of wire jammed behind the RCD mechanism — it can slip, damage the RCD, or leave the bypass in place accidentally.',
      },
      {
        id: 'measure-ze',
        title: 'Measure Ze at the Origin',
        instruction:
          'Before testing individual circuits, measure the external earth fault loop impedance (Ze) at the origin of the installation. Disconnect the main earthing conductor from the MET and test between the incoming line and the supply earth.',
        expectedResult:
          'Typical values: TN-S (cable sheath earth) ≤ 0.8Ω, TN-C-S (PME) ≤ 0.35Ω, TT (earth rod) can be 20Ω+.',
        safetyWarning:
          'Disconnecting the main earth removes all earth protection from the installation. Keep the disconnection time to an absolute minimum.',
        tips: [
          "Ze is the DNO's contribution to the earth fault loop — you cannot change it",
          'If Ze is too high, the problem is on the supply side — contact the DNO',
        ],
        equipment: ['Multifunction Tester', 'Test leads'],
        apprenticeTip:
          'Ze is everything outside your installation — the supply transformer winding, the line conductor back to the transformer, and the earth path back. You cannot reduce Ze; you can only check it is within acceptable limits and design the installation accordingly.',
      },
      {
        id: 'measure-zs',
        title: 'Measure Zs at Each Circuit',
        instruction:
          'Reconnect the main earth. At the furthest point of each circuit, measure Zs between line and earth. For socket circuits, test at the furthest socket. For lighting, test at the furthest luminaire point.',
        expectedResult:
          'Zs reading at each circuit within the maximum permitted value for the protective device. Example: 32A Type B MCB → measured Zs must be ≤ 1.37Ω (tabulated value with Cmin = 0.95 already applied per BS 7671 Table 41.3).',
        tips: [
          'Always test at the furthest point — this gives the highest (worst-case) impedance',
          'For ring circuits, the furthest point is the midpoint of the ring',
        ],
        equipment: ['Multifunction Tester', 'Test leads'],
        realWorldExample:
          'On a kitchen ring circuit, the furthest point is usually the socket behind the fridge or freezer — the one that is hardest to reach. You still need to pull it out and test there.',
      },
      {
        id: 'temperature-correction',
        title: 'Apply Temperature Correction',
        instruction:
          'The tabulated Zs values in BS 7671 assume conductors are at their maximum operating temperature. Since you test at ambient temperature (lower resistance), you must apply a correction factor. Rule of thumb: multiply the tabulated maximum Zs by 0.8 to get the maximum allowable measured value at ambient.',
        expectedResult:
          'All measured Zs values are below 80% of the tabulated maximum. Example: 32A Type B MCB has tabulated Zs of 1.37Ω (Cmin = 0.95) × 0.8 = 1.10Ω maximum measured at ambient.',
        tips: [
          'The 0.8 factor is conservative and works for most domestic situations',
          'For precise work, use the formula: measured max = tabulated Zs × (1 / (1 + temperature coefficient × temperature rise))',
        ],
        equipment: ['BS 7671 regulations', 'Calculator'],
        apprenticeTip:
          'Hot copper has higher resistance than cold copper. You test at room temperature, but under fault conditions the cable heats up rapidly. The 0.8 rule accounts for this: tabulated Zs × 0.8 = your maximum measured value. Example: 32A Type B = 1.37 × 0.8 = 1.10Ω (tabulated values already include Cmin = 0.95).',
      },
      {
        id: 'verify-device',
        title: 'Verify Against Protective Device',
        instruction:
          'Compare each measured Zs with the corrected maximum for the specific protective device. Verify the protective device can disconnect within the required time (0.4s for socket circuits, 5s for fixed equipment in TN systems).',
        expectedResult:
          'All measured Zs values within limits for their respective protective devices.',
        tips: [
          'BS 7671 Appendix 3 (Tables 41.2-41.4) gives maximum Zs for common MCB types',
          'For TT systems, disconnection relies on the RCD, not the MCB — Zs limits are much higher',
        ],
        equipment: ['BS 7671 regulations', 'Calculator'],
        troubleshooting: [
          'Zs too high but R1+R2 is fine — the problem is Ze (supply side), contact the DNO',
          'Zs too high and R1+R2 is also high — long cable run or undersized conductors, consider upgrading cable',
          'Zs just over the limit — check if a Type C MCB was fitted instead of Type B (Type C has lower Zs limits)',
          'TT system with high Zs — this is normal for TT, protection relies on the RCD not the Zs value',
        ],
      },
      {
        id: 'record-results',
        title: 'Record Results',
        instruction:
          'Record the measured Zs value (not the corrected value) on the schedule of test results for each circuit. Also record Ze on the test certificate. Remove any RCD bypass links.',
        expectedResult:
          'All Zs and Ze values recorded. RCD bypass removed and RCD tested for correct operation.',
        tips: [
          'Record the actual measured value — the examiner or verifier applies the correction factor themselves',
          'Always remove bypass links and re-test the RCD after Zs testing is complete',
        ],
        equipment: ['Test certificate', 'Pen'],
      },
    ],
  },

  // ─── Test 6: RCD Testing ───
  {
    id: 'rcd-testing',
    title: 'RCD Testing',
    description: 'Comprehensive testing of RCD operation and trip times',
    duration: '15-20 mins',
    difficulty: 'Intermediate',
    purpose: 'To verify correct operation of residual current devices for additional protection',
    testLimits: [
      { parameter: 'Trip current (general use)', limit: '≤ 30', unit: 'mA' },
      { parameter: 'Trip time at 1×IΔn', limit: '≤ 300', unit: 'ms' },
      { parameter: 'Trip time at 5×IΔn', limit: '≤ 40', unit: 'ms' },
      { parameter: 'Non-trip at 50% IΔn', limit: 'No trip', unit: '-' },
    ],
    commonIssues: [
      'RCD fails to trip within time limits',
      'Nuisance tripping due to leakage',
      'Mechanical failure of RCD',
    ],
    regulationClause: 'BS 7671:2018+A3:2024 Regulation 612.13',
    steps: [
      {
        id: 'identify-type',
        title: 'Identify RCD Type and Rating',
        instruction:
          'Before testing, identify each RCD: its type (AC, A, B, F, or S), its rated residual current (IΔn — typically 30mA for additional protection), and its rated current. Type S (selective/time-delayed) RCDs have different trip time requirements. Record all details.',
        expectedResult:
          'All RCDs identified by type, IΔn, and rated current. Test parameters set accordingly.',
        tips: [
          'Type S (selective) RCDs have a built-in time delay and different trip time limits — ≤200ms at 1×IΔn',
          'Modern split-load boards may have a mix of types — test each one according to its specific type',
        ],
        equipment: ['RCD Tester', 'Test leads'],
        apprenticeTip:
          'RCD types behave differently: Type AC detects AC fault currents only. Type A also detects pulsating DC (from electronics). Type B detects smooth DC. Type S has a time delay for selectivity. You must know which you are testing to set the correct parameters on your tester.',
        realWorldExample:
          'A modern consumer unit might have a Type S RCCB as the main switch (time-delayed) with Type A RCBOs on individual circuits. The Type S has different trip time limits — do not use the same pass/fail criteria for both.',
      },
      {
        id: 'visual-pushbutton',
        title: 'Visual Inspection and Push Button Test',
        instruction:
          'Visually inspect the RCD for damage, overheating marks, or loose connections. Press the integral push-button test on the RCD. It should trip immediately and reset cleanly. This tests the mechanical operation only — not the electrical trip characteristics.',
        expectedResult:
          'RCD trips instantly on push-button press and resets cleanly without sticking.',
        safetyWarning:
          'If the push-button test fails (RCD does not trip), the RCD is faulty. Do not proceed with electrical testing — advise replacement immediately.',
        tips: [
          'The push button only tests the mechanical trip — it does not prove the RCD will trip at its rated current',
          'Advise the customer to test the push button quarterly as routine maintenance',
        ],
        equipment: ['Visual inspection'],
      },
      {
        id: 'connect-tester',
        title: 'Connect RCD Tester',
        instruction:
          'Connect your RCD tester to a socket outlet or test point on the circuit protected by the RCD. Set the tester for the correct IΔn (typically 30mA). Select the first test — 50% (non-trip) test.',
        expectedResult:
          'RCD tester connected and configured for the correct rated residual current.',
        tips: [
          'Test from the furthest point on the circuit for the most realistic result',
          'Ensure the RCD tester is set to the correct IΔn before pressing test',
        ],
        equipment: ['RCD Tester', 'Test leads'],
      },
      {
        id: 'fifty-percent',
        title: '50% Test (Non-Trip)',
        instruction:
          'Inject 50% of the rated residual current (15mA for a 30mA RCD). The RCD must NOT trip at this level. If it does, there is excessive background leakage on the circuit.',
        expectedResult:
          'RCD does not trip at 50% IΔn. This confirms the RCD is not over-sensitive.',
        tips: [
          'If the RCD trips at 50%, measure the circuit leakage current separately',
          'Common sources of background leakage: LED drivers, EMC filters in appliances, long cable runs',
        ],
        equipment: ['RCD Tester'],
        apprenticeTip:
          'If the RCD trips at only 15mA (50%), it means there is already significant leakage current on the circuit. When you add the test current to the existing leakage, it exceeds the trip threshold. This is why the customer complains of nuisance tripping.',
        troubleshooting: [
          'Trips at 50% — measure circuit leakage current, then disconnect loads one by one to find the source',
          'Background leakage from LED drivers and EMC filters is the most common cause',
          'Multiple LED downlights on one circuit can collectively produce enough leakage to cause trips',
        ],
      },
      {
        id: 'hundred-percent',
        title: '100% Test at 0° and 180°',
        instruction:
          'Inject 100% of IΔn (30mA for a 30mA RCD) at 0° phase angle, then reset and repeat at 180° phase angle. Record the trip time for both tests. The RCD must trip within 300ms at both phase angles (200ms for Type S).',
        expectedResult:
          'Trip time ≤ 300ms (or ≤ 200ms for Type S) at both 0° and 180°. Record the longer of the two readings.',
        tips: [
          'Testing at both phase angles ensures the RCD works regardless of where in the AC cycle the fault occurs',
          'Record the longer of the two readings — this is the worst-case scenario',
        ],
        equipment: ['RCD Tester', 'Test leads'],
      },
      {
        id: 'five-times',
        title: '5× Test (Fast Trip)',
        instruction:
          'Inject 5× the rated residual current (150mA for a 30mA RCD). The RCD must trip within 40ms. This test verifies the RCD provides protection against direct contact — at 150mA, current is already dangerous, and 40ms is the maximum time to prevent ventricular fibrillation.',
        expectedResult: 'Trip time ≤ 40ms at 5× IΔn.',
        tips: [
          'This is the most critical test for personal safety — it proves the RCD can save a life',
          'Type S RCDs are permitted ≤ 150ms at 5× IΔn due to their intentional time delay',
        ],
        equipment: ['RCD Tester', 'Test leads'],
        apprenticeTip:
          'At 150mA through the body, ventricular fibrillation can start within 40ms. The 5× test proves the RCD can disconnect in time to prevent death. This is the most important trip time — especially for bathroom, outdoor, and socket circuits where people are most at risk.',
        realWorldExample:
          'Bathroom circuits and outdoor sockets are where people are most vulnerable — wet skin reduces body resistance dramatically. The 5× test at 40ms is what stands between a tingle and a fatality on these circuits.',
      },
      {
        id: 'record-reset',
        title: 'Record Results and Reset',
        instruction:
          'Record all four test results (50% non-trip, 100% at 0°, 100° at 180°, and 5× trip time) on the schedule of test results. Reset the RCD. Verify all downstream circuits have been restored — check that loads are operating.',
        expectedResult:
          'All trip times recorded on certificate. RCD reset. All downstream circuits confirmed operational.',
        tips: [
          'After repeated tripping, check that electronic equipment has restarted correctly',
          'Advise the customer that clocks, timers, and programmable devices may need resetting',
        ],
        equipment: ['Test certificate', 'Pen'],
        realWorldExample:
          "After RCD testing, the customer's heating programmer, oven clock, and alarm system will all need resetting. Warn them before you start, or better yet, note the settings before you begin testing.",
      },
    ],
  },

  // ─── Test 7: Prospective Fault Current (PFC) ───
  {
    id: 'prospective-fault-current',
    title: 'Prospective Fault Current (PFC)',
    description: 'Measure prospective short circuit and earth fault currents',
    duration: '10-15 mins',
    difficulty: 'Advanced',
    purpose: 'To verify that protective devices can safely interrupt fault currents',
    testLimits: [
      { parameter: 'Domestic installations', limit: 'Typically 1-6', unit: 'kA' },
      { parameter: 'Commercial installations', limit: 'Varies by supply', unit: 'kA' },
      { parameter: 'Breaking capacity', limit: 'Must exceed PFC', unit: 'kA' },
    ],
    commonIssues: [
      'PFC exceeds protective device rating',
      'High fault currents in urban areas',
      'Inadequate cable sizing for fault conditions',
    ],
    regulationClause: 'BS 7671:2018+A3:2024 Regulation 612.11',
    steps: [
      {
        id: 'understand-pfc',
        title: 'Understand Why PFC Matters',
        instruction:
          'Prospective fault current is the maximum current that would flow if a dead short occurred at the point of measurement. Every protective device (MCB, RCBO, fuse) has a maximum breaking capacity — the highest current it can safely interrupt. If PFC exceeds this rating, the device cannot break the fault and may explode or catch fire.',
        expectedResult:
          'Understanding of PFC principles and why this test is mandatory on every installation.',
        tips: [
          'PFC is highest at the origin (closest to the supply transformer) and decreases along the circuit',
          'You only need to measure at the origin and at any sub-distribution boards',
        ],
        equipment: ['Multifunction Tester'],
        apprenticeTip:
          'Imagine a dead short — line touches neutral or earth directly. Thousands of amps try to flow. The MCB has to break that current safely. If the fault current exceeds what the MCB can handle, the contacts weld together or the device explodes. That is why PFC matters.',
        realWorldExample:
          'Near a substation in an urban area, PFC can be 10kA or more. Standard domestic MCBs are typically rated at 6kA. If measured PFC is 8kA but all MCBs are only rated 6kA, every device needs upgrading — an expensive discovery.',
      },
      {
        id: 'setup-connect',
        title: 'Set MFT and Connect for PSCC',
        instruction:
          'Set your MFT to prospective fault current (PFC) mode. Connect between line and neutral at the origin of the installation (main switch or incoming terminals). This is a live test — use GS38-compliant test leads and appropriate PPE.',
        expectedResult: 'MFT connected at the origin and ready for PSCC measurement.',
        safetyWarning:
          'This is a live test at the origin of the installation. Use GS38-compliant test leads, insulated tools, and appropriate PPE. Ensure adequate workspace clearance.',
        tips: [
          'Test at the origin first — this is the highest PFC point and the worst-case value for the whole installation',
          'Use appropriate fused test leads rated for PFC testing',
        ],
        equipment: ['Multifunction Tester', 'GS38 test leads', 'PPE'],
      },
      {
        id: 'measure-pscc',
        title: 'Measure PSCC',
        instruction:
          'Press the test button to measure the prospective short circuit current (PSCC) between line and neutral. Record the value.',
        expectedResult:
          'Typical domestic values: 1-3kA in suburban areas, 3-6kA in urban areas, potentially higher near substations.',
        tips: [
          'This is the maximum current if line touches neutral directly',
          'The reading is calculated from the measured loop impedance — lower impedance = higher fault current',
        ],
        equipment: ['Multifunction Tester'],
      },
      {
        id: 'measure-pefc',
        title: 'Measure PEFC',
        instruction:
          'Move one test lead from neutral to earth. Measure the prospective earth fault current (PEFC) between line and earth at the origin.',
        expectedResult:
          'PEFC is usually slightly lower than PSCC because the earth path typically has higher impedance than the neutral path.',
        tips: [
          'In TN-C-S systems, PEFC may be close to PSCC because neutral and earth share a path back to the transformer',
          'In TT systems, PEFC can be much lower than PSCC due to the high earth electrode resistance',
        ],
        equipment: ['Multifunction Tester'],
      },
      {
        id: 'compare-breaking',
        title: 'Compare with Device Breaking Capacity',
        instruction:
          'Compare the higher of PSCC and PEFC with the breaking capacity of every protective device in the installation. The breaking capacity is shown on the device as a number inside a rectangle (e.g., 6000 inside a rectangle = 6kA breaking capacity).',
        expectedResult:
          'All protective devices have a breaking capacity that exceeds the measured PFC. Example: measured PFC = 4.5kA, MCB rated 6kA = PASS.',
        tips: [
          'The kA rating is printed on the front of the MCB — look for a number inside a rectangle',
          'If PFC exceeds device rating, the device must be upgraded or a back-up protective device installed',
        ],
        equipment: ['Device datasheets', 'Calculator'],
        realWorldExample:
          'The kA rating on an MCB is the number inside a rectangle on the front face. 6000 in a rectangle = 6kA. If your measured PFC is 4.5kA and all MCBs are rated 6kA, they all pass. Simple as that.',
        troubleshooting: [
          'PFC exceeds MCB rating — upgrade to MCBs with higher breaking capacity, or install an HRC fuse upstream as back-up protection',
          'PFC seems unusually high — verify your test connections and re-test, check for supply changes',
          'PFC seems unusually low — may indicate a high-impedance connection on the incoming supply, could be a loose main fuse',
        ],
      },
      {
        id: 'record-certificate',
        title: 'Record on Certificate',
        instruction:
          'Record the higher of PSCC and PEFC on the electrical installation certificate (EIC) or condition report (EICR). This is recorded at the origin. If sub-distribution boards exist, measure and record PFC at each one.',
        expectedResult:
          'PFC values recorded on the certificate. All protective devices confirmed adequate.',
        tips: [
          'Only the higher value (PSCC or PEFC) needs to be recorded — this is the worst case',
          'If there are sub-DBs, measure PFC at each sub-DB as well — it will be lower than at the origin',
        ],
        equipment: ['Test certificate', 'Pen'],
      },
    ],
  },

  // ─── Test 8: Phase Sequence Testing ───
  {
    id: 'phase-sequence',
    title: 'Phase Sequence Testing',
    description: 'Verify correct phase sequence in three-phase installations',
    duration: '5-10 mins',
    difficulty: 'Intermediate',
    purpose: 'To ensure correct phase sequence for three-phase motors and equipment',
    testLimits: [
      { parameter: 'Phase sequence', limit: 'L1, L2, L3 (clockwise)', unit: '-' },
      { parameter: 'Phase rotation', limit: 'Correct for equipment', unit: '-' },
    ],
    commonIssues: [
      'Incorrect phase sequence causing motor reverse rotation',
      'Phase transposition errors',
      'Installation wiring errors',
    ],
    regulationClause: 'BS 7671:2018+A3:2024 Regulation 612.12',
    steps: [
      {
        id: 'when-why',
        title: 'When and Why Phase Sequence Matters',
        instruction:
          'Phase sequence testing is required on all three-phase installations. The test verifies that L1, L2, and L3 arrive in the correct rotational order. Incorrect phase sequence causes three-phase motors to run backwards, which can be dangerous or damaging depending on the application.',
        expectedResult:
          'Understanding of when phase sequence testing is required and why it is critical for motor-driven equipment.',
        tips: [
          'Phase sequence is especially critical for lifts, pumps, compressors, and conveyor systems',
          'Single-phase circuits are not affected — this test is only for three-phase supplies',
        ],
        equipment: ['Phase sequence indicator'],
        apprenticeTip:
          'Wrong phase sequence = motor runs backwards. A pump running backwards sucks instead of pushes. A conveyor sends products the wrong way. A lift running backwards could be catastrophic. This simple test prevents all of that.',
      },
      {
        id: 'connect-indicator',
        title: 'Connect Phase Sequence Indicator',
        instruction:
          'Connect the phase sequence indicator to L1, L2, and L3 terminals at the distribution board or point of supply. Follow the colour coding: L1 (brown) to L1 terminal, L2 (black) to L2 terminal, L3 (grey) to L3 terminal. This is a live test.',
        expectedResult:
          'Phase sequence indicator connected to all three phases with correct colour coding.',
        safetyWarning:
          'This is a live test — use appropriate PPE, insulated tools, and follow safe working procedures. Maintain adequate clearance from live parts.',
        tips: [
          'Use insulated crocodile clips for secure, hands-free connections',
          'Verify your indicator is in date for calibration',
        ],
        equipment: ['Phase sequence indicator', 'Test leads', 'PPE'],
      },
      {
        id: 'read-indicator',
        title: 'Read the Indicator',
        instruction:
          'Observe the phase sequence indicator display or rotating disc. Clockwise rotation (or the correct LED sequence) indicates the phases are in the correct L1-L2-L3 order. Anti-clockwise indicates reversed sequence.',
        expectedResult:
          'Indicator shows clockwise rotation confirming correct L1-L2-L3 phase sequence.',
        tips: [
          'If anti-clockwise, swapping any two phases will correct the sequence',
          'On LED-type indicators, the direction is shown by a sequence of illuminated LEDs',
        ],
        equipment: ['Phase sequence indicator'],
        troubleshooting: [
          'Anti-clockwise rotation — correct at the supply point by swapping any two phases (isolate first)',
          'No rotation or intermittent display — lost phase, blown fuse on one phase, or loose connection',
          'Indicator works at DB but motor runs wrong way — phase transposition between DB and motor, check wiring',
        ],
      },
      {
        id: 'verify-at-load',
        title: 'Verify at the Load',
        instruction:
          'After confirming correct sequence at the supply, verify the motor or three-phase equipment rotates in the correct direction. Check for rotation arrows on pump casings, feel airflow direction on fans, or observe conveyor belt direction. For VFDs (variable frequency drives), the drive may correct sequence internally — check the drive parameters.',
        expectedResult:
          'Motor or equipment confirmed rotating in the correct direction for its application.',
        tips: [
          'Most pumps have a rotation arrow cast into the casing',
          'Never test a lift by running it — verify sequence electrically and check with the lift engineer',
        ],
        equipment: ['Phase sequence indicator', 'Visual observation'],
        realWorldExample:
          'Check the rotation arrow on the pump casing. Feel the airflow on a fan. Never test a lift by running it — always verify electrically first and coordinate with the lift engineer. VFDs (variable frequency drives) may correct the sequence internally, so check the drive display/parameters.',
      },
      {
        id: 'record-results',
        title: 'Record Results',
        instruction:
          'Document the phase sequence test result on the electrical installation certificate. Note whether the sequence was correct or if corrections were made. Update the circuit chart with phase identification colours.',
        expectedResult:
          'Phase sequence documented on certificate. Circuit chart updated with correct phase identification.',
        tips: [
          'If phases were swapped to correct the sequence, record what was changed and where',
          'Ensure all phase identification labels match the actual conductor colours',
        ],
        equipment: ['Test certificate', 'Pen', 'Phase identification labels'],
      },
    ],
  },

  // ─── Test 9: Functional Testing ───
  {
    id: 'functional-testing',
    title: 'Functional Testing',
    description: 'Test the correct operation of all electrical equipment and safety systems',
    duration: '20-30 mins',
    difficulty: 'Intermediate',
    purpose: 'To verify that all electrical equipment and safety systems operate correctly',
    testLimits: [
      { parameter: 'Switch operation', limit: 'Correct function', unit: '-' },
      { parameter: 'Emergency lighting', limit: '3 hour duration', unit: 'hours' },
      { parameter: 'Fire alarm', limit: 'Correct operation', unit: '-' },
    ],
    commonIssues: [
      'Switches not controlling correct circuits',
      'Emergency lighting insufficient duration',
      'Fire alarm system faults',
    ],
    regulationClause: 'BS 7671:2018+A3:2024 Regulation 612.13',
    steps: [
      {
        id: 'prepare-checklist',
        title: 'Prepare Functional Test Checklist',
        instruction:
          'Before starting, compile a checklist of every item that needs functional testing: all light switches (including two-way and intermediate), dimmer switches, socket outlets, cooker switches, immersion heater switches, fan isolators, outside lights, PIR sensors, timers, and any other switching or control devices.',
        expectedResult:
          'Complete checklist of all items requiring functional testing. Systematic plan for working through each room.',
        tips: [
          'Work room by room to ensure nothing is missed',
          'On a large commercial fit-out, functional testing can take several hours — plan accordingly',
        ],
        equipment: ['Checklist', 'Pen', 'Plug-in lamp for socket testing'],
        apprenticeTip:
          'Dead and live tests proved the installation is safe — functional testing proves it actually works. This is where you catch wiring errors that instruments cannot find, like a switch controlling the wrong light or a socket with no power despite correct polarity.',
        realWorldExample:
          'A commercial fit-out with 200 luminaires, 80 sockets, emergency lighting, and fire alarms can take half a day of functional testing alone. A proper checklist is essential — you cannot keep it all in your head.',
      },
      {
        id: 'test-switches',
        title: 'Test All Switching and Control Devices',
        instruction:
          'Operate every switch and verify it controls the correct load. Test two-way switching from both positions. Test dimmer switches through their full range. Test PIR sensors for detection range, sensitivity, and timer duration. Test timer switches for correct programming.',
        expectedResult:
          'All switches control their intended loads. Two-way and intermediate switching works from all positions. Dimmers, PIRs, and timers function correctly.',
        tips: [
          'Two-way switching: test from both switch positions — a common wiring error is a stapper wire to the wrong terminal',
          'PIR sensors: walk across the detection zone and verify the light activates and times out correctly',
        ],
        equipment: ['Visual observation', 'Test lamp'],
        troubleshooting: [
          'Two-way switch only works from one position — stapper wires connected to wrong terminals, swap COM and L2',
          'PIR not detecting movement — check sensitivity dial, timer setting, and whether the lens is obstructed or painted over',
          'Dimmer buzzes or flickers — incompatible with LED lamps, check minimum load requirements',
        ],
      },
      {
        id: 'test-sockets',
        title: 'Test Socket Outlets',
        instruction:
          'Test every socket outlet for power delivery using a plug-in lamp or similar load. Check double sockets on both sides. Test USB sockets for charging output. Verify switched sockets operate correctly.',
        expectedResult:
          'All socket outlets deliver power. Both sides of double sockets work. USB outputs function. Switches operate correctly.',
        tips: [
          'Use a plug-in lamp rather than just a socket tester — a lamp confirms power delivery under load',
          'Check USB sockets specifically — they have a separate internal power supply that can fail independently',
        ],
        equipment: ['Plug-in lamp', 'USB device for testing'],
        realWorldExample:
          'A plug-in socket tester cannot confirm a socket delivers power under load — it only checks voltage is present. A simple plug-in lamp is better because it actually draws current. Also test USB sockets separately — the USB module is a separate component that can fail even when the mains socket works fine.',
      },
      {
        id: 'emergency-lighting',
        title: 'Emergency Lighting Test',
        instruction:
          'Test emergency lighting by simulating mains failure (switch off the relevant circuit or use the test key). Verify all emergency luminaires illuminate within 5 seconds of mains failure. Note: the full 3-hour duration test is scheduled separately (annually) — this is a functional verification only.',
        expectedResult:
          'All emergency luminaires illuminate within 5 seconds of mains failure. Adequate illumination of escape routes. Charge indicators show healthy batteries.',
        tips: [
          "Check the green 'healthy' LED on each emergency luminaire before and after test",
          'The full 3-hour duration test is a separate annual requirement — do not attempt during initial verification',
        ],
        equipment: ['Emergency lighting test key', 'Stopwatch'],
        regulationReference: 'BS 5266-1:2016',
      },
      {
        id: 'fire-alarm',
        title: 'Fire Alarm System Test',
        instruction:
          'Test the fire alarm system by activating a manual call point. Verify the control panel shows the correct zone, all sounders operate, and any auxiliary functions (door holders, fan shutdowns) activate. Test at least one detector of each type.',
        expectedResult:
          'Fire alarm activates correctly from manual call point. Control panel shows correct zone. All sounders audible. Auxiliary functions operate.',
        tips: [
          'Call the monitoring company BEFORE testing to put the system on test — a false alarm callout costs hundreds of pounds',
          'Use an approved detector tester (aerosol for smoke, heat source for heat) — never use real smoke',
        ],
        equipment: ['Call point key', 'Smoke detector tester', 'Heat source'],
        regulationReference: 'BS 5839-1:2025',
        apprenticeTip:
          'If the fire alarm is monitored (connected to an alarm receiving centre), call them BEFORE you test. A false alarm callout from the fire brigade can cost the building owner hundreds of pounds. The phone number is usually on a label on the fire alarm panel.',
      },
      {
        id: 'record-all',
        title: 'Record All Results',
        instruction:
          'Document all functional test results on the test certificate. Note any items that require attention, any items that could not be tested (and why), and confirm that all systems are left in their normal operating condition.',
        expectedResult:
          'All functional test results documented. Any faults noted. All systems returned to normal operation.',
        tips: [
          'Functional testing catches errors that instruments cannot — like a switch controlling the wrong light or a socket that has power but no earth',
          'Ensure the fire alarm is taken off test with the monitoring company when you are finished',
        ],
        equipment: ['Test certificate', 'Pen'],
        apprenticeTip:
          'Functional testing catches the mistakes that instruments simply cannot detect — a switch wired to the wrong light, a PIR pointing the wrong way, an emergency light that does not actually illuminate the escape route. It is the final check that everything works as intended.',
      },
    ],
  },
];

export const getTestById = (id: string): BS7671Test | undefined => {
  return allBS7671Tests.find((test) => test.id === id);
};

export const getTestsByDifficulty = (
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
): BS7671Test[] => {
  return allBS7671Tests.filter((test) => test.difficulty === difficulty);
};
