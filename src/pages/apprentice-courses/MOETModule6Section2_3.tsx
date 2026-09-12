/**
 * MOET · Module 6 · Section 2 · Subsection 3 — Piping and Instrumentation
 * Diagrams (P&ID)
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option.
 *
 * KSBs covered: no verified ST1426 KSB statement list for Module 6 was
 * available at conversion time (Modules 1–4 have verified lists; Module 6
 * does not). Rather than invent statements or borrow another module's list,
 * this header omits specific KSB quotes. Flagged for follow-up once a
 * verified Module 6 KSB list exists.
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

const TITLE = 'Piping and Instrumentation Diagrams (P&ID) - MOET Module 6 Section 2.3';
const DESCRIPTION =
  'Interpreting piping and instrumentation diagrams for electrical maintenance: P&ID symbols, instrument identification, control loops, valve and actuator representation, ISA/BS EN standards and cross-referencing with electrical documentation.';

const quickCheckQuestions = [
  {
    id: 'pid-purpose-check',
    question: 'What is the primary purpose of a piping and instrumentation diagram (P&ID)?',
    options: [
      'To show the functional relationship between piping, instrumentation and control equipment in a process system',
      'To show the electrical power distribution from the supply intake to each motor',
      'To set out the structural steelwork and foundation loads for the plant room',
      'To record the detailed wiring terminations for a single instrument loop',
    ],
    correctIndex: 0,
    explanation:
      'A P&ID shows the functional relationship between all the process equipment (vessels, pumps, heat exchangers), the piping that connects them, and the instrumentation and controls that monitor and regulate the process. It is the primary reference document for understanding how a process system operates.',
  },
  {
    id: 'instrument-tag-check',
    question: "An instrument tag number such as 'TT-101' on a P&ID indicates:",
    options: [
      'A pressure transmitter, identified as panel number 101',
      'A temperature switch wired to terminal 101 in the control panel',
      'A temperature transmitter, identified as loop number 101',
      'A timer relay set to operate after a delay of 101 seconds',
    ],
    correctIndex: 2,
    explanation:
      'Instrument tag numbers follow the ISA 5.1 / BS EN 62424 convention. The first letter indicates the measured variable (T = temperature), the second letter indicates the function (T = transmit). The number identifies the specific control loop (101). So TT-101 is a temperature transmitter in loop 101.',
  },
  {
    id: 'control-valve-check',
    question: 'On a P&ID, a control valve with a pneumatic actuator is shown with:',
    options: [
      'A plain valve body symbol with no actuator drawn and no failure mode noted at all',
      'A valve symbol with an actuator on top, showing the actuator type and failure mode',
      'A circle balloon symbol identical to the one used for a field-mounted instrument',
      'A dashed signal line only, with the valve itself shown on a separate drawing',
    ],
    correctIndex: 1,
    explanation:
      'Control valves on P&IDs are shown with the valve body symbol plus the actuator type above it. The failure mode (fail-open, fail-closed, fail-in-place) is indicated by notation such as FC (fail-closed) or FO (fail-open). This is essential for understanding what happens during a power or air supply failure.',
  },
  {
    id: 'pid-electrical-link',
    question: "How does a P&ID relate to the electrical maintenance technician's work?",
    options: [
      'It sets the maintenance budget and spare parts ordering levels for the whole plant',
      'It provides the structural calculations for mounting the heavy process equipment',
      'It identifies the instruments and actuators to maintain, linked by their tag numbers',
      'It replaces the need for any separate electrical drawings or instrument loop diagrams',
    ],
    correctIndex: 2,
    explanation:
      'For a maintenance technician, the P&ID identifies every instrument, actuator and motor in the process system. The tag numbers on the P&ID cross-reference to instrument datasheets, loop diagrams, electrical drawings and the CMMS. When fault-finding a process issue, the P&ID shows which instruments and actuators are involved.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'The letters in an ISA 5.1 instrument tag identify:',
    options: [
      'The pipe size and the type of fluid being carried in the connected process line',
      'The measured variable and the instrument function (for example FT or PI)',
      'The cable reference and the terminal numbers for the instrument field wiring',
      'The manufacturer name and the model number of the installed field instrument',
    ],
    correctAnswer: 1,
    explanation:
      'ISA 5.1 uses a letter code where the first letter identifies the measured variable (F = flow, T = temperature, P = pressure, L = level) and subsequent letters identify the function (T = transmit, I = indicate, C = control, A = alarm). So FT = flow transmitter, PI = pressure indicator, LIC = level indicating controller.',
  },
  {
    id: 2,
    question:
      'On a P&ID, a circle (balloon) with a single horizontal line through the middle represents:',
    options: [
      'A field-mounted instrument with no panel connection',
      'A manual valve that is normally left in the closed position',
      'An instrument mounted on the main (accessible) control panel',
      'A safety interlock that trips the process on demand',
    ],
    correctAnswer: 2,
    explanation:
      'The circle (balloon) symbol represents an instrument. A single horizontal line through the middle indicates the instrument is mounted on the main, normally accessible, control panel. A circle without a line indicates a field-mounted instrument. This tells the maintenance technician where to find the instrument.',
  },
  {
    id: 3,
    question: 'A dashed line on a P&ID typically represents:',
    options: [
      'A heavy-duty process pipe carrying the main product flow',
      'A mechanical linkage between two manually operated valves',
      'The boundary of a fire compartment within the plant room',
      'An electrical signal, pneumatic signal, or instrument connection (depending on the line style)',
    ],
    correctAnswer: 3,
    explanation:
      'P&IDs use different line styles to distinguish between process piping (solid heavy lines), electrical signals (dashed lines), pneumatic signals (lines with crosses), and hydraulic signals (dashed lines with dots). Understanding these line conventions is essential for tracing signal paths from instruments to controllers.',
  },
  {
    id: 4,
    question: "The term 'control loop' on a P&ID refers to:",
    options: [
      'The sensor, controller and final control element that hold a variable at its setpoint',
      'A closed ring of process pipework that recirculates the fluid back to its source',
      'The earth loop formed between the instrument cabling and the metal process pipework',
      'A loop of spare cable left coiled at each junction box for future modifications',
    ],
    correctAnswer: 0,
    explanation:
      'A control loop consists of: a sensor/transmitter (measures the process variable), a controller (compares measurement to setpoint and calculates correction), and a final control element (typically a control valve or VSD-driven motor) that adjusts the process. The P&ID shows all these elements and their connections.',
  },
  {
    id: 5,
    question:
      'A motor-operated valve (MOV) on a P&ID is important for electrical maintenance because:',
    options: [
      'It is always operated by hand and so needs no electrical maintenance at all',
      'Its electric actuator, power supply, control wiring and limit switches all need maintaining',
      'It is driven by compressed air and falls entirely to the mechanical maintenance team',
      'It has no moving parts and only requires a periodic visual inspection of the body',
    ],
    correctAnswer: 1,
    explanation:
      "Motor-operated valves have electric actuators requiring maintenance of: the motor and gearbox, power supply wiring, control signals (open/close commands), limit switches (open/closed position), torque switches, position feedback signals, and local/remote selection switches. All of these are the electrician's responsibility.",
  },
  {
    id: 6,
    question: "A P&ID shows a pump with the tag 'P-201A/B'. This indicates:",
    options: [
      'A single pump able to run at two different fixed speeds, labelled A and B',
      'Two pumps connected in series to boost the overall discharge pressure',
      'A duty/standby pair — P-201A runs as duty, P-201B stands by as redundancy',
      'A single pump rated for either of two alternative process fluids, A or B',
    ],
    correctAnswer: 2,
    explanation:
      'The A/B suffix indicates a duty/standby arrangement — two identical pumps where one runs (duty) and the other is on standby, ready to start automatically if the duty pump fails. This is common for critical process services. The electrician maintains both pump motors and the auto-changeover control system.',
  },
  {
    id: 7,
    question:
      'An interlock shown on a P&ID (e.g., low oil pressure trips the compressor) is relevant to electrical maintenance because:',
    options: [
      'The interlock is purely mechanical and needs no electrical attention',
      'The interlock only affects the process pipework, not any electrical equipment',
      'The interlock is shown for information only and is never tested while in service',
      'Its logic runs in electrical/electronic circuits the technician must test and maintain',
    ],
    correctAnswer: 3,
    explanation:
      'Process interlocks are typically implemented through electrical/electronic circuits — hardwired safety relays, PLC logic, or safety instrumented systems (SIS). The P&ID shows what the interlock does functionally; the electrical drawings and PLC programmes show how it is implemented. The maintenance technician must understand both for effective fault-finding and testing.',
  },
  {
    id: 8,
    question: 'When fault-finding a process control issue, the P&ID is used to:',
    options: [
      'Understand the process flow and identify the instruments and control elements involved',
      'Read the detailed terminal numbers and cable references for each individual wire',
      'Determine the structural loads that are imposed by the heavy process equipment',
      'Calculate the energy consumption and the carbon emissions of the whole plant',
    ],
    correctAnswer: 0,
    explanation:
      'The P&ID shows you the complete picture: what the process should be doing, which instruments are measuring it, which controller is regulating it, and which actuator is adjusting it. When a process variable is out of range, the P&ID helps you identify every element in the control loop that could be causing the problem.',
  },
  {
    id: 9,
    question: 'BS EN 62424 relates to:',
    options: [
      'The selection and sizing of the cables used for instrument power supplies',
      'Representation of process control in P&IDs, with instrument identification and symbols',
      'The periodic inspection and testing of fixed electrical installations on site',
      'The energy performance assessment of process plant, equipment and buildings',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 62424 (based on IEC 62424) provides the standard for representing process control engineering in P&ID diagrams. It defines the graphic symbols, letter codes, and identification methods used for instruments and control equipment. It complements ISA 5.1 which is also widely used in the UK.',
  },
  {
    id: 10,
    question:
      "A safety instrumented function (SIF) shown on a P&ID with an 'SIL' rating indicates:",
    options: [
      'A standard control loop with no special testing requirements',
      'An instrument that can be silenced or muted by the operator',
      'A safety-critical function with a defined Safety Integrity Level, requiring specific testing and maintenance procedures',
      'A spare instrument loop held in reserve for future expansion',
    ],
    correctAnswer: 2,
    explanation:
      'Safety instrumented functions (SIFs) are safety-critical loops with a defined SIL (Safety Integrity Level) rating per BS EN 61511. They have mandatory proof-test intervals, specific maintenance requirements, and documented test procedures. As a maintenance technician, you must follow these procedures exactly and record all test results.',
  },
  {
    id: 11,
    question: 'A loop diagram differs from a P&ID in that it shows:',
    options: [
      'The overall process flow across all the major plant equipment',
      'A simplified overview of the main process streams and conditions',
      'The structural and piping layout of the whole process system together',
      'The detailed wiring for a single loop — terminal numbers, cables and junction boxes',
    ],
    correctAnswer: 3,
    explanation:
      'A loop diagram (or instrument loop drawing) shows the complete wiring detail for one specific instrument loop — from the field instrument through junction boxes, cable marshalling, to the control system I/O. It includes terminal numbers, cable references, and signal types. It is the instrument equivalent of an electrical wiring diagram.',
  },
  {
    id: 12,
    question:
      'Understanding P&IDs is important for an electrical maintenance technician under ST1426 because:',
    options: [
      'Technicians must interpret technical drawings, including P&IDs, for the systems they maintain',
      'P&IDs are used only by process engineers and never by the maintenance staff themselves',
      'The standard requires maintenance technicians to draw their own P&IDs entirely from scratch',
      'P&IDs replace the need for any electrical safe isolation procedures before working',
    ],
    correctAnswer: 0,
    explanation:
      'ST1426 requires maintenance technicians to interpret technical drawings and documentation relevant to their work. In process industries (manufacturing, water treatment, HVAC, food production), P&IDs are fundamental documents. Understanding them enables effective fault-finding, safe isolation planning, and informed communication with process engineers.',
  },
];

const faqs = [
  {
    question: 'Do I need to understand the full chemical process to read a P&ID?',
    answer:
      'No. As an electrical maintenance technician, you need to understand the instrumentation, control equipment and electrical components shown on the P&ID, not the detailed chemistry or process engineering. Focus on: what instruments are present, what they measure, how they connect to the control system, and what actuators/motors are involved. Your process engineering colleagues can explain the process context.',
  },
  {
    question: 'What is the difference between a P&ID and a PFD (Process Flow Diagram)?',
    answer:
      "A Process Flow Diagram (PFD) is a simplified overview showing the major equipment, main process flows, and key operating conditions (temperatures, pressures, flow rates). A P&ID is much more detailed, showing every pipe, valve, instrument, and control element. The PFD gives you the 'big picture'; the P&ID gives you the detail needed for maintenance and fault-finding.",
  },
  {
    question: 'How do I cross-reference a P&ID with electrical drawings?',
    answer:
      'The instrument tag number is the key cross-reference. An instrument shown as TT-101 on the P&ID will appear on the loop diagram for loop 101, the instrument datasheet for TT-101, the electrical cable schedule, and the CMMS asset record. Always use the tag number as your link between the P&ID and all other documentation.',
  },
  {
    question: 'Are P&IDs updated when changes are made to the plant?',
    answer:
      "They should be, under the management of change (MOC) procedure. However, in practice, P&IDs are not always kept up to date. If you discover that the P&ID does not match the actual installation, report the discrepancy through your site's documentation control process. Working from an inaccurate P&ID can lead to incorrect fault-finding or unsafe isolation.",
  },
  {
    question: 'What is a cause-and-effect diagram and how does it relate to the P&ID?',
    answer:
      "A cause-and-effect (C&E) diagram or matrix shows the logical relationships between process inputs (causes) and safety/control actions (effects). For example: 'high level in tank T-101 (cause) → close inlet valve XV-101 (effect)'. The C&E diagram implements the safety interlocks shown on the P&ID and is essential for testing safety instrumented systems.",
  },
];

const MOETModule6Section2_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 6 · Section 6.2 · Subsection 3"
        title="Piping and Instrumentation Diagrams (P&ID)"
        backTo="/study-centre/apprentice/m-o-e-t-module6-section2"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            P&amp;ID symbols, instrument identification, control loops and cross-referencing with
            electrical documentation
          </p>

          <TLDR
            points={[
              'P&ID: Shows process equipment, piping, instruments and controls.',
              'Tag numbers: ISA 5.1 letter code identifies variable and function.',
              'Control loops: Sensor → controller → final control element.',
              'Cross-reference: Tag numbers link to electrical drawings and CMMS.',
              'Instruments: Transmitters, switches, analysers to maintain.',
              'Actuators: Electric valve actuators and VSD-driven motors.',
              'Safety systems: SIL-rated loops with mandatory proof testing.',
              'ST1426: Technical drawing interpretation competence.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain the purpose and content of piping and instrumentation diagrams',
              'Interpret ISA 5.1 / BS EN 62424 instrument identification and tag numbering',
              'Identify common P&ID symbols for valves, actuators, instruments and equipment',
              'Trace control loops from sensor through controller to final control element',
              'Cross-reference P&ID instrument tags with electrical drawings and loop diagrams',
              'Understand the relevance of P&IDs for electrical fault-finding and safe isolation',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Purpose and content of P&amp;IDs</ContentEyebrow>

          <ConceptBlock title="Purpose and content of P&amp;IDs">
            <p>
              A piping and instrumentation diagram (P&amp;ID) is the definitive reference document
              for any process system. It shows the functional relationship between all the equipment
              in a process — vessels, pumps, heat exchangers, compressors — connected by piping, and
              controlled by instrumentation and control systems. For maintenance technicians working
              in process industries (manufacturing, water treatment, HVAC, food production,
              pharmaceuticals), the P&amp;ID is as important as the electrical single-line diagram.
            </p>
            <p>
              Unlike a process flow diagram (PFD) which shows a simplified overview, the P&amp;ID
              shows every pipe, valve, instrument, and control element. Every item has a unique tag
              number that links it to datasheets, maintenance records, spare parts lists, and
              electrical drawings. The P&amp;ID is prepared to BS EN 62424 (IEC 62424) and uses
              symbols from ISA 5.1 and BS EN ISO 10628.
            </p>
          </ConceptBlock>

          <ConceptBlock title="What a P&ID shows">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Process equipment:</strong> Vessels, tanks, pumps, compressors, heat
                exchangers.
              </li>
              <li>
                <strong>Piping:</strong> All process and utility piping with sizes and
                specifications.
              </li>
              <li>
                <strong>Valves:</strong> Manual, control, safety, isolation — with type and tag.
              </li>
              <li>
                <strong>Instrumentation:</strong> All sensors, transmitters, controllers,
                indicators.
              </li>
              <li>
                <strong>Control systems:</strong> DCS/PLC connections, safety systems (SIS).
              </li>
              <li>
                <strong>Interlocks:</strong> Safety trips and permissive conditions.
              </li>
              <li>
                <strong>Line identification:</strong> Pipe size, fluid, specification class.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Why electricians need P&amp;IDs">
            <p>
              The P&amp;ID identifies every electrical and electronic device in the process: motors,
              actuators, transmitters, switches, analysers, and control equipment. When a process
              problem occurs, the P&amp;ID tells you which instruments and actuators are involved,
              enabling you to focus your electrical fault-finding on the relevant equipment.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Instrument identification and tag numbers</ContentEyebrow>

          <ConceptBlock title="Instrument identification and tag numbers">
            <p>
              Every instrument on a P&amp;ID has a unique tag number following the ISA 5.1
              (ANSI/ISA-5.1) or BS EN 62424 convention. The tag number is your key for
              cross-referencing between the P&amp;ID and all other documentation — electrical
              drawings, loop diagrams, datasheets, calibration records, and CMMS records.
              Understanding the tag numbering system is essential.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">First letter (variable)</th>
                    <th className="py-2 pr-4 font-medium text-white">Meaning</th>
                    <th className="py-2 font-medium text-white">Common functions</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">F</td>
                    <td className="py-2 pr-4">Flow</td>
                    <td className="py-2">
                      FT (transmitter), FI (indicator), FIC (indicating controller)
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">T</td>
                    <td className="py-2 pr-4">Temperature</td>
                    <td className="py-2">TT (transmitter), TI (indicator), TSH (switch high)</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">P</td>
                    <td className="py-2 pr-4">Pressure</td>
                    <td className="py-2">PT (transmitter), PI (indicator), PSL (switch low)</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">L</td>
                    <td className="py-2 pr-4">Level</td>
                    <td className="py-2">
                      LT (transmitter), LIC (indicating controller), LAH (alarm high)
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">A</td>
                    <td className="py-2 pr-4">Analysis</td>
                    <td className="py-2">
                      AT (transmitter), AE (element/sensor), AIC (indicating controller)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              The loop number following the letters uniquely identifies the control loop. For
              example, FT-301 is the flow transmitter in loop 301, and FV-301 is the flow control
              valve in the same loop. This consistent numbering allows you to quickly identify all
              the components that make up a single control loop.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Control loops and signal paths</ContentEyebrow>

          <ConceptBlock title="Control loops and signal paths">
            <p>
              A control loop is the complete system that maintains a process variable at its desired
              setpoint. The P&amp;ID shows every element of the control loop: the sensing element,
              the transmitter, the signal path to the controller, the controller itself, and the
              final control element (usually a valve or motor). Understanding how these elements
              connect is essential for systematic fault-finding.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Control loop elements">
            <ol className="list-decimal space-y-2 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Sensing element.</strong> Measures the process variable (e.g., thermocouple,
                pressure tapping, orifice plate).
              </li>
              <li>
                <strong>Transmitter.</strong> Converts measurement to a standard signal (4-20 mA,
                HART, fieldbus).
              </li>
              <li>
                <strong>Controller.</strong> Compares measurement to setpoint, calculates correction
                (PID algorithm).
              </li>
              <li>
                <strong>Final control element.</strong> Adjusts the process (control valve, VSD
                motor, damper actuator).
              </li>
            </ol>
          </ConceptBlock>

          <ConceptBlock title="Signal line conventions">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Solid line:</strong> Process piping.
              </li>
              <li>
                <strong>Dashed line:</strong> Electrical signal.
              </li>
              <li>
                <strong>Line with crosses:</strong> Pneumatic signal (compressed air).
              </li>
              <li>
                <strong>Dashed line with dots:</strong> Hydraulic signal.
              </li>
              <li>
                <strong>Triple dash:</strong> Software/data link (DCS/PLC internal).
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Valves, actuators and motors on P&amp;IDs</ContentEyebrow>

          <ConceptBlock title="Valves, actuators and motors on P&amp;IDs">
            <p>
              Valves and actuators are among the most common items of equipment maintained by
              electrical technicians in process environments. The P&amp;ID shows every valve, its
              type, its actuator type, and its failure mode. Understanding these symbols allows you
              to identify the full scope of electrical maintenance required for the process system.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Valve types">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Gate valve — on/off isolation.</li>
              <li>Globe valve — throttling/control.</li>
              <li>Ball valve — quarter-turn on/off.</li>
              <li>Butterfly valve — large pipe control.</li>
              <li>Check valve — non-return (no actuator).</li>
              <li>Relief valve — overpressure safety.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Actuator types">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Electric (MOV) — motor-driven, position feedback.</li>
              <li>Pneumatic — air-operated, positioner.</li>
              <li>Hydraulic — high-force applications.</li>
              <li>Solenoid — small, fast on/off.</li>
              <li>Manual — handwheel or lever.</li>
              <li>Failure mode: FC, FO, or FIP.</li>
            </ul>
            <p>
              Motors driving pumps, compressors, fans and conveyors are also shown on the P&amp;ID
              with their tag numbers. The motor tag links to the electrical drawings showing the
              motor control circuit, power supply, and protection. Variable speed drives (VSDs) are
              indicated where applicable, as these require specific electrical maintenance
              procedures.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Cross-referencing P&amp;IDs with electrical documentation</ContentEyebrow>

          <ConceptBlock title="Cross-referencing P&amp;IDs with electrical documentation">
            <p>
              The P&amp;ID does not stand alone — it is part of a documentation hierarchy. For
              effective maintenance, you must be able to cross-reference between the P&amp;ID, loop
              diagrams, electrical drawings, instrument datasheets, and the CMMS. The instrument tag
              number is the golden thread that links all these documents together.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>P&amp;ID → Loop diagram:</strong> Tag number links to detailed wiring for
                that loop.
              </li>
              <li>
                <strong>P&amp;ID → Instrument datasheet:</strong> Tag number links to
                specifications, ranges, calibration data.
              </li>
              <li>
                <strong>P&amp;ID → Electrical SLD:</strong> Motor tags appear on both drawings.
              </li>
              <li>
                <strong>P&amp;ID → Cable schedule:</strong> Tag number links to cable reference and
                route.
              </li>
              <li>
                <strong>P&amp;ID → CMMS:</strong> Tag number is the asset identifier for maintenance
                records.
              </li>
              <li>
                <strong>P&amp;ID → Cause &amp; effect:</strong> Interlocks shown on P&amp;ID are
                detailed in C&amp;E matrix.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Safety instrumented systems"
            onSite="The ability to interpret P&ID and cross-reference with electrical documentation demonstrates the technical drawing competence required by the maintenance and operations engineering technician standard. This skill is essential for working effectively in any process-based industry."
          >
            <p>
              P&amp;IDs identify safety instrumented functions (SIFs) with their SIL ratings per BS
              EN 61511. These loops have mandatory proof-test intervals and specific maintenance
              procedures. As a maintenance technician, you must follow SIS test procedures exactly,
              record all results, and never bypass or defeat a safety function without formal
              authorisation through the management of change process.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Quick reference</ContentEyebrow>

          <ConceptBlock title="ISA 5.1 letter code quick reference">
            <p>
              <strong>ISA 5.1 first letters:</strong>
            </p>
            <ul className="list-disc space-y-1 pl-5 marker:text-elec-yellow/70">
              <li>F — Flow</li>
              <li>T — Temperature</li>
              <li>P — Pressure</li>
              <li>L — Level</li>
              <li>A — Analysis (composition)</li>
            </ul>
            <p>
              <strong>ISA 5.1 function letters:</strong>
            </p>
            <ul className="list-disc space-y-1 pl-5 marker:text-elec-yellow/70">
              <li>T — Transmitter</li>
              <li>I — Indicator</li>
              <li>C — Controller</li>
              <li>V — Valve (final element)</li>
              <li>S — Switch, A — Alarm, H — High, L — Low</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'P&ID: the definitive reference for a process system — equipment, piping, instrumentation and control shown together.',
              'ISA 5.1 / BS EN 62424 tag numbers: first letter is the measured variable, subsequent letters are the function, then a loop number.',
              'Control loop: sensing element → transmitter → controller → final control element.',
              'Signal lines: solid = process piping, dashed = electrical, crosses = pneumatic, dashed with dots = hydraulic, triple dash = software/data link.',
              'Valves and actuators carry a failure mode notation — FC, FO or FIP — that matters during a power or air supply failure.',
              'The tag number is the cross-reference: it links the P&ID to loop diagrams, datasheets, electrical drawings, cable schedules and the CMMS.',
              'Safety instrumented functions (SIFs) carry a SIL rating per BS EN 61511 — mandatory proof-test intervals, never bypassed without management of change.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module6-section2-2')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Wiring Diagrams
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module6-section2-4')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Labelling and Numbering Standards
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule6Section2_3;
