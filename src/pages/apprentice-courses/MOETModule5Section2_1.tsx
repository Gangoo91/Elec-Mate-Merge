/**
 * MOET · Module 5 · Section 2 · Subsection 1 — PLC Hardware and Architecture
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
 *   Knowledge  · "Electrical. Electrical fault-finding and rectification
 *                 techniques; diagnostic equipment."
 *              · "Electrical. Functions and applications of electrical
 *                 circuits."
 *   Skills     · "Electrical. Electrical maintenance tools, measurement, and
 *                 test equipment application, operation, care and
 *                 calibration requirements."
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt. This is the
 * first subsection of Section 5.2, so the masthead and left nav button both
 * point back to the section overview rather than a previous subsection,
 * matching the original page.
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
  ContentEyebrow,
  SectionRule,
  VideoCard,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'PLC Hardware and Architecture - MOET Module 5 Section 2.1';
const DESCRIPTION =
  'Comprehensive guide to PLC hardware and architecture for electrical maintenance technicians: CPU modules, memory types, power supplies, rack systems, modular and compact PLCs. ST1426 aligned.';

const quickCheckQuestions = [
  {
    id: 'plc-cpu-role',
    question: 'What is the primary function of the CPU module in a PLC?',
    options: [
      'To execute the stored program by reading inputs, processing logic and updating outputs',
      'To convert the incoming mains supply into regulated DC voltages',
      'To interface directly between field devices and the program',
      'To provide network connectivity to other controllers and HMIs',
    ],
    correctIndex: 0,
    explanation:
      'The CPU is the brain of the PLC. It continuously executes the scan cycle: reading all inputs, processing the program logic, and updating the outputs. This cycle typically takes between 1 and 100 milliseconds depending on program complexity and CPU speed.',
  },
  {
    id: 'plc-memory-types',
    question: 'Which type of PLC memory retains its contents when power is removed?',
    options: [
      'Non-backed RAM holding the input/output image tables',
      'The volatile working registers used during the scan',
      'Flash memory or EEPROM (non-volatile memory)',
      'The temporary buffers used for communications',
    ],
    correctIndex: 2,
    explanation:
      'Flash memory and EEPROM are non-volatile — they retain data when power is removed. The PLC program is stored in non-volatile memory so it is not lost during a power failure. RAM is used for the working data (input/output image tables, timers, counters) and is volatile, meaning it is cleared when power is lost.',
  },
  {
    id: 'plc-scan-cycle',
    question: 'The correct order of the PLC scan cycle is:',
    options: [
      'Update outputs, read inputs, execute program',
      'Execute program, update outputs, read inputs',
      'Read inputs, update outputs, execute program',
      'Read inputs, execute program, update outputs',
    ],
    correctIndex: 3,
    explanation:
      'The PLC scan cycle follows a fixed sequence: (1) Read all inputs into the input image table, (2) Execute the program logic using the input image table data, (3) Update all physical outputs from the output image table. This cycle then repeats continuously. The scan time is the total time for one complete cycle.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'A PLC is best described as:',
    options: [
      'A standard desktop computer adapted for office automation tasks',
      'A ruggedised industrial computer designed to control machines and processes using a stored program',
      'A hardwired relay panel with no reprogrammable logic',
      'A single sensor that converts a physical input into a digital signal',
    ],
    correctAnswer: 1,
    explanation:
      'A Programmable Logic Controller (PLC) is a purpose-built industrial computer designed to withstand harsh environments (vibration, temperature, electrical noise) while reliably controlling machines and processes. It replaces hardwired relay logic with a flexible, reprogrammable system.',
  },
  {
    id: 2,
    question: 'In a modular PLC system, what is the purpose of the backplane?',
    options: [
      'To convert mains AC into the regulated DC the modules need',
      'To store the working program and retentive data values',
      'To provide the communication bus and power distribution between the CPU and I/O modules',
      'To filter electrical noise from the incoming field wiring',
    ],
    correctAnswer: 2,
    explanation:
      'The backplane (or rack) provides the physical mounting for modules and the electrical connections between them. It carries the data bus (for communication between CPU and I/O modules), the address bus (for module identification), and the power bus (for distributing the PSU output to all modules).',
  },
  {
    id: 3,
    question: 'The PLC scan time is affected by:',
    options: [
      'The ambient temperature of the control panel only',
      'The colour coding of the field wiring',
      'The number of HMI screens connected to the network',
      'The length of the program, the number of I/O points and the CPU processing speed',
    ],
    correctAnswer: 3,
    explanation:
      'Scan time depends on: the number of instructions in the program (longer programs take more time to execute), the number of I/O points (more points take longer to read/write), and the CPU speed (faster processors complete each instruction more quickly). Typical scan times range from 1 ms for small programs to 100 ms for very large systems.',
  },
  {
    id: 4,
    question:
      'What happens to the PLC outputs if the CPU detects a fatal error during program execution?',
    options: [
      'The CPU enters FAULT mode and all outputs are switched off (de-energised) for safety',
      'All outputs are latched in their last known state until reset',
      'The CPU restarts the program automatically with no warning',
      'The outputs are set to a default ON state to keep the plant running',
    ],
    correctAnswer: 0,
    explanation:
      'When a fatal error is detected (such as a watchdog timer timeout, memory fault or hardware failure), the CPU enters FAULT mode and de-energises all outputs. This is a fundamental safety feature — the PLC defaults to a safe state rather than leaving outputs in an unpredictable condition. The fault must be diagnosed and cleared before the PLC can be restarted.',
  },
  {
    id: 5,
    question: 'The watchdog timer in a PLC is used to:',
    options: [
      'Switch the PLC into RUN mode automatically on power-up',
      'Detect if the scan cycle takes longer than expected, indicating a program or hardware fault',
      'Count the number of times each output is energised',
      'Synchronise the scan cycle with the mains supply frequency',
    ],
    correctAnswer: 1,
    explanation:
      'The watchdog timer monitors the scan cycle duration. If a scan takes longer than the configured maximum (indicating the program is stuck in a loop or the CPU has a fault), the watchdog triggers a fault and shuts down the outputs. This prevents the PLC from running in an uncontrolled state.',
  },
  {
    id: 6,
    question: 'A compact (fixed) PLC differs from a modular PLC in that:',
    options: [
      'It can be expanded almost without limit by adding I/O racks',
      'It has no CPU and relies on an external processor',
      'The CPU, power supply and a fixed number of I/O points are all in one unit',
      'It cannot be reprogrammed once installed on site',
    ],
    correctAnswer: 2,
    explanation:
      'Compact PLCs integrate the CPU, power supply and a fixed set of I/O in a single housing. They are cost-effective for small applications but offer limited expandability. Modular PLCs use separate modules for CPU, PSU and I/O, mounted on a rack, allowing flexible configuration and easy expansion.',
  },
  {
    id: 7,
    question: 'The input image table in a PLC stores:',
    options: [
      'The compiled program ready for execution by the CPU',
      'The final states written out to the physical outputs',
      'The firmware and configuration settings of the CPU',
      'A snapshot of all input states taken at the start of each scan cycle',
    ],
    correctAnswer: 3,
    explanation:
      'At the start of each scan, the PLC reads all physical inputs and stores their states (ON/OFF for digital, numerical values for analogue) in the input image table. The program then uses this table rather than reading the physical inputs directly. This ensures consistent data throughout the scan — inputs do not change mid-scan.',
  },
  {
    id: 8,
    question: 'When replacing a PLC CPU module, the maintenance technician should:',
    options: [
      'Isolate the power, note the firmware version, transfer the program, verify configuration and test before returning to service',
      'Swap the module live to avoid losing the working data',
      'Fit any spare CPU without checking the firmware version',
      'Leave the program backup until after the new CPU is running',
    ],
    correctAnswer: 0,
    explanation:
      'Replacing a CPU requires: isolating power (safe isolation procedure), recording the firmware version and configuration of the old CPU, downloading the correct program to the new CPU, verifying all configuration parameters (IP address, I/O mapping, communication settings), and performing a thorough test of all I/O and program functions before returning to service.',
  },
  {
    id: 9,
    question: 'Battery-backed RAM in a PLC is used to:',
    options: [
      'Permanently store the PLC firmware and operating system',
      'Retain program data, timer values and counter values during short power outages',
      'Power the field devices when the mains supply fails',
      'Convert the incoming supply into regulated DC for the backplane',
    ],
    correctAnswer: 1,
    explanation:
      'Battery-backed RAM retains volatile data (such as timer accumulated values, counter values, retentive data registers and sometimes the program) during power failures. The battery is typically a lithium cell with a life of 3-5 years. Low battery warnings should be acted upon promptly to prevent data loss.',
  },
  {
    id: 10,
    question: 'A PLC power supply module typically provides:',
    options: [
      'The data and address bus connections between modules',
      'A snapshot of all input states at the start of each scan',
      'Regulated DC voltages (commonly 5 V for the backplane logic and 24 V for I/O) from the mains supply',
      'Network connectivity to other controllers and HMIs',
    ],
    correctAnswer: 2,
    explanation:
      'The PLC PSU converts the incoming supply (typically 110/230 V AC or 24 V DC) into the regulated DC voltages needed by the system. The backplane logic typically runs on 5 V DC, while I/O modules and field devices commonly use 24 V DC. The PSU must be rated to supply the total current demand of all installed modules.',
  },
];

const faqs = [
  {
    question: 'What is the difference between a PLC and a PAC?',
    answer:
      'A PAC (Programmable Automation Controller) is an evolution of the PLC that combines traditional PLC functionality with features more commonly found in PCs — such as advanced data processing, multiple programming languages, database connectivity and built-in networking. In practice, the boundary between PLCs and PACs has become blurred, with modern PLCs offering many PAC-like features. The maintenance approach is fundamentally the same.',
  },
  {
    question: 'How often should PLC batteries be replaced?',
    answer:
      "Most PLC manufacturers recommend replacing the backup battery every 2-3 years, regardless of whether a low battery alarm has been triggered. Many organisations include battery replacement in their planned preventive maintenance schedule. Always replace the battery with the PLC powered on (if the manufacturer's instructions allow this) to prevent data loss during the changeover.",
  },
  {
    question: 'Can I hot-swap I/O modules on a running PLC?',
    answer:
      "Some modern PLC platforms support hot-swapping of I/O modules — removing and replacing a module without shutting down the CPU. However, this is not universal and depends on the PLC manufacturer and model. Always check the manufacturer's documentation before attempting a hot-swap. Even where supported, a risk assessment should be carried out to consider the effect of temporarily losing the affected I/O points.",
  },
  {
    question: 'What environmental conditions should a PLC be installed in?',
    answer:
      'PLCs are designed for industrial environments but still have operating limits. Typical specifications include: ambient temperature 0-60 degrees C, relative humidity 5-95% non-condensing, no corrosive gases, and installation in a suitable enclosure (typically IP54 or better). The enclosure should provide adequate ventilation or cooling if heat dissipation from the PLC and other panel components is significant.',
  },
];

const MOETModule5Section2_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 5 · Section 5.2 · Subsection 1"
        title="PLC Hardware and Architecture"
        backTo="/study-centre/apprentice/m-o-e-t-module5-section2"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            CPU modules, memory types, power supplies and system architecture — the hardware behind
            every PLC-controlled plant you will maintain.
          </p>

          <TLDR
            points={[
              'PLC: Ruggedised industrial computer for machine/process control.',
              'Scan cycle: Read inputs, execute program, update outputs (repeat).',
              'Architecture: CPU, PSU, I/O modules on a backplane/rack.',
              'Memory: Non-volatile (program storage) + RAM (working data).',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify the main hardware components of a PLC system',
              'Explain the function of the CPU, PSU and backplane',
              'Describe the PLC scan cycle and its significance for maintenance',
              'Distinguish between volatile and non-volatile memory in PLCs',
              'Compare compact and modular PLC architectures',
              'Apply safe maintenance procedures when working on PLC hardware',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="Maintenance context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Fault LEDs:</strong> CPU status, module faults, communication errors.
              </li>
              <li>
                <strong>Battery:</strong> Replace every 2-3 years to protect retentive data.
              </li>
              <li>
                <strong>Program backup:</strong> Always maintain current backup before maintenance.
              </li>
              <li>
                <strong>ST1426:</strong> Maps to control systems and automation KSBs.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>What is a PLC?</ContentEyebrow>

          <ConceptBlock title="A ruggedised computer that replaced the relay panel">
            <p>
              A Programmable Logic Controller (PLC) is a purpose-built industrial computer designed
              to control manufacturing processes, machines and other automated systems. Developed in
              the late 1960s to replace hardwired relay panels, PLCs offer the flexibility of
              software-based control with the reliability and ruggedness needed for industrial
              environments.
            </p>
            <p>
              Unlike general-purpose computers, PLCs are designed to operate in harsh conditions:
              temperature extremes, vibration, electrical noise, dust and humidity. They use
              specialised input/output (I/O) modules to interface directly with field devices such
              as sensors, switches, motors, valves and indicator lights.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Key PLC characteristics">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Deterministic operation:</strong> The scan cycle executes in a predictable,
                repeatable time.
              </li>
              <li>
                <strong>Real-time control:</strong> Outputs respond to input changes within the scan
                time (typically milliseconds).
              </li>
              <li>
                <strong>Rugged construction:</strong> Designed for industrial environments with wide
                temperature ranges and high vibration.
              </li>
              <li>
                <strong>Modular design:</strong> I/O capacity can be expanded by adding modules to
                the rack.
              </li>
              <li>
                <strong>Multiple programming languages:</strong> Ladder logic, function block,
                structured text, instruction list, sequential function chart (IEC 61131-3).
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>PLC system architecture</ContentEyebrow>

          <ConceptBlock title="Several components, one rack">
            <p>
              A typical modular PLC system consists of several key components mounted on a rack or
              baseplate. Understanding the function of each component is essential for effective
              maintenance and fault diagnosis.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Component functions and maintenance notes">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Component</th>
                    <th className="py-2 pr-4 font-medium text-white">Function</th>
                    <th className="py-2 font-medium text-white">Maintenance notes</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Rack / Backplane</td>
                    <td className="py-2 pr-4">
                      Physical mounting and electrical interconnection of all modules
                    </td>
                    <td className="py-2">
                      Check for corrosion on bus connectors; ensure modules are fully seated
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Power Supply (PSU)</td>
                    <td className="py-2 pr-4">
                      Converts mains supply to regulated DC for all modules
                    </td>
                    <td className="py-2">
                      Check output voltage, verify current capacity for installed modules
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">CPU Module</td>
                    <td className="py-2 pr-4">
                      Executes the stored program, manages communications
                    </td>
                    <td className="py-2">
                      Monitor LED indicators, check battery status, maintain program backups
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">I/O Modules</td>
                    <td className="py-2 pr-4">Interface between field devices and the CPU</td>
                    <td className="py-2">
                      Check LED status indicators, verify terminal connections, test with known
                      inputs
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">Communication Modules</td>
                    <td className="py-2 pr-4">
                      Provide network connectivity (Ethernet/IP, Profinet, Modbus)
                    </td>
                    <td className="py-2">
                      Check link LEDs, verify IP addresses, monitor error counters
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Compact PLCs">
            <p>
              All-in-one units with CPU, PSU and a fixed number of I/O points in a single housing.
              Ideal for small applications (typically 10-40 I/O points). Lower cost but limited
              expandability. Examples include the Siemens S7-1200 and Allen-Bradley Micro800 series.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Modular PLCs">
            <p>
              Separate modules for CPU, PSU and I/O mounted on a rack. Highly flexible and
              expandable — modules can be added, removed or changed to suit the application. Used
              for medium to large systems (hundreds to thousands of I/O points). Examples include
              Siemens S7-1500 and Allen-Bradley ControlLogix.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>The PLC scan cycle</ContentEyebrow>

          <ConceptBlock title="The fundamental operating principle of every PLC">
            <p>
              The scan cycle is the fundamental operating principle of every PLC. Understanding it
              is critical for both programming and maintenance, as it determines how quickly the PLC
              responds to input changes and how program logic is executed.
            </p>
          </ConceptBlock>

          <ConceptBlock title="The three phases">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Phase 1 — Input scan:</strong> The CPU reads the state of all physical
                inputs and stores them in the input image table (a block of memory). All program
                decisions during this scan are based on this snapshot.
              </li>
              <li>
                <strong>Phase 2 — Program execution:</strong> The CPU executes the program from the
                first instruction to the last, using the input image table for input data and
                writing results to the output image table.
              </li>
              <li>
                <strong>Phase 3 — Output update:</strong> The CPU writes the entire output image
                table to the physical outputs simultaneously. All outputs change at the same moment.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Scan time and response"
            whatHappens={
              <>
                A very short input pulse (shorter than one scan cycle) could be missed entirely
                because the input might be ON between scans. When fault-finding, remember that the
                PLC only &apos;sees&apos; what was present during the input scan phase.
              </>
            }
            doInstead={
              <>
                For critical fast inputs, use the PLC&apos;s high-speed counter inputs and
                interrupt-driven routines, which operate outside the normal scan cycle rather than
                relying on it to catch a fast pulse.
              </>
            }
          />

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Memory types and program storage</ContentEyebrow>

          <ConceptBlock title="Several memory areas, each with a different job">
            <p>
              PLC memory is divided into several areas, each serving a different purpose.
              Understanding memory architecture is important for maintenance, particularly when
              backing up programs, replacing CPUs or diagnosing data-related faults.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Memory types">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Memory type</th>
                    <th className="py-2 pr-4 font-medium text-white">Volatile?</th>
                    <th className="py-2 font-medium text-white">Contents</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Flash / EEPROM</td>
                    <td className="py-2 pr-4">Non-volatile</td>
                    <td className="py-2">Program storage, firmware, configuration</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">RAM (battery-backed)</td>
                    <td className="py-2 pr-4">Volatile (battery protected)</td>
                    <td className="py-2">
                      Working program, retentive data registers, timer/counter values
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">RAM (non-backed)</td>
                    <td className="py-2 pr-4">Volatile</td>
                    <td className="py-2">
                      Input/output image tables, temporary data, system overhead
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Memory card slot</td>
                    <td className="py-2 pr-4">Non-volatile (removable)</td>
                    <td className="py-2">Program backup, data logging, recipe storage</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              <strong>Maintenance tip:</strong> Always maintain a current backup of the PLC program
              on a memory card and/or on a secure network location. Before performing any
              maintenance that involves powering down the PLC or replacing hardware, verify that the
              backup is current and can be restored.
            </p>
          </ConceptBlock>

          <SectionRule />

          <VideoCard
            url="https://www.youtube.com/watch?v=uOtdWHMKhnw"

            title="PLC Basics — Programmable Logic Controllers Explained"

            channel="The Engineering Mindset"

            duration="15:11"

            topic="Scan cycle, I/O and where the program actually lives"

            caption="Builds the PLC up from the scan cycle, so the timing behaviour you meet later in ladder logic has somewhere to attach."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Scan cycle: read all inputs to the image table, execute the program logic, update all outputs from the image table, then housekeeping/communications, repeating continuously.',
              'CPU status LEDs: RUN (green) programme executing normally, STOP (amber) programme halted, FAULT (red) fatal error, COMM (flashing) communication active, BAT (amber) low battery warning.',
              'The CPU only ever "sees" the input states captured at the start of the scan — a pulse shorter than the scan time can be missed unless high-speed counter or interrupt inputs are used.',
              'Flash/EEPROM holds the program non-volatilely; battery-backed RAM holds retentive data and survives short outages; non-backed RAM (image tables) is lost on power-down.',
              'Compact PLCs integrate CPU, PSU and fixed I/O in one housing for small systems; modular PLCs use separate rack-mounted modules for medium to large, expandable systems.',
              'A watchdog timer trips the CPU into FAULT mode — de-energising all outputs — if a scan takes longer than its configured maximum, which is a safety feature, not a nuisance trip.',
              'Replacing a CPU means: isolate, record firmware version and configuration, download the correct program to the new unit, verify configuration, then test fully before returning to service.',
              'Always keep a current, restorable backup of the PLC program before any maintenance that powers down the PLC or replaces hardware.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section2')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Back to section
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Section 5.2 overview
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section2-2')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Input/Output Devices
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule5Section2_1;
