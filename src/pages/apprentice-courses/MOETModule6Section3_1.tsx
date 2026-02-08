import { ArrowLeft, FileText, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Recording Work Completed - MOET Module 6 Section 3.1";
const DESCRIPTION = "Comprehensive guide to recording completed maintenance work: logbook entries, CMMS documentation, work order completion, asset history records and compliance with ST1426 requirements for electrical maintenance technicians.";

const quickCheckQuestions = [
  {
    id: "logbook-purpose",
    question: "What is the primary purpose of maintaining a maintenance logbook?",
    options: [
      "To keep electricians busy during quiet periods",
      "To provide a chronological, auditable record of all maintenance activities on an asset",
      "To replace the need for a CMMS entirely",
      "To satisfy insurance companies only"
    ],
    correctIndex: 1,
    explanation: "A maintenance logbook provides a chronological, auditable record of all maintenance activities carried out on an asset or system. It enables trend analysis, supports compliance audits, and ensures continuity when different technicians work on the same equipment."
  },
  {
    id: "cmms-entry",
    question: "When completing a CMMS work order, which detail is most critical to include?",
    options: [
      "The weather conditions on site",
      "A clear description of what was found, what was done, and what parts were used",
      "The names of all people who walked past the work area",
      "The colour of the cable insulation"
    ],
    correctIndex: 1,
    explanation: "A CMMS work order must clearly describe the fault or condition found, the corrective action taken, and any parts or materials used. This information supports asset history, future fault diagnosis, spare parts planning, and regulatory compliance."
  },
  {
    id: "work-order-status",
    question: "What should you do if you cannot fully complete a maintenance task during your shift?",
    options: [
      "Close the work order and hope someone notices",
      "Leave the work order open, record what was completed, and note outstanding actions for handover",
      "Delete the work order from the system",
      "Complete the work order as if the job is finished"
    ],
    correctIndex: 1,
    explanation: "If a task cannot be completed, the work order must remain open with a clear record of what has been done and what remains. This information must be communicated during shift handover to ensure continuity and prevent safety gaps."
  },
  {
    id: "asset-history",
    question: "Why is accurate asset history recording important for maintenance planning?",
    options: [
      "It allows managers to monitor individual technician performance only",
      "It enables trend analysis, supports condition-based maintenance decisions and justifies capital expenditure",
      "It is only needed for new equipment under warranty",
      "It replaces the need for planned preventive maintenance"
    ],
    correctIndex: 1,
    explanation: "Accurate asset history enables maintenance planners to identify recurring faults, track equipment degradation trends, make evidence-based decisions about repair versus replacement, and justify capital expenditure for ageing assets. It is fundamental to effective maintenance management."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A maintenance logbook entry should include:",
    options: [
      "Only the date and the technician's name",
      "Date, time, asset identification, work performed, findings, parts used, and the technician's signature",
      "A brief note saying 'work done'",
      "Only information about faults found"
    ],
    correctAnswer: 1,
    explanation: "A complete logbook entry must include the date and time, clear asset identification, a description of the work performed, any findings or anomalies, parts and materials used, and the technician's signature. This creates a complete, auditable record."
  },
  {
    id: 2,
    question: "CMMS stands for:",
    options: [
      "Central Maintenance Management Software",
      "Computerised Maintenance Management System",
      "Complete Maintenance Monitoring Service",
      "Certified Maintenance Method Statement"
    ],
    correctAnswer: 1,
    explanation: "CMMS stands for Computerised Maintenance Management System. It is a software platform used to plan, track, and record maintenance activities across an organisation's assets. Common examples include SAP PM, Maximo, Fiix, and Maintenance Connection."
  },
  {
    id: 3,
    question: "When recording a fault repair in a CMMS, you should:",
    options: [
      "Only record the repair action taken",
      "Record the symptom, root cause identified, corrective action taken, parts used, and time spent",
      "Wait until the end of the week to enter all records at once",
      "Let your supervisor complete the record on your behalf"
    ],
    correctAnswer: 1,
    explanation: "A complete fault repair record includes the symptom reported, the root cause identified through diagnosis, the corrective action taken, any parts or materials used, and the time spent. Recording this promptly ensures accuracy and supports future fault diagnosis on similar equipment."
  },
  {
    id: 4,
    question: "Which of the following is a consequence of poor work recording?",
    options: [
      "Improved spare parts availability",
      "Loss of asset history, repeated faults, compliance failures and increased downtime",
      "Faster maintenance response times",
      "Better team communication"
    ],
    correctAnswer: 1,
    explanation: "Poor work recording leads to incomplete asset histories, inability to identify recurring faults, compliance failures during audits, unnecessary repeat work, and ultimately increased equipment downtime. It undermines the entire maintenance management strategy."
  },
  {
    id: 5,
    question: "A work order typically progresses through which status sequence?",
    options: [
      "Complete, in progress, planned",
      "Planned, scheduled, in progress, completed, closed",
      "Open, closed",
      "Requested, cancelled"
    ],
    correctAnswer: 1,
    explanation: "A typical work order lifecycle follows: planned (identified and approved), scheduled (assigned a date/time and resources), in progress (work underway), completed (work finished, awaiting review), and closed (reviewed, approved and archived). Each status change should be recorded with a timestamp."
  },
  {
    id: 6,
    question: "Under ST1426, maintenance technicians must demonstrate they can:",
    options: [
      "Design maintenance management systems from scratch",
      "Accurately record and report on maintenance activities using appropriate systems and documentation",
      "Only use paper-based recording methods",
      "Delegate all recording to administrative staff"
    ],
    correctAnswer: 1,
    explanation: "The ST1426 standard requires maintenance technicians to accurately record and report on maintenance activities. This includes using both paper and digital systems, completing work orders, updating asset records, and producing clear, accurate documentation of all work performed."
  },
  {
    id: 7,
    question: "When recording preventive maintenance in a logbook, you should note:",
    options: [
      "Only that the PM was completed",
      "Inspection findings, measurements taken, condition assessments, any defects found, and recommended follow-up actions",
      "The serial number of your multimeter only",
      "Nothing — preventive maintenance does not need recording"
    ],
    correctAnswer: 1,
    explanation: "Preventive maintenance records must include inspection findings, any measurements or test results, condition assessments (e.g., wear, corrosion, overheating), defects identified, and recommended follow-up actions. These records are essential for tracking equipment condition over time."
  },
  {
    id: 8,
    question: "Asset identification in maintenance records should use:",
    options: [
      "Informal descriptions like 'the big switchboard near the canteen'",
      "Unique asset numbers, equipment tags, or location codes from the asset register",
      "The manufacturer's brochure reference",
      "The colour of the equipment"
    ],
    correctAnswer: 1,
    explanation: "Maintenance records must use unique, unambiguous asset identification such as asset numbers, equipment tag numbers, or standardised location codes from the organisation's asset register. Informal descriptions create confusion and risk work being carried out on the wrong equipment."
  },
  {
    id: 9,
    question: "How soon after completing a maintenance task should the work record be updated?",
    options: [
      "Within the next calendar month",
      "As soon as reasonably practicable, ideally before leaving the work area or completing the shift",
      "Only when the supervisor asks for it",
      "At the annual maintenance review"
    ],
    correctAnswer: 1,
    explanation: "Work records should be updated as soon as reasonably practicable after task completion — ideally before leaving the work area or at least before the end of the shift. Delayed recording leads to inaccuracies, forgotten details, and incomplete records."
  },
  {
    id: 10,
    question: "Which information helps future technicians most when recorded in an asset's maintenance history?",
    options: [
      "The technician's opinion of the equipment manufacturer",
      "Specific fault symptoms, diagnostic steps taken, root cause found, and the successful repair method",
      "The technician's break times during the repair",
      "Whether the task was enjoyable"
    ],
    correctAnswer: 1,
    explanation: "Detailed fault symptoms, the diagnostic approach used, the root cause identified, and the successful repair method provide invaluable information for future technicians facing similar issues. This institutional knowledge significantly reduces future diagnostic time and prevents repeated trial-and-error approaches."
  },
  {
    id: 11,
    question: "A closed-loop work order system means:",
    options: [
      "Work orders can only be opened by managers",
      "Every work order is tracked from creation through completion and formal close-out with verification",
      "Work orders are printed on closed envelopes",
      "The CMMS software runs on a closed network only"
    ],
    correctAnswer: 1,
    explanation: "A closed-loop work order system tracks every work order from initial creation through scheduling, execution, completion, and formal close-out. Close-out typically includes supervisor review and verification that the work meets the required standard. This ensures no tasks fall through the cracks."
  },
  {
    id: 12,
    question: "BS 7671 requires that records of electrical installations are:",
    options: [
      "Optional for domestic installations",
      "Maintained, updated, and made available for inspection throughout the life of the installation",
      "Only needed during the initial installation",
      "Stored at the local council offices"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 (Regulation 132.13) requires that records of every electrical installation, including as-built drawings and maintenance records, are maintained, updated, and made available for inspection. This applies throughout the life of the installation and supports safe maintenance and future modifications."
  }
];

const faqs = [
  {
    question: "Do I need to record routine visual inspections?",
    answer: "Yes. Even routine visual inspections should be recorded, noting the date, what was inspected, and the condition found. If everything was satisfactory, record 'no defects observed'. This creates evidence that inspections were carried out and establishes a baseline for future comparison. Under BS 7671 and EAWR 1989, a lack of documented evidence of inspection is treated the same as no inspection at all during enforcement action."
  },
  {
    question: "What if the CMMS is unavailable — should I still record my work?",
    answer: "Absolutely. If the CMMS is temporarily unavailable, use a paper-based backup method such as a logbook, work completion form, or even a clear handwritten note. Transfer this information to the CMMS as soon as the system is available. Never leave work unrecorded because the digital system is down."
  },
  {
    question: "How detailed should a maintenance record be?",
    answer: "A good maintenance record should enable another competent technician to understand exactly what was found and what was done without needing to contact you. Include specific measurements, part numbers, and any deviations from the standard procedure. Avoid vague terms like 'checked and OK' — instead, state what was checked and what the readings or findings were."
  },
  {
    question: "Who owns the maintenance records?",
    answer: "Maintenance records are typically owned by the asset owner or duty holder — the organisation responsible for the equipment. As a technician, you create the records, but they become part of the organisation's asset management system. They must be retained for the periods specified by regulatory requirements (typically a minimum of 5 years for electrical inspection records under BS 7671)."
  },
  {
    question: "Can maintenance records be used as legal evidence?",
    answer: "Yes. Maintenance records can be used as evidence in legal proceedings, HSE investigations, insurance claims, and employment tribunals. They may demonstrate compliance with statutory duties or, conversely, may reveal failures in maintenance management. This is why accuracy, completeness, and honesty in recording are essential — never falsify or 'improve' records after the event."
  }
];

const MOETModule6Section3_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module6-section3">
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
            <FileText className="h-4 w-4" />
            <span>Module 6.3.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Recording Work Completed
          </h1>
          <p className="text-white/80">
            Logbooks, CMMS entries and asset history documentation for electrical maintenance
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Logbooks:</strong> Chronological record of all maintenance activities on an asset</li>
              <li className="pl-1"><strong>CMMS:</strong> Computerised system for planning, tracking and recording maintenance</li>
              <li className="pl-1"><strong>Work orders:</strong> Planned, scheduled, in progress, completed, closed</li>
              <li className="pl-1"><strong>Compliance:</strong> BS 7671 Reg 132.13 requires maintained records</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Asset identification:</strong> Unique asset numbers and equipment tags</li>
              <li className="pl-1"><strong>Fault records:</strong> Symptom, root cause, corrective action, parts used</li>
              <li className="pl-1"><strong>Test results:</strong> Insulation resistance, continuity, RCD trip times</li>
              <li className="pl-1"><strong>ST1426:</strong> Maps to documentation and reporting KSBs</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the purpose and importance of accurate maintenance work recording",
              "Complete logbook entries with all required information fields",
              "Use CMMS systems to create, update and close work orders",
              "Record asset history data that supports future maintenance decisions",
              "Apply BS 7671 and ST1426 requirements for maintenance documentation",
              "Identify the consequences of poor or incomplete work recording"
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
            Why Recording Work Matters
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Every maintenance task you complete generates information that has value far beyond the immediate job.
              Accurate, timely recording of completed work creates the institutional knowledge that drives effective
              maintenance management. Without proper records, organisations lose visibility of their asset condition,
              cannot identify recurring problems, and struggle to demonstrate compliance with statutory requirements.
            </p>
            <p>
              In electrical maintenance, the consequences of poor recording can be severe. Consider a scenario where
              a motor control centre experiences intermittent overheating. If the first technician records only
              "checked and OK" with no measurements, the next technician attending a repeat callout has no baseline
              for comparison. If temperatures are recorded each time, a clear deterioration trend becomes visible —
              enabling proactive intervention before a catastrophic failure.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Value of Good Records</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Safety:</strong> Records of isolation, testing and commissioning protect both the technician and future workers on the same equipment</li>
                <li className="pl-1"><strong>Continuity:</strong> When shifts change or technicians move on, records ensure knowledge is retained</li>
                <li className="pl-1"><strong>Compliance:</strong> EAWR 1989, BS 7671 and PUWER 1998 all require evidence of proper maintenance</li>
                <li className="pl-1"><strong>Cost control:</strong> Accurate records of parts used, time spent and recurring faults support budgeting and procurement</li>
                <li className="pl-1"><strong>Legal protection:</strong> In the event of an incident, records demonstrate that maintenance was carried out competently</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Real-World Consequence</p>
              <p className="text-sm text-white">
                In HSE prosecutions following workplace electrical incidents, one of the first documents requested
                is the maintenance record. Organisations that cannot produce complete, accurate maintenance records
                face significantly harsher penalties. The absence of records is treated as evidence that maintenance
                was not carried out — even if it was. The legal principle is clear: if it is not recorded, it did
                not happen.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Maintenance Logbooks
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A maintenance logbook is a chronological record of all maintenance activities carried out on an asset,
              system, or within a defined area (such as a switchroom or substation). Logbooks can be paper-based or
              digital, but the principle is the same: every intervention is recorded with sufficient detail for
              another competent person to understand what was done.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">What to Record in a Logbook Entry</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Date and time:</strong> When the work was carried out (start and finish times for longer tasks)</li>
                <li className="pl-1"><strong>Asset identification:</strong> Unique asset number, equipment tag, or circuit reference</li>
                <li className="pl-1"><strong>Type of maintenance:</strong> Planned preventive, corrective, emergency, modification, or inspection</li>
                <li className="pl-1"><strong>Description of work:</strong> Clear, factual account of what was done</li>
                <li className="pl-1"><strong>Findings:</strong> What was observed, including measurements, test results and condition assessments</li>
                <li className="pl-1"><strong>Parts and materials:</strong> Specific items used, including part numbers and quantities</li>
                <li className="pl-1"><strong>Outstanding actions:</strong> Any follow-up work required, with priority indication</li>
                <li className="pl-1"><strong>Technician identification:</strong> Name, signature, and employee/contractor number</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Example Logbook Entry — Good vs Poor</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Aspect</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Poor Entry</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Good Entry</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Description</td>
                      <td className="border border-white/10 px-3 py-2">"Checked motor. OK."</td>
                      <td className="border border-white/10 px-3 py-2">"PM inspection on AHU-3 supply fan motor (Asset M-0147). IR test phase-to-earth: L1=185 MΩ, L2=192 MΩ, L3=178 MΩ at 500 V. Bearings — no excess vibration or noise. Terminal connections tight. Condition: satisfactory."</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Value</td>
                      <td className="border border-white/10 px-3 py-2">No baseline, no evidence, no traceability</td>
                      <td className="border border-white/10 px-3 py-2">Clear baseline readings, specific asset ID, enables trend comparison</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Logbook entries should be made as soon as practicable after completing the
              work. Waiting until the end of the shift or the following day leads to forgotten details and inaccurate
              records. If working in a clean area where paper is impractical, note key details on your phone or a
              pocket notebook and transfer them promptly.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            CMMS Work Order Management
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A Computerised Maintenance Management System (CMMS) is the central platform for planning, scheduling,
              tracking and recording maintenance activities across an organisation. As a maintenance technician, you
              will interact with the CMMS daily — receiving work orders, updating task progress, recording findings,
              and closing completed jobs.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Work Order Lifecycle</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-elec-yellow/80 text-xs font-mono mt-0.5">01</span>
                    <div>
                      <p className="text-sm font-medium">Planned</p>
                      <p className="text-sm text-white/70">Work identified and approved — resources, parts and procedures defined</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-elec-yellow/80 text-xs font-mono mt-0.5">02</span>
                    <div>
                      <p className="text-sm font-medium">Scheduled</p>
                      <p className="text-sm text-white/70">Assigned to a specific date, shift, and technician</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-elec-yellow/80 text-xs font-mono mt-0.5">03</span>
                    <div>
                      <p className="text-sm font-medium">In Progress</p>
                      <p className="text-sm text-white/70">Technician has started the work — status updated in real time</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-elec-yellow/80 text-xs font-mono mt-0.5">04</span>
                    <div>
                      <p className="text-sm font-medium">Completed</p>
                      <p className="text-sm text-white/70">Work finished, findings recorded, awaiting supervisor review</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-elec-yellow/80 text-xs font-mono mt-0.5">05</span>
                    <div>
                      <p className="text-sm font-medium">Closed</p>
                      <p className="text-sm text-white/70">Reviewed, approved and archived — becomes part of the asset history</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Common CMMS Platforms</h3>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Platform</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Sector</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Features</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">SAP PM</td>
                      <td className="border border-white/10 px-3 py-2">Large industrial, manufacturing</td>
                      <td className="border border-white/10 px-3 py-2">Enterprise integration, asset hierarchy, cost tracking</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">IBM Maximo</td>
                      <td className="border border-white/10 px-3 py-2">Utilities, transport, healthcare</td>
                      <td className="border border-white/10 px-3 py-2">Asset lifecycle management, spatial tracking</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fiix / eMaint</td>
                      <td className="border border-white/10 px-3 py-2">SMEs, facilities management</td>
                      <td className="border border-white/10 px-3 py-2">Cloud-based, mobile-friendly, quick deployment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Planon / Concept</td>
                      <td className="border border-white/10 px-3 py-2">Commercial property, FM</td>
                      <td className="border border-white/10 px-3 py-2">Integrated workplace management, BIM integration</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Tip:</strong> Regardless of which CMMS your employer uses, the principles of good work recording
              are the same. Focus on capturing complete, accurate information — the specific fields and screens will
              vary between systems, but the data requirements are universal.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Asset History and Trend Analysis
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Every work order you complete and every logbook entry you make contributes to the asset's maintenance
              history. Over time, this history becomes the most valuable dataset in the maintenance management system.
              It reveals patterns, predicts failures, and informs decisions about repair, refurbishment, or replacement.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">What Asset History Reveals</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Recurring fault patterns indicating underlying issues</li>
                  <li className="pl-1">Deterioration trends in test results over time</li>
                  <li className="pl-1">Mean time between failures (MTBF) for reliability analysis</li>
                  <li className="pl-1">Total cost of ownership to support replace-vs-repair decisions</li>
                  <li className="pl-1">Effectiveness of preventive maintenance programmes</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Electrical Maintenance Examples</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Declining insulation resistance readings on a motor over 3 years</li>
                  <li className="pl-1">Repeated contactor failures on a specific production line</li>
                  <li className="pl-1">Increasing RCD trip times approaching the 300 ms limit</li>
                  <li className="pl-1">Thermal imaging trend showing rising connection temperatures</li>
                  <li className="pl-1">Transformer oil analysis showing progressive moisture ingress</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Recording Test Results for Trend Analysis</h3>
              <p className="text-sm text-white mb-3">
                When recording electrical test results, always include the specific values — not just pass/fail.
                A pass today might be a marginal result that indicates an asset heading towards failure.
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Test</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Record This</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Not Just This</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Insulation resistance</td>
                      <td className="border border-white/10 px-3 py-2">"IR L1-E: 45 MΩ at 500 V DC"</td>
                      <td className="border border-white/10 px-3 py-2">"IR test: pass"</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">RCD trip time</td>
                      <td className="border border-white/10 px-3 py-2">"30 mA RCD trip: 28 ms at I∆n"</td>
                      <td className="border border-white/10 px-3 py-2">"RCD: OK"</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Earth fault loop impedance</td>
                      <td className="border border-white/10 px-3 py-2">"Zs: 0.82 Ω (max permitted 1.09 Ω)"</td>
                      <td className="border border-white/10 px-3 py-2">"Zs: satisfactory"</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The maintenance technician standard specifically requires you to
              demonstrate the ability to record maintenance activities accurately and use records to support
              maintenance planning. Your ability to create clear, useful asset history records directly supports
              your EPA evidence.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Regulatory Requirements and Best Practice
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Maintenance recording is not optional — it is a statutory and regulatory requirement underpinned by
              multiple pieces of legislation and industry standards. Understanding these requirements ensures your
              records meet the standard expected during audits, inspections, and investigations.
            </p>

            <div className="my-6">
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Regulation / Standard</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Recording Requirement</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">EAWR 1989 Reg 4(2)</td>
                      <td className="border border-white/10 px-3 py-2">Systems must be maintained to prevent danger — records demonstrate compliance</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">BS 7671 Reg 132.13</td>
                      <td className="border border-white/10 px-3 py-2">Records including diagrams shall be maintained and updated</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">PUWER 1998 Reg 5</td>
                      <td className="border border-white/10 px-3 py-2">Work equipment must be maintained — maintenance log to be kept up to date</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">HASAWA 1974 s.2</td>
                      <td className="border border-white/10 px-3 py-2">General duty to ensure safe systems of work — records provide evidence</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">ST1426</td>
                      <td className="border border-white/10 px-3 py-2">Technicians must accurately record and report maintenance activities</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Best Practice Summary</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Record promptly:</strong> Complete records as soon as practicable after the work</li>
                <li className="pl-1"><strong>Be specific:</strong> Use asset numbers, measurements, and precise descriptions</li>
                <li className="pl-1"><strong>Be honest:</strong> Record what you actually found and did — never embellish or falsify</li>
                <li className="pl-1"><strong>Include negatives:</strong> Record findings even when no defect was found — this is still valuable data</li>
                <li className="pl-1"><strong>Flag follow-ups:</strong> Clearly identify any outstanding actions with priority and recommended timescale</li>
                <li className="pl-1"><strong>Use the system:</strong> Enter data into the CMMS rather than relying on personal notes</li>
                <li className="pl-1"><strong>Sign your work:</strong> Take ownership of your records with clear identification</li>
              </ul>
            </div>
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

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Work Order Lifecycle</p>
                <ul className="space-y-0.5">
                  <li>1. Planned — work identified and approved</li>
                  <li>2. Scheduled — assigned date, time and technician</li>
                  <li>3. In Progress — work underway</li>
                  <li>4. Completed — work done, awaiting review</li>
                  <li>5. Closed — reviewed, approved, archived</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key References</p>
                <ul className="space-y-0.5">
                  <li>EAWR 1989 — Reg 4(2) maintenance duty</li>
                  <li>BS 7671 — Reg 132.13 record keeping</li>
                  <li>PUWER 1998 — Reg 5 maintenance records</li>
                  <li>HASAWA 1974 — s.2 general duty</li>
                  <li>ST1426 — Documentation and reporting KSBs</li>
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
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module6-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section Overview
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module6-section3-2">
              Next: Fault Reports
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule6Section3_1;
