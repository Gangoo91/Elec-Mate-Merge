/**
 * Module 7 · Section 3 — Safety-first approach
 * AM2 day-prep — Cross-cutting exam strategy
 * Visible safety behaviour the assessor can mark — and the unsafe practices that fail you on the spot.
 */

import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import useSEO from '@/hooks/useSEO';
import { useNavigate } from 'react-router-dom';
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

const TITLE = 'Safety-first Approach | AM2 Module 7.3 | Elec-Mate';
const DESCRIPTION =
  'Showing the AM2 assessor you are safe — the visible behaviours that earn marks and the unsafe practices that fail you on the spot.';

const AM2Module7Section3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  const quickCheckQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }> = [
    {
      id: 'unsafe-practice',
      question: 'What does unsafe practice in AM2 usually result in?',
      options: [
        'Special test procedures required due to earthing arrangement',
        'An inverted-U curve — performance peaks at moderate arousal then declines',
        'Cling film applied lengthways over the burn',
        'Automatic failure, regardless of performance in other areas',
      ],
      correctIndex: 3,
      explanation:
        'Unsafe practice in AM2 results in automatic failure, regardless of how well you complete the rest of the exam.',
    },
    {
      id: 'cpc-fail',
      question: 'If you attempt to energise a circuit without CPC connected, what happens?',
      options: [
        'To secure and align electrical accessories',
        'It operates at the correct temperature setting',
        'Automatic fail - dangerous and non-compliant',
        'Occupational asthma (respiratory sensitiser)',
      ],
      correctIndex: 2,
      explanation:
        'Energising a circuit without CPC connected is dangerous and non-compliant, resulting in automatic failure.',
    },
    {
      id: 'isolation-steps',
      question: 'What happens if you skip any step in safe isolation?',
      options: [
        'You can continue if you remember later',
        'Instant fail - critical safety error',
        'Warning from assessor',
        'Minor mark deduction',
      ],
      correctIndex: 1,
      explanation:
        'Skipping any step in safe isolation is a critical safety error that results in instant failure.',
    },
  ];

  const quizQuestions = [
    {
      id: 1,
      question: 'Why is safety the top priority in AM2?',
      options: [
        "GSHPs typically have higher COP (3.5-5.0 vs 2.5-4.0)",
        "NET's primary objective is to prove you are safe to work unsupervised",
        "A fault specific to that individual device or its circuit",
        "Annually or as per manufacturer's recommendations",
      ],
      correctAnswer: 1,
      explanation:
        "NET's primary objective is to prove you are safe to work unsupervised. Unsafe electricians put lives at risk.",
    },
    {
      id: 2,
      question: 'Name three safety behaviours assessors look for:',
      options: [
        'Confidence, knowledge, experience',
        'Speed, accuracy, neatness',
        'Safe isolation, correct PPE, tool use',
        'Planning, organisation, efficiency',
      ],
      correctAnswer: 2,
      explanation:
        'Key safety behaviours include safe isolation following the 10-step process, correct PPE usage, and proper tool use.',
    },
    {
      id: 3,
      question: 'What happens if you skip a safe isolation step?',
      options: [
        'Warning from assessor',
        'Minor mark deduction',
        'Extra time given',
        'Instant failure',
      ],
      correctAnswer: 3,
      explanation:
        "Skipping any step in safe isolation results in instant failure as it's a critical safety error.",
    },
    {
      id: 4,
      question: 'What regulation requires safe working practices?',
      options: [
        'Both BS 7671 and GS38',
        'GS38',
        'BS 7671 (current edition)',
        'HSE guidelines only',
      ],
      correctAnswer: 0,
      explanation:
        'Both BS 7671 (current edition — BS 7671:2018+A4:2026) and HSE GS38 require safe working practices and proper test equipment use.',
    },
    {
      id: 5,
      question: 'Why should CPCs always be sleeved and connected immediately?',
      options: [
        "To ensure safety and compliance",
        "It's required by BS 7671 for safety",
        "As Low As Reasonably Practicable",
        "Yes, if suitable IP rating",
      ],
      correctAnswer: 1,
      explanation:
        'CPCs must be sleeved and connected immediately as required by BS 7671 for electrical safety and fault protection.',
    },
    {
      id: 6,
      question: "True or false: Assessors don't care if your work area is messy.",
      options: ['True', 'False'],
      correctAnswer: 1,
      explanation:
        'False - untidy, unsafe work areas reflect poor safety culture and can lead to accidents and mark deductions.',
    },
    {
      id: 7,
      question: 'What is GS38 and why is it important?',
      options: [
        'False triggering from heat sources or incorrect positioning',
        'To ensure earth fault protection is working correctly',
        'To give practical guidance on complying with legal duties',
        'Safety standard for electrical test equipment and probes',
      ],
      correctAnswer: 3,
      explanation:
        'GS38 is the safety standard for electrical test equipment, requiring proper probe guards and safe test leads.',
    },
    {
      id: 8,
      question: "Give an example of an 'instant fail' safety error:",
      options: [
        'Using non-GS38 test probes',
        'Working too slowly',
        'Forgetting to label a circuit',
        'Making a termination mistake',
      ],
      correctAnswer: 0,
      explanation:
        'Using non-GS38 compliant test probes is an instant fail safety error as it creates serious safety risks.',
    },
    {
      id: 9,
      question: 'How can you show the assessor you are working safely?',
      options: [
        'When waste is transferred from one party to another',
        'Talk through safety steps and make actions visible',
        'The maximum number of concurrent jobs you take on',
        'Unforeseen site conditions and construction uncertainties',
      ],
      correctAnswer: 1,
      explanation:
        "Talk through safety steps (e.g., 'proving my tester on known live source') and make safety actions clearly visible to the assessor.",
    },
    {
      id: 10,
      question: "What's the golden rule about safety in AM2?",
      options: [
        'Safety first, speed second',
        'Never take shortcuts',
        'Unsafe = fail. Safe = pass.',
        'Follow all regulations exactly',
      ],
      correctAnswer: 2,
      explanation:
        "The golden rule is 'Unsafe = fail. Safe = pass.' Safety is the foundation of everything in AM2.",
    },
  ];

  const learningOutcomes = [
    'Explain why NET places safety above everything else in AM2',
    'Demonstrate safe working behaviours consistently, not just during isolation and testing',
    "Identify the critical 'instant fail' safety errors to avoid",
    'Build habits that prove to the assessor you prioritise safety',
    'Leave every stage of AM2 in a safe condition',
  ];

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/am2/module7')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 7
          </button>

          <PageHero
            eyebrow="Module 7 · Section 3"
            title="Safety-first Approach - Show the Assessor You're Safe"
            description="The AM2 is not just a test of technical skill - it is a test of whether you can be trusted to work safely in the electrical industry. Assessors are trained to watch for safe behaviour at all times, not only during specific tasks like isolation. If you show unsafe practice, it can result in instant failure, regardless of how well you complete the rest of the exam."
            tone="yellow"
          />

          <TLDR
            points={[
              'Assessors watch behaviour all day — PPE, tool selection, posture, the way you treat the rig.',
              'Visible safety habits (locking off, posting warnings, narrating safe-isolation steps) score on every section.',
              'Leaving the rig safe between tasks matters as much as the task itself — never walk away from exposed live parts.',
              'Safety isn’t one section — it’s the thread running through the whole assessment.',
            ]}
          />

          <ConceptBlock title="Safety is Everything in AM2">
            <p>
              <strong className="text-red-300">Critical.</strong> Unsafe electricians put lives at
              risk — so unsafe behaviour equals instant failure. Safety behaviours must be
              demonstrated consistently throughout the entire exam, not just once. NET's primary
              objective is to prove you are safe to work unsupervised. Every action is being
              assessed for safety compliance.
            </p>
          </ConceptBlock>

          <LearningOutcomes outcomes={learningOutcomes} />

          <ConceptBlock title="Why Safety is Everything">
            <p>NET's primary objective is to prove you are safe to work unsupervised:</p>
            <p>
              <strong className="text-blue-400">Key Safety Principles:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-blue-400/70">
              <li>NET's primary objective is to prove you are safe to work unsupervised</li>
              <li>Unsafe electricians put lives at risk — so unsafe behaviour = fail</li>
              <li>Safety behaviours must be demonstrated throughout the exam, not just once</li>
            </ul>
            <p>
              <strong className="text-green-400">Remember:</strong> Every action is being assessed
              for safety compliance. The assessor is constantly evaluating whether you can be
              trusted to work safely without supervision.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={quickCheckQuestions[0].id}
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          <ConceptBlock title="Key Safety Behaviours">
            <p>
              Assessors are trained to watch for these critical safety behaviours throughout your
              AM2 exam:
            </p>
            <p>
              <strong>1. Safe Isolation.</strong> Following the 10-step process, including
              prove/re-prove. This is the foundation of electrical safety.
            </p>
            <p>
              <strong className="text-blue-400">Critical Steps:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-blue-400/70">
              <li>Select appropriate point of isolation</li>
              <li>Secure isolation — lock off/remove fuses</li>
              <li>Prove tester before use</li>
              <li>Test circuit dead</li>
              <li>Re-prove tester after testing</li>
            </ul>
            <p>
              <strong>2. PPE and Tool Use.</strong> Correct PPE usage, proper tools, no makeshift
              shortcuts, no damaged equipment.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-green-400/70">
              <li>Safety glasses when required</li>
              <li>Insulated gloves where appropriate</li>
              <li>GS38-compliant test equipment only</li>
              <li>Right tool for the job, no improvisation</li>
            </ul>
            <p>
              <strong>3. Work Area Management.</strong> Tidy workspace, no trailing leads or trip
              hazards, organised approach.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
              <li>Keep walkways clear of tools and cables</li>
              <li>Organise tools methodically on work surface</li>
              <li>Coil test leads properly when not in use</li>
              <li>Clean up as you go — shows professionalism</li>
              <li>Position ladder safely with correct angle (1:4 ratio)</li>
              <li>Secure cable drums and heavy equipment</li>
            </ul>
            <p>
              <strong className="text-orange-400">Remember:</strong> Untidy work areas suggest poor
              safety culture and can lead to accidents.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={quickCheckQuestions[1].id}
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          <ConceptBlock title="Instant Fail Errors">
            <p>
              These safety-critical errors result in immediate failure, regardless of performance
              elsewhere:
            </p>
            <p>
              <strong className="text-red-400">Critical Safety Errors:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-red-400/70">
              <li>Skipping any step in safe isolation</li>
              <li>Using unsafe test equipment (non-GS38 probes, taped leads)</li>
              <li>Energising a circuit with exposed copper or missing CPCs</li>
              <li>Bypassing protective devices</li>
              <li>Failing to label or identify circuits, creating risk for others</li>
              <li>Working recklessly — e.g., rushing in testing with live conductors exposed</li>
            </ul>
            <p>
              <strong className="text-yellow-400">Warning:</strong> These errors are not negotiable.
              Even if you complete everything else perfectly, any of these safety violations will
              result in instant failure.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={quickCheckQuestions[2].id}
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          <ConceptBlock title="Showing the Assessor">
            <p>
              It's not just about being safe — it's about making it clear to the assessor that
              safety is your priority:
            </p>
            <p>
              <strong className="text-blue-400">Visible Safety Practices:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-blue-400/70">
              <li>
                <strong>Talk through steps:</strong> e.g., "I am now proving my tester on a known
                live source"
              </li>
              <li>
                <strong>Double-check visibly:</strong> show that you re-sleeve CPCs, torque
                terminals, re-fit trunking lids
              </li>
              <li>
                <strong>Label clearly:</strong> DBs, circuits, and accessories must all be
                identifiable
              </li>
              <li>
                <strong>Keep order:</strong> tidy work area shows professionalism and reduces risks
              </li>
            </ul>
            <p>
              <strong className="text-green-400">Professional Approach:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-green-400/70">
              <li>Methodical, step-by-step approach to all tasks</li>
              <li>Clear communication when explaining what you're doing</li>
              <li>Immediate correction of any mistakes, done visibly</li>
              <li>Consistent safety practices throughout the entire exam</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Practical Guidance">
            <p>
              Think like you're on-site with a client or inspector watching — every action reflects
              your professionalism:
            </p>
            <p>
              <strong className="text-blue-400">Scenario: Beginning Any Task.</strong>{' '}
              <strong>Do:</strong> check your test equipment is GS38-compliant, prove on known live
              source. <strong>Say:</strong> "I'm checking my tester before use on this known live
              source". <strong>Why:</strong> shows methodical approach and compliance with safety
              standards.
            </p>
            <p>
              <strong className="text-green-400">Scenario: Making Connections.</strong>{' '}
              <strong>Do:</strong> connect CPCs first with proper sleeving, torque terminals to
              spec. <strong>Say:</strong> "Connecting the CPC first for safety, using green/yellow
              sleeving". <strong>Why:</strong> demonstrates understanding of safety hierarchy and BS
              7671 compliance.
            </p>
            <p>
              <strong className="text-purple-400">Scenario: Before Energising.</strong>{' '}
              <strong>Do:</strong> double-check all connections, verify CPC continuity, check
              polarity. <strong>Say:</strong> "Checking all connections secure before energising,
              verifying CPC continuity". <strong>Why:</strong> prevents dangerous situations and
              shows systematic approach.
            </p>
            <p>
              <strong className="text-orange-400">Scenario: If You Make a Mistake.</strong>{' '}
              <strong>Do:</strong> stop immediately, isolate if necessary, correct properly.{' '}
              <strong>Say:</strong> "I need to isolate and correct this connection properly".{' '}
              <strong>Why:</strong> shows honesty, safety-first mindset, and professional integrity.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-green-400/70">
              <li>
                <strong>Practise safe isolation</strong> until it is second nature
              </li>
              <li>
                <strong>Always sleeve CPCs immediately</strong> — don't leave it until later
              </li>
              <li>
                <strong>Never cut corners</strong> on test probe safety — keep fingers behind
                barriers
              </li>
              <li>
                <strong>Ask yourself:</strong> "Is this safe for another electrician to touch right
                now?"
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Real-world Examples">
            <p>
              <strong className="text-red-400">Example 1.</strong> Candidate skipped re-prove of
              tester in safe isolation procedure — assessor stopped exam — fail.
            </p>
            <p>
              <strong className="text-red-400">Example 2.</strong> Candidate completed installation
              correctly but left bare copper exposed in a socket — unsafe workmanship — marks lost.
            </p>
            <p>
              <strong className="text-green-400">Example 3.</strong> Candidate explained each
              isolation step out loud, used GS38 leads correctly, and kept tidy work area — assessor
              noted professionalism — passed.
            </p>
            <p>
              <strong className="text-yellow-400">Example 4.</strong> In industry, an electrician
              energised a circuit with no CPC — shock incident. Same behaviour in AM2 = instant
              fail.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Frequently Asked Questions">
            <p>
              <strong>Q1: Do assessors allow small safety mistakes?</strong> No — safety errors are
              heavily penalised, and critical errors result in instant failure. There are no "small"
              safety mistakes in electrical work.
            </p>
            <p>
              <strong>Q2: What if I realise I've made a safety error during the exam?</strong> Stop
              immediately, inform the assessor, isolate if necessary, and correct it properly.
              Honesty and immediate correction show professional integrity.
            </p>
            <p>
              <strong>Q3: Is it better to be slow and safe, or fast and efficient?</strong> Always
              slow and safe. Speed is never prioritised over safety in AM2. A methodical, safe
              approach will always score higher than rushing.
            </p>
            <p>
              <strong>Q4: Should I verbalise my safety steps?</strong> Yes! Talking through safety
              steps like "proving my tester on known live source" clearly demonstrates your
              understanding to the assessor.
            </p>
            <p>
              <strong>Q5: What happens if my test equipment fails during the exam?</strong> Stop
              work immediately, inform the assessor, and request replacement equipment. Never
              continue with faulty or unsafe test equipment.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Summary">
            <p>In AM2, safety is the foundation of everything. You must:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-blue-400/70">
              <li>Follow safe isolation correctly</li>
              <li>Use PPE and tools properly</li>
              <li>Terminate and test safely with GS38 compliance</li>
              <li>Keep your work area tidy and circuits safe</li>
              <li>
                Show the assessor, clearly and confidently, that safety is always your first
                priority
              </li>
            </ul>
            <p>
              <strong className="text-elec-yellow">Unsafe = fail. Safe = pass.</strong>
            </p>
          </ConceptBlock>

          <SectionRule />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 642.1"
            clause="Inspection shall precede testing and shall normally be done with that part of the installation under inspection disconnected from the supply."
            meaning={
              <>
                Inspection happens dead, before testing. Energising before inspection is finished is
                both a regulatory breach and an AM2 critical safety error. The visual walk-through
                is where you find the obvious problems — exposed conductors, missing barriers,
                untightened terminals — before any current flows.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 642.1."
          />

          <Scenario
            title="Lunch break with the rig half-finished"
            situation={
              <>
                It’s 12:30 on day one. You’re mid-task — consumer unit cover off, conductors
                partially terminated, supply isolated and locked off. The assessor calls lunch. You
                grab your jacket and head for the canteen.
              </>
            }
            whatToDo={
              <>
                Before you walk away: replace the cover or post a clear warning, confirm the supply
                is still isolated and your padlock is in place, leave a safe-condition note on the
                rig. On site, leaving an uncovered consumer unit unattended is a serious H&S breach.
                On AM2 it’s a marked criterion.
              </>
            }
            whyItMatters={
              <>
                The assessor watches what you do at every transition — start of section, end of
                section, lunch, comfort breaks. "Always leave the workplace safe" is in the marking
                criteria, not just polite advice.
              </>
            }
          />

          <CommonMistake
            title="Treating safety as a Section C exercise only"
            whatHappens={
              <>
                You ace safe isolation in Section C, but the rest of the day you’ve had safety
                glasses on your head, gloves in your back pocket, and tools in places where someone
                could walk into them. The assessor logs an H&S issue every couple of hours. By close
                of play you’ve accumulated enough to fail on H&S.
              </>
            }
            doInstead={
              <>
                Treat safety as a continuous behaviour, not a section. Glasses on whenever you’re
                cutting, drilling or stripping. Tidy workspace at every break. PPE matched to the
                task from your RAMS. Make safety visible.
              </>
            }
          />

          <FAQ
            items={[
              {
                question: 'Do assessors really watch all day, or only during scored tasks?',
                answer:
                  'All day. NET trains assessors to observe behaviour throughout — H&S is a cross-cutting criterion that applies from arrival to debrief.',
              },
              {
                question: 'What counts as "leaving the rig safe"?',
                answer:
                  'Supply isolated and locked, covers in place or warning notices posted, no exposed live parts, tools off the floor, no trip hazards. Same standard as a real install at the end of the day.',
              },
              {
                question: 'Should I narrate my safety steps out loud?',
                answer:
                  'Yes — for safe isolation especially. Talking through "proving tester live, switching off, locking off, posting notice, testing dead, re-proving live" makes it obvious to the assessor that you’ve followed the procedure.',
              },
              {
                question: 'Is there a list of every "instant fail" safety error?',
                answer:
                  'NET publishes the critical-fail list in the candidate brief. The big ones: unsafe isolation, working live, energising without inspection, exposing others to danger, falsifying records.',
              },
              {
                question:
                  'What if the assessor seems to ignore my safety habits — am I wasting time?',
                answer:
                  'No. They’re trained not to react in the moment so candidates don’t game the marking. Keep going. The mark sheet records every safe behaviour they observe.',
              },
              {
                question: 'How do I balance safety thoroughness with the time pressure?',
                answer:
                  'Build safety into your sequence. Posting a warning and locking off should add seconds, not minutes, once you’ve practised it. The candidates who run out of time aren’t the safe ones — they’re the ones who didn’t plan.',
              },
            ]}
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Safety is observed all day, not just in Section C. Every transition counts.',
              'BS 7671 Reg 642.1: inspection before testing, dead before live. Get the order right.',
              'Always leave the rig safe at breaks — covers on or warnings posted, supply locked off.',
              'PPE matched to the task from your RAMS. Glasses, gloves, footwear — visible at all times.',
              'Narrate safe-isolation steps out loud. The assessor needs to see the procedure.',
              'Tidy workspace, tools off the floor, no trip hazards. Workmanship and safety overlap.',
              'Critical-fail list is in the candidate brief — read it, memorise it.',
              'Safety habits should add seconds, not minutes — that comes from practice.',
            ]}
          />

          <Quiz questions={quizQuestions} title="Test Your Knowledge: Safety-first Approach" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/am2/module7/section2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Coping with Nerves
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/am2/module7/section4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Avoiding Common Mistakes
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default AM2Module7Section3;
