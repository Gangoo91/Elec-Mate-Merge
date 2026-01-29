import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Programme Development - HNC Module 5 Section 1.2";
const DESCRIPTION = "Master programme development for MEP installations: Gantt charts, bar charts, milestones, programme logic, scheduling techniques, and software tools like Primavera and MS Project.";

const quickCheckQuestions = [
  {
    id: "gantt-purpose",
    question: "What is the primary purpose of a Gantt chart in MEP project management?",
    options: ["To calculate material costs", "To visualise task durations and dependencies over time", "To record quality inspections", "To allocate budget codes"],
    correctIndex: 1,
    explanation: "A Gantt chart is a horizontal bar chart that displays project tasks against time, showing task durations, start/end dates, dependencies, and overlaps at a glance."
  },
  {
    id: "milestone-definition",
    question: "In construction programming, a milestone represents:",
    options: ["A long-duration activity", "A significant achievement point with zero duration", "A resource allocation", "A cost centre"],
    correctIndex: 1,
    explanation: "Milestones are key achievement points in a programme with zero duration. They mark significant events such as 'First fix complete' or 'Commissioning start'."
  },
  {
    id: "fs-dependency",
    question: "A Finish-to-Start (FS) dependency means:",
    options: ["Both activities finish together", "Both activities start together", "The successor cannot start until the predecessor finishes", "Activities can overlap freely"],
    correctIndex: 2,
    explanation: "Finish-to-Start is the most common dependency type. The successor activity cannot begin until the predecessor activity is complete, such as cable pulling cannot start until containment is installed."
  },
  {
    id: "critical-path",
    question: "The critical path in a construction programme is:",
    options: ["The shortest route through the project", "The longest sequence of dependent activities determining minimum duration", "The path with most resources", "The path with highest cost"],
    correctIndex: 1,
    explanation: "The critical path is the longest sequence of dependent activities that determines the minimum project duration. Any delay on the critical path delays the entire project."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What information does a Gantt chart NOT typically display?",
    options: [
      "Task durations and start/end dates",
      "Dependencies between activities",
      "Detailed cost breakdowns per task",
      "Milestone achievements"
    ],
    correctAnswer: 2,
    explanation: "Gantt charts show task timing, durations, dependencies, and milestones. Detailed cost breakdowns are typically managed in separate cost schedules or earned value reports."
  },
  {
    id: 2,
    question: "Which dependency type allows a successor to start before the predecessor finishes?",
    options: ["Finish-to-Start (FS)", "Start-to-Start (SS)", "Finish-to-Finish (FF)", "Start-to-Finish (SF)"],
    correctAnswer: 1,
    explanation: "Start-to-Start (SS) allows activities to overlap, with the successor starting when or after the predecessor starts. This enables parallel working, such as cable pulling starting as containment progresses."
  },
  {
    id: 3,
    question: "What is float (or slack) in programme logic?",
    options: [
      "The time an activity can be delayed without affecting project completion",
      "Additional resources allocated to critical activities",
      "The time between project phases",
      "Buffer stock of materials"
    ],
    correctAnswer: 0,
    explanation: "Float is the amount of time an activity can be delayed without delaying the project finish date. Critical path activities have zero float."
  },
  {
    id: 4,
    question: "For a large MEP installation on a commercial building, which scheduling software is typically specified?",
    options: [
      "Microsoft Excel only",
      "Primavera P6 or Microsoft Project",
      "Basic calendar applications",
      "Word processing documents"
    ],
    correctAnswer: 1,
    explanation: "Large commercial projects typically require professional scheduling software like Primavera P6 or Microsoft Project, which offer critical path analysis, resource levelling, and multi-user collaboration."
  },
  {
    id: 5,
    question: "A 'two-week look-ahead programme' is used to:",
    options: [
      "Replace the master programme",
      "Provide detailed short-term planning from the master programme",
      "Calculate final account values",
      "Record completed work only"
    ],
    correctAnswer: 1,
    explanation: "A two-week look-ahead extracts detailed information from the master programme, showing specific daily activities, resource requirements, and coordination needs for the immediate period."
  },
  {
    id: 6,
    question: "What does 'levelling' resources in a programme mean?",
    options: [
      "Reducing the project budget",
      "Adjusting activity timing to avoid resource overallocation",
      "Making all bars the same length",
      "Removing dependencies"
    ],
    correctAnswer: 1,
    explanation: "Resource levelling adjusts activity timing within available float to prevent overallocation of resources (such as having more electricians scheduled than available), smoothing demand peaks."
  },
  {
    id: 7,
    question: "MEP coordination in programme development primarily addresses:",
    options: [
      "Financial reconciliation",
      "Sequencing between mechanical, electrical, and plumbing trades to avoid clashes",
      "Legal contract review",
      "Marketing activities"
    ],
    correctAnswer: 1,
    explanation: "MEP coordination ensures that mechanical, electrical, and plumbing trades work in the correct sequence, avoiding physical clashes in risers and ceiling voids, and optimising workflow efficiency."
  },
  {
    id: 8,
    question: "A lag of 2 days on a Finish-to-Start dependency means:",
    options: [
      "The successor starts 2 days before the predecessor finishes",
      "The successor waits 2 days after the predecessor finishes before starting",
      "Both activities are 2 days long",
      "The predecessor is delayed by 2 days"
    ],
    correctAnswer: 1,
    explanation: "A lag adds waiting time between activities. A 2-day lag on an FS dependency means the successor cannot start until 2 days after the predecessor completes, allowing for curing time or inspections."
  },
  {
    id: 9,
    question: "Which MEP activity typically appears on the critical path of a commercial building?",
    options: [
      "Final decorations",
      "Main switchboard installation and energisation",
      "Furniture installation",
      "Car park lighting"
    ],
    correctAnswer: 1,
    explanation: "Main switchboard installation and energisation is typically critical as it enables all subsequent electrical testing, commissioning, and handover. Delays here delay the entire project."
  },
  {
    id: 10,
    question: "What is the purpose of a programme baseline?",
    options: [
      "To show the original approved programme for comparison",
      "To delete completed activities",
      "To hide sensitive information",
      "To reduce the number of activities"
    ],
    correctAnswer: 0,
    explanation: "A baseline captures the original approved programme. Progress is tracked against this baseline to identify variances, delays, and acceleration, essential for project control and claims."
  },
  {
    id: 11,
    question: "In Primavera P6, WBS stands for:",
    options: [
      "Weekly Budget Summary",
      "Work Breakdown Structure",
      "Wiring Budget Schedule",
      "Workforce Balance Sheet"
    ],
    correctAnswer: 1,
    explanation: "Work Breakdown Structure (WBS) is a hierarchical decomposition of the project scope into manageable sections, organising activities by location, system, or phase."
  },
  {
    id: 12,
    question: "When scheduling containment installation before cable pulling, what dependency type is used?",
    options: [
      "Start-to-Start",
      "Finish-to-Finish",
      "Finish-to-Start",
      "No dependency needed"
    ],
    correctAnswer: 2,
    explanation: "Containment must be complete before cable pulling can begin in that area, requiring a Finish-to-Start dependency. This reflects the physical reality that cables cannot be pulled through uninstalled containment."
  }
];

const faqs = [
  {
    question: "What is the difference between a Gantt chart and a programme?",
    answer: "A Gantt chart is a visual representation format showing tasks as horizontal bars against time. A programme (or schedule) is the underlying data including activities, durations, dependencies, resources, and logic. Gantt charts are one way to display programme information - others include network diagrams, milestone charts, and resource histograms."
  },
  {
    question: "How detailed should an MEP programme be?",
    answer: "Programme detail depends on project stage and purpose. Master programmes typically show activities of 1-4 weeks duration at trade level. Detailed programmes break this down to daily activities per area. The principle is that activities should be short enough to measure progress meaningfully but not so detailed that the programme becomes unmanageable."
  },
  {
    question: "When should I use Primavera P6 versus Microsoft Project?",
    answer: "Primavera P6 is typically required on large infrastructure and commercial projects, offering enterprise-level multi-project management, robust resource handling, and earned value analysis. Microsoft Project suits small-medium projects and is more accessible. Many clients specify which software must be used in contract documents."
  },
  {
    question: "How do I handle delays in the programme?",
    answer: "When delays occur: (1) Update actual progress dates, (2) Re-run the schedule to identify impact on the critical path, (3) Assess if mitigation is possible through acceleration, resequencing, or additional resources, (4) Notify the client formally if completion dates are affected, and (5) Maintain records for extension of time claims."
  },
  {
    question: "What is the relationship between the programme and weekly progress meetings?",
    answer: "The programme should be updated weekly with actual progress (start/finish dates, percentage complete). This updated programme informs weekly progress meetings, showing whether the project is on track, identifying delayed activities, and highlighting upcoming critical work. The two-week look-ahead programme is typically issued for coordination meetings."
  },
  {
    question: "How do I coordinate MEP trades in a programme?",
    answer: "MEP coordination requires: (1) Sequencing trades logically (typically mechanical first in risers for largest pipes), (2) Allowing for inspection hold points, (3) Avoiding clashes using BIM coordination meetings, (4) Building in buffer time for coordination delays, and (5) Regular coordination meetings with all trades to resolve sequence conflicts."
  }
];

const HNCModule5Section1_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module5-section1">
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
            <span>Module 5.1.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Programme Development
          </h1>
          <p className="text-white/80">
            Gantt charts, milestones, programme logic and scheduling techniques for MEP installations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Gantt chart:</strong> Visual bar chart showing tasks over time</li>
              <li className="pl-1"><strong>Milestones:</strong> Zero-duration key achievement points</li>
              <li className="pl-1"><strong>Dependencies:</strong> Logical links between activities (FS, SS, FF, SF)</li>
              <li className="pl-1"><strong>Critical path:</strong> Longest sequence determining project duration</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">MEP Scheduling Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Software:</strong> Primavera P6, Microsoft Project</li>
              <li className="pl-1"><strong>Trade coordination:</strong> Mechanical, electrical, plumbing sequence</li>
              <li className="pl-1"><strong>Look-ahead:</strong> 2-4 week detailed programmes</li>
              <li className="pl-1"><strong>Progress tracking:</strong> Weekly updates against baseline</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Create and interpret Gantt charts for MEP installations",
              "Identify and define project milestones appropriate to building services",
              "Apply programme logic including dependencies, leads, and lags",
              "Understand critical path methodology and float calculation",
              "Use scheduling software effectively (Primavera P6, MS Project)",
              "Coordinate MEP trades within the construction programme"
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

        {/* Section 1: Gantt Charts and Bar Charts */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Gantt Charts and Bar Charts
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Gantt chart, developed by Henry Gantt in the 1910s, remains the fundamental tool for
              construction programme visualisation. It displays activities as horizontal bars positioned
              against a calendar timescale, making it easy to understand project timing at a glance.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Gantt Chart Elements:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Activity bar:</strong> Horizontal bar showing duration from start to finish date</li>
                <li className="pl-1"><strong>Timescale:</strong> Calendar showing weeks, months, or days across the top</li>
                <li className="pl-1"><strong>Dependency arrows:</strong> Lines connecting related activities</li>
                <li className="pl-1"><strong>Milestone diamonds:</strong> Zero-duration achievement points</li>
                <li className="pl-1"><strong>Progress bar:</strong> Shaded portion showing percentage complete</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">MEP Installation Programme Example</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Activity</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Duration</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Predecessor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Sequence</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Containment installation</td>
                      <td className="border border-white/10 px-3 py-2">4 weeks</td>
                      <td className="border border-white/10 px-3 py-2">Structure complete</td>
                      <td className="border border-white/10 px-3 py-2">1st fix phase</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cable pulling</td>
                      <td className="border border-white/10 px-3 py-2">3 weeks</td>
                      <td className="border border-white/10 px-3 py-2">Containment (SS+1w)</td>
                      <td className="border border-white/10 px-3 py-2">1st fix phase</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Distribution board installation</td>
                      <td className="border border-white/10 px-3 py-2">1 week</td>
                      <td className="border border-white/10 px-3 py-2">Cables terminated</td>
                      <td className="border border-white/10 px-3 py-2">1st fix complete</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Accessories installation</td>
                      <td className="border border-white/10 px-3 py-2">2 weeks</td>
                      <td className="border border-white/10 px-3 py-2">2nd fix start</td>
                      <td className="border border-white/10 px-3 py-2">2nd fix phase</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Testing and commissioning</td>
                      <td className="border border-white/10 px-3 py-2">2 weeks</td>
                      <td className="border border-white/10 px-3 py-2">All installation complete</td>
                      <td className="border border-white/10 px-3 py-2">Commissioning</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Break down programmes by floor or zone for large buildings, enabling progress tracking per area and clearer resource allocation.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Milestones and Key Dates */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Milestones and Key Dates
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Milestones are zero-duration events representing significant achievements in the project.
              They provide clear targets for teams and enable management to track progress against
              key deliverables without examining every activity in detail.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical MEP Milestones</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Main switchboard delivered to site</li>
                  <li className="pl-1">First fix electrical complete per floor</li>
                  <li className="pl-1">Temporary power available</li>
                  <li className="pl-1">Permanent power energisation</li>
                  <li className="pl-1">Fire alarm system operational</li>
                  <li className="pl-1">Commissioning complete</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Contractual Key Dates</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Access to site date</li>
                  <li className="pl-1">Sectional completion dates</li>
                  <li className="pl-1">Practical completion date</li>
                  <li className="pl-1">Client occupation dates</li>
                  <li className="pl-1">Defects liability end date</li>
                  <li className="pl-1">Final account agreement</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Milestone vs Activity</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm text-white">
                <div>
                  <p className="font-medium mb-1">Milestone</p>
                  <ul className="space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Zero duration</li>
                    <li className="pl-1">Achievement point</li>
                    <li className="pl-1">Diamond symbol</li>
                    <li className="pl-1">Example: "First fix complete"</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-1">Activity</p>
                  <ul className="space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Has duration</li>
                    <li className="pl-1">Work package</li>
                    <li className="pl-1">Horizontal bar</li>
                    <li className="pl-1">Example: "Install containment L2"</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Programming tip:</strong> Link milestones to payment applications. Achieving milestones often triggers stage payments, making accurate milestone dating financially critical.
            </p>
          </div>
        </section>

        {/* Section 3: Programme Logic and Dependencies */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Programme Logic and Dependencies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Programme logic defines the relationships between activities, determining what must
              happen before, after, or concurrently with other activities. Correct logic is essential
              for accurate critical path analysis and realistic scheduling.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Dependency Types</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Abbreviation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Meaning</th>
                      <th className="border border-white/10 px-3 py-2 text-left">MEP Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Finish-to-Start</td>
                      <td className="border border-white/10 px-3 py-2">FS</td>
                      <td className="border border-white/10 px-3 py-2">B starts when A finishes</td>
                      <td className="border border-white/10 px-3 py-2">Cable pulling after containment complete</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Start-to-Start</td>
                      <td className="border border-white/10 px-3 py-2">SS</td>
                      <td className="border border-white/10 px-3 py-2">B starts when A starts</td>
                      <td className="border border-white/10 px-3 py-2">Cable pulling following containment (with lag)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Finish-to-Finish</td>
                      <td className="border border-white/10 px-3 py-2">FF</td>
                      <td className="border border-white/10 px-3 py-2">B finishes when A finishes</td>
                      <td className="border border-white/10 px-3 py-2">Testing complete when installation complete</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Start-to-Finish</td>
                      <td className="border border-white/10 px-3 py-2">SF</td>
                      <td className="border border-white/10 px-3 py-2">B finishes when A starts</td>
                      <td className="border border-white/10 px-3 py-2">Temporary power ends when permanent starts (rare)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Leads and Lags</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Lag:</strong> Waiting time added after the dependency. Example: FS + 2 days lag for concrete curing before drilling</li>
                <li className="pl-1"><strong>Lead:</strong> Overlap time (negative lag). Example: FS - 3 days allows successor to start before predecessor finishes</li>
                <li className="pl-1"><strong>Application:</strong> Use lags for inspection hold points, material delivery, or curing times</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Critical Path Methodology</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Critical path:</strong> The longest sequence of dependent activities</li>
                <li className="pl-1"><strong>Float:</strong> Time an activity can slip without delaying completion</li>
                <li className="pl-1"><strong>Critical activities:</strong> Those with zero float - any delay delays the project</li>
                <li className="pl-1"><strong>Near-critical:</strong> Activities with less than 5 days float requiring monitoring</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Logic rule:</strong> Every activity (except project start) should have at least one predecessor. Dangling activities without logic links create unrealistic schedules.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Scheduling Software and MEP Coordination */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Scheduling Software and MEP Coordination
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Professional scheduling software enables complex programme management beyond simple
              Gantt charts. Understanding these tools is essential for MEP project managers working
              on commercial and infrastructure projects.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Primavera P6</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Enterprise-level scheduling</li>
                  <li className="pl-1">Multi-project management</li>
                  <li className="pl-1">Robust resource handling</li>
                  <li className="pl-1">Earned value analysis</li>
                  <li className="pl-1">Industry standard for large projects</li>
                  <li className="pl-1">Oracle-owned database system</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Microsoft Project</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Desktop and cloud versions</li>
                  <li className="pl-1">Familiar Microsoft interface</li>
                  <li className="pl-1">Good for small-medium projects</li>
                  <li className="pl-1">Integration with Office 365</li>
                  <li className="pl-1">More accessible learning curve</li>
                  <li className="pl-1">Lower licence cost than P6</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Software Features for MEP</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Feature</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Purpose</th>
                      <th className="border border-white/10 px-3 py-2 text-left">MEP Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">WBS (Work Breakdown Structure)</td>
                      <td className="border border-white/10 px-3 py-2">Hierarchical organisation</td>
                      <td className="border border-white/10 px-3 py-2">Organise by floor, zone, or system</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Resource levelling</td>
                      <td className="border border-white/10 px-3 py-2">Avoid overallocation</td>
                      <td className="border border-white/10 px-3 py-2">Balance electrician numbers across activities</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Baseline comparison</td>
                      <td className="border border-white/10 px-3 py-2">Track variance</td>
                      <td className="border border-white/10 px-3 py-2">Identify delays against original programme</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Activity codes</td>
                      <td className="border border-white/10 px-3 py-2">Filtering and reporting</td>
                      <td className="border border-white/10 px-3 py-2">Filter by trade (elec/mech/plumb)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Look-ahead reports</td>
                      <td className="border border-white/10 px-3 py-2">Short-term planning</td>
                      <td className="border border-white/10 px-3 py-2">2-week look-ahead for coordination meetings</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">MEP Trade Coordination Sequence</p>
              <p className="text-sm text-white mb-3">Typical priority order in congested areas (risers, ceiling voids):</p>
              <ol className="text-sm text-white space-y-1.5 list-decimal list-outside ml-5">
                <li className="pl-1"><strong>Mechanical:</strong> Largest ducts/pipes first (least flexible)</li>
                <li className="pl-1"><strong>Plumbing:</strong> Drainage with fixed gradients</li>
                <li className="pl-1"><strong>Electrical:</strong> Containment routes around M&P services</li>
                <li className="pl-1"><strong>Fire protection:</strong> Sprinkler pipework</li>
                <li className="pl-1"><strong>Controls:</strong> BMS sensors and cabling</li>
              </ol>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Coordination tip:</strong> Use BIM coordination meetings to resolve clashes before they affect the programme. Virtual clashes are far cheaper to resolve than site conflicts.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Calculating Float</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Activity A takes 5 days. Activity B depends on A (FS) and takes 3 days. Project must finish on Day 15. A can start Day 1. What is the float?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Early Start A = Day 1</p>
                <p>Early Finish A = Day 1 + 5 = Day 6</p>
                <p>Early Start B = Day 6</p>
                <p>Early Finish B = Day 6 + 3 = Day 9</p>
                <p className="mt-2">Project requires finish Day 15, earliest finish Day 9</p>
                <p><strong>Total Float = 15 - 9 = 6 days</strong></p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Dependency Selection</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Containment installation takes 10 days. Cable pulling takes 8 days but can start 3 days after containment starts. What dependency and lag?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Cable pulling starts when containment starts (not finishes)</p>
                <p>This is a Start-to-Start (SS) relationship</p>
                <p>3 days must elapse before cables can follow</p>
                <p className="mt-2"><strong>Answer: SS + 3 days lag</strong></p>
                <p className="mt-2 text-white/60">This allows cable pulling to begin in areas where containment is complete, while containment continues in other areas.</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Critical Path Identification</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Three parallel paths: (A) Containment 10d + Cables 8d = 18d, (B) Switchboard delivery 12d + Install 3d = 15d, (C) Generator install 20d. Which is critical?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Path A: 10 + 8 = 18 days</p>
                <p>Path B: 12 + 3 = 15 days</p>
                <p>Path C: 20 days</p>
                <p className="mt-2"><strong>Critical Path = Path C (Generator) at 20 days</strong></p>
                <p className="mt-2 text-green-400">Path A has 2 days float (20-18)</p>
                <p className="text-green-400">Path B has 5 days float (20-15)</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Programme Development Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Define the Work Breakdown Structure by location/system</li>
                <li className="pl-1">Identify all activities with realistic durations</li>
                <li className="pl-1">Establish logical dependencies (avoid excessive constraints)</li>
                <li className="pl-1">Set key milestones aligned with contract requirements</li>
                <li className="pl-1">Assign resources and check for overallocation</li>
                <li className="pl-1">Calculate critical path and review logic</li>
                <li className="pl-1">Set baseline before work commences</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Finish-to-Start (FS): <strong>Most common dependency</strong></li>
                <li className="pl-1">Float = 0: <strong>Critical activity</strong></li>
                <li className="pl-1">Near-critical: <strong>Less than 5 days float</strong></li>
                <li className="pl-1">Look-ahead period: <strong>2-4 weeks typical</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Programming Mistakes</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Missing logic links</strong> - Activities without predecessors create unrealistic schedules</li>
                <li className="pl-1"><strong>Excessive constraints</strong> - Fixed dates should be used sparingly</li>
                <li className="pl-1"><strong>Ignoring resource limits</strong> - Scheduling more workers than available</li>
                <li className="pl-1"><strong>No baseline</strong> - Cannot measure progress without a baseline</li>
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
                <p className="font-medium text-white mb-1">Dependency Types</p>
                <ul className="space-y-0.5">
                  <li>FS - Finish-to-Start (most common)</li>
                  <li>SS - Start-to-Start (enables overlap)</li>
                  <li>FF - Finish-to-Finish (concurrent finish)</li>
                  <li>SF - Start-to-Finish (rare)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Critical Path</p>
                <ul className="space-y-0.5">
                  <li>Longest path through the network</li>
                  <li>Determines minimum project duration</li>
                  <li>Critical activities have zero float</li>
                  <li>Delay here delays the project</li>
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
            <Link to="../h-n-c-module5-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module5-section1-3">
              Next: Resource Planning
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule5Section1_2;
