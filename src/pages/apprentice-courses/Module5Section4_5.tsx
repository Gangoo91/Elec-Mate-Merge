import { ArrowLeft, ArrowRight, Settings, CheckCircle, AlertTriangle, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Coordinating Equipment with Team Requirements - Module 5.4.5 | Level 2 Electrical Course";
const DESCRIPTION = "Master equipment coordination strategies to ensure team efficiency, prevent delays, and manage shared resources effectively in electrical installations.";

const quickCheckQuestions = [
  {
    id: 1,
    question: "Why is coordinating equipment important on site?",
    options: [
      "To increase project costs",
      "To ensure team members have what they need to work efficiently and safely",
      "To create more paperwork",
      "To slow down workflow"
    ],
    correctIndex: 1,
    explanation: "Equipment coordination ensures team members have the right tools and materials when needed, improving efficiency and safety."
  },
  {
    id: 2,
    question: "Name one common issue caused by poor coordination.",
    options: [
      "Improved productivity",
      "Better team relationships",
      "Multiple workers needing the same specialist tool at once",
      "Reduced project costs"
    ],
    correctIndex: 2,
    explanation: "When equipment coordination is poor, multiple workers often need the same specialist tool simultaneously, causing delays and conflicts."
  },
  {
    id: 3,
    question: "How can equipment availability be tracked effectively?",
    options: [
      "By memory only",
      "Using sign-in/out logs or booking systems",
      "Leaving tools anywhere",
      "No tracking needed"
    ],
    correctIndex: 1,
    explanation: "Sign-in/out logs and booking systems provide clear tracking of who has which equipment and when it should be returned."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Why is equipment coordination important?",
    options: [
      "To create more work",
      "To ensure team members have what they need to work efficiently and safely",
      "To increase project costs",
      "To slow down progress"
    ],
    correctAnswer: 1,
    explanation: "Equipment coordination ensures team members have the right tools and materials when needed, improving efficiency and safety while preventing delays."
  },
  {
    id: 2,
    question: "True or False: Poor coordination can lead to disputes and downtime.",
    options: [
      "False - coordination doesn't affect team dynamics",
      "True - poor coordination causes conflicts and delays"
    ],
    correctAnswer: 1,
    explanation: "Poor coordination directly leads to disputes over shared resources and downtime when workers can't access needed equipment."
  },
  {
    id: 3,
    question: "Give one example of shared equipment that often requires scheduling.",
    options: [
      "Personal hand tools",
      "MEWPs or scaffold towers",
      "Individual PPE",
      "Personal notebooks"
    ],
    correctAnswer: 1,
    explanation: "MEWPs (Mobile Elevating Work Platforms) and scaffold towers are expensive shared equipment that multiple teams need, requiring careful scheduling."
  },
  {
    id: 4,
    question: "What is a simple system for tracking who has equipment?",
    options: [
      "Memory only",
      "A sign-in/out or booking log",
      "No system needed",
      "Verbal agreements"
    ],
    correctAnswer: 1,
    explanation: "Sign-in/out logs provide clear documentation of who has equipment, when it was taken, and when it should be returned."
  },
  {
    id: 5,
    question: "What should be done at daily team briefings?",
    options: [
      "Discuss personal matters only",
      "Plan equipment use and resolve potential conflicts",
      "Ignore resource planning",
      "Focus only on weather"
    ],
    correctAnswer: 1,
    explanation: "Daily briefings should include equipment planning to prevent conflicts and ensure all team members know what resources are available."
  },
  {
    id: 6,
    question: "What is one risk of not coordinating equipment properly?",
    options: [
      "Improved safety",
      "Unsafe improvisation",
      "Better productivity",
      "Cost savings"
    ],
    correctAnswer: 1,
    explanation: "Poor coordination can lead to workers improvising with inappropriate or unsafe equipment when the correct tools aren't available."
  },
  {
    id: 7,
    question: "How should equipment be returned after use?",
    options: [
      "In any condition",
      "In good condition, stored, and ready for the next user",
      "Damaged is acceptable",
      "Left where last used"
    ],
    correctAnswer: 1,
    explanation: "Equipment must be returned in good condition and properly stored to maintain its usability for the next team member."
  },
  {
    id: 8,
    question: "What type of tools should every worker provide themselves?",
    options: [
      "All tools including specialist equipment",
      "Basic hand tools",
      "Only PPE",
      "No tools at all"
    ],
    correctAnswer: 1,
    explanation: "Workers should provide their own basic hand tools, while larger or specialist equipment can be shared through coordination systems."
  },
  {
    id: 9,
    question: "Why is communication important in equipment coordination?",
    options: [
      "It creates more meetings",
      "It prevents clashes and ensures fair use of shared resources",
      "It slows down work",
      "It's not important"
    ],
    correctAnswer: 1,
    explanation: "Good communication prevents equipment conflicts and ensures fair access to shared resources, improving overall team productivity."
  },
  {
    id: 10,
    question: "What was the problem in the warehouse lighting project example?",
    options: [
      "Too much equipment available",
      "Two teams needed the same scissor lift at once, causing delays",
      "Equipment was too expensive",
      "No workers available"
    ],
    correctAnswer: 1,
    explanation: "The lack of a booking system meant two teams needed the same scissor lift simultaneously, causing unnecessary delays and lost productivity."
  }
];

const practicalGuidance = [
  "Step 1: Map out equipment needs for each stage of the project during planning. Include timing requirements and identify potential conflicts between teams or tasks.",
  "Step 2: Create a booking system for shared tools and access equipment. Use digital systems or simple paper logs to track availability and reservations.",
  "Step 3: Hold daily coordination meetings to review needs and resolve conflicts. Keep meetings brief but focused on upcoming resource requirements.",
  "Step 4: Keep a shared equipment log to track use, condition, and location. Update in real-time and make it accessible to all team members.",
  "Step 5: Encourage accountability — tools must be returned in good condition and on time. Implement consequences for repeated failure to follow procedures.",
  "Step 6: Plan for contingencies by identifying alternative equipment or backup plans when primary resources aren't available.",
  "Step 7: Review and improve coordination processes regularly based on team feedback and observed issues during the project."
];

const pocketGuideItems = [
  "Anticipate equipment needs through planning - review task sequences and timing requirements.",
  "Allocate and schedule shared tools/resources using booking systems or logs.",
  "Use booking systems or logs for tracking who has what equipment and when.",
  "Hold daily briefings for coordination and conflict resolution.",
  "Ensure tools are returned and ready for use by the next team member.",
  "Communicate equipment issues immediately to prevent delays.",
  "Plan contingencies for when primary equipment isn't available.",
  "Maintain equipment logs with current location and condition status.",
  "Enforce accountability for equipment care and timely return."
];

const faqs = [
  {
    question: "Should every worker bring their own tools?",
    answer: "Basic hand tools, yes — but larger or specialist equipment can be shared if coordinated properly. Workers should have their personal toolkit while expensive or specialist items are managed through booking systems."
  },
  {
    question: "What if a team member doesn't return shared tools?",
    answer: "Site supervisors should enforce accountability using sign-in/out logs. Implement consequences such as restricted access to shared resources or disciplinary action for repeated offences."
  },
  {
    question: "Can daily coordination really save time?",
    answer: "Yes — even short daily briefings prevent clashes and wasted time. A 10-minute morning briefing can prevent hours of delays and conflicts throughout the day."
  },
  {
    question: "How should conflicts over equipment be resolved?",
    answer: "Use the booking system as the primary reference, but site supervisors should mediate based on project priorities and safety requirements. Always prioritise safety-critical tasks."
  },
  {
    question: "What's the best way to track expensive equipment?",
    answer: "Use detailed logs with serial numbers, condition reports, and GPS tracking where appropriate. Consider insurance implications and implement security measures for high-value items."
  },
  {
    question: "How can digital tools improve coordination?",
    answer: "Digital booking systems, mobile apps, and real-time tracking can provide instant visibility of equipment availability and location, reducing conflicts and improving efficiency."
  },
  {
    question: "What should be done if equipment breaks during use?",
    answer: "Stop work immediately, secure the area, report to supervisors, and log the incident. Replace with alternative equipment and arrange repairs through proper channels."
  }
];

const Module5Section4_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/5 -ml-2 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 5</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 4.5</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Coordinating Equipment with Team Requirements
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Master equipment coordination strategies to ensure team efficiency, prevent delays, and manage shared resources effectively.
            </p>
          </header>

          {/* Introduction */}
          <section className="mb-10">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-6">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="text-white/80 space-y-1 text-sm">
                <li>• Plan equipment needs and create booking systems for shared resources.</li>
                <li>• Hold daily briefings to coordinate equipment use and prevent conflicts.</li>
                <li>• Ensure accountability with proper return and storage procedures.</li>
              </ul>
            </div>

            <p className="text-white/80 leading-relaxed mb-4">
              Electrical installation projects often involve multiple team members working on different tasks at the same time. Without proper coordination of tools, materials, and equipment, delays, shortages, and inefficiencies can occur. Effective coordination ensures everyone has what they need, when they need it, to complete their work safely and efficiently.
            </p>

            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <div className="flex items-start gap-3">
                <Settings className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-blue-400 mb-2">Why This Matters</p>
                  <p className="text-sm text-white/70">
                    Effective equipment coordination can improve team productivity by 20-30% and significantly reduce project delays and workplace conflicts.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">00</span>
              Learning Outcomes
            </h2>
            <p className="text-white/80 mb-4">By the end of this subsection, you will be able to:</p>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="space-y-3">
                <h4 className="font-medium text-white">Coordination Planning Skills</h4>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li className="flex items-start">
                    <span className="text-elec-yellow mr-2">•</span>
                    Understand the importance of coordinating equipment and resources
                  </li>
                  <li className="flex items-start">
                    <span className="text-elec-yellow mr-2">•</span>
                    Apply planning methods to match equipment with team requirements
                  </li>
                  <li className="flex items-start">
                    <span className="text-elec-yellow mr-2">•</span>
                    Create effective booking systems for shared tools and access equipment
                  </li>
                  <li className="flex items-start">
                    <span className="text-elec-yellow mr-2">•</span>
                    Schedule equipment allocation based on project task sequences
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-white">Problem Prevention Skills</h4>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li className="flex items-start">
                    <span className="text-elec-yellow mr-2">•</span>
                    Recognise common issues caused by poor coordination
                  </li>
                  <li className="flex items-start">
                    <span className="text-elec-yellow mr-2">•</span>
                    Manage shared resources fairly and efficiently
                  </li>
                  <li className="flex items-start">
                    <span className="text-elec-yellow mr-2">•</span>
                    Implement communication systems for daily coordination
                  </li>
                  <li className="flex items-start">
                    <span className="text-elec-yellow mr-2">•</span>
                    Prevent safety risks from equipment unavailability
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white/80">
                <strong className="text-white">Business Impact:</strong> Effective coordination reduces project costs through improved efficiency and prevents costly delays that can impact entire construction schedules.
              </p>
            </div>
          </section>

          {/* Learning Point 1: Why Coordination Matters */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Why Coordination Matters
            </h2>

            <p className="text-white/80 mb-4 leading-relaxed">
              Effective equipment coordination is the foundation of successful electrical installations:
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <p className="font-medium text-green-400 mb-2">Key Benefits</p>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>• Prevents downtime caused by missing tools or equipment</li>
                  <li>• Reduces disputes over shared resources</li>
                  <li>• Improves workflow and project progress</li>
                  <li>• Ensures safety by providing correct equipment for each task</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <p className="font-medium text-blue-400 mb-2">Professional Impact</p>
                <p className="text-sm text-white/70">
                  Effective coordination demonstrates competence and builds long-term team relationships. Projects with proper equipment coordination show 40% fewer delays and improved team satisfaction.
                </p>
              </div>
            </div>

            <InlineCheck
              id={quickCheckQuestions[0].id.toString()}
              question={quickCheckQuestions[0].question}
              options={quickCheckQuestions[0].options}
              correctIndex={quickCheckQuestions[0].correctIndex}
              explanation={quickCheckQuestions[0].explanation}
            />
          </section>

          {/* Learning Point 2: Common Problems */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Common Problems from Poor Coordination
            </h2>

            <p className="text-white/80 mb-4 leading-relaxed">
              Understanding typical coordination failures helps identify risks early:
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="font-medium text-red-400 mb-2">Resource Conflicts</p>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>• Multiple workers needing the same specialist tool at once</li>
                  <li>• Shortages of PPE or access equipment</li>
                  <li>• Equipment booked for one task but unavailable for another</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <p className="font-medium text-amber-400 mb-2">Workflow Issues</p>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>• Teams waiting on deliveries or missing stock</li>
                  <li>• Work delays impacting project timelines</li>
                  <li>• Rescheduling cascading through dependent tasks</li>
                </ul>
              </div>
            </div>

            <InlineCheck
              id={quickCheckQuestions[1].id.toString()}
              question={quickCheckQuestions[1].question}
              options={quickCheckQuestions[1].options}
              correctIndex={quickCheckQuestions[1].correctIndex}
              explanation={quickCheckQuestions[1].explanation}
            />
          </section>

          {/* Learning Point 3: Coordinating Equipment Effectively */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Coordinating Equipment Effectively
            </h2>

            <p className="text-white/80 mb-4 leading-relaxed">
              Successful coordination requires systematic planning and clear processes:
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <p className="font-medium text-blue-400 mb-2">Planning Steps</p>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>• Review job breakdown and task sequencing to anticipate requirements</li>
                  <li>• Allocate tools, materials, and PPE in advance</li>
                  <li>• Schedule shared equipment (e.g., MEWPs, scaffold towers)</li>
                  <li>• Keep a log of who has which items</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <p className="font-medium text-purple-400 mb-2">Tracking Systems</p>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>• Sign-in/out logs for all shared equipment</li>
                  <li>• Digital booking systems for expensive items</li>
                  <li>• Real-time location tracking where appropriate</li>
                  <li>• Condition monitoring and maintenance schedules</li>
                </ul>
              </div>
            </div>

            <InlineCheck
              id={quickCheckQuestions[2].id.toString()}
              question={quickCheckQuestions[2].question}
              options={quickCheckQuestions[2].options}
              correctIndex={quickCheckQuestions[2].correctIndex}
              explanation={quickCheckQuestions[2].explanation}
            />
          </section>

          {/* Learning Point 4: Communication and Teamwork */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Communication and Teamwork
            </h2>

            <p className="text-white/80 mb-4 leading-relaxed">
              Effective communication is essential for successful coordination:
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <p className="font-medium text-orange-400 mb-2">Key Communication Actions</p>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>• Hold daily team briefings to plan equipment use</li>
                  <li>• Encourage reporting of missing or faulty tools immediately</li>
                  <li>• Ensure equipment is returned, stored, and ready for the next user</li>
                  <li>• Share equipment status updates in real-time</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <p className="font-medium text-green-400 mb-2">Team Accountability</p>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>• Clear ownership of equipment during use</li>
                  <li>• Responsibility for condition and return</li>
                  <li>• Prompt reporting of issues or damage</li>
                  <li>• Respect for booking systems and schedules</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Learning Point 5: Risks of Poor Coordination */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Risks of Poor Coordination
            </h2>

            <p className="text-white/80 mb-4 leading-relaxed">
              Understanding risks helps justify investment in proper systems:
            </p>

            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-red-400 mb-2">Key Risks</p>
                  <ul className="text-sm text-white/70 space-y-1">
                    <li>• Lost time and reduced productivity</li>
                    <li>• Unsafe improvisation when correct equipment isn't available</li>
                    <li>• Tension between team members</li>
                    <li>• Project delays and extra costs</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Real-World Example */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Real-World Example
            </h2>

            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-3">Warehouse Lighting Project</h3>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-white">The Problem:</h4>
                  <p className="text-sm text-white/70">
                    On a warehouse lighting project, two teams needed the same scissor lift at the same time. Because no schedule had been created, one team had to wait several hours, causing delays.
                  </p>

                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                    <p className="text-sm font-medium text-red-400 mb-1">Consequences:</p>
                    <ul className="text-sm text-white/70 list-disc pl-4">
                      <li>4 hours of lost productivity</li>
                      <li>Team frustration and conflicts</li>
                      <li>Rush to complete work by deadline</li>
                      <li>Quality concerns from hurried installation</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-white">The Solution:</h4>
                  <p className="text-sm text-white/70">
                    A simple booking system for shared access equipment would have kept both teams productive and prevented the conflict entirely.
                  </p>

                  <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <p className="text-sm font-medium text-green-400 mb-1">Prevention Measures:</p>
                    <ul className="text-sm text-white/70 list-disc pl-4">
                      <li>Equipment booking system implemented</li>
                      <li>Daily coordination meetings established</li>
                      <li>Clear handover procedures created</li>
                      <li>Backup equipment identified for critical tasks</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <p className="text-sm text-white/70">
                  <strong className="text-blue-400">Lesson Learned:</strong> The project manager now uses digital booking systems on all projects, reducing equipment conflicts by 90% and improving team satisfaction significantly.
                </p>
              </div>
            </div>
          </section>

          {/* Practical Guidance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Practical Guidance
            </h2>
            <div className="space-y-3">
              {practicalGuidance.map((guidance, index) => (
                <div key={index} className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                  <p className="text-white/80 text-sm">{guidance}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h3 className="font-medium text-white mb-2">{faq.question}</h3>
                  <p className="text-white/70 text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Pocket Guide */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-5 h-5 text-elec-yellow" />
              <h2 className="text-xl font-semibold text-white">Pocket Guide – Coordinating Equipment</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {pocketGuideItems.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                  <CheckCircle className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-white/80">{item}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Recap */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">09</span>
              Recap
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-4">
                <p className="text-white/80 leading-relaxed">
                  In this subsection, you learned how to coordinate equipment with team requirements. You now understand the importance of planning, communication, and shared resource management to avoid downtime and conflicts.
                </p>

                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <h4 className="font-semibold text-green-400 mb-2">Professional Benefits</h4>
                  <ul className="text-sm text-white/70 list-disc ml-4 space-y-1">
                    <li>Improved team productivity and project efficiency</li>
                    <li>Reduced conflicts and better team collaboration</li>
                    <li>Enhanced safety through proper equipment provision</li>
                    <li>Better project planning and resource management</li>
                    <li>Compliance with health and safety requirements</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-white/80 leading-relaxed">
                  <strong className="text-white">Remember:</strong> Proper coordination improves productivity, keeps workers safe, and ensures projects run smoothly. Every successful project relies on effective resource planning and team communication.
                </p>
              </div>
            </div>
          </section>

          {/* Knowledge Check Quiz */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">10</span>
              Knowledge Check
            </h2>
            <Quiz
              questions={quizQuestions}
              title="Module 5 Section 4.5 - Coordinating Equipment Quiz"
            />
          </section>

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10 mt-10">
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../4-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back: Managing Wastage
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="..">
                Complete Section 4
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module5Section4_5;
