import { ArrowLeft, ArrowRight, Tag, Target, CheckCircle, AlertTriangle, Clipboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Cable and Circuit Labelling Conventions - Module 5.7.2 | Level 2 Electrical Course";
const DESCRIPTION = "Learn proper cable and circuit labelling conventions for BS 7671 compliance, safety, and efficient maintenance in electrical installations.";

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
      options: ["To make installations look tidy", "To ensure safety and compliance", "To save money on materials", "To meet client preferences"],
      correctAnswer: 1,
      explanation: "The main reason for labelling circuits is to ensure safety and compliance with BS 7671, enabling quick identification for isolation and maintenance."
    },
    {
      id: 2,
      question: "Which regulation requires correct labelling of circuits and cables?",
      options: ["BS 5266", "BS 7671", "ISO 9001", "BS 6004"],
      correctAnswer: 1,
      explanation: "BS 7671 (IET Wiring Regulations) requires proper identification and labelling of all electrical circuits and cables."
    },
    {
      id: 3,
      question: "What is used to identify conductors and cables?",
      options: ["Cable ties", "Heat-shrink, clip-on tags, or printed labels", "Electrical tape only", "Permanent markers"],
      correctAnswer: 1,
      explanation: "Heat-shrink sleeves, clip-on tags, or printed labels are the proper methods for identifying conductors and cables in electrical installations."
    },
    {
      id: 4,
      question: "What must each distribution board contain?",
      options: ["Spare labels", "A circuit schedule/chart", "Colour code samples", "Test certificates"],
      correctAnswer: 1,
      explanation: "Each distribution board must contain a circuit schedule or chart that clearly identifies each circuit, its purpose, and its characteristics."
    },
    {
      id: 5,
      question: "Why should labels be durable and heat resistant?",
      options: ["To meet client preference", "To withstand environmental conditions and remain legible", "To save on replacement costs", "To look professional"],
      correctAnswer: 1,
      explanation: "Labels must be durable and heat resistant to withstand environmental conditions and remain legible throughout the installation's life."
    },
    {
      id: 6,
      question: "What is a common risk of poor labelling?",
      options: ["Lower energy efficiency", "Isolating the wrong circuit, leading to safety hazards", "Overloading cables", "Increased installation costs"],
      correctAnswer: 1,
      explanation: "Poor labelling can lead to isolating the wrong circuit, creating serious safety hazards and potential accidents."
    },
    {
      id: 7,
      question: "Which of the following should be updated when a circuit is altered?",
      options: ["Only the label on the cable", "The circuit chart and the labels", "Nothing if the change is minor", "Only the distribution board schedule"],
      correctAnswer: 1,
      explanation: "Both the circuit chart and the labels must be updated when any circuit is altered to maintain accurate identification."
    },
    {
      id: 8,
      question: "What is a CPC in electrical installations?",
      options: ["Circuit Protection Code", "Circuit Protective Conductor (earth)", "Cable Protection Cover", "Central Processing Controller"],
      correctAnswer: 1,
      explanation: "CPC stands for Circuit Protective Conductor, which is the earth conductor that provides protection against electric shock."
    },
    {
      id: 9,
      question: "In the real-world scenario, what problem occurred due to poor labelling?",
      options: ["The wrong circuit was isolated, causing costly downtime", "The cables overheated", "The fire alarm system failed", "The installation failed inspection"],
      correctAnswer: 0,
      explanation: "Poor labelling led to the wrong circuit being isolated during testing, causing costly downtime across the entire site."
    },
    {
      id: 10,
      question: "Why should labels and charts always be cross-checked?",
      options: ["To ensure they match the correct circuit details", "To make them look neat", "To keep apprentices busy", "To satisfy client requirements"],
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
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
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
              Back to Section 7
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
              <span className="text-white/60">Section 7.2</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Cable and Circuit Labelling Conventions
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Understanding proper labelling techniques for electrical circuits and cables to ensure safety, compliance, and efficient maintenance
            </p>
          </header>

          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">00</span>
              Introduction
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 text-white/90">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Clear labelling ensures circuits can be identified quickly for safety and maintenance</li>
                  <li>BS 7671 requires proper identification of all circuits and protective devices</li>
                  <li>Poor labelling can cause dangerous mistakes and costly downtime</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li><strong>Spot:</strong> Distribution board schedules, cable markers, colour coding</li>
                  <li><strong>Use:</strong> Label immediately after installation, follow BS 7671 conventions</li>
                  <li><strong>Check:</strong> Labels are legible, durable, and match circuit functions</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <Tag className="w-5 h-5 text-elec-yellow/80" />
              Learning Outcomes
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>Explain the purpose of labelling cables and circuits</li>
              <li>Identify common labelling conventions used on-site</li>
              <li>Recognise the risks of poor or missing labelling</li>
              <li>Apply best practices when labelling electrical systems</li>
              <li>Understand compliance requirements for labelling</li>
            </ul>
          </section>

          {/* Section 1 - Why Labelling Matters */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Why Labelling Matters
            </h2>
            <p className="text-white/80 mb-4 leading-relaxed">
              Proper labelling is fundamental to electrical safety and forms a critical part of professional installation practice:
            </p>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-white mb-2">Safety and Emergency Response</p>
                <ul className="text-white/70 ml-4 list-disc space-y-1 text-sm">
                  <li>Rapid identification of circuits during electrical emergencies</li>
                  <li>Prevents accidental energisation during maintenance work</li>
                  <li>Enables safe isolation for fault finding and repair</li>
                  <li>Supports emergency services in understanding electrical systems</li>
                  <li>Facilitates lockout/tagout procedures for safe working</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-blue-500/50">
                <p className="font-medium text-white mb-2">Compliance Requirements</p>
                <ul className="text-white/70 ml-4 list-disc space-y-1 text-sm">
                  <li>BS 7671 regulation 514 requires identification of protective devices</li>
                  <li>Each circuit must be clearly identified at the distribution board</li>
                  <li>Cable identification must be maintained throughout the installation</li>
                  <li>Circuit charts must be provided and kept up to date</li>
                  <li>Compliance with Electricity at Work Regulations 1989</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-green-500/50">
                <p className="font-medium text-white mb-2">Operational Efficiency</p>
                <ul className="text-white/70 ml-4 list-disc space-y-1 text-sm">
                  <li>Faster troubleshooting and repair times</li>
                  <li>Reduced downtime during maintenance activities</li>
                  <li>Easier system modifications and additions</li>
                  <li>Improved coordination between multiple trades</li>
                  <li>Simplified handover and commissioning processes</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm text-white/90"><strong className="text-red-400">Legal requirement:</strong> Proper labelling is not optional - it is a legal requirement under BS 7671 and essential for safety</p>
            </div>
          </section>

          <InlineCheck
            id="labelling-purpose-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          {/* Section 2 - Common Labelling Conventions */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Common Labelling Conventions
            </h2>
            <p className="text-white/80 mb-4 leading-relaxed">
              Standardised labelling conventions ensure consistency and understanding across all electrical installations:
            </p>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-white mb-2">Distribution Boards</p>
                <ul className="text-white/70 ml-4 list-disc space-y-1 text-sm">
                  <li>Circuit number and description (e.g., "L1 - Ground Floor Lighting")</li>
                  <li>Protective device type and rating (e.g., "16A MCB Type B")</li>
                  <li>Cable size and type (e.g., "2.5mm² T&E")</li>
                  <li>Area or zone served by the circuit</li>
                  <li>Special characteristics (emergency lighting, computer circuits, etc.)</li>
                  <li>RCD protection indication where applicable</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-blue-500/50">
                <p className="font-medium text-white mb-2">Cable Markers</p>
                <ul className="text-white/70 ml-4 list-disc space-y-1 text-sm">
                  <li>Heat-shrink sleeves for permanent, durable identification</li>
                  <li>Clip-on tags for easy application and modification</li>
                  <li>Self-adhesive printed labels for distribution boards</li>
                  <li>Cable markers at strategic points (joints, changes of direction)</li>
                  <li>Identification at both ends of cable runs</li>
                  <li>Weatherproof markers for external installations</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-purple-500/50">
                <p className="font-medium text-white mb-2">Colour Coding</p>
                <ul className="text-white/70 ml-4 list-disc space-y-1 text-sm">
                  <li>Single phase: Brown (line), Blue (neutral), Green/Yellow (earth)</li>
                  <li>Three phase: Brown (L1), Black (L2), Grey (L3), Blue (neutral)</li>
                  <li>DC circuits: Red (positive), Black (negative), Green/Yellow (earth)</li>
                  <li>Consistency throughout the installation</li>
                  <li>Clear identification where colour coding changes</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-green-500/50">
                <p className="font-medium text-white mb-2">Circuit Schedules</p>
                <ul className="text-white/70 ml-4 list-disc space-y-1 text-sm">
                  <li>Circuit number, description, and protective device details</li>
                  <li>Cable type, size, and installation method</li>
                  <li>Design current and maximum demand</li>
                  <li>Test results including earth fault loop impedance</li>
                  <li>Installation and testing dates with signatures</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm text-white/90"><strong className="text-blue-400">Consistency is key:</strong> Use the same labelling system throughout the installation for clarity and professional appearance</p>
            </div>
          </section>

          <InlineCheck
            id="labelling-standards-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          {/* Section 3 - Consequences of Poor Labelling */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Consequences of Poor Labelling
            </h2>
            <p className="text-white/80 mb-4 leading-relaxed">
              Inadequate or incorrect labelling can have serious safety, operational, and financial consequences:
            </p>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
                <p className="font-medium text-white mb-2">Safety Hazards</p>
                <ul className="text-white/70 ml-4 list-disc space-y-1 text-sm">
                  <li>Electric shock from working on live circuits due to incorrect isolation</li>
                  <li>Arc flash incidents from switching wrong protective devices</li>
                  <li>Injury from unexpected equipment operation during maintenance</li>
                  <li>Emergency response delays due to unclear circuit identification</li>
                  <li>Inability to safely isolate circuits during emergencies</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-orange-500/10 border-l-2 border-orange-500/50">
                <p className="font-medium text-white mb-2">Operational Impact</p>
                <ul className="text-white/70 ml-4 list-disc space-y-1 text-sm">
                  <li>Extended fault-finding times increasing labour costs</li>
                  <li>Production downtime from incorrect circuit isolation</li>
                  <li>Multiple trips to distribution boards to identify circuits</li>
                  <li>Confusion during handover to client or maintenance teams</li>
                  <li>Inefficient testing procedures without clear circuit references</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-amber-500/10 border-l-2 border-amber-500/50">
                <p className="font-medium text-white mb-2">Compliance Failures</p>
                <ul className="text-white/70 ml-4 list-disc space-y-1 text-sm">
                  <li>BS 7671 non-compliance leading to failed electrical inspections</li>
                  <li>Building Control rejection of electrical installation certificates</li>
                  <li>Insurance policy invalidation due to non-compliant installations</li>
                  <li>Health and Safety Executive enforcement action</li>
                  <li>Legal liability for accidents caused by poor labelling</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-3 rounded-lg bg-green-500/10 border border-green-500/30">
              <p className="text-sm text-white/90"><strong className="text-green-400">Prevention:</strong> Proper labelling from the start prevents all these issues and saves time and money in the long term</p>
            </div>
          </section>

          <InlineCheck
            id="distribution-board-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          {/* Real-World Scenario */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Real-World Scenario
            </h2>
            <div className="p-4 rounded-lg bg-amber-500/10 border-l-2 border-amber-500/50">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-white mb-2">Poor Labelling Causes Costly Downtime</h3>
                  <p className="text-white/80 text-sm mb-3">
                    On a large industrial project, multiple electricians are working on separate circuits from the same distribution board. Some circuits are not labelled, and another team accidentally isolates the wrong breaker during testing. This causes downtime across the site, costing thousands of pounds in lost productivity.
                  </p>
                  <div className="bg-amber-500/10 p-3 rounded-lg mb-3">
                    <p className="font-medium text-amber-400 text-sm mb-1">What went wrong:</p>
                    <ul className="text-white/70 list-disc ml-4 space-y-1 text-xs">
                      <li>Incomplete circuit labelling at distribution board</li>
                      <li>No circuit schedule available for reference</li>
                      <li>Poor communication between work teams</li>
                      <li>Assumption that unlabelled circuits were safe to isolate</li>
                    </ul>
                  </div>
                  <div className="bg-green-500/10 p-3 rounded-lg">
                    <p className="font-medium text-green-400 text-sm mb-1">Prevention measures:</p>
                    <ul className="text-white/70 list-disc ml-4 space-y-1 text-xs">
                      <li>Complete circuit labelling before energisation</li>
                      <li>Provide detailed circuit schedules at each distribution board</li>
                      <li>Implement permit-to-work systems for circuit isolation</li>
                      <li>Regular team briefings on isolation procedures</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
                <h4 className="font-medium text-white mb-2 text-sm">Faded Labels</h4>
                <p className="text-white/70 text-xs mb-2">
                  Paper labels in a plant room fade due to heat and humidity. During an emergency, maintenance staff cannot identify the correct circuit, leading to extended downtime.
                </p>
                <p className="text-red-400 text-xs font-medium">Solution: Use heat-resistant, durable labels</p>
              </div>
              <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
                <h4 className="font-medium text-white mb-2 text-sm">Inconsistent Numbering</h4>
                <p className="text-white/70 text-xs mb-2">
                  Different electricians use different numbering systems. Circuits cannot be matched between distribution boards and drawings, causing confusion.
                </p>
                <p className="text-red-400 text-xs font-medium">Solution: Establish clear labelling standards for all teams</p>
              </div>
            </div>
          </section>

          {/* Practical Guidance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <Target className="w-5 h-5 text-elec-yellow/80" />
              Practical Guidance
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
                <h3 className="font-medium text-white mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Best Practices
                </h3>
                <ul className="text-white/70 space-y-1 text-sm">
                  <li>• Label cables and circuits immediately after installation</li>
                  <li>• Use durable, legible labels resistant to heat and wear</li>
                  <li>• Cross-check labels with circuit charts before handover</li>
                  <li>• Keep distribution board schedules up to date</li>
                  <li>• Follow BS 7671 requirements for identification</li>
                  <li>• Apply labels at both ends of cable runs</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h3 className="font-medium text-white mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4 text-elec-yellow" />
                  Key Actions
                </h3>
                <ul className="text-white/70 space-y-1 text-sm">
                  <li>• Label all circuits and cables clearly</li>
                  <li>• Use BS 7671 colour codes and conventions</li>
                  <li>• Provide a circuit chart in each distribution board</li>
                  <li>• Use durable, heat-resistant labels</li>
                  <li>• Update labels and charts after modifications</li>
                  <li>• Verify label accuracy before energisation</li>
                </ul>
              </div>
            </div>

            {/* Labelling Materials Guide */}
            <div className="mb-6">
              <h3 className="font-medium text-white mb-4">Choosing the Right Labelling Materials</h3>
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="font-medium text-white mb-2 text-sm">Heat-Shrink Sleeves</h4>
                  <p className="text-green-400 text-xs font-medium mb-1">Best for:</p>
                  <ul className="text-white/70 list-disc ml-4 space-y-1 text-xs">
                    <li>Permanent cable identification</li>
                    <li>High-temperature environments</li>
                    <li>Industrial applications</li>
                  </ul>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="font-medium text-white mb-2 text-sm">Self-Adhesive Labels</h4>
                  <p className="text-green-400 text-xs font-medium mb-1">Best for:</p>
                  <ul className="text-white/70 list-disc ml-4 space-y-1 text-xs">
                    <li>Distribution board schedules</li>
                    <li>Panel identification</li>
                    <li>Professional appearance</li>
                  </ul>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="font-medium text-white mb-2 text-sm">Clip-On Tags</h4>
                  <p className="text-green-400 text-xs font-medium mb-1">Best for:</p>
                  <ul className="text-white/70 list-disc ml-4 space-y-1 text-xs">
                    <li>Temporary identification</li>
                    <li>Easy modification</li>
                    <li>Testing and commissioning</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Quality Control Checklist */}
            <div className="p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-green-500/10 border border-blue-500/20">
              <h3 className="font-medium text-white mb-3">Labelling Quality Control Checklist</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-white/90 font-medium text-sm mb-2">Before Energisation:</p>
                  <ul className="text-white/70 space-y-1 text-xs">
                    <li>☐ All circuits labelled at distribution board</li>
                    <li>☐ Cable identification at key points</li>
                    <li>☐ Circuit schedule completed and installed</li>
                    <li>☐ Colour coding verified throughout</li>
                  </ul>
                </div>
                <div>
                  <p className="text-white/90 font-medium text-sm mb-2">Final Handover:</p>
                  <ul className="text-white/70 space-y-1 text-xs">
                    <li>☐ Labels legible and secure</li>
                    <li>☐ Circuit details match test results</li>
                    <li>☐ Emergency isolation clearly marked</li>
                    <li>☐ Client briefed on labelling system</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Pocket Guide */}
          <section className="mb-10">
            <div className="p-5 rounded-lg bg-gradient-to-br from-elec-yellow/10 to-amber-600/5 border border-elec-yellow/30">
              <div className="flex items-center gap-3 mb-4">
                <Clipboard className="w-5 h-5 text-elec-yellow" />
                <h2 className="text-xl font-semibold text-white">Pocket Guide</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
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
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                  <h3 className="font-medium text-white mb-2">Q: {faq.question}</h3>
                  <p className="text-white/80 text-sm">A: {faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Recap */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <h2 className="text-xl font-semibold text-white">Recap</h2>
            </div>
            <p className="text-white/80 mb-4">
              In this subsection, you learned the importance of cable and circuit labelling conventions. You explored why clear labelling ensures safety, compliance, and efficiency, and how poor labelling can cause costly downtime and safety risks.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>Proper labelling is a legal requirement under BS 7671</li>
              <li>Use standard conventions for distribution boards, cable markers, and colour coding</li>
              <li>Poor labelling leads to safety hazards, downtime, and compliance failures</li>
              <li>Label immediately, use durable materials, and keep schedules updated</li>
            </ul>
          </section>

          {/* Quiz */}
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 mt-8 border-t border-white/10">
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../7-1">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Accurate Records
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../7-3">
                Next: Handover Information
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module5Section7_2;
