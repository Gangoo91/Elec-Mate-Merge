/**
 * MOET · Module 4 · Section 5.6 · Subsection 6 — Commissioning Procedures
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option. NOT ST0154 (the "MOET" the course is named after) —
 * ST0154 v1.6 is still live, but its own EPA plan records that the Electrical
 * Technician option "was retired 31/12/2025" and was replaced by ST1426
 * (single discipline) or ST1443 (dual discipline). The course keeps the MOET
 * name because that is what employers and colleges still call the role.
 *
 * KSBs covered, quoted rather than numbered: the IfATE/Skills England API
 * publishes these statements without their K/S/B codes, and the published
 * numbering has not been verified against a primary source — so do not
 * invent codes here.
 *   Knowledge · "Electrical. Electrical plant, equipment, and systems
 *                maintenance requirements: removing and replacing parts,
 *                inspecting, testing, setting up, adjusting, cleaning, and
 *                functional testing."
 *   Skills    · "Electrical. Conduct functional testing."
 *   Knowledge · "Documentation requirements: documentation control,
 *                auditable records."
 *
 * Numeric detail (soak-test durations, RCD-related figures, voltage-drop
 * percentages) is copied verbatim from the original page; the bs7671_facets
 * RAG holds regulation rules, not this kind of procedural/numeric detail,
 * so it could not be checked against it.
 *
 * This is the last subsection of Section 5 — "next" moves into Section 6
 * (Root cause analysis), correcting the original page's next-button target,
 * which pointed back to the section overview instead of continuing the
 * course chain.
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
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
  AppendixTable,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Commissioning Procedures - MOET Module 4.5.6';
const DESCRIPTION =
  'Comprehensive guide to electrical commissioning procedures for maintenance technicians: pre-commissioning checks, energisation sequences, performance verification, soak testing, and handover processes in accordance with BS 7671 and industry best practice.';

const quickCheckQuestions = [
  {
    id: 'comm-definition',
    question: 'What is the primary objective of electrical commissioning?',
    options: [
      'To gather all the operate, maintain and modify information for the finished installation',
      'To verify all systems operate safely and to specification before going into service',
      'To calculate the design current and select the protective devices for each circuit',
      'To produce the quotation and agree the contract price for the installation work',
    ],
    correctIndex: 1,
    explanation:
      'Commissioning is a systematic process of verifying that all electrical systems and equipment operate safely, correctly, and to their design specification before being handed over for normal operational use. It bridges the gap between installation/repair and operational service, ensuring that every component functions as intended individually and as part of the integrated system.',
  },
  {
    id: 'comm-precheck',
    question: 'Why must pre-commissioning checks be completed before any equipment is energised?',
    options: [
      'Because they are only required by the equipment manufacturer to validate the warranty',
      'Because they reduce the total time the installation team needs to spend on site overall',
      'Because BS 7671 forbids any testing of an installation once it has been energised',
      'Because energising before checks risks damage, injury or fire while faults stay hidden',
    ],
    correctIndex: 3,
    explanation:
      'Pre-commissioning checks are the safety net before energisation. They verify that all connections are correct and tight, that protective devices are correctly rated and set, that equipment is suitable for the application, and that no foreign objects or installation debris are present. Energising without these checks risks immediate equipment damage (e.g., from incorrect connections), electrical faults (e.g., from loose connections), or injury (e.g., from a phase-to-earth fault on first energisation).',
  },
  {
    id: 'comm-sequence',
    question: 'What is the correct general sequence for energising an electrical installation?',
    options: [
      'Energise all final circuits first, then work back towards the incoming supply',
      'Energise from the source outwards — supply, switchboard, boards, circuits — verifying each stage',
      'Energise the entire installation simultaneously, to check that it all works at once',
      'Energise the largest load first, then add the smaller circuits in order of size',
    ],
    correctIndex: 1,
    explanation:
      'The correct energisation sequence works from the source outwards: energise the incoming supply, verify correct voltage and phase rotation at the main switchboard, then energise each distribution board in turn, verifying at each stage before proceeding. Finally, energise individual circuits one at a time. This staged approach allows faults to be detected and isolated at each level without affecting the rest of the installation, and provides a controlled, systematic approach to bringing the system online.',
  },
  {
    id: 'comm-soak',
    question: 'What is the purpose of a soak test (extended run test) during commissioning?',
    options: [
      'To clean the equipment internally by running it submerged in a coolant fluid',
      'To verify the insulation resistance of the cables before the supply is connected',
      'To run under load for an extended period to find faults, overheating or drift',
      'To confirm the equipment can withstand a deliberate short-circuit fault current',
    ],
    correctIndex: 2,
    explanation:
      'A soak test runs the equipment under normal operating conditions for an extended period (typically 24-72 hours depending on the application) to identify problems that only manifest over time: intermittent faults (loose connections that only cause problems when components expand from heating), overheating (thermal build-up in enclosures with inadequate ventilation), abnormal vibration or noise, and performance drift. These issues are often invisible during brief functional tests.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Commissioning of electrical systems should be carried out by:',
    options: [
      'Any available operative, since commissioning requires no specific knowledge',
      'Competent persons who know the design, equipment and tests, briefed on the installation',
      'The client alone, who has the best understanding of how the system will be used',
      'The equipment manufacturer only, who must attend every commissioning on site',
    ],
    correctAnswer: 1,
    explanation:
      'Commissioning requires competent persons who understand both the theoretical principles and the practical operation of the systems being commissioned. They must have knowledge of the design intent, the equipment specifications, the testing procedures, and the acceptance criteria. For complex systems, commissioning may require specialists — motor drive commissioning engineers, BMS specialists, or protection relay engineers — working alongside the general installation team.',
  },
  {
    id: 2,
    question: 'A pre-commissioning checklist for a motor control centre (MCC) should include:',
    options: [
      'Only a visual check that the panel doors are closed and the labels are legible',
      'A measurement of the final running current of each motor under its full load',
      'Terminations, torque, device ratings, phase rotation, clean interior and interlocks',
      'Confirmation that the client has signed the handover certificate in advance',
    ],
    correctAnswer: 2,
    explanation:
      'A thorough MCC pre-commissioning checklist covers all aspects: correct cable terminations (including phase sequence and correct allocation to outgoing ways), torque verification on all busbar joints and cable terminations, correct protective device ratings and settings per the design, correct phase rotation verification, removal of all installation debris and foreign objects, secure panel fixings and covers, functional interlock checks, and verification of labelling and circuit directories.',
  },
  {
    id: 3,
    question:
      'Phase rotation (phase sequence) must be verified before energising three-phase equipment because:',
    options: [
      'Incorrect phase rotation increases the supply voltage above the equipment rating',
      'Incorrect phase rotation prevents the protective devices from being correctly rated',
      'Incorrect phase rotation causes the insulation resistance of the cables to fall',
      'It runs motors backwards, risking driven equipment and phase-sensitive relays',
    ],
    correctAnswer: 3,
    explanation:
      'Incorrect phase rotation causes three-phase motors to rotate in the wrong direction. For pumps, fans, compressors, and conveyors, this can cause equipment damage, process failure, or safety hazards (e.g., a pump running backwards can cause water hammer or flooding). Phase-sensitive protection relays may also malfunction. Phase rotation must be verified at each distribution point using a phase rotation meter before any three-phase equipment is started.',
  },
  {
    id: 4,
    question:
      'During commissioning, a motor draws significantly higher current than its nameplate rating. The commissioning engineer should:',
    options: [
      'Stop the motor at once, investigate the cause, and do not restart until it is rectified',
      'Allow the motor to keep running, as high current is normal during commissioning',
      'Increase the rating of the overload protection so the motor stops tripping out',
      'Reduce the supply voltage to bring the current down to the nameplate value',
    ],
    correctAnswer: 0,
    explanation:
      'An overcurrent condition on first start indicates a problem that must be investigated immediately. Possible causes include mechanical overload (seized bearings, jammed driven equipment), incorrect supply voltage (too high or too low), winding fault (short-circuited turns), incorrect motor specification (motor too small for the application), or incorrect connection (e.g., star when delta is required). Running a motor in overcurrent condition will cause overheating and insulation damage.',
  },
  {
    id: 5,
    question: 'The commissioning of a UPS (uninterruptible power supply) system should include:',
    options: [
      'Verification of the mains-powered mode only, as the battery mode rarely operates',
      'All modes — normal, battery, bypass and transfer — with times and output under load',
      'A simple visual inspection of the battery terminals without any functional test',
      'A check of the output voltage in bypass mode only, with no load connected',
    ],
    correctAnswer: 1,
    explanation:
      'UPS commissioning must verify operation in all operating modes: normal operation (load powered from mains via the UPS), battery operation (load maintained during mains failure, including verification of changeover time and battery duration), bypass operation (load powered directly from mains for UPS maintenance), and automatic retransfer when mains is restored. Output voltage, frequency, and waveform quality must be verified under load in each mode.',
  },
  {
    id: 6,
    question:
      'A commissioning programme for a new building electrical installation should be developed:',
    options: [
      'Only after the installation is complete and the system has already been energised',
      'On the day of handover, once the client has confirmed the final requirements',
      'During design and planning, with the sequence, roles and criteria set in advance',
      'After the first fault occurs, so the programme can address real problems found',
    ],
    correctAnswer: 2,
    explanation:
      'The commissioning programme should be developed during the design and planning stage, not as an afterthought. Early planning ensures that commissioning requirements influence the installation (e.g., provision of test points, access for commissioning equipment), that responsibilities are clearly assigned, that the commissioning sequence is compatible with the construction programme, and that acceptance criteria are agreed in advance with the client.',
  },
  {
    id: 7,
    question:
      'After replacing a variable speed drive (VSD) during maintenance, the commissioning process should include:',
    options: [
      'Connecting the drive and leaving it on its factory default parameters',
      'A visual check of the drive display only, with no test run of the motor',
      'Confirming the drive powers up, then returning the system straight to service',
      'Setting all parameters from the record and test-running the motor at various speeds',
    ],
    correctAnswer: 3,
    explanation:
      'A replacement VSD must be configured with the correct parameters for the specific motor and application. This includes motor data (voltage, current, frequency, speed, power factor), acceleration and deceleration ramp times, minimum and maximum speed limits, protection settings (overcurrent, overvoltage, earth fault), control interface configuration (analogue input scaling, digital input/output assignments), and PID controller settings if used. A test run at various speeds confirms correct operation and smooth speed control.',
  },
  {
    id: 8,
    question: 'Thermal imaging during commissioning is used to:',
    options: [
      'Identify hot spots from loose connections, overloads, unbalance or failing components',
      'Measure the insulation resistance between the conductors while the system is dead',
      'Confirm the correct phase rotation at each three-phase distribution board on site',
      'Record the exact dimensions of the switchgear for the as-built drawing set',
    ],
    correctAnswer: 0,
    explanation:
      'Thermal imaging (infrared thermography) during commissioning identifies abnormal heat generation that indicates problems: high-resistance connections (loose terminations, corroded contacts), overloaded conductors (undersized cables, excessive current), unbalanced loads on three-phase systems, and failing components (overheating capacitors, deteriorating insulation). Conducting a thermal survey during commissioning provides a baseline for comparison during future maintenance surveys.',
  },
  {
    id: 9,
    question: 'A witness test during commissioning involves:',
    options: [
      "A second technician repeating every test to check the first technician's work",
      'The client or their representative observing the tests and verifying the results',
      'Testing the installation without informing anyone, to catch hidden faults',
      'A legal statement signed by a witness confirming the installer was on site',
    ],
    correctAnswer: 1,
    explanation:
      'A witness test is a formal commissioning activity where the client or their representative observes the tests being carried out and verifies the results. This provides independent confirmation that the system meets the specified requirements and gives the client confidence in the commissioning process. Witness tests are typically scheduled for critical systems and agreed in advance as part of the commissioning programme.',
  },
  {
    id: 10,
    question: 'The commissioning record (documentation pack) should include:',
    options: [
      'Only a single pass or fail statement covering the whole installation',
      'Just the manufacturer data sheets for the equipment that was installed',
      'Checklists, certificates, settings, thermal and soak records, snags and handover status',
      "The contractor's invoice and a copy of the agreed contract price only",
    ],
    correctAnswer: 2,
    explanation:
      'The commissioning record is a comprehensive documentation pack that provides the complete history of the commissioning process: pre-commissioning checklists (confirming readiness for energisation), test results and certificates (formal BS 7671 documentation), equipment settings and configurations (drive parameters, relay settings, BMS configurations), thermal survey results, soak test records, snag lists (outstanding items and their resolution), and a clear handover statement. This record is invaluable for future maintenance.',
  },
  {
    id: 11,
    question: "A 'snag list' in the context of commissioning refers to:",
    options: [
      'The list of tools and test equipment required to carry out the commissioning',
      'A schedule of the planned preventive maintenance tasks for the installation',
      'The sequence in which the circuits should be energised during commissioning',
      'A list of minor defects found at commissioning, to be fixed before or soon after handover',
    ],
    correctAnswer: 3,
    explanation:
      "A snag list is a formal document that records all items identified during commissioning that do not meet the required standard or are incomplete. Each item is described, assigned a priority, given a responsibility, and tracked to resolution. Minor snags may be agreed for resolution within a defined period after handover (with the client's agreement), while safety-critical snags must be resolved before the system is placed into service.",
  },
  {
    id: 12,
    question:
      "After commissioning is complete and the system is handed over, the maintenance technician's responsibility is to:",
    options: [
      'File the records as the baseline, set the maintenance schedule, and watch early-life performance',
      'Discard the commissioning records, since they are no longer needed after handover',
      'Re-commission the entire installation from scratch every month as a routine task',
      'Hand all responsibility to the client and take no further interest in the system',
    ],
    correctAnswer: 0,
    explanation:
      "After handover, the commissioning records become the baseline against which all future maintenance measurements are compared. The maintenance technician should ensure these records are properly filed and accessible, establish a preventive maintenance schedule based on the equipment manufacturers' recommendations and any commissioning findings, and monitor the system during its early operational life for infant mortality failures, settling issues, or performance drift that may require early intervention.",
  },
];

const faqs = [
  {
    question: 'What is the difference between commissioning and initial verification?',
    answer:
      'Initial verification (as defined in BS 7671 Part 6) is the specific process of inspecting and testing an electrical installation to confirm it complies with BS 7671 before it is put into service. Commissioning is a broader process that includes initial verification but also encompasses pre-commissioning checks, performance testing, functional testing, load testing, soak testing, parameter optimisation, and formal handover. Initial verification confirms regulatory compliance; commissioning confirms operational readiness.',
  },
  {
    question: 'Is commissioning required after maintenance work?',
    answer:
      'The scope of commissioning after maintenance depends on the extent of the work. Like-for-like replacement of a component (e.g., a contactor) requires re-commissioning of that component and verification that the system still functions correctly. A major overhaul or modification may require full recommissioning of the affected system. The principle is that any work that could affect the safe or correct operation of the system must be followed by sufficient commissioning to verify that the system is fit for service.',
  },
  {
    question: 'Who is responsible for commissioning on a construction project?',
    answer:
      "Responsibility depends on the contract arrangements. Typically, the electrical contractor commissions their own installation, with the principal contractor coordinating the overall commissioning programme. For complex projects, a dedicated commissioning manager may be appointed. The client or their representative witnesses critical tests. Under CDM 2015, the principal contractor must ensure adequate commissioning before handover. All parties' responsibilities should be clearly defined in the project documents.",
  },
  {
    question: 'What safety precautions are needed during commissioning?',
    answer:
      'Commissioning involves working on and near energised equipment, which requires specific safety precautions: use of GS 38 compliant test leads, appropriate PPE (including arc flash protection for high-energy systems), risk assessments for each commissioning activity, competent persons only, clear communication between team members (especially during energisation sequences), isolation and lockout procedures for de-energised work phases, and ready access to first aid and emergency provisions.',
  },
  {
    question: 'How detailed should commissioning records be?',
    answer:
      'Commissioning records should be detailed enough that a competent person who was not present during commissioning can understand exactly what was tested, how it was tested, what the results were, and whether the results met the acceptance criteria. This typically means recording: the specific test performed, the test conditions, the measured values (not just pass/fail), the acceptance criteria, and the conclusion. Photographs and videos can supplement written records, particularly for complex systems.',
  },
];

const MOETModule4Section5_6 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 4 · Section 4.5 · Subsection 6"
        title="Commissioning Procedures"
        backTo="/study-centre/apprentice/m-o-e-t-module4-section5"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Systematic commissioning of electrical installations from pre-checks through
            energisation to handover.
          </p>

          <TLDR
            points={[
              'Purpose: Verify systems operate safely and to specification before service',
              'Sequence: Pre-checks, energisation (source outwards), functional tests, soak test',
              'Documentation: Checklists, test records, snag lists, handover pack',
              'Baseline: Commissioning records become the reference for future maintenance',
            ]}
          />

          <ConceptBlock title="Maintenance technician context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>After repairs:</strong> Re-commission affected systems proportional to the
                work scope
              </li>
              <li>
                <strong>Safety:</strong> Energisation involves live working risks — plan and control
                carefully
              </li>
              <li>
                <strong>Records:</strong> Commissioning data provides the baseline for condition
                monitoring
              </li>
              <li>
                <strong>ST1426:</strong> Maps to commissioning, handover, and quality assurance
                competencies
              </li>
            </ul>
          </ConceptBlock>

          <LearningOutcomes
            outcomes={[
              'Describe the purpose and stages of the electrical commissioning process',
              'Develop and execute pre-commissioning checklists for different equipment types',
              'Plan and execute a safe energisation sequence from source to final circuits',
              'Conduct performance verification including load testing and soak testing',
              'Document commissioning results and compile the handover documentation pack',
              'Apply commissioning principles to maintenance scenarios (re-commissioning after repairs)',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Understanding the commissioning process</ContentEyebrow>

          <ConceptBlock
            title="Understanding the Commissioning Process"
            onSite="The cost of inadequate commissioning: Inadequate commissioning is one of the leading causes of early-life equipment failure. Issues that should have been detected during commissioning — incorrect connections, wrong protective device settings, misaligned drives, incorrect control parameters — instead manifest as operational failures, sometimes with dangerous consequences. The time and cost of proper commissioning is always less than the time, cost, and risk of dealing with commissioning failures after the system is in service."
          >
            <p>
              Commissioning is the systematic process of bringing an electrical installation or
              piece of equipment from a state of installation or repair to full operational
              readiness. It encompasses all the activities necessary to verify that the system
              operates safely, correctly, and to its design specification before it is handed over
              for normal use. Unlike a simple &quot;switch it on and see if it works&quot; approach,
              commissioning follows a structured, documented procedure that identifies and resolves
              issues at each stage.
            </p>
            <p>
              The commissioning process has several distinct phases: planning (defining what will be
              tested, in what order, by whom, and against what criteria), pre-commissioning checks
              (verifying readiness for energisation while the system is still de-energised and
              safe), energisation (applying power in a controlled, staged sequence), functional
              testing (verifying that each device and system performs its intended function),
              performance testing (verifying that the system meets its performance specification
              under load), and handover (formal transfer of the system to the client or operator
              with complete documentation).
            </p>
            <p>
              For maintenance technicians, commissioning is not limited to new installations. Every
              time a significant repair or modification is made, the affected system must be
              re-commissioned to the extent appropriate for the work carried out. Replacing a motor
              requires re-commissioning of the motor circuit. Modifying a control panel requires
              re-commissioning of the control system. Even replacing a protective device requires
              verification that the replacement is correctly rated and functions properly. The
              principle is the same: verify before you return to service.
            </p>
          </ConceptBlock>

          <AppendixTable
            caption="Commissioning Phases"
            headers={['Phase', 'Key Activities']}
            rows={[
              [
                '1. Planning',
                'Define scope, sequence, responsibilities, acceptance criteria, safety requirements',
              ],
              [
                '2. Pre-commissioning',
                'Visual inspection, torque checks, IR testing, continuity testing, earth loop impedance calculation',
              ],
              [
                '3. Energisation',
                'Staged power-up from source outwards, voltage checks at each stage',
              ],
              [
                '4. Functional testing',
                'Protective device operation, control sequences, interlocks, safety systems',
              ],
              [
                '5. Performance/soak',
                'Load testing, thermal survey, extended run, performance verification',
              ],
              ['6. Handover', 'Documentation, training, snag resolution, formal acceptance'],
            ]}
          />

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Pre-commissioning checks</ContentEyebrow>

          <ConceptBlock title="Pre-Commissioning Checks">
            <p>
              Pre-commissioning checks are carried out while the system is de-energised and safe to
              work on. Their purpose is to verify that the installation is ready for energisation —
              that all connections are correct and secure, that protective devices are correctly
              rated and set, that the installation is clean and free from debris, and that all
              mechanical and electrical checks specified in the commissioning programme have been
              satisfactorily completed. Only when all pre-commissioning checks have been completed
              and documented should the energisation phase begin.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Visual inspection">
            <p>
              A thorough visual inspection checks for: correct cable terminations and conductor
              identification (colours and marking), absence of visible damage to cables, equipment,
              and enclosures, correct routing of cables with appropriate support and separation,
              correct IP ratings for the environment, presence and condition of all covers,
              barriers, and enclosures, removal of all installation debris (cable ties, wire
              offcuts, packaging materials), correct labelling of all equipment, circuits, and
              warning notices, and accessibility of all isolation and switching devices.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Mechanical checks">
            <p>Mechanical checks include:</p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                Torque verification on all bolted connections (busbars, cable lugs, earth bars)
                using a calibrated torque wrench to manufacturer&apos;s specification
              </li>
              <li>
                Verification that all switchgear operating mechanisms move freely and smoothly
              </li>
              <li>
                Checking that all racking mechanisms, draw-out mechanisms, and shutters operate
                correctly
              </li>
              <li>Verification that all interlocks engage and disengage correctly</li>
              <li>Checking motor shaft rotation freedom (where possible) before energisation</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Electrical tests (de-energised)">
            <p>
              Complete all BS 7671 initial verification tests before energisation: continuity of
              protective conductors (R1+R2), insulation resistance between all conductors, polarity
              verification, and calculation of expected earth fault loop impedance from Ze and
              R1+R2. For three-phase systems, verify correct phase identification at all termination
              points. For systems with protection relays, verify relay settings against the
              protection study before energisation.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Energisation sequence and live testing</ContentEyebrow>

          <ConceptBlock title="Energisation Sequence and Live Testing">
            <p>
              Energisation is the most critical phase of commissioning from a safety perspective. It
              is the point at which the installation transitions from a de-energised state (where it
              is safe to touch any conductor) to an energised state (where contact with live parts
              can cause injury or death). The energisation sequence must be carefully planned,
              controlled, and documented, with clear communication between all team members.
            </p>
            <ol className="list-decimal space-y-3 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Supply energisation.</strong> Close the main incoming switch or circuit
                breaker. Verify correct supply voltage (phase-to-phase and phase-to-neutral) and
                correct phase rotation at the main switchboard. Do not proceed if voltages are
                incorrect or unexpected.
              </li>
              <li>
                <strong>Main distribution.</strong> Close each main distribution feeder in turn. At
                each distribution board, verify correct voltage before proceeding. Check for any
                abnormal indications (smoke, unusual noise, burning smell).
              </li>
              <li>
                <strong>Sub-distribution.</strong> Energise sub-distribution boards one at a time.
                Verify voltages and correct operation of indicator lamps and metering at each level.
              </li>
              <li>
                <strong>Final circuits.</strong> Close each final circuit individually. Verify
                correct operation at the load end. For motor circuits, bump-test motors briefly
                (momentary start) to confirm correct rotation before full starting.
              </li>
              <li>
                <strong>Live tests.</strong> Conduct earth fault loop impedance (Zs) measurements,
                RCD testing, and functional testing of protective devices now that the installation
                is energised.
              </li>
            </ol>
          </ConceptBlock>

          <ConceptBlock
            title="Phase rotation verification"
            onSite="Safety during energisation: All persons must be aware that the system is transitioning from de-energised to live. Use a formal energisation permit or procedure, ensure all team members are briefed, keep all covers and barriers closed (test through designated test points where possible), use GS 38 compliant test equipment, and be prepared to de-energise immediately if any abnormality is detected. Have fire extinguishers readily available in case of an electrical fire during first energisation."
          >
            <p>
              For three-phase installations, phase rotation must be verified at the incoming supply
              and at every distribution point downstream. Use a phase rotation meter (phase sequence
              indicator) to confirm that the rotation matches the design (typically L1-L2-L3,
              clockwise). Incorrect phase rotation at any point must be corrected before energising
              any three-phase equipment downstream. Common causes of incorrect rotation include
              crossed phases at a terminal, incorrect cable allocation during installation, or a
              change in supply phase sequence by the DNO.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Performance testing and soak testing</ContentEyebrow>

          <ConceptBlock title="Performance Testing and Soak Testing">
            <p>
              Once the installation is energised and the functional tests have confirmed correct
              operation, the next phase is performance testing — verifying that the system meets its
              design performance specification under realistic load conditions. This includes load
              testing (applying the design load and verifying that voltages, currents, and
              temperatures are within specification), soak testing (running the system under load
              for an extended period to identify intermittent or time-dependent faults), and thermal
              verification (using infrared thermography to check for hot spots).
            </p>
          </ConceptBlock>

          <ConceptBlock title="Load testing">
            <p>
              Load testing verifies that the system can deliver its design performance under the
              expected operating conditions. For a distribution system, this means checking voltage
              levels at the furthest points under load, verifying that voltage drops are within the
              limits specified by BS 7671 (typically 5% for lighting, 5% for other uses, from the
              origin to the load), and confirming that no cables, connections, or equipment are
              overheating. For motor circuits, load testing verifies starting current, running
              current, speed, and vibration under load.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Soak testing">
            <p>
              A soak test operates the system under normal load conditions for an extended period —
              typically 24 to 72 hours, though the duration depends on the system type and the
              client&apos;s requirements. During the soak period, the system is monitored for:
              temperature stability (all components should reach a steady-state temperature within
              design limits), intermittent faults (nuisance tripping, flickering, dropouts),
              abnormal noise or vibration (developing bearing failures, loose fixings), and
              performance consistency (output remaining within specification throughout).
            </p>
          </ConceptBlock>

          <ConceptBlock title="Thermal survey">
            <p>
              An infrared thermal survey conducted during the soak test (or as soon as the system
              has reached thermal equilibrium under load) provides a visual map of temperature
              distribution across all connections, conductors, and equipment. Hot spots identified
              at this stage — typically caused by high-resistance connections, undersized
              conductors, or unbalanced loads — can be rectified before they develop into failures.
              The thermal images also serve as a baseline for future comparative surveys during
              preventive maintenance.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Handover and ongoing maintenance</ContentEyebrow>

          <ConceptBlock title="Handover and Ongoing Maintenance">
            <p>
              The handover phase formally transfers the commissioned system from the commissioning
              team (or the maintenance team, in the case of re-commissioning after a repair) to the
              client or operator. This is a critical transition point — from this moment, the
              receiving party takes responsibility for the safe operation and maintenance of the
              system. The quality of the handover directly affects the quality of ongoing
              maintenance.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Handover documentation pack">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Commissioning records:</strong> All checklists, test results, and
                verification records from the commissioning process
              </li>
              <li>
                <strong>BS 7671 certificates:</strong> EIC with Schedules of Inspection and Test
                Results
              </li>
              <li>
                <strong>As-built drawings:</strong> Updated to reflect the actual installation,
                including any variations from the design
              </li>
              <li>
                <strong>Equipment settings:</strong> Recorded parameters for all configurable
                equipment (drives, relays, BMS controllers)
              </li>
              <li>
                <strong>O&amp;M manuals:</strong> Manufacturer&apos;s operation and maintenance
                documentation for all installed equipment
              </li>
              <li>
                <strong>Warranty documentation:</strong> Product warranties, extended warranty
                details, and warranty conditions
              </li>
              <li>
                <strong>Snag list:</strong> Status of all items identified during commissioning,
                with evidence of resolution
              </li>
              <li>
                <strong>Recommended maintenance schedule:</strong> Based on manufacturer&apos;s
                recommendations and commissioning findings
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Commissioning records as maintenance baseline">
            <p>
              The commissioning records serve a vital function in ongoing maintenance: they
              establish the baseline against which all future measurements are compared. The
              insulation resistance, earth fault loop impedance, RCD trip times, motor currents, and
              temperature profiles recorded during commissioning represent the &quot;as new&quot;
              condition of the installation. Any deterioration detected during subsequent
              maintenance inspections is measured against this baseline, enabling accurate
              assessment of the rate of deterioration and informed decisions about intervention
              timing.
            </p>
            <p className="italic">
              <strong className="not-italic">ST1426 link:</strong> The maintenance technician
              standard requires competence in commissioning procedures, handover processes, and the
              establishment of maintenance baselines. Demonstrating that you understand how
              commissioning links to ongoing maintenance — that the records created today enable the
              condition-based maintenance of tomorrow — is a key differentiator in the end-point
              assessment.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'Commissioning sequence: plan (scope, sequence, criteria, safety); pre-commission (visual, mechanical, electrical dead tests); energise (staged, source outwards, verify at each stage); functional test (protective devices, controls, safety); performance/soak (load test, thermal survey, extended run); handover (documentation, training, formal acceptance).',
              'Commissioning documentation: pre-commissioning checklists (signed off), BS 7671 certificates (EIC + schedules), equipment settings and configurations, thermal survey images and report, soak test records and observations, snag list with resolution evidence.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Test Your Knowledge" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section5-5')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Test Documentation and Certification
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section6-1')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next section <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Identifying Underlying Failures
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule4Section5_6;
