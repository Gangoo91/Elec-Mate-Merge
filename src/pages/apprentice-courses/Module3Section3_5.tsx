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
  Activity,
  Search,
  Truck,
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
    id: "battery-removal",
    question: "Why should power tool batteries be removed before transport?",
    options: [
      "To reduce weight",
      "To prevent accidental operation and damage",
      "To save battery charge",
    ],
    correctIndex: 1,
    explanation:
      "Removing batteries prevents accidental activation during transport, which could cause injury or damage to the tool or surrounding items.",
  },
  {
    id: "height-safety",
    question: "Name one method of preventing tools from falling when working at height.",
    options: [
      "Work faster to finish quickly",
      "Use tool lanyards or belts",
      "Only use lightweight tools",
    ],
    correctIndex: 1,
    explanation:
      "Tool lanyards and belts secure tools to the worker, preventing them from falling and potentially injuring people below.",
  },
  {
    id: "insulated-storage",
    question: "Give one reason why insulated tools should be stored separately.",
    options: [
      "They cost more money",
      "To prevent confusion and misuse",
      "They take up more space",
    ],
    correctIndex: 1,
    explanation:
      "Separate storage prevents confusion between insulated and non-insulated tools, ensuring the right tool is used for electrical work.",
  },
  {
    id: "transport-inspection",
    question: "What should be done before using tools after transport?",
    options: [
      "Polish them clean",
      "Inspect for transport-related damage",
      "Test the weight",
    ],
    correctIndex: 1,
    explanation:
      "Tools should be inspected after transport to identify any damage that may have occurred during movement before use.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "Why is it important to choose the right tool for the job?",
    options: [
      "It makes the job look more professional",
      "It reduces wear on the tool and prevents accidents",
      "It speeds up the job every time",
      "It avoids having to read instructions",
    ],
    correctAnswer: 1,
    explanation:
      "Using the right tool reduces wear, prevents damage, and significantly reduces the risk of accidents caused by tool misuse.",
  },
  {
    id: 2,
    question: "Which PPE might be required when using power tools?",
    options: [
      "Hard hat, gloves, and boots only",
      "Safety glasses, gloves, hearing protection, dust mask (depending on the tool)",
      "High-vis vest only",
      "No PPE is needed for small tools",
    ],
    correctAnswer: 1,
    explanation:
      "PPE requirements vary by tool and task, but commonly include safety glasses, gloves, hearing protection, and dust masks depending on the specific tool and application.",
  },
  {
    id: 3,
    question: "True or False: It's safe to carry a screwdriver in your pocket with the point exposed.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation:
      "False. Sharp tools should never be carried loose in pockets as they can cause injury. Always use protective covers or proper tool storage.",
  },
  {
    id: 4,
    question: "Give one method of securing tools during vehicle transport.",
    options: [
      "Leave them loose in the vehicle",
      "Use toolboxes or tie-down straps",
      "Put them on the dashboard",
      "Hold them while driving",
    ],
    correctAnswer: 1,
    explanation:
      "Toolboxes, tie-down straps, or secure storage compartments prevent tools from moving during transport, avoiding damage and injury.",
  },
  {
    id: 5,
    question: "Why should insulated tools be stored separately from non-insulated tools?",
    options: [
      "To keep them looking new",
      "To prevent confusion and misuse",
      "To avoid rust",
      "To save space",
    ],
    correctAnswer: 1,
    explanation:
      "Separate storage prevents accidental use of non-insulated tools for electrical work, which could result in electric shock.",
  },
  {
    id: 6,
    question: "What's the main reason for using tool lanyards when working at height?",
    options: [
      "To speed up work",
      "To prevent tools from falling and injuring people",
      "To identify tools easily",
      "To stop theft",
    ],
    correctAnswer: 1,
    explanation:
      "Tool lanyards prevent dropped tools from falling and potentially causing serious injury to people working below.",
  },
  {
    id: 7,
    question: "Name one risk of improper tool storage.",
    options: [
      "Tools become more expensive",
      "Corrosion, theft, or tool damage",
      "Tools become heavier",
      "Tools change colour",
    ],
    correctAnswer: 1,
    explanation:
      "Improper storage can lead to corrosion from moisture, theft from poor security, or damage from tools knocking together.",
  },
  {
    id: 8,
    question: "What should be done before using tools after transport?",
    options: [
      "Apply new labels",
      "Inspect them for any transport-related damage",
      "Weigh them",
      "Change the batteries",
    ],
    correctAnswer: 1,
    explanation:
      "Post-transport inspection ensures any damage that occurred during movement is identified before use, preventing accidents.",
  },
];

const Module3Section3_5: React.FC = () => {
  console.log("Module3Section3_5 component loaded");
  
  useSEO(
    "Safe Use, Transport, and Storage of Tools – Module 3 (3.3.5)",
    "Complete guide to safe tool handling, transport methods and storage practices. PPE requirements and workplace safety compliance."
  );

  const faqs = [
    {
      q: "Can tools be left on a scaffold platform if no one is working there?",
      a: "No — tools should be removed or secured to prevent falling hazards. Even when work areas are unoccupied, unsecured tools pose risks.",
    },
    {
      q: "Is it safe to store power tools in a vehicle overnight?",
      a: "Only if they are secured against theft and environmental damage. Extreme cold can harm batteries and moisture can damage electrical components.",
    },
    {
      q: "Do I need to store PPE with my tools?",
      a: "It's good practice to store PPE nearby, but PPE should be kept clean and dry, so it's often stored separately from oily or dusty tools.",
    },
    {
      q: "What should I do if a tool is damaged during transport?",
      a: "Remove it from service immediately, tag it as defective, and arrange for proper repair or replacement before use.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button
            variant="ghost"
            className="text-white hover:text-white active:text-white p-0 -ml-1"
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
            <div className="p-2 rounded-lg ">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <Badge
              variant="outline"
              className="border-elec-yellow/30 text-elec-yellow"
            >
              Section 3.3.5
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Safe Use, Transport, and Storage of Tools
          </h1>
          <p className="text-white">
            Essential practices for safe tool handling, transport methods and storage to prevent injury and extend tool life.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">
            Introduction
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Safe use: right tool, right PPE, follow instructions, stable position.</li>
                <li>Transport: secured in boxes, batteries removed, covers on sharp tools.</li>
                <li>Storage: dry, organised, separate insulated tools, easy access.</li>
                <li>Height work: tool lanyards essential, never leave tools unsecured.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>Spot:</strong> Loose tools, missing covers, mixed storage, unsafe carrying.
                </li>
                <li>
                  <strong>Use:</strong> Proper containers, lanyards at height, organised storage systems.
                </li>
                <li>
                  <strong>Check:</strong> PPE requirements, transport security, post-move inspection.
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">
            Learning outcomes
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
            <li>Apply safe handling practices when using hand and power tools.</li>
            <li>Describe correct transport methods to prevent tool damage and injury.</li>
            <li>Explain how proper storage helps maintain tool condition and safety.</li>
            <li>Identify PPE requirements for tool operation.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content</h2>

          {/* Safe Use */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5" /> Safe Use of Tools
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-white">
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <p className="font-medium mb-2">Operational Safety Principles</p>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-blue-200 mb-1">Pre-Use Preparation</p>
                    <ul className="list-disc pl-4 space-y-1 text-blue-200">
                      <li>Always follow manufacturer's instructions for operation</li>
                      <li>Select the right tool for the job - avoid improvisation</li>
                      <li>Ensure adequate lighting and clear work area</li>
                      <li>Check tool condition before each use</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-blue-200 mb-1">PPE Requirements</p>
                    <ul className="list-disc pl-4 space-y-1 text-blue-200">
                      <li>Safety glasses for all cutting and drilling operations</li>
                      <li>Gloves appropriate for the tool and material</li>
                      <li>Hearing protection for extended power tool use</li>
                      <li>Dust masks for operations generating particles</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-blue-200 mb-1">Safe Operation</p>
                    <ul className="list-disc pl-4 space-y-1 text-blue-200">
                      <li>Maintain firm, stable position to avoid slips</li>
                      <li>Disconnect power before changing bits or blades</li>
                      <li>Keep work areas free from trip hazards</li>
                      <li>Never bypass safety guards or mechanisms</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[0]} />
          <Separator className="my-6" />

          {/* Safe Transport */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Truck className="w-5 h-5" /> Safe Transport of Tools
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-white">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
                  <p className="font-medium mb-2">Personal Transport</p>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-green-200 mb-1">Carrying Methods</p>
                      <ul className="list-disc pl-4 space-y-1 text-green-200">
                        <li>Use toolboxes, bags, or cases for secure transport</li>
                        <li>Never carry sharp tools loose in pockets</li>
                        <li>Tool belts for frequently used hand tools</li>
                        <li>Protective covers for sharp or delicate tools</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-green-200 mb-1">Height Work Precautions</p>
                      <ul className="list-disc pl-4 space-y-1 text-green-200">
                        <li>Tool lanyards mandatory when working above ground</li>
                        <li>Secure storage containers on scaffolds</li>
                        <li>Pass tools up/down in containers, not thrown</li>
                        <li>Check lanyard attachment points regularly</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                  <p className="font-medium mb-2">Vehicle Transport</p>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-purple-200 mb-1">Power Tool Preparation</p>
                      <ul className="list-disc pl-4 space-y-1 text-purple-200">
                        <li>Remove batteries or unplug before transport</li>
                        <li>Secure loose accessories and attachments</li>
                        <li>Protect displays and delicate components</li>
                        <li>Allow tools to cool before packing</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-purple-200 mb-1">Securing Methods</p>
                      <ul className="list-disc pl-4 space-y-1 text-purple-200">
                        <li>Use tie-down straps or secured compartments</li>
                        <li>Prevent movement during acceleration/braking</li>
                        <li>Heavy tools in lower storage areas</li>
                        <li>Separate sharp tools from other equipment</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[1]} />
          <Separator className="my-6" />

          {/* Safe Storage */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Home className="w-5 h-5" /> Safe Storage of Tools
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-white">
              <div className="rounded-lg p-4 bg-transparent border border-amber-400/30">
                <p className="font-medium mb-2">Storage Environment & Organisation</p>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-amber-200 mb-1">Environmental Controls</p>
                    <ul className="list-disc pl-4 space-y-1 text-amber-200">
                      <li>Store in dry, secure areas to prevent corrosion and theft</li>
                      <li>Avoid extreme temperatures that can damage batteries</li>
                      <li>Ensure adequate ventilation to prevent moisture buildup</li>
                      <li>Protection from direct sunlight and weather</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-amber-200 mb-1">Organisation Systems</p>
                    <ul className="list-disc pl-4 space-y-1 text-amber-200">
                      <li>Arrange tools for easy location and access</li>
                      <li>Use racks, wall mounts, or foam inserts</li>
                      <li>Prevent tools from rubbing or knocking together</li>
                      <li>Label storage areas for quick identification</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-amber-200 mb-1">Special Considerations</p>
                    <ul className="list-disc pl-4 space-y-1 text-amber-200">
                      <li>Keep insulated tools separate from non-insulated</li>
                      <li>Follow battery charging and storage guidelines</li>
                      <li>Restricted access for dangerous specialist tools</li>
                      <li>Sign-out logs for valuable or controlled equipment</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[2]} />
        </Card>

        {/* What this means on site */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Building className="w-5 h-5" /> What this means on site
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <p className="font-medium mb-2">Daily Site Operations</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Establish secure tool storage areas at start of each project</li>
                <li>Implement tool check-out systems for accountability</li>
                <li>Enforce lanyard use for all work above 2 metres height</li>
                <li>Regular site inspections to identify unsafe tool practices</li>
              </ul>
            </div>
            <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
              <p className="font-medium mb-2">Risk Management Benefits</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Reduces dropped tool incidents and potential injuries</li>
                <li>Minimises tool damage and replacement costs</li>
                <li>Improves site organisation and professional appearance</li>
                <li>Ensures compliance with site safety requirements</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Installation Practices */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5" /> Installation Practices
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-white">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-lg p-4 bg-transparent border border-amber-400/30">
                <p className="font-medium mb-2">Work Planning</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Plan tool requirements before starting work</li>
                  <li>Position tools within easy reach but secure</li>
                  <li>Establish clear tool handover procedures</li>
                  <li>Create designated tool zones for team work</li>
                </ul>
              </div>
              <div className="rounded-lg p-4 bg-transparent border border-cyan-400/30">
                <p className="font-medium mb-2">Site-Specific Requirements</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Comply with site-specific tool policies</li>
                  <li>Use approved storage containers and methods</li>
                  <li>Follow lockable storage requirements</li>
                  <li>Maintain tool inventories and sign-out records</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Common Mistakes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-elec-yellow" /> Common Mistakes
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <p className="font-medium mb-2 text-elec-yellow">Dangerous Practices</p>
              <ul className="list-disc pl-6 space-y-1 text-red-200">
                <li><strong>Carrying sharp tools loose</strong> - Risk of cuts and puncture wounds</li>
                <li><strong>No lanyards at height</strong> - Potential for serious head injuries from dropped tools</li>
                <li><strong>Unsecured transport</strong> - Tool damage and vehicle safety hazards</li>
                <li><strong>Mixed storage of insulated tools</strong> - Confusion leading to electric shock risk</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <p className="font-medium mb-2 text-elec-yellow">Equipment Issues</p>
              <ul className="list-disc pl-6 space-y-1 text-orange-200">
                <li><strong>Poor storage conditions</strong> - Accelerated corrosion and premature failure</li>
                <li><strong>Batteries left in tools</strong> - Accidental activation during transport</li>
                <li><strong>No protective covers</strong> - Damaged cutting edges and safety hazards</li>
                <li><strong>Inadequate organisation</strong> - Time wasted searching, increased handling damage</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Health & Safety Context */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5" /> Health & Safety Context
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-4 bg-indigo-500/10 border border-indigo-400/30">
              <p className="font-medium mb-2">Regulatory Requirements</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>PUWER 1998:</strong> Safe use and maintenance of work equipment</li>
                <li><strong>MHSWR 1999:</strong> Risk assessment and safe systems of work</li>
                <li><strong>Work at Height Regulations:</strong> Prevention of falls and dropped objects</li>
                <li><strong>PPE Regulations:</strong> Appropriate protective equipment provision</li>
              </ul>
            </div>
            <div className="rounded-lg p-4 bg-violet-500/10 border border-violet-400/30">
              <p className="font-medium mb-2">Site Safety Obligations</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Employers must provide safe storage facilities</li>
                <li>Workers must follow safe use and storage procedures</li>
                <li>Risk assessments must cover tool handling activities</li>
                <li>Training required for safe tool use and transport</li>
              </ul>
            </div>
          </div>
        </Card>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Real-world Scenario */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Factory className="w-5 h-5" /> Real-world Scenario
          </h2>
          <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-slate-400/30">
            <p className="font-medium mb-2">Scenario: Falling Angle Grinder Near Miss</p>
            <p className="text-sm mb-4">
              On a commercial site, an unsecured angle grinder fell from a scaffold platform after being left on the edge. 
              It narrowly missed a worker below. Following the incident, the company implemented a mandatory tool lanyard policy 
              for elevated work and introduced tool storage racks on scaffolds to prevent recurrence.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-elec-yellow mb-1">Potential Consequences</p>
                <ul className="list-disc pl-4 space-y-1 text-red-200">
                  <li>Serious head injury or fatality</li>
                  <li>HSE investigation and prosecution</li>
                  <li>Site shutdown and project delays</li>
                  <li>Damage to company reputation</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-green-300 mb-1">Prevention Measures Implemented</p>
                <ul className="list-disc pl-4 space-y-1 text-green-200">
                  <li>Mandatory tool lanyards for height work</li>
                  <li>Designated tool storage racks on scaffolds</li>
                  <li>Regular toolbox talks on dropped objects</li>
                  <li>Enhanced site inspection procedures</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index}>
                <p className="font-medium text-white mb-1">{faq.q}</p>
                <p className="text-sm text-white">{faq.a}</p>
                {index < faqs.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Summary</h2>
          <div className="space-y-4 text-xs sm:text-sm text-white">
            <p>
              Safe use, transport, and storage of tools are key elements of site safety and professionalism. 
              Proper handling prevents accidents, protects tools from damage, and ensures they are ready for work when needed.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
                <p className="font-medium text-green-300 mb-2">Key Benefits</p>
                <ul className="list-disc pl-4 space-y-1 text-green-200">
                  <li>Prevents accidents and reduces injury risks</li>
                  <li>Protects tools from damage and extends service life</li>
                  <li>Ensures compliance with safety regulations</li>
                  <li>Improves site organisation and efficiency</li>
                </ul>
              </div>
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <p className="font-medium text-elec-yellow mb-2">Essential Points</p>
                <ul className="list-disc pl-4 space-y-1 text-blue-200">
                  <li>Always use appropriate PPE for each tool</li>
                  <li>Secure tools during transport and at height</li>
                  <li>Organise storage to prevent damage and confusion</li>
                  <li>Follow site-specific safety procedures</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Apprentice Do's and Don'ts */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Target className="w-5 h-5" /> Apprentice Do's and Don'ts
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
              <p className="font-medium text-green-300 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> DO
              </p>
              <ul className="space-y-2 text-sm text-green-200">
                <li>✓ Use tool lanyards when working at height</li>
                <li>✓ Secure tools in proper containers during transport</li>
                <li>✓ Store insulated tools separately</li>
                <li>✓ Wear appropriate PPE for each tool</li>
                <li>✓ Remove batteries before transport</li>
                <li>✓ Inspect tools after transport before use</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <p className="font-medium text-elec-yellow mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> DON'T
              </p>
              <ul className="space-y-2 text-sm text-red-200">
                <li>✗ Carry sharp tools loose in pockets</li>
                <li>✗ Leave tools unsecured at height</li>
                <li>✗ Store tools in damp conditions</li>
                <li>✗ Mix insulated and non-insulated tools</li>
                <li>✗ Transport tools without proper securing</li>
                <li>✗ Use wrong tools for the job</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Pocket Card Quick Reference */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">
            Pocket Card Quick Reference
          </h2>
          <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-slate-400/30 text-sm">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium mb-2">Safe Use Checklist</p>
                <ul className="space-y-1">
                  <li>• <strong>PPE:</strong> Eyes, hands, ears, lungs</li>
                  <li>• <strong>Position:</strong> Stable, well-lit workspace</li>
                  <li>• <strong>Tool:</strong> Right tool for the job</li>
                  <li>• <strong>Power:</strong> Disconnect before changes</li>
                  <li>• <strong>Guards:</strong> Never bypass safety features</li>
                  <li>• <strong>Area:</strong> Clear of trip hazards</li>
                </ul>
              </div>
              <div>
                <p className="font-medium mb-2">Transport & Storage</p>
                <ul className="space-y-1">
                  <li>• <strong>Carry:</strong> Secure containers, never loose</li>
                  <li>• <strong>Height:</strong> Lanyards mandatory above 2m</li>
                  <li>• <strong>Vehicle:</strong> Tied down, batteries out</li>
                  <li>• <strong>Storage:</strong> Dry, organised, separate types</li>
                  <li>• <strong>Access:</strong> Easy to find and retrieve</li>
                  <li>• <strong>Security:</strong> Locked when unattended</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Key References */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Key References</h2>
          <div className="text-xs sm:text-sm text-white space-y-2">
            <p><strong>PUWER 1998:</strong> Provision and Use of Work Equipment Regulations</p>
            <p><strong>Work at Height Regulations 2005:</strong> Prevention of falls and dropped objects</p>
            <p><strong>MHSWR 1999:</strong> Management of Health and Safety at Work Regulations</p>
            <p><strong>PPE Regulations 2002:</strong> Personal Protective Equipment at Work</p>
          </div>
        </Card>

        {/* Quiz */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">
            Knowledge Check
          </h2>
          <Quiz questions={quizQuestions} />
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" asChild>
            <Link to="../3-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Tool Inspection
            </Link>
          </Button>
          <Button asChild>
            <Link to="..">
              Back to Section 3.3
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module3Section3_5;