import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Critical Path Method - HNC Module 5 Section 1.3";
const DESCRIPTION = "Master the Critical Path Method (CPM) for building services project management: network analysis, forward/backward pass calculations, float determination, activity-on-node diagrams, and programme optimisation techniques.";

const quickCheckQuestions = [
  {
    id: "cpm-definition",
    question: "What does the critical path represent in project scheduling?",
    options: ["The shortest route through the network", "The longest sequence of dependent activities", "The most expensive activities", "Activities that can be delayed"],
    correctIndex: 1,
    explanation: "The critical path is the longest sequence of dependent activities through the network. It determines the minimum project duration - any delay on critical activities directly extends the project end date."
  },
  {
    id: "total-float",
    question: "Total float is calculated as:",
    options: ["Early Start minus Early Finish", "Late Finish minus Early Finish", "Duration minus Early Start", "Early Finish minus Late Start"],
    correctIndex: 1,
    explanation: "Total float = Late Finish - Early Finish (or Late Start - Early Start). It represents the maximum time an activity can be delayed without affecting the project completion date."
  },
  {
    id: "forward-pass",
    question: "During the forward pass calculation, what are we determining?",
    options: ["Late Start and Late Finish times", "Early Start and Early Finish times", "Total and free float values", "Activity dependencies"],
    correctIndex: 1,
    explanation: "The forward pass works from project start to finish, calculating the earliest possible start (ES) and finish (EF) times for each activity. EF = ES + Duration."
  },
  {
    id: "critical-activity",
    question: "An activity on the critical path will have:",
    options: ["Maximum float", "Free float only", "Zero total float", "Negative duration"],
    correctIndex: 2,
    explanation: "Critical activities have zero total float - there is no spare time available. Any delay to these activities will delay the entire project completion by the same amount."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "In an activity-on-node (AON) diagram, what do the boxes represent?",
    options: [
      "Milestones only",
      "Dependencies between tasks",
      "Individual activities with their attributes",
      "Resource allocations"
    ],
    correctAnswer: 2,
    explanation: "In AON diagrams, boxes (nodes) represent activities and contain information such as activity name, duration, early/late start and finish times, and float. Arrows show dependencies."
  },
  {
    id: 2,
    question: "Activity A has ES=5, Duration=3, LF=12. What is the total float?",
    options: ["3 days", "4 days", "5 days", "7 days"],
    correctAnswer: 1,
    explanation: "EF = ES + Duration = 5 + 3 = 8. Total Float = LF - EF = 12 - 8 = 4 days. This activity can slip 4 days without affecting the project end date."
  },
  {
    id: 3,
    question: "What is the relationship between free float and total float?",
    options: [
      "Free float is always greater than total float",
      "They are always equal",
      "Free float is always less than or equal to total float",
      "They are unrelated measures"
    ],
    correctAnswer: 2,
    explanation: "Free float is always less than or equal to total float. Free float only considers impact on the next activity, while total float considers impact on project completion."
  },
  {
    id: 4,
    question: "When performing the backward pass, which value is calculated first?",
    options: [
      "Early Start",
      "Late Finish",
      "Early Finish",
      "Duration"
    ],
    correctAnswer: 1,
    explanation: "The backward pass starts from the project end, setting the Late Finish of the final activity equal to the project completion date, then works backwards. LS = LF - Duration."
  },
  {
    id: 5,
    question: "A chiller installation has predecessor 'pipework complete'. This is an example of:",
    options: [
      "Start-to-Start dependency",
      "Finish-to-Finish dependency",
      "Finish-to-Start dependency",
      "Start-to-Finish dependency"
    ],
    correctAnswer: 2,
    explanation: "Finish-to-Start (FS) is the most common dependency type - the predecessor must finish before the successor can start. The pipework must be complete before the chiller can be installed."
  },
  {
    id: 6,
    question: "Programme compression (crashing) should prioritise:",
    options: [
      "Activities with the longest duration",
      "Activities with the most float",
      "Critical path activities with lowest crash cost per day",
      "All activities equally"
    ],
    correctAnswer: 2,
    explanation: "Crashing should target critical path activities (they determine duration) with the lowest cost per day saved. Crashing non-critical activities or high-cost activities is inefficient."
  },
  {
    id: 7,
    question: "On a hospital MEP project, which trade typically drives the critical path for plant room completion?",
    options: [
      "Electrical containment",
      "Mechanical pipework",
      "Fire alarm installation",
      "BMS controls"
    ],
    correctAnswer: 1,
    explanation: "Mechanical pipework (especially large bore heating/chilled water) typically has the longest duration and drives the critical path. Electrical and controls work often has more float."
  },
  {
    id: 8,
    question: "What happens if an activity on a parallel path gains zero float?",
    options: [
      "It becomes non-critical",
      "It becomes critical - there are now two critical paths",
      "The project duration increases",
      "Free float increases"
    ],
    correctAnswer: 1,
    explanation: "When a parallel path's float reduces to zero, that path also becomes critical. Projects can have multiple critical paths, making schedule management more complex."
  },
  {
    id: 9,
    question: "Lead time (negative lag) between activities means:",
    options: [
      "A delay must occur between activities",
      "Activities must start simultaneously",
      "The successor can start before the predecessor finishes",
      "The predecessor duration increases"
    ],
    correctAnswer: 2,
    explanation: "Lead time allows overlap - the successor activity can start a specified time before the predecessor finishes. Example: cable pulling can start before all containment is complete."
  },
  {
    id: 10,
    question: "Fast-tracking a project involves:",
    options: [
      "Adding more resources to critical activities",
      "Reducing activity scope",
      "Overlapping activities that would normally be sequential",
      "Removing non-critical activities"
    ],
    correctAnswer: 2,
    explanation: "Fast-tracking compresses the schedule by overlapping activities, often using lead times. It increases risk as later activities start before predecessors are fully complete."
  },
  {
    id: 11,
    question: "In MEP coordination, why is early identification of the critical path essential?",
    options: [
      "To determine which trade gets paid first",
      "To focus coordination efforts and resources on schedule-critical work",
      "To reduce the number of activities",
      "To eliminate float from all activities"
    ],
    correctAnswer: 1,
    explanation: "Identifying the critical path ensures coordination meetings, resources, and management attention focus on the work that determines project duration. Non-critical work has more flexibility."
  },
  {
    id: 12,
    question: "Activity B follows Activity A (FS). A has EF=10, B has duration=5, LF=18. What is B's free float?",
    options: [
      "3 days",
      "0 days",
      "5 days",
      "Cannot be determined without more information"
    ],
    correctAnswer: 3,
    explanation: "Free float requires knowing the Early Start of B's successor. Free Float = ES of successor - EF of activity. Without successor information, free float cannot be calculated."
  }
];

const faqs = [
  {
    question: "What is the difference between total float and free float?",
    answer: "Total float is the time an activity can be delayed without affecting the project end date. Free float is the time an activity can be delayed without affecting the early start of any successor activity. Free float is always less than or equal to total float. An activity with free float can slip without impacting anything; using total float may delay successors (but not the project end)."
  },
  {
    question: "How do I identify the critical path on a network diagram?",
    answer: "After completing forward and backward pass calculations, identify activities where Early Start = Late Start (or Early Finish = Late Finish). These activities have zero total float and form the critical path. Trace these through the network from start to finish - this is the longest path determining minimum project duration."
  },
  {
    question: "Why might a project have multiple critical paths?",
    answer: "Multiple critical paths occur when parallel sequences have identical durations. This is common in building services where different trades work simultaneously. Multiple critical paths increase risk because a delay on ANY critical path extends the project. Close monitoring of all critical and near-critical paths is essential."
  },
  {
    question: "What is the difference between crashing and fast-tracking?",
    answer: "Crashing adds resources to reduce activity duration (e.g., more electricians to speed up cable pulling). It increases cost but maintains work sequence. Fast-tracking overlaps activities that would normally be sequential (e.g., starting second fix before first fix is complete). It increases risk but may not increase cost significantly."
  },
  {
    question: "How does lag and lead time affect CPM calculations?",
    answer: "Lag adds waiting time between activities (e.g., 7-day concrete curing before plant can be installed). Lead allows overlap - the successor starts before the predecessor finishes. Both modify the simple Finish-to-Start relationship. ES of successor = EF of predecessor + lag (positive) or - lead (negative)."
  },
  {
    question: "How should I handle resource constraints in CPM?",
    answer: "Basic CPM assumes unlimited resources, which is unrealistic. After initial CPM analysis, apply resource levelling: adjust activity timing within available float to smooth resource demand. Critical Chain Project Management (CCPM) explicitly incorporates resource constraints and adds buffers rather than activity-level float."
  }
];

const HNCModule5Section1_3 = () => {
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
            <span>Module 5.1.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Critical Path Method
          </h1>
          <p className="text-white/80">
            Network analysis techniques for building services programme planning, float calculations, and schedule optimisation
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Critical path:</strong> Longest sequence determining project duration</li>
              <li className="pl-1"><strong>Float:</strong> Available slack time for non-critical activities</li>
              <li className="pl-1"><strong>Forward pass:</strong> Calculate Early Start/Finish times</li>
              <li className="pl-1"><strong>Backward pass:</strong> Calculate Late Start/Finish times</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>MEP coordination:</strong> Trade interfaces drive dependencies</li>
              <li className="pl-1"><strong>Plant rooms:</strong> Mechanical often on critical path</li>
              <li className="pl-1"><strong>Commissioning:</strong> Sequential witness testing constraints</li>
              <li className="pl-1"><strong>Handover:</strong> Certification dependencies</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Construct activity-on-node network diagrams for MEP projects",
              "Perform forward and backward pass calculations",
              "Calculate total float and free float for all activities",
              "Identify the critical path through complex networks",
              "Apply programme compression techniques (crashing, fast-tracking)",
              "Coordinate multiple trades around critical path constraints"
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

        {/* Section 1: CPM Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Critical Path Method Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Critical Path Method (CPM) is the foundation of modern project scheduling. Developed in the 1950s
              for complex construction and engineering projects, it remains essential for managing building services
              installations where multiple trades must coordinate their work precisely.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key CPM Terminology:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Activity:</strong> A task that consumes time and resources</li>
                <li className="pl-1"><strong>Dependency:</strong> The logical relationship between activities</li>
                <li className="pl-1"><strong>Critical path:</strong> The longest sequence through the network</li>
                <li className="pl-1"><strong>Float (slack):</strong> Available time flexibility for activities</li>
                <li className="pl-1"><strong>Network diagram:</strong> Graphical representation of project logic</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Activity-on-Node (AON) Representation</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Box Element</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Activity ID</td>
                      <td className="border border-white/10 px-3 py-2">Unique identifier</td>
                      <td className="border border-white/10 px-3 py-2">E-101</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Activity Name</td>
                      <td className="border border-white/10 px-3 py-2">Description of work</td>
                      <td className="border border-white/10 px-3 py-2">Install DB1</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Duration</td>
                      <td className="border border-white/10 px-3 py-2">Time to complete</td>
                      <td className="border border-white/10 px-3 py-2">5 days</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">ES (Early Start)</td>
                      <td className="border border-white/10 px-3 py-2">Earliest possible start</td>
                      <td className="border border-white/10 px-3 py-2">Day 10</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">EF (Early Finish)</td>
                      <td className="border border-white/10 px-3 py-2">Earliest possible finish</td>
                      <td className="border border-white/10 px-3 py-2">Day 15</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LS (Late Start)</td>
                      <td className="border border-white/10 px-3 py-2">Latest start without delay</td>
                      <td className="border border-white/10 px-3 py-2">Day 12</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LF (Late Finish)</td>
                      <td className="border border-white/10 px-3 py-2">Latest finish without delay</td>
                      <td className="border border-white/10 px-3 py-2">Day 17</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Total Float</td>
                      <td className="border border-white/10 px-3 py-2">LF - EF (or LS - ES)</td>
                      <td className="border border-white/10 px-3 py-2">2 days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Standard AON Node Layout</p>
              <div className="bg-black/30 p-4 rounded text-xs font-mono text-white/90 text-center">
                <pre className="inline-block text-left">{`+--------+--------+--------+
|   ES   |  DUR   |   EF   |
+--------+--------+--------+
|      Activity ID/Name    |
+--------+--------+--------+
|   LS   | FLOAT  |   LF   |
+--------+--------+--------+`}</pre>
              </div>
              <p className="text-xs text-white/60 mt-2 text-center">Arrows connect nodes to show dependencies (predecessors to successors)</p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Building services insight:</strong> For MEP projects, activities typically represent installation packages (e.g., "Install Level 2 containment") rather than individual tasks.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Forward and Backward Pass */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Forward and Backward Pass Calculations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              CPM analysis requires two calculation passes through the network: the forward pass determines
              the earliest possible times, while the backward pass determines the latest allowable times.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Forward Pass (Start to Finish)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Begin at project start (ES = 0 for first activities)</li>
                  <li className="pl-1">Calculate: <strong>EF = ES + Duration</strong></li>
                  <li className="pl-1">ES of successor = EF of predecessor</li>
                  <li className="pl-1">Multiple predecessors: ES = MAX(all predecessor EFs)</li>
                  <li className="pl-1">Final EF = minimum project duration</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Backward Pass (Finish to Start)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Begin at project end (LF = project duration)</li>
                  <li className="pl-1">Calculate: <strong>LS = LF - Duration</strong></li>
                  <li className="pl-1">LF of predecessor = LS of successor</li>
                  <li className="pl-1">Multiple successors: LF = MIN(all successor LSs)</li>
                  <li className="pl-1">Final LS = 0 confirms calculation accuracy</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Dependency Types</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Meaning</th>
                      <th className="border border-white/10 px-3 py-2 text-left">MEP Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Finish-to-Start</td>
                      <td className="border border-white/10 px-3 py-2">FS</td>
                      <td className="border border-white/10 px-3 py-2">B starts when A finishes</td>
                      <td className="border border-white/10 px-3 py-2">Containment complete before cabling</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Start-to-Start</td>
                      <td className="border border-white/10 px-3 py-2">SS</td>
                      <td className="border border-white/10 px-3 py-2">B starts when A starts</td>
                      <td className="border border-white/10 px-3 py-2">Parallel containment runs</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Finish-to-Finish</td>
                      <td className="border border-white/10 px-3 py-2">FF</td>
                      <td className="border border-white/10 px-3 py-2">B finishes when A finishes</td>
                      <td className="border border-white/10 px-3 py-2">Testing completes with installation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Start-to-Finish</td>
                      <td className="border border-white/10 px-3 py-2">SF</td>
                      <td className="border border-white/10 px-3 py-2">B finishes when A starts</td>
                      <td className="border border-white/10 px-3 py-2">Rare - old system until new commissioned</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Lag and Lead Time</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Lag (+):</strong> Waiting time between activities. Example: FS+7 = 7-day concrete cure before plant installation</li>
                <li className="pl-1"><strong>Lead (-):</strong> Overlap allowed. Example: FS-3 = cabling can start 3 days before containment finishes</li>
              </ul>
              <p className="text-xs text-white/60 mt-2">Lag and lead modify the basic dependency relationship, affecting ES/EF calculations</p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical tip:</strong> Always verify calculations by checking that first activity LS = 0 after backward pass. If not, there is a calculation error.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 3: Float Calculations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Float Calculations and Critical Path Identification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Float represents the scheduling flexibility available for activities. Understanding float is
              essential for resource allocation, risk management, and determining which activities require
              the closest management attention.
            </p>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Critical Path Rule</p>
              <p className="text-sm text-white">
                Activities with <strong>zero total float</strong> are on the critical path. Any delay to these
                activities directly delays the project completion date by the same amount. The critical path
                is the longest path through the network.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Float Types and Formulae</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Float Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Formula</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Impact if Used</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Total Float (TF)</td>
                      <td className="border border-white/10 px-3 py-2">LF - EF (or LS - ES)</td>
                      <td className="border border-white/10 px-3 py-2">May delay successors (not project end)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Free Float (FF)</td>
                      <td className="border border-white/10 px-3 py-2">ES(successor) - EF(activity)</td>
                      <td className="border border-white/10 px-3 py-2">No impact on any other activity</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Interfering Float</td>
                      <td className="border border-white/10 px-3 py-2">TF - FF</td>
                      <td className="border border-white/10 px-3 py-2">Delays successors but not project</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Critical Activities (TF = 0)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Require highest management priority</li>
                  <li className="pl-1">Resources must be protected</li>
                  <li className="pl-1">Progress monitored daily</li>
                  <li className="pl-1">Delays escalated immediately</li>
                  <li className="pl-1">No schedule flexibility</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Non-Critical Activities (TF greater than 0)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Can be rescheduled within float</li>
                  <li className="pl-1">Resources can be borrowed for critical work</li>
                  <li className="pl-1">Useful for resource levelling</li>
                  <li className="pl-1">Monitor float consumption</li>
                  <li className="pl-1">Near-critical (low float) needs attention</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Float Calculation Example</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Activity: Install distribution board (DB-L2)</p>
                <p>Duration: 3 days</p>
                <p>ES = 15, EF = 18 (from forward pass)</p>
                <p>LS = 18, LF = 21 (from backward pass)</p>
                <p className="mt-2">Total Float = LF - EF = 21 - 18 = <strong>3 days</strong></p>
                <p className="mt-2">If successor ES = 20:</p>
                <p>Free Float = ES(successor) - EF = 20 - 18 = <strong>2 days</strong></p>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Management insight:</strong> Float belongs to the project, not individual subcontractors. Consuming float reduces flexibility for all subsequent work.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Programme Optimisation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Programme Optimisation and MEP Coordination
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Once the critical path is identified, programme optimisation techniques can reduce project
              duration or improve resource utilisation. In building services, this requires close coordination
              between mechanical, electrical, and public health trades.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Programme Compression Techniques</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Technique</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Considerations</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Crashing</td>
                      <td className="border border-white/10 px-3 py-2">Add resources to reduce duration</td>
                      <td className="border border-white/10 px-3 py-2">Higher cost, diminishing returns</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fast-tracking</td>
                      <td className="border border-white/10 px-3 py-2">Overlap sequential activities</td>
                      <td className="border border-white/10 px-3 py-2">Increased risk, rework potential</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Scope reduction</td>
                      <td className="border border-white/10 px-3 py-2">Remove non-essential work</td>
                      <td className="border border-white/10 px-3 py-2">Client approval required</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Method change</td>
                      <td className="border border-white/10 px-3 py-2">Prefabrication, modular builds</td>
                      <td className="border border-white/10 px-3 py-2">Quality control, coordination</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Overtime/shifts</td>
                      <td className="border border-white/10 px-3 py-2">Extended working hours</td>
                      <td className="border border-white/10 px-3 py-2">Fatigue, productivity loss</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Crashing Priority Rule</p>
              <p className="text-sm text-white mb-2">When crashing to reduce project duration:</p>
              <ol className="text-sm text-white space-y-1.5 list-decimal list-outside ml-5">
                <li className="pl-1">Only crash activities on the critical path (others have no impact)</li>
                <li className="pl-1">Select activities with lowest crash cost per time unit saved</li>
                <li className="pl-1">Crash until another path becomes critical</li>
                <li className="pl-1">Then crash activities on ALL critical paths simultaneously</li>
                <li className="pl-1">Stop when crash cost exceeds benefit or no further reduction possible</li>
              </ol>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">MEP Critical Path Considerations</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Mechanical Drivers</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Large bore pipework (longest duration)</li>
                    <li>Plant room coordination</li>
                    <li>AHU installations</li>
                    <li>Chiller/boiler connections</li>
                    <li>Ductwork in restricted areas</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Electrical Constraints</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Main switchgear delivery</li>
                    <li>Transformer installation</li>
                    <li>Busbar riser systems</li>
                    <li>Commissioning sequences</li>
                    <li>DNO connection timing</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Coordination Meeting Focus Areas</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Critical interfaces:</strong> Where critical paths of different trades intersect</li>
                <li className="pl-1"><strong>Float consumption:</strong> Monitor near-critical paths becoming critical</li>
                <li className="pl-1"><strong>Resource conflicts:</strong> Multiple critical activities needing same space/resource</li>
                <li className="pl-1"><strong>Look-ahead planning:</strong> 3-6 week window for procurement/coordination</li>
                <li className="pl-1"><strong>Mitigation actions:</strong> Recovery plans when critical activities slip</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Coordination principle:</strong> In MEP works, the trade with longest critical path duration typically leads coordination. Others must align their programmes to maintain interfaces.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Forward Pass Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Calculate Early Start and Early Finish for a simple network:
                Activity A (5 days) leads to B (3 days) and C (4 days). Both B and C lead to D (2 days).
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Start at Day 0:</p>
                <p>Activity A: ES=0, EF=0+5=<strong>5</strong></p>
                <p className="mt-2">A finishes at Day 5, so B and C can start:</p>
                <p>Activity B: ES=5, EF=5+3=<strong>8</strong></p>
                <p>Activity C: ES=5, EF=5+4=<strong>9</strong></p>
                <p className="mt-2">D requires both B and C complete:</p>
                <p>ES(D) = MAX(EF of B, EF of C) = MAX(8, 9) = <strong>9</strong></p>
                <p>Activity D: ES=9, EF=9+2=<strong>11</strong></p>
                <p className="mt-2 text-green-400">Project duration = 11 days</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Float Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Using the same network, calculate total float for Activity B if project duration is 11 days.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Backward pass for Activity B:</p>
                <p>D must finish by Day 11: LF(D)=11, LS(D)=11-2=9</p>
                <p>B must finish before D starts: LF(B)=LS(D)=9</p>
                <p>LS(B) = LF(B) - Duration = 9-3=6</p>
                <p className="mt-2">From forward pass: ES(B)=5, EF(B)=8</p>
                <p className="mt-2">Total Float = LF - EF = 9 - 8 = <strong>1 day</strong></p>
                <p className="text-white/60 mt-2">(Alternatively: LS - ES = 6 - 5 = 1 day)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Critical Path Identification</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Which path is critical: A-B-D or A-C-D?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Path A-B-D: 5 + 3 + 2 = 10 days</p>
                <p>Path A-C-D: 5 + 4 + 2 = 11 days</p>
                <p className="mt-2">Critical path = <strong>A-C-D</strong> (longest duration)</p>
                <p className="mt-2">Verify: Activities on critical path have zero float</p>
                <p>Activity C: ES=5, EF=9</p>
                <p>LF(C) = LS(D) = 9</p>
                <p>TF = LF - EF = 9 - 9 = <strong>0 (Critical)</strong></p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 4: Crashing Decision</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Project must finish in 10 days. Activity C can be crashed by 1 day for GBP500, Activity A by 1 day for GBP800. Which should be crashed?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Current critical path: A-C-D = 11 days</p>
                <p>Need to reduce by 1 day</p>
                <p className="mt-2">Both A and C are on critical path - either will work</p>
                <p>Activity C crash cost: GBP500/day</p>
                <p>Activity A crash cost: GBP800/day</p>
                <p className="mt-2 text-green-400">Decision: Crash Activity C (lowest cost per day saved)</p>
                <p className="mt-2">New path A-C-D: 5 + 3 + 2 = 10 days</p>
                <p className="text-white/60">Note: Path A-B-D is now also 10 days - both paths now critical</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">CPM Analysis Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">List all activities with durations and dependencies</li>
                <li className="pl-1">Draw network diagram (AON format)</li>
                <li className="pl-1">Perform forward pass (ES, EF for all activities)</li>
                <li className="pl-1">Note project duration from final activity EF</li>
                <li className="pl-1">Perform backward pass (LF, LS for all activities)</li>
                <li className="pl-1">Calculate total float (LF - EF) for all activities</li>
                <li className="pl-1">Identify critical path (activities with TF = 0)</li>
                <li className="pl-1">Verify: first activity LS = 0, critical path duration = project duration</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">EF = ES + Duration (forward pass)</li>
                <li className="pl-1">LS = LF - Duration (backward pass)</li>
                <li className="pl-1">Total Float = LF - EF = LS - ES</li>
                <li className="pl-1">Critical path = zero total float</li>
                <li className="pl-1">Free Float = ES(successor) - EF(activity)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Using MIN in forward pass</strong> - Use MAX for ES when multiple predecessors</li>
                <li className="pl-1"><strong>Using MAX in backward pass</strong> - Use MIN for LF when multiple successors</li>
                <li className="pl-1"><strong>Crashing non-critical activities</strong> - Only crash critical path activities</li>
                <li className="pl-1"><strong>Ignoring near-critical paths</strong> - Low float paths can become critical</li>
                <li className="pl-1"><strong>Forgetting lag/lead in calculations</strong> - Must include in ES/EF calculations</li>
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
                <p className="font-medium text-white mb-1">CPM Formulae</p>
                <ul className="space-y-0.5">
                  <li>EF = ES + Duration</li>
                  <li>LS = LF - Duration</li>
                  <li>Total Float = LF - EF (or LS - ES)</li>
                  <li>Free Float = ES(succ) - EF</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Critical Path Rules</p>
                <ul className="space-y-0.5">
                  <li>Zero total float = critical</li>
                  <li>Longest path = project duration</li>
                  <li>Only crash critical activities</li>
                  <li>Multiple paths can be critical</li>
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
            <Link to="../h-n-c-module5-section1-4">
              Next: Resource Planning
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule5Section1_3;
