import useSEO from "@/hooks/useSEO";
import {
  ArrowLeft,
  Wrench,
  AlertTriangle,
  Factory,
  Home,
  Shield,
  Building,
  Target,
  Scissors,
  Settings,
  CheckCircle2,
  Zap,
  Hammer,
  Power,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import React from "react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const quickCheckQuestions = [
  {
    id: "sds-masonry",
    question: "Which drill type is best for heavy-duty masonry work?",
    options: [
      "Standard drill",
      "SDS drill",
      "Cordless drill",
    ],
    correctIndex: 1,
    explanation:
      "SDS drills provide superior hammer action and impact force specifically designed for drilling into concrete, stone, and brick materials.",
  },
  {
    id: "sds-advantage",
    question: "What is the main advantage of an SDS drill over a standard drill?",
    options: [
      "Lighter weight",
      "Higher impact force for masonry",
      "Lower cost",
    ],
    correctIndex: 1,
    explanation:
      "SDS drills deliver much higher impact force through their hammer action mechanism, making them far more effective for masonry drilling than standard drills.",
  },
  {
    id: "jigsaw-safety",
    question: "Name one safety measure when using a jigsaw.",
    options: [
      "Keep the blade running when not cutting",
      "Clamp the material securely before cutting",
      "Use any blade type for all materials",
    ],
    correctIndex: 1,
    explanation:
      "Securing the workpiece prevents it from moving during cutting, which could cause blade binding, poor cuts, or injury from flying debris.",
  },
  {
    id: "drill-inspection",
    question: "What should be checked before using any power tool?",
    options: [
      "Only the battery level",
      "Tool condition, cables, and damage",
      "Only the chuck mechanism",
    ],
    correctIndex: 1,
    explanation:
      "A complete inspection of the tool body, power cord, and overall condition is essential to identify potential safety hazards before use.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What does SDS stand for in SDS drills?",
    options: [
      "Super Drilling System",
      "Slotted Drive System",
      "Strong Drill Speed",
      "Safety Drill System",
    ],
    correctAnswer: 1,
    explanation:
      "SDS stands for Slotted Drive System, referring to the special chuck mechanism that allows quick bit changes and provides superior hammer action.",
  },
  {
    id: 2,
    question: "Which tool is best for cutting shapes in a sheet of plywood?",
    options: [
      "SDS drill",
      "Jigsaw",
      "Hammer drill",
      "Angle grinder",
    ],
    correctAnswer: 1,
    explanation:
      "Jigsaws are specifically designed for cutting curves, shapes, and intricate cuts in wood, making them ideal for plywood cutting tasks.",
  },
  {
    id: 3,
    question: "True or False: Standard drill bits can always be used in an SDS drill without an adaptor.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation:
      "False. SDS drills require SDS shank bits unless the drill has an interchangeable chuck adaptor for standard bits.",
  },
  {
    id: 4,
    question: "Name one feature of a standard drill.",
    options: [
      "Hammer action only",
      "Variable speed control",
      "SDS chuck system",
      "Reciprocating blade",
    ],
    correctAnswer: 1,
    explanation:
      "Standard drills typically feature variable speed control, forward/reverse action, and keyless or keyed chucks for general drilling tasks.",
  },
  {
    id: 5,
    question: "Why should you let an SDS drill do the work rather than applying excessive force?",
    options: [
      "It saves battery life",
      "It prevents damage to the bit and improves drilling efficiency",
      "It reduces noise",
      "It speeds up charging time",
    ],
    correctAnswer: 1,
    explanation:
      "Excessive force can damage the bit, reduce drilling efficiency, and cause premature wear. The hammer action is designed to do the work.",
  },
  {
    id: 6,
    question: "Give one safety check to perform before using a power tool.",
    options: [
      "Check for damage to the tool casing or power cord",
      "Ensure the battery is fully charged",
      "Clean the exterior surface",
      "Check the instruction manual",
    ],
    correctAnswer: 0,
    explanation:
      "Inspecting for damage to the tool, cord, or battery pack is essential to identify potential electrical or mechanical hazards before use.",
  },
  {
    id: 7,
    question: "What type of blade should be used in a jigsaw when cutting metal?",
    options: [
      "Wood blade",
      "Fine-tooth metal blade",
      "Carbide tile blade",
      "SDS shank",
    ],
    correctAnswer: 1,
    explanation:
      "Fine-tooth metal blades are specifically designed for cutting metal materials, providing clean cuts and preventing overheating.",
  },
  {
    id: 8,
    question: "Name one PPE item that should be worn when using a drill.",
    options: [
      "Hard hat",
      "Safety glasses",
      "High-vis vest",
      "Steel toe boots",
    ],
    correctAnswer: 1,
    explanation:
      "Safety glasses protect eyes from flying debris, dust, and particles that are commonly generated during drilling operations.",
  },
];

const Module3Section3_2: React.FC = () => {
  console.log("Module3Section3_2 component loaded");
  
  useSEO(
    "Common Power Tools (Drills, SDS, Jigsaws) – Module 3 (3.3.2)",
    "Complete guide to essential power tools for electrical work. Drills, SDS systems, jigsaws, applications and safety practices."
  );

  const faqs = [
    {
      q: "Can I use standard drill bits in an SDS drill?",
      a: "Only if the drill has an interchangeable chuck adaptor — otherwise SDS drills require SDS shank bits.",
    },
    {
      q: "Are cordless drills powerful enough for masonry?",
      a: "Yes, high-voltage cordless SDS drills can handle masonry, but battery life may be shorter on heavy-duty work.",
    },
    {
      q: "Do jigsaws cut metal?",
      a: "Yes, with the correct blade type, but cutting speed should be reduced to prevent overheating.",
    },
    {
      q: "How often should power tools be serviced?",
      a: "Follow manufacturer guidelines, typically annually for heavy use or when performance degrades noticeably.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3.3
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-card">
              <Power className="w-6 h-6 text-foreground" />
            </div>
            <Badge
              variant="outline"
              className="border-emerald-500/30 text-emerald-400"
            >
              Section 3.3.2
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Common Power Tools (Drills, SDS, Jigsaws)
          </h1>
          <p className="text-muted-foreground">
            Essential power tools for efficient electrical installation work and safe operation techniques.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">
            Introduction
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Standard drills: general purpose drilling in wood, plastic, light masonry.</li>
                <li>SDS drills: heavy-duty masonry work with superior hammer action.</li>
                <li>Jigsaws: cutting curves, shapes, and openings in various materials.</li>
                <li>Safety first: proper PPE, tool inspection, and correct technique essential.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>Spot:</strong> Variable speed triggers, SDS chuck systems, reciprocating blades.
                </li>
                <li>
                  <strong>Use:</strong> Match tool to material - SDS for concrete, jigsaw for curves.
                </li>
                <li>
                  <strong>Check:</strong> Cord condition, chuck tightness, blade sharpness, PPE requirements.
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">
            Learning outcomes
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-foreground">
            <li>Identify the main types of power tools used in electrical installation.</li>
            <li>Describe their typical applications and advantages.</li>
            <li>Apply correct handling and operational techniques.</li>
            <li>Recognise key safety considerations for each tool type.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Content</h2>

          {/* Standard Drills */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <Wrench className="w-5 h-5" /> Standard Drills
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-foreground">
              <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
                <p className="font-medium mb-2">Purpose & Applications</p>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-blue-200 mb-1">Primary Uses</p>
                    <ul className="list-disc pl-4 space-y-1 text-blue-200">
                      <li>General drilling for fixing holes in wood, plastic, and light masonry</li>
                      <li>Screw driving with appropriate bits</li>
                      <li>Hole preparation for cable routes in timber</li>
                      <li>Basic maintenance and assembly tasks</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-blue-200 mb-1">Key Features</p>
                    <ul className="list-disc pl-4 space-y-1 text-blue-200">
                      <li>Variable speed control for different materials</li>
                      <li>Forward/reverse action for drilling and screw removal</li>
                      <li>Keyless or keyed chucks for bit retention</li>
                      <li>Torque settings for controlled screw driving</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-blue-200 mb-1">Best Practice</p>
                    <ul className="list-disc pl-4 space-y-1 text-blue-200">
                      <li>Use sharp drill bits suitable for the material</li>
                      <li>Keep the drill aligned to avoid oval holes</li>
                      <li>Always secure the workpiece before drilling</li>
                      <li>Start at low speed to establish the hole location</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[0]} />
          <Separator className="my-6" />

          {/* SDS Drills */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <Hammer className="w-5 h-5" /> SDS (Slotted Drive System) Drills
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-foreground">
              <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
                <p className="font-medium mb-2">Heavy-Duty Masonry Drilling</p>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-red-200 mb-1">Purpose & Function</p>
                    <ul className="list-disc pl-4 space-y-1 text-red-200">
                      <li>Heavy-duty drilling in concrete, stone, and brick</li>
                      <li>Superior hammer action for rapid masonry penetration</li>
                      <li>Chiselling and light demolition work</li>
                      <li>Installing fixings in structural masonry</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-red-200 mb-1">Key Features</p>
                    <ul className="list-disc pl-4 space-y-1 text-red-200">
                      <li>SDS chuck system for quick bit changes without tools</li>
                      <li>Higher impact force than standard hammer drills</li>
                      <li>Multiple modes: drill, hammer drill, chisel</li>
                      <li>Vibration reduction systems on quality models</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-red-200 mb-1">Best Practice</p>
                    <ul className="list-disc pl-4 space-y-1 text-red-200">
                      <li>Use SDS-rated masonry bits only</li>
                      <li>Avoid applying excessive force — let the hammer action work</li>
                      <li>Maintain a firm grip with both hands to control torque</li>
                      <li>Clear debris regularly to prevent bit binding</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[1]} />
          <Separator className="my-6" />

          {/* Jigsaws */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <Scissors className="w-5 h-5" /> Jigsaws
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-foreground">
              <div className="rounded-lg p-4 bg-card border border-green-400/30">
                <p className="font-medium mb-2">Precision Cutting Tool</p>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-green-200 mb-1">Purpose & Applications</p>
                    <ul className="list-disc pl-4 space-y-1 text-green-200">
                      <li>Cutting curves, shapes, and openings in wood, plastic, and sheet metal</li>
                      <li>Creating access holes for cable entry</li>
                      <li>Trimming timber supports and backing boards</li>
                      <li>Cutting openings in panel boards and enclosures</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-green-200 mb-1">Key Features</p>
                    <ul className="list-disc pl-4 space-y-1 text-green-200">
                      <li>Reciprocating blade action for controlled cutting</li>
                      <li>Adjustable speed settings for different materials</li>
                      <li>Base plate angle adjustment for bevel cuts</li>
                      <li>Orbital action for faster cutting in wood</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-green-200 mb-1">Best Practice</p>
                    <ul className="list-disc pl-4 space-y-1 text-green-200">
                      <li>Use the correct blade type for the material</li>
                      <li>Clamp the material securely before cutting</li>
                      <li>Allow the blade to reach full speed before contact</li>
                      <li>Follow the cutting line steadily without forcing</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[2]} />
        </Card>

        {/* What this means on site */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Building className="w-5 h-5" /> What this means on site
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
              <p className="font-medium mb-2">Tool Selection Strategy</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Assess material type and thickness before selecting tool</li>
                <li>Consider access constraints and working space available</li>
                <li>Factor in noise restrictions and dust control requirements</li>
                <li>Plan power supply needs for corded tools or battery management</li>
              </ul>
            </div>
            <div className="rounded-lg p-4 bg-card border border-green-400/30">
              <p className="font-medium mb-2">Efficiency Benefits</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>SDS drills reduce masonry drilling time by 70-80% vs standard drills</li>
                <li>Proper tool selection prevents overheating and bit wear</li>
                <li>Quick-change systems minimise downtime between operations</li>
                <li>Quality cuts reduce finishing work and material waste</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Installation Practices */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5" /> Installation Practices
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-foreground">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-lg p-4 bg-card border border-amber-400/30">
                <p className="font-medium mb-2">Pre-Operation Checks</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Inspect tool body and cord for damage or wear</li>
                  <li>Check chuck tightness and bit security</li>
                  <li>Verify appropriate blade/bit for material</li>
                  <li>Ensure adequate lighting and stable work surface</li>
                </ul>
              </div>
              <div className="rounded-lg p-4 bg-card border border-cyan-400/30">
                <p className="font-medium mb-2">Operational Techniques</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Maintain firm two-handed grip for control</li>
                  <li>Allow tools to reach operating speed before contact</li>
                  <li>Apply steady pressure without forcing</li>
                  <li>Clear debris regularly to prevent overheating</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Common Mistakes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-emerald-400" /> Common Mistakes
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
              <p className="font-medium mb-2 text-emerald-400">Dangerous Practices</p>
              <ul className="list-disc pl-6 space-y-1 text-red-200">
                <li><strong>Using damaged tools</strong> - Risk of electric shock, injury, or tool failure</li>
                <li><strong>Wrong blade/bit selection</strong> - Tool damage, poor results, safety hazards</li>
                <li><strong>Inadequate workpiece securing</strong> - Material movement causing injury or damage</li>
                <li><strong>Forcing tools beyond capacity</strong> - Overheating, premature wear, potential failure</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
              <p className="font-medium mb-2 text-emerald-400">Efficiency Issues</p>
              <ul className="list-disc pl-6 space-y-1 text-orange-200">
                <li><strong>Standard drill for masonry</strong> - Slow progress, overheating, bit wear</li>
                <li><strong>Dull blades/bits</strong> - Increased effort, poor finish, potential binding</li>
                <li><strong>Incorrect speed settings</strong> - Material damage or inefficient cutting</li>
                <li><strong>Poor workpiece support</strong> - Vibration, inaccurate cuts, surface damage</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* BS 7671 Context */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5" /> BS 7671 Context
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-foreground">
            <div className="rounded-lg p-4 bg-indigo-500/10 border border-indigo-400/30">
              <p className="font-medium mb-2">Installation Quality Requirements</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Section 134:</strong> Good workmanship and proper materials required</li>
                <li><strong>Section 522:</strong> Cable routes must not damage cable integrity</li>
                <li><strong>Section 528:</strong> Proximity to other services and structural elements</li>
                <li><strong>Section 543:</strong> Protective conductor integrity during installation</li>
              </ul>
            </div>
            <div className="rounded-lg p-4 bg-violet-500/10 border border-violet-400/30">
              <p className="font-medium mb-2">Compliance Considerations</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Clean, accurate holes prevent cable damage during installation</li>
                <li>Proper fixing holes ensure secure mounting of electrical equipment</li>
                <li>Precise cuts in containment maintain protective properties</li>
                <li>Quality workmanship reflects competency requirements</li>
              </ul>
            </div>
          </div>
        </Card>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Real-world Scenario */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Factory className="w-5 h-5" /> Real-world Scenario
          </h2>
          <div className="rounded-lg p-3 sm:p-4 bg-card border border-slate-400/30">
            <p className="font-medium mb-2">Scenario: Commercial Rewire Tool Selection</p>
            <p className="text-sm mb-4">
              During a commercial rewire, an electrician attempted to drill 16mm holes for conduit fixings in reinforced concrete 
              using a standard hammer drill. The bit overheated and progress was slow. Switching to an SDS drill reduced drilling 
              time from 2 minutes per hole to under 20 seconds, saving hours on the job.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-green-300 mb-1">Lessons Learned</p>
                <ul className="list-disc pl-4 space-y-1 text-green-200">
                  <li>Tool selection dramatically affects productivity</li>
                  <li>Right tool prevents overheating and bit damage</li>
                  <li>Time savings justify tool investment</li>
                  <li>Quality results improve professional reputation</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-emerald-400 mb-1">Best Practice Applied</p>
                <ul className="list-disc pl-4 space-y-1 text-blue-200">
                  <li>Assess material before starting work</li>
                  <li>Use SDS drills for all masonry work</li>
                  <li>Plan tool requirements in advance</li>
                  <li>Monitor progress and adjust approach</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index}>
                <p className="font-medium text-foreground mb-1">{faq.q}</p>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
                {index < faqs.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Summary</h2>
          <div className="space-y-4 text-xs sm:text-sm text-foreground">
            <p>
              Drills, SDS drills, and jigsaws are key power tools in electrical installation. Choosing the right tool for the task 
              improves efficiency and safety. Correct handling, PPE use, and regular tool checks are essential for professional results.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-lg p-4 bg-card border border-green-400/30">
                <p className="font-medium text-green-300 mb-2">Key Benefits</p>
                <ul className="list-disc pl-4 space-y-1 text-green-200">
                  <li>Dramatic productivity improvements with right tool selection</li>
                  <li>Professional finish quality with proper techniques</li>
                  <li>Reduced material waste and rework</li>
                  <li>Enhanced safety through correct operation</li>
                </ul>
              </div>
              <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
                <p className="font-medium text-emerald-400 mb-2">Essential Points</p>
                <ul className="list-disc pl-4 space-y-1 text-blue-200">
                  <li>SDS drills essential for any masonry work</li>
                  <li>Blade/bit selection critical for results</li>
                  <li>Safety inspection before every use</li>
                  <li>Proper technique prevents tool damage</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Apprentice Do's and Don'ts */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Target className="w-5 h-5" /> Apprentice Do's and Don'ts
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="rounded-lg p-4 bg-card border border-green-400/30">
              <p className="font-medium text-green-300 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> DO
              </p>
              <ul className="space-y-2 text-sm text-green-200">
                <li>✓ Use SDS drills for all masonry drilling</li>
                <li>✓ Inspect tools before each use</li>
                <li>✓ Secure workpieces before cutting or drilling</li>
                <li>✓ Wear appropriate PPE for each tool</li>
                <li>✓ Let tools reach full speed before contact</li>
                <li>✓ Use correct blades/bits for materials</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
              <p className="font-medium text-emerald-400 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> DON'T
              </p>
              <ul className="space-y-2 text-sm text-red-200">
                <li>✗ Use standard drills for heavy masonry work</li>
                <li>✗ Force tools beyond their design capacity</li>
                <li>✗ Use damaged or worn blades/bits</li>
                <li>✗ Skip safety equipment to save time</li>
                <li>✗ Leave tools connected when changing accessories</li>
                <li>✗ Ignore manufacturer operating guidelines</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Pocket Card Quick Reference */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">
            Pocket Card Quick Reference
          </h2>
          <div className="rounded-lg p-3 sm:p-4 bg-card border border-slate-400/30 text-sm">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium mb-2">Tool Selection Guide</p>
                <ul className="space-y-1">
                  <li>• <strong>Wood/Plastic:</strong> Standard drill</li>
                  <li>• <strong>Light Masonry:</strong> Hammer drill</li>
                  <li>• <strong>Heavy Masonry:</strong> SDS drill</li>
                  <li>• <strong>Curved Cuts:</strong> Jigsaw</li>
                  <li>• <strong>Openings:</strong> Jigsaw or hole saw</li>
                  <li>• <strong>Metal Cutting:</strong> Fine-tooth blade</li>
                </ul>
              </div>
              <div>
                <p className="font-medium mb-2">Safety Checklist</p>
                <ul className="space-y-1">
                  <li>• Safety glasses always required</li>
                  <li>• Ear protection for extended use</li>
                  <li>• Dust mask for masonry drilling</li>
                  <li>• Inspect cord and chuck before use</li>
                  <li>• Secure workpiece firmly</li>
                  <li>• Disconnect power when changing accessories</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Key References */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Key References</h2>
          <div className="text-xs sm:text-sm text-foreground space-y-2">
            <p><strong>BS 7671:</strong> IET Wiring Regulations (18th Edition)</p>
            <p><strong>HSE INDG174:</strong> Safe use of portable electrical appliances</p>
            <p><strong>BS EN 62841:</strong> Electric motor-operated hand-held tools</p>
            <p><strong>PUWER 1998:</strong> Provision and Use of Work Equipment Regulations</p>
          </div>
        </Card>

        {/* Quiz */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">
            Knowledge Check
          </h2>
          <Quiz questions={quizQuestions} />
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" asChild>
            <Link to="../3-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Essential Hand Tools
            </Link>
          </Button>
          <Button asChild>
            <Link to="../3-3">
              Next: Measuring Tools
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module3Section3_2;