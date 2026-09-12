/**
 * MOET · Module 1 · Section 1.2 · Subsection 2 — Safe Use of Tools and Test Equipment
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
 * numbering has not been verified against a primary source — so do not invent
 * codes here.
 *   Knowledge  · "Electrical. Electrical isolation and deisolation
 *                 requirements: lockout tagout and testing for dead."
 *              · "Work environment hazards and risks. Risk assessments."
 *   Skills     · "Apply health, safety, and environmental procedures in
 *                 compliance with regulations, standards, and guidance."
 *   Behaviours · "Prioritise safe working practices."
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
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Safe Use of Tools and Test Equipment - MOET Module 1.2.2';
const DESCRIPTION =
  'Complete guide to safe use of electrical tools and test equipment: GS38 requirements, proving units, insulated tools, multimeters, insulation testers, calibration, PAT testing and pre-use inspection for maintenance technicians.';

const quickCheckQuestions = [
  {
    id: 'gs38-probes',
    question:
      'Under GS38, what is the maximum exposed metal tip length permitted on a test probe for use on low voltage systems?',
    options: ['4 mm', '10 mm', '20 mm', '2 mm'],
    correctIndex: 0,
    explanation:
      'GS38 specifies that test probes must have an exposed metal tip not exceeding 4 mm, measured across any surface of the tip, with the remainder insulated to prevent accidental contact with adjacent live parts. The short tip length reduces the risk of bridging between terminals or creating a short circuit during testing.',
  },
  {
    id: 'proving-unit-purpose',
    question: 'What is the purpose of a proving unit in electrical testing?',
    options: [
      'To provide a known voltage source to verify the voltage indicator is working correctly before and after testing',
      'To discharge any stored energy in capacitors before testing',
      'To inject a test current for measuring earth fault loop impedance',
      'To reduce the test voltage to a safe level for the operator',
    ],
    correctIndex: 0,
    explanation:
      'A proving unit provides a known voltage source (typically 50 V or 230 V) to verify that the voltage indicator is functioning correctly. GS38 requires that you prove your voltage indicator on a known live source BEFORE testing for dead and AGAIN AFTER testing. This three-stage process (prove-test-prove) confirms the instrument was working at the time of the test.',
  },
  {
    id: 'insulated-tools',
    question:
      'What standard must VDE-rated insulated hand tools comply with for electrical work up to 1000 V AC?',
    options: ['BS EN 60900', 'BS 7671', 'BS EN 61010', 'BS EN 60529'],
    correctIndex: 0,
    explanation:
      'VDE-rated insulated hand tools must comply with BS EN 60900 (IEC 60900), which specifies requirements for hand-operated insulated tools for work on or near live parts at voltages up to 1000 V AC or 1500 V DC. Tools meeting this standard are individually tested to 10,000 V AC and rated for continuous use at 1000 V AC.',
  },
  {
    id: 'pat-testing',
    question: 'What does a PAT test typically include for a Class I portable power tool?',
    options: [
      'Earth fault loop impedance and prospective fault current only',
      'A polarity check and verification of the supply voltage',
      'Calibration of the tool against a reference standard',
      'Visual inspection, earth continuity, insulation resistance and functional test',
    ],
    correctIndex: 3,
    explanation:
      'A PAT test for a Class I power tool includes a visual inspection (checking the plug, flex, casing and strain relief), an earth continuity test (verifying the CPC is intact), an insulation resistance test (checking insulation integrity), and a functional test (operating the tool to confirm safe operation). The specific tests vary by equipment class and type.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "The GS38 'prove-test-prove' procedure for safe isolation requires:",
    options: [
      'Test the circuit for dead, then prove the voltage indicator once on a known live source',
      'Prove the voltage indicator on a known live source, test the circuit for dead, prove the voltage indicator again on the known live source',
      'Prove the voltage indicator twice on a known live source, then leave the circuit isolated',
      'Test the circuit for dead, isolate the supply, then prove the voltage indicator',
    ],
    correctAnswer: 1,
    explanation:
      'The GS38 three-stage procedure is: (1) Prove the voltage indicator works on a known live source or proving unit, (2) Test the circuit to confirm it is dead, (3) Prove the voltage indicator again on the known live source. This confirms the instrument was functioning correctly throughout the test — not that it failed between step 1 and the test.',
  },
  {
    id: 2,
    question: 'GS38 requires that test leads should incorporate:',
    options: [
      'Coiled leads at least 2 metres long with crocodile clip ends',
      'Unfused leads with a minimum conductor size of 2.5 mm²',
      'Fused test leads with a fuse rating not exceeding 500 mA, and finger guards',
      'Spring-loaded probes with a 20 mm exposed metal tip',
    ],
    correctAnswer: 2,
    explanation:
      'GS38 requires test leads to incorporate fuses (not exceeding 500 mA for voltage indication) to protect against fault currents, finger guards on the probes to prevent accidental contact with live parts, a maximum 4 mm exposed tip, and leads of adequate current rating with good insulation. Standard unfused test leads do not comply with GS38.',
  },
  {
    id: 3,
    question:
      'A two-pole voltage indicator (such as a Fluke T150) is preferred over a single-pole indicator (neon screwdriver) because:',
    options: [
      'It draws less current from the circuit, giving a safer reading',
      'It can be used on circuits that are still energised at 230 V',
      'It does not require proving before and after the test',
      'It provides a definitive indication by testing between two points — line-to-neutral, line-to-earth and neutral-to-earth',
    ],
    correctAnswer: 3,
    explanation:
      "A two-pole voltage indicator tests the potential difference between two points, providing a definitive indication of the presence or absence of voltage. A single-pole indicator (neon screwdriver) relies on the user's body capacitance to complete the circuit, can give false readings, and is not recommended by GS38 as the sole means of testing for dead.",
  },
  {
    id: 4,
    question: 'Insulation resistance testers (meggers) typically test at voltages of:',
    options: [
      '250 V DC, 500 V DC or 1000 V DC depending on the circuit being tested',
      '12 V AC, 24 V AC or 50 V AC depending on the circuit being tested',
      '110 V DC, 230 V DC or 400 V DC depending on the circuit being tested',
      '50 V DC, 100 V DC or 150 V DC depending on the circuit being tested',
    ],
    correctAnswer: 0,
    explanation:
      'Insulation resistance testers apply a DC test voltage: 250 V DC for SELV/PELV circuits, 500 V DC for circuits up to 500 V (including standard 230 V and 400 V installations), and 1000 V DC for circuits between 500 V and 1000 V. The test voltage must match the circuit voltage rating per BS 7671 Table 64.',
  },
  {
    id: 5,
    question: 'A clamp meter measures current by:',
    options: [
      'Breaking the circuit and inserting the meter in series',
      'Measuring the magnetic field around a conductor using a current transformer jaw',
      'Using a direct electrical connection to the conductor',
      'Measuring the voltage drop across a known resistance',
    ],
    correctAnswer: 1,
    explanation:
      'A clamp meter uses a split-core current transformer jaw that clamps around a single conductor. The alternating current in the conductor induces a proportional current in the transformer, which the meter measures. This allows non-contact current measurement without breaking the circuit — essential for live measurements on energised systems.',
  },
  {
    id: 6,
    question: 'An earth fault loop impedance tester measures:',
    options: [
      'The insulation resistance between live conductors and earth',
      'The residual current flowing to earth under fault conditions',
      'The total impedance of the earth fault current loop from the point of test back to the source',
      'The continuity of the protective conductor in milliohms',
    ],
    correctAnswer: 2,
    explanation:
      'An earth fault loop impedance tester measures the total impedance of the complete fault current path (Zs): the source impedance, the line conductor impedance, the protective conductor impedance, and the earth return path. This measurement confirms that sufficient fault current will flow to operate the protective device within the required disconnection time specified in BS 7671.',
  },
  {
    id: 7,
    question: 'Before using a power tool on site, a pre-use inspection should check:',
    options: [
      'Only the calibration certificate and serial number',
      'The insulation resistance value recorded at the last PAT test',
      'Nothing — a valid PAT label is sufficient on its own',
      'The plug, flex condition, casing integrity, guards in place, PAT label in date, and correct voltage/supply',
    ],
    correctAnswer: 3,
    explanation:
      'A pre-use inspection is a visual and functional check carried out by the user before each use. It should cover the plug (no damage, correct fuse, cord grip secure), flex (no cuts, fraying or repairs), casing (no cracks or damage), guards and safety devices (in place and functioning), PAT test label (in date), and confirmation the tool is suitable for the supply voltage and environment.',
  },
  {
    id: 8,
    question:
      'VDE 1000 V rated insulated tools are individually tested at what voltage during manufacture?',
    options: ['10,000 V AC', '5,000 V AC', '1,000 V AC', '2,500 V AC'],
    correctAnswer: 0,
    explanation:
      "VDE-rated insulated tools complying with BS EN 60900 are individually tested at 10,000 V AC during manufacture (10 times the rated working voltage). This provides a substantial safety margin. The tools are then marked with the '1000 V' rating and the distinctive red/yellow insulation colour coding that identifies them as electrically rated.",
  },
  {
    id: 9,
    question: 'Calibration of electrical test instruments should be carried out:',
    options: [
      'Only once, when the instrument is first purchased',
      'At intervals specified by the manufacturer or company policy, typically annually, by a UKAS-accredited laboratory',
      'By the user before every test using a proving unit',
      'Every five years, regardless of usage or manufacturer guidance',
    ],
    correctAnswer: 1,
    explanation:
      'Test instruments must be calibrated at regular intervals — typically annually — by a laboratory traceable to national standards (ideally UKAS-accredited). Calibration certificates should be retained as evidence. An out-of-calibration instrument may give inaccurate readings, potentially leading to unsafe conclusions about circuit safety or non-compliance with BS 7671 requirements.',
  },
  {
    id: 10,
    question:
      'When using a multimeter to check for voltage on a circuit believed to be dead, the meter should be set to:',
    options: [
      'The lowest AC voltage range to maximise reading sensitivity',
      'The resistance (ohms) range to confirm the circuit is open',
      'The highest AC voltage range first, then reduced — or use auto-ranging mode',
      'The DC current range to detect any leakage current',
    ],
    correctAnswer: 2,
    explanation:
      'When checking for voltage, always start on the highest voltage range (or use auto-ranging mode) to prevent damage to the meter from an unexpectedly high voltage. If the meter is set to a low range and encounters 400 V, the meter could be damaged or destroyed. Auto-ranging meters eliminate this risk but always confirm the meter is set to voltage mode, not current or resistance.',
  },
  {
    id: 11,
    question:
      'A 110 V centre-tapped supply (CTE) used on construction sites provides a maximum shock voltage of:',
    options: ['110 V', '25 V', '230 V', '55 V'],
    correctAnswer: 3,
    explanation:
      'A 110 V centre-tapped earth (CTE) transformer provides a maximum voltage to earth of 55 V (half of 110 V), because the centre tap of the secondary winding is earthed. This means that a single fault to earth will only expose the user to 55 V — significantly reducing the shock risk compared to a 230 V supply. This is why 110 V CTE is the standard for portable tools on UK construction sites.',
  },
  {
    id: 12,
    question: 'Test instruments used for electrical installation work must comply with:',
    options: [
      'BS EN 61010 (safety) and relevant measurement standards such as BS EN 61557',
      'BS EN 60900 (insulated tools) and BS 7375 alone',
      'BS EN 60529 (IP ratings) and the Building Regulations',
      'GS38 alone, with no requirement for any product standard',
    ],
    correctAnswer: 0,
    explanation:
      'Test instruments must comply with BS EN 61010 (safety requirements for electrical measurement equipment) and the relevant functional standard — typically BS EN 61557 series for installation testing instruments (covering insulation resistance, loop impedance, RCD testing, etc.). GS38 also specifies additional safety requirements for voltage indicators and test leads used on LV systems.',
  },
];

const faqs = [
  {
    question: 'Can I use a neon screwdriver to prove a circuit is dead?',
    answer:
      'No. GS38 does not recommend single-pole voltage indicators (neon screwdrivers) as the sole means of testing for dead. They rely on body capacitance, can give false readings (both false positive and false negative), and do not test between two defined points. Always use a two-pole voltage indicator (such as a Fluke T150 or equivalent) that has been proved on a known live source before and after testing.',
  },
  {
    question: 'How often should I have my test instruments calibrated?',
    answer:
      'Most manufacturers and industry guidance recommend annual calibration by a UKAS-accredited laboratory. However, your company policy may specify different intervals depending on usage frequency and the criticality of the measurements. Instruments that are dropped, damaged or give suspect readings should be recalibrated immediately regardless of the normal schedule.',
  },
  {
    question: 'What is the difference between a Class I and Class II power tool?',
    answer:
      "A Class I tool has a metal casing and relies on earthing (via the CPC in the supply flex) as the primary means of shock protection — if a fault develops, the CPC provides a path for fault current to operate the protective device. A Class II (double-insulated) tool has two layers of insulation and does not require an earth connection — it is identified by the 'double square' symbol. Class II tools are generally preferred for portable use because they do not depend on the integrity of the earth connection.",
  },
  {
    question: 'Do I need to carry a proving unit at all times?',
    answer:
      'Yes, whenever you are carrying out safe isolation procedures. GS38 requires that you prove your voltage indicator on a known live source before and after testing. A proving unit provides this known source in a safe, controlled manner. Some electricians use a known live socket or supply as the proving source, but a dedicated proving unit is the safest and most reliable method, particularly in unfamiliar installations.',
  },
  {
    question: 'What should I do if I find a damaged tool on site?',
    answer:
      "Remove the tool from service immediately by disconnecting it and attaching a clear label stating 'DO NOT USE — DEFECTIVE'. Report the defect to your supervisor or the person responsible for tool management. Do not attempt to repair electrical tools unless you are competent to do so. The tool should not be returned to service until it has been properly repaired by a competent person and retested (including PAT testing for electrical tools).",
  },
];

const MOETModule1Section2_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 1 · Section 1.2 · Subsection 2"
        title="Safe Use of Tools and Test Equipment"
        backTo="/study-centre/apprentice/m-o-e-t-module1-section2"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Selection, inspection, use and maintenance of electrical tools and instruments.
          </p>

          <TLDR
            points={[
              'GS38: Prove-test-prove procedure; fused leads, 4 mm tips',
              'Tools: VDE 1000 V rated, BS EN 60900 compliant',
              'Calibration: Annual by UKAS-accredited laboratory',
              'Inspection: Pre-use visual check every time',
            ]}
          />

          <ConceptBlock title="Test instruments at a glance">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Voltage indicator:</strong> Two-pole, GS38 compliant
              </li>
              <li>
                <strong>Multimeter:</strong> BS EN 61010, CAT III/IV rated
              </li>
              <li>
                <strong>Insulation tester:</strong> 250/500/1000 V DC test voltages
              </li>
              <li>
                <strong>Loop tester:</strong> Earth fault loop impedance (Zs)
              </li>
            </ul>
          </ConceptBlock>

          <LearningOutcomes
            outcomes={[
              'Apply GS38 requirements for test probes, leads and voltage indicators',
              'Explain the prove-test-prove procedure using a proving unit',
              'Select the correct test instrument for common electrical measurements',
              'Carry out pre-use inspection of power tools and hand tools',
              'Describe calibration requirements and record-keeping for test equipment',
              'Identify common faults and safety hazards with electrical tools',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>GS38 requirements</ContentEyebrow>

          <ConceptBlock title="GS38 — Test Probes, Leads and Voltage Indicators">
            <p>
              HSE Guidance Note GS38 (Fourth Edition) provides essential safety guidance on the
              selection and use of electrical test equipment for work on low voltage systems. It is
              not a legal requirement in itself, but following GS38 is considered best practice and
              is the standard expected by the HSE, professional bodies and BS 7671. Failure to
              follow GS38 has been cited as a contributing factor in numerous fatal electrical
              incidents.
            </p>
            <p>
              The guidance applies to all test equipment used for determining whether electrical
              systems are safe to work on — most critically, voltage indicators used for the
              &apos;proving dead&apos; stage of safe isolation. The core principle is the
              three-stage &apos;prove-test-prove&apos; procedure.
            </p>
          </ConceptBlock>

          <ConceptBlock title="The Prove-Test-Prove Procedure">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Step 1 — Prove:</strong> Test the voltage indicator on a known live source
                (proving unit or known live supply) to confirm it is working correctly and
                indicating voltage
              </li>
              <li>
                <strong>Step 2 — Test:</strong> Use the proven voltage indicator to test the
                isolated circuit between all conductors: L-N, L-E, N-E (single phase) or L1-L2,
                L2-L3, L3-L1, L1-N, L2-N, L3-N, L1-E, L2-E, L3-E, N-E (three phase)
              </li>
              <li>
                <strong>Step 3 — Re-prove:</strong> Test the voltage indicator again on the same
                known live source to confirm it is still working correctly after the dead test
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Skipping the re-proving step"
            whatHappens={
              <p>
                The re-proving step confirms that the voltage indicator did not fail between the
                initial proving and the dead test. If the instrument failed during testing, it could
                show &apos;no voltage&apos; on a live circuit — giving a false sense of safety. A
                failed instrument that is not re-proved has been the direct cause of fatal
                electrocutions where electricians began work on what they believed to be a dead
                circuit.
              </p>
            }
            doInstead={
              <>
                Always complete step 3 — re-prove the indicator on the same known live source
                immediately after testing for dead, every time, with no exceptions.
              </>
            }
          />

          <AppendixTable
            caption="GS38 Requirements for Test Equipment"
            headers={['Component', 'GS38 Requirement', 'Reason']}
            rows={[
              [
                'Test probes',
                'Maximum 4 mm exposed metal tip; finger guards; insulated shaft',
                'Prevents accidental bridging between terminals and finger contact with live parts',
              ],
              [
                'Test leads',
                'Fused (not exceeding 500 mA); adequate insulation; coloured for identification',
                'Fuses protect against fault current if probe slips; insulation prevents tracking',
              ],
              [
                'Voltage indicator',
                'Two-pole preferred; clear indication; suitable voltage range; robust construction',
                'Definitive voltage reading between two points; not dependent on body capacitance',
              ],
              [
                'Proving unit',
                'Provides a known voltage to verify voltage indicator function',
                'Enables prove-test-prove without needing access to a known live supply',
              ],
            ]}
          />

          <ConceptBlock
            title="Types of Voltage Indicator"
            onSite="Always carry your own GS38-compliant test leads and proving unit. Never rely on borrowed or unfamiliar equipment. Inspect your test leads before every use — check for damaged insulation, bent tips, and signs of arcing or overheating."
          >
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Two-pole indicator (recommended):</strong> Tests between two points (e.g.,
                Fluke T150, Martindale VI-13700). Provides definitive voltage readings. GS38
                preferred type
              </li>
              <li>
                <strong>Single-pole indicator (neon screwdriver):</strong> Relies on body
                capacitance. Can give false readings. NOT recommended as sole means of testing dead
                by GS38
              </li>
              <li>
                <strong>Non-contact voltage detector (proximity pen):</strong> Detects the electric
                field around a conductor without contact. Useful as a preliminary check but NOT
                reliable for confirming dead — must not be used as the sole means of testing
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Test instruments</ContentEyebrow>

          <ConceptBlock title="Types of Electrical Test Instrument">
            <p>
              Electrical maintenance technicians use a range of test instruments to verify safety,
              diagnose faults and confirm compliance with BS 7671. Each instrument has specific
              capabilities, limitations and safety considerations. Selecting the wrong instrument or
              using it incorrectly can lead to inaccurate readings, equipment damage or personal
              injury.
            </p>
          </ConceptBlock>

          <AppendixTable
            caption="Common Electrical Test Instruments"
            headers={['Instrument', 'Primary Function', 'Key Standard', 'Safety Considerations']}
            rows={[
              [
                'Multimeter',
                'Voltage, current, resistance, continuity',
                'BS EN 61010',
                'CAT III/IV rating for distribution work; fused inputs; auto-ranging preferred',
              ],
              [
                'Clamp meter',
                'Non-contact current measurement',
                'BS EN 61010',
                'Must clamp around a single conductor only; jaw must close fully',
              ],
              [
                'Insulation resistance tester',
                'Measures insulation resistance (MΩ)',
                'BS EN 61557-2',
                'Circuit MUST be dead and disconnected; high test voltage (250-1000 V DC)',
              ],
              [
                'Earth fault loop impedance tester',
                'Measures Zs (earth fault loop)',
                'BS EN 61557-3',
                'Tests on energised circuit; trip hazard on RCD-protected circuits',
              ],
              [
                'RCD tester',
                'Verifies RCD trip time and current',
                'BS EN 61557-6',
                'Tests on energised circuit; will cause RCD to trip — warn occupants',
              ],
              [
                'Continuity tester',
                'Low-resistance measurement (R1+R2, R2)',
                'BS EN 61557-4',
                'Circuit MUST be dead; null leads before testing',
              ],
            ]}
          />

          <ConceptBlock title="Measurement Category (CAT) Ratings">
            <p>
              BS EN 61010 defines measurement categories based on the location in the electrical
              installation and the level of transient overvoltage expected. Using a meter with an
              insufficient CAT rating can result in the meter exploding under fault conditions.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>CAT I:</strong> Protected electronic circuits — low-energy secondary
                circuits
              </li>
              <li>
                <strong>CAT II:</strong> Single-phase socket outlets and portable equipment —
                appliance level
              </li>
              <li>
                <strong>CAT III:</strong> Distribution level — sub-distribution boards, busbar
                trunking, fixed wiring
              </li>
              <li>
                <strong>CAT IV:</strong> Origin of installation — main intake, service heads, meters
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Common Faults with Test Instruments">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Flat batteries:</strong> Can cause inaccurate readings, particularly on
                digital meters which may display incorrect values rather than a clear &apos;low
                battery&apos; warning
              </li>
              <li>
                <strong>Damaged test leads:</strong> Broken conductors inside apparently intact
                insulation — the lead appears fine but has high resistance or an open circuit
              </li>
              <li>
                <strong>Wrong function selected:</strong> Measuring voltage with the meter on
                current (ampere) range can blow the internal fuse or damage the meter
              </li>
              <li>
                <strong>Out of calibration:</strong> Readings drift over time — an uncalibrated
                meter may pass a circuit that should fail, or fail one that complies
              </li>
              <li>
                <strong>Incorrect CAT rating:</strong> A CAT II meter used at a distribution board
                (CAT III environment) may not withstand transient overvoltages
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="A multifunction tester is not a substitute for a voltage indicator">
            <p>
              A multifunction installation tester (MFT) combines many of these instruments into one
              device — continuity, insulation resistance, loop impedance and RCD testing. However, a
              separate two-pole voltage indicator is still required for safe isolation proving, as
              the MFT is not designed for this purpose.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Insulated hand tools</ContentEyebrow>

          <ConceptBlock title="Insulated Hand Tools and Power Tools">
            <p>
              Insulated hand tools are a critical line of defence against electric shock when
              working on or near live or recently de-energised electrical equipment. VDE-rated tools
              provide a controlled, tested insulation barrier between the user and the electrical
              system. Power tools used on electrical installations must be suitable for the working
              environment and regularly inspected.
            </p>
          </ConceptBlock>

          <ConceptBlock title="VDE 1000 V Insulated Tools (BS EN 60900)">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Standard:</strong> BS EN 60900 (IEC 60900) — hand-operated insulated tools
                for live working up to 1000 V AC / 1500 V DC
              </li>
              <li>
                <strong>Testing:</strong> Each tool individually tested at 10,000 V AC during
                manufacture
              </li>
              <li>
                <strong>Identification:</strong> Distinctive red/yellow two-tone insulation,
                &apos;1000 V&apos; marking, and the VDE triangle mark
              </li>
              <li>
                <strong>Types available:</strong> Screwdrivers, pliers (combination, side-cutting,
                long-nose), cable cutters, spanners, socket sets, torque wrenches, wire strippers,
                cable knives
              </li>
              <li>
                <strong>Inspection:</strong> Check for cracks, chips, cuts or wear in the insulation
                before each use. Retire any tool with visible insulation damage
              </li>
              <li>
                <strong>Storage:</strong> Store in a clean, dry tool roll or case. Do not throw into
                a toolbox where they can be damaged by other tools
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Power Tool Classification">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Class I:</strong> Metal casing, earthed via CPC. Requires intact earth for
                safety
              </li>
              <li>
                <strong>Class II:</strong> Double-insulated (double square symbol). No earth
                required
              </li>
              <li>
                <strong>Class III:</strong> Operates on SELV (safety extra-low voltage). Supplied
                from a safety isolating transformer
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="110 V Construction Site Tools">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Supply:</strong> 110 V centre-tapped earth (CTE) transformer
              </li>
              <li>
                <strong>Max shock voltage:</strong> 55 V to earth (half of 110 V)
              </li>
              <li>
                <strong>Identification:</strong> Yellow casing and yellow 16 A plug (BS EN 60309)
              </li>
              <li>
                <strong>Requirement:</strong> BS 7375 specifies 110 V CTE for all portable tools on
                UK construction sites
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="PAT Testing — Portable Appliance Testing">
            <p>
              PAT testing is a process of routine inspection and testing of electrical equipment to
              ensure it is safe for continued use. While there is no specific legal requirement for
              PAT testing, the EAWR 1989 (Reg 4(2)) requires that equipment is maintained to prevent
              danger, and PAT testing is the established means of demonstrating compliance.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Visual inspection:</strong> Plug, flex, casing, strain relief, ventilation —
                carried out at every formal inspection
              </li>
              <li>
                <strong>Earth continuity (Class I):</strong> Test between the earth pin of the plug
                and any accessible metal part — pass: ≤0.1 Ω for power tools
              </li>
              <li>
                <strong>Insulation resistance:</strong> Test between live/neutral connected together
                and earth — pass: ≥1 MΩ
              </li>
              <li>
                <strong>Functional test:</strong> Operate the tool and check for correct function,
                unusual noise, vibration or heat
              </li>
              <li>
                <strong>Frequency:</strong> Depends on equipment type and environment — IET Code of
                Practice recommends risk-based intervals
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Tool Storage and Maintenance"
            onSite="The maintenance technician standard requires you to select and use the correct tools and equipment for the task, carry out pre-use inspections, and maintain tools in a safe and serviceable condition. This is assessed through practical observation and professional discussion."
          >
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Storage:</strong> Keep tools clean and dry. Store insulated tools in
                purpose-made rolls or cases to protect insulation
              </li>
              <li>
                <strong>Cleaning:</strong> Wipe insulated tools with a damp cloth only — never use
                solvents which can degrade the insulation
              </li>
              <li>
                <strong>Sharpening:</strong> Cable strippers and knives should be kept sharp — blunt
                tools require more force and increase the risk of slipping
              </li>
              <li>
                <strong>Replacement:</strong> Replace any tool with damaged insulation, worn jaws,
                cracked handles or any other defect that could compromise safety
              </li>
              <li>
                <strong>Personal responsibility:</strong> Your tools are your personal safety
                equipment. Maintain them to the same standard as PPE
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Calibration and records</ContentEyebrow>

          <ConceptBlock title="Calibration, Pre-Use Inspection and Record-Keeping">
            <p>
              The accuracy and reliability of electrical test instruments directly affect safety
              decisions and compliance with BS 7671. An instrument that reads incorrectly could lead
              to a circuit being declared safe when it is not, or could produce test results that do
              not reflect the true condition of the installation. Calibration, regular inspection
              and proper record-keeping are therefore essential professional practices.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Calibration Requirements">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Frequency:</strong> Typically annually, or as specified by the manufacturer
                and company policy
              </li>
              <li>
                <strong>Standard:</strong> Calibration should be traceable to national standards via
                a UKAS-accredited laboratory
              </li>
              <li>
                <strong>Certificate:</strong> A calibration certificate should be issued detailing
                the tests performed, results and uncertainties
              </li>
              <li>
                <strong>Label:</strong> Instruments should be labelled with the calibration date and
                next due date
              </li>
              <li>
                <strong>Out of tolerance:</strong> If calibration reveals the instrument was out of
                tolerance, all results obtained since the last valid calibration must be reviewed
              </li>
              <li>
                <strong>Interim checks:</strong> Between formal calibrations, regular checks against
                known references help identify drift
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Pre-Use Inspection Checklist — Test Instruments">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Calibration label in date</li>
              <li>Casing undamaged — no cracks, missing parts or ingress of moisture</li>
              <li>Battery level adequate (check indicator or test known reference)</li>
              <li>
                Test leads undamaged — insulation intact, no exposed conductors, probes not bent
              </li>
              <li>Fuses in test leads intact (carry spares)</li>
              <li>Probe tips within specification (4 mm max exposed)</li>
              <li>Finger guards present and secure on probes</li>
              <li>Function selection correct for the measurement to be taken</li>
              <li>Zero/null the instrument where applicable (continuity testing)</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Record-Keeping and Traceability">
            <p>
              BS 7671 requires that test results are recorded on the appropriate certification
              documents (Electrical Installation Certificate, Minor Works Certificate, or Electrical
              Installation Condition Report). The serial number of the test instrument used should
              be recorded on the certificate, providing traceability between the result and the
              calibrated instrument. If the instrument is subsequently found to be out of
              calibration, all affected certificates can be identified and the results verified.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Common pre-use inspection failures"
            whatHappens={
              <>
                <p>
                  The following defects are frequently found during audits and have contributed to
                  incidents:
                </p>
                <ul className="mt-2 list-disc space-y-1.5 pl-5 marker:text-orange-300/70">
                  <li>
                    <strong>Non-compliant test leads:</strong> Using standard (non-GS38) leads with
                    long exposed tips and no finger guards
                  </li>
                  <li>
                    <strong>Missing or blown fuses in leads:</strong> Some users replace blown fuses
                    with wire or foil — creating a direct short-circuit hazard
                  </li>
                  <li>
                    <strong>Expired calibration:</strong> Instruments used months or years beyond
                    their calibration due date
                  </li>
                  <li>
                    <strong>No proving unit carried:</strong> Relying on &apos;finding a known live
                    socket&apos; rather than carrying a dedicated proving unit
                  </li>
                  <li>
                    <strong>Damaged insulation on leads:</strong> Taped-up or heat-shrunk repairs to
                    test leads — leads should be replaced, not repaired
                  </li>
                </ul>
              </>
            }
            doInstead={
              <>
                Your test instruments and leads are safety-critical equipment. Treat them with the
                same respect as PPE — inspect before every use, maintain them properly, keep
                calibration current, and replace them when they are damaged or worn. A professional
                electrician is only as reliable as their instruments.
              </>
            }
          />

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <KeyTakeaways
            title="Quick reference"
            points={[
              'GS38 essentials: two-pole voltage indicator preferred, the prove-test-prove procedure, 4 mm max exposed tip on probes, fused leads (≤500 mA), finger guards on probes.',
              'Key references: GS38 — electrical test equipment guidance; BS EN 60900 — insulated hand tools; BS EN 61010 — test instrument safety; BS EN 61557 — installation testing instruments; ST1426 — maintenance technician KSBs.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz
              title="Safe use of tools and test equipment knowledge check"
              questions={quizQuestions}
            />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module1-section2-1')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Dangers of Electricity
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module1-section2-3')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Personal Protective Equipment
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule1Section2_2;
