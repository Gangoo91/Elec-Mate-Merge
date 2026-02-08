import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Maintenance Scheduling and Records - MOET Module 4.1.2";
const DESCRIPTION = "CMMS and CAFM systems, work order management, scheduling techniques, asset registers, maintenance history, KPIs including MTBF, MTTR and availability, and data-driven maintenance decisions for electrical technicians.";

const quickCheckQuestions = [
  {
    id: "cmms-purpose",
    question: "What is the primary purpose of a Computerised Maintenance Management System (CMMS)?",
    options: [
      "To replace the need for maintenance technicians",
      "To plan, schedule, track and record all maintenance activities and asset information in a centralised database",
      "To control building heating and ventilation systems",
      "To generate invoices for maintenance contractors"
    ],
    correctIndex: 1,
    explanation: "A CMMS is a software platform that centralises all maintenance information — asset registers, work orders, schedules, history, spare parts and KPIs. It enables efficient planning, scheduling and tracking of maintenance activities, and provides the data needed for continuous improvement."
  },
  {
    id: "work-order-lifecycle",
    question: "What is the correct lifecycle of a maintenance work order?",
    options: [
      "Complete, request, close",
      "Request, plan, schedule, execute, record, close",
      "Schedule, execute, delete",
      "Execute, invoice, archive"
    ],
    correctIndex: 1,
    explanation: "A work order follows a structured lifecycle: it is requested (either from the PPM schedule or a reactive report), planned (resources and materials identified), scheduled (date and time allocated), executed (work carried out), recorded (findings and actions documented), and closed (completion verified and history updated)."
  },
  {
    id: "mtbf-meaning",
    question: "MTBF stands for Mean Time Between Failures. If a motor has an MTBF of 8,760 hours, what does this indicate?",
    options: [
      "The motor will always fail after exactly 8,760 hours",
      "On average, the motor operates for approximately 8,760 hours (about one year of continuous running) between failures",
      "The motor requires maintenance every 8,760 minutes",
      "The motor costs £8,760 to repair"
    ],
    correctIndex: 1,
    explanation: "MTBF of 8,760 hours means that, on average, the motor runs for approximately 8,760 hours between failures — roughly one year of continuous 24/7 operation. It is a statistical average, not a guarantee; individual motors may fail sooner or later. A rising MTBF trend indicates improving reliability."
  },
  {
    id: "ppm-compliance",
    question: "PPM compliance is measured as the percentage of:",
    options: [
      "Equipment that has never failed",
      "Planned maintenance tasks completed on time versus the total number scheduled",
      "Maintenance technicians who hold formal qualifications",
      "Spare parts held in stock"
    ],
    correctIndex: 1,
    explanation: "PPM compliance measures how many scheduled preventive maintenance tasks were completed on time compared to the total number scheduled. A target of 90-95% is typical for well-managed organisations. Low compliance indicates scheduling problems, resource shortages or poor prioritisation."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A CMMS (Computerised Maintenance Management System) is used to:",
    options: [
      "Design new electrical installations",
      "Manage maintenance work orders, asset data, schedules and history",
      "Control the building management system remotely",
      "Carry out electrical testing automatically"
    ],
    correctAnswer: 1,
    explanation: "A CMMS is a software platform for managing all aspects of maintenance operations, including work order management, asset registers, PPM scheduling, maintenance history, spare parts inventory and KPI reporting. It is the digital backbone of modern maintenance management."
  },
  {
    id: 2,
    question: "CAFM stands for:",
    options: [
      "Computer Assisted Fault Monitoring",
      "Computer Aided Facilities Management",
      "Centralised Asset Failure Management",
      "Condition Assessment and Fault Mapping"
    ],
    correctAnswer: 1,
    explanation: "CAFM (Computer Aided Facilities Management) is a broader platform than a CMMS, covering all aspects of facilities management including space management, help desk, contractor management and compliance tracking, as well as maintenance management. Many modern platforms combine CMMS and CAFM functionality."
  },
  {
    id: 3,
    question: "An asset register should contain which of the following information?",
    options: [
      "Only the location of each asset",
      "Asset identification, location, type, rating, manufacturer, installation date, condition, criticality and maintenance history",
      "Only the purchase price and warranty expiry date",
      "Only the next scheduled maintenance date"
    ],
    correctAnswer: 1,
    explanation: "A comprehensive asset register is the foundation of effective maintenance management. It should include unique identification, precise location, type and rating, manufacturer and model, installation/commissioning date, current condition assessment, criticality ranking, maintenance history, and links to technical documentation."
  },
  {
    id: 4,
    question: "The key advantage of scheduling PPM work during planned shutdowns is:",
    options: [
      "Technicians prefer working during shutdowns",
      "It minimises disruption to production while allowing safe access to equipment that is normally energised or in continuous use",
      "Shutdowns are cheaper because electricity is not being used",
      "It avoids the need for permits to work"
    ],
    correctAnswer: 1,
    explanation: "Scheduling maintenance during planned shutdowns allows access to equipment that cannot be safely maintained while in service, minimises production disruption, and enables more thorough inspection and testing. However, shutdown windows are limited, so work must be carefully planned and prioritised."
  },
  {
    id: 5,
    question: "MTTR (Mean Time to Repair) measures:",
    options: [
      "The average time between equipment failures",
      "The average time taken to restore equipment to operational status after a failure",
      "The total time equipment has been operational since installation",
      "The time until the next scheduled maintenance"
    ],
    correctAnswer: 1,
    explanation: "MTTR measures the average time taken to diagnose, repair and restore equipment to full operational status after a failure. It includes fault finding, parts procurement, repair and testing. A lower MTTR indicates efficient repair processes, good spare parts availability and skilled technicians."
  },
  {
    id: 6,
    question: "Equipment availability is calculated as:",
    options: [
      "MTTR divided by MTBF",
      "MTBF divided by (MTBF + MTTR), expressed as a percentage",
      "Total operating hours divided by total repair hours",
      "Number of failures divided by total operating hours"
    ],
    correctAnswer: 1,
    explanation: "Availability = MTBF / (MTBF + MTTR) x 100%. For example, if MTBF is 990 hours and MTTR is 10 hours, availability is 990/(990+10) = 99%. This metric shows the proportion of time equipment is available for use. High availability requires both high reliability (high MTBF) and fast repair (low MTTR)."
  },
  {
    id: 7,
    question: "A maintenance backlog of over 4 weeks of work typically indicates:",
    options: [
      "The maintenance team is working efficiently",
      "Insufficient maintenance resources, poor planning, or too many reactive tasks consuming planned maintenance time",
      "The equipment is in excellent condition",
      "The CMMS system is generating too many reports"
    ],
    correctAnswer: 1,
    explanation: "A growing maintenance backlog indicates that work is being generated faster than it can be completed. Common causes include insufficient staffing, too much reactive maintenance displacing planned work, poor scheduling, or unrealistic maintenance plans. A healthy backlog is typically 2-4 weeks; beyond this, critical tasks may be missed."
  },
  {
    id: 8,
    question: "When recording maintenance findings on a work order, which information is most important?",
    options: [
      "The weather conditions during the maintenance visit",
      "Actual condition found, measurements taken, work carried out, parts used, anomalies identified and recommendations for further action",
      "The time the technician arrived and left site",
      "The name of the manufacturer's helpline contact"
    ],
    correctAnswer: 1,
    explanation: "Detailed recording of findings is essential for maintenance history, trend analysis and future planning. The record should capture what was found, what was measured (with values), what work was done, what parts were used, any anomalies or concerns, and recommendations for follow-up action. This data drives continuous improvement of the maintenance programme."
  },
  {
    id: 9,
    question: "Data-driven maintenance decisions rely on:",
    options: [
      "The maintenance manager's gut feeling",
      "Analysis of historical failure data, condition monitoring trends, KPI performance and cost data to optimise maintenance strategies",
      "Copying what other organisations do without analysis",
      "Always increasing the frequency of all maintenance tasks"
    ],
    correctAnswer: 1,
    explanation: "Data-driven decisions use evidence from CMMS records, condition monitoring systems and financial data to identify where maintenance is effective and where it needs adjustment. This might mean increasing frequency on assets with rising failure rates, reducing frequency on assets with consistently good condition, or changing strategy entirely based on failure patterns."
  },
  {
    id: 10,
    question: "A Gantt chart in maintenance scheduling is used to:",
    options: [
      "Measure the temperature of electrical connections",
      "Visually display the timeline of scheduled maintenance tasks, showing duration, sequence and resource allocation",
      "Calculate the cost of spare parts",
      "Test the insulation resistance of cables"
    ],
    correctAnswer: 1,
    explanation: "A Gantt chart is a bar chart that shows scheduled tasks along a timeline, making it easy to visualise when work is planned, how long it will take, which tasks overlap, and where resource conflicts exist. It is widely used in maintenance planning, particularly for shutdown scheduling where multiple tasks must be coordinated."
  },
  {
    id: 11,
    question: "The ratio of planned maintenance hours to total maintenance hours is known as:",
    options: [
      "PPM compliance",
      "The planned/unplanned ratio (or reactive/proactive split)",
      "Equipment availability",
      "MTBF"
    ],
    correctAnswer: 1,
    explanation: "The planned/unplanned ratio measures how much maintenance time is spent on planned activities versus reactive repairs. World-class maintenance targets at least 80% planned work. A high proportion of reactive work indicates an immature maintenance programme where PPM is either insufficient or poorly implemented."
  },
  {
    id: 12,
    question: "Under ST1426, which of the following is a required behaviour when completing maintenance records?",
    options: [
      "Recording only successful tasks and omitting any problems found",
      "Accurately recording all findings, measurements and actions, including anomalies and recommendations",
      "Leaving records until the end of the week and completing them from memory",
      "Allowing another person to complete your records on your behalf"
    ],
    correctAnswer: 1,
    explanation: "ST1426 requires maintenance technicians to maintain accurate records of work carried out, including measurements, observations and anomalies. Records should be completed contemporaneously (at the time of the work), be factual and accurate, and include recommendations for further action where appropriate. This is a fundamental professional behaviour."
  }
];

const faqs = [
  {
    question: "What is the difference between a CMMS and a CAFM system?",
    answer: "A CMMS (Computerised Maintenance Management System) focuses specifically on maintenance operations — work orders, PPM scheduling, asset data and maintenance history. A CAFM (Computer Aided Facilities Management) system is broader, covering all facilities management functions including space management, help desk, compliance, energy management and contractor control. Many modern platforms offer integrated CMMS/CAFM functionality. Common examples include Maximo, SAP PM, Planon, MRI and Concept Evolution."
  },
  {
    question: "How do I calculate equipment availability?",
    answer: "Availability = MTBF / (MTBF + MTTR) x 100%. MTBF is Mean Time Between Failures (average operating time between breakdowns) and MTTR is Mean Time to Repair (average time to fix a breakdown). For example: if a motor runs for an average of 2,000 hours between failures (MTBF) and takes an average of 8 hours to repair (MTTR), its availability is 2,000 / (2,000 + 8) = 99.6%. Improving availability requires either increasing reliability (fewer failures) or reducing repair time (faster fixes)."
  },
  {
    question: "What PPM compliance percentage should we target?",
    answer: "Industry best practice targets PPM compliance of 90-95%. This means 90-95% of scheduled preventive maintenance tasks are completed on time. Below 80% indicates serious problems with the maintenance programme. 100% is theoretically ideal but practically very difficult to achieve, as some tasks may be deferred for legitimate operational reasons. The key is to ensure safety-critical tasks always achieve 100% compliance."
  },
  {
    question: "How should maintenance records be stored?",
    answer: "Maintenance records should be stored in a CMMS or equivalent database for easy retrieval, analysis and reporting. Paper records, while still used in some organisations, are difficult to search, analyse and share. Records should be retained for at least the life of the asset, and statutory records (such as periodic inspection reports) should be kept as required by the relevant legislation. Cloud-based CMMS platforms provide secure, accessible storage with automatic backup."
  },
  {
    question: "What should I do if I find an anomaly during PPM that is not covered by the work order?",
    answer: "Record the anomaly in detail on the work order (including photos if possible), assess whether it presents an immediate safety risk, and report it to your supervisor or the maintenance manager. If the anomaly is safety-critical (e.g., exposed live conductors, signs of overheating), take immediate action to make the situation safe (isolate if necessary) and raise an emergency work order. For non-urgent anomalies, raise a follow-up work order in the CMMS for investigation and repair."
  }
];

const MOETModule4Section1_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section1">
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
            <Shield className="h-4 w-4" />
            <span>Module 4.1.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Maintenance Scheduling and Records
          </h1>
          <p className="text-white/80">
            CMMS systems, work order management, KPIs and data-driven maintenance decisions
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>CMMS:</strong> Digital platform for managing all maintenance activities</li>
              <li className="pl-1"><strong>Work orders:</strong> Formal records of maintenance tasks from request to close</li>
              <li className="pl-1"><strong>KPIs:</strong> MTBF, MTTR, availability, PPM compliance, backlog</li>
              <li className="pl-1"><strong>Records:</strong> Accurate, contemporaneous documentation of all findings</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Asset registers:</strong> Switchgear, motors, drives, emergency systems</li>
              <li className="pl-1"><strong>Scheduling:</strong> Shutdown planning, statutory test intervals</li>
              <li className="pl-1"><strong>Trending:</strong> Insulation resistance, thermal data, vibration levels</li>
              <li className="pl-1"><strong>ST1426:</strong> Accurate record keeping is a core competency</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Describe the functions and benefits of CMMS and CAFM systems",
              "Explain the work order lifecycle from request to close-out",
              "Apply scheduling techniques including Gantt charts and shutdown planning",
              "Maintain accurate asset registers and maintenance history records",
              "Calculate and interpret maintenance KPIs (MTBF, MTTR, availability)",
              "Use maintenance data to drive continuous improvement decisions"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: CMMS and CAFM Systems */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            CMMS and CAFM Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Modern maintenance management relies on digital systems to handle the complexity of scheduling,
              tracking and recording maintenance activities across potentially thousands of assets. A
              Computerised Maintenance Management System (CMMS) is the core tool for this purpose, while
              Computer Aided Facilities Management (CAFM) systems provide broader facilities management
              functionality.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Core CMMS Functions</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Asset register:</strong> Centralised database of all assets with technical data, location, criticality and documentation links</li>
                <li className="pl-1"><strong>Work order management:</strong> Create, assign, track and close maintenance tasks with full audit trail</li>
                <li className="pl-1"><strong>PPM scheduling:</strong> Automated generation of planned maintenance work orders based on time, meter readings or condition triggers</li>
                <li className="pl-1"><strong>Maintenance history:</strong> Complete record of all work carried out on each asset, including findings, measurements and parts used</li>
                <li className="pl-1"><strong>Spare parts management:</strong> Stock levels, reorder points, usage tracking and cost allocation</li>
                <li className="pl-1"><strong>Reporting and KPIs:</strong> Automated calculation of performance metrics including MTBF, MTTR, availability and PPM compliance</li>
                <li className="pl-1"><strong>Mobile access:</strong> Tablet and smartphone apps allowing technicians to receive, update and close work orders in the field</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common CMMS/CAFM Platforms</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Platform</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">IBM Maximo</td>
                      <td className="border border-white/10 px-3 py-2">Enterprise CMMS/EAM</td>
                      <td className="border border-white/10 px-3 py-2">Large industrial, utilities, transport</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">SAP PM</td>
                      <td className="border border-white/10 px-3 py-2">Enterprise CMMS</td>
                      <td className="border border-white/10 px-3 py-2">Manufacturing, process industries</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Planon / MRI</td>
                      <td className="border border-white/10 px-3 py-2">CAFM</td>
                      <td className="border border-white/10 px-3 py-2">Commercial property, FM service providers</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Concept Evolution</td>
                      <td className="border border-white/10 px-3 py-2">CAFM</td>
                      <td className="border border-white/10 px-3 py-2">UK FM sector, NHS, education</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fiix / UpKeep</td>
                      <td className="border border-white/10 px-3 py-2">Cloud CMMS</td>
                      <td className="border border-white/10 px-3 py-2">SMEs, mobile-first maintenance teams</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> As a maintenance technician, you will interact with a CMMS daily —
              receiving work orders, recording findings, closing tasks and updating asset information. Becoming
              proficient with the system your organisation uses is essential for effective professional practice.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Work Order Management */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Work Order Management
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The work order is the fundamental unit of maintenance management. Every maintenance activity —
              whether planned preventive, corrective, emergency or improvement — should be captured as a
              work order in the CMMS. This provides traceability, accountability and the data needed for
              performance analysis.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Work Order Lifecycle</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Request:</strong> Work is initiated — either automatically from the PPM schedule, from a reactive fault report, or from a condition monitoring alert</li>
                  <li className="pl-1"><strong>Plan:</strong> Resources identified — technician skill requirements, estimated duration, spare parts needed, special tools, permits required</li>
                  <li className="pl-1"><strong>Schedule:</strong> Work allocated to a specific date, time and technician, considering equipment availability, resource capacity and priority</li>
                  <li className="pl-1"><strong>Execute:</strong> Technician carries out the work, following the task instructions and method statement</li>
                  <li className="pl-1"><strong>Record:</strong> Findings documented — condition observed, measurements taken, work carried out, parts used, anomalies found, time spent</li>
                  <li className="pl-1"><strong>Close:</strong> Work order completed, reviewed by supervisor if required, and closed in the CMMS. History updated automatically</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Work Order Priority Classification</h3>
                <div className="overflow-x-auto">
                  <table className="text-sm text-white w-full border-collapse">
                    <thead>
                      <tr className="bg-white/5">
                        <th className="border border-white/10 px-3 py-2 text-left">Priority</th>
                        <th className="border border-white/10 px-3 py-2 text-left">Response Time</th>
                        <th className="border border-white/10 px-3 py-2 text-left">Electrical Example</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-white/10 px-3 py-2 font-medium text-red-400">P1 — Emergency</td>
                        <td className="border border-white/10 px-3 py-2">Immediate (within 1-2 hours)</td>
                        <td className="border border-white/10 px-3 py-2">Total power failure, exposed live conductors, fire alarm system down</td>
                      </tr>
                      <tr>
                        <td className="border border-white/10 px-3 py-2 font-medium text-orange-400">P2 — Urgent</td>
                        <td className="border border-white/10 px-3 py-2">Same day (within 4-8 hours)</td>
                        <td className="border border-white/10 px-3 py-2">Partial power loss, UPS on battery, emergency lighting fault</td>
                      </tr>
                      <tr>
                        <td className="border border-white/10 px-3 py-2 font-medium text-yellow-400">P3 — Routine</td>
                        <td className="border border-white/10 px-3 py-2">Within 5-10 working days</td>
                        <td className="border border-white/10 px-3 py-2">Non-critical lighting failure, minor socket fault, cosmetic damage</td>
                      </tr>
                      <tr>
                        <td className="border border-white/10 px-3 py-2 font-medium text-green-400">P4 — Planned</td>
                        <td className="border border-white/10 px-3 py-2">Scheduled as per PPM calendar</td>
                        <td className="border border-white/10 px-3 py-2">Annual switchboard inspection, quarterly RCD testing, motor greasing</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Common Mistake</p>
              <p className="text-sm text-white">
                One of the most damaging practices in maintenance management is allowing reactive work to
                constantly displace planned maintenance. When every fault is treated as urgent and PPM tasks
                are deferred, the maintenance programme enters a vicious cycle: deferred PPM leads to more
                failures, which generate more reactive work, which defers more PPM. Breaking this cycle
                requires discipline in prioritisation and ring-fencing planned maintenance time.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Scheduling Techniques */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Scheduling Techniques
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective scheduling ensures the right work is done at the right time by the right person
              with the right resources. Poor scheduling wastes labour (technicians waiting for parts or
              access), misses critical maintenance windows and creates frustration for both the
              maintenance team and building occupants.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Calendar-Based Scheduling</h3>
                <p className="text-sm text-white mb-2">
                  The simplest approach: tasks are scheduled at fixed intervals (daily, weekly, monthly,
                  quarterly, annually). The CMMS automatically generates work orders when the interval
                  elapses. Suitable for routine PPM where the interval is well established.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Monthly: Emergency lighting function test, fire alarm weekly test (if not automated)</li>
                  <li className="pl-1">Quarterly: RCD testing, generator load test, UPS battery check</li>
                  <li className="pl-1">Annually: Switchboard thermal survey, motor insulation resistance test, full fire alarm service</li>
                  <li className="pl-1">5-yearly: Electrical Installation Condition Report (EICR)</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Shutdown Scheduling</h3>
                <p className="text-sm text-white mb-2">
                  Some maintenance tasks can only be performed when equipment is de-energised and out of
                  service. These tasks must be batched and scheduled into planned shutdown windows. Shutdown
                  planning requires careful coordination.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Identify all tasks requiring shutdown access — do not waste the shutdown on tasks that could be done live</li>
                  <li className="pl-1">Estimate task durations and sequence — critical path analysis determines the minimum shutdown duration</li>
                  <li className="pl-1">Pre-stage materials and tools — every minute of shutdown is valuable</li>
                  <li className="pl-1">Assign clear responsibilities — who does what, in what order</li>
                  <li className="pl-1">Plan for contingencies — what if an unexpected fault is found during the shutdown?</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Resource Levelling</h3>
                <p className="text-sm text-white">
                  If all quarterly PPM tasks are scheduled for the first week of the quarter, the maintenance
                  team will be overwhelmed. Resource levelling spreads the workload evenly across the available
                  period. For example, if there are 100 quarterly tasks and a team of 5 technicians, the tasks
                  should be distributed across 12-13 weeks, not crammed into one week. CMMS systems can
                  automate this distribution based on available labour hours.
                </p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> A well-scheduled maintenance programme balances workload, minimises
              disruption and ensures critical tasks are never deferred. The CMMS is the essential tool for
              achieving this, but it requires accurate data input from technicians to function effectively.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: KPIs and Data-Driven Decisions */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Maintenance KPIs and Data-Driven Decisions
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Key Performance Indicators (KPIs) provide objective measurements of maintenance effectiveness.
              Without KPIs, maintenance management is based on assumptions and anecdotes. With them,
              decisions are evidence-based, improvements are measurable, and resources can be justified.
            </p>

            <div className="my-6">
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">KPI</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Definition</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Target</th>
                      <th className="border border-white/10 px-3 py-2 text-left">What It Tells You</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">MTBF</td>
                      <td className="border border-white/10 px-3 py-2">Mean Time Between Failures</td>
                      <td className="border border-white/10 px-3 py-2">Increasing trend</td>
                      <td className="border border-white/10 px-3 py-2">Equipment reliability — higher is better</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">MTTR</td>
                      <td className="border border-white/10 px-3 py-2">Mean Time to Repair</td>
                      <td className="border border-white/10 px-3 py-2">Decreasing trend</td>
                      <td className="border border-white/10 px-3 py-2">Repair efficiency — lower is better</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Availability</td>
                      <td className="border border-white/10 px-3 py-2">MTBF / (MTBF + MTTR) x 100%</td>
                      <td className="border border-white/10 px-3 py-2">&gt;99% for critical assets</td>
                      <td className="border border-white/10 px-3 py-2">Proportion of time equipment is operational</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">PPM Compliance</td>
                      <td className="border border-white/10 px-3 py-2">Tasks completed on time / total scheduled</td>
                      <td className="border border-white/10 px-3 py-2">&gt;90%</td>
                      <td className="border border-white/10 px-3 py-2">Discipline of the maintenance programme</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Planned/Reactive Ratio</td>
                      <td className="border border-white/10 px-3 py-2">Planned hours / total maintenance hours</td>
                      <td className="border border-white/10 px-3 py-2">&gt;80% planned</td>
                      <td className="border border-white/10 px-3 py-2">Maturity of maintenance programme</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Backlog</td>
                      <td className="border border-white/10 px-3 py-2">Outstanding work orders in weeks of effort</td>
                      <td className="border border-white/10 px-3 py-2">2-4 weeks</td>
                      <td className="border border-white/10 px-3 py-2">Resource adequacy — growing backlog = insufficient resource</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Using Data to Improve</h3>
                <p className="text-sm text-white">
                  Maintenance data from the CMMS enables continuous improvement. If a particular motor type
                  shows declining MTBF, the maintenance frequency can be increased or the failure mode
                  investigated. If PPM compliance drops in a particular area, resource allocation can be
                  adjusted. If certain spare parts are consistently used, stockholding can be optimised.
                  The data only has value if it is accurate — which depends on technicians recording findings
                  properly.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Trend Analysis</h3>
                <p className="text-sm text-white">
                  Single data points have limited value; trends tell the story. Plotting insulation resistance
                  readings over time reveals whether insulation is degrading. Plotting MTBF for a group of
                  assets shows whether reliability is improving or declining. Plotting PPM compliance month by
                  month shows whether the maintenance programme is under control. Always look for the trend,
                  not just the individual reading.
                </p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The maintenance technician standard requires you to use
              appropriate data to inform maintenance decisions and contribute to continuous improvement.
              Understanding KPIs and being able to explain what they mean is a key competency for your
              end-point assessment.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

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

        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Work Order Lifecycle</p>
                <ul className="space-y-0.5">
                  <li>1. Request — initiate from PPM, reactive or condition alert</li>
                  <li>2. Plan — identify resources, parts and permits</li>
                  <li>3. Schedule — allocate date, time and technician</li>
                  <li>4. Execute — carry out work per task instructions</li>
                  <li>5. Record — document findings, measurements, actions</li>
                  <li>6. Close — complete, review and update history</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key KPI Formulae</p>
                <ul className="space-y-0.5">
                  <li>MTBF = Total operating time / Number of failures</li>
                  <li>MTTR = Total repair time / Number of repairs</li>
                  <li>Availability = MTBF / (MTBF + MTTR) x 100%</li>
                  <li>PPM Compliance = Completed on time / Total scheduled x 100%</li>
                  <li>Target: &gt;90% PPM compliance, &gt;80% planned ratio</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section1-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Principles of PPM
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section1-3">
              Next: Lubrication, Cleaning and Adjustments
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule4Section1_2;
