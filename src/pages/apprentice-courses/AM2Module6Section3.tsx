/**
 * Module 6 · Section 3 — Time management strategies
 * AM2 day-prep — AM2 Phase E (online knowledge tests)
 * Pacing the 90-minute knowledge test — flag and skip, keep moving, leave time to review.
 */

import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  Brain,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Eye,
  Lightbulb,
  Search,
  Target,
  Timer,
} from 'lucide-react';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { Link } from 'react-router-dom';
import {
  ConceptBlock,
  CommonMistake,
  LearningOutcomes,
  TLDR,
  Scenario,
  KeyTakeaways,
  FAQ,
} from '@/components/study-centre/learning';
import { PageFrame, PageHero } from '@/components/college/primitives';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Time Management Strategies | AM2 Module 6.3 | Elec-Mate';
const DESCRIPTION =
  'Pacing the AM2 90-minute online knowledge test — flag and skip the time-burners, keep moving and leave room to review.';

const AM2Module6Section3 = () => {
  useSEO(TITLE, DESCRIPTION);

  const learningOutcomes = [
    'Plan how to use the 90 minutes effectively',
    'Apply strategies for handling tricky or time-consuming questions',
    'Keep track of progress without panicking',
    'Ensure every question is attempted, with nothing left blank',
    'Demonstrate exam discipline under assessment conditions',
  ];

  const quickCheckQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }> = [
    {
      id: 'time-per-question',
      question:
        'If you have 40 questions in 90 minutes, how much time per question should you aim for?',
      options: [
        '1 minute per question',
        'About 2 minutes per question',
        '3 minutes per question',
        '4 minutes per question',
      ],
      correctIndex: 1,
      explanation:
        'About 2 minutes per question - with 40 questions in 90 minutes, you get 2.25 minutes each, so aim for 2 minutes to have review time.',
    },
    {
      id: 'best-strategy',
      question: "What's better if you're unsure - leaving blank or making your best choice?",
      options: [
        'Leave it blank',
        'Make your best choice',
        'Skip it completely',
        'Spend 10 minutes thinking',
      ],
      correctIndex: 1,
      explanation:
        'Make your best choice - no penalty for guessing, but blank answers guarantee lost marks.',
    },
  ];

  const quizQuestions = [
    {
      id: 1,
      question: 'How many minutes are available for the online knowledge test?',
      options: ['60 minutes', '75 minutes', '90 minutes', '120 minutes'],
      correctAnswer: 2,
      explanation: 'The AM2 online knowledge test is 90 minutes long.',
    },
    {
      id: 2,
      question: 'Roughly how much time per question if there are 40 questions?',
      options: ['1 minute', '2 minutes', '3 minutes', '4 minutes'],
      correctAnswer: 1,
      explanation:
        'With 40 questions in 90 minutes, you get about 2.25 minutes per question - aim for 2 minutes each.',
    },
    {
      id: 3,
      question: 'Why should you flag tricky questions instead of staying stuck?',
      options: [
        'To avoid them completely',
        'To save time and maintain momentum',
        "Because they're worth fewer marks",
        'To confuse other candidates',
      ],
      correctAnswer: 1,
      explanation:
        'Flagging saves time and maintains momentum - you can return with a fresh perspective later.',
    },
    {
      id: 4,
      question: "What's the best strategy if you're unsure of an answer?",
      options: [
        'Leave it blank',
        'Eliminate wrong options and guess',
        'Skip the question',
        'Spend 10 minutes thinking',
      ],
      correctAnswer: 1,
      explanation:
        'Eliminate wrong options and make your best guess - no penalty for wrong answers but blanks guarantee lost marks.',
    },
    {
      id: 5,
      question: 'True or false: There is negative marking for wrong answers.',
      options: ['True', 'False'],
      correctAnswer: 1,
      explanation:
        "False - there's no negative marking, so always answer every question even if you're guessing.",
    },
    {
      id: 6,
      question: 'How many questions should you aim to complete in the first 30 minutes?',
      options: ['8-10 questions', '10-12 questions', '15-20 questions', 'All 40 questions'],
      correctAnswer: 1,
      explanation:
        'Around 10-12 questions in the first 30 minutes gives you a good pace with time for review.',
    },
    {
      id: 7,
      question: "What's the danger of rushing through the test?",
      options: [
        'You finish too early',
        'Misreading questions and careless errors',
        'The examiner gets suspicious',
        'Nothing - speed is always good',
      ],
      correctAnswer: 1,
      explanation:
        'Rushing leads to misreading questions and careless errors - steady, controlled pace is better.',
    },
    {
      id: 8,
      question: 'Why should you check flagged questions first in review time?',
      options: [
        "They're worth more marks",
        "You've already attempted them",
        'Fresh perspective on difficult ones',
        'To change all your answers',
      ],
      correctAnswer: 2,
      explanation:
        'Fresh perspective helps - coming back to flagged questions later often leads to correct answers.',
    },
    {
      id: 9,
      question: 'How can you stop yourself panicking about the clock?',
      options: [
        'Hide the clock completely',
        'Check time every minute',
        'Check every 10-15 minutes only',
        'Ask the examiner for time',
      ],
      correctAnswer: 2,
      explanation:
        'Check time every 10-15 minutes only - constant clock-watching increases anxiety and wastes time.',
    },
    {
      id: 10,
      question: "What's the golden rule for time management in AM2?",
      options: [
        'Speed above accuracy',
        'Answer every question',
        'Spend equal time on each',
        'Focus on calculations only',
      ],
      correctAnswer: 1,
      explanation:
        'Answer every question - time management ensures you attempt all questions for maximum possible marks.',
    },
  ];

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <Link
            to="/study-centre/apprentice/am2/module6"
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>

          {/* Hero Section */}
          <PageHero
            eyebrow="Module 6 • Section 3"
            title="Time Management Strategies"
            description="The AM2 online knowledge test is 90 minutes long with around 30-40 questions. That gives you roughly 2-3 minutes per question. Candidates often fail not because they lack knowledge, but because they mismanage time - either spending too long on one tricky question or rushing and making careless mistakes. Time management ensures you attempt every question, work steadily, and stay calm under pressure."
            tone="yellow"
          />

          <TLDR
            points={[
              '2 minutes per question average. Easy ones in 30–60 seconds, complex ones up to 4 minutes, save 5–10 minutes for flagged review.',
              "Pace checkpoints: 1/3 done by 30 min, 2/3 done by 60 min, all done by 80 min. Falling behind = flag aggressively, don't dig in.",
              'Never spend > 5 minutes on a single question. Flag it, guess if you must, move on. Coming back fresh after 20 minutes often unlocks the answer anyway.',
            ]}
          />

          {/* Critical Warning */}
          <CommonMistake
            title="Time Management is Everything"
            whatHappens={
              <>
                <p className="text-ios-callout text-white mb-2">
                  Many candidates fail the knowledge test not due to lack of knowledge, but poor
                  time management. Getting stuck on difficult questions and leaving others blank is
                  a guaranteed route to failure.
                </p>
                <p className="text-ios-callout text-white font-medium">
                  You must attempt every question. There's no penalty for guessing, but blank
                  answers guarantee lost marks.
                </p>
              </>
            }
            doInstead={<>Treat this as a hard rule on AM2 day — there are no exceptions.</>}
          />

          {/* Learning Outcomes */}
          <section className="space-y-3">
            <LearningOutcomes outcomes={learningOutcomes} />
          </section>

          {/* How to Pace Yourself */}
          <ConceptBlock title="1. How to Pace Yourself">
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>30 questions = 3 minutes each</strong>
              </li>
              <li>
                <strong>40 questions = 2 minutes each</strong>
              </li>
              <li>
                <strong>Aim to finish with 10 minutes spare for review</strong>
              </li>
            </ul>

            <p>
              <strong className="text-elec-yellow">Time Allocation Breakdown:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>First 30 minutes:</strong> 10-12 easy questions
              </li>
              <li>
                <strong>Next 30 minutes:</strong> 10-12 medium questions
              </li>
              <li>
                <strong>Next 20 minutes:</strong> Remaining questions
              </li>
              <li>
                <strong>Final 10 minutes:</strong> Review flagged questions
              </li>
            </ul>

            <p>
              <strong className="text-elec-yellow">Pace Indicators:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>On track:</strong> 1/3 complete at 30 minutes
              </li>
              <li>
                <strong>Good pace:</strong> 2/3 complete at 60 minutes
              </li>
              <li>
                <strong>Warning:</strong> Less than 1/4 at 30 minutes
              </li>
              <li>
                <strong>Crisis:</strong> Less than 1/2 at 60 minutes
              </li>
            </ul>

            <p>
              <strong className="text-elec-yellow">Time Management Golden Rules:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Never spend more than 5 minutes on any single question</strong>
              </li>
              <li>
                <strong>Check the clock every 10 questions, not every question</strong>
              </li>
              <li>
                <strong>If behind schedule, flag more aggressively</strong>
              </li>
              <li>
                <strong>Speed comes from confidence, not panic</strong>
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={quickCheckQuestions[0].id}
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          <Scenario
            title="Question 12 is a beast — should you keep going or move on?"
            situation={
              <>
                You're 25 minutes in. Question 12 is a multi-step calculation involving voltage drop
                on a long cable run. You've worked through it once and got an answer that doesn't
                match any option. You're tempted to redo it from scratch — that'll take another 4
                minutes. Meanwhile there are 18 questions left in 65 minutes.
              </>
            }
            whatToDo={
              <>
                Flag and move on. <strong>Don't burn 4 more minutes</strong> on a question you've
                already missed once — the next 4 minutes are statistically more useful spent on 4
                different questions you've not seen yet. Pick the option that looks closest to your
                workings, lock it in (no blanks), flag it. Come back in the final 10 minutes with
                fresh eyes — often the slip jumps out instantly when you re-read.
              </>
            }
            whyItMatters={
              <>
                Sunk-cost fallacy is the time killer. "I've spent 4 minutes on this, surely I should
                stick with it" — but that 4 minutes is gone whether you finish or not. The choice is
                now: spend 4 more minutes here, or 4 minutes on 4 fresh questions. The fresh
                questions will almost always score better.
              </>
            }
          />

          {/* Strategies for Tricky Questions */}
          <ConceptBlock title="2. Strategies for Tricky Questions">
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Flag and return later.</strong> Don't waste 10 minutes stuck
              </li>
              <li>
                <strong>Eliminate wrong answers.</strong> Narrow to 2 options before guessing
              </li>
              <li>
                <strong>Don't overthink.</strong> Usually the most straightforward answer is correct
              </li>
            </ul>

            <p>
              <strong className="text-elec-yellow">The FLAGGING System:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>RED FLAG:</strong> Complex calculations requiring 5+ minutes
              </li>
              <li>
                <strong>YELLOW FLAG:</strong> Uncertain between 2 options
              </li>
              <li>
                <strong>GREEN FLAG:</strong> Quick review needed but manageable
              </li>
            </ul>

            <p>
              <strong className="text-elec-yellow">Question Types & Time Allocation:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Regulation recall (30 seconds):</strong> "Maximum Zs for 32A Type B MCB?"
              </li>
              <li>
                <strong>Simple calculation (1-2 minutes):</strong> "Current drawn by 3kW heater at
                230V?"
              </li>
              <li>
                <strong>Application questions (2-3 minutes):</strong> "RCD requirements in bathroom
                zones"
              </li>
              <li>
                <strong>Complex scenarios (3-5 minutes):</strong> Multi-step calculations or
                interpretations
              </li>
            </ul>

            <p>
              <strong className="text-elec-yellow">Emergency Time Recovery:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>If 15+ minutes behind:</strong> Flag ALL calculations, focus on recall
                questions
              </li>
              <li>
                <strong>If 10 minutes behind:</strong> Speed up elimination, guess more confidently
              </li>
              <li>
                <strong>If 5 minutes behind:</strong> Reduce checking, trust first instincts
              </li>
              <li>
                <strong>Last 15 minutes:</strong> Ensure every question has an answer
              </li>
            </ul>
          </ConceptBlock>

          {/* Staying Calm Under Pressure */}
          <ConceptBlock title="3. Staying Calm Under Pressure">
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Breathe and re-focus</strong> if you feel rushed
              </li>
              <li>
                <strong>Don't look at the clock constantly</strong> - check time every 10-15 minutes
                instead
              </li>
              <li>
                <strong>Think of it as 3 small 30-minute tests</strong> rather than one long one
              </li>
            </ul>

            <p>
              <strong className="text-elec-yellow">Physical Calm Techniques:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>4-7-8 Breathing:</strong> Inhale 4, hold 7, exhale 8 counts
              </li>
              <li>
                <strong>Shoulder roll:</strong> Release tension every 15 minutes
              </li>
              <li>
                <strong>Posture reset:</strong> Sit back, straighten spine
              </li>
              <li>
                <strong>Hand shake:</strong> If sweaty palms, quick shake and wipe
              </li>
            </ul>

            <p>
              <strong className="text-elec-yellow">Mental Calm Strategies:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Positive self-talk:</strong> "I know this material"
              </li>
              <li>
                <strong>Progress focus:</strong> "10 down, only 5 more to go"
              </li>
              <li>
                <strong>Reset mantras:</strong> "One question at a time"
              </li>
              <li>
                <strong>Confidence anchors:</strong> Remember recent successes
              </li>
            </ul>

            <p>
              <strong className="text-elec-yellow">The "Chunk" Method Explained:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Chunk 1 (Questions 1-13):</strong> "First third done - building momentum"
              </li>
              <li>
                <strong>Chunk 2 (Questions 14-26):</strong> "Over halfway - in the zone now"
              </li>
              <li>
                <strong>Chunk 3 (Questions 27-40):</strong> "Final stretch - nearly there"
              </li>
            </ul>

            <p>
              <strong className="text-elec-yellow">When You Feel Panic Setting In:</strong>
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>STOP</strong> - Don't continue in panic mode
              </li>
              <li>
                <strong>BREATHE</strong> - Take 3 controlled breaths
              </li>
              <li>
                <strong>ASSESS</strong> - Where am I? How many left?
              </li>
              <li>
                <strong>ADJUST</strong> - Flag more aggressively if needed
              </li>
              <li>
                <strong>CONTINUE</strong> - One question at a time
              </li>
            </ol>
          </ConceptBlock>

          {/* Assessor Expectations */}
          <ConceptBlock title="4. Assessor Expectations">
            <p>
              Assessors don't see your screen, but they know what good exam technique looks like.
              They expect you to:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Attempt every question</strong> (no blanks)
              </li>
              <li>
                <strong>Work methodically</strong> through the paper
              </li>
              <li>
                <strong>Manage time</strong> without panicking or skipping whole sections
              </li>
            </ul>

            <p>
              <strong className="text-elec-yellow">Good Exam Discipline:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Consistent pacing throughout the test</li>
              <li>Every question attempted (no blanks)</li>
              <li>Logical sequence of answering</li>
              <li>Appropriate time spent on difficult questions</li>
              <li>Evidence of review and checking</li>
            </ul>

            <p>
              <strong className="text-elec-yellow">Poor Time Management:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Large gaps of unanswered questions</li>
              <li>Erratic timing patterns</li>
              <li>Rush of answers in final minutes</li>
              <li>No evidence of strategic planning</li>
              <li>Panic-driven answer changes</li>
            </ul>

            <p>
              <strong className="text-elec-yellow">Professional Standards Expected:</strong>
            </p>
            <p>Assessors expect the same professionalism you'd show on a job site:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Systematic approach:</strong> Like conducting a proper inspection
              </li>
              <li>
                <strong>Risk management:</strong> Identifying and handling difficult areas
              </li>
              <li>
                <strong>Quality control:</strong> Checking your work before submitting
              </li>
              <li>
                <strong>Time efficiency:</strong> Getting the job done within deadlines
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={quickCheckQuestions[1].id}
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          <CommonMistake
            title="Watching the clock every minute"
            whatHappens={
              <>
                You glance at the timer after every question. Each glance breaks your focus,
                increases anxiety, and adds 5–10 seconds across the test. By question 20 you're
                mentally exhausted from clock-watching, and you've lost the equivalent of 2–3
                minutes of actual problem-solving time.
              </>
            }
            doInstead={
              <>
                Set yourself 3 checkpoints: 30 min (should be 1/3 done), 60 min (2/3 done), 80 min
                (all done, 10 min for review). Only check at those points. Between checkpoints,
                ignore the clock and focus on the question in front of you. Pace by chunks of 10
                questions, not by seconds.
              </>
            }
          />

          {/* Practical Guidance */}
          <section className="space-y-3">
            <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Practical Guidance
            </h2>

            <ul className="space-y-2 text-sm text-white">
              <li>
                - <strong className="text-white">Do a first pass quickly.</strong> Answer all the
                ones you know
              </li>
              <li>
                - <strong className="text-white">Second pass for flagged questions.</strong> Spend
                more time on tricky ones later
              </li>
              <li>
                - <strong className="text-white">Keep moving.</strong> Time lost early cannot be
                recovered
              </li>
              <li>
                - <strong className="text-white">Use spare minutes wisely.</strong> Double-check
                flagged answers first, not the whole paper
              </li>
              <li>
                - <strong className="text-white">Stay neat.</strong> Rushed answers often lead to
                clicking the wrong option
              </li>
            </ul>
          </section>

          {/* Real-World Examples */}
          <ConceptBlock title="Real-World Examples">
            <p>
              <strong className="text-elec-yellow">Example 1:</strong> Candidate spent 20 minutes on
              one science calculation, left 6 questions unanswered - failed by 2 marks.
            </p>
            <p>
              <strong className="text-elec-yellow">Example 2:</strong> Candidate flagged 5 tricky
              questions, finished the rest, came back fresh and got 4 right - passed.
            </p>
            <p>
              <strong className="text-elec-yellow">Example 3:</strong> Candidate rushed and misread
              "minimum" for "maximum" in a regs question - lost easy marks.
            </p>
          </ConceptBlock>

          <FAQ
            items={[
              {
                question: "Should I guess if I don't know the answer?",
                answer:
                  "Always — there's no negative marking, so a blank is guaranteed lost mark whereas a guess gives you 25–50% chance of scoring (depending on whether you can eliminate options). Random pick beats blank every time.",
              },
              {
                question: 'How many questions should I aim to finish in the first 30 minutes?',
                answer:
                  "10–12 questions. That's a third of the way at a third of the time — exactly on pace. If you've only done 5–6 by 30 minutes, change tactics: flag the hard ones aggressively and bank the easy questions first.",
              },
              {
                question: 'What happens if I run out of time?',
                answer:
                  "Test auto-submits with whatever you have selected. Any unanswered questions count as wrong. In the last 5 minutes, if you've got blanks, prioritise pure guesses over trying to perfect any single answer — every random click might score 25%.",
              },
              {
                question: 'Can I change answers once selected?',
                answer:
                  "Yes — until you submit. Use this carefully though. Research shows your first instinct is usually right; only change if you spot a clear error in your reasoning. Don't change because you're nervous — that's how candidates lose marks they already had.",
              },
              {
                question: 'Should I spend equal time on every question?',
                answer:
                  "No — answer easy ones quickly (30–60 seconds), spend more time on tricky ones (up to 4 minutes), but never more than 5 minutes on any single question. Flag and move on. Time is a budget — spend it where it'll earn the most marks.",
              },
              {
                question: 'How do I stop panicking when I see a hard question?',
                answer:
                  "Use the chunk method: think 'this is question 14 of 30, I'm 47% through, and I only need 70% TOTAL — even if I get this wrong, I can still pass'. The pass mark allows for 9 wrong answers. One hard question won't sink you — but panic spreading to the next 5 questions will.",
              },
            ]}
          />

          {/* Summary */}
          <section className="space-y-3">
            <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Summary
            </h2>

            <div className="text-sm text-white space-y-3">
              <p>Time management in the AM2 knowledge test is about control and pacing.</p>
              <ul className="space-y-1 ml-4">
                <li>- Allocate 2-3 minutes per question</li>
                <li>- Answer all easy ones first, flag tricky ones</li>
                <li>- Use elimination and best judgement rather than leaving blanks</li>
                <li>- Stay calm and review flagged questions at the end</li>
              </ul>
              <p className="font-medium text-elec-yellow">
                If you manage your time well, you give yourself the best chance of turning knowledge
                into marks.
              </p>
            </div>
          </section>

          <KeyTakeaways
            points={[
              '2 minutes per question average. Easy questions in 30–60 sec, complex calcs up to 4 min, 5–10 min reserved for flagged review.',
              "Pace checkpoints: 1/3 done by 30 min, 2/3 by 60 min, all done by 80 min. Falling behind = flag aggressively, don't dig in.",
              '5-minute rule: never spend more than 5 minutes on any single question. Flag, guess, move on. Sunk-cost will kill your test.',
              'Clock-watching is a time tax. Set 3 checkpoints (30/60/80 min), look only then. Between checkpoints, focus on the question.',
              'Always answer every question. Blank = guaranteed lost mark. Random guess = 25% chance. Eliminated guess = 33–50% chance. Always pick something.',
            ]}
          />

          {/* Quiz */}
          <Quiz questions={quizQuestions} title="Test Your Understanding" />

          {/* Navigation Footer */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <Link
              to="/study-centre/apprentice/am2/module6/section2"
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">Core Topics</div>
            </Link>
            <Link
              to="/study-centre/apprentice/am2/module6/section4"
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Exam Techniques
              </div>
            </Link>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default AM2Module6Section3;
