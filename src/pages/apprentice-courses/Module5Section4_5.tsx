import { ArrowLeft, ArrowRight, Target, CheckCircle, AlertTriangle, Users, BookOpen, Clipboard, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import FormulaList from "@/components/apprentice-courses/FormulaList";
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

const Module5Section4_5 = () => {
  useSEO(TITLE, DESCRIPTION);

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

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Top header bar */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg ">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 5.4.5
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Coordinating Equipment with Team Requirements
          </h1>
          <p className="text-white">
            Master equipment coordination strategies to ensure team efficiency, prevent delays, and manage shared resources effectively.
          </p>
        </header>

        {/* Spot it in 30 Seconds Card */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-white" />
            <h2 className="text-lg sm:text-xl font-semibold text-white">Introduction</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Plan equipment needs and create booking systems for shared resources.</li>
                <li>Hold daily briefings to coordinate equipment use and prevent conflicts.</li>
                <li>Ensure accountability with proper return and storage procedures.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Teams waiting for equipment, conflicts over shared tools, or improvised solutions.</li>
                <li><strong>Use:</strong> Booking systems, equipment logs, and daily coordination meetings.</li>
                <li><strong>Check:</strong> Equipment availability, return schedules, and team resource needs.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <p className="text-base text-white mb-4">
            Electrical installation projects often involve multiple team members working on different tasks at the same time. Without proper coordination of tools, materials, and equipment, delays, shortages, and inefficiencies can occur. Effective coordination ensures everyone has what they need, when they need it, to complete their work safely and efficiently.
          </p>
          
          <div className="rounded-lg p-4 bg-emerald-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 mt-4">
            <div className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-elec-yellow dark:text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-blue-700 dark:text-elec-yellow mb-2">Why This Matters</p>
                <p className="text-xs sm:text-sm text-white">
                  Effective equipment coordination can improve team productivity by 20-30% and significantly reduce project delays and workplace conflicts.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 space-y-3">
            <p className="text-base text-white">
              <strong>Real Impact:</strong> Projects with proper equipment coordination show 40% fewer delays and improved team satisfaction compared to poorly coordinated sites.
            </p>
            
            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded border border-emerald-200 dark:border-emerald-800">
              <p className="text-xs sm:text-sm text-white">
                <strong>Industry Standard:</strong> BS 7671 requires proper planning of resources to ensure safe and efficient electrical installations.
              </p>
            </div>
          </div>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning Outcomes</h2>
          <p className="text-white mb-4">By the end of this subsection, you will be able to:</p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-3">
              <h4 className="font-medium text-white">Coordination Planning Skills</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex items-start">
                  <span className="text-elec-yellow mr-2 font-bold">•</span>
                  Understand the importance of coordinating equipment and resources
                </li>
                <li className="flex items-start">
                  <span className="text-elec-yellow mr-2 font-bold">•</span>
                  Apply planning methods to match equipment with team requirements
                </li>
                <li className="flex items-start">
                  <span className="text-elec-yellow mr-2 font-bold">•</span>
                  Create effective booking systems for shared tools and access equipment
                </li>
                <li className="flex items-start">
                  <span className="text-elec-yellow mr-2 font-bold">•</span>
                  Schedule equipment allocation based on project task sequences
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-white">Problem Prevention Skills</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex items-start">
                  <span className="text-elec-yellow mr-2 font-bold">•</span>
                  Recognise common issues caused by poor coordination
                </li>
                <li className="flex items-start">
                  <span className="text-elec-yellow mr-2 font-bold">•</span>
                  Manage shared resources fairly and efficiently
                </li>
                <li className="flex items-start">
                  <span className="text-elec-yellow mr-2 font-bold">•</span>
                  Implement communication systems for daily coordination
                </li>
                <li className="flex items-start">
                  <span className="text-elec-yellow mr-2 font-bold">•</span>
                  Prevent safety risks from equipment unavailability
                </li>
              </ul>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-white">Team Management</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex items-start">
                  <span className="text-elec-yellow mr-2 font-bold">•</span>
                  Improve team productivity through proactive resource planning
                </li>
                <li className="flex items-start">
                  <span className="text-elec-yellow mr-2 font-bold">•</span>
                  Establish accountability systems for equipment care and return
                </li>
                <li className="flex items-start">
                  <span className="text-elec-yellow mr-2 font-bold">•</span>
                  Conduct effective daily briefings for resource coordination
                </li>
                <li className="flex items-start">
                  <span className="text-elec-yellow mr-2 font-bold">•</span>
                  Resolve equipment conflicts professionally and efficiently
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-white">System Implementation</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex items-start">
                  <span className="text-elec-yellow mr-2 font-bold">•</span>
                  Develop and maintain equipment tracking logs and booking systems
                </li>
                <li className="flex items-start">
                  <span className="text-elec-yellow mr-2 font-bold">•</span>
                  Plan contingencies for equipment failures or unavailability
                </li>
                <li className="flex items-start">
                  <span className="text-elec-yellow mr-2 font-bold">•</span>
                  Monitor and improve coordination effectiveness over time
                </li>
                <li className="flex items-start">
                  <span className="text-elec-yellow mr-2 font-bold">•</span>
                  Implement digital tools for enhanced equipment management
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded border border-amber-200 dark:border-amber-800">
            <p className="text-xs sm:text-sm text-white">
              <strong>Business Impact:</strong> Effective coordination reduces project costs through improved efficiency and prevents costly delays that can impact entire construction schedules.
            </p>
          </div>
        </Card>

        {/* Content / Learning */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6">Content / Learning</h2>
          
          <div className="space-y-8">
            <div>
              <p className="text-lg font-medium text-white mb-6">
                Effective equipment coordination is the foundation of successful electrical installations:
              </p>
              
              <div className="border-l-4 border-elec-yellow pl-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-elec-yellow text-white text-lg font-bold flex-shrink-0">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-elec-yellow mb-3">Why Coordination Matters</h3>
                    <h4 className="font-medium text-white mb-3">Key benefits:</h4>
                    <ul className="space-y-2 text-white">
                      <li>• Prevents downtime caused by missing tools or equipment</li>
                      <li>• Reduces disputes over shared resources</li>
                      <li>• Improves workflow and project progress</li>
                      <li>• Ensures safety by providing correct equipment for each task</li>
                    </ul>
                    
                    <div className="mt-4 p-4 rounded-lg border border-green-500/30 ">
                      <h5 className="font-medium text-green-400 mb-2">Professional Impact</h5>
                      <p className="text-xs sm:text-sm text-white">
                        Effective coordination demonstrates competence and builds long-term team relationships.
                      </p>
                    </div>
                  </div>
                </div>
                
                <InlineCheck 
                  id={quickCheckQuestions[0].id.toString()}
                  question={quickCheckQuestions[0].question}
                  options={quickCheckQuestions[0].options}
                  correctIndex={quickCheckQuestions[0].correctIndex}
                  explanation={quickCheckQuestions[0].explanation}
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-white mb-4">2. Common Problems from Poor Coordination</h3>
              <p className="text-white mb-6">
                Understanding typical coordination failures helps identify risks early:
              </p>
              
              <div className="border-l-4 border-green-500 pl-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500 text-white text-lg font-bold flex-shrink-0">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-green-400 mb-3">Coordination Problems Process</h3>
                    <h4 className="font-medium text-white mb-3">Key issues:</h4>
                    <ul className="space-y-2 text-white">
                      <li>• Multiple workers needing the same specialist tool at once</li>
                      <li>• Shortages of PPE or access equipment</li>
                      <li>• Equipment booked for one task but unavailable for another</li>
                      <li>• Teams waiting on deliveries or missing stock</li>
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
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-white mb-4">3. Coordinating Equipment Effectively</h3>
              <p className="text-white mb-6">
                Successful coordination requires systematic planning and clear processes:
              </p>
              
              <div className="border-l-4 border-purple-500 pl-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-500 text-white text-lg font-bold flex-shrink-0">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-elec-yellow mb-3">Effective Coordination Process</h3>
                    <h4 className="font-medium text-white mb-3">Key steps:</h4>
                    <ul className="space-y-2 text-white">
                      <li>• Review job breakdown and task sequencing to anticipate requirements</li>
                      <li>• Allocate tools, materials, and PPE in advance</li>
                      <li>• Schedule shared equipment (e.g., MEWPs, scaffold towers)</li>
                      <li>• Keep a log of who has which items</li>
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
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-white mb-4">4. Communication and Teamwork</h3>
              <p className="text-white mb-6">
                Effective communication is essential for successful coordination:
              </p>
              
              <div className="border-l-4 border-orange-500 pl-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 text-white text-lg font-bold flex-shrink-0">
                    4
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-elec-yellow mb-3">Communication Process</h3>
                    <h4 className="font-medium text-white mb-3">Key actions:</h4>
                    <ul className="space-y-2 text-white">
                      <li>• Hold daily team briefings to plan equipment use</li>
                      <li>• Encourage reporting of missing or faulty tools immediately</li>
                      <li>• Ensure equipment is returned, stored, and ready for the next user</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-white mb-4">5. Risks of Poor Coordination</h3>
              <p className="text-white mb-6">
                Understanding risks helps justify investment in proper systems:
              </p>
              
              <div className="border-l-4 border-red-500 pl-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-500 text-white text-lg font-bold flex-shrink-0">
                    5
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-elec-yellow mb-3">Risk Assessment</h3>
                    <h4 className="font-medium text-white mb-3">Key risks:</h4>
                    <ul className="space-y-2 text-white">
                      <li>• Lost time and reduced productivity</li>
                      <li>• Unsafe improvisation when correct equipment isn't available</li>
                      <li>• Tension between team members</li>
                      <li>• Project delays and extra costs</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-4">
            {practicalGuidance.map((guidance, index) => (
              <div key={index} className="border-l-4 border-elec-blue pl-4 bg-emerald-50/50 dark:bg-blue-900/10 py-3 rounded-r">
                <p className="text-white">{guidance}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Knowledge Check */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6">Quick Knowledge Check</h2>
          <div className="space-y-4 text-white">
            <p>• Why is coordinating equipment important on site?</p>
            <p>• Name one common issue caused by poor coordination.</p>
            <p>• How can equipment availability be tracked effectively?</p>
          </div>
        </Card>

        {/* Real-World Example */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6">Real-World Example</h2>
          
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-white">The Problem:</h4>
              <p className="text-sm text-white">
                On a warehouse lighting project, two teams needed the same scissor lift at the same time. Because no schedule had been created, one team had to wait several hours, causing delays.
              </p>
              
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded border border-red-200 dark:border-red-800">
                <p className="text-sm font-medium text-red-700 dark:text-elec-yellow mb-1">Consequences:</p>
                <ul className="text-xs sm:text-sm text-white list-disc pl-4">
                  <li>4 hours of lost productivity</li>
                  <li>Team frustration and conflicts</li>
                  <li>Rush to complete work by deadline</li>
                  <li>Quality concerns from hurried installation</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-white">The Solution:</h4>
              <p className="text-sm text-white">
                A simple booking system for shared access equipment would have kept both teams productive and prevented the conflict entirely.
              </p>
              
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded border border-green-200 dark:border-green-800">
                <p className="text-sm font-medium text-green-700 dark:text-green-400 mb-1">Prevention Measures:</p>
                <ul className="text-xs sm:text-sm text-white list-disc pl-4">
                  <li>Equipment booking system implemented</li>
                  <li>Daily coordination meetings established</li>
                  <li>Clear handover procedures created</li>
                  <li>Backup equipment identified for critical tasks</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-emerald-50 dark:bg-blue-900/20 p-3 rounded border border-blue-200 dark:border-blue-800">
            <p className="text-xs sm:text-sm text-white">
              <strong>Lesson Learned:</strong> The project manager now uses digital booking systems on all projects, reducing equipment conflicts by 90% and improving team satisfaction significantly.
            </p>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6">FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-white/10 rounded-lg p-4">
                <h3 className="font-medium text-white mb-2">{faq.question}</h3>
                <p className="text-white text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-6 h-6 text-elec-yellow" />
            <h2 className="text-lg sm:text-xl font-semibold text-white">Pocket Guide – Coordinating Equipment</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {pocketGuideItems.map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                <CheckCircle className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                <p className="text-xs sm:text-sm text-white">{item}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Recap</h2>
          
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-4">
              <p className="text-white leading-relaxed">
                In this subsection, you learned how to coordinate equipment with team requirements. You now understand the importance of planning, communication, and shared resource management to avoid downtime and conflicts.
              </p>
              
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Professional Benefits</h4>
                <ul className="text-sm text-white list-disc ml-4 space-y-1">
                  <li>Improved team productivity and project efficiency</li>
                  <li>Reduced conflicts and better team collaboration</li>
                  <li>Enhanced safety through proper equipment provision</li>
                  <li>Better project planning and resource management</li>
                  <li>Compliance with health and safety requirements</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
              <p className="text-white leading-relaxed">
                <strong>Remember:</strong> Proper coordination improves productivity, keeps workers safe, and ensures projects run smoothly. Every successful project relies on effective resource planning and team communication.
              </p>
            </div>
          </div>
        </Card>

        {/* Quiz */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <Quiz 
            questions={quizQuestions}
            title="Module 5 Section 4.5 - Coordinating Equipment Quiz"
          />
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button variant="outline" asChild>
            <Link to="../4-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Subsection 4
            </Link>
          </Button>
          <Button asChild>
            <Link to="..">
              Next: Section 4 Overview
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module5Section4_5;