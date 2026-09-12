/**
 * MOET · Module 4 · Section 5.1 · Subsection 1 — Insulation Resistance Testing
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
 *   Knowledge · "Electrical. Electrical maintenance tools, measurement, and
 *                test equipment application, operation, care and
 *                calibration requirements."
 *              · "Electrical. Inspect and test electrical aspects of plant.
 *                 For example, visual checks, insulation and continuity
 *                 checks, thermographic surveys, and voltage levels."
 *
 * Numeric values (insulation resistance test voltages, minimum acceptable
 * resistances) are copied verbatim from the original page. The bs7671_facets
 * RAG holds regulation rules, not numeric tables, so none of these can be
 * checked against it — see the conversion report for what should be
 * verified against BS 7671 Table 64 / GN3.
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
  ContentEyebrow,
  SectionRule,
  AppendixTable,
  VideoCard,
} from '@/components/study-centre/learning';
import { InsulationResistanceTest } from '@/components/study-centre/diagrams';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Insulation Resistance Testing - MOET Module 4.5.1';
const DESCRIPTION =
  'Comprehensive guide to insulation resistance testing in electrical maintenance: test principles, instrument selection, test procedures, interpreting results, and trending for condition-based maintenance in accordance with BS 7671.';

const quickCheckQuestions = [
  {
    id: 'ir-test-purpose',
    question: 'What is the primary purpose of insulation resistance testing?',
    options: [
      'To confirm the continuity of the circuit protective conductor end to end',
      'To measure the earth fault loop impedance of the circuit under test',
      'To verify that the insulation between live conductors and between live conductors and earth is adequate to prevent leakage current and short circuits',
      'To check that the protective device will disconnect within the required time',
    ],
    correctIndex: 2,
    explanation:
      'Insulation resistance testing verifies that the insulation between live conductors (line-neutral) and between live conductors and earth (line-earth, neutral-earth) is sufficiently high to prevent dangerous leakage current and short circuits. Degraded insulation is a common precursor to electrical faults, fires, and electric shock incidents.',
  },
  {
    id: 'ir-test-voltage',
    question:
      'For a 230 V single-phase circuit, what test voltage should be applied when conducting an insulation resistance test in accordance with BS 7671?',
    options: ['230 V a.c.', '250 V d.c.', '500 V d.c.', '1000 V d.c.'],
    correctIndex: 2,
    explanation:
      'BS 7671 Table 64 specifies that for circuits with a nominal voltage above 50 V up to and including 500 V (which includes standard 230 V single-phase and 400 V three-phase circuits), the test voltage is 500 V d.c. and the minimum acceptable insulation resistance is 1 MΩ. The test uses d.c. rather than a.c. to avoid capacitive effects.',
  },
  {
    id: 'ir-test-disconnections',
    question:
      'Before conducting an insulation resistance test, which of the following must be disconnected from the circuit?',
    options: [
      'Only the lamps in the lighting circuits, leaving all other equipment connected',
      'All electronic equipment, surge protective devices (SPDs), and any equipment that could be damaged by the test voltage',
      'Only the main switch, while leaving the final circuits energised',
      'Nothing — the test can safely be carried out with all equipment connected',
    ],
    correctIndex: 1,
    explanation:
      'Electronic equipment (computers, PLCs, variable speed drives), surge protective devices (SPDs), dimmer switches, and other sensitive components must be disconnected before applying the insulation resistance test voltage, as the 500 V d.c. test voltage can damage or destroy them. Lamps should also be removed or disconnected to avoid giving a misleadingly low reading.',
  },
  {
    id: 'ir-test-trending',
    question:
      'Why is trending of insulation resistance values over time more valuable than a single test reading?',
    options: [
      'Because a single reading is always inaccurate and cannot be trusted on its own',
      'Because trending reveals the rate of insulation degradation, allowing deterioration to be identified and addressed before values fall below the minimum acceptable level',
      'Because BS 7671 requires at least three readings to be averaged for every circuit',
      'Because trending removes the need to disconnect sensitive equipment before testing',
    ],
    correctIndex: 1,
    explanation:
      'While a single insulation resistance reading confirms whether the insulation currently meets the minimum standard, trending over multiple test cycles reveals the rate of deterioration. A circuit with a reading of 5 MΩ that was 200 MΩ two years ago is declining rapidly and requires investigation, even though it still exceeds the 1 MΩ minimum. Trending supports condition-based maintenance by enabling proactive intervention.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Insulation resistance is measured in:',
    options: ['Ohms (Ω)', 'Megohms (MΩ)', 'Milliohms (mΩ)', 'Amps (A)'],
    correctAnswer: 1,
    explanation:
      'Insulation resistance is measured in megohms (MΩ) because healthy insulation has a very high resistance — typically tens or hundreds of megohms for new installations. The minimum acceptable value under BS 7671 for standard circuits is 1 MΩ, which is one million ohms.',
  },
  {
    id: 2,
    question:
      'According to BS 7671 Table 64, the minimum acceptable insulation resistance for a 230 V circuit tested at 500 V d.c. is:',
    options: ['2 MΩ', '0.5 MΩ', '1 MΩ', '10 MΩ'],
    correctAnswer: 2,
    explanation:
      'BS 7671 Table 64 specifies a minimum insulation resistance of 1 MΩ for circuits with a nominal voltage exceeding 50 V up to and including 500 V when tested at 500 V d.c. While 1 MΩ is the minimum pass value, readings this low warrant further investigation as they indicate significant insulation degradation.',
  },
  {
    id: 3,
    question: 'Which type of voltage is used for insulation resistance testing?',
    options: [
      'Either a.c. or d.c. — the choice does not matter',
      'Alternating current (a.c.) at the supply frequency',
      'Pulsed d.c. at high frequency',
      'Direct current (d.c.) at the specified test voltage',
    ],
    correctAnswer: 3,
    explanation:
      'Insulation resistance tests use d.c. test voltages. This is because a.c. would cause capacitive current flow through the cable capacitance, giving misleadingly low resistance readings. D.c. provides a true measure of the resistive component of the insulation, which is what determines whether the insulation is adequate.',
  },
  {
    id: 4,
    question:
      'Before conducting an insulation resistance test on a motor circuit, the maintenance technician should:',
    options: [
      'Isolate the circuit, lock off, prove dead, disconnect the motor and any electronic drive equipment, then conduct the test',
      'Leave the motor connected to its variable speed drive so the windings and drive can be tested as a single assembly',
      'Run the motor on load for ten minutes first so the windings reach operating temperature before the test is applied',
      'Apply 1000 V d.c. regardless of the motor voltage, as a higher test voltage always gives a more reliable result',
    ],
    correctAnswer: 0,
    explanation:
      'The circuit must be isolated, locked off, and proved dead before testing. The motor should be disconnected from any electronic drive (VSD/VFD) as the test voltage will damage electronic components. The insulation resistance of the cable and motor windings can then be tested separately, which helps to localise any insulation weakness.',
  },
  {
    id: 5,
    question:
      'A circuit that reads 0.5 MΩ during an insulation resistance test at 500 V d.c. should be classified as:',
    options: [
      'Satisfactory — it comfortably exceeds the minimum value for this circuit type',
      'Unsatisfactory — it is below the minimum acceptable value of 1 MΩ and requires investigation',
      'Satisfactory — any reading above zero confirms the insulation is intact',
      'Unsatisfactory — it is below the 2 MΩ minimum that BS 7671 requires for all circuits',
    ],
    correctAnswer: 1,
    explanation:
      'A reading of 0.5 MΩ is below the minimum acceptable value of 1 MΩ specified in BS 7671 and is therefore unsatisfactory. The circuit should not be returned to service until the cause of the low insulation resistance has been identified and rectified. Common causes include moisture ingress, damaged insulation, or contamination.',
  },
  {
    id: 6,
    question: 'What effect does temperature have on insulation resistance readings?',
    options: [
      'Temperature has no measurable effect on insulation resistance, so readings can be compared directly regardless of when they were taken',
      'Higher temperatures generally cause higher insulation resistance readings, so warm circuits tend to read more favourably than cold ones',
      'Higher temperatures generally cause lower insulation resistance readings, and this must be considered when comparing readings taken at different times',
      'Temperature affects only a.c. measurements, so the d.c. test used for insulation resistance is completely unaffected by it',
    ],
    correctAnswer: 2,
    explanation:
      'Insulation resistance decreases as temperature increases — approximately halving for every 10°C rise above 20°C. This is important when comparing readings taken at different times of year or under different operating conditions. For accurate trending, readings should be corrected to a standard reference temperature (usually 20°C) or the temperature at the time of testing should be recorded.',
  },
  {
    id: 7,
    question:
      'The three standard insulation resistance test configurations for a single-phase circuit are:',
    options: [
      'Line to neutral, line to earth, line to line',
      'Line to earth only, repeated three times to confirm the reading is consistent',
      'Neutral to earth, neutral to line, earth to the bonding conductor',
      'Line to neutral, line to earth, neutral to earth',
    ],
    correctAnswer: 3,
    explanation:
      'For a single-phase circuit, insulation resistance is tested between line and neutral (L-N), line and earth (L-E), and neutral and earth (N-E). Each test checks a different insulation barrier. For three-phase circuits, additional tests between phases (L1-L2, L2-L3, L1-L3) are also required, as well as each phase to neutral and each phase to earth.',
  },
  {
    id: 8,
    question: 'After completing an insulation resistance test, the technician should:',
    options: [
      'Discharge any stored capacitive charge by shorting the conductors together before reconnecting equipment or touching conductors',
      'Immediately reconnect all disconnected equipment so the installation can be re-energised without delay',
      'Leave the conductors open so the cable capacitance can self-discharge gradually over the next few minutes',
      'Re-apply the test voltage a second time to confirm the reading before recording it on the schedule',
    ],
    correctAnswer: 0,
    explanation:
      "After an insulation resistance test, the cable capacitance retains a charge at the test voltage (up to 1000 V for some tests). This stored charge can deliver a painful or dangerous shock. The charge must be safely discharged by shorting the conductors together through the test instrument's discharge function or by connecting them together before anyone touches the conductors or reconnects equipment.",
  },
  {
    id: 9,
    question:
      'Which environmental condition most commonly causes reduced insulation resistance in an otherwise healthy installation?',
    options: [
      'A small rise in the ambient temperature on the day of testing',
      'Moisture — from condensation, water ingress, or high humidity',
      'A slightly low battery in the test instrument during the measurement',
      'Vibration from nearby machinery during the test sequence',
    ],
    correctAnswer: 1,
    explanation:
      'Moisture is the most common environmental cause of reduced insulation resistance. Condensation in distribution boards, water ingress through damaged cable glands or enclosure seals, and high humidity in poorly ventilated spaces all reduce insulation resistance. Drying out the installation and rectifying the moisture source typically restores the insulation resistance to acceptable levels.',
  },
  {
    id: 10,
    question:
      'An insulation resistance test instrument must be verified before use. The standard method is:',
    options: [
      'Connecting the leads across a known live 230 V supply to confirm the instrument reads the voltage correctly',
      'Measuring the resistance of a 1 MΩ resistor and confirming the reading is exactly at the minimum pass value',
      'Testing with leads open-circuited (should read infinity/overrange) and short-circuited (should read approximately zero), and checking the battery condition',
      'Applying the test to a damp surface to confirm the instrument can detect a low insulation resistance',
    ],
    correctAnswer: 2,
    explanation:
      'Before use, the instrument should be verified by testing with the leads open-circuited (the reading should be infinity or overrange, confirming the instrument can detect high resistance) and short-circuited (the reading should be approximately zero, confirming the leads and connections are sound). Battery condition should also be checked. This does not replace periodic calibration but confirms the instrument is functioning correctly for the test session.',
  },
  {
    id: 11,
    question:
      'For SELV (Separated Extra-Low Voltage) circuits operating at 25 V, the test voltage and minimum insulation resistance specified by BS 7671 are:',
    options: [
      '500 V d.c. and 1 MΩ',
      '100 V d.c. and 0.25 MΩ',
      '1000 V d.c. and 2 MΩ',
      '250 V d.c. and 0.5 MΩ',
    ],
    correctAnswer: 3,
    explanation:
      'BS 7671 Table 64 specifies that for SELV and PELV circuits (nominal voltage not exceeding 50 V), the test voltage is 250 V d.c. and the minimum acceptable insulation resistance is 0.5 MΩ. The lower test voltage protects the insulation of circuits designed for extra-low voltage operation.',
  },
  {
    id: 12,
    question:
      'When testing a large installation with many circuits, an initial test of all circuits together reads 0.8 MΩ. The correct next step is:',
    options: [
      'Test each circuit individually to identify which circuit(s) have low insulation resistance, as the overall reading is the parallel combination of all circuits',
      'Accept the reading as satisfactory, since the combined value of many circuits is always expected to be below 1 MΩ',
      'Re-test using a lower 250 V d.c. range so that the combined reading rises above the 1 MΩ minimum',
      "Average the reading with the previous year's figure and record the mean value on the schedule",
    ],
    correctAnswer: 0,
    explanation:
      'When testing multiple circuits in parallel, the overall reading is the parallel combination of all individual circuit resistances and will always be lower than the lowest individual reading. An overall reading below 1 MΩ indicates that one or more circuits have low insulation resistance. Each circuit must be tested individually to identify the specific circuit(s) requiring attention. The faulty circuit may read well below 1 MΩ while all others are satisfactory.',
  },
];

const faqs = [
  {
    question: 'How often should insulation resistance testing be carried out?',
    answer:
      "BS 7671 does not mandate specific intervals — it depends on the type of installation, its environment, and the duty holder's risk assessment. For commercial and industrial installations, testing as part of an EICR is typically recommended every 1-5 years depending on the installation type. Critical installations (hospitals, process plant) may require more frequent testing. For maintenance purposes, insulation resistance testing should also be carried out after any repair, modification, or suspected fault.",
  },
  {
    question: 'Can insulation resistance testing damage equipment?',
    answer:
      'Yes — the d.c. test voltage (250 V, 500 V, or 1000 V depending on the circuit) can damage sensitive electronic equipment including computers, PLCs, variable speed drives, LED drivers, surge protective devices, and dimmer switches. All such equipment must be disconnected before testing. Lamps (especially LEDs and CFLs) should also be removed or disconnected to avoid damage and to prevent misleadingly low readings.',
  },
  {
    question: 'What causes a sudden drop in insulation resistance?',
    answer:
      'A sudden significant drop typically indicates a specific event rather than gradual degradation: water ingress following rainfall or a leak, physical damage to a cable (e.g., from drilling or rodent activity), contamination from chemical spills or industrial processes, or a fault developing in equipment connected to the circuit. The cause should be investigated promptly, as a rapid decline may precede a complete insulation failure.',
  },
  {
    question: 'Is 1 MΩ actually a good insulation resistance reading?',
    answer:
      "While 1 MΩ is the minimum acceptable value under BS 7671, it is not a 'good' reading. New, healthy installations typically exhibit insulation resistance values of 200 MΩ or more. A reading of 1 MΩ indicates significant insulation degradation and, while it technically passes, it warrants investigation into the cause and monitoring for further decline. The IET Guidance Note 3 recommends that any reading below 2 MΩ should prompt further investigation.",
  },
  {
    question: 'How does cable length affect insulation resistance?',
    answer:
      'Insulation resistance is inversely proportional to cable length — longer cables have lower insulation resistance because there is more insulation surface area through which leakage current can flow. The 1 MΩ minimum in BS 7671 applies to the whole circuit. For very long cable runs, the measured insulation resistance of a healthy circuit may be lower than expected. This is a physical property, not a fault, but should be documented and understood when trending results.',
  },
];

const MOETModule4Section5_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 4 · Section 4.5 · Subsection 1"
        title="Insulation Resistance Testing"
        backTo="/study-centre/apprentice/m-o-e-t-module4-section5"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Principles, procedures, and interpretation of insulation resistance testing for
            electrical maintenance.
          </p>

          <TLDR
            points={[
              'Purpose: Verify insulation integrity between conductors and earth',
              'Test voltage: 250 V, 500 V, or 1000 V d.c. depending on circuit voltage',
              'Minimum value: 1 MΩ for standard 230/400 V circuits (BS 7671)',
              'Trending: Track values over time to detect deterioration before failure',
            ]}
          />

          <ConceptBlock title="Maintenance technician context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>When to test:</strong> After repairs, modifications, suspected faults, and
                periodic inspections
              </li>
              <li>
                <strong>Precautions:</strong> Isolate, prove dead, disconnect sensitive electronics
              </li>
              <li>
                <strong>Common causes of low IR:</strong> Moisture, damaged insulation,
                contamination, age
              </li>
              <li>
                <strong>ST1426:</strong> Maps to testing, inspection, and diagnostic competencies
              </li>
            </ul>
          </ConceptBlock>

          <LearningOutcomes
            outcomes={[
              'Explain the principles of insulation resistance testing and why d.c. test voltages are used',
              'Select the correct test voltage and minimum acceptable value for different circuit types',
              'Describe the preparation steps required before conducting insulation resistance tests',
              'Conduct insulation resistance tests between the three standard configurations (L-N, L-E, N-E)',
              'Interpret test results and identify common causes of low insulation resistance',
              'Apply trending techniques to support condition-based maintenance strategies',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Principles of insulation resistance testing</ContentEyebrow>

          <ConceptBlock
            title="Principles of Insulation Resistance Testing"
            onSite="Safety warning: Insulation resistance testing applies voltages of up to 1000 V d.c. to the circuit under test. The circuit must be fully isolated, locked off, and proved dead before testing. All persons must be kept clear of exposed conductors during the test. After testing, the stored capacitive charge must be safely discharged before anyone touches the conductors or equipment is reconnected."
          >
            <p>
              Every electrical conductor is surrounded by insulating material — whether it is the
              PVC sheath of a cable, the varnish on a motor winding, or the ceramic body of a busbar
              support. This insulation serves a critical safety function: it prevents current from
              flowing through unintended paths, which could result in short circuits, earth faults,
              electric shock, or fire. Insulation resistance testing measures how effectively this
              insulation is performing its function.
            </p>
            <p>
              The test works by applying a known d.c. voltage across the insulation and measuring
              the resulting leakage current. Using Ohm&apos;s law (R = V/I), the instrument
              calculates the insulation resistance. High resistance (measured in megohms) indicates
              healthy insulation with minimal leakage; low resistance indicates degraded insulation
              that allows significant leakage current. The test uses d.c. rather than a.c. because
              cables have inherent capacitance, and a.c. would cause capacitive current flow that is
              not related to insulation quality, giving misleadingly low readings.
            </p>
            <p>
              Insulation does not fail suddenly in most cases — it degrades gradually over time due
              to thermal ageing, mechanical stress, chemical exposure, moisture, and ultraviolet
              radiation. By the time insulation resistance has fallen to the minimum acceptable
              level, significant degradation has already occurred. This is why trending — tracking
              insulation resistance values over time — is far more valuable than single readings. A
              declining trend indicates active deterioration that requires investigation, even if
              the current reading still exceeds the minimum.
            </p>
          </ConceptBlock>

          <InsulationResistanceTest />

          <AppendixTable
            caption="Test Voltages and Minimum Values"
            source="BS 7671 Table 64"
            headers={['Circuit Nominal Voltage', 'Test Voltage (d.c.)', 'Minimum IR']}
            rows={[
              ['SELV and PELV (up to 50 V)', '250 V d.c.', '0.5 MΩ'],
              ['Up to and including 500 V (excl. SELV/PELV)', '500 V d.c.', '1 MΩ'],
              ['Above 500 V', '1000 V d.c.', '1 MΩ'],
            ]}
          />

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Preparation and pre-test procedures</ContentEyebrow>

          <ConceptBlock title="Preparation and Pre-Test Procedures">
            <p>
              Thorough preparation is essential for obtaining accurate insulation resistance
              readings and for ensuring the safety of the technician and the integrity of connected
              equipment. Inadequate preparation is the most common cause of misleading results and
              equipment damage during insulation resistance testing.
            </p>
            <ol className="list-decimal space-y-3 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Safe isolation.</strong> Isolate the circuit or installation to be tested
                using an appropriate isolation device. Apply a lock and warning notice. Prove dead
                at the point of work using a voltage indicator that has been proved on a known live
                source (prove-test-prove procedure). Insulation resistance testing must never be
                carried out on live circuits — the test instrument readings will be meaningless, and
                the instrument may be damaged.
              </li>
              <li>
                <strong>Disconnect sensitive equipment.</strong> Before applying the test voltage,
                disconnect or isolate all equipment that could be damaged by the d.c. test voltage:
                <ul className="mt-2 list-disc space-y-1 pl-5 marker:text-elec-yellow/70">
                  <li>
                    Electronic equipment: computers, servers, PLCs, control systems, BMS controllers
                  </li>
                  <li>Variable speed drives (VSDs) and soft starters</li>
                  <li>Surge protective devices (SPDs) — these will conduct at the test voltage</li>
                  <li>LED drivers and electronic ballasts</li>
                  <li>Dimmer switches and electronic timers</li>
                  <li>Capacitors (will charge during the test and may give misleading readings)</li>
                  <li>Lamps — remove or disconnect to avoid affecting readings</li>
                </ul>
              </li>
              <li>
                <strong>Prepare the circuit.</strong> Ensure all switches, circuit breakers, and
                fused switches in the circuit under test are in the closed (on) position so that the
                test voltage reaches all parts of the circuit. For lighting circuits, switches
                should be on and lamps removed. For socket outlet circuits, ensure any switched
                sockets are on. The aim is to test the maximum extent of the circuit wiring in a
                single test. Record the ambient temperature, as this affects the insulation
                resistance value and is needed for accurate trending.
              </li>
              <li>
                <strong>Verify the test instrument.</strong> Before testing, verify the insulation
                resistance test instrument: check battery condition (low battery gives inaccurate
                readings), test with leads open-circuited (should read infinity/overrange), and test
                with leads short-circuited (should read approximately zero). Confirm the instrument
                is within its calibration date. Select the correct test voltage range for the
                circuit under test.
              </li>
            </ol>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Test configurations and procedure</ContentEyebrow>

          <ConceptBlock title="Test Configurations and Procedure">
            <p>
              Insulation resistance is tested between each combination of conductors to check every
              insulation barrier in the circuit. The specific test configurations depend on the
              circuit type. For a single-phase circuit, three tests are required; for a three-phase
              circuit, the number increases to account for all phase-to-phase combinations. Each
              test checks a different potential fault path.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Single-phase test configurations">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Line to Neutral (L-N):</strong> Tests the insulation between the line and
                neutral conductors. A low reading indicates a potential short-circuit path between
                the two current-carrying conductors.
              </li>
              <li>
                <strong>Line to Earth (L-E):</strong> Tests the insulation between the line
                conductor and the circuit protective conductor (earth). A low reading indicates a
                potential earth fault path that could cause RCD tripping or, in TN systems,
                overcurrent protection operation.
              </li>
              <li>
                <strong>Neutral to Earth (N-E):</strong> Tests the insulation between the neutral
                conductor and earth. A low reading here may indicate a neutral-earth fault that can
                cause circulating currents, electromagnetic interference, and RCD nuisance tripping.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Three-phase test configurations">
            <p>
              For three-phase circuits, the following additional tests between phases are required:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>L1 to L2, L2 to L3, L1 to L3 (phase-to-phase insulation)</li>
              <li>L1 to N, L2 to N, L3 to N (each phase to neutral)</li>
              <li>L1 to E, L2 to E, L3 to E (each phase to earth)</li>
              <li>N to E (neutral to earth)</li>
            </ul>
            <p>
              This gives a total of ten tests for a complete three-phase assessment. Each reading
              must be recorded individually on the Schedule of Test Results.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Conducting the test">
            <p>
              Connect the test leads to the appropriate conductors at the distribution board or
              origin of the circuit. Apply the test voltage and hold until the reading stabilises —
              this typically takes 10-30 seconds for short circuits but may take longer for circuits
              with significant capacitance (long cable runs, motor windings). Record the stabilised
              reading. If the reading does not stabilise and continues to decrease, this may
              indicate moisture absorption (polarisation index testing may be appropriate for motor
              windings). After each test, discharge the stored capacitive charge before moving the
              test leads.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Interpreting results and common causes of low readings</ContentEyebrow>

          <ConceptBlock title="Interpreting Results and Common Causes of Low Readings">
            <p>
              Interpreting insulation resistance results requires more than simply comparing the
              reading to the minimum acceptable value. A competent technician considers the reading
              in context: the age and type of the installation, previous readings (trends), the
              environmental conditions, the length of the circuit, and the type of equipment
              connected. A reading of 5 MΩ on a 50-year-old installation with long cable runs may be
              acceptable, while the same reading on a new installation would indicate a serious
              problem.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Common causes of low insulation resistance">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Moisture ingress:</strong> Water in cable joints, junction boxes, or
                distribution boards. Often caused by failed glands, cracked enclosures, or
                condensation in unheated spaces
              </li>
              <li>
                <strong>Physical damage:</strong> Cable insulation damaged by nails, screws, rodent
                activity, or mechanical impact. May be localised and difficult to detect visually
              </li>
              <li>
                <strong>Thermal degradation:</strong> Insulation aged by sustained overheating —
                from overloaded cables, poor ventilation, or thermal insulation covering cables not
                rated for it
              </li>
              <li>
                <strong>Chemical contamination:</strong> Oil, solvents, or industrial chemicals that
                break down insulation materials. Common in industrial environments
              </li>
              <li>
                <strong>Age-related deterioration:</strong> Natural ageing of insulation materials,
                particularly in older installations with rubber or lead-sheathed cables
              </li>
              <li>
                <strong>Connected equipment:</strong> Faulty equipment or equipment not disconnected
                before testing can give misleadingly low readings
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Fault localisation techniques">
            <p>
              When an insulation resistance test reveals a low reading, the next step is to localise
              the fault. Start by disconnecting all equipment and accessories from the circuit and
              retesting the cable alone. If the cable alone reads satisfactorily, the fault is in a
              connected device. If the cable reading is still low, progressively disconnect the
              circuit at accessible junction points and retest each section individually. This
              halving technique narrows down the fault location efficiently. For long cable runs
              where access is limited, specialist cable fault location equipment (time-domain
              reflectometers or surge generators) may be required.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Reading a low combined result as roughly fine"
            whatHappens={
              <p>
                When multiple circuits are tested simultaneously (e.g., testing all circuits from a
                distribution board together), the overall reading is the parallel combination of all
                individual circuit resistances. This will always be lower than the lowest individual
                circuit resistance. An overall reading of 2 MΩ from ten circuits in parallel means
                the average individual circuit resistance is approximately 20 MΩ — probably
                satisfactory. However, one circuit at 0.5 MΩ among nine at 200 MΩ would give an
                overall reading of approximately 0.5 MΩ.
              </p>
            }
            doInstead={
              <p>
                Individual circuit testing is essential when the overall reading is below the
                minimum.
              </p>
            }
          />

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Trending and condition-based maintenance</ContentEyebrow>

          <ConceptBlock title="Trending and Condition-Based Maintenance">
            <p>
              The true power of insulation resistance testing in a maintenance context lies not in
              individual pass/fail assessments but in the systematic trending of results over time.
              A single reading tells you the condition at one moment; a trend tells you the rate of
              degradation and enables prediction of when intervention will be needed. This
              transforms insulation resistance testing from a reactive verification into a proactive
              condition monitoring tool.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Building a trending programme">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Consistent methodology:</strong> Test at the same points, using the same
                test voltage, with the same preparation procedure each time to ensure readings are
                comparable
              </li>
              <li>
                <strong>Temperature correction:</strong> Record the ambient and conductor
                temperature at each test. Apply correction factors when comparing readings taken at
                different temperatures (IR approximately halves for each 10°C rise)
              </li>
              <li>
                <strong>Regular intervals:</strong> Establish a testing schedule appropriate to the
                criticality and age of the installation. More frequent testing for critical circuits
                and older installations
              </li>
              <li>
                <strong>Alert thresholds:</strong> Set intervention thresholds above the minimum
                acceptable value. For example, investigate when IR drops below 5 MΩ rather than
                waiting for it to reach 1 MΩ
              </li>
              <li>
                <strong>Graphical presentation:</strong> Plot IR values against time for each
                circuit. A declining trend line is a clear visual indicator of deterioration
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Polarisation index testing">
            <p>
              For motor windings and transformers, the polarisation index (PI) test provides
              additional diagnostic information beyond a standard insulation resistance reading. The
              PI is the ratio of the insulation resistance at 10 minutes to the resistance at 1
              minute (PI = R10min / R1min). In healthy insulation, the resistance increases over
              time as the dielectric absorption effect reduces the leakage current. A PI of 2.0 or
              above generally indicates good insulation condition. A PI close to 1.0 suggests
              contamination or moisture saturation. This test is particularly valuable for assessing
              the condition of large rotating machines where a single resistance reading may not
              tell the full story.
            </p>
            <p className="italic">
              <strong className="not-italic">ST1426 link:</strong> The maintenance technician
              standard requires competence in condition monitoring and predictive maintenance
              techniques. Insulation resistance trending is a foundational skill in this area,
              demonstrating your ability to move beyond reactive fault-finding to proactive
              condition-based maintenance.
            </p>
          </ConceptBlock>

          <SectionRule />

          <VideoCard
            url="https://www.youtube.com/watch?v=MLTM-OJE0Lo"

            title="Calculating Combined Insulation Resistance Tests"

            channel="SparkyNinja"

            duration="11:30"

            topic="Why parallel circuits drag a combined IR reading down"

            caption="Goes past the procedure into the arithmetic — useful when a global test reads low and you need to work out whether that is one bad circuit or simply many good ones in parallel."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Test procedure: isolate, lock off, prove dead; disconnect sensitive equipment and SPDs; close all switches in the circuit; verify test instrument (open/short/battery); test L-N, L-E, N-E (and phase-phase for 3-phase); record readings, discharge, reconnect.',
              'SELV/PELV: 250 V d.c., minimum 0.5 MΩ.',
              'Up to 500 V: 500 V d.c., minimum 1 MΩ.',
              'Above 500 V: 1000 V d.c., minimum 1 MΩ.',
              'New installation typical: 200+ MΩ.',
              'Investigate below: 2 MΩ (IET GN3).',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section5')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Back to section
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Testing and inspection
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section5-2')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Continuity Testing
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule4Section5_1;
