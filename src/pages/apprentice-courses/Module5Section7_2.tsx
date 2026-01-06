import { ArrowLeft, ArrowRight, Tag, Target, CheckCircle, AlertTriangle, Users, BookOpen, Clipboard, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Cable and Circuit Labelling Conventions - Module 5.7.2 | Level 2 Electrical Course";
const DESCRIPTION = "Learn proper cable and circuit labelling conventions for BS 7671 compliance, safety, and efficient maintenance in electrical installations.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "What is the main reason for labelling electrical circuits?",
    options: ["To make installations look tidy", "To ensure safety and compliance", "To save money on materials", "To meet client preferences"],
    correctIndex: 1,
    explanation: "The main reason for labelling circuits is to ensure safety and compliance with BS 7671, enabling quick identification for isolation and maintenance."
  },
  {
    id: 2,
    question: "Which regulation requires correct labelling of circuits and cables?",
    options: ["BS 5266", "BS 7671", "ISO 9001", "BS 6004"],
    correctIndex: 1,
    explanation: "BS 7671 (IET Wiring Regulations) requires proper identification and labelling of all electrical circuits and cables."
  },
  {
    id: 3,
    question: "What must each distribution board contain?",
    options: ["Spare labels", "A circuit schedule/chart", "Colour code samples", "Test certificates"],
    correctIndex: 1,
    explanation: "Each distribution board must contain a circuit schedule or chart that clearly identifies each circuit, its purpose, and its characteristics."
  }
];

const Module5Section7_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What is the main reason for labelling electrical circuits?",
      options: [
        "To make installations look tidy",
        "To ensure safety and compliance",
        "To save money on materials",
        "To meet client preferences"
      ],
      correctAnswer: 1,
      explanation: "The main reason for labelling circuits is to ensure safety and compliance with BS 7671, enabling quick identification for isolation and maintenance."
    },
    {
      id: 2,
      question: "Which regulation requires correct labelling of circuits and cables?",
      options: [
        "BS 5266",
        "BS 7671",
        "ISO 9001",
        "BS 6004"
      ],
      correctAnswer: 1,
      explanation: "BS 7671 (IET Wiring Regulations) requires proper identification and labelling of all electrical circuits and cables."
    },
    {
      id: 3,
      question: "What is used to identify conductors and cables?",
      options: [
        "Cable ties",
        "Heat-shrink, clip-on tags, or printed labels",
        "Electrical tape only",
        "Permanent markers"
      ],
      correctAnswer: 1,
      explanation: "Heat-shrink sleeves, clip-on tags, or printed labels are the proper methods for identifying conductors and cables in electrical installations."
    },
    {
      id: 4,
      question: "What must each distribution board contain?",
      options: [
        "Spare labels",
        "A circuit schedule/chart",
        "Colour code samples",
        "Test certificates"
      ],
      correctAnswer: 1,
      explanation: "Each distribution board must contain a circuit schedule or chart that clearly identifies each circuit, its purpose, and its characteristics."
    },
    {
      id: 5,
      question: "Why should labels be durable and heat resistant?",
      options: [
        "To meet client preference",
        "To withstand environmental conditions and remain legible",
        "To save on replacement costs",
        "To look professional"
      ],
      correctAnswer: 1,
      explanation: "Labels must be durable and heat resistant to withstand environmental conditions and remain legible throughout the installation's life."
    },
    {
      id: 6,
      question: "What is a common risk of poor labelling?",
      options: [
        "Lower energy efficiency",
        "Isolating the wrong circuit, leading to safety hazards",
        "Overloading cables",
        "Increased installation costs"
      ],
      correctAnswer: 1,
      explanation: "Poor labelling can lead to isolating the wrong circuit, creating serious safety hazards and potential accidents."
    },
    {
      id: 7,
      question: "Which of the following should be updated when a circuit is altered?",
      options: [
        "Only the label on the cable",
        "The circuit chart and the labels",
        "Nothing if the change is minor",
        "Only the distribution board schedule"
      ],
      correctAnswer: 1,
      explanation: "Both the circuit chart and the labels must be updated when any circuit is altered to maintain accurate identification."
    },
    {
      id: 8,
      question: "What is a CPC in electrical installations?",
      options: [
        "Circuit Protection Code",
        "Circuit Protective Conductor (earth)",
        "Cable Protection Cover",
        "Central Processing Controller"
      ],
      correctAnswer: 1,
      explanation: "CPC stands for Circuit Protective Conductor, which is the earth conductor that provides protection against electric shock."
    },
    {
      id: 9,
      question: "In the real-world scenario, what problem occurred due to poor labelling?",
      options: [
        "The wrong circuit was isolated, causing costly downtime",
        "The cables overheated",
        "The fire alarm system failed",
        "The installation failed inspection"
      ],
      correctAnswer: 0,
      explanation: "Poor labelling led to the wrong circuit being isolated during testing, causing costly downtime across the entire site."
    },
    {
      id: 10,
      question: "Why should labels and charts always be cross-checked?",
      options: [
        "To ensure they match the correct circuit details",
        "To make them look neat",
        "To keep apprentices busy",
        "To satisfy client requirements"
      ],
      correctAnswer: 0,
      explanation: "Labels and charts must be cross-checked to ensure they accurately match the correct circuit details and prevent dangerous mistakes."
    }
  ];

  const faqs = [
    {
      question: "What information should be included on circuit labels?",
      answer: "Circuit labels should include the circuit number, purpose (e.g., lighting, sockets), area served, protective device rating, and any special characteristics such as emergency circuits or computer supplies."
    },
    {
      question: "How often should labelling be checked and updated?",
      answer: "Labelling should be checked during routine inspections and updated immediately after any alterations, additions, or modifications to the electrical installation."
    },
    {
      question: "What are the consequences of using incorrect colour codes?",
      answer: "Incorrect colour codes can lead to dangerous cross-connections, electric shock, equipment damage, and non-compliance with BS 7671, potentially resulting in failed inspections and legal liability."
    },
    {
      question: "Can I use handwritten labels for permanent installations?",
      answer: "While handwritten labels are acceptable, they must be clear, legible, and durable. Printed labels are preferred for permanent installations as they provide better consistency and longevity."
    },
    {
      question: "What should I do if I find unlabelled circuits during maintenance?",
      answer: "Stop work immediately and identify the circuits properly before proceeding. Use appropriate testing methods to trace circuits safely, then apply proper labelling before continuing with any work."
    }
  ];

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Top header bar */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 7
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg ">
              <Tag className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 5.7.2
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Cable and Circuit Labelling Conventions
          </h1>
          <p className="text-white">
            Understanding proper labelling techniques for electrical circuits and cables to ensure safety, compliance, and efficient maintenance.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Clear labelling ensures circuits can be identified quickly for safety and maintenance.</li>
                <li>BS 7671 requires proper identification of all circuits and protective devices.</li>
                <li>Poor labelling can cause dangerous mistakes and costly downtime.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Distribution board schedules, cable markers, colour coding, circuit charts.</li>
                <li><strong>Use:</strong> Label immediately after installation, follow BS 7671 conventions, keep schedules updated.</li>
                <li><strong>Check:</strong> Labels are legible, durable, and match circuit functions.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-base text-white">
            <li>Explain the purpose of labelling cables and circuits.</li>
            <li>Identify common labelling conventions used on-site.</li>
            <li>Recognise the risks of poor or missing labelling.</li>
            <li>Apply best practices when labelling electrical systems.</li>
            <li>Understand compliance requirements for labelling.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content / Learning</h2>

          {/* Why Labelling Matters */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Why Labelling Matters</h3>
            <p className="text-base text-white mb-4">
              Proper labelling is fundamental to electrical safety and forms a critical part of professional installation practice:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow dark:text-elec-yellow mb-1">Safety and Emergency Response</p>
                    <p className="text-base text-white mb-2"><strong>Safety:</strong> Ensures circuits can be isolated quickly in emergencies.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Rapid identification of circuits during electrical emergencies</li>
                      <li>Prevents accidental energisation during maintenance work</li>
                      <li>Enables safe isolation for fault finding and repair</li>
                      <li>Supports emergency services in understanding electrical systems</li>
                      <li>Reduces risk of electric shock from incorrect circuit identification</li>
                      <li>Facilitates lockout/tagout procedures for safe working</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Compliance:</strong> Required under BS 7671 and Health and Safety regulations.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>BS 7671 regulation 514 requires identification of protective devices</li>
                      <li>Each circuit must be clearly identified at the distribution board</li>
                      <li>Cable identification must be maintained throughout the installation</li>
                      <li>Circuit charts must be provided and kept up to date</li>
                      <li>Compliance with Electricity at Work Regulations 1989</li>
                      <li>Supports Construction (Design and Management) Regulations</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Operational efficiency:</strong> Reduces time spent fault finding and testing.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Faster troubleshooting and repair times</li>
                      <li>Reduced downtime during maintenance activities</li>
                      <li>Easier system modifications and additions</li>
                      <li>Improved coordination between multiple trades</li>
                      <li>Enhanced quality control during installation and testing</li>
                      <li>Simplified handover and commissioning processes</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Legal requirement:</strong> Proper labelling is not optional - it is a legal requirement under BS 7671 and essential for safety
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="labelling-purpose-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6" />

          {/* Common Labelling Conventions */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Common Labelling Conventions</h3>
            <p className="text-base text-white mb-4">
              Standardised labelling conventions ensure consistency and understanding across all electrical installations:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Labelling Methods and Standards</p>
                    <p className="text-base text-white mb-2"><strong>Distribution Boards:</strong> Each circuit must be clearly identified (lighting, sockets, fire alarms, etc.).</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Circuit number and description (e.g., "L1 - Ground Floor Lighting")</li>
                      <li>Protective device type and rating (e.g., "16A MCB Type B")</li>
                      <li>Cable size and type (e.g., "2.5mm² T&E")</li>
                      <li>Area or zone served by the circuit</li>
                      <li>Special characteristics (emergency lighting, computer circuits, etc.)</li>
                      <li>Supply phases for three-phase circuits</li>
                      <li>RCD protection indication where applicable</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Cable Markers:</strong> Heat-shrink, clip-on tags, or printed labels to identify conductors and cables.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Heat-shrink sleeves for permanent, durable identification</li>
                      <li>Clip-on tags for easy application and modification</li>
                      <li>Self-adhesive printed labels for distribution boards and panels</li>
                      <li>Cable markers at strategic points (joints, changes of direction)</li>
                      <li>Identification at both ends of cable runs</li>
                      <li>Numbering systems that relate to circuit schedules</li>
                      <li>Weatherproof markers for external installations</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Colour Coding:</strong> Phase conductors, neutrals, and CPCs must follow recognised colour codes.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Single phase: Brown (line), Blue (neutral), Green/Yellow (earth)</li>
                      <li>Three phase: Brown (L1), Black (L2), Grey (L3), Blue (neutral), Green/Yellow (earth)</li>
                      <li>DC circuits: Red (positive), Black (negative), Green/Yellow (earth)</li>
                      <li>Control circuits: Specific colours as defined in BS 7671</li>
                      <li>Functional earthing: Cream or other designated colours</li>
                      <li>Consistency throughout the installation</li>
                      <li>Clear identification where colour coding changes</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Schedules:</strong> A written chart or table showing circuit details, location, and purpose.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Circuit number, description, and protective device details</li>
                      <li>Cable type, size, and installation method</li>
                      <li>Design current and maximum demand</li>
                      <li>Test results including earth fault loop impedance</li>
                      <li>RCD operation times and test results</li>
                      <li>Special requirements or limitations</li>
                      <li>Installation and testing dates with signatures</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Consistency is key:</strong> Use the same labelling system throughout the installation for clarity and professional appearance
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="labelling-standards-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
          <Separator className="my-6" />

          {/* Consequences of Poor Labelling */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Consequences of Poor Labelling</h3>
            <p className="text-base text-white mb-4">
              Inadequate or incorrect labelling can have serious safety, operational, and financial consequences:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 dark:text-elec-yellow mb-1">Safety and Operational Risks</p>
                    <p className="text-base text-white mb-2"><strong>Safety hazards:</strong> Risk of shock or injury when isolating the wrong circuit.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Electric shock from working on live circuits due to incorrect isolation</li>
                      <li>Arc flash incidents from switching wrong protective devices</li>
                      <li>Injury from unexpected equipment operation during maintenance</li>
                      <li>Emergency response delays due to unclear circuit identification</li>
                      <li>Cross-connections leading to equipment damage or fire</li>
                      <li>Inability to safely isolate circuits during emergencies</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Operational impact:</strong> Time wasted in fault finding and increased downtime.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Extended fault-finding times increasing labour costs</li>
                      <li>Production downtime from incorrect circuit isolation</li>
                      <li>Multiple trips to distribution boards to identify circuits</li>
                      <li>Confusion during handover to client or maintenance teams</li>
                      <li>Delayed commissioning due to circuit identification issues</li>
                      <li>Inefficient testing procedures without clear circuit references</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Compliance failures:</strong> Failing compliance inspections and regulatory requirements.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>BS 7671 non-compliance leading to failed electrical inspections</li>
                      <li>Building Control rejection of electrical installation certificates</li>
                      <li>Insurance policy invalidation due to non-compliant installations</li>
                      <li>Health and Safety Executive enforcement action</li>
                      <li>Professional body disciplinary procedures</li>
                      <li>Legal liability for accidents caused by poor labelling</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Prevention:</strong> Proper labelling from the start prevents all these issues and saves time and money in the long term
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="distribution-board-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
        </Card>

        {/* Real-World Scenario */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Real-World Scenario</h2>
          <div className="rounded-lg p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-amber-800 dark:text-amber-200 mb-2">Poor Labelling Causes Costly Downtime</h3>
                <p className="text-base text-white mb-3">
                  On a large industrial project, multiple electricians are working on separate circuits from the same distribution board. Some circuits are not labelled, and another team accidentally isolates the wrong breaker during testing. This causes downtime across the site, costing thousands of pounds in lost productivity.
                </p>
                <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-lg mb-3">
                  <p className="font-medium text-amber-800 dark:text-amber-200">What went wrong:</p>
                  <ul className="text-xs sm:text-sm text-white list-disc ml-4 space-y-1">
                    <li>Incomplete circuit labelling at distribution board</li>
                    <li>No circuit schedule available for reference</li>
                    <li>Poor communication between work teams</li>
                    <li>Assumption that unlabelled circuits were safe to isolate</li>
                  </ul>
                </div>
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
                  <p className="font-medium text-green-800 dark:text-green-200">Prevention measures:</p>
                  <ul className="text-xs sm:text-sm text-white list-disc ml-4 space-y-1">
                    <li>Complete circuit labelling before energisation</li>
                    <li>Provide detailed circuit schedules at each distribution board</li>
                    <li>Implement permit-to-work systems for circuit isolation</li>
                    <li>Regular team briefings on isolation procedures</li>
                  </ul>
                </div>
                <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-lg mt-3">
                  <p className="font-medium text-amber-800 dark:text-amber-200">Lesson:</p>
                  <p className="text-base text-white">
                    Clear, consistent labelling would have prevented confusion and avoided costly mistakes. The few minutes spent on proper labelling saves hours of downtime and potential safety hazards.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Additional Examples */}
          <div className="mt-6 space-y-4">
            <h3 className="font-medium text-white">Common Labelling Mistakes</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-lg p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800">
                <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">Faded Labels</h4>
                <p className="text-xs sm:text-sm text-white mb-2">
                  Paper labels in a plant room fade due to heat and humidity. During an emergency, maintenance staff cannot identify the correct circuit, leading to extended downtime and safety risks.
                </p>
                <p className="text-xs text-white font-medium">Solution: Use heat-resistant, durable labels</p>
              </div>
              <div className="rounded-lg p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800">
                <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">Inconsistent Numbering</h4>
                <p className="text-xs sm:text-sm text-white mb-2">
                  Different electricians use different numbering systems. When fault-finding, circuits cannot be matched between distribution boards and the electrical drawings, causing confusion and delays.
                </p>
                <p className="text-xs text-white font-medium">Solution: Establish clear labelling standards for all teams</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Practical Guidance</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="rounded-lg p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
              <h3 className="font-medium text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Best Practices
              </h3>
              <ul className="text-xs sm:text-sm text-white space-y-2">
                <li>• Always label cables and circuits immediately after installation</li>
                <li>• Use durable, legible labels resistant to heat and wear</li>
                <li>• Cross-check labels with circuit charts before handover</li>
                <li>• Keep distribution board schedules up to date</li>
                <li>• Follow BS 7671 requirements for identification and documentation</li>
                <li>• Use consistent numbering systems throughout the installation</li>
                <li>• Apply labels at both ends of cable runs</li>
                <li>• Include protective device ratings on labels</li>
              </ul>
            </div>
            <div className="rounded-lg p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-blue-200 dark:border-blue-800">
              <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-3 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Key Actions
              </h3>
              <ul className="text-xs sm:text-sm text-white space-y-2">
                <li>• Label all circuits and cables clearly</li>
                <li>• Use BS 7671 colour codes and conventions</li>
                <li>• Provide a circuit chart in each distribution board</li>
                <li>• Use durable, heat-resistant labels</li>
                <li>• Update labels and charts after modifications</li>
                <li>• Verify label accuracy before energisation</li>
                <li>• Train all team members on labelling standards</li>
                <li>• Include labelling in quality control checks</li>
              </ul>
            </div>
          </div>
          
          {/* Labelling Materials Guide */}
          <div className="mb-6">
            <h3 className="font-medium text-white mb-4">Choosing the Right Labelling Materials</h3>
            <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-white/10">
                <h4 className="font-medium text-white mb-2">Heat-Shrink Sleeves</h4>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium text-green-600 dark:text-green-400">Best for:</p>
                    <ul className="text-xs text-white list-disc ml-4 space-y-1">
                      <li>Permanent cable identification</li>
                      <li>High-temperature environments</li>
                      <li>Outdoor installations</li>
                      <li>Industrial applications</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-amber-600 dark:text-amber-400">Considerations:</p>
                    <ul className="text-xs text-white list-disc ml-4 space-y-1">
                      <li>Requires heat gun for application</li>
                      <li>Difficult to modify once applied</li>
                      <li>Limited character space</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-white/10">
                <h4 className="font-medium text-white mb-2">Self-Adhesive Labels</h4>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium text-green-600 dark:text-green-400">Best for:</p>
                    <ul className="text-xs text-white list-disc ml-4 space-y-1">
                      <li>Distribution board schedules</li>
                      <li>Panel identification</li>
                      <li>Detailed circuit information</li>
                      <li>Professional appearance</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-amber-600 dark:text-amber-400">Considerations:</p>
                    <ul className="text-xs text-white list-disc ml-4 space-y-1">
                      <li>May fade in direct sunlight</li>
                      <li>Adhesive may fail in extreme temperatures</li>
                      <li>Protect from moisture ingress</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-white/10">
                <h4 className="font-medium text-white mb-2">Clip-On Tags</h4>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium text-green-600 dark:text-green-400">Best for:</p>
                    <ul className="text-xs text-white list-disc ml-4 space-y-1">
                      <li>Temporary identification</li>
                      <li>Easy modification</li>
                      <li>Cable tray installations</li>
                      <li>Testing and commissioning</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-amber-600 dark:text-amber-400">Considerations:</p>
                    <ul className="text-xs text-white list-disc ml-4 space-y-1">
                      <li>May become loose over time</li>
                      <li>Can be accidentally removed</li>
                      <li>Less suitable for final installations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quality Control Checklist */}
          <div className="rounded-lg p-4 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20 border border-blue-200 dark:border-blue-800">
            <h3 className="font-medium text-white mb-3">Labelling Quality Control Checklist</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-white mb-2">Before Energisation:</p>
                <ul className="text-xs text-white space-y-1">
                  <li>☐ All circuits labelled at distribution board</li>
                  <li>☐ Cable identification at key points</li>
                  <li>☐ Circuit schedule completed and installed</li>
                  <li>☐ Colour coding verified throughout</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-white mb-2">Final Handover:</p>
                <ul className="text-xs text-white space-y-1">
                  <li>☐ Labels legible and secure</li>
                  <li>☐ Circuit details match test results</li>
                  <li>☐ Emergency isolation clearly marked</li>
                  <li>☐ Client briefed on labelling system</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-8 p-6 bg-gradient-to-r from-card/10 to-emerald-500/10 border-white/10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Clipboard className="w-5 h-5" />
            Pocket Guide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-white mb-2">✅ Label all circuits and cables clearly</p>
              <p className="font-medium text-white mb-2">✅ Use BS 7671 colour codes and conventions</p>
              <p className="font-medium text-white mb-2">✅ Provide a circuit chart in each distribution board</p>
            </div>
            <div>
              <p className="font-medium text-white mb-2">✅ Use durable, heat-resistant labels</p>
              <p className="font-medium text-white mb-2">✅ Update labels and charts after modifications</p>
              <p className="font-medium text-white mb-2">✅ Cross-check labels with circuit functions</p>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/10 pb-4 last:border-b-0">
                <h3 className="font-medium text-white mb-2">{faq.question}</h3>
                <p className="text-sm text-white">{faq.answer}</p>
              </div>
            ))}
          </div>
          
          {/* Additional FAQs */}
          <div className="mt-6 pt-6 border-t border-white/10 space-y-4">
            <div className="border-b border-white/10 pb-4">
              <h3 className="font-medium text-white mb-2">What size should circuit labels be?</h3>
              <p className="text-sm text-white">Labels should be large enough to be easily read under normal lighting conditions. Typically, text should be at least 3mm high, with important labels such as main isolators being larger for clear visibility.</p>
            </div>
            <div className="border-b border-white/10 pb-4">
              <h3 className="font-medium text-white mb-2">How do I handle multi-language requirements?</h3>
              <p className="text-sm text-white">Where multiple languages are required, use symbols where possible and provide translated circuit schedules. Ensure that safety-critical labels like emergency isolation are clearly understood by all site personnel.</p>
            </div>
            <div className="border-b border-white/10 pb-4">
              <h3 className="font-medium text-white mb-2">What should I do if existing labels are incorrect?</h3>
              <p className="text-sm text-white">Never remove incorrect labels until the correct identification is established. Use appropriate testing methods to verify circuit details, then replace with correct labels and update all related documentation.</p>
            </div>
            <div>
              <h3 className="font-medium text-white mb-2">Are there special requirements for fire alarm circuits?</h3>
              <p className="text-sm text-white">Yes, fire alarm circuits should be clearly identified with red labels or red text, and must be protected by dedicated protective devices. They should also be clearly marked on circuit schedules and drawings.</p>
            </div>
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Recap</h2>
          <p className="text-base text-white mb-4">
            In this subsection, you learned the importance of cable and circuit labelling conventions. You explored why clear labelling ensures safety, compliance, and efficiency. You also saw how poor labelling can cause costly downtime and safety risks. Proper labelling is not just good practice - it is a legal requirement that protects both personnel and installations.
          </p>
        </Card>

        {/* Quiz */}
        <Quiz
          title="Test Your Knowledge"
          questions={quizQuestions}
        />

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-6 border-t border-white/10">
          <Button variant="outline" asChild>
            <Link to="../7-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Subsection
            </Link>
          </Button>
          <Button asChild>
            <Link to="../7-3">
              Next Subsection
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module5Section7_2;