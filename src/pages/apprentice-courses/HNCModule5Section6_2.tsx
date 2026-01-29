import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Progress Monitoring - HNC Module 5 Section 6.2";
const DESCRIPTION = "Master progress monitoring techniques for building services projects: site diaries, progress reports, programme updates, progress meetings, KPI tracking, and delay analysis methods.";

const quickCheckQuestions = [
  {
    id: "site-diary-purpose",
    question: "What is the primary purpose of a site diary in building services projects?",
    options: ["To track worker attendance only", "To create a contemporaneous record of daily site events", "To calculate bonus payments", "To schedule future deliveries"],
    correctIndex: 1,
    explanation: "A site diary creates a contemporaneous (written at the time) record of daily events, which is essential for tracking progress, resolving disputes, and supporting extension of time claims."
  },
  {
    id: "progress-report-frequency",
    question: "How frequently are formal progress reports typically issued on building services projects?",
    options: ["Daily", "Weekly or monthly", "Annually", "Only at project completion"],
    correctIndex: 1,
    explanation: "Formal progress reports are typically issued weekly on fast-moving projects or monthly on longer programmes. They provide structured updates to stakeholders on programme status, issues, and forecasts."
  },
  {
    id: "critical-path-definition",
    question: "What does 'critical path' mean in programme management?",
    options: ["The safest route through site", "The sequence of activities that determines project duration", "The most expensive work packages", "The path taken by project managers"],
    correctIndex: 1,
    explanation: "The critical path is the longest sequence of dependent activities that determines the minimum project duration. Any delay to critical path activities directly delays project completion."
  },
  {
    id: "kpi-measurement",
    question: "Which KPI directly measures cost efficiency against the approved budget?",
    options: ["Schedule Performance Index (SPI)", "Cost Performance Index (CPI)", "Defect Density Rate", "Resource Utilisation"],
    correctIndex: 1,
    explanation: "Cost Performance Index (CPI) measures cost efficiency by comparing earned value to actual costs. CPI = EV/AC, where a value above 1.0 indicates under-budget performance."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What information should be recorded in a site diary every day?",
    options: [
      "Only accidents and incidents",
      "Weather, workforce, visitors, work completed, deliveries, and issues",
      "Only major milestone achievements",
      "Financial information and payment details"
    ],
    correctAnswer: 1,
    explanation: "A comprehensive site diary should record weather conditions, workforce numbers and trades, visitors, work completed, deliveries received, plant on site, instructions received, and any issues or delays encountered."
  },
  {
    id: 2,
    question: "Why is a progress report different from a site diary?",
    options: [
      "It is written weekly rather than daily",
      "It analyses trends and forecasts future performance",
      "It only contains positive information",
      "It is confidential to the contractor"
    ],
    correctAnswer: 1,
    explanation: "While site diaries record daily facts, progress reports analyse trends, compare actual vs planned progress, identify risks, and forecast future performance. They are analytical documents, not just records."
  },
  {
    id: 3,
    question: "What is the purpose of a programme update meeting?",
    options: [
      "To approve contractor payments",
      "To review progress, update the programme, and agree recovery actions",
      "To hire new subcontractors",
      "To design new systems"
    ],
    correctAnswer: 1,
    explanation: "Programme update meetings review actual progress against the baseline programme, update remaining durations, identify delays, agree recovery measures, and produce revised completion forecasts."
  },
  {
    id: 4,
    question: "In building services installation, what typically represents a key progress milestone?",
    options: [
      "Arrival of the site manager",
      "First fix completion, pressure testing, and commissioning sign-off",
      "Ordering of materials",
      "Staff training completion"
    ],
    correctAnswer: 1,
    explanation: "Key M&E milestones include first fix completion (containment and rough-in), second fix completion, pressure testing/leak testing, energisation, and commissioning/handover sign-off."
  },
  {
    id: 5,
    question: "What is 'float' in programme management?",
    options: [
      "Spare budget contingency",
      "The amount of time an activity can be delayed without affecting the critical path",
      "Materials kept in reserve",
      "Additional workforce on standby"
    ],
    correctAnswer: 1,
    explanation: "Float (or slack) is the amount of time a non-critical activity can be delayed without delaying the project completion date. Activities on the critical path have zero float."
  },
  {
    id: 6,
    question: "What does SPI (Schedule Performance Index) measure?",
    options: [
      "Cost efficiency",
      "Quality of workmanship",
      "How efficiently time is being used against the plan",
      "Safety performance"
    ],
    correctAnswer: 2,
    explanation: "Schedule Performance Index (SPI) measures schedule efficiency: SPI = Earned Value / Planned Value. An SPI of 1.0 means on schedule, below 1.0 means behind schedule, above 1.0 means ahead of schedule."
  },
  {
    id: 7,
    question: "When should a delay analysis be undertaken?",
    options: [
      "Only at project completion",
      "When delays occur that may affect the completion date or cause additional costs",
      "Only if the client requests it",
      "Every Monday morning"
    ],
    correctAnswer: 1,
    explanation: "Delay analysis should be undertaken contemporaneously when significant delays occur, to establish cause, effect, responsibility, and any entitlement to extension of time or additional costs."
  },
  {
    id: 8,
    question: "What is the 'impacted as-planned' method of delay analysis?",
    options: [
      "Comparing two programmes side by side",
      "Adding delay events to the original baseline programme to show their impact",
      "Removing delays from the actual programme",
      "Creating a new programme from scratch"
    ],
    correctAnswer: 1,
    explanation: "The impacted as-planned method involves inserting delay events into the original baseline programme to demonstrate how each delay impacted the planned completion date."
  },
  {
    id: 9,
    question: "A building services contractor has CPI of 0.85 and SPI of 0.92. What does this indicate?",
    options: [
      "The project is under budget and ahead of schedule",
      "The project is over budget and behind schedule",
      "The project is on track in all respects",
      "The project has been cancelled"
    ],
    correctAnswer: 1,
    explanation: "CPI of 0.85 means spending more than planned for work completed (over budget). SPI of 0.92 means less work completed than planned for the time elapsed (behind schedule). Both indices below 1.0 indicate problems."
  },
  {
    id: 10,
    question: "What should be the first item discussed at a progress meeting?",
    options: [
      "New variations",
      "Review of actions from the previous meeting",
      "Weather forecast",
      "Staff holidays"
    ],
    correctAnswer: 1,
    explanation: "Progress meetings should begin by reviewing actions from the previous meeting to ensure accountability and follow-through. This establishes whether agreed actions have been completed before discussing new matters."
  },
  {
    id: 11,
    question: "Why is photographic evidence important in progress monitoring?",
    options: [
      "For marketing purposes only",
      "To provide visual proof of conditions, progress, and issues at specific points in time",
      "To replace written records",
      "Only for health and safety compliance"
    ],
    correctAnswer: 1,
    explanation: "Photographs provide date-stamped visual evidence of site conditions, work progress, quality issues, and problems. They support written records and are valuable evidence in disputes."
  },
  {
    id: 12,
    question: "What is a 'look-ahead programme'?",
    options: [
      "The original tender programme",
      "A detailed short-term programme showing activities for the next 2-6 weeks",
      "The programme for the next project",
      "A programme showing only completed work"
    ],
    correctAnswer: 1,
    explanation: "A look-ahead programme (or rolling programme) provides detailed planning for the immediate future, typically 2-6 weeks. It shows day-by-day or week-by-week activities and resource requirements."
  }
];

const faqs = [
  {
    question: "What should I do if the main contractor's progress report differs from my records?",
    answer: "Raise the discrepancy formally in writing at the next progress meeting. Reference your site diary entries and any photographic evidence. Request that the minutes record the dispute. Maintain your own records regardless - they may be crucial for extension of time claims or dispute resolution."
  },
  {
    question: "How detailed should my site diary entries be?",
    answer: "Detailed enough that someone unfamiliar with the project could understand what happened. Record weather (affecting work), workforce numbers by trade, areas worked, progress achieved, deliveries, plant, instructions received, visitors, delays encountered, and any issues. Be factual and objective - avoid opinions or blame."
  },
  {
    question: "What KPIs should I track for M&E installation progress?",
    answer: "Key KPIs include: metres of containment installed vs planned, percentage of first fix complete by area, number of outlets/points terminated, pressure test pass rate, commissioning sheets completed, defects raised and closed, labour productivity (units per man-hour), and programme milestone achievement."
  },
  {
    question: "When should I raise a potential delay with the project team?",
    answer: "Immediately when you identify it - early warning is a contractual requirement under NEC contracts and good practice under all forms. Provide written notice stating the potential delay, likely impact, and any mitigation measures. Waiting until the delay has occurred makes recovery more difficult and may prejudice claims."
  },
  {
    question: "How do I demonstrate progress to the client when work is hidden in ceiling voids?",
    answer: "Use photographic records before close-up, progress percentages based on measured quantities, commissioning test records, and walkover inspections with the client before areas are closed. Consider time-lapse photography for complex areas. Maintain as-built drawings showing what is installed where."
  },
  {
    question: "What is the difference between delay and disruption?",
    answer: "Delay extends the project duration (affecting completion date). Disruption reduces productivity without necessarily extending duration - work takes longer or costs more due to interference, but may be absorbed by working overtime or adding resources. Both can give rise to claims, but require different analysis methods."
  }
];

const HNCModule5Section6_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module5-section6">
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
            <Zap className="h-4 w-4" />
            <span>Module 5.6.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Progress Monitoring
          </h1>
          <p className="text-white/80">
            Site diaries, progress reports, programme updates, progress meetings, and performance measurement
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Site diaries:</strong> Daily contemporaneous records</li>
              <li className="pl-1"><strong>Progress reports:</strong> Weekly/monthly analysis and forecasts</li>
              <li className="pl-1"><strong>Programme updates:</strong> Actual vs planned comparison</li>
              <li className="pl-1"><strong>KPIs:</strong> SPI, CPI, milestone achievement</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>M&E milestones:</strong> First fix, testing, commissioning</li>
              <li className="pl-1"><strong>Progress metrics:</strong> Metres installed, points terminated</li>
              <li className="pl-1"><strong>Coordination:</strong> Interface with other trades critical</li>
              <li className="pl-1"><strong>Hidden work:</strong> Photo records before close-up essential</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Maintain comprehensive site diaries for building services works",
              "Prepare and interpret progress reports for M&E installations",
              "Update programmes and identify critical path impacts",
              "Conduct effective progress meetings with clear outcomes",
              "Apply KPIs to measure installation performance",
              "Analyse delays and their effects on project completion"
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

        {/* Section 1: Site Diaries */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Daily Site Diaries
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The site diary is the most important contemporaneous record on any construction project. For building
              services contractors, it provides essential evidence of progress, delays, instructions, and site
              conditions that may be needed months or years later for claims, disputes, or simply understanding
              what happened and when.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Essential daily entries:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Date and weather:</strong> Temperature, precipitation, wind affecting work</li>
                <li className="pl-1"><strong>Workforce:</strong> Numbers by trade, subcontractors present</li>
                <li className="pl-1"><strong>Work areas:</strong> Locations worked, progress achieved</li>
                <li className="pl-1"><strong>Deliveries:</strong> Materials received, plant arriving/departing</li>
                <li className="pl-1"><strong>Instructions:</strong> Verbal and written directions received</li>
                <li className="pl-1"><strong>Visitors:</strong> Client, consultants, inspectors on site</li>
                <li className="pl-1"><strong>Issues:</strong> Delays, obstructions, coordination problems</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">M&E-Specific Diary Entries</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Category</th>
                      <th className="border border-white/10 px-3 py-2 text-left">What to Record</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Why It Matters</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Containment progress</td>
                      <td className="border border-white/10 px-3 py-2">Metres installed by type and area</td>
                      <td className="border border-white/10 px-3 py-2">Productivity measurement</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Access issues</td>
                      <td className="border border-white/10 px-3 py-2">Scaffold not ready, ceiling closed early</td>
                      <td className="border border-white/10 px-3 py-2">Delay evidence</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Coordination clashes</td>
                      <td className="border border-white/10 px-3 py-2">HVAC duct blocking cable route</td>
                      <td className="border border-white/10 px-3 py-2">Variation/disruption claims</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Testing activities</td>
                      <td className="border border-white/10 px-3 py-2">Pressure tests, insulation resistance</td>
                      <td className="border border-white/10 px-3 py-2">Commissioning evidence</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Drawings received</td>
                      <td className="border border-white/10 px-3 py-2">Revision numbers, dates, from whom</td>
                      <td className="border border-white/10 px-3 py-2">Design responsibility</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Best Practice: Photographic Records</p>
              <p className="text-sm text-white mb-2">
                Complement diary entries with date-stamped photographs showing:
              </p>
              <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                <li className="pl-1">Work completed before close-up (especially in voids)</li>
                <li className="pl-1">Conditions preventing access or work</li>
                <li className="pl-1">Quality issues or defective work by others</li>
                <li className="pl-1">Site conditions (weather damage, flooding)</li>
                <li className="pl-1">Coordination clashes and obstruction</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Legal principle:</strong> Contemporaneous records (written at the time) carry more weight than recollections made later. Complete your diary daily, not retrospectively.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Progress Reports */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Progress Reports and Programme Updates
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              While site diaries record daily facts, progress reports analyse and interpret that information
              to communicate status, identify trends, and forecast future performance. They transform raw
              data into actionable intelligence for project stakeholders.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Weekly Progress Report</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Work completed this week by area</li>
                  <li className="pl-1">Planned vs actual progress comparison</li>
                  <li className="pl-1">Issues encountered and resolution</li>
                  <li className="pl-1">Look-ahead for coming week</li>
                  <li className="pl-1">Resource levels and requirements</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Monthly Progress Report</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Overall programme status and forecast</li>
                  <li className="pl-1">Milestone achievement summary</li>
                  <li className="pl-1">Cost vs budget analysis</li>
                  <li className="pl-1">Risk register updates</li>
                  <li className="pl-1">Variation and change status</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Programme Update Process</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Step</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Activity</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Output</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1. Data collection</td>
                      <td className="border border-white/10 px-3 py-2">Gather progress from site diaries, foremen</td>
                      <td className="border border-white/10 px-3 py-2">Actual start/finish dates, % complete</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2. Programme input</td>
                      <td className="border border-white/10 px-3 py-2">Update activity status in planning software</td>
                      <td className="border border-white/10 px-3 py-2">Updated programme file</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3. Analysis</td>
                      <td className="border border-white/10 px-3 py-2">Compare to baseline, identify variances</td>
                      <td className="border border-white/10 px-3 py-2">Critical path status, float consumed</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4. Forecasting</td>
                      <td className="border border-white/10 px-3 py-2">Adjust remaining durations, add delays</td>
                      <td className="border border-white/10 px-3 py-2">Revised completion forecast</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5. Recovery planning</td>
                      <td className="border border-white/10 px-3 py-2">Identify mitigation measures if behind</td>
                      <td className="border border-white/10 px-3 py-2">Recovery programme options</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Critical Path Monitoring</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Critical path activities have zero float - any delay extends completion</li>
                <li className="pl-1">M&E installation is often on the critical path in fit-out phases</li>
                <li className="pl-1">Monitor near-critical activities (low float) as they may become critical</li>
                <li className="pl-1">Report critical path delays immediately with recovery proposals</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Reporting principle:</strong> Progress reports should tell a story - what was planned, what happened, why any variance occurred, and what will be done about it.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Progress Meetings */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Progress Meetings and Communication
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Progress meetings are the primary forum for coordinating activities, resolving issues, and
              maintaining alignment between project stakeholders. Effective meetings require preparation,
              clear agendas, and documented outcomes with assigned actions.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Standard Progress Meeting Agenda</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Item</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Content</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1. Previous actions</td>
                      <td className="border border-white/10 px-3 py-2">Review completion status of actions</td>
                      <td className="border border-white/10 px-3 py-2">10 minutes</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2. Health and safety</td>
                      <td className="border border-white/10 px-3 py-2">Incidents, near-misses, safety matters</td>
                      <td className="border border-white/10 px-3 py-2">5 minutes</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3. Programme review</td>
                      <td className="border border-white/10 px-3 py-2">Progress vs plan, critical path status</td>
                      <td className="border border-white/10 px-3 py-2">15 minutes</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4. Trade-by-trade</td>
                      <td className="border border-white/10 px-3 py-2">Each contractor reports progress/issues</td>
                      <td className="border border-white/10 px-3 py-2">20 minutes</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5. Design/RFIs</td>
                      <td className="border border-white/10 px-3 py-2">Outstanding information, drawing status</td>
                      <td className="border border-white/10 px-3 py-2">10 minutes</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">6. Look-ahead</td>
                      <td className="border border-white/10 px-3 py-2">Key activities next 2-4 weeks</td>
                      <td className="border border-white/10 px-3 py-2">10 minutes</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">7. AOB</td>
                      <td className="border border-white/10 px-3 py-2">Other matters, next meeting date</td>
                      <td className="border border-white/10 px-3 py-2">5 minutes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Meeting Preparation</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Review previous meeting minutes and actions</li>
                  <li className="pl-1">Update progress figures from site diaries</li>
                  <li className="pl-1">Prepare list of issues to raise</li>
                  <li className="pl-1">Bring supporting documents and photos</li>
                  <li className="pl-1">Know your information requirements</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Effective Actions</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Specific - exactly what is required</li>
                  <li className="pl-1">Measurable - how completion is verified</li>
                  <li className="pl-1">Assigned - named person responsible</li>
                  <li className="pl-1">Realistic - achievable in the timeframe</li>
                  <li className="pl-1">Time-bound - clear deadline date</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Meeting Minutes - What to Record</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Attendees and apologies:</strong> Who was present, who sent representatives</li>
                <li className="pl-1"><strong>Decisions made:</strong> What was agreed, by whom</li>
                <li className="pl-1"><strong>Actions assigned:</strong> Task, owner, deadline</li>
                <li className="pl-1"><strong>Issues raised:</strong> Problems reported, especially if disputed</li>
                <li className="pl-1"><strong>Programme status:</strong> Current position, forecast completion</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Meeting discipline:</strong> Always review minutes when issued. If they do not accurately reflect what was said or agreed, respond in writing within 7 days requesting correction.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Performance Measurement and Delay Analysis */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Performance Measurement and Delay Analysis
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Objective performance measurement using Key Performance Indicators (KPIs) enables early
              identification of problems and supports evidence-based decision making. When delays occur,
              formal delay analysis establishes cause, effect, and entitlement.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Performance Indicators for M&E Projects</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">KPI</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Formula</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Target</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Schedule Performance Index</td>
                      <td className="border border-white/10 px-3 py-2">SPI = Earned Value / Planned Value</td>
                      <td className="border border-white/10 px-3 py-2">&ge; 1.0</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cost Performance Index</td>
                      <td className="border border-white/10 px-3 py-2">CPI = Earned Value / Actual Cost</td>
                      <td className="border border-white/10 px-3 py-2">&ge; 1.0</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Productivity rate</td>
                      <td className="border border-white/10 px-3 py-2">Units installed / Labour hours</td>
                      <td className="border border-white/10 px-3 py-2">Per tender allowance</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">First-time test pass rate</td>
                      <td className="border border-white/10 px-3 py-2">Tests passed / Tests conducted</td>
                      <td className="border border-white/10 px-3 py-2">&ge; 95%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Defect closure rate</td>
                      <td className="border border-white/10 px-3 py-2">Defects closed / Defects raised</td>
                      <td className="border border-white/10 px-3 py-2">&ge; 90%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">RFI response time</td>
                      <td className="border border-white/10 px-3 py-2">Average days to receive response</td>
                      <td className="border border-white/10 px-3 py-2">&le; 5 days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Earned Value Analysis Example</p>
              <p className="font-mono text-center text-base mb-2">Week 8 of 20-week programme, Budget = £500,000</p>
              <div className="text-sm space-y-1">
                <p><strong>Planned Value (PV):</strong> £200,000 (40% of budget should be complete)</p>
                <p><strong>Earned Value (EV):</strong> £170,000 (34% of work actually complete)</p>
                <p><strong>Actual Cost (AC):</strong> £190,000 (spent to date)</p>
                <p className="mt-2"><strong>SPI = 170/200 = 0.85</strong> (15% behind schedule)</p>
                <p><strong>CPI = 170/190 = 0.89</strong> (11% over budget for work done)</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Delay Analysis Methods</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Impacted As-Planned</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Start with baseline programme</li>
                    <li>Insert delay events</li>
                    <li>Recalculate end date</li>
                    <li>Shows theoretical impact</li>
                    <li>Simpler but less accurate</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Time Impact Analysis</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Use updated programme at delay date</li>
                    <li>Insert delay event</li>
                    <li>Compare completion dates</li>
                    <li>Shows actual impact on critical path</li>
                    <li>More accurate but requires good records</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Delay Categories</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Excusable, compensable:</strong> Client-caused delay (entitlement to time and money)</li>
                <li className="pl-1"><strong>Excusable, non-compensable:</strong> Neutral event like weather (time only)</li>
                <li className="pl-1"><strong>Non-excusable:</strong> Contractor-caused delay (no entitlement)</li>
                <li className="pl-1"><strong>Concurrent:</strong> Multiple delays at same time (complex allocation)</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Claims tip:</strong> Maintain a delay register recording all delay events as they occur, with dates, causes, effects, and supporting evidence. Do not wait until project end to analyse delays.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Site Diary Entry</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Record today's events for an M&E subcontractor on a commercial office fit-out.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p><strong>Date:</strong> 15 January 2026</p>
                <p><strong>Weather:</strong> Overcast, 8°C, dry</p>
                <p><strong>Workforce:</strong> 4 electricians, 2 apprentices, 1 supervisor</p>
                <p className="mt-2"><strong>Work areas:</strong> Level 2 North - containment installation</p>
                <p><strong>Progress:</strong> 45m cable tray installed, 30m conduit</p>
                <p className="mt-2"><strong>Deliveries:</strong> Cable drums (10 x 100m 4c 6mm SWA)</p>
                <p><strong>Issues:</strong> Unable to access Level 3 South - ceiling grid installed by others before our first fix. Raised with MC at 10:30.</p>
                <p><strong>Instructions:</strong> Site instruction SI-042 received - additional socket outlets to meeting rooms.</p>
                <p><strong>Visitors:</strong> M&E consultant walkover 14:00-15:00</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Progress Status Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Calculate SPI and CPI for a project with: Planned Value £80,000, Earned Value £72,000, Actual Cost £78,000.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Schedule Performance Index (SPI):</p>
                <p>SPI = EV / PV = £72,000 / £80,000 = <strong>0.90</strong></p>
                <p className="mt-2">Cost Performance Index (CPI):</p>
                <p>CPI = EV / AC = £72,000 / £78,000 = <strong>0.92</strong></p>
                <p className="mt-2 text-white/60">Interpretation:</p>
                <p className="text-orange-400">SPI 0.90 = 10% behind schedule</p>
                <p className="text-orange-400">CPI 0.92 = 8% over budget for work completed</p>
                <p className="mt-2 text-green-400">Recovery action required to meet programme and budget</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Delay Impact Assessment</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Late design information delayed containment installation by 2 weeks. Original programme showed 4 weeks float on this activity. Assess impact.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p><strong>Baseline position:</strong></p>
                <p>Activity float: 4 weeks</p>
                <p>Delay event: 2 weeks</p>
                <p className="mt-2"><strong>Analysis:</strong></p>
                <p>Remaining float = 4 - 2 = 2 weeks</p>
                <p>Activity NOT on critical path (float remains)</p>
                <p className="mt-2"><strong>However:</strong></p>
                <p>- Float consumption should be recorded</p>
                <p>- Future delays may consume remaining float</p>
                <p>- Disruption costs may still be claimable</p>
                <p className="mt-2 text-elec-yellow">Notify client of delay event regardless of float impact</p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Daily Monitoring Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Complete site diary entries by end of each day</li>
                <li className="pl-1">Take photographs of progress and issues</li>
                <li className="pl-1">Record any verbal instructions in writing</li>
                <li className="pl-1">Note access restrictions or coordination problems</li>
                <li className="pl-1">Update progress on look-ahead programme</li>
                <li className="pl-1">Communicate issues to project manager same day</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">SPI/CPI target: <strong>&ge; 1.0</strong> (on or better than plan)</li>
                <li className="pl-1">Minutes response: <strong>7 days</strong> to dispute</li>
                <li className="pl-1">Progress reports: <strong>Weekly or monthly</strong></li>
                <li className="pl-1">Look-ahead: <strong>2-6 weeks</strong> rolling detail</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Retrospective diary entries</strong> - Complete daily, not at week end</li>
                <li className="pl-1"><strong>Vague progress descriptions</strong> - Be specific: metres, quantities, locations</li>
                <li className="pl-1"><strong>Not photographing hidden work</strong> - No evidence once covered</li>
                <li className="pl-1"><strong>Late delay notification</strong> - Report immediately when identified</li>
                <li className="pl-1"><strong>Accepting inaccurate minutes</strong> - Challenge within 7 days</li>
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

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Progress Documentation</p>
                <ul className="space-y-0.5">
                  <li>Site diary - daily contemporaneous record</li>
                  <li>Progress report - weekly/monthly analysis</li>
                  <li>Programme update - actual vs planned</li>
                  <li>Look-ahead - detailed 2-6 week forecast</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Performance Metrics</p>
                <ul className="space-y-0.5">
                  <li>SPI = EV/PV (&ge;1.0 = on schedule)</li>
                  <li>CPI = EV/AC (&ge;1.0 = on budget)</li>
                  <li>Critical path = zero float activities</li>
                  <li>Early warning essential under NEC</li>
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
            <Link to="../h-n-c-module5-section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module5-section6-3">
              Next: Quality Management
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule5Section6_2;
