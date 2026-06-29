/**
 * Module 3 · Section 6 — Managing time during installation
 * AM2 day-prep — AM2 Phase B (composite installation: cable, containment, circuits, terminations)
 * Pacing the install across the day so testing and paperwork still get the time they need.
 */

import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
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
import useSEO from '@/hooks/useSEO';

const TITLE = 'Managing Time During Installation | AM2 Module 3.6 | Elec-Mate';
const DESCRIPTION =
  'Pacing the AM2 composite install — staged time targets, when to push on, when to slow down and how to leave room for testing.';

const AM2Module3Section6 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  const learningOutcomes = [
    'Break down the installation into clear stages with realistic time targets',
    'Prioritise accuracy and safety under time pressure without compromising standards',
    'Avoid rushing and cutting corners that cause marks to be lost or failures',
    'Apply practical strategies to stay on schedule during AM2 assessment',
    'Recognise what assessors expect regarding time management and pacing',
    'Develop professional time management skills for real-world electrical work',
  ];

  const quickCheckQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }> = [
    {
      id: 'incomplete-vs-unsafe',
      question:
        "What's worse in AM2 - leaving a section incomplete but safe, or rushing and leaving unsafe work?",
      options: [
        'Unsafe work is worse - unsafe = fail',
        'Incomplete work is worse',
        'Both are equally bad',
        'Neither affects the assessment',
      ],
      correctIndex: 0,
      explanation:
        'Incomplete but safe work is better than unsafe work. Unsafe work results in automatic failure, while incomplete work loses marks but may still allow a pass.',
    },
    {
      id: 'time-pressure-response',
      question:
        'What does the assessor do if you run out of time and leave circuits half-finished?',
      options: [
        "Mark only what's complete - incomplete = lost marks",
        'Award partial credit for unfinished circuits',
        'Allow you to finish during a break',
        'Mark the work as if it were complete',
      ],
      correctIndex: 0,
      explanation:
        "Assessors mark only what's complete. Unfinished work automatically loses marks, often resulting in failure to meet pass requirements.",
    },
    {
      id: 'extra-time-request',
      question: "Can you ask for extra time if you're running behind schedule?",
      options: [
        'Yes, if you explain the reason',
        'No - the schedule is fixed',
        'Only for technical difficulties',
        'Yes, but only 30 minutes maximum',
      ],
      correctIndex: 1,
      explanation:
        'No extra time is available. The AM2 schedule is fixed and candidates must complete all work within the allocated timeframe.',
    },
  ];

  const quizQuestions = [
    {
      id: 1,
      question: 'Roughly how long is allocated for the composite installation in AM2?',
      options: [
        '6 hours',
        '8.5 hours',
        '10 hours',
        '12 hours',
      ],
      correctAnswer: 1,
      explanation:
        'The AM2 composite installation is allocated around 8.5 hours, requiring careful time management to complete all requirements.',
    },
    {
      id: 2,
      question: 'Which is better if time is running out - incomplete or unsafe work?',
      options: [
        'Both are equally bad',
        'Neither matters',
        'Incomplete work',
        'Unsafe work',
      ],
      correctAnswer: 2,
      explanation:
        'Incomplete but safe work is always better than unsafe work. Unsafe work results in automatic failure.',
    },
    {
      id: 3,
      question: "What's the danger of spending too long on one bend?",
      options: [
        'The conduit may become too neat',
        'The assessor will stop watching you',
        'You will use too little cable',
        'Running out of time for critical terminations',
      ],
      correctAnswer: 3,
      explanation:
        'Spending excessive time on details like conduit bends can leave insufficient time for critical tasks like terminations.',
    },
    {
      id: 4,
      question: 'What happens if circuits are left incomplete at the end?',
      options: [
        'Marks lost for incomplete work',
        'You are given extra time to finish',
        'The whole assessment is cancelled',
        'Partial credit is awarded automatically',
      ],
      correctAnswer: 0,
      explanation:
        'Incomplete circuits lose marks automatically. Only completed work can be assessed and credited.',
    },
    {
      id: 5,
      question: 'Name one way to set milestones for installation:',
      options: [
        'Work without checking the clock',
        'Set time targets for each stage',
        'Leave all testing to the last hour',
        'Finish each circuit before starting the next',
      ],
      correctAnswer: 1,
      explanation:
        'Setting time targets for each stage (containment by 11:00, cables by lunch, etc.) helps maintain progress.',
    },
    {
      id: 6,
      question: 'Why should test results be recorded as you go?',
      options: [
        'To impress the other candidates',
        'To reduce the number of tests needed',
        'Prevents rushed paperwork at the end',
        'To allow you to skip the final checks',
      ],
      correctAnswer: 2,
      explanation:
        'Recording results as you progress prevents rushed, incomplete paperwork that can fail the documentation section.',
    },
    {
      id: 7,
      question: "What do assessors expect if you're running behind schedule?",
      options: [
        'That you skip the testing stage',
        'That you rush the remaining circuits',
        'That you ask another candidate for help',
        'Continue working methodically and safely',
      ],
      correctAnswer: 3,
      explanation:
        'Assessors expect continued methodical, safe work. Rushing leads to mistakes and unsafe conditions.',
    },
    {
      id: 8,
      question: 'True or false: You can ask for extra time in AM2.',
      options: ['True', 'False'],
      correctAnswer: 1,
      explanation:
        'False - the AM2 schedule is fixed with no provision for extra time regardless of circumstances.',
    },
    {
      id: 9,
      question: 'Give one example of a time-related mistake candidates make:',
      options: [
        'Checking progress against milestones',
        'Documenting test results as they go',
        'Reading the specification before starting',
        'Perfecting one detail while neglecting others',
      ],
      correctAnswer: 3,
      explanation:
        'Spending excessive time perfecting one detail (like a perfect bend) while leaving insufficient time for other critical tasks.',
    },
    {
      id: 10,
      question: "What's the golden rule of time management in AM2?",
      options: [
        'Finish as fast as possible',
        'Always aim for perfection on every detail',
        'Plan, pace, and deliver methodically',
        'Leave the hardest circuit until last',
      ],
      correctAnswer: 2,
      explanation:
        'Plan your approach, pace yourself appropriately, and deliver professional standards across all work methodically.',
    },
  ];

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/am2/module3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 3
          </button>

          <PageHero
            eyebrow="Module 3 · Section 6"
            title="Managing Time During Installation"
            description="Time management strategies, pacing techniques and scheduling for AM2 assessment success - complete professional installations within strict timeframes."
            tone="yellow"
          />

          <TLDR
            points={[
              'AM2 composite installation runs around 8.5 hours, fixed schedule, no extensions for any reason.',
              'Phase plan: ~2 h marking out + containment, ~2 h cable pulling, ~2.5 h terminations, ~2 h testing + paperwork.',
              'Set milestone times: containment by 11:00, cables by lunch, terminations by 15:00. Check the clock against milestones every hour.',
              "Incomplete but safe beats finished but unsafe — every time. Unsafe = automatic fail. Incomplete = marks lost on what wasn't done.",
              'Document and label as you go. Leaving paperwork to the last 15 minutes is how candidates fail the documentation section despite a passable install.',
            ]}
          />

          <CommonMistake
            title="CRITICAL: Time Management Determines AM2 Success"
            whatHappens="The AM2 composite installation is long (around 8.5 hours) and intense. Time management is critical: you need to pace yourself so you finish all circuits to specification, without rushing and making safety or neatness errors. Many candidates fail not from lack of skill but from incomplete work. Assessors observe whether you can plan, organise, and complete a job on time, just as you'd be expected to do on-site. Rushing causes failures."
            doInstead="Break the day into phases with milestone checkpoints, document as you go, and never compromise safety to chase a deadline."
          />

          <LearningOutcomes outcomes={learningOutcomes} />

          <ConceptBlock title="1. Why Time Management Matters in AM2">
            <p>
              <strong>Critical Impact on Assessment Outcome:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Installation section heavily weighted in marking.</strong> The practical
                installation carries the highest mark allocation - incomplete work severely impacts
                overall score.
              </li>
              <li>
                <strong>Many candidates fail from incomplete work, not lack of skill.</strong>{' '}
                Technical competence is often present, but poor time management prevents completion.
              </li>
              <li>
                <strong>Rushing causes multiple failure points.</strong> Untidy workmanship, missed
                terminations, unsafe energisation - all lose marks or cause failure.
              </li>
            </ul>
            <p>
              <strong className="text-elec-yellow">Real-World Professional Expectations:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Job completion within deadlines</strong> - Essential professional skill
              </li>
              <li>
                <strong>Quality maintained under pressure</strong> - Client expectations don't
                change
              </li>
              <li>
                <strong>Safety never compromised for speed</strong> - Legal and ethical requirements
              </li>
              <li>
                <strong>Systematic approach to complex tasks</strong> - Professional competence
                demonstration
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

          <ConceptBlock title="2. Typical Time Allocation Guidance">
            <p>
              <strong>Recommended Phase Breakdown (8.5 hour total)</strong>
            </p>
            <p>
              <strong>Phase 1: Marking Out & Containment (~2 hours):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Reading specifications and drawings thoroughly</li>
              <li>Marking out all accessory positions accurately</li>
              <li>Installing trunking, conduit, and containment systems</li>
              <li>Ensuring all measurements match specification exactly</li>
            </ul>
            <p>
              <strong>Phase 2: Cable Pulling & Dressing (~2 hours):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Running all cables through containment systems</li>
              <li>Proper cable identification and labelling</li>
              <li>Cable dressing and support installation</li>
              <li>Initial cable preparation at termination points</li>
            </ul>
            <p>
              <strong>Phase 3: Terminations & Connections (~2.5 hours):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>All accessory terminations and connections</li>
              <li>Distribution board wiring and labelling</li>
              <li>CPC sleeving and conductor identification</li>
              <li>Final connection verification and checking</li>
            </ul>
            <p>
              <strong>Phase 4: Testing & Documentation (~2 hours):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Complete electrical testing sequence</li>
              <li>Recording all test results accurately</li>
              <li>Final safety checks and verification</li>
              <li>Paperwork completion for handover</li>
            </ul>
            <p>
              <strong className="text-elec-yellow">Important Time Management Notes:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Times vary between candidates - use as guidance only</li>
              <li>Must pace yourself to cover all essential tasks</li>
              <li>Allow buffer time for unexpected complications</li>
              <li>Quality standards must be maintained regardless of time pressure</li>
              <li>Regular progress checks against planned milestones essential</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="3. Common Time-Related Mistakes">
            <p>
              <strong>Critical Time Management Errors:</strong>
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Perfectionism on containment details.</strong> Spending too long making
                perfect bends in conduit/trunking, then running out of time for critical
                terminations.
              </li>
              <li>
                <strong>End-phase rushing syndrome.</strong> Rushing final stages leads to untidy DB
                wiring, missed CPC sleeving, exposed copper - causing failures.
              </li>
              <li>
                <strong>Delayed documentation approach.</strong> Not recording test results during
                installation, leading to rushed and incomplete paperwork.
              </li>
              <li>
                <strong>Single-problem fixation.</strong> Over-focusing on one tricky bend or fault
                instead of moving on and maintaining overall progress.
              </li>
              <li>
                <strong>No milestone monitoring.</strong> Working without time checkpoints, only
                realising time pressure when it's too late to recover.
              </li>
            </ol>
            <p>
              <strong className="text-elec-yellow">Real Assessment Consequences:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Incomplete circuits:</strong> Automatic mark loss for unfinished work, often
                below pass threshold
              </li>
              <li>
                <strong>Rushed terminations:</strong> Safety failures from exposed copper or loose
                connections
              </li>
              <li>
                <strong>Poor documentation:</strong> Incomplete test sheets fail the paperwork
                section entirely
              </li>
              <li>
                <strong>Stress-induced errors:</strong> Time pressure causes basic mistakes in
                normally competent areas
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="4. Assessor Expectations on Time Management">
            <p>
              <strong>Professional Working Standards Expected:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Steady, methodical work pace.</strong> Assessors expect consistent
                professional pace, not rushed panic or excessive slowness.
              </li>
              <li>
                <strong>Understanding of nervous impact.</strong> Assessors know nerves slow
                candidates down, but major incomplete sections still lose marks.
              </li>
              <li>
                <strong>Completion within timeframe.</strong> Time runs out = assessment stops. Only
                completed work can be marked and credited.
              </li>
              <li>
                <strong>Safety priority maintained.</strong> No compromise on safety standards
                acceptable, regardless of time pressure.
              </li>
            </ul>
            <p>
              <strong className="text-elec-yellow">Assessment Reality Check:</strong>
            </p>
            <p>
              <strong>Fixed Schedule:</strong> No extensions available regardless of circumstances
              or reasons.
            </p>
            <p>
              <strong>Completion Requirement:</strong> Unfinished work cannot be assessed or
              credited towards pass mark.
            </p>
            <p>
              <strong>Quality Expectations:</strong> Professional standards must be maintained
              despite time constraints.
            </p>
            <p>
              <strong>Real-World Simulation:</strong> Mirrors actual job site expectations for
              deadline management.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={quickCheckQuestions[1].id}
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          <ConceptBlock title="5. Practical Strategies for Time Management">
            <p>
              <strong>Pre-Installation Planning Phase:</strong>
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Detailed specification review (15-20 minutes).</strong> Read specifications
                thoroughly, mark key requirements, identify potential challenges before starting.
              </li>
              <li>
                <strong>Position marking and layout planning.</strong> Mark all accessory positions
                accurately, plan cable routes, visualise installation sequence.
              </li>
              <li>
                <strong>Work sequence optimisation.</strong> Plan logical progression through
                phases, identify dependencies, prepare for efficient workflow.
              </li>
            </ol>
            <p>
              <strong>During Installation Strategies:</strong>
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70" start={4}>
              <li>
                <strong>Milestone-based progress monitoring.</strong> Set specific time targets
                (containment complete by 11:00, cables pulled by lunch, terminations by 3:00).
              </li>
              <li>
                <strong>Professional standard focus.</strong> Work to consistent professional
                standard across all areas rather than seeking perfection in one area.
              </li>
              <li>
                <strong>Continuous documentation approach.</strong> Record test results and complete
                labels circuit by circuit, not all at the end.
              </li>
              <li>
                <strong>Quality verification checkpoints.</strong> 30-second recheck saves 30-minute
                rework - verify before moving to next phase.
              </li>
              <li>
                <strong>Stress management techniques.</strong> Stay calm under pressure - nervous
                candidates rush and make mistakes, breathe and work methodically.
              </li>
            </ol>
            <p>
              <strong className="text-elec-yellow">Time Recovery Strategies:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Identify non-critical refinements</strong> - Focus on essential requirements
                first
              </li>
              <li>
                <strong>Prioritise safety-critical tasks</strong> - Never compromise on electrical
                safety
              </li>
              <li>
                <strong>Streamline processes</strong> - Eliminate unnecessary steps while
                maintaining quality
              </li>
              <li>
                <strong>Maintain professional standards</strong> - Better to complete less work
                safely than rush dangerously
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

          <ConceptBlock title="6. Real-World Examples and Case Studies">
            <p>
              <strong className="text-elec-yellow">
                Failure Example 1: Perfectionist Approach.
              </strong>
            </p>
            <p>
              <strong>Scenario:</strong> Candidate spent 90 minutes perfecting a conduit bend,
              pursuing absolute perfection.
            </p>
            <p>
              <strong>Consequence:</strong> Ran out of time, left cooker circuit completely
              un-terminated.
            </p>
            <p>
              <strong>Result:</strong> Failed section - incomplete critical circuit despite perfect
              containment.
            </p>
            <p>
              <strong className="text-elec-yellow">Failure Example 2: Documentation Delay.</strong>
            </p>
            <p>
              <strong>Scenario:</strong> Candidate completed installation but left only 5 minutes
              for paperwork.
            </p>
            <p>
              <strong>Consequence:</strong> Test sheets rushed, incomplete, several results missing.
            </p>
            <p>
              <strong>Result:</strong> Failed paperwork section despite good practical work.
            </p>
            <p>
              <strong className="text-elec-yellow">Success Example: Planned Approach.</strong>
            </p>
            <p>
              <strong>Scenario:</strong> Candidate set personal time targets, monitored progress,
              stayed calm throughout.
            </p>
            <p>
              <strong>Execution:</strong> Completed all circuits neatly, documented as progress was
              made.
            </p>
            <p>
              <strong>Result:</strong> Passed first attempt with high marks across all sections.
            </p>
            <p>
              <strong className="text-elec-yellow">
                Real-World Professional Parallel — Industry Example: Contract Deadline Management.
              </strong>{' '}
              A contractor missed a crucial project deadline because they spent excessive time
              reworking one cable run to absolute perfection.
            </p>
            <p>
              <strong>Consequence:</strong> Client rejected the entire job due to delayed
              completion, despite excellent quality work.
            </p>
            <p>
              <strong>Lesson:</strong> Professional standards must be balanced with practical
              deadline management - same principle applies in AM2.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Section Summary - Time Management Mastery">
            <p>
              <strong className="text-elec-yellow">Golden Rule of AM2 Time Management:</strong>{' '}
              "Plan, pace, and deliver methodically. Incomplete but safe is better than unsafe.
              Professional standards maintained throughout." Time management in AM2 is about working
              methodically, safely, and steadily to complete the whole installation within
              professional standards.
            </p>
            <p>
              <strong className="text-elec-yellow">What Assessors Want to See:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Planned, organised approach</strong> - Evidence of systematic working
                methods
              </li>
              <li>
                <strong>Professional standard across all circuits</strong> - Consistent quality
                throughout
              </li>
              <li>
                <strong>Safety and neatness prioritised over speed</strong> - No compromises on
                standards
              </li>
              <li>
                <strong>Circuits finished, tested, and documented</strong> - Complete professional
                handover
              </li>
            </ul>
            <p>
              <strong className="text-elec-yellow">Essential Success Strategies:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Break installation into clear phases with time targets</li>
              <li>Monitor progress regularly against planned milestones</li>
              <li>Maintain professional standards under time pressure</li>
              <li>Document and label as you progress, not at the end</li>
              <li>Remember: professional competence includes deadline management</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 134.1.4"
            clause={
              <>
                "Every electrical joint and connection shall be of proper construction as regards
                conductance, insulation, mechanical strength and protection."
              </>
            }
            meaning={
              <>
                Time pressure is no defence against this clause. The assessor isn't going to forgive
                a loose terminal or a missed CPC sleeve because you had ten minutes left. Build your
                time plan around hitting Reg 134.1.4 across every joint — that means budgeting
                enough time at the end for proper terminations, not rushing them.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 134.1.4."
          />

          <Scenario
            title="It's 15:30 and you've got a cooker circuit untouched and paperwork to do"
            situation={
              <>
                Hard deadline is 17:00. You've completed the ring, two radials, lighting and the
                motor circuit — all tested. The cooker circuit is wired but not terminated at the
                outlet plate, the cooker control switch isn't fitted, and your test schedule is
                blank for three circuits. Other candidates around you look done.
              </>
            }
            whatToDo={
              <>
                Triage: paperwork first. Sit down and fill in test results for the four completed
                circuits (you've got the readings — they're in your meter or your notes). 25
                minutes. Then attack the cooker: terminate at the outlet plate, fit the control
                switch, run continuity + IR + polarity. 50 minutes. Last 15 minutes: final visual,
                lid check, label check. You've completed five circuits cleanly with paperwork done —
                better than six circuits with a blank test schedule.
              </>
            }
            whyItMatters={
              <>
                Assessors mark only completed work. A circuit installed but un-terminated and
                untested is worth almost nothing on the mark sheet — you've used the time without
                banking the marks. Paperwork sits behind a different mark cap that's easy to fail if
                you leave it. "Less work, finished and tested" beats "more work, half done" every
                time.
              </>
            }
          />

          <FAQ
            items={[
              {
                question: 'How strict is the AM2 cut-off — is there any leeway at all?',
                answer:
                  "None. The schedule is fixed and applies to everyone equally. When the timer hits zero, tools down — the assessor records what you've completed and what you haven't. Personal circumstances, equipment trouble, a difficult rig setup — none of these earn extensions. Plan as if there's a hard wall at the end of each phase.",
              },
              {
                question: "What's a realistic milestone schedule for an 8.5-hour install?",
                answer:
                  "Roughly: marking out and reading the spec by 09:30; containment in by 11:00; cables pulled by 12:30 (lunch); accessories terminated by 14:30; DB completed by 15:30; testing + paperwork from 15:30 to 17:00. These are guidelines — adapt to your speed — but check progress against milestones every hour. If you're 30 minutes behind by lunch, you're going to be 90 minutes behind by 17:00 unless you change something.",
              },
              {
                question: 'Should I do all the paperwork at the end or as I go?',
                answer:
                  'As you go. Record test readings circuit by circuit — continuity, IR, polarity, Zs — into your test schedule the moment you take them. The schedule of inspections you can fill in section by section as the install progresses. Trying to do all the paperwork in the last hour is how candidates fail the documentation section despite a clean install.',
              },
              {
                question: "I'm a perfectionist — that's a strength, right?",
                answer:
                  'On AM2, only when balanced. Spending 90 minutes perfecting one conduit bend while a circuit is left un-terminated is a documented failure pattern. Aim for consistent professional standard across the whole install, not perfection in one spot. The mark scheme rewards completion of the spec to a workmanlike standard — not heroic detail in one corner.',
              },
              {
                question:
                  'What if I make a mistake and have to redo something — does the clock pause?',
                answer:
                  "No. Redo time comes out of your overall budget. Build buffer into your plan for it — assume you'll lose 30–45 minutes to mistakes, retests, or running back to the bench for a forgotten tool. If you don't lose it, you've got bonus paperwork time. If you do lose it, you've already absorbed it.",
              },
              {
                question:
                  "I'm running behind and stressed — what's the priority order if I have to cut something?",
                answer:
                  'Safety first, then completion, then neatness. Never cut: testing before energising, CPC sleeving, sheath into accessories, polarity at the DB. Can be deprioritised if absolutely necessary: aesthetic perfection on containment lids, label print quality (write neatly with permanent marker if you must), final cable dressing in the DB beyond "functional and safe". Don\'t cut tests. Ever.',
              },
            ]}
          />

          <KeyTakeaways
            points={[
              'AM2 install is around 8.5 hours, fixed deadline, no extensions. Plan accordingly.',
              'Phase: marking out + containment (~2 h), cables (~2 h), terminations (~2.5 h), testing + paperwork (~2 h).',
              'Set hourly milestones and check against the clock — falling 30 minutes behind by lunch usually means 90 minutes behind by 17:00.',
              'Document and label as you go. Test readings into the schedule the moment you take them, not at the end.',
              "Reg 134.1.4 doesn't bend for time pressure — proper construction at every joint, regardless of the clock.",
              "Incomplete but safe is always better than complete but unsafe. Unsafe is automatic fail; incomplete just loses marks on what's missing.",
            ]}
          />

          <ConceptBlock title="Knowledge Check - Time Management Strategies">
            <p className="text-sm text-white mb-6">
              Test your understanding of time management principles and strategies for AM2 success.
              This quiz covers planning, pacing, and professional deadline management.
            </p>

            <Quiz questions={quizQuestions} title="Time Management Assessment" />
          </ConceptBlock>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/am2/module3/section5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Accuracy & Neatness
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/am2/module4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next module <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">Module 4</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default AM2Module3Section6;
