/**
 * MOET · Module 7 · Section 2 · Subsection 1 — Safe Isolation and Testing Routines
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option. This section of Module 7 covers technique for the EPA
 * practical observation rather than a specific piece of engineering
 * knowledge, so no ST1426 knowledge/skill/behaviour statement is quoted
 * here — none of the verified KSB statements checked for this conversion
 * describe assessment-preparation technique.
 *
 * ✅ ACCURACY CHECKED: this page's GS38 figures (4 mm max exposed probe tip,
 * finger guards, fuses "usually not exceeding 500 mA") were verified against
 * the primary source held at ~/Desktop/hav/HSE-GS38-Electrical-test-equipment.pdf
 * (GS38, 4th edition, para 9) and are CORRECT — nothing changed. The 2 mm
 * figure the source mentions is GS38's own "where practicable" recommendation
 * to go BELOW the 4 mm maximum, not a separate limit, and this page does not
 * claim otherwise.
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
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  Prerequisites,
  ContentEyebrow,
  SectionRule,
  VideoCard,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Safe Isolation and Testing Routines - MOET Module 7 Section 2.1';
const DESCRIPTION =
  'Demonstrating safe isolation to an EPA assessor: prove-test-prove sequence, GS38 compliance, explaining actions aloud and time management during practical observation.';

const quickCheckQuestions = [
  {
    id: 'prove-test-prove',
    question: "What is the correct sequence for the 'prove-test-prove' procedure?",
    options: [
      'Test the circuit for dead, prove the indicator on a live source, then re-test the circuit',
      'Prove the indicator on the dead circuit, test a live source, then prove the dead circuit again',
      'Lock off the circuit, test for dead, then apply a danger notice at the point of isolation',
      'Prove the voltage indicator works on a known live source, test the circuit for dead, prove the indicator still works on the known source',
    ],
    correctIndex: 3,
    explanation:
      "The prove-test-prove sequence ensures your voltage indicator is working correctly before and after testing the circuit. You prove on a known live source (or proving unit), test the isolated circuit for dead, then re-prove the indicator works. This confirms the 'dead' reading was genuine, not due to a faulty instrument.",
  },
  {
    id: 'gs38-compliance',
    question:
      'According to GS38, what is the maximum exposed probe tip length for a voltage indicator used on LV systems?',
    options: [
      '12 mm with no finger guards required',
      '4 mm with finger guards or barriers',
      '25 mm with insulated sleeving',
      '40 mm with a spring-loaded tip',
    ],
    correctIndex: 1,
    explanation:
      'GS38 specifies that probe tips should have a maximum of 4 mm exposed metal, with finger guards or barriers to prevent accidental contact with live parts. This is a key safety requirement that assessors will check during the practical observation.',
  },
  {
    id: 'assessor-explanation',
    question:
      'Why is it important to explain your actions aloud during the EPA practical observation?',
    options: [
      'Because the assessor is not allowed to watch you work, only to listen to your account',
      'Because talking is the only way to make up time if the practical task is running late',
      'To demonstrate to the assessor that you understand the reasoning behind each step, not just the actions',
      'Because silence during the task automatically results in an immediate fail',
    ],
    correctIndex: 2,
    explanation:
      'Explaining your actions demonstrates competence beyond physical skill. It shows the assessor that you understand why each step is necessary — the safety reasoning, the regulatory requirements, and the technical principles. This is the difference between performing a procedure and truly understanding it.',
  },
  {
    id: 'three-phase-isolation',
    question:
      'When isolating a three-phase circuit, you must test between which conductor combinations?',
    options: [
      'All phase-to-phase combinations (L1-L2, L2-L3, L1-L3), all phase-to-neutral, and all phase-to-earth combinations',
      'Only L1 to neutral, since proving one phase dead confirms the whole supply is dead',
      'Only the three phase-to-phase combinations, as neutral and earth cannot become live',
      'Only each phase to earth, because phase-to-phase testing is unnecessary once earthed',
    ],
    correctIndex: 0,
    explanation:
      'For a three-phase circuit, all conductor combinations must be tested to confirm the circuit is dead: L1-L2, L2-L3, L1-L3, L1-N, L2-N, L3-N, L1-E, L2-E, L3-E, and N-E. Missing any combination could mean a conductor remains live despite appearing dead on the tested pairs. This thoroughness is what the assessor expects to see.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'The first step in a safe isolation procedure is to:',
    options: [
      'Switch off and lock off the supply before doing anything else',
      'Identify the circuit to be isolated and obtain authorisation',
      'Prove the voltage indicator on a known live source',
      'Apply a danger notice to the consumer unit',
    ],
    correctAnswer: 1,
    explanation:
      'Before any physical actions, you must correctly identify the specific circuit to be isolated and obtain authorisation (e.g., from the authorised person or through a permit to work). Working on the wrong circuit is a common and potentially fatal error.',
  },
  {
    id: 2,
    question: 'After switching off and locking off a circuit, the next step is to:',
    options: [
      'Begin removing accessories so the dead test can be carried out at the terminals',
      'Remove the danger notice now that the circuit is locked off',
      'Prove the voltage indicator on a known live source, then test the circuit for dead',
      'Reconnect the supply briefly to confirm the correct circuit was switched off',
    ],
    correctAnswer: 2,
    explanation:
      'After isolation and lock-off, you must prove your voltage indicator works (on a known live source or proving unit), test the isolated circuit for dead, and then re-prove the indicator. Only after this prove-test-prove sequence can you confirm the circuit is safe to work on.',
  },
  {
    id: 3,
    question: 'A GS38-compliant voltage indicator should have:',
    options: [
      'Unfused leads and long bare probe tips for easier contact with terminals',
      'A single probe and a flashing light to indicate the presence of voltage',
      'A built-in proving function that removes the need to prove on a separate source',
      'Fused leads, finger guards, max 4 mm exposed probe tips, and CAT III/IV rating',
    ],
    correctAnswer: 3,
    explanation:
      'GS38 requires: fused test leads (typically 500 mA HRC fuses), finger guards or barriers on probes, maximum 4 mm exposed conductive tip, robust insulation, and appropriate CAT rating for the voltage level. These requirements prevent accidental contact and limit fault energy.',
  },
  {
    id: 4,
    question: 'During the EPA practical observation, the assessor is primarily assessing:',
    options: [
      'Your competence in performing the task safely, correctly and with understanding',
      'How quickly you can complete the task compared with other candidates',
      'Whether you use the most expensive test equipment available',
      'Your ability to recall every regulation number from memory without notes',
    ],
    correctAnswer: 0,
    explanation:
      'The assessor evaluates competence — can you perform the task safely, correctly, and do you understand why each step is necessary? Speed is not the primary criterion; safe, methodical work with clear understanding is what achieves pass and distinction grades.',
  },
  {
    id: 5,
    question:
      "If your voltage indicator fails the 'prove' test (does not indicate on the known live source), you should:",
    options: [
      'Carry on and test the circuit anyway, since the circuit is already isolated',
      'Stop, do not proceed with testing, and obtain a replacement indicator that passes the prove test',
      'Tap the indicator and try again until it gives a reading',
      'Use a multimeter on a different setting to confirm the indicator is faulty',
    ],
    correctAnswer: 1,
    explanation:
      "If the voltage indicator fails the prove test, it cannot be relied upon to give accurate readings. You must stop and obtain a working replacement. Using a suspect instrument could give a false 'dead' reading on a live circuit — with potentially fatal consequences.",
  },
  {
    id: 6,
    question: 'Lock-off devices are used to:',
    options: [
      'Indicate the rated current of the circuit being isolated',
      'Discharge any stored energy in the circuit before work begins',
      'Physically prevent the isolator from being switched back on, with only the person who applied it able to remove it',
      'Confirm electronically that the circuit has been proved dead',
    ],
    correctAnswer: 2,
    explanation:
      'Lock-off devices (locks, hasps, multi-lock devices) physically prevent re-energisation. Each person working on the circuit applies their own lock — the circuit cannot be re-energised until every lock is removed. This is a fundamental safety control in the LOTO procedure.',
  },
  {
    id: 7,
    question: 'When explaining your safe isolation actions to the assessor, you should:',
    options: [
      'Keep silent and let your hands do the talking to avoid breaking concentration',
      'Only speak if the assessor asks you a direct question',
      'Summarise everything in one statement at the end of the task',
      'Explain each step as you perform it, including the safety reason for the step and any relevant regulation',
    ],
    correctAnswer: 3,
    explanation:
      'Proactive explanation as you work demonstrates genuine understanding. State what you are doing, why you are doing it, and reference relevant standards (GS38, EAWR Reg 14, BS 7671). This running commentary helps the assessor assess both your practical competence and underpinning knowledge.',
  },
  {
    id: 8,
    question: "The danger zone notice ('Danger — Do Not Switch On') should be placed:",
    options: [
      'At the point of isolation where the lock-off device is applied',
      'On the item of equipment being worked on, away from the isolator',
      'At the main intake position regardless of which circuit is isolated',
      'In the site office records only, not on the installation itself',
    ],
    correctAnswer: 0,
    explanation:
      'The danger notice must be placed at the point of isolation (the isolator or switch that has been locked off) so that anyone approaching it can see that the circuit has been deliberately isolated and must not be re-energised. It is a visual warning complementing the physical lock.',
  },
  {
    id: 9,
    question: 'During time-limited practical tasks, the best approach to time management is to:',
    options: [
      'Skip the second prove step to save time once the circuit reads dead',
      'Work methodically and safely — never compromise safety for speed — but practise beforehand to build efficient habits',
      'Carry out several steps at once to finish well within the time limit',
      'Ask the assessor to extend the time rather than rushing the procedure',
    ],
    correctAnswer: 1,
    explanation:
      'Safety must never be compromised for speed. However, practising the procedure repeatedly before the EPA builds muscle memory and efficiency, allowing you to work both safely and within the time allowed. The assessor will fail a candidate who skips safety steps regardless of time pressure.',
  },
  {
    id: 10,
    question:
      'Which regulation requires that precautions are taken to prevent electrical danger during work activities?',
    options: [
      'Regulation 14 of the Construction (Design and Management) Regulations 2015',
      'Regulation 3 of the Provision and Use of Work Equipment Regulations 1998',
      'Regulation 4(3) of the Electricity at Work Regulations 1989',
      'Regulation 7 of the Management of Health and Safety at Work Regulations 1999',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 4(3) of the EAWR 1989 is the primary legal requirement for safe working practices including safe isolation. It places a duty on every person to ensure that precautions are taken to prevent danger from electrical work activities.',
  },
  {
    id: 11,
    question: 'A proving unit differs from a known live source in that:',
    options: [
      'A proving unit measures earth loop impedance, whereas a known live source measures voltage',
      'A proving unit can only be used on dead circuits, whereas a known live source must be energised',
      'A proving unit is rated for high voltage only, whereas a known live source is for low voltage',
      'A proving unit generates a test voltage electronically and is self-contained, while a known live source is an actual energised supply that you use to verify your indicator reads correctly',
    ],
    correctAnswer: 3,
    explanation:
      'A proving unit is an electronic device that generates a test voltage for verifying your voltage indicator. A known live source is an actual energised supply (e.g., a socket outlet on a different circuit). Both serve the same purpose — confirming your indicator works — but a proving unit is more convenient and avoids needing access to a separate live source.',
  },
  {
    id: 12,
    question:
      'When multiple people are working on the same isolated circuit, the LOTO procedure requires:',
    options: [
      'Each person applies their own personal safety lock — the circuit cannot be re-energised until every individual lock has been removed by its owner',
      'One supervisor holds a single master lock on behalf of the whole team',
      'The first person to finish removes the lock so the next job can begin',
      'A shared key is left at the isolator for anyone to re-energise when ready',
    ],
    correctAnswer: 0,
    explanation:
      'Multi-lock devices (hasps) allow each person working on the circuit to apply their own personal lock. The isolator cannot be operated until every lock is removed. Each person is responsible for their own lock and key — no one else can remove it. This ensures no individual can be endangered by premature re-energisation.',
  },
];

const faqs = [
  {
    question:
      'How long does the safe isolation section of the practical observation typically take?',
    answer:
      'The safe isolation demonstration typically takes 10-15 minutes as part of the broader practical observation. The total observation is usually 3-4 hours covering multiple tasks. Practise the procedure until you can complete it confidently in 10 minutes — this gives you a comfortable margin without rushing.',
  },
  {
    question: 'Do I need to bring my own tools and test equipment to the EPA?',
    answer:
      'This depends on the EPAO and the assessment venue. Some provide standardised equipment; others require you to bring your own. Check with your training provider well in advance. If bringing your own, ensure your voltage indicator is GS38-compliant, in calibration, and that you are familiar with it.',
  },
  {
    question: 'What happens if I make a mistake during the practical observation?',
    answer:
      'The assessor will observe and note the error. Minor errors that you self-correct may not prevent a pass. However, significant safety errors — such as failing to prove dead before touching conductors — are likely to result in a fail for that element. If you realise you have made a mistake, calmly correct it and explain what you are doing. Self-awareness and correction demonstrate competence.',
  },
  {
    question: 'Can the assessor ask me questions during the practical observation?',
    answer:
      "Yes. The assessor may ask clarifying questions such as 'Why are you doing that?' or 'What would happen if...?' These questions test your underpinning knowledge and are an opportunity to demonstrate understanding. Answer clearly and reference relevant standards or regulations where appropriate.",
  },
  {
    question: 'Should I practise with the same type of equipment I will use in the EPA?',
    answer:
      'Ideally, yes. If your training provider can confirm the type of equipment at the assessment venue, practise with the same or similar equipment. Familiarity with the specific isolators, distribution boards, and test instruments reduces hesitation and errors on the day.',
  },
  {
    question: 'What is the difference between isolation and switching off?',
    answer:
      'Switching off removes the electrical supply under normal operating conditions but does not guarantee a physical break in the circuit — some switches have electronic components that could fail. Isolation creates a physical break in the circuit (e.g., removing a fuse, opening a switch-disconnector) that is visible and verifiable. Safe working requires isolation, not just switching off. The assessor will check that you understand this distinction.',
  },
];

const MOETModule7Section2_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 7 · Section 7.2 · Subsection 1"
        title="Safe Isolation and Testing Routines"
        backTo="/study-centre/apprentice/m-o-e-t-module7-section2"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Demonstrating safe isolation competence to the EPA assessor with confidence and clarity.
          </p>

          <TLDR
            points={[
              'Sequence: identify, isolate, lock off, prove-test-prove.',
              'GS38: 4 mm tips, fused leads, finger guards, CAT rated.',
              'Explain: talk through each step and its safety reason.',
              'Time: practise until efficient — never skip safety steps.',
            ]}
          />

          <Prerequisites
            items={[
              {
                term: 'Safe isolation',

                gist: 'Identify the supply, switch off, isolate, lock off and prove dead at the point of work — with a GS38-compliant indicator proved before and after.',

                where: '1.1.2',
              },

              {
                term: 'The Electricity at Work Regulations',

                gist: 'The statutory duties: Reg 4(2) maintenance, Reg 13 precautions on dead equipment, Reg 14 live working, Reg 16 competence.',

                where: '1.4.2',
              },
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Demonstrate the complete safe isolation procedure to an assessor',
              'Execute the prove-test-prove sequence correctly every time',
              'Ensure all test equipment meets GS38 requirements',
              'Explain each step and its safety rationale clearly',
              'Manage time effectively during the practical observation',
              'Avoid common mistakes that lead to practical assessment failures',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="EPA context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>EAWR Reg 4(3):</strong> legal duty for safe systems of work.
              </li>
              <li>
                <strong>LOTO:</strong> lock out, tag out — personal safety locks.
              </li>
              <li>
                <strong>Assessor:</strong> observing safety, method and understanding.
              </li>
              <li>
                <strong>ST1426:</strong> core practical competence for EPA.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>The safe isolation procedure for EPA</ContentEyebrow>

          <ConceptBlock title="The safe isolation procedure for EPA">
            <p>
              Safe isolation is the foundation of all electrical maintenance work and is always
              assessed during the EPA practical observation. The assessor will watch you perform the
              complete procedure and evaluate not just whether you do it, but whether you understand
              why each step is necessary. This is the single most important competence you will
              demonstrate — getting it wrong is an automatic fail.
            </p>
            <p>
              The procedure must be followed every time, without exception. Even if you have
              isolated the same circuit a hundred times before, the EPA assessor expects to see the
              full procedure performed methodically. Shortcuts that may seem acceptable in a hurried
              workplace are never acceptable during assessment — and ideally should never be
              acceptable in the workplace either. The EPA tests your professional standard, not your
              minimum standard.
            </p>
          </ConceptBlock>

          <ConceptBlock title="The complete safe isolation sequence">
            <ol className="list-decimal space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Identify the circuit:</strong> confirm the exact circuit to be isolated
                using labels, drawings, and circuit charts. Verify the circuit identity — do not
                rely on a single label.
              </li>
              <li>
                <strong>Obtain authorisation:</strong> confirm you have permission to isolate (PTW
                if required). On some sites, a permit to work is mandatory before isolation.
              </li>
              <li>
                <strong>Notify affected persons:</strong> inform anyone who may be affected by the
                isolation — production staff, building occupants, other trades.
              </li>
              <li>
                <strong>Switch off:</strong> switch off the circuit at the local isolator or
                distribution board using the correct device.
              </li>
              <li>
                <strong>Isolate:</strong> remove fuses or open the isolator to create a physical
                break in the circuit.
              </li>
              <li>
                <strong>Lock off:</strong> apply a personal safety lock and danger notice at the
                point of isolation.
              </li>
              <li>
                <strong>Prove:</strong> prove the voltage indicator on a known live source or
                proving unit.
              </li>
              <li>
                <strong>Test:</strong> test the isolated circuit between all conductors (L-N, L-E,
                N-E for single phase; all combinations for three-phase).
              </li>
              <li>
                <strong>Re-prove:</strong> prove the voltage indicator again on the known live
                source or proving unit.
              </li>
              <li>
                <strong>Confirm dead:</strong> the circuit is now confirmed dead and safe to work
                on.
              </li>
            </ol>
          </ConceptBlock>

          <CommonMistake
            title="Critical: test between ALL conductors"
            whatHappens={
              <>
                A circuit may appear dead between line and neutral but have a fault condition
                between neutral and earth. Testing only some of the combinations can leave a live
                conductor undetected despite the circuit "reading" dead.
              </>
            }
            doInstead={
              <>
                Test between all combinations: line-neutral, line-earth, and neutral-earth. For
                three-phase circuits, test between all phases and between each phase and
                neutral/earth — that is a minimum of ten tests.
              </>
            }
          />

          <ConceptBlock title="Single-phase vs three-phase test combinations">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Circuit type</th>
                    <th className="py-2 pr-4 font-medium text-white">Test combinations</th>
                    <th className="py-2 font-medium text-white">Minimum tests</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Single-phase</td>
                    <td className="py-2 pr-4">L-N, L-E, N-E</td>
                    <td className="py-2">3</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Three-phase (no neutral)</td>
                    <td className="py-2 pr-4">L1-L2, L2-L3, L1-L3, L1-E, L2-E, L3-E</td>
                    <td className="py-2">6</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Three-phase with neutral</td>
                    <td className="py-2 pr-4">
                      L1-L2, L2-L3, L1-L3, L1-N, L2-N, L3-N, L1-E, L2-E, L3-E, N-E
                    </td>
                    <td className="py-2">10</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              <strong>Key point:</strong> the prove-test-prove sequence is non-negotiable. Skipping
              the re-prove step is a common shortcut that assessors will immediately identify as a
              fail point. Even if the test shows dead, without re-proving your indicator you cannot
              be certain the reading was accurate.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>GS38 compliance and test equipment</ContentEyebrow>

          <ConceptBlock title="GS38 compliance and test equipment">
            <p>
              The Health and Safety Executive&apos;s Guidance Note GS38 sets out the requirements
              for electrical test equipment used by electricians. During the EPA, your test
              equipment must be visibly compliant with GS38, and you should be able to explain the
              requirements if asked. Using non-compliant equipment is both a safety risk and a
              potential fail point in the assessment.
            </p>
            <p>
              GS38 was published specifically to address the number of electrical accidents caused
              by inadequate or damaged test equipment. The guidance applies to all voltage
              indicators, multimeters, and other instruments used for testing on or near live
              conductors. Understanding the reasoning behind each requirement helps you explain it
              to the assessor and demonstrates deeper knowledge.
            </p>
          </ConceptBlock>

          <ConceptBlock title="GS38 key requirements">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Probe tips:</strong> maximum 4 mm exposed conductive material — prevents
                accidental contact with adjacent conductors.
              </li>
              <li>
                <strong>Finger guards:</strong> barriers to prevent fingers touching live parts —
                protects against electric shock during testing.
              </li>
              <li>
                <strong>Fused leads:</strong> 500 mA HRC fuses in both leads — limits the energy
                released during a fault on the test instrument.
              </li>
              <li>
                <strong>Robust insulation:</strong> leads rated for the voltage being tested —
                prevents insulation breakdown and shock.
              </li>
              <li>
                <strong>CAT rating:</strong> appropriate category for the installation (CAT III or
                CAT IV for distribution) — ensures the instrument can withstand transient voltages.
              </li>
              <li>
                <strong>Calibration:</strong> within calibration date (check the label) — ensures
                readings are accurate and reliable.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Pre-test equipment check">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Visual inspection of leads — no damage, cracks, or exposed conductors.</li>
              <li>Confirm probe tips meet GS38 requirements (4 mm maximum, with guards).</li>
              <li>Check fuses are present and the correct rating (500 mA HRC).</li>
              <li>Check calibration date is current.</li>
              <li>Test battery condition (if applicable).</li>
              <li>Prove on known live source before use.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="CAT rating guide for maintenance environments">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">CAT rating</th>
                    <th className="py-2 pr-4 font-medium text-white">Application</th>
                    <th className="py-2 font-medium text-white">Example</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">CAT II</td>
                    <td className="py-2 pr-4">Domestic appliance level</td>
                    <td className="py-2">Socket outlets, portable equipment</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">CAT III</td>
                    <td className="py-2 pr-4">Distribution level</td>
                    <td className="py-2">Distribution boards, bus bars, motor control centres</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">CAT IV</td>
                    <td className="py-2 pr-4">Origin of installation</td>
                    <td className="py-2">Incoming supply, service heads, main switchgear</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              <strong>Key point:</strong> demonstrating that you check your test equipment before
              use shows the assessor a professional, safety-conscious approach. This is a
              distinction-level behaviour — it shows you do not just use the right equipment, you
              actively verify it is safe and suitable before every use.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Explaining your actions to the assessor</ContentEyebrow>

          <ConceptBlock title="Explaining your actions to the assessor">
            <p>
              The practical observation assesses both your ability to perform tasks and your
              understanding of why each step is necessary. Talking through your actions as you work
              — sometimes called &quot;thinking aloud&quot; — is the most effective way to
              demonstrate this understanding. Without verbal communication, the assessor can only
              see what you do, not why you are doing it.
            </p>
            <p>
              Many candidates underestimate how important this communication element is. Two
              candidates who perform the identical procedure can receive different grades: the one
              who explains their reasoning scores higher because the assessor has evidence of
              understanding, not just mechanical skill. Practise your running commentary until it
              feels natural and conversational, not scripted.
            </p>
          </ConceptBlock>

          <ConceptBlock title="What to say at each step">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Identifying circuit:</strong> &quot;I&apos;m confirming the circuit identity
                using the schedule of circuits and distribution board labelling to ensure I isolate
                the correct circuit.&quot;
              </li>
              <li>
                <strong>Locking off:</strong> &quot;I&apos;m applying my personal safety lock so the
                circuit cannot be re-energised by anyone else while I&apos;m working on it — this is
                my LOTO procedure.&quot;
              </li>
              <li>
                <strong>Proving:</strong> &quot;I&apos;m proving my voltage indicator on this known
                live source to confirm it&apos;s reading correctly before I test the isolated
                circuit.&quot;
              </li>
              <li>
                <strong>Testing:</strong> &quot;I&apos;m testing between line and neutral, line and
                earth, and neutral and earth to confirm the circuit is dead on all conductors.&quot;
              </li>
              <li>
                <strong>Re-proving:</strong> &quot;I&apos;m re-proving the indicator on the known
                source to confirm it&apos;s still working correctly — this validates my
                &apos;dead&apos; reading was genuine.&quot;
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Referencing standards naturally">
            <p>
              Where natural, reference the relevant standard or regulation. For example:
              &quot;I&apos;m following the GS38 guidance by checking my probe tips are within the 4
              mm maximum&quot; or &quot;This prove-test-prove sequence is required by HSG85 safe
              working practices.&quot; You do not need to recite regulation numbers from memory, but
              demonstrating awareness of the regulatory framework achieves higher marks. The key
              word is &quot;naturally&quot; — do not force in references that feel out of place. If
              a reference comes to mind, include it; if not, your practical demonstration speaks for
              itself.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Communication dos and don'ts">
            <p>
              <strong>Do:</strong> explain at key decision points. Use your own words, not a script.
              Reference safety reasons for each step. State what readings you expect and why.
            </p>
            <p>
              <strong>Don&apos;t:</strong> narrate every micro-action. Read from prepared notes.
              Stay completely silent. Wait to be asked before speaking.
            </p>
            <p>
              <strong>Key point:</strong> practise the running commentary during your preparation.
              It should feel natural, not scripted. The assessor wants to hear genuine
              understanding, not a memorised speech.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Time management during practical tasks</ContentEyebrow>

          <ConceptBlock title="Time management during practical tasks">
            <p>
              The practical observation has a defined time allocation. You need to work efficiently
              without compromising safety. This balance comes from practice — the more familiar you
              are with the procedure, the more efficiently you can perform it while maintaining
              quality and safety. Time management during the EPA is not about rushing; it is about
              eliminating hesitation and unnecessary delays.
            </p>
            <p>
              The biggest time-wasters during practical assessments are not the procedures
              themselves but the pauses caused by uncertainty: hesitating over which probe to
              connect, searching for the right tool, or trying to remember the next step. These
              pauses disappear with repeated practice. A well-practised candidate moves smoothly
              from one step to the next, appearing calm and confident — which is exactly the
              impression you want to give the assessor.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Building speed through practice">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Repetition:</strong> practise the safe isolation procedure until it is
                second nature — aim for at least 20 complete run-throughs.
              </li>
              <li>
                <strong>Tool preparation:</strong> have all tools and equipment ready and organised
                before starting — a tool roll or pouch saves searching time.
              </li>
              <li>
                <strong>Efficient movement:</strong> plan your sequence to minimise unnecessary
                back-and-forth between the isolator and work position.
              </li>
              <li>
                <strong>Avoid hesitation:</strong> confidence from practice eliminates pauses and
                uncertainty that waste valuable minutes.
              </li>
              <li>
                <strong>Self-timing:</strong> time yourself during practice to identify where you
                can improve efficiency without compromising safety.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Typical time allocation for practical tasks">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Activity</th>
                    <th className="py-2 pr-4 font-medium text-white">Typical time</th>
                    <th className="py-2 font-medium text-white">Key focus</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Safe isolation procedure</td>
                    <td className="py-2 pr-4">10-15 minutes</td>
                    <td className="py-2">Full procedure, no shortcuts</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Fault diagnosis</td>
                    <td className="py-2 pr-4">20-40 minutes</td>
                    <td className="py-2">Systematic method, clear reasoning</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Component replacement</td>
                    <td className="py-2 pr-4">15-30 minutes</td>
                    <td className="py-2">Correct procedure, workmanship quality</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Testing and verification</td>
                    <td className="py-2 pr-4">10-20 minutes</td>
                    <td className="py-2">Thorough testing, documented results</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <CommonMistake
            title="Never compromise safety for speed"
            whatHappens={
              <>
                If time is running short, skipping safety steps to finish is a serious error. The
                assessor is looking for competent, safe practice — not a speed record.
              </>
            }
            doInstead={
              <>
                A candidate who completes the task slowly but safely will score higher than one who
                rushes and omits critical safety procedures. If you run out of time, the fact that
                you maintained safety throughout will be noted positively. A methodical approach
                that does not quite finish is always better than a rushed approach that skips
                proving dead.
              </>
            }
          />

          <p className="text-[14.5px] leading-relaxed text-white">
            <strong>ST1426 link:</strong> safe isolation is a core competence requirement of the
            Maintenance and Operations Engineering Technician standard. It is assessed in every EPA
            practical observation and is a fundamental skill for your entire career.
          </p>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Common mistakes and how to avoid them</ContentEyebrow>

          <ConceptBlock title="Common mistakes and how to avoid them">
            <p>
              Experience from EPA assessors across the country reveals consistent patterns in the
              mistakes candidates make during the safe isolation demonstration. Understanding these
              common errors — and deliberately practising to avoid them — gives you a significant
              advantage. Most of these mistakes are preventable through awareness and practice, not
              through additional knowledge.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Top safe isolation errors in EPA assessments">
            <ol className="list-decimal space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Skipping the re-prove step:</strong> testing the circuit for dead but not
                re-proving the indicator afterwards. This is the single most common error and is a
                significant fail point.
              </li>
              <li>
                <strong>Not testing all conductor combinations:</strong> only testing L-N on a
                single-phase circuit and missing L-E and N-E, or missing phase-to-phase tests on
                three-phase circuits.
              </li>
              <li>
                <strong>Using non-GS38-compliant equipment:</strong> probes without finger guards,
                exposed tips longer than 4 mm, or leads without fuses.
              </li>
              <li>
                <strong>Forgetting to apply the lock and danger notice:</strong> isolating and
                testing but not physically locking off the isolator before beginning work.
              </li>
              <li>
                <strong>Not identifying the circuit correctly:</strong> rushing into isolation
                without confirming the circuit identity from the schedule of circuits or
                distribution board labelling.
              </li>
              <li>
                <strong>Working in silence:</strong> performing the procedure correctly but not
                explaining any of the steps, leaving the assessor unable to confirm understanding.
              </li>
              <li>
                <strong>Not checking equipment before use:</strong> starting to test without
                visually inspecting the voltage indicator and leads for damage.
              </li>
            </ol>
          </ConceptBlock>

          <ConceptBlock title="Pre-assessment practice checklist">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Practise the complete procedure at least 20 times until it is automatic.</li>
              <li>
                Have a colleague observe and give feedback on your technique and communication.
              </li>
              <li>
                Time yourself to ensure you can complete the procedure comfortably within the
                allocation.
              </li>
              <li>Practise on different types of distribution boards and isolators if possible.</li>
              <li>Rehearse your verbal commentary at each step until it flows naturally.</li>
              <li>
                Verify your test equipment is GS38-compliant, calibrated, and in good condition.
              </li>
              <li>Familiarise yourself with the specific lock-off devices you will use.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Handling nerves during the procedure">
            <p>
              Assessment nerves can cause even well-prepared candidates to make mistakes. The best
              defence is overlearning — practising so much that the procedure becomes automatic,
              like driving a car. When nerves affect your conscious thinking, your trained muscle
              memory takes over. If you feel nervous during the assessment, take a breath, return to
              the start of the step you are on, and continue methodically. The assessor understands
              nerves and will not penalise a brief pause to compose yourself.
            </p>
            <p>
              <strong>Key point:</strong> the candidates who perform best in EPA safe isolation
              assessments are not necessarily the most technically knowledgeable — they are the ones
              who have practised the most. Repetition builds the confidence and fluency that the
              assessor is looking for.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Quick reference — safe isolation">
            <p>
              <strong>Procedure order:</strong> identify circuit → obtain authorisation → notify
              affected persons → switch off → isolate (physical break) → lock off + danger notice →
              prove indicator → test for dead (all combinations) → re-prove indicator → confirm dead
              — safe to work.
            </p>
            <p>
              <strong>Key standards:</strong> GS38 (test equipment requirements); EAWR 1989 Reg 4(3)
              (safe systems of work); EAWR 1989 Reg 12 (isolation requirements); EAWR 1989 Reg 14
              (working on dead equipment); HSG85 (electricity at work: safe working practices); BS
              7671 (IET Wiring Regulations).
            </p>
          </ConceptBlock>

          <SectionRule />

          <VideoCard
            url="https://www.youtube.com/watch?v=Ft_UdvFOvts"

            title="How to Prep for a Successful Assessment"

            channel="Craig Wiltshire"

            duration="3:58"

            topic="What a practical assessment day actually asks of you"

            caption="Short and specific about preparation, which is the part apprentices tend to leave until the week before."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'The prove-test-prove sequence is non-negotiable — skipping the re-prove step is the single most common fail point.',
              'Test between every conductor combination, not just the ones that are quick to reach — a fault can hide on an untested pair.',
              'GS38-compliant test equipment: 4 mm max exposed tip, finger guards, fused leads, correct CAT rating, in calibration.',
              'Explain your actions as you work — the assessor grades understanding, not just correct hands.',
              'Never trade safety for speed. Practice removes hesitation; it should never remove a safety step.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Test Your Knowledge — Safe Isolation" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module7-section2')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Back to section
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Practical task preparation
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module7-section2-2')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Fault Diagnosis Exercises
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule7Section2_1;
