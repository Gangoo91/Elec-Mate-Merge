/**
 * MOET · Module 4 · Section 4 · Subsection 1 — Safe Isolation and
 * Verification
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option.
 *
 * KSBs covered, quoted rather than numbered: the IfATE/Skills England API
 * publishes these statements without their K/S/B codes, and the published
 * numbering has not been verified against a primary source — so do not invent
 * codes here.
 *   Knowledge  · "Electrical. Electrical maintenance tools, measurement, and
 *                 test equipment application, operation, care and
 *                 calibration requirements."
 *              · "Electrical. Electrical plant, equipment, and systems
 *                 maintenance requirements: removing and replacing parts,
 *                 inspecting, testing, setting up, adjusting, cleaning, and
 *                 functional testing."
 *              · "Electrical. Inspect and test electrical aspects of plant.
 *                 For example, visual checks, insulation and continuity
 *                 checks, thermographic surveys, and voltage levels."
 *   Skills     · "Electrical. Conduct functional testing."
 *
 * ⚠️ GS38 probe tip — this page's "4 mm" is CORRECT and must stay. Verified
 * against the primary source (HSE GS38): probes and clips shall be "insulated
 * to leave an exposed metal tip not exceeding 4 mm measured across any surface
 * of the tip". GS38 contains no 2 mm figure. Module 1.1.2 previously said
 * 2 mm — that was wrong and has now been corrected to 4 mm, along with 1.4.6
 * and 1.2.2. Do not "fix" 4 mm to 2 mm anywhere in this course.
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
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
  VideoCard,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Safe Isolation and Verification - MOET Module 4.4.1';
const DESCRIPTION =
  'Comprehensive guide to safe isolation procedures in repair contexts: proving dead before work, multi-source isolation, verification after repair, and re-energisation sequences for electrical maintenance technicians under BS 7671 and GS38.';

const quickCheckQuestions = [
  {
    id: 'isolation-prove-dead',
    question:
      'Why must you prove a voltage indicator is working both before AND after testing a circuit for dead?',
    options: [
      'To calibrate the indicator so it reads the exact supply voltage at the point of work',
      "To confirm the indicator has not failed and given a false 'dead' reading",
      "To warm up the indicator's battery so it reads correctly under load",
      'To record the proving result on the certificate as evidence of compliance',
    ],
    correctIndex: 1,
    explanation:
      "If a voltage indicator fails during use (e.g., a blown fuse, damaged lead), it will show zero volts regardless of whether the circuit is live. Proving the indicator on a known live source or proving unit after testing confirms it is still functioning correctly. This is the critical step that prevents false 'dead' readings — a leading cause of fatal electrical accidents.",
  },
  {
    id: 'multi-source',
    question:
      'In a motor control centre with a mains supply and a standby generator, what must be isolated before work begins?',
    options: [
      'All sources of supply that could energise the equipment, including mains, generator and any UPS or battery systems',
      'Only the mains supply, since the generator cannot start while the mains is present',
      'Only the generator, because the mains is automatically disconnected during maintenance',
      'Just the final circuit feeding the motor, leaving the incoming supply live',
    ],
    correctIndex: 0,
    explanation:
      'Multi-source isolation requires that ALL sources of supply that could energise the equipment are identified and isolated. This includes mains, standby generators, UPS systems, battery supplies, solar PV, and any backfeed from connected equipment. Missing even one source can result in fatal electrocution.',
  },
  {
    id: 'locking-off',
    question:
      'What is the purpose of attaching a unique personal lock and danger tag to an isolator?',
    options: [
      'To show the circuit belongs to you',
      'To identify which circuit is being worked on for billing purposes',
      'To prevent unauthorised re-energisation while work is in progress',
      'To comply with company branding requirements',
    ],
    correctIndex: 2,
    explanation:
      'A personal safety lock and danger tag prevent anyone from re-energising the circuit while you are working on it. Only the person who applied the lock should remove it. This is a fundamental principle of safe isolation under the Electricity at Work Regulations 1989, Regulation 13, which requires adequate precautions to prevent charging.',
  },
  {
    id: 're-energisation',
    question: 'What checks should be carried out BEFORE re-energising a circuit after repair?',
    options: [
      'A visual check that the covers are back on, with all testing done once the circuit is live',
      'Insulation resistance, continuity, visual inspection, removal of tools and temporary earths, personnel clear',
      'A loop impedance test and an RCD trip test carried out with the circuit still live',
      'No checks, provided the same components were refitted in the same positions as before',
    ],
    correctIndex: 1,
    explanation:
      'Before re-energisation, a systematic pre-energisation check must confirm: all connections are correctly made and tight, insulation resistance is satisfactory, continuity is proven, all tools and materials are removed, temporary earths are removed, all guards and covers are replaced, and all personnel are clear of the equipment. Only then should the circuit be re-energised in a controlled manner.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Under BS 7671 and GS38, what is the first step in the safe isolation procedure?',
    options: [
      'Apply your personal safety lock to the main isolator',
      'Identify the circuit to be worked on and all sources of supply',
      'Prove the voltage indicator on a known live source',
      'Test between all live conductors and earth at the point of work',
    ],
    correctAnswer: 1,
    explanation:
      'The first step is always to identify the circuit to be worked on and all sources of supply. Without correct identification, you may isolate the wrong circuit or miss an alternative supply source. This requires consulting drawings, schedules, and physically tracing the circuit where necessary.',
  },
  {
    id: 2,
    question: 'A proving unit (such as a Martindale VI-15700) is used to:',
    options: [
      'Measure the earth fault loop impedance of the circuit',
      'Discharge any stored energy in capacitors before work begins',
      'Provide a known voltage source to prove that a voltage indicator is functioning correctly',
      'Physically prevent the switching device from being re-energised',
    ],
    correctAnswer: 2,
    explanation:
      "A proving unit generates a known voltage (typically around 50 V or 230 V depending on the model) that allows you to verify your voltage indicator is working correctly. It is used before and after testing a circuit to confirm the indicator has not failed. This is the 'prove-test-prove' sequence mandated by HSE guidance GS38.",
  },
  {
    id: 3,
    question:
      'Which HSE guidance document specifically covers the safe use of electrical test equipment?',
    options: ['HSR25', 'GS6', 'PM29', 'GS38'],
    correctAnswer: 3,
    explanation:
      'GS38 (Electrical Test Equipment for Use by Electricians) provides detailed guidance on the safe use of test equipment, including voltage indicators, test leads and probes. It specifies requirements for fused test leads, shrouded probes, and maximum exposed probe tip lengths to reduce the risk of arc flash and short circuits during testing.',
  },
  {
    id: 4,
    question: 'When using a voltage indicator to prove dead, you should test between:',
    options: [
      'All live conductors and earth, and between all live conductors at the point of work',
      'The line conductor and earth only, since neutral sits at earth potential anyway',
      'The two ends of the protective conductor, to confirm circuit continuity is intact',
      'The supply terminals of the isolator, taken just before the isolator is opened',
    ],
    correctAnswer: 0,
    explanation:
      'You must test between ALL live conductors and earth, and between ALL live conductors. For single phase: L-N, L-E, N-E. For three phase: L1-L2, L2-L3, L1-L3, L1-N, L2-N, L3-N, L1-E, L2-E, L3-E, N-E. Missing any combination could leave a live conductor undetected.',
  },
  {
    id: 5,
    question: 'What does Regulation 13 of the Electricity at Work Regulations 1989 require?',
    options: [
      'That all electrical work must be carried out by a qualified electrician only',
      'Adequate precautions shall be taken to prevent electrical equipment that has been made dead from becoming live while work is in progress',
      'That every circuit must be tested annually and the results recorded',
      'That live working is permitted whenever it is more convenient than isolating',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 13 requires adequate precautions to prevent electrical equipment that has been made dead from becoming live while any work is carried out on or near the equipment. This is achieved through locking off with personal safety locks, applying danger tags, and where appropriate, applying temporary earths.',
  },
  {
    id: 6,
    question:
      'Why should two-pole voltage indicators be preferred over single-pole indicators (neon screwdrivers) for proving dead?',
    options: [
      'They are cheaper and quicker to use than single-pole indicators',
      'They can measure earth fault loop impedance as well as voltage',
      'They test between two points giving a definitive result, whereas single-pole indicators can give false readings due to induced voltages or capacitive coupling',
      'They do not need to be proved on a known source before use',
    ],
    correctAnswer: 2,
    explanation:
      "Two-pole voltage indicators test the potential difference between two points, giving a definitive live or dead indication. Single-pole indicators (neon screwdrivers) detect voltage at a single point relative to earth through the user's body capacitance, making them susceptible to false readings from induced voltages, capacitive coupling, and static charges. GS38 recommends two-pole indicators for safe isolation.",
  },
  {
    id: 7,
    question:
      'In a repair context, what additional isolation consideration applies when working on variable speed drives (VSDs)?',
    options: [
      'The drive can be safely opened the instant the AC supply is switched off',
      'Only the neutral conductor needs isolating; the line conductors can stay connected',
      'The motor must be left running afterwards to discharge any stored energy',
      'DC bus capacitors hold a lethal charge for minutes — wait the specified discharge time',
    ],
    correctAnswer: 3,
    explanation:
      "Variable speed drives contain large DC bus capacitors that can retain a lethal charge (typically 600-800 V DC) for several minutes after the AC supply is disconnected. The manufacturer's specified discharge time must be observed, and the voltage across the DC bus must be verified as safe (typically below 50 V DC) before any work commences. Some drives have active discharge circuits; others rely on passive discharge through bleed resistors.",
  },
  {
    id: 8,
    question: 'What is the correct sequence for re-energisation after repair?',
    options: [
      'Pre-energisation checks, personnel clear, remove earths and lock/tag, re-energise, functional test',
      'Remove the lock and tag, re-energise, then carry out all the checks once power is on',
      'Re-energise first and only replace the covers if the equipment is working correctly',
      'Re-energise from the load end and work back towards the incoming supply',
    ],
    correctAnswer: 0,
    explanation:
      'Re-energisation must follow a systematic sequence: complete all pre-energisation checks (IR, continuity, visual), confirm all personnel are clear, remove temporary earths (if applied), replace all guards and covers, remove personal lock and danger tag (in that order), re-energise in a controlled manner (starting from the supply end), and carry out functional tests to confirm correct operation.',
  },
  {
    id: 9,
    question:
      'When multiple persons are working on the same isolated circuit, which locking-off arrangement should be used?',
    options: [
      'A single lock applied by the most senior person on behalf of the whole group',
      'A multi-lock hasp, so each person fits their own lock and all must be removed to re-energise',
      'A danger tag alone, with the isolator key left in the isolator for convenience',
      'One lock per circuit, with all the keys kept together in a central key box',
    ],
    correctAnswer: 1,
    explanation:
      "A multi-lock hasp (also called a scissor clamp or lockout hasp) allows each person working on the circuit to apply their own personal safety lock. The isolator cannot be operated until every individual lock has been removed by its owner. This ensures that no person can be put at risk by another worker removing 'their' lock and re-energising. Each person retains personal control of their own safety.",
  },
  {
    id: 10,
    question: 'GS38 specifies that test probe tips should not have an exposed metal tip exceeding:',
    options: ['1 mm', '2 mm', '4 mm', '10 mm'],
    correctAnswer: 2,
    explanation:
      'GS38 recommends that test probes should have a maximum exposed metal tip of 4 mm, with the remainder of the probe finger-guarded. This minimises the risk of accidental short circuits and arc flash during testing. The probes should also incorporate fused test leads (typically 500 mA HRC fuses) to limit fault current in the event of a short circuit.',
  },
  {
    id: 11,
    question:
      'What is the purpose of applying temporary earths (safety earths) after isolation in HV systems?',
    options: [
      'To improve the accuracy of any insulation resistance measurements taken afterwards',
      'To discharge the DC bus capacitors inside any connected variable speed drives',
      'To prove the voltage indicator is functioning correctly before testing for dead',
      'To trip the protective devices instantly if the circuit is accidentally re-energised',
    ],
    correctAnswer: 3,
    explanation:
      'Temporary safety earths are applied after isolation and proving dead to provide a low-impedance path to earth. If the circuit is accidentally re-energised, the temporary earth will cause a massive fault current that trips the protective devices immediately, disconnecting the supply before a worker can be harmed. This is standard practice for HV systems and is also used on LV systems in high-risk situations.',
  },
  {
    id: 12,
    question:
      'After completing a repair, you measure the insulation resistance and obtain a reading of 0.5 MΩ between line and earth on a 230 V circuit. What should you do?',
    options: [
      'Investigate further — the minimum acceptable value for a 230 V circuit is 1.0 MΩ per BS 7671',
      'Re-energise the circuit — 0.5 MΩ comfortably exceeds the minimum requirement',
      'Record the value as a pass — any reading above zero is acceptable',
      'Reduce the test voltage to 250 V and retest to obtain a higher reading',
    ],
    correctAnswer: 0,
    explanation:
      'BS 7671 Table 64 specifies a minimum insulation resistance of 1.0 MΩ for circuits operating at up to 500 V (SELV/PELV require 0.5 MΩ at 250 V test voltage, and circuits up to 500 V require 1.0 MΩ at 500 V test voltage). A reading of 0.5 MΩ on a 230 V circuit is below the minimum and indicates a potential insulation fault that must be investigated and corrected before re-energisation.',
  },
];

const faqs = [
  {
    question: 'Can I use a multimeter instead of a two-pole voltage indicator for proving dead?',
    answer:
      'While a CAT III or CAT IV rated multimeter can detect voltage, GS38 and best practice recommend a two-pole voltage indicator (such as a Fluke T150 or Martindale VT28) for proving dead. Two-pole indicators are simpler, more robust, less susceptible to user error (e.g., wrong range selection), and provide a clear pass/fail indication. A multimeter set to the wrong range or function could give a misleading reading.',
  },
  {
    question: 'What if the isolator does not have a facility for a lock?',
    answer:
      "If the isolator cannot be locked off, alternative precautions must be taken. This may include removing the fuse carrier and retaining it, using a lockout device designed to fit over the switch, posting a competent person as a safety observer at the isolator, or using a permit-to-work system. The chosen method must provide an equivalent level of security to locking off. Simply placing a 'Do Not Switch On' label is NOT sufficient on its own.",
  },
  {
    question: 'Do I need to prove dead at the point of work as well as at the isolator?',
    answer:
      'Yes. You should prove dead at the point of work, not just at the isolator. There may be other sources of supply, backfeed from connected equipment, or the wrong circuit may have been isolated. Testing at the point of work is the final confirmation that the conductors you are about to touch are indeed dead. This is especially important in complex installations with multiple circuits in the same enclosure.',
  },
  {
    question: 'How often should voltage indicators be checked and calibrated?',
    answer:
      'Voltage indicators should be visually inspected before each use (checking for damage to leads, probes and the indicator body), proved on a known source before and after each use, and formally calibrated at intervals recommended by the manufacturer — typically annually. A damaged or out-of-calibration indicator must be withdrawn from service immediately. Records of calibration should be maintained.',
  },
  {
    question: "What is a 'permit to work' and when is it required for isolation?",
    answer:
      'A permit to work (PTW) is a formal documented procedure that authorises specific work on specific equipment for a specific period. It ensures that all necessary safety precautions (including isolation, proving dead, and earthing) have been carried out before work begins. PTWs are typically required for HV work, work in hazardous areas, complex isolations involving multiple sources, and any work where the risk assessment identifies a need for formal control.',
  },
];

const MOETModule4Section4_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 4 · Section 4.4 · Subsection 1"
        title="Safe Isolation and Verification"
        backTo="/study-centre/apprentice/m-o-e-t-module4-section4"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Reviewing safe isolation procedures specifically in the context of repair and
            replacement work
          </p>

          <TLDR
            points={[
              'Prove-test-prove: confirm the indicator works before and after testing.',
              'Multi-source: identify and isolate ALL supplies including backfeed.',
              'Lock and tag: a personal lock prevents unauthorised re-energisation.',
              'Verify after repair: IR, continuity, visual checks before re-energising.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply the prove-test-prove safe isolation procedure in a repair context',
              'Identify and isolate all sources of supply including generators, UPS and backfeed',
              'Implement correct locking off and tagging procedures for individual and multi-person working',
              'Verify circuit integrity after repair using appropriate tests before re-energisation',
              'Follow a systematic re-energisation sequence to return equipment to service safely',
              'Recognise stored energy hazards in VSDs, capacitors and battery systems during isolation',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="Key standards">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>EAWR 1989 Reg 12-14:</strong> dead working, preventing re-energisation.
              </li>
              <li>
                <strong>GS38:</strong> safe use of test equipment and proving units.
              </li>
              <li>
                <strong>BS 7671:</strong> isolation and switching requirements (Chapter 53).
              </li>
              <li>
                <strong>ST1426:</strong> safe working practices competence requirements.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>The safe isolation procedure — repair context</ContentEyebrow>

          <ConceptBlock title="The safe isolation procedure — repair context">
            <p>
              Safe isolation is the single most critical safety procedure in electrical maintenance.
              Every year, electricians and maintenance technicians are killed or seriously injured
              because they worked on circuits that were assumed to be dead but were not. The safe
              isolation procedure, when followed correctly and completely, eliminates this risk. In
              a repair context, the procedure takes on additional importance because the fault
              condition itself may have created unexpected hazards — such as backfeed through failed
              components, cross-connections between circuits, or stored energy in capacitors and
              inductors.
            </p>
            <p>
              The procedure follows the well-established <strong>prove-test-prove</strong> sequence
              defined in HSE guidance note GS38 and reinforced by BS 7671 and the IET Guidance Note
              3 (Inspection &amp; Testing). This sequence ensures that the voltage indicator is
              confirmed as working before and after the critical test, eliminating the possibility
              of a false dead reading from a faulty instrument.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Safe isolation procedure — step by step">
            <ol className="list-decimal space-y-2 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Identify the circuit:</strong> consult circuit charts, distribution board
                schedules, and schematic diagrams to identify the correct circuit and all points of
                isolation. Physically trace the circuit where any doubt exists.
              </li>
              <li>
                <strong>Identify all sources of supply:</strong> consider mains, standby generators,
                UPS systems, battery supplies, PV arrays, and any possibility of backfeed from
                interconnected equipment or parallel sources.
              </li>
              <li>
                <strong>Notify affected persons:</strong> inform all persons who may be affected by
                the isolation, including building occupants, production staff, and the duty holder
                or responsible person.
              </li>
              <li>
                <strong>Isolate the circuit:</strong> open the isolator, switch-disconnector or
                circuit breaker that provides isolation. Ensure the device provides full
                disconnection (visible contact gap or positive indication).
              </li>
              <li>
                <strong>Lock off and tag:</strong> apply your personal safety lock and danger tag to
                the isolator. Use a multi-lock hasp if multiple persons will be working. Retain the
                only key on your person.
              </li>
              <li>
                <strong>Prove the voltage indicator:</strong> test the two-pole voltage indicator on
                a known live source or proving unit to confirm it indicates correctly.
              </li>
              <li>
                <strong>Test for dead:</strong> test between all live conductors and earth, and
                between all live conductors, at the point of work. For single phase: L-N, L-E, N-E.
                For three phase: L1-L2, L2-L3, L1-L3, L1-N, L2-N, L3-N, L1-E, L2-E, L3-E, N-E.
              </li>
              <li>
                <strong>Re-prove the voltage indicator:</strong> immediately re-test the indicator
                on the known live source or proving unit to confirm it is still functioning
                correctly.
              </li>
            </ol>
          </ConceptBlock>

          <CommonMistake
            title="Critical warning"
            whatHappens={
              <>
                Never assume a circuit is dead because a switch is in the &apos;off&apos; position,
                a fuse has been removed, or a colleague tells you it is dead.
              </>
            }
            doInstead={
              <>
                The only acceptable confirmation is your own personal prove-test-prove procedure
                carried out at the point of work. &apos;Test before you touch&apos; is not just good
                practice — it is a legal requirement under the Electricity at Work Regulations 1989.
              </>
            }
          />

          <ConceptBlock title="GS38 test equipment requirements">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Voltage indicator:</strong> two-pole type, CAT III or CAT IV rated for the
                system voltage.
              </li>
              <li>
                <strong>Test leads:</strong> fused (typically 500 mA HRC), with finger guards and
                shrouded connectors.
              </li>
              <li>
                <strong>Probe tips:</strong> maximum 4 mm exposed metal, with spring-loaded
                retractable tips preferred.
              </li>
              <li>
                <strong>Proving unit:</strong> battery-powered unit generating a known test voltage
                to confirm indicator operation.
              </li>
              <li>
                <strong>Condition:</strong> free from damage, within calibration date, leads
                undamaged with no exposed conductors.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Multi-source isolation</ContentEyebrow>

          <ConceptBlock title="Multi-source isolation">
            <p>
              Modern electrical installations frequently have multiple sources of supply. A
              maintenance technician must identify every possible source that could energise the
              equipment being worked on. Failure to identify and isolate all sources is one of the
              most common causes of fatal electrical accidents in industrial and commercial
              environments.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Common multiple supply sources">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Mains supply:</strong> the primary utility supply — may enter the building
                at multiple points in larger installations.
              </li>
              <li>
                <strong>Standby generators:</strong> automatic transfer switches (ATS) can
                re-energise circuits without warning when mains fails.
              </li>
              <li>
                <strong>UPS systems:</strong> uninterruptible power supplies maintain output voltage
                even when the mains supply is isolated — the UPS output and battery must be isolated
                separately.
              </li>
              <li>
                <strong>Solar PV arrays:</strong> PV panels generate DC voltage whenever exposed to
                light — the DC side cannot be &apos;switched off&apos; during daylight hours and
                must be treated as live.
              </li>
              <li>
                <strong>Battery systems:</strong> emergency lighting, fire alarm and security system
                batteries provide a continuous supply independent of the mains.
              </li>
              <li>
                <strong>Backfeed:</strong> motors, transformers and other equipment can backfeed
                voltage into supposedly dead circuits through electromagnetic induction or
                capacitive coupling.
              </li>
              <li>
                <strong>Parallel supplies:</strong> bus section switches connecting multiple
                transformer or generator feeds.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Multi-source isolation checklist">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Source</th>
                    <th className="py-2 pr-4 font-medium text-white">Isolation point</th>
                    <th className="py-2 font-medium text-white">Verification</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Mains supply</td>
                    <td className="py-2 pr-4">Main switch / ACB / MCCB</td>
                    <td className="py-2">Prove dead at point of work</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Generator</td>
                    <td className="py-2 pr-4">ATS and generator breaker</td>
                    <td className="py-2">Prevent auto-start; lock off ATS</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">UPS</td>
                    <td className="py-2 pr-4">UPS output breaker and battery disconnect</td>
                    <td className="py-2">Confirm UPS shows no output</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Solar PV</td>
                    <td className="py-2 pr-4">DC isolator and AC isolator</td>
                    <td className="py-2">DC side may still be live in daylight</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Battery systems</td>
                    <td className="py-2 pr-4">Battery isolator / disconnect</td>
                    <td className="py-2">Prove dead at battery terminals</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              During repair work, stored energy is a particular hazard because the fault condition
              may have left capacitors charged, inductors energised, or mechanical systems under
              tension. Variable speed drives (VSDs) contain DC bus capacitors that can retain
              600-800 V DC for up to 10 minutes after isolation. Power factor correction (PFC)
              capacitor banks can also retain a charge. Always allow the manufacturer&apos;s
              specified discharge time, then verify with a voltage indicator before touching any
              internal components.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Locking off, tagging and permit-to-work</ContentEyebrow>

          <ConceptBlock title="Locking off, tagging and permit-to-work systems">
            <p>
              Locking off is the physical prevention of re-energisation using a personal safety lock
              applied to the isolating device. Under EAWR 1989 Regulation 13, adequate precautions
              must be taken to prevent equipment from becoming live while work is in progress.
              Locking off with a personal lock is the most effective and widely used method of
              achieving this requirement.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Locking off principles">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Personal lock:</strong> each person working on the circuit applies their own
                unique lock — only they hold the key.
              </li>
              <li>
                <strong>Multi-lock hasp:</strong> when multiple persons are working, a hasp allows
                each to apply their own lock. The isolator cannot operate until all locks are
                removed.
              </li>
              <li>
                <strong>Danger tag:</strong> a tag with the person&apos;s name, date, time and
                nature of work is attached alongside the lock.
              </li>
              <li>
                <strong>Key retention:</strong> the key must remain on the person of the lock owner
                at all times — never left in a toolbox, locker or handed to a colleague.
              </li>
              <li>
                <strong>Lock removal:</strong> only the person who applied the lock may remove it.
                If a lock must be removed in an emergency with the owner absent, a formal procedure
                involving a senior authorised person must be followed with full documentation.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Permit-to-work systems">
            <p>
              For complex, high-risk or HV isolation work, a formal permit-to-work (PTW) system
              provides additional layers of control. A PTW is a written document that authorises
              specific work on specific equipment for a defined period.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Issue:</strong> an authorised person (AP) issues the permit after confirming
                all safety precautions are in place.
              </li>
              <li>
                <strong>Receipt:</strong> the competent person (CP) receiving the permit confirms
                understanding of the work scope and safety measures.
              </li>
              <li>
                <strong>Clearance:</strong> upon completion, the CP clears the permit confirming all
                work is complete, personnel are clear, and temporary earths removed.
              </li>
              <li>
                <strong>Cancellation:</strong> the AP cancels the permit and authorises
                re-energisation.
              </li>
              <li>
                <strong>Audit trail:</strong> all permits are recorded and retained for a minimum
                period (typically 3-5 years).
              </li>
            </ul>
            <p>
              <strong>Key point:</strong> a permit to work is NOT a substitute for safe isolation
              and locking off — it is an additional administrative control used alongside physical
              measures. The physical isolation and locking off must still be carried out regardless
              of whether a PTW is in place.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Verification after repair and re-energisation</ContentEyebrow>

          <ConceptBlock title="Verification after repair and re-energisation sequence">
            <p>
              After completing a repair, the circuit must be verified as safe before it is returned
              to service. This verification is not optional — re-energising a circuit without proper
              checks risks further damage to equipment, fire, or injury to personnel. The
              verification and re-energisation sequence must be systematic and documented.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Pre-energisation checks">
            <ol className="list-decimal space-y-2 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Visual inspection:</strong> confirm all connections are correctly made and
                tight, no tools or materials left in the enclosure, all guards and covers replaced,
                no visible damage to insulation or components.
              </li>
              <li>
                <strong>Insulation resistance:</strong> measure IR between all live conductors and
                earth, and between live conductors. Compare with BS 7671 Table 64 minimum values
                (1.0 MΩ for circuits up to 500 V).
              </li>
              <li>
                <strong>Continuity:</strong> verify protective conductor continuity (R1+R2) and
                confirm main bonding connections are intact if disturbed during the repair.
              </li>
              <li>
                <strong>Polarity:</strong> confirm correct polarity of connections, especially after
                replacing switches, socket outlets or distribution equipment.
              </li>
              <li>
                <strong>Torque check:</strong> verify all electrical connections are tightened to
                the manufacturer&apos;s specified torque values.
              </li>
            </ol>
          </ConceptBlock>

          <ConceptBlock title="Re-energisation sequence">
            <ol className="list-decimal space-y-2 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Confirm all clear:</strong> verify that all personnel are clear of the
                equipment and no one remains working on the circuit.
              </li>
              <li>
                <strong>Remove temporary earths:</strong> if safety earths were applied, remove them
                in the correct order (earth end last).
              </li>
              <li>
                <strong>Replace covers and guards:</strong> ensure all enclosure covers, barriers
                and protective guards are securely in place.
              </li>
              <li>
                <strong>Remove lock and tag:</strong> remove your personal danger tag first, then
                your safety lock.
              </li>
              <li>
                <strong>Re-energise from supply end:</strong> close the isolator or circuit breaker.
                If multiple stages of isolation exist, re-energise from the supply end working
                towards the load.
              </li>
              <li>
                <strong>Functional testing:</strong> carry out functional tests to confirm the
                repair is successful and the equipment operates correctly — motor rotation, load
                current, control sequences, protective devices.
              </li>
              <li>
                <strong>Monitor:</strong> observe the equipment during initial operation for any
                signs of abnormality — unusual noise, vibration, heat, or smell.
              </li>
              <li>
                <strong>Document:</strong> record all test results, work carried out and the
                equipment&apos;s status in the maintenance log.
              </li>
            </ol>
            <p>
              For complex equipment such as motor control centres or process control systems,
              re-energisation should be carried out in phases. Energise the control circuits first
              and verify correct operation of interlocks, indicators and protective functions. Then
              energise the power circuits under no-load conditions where possible. Finally, apply
              the load gradually while monitoring currents, voltages and temperatures. This phased
              approach minimises the risk of further damage if an issue remains.
            </p>
            <p>
              <strong>ST1426 link:</strong> the maintenance technician standard requires competence
              in safe isolation, testing and recommissioning procedures. The ability to safely
              return equipment to service after repair is a core skill that demonstrates your
              understanding of both electrical safety and equipment functionality.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <VideoCard
            url="https://www.youtube.com/watch?v=SfnQdvbQlgI"

            title="Safe Working Practice, RAMS and Safe Isolation"

            channel="A121 Training"

            duration="9:16"

            topic="How the paperwork and the isolation fit together"

            caption="Ties the RAMS to the physical act of isolating, rather than treating them as two separate exercises."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz
              title="Test Your Knowledge — Safe Isolation and Verification"
              questions={quizQuestions}
            />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section3-7')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Documentation of Faults
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section4-2')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Component Removal and Replacement
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule4Section4_1;
