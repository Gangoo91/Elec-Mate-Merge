/**
 * Module 5 · Section 4 — Proving and recording rectification
 * AM2 day-prep — AM2 Phase D (fault diagnosis + rectification)
 * Once the fault is fixed: prove the circuit is safe again and write the rectification down clearly.
 */

import {
  ArrowLeft,
  BookOpen,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  Eye,
  FileText,
  Lightbulb,
  Settings,
  Target,
  Wrench,
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

const TITLE = 'Proving and Recording Rectification | AM2 Module 5.4 | Elec-Mate';
const DESCRIPTION =
  'After an AM2 fix — prove the circuit is safe, record what you changed in plain language and show the assessor it really is rectified.';

const AM2Module5Section4 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quickCheckQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }> = [
    {
      id: 'polarity-rectification',
      question: 'If polarity is reversed at a socket, what rectification must you record?',
      options: [
        'Q = A × v (volume flow rate equals area times velocity)',
        'Eliminate the hazard at source, or substitute with something less hazardous',
        'Swap line and neutral connections into correct terminals at the socket outlet',
        '3 V (RA × IΔn = 100 × 0.03 = 3 V) — passes comfortably.',
      ],
      correctIndex: 2,
      explanation:
        "Specific, professional language is required: exactly what needs to be done and where, not vague phrases like 'fix'.",
    },
    {
      id: 'high-resistance-test',
      question: 'After correcting a high resistance joint, which test proves rectification?',
      options: [
        'Re-check Zs to confirm impedance is now within limits',
        'Test armour and internal CPC separately',
        'That the circuit is isolated and disconnected',
        'Technical understanding helps manage building services',
      ],
      correctIndex: 0,
      explanation:
        'High resistance joints affect earth fault loop impedance (Zs), so re-testing Zs proves the repair is effective.',
    },
    {
      id: 'rectification-components',
      question: 'What are the three essential components of professional rectification recording?',
      options: [
        'Action + Location + Re-test',
        'Fault + Tools + Materials',
        'Problem + Solution + Signature',
        'Location + Time + Cost',
      ],
      correctIndex: 0,
      explanation:
        'Professional rectification must include: the specific action needed, exact location, and the re-test that proves safety.',
    },
  ];

  const quizQuestions = [
    {
      id: 1,
      question: 'Do you physically repair faults in AM2?',
      options: [
        'Injecting anti-phase currents to cancel harmonics',
        'No - just describe rectification and re-testing',
        'Isolated system with no intentional connection to earth',
        'Typically 0.9 or 0.95 lagging minimum',
      ],
      correctAnswer: 1,
      explanation:
        'In AM2, you only describe what rectification would be needed and how you would prove it safe - no physical repairs are carried out.',
    },
    {
      id: 2,
      question: 'How should rectification be phrased?',
      options: [
        'In your own words',
        'As briefly as possible',
        'Action + Location + Re-test',
        'Using technical jargon',
      ],
      correctAnswer: 2,
      explanation:
        'The simple rule for rectification phrasing is: Action (what to do) + Location (where) + Re-test (how to prove safe).',
    },
    {
      id: 3,
      question: 'Give an example of rectification for an open circuit fault.',
      options: [
        'Protection by double or reinforced insulation without earthing',
        'Placing more weight on the scaffold than its design allows, which can cause collapse',
        'To ensure the health, safety and welfare of all employees at work',
        'Reconnect line conductor at loose termination, then re-test continuity',
      ],
      correctAnswer: 3,
      explanation:
        "Specific example: 'Reconnect line conductor at loose termination, then re-test continuity' shows exact action, location, and verification.",
    },
    {
      id: 4,
      question: 'What re-test confirms correction of a short circuit?',
      options: [
        'Insulation resistance test',
        'Daily or weekly for key metrics',
        'Exactly as displayed on the meter',
        'Total path length (out and back)',
      ],
      correctAnswer: 0,
      explanation:
        'Short circuits are detected by insulation resistance testing, so re-testing insulation resistance confirms the repair.',
    },
    {
      id: 5,
      question: 'What rectification is required for a reversed polarity at a socket?',
      options: [
        'Apply safety factors to limits',
        'Swap conductors into correct terminals',
        'Visitor sign-in / fire register',
        'It operates at the correct temperature setting',
      ],
      correctAnswer: 1,
      explanation:
        'Polarity faults require swapping line and neutral conductors into their correct terminals at the affected accessory.',
    },
    {
      id: 6,
      question: 'After remaking a high resistance joint, what test proves safety?',
      options: [
        'Viewing the measurement scale at an angle',
        'Borderline overcurrent due to undersized cable',
        'Zs test to confirm impedance within limits',
        'The reduction factor applied to total connected load',
      ],
      correctAnswer: 2,
      explanation:
        'High resistance joints affect earth fault loop impedance, so Zs testing proves the joint is now within acceptable limits.',
    },
    {
      id: 7,
      question: "True or false: 'Fix fault' is acceptable wording for rectification.",
      options: ['True', 'False'],
      correctAnswer: 1,
      explanation:
        "False. Vague wording like 'fix fault' scores zero marks. Professional, specific language describing exact actions is required.",
    },
    {
      id: 8,
      question: 'Why must you always include re-testing in your rectification statement?',
      options: [
        'To prove the circuit is safe after repair',
        'The purchase price of the equipment',
        'To advise the employer on health and safety matters',
        'The householder who commissioned the work',
      ],
      correctAnswer: 0,
      explanation:
        'Re-testing proves the circuit is safe and compliant after rectification - this is essential for professional electrical work.',
    },
    {
      id: 9,
      question: 'How should you record a faulty accessory fault?',
      options: [
        'Employer, training provider (college), and apprentice',
        'Replace defective accessory with new unit, then re-test circuit',
        'Low resistance ohmmeter with 200mA minimum test current',
        'Avoid hazardous manual handling so far as is reasonably practicable',
      ],
      correctAnswer: 1,
      explanation:
        'Complete rectification includes replacement of faulty equipment and re-testing to ensure circuit integrity.',
    },
    {
      id: 10,
      question: "What's the simple rule for rectification phrasing?",
      options: [
        'Dust-tight and water jet protected',
        'Interference between cables',
        'Action + Location + Re-test',
        'High humidity decreases resistance',
      ],
      correctAnswer: 2,
      explanation:
        'The universal rule is: Action (what to do) + Location (where) + Re-test (how to prove safe).',
    },
  ];

  const faqs = [
    {
      question: 'Do I physically repair the fault in AM2?',
      answer:
        "No — you describe what you'd do and which test would prove it safe. AM2 fault diagnosis tests your DIAGNOSIS and DOCUMENTATION skills, not your ability to swap an accessory. Saves the rig from being torn apart between candidates too.",
    },
    {
      question: "What happens if I don't state the re-test?",
      answer:
        "You lose marks — proving safety after rectification is mandatory under BS 7671 Reg 643.1. Without the re-test, you've described work that wouldn't comply with the regs in real life. Even if your fault diagnosis was perfect, missing the re-test caps your score.",
    },
    {
      question: 'Do I need to mention BS 7671 limits in rectification?',
      answer:
        "Not required, but mentioning specific values lifts your answer from pass to full marks. 'Re-test Zs to confirm within 1.37 Ω for 32A Type B' is way stronger than 'Re-test Zs'. It shows you know which protective device, which maximum, which standard.",
    },
    {
      question: "Can I just say 'replace damaged accessory'?",
      answer:
        "Half-credit at best. You must say WHICH accessory, WHERE, and WHAT TEST proves it. Better: 'Replace damaged 13A socket at SO2 with new BS 1363-rated unit — re-test polarity and continuity at SO2 to confirm safe.'",
    },
    {
      question: "What if I'm unsure how to phrase rectification?",
      answer:
        'Use the rule: Action + Location + Re-test. This format works for ALL fault types. Practice it until it\'s muscle memory before the day. Build phrases like "reconnect", "remake", "replace", "re-terminate" — these are the verbs the regs use.',
    },
    {
      question: 'What if there are multiple faults on the same circuit?',
      answer:
        "List them clearly, numbered, with each rectification + re-test. Example: '1. Reconnect CPC at SO2 — re-test R2 + Zs. 2. Correct L/N polarity at SO2 — re-test polarity at SO2.' Logical order, each one complete. Don't try to bundle multiple actions into one sentence — the assessor needs to mark each separately.",
    },
  ];

  const learningOutcomes = [
    'Clearly describe rectification steps for common AM2 fault types',
    'Record rectification in professional language suitable for certification',
    'State the correct re-testing procedure after rectification',
    'Demonstrate a complete fault-finding cycle: diagnose → rectify → prove safe',
    'Avoid vague or incomplete reporting that loses marks',
  ];

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <Link
            to="/study-centre/apprentice/am2/module5"
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 5
          </Link>

          <PageHero
            eyebrow="Module 5 - Section 4"
            title="Proving and Recording Rectification"
            description="In AM2 fault diagnosis, identifying the fault is only half the task. The assessor also expects you to state how you would rectify it and then how you would prove it safe afterwards."
            tone="yellow"
          />

          <TLDR
            points={[
              "Format every rectification as Action + Location + Re-test. 'Reconnect CPC at SO2 — re-test continuity and Zs.' That's full marks.",
              "You don't physically fix it. You state what you'd do and which test would prove it safe afterwards.",
              "Vague words ('fix', 'sort', 'replace') score zero. Specific, professional language matching how a certificate would be written is what the assessor wants.",
            ]}
          />

          <div className="space-y-6">
            {/* Introduction */}
            <section className="space-y-3">
              <p className="text-ios-body text-white leading-relaxed">
                Your answers must be clear, precise, and professional - vague phrases like "fix it"
                or "replace" won't score marks.
              </p>
            </section>

            {/* Critical Warning */}
            <CommonMistake
              title="Professional Recording Required"
              whatHappens={
                <>
                  <p className="text-ios-callout text-white mb-3 leading-relaxed">
                    Vague phrases like "fix it" or "replace" score zero marks. Assessors want
                    professional language that shows you understand both the problem and the
                    complete solution.
                  </p>
                  <p className="text-ios-callout text-white font-medium leading-relaxed">
                    Every rectification statement must include: specific action + exact location +
                    re-test procedure.
                  </p>
                </>
              }
              doInstead={<>Treat this as a hard rule on AM2 day — there are no exceptions.</>}
            />

            {/* Learning Outcomes */}
            <LearningOutcomes outcomes={learningOutcomes} />

            {/* What is Rectification */}
            <ConceptBlock title="1. What Does Rectification Mean in AM2?">
              <p>
                Rectification is about stating the practical action needed to restore the circuit to
                a safe, compliant condition:
              </p>

              <p>
                <strong className="text-elec-yellow">Common Rectification Actions:</strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Reconnecting</strong> a broken conductor
                </li>
                <li>
                  <strong>Correcting</strong> polarity at a socket or switch
                </li>
                <li>
                  <strong>Tightening or remaking</strong> a loose/high resistance joint
                </li>
                <li>
                  <strong>Replacing</strong> a damaged accessory
                </li>
                <li>
                  <strong>Re-terminating</strong> CPCs correctly
                </li>
              </ul>

              <p>
                <strong className="text-elec-yellow">Important Note:</strong> You don't physically
                carry out the repair - you just state what would be done. The assessment is testing
                your knowledge of proper procedures, not your practical skills.
              </p>
            </ConceptBlock>

            <InlineCheck
              id={quickCheckQuestions[0].id}
              question={quickCheckQuestions[0].question}
              options={quickCheckQuestions[0].options}
              correctIndex={quickCheckQuestions[0].correctIndex}
              explanation={quickCheckQuestions[0].explanation}
            />

            <RegsCallout
              source="BS 7671 — Regulation 134.1.4 (Workmanship)"
              clause="Equipment shall be installed in accordance with the instructions provided by the manufacturer. Conductors shall be terminated to suitable accessories or items of equipment by means which provide secure mechanical and electrical connection."
              meaning={
                <>
                  When you state your rectification, you're describing how you'd restore Reg 134
                  compliance. "Reconnect CPC at socket SO2 earth terminal" is workmanship language —
                  it tells the assessor you understand that the fault was a workmanship defect and
                  your fix restores secure mechanical and electrical connection. That's what
                  certification language looks like.
                </>
              }
              cite="Reference: BS 7671 Part 1 — Reg 134; manufacturer's installation instructions"
            />

            {/* Professional Recording */}
            <ConceptBlock title="2. Recording Rectification Professionally">
              <p>
                Your answer must be specific and professional. NET assessors want detail that shows
                you understand both the problem and the solution.
              </p>

              <p>
                <strong className="text-elec-yellow">
                  Incorrect Examples (these vague phrases score zero marks):
                </strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>"Fix earth fault"</li>
                <li>"Replace it"</li>
                <li>"Sort out the problem"</li>
                <li>"Repair the connection"</li>
                <li>"Make it work"</li>
              </ul>

              <p>
                <strong className="text-elec-yellow">
                  Professional Examples (specific, actionable, professional):
                </strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  "Reconnect CPC into earth terminal at socket outlet and re-test insulation
                  resistance"
                </li>
                <li>"Replace damaged luminaire with new unit and re-test circuit"</li>
                <li>"Remake loose connection at socket terminal and re-test Zs"</li>
              </ul>
            </ConceptBlock>

            {/* Examples by Fault Type */}
            <ConceptBlock title="3. Examples of Rectification by Fault Type">
              <p>
                <strong>Open Circuit:</strong> "Reconnect line conductor at loose termination, then
                re-test continuity."
              </p>
              <p>
                <strong>Short Circuit:</strong> "Re-terminate damaged cable at luminaire, then
                re-test insulation resistance."
              </p>
              <p>
                <strong>High Resistance Joint:</strong> "Re-make loose connection at socket, then
                re-test Zs."
              </p>
              <p>
                <strong>Polarity Fault:</strong> "Swap conductors into correct terminals, then
                re-test polarity."
              </p>
              <p>
                <strong>Earth Fault:</strong> "Re-terminate line conductor away from earth bar, then
                re-test IR and RCD."
              </p>
              <p>
                <strong>Faulty Accessory:</strong> "Replace defective accessory with new unit, then
                re-test circuit."
              </p>
            </ConceptBlock>

            <InlineCheck
              id={quickCheckQuestions[1].id}
              question={quickCheckQuestions[1].question}
              options={quickCheckQuestions[1].options}
              correctIndex={quickCheckQuestions[1].correctIndex}
              explanation={quickCheckQuestions[1].explanation}
            />

            <Scenario
              title="You found a high-resistance joint at the consumer unit — now write the rectification"
              situation={
                <>
                  Your Zs at SO3 measured 4.2 Ω — well over the 1.37 Ω maximum for the 32A Type B
                  MCB feeding the ring final. After visual inspection at the consumer unit, you
                  found the line conductor termination was loose at the MCB. The assessor asks you
                  to record your rectification.
                </>
              }
              whatToDo={
                <>
                  Write:{' '}
                  <em>
                    "Remake line conductor termination at 32A Type B MCB in consumer unit — re-test
                    ring final R1+Rn continuity, then re-test Zs at SO3 to confirm reading within
                    1.37 Ω maximum for protective device."
                  </em>{' '}
                  Action (remake), Location (32A MCB line terminal in CU), Re-test (continuity + Zs
                  against the named maximum). That's full marks.
                </>
              }
              whyItMatters={
                <>
                  The assessor is reading what you wrote against what an actual EICR or initial
                  certificate would say. Generic phrases like "tighten loose connection" don't
                  identify which connection or which MCB. The 1.37 Ω figure shows you know the BS
                  7671 A4:2026 maximum Zs for that protective device — that's the level of detail
                  that separates pass marks from full marks.
                </>
              }
            />

            {/* Proving Rectification */}
            <ConceptBlock title="4. Proving Rectification (Re-testing)">
              <p>
                After stating rectification, you must also state how you would prove the circuit
                safe again:
              </p>

              <p>
                <strong className="text-elec-yellow">Complete Re-testing Process:</strong>
              </p>
              <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
                <li>Repeat the appropriate test (continuity, IR, polarity, Zs, RCD)</li>
                <li>Confirm results are now within BS 7671 limits</li>
                <li>Record new results on certification</li>
                <li>Leave installation safe before re-energising</li>
              </ol>

              <p>
                <strong className="text-elec-yellow">Test Selection — Common Re-tests:</strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Open circuit</strong> → Continuity test
                </li>
                <li>
                  <strong>Short circuit</strong> → Insulation resistance
                </li>
                <li>
                  <strong>High resistance</strong> → Zs test
                </li>
                <li>
                  <strong>Polarity error</strong> → Polarity test
                </li>
              </ul>

              <p>
                <strong className="text-elec-yellow">Test Selection — Additional Tests:</strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Earth fault</strong> → IR + RCD test
                </li>
                <li>
                  <strong>Faulty RCD</strong> → Full RCD test sequence
                </li>
                <li>
                  <strong>Multiple faults</strong> → Complete test schedule
                </li>
                <li>
                  <strong>New accessory</strong> → All relevant tests
                </li>
              </ul>
            </ConceptBlock>

            {/* Assessor Expectations */}
            <ConceptBlock title="5. Assessor Expectations">
              <p>
                <strong className="text-elec-yellow">Assessors Want to See You:</strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Identify the exact action needed</strong> (not vague wording)
                </li>
                <li>
                  <strong>Link the fault to the correct rectification method</strong>
                </li>
                <li>
                  <strong>State which test proves the repair</strong>
                </li>
                <li>
                  <strong>Record clearly, in writing, for every fault</strong>
                </li>
                <li>
                  <strong>Leave no doubt</strong> that you understand the whole process
                </li>
              </ul>

              <p>
                <strong className="text-elec-yellow">
                  Professional Standards — Communication:
                </strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>Clear, precise language</li>
                <li>Professional terminology</li>
                <li>Complete descriptions</li>
                <li>Logical sequence</li>
              </ul>

              <p>
                <strong className="text-elec-yellow">
                  Professional Standards — Technical Knowledge:
                </strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>Correct repair methods</li>
                <li>Appropriate test selection</li>
                <li>Safety considerations</li>
                <li>Compliance awareness</li>
              </ul>
            </ConceptBlock>

            <InlineCheck
              id={quickCheckQuestions[2].id}
              question={quickCheckQuestions[2].question}
              options={quickCheckQuestions[2].options}
              correctIndex={quickCheckQuestions[2].correctIndex}
              explanation={quickCheckQuestions[2].explanation}
            />

            <RegsCallout
              source="BS 7671 — Regulation 643.1 (Verification after alteration)"
              clause="Where any addition or alteration is made to an existing installation, the part of the installation which has been altered, and any other part of the installation affected, shall be inspected and tested in accordance with the requirements of this Part."
              meaning={
                <>
                  Stating the re-test isn't a formality — it's a regulatory requirement. After ANY
                  rectification, the affected circuit must be re-verified. That's why "Action +
                  Location + Re-test" is the format: it mirrors what you'd do on a real job to
                  comply with BS 7671 Reg 643.1. Skipping the re-test on AM2 isn't just losing marks
                  — it's saying you wouldn't comply with the regs in real life.
                </>
              }
              cite="Reference: BS 7671 Part 6 — Reg 643; IET GN3 Section 7"
            />

            <CommonMistake
              title="Listing the test name without saying what it would prove"
              whatHappens={
                <>
                  You write: "Reconnect CPC at SO2 — re-test continuity." Better than "fix it", but
                  the assessor doesn't know what reading you'd be looking for. Are you re-testing R2
                  against Zs maximums? Continuity to verify low resistance? Without the why, the
                  re-test is just a label.
                </>
              }
              doInstead={
                <>
                  Add the verification target: "Reconnect CPC at SO2 — re-test R2 continuity and Zs
                  at SO2, confirming Zs within 1.37 Ω maximum for 32A Type B." Now the assessor
                  knows you understand both the test AND the pass criterion. Same effort, double the
                  detail, full marks.
                </>
              }
            />

            {/* Advanced Rectification Scenarios */}
            <ConceptBlock title="6. Advanced Rectification Scenarios">
              <p>
                <strong className="text-elec-yellow">Multiple Faults on Same Circuit:</strong>
              </p>
              <p>
                <strong>Example:</strong> Ring final with both open CPC and reversed polarity at
                socket
              </p>
              <p>
                <strong>Rectification:</strong> "1. Reconnect CPC at loose terminal in socket
                backbox. 2. Correct L-N connections at same socket. 3. Re-test continuity and
                polarity for entire ring."
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>List each fault separately with clear numbering</li>
                <li>State logical repair sequence (safety-critical first)</li>
                <li>Include comprehensive re-testing of all affected parameters</li>
              </ul>

              <p>
                <strong className="text-elec-yellow">Cascading Effects:</strong>
              </p>
              <p>
                <strong>Scenario:</strong> Main earthing conductor disconnected affecting multiple
                circuits
              </p>
              <p>
                <strong>Rectification:</strong> "Reconnect main earthing conductor to MET and
                re-test Zs on all affected circuits to confirm earth integrity restored."
              </p>

              <p>
                <strong className="text-elec-yellow">Installation-Specific — TN-S Systems:</strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  "Reconnect equipotential bonding to water service and re-test main bonding
                  continuity"
                </li>
                <li>"Replace corroded earth electrode connection and re-test Ze"</li>
                <li>"Repair PME earth connection at service head"</li>
              </ul>

              <p>
                <strong className="text-elec-yellow">
                  Installation-Specific — Special Locations:
                </strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>"Replace non-IP rated accessory in bathroom with IP44 unit and re-test"</li>
                <li>"Install missing 30mA RCD protection for garden circuit and test operation"</li>
                <li>"Correct supplementary bonding in bathroom and re-test resistance"</li>
              </ul>

              <p>
                <strong className="text-elec-yellow">
                  Cable and Accessory Replacements — When Complete Replacement Needed:
                </strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Damaged cable:</strong> "Replace section of damaged cable between junction
                  boxes A and B with equivalent 2.5mm T&E and re-test complete circuit"
                </li>
                <li>
                  <strong>Wrong cable type:</strong> "Replace non-LSF cable in escape route with LSF
                  equivalent and re-test insulation resistance"
                </li>
                <li>
                  <strong>Undersized cable:</strong> "Replace 1.5mm cable with 2.5mm to meet load
                  requirements and re-test Zs and voltage drop"
                </li>
              </ul>

              <p>
                <strong className="text-elec-yellow">Accessory Standards:</strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>Always specify compliance standards in rectification</li>
                <li>Include IP ratings where relevant</li>
                <li>Specify protective device characteristics if replacing</li>
              </ul>
            </ConceptBlock>

            {/* Documentation and Legal Requirements */}
            <ConceptBlock title="7. Documentation and Legal Requirements">
              <p>
                <strong className="text-elec-yellow">
                  What Must Be Updated Post-Rectification:
                </strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Test results:</strong> All affected test values must be re-recorded
                </li>
                <li>
                  <strong>Circuit details:</strong> Any changes to cable routes, sizes, or
                  accessories
                </li>
                <li>
                  <strong>Protection:</strong> Updates to protective device ratings or types
                </li>
                <li>
                  <strong>Compliance codes:</strong> C1, C2, C3 codes may change after rectification
                </li>
              </ul>

              <p>
                <strong className="text-elec-yellow">Professional Responsibility:</strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>Rectification description becomes part of legal documentation</li>
                <li>Must be sufficient for another electrician to understand</li>
                <li>Creates professional liability for accuracy and completeness</li>
                <li>Insurance claims may depend on quality of documentation</li>
              </ul>

              <p>
                <strong className="text-elec-yellow">Legal and Safety — Duty of Care:</strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>Must identify all safety-critical faults</li>
                <li>Cannot leave dangerous conditions unreported</li>
                <li>Must recommend appropriate remedial action</li>
                <li>Clear communication of urgency levels</li>
              </ul>

              <p>
                <strong className="text-elec-yellow">
                  Legal and Safety — Professional Standards:
                </strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>IET Code of Practice compliance</li>
                <li>BS 7671 rectification requirements</li>
                <li>Building Control notification where required</li>
                <li>Scheme provider reporting obligations</li>
              </ul>
            </ConceptBlock>

            {/* Practical Guidance */}
            <ConceptBlock title="8. Practical Guidance for Success">
              <p>
                <strong className="text-elec-yellow">The Golden Rule:</strong> Always phrase
                rectification as: Action + Location + Re-test
              </p>
              <p>
                <strong>Example:</strong> "Reconnect neutral at CU terminal and re-test continuity
                and polarity."
              </p>

              <p>
                <strong className="text-elec-yellow">Writing Guidelines:</strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>Be concise but specific</li>
                <li>One or two clear sentences is enough</li>
                <li>Don't use slang or shorthand</li>
                <li>Write as if handing over to another electrician</li>
                <li>Always include the re-test stage</li>
              </ul>

              <p>
                <strong className="text-elec-yellow">Common Mistakes to Avoid:</strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>Vague language ("fix", "sort")</li>
                <li>Missing location details</li>
                <li>Forgetting re-test requirements</li>
                <li>Using informal terminology</li>
                <li>Incomplete fault descriptions</li>
              </ul>
            </ConceptBlock>

            {/* Real-World Examples */}
            <ConceptBlock title="9. Real-World Examples">
              <p>
                <strong className="text-elec-yellow">Example 1: Vague Recording</strong>
              </p>
              <p>
                <strong>Candidate wrote:</strong> "Fix polarity."
              </p>
              <p>
                <strong>Result:</strong> Assessor gave 0 marks - too vague.
              </p>
              <p>
                <strong>Should have written:</strong> "Correct line/neutral connections at socket
                outlet and re-test polarity."
              </p>

              <p>
                <strong className="text-elec-yellow">Example 2: Professional Recording</strong>
              </p>
              <p>
                <strong>Scenario:</strong> Candidate diagnosed open CPC fault.
              </p>
              <p>
                <strong>Correctly stated:</strong> "Reconnect CPC at socket and re-test continuity."
              </p>
              <p>
                <strong>Result:</strong> Full marks for clear, professional recording.
              </p>

              <p>
                <strong className="text-elec-yellow">Example 3: Incomplete Recording</strong>
              </p>
              <p>
                <strong>Scenario:</strong> Candidate identified faulty luminaire.
              </p>
              <p>
                <strong>Problem:</strong> Mentioned fault but didn't mention replacement or
                re-testing.
              </p>
              <p>
                <strong>Result:</strong> Lost marks for incomplete rectification description.
              </p>

              <p>
                <strong className="text-elec-yellow">Example 4: Real-World Consequence</strong>
              </p>
              <p>
                <strong>Scenario:</strong> On-site, an electrician repaired a joint but didn't
                re-test Zs.
              </p>
              <p>
                <strong>Problem:</strong> High resistance fault remained hidden, later caused
                equipment failure.
              </p>
              <p>
                <strong>Lesson:</strong> In AM2, skipping the re-test equals lost marks - and in
                real work, potential danger.
              </p>
            </ConceptBlock>

            <FAQ items={faqs} />

            {/* Summary */}
            <ConceptBlock title="11. Section Summary">
              <p>
                <strong className="text-elec-yellow">Rectification in AM2 Means:</strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>State the repair clearly</strong> (e.g. reconnect, replace, remake)
                </li>
                <li>
                  <strong>Specify the location</strong> exactly
                </li>
                <li>
                  <strong>State the re-test</strong> that proves safety
                </li>
                <li>
                  <strong>Use professional language</strong> suitable for certification
                </li>
              </ul>

              <p>
                <strong className="text-elec-yellow">Remember the Complete Cycle:</strong> Diagnose
                → Rectify → Prove Safe
              </p>
            </ConceptBlock>

            <KeyTakeaways
              points={[
                'Format: Action + Location + Re-test. Vague verbs lose marks; specific verbs (reconnect, remake, replace, re-terminate) score them.',
                "You don't physically rectify — you describe and document. AM2 tests diagnosis + documentation, not physical repair.",
                "Reference BS 7671 maximums where you can. 'Within 1.37 Ω for 32A Type B' is stronger than 'within limits'. A4:2026 values matter.",
                "Re-test isn't optional — it's BS 7671 Reg 643.1 compliance. Skipping it caps your marks even if the diagnosis was right.",
                "Multiple faults: list each one separately, numbered, each with its own action/location/re-test. Don't bundle.",
              ]}
            />

            {/* Quiz Section */}
            <div className="border-t border-white/10 pt-8">
              <Quiz
                title="Test Your Knowledge: Proving and Recording Rectification"
                questions={quizQuestions}
              />
            </div>

            {/* Navigation */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Link
                to="/study-centre/apprentice/am2/module5/section3"
                className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous
                </div>
                <div className="mt-1 text-[14px] font-semibold text-white truncate">
                  Test Equipment
                </div>
              </Link>
              <Link
                to="/study-centre/apprentice/am2/module5/section5"
                className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 text-[14px] font-semibold text-black truncate">
                  Common Pitfalls
                </div>
              </Link>
            </div>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default AM2Module5Section4;
