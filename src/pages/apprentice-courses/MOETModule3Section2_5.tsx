/**
 * MOET · Module 3 · Section 3.2 · Subsection 5 — Motor Maintenance and Testing
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option. NOT ST0154 (the "MOET" the course is named after) —
 * ST0154 v1.6 is still live, but its own EPA plan records that the Electrical
 * Technician option "was retired 31/12/2025" and was replaced by ST1426
 * (single discipline) or ST1443 (dual discipline). The course keeps the MOET
 * name because that is what employers and colleges still call the role.
 *
 * KSBs covered, quoted rather than numbered — the published K/S/B
 * numbering is unverified, so never write a code here:
 *   · "Electrical. Electrical plant, equipment, and systems maintenance
 *     requirements: removing and replacing parts, inspecting, testing,
 *     setting up, adjusting, cleaning, and functional testing."
 *   · "Electrical. Principles of single phase and three-phase equipment,
 *     plant, and systems, the operation of motors and generators, and the
 *     use of monitoring and protection equipment."
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
  Scenario,
  CommonMistake,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Motor Maintenance and Testing - MOET Module 3 Section 2.5';
const DESCRIPTION =
  'Comprehensive guide to motor maintenance and testing for electrical maintenance technicians: preventive maintenance schedules, insulation resistance testing, vibration analysis, thermographic surveys, bearing maintenance, motor testing procedures and fault diagnosis under ST1426.';

const quickCheckQuestions = [
  {
    id: 'ir-test',
    question:
      'What is the minimum acceptable insulation resistance value for a low-voltage motor at operating temperature?',
    options: [
      'A fixed 10 megohm regardless of the motor voltage rating',
      '1 megohm per kV of rated voltage, with a minimum of 1 megohm',
      '0.5 megohm per kV of rated voltage, with no minimum value',
      '1 megohm per amp of full-load current',
    ],
    correctIndex: 1,
    explanation:
      'IEEE 43 recommends a minimum insulation resistance of 1 megohm per kV of rated voltage, with an absolute minimum of 1 megohm for low-voltage motors. For a 400 V motor, the minimum would therefore be 1 megohm. Values below this indicate deteriorated insulation requiring investigation. Trending values over time is more useful than single readings.',
  },
  {
    id: 'vibration-causes',
    question:
      'Which of the following is the most common cause of excessive vibration in an electric motor?',
    options: [
      'Misalignment between motor and driven equipment',
      'Slightly elevated supply voltage within the permitted tolerance',
      'Use of a soft starter rather than direct-on-line starting',
      'A correctly balanced and aligned coupling',
    ],
    correctIndex: 0,
    explanation:
      'Misalignment between the motor shaft and the driven equipment (pump, fan, gearbox) is the single most common cause of excessive vibration. Angular and parallel misalignment both cause characteristic vibration signatures. Laser alignment tools are used to achieve the tight tolerances required — typically within 0.05 mm.',
  },
  {
    id: 'bearing-grease',
    question: 'What is the consequence of over-greasing a motor bearing?',
    options: [
      'It improves cooling and significantly extends the bearing life',
      'It has no measurable effect provided the correct grease type is used',
      'It reduces the bearing operating temperature and lowers friction',
      'Excess grease generates heat, increases friction and can damage the bearing seal, leading to premature failure',
    ],
    correctIndex: 3,
    explanation:
      "Over-greasing is a very common maintenance error. Excess grease generates heat through internal friction (churning), raises the bearing operating temperature, can damage the bearing seal allowing contaminants to enter, and in sealed bearings can cause the grease to break down. Always follow the manufacturer's specified grease quantity and re-greasing interval. A grease relief valve or calculated fill volume prevents over-greasing.",
  },
  {
    id: 'thermography',
    question: 'What can an infrared thermographic survey reveal about motor condition?',
    options: [
      'The exact insulation resistance value of each phase winding',
      'Hot spots indicating bearing wear, winding faults, loose connections or cooling problems',
      'The polarisation index and dielectric absorption ratio of the windings',
      'The number of broken rotor bars and their precise location',
    ],
    correctIndex: 1,
    explanation:
      'Infrared thermography reveals temperature distribution across the motor, identifying hot spots that indicate developing faults: bearing overheating (early wear), winding hot spots (turn-to-turn faults), connection overheating (loose or corroded terminals), cooling blockages (blocked ventilation), and uneven frame temperature (rotor eccentricity). Thermography is non-contact and can be performed on running motors.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'The purpose of a preventive maintenance programme for motors is:',
    options: [
      'To run every motor to failure and then replace it with a new unit',
      'To detect and correct developing faults before they cause unplanned failure, extending motor life and reducing downtime',
      'To increase the load on each motor so faults appear sooner',
      'To replace all motor components at fixed intervals regardless of condition',
    ],
    correctAnswer: 1,
    explanation:
      'Preventive maintenance aims to detect developing faults early through scheduled inspections, testing and condition monitoring. This allows planned intervention before catastrophic failure, reducing unplanned downtime, extending motor life, and lowering overall maintenance costs. The alternative — run-to-failure — results in unexpected breakdowns, production losses and often more expensive emergency repairs.',
  },
  {
    id: 2,
    question:
      'When performing an insulation resistance test on a motor, the test voltage for a 400 V rated motor should be:',
    options: ['1,000 V DC', '230 V DC', '500 V DC', '5,000 V DC'],
    correctAnswer: 2,
    explanation:
      'For motors rated up to 1,000 V, the standard insulation resistance test voltage is 500 V DC. Higher test voltages (1,000 V or 2,500 V) are used for higher-voltage motors. Using too high a test voltage on a low-voltage motor can stress or damage the insulation. BS 7671 and IEEE 43 both specify appropriate test voltages for different motor ratings.',
  },
  {
    id: 3,
    question: 'A polarisation index (PI) test involves:',
    options: [
      'Measuring the winding resistance of each phase with a micro-ohmmeter',
      'Comparing the current drawn on each of the three supply phases',
      'Applying a high-frequency surge pulse to two windings at once',
      'Taking insulation resistance readings at 1 minute and 10 minutes and calculating the ratio',
    ],
    correctAnswer: 3,
    explanation:
      'The polarisation index is the ratio of the 10-minute insulation resistance reading to the 1-minute reading (PI = R10/R1). For healthy insulation, the PI should be greater than 2.0. A PI below 1.5 indicates contaminated or deteriorated insulation. The PI test is more informative than a single IR reading because it reveals the condition of the insulation bulk, not just its surface.',
  },
  {
    id: 4,
    question: 'Winding resistance measurement on a three-phase motor is used to detect:',
    options: [
      'Imbalance between phases indicating shorted turns, poor connections or winding damage',
      'Moisture and contamination on the surface of the winding insulation',
      'Bearing defects through their characteristic vibration frequencies',
      'Broken rotor bars while the motor is running under load',
    ],
    correctAnswer: 0,
    explanation:
      'Winding resistance measurement compares the resistance of each phase winding. In a healthy motor, all three phases should have equal resistance within 1-2%. Significant imbalance indicates shorted turns (lower resistance on the affected phase), poor connections (higher resistance), or winding damage. A low-resistance ohmmeter (micro-ohmmeter) is used for accurate measurement.',
  },
  {
    id: 5,
    question: 'Motor bearing condition can be assessed using:',
    options: [
      'Insulation resistance testing of the stator windings to earth',
      'Vibration analysis, temperature monitoring, ultrasonic testing and oil/grease analysis',
      'A polarisation index test on the rotor windings',
      'A polarity check of the supply at the motor terminals',
    ],
    correctAnswer: 1,
    explanation:
      'Bearing condition is assessed using multiple techniques: vibration analysis (characteristic frequencies for each bearing fault type); temperature monitoring (thermography or contact probes); ultrasonic testing (detects high-frequency signals from bearing defects); and lubricant analysis (particles in grease or oil indicating wear). Using multiple techniques provides a more reliable assessment than any single method.',
  },
  {
    id: 6,
    question: 'The correct procedure before performing any maintenance on a motor is:',
    options: [
      'Simply switch the motor off at the local control button and begin work',
      'Take a vibration reading and then start the mechanical work',
      'Carry out safe isolation: isolate, lock off, prove dead, and display warning notices',
      'Disconnect the earth conductor first to make the motor safe',
    ],
    correctAnswer: 2,
    explanation:
      'Safe isolation is mandatory before any motor maintenance. The full procedure is: identify the correct supply; isolate at the appropriate point (MCC, local isolator or both); lock off with a personal padlock; prove dead at the motor terminals using a GS38-compliant voltage indicator tested before and after use; and display warning notices. This applies to all motor maintenance, including mechanical tasks on the driven equipment.',
  },
  {
    id: 7,
    question: 'Surge comparison testing on motor windings is used to detect:',
    options: [
      'Bearing wear through high-frequency vibration signatures',
      'Moisture contamination on the winding surface to earth',
      'Supply voltage imbalance between the three phases',
      'Turn-to-turn insulation faults that are not detected by standard IR testing',
    ],
    correctAnswer: 3,
    explanation:
      'Surge comparison testing applies a high-frequency voltage pulse simultaneously to two windings and compares the reflected waveforms. If the windings are identical, the waveforms overlay perfectly. Turn-to-turn faults cause a difference in the waveforms (phase shift and amplitude change). This test detects developing inter-turn faults that standard 500 V insulation resistance testing cannot find.',
  },
  {
    id: 8,
    question: 'Motor current signature analysis (MCSA) can detect:',
    options: [
      'Rotor bar defects, bearing faults, air gap eccentricity and mechanical load problems — all while the motor is running',
      'The dielectric absorption ratio of the winding insulation',
      'Only faults that occur while the motor is isolated and stationary',
      'The exact remaining service life of the bearing grease',
    ],
    correctAnswer: 0,
    explanation:
      'Motor current signature analysis examines the frequency spectrum of the motor supply current while the motor is running under normal load. Specific fault types produce characteristic sidebands around the supply frequency: broken rotor bars, bearing defects, air gap eccentricity, and mechanical load variations. MCSA is a powerful non-intrusive online condition monitoring technique.',
  },
  {
    id: 9,
    question: 'How often should motor bearings typically be re-greased?',
    options: [
      'Only once during the entire service life of the motor',
      "According to the manufacturer's schedule, typically every 2,000-8,000 operating hours depending on size and speed",
      'Every time the motor is started from cold',
      'Whenever the insulation resistance reading falls below 1 megohm',
    ],
    correctAnswer: 1,
    explanation:
      "Re-greasing intervals depend on bearing size, type, speed, temperature and environment. Typical intervals range from 2,000 to 8,000 operating hours. The manufacturer's data sheet provides the specific interval and grease quantity. Both under-greasing and over-greasing cause premature bearing failure. Automatic grease dispensers can improve reliability for critical motors.",
  },
  {
    id: 10,
    question:
      'A motor draws significantly higher current on one phase than the other two. The most likely cause is:',
    options: [
      'Over-greasing of the non-drive-end bearing',
      'A blocked cooling fan reducing the airflow over the frame',
      'A stator winding fault (shorted turns) on that phase, after confirming the supply voltage is balanced',
      'A loose mounting bolt causing mechanical looseness',
    ],
    correctAnswer: 2,
    explanation:
      'While supply voltage imbalance can cause current imbalance, a significant difference on one phase suggests a motor fault — most likely shorted turns in the stator winding on that phase. The reduced impedance of the shorted turns draws more current. However, always check the supply voltage balance first (using the NEMA standard: a 1% voltage imbalance can cause up to 6-10% current imbalance).',
  },
  {
    id: 11,
    question: 'The dielectric absorption ratio (DAR) is:',
    options: [
      'The ratio of the 10-minute insulation resistance reading to the 1-minute reading',
      'The difference in winding resistance between any two phases',
      'The ratio of the running current to the full-load current',
      'The ratio of the 60-second insulation resistance reading to the 30-second reading',
    ],
    correctAnswer: 3,
    explanation:
      'The dielectric absorption ratio is R60/R30 — the 60-second insulation resistance reading divided by the 30-second reading. For healthy insulation, the DAR should be greater than 1.25. A DAR close to 1.0 indicates that the insulation is contaminated with moisture or conducting particles, as there is no dielectric absorption effect. The DAR is a quicker alternative to the full 10-minute PI test.',
  },
  {
    id: 12,
    question:
      'When trending motor insulation resistance values over time, the most important indicator is:',
    options: [
      'The rate and direction of change — a steadily declining trend indicates deteriorating insulation requiring investigation',
      'The single highest reading ever recorded for the motor',
      'Whether the readings were taken using a 500 V or 1,000 V test',
      'The colour of the warning notice displayed during isolation',
    ],
    correctAnswer: 0,
    explanation:
      'While absolute values are important (below 1 megohm requires action), the trend over time is the most valuable indicator. A steadily declining trend — even if individual readings are still above minimum — indicates deteriorating insulation and allows planned maintenance before failure. All readings should be temperature-corrected to a common reference temperature (typically 40 degrees C) for valid comparison.',
  },
];

const faqs = [
  {
    question: 'How often should motor insulation resistance be tested?',
    answer:
      "The frequency depends on the motor's criticality and operating environment. For critical motors, test annually at minimum — many organisations test every six months. For non-critical motors, annual or biennial testing is typical. Motors in harsh environments (damp, dusty, hot, corrosive) should be tested more frequently. The most important thing is to establish a consistent testing schedule so that meaningful trends can be identified.",
  },
  {
    question: 'Can I perform insulation resistance testing on a motor connected to a VSD?',
    answer:
      "No — you must disconnect the motor cables from the VSD output terminals before performing insulation resistance testing. The 500 V DC test voltage will damage the VSD's IGBT output stage, varistors and other semiconductor components. Similarly, disconnect any surge protection devices, capacitors or electronic instruments connected to the motor circuit before testing.",
  },
  {
    question: 'What is the difference between preventive and predictive maintenance?',
    answer:
      'Preventive maintenance (PM) is time-based or usage-based — tasks are performed at fixed intervals regardless of equipment condition (e.g., re-grease bearings every 4,000 hours). Predictive maintenance (PdM) is condition-based — monitoring techniques (vibration analysis, thermography, oil analysis, MCSA) assess the actual condition and maintenance is performed only when the data indicates a developing fault. PdM avoids unnecessary work while catching problems earlier. Most effective programmes combine both approaches.',
  },
  {
    question: 'What personal protective equipment is required for motor testing?',
    answer:
      'PPE requirements depend on the specific test. For insulation resistance testing on an isolated motor: safety boots, appropriate clothing, and insulated gloves (if there is any risk of contact with energised parts). For vibration monitoring or thermography on running motors: all of the above plus hearing protection, eye protection, and awareness of rotating parts — do not wear loose clothing or jewellery. For motor circuit analysis on live systems: arc flash rated PPE appropriate to the incident energy level.',
  },
  {
    question: 'What causes a motor to run hot?',
    answer:
      "Common causes of motor overheating include: overload (drawing more current than rated); supply voltage imbalance (causes negative-sequence currents and additional rotor heating); blocked ventilation (dirty filters, obstructed cooling fins); high ambient temperature (above the motor's rated ambient); repeated starting (inrush current heats the windings); single-phasing (loss of one supply phase); and shorted turns in the stator winding. Investigate promptly — prolonged overheating degrades winding insulation and shortens motor life significantly.",
  },
];

const MOETModule3Section2_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 3 · Section 3.2 · Subsection 5"
        title="Motor Maintenance and Testing"
        backTo="/study-centre/apprentice/m-o-e-t-module3-section2"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Preventive maintenance, testing procedures and fault diagnosis for electric motors.
          </p>

          <TLDR
            points={[
              'PM schedules: Time-based inspections, cleaning and lubrication.',
              'IR testing: 500 V DC, minimum 1 megohm, trend over time.',
              'Vibration: Detects misalignment, bearing wear, imbalance.',
              'Thermography: Non-contact detection of hot spots and cooling issues.',
            ]}
          />

          <ConceptBlock title="Why this matters">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Bearings:</strong> Most common motor failure point — grease correctly.
              </li>
              <li>
                <strong>PI test:</strong> R10/R1 ratio reveals insulation bulk condition.
              </li>
              <li>
                <strong>MCSA:</strong> Online detection of rotor faults without stopping.
              </li>
              <li>
                <strong>ST1426:</strong> Maps to plant maintenance and condition monitoring KSBs.
              </li>
            </ul>
          </ConceptBlock>

          <LearningOutcomes
            outcomes={[
              'Develop a preventive maintenance schedule for electric motors',
              'Perform insulation resistance and polarisation index testing',
              'Interpret vibration analysis data to identify common motor faults',
              'Apply thermographic survey techniques to running motors',
              'Carry out bearing maintenance including correct re-greasing procedures',
              'Use motor current signature analysis for online condition monitoring',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Preventive maintenance strategy</ContentEyebrow>

          <ConceptBlock
            title="Motors are the workhorses of industrial and commercial installations"
            onSite="Always perform safe isolation before any motor maintenance. Even mechanical tasks such as coupling alignment require the motor to be isolated, locked off and proved dead — the motor could be started remotely by a PLC or BMS if the supply is not securely isolated."
          >
            <p>
              Electric motors are the workhorses of industrial and commercial installations. They
              account for approximately 70% of industrial electricity consumption in the UK, and
              their reliability directly affects production output, safety and energy efficiency. A
              structured preventive maintenance programme is essential for maximising motor life and
              minimising unplanned downtime.
            </p>
            <p>
              Motor failures are rarely sudden — they develop over weeks or months, giving ample
              opportunity for detection through systematic inspection and testing. The most common
              failure modes are bearing degradation (approximately 50% of all motor failures),
              stator winding insulation breakdown (approximately 35%), and rotor faults
              (approximately 10%). A good maintenance programme addresses all three.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Frequency</th>
                    <th className="py-2 font-medium text-white">Tasks</th>
                  </tr>
                </thead>
                <tbody className="text-xs text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Monthly</td>
                    <td className="py-2">
                      Visual inspection, check for unusual noise/vibration/smell, check terminal box
                      condition, verify cooling airflow, check mounting bolts
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Quarterly</td>
                    <td className="py-2">
                      Measure supply voltage and current (all three phases), check earth continuity,
                      thermographic survey, vibration spot-check
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Annually</td>
                    <td className="py-2">
                      Insulation resistance test (500 V DC), winding resistance measurement, full
                      vibration analysis, bearing re-greasing (or per manufacturer schedule),
                      alignment check
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">Major overhaul</td>
                    <td className="py-2">
                      Strip-down inspection, bearing replacement, rewind assessment, surge
                      comparison test, dynamic balancing
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Insulation resistance and winding tests</ContentEyebrow>

          <ConceptBlock
            title="The most fundamental electrical test for motor condition assessment"
            onSite="Never perform insulation resistance testing on a motor connected to a VSD, soft starter or any electronic equipment. The 500 V DC test voltage will destroy semiconductor components. Always disconnect the motor cables at the VSD output terminals before testing."
          >
            <p>
              Insulation resistance (IR) testing is the most fundamental electrical test for motor
              condition assessment. It measures the resistance of the winding insulation to earth
              and between phases, detecting moisture ingress, contamination and insulation
              deterioration before a catastrophic failure occurs.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Isolate and prove dead:</strong> Disconnect the motor from its supply and
                any connected electronic equipment (VSDs, soft starters, capacitors)
              </li>
              <li>
                <strong>Discharge:</strong> Ensure the winding is discharged before connecting the
                test instrument
              </li>
              <li>
                <strong>Connect:</strong> Test each phase winding to earth, and between phases
              </li>
              <li>
                <strong>Test voltage:</strong> 500 V DC for motors rated up to 1,000 V; 1,000 V DC
                for motors rated 1,001-2,500 V; 2,500 V or 5,000 V for higher-voltage motors
              </li>
              <li>
                <strong>Duration:</strong> Apply voltage for 1 minute (standard IR reading); extend
                to 10 minutes for PI test
              </li>
              <li>
                <strong>Record:</strong> Note the reading, ambient temperature, humidity and motor
                temperature
              </li>
              <li>
                <strong>Temperature correct:</strong> Correct all readings to a common reference
                temperature (40 degrees C) for valid trending
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Polarisation index (PI) and dielectric absorption ratio (DAR)">
            <p>
              The PI and DAR tests provide deeper insight into insulation condition than a simple IR
              reading. They measure how the insulation responds over time to the applied DC voltage
              — healthy insulation shows an increasing resistance as the dielectric absorbs charge,
              while contaminated insulation shows little change.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Test</th>
                    <th className="py-2 pr-4 font-medium text-white">Formula</th>
                    <th className="py-2 pr-4 font-medium text-white">Good</th>
                    <th className="py-2 font-medium text-white">Investigate</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">DAR</td>
                    <td className="py-2 pr-4">R60s / R30s</td>
                    <td className="py-2 pr-4">&gt; 1.25</td>
                    <td className="py-2">&lt; 1.1</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">PI</td>
                    <td className="py-2 pr-4">R10min / R1min</td>
                    <td className="py-2 pr-4">&gt; 2.0</td>
                    <td className="py-2">&lt; 1.5</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Winding resistance measurement">
            <p>
              Winding resistance measurement using a micro-ohmmeter compares the DC resistance of
              each phase winding. In a healthy three-phase motor, all three phases should be within
              1-2% of each other. A significantly lower resistance on one phase indicates shorted
              turns; a higher resistance indicates a poor connection or a partially open winding.
              This test requires the motor to be isolated and disconnected.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Vibration analysis and thermography</ContentEyebrow>

          <ConceptBlock
            title="The most powerful predictive maintenance tool for rotating machinery"
            onSite="Vibration data is most valuable when trended over time. Establish baseline readings when the motor is known to be in good condition, then compare subsequent readings against this baseline. ISO 10816 provides vibration severity classification for different motor types and sizes."
          >
            <p>
              Vibration analysis is the most powerful predictive maintenance tool for rotating
              machinery. Every motor has a characteristic vibration signature, and changes in this
              signature reveal developing faults long before they cause failure. Thermographic
              surveys complement vibration analysis by identifying temperature anomalies that
              indicate electrical or mechanical problems.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Fault</th>
                    <th className="py-2 pr-4 font-medium text-white">Vibration characteristic</th>
                    <th className="py-2 font-medium text-white">Frequency</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Imbalance</td>
                    <td className="py-2 pr-4">Dominant at 1x running speed, radial direction</td>
                    <td className="py-2">1x RPM</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Misalignment</td>
                    <td className="py-2 pr-4">
                      Dominant at 1x and 2x running speed, axial component
                    </td>
                    <td className="py-2">1x, 2x RPM</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Bearing defect</td>
                    <td className="py-2 pr-4">
                      Characteristic bearing frequencies (BPFO, BPFI, BSF)
                    </td>
                    <td className="py-2">Bearing-specific</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Looseness</td>
                    <td className="py-2 pr-4">Sub-harmonics and harmonics of running speed</td>
                    <td className="py-2">0.5x, 1x, 2x, 3x RPM</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Electrical (rotor)</td>
                    <td className="py-2 pr-4">
                      Sidebands at slip frequency around 1x RPM, disappears when power removed
                    </td>
                    <td className="py-2">1x RPM +/- slip</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Infrared thermography for motors">
            <p>
              Thermographic surveys provide a non-contact thermal image of the motor, revealing
              temperature distribution across the frame, bearings, terminal box and coupling.
              Surveys should be performed on motors running under normal load conditions for
              meaningful results.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Bearing hot spots:</strong> One bearing significantly hotter than the other
                indicates developing wear, over-greasing or lubrication failure
              </li>
              <li>
                <strong>Winding hot spots:</strong> Uneven frame temperature may indicate a winding
                fault or cooling blockage
              </li>
              <li>
                <strong>Terminal box:</strong> Hot connections indicate loose or corroded
                terminations — a fire and failure risk
              </li>
              <li>
                <strong>Cooling system:</strong> Blocked fins, dirty filters or failed fans show as
                elevated frame temperature
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Bearing maintenance and lubrication</ContentEyebrow>

          <ConceptBlock
            title="Bearing failure is the single most common cause of motor failure"
            onSite="For sealed-for-life (2RS) bearings, no re-greasing is required or possible. These bearings must be replaced when they reach end of life, which is determined by operating hours, speed and temperature. Motors with sealed bearings are typically smaller frame sizes (up to approximately IEC 160)."
          >
            <p>
              Bearing failure is the single most common cause of motor failure, accounting for
              approximately 50% of all motor breakdowns. Proper lubrication is the most important
              factor in bearing life — and ironically, incorrect lubrication (particularly
              over-greasing) is one of the most common maintenance errors. Understanding correct
              bearing maintenance procedures is essential for every maintenance technician.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Check the datasheet:</strong> Use only the grease type and quantity
                specified by the motor manufacturer
              </li>
              <li>
                <strong>Clean the grease nipple:</strong> Wipe clean before attaching the grease gun
                to prevent dirt ingress
              </li>
              <li>
                <strong>Open the drain plug:</strong> If fitted, open the grease drain plug to allow
                old grease to escape
              </li>
              <li>
                <strong>Add grease slowly:</strong> Use a hand-operated grease gun (not pneumatic)
                and pump slowly whilst the motor is running
              </li>
              <li>
                <strong>Correct quantity:</strong> Add only the specified amount — typically
                measured in grams, not number of pumps
              </li>
              <li>
                <strong>Run and check:</strong> Run the motor for 30 minutes after re-greasing, then
                check the bearing temperature has returned to normal
              </li>
              <li>
                <strong>Close drain:</strong> Close the drain plug after excess grease has been
                expelled
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Over-greasing"
            whatHappens={
              <>
                Forces grease past the bearing seal, generates excessive heat, and accelerates
                bearing wear — the most common lubrication error.
              </>
            }
            doInstead={
              <>
                Follow the manufacturer's specified grease type and quantity exactly — typically
                measured in grams, not number of pumps.
              </>
            }
          />

          <ConceptBlock title="Other common lubrication errors">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Wrong grease type:</strong> Mixing incompatible grease types causes the base
                oil to separate from the thickener, losing lubrication effectiveness
              </li>
              <li>
                <strong>Under-greasing:</strong> Metal-to-metal contact causes rapid wear and
                generates high-frequency noise
              </li>
              <li>
                <strong>Contamination:</strong> Dirt or moisture introduced during re-greasing
                causes abrasive wear
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Advanced testing and fault diagnosis</ContentEyebrow>

          <ConceptBlock title="Surge comparison testing">
            <p>
              Surge comparison testing applies a high-voltage, high-frequency pulse to two windings
              simultaneously and compares the reflected waveforms on an oscilloscope display.
              Identical windings produce identical overlapping waveforms. Turn-to-turn insulation
              faults cause a difference in inductance, resulting in a phase shift and amplitude
              change between the waveforms. This test detects developing inter-turn faults that
              standard 500 V insulation resistance testing cannot find — the turn-to-turn voltage
              stress during normal operation can be far higher than the test voltage between the
              winding and earth.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Motor current signature analysis (MCSA)">
            <p>
              MCSA is a powerful online condition monitoring technique that analyses the frequency
              spectrum of the motor supply current while the motor is running under normal load. It
              requires no physical contact with the motor — only a current clamp on one supply
              phase. The technique can detect:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Broken rotor bars:</strong> Sidebands at +/- slip frequency around the
                supply frequency (50 Hz)
              </li>
              <li>
                <strong>Air gap eccentricity:</strong> Characteristic frequency patterns related to
                rotor slot passing frequency
              </li>
              <li>
                <strong>Bearing defects:</strong> Bearing characteristic frequencies modulated onto
                the supply current
              </li>
              <li>
                <strong>Mechanical load faults:</strong> Driven equipment problems (misalignment,
                gear mesh faults) reflected in the current spectrum
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Systematic fault diagnosis"
            onSite="Under ST1426, maintenance technicians are expected to carry out condition monitoring activities, interpret test results, and make recommendations for corrective action. Understanding these testing techniques and their applications is a core competence requirement."
          >
            <p>
              When a motor fault is reported, a systematic approach prevents wasted time and missed
              diagnoses. Work through the following sequence:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Step 1 — Supply:</strong> Check all three phase voltages at the motor
                terminals; check for voltage imbalance (should be less than 2%)
              </li>
              <li>
                <strong>Step 2 — Current:</strong> Measure current on all three phases under load;
                compare with the nameplate full-load current
              </li>
              <li>
                <strong>Step 3 — Insulation:</strong> Isolate and test insulation resistance (all
                phases to earth, phase to phase)
              </li>
              <li>
                <strong>Step 4 — Winding resistance:</strong> Measure and compare all three phase
                winding resistances
              </li>
              <li>
                <strong>Step 5 — Mechanical:</strong> Check alignment, coupling condition, bearing
                noise and vibration
              </li>
              <li>
                <strong>Step 6 — Thermal:</strong> Thermographic survey to identify hot spots and
                temperature distribution
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="A motor that passes insulation resistance and fails a week later"

            situation={
              <>
                <p>
                  A 15 kW pump motor is tested during a planned shutdown. Insulation resistance
                  reads 180 MΩ at 500 V, well above the minimum. Winding resistance is balanced
                  across the three phases. It is signed off as healthy.
                </p>

                <p>Nine days later it fails to earth on starting.</p>
              </>
            }

            whatToDo={
              <>
                <p>
                  Look at the trend, not the single reading. If the previous two tests read 900 MΩ
                  and 450 MΩ, then 180 MΩ is not a pass — it is the third point on a curve heading
                  downwards, and the number being above the minimum is beside the point.
                </p>

                <p>
                  Record the winding temperature at test. Insulation resistance falls roughly by
                  half for every 10 °C rise, so a reading taken on a warm motor and compared against
                  one taken cold is not a comparison at all.
                </p>

                <p>
                  Consider a polarisation index or a timed absorption test where the trend is
                  questionable. A healthy winding’s reading climbs over the first minute as
                  absorption current decays; contaminated or wet insulation stays flat.
                </p>

                <p>
                  Check what the motor sits in. A motor in a wet or dusty location degrading over
                  months is a different problem from one that has had a single ingress event, and
                  the fix is different too.
                </p>
              </>
            }

            whyItMatters={
              <p>
                A pass against a minimum tells you the motor is not failed today. It says nothing
                about whether it will be running next month, and a minimum figure was never intended
                to be used as a health target. This is the same lesson as the vibration trending
                elsewhere in the course — the direction and the rate of change carry more
                information than the level, and a maintenance regime built on pass-or-fail
                thresholds will keep being surprised.
              </p>
            }
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Testing methods: IR test 500 V DC, minimum 1 megohm (LV motors); PI test R10min/R1min, good if > 2.0; DAR test R60s/R30s, good if > 1.25; winding resistance within 1-2% across phases; surge comparison detects turn-to-turn faults; MCSA gives online detection of rotor and bearing faults.',
              'Safe isolation before all motor maintenance. Bearings account for 50% of all motor failures.',
              'Re-grease per manufacturer schedule (2,000-8,000 hours). Always disconnect the VSD before insulation testing.',
              'Trend IR readings over time, temperature-corrected. ISO 10816 provides vibration severity classification.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module3-section2-4')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Prev subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  VSDs and Soft Starters
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module3-section2')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Back to section <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Section 3.2 hub
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule3Section2_5;
