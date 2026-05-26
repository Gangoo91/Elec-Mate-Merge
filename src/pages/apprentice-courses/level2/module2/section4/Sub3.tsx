/**
 * Module 2 · Section 4 · Sub 3 — Parallel circuits: current and voltage
 * City & Guilds 2365-02 → Unit 202 → LO4 → AC 4.4 / 4.5
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
  VideoCard,
} from '@/components/study-centre/learning';
import { ParallelCircuit } from '@/components/study-centre/diagrams';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Parallel circuits — current and voltage | Level 2 Module 2.4.3 (AC 4.4 / 4.5) | Elec-Mate';
const DESCRIPTION =
  'How current splits and voltage stays the same across branches in parallel circuits. Branch maths, equivalent resistance and worked examples for Level 2 apprentices.';

/* ── Inline check questions ───────────────────────────────────────── */

const checks = [
  {
    id: 'parallel-voltage-rule',
    question: 'In a parallel circuit, the voltage across each branch is…',
    options: [
      'Divided between the branches',
      'Zero on the unused branches',
      'Equal to the supply voltage on every branch',
      'Different for each branch depending on resistance',
    ],
    correctIndex: 2,
    explanation:
      'Every branch is hard-wired straight across the supply, so each one sees the full supply voltage. That is the whole point of parallel — each load is independent.',
  },
  {
    id: 'parallel-current-divider',
    question:
      'A 24 V supply feeds two branches in parallel: R₁ = 60 Ω and R₂ = 120 Ω. Which branch carries more current?',
    options: [
      'Neither, the supply blocks current to higher R',
      'Both the same — it’s parallel',
      'R₁ — lower resistance pulls more current',
      'R₂ — higher resistance pulls more current',
    ],
    correctIndex: 2,
    explanation:
      'Same voltage on both branches, so I = V ÷ R. Lower R means higher I. R₁ draws 0.4 A, R₂ draws 0.2 A. The smaller resistor always hogs more current.',
  },
  {
    id: 'parallel-failure-mode',
    question:
      'Three lamps are wired in parallel off a 230 V supply. One lamp blows open circuit. What happens to the other two?',
    options: [
      'All three go off — broken path',
      'They glow at half brightness',
      'They go to full mains plus the failed lamp’s share',
      'They keep working as normal',
    ],
    correctIndex: 3,
    explanation:
      'Each branch is independent. One open-circuit branch just stops drawing current. The other two still see the full 230 V and carry on. This is why nearly every UK final circuit is parallel.',
  },
];

/* ── Quiz questions ───────────────────────────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question: 'In parallel circuits, the voltage across each branch is…',
    options: [
      'Shared unequally between branches',
      'Equal to the supply voltage',
      'Zero on the unused branches',
      'Only present on the last branch',
    ],
    correctAnswer: 1,
    explanation: 'Every parallel branch sits directly across the supply, so each one sees the full supply voltage.',
  },
  {
    id: 2,
    question: 'Total current in a parallel circuit equals…',
    options: [
      'The supply voltage divided by the largest R',
      'The smallest branch current',
      'The sum of every branch current',
      'Always 1 A',
    ],
    correctAnswer: 2,
    explanation:
      'Currents split at the junction and add back up at the return junction. Itotal = I₁ + I₂ + I₃ + … (Kirchhoff’s current law).',
  },
  {
    id: 3,
    question: 'For two resistors in parallel, the equivalent resistance formula is…',
    options: [
      'R₁ − R₂',
      'R₁ + R₂',
      'R₁ × R₂',
      '(R₁ × R₂) ÷ (R₁ + R₂)',
    ],
    correctAnswer: 3,
    explanation:
      'Two-resistor shortcut: product over sum. For three or more, use the reciprocal formula 1 ÷ Rt = 1 ÷ R₁ + 1 ÷ R₂ + …',
  },
  {
    id: 4,
    question: 'Two branches: 2 Ω and 6 Ω in parallel. Equivalent resistance?',
    options: [
      '1.5 Ω',
      '4 Ω',
      '8 Ω',
      '3 Ω',
    ],
    correctAnswer: 0,
    explanation: 'Rt = (2 × 6) ÷ (2 + 6) = 12 ÷ 8 = 1.5 Ω. Always less than the smallest branch.',
  },
  {
    id: 5,
    question: 'Three identical 60 Ω resistors in parallel give a total resistance of…',
    options: [
      '60 Ω',
      '20 Ω',
      '10 Ω',
      '180 Ω',
    ],
    correctAnswer: 1,
    explanation:
      'Identical resistors shortcut: Rt = R ÷ n = 60 ÷ 3 = 20 Ω. Three equal paths share the current evenly.',
  },
  {
    id: 6,
    question: 'Add another branch to an existing parallel circuit. What happens overall?',
    options: [
      'Total resistance goes up, total current goes down',
      'Nothing changes — branches are independent',
      'Total resistance goes down, total current goes up',
      'Voltage on existing branches drops',
    ],
    correctAnswer: 2,
    explanation:
      'Another path for current to flow lowers total resistance, so the supply pushes more current overall. Existing branches still see the same voltage and same current.',
  },
  {
    id: 7,
    question:
      'A 12 V supply feeds three parallel branches: 120 Ω, 80 Ω and 240 Ω. What is the total current drawn from the supply?',
    options: [
      '0.10 A',
      '0.15 A',
      '0.60 A',
      '0.30 A',
    ],
    correctAnswer: 3,
    explanation:
      'I₁ = 12 ÷ 120 = 0.10 A. I₂ = 12 ÷ 80 = 0.15 A. I₃ = 12 ÷ 240 = 0.05 A. Total = 0.10 + 0.15 + 0.05 = 0.30 A.',
  },
  {
    id: 8,
    question: 'Where do you meet parallel wiring on a typical UK domestic install?',
    options: [
      'A ring final circuit serving multiple sockets',
      'You own the van at the end of the agreement',
      'Verify operation of switches and controls',
      'Power and data cables in office environments',
    ],
    correctAnswer: 0,
    explanation:
      'Sockets on a ring final, lamps on a lighting circuit, every fixed appliance — all parallel off the live and neutral. Each one needs the full 230 V and has to keep working when others switch off.',
  },
];

/* ── FAQs ─────────────────────────────────────────────────────────── */

const faqs = [
  {
    question: 'Why does adding more branches to a parallel circuit lower the total resistance?',
    answer:
      'Each new branch is another path for current. More paths means easier flow, which is the same as less opposition. Total resistance is always lower than the smallest single branch — that always feels backwards at first, but the maths is solid.',
  },
  {
    question: 'How do I check parallel circuit calculations on site?',
    answer:
      'Measure the voltage across each branch — it should equal the supply. Measure each branch current with a clamp meter and check they add up to total current at the supply. If a branch reads zero, that one’s open. If total current is suspiciously high, there’s a fault somewhere drawing more than the design intended.',
  },
  {
    question: 'What happens if one branch in a parallel circuit fails open?',
    answer:
      'Other branches carry on as normal. That’s why a blown bulb in your living room doesn’t kill your kitchen lights, and why one tripped appliance doesn’t shut down the whole socket ring. Independence is the whole reason we use parallel.',
  },
  {
    question: 'What if a branch fails short circuit instead of open?',
    answer:
      'Different story. A short across one branch effectively shorts the whole supply, drawing huge current. The protective device (MCB or fuse) should trip very quickly. If it doesn’t, you’ve got a serious problem.',
  },
  {
    question: 'Can I just add up the resistances like in series?',
    answer:
      'No. Series resistances add directly because current has to fight through them all in turn. Parallel resistances combine using the reciprocal formula because they each give the current another path. Use product-over-sum for two, the reciprocal formula for three or more.',
  },
  {
    question: 'When should I use the current divider rule?',
    answer:
      'When you know the total current and want to find what each branch carries. Ibranch = Itotal × (Rother ÷ (Rbranch + Rother)) for two branches. Easier in most cases though: just calculate I = V ÷ R for each branch, since you know the supply voltage equals every branch voltage.',
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
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 4
          </button>

          <PageHero
            eyebrow="Module 2 · Section 4 · Subsection 3"
            title="Parallel circuits — current and voltage"
            description="Multiple paths, one shared voltage. Current splits between the branches and adds back up at the junction. Three rules and you can solve any parallel circuit."
            tone="emerald"
          />

          <TLDR
            points={[
              'Parallel = multiple paths. Each branch sees the FULL supply voltage — V₁ = V₂ = V₃ = Vs.',
              'Current splits between branches in inverse proportion to resistance, then adds back up: Itotal = I₁ + I₂ + I₃ + …',
              'Total resistance is ALWAYS less than the smallest branch. Add a branch and Rt drops further.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State the three parallel circuit rules: same voltage everywhere, currents add, total R always less than the smallest branch.',
              'Calculate branch currents using I = V ÷ R, then sum them to find the total supply current.',
              'Use the product-over-sum formula for two parallel resistors and the reciprocal formula for three or more.',
              'Predict what happens when one branch fails open or short — and why this drives the choice of parallel for nearly every final circuit.',
              'Apply the current divider rule when you know the total current and need a single branch current.',
              'Recognise everyday parallel wiring on a UK install — sockets on a ring final, lamps on a lighting circuit, every fixed appliance.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>What “parallel” actually means</ContentEyebrow>

          <ConceptBlock
            title="Parallel = multiple paths sharing the same voltage"
            plainEnglish="Each branch is wired straight across the supply with its own dedicated route home. Current can pick any branch — the easier the path (lower R), the more current takes it."
            onSite="Open up almost any consumer unit and look at a final circuit. Every socket, every lamp, every fixed appliance is wired between the same two conductors (line and neutral). Each one is its own parallel branch off the supply."
          >
            <p>
              In a parallel circuit, components share two common rails — one connected to the
              supply’s positive (or line), one connected to the supply’s negative (or neutral).
              Each component bridges those rails. Current splits between them and rejoins at the
              return rail.
            </p>
            <p>That arrangement gives three rules that hold for every parallel circuit:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Voltage is the same on every branch</strong> — V₁ = V₂ = V₃ = Vs. Every
                branch sees the full supply voltage.
              </li>
              <li>
                <strong>Currents add to give the total</strong> — Itotal = I₁ + I₂ + I₃ + …
                Whatever leaves the supply is what comes back, split across the branches.
              </li>
              <li>
                <strong>Total resistance is always less than the smallest branch</strong> — extra
                paths reduce overall opposition, not add to it.
              </li>
            </ul>
          </ConceptBlock>

          <ParallelCircuit
            voltage="24 V"
            resistors={[
              { label: 'R₁', value: '120 Ω' },
              { label: 'R₂', value: '80 Ω' },
              { label: 'R₃', value: '240 Ω' },
            ]}
            caption="Three branches across one supply. Each branch sees 24 V — the difference is what each one draws."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The maths — branch currents and total current</ContentEyebrow>

          <ConceptBlock title="Worked example — three branches on a 24 V supply">
            <p>
              <strong>Given:</strong> 24 V supply with three parallel branches: R₁ = 120 Ω, R₂ =
              80 Ω, R₃ = 240 Ω.
              <br />
              <strong>Find:</strong> each branch current, the total current, and the equivalent
              resistance.
            </p>
            <p>
              <strong>Step 1 — voltage on each branch.</strong> Same as the supply, 24 V on every
              branch.
            </p>
            <p>
              <strong>Step 2 — branch currents.</strong> Use I = V ÷ R for each one.
              <br />
              I₁ = 24 ÷ 120 = 0.2 A.
              <br />
              I₂ = 24 ÷ 80 = 0.3 A.
              <br />
              I₃ = 24 ÷ 240 = 0.1 A.
            </p>
            <p>
              <strong>Step 3 — total current.</strong> Add them up.
              <br />
              Itotal = 0.2 + 0.3 + 0.1 = 0.6 A.
            </p>
            <p>
              <strong>Step 4 — equivalent resistance.</strong> Use Ohm’s law on the whole
              circuit.
              <br />
              Rt = Vs ÷ Itotal = 24 ÷ 0.6 = 40 Ω.
            </p>
            <p>
              <strong>Step 5 — sanity check.</strong> Rt should be less than the smallest branch
              (80 Ω). 40 Ω is well under that, so the answer is consistent. The smallest
              resistance (80 Ω) carries the largest current (0.3 A) — also right.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Equivalent resistance — the two formulas</ContentEyebrow>

          <ConceptBlock
            title="Two resistors: product over sum"
            plainEnglish="For exactly two parallel resistors, multiply them then divide by their sum. Quick mental shortcut for spot calcs."
          >
            <p>
              <strong>Formula:</strong> Rt = (R₁ × R₂) ÷ (R₁ + R₂).
            </p>
            <p>
              <strong>Worked example.</strong> R₁ = 6 Ω, R₂ = 12 Ω in parallel.
              <br />
              Rt = (6 × 12) ÷ (6 + 12) = 72 ÷ 18 = 4 Ω.
            </p>
            <p>
              Notice 4 Ω is less than the 6 Ω branch — every parallel combination ends up smaller
              than the smallest individual branch. That holds every single time.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Three or more resistors: the reciprocal formula"
            plainEnglish="Add up the reciprocals (1 ÷ R for each branch), then take the reciprocal of that total."
          >
            <p>
              <strong>Formula:</strong> 1 ÷ Rt = 1 ÷ R₁ + 1 ÷ R₂ + 1 ÷ R₃ + …
            </p>
            <p>
              <strong>Worked example.</strong> Three branches: 4 Ω, 6 Ω and 12 Ω.
              <br />
              1 ÷ Rt = 1 ÷ 4 + 1 ÷ 6 + 1 ÷ 12 = 3 ÷ 12 + 2 ÷ 12 + 1 ÷ 12 = 6 ÷ 12 = 0.5.
              <br />
              Rt = 1 ÷ 0.5 = 2 Ω.
            </p>
            <p>
              <strong>Identical resistors shortcut.</strong> If every branch is the same, just
              divide by the count: Rt = R ÷ n. Three 60 Ω resistors in parallel give 60 ÷ 3 = 20
              Ω. Saves a lot of fraction work.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Try it yourself</ContentEyebrow>

          <ConceptBlock title="The series and parallel calculator">
            <p>
              Punch in branch resistances and the calculator returns the equivalent resistance.
              Use it to check your manual maths after you’ve worked through it on paper — not as
              a replacement for understanding the formula.
            </p>
          </ConceptBlock>

          <SeriesParallelCalculators />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <VideoCard
            url={videos.parallelCircuits.url}
            title={videos.parallelCircuits.title}
            channel={videos.parallelCircuits.channel}
            duration={videos.parallelCircuits.duration}
            topic={videos.parallelCircuits.topic}
            caption="Animated walk-through of parallel circuits, current division and what happens when a branch fails. Useful reinforcement after the worked examples above."
          />

          <SectionRule />

          <ContentEyebrow>Where it ties to BS 7671</ContentEyebrow>

          <ConceptBlock
            title="Why parallel rules nearly every final circuit"
            plainEnglish="Each load needs the full 230 V to work properly, and one fault on one device shouldn’t kill the rest. Parallel gives you both."
          >
            <p>
              Every fixed UK final circuit you’ll wire — sockets on a ring, lamps on a lighting
              circuit, the immersion, the cooker — sits in parallel across the supply. Each
              accessory is its own branch. Each gets the full 230 V it needs. And when one fails
              or is switched off, the others keep going.
            </p>
            <p>
              The regs don’t use the word “parallel” in this context, but the requirement to
              divide installations into circuits comes from a closely related idea — limit the
              effect of one fault.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 314.1"
            clause="Every electrical installation shall be divided into circuits, as necessary, to avoid danger and minimise inconvenience in the event of a fault."
            meaning={
              <>
                Translation — split things up so a single fault doesn’t take everything offline.
                Wiring loads in parallel (and onto separate protective devices) is how the
                installation actually meets this requirement on site. Series-only final circuits
                fail this principle because one failure stops the lot.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 3, Chapter 31, Regulation 314.1"
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Adding parallel resistances like they’re in series"
            whatHappens={
              <>
                You see two 100 Ω resistors in parallel and write Rt = 200 Ω. The maths gets you
                to a current that’s half what the circuit actually draws. Cable selection, fuse
                rating — anything you size off that calc is undercooked.
              </>
            }
            doInstead={
              <>
                For two parallel resistors, use product over sum: Rt = (100 × 100) ÷ (100 + 100)
                = 10000 ÷ 200 = 50 Ω. Half the value of one branch — exactly what you’d expect
                for two equal paths. Sanity check: parallel total is ALWAYS less than the
                smallest branch.
              </>
            }
          />

          <Scenario
            title="The kitchen socket that ‘killed the rest of the ring’"
            situation={
              <>
                A homeowner reports that plugging in a particular toaster trips the kitchen ring
                and takes out every other socket on the circuit. They blame the other sockets.
                You isolate, prove dead and start tracing.
              </>
            }
            whatToDo={
              <>
                Sockets on the ring are in parallel — independent branches off the same line and
                neutral. The other sockets aren’t the problem. The toaster is shorting (or
                drawing fault current) on its own branch, but because every branch sits on the
                same protective device at the consumer unit, that device trips and isolates the
                whole ring. Test the toaster on a known-good socket elsewhere with an in-line
                tester, or plug a known-good appliance into the suspect socket. The fault is in
                the appliance or that one accessory, not the wider ring.
              </>
            }
            whyItMatters={
              <>
                Understanding that branches are independent — but share one upstream protective
                device — is the diagnostic key. The other sockets going off is correct behaviour,
                not a sign they’re all faulty.
              </>
            }
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 433.4 (parallel conductors)"
            clause="Except for the ring final circuit exception, where a single device protects conductors in parallel and the conductors are sharing currents equally, the value of I to be used in Regulation 433.11 shall be the sum of the current-carrying capacities of the parallel conductors. Where the use of a single conductor is impractical and the currents in the parallel conductors are unequal, the design current and overload-protection requirements shall be considered for each conductor individually."
            meaning={
              <>
                Translation — when conductors themselves are run in parallel (think two singles
                paralleled to share load on a big sub-main), the rated current you use for
                protection sizing is the SUM of each conductor’s capacity. Same parallel maths
                you’ve been doing — total current divides between the conductors based on how
                evenly they share. 433.4.1 covers the equal-share case; 433.4.2 covers the
                unequal-share case (treated individually, with a 10 % difference as the threshold
                per the note).
              </>
            }
            cite="Verbatim wording paraphrased — see BS 7671 Reg 433.4 (433.4.1 equal sharing, 433.4.2 unequal sharing) for the full text."
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
              'Parallel circuits have multiple paths. Voltage is identical on every branch and equal to the supply.',
              'Currents split between branches in inverse proportion to resistance, then add back up to the total.',
              'Two-resistor shortcut: Rt = (R₁ × R₂) ÷ (R₁ + R₂). Three or more: 1 ÷ Rt = 1 ÷ R₁ + 1 ÷ R₂ + …',
              'Parallel total is ALWAYS less than the smallest branch. Add another branch and the total drops further.',
              'One open-circuit branch doesn’t affect the others — that’s why nearly every UK final circuit is wired in parallel.',
              'Equivalent resistance × supply voltage gives total current. Use this as a one-line cross-check on every calc.',
            ]}
          />

          <Quiz title="Parallel circuits knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2/section4/4-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Series circuits — current and voltage
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2/section4/4-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Total resistance — series and parallel calcs
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
