/**
 * Module 6 · Section 5 · Subsection 3 — Maximum Zs vs measured Zs (the 80% rule)
 * Maps to C&G 2365-03 / Unit 305 / LO5 / AC 5.3
 *   AC 5.3 — "Compare the maximum permitted Zs from BS 7671 Table 41.3 with the
 *            measured Zs at verification, applying the design vs verification
 *            acceptance criterion of Regulation 411.4.5"
 * Layered: 2366-03 Unit 304 / AC 5.3; 5393-03 Unit 104 / AC 5.3
 *
 * The bridge between design-stage Zs (calculated, with Cmin and temperature
 * factors applied) and verification-stage Zs (measured at ambient with the
 * cable cold). The 0.8 acceptance rule, Reg 411.4.5, BS 7671 A4:2026 Table
 * 41.3 figures with the new Cmin treatment, and how to handle a borderline
 * measured value.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import OhmsCalculator from '@/components/apprentice-courses/OhmsCalculator';
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
  VideoCard,
} from '@/components/study-centre/learning';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Max Zs vs measured Zs — the 80% rule (5.3) | Level 3 Module 6.5.3 | Elec-Mate';
const DESCRIPTION =
  'The bridge between design Zs and measured Zs. BS 7671 A4:2026 Table 41.3 maxima with Cmin = 0.95, the 0.8 acceptance criterion at verification, Regulation 411.4.5, and how to handle a borderline measured value at handover.';

const checks = [
  {
    id: 'b32-max-zs',
    question:
      'Per BS 7671 A4:2026 Table 41.3, what is the maximum permitted Zs for a Type B 32 A MCB on a 230 V single-phase supply?',
    options: [
      '1.37 Ω — the figure most apprentices have memorised.',
      '1.37 Ω — A4:2026 tightened the figure to reflect the formal Cmin = 0.95 voltage factor in the underlying calculation.',
      '0.86 Ω — the 80 percent verification figure.',
      '7.28 Ω — the B6 figure.',
    ],
    correctIndex: 1,
    explanation:
      'BS 7671 A4:2026 Table 41.3 gives 1.37 Ω for B32 at 230 V. The pre-A4 figure of 1.44 Ω is now obsolete — the underlying calculation now formally applies Cmin = 0.95 to U0, which tightens the maximum permitted Zs by about 5 percent. Many study materials, OSG editions and apprentice memory still carry the 1.44 figure; it is wrong for design and verification work under the current standard. Always read the live Table 41.3.',
  },
  {
    id: 'eighty-percent',
    question:
      'A B32 final circuit on a 230 V single-phase TN-C-S supply has Table 41.3 max Zs of 1.37 Ω. What is the maximum measured Zs that should be accepted at verification, applying the 0.8 acceptance criterion?',
    options: [
      '1.37 Ω — the same as the table maximum.',
      '0.8 × 1.37 = 1.096 Ω, often rounded to ~1.10 Ω. The acceptance criterion is "measured Zs ≤ 0.8 × Table 41.3 max" because the measurement is at ambient temperature (cable cold) but the table value was calculated at conductor operating temperature (cable hot at ~70 °C).',
      '1.37 / 0.95 ≈ 1.44 Ω — the pre-A4 figure.',
      '1.0 Ω — the rounded design target.',
    ],
    correctIndex: 1,
    explanation:
      'The 0.8 acceptance criterion (sometimes called "the 80 percent rule") accounts for the fact that R1 + R2 is measured at ambient temperature when the cable is cold, but Table 41.3 maxima were calculated assuming the conductor is at its operating temperature (~70 °C for thermoplastic). The temperature factor between cold and hot is ~1.20, so the cold measurement should be at most ~1/1.20 ≈ 0.83 of the hot figure — rounded conservatively to 0.80. Measured ≤ 0.8 × Table 41.3 max gives a comfortable margin that the hot Zs in service will still be inside the table figure.',
  },
  {
    id: 'borderline',
    question:
      'A B32 circuit measures Zs = 1.30 Ω at handover on a TN-C-S 230 V supply. Table 41.3 max = 1.37 Ω. The 0.8 acceptance figure = 1.10 Ω. The measurement (1.30) is below the table max but above the 0.8 figure. What is the correct response?',
    options: [
      'Accept — measured is below table max, so it passes.',
      'Reject — measured exceeds 0.8 × table max, which means the hot Zs in service will probably exceed Table 41.3 max. Investigate: confirm the device, recalculate the design Zs, and either upsize the cable or accept the device must be downrated.',
      'Wait until the cable warms up and re-measure.',
      'Apply Cmin to the measured value and re-check.',
    ],
    correctIndex: 1,
    explanation:
      'A measured Zs that is below the table max but above the 0.8 figure means the cable, when at its operating temperature, will probably exceed the table max — so the device will not clear the fault inside the maximum disconnection time at the worst case. Reject and investigate. Options: confirm the cable is the size you designed (deviation?); confirm the device is what you designed (substitution?); recompute the design Zs; either upsize the cable to bring R1 + R2 down, or accept that the protective device must be a smaller rating with a larger Table 41.3 max. Never accept a measured Zs that fails the 0.8 acceptance — that is exactly the case Reg 411.4.5 acceptance criterion exists to catch.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What does the maximum permitted Zs in BS 7671 Table 41.3 represent physically?',
    options: [
      'The cable’s rated impedance.',
      'The earth fault loop impedance at which the chosen protective device will just clear the fault within the maximum disconnection time required by Reg 411.3.2 (Table 41.1) — calculated with the Cmin factor applied to U0 to give the worst-case fault current.',
      'The DNO supply impedance.',
      'The measured Zs at verification.',
    ],
    correctAnswer: 1,
    explanation:
      'Table 41.3 figures are derived from each protective device’s time/current characteristic. For each device type and rating, the table value is the highest Zs that still produces enough fault current to operate the device within the Table 41.1 disconnection time. The calculation is done at the conductor operating temperature with Cmin = 0.95 applied to U0. If your design Zs is at or below Table 41.3, ADS will work; if above, ADS will not.',
  },
  {
    id: 2,
    question:
      'What is the design-stage formula for Zs?',
    options: [
      'Zs = U0 / If.',
      'Zs = Ze + (R1 + R2 × temperature multiplier), where Ze is the declared external earth fault loop impedance, R1 is the line conductor resistance, R2 is the CPC resistance, and the multiplier (typically 1.20 for 70 °C thermoplastic) brings the cold cable resistance up to operating temperature.',
      'Zs = R1 only.',
      'Zs = R2 only.',
    ],
    correctAnswer: 1,
    explanation:
      'Design-stage Zs = Ze + (R1 + R2 at operating temperature). Ze is taken from the DNO declaration (or measured if unknown) — typically 0.35 Ω for TN-C-S, 0.8 Ω for TN-S, 200+ Ω for TT. R1 + R2 is calculated from the chosen cable’s mΩ/m figure (cold) multiplied by the temperature factor (1.20 for 70 °C thermoplastic, 1.28 for 90 °C thermosetting). The result is compared to Table 41.3 — if Zs(design) ≤ Table 41.3, the device clears within the maximum disconnection time at worst case.',
  },
  {
    id: 3,
    question:
      'Why is the measured Zs at verification typically lower than the design-stage Zs?',
    options: [
      'Because the test instrument is inaccurate.',
      'Because the measurement is taken at ambient temperature with the cable cold (R1 + R2 at ambient ~20 °C), but the design Zs was calculated assuming the conductor is at its operating temperature (~70 °C for thermoplastic). The cold measurement is roughly 1/1.20 ≈ 0.83 of the hot figure.',
      'Because the supply Ze changes between design and install.',
      'Because Cmin is applied at measurement.',
    ],
    correctAnswer: 1,
    explanation:
      'R1 + R2 increases with temperature. A cable that has been carrying its design current Ib for an hour or so will be at its operating temperature; a cable being measured at handover has been carrying nothing and is at ambient. The cold R1 + R2 is roughly 0.83 of the hot R1 + R2. Hence the cold measurement should land at roughly 0.83 of your design figure, and the 0.8 acceptance criterion gives a small additional margin for measurement uncertainty and ambient variation.',
  },
  {
    id: 4,
    question:
      'BS 7671 A4:2026 made what specific numerical change to the Table 41.3 figures compared to pre-A4 editions?',
    options: [
      'No change.',
      'A4:2026 formally applied the Cmin = 0.95 voltage factor to the calculation of maximum Zs, tightening the published figures by ~5 percent. So B32 went from 1.44 Ω (pre-A4) to 1.37 Ω (A4:2026).',
      'A4:2026 doubled all the figures.',
      'A4:2026 removed Table 41.3 entirely.',
    ],
    correctAnswer: 1,
    explanation:
      'A4:2026 formalised the Cmin treatment that had been informal in earlier editions. The voltage factor Cmin = 0.95 is now formally applied to U0 in the calculation that produces Table 41.3, which tightens every figure by ~5 percent. B32 dropped from 1.44 Ω to 1.37 Ω. B16 dropped from 2.87 Ω to roughly 2.73 Ω. C-curve and D-curve figures shifted similarly. Always work from the current Table 41.3 — older study material with the pre-A4 figures is unsafe.',
  },
  {
    id: 5,
    question:
      'A B16 final circuit on TN-C-S has design Zs = 2.55 Ω. Table 41.3 (A4:2026) max for B16 ≈ 2.73 Ω. Is the design compliant for ADS?',
    options: [
      'No — close to the limit.',
      'Yes — design Zs ≤ Table 41.3 max, ADS will clear in time. The design should still target lower Zs (under 0.8 × 2.73 = 2.18 Ω) to leave headroom for measurement uncertainty and operating-temperature confidence at handover.',
      'No — must be under 1.0 Ω.',
      'Cannot tell without Cmin.',
    ],
    correctAnswer: 1,
    explanation:
      'Design Zs of 2.55 Ω is below the 2.73 Ω Table 41.3 max — the design is technically compliant for ADS. But it leaves no headroom: the measured Zs at verification (cold) will be roughly 0.83 of the hot design figure, so ~2.12 Ω, which is right on the 0.8 × 2.73 = 2.18 Ω acceptance threshold. The design should target lower Zs to leave handover-margin. Better practice: design to ≤ 0.8 × Table 41.3 max, and the verification at handover almost always passes without drama.',
  },
  {
    id: 6,
    question:
      'What does Reg 411.4.5 require?',
    options: [
      'It only applies to IT systems.',
      'It contains the design and verification acceptance criterion for ADS in TN systems — broadly, that the protective device must operate within the required disconnection time and that this must be demonstrated by calculation at the design stage and confirmed by measurement at verification.',
      'It requires installation of an RCD on every circuit.',
      'It is unrelated to ADS.',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 411.4.5 in BS 7671 A4:2026 was redrafted from earlier editions. It contains the acceptance criterion for ADS in TN systems and is the regulatory hook for both the design Zs ≤ Table 41.3 calculation and the measurement / 0.8 acceptance at verification. Practical effect: design with calculated Zs at operating temperature; verify with measured Zs at ambient temperature; the verification acceptance is "measured ≤ 0.8 × table max" so that the hot Zs in service will still be inside the table.',
  },
  {
    id: 7,
    question:
      'On a verification, you measure Zs = 0.95 Ω on a B32 TN-C-S circuit. Table 41.3 (A4:2026) max = 1.37 Ω; 0.8 × 1.37 = 1.10 Ω. What is the right call?',
    options: [
      'Reject — too high.',
      'Accept — 0.95 Ω is below both the table max (1.37) and the 0.8 acceptance figure (1.10). The hot Zs in service will be ~0.95 × 1.20 = 1.14 Ω, comfortably below 1.37. Document the result on the schedule of test results and sign off.',
      'Wait for the cable to warm up.',
      'Apply Cmin to the measurement.',
    ],
    correctAnswer: 1,
    explanation:
      '0.95 Ω measured cold predicts ~1.14 Ω hot in service, comfortably below the 1.37 Ω Table 41.3 max. Accept and document. The schedule of test results records the measured Zs, the table max, the device, and the pass result. Cmin is applied to U0 in the design calc and in the table, not to the measurement — the measurement is what it is, and the comparison is "measured ≤ 0.8 × table max".',
  },
  {
    id: 8,
    question:
      'You are inspecting a 5-year-old install. Measured Zs on a B32 circuit comes back at 1.20 Ω. Table 41.3 (A4:2026) max = 1.37 Ω; 0.8 × 1.37 = 1.10 Ω. The reading is below the table max but above the 0.8 figure. What code applies on the EICR?',
    options: [
      'C1 — danger present.',
      'C2 — potentially dangerous; the hot Zs in service will probably exceed the Table 41.3 max, meaning ADS may not clear in time at the worst case.',
      'C3 — improvement recommended.',
      'No code — passes table max.',
    ],
    correctAnswer: 1,
    explanation:
      'A measured Zs above the 0.8 acceptance figure but below the table max should be coded C2 on an EICR. The reasoning: the measurement is cold; the cable in service will be hot; the hot Zs will probably exceed the Table 41.3 max; ADS may not clear in time at worst case. C2 (potentially dangerous) is the correct code because the install will be unsafe under fault conditions even though it is currently functional. C1 is reserved for "danger present" (immediate hazard, e.g. accessible live parts); C3 is reserved for non-compliance with no immediate safety implication. The remediation is the same as on a new install — investigate, upsize cable if needed, and re-test.',
  },
];

const faqs = [
  {
    question: 'Where does the 0.8 figure come from — why not 0.83?',
    answer:
      'The temperature multiplier from cold to hot for 70 °C thermoplastic is 1.20, so the cold/hot ratio is 1/1.20 = 0.833. The 0.8 figure is a rounded conservative version that adds a small extra margin for measurement uncertainty (test instrument tolerance is typically ±10 percent), ambient temperature variation (a cable measured on a cold morning is colder than the same cable measured on a warm afternoon), and supply-voltage variation (the Ze component can shift slightly between measurement and worst-case fault). 0.8 is a clean teachable round number that bakes all of those margins in. Some specialist software uses 0.833 for a more precise margin.',
  },
  {
    question: 'Does the 0.8 rule apply to TT systems too?',
    answer:
      'It applies in principle (the cold/hot ratio is the same physics) but on a TT system the measured Zs is dominated by the soil resistance of the earth electrodes, which barely changes with cable temperature. The cable contribution to TT Zs is tiny. So the 0.8 rule is technically correct but practically irrelevant for TT verification — the binding check on TT is RA × IΔn ≤ 50 V, which is the Reg 411.5.3 acceptance criterion for RCD-based ADS. See Sub 5.4 for the TT system in full.',
  },
  {
    question: 'How does Cmin = 0.95 actually flow through the calculation?',
    answer:
      'Cmin is applied to U0 in the formula that determines the maximum Zs at which a device will clear the fault in time. The fault current that causes the device to operate is If = U0 × Cmin / Zs. Setting If = Ia (the device’s operating current at the required disconnection time), solving for Zs gives Zs(max) = U0 × Cmin / Ia. With Cmin = 0.95 instead of 1.00, the maximum Zs is 0.95 of what it would have been without Cmin — hence the ~5 percent tightening between pre-A4 and A4:2026 Table 41.3 figures. The Cmin treatment is consistent across all the A4:2026 fault-related calculations.',
  },
  {
    question: 'What if the measured Zs comes out lower than expected — say much lower than the design predicted?',
    answer:
      'A measured Zs significantly lower than the design figure usually means one of three things: (1) the actual Ze is lower than the DNO declared value (the DNO declares a worst-case Ze; the actual is often half or less), (2) the cable run was shorter than the design assumed (rerouted to take a more direct path during install), or (3) the cable is a larger CSA than the design specified (installer "upsized to be safe"). A lower measured Zs is good — comfortable headroom for ADS — but it may indicate a deviation from the design that should be reflected in the as-installed documentation. Update the cable schedule to show the as-installed cable, not the as-designed.',
  },
  {
    question: 'Can I rely on a Zs measurement taken with the test instrument’s "no-trip" function?',
    answer:
      'Yes, with care. Modern Zs test instruments use a high-frequency or low-current method to inject test current that does not trip RCDs upstream — essential on RCBO-protected circuits where a "loop" test would otherwise trip the device. The "no-trip" measurement is reliable for the Zs comparison against Table 41.3, but the test current is much smaller than a real fault current, so the figure is technically an estimate of the loop impedance rather than a direct measurement of fault behaviour. For high-fault-current installations (PSCC over 16 kA), use a separate "max load" measurement on a representative point (e.g. the consumer unit terminals) to verify the assumption holds.',
  },
  {
    question: 'How does this all change for a high-current device like a 100 A BS 88 fuse?',
    answer:
      'The principle is the same; the figures are different. Table 41.3 publishes maxima for HBC fuses (BS 88-3 and BS 88-2) as well as MCBs and RCBOs. The 0.8 acceptance criterion still applies. Fuses behave differently to MCBs at the high-fault end — they have a continuous time/current curve with no sharp magnetic threshold, so the maximum Zs is calculated at the fuse’s operating current for the required disconnection time. For a 100 A BS 88-3 with 0.4 s required, that is roughly Ia = 580 A, giving Zs(max) = 230 × 0.95 / 580 = 0.377 Ω. The 0.8 acceptance figure is then 0.30 Ω. Meter tails and sub-mains supplied by 100 A or 125 A fuses typically need to be on the heavier end of the cable range to keep within these tight Zs maxima.',
  },
];

export default function Sub3() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module6-section5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 5
          </button>

          <PageHero
            eyebrow="Module 6 · Section 5 · Subsection 3"
            title="Maximum Zs vs measured Zs — the 80% acceptance rule"
            description="The bridge between design-stage Zs (calculated with Cmin and temperature factors) and verification-stage Zs (measured at ambient with the cable cold). BS 7671 A4:2026 Table 41.3 maxima with the new Cmin treatment, the 0.8 acceptance criterion, Reg 411.4.5, and how to handle borderline measurements."
            tone="indigo"
          />

          <TLDR
            points={[
              'BS 7671 Table 41.3 publishes the maximum permitted Zs for each protective device type and rating. A4:2026 tightened these figures by formally applying Cmin = 0.95 to U0 in the underlying calculation — so B32 = 1.37 Ω now (it was 1.44 Ω pre-A4). The pre-A4 figure is obsolete for design and verification under the current standard.',
              'Design-stage Zs is calculated at the conductor operating temperature (R1 + R2 cold × ~1.20 for 70 °C thermoplastic) and compared directly to Table 41.3. Verification-stage Zs is measured at ambient with the cable cold, and compared to 0.8 × Table 41.3 to allow for the temperature difference plus measurement uncertainty.',
              'Reg 411.4.5 in BS 7671 A4:2026 (redrafted in this amendment) carries the acceptance criterion for ADS in TN systems. The 0.8 rule is the practical implementation: measured Zs ≤ 0.8 × Table 41.3 max means the hot Zs in service will still be inside the table figure and ADS will work at worst case.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State the BS 7671 A4:2026 Table 41.3 maximum Zs figures for B-curve, C-curve and HBC fuse devices and recognise that the figures differ from pre-A4 editions due to the Cmin = 0.95 treatment.',
              'Calculate design-stage Zs from declared Ze plus R1 + R2 at the conductor operating temperature using the appropriate temperature multiplier (1.20 for 70 °C thermoplastic, 1.28 for 90 °C thermosetting).',
              'Compare design Zs to Table 41.3 and confirm ADS compliance for the chosen protective device.',
              'Measure Zs at verification with a no-trip Zs test instrument and apply the 0.8 acceptance criterion (measured ≤ 0.8 × Table 41.3 max).',
              'Identify and correctly handle a borderline measured Zs — below table max but above 0.8 acceptance figure — by investigating, recalculating, and re-testing.',
              'Apply BS 7671 A4:2026 Reg 411.4.5 as the regulatory hook for both design-stage calculation and verification-stage measurement of Zs in TN systems.',
              'EICR coding: assign C2 (potentially dangerous) to a measured Zs above the 0.8 acceptance figure but below the table max on an existing installation.',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock
            title="Two different questions — design Zs vs measured Zs"
            plainEnglish="Design-stage Zs is a calculation based on declared figures and worst-case assumptions. Measured Zs is the real-world reading at handover. The two figures should never be the same — and the difference between them tells you whether the design was honest."
            onSite="If your measured Zs is much lower than your design Zs, the design was conservative (which is fine — the install has headroom). If they are close, the design was tight. If the measured exceeds the design, something is wrong — wrong cable, wrong device, deviation that has not been documented, or a calculation error."
          >
            <p>
              At the design stage, Zs is a calculation. The formula is straightforward:
            </p>
            <p>
              <strong>Zs(design) = Ze + (R1 + R2) × temperature multiplier</strong>
            </p>
            <p>
              Ze is taken from the DNO declaration (or measured at the supply intake if unknown).
              For TN-C-S, declared Ze is typically 0.35 Ω; for TN-S, typically 0.8 Ω; for TT,
              typically 200 Ω or higher. R1 + R2 is calculated from the chosen cable’s mΩ/m
              figure (cold) multiplied by the route length, then by a temperature multiplier
              (1.20 for 70 °C thermoplastic insulation; 1.28 for 90 °C thermosetting) to bring
              the cold resistance up to operating temperature.
            </p>
            <p>
              The result is compared directly to BS 7671 Table 41.3. If Zs(design) ≤ Table 41.3
              max for the chosen device, ADS will clear the fault inside the maximum disconnection
              time (Table 41.1) at worst case. If above, ADS will not — the design fails.
            </p>
            <p>
              At verification, Zs is a measurement. The test instrument (typically a multifunction
              tester with a no-trip Zs function) is plugged into the load end of the circuit; it
              injects a small test current and reads the loop impedance. The reading is at
              ambient temperature, with the cable cold — quite different from the operating-
              temperature condition the design assumed.
            </p>
          </ConceptBlock>

          <div className="my-4">
            <ContentEyebrow>Try the calculator</ContentEyebrow>
            <OhmsCalculator />
          </div>

          <VideoCard
            url={videos.zeTest.url}
            title={videos.zeTest.title}
            channel={videos.zeTest.channel}
            duration={videos.zeTest.duration}
            topic="Ze test on a single-phase supply — the 'declared' part of design Zs"
            caption={
              <>
                Craig Wiltshire walks the live Ze measurement at the intake — the same Ze that
                seeds Zs(design) = Ze + (R1 + R2) covered above. Watch how the value compares to
                the typical declared figures for TN-C-S / TN-S before you reach the 0.8 acceptance
                rule.
              </>
            }
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 411.4.5 (TN systems — protection by ADS, redrafted in A4:2026)"
            clause="Regulation 411.4.5 in the A4:2026 amendment was redrafted from earlier editions. It contains the acceptance criterion for automatic disconnection of supply in TN systems, requiring that the protective device disconnect the supply within the maximum disconnection time required by Regulation 411.3.2.2 (the times listed in Table 41.1) for the type of circuit and the system, and that this be demonstrated by calculation at the design stage using Zs(design) ≤ Table 41.3 max for the protective device, and confirmed by measurement at verification."
            meaning={
              <>
                Reg 411.4.5 is the regulatory hook for Zs design and verification in TN systems.
                Practical effect: at design, calculate Zs at conductor operating temperature with
                Cmin = 0.95 applied to U0, and verify Zs(design) ≤ Table 41.3 max. At
                verification, measure Zs at ambient temperature and apply the 0.8 acceptance
                criterion to allow for the cold-vs-hot difference. The reg was redrafted in
                A4:2026; users should consult the published A4:2026 wording for the exact text
                and any consequential changes flagged in the amendment.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 4, Chapter 41, Regulation 411.4.5 (redrafted in A4:2026)."
          />

          <SectionRule />

          <ContentEyebrow>BS 7671 A4:2026 Table 41.3 — the new figures</ContentEyebrow>

          <ConceptBlock
            title="Table 41.3 maxima — A4:2026 tightening due to Cmin = 0.95"
            plainEnglish="A4:2026 formally applied the Cmin voltage factor of 0.95 to the calculation that produces Table 41.3. This tightened every figure by ~5 percent. The pre-A4 numbers (1.44 Ω for B32 etc) are now obsolete. Always work from the live A4:2026 Table 41.3."
            onSite="Many older textbooks, OSG editions and apprentice memory still carry the pre-A4 figures. They are wrong for design and verification under the current standard. Print the A4:2026 Table 41.3 and stick it inside the front cover of your van clipboard."
          >
            <p>
              Indicative maximum Zs values from BS 7671 A4:2026 Table 41.3 for B-curve MCBs at
              U0 = 230 V, 0.4 s disconnection time (verify against your edition before signing
              calculations):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>B6:</strong> ≈ 7.28 Ω (was 7.66 pre-A4)</li>
              <li><strong>B10:</strong> ≈ 4.37 Ω (was 4.60 pre-A4)</li>
              <li><strong>B16:</strong> ≈ 2.73 Ω (was 2.87 pre-A4)</li>
              <li><strong>B20:</strong> ≈ 2.19 Ω (was 2.30 pre-A4)</li>
              <li><strong>B25:</strong> ≈ 1.75 Ω (was 1.84 pre-A4)</li>
              <li><strong>B32:</strong> = 1.37 Ω (was 1.44 pre-A4) — the most-quoted figure on a typical domestic radial.</li>
              <li><strong>B40:</strong> ≈ 1.09 Ω (was 1.15 pre-A4)</li>
              <li><strong>B50:</strong> ≈ 0.87 Ω (was 0.92 pre-A4) — typical for shower circuits.</li>
              <li><strong>B63:</strong> ≈ 0.69 Ω (was 0.73 pre-A4)</li>
            </ul>
            <p>
              For C-curve MCBs the figures are roughly half of the B-curve figures (the C-curve
              magnetic instantaneous range is 5–10 × In, double the B-curve, so the device needs
              double the fault current to operate instantaneously, hence half the maximum Zs).
              For D-curve, divide again. For HBC fuses the figures are derived from the fuse
              curve at the required disconnection time.
            </p>
            <p>
              The historical 1.44 Ω figure for B32 is what most apprentices remember from
              training material printed before A4:2026. It is wrong for current design and
              verification. The 1.37 Ω A4:2026 figure is what you must use.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 411.3.1.1 (Protective earthing)"
            clause="Exposed-conductive-parts shall be connected to a protective conductor under the specific conditions for each type of system earthing as specified in Regulations 411.4 to 411.6. Simultaneously accessible exposed-conductive-parts shall be connected to the same earthing system individually, in groups or collectively. Conductors for protective earthing shall comply with Chapter 54. A circuit protective conductor shall be run to and terminated at each point in wiring and at each accessory except a lampholder having no exposed-conductive-parts and suspended from such a point."
            meaning={
              <>
                Reg 411.3.1.1 is the underlying duty that a Zs verification proves at handover.
                Every exposed-conductive-part connects to a CPC; the CPC is sized under
                Chapter 54; the device on the circuit must clear within the Table 41.1 time at
                the actual fault current. A measured Zs at or below the 0.8 × Table 41.3 max
                value is the proof that the device will operate inside that time when the cable
                is hot in service. Without that proof, 411.3.1.1 is unverified.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 4, Chapter 41, Regulation 411.3.1.1."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The 0.8 acceptance criterion</ContentEyebrow>

          <ConceptBlock
            title="Why measured ≤ 0.8 × Table 41.3 max"
            plainEnglish="The cold cable measurement at handover is roughly 0.83 of what the same cable would read when hot in service. The 0.8 acceptance criterion rounds that conservatively to 0.8 and adds a small margin for measurement uncertainty. If the measurement is at most 0.8 of the table max, the hot reading will still be inside the table."
          >
            <p>
              The temperature coefficient of resistance for copper is approximately 0.004 per °C.
              From 20 °C (typical ambient at measurement) to 70 °C (typical operating temperature
              for thermoplastic insulation), the resistance ratio is:
            </p>
            <p>
              R(70°C) / R(20°C) = 1 + 0.004 × (70 − 20) = 1 + 0.20 = 1.20
            </p>
            <p>
              So the hot R1 + R2 is 1.20 times the cold R1 + R2. The cold/hot ratio is 1/1.20 =
              0.833. A measured (cold) Zs at 0.833 of the Table 41.3 max should result in a hot
              Zs in service that is right at the table max — borderline acceptable.
            </p>
            <p>
              The 0.8 acceptance criterion rounds 0.833 down to 0.8 and adds a small margin for:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Measurement uncertainty</strong> — typical Zs test instruments are accurate
                to ±10 percent at 95 percent confidence, sometimes worse on low impedance ranges.
                A reading of 1.10 Ω could really be 1.21 Ω.
              </li>
              <li>
                <strong>Ambient temperature variation</strong> — a cable measured on a cold January
                morning is colder than ~20 °C, so the cold ratio is even more favourable; a cable
                measured on a hot August afternoon is warmer than 20 °C and the ratio is less
                favourable.
              </li>
              <li>
                <strong>Supply variation</strong> — Ze can shift slightly between measurement and
                worst-case fault depending on the DNO supply condition.
              </li>
              <li>
                <strong>Future degradation</strong> — connection contact resistance and cable
                ageing may slightly increase R1 + R2 over the install life.
              </li>
            </ul>
            <p>
              Together these justify the 0.83 → 0.8 rounding and the use of 0.8 as the practical
              acceptance figure on every measurement.
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

          <ContentEyebrow>Worked example — design Zs through to verification</ContentEyebrow>

          <ConceptBlock
            title="Full worked example — 32 A radial, B32 RCBO, TN-C-S 230 V"
            plainEnglish="A complete walk from declared Ze through the design Zs calculation, comparison to Table 41.3, the predicted measured Zs at handover, and the 0.8 acceptance check. End-to-end in numbers."
          >
            <p>
              <strong>The circuit:</strong> 25 m radial socket circuit on 4 mm² T&E (line 4 mm²,
              CPC 1.5 mm²), feeding kitchen sockets. Protective device: B32 RCBO. Supply: TN-C-S,
              declared Ze = 0.35 Ω, U0 = 230 V. Insulation: 70 °C thermoplastic (PVC).
            </p>
            <p>
              <strong>Step 1 — Design-stage R1 + R2 cold.</strong> From OSG / cable manufacturer
              tables, R1 + R2 cold for 4 mm² line / 1.5 mm² CPC ≈ 17.07 mΩ/m. Over 25 m: 0.01707
              × 25 = 0.427 Ω.
            </p>
            <p>
              <strong>Step 2 — Apply temperature multiplier.</strong> 70 °C thermoplastic factor =
              1.20. R1 + R2 hot = 0.427 × 1.20 = 0.512 Ω.
            </p>
            <p>
              <strong>Step 3 — Add Ze.</strong> Zs(design at operating temperature) = 0.35 + 0.512
              = 0.862 Ω.
            </p>
            <p>
              <strong>Step 4 — Compare to Table 41.3.</strong> A4:2026 max Zs for B32 at 230 V =
              1.37 Ω. 0.862 ≤ 1.37 — pass. ADS will clear the fault within 0.4 s at worst case.
            </p>
            <p>
              <strong>Step 5 — Predict measured Zs.</strong> Measured (cold) Zs ≈ Zs(design) /
              1.20 = 0.862 / 1.20 = 0.718 Ω. This is what you should expect to see on the test
              instrument at handover, give or take a few percent for instrument tolerance.
            </p>
            <p>
              <strong>Step 6 — Compare predicted measurement to 0.8 acceptance.</strong> 0.8 ×
              1.37 = 1.096 Ω. Predicted measurement of 0.718 Ω is comfortably below 1.096 — the
              circuit will pass verification with comfortable margin.
            </p>
            <p>
              <strong>Step 7 — At handover, take the measurement.</strong> Suppose the actual
              measured Zs comes back as 0.74 Ω. This is close to the 0.718 prediction (small
              variation from real Ze vs declared, real cable resistance vs nominal, instrument
              tolerance). 0.74 ≤ 1.10 — pass. Document on the schedule of test results.
            </p>
            <p>
              The whole sequence is one continuous story: the design predicts the measurement,
              the measurement confirms the design. When the two diverge significantly,
              investigate.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Borderline measurements and EICR coding</ContentEyebrow>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 132.2(a) (Document nature of current — design documentation linked to Reg 132.13)"
            clause="The documentation referred to in Regulation 132.13 shall include the nature of current: AC and/or DC. Designers shall state whether the supply provides alternating current, direct current, or both as part of the supply-characteristics documentation. When the initial verification is made, the documentation concerning the selection of devices for coordination shall be added to the design documentation in accordance with the requirements of Regulation 132.13."
            meaning={
              <>
                A4:2026 renumbered the design-documentation duty from the old 132.12 to 132.13,
                and Reg 132.2(a) is one of the supply-characteristics items that has to land on
                that documentation. Both the design-stage Zs trace (Sub 5.2) and the verification
                measurement compared against the 0.8 acceptance criterion (this Sub) belong on
                the design / EIC pack. The selectivity / coordination evidence required by Reg
                536.5 also bolts onto this pack at initial verification. A Zs reading that lacks
                a documented design comparator is an EIC trace failure, not just a missed step.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 132.2(a) and Regulation 132.13 — verbatim from published facets."
          />

          <ConceptBlock
            title="Handling a borderline measured Zs — investigate, do not rationalise"
            plainEnglish="A measured Zs above the 0.8 figure but below the table max is a fail, not a pass. The hot Zs in service will probably exceed the table max. Investigate the cause and either upsize the cable or downrate the device — never just shrug and accept it."
          >
            <p>
              The investigation steps when a measured Zs lands in the borderline zone (above 0.8 ×
              table max but below table max):
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Confirm the device.</strong> Is the actual installed device the one you
                designed? An installer-substituted C-curve in place of a designed B-curve will
                shift the table max significantly (C32 max Zs is roughly half of B32 max Zs).
              </li>
              <li>
                <strong>Confirm the cable.</strong> Is the actual installed cable the size you
                designed? A 4 mm² installed where 6 mm² was designed will give a much higher
                R1 + R2 and a higher Zs.
              </li>
              <li>
                <strong>Confirm the route length.</strong> Is the cable run actually the length
                you designed? A re-routed cable can be 30 percent longer than the design path.
              </li>
              <li>
                <strong>Confirm Ze.</strong> Measure the Ze at the supply intake and compare to
                the declared figure. A Ze higher than declared (because the DNO supply has
                degraded) is a DNO problem, not a design problem.
              </li>
              <li>
                <strong>Recalculate the design.</strong> With the as-installed figures (real cable,
                real route, real device, real Ze) recompute Zs(design) and re-compare to Table
                41.3.
              </li>
            </ol>
            <p>
              The remedy depends on what the investigation shows. If the install matches the
              design and the design was right, the problem is probably an unexpectedly high real
              Ze — engage the DNO. If the install deviates from the design (substituted device,
              wrong cable, longer route) the install needs to be brought back to design. If the
              design was marginal, upsize the cable to bring R1 + R2 down or downrate the device
              to a smaller rating with a larger Table 41.3 max.
            </p>
          </ConceptBlock>

          <Scenario
            title="EICR on a 5-year-old install — borderline B32 reading"
            situation={
              <>
                You are doing a periodic inspection on a 5-year-old domestic install. The kitchen
                radial socket circuit measures Zs = 1.20 Ω on a B32 RCBO. The CU label says the
                circuit is 4 mm² T&E, 25 m route. Table 41.3 (A4:2026) max for B32 = 1.37 Ω; 0.8 ×
                1.37 = 1.10 Ω. Measured 1.20 Ω is below the table max but above the 0.8 figure.
              </>
            }
            whatToDo={
              <>
                Code the observation as C2 (potentially dangerous) on the EICR. The reasoning:
                the cold measured Zs of 1.20 Ω predicts a hot Zs in service of approximately
                1.20 × 1.20 = 1.37 Ω, which exceeds the 1.37 Ω table max. ADS may not clear
                within 0.4 s at worst case under fault conditions when the cable is hot. Document
                the observation, recommend remediation (investigate the cable run for unexpected
                length, check Ze at intake, and either upsize the cable or move the device down to
                a B25 or B20 with a larger table max), and flag the C2 to the customer with the
                requirement to remediate within an agreed period.
              </>
            }
            whyItMatters={
              <>
                The 0.8 acceptance criterion is not a "nice to have" — it is the safety margin
                that ensures the install remains compliant under the operating conditions, not
                just at the cold ambient when the test instrument was plugged in. Coding a
                borderline reading as C3 ("improvement recommended") instead of C2 because the
                table max is technically not exceeded is a misreading of the regulation and
                leaves the customer with an unsafe install carrying a clean certificate. The
                whole point of the 0.8 rule is to catch exactly this case.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Things that catch people out</ContentEyebrow>

          <CommonMistake
            title="Quoting the pre-A4 1.44 Ω figure for B32 max Zs"
            whatHappens={
              <>
                The apprentice memorised 1.44 Ω from older training material, OSG editions or
                online "BS 7671 cheat sheets" that have not been updated for A4:2026. They use
                1.44 Ω in design calculations and at verification. A circuit measuring 1.40 Ω
                gets accepted because "it’s under 1.44". The hot Zs in service will be
                approximately 1.68 Ω, comfortably exceeding the actual A4:2026 max of 1.37 Ω.
                ADS may not clear in time under fault conditions.
              </>
            }
            doInstead={
              <>
                Always work from the current BS 7671 A4:2026 Table 41.3, not from memory or
                pre-A4 reference material. The A4:2026 figures are tighter by ~5 percent across
                the board because the Cmin = 0.95 voltage factor is now formally applied to U0
                in the underlying calculation. Print the current Table 41.3 and pin it to the
                inside cover of your van clipboard. If you see 1.44 Ω quoted anywhere, that
                source is out of date.
              </>
            }
          />

          <CommonMistake
            title={`Accepting a measured Zs because it is "below the table max" without applying 0.8`}
            whatHappens={
              <>
                The apprentice measures Zs = 1.30 Ω on a B32 circuit, sees 1.30 ≤ 1.37 (table
                max), and accepts. They sign the schedule of test results and the EIC. The hot
                Zs in service will be approximately 1.30 × 1.20 = 1.56 Ω, comfortably exceeding
                the table max. ADS may not clear within 0.4 s at worst case. The install is
                certified as compliant when it is not.
              </>
            }
            doInstead={
              <>
                Always apply the 0.8 acceptance criterion. Measured Zs ≤ 0.8 × Table 41.3 max.
                For B32 that is 0.8 × 1.37 = 1.10 Ω. A reading above 1.10 Ω fails verification
                and must be investigated. The 0.8 rule is the practical implementation of Reg
                411.4.5 acceptance — bypassing it is the same as bypassing the regulation.
              </>
            }
          />

          <ConceptBlock
            title="Prospective fault current — measured at the same time as Ze"
            plainEnglish="Most multifunction loop testers display Prospective Fault Current (PFC) at the same time as Ze. PFC is the maximum fault current the supply could deliver into a bolted line-to-earth fault — and it is the headline number used to verify that protective devices have adequate breaking capacity. A B32 with 6 kA breaking capacity on a supply with PFC of 4.5 kA is fine; on a supply with PFC of 7 kA the device is undersized and would weld closed on a short."
            onSite="Read PFC at the supply origin in the same test pass as Ze. Domestic supplies typically read 1-3 kA; close-to-substation properties or three-phase commercial can read 6-10 kA or higher. Compare against the Icn / Ics rating on every protective device on the schedule. Devices below the PFC need replacing or the supply needs upstream limiting (HRC fuse, current limiter). Record on the EIC origin section — Ze, PFC, and the schedule of protective device ratings tells the story."
          >
            <p>
              PFC reading interpretation:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Domestic typical</strong> — 1-3 kA. Standard 6 kA RCBOs and
                MCBs are well within rating.
              </li>
              <li>
                <strong>Sub-station-adjacent or large commercial</strong> — 6-10 kA
                or higher. Verify every device's Icn / Ics rating against the
                measured PFC.
              </li>
              <li>
                <strong>Three-phase services</strong> — read PFC line-to-earth and
                line-to-line; the line-to-line value drives the upstream device
                rating on a phase-to-phase fault.
              </li>
              <li>
                <strong>Margin and degradation</strong> — supplies tighten over time
                as the network is reinforced; design with margin so the install
                still complies if PFC rises 20-30 percent over the next decade.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Hot vs cold Zs correction — the temperature multiplier in detail"
            plainEnglish="Cable resistance rises with temperature. A copper conductor at 70 degrees C (the design operating temperature for a thermoplastic cable at full load) has roughly 1.20 times the resistance it had at 20 degrees C ambient. The Zs you measure cold is therefore lower than the Zs the circuit will see at design load. The 1.20 multiplier (or 1.28 for thermosetting cables rated at 90 degrees C) corrects from cold-measured to hot-design Zs and feeds into the 0.8 acceptance criterion."
            onSite="The 0.8 rule already absorbs the hot-vs-cold correction implicitly. If you want to verify a borderline reading explicitly, multiply the measured Zs by the temperature multiplier and compare against the Table 41.3 max — the result should still pass. Worked: B32 measured Zs 1.10 ohms; corrected hot Zs 1.10 × 1.20 = 1.32 ohms; Table 41.3 max 1.37 ohms; passes with 0.05 ohm margin (around 4 percent). Anything tighter than that warrants investigation, not acceptance."
          >
            <p>
              Temperature multipliers by cable type:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Thermoplastic (PVC) — 70 degrees C operating</strong> —
                multiplier 1.20.
              </li>
              <li>
                <strong>Thermosetting (XLPE) — 90 degrees C operating</strong> —
                multiplier 1.28.
              </li>
              <li>
                <strong>MICC (mineral-insulated copper-clad) — 105 degrees C</strong>
                — multiplier 1.34 (specialist application).
              </li>
              <li>
                <strong>Why the multiplier matters</strong> — a circuit measured
                stone-cold in February reads 0.8 ohms; that same circuit at design
                load in August reads 0.96 ohms. Acceptance must reference the
                hot-design value, not the cold-measured value.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Zs on three-phase — line-to-earth and the per-phase comparison"
            plainEnglish="Three-phase circuits have three line conductors and one CPC. Zs is measured line-to-earth at the furthest point, once per line — Zs(L1-PE), Zs(L2-PE), Zs(L3-PE). The three readings should match within roughly 5-10 percent on a balanced supply; a significantly different reading on one line suggests an imbalance, a high-resistance termination on that line, or a damaged conductor. Each reading is compared against the same Table 41.3 maximum because the protective device acts on whichever line the fault is on."
            onSite="Use a multifunction tester at every three-phase outlet, every distribution board, every motor terminal box. Three readings, three columns on the EIC schedule. The highest of the three is the binding figure — that is the loop the device has to clear on a worst-case fault. Imbalance above 10 percent flags an investigation: tighten terminations, check the supply transformer balance, look for a single-phase short to earth that has been masked. Record all three readings, not just the worst-case."
          >
            <p>
              Three-phase Zs readings — what to look for:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Three readings per test point</strong> — Zs(L1-PE),
                Zs(L2-PE), Zs(L3-PE). Per-line columns on the EIC schedule.
              </li>
              <li>
                <strong>Imbalance under 10 percent</strong> — typical balanced
                supply; nothing to investigate.
              </li>
              <li>
                <strong>Imbalance 10-20 percent</strong> — investigate
                terminations, transformer tap, single-phase loading on the
                offending line.
              </li>
              <li>
                <strong>Imbalance above 20 percent</strong> — significant defect;
                possibly a damaged conductor, a high-resistance neutral or a
                line-to-earth partial fault.
              </li>
              <li>
                <strong>Compare against the same Table 41.3 max</strong> — the
                highest of the three readings is the binding figure for the
                circuit's protective device.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'BS 7671 A4:2026 Table 41.3 max Zs for B32 at 230 V = 1.37 Ω. The pre-A4 figure of 1.44 Ω is now obsolete. The change is due to the formal application of Cmin = 0.95 to U0 in the underlying calculation.',
              'Design-stage Zs = Ze + (R1 + R2 cold × temperature multiplier). For 70 °C thermoplastic the multiplier is 1.20; for 90 °C thermosetting it is 1.28. Zs(design) ≤ Table 41.3 max means ADS will work at worst case.',
              'Verification-stage Zs is measured at ambient temperature with the cable cold. The cold measurement is roughly 0.83 of the equivalent hot value. Acceptance criterion: measured ≤ 0.8 × Table 41.3 max.',
              'The 0.8 figure rounds 0.833 down conservatively and adds margin for measurement uncertainty (~±10 percent), ambient variation, supply variation and future degradation.',
              'Reg 411.4.5 in BS 7671 A4:2026 was redrafted from earlier editions and contains the ADS acceptance criterion in TN systems. The 0.8 rule is the practical implementation.',
              'A measured Zs above the 0.8 figure but below the table max is a fail at verification and a C2 (potentially dangerous) on EICR — investigate, do not rationalise. The hot Zs in service will probably exceed the table max.',
              'A measured Zs significantly lower than predicted is good (comfortable headroom) but may indicate a design deviation — update the as-installed cable schedule to reflect what was actually installed.',
              'Always work from the current Table 41.3 — the A4:2026 figures, not the pre-A4 figures. Print the current table and keep it on hand for every job.',
            ]}
          />

          <Quiz title="Max Zs vs measured Zs — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module6-section5-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                5.2 ADS disconnection times
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module6-section5-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.4 TT systems &amp; earth electrodes
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
