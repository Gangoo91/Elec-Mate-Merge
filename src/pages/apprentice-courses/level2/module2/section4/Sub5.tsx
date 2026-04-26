/**
 * Module 2 · Section 4 · Sub 5 — Power in series and parallel circuits
 * City & Guilds 2365-02 → Unit 202 → LO4 → AC 4.6
 * Polished from relocated content during the Module 2 LO restructure.
 */
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PowerCalculator } from '@/components/apprentice-courses/PowerCalculator';
import EnergyCostCalc from '@/components/apprentice-courses/EnergyCostCalc';
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
import { PowerTriangle } from '@/components/study-centre/diagrams';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Power in series and parallel circuits | Level 2 Module 2.4.5 (AC 4.6) | Elec-Mate';
const DESCRIPTION =
  'Three power formulas (P = V × I, P = I² × R, P = V² ÷ R), how power shares between resistors in series and parallel, kWh energy and cable heating for Level 2 apprentices.';

/* ── Inline check questions ───────────────────────────────────────── */

const checks = [
  {
    id: 'power-formula-pick',
    question:
      'You know a kettle draws 8.7 A on a 230 V supply. Which formula gets you the power fastest?',
    options: ['P = V × I', 'P = I² × R', 'P = V² ÷ R', 'P = R ÷ V'],
    correctIndex: 0,
    explanation:
      'You’ve got V and I directly, so P = V × I = 230 × 8.7 ≈ 2001 W ≈ 2 kW. Pick the formula that uses what you already have.',
  },
  {
    id: 'cable-heating-doubling',
    question:
      'You double the current in a cable. How much does the I²R heating change?',
    options: ['It doubles', 'It quadruples (×4)', 'It stays the same', 'It halves'],
    correctIndex: 1,
    explanation:
      'Heat is proportional to I squared. Double the current = 2² = 4 times the heating. Triple it = 9× the heating. This is why grouped or undersized cables overheat fast under load.',
  },
  {
    id: 'series-vs-parallel-power',
    question:
      'Two identical 100 Ω resistors share a 12 V supply. Do they dissipate more total power in series, or in parallel?',
    options: [
      'Series — more total resistance',
      'Parallel — less total resistance',
      'Both the same',
      'Depends on the supply current',
    ],
    correctIndex: 1,
    explanation:
      'P = V² ÷ R. In series Rt = 200 Ω so P = 144 ÷ 200 = 0.72 W. In parallel Rt = 50 Ω so P = 144 ÷ 50 = 2.88 W. Lower resistance on the same voltage means more power.',
  },
];

/* ── Quiz questions ───────────────────────────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question: 'A 230 V heater draws 8 A. The power is roughly…',
    options: ['184 W', '1.84 kW', '18.4 kW', '0.034 kW'],
    correctAnswer: 1,
    explanation:
      'P = V × I = 230 × 8 = 1840 W ≈ 1.84 kW. Around the size of a fan heater. Quick sanity check: 13 A plug fuse handles up to 3 kW, so 8 A on a 230 V circuit is well inside that — sounds right for a 2 kW heater on a domestic socket.',
  },
  {
    id: 2,
    question: 'Cable I²R heating mainly depends on…',
    options: [
      'Voltage across the supply',
      'Current and the cable’s resistance',
      'Cable colour',
      'Frequency only',
    ],
    correctAnswer: 1,
    explanation:
      'Power lost as heat in the conductor is I² × R. Bigger current, more heat. Bigger cable resistance (long run, small CSA), more heat.',
  },
  {
    id: 3,
    question: 'At a fixed 230 V, which load dissipates more power?',
    options: ['A 460 Ω load', 'A 920 Ω load', 'Both the same', 'Need current to decide'],
    correctAnswer: 0,
    explanation: 'P = V² ÷ R. Lower R on the same V gives more power. 230² ÷ 460 ≈ 115 W; 230² ÷ 920 ≈ 57.5 W.',
  },
  {
    id: 4,
    question: 'You know I and R but not V. Which power formula fits?',
    options: ['P = V × I', 'P = I² × R', 'P = V² ÷ R', 'P = V ÷ I'],
    correctAnswer: 1,
    explanation:
      'Use P = I² × R when you have current and resistance. Common for cable losses and series components where I is shared.',
  },
  {
    id: 5,
    question: 'Total power in a parallel circuit equals…',
    options: [
      'The smallest branch power',
      'The largest branch power',
      'The sum of all branch powers',
      'V² ÷ smallest R only',
    ],
    correctAnswer: 2,
    explanation:
      'Each branch dissipates its own P = V × I, where V is the supply. Total = sum of branch powers (just like total current = sum of branch currents).',
  },
  {
    id: 6,
    question: 'A 17.6 Ω element on a 230 V supply draws approximately…',
    options: ['13 A', '4 A', '40 A', '1.3 A'],
    correctAnswer: 0,
    explanation: 'I = V ÷ R = 230 ÷ 17.6 ≈ 13 A. That’s a kettle-sized load.',
  },
  {
    id: 7,
    question: 'How much does it cost to run a 2 kW heater for 4 hours at 28p per kWh?',
    options: ['£0.56', '£1.12', '£2.24', '£0.28'],
    correctAnswer: 2,
    explanation:
      'Energy = 2 kW × 4 h = 8 kWh. Cost = 8 × £0.28 = £2.24. The kWh is the unit your bill is in.',
  },
  {
    id: 8,
    question:
      'Two identical 100 Ω resistors are connected first in series, then in parallel, across the same 12 V supply. Total power dissipated is…',
    options: [
      'The same in both arrangements',
      'Higher in series',
      'Higher in parallel',
      'Zero in series',
    ],
    correctAnswer: 2,
    explanation:
      'Series Rt = 200 Ω → P = 144 ÷ 200 = 0.72 W. Parallel Rt = 50 Ω → P = 144 ÷ 50 = 2.88 W. Parallel = 4× the power for the same supply, because current is much higher.',
  },
];

/* ── FAQs ─────────────────────────────────────────────────────────── */

const faqs = [
  {
    question: 'Why are there three power formulas?',
    answer:
      'Same physics, different starting points. P = V × I if you have voltage and current. P = I² × R if you have current and resistance. P = V² ÷ R if you have voltage and resistance. Pick whichever uses the values you already know — they all give the same answer.',
  },
  {
    question: 'How do power calcs differ between series and parallel?',
    answer:
      'In series, current is the same through every component, so P = I²R is the natural fit and the bigger resistor dissipates more power. In parallel, voltage is the same on every branch, so P = V² ÷ R fits and the smaller resistor dissipates more power. Total power either way is the sum of every component’s individual power.',
  },
  {
    question: 'Why does cable heating matter — isn’t it tiny?',
    answer:
      'It’s small per metre but it adds up. A 32 A radial running 6 mm² over 40 m loses ≈252 W round-trip (≈126 W in each conductor) under full load. That heat has to go somewhere — and if cables are grouped, lagged or in insulation, derating factors apply. Get this wrong and the cable cooks.',
  },
  {
    question: 'What is a kWh and how is it different from a kW?',
    answer:
      'kW is power — how fast you’re using energy. kWh is energy — how much you’ve used over time. Energy (kWh) = power (kW) × time (h). A 3 kW kettle on for 6 minutes uses 0.3 kWh. Your electricity meter ticks up in kWh because that’s what the supplier bills you for.',
  },
  {
    question: 'Does power factor come into Level 2 power calculations?',
    answer:
      'Not really. Level 2 sticks to DC and pure resistive AC loads (heaters, filament lamps, kettles), where P = V × I works directly. Power factor matters when you’ve got motors, transformers and capacitive loads — Level 3 territory.',
  },
  {
    question: 'How does this link to cable sizing?',
    answer:
      'Power and current are tied through Ohm’s law. Once you know the load power, you can work out the current it’ll draw (I = P ÷ V), pick a cable that handles that current with the volt-drop allowance, and pick a protective device that disconnects in the required time. Power calcs are the first link in the design chain.',
  },
];

const Sub5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-10 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 4
          </button>

          <PageHero
            eyebrow="Module 2 · Section 4 · Subsection 5"
            title="Power in series and parallel circuits"
            description="Three formulas, one rule. Pick the formula that uses the values you have, sum the component powers for the total, and remember — heat in cables goes up with the SQUARE of the current."
            tone="emerald"
          />

          <TLDR
            points={[
              'Three power formulas — P = V × I, P = I² × R, P = V² ÷ R. Same answer, different starting values.',
              'Total power = sum of component powers, in both series and parallel. In series the largest R dissipates most; in parallel the smallest R does.',
              'Cable heating is I²R — double the current and the heat goes up FOUR times. Energy on your bill is kWh: kWh = kW × hours.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State all three power formulas and choose the right one based on the values available.',
              'Calculate total power dissipated in a series circuit, recognising that the largest resistor takes the largest share.',
              'Calculate total power in a parallel circuit, recognising that the smallest resistor takes the largest share.',
              'Convert between W and kW, and between kW power and kWh energy for billing-style calculations.',
              'Estimate cable heating losses (I²R) and explain why the squared term makes overcurrent so dangerous.',
              'Spot when a load is mismatched to its supply — undersized cable, oversized appliance — by sanity-checking the power against UK norms.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The three power formulas</ContentEyebrow>

          <ConceptBlock
            title="P = V × I, P = I² × R, P = V² ÷ R"
            plainEnglish="Same physics, three angles in. Pick whichever formula uses the values you already have."
            onSite="On a real install, you usually know the supply voltage and a nameplate current OR a nameplate power. Start there. The other formulas are for verifying losses and heat."
          >
            <p>
              Power is energy per second. Measured in watts (W), where 1 W = 1 J/s. Three
              formulas all describe the same thing:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>P = V × I</strong> — most common. Use it when you have voltage and
                current. Nameplate readings, meter values, quick estimates.
              </li>
              <li>
                <strong>P = I² × R</strong> — use when you have current and resistance. Cable
                losses, heat in conductors, power lost in series components.
              </li>
              <li>
                <strong>P = V² ÷ R</strong> — use for fixed-voltage resistive loads. Heater
                elements, kettle elements, filament lamps. Fixed mains, known resistance.
              </li>
            </ul>
            <p>
              All three are derived from V = I × R. Substitute one into another and you get the
              other two — they’re the same equation in three outfits.
            </p>
          </ConceptBlock>

          <PowerTriangle variant="dc" caption="P = I × V — the DC power triangle. Cover the value you want; the formula falls out." />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Power in a series circuit</ContentEyebrow>

          <ConceptBlock
            title="Same current through everyone — biggest R takes biggest power"
            plainEnglish="Series circuits share current. So whichever resistor has the most ohms also dissipates the most heat."
          >
            <p>
              In a series circuit, the same current flows through every component. Plug that into
              P = I² × R and you can see straight away — the resistor with the largest R
              dissipates the most power, because it’s the only thing that varies.
            </p>
            <p>
              <strong>Worked example.</strong> 12 V supply, R₁ = 100 Ω, R₂ = 200 Ω, R₃ = 300 Ω
              all in series.
            </p>
            <p>
              Step 1 — total resistance: Rt = 100 + 200 + 300 = 600 Ω.
              <br />
              Step 2 — current: I = 12 ÷ 600 = 0.02 A.
              <br />
              Step 3 — power per component (using P = I²R):
              <br />
              P₁ = 0.02² × 100 = 0.0004 × 100 = 0.04 W.
              <br />
              P₂ = 0.02² × 200 = 0.0004 × 200 = 0.08 W.
              <br />
              P₃ = 0.02² × 300 = 0.0004 × 300 = 0.12 W.
              <br />
              Step 4 — total power: 0.04 + 0.08 + 0.12 = 0.24 W.
              <br />
              Cross-check using P = V × I on the whole circuit: 12 × 0.02 = 0.24 W ✓.
            </p>
            <p>
              Notice R₃ (the biggest) takes 0.12 W — half the total. R₁ takes a quarter as much
              as R₃. That ratio is just the resistance ratio: 100 : 200 : 300 = 1 : 2 : 3, same
              as the power ratio.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Power in a parallel circuit</ContentEyebrow>

          <ConceptBlock
            title="Same voltage on every branch — smallest R takes biggest power"
            plainEnglish="Parallel branches all see the supply voltage. The branch with the smallest R draws the biggest current and dissipates the most heat."
          >
            <p>
              In parallel, every branch sees the supply voltage. Plug that into P = V² ÷ R and
              the branch with the SMALLEST R dissipates the most power — opposite to series.
            </p>
            <p>
              <strong>Worked example.</strong> 24 V supply with three parallel branches: R₁ = 120
              Ω, R₂ = 80 Ω, R₃ = 240 Ω.
            </p>
            <p>
              Each branch sees 24 V. Use P = V² ÷ R for each:
              <br />
              P₁ = 24² ÷ 120 = 576 ÷ 120 = 4.8 W.
              <br />
              P₂ = 24² ÷ 80 = 576 ÷ 80 = 7.2 W.
              <br />
              P₃ = 24² ÷ 240 = 576 ÷ 240 = 2.4 W.
              <br />
              Total = 4.8 + 7.2 + 2.4 = 14.4 W.
            </p>
            <p>
              Cross-check using P = V × I on the whole circuit: total current = 0.6 A (worked
              out in Sub 3). P = 24 × 0.6 = 14.4 W ✓. Same total either way you slice it.
            </p>
            <p>
              R₂ (the smallest at 80 Ω) takes the most power — 7.2 W out of 14.4 W. The biggest
              resistor (240 Ω) takes the least. That’s the opposite of series, and worth burning
              into memory.
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

          <ContentEyebrow>Try it yourself</ContentEyebrow>

          <ConceptBlock title="The power calculator">
            <p>
              Plug in any two of voltage, current, resistance or power and the calculator returns
              the rest. Use it to check the worked examples above and any of your own. The exam
              doesn’t let you bring this in — keep practising the manual maths.
            </p>
          </ConceptBlock>

          <PowerCalculator />

          <SectionRule />

          <ContentEyebrow>Cable heating — why I² matters so much</ContentEyebrow>

          <ConceptBlock
            title="Heat in a cable goes up with the SQUARE of the current"
            plainEnglish="Doubling the current quadruples the heating. Tripling it gives nine times. Tiny rises in current cause big rises in heat."
            onSite="This is why an undersized or grouped cable cooks under sustained overload. The cable itself doesn’t change — but if current creeps from 25 A to 32 A, the heat goes up by 32² ÷ 25² ≈ 1.64×, not 1.28×."
          >
            <p>
              The heat dissipated in a conductor is P = I² × R, where R is the cable’s own
              resistance. The current term is squared — it dominates everything else.
            </p>
            <p>
              <strong>Worked example.</strong> A 32 A radial circuit, 6 mm² T&amp;E, 40 m run.
              Cable resistance roughly 3.08 mΩ per metre per conductor. Round-trip resistance
              (line + neutral): 2 × 3.08 × 40 = 246 mΩ ≈ 0.246 Ω.
            </p>
            <p>
              At full load: P(loss) = I² × R = 32² × 0.246 = 1024 × 0.246 ≈ 252 W lost as heat
              in the cable. (Roughly double the figure you might have seen using single-conductor
              resistance — be clear whether you’re working with line-only or both legs.)
            </p>
            <p>
              That heat has to escape. Group cables together, push them into thermal insulation,
              or run them in a hot ceiling void and the derating factors in BS 7671 Appendix 4
              kick in to keep the conductor temperature inside its rating.
            </p>
            <p>
              <strong>The squared rule, in numbers — 2.5 mm² T&amp;E, R/m ≈ 7.41 mΩ/m per
              conductor:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70 font-mono tabular-nums">
              <li>10 A → I²R = 10² × 0.00741 = 0.741 W per metre per conductor.</li>
              <li>20 A → I²R = 20² × 0.00741 = 2.96 W per metre per conductor (4× the 10 A figure).</li>
              <li>30 A → I²R = 30² × 0.00741 = 6.67 W per metre per conductor (9× the 10 A figure).</li>
            </ul>
            <p>
              Read the column. Doubling current (10 A → 20 A) doesn’t double the heat — it
              quadruples it. Tripling current (10 A → 30 A) gives nine times. That squared
              relationship is what cooks an undersized cable when the load creeps up. The cable
              hasn’t changed; the heat has.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Appendix 4 (rating factors for thermal effects)"
            clause="Thermal effects due to the presence of third harmonic or multiples of third harmonic currents and the corresponding rating factors for higher harmonic currents are given in Appendix 4, Section 5.5."
            meaning={
              <>
                Translation — extra current sources (like harmonic distortion from non-linear
                loads) push extra I²R losses into conductors and especially the neutral. The
                regs require you to apply derating factors so the cable still stays within its
                temperature rating. Same I²R maths you’ve just used, but with realistic
                site-condition adjustments.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Appendix 4, Section 5.5"
          />

          <SectionRule />

          <ContentEyebrow>Energy on your bill — kWh, not kW</ContentEyebrow>

          <ConceptBlock
            title="Energy = power × time. The unit is the kWh."
            plainEnglish="Power is the rate of energy use. Energy is what gets billed. One kilowatt running for one hour uses one kilowatt-hour."
          >
            <p>
              Your supplier doesn’t care about peak watts — they bill per kWh of energy. The
              maths is simple:
            </p>
            <p>
              <strong>Energy (kWh) = Power (kW) × Time (h).</strong>
            </p>
            <p>
              <strong>Worked example 1.</strong> A 3 kW kettle, on for 6 minutes (0.1 h). Energy
              = 3 × 0.1 = 0.3 kWh. At 28p per kWh, the cup of tea costs 0.3 × £0.28 = £0.084 (8p
              of energy).
            </p>
            <p>
              <strong>Worked example 2.</strong> A 2 kW heater on for 4 hours. Energy = 2 × 4 = 8
              kWh. At 28p per kWh, that’s 8 × £0.28 = £2.24 to keep one room warm for an evening.
            </p>
            <p>
              The kWh is the same energy unit you’ll see on inverter logs, EV dashboards and
              every electricity bill in the UK. Get comfortable with the conversion both ways.
            </p>
          </ConceptBlock>

          <EnergyCostCalc />

          <VideoCard
            url={videos.kwh.url}
            title={videos.kwh.title}
            channel={videos.kwh.channel}
            duration={videos.kwh.duration}
            topic={videos.kwh.topic}
            caption="Short walk-through on kWh, energy bills and how power and time multiply into the unit your supplier actually charges for."
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Forgetting to square the current in cable heating"
            whatHappens={
              <>
                You write P = I × R for cable losses — using the formula for voltage drop instead
                of power. Your number is way too small. Then on a slightly overloaded run you
                think the heating’s fine when it’s actually four times what you calculated.
              </>
            }
            doInstead={
              <>
                Cable heating is P = I² × R. The I term is squared. If you use the wrong formula,
                you’ll under-estimate heating by a factor equal to the current itself — easy to
                see why undersized cables cook even though “the maths said it was OK”.
              </>
            }
          />

          <Scenario
            title="The shower that ‘keeps tripping the breaker’"
            situation={
              <>
                A 9.5 kW electric shower has been retro-fitted on a circuit that previously fed
                an 8.5 kW one. Same cable, same breaker. The shower runs for a few minutes, then
                trips the protective device every time.
              </>
            }
            whatToDo={
              <>
                Work the current. I = P ÷ V = 9500 ÷ 230 ≈ 41.3 A. The old 8.5 kW unit drew about
                37 A. The new one is asking for about 41 A through the same cable. Cable
                heating goes up with I², so 41² ÷ 37² ≈ 1.23 — the cable runs about 23 % hotter.
                On a 40 A breaker the new shower is past its rating, hence the trips. The fix is
                a properly designed circuit for the larger unit — bigger cable AND bigger
                protective device — not a hotter trip setting.
              </>
            }
            whyItMatters={
              <>
                Power calcs aren’t academic. They tell you whether the existing circuit can take
                the new load before you energise it. “It worked yesterday with the smaller
                shower” isn’t a design — every uplift needs the I and the I²R re-checked.
              </>
            }
          />

          <p className="text-[13.5px] text-white/85 leading-relaxed border-l-2 border-emerald-400/40 pl-4 italic">
            <span className="not-italic font-semibold text-emerald-300 mr-1.5">What’s next:</span>
            <strong>Sub4.6</strong> brings these power formulas together with the Ohm’s law and
            series/parallel maths from Sub4.1-4.4 — synthesis is where the power calcs really
            land.
          </p>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Three formulas, same physics: P = V × I, P = I² × R, P = V² ÷ R. Pick the one that uses the values you already have.',
              'Series circuits — same current — biggest resistor dissipates most power.',
              'Parallel circuits — same voltage — smallest resistor dissipates most power. Total = sum of branches.',
              'Cable heating is I²R. Doubling the current QUADRUPLES the heating. This is why overload is so dangerous.',
              'Energy on your bill is kWh, not kW. kWh = kW × hours. Multiply by tariff for the cost.',
              'Always cross-check: total power calculated component-by-component should match P = Vs × Itotal for the whole circuit.',
            ]}
          />

          <Quiz title="Power in DC circuits — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2/section4/4-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Total resistance — series and parallel calcs
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2/section4/4-6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Putting it together — worked DC circuits
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default Sub5;
