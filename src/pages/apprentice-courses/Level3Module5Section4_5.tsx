/**
 * Level 3 Module 5 Section 4.5 - Producing Commissioning Reports
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Producing Commissioning Reports - Level 3 Module 5 Section 4.5";
const DESCRIPTION = "Learn to produce comprehensive commissioning reports documenting verification, functional testing, and system performance for electrical installations.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the primary purpose of a commissioning report?",
    options: [
      "To replace the EIC",
      "To document that the installation operates correctly and meets performance requirements",
      "Only for complex industrial systems",
      "To satisfy insurance requirements only"
    ],
    correctIndex: 1,
    explanation: "A commissioning report provides comprehensive evidence that the installation has been properly verified, functions correctly, and meets the intended performance requirements. It complements the EIC with operational and functional details."
  },
  {
    id: "check-2",
    question: "Which type of installations typically require formal commissioning reports?",
    options: [
      "Only domestic installations",
      "Large, complex, or commercial/industrial installations with specific performance requirements",
      "Only solar PV installations",
      "None - EIC is sufficient for all"
    ],
    correctIndex: 1,
    explanation: "Formal commissioning reports are typically required for larger commercial and industrial installations, building services, complex control systems, and installations with specific performance requirements that go beyond standard EIC documentation."
  },
  {
    id: "check-3",
    question: "What should be included in a commissioning report regarding functional testing?",
    options: [
      "Only that functional testing was done",
      "Details of each function tested, method used, results obtained, and any adjustments made",
      "Just a tick list",
      "Only the items that passed"
    ],
    correctIndex: 1,
    explanation: "Commissioning reports should detail each function tested, how it was tested, what results were obtained, and any adjustments or corrections made during commissioning. This provides evidence of thorough verification."
  },
  {
    id: "check-4",
    question: "How should commissioning issues and resolutions be documented?",
    options: [
      "They shouldn't - only record successes",
      "Record the issue, investigation, resolution, and confirmation that the issue was resolved",
      "Just note that issues occurred",
      "Only if they took more than an hour to fix"
    ],
    correctIndex: 1,
    explanation: "Issues discovered during commissioning should be documented including what was found, how it was investigated, what resolution was implemented, and confirmation that the issue was successfully resolved. This is part of professional commissioning."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the relationship between commissioning reports and the EIC?",
    options: [
      "Commissioning report replaces EIC",
      "Commissioning report provides additional operational detail beyond EIC scope",
      "They are the same document",
      "EIC replaces commissioning report"
    ],
    correctAnswer: 1,
    explanation: "The EIC confirms electrical compliance with BS 7671. The commissioning report provides additional documentation of operational verification, functional testing, performance data, and system-specific information that goes beyond the EIC scope."
  },
  {
    id: 2,
    question: "For a building management system (BMS), what commissioning documentation would be expected?",
    options: [
      "Just the EIC",
      "Point schedule, functional test results, setpoint configurations, trend logs, and cause/effect matrix verification",
      "Only manufacturer's certificate",
      "Nothing specific"
    ],
    correctAnswer: 1,
    explanation: "BMS commissioning requires detailed documentation including point schedules, verification of each control loop, setpoint configurations, trend logs showing proper operation, and confirmation that cause/effect (what happens when) matrices operate correctly."
  },
  {
    id: 3,
    question: "What performance data might be included in a lighting system commissioning report?",
    options: [
      "Only that lights work",
      "Lux levels achieved, control system response, emergency lighting duration test results",
      "Just the number of fittings",
      "Only the manufacturer's data"
    ],
    correctAnswer: 1,
    explanation: "Lighting commissioning may include measured lux levels at working planes (compared to design), verification of control systems (daylight linking, occupancy sensing), and emergency lighting duration test results proving compliance with design requirements."
  },
  {
    id: 4,
    question: "When commissioning a standby generator system, what must be verified and documented?",
    options: [
      "Only that it starts",
      "Start-up time, load transfer, load performance, automatic changeover, re-transfer, and fuel consumption",
      "Just the fuel level",
      "Only the nameplate data"
    ],
    correctAnswer: 1,
    explanation: "Generator commissioning requires verification of start-up sequence and timing, load transfer (manual and automatic), performance under various loads, return-to-mains transfer, cooling system, and fuel consumption against specifications."
  },
  {
    id: 5,
    question: "What should commissioning reports include about equipment settings?",
    options: [
      "Nothing - settings are manufacturer's responsibility",
      "All setpoints, configurations, time delays, and adjustable parameters with their commissioned values",
      "Only factory defaults",
      "Just that settings were made"
    ],
    correctAnswer: 1,
    explanation: "All adjustable settings should be recorded in the commissioning report including setpoints, time delays, sensitivity settings, configuration parameters, and any programmed sequences. This enables future maintenance and troubleshooting."
  },
  {
    id: 6,
    question: "How should commissioning test sequences be documented?",
    options: [
      "Just note that testing was done",
      "Step-by-step test procedures, expected results, actual results, and any deviations",
      "Only summarize passed tests",
      "Video recording only"
    ],
    correctAnswer: 1,
    explanation: "Test sequences should be documented showing the procedure followed, what results were expected, what was actually observed, and any deviations from expected behavior. This creates a reproducible record of the commissioning process."
  },
  {
    id: 7,
    question: "What witness requirements might apply to commissioning?",
    options: [
      "None required",
      "Client representative, consultant, or authority may need to witness specific tests",
      "Only the electrician",
      "Only for residential work"
    ],
    correctAnswer: 1,
    explanation: "For larger projects, specific tests may need to be witnessed by the client's representative, project consultant, or relevant authority. The commissioning report should record who witnessed each test and their sign-off where required."
  },
  {
    id: 8,
    question: "For a UPS (Uninterruptible Power Supply) system, what commissioning documentation is required?",
    options: [
      "Only that it's plugged in",
      "Battery capacity test, transfer time, load test, alarm functions, and remote monitoring verification",
      "Just the warranty card",
      "Only inverter efficiency"
    ],
    correctAnswer: 1,
    explanation: "UPS commissioning should document battery capacity and autonomy tests, transfer time measurements (utility to battery and back), load testing at various percentages, verification of all alarms and indicators, and remote monitoring functionality if installed."
  },
  {
    id: 9,
    question: "What information about environmental conditions should be recorded during commissioning?",
    options: [
      "Nothing about environment",
      "Temperature, humidity, and any conditions that may affect test results or operation",
      "Only if outdoors",
      "Just the date"
    ],
    correctAnswer: 1,
    explanation: "Environmental conditions during commissioning should be noted as they may affect results. Temperature affects insulation resistance, humidity affects certain equipment operation, and knowing conditions helps interpret results and identify environmental sensitivities."
  },
  {
    id: 10,
    question: "How should outstanding items or snagging be documented in commissioning reports?",
    options: [
      "Don't mention them",
      "List items, responsibility, target completion date, and later record when completed",
      "Only mention major items",
      "Leave a blank page for later"
    ],
    correctAnswer: 1,
    explanation: "Outstanding items should be clearly listed with who is responsible for resolution, target completion dates, and later updated to show completion. This creates a clear record of what was incomplete at commissioning and how it was resolved."
  },
  {
    id: 11,
    question: "What training records should accompany commissioning documentation?",
    options: [
      "No training records needed",
      "Records of client/user training provided, topics covered, and attendees",
      "Only for fire alarm systems",
      "Just verbal confirmation"
    ],
    correctAnswer: 1,
    explanation: "Training provided during commissioning should be documented including date, topics covered, duration, trainer, and attendee sign-off. This proves the client was instructed in system operation and establishes who received training."
  },
  {
    id: 12,
    question: "For how long should commissioning records typically be retained?",
    options: [
      "1 year",
      "Life of the installation or as specified by contract/regulations",
      "Until next inspection",
      "They don't need to be retained"
    ],
    correctAnswer: 1,
    explanation: "Commissioning records should generally be retained for the life of the installation or as specified by contract requirements. They are valuable for periodic inspection, fault investigation, system modifications, and demonstrating original performance."
  }
];

const faqs = [
  {
    question: "Do all installations need a formal commissioning report?",
    answer: "Not all installations require formal commissioning reports. Standard domestic work typically only needs EIC documentation. Complex commercial, industrial, or building services installations usually require commissioning reports. Contract specifications often define requirements."
  },
  {
    question: "Who is responsible for producing the commissioning report?",
    answer: "The commissioning engineer or contractor carrying out commissioning typically produces the report. For large projects, specialist commissioning managers may coordinate reports from multiple disciplines. The responsibility should be defined in the project contract."
  },
  {
    question: "What format should commissioning reports follow?",
    answer: "Format varies by project and specification. Use manufacturer's commissioning sheets where provided, or develop systematic documentation covering all verification and testing. Many industries have standard templates (e.g., BSRIA for building services)."
  },
  {
    question: "Can commissioning happen before all installation work is complete?",
    answer: "Phased commissioning is common on large projects - sections are commissioned as they complete. The report should clearly identify what was commissioned and when. Final commissioning confirms all systems work together as intended."
  },
  {
    question: "What if commissioning reveals problems with the design?",
    answer: "Document the finding and refer to the designer. Design issues discovered during commissioning need design resolution - you cannot sign off a system that doesn't meet design intent. Record the issue, design response, and any implemented changes."
  },
  {
    question: "How detailed should commissioning reports be?",
    answer: "Sufficient detail to demonstrate proper commissioning and enable future reference. Record what was tested, how it was tested, what results were obtained, and any corrections made. A reader should be able to understand exactly what was done."
  }
];

const Level3Module5Section4_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">

      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module5-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Article Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 5.4.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Producing Commissioning Reports
          </h1>
          <p className="text-white/80">
            Comprehensive documentation of system verification and performance
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Purpose:</strong> Document operational verification</li>
              <li><strong>Content:</strong> Tests, results, settings, issues</li>
              <li><strong>When:</strong> Complex/commercial installations</li>
              <li><strong>Retain:</strong> For life of installation</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Specification requiring commissioning records</li>
              <li><strong>Use:</strong> Systematic documentation of all testing</li>
              <li><strong>Apply:</strong> Detailed evidence for handover</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand the purpose and scope of commissioning reports",
              "Document functional testing systematically",
              "Record equipment settings and configurations",
              "Handle issues discovered during commissioning",
              "Produce professional commissioning documentation",
              "Understand witness and sign-off requirements"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Purpose of Commissioning Reports */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Purpose of Commissioning Reports
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Commissioning reports provide comprehensive documentation that an installation has been properly verified, functions correctly, and meets performance requirements. They go beyond the EIC to include operational testing, performance data, and system-specific verification.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">When commissioning reports are typically required:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Commercial buildings:</strong> Building services, BMS, complex lighting</li>
                <li><strong>Industrial installations:</strong> Motor control, process systems, automation</li>
                <li><strong>Critical systems:</strong> UPS, generators, emergency systems</li>
                <li><strong>Contract requirement:</strong> Specified in project documentation</li>
                <li><strong>Complex domestic:</strong> Large smart home, renewable energy systems</li>
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">EIC</p>
                <p className="text-white/90 text-xs">Electrical compliance with BS 7671</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Commissioning Report</p>
                <p className="text-white/90 text-xs">Operational verification and performance</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Together</p>
                <p className="text-white/90 text-xs">Complete verification evidence</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> The EIC proves electrical safety. The commissioning report proves the installation works as intended.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Content of Commissioning Reports */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Content of Commissioning Reports
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Commissioning reports should be comprehensive yet focused on what was actually verified. They provide a permanent record enabling future reference, troubleshooting, and demonstrating that proper commissioning was performed.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Report Sections</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Project information and scope</li>
                  <li>Systems commissioned</li>
                  <li>Test procedures used</li>
                  <li>Results and measurements</li>
                  <li>Settings and configurations</li>
                  <li>Issues and resolutions</li>
                  <li>Outstanding items</li>
                  <li>Sign-offs and witnesses</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Supporting Evidence</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Test sheets and checklists</li>
                  <li>Measurement records</li>
                  <li>Photographs of settings</li>
                  <li>Trend logs and data</li>
                  <li>Witness signatures</li>
                  <li>Training records</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">For each system/function, document:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>What was tested:</strong> Specific function or parameter</li>
                <li><strong>How it was tested:</strong> Method and equipment used</li>
                <li><strong>Expected result:</strong> Design requirement or specification</li>
                <li><strong>Actual result:</strong> What was measured or observed</li>
                <li><strong>Pass/fail/adjust:</strong> Assessment and any action taken</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Tip:</strong> Use manufacturer's commissioning sheets where available - they ensure nothing is missed and provide a consistent format.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 03: Documenting Issues and Resolutions */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Documenting Issues and Resolutions
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Issues discovered during commissioning are normal - commissioning exists precisely to find and resolve them. Proper documentation of issues and their resolution is important evidence of professional commissioning and provides valuable reference for future maintenance.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Issue documentation should include:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Description:</strong> What was wrong or not working correctly</li>
                <li><strong>Discovery:</strong> When and how the issue was found</li>
                <li><strong>Investigation:</strong> What was done to identify the cause</li>
                <li><strong>Root cause:</strong> What actually caused the problem</li>
                <li><strong>Resolution:</strong> What corrective action was taken</li>
                <li><strong>Verification:</strong> How resolution was confirmed successful</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-green-400/80 mb-2">Good Documentation</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Clear description of issue</li>
                  <li>Logical investigation steps</li>
                  <li>Root cause identified</li>
                  <li>Resolution described</li>
                  <li>Retested and confirmed</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">Poor Documentation</p>
                <ul className="text-sm text-white space-y-1">
                  <li>"Fixed issue with panel"</li>
                  <li>No investigation detail</li>
                  <li>Cause unknown</li>
                  <li>"Adjustment made"</li>
                  <li>No retest recorded</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Important:</strong> Don't hide issues - documenting them shows professional commissioning. Issues are expected; finding and fixing them is the point of commissioning.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 04: Report Sign-off and Handover */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Report Sign-off and Handover
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Commissioning reports require appropriate sign-off to confirm the work was done and verified. For larger projects, specific tests may require witness signatures. The completed report forms part of the handover documentation package.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Typical sign-off requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Commissioning engineer:</strong> Confirms tests performed and results</li>
                <li><strong>Project manager:</strong> Accepts commissioning complete</li>
                <li><strong>Client representative:</strong> Witnesses key tests, accepts system</li>
                <li><strong>Specialist consultants:</strong> May verify their discipline areas</li>
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Witnessed Tests</p>
                <p className="text-white/90 text-xs">Client sees critical functions verified</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Sign-off Sheets</p>
                <p className="text-white/90 text-xs">Formal acceptance of each system</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Handover Pack</p>
                <p className="text-white/90 text-xs">Complete documentation package</p>
              </div>
            </div>

            <p>
              The complete commissioning documentation package - including reports, test results, settings records, and training records - is handed over to the client. This becomes the permanent record of the installation's commissioned performance.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Keep copies of all commissioning documentation. It may be needed for warranty claims, future modifications, or demonstrating original installation performance.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Report Structure</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Executive summary for management review</li>
                <li>Detailed test results for technical record</li>
                <li>Settings record for future reference</li>
                <li>Issue log with resolutions</li>
                <li>Outstanding items list with responsibilities</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Quality Tips</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Use consistent terminology throughout</li>
                <li>Reference relevant drawings and schedules</li>
                <li>Include photographs of key settings</li>
                <li>Number and date all pages</li>
                <li>Have documents reviewed before issue</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Incomplete records:</strong> Missing tests or results</li>
                <li><strong>Generic entries:</strong> "All OK" without specifics</li>
                <li><strong>Undated records:</strong> When was this actually done?</li>
                <li><strong>Missing signatures:</strong> Who verified this?</li>
              </ul>
            </div>
          </div>
        </section>

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

        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Report Contents Checklist</p>
                <ul className="space-y-0.5">
                  <li>Project and system identification</li>
                  <li>Test procedures and results</li>
                  <li>Settings and configurations</li>
                  <li>Issue log with resolutions</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Sign-off Requirements</p>
                <ul className="space-y-0.5">
                  <li>Commissioning engineer signature</li>
                  <li>Witnessed test confirmation</li>
                  <li>Client/PM acceptance</li>
                  <li>Outstanding items acknowledgement</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module5-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 4
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module5-section5">
              Next: Section 5 - Certification
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module5Section4_5;
