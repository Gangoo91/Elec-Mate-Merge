/**
 * Ported from the English course, combining:
 *   level3/module6/section4/Sub5.tsx
 *   level2/module4/section4/Sub1.tsx
 *
 * The Welsh Level 3 qualification covers this material, so the teaching is
 * carried into this course rather than sending a learner out to read it in
 * another one. The text is unchanged; only the page shell was removed.
 *
 * 🔴 Never describe this content as EAL-approved, EAL-mapped or endorsed.
 */

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';

const checks = [
  {
    id: 'adiabatic-basic',
    question:
      'A B32 RCBO clears in 0.1 s on a TN-C-S fault of 800 A. The CPC is 2.5 mm² copper, 70 °C thermoplastic insulation, k = 115. Does the CPC survive the fault?',
    options: [
      'No — minimum CSA needed is √(I²t)/k = √(800² × 0.1)/115 ≈ 2.20 mm², and 2.5 mm² is below that, so the CPC fails.',
      'No — the fault current of 800 A exceeds the cable rating, so the adiabatic equation does not apply and a larger CPC is always required.',
      'Yes — minimum CSA needed is √(I²t)/k = √(800² × 0.1)/115 = √64000/115 = 252.98/115 ≈ 2.20 mm². 2.5 mm² is above 2.20 — pass.',
      'Yes — but only because the 0.4 s maximum disconnection time, not the 0.1 s operating time, must be used in the equation.',
    ],
    correctIndex: 2,
    explanation:
      'Reg 543.1.3 gives S ≥ √(I²t)/k. Plug in: I = 800 A, t = 0.1 s, k = 115. I²t = 800 × 800 × 0.1 = 64 000 A²s. √64 000 = 252.98. Divide by 115 = 2.20 mm². The minimum CPC CSA is 2.20 mm²; the installed 2.5 mm² is above that. The CPC survives. Note that the t value is the device’s actual operating time at the fault current (read from Appendix 3 time/current curves in BS 7671 A4:2026, formerly Appendix 14), not the maximum permitted disconnection time.',
  },
  {
    id: 'k-value-pick',
    question:
      'You are sizing a separate copper CPC sleeved in green/yellow PVC, run loose alongside thermoplastic singles. Conductor temperature limit at the start of the fault is 70 °C, final temperature 160 °C. Which k value from Table 43.1 do you use?',
    options: [
      'k = 115 (copper CPC, 70 °C thermoplastic insulation in contact, 160 °C final).',
      'k = 143 (separate bare copper CPC not in contact with cable insulation, 200 °C final).',
      'k = 226 (copper line conductor at 70 °C with 90 °C thermosetting).',
      'k = 76 (steel CPC).',
    ],
    correctIndex: 0,
    explanation:
      'Table 43.1 splits k values by conductor material, by insulation type and by whether the conductor is bare or insulated. The "PVC sleeved CPC" case is treated as PVC-insulated (the sleeve is the relevant thermal barrier), so the 70 °C thermoplastic row gives k = 115. Bare copper not in contact with combustible material gets k = 143 (higher final temperature allowed). Picking the wrong k can change your minimum CSA by 25 percent.',
  },
  {
    id: 'time-from-curves',
    question:
      'You have a Zs at the end of a circuit of 0.85 Ω on a 230 V supply. The protective device is a Type B 32 A MCB. What If do you use, and roughly what t do you read off the time/current characteristic for the adiabatic check?',
    options: [
      'If = U0 / Zs = 230 / 0.85 = 271 A with no Cmin applied; t = the maximum permitted 0.4 s disconnection time for the adiabatic equation.',
      'If = U0 × Cmin × Zs = 230 × 0.95 × 0.85 = 186 A; t = 5 s because the circuit feeds fixed equipment.',
      'If = U0 × Cmin / Zs = 230 × 0.95 / 0.85 = 257 A; t = the actual operating time of the B32 at 257 A — comfortably in the magnetic region (Ia for B-curve = 5×In = 160 A), so t < 0.1 s.',
      'If = In × 5 = 160 A (the magnetic trip threshold) and t is fixed at 0.1 s for every B-curve device.',
    ],
    correctIndex: 2,
    explanation:
      'For the adiabatic check you use the actual prospective fault current, applying Cmin (0.95 in BS 7671 A4:2026) to U0 to give the worst-case fault voltage. If = 230 × 0.95 / 0.85 = 257 A. For a B-curve MCB the magnetic instantaneous trip range is 3–5 × In. At In = 32 A that is 96–160 A. 257 A is well above the upper bound, so the device is in its magnetic region and operates in well under 0.1 s. Use the manufacturer-published time/current curve (or BS 7671 Appendix 3, formerly Appendix 14 pre-A4) for the actual time, not the worst-case 0.4 s ceiling.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What is the BS 7671 Reg 543.1.3 adiabatic equation, and what does each variable mean?',
    options: [
      'S = I²t × k, where S is the CPC CSA, I is the design current, t is the disconnection time and k is the cable length factor.',
      'S = √(I²t) / k, where S is the minimum CPC CSA in mm², I is the prospective fault current in amps, t is the device operating time in seconds at that current, and k is the material/insulation constant from Table 43.1.',
      'S = k × √(t) / I, where S is the CPC CSA, k is the supply voltage factor, t is the operating time and I is the load current.',
      'S = (I × t) / k², where S is the CPC CSA, I is the fault current, t is the disconnection time and k is the conductor resistance.',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 543.1.3 gives the adiabatic minimum CPC CSA: S = √(I²t)/k. The equation is "adiabatic" because it assumes no heat escapes the conductor during the fault — all the fault energy I²t goes into raising the conductor temperature. k bundles the conductor’s heat capacity, the starting temperature and the maximum allowable final temperature into a single material constant. The check is independent of, and additional to, the line-conductor CCC and Vd checks.',
  },
  {
    id: 2,
    question:
      'Why is the line-conductor CCC calculation not enough — why do we need a separate CPC adiabatic check?',
    options: [
      'Because the line conductor and the CPC are always different sizes, so each needs its own current-carrying-capacity look-up from a different table.',
      'Because the CPC carries the design current Ib continuously while the line conductor only carries it intermittently, so the CPC runs hotter.',
      'Because the line conductor only ever carries the design current Ib for hours on end (steady state), but the CPC briefly carries a fault current that can be many tens of times Ib for a fraction of a second. The two thermal regimes are completely different.',
      'Because the CCC check covers normal operation but the adiabatic check is simply a repeat of the same calculation using a 1.45 safety factor.',
    ],
    correctAnswer: 2,
    explanation:
      'The line conductor’s CCC (steady state) is a "how long does it take to cook at Ib" question. The CPC’s adiabatic check is a "can it survive a brief fault at If for t seconds without melting the insulation or destroying its thermal stability" question. Different physics, different equation. A 1.5 mm² CPC routinely passes CCC for a 16 A circuit but can fail adiabatic if the device is slow to clear or the fault current is high.',
  },
  {
    id: 3,
    question: 'In the equation S = √(I²t)/k, where does the "t" value come from?',
    options: [
      'The maximum permitted disconnection time from Table 41.1 — always 0.4 s for a socket-outlet circuit regardless of the fault current.',
      'A fixed value of 5 seconds, the longest disconnection time BS 7671 permits for any circuit.',
      'The time taken for the cable to reach its operating temperature under the full design current Ib.',
      'The actual operating time of the protective device at the actual prospective fault current, read from the manufacturer’s time/current curve or from BS 7671 Appendix 3 (formerly Appendix 14).',
    ],
    correctAnswer: 3,
    explanation:
      'The Reg 543.1.3 t is the actual operating time, not the maximum permitted disconnection time. For a B32 MCB on a fault current well into the magnetic region, the actual t is typically under 10 ms; using the 0.4 s ceiling would massively oversize the CPC. The maximum permitted disconnection time from Table 41.1 is the ADS gate (covered in the lesson on maximum disconnection times); the adiabatic check uses the real t at the real If.',
  },
  {
    id: 4,
    question:
      'What value of k applies to a copper CPC inside a thermoplastic (PVC) insulated cable at the start temperature of 70 °C?',
    options: ['k = 115', 'k = 76', 'k = 143', 'k = 226'],
    correctAnswer: 0,
    explanation:
      'Table 43.1 in BS 7671 gives k = 115 for a copper conductor with 70 °C thermoplastic (PVC) insulation (initial temperature 70 °C, final temperature 160 °C). For 90 °C thermosetting (XLPE) the k rises to 143. For bare copper not in contact with combustible materials it is 143 (final 200 °C). For aluminium the values are roughly two-thirds of the copper figures.',
  },
  {
    id: 5,
    question:
      'You compute the minimum CPC at S = 1.32 mm². The actual installed CPC is 1.5 mm². What is the right call?',
    options: [
      'Reject — round the calculated 1.32 mm² up to the next standard size of 2.5 mm² before comparing with the installed CPC.',
      'Accept — 1.5 mm² ≥ 1.32 mm² so the adiabatic equation passes. Document the calc on the design sheet.',
      'Reject — the installed CPC must be at least twice the calculated minimum to allow for future fault growth.',
      'Accept only if a 30 mA RCD is also fitted, because the adiabatic check alone is not sufficient below 2.5 mm².',
    ],
    correctAnswer: 1,
    explanation:
      'The adiabatic check is a "≥" comparison: the installed S must be at least the calculated minimum. 1.5 ≥ 1.32 — pass. Note that twin-and-earth domestic cable for many years used "reduced CPC" sizing — a 2.5 mm² T&E has a 1.5 mm² CPC, a 6 mm² T&E has a 2.5 mm² CPC. These reductions only work where the adiabatic check passes for the chosen device and Zs.',
  },
  {
    id: 6,
    question:
      'What is the relationship between the adiabatic check and the ADS disconnection time check?',
    options: [
      'The adiabatic check is a more demanding version of the ADS check, so passing the adiabatic automatically satisfies ADS.',
      'They are the same check expressed in different units — ADS uses time and the adiabatic uses CSA, but both give the identical pass or fail result.',
      'They are independent. ADS asks "does the device clear in time to limit shock voltage?" The adiabatic asks "given the device’s actual clearing time at the actual fault current, will the CPC survive the energy let-through?" Both must pass.',
      'ADS only applies to TN systems and the adiabatic only applies to TT systems, so a given circuit needs only one of the two.',
    ],
    correctAnswer: 2,
    explanation:
      'ADS (Reg 411.3.2) is about persons — clear the fault before the touch voltage causes harm. Adiabatic (Reg 543.1.3) is about the protective conductor surviving so it remains a protective conductor for the next fault. A device can clear within the ADS time but the adiabatic still fail if the CPC is undersized — and vice versa for unusual cable choices. Run both gates independently.',
  },
  {
    id: 7,
    question:
      'For a 32 A radial socket circuit on TN-C-S with measured Zs = 1.20 Ω, supply at U0 = 230 V, B32 RCBO, what is the prospective fault current you use in the adiabatic check, and where do you read the operating time?',
    options: [
      'I = In = 32 A (the device rating), and t = 0.4 s (the maximum disconnection time). Calculate S = √(32² × 0.4) / 115 = √(410) / 115 = 20.2 / 115 = 0.18 mm². Any standard CPC passes.',
      'I = U0 / Zs = 230 / 1.20 = 192 A with no Cmin applied; t = 5 s for fixed equipment. Calculate S = √(192² × 5) / 115 = √(184320) / 115 = 429 / 115 = 3.73 mm², so a 4 mm² CPC is required.',
      'I = U0 × Cmin × Zs = 230 × 0.95 × 1.20 = 262 A; t = 0.1 s read at 262 A. Calculate S = √(262² × 0.1) / 115 = √(6864) / 115 = 82.8 / 115 = 0.72 mm².',
      'I = U0 × Cmin / Zs = 230 × 0.95 / 1.20 = 182 A; t read from the B-curve characteristic at 182 A — within the magnetic instantaneous range (Ia ≈ 160 A for B32), so t ≈ 0.04 s. Calculate S = √(182² × 0.04) / 115 = √(1325) / 115 = 36.4 / 115 = 0.32 mm².',
    ],
    correctAnswer: 3,
    explanation:
      'Apply Cmin = 0.95 to U0. I = 230 × 0.95 / 1.20 = 182 A. A B-curve magnetic trip range is 3–5 × In, so for B32 that is 96–160 A. 182 A is just above the upper bound — the device is in instantaneous mode, t ≈ 30–50 ms in practice. Plug into Reg 543.1.3: S = √(I²t)/k = √(182 × 182 × 0.04) / 115 = √1325 / 115 = 0.32 mm². Any reasonable CPC (1.0 mm² or above) passes this check by a comfortable margin.',
  },
  {
    id: 8,
    question:
      'A TT installation has a measured Zs of 200 Ω on a 230 V supply. The device is a 30 mA Type AC RCD with operating time of 0.04 s at 30 mA × 5 = 150 mA. The CPC is 1.5 mm² copper PVC, k = 115. Does the adiabatic check pass?',
    options: [
      'Yes — If = 230 × 0.95 / 200 = 1.09 A. S = √(1.09² × 0.04) / 115 = √(0.0475) / 115 = 0.218 / 115 = 0.0019 mm². The CPC needed is essentially zero; 1.5 mm² is hugely oversized for the adiabatic on a TT system. RCD operation, not CPC adiabatic, is the binding constraint on TT.',
      'No — the 200 Ω loop impedance gives a fault current too high for the 1.5 mm² CPC to survive, so a 4 mm² CPC is required.',
      'No — on a TT system the adiabatic equation cannot be used at all, so the CPC must be sized at 16 mm² to match the earthing conductor.',
      'Yes — but only because the RCD operating time of 0.04 s is below the 0.2 s limit for TT systems, not because of the CPC size.',
    ],
    correctAnswer: 0,
    explanation:
      'On a TT system the loop impedance is dominated by the soil resistance of the earth electrodes; the fault current is small (often a few amps) and an RCD is required to clear the fault, not an MCB. The adiabatic check on the CPC therefore typically passes by a huge margin. The binding constraint on TT is RCD operation within the disconnection time (Reg 411.5.3) plus RA × IΔn ≤ 50 V (Reg 411.5.3 acceptance test). Adiabatic almost never governs on TT.',
  },
];

const faqs = [
  {
    question: 'Why is the equation called "adiabatic"?',
    answer:
      'Adiabatic means "no heat exchange with the surroundings" in thermodynamic terms. The Reg 543.1.3 equation assumes that the fault is so brief (typically a few cycles to a few seconds) that no significant heat is conducted away from the protective conductor into the insulation, surrounding earth or air. All the I²t energy goes into raising the conductor’s temperature. This is a conservative assumption — the real conductor loses some heat — but it is mathematically tractable and gives a safe answer. For long-duration faults (above ~5 s) the assumption breaks down and BS 7454 non-adiabatic methods are used instead.',
  },
  {
    question: 'Where do the k values in Table 43.1 actually come from?',
    answer:
      'The k values are derived from the conductor’s specific heat capacity, density, resistivity and the temperature limits set by the surrounding insulation. The IEC committee that produces the source standard (IEC 60364-5-54) calculates k = √(Qc(B + 20)/ρ20 × ln((B + θf)/(B + θi))) where Qc is the volumetric heat capacity, ρ20 is the conductor resistivity at 20 °C, B is the reciprocal of the temperature coefficient of resistance, θi is the initial conductor temperature and θf is the final temperature. For copper at 70 °C initial and 160 °C final (PVC-insulated case) the formula gives k ≈ 115. You do not derive k yourself — read it off Table 43.1.',
  },
  {
    question:
      'Does the adiabatic check matter for ring final circuits where the CPC is "doubled up"?',
    answer:
      'It matters but is rarely binding. A ring final has two paths for fault current to return to source — clockwise and anticlockwise round the ring — so the fault current is shared and the adiabatic stress on each leg is roughly half what it would be on a radial. For a 32 A ring on 2.5 mm² T&E with 1.5 mm² CPC, the adiabatic on each CPC leg passes comfortably for a B32 RCBO on typical Zs values. But always run the calc — a damaged ring with one leg broken effectively becomes a radial, which is one of the reasons periodic continuity tests exist.',
  },
  {
    question: 'What happens if the adiabatic check fails — what do I size up?',
    answer:
      'Three options, in rough order of preference: (1) upsize the CPC alone, by switching to a cable with a larger CPC fraction (e.g. 6 mm²/2.5 mm² T&E instead of 6 mm²/1.5 mm² historic); (2) pick a faster-clearing device (a faster-tripping curve or a lower rated breaker), which reduces t and therefore the I²t energy; (3) accept that this circuit needs a thicker line and CPC together (e.g. step from 6 mm² to 10 mm²). On modern installs option (1) is the default — current T&E products have larger CPC fractions than the older "reduced CPC" range, so the adiabatic typically passes without intervention.',
  },
  {
    question: 'Does the adiabatic check apply to the line conductor too, or just the CPC?',
    answer:
      'Both. Reg 434.5.2 applies the same equation to the line conductor for the worst-case prospective fault current — short-circuit between line and neutral, or line-to-line on three-phase. In practice the device’s breaking capacity and thermal magnetic characteristics make the line-conductor adiabatic check redundant for most domestic and small commercial circuits — the device clears so fast that the adiabatic passes by a wide margin. On industrial work with high PSCC and slower devices (BS 88 fuses, slow-acting MCCBs) the line-conductor adiabatic check becomes meaningful and is part of the design.',
  },
  {
    question: 'How do BS 7671 A4:2026 changes affect the adiabatic check in 2026?',
    answer:
      'A4:2026 left Reg 543.1.3 substantively unchanged — the equation is the same. The biggest change is structural: the time/current characteristics for protective devices used to live in Appendix 14, but A4:2026 moved them into Appendix 3 (and Appendix 14 now covers prospective fault current determination instead). When you read t off a curve, you are now reading from Appendix 3, not Appendix 14. The k values in Table 43.1 are unchanged. The Cmin factor of 0.95 applied to U0 for fault calculations remains the same.',
  },
];

const checks2 = [
  {
    id: 'm4-s4-sub1-pme-25mm',
    question:
      'A single-phase domestic supply is TN-C-S (PME) with 25 mm² tails. What is the minimum cross-sectional area for the main protective bonding conductor to gas and water?',
    options: ['6 mm²', '25 mm²', '16 mm²', '10 mm²'],
    correctIndex: 3,
    explanation:
      'BS 7671 Table 54.8 — for a PEN conductor of 35 mm² or less (which 25 mm² Cu equivalent is), the minimum copper-equivalent main bonding is 10 mm². Reg 544.1.1 mandates the PME bonding sizing comes from the PEN (supplier neutral), not the line conductor.',
  },
  {
    id: 'm4-s4-sub1-tns-rule',
    question:
      'On a TN-S supply where PME conditions do NOT apply, how is the minimum main protective bonding conductor sized under Reg 544.1.1?',
    options: [
      'Equal to the full cross-sectional area of the earthing conductor of the installation, with a 10 mm² minimum (in copper).',
      'Not less than half the cross-sectional area required for the earthing conductor of the installation, with a 6 mm² minimum and 25 mm² maximum (in copper).',
      'Read directly from Table 54.8 against the supplier PEN conductor, exactly as for a PME supply.',
      'A flat 10 mm² in all cases, regardless of the earthing conductor size or the supply arrangement.',
    ],
    correctIndex: 1,
    explanation:
      'Reg 544.1.1 — "Except where PME conditions apply, a main protective bonding conductor shall have a cross-sectional area not less than half the cross-sectional area required for the earthing conductor of the installation." Minimum 6 mm² Cu, no need to exceed 25 mm² Cu equivalent.',
  },
  {
    id: 'm4-s4-sub1-supplementary-size',
    question:
      'In a bathroom, you are running supplementary bonding between two extraneous-conductive-parts (a copper hot pipe and a copper cold pipe) with mechanical protection in conduit. What is the minimum CSA?',
    options: ['1.0 mm²', '1.5 mm²', '2.5 mm²', '4 mm²'],
    correctIndex: 2,
    explanation:
      'Reg 544.2.3 — supplementary bonding between two extraneous-conductive-parts: 2.5 mm² minimum if mechanically protected (in conduit, sheath, etc.), or 4 mm² minimum if not mechanically protected. Different rule again for extraneous-to-exposed (Reg 544.2.2 — half the CPC of the exposed-conductive-part).',
  },
];

const quizQuestions2 = [
  {
    id: 1,
    question:
      'Which BS 7671 table sets the minimum main protective bonding conductor size for an installation supplied under PME conditions?',
    options: [
      'Table 54.1 — minimum size of a buried earthing conductor.',
      'Table 54.8 — main protective bonding conductor in relation to the PEN conductor of the supply.',
      'Table 54.7 — minimum size of a circuit protective conductor by adiabatic calculation.',
      'Table 41.3 — maximum earth fault loop impedance for protective devices.',
    ],
    correctAnswer: 1,
    explanation:
      'Table 54.8 is the PME bonding sizing table. PEN ≤ 35 mm² → 10 mm² Cu equivalent bonding; PEN over 35 to 50 mm² → 16 mm²; over 50 to 95 mm² → 25 mm²; over 95 to 150 mm² → 35 mm²; over 150 mm² → 50 mm². Reg 544.1.1 mandates its use whenever PME applies.',
  },
  {
    id: 2,
    question:
      'On a TN-C-S (PME) supply with a 70 mm² PEN, what is the minimum copper-equivalent CSA of the main protective bonding conductor to each extraneous-conductive-part?',
    options: ['35 mm²', '10 mm²', '25 mm²', '16 mm²'],
    correctAnswer: 2,
    explanation:
      'Table 54.8 — PEN over 50 mm² up to 95 mm² → 25 mm² Cu equivalent main bonding. A 70 mm² PEN typically appears on three-phase commercial supplies. The table assumes the worst-case PEN-broken scenario where the bonding may carry full neutral return current.',
  },
  {
    id: 3,
    question:
      'A small commercial unit has a TT supply with a 16 mm² Cu earthing conductor (corrosion-protected, mechanical protection). Reg 544.1.1 applies. What is the minimum main protective bonding conductor?',
    options: ['6 mm²', '4 mm²', '16 mm²', '10 mm²'],
    correctAnswer: 3,
    explanation:
      'Reg 544.1.1 — bonding "not less than half the cross-sectional area required for the earthing conductor". 16 ÷ 2 = 8 mm². Standard sizes are 6 / 10 / 16, so round up to the next standard size: 10 mm². Minimum allowed is 6 mm² but the half rule pushes it to 10. Maximum need not exceed 25 mm² Cu.',
  },
  {
    id: 4,
    question:
      'Why does BS 7671 size PME main bonding against the supplier neutral and not against the installation line conductor?',
    options: [
      'Because in a broken-PEN fault the bonding may carry the whole neutral return current to ground, so it must be sized to the PEN.',
      'Because the installation line conductor is always larger than the neutral, so sizing to it would waste copper.',
      'Because the supplier neutral is the only conductor the DNO will accept liability for sizing against.',
      'Because the installation line conductor size is not known until every final circuit has been designed.',
    ],
    correctAnswer: 0,
    explanation:
      'A broken PEN on PME is the design case. Without the supplier neutral, every amp of installation current looks for a path back to source. The local earthing and bonding conductors become that path. Table 54.8 sizes them to handle it. That is why a 10 mm² bond is considered the floor for PME, even though half the CPC math would sometimes give a smaller answer.',
  },
  {
    id: 5,
    question:
      'A protective conductor (CPC, earthing conductor or bonding conductor) up to and including 6 mm² requires what level of insulation cover under Reg 543.3.201?',
    options: [
      'No insulation at all — protective conductors up to 6 mm² may always be run as bare strap.',
      'Covering at least equivalent to the insulation of a single-core non-sheathed cable, voltage rating at least 450/750 V — except where it forms part of a multicore cable or is run inside a metal enclosure used as the protective conductor.',
      'A double-insulated sheath rated at 1000 V regardless of where the conductor is run.',
      'A coloured oversleeve only at the terminations, with the conductor left bare along its length.',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 543.3.201 — protective conductors up to 6 mm² must be covered by insulation equivalent to a 450/750 V single-core non-sheathed cable. The standard green/yellow single core sold for bonding meets this. Bare strap is allowed only inside metallic conduit/enclosure used as the protective conductor itself, or as part of a multicore.',
  },
  {
    id: 6,
    question:
      'You are sizing a main earthing conductor for a TT installation where the buried portion runs through soil, protected against corrosion by a copper sheath but NOT mechanically protected. What is the minimum CSA from BS 7671 Table 54.1?',
    options: ['10 mm² Cu', '25 mm² Cu', '16 mm² Cu', '50 mm² Cu'],
    correctAnswer: 2,
    explanation:
      'Table 54.1 — buried earthing conductor, protected against corrosion (copper sheath) but not against mechanical damage → 16 mm² copper minimum. If neither protected, 25 mm² Cu / 50 mm² steel. If mechanically protected and corrosion protected, 2.5 mm² Cu (rare in practice).',
  },
  {
    id: 7,
    question:
      'A first-year asks why every main bonding conductor he sees on PME jobs is 10 mm² regardless of building. What is the right answer?',
    options: [
      'Because BS 7671 sets a flat 10 mm² minimum for all main bonding regardless of supply type or PEN size.',
      'Because 10 mm² is the largest size that fits a standard BS 951 earth clamp, so it is fitted everywhere.',
      'Because the gas and water undertakings require exactly 10 mm² bonding on all of their services.',
      'Because most domestic PME supplies have a PEN of 35 mm² or less, which Table 54.8 maps to a 10 mm² minimum.',
    ],
    correctAnswer: 3,
    explanation:
      'Domestic 100 A single-phase PME supplies typically have 16 mm² or 25 mm² PEN (well under 35 mm²) → Table 54.8 minimum is 10 mm². So 10 mm² is the routine answer for domestic. Commercial supplies have larger PEN, larger bonding. The local DNO can require larger still — Table 54.8 says "Local distributor’s network conditions may require a larger conductor."',
  },
  {
    id: 8,
    question:
      'Identify the standard cable colour code for a main protective bonding conductor under BS 7671 Reg 514.4.2.',
    options: [
      'Green-and-yellow combination, exclusive to protective conductors. One colour at least 30% and at most 70% of the surface, the other colour the remainder.',
      'Solid green, used exclusively for earthing and bonding conductors.',
      'Black with a green stripe, distinguishing bonding from circuit protective conductors.',
      'Blue, the same identification colour as the neutral conductor it runs alongside.',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 514.4.2 — green-and-yellow is reserved exclusively for protective conductors (earthing, CPC, main bonding, supplementary bonding, equipotential bonding). Cannot be used for any other purpose. The 30/70 ratio rule prevents the colour being mistaken for solid green (which is forbidden for live or protective conductors per 514.4.5).',
  },
];

const faqs2 = [
  {
    question: 'Why is 10 mm² the most common main bonding size on domestic jobs?',
    answer:
      'Almost all UK domestic supplies are TN-C-S (PME) with a PEN conductor of 35 mm² or less — typically 16 mm² or 25 mm² aluminium service cable. Table 54.8 maps "PEN ≤ 35 mm²" to a 10 mm² copper-equivalent minimum main bonding. So on virtually every domestic main bonding job, 10 mm² G/Y single-core is what gets fitted to the gas, water and any other extraneous-conductive-part.',
  },
  {
    question: 'When does main bonding step up to 16 mm² or 25 mm²?',
    answer:
      'Once you cross PEN sizes used on bigger supplies. A three-phase 100 A commercial supply often has a 35 mm² PEN — still 10 mm² bonding under the table. A larger commercial supply with 50 mm² PEN steps to 16 mm² bonding. Industrial 95 mm² PEN steps to 25 mm². Always read the supplier neutral and check Table 54.8 — do not guess.',
  },
  {
    question: 'What is the difference between main bonding sizing and earthing conductor sizing?',
    answer:
      'Main bonding (Reg 544.1.1 + Table 54.8 on PME) sizes the conductors from the MET out to the gas, water and other extraneous services. Main earthing conductor (Reg 544.1.1 + Table 54.7 or 54.8 + Table 54.1 if buried) sizes the conductor from the MET back to the source earth (PEN block on PME, sheath on TN-S, electrode on TT). Different jobs, related sizing rules, often the same physical conductor cross-section but they should be checked against the right table each time.',
  },
  {
    question: 'When does supplementary bonding sizing apply instead of main bonding?',
    answer:
      'Supplementary bonding (Reg 544.2) applies in special locations like bathrooms (Section 701), swimming pools (Section 702), agricultural (Section 705) where ADS disconnection times can not be relied upon. Different sizing: 4 mm² minimum for extraneous-to-exposed bonds (or half the CPC if larger), 2.5 mm² minimum for extraneous-to-extraneous bonds in mechanical protection.',
  },
  {
    question: 'How does the regs distinguish between PME and non-PME for bonding sizing?',
    answer:
      'Reg 544.1.1 has two halves. "Except where PME conditions apply" → bonding is half the earthing conductor with a 6 mm² minimum and 25 mm² maximum cap (in copper). "Where PME conditions apply" → bonding is sized against the PEN per Table 54.8. PME forces a step up because of the broken-PEN fault scenario. Always identify the supply type first (look at the meter cabinet, ask the DNO if unclear) — getting it wrong means the bonding may melt under fault conditions.',
  },
  {
    question: 'Can I use a smaller bond if the run is short and the cable is well-protected?',
    answer:
      'No. The Reg 544 sizing tables set a minimum CSA for fault-current handling, not for voltage drop. They are floor values. You can always go larger (and many electricians fit 16 mm² as a defensive standard on PME), but you can not go smaller than the table value regardless of route length, mechanical protection or any other factor. Going smaller risks the conductor failing during a fault — the entire purpose of the bonding being there.',
  },
];

export default function Lesson315E_1_11() {
  return (
    <div className="space-y-8">

      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        The check that protects the protective conductor. The Reg 543.1.3 adiabatic equation S =
        √(I²t)/k end to end, the k values from Table 43.1, where the t value really comes from,
        and a full TN-C-S worked example for a B32 RCBO at the end of a domestic radial.
      </p>

      <TLDR
        points={[
          'The line-conductor CCC calc protects the cable against steady-state heating at Ib. The CPC adiabatic check protects the protective conductor against the brief but intense I²t energy let-through during a fault — different physics, different equation, both required.',
          'BS 7671 Reg 543.1.3 gives the adiabatic equation S = √(I²t)/k, rearranged from t < kS²/I². S is the minimum CPC CSA in mm², I is the actual prospective fault current, t is the device’s actual operating time at that current (read from Appendix 3 in A4:2026, formerly Appendix 14), k is the material/insulation constant from Table 43.1.',
          'Always use the ACTUAL device operating time at the ACTUAL fault current, not the worst-case maximum disconnection time from Table 41.1. The two questions are independent: ADS protects persons, adiabatic protects the CPC.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'State the BS 7671 Reg 543.1.3 adiabatic equation S = √(I²t)/k and identify each variable correctly.',
          'Explain why the CPC adiabatic check is independent of, and additional to, the line-conductor CCC calculation and the ADS disconnection time check.',
          'Select the correct k value from Table 43.1 for a given conductor material, insulation type and starting temperature.',
          'Determine the actual device operating time t from a manufacturer time/current characteristic or BS 7671 Appendix 3 (formerly Appendix 14) for a given prospective fault current.',
          'Apply the Cmin factor of 0.95 to the supply voltage when calculating the worst-case prospective fault current for the adiabatic check.',
          'Work through a complete TN-C-S worked example end to end — from Zs through If through t to the minimum S — and verify that the installed CPC passes.',
          'Recognise when the adiabatic check is binding (high PSCC, slow-clearing devices) and when it is non-binding (TT systems where RCD operation is the constraint).',
        ]}
        initialVisibleCount={3}
      />

      <ConceptBlock
        title="Two thermal regimes — steady-state CCC vs adiabatic fault stress"
        plainEnglish="The line conductor sees the design current Ib for hours every day. The CPC sees nothing until a fault, then it sees a huge current for a fraction of a second. The two thermal stories are completely different and need separate calculations."
        onSite="Most apprentices instinctively size cables on CCC and forget the adiabatic. On a modern installation with the standard T&E products and a B-curve RCBO, the adiabatic almost always passes — but it must be checked and documented, not assumed."
      >
        <p>
          The line conductor in a circuit lives in a steady-state thermal world. It carries the
          design current Ib continuously, and the cable’s CCC (from the lesson on determining
          cable size and rating) is the gate that proves
          the conductor temperature stays inside the insulation’s rating during normal use.
          Steady-state heat in equals steady-state heat out — the conductor settles at a stable
          temperature that the CCC calc has verified is acceptable.
        </p>
        <p>
          The protective conductor lives in a different world. For 99.99 percent of its life it
          carries no current at all. It sits there waiting. When a fault occurs, the prospective
          fault current — typically tens to hundreds of times Ib — flows briefly until the
          protective device clears the fault. The CPC must survive that brief but intense I²t
          energy let-through without melting, damaging the cable insulation or losing its
          electrical continuity for the next fault.
        </p>
        <p>
          The adiabatic equation is the mathematical model of that brief thermal stress.
          "Adiabatic" means we assume no heat is conducted away from the conductor during the
          fault — all the energy I²t × seconds goes into raising the conductor’s temperature. That
          is a conservative assumption, since the real conductor loses some heat to the insulation
          and surrounding cable, but it is mathematically tractable and gives a safe-side answer.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 543.1.3 (Calculation of cross-sectional area)"
        clause="The cross-sectional area, where calculated, shall be not less than the value determined by the following formula or shall be obtained by reference to BS EN [IEC] 60949 for shock currents of duration up to 5 s: S = √(I²t) / k, where: S is the nominal cross-sectional area of the conductor in mm²; I is the value of the fault current for a fault of negligible impedance, which can flow through the associated protective device, in amperes (RMS); t is the operating time of the disconnecting device for automatic disconnection in seconds; k is a factor taking account of the resistivity, temperature coefficient and heat capacity of the conductor material, and the appropriate initial and final temperatures."
        meaning={
          <>
            Reg 543.1.3 is the adiabatic gate. It demands that the protective conductor’s
            cross-sectional area be at least the value that comes out of the equation, with I
            taken as the actual prospective fault current, t as the actual device operating time
            at that current (not the maximum permitted disconnection time), and k from Table 43.1
            for the conductor material and insulation. For faults lasting longer than 5 s the
            adiabatic assumption breaks down and BS EN 60949 non-adiabatic methods apply instead.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 54, Regulation 543.1.3."
      />

      <SectionRule />

      <ContentEyebrow>The k value — Table 43.1 in detail</ContentEyebrow>

      <ConceptBlock
        title="Picking k correctly — material, insulation and starting temperature"
        plainEnglish="k bundles three properties of the conductor into one number: the material’s heat capacity, the insulation’s temperature limit, and the starting temperature you assume. Pick the wrong row in Table 43.1 and your minimum CSA can be wrong by 25 percent or more."
        onSite="On everyday domestic and small commercial work the value is almost always k = 115 — copper conductor, 70 °C thermoplastic (PVC) insulation, starting at 70 °C, finishing at 160 °C. Memorise that one and you cover most jobs."
      >
        <p>
          Indicative k values from BS 7671 Table 43.1 (verify against your edition before signing
          calculations):
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Copper, 70 °C thermoplastic (PVC) insulation:</strong> k = 115. Initial
            temperature 70 °C, final temperature 160 °C.
          </li>
          <li>
            <strong>Copper, 90 °C thermosetting (XLPE) insulation:</strong> k = 143. Initial 90
            °C, final 250 °C — the higher temperature ceiling reflects XLPE’s greater thermal
            stability.
          </li>
          <li>
            <strong>Copper, 60 °C thermoplastic insulation:</strong> k = 141. Initial 60 °C, final
            200 °C.
          </li>
          <li>
            <strong>Bare copper, not in contact with combustible materials:</strong> k = 228 (or
            similar — check Table 43.1 for the exact figure). Initial 30 °C, final 500 °C.
          </li>
          <li>
            <strong>Aluminium, 70 °C thermoplastic insulation:</strong> k = 76. Roughly two-thirds
            of the copper figure, reflecting aluminium’s lower heat capacity per unit volume.
          </li>
          <li>
            <strong>Steel CPC (e.g. SWA armour):</strong> k = 51. Substantially lower than copper,
            hence steel CPCs need much greater CSA to pass the adiabatic.
          </li>
        </ul>
        <p>
          The "starting temperature" assumption matters because it sets how much headroom the
          conductor has before reaching the insulation’s damage point. A conductor that is already
          at 70 °C from steady-state operation cannot rise as far before reaching the 160 °C limit
          as a conductor starting at room temperature — hence the lower k value for the in-service
          starting condition.
        </p>
      </ConceptBlock>

      <InlineCheck
        id={checks[1].id}
        question={checks[1].question}
        options={checks[1].options}
        correctIndex={checks[1].correctIndex}
        explanation={checks[1].explanation}
      />

      <SectionRule />

      <ContentEyebrow>Reading t off the time/current curve</ContentEyebrow>

      <ConceptBlock
        title="Where the t value comes from — Appendix 3 (A4:2026) time/current characteristics"
        plainEnglish="t is the actual operating time of the protective device at the actual prospective fault current. It is read off a published curve, or off the manufacturer’s datasheet. It is NOT the maximum permitted disconnection time from Table 41.1 — that is the ADS gate, a different question."
        onSite="In BS 7671 A4:2026 the time/current characteristics live in Appendix 3 — they used to live in Appendix 14 in pre-A4 editions, and Appendix 14 now contains prospective fault current information. If you are using older study material you may see Appendix 14 referenced; the curves are the same, just relocated."
      >
        <p>
          The protective device’s time/current characteristic shows operating time on the vertical
          axis (log scale, typically 0.01 s to 1000 s) against current on the horizontal axis (log
          scale, typically 1 to 100 × In). Each curve is a corridor — the device will operate
          within an upper and lower envelope at any given current.
        </p>
        <p>
          For the adiabatic check, use the upper bound of the corridor (the slowest expected
          operating time) as a worst-case for the conductor. Three regions matter:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Thermal region</strong> — at currents from In up to roughly 3 × In for a
            B-curve, 5 × In for a C-curve, 10 × In for a D-curve. The bimetal strip heats and
            eventually trips. Operating times range from minutes at marginal overload down to tens
            of seconds at the upper edge of the thermal region.
          </li>
          <li>
            <strong>Magnetic region</strong> — above the thermal/magnetic boundary, the solenoid
            coil snaps the contacts open instantaneously. Operating time is typically 10–40 ms
            regardless of how much above the magnetic threshold the current is.
          </li>
          <li>
            <strong>Breaking-capacity region</strong> — at very high fault currents (tens of kA),
            the device may use current limitation to cut peak let-through. Specialist manufacturer
            data applies; the standard published curves stop at lower currents.
          </li>
        </ul>
        <p>
          For a B-curve MCB, the magnetic instantaneous range is 3 × In to 5 × In. For a B32, that
          is 96 A to 160 A. Any fault current above 160 A puts the B32 in instantaneous mode, with
          t typically in the 10–40 ms range. For the adiabatic check on a domestic circuit, the
          actual t is almost always under 0.1 s — using the maximum permitted 0.4 s disconnection
          time massively oversizes the CPC.
        </p>
      </ConceptBlock>

      <InlineCheck
        id={checks[2].id}
        question={checks[2].question}
        options={checks[2].options}
        correctIndex={checks[2].correctIndex}
        explanation={checks[2].explanation}
      />

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Appendix 3 (Time/current characteristics) and Appendix 14 (Prospective fault current)"
        clause="Appendix 3 in BS 7671:2018+A4:2026 contains time/current characteristics of overcurrent protective devices and RCDs. The previous content of Appendix 14 (concerning earth fault loop impedance and time/current curves) has been moved into Appendix 3. Appendix 14 has been redefined and now contains information on the determination of prospective fault current for electrical installations."
        meaning={
          <>
            A4:2026 reorganised the back of the book. Time/current curves used to live in Appendix
            14; they now live in Appendix 3, which is also the new home of the EFLI maxima used in
            conjunction with Table 41.3. Appendix 14 has been redefined to cover prospective fault
            current calculation. When working from older study material that references Appendix
            14 for curves, treat that as Appendix 3 in A4:2026; the technical content is the same.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 Appendix 3 and Appendix 14."
      />

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 543.1.1 (Cross-sectional area of protective conductor)"
        clause="The cross-sectional area of every protective conductor, other than a protective bonding conductor, shall be calculated in accordance with Regulation 543.1.4 (selection from Table 54.7). Calculation in accordance with Regulation 543.1.3 (the adiabatic equation) is necessary where the choice of cross-sectional area of line conductors has been determined by considerations of short-circuit current and where the earth fault current is expected to be less than the short-circuit current."
        meaning={
          <>
            Reg 543.1.1 sits one rung above Regs 543.1.3 and 543.1.4 in the hierarchy of Chapter
            54. The default route is the simplified table method in 543.1.4 (Table 54.7), which is
            itself derived from a worst-case adiabatic calculation. The calculated route in
            543.1.3 is only required where the line-conductor sizing has already been driven by
            short-circuit considerations and the earth-fault current is expected to be lower than
            the short-circuit current — a condition typical of large industrial / sub-main
            installations rather than domestic. This lesson focuses on the calculated route under
            543.1.3.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 54, Regulations 543.1.1, 543.1.3 and 543.1.4."
      />

      <SectionRule />

      <ContentEyebrow>Worked example — TN-C-S domestic radial</ContentEyebrow>

      <ConceptBlock
        title="Full worked example — 32 A radial socket circuit, B32 RCBO, TN-C-S"
        plainEnglish="A complete adiabatic check on a typical domestic install. Walk through every line so the maths is undeniable. Numbers are realistic for a 25 m radial in a UK semi-detached property."
        onSite="Keep this example beside you the first ten times you do an adiabatic on a real job. After ten honest calcs the pattern becomes second nature."
      >
        <p>
          <strong>The circuit:</strong> 25 m radial socket circuit on 4 mm² T&E (line 4 mm², CPC
          1.5 mm²), feeding kitchen sockets in a 1990s semi-detached. Protective device: B32 RCBO.
          Supply: TN-C-S, declared Ze = 0.35 Ω, U0 = 230 V. Insulation: 70 °C thermoplastic (PVC).
        </p>
        <p>
          <strong>Step 1 — Calculate the design Zs at the end of the circuit.</strong> R1 + R2 for
          4 mm² line / 1.5 mm² CPC at 70 °C operating temperature ≈ 17.07 mΩ/m (R1 + R2 cold) ×
          1.20 (temperature multiplier for 70 °C) = 20.5 mΩ/m. Over 25 m: 0.0205 × 25 = 0.51 Ω.
          Add to declared Ze: Zs(design) = 0.35 + 0.51 = 0.86 Ω.
        </p>
        <p>
          <strong>Step 2 — Calculate the prospective fault current with Cmin.</strong> If = U0 ×
          Cmin / Zs = 230 × 0.95 / 0.86 = 218.5 / 0.86 = 254 A.
        </p>
        <p>
          <strong>Step 3 — Read the device operating time from Appendix 3.</strong> B32 magnetic
          instantaneous range is 3 × 32 to 5 × 32 = 96 A to 160 A. The fault current of 254 A is
          well above 160 A, so the device is in instantaneous mode. From the published curve (or
          the manufacturer’s datasheet), t at 254 A on a B32 ≈ 0.04 s (40 ms) — a typical
          instantaneous trip time.
        </p>
        <p>
          <strong>Step 4 — Pick k from Table 43.1.</strong> Copper CPC, 70 °C thermoplastic
          insulation, in-service starting temperature 70 °C, final temperature 160 °C: k = 115.
        </p>
        <p>
          <strong>Step 5 — Plug into Reg 543.1.3.</strong> S(min) = √(I²t) / k = √(254² × 0.04) /
          115 = √(64 516 × 0.04) / 115 = √2580.6 / 115 = 50.80 / 115 = 0.44 mm².
        </p>
        <p>
          <strong>Step 6 — Compare to installed CSA.</strong> Installed CPC is 1.5 mm². 1.5 ≥ 0.44
          — pass with comfortable margin (factor of ~3.4). Document the calc on the design sheet.
        </p>
        <p>
          The wide margin is typical of modern domestic work. The 1.5 mm² CPC in 4 mm² T&E passes
          the adiabatic by a large factor for any reasonable Zs and any B-curve RCBO up to 32 A.
          The check still has to be done — but the answer is rarely a surprise.
        </p>
      </ConceptBlock>

      <InlineCheck
        id={checks[0].id}
        question={checks[0].question}
        options={checks[0].options}
        correctIndex={checks[0].correctIndex}
        explanation={checks[0].explanation}
      />

      <SectionRule />

      <ContentEyebrow>When the adiabatic actually bites</ContentEyebrow>

      <ConceptBlock
        title="The cases where the adiabatic governs the design"
        plainEnglish="On modern domestic installs the adiabatic is rarely the binding constraint — modern T&E products have generous CPC fractions and modern devices clear quickly. But there are specific cases where the adiabatic is the gate that decides the cable, and you must run the calc honestly."
      >
        <p>Cases where the adiabatic typically governs:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Industrial sub-mains protected by BS 88 fuses</strong> — fuses clear slower
            than MCBs in the high-fault region (no instantaneous "snap"; they have to melt the
            fuse element). t can be 0.1 s or more even on hard faults, and the CPC CSA has to
            support that energy.
          </li>
          <li>
            <strong>SWA cable runs where the steel armour is the CPC</strong> — k for steel is ~51
            (vs 115 for copper PVC), so the armour cross-section needed for a given I²t is roughly
            2.3 times the equivalent copper. SWA armour CSA is published in cable manufacturer
            datasheets — verify it is adequate for your fault current and clearing time.
          </li>
          <li>
            <strong>Discrimination / selectivity schemes with deliberate time-delay</strong> —
            where an upstream device is set to delay tripping (e.g. a 0.5 s or 1 s delay on a
            settable MCCB) so a downstream device can clear first. The longer t directly
            multiplies into the I²t energy and can drive the upstream CPC up by a CSA bracket or
            two.
          </li>
          <li>
            <strong>Older "reduced CPC" T&E in conjunction with a slow-clearing device</strong> —
            pre-1990s domestic installs sometimes had 1.0 mm² CPC in a 2.5 mm² T&E. With a modern
            B-curve RCBO this still passes, but with an old BS 3036 rewireable fuse the slower
            clearing time can push the adiabatic over the edge.
          </li>
          <li>
            <strong>Three-phase circuits with line-to-line faults</strong> — the prospective fault
            current can be √3 times the line-to-neutral fault current, and the adiabatic must be
            run with that worst-case figure.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="The line-conductor adiabatic — Reg 434.5.2"
        plainEnglish="Reg 434.5.2 applies the same kind of adiabatic equation to the line conductor for the worst-case short-circuit fault. On modern installs with HBC fuses or current-limiting MCBs this is rarely binding, but on older or higher-PSCC industrial work it must be checked."
        onSite="If you find yourself doing a line-conductor adiabatic by hand, you are likely on industrial work where specialist software is the right tool. The principle is the same as the CPC adiabatic — different t and possibly different k for the line insulation."
      >
        <p>
          Reg 434.5.2 sets the same adiabatic constraint on the line conductor for short-circuit
          currents. The equation is structurally identical: S = √(I²t) / k, where I is the
          prospective short-circuit current (line-to-neutral or line-to-line), t is the device’s
          actual operating time at that current, and k is the line conductor’s material/insulation
          constant.
        </p>
        <p>
          For most domestic and small commercial circuits the line conductor passes by a wide
          margin because the device is in its instantaneous region (t ~10–40 ms) and the line CSA
          is already sized by CCC for the design current. For industrial work with kA-level PSCC
          and slower MCCBs or HBC fuses, the line-conductor adiabatic is the binding constraint
          and is checked with cable-manufacturer software that handles non-adiabatic effects above
          5 s.
        </p>
      </ConceptBlock>

      <Scenario
        title="TN-C-S domestic — converting a 32 A oven circuit to a 7 kW EV charger"
        situation={
          <>
            A 1995 semi-detached has a 32 A radial in 6 mm²/2.5 mm² T&E running 18 m from a
            replacement 100 A CU to a kitchen oven point. The owner is removing the electric oven
            (gas hob and oven now), and the cable has been recommissioned at the consumer end as a
            32 A EV charger feed via a Type B-protected RCBO. Declared Ze = 0.35 Ω. Run the
            adiabatic check on the 2.5 mm² CPC.
          </>
        }
        whatToDo={
          <>
            Step 1 — R1 + R2 for 6 mm² line / 2.5 mm² CPC at 70 °C operating: cold value ~10.49
            mΩ/m × 1.20 = 12.6 mΩ/m. Over 18 m: 0.0126 × 18 = 0.227 Ω. Zs(design) = Ze + R1+R2 =
            0.35 + 0.227 = 0.577 Ω. Step 2 — If = 230 × 0.95 / 0.577 = 218.5 / 0.577 = 379 A. Step
            3 — t at 379 A on a B32 = instantaneous, ~0.03 s (read from Appendix 3). Step 4 — k =
            115 for copper / 70 °C thermoplastic. Step 5 — S(min) = √(379² × 0.03) / 115 = √(4309)
            / 115 = 65.6 / 115 = 0.57 mm². Installed CPC is 2.5 mm², which is comfortably above
            0.57 — pass. Document the result; the existing cable is fit for the new EV charger
            duty from a thermal-constraint perspective. (Other gates — CCC at the rated EV
            current, Vd over the run, the EV-specific RCD requirements of Reg 722 — must also be
            checked separately.)
          </>
        }
        whyItMatters={
          <>
            Re-purposing existing cables for new loads (EV chargers, heat pumps, battery circuits)
            is the daily reality of domestic energy upgrades. The adiabatic check is what proves
            the existing CPC is fit for the new fault duty. Skipping it because "it was fine for
            the oven" is a real-world failure mode — the new device’s breaking characteristic, the
            new design current, and the new RCD requirements may all change the picture.
          </>
        }
      />

      <SectionRule />

      <ContentEyebrow>Table 54.7 — the simplified CPC sizing route</ContentEyebrow>

      <ConceptBlock
        title="Table 54.7 — when you can skip the adiabatic calc"
        plainEnglish="Reg 543.1.4 lets you size the CPC from a simple lookup table (Table 54.7) instead of doing the adiabatic calc. The table is conservative — it assumes worst-case fault clearing — so the CPC csa it tells you to install is usually larger than what 543.1.3 would calculate. Faster, no calc to defend, but uses more copper than necessary. Useful when time-pressured or when the device's actual time/current data isn't readily available."
        onSite="On a quick CU swap where you're using standard T&E products, Table 54.7 confirms the CPC csa is adequate for the line csa. It's a sanity check that takes 10 seconds. For anything bespoke (separate CPCs, SWA armour-as-CPC, parallel cables), drop into the full 543.1.3 calc — the table won't cover unusual configurations correctly."
      >
        <p>
          Table 54.7 (BS 7671 — verify against your edition before signing) gives minimum CPC csa
          as a function of line conductor csa and material. The headline relationships:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Line csa ≤ 16 mm²:</strong> CPC csa ≥ line csa, same material. Drives
            "full-size CPC" cable products like 2.5/2.5 mm² T&E (modern) and 6/6 mm² T&E.
          </li>
          <li>
            <strong>Line csa 16-35 mm²:</strong> CPC csa ≥ 16 mm², same material. Drives the
            typical 25/16 mm² and 35/16 mm² configurations on commercial sub-mains.
          </li>
          <li>
            <strong>Line csa &gt; 35 mm²:</strong> CPC csa ≥ line csa / 2, rounded up to nearest
            standard csa. So a 70 mm² line gets a 35 mm² CPC; a 95 mm² line gets a 50 mm² CPC.
          </li>
          <li>
            <strong>Aluminium</strong> follows the same csa relationships but values may need
            adjustment by k ratio if the line and CPC are different materials (rare in practice).
          </li>
        </ul>
        <p>
          <strong>When Table 54.7 is appropriate:</strong>
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            Standard cable products with conventional CPC arrangement (T&E, four-core SWA with
            separate CPC, multicore with insulated CPC).
          </li>
          <li>
            Standard protective devices (BS EN 60898 MCBs, BS EN 61009 RCBOs, BS 88-3 fuses) with
            published characteristics.
          </li>
          <li>Quick design check or sanity check on existing installations.</li>
        </ul>
        <p>
          <strong>When you must drop into 543.1.3:</strong>
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>SWA armour acting as CPC.</strong> Steel armour csa is published in cable
            manufacturer datasheets; verify against the adiabatic equation with k = 51 (steel) and
            the actual prospective fault current and clearing time.
          </li>
          <li>
            <strong>Parallel cables.</strong> Where multiple cables run in parallel for a single
            circuit, the fault current divides between them based on impedance. Each parallel CPC
            must independently survive its share — adiabatic on each.
          </li>
          <li>
            <strong>Reduced-csa CPC products on slow-clearing devices.</strong> Older T&E products
            with reduced CPC fractions (e.g. 6/2.5 mm² where the table would prefer 6/4 mm²) on
            slow devices (HBC fuses, settable MCCBs with intentional time delay).
          </li>
          <li>
            <strong>Bespoke installations</strong> — busbar trunking with non-standard CPC, exotic
            cable types, lift / motor circuits with starting transients.
          </li>
        </ul>
        <p>
          The L3 designer's discipline: use Table 54.7 as the default sanity check, but document
          that the calculated route per 543.1.3 has been considered for any non-standard
          arrangement. Both options are equally compliant — the calculated route just gives a
          smaller CPC csa where the device clears fast.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="SWA armour-as-CPC — when the steel itself is the protective conductor"
        plainEnglish="On steel-wire armoured (SWA) cable, the steel armour can serve as the CPC instead of a separate copper CPC core. Reg 543.2.1 permits this where the armour is electrically continuous (proper glands at both ends, bonded to MET / earth bar via gland bonding kits). The adiabatic check uses k = 51 for steel, much lower than k = 115 for copper-PVC, so the armour csa needed is roughly 2.3 × what a copper CPC would be."
        onSite="On a 4 mm² four-core SWA cable, the steel armour csa is typically 8-9 mm² depending on manufacturer. That's sufficient for short, fast-cleared circuits — but on long runs or with slow devices, the adiabatic can fail. Always check the manufacturer's published armour csa against the adiabatic for the actual device clearing time."
      >
        <p>
          Worked SWA armour adiabatic. A 30 m run of 16 mm² four-core SWA from a TN-C-S supply (Ze
          = 0.30 Ω, U0 = 230 V) feeding a 50 A B-curve MCCB at the supply end. The steel armour
          serves as CPC; manufacturer's published armour csa = 17 mm² steel.
        </p>
        <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>R1 + R2 estimate at 70 °C operating.</strong> R1 (16 mm² Cu, 30 m) ≈ 30 × 1.83
            mΩ/m × 1.20 = 65.9 mΩ = 0.066 Ω. R2 (steel armour, much higher resistivity than Cu —
            typical 17 mm² steel = ~6.5 mΩ/m at 70 °C, so 30 m = 195 mΩ = 0.195 Ω). R1 + R2 ≈ 0.26
            Ω.
          </li>
          <li>
            <strong>Zs at the load end</strong> = Ze + R1+R2 = 0.30 + 0.26 = 0.56 Ω.
          </li>
          <li>
            <strong>If = U0 × Cmin / Zs</strong> = 230 × 0.95 / 0.56 = 390 A.
          </li>
          <li>
            <strong>t at 390 A on a B50 MCCB</strong> — 390 A is below the magnetic instantaneous
            range (3-5 × In = 150-250 A — wait, 390 A IS above 5 × 50 = 250 A, so we ARE in
            instantaneous mode), t ≈ 0.04 s.
          </li>
          <li>
            <strong>k for steel</strong> = 51 (Table 43.1).
          </li>
          <li>
            <strong>Minimum CPC csa per 543.1.3</strong> = √(I²t) / k = √(390² × 0.04) / 51 =
            √(6084) / 51 = 78.0 / 51 = 1.53 mm² steel.
          </li>
          <li>
            <strong>Installed armour csa</strong> = 17 mm² steel. 17 ≥ 1.53 — pass with massive
            margin (factor of ~11).
          </li>
        </ol>
        <p>
          The wide margin is typical of SWA armour-as-CPC for short runs with fast devices. The
          armour fails the adiabatic only on long runs (50 m+) with slow devices (BS 88 fuses or
          settable MCCBs with intentional time delay) where t can be 0.5-1 s — at which point the
          I²t energy is hundreds of times larger.
        </p>
        <p>
          <strong>Critical points for SWA armour-as-CPC:</strong>
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Gland bonding.</strong> Both ends of the SWA must have proper gland bonding
            kits (BW gland with earth tag, or banjo + earth tail) electrically connecting the
            armour to the MET / earth bar. A SWA terminated with the armour just clamped under the
            gland body — without a bonding tag — has no CPC continuity.
          </li>
          <li>
            <strong>Long underground runs.</strong> Soil moisture and chemistry can corrode armour
            over decades. Long-term reliability of armour-as-CPC is acceptable in domestic /
            commercial use but for critical installations a dedicated copper CPC core may be
            preferred.
          </li>
          <li>
            <strong>Documentation.</strong> The design pack must explicitly state armour-as-CPC
            and reference manufacturer-published armour csa. The schedule of test results records
            r2 for the armour route, with continuity verified at install.
          </li>
          <li>
            <strong>Supplementary copper CPC.</strong> Some designers run a separate green/yellow
            CPC alongside the SWA in addition to the armour, giving belt-and-braces protection.
            This is uncommon but appears on critical infrastructure where redundant earthing is
            specified.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Things that catch people out</ContentEyebrow>

      <CommonMistake
        title="Using the maximum permitted disconnection time as t in the adiabatic equation"
        whatHappens={
          <>
            The apprentice plugs t = 0.4 s (the Table 41.1 maximum for a TN final circuit at U0 =
            230 V) into S = √(I²t) / k because that figure is sitting in their head from the ADS
            calculation. The result is a CPC ten times the size actually needed. They spec 16 mm²
            CPC where 1.5 mm² would have been fine. The customer pays for the copper, the install
            is unnecessarily heavy, and the next designer reads the drawing and assumes there must
            have been a reason.
          </>
        }
        doInstead={
          <>
            Always use the actual device operating time at the actual prospective fault current.
            Read it off the published time/current curve in BS 7671 Appendix 3 (formerly Appendix
            14 pre-A4) or off the manufacturer’s datasheet. For a B-curve MCB on a fault current
            well into the magnetic region, that is typically 10–40 ms, not 0.4 s. The maximum
            permitted disconnection time governs the ADS check (does the device clear in time to
            limit shock voltage); the adiabatic uses the actual clearing time at the actual fault
            current.
          </>
        }
      />

      <CommonMistake
        title={`Picking the wrong k value because the cable is "kind of like" the table row`}
        whatHappens={
          <>
            The job is a separate single 4 mm² green/yellow PVC-sleeved CPC tied alongside a
            steel-conduit run. The apprentice picks k = 143 ("bare copper not in contact with
            combustible materials" — because the conductor is "in conduit") instead of k = 115
            (copper with thermoplastic insulation — because the green/yellow sleeve IS the
            relevant thermal barrier). The minimum CSA comes out 25 percent too low and the cable
            is undersized for the actual fault duty.
          </>
        }
        doInstead={
          <>
            Read the Table 43.1 row carefully. The relevant question is "what is the thermal limit
            of the material in immediate contact with the conductor?" — usually the insulation,
            sometimes the surrounding cable bedding, occasionally the bare-copper final
            temperature where there genuinely is no insulation. A green/yellow PVC sleeve is PVC
            for the purposes of this calc. If you are uncertain, default to the more conservative
            (lower) k value — you spend a little more on copper, but you are unambiguously safe.
          </>
        }
      />

      <SectionRule />

      <FAQ items={faqs} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Reg 543.1.3 adiabatic equation: S = √(I²t) / k. S is the minimum CPC CSA in mm², I is the actual prospective fault current in amps, t is the actual device operating time at that current in seconds, k is the material/insulation constant from Table 43.1.',
          'The adiabatic check is independent of the line-conductor CCC and the ADS disconnection time. CCC protects the line from steady-state heating; ADS protects persons from shock; adiabatic protects the CPC from fault energy let-through. All three must pass independently.',
          'k = 115 for copper CPC in 70 °C thermoplastic insulation (PVC). k = 143 for copper in 90 °C thermosetting (XLPE). k = 51 for steel CPCs (e.g. SWA armour). Aluminium k values are roughly two-thirds of the copper figures.',
          'Always use the ACTUAL device operating time at the ACTUAL prospective fault current — read from BS 7671 Appendix 3 (A4:2026 location, formerly Appendix 14) or the manufacturer’s time/current curve. Do not substitute the worst-case maximum disconnection time from Table 41.1.',
          'Apply Cmin = 0.95 to U0 when calculating the prospective fault current for the adiabatic check, in line with the same convention used for the EFLI calculation (BS 7671 A4:2026 carries Cmin in the design assumptions for fault calculations).',
          'On modern domestic installs the adiabatic almost always passes with comfortable margin because B-curve RCBOs clear in 10–40 ms and modern T&E products have generous CPC fractions. The check is still required and must be documented on the design sheet.',
          'On TT systems the adiabatic almost never governs — the high earth-electrode resistance limits fault current to a few amps, RCD operation (not adiabatic) is the binding constraint. On industrial sub-mains with BS 88 fuses or settable MCCBs with intentional time delay, the adiabatic frequently does govern.',
          'The same kind of equation applies to the line conductor under Reg 434.5.2 for short-circuit currents — rarely binding on small domestic work, regularly binding on industrial design.',
        ]}
      />

      <Quiz title="Adiabatic / thermal constraint — knowledge check" questions={quizQuestions} />

      <SectionRule />


      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        Sizing main protective bonding against BS 7671 Table 54.8 (PME) and Reg 544.1.1 (TN-S /
        TT). 10 mm² is the workhorse on domestic but it is not the rule — read the supply, read
        the table, fit what the regs actually require.
      </p>

      <TLDR
        points={[
          'PME (TN-C-S) bonding: Reg 544.1.1 + Table 54.8. PEN ≤ 35 mm² → 10 mm² Cu minimum. PEN over 35 mm² up to 50 mm² → 16 mm². PEN over 50 to 95 mm² → 25 mm².',
          'Non-PME (TN-S, TT): Reg 544.1.1 — bonding is half the earthing conductor CSA, 6 mm² minimum, no need to exceed 25 mm² Cu equivalent.',
          'Always read the supplier neutral first. The PEN size sets the table row. Domestic 100 A supplies normally have a PEN of 25 mm² aluminium or smaller, so 10 mm² is the routine bonding answer.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Identify the standard cross-sectional areas of main protective bonding conductors used in UK installations: 6 mm², 10 mm², 16 mm², 25 mm² and beyond.',
          'Cite Reg 544.1.1 and apply Table 54.8 to size a main bonding conductor for a given PME supply.',
          'Apply the half-of-earthing-conductor rule (Reg 544.1.1) for non-PME (TN-S, TT) installations with the 6 mm² minimum and 25 mm² Cu maximum cap.',
          'Identify the minimum buried earthing conductor sizes from Table 54.1 (with and without mechanical and corrosion protection).',
          'Identify the supplementary bonding sizing rules from Reg 544.2 (4 mm² unprotected / 2.5 mm² protected for extraneous-to-extraneous).',
          'Read the BS 7671 colour code (Reg 514.4.2 — green-and-yellow exclusive to protective conductors) and pick conductors that meet Reg 543.3.201 insulation cover.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>What main bonding does and why size matters</ContentEyebrow>

      <ConceptBlock
        title="Main bonding equalises potential during a fault"
        plainEnglish="Tie every metal pipe, every structural service, every extraneous-conductive-part back to the MET so they all sit at the same voltage when a fault happens. If they are at the same voltage, no one gets a shock between them."
        onSite="On every domestic, commercial and industrial install, main bonding goes from the MET to the consumer side of the gas meter, to the consumer side of the water service, and to any other extraneous-conductive-part that introduces a potential into the building (oil pipework, structural steel, lightning protection earth)."
      >
        <p>
          The main protective bonding conductor is part of the BS 7671 protective equipotential
          bonding system (Reg 411.3.1.2). Its job is to keep extraneous-conductive-parts — metal
          pipes and structures that come into the building from outside — at the same potential as
          the MET during a line-to-earth fault. Without it, a fault on a circuit could leave the
          gas pipe at line potential while the metal sink on the worktop is at earth potential,
          and anyone touching both at once gets the full touch voltage across their body.
        </p>
        <p>
          The size of the bonding conductor matters for two reasons. First, mechanical: a thin
          strap can be damaged in a service cupboard by other trades. Second and more important,
          fault-current handling: in a broken-PEN scenario on a PME supply, the bonding conductor
          may have to carry the entire installation's neutral return current back to ground
          through the extraneous-conductive-parts. An undersized conductor will melt before the
          fault is cleared, breaking the bond at the worst possible moment.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 544.1.1 (Cross-sectional area of main protective bonding conductors)"
        clause="Except where PME conditions apply, a main protective bonding conductor shall have a cross-sectional area not less than half the cross-sectional area required for the earthing conductor of the installation. Where an installation serves more than one building, a main protective bonding conductor shall be selected in accordance with the characteristics of the distribution circuit protective conductor for that particular building. The cross-sectional area shall be not less than 6 mm², and need not exceed 25 mm² if the bonding conductor is of copper or a cross-sectional area affording equivalent conductance in other metals. Except for highway power supplies and street furniture, where PME conditions apply the main protective bonding conductor shall be selected in accordance with the PEN conductor of the supply and Table 54.8."
        meaning={
          <>
            Two sizing methods. Non-PME — half the earthing conductor CSA, 6 mm² floor, 25 mm² Cu
            cap. PME — read Table 54.8 against the supplier PEN. Table 54.8 forces a step up
            because of the broken-PEN risk. On the routine UK domestic PME supply (PEN ≤ 35 mm²)
            that lands at a 10 mm² Cu equivalent minimum.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026, Regulation 544.1.1 (cross-sectional area of main protective bonding conductors) — paraphrased."
      />

      <SectionRule />

      <ContentEyebrow>The PME route — Table 54.8</ContentEyebrow>

      <ConceptBlock
        title="Read the PEN, read the table"
        plainEnglish="Look at the supplier neutral conductor on the head end (the PEN). Find the row in Table 54.8. Pick the bonding size next to it. That is the minimum — you can always go larger."
      >
        <p>
          On a PME supply, BS 7671 Table 54.8 gives the minimum copper-equivalent cross-sectional
          area of the main protective bonding conductor in relation to the supplier's PEN
          conductor:
        </p>
        <div className="bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-xl p-4 text-[14px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-white/90">
            <div className="font-semibold text-emerald-300">PEN of supply</div>
            <div className="font-semibold text-emerald-300 hidden sm:block">Min Cu bonding</div>

            <div>35 mm² or less</div>
            <div className="text-white/70 sm:text-white/90">10 mm²</div>

            <div>over 35 mm² up to 50 mm²</div>
            <div className="text-white/70 sm:text-white/90">16 mm²</div>

            <div>over 50 mm² up to 95 mm²</div>
            <div className="text-white/70 sm:text-white/90">25 mm²</div>

            <div>over 95 mm² up to 150 mm²</div>
            <div className="text-white/70 sm:text-white/90">35 mm²</div>

            <div>over 150 mm²</div>
            <div className="text-white/70 sm:text-white/90">50 mm²</div>
          </div>
        </div>
        <p>
          Table 54.8 carries a NOTE: "Local distributor's network conditions may require a larger
          conductor." Some DNOs publish supply-specific bonding requirements that exceed the table
          values. Always cross-check the local DNO supply standard before final sign off — UK
          Power Networks, Northern Powergrid, Western Power and SP Energy Networks each publish
          their own service connection standards with bonding minima.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Why PEN size drives the bonding sizing"
        plainEnglish="A broken PEN on PME means every amp of installation neutral wants to escape via earth. The bonding becomes the escape route. Size it to handle the worst case."
        onSite="In the rare event the supplier PEN breaks (a fault on the supply network, often outside your control), the gas pipe and water pipe in the building suddenly become the neutral return path for the entire installation back to local ground. Your bonding conductor is the link in that chain. If it melts, the broken-PEN voltage rise lands on every metal surface in the property."
      >
        <p>
          The broken-PEN scenario is the design case for PME bonding sizing. Under normal
          operation, the PEN carries the installation's neutral current safely back to source. In
          a broken-PEN fault, the PEN connection between the supply and the consumer's
          installation is severed — possibly at a service joint, possibly at a head terminal — and
          the only remaining path for the neutral return current is via the consumer's local
          earthing and bonding system to extraneous-conductive-parts (gas, water, structural
          steel) and from there into the ground.
        </p>
        <p>
          Table 54.8 sizes the bonding to carry this fault current without failing for long enough
          that the supply can be restored or the protective device upstream operates. That is why
          a 10 mm² minimum is mandated even when the half-of-earthing rule would give a smaller
          answer — the broken-PEN current may dramatically exceed normal CPC fault currents.
        </p>
      </ConceptBlock>

      <InlineCheck
        id={checks2[0].id}
        question={checks2[0].question}
        options={checks2[0].options}
        correctIndex={checks2[0].correctIndex}
        explanation={checks2[0].explanation}
      />

      <SectionRule />

      <ContentEyebrow>The non-PME route — half the earthing conductor</ContentEyebrow>

      <ConceptBlock
        title="TN-S and TT — half of the earthing conductor, 6 mm² floor, 25 mm² cap"
        plainEnglish="Work out the earthing conductor size first, halve it, round up to the next standard size. Never go below 6 mm². No need to exceed 25 mm² in copper."
      >
        <p>
          On a TN-S supply (cable sheath as protective conductor) and on TT (local electrode), PME
          conditions do not apply. Reg 544.1.1 first half kicks in: the main protective bonding
          conductor cross-sectional area shall be not less than half that required for the
          earthing conductor of the installation. The 6 mm² minimum and 25 mm² Cu maximum both
          apply.
        </p>
        <p>Worked examples:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Earthing conductor 16 mm² Cu</strong> → half is 8 mm² → round up to next
            standard size → <strong>10 mm² bonding</strong>.
          </li>
          <li>
            <strong>Earthing conductor 25 mm² Cu (TT, unprotected, buried)</strong> → half is 12.5
            mm² → <strong>16 mm² bonding</strong> (next standard size).
          </li>
          <li>
            <strong>Earthing conductor 50 mm² Cu (large commercial TT)</strong> → half is 25 mm² →
            cap of 25 mm² applies → <strong>25 mm² bonding</strong> (no need to go higher in
            copper).
          </li>
          <li>
            <strong>Earthing conductor 6 mm² Cu (small TN-S)</strong> → half is 3 mm² →{' '}
            <strong>6 mm² bonding</strong> (the 6 mm² floor wins).
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 544.1.1 and Table 54.1 (Buried earthing conductors)"
        clause="544.1.1 — for the cross-sectional area of a main protective bonding conductor. In addition, where buried in the ground, the earthing conductor shall have a cross-sectional area not less than that stated in Table 54.1. For a tape or strip conductor, the thickness shall be such as to withstand mechanical damage and corrosion. Table 54.1 — Minimum cross-sectional area of a buried earthing conductor: protected against corrosion AND mechanical damage — 2.5 mm² Cu / 10 mm² steel; protected against corrosion only (sheath) — 16 mm² Cu / 16 mm² coated steel; not protected against corrosion — 25 mm² Cu / 50 mm² steel."
        meaning={
          <>
            The buried portion of an earthing conductor — typically the run from the MET out to a
            TT electrode — has its own minimum sizes in Table 54.1, separate from the bonding
            sizing. A bare 6 mm² Cu strap is fine inside a meter cabinet but not buried in the
            ground; once underground, you need at least 16 mm² Cu (protected against corrosion by
            a sheath) or 25 mm² Cu (unprotected). Most TT installations end up with a 16 mm² Cu
            earthing conductor because it satisfies both the half-of-earthing rule and the
            buried-conductor minimum.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 54, Regulation 544.1.1 and Table 54.1."
      />

      <InlineCheck
        id={checks2[1].id}
        question={checks2[1].question}
        options={checks2[1].options}
        correctIndex={checks2[1].correctIndex}
        explanation={checks2[1].explanation}
      />

      <SectionRule />

      <ContentEyebrow>Supplementary bonding sizing — different rules</ContentEyebrow>

      <ConceptBlock
        title="Reg 544.2 — supplementary bonding is sized differently"
        plainEnglish="Supplementary bonds are short, local, and live in special locations like bathrooms. The CSA rules are smaller — 4 mm² unprotected, 2.5 mm² between extraneous parts in conduit. Different from main bonding."
        onSite="The headline: when you are doing a bathroom and supplementary bonding is required (older property, missing RCD on every circuit), your sizing is from Reg 544.2 — not from Table 54.8."
      >
        <p>Supplementary bonding sizing under Reg 544.2:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Reg 544.2.1</strong> — between two exposed-conductive-parts (e.g. between two
            Class I appliances): conductance not less than the smaller CPC connected to the
            exposed parts. Min 4 mm² if not mechanically protected.
          </li>
          <li>
            <strong>Reg 544.2.2</strong> — between an exposed-conductive-part and an
            extraneous-conductive-part (e.g. towel rail to copper pipe): conductance not less than
            half the CPC of the exposed-conductive-part. Min 4 mm² if not mechanically protected.
          </li>
          <li>
            <strong>Reg 544.2.3</strong> — between two extraneous-conductive-parts (e.g. copper
            hot pipe to copper cold pipe): 2.5 mm² minimum if mechanically protected (in conduit,
            sheath, etc.) or 4 mm² if not protected.
          </li>
        </ul>
        <p>
          The shorthand most electricians remember: 4 mm² on view, 2.5 mm² in conduit. That covers
          the routine bathroom scenarios. Anything more elaborate (commercial special locations,
          agricultural) — go back to the regulation.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Conductor identification and insulation cover</ContentEyebrow>

      <ConceptBlock
        title="Green-and-yellow — exclusive to protective conductors"
        plainEnglish="Bonding cable is single-core green/yellow. Always. Never any other colour. The 30/70 ratio between the two colours is a regulation, not a preference."
      >
        <p>
          Reg 514.4.2 — the bi-colour combination green-and-yellow is reserved exclusively for
          identification of protective conductors and shall not be used for any other purpose. In
          this combination one colour shall cover at least 30% and at most 70% of the surface, the
          other colour the remainder. The point of the 30/70 rule: a strap that is mostly green
          with a dash of yellow looks too much like solid green — and Reg 514.4.5 forbids solid
          green for live, protective or functional bonding conductors because of the
          colour-blindness risk and the historical confusion with old wiring colour codes.
        </p>
        <p>
          Reg 543.3.201 then sets the insulation cover requirement. Protective conductors up to
          and including 6 mm² need a covering at least equivalent to a single-core non-sheathed
          cable of voltage rating 450/750 V — i.e. the standard green/yellow single-core sleeved
          insulation you buy on a reel. Bare strap is allowed only inside a metallic
          conduit/enclosure used as the protective conductor itself, or as part of a multicore.
          Above 6 mm² the insulation requirement relaxes a little but in practice all main bonding
          cable sold for the job is fully insulated G/Y single-core.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 514.4.2 (Identification of protective conductors)"
        clause="The bi-colour combination green-and-yellow shall be used exclusively for identification of a protective conductor and this combination shall not be used for any other purpose. In this combination one of the colours shall cover at least 30% and at most 70% of the surface being coloured, while the other colour shall cover the remainder of the surface. Single-core cables and conductors in multicore cables identified by green-and-yellow throughout their length shall only be used as a protective conductor and shall not be overmarked at their terminations, except as permitted by Regulation 514.4.3."
        meaning={
          <>
            Every main bonding, supplementary bonding, earthing conductor and CPC must be
            green-and-yellow. The 30/70 split is mandatory — not a stylistic choice. Anything
            solid green or solid yellow used as a protective conductor is non-compliant and a
            coding issue at inspection.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 51, Regulation 514.4.2."
      />

      <InlineCheck
        id={checks2[2].id}
        question={checks2[2].question}
        options={checks2[2].options}
        correctIndex={checks2[2].correctIndex}
        explanation={checks2[2].explanation}
      />

      <ConceptBlock
        title="Why TT installations need bigger main earthing — soil resistivity reality"
        plainEnglish="On TT, your earth electrode resistance is fighting the soil. Wet clay might be 30 ohms; dry sand or rocky ground can be hundreds. The earthing conductor has to be heavy enough to survive both fault current and decades of corrosion in damp ground — that's why TT installs almost always end up with 16 mm² or 25 mm² main earthing rather than the 10 mm² you'd see on PME."
        onSite="On a rural TT install — say a barn conversion or a static caravan park pitch — you'll typically run a 16 mm² Cu earthing conductor from the MET out to the rod, even though the half-of-CPC math sometimes says less. Reason: Table 54.1 says buried + corrosion-protected = 16 mm² Cu minimum. And once the earthing conductor is 16 mm², the half-rule pulls main bonding up to 10 mm² Cu (8 mm² rounded up to next standard size)."
      >
        <p>
          UK soil resistivity varies enormously. London clay sits around 30 to 50 ohm-metres when
          wet; chalk and sand can hit 500 ohm-metres or more in summer drought. A single 1.2 m
          driven copper-bonded rod typically lands somewhere between 50 and 200 ohms total
          resistance to ground depending on soil and season. That's the whole reason TT needs a 30
          mA RCD on every final circuit — Zs is too high for an MCB to disconnect in time on a
          fault, so RCDs do the disconnection job.
        </p>
        <p>
          The bigger main earthing conductor on TT does two jobs at once. First, it's buried for
          at least part of its run (electrode pit to MET) so Table 54.1 minimums apply — 16 mm² Cu
          corrosion-protected, 25 mm² Cu unprotected. Second, the larger CSA gives a margin
          against decades of corrosion in damp ground; a 6 mm² conductor that loses 30% of its
          cross-section to copper-oxide creep over 25 years is a different proposition from a 16
          mm² conductor losing the same proportion. Most TT installs you'll inherit have 16 mm² Cu
          earthing and 10 mm² Cu main bonding — that's not accidental, it's the regs working in
          combination.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Bonding cable colour code in practice — when G/Y, when stripe, when sleeving"
        plainEnglish="Main bonding is single-core green-and-yellow with the 30/70 stripe baked into the insulation. You only sleeve when you're using a single-core cable that started life as something else — a green-and-yellow CPC inside a Twin & Earth where the bare CPC needs identification at every termination."
        onSite="In the wholesaler bin, 'bonding cable' means 6491X G/Y single-core in 4 mm², 6 mm², 10 mm², 16 mm² and 25 mm². You buy it on a reel, cut to length, no sleeving needed because the insulation already meets Reg 514.4.2. The G/Y sleeving on your van is for the bare CPC inside Twin & Earth, not for main bonding runs."
      >
        <p>
          Reg 514.4.2 wants the green-and-yellow stripe to cover the full length of the conductor
          — and it spells out the 30/70 ratio (one colour at least 30%, at most 70% of the
          surface, the other colour the remainder). Branded bonding cable from any UK wholesaler —
          Doncaster, Time, Pirelli, Prysmian — meets this out of the box. You don't have to do
          anything beyond cutting it to length and stripping the ends.
        </p>
        <p>Where the sleeving rule actually bites:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Bare CPC inside Twin &amp; Earth.</strong> The CPC inside 6242Y T&amp;E is
            bare copper. At every termination — back box, accessory, consumer unit — the bare CPC
            must be sleeved with G/Y heat-shrink or PVC sleeving so it's identified as a
            protective conductor. Reg 514.4 requires this; Reg 543.3.201 is the insulation-cover
            rule that makes the sleeving necessary up to and including 6 mm² CPC.
          </li>
          <li>
            <strong>SWA armour used as the CPC.</strong> The steel armour itself is the CPC on
            most SWA installs. At the gland, the CPC tail (the short piece bonded from the gland
            banjo to the earth bar in the gear) gets G/Y identification — heat-shrink or sleeving
            along its length.
          </li>
          <li>
            <strong>Singles in conduit where G/Y wasn't ordered.</strong> Rare on bonding — you
            should always order G/Y for bonding runs. If you ever inherit an install where someone
            ran a black or grey core for a bonding conductor (non-compliant from day one), it can
            be fully G/Y oversleeved at every accessible point as a temporary remediation pending
            replacement.
          </li>
        </ul>
        <p>
          The shorthand: if you're running 6491X bonding cable, you're already compliant on
          colour. If you're using a core out of a multi-core cable as a protective conductor, you
          sleeve every visible bit of it to G/Y. Solid green or solid yellow on its own is
          forbidden for protective conductors per Reg 514.4.5.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Where the sizing goes wrong on real jobs</ContentEyebrow>

      <CommonMistake
        title="Fitting 6 mm² 'because it is half of 10' on a PME bonding job"
        whatHappens={
          <>
            You are tying in main bonding to a gas pipe in the meter cupboard. The earthing
            conductor coming out of the MET measures 10 mm². The half-of-earthing rule says
            bonding can be 5 mm² → round up to 6 mm². You fit a 6 mm² G/Y strap, tighten the clamp
            and move on. Six months later an EICR codes your install C2 (potentially dangerous)
            because the supply is PME and Reg 544.1.1 / Table 54.8 demanded a 10 mm² bonding
            minimum based on the supplier neutral, not on the earthing conductor.
          </>
        }
        doInstead={
          <>
            Always identify the supply system first. PME (TN-C-S) and you go to Table 54.8 indexed
            by the PEN conductor. Non-PME and you use the half-of-earthing rule. The two sizing
            methods do not give the same answer and the half-of-earthing rule is NOT permitted on
            PME because it does not account for the broken-PEN fault scenario. On a domestic PME
            supply with PEN ≤ 35 mm² the answer is always 10 mm² Cu minimum, regardless of how big
            the earthing conductor turns out to be.
          </>
        }
      />

      <Scenario
        title="Single-phase 100 A TN-C-S domestic with 25 mm² tails — what bonding to gas and water?"
        situation={
          <>
            You are first-fixing main bonding in a new-build semi. The supply is single-phase 100
            A TN-C-S (PME). The DNO has fitted 25 mm² aluminium tails into the consumer cut-out
            and a 16 mm² Cu earthing conductor down to the MET. You need to bond the incoming gas
            service and the incoming water service. What CSA do you fit and why?
          </>
        }
        whatToDo={
          <>
            Identify the supply: PME → Reg 544.1.1 second half → Table 54.8. Find the supplier
            PEN: 25 mm² aluminium ≈ 16 mm² copper-equivalent. That is "35 mm² or less" in the
            table → 10 mm² Cu minimum bonding. Fit 10 mm² G/Y single-core (insulated, meets Reg
            543.3.201 cover requirement) from the MET to the BS 951 earth clamp on the consumer
            side of the gas meter (within 600 mm per Reg 544.1.2) and another 10 mm² run from the
            MET to the BS 951 clamp on the consumer side of the water stop-tap (also within 600
            mm). Two separate runs back to the MET — never daisy-chain the bonds because a break
            at the first clamp would lift the bond on the second.
          </>
        }
        whyItMatters={
          <>
            Sizing the bond against the supply rather than against the earthing conductor is the
            entire point of Reg 544.1.1's PME branch. A correctly sized 10 mm² bond can handle the
            broken-PEN fault current long enough for protection to operate. A 6 mm² bond (which
            would meet the half-of-earthing rule for a 10 mm² earthing conductor) cannot, and
            would melt — leaving the gas pipe at the broken-PEN voltage. The same Reg, two sizing
            methods, completely different real-world fault outcomes.
          </>
        }
      />

      <SectionRule />

      <FAQ items={faqs2} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Main bonding sizing is governed by Reg 544.1.1. Two methods: PME uses Table 54.8 indexed by PEN; non-PME uses half the earthing conductor with a 6 mm² floor and 25 mm² Cu cap.',
          'Table 54.8 (PME): PEN ≤ 35 mm² → 10 mm² Cu; over 35–50 → 16 mm²; over 50–95 → 25 mm²; over 95–150 → 35 mm²; over 150 → 50 mm².',
          'Domestic 100 A PME supplies typically have 16 mm² or 25 mm² aluminium PEN — both fall in the "≤ 35 mm²" row, so 10 mm² bonding is the routine answer.',
          'Buried earthing conductor sizing is governed separately by Table 54.1 — 16 mm² Cu protected against corrosion, 25 mm² Cu unprotected.',
          'Supplementary bonding (Reg 544.2) is sized differently: 4 mm² unprotected, 2.5 mm² protected for extraneous-to-extraneous; 4 mm² unprotected or half the CPC for extraneous-to-exposed.',
          'All main bonding cable is green-and-yellow single-core (Reg 514.4.2) with insulation cover at least equivalent to 450/750 V (Reg 543.3.201). Solid green or solid yellow is forbidden for protective conductors.',
          'Local DNOs may publish higher minimum sizes than Table 54.8 — always cross-check the supplier specification before final sign off.',
          'When in doubt, fit the next size up. The cost difference between 10 mm² and 16 mm² G/Y is pence per metre. The cost of an undersized bond failing is a life.',
        ]}
      />

      <Quiz title="Identify cable sizes — knowledge check" questions={quizQuestions2} />
    </div>
  );
}
