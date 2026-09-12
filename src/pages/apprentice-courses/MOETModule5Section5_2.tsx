/**
 * MOET · Module 5 · Section 5 · Subsection 2 — Test Instruments for Control
 * Systems
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option.
 *
 * KSBs covered, quoted rather than numbered: the IfATE/Skills England API
 * publishes these statements without their K/S/B codes, and the published
 * numbering has not been verified against a primary source — so do not invent
 * codes here. The conversion brief for this course does not list a Module 5
 * KSB set, so only a statement that already appears verbatim in the brief's
 * verified lists for other modules — and that genuinely fits this page's
 * content — is used here.
 *   Knowledge  · "Electrical. Electrical maintenance tools, measurement, and
 *                 test equipment application, operation, care and
 *                 calibration requirements."
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
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Test Instruments for Control Systems - MOET Module 5 Section 5.2';
const DESCRIPTION =
  'Selection and use of test instruments for commissioning, troubleshooting and maintaining industrial control and automation systems including process calibrators, HART communicators, oscilloscopes, data loggers and network analysers.';

const quickCheckQuestions = [
  {
    id: 'qc1',
    question: 'What is a multifunction process calibrator?',
    options: [
      'A portable instrument that can source, simulate, and measure process signals',
      'A fixed panel meter that displays the current flowing in a single control loop',
      'A handheld device used solely to test the insulation resistance of field cables',
      'A software package for designing and documenting the layout of a control panel',
    ],
    correctIndex: 0,
    explanation:
      'Multifunction calibrators combine multiple signal sourcing and measurement capabilities (mA, V, resistance, thermocouple, frequency) in a single portable instrument for field calibration and troubleshooting.',
  },
  {
    id: 'qc2',
    question: 'What does a HART communicator allow you to do?',
    options: [
      'Measure the insulation resistance of the transmitter wiring to earth',
      'Communicate digitally with HART-enabled smart transmitters for configuration, calibration, and diagnostics',
      'Generate a high-voltage test signal to prove the loop is dead',
      'Clamp around a conductor to read its current without breaking the loop',
    ],
    correctIndex: 1,
    explanation:
      'A HART communicator connects to the 4-20 mA loop and uses the HART digital protocol to access transmitter configuration, calibration functions, and diagnostic data.',
  },
  {
    id: 'qc3',
    question: 'Why is an oscilloscope useful for control system troubleshooting?',
    options: [
      'It records calibration data and prints certificates automatically',
      'It simulates an RTD sensor output by providing a precise resistance',
      'It displays time-varying electrical signals, allowing analysis of waveforms, timing, noise, and transient events',
      'It measures the resistance of insulation to detect moisture ingress',
    ],
    correctIndex: 2,
    explanation:
      'Oscilloscopes capture and display voltage waveforms over time, essential for analysing signal integrity, timing relationships, noise, and transient events in control circuits.',
  },
  {
    id: 'qc4',
    question: 'What does the CAT III voltage rating indicate?',
    options: [
      'The instrument is rated only for battery-powered, low-energy electronic equipment',
      'The instrument is rated only for appliance-level socket outlet final circuits',
      'The instrument is rated for the incoming supply at the origin of the installation',
      'The instrument is rated for distribution-level circuits, panels and switchboards',
    ],
    correctIndex: 3,
    explanation:
      'CAT III covers distribution-level circuits: fixed wiring, switchboards, and industrial control panels. Test instruments used in these environments must be rated at least CAT III per IEC 61010-1.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the primary use of a loop calibrator in the field?',
    options: [
      'Analysing the signal quality and error rate on a Profibus DP network',
      'Sourcing and measuring 4-20 mA signals to test transmitters and loop components',
      'Measuring the insulation resistance between live conductors and earth',
      'Displaying high-speed voltage waveforms for signal timing analysis',
    ],
    correctAnswer: 1,
    explanation:
      'Loop calibrators source and measure 4-20 mA signals, allowing technicians to test transmitters, verify input cards, check wiring, and simulate process signals.',
  },
  {
    id: 2,
    question: 'What function does a decade resistance box serve in control system testing?',
    options: [
      'Generating a precise 4-20 mA current to drive a control loop input',
      'Measuring current non-invasively by clamping around a single conductor',
      'Providing precise, adjustable resistance values to simulate RTD sensors',
      'Capturing waveforms to investigate noise and timing on signal lines',
    ],
    correctAnswer: 2,
    explanation:
      'Decade boxes provide accurately known resistance values, allowing simulation of RTD sensor outputs for testing and calibrating temperature transmitters and measurement systems.',
  },
  {
    id: 3,
    question: 'What is a current clamp meter used for in control system work?',
    options: [
      'Simulating an RTD output to calibrate a temperature transmitter',
      'Configuring a smart transmitter over the HART digital protocol',
      'Recording multi-channel measurement data over time for trend analysis',
      'Measuring current without breaking the circuit by clamping a conductor',
    ],
    correctAnswer: 3,
    explanation:
      'Current clamp meters measure AC or DC current non-invasively by sensing the magnetic field around a conductor, useful for checking motor currents, actuator loads, and power supply currents.',
  },
  {
    id: 4,
    question: 'What does an insulation resistance tester (megger) measure?',
    options: [
      'The resistance of electrical insulation to detect degradation, moisture ingress, or damage',
      'The current drawn by a motor while it is running under load',
      'The signal quality and error rate on an industrial fieldbus',
      'The precise resistance value needed to simulate an RTD sensor',
    ],
    correctAnswer: 0,
    explanation:
      'Insulation resistance testing applies a high DC voltage (typically 250V, 500V, or 1000V) and measures the resistance of insulation between conductors and earth, detecting degradation before failure.',
  },
  {
    id: 5,
    question: 'What is a data logger used for in control system testing?',
    options: [
      'Injecting a test signal to force a control loop into manual mode',
      'Automatically recording measurement data over time for trend analysis',
      'Displaying live process values on a portable screen without storing them',
      'Converting a 4-20 mA analogue signal into a digital fieldbus telegram',
    ],
    correctAnswer: 1,
    explanation:
      'Data loggers record multiple channels of measurement data (voltage, current, temperature, etc.) over extended periods, invaluable for capturing intermittent faults and trending process behaviour.',
  },
  {
    id: 6,
    question: 'What is the advantage of a documenting process calibrator?',
    options: [
      'It can be used safely without regard to the circuit voltage category rating',
      'It measures motor current non-invasively without breaking into the loop wiring',
      'It automatically records calibration data and generates certificates electronically',
      'It removes the need to ever calibrate the reference instrument itself',
    ],
    correctAnswer: 2,
    explanation:
      'Documenting calibrators automate the recording process, eliminating transcription errors, calculating errors against tolerance, and generating electronic calibration records that integrate with CMS software.',
  },
  {
    id: 7,
    question: 'When would you use a network analyser for control system troubleshooting?',
    options: [
      'To simulate an RTD sensor when calibrating a temperature transmitter',
      'To measure the insulation resistance of a network bus cable to earth',
      'To source a precise 4-20 mA signal into a PLC controller input card',
      'To diagnose communication issues on industrial fieldbus and Ethernet networks',
    ],
    correctAnswer: 3,
    explanation:
      'Network analysers capture and analyse industrial network traffic (Ethernet, Profibus, Modbus), identify communication errors, measure bus timing, detect collisions, and help diagnose intermittent network problems.',
  },
  {
    id: 8,
    question:
      'What safety precaution is essential when using test instruments on live control systems?',
    options: [
      'Ensure instruments are rated for the circuit voltage category and use appropriate PPE',
      'Use the lowest possible measurement range to reduce instrument battery drain',
      'Connect the instrument to the circuit before checking that it is switched on',
      'Choose an instrument with the brightest display for on-site visibility',
    ],
    correctAnswer: 0,
    explanation:
      'Test instruments must have appropriate CAT ratings (CAT III or CAT IV for distribution circuits), and technicians must follow safe working practices including isolation procedures, PPE, and risk assessment.',
  },
  {
    id: 9,
    question: 'What is a milliamp (mA) source used for?',
    options: [
      'Recording calibration data and producing certificates automatically',
      'Generating a precise 4-20 mA signal to simulate a transmitter output',
      'Measuring the resistance of insulation to detect moisture or damage',
      'Analysing the signal quality and error rate on a Profibus network',
    ],
    correctAnswer: 1,
    explanation:
      'An mA source generates a precise current signal that simulates a transmitter output, allowing the technician to test and verify receivers, controllers and recorders at the receiving end of the loop independently.',
  },
  {
    id: 10,
    question: 'What is the CAT III voltage rating category?',
    options: [
      'Battery-powered and electronic equipment only',
      'Appliance-level circuits supplied from a socket outlet',
      'Distribution-level circuits including fixed installation wiring, distribution boards, and control panels',
      'The origin of the installation, such as the incoming supply and meters',
    ],
    correctAnswer: 2,
    explanation:
      'CAT III covers distribution-level circuits: fixed wiring, switchboards, and industrial control panels. Test instruments used in these environments must be rated at least CAT III.',
  },
  {
    id: 11,
    question: 'Why should test leads be inspected before each use?',
    options: [
      'Inspecting the leads recharges the instrument battery ready for use',
      'Inspecting the leads improves the accuracy of the network analyser',
      'Inspection is only required after the instrument has been dropped',
      'Damaged leads can expose the technician to hazardous live voltages',
    ],
    correctAnswer: 3,
    explanation:
      'Damaged insulation, cracked probe tips, or degraded connections can create a safety hazard by exposing the user to live voltages. Damaged leads can also introduce measurement errors through poor contact resistance.',
  },
  {
    id: 12,
    question: 'What is the purpose of a Profibus tester?',
    options: [
      'Analysing Profibus DP/PA bus quality, signal levels and communication errors',
      'Measuring the running current drawn by a motor on the control panel',
      'Simulating an RTD sensor in order to calibrate a temperature transmitter',
      'Testing the insulation resistance of the network bus cable to earth',
    ],
    correctAnswer: 0,
    explanation:
      'Profibus testers (e.g. Softing BC-600-PB) analyse bus signal quality, measure voltage levels, detect communication errors, identify reflections, and diagnose termination problems on Profibus networks. They support both commissioning and fault diagnosis.',
  },
];

const faqs = [
  {
    question: 'What is the minimum set of test equipment for a control system technician?',
    answer:
      'A well-equipped technician typically carries: a multifunction process calibrator (mA/V/RTD/TC), a digital multimeter (CAT III/IV rated), a HART communicator or equivalent, an insulation resistance tester, a current clamp meter, and basic hand tools. Additional equipment depends on the specific systems maintained (e.g. network analysers for fieldbus systems, oscilloscopes for high-speed signals).',
  },
  {
    question: 'How often should test instruments be calibrated?',
    answer:
      "Test instruments should be calibrated at intervals determined by the manufacturer's recommendation, the instrument's stability, and the criticality of the measurements it supports. Typically, multifunction calibrators and reference standards are calibrated annually by a UKAS-accredited laboratory. Frequently used instruments may need shorter intervals.",
  },
  {
    question: 'Can I use a standard multimeter for 4-20 mA loop testing?',
    answer:
      'A standard multimeter can measure the loop current, but it cannot source a current signal. For full loop testing (sourcing and measuring), a dedicated loop calibrator or multifunction calibrator is needed. When measuring, ensure the multimeter is in series with the loop and rated for the circuit voltage.',
  },
  {
    question: 'What is the difference between CAT II, III, and IV ratings?',
    answer:
      'CAT II covers local-level circuits (appliance outlets). CAT III covers distribution-level circuits (fixed wiring, panels, control cabinets). CAT IV covers origin of installation (incoming supply, meters). Higher categories have greater fault current capability. Always use instruments rated for the environment -- industrial control panels require CAT III minimum.',
  },
  {
    question: 'What are the advantages of tablet-based calibration tools?',
    answer:
      'Tablet-based tools connected via Bluetooth to field devices or calibrators provide several advantages: paperless documentation, direct access to calibration management software, real-time work order management, digital signatures, photographic evidence capture, and integration with enterprise asset management platforms. They streamline the workflow from field to database.',
  },
];

const MOETModule5Section5_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 5 · Section 5.5 · Subsection 2"
        title="Test Instruments for Control Systems"
        backTo="/study-centre/apprentice/m-o-e-t-module5-section5"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Selection, use and safety of test equipment for industrial control systems.
          </p>

          <TLDR
            points={[
              'Process calibrator: source, simulate and measure mA, V, RTD, TC signals.',
              'HART communicator: digital access to smart transmitter configuration.',
              'Data loggers: multi-channel recording for intermittent faults.',
              'CAT III minimum: the required rating for industrial control panels.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Select appropriate test instruments for different control system testing tasks',
              'Use multifunction process calibrators for sourcing, simulating, and measuring process signals',
              'Explain the capabilities of HART communicators for smart transmitter access',
              'Apply data loggers and oscilloscopes for intermittent fault diagnosis',
              'Understand voltage category ratings and safety requirements for test equipment',
              'Describe network analysers for industrial communication troubleshooting',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="Maintenance technician context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Oscilloscope:</strong> waveform analysis for noise, timing and signal
                integrity.
              </li>
              <li>
                <strong>Network analyser:</strong> Profibus, Ethernet/IP, Modbus troubleshooting.
              </li>
              <li>
                <strong>Documenting calibrator:</strong> automatic records and error calculations.
              </li>
              <li>
                <strong>IEC 61010-1:</strong> the safety standard for measurement equipment.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>Multifunction process calibrators</ContentEyebrow>

          <ConceptBlock
            title="Multifunction process calibrators"
            onSite="When sourcing a 4-20 mA signal, always check whether the loop requires an externally powered source (active) or uses the loop's own power supply (passive/read mode). Connecting in the wrong mode can damage the calibrator or the loop components."
          >
            <p>
              The multifunction process calibrator is the primary tool for control system
              technicians. Instruments such as the Beamex MC6, Fluke 754, and Druck DPI 620 can{' '}
              <strong>source</strong> (generate signals), <strong>simulate</strong> (mimic sensor
              outputs), and <strong>measure</strong> (read signals) across a wide range of process
              signals including 4-20 mA, 0-10 V DC, resistance (RTD simulation), thermocouple
              millivolts, frequency, and pulse signals.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Calibrator operating modes">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Source mode:</strong> the calibrator generates a precise signal (e.g. 12.00
                mA) to test the receiving end of the loop -- controller input, recorder, indicator.
              </li>
              <li>
                <strong>Simulate mode:</strong> the calibrator mimics a sensor output (e.g. RTD
                resistance for 150 degrees C) to test the transmitter&apos;s conversion accuracy.
              </li>
              <li>
                <strong>Measure mode:</strong> the calibrator reads the actual loop signal to verify
                transmitter output or controller output.
              </li>
              <li>
                <strong>Simultaneous:</strong> many calibrators can source one signal type and
                measure another simultaneously, enabling complete loop testing from a single device.
              </li>
            </ul>
            <p>
              Advanced calibrators include <strong>documenting capability</strong> -- they
              automatically record test data, calculate errors against tolerance, and store results
              that can be downloaded to calibration management software. This eliminates manual data
              entry, reduces transcription errors, and creates a fully electronic calibration trail.
              The Beamex MC6, for example, can store thousands of calibration records and transfer
              them directly to Beamex CMX calibration management software.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>HART communicators and digital tools</ContentEyebrow>

          <ConceptBlock
            title="HART communicators and digital tools"
            onSite="HART communication occurs simultaneously with the 4-20 mA analogue signal, using frequency-shift keying (FSK) superimposed on the current loop. No additional wiring is required -- the communicator simply clips onto the existing loop wiring."
          >
            <p>
              The <strong>HART communicator</strong> (e.g. Emerson Trex, Beamex MC6 with HART)
              connects to the 4-20 mA loop and communicates digitally with HART-enabled smart
              transmitters. It provides access to configuration parameters (range, damping, units),
              calibration functions (sensor trim and output trim commands), diagnostic data (sensor
              status, electronics temperature, configuration change count), and device
              identification (tag, serial number, manufacturer).
            </p>
          </ConceptBlock>

          <ConceptBlock title="HART functions">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Configure range, damping, and engineering units.</li>
              <li>Perform sensor trim and output trim calibration.</li>
              <li>Read diagnostic data and device health status.</li>
              <li>View configuration change logs and alerts.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Fieldbus tools">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Profibus testers analyse bus signal quality.</li>
              <li>Foundation Fieldbus diagnostics monitor token passing.</li>
              <li>Tablet apps provide mobile device management.</li>
              <li>AMS/PDM platforms centralise device configuration.</li>
            </ul>
            <p>
              <strong>Tablet-based tools</strong> and apps are increasingly used alongside
              traditional instruments. Mobile apps connected via Bluetooth to field devices or
              calibrators provide configuration, calibration records, and work order management
              directly from the field. Asset management platforms (Emerson AMS, Siemens PDM) provide
              centralised device management across the plant, maintaining a database of all device
              configurations and enabling remote access to field instrument data.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Oscilloscopes and data loggers</ContentEyebrow>

          <ConceptBlock title="Oscilloscopes and data loggers">
            <p>
              <strong>Portable digital oscilloscopes</strong> (such as Fluke ScopeMeter or Tektronix
              TBS series) display time-varying electrical signals as waveforms. In control system
              work, they are essential for analysing PWM drive outputs, checking encoder signals,
              diagnosing communication waveforms, identifying noise and interference, and measuring
              timing relationships between signals. Bandwidth of 100-200 MHz is sufficient for most
              industrial applications.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Oscilloscope applications in control systems">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>VSD output:</strong> verify PWM waveform quality and switching frequency.
              </li>
              <li>
                <strong>Encoder signals:</strong> check pulse shape, frequency, and quadrature
                phase.
              </li>
              <li>
                <strong>Communication:</strong> analyse RS-485, Profibus, or HART signal levels and
                timing.
              </li>
              <li>
                <strong>Noise investigation:</strong> identify interference sources, measure
                signal-to-noise ratio.
              </li>
              <li>
                <strong>Transient capture:</strong> record intermittent glitches using single-shot
                trigger mode.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Data loggers"
            onSite="When investigating intermittent faults, set up a data logger to record the suspect signal continuously with trigger conditions. This captures the fault event and the surrounding context, even when no technician is present. Review the recorded data to correlate faults with time of day, process conditions, or other events."
          >
            <p>
              <strong>Data loggers</strong> record multiple channels of data over extended periods
              (hours, days, or weeks). They are invaluable for capturing intermittent faults that
              occur randomly, trending process variables to identify slow drift, and recording
              environmental conditions during calibration. Modern data loggers offer wireless
              connectivity, cloud storage, and remote monitoring via web browsers. Multi-channel
              loggers can record voltage, current, temperature, humidity, and digital events
              simultaneously.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Network analysers and specialist tools</ContentEyebrow>

          <ConceptBlock
            title="Network analysers and specialist tools"
            onSite="For Profibus DP networks, dedicated testers (e.g. Softing BC-600-PB) are essential. They analyse the physical bus signal quality, measure voltage levels and rise times, check bus termination, and detect reflections that generic test equipment cannot identify."
          >
            <p>
              <strong>Network analysers</strong> for industrial communications capture and decode
              network traffic on protocols including Ethernet/IP, Profinet, Modbus TCP, and Profibus
              DP. They identify communication errors, measure response times, detect duplicate
              addresses, and help diagnose intermittent network problems. Wireshark (free software)
              with appropriate capture hardware is widely used for Ethernet-based protocol analysis.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Network diagnostic capabilities">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Protocol decode and traffic analysis.</li>
              <li>Response time measurement.</li>
              <li>Error rate and collision detection.</li>
              <li>Duplicate address identification.</li>
              <li>Bus topology and termination verification.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Specialist test equipment">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Decade resistance box (RTD simulation).</li>
              <li>Current clamp meter (non-invasive).</li>
              <li>Insulation resistance tester (megger).</li>
              <li>Earth loop impedance tester.</li>
              <li>Thermal imaging camera.</li>
            </ul>
            <p>
              Additional specialist tools include <strong>decade resistance boxes</strong> for
              precise RTD simulation, <strong>current clamp meters</strong> for non-invasive current
              measurement, and <strong>insulation resistance testers (meggers)</strong> for checking
              cable and winding insulation integrity. Thermal imaging cameras are increasingly used
              for identifying hot spots in control panels, detecting loose connections, and checking
              motor and transformer temperatures without physical contact.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Safety and voltage category ratings</ContentEyebrow>

          <ConceptBlock
            title="Safety and voltage category ratings"
            onSite="Electricians and instrumentation technicians must understand CAT ratings and always select instruments appropriate for the measurement environment. Using a CAT II rated instrument in a CAT III environment is a potentially lethal mistake."
          >
            <p>
              All test instruments used on electrical systems must be rated for the voltage category
              of the circuit being tested, as defined by <strong>IEC 61010-1</strong>. The
              measurement category system classifies circuits by their distance from the supply
              origin: <strong>CAT II</strong> covers local-level circuits (appliance sockets);{' '}
              <strong>CAT III</strong> covers distribution-level circuits including fixed wiring,
              distribution boards, and control panels; <strong>CAT IV</strong> covers the origin of
              installation (incoming supply, utility meters).
            </p>
          </ConceptBlock>

          <ConceptBlock title="Safety critical requirements">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Industrial control panels:</strong> require CAT III rated instruments as a
                minimum.
              </li>
              <li>
                <strong>Transient withstand:</strong> CAT III 600V has higher capability than CAT II
                600V.
              </li>
              <li>
                <strong>Test leads:</strong> must be rated to the same CAT/voltage as the
                instrument.
              </li>
              <li>
                <strong>Visual inspection:</strong> check probes, leads, and case for damage before
                each use.
              </li>
              <li>
                <strong>PPE:</strong> insulated gloves and safety glasses when testing on live
                systems.
              </li>
              <li>
                <strong>One-hand rule:</strong> use one hand where possible to minimise current path
                through body.
              </li>
            </ul>
            <p>
              The CAT rating combined with the voltage rating determines the instrument&apos;s
              ability to withstand transient overvoltages. A CAT III 600V instrument can withstand
              higher transients than a CAT II 600V instrument. Using an instrument below the
              required CAT rating creates a serious safety hazard -- the instrument may not survive
              a transient and could expose the technician to dangerous voltages. Before use, test
              instruments must be visually inspected for damage to probes, leads, and case.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'Core test instruments: a multifunction calibrator sources, simulates and measures; a HART communicator gives smart-transmitter access; a digital multimeter reads voltage, current and resistance; a loop calibrator sources and reads 4-20 mA; an insulation resistance tester checks cables and windings.',
              'CAT III is the minimum rating for industrial control panels; IEC 61010-1 sets the safety requirements for test equipment.',
              'Inspect test leads visually before each use, and always match leads to the same CAT rating as the instrument.',
              'A data logger is the tool for capturing an intermittent fault.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section5-1')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Calibration Procedures and Standards
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section5-3')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Zero, Span and Linearity Adjustments
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule5Section5_2;
