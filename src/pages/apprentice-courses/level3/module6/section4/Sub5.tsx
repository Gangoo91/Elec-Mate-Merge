/**
 * Module 6 · Section 4 · Subsection 5 — Thermal constraint t < kS²/I² (the adiabatic gate)
 * Maps to C&G 2365-03 / Unit 305 / LO4 / AC 4.5
 *   AC 4.5 — "Verify that the cross-sectional area of a protective conductor is adequate
 *            for the prospective fault current and the disconnection time of the
 *            protective device, using the adiabatic equation in BS 7671 Reg 543.1.3"
 * Layered: 2366-03 Unit 304 / AC 4.5; 5393-03 Unit 104 / AC 4.5
 *
 * The adiabatic check end to end. Why the line conductor passing CCC is not
 * the same question as whether the CPC will survive the fault. Reg 543.1.3,
 * the k values from Table 54.2 (60364) / Table 43.1 (in BS 7671 context),
 * and a worked TN-C-S example with B32 ADS at 0.4 s.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
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
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Thermal constraint — t < kS²/I² (4.5) | Level 3 Module 6.4.5 | Elec-Mate';
const DESCRIPTION =
  'The adiabatic gate for the protective conductor. Why the CPC must survive the fault current for the device’s disconnection time, the Reg 543.1.3 equation S = √(I²t)/k, the k values from Table 43.1, and a full TN-C-S worked example.';

const checks = [
  {
    id: 'adiabatic-basic',
    question:
      'A B32 RCBO clears in 0.1 s on a TN-C-S fault of 800 A. The CPC is 2.5 mm² copper, 70 °C thermoplastic insulation, k = 115. Does the CPC survive the fault?',
    options: [
      'No — kS²/I² works out to ~0.13 and the device clears in 0.1 s, which is below — fail.',
      'Yes — minimum CSA needed is √(I²t)/k = √(800² × 0.1)/115 = √64000/115 = 252.98/115 ≈ 2.20 mm². 2.5 mm² is above 2.20 — pass.',
      'Yes — any CPC above 1.5 mm² always passes.',
      'You cannot tell without measuring Zs.',
    ],
    correctIndex: 1,
    explanation:
      'Reg 543.1.3 gives S ≥ √(I²t)/k. Plug in: I = 800 A, t = 0.1 s, k = 115. I²t = 800 × 800 × 0.1 = 64 000 A²s. √64 000 = 252.98. Divide by 115 = 2.20 mm². The minimum CPC CSA is 2.20 mm²; the installed 2.5 mm² is above that. The CPC survives. Note that the t value is the device’s actual operating time at the fault current (read from Appendix 3 time/current curves in BS 7671 A4:2026, formerly Appendix 14), not the maximum permitted disconnection time.',
  },
  {
    id: 'k-value-pick',
    question:
      'You are sizing a separate copper CPC sleeved in green/yellow PVC, run loose alongside thermoplastic singles. Conductor temperature limit at the start of the fault is 70 °C, final temperature 160 °C. Which k value from Table 43.1 do you use?',
    options: [
      'k = 143 (separate bare copper CPC not in contact with cable insulation, 200 °C final).',
      'k = 115 (copper CPC, 70 °C thermoplastic insulation in contact, 160 °C final).',
      'k = 76 (steel CPC).',
      'k = 226 (copper line conductor at 70 °C with 90 °C thermosetting).',
    ],
    correctIndex: 1,
    explanation:
      'Table 43.1 splits k values by conductor material, by insulation type and by whether the conductor is bare or insulated. The "PVC sleeved CPC" case is treated as PVC-insulated (the sleeve is the relevant thermal barrier), so the 70 °C thermoplastic row gives k = 115. Bare copper not in contact with combustible material gets k = 143 (higher final temperature allowed). Picking the wrong k can change your minimum CSA by 25 percent.',
  },
  {
    id: 'time-from-curves',
    question:
      'You have a Zs at the end of a circuit of 0.85 Ω on a 230 V supply. The protective device is a Type B 32 A MCB. What If do you use, and roughly what t do you read off the time/current characteristic for the adiabatic check?',
    options: [
      'If = 230 / 0.85 = 270 A; t ≈ 5 s (the maximum permitted disconnection time).',
      'If = U0 × Cmin / Zs = 230 × 0.95 / 0.85 = 257 A; t = the actual operating time of the B32 at 257 A — comfortably in the magnetic region (Ia for B-curve = 5×In = 160 A), so t < 0.1 s.',
      'If = 32 A (the device rating); t = 0.4 s.',
      'If = 230 × √3 / 0.85 = 469 A; t = 0.4 s.',
    ],
    correctIndex: 1,
    explanation:
      'For the adiabatic check you use the actual prospective fault current, applying Cmin (0.95 in BS 7671 A4:2026) to U0 to give the worst-case fault voltage. If = 230 × 0.95 / 0.85 = 257 A. For a B-curve MCB the magnetic instantaneous trip range is 3–5 × In. At In = 32 A that is 96–160 A. 257 A is well above the upper bound, so the device is in its magnetic region and operates in well under 0.1 s. Use the manufacturer-published time/current curve (or BS 7671 Appendix 3, formerly Appendix 14 pre-A4) for the actual time, not the worst-case 0.4 s ceiling.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the BS 7671 Reg 543.1.3 adiabatic equation, and what does each variable mean?',
    options: [
      'V = IR — voltage drop across the conductor.',
      'S = √(I²t) / k, where S is the minimum CPC CSA in mm², I is the prospective fault current in amps, t is the device operating time in seconds at that current, and k is the material/insulation constant from Table 43.1.',
      'P = I²R — heat dissipation only.',
      'Zs = Ze + (R1 + R2) — earth fault loop impedance only.',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 543.1.3 gives the adiabatic minimum CPC CSA: S = √(I²t)/k. The equation is "adiabatic" because it assumes no heat escapes the conductor during the fault — all the fault energy I²t goes into raising the conductor temperature. k bundles the conductor’s heat capacity, the starting temperature and the maximum allowable final temperature into a single material constant. The check is independent of, and additional to, the line-conductor CCC and Vd checks.',
  },
  {
    id: 2,
    question: 'Why is the line-conductor CCC calculation not enough — why do we need a separate CPC adiabatic check?',
    options: [
      'Because line conductors and CPCs are different materials.',
      'Because the line conductor only ever carries the design current Ib for hours on end (steady state), but the CPC briefly carries a fault current that can be many tens of times Ib for a fraction of a second. The two thermal regimes are completely different.',
      'Because the regulations say so.',
      'Because the CPC has higher resistance.',
    ],
    correctAnswer: 1,
    explanation:
      'The line conductor’s CCC (steady state) is a "how long does it take to cook at Ib" question. The CPC’s adiabatic check is a "can it survive a brief fault at If for t seconds without melting the insulation or destroying its thermal stability" question. Different physics, different equation. A 1.5 mm² CPC routinely passes CCC for a 16 A circuit but can fail adiabatic if the device is slow to clear or the fault current is high.',
  },
  {
    id: 3,
    question: 'In the equation S = √(I²t)/k, where does the "t" value come from?',
    options: [
      'The maximum permitted disconnection time from Table 41.1 (0.4 s for a TN final circuit at U0 = 230 V).',
      'The actual operating time of the protective device at the actual prospective fault current, read from the manufacturer’s time/current curve or from BS 7671 Appendix 3 (formerly Appendix 14).',
      'Always 5 s.',
      'Always 0.1 s.',
    ],
    correctAnswer: 1,
    explanation:
      'The Reg 543.1.3 t is the actual operating time, not the maximum permitted disconnection time. For a B32 MCB on a fault current well into the magnetic region, the actual t is typically under 10 ms; using the 0.4 s ceiling would massively oversize the CPC. The maximum permitted disconnection time from Table 41.1 is the ADS gate (Sub 5.2); the adiabatic check uses the real t at the real If.',
  },
  {
    id: 4,
    question: 'What value of k applies to a copper CPC inside a thermoplastic (PVC) insulated cable at the start temperature of 70 °C?',
    options: ['k = 76', 'k = 115', 'k = 143', 'k = 226'],
    correctAnswer: 1,
    explanation:
      'Table 43.1 in BS 7671 gives k = 115 for a copper conductor with 70 °C thermoplastic (PVC) insulation (initial temperature 70 °C, final temperature 160 °C). For 90 °C thermosetting (XLPE) the k rises to 143. For bare copper not in contact with combustible materials it is 143 (final 200 °C). For aluminium the values are roughly two-thirds of the copper figures.',
  },
  {
    id: 5,
    question: 'You compute the minimum CPC at S = 1.32 mm². The actual installed CPC is 1.5 mm². What is the right call?',
    options: [
      'Reject — 1.5 mm² is borderline.',
      'Accept — 1.5 mm² ≥ 1.32 mm² so the adiabatic equation passes. Document the calc on the design sheet.',
      'Always size to 4 mm² minimum for safety.',
      'You cannot install a CPC smaller than the line conductor.',
    ],
    correctAnswer: 1,
    explanation:
      'The adiabatic check is a "≥" comparison: the installed S must be at least the calculated minimum. 1.5 ≥ 1.32 — pass. Note that twin-and-earth domestic cable for many years used "reduced CPC" sizing — a 2.5 mm² T&E has a 1.5 mm² CPC, a 6 mm² T&E has a 2.5 mm² CPC. These reductions only work where the adiabatic check passes for the chosen device and Zs.',
  },
  {
    id: 6,
    question: 'What is the relationship between the adiabatic check and the ADS disconnection time check?',
    options: [
      'They are the same check.',
      'They are independent. ADS asks "does the device clear in time to limit shock voltage?" The adiabatic asks "given the device’s actual clearing time at the actual fault current, will the CPC survive the energy let-through?" Both must pass.',
      'You only need to do one.',
      'The adiabatic replaces ADS in BS 7671 A4:2026.',
    ],
    correctAnswer: 1,
    explanation:
      'ADS (Sub 5.2 / Reg 411.3.2) is about persons — clear the fault before the touch voltage causes harm. Adiabatic (Reg 543.1.3) is about the protective conductor surviving so it remains a protective conductor for the next fault. A device can clear within the ADS time but the adiabatic still fail if the CPC is undersized — and vice versa for unusual cable choices. Run both gates independently.',
  },
  {
    id: 7,
    question:
      'For a 32 A radial socket circuit on TN-C-S with measured Zs = 1.20 Ω, supply at U0 = 230 V, B32 RCBO, what is the prospective fault current you use in the adiabatic check, and where do you read the operating time?',
    options: [
      'I = 32 A; t = 0.4 s.',
      'I = U0 × Cmin / Zs = 230 × 0.95 / 1.20 = 182 A; t read from the B-curve characteristic at 182 A — within the magnetic instantaneous range (Ia ≈ 160 A for B32), so t ≈ 0.04 s. Calculate S = √(182² × 0.04) / 115 = √(1325) / 115 = 36.4 / 115 = 0.32 mm².',
      'I = 230 / 1.20 = 192 A; t = 5 s.',
      'I = √3 × 230 / 1.20 = 332 A; t = 0.1 s.',
    ],
    correctAnswer: 1,
    explanation:
      'Apply Cmin = 0.95 to U0. I = 230 × 0.95 / 1.20 = 182 A. A B-curve magnetic trip range is 3–5 × In, so for B32 that is 96–160 A. 182 A is just above the upper bound — the device is in instantaneous mode, t ≈ 30–50 ms in practice. Plug into Reg 543.1.3: S = √(I²t)/k = √(182 × 182 × 0.04) / 115 = √1325 / 115 = 0.32 mm². Any reasonable CPC (1.0 mm² or above) passes this check by a comfortable margin.',
  },
  {
    id: 8,
    question:
      'A TT installation has a measured Zs of 200 Ω on a 230 V supply. The device is a 30 mA Type AC RCD with operating time of 0.04 s at 30 mA × 5 = 150 mA. The CPC is 1.5 mm² copper PVC, k = 115. Does the adiabatic check pass?',
    options: [
      'No — 200 Ω Zs is too high for the adiabatic to ever pass.',
      'Yes — If = 230 × 0.95 / 200 = 1.09 A. S = √(1.09² × 0.04) / 115 = √(0.0475) / 115 = 0.218 / 115 = 0.0019 mm². The CPC needed is essentially zero; 1.5 mm² is hugely oversized for the adiabatic on a TT system. RCD operation, not CPC adiabatic, is the binding constraint on TT.',
      'Yes — but only if you upsize the CPC to 4 mm².',
      'You cannot do an adiabatic check on TT.',
    ],
    correctAnswer: 1,
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
    question: 'Does the adiabatic check matter for ring final circuits where the CPC is "doubled up"?',
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

export default function Sub5() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module6-section4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 4
          </button>

          <PageHero
            eyebrow="Module 6 · Section 4 · Subsection 5"
            title="Thermal constraint — t &lt; kS²/I² (the adiabatic gate)"
            description="The check that protects the protective conductor. The Reg 543.1.3 adiabatic equation S = √(I²t)/k end to end, the k values from Table 43.1, where the t value really comes from, and a full TN-C-S worked example for a B32 RCBO at the end of a domestic radial."
            tone="amber"
          />

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
              design current Ib continuously, and the cable’s CCC (Sub 4.2) is the gate that proves
              the conductor temperature stays inside the insulation’s rating during normal use.
              Steady-state heat in equals steady-state heat out — the conductor settles at a stable
              temperature that the CCC calc has verified is acceptable.
            </p>
            <p>
              The protective conductor lives in a different world. For 99.99 percent of its life
              it carries no current at all. It sits there waiting. When a fault occurs, the prospective
              fault current — typically tens to hundreds of times Ib — flows briefly until the
              protective device clears the fault. The CPC must survive that brief but intense
              I²t energy let-through without melting, damaging the cable insulation or losing its
              electrical continuity for the next fault.
            </p>
            <p>
              The adiabatic equation is the mathematical model of that brief thermal stress.
              "Adiabatic" means we assume no heat is conducted away from the conductor during the
              fault — all the energy I²t × seconds goes into raising the conductor’s temperature.
              That is a conservative assumption, since the real conductor loses some heat to the
              insulation and surrounding cable, but it is mathematically tractable and gives a
              safe-side answer.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 543.1.3 (Calculation of cross-sectional area)"
            clause="The cross-sectional area, where calculated, shall be not less than the value determined by the following formula or shall be obtained by reference to BS EN [IEC] 60949 for shock currents of duration up to 5 s: S = √(I²t) / k, where: S is the nominal cross-sectional area of the conductor in mm²; I is the value of the fault current for a fault of negligible impedance, which can flow through the associated protective device, in amperes (RMS); t is the operating time of the disconnecting device for automatic disconnection in seconds; k is a factor taking account of the resistivity, temperature coefficient and heat capacity of the conductor material, and the appropriate initial and final temperatures."
            meaning={
              <>
                Reg 543.1.3 is the adiabatic gate. It demands that the protective conductor’s
                cross-sectional area be at least the value that comes out of the equation, with
                I taken as the actual prospective fault current, t as the actual device
                operating time at that current (not the maximum permitted disconnection time),
                and k from Table 43.1 for the conductor material and insulation. For faults
                lasting longer than 5 s the adiabatic assumption breaks down and BS EN 60949
                non-adiabatic methods apply instead.
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
                <strong>Copper, 90 °C thermosetting (XLPE) insulation:</strong> k = 143. Initial
                90 °C, final 250 °C — the higher temperature ceiling reflects XLPE’s greater
                thermal stability.
              </li>
              <li>
                <strong>Copper, 60 °C thermoplastic insulation:</strong> k = 141. Initial 60 °C,
                final 200 °C.
              </li>
              <li>
                <strong>Bare copper, not in contact with combustible materials:</strong> k = 228 (or
                similar — check Table 43.1 for the exact figure). Initial 30 °C, final 500 °C.
              </li>
              <li>
                <strong>Aluminium, 70 °C thermoplastic insulation:</strong> k = 76. Roughly
                two-thirds of the copper figure, reflecting aluminium’s lower heat capacity per unit
                volume.
              </li>
              <li>
                <strong>Steel CPC (e.g. SWA armour):</strong> k = 51. Substantially lower than
                copper, hence steel CPCs need much greater CSA to pass the adiabatic.
              </li>
            </ul>
            <p>
              The "starting temperature" assumption matters because it sets how much headroom the
              conductor has before reaching the insulation’s damage point. A conductor that is
              already at 70 °C from steady-state operation cannot rise as far before reaching the
              160 °C limit as a conductor starting at room temperature — hence the lower k value
              for the in-service starting condition.
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
              The protective device’s time/current characteristic shows operating time on the
              vertical axis (log scale, typically 0.01 s to 1000 s) against current on the
              horizontal axis (log scale, typically 1 to 100 × In). Each curve is a corridor — the
              device will operate within an upper and lower envelope at any given current.
            </p>
            <p>
              For the adiabatic check, use the upper bound of the corridor (the slowest expected
              operating time) as a worst-case for the conductor. Three regions matter:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Thermal region</strong> — at currents from In up to roughly 3 × In for a
                B-curve, 5 × In for a C-curve, 10 × In for a D-curve. The bimetal strip heats and
                eventually trips. Operating times range from minutes at marginal overload down to
                tens of seconds at the upper edge of the thermal region.
              </li>
              <li>
                <strong>Magnetic region</strong> — above the thermal/magnetic boundary, the
                solenoid coil snaps the contacts open instantaneously. Operating time is typically
                10–40 ms regardless of how much above the magnetic threshold the current is.
              </li>
              <li>
                <strong>Breaking-capacity region</strong> — at very high fault currents (tens of
                kA), the device may use current limitation to cut peak let-through. Specialist
                manufacturer data applies; the standard published curves stop at lower currents.
              </li>
            </ul>
            <p>
              For a B-curve MCB, the magnetic instantaneous range is 3 × In to 5 × In. For a B32,
              that is 96 A to 160 A. Any fault current above 160 A puts the B32 in instantaneous
              mode, with t typically in the 10–40 ms range. For the adiabatic check on a domestic
              circuit, the actual t is almost always under 0.1 s — using the maximum permitted
              0.4 s disconnection time massively oversizes the CPC.
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
                A4:2026 reorganised the back of the book. Time/current curves used to live in
                Appendix 14; they now live in Appendix 3, which is also the new home of the
                EFLI maxima used in conjunction with Table 41.3. Appendix 14 has been redefined
                to cover prospective fault current calculation. When working from older study
                material that references Appendix 14 for curves, treat that as Appendix 3 in
                A4:2026; the technical content is the same.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Appendix 3 and Appendix 14."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 543.1.1 (Cross-sectional area of protective conductor)"
            clause="The cross-sectional area of every protective conductor, other than a protective bonding conductor, shall be: (a) calculated in accordance with Regulation 543.1.3."
            meaning={
              <>
                Reg 543.1.1 sits one rung above Reg 543.1.3 in the hierarchy of Chapter 54.
                The general rule: every protective conductor (other than a bonding conductor)
                must have its CSA either calculated against the adiabatic equation in 543.1.3,
                or selected from the simplified Table 54.7 method (which is itself derived from
                a worst-case 543.1.3 calc). This Sub focuses on the calculated route under
                543.1.3; the simplified table route is for designers who do not have time/current
                data to hand and accept the more conservative answer.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 54, Regulation 543.1.1."
          />

          <SectionRule />

          <ContentEyebrow>Worked example — TN-C-S domestic radial</ContentEyebrow>

          <ConceptBlock
            title="Full worked example — 32 A radial socket circuit, B32 RCBO, TN-C-S"
            plainEnglish="A complete adiabatic check on a typical domestic install. Walk through every line so the maths is undeniable. Numbers are realistic for a 25 m radial in a UK semi-detached property."
            onSite="Keep this example beside you the first ten times you do an adiabatic on a real job. After ten honest calcs the pattern becomes second nature."
          >
            <p>
              <strong>The circuit:</strong> 25 m radial socket circuit on 4 mm² T&E (line 4 mm²,
              CPC 1.5 mm²), feeding kitchen sockets in a 1990s semi-detached. Protective device:
              B32 RCBO. Supply: TN-C-S, declared Ze = 0.35 Ω, U0 = 230 V. Insulation: 70 °C
              thermoplastic (PVC).
            </p>
            <p>
              <strong>Step 1 — Calculate the design Zs at the end of the circuit.</strong>{' '}
              R1 + R2 for 4 mm² line / 1.5 mm² CPC at 70 °C operating temperature ≈ 17.07 mΩ/m
              (R1 + R2 cold) × 1.20 (temperature multiplier for 70 °C) = 20.5 mΩ/m. Over 25 m:
              0.0205 × 25 = 0.51 Ω. Add to declared Ze: Zs(design) = 0.35 + 0.51 = 0.86 Ω.
            </p>
            <p>
              <strong>Step 2 — Calculate the prospective fault current with Cmin.</strong>{' '}
              If = U0 × Cmin / Zs = 230 × 0.95 / 0.86 = 218.5 / 0.86 = 254 A.
            </p>
            <p>
              <strong>Step 3 — Read the device operating time from Appendix 3.</strong>{' '}
              B32 magnetic instantaneous range is 3 × 32 to 5 × 32 = 96 A to 160 A. The fault
              current of 254 A is well above 160 A, so the device is in instantaneous mode. From
              the published curve (or the manufacturer’s datasheet), t at 254 A on a B32 ≈ 0.04 s
              (40 ms) — a typical instantaneous trip time.
            </p>
            <p>
              <strong>Step 4 — Pick k from Table 43.1.</strong>{' '}
              Copper CPC, 70 °C thermoplastic insulation, in-service starting temperature 70 °C,
              final temperature 160 °C: k = 115.
            </p>
            <p>
              <strong>Step 5 — Plug into Reg 543.1.3.</strong>{' '}
              S(min) = √(I²t) / k = √(254² × 0.04) / 115 = √(64 516 × 0.04) / 115 = √2580.6 / 115
              = 50.80 / 115 = 0.44 mm².
            </p>
            <p>
              <strong>Step 6 — Compare to installed CSA.</strong>{' '}
              Installed CPC is 1.5 mm². 1.5 ≥ 0.44 — pass with comfortable margin (factor of ~3.4).
              Document the calc on the design sheet.
            </p>
            <p>
              The wide margin is typical of modern domestic work. The 1.5 mm² CPC in 4 mm² T&E
              passes the adiabatic by a large factor for any reasonable Zs and any B-curve RCBO
              up to 32 A. The check still has to be done — but the answer is rarely a surprise.
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
            <p>
              Cases where the adiabatic typically governs:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Industrial sub-mains protected by BS 88 fuses</strong> — fuses clear
                slower than MCBs in the high-fault region (no instantaneous "snap"; they have to
                melt the fuse element). t can be 0.1 s or more even on hard faults, and the CPC
                CSA has to support that energy.
              </li>
              <li>
                <strong>SWA cable runs where the steel armour is the CPC</strong> — k for steel is
                ~51 (vs 115 for copper PVC), so the armour cross-section needed for a given I²t
                is roughly 2.3 times the equivalent copper. SWA armour CSA is published in cable
                manufacturer datasheets — verify it is adequate for your fault current and clearing
                time.
              </li>
              <li>
                <strong>Discrimination / selectivity schemes with deliberate time-delay</strong>{' '}
                — where an upstream device is set to delay tripping (e.g. a 0.5 s or 1 s delay on
                a settable MCCB) so a downstream device can clear first. The longer t directly
                multiplies into the I²t energy and can drive the upstream CPC up by a CSA bracket
                or two.
              </li>
              <li>
                <strong>Older "reduced CPC" T&E in conjunction with a slow-clearing device</strong>{' '}
                — pre-1990s domestic installs sometimes had 1.0 mm² CPC in a 2.5 mm² T&E. With a
                modern B-curve RCBO this still passes, but with an old BS 3036 rewireable fuse the
                slower clearing time can push the adiabatic over the edge.
              </li>
              <li>
                <strong>Three-phase circuits with line-to-line faults</strong> — the prospective
                fault current can be √3 times the line-to-neutral fault current, and the
                adiabatic must be run with that worst-case figure.
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
              prospective short-circuit current (line-to-neutral or line-to-line), t is the
              device’s actual operating time at that current, and k is the line conductor’s
              material/insulation constant.
            </p>
            <p>
              For most domestic and small commercial circuits the line conductor passes by a wide
              margin because the device is in its instantaneous region (t ~10–40 ms) and the line
              CSA is already sized by CCC for the design current. For industrial work with
              kA-level PSCC and slower MCCBs or HBC fuses, the line-conductor adiabatic is the
              binding constraint and is checked with cable-manufacturer software that handles
              non-adiabatic effects above 5 s.
            </p>
          </ConceptBlock>

          <Scenario
            title="TN-C-S domestic — converting a 32 A oven circuit to a 7 kW EV charger"
            situation={
              <>
                A 1995 semi-detached has a 32 A radial in 6 mm²/2.5 mm² T&E running 18 m from a
                replacement 100 A CU to a kitchen oven point. The owner is removing the electric
                oven (gas hob and oven now), and the cable has been recommissioned at the consumer
                end as a 32 A EV charger feed via a Type B-protected RCBO. Declared Ze = 0.35 Ω.
                Run the adiabatic check on the 2.5 mm² CPC.
              </>
            }
            whatToDo={
              <>
                Step 1 — R1 + R2 for 6 mm² line / 2.5 mm² CPC at 70 °C operating: cold value
                ~10.49 mΩ/m × 1.20 = 12.6 mΩ/m. Over 18 m: 0.0126 × 18 = 0.227 Ω. Zs(design) =
                Ze + R1+R2 = 0.35 + 0.227 = 0.577 Ω. Step 2 — If = 230 × 0.95 / 0.577 = 218.5 /
                0.577 = 379 A. Step 3 — t at 379 A on a B32 = instantaneous, ~0.03 s (read from
                Appendix 3). Step 4 — k = 115 for copper / 70 °C thermoplastic. Step 5 — S(min) =
                √(379² × 0.03) / 115 = √(4309) / 115 = 65.6 / 115 = 0.57 mm². Installed CPC is
                2.5 mm², which is comfortably above 0.57 — pass. Document the result; the existing
                cable is fit for the new EV charger duty from a thermal-constraint perspective.
                (Other gates — CCC at the rated EV current, Vd over the run, the EV-specific RCD
                requirements of Reg 722 — must also be checked separately.)
              </>
            }
            whyItMatters={
              <>
                Re-purposing existing cables for new loads (EV chargers, heat pumps, battery
                circuits) is the daily reality of domestic energy upgrades. The adiabatic check is
                what proves the existing CPC is fit for the new fault duty. Skipping it because
                "it was fine for the oven" is a real-world failure mode — the new device’s
                breaking characteristic, the new design current, and the new RCD requirements
                may all change the picture.
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
              Table 54.7 (BS 7671 — verify against your edition before signing) gives minimum CPC csa as a function of line conductor csa and material. The headline relationships:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Line csa ≤ 16 mm²:</strong> CPC csa ≥ line csa, same material. Drives "full-size CPC" cable products like 2.5/2.5 mm² T&E (modern) and 6/6 mm² T&E.
              </li>
              <li>
                <strong>Line csa 16-35 mm²:</strong> CPC csa ≥ 16 mm², same material. Drives the typical 25/16 mm² and 35/16 mm² configurations on commercial sub-mains.
              </li>
              <li>
                <strong>Line csa &gt; 35 mm²:</strong> CPC csa ≥ line csa / 2, rounded up to nearest standard csa. So a 70 mm² line gets a 35 mm² CPC; a 95 mm² line gets a 50 mm² CPC.
              </li>
              <li>
                <strong>Aluminium</strong> follows the same csa relationships but values may need adjustment by k ratio if the line and CPC are different materials (rare in practice).
              </li>
            </ul>
            <p>
              <strong>When Table 54.7 is appropriate:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Standard cable products with conventional CPC arrangement (T&E, four-core SWA with separate CPC, multicore with insulated CPC).</li>
              <li>Standard protective devices (BS EN 60898 MCBs, BS EN 61009 RCBOs, BS 88-3 fuses) with published characteristics.</li>
              <li>Quick design check or sanity check on existing installations.</li>
            </ul>
            <p>
              <strong>When you must drop into 543.1.3:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>SWA armour acting as CPC.</strong> Steel armour csa is published in cable manufacturer datasheets; verify against the adiabatic equation with k = 51 (steel) and the actual prospective fault current and clearing time.
              </li>
              <li>
                <strong>Parallel cables.</strong> Where multiple cables run in parallel for a single circuit, the fault current divides between them based on impedance. Each parallel CPC must independently survive its share — adiabatic on each.
              </li>
              <li>
                <strong>Reduced-csa CPC products on slow-clearing devices.</strong> Older T&E products with reduced CPC fractions (e.g. 6/2.5 mm² where the table would prefer 6/4 mm²) on slow devices (HBC fuses, settable MCCBs with intentional time delay).
              </li>
              <li>
                <strong>Bespoke installations</strong> — busbar trunking with non-standard CPC, exotic cable types, lift / motor circuits with starting transients.
              </li>
            </ul>
            <p>
              The L3 designer's discipline: use Table 54.7 as the default sanity check, but document that the calculated route per 543.1.3 has been considered for any non-standard arrangement. Both options are equally compliant — the calculated route just gives a smaller CPC csa where the device clears fast.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="SWA armour-as-CPC — when the steel itself is the protective conductor"
            plainEnglish="On steel-wire armoured (SWA) cable, the steel armour can serve as the CPC instead of a separate copper CPC core. Reg 543.2.1 permits this where the armour is electrically continuous (proper glands at both ends, bonded to MET / earth bar via gland bonding kits). The adiabatic check uses k = 51 for steel, much lower than k = 115 for copper-PVC, so the armour csa needed is roughly 2.3 × what a copper CPC would be."
            onSite="On a 4 mm² four-core SWA cable, the steel armour csa is typically 8-9 mm² depending on manufacturer. That's sufficient for short, fast-cleared circuits — but on long runs or with slow devices, the adiabatic can fail. Always check the manufacturer's published armour csa against the adiabatic for the actual device clearing time."
          >
            <p>
              Worked SWA armour adiabatic. A 30 m run of 16 mm² four-core SWA from a TN-C-S supply (Ze = 0.30 Ω, U0 = 230 V) feeding a 50 A B-curve MCCB at the supply end. The steel armour serves as CPC; manufacturer's published armour csa = 17 mm² steel.
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>R1 + R2 estimate at 70 °C operating.</strong> R1 (16 mm² Cu, 30 m) ≈ 30 × 1.83 mΩ/m × 1.20 = 65.9 mΩ = 0.066 Ω. R2 (steel armour, much higher resistivity than Cu — typical 17 mm² steel = ~6.5 mΩ/m at 70 °C, so 30 m = 195 mΩ = 0.195 Ω). R1 + R2 ≈ 0.26 Ω.
              </li>
              <li>
                <strong>Zs at the load end</strong> = Ze + R1+R2 = 0.30 + 0.26 = 0.56 Ω.
              </li>
              <li>
                <strong>If = U0 × Cmin / Zs</strong> = 230 × 0.95 / 0.56 = 390 A.
              </li>
              <li>
                <strong>t at 390 A on a B50 MCCB</strong> — 390 A is below the magnetic instantaneous range (3-5 × In = 150-250 A — wait, 390 A IS above 5 × 50 = 250 A, so we ARE in instantaneous mode), t ≈ 0.04 s.
              </li>
              <li>
                <strong>k for steel</strong> = 51 (Table 43.1).
              </li>
              <li>
                <strong>Minimum CPC csa per 543.1.3</strong> = √(I²t) / k = √(390² × 0.04) / 51 = √(6084) / 51 = 78.0 / 51 = 1.53 mm² steel.
              </li>
              <li>
                <strong>Installed armour csa</strong> = 17 mm² steel. 17 ≥ 1.53 — pass with massive margin (factor of ~11).
              </li>
            </ol>
            <p>
              The wide margin is typical of SWA armour-as-CPC for short runs with fast devices. The armour fails the adiabatic only on long runs (50 m+) with slow devices (BS 88 fuses or settable MCCBs with intentional time delay) where t can be 0.5-1 s — at which point the I²t energy is hundreds of times larger.
            </p>
            <p>
              <strong>Critical points for SWA armour-as-CPC:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Gland bonding.</strong> Both ends of the SWA must have proper gland bonding kits (BW gland with earth tag, or banjo + earth tail) electrically connecting the armour to the MET / earth bar. A SWA terminated with the armour just clamped under the gland body — without a bonding tag — has no CPC continuity.
              </li>
              <li>
                <strong>Long underground runs.</strong> Soil moisture and chemistry can corrode armour over decades. Long-term reliability of armour-as-CPC is acceptable in domestic / commercial use but for critical installations a dedicated copper CPC core may be preferred.
              </li>
              <li>
                <strong>Documentation.</strong> The design pack must explicitly state armour-as-CPC and reference manufacturer-published armour csa. The schedule of test results records r2 for the armour route, with continuity verified at install.
              </li>
              <li>
                <strong>Supplementary copper CPC.</strong> Some designers run a separate green/yellow CPC alongside the SWA in addition to the armour, giving belt-and-braces protection. This is uncommon but appears on critical infrastructure where redundant earthing is specified.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Things that catch people out</ContentEyebrow>

          <CommonMistake
            title="Using the maximum permitted disconnection time as t in the adiabatic equation"
            whatHappens={
              <>
                The apprentice plugs t = 0.4 s (the Table 41.1 maximum for a TN final circuit at
                U0 = 230 V) into S = √(I²t) / k because that figure is sitting in their head from
                the ADS calculation. The result is a CPC ten times the size actually needed. They
                spec 16 mm² CPC where 1.5 mm² would have been fine. The customer pays for the
                copper, the install is unnecessarily heavy, and the next designer reads the
                drawing and assumes there must have been a reason.
              </>
            }
            doInstead={
              <>
                Always use the actual device operating time at the actual prospective fault
                current. Read it off the published time/current curve in BS 7671 Appendix 3
                (formerly Appendix 14 pre-A4) or off the manufacturer’s datasheet. For a B-curve
                MCB on a fault current well into the magnetic region, that is typically 10–40 ms,
                not 0.4 s. The maximum permitted disconnection time governs the ADS check (does
                the device clear in time to limit shock voltage); the adiabatic uses the actual
                clearing time at the actual fault current.
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
                relevant thermal barrier). The minimum CSA comes out 25 percent too low and the
                cable is undersized for the actual fault duty.
              </>
            }
            doInstead={
              <>
                Read the Table 43.1 row carefully. The relevant question is "what is the thermal
                limit of the material in immediate contact with the conductor?" — usually the
                insulation, sometimes the surrounding cable bedding, occasionally the bare-copper
                final temperature where there genuinely is no insulation. A green/yellow PVC
                sleeve is PVC for the purposes of this calc. If you are uncertain, default to the
                more conservative (lower) k value — you spend a little more on copper, but you
                are unambiguously safe.
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

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module6-section4-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                4.4 Voltage drop design
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module6-section4-6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                4.6 Cable selection synthesis
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
