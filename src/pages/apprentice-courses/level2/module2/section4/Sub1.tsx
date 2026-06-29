/**
 * Module 2 · Section 4 · Sub 1 — Ohm's law made simple
 * City & Guilds 2365-02 → Unit 202 → LO4 → AC 4.4 / 4.5
 * Polished from relocated content during the Module 2 LO restructure.
 */
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import OhmsCalculator from '@/components/apprentice-courses/OhmsCalculator';
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
import { OhmsLawTriangle } from '@/components/study-centre/diagrams';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE = "Ohm's law made simple | Level 2 Module 2.4.1 (AC 4.4 / 4.5) | Elec-Mate";
const DESCRIPTION =
  'V = I × R in plain English. The triangle method, unit conversion and sanity checks for Level 2 apprentices.';

/* ── Inline check questions ───────────────────────────────────────── */

const checks = [
  {
    id: 'ohms-rearrange-check',
    question: 'You know the supply voltage and the load resistance. Which formula gives current?',
    options: [
      'I = V × R',
      'I = V ÷ R',
      'I = R ÷ V',
      'I = R − V',
    ],
    correctIndex: 1,
    explanation:
      'Cover I on the triangle and you’re left with V over R. Rearranged from V = I × R, that’s I = V ÷ R.',
  },
  {
    id: 'ohms-units-check',
    question: 'A sensor reads 250 mA at 24 V. Before doing R = V ÷ I, what is the current in amps?',
    options: [
      '2.5 A',
      '0.25 A',
      '0.025 A',
      '25 A',
    ],
    correctIndex: 1,
    explanation:
      'Divide milliamps by 1000. 250 mA = 0.25 A. Forget that step and you’ll be 1000× out — the classic Ohm’s law mistake.',
  },
  {
    id: 'ohms-sanity-check',
    question: 'You calculate 2000 A through a domestic light bulb. What is most likely wrong?',
    options: [
      'The supply voltage is far higher than you assumed',
      'The bulb has an unusually low resistance by design',
      'You skipped a unit conversion (probably mA vs A or kΩ vs Ω)',
      'Ohm’s law does not apply to filament lamps',
    ],
    correctIndex: 2,
    explanation:
      'A 60 W bulb at 230 V draws about a quarter of an amp. 2000 A would melt the cable in seconds. That’s a sanity check failing — go back and check your prefixes.',
  },
];

/* ── Quiz questions ───────────────────────────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question: 'Ohm’s law links three quantities. Which three?',
    options: [
      'Voltage, current and power',
      'Voltage, current and resistance',
      'Power, current and resistance',
      'Voltage, power and resistance',
    ],
    correctAnswer: 1,
    explanation:
      'V = I × R. Power (P = V × I) is its sister formula but it’s not Ohm’s law itself.',
  },
  {
    id: 2,
    question: 'You know V and R. To find I, the rearrangement is…',
    options: [
      'I = R ÷ V',
      'I = V × R',
      'I = V ÷ R',
      'I = V + R',
    ],
    correctAnswer: 2,
    explanation: 'Cover I on the triangle. What’s left is V over R, so I = V ÷ R.',
  },
  {
    id: 3,
    question: 'A heater takes 8 A at 230 V. Approximate resistance is…',
    options: [
      '0.035 Ω',
      '1840 Ω',
      '238 Ω',
      '28.75 Ω',
    ],
    correctAnswer: 3,
    explanation: 'R = V ÷ I = 230 ÷ 8 = 28.75 Ω. Roughly 29 Ω — sounds right for a kettle element.',
  },
  {
    id: 4,
    question: 'A 12 V supply sees 60 mA. What is the resistance?',
    options: [
      '200 Ω',
      '5 Ω',
      '0.2 Ω',
      '5000 Ω',
    ],
    correctAnswer: 0,
    explanation: 'Convert: 60 mA = 0.06 A. R = V ÷ I = 12 ÷ 0.06 = 200 Ω.',
  },
  {
    id: 5,
    question: 'Which conversion is correct?',
    options: [
      '4.7 kΩ = 470 Ω',
      '3.3 kΩ = 3300 Ω',
      '250 mA = 2.5 A',
      '1.2 A = 120 mA',
    ],
    correctAnswer: 1,
    explanation: 'kΩ to Ω, multiply by 1000. 1.2 A is 1200 mA, 4.7 kΩ is 4700 Ω, 250 mA is 0.25 A.',
  },
  {
    id: 6,
    question: 'Voltage stays the same and resistance doubles. What happens to current?',
    options: [
      'It doubles',
      'It stays the same',
      'It halves',
      'It quadruples',
    ],
    correctAnswer: 2,
    explanation:
      'I = V ÷ R. Double the bottom of the fraction and you halve the answer. Same supply, more resistance, less current.',
  },
  {
    id: 7,
    question: 'V = 24 V and I = 0.2 A. What is R?',
    options: [
      '12 Ω',
      '4.8 Ω',
      '240 Ω',
      '120 Ω',
    ],
    correctAnswer: 3,
    explanation: 'R = V ÷ I = 24 ÷ 0.2 = 120 Ω.',
  },
  {
    id: 8,
    question: 'Why does Ohm’s law not always give the exact answer for a real component?',
    options: [
      'Because resistance changes with temperature in many components',
      'Because the formula only works on AC, never on DC',
      'Because voltage is not actually related to current',
      'Because real meters can never read accurately enough',
    ],
    correctAnswer: 0,
    explanation:
      'Filament lamps, motor windings and heater elements all change resistance as they warm up. V = I × R is a snapshot, not a guarantee for every working state.',
  },
];

/* ── FAQs ─────────────────────────────────────────────────────────── */

const faqs = [
  {
    question: 'Do I have to memorise the triangle, or can I just rearrange the formula?',
    answer:
      'Whichever sticks. The triangle is a visual shortcut — cover the one you want, the other two tell you what to do. If algebra clicks for you, just rearrange V = I × R. Either way, the answer is the same.',
  },
  {
    question: 'Why do I need to convert mA to A and kΩ to Ω first?',
    answer:
      'Because the formula expects all values in base SI units. Mix prefixes and you get answers that are 1000× or 1,000,000× wrong. Convert first, calculate second, sanity check third.',
  },
  {
    question: 'Is Ohm’s law valid for AC supplies too?',
    answer:
      'For purely resistive AC loads (heaters, filament lamps, kettle elements), yes — using RMS values. For loads with motors, capacitors or transformers in them, you need impedance (Z) instead of resistance, and that comes later in the course.',
  },
  {
    question: 'Why does my kettle element resistance read different cold vs hot?',
    answer:
      'Most metals get more resistive as they heat up. Cold-test a kettle element and you might read 18 Ω; once it’s boiling and at temperature, it could be 28 Ω. Both are normal — V = I × R is a snapshot at one temperature.',
  },
  {
    question: 'What is a quick sanity-check to spot a wrong answer?',
    answer:
      'Approximate the numbers in your head before you calculate. 230 V across about 25 Ω should give about 9 or 10 A — close to a kettle. If your maths gives 0.01 A or 9000 A, something’s gone wrong with the units or the rearrangement.',
  },
  {
    question: 'Where does Ohm’s law actually show up on site?',
    answer:
      'Calculating prospective fault current, sizing CPCs against earth fault loop impedance, checking voltage drop on long runs, working out current draw for an unknown load when you’ve got the nameplate — all of it is Ohm’s law underneath.',
  },
];

export default function Sub1() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 4
          </button>

          <PageHero
            eyebrow="Module 2 · Section 4 · Subsection 1"
            title="Ohm’s law made simple"
            description="V = I × R. Three letters, one formula, three rearrangements. Get this nailed and the rest of the course gets a lot easier."
            tone="emerald"
          />

          <TLDR
            points={[
              'V = I × R links voltage, current and resistance. Know any two, find the third.',
              'Convert units BEFORE you calculate — milliamps to amps, kilohms to ohms. Skip this step and you’ll be 1000× out.',
              'Always sanity check. If a domestic light bulb “draws 2000 A”, you’ve made a unit mistake — not discovered new physics.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain in plain English what voltage, current and resistance actually do.',
              'Use V = I × R and its two rearrangements (I = V ÷ R, R = V ÷ I) to solve real values.',
              'Convert between mA / A and Ω / kΩ / MΩ confidently before calculating.',
              'Use the triangle method as a quick on-site memory aid.',
              'Sanity-check answers against typical UK supply values (230 V, 13 A, 32 A, 230 V × ~30 Ω elements).',
              'Spot when a calculation has gone wrong by orders of magnitude — and where the unit slip happened.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The three quantities</ContentEyebrow>

          <ConceptBlock
            title="Voltage, current, resistance — what they each do"
            plainEnglish="Voltage pushes. Current flows. Resistance fights back. The bigger the push, the bigger the flow — unless something’s holding it back."
            onSite="When a 230 V supply drives current through a 30 Ω heater element, voltage is the push, the 7-or-so amps that result are the flow, and the 30 Ω is the resistance dictating how much flow you get."
          >
            <p>Three quantities, three jobs. Get the words right and the maths follows.</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Voltage (V)</strong> — the electrical pressure or push, measured in
                volts. UK domestic mains is nominally 230 V. Like water pressure in a pipe.
              </li>
              <li>
                <strong>Current (I)</strong> — the flow of charge that the pressure causes,
                measured in amps. The bigger the flow, the more heat in the cable. Letter is{' '}
                <em>I</em> from the French <em>intensité du courant</em>.
              </li>
              <li>
                <strong>Resistance (R)</strong> — opposition to current, measured in ohms (Ω).
                A long thin wire has more resistance than a short fat one. A heater element is
                designed to have a specific resistance so the right current flows for the right
                heat.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Ohm’s law — V = I × R"
            plainEnglish="Volts equal amps times ohms. Memorise it once."
          >
            <p>
              Georg Ohm worked it out in 1827. For a metal conductor at a steady temperature,
              the current that flows is directly proportional to the voltage applied, and
              inversely proportional to the resistance. Twice the voltage gives twice the
              current. Twice the resistance halves it.
            </p>
            <p>The formula has three forms — same equation, just rearranged:</p>
            <ul className="space-y-1 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>V = I × R</strong> — find voltage when you know current and resistance.
              </li>
              <li>
                <strong>I = V ÷ R</strong> — find current when you know voltage and resistance.
              </li>
              <li>
                <strong>R = V ÷ I</strong> — find resistance when you know voltage and current.
              </li>
            </ul>
          </ConceptBlock>

          <div className="flex flex-wrap gap-4 justify-center">
            <OhmsLawTriangle variant="V" />
            <OhmsLawTriangle variant="I" />
            <OhmsLawTriangle variant="R" />
          </div>

          <SectionRule />

          <ContentEyebrow>Get the units right first</ContentEyebrow>

          <ConceptBlock
            title="Convert before you calculate"
            onSite="Most apprentice mistakes on calculation papers come from leaving values in mA or kΩ. Convert at the top of the page, then forget about prefixes for the rest of the maths."
          >
            <p>
              Ohm’s law expects the base units — volts, amps, ohms. If your value is in
              milliamps or kilohms, convert it FIRST. The formula doesn’t care about prefixes
              and it won’t warn you if you mix them.
            </p>
            <ul className="space-y-1 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>mA → A</strong> — divide by 1000. So 250 mA = 0.25 A. 50 mA = 0.05 A.
              </li>
              <li>
                <strong>kΩ → Ω</strong> — multiply by 1000. So 3.3 kΩ = 3300 Ω. 0.47 kΩ = 470 Ω.
              </li>
              <li>
                <strong>MΩ → Ω</strong> — multiply by 1,000,000. Mostly turns up in insulation
                resistance testing.
              </li>
              <li>
                <strong>kV → V</strong> — multiply by 1000. Mostly distribution / DNO territory.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Worked examples — the maths step by step</ContentEyebrow>

          <ConceptBlock title="Example 1 — finding current from voltage and resistance">
            <p>
              <strong>Given:</strong> a 230 V supply across a heater element of 92 Ω.
              <br />
              <strong>Find:</strong> the current it draws.
            </p>
            <p>
              <strong>Step 1 — pick the right rearrangement.</strong> You know V and R, you
              want I, so use I = V ÷ R.
            </p>
            <p>
              <strong>Step 2 — units already in base form.</strong> Volts and ohms — no
              conversion needed.
            </p>
            <p>
              <strong>Step 3 — calculate.</strong> I = 230 ÷ 92 = 2.5 A.
            </p>
            <p>
              <strong>Step 4 — sanity check.</strong> A small heater drawing 2.5 A on UK mains
              feels right (a 575 W heater). A 13 A plug top would handle it comfortably. The
              answer is reasonable.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Example 2 — finding voltage from current and resistance">
            <p>
              <strong>Given:</strong> a sensor on a control panel draws 200 mA through a 3.3 kΩ
              series resistor.
              <br />
              <strong>Find:</strong> the voltage drop across the resistor.
            </p>
            <p>
              <strong>Step 1 — convert units first.</strong> 200 mA = 0.2 A. 3.3 kΩ = 3300 Ω.
              Now everything is in base units.
            </p>
            <p>
              <strong>Step 2 — pick the formula.</strong> V = I × R.
            </p>
            <p>
              <strong>Step 3 — calculate.</strong> V = 0.2 × 3300 = 660 V.
            </p>
            <p>
              <strong>Step 4 — sanity check.</strong> 660 V across one resistor in a control
              panel is a red flag — you’d expect tens, not hundreds, of volts on a typical
              control circuit. Either the question is a teaching example with fictional values,
              or the resistor is wrong for the job. Worth flagging on a real install.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Example 3 — finding resistance from voltage and current">
            <p>
              <strong>Given:</strong> a 24 V supply pushes 0.12 A through an unknown load.
              <br />
              <strong>Find:</strong> the resistance of the load.
            </p>
            <p>
              <strong>Step 1 — pick the right rearrangement.</strong> You know V and I, you
              want R, so use R = V ÷ I.
            </p>
            <p>
              <strong>Step 2 — units already in base form.</strong>
            </p>
            <p>
              <strong>Step 3 — calculate.</strong> R = 24 ÷ 0.12 = 200 Ω.
            </p>
            <p>
              <strong>Step 4 — sanity check.</strong> 200 Ω is a sensible value for a small
              control coil or relay winding. The answer is plausible.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Try it yourself</ContentEyebrow>

          <ConceptBlock title="The Ohm’s law calculator">
            <p>
              Punch any two values in and the calculator returns the other two. Use it to check
              your manual maths after you’ve worked through it on paper — not as a replacement
              for understanding the formula. The exam doesn’t let you bring this in.
            </p>
          </ConceptBlock>

          <OhmsCalculator />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <VideoCard
            url={videos.ohmsLaw.url}
            title={videos.ohmsLaw.title}
            channel={videos.ohmsLaw.channel}
            duration={videos.ohmsLaw.duration}
            topic={videos.ohmsLaw.topic}
            caption="Five-minute animated walk-through of V = I × R with the triangle method. Useful if maths-from-text isn’t sticking — sometimes seeing it move helps."
          />

          <SectionRule />

          <ContentEyebrow>Where it ties to BS 7671</ContentEyebrow>

          <ConceptBlock
            title="Ohm’s law underneath the regs"
            plainEnglish="Every cable size, every protective device choice, every voltage drop calc — it’s Ohm’s law turned into a design rule."
          >
            <p>
              You don’t quote Ohm’s law on a certificate, but it’s behind every calculation
              that does end up there. The current a cable can carry, the disconnection time of
              a breaker on an earth fault, the voltage left at the far end of a long run — all
              of it pivots on V = I × R.
            </p>
            <p>
              This Sub gets the formula nailed. The next four Subs apply it to series, parallel
              and mixed circuits — and the Sub after that uses it to calculate power.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 433.1.1(c)"
            clause="The current (I) causing effective operation of the protective device shall not exceed 1.45 times the lowest of the current-carrying capacities (I_z) of any of the conductors of the circuit."
            meaning={
              <>
                Translation — the protective device has to trip BEFORE the cable’s
                current-carrying capacity is overcooked. Working out the actual current in a
                fault uses Ohm’s law (I = V ÷ Z). This is why the formula matters in real cable
                / breaker selection, not just on a quiz.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Chapter 43"
          />

          <SectionRule />

          <ContentEyebrow>Mistakes to dodge</ContentEyebrow>

          <CommonMistake
            title="Mixing prefixes mid-calculation"
            whatHappens={
              <>
                You’ve got V = 24 V and I = 250 mA. You forget to convert and plug{' '}
                <strong>R = 24 ÷ 250 = 0.096 Ω</strong> straight into the calculator. Looks
                small, must be right. Except the real answer is{' '}
                <strong>R = 24 ÷ 0.25 = 96 Ω</strong> — 1000× bigger. Same numbers, totally
                different circuit.
              </>
            }
            doInstead={
              <>
                Before you touch the formula, convert every value to base units. Write it out:
                “V = 24, I = 0.25, R = ?”. Then calculate. The two-second conversion saves the
                whole question.
              </>
            }
          />

          <Scenario
            title="Zs = 0.62 Ω at the consumer unit — pass or fail for a 32 A Type B?"
            situation={
              <>
                You’re commissioning a new ring final. At the consumer unit you take a Zs (earth
                fault loop impedance) reading on the incoming side and get <strong>0.62 Ω</strong>.
                The circuit is protected by a 32 A Type B MCB on a 230 V TN-S supply. Before you
                tick the cert, decide — does it pass?
              </>
            }
            whatToDo={
              <>
                Two checks, both Ohm’s law underneath. <strong>(1) Compare to the BS 7671 Table
                41.3 limit</strong> — max Zs for a 32 A Type B at 230 V is{' '}
                <strong>1.09 Ω</strong>. Your reading of 0.62 Ω is well under. <strong>(2) Apply
                the 80% rule (Reg 643.3) for measurement uncertainty</strong> — you want your
                site reading to sit at or under 0.8 × 1.09 = <strong>0.87 Ω</strong>. 0.62 Ω is
                inside that too, with about 30% headroom for cable temperature rise. Then use
                Ohm’s law to find the prospective fault current: <strong>I = U ÷ Zs = 230 ÷ 0.62
                = 371 A</strong>. A Type B MCB’s instantaneous magnetic trip is 5 × In = 5 × 32 ={' '}
                <strong>160 A</strong>. 371 A is well clear of 160 A — the MCB will trip
                instantaneously on a line-to-earth fault. Result: <strong>pass</strong>.
              </>
            }
            whyItMatters={
              <>
                Every BS 7671 disconnection-time check is Ohm’s law in disguise. Zs is just the
                R; the supply voltage is the V; the prospective fault current is the I. Get
                comfortable rearranging V = I × R and the certificate stops being maths and
                starts being a checklist.
              </>
            }
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'V = I × R — three letters, three rearrangements, one underlying truth.',
              'Convert mA → A and kΩ → Ω BEFORE you calculate. Most exam errors live in this step.',
              'Use the triangle method as a quick visual reminder — cover what you want, the formula falls out.',
              'Sanity-check every answer against typical UK numbers. Domestic supplies don’t deliver thousands of amps, control circuits don’t usually have hundreds of volts on one resistor.',
              'Resistance of real components shifts with temperature. V = I × R is a snapshot, not a forever-true reading.',
              'This formula is the foundation for everything else in this section — series, parallel, power and voltage drop all sit on top of it.',
            ]}
          />

          <Quiz title="Ohm’s law knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2/section3/3-6')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Section 3 — last sub
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2/section4/4-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Series circuits — current and voltage
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
