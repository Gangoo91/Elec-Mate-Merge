/**
 * MOET · Module 5 · Section 2 · Subsection 5 — PLC Programming Software
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
 *   Knowledge  · "Documentation requirements: documentation control,
 *                 auditable records."
 *              · "Electrical. Electrical fault-finding and rectification
 *                 techniques; diagnostic equipment."
 *   Skills     · "Record information."
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
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'PLC Programming Software - MOET Module 5 Section 2.5';
const DESCRIPTION =
  'Comprehensive guide to PLC programming software for electrical maintenance technicians. IEC 61131-3 languages, vendor platforms, online monitoring, backup procedures and configuration management. ST1426 aligned.';

const quickCheckQuestions = [
  {
    id: 'iec-languages',
    question: 'How many programming languages does IEC 61131-3 define?',
    options: [
      'Five: Ladder Diagram, Function Block Diagram, Structured Text, Instruction List and Sequential Function Chart',
      'Three: Ladder Diagram, Structured Text and Instruction List only',
      'Two: a graphical language and a text-based language',
      'Seven, one for each major PLC manufacturer',
    ],
    correctIndex: 0,
    explanation:
      'IEC 61131-3 defines five standard programming languages: Ladder Diagram (LD), Function Block Diagram (FBD), Structured Text (ST), Instruction List (IL, now deprecated) and Sequential Function Chart (SFC). Each has specific strengths for different application types.',
  },
  {
    id: 'online-mode',
    question: "What does 'going online' with PLC programming software mean?",
    options: [
      'Connecting the PLC to the internet so it can be reached remotely from anywhere',
      'Establishing live real-time communication between the software and PLC for monitoring and diagnostics',
      'Uploading the project to the manufacturer cloud for licence validation',
      'Switching the PLC from STOP mode to RUN mode without a programming laptop',
    ],
    correctIndex: 1,
    explanation:
      'Going online establishes a real-time communication link allowing you to monitor programme execution, view I/O states, check data values, read the diagnostic buffer, and (with authorisation) make programme changes. This is the primary maintenance diagnostic tool.',
  },
  {
    id: 'upload-download',
    question: 'What is the difference between upload and download in PLC software?',
    options: [
      'They are the same operation performed at different speeds',
      'Upload increases the programme execution speed; download reduces it',
      'Upload reads the programme from PLC to laptop; download writes from laptop to PLC',
      'Upload transfers inputs only; download transfers outputs only',
    ],
    correctIndex: 2,
    explanation:
      'Upload reads the programme from the PLC into the laptop (used for backup or comparison). Download writes the programme from the laptop into the PLC (used for commissioning, programme updates or restoration). Always verify the direction before executing — downloading the wrong programme can cause dangerous machine behaviour.',
  },
  {
    id: 'force-table',
    question: 'What is the purpose of the force table in PLC software?',
    options: [
      'Displaying the physical forces measured by connected load cells',
      'Listing the PLC model database used for hardware selection',
      'Displaying all Structured Text variable declarations in the project',
      'Showing all I/O points that have been manually overridden, bypassing programme logic',
    ],
    correctIndex: 3,
    explanation:
      'The force table lists all I/O points that have been manually forced to a specific state, bypassing normal programme logic. Forces are powerful diagnostic tools but extremely dangerous if left active — they can bypass safety interlocks. Always check the force table before leaving a PLC session.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Siemens TIA Portal is:',
    options: [
      'A communication protocol used to network Siemens PLCs to third-party devices',
      'An integrated software environment for programming and configuring Siemens PLCs, HMIs and drives',
      'A range of Siemens industrial Ethernet switches for the plant network',
      'A diagnostic display panel mounted on the front of Siemens S7 processors',
    ],
    correctAnswer: 1,
    explanation:
      "TIA Portal (Totally Integrated Automation Portal) is Siemens' integrated development environment for S7-1200/1500 PLCs, WinCC HMIs, and drive configuration. It combines all engineering tools in a single software platform.",
  },
  {
    id: 2,
    question: 'Allen-Bradley CompactLogix and ControlLogix PLCs are programmed using:',
    options: [
      'Siemens TIA Portal with the Rockwell add-on package installed',
      'Mitsubishi GX Works 3 in Allen-Bradley compatibility mode',
      'Rockwell Studio 5000 Logix Designer (formerly RSLogix 5000)',
      'CODESYS, the same multi-vendor environment used by Beckhoff and WAGO',
    ],
    correctAnswer: 2,
    explanation:
      "Rockwell Automation's CompactLogix and ControlLogix platforms are programmed via Studio 5000 Logix Designer. Older MicroLogix and SLC500 used RSLogix 500. Each manufacturer requires its own proprietary software.",
  },
  {
    id: 3,
    question: 'Structured Text (ST) is best described as:',
    options: [
      'A graphical language using rungs of contacts and coils, like a relay schematic',
      'A graphical language using interconnected blocks to show signal flow',
      'A low-level assembly-style language using single mnemonic instructions per line',
      'A high-level text-based language similar to Pascal, ideal for calculations and data manipulation',
    ],
    correctAnswer: 3,
    explanation:
      'Structured Text uses IF-THEN-ELSE, FOR loops, WHILE loops, and CASE statements. It excels at mathematical calculations, string processing, data manipulation, and complex algorithms that would be cumbersome in ladder logic.',
  },
  {
    id: 4,
    question: 'Before downloading a programme to a running PLC, you must:',
    options: [
      'Ensure the machine is in a safe state, personnel are clear, and a risk assessment has been completed',
      'Delete the existing programme from the PLC memory so the new one loads faster',
      'Force all outputs to ON so the machine keeps running during the transfer',
      'Disconnect the field wiring from the I/O modules to protect the processor',
    ],
    correctAnswer: 0,
    explanation:
      'Downloading can cause unexpected output changes, machine movements, or loss of the existing programme. The machine must be in a safe state, all personnel clear of hazards, with a documented risk assessment completed before proceeding.',
  },
  {
    id: 5,
    question: 'Hardware configuration in PLC software defines:',
    options: [
      'The order in which programme blocks are scanned by the processor',
      'The rack layout, installed modules, I/O addresses and communication network settings',
      'The password and access protection levels applied to the project',
      'The mathematical formulas used inside Structured Text calculation blocks',
    ],
    correctAnswer: 1,
    explanation:
      'The hardware configuration tells the PLC what modules are installed in each rack slot, their I/O addresses, communication parameters, and module-specific settings. A mismatch between configuration and physical hardware causes fault conditions.',
  },
  {
    id: 6,
    question: 'Cross-referencing in PLC software allows you to:',
    options: [
      'Connect two PLCs from different manufacturers together',
      'Convert programmes between different IEC 61131-3 languages',
      'Find every programme location where a specific address or tag is used',
      'Access internet resources from within the PLC software',
    ],
    correctAnswer: 2,
    explanation:
      'Cross-referencing shows every rung, block, or section where a given address is used — invaluable for tracing how conditions in one part of the programme affect outputs elsewhere. It is a fundamental diagnostic and programme comprehension tool.',
  },
  {
    id: 7,
    question: 'Function Block Diagram (FBD) is particularly suited for:',
    options: [
      'Editing the hardware rack layout and assigning I/O addresses',
      'Step-based sequential control processes with defined transitions',
      'Low-level instruction list programming on legacy controllers',
      'Continuous process control with analogue signal processing and PID loops',
    ],
    correctAnswer: 3,
    explanation:
      'FBD uses graphical blocks connected by signal lines, making it intuitive for analogue signal processing, mathematical operations, PID control, and data flow applications. It shows the signal flow clearly from inputs through processing to outputs.',
  },
  {
    id: 8,
    question: 'A programme comparison showing differences between the PLC and the backup means:',
    options: [
      'The programme has been modified since the last backup — investigation and documentation are needed',
      'The communication cable is faulty and the comparison should be ignored',
      'The PLC firmware version is newer than the software on the laptop',
      'The backup file is automatically the correct version and should be downloaded',
    ],
    correctAnswer: 0,
    explanation:
      'A mismatch indicates that someone has made changes to the running programme since the backup was taken. Investigate what was changed, why, and by whom. Update the backup and document the modifications. This is a key part of configuration management.',
  },
  {
    id: 9,
    question: 'Sequential Function Chart (SFC) is used for:',
    options: [
      'Mathematical calculations and data manipulation within a single routine',
      'Programming step-based sequential control processes with defined transitions',
      'Configuring network switches and communication infrastructure',
      'Designing motor protection relay settings',
    ],
    correctAnswer: 1,
    explanation:
      'SFC provides a graphical framework specifically designed for step sequences with transitions between steps. Each step can contain actions written in any IEC 61131-3 language. It directly implements the GRAFCET design methodology.',
  },
  {
    id: 10,
    question: 'PLC programme backups should be stored:',
    options: [
      'Only on the PLC memory card, since the processor already holds a copy',
      'On the maintenance technician personal laptop alone, for quick access',
      'In at least two separate locations with version control, date stamps and change notes',
      'In a single shared folder, overwriting the previous file each time',
    ],
    correctAnswer: 2,
    explanation:
      'Store backups in at least two separate locations (e.g., company server and local portable media) with clear version control including date, version number, programmer name, and change descriptions. Without a current backup, PLC failure or corruption means extended downtime while programmes are recreated.',
  },
  {
    id: 11,
    question: 'CODESYS is significant because it is:',
    options: [
      'The only software approved for programming Siemens S7-1500 processors',
      'A free version of Rockwell Studio 5000 for educational use',
      'A communication protocol that links PLCs from different manufacturers',
      'A manufacturer-independent IEC 61131-3 programming platform used by many PLC brands',
    ],
    correctAnswer: 3,
    explanation:
      'CODESYS is a manufacturer-independent IEC 61131-3 development environment used by many PLC brands including Beckhoff, WAGO, Festo, ABB, and others. Learning CODESYS gives transferable programming and diagnostic skills across multiple hardware platforms.',
  },
  {
    id: 12,
    question: 'Under ST1426, a maintenance technician uses PLC software primarily for:',
    options: [
      'Online monitoring, diagnostics, programme backup and restore procedures',
      'Configuring network switches and IT infrastructure',
      'Writing complete programmes from scratch for new machinery installations',
      'Designing HMI screens and operator interfaces',
    ],
    correctAnswer: 0,
    explanation:
      "ST1426 expects maintenance technicians to use PLC software competently for online monitoring and diagnostics (viewing programme execution, checking I/O states, reading diagnostic buffers), performing programme backup and restore, and communicating findings to controls engineers. Full programme development is typically the controls engineer's responsibility.",
  },
];

const faqs = [
  {
    question: 'Do I need different software for every PLC manufacturer?',
    answer:
      'Generally yes. Siemens uses TIA Portal (or STEP 7 for older S7-300/400), Allen-Bradley uses Studio 5000, Mitsubishi uses GX Works, Omron uses Sysmac Studio, and Schneider uses EcoStruxure Control Expert. Some manufacturers offer free or reduced-cost versions for basic PLC models. CODESYS is a notable exception as a multi-vendor platform used by many smaller brands.',
  },
  {
    question: 'Can I use a standard Windows laptop for PLC programming?',
    answer:
      "Yes, most PLC software runs on standard Windows laptops. You may need specific communication cables or adaptors (USB-serial, USB-MPI, Ethernet direct connection). Ensure the laptop meets the software's minimum requirements for processor, RAM, and operating system version. Install the correct drivers for communication interfaces before attempting to connect.",
  },
  {
    question: 'What happens if I accidentally download the wrong programme to a PLC?',
    answer:
      'Downloading overwrites the existing programme, potentially causing dangerous and unexpected machine behaviour. This is why backing up the existing programme BEFORE any download is essential. If the wrong programme is loaded, stop the PLC immediately and restore the correct programme from backup. If no backup exists, the programme may need to be recreated — this is why backup management is so critical.',
  },
  {
    question: 'What is CODESYS and why should I know about it?',
    answer:
      'CODESYS is a manufacturer-independent IEC 61131-3 development platform used by many PLC brands (Beckhoff, WAGO, Festo, ABB, Bosch Rexroth, and others). Learning CODESYS gives you skills transferable across multiple hardware platforms. The development environment supports all five IEC languages, simulation, visualisation, and network configuration.',
  },
  {
    question: 'How do I check if forces are active on a PLC?',
    answer:
      'Every PLC software has a force table or force overview function. Check this EVERY time you connect to a PLC and BEFORE you disconnect. Active forces bypass programme logic including safety interlocks. Most PLC front panels also have a force indicator LED. Make it standard practice to check for forces as part of every maintenance visit, even if you did not apply any yourself.',
  },
];

const MOETModule5Section2_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 5 · Section 5.2 · Subsection 5"
        title="PLC Programming Software"
        backTo="/study-centre/apprentice/m-o-e-t-module5-section2"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Software packages, development environments and IEC 61131-3 programming methods for PLC
            systems — what to expect from the tool, whichever brand you meet on site.
          </p>

          <TLDR
            points={[
              'IEC 61131-3: Five standard programming languages (LD, FBD, ST, IL, SFC).',
              'Vendor-specific: TIA Portal, Studio 5000, GX Works, Sysmac Studio.',
              'Online mode: Real-time monitoring for maintenance diagnosis.',
              'Backup: Always keep current versioned copies of all programmes.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify the five IEC 61131-3 programming languages and their applications',
              'Navigate PLC software for online monitoring and diagnostics',
              'Explain the difference between upload and download operations',
              'Use cross-referencing to trace addresses throughout a programme',
              'Perform programme backup and restore procedures correctly',
              'Understand the role of hardware configuration in PLC systems',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="Electrical maintenance context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Diagnostics:</strong> Online monitoring is the primary fault-finding tool.
              </li>
              <li>
                <strong>Cross-reference:</strong> Trace addresses across the entire programme.
              </li>
              <li>
                <strong>Backup/restore:</strong> Critical for recovery from PLC failure.
              </li>
              <li>
                <strong>ST1426:</strong> Using PLC software as a diagnostic tool.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>IEC 61131-3 programming languages</ContentEyebrow>

          <ConceptBlock title="The same five languages, whatever brand is on the panel">
            <p>
              IEC 61131-3 is the international standard that defines five programming languages for
              programmable controllers. While each PLC manufacturer implements these languages in
              their own software with differing interfaces, the fundamental concepts remain the same
              across all platforms. Understanding these languages gives you transferable knowledge
              that applies regardless of the PLC brand you encounter on site.
            </p>
          </ConceptBlock>

          <ConceptBlock title="The five IEC 61131-3 languages">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Language</th>
                    <th className="py-2 pr-4 font-medium text-white">Type</th>
                    <th className="py-2 pr-4 font-medium text-white">Best suited for</th>
                    <th className="py-2 font-medium text-white">Maintenance relevance</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Ladder Diagram (LD)</td>
                    <td className="py-2 pr-4">Graphical</td>
                    <td className="py-2 pr-4">Discrete logic, motor control</td>
                    <td className="py-2">Most common — primary skill</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Function Block (FBD)</td>
                    <td className="py-2 pr-4">Graphical</td>
                    <td className="py-2 pr-4">Process control, PID, analogue</td>
                    <td className="py-2">Frequently encountered</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Structured Text (ST)</td>
                    <td className="py-2 pr-4">Text</td>
                    <td className="py-2 pr-4">Calculations, data handling</td>
                    <td className="py-2">Increasingly common</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Instruction List (IL)</td>
                    <td className="py-2 pr-4">Text</td>
                    <td className="py-2 pr-4">Legacy systems only</td>
                    <td className="py-2">Deprecated — older sites</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">SFC</td>
                    <td className="py-2 pr-4">Graphical</td>
                    <td className="py-2 pr-4">Sequential processes</td>
                    <td className="py-2">Batch and process plants</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Most industrial programmes use a combination of languages within the same project.
              Ladder logic handles the discrete control (motor start/stop, interlocking), FBD
              manages analogue signal processing and PID loops, and Structured Text handles complex
              calculations and data manipulation. SFC provides the overall sequential framework in
              batch processes. As a maintenance technician, you will most frequently work with
              ladder logic, but encountering FBD and ST sections is increasingly common.
            </p>
            <p>
              <strong>Maintenance tip:</strong> Even if you cannot write Structured Text, you should
              be able to recognise common constructs (IF-THEN-ELSE, FOR loops) and identify the
              variables involved. When you encounter ST in online monitoring, the current variable
              values are displayed alongside the code, allowing you to follow the logic flow.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Manufacturer software platforms</ContentEyebrow>

          <ConceptBlock title="Standard concepts, proprietary tools">
            <p>
              Each PLC manufacturer provides proprietary programming software. While the IEC 61131-3
              languages are standardised in concept, the software interfaces, project structures,
              communication methods, and diagnostic tools differ significantly between platforms. As
              a maintenance technician, you may need to work with several different platforms
              depending on the equipment installed on your site.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Major PLC software platforms">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Siemens TIA Portal:</strong> S7-1200, S7-1500, ET 200SP, WinCC HMI.
                Integrated engineering with hardware config, programming, HMI design, and drive
                commissioning in one environment.
              </li>
              <li>
                <strong>Rockwell Studio 5000:</strong> CompactLogix, ControlLogix. Tag-based
                programming with extensive add-on instruction library. Formerly RSLogix 5000.
              </li>
              <li>
                <strong>Mitsubishi GX Works 3:</strong> iQ-R, iQ-F series. GX Works 2 for older FX
                and Q series. Strong presence in packaging and discrete manufacturing in the UK.
              </li>
              <li>
                <strong>Omron Sysmac Studio:</strong> NX/NJ series controllers. Integrated motion,
                safety, and vision in one platform. Uses EtherCAT for field communication.
              </li>
              <li>
                <strong>Schneider EcoStruxure Control Expert:</strong> Modicon M340, M580.
                Previously Unity Pro. Common in process and infrastructure applications.
              </li>
              <li>
                <strong>CODESYS:</strong> Multi-vendor platform used by Beckhoff, WAGO, Festo, and
                many others. Learning CODESYS gives transferable skills across brands.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Software licensing">
            <p>
              PLC software licences can be expensive. Some manufacturers offer free versions for
              basic PLC models (e.g. Siemens TIA Portal Basic for S7-1200, Mitsubishi GX Works 3 for
              FX5U). Check whether your site has the correct licences installed and maintained.
              Using unlicensed software can result in limited functionality or legal issues.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Online monitoring and diagnostics</ContentEyebrow>

          <ConceptBlock title="The single most valuable feature for maintenance">
            <p>
              Online monitoring is the single most valuable feature of PLC software for maintenance
              technicians. It provides real-time observation of programme execution, I/O states,
              data values, and system diagnostics — transforming the PLC from an opaque black box
              into a transparent diagnostic tool that shows you exactly what is happening inside the
              control system.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Key online features">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Live logic display:</strong> See active contacts, energised coils, and power
                flow through ladder rungs in real time.
              </li>
              <li>
                <strong>Watch tables:</strong> Create custom lists of specific variables to monitor
                timer values, counter states, analogue readings, and data registers.
              </li>
              <li>
                <strong>Cross-reference:</strong> Find every location in the programme where a
                specific address or tag is referenced.
              </li>
              <li>
                <strong>Force table:</strong> View and manage manually forced I/O points — critical
                for safety.
              </li>
              <li>
                <strong>Diagnostic buffer:</strong> Read the timestamped fault history log to
                understand what happened and when.
              </li>
              <li>
                <strong>Programme comparison:</strong> Compare the running programme against a
                backup to detect unauthorised changes.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Making programme changes without authorisation"
            whatHappens={
              <>
                Even apparently minor changes can cause unexpected and potentially dangerous machine
                behaviour if made to a running PLC without proper controls.
              </>
            }
            doInstead={
              <>
                Never make programme changes to a running PLC without a documented risk assessment,
                proper authorisation, and safe working procedures in place. Online monitoring for
                diagnostics is safe; online editing requires formal management-of-change procedures.
              </>
            }
          />

          <ConceptBlock title="Maintenance tip: check the force table before disconnecting">
            <p>
              Before disconnecting from a PLC session, always check the force table to ensure no
              forces are active. A forgotten force can bypass safety interlocks and has been the
              root cause of serious industrial accidents. Make checking for forces part of your
              standard PLC disconnection procedure.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Backup, restore and configuration management</ContentEyebrow>

          <ConceptBlock title="A current backup turns a disaster into an inconvenience">
            <p>
              Maintaining current, verified programme backups is one of the most critical
              maintenance responsibilities. Without a backup, a PLC CPU failure, memory corruption,
              or accidental programme deletion means extended downtime while programmes are
              painstakingly recreated — often from scratch if documentation is poor. A current
              backup can reduce recovery time from days to hours or even minutes.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Backup best practice">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Timing:</strong> Back up after every programme change, no matter how small.
              </li>
              <li>
                <strong>Storage:</strong> Maintain copies in at least two separate locations (e.g.
                company server and local portable media).
              </li>
              <li>
                <strong>Versioning:</strong> Include date, version number, programmer name, and
                description of changes in the file name or project notes.
              </li>
              <li>
                <strong>Completeness:</strong> Back up the entire project — programme, hardware
                configuration, HMI screens, drive parameters, network configuration.
              </li>
              <li>
                <strong>Verification:</strong> Periodically verify that backups can be successfully
                restored by doing a test restore (to a spare PLC or simulator, never to the
                production unit without cause).
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Hardware configuration">
            <p>The hardware configuration defines the physical PLC system within the software:</p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Rack layout:</strong> Which modules are in which slots.
              </li>
              <li>
                <strong>Module parameters:</strong> Input filtering, output behaviour, diagnostic
                settings.
              </li>
              <li>
                <strong>I/O addresses:</strong> How physical terminals map to programme addresses.
              </li>
              <li>
                <strong>Communication:</strong> Network addresses, protocol settings, device
                assignments.
              </li>
            </ul>
            <p>
              A mismatch between the hardware configuration and the physical modules installed
              causes fault conditions. When replacing a module, ensure it is the exact same type and
              revision — or update the hardware configuration accordingly.
            </p>
            <p>
              <strong>ST1426:</strong> Configuration management and backup/restore procedures are
              core maintenance competencies. Technicians must be able to upload, compare, and
              restore PLC programmes as part of planned and reactive maintenance activities.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Communication and connectivity</ContentEyebrow>

          <ConceptBlock title="Getting connected is the first step in any online session">
            <p>
              Connecting the programming laptop to the PLC is the first step in any online
              diagnostic session. The communication method depends on the PLC manufacturer, model,
              and the available interfaces. Modern PLCs predominantly use Ethernet, but older
              systems may require serial, USB, or proprietary cables. Understanding the
              communication options for your site&apos;s PLCs ensures you can connect quickly when a
              fault occurs.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Connection types">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Connection type</th>
                    <th className="py-2 pr-4 font-medium text-white">Cable/adaptor</th>
                    <th className="py-2 font-medium text-white">Typical use</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Ethernet (TCP/IP)</td>
                    <td className="py-2 pr-4">Standard RJ45 patch cable</td>
                    <td className="py-2">Modern PLCs (S7-1200/1500, CompactLogix)</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">USB</td>
                    <td className="py-2 pr-4">USB-A to USB-Mini/Micro</td>
                    <td className="py-2">Small PLCs (Mitsubishi FX5U, some Siemens)</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Serial RS-232</td>
                    <td className="py-2 pr-4">USB-to-serial adaptor + cable</td>
                    <td className="py-2">Older PLCs (Mitsubishi FX, older Omron)</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">MPI/Profibus</td>
                    <td className="py-2 pr-4">USB-MPI/DP adaptor (Siemens)</td>
                    <td className="py-2">Siemens S7-300/400 legacy systems</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Connection troubleshooting">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cannot find PLC:</strong> Check IP address settings — the laptop must be on
                the same subnet as the PLC.
              </li>
              <li>
                <strong>Connection drops:</strong> Check cable quality, ensure no firewall is
                blocking the PLC communication ports.
              </li>
              <li>
                <strong>Wrong driver:</strong> Ensure the correct communication driver is installed
                and selected in the software.
              </li>
              <li>
                <strong>Access protection:</strong> Some PLCs have password protection — you need
                the correct credentials.
              </li>
            </ul>
            <p className="italic">
              Under ST1426, maintenance technicians are expected to be competent in connecting to
              PLCs using the appropriate software and communication methods, performing online
              diagnostics, managing programme backups, and documenting their findings. These skills
              are fundamental to efficient maintenance of modern automated plant and machinery.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'IEC 61131-3 defines five languages: Ladder Diagram (discrete logic), Function Block Diagram (analogue/PID), Structured Text (calculations), Instruction List (deprecated) and Sequential Function Chart (step sequences).',
              'Upload reads the programme from the PLC to the laptop (backup/comparison); download writes from laptop to PLC (commissioning/restore) — always verify the direction before executing.',
              'The force table lists every I/O point manually overridden, bypassing programme logic including safety interlocks — check it every time you connect and before you disconnect.',
              'Never edit a running PLC programme without a documented risk assessment, authorisation and safe working procedure; online monitoring for diagnosis is safe, online editing is not routine.',
              'Back up after every change, in at least two locations, with date/version/author/change notes, covering the whole project — programme, hardware config, HMI, drive parameters, network settings.',
              'A comparison mismatch between the running programme and the backup means someone changed the programme since the last backup — investigate, document, and update the backup.',
              'The hardware configuration (rack layout, module parameters, I/O addresses, comms settings) must match the physical modules exactly, or the PLC raises a fault condition.',
              'Each manufacturer needs its own software (TIA Portal, Studio 5000, GX Works, Sysmac Studio, EcoStruxure Control Expert) except CODESYS, a multi-vendor platform used by several smaller brands.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section2-4')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Timers, Counters and Sequencing
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section2-6')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Troubleshooting PLC Systems
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule5Section2_5;
