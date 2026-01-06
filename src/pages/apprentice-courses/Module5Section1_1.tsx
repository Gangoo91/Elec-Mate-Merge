import { ArrowLeft, ArrowRight, FileText, Target, CheckCircle, AlertTriangle, Users, BookOpen, Clipboard, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "What Is a Specification and Why It Matters - Module 5.1.1 | Level 2 Electrical Course";
const DESCRIPTION = "Learn about electrical specifications - formal documents defining materials, standards and methods. Essential for BS 7671 compliance and safe installation practices.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "What is a specification in electrical work?",
    options: ["A drawing showing cable routes", "A formal document defining materials, methods and standards", "A test certificate", "A risk assessment"],
    correctIndex: 1,
    explanation: "A specification is a formal document that outlines the materials, standards, methods, and performance criteria for an installation."
  },
  {
    id: 2,
    question: "Name one difference between performance and prescriptive specifications.",
    options: ["Performance costs more", "Performance states the outcome required; prescriptive states the exact method/materials", "There is no difference", "Prescriptive is always better"],
    correctIndex: 1,
    explanation: "Performance specifications define the required outcome (e.g., lighting levels must achieve 500 lux), whilst prescriptive specifications define the exact method/materials (e.g., use PVC trunking 50mm x 50mm)."
  },
  {
    id: 3,
    question: "Why must specifications and drawings be used together?",
    options: ["It's a legal requirement", "Drawings show where to install, specifications show how to install", "To increase costs", "Only for complex installations"],
    correctIndex: 1,
    explanation: "Drawings show where to install components and routing, whilst specifications explain how to install them - both are essential for accurate and compliant work."
  }
];

const Module5Section1_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What is the main purpose of a specification?",
      options: [
        "To show where cables should be routed",
        "To define materials, standards, and methods of installation",
        "To replace BS 7671 requirements",
        "To set project costs"
      ],
      correctAnswer: 1,
      explanation: "A specification defines the materials, standards, methods, and performance criteria for an installation, ensuring consistency and compliance."
    },
    {
      id: 2,
      question: "True or False: Specifications are optional guidelines.",
      options: [
        "True - they are just suggestions",
        "False - they are legally binding",
        "True - only for large projects",
        "False - only BS 7671 matters"
      ],
      correctAnswer: 1,
      explanation: "Specifications form part of the contract and are legally binding - they must be followed for compliance and contractual obligations."
    },
    {
      id: 3,
      question: "Which type of specification tells you exactly what material to use?",
      options: [
        "Performance specification",
        "Prescriptive specification",
        "Hybrid specification",
        "General specification"
      ],
      correctAnswer: 1,
      explanation: "Prescriptive specifications define the exact method and materials to be used (e.g., 'use PVC trunking 50mm x 50mm with fire-resistant clips')."
    },
    {
      id: 4,
      question: "Give one example of information typically included in a specification.",
      options: [
        "Site address only",
        "Materials to be used (e.g., cable type)",
        "Weather conditions",
        "Client's personal preferences"
      ],
      correctAnswer: 1,
      explanation: "Specifications typically include materials (cables, trunking, switches), standards (BS 7671), installation methods, testing requirements, and quality expectations."
    },
    {
      id: 5,
      question: "Why is it important to use specifications and drawings together?",
      options: [
        "To make the work take longer",
        "Because drawings show where to install and specifications show how to install",
        "Only for electrical inspections",
        "To increase material costs"
      ],
      correctAnswer: 1,
      explanation: "Drawings show the location and routing of installations, whilst specifications explain the methods, materials and standards - both are essential for complete information."
    },
    {
      id: 6,
      question: "What is one consequence of ignoring a specification?",
      options: [
        "Work will be completed faster",
        "Failed inspection or costly rework",
        "Materials will cost less",
        "No consequences"
      ],
      correctAnswer: 1,
      explanation: "Ignoring specifications can lead to failed inspections, costly rework, safety hazards, and contractual disputes."
    },
    {
      id: 7,
      question: "Which regulation takes precedence over conflicting specifications?",
      options: [
        "Building Regulations only",
        "BS 7671",
        "Local authority rules",
        "Client preferences"
      ],
      correctAnswer: 1,
      explanation: "BS 7671 is the statutory standard for electrical installations in the UK and always takes precedence over conflicting specification requirements."
    },
    {
      id: 8,
      question: "True or False: Specifications form part of a legal contract.",
      options: [
        "False - they are just guidance",
        "True",
        "Only for large contracts",
        "Only if signed separately"
      ],
      correctAnswer: 1,
      explanation: "Specifications form an integral part of the contract documents and create legally binding obligations for all parties."
    },
    {
      id: 9,
      question: "What does a performance specification focus on?",
      options: [
        "The exact materials to use",
        "The required outcome (e.g., lighting levels)",
        "The installation method only",
        "The project timeline"
      ],
      correctAnswer: 1,
      explanation: "Performance specifications focus on the required outcome or end result (e.g., 'lighting levels must achieve 500 lux') rather than dictating specific methods or materials."
    },
    {
      id: 10,
      question: "Fill in the blanks: Specifications help ensure _____, _____, and _____.",
      options: [
        "Speed, cost, appearance",
        "compliance, safety, and quality",
        "Profit, efficiency, convenience",
        "Materials, tools, labour"
      ],
      correctAnswer: 1,
      explanation: "Specifications help ensure compliance with regulations, safety of installations, and quality of workmanship across all aspects of electrical work."
    }
  ];

  const faqs = [
    {
      question: "Can I substitute materials if they seem equivalent?",
      answer: "Only if approved by the supervisor and compliant with the specification. Never assume materials are equivalent - always confirm changes with the project manager or client representative before making substitutions."
    },
    {
      question: "What if the specification conflicts with BS 7671?",
      answer: "BS 7671 always takes precedence as it's the statutory standard. The issue must be raised immediately with the project manager, as the specification will need to be amended to ensure compliance."
    },
    {
      question: "Are specifications legally binding?",
      answer: "Yes, they form part of the contract and must be followed. Failure to comply with specifications can result in contractual disputes, failed inspections, and potential legal action."
    },
    {
      question: "What should I do if a specification is unclear or incomplete?",
      answer: "Stop work and seek clarification immediately. Document your query in writing and obtain written confirmation of any clarifications or changes to avoid disputes later."
    },
    {
      question: "How do specifications relate to method statements and risk assessments?",
      answer: "Specifications define what must be done and to what standard. Method statements describe how the work will be carried out safely, whilst risk assessments identify hazards and control measures."
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
              <FileText className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 5.1.1
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            What Is a Specification and Why It Matters
          </h1>
          <p className="text-white">
            Understanding electrical specifications - the formal documents that define how work must be carried out for compliance and safety.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Specifications define materials, methods and standards for electrical installations.</li>
                <li>They ensure consistency, safety, compliance and client satisfaction.</li>
                <li>Must be used alongside drawings - drawings show where, specifications show how.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Material lists, installation methods, BS standards, testing requirements.</li>
                <li><strong>Use:</strong> Follow specifications exactly, cross-check with drawings, report conflicts.</li>
                <li><strong>Check:</strong> Materials match spec, methods are correct, standards are current.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-base text-white">
            <li>Define what a specification is and explain its purpose in electrical installation.</li>
            <li>Identify the types of information commonly included in a specification.</li>
            <li>Recognise the importance of following specifications for compliance and safety.</li>
            <li>Apply specifications to ensure correct materials, methods, and standards are used.</li>
            <li>Understand how specifications link to BS 7671 and Building Regulations.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content / Learning</h2>

          {/* Definition of a Specification */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Definition of a Specification</h3>
            <p className="text-base text-white mb-4">
              A specification is a formal document that outlines the materials, standards, methods, and performance criteria for an installation:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow text-elec-yellow mb-1">Purpose and Function</p>
                    <p className="text-base text-white mb-2"><strong>Reference point:</strong> Acts as a reference for contractors, installers, and inspectors.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Provides clear, unambiguous instructions for installation work</li>
                      <li>Ensures all parties work to the same standards and requirements</li>
                      <li>Forms the basis for quality control and inspection processes</li>
                      <li>Establishes contractual obligations and performance criteria</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Key principle:</strong> Specifications eliminate guesswork and ensure consistency across all installation work
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="specification-definition-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6" />

          {/* Types of Specifications */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Types of Specifications</h3>
            <p className="text-base text-white mb-4">
              Different types of specifications serve different purposes in electrical installation projects:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Specification Types and Applications</p>
                    <p className="text-base text-white mb-2"><strong>Performance specification:</strong> Defines the required outcome or result.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>States what must be achieved (e.g., "lighting levels must achieve 500 lux")</li>
                      <li>Allows contractor flexibility in method and material selection</li>
                      <li>Focus on end result rather than specific processes</li>
                      <li>Often used for energy efficiency or environmental requirements</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Prescriptive specification:</strong> Defines exact methods and materials.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>States precisely what must be used (e.g., "use PVC trunking 50mm x 50mm with fire-resistant clips")</li>
                      <li>Leaves little room for contractor interpretation or substitution</li>
                      <li>Ensures standardisation across multiple installations</li>
                      <li>Common for safety-critical applications and repeat installations</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Hybrid specifications:</strong> Combines performance and prescriptive elements.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Prescriptive for critical safety items, performance for other aspects</li>
                      <li>Balances flexibility with control over key requirements</li>
                      <li>Most common approach for complex electrical installations</li>
                      <li>Allows innovation whilst maintaining safety standards</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Selection guide:</strong> Choose specification type based on project requirements, safety criticality, and desired flexibility
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="specification-types-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
          <Separator className="my-6" />

          {/* Typical Information in Electrical Specifications */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Typical Information in Electrical Specifications</h3>
            <p className="text-base text-white mb-4">
              Electrical specifications contain detailed information covering all aspects of the installation:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 text-elec-yellow mb-1">Essential Specification Content</p>
                    <p className="text-base text-white mb-2"><strong>Materials to be used:</strong> Detailed specifications for all components.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Cables (type, size, insulation, armouring requirements)</li>
                      <li>Trunking and conduit (material, size, fire rating)</li>
                      <li>Switches, sockets and accessories (type, rating, finish)</li>
                      <li>Distribution boards and consumer units (make, model, protection types)</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Standards and regulations:</strong> Reference to applicable standards.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>BS 7671 (IET Wiring Regulations) compliance requirements</li>
                      <li>BS EN standards for specific equipment and materials</li>
                      <li>Building Regulations Part P requirements</li>
                      <li>Health and Safety requirements and RAMS</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Methods of installation:</strong> How work must be carried out.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Cable installation methods and support requirements</li>
                      <li>Earthing and bonding arrangements</li>
                      <li>Protection and discrimination requirements</li>
                      <li>Termination and connection procedures</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Testing and quality requirements:</strong> Inspection and testing standards.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Initial verification testing requirements</li>
                      <li>Documentation and certification requirements</li>
                      <li>Quality control and inspection procedures</li>
                      <li>Handover and commissioning requirements</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Completeness check:</strong> Specifications should cover materials, methods, standards, and quality - any gaps create risks
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Separator className="my-6" />

          {/* Why Specifications Matter */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Why Specifications Matter</h3>
            <p className="text-base text-white mb-4">
              Following specifications is essential for successful electrical installations:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 text-elec-yellow mb-1">Critical Importance of Specification Compliance</p>
                    <p className="text-base text-white mb-2"><strong>Compliance:</strong> Ensures adherence to BS 7671 and building regulations.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Meets statutory requirements for electrical safety</li>
                      <li>Satisfies Building Control and Part P notification requirements</li>
                      <li>Ensures insurance validity and liability protection</li>
                      <li>Facilitates smooth inspection and certification processes</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Consistency:</strong> Guarantees all contractors work to the same standard.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Eliminates variations in materials and methods between different workers</li>
                      <li>Ensures uniform quality across large or multi-phase projects</li>
                      <li>Reduces disputes and misunderstandings between parties</li>
                      <li>Facilitates maintenance and future modifications</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Client satisfaction:</strong> Ensures project requirements are met.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Delivers what was promised in terms of quality and performance</li>
                      <li>Avoids costly disputes and claims for defective work</li>
                      <li>Builds reputation and trust for future work opportunities</li>
                      <li>Ensures functional requirements and aesthetic expectations are met</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Risk reduction:</strong> Avoids errors, disputes, and safety hazards.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Prevents installation defects that could cause fires or electric shock</li>
                      <li>Avoids costly rework and project delays</li>
                      <li>Reduces professional indemnity and public liability risks</li>
                      <li>Protects against prosecution for regulatory non-compliance</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Bottom line:</strong> Specifications protect everyone - clients, contractors, users, and the public
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="specification-importance-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
          <Separator className="my-6" />

          {/* Link Between Specifications and Drawings */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Link Between Specifications and Drawings</h3>
            <p className="text-base text-white mb-4">
              Specifications and drawings work together to provide complete installation information:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-cyan-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                  <div className="flex-1">
                    <p className="font-semibold text-cyan-600 dark:text-cyan-400 mb-1">Complementary Documentation</p>
                    <p className="text-base text-white mb-2"><strong>Drawings show WHERE to install:</strong> Location and routing information.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Room layouts and equipment positions</li>
                      <li>Cable routes and containment systems</li>
                      <li>Distribution board locations and circuit arrangements</li>
                      <li>Switch and socket positions with heights and spacings</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Specifications explain HOW to install:</strong> Methods and standards.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Cable types, sizes and installation methods</li>
                      <li>Fixings, supports and protection requirements</li>
                      <li>Termination procedures and connection standards</li>
                      <li>Testing and inspection requirements</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Cross-referencing essentials:</strong> Both documents must be used together.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Check drawings for circuit references and match to specification clauses</li>
                      <li>Verify material specifications against drawing symbols and legends</li>
                      <li>Ensure installation methods suit the physical constraints shown on drawings</li>
                      <li>Report any conflicts between drawings and specifications immediately</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Remember:</strong> Drawings without specifications lack detail; specifications without drawings lack context
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Separator className="my-6" />

          {/* Consequences of Ignoring Specifications */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Consequences of Ignoring Specifications</h3>
            <p className="text-base text-white mb-4">
              Failure to follow specifications can have serious consequences for all parties involved:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">6</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 text-elec-yellow mb-1">Serious Consequences of Non-Compliance</p>
                    <p className="text-base text-white mb-2"><strong>Failed inspections:</strong> Regulatory and quality control failures.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Building Control rejection requiring rectification before occupation</li>
                      <li>Electrical Installation Certificate cannot be issued</li>
                      <li>Insurance policies may be invalidated</li>
                      <li>Project handover delays affecting client operations</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Costly rework:</strong> Financial impact on projects and contractors.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Material costs for replacement components and systems</li>
                      <li>Labour costs for removal and reinstallation</li>
                      <li>Plant and equipment costs for extended site presence</li>
                      <li>Liquidated damages for project delays</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Safety hazards:</strong> Risk to people and property.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Undersized cables overheating and causing fires</li>
                      <li>Inadequate earthing creating electric shock risks</li>
                      <li>Non-compliant protection devices failing to operate correctly</li>
                      <li>Poor workmanship leading to loose connections and arcing</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Legal and contractual disputes:</strong> Professional and legal consequences.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Breach of contract claims from clients</li>
                      <li>Professional negligence and liability issues</li>
                      <li>Health and Safety Executive prosecution for safety breaches</li>
                      <li>Damage to professional reputation and future work opportunities</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Prevention is key:</strong> Always follow specifications exactly - the cost of compliance is far less than the cost of failure
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Separator className="my-6" />

          {/* Managing Specification Changes */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Managing Specification Changes and Variations</h3>
            <p className="text-base text-white mb-4">
              During project execution, specifications may need to be modified or clarified:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-indigo-500 bg-indigo-500/5">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold">7</span>
                  <div className="flex-1">
                    <p className="font-semibold text-indigo-600 dark:text-indigo-400 mb-1">Change Management Procedures</p>
                    <p className="text-base text-white mb-2"><strong>Requesting clarifications:</strong> When specifications are unclear or incomplete.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Submit requests in writing with specific questions</li>
                      <li>Include relevant drawing and specification references</li>
                      <li>Explain the impact on installation if clarification is not provided</li>
                      <li>Keep records of all communications for future reference</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Proposing variations:</strong> Suggesting alternative materials or methods.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Provide technical justification for proposed changes</li>
                      <li>Demonstrate equivalent or superior performance</li>
                      <li>Include cost and programme implications</li>
                      <li>Obtain written approval before implementing changes</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Managing approved changes:</strong> Implementing modifications correctly.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Update all relevant documentation and drawings</li>
                      <li>Communicate changes to all affected team members</li>
                      <li>Ensure compliance with regulations is maintained</li>
                      <li>Adjust testing and commissioning procedures as required</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Golden rule:</strong> Never implement changes without written approval - verbal instructions are not sufficient
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Separator className="my-6" />

          {/* Quality Assurance and Compliance */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Quality Assurance and Compliance Monitoring</h3>
            <p className="text-base text-white mb-4">
              Ensuring ongoing compliance with specifications throughout the installation process:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-teal-500 bg-teal-500/5">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center text-sm font-bold">8</span>
                  <div className="flex-1">
                    <p className="font-semibold text-teal-600 dark:text-teal-400 mb-1">Systematic Quality Control</p>
                    <p className="text-base text-white mb-2"><strong>Pre-installation checks:</strong> Verification before work commences.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Confirm all materials meet specification requirements</li>
                      <li>Check material certificates and compliance documentation</li>
                      <li>Verify tools and equipment are suitable for specified methods</li>
                      <li>Review method statements against specification requirements</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Progress monitoring:</strong> Ongoing compliance verification during installation.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Regular inspections of work in progress</li>
                      <li>Photographic records of concealed work before covering</li>
                      <li>Hold points for critical installation stages</li>
                      <li>Immediate correction of non-conforming work</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Final verification:</strong> Comprehensive compliance checking before handover.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Complete installation inspection against specification</li>
                      <li>Testing and commissioning to specified requirements</li>
                      <li>Documentation review and compilation</li>
                      <li>Client demonstration and sign-off procedures</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Quality mindset:</strong> Build quality in at every stage rather than trying to inspect it in at the end
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
        </Card>

        {/* Real-World Example */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Real-World Example</h2>
          <div className="rounded-lg p-4 bg-transparent border border-amber-400/30">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-white mb-2">Office Project Specification Breach</p>
                <p className="text-xs sm:text-sm text-white mb-3">
                  On a large office project, electricians installed standard PVC clips to secure cables throughout the building. 
                  The specification clearly required metal fire-resistant clips to comply with new fire safety regulations for commercial buildings.
                </p>
                <p className="text-xs sm:text-sm text-white mb-3">
                  During the final inspection, Building Control rejected the installation. All cable runs had to be removed and reinstalled 
                  with the correct fire-resistant clips. The contractor faced:
                </p>
                <ul className="text-xs sm:text-sm text-white list-disc ml-4 space-y-1 mb-3">
                  <li>3 weeks of project delays affecting the client's move-in date</li>
                  <li>£15,000 in additional labour and material costs</li>
                  <li>Liquidated damages of £2,000 per day for late completion</li>
                  <li>Damage to reputation and relationship with the client</li>
                </ul>
                <p className="text-xs sm:text-sm text-white font-medium">
                  <strong>Lesson learned:</strong> Always read and follow specifications exactly - assuming materials are "equivalent" can be very costly.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-l-2 border-l-blue-200 pl-4">
                <p className="font-medium text-white mb-2">Q: {faq.question}</p>
                <p className="text-sm text-white">A: {faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Pocket Guide: Working with Specifications</h2>
          <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-white/10">
            <ul className="space-y-2 text-xs sm:text-sm text-white">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                <span><strong>Always read</strong> specifications before starting work.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                <span><strong>Highlight</strong> key requirements (materials, methods, standards).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                <span><strong>Cross-check</strong> with drawings and site conditions.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                <span><strong>Report</strong> any conflicts or unclear instructions.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                <span><strong>Never assume</strong> — always confirm changes.</span>
              </li>
            </ul>
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Recap</h2>
          <p className="text-base text-white mb-4">In this subsection, you learned:</p>
          <ul className="list-disc pl-6 space-y-2 text-base text-white">
            <li>What specifications are and why they matter for electrical installations.</li>
            <li>The different types (performance, prescriptive, hybrid) and their applications.</li>
            <li>Typical information they include (materials, standards, methods, testing).</li>
            <li>How they link to drawings to provide complete installation information.</li>
            <li>The serious consequences of ignoring specification requirements.</li>
          </ul>
          <p className="text-base text-white mt-4">
            By following specifications correctly, you ensure compliance, safety, quality, and client satisfaction whilst protecting yourself and others from legal and safety risks.
          </p>
        </Card>

        {/* Quiz */}
        <div className="mb-8">
          <Quiz 
            title="Test Your Knowledge: Specifications"
            questions={quizQuestions}
          />
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-white/10">
          <Button variant="outline" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button asChild>
            <Link to="../1-2">
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module5Section1_1;