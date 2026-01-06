import { ArrowLeft, ArrowRight, Lightbulb, Target, CheckCircle, AlertTriangle, Users, BookOpen, Clipboard, Shield, Eye, HelpCircle, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Interpreting Floorplans and Circuit Layouts - Module 5.1.4 | Level 2 Electrical Course";
const DESCRIPTION = "Learn to read electrical floorplans, circuit layouts, and cable routes. Master safe cable zones and accurate positioning for compliant electrical installations.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "What do floorplans show in electrical drawings?",
    options: ["Only the building structure", "Building layout with positions of electrical equipment", "Just the electrical circuits", "Cable sizes and ratings"],
    correctIndex: 1,
    explanation: "Floorplans show the building layout with the positions of all electrical equipment, accessories, and containment systems."
  },
  {
    id: 2,
    question: "Why should electrical layouts be cross-checked on-site?",
    options: ["It's not necessary", "Buildings may differ from drawings", "To waste time", "Because drawings are always wrong"],
    correctIndex: 1,
    explanation: "Buildings may differ slightly from drawings due to construction variations, making on-site verification essential for accurate installation."
  },
  {
    id: 3,
    question: "What is the risk of ignoring safe cable zones?",
    options: ["No risk at all", "Accidental damage and safety hazards", "Better cable runs", "Easier installation"],
    correctIndex: 1,
    explanation: "Ignoring safe cable zones increases the risk of accidental damage from drilling or fixing, creating safety hazards and potential failures."
  }
];

const Module5Section1_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What do floorplans show in electrical drawings?",
      options: [
        "Only the building structure",
        "Building layout with positions of electrical equipment",
        "Just the electrical circuits",
        "Cable sizes and ratings"
      ],
      correctAnswer: 1,
      explanation: "Floorplans show the building layout with the positions of all electrical equipment, accessories, and containment systems."
    },
    {
      id: 2,
      question: "What do circuit layouts show?",
      options: [
        "Building structure only",
        "How accessories connect to distribution boards",
        "Cable colours",
        "Installation costs"
      ],
      correctAnswer: 1,
      explanation: "Circuit layouts show how electrical accessories and equipment connect back to distribution boards and how circuits are organised."
    },
    {
      id: 3,
      question: "What is often used to identify circuits?",
      options: [
        "Colours only",
        "Circuit numbers or codes",
        "Arrow directions",
        "Line thickness"
      ],
      correctAnswer: 1,
      explanation: "Circuit numbers or codes (like L1/01) are used to identify and track individual circuits throughout the installation."
    },
    {
      id: 4,
      question: "True or False: Cable routes can run anywhere if protected.",
      options: [
        "True",
        "False"
      ],
      correctAnswer: 1,
      explanation: "False. Cable routes must follow designated safe zones to reduce the risk of accidental damage and comply with BS 7671 regulations."
    },
    {
      id: 5,
      question: "Why should electrical layouts be cross-checked on-site?",
      options: [
        "It's not necessary",
        "Buildings may differ from drawings",
        "To waste time",
        "Because drawings are always wrong"
      ],
      correctAnswer: 1,
      explanation: "Buildings may differ slightly from drawings due to construction variations, making on-site verification essential for accurate installation."
    },
    {
      id: 6,
      question: "What do arrows on cable route drawings usually represent?",
      options: [
        "Wind direction",
        "Direction of cable runs",
        "North direction",
        "Traffic flow"
      ],
      correctAnswer: 1,
      explanation: "Arrows indicate the direction of cable runs and the routing path that cables should follow through the building."
    },
    {
      id: 7,
      question: "Who should confirm changes if the plan does not match the site?",
      options: [
        "Another apprentice",
        "The client directly",
        "The site supervisor",
        "Nobody, just improvise"
      ],
      correctAnswer: 2,
      explanation: "Always consult the site supervisor when there are discrepancies between drawings and actual site conditions."
    },
    {
      id: 8,
      question: "What is the risk of ignoring safe cable zones?",
      options: [
        "No risk at all",
        "Accidental damage and safety hazards",
        "Better cable runs",
        "Easier installation"
      ],
      correctAnswer: 1,
      explanation: "Ignoring safe cable zones increases the risk of accidental damage from drilling or fixing, creating safety hazards and potential failures."
    },
    {
      id: 9,
      question: "What must electricians do before transferring positions to site?",
      options: [
        "Start installing immediately",
        "Measure and check against the drawing",
        "Guess the positions",
        "Ask the client"
      ],
      correctAnswer: 1,
      explanation: "Always measure and check positions against the drawing to ensure accurate placement of electrical equipment and accessories."
    },
    {
      id: 10,
      question: "Which document might include cable sizes if not shown on the layout?",
      options: [
        "The building permit",
        "The specification",
        "The invoice",
        "The health and safety file"
      ],
      correctAnswer: 1,
      explanation: "The specification document typically contains detailed technical information like cable sizes, ratings, and installation methods when not shown on layout drawings."
    }
  ];

  const faqs = [
    {
      question: "How do I know if my measurements are accurate?",
      answer: "Always double-check measurements using the scale and given dimensions on the drawing. Use running dimensions where provided and verify critical positions with a supervisor."
    },
    {
      question: "What should I do if the building doesn't match the drawing?",
      answer: "Stop work immediately and consult your supervisor. Document the differences with photos and measurements, and obtain written approval before proceeding with any changes."
    },
    {
      question: "Are cable routes shown on all electrical drawings?",
      answer: "Not always. Some drawings show general routes while others provide detailed cable paths. Check if there are separate cable route drawings or containment layouts for your project."
    },
    {
      question: "How do I coordinate with other trades when setting out?",
      answer: "Attend coordination meetings, check for service clashes before installation, and communicate any positioning concerns early. Mark out your work clearly to avoid conflicts."
    },
    {
      question: "What if I find cables in areas not shown on the drawing?",
      answer: "Existing installations may not be shown on new work drawings. Always use cable detection equipment and treat any found cables as live until proven otherwise. Inform your supervisor immediately."
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
              Back to Section 1
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
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 5.1.4
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Interpreting Floorplans, Circuit Layouts, and Cable Routes
          </h1>
          <p className="text-white">
            Master the interpretation of building-integrated electrical drawings for accurate and safe installation work.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Electrical installations must integrate with building structures using floorplans.</li>
                <li>Circuit layouts show equipment positions, cable routes, and connections.</li>
                <li>Always follow safe cable zones and verify site conditions match drawings.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Equipment positions, circuit numbers, cable routes, safe zones.</li>
                <li><strong>Use:</strong> Measurements for positioning, circuit codes for identification.</li>
                <li><strong>Check:</strong> Site conditions, other services, coordinate with trades.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-base text-white">
            <li>Read and interpret electrical floorplans effectively.</li>
            <li>Understand circuit layouts and their numbering systems.</li>
            <li>Identify cable routes and containment pathways.</li>
            <li>Apply this knowledge to set out installations accurately on-site.</li>
          </ul>
        </Card>

        {/* Content Cards */}
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
                Understanding Floorplans
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Building structure integration:</strong> Show how electrical equipment fits within the physical building</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Equipment locations:</strong> Precise positions of switches, sockets, lights, and distribution boards</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Containment runs:</strong> Routes for trunking, conduit, and cable management systems</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Architectural coordination:</strong> Integration with doors, windows, and structural elements</span>
                </div>
              </div>

              <div className="bg-emerald-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="font-medium text-blue-900 dark:text-blue-100">
                  Floorplans are the bridge between electrical design and physical installation, showing exactly 
                  where everything should be positioned within the building structure.
                </p>
              </div>

              <InlineCheck 
                id="floorplan-check"
                question="What do electrical floorplans show?"
                options={[
                  "Only building structure",
                  "Building structure with precise positions of electrical equipment",
                  "Just cable specifications",
                  "Only architectural features"
                ]}
                correctIndex={1}
                explanation="Floorplans show the building structure with precise positions of electrical equipment, accessories, and containment systems integrated with architectural features."
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
                Circuit Layouts and Numbering
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <p><strong>Connection mapping:</strong> Shows how accessories connect back to distribution boards</p>
                <p><strong>Circuit identification:</strong> Each circuit has unique numbers or codes (e.g., L1/01, L2/03)</p>
                <p><strong>Load distribution:</strong> How electrical loads are balanced across circuits</p>
                <p><strong>Protection coordination:</strong> Links to MCBs, RCDs, and other protective devices</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-[#121212]/30 p-3 rounded-lg">
                  <h4 className="font-semibold mb-2">Circuit Coding Examples:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>L1/01 - Lighting circuit 1</li>
                    <li>L2/02 - Lighting circuit 2</li>
                    <li>P1/03 - Power circuit 1</li>
                    <li>P2/04 - Power circuit 2</li>
                  </ul>
                </div>
                <div className="bg-gray-50 dark:bg-[#121212]/30 p-3 rounded-lg">
                  <h4 className="font-semibold mb-2">Layout Information:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>Circuit routes and paths</li>
                    <li>Junction box locations</li>
                    <li>Switch drop positions</li>
                    <li>Cable core identification</li>
                  </ul>
                </div>
              </div>

              <InlineCheck 
                id="circuit-identification-check"
                question="How are individual circuits typically identified on layout drawings?"
                options={[
                  "By cable colour only",
                  "Using circuit numbers or codes like L1/01",
                  "By line thickness",
                  "Random numbering"
                ]}
                correctIndex={1}
                explanation="Circuit numbers or codes like L1/01 for lighting circuits or P1/03 for power circuits allow clear tracking throughout the installation."
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</span>
                Cable Routes and Safe Zones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded-lg border border-red-200 dark:border-red-800">
                <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Critical Safety Requirements
                </h4>
                <div className="space-y-2 text-red-800 dark:text-red-200">
                  <p>• Cable routes must follow designated safe zones</p>
                  <p>• Vertical and horizontal routes must comply with BS 7671</p>
                  <p>• Proper protection required outside safe zones</p>
                  <p>• Coordination with other services essential</p>
                </div>
              </div>

              <div className="space-y-3">
                <p><strong>Route marking:</strong> Lines, arrows, or symbols show cable pathways</p>
                <p><strong>Safe zone compliance:</strong> 150mm from corners, 50mm from ceiling/floor edges</p>
                <p><strong>Containment integration:</strong> Routes through trunking, conduit, or cable trays</p>
                <p><strong>Access considerations:</strong> Maintenance and future modifications</p>
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-lg border border-emerald-200 dark:border-emerald-800">
                <h4 className="font-semibold text-emerald-900 dark:text-emerald-100 mb-2 flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Spot it / Use it
                </h4>
                <p className="text-emerald-800 dark:text-emerald-200">
                  Always trace cable routes on drawings before starting installation. Look for arrows, routing 
                  symbols, and containment indicators to understand the complete cable path.
                </p>
              </div>

              <InlineCheck 
                id="safe-zones-check"
                question="Why must cable routes follow safe zones?"
                options={[
                  "To make installation easier",
                  "To reduce risk of damage and comply with BS 7671",
                  "They don't need to follow safe zones",
                  "For aesthetic reasons only"
                ]}
                correctIndex={1}
                explanation="Safe zones reduce the risk of accidental damage from drilling or fixing operations and ensure compliance with BS 7671 safety regulations."
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</span>
                Practical Site Application
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <p><strong>Position transfer:</strong> Use measurements to accurately locate equipment on-site</p>
                <p><strong>Verification process:</strong> Check that building matches drawing dimensions</p>
                <p><strong>Trade coordination:</strong> Confirm positions don't clash with other services</p>
                <p><strong>Quality control:</strong> Mark out positions before fixing or cutting</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-primary">Setting Out Process:</h4>
                  <ol className="list-decimal pl-6 space-y-1">
                    <li>Establish reference points</li>
                    <li>Take measurements from drawings</li>
                    <li>Mark positions temporarily</li>
                    <li>Verify with supervisor</li>
                    <li>Proceed with installation</li>
                  </ol>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-primary">Common Checks:</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Wall thickness variations</li>
                    <li>Structural beam positions</li>
                    <li>Service pipe locations</li>
                    <li>Door and window alignment</li>
                  </ul>
                </div>
              </div>

              <InlineCheck 
                id="site-conditions-check"
                question="What should be done if site conditions don't match the drawing?"
                options={[
                  "Make changes immediately",
                  "Ignore the differences",
                  "Raise the issue with the site supervisor",
                  "Guess what to do"
                ]}
                correctIndex={2}
                explanation="Always raise issues with the site supervisor or project manager before making any changes to ensure proper authorisation and documentation."
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">5</span>
                Cross-Trade Coordination
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <p><strong>Service integration:</strong> Coordinate with plumbing, HVAC, and data installations</p>
                <p><strong>Structural awareness:</strong> Avoid drilling into load-bearing elements</p>
                <p><strong>Access requirements:</strong> Ensure other trades can reach their equipment</p>
                <p><strong>Installation sequence:</strong> Plan work order with other contractors</p>
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">Coordination Benefits:</h4>
                <ul className="list-disc pl-6 space-y-1 text-amber-800 dark:text-amber-200">
                  <li>Prevents costly clashes and rework</li>
                  <li>Ensures efficient use of space</li>
                  <li>Maintains project timelines</li>
                  <li>Improves overall installation quality</li>
                </ul>
              </div>

              <InlineCheck 
                id="coordination-check"
                question="Why is coordination with other trades essential?"
                options={[
                  "It's not really necessary",
                  "To prevent clashes and ensure quality",
                  "Only for large projects",
                  "Just for final inspections"
                ]}
                correctIndex={1}
                explanation="Coordination prevents service clashes, ensures efficient space utilisation, maintains project timelines, and achieves high-quality integrated building services."
              />
            </CardContent>
          </Card>
        </div>

        {/* Real-World Example */}
        <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-900 dark:text-amber-100">
              <Users className="w-5 h-5" />
              Real-World Example
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-amber-800 dark:text-amber-200">
              <p className="font-medium">Housing Development Safe Zone Violation</p>
              <p>
                In a new housing project, cables were run outside of designated safe zones shown in the drawings. 
                The installation appeared correct initially, but during second fix work, a joiner's drill bit hit 
                a hidden cable while installing kitchen units.
              </p>
              
              <div className="bg-amber-100 dark:bg-amber-900/50 p-3 rounded-lg border border-amber-300 dark:border-amber-700">
                <p className="font-medium mb-2">Consequences:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Complete circuit failure affecting multiple rooms</li>
                  <li>Emergency electrician call-out costs</li>
                  <li>Kitchen installation delays</li>
                  <li>Wall damage requiring redecoration</li>
                  <li>Potential safety hazard from damaged cable</li>
                </ul>
              </div>
              
              <p className="font-medium">
                Total cost: £850 in repairs, delays, and remedial work. This could have been prevented by 
                following the safe zone routes clearly marked on the installation drawings.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* FAQs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5" />
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <p className="font-semibold">Q: Do circuit layouts always show cable sizes?</p>
                <p className="text-white">A: Not always — cable sizes and ratings are often detailed in the specification document rather than cluttering the layout drawings.</p>
              </div>
              <div>
                <p className="font-semibold">Q: What if the floorplan doesn't match the building?</p>
                <p className="text-white">A: Raise the issue immediately with the site supervisor. Never make assumptions or changes without proper authorization.</p>
              </div>
              <div>
                <p className="font-semibold">Q: How accurate should position measurements be?</p>
                <p className="text-white">A: Follow drawing dimensions precisely. Typical accuracy should be within ±5mm for critical positions like switch heights and socket spacing.</p>
              </div>
              <div>
                <p className="font-semibold">Q: Can I run cables outside safe zones if protected?</p>
                <p className="text-white">A: Protection may be required outside safe zones, but always follow BS 7671 requirements and get approval for any deviations from planned routes.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pocket Guide */}
        <Card className="border-green-200 bg-green-50 dark:bg-green-950/30 dark:border-green-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-900 dark:text-green-100">
              <Book className="w-5 h-5" />
              Pocket Guide: Floorplan Interpretation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-green-800 dark:text-green-200">
              <div className="space-y-2">
                <p>✓ Always match drawings to site conditions</p>
                <p>✓ Use safe zones for all cable routes</p>
                <p>✓ Follow circuit numbers carefully</p>
                <p>✓ Coordinate with other trades</p>
              </div>
              <div className="space-y-2">
                <p>✓ Take accurate measurements before fixing</p>
                <p>✓ Mark positions temporarily first</p>
                <p>✓ Confirm discrepancies with supervisor</p>
                <p>✓ Document any agreed changes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recap */}
        <Card>
          <CardHeader>
            <CardTitle>Recap</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">In this subsection, you learned:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>How to interpret floorplans, circuit layouts, and cable routes</li>
              <li>The critical role of safe zones in protecting cables</li>
              <li>The importance of accurate measurements and site verification</li>
              <li>Coordination requirements with other building trades</li>
              <li>Practical application techniques for setting out installations</li>
            </ul>
            <p className="mt-4 font-medium text-primary">
              Accurate interpretation of floorplans and layouts ensures safe, compliant, and well-coordinated electrical installations.
            </p>
          </CardContent>
        </Card>

        {/* Quiz */}
        <Quiz questions={quizQuestions} />

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8">
          <Link to="../1-3">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <Link to="..">
            <Button>
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Module5Section1_4;