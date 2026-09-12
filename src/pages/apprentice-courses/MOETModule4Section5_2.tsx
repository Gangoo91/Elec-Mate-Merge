/**
 * MOET · Module 4 · Section 5.2 · Subsection 2 — Continuity Testing
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
 * Numeric values (R1+R2 test current, published cable resistance figures,
 * the 80% Zs guidance) are copied verbatim from the original page. The
 * bs7671_facets RAG holds regulation rules, not numeric tables, so none of
 * these can be checked against it — see the conversion report for what
 * should be verified against BS 7671 / the IET On-Site Guide.
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
  AppendixTable,
  VideoCard,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Continuity Testing - MOET Module 4.5.2';
const DESCRIPTION =
  'Comprehensive guide to continuity testing in electrical maintenance: protective conductor continuity, ring final circuit testing, R1+R2 measurements, instrument selection and procedures in accordance with BS 7671.';

const quickCheckQuestions = [
  {
    id: 'cont-purpose',
    question: 'What is the primary purpose of protective conductor continuity testing?',
    options: [
      'To confirm the insulation between the line conductor and the protective conductor is intact',
      'To measure the prospective fault current available at the distribution board',
      'To confirm that the circuit protective conductor (CPC) provides a continuous, low-resistance path for fault current to flow back to the source, ensuring protective devices operate within the required disconnection time',
      'To verify the polarity of the line and neutral connections at each accessory',
    ],
    correctIndex: 2,
    explanation:
      'Protective conductor continuity testing confirms that the CPC provides a continuous, low-resistance earth fault path from every point in the circuit back to the source. This is essential for safety — if a line-to-earth fault occurs, the fault current must be sufficient to operate the protective device (MCB, fuse, or RCD) within the maximum disconnection time specified by BS 7671.',
  },
  {
    id: 'cont-r1r2',
    question: 'What does the R1+R2 measurement represent?',
    options: [
      'The combined resistance of the line conductor (R1) and the circuit protective conductor (R2) measured end-to-end from the distribution board to the furthest point of the circuit',
      'The combined resistance of the line conductor (R1) and the neutral conductor (R2) of the circuit',
      'The insulation resistance between the line conductor and earth at the furthest point',
      'The external earth fault loop impedance measured at the origin of the installation',
    ],
    correctIndex: 0,
    explanation:
      'R1+R2 is the combined resistance of the line conductor (R1) and the circuit protective conductor (R2) measured from the distribution board to the furthest point of the circuit. This value is added to the external earth fault loop impedance (Ze) to give the total earth fault loop impedance (Zs) at the furthest point: Zs = Ze + (R1+R2). This determines whether the protective device will operate within the required disconnection time.',
  },
  {
    id: 'cont-ring-test',
    question: 'Why is a specific three-step test procedure required for ring final circuits?',
    options: [
      'Because ring circuits operate at a higher voltage than radial circuits and need extra checks',
      'To verify that the ring is continuous (no breaks), that cross-connections have not been made, and to obtain accurate R1+R2 values at each socket outlet',
      'Because the test current must be increased to 1 A to test the doubled conductor length',
      'To confirm that each socket outlet is fitted with its own individual RCD protection',
    ],
    correctIndex: 1,
    explanation:
      'The three-step ring final circuit test verifies: (1) that each conductor forms a continuous ring with no breaks, (2) that no interconnections or spurs have been incorrectly wired into the ring, and (3) the R1+R2 value at each socket outlet. A broken ring would still supply power to all sockets but would mean that the full load could pass through a single leg of the ring, potentially overloading that cable.',
  },
  {
    id: 'cont-instrument',
    question:
      'What type of instrument is used for continuity testing, and what test current does BS 7671 require?',
    options: [
      'An insulation resistance tester delivering 500 V d.c. at a test current of 1 mA',
      'A standard multimeter on its resistance range, delivering a few microamps',
      'An earth loop impedance tester delivering a test current of not less than 25 A',
      'A low-resistance ohmmeter capable of delivering a test current of not less than 200 mA from a no-load voltage between 4 V and 24 V d.c.',
    ],
    correctIndex: 3,
    explanation:
      'BS 7671 requires continuity testing to be performed using a low-resistance ohmmeter that delivers a test current of not less than 200 mA. The no-load voltage of the instrument must be between 4 V and 24 V d.c. This relatively high test current ensures that the instrument can detect high-resistance joints and poor connections that a lower test current might miss.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Continuity of circuit protective conductors should be tested:',
    options: [
      'Only once, immediately before the installation is first handed over to the client',
      'During initial verification and at each subsequent periodic inspection, as well as after any repair or modification to the circuit',
      'Only when a fault has already been reported by the user of the installation',
      'Only on ring final circuits, as radial circuits do not require continuity testing',
    ],
    correctAnswer: 1,
    explanation:
      'Continuity testing is required during initial verification (before the installation is first energised), at each periodic inspection (EICR), and after any repair or modification that may have affected the protective conductor. Regular testing ensures that connections remain sound and that no deterioration has occurred.',
  },
  {
    id: 2,
    question: 'When performing a continuity test, the circuit must be:',
    options: [
      'Energised at nominal voltage so the test instrument can read accurately',
      'Loaded to its full rated current to simulate normal operating conditions',
      'De-energised, isolated, and proved dead before connecting the test instrument',
      'Left connected to the distribution board so all parallel paths are included',
    ],
    correctAnswer: 2,
    explanation:
      'All continuity testing must be carried out on de-energised circuits. The circuit must be isolated, locked off, and proved dead using the prove-test-prove procedure before connecting the low-resistance ohmmeter. Testing on live circuits would damage the instrument and endanger the technician.',
  },
  {
    id: 3,
    question:
      'A continuity test on a protective conductor gives a reading of 0.5 Ω. The technician should:',
    options: [
      'Record it as a fail, because any CPC continuity reading above 0.05 Ω is unacceptable for a domestic circuit',
      'Record it as a pass without further checks, because all CPC continuity readings below 1 Ω are automatically acceptable',
      'Double the reading to allow for the temperature rise expected under fault conditions before recording it',
      'Consider the reading in context — compare it against the expected value based on cable size, length, and conductor material to determine if it is within acceptable limits',
    ],
    correctAnswer: 3,
    explanation:
      'A continuity reading must be evaluated in context. The expected resistance depends on the cable size (cross-sectional area), length, and conductor material (copper or aluminium). Published resistance tables in BS 7671 and the IET On-Site Guide provide the resistance per metre for each conductor size. If the measured value significantly exceeds the expected value, this indicates a poor connection, damaged conductor, or incorrect cable size.',
  },
  {
    id: 4,
    question:
      'During a ring final circuit continuity test, the technician measures the end-to-end resistance of the line conductor ring (L-L) as 0.8 Ω and the CPC ring (E-E) as 1.2 Ω. What would be the expected reading at the mid-point socket outlet after cross-connecting?',
    options: [
      'Approximately 0.5 Ω (one quarter of the sum of L-L and E-E readings)',
      'Approximately 2.0 Ω (the sum of the L-L and E-E readings)',
      'Approximately 1.0 Ω (half of the sum of the L-L and E-E readings)',
      'Approximately 0.2 Ω (the difference between the E-E and L-L readings)',
    ],
    correctAnswer: 0,
    explanation:
      'After cross-connecting line to CPC at the distribution board, the reading at the approximate mid-point of the ring should be close to one quarter of the sum of the individual end-to-end readings: (0.8 + 1.2) / 4 = 0.5 Ω. This is because at the mid-point, you are measuring two parallel paths of equal resistance. This value represents the R1+R2 at the furthest point of the ring.',
  },
  {
    id: 5,
    question: 'What does a significantly higher-than-expected continuity reading indicate?',
    options: [
      'That the test leads have been correctly nulled before the measurement',
      'A high-resistance joint, loose connection, damaged conductor, or incorrect cable size in the circuit',
      'That the circuit has been over-specified and a smaller cable could be used',
      'That parallel earth paths are reducing the apparent circuit resistance',
    ],
    correctAnswer: 1,
    explanation:
      'A reading significantly higher than the expected value (calculated from cable size and route length) indicates a problem: a high-resistance joint (poor termination), a loose connection (insufficient torque on a terminal), a damaged conductor (reduced cross-sectional area), or the use of a smaller cable size than specified. All of these conditions must be investigated and rectified.',
  },
  {
    id: 6,
    question: 'Before taking continuity measurements, the test leads should be:',
    options: [
      'Connected to a known live supply to confirm the instrument detects voltage before testing begins',
      'Coiled tightly together to minimise their inductance and so improve the accuracy of the d.c. reading',
      'Nulled (zeroed) by short-circuiting them together and subtracting the lead resistance from subsequent readings',
      'Left open-circuited and the overrange reading recorded as the baseline for subsequent measurements',
    ],
    correctAnswer: 2,
    explanation:
      'Test lead resistance can be significant — typically 0.01 to 0.05 Ω — and must be subtracted from readings to obtain accurate circuit resistance values. Most modern instruments have a null function that stores the lead resistance and automatically subtracts it. If the instrument does not have this function, the lead resistance must be measured and manually subtracted from each reading.',
  },
  {
    id: 7,
    question: 'In a TT earthing system, continuity testing of the circuit protective conductor:',
    options: [
      'Is not required, because in a TT system the earth electrode alone provides the fault return path and the CPC is not used',
      'Need only be carried out at the main earthing terminal, as the individual circuit CPCs are not relevant in a TT system',
      'Must be measured against a maximum of 0.35 Ω, the same limit that applies to the earth electrode resistance in a TT system',
      'Is still essential to verify a continuous path from each point in the circuit to the main earthing terminal, even though the return path to the source is via the earth',
    ],
    correctAnswer: 3,
    explanation:
      'In a TT system, continuity of the CPC from each point in the circuit to the main earthing terminal is still essential. The CPC must provide a low-resistance path to the earth electrode. While the earth fault return path is through the mass of earth (and Ze is typically much higher than in TN systems), the CPC within the installation must still be continuous for the RCD to detect the fault current.',
  },
  {
    id: 8,
    question:
      'When testing the continuity of main and supplementary bonding conductors, the test verifies:',
    options: [
      'That there is a continuous, low-resistance connection between the main earthing terminal and each extraneous-conductive-part (gas, water, structural steelwork)',
      'That the earth fault loop impedance at each extraneous-conductive-part is low enough to operate the main protective device',
      'That each extraneous-conductive-part is insulated from the main earthing terminal to prevent circulating currents',
      'That the bonding conductor carries the full prospective fault current without exceeding its rated temperature',
    ],
    correctAnswer: 0,
    explanation:
      'Bonding conductor continuity testing verifies that a continuous, low-resistance connection exists between the main earthing terminal and each extraneous-conductive-part that could introduce a potential from outside the electrical installation. This includes incoming gas and water pipes, structural steelwork, and other metallic services. The test ensures that these parts are maintained at or near earth potential to prevent dangerous touch voltages.',
  },
  {
    id: 9,
    question:
      'A ring final circuit test reveals that the end-to-end resistance of the neutral ring is significantly different from the line ring, despite both being the same size cable. This suggests:',
    options: [
      'That the ring is correctly wired, since the line and neutral readings of a healthy ring are expected to differ noticeably',
      'A possible break in the neutral ring, an interconnection, or the neutral being connected to a different ring — further investigation is required',
      'That the neutral conductor is a larger cross-sectional area than the line, which is normal in a twin-and-earth ring',
      'That the test leads were not nulled, as this affects only the neutral reading and not the line reading',
    ],
    correctAnswer: 1,
    explanation:
      'For a correctly wired ring using twin and earth cable, the line and neutral conductors are the same size and follow the same route, so their end-to-end resistances should be very similar (within measurement tolerance). A significant difference indicates a problem: a break in the ring, an interconnection with another circuit, or incorrect wiring. The circuit must be investigated before being returned to service.',
  },
  {
    id: 10,
    question: 'The R1+R2 value obtained from continuity testing is used to:',
    options: [
      'Determine the prospective fault current at the origin of the installation by dividing the supply voltage by R1+R2 alone',
      'Confirm the insulation resistance between the line conductor and the circuit protective conductor is adequate',
      'Determine the earth fault loop impedance at the furthest point of the circuit (Zs = Ze + R1+R2) and verify that the protective device will disconnect within the required time',
      'Calculate the maximum permitted cable length by dividing the rated voltage drop by the R1+R2 value',
    ],
    correctAnswer: 2,
    explanation:
      'The R1+R2 value is added to the external earth fault loop impedance (Ze) to calculate the total earth fault loop impedance (Zs) at the furthest point of the circuit. This Zs value must not exceed the maximum permitted for the protective device type and rating, ensuring that sufficient fault current flows to operate the device within the disconnection time specified by BS 7671 (0.4 s for socket outlet circuits, 5 s for fixed equipment circuits in TN systems).',
  },
  {
    id: 11,
    question:
      'When testing a long cable run, the technician cannot reach both ends simultaneously. An acceptable method is:',
    options: [
      'Calculate the result from the published resistance tables and cable length, omitting the continuity measurement altogether',
      'Measure from one end only with the far end left open, and double the reading to allow for the unmeasured return leg',
      "Energise the circuit and measure the current drawn, then derive the conductor resistance using Ohm's law",
      'Use a temporary link (a known, measured length of conductor) at the far end to join the line and CPC, then test from the near end — recording and subtracting the link resistance',
    ],
    correctAnswer: 3,
    explanation:
      'When both ends of a cable cannot be accessed simultaneously, a temporary link of known resistance can be connected at the far end to bridge between the line conductor and the CPC. The technician then tests from the near end. The measured value includes the link resistance, which must be subtracted to obtain the true R1+R2. This method is commonly used for long cable runs in large buildings.',
  },
  {
    id: 12,
    question: 'Why is the minimum test current of 200 mA specified for continuity testing?',
    options: [
      'Because a lower test current may not detect high-resistance joints or poor connections that would be significant under fault conditions',
      'Because 200 mA is the current required to operate the protective device during the continuity test',
      'Because a current below 200 mA would cause the conductor to overheat and give a falsely high reading',
      'Because 200 mA matches the residual operating current of a standard RCD and so verifies its operation',
    ],
    correctAnswer: 0,
    explanation:
      'A minimum test current of 200 mA is specified because high-resistance joints and poor connections may appear to have acceptable resistance when tested at very low currents, but their resistance increases significantly under the higher currents that flow during a fault. The 200 mA minimum ensures that such defective connections are detected during testing rather than causing a failure under fault conditions.',
  },
];

const faqs = [
  {
    question:
      'What is the difference between continuity testing and insulation resistance testing?',
    answer:
      'Continuity testing checks that conductors that should be connected do provide a low-resistance path (e.g., the CPC from a socket outlet back to the distribution board). Insulation resistance testing checks that conductors that should be separated are adequately insulated from each other (e.g., line to earth). They are complementary tests — continuity confirms connection where needed; insulation resistance confirms separation where needed.',
  },
  {
    question: 'Can I use a standard multimeter for continuity testing?',
    answer:
      "A standard multimeter's continuity or resistance range may not deliver the minimum 200 mA test current required by BS 7671. While it can give an indication of continuity, it should not be used for formal testing and certification. A dedicated low-resistance ohmmeter (or multifunction tester with a dedicated continuity range) that meets BS EN 61557 is required for compliance with BS 7671.",
  },
  {
    question: 'What are acceptable continuity values?',
    answer:
      "There is no single 'acceptable' value — it depends on the cable size and length. For example, 1.0 mm² copper has a resistance of approximately 18.1 mΩ/m, so a 20 m run of 1.0 mm² cable would have a conductor resistance of approximately 0.36 Ω. The measured R1+R2 should be consistent with the expected value from published tables. Values significantly higher than expected indicate a problem.",
  },
  {
    question: 'Do I need to test every socket outlet on a ring final circuit?',
    answer:
      'Yes. After cross-connecting at the distribution board, every socket outlet on the ring must be tested. The readings should follow a predictable pattern: low values near the distribution board, rising to a maximum at the approximate mid-point of the ring, then falling again. An unexpectedly high or low reading at any socket indicates a wiring error, break, or interconnection that requires investigation.',
  },
  {
    question: 'How does conductor temperature affect continuity readings?',
    answer:
      'Conductor resistance increases with temperature — copper has a positive temperature coefficient of approximately 0.004 per °C. For most practical purposes in installation testing, ambient temperature variations have a relatively small effect on continuity readings. However, if testing a circuit that has been carrying load and the conductors are warm, the readings may be slightly higher than the published values, which are based on 20°C. For formal purposes, the temperature should be recorded.',
  },
];

const MOETModule4Section5_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 4 · Section 4.5 · Subsection 2"
        title="Continuity Testing"
        backTo="/study-centre/apprentice/m-o-e-t-module4-section5"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Protective conductor continuity, ring final circuit testing, and R1+R2 measurements for
            electrical maintenance.
          </p>

          <TLDR
            points={[
              'Purpose: Verify low-resistance earth fault paths for protective device operation',
              'Instrument: Low-resistance ohmmeter, minimum 200 mA test current',
              'R1+R2: Combined line and CPC resistance, used to calculate Zs',
              'Ring circuits: Three-step test to verify continuity and correct wiring',
            ]}
          />

          <ConceptBlock title="Maintenance technician context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>When to test:</strong> Initial verification, periodic inspection, after
                repairs or modifications
              </li>
              <li>
                <strong>Critical for safety:</strong> Disconnection time depends on low-impedance
                fault path
              </li>
              <li>
                <strong>Common faults:</strong> Loose terminals, broken conductors, incorrect wiring
              </li>
              <li>
                <strong>ST1426:</strong> Maps to testing, verification, and fault diagnosis
                competencies
              </li>
            </ul>
          </ConceptBlock>

          <Prerequisites
            items={[
              {
                term: 'Circuit protection and earthing',

                gist: 'Fuses, circuit breakers, RCDs and RCBOs, earthing arrangements and protective bonding — what each device protects against and how fault current gets back to source.',

                where: '2.4',
              },

              {
                term: 'BS 7671 and where it sits',

                gist: 'The Wiring Regulations are a standard, not statute — compliance is how you demonstrate the EAWR duties have been met. Current edition 2018+A4:2026.',

                where: '1.4.3',
              },
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain why continuity of protective conductors is essential for electrical safety',
              'Select and verify the correct test instrument for continuity testing',
              'Perform R1+R2 measurements on radial circuits and interpret the results',
              'Conduct the three-step ring final circuit continuity test procedure',
              'Test bonding conductors and interpret results against expected values',
              'Use R1+R2 values to calculate earth fault loop impedance (Zs) and verify disconnection times',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why continuity testing matters</ContentEyebrow>

          <ConceptBlock title="Why Continuity Testing Matters">
            <p>
              The safety of an electrical installation depends fundamentally on the integrity of its
              protective conductors. When a fault occurs — a line conductor contacting an earthed
              metal enclosure, for example — the fault current must flow through the circuit
              protective conductor (CPC) back to the source with sufficiently low impedance to
              operate the protective device (MCB, fuse, or RCD) within the maximum disconnection
              time specified by BS 7671. If the CPC is broken, has a high-resistance joint, or is
              missing entirely, the protective device may not operate, leaving exposed metalwork at
              a dangerous voltage.
            </p>
            <p>
              Continuity testing verifies that this critical fault current path is intact and has
              sufficiently low resistance. It is one of the most fundamental tests in electrical
              installation work, yet it is also one of the tests most commonly performed
              inadequately. A cursory &quot;buzz test&quot; with a basic multimeter may confirm that
              a connection exists, but it may not reveal a high-resistance joint that would impede
              fault current flow. BS 7671 therefore requires the use of a low-resistance ohmmeter
              delivering a minimum test current of 200 mA to ensure reliable detection of defective
              connections.
            </p>
            <p>
              For maintenance technicians, continuity testing is not limited to new installations.
              Every time a circuit is modified, extended, or repaired, the continuity of the
              protective conductors must be re-verified. Connections that were sound at installation
              can deteriorate over time due to thermal cycling, vibration, corrosion, or mechanical
              disturbance. Periodic inspection (EICR) includes continuity testing to detect such
              deterioration before it compromises safety.
            </p>
          </ConceptBlock>

          <AppendixTable
            caption="Consequences of Failed Continuity"
            headers={['Continuity Problem', 'Safety Consequence']}
            rows={[
              [
                'Broken CPC',
                'No earth fault path — exposed metalwork remains live during a fault until manually disconnected',
              ],
              [
                'High-resistance joint in CPC',
                'Reduced fault current — protective device operates slowly or not at all, prolonging danger',
              ],
              [
                'Missing bonding conductor',
                'Extraneous metalwork not at earth potential — risk of electric shock from simultaneous contact',
              ],
              [
                'Broken ring final circuit',
                'Full load on one leg of the ring — cable overheating, increased fire risk, higher Zs',
              ],
            ]}
          />

          <CommonMistake
            title="Skipping continuity testing after an intervention"
            whatHappens={
              <p>
                A common scenario in maintenance: a technician replaces a socket outlet and fails to
                reconnect the earth conductor securely. The circuit appears to work normally —
                lights and appliances function. However, if a line-to-earth fault occurs on an
                appliance connected to that socket, the fault current cannot return via the CPC, the
                MCB does not trip, and the metal casing of the appliance remains at 230 V.
              </p>
            }
            doInstead={
              <p>
                This is why continuity testing after every intervention is not optional — it is a
                safety-critical verification step.
              </p>
            }
          />

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Test instruments and preparation</ContentEyebrow>

          <ConceptBlock title="Test Instruments and Preparation">
            <p>
              The accuracy and reliability of continuity testing depends on using the correct
              instrument, properly prepared. BS 7671 and BS EN 61557 specify the requirements for
              instruments used in continuity testing, and understanding these requirements is
              essential for both practical competence and the ST1426 end-point assessment.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Instrument requirements">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Type:</strong> Low-resistance ohmmeter (often part of a multifunction
                installation tester)
              </li>
              <li>
                <strong>Test current:</strong> Not less than 200 mA (as required by BS 7671)
              </li>
              <li>
                <strong>No-load voltage:</strong> Between 4 V and 24 V d.c.
              </li>
              <li>
                <strong>Resolution:</strong> Capable of measuring to 0.01 Ω for accurate readings on
                short runs
              </li>
              <li>
                <strong>Compliance:</strong> Must comply with BS EN 61557-4 for resistance of earth
                connection and equipotential bonding
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Lead nulling (zeroing)">
            <p>
              Test leads have their own resistance, which must be accounted for. Before taking
              measurements, short-circuit the test leads together and either use the
              instrument&apos;s null function to store the lead resistance (it will then be
              automatically subtracted from subsequent readings) or record the lead resistance and
              manually subtract it from each measurement. For long test leads (which may be needed
              in large buildings), the lead resistance can be significant — failing to account for
              it introduces a systematic error into every reading.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Pre-test preparation">
            <p>
              Before testing, the circuit must be isolated, locked off, and proved dead. Disconnect
              the circuit from the distribution board to avoid parallel paths through other circuits
              or the earthing system that would give misleadingly low readings. Check that the
              instrument battery is adequate (low battery affects the test current and accuracy).
              Verify the instrument is within its calibration date. Have the circuit schedule and
              cable specification to hand so that measured values can be compared against expected
              values.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>R1+R2 testing of radial circuits</ContentEyebrow>

          <ConceptBlock title="R1+R2 Testing of Radial Circuits">
            <p>
              For radial circuits (those with a single cable run from the distribution board to the
              furthest point), the R1+R2 test is straightforward. The objective is to measure the
              combined resistance of the line conductor (R1) and the circuit protective conductor
              (R2) from the distribution board to the furthest point of the circuit. This value is
              then used to calculate the earth fault loop impedance at the furthest point.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Method 1 — long lead method">
            <p>
              Connect a long test lead between the line conductor and the CPC at the furthest point
              of the circuit. At the distribution board, connect the instrument between the line
              conductor and CPC of the same circuit. The reading gives the R1+R2 directly (minus any
              lead resistance if the long lead is used as part of the measurement circuit).
            </p>
            <p>
              This method is practical when the furthest point is accessible but may be inconvenient
              in large installations where the cable run is long and the route is not easily traced.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Method 2 — temporary link at far end">
            <p>
              Place a temporary link (a short piece of conductor with known resistance) between the
              line and CPC at the furthest point. Measure from the distribution board end between
              the line conductor and CPC. The reading is R1+R2 plus the resistance of the link.
              Subtract the link resistance to obtain the true R1+R2.
            </p>
            <p>
              This method requires two visits to the far end (to connect and disconnect the link)
              but avoids trailing long test leads through the building. It is particularly useful
              for circuits with concealed wiring.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Expected values">
            <p>
              The expected R1+R2 value can be calculated from published conductor resistance tables:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                1.0 mm² copper: R1 = 18.1 mΩ/m, R2 (1.0 mm² CPC) = 18.1 mΩ/m → R1+R2 = 36.2 mΩ/m
              </li>
              <li>
                2.5 mm² copper: R1 = 7.41 mΩ/m, R2 (1.5 mm² CPC) = 12.1 mΩ/m → R1+R2 = 19.51 mΩ/m
              </li>
              <li>
                4.0 mm² copper: R1 = 4.61 mΩ/m, R2 (1.5 mm² CPC) = 12.1 mΩ/m → R1+R2 = 16.71 mΩ/m
              </li>
            </ul>
            <p>
              Multiply by the cable length in metres to get the expected R1+R2. Measured values
              should be close to the calculated value — significant deviations indicate a problem.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Ring final circuit testing</ContentEyebrow>

          <ConceptBlock title="Ring Final Circuit Testing">
            <p>
              Ring final circuits require a specific three-step test procedure that goes beyond
              simple continuity verification. The test must confirm that each conductor forms a
              continuous ring, that no cross-connections or spurs have been incorrectly wired, and
              that the R1+R2 at every socket outlet is within acceptable limits. This is one of the
              most complex tests in electrical installation work and is frequently performed
              incorrectly.
            </p>
            <ol className="list-decimal space-y-3 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>End-to-end resistance.</strong> At the distribution board, identify and
                separate both ends of each conductor (line, neutral, CPC). Measure the end-to-end
                resistance of each ring: L1 to L2, N1 to N2, E1 to E2. The line and neutral readings
                should be very similar (same size conductor, same route). The CPC reading may differ
                if it is a different size (e.g., 1.5 mm² CPC in a 2.5 mm² twin-and-earth cable).
                These readings confirm that each conductor forms a continuous ring and provide the
                baseline values for the subsequent steps.
              </li>
              <li>
                <strong>Cross-connection and socket testing (L-N).</strong> Cross-connect the line
                conductors: connect L1 to N2 and N1 to L2 at the distribution board. Then measure
                between line and neutral at each socket outlet. The readings should be approximately
                equal at every socket — each being approximately one quarter of the sum of the
                individual end-to-end readings from Step 1. If a reading is substantially higher
                than expected, it indicates a break in the ring or an incorrectly wired spur. If a
                reading is substantially lower, it may indicate an interconnection with another
                circuit.
              </li>
              <li>
                <strong>Cross-connection and socket testing (L-CPC).</strong> Now cross-connect the
                line and CPC: connect L1 to E2 and E1 to L2 at the distribution board. Measure
                between line and CPC at each socket outlet. The reading at each socket gives the
                R1+R2 value for that point. The highest reading (typically at the mid-point of the
                ring) is the value recorded on the Schedule of Test Results as the R1+R2 for the
                ring circuit. As with Step 2, all readings should follow a predictable pattern —
                deviations indicate wiring errors.
              </li>
            </ol>
          </ConceptBlock>

          <ConceptBlock title="Common ring circuit faults detected by this test">
            <p>
              The three-step test detects: broken rings (one or more conductors not forming a
              continuous loop), cross-connections (conductors from different rings connected
              together), figure-of-eight wiring (where the ring crosses over itself), and spurs
              incorrectly connected as part of the ring. These faults may not be apparent from
              visual inspection alone and would not be detected by a simple end-to-end continuity
              test.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Bonding conductor testing and calculating Zs</ContentEyebrow>

          <ConceptBlock title="Bonding Conductor Testing and Calculating Zs">
            <p>
              Beyond circuit protective conductors, continuity testing extends to the bonding system
              — the main bonding conductors that connect extraneous-conductive-parts (gas pipes,
              water pipes, structural steelwork) to the main earthing terminal, and any
              supplementary bonding conductors in special locations. These conductors do not carry
              load current under normal conditions but are critical for maintaining equipotential
              conditions that prevent dangerous touch voltages.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Main bonding conductor testing">
            <p>
              Test the continuity between the main earthing terminal and each bonding connection
              point (gas meter, water meter, structural steel). The reading should be very low —
              typically less than 0.05 Ω for a short run of 10 mm² or 16 mm² bonding conductor.
              Higher readings indicate a poor connection at the bonding clamp or the main earthing
              terminal. Check that bonding clamps are of the correct type (BS 951), are tight, and
              are in good condition with no corrosion.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Using R1+R2 to calculate Zs">
            <p>
              The R1+R2 value obtained from continuity testing is one of the two components of the
              earth fault loop impedance at the furthest point of the circuit:
            </p>
            <p className="rounded bg-white/5 p-2 font-mono">Zs = Ze + (R1+R2)</p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Ze:</strong> External earth fault loop impedance (measured at the origin of
                the installation with the main earth disconnected)
              </li>
              <li>
                <strong>R1+R2:</strong> From continuity testing (at the furthest point of the
                circuit)
              </li>
              <li>
                <strong>Zs:</strong> Must not exceed the maximum value published in BS 7671 for the
                protective device type and rating
              </li>
            </ul>
            <p>
              Note: Published R1+R2 values are at 20°C. Under fault conditions, conductor
              temperature rises significantly, increasing resistance. BS 7671 accounts for this by
              applying a correction factor. The measured Zs during a live test should not exceed 80%
              of the maximum tabulated value to account for this temperature effect and supply
              impedance variations.
            </p>
            <p className="italic">
              <strong className="not-italic">ST1426 link:</strong> The ability to perform continuity
              testing, interpret results, and use them to verify protective device disconnection
              times is a core competency for the maintenance technician standard. You must
              demonstrate not just the practical skill of testing but also the understanding of why
              the test is done and how the results relate to the safety of the installation.
            </p>
          </ConceptBlock>

          <SectionRule />

          <VideoCard
            url="https://www.youtube.com/watch?v=NNfyTU1QoYI"

            title="Ring Final Test Explanation — As Simple as I Can Make It"

            channel="Craig Wiltshire"

            duration="5:45"

            topic="The three-step ring final continuity test"

            caption="The end-to-end, cross-connect and figure-of-eight sequence, done slowly enough to follow on a first watch."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Test procedure: isolate, lock off, prove dead; disconnect circuit from the DB; null test leads (zero lead resistance); test CPC end-to-end or R1+R2; compare against expected values; record results on the Schedule of Test Results.',
              'Ring final circuit steps: Step 1 end-to-end L-L, N-N, E-E; Step 2 cross-connect L-N and test each socket; Step 3 cross-connect L-E and test each socket.',
              'All ring readings should follow a predictable pattern, with the maximum R1+R2 at the mid-point of the ring.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section5-1')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Insulation Resistance Testing
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section5-3')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Earth Fault Loop Impedance Testing
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule4Section5_2;
