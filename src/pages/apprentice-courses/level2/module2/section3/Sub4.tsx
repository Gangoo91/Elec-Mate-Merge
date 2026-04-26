/**
 * Module 2 · Section 3 · Subsection 4 — Voltage drop (AC 4.7)
 * City & Guilds 2365-02 → Unit 202 → LO4 part 1.
 * Polish phase: relocated from old section5/Sub5, rewritten in apprentice voice.
 */
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import VoltageDropCalculator from '@/components/apprentice-courses/VoltageDropCalculator';
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
import { VoltageDropDiagram } from '@/components/study-centre/diagrams';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Voltage drop — Method A and Method B | Level 2 Module 2.3.4 (AC 4.7) | Elec-Mate';
const DESCRIPTION =
  'Why some of your 230 V never reaches the load. How to calculate voltage drop two ways, what the BS 7671 limits are, and how to fix a fail.';

const checks = [
  {
    id: 'vd-formula-check',
    question: 'The simplest equation for voltage drop along a cable is:',
    options: ['Vd = V/I', 'Vd = I × R', 'Vd = P × t', 'Vd = ρ/L'],
    correctIndex: 1,
    explanation:
      "Vd = I × R. Current times the resistance of the cable. That's it. Method A in Appendix 4 is just this with the right R for the cable run.",
  },
  {
    id: 'vd-limit-check',
    question:
      'BS 7671 Appendix 4 gives recommended voltage drop limits of:',
    options: [
      '1% lighting and 2% other circuits',
      '3% lighting and 5% other circuits',
      '5% lighting and 10% other circuits',
      'No limit specified',
    ],
    correctIndex: 1,
    explanation:
      "3% for lighting, 5% for other final circuits, measured from the supply intake. Lighting gets the tighter limit because filament/discharge lamps lose noticeable output below ~95% of rated voltage.",
  },
  {
    id: 'vd-loop-length-check',
    question: "Calculating voltage drop using mV/A/m, the 'L' is:",
    options: [
      'The one-way length to the load',
      'The total loop length (out and back)',
      'The CSA in mm²',
      'Always 1 metre',
    ],
    correctIndex: 1,
    explanation:
      "The mV/A/m table value is per metre of cable run. Single-phase circuit: the current goes out the line and back the neutral, so use the one-way route length — the table value already accounts for both legs of the loop.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which of these is Method A for voltage drop?',
    options: [
      'Use mV/A/m × I × L ÷ 1000',
      'Calculate R = ρL/A then use Vd = I × R',
      'Read the percentage off Table 41.1',
      'Use the manufacturer Zs',
    ],
    correctAnswer: 1,
    explanation:
      "Method A: work out the resistance of the cable (R = ρL/A or Appendix 4 column), then Vd = I × R. Method B is the mV/A/m shortcut.",
  },
  {
    id: 2,
    question: 'Method B uses the formula:',
    options: [
      'Vd = I × R',
      'Vd = (mV/A/m × I × L) ÷ 1000',
      'Vd = V × I × t',
      'Vd = P / V',
    ],
    correctAnswer: 1,
    explanation:
      "Method B is the Appendix 4 shortcut: tabulated mV per amp per metre, multiplied by current and length, divided by 1000 to convert millivolts to volts.",
  },
  {
    id: 3,
    question: "What's the recommended voltage drop limit for a domestic socket circuit?",
    options: ['1%', '3%', '5%', '10%'],
    correctAnswer: 2,
    explanation:
      "5% for non-lighting final circuits — that's 11.5 V on a 230 V supply. 3% for lighting. Anything above and equipment misbehaves; motors struggle to start and electronics drop out.",
  },
  {
    id: 4,
    question: 'A 30 m run of 2.5 mm² copper T&E (mV/A/m = 18) carrying 16 A. Voltage drop ≈',
    options: ['4.3 V', '8.6 V', '17.3 V', '0.86 V'],
    correctAnswer: 1,
    explanation:
      "Vd = (18 × 16 × 30) ÷ 1000 = 8.64 V. As a percentage: 8.64 / 230 = 3.8%. Inside the 5% socket limit.",
  },
  {
    id: 5,
    question: 'Voltage drop on a circuit gets worse as:',
    options: [
      'CSA increases',
      'Length increases',
      'Voltage increases',
      'Cable is shortened',
    ],
    correctAnswer: 1,
    explanation:
      "Longer cable = more resistance (R = ρL/A) = more Vd at the same current. The other levers (CSA, route, current) all move the other way.",
  },
  {
    id: 6,
    question: 'Quickest fix when a circuit fails the voltage drop limit?',
    options: [
      'Use thinner cable',
      'Upsize the cable to the next CSA',
      'Increase the load',
      'Increase the supply voltage',
    ],
    correctAnswer: 1,
    explanation:
      "Doubling the CSA roughly halves the resistance and the voltage drop. You can rarely change route length, can't change ρ, can't change the load — A is the lever.",
  },
  {
    id: 7,
    question: 'On a three-phase balanced load, voltage drop calculations use:',
    options: [
      'The same mV/A/m as single-phase',
      'A different mV/A/m value from the three-phase column of Appendix 4',
      'The line-to-line voltage divided by 3',
      'No calculation needed',
    ],
    correctAnswer: 1,
    explanation:
      "Appendix 4 has separate single-phase and three-phase mV/A/m columns. The √3/2 ratio between them is geometric, not 'small neutral current': single-phase mV/A/m is loop voltage drop (line + neutral, 2 conductors), three-phase mV/A/m is line-only (in a balanced 3-phase system the neutral current is approximately zero, so the neutral conductor doesn't contribute). Multiply by √3 for three-phase line-to-line, divide by 2 for single-leg vs loop.",
  },
  {
    id: 8,
    question: 'Why does excessive voltage drop matter beyond just regulations?',
    options: [
      'It increases the supply voltage',
      'It cuts equipment output, makes motors struggle to start, dims lights and wastes energy as cable heat',
      'It improves efficiency',
      "It doesn't actually matter",
    ],
    correctAnswer: 1,
    explanation:
      "The volts you lose in the cable are dissipated as heat (I²R losses) and the load doesn't get its rated voltage. Motors stall, lamps dim, electronics drop out, kettle takes longer. The reg limit is the symptom, not the cause.",
  },
];

const faqs = [
  {
    question: "Why do we use mV/A/m and not just R = ρL/A?",
    answer:
      "Two reasons. First, the Appendix 4 mV/A/m values already include the cable's operating temperature (70°C for PVC, 90°C for XLPE) and both legs of the loop — saves you doing the temperature correction by hand. Second, at AC frequencies they account for cable reactance, which R = ρL/A doesn't. Method B is engineered for design; Method A is the underlying physics.",
  },
  {
    question: "Where do I measure the volt drop FROM in a real installation?",
    answer:
      "BS 7671 Appendix 4 says the limits apply between the origin of the installation (typically the consumer unit) and any load. So 5% on a domestic socket means 11.5 V drop allowed between the CU and the furthest socket on that circuit, at full load current.",
  },
  {
    question: "Are the 3%/5% limits hard rules?",
    answer:
      "They're recommendations in BS 7671 Appendix 4, not absolute regs. The actual reg (Section 525) just says voltage at terminals shall not impair equipment safety or function. The 3%/5% values are the industry-accepted way of meeting that. Manufacturers can specify tighter limits for sensitive equipment — always check.",
  },
  {
    question: "Does voltage drop matter on a short ring final circuit?",
    answer:
      "Usually not — a domestic 32 A ring rarely has any single point more than 30 m of cable from the CU, so the worst-case Vd is well inside 5%. Long runs (workshop, outbuilding spurs, big commercial floors) are where it bites.",
  },
  {
    question: "What about voltage drop during motor starting?",
    answer:
      "Big motors pull 6-8× their full-load current at start-up. That short burst of current causes a much bigger voltage drop than steady-state. The 5% Appendix 4 figure is a steady-state design limit — motor circuits often need separate starting-current calcs to make sure other equipment on the same supply doesn't dip out.",
  },
];

export default function Sub4() {
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
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 2 · Section 3 · Subsection 4"
            title="Voltage drop"
            description="Why some of your 230 V never reaches the load. The two methods of calculating it, the BS 7671 limits, and how to fix a circuit that fails."
            tone="emerald"
          />

          <TLDR
            points={[
              "Vd = I × R. Cable resistance × current = volts you lose along the way. The further the run and the smaller the CSA, the more you lose.",
              "BS 7671 Appendix 4 limits: 3% for lighting (≈ 6.9 V on 230 V), 5% for everything else (≈ 11.5 V).",
              "Two methods. Method A: work out R, then Vd = IR. Method B: tabulated mV/A/m × I × L ÷ 1000. Method B is the everyday design tool.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Explain what voltage drop is and why it matters for equipment performance.",
              "State the BS 7671 Appendix 4 recommended limits (3% lighting, 5% other final circuits).",
              "Calculate voltage drop using Method A (Vd = I × R) and Method B (mV/A/m formula).",
              "Read mV/A/m values from Appendix 4 for the cable type and installation method.",
              "Recognise when a circuit needs upsizing and pick the next sensible CSA.",
              "Cite BS 7671 Section 525 and Appendix 4 in design discussions.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>What voltage drop actually is</ContentEyebrow>

          <ConceptBlock
            title="The 230 V at the consumer unit isn't the 230 V at the load"
            plainEnglish="Every metre of cable has a tiny resistance. Push current through it and you lose volts to that resistance — like water pressure dropping along a long thin hose."
            onSite="Stick a multimeter on a long workshop spur with a 13 A heater plugged in. You'll read 230 V at the CU and a couple of volts less at the socket. That difference is your voltage drop, live and on display."
          >
            <p>
              The supply at the consumer unit sits at nominally 230 V. That's also what your loads
              expect at their terminals. The problem: the cable between the CU and the load has
              resistance, and pushing current through resistance drops voltage. By the time the
              current arrives at the load, some of the original 230 V has been left behind in the
              cable as heat.
            </p>
            <p>
              Mathematically it's just <strong>Vd = I × R</strong>. The R here is the resistance
              of the whole loop the current flows through — out along the line conductor, back
              along the neutral. The bigger the current and the bigger the cable's resistance,
              the more volts go missing.
            </p>
          </ConceptBlock>

          <VoltageDropDiagram />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 525.202 (Voltage drop deemed-compliance)"
            clause="The above requirements are deemed to be satisfied if the voltage drop between the origin of the installation (usually the supply terminals) and a socket-outlet or the terminals of fixed current-using equipment does not exceed that stated in Appendix 4, Section 6.4."
            meaning={
              <>
                The reg itself is short. The deemed-compliance numbers (3% lighting, 5% other) live
                in Appendix 4 Section 6.4. The actual reg principle is broader: the voltage at the
                load's terminals must not be so low that the equipment can't work safely or properly.
                The 3%/5% limits are the industry's way of meeting that.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 525.202."
          />

          <InlineCheck {...checks[0]} />

          <SectionRule />

          <ContentEyebrow>Before the methods — why Appendix 4 doesn’t just give you ρL/A</ContentEyebrow>

          <ConceptBlock
            title="Why Appendix 4 gives you mV/A/m — operating temperature + reactance baked in"
            plainEnglish="The R = ρL/A you learned in Sub3.3 is the COLD conductor at 20°C, with no AC reactance. The mV/A/m number in Appendix 4 is the same physics with two real-world adjustments already done for you."
            onSite="Spreadsheets, design software, manufacturer cable selectors — they all reach for mV/A/m, not ρL/A. Knowing why means you can sanity-check the table value and spot when it’s the wrong column for your install (e.g. you’ve grabbed PVC values for an XLPE cable, or single-phase values for a three-phase circuit)."
          >
            <p>
              R = ρL/A from Sub3.3 is correct — it’s the underlying physics. But it’s the
              <strong> cold conductor at 20°C</strong> with no allowance for what AC actually
              does in real cables. Three things the formula leaves out, that Appendix 4 quietly
              builds in:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Operating temperature.</strong> A loaded PVC cable runs at <strong>70°C</strong>{' '}
                (XLPE at 90°C), not 20°C. The temperature coefficient from Sub3.3 (α ≈ 0.004/°C
                for copper) means a 70°C conductor has roughly 20% more resistance than the same
                cable cold. Appendix 4 quotes mV/A/m at the cable’s rated operating temperature —
                so the table has the temperature correction already done.
              </li>
              <li>
                <strong>AC reactance.</strong> At 50 Hz, the magnetic field around the conductor
                creates a small inductive reactance that adds to the DC resistance — small for
                domestic cables, growing noticeably for larger CSAs (16 mm² and up). R = ρL/A
                ignores this entirely. The Appendix 4 column for the relevant CSA bakes in the
                AC impedance, not just the DC resistance.
              </li>
              <li>
                <strong>The standard installation method.</strong> mV/A/m values are tabulated
                per BS 7671 reference method (clipped direct, in conduit, buried, etc.). Pick the
                right column and the heat-dissipation conditions of your install are already
                accounted for.
              </li>
            </ul>
            <p>
              Net effect: <strong>mV/A/m is the “ready to use” form</strong> for real
              installations. You just plug in current and route length. R = ρL/A is the physics
              behind it; mV/A/m is the engineered shortcut. Method A and Method B below show how
              both are used — but on every job you’ll do for the next decade, Method B is the
              default for exactly the reasons above.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The two methods</ContentEyebrow>

          <ConceptBlock
            title="Method A — Vd = I × R"
            plainEnglish="Old-school physics. Work out the cable's resistance from R = ρL/A (or read it off Appendix 4), then multiply by the current. Done."
          >
            <p>The steps:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>Find the loop length (out and back from origin to load).</li>
              <li>
                Calculate R for one loop: R ≈ 0.0172 × L_loop ÷ A for copper, or read from
                Appendix 4 table.
              </li>
              <li>Multiply: Vd = I × R.</li>
              <li>Apply temperature correction if you're doing it from cold values.</li>
            </ol>
            <p>
              Method A is fine for one-off mental checks. It's also what your brain does when
              someone asks "would 4 mil be enough for that run?" — you're rough-calculating R and
              I in your head.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Method B — mV/A/m from Appendix 4"
            plainEnglish="Look up the cable in the table; multiply by current and route length; divide by 1000. This is the design method everyone uses."
            onSite="Estimating apps, design software, manufacturer quote tools — they all use Method B under the hood. Worth being able to do it by hand for the sanity check on the spreadsheet's number."
          >
            <p>The formula:</p>
            <p className="text-center text-elec-yellow font-semibold">
              Vd (V) = (mV/A/m × I × L) ÷ 1000
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>mV/A/m</strong> — looked up in Appendix 4 for the cable type, CSA and
                installation method. Already includes both loop legs and the operating
                temperature.
              </li>
              <li>
                <strong>I</strong> — the current the circuit will carry, in amps.
              </li>
              <li>
                <strong>L</strong> — the route length (one-way) from origin to load, in metres.
              </li>
              <li>
                Divide by 1000 because the table gives millivolts and you want volts.
              </li>
            </ul>
            <p>
              Common mV/A/m values for Twin & Earth (clipped direct, single-phase): 1.0 mm² = 44;
              1.5 mm² = 29; 2.5 mm² = 18; 4.0 mm² = 11; 6.0 mm² = 7.3; 10 mm² = 4.4.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Appendix 4, Section 6.4 (Voltage drop limits)"
            clause="A drop of 3% of nominal voltage for lighting and 5% for other uses, taken from the origin of the installation to the equipment terminals, is generally regarded as sufficient."
            meaning={
              <>
                These are the design percentages everyone quotes. On a 230 V supply: <strong>3% =
                6.9 V</strong> max for lighting, <strong>5% = 11.5 V</strong> max for sockets and
                other circuits. The limits apply to the worst-case load condition — full design
                current — not to a casual measurement with light loading.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Appendix 4, Section 6.4."
          />

          <InlineCheck {...checks[1]} />

          <SectionRule />

          <ContentEyebrow>Worked example — long lighting circuit, end-to-end</ContentEyebrow>

          <ConceptBlock
            title="35 m of 1.5 mm² T&E, 6 A lighting load — the recipe step by step"
            plainEnglish="The Appendix 4 mV/A/m method written out as a recipe. Pull mV/A/m from Appendix 4 Table 4D5, multiply by current, multiply by length, divide by 1000 to get volts. Done. AM2 papers can ask either method — Method A by R or Method B by mV/A/m — and the recipe still works."
            onSite="A long upstairs lighting circuit feeding a couple of bedrooms and a landing. 1.5 mm² T&E is the standard spec. The 35 m is the route length from the CU to the furthest fitting."
          >
            <p>The numbers:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Cable: 1.5 mm² T&E copper, clipped direct.</li>
              <li>
                mV/A/m for 1.5 mm² T&E ≈ <strong>29 mV/A/m</strong> (Appendix 4 Table 4D5).
              </li>
              <li>Design current Ib = 6 A (nominal lighting load).</li>
              <li>Route length L = 35 m.</li>
              <li>Limit: lighting circuit, so <strong>3% of 230 V = 6.9 V</strong>.</li>
            </ul>
            <p>The recipe, step by step:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>Look up mV/A/m for the cable in Appendix 4 — 29 for 1.5 mm² T&E.</li>
              <li>Multiply by the current: 29 × 6 = 174.</li>
              <li>Multiply by the length: 174 × 35 = 6,090.</li>
              <li>Divide by 1000 to convert millivolts to volts: 6,090 ÷ 1000 = <strong>6.09 V</strong>.</li>
              <li>
                Compare to the limit: 6.09 ÷ 230 = <strong>2.65%</strong> — inside the 3%
                lighting limit. PASS.
              </li>
            </ol>
            <p>
              Same recipe, every cable, every job. The mV/A/m number is the Appendix 4 table
              already doing the R = ρL/A maths for you at the cable’s operating temperature, both
              loop legs included. AM2 papers can ask the calculation either way — Method A as Vd
              = I × R using the raw resistance, or the engineered form above — and both give the
              same answer when you’ve used the right R for the cable’s operating temperature.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Worked example — kitchen socket spur</ContentEyebrow>

          <ConceptBlock
            title="25 m run, 20 A load, 2.5 mm² T&E clipped direct"
            plainEnglish="A typical 'is this cable big enough?' question. We'll do it with Method B, then look at how to fix it if it fails."
          >
            <p>The numbers:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Cable: 2.5 mm² T&E copper, clipped direct → mV/A/m = 18 (Appendix 4).</li>
              <li>Current: 20 A.</li>
              <li>Route length L: 25 m.</li>
              <li>Limit: socket circuit, so 5% of 230 V = <strong>11.5 V</strong>.</li>
            </ul>
            <p>
              Method B: Vd = (18 × 20 × 25) ÷ 1000 = <strong>9.0 V</strong>. As a percentage: 9.0 /
              230 = <strong>3.9%</strong> — comfortably inside the 5% limit. PASS.
            </p>
            <p>Now stretch the run to 35 m and see what happens:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Vd = (18 × 20 × 35) ÷ 1000 = <strong>12.6 V</strong> = 5.5%. FAIL.</li>
            </ul>
            <p>Two options. Either shorten the route, or upsize the cable:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Upsize to 4 mm² T&E (mV/A/m = 11): Vd = (11 × 20 × 35) ÷ 1000 ={' '}
                <strong>7.7 V</strong> = 3.3%. PASS.
              </li>
            </ul>
            <p>
              That's R = ρL/A in action — bigger A drops the resistance, drops the voltage drop.
              Same physics, applied through the Appendix 4 table.
            </p>
          </ConceptBlock>

          <VoltageDropCalculator />

          <InlineCheck {...checks[2]} />

          <SectionRule />

          <ContentEyebrow>Why it matters beyond ticking the reg</ContentEyebrow>

          <ConceptBlock
            title="Lost volts = wasted energy + struggling kit"
            plainEnglish="The volts you lose in the cable don't disappear — they turn into heat in the cable. The load gets the leftovers."
          >
            <p>
              Two consequences when voltage drop is high:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Equipment underperforms.</strong> Resistive heaters give less heat (P =
                V²/R). Filament lamps go yellow. Discharge lamps flicker or fail to strike. Motors
                draw more current to deliver the same torque, which makes the voltage drop worse,
                which makes them draw even more current... thermal runaway.
              </li>
              <li>
                <strong>Energy gets wasted as cable heat.</strong> The volts lost in the cable get
                dissipated as I²R heating along the entire run. Long undersized cables on heavy
                loads get genuinely hot — that's lost money, lost performance, and (if the cable's
                already at its current rating) potentially lost insulation.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Using one-way length when you needed loop length (Method A)"
            whatHappens={
              <>
                Apprentice working out Vd from R = ρL/A. Plugs the route length (say 30 m) into
                the formula and gets the answer for one core only. Forgets the current goes out
                AND back. Their Vd is half the real value. Circuit looks fine on paper but fails
                a Method B check or an on-site measurement.
              </>
            }
            doInstead={
              <>
                <strong>Method A:</strong> use the loop length (out and back, so 60 m for a 30 m
                run). <strong>Method B:</strong> use the route length (the 30 m); the mV/A/m value
                already accounts for both loop legs. Mix the two and you halve or double the
                answer.
              </>
            }
          />

          <Scenario
            title="Outbuilding sub-main on a domestic install"
            situation={
              <>
                Customer wants a 32 A workshop circuit in a garden outbuilding 40 m from the
                house. Plans a 6 mm² SWA sub-main with a small CU at the workshop end feeding
                lights and sockets.
              </>
            }
            whatToDo={
              <>
                Method B check: 6 mm² SWA at ~7.3 mV/A/m × 32 A × 40 m ÷ 1000 ={' '}
                <strong>9.3 V</strong> = 4.0%. That's just for the sub-main — but the limit
                applies to the WHOLE path from origin to load, so add the workshop final-circuit
                drop too. If the final lighting circuit adds another 1.5%, total = 5.5%, fail for
                lighting (3%). Either shorten the run, upsize to 10 mm² SWA (drops sub-main Vd to
                2.4%), or accept the workshop will have its own slightly dim lighting.
              </>
            }
            whyItMatters={
              <>
                Voltage drop adds up. A garden outbuilding looks like 'just one circuit' but
                it's two cables in series — sub-main plus final circuit. Both eat into the same
                3%/5% budget. Always design from the origin, not just from the local CU.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Voltage drop = I × R. Cable resistance times current = volts you lose down the run.",
              "BS 7671 Appendix 4 limits: 3% for lighting, 5% for other final circuits, measured from the origin to the load terminals.",
              "Method A: work out R, then Vd = IR. Use loop length (out + back).",
              "Method B: Vd = (mV/A/m × I × L) ÷ 1000. Use route length only — the table value bakes in the loop and operating temp.",
              "Failing the limit? Upsize the CSA. That's the only practical lever in most cases.",
              "On a sub-main + final circuit, both drops add up against the same 3%/5% budget — design from the origin.",
            ]}
          />

          <Quiz title="Voltage drop knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2/section3/3-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                3.3 Resistance and resistivity
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2/section3/3-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.5 Thermal effects of current
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
