/**
 * Module 1 · Section 3 — Marking criteria and pass/fail thresholds
 * AM2 day-prep — Assessment overview (purpose, structure, marking, common fails)
 * How NET assessors actually mark you: competent vs not yet competent, and where the line sits.
 */

import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  ConceptBlock,
  SectionRule,
  LearningOutcomes,
  TLDR,
  KeyTakeaways,
  FAQ,
  Scenario,
  CommonMistake,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Marking Criteria and Pass/Fail Thresholds | AM2 Module 1.3 | Elec-Mate';
const DESCRIPTION =
  'How NET assessors mark the AM2 — competent vs not yet competent, what counts as a critical fail and where the line really sits.';

const AM2Module1Section3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: 'How is the AM2 assessment marked?',
      options: [
        'Percentage scoring with 80% pass mark',
        'Graded A-F like a university exam',
        'Competent or Not Yet Competent on each criterion',
        'Points-based with weighted sections',
      ],
      correctAnswer: 2,
      explanation:
        'The AM2 uses competence-based assessment. Assessors judge each criterion as Competent or Not Yet Competent using objective Yes/No marking, not percentage scores.',
    },
    {
      id: 2,
      question: 'Which of these would result in an automatic fail?',
      options: [
        'Forgetting to label one circuit',
        'Missing one fault in fault-finding',
        'Unsafe isolation procedure',
        'Taking slightly longer than expected',
      ],
      correctAnswer: 2,
      explanation:
        'Unsafe isolation procedures are a critical fail regardless of performance in other areas.',
    },
    {
      id: 3,
      question:
        'True or false: If you do excellent installation work but fail safe isolation, you can still pass.',
      options: ['True', 'False'],
      correctAnswer: 1,
      explanation:
        'False. Safe isolation is a critical requirement and failure in this area results in automatic fail regardless of other performance.',
    },
    {
      id: 4,
      question: 'In fault diagnosis, how many faults must you normally identify to pass?',
      options: [
        'All 4 faults',
        'At least 3 out of 4 faults',
        'At least 2 out of 4 faults',
        'Only 1 fault',
      ],
      correctAnswer: 1,
      explanation:
        'You typically need to identify at least 3 out of 4 faults to pass the fault diagnosis section.',
    },
    {
      id: 5,
      question: 'Why does the assessor use sampling in marking?',
      options: [
        'To save time during assessment',
        'To check consistency of quality across all work',
        "Because they can't check everything",
        'To make the assessment easier',
      ],
      correctAnswer: 1,
      explanation:
        'Assessors use sampling to verify that quality is consistent throughout your work, so every part must meet standards.',
    },
  ];

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/am2/module1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 1
          </button>

          <PageHero
            eyebrow="Module 1 · Section 3"
            title="Marking Criteria and Pass/Fail Thresholds"
            description="Understanding how the AM2 is marked and what constitutes a pass or fail - your key to assessment success."
            tone="yellow"
          />

          <TLDR
            points={[
              'AM2 is marked Competent / Not Yet Competent on each criterion — there’s no percentage score.',
              'A handful of items are critical fails: unsafe isolation, working live, certificate fraud, dangerous workmanship.',
              'Critical fails override everything else — perfect installation can’t save you from one of these.',
              'Sampling is used: a few sloppy joints in a corner you thought wouldn’t be checked still costs you.',
            ]}
          />

          {/* Key Statistics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <div className="rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06] p-5 text-center">
              <div className="text-ios-title-2 font-bold text-elec-yellow mb-1">Yes/No</div>
              <div className="text-ios-footnote text-white">Competence-based marking</div>
            </div>
            <div className="rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06] p-5 text-center">
              <div className="text-ios-title-2 font-bold text-elec-yellow mb-1">5</div>
              <div className="text-ios-footnote text-white">Main assessment sections</div>
            </div>
            <div className="rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06] p-5 text-center">
              <div className="text-ios-title-2 font-bold text-elec-yellow mb-1">100%</div>
              <div className="text-ios-footnote text-white">Safe isolation requirement</div>
            </div>
            <div className="rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06] p-5 text-center">
              <div className="text-ios-title-2 font-bold text-elec-yellow mb-1">Fixed</div>
              <div className="text-ios-footnote text-white">Standards-based marking</div>
            </div>
          </div>

          <LearningOutcomes
            outcomes={[
              'Explain how the AM2 assessment is marked and what "competence-based" means',
              'Understand the competence-based pass criteria and the importance of meeting standards across all sections',
              'Recognise which mistakes are critical fails (automatic fails)',
              'Evaluate your own work against assessor expectations',
            ]}
          />

          <SectionRule />

          {/* Introduction */}
          <ConceptBlock title="What this section is for">
            <p>
              <strong className="text-elec-yellow">Important Note.</strong> The AM2 is not a
              "college exam" — it is a competence-based final assessment overseen by NET to prove
              you can work independently and safely as an electrician. Unlike written exams, the AM2
              is judged against strict marking criteria and thresholds, with particular focus on
              safety, accuracy, and compliance with BS 7671.
            </p>
            <p>
              Some mistakes will only lose you marks, but others are considered critical fails that
              stop you passing regardless of your score elsewhere. Understanding how the AM2 is
              marked is vital to preparing effectively.
            </p>
          </ConceptBlock>

          <SectionRule />

          {/* Competence-based Marking */}
          <ConceptBlock title="1. Competence-based Marking">
            <p>
              The AM2 is assessed against fixed standards, not relative scores. Your work must be:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Safe</strong> — in line with health and safety and BS 7671
              </li>
              <li>
                <strong>Accurate</strong> — matches drawings and specifications exactly
              </li>
              <li>
                <strong>Workmanlike</strong> — professional standard as per IET definition
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id="competence-check"
            question="What's more important in AM2 - doing the job fast, or doing it safely and according to the specification?"
            options={[
              'Speed is most important',
              'Safety and compliance first',
              'They are equally important',
              'It depends on the task',
            ]}
            correctIndex={1}
            explanation="Safety and compliance must come first. Time matters but rushing leads to failure through mistakes or unsafe practices."
          />

          <SectionRule />

          {/* Pass Threshold */}
          <ConceptBlock title="2. Competence-Based Pass Requirements">
            <p>
              The AM2 uses <strong className="text-elec-yellow">competence-based assessment</strong>{' '}
              - assessors judge each criterion as Competent or Not Yet Competent. There is no
              percentage pass mark. You must demonstrate competence across all sections:
            </p>
            <ul className="space-y-2 list-disc pl-5 marker:text-elec-yellow/70">
              <li>You must demonstrate competence in each main section</li>
              <li>You cannot fail Safe Isolation or completely miss an area and expect to pass</li>
              <li>High scores in one section cannot compensate for critical failures in another</li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id="pass-threshold-check"
            question="If you score 95% overall but fail to carry out Safe Isolation correctly, do you pass?"
            options={[
              'Yes, the overall score is high enough',
              "No, it's a critical fail",
              'Maybe, depending on other sections',
              'Yes, but with conditions',
            ]}
            correctIndex={1}
            explanation="No, unsafe isolation is a critical fail regardless of overall performance. Safety cannot be compromised."
          />

          <SectionRule />

          {/* Critical Fails */}
          <ConceptBlock title="3. Critical Fails (Automatic Failures)">
            <p>
              NET defines certain errors as automatic fails regardless of performance elsewhere:
            </p>
            <p>
              <strong className="text-red-300">Unsafe Isolation Procedure:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-red-300/70">
              <li>Failing to prove dead correctly</li>
              <li>Re-proving tester incorrectly</li>
              <li>Working live without authorisation</li>
            </ul>
            <p>
              <strong className="text-red-300">Unsafe Circuit Conditions:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-red-300/70">
              <li>Leaving circuits in an unsafe condition</li>
              <li>Energising a circuit with a known fault</li>
              <li>Creating dangerous connections</li>
            </ul>
            <p>
              <strong className="text-red-300">Serious Health &amp; Safety Breach:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-red-300/70">
              <li>Major PPE violations</li>
              <li>Dangerous working practices</li>
              <li>Risk to self or others</li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id="critical-fail-check"
            question="Which of these is a critical fail?"
            options={[
              'Forgetting to label a circuit',
              'Leaving a test instrument unproved during isolation',
              'Missing one fault in the fault-finding section',
              'Taking slightly longer than expected',
            ]}
            correctIndex={1}
            explanation="Leaving a test instrument unproved during isolation is unsafe isolation practice - a critical fail that compromises safety."
          />

          <SectionRule />

          {/* Section Expectations */}
          <ConceptBlock title="4. Section-by-Section Expectations">
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Safe Isolation &amp; Risk Assessment</strong> — 100% correct procedure
                required, no margin for error
              </li>
              <li>
                <strong>Composite Installation</strong> — must follow drawings exactly; correct
                cable types, routing, termination, and neatness standards
              </li>
              <li>
                <strong>Inspection, Testing &amp; Certification</strong> — step-by-step GN3
                procedure; accurate test results; correctly completed EIC
              </li>
              <li>
                <strong>Fault Diagnosis</strong> — usually four faults; you must find and diagnose
                most (typically 3/4 minimum)
              </li>
              <li>
                <strong>Theory Test</strong> — around 30 questions; based on BS 7671, building
                regulations, safe working practices
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          {/* Sampling and Neatness */}
          <ConceptBlock title="5. Sampling and Neatness Standards">
            <p>
              Assessors often sample test points rather than checking every connection. This means:
            </p>
            <ul className="space-y-2 list-disc pl-5 marker:text-elec-yellow/70">
              <li>If the sample is poor quality, you lose marks across the board</li>
              <li>Consistency of quality across your work is essential</li>
              <li>You cannot "cut corners" on parts you think won't be checked</li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id="sampling-check"
            question="Why is it risky to 'cut corners' on parts you think the assessor won't check?"
            options={[
              'The assessor always checks everything',
              'They can sample any part, and poor samples lose marks',
              "It's against the rules",
              'Other candidates might notice',
            ]}
            correctIndex={1}
            explanation="Assessors can sample any part of your work. If sampled areas are poor quality, you lose marks even if other areas are good."
          />

          <SectionRule />

          {/* Real-world Examples */}
          <ConceptBlock title="Real-world Examples">
            <p>
              <strong className="text-elec-yellow">Example 1: Isolation Failure.</strong> Candidate
              wired an entire installation correctly but missed one key step in safe isolation
              (didn't re-prove tester). Result: Automatic fail despite otherwise excellent work.
            </p>
            <p>
              <strong className="text-elec-yellow">Example 2: Insufficient Fault Finding.</strong>{' '}
              Candidate completed installation work but only correctly identified 1/4 faults.
              Overall high marks in installation didn't save them — failed due to not meeting
              section threshold.
            </p>
            <p>
              <strong className="text-amber-400">Example 3: Specification Deviation.</strong>{' '}
              Candidate completed installation neatly but didn't follow the drawing (used wrong
              cable size for cooker). Marked down heavily — borderline pass due to accuracy
              requirements.
            </p>
          </ConceptBlock>

          <SectionRule />

          {/* FAQs */}
          <ConceptBlock title="Frequently Asked Questions">
            <div className="space-y-4">
              <div>
                <h4 className="text-ios-headline text-white font-semibold mb-1">
                  Q: If I fail one section but pass others, do I fail the whole AM2?
                </h4>
                <p className="text-ios-callout text-white">
                  A: Yes, unless the section is minor and doesn't fall under NET's critical pass
                  criteria. Safe isolation, for example, is non-negotiable.
                </p>
              </div>
              <div>
                <h4 className="text-ios-headline text-white font-semibold mb-1">
                  Q: How strict are assessors on neatness?
                </h4>
                <p className="text-ios-callout text-white">
                  A: Very strict. NET defines "workmanlike" standards clearly. Cables must be
                  straight, terminated properly, with no insulation damage.
                </p>
              </div>
              <div>
                <h4 className="text-ios-headline text-white font-semibold mb-1">
                  Q: Do I lose marks for asking the assessor a question?
                </h4>
                <p className="text-ios-callout text-white">
                  A: No, but they will not give hints. They can clarify instructions if wording is
                  unclear.
                </p>
              </div>
              <div>
                <h4 className="text-ios-headline text-white font-semibold mb-1">
                  Q: Can I pass if I miss a fault in fault-finding?
                </h4>
                <p className="text-ios-callout text-white">
                  A: Usually yes if you get the majority correct (e.g. 3/4). Missing more than one
                  is risky.
                </p>
              </div>
            </div>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="A clean install with one shaky termination"
            situation={
              <>
                You’ve had a strong day on Section A. Conduit is tidy, accessories square, SWA gland
                is dressed properly. The assessor opens an enclosure in the bottom corner of the rig
                — a CPC you rushed at the end. The conductor is over-stripped and one strand is
                proud of the terminal.
              </>
            }
            whatToDo={
              <>
                If you spot it before the assessor closes the section, fix it cleanly and
                re-terminate. If it’s already been seen, accept the Not Yet Competent on that
                criterion and don’t panic — one criterion isn’t a pass/fail. But a strand of CPC
                outside a terminal could be classed as a workmanship hazard, which is more serious.
                Ask the assessor what they’ve recorded.
              </>
            }
            whyItMatters={
              <>
                Sampling means the assessor looks at a representative slice of your work, not every
                connection. A single sloppy joint can drop a whole criterion if it’s the one they
                pick.
              </>
            }
          />

          <CommonMistake
            title="Chasing speed and ignoring the critical-fail list"
            whatHappens={
              <>
                You’re flying through Section A — fast, neat, on schedule. In the rush you skip
                proving the test lamp before isolating Section C, or you leave the certificate
                signed but missing a Zs reading. Both are critical-fail territory.
              </>
            }
            doInstead={
              <>
                Memorise the critical-fail list before you walk in. Treat each one as a
                non-negotiable checkpoint. Speed is worth nothing if a single critical fail ends the
                whole 2½ days.
              </>
            }
          />

          <FAQ
            items={[
              {
                question: 'How many "Not Yet Competent" marks can I have and still pass?',
                answer:
                  'There’s no fixed number — the marking is holistic. NET expects a generally competent performance. A handful of minor NYCs across different criteria is usually survivable; clusters of NYCs in one area, or anything on the critical-fail list, is not.',
              },
              {
                question: 'What counts as a critical fail?',
                answer:
                  'Unsafe isolation, working live without justification, falsifying certificate readings, leaving exposed live parts, breaching health and safety law, or workmanship that creates an immediate danger. The full list is in your centre’s candidate brief.',
              },
              {
                question:
                  'Can the assessor change a Not Yet Competent into a Competent if I fix the work?',
                answer:
                  'On installation criteria, yes — if you spot and rectify the issue within the section time, the assessor can re-evaluate. On safe isolation and certification, no: critical-fail moments are recorded as they happen.',
              },
              {
                question: 'Does neatness actually matter?',
                answer:
                  'Yes. Workmanship and finish are explicitly assessed criteria. Crooked accessories, untidy conduit runs, untrimmed cable sheaths and missing identification all show up on the mark sheet.',
              },
              {
                question: 'Are all centres marked the same way?',
                answer:
                  'Yes — NET sets the criteria and standardises assessor training. The centre runs the day, but the pass/fail logic is identical across the country.',
              },
              {
                question: 'Will I see my mark sheet?',
                answer:
                  'You get a debrief at the end of each day and a written feedback summary at the end of the assessment. If you fail, the feedback tells you which criteria were NYC so you know what to re-sit.',
              },
            ]}
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Marking is Competent / Not Yet Competent per criterion — no percentages.',
              'Critical fails (unsafe isolation, live working, certificate fraud, dangerous workmanship) override everything else.',
              'Sampling is used — every joint, every termination, every certificate entry must be to standard.',
              'A handful of minor NYCs across different criteria can still pass; clusters in one area cannot.',
              'Workmanship and finish are explicitly assessed — neatness scores marks.',
              'You can sometimes recover an installation NYC by fixing it within the section. You cannot recover a critical fail.',
              'Centres are standardised — the marking is the same wherever you sit.',
              'Read your debrief carefully if you fail; it tells you exactly what to re-sit.',
            ]}
          />

          {/* Quiz Section */}
          <Quiz questions={quizQuestions} title="AM2 Marking Criteria Quiz" />

          {/* Navigation Footer */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/am2/module1/section2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Assessment Structure
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/am2/module1/section4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Common Reasons for Failure
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default AM2Module1Section3;
