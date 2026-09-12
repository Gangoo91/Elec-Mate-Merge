/**
 * MOET · Module 3 · Section 3.2 · Subsection 4 — Variable Speed Drives and Soft Starters
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
 *   · "Electrical. Principles of single phase and three-phase equipment,
 *     plant, and systems, the operation of motors and generators, and the
 *     use of monitoring and protection equipment."
 *   · "Electrical. Electrical plant, equipment, and systems maintenance
 *     requirements: removing and replacing parts, inspecting, testing,
 *     setting up, adjusting, cleaning, and functional testing."
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
  VideoCard,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Variable Speed Drives and Soft Starters - MOET Module 3 Section 2.4';
const DESCRIPTION =
  'Comprehensive guide to VSDs and soft starters for electrical maintenance technicians: VSD architecture (rectifier, DC bus, inverter), V/f and vector control, soft starter thyristor operation, commissioning, harmonics, EMC compliance and maintenance under ST1426.';

const quickCheckQuestions = [
  {
    id: 'dc-bus-voltage',
    question: 'What is the approximate DC bus voltage for a VSD connected to a 400 V AC supply?',
    options: ['565 V DC', '690 V DC', '400 V DC', '230 V DC'],
    correctIndex: 0,
    explanation:
      'The DC bus voltage is approximately 400 V x 1.414 (the square root of 2) = 565 V DC. This is the peak of the AC supply waveform, rectified and smoothed by the DC bus capacitors. Monitoring the DC bus voltage is a key diagnostic parameter -- significantly lower values indicate rectifier or supply issues.',
  },
  {
    id: 'soft-starter-device',
    question: 'What semiconductor devices do soft starters use to control the motor voltage?',
    options: [
      'Back-to-back thyristors (SCRs)',
      'Insulated gate bipolar transistors (IGBTs)',
      'Power diodes in a bridge arrangement',
      'Field-effect transistors (MOSFETs)',
    ],
    correctIndex: 0,
    explanation:
      'Soft starters use back-to-back thyristors (SCRs) on each of the three phases. By controlling the firing angle of the thyristors, the effective voltage applied to the motor is gradually increased from a low initial level to full supply voltage over an adjustable ramp time. Once at full speed, the thyristors are typically bypassed by a contactor.',
  },
  {
    id: 'vsd-maintenance',
    question: 'What is the most common failure point in a VSD that requires regular maintenance?',
    options: ['Cooling fans and filters', 'IGBT modules', 'The keypad display', 'Motor cables'],
    correctIndex: 0,
    explanation:
      'Cooling fans and their air filters are the most common maintenance item on VSDs. Blocked or dirty filters restrict airflow, causing the drive to overheat and trip on overtemperature. Filters should be cleaned or replaced every 6-12 months depending on the environment. Fan failure is also common and many drives will alarm before the fan stops completely.',
  },
  {
    id: 'capacitor-safety',
    question: 'How long should you wait after isolating a VSD before opening the enclosure?',
    options: [
      "At least 5 minutes (check manufacturer's data)",
      'No wait is needed once the supply is isolated',
      'Around 30 seconds for the capacitors to discharge',
      'Until the cooling fans have fully stopped',
    ],
    correctIndex: 0,
    explanation:
      'DC bus capacitors retain a lethal charge after isolation. Wait at least 5 minutes (or as specified by the manufacturer -- some larger drives require longer) and verify the DC bus voltage has discharged below 50 V using a multimeter before touching any internal components. This is a critical safety requirement.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What are the three main stages of a VSD?',
    options: [
      'Transformer, switch, motor',
      'Rectifier, DC bus, inverter',
      'Contactor, overload, isolator',
      'Filter, amplifier, output',
    ],
    correctAnswer: 1,
    explanation:
      'A VSD consists of a rectifier (AC to DC), DC bus (smoothing capacitors), and inverter (DC to variable-frequency AC using IGBTs and PWM).',
  },
  {
    id: 2,
    question: 'What switching devices are used in the VSD inverter stage?',
    options: ['Triacs', 'Thyristors', 'IGBTs', 'Diodes'],
    correctAnswer: 2,
    explanation:
      'IGBTs (Insulated Gate Bipolar Transistors) are used in the inverter stage, switching at high frequency (typically 2-16 kHz) to create the PWM output waveform.',
  },
  {
    id: 3,
    question: 'What is the approximate DC bus voltage for a 400 V VSD?',
    options: ['500 V DC', '400 V DC', '690 V DC', '565 V DC'],
    correctAnswer: 3,
    explanation:
      'The DC bus voltage is approximately 400 x 1.414 = 565 V DC (peak of the AC supply waveform, rectified and smoothed).',
  },
  {
    id: 4,
    question: 'What does V/f control maintain constant?',
    options: [
      'Voltage-to-frequency ratio',
      'Output current magnitude',
      'DC bus voltage level',
      'Inverter switching frequency',
    ],
    correctAnswer: 0,
    explanation:
      'V/f control maintains a constant voltage-to-frequency ratio (e.g., 8 V/Hz for 400 V/50 Hz) to keep the motor flux constant, providing approximately constant torque throughout the speed range up to base speed.',
  },
  {
    id: 5,
    question: 'What semiconductor devices do soft starters use?',
    options: [
      'Insulated gate bipolar transistors (IGBTs)',
      'Back-to-back thyristors (SCRs)',
      'Power diodes in a six-pulse bridge',
      'Power MOSFETs in parallel',
    ],
    correctAnswer: 1,
    explanation:
      'Soft starters use back-to-back thyristors on each phase, controlling the firing angle to vary the effective voltage during starting and stopping.',
  },
  {
    id: 6,
    question: 'What is the most common VSD maintenance item?',
    options: [
      'IGBT replacement',
      'Keypad cleaning',
      'Fan and filter maintenance',
      'Capacitor replacement',
    ],
    correctAnswer: 2,
    explanation:
      'Cooling fans and filters are the most common maintenance requirement. Blocked filters cause overheating and drive trips.',
  },
  {
    id: 7,
    question: 'How long must you wait before opening an isolated VSD?',
    options: ['No wait needed', '1 minute', '1 hour', 'At least 5 minutes'],
    correctAnswer: 3,
    explanation:
      "DC bus capacitors retain a lethal charge. Wait at least 5 minutes (check manufacturer's data) and verify the DC bus has discharged below 50 V before any work.",
  },
  {
    id: 8,
    question: 'What harmonics are predominantly generated by a VSD rectifier?',
    options: ['5th, 7th, 11th and 13th', 'None', '2nd and 4th', '3rd and 9th'],
    correctAnswer: 0,
    explanation:
      'The six-pulse diode rectifier produces predominantly 5th, 7th, 11th and 13th harmonics of the supply frequency.',
  },
  {
    id: 9,
    question: 'What UK standard sets harmonic emission limits for installations?',
    options: [
      'BS 7671 Appendix 4',
      'Engineering Recommendation G5/4-1',
      'BS EN 61000-3-2',
      'Engineering Recommendation P28',
    ],
    correctAnswer: 1,
    explanation:
      'Engineering Recommendation G5/4-1 (issued by the Energy Networks Association) sets limits on harmonic emissions from installations connected to the public supply network.',
  },
  {
    id: 10,
    question: 'What is the typical lifespan of DC bus electrolytic capacitors?',
    options: ['1-2 years', 'Indefinite', '5-10 years', '20-30 years'],
    correctAnswer: 2,
    explanation:
      'Electrolytic capacitors have a finite life of typically 5-10 years, depending on temperature and usage. Capacitor degradation causes DC bus voltage ripple and eventual drive failure.',
  },
  {
    id: 11,
    question: 'What type of motor cable is required for EMC compliance with VSD installations?',
    options: [
      'Standard twin and earth',
      'Any cable type',
      'Armoured cable only',
      'Screened (shielded) cable',
    ],
    correctAnswer: 3,
    explanation:
      'Screened motor cables with 360-degree screen termination at both ends are required for EMC compliance, preventing radiated electromagnetic interference from the high-frequency PWM output.',
  },
  {
    id: 12,
    question: 'What happens if you run a motor above base speed (above 50 Hz)?',
    options: [
      'Torque reduces (field weakening)',
      'Torque increases with the higher frequency',
      'Torque stays constant up to twice base speed',
      'The motor stalls and the drive trips',
    ],
    correctAnswer: 0,
    explanation:
      'Above base speed, the voltage cannot increase further (already at maximum), so the motor enters field weakening. The available torque reduces proportionally as frequency increases above the base value.',
  },
];

const faqs = [
  {
    question: 'What is the difference between a VSD and a soft starter?',
    answer:
      'A VSD controls both frequency and voltage, providing continuous variable speed operation throughout the speed range. A soft starter only controls voltage during starting and stopping -- once the motor is up to speed, the motor runs at full voltage and full speed (50 Hz). VSDs are used where variable speed is needed (pumps, fans, conveyors); soft starters are used where only reduced starting current and smooth acceleration are required.',
  },
  {
    question: 'Why do VSDs generate harmonics?',
    answer:
      'The rectifier stage draws non-sinusoidal current from the supply because the diode bridge only conducts during the peaks of the AC waveform. This creates current pulses rather than a smooth sine wave, producing harmonic components at 5th (250 Hz), 7th (350 Hz), 11th (550 Hz) and 13th (650 Hz) multiples of the 50 Hz supply frequency. Mitigation options include DC bus chokes, line reactors, passive filters and active front-end drives.',
  },
  {
    question: 'Can I run a VSD-fed motor faster than its rated speed?',
    answer:
      'Yes, by increasing the output frequency above 50 Hz. However, above base speed the voltage cannot increase further (it is already at maximum), so the motor enters field weakening and the available torque reduces. The motor bearings, rotor balance and mechanical components must also be suitable for the higher speed. Always check with the motor manufacturer before operating above rated speed.',
  },
  {
    question: 'Can I perform insulation resistance testing on a motor connected to a VSD?',
    answer:
      "Absolutely not. You must disconnect the motor cables from the VSD output terminals before performing any insulation resistance testing. The 500 V DC test voltage will damage the VSD's IGBT output stage, varistors, surge protection devices and other semiconductor components. Similarly, disconnect any electronic equipment connected to the motor circuit before testing.",
  },
  {
    question: 'What are the energy savings from using a VSD on a pump or fan?',
    answer:
      'Significant savings are possible because the power consumed by a centrifugal pump or fan follows the cube law -- power is proportional to the cube of the speed. Reducing the speed by 20% (from 50 Hz to 40 Hz) reduces power consumption by approximately 49%. Typical payback periods for VSD installations on pumps and fans are 1-3 years, making them one of the most cost-effective energy efficiency measures available.',
  },
];

const MOETModule3Section2_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 3 · Section 3.2 · Subsection 4"
        title="Variable Speed Drives and Soft Starters"
        backTo="/study-centre/apprentice/m-o-e-t-module3-section2"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            VSD/VFD architecture, V/f and vector control, soft starter operation, harmonics, EMC and
            maintenance.
          </p>

          <TLDR
            points={[
              'VSD: Rectifier - DC bus - Inverter (IGBTs + PWM).',
              'V/f control: Constant torque up to base speed (50 Hz).',
              'Soft starter: Thyristor voltage ramp, bypass at speed.',
              'Safety: DC bus holds lethal charge after isolation.',
            ]}
          />

          <ConceptBlock title="Why this matters">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Prevalence:</strong> VSDs standard in all modern buildings.
              </li>
              <li>
                <strong>Energy savings:</strong> 30-50% on fans and pumps via cube law.
              </li>
              <li>
                <strong>Maintenance:</strong> Fan/filter cleaning prevents 80% of trips.
              </li>
              <li>
                <strong>ST1426:</strong> Maps to electrical plant and motor control KSBs.
              </li>
            </ul>
          </ConceptBlock>

          <LearningOutcomes
            outcomes={[
              'Describe the internal architecture of a variable speed drive (rectifier, DC bus, inverter)',
              'Explain V/f control and sensorless vector control principles',
              'Describe soft starter operation using thyristor phase angle control',
              'Outline the commissioning and parameter setup process for VSDs',
              'Explain the effects of harmonics and EMC requirements for VSD installations',
              'Describe maintenance procedures including fan filters, capacitors and safety precautions',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Variable speed drive architecture</ContentEyebrow>

          <ConceptBlock title="Three power stages: rectifier, DC bus, inverter">
            <p>
              A variable speed drive (VSD), also called a variable frequency drive (VFD) or simply
              an inverter, controls the speed of an AC induction motor by varying both the frequency
              and voltage of the supply to the motor. Since motor speed is directly proportional to
              the supply frequency (Speed = 120f/P), controlling the frequency controls the speed.
            </p>
            <p>The VSD consists of three main power stages:</p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Rectifier (AC to DC):</strong> Converts the incoming three-phase AC supply
                (50 Hz, 400 V) to DC using a six-pulse diode bridge rectifier. The output is a
                pulsating DC voltage with a peak value of approximately 565 V (400 x 1.414). The
                rectifier is a passive component with no moving parts.
              </li>
              <li>
                <strong>DC Bus (Smoothing):</strong> Large electrolytic capacitors smooth the
                pulsating DC into a stable DC voltage. The DC bus also provides energy storage for
                dynamic braking and smooths out transient loads. The DC bus voltage is a key
                diagnostic parameter -- it should read approximately 565-580 V DC for a 400 V
                supply.
              </li>
              <li>
                <strong>Inverter (DC to AC):</strong> Uses six insulated gate bipolar transistors
                (IGBTs) switching at high frequency (typically 2-16 kHz) to synthesise a
                variable-frequency, variable-voltage AC output using pulse width modulation (PWM).
                The output waveform approximates a sine wave when averaged over time.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="V/f control">
            <p>
              V/f (voltage-to-frequency) control maintains a constant ratio of voltage to frequency
              to keep the motor magnetic flux constant. At 50 Hz and 400 V, the ratio is 8 V/Hz. At
              25 Hz, the voltage is reduced to 200 V to maintain the same ratio. This provides
              approximately constant torque throughout the speed range up to base speed (50 Hz).
            </p>
            <p>
              Above base speed, the voltage remains at maximum while frequency continues to
              increase, resulting in reduced torque -- this region is called field weakening. V/f
              control is suitable for simple applications such as fans, pumps and conveyors where
              precise speed regulation is not critical.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Sensorless vector control"
            onSite="Understanding the three-stage architecture is essential for VSD fault diagnosis. A DC bus voltage reading tells you whether the rectifier and supply are healthy. An output frequency reading tells you whether the inverter is responding to the speed reference. These are the first two diagnostic checks for any VSD fault."
          >
            <p>
              Sensorless vector control uses a mathematical model of the motor to independently
              control torque and flux without a shaft encoder. This provides better speed regulation
              (typically plus or minus 0.5% of set speed), improved low-speed torque (down to
              approximately 3% of base speed), faster dynamic response to load changes, and more
              precise speed control. Modern VSDs often offer both V/f and vector modes, selectable
              via configuration parameters.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Soft starter operation</ContentEyebrow>

          <ConceptBlock
            title="A controlled voltage ramp during motor starting"
            onSite="Soft starters are simpler and less expensive than VSDs. They are ideal for applications that need reduced starting current and smooth acceleration but do not require variable speed operation, such as pumps, fans, compressors and conveyors that run at a single speed."
          >
            <p>
              A soft starter provides a controlled voltage ramp during motor starting, reducing
              starting current and mechanical stress on the driven equipment. Unlike a VSD, a soft
              starter does not vary the frequency -- it only varies the voltage amplitude during
              starting and stopping. Once the motor is up to speed, the soft starter typically
              bypasses its power electronics using an internal contactor and connects the motor
              directly to the full supply voltage.
            </p>
            <p>
              Soft starters use back-to-back thyristors (SCRs) on each of the three phases. By
              controlling the firing angle of the thyristors, the effective voltage applied to the
              motor is varied from a low initial level to full supply voltage over an adjustable
              ramp time.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Starting Voltage (Initial Kick):</strong> Adjustable from approximately 30%
                to 80% of line voltage. Set high enough to overcome static friction and start the
                motor rotating.
              </li>
              <li>
                <strong>Ramp Time:</strong> Adjustable from 1 to 60 seconds. Determines the
                acceleration rate. Longer ramps give smoother starts but extend the starting period.
              </li>
              <li>
                <strong>Current Limit:</strong> Adjustable from 150% to 500% of FLC. Limits the
                maximum starting current regardless of ramp setting.
              </li>
              <li>
                <strong>Soft Stop:</strong> Provides a controlled deceleration ramp, useful for
                pumps to prevent water hammer (the pressure surge caused by sudden flow stoppage).
              </li>
            </ul>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Feature</th>
                    <th className="py-2 pr-4 font-medium text-white">VSD</th>
                    <th className="py-2 font-medium text-white">Soft Starter</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Speed control</td>
                    <td className="py-2 pr-4">Continuous variable speed</td>
                    <td className="py-2">Full speed only (after ramp)</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Control method</td>
                    <td className="py-2 pr-4">Frequency and voltage</td>
                    <td className="py-2">Voltage only (phase angle)</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Semiconductor</td>
                    <td className="py-2 pr-4">IGBTs in inverter</td>
                    <td className="py-2">Back-to-back thyristors</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Energy savings</td>
                    <td className="py-2 pr-4">Significant (cube law)</td>
                    <td className="py-2">Minimal (reduced start only)</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Cost</td>
                    <td className="py-2 pr-4">Higher</td>
                    <td className="py-2">Lower</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Commissioning and parameter setup</ContentEyebrow>

          <ConceptBlock
            title="Entering motor nameplate data and configuring the application"
            onSite="Always back up drive parameters to a laptop, USB drive or the manufacturer's commissioning software after commissioning. If the drive needs replacing, the parameters can be downloaded to the replacement unit, saving hours of recommissioning time."
          >
            <p>
              Commissioning a VSD requires entering the motor nameplate data and configuring the
              application parameters. Essential motor parameters include rated voltage, rated
              current, rated frequency, rated speed, rated power, and number of poles. Entering
              accurate data is critical for proper motor protection and control performance.
            </p>
            <p>
              Many modern VSDs include an auto-tune function that measures the motor's electrical
              parameters (stator resistance, inductance, back-EMF constant) by running a brief test
              sequence. This optimises the VSD's internal motor model for better performance,
              particularly in vector control mode.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Acceleration time:</strong> Typically 5-30 seconds depending on load
                inertia. Too fast causes overcurrent trips; too slow wastes energy.
              </li>
              <li>
                <strong>Deceleration time:</strong> Typically 5-30 seconds. Too fast causes
                overvoltage trips from regenerative energy feeding back to the DC bus.
              </li>
              <li>
                <strong>Minimum/maximum frequency:</strong> Sets the speed range (e.g., 15 Hz to 50
                Hz for a fan application to prevent operation below the motor's cooling threshold).
              </li>
              <li>
                <strong>Control mode:</strong> V/f for simple pump/fan loads; vector for precise
                speed control or applications needing high low-speed torque.
              </li>
              <li>
                <strong>I/O configuration:</strong> Digital and analogue inputs/outputs for
                start/stop signals, speed reference (0-10 V or 4-20 mA), feedback signals, and
                fault/status outputs.
              </li>
            </ul>
            <p className="text-[13.5px] font-medium text-white">Pre-commissioning checks:</p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Supply voltage:</strong> Confirm all three phases are present and within the
                VSD's rated range (typically plus or minus 10%)
              </li>
              <li>
                <strong>Motor insulation:</strong> Test insulation resistance with motor cables
                disconnected from VSD output
              </li>
              <li>
                <strong>Cable screening:</strong> Verify screened motor cable with 360-degree
                termination at both ends
              </li>
              <li>
                <strong>Earth connections:</strong> Confirm motor earth, VSD earth and cable screen
                earth are correctly connected
              </li>
              <li>
                <strong>Motor rotation:</strong> Run briefly at low speed to confirm correct
                rotation direction before full commissioning
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Harmonics and EMC compliance</ContentEyebrow>

          <ConceptBlock
            title="Harmonic currents flowing back into the supply network"
            onSite="EMC compliance is not optional. Failure to follow the manufacturer's EMC installation guidelines can cause widespread interference affecting not just the VSD circuit but the entire installation and even neighbouring premises."
          >
            <p>
              VSDs generate harmonic currents that flow back into the supply network. The rectifier
              stage draws non-sinusoidal current, producing predominantly 5th (250 Hz), 7th (350
              Hz), 11th (550 Hz) and 13th (650 Hz) harmonics. These harmonics can cause overheating
              of transformers and neutral conductors, nuisance tripping of protective devices,
              interference with sensitive electronic equipment, and increased losses in the
              distribution system.
            </p>
            <p>
              Engineering Recommendation G5/4-1 sets limits on the harmonic emissions from
              installations connected to the public supply network. Mitigation measures include:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>DC bus chokes:</strong> Reduce harmonic current by 30-40%. Fitted inside the
                drive or as an external option.
              </li>
              <li>
                <strong>Line reactors:</strong> 3-5% impedance reactors, typically fitted to drives
                above 30 kW.
              </li>
              <li>
                <strong>Passive harmonic filters:</strong> Tuned LC filters targeting specific
                harmonic frequencies.
              </li>
              <li>
                <strong>Active front-end drives:</strong> Use an active rectifier (IGBT-based)
                instead of diodes to draw near-sinusoidal current. Most effective but most expensive
                option.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="EMC installation requirements">
            <p>
              EMC (electromagnetic compatibility) requirements under the EMC Directive 2014/30/EU
              mean that VSD installations must not cause electromagnetic interference with other
              equipment. This requires:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Screened motor cables with 360-degree cable gland termination at both ends</li>
              <li>Correct segregation of power and signal cables (minimum 300 mm separation)</li>
              <li>Input EMC filter on the VSD supply</li>
              <li>Output choke or du/dt filter for long motor cable runs</li>
              <li>Compliance with the VSD manufacturer's EMC installation guidelines</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Poor EMC practice in VSD installations"
            whatHappens={
              <>
                One of the most common causes of intermittent control system faults. PLC analogue
                inputs reading erratically, communication bus dropouts, nuisance RCD tripping and
                temperature transmitter fluctuations are all symptoms of inadequate EMC measures.
              </>
            }
            doInstead={
              <>
                When replacing a VSD or modifying a panel containing VSDs, always reinstall EMC
                filters and maintain cable screening.
              </>
            }
          />

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Maintenance and safety</ContentEyebrow>

          <ConceptBlock title="DC bus capacitors retain a lethal charge after isolation">
            <p>
              DC bus capacitors retain a lethal charge after the drive is isolated from the supply.
              Allow at least 5 minutes (check manufacturer's data -- some larger drives require
              longer) before opening the drive enclosure. Verify the DC bus voltage has discharged
              to below 50 V using a multimeter rated for the voltage before touching any internal
              components. Never perform insulation resistance testing on a motor while it is
              connected to a VSD -- the 500 V DC test voltage will destroy the IGBT output stage.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Preventive maintenance schedule">
            <ul className="list-disc space-y-2 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cooling fans:</strong> Internal fans are the most common failure point.
                Check fans are running during every visit. Clean or replace air filters every 6-12
                months depending on the environment. Blocked filters are the number one cause of VSD
                overtemperature trips.
              </li>
              <li>
                <strong>DC bus capacitors:</strong> Electrolytic capacitors have a finite life
                (typically 5-10 years). Capacitor degradation causes DC bus voltage ripple, reduced
                ride-through capability, and eventual drive failure. Some drives monitor capacitor
                health and provide early warnings.
              </li>
              <li>
                <strong>Firmware updates:</strong> Manufacturers periodically release firmware
                updates to fix bugs and add features. Update during planned maintenance windows
                following the manufacturer's documented procedure.
              </li>
              <li>
                <strong>Parameter backup:</strong> Always back up drive parameters to a laptop, USB
                drive or the manufacturer's commissioning software before any maintenance. If the
                drive needs replacing, the parameters can be downloaded to the replacement unit.
              </li>
              <li>
                <strong>Thermal imaging:</strong> Check power connections for hot spots during
                routine thermographic surveys. High-frequency PWM output cables are particularly
                prone to heating at poor connections or where screen terminations are inadequate.
              </li>
              <li>
                <strong>Connection checks:</strong> Torque-check all power connections annually.
                Vibration from the drive's cooling fan and thermal cycling can loosen connections
                over time.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Common VSD fault codes and replacement procedure">
            <p className="text-[13.5px] font-medium text-white">Common VSD fault codes:</p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Overcurrent:</strong> Acceleration too fast, motor fault, short circuit
              </li>
              <li>
                <strong>Overvoltage:</strong> Deceleration too fast, regenerative energy
              </li>
              <li>
                <strong>Overtemperature:</strong> Blocked filters, failed fan, high ambient
              </li>
              <li>
                <strong>Earth fault:</strong> Motor insulation failure, cable damage
              </li>
            </ul>
            <p className="text-[13.5px] font-medium text-white">Replacement procedure:</p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Download parameters from failed drive (if possible)</li>
              <li>Isolate, lock off, prove dead, wait for DC bus discharge</li>
              <li>Install replacement with identical rating and firmware</li>
              <li>Upload saved parameters or recommission from scratch</li>
            </ul>
            <p>
              Under ST1426, maintenance technicians are expected to understand VSD and soft starter
              operation, carry out preventive maintenance, interpret fault codes, and perform basic
              commissioning. These are core competence requirements for the electrical maintenance
              pathway.
            </p>
          </ConceptBlock>

          <SectionRule />

          <VideoCard
            url="https://www.youtube.com/watch?v=yEPe7RDtkgo"

            title="Variable Frequency Drives Explained — VFD Basics"

            channel="The Engineering Mindset"

            duration="15:17"

            topic="Rectifier, DC bus and inverter — how a drive makes a variable frequency"

            caption="Builds the drive up stage by stage, which makes the 565 V DC bus figure and the carrier frequency settings on this page make sense."
          />

          <SectionRule />

          <Scenario
            title="A drive that trips on overcurrent only when the plant is busy"

            situation={
              <>
                <p>
                  A VSD on a mixer trips on overcurrent two or three times a week, always during the
                  afternoon shift, never overnight. The motor and mechanical drive check out fine.
                  Resetting clears it and the mixer runs normally.
                </p>

                <p>
                  The drive is in a panel alongside four others in a plant room with no forced
                  ventilation.
                </p>
              </>
            }

            whatToDo={
              <>
                <p>
                  Before touching the drive parameters, read its own fault log. Most drives record
                  the conditions at trip — output current, DC bus voltage, heatsink temperature —
                  and that turns a guess into a measurement.
                </p>

                <p>
                  Check the correlation you have already been given. Afternoons and not nights
                  points at ambient temperature or at a load that only occurs on certain production.
                  Both are testable.
                </p>

                <p>
                  Check the heatsink temperature and the panel ambient under load. A drive derates
                  above its rated ambient, and a panel with blocked filters or a failed fan can be
                  15 °C above the room. A drive that is fine at 25 °C can trip at 45 °C on the same
                  load.
                </p>

                <p>
                  Only increase the current limit or extend the trip time as a last resort, and
                  never without knowing why it is tripping. Both change what the drive will tolerate
                  rather than what the plant is doing.
                </p>
              </>
            }

            whyItMatters={
              <p>
                Raising a trip setting to stop a nuisance trip is the single most common way a
                protective device gets defeated. In this case the drive is doing exactly what it is
                designed to do — protecting itself from a thermal condition someone else created by
                blocking a filter. The clue was in the pattern from the start, and the fault log had
                the evidence; the temptation is always to treat the symptom on the drive rather than
                the cause in the panel.
              </p>
            }
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'VSD architecture: rectifier = diode bridge (AC to DC), DC bus = capacitors (565 V DC for a 400 V supply), inverter = IGBTs + PWM (DC to variable AC).',
              'V/f control gives constant torque up to base speed; vector control gives precise speed and torque control; switching frequency is typically 2-16 kHz.',
              'DC bus holds a lethal voltage after isolation -- wait 5+ minutes and verify below 50 V. Always disconnect the motor before insulation resistance testing.',
              'Fan/filter maintenance every 6-12 months; capacitor life is typically 5-10 years. Use screened motor cable with 360-degree termination.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module3-section2-3')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Prev subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Star-Delta Starters
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module3-section2-5')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Motor Maintenance
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule3Section2_4;
