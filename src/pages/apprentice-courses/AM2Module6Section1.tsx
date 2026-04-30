/**
 * Module 6 · Section 1 — Format and structure of the online test
 * AM2 day-prep — AM2 Phase E (online knowledge tests)
 * What the AM2 online knowledge test actually looks like: question style, timing and how it is delivered.
 */

import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Eye,
  FileText,
  Lightbulb,
  Monitor,
  Target,
} from 'lucide-react';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { Link } from 'react-router-dom';
import {
  ConceptBlock,
  CommonMistake,
  LearningOutcomes,
  TLDR,
  RegsCallout,
  Scenario,
  KeyTakeaways,
  FAQ,
} from '@/components/study-centre/learning';
import { PageFrame, PageHero } from '@/components/college/primitives';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Format and Structure of the Online Test | AM2 Module 6.1 | Elec-Mate';
const DESCRIPTION =
  'What the AM2 online knowledge test actually looks like — question style, timing and how it is delivered on the day.';

const AM2Module6Section1 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quickCheckQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }> = [
    {
      id: 'test-duration',
      question: 'How long is allocated for the AM2 knowledge test?',
      options: ['45 minutes', '60 minutes', '90 minutes', '120 minutes'],
      correctIndex: 1,
      explanation: 'The AM2 online knowledge test has a duration of 60 minutes for 30 questions.',
    },
    {
      id: 'unsure-strategy',
      question: "What should you do if you're unsure of a question?",
      options: [
        'Guess randomly and move on',
        'Spend extra time working it out',
        'Flag it and move on - come back later if time allows',
        'Leave it blank',
      ],
      correctIndex: 2,
      explanation:
        'Flag uncertain questions and return to them later. This prevents getting stuck and running out of time.',
    },
    {
      id: 'question-navigation',
      question: "True or false: You can't go back once you've answered a question.",
      options: [
        'True - you must answer in order',
        'False - you can move backwards and forwards through the paper',
        'True - only forward navigation is allowed',
        'False - but only within the same section',
      ],
      correctIndex: 1,
      explanation:
        'You can navigate forwards and backwards through the test and flag questions to return to them later.',
    },
  ];

  const quizQuestions = [
    {
      id: 1,
      question: 'How long does the AM2 online knowledge test last?',
      options: ['45 minutes', '60 minutes', '90 minutes', '120 minutes'],
      correctAnswer: 1,
      explanation:
        'The AM2 online knowledge test has a duration of 60 minutes to complete 30 questions.',
    },
    {
      id: 2,
      question: 'How many questions are typically in the test?',
      options: ['20-25', '30-40', '45-50', '50-60'],
      correctAnswer: 1,
      explanation:
        'The test contains 30 multiple-choice questions covering regulations, science, and safety.',
    },
    {
      id: 3,
      question: 'What is the approximate pass mark?',
      options: ['50-55%', '60-65%', '70-75%', '80-85%'],
      correctAnswer: 2,
      explanation: 'The pass mark is 70%, requiring 21 correct answers out of 30 questions.',
    },
    {
      id: 4,
      question: 'What types of questions are included?',
      options: [
        'Only regulation references',
        'Only science and calculations',
        'Regulations, science, safety, and scenario-based questions',
        'Only health and safety',
      ],
      correctAnswer: 2,
      explanation:
        'The test includes straight knowledge, applied scenarios, regulation references, science principles, and health & safety.',
    },
    {
      id: 5,
      question: "What's the best strategy if you don't know an answer straight away?",
      options: [
        'Guess randomly',
        'Spend 10 minutes working it out',
        'Flag it and move on to return later',
        'Leave it blank',
      ],
      correctAnswer: 2,
      explanation:
        'Flag uncertain questions and continue. Return to them if time allows. This prevents getting stuck and ensures you attempt all questions.',
    },
    {
      id: 6,
      question: 'How much time should you spend per question on average?',
      options: ['30-60 seconds', '1-2 minutes', '3-4 minutes', '5-10 minutes'],
      correctAnswer: 1,
      explanation:
        'With 60 minutes for 30 questions, 2 minutes per question allows time for review and flagged questions.',
    },
    {
      id: 7,
      question: 'Why do many candidates fail this section even if they know the material?',
      options: [
        'Questions are too difficult',
        'Time mismanagement and not attempting all questions',
        'Equipment failure',
        'Assessor bias',
      ],
      correctAnswer: 1,
      explanation:
        'Poor time management, getting stuck on difficult questions, and leaving questions blank are common reasons for failure despite good knowledge.',
    },
    {
      id: 8,
      question: "What's the advantage of eliminating wrong options first?",
      options: [
        'It saves time',
        'It narrows down choices and improves accuracy',
        'It impresses the assessor',
        "It's required by the system",
      ],
      correctAnswer: 1,
      explanation:
        'Eliminating obviously wrong answers narrows your choices and significantly improves your chances of selecting the correct answer.',
    },
    {
      id: 9,
      question: "What's the golden rule about leaving questions blank?",
      options: [
        'Leave difficult questions blank',
        "Only answer questions you're 100% sure about",
        "Answer every question - there's no penalty for guessing",
        'Leave 2-3 questions blank for time management',
      ],
      correctAnswer: 2,
      explanation:
        "Never leave questions blank. There's no penalty for incorrect answers, so always make an educated guess rather than leaving blanks.",
    },
    {
      id: 10,
      question: 'What format is the AM2 online knowledge test?',
      options: [
        'Written essay questions',
        'Multiple-choice with one correct answer',
        'True/false questions only',
        'Mixed format with essays and multiple choice',
      ],
      correctAnswer: 1,
      explanation:
        "The test is entirely multiple-choice format, with one correct answer (or sometimes 'best' answer) for each question.",
    },
  ];

  const learningOutcomes = [
    'Describe the format of the online AM2 knowledge test, including timing and number of questions',
    'Explain the types of questions asked (multiple-choice, scenario-based, regulation references)',
    'Recognise how marks are awarded and what score is needed to pass',
    'Apply strategies for working through the test efficiently',
    'Approach the assessment with confidence, knowing exactly what to expect',
  ];

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <Link
            to="/study-centre/apprentice/am2/module6"
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 6
          </Link>

          <PageHero
            eyebrow="Module 6 - Section 1"
            title="Format and Structure of the Online Test"
            description="The AM2 online knowledge test is a computer-based, multiple-choice exam. It assesses your knowledge of electrical regulations, science, and safety, alongside your ability to apply theory to real-world situations. The test lasts 60 minutes and contains 30 questions."
            tone="yellow"
          />

          <TLDR
            points={[
              '60 minutes, 30 multiple-choice questions, pass mark 70% (21/30). All closed-book except the BS 7671 paper which may be open-book — check with NET on the day.',
              'Two minutes per question average. Flag the hard ones, complete the easy ones first, return with fresh eyes.',
              'No penalty for wrong answers. Blank = guaranteed lost mark. Always answer every question.',
            ]}
          />

          <div className="space-y-6">
            {/* Introduction */}
            <section className="space-y-3">
              <p className="text-ios-body text-white leading-relaxed">
                Understanding the test format is essential for managing your time and answering
                confidently. Many candidates fail this section not because they don't know the
                content, but because they mismanage their time or misunderstand the question style.
              </p>
            </section>

            {/* Critical Warning */}
            <CommonMistake
              title="Time Management is Everything"
              whatHappens={
                <>
                  <p className="text-ios-callout text-white mb-3 leading-relaxed">
                    Many candidates fail the knowledge test not due to lack of knowledge, but poor
                    time management. Getting stuck on difficult questions and leaving others blank
                    is a guaranteed route to failure.
                  </p>
                  <p className="text-ios-callout text-white font-medium leading-relaxed">
                    You must attempt every question. There's no penalty for guessing, but blank
                    answers guarantee lost marks.
                  </p>
                </>
              }
              doInstead={<>Treat this as a hard rule on AM2 day — there are no exceptions.</>}
            />

            {/* Learning Outcomes */}
            <LearningOutcomes outcomes={learningOutcomes} />

            {/* Test Structure */}
            <ConceptBlock title="1. Understanding the Test Structure">
              <p>
                The AM2 knowledge test is delivered in a controlled environment at approved
                assessment centres across the UK. Understanding exactly what to expect will help you
                feel more confident and perform better on the day.
              </p>

              <p>
                <strong className="text-elec-yellow">Test Environment and Logistics:</strong> You'll
                be seated at a computer workstation in a quiet examination room. The test is
                supervised by qualified invigilators who will ensure fair conditions throughout.
                Before beginning, you'll receive a brief demonstration of the test software and
                navigation features.
              </p>

              <p>
                <strong className="text-elec-yellow">Key Test Parameters:</strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Duration:</strong> Exactly 60 minutes from when you start the test
                </li>
                <li>
                  <strong>Question Count:</strong> 30 questions
                </li>
                <li>
                  <strong>Question Format:</strong> Multiple-choice with 4 possible answers per
                  question
                </li>
                <li>
                  <strong>Pass Mark:</strong> 70% (21 correct answers out of 30)
                </li>
                <li>
                  <strong>Marking:</strong> One mark per correct answer, no penalty for wrong
                  answers
                </li>
                <li>
                  <strong>Results:</strong> Available immediately upon completion
                </li>
              </ul>

              <p>
                <strong className="text-elec-yellow">Time Management Breakdown:</strong>
              </p>
              <p>
                With 60 minutes for 30 questions, you have exactly 2 minutes per question. However,
                this doesn't mean you should spend exactly this time on each question. The most
                effective approach is:
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Quick wins:</strong> Answer straightforward questions immediately (30-60
                  seconds)
                </li>
                <li>
                  <strong>Standard questions:</strong> Take 1-2 minutes for typical questions
                </li>
                <li>
                  <strong>Complex scenarios:</strong> Allow up to 3-4 minutes for challenging
                  questions
                </li>
                <li>
                  <strong>Review time:</strong> Reserve 5-10 minutes at the end for flagged
                  questions
                </li>
              </ul>

              <p>
                <strong className="text-elec-yellow">Important Test Rules:</strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>No mobile phones, calculators, or reference materials allowed</li>
                <li>You cannot pause the test once started</li>
                <li>All questions must be attempted - blank answers receive zero marks</li>
                <li>You can change answers until you submit the test</li>
                <li>The test auto-submits when time expires</li>
              </ul>
            </ConceptBlock>

            <InlineCheck
              id={quickCheckQuestions[0].id}
              question={quickCheckQuestions[0].question}
              options={quickCheckQuestions[0].options}
              correctIndex={quickCheckQuestions[0].correctIndex}
              explanation={quickCheckQuestions[0].explanation}
            />

            {/* Question Types */}
            <ConceptBlock title="2. Question Types and Content Areas">
              <p>
                The AM2 knowledge test covers five main types of questions, each designed to assess
                different aspects of your electrical knowledge and competence.
              </p>

              <p>
                <strong className="text-elec-yellow">
                  Straight Knowledge Questions (25-30% of test)
                </strong>
              </p>
              <p>
                These questions test your direct recall of facts, figures, and regulations from BS
                7671 and related standards.
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Example topics:</strong> IP ratings, cable current ratings, diversity
                  factors, protective device characteristics
                </li>
                <li>
                  <strong>Strategy:</strong> These should be quick wins - if you know it, answer
                  immediately. If not, flag and move on
                </li>
              </ul>

              <p>
                <strong className="text-elec-yellow">
                  Applied Scenario Questions (35-40% of test)
                </strong>
              </p>
              <p>
                These questions present real-world electrical situations and ask you to apply your
                knowledge to solve problems or make decisions.
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Common scenarios:</strong> Test results interpretation, fault symptoms,
                  remedial actions, compliance issues
                </li>
                <li>
                  <strong>Strategy:</strong> Read the scenario carefully, identify what's happening,
                  then consider what regulations or procedures apply
                </li>
              </ul>

              <p>
                <strong className="text-elec-yellow">
                  Regulation Reference Questions (15-20% of test)
                </strong>
              </p>
              <p>
                These questions require you to know which specific regulations apply in given
                situations.
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Example areas:</strong> Regulation numbers for specific requirements,
                  table references, appendix content
                </li>
                <li>
                  <strong>Strategy:</strong> Learn key regulation numbers and their purposes rather
                  than trying to memorise everything
                </li>
              </ul>

              <p>
                <strong className="text-elec-yellow">
                  Calculation and Science Questions (20-25% of test)
                </strong>
              </p>
              <p>
                These questions test your understanding of electrical principles and ability to
                perform basic calculations.
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Common topics:</strong> Ohm's law applications, power calculations,
                  voltage drop, fault current, cable sizing
                </li>
                <li>
                  <strong>Strategy:</strong> Show your working mentally and double-check
                  calculations
                </li>
              </ul>

              <p>
                <strong className="text-elec-yellow">
                  Health and Safety Questions (10-15% of test)
                </strong>
              </p>
              <p>
                These questions cover safe working practices, risk assessment, PPE requirements, and
                legal obligations.
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Key areas:</strong> CDM regulations, risk assessment, safe isolation, PPE,
                  working at height
                </li>
                <li>
                  <strong>Strategy:</strong> Think about best practice and legal requirements -
                  safety is always the priority
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

            <Scenario
              title="You're 30 minutes in and only on question 8 — what now?"
              situation={
                <>
                  You've been hammering the science calculations and you spotted at the 30-minute
                  checkpoint that you've only completed 8 of 30 questions. That's well off pace
                  (should be 15 by now). Panic starts setting in. The clock keeps ticking.
                </>
              }
              whatToDo={
                <>
                  Stop. Take 30 seconds to breathe. Then change tactics:{' '}
                  <strong>flag aggressively.</strong> Skim the next 10 questions, answer only the
                  ones you can do in under 60 seconds, flag everything else. Aim to clear all
                  easy/medium questions first across the remaining 22, then come back to flagged
                  with whatever time's left. You'll guess on some — that's fine, no penalty. The
                  goal is to not leave any blank, and to bank the marks you definitely know.
                </>
              }
              whyItMatters={
                <>
                  Most online test failures come from candidates who knew the material but managed
                  time badly. Spending 5 minutes on a tricky calculation question that's worth 1
                  mark, while leaving 5 easy questions unanswered, is the classic mistake. Pace
                  checkpoints (10 questions in 20 min, 20 in 40 min, 30 in 55 min) save you.
                </>
              }
            />

            {/* Assessor Expectations */}
            <ConceptBlock title="3. Assessor Expectations">
              <p>Assessors don't just want correct answers - they want to see that you:</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  Understand how to approach scenario-based questions, not just memorise facts
                </li>
                <li>Use regulation knowledge to choose the correct answer</li>
                <li>Manage your time and attempt every question (no blanks)</li>
              </ul>
            </ConceptBlock>

            {/* Test-Taking Strategies */}
            <ConceptBlock title="4. Test-Taking Strategies and Practical Guidance">
              <p>
                Success in the AM2 knowledge test depends not just on what you know, but how
                effectively you apply your knowledge under time pressure.
              </p>

              <p>
                <strong className="text-elec-yellow">Before You Begin:</strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Arrive early:</strong> Get to the test centre 15-20 minutes before your
                  appointment
                </li>
                <li>
                  <strong>Listen to the briefing:</strong> Pay attention to any last-minute
                  instructions
                </li>
                <li>
                  <strong>Familiarise with interface:</strong> Take the practice questions seriously
                </li>
                <li>
                  <strong>Mental preparation:</strong> Take a deep breath and remind yourself you've
                  prepared thoroughly
                </li>
              </ul>

              <p>
                <strong className="text-elec-yellow">Reading and Understanding Questions:</strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Read the entire question:</strong> Don't assume after reading the first
                  few words
                </li>
                <li>
                  <strong>Identify key words:</strong> Look for "minimum", "maximum", "not",
                  "except", "best"
                </li>
                <li>
                  <strong>Check for negatives:</strong> Questions asking what "should NOT" be done
                  catch many candidates
                </li>
              </ul>

              <p>
                <strong className="text-elec-yellow">Elimination Strategy:</strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Look for extreme values:</strong> Unusually high or low answers are often
                  incorrect
                </li>
                <li>
                  <strong>Eliminate unsafe options:</strong> Any answer that would create a safety
                  hazard is likely wrong
                </li>
                <li>
                  <strong>Use your experience:</strong> What would you actually do in this situation
                  on site?
                </li>
              </ul>

              <p>
                <strong className="text-elec-yellow">Time Management Techniques:</strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Quick scan first:</strong> Identify easy questions you can answer
                  immediately
                </li>
                <li>
                  <strong>Set time checkpoints:</strong> 50% in 25 minutes, 75% in 40 minutes
                </li>
                <li>
                  <strong>Don't get stuck:</strong> If more than 3 minutes on a question, flag it
                  and move on
                </li>
                <li>
                  <strong>Save time for review:</strong> Finish with 5-10 minutes for flagged
                  questions
                </li>
              </ul>
            </ConceptBlock>

            <InlineCheck
              id={quickCheckQuestions[2].id}
              question={quickCheckQuestions[2].question}
              options={quickCheckQuestions[2].options}
              correctIndex={quickCheckQuestions[2].correctIndex}
              explanation={quickCheckQuestions[2].explanation}
            />

            <CommonMistake
              title="Treating the test as 'know-or-don't' instead of 'attempt everything'"
              whatHappens={
                <>
                  You hit a question you don't immediately know, you stare at it, you eventually
                  leave it blank thinking "no point guessing". You repeat this 4–5 times across the
                  hour. Result: you've thrown away 4–5 marks just by not picking ANY answer. With a
                  70% pass mark on 30 questions, that's the difference between pass and fail.
                </>
              }
              doInstead={
                <>
                  Eliminate obviously wrong options first. If you can rule out 2 of 4, you're now at
                  50/50. Pick one and move on. Even random guessing on all 4 options gives you 25%
                  right by chance. Blank gives you 0%. Always pick something. Always.
                </>
              }
            />

            {/* Real-world Examples */}
            <ConceptBlock title="5. Real-World Examples">
              <p>
                <strong className="text-elec-yellow">Example 1: Poor Time Management</strong>
              </p>
              <p>
                Candidate spent 15 minutes stuck on one science question, ran out of time, and left
                5 unanswered. <strong>Failed.</strong>
              </p>

              <p>
                <strong className="text-elec-yellow">Example 2: Smart Strategy</strong>
              </p>
              <p>
                Candidate flagged 3 questions, completed the rest, then came back with fresh focus
                and answered correctly. <strong>Passed.</strong>
              </p>

              <p>
                <strong className="text-elec-yellow">Example 3: Rushing Error</strong>
              </p>
              <p>
                Candidate misread a question on Zs values and picked the maximum permitted value
                instead of actual measured. Lost marks through rushing.
              </p>
            </ConceptBlock>

            <FAQ
              items={[
                {
                  question: 'How many questions are in the knowledge test?',
                  answer:
                    "30 questions — multiple-choice format, 4 options per question, one correct answer (or sometimes 'best' answer where multiple options seem right but one is most correct).",
                },
                {
                  question: 'How long do I have?',
                  answer:
                    "60 minutes total. The test auto-submits when time expires — anything unanswered counts as wrong, so always have SOMETHING selected on every question even if it's a guess.",
                },
                {
                  question: "What's the pass mark?",
                  answer:
                    "70% — 21 correct answers out of 30. That means you can get up to 9 wrong and still pass. Knowing this changes your strategy: if you definitely know 25 questions and can guess 5 with 50/50 odds, you're statistically going to pass.",
                },
                {
                  question: 'Can I skip and return to questions?',
                  answer:
                    'Yes — every test station has a flag/mark-for-review feature and you can navigate forwards and backwards freely until you submit. Use this aggressively. Flag anything taking more than 90 seconds and come back.',
                },
                {
                  question: 'Are questions only on regs?',
                  answer:
                    'No — coverage is roughly regs (BS 7671) ~25–30%, applied scenarios ~35–40%, regulation references ~15–20%, calculations/science ~20–25%, health & safety ~10–15%. Spread your revision across all of these, not just BS 7671.',
                },
                {
                  question: 'What if I run out of time mid-question?',
                  answer:
                    "The test auto-submits with whatever you've selected. Anything unanswered = wrong. In the last 5 minutes, prioritise giving SOME answer to every question over getting any single one perfectly right. A wild guess is better than a blank.",
                },
              ]}
            />

            {/* Summary */}
            <ConceptBlock title="Summary">
              <p className="text-ios-body text-white leading-relaxed">
                The AM2 online knowledge test is a 60-minute, multiple-choice exam with 30 questions
                covering regs, science, and safety. You need 70% (21/30) to pass. Success depends
                not only on knowledge but also on managing your time and answering every question.
                Assessors expect candidates to work methodically, avoid rushing, and use strategies
                like flagging tricky questions.
              </p>
            </ConceptBlock>

            <KeyTakeaways
              points={[
                '60 minutes, 30 questions, 70% pass mark (21/30). You can afford up to 9 wrong answers.',
                'Two minutes per question average — but not equal split. Easy ones in 30 seconds, complex calcs up to 4 minutes, save 5–10 min for flagged review.',
                'Always answer every question. No penalty for wrong, blank guarantees lost mark. Eliminate, guess, move on.',
                "Pace checkpoints: 10 done by 20 min, 20 done by 40 min, 30 done by 55 min. Falling behind = flag aggressively, don't dig in.",
                'Test station rules: no phone, no calculator, no reference materials (except possibly BS 7671 for the open-book paper — confirm with NET on the day).',
              ]}
            />

            {/* Quiz Section */}
            <div className="border-t border-white/10 pt-8">
              <Quiz title="Test Your Knowledge: Online Test Format" questions={quizQuestions} />
            </div>

            {/* Navigation */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Link
                to="/study-centre/apprentice/am2/module6"
                className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous
                </div>
                <div className="mt-1 text-[14px] font-semibold text-white truncate">
                  Module 6 Overview
                </div>
              </Link>
              <Link
                to="/study-centre/apprentice/am2/module6/section2"
                className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 text-[14px] font-semibold text-black truncate">
                  Core Topics
                </div>
              </Link>
            </div>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default AM2Module6Section1;
