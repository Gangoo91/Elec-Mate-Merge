/**
 * MOET · Module 5 · Section 2 · Subsection 2 — Input/Output Devices
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option.
 *
 * KSBs covered, quoted rather than numbered: the IfATE/Skills England API
 * publishes these statements without their K/S/B codes, and the published
 * numbering has not been verified against a primary source — so do not invent
 * codes here. The conversion brief for this course did not enumerate a
 * Module 5 KSB list, so the statements below are reused verbatim from the
 * Module 1/3/4 lists it did supply, matched by topic.
 *   Knowledge  · "Electrical. Types of diagrams used to represent circuits;
 *                 symbols and abbreviations used to represent components in
 *                 electrical schematics."
 *              · "Electrical. Electrical fault-finding and rectification
 *                 techniques; diagnostic equipment."
 *   Skills     · "Electrical. Use electrical diagnostic equipment and apply
 *                 fault finding and rectification techniques."
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt.
 *
 * No GS38, thermography ΔT, test-interval or C&G-qualification claims appear
 * on this page.
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

const TITLE = 'Input/Output Devices - MOET Module 5 Section 2.2';
const DESCRIPTION =
  'Comprehensive guide to PLC input and output devices for electrical maintenance technicians: digital and analogue I/O modules, wiring methods, signal conditioning, sink/source configurations and fault diagnosis. ST1426 aligned.';

const quickCheckQuestions = [
  {
    id: 'io-digital-vs-analogue',
    question: 'What is the key difference between a digital input and an analogue input on a PLC?',
    options: [
      'A digital input handles AC signals while an analogue input handles only DC signals',
      'A digital input reads only ON or OFF states; an analogue input reads a continuously variable signal',
      'A digital input is always faster to scan because it uses fewer wires than an analogue input',
      'A digital input requires opto-isolation while an analogue input never needs any isolation',
    ],
    correctIndex: 1,
    explanation:
      'A digital (discrete) input recognises only two states — ON (1) or OFF (0), typically detecting switch contacts, proximity sensors or push buttons. An analogue input reads a continuously variable signal (e.g., 0-10 V or 4-20 mA) representing a measured value such as temperature, pressure or flow.',
  },
  {
    id: 'io-4-20ma',
    question:
      'Why is the 4-20 mA current loop preferred over 0-10 V for industrial analogue signals?',
    options: [
      'Current loops can carry far higher signal voltages than a 0-10 V system',
      'A 4-20 mA loop needs no power supply, whereas 0-10 V always requires one',
      'Current signals respond faster than voltage signals at the analogue-to-digital converter',
      'Current signals are less affected by cable resistance and electrical noise over long distances',
    ],
    correctIndex: 3,
    explanation:
      'A current loop signal (4-20 mA) is preferred in industrial environments because the current remains constant regardless of cable length and resistance (within limits). Additionally, the live zero at 4 mA allows the system to distinguish between a genuine 0% signal and a broken wire (which would read 0 mA), providing built-in fault detection.',
  },
  {
    id: 'io-sink-source',
    question: "In a PLC digital input circuit, what does 'sourcing' mean?",
    options: [
      'The input module requires an external relay to operate',
      'The input module receives (sinks) current from the field device',
      'The input module provides (sources) current to the field device',
      'The input module generates its own signal independently of the field device',
    ],
    correctIndex: 2,
    explanation:
      'In a sourcing configuration, the PLC I/O module provides current to the field device. In a sinking configuration, the PLC receives current from the field device. The choice between sink and source depends on the sensor type and the regional wiring convention. European practice often uses sourcing inputs (PNP sensors), while some legacy systems use sinking inputs (NPN sensors).',
  },
  {
    id: 'io-isolation',
    question: 'What is the purpose of optical isolation (opto-coupling) in PLC I/O modules?',
    options: [
      'To electrically separate the field wiring from the PLC internal circuitry, protecting against voltage spikes',
      'To increase the maximum current the input module can switch to the field device',
      'To convert a 24 V DC field signal directly into a 4-20 mA analogue output',
      'To boost weak field signals so they reach the analogue-to-digital converter range',
    ],
    correctIndex: 0,
    explanation:
      'Optical isolation uses an LED and phototransistor to transfer the signal across an air gap, providing complete electrical separation between the field wiring and the PLC backplane. This protects the CPU and other modules from voltage transients, ground loops and electrical noise that are common in industrial environments.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'A digital input module on a PLC typically operates at which voltage level?',
    options: [
      '5 V DC only, matching the PLC processor logic level',
      '24 V DC or 110/240 V AC depending on the module type',
      '400 V AC three-phase taken directly from the supply',
      'A continuously variable 0-10 V signal from the field device',
    ],
    correctAnswer: 1,
    explanation:
      'Digital input modules are available in various voltage ratings. The most common for industrial use is 24 V DC. AC versions at 110 V or 240 V are also available for interfacing with older equipment. The module specification must match the field device voltage.',
  },
  {
    id: 2,
    question: 'What does a 4 mA reading on a 4-20 mA analogue input represent?',
    options: [
      'The sensor is disconnected',
      'A fault condition',
      'The minimum measured value (0%)',
      'The maximum measured value (100%)',
    ],
    correctAnswer: 2,
    explanation:
      "In a 4-20 mA loop, 4 mA represents 0% of the measured range and 20 mA represents 100%. The 'live zero' at 4 mA is a key advantage — if the signal drops to 0 mA, the system knows the wire is broken or the transmitter has failed, rather than reading a false zero.",
  },
  {
    id: 3,
    question:
      'Which type of output module would be most suitable for controlling a 3-phase motor contactor?',
    options: [
      'High-speed counter module',
      'Analogue output module (4-20 mA)',
      'Thermocouple input module',
      'Digital relay output module',
    ],
    correctAnswer: 3,
    explanation:
      'A motor contactor coil is a simple ON/OFF device, requiring a digital output. A relay output module is ideal because it provides electrical isolation and can switch the AC voltage required by the contactor coil. Relay outputs are also suitable for higher-current loads compared to transistor outputs.',
  },
  {
    id: 4,
    question: 'What is the resolution of a 12-bit analogue input module?',
    options: ['4096 steps', '1024 steps', '256 steps', '65536 steps'],
    correctAnswer: 0,
    explanation:
      'A 12-bit analogue-to-digital converter provides 2^12 = 4096 discrete steps across the input range. For a 0-10 V input, this gives a resolution of approximately 2.4 mV per step. Higher resolution (16-bit = 65536 steps) is available for applications requiring greater precision.',
  },
  {
    id: 5,
    question:
      'When wiring a PNP (sourcing) proximity sensor to a PLC digital input, the sensor output connects to:',
    options: [
      'The 0 V common rail, with the sensor sinking current from the supply',
      'The PLC input terminal, with the sensor sourcing current into the input',
      'The +24 V supply rail directly, bypassing the input terminal',
      'A separate analogue input channel rather than a digital input',
    ],
    correctAnswer: 1,
    explanation:
      'A PNP sensor is a sourcing device — when activated, it connects its output to the positive supply (+24 V), sourcing current into the PLC input. The PLC input module sinks this current to the common (0 V) rail. This is the standard configuration for European industrial wiring.',
  },
  {
    id: 6,
    question: "What causes 'signal aliasing' on a PLC analogue input?",
    options: [
      'Using a screened cable with the screen earthed at both ends',
      'Connecting a 4-20 mA transmitter to a 0-10 V voltage input',
      'Sampling the analogue signal at a rate lower than twice the signal frequency',
      'Setting the input filter time constant too high for the process',
    ],
    correctAnswer: 2,
    explanation:
      'Aliasing occurs when the sampling rate of the analogue-to-digital converter is less than twice the frequency of the input signal (Nyquist theorem). This produces false readings. In practice, input filters and adequate scan rates prevent aliasing in most industrial applications.',
  },
  {
    id: 7,
    question:
      'A transistor (solid-state) output module differs from a relay output module in that it:',
    options: [
      'Switches both AC and DC loads but wears out its contacts more quickly',
      'Provides higher current per point and full galvanic isolation by default',
      'Can only switch AC loads and is unsuitable for any DC field device',
      'Switches faster, has no mechanical wear, but can only switch DC loads (for NPN/PNP types)',
    ],
    correctAnswer: 3,
    explanation:
      'Transistor outputs (NPN or PNP) switch much faster than relays (microseconds vs milliseconds) and have no moving parts, so there is no mechanical wear. However, standard transistor outputs can only switch DC loads. For AC loads, triac outputs or relay outputs are required.',
  },
  {
    id: 8,
    question:
      "What is the purpose of a 'surge suppressor' across a PLC relay output controlling an inductive load?",
    options: [
      'To suppress the voltage spike (back-EMF) generated when the inductive load is de-energised',
      'To increase the current rating of the relay contacts for heavier loads',
      'To convert the relay output into a current-limited analogue signal',
      'To speed up the relay switching time to match a transistor output',
    ],
    correctAnswer: 0,
    explanation:
      'Inductive loads (contactors, solenoid valves, relay coils) generate a high-voltage back-EMF spike when de-energised. Without suppression, this spike can damage the relay contacts and cause electrical noise. A suitable suppressor (RC snubber for AC, flyback diode for DC) clamps the spike to a safe level.',
  },
  {
    id: 9,
    question: "In a PLC system, the term 'I/O addressing' refers to:",
    options: [
      'The physical position of a module within the PLC rack or backplane',
      'The unique software address assigned to each input and output point for use in the program',
      'The network IP address used to connect the PLC to a supervisory system',
      'The order in which the PLC scans inputs and updates outputs each cycle',
    ],
    correctAnswer: 1,
    explanation:
      'Every physical input and output point on a PLC is assigned a unique software address (e.g., I0.0 for input 0 on module 0, Q2.3 for output 3 on module 2). The program uses these addresses to read inputs and control outputs. The addressing scheme varies between PLC manufacturers.',
  },
  {
    id: 10,
    question: 'What is the typical current rating per point of a PLC digital output relay module?',
    options: ['10 mA', '100 mA', '2 A', '30 A'],
    correctAnswer: 2,
    explanation:
      'Most PLC relay output modules are rated at approximately 2 A per point for resistive loads. For inductive loads the rating is typically lower (0.5-1 A). Loads requiring higher currents must be switched via an interposing relay or contactor controlled by the PLC output.',
  },
  {
    id: 11,
    question: 'When commissioning a new PLC analogue input, the first check should be:',
    options: [
      'Forcing the input to 100% in the program to confirm the load operates',
      'Disabling opto-isolation to obtain a faster signal response',
      'Setting the scaling factor before any wiring or module checks are made',
      'Verifying the correct module type is installed and the input range matches the field transmitter output',
    ],
    correctAnswer: 3,
    explanation:
      'Before any wiring, confirm the analogue input module matches the transmitter signal type (4-20 mA, 0-10 V, thermocouple type, RTD type). A mismatch will produce incorrect readings or could damage the module or transmitter. Check the module configuration in the PLC hardware setup software.',
  },
  {
    id: 12,
    question:
      'Under ST1426, a maintenance technician working with PLC I/O devices must be able to:',
    options: [
      'Identify, test and replace faulty I/O modules and verify correct operation',
      'Write the complete control program from scratch without reference material',
      'Redesign the PLC hardware architecture to add new processor modules',
      'Approve the installation design and issue the electrical certification',
    ],
    correctAnswer: 0,
    explanation:
      'The ST1426 standard requires maintenance technicians to identify faults, carry out replacements and verify correct operation of control system components including PLC I/O modules. While programming knowledge is beneficial, the primary maintenance role focuses on hardware diagnosis, replacement and functional verification.',
  },
];

const faqs = [
  {
    question: 'How do I test a suspect digital input on a PLC?',
    answer:
      'First, check the input status LED on the module — it should illuminate when the field device is activated. If the LED is off, check the field wiring and sensor with a multimeter. If the LED is on but the program does not respond, check the input address in the PLC software using the monitoring/online mode. A forced input test (with appropriate safety precautions) can verify the program logic independently of the field device.',
  },
  {
    question: 'What is the difference between single-ended and differential analogue inputs?',
    answer:
      'A single-ended input measures voltage between the signal wire and a common ground shared with other channels. A differential input measures the voltage between two dedicated signal wires (+ and -), rejecting common-mode noise. Differential inputs are preferred for long cable runs or electrically noisy environments as they provide much better noise rejection.',
  },
  {
    question: 'Can I hot-swap a PLC I/O module (replace it with power on)?',
    answer:
      "This depends on the PLC manufacturer and model. Some modern PLCs support hot-swapping of I/O modules on remote racks, but many do not. Always consult the manufacturer's documentation. If hot-swapping is not supported, the PLC must be powered down or placed in STOP mode, and a risk assessment must be carried out before removing any module.",
  },
  {
    question: "Why do some analogue inputs require 'scaling' in the PLC program?",
    answer:
      'The raw value from the analogue-to-digital converter is a number (e.g., 0-4095 for 12-bit). Scaling converts this raw count into engineering units (e.g., 0-100 degrees C, 0-10 bar). Without scaling, the program would have to work with meaningless raw numbers, making the logic difficult to understand and maintain.',
  },
  {
    question: 'What cable type should I use for 4-20 mA analogue signals?',
    answer:
      'Use twisted-pair, screened (shielded) cable for all analogue signals. The twisted pair reduces magnetic interference and the screen rejects electrostatic noise. The screen should be earthed at one end only (usually the PLC end) to avoid ground loops. Keep analogue cables physically separated from power cables and variable-speed drive outputs.',
  },
];

const MOETModule5Section2_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 5 · Section 5.2 · Subsection 2"
        title="Input/Output Devices"
        backTo="/study-centre/apprentice/m-o-e-t-module5-section2"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Digital and analogue I/O modules, wiring methods and interfacing for PLC systems — what
            connects the field to the program, and how to fault-find it.
          </p>

          <TLDR
            points={[
              'Digital I/O: ON/OFF signals — switches, sensors, contactors.',
              'Analogue I/O: Variable signals — 4-20 mA, 0-10 V, thermocouples.',
              'Sink/Source: Current direction convention for wiring sensors.',
              'Isolation: Opto-couplers protect PLC from field transients.',
            ]}
          />

          <Prerequisites
            items={[
              {
                term: 'PLC hardware and architecture',

                gist: 'The scan cycle, I/O modules and where the program lives. Most PLC timing behaviour follows from the scan.',

                where: '5.2.1',
              },

              {
                term: 'Temperature and pressure sensors',

                gist: 'Thermocouples, RTDs and pressure transmitters — what each measures and the signal it produces.',

                where: '5.1.3',
              },
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Distinguish between digital and analogue I/O modules and their applications',
              'Explain sink and source wiring configurations for PNP and NPN sensors',
              'Describe the 4-20 mA current loop and its advantages over voltage signalling',
              'Identify the role of optical isolation in protecting PLC circuitry',
              'Select appropriate output types (relay, transistor, triac) for different loads',
              'Apply fault-finding techniques to diagnose I/O module problems',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="Maintenance context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Fault finding:</strong> Check LED status, measure field signals.
              </li>
              <li>
                <strong>Replacement:</strong> Match module type, address and configuration.
              </li>
              <li>
                <strong>Commissioning:</strong> Verify scaling, range and signal integrity.
              </li>
              <li>
                <strong>ST1426:</strong> I/O diagnosis is a core maintenance competency.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>Digital inputs and outputs</ContentEyebrow>

          <ConceptBlock title="The most common type of I/O in any PLC system">
            <p>
              Digital (discrete) I/O is the most common type in any PLC system. A digital input
              reads a simple ON or OFF state from a field device, while a digital output switches a
              load ON or OFF. Despite their simplicity, correct wiring and configuration of digital
              I/O is critical for safe and reliable operation.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Common digital input devices">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Push buttons:</strong> Start, stop, acknowledge — momentary or maintained
                contact.
              </li>
              <li>
                <strong>Limit switches:</strong> Detect mechanical position of machine components.
              </li>
              <li>
                <strong>Proximity sensors:</strong> Inductive (metal), capacitive (non-metal),
                photoelectric (beam).
              </li>
              <li>
                <strong>Pressure switches:</strong> Detect threshold pressure in pneumatic or
                hydraulic systems.
              </li>
              <li>
                <strong>Level switches:</strong> Float switches, conductivity probes for tank
                levels.
              </li>
              <li>
                <strong>Safety devices:</strong> E-stops, guard switches, light curtains (to safety
                relay/PLC).
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Common digital output devices">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Contactors:</strong> Switching motors, heaters and other high-power loads.
              </li>
              <li>
                <strong>Solenoid valves:</strong> Pneumatic and hydraulic directional control.
              </li>
              <li>
                <strong>Indicator lamps:</strong> Status indication on control panels.
              </li>
              <li>
                <strong>Audible alarms:</strong> Sirens, horns and buzzers.
              </li>
              <li>
                <strong>Interposing relays:</strong> Switching loads beyond the module current
                rating.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Digital output module types">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Output type</th>
                    <th className="py-2 pr-4 font-medium text-white">Load type</th>
                    <th className="py-2 pr-4 font-medium text-white">Switching speed</th>
                    <th className="py-2 font-medium text-white">Typical rating</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Relay</td>
                    <td className="py-2 pr-4">AC or DC</td>
                    <td className="py-2 pr-4">~10 ms</td>
                    <td className="py-2">2 A per point</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Transistor (PNP/NPN)</td>
                    <td className="py-2 pr-4">DC only</td>
                    <td className="py-2 pr-4">~1 ms</td>
                    <td className="py-2">0.5 A per point</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Triac</td>
                    <td className="py-2 pr-4">AC only</td>
                    <td className="py-2 pr-4">~1 ms</td>
                    <td className="py-2">1 A per point</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Analogue inputs and outputs</ContentEyebrow>

          <ConceptBlock title="Interfacing with continuously variable process signals">
            <p>
              Analogue I/O allows the PLC to interface with continuously variable process signals.
              Analogue inputs convert real-world measurements (temperature, pressure, flow, level)
              into digital values the PLC can process. Analogue outputs convert PLC digital values
              back into variable signals to control devices such as variable-speed drives, control
              valves and chart recorders.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Common analogue signal types">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>4-20 mA:</strong> Industry standard current loop; live zero at 4 mA provides
                wire-break detection.
              </li>
              <li>
                <strong>0-10 V DC:</strong> Voltage signal; simpler wiring but more susceptible to
                cable losses.
              </li>
              <li>
                <strong>0-20 mA:</strong> Current loop without live zero; less common in new
                installations.
              </li>
              <li>
                <strong>Thermocouple:</strong> Millivolt signal from temperature-dependent junction;
                requires specialised input.
              </li>
              <li>
                <strong>RTD (Pt100/Pt1000):</strong> Resistance change with temperature; requires
                excitation current from module.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Live zero: the 4 mA advantage">
            <p>
              The 4-20 mA standard uses 4 mA to represent 0% and 20 mA to represent 100% of the
              measured range. This &apos;live zero&apos; is a critical safety feature: if the signal
              drops below 4 mA (typically below 3.6 mA), the PLC can detect a fault condition — a
              broken wire, failed transmitter or disconnected sensor. A 0-20 mA or 0-10 V signal
              cannot distinguish between a genuine zero reading and a fault.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Analogue input specifications">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Resolution:</strong> Number of bits in the ADC — 12-bit (4096 steps), 16-bit
                (65536 steps).
              </li>
              <li>
                <strong>Accuracy:</strong> How close the reading is to the true value, expressed as
                percentage of span.
              </li>
              <li>
                <strong>Conversion time:</strong> Time to convert one analogue sample to digital —
                affects scan time.
              </li>
              <li>
                <strong>Input impedance:</strong> Must be appropriate for the signal type (high for
                voltage, low for current).
              </li>
              <li>
                <strong>Common mode rejection:</strong> Ability to reject noise common to both input
                wires.
              </li>
            </ul>
            <p>
              <strong>Scaling example:</strong> A pressure transmitter outputs 4-20 mA for 0-10 bar.
              On a 12-bit input (0-4095 raw counts), 4 mA = 819 counts and 20 mA = 4095 counts. The
              PLC program scales this: Pressure = (Raw - 819) x 10 / (4095 - 819) bar.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Sink and source wiring configurations</ContentEyebrow>

          <ConceptBlock title="The direction of current flow decides sensor compatibility">
            <p>
              Understanding sink and source wiring is essential for correctly connecting sensors and
              actuators to PLC I/O modules. The terms describe the direction of current flow
              relative to the I/O module and determine which type of sensor (PNP or NPN) is
              compatible.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Sourcing (PNP) configuration">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>PNP sensor provides current to the PLC input.</li>
              <li>Current flows from +24 V through the sensor to the PLC input.</li>
              <li>PLC input module sinks current to the 0 V rail.</li>
              <li>European standard practice for new installations.</li>
              <li>Wire colours: brown (+24 V), blue (0 V), black (signal).</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Sinking (NPN) configuration">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>NPN sensor sinks current from the PLC input to 0 V.</li>
              <li>Current flows from the PLC input through the sensor to 0 V.</li>
              <li>PLC input module sources current from the +24 V supply.</li>
              <li>Common in Asian and some legacy installations.</li>
              <li>Requires sourcing-type input module.</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Connecting the wrong sensor type to the wrong input module"
            whatHappens={
              <>
                Connecting a PNP sensor to an NPN (sourcing) input module — or vice versa — will
                result in the input not functioning or, worse, damage to the sensor or module.
              </>
            }
            doInstead={
              <>
                Always check the sensor data sheet and the I/O module specification to confirm
                compatibility before wiring. Many modern PLC input modules are configurable for
                either sink or source operation.
              </>
            }
          />

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Optical isolation and signal conditioning</ContentEyebrow>

          <ConceptBlock title="Defending the PLC from harsh electrical conditions">
            <p>
              Industrial environments subject PLC I/O to harsh electrical conditions: voltage
              transients from motor switching, electromagnetic interference from variable-speed
              drives, and ground potential differences between field devices and the PLC rack.
              Optical isolation and signal conditioning are the primary defences against these
              hazards.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Optical isolation (opto-coupling)">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>How it works:</strong> An LED inside the module converts the electrical
                input signal to light; a phototransistor on the other side converts it back to an
                electrical signal for the PLC backplane.
              </li>
              <li>
                <strong>Isolation voltage:</strong> Typically 1500-2500 V AC between field side and
                backplane.
              </li>
              <li>
                <strong>Protection:</strong> Prevents voltage spikes, ground loops and noise on
                field wiring from reaching the CPU.
              </li>
              <li>
                <strong>Present in:</strong> Virtually all modern digital I/O modules as standard.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Signal conditioning for analogue inputs">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Filtering:</strong> Low-pass filters remove high-frequency noise from the
                analogue signal.
              </li>
              <li>
                <strong>Amplification:</strong> Weak signals (millivolt thermocouples) are amplified
                to the ADC input range.
              </li>
              <li>
                <strong>Linearisation:</strong> Non-linear sensor outputs (e.g., thermocouples) are
                corrected to produce a linear reading.
              </li>
              <li>
                <strong>Cold junction compensation:</strong> Thermocouple modules compensate for the
                reference junction temperature.
              </li>
              <li>
                <strong>Excitation:</strong> RTD modules provide a constant excitation current and
                measure the resulting voltage.
              </li>
            </ul>
            <p>
              <strong>Maintenance tip:</strong> When replacing an analogue input module, always
              check that the module configuration (signal type, range, filtering) matches the
              original. Incorrect configuration can produce wildly inaccurate readings without any
              obvious fault indication on the module LEDs.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>I/O fault diagnosis and maintenance</ContentEyebrow>

          <ConceptBlock title="A systematic approach finds the fault fast">
            <p>
              Diagnosing I/O faults is one of the most frequent tasks for a maintenance technician
              working with PLC systems. A systematic approach — working from the field device
              through the wiring to the module and into the PLC program — will identify the fault
              location efficiently.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Systematic I/O fault-finding">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Step 1 — LED check:</strong> Observe the module status LEDs. Input LED on =
                signal present at module.
              </li>
              <li>
                <strong>Step 2 — Software check:</strong> Monitor the I/O address online. Does the
                PLC see the signal?
              </li>
              <li>
                <strong>Step 3 — Field measurement:</strong> Use a multimeter to verify the signal
                at the module terminals.
              </li>
              <li>
                <strong>Step 4 — Wiring check:</strong> Trace the signal from the field device to
                the module terminals.
              </li>
              <li>
                <strong>Step 5 — Device check:</strong> Test or substitute the field device to
                confirm it is functioning.
              </li>
              <li>
                <strong>Step 6 — Module check:</strong> Swap the suspect module with a known good
                spare (same type).
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Common input faults">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Broken wire to field device.</li>
              <li>Failed sensor or switch.</li>
              <li>Loose terminal connection.</li>
              <li>Incorrect wiring (sink/source mismatch).</li>
              <li>Failed input channel on module.</li>
              <li>Fuse blown on input group.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Common output faults">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Welded relay contacts (stuck ON).</li>
              <li>Worn relay contacts (intermittent).</li>
              <li>Blown output fuse.</li>
              <li>Failed load device (e.g. coil open-circuit).</li>
              <li>Short circuit on output wiring.</li>
              <li>Transistor output destroyed by over-current.</li>
            </ul>
            <p className="italic">
              Under ST1426, maintenance technicians must demonstrate the ability to systematically
              diagnose faults in control systems. Always record your findings and the corrective
              action taken in the maintenance log. This supports both continuous improvement and
              compliance with quality management systems.
            </p>
          </ConceptBlock>

          <SectionRule />

          <VideoCard
            url="https://www.youtube.com/watch?v=n594CkrP6xE"

            title="How Relays Work"

            channel="The Engineering Mindset"

            duration="14:01"

            topic="The relay as the bridge between a control signal and a load"

            caption="Worth watching before the I/O page — a PLC output card is doing electrically what this relay does mechanically."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Analogue signal ranges: 4-20 mA (standard current loop, live zero); 0-10 V DC (common voltage signal); Pt100 RTD 100 ohms at 0 degrees C; Type K thermocouple -200 to +1372 degrees C; 12-bit ADC = 4096 steps.',
              'I/O fault-finding steps: check module status LEDs, monitor the address in PLC software, measure the signal at the terminals, trace and test field wiring, test or substitute the field device.',
              'Digital I/O reads or switches ON/OFF states; analogue I/O reads or produces a continuously variable signal — the distinction drives wiring, testing and what a fault looks like.',
              'Relay outputs switch AC or DC at around 2 A but take ~10 ms; transistor outputs are DC-only, faster (~1 ms) and wear-free; triac outputs are AC-only.',
              'PNP (sourcing) sensors are the European standard, sinking current into the PLC input to 0 V; NPN (sinking) sensors need a sourcing input module — mismatching the two stops the input working or damages it.',
              'Optical isolation gives 1500-2500 V AC separation between field wiring and the PLC backplane, protecting the CPU from voltage spikes and ground loops.',
              'Analogue conditioning includes filtering, amplification, linearisation, cold junction compensation and excitation current — each fixes a different weakness of the raw sensor signal.',
              'A methodical fault-finding order (LEDs, software monitor, field measurement, wiring, device, module swap) finds the fault location efficiently and avoids guesswork.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section2-1')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  PLC Hardware and Architecture
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section2-3')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Ladder Logic Basics
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule5Section2_2;
