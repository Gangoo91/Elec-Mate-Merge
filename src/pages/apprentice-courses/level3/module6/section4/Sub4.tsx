/**
 * Module 6 · Section 4 · Subsection 4 — Voltage drop design (mV/A/m method)
 * Maps to C&G 2365-03 / Unit 305 / LO4 / AC 4.4
 *   AC 4.4 — "Calculate voltage drop in cables and verify compliance with the limits in BS 7671 Appendix 4 Section 6.4"
 * Layered: 2366-03 Unit 304 / AC 4.4; 5393-03 Unit 104 / AC 4.4
 *
 * The voltage-drop gate. mV/A/m method end-to-end, the 3 percent lighting
 * and 5 percent other-loads limits from Appendix 4 §6.4, the percentage
 * conversion against 230 V, and engineering judgement on when to size up
 * for headroom rather than scrape compliance.
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
  VideoCard,
} from '@/components/study-centre/learning';
import { VoltageDropDiagram } from '@/components/study-centre/diagrams';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Voltage drop design — mV/A/m method (4.4) | Level 3 Module 6.4.4 | Elec-Mate';
const DESCRIPTION =
  'The voltage-drop gate end to end. mV/A/m method, the 3 percent lighting / 5 percent other-loads limits from BS 7671 Appendix 4 §6.4, percentage conversion against 230 V, and engineering judgement on when to size up.';

const checks = [
  {
    id: 'vd-basic',
    question:
      'A 30 m radial socket circuit at 32 A on 6 mm² T&E (mV/A/m ≈ 7.3) gives what voltage drop in volts?',
    options: ['7.0 V', '≈7.01 V', '≈7.30 V', '≈70.1 V'],
    correctIndex: 1,
    explanation:
      "Vd = (mV/A/m × Ib × L) / 1000 = (7.3 × 32 × 30) / 1000 = 7008 / 1000 = 7.008 V ≈ 7.01 V. As a percentage of 230 V that is 7.01 / 230 = 3.05 percent — inside the 5 percent non-lighting limit but only just. A designer would seriously consider 10 mm² to leave headroom.",
  },
  {
    id: 'vd-percent-limit',
    question:
      "A lighting circuit Vd of 6.4 V on a 230 V single-phase supply equates to what percentage, and does it pass the lighting limit from BS 7671 Appendix 4 §6.4?",
    options: [
      '2.78 percent — passes (below the 3 percent lighting limit).',
      '6.4 percent — fails.',
      '2.78 percent — fails the 3 percent lighting limit; you must size up.',
      '4.6 percent — passes.',
    ],
    correctIndex: 0,
    explanation:
      "Vd as a percentage = 6.4 / 230 = 0.0278 = 2.78 percent. The lighting limit is 3 percent. 2.78 is below 3 — the circuit passes. Just. Many designers would still size up to put headroom in, especially on a long run where future load changes (LED retrofits, dimmers, decorative additions) can push the load up.",
  },
  {
    id: 'vd-three-phase',
    question:
      'A 50 m three-phase 400 V industrial radial at 40 A on 16 mm² four-core thermosetting (mV/A/m ≈ 2.4 for the line-to-line column) gives what voltage drop, and what percentage?',
    options: [
      'Vd = 4.8 V; 1.2 percent — passes.',
      'Vd = 4.8 V; 2.09 percent — passes.',
      'Vd = 9.6 V; 4.0 percent — passes.',
      'Vd = 12 V; 3.0 percent — passes.',
    ],
    correctIndex: 0,
    explanation:
      "Vd = (mV/A/m × Ib × L) / 1000 = (2.4 × 40 × 50) / 1000 = 4.8 V. As a percentage of 400 V (the three-phase line-to-line voltage) that is 4.8 / 400 = 1.2 percent. Comfortably under the 5 percent non-lighting limit. The mV/A/m column for three-phase is line-to-line, not line-to-neutral; reading the wrong column halves or doubles your answer.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What does the mV/A/m figure published in BS 7671 Appendix 4 actually represent for a single-phase two-core cable?",
    options: [
      'The voltage drop per metre on the line conductor only.',
      "The voltage drop in millivolts, per amp of load, per metre of route length, including both line and neutral conductors (the out-and-back loop).",
      "The voltage drop per kilometre.",
      "The maximum voltage the cable can handle.",
    ],
    correctAnswer: 1,
    explanation:
      "mV/A/m for a two-core cable is the loop voltage drop — line out plus neutral back — in millivolts, normalised per amp of load and per metre of route length. The maths is built so you do not have to double the route length yourself; the figure already does that. For three-phase it is line-to-line and assumes a balanced load.",
  },
  {
    id: 2,
    question:
      'What is the BS 7671 voltage drop limit for a lighting circuit, expressed as a percentage of nominal voltage?',
    options: ['1 percent', '3 percent', '5 percent', '10 percent'],
    correctAnswer: 1,
    explanation:
      "BS 7671 Appendix 4 §6.4 gives 3 percent for lighting circuits and 5 percent for all other circuits, both as percentages of the nominal supply voltage (230 V single-phase or 400 V three-phase line-to-line). The lighting limit is tighter because lamp dimming, flicker and life are sensitive to voltage; modern LED drivers tolerate the wider range better than legacy filament gear, but the regulation has not been relaxed.",
  },
  {
    id: 3,
    question:
      "The voltage drop formula Vd = (mV/A/m × Ib × L) / 1000 — why divide by 1000?",
    options: [
      "To convert centimetres to metres.",
      "To convert millivolts (mV) into volts (V).",
      "To halve the loop length.",
      "It is a safety margin built into the formula.",
    ],
    correctAnswer: 1,
    explanation:
      "The mV/A/m table value is in millivolts. The formula multiplies it by amps and metres to get a millivolt total. Dividing by 1000 converts that millivolt total into volts so you can compare directly with the percentage limits expressed in volts. It is unit conversion, nothing more clever.",
  },
  {
    id: 4,
    question:
      'A 25 m lighting radial at 6 A on 1.5 mm² T&E (mV/A/m ≈ 29) gives Vd of:',
    options: ['1.5 V', '4.35 V', '7.2 V', '14.5 V'],
    correctAnswer: 1,
    explanation:
      "Vd = (29 × 6 × 25) / 1000 = 4350 / 1000 = 4.35 V. As a percentage of 230 V: 4.35 / 230 = 1.89 percent. Comfortably under the 3 percent lighting limit. 1.5 mm² T&E is the right call for a typical domestic lighting circuit at this length.",
  },
  {
    id: 5,
    question:
      "Why is the lighting Vd limit (3 percent) tighter than the non-lighting limit (5 percent)?",
    options: [
      "Lighting circuits draw more current.",
      "Lighting load is voltage-sensitive — lamp output, colour temperature, dimming smoothness and (for older filament gear) lamp life all degrade noticeably below ~220 V at the lampholder. The 3 percent limit keeps the lampholder above that threshold.",
      "Cables for lighting are smaller.",
      "There is no real reason.",
    ],
    correctAnswer: 1,
    explanation:
      "Lamp performance is strongly voltage-dependent at the bottom of the supply tolerance band. A 3 percent drop on 230 V leaves the lampholder at 223 V, comfortably inside the operating envelope. A 5 percent drop drops it to 218.5 V — fine for sockets feeding modern equipment but visibly affecting incandescent lamp output, dimming response and (historically) filament lamp life. The regulation reflects that historic distinction.",
  },
  {
    id: 6,
    question:
      "On a sub-main feeding a small commercial board, the cable run is 60 m, design current 80 A, supply is 400 V three-phase. Using a four-core thermosetting cable with mV/A/m = 1.5 (line-to-line), Vd is:",
    options: ['7.2 V (1.8 percent) — passes 5 percent.', '12 V (3.0 percent) — passes.', '14.4 V (3.6 percent) — fails on a sub-main.', '8 V (2.0 percent) — passes.'],
    correctAnswer: 0,
    explanation:
      "Vd = (1.5 × 80 × 60) / 1000 = 7.2 V. As a percentage of 400 V (line-to-line nominal): 7.2 / 400 = 0.018 = 1.8 percent. Comfortably inside the 5 percent limit for non-lighting. On a sub-main feeding downstream final circuits, you typically aim for at most 3 percent drop to leave headroom for the final-circuit Vd downstream — the 1.8 percent figure leaves loads of margin.",
  },
  {
    id: 7,
    question:
      "BS 7671 Appendix 4 §6.4 expresses the voltage drop limits in percentage form. What is the corresponding allowed Vd in volts on a 230 V single-phase supply for a lighting circuit?",
    options: ['2.3 V', '6.9 V', '11.5 V', '23.0 V'],
    correctAnswer: 1,
    explanation:
      "3 percent of 230 V = 0.03 × 230 = 6.9 V. That is the maximum allowed Vd from the origin of the installation to the lampholder for a lighting final circuit. For non-lighting it is 5 percent = 11.5 V.",
  },
  {
    id: 8,
    question:
      "A circuit just clears the Vd limit at 4.95 percent on a long radial. The customer adds a heat pump in three years that pushes the load up by 10 percent. What happens to the Vd, and is this a future compliance problem?",
    options: [
      'Vd stays the same — it is a property of the cable.',
      "Vd scales with current, so a 10 percent load uplift gives a 10 percent Vd uplift, taking 4.95 percent to ~5.45 percent — the circuit is now non-compliant and the customer needs the cable upsized. This is exactly why designers leave headroom rather than scrape the limit.",
      "Vd halves because the heat pump is more efficient.",
      "It only matters for lighting circuits.",
    ],
    correctAnswer: 1,
    explanation:
      "Vd is directly proportional to current, so any uplift in load gives a proportional uplift in Vd. A circuit that scrapes through at 4.95 percent now will fail at 5.45 percent after a modest load increase. Sizing up the cable to leave 1 percent of headroom (target around 4 percent on first install) bullet-proofs the install against typical future load growth.",
  },
];

const faqs = [
  {
    question: "Why does the voltage drop limit not depend on cable type or install method?",
    answer:
      "Because the limit is set by the load equipment’s tolerance to under-voltage, not by the cable’s thermal performance. Lamps, motors, electronics all need a minimum voltage at their terminals to function properly; the 3 percent lighting / 5 percent other limits are derived from those equipment tolerances. The cable’s thermal performance is the CCC story (Subs 1–3), which is independent of the Vd story.",
  },
  {
    question: "Where do the mV/A/m figures actually come from?",
    answer:
      "Cable resistance per metre at the conductor’s operating temperature, including the loop (out plus back for two-core, or line-to-line for three-phase balanced). The IEC committee that produces Appendix 4 calculates them from the conductor’s resistance and the cable’s reactance (which becomes meaningful at larger CSAs and higher currents). For small CSAs the resistive component dominates; for large CSAs the reactance component starts to matter and the figure becomes more complex — mV/A/m at 70 mm² and above splits into mVR (resistive), mVX (reactive) and mVZ (impedance) components.",
  },
  {
    question: "Why is the percentage measured against 230 V (or 400 V) rather than the actual supply voltage at the property?",
    answer:
      "BS 7671 uses the declared nominal voltage as the reference, not the measured supply voltage. This is partly for design consistency (so calcs do not depend on supply variation) and partly because the regulation’s purpose is to set a tolerance the load equipment can rely on regardless of the local supply. UK supply tolerance is 230 V +10/-6 percent (216–253 V); the Vd limit is added on top of whatever the supply is doing.",
  },
  {
    question: "Should I worry about Vd on a 5 m circuit?",
    answer:
      "Almost never. At typical design currents the Vd on a 5 m run is a fraction of a volt, well under any limit. The Vd gate matters most on long runs (over ~25 m for a 32 A radial; over ~15 m for a heavy fixed appliance like a shower or oven), on small CSAs (1.0 / 1.5 mm²) and on three-phase distribution where the percentage of nominal voltage is being tested at every node down the network.",
  },
  {
    question: "Does the Vd limit apply to the cable in isolation, or to the cumulative drop from supply to terminals?",
    answer:
      "Cumulative. The 3 percent / 5 percent limits in BS 7671 Appendix 4 §6.4 are measured from the origin of the installation (typically the consumer-unit terminals or supply intake) to the load terminals. On a system with a sub-main feeding a sub-board, the sub-main’s Vd plus the final-circuit’s Vd must together stay inside the limit. That is why sub-mains are usually designed to a tighter internal target (~2 percent) so the final circuits downstream still have 3 percent of headroom to use.",
  },
  {
    question: "How do I do voltage drop on a circuit with multiple branches, like a lighting radial with several luminaires?",
    answer:
      "Sum the Vd contributions from each segment. For a radial with luminaires at points along its length, the current in each segment is the sum of all loads downstream of that segment; multiply each segment’s mV/A/m by its segment current and segment length, then add all the segment Vd values together. The total at the furthest luminaire is what you compare to the 3 percent limit. For ring finals, you split the load between the two paths; specialist software handles this cleanly.",
  },
];

export default function Sub4() {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

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
            eyebrow="Module 6 · Section 4 · Subsection 4"
            title="Voltage drop design — the mV/A/m method"
            description="The Vd gate end to end. mV/A/m method, the 3 percent lighting / 5 percent other-loads limits from BS 7671 Appendix 4 §6.4, percentage conversion against the nominal supply voltage, and engineering judgement on when to size up rather than scrape the limit."
            tone="indigo"
          />

          <TLDR
            points={[
              'Voltage drop measures the volts lost between the origin of the installation (typically the CU) and the load terminals. BS 7671 Appendix 4 §6.4 sets two limits: 3 percent of nominal voltage for lighting circuits, 5 percent for everything else. Both are cumulative from origin to load.',
              'The mV/A/m method is the standard’s tabulated shortcut. Vd in volts = (mV/A/m × Ib × L) / 1000, where mV/A/m for two-core cable already includes the out-and-back loop. The figure is read from the relevant Appendix 4 table column matching your cable family and conductor CSA.',
              "Voltage drop is independent of CCC — a cable can clear its CCC compliance line and still fail Vd on a long run. Always run the Vd gate even when CCC has comfortable margin, especially for runs over ~25 m.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Calculate single-phase voltage drop using the mV/A/m method from BS 7671 Appendix 4 tables.',
              'Calculate three-phase line-to-line voltage drop using the matching three-phase mV/A/m column.',
              'Convert Vd in volts to a percentage of nominal supply voltage and compare to the 3 percent lighting / 5 percent non-lighting limits from Appendix 4 §6.4.',
              'Recognise that Vd is independent of CCC — a cable can pass CCC and fail Vd, especially on long runs and small CSAs.',
              'Apply engineering judgement to size up beyond the bare Vd compliance figure when future load growth, sub-main cumulative drops or marginal compliance suggest headroom is needed.',
              'Read the mV/A/m, mVR, mVX and mVZ columns correctly for larger CSAs where cable reactance becomes meaningful.',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock
            title="Why voltage drop matters — a load-tolerance story"
            plainEnglish="Equipment plugged into the end of a long cable does not see the full supply voltage. It sees the supply voltage minus whatever volts the cable has dropped along the way. If that drop is too large, the equipment runs out of tolerance — lamps dim and flicker, motors run hot, kettles take longer to boil, and electronic kit may not start at all."
            onSite="Voltage drop is a quality-of-supply issue, not a safety issue in the way CCC is. The cable with too much Vd does not catch fire — it just delivers a poor service that the customer notices and complains about. Hold the limit and the customer never knows there was a calculation."
          >
            <p>
              Every cable has resistance. Push current through that resistance and you lose volts — P = I²R is the cable’s heat output (the CCC concern), and V = IR is the same physics expressed as the voltage lost across the cable’s length (the Vd concern). For a typical 6 mm² T&E carrying 32 A over 25 m, the loop resistance is around 0.154 Ω and the lost voltage is 32 × 0.154 = 4.93 V. That is roughly 2.1 percent of 230 V — fine for a sockets circuit.
            </p>
            <p>
              The same current through a 1.5 mm² cable over the same 25 m gives a loop resistance closer to 0.61 Ω and a lost voltage of 32 × 0.61 = 19.5 V — 8.5 percent of 230 V, comfortably non-compliant. The Vd gate is what stops you putting a 32 A radial on 1.5 mm² cable for a long run, even if the CCC happened to allow it (which it does not, but the example illustrates the principle).
            </p>
            <p>
              The mV/A/m figure published in BS 7671 Appendix 4 condenses all of this into a single number per CSA per cable family per phase configuration: the millivolt drop, per amp of load, per metre of route length. Multiply mV/A/m by Ib by L, divide by 1000 (to convert millivolts to volts), and you have the Vd in volts. Done.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 525.202 (Voltage drop in consumers’ installations)"
            clause="The above requirements are deemed to be satisfied if the voltage drop between the origin of the installation (usually the supply terminals) and a socket-outlet or the terminals of fixed current-using equipment does not exceed that stated in Appendix 4, Section 6.4."
            meaning={
              <>
                Reg 525.202 is short because the actual numbers live in Appendix 4 §6.4. The
                regulation tells you to read those values and not exceed them. The limits
                themselves are 3 percent for lighting circuits and 5 percent for other circuits,
                measured from the origin of the installation through to the load terminals
                (not just the cable in isolation). Sub-mains plus final circuits in series
                must add up to at most the limit.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 52, Regulation 525.202; Vd limits in Appendix 4 §6.4."
          />

          <VoltageDropDiagram />

          <VideoCard
            url={videos.ohmsLaw.url}
            title={videos.ohmsLaw.title}
            channel={videos.ohmsLaw.channel}
            duration={videos.ohmsLaw.duration}
            topic="V = IR — the maths behind voltage drop"
            caption="Ohm's law is the underlying physics of every voltage-drop calc — current through a cable's resistance equals lost volts. The mV/A/m method in Appendix 4 is just Ohm's law repackaged per metre of cable."
          />

          <SectionRule />

          <ContentEyebrow>The mV/A/m method, end to end</ContentEyebrow>

          <ConceptBlock
            title="The formula — and what it actually computes"
            plainEnglish="Vd in volts = (mV/A/m × Ib × L) / 1000. The mV/A/m comes from BS 7671 Appendix 4 (or the OSG equivalent). Ib is the design current. L is the route length in metres. The /1000 converts millivolts to volts."
            onSite="Memorise the formula. You will use it dozens of times a day in design work. The harder part is reading the right mV/A/m column — single-phase two-core, three-phase three-core, three-phase four-core, larger CSA with split mVR / mVX columns — and getting the route length honest."
          >
            <p>
              The structure of the formula:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>mV/A/m</strong> — read from the BS 7671 Appendix 4 table matching your cable family (4D5 for 70 °C T&E, 4E5 for 90 °C thermosetting two-core, 4D2 / 4E2 for singles, etc.). The figure is in millivolts, per amp, per metre.
              </li>
              <li>
                <strong>Ib</strong> — the design current of the circuit (Sub 1). This is the steady-state load current you used in the CCC calc, not the device rating In.
              </li>
              <li>
                <strong>L</strong> — the cable route length in metres, one way (the loop is already in the mV/A/m for two-core; for three-phase the figure is line-to-line and assumes balanced load).
              </li>
              <li>
                <strong>/1000</strong> — unit conversion from millivolts to volts.
              </li>
            </ul>
            <p>
              Indicative mV/A/m values from BS 7671 Appendix 4 Table 4D5 (70 °C T&E, two-core, single-phase):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>1.0 mm² → mV/A/m ≈ 44</li>
              <li>1.5 mm² → mV/A/m ≈ 29</li>
              <li>2.5 mm² → mV/A/m ≈ 18</li>
              <li>4.0 mm² → mV/A/m ≈ 11</li>
              <li>6.0 mm² → mV/A/m ≈ 7.3</li>
              <li>10 mm² → mV/A/m ≈ 4.4</li>
              <li>16 mm² → mV/A/m ≈ 2.8</li>
              <li>25 mm² → mV/A/m ≈ 1.75</li>
            </ul>
            <p>
              Notice the pattern — mV/A/m drops roughly in proportion to CSA. A 6 mm² cable has roughly half the mV/A/m of a 4 mm²; a 10 mm² has roughly 60 percent of the 6 mm². The Vd gate is the most CSA-sensitive of the cable selection gates, which is why it is the most common driver of size-up decisions on long runs.
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

          <ContentEyebrow>The percentage limits from Appendix 4 §6.4</ContentEyebrow>

          <ConceptBlock
            title="3 percent for lighting, 5 percent for other circuits — and why"
            plainEnglish="BS 7671 Appendix 4 §6.4 sets two cumulative limits. Lighting circuits get a tighter 3 percent because lamp output and dimming smoothness are voltage-sensitive at the bottom of the supply tolerance band. Everything else gets 5 percent because most equipment tolerates the wider range without complaint."
            onSite="Hold the limit, but design with headroom. A circuit that just clears 4.95 percent today will fail when the customer adds even a modest extra load in five years. Target around 4 percent for non-lighting and 2.5 percent for lighting on first install — leave 1 percent of margin."
          >
            <p>
              The Appendix 4 §6.4 limits, expressed both as percentages and as volts on a 230 V single-phase supply:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Lighting circuits:</strong> 3 percent of nominal voltage = 6.9 V on 230 V single-phase, 12 V on 400 V three-phase line-to-line.
              </li>
              <li>
                <strong>Other circuits (including socket-outlets, fixed appliances, motor loads):</strong> 5 percent of nominal voltage = 11.5 V on 230 V single-phase, 20 V on 400 V three-phase line-to-line.
              </li>
            </ul>
            <p>
              The limits are cumulative from the origin of the installation (typically the consumer-unit terminals, sometimes the supply intake) through to the load terminals. On a system with a sub-main feeding a sub-board feeding a final circuit, the three Vd contributions in series must add up to at most the overall limit. That is why sub-mains are usually designed to an internal target of around 2 percent — the final circuits downstream still need their 3 percent of headroom for lighting compliance.
            </p>
            <p>
              The historical rationale for the 3 percent lighting limit is incandescent and discharge lamp behaviour. Filament lamps lose noticeably more output below 220 V at the lampholder; fluorescent ballasts can stop striking; older dimmers behave erratically. Modern LED drivers tolerate the wider range much better, but the regulation has not been relaxed because lighting installations still mix legacy and new gear, and decorative / architectural lighting often uses voltage-sensitive control gear.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Appendix 4, Section 6.4 (Voltage drop)"
            clause="In the absence of other considerations, the voltage drop between the origin of the installation and any load shall not exceed: 3% for lighting installations; 5% for other uses. These values are based on a nominal supply voltage of 230 V single-phase or 400 V three-phase."
            meaning={
              <>
                Appendix 4 §6.4 publishes the actual numbers that Reg 525.202 references.
                The phrase &quot;in the absence of other considerations&quot; matters — the
                regulation acknowledges that some equipment requires tighter Vd (motors with
                soft-start sensitivity, precision instrumentation, certain medical equipment)
                or accepts looser Vd (some industrial loads, contactor coils with wide voltage
                tolerance). For everyday domestic and commercial work, the 3 percent / 5 percent
                figures are the design floor.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Appendix 4, Section 6.4."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Three-phase voltage drop</ContentEyebrow>

          <ConceptBlock
            title="Three-phase mV/A/m — line-to-line, balanced load"
            plainEnglish="Three-phase tables publish mV/A/m as line-to-line for a balanced load. Use the three-phase column for three-phase circuits; use the single-phase column for single-phase circuits. Mixing them gives the wrong answer by a factor of √3."
            onSite="On commercial and industrial work you will routinely see three-phase circuits feeding three-phase boards. The mV/A/m figure is smaller than the equivalent single-phase column because the line-to-line voltage is higher (400 V vs 230 V) and the conductor configuration is more efficient. Always check the column header before reading."
          >
            <p>
              For three-phase balanced loads, the BS 7671 Appendix 4 tables publish a single mV/A/m figure that represents the line-to-line voltage drop. The formula is the same as for single-phase:
            </p>
            <p>
              <strong>Vd (line-to-line) = (mV/A/m × Ib × L) / 1000</strong>
            </p>
            <p>
              The percentage check is against the nominal three-phase line-to-line voltage (400 V in the UK), not the single-phase line-to-neutral voltage. So 5 percent of 400 V = 20 V is the non-lighting limit; 3 percent = 12 V is the lighting limit.
            </p>
            <p>
              Indicative mV/A/m values for 70 °C thermoplastic four-core (Table 4D2):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>2.5 mm² → mV/A/m ≈ 15 (line-to-line)</li>
              <li>6 mm² → mV/A/m ≈ 6.4</li>
              <li>16 mm² → mV/A/m ≈ 2.4</li>
              <li>35 mm² → mV/A/m ≈ 1.1 (resistive component)</li>
            </ul>
            <p>
              For unbalanced three-phase loads (single-phase loads connected line-to-neutral on different phases), the maths gets more complex — the neutral carries return current and contributes its own Vd. For typical commercial work with reasonably balanced loads, the standard’s line-to-line figure is good enough; for large unbalanced installations, specialist software handles the maths properly.
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

          <ContentEyebrow>Larger CSAs and the mVR / mVX / mVZ split</ContentEyebrow>

          <ConceptBlock
            title="When mV/A/m splits into resistive and reactive components"
            plainEnglish="Cables are mostly resistive at small CSAs, but at larger CSAs the inductive reactance starts to matter. BS 7671 Appendix 4 splits the figure for cables 70 mm² and above into mVR (resistive), mVX (reactive) and mVZ (impedance) so designers can compute Vd correctly under different load power factors."
            onSite="On everyday domestic and small commercial work you will rarely touch CSAs above 35 mm² and the simple mV/A/m figure is enough. On industrial sub-mains and supply-side cables (70 mm² and above) you must use the split figures with the load’s power factor."
          >
            <p>
              For small CSAs, the cable’s impedance is dominated by its resistance and the reactance is negligible. The standard publishes a single mV/A/m figure that bakes the (small) reactance contribution in at the assumed load power factor. For larger CSAs, the reactance becomes a meaningful fraction of the impedance, and the actual Vd depends on the load’s power factor.
            </p>
            <p>
              Above 70 mm² (or so — the threshold varies slightly by cable family), Appendix 4 publishes three columns:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>mVR</strong> — resistive component of the voltage drop, in mV/A/m. Used directly for unity-power-factor loads (resistive heating, incandescent lighting).
              </li>
              <li>
                <strong>mVX</strong> — reactive component, in mV/A/m. Used directly for purely reactive loads (rare in practice).
              </li>
              <li>
                <strong>mVZ</strong> — the magnitude of the impedance vector, in mV/A/m. Used as a worst-case figure assuming the load draws current at the impedance angle of the cable; conservatively over-estimates Vd for typical loads.
              </li>
            </ul>
            <p>
              For a load with power factor cos φ and angle φ:
            </p>
            <p>
              <strong>Vd = (mVR × cos φ + mVX × sin φ) × Ib × L / 1000</strong>
            </p>
            <p>
              The cos φ term reflects the in-phase (resistive) current; the sin φ term reflects the out-of-phase (reactive) current. For a typical motor load at PF = 0.85, the formula gives a Vd somewhere between the pure mVR and the pure mVZ figures. For everyday small-CSA design you do not need this level of detail; it kicks in on industrial sub-mains.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 132.2(a) (design documentation linked to Reg 132.13)"
            clause="The documentation referred to in Regulation 132.13 shall include the nature of current: AC and/or DC. Designers shall state whether the supply provides alternating current, direct current, or both as part of the supply-characteristics documentation. When the initial verification is made, the documentation concerning the selection of devices for coordination shall be added to the design documentation in accordance with the requirements of Regulation 132.13."
            meaning={
              <>
                A4:2026 renumbered the design-documentation duty from the old 132.12 to 132.13.
                The duty bites on Vd as much as on any other gate — your mV/A/m calc, the
                cable family used, the assumed Ib and the route length all need to be on the
                design pack so the next person looking at the install can see how the cable
                was sized. Reg 536.5 (selectivity) explicitly bolts coordination documentation
                onto the 132.13 pack at initial verification.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 132.2(a) and Regulation 132.13."
          />

          <SectionRule />

          <ContentEyebrow>Engineering judgement — when to size up</ContentEyebrow>

          <ConceptBlock
            title="Margin matters — design for tomorrow’s load, not today’s"
            plainEnglish="A cable that scrapes through Vd at 4.95 percent on first install is a future compliance failure waiting for a load uplift. Design with at least 1 percent of headroom against the limit and the install survives modest growth. The cost of the next CSA bracket is small; the cost of rewiring after a fail is large."
            onSite="Long buried runs, sub-mains, any cable concealed behind a finished wall, EV-ready supplies in domestic refurbs — these are the obvious size-up candidates. Customers nearly always thank you later for the headroom; they almost never thank you for scraping the limit."
          >
            <p>
              Vd is directly proportional to load current. A 10 percent uplift in Ib gives a 10 percent uplift in Vd. So a circuit that clears at 4.95 percent on first install fails at 5.45 percent after a modest load increase — perhaps the customer adds a heat pump (Ib up by 8–10 A on a 50 A sub-main), retrofits an EV charger (Ib up by 30 A on a household supply), or upgrades to a more powerful electric oven (Ib up by 5 A on a kitchen circuit).
            </p>
            <p>
              Designing with 1 percent of Vd headroom means the install can absorb a 20–30 percent load uplift before going non-compliant on Vd. On a domestic CU upgrade where the customer is unsure of their five-year future plans, that headroom is cheap insurance against a future call-back.
            </p>
            <p>
              Specific size-up triggers:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Vd above ~80 percent of the limit (above 2.4 percent for lighting, above 4 percent for other) — step up one CSA bracket.</li>
              <li>Long buried runs (above 25 m) where future re-cabling would be disruptive.</li>
              <li>Sub-mains feeding sub-boards — always design to a tighter internal target so downstream final circuits have margin.</li>
              <li>EV-ready or heat-pump-ready supplies in domestic refurbs — size to the future load, not the current load.</li>
              <li>Concealed cable runs that are mechanically expensive to upgrade later (in walls, under floors, in conduit chases).</li>
            </ul>
            <p>
              The opposite case — size <em>down</em> to bare compliance — is rarely worth the saving. The copper price difference between, say, 6 mm² and 10 mm² over a 30 m run is usually under £50; the labour saving is zero (the install effort is the same); the customer goodwill saving from never having a Vd complaint is meaningful.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Cumulative voltage drop on multi-stage distribution</ContentEyebrow>

          <ConceptBlock
            title="Sub-main + final-circuit Vd budget — the cumulative limit"
            plainEnglish="The Appendix 4 §6.4 limits (3 % lighting, 5 % other) are cumulative from origin to load terminals. On a two-stage distribution (origin → sub-main → DB → final circuit → load), the Vd of every stage in series adds up. Designing the sub-main to use 4 % of the budget leaves only 1 % for the final circuit — typically infeasible. Sub-mains are conventionally designed to ~2 % to leave ~3 % for the final circuit downstream."
            onSite="On a domestic CU upgrade with a sub-main feeding a kitchen sub-board (e.g. a garage CU fed from the main CU), run the cumulative calc. The 5 % limit is the total at the load — work backwards from the worst-case furthest accessory."
          >
            <p>
              Worked example. A semi-detached property has a main CU at the supply intake, a sub-main running 25 m to a garage CU, and from the garage CU a 15 m radial to a 32 A EV charger. All the cabling is single-phase 230 V.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Stage 1 — origin to garage CU.</strong> Sub-main 25 m, 16 mm² SWA, Ib = 32 A (the EV charger plus a small lighting load). mV/A/m for 16 mm² four-core SWA ≈ 2.8 (line-to-line at 400 V) — but here single-phase from an L1 + N pair, use the single-phase column ≈ 2.8 mV/A/m × 2 (single-phase loop) = 5.6 mV/A/m equivalent. Vd = (5.6 × 32 × 25) / 1000 = 4.48 V = 1.95 % of 230 V.
              </li>
              <li>
                <strong>Stage 2 — garage CU to EV charger.</strong> Final circuit 15 m, 6 mm² T&E, Ib = 32 A. mV/A/m ≈ 7.3. Vd = (7.3 × 32 × 15) / 1000 = 3.50 V = 1.52 % of 230 V.
              </li>
              <li>
                <strong>Cumulative.</strong> 1.95 + 1.52 = 3.47 % at the EV charger terminals. Inside the 5 % non-lighting limit. Pass.
              </li>
            </ul>
            <p>
              Now consider what happens if the sub-main is undersized — say 10 mm² SWA on the same run. mV/A/m for 10 mm² four-core SWA ≈ 4.4 single-phase loop. Vd = (4.4 × 32 × 25) / 1000 = 3.52 V = 1.53 %. Adding the final circuit's 1.52 % gives a cumulative 3.05 % — still passes 5 %, but if the EV charger ever upgrades to 7.4 kW (32 A continuous instead of typical 25 A average) or the sub-main also feeds garage lighting and sockets, the headroom evaporates fast.
            </p>
            <p>
              <strong>Sub-main design targets:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Single-tier sub-main + non-lighting final.</strong> Sub-main ≤ 2 %, final ≤ 3 %, total ≤ 5 %.
              </li>
              <li>
                <strong>Single-tier sub-main + lighting final.</strong> Sub-main ≤ 1 %, lighting final ≤ 2 %, total ≤ 3 %. The lighting limit is the binding constraint.
              </li>
              <li>
                <strong>Two-tier sub-mains (main → sub-main → sub-sub-main → final).</strong> Each tier ≤ 1 %, final ≤ 2 % for non-lighting (5 % total) or ≤ 1 % for lighting (3 % total). Three-stage cumulative budgets are tight.
              </li>
            </ul>
            <p>
              Document the cumulative Vd calc on the design pack — every stage's contribution plus the cumulative total at the worst-case load. The next inspector / future designer can verify that any added load doesn't break the cumulative budget.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Motor starting Vd — the in-rush dip and Reg 552.1.1 limit"
            plainEnglish="Motors draw a starting current of typically 5-7 × the running current for a few seconds during run-up. That high in-rush current causes a much larger Vd than the steady-state calc gives. The in-rush Vd dip can prevent contactors from holding in, cause neighbouring lighting to flicker, and on some drives prevent the motor from actually starting. Reg 552.1.1 sets a 4 % Vd limit on motor starting from CU."
            onSite="On industrial fit-outs with significant motor load (compressors, pumps, lifts, conveyors), the steady-state Vd calc is half the picture. Run the starting Vd calc separately using the motor's stall / starting current and verify the dip stays under 4 % per Reg 552.1.1. For very large motors (above ~30 kW) consider soft-start or VFD to limit in-rush."
          >
            <p>
              Motor starting Vd workflow:
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Get the motor's starting current</strong> from the nameplate or manufacturer datasheet. Typical direct-on-line start: Ist = 6-7 × IFL (full-load current). Star-delta start: Ist = 2-3 × IFL. Soft-start: Ist = 1.5-3 × IFL programmable. VFD: Ist = 1-1.5 × IFL.
              </li>
              <li>
                <strong>Calculate Vd with Ist instead of IFL.</strong> Vd_start = (mV/A/m × Ist × L) / 1000. Use the same cable mV/A/m as for the steady-state calc; the cable doesn't change.
              </li>
              <li>
                <strong>Compare to Reg 552.1.1 limit.</strong> The limit is typically 4 % during starting (some manufacturers / installations target 3 % for sensitive control gear). Vd_start as a percentage of nominal voltage = Vd_start / 230 (single-phase) or / 400 (three-phase line-to-line).
              </li>
              <li>
                <strong>If Vd_start fails:</strong> options are (a) larger cable (lower mV/A/m → lower Vd at same current), (b) soft-start or VFD on the motor (lower starting current), (c) nearer DB (shorter cable run).
              </li>
            </ol>
            <p>
              <strong>Worked example.</strong> Workshop compressor, 7.5 kW three-phase 400 V, IFL = 14 A, DOL start with Ist = 6 × IFL = 84 A. Cable run from DB to compressor 30 m, 4 mm² four-core SWA (mV/A/m ≈ 11 line-to-line). Steady-state Vd = (11 × 14 × 30)/1000 = 4.62 V = 1.16 % — fine. Starting Vd = (11 × 84 × 30)/1000 = 27.7 V = 6.93 % of 400 V — exceeds 4 % limit. Options:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Upsize cable to 10 mm² four-core</strong> (mV/A/m ≈ 4.4): Vd_start = (4.4 × 84 × 30)/1000 = 11.1 V = 2.77 % — passes. Cable cost up but problem solved.
              </li>
              <li>
                <strong>Specify a soft-start</strong> (Ist limited to ~3 × IFL = 42 A): Vd_start = (11 × 42 × 30)/1000 = 13.86 V = 3.47 % — passes on existing 4 mm² cable. Soft-start cost typically £200-500 for this motor size, often less than the cable upsize on long runs.
              </li>
              <li>
                <strong>Specify a VFD</strong> (Ist limited to ~1.5 × IFL): Vd_start = (11 × 21 × 30)/1000 = 6.93 V = 1.73 % — passes comfortably. VFD also gives soft-stop, speed control and energy savings — often the right answer for new industrial installs.
              </li>
            </ul>
            <p>
              Document both the steady-state Vd and the starting Vd calculations on the design pack, with the starting current source clearly cited. On industrial work the starting Vd is often the binding constraint and frequently drives a cable size up by one or two brackets above what steady-state alone would suggest.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Things that catch people out</ContentEyebrow>

          <CommonMistake
            title="Forgetting that Vd is independent of CCC — passing CCC and skipping Vd"
            whatHappens={
              <>
                The apprentice runs the CCC calc, picks 6 mm² because that clears 32 A with
                derates, and writes the cable up. They never run the Vd gate because CCC was
                comfortable. The 50 m kitchen radial in the converted barn comes in at 7.3 percent
                Vd at the furthest socket. Kettle takes 30 percent longer to boil, dishwasher
                struggles to start, customer complains, an inspector codes the install on a
                periodic five years later for non-compliance with Reg 525.202.
              </>
            }
            doInstead={
              <>
                Always run both gates. CCC is about the cable cooking; Vd is about the load
                seeing enough voltage. They are independent checks measuring different things.
                A short fat cable can comfortably pass CCC and still fail Vd if the run is long
                enough. Size to satisfy whichever gate demands the larger CSA, then verify both
                pass independently. Document both calcs on the design sheet.
              </>
            }
          />

          <Scenario
            title="A 75 m sub-main from CU to detached studio — Vd governs the calc"
            situation={
              <>
                You are designing a 60 A sub-main from a domestic CU to a detached studio
                75 m away across the garden. Buried SWA in clay soil. CCC alone resolves at
                16 mm² (Iz comfortably above In = 60 A). The Vd calc on 16 mm² four-core
                (mV/A/m ≈ 2.4) gives Vd = (2.4 × 60 × 75) / 1000 = 10.8 V — that is
                10.8 / 230 = 4.7 percent on the single-phase supply. Just under 5 percent
                non-lighting limit, but the studio has its own sub-board with several final
                circuits downstream that need their own Vd headroom.
              </>
            }
            whatToDo={
              <>
                Size the sub-main on Vd, not on CCC. Step up to 25 mm² SWA (mV/A/m ≈ 1.5)
                and Vd drops to (1.5 × 60 × 75) / 1000 = 6.75 V = 2.93 percent. The
                downstream final circuits now have over 2 percent of headroom for their own Vd
                and the cumulative compliance is comfortably inside both the 3 percent lighting
                limit (where applicable) and the 5 percent other-loads limit. The CSA step
                from 16 mm² to 25 mm² SWA is a real cost (perhaps £300–£500
                more in copper and slightly heavier glands) but it bullet-proofs the studio
                supply against future load growth.
              </>
            }
            whyItMatters={
              <>
                Sub-mains nearly always size on Vd rather than CCC. The route lengths are
                long, the design currents are high, and the cumulative Vd budget has to be
                shared with downstream final circuits. Always treat sub-mains as a Vd-first
                problem and verify CCC second.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Voltage drop = (mV/A/m × Ib × L) / 1000. The mV/A/m figure comes from BS 7671 Appendix 4 (or the OSG equivalent) for your cable family and CSA. The /1000 converts millivolts to volts.',
              'Vd limits from Appendix 4 §6.4: 3 percent for lighting circuits (6.9 V on 230 V single-phase), 5 percent for other circuits (11.5 V on 230 V single-phase). Limits are cumulative from origin of installation to load terminals.',
              'Vd is independent of CCC. A cable can clear its CCC compliance line and still fail Vd, especially on long runs and small CSAs. Always run both gates.',
              'Sub-mains usually size on Vd rather than CCC because route lengths are long and the cumulative budget has to be shared with downstream final circuits. Design sub-mains to ~2 percent Vd to leave room for final-circuit Vd downstream.',
              'For three-phase circuits, the mV/A/m table value is line-to-line, balanced-load. Convert to percentage against the 400 V nominal line-to-line voltage, not the 230 V single-phase nominal.',
              'For larger CSAs (above ~70 mm²), the mV/A/m figure splits into mVR (resistive), mVX (reactive) and mVZ (impedance). Use the load’s power factor to compute Vd correctly: Vd = (mVR cos φ + mVX sin φ) × Ib × L / 1000.',
              'Size up beyond bare Vd compliance whenever the calc lands above ~80 percent of the limit, on long buried runs, on sub-mains, and on EV / heat-pump-ready supplies in refurbs. The cost of the next CSA bracket is small; the cost of future re-wiring is not.',
            ]}
          />

          <Quiz title="Voltage drop — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module6-section4-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                4.3 Correction factors
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module6-section4-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                4.5 Thermal constraint t &lt; kS²/I²
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
