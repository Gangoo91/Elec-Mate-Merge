/**
 * Module 2 · Section 5 — Avoiding critical safety errors
 * AM2 day-prep — AM2 Phase A (H&S, safe isolation, RAMS, paperwork)
 * The instant-fail behaviours: re-energising faulted circuits, working live, ignoring lock-off — and how to design them out.
 */

import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';
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

const TITLE = 'Avoiding Critical Safety Errors | AM2 Module 2.5 | Elec-Mate';
const DESCRIPTION =
  'The instant-fail behaviours on the AM2 — re-energising faulted circuits, working live, ignoring lock-off — and how to design them out.';

const AM2Module2Section5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  const quickCheckQuestions = [
    {
      id: 'critical-safety-error',
      question: 'Which of these is a critical safety error?',
      options: [
        'Forgetting to label a circuit',
        'Re-energising a faulted circuit',
        'Writing down wrong units on a test sheet',
        'Using the wrong cable size',
      ],
      correctIndex: 1,
      explanation:
        'Re-energising a faulted circuit is a critical safety error that results in instant failure as it could cause injury or death.',
    },
    {
      id: 'tester-prove',
      question:
        "What's wrong with testing a circuit immediately after switching off, without proving your tester?",
      options: [
        'It takes too long',
        "It's not professional",
        "You don't know if your tester works - unsafe isolation",
        'It uses too much battery',
      ],
      correctIndex: 2,
      explanation:
        "Without proving your tester works, you can't be sure if the circuit is actually dead - this is unsafe isolation.",
    },
    {
      id: 'isolation-golden-rule',
      question: "What's the golden rule for AM2 safety errors?",
      options: [
        'Always work fast to save time',
        "If it's unsafe in the real world, it's an instant fail in AM2",
        "Paperwork mistakes don't matter",
        'You can fix mistakes as you go',
      ],
      correctIndex: 1,
      explanation:
        "The golden rule: if it's unsafe in the real world, it's an instant fail in AM2. NET assesses real-world competency.",
    },
    {
      id: 'lock-off-device',
      question: 'True or false: Using tape instead of a lock-off device is acceptable in AM2?',
      options: [
        'True - tape is quicker',
        'False - lock-off devices are mandatory for safe isolation',
        "True - as long as it's clearly marked",
        'False - but only loses minor marks',
      ],
      correctIndex: 1,
      explanation:
        'False - using tape instead of a proper lock-off device is a critical safety error resulting in instant failure.',
    },
    {
      id: 'second-chances',
      question: 'Do assessors give a second chance if you miss a step in safe isolation?',
      options: [
        'Yes - everyone makes mistakes',
        'No - safety is non-negotiable',
        'Only for minor steps',
        'Yes - but with mark deduction',
      ],
      correctIndex: 1,
      explanation:
        'No - safety is non-negotiable. Critical safety errors result in immediate section failure with no second chances.',
    },
  ];

  const quizQuestions = [
    {
      id: 1,
      question: 'What is a critical safety error in AM2?',
      options: [
        'A mistake that loses marks but allows continuation',
        'An unsafe practice that causes instant section failure',
        'A paperwork error that needs correction',
        'A minor procedural mistake',
      ],
      correctAnswer: 1,
      explanation:
        'Critical safety errors are unsafe practices that cause instant section failure because they could cause injury or death in real work.',
    },
    {
      id: 2,
      question: 'Give one example of a safe isolation mistake that causes instant fail:',
      options: [
        'Taking too long to isolate',
        'Not labelling the isolation point',
        'Skipping the re-prove step after isolation',
        'Using a different isolation method',
      ],
      correctAnswer: 2,
      explanation:
        "Skipping the re-prove step means you can't confirm your tester is working, making the isolation potentially unsafe.",
    },
    {
      id: 3,
      question: 'Why does NET treat energising a faulted circuit as a critical fail?',
      options: [
        'It wastes time in the assessment',
        'It could cause fire, injury or death in real work',
        'It shows poor planning skills',
        'It damages the test equipment',
      ],
      correctAnswer: 1,
      explanation:
        'Energising a faulted circuit could cause fire, electric shock, or death - exactly the risks NET assessments are designed to prevent.',
    },
    {
      id: 4,
      question: 'True or false: Using tape instead of a lock-off device is acceptable:',
      options: [
        'True - if clearly marked',
        'False - lock-off devices are mandatory for safe isolation',
        'True - tape is industry standard',
        'False - but only loses minor marks',
      ],
      correctAnswer: 1,
      explanation:
        'False - proper lock-off devices are mandatory. Using tape is a critical safety error resulting in instant failure.',
    },
    {
      id: 5,
      question: "What's the purpose of the re-prove step in safe isolation?",
      options: [
        'To double-check the circuit is isolated',
        'To confirm your voltage tester is working correctly',
        'To document the isolation procedure',
        'To test the circuit resistance',
      ],
      correctAnswer: 1,
      explanation:
        'Re-proving confirms your voltage tester is still working after isolation - essential for safe working.',
    },
    {
      id: 6,
      question: 'Can incorrect paperwork alone cause a critical fail?',
      options: [
        'Yes - all paperwork errors are critical',
        'No - paperwork errors only lose marks',
        'Not usually - unless it hides or misrepresents a dangerous condition',
        "Yes - if it's illegible",
      ],
      correctAnswer: 2,
      explanation:
        'Paperwork errors usually just lose marks unless they hide or misrepresent dangerous conditions that could affect safety.',
    },
    {
      id: 7,
      question: 'Name one PPE-related mistake that could count as a safety fail:',
      options: [
        'Using wrong color hard hat',
        'Not wearing safety glasses while cutting or drilling',
        'Having dirty high-vis clothing',
        'Using worn but functional gloves',
      ],
      correctAnswer: 1,
      explanation:
        'Not wearing appropriate PPE like safety glasses during cutting/drilling operations is a serious health & safety breach.',
    },
    {
      id: 8,
      question: 'What should you always check before energising a circuit?',
      options: [
        'That paperwork is complete',
        'That all testing is complete and results are satisfactory',
        'That tools are put away',
        'That time allocation allows it',
      ],
      correctAnswer: 1,
      explanation:
        'Never energise a circuit until all testing is complete and results confirm the installation is safe and compliant.',
    },
    {
      id: 9,
      question: "What's the golden rule linking AM2 errors to real-world safety?",
      options: [
        'AM2 is just an assessment, not real work',
        "If it's unsafe in the real world, it's an instant fail in AM2",
        'AM2 standards are higher than real-world requirements',
        'Real-world work is more forgiving than AM2',
      ],
      correctAnswer: 1,
      explanation:
        "The golden rule: if it's unsafe in the real world, it's an instant fail in AM2. The assessment simulates real working conditions.",
    },
    {
      id: 10,
      question: 'If you make a critical error, can you continue the assessment?',
      options: [
        'Yes - but with heavy mark deduction',
        'No - the section is immediately failed',
        'Yes - after explaining your mistake',
        'No - the entire AM2 is terminated',
      ],
      correctAnswer: 1,
      explanation:
        'Critical safety errors result in immediate section failure. The assessor will stop that section of the assessment immediately.',
    },
  ];

  const learningOutcomes = [
    'Identify which AM2 mistakes are classed as critical safety errors',
    'Understand why these errors lead to instant failure',
    'Apply strategies to avoid making these errors under pressure',
    'Recognise the link between AM2 safety errors and real-world risks on site',
    'Build habits that prevent critical errors in both assessment and practice',
  ];

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/am2/module2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 2
          </button>

          <PageHero
            eyebrow="Module 2 · Section 5"
            title="Avoiding Critical Safety Errors"
            description="Some mistakes in the AM2 cost marks; others cause instant failure. NET defines these as critical safety errors involving unsafe isolation, energising unsafe circuits, or breaching basic health and safety law."
            tone="yellow"
          />

          <TLDR
            points={[
              'Critical safety errors override every other mark — one of these and the assessment ends.',
              'The big four: unsafe isolation, energising an unsafe circuit, working live without justification, breaching site H&S law.',
              'EAWR 1989 makes "work dead" the default. Live working needs written justification before you start.',
              'Assessors are watching from the moment you walk on the rig — every PPE choice, every cable strip, every tool selection counts.',
            ]}
          />

          <ConceptBlock title="Safety Errors = Instant Failure">
            <p>
              <strong className="text-red-300">Critical.</strong> Critical safety errors result in
              immediate section failure with no second chances. These include unsafe isolation,
              energising faulted circuits, and serious health &amp; safety breaches. AM2 simulates
              real work — unsafe practices could kill someone in real life, so NET's role is to
              confirm you are safe to work unsupervised.
            </p>
            <p>
              <strong className="text-red-300">Golden Rule.</strong> If it's unsafe in the real
              world, it's an instant fail in AM2. One critical mistake proves you're not ready for
              unsupervised work.
            </p>
          </ConceptBlock>

          <LearningOutcomes outcomes={learningOutcomes} />

          <ConceptBlock title="Critical Safety Errors Definition">
            <p>
              NET highlights the following as automatic fail points that result in immediate section
              termination:
            </p>
            <p>
              <strong>Failing Safe Isolation:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Missing prove/re-prove steps with voltage indicator</li>
              <li>Not using proper lock-off devices (using tape instead)</li>
              <li>Isolating wrong circuit or incomplete isolation</li>
              <li>Working on circuits without proper isolation verification</li>
            </ul>
            <p>
              <strong>Energising Unsafe Circuits:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Energising a circuit with a known fault</li>
              <li>Leaving a circuit unsafe or incomplete but live</li>
              <li>Switching on before completing all required tests</li>
              <li>Bypassing or defeating protective devices</li>
            </ul>
            <p>
              <strong>Serious Health &amp; Safety Breaches:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Ignoring required PPE (safety glasses, gloves, hard hat)</li>
              <li>Working live without proper justification and precautions</li>
              <li>Unsafe use of tools or test equipment</li>
              <li>Creating unsafe conditions for others</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <ConceptBlock title="Why These Errors Cause Instant Failure">
            <p>
              <strong className="text-elec-yellow">Real-World Simulation.</strong> AM2 simulates
              real work conditions. Unsafe practices in the assessment represent the same risks that
              could kill someone in real life — electric shock, fire, explosion, or serious injury.
              Every safety procedure you follow (or skip) directly translates to real-world
              competency.
            </p>
            <p>
              <strong className="text-elec-yellow">Competency Verification.</strong> NET's role is
              to confirm you are safe to work unsupervised. One critical mistake proves you're not
              ready for independent work, regardless of your technical abilities. This isn't about
              being harsh — it's about ensuring public safety and protecting the electrical
              industry's reputation.
            </p>
            <p>
              <strong className="text-elec-yellow">Legal and Insurance Implications.</strong>{' '}
              Employers and insurance companies rely on NET certification. Critical safety errors
              indicate potential liability risks that could result in prosecution under the
              Electricity at Work Regulations, massive insurance claims, or complete loss of
              professional indemnity cover.
            </p>
            <p>
              <strong className="text-orange-400">Industry Standards.</strong> The electrical
              industry has zero tolerance for unsafe practices because the consequences are so
              severe. A single mistake can result in fatalities, major fires, or explosions. NET
              reflects this reality — safety isn't negotiable, and competency must be absolute.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Common Critical Mistakes">
            <p>
              <strong className="text-elec-yellow">Critical Isolation Failures:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-red-400/70">
              <li>Skipping the re-prove step after isolation (most common failure)</li>
              <li>Using tape instead of proper lock-off devices</li>
              <li>Testing circuits assumed to be dead without proper verification</li>
              <li>Isolating the wrong circuit due to poor identification</li>
              <li>Working on multiple circuits without individual isolation</li>
              <li>Failing to prove voltage indicator before and after testing</li>
            </ul>
            <p>
              <strong className="text-red-400">
                Remember: Safe isolation isn't just about switching off — it's a complete procedure
                that must be followed exactly.
              </strong>
            </p>
            <p>
              <strong className="text-elec-yellow">Energising Errors &amp; PPE Breaches:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-red-400/70">
              <li>Energising circuits without completing all required tests</li>
              <li>Switching on circuits with known or suspected faults</li>
              <li>Leaving incomplete work energised at any point</li>
              <li>Not wearing safety glasses during cutting or drilling operations</li>
              <li>Using damaged or inappropriate tools for the task</li>
              <li>Ignoring required hard hat or high-visibility clothing</li>
            </ul>
            <p>
              <strong className="text-orange-400">
                PPE isn't optional in AM2 — assessors watch for health &amp; safety compliance
                throughout the entire assessment.
              </strong>
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <ConceptBlock title="Strategies to Avoid Errors">
            <p>
              <strong className="text-elec-yellow">Safety-First Mindset.</strong>
            </p>
            <p>
              <strong>Slow Down on Safety.</strong> Speed is irrelevant if unsafe. Take time with
              isolation procedures, PPE checks, and verification steps.
            </p>
            <p>
              <strong>Real-Site Behaviour.</strong> Treat AM2 like a live site where others' lives
              depend on your work — because that's exactly what real work is.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Never skip safety procedures to save time — time pressure is no excuse for unsafe
                work
              </li>
              <li>
                Remember that in real work, your actions affect colleagues, customers, and the
                public
              </li>
              <li>Build safety habits that become automatic under pressure</li>
            </ul>
            <p>
              <strong className="text-elec-yellow">Systematic Safety Procedures.</strong>
            </p>
            <p>
              <strong>Safe Isolation Checklist:</strong>
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>Identify correct circuit</li>
              <li>Prove voltage indicator</li>
              <li>Isolate at source</li>
              <li>Secure with lock-off</li>
              <li>Test circuit dead</li>
              <li>Re-prove voltage indicator</li>
            </ol>
            <p>
              <strong>Pre-Energising Checklist:</strong>
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-green-400/70">
              <li>All installation work complete</li>
              <li>All testing completed satisfactorily</li>
              <li>No known faults or defects</li>
              <li>Area clear and safe</li>
              <li>Paperwork completed</li>
              <li>Remove lock-off and energise</li>
            </ol>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Use written checklists every time — don't rely on memory under pressure</li>
              <li>Double-check circuit identification against drawings before isolating</li>
              <li>Never energise unless you've tested and certified the complete installation</li>
            </ul>
            <p>
              <strong className="text-elec-yellow">
                Personal Protective Equipment (PPE) Protocol — Basic PPE:
              </strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Hard hat at all times</li>
              <li>High-visibility clothing</li>
              <li>Safety footwear</li>
            </ul>
            <p>
              <strong className="text-amber-400">Task-Specific PPE:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-amber-400/70">
              <li>Safety glasses (cutting/drilling)</li>
              <li>Gloves (when appropriate)</li>
              <li>Hearing protection</li>
            </ul>
            <p>
              <strong className="text-red-400">Critical Reminders:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-red-400/70">
              <li>Check condition before use</li>
              <li>Replace if damaged</li>
              <li>Wear throughout task</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <ConceptBlock title="Real-World Examples">
            <p>
              <strong className="text-red-400">AM2 Example 1: Isolation Failure.</strong> Candidate
              skipped re-proving tester after isolation. The assessor stopped the test immediately →
              instant fail. The candidate had completed 90% of excellent work but failed the entire
              section.
            </p>
            <p>
              <strong className="text-red-400">AM2 Example 2: Energising Fault.</strong> Candidate
              completed most of installation but energised a circuit with a deliberate fault left in
              by NET. Despite excellent installation work, instant fail for critical safety error.
            </p>
            <p>
              <strong className="text-red-400">AM2 Example 3: Lock-off Device.</strong> Candidate
              used tape instead of a proper lock-off device to secure isolation. This is considered
              unsafe isolation practice → instant fail, despite otherwise competent work.
            </p>
            <p>
              <strong className="text-orange-400">Industry Example: Real Consequences.</strong> An
              apprentice failed to isolate properly; a colleague received a serious shock requiring
              hospital treatment. Company fined £50,000 under Electricity at Work Regulations.
              Individual faced disciplinary action.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Frequently Asked Questions">
            <p>
              <strong>Q1: What's the biggest single cause of critical safety fails?</strong>{' '}
              Incorrect safe isolation procedures, particularly skipping the re-prove step or using
              inadequate lock-off methods. Remember: safe isolation is a complete 6-step procedure,
              not just switching off.
            </p>
            <p>
              <strong>Q2: Can a paperwork mistake ever be a critical fail?</strong> Not usually —
              unless it hides or misrepresents a dangerous condition that could affect safety
              decisions. Exception: documentation that could mislead someone about safety-critical
              information.
            </p>
            <p>
              <strong>
                Q3: Do assessors give a second chance if you miss a step in safe isolation?
              </strong>{' '}
              No — safety is non-negotiable. Critical safety errors result in immediate section
              failure with no opportunity for correction. Zero tolerance policy: one mistake =
              instant section fail.
            </p>
            <p>
              <strong>
                Q4: If I realise I made a critical error halfway through, can I correct it?
              </strong>{' '}
              No — once a critical safety error is observed by the assessor, the section is
              immediately failed. Prevention is the only strategy. Assessors will stop the section
              immediately upon observing critical errors.
            </p>
            <p>
              <strong>Q5: Are critical fails only about electrical safety?</strong> No — they also
              cover unsafe tool use, PPE breaches, and general unsafe site behaviour that could
              cause injury. Covers all aspects of health &amp; safety, not just electrical work.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[4]} />

          <ConceptBlock title="Summary">
            <p>
              Critical safety errors are the quickest way to fail AM2. They include unsafe
              isolation, energising unsafe circuits, and breaching fundamental health and safety
              principles. These errors result in instant section failure because they represent
              practices that could cause serious injury or death in real-world work.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Use systematic safety procedures and never skip steps to save time</li>
              <li>Treat the assessment as a live site where others' lives depend on your work</li>
              <li>Remember: if it's unsafe in the real world, it's an instant fail in AM2</li>
            </ul>
            <p>
              <strong className="text-red-400">
                Golden Rule: Safety is non-negotiable. One critical error can end your AM2
                assessment regardless of how excellent your other work might be.
              </strong>
            </p>
          </ConceptBlock>

          <SectionRule />

          <RegsCallout
            source="Electricity at Work Regulations 1989 — Regulation 14"
            clause="No person shall be engaged in any work activity on or so near any live conductor (other than one suitably covered with insulating material so as to prevent danger) that danger may arise unless— (a) it is unreasonable in all the circumstances for it to be dead; and (b) it is reasonable in all the circumstances for him to be at work on or near it while it is live; and (c) suitable precautions (including where necessary the provision of suitable protective equipment) are taken to prevent injury."
            meaning={
              <>
                All three tests must be met before live working is lawful. AM2 simulates
                installation and testing — there’s effectively never a justification for live work
                on the rig. Touch anything live and the assessment is over.
              </>
            }
            cite="Source: legislation.gov.uk — Electricity at Work Regulations 1989, Regulation 14."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 131.2.1"
            clause="Persons and livestock shall be protected against dangers that may arise from contact with live parts of the installation."
            meaning={
              <>
                This is the regulatory framing for basic protection. Every install you do on AM2
                must leave no live parts accessible — terminal screws covered, accessory plates
                squared and tightened, no exposed copper. An exposed live conductor on a finished
                accessory is a critical safety error.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 131.2.1."
          />

          <Scenario
            title="Energising before final inspection"
            situation={
              <>
                You’ve finished installation. The rig is connected, all accessories are in. You’ve
                wired the consumer unit and the supply is right there. You think a quick power-up
                before the formal tests would let you spot a wiring fault now rather than later.
              </>
            }
            whatToDo={
              <>
                Don’t. The sequence is: visual inspection, dead tests (continuity, IR, polarity,
                R₁+R₂), then and only then energise for live tests. Energising before the dead tests
                are complete and recorded is a critical safety error. If a fault drops a phase to
                earth when you flick it on, you’ve put yourself and the assessor at risk.
              </>
            }
            whyItMatters={
              <>
                BS 7671 Reg 642.1 says inspection precedes testing, and live tests happen after dead
                tests are satisfactory. The order is the law of the rig — assessors will fail you
                for getting it backwards even if everything turns out fine.
              </>
            }
          />

          <CommonMistake
            title={`Skipping PPE because the rig "looks safe"`}
            whatHappens={
              <>
                You walk up to the rig without safety glasses or you take your gloves off to feel a
                terminal. The assessor logs an H&S breach before you’ve even started.
              </>
            }
            doInstead={
              <>
                PPE on at the boundary of the rig and stays on until the section closes. Safety
                glasses, gloves where the RAMS specifies them, sturdy footwear from the moment you
                arrive. PPE is the visible signal you’re working safely.
              </>
            }
          />

          <FAQ
            items={[
              {
                question: 'What counts as "energising an unsafe circuit"?',
                answer:
                  'Powering up before dead tests are complete and recorded; powering up with exposed live parts; powering up while someone has hands in an enclosure; powering up without checking polarity. Any of these is a critical fail.',
              },
              {
                question: 'Can I ever work live in AM2?',
                answer:
                  'No. Live testing (Zs, RCD operation) is not "live working" in the EAWR sense — you’re using approved test instruments with shrouded probes. Actual live work on conductors is never justified on the rig.',
              },
              {
                question: 'What’s the most common critical fail in AM2?',
                answer:
                  'Incomplete safe isolation — usually missing the second prove of the tester, or skipping the lock-off. NET data has put it at the top of the list for years.',
              },
              {
                question: 'If I make a critical error, am I told immediately?',
                answer:
                  'Yes — the assessor will stop you, explain what was wrong, and end the affected section. The rest of the assessment continues for record purposes but you can’t recover the section once a critical fail is logged.',
              },
              {
                question: 'Does the assessor allow second chances on PPE?',
                answer:
                  'For minor lapses (briefly forgetting glasses), they may give a verbal warning. For repeated or serious lapses (no glasses while drilling, gloves off near live test), it’s logged as an H&S breach.',
              },
              {
                question: 'What if the rig has a defect — can I still work on it?',
                answer:
                  'No. Stop work, tell the assessor, document it. Working on defective equipment is itself a safety breach. The centre will swap kit or adjust the rig.',
              },
            ]}
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'One critical safety error ends the assessment regardless of every other mark.',
              'The big four: unsafe isolation, energising prematurely, live working, H&S breaches.',
              'EAWR 1989 Reg 14 makes live working unlawful unless three tests are met. They’re not met on AM2.',
              'BS 7671 Reg 131.2.1: no accessible live parts on a finished install. Visible copper = critical fail.',
              'Sequence matters: visual → dead tests → energise → live tests. Never out of order.',
              'PPE on at the boundary of the rig and stays on until the section closes.',
              'A defective rig is the assessor’s problem — stop work, report it, don’t work around it.',
              'Assessors stop you immediately on a critical fail. You’ll know in real time.',
            ]}
          />

          <Quiz questions={quizQuestions} title="Knowledge Check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/am2/module2/section4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Completing Paperwork
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/am2/module3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Module 3: Installation Tasks
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default AM2Module2Section5;
