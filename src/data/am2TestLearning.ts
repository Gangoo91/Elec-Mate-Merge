/**
 * AM2 Test Learning Content
 *
 * Educational content for each test type shown during the guided
 * testing simulator. Covers what the test measures, why it matters,
 * which EIC schedule column it populates, and a practical tip.
 *
 * All content aligned with BS 7671:2018+A3:2024, GN3, and NET
 * approved apprentice learning outcomes.
 */

export interface TestLearningEntry {
  /** Short explanation of what this test measures */
  whatItIs: string;
  /** Why this test matters for safety / compliance */
  whyItMatters: string;
  /** Which EIC Schedule of Test Results column(s) this populates */
  eicInfo: string;
  /** Practical tip for carrying out this test on site */
  practicalTip: string;
  /** BS 7671 regulation reference */
  regulation: string;
  /** Common mistakes / fail points apprentices encounter */
  failPoints?: string[];
}

/**
 * Lookup key format: `${dialPosition}:${subTest}` or just `${dialPosition}` if no subTest.
 */
export const TEST_LEARNING: Record<string, TestLearningEntry> = {
  // ── Ring Final Continuity ──────────────────────────────────
  'CONTINUITY:r1': {
    whatItIs:
      'Measures the end-to-end resistance of the line conductor (r₁) around the ring. Both ends of the line conductor are disconnected at the DB and tested between them.',
    whyItMatters:
      'Confirms the ring is continuous with no breaks. If the ring is broken, part of the circuit carries all the load — risking overheating and fire.',
    eicInfo: 'Column 18 — Ring r₁ (Ω)',
    practicalTip:
      'Disconnect both ends of the line conductor from the MCB and neutral bar. Zero your leads first, then connect one lead to each end. The reading should be a low resistance — typically under 1Ω for domestic runs.',
    regulation: 'BS 7671:2018+A3:2024 Reg. 612.2 / GN3 Section 10',
    failPoints: [
      'Forgetting to zero test leads before measuring — adds lead resistance to your reading',
      'Only disconnecting one end of the ring — you will measure the parallel path, not the true r₁',
      'Leaving spurs connected — they can mask a break in the ring by providing an alternative path',
      'Not recording r₁ before moving on — you need it to compare with rₙ and calculate R₁+R₂',
    ],
  },

  'CONTINUITY:rn': {
    whatItIs:
      'Measures the end-to-end resistance of the neutral conductor (rₙ) around the ring. Both ends of the neutral are disconnected and tested between them.',
    whyItMatters:
      'The rₙ value should be very close to r₁ (within 0.05Ω typically). A large difference suggests a routing error or cross-connection in the ring.',
    eicInfo: 'Column 19 — Ring rₙ (Ω)',
    practicalTip:
      'Disconnect both neutral ends from the neutral bar. Test between them the same way as r₁. Compare your rₙ reading to r₁ — they should be within 5% of each other.',
    regulation: 'BS 7671:2018+A3:2024 Reg. 612.2 / GN3 Section 10',
    failPoints: [
      'Not comparing rₙ to r₁ — if the difference is more than 0.05Ω, there is likely a cross-connection or routing error',
      'Testing with neutrals still connected to the bar — this shorts out the ring and gives a false low reading',
      'Mixing up which conductors are neutral vs line in T&E — colour code: blue is neutral',
    ],
  },

  'CONTINUITY:r2': {
    whatItIs:
      'Measures the end-to-end resistance of the circuit protective conductor (r₂ / CPC) around the ring. Both CPC ends are disconnected and tested.',
    whyItMatters:
      'Confirms the earth path is continuous around the entire ring. A break in the CPC means some sockets have no earth protection — extremely dangerous.',
    eicInfo: 'Column 20 — Ring r₂ (Ω)',
    practicalTip:
      'The r₂ value will be higher than r₁ or rₙ because the CPC is a smaller cross-section (e.g. 1.5mm² vs 2.5mm²). Expect roughly 1.67× the r₁ value for standard T&E.',
    regulation: 'BS 7671:2018+A3:2024 Reg. 612.2 / GN3 Section 10',
    failPoints: [
      'Expecting r₂ to equal r₁ — the CPC is a smaller CSA (1.5mm² in 2.5/1.5 T&E) so r₂ is always higher',
      'Not identifying which conductor is the CPC at the DB — in twin & earth it is the bare/sleeved conductor',
      'Forgetting to disconnect both CPC ends — one end still connected gives a parallel path reading',
    ],
  },

  'CONTINUITY:r1r2': {
    whatItIs:
      'Measures the combined resistance of the line conductor and CPC (R₁+R₂). For ring finals, this is done after cross-connecting L to CPC at the DB and testing at the mid-point. For radials, test between line and CPC at the furthest point.',
    whyItMatters:
      'This value is used to verify that Zs (earth fault loop impedance) will be within limits. It also confirms correct polarity and CPC continuity to every point.',
    eicInfo: 'Column 21 — R₁+R₂ (Ω)',
    practicalTip:
      'For ring finals: after the 3 end-to-end tests, cross-connect L1 to CPC and N to N at the DB, then test at each socket — the mid-point gives the highest R₁+R₂. For radials: simply test between L and CPC at the furthest point from the DB.',
    regulation: 'BS 7671:2018+A3:2024 Reg. 612.2 / GN3 Section 10',
    failPoints: [
      'Cross-connecting incorrectly — L must go to CPC and CPC to L at the DB. Getting this wrong gives meaningless readings',
      'Not testing at every socket — you must find the mid-point (highest R₁+R₂) to record the worst-case value',
      'Forgetting to reconnect conductors properly after the cross-connection test',
      'Recording the lowest R₁+R₂ instead of the highest — the schedule needs the worst-case value',
    ],
  },

  'CONTINUITY:polarity': {
    whatItIs:
      'Confirms that line, neutral, and earth conductors are connected to the correct terminals throughout the circuit. A low-resistance reading between the expected conductors confirms correct polarity.',
    whyItMatters:
      'Reversed polarity means switches could break the neutral instead of the line — leaving live parts accessible even when switched off. This is a major shock risk.',
    eicInfo: 'Column 26 — Polarity',
    practicalTip:
      'With the supply isolated, use your continuity tester between the incoming line terminal at the DB and the line terminal at the light fitting or switch. A low reading (close to R₁+R₂) confirms correct polarity.',
    regulation: 'BS 7671:2018+A3:2024 Reg. 612.6 / GN3 Section 13',
    failPoints: [
      'Not checking two-way switching circuits in both switch positions — polarity can appear correct in one position but be reversed in the other',
      'Assuming polarity is correct because R₁+R₂ passed — R₁+R₂ confirms continuity, not correct terminal connections',
      'Forgetting to check polarity at light fittings — line must switch, not neutral',
    ],
  },

  // ── Insulation Resistance ──────────────────────────────────
  'IR_500V:L-E': {
    whatItIs:
      'Applies 500V DC between the live conductors (L+N connected together) and earth to measure the insulation resistance. Checks that the cable insulation is not breaking down.',
    whyItMatters:
      'Poor insulation between live parts and earth causes leakage currents, nuisance RCD tripping, and risk of electric shock. The minimum acceptable value is 1.0MΩ.',
    eicInfo: 'Columns 23 & 25 — IR test voltage (V) & IR L–E (MΩ)',
    practicalTip:
      'Disconnect sensitive electronic equipment first. Link line and neutral together at the DB, then test between them and the main earth terminal. On a new installation you should see >200MΩ. If you get a low reading, disconnect circuits one by one to find the fault.',
    regulation: 'BS 7671:2018+A3:2024 Reg. 612.3 / Table 61 / GN3 Section 11',
    failPoints: [
      'Leaving electronic equipment connected (LED drivers, smart switches, dimmers) — they cause false low readings',
      'Not linking L and N together before testing to earth — you must test all live conductors as a group against E',
      'Forgetting to turn all switches ON and remove lamps — switches in the OFF position leave sections untested',
      'Accepting 1MΩ on a new installation — minimum is 1MΩ but a healthy new circuit should read >200MΩ',
    ],
  },

  'IR_500V:L-L': {
    whatItIs:
      'Applies 500V DC between line and neutral conductors to measure the insulation resistance between them. Checks for breakdown between live conductors.',
    whyItMatters:
      'A low reading between L and N indicates damaged insulation that could cause a short circuit fault, tripping the protective device or starting a fire.',
    eicInfo: 'Columns 23 & 24 — IR test voltage (V) & IR L–L (MΩ)',
    practicalTip:
      'Ensure all loads are disconnected (lamps removed, appliances unplugged). Test between line and neutral at the DB. On a healthy circuit expect >200MΩ. Two-way switching circuits may need switches in specific positions.',
    regulation: 'BS 7671:2018+A3:2024 Reg. 612.3 / Table 61 / GN3 Section 11',
    failPoints: [
      'Leaving lamps in their holders — filament lamps short L to N and give a near-zero reading',
      'Not checking two-way lighting circuits in both switch positions — one position may bypass a section',
      'Testing with the MCB on — the supply must be fully isolated before applying 500V DC',
    ],
  },

  'IR_250V:L-E': {
    whatItIs:
      'Applies 250V DC between live conductors and earth. Used for SELV and PELV circuits or where 500V test voltage could damage components.',
    whyItMatters:
      'Same purpose as the 500V test but at a lower voltage suitable for ELV circuits. Minimum acceptable is 0.5MΩ for SELV/PELV.',
    eicInfo: 'Columns 23 & 25 — IR test voltage (V) & IR L–E (MΩ)',
    practicalTip:
      'Select the 250V range on your MFT. This is typically used for SELV/PELV circuits only — most standard circuits use the 500V range.',
    regulation: 'BS 7671:2018+A3:2024 Reg. 612.3 / Table 61',
    failPoints: [
      'Using 500V on a SELV/PELV circuit — the higher test voltage can damage sensitive components',
      'Applying 250V to a standard 230V circuit — Table 61 requires 500V for circuits above 50V',
      'Not recording the correct test voltage on the EIC schedule — the assessor checks this matches Table 61',
    ],
  },

  'IR_250V:L-L': {
    whatItIs:
      'Applies 250V DC between live conductors at the reduced test voltage. Used for ELV circuits where 500V could cause damage.',
    whyItMatters:
      'Ensures insulation integrity between conductors on lower-voltage circuits without risking damage to sensitive components.',
    eicInfo: 'Columns 23 & 24 — IR test voltage (V) & IR L–L (MΩ)',
    practicalTip:
      'Only use 250V for SELV/PELV circuits. For standard 230V circuits always use 500V as per Table 61.',
    regulation: 'BS 7671:2018+A3:2024 Reg. 612.3 / Table 61',
    failPoints: [
      'Using the wrong test voltage — always check Table 61 to confirm 250V is correct for the circuit type',
      'Confusing SELV with PELV — SELV has no earth reference, PELV is earthed; both use 250V test voltage',
    ],
  },

  // ── Earth Fault Loop Impedance ─────────────────────────────
  LOOP_ZS: {
    whatItIs:
      'Measures the total earth fault loop impedance (Zs) at the furthest point of the circuit. Zs = Ze + (R₁+R₂), confirming the earth path will allow enough fault current to trip the protective device quickly.',
    whyItMatters:
      "If Zs is too high, the fault current won't be large enough to trip the MCB within the required disconnection time (0.4s for socket circuits, 5s for fixed equipment). This leaves a dangerous fault condition.",
    eicInfo: 'Column 27 — Max measured Zs (Ω)',
    practicalTip:
      'This is a LIVE test — the circuit must be energised. Connect your Zs leads to L, N, and E at the furthest point (e.g. last socket). Compare your reading to the maximum Zs from Tables 41.2–41.4 for the MCB type and rating. Always allow for a temperature correction factor of 0.8.',
    regulation: 'BS 7671:2018+A3:2024 Reg. 612.9 / Table 41.2–41.4 / GN3 Section 14',
    failPoints: [
      'Performing Zs on a dead circuit — this is a LIVE test; the circuit must be energised',
      'Comparing your reading to the table value without applying the 0.8 correction factor — multiply the table max by 0.8 to get your measured limit',
      'Testing at the DB instead of the furthest point — you need the worst-case Zs at the end of the circuit',
      'Using the wrong MCB type column in Tables 41.2–41.4 — Type B, C, and D have different maximum Zs values',
      'Not checking the circuit is safe before energising — complete all dead tests first',
    ],
  },

  // ── RCD Tests ──────────────────────────────────────────────
  RCD_30: {
    whatItIs:
      'Tests the RCD at 1× its rated residual operating current (IΔn). For a 30mA RCD, a 30mA test current is applied and the disconnection time is measured. It must trip within 300ms.',
    whyItMatters:
      "RCDs provide additional protection against electric shock. If the RCD doesn't trip fast enough at its rated current, it may not protect a person in a fault condition.",
    eicInfo: 'Column 28 — RCD disconnection time (ms)',
    practicalTip:
      'This is a LIVE test. Connect your RCD test leads to L and E downstream of the RCD. Press TEST for a 1× IΔn test. The reading should be well under 300ms — typically 15–30ms for a modern RCD. Also test at 5× IΔn (must trip within 40ms).',
    regulation: 'BS 7671:2018+A3:2024 Reg. 612.13 / GN3 Section 15',
    failPoints: [
      'Connecting test leads upstream of the RCD — the test current must flow through the RCD to trigger it',
      'Forgetting the 5× IΔn test — you must also test at 150mA (5×30mA) and it must trip within 40ms',
      'Not testing on both half-cycles (0° and 180°) — your MFT should offer both; test on the worst case',
      'Recording trip time without checking the 300ms / 40ms limits — an RCD tripping at 350ms is a FAIL',
    ],
  },

  'RCD_30:test_button': {
    whatItIs:
      "Verifies the RCD's integral test button operates correctly. Pressing the test button on the RCD itself should cause it to trip, confirming the mechanical trip mechanism works.",
    whyItMatters:
      "The test button confirms the mechanical trip mechanism is functional. Users are advised to test quarterly — if the button doesn't trip the RCD, it must be replaced.",
    eicInfo: 'Column 29 — RCD test button operation',
    practicalTip:
      'Simply press the TEST button on the front of the RCD. It should trip immediately. Reset it afterwards. Record as PASS or FAIL on the schedule.',
    regulation: 'BS 7671:2018+A3:2024 Reg. 514.12.2 / GN3 Section 15',
    failPoints: [
      'Forgetting to do this test — it is a separate requirement from the instrument RCD test',
      'Not resetting the RCD after the test button trips it — leave it in the ON position for subsequent tests',
      'Recording the instrument trip time here — the test button is simply PASS or FAIL, no timing needed',
    ],
  },

  RCD_100: {
    whatItIs:
      'Tests a 100mA RCD at 1× its rated residual operating current. The instrument injects 100mA and measures how quickly the device disconnects.',
    whyItMatters:
      'A 100mA RCD provides fire protection rather than personal shock protection. It must still disconnect within the required time to prevent sustained earth fault currents.',
    eicInfo: 'Column 28 — RCD disconnection time (ms)',
    practicalTip:
      'Same procedure as 30mA testing but with the MFT set to the 100mA range. 100mA RCDs are typically used for fire protection on circuits without 30mA coverage.',
    regulation: 'BS 7671:2018+A3:2024 Reg. 612.13 / GN3 Section 15',
    failPoints: [
      'Setting the MFT to 30mA when the RCD is rated at 100mA — always match the test current to the device rating',
      'Confusing fire protection (100mA) with additional protection (30mA) — they serve different purposes',
    ],
  },

  RCD_300: {
    whatItIs:
      'Tests a 300mA RCD at 1× its rated residual operating current. The instrument applies 300mA and measures disconnection time.',
    whyItMatters:
      'A 300mA RCD provides fire protection on distribution circuits. It must trip within 300ms at 1× IΔn.',
    eicInfo: 'Column 28 — RCD disconnection time (ms)',
    practicalTip:
      'Set your MFT to 300mA range. These are typically found on distribution boards protecting groups of circuits. Test at the furthest point downstream.',
    regulation: 'BS 7671:2018+A3:2024 Reg. 612.13 / GN3 Section 15',
    failPoints: [
      'Testing at the distribution board instead of downstream — test at the furthest point for worst-case results',
      'Not checking selectivity with downstream 30mA RCDs — only the intended RCD should trip',
    ],
  },

  // ── Prospective Fault Current ──────────────────────────────
  PFC: {
    whatItIs:
      'Measures the prospective fault current (Ipf) at the distribution board — the maximum current that would flow during a short circuit or earth fault. This confirms the protective devices can safely interrupt the fault.',
    whyItMatters:
      'If the prospective fault current exceeds the breaking capacity (kA rating) of the MCB or fuse, the device could fail to interrupt the fault — causing an arc flash, fire, or explosion.',
    eicInfo: 'EIC header — Ipf at origin (kA). Also recorded per DB.',
    practicalTip:
      'This is a LIVE test at the distribution board. Connect your PFC leads to L, N, and E at the main switch or nearest point. The reading must not exceed the kA rating shown on each MCB. Record the highest of the two values (L-N and L-E).',
    regulation: 'BS 7671:2018+A3:2024 Reg. 612.11 / GN3 Section 16',
    failPoints: [
      'Only recording the L-N value — you must test both L-N and L-E and record the HIGHER of the two',
      'Not checking the kA rating on every MCB — if Ipf exceeds any device rating, that device must be upgraded',
      'Performing PFC before completing dead tests — all dead tests must pass before energising',
      'Confusing PFC (kA) with Zs (Ω) — they are different measurements taken at different points',
    ],
  },
};

/**
 * Look up learning content for a given test.
 * Key format: `${dialPosition}:${subTest}` or just `${dialPosition}`.
 */
export function getTestLearning(dialPosition: string, subTest?: string): TestLearningEntry | null {
  // Try specific key first
  if (subTest) {
    const specific = TEST_LEARNING[`${dialPosition}:${subTest}`];
    if (specific) return specific;
  }
  // Fall back to dial position only
  return TEST_LEARNING[dialPosition] || null;
}
