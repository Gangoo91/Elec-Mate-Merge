/**
 * Module 1 · Section 4 — Common reasons for failure
 * AM2 day-prep — Assessment overview (purpose, structure, marking, common fails)
 * The recurring reasons candidates trip on the AM2 — and the habits that stop you joining them.
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
  RegsCallout,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Common Reasons for AM2 Failure | AM2 Module 1.4 | Elec-Mate';
const DESCRIPTION =
  'The patterns that fail candidates on the AM2 — safe isolation slips, paperwork gaps, time mismanagement — and how to dodge each one.';

const AM2Module1Section4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What's the most common single reason for AM2 failure?",
      options: [
        'Poor workmanship',
        'Safe isolation errors',
        'Time management issues',
        'Wrong cable selection',
      ],
      correctAnswer: 1,
      explanation:
        'Safe isolation errors are highlighted by NET as the single biggest cause of AM2 failure.',
    },
    {
      id: 2,
      question: "What's the final step in safe isolation?",
      options: [
        'Lock off the circuit',
        'Attach warning notices',
        'Re-prove your tester',
        'Test the isolated circuit',
      ],
      correctAnswer: 2,
      explanation:
        'Re-proving your tester after isolation confirms it still works and completes the safe isolation procedure.',
    },
    {
      id: 3,
      question:
        "True or false: If your installation works but doesn't match the drawing, you still pass.",
      options: ['True', 'False'],
      correctAnswer: 1,
      explanation:
        'False. Deviations from specifications lose marks even if the circuit functions correctly.',
    },
    {
      id: 4,
      question: 'Which IET document defines the testing sequence used in AM2?',
      options: [
        'BS 7671 Wiring Regulations',
        'GN3 Guidance Note 3',
        'GN1 Guidance Note 1',
        'IET Code of Practice',
      ],
      correctAnswer: 1,
      explanation:
        'IET Guidance Note 3 (GN3) sets out the correct testing sequence used in the AM2 assessment.',
    },
    {
      id: 5,
      question: 'In fault diagnosis, what three things must you identify for each fault?',
      options: [
        'Location, type, and rectification method',
        'Circuit, voltage, and current',
        'Cause, effect, and prevention',
        'Test, measure, and record',
      ],
      correctAnswer: 0,
      explanation:
        'You must identify the precise location, type of fault, and how to rectify it for full marks.',
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
            eyebrow="Module 1 · Section 4"
            title="Common Reasons for Failure"
            description="Learn from others' mistakes - understanding why candidates fail helps you avoid the same traps."
            tone="yellow"
          />

          <TLDR
            points={[
              'Safe isolation errors are NET’s number one cause of AM2 failure — every time.',
              'Drifting from the specification, even where the circuit works, loses you marks.',
              'Testing in the wrong sequence (or skipping a test) is one of the most common Section B fails.',
              'Time management failures and untidy workmanship account for most of the rest.',
            ]}
          />

          {/* Key Statistics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <div className="rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06] p-5 text-center">
              <div className="text-ios-title-2 font-bold text-elec-yellow mb-1">#1</div>
              <div className="text-ios-footnote text-white">Safe isolation errors</div>
            </div>
            <div className="rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06] p-5 text-center">
              <div className="text-ios-title-2 font-bold text-elec-yellow mb-1">7</div>
              <div className="text-ios-footnote text-white">Main failure categories</div>
            </div>
            <div className="rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06] p-5 text-center">
              <div className="text-ios-title-2 font-bold text-elec-yellow mb-1">100%</div>
              <div className="text-ios-footnote text-white">Avoidable failures</div>
            </div>
            <div className="rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06] p-5 text-center">
              <div className="text-ios-title-2 font-bold text-elec-yellow mb-1">NET</div>
              <div className="text-ios-footnote text-white">Publishes error data</div>
            </div>
          </div>

          <LearningOutcomes
            outcomes={[
              'Identify the main reasons candidates fail the AM2',
              'Recognise which errors are safety-critical and lead to automatic fails',
              'Apply strategies to avoid falling into common traps',
              "Self-check your readiness using NET's published common error guidance",
            ]}
          />

          <SectionRule />

          {/* Introduction */}
          <ConceptBlock title="What this section is for">
            <p>
              <strong className="text-amber-400">Important Reality.</strong> Every year, candidates
              fail the AM2 for the same reasons. NET publishes "Common Errors" in its Pre-Assessment
              Manual, and training centres confirm the same patterns. These aren't just minor
              mistakes — they are avoidable errors that can cost you marks, time, and even result in
              an automatic fail.
            </p>
            <p>
              This section gives you a clear view of the top reasons candidates fail, why they
              happen, and how to avoid them. Learning from others' mistakes is one of the most
              effective ways to ensure your own success.
            </p>
          </ConceptBlock>

          <SectionRule />

          {/* 1. Safe Isolation Mistakes */}
          <ConceptBlock title="1. Safe Isolation Mistakes (The #1 Fail Point)">
            <p>
              <strong className="text-red-300">Critical.</strong> NET highlights safe isolation
              errors as the single biggest cause of failure. These are critical safety issues that
              result in automatic fails.
            </p>
            <p>
              <strong>Common Isolation Errors:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Not proving test equipment before and after use</li>
              <li>Missing the full 10-point test sequence</li>
              <li>Isolating the wrong circuit</li>
              <li>Not fitting warning notices or securing keys</li>
            </ul>
            <p>
              <strong>Why These Happen:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Nervousness causing procedural lapses</li>
              <li>Over-confidence skipping steps</li>
              <li>Poor practice habits from training</li>
              <li>Misunderstanding GS38 requirements</li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id="isolation-final-step"
            question="What's the final step in safe isolation before starting work?"
            options={[
              'Lock off the circuit breaker',
              'Attach warning notice',
              'Re-prove your tester to confirm it still works',
              'Test the circuit is dead',
            ]}
            correctIndex={2}
            explanation="Re-proving your tester confirms it still works after proving dead, completing the safe isolation procedure."
          />

          <SectionRule />

          {/* 2. Specification Failures */}
          <ConceptBlock title="2. Not Following the Specification">
            <p>
              Even small deviations from the specification can cost significant marks. Assessors
              check installations against drawings precisely:
            </p>
            <p>
              <strong className="text-amber-400">Common Spec Errors:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-amber-400/70">
              <li>Using wrong cable size or type</li>
              <li>Installing accessories at wrong heights</li>
              <li>Poor identification of conductors</li>
              <li>Incorrect cable routing methods</li>
            </ul>
            <p>
              <strong className="text-green-400">Prevention Strategies:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-green-400/70">
              <li>Read drawings carefully before starting</li>
              <li>Double-check cable schedules</li>
              <li>Measure and mark positions accurately</li>
              <li>Follow routing exactly as shown</li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id="specification-deviation"
            question="If the drawing shows sockets at 300mm height and you install them at 400mm, will you lose marks?"
            options={[
              'No, if they still work properly',
              'Yes, deviations from spec lose marks even if the circuit works',
              'Only if the assessor notices',
              'No, close enough is acceptable',
            ]}
            correctIndex={1}
            explanation="Yes - deviations from specifications lose marks even if the circuit works. Precision is essential in following drawings."
          />

          <SectionRule />

          {/* 3. Testing & Certification Errors */}
          <ConceptBlock title="3. Inspection, Testing & Certification Errors">
            <p>
              NET emphasises mistakes in this area as a major failure cause. Testing must follow
              exact procedures.
            </p>
            <p>
              <strong className="text-elec-yellow">Procedural Errors:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Incorrect instrument setup or range selection</li>
              <li>Skipping stages in the GN3 sequence</li>
              <li>Wrong test lead connections</li>
            </ul>
            <p>
              <strong className="text-elec-yellow">Recording Errors:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Recording results inaccurately</li>
              <li>Writing "book answers" instead of measured values</li>
              <li>Completing certificates incorrectly</li>
            </ul>
            <p>
              <strong className="text-green-400">How to Avoid Testing Failures:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-green-400/70">
              <li>Memorise the GN3 testing sequence completely</li>
              <li>Practice with the exact instruments you'll use</li>
              <li>Always record actual measured values</li>
              <li>Double-check certificate entries for accuracy</li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id="testing-sequence"
            question="Which document sets out the correct test sequence for AM2?"
            options={[
              'BS 7671 Wiring Regulations',
              'IET Guidance Note 3 (GN3)',
              'NET Assessment Manual',
              'City & Guilds Guidelines',
            ]}
            correctIndex={1}
            explanation="IET Guidance Note 3 (GN3) provides the step-by-step testing sequence that must be followed in the AM2."
          />

          <SectionRule />

          {/* 4. Fault Diagnosis Mistakes */}
          <ConceptBlock title="4. Fault Diagnosis Mistakes">
            <p>
              Fault finding requires precision in identification and clear explanation of
              rectification methods:
            </p>
            <p>
              <strong className="text-elec-yellow">Common Fault-Finding Errors:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Vague fault location (e.g., "lighting circuit" instead of precise terminal)</li>
              <li>Misstating the fault type</li>
              <li>Not stating rectification steps clearly</li>
              <li>Skipping safe isolation before working on faulted circuit</li>
            </ul>
            <p>
              <strong className="text-green-400">Successful Fault Diagnosis:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-green-400/70">
              <li>Precise location identification</li>
              <li>Accurate fault type classification</li>
              <li>Clear rectification methodology</li>
              <li>Verification of repair effectiveness</li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id="fault-diagnosis-requirements"
            question="If you identify a fault but don't explain how to rectify it, do you get full marks?"
            options={[
              'Yes, finding the fault is enough',
              'No, rectification method is part of the mark',
              'Only if you find all other faults',
              'Yes, if the location is precise',
            ]}
            correctIndex={1}
            explanation="No - you must identify the location, type, and rectification method for each fault to achieve full marks."
          />

          <SectionRule />

          {/* 5. Health & Safety Breaches */}
          <ConceptBlock title="5. Health & Safety Breaches">
            <p>
              Safety violations can result in automatic failure regardless of technical competence:
            </p>
            <p>
              <strong className="text-elec-yellow">Critical Safety Errors:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Poor or incomplete risk assessment</li>
              <li>Unsafe use of tools and equipment</li>
              <li>Not wearing required PPE</li>
              <li>Leaving work area untidy or unsafe</li>
            </ul>
            <p>
              <strong className="text-green-400">Safety Best Practices:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-green-400/70">
              <li>Complete thorough risk assessments</li>
              <li>Maintain PPE discipline throughout</li>
              <li>Keep work areas clean and organised</li>
              <li>Be aware of hazards to others</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          {/* 6. Time Management Failures */}
          <ConceptBlock title="6. Time Management Failures">
            <p>
              Poor time management leads to rushed work, incomplete sections, or unsafe practices:
            </p>
            <p>
              <strong className="text-elec-yellow">Time Traps:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Rushing the composite installation</li>
              <li>Spending too long on one fault</li>
              <li>Leaving work incomplete</li>
            </ul>
            <p>
              <strong className="text-amber-400">Warning Signs:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-amber-400/70">
              <li>Skipping safety checks</li>
              <li>Making careless mistakes</li>
              <li>Incomplete testing</li>
            </ul>
            <p>
              <strong className="text-green-400">Solutions:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-green-400/70">
              <li>Plan time allocation carefully</li>
              <li>Practice under pressure</li>
              <li>Never sacrifice safety for speed</li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id="time-pressure-choice"
            question="If you're short of time, is it better to leave a section incomplete but safe, or rush it and risk unsafe work?"
            options={[
              'Rush it to complete everything',
              'Leave safe - unsafe work can cause failure',
              'Ask for extra time',
              'Skip to the next section',
            ]}
            correctIndex={1}
            explanation="Always prioritise safety. Leaving work incomplete but safe is better than rushing and creating unsafe conditions that could result in automatic failure."
          />

          <SectionRule />

          {/* 7. Workmanship Issues */}
          <ConceptBlock title="7. Neatness and Workmanship Issues">
            <p>
              Professional workmanship is assessed throughout the AM2. Poor standards can
              significantly impact your score:
            </p>
            <p>
              <strong className="text-elec-yellow">Poor Workmanship Examples:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Over-stripped conductors with damaged insulation</li>
              <li>Untidy trunking or conduit runs</li>
              <li>Loose or poorly made terminations</li>
              <li>Inconsistent quality across the installation</li>
            </ul>
            <p>
              <strong className="text-green-400">Professional Standards:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-green-400/70">
              <li>Consistent cable runs and spacing</li>
              <li>Proper conductor preparation</li>
              <li>Secure, properly torqued terminations</li>
              <li>Attention to detail throughout</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          {/* Real-world Failure Examples */}
          <ConceptBlock title="Real-world Failure Examples">
            <p>
              <strong className="text-elec-yellow">Candidate A: Safe Isolation Fail.</strong>{' '}
              Installed circuits correctly and completed all sections well, but failed to re-prove
              the tester during safe isolation. Result: Automatic fail despite otherwise competent
              performance.
            </p>
            <p>
              <strong className="text-elec-yellow">Candidate B: Specification Deviation.</strong>{' '}
              Completed installation neatly and safely but used 2.5mm cable where 4mm was specified
              on the drawing. Lost significant marks for not following specifications exactly.
            </p>
            <p>
              <strong className="text-elec-yellow">Candidate C: Testing Procedure Error.</strong>{' '}
              Rushed through testing section and wrote down "perfect" textbook values instead of
              actual measurements. Assessor identified inconsistencies — marked as procedural fail.
            </p>
          </ConceptBlock>

          <SectionRule />

          {/* Summary */}
          <ConceptBlock title="Summary">
            <p>
              Candidates fail AM2 mainly due to seven key areas: unsafe isolation, not following
              specifications, incorrect testing and certification, poor fault diagnosis, health
              &amp; safety breaches, time management issues, and workmanship below professional
              standards.
            </p>
            <p>
              <strong className="text-elec-yellow">Key Takeaway.</strong> Avoiding these errors
              isn't about luck — it's about strict practice, sticking to procedures, and working to
              professional standards every time. Learn from others' mistakes to ensure your own
              success.
            </p>
          </ConceptBlock>

          <SectionRule />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 132.15.201"
            clause="Effective means, suitably placed for ready operation, shall be provided so that all voltage may be cut off from every installation, from every circuit thereof and from all equipment, as may be necessary to prevent or remove danger."
            meaning={
              <>
                This is the rule behind every isolation step in AM2. The means must exist, must be
                accessible, and must isolate <em>all</em> voltage. If your Section C isolation
                doesn’t cut every live conductor, or you can’t reach the means in a hurry, that’s
                the regulation you’ve breached — and it’s a critical fail.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 132.15.201."
          />

          <Scenario
            title="The lamp test you didn’t do twice"
            situation={
              <>
                You’re into Section C. You’ve clipped the proving unit, isolated the circuit, locked
                off the breaker and posted the warning notice. You touch your two-pole tester to the
                terminals and read zero volts. You crack on with the work.
              </>
            }
            whatToDo={
              <>
                Stop. Re-prove the tester on the proving unit (or a known live source){' '}
                <em>after</em>
                the dead test. If the tester has failed silently between the first prove and the
                dead test, you’ve just declared a live circuit dead. The full sequence is: prove on
                live → test the circuit dead → re-prove on live.
              </>
            }
            whyItMatters={
              <>
                Skipping the second prove is the single most common AM2 failure NET reports.
                Assessors will not give it back to you — re-proving is the procedure, not optional.
              </>
            }
          />

          <CommonMistake
            title="Treating the drawing as a suggestion"
            whatHappens={
              <>
                You decide a different cable route looks neater. The circuit works fine, all tests
                pass — but you’ve deviated from the spec. The assessor marks it as a deviation, and
                you lose the criterion regardless of whether your version was technically valid.
              </>
            }
            doInstead={
              <>
                Follow the drawing exactly. If you genuinely think it can’t be done as drawn, ask
                the assessor before you cut a single piece of cable. They will either confirm the
                spec or note an agreed deviation in writing.
              </>
            }
          />

          <FAQ
            items={[
              {
                question: 'What single mistake fails the most candidates?',
                answer:
                  'NET’s figures put incorrect or incomplete safe isolation at the top — usually missing the second prove of the tester, or isolating without locking off.',
              },
              {
                question: 'Can I appeal a fail?',
                answer:
                  'Yes — there’s a NET appeal process if you believe the marking was unfair. You’ll need specific grounds (assessor error, equipment fault, procedural breach by the centre). General "I disagree with the result" appeals don’t succeed.',
              },
              {
                question: 'Is fault diagnosis really that hard?',
                answer:
                  'It’s not hard if you work it logically — visual inspection, then continuity, then IR, then live tests. Most fault-diagnosis fails are candidates jumping to live tests before they’ve eliminated dead faults.',
              },
              {
                question: 'How strict are the time limits really?',
                answer:
                  'Strict. When the section clock stops, work stops — even if you’re mid-termination. Anything unfinished is marked as it stands. Practise to time before you sit the assessment.',
              },
              {
                question: 'Will sloppy paperwork actually fail me?',
                answer:
                  'It can. A certificate with missing readings, wrong tick-boxes or unsigned declarations is a Not Yet Competent on certification. Falsifying readings is a critical fail.',
              },
              {
                question: 'What’s the best way to prep for fault diagnosis?',
                answer:
                  'Build a mental flowchart: visual → continuity → IR → polarity → energise → live tests. Practise on a college rig with deliberately introduced faults until the sequence is automatic.',
              },
            ]}
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Safe isolation errors are the most common single cause of AM2 failure.',
              'The full safe-isolation sequence ends with re-proving the tester — never skip it.',
              'Follow the spec and drawings exactly. Functional but non-spec work still loses marks.',
              'Test in the GN3 sequence: continuity → IR → polarity → Zs → RCD. Out of order = NYC.',
              'Time runs out when the section clock stops — practise to time, not to perfection.',
              'Fault diagnosis is logic, not luck. Work the dead checks before you energise.',
              'Paperwork counts: blank readings, missing ticks and unsigned declarations all cost you.',
              'Health and safety breaches and live working are critical fails — game over, regardless of installation quality.',
            ]}
          />

          {/* Quiz Section */}
          <Quiz questions={quizQuestions} title="AM2 Common Failures Quiz" />

          {/* Navigation Footer */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/am2/module1/section3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Marking Criteria
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/am2/module2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Module 2: Health & Safety
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default AM2Module1Section4;
