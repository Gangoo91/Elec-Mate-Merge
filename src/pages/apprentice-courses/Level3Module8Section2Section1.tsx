/**
 * Level 3 · Module 8 · Section 2 · Sub 1 — Time management for the L3 closed-book MC paper
 *
 * Mirrors L2 Module 8 Section 2 Sub 1 in voice and design (editorial primitives
 * from `@/components/study-centre/learning`) but tailored to the Level 3
 * Diploma (2365-03):
 *   - Each unit (201, 301, 302, 303, 304, 305) sits its own 60Q / 90min closed-book MC paper.
 *   - Unit 308 (Career awareness) is the shorter 40Q / 60min paper.
 *   - The L3 practical element is workplace and portfolio-based (NVQ-style) — NOT a separate exam.
 *   - The end-point assessment is AM2 (or AM2E), sat AFTER the qualification is complete.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Time management for L3 closed-book MC | Level 3 Module 8.2.1 | Elec-Mate';
const DESCRIPTION =
  'Pacing strategy for the Level 3 closed-book multiple-choice unit papers — 60Q / 90min for Units 201, 301, 302, 303, 304 and 305; 40Q / 60min for Unit 308. Minutes-per-question, flag-and-skip discipline, banking time for calculations.';

const checks = [
  {
    id: 'l3-m8-s2-sub1-perq',
    question:
      "You are sitting the Unit 304 (Inspection, Testing and Commissioning) paper — 60 questions in 90 minutes, closed-book. What is the right baseline minutes-per-question target to plan around?",
    options: [
      "Identification of the space, hazards, controls, atmospheric readings, entrant names, time limits, communication, and rescue arrangements",
      "\\\\\\\"New domestic single-phase installation comprising consumer unit, 6 lighting circuits, 4 ring final circuits, cooker circuit, and shower circuit\\\\\\\"",
      "To detect and measure a wide range of volatile organic compounds (VOCs) and other ionisable gases at very low concentrations",
      "1 minute 15 seconds per question, leaving roughly 15 minutes of buffer at the end for review, flagged questions and the longer EICR-coding scenarios.",
    ],
    correctIndex: 3,
    explanation:
      "60Q in 90min is exactly 1.5 min per question if you use every second — but that leaves no buffer for review, no margin for the calculation items, and no recovery time if you stall. Aim for ~75 seconds per question on the first pass, which banks ~15 minutes for review and for the harder items. This is the same pacing logic as the L2 paper, just applied to a stricter L3 question set.",
  },
  {
    id: 'l3-m8-s2-sub1-skip',
    question:
      "You are 22 minutes into the Unit 305 (Electrical Systems Design) paper, on question 12 (a multi-step voltage-drop calculation), and you have already spent 4 minutes without converging on an answer. What should you do?",
    options: [
      "To prove the cpc has a low-resistance path so that under fault the disconnection device operates within the required time (and to prove main and supplementary bonding continuity)",
      "You want to highlight transferable skills, have gaps in employment, are changing speciality, or have varied experience that doesn\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t fit a straightforward chronology.",
      "Flag the question, pick the best of the remaining options on instinct (never leave it blank — there is no negative marking), and move on. Come back in the review window with fresh eyes.",
      "Maximise £4,000 Lifetime ISA (if under 40 and saving for first home), contribute £10,000 to pension (gaining higher-rate tax relief), keep £1,000 accessible",
    ],
    correctIndex: 2,
    explanation:
      "The 'sunk cost' trap is one of the biggest L3 paper killers. If a question has eaten 3+ minutes and you are no closer to a clean answer, the marginal return on more minutes is tiny — but the opportunity cost is enormous. Each extra minute on a stuck question costs you most of a question elsewhere. Flag, guess (50% better than blank on a 4-option MC), move on, return in the review pass.",
  },
  {
    id: 'l3-m8-s2-sub1-u308',
    question:
      "How does the Unit 308 (Career Awareness) paper differ in timing from the other L3 unit papers, and how should that change your pacing?",
    options: [
      "Complete and sign the documentation for their own scope of responsibility, clearly note the outstanding sign-off, and arrange for the responsible person to review and sign at the earliest opportunity",
      "Unit 308 is shorter — 40 questions in 60 minutes — which is exactly the same 1.5 min per question rate. Pacing logic is unchanged: aim for ~75 seconds per question on the first pass and bank ~10 minutes of review buffer, scaled to the shorter paper.",
      "To provide a low-impedance earth reference for the customer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s installation on TN-C-S or TN-S supplies — connected back through the service cable PEN (or PE) to the secondary substation earth.",
      "Carry out a full PAT test (visual inspection, earth continuity for Class I, insulation resistance, and functional test), verify the repair was effective, and update the maintenance/PAT records",
    ],
    correctIndex: 1,
    explanation:
      "Unit 308 (40Q / 60min) is the only L3 unit paper with a different question count — but the per-question rate is the same 1.5 minutes. Apply the same pacing discipline at smaller scale: ~75s/Q on the first pass, ~10min review buffer, flag-and-skip on anything that stalls. The questions tend to be more recall-and-recognition (industry structure, qualifications, JIB grades) so you should actually finish faster than 304 or 305.",
  },
];

const faqs = [
  {
    question:
      "Why are Level 3 unit assessments closed-book when so much of the content references BS 7671?",
    answer:
      "City and Guilds set the L3 unit assessments closed-book to test that you have internalised the principles, not just that you can find a clause in the regs. You are still expected to know structure (Part 1 = scope, Part 4 = protection, Part 5 = selection and erection, Part 6 = inspection and testing, Appendix 4 = current carrying capacity) and key values (Zs limits, voltage drop limits, cable colour codes), but you can not bring the book in. AM2 and the workplace portfolio give you the open-book settings to use the regs as a working document.",
  },
  {
    question:
      "Is the L3 paper one combined exam or one paper per unit?",
    answer:
      "One paper per unit. The Level 3 Diploma 2365-03 has individual closed-book MC assessments for Unit 201 (refresher), 301, 302, 303, 304 and 305 — typically 60 questions in 90 minutes — and a shorter Unit 308 paper at 40 questions in 60 minutes. There is no single combined L3 written paper. You sit them across the academic year, with the centre booking each one when they judge you are ready.",
  },
  {
    question:
      "Where does the practical element sit at L3 — is there a separate timed practical exam?",
    answer:
      "No separate timed practical exam at L3 in the same shape as the L2 OBPA. The L3 practical element is workplace and portfolio-based (NVQ-style) — observed practical assignments, witness statements, photos, assessor evidence and workplace logs, built up across the apprenticeship. The end-point assessment is AM2 (or AM2E), sat after the qualification is complete and treated separately. So the time-management techniques in this Sub apply to the closed-book MC papers, not to a sit-down practical.",
  },
  {
    question:
      "What is a realistic pass mark to target on the mocks before booking the live unit assessment?",
    answer:
      "Aim for 70%+ on every mock under exam conditions before you book the live sitting. The City and Guilds pass mark for the unit assessments is typically in the 60% region (it varies by paper and is moderated), so 70%+ on the mocks gives you a 10-point buffer for exam-day nerves, ambiguous questions and the harder calculation items. Below 70% in mocks, sit more practice — the marginal cost of another mock is far lower than a re-sit fee.",
  },
  {
    question:
      "Should I use the same pacing on every unit paper or vary it per unit?",
    answer:
      "Same baseline (1 min 15 sec per question on first pass), different emphasis. Unit 304 (Inspection, Testing) and Unit 305 (Design) are calculation- and EICR-coding-heavy — bank more buffer for those. Unit 308 (Career Awareness) is mostly recall and recognition — you will probably finish well inside time. Unit 201 (refresher) sits between the two. The pacing is the same; the buffer you need varies.",
  },
  {
    question:
      "What do I do if I am running out of time with 10 questions still unanswered?",
    answer:
      "Triage. Skim each remaining question for ~10 seconds, pick the most plausible answer based on first instinct and any obvious eliminations (impossible values, safety-violating options, non-compliant BS 7671 answers), and move on. Never leave a question blank — there is no negative marking, so a guess is always worth more than a blank. Aim to put an answer on every question even if your final-30-seconds protocol is pure elimination guessing.",
  },
];

export default function Level3Module8Section2Section1() {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> How to Pass Exams
          </button>

          <PageHero
            eyebrow="Module 8 · Section 2 · Subsection 1"
            title="Time management for the L3 closed-book MC paper"
            description="Pacing the 60Q / 90min unit papers (and the 40Q / 60min Unit 308 paper) — minutes-per-question targets, flag-and-skip discipline, banking time for calculation-heavy items, and what to do when the clock starts beating you."
            tone="emerald"
          />

          <TLDR
            points={[
              "L3 unit papers are 60 questions in 90 minutes (Units 201, 301, 302, 303, 304, 305) and 40 questions in 60 minutes (Unit 308). All closed-book — BS 7671, OSG and your notes stay outside the room.",
              "Plan ~75 seconds per question on the first pass. That banks ~15 minutes of review buffer on a 90-minute paper and ~10 minutes on the 60-minute paper — your rescue window for flagged items, calculations and double-checks.",
              "Three-pass strategy: Pass 1 quick wins (45 min), Pass 2 calculations and BS 7671 references (30 min), Pass 3 review and educated guesses (15 min). Never leave a question blank — there is no negative marking on the L3 MC papers.",
            ]}
          />

          <ContentEyebrow>Why timing is the L2 to L3 step you cannot skip</ContentEyebrow>

          <ConceptBlock
            title="Same minutes, harder questions"
            plainEnglish="The L3 papers run at the same 1.5 min per question pace as the L2 ones, but the questions are tougher — multi-step calculations, BS 7671 design judgement, EICR coding to C1/C2/C3/FI, and three-phase theory. The clock has not changed; the workload per question has. That is why pacing discipline is the single biggest pass driver at L3."
            onSite="Most L3 candidates who fail a unit paper do not fail because they did not know the material. They fail because they spent 6 minutes wrestling with one calculation, then ran the last 12 questions in 8 minutes. Pacing is a skill you practise in the mocks — not a thing you discover on the day."
          >
            <p>
              Compare the per-question time pressure across the three L2/L3 closed-book papers
              you will sit:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>L2 unit papers (201, 202, 203, 204, 210)</strong> — 60 questions in
                90 minutes. Mostly recall and recognition with some Ohm&apos;s law and basic
                circuit reasoning. 1 min 30 sec per question is comfortable for most
                candidates.
              </li>
              <li>
                <strong>L3 unit papers (201 refresher, 301, 302, 303, 304, 305)</strong> — 60
                questions in 90 minutes. Same per-question rate, but the question content
                shifts to multi-step calculations (voltage drop, Zs, cable derating), EICR
                coding judgement and design choices. The same 1.5 min feels much tighter.
              </li>
              <li>
                <strong>L3 Unit 308 (Career Awareness)</strong> — 40 questions in 60 minutes.
                Same 1.5 min per question but the content is recall-heavy (qualifications,
                JIB grades, AM2, professional bodies, CPD routes). Most candidates finish
                this paper inside 45 minutes.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The three-pass strategy on a 60Q / 90min paper</ContentEyebrow>

          <ConceptBlock
            title="Pass 1 — quick wins (~45 minutes)"
            plainEnglish="Sweep the paper from question 1 to question 60. Answer every question you can solve in under 90 seconds. Flag anything that needs a calculator, a BS 7671 mental lookup or more than one read. The goal is to bank as many marks as possible before the calculation-heavy items eat your time."
            onSite="On the L3 papers most candidates can clear 35-45 questions in this pass at high accuracy. The remaining 15-25 are the ones that win or lose the paper — and you have 45 minutes left to deal with them."
          >
            <p>What sits in the &quot;quick wins&quot; bucket on a typical L3 unit paper:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>BS 7671 structure and definitions (Part 1, Part 2 terminology).</li>
              <li>
                Cable colour codes, accessory ratings, standard MCB curves (B, C, D — when
                each is used).
              </li>
              <li>
                Earthing system identification (TN-S, TN-C-S / PNB, TT, IT) and the
                disconnection-time framework at a high level.
              </li>
              <li>
                Inspection-and-test sequence order (the &quot;dead before live&quot;
                sequence).
              </li>
              <li>HSE / industry recall items — RIDDOR thresholds, PUWER scope, EAWR Reg 4.</li>
              <li>
                Single-step calculations: P = VI, V = IR, transformer ratio, basic
                three-phase line/phase relationships.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Pass 2 — calculations and BS 7671 references (~30 minutes)"
            plainEnglish="Return to the flagged questions. Tackle the ones with calculations methodically — write out the formula, plug in the values, check the units. For BS 7671 lookup-style questions, work from memory but allow yourself an instinct check at the end."
            onSite="The trap in Pass 2 is perfectionism — wanting to nail every calculation to the third decimal. The MC distractors are usually crafted so the right answer is obvious to one significant figure. If you are within 10% of an option, pick it."
          >
            <p>How to allocate Pass 2 time inside the 30-minute window:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Maximum 3 minutes per calculation question.</strong> Hard ceiling.
                If at 3 minutes you have not converged, flag and move on.
              </li>
              <li>
                <strong>Recognise the formula family first.</strong> Voltage drop = (mV/A/m
                &times; Ib &times; L) / 1000. Zs = Ze + (R1 + R2). Cable CCC after grouping
                = It &times; Ca &times; Cg &times; Ci. Once you have the formula, the
                numbers fall in.
              </li>
              <li>
                <strong>EICR coding questions: walk the four codes.</strong> Is it
                immediately dangerous (C1)? Potentially dangerous (C2)? Improvement
                recommended but compliant at the time of installation (C3)? Further
                investigation required (FI)? Most coding questions hinge on distinguishing
                C2 from C3 — the &quot;potentially dangerous&quot; vs &quot;recommended
                improvement&quot; line.
              </li>
              <li>
                <strong>Three-phase questions: line vs phase.</strong> Line voltage = phase
                voltage &times; root-3 (star). Line current = phase current &times; root-3
                (delta). Always confirm which the question is asking for.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Pass 3 — review and educated guesses (~15 minutes)"
            plainEnglish="Walk back through every question. Confirm the still-flagged ones. Apply elimination on anything you guessed in Pass 1 or 2. Confirm no question is blank. Look for sign-flip and unit errors on calculation answers."
            onSite="Most L3 candidates pick up 2-4 extra marks in Pass 3 — usually from spotting unit mistakes (kVA vs VA, mm&sup2; misread, multiplied by 1000 instead of divided), correcting an obvious distractor click, or finding an answer they had previously skipped that now jumps out."
          >
            <p>The Pass 3 review checklist:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Every question has an answer selected — no blanks. (Hard rule.)
              </li>
              <li>
                Calculation answers checked for unit consistency (mm&sup2;, A, V, &Omega;, kW
                vs W, kVA vs VA).
              </li>
              <li>
                Safety questions cross-checked — &quot;is the answer I picked the
                BS 7671-compliant one, or is it the convenient one?&quot;
              </li>
              <li>
                Flagged items revisited with fresh eyes — sometimes the answer is obvious
                second time.
              </li>
              <li>
                Spot the distractor patterns — the tempting wrong answer is often
                numerically close to the right one, but with a unit error or a missed
                derating factor.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The flag-and-skip discipline</ContentEyebrow>

          <ConceptBlock
            title="Why the 3-minute hard ceiling exists"
            plainEnglish="A single question is worth ~1.6% of the paper. Once you have spent 3 minutes on it, every additional minute costs you most of an entire question elsewhere on the paper. The maths is brutal and unforgiving — and it is why the strongest L3 candidates flag-and-skip without hesitation."
            onSite="The discipline has to be drilled in the mocks until it is automatic. In the live exam, panic reduces decision-making bandwidth — if the flag-and-skip habit is not muscle memory, you will sit there burning minutes you cannot afford."
          >
            <p>The flag-and-skip protocol in three steps:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Trigger</strong> — you have spent more than 2 minutes and you are not
                converging on an answer, OR your gut is telling you the question is harder
                than it should be.
              </li>
              <li>
                <strong>Action</strong> — pick the best of the four options based on first
                instinct (apply any obvious eliminations: safety-violating answers,
                impossible values), tick the answer, flag the question.
              </li>
              <li>
                <strong>Move</strong> — go to the next question. Do not look back until Pass
                3. The flagged answer is your insurance — if Pass 3 confirms it, you keep
                it; if Pass 3 changes it, you fix it; if Pass 3 runs out of time, you have
                still scored on instinct rather than blank.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Treating the L3 paper like a homework assignment"
            whatHappens={
              <>
                Candidate sits down on Unit 305 (Design), reads question 1, does not
                immediately see the answer, and decides to &quot;think it through
                properly&quot;. Spends 5 minutes on Q1, gets it right, feels good. Q2
                same pattern — 4 minutes, right answer. By Q15 they have used 45 of the 90
                minutes on a quarter of the paper. The last 45 questions get done in 45
                minutes flat at low accuracy, with the calculation items skipped entirely.
                They fail by 4 marks.
              </>
            }
            doInstead={
              <>
                Drill the flag-and-skip habit in every single mock. Set a 90-second mental
                timer for each question. If you have not converged at 90 seconds, give it
                30 more seconds, then flag-and-skip if you are still stuck. The paper is
                designed assuming you spend ~75-90 seconds per question on average — if you
                are spending 4 minutes, the paper-setter has already won.
              </>
            }
          />

          <SectionRule />

          <Scenario
            title="Pacing Unit 304 (Inspection, Testing and Commissioning) — a worked sit"
            situation={
              <>
                You have 90 minutes for 60 closed-book questions on Unit 304. Roughly 35%
                of the paper is EICR coding scenarios, 25% is calculation (Zs limits,
                disconnection times, IR thresholds, RCD operating values), 25% is sequence-
                and instrument-selection questions, and 15% is recall on Part 6 of BS 7671.
                You have to manage time across all four bands.
              </>
            }
            whatToDo={
              <>
                Pass 1 (0-45 min): Sweep the whole paper. Answer the recall questions first
                (Part 6 structure, instrument categories CAT II/III/IV, what each
                continuity test confirms). Answer the easier coding scenarios (clear C1s
                like exposed live conductors; clear C3s like a single-pole switch on a
                neutral). Flag the harder C2-vs-C3 calls and the multi-step calculations.
                Aim for 35-40 questions answered. Pass 2 (45-75 min): Tackle the
                calculations and the trickier coding calls methodically. 3-minute hard
                ceiling per item. Pass 3 (75-90 min): Review the flagged items and the
                ones you guessed. Re-check unit consistency on the calculations. Confirm
                no blanks.
              </>
            }
            whyItMatters={
              <>
                Unit 304 has the highest calculation-and-coding density of the L3 papers.
                Without disciplined pacing, candidates routinely hit the time wall with
                15+ questions unanswered. The three-pass approach buys you the buffer to
                handle the heavy items without sacrificing the easy marks elsewhere.
              </>
            }
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Unit 308 — the shorter paper</ContentEyebrow>

          <ConceptBlock
            title="Same per-question rate, smaller paper"
            plainEnglish="Unit 308 (Career Awareness and Professional Development) is 40 questions in 60 minutes. The per-question rate is identical to the other unit papers (1 min 30 sec) but the question content is mostly recall and recognition rather than calculation."
            onSite="Most candidates over-prepare timing for Unit 308 — it is the gentlest of the L3 papers in terms of question depth. The bigger risk is treating it casually because it &quot;does not have calculations&quot; and missing recall details (JIB grade names, ECS card colours, AM2 vs AM2E distinction, professional body acronyms)."
          >
            <p>Pacing approach for Unit 308:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Pass 1 (~30 min)</strong> — sweep all 40 questions. Most should be
                quick recall. Flag anything you cannot place from memory.
              </li>
              <li>
                <strong>Pass 2 (~20 min)</strong> — tackle the flagged items with
                elimination — JIB grading questions usually have one or two impossible
                options you can rule out immediately.
              </li>
              <li>
                <strong>Pass 3 (~10 min)</strong> — review and confirm no blanks.
              </li>
              <li>
                <strong>Most candidates finish inside 45 minutes</strong> with 15 minutes to
                spare — use it for review, do not rush out the door.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Calculator and rough-paper discipline</ContentEyebrow>

          <ConceptBlock
            title="The on-screen tools and the rough paper"
            plainEnglish="Most L3 unit papers are sat on-screen at the centre with a basic on-screen calculator and either physical rough paper or a digital scratch area. Practise with the same setup in your mocks — switching between calculator, paper and on-screen question burns more time than you think."
            onSite="The biggest time loss in mocks-vs-real-exam is candidates who practised with a phone calculator and a notebook, then arrive at the centre to find an on-screen calculator that needs a mouse and a single A4 sheet for rough work. The rhythm is different — and the difference shows up in time."
          >
            <p>Practical setup tips that save real minutes:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Practise the mocks with the on-screen calculator if your platform offers
                one — get used to the click-rhythm.
              </li>
              <li>
                For each calculation question, jot the formula on rough paper before plugging
                in numbers. Forces clarity, prevents mid-calc panic.
              </li>
              <li>
                Use the rough paper for elimination too — quickly write A B C D and cross
                out the eliminated options. Faster than re-reading on screen.
              </li>
              <li>
                Memory functions (M+, MR) save real seconds on multi-step calculations like
                voltage drop with grouping factors.
              </li>
              <li>
                Round sensibly — the MC distractors are usually a clear 5-10% apart. You
                don&apos;t need three decimal places to pick the right option.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The last-15-minutes protocol</ContentEyebrow>

          <ConceptBlock
            title="What to do when the clock starts beating you"
            plainEnglish="Even with the best pacing, a third of L3 candidates find themselves at the 75-minute mark on a 90-minute paper with 8-12 questions still unanswered. Have a pre-rehearsed protocol for what happens in those last 15 minutes — do not improvise under pressure."
            onSite="The protocol is the safety net. You should be drilling it on every mock so it is automatic. The candidates who walk in cold without a last-15-minutes plan are the ones who hit the wall and panic-blank."
          >
            <p>The 15-minute protocol — apply in order:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Minute 75</strong> — survey what is left. Count the unanswered and
                flagged items. Mentally sort: which 3 can you nail in 90 seconds each;
                which 3 will take 2-3 minutes; which 3 are pure-guess territory.
              </li>
              <li>
                <strong>Minutes 75-82</strong> — clear the easy quick-wins among the
                unanswered. Do not start anything you cannot finish in 90 seconds.
              </li>
              <li>
                <strong>Minutes 82-87</strong> — tackle the medium-effort items. 3-minute
                hard ceiling each.
              </li>
              <li>
                <strong>Minutes 87-89</strong> — pure-guess sweep. Read each remaining
                question for ~10 seconds, eliminate the obviously wrong, pick the most
                plausible. Tick every blank.
              </li>
              <li>
                <strong>Minute 89-90</strong> — final blank-check. Confirm every question
                has an answer. Submit on the bell, not before.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Submitting early to look confident"
            whatHappens={
              <>
                Candidate finishes Pass 1 with 25 minutes still on the clock, feels
                pleased, and submits to be done. They lose the review pass entirely. Three
                of their Pass 1 answers contained unit errors that Pass 3 would have caught
                (mm&sup2; misread as mm, divided by 1000 instead of multiplied). Two of
                their Pass 1 guesses had clearer answers on a second read. They fail by 2
                marks — exactly the marks Pass 3 would have recovered.
              </>
            }
            doInstead={
              <>
                Use every available minute. There is no bonus for finishing early — only
                a penalty for finishing wrong. Even if you feel completely confident,
                spend the buffer reviewing the calculations for unit consistency, the
                coding questions for C2/C3 borderline calls and the safety questions for
                BS 7671 compliance. Submit on the bell or at 89:50 — never with significant
                buffer remaining.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "L3 unit papers are 60Q / 90min (Units 201, 301, 302, 303, 304, 305) and 40Q / 60min (Unit 308). All closed-book — BS 7671 stays outside.",
              "Plan ~75 seconds per question on Pass 1. That banks ~15 minutes of review buffer on the 90-minute paper, ~10 minutes on the 60-minute paper.",
              "Three-pass strategy: Pass 1 quick wins (~45 min), Pass 2 calculations and BS 7671 (~30 min), Pass 3 review and educated guesses (~15 min).",
              "Hard 3-minute ceiling per question. Past 3 minutes the marginal return collapses — flag, instinct-pick, move on.",
              "Never leave a blank — there is no negative marking on the L3 MC papers. A guess is always worth more than a blank.",
              "The L3 practical element is workplace and portfolio-based (NVQ-style) — not a separate timed exam. AM2 (or AM2E) is the end-point assessment, sat after the qualification is complete.",
            ]}
          />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('..')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Section 2 — How to Pass Exams
              </div>
            </button>
            <button
              onClick={() => navigate('../level3-module8-section2-section2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.2 Question analysis techniques
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
