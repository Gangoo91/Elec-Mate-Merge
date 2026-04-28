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
    id: 'm3s4-limits',
    question:
      'Under Reg 525.202 / Appendix 4 Section 6.4, what voltage drop limits are deemed to satisfy the general voltage requirement for a public LV-supply installation?',
    options: [
      '5% lighting / 8% other circuits, measured from the cut-out to the far point',
      '3% lighting / 5% other circuits, measured from the origin of the installation to the equipment terminals',
      '2.5% lighting / 4% other circuits, measured at the consumer unit only',
      'No specified figures — voltage drop is left entirely to the designer',
    ],
    correctIndex: 1,
    explanation:
      'Appendix 4 Section 6.4 (which Reg 525.202 says satisfies the requirements of Reg 525.1) gives 3% for lighting and 5% for other uses (heating, power, EV charging) on a public LV supply, measured from the origin of the installation through to the terminals of the fixed current-using equipment. For installations supplied from a private LV source, the equivalent figures lift to 6% / 8% — but the design must still satisfy Reg 525.1 against the equipment product standard.',
  },
  {
    id: 'm3s4-mvam-formula',
    question:
      'You have a 30 m single-phase radial in 4 mm² T&E (mV/A/m ≈ 11) carrying a design current of 25 A. What is the approximate voltage drop?',
    options: ['0.83 V', '4.13 V', '8.25 V', '16.5 V'],
    correctIndex: 2,
    explanation:
      'Vd = (mV/A/m × Ib × L) / 1000 = (11 × 25 × 30) / 1000 = 8.25 V. As a percentage of 230 V that is 3.6 % — under the 5 % limit for a power circuit, but over the 3 % limit for lighting. The mV/A/m figure already includes the return-conductor effect for single-phase, so do NOT additionally multiply by 2 when using Appendix 4 tabulated values.',
  },
  {
    id: 'm3s4-3-phase-formula',
    question:
      'Which expression correctly yields the line-to-line voltage drop for a balanced three-phase circuit using BS 7671 Appendix 4 mV/A/m values?',
    options: [
      'Vd = (mV/A/m × Ib × L) / 1000 — same as single-phase',
      'Vd = (mV/A/m × Ib × L × 2) / 1000',
      'Vd = (mV/A/m × Ib × L × √3) / 1000 — only when the tabulated mV/A/m is for line-to-neutral',
      'Vd = (mV/A/m × Ib × L) / 1000, where the Appendix 4 three-phase mV/A/m column already accounts for the √3 factor',
    ],
    correctIndex: 3,
    explanation:
      'Appendix 4 publishes separate single-phase and three-phase mV/A/m columns. The three-phase column already gives line-to-line voltage drop and already embeds the √3 factor — designers do NOT add another. The mistake is taking the single-phase mV/A/m and not adjusting; that produces a per-conductor drop, not a line-to-line drop, and overstates the result on a three-phase balanced circuit.',
  },
  {
    id: 'm3s4-product-standard',
    question:
      'A piece of fixed current-using equipment has a product standard that demands the supply voltage at its terminals never falls below 207 V. Your design satisfies Appendix 4 Section 6.4 (3% / 5% deemed-to-satisfy). Are you finished?',
    options: [
      'Yes — Appendix 4 satisfies Reg 525.1 in all cases',
      'Yes — the product standard is advisory only',
      'No — Reg 525.1 is the over-arching duty: the voltage at the terminals must remain above the lower limit demanded by the equipment product standard, even if Appendix 4 percentages are met',
      'No — only because the percentages must be reduced to 2% / 4%',
    ],
    correctIndex: 2,
    explanation:
      'Reg 525.1 is the principal requirement: the voltage at fixed current-using equipment must not fall below the lower limit set by the relevant product standard. Appendix 4 / Reg 525.202 gives a deemed-to-satisfy route in the absence of any other consideration, but it does not override an equipment-specific limit. If the kit needs ≥207 V at its terminals and your worst-case design only delivers 205 V, the design fails Reg 525.1 even with a 3% lighting / 5% power result.',
  },
  {
    id: 'm3s4-power-factor',
    question:
      'Why do Appendix 4 mV/A/m tables include separate columns for resistance only (mVr) and impedance (mVz) on larger cable sizes?',
    options: [
      'For decorative purposes — designers always use mVz',
      'Because at larger CSAs the cable reactance becomes significant; mVr is used at unity p.f., mVz at lagging p.f. with the appropriate cosφ correction',
      'Because mVr is for AC and mVz is for DC',
      'Because mVr is used in TN systems and mVz in TT',
    ],
    correctIndex: 1,
    explanation:
      'On smaller CSAs (typically up to 16 mm²) cable resistance dominates and the reactance is small enough to ignore. From around 25 mm² upwards, reactance becomes appreciable — Appendix 4 then lists mVr (resistance), mVx (reactance) and mVz (impedance). For a load with power factor cosφ, voltage drop is approximately mVr × cosφ + mVx × sinφ. Using mVz unconditionally on a low p.f. inductive load (e.g. a motor) overstates the drop; using mVr only on the same load understates it.',
  },
  {
    id: 'm3s4-ev-long-run',
    question:
      'A 7 kW (32 A) single-phase EV charger is to be installed 60 m from a domestic CU on a public TN-C-S supply. Using 6 mm² T&E (mV/A/m ≈ 7.3), is the design likely to satisfy the voltage drop deemed-to-satisfy figures?',
    options: [
      'Yes — well within 5 %',
      'No — Vd ≈ 14.0 V (6.1 %), exceeds the 5 % limit; upsize to 10 mm² or use SWA with a larger CSA',
      'No — but it is acceptable because EV chargers are exempt from Reg 525.202',
      'Yes — the EV charger sets its own voltage internally so the cable drop does not matter',
    ],
    correctIndex: 1,
    explanation:
      'Vd = (7.3 × 32 × 60) / 1000 ≈ 14.0 V. As a fraction of 230 V that is 6.1 %, above the 5 % limit. EV charging is a power circuit, so 5 % applies; the load is also long, sustained and at high diversity factor, which makes the Appendix 4 figure a hard target rather than a worst-case warning. Upsize the conductor (10 mm² gives ≈ 8.5 V / 3.7 %) or shorten the run with a sub-board.',
  },
  {
    id: 'm3s4-design-current',
    question: 'Which current value should you use as Ib in the voltage drop calculation?',
    options: [
      'The protective device rating (In) — always',
      'The cable current-carrying capacity (Iz) — to be conservative',
      'The design current (Ib) — Reg 311.1 — derived from the load assessment, applying diversity where appropriate',
      'The prospective fault current at the origin',
    ],
    correctIndex: 2,
    explanation:
      'Voltage drop is a service-condition (normal operation) calculation, not a fault calculation. Reg 311.1 makes Ib — the design current after diversity assessment — the input. Using In overstates voltage drop where In > Ib, leading to over-sized cable; using Iz is meaningless because Iz depends on the chosen cable. The fault current is irrelevant here — that is for protection coordination, not voltage drop.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Reg 525.1 sets the principal voltage drop duty in BS 7671:2018+A4:2026. Which option states it correctly?',
    options: [
      'Voltage drop shall not exceed 4% on any final circuit',
      'In the absence of any other consideration, under normal service conditions the voltage at the terminals of any fixed current-using equipment shall be greater than the lower limit corresponding to the product standard relevant to the equipment',
      'Voltage drop shall be calculated using the line-to-line voltage on every circuit',
      'Voltage drop is solely a matter for the cable manufacturer, not the designer',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 525.1 (verbatim, BS 7671:2018+A4:2026): "In the absence of any other consideration, under normal service conditions the voltage at the terminals of any fixed current-using equipment shall be greater than the lower limit corresponding to the product standard relevant to the equipment." Reg 525.201 then says where no product standard exists the voltage shall not impair safe functioning; Reg 525.202 gives Appendix 4 Section 6.4 as the deemed-to-satisfy route.',
  },
  {
    id: 2,
    question:
      'Which voltage drop figures are deemed-to-satisfy under Appendix 4 Section 6.4 for a public LV supply?',
    options: [
      '3% lighting / 5% other — origin to far point',
      '5% lighting / 8% other — origin to far point',
      '6% lighting / 8% other — only on private LV',
      '2.5% lighting / 5% other — final circuit only',
    ],
    correctAnswer: 0,
    explanation:
      'Appendix 4 Section 6.4 publishes 3% for lighting and 5% for other uses (heating, power, EV charging) on public LV supplies, measured from the origin of the installation to the terminals of the equipment. For a private LV source the figures are 6% / 8% — but Reg 525.1 still applies, so you cannot exceed an equipment-specific lower limit even within these.',
  },
  {
    id: 3,
    question:
      'What is the correct Appendix 4 single-phase voltage drop formula using tabulated mV/A/m?',
    options: [
      'Vd = mV/A/m × Ib × L × 2 / 1000',
      'Vd = mV/A/m × Ib × L / 1000 — the tabulated figure already accounts for the return path',
      'Vd = mV/A/m × In × L / 1000',
      'Vd = mV/A/m × Iz × L / 1000',
    ],
    correctAnswer: 1,
    explanation:
      'Appendix 4 mV/A/m for single-phase already includes the return conductor — designers do NOT multiply by 2. Use Ib (Reg 311.1 design current after diversity), not In and not Iz. The result is in millivolts when mV/A/m is multiplied by amps × metres, hence the / 1000 to convert to volts.',
  },
  {
    id: 4,
    question:
      'A balanced three-phase 80 A load is supplied via 80 m of 25 mm² SWA copper (Appendix 4 three-phase mVz ≈ 1.55 mV/A/m at full load). What is the approximate line-to-line voltage drop?',
    options: ['6.4 V', '9.92 V', '17.2 V', '0.99 V'],
    correctAnswer: 1,
    explanation:
      'Vd = (mV/A/m × Ib × L) / 1000 = (1.55 × 80 × 80) / 1000 = 9.92 V. Against a 400 V line-to-line nominal that is 2.48 % — well inside the 5 % limit. The Appendix 4 three-phase column already includes the √3 factor; never apply √3 again when using that column.',
  },
  {
    id: 5,
    question:
      'Why are Appendix 4 mV/A/m tables sub-divided into mVr / mVx / mVz columns from approximately 25 mm² upwards?',
    options: [
      'Cable colour conventions change at 25 mm²',
      'Above ~16-25 mm², cable reactance becomes significant — mVr (resistance), mVx (reactance) and mVz (impedance) let the designer apply the cosφ × mVr + sinφ × mVx correction for the actual load power factor',
      'They reflect different ambient temperature corrections',
      'They are different limits for TN, TT and IT systems',
    ],
    correctAnswer: 1,
    explanation:
      'On small CSAs the cable is effectively pure resistance and one column is enough. As CSA grows, conductor inductance becomes comparable to its resistance — the impedance vector ceases to be aligned with the voltage. mVr × cosφ + mVx × sinφ gives the correct in-phase voltage drop for an inductive load (typical motor / large luminaire driver). Using mVz blindly assumes worst-case unity p.f. drop on an mVz-formed impedance and is conservative; on lagging loads the result can be misleadingly high.',
  },
  {
    id: 6,
    question:
      'A new 7 kW EV charger (32 A, 230 V, single-phase) sits 50 m from a domestic CU. The designer chooses 6 mm² T&E (mV/A/m ≈ 7.3). What is the voltage drop and what is the right call?',
    options: [
      '5.8 V (2.5 %) — pass',
      '11.7 V (5.1 %) — fails the 5 % deemed-to-satisfy limit; upsize to 10 mm² (giving ≈ 7.0 V / 3.0 %) or shorten the run',
      '23.4 V (10.2 %) — must add a step-up transformer',
      '1.17 V (0.5 %) — pass with margin',
    ],
    correctAnswer: 1,
    explanation:
      'Vd = (7.3 × 32 × 50) / 1000 = 11.68 V ≈ 11.7 V → 5.08 % at 230 V. Marginally over the 5 % limit. Sustained EV charging at 32 A for hours makes a worst-case Appendix 4 figure realistic, so do not lean on the margin. Standard fix: upsize to 10 mm² (mV/A/m ≈ 4.4) → Vd ≈ 7.04 V (3.06 %), well inside.',
  },
  {
    id: 7,
    question:
      'Which input to the voltage drop calculation is the Reg 311.1 design current Ib, and why does it matter?',
    options: [
      'The protective device rating — voltage drop is always evaluated against the device limit',
      'The cable current-carrying capacity — voltage drop is the worst case the cable can ever see',
      'The actual design current after diversity — Reg 311.1 — using anything else either over-sizes the conductor or under-states the drop',
      'The earth-fault loop current — voltage drop is a fault-condition calculation',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 311.1 — maximum demand and diversity — produces Ib. Voltage drop is a normal-service-condition calculation per Reg 525.1, so it must use the actual sustained current the circuit will carry, not the protective device rating (typically larger), nor the cable capacity, nor any fault-condition value. Using In artificially over-sizes; using fault current is meaningless — that is a Chapter 41 / 43 calculation.',
  },
  {
    id: 8,
    question:
      'A long sub-main feeds a remote DB at 60 % of its current capacity. Which design discipline is most likely to overlook voltage drop on a sub-main?',
    options: [
      'Voltage drop on a sub-main never matters — only final circuits count',
      'It is a known trap: each leg eats some of the 5 % budget and final circuits downstream still need to satisfy 525.1; the sub-main, the final circuit and the equipment lower limit all sum together from origin to terminals',
      'Sub-mains are exempt because they have no socket-outlets',
      'BS 7671 only allocates voltage drop to final circuits',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 525.202 / Appendix 4 Section 6.4 measures voltage drop from the origin of the installation to the terminals of fixed current-using equipment — the WHOLE path, including every intervening sub-main. A sub-main running at 1.5 % drop already burns 30 % of a 5 % power-circuit budget; a 2 % final circuit then puts you at 3.5 % — fine on paper but only with margin. Designers who size each sub-main and final circuit independently against the same 5 % limit produce installations that fail at the equipment terminals.',
  },
];

const faqItems = [
  {
    question: 'What does Reg 525.1 actually require?',
    answer:
      'Reg 525.1 (verbatim): "In the absence of any other consideration, under normal service conditions the voltage at the terminals of any fixed current-using equipment shall be greater than the lower limit corresponding to the product standard relevant to the equipment." It is the over-arching duty. Appendix 4 Section 6.4 — pulled in by Reg 525.202 — provides the deemed-to-satisfy 3 % / 5 % figures, but they do not override an equipment-specific lower limit. Where the equipment product standard demands a stricter figure, that is what governs.',
  },
  {
    question: 'Where do the 3 % / 5 % numbers come from?',
    answer:
      'Appendix 4 Section 6.4 (BS 7671:2018+A4:2026). On a public LV supply: 3 % for lighting and 5 % for other uses (power, heating, EV charging), measured from the origin of the installation to the terminals of the fixed current-using equipment. On a private LV source the figures rise to 6 % / 8 % — but the Reg 525.1 product-standard duty still applies and may require tighter design.',
  },
  {
    question:
      'Do I multiply Appendix 4 single-phase mV/A/m by 2 to account for the return conductor?',
    answer:
      'No. The Appendix 4 single-phase mV/A/m column already includes the return-path resistance (it is a "round-trip" figure). Multiplying again by 2 doubles the calculated drop and over-sizes the cable. Only some manufacturer datasheets give a per-conductor figure — read the column heading carefully. For three-phase, the Appendix 4 three-phase column gives the line-to-line drop and already includes the √3 factor.',
  },
  {
    question: 'When does power factor matter for voltage drop?',
    answer:
      'On larger CSAs (around 25 mm² and above on copper, less on aluminium) cable reactance becomes a meaningful component of impedance. Appendix 4 then lists mVr (resistance), mVx (reactance) and mVz (impedance) — and the correct in-phase drop on a load with power factor cosφ is approximately mVr × cosφ + mVx × sinφ. On purely resistive loads (heaters, incandescent lamps) cosφ = 1, sinφ = 0, so mVr alone suffices. On motors or VSDs with cosφ around 0.85 lagging, ignoring the mVr × cosφ correction overstates drop.',
  },
  {
    question: 'How do I handle voltage drop on a sub-main feeding a remote DB?',
    answer:
      'Treat the path as cumulative. Reg 525.202 / Appendix 4 Section 6.4 measures from the ORIGIN of the installation to the equipment terminals — the sub-main and every final circuit downstream share the same 3 % / 5 % budget. Practical rule: aim for the sub-main to consume no more than ~1-1.5 % so the final circuit has the headroom it needs. On a long sub-main (>50 m) upsize the conductor or position a local sub-DB closer to the loads.',
  },
  {
    question: 'Are EV charging circuits treated specially for voltage drop?',
    answer:
      'EV charging is a "power" circuit so the 5 % deemed-to-satisfy figure applies. The trap is the load profile: 32 A sustained for many hours, often near peak diversity, often via a long external run to a parking position. The Appendix 4 figure assumes worst-case, but on an EV install you really do drive the cable at design current for the duration. Designers should treat the 5 % limit as a hard target with little margin and routinely upsize to 10 mm² for runs over ~25-30 m at 32 A.',
  },
  {
    question: 'Does voltage drop interact with disconnection-time / Zs requirements?',
    answer:
      'Indirectly. Voltage drop is a normal-service-condition calculation per Reg 525.1; Zs / disconnection times are fault-condition under Reg 411.4. Both share the conductor resistance — large CSA reduces both Vd and Zs. Designers usually find that a cable sized for voltage drop on long runs comfortably meets the Zs limit; the converse is not always true. Reg 433 / Appendix 4 also reminds the designer that conductor temperature affects R — Appendix 4 mV/A/m values are given at full-load conductor temperature.',
  },
  {
    question: 'Can I derate voltage drop using diversity on the sub-main?',
    answer:
      'Yes — Reg 311.1 (maximum demand) explicitly permits diversity. The Ib used for voltage drop on a sub-main is the diversified maximum demand, not the arithmetic sum of every downstream final-circuit In. This is exactly how a 100 A sub-main supplies a board with 6 × 32 A ways — diversity reduces the calculated Ib so the conductor copes thermally and the voltage drop budget is workable. Document the diversity assumption — IET On-Site Guide Appendix 1 / GN1 Section 1 give the typical figures.',
  },
  {
    question: 'What if my design fails the 3 % / 5 % limit but the equipment is happy?',
    answer:
      'Reg 525.202 says Appendix 4 Section 6.4 is deemed to satisfy the requirements of Reg 525.1 — it is one route to compliance, not the only route. If the equipment product standard accepts a wider voltage range and the designer can demonstrate the lower-limit duty of Reg 525.1 is still met, departing from the 3 % / 5 % figures is permissible under Reg 120.3. The departure must be documented on the EIC, with the calculation evidence kept. In practice: rare on domestic, occasionally seen on industrial inverter-fed motors, very rare on EV / heating / lighting.',
  },
];

const BS7671Module3Section4 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Voltage drop and system design limits | BS 7671:2018+A4:2026 | Module 3.4',
    description:
      'Voltage drop under BS 7671:2018+A4:2026 — Reg 525.1, Reg 525.201/525.202, the Appendix 4 deemed-to-satisfy 3 % / 5 % figures, the mV/A/m method, single-phase and three-phase calculations, and how to handle EV chargers and long sub-mains.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../bs7671-module-3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 3
          </button>

          <PageHero
            eyebrow="Module 3 · Section 4"
            title="Voltage drop and system design limits"
            description="Reg 525.1 sets the duty: the voltage at fixed current-using equipment must stay above the lower limit demanded by its product standard. Appendix 4 Section 6.4 is the deemed-to-satisfy route — 3 % lighting, 5 % other uses, origin to terminals — and the mV/A/m method is the working tool."
            actions={
              <>
                <RegBadge>525.1</RegBadge>
                <RegBadge>525.201</RegBadge>
                <RegBadge>525.202</RegBadge>
              </>
            }
            tone="yellow"
          />

          <TLDR
            points={[
              'Reg 525.1 is the over-arching duty: at the terminals of fixed current-using equipment the voltage shall stay above the lower limit set by the equipment product standard. Reg 525.202 names Appendix 4 Section 6.4 as the deemed-to-satisfy route.',
              'Appendix 4 figures: 3 % for lighting, 5 % for other uses (power, heating, EV charging), measured from the origin of the installation to the terminals of the equipment. 6 % / 8 % apply on private LV.',
              'Working tool is the Appendix 4 mV/A/m method: Vd = (mV/A/m × Ib × L) / 1000. The single-phase column already includes the return path; the three-phase column already includes √3. Use Reg 311.1 design current (Ib) — never In, never Iz.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State Reg 525.1 verbatim and explain how Reg 525.201, Reg 525.202 and Appendix 4 Section 6.4 deliver the deemed-to-satisfy 3 % / 5 % figures (6 % / 8 % on private LV).',
              'Compute single-phase voltage drop using the Appendix 4 mV/A/m method with the correct design current Ib (Reg 311.1) and recognise that the tabulated figure already accounts for the return conductor.',
              'Compute three-phase line-to-line voltage drop using the Appendix 4 three-phase mV/A/m column and explain why no further √3 multiplier is applied.',
              'Apply the mVr / mVx / mVz columns at larger CSAs with a power-factor correction (mVr × cosφ + mVx × sinφ) and pick the right column for the load type.',
              'Identify when an EV-charging circuit, a long sub-main, or a remote outbuilding is at risk of failing the 5 % limit, and design out the failure before installation.',
              'Recognise the cumulative origin-to-equipment-terminals nature of the Appendix 4 budget and allocate it sensibly between sub-main and final circuit.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why voltage drop matters</ContentEyebrow>

          <ConceptBlock
            title="The reason BS 7671 cares about voltage drop"
            plainEnglish="Equipment is designed for a voltage range — go below it and the equipment misbehaves. Motors lose torque, lighting dims and heats, switching power supplies cycle or reset, electronic controls may drop out."
            onSite="A 230 V appliance does not stop dead at 218 V — it usually keeps going, but starts to lose its margin. Motors run hotter at low voltage because the same mechanical load now needs more current; lighting flicker becomes visible at the bottom of long runs; heating output (V²/R) falls quadratically. The job of Section 525 is to keep the design above that knee."
          >
            <p>
              Reg 525.1 anchors the rule to the equipment product standard, not to a single
              percentage. A 230 V general-use appliance typically tolerates ±10 % under EN 60038;
              specialist equipment often tolerates less. Voltage drop in cables is the largest
              installer-controlled component of that tolerance. Get it wrong and the symptoms show
              up not as a failed insulation test but as a mystified customer complaining that the
              kit at the end of the run will not start, runs warm, or trips erratically.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 525.1 — Voltage at equipment terminals"
            clause="In the absence of any other consideration, under normal service conditions the voltage at the terminals of any fixed current-using equipment shall be greater than the lower limit corresponding to the product standard relevant to the equipment."
            meaning="The over-arching duty. The percentages in Appendix 4 are a deemed-to-satisfy route, not an alternative limit — if the equipment product standard demands more, the equipment standard wins. Designers must check both."
            cite="BS 7671:2018+A4:2026, Reg 525.1"
          />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>
            The deemed-to-satisfy route — Reg 525.201 / 525.202 / App 4 §6.4
          </ContentEyebrow>

          <ConceptBlock
            title="Where the 3 % / 5 % figures come from"
            plainEnglish="Reg 525.202 says: meet Appendix 4 Section 6.4 and you are deemed to satisfy Reg 525.1. The Appendix gives 3 % for lighting, 5 % for other uses, on a public LV supply, measured origin to equipment terminals."
            onSite="The percentages are not arbitrary. 3 % protects light output and avoids visible flicker; 5 % protects motors and electronic equipment in normal domestic / commercial service. They apply to the WHOLE installation — origin to terminals — not 5 % per circuit on top of 5 % per sub-main."
          >
            <p>
              Reg 525.201 covers the case where there is no relevant product standard: the voltage
              at the equipment shall not impair its safe functioning. Reg 525.202 then
              cross-references Appendix 4 Section 6.4 as a deemed-to-satisfy route: 3 % for lighting
              and 5 % for other uses on a public LV supply (typically 230 V single-phase or 400 V
              three-phase), measured from the origin of the installation to the terminals of the
              fixed current-using equipment. On installations supplied from a private LV source
              (e.g. a generator, a private transformer feeding the site), the figures relax to 6 % /
              8 % — but Reg 525.1 still rules and may demand tighter design where equipment product
              standards require it.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Origin to terminals — the cumulative budget"
            plainEnglish="The percentages are measured from the cut-out (origin of the installation) all the way to the terminals of the fixed equipment — not at every node along the way."
            onSite="On an installation with a sub-main → sub-DB → final circuit, all three legs share the same 5 % budget. A sub-main running at 1.5 % already eats nearly a third of the budget for the eventual EV charger or motor at the end."
          >
            <p>
              In practice, a sensible designer-allocation on a typical sub-main feeder is no more
              than ~1-1.5 % on the sub-main, leaving 3.5-4 % headroom for the final circuit and its
              inevitable variations from the as-designed length. This is one of the most common
              voltage drop traps: each leg comfortably inside the limit individually, the sum at the
              terminals failing.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>The mV/A/m method — Appendix 4</ContentEyebrow>

          <ConceptBlock
            title="The working formula and the Appendix 4 columns"
            plainEnglish="Voltage drop = (cable's tabulated mV/A/m) × design current × length, divided by 1000. Appendix 4 publishes the mV/A/m for every standard cable in BS 7671 by installation method, single- or three-phase, and (above ~25 mm²) by resistance / reactance / impedance."
            onSite="Two routine traps: (1) using In or Iz instead of Ib — Reg 311.1 demands the design current after diversity; (2) multiplying the single-phase mV/A/m by 2 to 'account for the return' — the Appendix 4 single-phase column already does that. Read the column heading."
          >
            <p>
              For single-phase: <strong>Vd (V) = (mV/A/m × Ib × L) / 1000</strong>, where mV/A/m is
              read from the Appendix 4 column matching the cable type (T&E / SWA / single-core etc.)
              and the installation Reference Method (A through F). The result is in volts when
              mV/A/m is in millivolts per amp per metre, current is in amps and length in metres.
              Compare against the Reg 525.202 limit as a percentage of the nominal voltage (230 V
              single-phase, 400 V three-phase line-to-line).
            </p>
            <p>
              For three-phase balanced loads, the Appendix 4 three-phase column gives line-to-line
              voltage drop directly and already embeds the √3 factor. The formula is the same —{' '}
              <strong>Vd (V) = (mV/A/m × Ib × L) / 1000</strong> — but using the three-phase column.
              Designers occasionally take the single-phase column for a three-phase balanced circuit
              and add their own √3; this gives the wrong answer because the two columns are scaled
              differently.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 525.202 — Deemed-to-satisfy route"
            clause="The requirements of Regulation 525.1 are deemed to be satisfied for a low voltage installation if the voltage drop between the origin of the installation and the equipment does not exceed the values stated in Appendix 4 Section 6.4 of BS 7671."
            meaning="Appendix 4 Section 6.4 gives 3 % for lighting and 5 % for other uses on a public LV supply, measured origin to terminals. Reg 525.202 is what makes those numbers binding — meet them and Reg 525.1 is also deemed met (subject to the equipment product standard duty)."
            cite="BS 7671:2018+A4:2026, Reg 525.202 (with App 4 §6.4)"
          />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>Power factor and the mVr / mVx / mVz columns</ContentEyebrow>

          <ConceptBlock
            title="When cable reactance starts to matter"
            plainEnglish="Small cables behave like resistors — the voltage drop is in phase with the current. Big cables behave more like impedances — the voltage drop has a real (resistive) and an imaginary (reactive) part. Power factor of the load determines the in-phase result."
            onSite="From around 25 mm² copper upwards, Appendix 4 splits the column into mVr (resistance), mVx (reactance) and mVz (impedance, the vector sum). On a unity-p.f. load (heater / incandescent), use mVr alone. On a lagging load (motor at cosφ ≈ 0.85), use mVr × cosφ + mVx × sinφ. Using mVz blindly assumes unity p.f. on an impedance-based drop and may overstate or understate the actual in-phase voltage seen at the terminals."
          >
            <p>
              The exact correction Appendix 4 supports is{' '}
              <strong>Vd = (mVr × cosφ + mVx × sinφ) × Ib × L / 1000</strong> for single-phase, or
              the equivalent three-phase form. cosφ is the load power factor (named on the equipment
              data plate), and sinφ is √(1 − cos²φ). On a 5.5 kW motor at 0.85 lagging, cosφ = 0.85
              and sinφ ≈ 0.527 — neither term dominates, both matter. The practical rule of thumb:
              for resistive heating loads, ignore reactance; for inductive motor and VSD loads on
              cables &gt;25 mm², do the proper power-factor correction or you risk over-sizing the
              conductor on the resistive estimate alone.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[4]} />

          <SectionRule />

          <ContentEyebrow>
            Single-phase worked example — 30 m radial in 4 mm² T&E at 25 A
          </ContentEyebrow>

          <ConceptBlock
            title="Step-by-step against Reg 525.202"
            plainEnglish="A short, dense worked example. Read it once carefully, then once on a job, and you have the working method for the rest of your career."
            onSite="The same cable can be 'pass' on a power circuit and 'fail' on a lighting circuit. Read the Reg 525.202 limit against the type of circuit before deciding whether the design is acceptable."
          >
            <p>
              <strong>1. Inputs.</strong> 4 mm² T&E (twin&earth, two cores plus CPC), single-phase
              230 V, 25 A design current Ib, 30 m run, installation Reference Method C (clipped
              direct to a non-conductive surface), copper conductor.{' '}
              <strong>2. Appendix 4 mV/A/m.</strong> Single-phase column, 4 mm² copper, Reference
              Method C: ≈ 11 mV/A/m. <strong>3. Voltage drop.</strong> Vd = (11 × 25 × 30) / 1000 =
              8.25 V. <strong>4. Percentage.</strong> 8.25 / 230 × 100 = 3.59 %.{' '}
              <strong>5. Compare to Reg 525.202.</strong> If the circuit is "other use" (power /
              heating / EV) the 5 % limit applies — 3.59 % is a pass. If the circuit is lighting (3
              % limit), the design fails — 4 mm² is too small or the run is too long. The standard
              fix is to upsize to 6 mm² (mV/A/m ≈ 7.3) → Vd = (7.3 × 25 × 30) / 1000 = 5.475 V (2.38
              %), which now passes the 3 % lighting limit. <strong>6. Sanity check.</strong> Confirm
              Iz of 4 mm² T&E in Reference Method C after correction factors still &gt; In, and that
              Zs at the far point still meets Reg 411.4.4. Voltage drop is one of three coordinated
              checks, not a substitute for the others.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Three-phase voltage drop</ContentEyebrow>

          <ConceptBlock
            title="The three-phase formula and why it is shorter than people think"
            plainEnglish="On a balanced three-phase circuit, the three line currents add to zero — the neutral carries (effectively) nothing, and the cable voltage drop is the in-phase loss across one phase referred to the line-to-line voltage. Appendix 4 publishes the answer directly."
            onSite="The three-phase mV/A/m column gives line-to-line drop. Apply the same Vd = mV/A/m × Ib × L / 1000. Do NOT add √3. Do NOT multiply by 3. Do NOT use the single-phase column."
          >
            <p>
              <strong>Worked example.</strong> 80 m sub-main, 25 mm² SWA copper, three-phase
              balanced 80 A design current, Reference Method E (free air clipped). Appendix 4
              three-phase column for 25 mm² copper SWA: mVz ≈ 1.55 mV/A/m at full load. Vd ≈ (1.55 ×
              80 × 80) / 1000 = 9.92 V line-to-line. As a percentage of 400 V: 9.92 / 400 × 100 =
              2.48 %. This is well within the 5 % limit for a sub-main feeding power loads, and
              leaves over 2.5 % budget for the downstream final circuits before they run out of
              headroom.
            </p>
            <p>
              On unbalanced three-phase (where the neutral carries a non-zero current — e.g. a mixed
              lighting / single-phase load board) the calculation is more involved. The practical
              shortcut is to design each affected single-phase final circuit separately against the
              3 % / 5 % limits and let the sub-main carry the largest of the three line currents —
              the Appendix 4 single-phase column then applies on a phase-by-phase basis. For
              sustained heavy unbalance, BS 7671 Appendix 4 directs the designer to recognise the
              neutral as a current-carrying conductor for sizing.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>EV charging — long runs and sustained load</ContentEyebrow>

          <ConceptBlock
            title="Why EV charging is the routine voltage-drop trap"
            plainEnglish="An EV charger draws full design current for hours at a time. It is often sited at the far end of a long external cable. The Appendix 4 5 % limit is no longer a worst-case ceiling — it is a hard target the cable hits routinely."
            onSite="A 7 kW (32 A) charger in 6 mm² T&E at 50 m gives Vd ≈ (7.3 × 32 × 50) / 1000 = 11.68 V → 5.08 %. Marginally over the 5 % limit, before any conductor-temperature derating. Standard fix: 10 mm² T&E (mV/A/m ≈ 4.4) → Vd ≈ 7.04 V (3.06 %), comfortably in budget."
          >
            <p>
              Design discipline for EV charging final circuits: use Ib = 32 A (or 40 A for an
              uprated charger) — full-rated, sustained — never derate the EV-charger current for
              voltage drop. Treat the run length as the as-built worst case (measured, not estimated
              from a plan). Apply the 5 % limit from origin to charger terminals, including any
              sub-main. Where the run exceeds ~25-30 m at 32 A, default to 10 mm² T&E or 6/10 mm²
              SWA depending on installation method; compute, do not assume. Special-location and
              Section 722 / Reg 722.312.2.1 PEN-prohibition rules also apply but are out-of-scope
              for the voltage-drop sizing — see Module 4.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>Conductor temperature and the Appendix 4 figures</ContentEyebrow>

          <ConceptBlock
            title="Why conductor temperature changes voltage drop — and what Appendix 4 already does about it"
            plainEnglish="Hot copper has higher resistance than cold copper. Appendix 4 mV/A/m values are quoted at the conductor's full-load operating temperature (70 °C for general thermoplastic insulation) — already a worst-case for thermal effect."
            onSite="If your circuit runs lightly loaded, the cable is cooler, the resistance is lower, and the real-world voltage drop is lower than the Appendix 4 calculation. The Appendix 4 number is therefore conservative for partial-load circuits — handy when the calculated drop is right at the limit and the real load is well below Iz."
          >
            <p>
              Copper resistance rises with temperature at roughly 0.4 % per °C. A 4 mm² T&E
              conductor sized for Iz = 32 A and operating at 25 A (78 % loaded) will sit well below
              the 70 °C reference — closer to 50-55 °C in typical Reference Method C — so the actual
              voltage drop is around 6-8 % less than the Appendix 4 figure suggests. Appendix 4
              includes guidance on temperature correction: for a more accurate result on a circuit
              known to operate well below full load, the mV/A/m value can be adjusted downward by
              the ratio (230 + tp) / (230 + 70), where tp is the actual operating temperature. Most
              designers ignore the correction and accept the conservative result; it is mainly used
              when the design is otherwise unworkable and shaving margin is the only fix.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Long sub-mains and remote outbuildings</ContentEyebrow>

          <ConceptBlock
            title="Allocating the 5 % budget across multiple legs"
            plainEnglish="The Appendix 4 budget is from the origin of the installation to the terminals of the equipment — every leg in between consumes some of it."
            onSite="Workshop / garage / annexe sub-mains are notorious. The 60 m run at 1.5 % feels free, then the small DB at the far end has its own 8 m radial at 1.5 %, then the equipment's product standard demands 6 % at the terminals — and you are right at the edge."
          >
            <p>
              Practical allocation discipline: <strong>(1)</strong> Sub-main: aim for ≤ 1-1.5 %.{' '}
              <strong>(2)</strong> Sub-DB busbar: nominal, treat as zero. <strong>(3)</strong> Final
              circuit: design to ≤ 3-3.5 %. <strong>(4)</strong> Verify origin-to-terminal sum: ≤ 5
              % power, ≤ 3 % lighting. <strong>(5)</strong> Cross-check Reg 525.1: equipment product
              standard lower limit met at the terminals at full load. Where the sub-main run is over
              ~30 m and the downstream load is dense, place a local sub-DB closer to the loads and
              treat the long leg as a feeder; a 16 mm² SWA at 60 m is often more cost-effective than
              a 6 mm² T&E at the same length and gives far more headroom for future loads.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Multiplying the Appendix 4 single-phase mV/A/m by 2"
            whatHappens="Designer reads 'mV/A/m' and assumes it is per-conductor. They double it for the return path on a single-phase circuit, get a voltage drop twice the real value, and over-size the conductor. On a domestic install this looks merely cautious; on a commercial design, the cumulative cost is material."
            doInstead="Read the Appendix 4 column heading. The single-phase mV/A/m column is round-trip — it already includes both line and neutral conductor resistance. Use Vd = (mV/A/m × Ib × L) / 1000 as-is. The same applies to the three-phase column, which already gives line-to-line drop with the √3 factor embedded."
          />

          <CommonMistake
            title="Sizing each leg of a sub-main + final circuit independently against 5 %"
            whatHappens="Sub-main designer sizes the feeder for 4.5 % drop ('inside the 5 % limit'). Final-circuit designer sizes the radial for 4.5 % drop on the same basis. Origin-to-terminal sum: 9 %. Equipment at the far end is well below its product standard's lower voltage limit. Reg 525.1 fails."
            doInstead="The 3 % / 5 % is an origin-to-terminals total, not a per-leg ceiling. Allocate before designing — typically ≤ 1-1.5 % to the sub-main, leaving ~3.5 % for the final circuit on a power radial (or ~1.5 % on a lighting branch). Document the allocation in the design log so the next person up the supply chain understands the budget they are inheriting."
          />

          <CommonMistake
            title="Using In (protective device rating) as the design current for voltage drop"
            whatHappens="A 32 A MCB protects a circuit whose actual diversified Ib is 18 A. Designer enters 32 A into the voltage drop calculation, gets a result that fails the 5 % limit, and over-sizes the cable. The cost is real, and the cable is then arguably under-utilised — both Iz and Vd headroom are excessive for the actual load."
            doInstead="Reg 311.1 names the design current Ib — the actual current the circuit will carry under normal service after diversity. Use Ib for voltage drop. Use In separately for the device coordination check (In ≥ Ib, In ≤ Iz, Reg 433.1.1). The two are different inputs to different checks; mixing them produces a coupled error that compounds across the design."
          />

          <SectionRule />

          <ContentEyebrow>Scenarios — applying it on the day</ContentEyebrow>

          <Scenario
            title="EV charger on a 50 m external run from a domestic CU"
            situation="Customer wants a 7 kW (32 A) tethered EV charger on the gable end of a detached garage, 50 m of cable run from the house consumer unit (15 m external in trunking on the wall, 35 m direct-buried SWA in a trench). Existing CU has spare capacity and a Type A 32 A RCBO way is available. Designer is choosing between 6 mm² and 10 mm² armoured."
            whatToDo="Compute Vd for both options at Ib = 32 A, L = 50 m. 6 mm² SWA copper, three-core, Reference Method D (buried) — Appendix 4 mV/A/m ≈ 7.3 → Vd = (7.3 × 32 × 50) / 1000 = 11.68 V (5.08 %), marginally over the 5 % limit. 10 mm² SWA — mV/A/m ≈ 4.4 → Vd = (4.4 × 32 × 50) / 1000 = 7.04 V (3.06 %), comfortably in budget. Specify 10 mm² SWA. Apply BS 7671 Section 722 separately for the EV-specific protective measures (Type A or B RCD per the charger's data sheet, PEN-fault protection, no PEN in the EV circuit on a TN-C-S supply per Reg 722.312.2.1)."
            whyItMatters="EV charging draws Ib for hours, and Reg 525.1 still applies at the charger terminals. Sustained operation at the bottom of the voltage tolerance triggers charger error codes ('EV charger refusing to start, customer convinced something is wrong with the unit') and warm-cable callbacks. Up-sizing once at design time is far cheaper than digging up the trench to swap the cable later."
          />

          <Scenario
            title="Three-phase 5.5 kW motor at the end of an 80 m sub-main"
            situation="Light-industrial unit. A three-phase 5.5 kW motor (rated current ~12 A, cosφ ≈ 0.85 lagging at full load, starts DOL with an inrush ≈ 6× FLC) sits 80 m down a sub-main from the main switchgear. Designer is choosing 4 mm² vs 6 mm² SWA copper for the sub-main."
            whatToDo="Three-phase Appendix 4 mV/A/m (4 mm² SWA copper, Reference Method E free-air): mVr ≈ 9.4, mVx ≈ 0.155, mVz ≈ 9.4 (reactance still small at 4 mm²). Apply the power-factor corrected formula: Vd ≈ (mVr × cosφ + mVx × sinφ) × Ib × L / 1000 = (9.4 × 0.85 + 0.155 × 0.527) × 12 × 80 / 1000 = (7.99 + 0.082) × 12 × 80 / 1000 = 8.07 × 12 × 80 / 1000 ≈ 7.75 V line-to-line, or 1.94 % of 400 V. Pass on steady state. Inrush check: 6× FLC ≈ 72 A for a few hundred ms — short-duration drop ≈ 46 V (11.6 %) at the motor terminals during DOL start. If other equipment shares the bus, that may flicker; consider a soft-starter or VSD, or use 6 mm² to halve the steady drop and the inrush dip."
            whyItMatters="Motors are the canonical case for the mVr / mVx power-factor correction. Treating mVz as if cosφ = 1 here would add ~0.5 % to the calculated drop and might push the designer to over-size the conductor. Inrush dip does not appear in Reg 525.1 directly — it is a Section 525.2 'voltage disturbance' / EMC consideration — but it is a routine on-site complaint and the design log should show that it was considered."
          />

          <SectionRule />

          <ContentEyebrow>Designer's quick reference</ContentEyebrow>

          <ConceptBlock
            title="The seven-step voltage-drop check"
            plainEnglish="Seven inputs, seven checks, one defensible result. If a future inspector asks how you arrived at the conductor size, this is the answer."
            onSite="(1) Establish Ib (Reg 311.1, after diversity). (2) Establish L (measured / as-built worst case). (3) Establish circuit type — lighting (3 %) or other (5 %), origin to terminals. (4) Read Appendix 4 mV/A/m for the cable, installation method, single- or three-phase. (5) Apply mVr / mVx power-factor correction if CSA ≥ 25 mm² and cosφ &lt; 1. (6) Compute Vd = (mV/A/m × Ib × L) / 1000 and the percentage. (7) Compare against Reg 525.202 limit AND Reg 525.1 equipment-specific lower limit; if either fails, upsize and recompute."
          >
            <p>
              The seven steps form the design log every cert needs to be defensible. Run them before
              the install, not after. On EV chargers, long sub-mains and any circuit where the run
              is over ~25-30 m at sustained high load, expect the check to bite — size the conductor
              for the voltage-drop check and the current-carrying check independently, then take the
              larger of the two. The best designs leave headroom on both — a circuit at 95 % of its
              Iz limit and 95 % of its Vd budget will survive one heat wave, one buried-cable derate
              or one minor route change; one at 60 % of both will survive most realistic surprises.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[6]} />

          <FAQ items={faqItems} />

          <KeyTakeaways
            points={[
              'Reg 525.1 is the principal duty: the voltage at fixed equipment terminals shall remain above the lower limit set by the equipment product standard. Reg 525.202 makes Appendix 4 Section 6.4 the deemed-to-satisfy route.',
              'Appendix 4 §6.4 figures: 3 % lighting / 5 % other uses on a public LV supply, measured origin to terminals; 6 % / 8 % on a private LV source. The percentages are cumulative across sub-mains and final circuits — not per-leg ceilings.',
              'Working formula: Vd = (mV/A/m × Ib × L) / 1000. Use Reg 311.1 design current Ib (after diversity). The Appendix 4 single-phase mV/A/m column already includes the return conductor; the three-phase column already includes √3. Do not double-count either.',
              'On larger CSAs (≥ ~25 mm²) use the mVr / mVx / mVz columns and apply mVr × cosφ + mVx × sinφ for the in-phase voltage drop on inductive loads (motors, VSDs).',
              'EV chargers and long sub-mains are the routine traps. Use full sustained Ib, real measured length, and treat the 5 % budget as a hard target with little margin. Allocate sensibly between sub-main (≤ ~1-1.5 %) and final circuit (≤ ~3-3.5 % for power, ≤ ~1.5 % for lighting).',
            ]}
          />

          <Quiz questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 3
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-3-section-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.5 Earthing arrangements
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default BS7671Module3Section4;
