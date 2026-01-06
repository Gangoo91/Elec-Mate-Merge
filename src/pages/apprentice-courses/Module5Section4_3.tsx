import { ArrowLeft, ArrowRight, Target, CheckCircle, AlertTriangle, Users, BookOpen, Clipboard, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import FormulaList from "@/components/apprentice-courses/FormulaList";
import useSEO from "@/hooks/useSEO";

const TITLE = "Tool Selection and Availability - Module 5.4.3 | Level 2 Electrical Course";
const DESCRIPTION = "Master proper tool selection, availability management, and safety standards for electrical installations per BS 7671.";

const quickCheckQuestions = [
  {
    id: 1,
    question: "Why is it unsafe to use the wrong tool for a task?",
    options: [
      "It might damage the tool",
      "It increases risk of injury and poor workmanship",
      "It takes longer to complete",
      "It costs more money"
    ],
    correctIndex: 1,
    explanation: "Using inappropriate tools increases injury risk and can result in poor quality work that fails compliance standards."
  },
  {
    id: 2,
    question: "Name one specialist tool required in electrical installation.",
    options: [
      "Standard screwdriver",
      "Hammer",
      "Torque screwdriver",
      "Measuring tape"
    ],
    correctIndex: 2,
    explanation: "Specialist tools like torque screwdrivers are essential for meeting BS 7671 compliance requirements."
  },
  {
    id: 3,
    question: "What system helps manage shared tools on site?",
    options: [
      "First come, first served",
      "Tool sign-in/out system",
      "Personal ownership only",
      "Random allocation"
    ],
    correctIndex: 1,
    explanation: "A sign-in/out system ensures accountability and prevents loss of shared tools on construction sites."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Why is it important to use the correct tool for each task?",
    options: [
      "To impress clients",
      "To ensure safety, accuracy, and prevent damage",
      "To work faster",
      "To save money"
    ],
    correctAnswer: 1,
    explanation: "Using correct tools ensures safety, maintains quality standards, and prevents equipment damage or personal injury."
  },
  {
    id: 2,
    question: "Give one example of a specialist electrical tool.",
    options: [
      "Standard hammer",
      "Torque screwdriver",
      "Regular pliers",
      "Basic screwdriver"
    ],
    correctAnswer: 1,
    explanation: "Torque screwdrivers are specialist tools that ensure precise tightening to manufacturer specifications."
  },
  {
    id: 3,
    question: "What type of tool is a multimeter?",
    options: [
      "Hand tool",
      "Power tool",
      "Measuring and testing tool",
      "Cutting tool"
    ],
    correctAnswer: 2,
    explanation: "A multimeter is a measuring and testing tool used to verify electrical values and circuit integrity."
  },
  {
    id: 4,
    question: "True or False: Using makeshift alternatives is acceptable if the correct tool isn't available.",
    options: [
      "True - improvisation shows skill",
      "False - safety and quality come first"
    ],
    correctAnswer: 1,
    explanation: "Work should pause until proper tools are available. Makeshift alternatives compromise safety and quality."
  },
  {
    id: 5,
    question: "What system helps manage shared tools on-site?",
    options: [
      "Honour system",
      "Tool sign-in/out system",
      "Random distribution",
      "First come, first served"
    ],
    correctAnswer: 1,
    explanation: "A formal sign-in/out system provides accountability and prevents loss of expensive shared tools."
  },
  {
    id: 6,
    question: "Why should torque screwdrivers be calibrated?",
    options: [
      "To make them look professional",
      "To ensure accurate tightening to required specifications",
      "To increase their lifespan",
      "To comply with insurance requirements"
    ],
    correctAnswer: 1,
    explanation: "Calibration ensures torque settings meet manufacturer specifications and BS 7671 requirements."
  },
  {
    id: 7,
    question: "What is a risk of not having spare essential tools?",
    options: [
      "Higher insurance costs",
      "Work delays if tools break or are lost",
      "Client complaints",
      "Reduced profit margins"
    ],
    correctAnswer: 1,
    explanation: "Tool failure without spares can halt work completely, causing costly project delays."
  },
  {
    id: 8,
    question: "Name one storage method that helps protect tools.",
    options: [
      "Leaving them on benches",
      "Tool cases, racks, or lockable boxes",
      "Storing in damp areas",
      "Keeping them in vehicles"
    ],
    correctAnswer: 1,
    explanation: "Proper storage in cases, racks, or lockable boxes protects tools from damage, theft, and environmental factors."
  },
  {
    id: 9,
    question: "What's a consequence of poor tool planning?",
    options: [
      "Better team relationships",
      "Delays, poor workmanship, or failed inspections",
      "Increased client satisfaction",
      "Lower material costs"
    ],
    correctAnswer: 1,
    explanation: "Poor tool planning leads to work delays, quality issues, and potential inspection failures."
  },
  {
    id: 10,
    question: "Who is responsible for checking tool condition before use?",
    options: [
      "The site supervisor only",
      "The client",
      "The individual using the tool",
      "The tool manufacturer"
    ],
    correctAnswer: 2,
    explanation: "Each individual using a tool must check its condition to ensure safe operation and prevent accidents."
  }
];

const practicalGuidance = [
  "Step 1: Create comprehensive tool inventories for each project phase including hand tools, measuring equipment, power tools, and specialist items. Specify exact requirements for compliance with BS 7671 standards.",
  "Step 2: Establish systematic tool inspection procedures including daily visual checks, weekly functional tests, and scheduled calibration for measuring instruments. Document all checks for compliance records.",
  "Step 3: Implement robust tool availability systems with backup tools for critical items, shared tool tracking, and emergency procurement procedures for unexpected requirements.",
  "Step 4: Develop comprehensive training programs ensuring all team members understand correct tool selection, proper usage techniques, and safety procedures for each tool category.",
  "Step 5: Create secure storage systems with environmental protection, organised layouts, and security measures to prevent theft and damage whilst maintaining easy access for authorised personnel.",
  "Step 6: Maintain detailed tool management records including purchase dates, calibration schedules, maintenance history, and replacement planning to ensure continuous availability.",
  "Step 7: Establish supplier relationships for tool procurement, emergency replacement, calibration services, and technical support to minimise downtime and maintain compliance standards."
];

const pocketGuideItems = [
  "Always select the correct tool for each specific task - never compromise on safety.",
  "Plan tool requirements in advance and coordinate with project schedules.",
  "Inspect all tools before use - check condition, calibration, and functionality.",
  "Implement formal sign-in/out systems for shared and expensive tools.",
  "Keep adequate spares of essential items to prevent work stoppages.",
  "Store tools properly in secure, dry, organised locations with appropriate protection.",
  "Maintain calibration schedules for all measuring and testing equipment.",
  "Train all team members on proper tool selection and safe usage procedures.",
  "Document tool inspections, maintenance, and calibration for compliance records.",
  "Build strong supplier relationships for procurement, service, and emergency support."
];

const Module5Section4_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  const faqs = [
    {
      question: "Should every electrician have their own full tool kit?",
      answer: "Ideally yes for personal hand tools and basic equipment. However, expensive specialist tools (torque drivers, cable pullers, testing equipment) can be shared effectively using proper sign-in/out systems and regular calibration schedules."
    },
    {
      question: "How often should tools be inspected for safety and compliance?",
      answer: "Daily visual inspections before use, weekly functional checks for power tools, and formal inspections according to manufacturer recommendations or company policy. Measuring instruments require calibration certificates maintained to current standards."
    },
    {
      question: "What should I do if the correct tool isn't available on-site?",
      answer: "Work should pause until the proper tool is sourced. Using inappropriate tools or makeshift alternatives creates safety risks and quality issues that can lead to failed inspections and liability problems."
    },
    {
      question: "How do I handle tool calibration requirements for BS 7671 compliance?",
      answer: "Maintain calibration certificates for all measuring instruments, schedule regular calibration services with accredited providers, and keep detailed records. Calibrated tools are essential for proving compliance with electrical standards."
    },
    {
      question: "What's the best approach for managing tools across multiple projects?",
      answer: "Use centralised tool tracking systems with barcode scanning, maintain separate tool allocations per project, and implement clear transfer procedures between sites. Digital systems help track location, condition, and calibration status."
    },
    {
      question: "How do I justify the cost of specialist electrical tools to management?",
      answer: "Calculate the cost of delays, rework, and non-compliance against tool investment. Specialist tools often pay for themselves through improved efficiency, quality, and compliance with safety standards."
    },
    {
      question: "What storage conditions are required for sensitive measuring equipment?",
      answer: "Protect from temperature extremes, humidity, vibration, and impact. Use dedicated cases with foam inserts, maintain stable environmental conditions, and avoid storage in vehicles or temporary structures where possible."
    },
    {
      question: "How do I ensure tools meet current safety standards?",
      answer: "Purchase tools from reputable suppliers with CE marking and relevant safety certifications. Maintain manufacturer documentation, follow maintenance schedules, and replace tools that no longer meet current safety standards."
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
              <Wrench className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 5.4.3
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Tool Selection and Availability
          </h1>
          <p className="text-white">
            Master proper tool selection and management to ensure safe, efficient electrical installations to professional standards.
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
                <li>Use the right tool for each task - never compromise on safety.</li>
                <li>Plan tool availability and maintain spares of essential items.</li>
                <li>Inspect tools before use and maintain calibration records.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Wrong tools being used or missing specialist equipment.</li>
                <li><strong>Use:</strong> Tool inventories, inspection checklists, calibration schedules.</li>
                <li><strong>Check:</strong> Tool condition, availability, and compliance requirements.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning Outcomes</h2>
          <p className="text-white mb-4">By the end of this subsection, you will be able to:</p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-3">
              <h4 className="font-medium text-white">Tool Selection Skills</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex items-start">
                  <span className="text-elec-yellow mr-2 font-bold">•</span>
                  Select the correct tools for common electrical installation tasks
                </li>
                <li className="flex items-start">
                  <span className="text-elec-yellow mr-2 font-bold">•</span>
                  Understand safety standards when choosing and using tools
                </li>
                <li className="flex items-start">
                  <span className="text-elec-yellow mr-2 font-bold">•</span>
                  Recognise risks of using unsuitable or poorly maintained tools
                </li>
                <li className="flex items-start">
                  <span className="text-elec-yellow mr-2 font-bold">•</span>
                  Apply BS 7671 requirements for specialist electrical tools
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-white">Tool Management</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex items-start">
                  <span className="text-elec-yellow mr-2 font-bold">•</span>
                  Implement systems for managing tool availability on-site
                </li>
                <li className="flex items-start">
                  <span className="text-elec-yellow mr-2 font-bold">•</span>
                  Maintain tool inspection and calibration schedules
                </li>
                <li className="flex items-start">
                  <span className="text-elec-yellow mr-2 font-bold">•</span>
                  Create effective storage and security systems for tools
                </li>
                <li className="flex items-start">
                  <span className="text-elec-yellow mr-2 font-bold">•</span>
                  Develop emergency procurement procedures for critical tools
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded border border-amber-200 dark:border-amber-800">
            <p className="text-xs sm:text-sm text-white">
              <strong>Competency Link:</strong> These outcomes support NVQ Level 2 competencies for tool selection, maintenance, and safe working practices in electrical installations.
            </p>
          </div>
        </Card>

        {/* Learning Point 1: Selecting the Right Tool */}
        <Card className="mb-6 p-6 bg-transparent border-white/20">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-elec-yellow" />
            <h2 className="text-lg sm:text-xl font-semibold text-white">Learning Point 1: Selecting the Right Tool</h2>
          </div>
          
          <p className="text-base text-white mb-4">
            Using the correct tool for each task is fundamental to safe and professional electrical work. Every tool is designed for specific purposes, and using the wrong tool can lead to poor results, damage, or injury.
          </p>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-white mb-3">Why Tool Selection Matters</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                <p className="text-sm font-medium text-amber-700 dark:text-amber-400 mb-2">Safety</p>
                <p className="text-xs sm:text-sm text-white">Wrong tools can slip, break, or cause electrical hazards</p>
              </div>
              <div className="p-4 rounded-lg bg-emerald-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <p className="text-sm font-medium text-blue-700 dark:text-elec-yellow mb-2">Quality</p>
                <p className="text-xs sm:text-sm text-white">Correct tools ensure precise connections and professional finish</p>
              </div>
              <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                <p className="text-sm font-medium text-green-700 dark:text-green-400 mb-2">Efficiency</p>
                <p className="text-xs sm:text-sm text-white">Right tools complete tasks faster with better results</p>
              </div>
              <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                <p className="text-sm font-medium text-purple-700 dark:text-elec-yellow mb-2">Compliance</p>
                <p className="text-xs sm:text-sm text-white">Specialist tools may be required for BS 7671 compliance</p>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg p-4 bg-muted/50 border border-border/30 mb-4">
            <h4 className="font-medium text-white mb-2">Common Tool Categories</h4>
            <div className="grid md:grid-cols-2 gap-4 text-xs sm:text-sm text-white">
              <div>
                <p className="font-medium mb-2">Hand Tools:</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Screwdrivers (insulated for electrical work)</li>
                  <li>Pliers (various types for different tasks)</li>
                  <li>Wire strippers and crimpers</li>
                  <li>Spanners and socket sets</li>
                </ul>
              </div>
              <div>
                <p className="font-medium mb-2">Specialist Tools:</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Torque screwdrivers (calibrated)</li>
                  <li>Cable pulling equipment</li>
                  <li>Conduit bending tools</li>
                  <li>Testing and measuring instruments</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded border border-red-200 dark:border-red-800">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-red-700 dark:text-elec-yellow mb-2">Never Use Makeshift Alternatives</p>
                <p className="text-xs sm:text-sm text-white">
                  Using the wrong tool or makeshift alternatives significantly increases injury risk and can result in poor workmanship that fails compliance standards. Wait for the correct tool to be available.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Check for Learning Point 1 */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Check - Tool Selection</h3>
            <InlineCheck
              id="tool-selection-check"
              question={quickCheckQuestions[0].question}
              options={quickCheckQuestions[0].options}
              correctIndex={quickCheckQuestions[0].correctIndex}
              explanation={quickCheckQuestions[0].explanation}
            />
          </div>
        </Card>

        {/* Learning Point 2: Specialist Tools */}
        <Card className="mb-6 p-6 bg-transparent border-white/20">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-elec-yellow" />
            <h2 className="text-lg sm:text-xl font-semibold text-white">Learning Point 2: Specialist Tools</h2>
          </div>
          
          <p className="text-base text-white mb-4">
            Electrical work often requires specialist tools that may not be needed for general construction tasks. These tools are designed to meet the specific demands of electrical installation and ensure compliance with safety standards.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Essential Specialist Tools</h3>
              
              <div className="p-4 rounded-lg bg-emerald-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <p className="font-medium text-blue-700 dark:text-elec-yellow mb-2">Torque Screwdrivers</p>
                <p className="text-xs sm:text-sm text-white mb-2">
                  Required for terminations that must meet specific torque values (e.g., MCB connections, cable glands).
                </p>
                <ul className="text-xs sm:text-sm text-white list-disc pl-4">
                  <li>Must be calibrated to ensure accuracy</li>
                  <li>Different ranges for different applications</li>
                  <li>Essential for BS 7671 compliance</li>
                </ul>
              </div>
              
              <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                <p className="font-medium text-green-700 dark:text-green-400 mb-2">Testing Equipment</p>
                <p className="text-xs sm:text-sm text-white mb-2">
                  Multimeters, insulation testers, earth loop impedance testers.
                </p>
                <ul className="text-xs sm:text-sm text-white list-disc pl-4">
                  <li>Must be calibrated and certificated</li>
                  <li>Essential for verification testing</li>
                  <li>Required for electrical certificates</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">When Specialist Tools Are Required</h3>
              
              <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                <p className="font-medium text-amber-700 dark:text-amber-400 mb-2">Mandatory Use</p>
                <ul className="text-xs sm:text-sm text-white list-disc pl-4 space-y-1">
                  <li>When manufacturer instructions specify torque values</li>
                  <li>For safety-critical connections</li>
                  <li>During verification testing</li>
                  <li>When required by BS 7671</li>
                </ul>
              </div>
              
              <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                <p className="font-medium text-purple-700 dark:text-elec-yellow mb-2">Quality Benefits</p>
                <ul className="text-xs sm:text-sm text-white list-disc pl-4 space-y-1">
                  <li>Consistent, repeatable results</li>
                  <li>Reduced risk of over-tightening</li>
                  <li>Professional appearance</li>
                  <li>Compliance documentation</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-elec-yellow dark:text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-yellow-700 dark:text-elec-yellow mb-2">Calibration Requirements</p>
                <p className="text-xs sm:text-sm text-white">
                  All measuring and testing equipment must be calibrated regularly and have valid calibration certificates. Uncalibrated equipment cannot be used for compliance testing.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Check for Learning Point 2 */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Check - Specialist Tools</h3>
            <InlineCheck
              id="specialist-tools-check"
              question={quickCheckQuestions[1].question}
              options={quickCheckQuestions[1].options}
              correctIndex={quickCheckQuestions[1].correctIndex}
              explanation={quickCheckQuestions[1].explanation}
            />
          </div>
        </Card>

        {/* Learning Point 3: Tool Availability */}
        <Card className="mb-6 p-6 bg-transparent border-white/20">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-elec-yellow" />
            <h2 className="text-lg sm:text-xl font-semibold text-white">Learning Point 3: Tool Availability</h2>
          </div>
          
          <p className="text-base text-white mb-4">
            Having the right tools available when needed is crucial for maintaining productivity and quality. Poor tool availability leads to delays, frustration, and often results in using inappropriate alternatives that compromise safety and workmanship.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Planning Tool Requirements</h3>
              
              <div className="p-4 rounded-lg bg-emerald-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <p className="font-medium text-blue-700 dark:text-elec-yellow mb-2">Pre-Project Planning</p>
                <ul className="text-xs sm:text-sm text-white list-disc pl-4 space-y-1">
                  <li>Review project specifications and drawings</li>
                  <li>Identify all required tools and equipment</li>
                  <li>Check availability and condition</li>
                  <li>Arrange procurement or hire if needed</li>
                </ul>
              </div>
              
              <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                <p className="font-medium text-green-700 dark:text-green-400 mb-2">Daily Planning</p>
                <ul className="text-xs sm:text-sm text-white list-disc pl-4 space-y-1">
                  <li>Check weather conditions for outdoor work</li>
                  <li>Confirm tool availability for daily tasks</li>
                  <li>Coordinate shared tool usage</li>
                  <li>Plan tool transport and security</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Managing Shared Tools</h3>
              
              <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                <p className="font-medium text-amber-700 dark:text-amber-400 mb-2">Sign-in/Out Systems</p>
                <ul className="text-xs sm:text-sm text-white list-disc pl-4 space-y-1">
                  <li>Track who has which tools</li>
                  <li>Monitor tool condition and calibration</li>
                  <li>Prevent loss and theft</li>
                  <li>Ensure availability for priority tasks</li>
                </ul>
              </div>
              
              <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                <p className="font-medium text-purple-700 dark:text-elec-yellow mb-2">Backup Strategies</p>
                <ul className="text-xs sm:text-sm text-white list-disc pl-4 space-y-1">
                  <li>Maintain spare essential tools</li>
                  <li>Establish emergency procurement procedures</li>
                  <li>Coordinate with other trades and suppliers</li>
                  <li>Plan alternative work when tools unavailable</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded border border-red-200 dark:border-red-800 mb-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-red-700 dark:text-elec-yellow mb-2">Impact of Poor Tool Planning</p>
                <ul className="text-xs sm:text-sm text-white list-disc pl-4 space-y-1">
                  <li>Work delays and missed deadlines</li>
                  <li>Increased safety risks from using wrong tools</li>
                  <li>Poor workmanship and potential rework</li>
                  <li>Team frustration and reduced morale</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg p-4 bg-muted/50 border border-border/30">
            <h4 className="font-medium text-white mb-2">Best Practice Example</h4>
            <p className="text-xs sm:text-sm text-white">
              <strong>Tool Coordination Meeting:</strong> Start each day with a brief team meeting to coordinate tool requirements, identify conflicts, and plan sharing of specialist equipment. This prevents delays and ensures critical tools are available when needed.
            </p>
          </div>
        </Card>

        {/* Quick Check for Learning Point 3 */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Check - Tool Availability</h3>
            <InlineCheck
              id="tool-availability-check"
              question={quickCheckQuestions[2].question}
              options={quickCheckQuestions[2].options}
              correctIndex={quickCheckQuestions[2].correctIndex}
              explanation={quickCheckQuestions[2].explanation}
            />
          </div>
        </Card>

        {/* Worked Examples */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6">Worked Examples</h2>
          
          <div className="space-y-6">
            {/* Example 1 */}
            <div className="border border-border/30 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-3">Example 1: Selecting Tools for MCB Installation</h3>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-white">Task Requirements:</h4>
                  <ul className="text-sm text-white space-y-1">
                    <li>• Install 32A Type B MCB in consumer unit</li>
                    <li>• Connect 6mm² cable to MCB terminals</li>
                    <li>• Ensure connection meets manufacturer torque specification (2.5 Nm)</li>
                    <li>• Verify installation quality and safety</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-white">Required Tools:</h4>
                  <ul className="text-sm text-white space-y-1">
                    <li>✓ Insulated screwdrivers (slotted and Pozidriv)</li>
                    <li>✓ Calibrated torque screwdriver (0.5-3.0 Nm range)</li>
                    <li>✓ Cable strippers for 6mm² cable</li>
                    <li>✓ Multimeter for verification testing</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded border border-amber-200 dark:border-amber-800 mb-3">
                <p className="text-xs sm:text-sm text-white">
                  <strong>Critical Point:</strong> The torque screwdriver must be calibrated and certificated. Using an uncalibrated tool could result in over-tightening and terminal damage.
                </p>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded border border-green-200 dark:border-green-800">
                <p className="text-xs sm:text-sm text-white">
                  <strong>Quality Outcome:</strong> Using correct tools ensures BS 7671 compliance, reduces installation time by 30%, and prevents common connection failures.
                </p>
              </div>
            </div>

            {/* Example 2 */}
            <div className="border border-border/30 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-3">Example 2: Tool Management System Implementation</h3>
              
              <div className="grid md:grid-cols-3 gap-3 sm:gap-4 mb-4">
                <div>
                  <h4 className="font-medium text-white mb-2">Daily Checks</h4>
                  <ul className="text-sm text-white space-y-1">
                    <li>✓ Visual inspection of tools</li>
                    <li>✓ Function test for power tools</li>
                    <li>✓ Battery levels and charging</li>
                    <li>✓ Safety guard integrity</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-white mb-2">Weekly Reviews</h4>
                  <ul className="text-sm text-white space-y-1">
                    <li>✓ Tool inventory and location</li>
                    <li>✓ Maintenance requirements</li>
                    <li>✓ Calibration due dates</li>
                    <li>✓ Replacement needs</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-white mb-2">Monthly Actions</h4>
                  <ul className="text-sm text-white space-y-1">
                    <li>✓ Formal tool audits</li>
                    <li>✓ Training updates</li>
                    <li>✓ Supplier performance review</li>
                    <li>✓ System improvements</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-emerald-50 dark:bg-blue-900/20 p-3 rounded border border-blue-200 dark:border-blue-800">
                <p className="text-xs sm:text-sm text-white">
                  <strong>Management Benefit:</strong> Systematic tool management reduces downtime by 40% and improves compliance with health and safety requirements.
                </p>
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

        {/* Key Formulas (if relevant) */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6">Key Reference Values</h2>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-emerald-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <h3 className="font-medium text-blue-700 dark:text-elec-yellow mb-2">Common Torque Values</h3>
                <ul className="text-xs sm:text-sm text-white space-y-1">
                  <li>• MCB terminals: 2.5 Nm (typically)</li>
                  <li>• Cable glands: 5-10 Nm (size dependent)</li>
                  <li>• Busbar connections: 10-25 Nm</li>
                  <li>• Always check manufacturer specifications</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                <h3 className="font-medium text-green-700 dark:text-green-400 mb-2">Calibration Intervals</h3>
                <ul className="text-xs sm:text-sm text-white space-y-1">
                  <li>• Torque tools: 12 months maximum</li>
                  <li>• Multimeters: 12 months</li>
                  <li>• Insulation testers: 12 months</li>
                  <li>• More frequent if heavily used</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-white/10 rounded-lg p-4">
                <h3 className="font-medium text-white mb-2">{faq.question}</h3>
                <p className="text-white text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Knowledge Check Quiz */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <div className="flex items-center gap-3 mb-6">
            <Clipboard className="w-6 h-6 text-elec-yellow" />
            <h2 className="text-lg sm:text-xl font-semibold text-white">Knowledge Check</h2>
          </div>
          <Quiz questions={quizQuestions} />
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-6 h-6 text-elec-yellow" />
            <h2 className="text-lg sm:text-xl font-semibold text-white">Pocket Guide - Tool Selection & Availability</h2>
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

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-white/10">
          <Button variant="outline" className="bg-[#121212]" asChild>
            <Link to="../4-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          
          <div className="text-center">
            <p className="text-sm text-white">Module 5, Section 4</p>
            <p className="text-xs text-white">3 of 6 subsections</p>
          </div>
          
          <Button variant="outline" className="bg-[#121212]" asChild>
            <Link to="..">
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module5Section4_3;