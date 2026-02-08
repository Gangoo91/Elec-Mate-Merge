import { ArrowLeft, Monitor, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "PLC Programming Software - MOET Module 5 Section 2.5";
const DESCRIPTION = "Comprehensive guide to PLC programming software for electrical maintenance technicians. IEC 61131-3 languages, vendor platforms, online monitoring, backup procedures and configuration management. ST1426 aligned.";

const quickCheckQuestions = [
  {
    id: "iec-languages",
    question: "How many programming languages does IEC 61131-3 define?",
    options: [
      "Three graphical languages only",
      "Five: Ladder Diagram, Function Block Diagram, Structured Text, Instruction List and Sequential Function Chart",
      "Seven including proprietary vendor languages",
      "Two: ladder logic and structured text only"
    ],
    correctIndex: 1,
    explanation: "IEC 61131-3 defines five standard programming languages: Ladder Diagram (LD), Function Block Diagram (FBD), Structured Text (ST), Instruction List (IL, now deprecated) and Sequential Function Chart (SFC). Each has specific strengths for different application types."
  },
  {
    id: "online-mode",
    question: "What does 'going online' with PLC programming software mean?",
    options: [
      "Connecting the PLC to the internet for remote access",
      "Establishing live real-time communication between the software and PLC for monitoring and diagnostics",
      "Uploading the PLC programme to a cloud storage service",
      "Switching the PLC from STOP to RUN mode"
    ],
    correctIndex: 1,
    explanation: "Going online establishes a real-time communication link allowing you to monitor programme execution, view I/O states, check data values, read the diagnostic buffer, and (with authorisation) make programme changes. This is the primary maintenance diagnostic tool."
  },
  {
    id: "upload-download",
    question: "What is the difference between upload and download in PLC software?",
    options: [
      "They are the same operation performed at different speeds",
      "Upload reads the programme from PLC to laptop; download writes from laptop to PLC",
      "Upload increases the programme execution speed",
      "Upload is for inputs only; download is for outputs only"
    ],
    correctIndex: 1,
    explanation: "Upload reads the programme from the PLC into the laptop (used for backup or comparison). Download writes the programme from the laptop into the PLC (used for commissioning, programme updates or restoration). Always verify the direction before executing — downloading the wrong programme can cause dangerous machine behaviour."
  },
  {
    id: "force-table",
    question: "What is the purpose of the force table in PLC software?",
    options: [
      "Displaying the physical forces measured by load cells",
      "Showing all I/O points that have been manually overridden, bypassing programme logic",
      "Listing the PLC model database for hardware selection",
      "Displaying structured text variable declarations"
    ],
    correctIndex: 1,
    explanation: "The force table lists all I/O points that have been manually forced to a specific state, bypassing normal programme logic. Forces are powerful diagnostic tools but extremely dangerous if left active — they can bypass safety interlocks. Always check the force table before leaving a PLC session."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Siemens TIA Portal is:",
    options: [
      "A PLC hardware module for industrial control",
      "An integrated software environment for programming and configuring Siemens PLCs, HMIs and drives",
      "A fieldbus communication protocol",
      "A safety relay manufactured by Siemens"
    ],
    correctAnswer: 1,
    explanation: "TIA Portal (Totally Integrated Automation Portal) is Siemens' integrated development environment for S7-1200/1500 PLCs, WinCC HMIs, and drive configuration. It combines all engineering tools in a single software platform."
  },
  {
    id: 2,
    question: "Allen-Bradley CompactLogix and ControlLogix PLCs are programmed using:",
    options: [
      "Siemens TIA Portal",
      "Mitsubishi GX Works",
      "Rockwell Studio 5000 Logix Designer (formerly RSLogix 5000)",
      "Omron CX-Programmer"
    ],
    correctAnswer: 2,
    explanation: "Rockwell Automation's CompactLogix and ControlLogix platforms are programmed via Studio 5000 Logix Designer. Older MicroLogix and SLC500 used RSLogix 500. Each manufacturer requires its own proprietary software."
  },
  {
    id: 3,
    question: "Structured Text (ST) is best described as:",
    options: [
      "A graphical language using relay-style contacts and coils",
      "A high-level text-based language similar to Pascal, ideal for calculations and data manipulation",
      "A complete replacement for ladder logic in all applications",
      "An electrical wiring diagram format"
    ],
    correctAnswer: 1,
    explanation: "Structured Text uses IF-THEN-ELSE, FOR loops, WHILE loops, and CASE statements. It excels at mathematical calculations, string processing, data manipulation, and complex algorithms that would be cumbersome in ladder logic."
  },
  {
    id: 4,
    question: "Before downloading a programme to a running PLC, you must:",
    options: [
      "Simply press the download button without further consideration",
      "Ensure the machine is in a safe state, personnel are clear, and a risk assessment has been completed",
      "Wait for the next scheduled maintenance window regardless of urgency",
      "Change the PLC's IP address to a temporary value"
    ],
    correctAnswer: 1,
    explanation: "Downloading can cause unexpected output changes, machine movements, or loss of the existing programme. The machine must be in a safe state, all personnel clear of hazards, with a documented risk assessment completed before proceeding."
  },
  {
    id: 5,
    question: "Hardware configuration in PLC software defines:",
    options: [
      "The physical layout of the factory floor",
      "The rack layout, installed modules, I/O addresses and communication network settings",
      "The colour scheme of the enclosure",
      "The preventive maintenance schedule"
    ],
    correctAnswer: 1,
    explanation: "The hardware configuration tells the PLC what modules are installed in each rack slot, their I/O addresses, communication parameters, and module-specific settings. A mismatch between configuration and physical hardware causes fault conditions."
  },
  {
    id: 6,
    question: "Cross-referencing in PLC software allows you to:",
    options: [
      "Connect two PLCs from different manufacturers together",
      "Find every programme location where a specific address or tag is used",
      "Convert programmes between different IEC 61131-3 languages",
      "Access internet resources from within the PLC software"
    ],
    correctAnswer: 1,
    explanation: "Cross-referencing shows every rung, block, or section where a given address is used — invaluable for tracing how conditions in one part of the programme affect outputs elsewhere. It is a fundamental diagnostic and programme comprehension tool."
  },
  {
    id: 7,
    question: "Function Block Diagram (FBD) is particularly suited for:",
    options: [
      "Simple relay-replacement logic with contacts and coils",
      "Continuous process control with analogue signal processing and PID loops",
      "Document formatting and report generation",
      "Network infrastructure configuration"
    ],
    correctAnswer: 1,
    explanation: "FBD uses graphical blocks connected by signal lines, making it intuitive for analogue signal processing, mathematical operations, PID control, and data flow applications. It shows the signal flow clearly from inputs through processing to outputs."
  },
  {
    id: 8,
    question: "A programme comparison showing differences between the PLC and the backup means:",
    options: [
      "The PLC has developed a hardware fault",
      "The programme has been modified since the last backup — investigation and documentation are needed",
      "The backup file has been corrupted and should be deleted",
      "The PLC model has been changed to a different manufacturer"
    ],
    correctAnswer: 1,
    explanation: "A mismatch indicates that someone has made changes to the running programme since the backup was taken. Investigate what was changed, why, and by whom. Update the backup and document the modifications. This is a key part of configuration management."
  },
  {
    id: 9,
    question: "Sequential Function Chart (SFC) is used for:",
    options: [
      "Replacing all other IEC 61131-3 languages in every application",
      "Programming step-based sequential control processes with defined transitions",
      "Configuring network switches and communication infrastructure",
      "Designing motor protection relay settings"
    ],
    correctAnswer: 1,
    explanation: "SFC provides a graphical framework specifically designed for step sequences with transitions between steps. Each step can contain actions written in any IEC 61131-3 language. It directly implements the GRAFCET design methodology."
  },
  {
    id: 10,
    question: "PLC programme backups should be stored:",
    options: [
      "Only on the programming laptop used for the last download",
      "In at least two separate locations with version control, date stamps and change notes",
      "Only within the PLC memory itself",
      "On the machine operator's personal mobile phone"
    ],
    correctAnswer: 1,
    explanation: "Store backups in at least two separate locations (e.g., company server and local portable media) with clear version control including date, version number, programmer name, and change descriptions. Without a current backup, PLC failure or corruption means extended downtime while programmes are recreated."
  },
  {
    id: 11,
    question: "CODESYS is significant because it is:",
    options: [
      "A PLC hardware manufacturer competing with Siemens",
      "A manufacturer-independent IEC 61131-3 programming platform used by many PLC brands",
      "A safety relay programming tool only",
      "A deprecated software no longer maintained"
    ],
    correctAnswer: 1,
    explanation: "CODESYS is a manufacturer-independent IEC 61131-3 development environment used by many PLC brands including Beckhoff, WAGO, Festo, ABB, and others. Learning CODESYS gives transferable programming and diagnostic skills across multiple hardware platforms."
  },
  {
    id: 12,
    question: "Under ST1426, a maintenance technician uses PLC software primarily for:",
    options: [
      "Writing complete programmes from scratch for new machinery installations",
      "Online monitoring, diagnostics, programme backup and restore procedures",
      "Designing HMI screens and operator interfaces",
      "Configuring network switches and IT infrastructure"
    ],
    correctAnswer: 1,
    explanation: "ST1426 expects maintenance technicians to use PLC software competently for online monitoring and diagnostics (viewing programme execution, checking I/O states, reading diagnostic buffers), performing programme backup and restore, and communicating findings to controls engineers. Full programme development is typically the controls engineer's responsibility."
  }
];

const faqs = [
  {
    question: "Do I need different software for every PLC manufacturer?",
    answer: "Generally yes. Siemens uses TIA Portal (or STEP 7 for older S7-300/400), Allen-Bradley uses Studio 5000, Mitsubishi uses GX Works, Omron uses Sysmac Studio, and Schneider uses EcoStruxure Control Expert. Some manufacturers offer free or reduced-cost versions for basic PLC models. CODESYS is a notable exception as a multi-vendor platform used by many smaller brands."
  },
  {
    question: "Can I use a standard Windows laptop for PLC programming?",
    answer: "Yes, most PLC software runs on standard Windows laptops. You may need specific communication cables or adaptors (USB-serial, USB-MPI, Ethernet direct connection). Ensure the laptop meets the software's minimum requirements for processor, RAM, and operating system version. Install the correct drivers for communication interfaces before attempting to connect."
  },
  {
    question: "What happens if I accidentally download the wrong programme to a PLC?",
    answer: "Downloading overwrites the existing programme, potentially causing dangerous and unexpected machine behaviour. This is why backing up the existing programme BEFORE any download is essential. If the wrong programme is loaded, stop the PLC immediately and restore the correct programme from backup. If no backup exists, the programme may need to be recreated — this is why backup management is so critical."
  },
  {
    question: "What is CODESYS and why should I know about it?",
    answer: "CODESYS is a manufacturer-independent IEC 61131-3 development platform used by many PLC brands (Beckhoff, WAGO, Festo, ABB, Bosch Rexroth, and others). Learning CODESYS gives you skills transferable across multiple hardware platforms. The development environment supports all five IEC languages, simulation, visualisation, and network configuration."
  },
  {
    question: "How do I check if forces are active on a PLC?",
    answer: "Every PLC software has a force table or force overview function. Check this EVERY time you connect to a PLC and BEFORE you disconnect. Active forces bypass programme logic including safety interlocks. Most PLC front panels also have a force indicator LED. Make it standard practice to check for forces as part of every maintenance visit, even if you did not apply any yourself."
  }
];

const MOETModule5Section2_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Monitor className="h-4 w-4" />
            <span>Module 5.2.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            PLC Programming Software
          </h1>
          <p className="text-white/80">
            Software packages, development environments and IEC 61131-3 programming methods for PLC systems
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>IEC 61131-3:</strong> Five standard programming languages (LD, FBD, ST, IL, SFC)</li>
              <li className="pl-1"><strong>Vendor-specific:</strong> TIA Portal, Studio 5000, GX Works, Sysmac Studio</li>
              <li className="pl-1"><strong>Online mode:</strong> Real-time monitoring for maintenance diagnosis</li>
              <li className="pl-1"><strong>Backup:</strong> Always keep current versioned copies of all programmes</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Diagnostics:</strong> Online monitoring is the primary fault-finding tool</li>
              <li className="pl-1"><strong>Cross-reference:</strong> Trace addresses across the entire programme</li>
              <li className="pl-1"><strong>Backup/restore:</strong> Critical for recovery from PLC failure</li>
              <li className="pl-1"><strong>ST1426:</strong> Using PLC software as a diagnostic tool</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify the five IEC 61131-3 programming languages and their applications",
              "Navigate PLC software for online monitoring and diagnostics",
              "Explain the difference between upload and download operations",
              "Use cross-referencing to trace addresses throughout a programme",
              "Perform programme backup and restore procedures correctly",
              "Understand the role of hardware configuration in PLC systems"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            IEC 61131-3 Programming Languages
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              IEC 61131-3 is the international standard that defines five programming languages for programmable controllers. While each PLC manufacturer implements these languages in their own software with differing interfaces, the fundamental concepts remain the same across all platforms. Understanding these languages gives you transferable knowledge that applies regardless of the PLC brand you encounter on site.
            </p>

            <div className="my-6">
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Language</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Best Suited For</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Maintenance Relevance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2">Ladder Diagram (LD)</td><td className="border border-white/10 px-3 py-2">Graphical</td><td className="border border-white/10 px-3 py-2">Discrete logic, motor control</td><td className="border border-white/10 px-3 py-2">Most common — primary skill</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Function Block (FBD)</td><td className="border border-white/10 px-3 py-2">Graphical</td><td className="border border-white/10 px-3 py-2">Process control, PID, analogue</td><td className="border border-white/10 px-3 py-2">Frequently encountered</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Structured Text (ST)</td><td className="border border-white/10 px-3 py-2">Text</td><td className="border border-white/10 px-3 py-2">Calculations, data handling</td><td className="border border-white/10 px-3 py-2">Increasingly common</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Instruction List (IL)</td><td className="border border-white/10 px-3 py-2">Text</td><td className="border border-white/10 px-3 py-2">Legacy systems only</td><td className="border border-white/10 px-3 py-2">Deprecated — older sites</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">SFC</td><td className="border border-white/10 px-3 py-2">Graphical</td><td className="border border-white/10 px-3 py-2">Sequential processes</td><td className="border border-white/10 px-3 py-2">Batch and process plants</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p>
              Most industrial programmes use a combination of languages within the same project. Ladder logic handles the discrete control (motor start/stop, interlocking), FBD manages analogue signal processing and PID loops, and Structured Text handles complex calculations and data manipulation. SFC provides the overall sequential framework in batch processes. As a maintenance technician, you will most frequently work with ladder logic, but encountering FBD and ST sections is increasingly common.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance tip:</strong> Even if you cannot write Structured Text, you should be able to recognise common constructs (IF-THEN-ELSE, FOR loops) and identify the variables involved. When you encounter ST in online monitoring, the current variable values are displayed alongside the code, allowing you to follow the logic flow.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Manufacturer Software Platforms
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Each PLC manufacturer provides proprietary programming software. While the IEC 61131-3 languages are standardised in concept, the software interfaces, project structures, communication methods, and diagnostic tools differ significantly between platforms. As a maintenance technician, you may need to work with several different platforms depending on the equipment installed on your site.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Major PLC Software Platforms</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Siemens TIA Portal:</strong> S7-1200, S7-1500, ET 200SP, WinCC HMI. Integrated engineering with hardware config, programming, HMI design, and drive commissioning in one environment.</li>
                <li className="pl-1"><strong>Rockwell Studio 5000:</strong> CompactLogix, ControlLogix. Tag-based programming with extensive add-on instruction library. Formerly RSLogix 5000.</li>
                <li className="pl-1"><strong>Mitsubishi GX Works 3:</strong> iQ-R, iQ-F series. GX Works 2 for older FX and Q series. Strong presence in packaging and discrete manufacturing in the UK.</li>
                <li className="pl-1"><strong>Omron Sysmac Studio:</strong> NX/NJ series controllers. Integrated motion, safety, and vision in one platform. Uses EtherCAT for field communication.</li>
                <li className="pl-1"><strong>Schneider EcoStruxure Control Expert:</strong> Modicon M340, M580. Previously Unity Pro. Common in process and infrastructure applications.</li>
                <li className="pl-1"><strong>CODESYS:</strong> Multi-vendor platform used by Beckhoff, WAGO, Festo, and many others. Learning CODESYS gives transferable skills across brands.</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Software Licensing</p>
              <p className="text-sm text-white">
                PLC software licences can be expensive. Some manufacturers offer free versions for basic PLC models (e.g., Siemens TIA Portal Basic for S7-1200, Mitsubishi GX Works 3 for FX5U). Check whether your site has the correct licences installed and maintained. Using unlicensed software can result in limited functionality or legal issues.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Online Monitoring and Diagnostics
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Online monitoring is the single most valuable feature of PLC software for maintenance technicians. It provides real-time observation of programme execution, I/O states, data values, and system diagnostics — transforming the PLC from an opaque black box into a transparent diagnostic tool that shows you exactly what is happening inside the control system.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Online Features</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Live logic display:</strong> See active contacts, energised coils, and power flow through ladder rungs in real time</li>
                <li className="pl-1"><strong>Watch tables:</strong> Create custom lists of specific variables to monitor timer values, counter states, analogue readings, and data registers</li>
                <li className="pl-1"><strong>Cross-reference:</strong> Find every location in the programme where a specific address or tag is referenced</li>
                <li className="pl-1"><strong>Force table:</strong> View and manage manually forced I/O points — critical for safety</li>
                <li className="pl-1"><strong>Diagnostic buffer:</strong> Read the timestamped fault history log to understand what happened and when</li>
                <li className="pl-1"><strong>Programme comparison:</strong> Compare the running programme against a backup to detect unauthorised changes</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Safety Warning</p>
              <p className="text-sm text-white">
                Never make programme changes to a running PLC without a documented risk assessment, proper authorisation, and safe working procedures in place. Even apparently minor changes can cause unexpected and potentially dangerous machine behaviour. Online monitoring for diagnostics is safe; online editing requires formal management-of-change procedures.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance tip:</strong> Before disconnecting from a PLC session, always check the force table to ensure no forces are active. A forgotten force can bypass safety interlocks and has been the root cause of serious industrial accidents. Make checking for forces part of your standard PLC disconnection procedure.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Backup, Restore and Configuration Management
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Maintaining current, verified programme backups is one of the most critical maintenance responsibilities. Without a backup, a PLC CPU failure, memory corruption, or accidental programme deletion means extended downtime while programmes are painstakingly recreated — often from scratch if documentation is poor. A current backup can reduce recovery time from days to hours or even minutes.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Backup Best Practice</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Timing:</strong> Back up after every programme change, no matter how small</li>
                <li className="pl-1"><strong>Storage:</strong> Maintain copies in at least two separate locations (e.g., company server and local portable media)</li>
                <li className="pl-1"><strong>Versioning:</strong> Include date, version number, programmer name, and description of changes in the file name or project notes</li>
                <li className="pl-1"><strong>Completeness:</strong> Back up the entire project — programme, hardware configuration, HMI screens, drive parameters, network configuration</li>
                <li className="pl-1"><strong>Verification:</strong> Periodically verify that backups can be successfully restored by doing a test restore (to a spare PLC or simulator, never to the production unit without cause)</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Hardware Configuration</p>
              <p className="text-sm text-white mb-3">
                The hardware configuration defines the physical PLC system within the software:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Rack layout:</strong> Which modules are in which slots</li>
                <li className="pl-1"><strong>Module parameters:</strong> Input filtering, output behaviour, diagnostic settings</li>
                <li className="pl-1"><strong>I/O addresses:</strong> How physical terminals map to programme addresses</li>
                <li className="pl-1"><strong>Communication:</strong> Network addresses, protocol settings, device assignments</li>
              </ul>
              <p className="text-sm text-white mt-3">
                A mismatch between the hardware configuration and the physical modules installed causes fault conditions. When replacing a module, ensure it is the exact same type and revision — or update the hardware configuration accordingly.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426:</strong> Configuration management and backup/restore procedures are core maintenance competencies. Technicians must be able to upload, compare, and restore PLC programmes as part of planned and reactive maintenance activities.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Communication and Connectivity
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Connecting the programming laptop to the PLC is the first step in any online diagnostic session. The communication method depends on the PLC manufacturer, model, and the available interfaces. Modern PLCs predominantly use Ethernet, but older systems may require serial, USB, or proprietary cables. Understanding the communication options for your site's PLCs ensures you can connect quickly when a fault occurs.
            </p>

            <div className="my-6">
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Connection Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Cable/Adaptor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2">Ethernet (TCP/IP)</td><td className="border border-white/10 px-3 py-2">Standard RJ45 patch cable</td><td className="border border-white/10 px-3 py-2">Modern PLCs (S7-1200/1500, CompactLogix)</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">USB</td><td className="border border-white/10 px-3 py-2">USB-A to USB-Mini/Micro</td><td className="border border-white/10 px-3 py-2">Small PLCs (Mitsubishi FX5U, some Siemens)</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Serial RS-232</td><td className="border border-white/10 px-3 py-2">USB-to-serial adaptor + cable</td><td className="border border-white/10 px-3 py-2">Older PLCs (Mitsubishi FX, older Omron)</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">MPI/Profibus</td><td className="border border-white/10 px-3 py-2">USB-MPI/DP adaptor (Siemens)</td><td className="border border-white/10 px-3 py-2">Siemens S7-300/400 legacy systems</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Connection Troubleshooting</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Cannot find PLC:</strong> Check IP address settings — the laptop must be on the same subnet as the PLC</li>
                <li className="pl-1"><strong>Connection drops:</strong> Check cable quality, ensure no firewall is blocking the PLC communication ports</li>
                <li className="pl-1"><strong>Wrong driver:</strong> Ensure the correct communication driver is installed and selected in the software</li>
                <li className="pl-1"><strong>Access protection:</strong> Some PLCs have password protection — you need the correct credentials</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Under ST1426, maintenance technicians are expected to be competent in connecting to PLCs using the appropriate software and communication methods, performing online diagnostics, managing programme backups, and documenting their findings. These skills are fundamental to efficient maintenance of modern automated plant and machinery.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section2-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Timers, Counters and Sequencing
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section2-6">
              Next: Troubleshooting PLC Systems
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule5Section2_5;
