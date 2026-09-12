/**
 * MOET · Module 7 · Section 2 · Subsection 2 — Fault Diagnosis Exercises
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option. This section of Module 7 covers technique for the EPA
 * practical observation rather than a specific piece of engineering
 * knowledge, so no ST1426 knowledge/skill/behaviour statement is quoted
 * here — none of the verified KSB statements checked for this conversion
 * describe assessment-preparation technique.
 *
 * Quiz question 12's explanation says GS38 probe tips need "no more than
 * 2-4 mm exposed" — checked against the primary source
 * (~/Desktop/hav/HSE-GS38-Electrical-test-equipment.pdf, para 9): the actual
 * limit is 4 mm, with a "where practicable" recommendation to reduce this to
 * 2 mm or less. The quiz wording is loose but not factually wrong, and quiz
 * data is preserved byte-identical per the conversion brief regardless.
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt.
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import {
  StudyPage,
  Bleed,
  ReadingProgress,
  TLDR,
  ConceptBlock,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Fault Diagnosis Exercises - MOET Module 7 Section 2.2';
const DESCRIPTION =
  'Systematic fault diagnosis under observation: thinking aloud, using test instruments correctly, documenting findings and time-limited fault finding for the EPA practical assessment.';

const quickCheckQuestions = [
  {
    id: 'systematic-approach',
    question: 'What is the first step in a systematic fault diagnosis approach?',
    options: [
      'Gather information — symptoms, history, when the fault occurred, what changed',
      'Replace the most expensive component first to rule it out',
      'Begin an insulation resistance test on every conductor at once',
      'Energise the circuit and observe which protective device trips',
    ],
    correctIndex: 0,
    explanation:
      'Systematic fault diagnosis always starts with information gathering. Understanding the symptoms, history, and context narrows the search area and prevents wasted time testing irrelevant parts of the system. This logical approach is what the assessor is looking for.',
  },
  {
    id: 'thinking-aloud',
    question: "Why is 'thinking aloud' important during the EPA fault diagnosis observation?",
    options: [
      'It speeds up the diagnosis by skipping unnecessary tests',
      'It allows the assessor to complete the diagnosis on your behalf',
      'It is the only way to record readings without writing them down',
      'It lets the assessor follow your reasoning and confirm a systematic approach',
    ],
    correctIndex: 3,
    explanation:
      'Thinking aloud lets the assessor assess your diagnostic reasoning, not just the outcome. Even if you take longer to find the fault, demonstrating a logical, systematic approach scores higher than finding the fault by luck without a clear method.',
  },
  {
    id: 'documenting-findings',
    question: 'Why should you document your findings during fault diagnosis?',
    options: [
      'Documentation removes the need to verify the repair afterwards',
      'Documentation is only required if the fault cannot be rectified',
      'It evidences systematic work, aids client reporting, and records the work for future maintenance',
      'Documentation allows you to claim a longer time allocation from the assessor',
    ],
    correctIndex: 2,
    explanation:
      'Documenting findings demonstrates professionalism, provides evidence for the assessor, creates a maintenance record, and enables clear communication with supervisors and clients. It is a key professional behaviour assessed in the EPA.',
  },
  {
    id: 'half-split-advantage',
    question: 'What is the main advantage of the half-split fault-finding technique?',
    options: [
      'It allows the circuit to be tested while still live and energised',
      'It halves the fault search area with each test, cutting diagnostic time',
      'It removes the need to understand the circuit diagram beforehand',
      'It guarantees the fault will be found on the very first measurement',
    ],
    correctIndex: 1,
    explanation:
      'The half-split technique reduces the fault search area by half with each measurement. For a circuit with 16 possible fault locations, you need at most 4 tests to pinpoint the fault (compared to up to 16 tests with a sequential approach). This efficiency is valued in the EPA where time is limited.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'The systematic approach to fault diagnosis follows which general sequence?',
    options: [
      'Rectify, verify, test, identify, analyse, gather information',
      'Gather information, analyse, test, identify, rectify, verify',
      'Replace components, energise, observe, document, repeat',
      'Isolate, lock off, prove dead, repair, re-energise, leave site',
    ],
    correctAnswer: 1,
    explanation:
      'The systematic approach follows: gather information (symptoms, history), analyse (narrow down possible causes), test (use instruments to confirm), identify (pinpoint the fault), rectify (repair or replace), and verify (confirm the system works correctly after repair).',
  },
  {
    id: 2,
    question: 'During the EPA observation, the assessor values a logical approach because:',
    options: [
      'It is the fastest way to find any fault regardless of method',
      'It avoids the need to use test instruments during the assessment',
      'It proves competence to diagnose any fault, not just familiar ones',
      'It allows the candidate to skip the verification stage of the repair',
    ],
    correctAnswer: 2,
    explanation:
      'A logical, systematic approach is transferable to any fault situation. The assessor wants to confirm you can diagnose unfamiliar faults, not just ones you have seen before. The method demonstrates the underpinning knowledge and analytical skills required by ST1426.',
  },
  {
    id: 3,
    question: 'When using a multimeter for fault diagnosis, you should first:',
    options: [
      'Set it to the highest current range and probe likely points',
      'Apply it to the live circuit in resistance mode to save time',
      'Record the fault as found before taking any measurement',
      'Select the correct function and range, check the leads, and confirm the meter reads correctly',
    ],
    correctAnswer: 3,
    explanation:
      'Correct instrument selection, function/range setting, lead inspection, and verification are essential. Using the wrong function (e.g., resistance mode on a live circuit) can damage the meter and give misleading readings. This basic competence is assessed during the observation.',
  },
  {
    id: 4,
    question: 'If you cannot find the fault within the allocated time, you should:',
    options: [
      'Explain what you have done, what you have ruled out, and your next steps',
      'Quietly stop and wait for the assessor to reveal the fault',
      'Start again from the beginning using a completely different method',
      'Replace components one by one until the system works again',
    ],
    correctAnswer: 0,
    explanation:
      'The assessor assesses your method and approach, not just the outcome. Clearly explaining your systematic process, what you have eliminated, and your planned next steps demonstrates competence even if time runs out. A logical approach with an incomplete result can still achieve a pass.',
  },
  {
    id: 5,
    question: "A 'half-split' technique in fault diagnosis involves:",
    options: [
      'Testing every component in turn from one end of the circuit',
      'Testing at the midpoint of a system to determine which half contains the fault, then repeating',
      'Splitting the supply voltage in half to reduce shock risk during testing',
      'Dividing the work between two technicians to halve the diagnosis time',
    ],
    correctAnswer: 1,
    explanation:
      'The half-split technique efficiently narrows the fault location by testing at the midpoint of a circuit or system. If the test is normal at the midpoint, the fault is in the second half; if abnormal, it is in the first half. Repeating this halves the search area each time.',
  },
  {
    id: 6,
    question: 'When documenting fault diagnosis findings, you should record:',
    options: [
      'Only the final fault and the part number of the replacement component',
      'Just the time taken so the assessor can judge your speed',
      'Symptoms, tests, readings, fault found, repair done, and verification',
      'A note that the system is now working, with no further detail',
    ],
    correctAnswer: 2,
    explanation:
      'Comprehensive documentation provides a complete record of the diagnostic process. This evidence supports your EPA assessment, aids future maintenance, and demonstrates the professional reporting skills required by ST1426.',
  },
  {
    id: 7,
    question: 'Insulation resistance testing during fault diagnosis requires:',
    options: [
      'The circuit to remain live so a true working voltage is applied',
      'All RCDs and electronic devices to be left connected in circuit',
      'A low test voltage of 12 V DC to avoid damaging the conductors',
      'The circuit to be de-energised, disconnected from sensitive equipment, and all switches closed',
    ],
    correctAnswer: 3,
    explanation:
      'IR testing applies a high voltage (typically 500 V DC for LV circuits) so the circuit must be dead and sensitive equipment (RCDs, electronic devices) disconnected. Switches should be closed so the full circuit is tested. These preparation steps demonstrate competence to the assessor.',
  },
  {
    id: 8,
    question:
      "A continuity test reading of 'OL' (over limit) on a circuit that should be continuous indicates:",
    options: [
      'An open circuit — a break in the conductor somewhere in the circuit',
      'A short circuit between line and neutral conductors',
      'A healthy circuit with very low conductor resistance',
      'An earth fault between the line conductor and earth',
    ],
    correctAnswer: 0,
    explanation:
      'An OL reading means infinite or very high resistance — indicating a break (open circuit) in the conductor. This could be a broken wire, loose connection, blown fuse, or open switch. Your next step would be to use the half-split technique to locate the break.',
  },
  {
    id: 9,
    question: 'Before starting fault diagnosis on a motor control circuit, you should:',
    options: [
      'Replace the contactor as the most common point of failure',
      'Review the circuit diagram, understand the intended operation, and identify test points',
      'Energise the motor to observe how it behaves under fault conditions',
      'Disconnect all conductors before establishing the intended operation',
    ],
    correctAnswer: 1,
    explanation:
      "Understanding the circuit's intended operation is essential before you can diagnose what is wrong. Reviewing the diagram identifies test points, expected readings, and the logical sequence of operation. Without this understanding, testing is random rather than systematic.",
  },
  {
    id: 10,
    question:
      'The EPA practical observation for fault diagnosis typically expects you to demonstrate:',
    options: [
      'Encyclopaedic recall of every possible fault on the equipment',
      'The fastest possible diagnosis regardless of the method used',
      'A systematic diagnostic method, safe working practices, correct use of instruments, and clear communication',
      'The ability to repair the fault without any test instruments',
    ],
    correctAnswer: 2,
    explanation:
      'The assessor evaluates your approach and methodology, not encyclopaedic knowledge. Demonstrating a systematic method, safe practices, correct instrument use, and clear communication of your findings meets the EPA requirements for competence.',
  },
  {
    id: 11,
    question: "When using the 'input-to-output' fault-finding technique on a control system, you:",
    options: [
      'Start at the output and replace each component working backwards',
      'Test only the input and output, ignoring the stages in between',
      'Test at the midpoint first to halve the search area each time',
      'Check the input first, then trace the signal through each stage to where it is lost',
    ],
    correctAnswer: 3,
    explanation:
      'The input-to-output technique follows the signal path from sensor/input through the controller to the actuator/output. By checking at each stage, you identify precisely where the signal chain is broken. This is particularly effective for PLC-based systems where you can observe I/O status indicators.',
  },
  {
    id: 12,
    question: 'A GS38-compliant voltage indicator used during fault diagnosis must have:',
    options: [
      'Fused leads, finger guards, shrouded tips, and proving before and after use',
      'Unfused leads and long bare probe tips for easier access to terminals',
      'A built-in battery check that removes the need to prove on a known source',
      'A single combined probe so testing can be carried out one-handed',
    ],
    correctAnswer: 0,
    explanation:
      'GS38 specifies safety requirements for test instruments. Voltage indicators must have fused leads, finger guards, probe tips with no more than 2-4 mm exposed, and be proved on a known source before and after testing (prove-test-prove). Using non-compliant instruments in the EPA would be a safety failure.',
  },
];

const faqs = [
  {
    question: 'What types of faults might I encounter in the EPA practical?',
    answer:
      'Common faults include: open circuits (broken conductors, loose connections), short circuits, earth faults, incorrect wiring, component failures (contactors, relays, fuses), and control system faults. The specific faults depend on your EPAO, but a systematic approach works for all types. Practise with a variety of fault types during your preparation.',
  },
  {
    question: 'Should I use a specific fault-finding method or can I use my own approach?',
    answer:
      "You should use a recognised systematic approach (e.g., the six-step method: gather, analyse, test, identify, rectify, verify). Your personal approach is fine as long as it is logical and systematic. The assessor wants to see method, not a specific prescribed procedure. Avoid random 'trial and error' — this is not considered systematic.",
  },
  {
    question: 'How much time is typically allowed for fault diagnosis in the EPA?',
    answer:
      'Time allocations vary by EPAO and the complexity of the fault. Typically 20-40 minutes per fault diagnosis exercise. Your training provider should confirm the expected timing. Practise working within these time limits so you are not caught out on the day.',
  },
  {
    question: 'What if I misidentify the fault?',
    answer:
      'If you identify the wrong fault but demonstrated a systematic approach, safe working, and correct instrument use, you may still achieve a pass for your method and process. However, correctly identifying and rectifying the fault is needed for higher marks. If you realise your diagnosis is wrong, explain your revised reasoning — self-correction demonstrates competence.',
  },
  {
    question: 'Can I ask the assessor for help during fault diagnosis?',
    answer:
      "No. The assessor observes but does not assist. You may ask clarifying questions about the task brief (e.g., 'What symptoms were reported?') but not diagnostic guidance. Treat the assessor as a client who reported the fault — they can describe symptoms but cannot diagnose it for you.",
  },
  {
    question: 'What test instruments should I be confident using before the EPA?',
    answer:
      'You should be proficient with a GS38-compliant voltage indicator, a digital multimeter (voltage, resistance, continuity), an insulation resistance tester, and a clamp meter. Know how to select the correct instrument, set the function and range, interpret readings, and perform the prove-test-prove procedure. Practise with the specific instruments you will use on the day.',
  },
];

const MOETModule7Section2_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 7 · Section 7.2 · Subsection 2"
        title="Fault Diagnosis Exercises"
        backTo="/study-centre/apprentice/m-o-e-t-module7-section2"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Systematic fault finding under observation with clear communication and documentation.
          </p>

          <TLDR
            points={[
              'Method: gather, analyse, test, identify, rectify, verify.',
              'Think aloud: explain reasoning as you work.',
              'Instruments: correct selection, safe use, accurate readings.',
              'Document: record symptoms, tests, findings, repair.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply the six-step systematic fault diagnosis method under observation',
              'Use the thinking-aloud technique to demonstrate reasoning to the assessor',
              'Select and use appropriate test instruments safely and correctly',
              'Apply the half-split technique to efficiently locate fault positions',
              'Document all findings clearly for evidence and reporting purposes',
              'Manage time effectively during fault diagnosis within EPA time limits',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="Electrical maintenance context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Techniques:</strong> half-split, input-to-output, unit substitution.
              </li>
              <li>
                <strong>Safety:</strong> safe isolation before testing dead circuits.
              </li>
              <li>
                <strong>Instruments:</strong> multimeter, insulation tester, clamp meter.
              </li>
              <li>
                <strong>ST1426:</strong> fault diagnosis is a core EPA competence.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>The systematic fault diagnosis method</ContentEyebrow>

          <ConceptBlock title="The systematic fault diagnosis method">
            <p>
              Fault diagnosis is not guesswork — it is a structured, logical process that applies to
              any electrical system. The six-step method provides a framework that ensures thorough,
              efficient diagnosis regardless of the system&apos;s complexity. During the EPA, the
              assessor wants to see this structured approach in action, not lucky guesses or random
              component swapping.
            </p>
            <p>
              The importance of systematic fault finding cannot be overstated. In industry, a
              technician who can methodically diagnose any fault — even on equipment they have never
              seen before — is far more valuable than one who can only fix familiar problems. The
              EPA is designed to assess this transferable competence.
            </p>
          </ConceptBlock>

          <ConceptBlock title="The six-step method">
            <ol className="list-decimal space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Gather information:</strong> symptoms reported, when did it start, what
                changed, any previous faults, review documentation and circuit diagrams.
              </li>
              <li>
                <strong>Analyse:</strong> based on the information, develop a list of possible
                causes ranked by likelihood.
              </li>
              <li>
                <strong>Test:</strong> use appropriate instruments to test the most likely cause
                first, working systematically through your list.
              </li>
              <li>
                <strong>Identify:</strong> confirm the specific fault based on your test results.
              </li>
              <li>
                <strong>Rectify:</strong> repair, replace, or adjust to correct the fault.
              </li>
              <li>
                <strong>Verify:</strong> test the system to confirm it is working correctly after
                the repair.
              </li>
            </ol>
          </ConceptBlock>

          <ConceptBlock title="Common fault types in electrical maintenance">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Fault type</th>
                    <th className="py-2 pr-4 font-medium text-white">Symptoms</th>
                    <th className="py-2 font-medium text-white">Key test</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Open circuit</td>
                    <td className="py-2 pr-4">No power, partial operation</td>
                    <td className="py-2">Continuity test</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Short circuit</td>
                    <td className="py-2 pr-4">Blown fuse, tripped MCB</td>
                    <td className="py-2">Insulation resistance</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Earth fault</td>
                    <td className="py-2 pr-4">RCD tripping</td>
                    <td className="py-2">Insulation resistance L-E, N-E</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">High resistance joint</td>
                    <td className="py-2 pr-4">Overheating, intermittent</td>
                    <td className="py-2">Thermal imaging, resistance test</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Component failure</td>
                    <td className="py-2 pr-4">System not operating correctly</td>
                    <td className="py-2">Functional test, coil resistance</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <CommonMistake
            title="Never skip the verify step"
            whatHappens={
              <>
                A common mistake is declaring the fault fixed after the repair without verification
                testing. In the EPA, skipping verification is a significant mark deduction.
              </>
            }
            doInstead={
              <>
                Always test the system after repair to confirm correct operation. This includes
                functional testing under normal operating conditions.
              </>
            }
          />

          <p className="text-[14.5px] leading-relaxed text-white">
            <strong>Key point:</strong> the assessor is not expecting you to find the fault
            instantly. They are looking for a methodical approach, safe working, and clear
            communication throughout the process.
          </p>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Thinking aloud and communication</ContentEyebrow>

          <ConceptBlock title="Thinking aloud and communication">
            <p>
              During the EPA practical observation, the assessor cannot read your mind. Without
              verbal communication, they can only see what you do — not why you are doing it.
              Thinking aloud bridges this gap and is the single most effective way to demonstrate
              your diagnostic competence. Candidates who think aloud consistently score higher than
              those who work in silence.
            </p>
            <p>
              This does not mean providing a running commentary on every tiny action. The key is to
              communicate at decision points — when you are reasoning about what to test next,
              interpreting a reading, or ruling out a possible cause. This shows the assessor your
              analytical process.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Effective thinking-aloud phrases">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>&quot;Based on the symptoms, I suspect the fault could be... because...&quot;</li>
              <li>
                &quot;I&apos;m going to test at this point first because it will tell me which half
                of the circuit the fault is in.&quot;
              </li>
              <li>&quot;This reading of [value] tells me that... which rules out...&quot;</li>
              <li>
                &quot;I&apos;ve eliminated [cause] so I&apos;m now going to check [next likely
                cause].&quot;
              </li>
              <li>
                &quot;The fault is located at... and is caused by... I will now rectify by...&quot;
              </li>
              <li>
                &quot;Before energising, I need to check... to ensure it is safe to proceed.&quot;
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Communication quality: pass vs distinction">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Aspect</th>
                    <th className="py-2 pr-4 font-medium text-white">Pass level</th>
                    <th className="py-2 font-medium text-white">Distinction level</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Reasoning</td>
                    <td className="py-2 pr-4">States what they are testing</td>
                    <td className="py-2">
                      Explains why they chose this test and what it will confirm or eliminate
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Readings</td>
                    <td className="py-2 pr-4">Reports the reading obtained</td>
                    <td className="py-2">
                      Interprets the reading, compares to expected values, draws conclusions
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Progress</td>
                    <td className="py-2 pr-4">Moves to next test without comment</td>
                    <td className="py-2">Summarises what has been ruled out and what remains</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <CommonMistake
            title="Balance is key"
            whatHappens={
              <>
                Narrating every tiny action (&quot;Now I&apos;m picking up my screwdriver&quot;)
                buries the reasoning the assessor actually needs to hear under noise.
              </>
            }
            doInstead={
              <>
                Think aloud at key decision points. Focus on explaining your reasoning at diagnostic
                decision points: why you are testing here, what the reading means, and what it tells
                you about the fault location.
              </>
            }
          />

          <p className="text-[14.5px] leading-relaxed text-white">
            <strong>Key point:</strong> a candidate who thinks aloud and demonstrates clear
            reasoning will score higher than one who silently finds the fault. The method matters as
            much as the result.
          </p>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Using test instruments correctly</ContentEyebrow>

          <ConceptBlock title="Using test instruments correctly">
            <p>
              Correct instrument selection and use is fundamental to fault diagnosis. The assessor
              will observe whether you choose the right instrument, set it correctly, use it safely,
              and interpret the readings accurately. Instrument competence is not just about getting
              a number — it is about understanding what that number means in the context of your
              diagnosis.
            </p>
            <p>
              Before the EPA, ensure you are confident with every instrument you might need.
              Practise not just taking readings, but explaining to someone else what the reading
              means and how it informs your next step. This is exactly what the assessor wants to
              hear.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Instrument selection guide">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Test required</th>
                    <th className="py-2 pr-4 font-medium text-white">Instrument</th>
                    <th className="py-2 font-medium text-white">Circuit state</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Voltage presence</td>
                    <td className="py-2 pr-4">Voltage indicator / multimeter</td>
                    <td className="py-2">Live (with care)</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Continuity</td>
                    <td className="py-2 pr-4">Low-resistance ohmmeter / multimeter</td>
                    <td className="py-2">Dead and isolated</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Insulation resistance</td>
                    <td className="py-2 pr-4">Insulation resistance tester</td>
                    <td className="py-2">Dead and isolated</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Current flow</td>
                    <td className="py-2 pr-4">Clamp meter</td>
                    <td className="py-2">Live (non-contact)</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Earth fault loop</td>
                    <td className="py-2 pr-4">Loop impedance tester</td>
                    <td className="py-2">Live</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="The prove-test-prove procedure">
            <p>
              Before using a voltage indicator to confirm a circuit is dead, you must follow the
              prove-test-prove sequence. This is a safety-critical procedure that the assessor will
              specifically look for.
            </p>
            <ol className="list-decimal space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Prove:</strong> test the voltage indicator on a known live source to confirm
                it is working correctly.
              </li>
              <li>
                <strong>Test:</strong> use the proven instrument to test the isolated circuit —
                confirm no voltage is present on all conductors.
              </li>
              <li>
                <strong>Prove:</strong> test the instrument again on the known source to confirm it
                is still working — this rules out instrument failure during the test.
              </li>
            </ol>
          </ConceptBlock>

          <CommonMistake
            title="GS38 compliance is non-negotiable"
            whatHappens={
              <>
                Using non-compliant instruments is a safety failure that can result in a fail grade.
              </>
            }
            doInstead={
              <>
                All test instruments used in the EPA must comply with GS38 guidance. This includes:
                fused test leads, finger guards on probes, protected probe tips with maximum 4 mm
                exposed, and Category III or IV rating for LV work.
              </>
            }
          />

          <p className="text-[14.5px] leading-relaxed text-white">
            <strong>Key point:</strong> always check your instrument is suitable for the
            measurement, set to the correct function and range, and in good condition before use.
            Explain your instrument selection to the assessor.
          </p>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Documentation and reporting</ContentEyebrow>

          <ConceptBlock title="Documentation and reporting">
            <p>
              Professional documentation of your fault diagnosis process and findings is an
              important part of the EPA assessment. It demonstrates that you can communicate
              technical information clearly and create records suitable for maintenance management
              systems. Good documentation also shows the assessor that you understand the broader
              context of maintenance work — records enable future technicians to learn from your
              diagnosis.
            </p>
          </ConceptBlock>

          <ConceptBlock title="What to record">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Date, time, location:</strong> basic identification of the job.
              </li>
              <li>
                <strong>Reported symptoms:</strong> what was the problem as described?
              </li>
              <li>
                <strong>Tests performed:</strong> what did you test, with what instrument, and what
                readings did you get?
              </li>
              <li>
                <strong>Fault identified:</strong> what was the root cause?
              </li>
              <li>
                <strong>Repair carried out:</strong> what did you do to fix it?
              </li>
              <li>
                <strong>Verification:</strong> how did you confirm the repair was successful?
              </li>
              <li>
                <strong>Recommendations:</strong> any follow-up actions or preventive measures
                suggested.
              </li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="Worked example: fault report entry"
            situation={
              <>
                <strong>Date/Time:</strong> 15/01/2026, 09:30. <strong>Location:</strong> Workshop
                3, Motor Control Panel MCC-04. <strong>Reported fault:</strong> conveyor belt motor
                will not start from push-button station. <strong>Initial checks:</strong> control
                supply present (24 V DC confirmed at panel). Emergency stop released. Guard
                interlock closed (confirmed by LED indicator).
              </>
            }
            whatToDo={
              <>
                <p>
                  <strong>Tests:</strong> checked voltage at start button — 24 V present. Pressed
                  start — no voltage at contactor coil terminal A1. Continuity tested start button
                  contacts — OL (open circuit). Push-button mechanism found seized.
                </p>
                <p>
                  <strong>Fault:</strong> start push-button NO contact failed open (mechanical
                  seizure).
                </p>
                <p>
                  <strong>Repair:</strong> replaced start push-button unit. Like-for-like
                  replacement (Schneider XB5AA31).
                </p>
                <p>
                  <strong>Verification:</strong> start/stop function tested — motor starts and stops
                  correctly. Overload trip tested — resets correctly.
                </p>
                <p>
                  <strong>Recommendation:</strong> add push-button inspection to quarterly PPM
                  schedule.
                </p>
              </>
            }
          />

          <ConceptBlock
            title="Reporting and ST1426"
            onSite="Clear technical reporting is a key skill assessed across multiple KSBs in the maintenance technician standard. Good documentation during the EPA demonstrates professionalism and communication competence."
          >
            <p>
              A worked report like the one above is what a completed CMMS or job-card entry should
              look like: specific values, specific part numbers, and a clear line from symptom to
              root cause to verified fix.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Time management and practical strategies</ContentEyebrow>

          <ConceptBlock title="Time management and practical strategies">
            <p>
              The EPA fault diagnosis exercise is time-limited, typically 20-40 minutes depending on
              the complexity of the fault and the EPAO&apos;s specification. Managing your time
              effectively within this window is a skill in itself. Candidates who run out of time
              often do so because they did not structure their approach from the outset.
            </p>
            <p>
              Effective time management does not mean rushing. It means working efficiently —
              spending your time on the most productive diagnostic steps first. A well-structured
              approach naturally leads to efficient use of time because you are not wasting effort
              on unnecessary tests.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Time allocation guide (30-minute exercise)">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Minutes 1-3:</strong> read the brief, review drawings, gather information
                from the task description.
              </li>
              <li>
                <strong>Minutes 3-5:</strong> analyse the information, form a list of likely causes,
                plan your first tests.
              </li>
              <li>
                <strong>Minutes 5-20:</strong> systematic testing — work through your diagnostic
                plan, thinking aloud.
              </li>
              <li>
                <strong>Minutes 20-25:</strong> rectify the fault and carry out verification
                testing.
              </li>
              <li>
                <strong>Minutes 25-30:</strong> complete documentation and tidy the work area.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Practical strategies for EPA day">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Prepare your tools:</strong> lay out your instruments and tools neatly
                before starting — this saves time searching later.
              </li>
              <li>
                <strong>Test the most likely cause first:</strong> do not start with the least
                likely — base your test order on experience and analysis.
              </li>
              <li>
                <strong>Use the half-split technique:</strong> when the fault could be in a long
                circuit, test the midpoint first to halve the search area.
              </li>
              <li>
                <strong>Do not get fixated:</strong> if a test rules out your primary theory, accept
                it and move on to the next possibility.
              </li>
              <li>
                <strong>Keep notes as you go:</strong> brief notes prevent you from repeating tests
                and help with your final report.
              </li>
              <li>
                <strong>Leave time for verification:</strong> do not spend all your time diagnosing
                and have no time to test the repair.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="If time runs out">
            <p>
              If you have not completed the diagnosis within the time limit, do not panic. Calmly
              explain to the assessor: what you have done so far, what you have ruled out, what your
              current working theory is, and what your next steps would be. A clear, logical summary
              demonstrates competence even without a completed diagnosis. The assessor assesses your
              method, not just the outcome.
            </p>
            <p>
              <strong>Key point:</strong> practise fault diagnosis exercises under timed conditions
              before the EPA. The more you practise working within time limits, the more natural
              your time management becomes. Ask your training provider to set up realistic fault
              scenarios with a timer.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Quick reference — fault diagnosis essentials">
            <p>
              <strong>Six-step method:</strong> gather information, analyse and prioritise causes,
              test systematically, identify the root cause, rectify the fault, verify correct
              operation.
            </p>
            <p>
              <strong>Key instruments:</strong> voltage indicator (GS38-compliant), digital
              multimeter, insulation resistance tester, clamp meter, proving unit. Always:
              prove-test-prove.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'Six-step method: gather, analyse, test, identify, rectify, verify — in that order, every time.',
              'Think aloud at decision points, not on every micro-action. The assessor grades reasoning, not narration.',
              'Never skip the verify step, and never skip re-proving your voltage indicator.',
              'Document symptoms, tests, fault, repair, verification and recommendations — specific values, not vague notes.',
              'Time management means testing the most likely cause first and leaving time for verification, never rushing safety.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Test Your Knowledge — Fault Diagnosis" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module7-section2-1')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Safe Isolation and Testing Routines
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module7-section2-3')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Component Replacement and Repair
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule7Section2_2;
