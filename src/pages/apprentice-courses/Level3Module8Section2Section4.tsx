/**
 * Level 3 · Module 8 · Section 2 · Sub 4 — Common pitfalls and recovery
 *
 * Mirrors L2 Module 8 Section 2 Sub 4 in voice and design but tailored to L3:
 *   - The pitfalls that cost L3 candidates a pass — over-reading calculations,
 *     second-guessing right answers, EICR coding traps, time-wall panic.
 *   - Recovery techniques: how to get back on track when a paper goes sideways.
 *   - Re-sit psychology: failing one paper isn't failing the qualification.
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
  'Common pitfalls and recovery for the L3 paper | Level 3 Module 8.2.4 | Elec-Mate';
const DESCRIPTION =
  'The mistakes that cost Level 3 candidates a pass — over-reading calculation questions, second-guessing right answers, EICR coding traps, time-wall panic — and the recovery techniques that get you back on track when a paper starts sideways.';

const checks = [
  {
    id: 'l3-m8-s2-sub4-secondguess',
    question:
      "On Pass 3 review of your Unit 304 paper you re-read question 17, on which you originally selected option C (a C2 EICR code). On the second reading option D (a C3 code) starts to look more plausible — but you can't be certain. What should you do?",
    options: [
      "Always change to the second answer — re-reading is more reliable than first instinct.",
      "Always keep the first answer — first instinct is always right.",
      "Change ONLY if you can articulate a specific reason (a clause you'd missed, a condition in the stem you'd misread, a calculation step you'd skipped). Otherwise keep your first answer — research shows trained first instinct beats second-guessing absent new information.",
      "Skip the question entirely.",
    ],
    correctIndex: 2,
    explanation:
      "Second-guessing is a major L3 mark-loss source. Statistically, on questions where the candidate has TRAINING in the topic, first-instinct answers are right more often than changed answers. The rule: only change if you can name the specific reason — 'I missed the word post-2018 in the stem' or 'I forgot the cable was in 200mm of insulation'. If the change is just 'D feels better than C now', stick with C.",
  },
  {
    id: 'l3-m8-s2-sub4-timewall',
    question:
      "You hit the 60-minute mark on a 90-minute paper with 25 questions still unanswered. Your mock average is 73% so you know the material. What do you do?",
    options: [
      "Panic and slow down to be careful.",
      "Skip every remaining calculation question to save time.",
      "Activate the last-30-minutes triage protocol: count the remaining items, sort into 'quick win' (90s each), 'medium' (2-3 min each), 'pure guess' (10s each). Clear the quick wins first to bank marks, then medium, then guess-sweep the pure-guess items in the final 2-3 minutes. Confirm no blanks at the bell.",
      "Submit early and accept the score.",
    ],
    correctIndex: 2,
    explanation:
      "Hitting the time wall is recoverable IF you have a triage protocol drilled into reflex. Panic = slow = fewer marks. Triage = ordered = recovery. The 25 remaining questions are not all equal — 8-10 will be quick wins (the easier recall items), 8-10 will be medium-effort calculations or coding calls, and 5-7 will be pure guess. Sort first, then execute in priority order. Pure-guess sweep at the end ensures every question has an answer (no negative marking — guess always beats blank).",
  },
  {
    id: 'l3-m8-s2-sub4-resit',
    question:
      "You sit Unit 305 and fail by 4 marks (56% against a 60% pass). What's the right approach to the re-sit?",
    options: [
      "Give up — the qualification isn't for you.",
      "Re-sit immediately the next available date with no extra study.",
      "Sit-down with your tutor, get the per-topic mark breakdown, focus revision on the weakest areas, sit 2-3 more full mocks under exam conditions until you average 70%+, then book the re-sit. Failing one paper by 4 marks is a fixable gap, not a verdict on the qualification.",
      "Re-sit a different unit instead.",
    ],
    correctIndex: 2,
    explanation:
      "Failing one unit paper by a small margin is normal — many strong L3 candidates have one unit they need a second attempt at. The recovery is structured: get the per-topic breakdown (your tutor can pull this from the centre), identify the 2-3 weakest topics, drill them, sit fresh mocks until you're consistently above 70%, then re-sit. Immediate re-sits without extra study tend to fail again — the gap that caused the 4-mark loss hasn't been closed. Switching to a different unit means you still have to come back to 305.",
  },
];

const faqs = [
  {
    question:
      "What's the single most common L3 paper mistake?",
    answer:
      "Spending too long on one question. The 3-minute hard ceiling per question exists because every minute past 3 minutes costs you most of a question elsewhere on the paper. Candidates who fail by 2-6 marks almost always have 5-10 unanswered questions at the end — and almost always lost the time on 2-3 questions they refused to flag-and-skip from. Drill the discipline in mocks, execute it on the day.",
  },
  {
    question:
      "How often should I change answers in the review pass?",
    answer:
      "Rarely. Change ONLY when you can name a specific reason — a clause you missed, a unit you misread, a condition in the stem you skipped. If the urge to change is just 'option D feels better than C now', that's second-guessing and statistically you should keep your original answer. Trained first instinct beats undisciplined re-reading.",
  },
  {
    question:
      "I get to question 30 and realise I've been misreading something for the whole first half. What now?",
    answer:
      "Re-do the first 30 questions as quickly as you can — typically you'll have 30-40 minutes left, so 1 minute each. Don't panic-fix; work systematically backwards from question 30. The misread is unlikely to have caught every question; some will be unaffected. Confirm units, command words and negations on each. If you genuinely can't remember which were affected, treat the second pass as a normal review pass — you may not catch every error but you'll catch most.",
  },
  {
    question:
      "I failed Unit 304 by 2 marks. The centre offers a re-sit in 3 weeks. Should I take it?",
    answer:
      "Probably yes, but only if you do focused revision in the gap. Get the per-topic breakdown from your tutor first — failing by 2 marks tells you the gap is small and identifiable. Spend 1-2 weeks drilling the 2-3 weakest topics, sit 2 fresh mocks, and if you average 70%+ on those, take the re-sit. If you can't get to 70%+ in mocks, push the re-sit back rather than walking in to fail again.",
  },
  {
    question:
      "I keep getting EICR coding questions wrong on the C2-vs-C3 boundary. What do I do?",
    answer:
      "Build a coding case-study list. Take 30 EICR scenarios from your error log and your textbooks, write each one as 'situation -> code -> reason', and review them weekly. The C2-vs-C3 line turns on credible harm pathway in normal use — building a library of worked examples (no RCD on socket outlets in TT = C2; BS 3036 fuse on otherwise sound 1987 install = C3; missing main bond on TN-S = C2; rubber-insulated cable still functional but pre-1970 = C3 leaning to C2 if degradation visible) trains the judgement faster than re-reading the chapter.",
  },
  {
    question:
      "I panic in exams and my mock results don't reflect my real knowledge. What helps?",
    answer:
      "Three things, in order. First, sit MORE mocks under genuinely exam-like conditions (timed, no notes, no breaks, no phone) so the exam environment becomes familiar. Second, drill the breathing protocol — slow box breathing (4 in, 4 hold, 4 out, 4 hold) in the first 60 seconds of the paper. Third, talk to your tutor about access arrangements (extra time, separate room) — they exist for candidates with documented exam anxiety and they're not 'cheating' to use. Many strong L3 candidates use them.",
  },
];

export default function Level3Module8Section2Section4() {
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
            eyebrow="Module 8 · Section 2 · Subsection 4"
            title="Common pitfalls and recovery for the L3 paper"
            description="The mistakes that cost Level 3 candidates a pass — over-reading calculation questions, second-guessing right answers, EICR coding traps, time-wall panic — and the recovery techniques that get you back on track when a paper starts sideways."
            tone="emerald"
          />

          <TLDR
            points={[
              "Three pitfalls account for most L3 mark losses: spending too long on one question (sunk-cost trap), second-guessing right answers in review, and panicking when the time wall hits with questions still unanswered.",
              "Recovery is possible from all three — but only if the techniques are drilled in mocks. The first time you try a triage protocol should NOT be in a live paper.",
              "EICR coding C2-vs-C3 traps are the single biggest topic-specific pitfall on Unit 304. Build a coding case-study library to train the judgement.",
              "Failing one unit paper by a small margin is normal and recoverable. Get the per-topic breakdown, drill the gaps, sit fresh mocks until you average 70%+, then re-sit.",
            ]}
          />

          <ContentEyebrow>Pitfall 1 — the sunk-cost trap</ContentEyebrow>

          <ConceptBlock
            title="Why one stuck question can cost you the paper"
            plainEnglish="The sunk-cost trap is the single biggest L3 mark killer. You hit a hard question, spend 3 minutes on it, decide to push through 'because you've come this far', spend 3 more minutes, still can't crack it, and now 6 minutes are gone. You've effectively binned 4 other questions you could have answered."
            onSite="The maths is brutal. A 60Q / 90min paper is worth ~1.6% per question. Six minutes on one question = the time for 4 other questions. Even if you eventually get the stuck question right, you've netted +1.6% at the cost of -6.4% from the missed ones. The trade is always against you."
          >
            <p>How the sunk-cost trap actually plays out in the room:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Minutes 0-2</strong> on a stuck question — normal effort, looking
                for the formula or the right BS 7671 angle. Acceptable.
              </li>
              <li>
                <strong>Minutes 2-3</strong> — diminishing returns, but you can still
                justify finishing if you're close to converging.
              </li>
              <li>
                <strong>Past minute 3</strong> — you're now in sunk-cost territory. Every
                additional minute costs you most of an entire other question.
              </li>
              <li>
                <strong>Past minute 5</strong> — you're effectively donating marks to the
                paper. Stop. Flag. Pick the most plausible option. Move on.
              </li>
              <li>
                <strong>The reflex</strong> — drilled in every mock — is to flag-and-skip
                at minute 3 without negotiation. The instinct to &quot;just finish it&quot;
                has to be over-ridden by training.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Pitfall 2 — second-guessing in the review pass</ContentEyebrow>

          <ConceptBlock
            title="When to change an answer — and when not to"
            plainEnglish="The review pass is high-value if used right and a mark-burner if used wrong. The rule is simple: only change an answer when you can name a specific reason for the change. 'D feels better than C on a second read' is NOT a specific reason — it's the same instinct firing differently, and statistically the first answer was right."
            onSite="Most L3 candidates lose 2-4 marks in the review pass by changing right answers to wrong ones. The cost is invisible because you don't know you've done it — you submit and find out three weeks later. The discipline of NOT changing without a named reason is one of the highest-yield exam habits."
          >
            <p>The change-or-keep decision tree:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Change</strong> if you can identify a specific factual error you
                made first time — a missed clause, a misread number, a wrong-units
                calculation, a missed negation in the stem.
              </li>
              <li>
                <strong>Change</strong> if you've now done a related question that gave
                you new information bearing on this one (rare but happens).
              </li>
              <li>
                <strong>Keep</strong> if the only reason to change is &quot;option D
                feels more right now&quot; — that's second-guessing, and statistically
                your first answer is more likely correct.
              </li>
              <li>
                <strong>Keep</strong> if you're unsure — flagged answers from Pass 1 that
                you genuinely can't decide between in Pass 3 should default to your
                Pass 1 answer.
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

          <ContentEyebrow>Pitfall 3 — the time wall</ContentEyebrow>

          <ConceptBlock
            title="What to do when 60 minutes is gone and 25 questions remain"
            plainEnglish="The time wall is the moment you realise pacing has gone wrong and a third of the paper is still untouched. Most candidates respond by panicking, slowing down to be careful, and finishing 12 marks short. The right response is the opposite — speed up methodically using the triage protocol."
            onSite="The triage protocol is recoverable from a real time wall. It has to be drilled in mocks because in the live paper the cortisol spike makes improvisation impossible. Walking in with a rehearsed protocol means you execute under pressure rather than think under pressure."
          >
            <p>The last-30-minutes triage protocol — drilled, executed:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Minute 60-62</strong> — survey. Count the unanswered items. Sort
                mentally into three buckets: quick wins (90s each), medium (2-3 min
                each), pure guess (10s each).
              </li>
              <li>
                <strong>Minutes 62-77</strong> — clear the quick wins. These are the
                recall items, the obvious calculations, the easy coding calls. Bank the
                marks first.
              </li>
              <li>
                <strong>Minutes 77-87</strong> — medium-effort items. 3-minute hard
                ceiling each. Apply elimination ladder. Pick best of remaining options.
              </li>
              <li>
                <strong>Minutes 87-89</strong> — pure-guess sweep. 10 seconds per
                question. Eliminate the obviously wrong, pick the most plausible. Tick
                every blank.
              </li>
              <li>
                <strong>Minute 89-90</strong> — final blank-check. Confirm every
                question has an answer. Submit on the bell or at 89:50 — never with
                blanks remaining.
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

          <ContentEyebrow>Topic-specific traps — the ones to know</ContentEyebrow>

          <ConceptBlock
            title="The trap distractors that catch L3 candidates"
            plainEnglish="Setters reuse a small library of trap patterns across the L3 papers. Knowing them gives you a half-second advantage on every question — you spot the pattern, eliminate the trap, and pick the right answer with confidence."
            onSite="These traps aren't gotchas. They're testing whether you've actually internalised the principle or just memorised a number. A candidate who's truly comfortable with three-phase line/phase logic will never fall for the line=phase trap, no matter how plausible the distractor looks."
          >
            <p>The trap library to memorise:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Three-phase line vs phase</strong> — star: V_line = V_phase &times;
                root-3, I_line = I_phase. Delta: V_line = V_phase, I_line = I_phase
                &times; root-3. The trap is always the option that uses the wrong
                relationship for the configuration given.
              </li>
              <li>
                <strong>Voltage drop volts vs percent</strong> — calculate volts (Vd =
                mV/A/m &times; Ib &times; L / 1000), then check whether the question
                asked for volts or percentage. The two answers always appear on the
                option list together as a trap pair.
              </li>
              <li>
                <strong>EICR C2 vs C3</strong> — the &quot;potentially dangerous&quot;
                vs &quot;improvement recommended&quot; line. C2 needs a credible harm
                pathway in normal use; C3 is dated but otherwise sound.
              </li>
              <li>
                <strong>Cable CCC after derating</strong> — the trap distractor is the
                tabulated It value (the cable's CCC if derating wasn't applied). Never
                pick the raw tabulated value if the question gives you derating
                conditions.
              </li>
              <li>
                <strong>Zs limit by device type and rating</strong> — Table 41.1 has
                different Zs limits for different MCB types (B, C, D) at the same
                rating. The trap is the right number for the wrong device type.
              </li>
              <li>
                <strong>Disconnection time TN vs TT</strong> — TN: 0.4s for socket
                circuits up to 32A, 5s for distribution. TT: 0.2s for socket circuits
                up to 32A, 1s for distribution. The trap is the TN values applied to a
                TT scenario.
              </li>
              <li>
                <strong>Bonding vs earthing terminology</strong> — main protective
                bonding goes to extraneous-conductive-parts (water, gas pipes). Earthing
                goes via the protective conductor to the MET. Distractors mix the two.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Treating Unit 308 as a soft option and arriving unprepared"
            whatHappens={
              <>
                Candidate cruises through Units 301-305 mocks at 75-80% and decides Unit
                308 (Career Awareness) is &quot;just recall&quot; so doesn&apos;t need
                the same prep. Walks into the paper having barely revised the JIB grade
                names, the AM2 vs AM2E distinction, the professional body acronyms and
                the apprenticeship structure detail. Reads the first question on
                &quot;which JIB grade requires demonstrated competence in design and
                supervision&quot; and realises they only half-remember the grades. Loses
                4-5 marks across the paper on details they could have nailed with 3
                hours of revision.
              </>
            }
            doInstead={
              <>
                Treat Unit 308 like every other L3 paper. Sit at least 3 full mocks
                under exam conditions. Build a recall list of JIB grades, ECS card
                colours, AM2 vs AM2E, professional bodies (IET, ECA, NICEIC, NAPIT,
                JIB), apprenticeship pathways (2365 vs 2330 vs 2356) and CPD requirements.
                The paper is shorter (40Q / 60min) but the per-question rate is the
                same — and the questions reward specific recall, not general
                familiarity.
              </>
            }
          />

          <SectionRule />

          <Scenario
            title="Recovering from a paper that goes sideways"
            situation={
              <>
                You sit Unit 304. Question 8 is a multi-step Zs calculation that you
                spend 6 minutes on without converging. You flag it, but you&apos;ve
                already lost 4 minutes more than you should have. You hit minute 45 with
                only 25 questions answered out of 60. Cortisol spikes. Your reading
                comprehension drops. Question 26 is a coding question and you misread
                the install year as 1997 when it&apos;s 1977. You&apos;re heading for a
                fail at this rate.
              </>
            }
            whatToDo={
              <>
                Stop. Slow box breathing for 30 seconds — 4 in, 4 hold, 4 out, 4 hold.
                You have 45 minutes left and 35 questions to clear. Activate triage:
                survey the remaining 35, sort into quick wins / medium / pure guess.
                Clear the quick wins first (target: 20 questions in 25 minutes — most
                of Unit 304 has 8-10 quick recall items per paper). Then medium-effort
                in 15 minutes. Pure guess in 3 minutes. Final blank-check in 2 minutes.
                You won&apos;t hit 78% but you&apos;ll likely scrape a pass at 60-65%
                — recoverable. The triage protocol is what saves the paper.
              </>
            }
            whyItMatters={
              <>
                Papers go sideways. The difference between a recoverable pass and a
                catastrophic fail is whether you have a triage protocol drilled into
                reflex. Candidates who panic and slow down lose 15+ marks in the last
                30 minutes. Candidates who execute triage lose 5-8 marks. The paper is
                won or lost in the recovery, not in the panic.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Re-sit psychology</ContentEyebrow>

          <ConceptBlock
            title="Failing one paper is not failing the qualification"
            plainEnglish="Many strong L3 candidates fail one unit paper at first attempt. It happens. The qualification accommodates re-sits — failing Unit 305 doesn't mean you can't be an electrician; it means you need another go at one paper. The mindset that turns a failed re-sit into a pass is structured: get the per-topic breakdown, drill the gaps, sit fresh mocks until you average 70%+, then book the re-sit."
            onSite="The psychology trap is treating a fail as evidence the qualification isn't for you. It's almost never true. The candidates who give up after one fail are typically those who were close (within 5-10 marks). The ones who pass the re-sit are the ones who treat it as a structured fix, not a final verdict."
          >
            <p>The structured re-sit framework:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Week 1</strong> — get the per-topic breakdown from your tutor.
                The centre will have it — your tutor can request it. Identify the 2-3
                weakest topics from the failed paper.
              </li>
              <li>
                <strong>Weeks 1-2</strong> — focused revision on the weak topics. Not
                re-reading the chapter — drilling worked examples, sitting topic-
                specific question banks, building flashcards for the recall items.
              </li>
              <li>
                <strong>Week 3</strong> — sit a fresh full mock under exam conditions.
                If you pass at 70%+, book the re-sit. If not, another week of focused
                revision and another mock.
              </li>
              <li>
                <strong>Pre-re-sit</strong> — same exam-day prep as for the first
                attempt: error-log review the night before, eat well, sleep well, arrive
                30 minutes early.
              </li>
              <li>
                <strong>Mindset</strong> — &quot;I&apos;ve identified the gap, drilled
                the gap, mock-tested above the pass mark. The re-sit is a controlled
                fix, not a re-roll.&quot;
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

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Sunk-cost trap: 3-minute hard ceiling per question, drilled into reflex. Past 3 minutes the trade is always against you — flag, instinct-pick, move on.",
              "Second-guessing in review: only change an answer if you can name a specific reason. 'D feels better now' is not a reason — keep the first answer.",
              "Time-wall recovery: drilled triage protocol — survey, sort, quick wins, medium, pure-guess sweep, blank-check. Never blank.",
              "Topic-specific traps to watch: three-phase line/phase, voltage drop volts/percent, EICR C2/C3 boundary, CCC after derating, Zs by device type, disconnection time TN/TT, bonding vs earthing.",
              "Unit 308 is short but not soft — same per-question rate, same prep discipline. Recall items reward specific revision.",
              "Failing one paper by a small margin is normal. Per-topic breakdown, focused revision on weak topics, fresh mocks at 70%+, then re-sit. The qualification accommodates re-sits.",
            ]}
          />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('../level3-module8-section2-section3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                2.3 Exam day preparation
              </div>
            </button>
            <button
              onClick={() => navigate('..')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Back to <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 2 — How to Pass Exams
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
