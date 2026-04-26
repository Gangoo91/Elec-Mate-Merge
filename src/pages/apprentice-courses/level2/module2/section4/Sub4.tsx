/**
 * Module 2 · Section 4 · Sub 4 — Total resistance: series and parallel calcs
 * City & Guilds 2365-02 → Unit 202 → LO4 → AC 4.5
 * Polished from relocated content during the Module 2 LO restructure.
 */
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import SeriesParallelCalculators from '@/components/apprentice-courses/SeriesParallelCalculators';
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
import { SeriesCircuit, ParallelCircuit, MixedCircuit } from '@/components/study-centre/diagrams';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Total resistance — series and parallel calcs | Level 2 Module 2.4.4 (AC 4.5) | Elec-Mate';
const DESCRIPTION =
  'Combining series and parallel resistors into a single equivalent resistance. Step-by-step reduction strategy and worked mixed-network examples for Level 2 apprentices.';

/* ── Inline check questions ───────────────────────────────────────── */

const checks = [
  {
    id: 'reduction-order',
    question:
      'You’re reducing a network that has parallel branches in the middle of a series chain. Which do you reduce first?',
    options: [
      'Always start with the series part',
      'Reduce the parallel sections first, then add the series resistors to the result',
      'Always start with the largest resistor',
      'Pick the side closest to the supply',
    ],
    correctIndex: 1,
    explanation:
      'Collapse the parallel sections to a single equivalent resistance first, then you’ve got a clean series chain to add up. Doing it the other way round leaves you with a mess.',
  },
  {
    id: 'two-equal-parallel-shortcut',
    question: 'Two equal 200 Ω resistors in parallel give a total of…',
    options: ['400 Ω', '200 Ω', '100 Ω', '50 Ω'],
    correctIndex: 2,
    explanation:
      'Two equal Rs in parallel = R ÷ 2. So 200 ÷ 2 = 100 Ω. Quick mental shortcut for spot calcs.',
  },
  {
    id: 'mixed-network-total',
    question:
      'Two 10 Ω resistors in parallel, then in series with a 5 Ω resistor. What is the total resistance?',
    options: ['25 Ω', '15 Ω', '10 Ω', '20 Ω'],
    correctIndex: 2,
    explanation:
      'Parallel pair first: (10 × 10) ÷ (10 + 10) = 5 Ω. Then add the series 5 Ω: 5 + 5 = 10 Ω total.',
  },
];

/* ── Quiz questions ───────────────────────────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question: 'Total resistance of three resistors in series is…',
    options: [
      'Their product',
      'Their sum',
      'Their average',
      'The smallest one',
    ],
    correctAnswer: 1,
    explanation:
      'Series resistances add directly: Rt = R₁ + R₂ + R₃. Each one fights the current in turn, so they pile up.',
  },
  {
    id: 2,
    question: 'For two resistors in parallel, the equivalent resistance is…',
    options: [
      'R₁ + R₂',
      '(R₁ × R₂) ÷ (R₁ + R₂)',
      'R₁ − R₂',
      'R₁ × R₂',
    ],
    correctAnswer: 1,
    explanation: 'Product over sum is the two-resistor parallel shortcut. Always less than the smallest branch.',
  },
  {
    id: 3,
    question:
      'When reducing a complex series-parallel network, the recommended order of operations is…',
    options: [
      'Series first, then parallel',
      'Parallel first, then series',
      'Largest resistor first, smallest last',
      'Whichever side has the supply',
    ],
    correctAnswer: 1,
    explanation:
      'Collapse the parallel sections to single equivalent resistors, which leaves a clean series chain to add up. Easier to track and harder to mess up.',
  },
  {
    id: 4,
    question:
      'Three resistors: 20 Ω and 30 Ω in parallel, then in series with 10 Ω. Total resistance?',
    options: ['60 Ω', '22 Ω', '15 Ω', '50 Ω'],
    correctAnswer: 1,
    explanation: 'Parallel pair: (20 × 30) ÷ (20 + 30) = 600 ÷ 50 = 12 Ω. Then series: 12 + 10 = 22 Ω.',
  },
  {
    id: 5,
    question: 'A voltage divider with a 12 V supply, R₁ = 4 Ω, R₂ = 8 Ω. Voltage across R₂?',
    options: ['4 V', '6 V', '8 V', '12 V'],
    correctAnswer: 2,
    explanation:
      'V₂ = Vs × R₂ ÷ Rt = 12 × 8 ÷ (4 + 8) = 12 × 8 ÷ 12 = 8 V. The bigger resistor takes the bigger share.',
  },
  {
    id: 6,
    question:
      'Current divider: 3 A total flowing into a parallel pair of 6 Ω and 12 Ω. Current through the 6 Ω branch?',
    options: ['1 A', '1.5 A', '2 A', '3 A'],
    correctAnswer: 2,
    explanation:
      'Lower resistance carries more current. I(6 Ω) = Itotal × R(other) ÷ (R(6) + R(other)) = 3 × 12 ÷ (6 + 12) = 36 ÷ 18 = 2 A.',
  },
  {
    id: 7,
    question:
      'You collapse a network and end up with Rt = 75 Ω across a 12 V supply. What is the total current?',
    options: ['0.16 A', '0.625 A', '6.25 A', '900 A'],
    correctAnswer: 0,
    explanation: 'I = V ÷ R = 12 ÷ 75 = 0.16 A. Every reduction problem ends with one Ohm’s law calc.',
  },
  {
    id: 8,
    question:
      'Three identical 30 Ω resistors all in parallel. What is the equivalent resistance?',
    options: ['90 Ω', '30 Ω', '15 Ω', '10 Ω'],
    correctAnswer: 3,
    explanation: 'Identical parallel resistors: Rt = R ÷ n = 30 ÷ 3 = 10 Ω.',
  },
];

/* ── FAQs ─────────────────────────────────────────────────────────── */

const faqs = [
  {
    question: 'Why do I always reduce parallel sections first?',
    answer:
      'Because once you’ve collapsed each parallel block into a single equivalent resistor, what’s left is a simple series chain — and series is just addition. If you tried to do it the other way round, you’d still have parallel sections sitting in the middle, and the maths gets ugly fast.',
  },
  {
    question: 'How can the total resistance be smaller than any one branch in a parallel section?',
    answer:
      'Because every branch is another route the current can take. More routes mean less overall opposition. Two 10 Ω resistors in parallel give 5 Ω, three 10 Ω resistors give 3.33 Ω, four give 2.5 Ω. The pattern always heads down.',
  },
  {
    question: 'When should I use the voltage divider rule instead of working out current first?',
    answer:
      'When you only need ONE voltage in a series chain and don’t care about the current. Vx = Vs × Rx ÷ Rt is just Ohm’s law packaged up. For full circuit analysis (every branch, every drop), it’s usually quicker to find the current and then V = I × R for each component.',
  },
  {
    question: 'How does this maths apply to real installations?',
    answer:
      'LED arrays often have resistor networks that mix series-parallel patterns. Control panels, dimmer circuits, and any equipment with internal resistor ladders all use combined networks. Cable runs themselves are series resistance with the load — voltage drop calcs are just this maths applied to copper.',
  },
  {
    question: 'I keep losing track on big networks. Any tips?',
    answer:
      'Draw it out. Put a box around each parallel pair, work out the equivalent, redraw with that single resistor in place. Repeat until you have one final value. Going step-by-step on paper is much faster than trying to do it all at once in your head.',
  },
  {
    question: 'Why does the calculator give a different number than my hand calc?',
    answer:
      'Almost always rounding. Calculators carry full precision; hand calcs usually round each step to 1 or 2 decimals. Try doing the maths without rounding until the very last step. If you’re still out, there’s a unit slip (mA vs A or kΩ vs Ω) hiding somewhere — re-check your conversions.',
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
            className="inline-flex items-center gap-2 h-10 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 4
          </button>

          <PageHero
            eyebrow="Module 2 · Section 4 · Subsection 4"
            title="Total resistance — series and parallel calcs"
            description="Step-by-step reduction strategy for any network. Collapse the parallel parts first, then add the series. One method, every circuit."
            tone="emerald"
          />

          <TLDR
            points={[
              'Series resistances add: Rt = R₁ + R₂ + R₃ + … Parallel resistances combine: 1 ÷ Rt = 1 ÷ R₁ + 1 ÷ R₂ + …',
              'Two-resistor shortcuts: parallel = (R₁ × R₂) ÷ (R₁ + R₂); equal pair = R ÷ 2; n equal = R ÷ n.',
              'Reduction strategy — parallel sections first, series additions second. Repeat until one equivalent value remains, then I = V ÷ Rt finishes the job.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State the formulas for total resistance in series and in parallel, and choose the right one for the network in front of you.',
              'Apply product-over-sum, equal-pair and equal-n shortcuts to speed up parallel calculations.',
              'Reduce a mixed series-parallel network step-by-step, redrawing as you go, to a single equivalent resistance.',
              'Use Ohm’s law on the equivalent circuit to find total current, then work backwards to find branch currents and voltage drops.',
              'Apply the voltage divider rule (Vx = Vs × Rx ÷ Rt) and the current divider rule for spot calcs.',
              'Sanity-check every reduction — total parallel R is always less than the smallest branch; total series R is always more than the largest resistor.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The two foundation rules</ContentEyebrow>

          <ConceptBlock
            title="Series — resistances add directly"
            plainEnglish="Components in line, current has to fight through every one. Each resistance piles on top of the last."
          >
            <p>
              <strong>Formula:</strong> Rt = R₁ + R₂ + R₃ + …
            </p>
            <p>
              <strong>Worked check.</strong> Three resistors in series: 100 Ω, 200 Ω, 300 Ω.
              <br />
              Rt = 100 + 200 + 300 = 600 Ω. The total is bigger than the biggest individual
              resistor — true for every series chain.
            </p>
          </ConceptBlock>

          <SeriesCircuit
            voltage="12 V"
            resistors={[
              { label: 'R₁', value: '100 Ω' },
              { label: 'R₂', value: '200 Ω' },
              { label: 'R₃', value: '300 Ω' },
            ]}
            caption="Three series resistors. Rt = 100 + 200 + 300 = 600 Ω. I = 12 ÷ 600 = 0.02 A."
          />

          <ConceptBlock
            title="Parallel — combine the reciprocals"
            plainEnglish="Each branch is another path. More paths mean less overall opposition, so total resistance always drops."
          >
            <p>
              <strong>Formula (general):</strong> 1 ÷ Rt = 1 ÷ R₁ + 1 ÷ R₂ + 1 ÷ R₃ + …
              <br />
              <strong>Two-resistor shortcut:</strong> Rt = (R₁ × R₂) ÷ (R₁ + R₂).
              <br />
              <strong>n equal resistors:</strong> Rt = R ÷ n.
            </p>
            <p>
              <strong>Worked check.</strong> Three branches: 4 Ω, 6 Ω and 12 Ω.
              <br />
              1 ÷ Rt = 1 ÷ 4 + 1 ÷ 6 + 1 ÷ 12 = 3 ÷ 12 + 2 ÷ 12 + 1 ÷ 12 = 6 ÷ 12 = 0.5.
              <br />
              Rt = 1 ÷ 0.5 = 2 Ω. Less than the smallest branch (4 Ω) — correct.
            </p>
          </ConceptBlock>

          <ParallelCircuit
            voltage="12 V"
            resistors={[
              { label: 'R₁', value: '4 Ω' },
              { label: 'R₂', value: '6 Ω' },
              { label: 'R₃', value: '12 Ω' },
            ]}
            caption="Three parallel branches. Equivalent resistance = 2 Ω, total current = 12 ÷ 2 = 6 A."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The reduction strategy</ContentEyebrow>

          <ConceptBlock
            title="Parallel first, series second — every time"
            plainEnglish="Collapse each parallel block into a single resistor. Then you’re left with a clean series chain that just adds up."
          >
            <p>
              The recipe doesn’t change, no matter how messy the network looks at first:
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                Find every parallel section. Reduce each one to a single equivalent resistance
                using the formulas above.
              </li>
              <li>
                Redraw the circuit with those single equivalents in place. You should be looking
                at a series chain or a much simpler network.
              </li>
              <li>Add the series resistances to get the final total Rt.</li>
              <li>
                Use I = Vs ÷ Rt to find the total supply current — this is the current through
                every series resistor in the simplified circuit.
              </li>
              <li>
                Work backwards if you need branch currents or individual voltage drops, using V =
                I × R or the divider rules.
              </li>
            </ol>
            <p>
              Going parallel-first keeps the bookkeeping clean. Going series-first leaves
              parallel chunks dangling in the middle and the maths balloons.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <ConceptBlock title="Worked example — a real mixed network">
            <p>
              <strong>Given:</strong> 12 V supply. R₁ = 10 Ω in series with a parallel block of
              R₂ = 20 Ω, R₃ = 30 Ω and R₄ = 60 Ω.
              <br />
              <strong>Find:</strong> total resistance and the supply current.
            </p>
            <p>
              <strong>Step 1 — three resistors in parallel, all different.</strong> Equal-pair
              and product-over-sum shortcuts don’t fit, so reach for the general reciprocal
              formula: 1 ÷ Rt = 1 ÷ R₂ + 1 ÷ R₃ + 1 ÷ R₄. Three different denominators — pick
              a common one and add.
            </p>
            <p>
              1 ÷ 20 + 1 ÷ 30 + 1 ÷ 60 = 3 ÷ 60 + 2 ÷ 60 + 1 ÷ 60 = 6 ÷ 60.
              <br />
              So 1 ÷ Rt = 6 ÷ 60, which means Rt(parallel) = 60 ÷ 6 = 10 Ω. Less than the
              smallest branch (20 Ω) — sanity check passed.
            </p>
            <p>
              <strong>Step 2 — that gives me a single equivalent.</strong> The whole parallel
              block now collapses to one 10 Ω resistor.
            </p>
            <p>
              <strong>Step 3 — redraw as 10 Ω in series with that equivalent.</strong> R₁ at
              the front, then the 10 Ω I just calculated. A clean two-resistor series chain.
            </p>
            <p>
              <strong>Step 4 — sum them.</strong> Rt = 10 + 10 = 20 Ω. Now Ohm’s law on the
              whole circuit:
              <br />
              I = Vs ÷ Rt = 12 ÷ 20 = 0.6 A.
            </p>
            <p>
              <strong>Sanity.</strong> Total parallel R (10 Ω) is below the smallest branch
              (20 Ω) ✓. Total series R (20 Ω) is above either component (10 Ω + 10 Ω) ✓. The
              0.6 A is a believable supply current for a 12 V circuit with modest resistors.
              All four checks line up — the answer is solid.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Worked example 1 — series-then-parallel</ContentEyebrow>

          <ConceptBlock title="A series leg sitting alongside a single resistor">
            <p>
              <strong>Given:</strong> 24 V supply. Branch A is R₁ = 150 Ω in series with R₂ = 450
              Ω. Branch B is just R₃ = 120 Ω. Both branches sit in parallel across the supply.
              <br />
              <strong>Find:</strong> total resistance, total current and the current in each
              branch.
            </p>
            <p>
              <strong>Step 1 — reduce the series leg.</strong> R(A) = R₁ + R₂ = 150 + 450 = 600
              Ω. Now you’ve got two parallel branches: 600 Ω and 120 Ω.
            </p>
            <p>
              <strong>Step 2 — combine the parallel pair.</strong> Rt = (600 × 120) ÷ (600 + 120)
              = 72000 ÷ 720 = 100 Ω.
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
            </p>
            <p>
              <strong>Step 5 — sanity check.</strong> Branch currents must sum to total: 0.04 +
              0.2 = 0.24 A ✓. The lower-resistance branch (120 Ω) carries the larger current —
              also correct.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Worked example 2 — parallel-then-series</ContentEyebrow>

          <ConceptBlock title="A parallel pair feeding a single series resistor">
            <p>
              <strong>Given:</strong> 12 V supply. R₁ = 100 Ω and R₂ = 300 Ω in parallel. That
              parallel block is then in series with R₃ = 50 Ω.
              <br />
              <strong>Find:</strong> total resistance, total current, the voltage across the
              parallel block, and the currents in R₁ and R₂.
            </p>
            <p>
              <strong>Step 1 — collapse the parallel pair.</strong> R(p) = (100 × 300) ÷ (100 +
              300) = 30000 ÷ 400 = 75 Ω.
            </p>
            <p>
              <strong>Step 2 — add the series resistor.</strong> Rt = R(p) + R₃ = 75 + 50 = 125
              Ω.
            </p>
            <p>
              <strong>Step 3 — total current.</strong> Itotal = 12 ÷ 125 = 0.096 A. That same
              current flows through R₃ and into the parallel block.
            </p>
            <p>
              <strong>Step 4 — voltage across the parallel block.</strong> V(p) = Itotal × R(p)
              = 0.096 × 75 = 7.2 V. (Cross-check: V across R₃ = 0.096 × 50 = 4.8 V, and 7.2 + 4.8
              = 12 V ✓.)
            </p>
            <p>
              <strong>Step 5 — branch currents.</strong> Both branches see 7.2 V.
              <br />
              I(R₁) = 7.2 ÷ 100 = 0.072 A.
              <br />
              I(R₂) = 7.2 ÷ 300 = 0.024 A.
              <br />
              Check: 0.072 + 0.024 = 0.096 A ✓ — matches the total current.
            </p>
          </ConceptBlock>

          <MixedCircuit
            voltage="12 V"
            caption="What to look at — R₂ and R₃ are the two branches stacked on the right, sharing the same pair of nodes; that’s the parallel block. R₁ is the lone resistor on the left in line with the supply; that’s the series part. Collapse the parallel block to one equivalent first, then add R₁ to get total Rt."
          />

          <SectionRule />

          <ContentEyebrow>Two divider shortcuts worth knowing</ContentEyebrow>

          <ConceptBlock
            title="Voltage divider — find one voltage without solving the current first"
            plainEnglish="In a series chain, each resistor’s voltage share equals its own resistance divided by the total, multiplied by the supply."
          >
            <p>
              <strong>Formula:</strong> Vx = Vs × Rx ÷ Rt.
            </p>
            <p>
              <strong>Worked example.</strong> 12 V supply, R₁ = 4 Ω, R₂ = 8 Ω in series. Find V₂.
              <br />
              Rt = 4 + 8 = 12 Ω. V₂ = 12 × 8 ÷ 12 = 8 V. Check: V₁ = 12 × 4 ÷ 12 = 4 V, total =
              12 V ✓.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Current divider — find one branch current without solving the total first"
            plainEnglish="In a parallel pair, each branch carries a share of the total inversely proportional to its resistance."
          >
            <p>
              <strong>Formula (two branches):</strong> I(x) = Itotal × R(other) ÷ (Rx + R(other)).
            </p>
            <p>
              <strong>Worked example.</strong> 3 A total flowing into a parallel pair of 6 Ω and
              12 Ω. Find the current in the 6 Ω branch.
              <br />
              I(6 Ω) = 3 × 12 ÷ (6 + 12) = 36 ÷ 18 = 2 A. Check: I(12 Ω) = 3 × 6 ÷ 18 = 1 A;
              total 2 + 1 = 3 A ✓.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Try it yourself</ContentEyebrow>

          <ConceptBlock title="The series and parallel calculator">
            <p>
              Enter your branch values and the calculator returns equivalent resistance for both
              series and parallel arrangements. Use it to verify each step of your manual
              reduction — not as a substitute for the working out. Learning the order matters
              more than the answer.
            </p>
          </ConceptBlock>

          <SeriesParallelCalculators />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Where it ties to BS 7671</ContentEyebrow>

          <ConceptBlock
            title="Reduction maths underneath voltage drop"
            plainEnglish="A long cable run is a series resistance in front of the load. The cable steals voltage from the load — exactly the same maths as a voltage divider."
          >
            <p>
              On a real install, the conductor’s own resistance is in series with whatever load
              it feeds. Voltage drops along the cable, and the load sees less than the full
              supply. The further you go, or the smaller the cable, the bigger the drop. That
              limit is set by BS 7671.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Section 525 (deemed-compliance limit, ELV lighting)"
            clause="In ELV lighting installations, the voltage drop between the transformer and the furthest luminaire shall not exceed 5 % of the nominal voltage of the ELV installation in order to be deemed to comply with Section 525 of BS 7671."
            meaning={
              <>
                Translation — voltage drop along a cable is series resistance at work. Section
                525 caps how much of the supply you’re allowed to lose before the load. The
                series and parallel reduction maths in this Sub is exactly what cable design
                software is doing under the hood when it sizes conductors against the volt-drop
                limit.
              </>
            }
            cite="Verbatim wording paraphrased — see BS 7671 Section 525 and Appendix 4 Table 4Ab for the full text and exact percentage limits."
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Doing series and parallel in the wrong order"
            whatHappens={
              <>
                You see a network with R₁ in series with [R₂ in parallel with R₃] and start
                adding R₁ + R₂ first. That gives you a number that means nothing — R₁ and R₂ are
                NOT in series with each other when R₃ is sitting in parallel across R₂.
              </>
            }
            doInstead={
              <>
                Always reduce the parallel block first. (R₂ × R₃) ÷ (R₂ + R₃) gives one
                equivalent resistor. THEN add R₁ to that result. Get the order right and the
                rest is just arithmetic.
              </>
            }
          />

          <Scenario
            title="The LED array that won’t hit full brightness"
            situation={
              <>
                You’ve installed a custom LED array with several LEDs in series chains, and those
                chains wired in parallel back to a 24 V driver. The whole thing is dim and the
                supplier’s app says it should pull 1.6 A but you’re measuring 1.0 A.
              </>
            }
            whatToDo={
              <>
                Treat each chain as a series resistance (LED forward voltage drops add up like
                resistor drops in series). Each chain in parallel branches off the 24 V driver.
                Calculate the expected resistance of one chain, divide by the number of chains
                for the equivalent, then I = V ÷ Rt should hit the manufacturer figure. If your
                hand calc says 1.6 A but the meter reads 1.0 A, one chain is open (probably a
                blown LED or a bad solder joint) — that branch isn’t pulling its share, the
                others still work, and total current drops. Trace each branch with the array
                isolated.
              </>
            }
            whyItMatters={
              <>
                The reduction maths gives you the EXPECTED total. The measurement gives you the
                actual. The gap between the two tells you what’s wrong — usually a missing
                branch or a higher-than-spec series resistance somewhere.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Where total resistance shows up on site</ContentEyebrow>

          <ConceptBlock
            title="Three real installer concerns, all the same maths"
            plainEnglish="The reduction strategy you’ve just learned isn’t just exam fodder — it’s how you reason about consumer units, earth fault loops and odd commercial gear like AV systems. Three concrete places it matters."
            onSite="The maths doesn’t change between a textbook problem and a real CU. Resistors become circuits, branches become final circuits, the supply becomes the cut-out. Same formulas, different labels."
          >
            <ul className="space-y-2.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Combining final circuits at the consumer unit (parallel).</strong> Every
                final circuit on the CU is a parallel branch off the same line and neutral bars.
                Total current at the cut-out = sum of every circuit’s current — and the busbar /
                main switch Iz has to exceed that diversity-adjusted total, not just any one
                circuit’s rating. Same KCL you’ll meet in <strong>Sub4.6</strong> at the
                consumer-unit scale.
              </li>
              <li>
                <strong>Zs as a series sum (Ze + R1 + R2).</strong> The earth fault loop
                impedance from <strong>Sub4.6</strong> is just resistors in series — the
                external loop (Ze) plus the line conductor’s R1 plus the CPC’s R2. Zs = Ze + R1
                + R2, exactly the “series resistances add” rule from this Sub. That sum decides
                whether the MCB trips fast enough on an earth fault.
              </li>
              <li>
                <strong>Speaker / AV runs in parallel.</strong> Wire two 8 Ω speakers in parallel
                to the same amp output and the amp now sees (8 × 8) ÷ (8 + 8) = <strong>4 Ω</strong>.
                Halving the impedance the amp sees can push it past its safe load rating and trip
                the protection — or burn the output stage if there isn’t any. Same product-over-sum
                formula you used on resistors a few paragraphs ago.
              </li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="Two parallel-wired emergency luminaires — one fails"
            situation={
              <>
                A small commercial unit has two emergency-lit twin-spot fittings wired in
                parallel from the same EM supply, drawing roughly the same current each. You’re
                doing a 6-month flick test. One fitting fails to come on. Out of curiosity you
                clamp the supply current at the EM circuit and notice it’s now <strong>lower</strong>{' '}
                than it was when both were healthy. The apprentice with you reckons that can’t be
                right — “surely a failed fitting means more resistance, so more current?”
              </>
            }
            whatToDo={
              <>
                Talk it through using parallel maths. Two equal branches in parallel give Rt =
                R ÷ 2; total supply current splits equally between them. Lose one branch
                completely (open circuit) and the parallel network reduces to just the surviving
                branch — total resistance the supply sees has gone <strong>UP</strong>, not down,
                because you’ve removed one of the paths the current was using. By Ohm’s law the
                supply current at the EM circuit therefore <strong>drops</strong> — exactly what
                the clamp shows. Resolution: replace the failed lamp / battery / driver per the
                manufacturer’s spec, retest, current at the supply returns to its previous value.
              </>
            }
            whyItMatters={
              <>
                Intuition says “failed = more resistance = more current”. Wrong for parallel.
                Losing a branch removes one path for current, so total resistance UP and total
                current DOWN. KCL still balances at every node — there’s just less current
                flowing in total because a path has gone. Get this nailed before you start
                fault-finding parallel circuits or you’ll chase the wrong reading.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Series resistances add. Parallel resistances combine via reciprocals (or product-over-sum for two).',
              'Reduction strategy never changes — collapse parallel sections first, then add the series chain.',
              'Total parallel resistance is always less than the smallest branch. Total series resistance is always more than the largest individual resistor. Use these as instant sanity checks.',
              'Voltage divider (Vx = Vs × Rx ÷ Rt) and current divider (Ix = Itotal × R(other) ÷ (Rx + R(other))) are time-saving shortcuts for spot answers.',
              'After reducing, one Ohm’s law calc finishes the job: I = Vs ÷ Rt gives the total current, which is also the current through every series resistor in the simplified circuit.',
              'Cable runs are series resistance in disguise. Voltage drop limits in BS 7671 Section 525 are this maths applied to copper.',
            ]}
          />

          <Quiz
            title="Total resistance — series and parallel knowledge check"
            questions={quizQuestions}
          />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2/section4/4-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Parallel circuits — current and voltage
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2/section4/4-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Power in series and parallel circuits
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
