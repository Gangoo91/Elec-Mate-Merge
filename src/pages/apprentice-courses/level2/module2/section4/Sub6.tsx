/**
 * Module 2 · Section 4 · Sub 6 — Putting it together: worked DC circuits
 * City & Guilds 2365-02 → Unit 202 → LO4 → AC 4.4 / 4.5 / 4.6
 * Polished from relocated content during the Module 2 LO restructure.
 */
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import SeriesParallelCalculators from '@/components/apprentice-courses/SeriesParallelCalculators';
import { FormulaList } from '@/components/apprentice-courses/FormulaList';
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
import { MixedCircuit, KirchhoffVoltageLoop } from '@/components/study-centre/diagrams';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Putting it together — worked DC circuits | Level 2 Module 2.4.6 (AC 4.4 / 4.5 / 4.6) | Elec-Mate';
const DESCRIPTION =
  'End-to-end DC worked examples combining Ohm’s law, series, parallel and power. Recognising circuit types on site and applying the full toolkit for Level 2 apprentices.';

/* ── Inline check questions ───────────────────────────────────────── */

const checks = [
  {
    id: 'series-spot-check',
    question:
      'On site, what visual clue most reliably says “this is a series circuit”?',
    options: [
      'A standardised document reporting verified environmental impacts of a product',
      'Asbestos fibres from asbestos-containing tiles, adhesives, or backing materials',
      'A single chain — one cable in, one cable out at each component, no branching',
      'Preventive maintenance based on usage patterns and manufacturer recommendations',
    ],
    correctIndex: 2,
    explanation:
      'Series wiring is a daisy chain — single line through every component in turn, no branching. If you can see junction boxes splitting the supply to different loads, that’s parallel.',
  },
  {
    id: 'kvl-loop-check',
    question:
      'A loop has a 24 V battery, R₁ drops 8 V, R₂ drops 10 V. By Kirchhoff’s voltage law, what does R₃ drop?',
    options: [
      '6 V',
      '2 V',
      '14 V',
      '24 V',
    ],
    correctIndex: 0,
    explanation:
      'KVL — drops add to the supply. 8 + 10 + R₃ = 24, so R₃ = 6 V. One-line sanity check on every series problem.',
  },
  {
    id: 'mixed-network-strategy',
    question:
      'You meet a network with R₁ in series with [R₂ parallel R₃]. What’s the FIRST step in finding the total resistance?',
    options: [
      'Significantly increases temperature requiring derating',
      'At the lowest recommended level as specified by the manufacturer',
      '"Do as I do" is more powerful than "do as I say"',
      'Reduce R₂ parallel R₃ to a single equivalent resistor first',
    ],
    correctIndex: 3,
    explanation:
      'Parallel sections collapse first. (R₂ × R₃) ÷ (R₂ + R₃) gives one equivalent. Then add R₁ in series. Going the other way round leaves a parallel block dangling and the maths gets ugly.',
  },
];

/* ── Quiz questions ───────────────────────────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question: 'A single path for current with no branching tells you the circuit is…',
    options: [
      'A radial',
      'Series',
      'A ring final',
      'Parallel',
    ],
    correctAnswer: 1,
    explanation: 'One path = series. Same current flows through every component, no exceptions.',
  },
  {
    id: 2,
    question: 'You can recognise a parallel circuit by…',
    options: [
      'Circulating currents induced in the iron core',
      'Correct direction change and mechanical/electrical interlock',
      'Each load operating independently of the others',
      'Consider test conditions and environment',
    ],
    correctAnswer: 2,
    explanation:
      'Parallel branches are independent. One bulb blows, the others stay lit. That’s the diagnostic clue — and the reason almost every UK final circuit is parallel.',
  },
  {
    id: 3,
    question:
      'A 12 V supply with R₁ = 100 Ω, R₂ = 200 Ω, R₃ = 300 Ω all in series. The total current is…',
    options: [
      '0.12 A',
      '0.06 A',
      '1.0 A',
      '0.02 A',
    ],
    correctAnswer: 3,
    explanation: 'Rt = 100 + 200 + 300 = 600 Ω. I = 12 ÷ 600 = 0.02 A (20 mA).',
  },
  {
    id: 4,
    question: 'Two resistors of 6 Ω and 12 Ω wired in parallel give an equivalent resistance of…',
    options: [
      '4 Ω',
      '18 Ω',
      '6 Ω',
      '2 Ω',
    ],
    correctAnswer: 0,
    explanation: 'Rt = (6 × 12) ÷ (6 + 12) = 72 ÷ 18 = 4 Ω. Less than the smaller branch, as always.',
  },
  {
    id: 5,
    question:
      'At a socket MCB you find two line conductors and two neutral conductors at the same terminals. This is most likely…',
    options: [
      'A radial spur',
      'A ring final circuit',
      'A three-phase circuit',
      'A series circuit',
    ],
    correctAnswer: 1,
    explanation:
      'Two conductors at line, two at neutral, two at earth — the circuit leaves the consumer unit and returns to the same protective device. Classic ring final wiring.',
  },
  {
    id: 6,
    question:
      'Before opening accessories to trace circuit branches, the FIRST thing you do is…',
    options: [
      'To ensure, so far as is reasonably practicable, the health, safety and welfare at work of all employees',
      'A tangible or intangible output produced as a result of project work',
      'Carry out safe isolation — prove the tester on a known live source, isolate, lock-off, test dead',
      'Hazard identification, risk evaluation, control measures, review processes',
    ],
    correctAnswer: 2,
    explanation:
      'Safe isolation every time — prove the tester, isolate, lock-off, test dead, prove the tester again. No exceptions. Then start tracing.',
  },
  {
    id: 7,
    question:
      'A 24 V supply feeds a series leg of R₁ = 150 Ω + R₂ = 450 Ω, sat in parallel with R₃ = 120 Ω. Total resistance?',
    options: [
      '120 Ω',
      '720 Ω',
      '600 Ω',
      '100 Ω',
    ],
    correctAnswer: 3,
    explanation:
      'Series leg: 150 + 450 = 600 Ω. Parallel with 120 Ω: (600 × 120) ÷ (600 + 120) = 72000 ÷ 720 = 100 Ω.',
  },
  {
    id: 8,
    question:
      'A 230 V kettle element has resistance ≈ 26.5 Ω. The power it dissipates is approximately…',
    options: [
      '2.0 kW',
      '26.5 kW',
      '8.7 W',
      '870 W',
    ],
    correctAnswer: 0,
    explanation: 'P = V² ÷ R = 230² ÷ 26.5 = 52900 ÷ 26.5 ≈ 1996 W ≈ 2 kW. Bang on for a domestic kettle.',
  },
];

/* ── FAQs ─────────────────────────────────────────────────────────── */

const faqs = [
  {
    question: 'How do I safely identify circuit types on an energised installation?',
    answer:
      'You don’t — you isolate first. Prove your tester on a known source, isolate the circuit at the protective device, lock-off, test dead, prove the tester again. Then trace the wiring with confidence. Trying to trace a live circuit by feel or sight is how people get hurt.',
  },
  {
    question: 'What’s the quickest way to spot a ring final circuit at the consumer unit?',
    answer:
      'Two conductors at the same MCB or RCBO line terminal, two at the neutral bar going to the same circuit, and two at the earth bar. The cable leaves the CU, loops through every socket on the circuit, and comes back to the same protective device. End-to-end resistance test on each conductor with the ring opened gives you the proof.',
  },
  {
    question: 'Why are parallel circuits preferred over series for nearly every install?',
    answer:
      'Three reasons. One — each load needs the full 230 V, parallel gives that. Two — one fault on one branch doesn’t take everything offline. Three — BS 7671 314.1 requires installations to be divided into circuits to limit inconvenience, and parallel is what makes that practical.',
  },
  {
    question: 'Where do I still meet series circuits on site?',
    answer:
      'A switch wired in line with the load it controls is series. Inside LED tape with internal series strings. Decorative festoon strings (still common). Sensing chains in control circuits. Inside cartridge fuses — the element is in series with whatever it’s protecting.',
  },
  {
    question: 'I find a circuit with mixed series and parallel — how do I tackle the maths?',
    answer:
      'Map it out on paper before touching a calculator. Identify each parallel block, collapse it to a single equivalent resistance using product-over-sum or the reciprocal formula. Redraw the simpler circuit. Add the series resistors. Apply Ohm’s law to get the total current. Then work backwards if you need branch currents or individual voltage drops.',
  },
  {
    question: 'How do I sanity-check a multi-step calculation went right?',
    answer:
      'Three quick tests. One — total parallel resistance is always less than the smallest branch. Two — voltage drops in any series chain always sum to the supply (KVL). Three — branch currents in any parallel section always sum to the total (KCL). If any of those are off, find the slip before moving on.',
  },
];

const Sub6 = () => {
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
            eyebrow="Module 2 · Section 4 · Subsection 6"
            title="Putting it together — worked DC circuits"
            description="Recognise the circuit type on site, then apply Ohm’s law, series/parallel reduction and power formulas end-to-end. Two full multi-step examples and the diagnostic checks that go with them."
            tone="emerald"
          />

          <TLDR
            points={[
              'Series clue: single chain, one cable in/out at each component, all-fail-together. Parallel clue: branches off shared rails, each load independent.',
              'Mixed-network recipe: collapse parallel blocks first, then add the series chain, then I = V ÷ Rt — every time.',
              'Sanity checks — KVL: drops in any loop sum to the supply. KCL: branch currents sum to the total. Parallel total < smallest branch. Series total > largest resistor.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Visually identify series, parallel and ring final wiring patterns at the consumer unit and along a circuit.',
              'Compare the strengths and weaknesses of series vs parallel and explain why parallel dominates UK final circuits.',
              'Work end-to-end through a multi-step DC problem — total R, total I, branch currents, individual voltage drops, total power.',
              'Apply Kirchhoff’s voltage and current laws as one-line sanity checks on any answer.',
              'Translate a real on-site situation (failed device, intermittent trip, dim load) into the right circuit-analysis approach.',
              'Follow safe isolation as the first step before any tracing or measurement on an installation.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>What you already know</ContentEyebrow>

          <ConceptBlock title="Five Subs in, you’ve got the toolkit — this Sub puts it on real circuits">
            <p>
              Sub 4.1 gave you Ohm’s law (V = I × R) — the one equation you’ll use on every
              problem from here on. Sub 4.2 introduced series circuits — single path, current
              the same everywhere, voltages add up to the supply. Sub 4.3 introduced parallel
              circuits — shared voltage, branch currents add up to the total. Sub 4.4 showed
              how to combine the two by collapsing parallel blocks first, then summing the
              series chain. Sub 4.5 added power — three formulas, same physics — plus the I²R
              rule that makes cable heating bite. This Sub is where it all comes together on
              the kind of mixed circuits you’ll meet on site.
            </p>
            <p className="text-[13px] text-white/75 italic">
              Tool-bag thread: all this maths only matters if you can verify it on a real
              circuit. The MFT you met in <strong>Sub1.5</strong> measures Zs (the field version
              of total resistance — Ze + R1 + R2 in series) directly at any socket on the
              install. That’s the practical end of everything in this Sub: paper says one
              number, MFT says another, and the difference is what you fault-find on.
            </p>
          </ConceptBlock>

          <ContentEyebrow>Recognising circuit types on site</ContentEyebrow>

          <ConceptBlock
            title="What gives away a series circuit"
            plainEnglish="A daisy chain — current has only one route. No junctions, no parallel paths, every component takes its share of the supply voltage."
            onSite="Pure series final circuits are rare on a UK install. Most series wiring you’ll meet is a switch in line with one load, decorative lighting, LED tape internals, or sensing chains in control panels."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Single conductor in, single conductor out at every component.</li>
              <li>No junction boxes splitting the supply to multiple loads.</li>
              <li>Failure mode — one open circuit kills the whole lot.</li>
              <li>Voltage drop test reveals different drops at each component.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="What gives away a parallel circuit"
            plainEnglish="Multiple branches off shared line/neutral rails. Each device gets the full supply voltage and works independently of the others."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Junction boxes (or accessory back-boxes) with multiple conductors meeting.</li>
              <li>Each load operates independently — switch one off, others keep working.</li>
              <li>Multiple cables leaving the same supply point.</li>
              <li>Common locations — sockets, lighting points, fixed appliance circuits.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Ring finals vs radials at the consumer unit"
            plainEnglish="Look at the terminations at the protective device. Two conductors at each terminal = ring. One conductor = radial."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Ring final</strong> — two line conductors at the MCB/RCBO terminal, two
                at neutral, two at earth. The circuit loops out and back to the same device.
                Standard 32 A for socket rings.
              </li>
              <li>
                <strong>Radial</strong> — single conductors at each terminal. Tree-shaped, with
                branches at accessories rather than at the CU. Various ratings (16 A, 20 A, 32 A)
                depending on the application.
              </li>
            </ul>
            <p>
              End-to-end resistance testing (with the ring opened) confirms the ring really is a
              continuous loop — same value on each leg, equal to the loop resistance from CU
              back to CU.
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

          <ContentEyebrow>Worked example 1 — pure series chain with KVL check</ContentEyebrow>

          <ConceptBlock title="12 V supply, three resistors in series — find I, V across each, total power">
            <p>
              <strong>Given:</strong> 12 V supply, R₁ = 100 Ω, R₂ = 200 Ω, R₃ = 300 Ω, all in
              series.
              <br />
              <strong>Find:</strong> total resistance, current, voltage across each resistor,
              total power.
            </p>
            <p>
              <strong>Step 1 — total resistance.</strong> Series adds. Rt = 100 + 200 + 300 = 600
              Ω.
            </p>
            <p>
              <strong>Step 2 — current.</strong> I = Vs ÷ Rt = 12 ÷ 600 = 0.02 A (20 mA). Same
              current through every component because it’s series.
            </p>
            <p>
              <strong>Step 3 — voltage drops.</strong> V = I × R for each.
              <br />
              V₁ = 0.02 × 100 = 2 V.
              <br />
              V₂ = 0.02 × 200 = 4 V.
              <br />
              V₃ = 0.02 × 300 = 6 V.
            </p>
            <p>
              <strong>Step 4 — KVL sanity check.</strong> Drops should sum to the supply.
              <br />
              2 + 4 + 6 = 12 V ✓. Maths is consistent.
            </p>
            <p>
              <strong>Step 5 — total power.</strong> Use P = Vs × I on the whole circuit, or sum
              the components.
              <br />
              Whole circuit: P = 12 × 0.02 = 0.24 W.
              <br />
              Per component: P₁ = 0.02² × 100 = 0.04 W, P₂ = 0.02² × 200 = 0.08 W, P₃ = 0.02² ×
              300 = 0.12 W. Total = 0.24 W ✓.
            </p>
            <p>
              <strong>Step 6 — sanity.</strong> The biggest resistor (R₃) takes the biggest
              voltage and the most power. Series rule confirmed.
            </p>
          </ConceptBlock>

          <KirchhoffVoltageLoop caption="Kirchhoff’s voltage law — drops around any closed loop sum back to zero. The sanity check that catches arithmetic slips." />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Worked example 2 — mixed network end-to-end</ContentEyebrow>

          <ConceptBlock title="24 V supply with a series leg sitting alongside a parallel resistor">
            <p>
              <strong>Given:</strong> 24 V supply. Branch A is R₁ = 150 Ω in series with R₂ = 450
              Ω. Branch B is R₃ = 120 Ω. Both branches sit in parallel across the supply.
              <br />
              <strong>Find:</strong> total resistance, total current, branch currents, the voltage
              drops on R₁ and R₂ inside the series leg, and the total power dissipated.
            </p>
            <p>
              <strong>Step 1 — collapse the series leg.</strong> R(A) = R₁ + R₂ = 150 + 450 = 600
              Ω.
            </p>
            <p>
              <strong>Step 2 — combine the parallel pair.</strong> Rt = (R(A) × R₃) ÷ (R(A) + R₃)
              = (600 × 120) ÷ (600 + 120) = 72000 ÷ 720 = 100 Ω.
            </p>
            <p>
              <strong>Step 3 — total current.</strong> Itotal = Vs ÷ Rt = 24 ÷ 100 = 0.24 A.
            </p>
            <p>
              <strong>Step 4 — branch currents.</strong> Each branch sees the full 24 V.
              <br />
              I(A) = 24 ÷ 600 = 0.04 A.
              <br />
              I(B) = 24 ÷ 120 = 0.2 A.
              <br />
              KCL check: I(A) + I(B) = 0.04 + 0.2 = 0.24 A ✓ — matches Itotal.
            </p>
            <p>
              <strong>Step 5 — voltage drops inside the series leg.</strong> Same I(A) = 0.04 A
              flows through R₁ and R₂.
              <br />
              V(R₁) = 0.04 × 150 = 6 V.
              <br />
              V(R₂) = 0.04 × 450 = 18 V.
              <br />
              KVL check: 6 + 18 = 24 V ✓ — matches the supply.
            </p>
            <p>
              <strong>Step 6 — total power.</strong> On the whole circuit: P = Vs × Itotal = 24 ×
              0.24 = 5.76 W.
              <br />
              Cross-check by branch: P(A) = 24 × 0.04 = 0.96 W, P(B) = 24 × 0.2 = 4.8 W. Total =
              0.96 + 4.8 = 5.76 W ✓.
            </p>
            <p>
              <strong>Step 7 — sanity.</strong> The lower-resistance branch (B at 120 Ω) carries
              the bigger current and dissipates the bigger power. Parallel rule confirmed.
              Inside the series leg, the bigger resistor (R₂ at 450 Ω) takes the bigger voltage
              drop. Series rule confirmed. Both rules holding at once means the answer is solid.
            </p>
          </ConceptBlock>

          <MixedCircuit
            voltage="24 V"
            caption="A mixed network — a series leg in parallel with a single resistor. Reduce parallel first, then add series, then Ohm’s law finishes the job."
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Worked example 3 — kitchen extension cable sizing end-to-end</ContentEyebrow>

          <ConceptBlock
            title="6 mm² T&E, 28 m run, 32 A radial — pulling Section 3 into the synthesis"
            plainEnglish="One real cable problem, four prior Subs all touched. This is what synthesis means — the same physical cable is the subject of resistivity, voltage drop, thermal effects and power, all at the same time."
            onSite="A real kitchen extension where you’re sizing the run from the new sub-CU back to the main board. Not a textbook resistor — actual T&E carrying actual shower current."
          >
            <p>
              <strong>Given:</strong> 6 mm² T&E copper, route length 28 m, 32 A radial feeding a
              shower. ρ ≈ 0.0172 µΩ·m for copper, mV/A/m for 6 mm² T&E reference method C ≈ 7.3.
            </p>
            <p>
              <strong>Step 1 — cold resistance (Sub3.3, R = ρL/A).</strong> Round-trip means out
              and back, so length doubled:
              <br />
              R = 0.0172e-6 × 28 × 2 ÷ 6e-6 = <strong>0.16 Ω</strong> round-trip at 20°C.
            </p>
            <p>
              <strong>Step 2 — voltage drop at full load (Sub3.4, Method B).</strong> Use the
              mV/A/m engineered shortcut, which already bakes in the operating temperature and
              loop length:
              <br />
              Vd = (7.3 × 32 × 28) ÷ 1000 = <strong>6.54 V</strong> = 6.54 ÷ 230 ={' '}
              <strong>2.85%</strong>. Inside the 5% socket / appliance limit. Pass.
            </p>
            <p>
              <strong>Step 3 — heat dumped in the cable (Sub3.5, P = I²R).</strong> Using the
              cold resistance from Step 1:
              <br />
              P = I² × R = 32² × 0.16 = 1024 × 0.16 = <strong>164 W</strong> dissipated as heat
              in the round-trip of cable. That’s ~5.9 W per metre of round-trip — small per
              metre, real in total. This is the heat budget Cg / Ca derating in Appendix 4 has
              to keep inside the 70°C PVC limit.
            </p>
            <p>
              <strong>Step 4 — power delivered to the load (Sub4.5, P = V × I).</strong> Shower
              at full draw:
              <br />
              P(load) = V × I = 230 × 32 ≈ <strong>7,360 W</strong> ≈ 9.5 kW with the actual
              shower voltage allowing for Vd. The cable loses 164 W as heat; the load gets the
              rest. As a fraction: 164 ÷ (164 + 7,360) ≈ <strong>2.2%</strong> of the supplied
              electrical energy is wasted heating the cable, the other 97.8% does useful work in
              the heating element.
            </p>
            <p>
              That single calculation touched <strong>four prior Subs</strong> — Sub3.3
              (resistance from ρL/A), Sub3.4 (voltage drop via mV/A/m), Sub3.5 (I²R cable
              heating) and Sub4.5 (load power from V × I). That’s what synthesis means: the
              cable doesn’t care which Sub it lives in, and neither does the customer paying the
              bill.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Try it yourself</ContentEyebrow>

          <ConceptBlock title="The series and parallel calculator">
            <p>
              Use the calculator below to verify the worked examples step-by-step. Punch in the
              branch resistances at each stage of the reduction and check the equivalent values
              line up with the maths above. The calculator’s for verification — the exam wants
              you to show the working.
            </p>
          </ConceptBlock>

          <SeriesParallelCalculators />

          <SectionRule />

          <ContentEyebrow>Series vs parallel — when each one wins</ContentEyebrow>

          <ConceptBlock
            title="Why parallel dominates final circuits"
            plainEnglish="Independent loads, full voltage, fault tolerance. The regs effectively require it."
          >
            <p>
              <strong>Parallel pros:</strong> each load gets the full supply voltage, one
              failure doesn’t take the others offline, easy to add or remove devices, easy to
              isolate a single point for maintenance.
            </p>
            <p>
              <strong>Parallel cons:</strong> more cable and connections, slightly higher
              install cost, total current goes up as more loads are added (so cable and
              protective device must be sized for the diversity-adjusted total).
            </p>
            <p>
              <strong>Series pros:</strong> simple, low cost, naturally limits current,
              voltage divides predictably across components — useful in control sensing chains
              and inside equipment.
            </p>
            <p>
              <strong>Series cons:</strong> one failure stops every load, voltage shares between
              components rather than each getting full supply, hard to add loads without redesign.
              Unsuitable for almost every UK final circuit on those grounds.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 314.1"
            clause="Every electrical installation shall be divided into circuits, as necessary, to avoid danger and minimise inconvenience in the event of a fault."
            meaning={
              <>
                Translation — split things up so a single fault doesn’t take everything offline.
                In practice that means parallel branches across multiple final circuits, each on
                its own protective device. Series-only final circuits would fail this principle
                — and that’s a big part of why you don’t see them in domestic installs.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 3, Chapter 31, Regulation 314.1"
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Skipping the sanity checks because the calculation ‘looks right’"
            whatHappens={
              <>
                You work through a mixed-network problem, get a number, and move on. But you
                missed a unit conversion and your answer is 1000× out. The maths reads fine in
                isolation — until you check it against the supply voltage or the expected current
                on a real install.
              </>
            }
            doInstead={
              <>
                Three sanity checks on every multi-step problem. One — KVL: voltage drops in any
                series chain sum back to the supply. Two — KCL: branch currents in any parallel
                section sum back to the total. Three — total parallel resistance is always less
                than the smallest branch. Run those three after every problem and you’ll catch
                most of your own slips before they get into a write-up.
              </>
            }
          />

          <Scenario
            title="The lighting circuit where ‘half the room is dim’"
            situation={
              <>
                A homeowner reports that on one of their downstairs lighting circuits, two of
                the four ceiling lamps are noticeably dimmer than the other two. All four lamps
                are nominally identical. Switching one of the dim lamps off makes the other dim
                lamp slightly brighter.
              </>
            }
            whatToDo={
              <>
                Independent dimming and the “turn one off, the other gets brighter” behaviour
                points at series wiring instead of parallel. Two of the lamps have likely been
                joined in series by mistake (or because of a damaged loop wire), so they share
                the supply voltage instead of each getting full mains. Isolate, prove dead, open
                the rose on the dim lamps and trace. Expect to find the loop-in conductor for
                one fitting feeding straight into another fitting in series, instead of teeing
                off back to the switch / other lamps in parallel. Re-wire so each lamp sits in
                parallel across the switched live and neutral.
              </>
            }
            whyItMatters={
              <>
                Voltage division in series is a feature, not a bug — but on a final lighting
                circuit it’s never what you want. Every lamp should see the full 230 V. Spotting
                the symptom (dim + interactive) before pulling fittings apart saves a lot of
                blind tracing.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>All the maths from this section in one place</ContentEyebrow>

          <ConceptBlock title="Worth memorising — the Section 4 formula sheet">
            <p>
              Every formula you’ve used across Sub 4.1 to Sub 4.5, gathered in one place.
              Screenshot this for revision — these are the eight equations that solve every
              DC problem at this level.
            </p>
          </ConceptBlock>

          <FormulaList
            items={[
              { text: 'Ohm’s law: V = I × R   (rearrange: I = V ÷ R, R = V ÷ I)' },
              { text: 'Series total resistance: Rt = R₁ + R₂ + R₃ + …' },
              { text: 'Parallel total resistance (general): 1 ÷ Rt = 1 ÷ R₁ + 1 ÷ R₂ + 1 ÷ R₃ + …' },
              { text: 'Parallel total (two resistors): Rt = (R₁ × R₂) ÷ (R₁ + R₂)' },
              { text: 'Voltage divider: Vx = Vs × Rx ÷ Rt' },
              { text: 'Current divider (two branches): Ix = Itotal × R(other) ÷ (Rx + R(other))' },
              { text: 'Power: P = V × I   = I² × R   = V² ÷ R' },
              { text: 'Energy: E (kWh) = P (kW) × time (h)' },
            ]}
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Series clues: single chain, one cable in/out, all-fail-together. Parallel clues: branches off shared rails, each load independent.',
              'Reduction strategy never changes — parallel sections first, series additions second, Ohm’s law finishes the job.',
              'KVL and KCL are your two-line sanity checks. Drops in a loop sum to the supply. Branch currents sum to the total.',
              'Parallel total resistance is always less than the smallest branch. Series total is always more than the largest resistor.',
              'Series shares VOLTAGE; parallel branches share CURRENT. Power follows current in series (biggest R takes most), and follows voltage in parallel (smallest R takes most).',
              'Safe isolation comes BEFORE any tracing or measurement on a real install. Prove the tester, isolate, lock-off, test dead, prove the tester again. No exceptions.',
            ]}
          />

          <Quiz title="Worked DC circuits — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2/section4/4-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Power in series and parallel circuits
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2/section5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 5 — Magnetism and electromagnetism
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default Sub6;
