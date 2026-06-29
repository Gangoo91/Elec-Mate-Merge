import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
  RegBadge,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm4s3-tn-final-time',
    question:
      'A 32 A TN final circuit with socket-outlets: what is the BS 7671 maximum disconnection time, and which reg sets it?',
    options: [
      '0.1 s — Reg 411.3.4',
      '0.4 s — Reg 411.3.2 (Table 41.1)',
      '1 s — Reg 411.3.2.4',
      '5 s — Reg 411.3.2 NOTE for distribution',
    ],
    correctIndex: 1,
    explanation:
      'Table 41.1 of BS 7671 sets the disconnection times. For TN systems, final circuits up to 63 A with socket-outlets — and final circuits up to 32 A supplying fixed connected current-using equipment — must disconnect within 0.4 s. 5 s applies to TN distribution circuits and to TN final circuits NOT covered by the 0.4 s rule. 1 s applies to TT distribution per Reg 411.3.2.4.',
  },
  {
    id: 'm4s3-zs-formula',
    question:
      'Reg 411.4.4 sets the TN-system condition for ADS using an OPD. Which form is correct?',
    options: ['Zs × Ia ≤ U₀ × Cmin', 'Zs ≥ U₀ / Ia', 'Zs × Cmin ≤ Ia', 'Zs ≤ Ia × U₀'],
    correctIndex: 0,
    explanation:
      'Reg 411.4.4 (TN with OPD): Zs × Ia ≤ U₀ × Cmin. Zs is the earth-fault loop impedance, Ia the current that causes effective operation in the required time, U₀ the nominal line-to-earth voltage, and Cmin the voltage factor (0.95 for general use, accounting for supply tolerance). Rearranged: Zs ≤ (U₀ × Cmin) / Ia — that is the maximum Zs you can measure and still demonstrate ADS.',
  },
  {
    id: 'm4s3-tt-rcd-condition',
    question:
      'Reg 411.5.3 (TT with RCD): what is the second condition, alongside the disconnection time?',
    options: [
      'Ze ≤ 1 Ω — capping the external loop impedance at the cut-out',
      'IΔn × Zs ≤ 50 V — limiting touch voltage via the total loop impedance',
      'Ze × Ia ≤ 100 V — bounding the source-side fault energy',
      'Ra × IΔn ≤ 50 V — limiting the earth-electrode touch voltage',
    ],
    correctIndex: 3,
    explanation:
      'Reg 411.5.3 has two limbs: (a) the disconnection time per Reg 411.3.2.2 or 411.3.2.4, AND (b) Ra × IΔn ≤ 50 V. Ra is the sum of the earth-electrode resistance plus the protective-conductor resistance back to exposed metal. Multiplying by the rated residual operating current gives the touch voltage on the exposed-conductive-part during a residual-current fault — capping it at 50 V keeps within band I touch-current limits.',
  },
  {
    id: 'm4s3-temperature-correction',
    question:
      'You measure Zs at 20 °C as 1.10 Ω on a Type B 32 A circuit. Appendix 3 / OSG App I gives Zs(max) = 1.37 Ω. Is the circuit compliant?',
    options: [
      'Yes — measured 1.10 < tabulated 1.37, so ADS is demonstrated outright',
      'Yes — comfortably, with plenty of margin against the limit',
      'Borderline pass — the 80% rule gives a 1.10 Ω ceiling, which the measurement exactly hits',
      'Fail — measured 1.10 exceeds the corrected operating ceiling',
    ],
    correctIndex: 2,
    explanation:
      'Apply the 80% rule: the corrected ceiling is 1.37 × 0.80 = 1.10 Ω, and the measured 1.10 Ω hits it exactly — a technical pass with no headroom for instrument tolerance (typically ±5%). Conductor resistance rises ~0.4% per °C for copper; cables operate up to 70 °C (PVC) or 90 °C (XLPE) but you measure at ambient (~20 °C). The 80% rule (measured Zs ≤ 0.80 × Appendix 3 Zs(max)) bakes in that temperature correction so the cold-measured value still gives ADS at full operating temperature.',
  },
  {
    id: 'm4s3-test-sequence',
    question:
      'You arrive at a new install ready to test. Reg 643.x dictates the order. Which test must be COMPLETED before you can do the Zs measurement?',
    options: [
      'Insulation resistance (Reg 643.3) — proving the circuit is fault-free first',
      'Polarity (Reg 643.6) — confirming line and neutral are not swapped',
      'Continuity of protective conductors (Reg 643.2) — proving the CPC is intact',
      'RCD operation timing (Reg 643.8) — proving the device clears in time',
    ],
    correctIndex: 2,
    explanation:
      "Reg 643.2 / GN3 sequence: continuity of protective conductors (R1+R2 or wander-lead method) shall be done BEFORE Zs measurement. The reasoning is simple — Zs is meaningless if the CPC is broken. The Zs tester would still give a number (usually a high one) but you wouldn't know whether you're looking at a real loop impedance or an open circuit. Continuity first, then insulation resistance, then polarity, then Zs.",
  },
  {
    id: 'm4s3-distribution-time',
    question:
      'A TN distribution circuit feeds a sub-board 30 m away. What is the maximum disconnection time, and what is the design implication?',
    options: [
      '0.4 s — the same tight limit as TN final circuits',
      '5 s per Reg 411.3.2 NOTE — so a much higher Zs(max) is acceptable',
      '1 s per Reg 411.3.2.4 — as for TT distribution circuits',
      '10 s — distribution circuits carry no specific time limit',
    ],
    correctIndex: 1,
    explanation:
      'Reg 411.3.2 NOTE / Reg 411.4.4 — TN distribution circuits and TN final circuits not covered by the 0.4 s rule are permitted up to 5 s. This is a higher Zs(max) at the same In rating because the protective device has more time to ride out the fault. Reg 411.4.203 tabulates fuse Zs values for the 5 s case; Reg 411.4.204 covers circuit-breakers. Practically: the 5 s relaxation is what makes long distribution feeders viable on TN.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Per Reg 411.3.2 / Table 41.1, which combination of system + circuit type gets the LONGEST permitted disconnection time?',
    options: [
      'TN final circuit with socket-outlets up to 63 A — 0.4 s',
      'TT final circuit — 0.2 s',
      'TN distribution circuit — 5 s',
      'TT distribution circuit — 1 s',
    ],
    correctAnswer: 2,
    explanation:
      'Table 41.1 / Reg 411.3.2: TN distribution circuits get up to 5 s — the longest permitted. TT distribution gets 1 s (Reg 411.3.2.4). TN final circuits ≤ 63 A with sockets, and ≤ 32 A supplying fixed equipment, get 0.4 s. The shorter time on TT reflects the higher earth-electrode resistance and consequent lower fault current.',
  },
  {
    id: 2,
    question:
      'Reg 411.4.4 (TN with OPD): Zs × Ia ≤ U₀ × Cmin. What is Cmin, and what value does BS 7671 use?',
    options: [
      'The minimum demand factor applied to the design current Ib, scaling the load',
      'The voltage factor for ADS verification, valued at 0.95 in BS 7671',
      'The rated breaking-capacity multiplier applied to the protective device',
      'The temperature-correction factor applied to the cold-measured Zs reading',
    ],
    correctAnswer: 1,
    explanation:
      'Cmin is the voltage factor — the lower-bound multiplier on U₀ used because ADS must work even when supply voltage is at the low end of tolerance. BS 7671 / GN3 use Cmin = 0.95 for ADS verification on a 230 V system, giving an effective U₀ for the calculation of 218.5 V (this is why OSG / Appendix 3 Zs(max) tables are calculated against 218.5 V, not 230 V).',
  },
  {
    id: 3,
    question:
      "Why does BS 7671 mandate the test sequence 'continuity → insulation resistance → polarity → Zs'?",
    options: [
      'Because each test must succeed for the next to be meaningful',
      'Because every dead test must precede every live test, regardless of dependency',
      'Because Zs is the slowest test and is best deferred to the end of the visit',
      'Because the schedule of test results lists its columns in that fixed printed order',
    ],
    correctAnswer: 0,
    explanation:
      'The sequence is logical, not bureaucratic. Reg 643.2 onwards: continuity confirms the test path exists. IR confirms there is no fault that would mask the loop reading or discharge the test instrument. Polarity confirms line and neutral are not swapped (a Zs reading on swapped polarity returns a wildly wrong value). Only then does Zs have any defensible meaning. It is not about a blanket dead-before-live rule, test duration, or matching the certificate layout.',
  },
  {
    id: 4,
    question:
      'A TT installation uses a 100 mA Type S RCD as the main disconnecting device on the consumer unit. The earth electrode resistance Ra is measured at 200 Ω. Does Reg 411.5.3 (Ra × IΔn ≤ 50 V) hold?',
    options: [
      'No — the product equals 50 V exactly, which is the ceiling rather than below it',
      'Cannot be determined until Ze is measured at the cut-out and added to Ra',
      'Yes — the touch-voltage product is 20 V, below the 50 V ceiling',
      'No — Ra of 200 Ω exceeds the limit acceptable for any TT earth electrode',
    ],
    correctAnswer: 2,
    explanation:
      "Reg 411.5.3: Ra × IΔn ≤ 50 V. With Ra = 200 Ω and IΔn = 100 mA = 0.1 A, the product is 20 V — well below 50 V. Don't forget the second limb of 411.5.3 — disconnection time per Reg 411.3.2.2 or 411.3.2.4 must also be met. A 200 Ω electrode is perfectly acceptable on TT; the regulation limits the touch-voltage product, not the absolute electrode resistance.",
  },
  {
    id: 5,
    question:
      'On a circuit in service that already feeds sensitive load, which method gives the most defensible Zs at the furthest point?',
    options: [
      'A direct live loop test at the far point with a multifunction tester',
      'The dead-test Ze + R1+R2 sum, since a live in-service loop reading is never valid',
      'Estimating Zs from cable length and CSA using the OSG resistance tables alone',
      'Measuring only Ze at the origin and adding a fixed 0.5 Ω circuit allowance',
    ],
    correctAnswer: 0,
    explanation:
      'A direct live loop test at the point of interest is the in-service method — it measures the real operating Zs at that location, which is what an EICR records. The dead-test Ze + R1+R2 sum is valid too (used before energising) and should corroborate the live reading; if the two disagree significantly, investigate parallel earth paths through bonded extraneous metalwork. Length-based estimates and fixed allowances are not defensible substitutes for measurement.',
  },
  {
    id: 6,
    question:
      'Reg 411.4.201 tabulates Zs(max) for fuses at 0.4 s; Reg 411.4.203 covers fuses at 5 s. Why are the 5 s values higher?',
    options: [
      'A higher nominal voltage is permitted for the 5 s case, raising the Zs(max) ceiling',
      'The fuse element runs cooler over 5 s, so resistance and clearing current both fall',
      'On the inverse-time curve a smaller current clears in 5 s, so a higher Zs is acceptable',
      'A different ADS formula, using Cmax in place of Cmin, applies to the 5 s case',
    ],
    correctAnswer: 2,
    explanation:
      'Time-current curves for fuses are inverse — the longer the time, the lower the current at which the device operates. At 0.4 s a Type gG fuse needs a high prospective current to clear in time, dictating a low Zs. At 5 s, a much lower prospective current still clears in time, so a much higher Zs is acceptable. The same applies to MCBs (Reg 411.4.202 / 411.4.204): the 5 s Zs(max) values are typically 5-10× the 0.4 s values for the same device rating.',
  },
  {
    id: 7,
    question:
      'A Type C 32 A MCB protects a TN final circuit feeding fixed equipment. Measured Zs (cold) = 0.80 Ω. Appendix 3 Zs(max) for Type C 32 A at 0.4 s is approximately 0.43 Ω. What does compliance look like?',
    options: [
      'Pass — 0.80 Ω is within an ohm of the limit, which is close enough for fixed equipment',
      'Pass — the 80% rule gives 0.43 ÷ 0.80, which falls inside the acceptable band',
      'Pass — a Type C device has a wide magnetic band that tolerates 0.80 Ω at this rating',
      'Fail — 0.80 Ω is nearly double the 0.43 Ω ceiling, so ADS is not demonstrated',
    ],
    correctAnswer: 3,
    explanation:
      "Measured 0.80 Ω vs Zs(max) of 0.43 Ω is a fail by nearly 2×. The fault current at 0.80 Ω would be ~290 A — below the Type C 32 A magnetic threshold (5-10× In = 160-320 A), so ADS within 0.4 s isn't reliably achieved. Two practical fixes: (1) redesign the circuit (shorter run, larger CPC) to lower Zs, or (2) add a 30 mA RCD or RCBO so ADS is achieved by the RCD operating-time route, which is independent of Zs.",
  },
  {
    id: 8,
    question:
      'On a periodic inspection (EICR), measured Zs is 25% above the Appendix 3 maximum but everything else tests fine. What observation code is appropriate?',
    options: [
      'No code — a minor variation within acceptable tolerance',
      'C3 — improvement recommended, no current-edition non-compliance',
      'C2 — potentially dangerous; ADS within the required time cannot be demonstrated',
      'C1 — danger present, immediate remedial action required',
    ],
    correctAnswer: 2,
    explanation:
      'Per GN3 EICR coding: a Zs measurement above the Appendix 3 maximum means the fault-protection requirement (Reg 411) cannot be demonstrated. That is potentially dangerous — a fault on the circuit may not clear within the required disconnection time, leaving exposed-conductive-parts at near-line voltage for longer than is safe. The standard coding is C2. C1 would apply if there were active danger present (e.g. exposed live parts). C3 is for "improvement" where there is no current-edition non-compliance.',
  },
];

const faqItems = [
  {
    question: "What's the practical difference between Zs and Ze?",
    answer:
      "Ze is the EXTERNAL earth-fault loop impedance — measured at the cut-out, with the consumer unit isolated. It's the contribution from the supply network: transformer winding impedance, line-side conductor, supply earthing arrangement. Zs is the TOTAL loop impedance at any point in the installation: Ze + (R1 + R2) for the circuit you're measuring. Ze is set by the DNO; Zs is what you control through cable sizing and routing.",
  },
  {
    question: 'Why does BS 7671 use Cmin = 0.95 in the ADS formula?',
    answer:
      "Cmin is the supply-voltage factor that accounts for the lower end of the BS EN 50160 tolerance band (–6%, +10%). At 95% of nominal, U₀ = 218.5 V on a 230 V system. ADS must still work when the supply is at the low end of tolerance, because that's when the available fault current is at its lowest — and so when the protective device is hardest to trip. Designing against 218.5 V rather than 230 V builds the margin in.",
  },
  {
    question: 'What does the 80% rule actually do?',
    answer:
      "The 80% rule (measured Zs ≤ 0.80 × Appendix 3 Zs(max)) bakes in the temperature correction between cold-measurement and hot-operation. Conductor resistance rises ~0.4% per °C; for a 70 °C PVC cable measured at 20 °C, that's a 20% rise. The 80% factor is the mathematical inverse — it gives you 20% headroom so the cold value still clears the operating-temperature limit. Some testers display Zs in 'corrected' mode automatically.",
  },
  {
    question: 'When can I use an RCD for fault protection in a TN system?',
    answer:
      "Reg 411.4 permits RCDs as fault-protection devices in TN, but with conditions. Reg 411.4.201 NOTE: where an RCD is used to ensure compliance with Reg 411.3.2.2, the disconnection times in Table 41.1 relate to prospective residual fault currents 'significantly higher' than the rated IΔn — typically 5×IΔn. Practically: a 30 mA RCD reliably trips at 0.04 s on a 5×IΔn = 150 mA fault, which clears the 0.4 s requirement comfortably. The Zs constraint becomes 230 / IΔn — for a 30 mA RCD, that's 7,667 Ω — essentially unlimited.",
  },
  {
    question: "What's the right test instrument for Zs?",
    answer:
      'A loop impedance tester complying with BS EN 61557-3 — most modern multifunction test sets include it. Two-wire (Ze) for use with the consumer unit isolated; three-wire (high-current Zs) for live circuits in service. Measurement uncertainty is typically ±5%; calibrate annually. For short circuit lengths or low-impedance circuits the absolute reading can be smaller than the instrument resolution — corroborate by the R1+R2 dead-test method.',
  },
  {
    question: 'Are RCD operating times the same as ADS disconnection times?',
    answer:
      "Different tests, different criteria. ADS disconnection time (Reg 411.3.2 / Table 41.1) is the time the protective device takes to clear an earth fault — verified by Zs and the device's time-current characteristic. RCD operating time (BS EN 61008 / 61009) is verified by the RCD test sequence at IΔn (≤ 300 ms general / ≤ 200 ms BS EN 61008 RCCBs) and 5×IΔn (≤ 40 ms). Both must be tested at initial verification and EICR; both are recorded on the schedule of test results.",
  },
  {
    question: 'What if measured Zs is BELOW the Appendix 3 minimum implied?',
    answer:
      'Possible at very short circuit lengths or with massive parallel earth paths. Not a fault per se — measured Zs LOWER than expected is generally good for ADS. However: investigate parallel paths. If extraneous metalwork (gas pipes, structural steel) has bonded itself into the earth path, you may be measuring Zs through paths that are not part of the designed fault loop and may not be there during actual fault conditions. The right answer is usually correct (low Zs = fast disconnection) but the method may be hiding a problem.',
  },
  {
    question: 'How do disconnection time requirements interact with EV charging circuits?',
    answer:
      "EV charging circuits (Section 722) inherit the standard Reg 411 disconnection times (0.4 s for the supply circuit) plus additional protective measures specific to the high-touch-current risk: 30 mA RCD additional protection (typically Type A or B), and on TN-C-S supplies the requirement that the EV circuit shall not include a PEN (Reg 722.312.2.1, A4). Measured Zs at the EV charge-point inlet must clear the standard 0.4 s requirement, and the device chosen must coordinate with the charger's internal DC-fault detection.",
  },
  {
    question: 'Why does the BS 7671 0.4 s number for TN finals exist (vs 5 s)?',
    answer:
      'The 0.4 s value comes from physiological body-current research (IEC 60479 series). At touch voltages around 230 V (a worst-case TN final-circuit fault scenario), the body current can reach levels that cause ventricular fibrillation if sustained beyond ~0.4 s. The disconnection time has to clear the fault BEFORE the physiological threshold for serious harm is reached. 5 s applies to circuits where the touch-voltage exposure is less direct (distribution circuits feeding sub-boards, fixed equipment without exposed metal accessible to ordinary persons), where the physiological case for tighter timing is weaker.',
  },
  {
    question: "What's the difference between an MFT and a dedicated loop tester?",
    answer:
      "A multifunction tester (MFT) integrates loop impedance, RCD, IR, continuity and polarity testing into one instrument. A dedicated loop tester does only Zs / Ze. For most working engineers the MFT is the only practical choice — you'd otherwise carry three or four separate instruments. Modern MFTs (Megger MFT1741+, Fluke 1664FC, Kewtech KT64DL) all do the full Reg 643 sequence; some include data-logging and Bluetooth export to certificate software. Dedicated loop testers exist for specialist industrial work where speed and accuracy on Zs alone justify the extra cost.",
  },
  {
    question: 'When does Section 419 (ADS not feasible) apply?',
    answer:
      "Reg 411.3.2 NOTE plus the new A4 Reg 419 group: where it isn't feasible for an OPD or RCD to interrupt the supply within the disconnection time, alternative provisions apply. Common in electronic equipment with limited short-circuit current (e.g. some ELV power supplies feeding equipment that's not allowed to lose power). Section 419 covers the recognised alternatives — supplementary equipotential bonding, double / reinforced insulation, electrical separation, or ELV by SELV / PELV.",
  },
];

const BS7671Module4Section3 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Disconnection Times & Fault Path Integrity | BS 7671:2018+A4:2026 | Module 4.3',
    description:
      'Reg 411.3.2 disconnection times per system and circuit type, Reg 411.4.4 / 411.5.3 ADS conditions, Zs measurement and the 80% temperature-correction rule, and how the test sequence under Reg 643.x establishes a defensible Zs.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../bs7671-module-4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 4
          </button>

          <PageHero
            eyebrow="Module 4 · Section 3"
            title="Disconnection times and fault path integrity"
            description="Table 41.1 disconnection times per system / circuit type, the Reg 411.4.4 TN formula (Zs × Ia ≤ U₀ × Cmin) and the Reg 411.5.3 TT formula (Ra × IΔn ≤ 50 V), how Zs is measured and corrected for operating temperature, and why the test sequence matters."
            actions={
              <>
                <RegBadge>411.3.2</RegBadge>
                <RegBadge>411.4.4</RegBadge>
                <RegBadge>411.5.3</RegBadge>
              </>
            }
            tone="yellow"
          />

          <TLDR
            points={[
              'Disconnection times come from Table 41.1 / Reg 411.3.2: TN final ≤ 0.4 s, TN distribution ≤ 5 s, TT final / distribution ≤ 1 s. The number depends on the system AND circuit type.',
              'Zs × Ia ≤ U₀ × Cmin is the TN ADS condition (Reg 411.4.4). Cmin = 0.95 — the voltage factor that builds in the supply-tolerance margin so ADS works even at the low end of the band.',
              'On TT systems with an RCD, Reg 411.5.3 adds Ra × IΔn ≤ 50 V — limiting touch voltage to band I even when the earth-electrode resistance is high.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State Table 41.1 disconnection times per system + circuit type and apply them to a specific design.',
              'Apply Reg 411.4.4 (TN) and Reg 411.5.3 / 411.5.4 (TT) ADS conditions to verify Zs against the protective device.',
              'Measure Zs correctly — by Ze + R1+R2 dead-test or by direct loop test — and apply the temperature-correction "80% rule".',
              'Sequence the initial-verification tests under Reg 643.x so that each test is meaningful and defensible.',
              'Identify when ADS is not feasible and a Section 419 alternative is appropriate (the new A4 Reg 419 group).',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Disconnection times — Table 41.1 in plain English</ContentEyebrow>

          <ConceptBlock
            title="The four numbers that drive every TN/TT design"
            plainEnglish="0.4 s for TN final circuits with sockets up to 63 A, or up to 32 A supplying fixed equipment. 5 s for TN distribution and the rest of TN finals. 1 s for TT distribution. TT final times follow the same Table 41.1 logic but RCDs typically clear far faster."
            onSite="The number you target is set by the SYSTEM (TN vs TT) and the CIRCUIT TYPE (final-with-sockets vs distribution). Get it wrong and you've designed against the wrong Zs(max). Worst case: a circuit that fails on retest because you used the 5 s table when 0.4 s was the rule."
          >
            <p>
              Reg 411.3.2 / Table 41.1 is the source of truth. It distinguishes between final
              circuits (which can be touched directly via socket-outlets or accessible equipment)
              and distribution circuits (which usually feed downstream protective devices).
              Final-circuit times are tighter because the consequence of a failure to disconnect is
              direct touch contact with energised metalwork. Distribution times are looser because
              there's another protective device downstream that's expected to clear the fault first
              via selectivity.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>The TN ADS formula — Reg 411.4.4</ContentEyebrow>

          <ConceptBlock
            title="Zs × Ia ≤ U₀ × Cmin — what each term means"
            plainEnglish="Loop impedance times trip current must not exceed nominal voltage times the supply-tolerance factor. Rearrange: Zs ≤ (U₀ × Cmin) / Ia. This sets the maximum loop impedance you can measure and still demonstrate ADS."
            onSite="Cmin = 0.95 on a 230 V supply gives an effective U₀ of 218.5 V. That's why the OSG / Appendix 3 Zs(max) tables are calculated at 218.5 V — they already include Cmin. You don't apply 0.95 to the tabulated value; that work is done."
          >
            <p>
              Ia is the current that causes effective operation of the protective device in the
              required time. For a Type B 32 A MCB at 0.4 s, Ia is read from the time-current curve
              at the 0.4 s line — typically 5×In = 160 A for the magnetic element. So Zs ≤ 218.5 /
              160 = 1.37 Ω. The OSG and Appendix 3 tabulate this for every common In/type
              combination so the field calculation is a table look-up.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 411.4.4 — TN system ADS condition"
            clause="Where an overcurrent protective device is used the following condition shall be fulfilled: Zs × Ia ≤ U₀ × Cmin, where Zs is the impedance in ohms (Ω) of the earth fault loop comprising: (a) the source; (b) the line conductor up to the point of the fault; and (c) the protective conductor between the point of the fault and the source. Ia is the current causing automatic operation of the protective device within the time required by Regulation 411.3.2.2 or 411.3.2.3. U₀ is the nominal AC RMS line-to-earth voltage; Cmin is the voltage factor to take account of voltage variations."
            meaning="The condition is the maximum Zs the circuit can have and still trip in time. If measured Zs exceeds this, ADS is not demonstrably in place and the circuit is non-compliant — fix is to reduce Zs (shorter run, larger CPC), or change the protective strategy (use an RCD where Ia × Zs becomes Ia × Zs ≤ 50 V via the RCD's much lower trip current)."
            cite="BS 7671:2018+A4:2026, Reg 411.4.4"
          />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>What 'Ia' actually means in the formula</ContentEyebrow>

          <ConceptBlock
            title="Reading the time-current curve to find Ia"
            plainEnglish="Ia is the current that causes effective operation of the protective device WITHIN THE REQUIRED DISCONNECTION TIME. For an MCB, that's typically the magnetic-trip threshold (3-5× In Type B, 5-10× In Type C, 10-20× In Type D). For a fuse, it's read off the fuse's time-current curve at the required time."
            onSite="Don't confuse Ia with In (the rated current of the device). In is what's stamped on the device. Ia is what flows during a fault to make it operate in 0.4 s or 5 s. For a Type B 32 A: In = 32 A, Ia at 0.4 s = 5 × 32 = 160 A typically. Ia is the number that goes into the Reg 411.4.4 formula."
          >
            <p>
              Appendix 3 / OSG App I tabulate Zs(max) directly so you don't have to walk the curve
              in the field — the calculation has been done. But understanding what's underneath
              helps with non-standard cases: a Type C 32 A used as a fault-current device only
              (overload by separate means) might be assessed against its 5 s curve rather than 0.4
              s, giving a much higher Zs(max). Knowing where the number comes from lets you reach
              for the right curve in the right column rather than picking a default that doesn't
              apply.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The TT ADS condition — Reg 411.5.3</ContentEyebrow>

          <ConceptBlock
            title="Two limbs: disconnection time AND touch-voltage limit"
            plainEnglish="In a TT system, the earth electrode resistance dominates Zs. Reg 411.5.3 doesn't just check the disconnection time — it also limits the touch voltage to 50 V via Ra × IΔn ≤ 50 V."
            onSite="On a TT install with a 100 Ω earth electrode and a 30 mA RCD: 100 × 0.030 = 3 V. Easy pass. On a 1500 Ω electrode (rocky ground, summer drought) with the same RCD: 1500 × 0.030 = 45 V — borderline. Push to a 100 mA Type S RCD (0.1 A): 1500 × 0.1 = 150 V — fail. Bigger RCD currents need lower electrode resistance."
          >
            <p>
              Ra is the sum of the earth-electrode resistance and the protective-conductor
              resistance back to the exposed-conductive-part being protected. The product Ra × IΔn
              is the touch voltage that appears on that exposed-conductive-part during a
              residual-current fault, before the RCD operates. Capping it at 50 V keeps the
              fault-condition touch voltage within band I — the threshold below which BS 7671 treats
              sustained contact as low-risk.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 411.5.3 — TT system fault protection by RCD"
            clause="Where an RCD is used for fault protection, the following conditions shall be fulfilled: (a) the disconnection time as required by Regulation 411.3.2.2 or 411.3.2.4; and (b) Ra × IΔn ≤ 50 V, where Ra is the sum of the resistances in ohms of the earth electrode and the protective conductor connecting it to the exposed-conductive-parts, and IΔn is the rated residual operating current of the RCD."
            meaning="Both limbs must be met. Most domestic TT installs pass easily with a 30 mA RCD because Ra rarely exceeds a few hundred ohms. The check becomes critical at higher IΔn (100 / 300 / 500 mA on commercial systems) where electrode resistance can drive Ra × IΔn above 50 V."
            cite="BS 7671:2018+A4:2026, Reg 411.5.3"
          />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>Measuring Zs in practice</ContentEyebrow>

          <ConceptBlock
            title="Two routes to a defensible Zs"
            plainEnglish="Either dead-test (Ze plus R1+R2 by short-circuit method) or live loop test in service. Both should agree; if they disagree, investigate parallel earth paths."
            onSite="Initial verification: dead-test before energising. Periodic / EICR: live loop test using the multifunction tester. Always record both Ze (at origin) and Zs (at the furthest point of each circuit) on the schedule of test results — the inspector needs both to corroborate."
          >
            <p>
              Dead-test method: measure Ze at the cut-out (instrument disconnected from the consumer
              unit). Then short-circuit line and CPC at the far end of the circuit and measure R1+R2
              from the consumer unit. Zs = Ze + (R1+R2). Live test method: connect the loop tester
              between line and earth at the point of interest. Modern testers use a high-current
              pulse (typically 25 A for a few cycles) to give a reading that is closer to the actual
              fault-condition impedance — they handle RCDs by either tripping them controllably or
              using a low-current "no-trip" mode that takes longer but doesn't operate the RCD.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="The temperature correction — why we use the 80% rule"
            plainEnglish="Cables operate at 70 °C (PVC) or 90 °C (XLPE) but you measure at ambient (~20 °C). Conductor resistance rises ~0.4% per °C of temperature change, so the operating-temperature Zs is 15-20% higher than the cold-measured value."
            onSite="Apply 0.80 to the Appendix 3 Zs(max), or check that measured Zs ≤ 0.80 × tabulated Zs(max). Some testers offer a 'correction mode' that does this automatically — but the discipline of mentally applying the factor keeps you from missing borderline circuits."
          >
            <p>
              The mathematical correction: Zs(operating) = Zs(measured) × [1 + α × (T_op − T_test)].
              With α = 0.004 for copper, T_op = 70 °C and T_test = 20 °C, the multiplier is 1 +
              0.004 × 50 = 1.20 — i.e. 20% higher under load. Apply the inverse (0.80) to the
              Appendix 3 maximum to get the cold-measured ceiling: a tabulated 1.37 Ω becomes a
              measured ceiling of 1.10 Ω. Tighter cables (running at higher operating temperatures)
              need a smaller factor; the 0.80 figure covers typical UK 70 °C PVC installations.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>The test sequence — order matters</ContentEyebrow>

          <ConceptBlock
            title="Reg 643 — why continuity comes first"
            plainEnglish="Continuity → Insulation Resistance → Polarity → Zs → RCD operation. Each test depends on the previous one having succeeded. Skip the order and the result is meaningless."
            onSite="Pre-energising sequence is locked. Live-test sequence is similar but with energised circuits — Zs and RCD timing are the live tests; everything else is dead-test. The schedule of test results captures all of them in the order Reg 643 prescribes."
          >
            <p>
              The reasoning: continuity proves the protective conductor is intact (without it Zs is
              meaningless); insulation resistance proves there are no faults that would mask loop
              readings or discharge the test instrument (a low IR fault during Zs gives spurious
              readings); polarity proves line and neutral are not swapped (a Zs reading taken with
              reversed polarity is wildly wrong); only THEN does Zs make sense. RCD operation timing
              is the final check, after Zs has confirmed the circuit can actually present a fault
              current to the RCD.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[4]} />

          <SectionRule />

          <ContentEyebrow>Live vs dead Zs measurement — the practical trade-offs</ContentEyebrow>

          <ConceptBlock
            title="When to use which method"
            plainEnglish="Dead-test (Ze + R1+R2 by short-circuit method): use during initial verification before energising. Safer (no live work), but assumes the supply Ze you measured at the cut-out matches the actual Ze under load. Live-test (loop tester at point of interest): use periodic / EICR. More accurate (measures actual operating Zs), but requires the circuit to be live, requires careful isolation discipline."
            onSite="On a new install, you do dead-test first because the install isn't energised yet. On EICR, you do live-test because the install is in service and dead-testing would require shutdown. Both should give similar answers; if they differ by more than 10-15%, investigate parallel earth paths through bonded structural metalwork."
          >
            <p>
              The wander-lead method is a third option — long flexible test lead from the consumer
              unit reference point trailed to the far point of the circuit, measuring R1+R2
              directly. Less common because it's slower and prone to lead-resistance errors over
              long runs. Most modern multifunction testers can do both two-wire (dead Ze) and
              three-wire (live Zs) measurements via the same socket connection on a final circuit.
              The schedule of test results captures both Ze (origin) and Zs (each circuit far point)
              — the inspector compares to corroborate.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Distribution circuits and the 5 s relaxation</ContentEyebrow>

          <ConceptBlock
            title="Why distribution gets the longer time"
            plainEnglish="A distribution circuit feeds another protective device downstream. If a fault happens on a final circuit, the FINAL circuit's device is supposed to clear it (selectivity). The distribution device only acts if everything downstream has failed — so it's permitted longer."
            onSite="5 s on TN distribution lets you size sub-main feeders longer or with smaller CPCs than would be possible at 0.4 s. But the trade-off is real: at 5 s the maximum Zs is much higher, so the OPD has to be sized for the inverse-time portion of its curve, not the magnetic. Reg 411.4.203 / 411.4.204 tabulate the values."
          >
            <p>
              For a sub-main supplying a sub-board on a 100 A BS 88 fuse, the 5 s Zs(max) might be
              0.45 Ω. The 0.4 s value would be approximately 0.20 Ω — over twice as demanding. The 5
              s relaxation is what makes longer feeders practical without upsizing every conductor.
              But the second-line consequence is real: under fault on the sub-board side, the
              upstream OPD takes up to 5 s to clear, leaving exposed metalwork on the sub-board side
              at near-line voltage for that time. Selectivity with the downstream device is
              therefore essential — the downstream MUST clear first.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Reading Zs(max) at the wrong disconnection time"
            whatHappens="A 32 A radial supplying a fixed cooker is checked against the 5 s Zs column rather than the 0.4 s. Measured Zs of 1.10 Ω passes the 5 s Zs(max) of 1.37 Ω but fails the 0.4 s ceiling that actually applies (cooker = fixed equipment ≤ 32 A on TN final → 0.4 s)."
            doInstead="Reg 411.3.2.2: TN final circuits up to 32 A supplying fixed equipment require 0.4 s — same as socket-outlets up to 63 A. Read the right column. Print a copy of OSG App I tucked into the test-set case so you don't have to remember which column for which circuit type."
          />

          <CommonMistake
            title="Skipping continuity to save time on a quick recall"
            whatHappens="Customer reports 'flickering lights' on a circuit; engineer arrives, plugs in the loop tester at the socket and measures Zs as 'within tolerance'. The actual fault is a broken CPC at the JB — the Zs reading was through a parallel path via bonded plumbing. CPC failure goes undetected and the cert is signed."
            doInstead="Reg 643 sequence is not negotiable. Continuity FIRST, even on a follow-up visit. A two-minute R1+R2 / wander-lead check confirms the CPC is intact and gives you a sanity-check value for the Zs comparison. If the two methods disagree by more than 10%, investigate."
          />

          <CommonMistake
            title="Treating Ze as a fixed property of the property"
            whatHappens="Designer measures Ze at the cut-out as 0.30 Ω during initial verification, records it, and uses that value for all subsequent Zs calculations across the install. EICR three years later: Ze measured again is 0.95 Ω — over 3× the original. The DNO has done network reconfiguration upstream; the supply-side characteristic has changed. Some circuits that passed at 0.30 Ω Ze now fail at 0.95 Ω."
            doInstead="Ze is the supply-side property at the time of measurement. It can change — DNO network reconfiguration, supply-cable degradation, transformer changes upstream. Always remeasure Ze on every EICR; never rely on the original install value years later. The change in Ze cascades into every circuit's Zs — if Ze rises, every circuit's headroom against Zs(max) shrinks."
          />

          <CommonMistake
            title="Not applying the temperature correction on long radials"
            whatHappens="A 4 mm² T&E radial, 30 m long, supplies a Type C 20 A in a workshop. Cold-measured Zs = 0.85 Ω. Tabulated Zs(max) for Type C 20 A at 0.4 s ≈ 0.87 Ω. Designer ticks compliance and signs off. Six months later the circuit fails ADS at full load because the operating-temperature Zs has risen to 1.02 Ω."
            doInstead="Apply the 80% rule. 0.80 × 0.87 = 0.70 Ω — and 0.85 measured fails this. Either redesign the run or upgrade the protective strategy (add a 30 mA RCBO so the RCD operating-time route handles ADS — the Zs constraint becomes 50 / IΔn = 1,667 Ω, easily satisfied)."
          />

          <SectionRule />

          <ContentEyebrow>Scenarios — applying it on the day</ContentEyebrow>

          <Scenario
            title="Industrial sub-main feeding a 30 m run to a workshop"
            situation="A small commercial unit has a sub-main feeding a workshop 30 m from the main consumer unit. Sub-main is 25 mm² SWA L+N+CPC on a 100 A BS 88 fuse (gG) at the origin. Workshop sub-board has a 6-way TP&N consumer unit for various tools and lighting. Measured Zs at the sub-board incoming: 0.42 Ω. Ze at origin: 0.18 Ω."
            whatToDo="Apply Reg 411.3.2.3 — distribution circuits in TN systems get up to 5 s. Look up Zs(max) at 5 s for a 100 A BS 88 fuse from Reg 411.4.203 / OSG App I: typically around 0.86 Ω. Measured Zs of 0.42 Ω is well below the 5 s ceiling — pass with margin. Apply 80% rule: 0.80 × 0.86 = 0.69 Ω, measured 0.42 Ω still passes. The sub-main is correctly designed and the corrected operating Zs is comfortable. Then the workshop's individual final circuits are assessed against the 0.4 s ceiling for their own protective devices, with the sub-board's measured 0.42 Ω as the new starting point (replacing Ze for those downstream calculations)."
            whyItMatters="Distribution / sub-main circuits get the looser 5 s relaxation, which is the difference between a viable 30 m run on standard cable and an over-engineered upgrade. Reading the right column of OSG App I — distribution gets the 5 s ceiling, finals get 0.4 s — is the difference between a compliant design and a needlessly expensive one. The 80% rule still applies; document on the schedule of test results."
          />

          <Scenario
            title="Long shed feeder — TT install on a smallholding"
            situation="A new 100 m underground feeder runs from the dwelling consumer unit to a shed with its own sub-board. The supply is TT (own earth electrode, no DNO earth). Designer specifies 16 mm² SWA with 16 mm² CPC. Measured Zs at the shed sub-board incoming: 1.85 Ω. Earth electrode at the dwelling: 180 Ω."
            whatToDo="Two checks. (1) Reg 411.5.3 disconnection: the sub-board is fed via a 63 A Type B MCB upstream. At Zs = 1.85 Ω the prospective fault current is 124 A — well below the 5×In = 315 A magnetic threshold. Fail on disconnection time via OPD alone. (2) Add a 100 mA Type S RCD at the dwelling end as the fault-protection device for the feeder. Check Reg 411.5.3 limb (b): Ra × IΔn = 180 × 0.1 = 18 V ✓, well below 50 V."
            whyItMatters="The OPD alone cannot give ADS within 5 s on a long TT feeder — Zs is too high. The standard answer is RCD-led fault protection, with Reg 411.5.3 limb (b) the design check. Get this wrong and the entire shed installation has no demonstrable fault protection — high-risk failure mode if there's an earth fault on a Class I appliance in the shed."
          />

          <Scenario
            title="High Zs measurement on a brand-new install — diagnosis"
            situation="A new commercial unit's installation is being initial-verified. Type B 32 A MCB on a 32 A radial supplying fixed kitchen equipment. Cold-measured Zs at the far point: 1.55 Ω. Appendix 3 / OSG App I Zs(max) for Type B 32 A at 0.4 s = 1.37 Ω. Apply 80% rule: corrected ceiling = 1.10 Ω. Measured 1.55 Ω is well above both — fail."
            whatToDo="Don't sign the cert. Investigate root cause: (1) Check Ze at the cut-out. If Ze itself is high (e.g. 0.8 Ω on a TT supply), the circuit's R1+R2 contribution may be small but Zs is still over the ceiling — fix is RCD-led ADS instead of OPD-led. (2) If Ze is normal (~0.3-0.5 Ω), R1+R2 must be ~1.0-1.2 Ω — too high for a 32 A radial. Check cable size — was 4 mm² spec'd but 2.5 mm² installed by mistake? Check terminations — high-resistance terminal in the consumer unit or at the load? (3) Re-measure with the wander-lead method to corroborate. (4) Once root cause identified, fix and re-test. Cert can be issued only when measured Zs is below the corrected ceiling with margin."
            whyItMatters="A failed initial-verification Zs is one of the few clear-cut 'don't sign the cert' moments. The customer wants the energising; building control wants the cert; you have a strong commercial pressure to issue. Resist. Issuing an EIC for a non-compliant install is a defensible cause for action against your insurance and your registered-installer status. Investigate, fix, re-test, then sign. Document the original failure and remediation in the install records."
          />

          <Scenario
            title="EICR on a 1990s domestic TN-S — failed Zs on the lighting circuit"
            situation="Older detached property. Existing 6 A Type B MCB on the upstairs lighting circuit. Measured Zs: 4.20 Ω. Appendix 3 Zs(max) for Type B 6 A at 0.4 s: 7.28 Ω. The cold measurement passes the headline Zs check but feels high for a 6 A circuit."
            whatToDo="Apply the 80% rule: 0.80 × 7.28 = 5.82 Ω. Measured 4.20 < 5.82 ✓. Pass with margin — this is fine. BUT also check Ze independently. Ze = 0.35 Ω measured at the cut-out. R1+R2 = 4.20 - 0.35 = 3.85 Ω is plausible for a long 1.0 mm² lighting radial in an older property. Sanity-check with OSG R1+R2 tables: 1.0 mm² CSA, line + CPC 1.0 mm², ~50 m run gives R1+R2 ≈ 1.83 Ω. Measured 3.85 is twice that — investigate. Likely an old jointed cable or a high-resistance termination at the rose."
            whyItMatters="A pass on the headline check can hide a real problem. The discipline of corroborating measured Zs against the OSG R1+R2 prediction is what catches latent failures — high-resistance terminations that will degrade further under load or vibration. Code as C2 if R1+R2 is significantly above the predicted value with no benign explanation."
          />

          <SectionRule />

          <ContentEyebrow>Designer's quick reference</ContentEyebrow>

          <ConceptBlock
            title="Five-step ADS verification sequence"
            plainEnglish="(1) System earthing — TN-S, TN-C-S, TT, IT? (2) Circuit type — final or distribution? (3) Disconnection time from Table 41.1. (4) Zs(max) from Appendix 3 / OSG App I. (5) Measured Zs ≤ 0.80 × Zs(max) — apply the temperature correction."
            onSite="Print the steps; tape to the bench. Most ADS verification failures come from skipping step 1 (using TN tables on a TT circuit) or step 5 (forgetting the 80% rule). For TT systems, add step 6: verify Reg 411.5.3 limb (b) — Ra × IΔn ≤ 50 V."
          >
            <p>
              For typical UK domestic TN-C-S (most common): sockets and fixed equipment ≤ 32 A are
              0.4 s; distribution / sub-mains are 5 s; TT distribution would be 1 s but TT is rare
              in UK domestic. Use OSG App I as the primary look-up — it's faster than Appendix 3 /
              Reg 411.4.201-204 and gives the same answers. Appendix 3 is the full reference if you
              need the underlying curve data for non-standard devices.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="What ADS verification on EICR looks like"
            plainEnglish="The inspector measures Zs at the furthest point of every final circuit, records the result on the schedule of test results, and compares against Zs(max) for the device protecting that circuit."
            onSite="On EICR, every circuit gets its own Zs reading. Compare measured to the Appendix 3 / OSG ceiling. Apply 80% factor mentally for the temperature correction. If the corrected reading is well below the ceiling, ADS is demonstrated — pass. If it's at or above the ceiling, ADS cannot be demonstrated — typically C2 because the protection the design relied on is no longer in place. Some installers tighten the policy further: any circuit measuring above 50% of the corrected ceiling triggers a C3 (improvement recommended) — the circuit isn't failing today, but the headroom for ageing / temperature / measurement uncertainty is small."
          >
            <p>
              The cert recording for ADS is on the schedule of test results — Ze at origin, measured
              Zs per circuit, MCB / RCBO type and rating per circuit. The pattern of results across
              the install paints a picture: if every circuit's measured Zs is significantly below
              the ceiling, the install was well-designed and is ageing gracefully. If circuits are
              creeping toward their ceilings, the install is maturing — schedule the next EICR
              sooner than the maximum interval. If circuits are above the ceilings, the install
              needs work — code C2 and recommend the specific actions (typically circuit redesign,
              supplementary RCD, or upgrade of the protective device).
            </p>
          </ConceptBlock>

          <FAQ items={faqItems} />

          <SectionRule />

          <ConceptBlock
            title="Common Zs values worth memorising"
            plainEnglish="The most-used circuit configurations in UK domestic / small commercial work have well-known Zs(max) values. Memorising the half-dozen most common saves field time and helps spot obviously-wrong measurements before you finalise the cert."
            onSite="Type B 6 A → Zs(max) at 0.4 s ≈ 7.28 Ω. Type B 16 A → 2.73 Ω. Type B 20 A → 2.19 Ω. Type B 32 A → 1.37 Ω. Type C 32 A → 0.55 Ω. Type C 40 A → 0.43 Ω. (All at 230 V with Cmin = 0.95 already applied.) Apply 80% for the temperature correction to get the cold-measured ceiling. If a measured Zs is more than 2× off the expected for the circuit type, something is wrong — investigate before signing the cert."
          >
            <p>
              The values are tabulated in Reg 411.4.204 / OSG App I — these are the ones that come
              up most often. Memorising them isn't required (the table is always available) but most
              working engineers naturally absorb them after a few hundred measurements. The pattern:
              Type B has the highest Zs(max) for a given In; Type C and Type D are progressively
              tighter. Larger In = lower Zs(max) at the same type because the same magnetic
              threshold applies as a multiple of In, so the required current to operate is higher.
            </p>
          </ConceptBlock>

          <KeyTakeaways
            points={[
              'Disconnection times come from Reg 411.3.2 / Table 41.1: TN final ≤ 0.4 s, TN distribution ≤ 5 s, TT distribution ≤ 1 s. Read the right row for the system + circuit type.',
              'TN ADS condition: Zs × Ia ≤ U₀ × Cmin (Reg 411.4.4). Cmin = 0.95 builds in supply-tolerance margin. OSG App I tables already have this baked in.',
              'TT ADS condition with RCD: disconnection time per Reg 411.3.2 AND Ra × IΔn ≤ 50 V (Reg 411.5.3). Both limbs must hold.',
              'Apply the 80% rule: measured Zs ≤ 0.80 × Appendix 3 Zs(max) — accommodates conductor-temperature rise from 20 °C ambient to 70 °C operating.',
              'Reg 643 test sequence: continuity → IR → polarity → Zs → RCD timing. Each test depends on the previous; skipping the order produces a defective EICR.',
              'Common Zs(max) at 0.4 s for memorising: Type B 32 A → 1.37 Ω; Type B 16 A → 2.73 Ω; Type C 32 A → 0.55 Ω. Apply 80% for cold-measured ceiling.',
              "Don't sign a cert for a circuit that fails its Zs measurement. Investigate root cause (Ze, cable size, terminations); fix; re-test.",
              'Ze can change with DNO network reconfiguration — always remeasure Ze on every EICR, never rely on the original install value.',
              'On EICR, measured Zs above the corrected ceiling = C2 (potentially dangerous). Fix is design (lower Zs) or strategy change (add 30 mA RCD to use the RCD operating-time route).',
              'Live vs dead Zs measurement: dead-test for initial verification (Ze + R1+R2); live-test for EICR. Both should give similar answers; significant disagreement points to parallel earth paths.',
              "Ia (current causing operation in the required time) is read from the device's time-current curve at the disconnection-time line — not the same as In (rated current).",
            ]}
          />

          <Quiz questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 4
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-4-section-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                4.4 Residual current devices
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default BS7671Module4Section3;
