import { ArrowLeft, ArrowRight, FileText, Target, CheckCircle, AlertTriangle, Users, BookOpen, Clipboard, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Identifying Installation Requirements from Drawings - Module 5.1.5 | Level 2 Electrical Course";
const DESCRIPTION = "Learn how to analyse electrical drawings to identify materials, routes, accessories, and compliance requirements before beginning installation work.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "What information is found in the title block?",
    options: ["Only the drawing date", "Drawing type, project details, scale, and date", "Just the project name", "Only the scale information"],
    correctIndex: 1,
    explanation: "The title block contains comprehensive information including drawing type, project details, scale, and date - all essential for proper interpretation."
  },
  {
    id: 2,
    question: "Why should all notes be read carefully?",
    options: ["They are just suggestions", "They often contain essential instructions like material requirements", "They only show general information", "They are optional to follow"],
    correctIndex: 1,
    explanation: "Notes often contain critical instructions such as material specifications (e.g., 'all cables to be LSF') that are essential for compliance."
  },
  {
    id: 3,
    question: "Why must specifications and drawings be used together?",
    options: ["It's a legal requirement", "Drawings show where to install, specifications show how to install", "To increase costs", "Only for complex installations"],
    correctIndex: 1,
    explanation: "Drawings show where to install components and routing, whilst specifications explain how to install them - both are essential for accurate and compliant work."
  }
];

const Module5Section1_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What key details are found in the title block of a drawing?",
      options: [
        "Only the drawing number",
        "Project details, drawing type, scale, and date",
        "Just the project location",
        "Only the designer's name"
      ],
      correctAnswer: 1,
      explanation: "The title block provides essential information including project details, drawing type, scale, and date needed for proper interpretation."
    },
    {
      id: 2,
      question: "True or False: Notes on drawings are optional to follow.",
      options: [
        "True - they are just suggestions",
        "False - they are mandatory and often contain critical information",
        "True - only for large projects",
        "False - only symbols matter"
      ],
      correctAnswer: 1,
      explanation: "Notes on drawings are mandatory and often contain critical installation requirements that must be followed for safety and compliance."
    },
    {
      id: 3,
      question: "What do circuit codes such as L1/03 represent?",
      options: [
        "Cable sizes",
        "Specific circuit numbers linked to the distribution board",
        "Material types",
        "Installation methods"
      ],
      correctAnswer: 1,
      explanation: "Circuit codes like L1/03 represent specific circuit numbers that link to the distribution board and must be cross-referenced with schedules."
    },
    {
      id: 4,
      question: "Where should cable sizes be confirmed if not shown on the drawing?",
      options: [
        "From previous projects",
        "In the specification",
        "By making an educated guess",
        "From the supplier's catalogue"
      ],
      correctAnswer: 1,
      explanation: "Cable sizes should always be confirmed in the project specification when not clearly shown on drawings - never guess or assume."
    },
    {
      id: 5,
      question: "Give one example of information notes may include.",
      options: [
        "Weather conditions for installation",
        "All cables to be LSF (low smoke and fume)",
        "Project budget constraints",
        "Installation team member names"
      ],
      correctAnswer: 1,
      explanation: "Notes commonly include critical material specifications such as 'All cables to be LSF' which are essential for safety and regulatory compliance."
    },
    {
      id: 6,
      question: "Why is cross-referencing drawings and specifications important?",
      options: [
        "It's not really necessary for simple jobs",
        "Because drawings show where, specifications show how/what",
        "Only required for large commercial projects",
        "To justify higher project costs"
      ],
      correctAnswer: 1,
      explanation: "Drawings show positioning and layout whilst specifications provide the technical details of materials and methods - both are essential for complete information."
    },
    {
      id: 7,
      question: "What is a common mistake when interpreting drawings?",
      options: [
        "Reading them too carefully and slowly",
        "Ignoring notes or misreading symbols",
        "Using the correct measurement scale",
        "Following all manufacturer guidelines"
      ],
      correctAnswer: 1,
      explanation: "Common mistakes include ignoring important notes or misinterpreting symbols, both of which can lead to incorrect installations and safety issues."
    },
    {
      id: 8,
      question: "True or False: You can assume all sockets shown on drawings are standard 13A types.",
      options: [
        "True - this is standard practice",
        "False - always check specifications for socket types",
        "True - unless clearly marked otherwise",
        "False - but only for industrial installations"
      ],
      correctAnswer: 1,
      explanation: "Never assume socket types - always check specifications as some may require RCD protection, different ratings, or special features."
    },
    {
      id: 9,
      question: "What do safe zones in drawings ensure?",
      options: [
        "Faster installation times",
        "That cables are run in positions where they are less likely to be damaged",
        "Lower material costs",
        "Easier access for maintenance"
      ],
      correctAnswer: 1,
      explanation: "Safe zones ensure cables are installed in positions where they are protected from damage during construction and future work, as required by BS 7671."
    },
    {
      id: 10,
      question: "If a drawing shows unclear requirements, what should you do?",
      options: [
        "Make your best professional judgement",
        "Confirm with the supervisor or project manager",
        "Skip that section and continue",
        "Copy the approach from a similar project"
      ],
      correctAnswer: 1,
      explanation: "Always clarify unclear requirements with supervisors or project managers to ensure correct installation and avoid costly mistakes or safety issues."
    }
  ];

  const faqs = [
    {
      question: "Do drawings always show cable sizes?",
      answer: "Not always — cable sizes should be confirmed in the project specification when not clearly shown on drawings."
    },
    {
      question: "What if the drawing shows a circuit number but no protective device?",
      answer: "Cross-reference the circuit number with the distribution schedule, which will specify the protective device type and rating."
    },
    {
      question: "Can I ignore small notes if the main drawing looks clear?",
      answer: "Never — notes may contain critical details about materials, installation methods, or safety requirements that override standard practices."
    },
    {
      question: "How do I know which symbols apply to my installation?",
      answer: "Always refer to the drawing legend or symbol key, and cross-check with project specifications for material and accessory details."
    },
    {
      question: "What should I do if I find conflicts between drawings and specifications?",
      answer: "Stop work immediately and seek clarification from the project manager. Document the conflict and get written confirmation of the correct approach."
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
              Section 5.1.5
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Identifying Installation Requirements from Drawings
          </h1>
          <p className="text-white">
            Drawings are more than just pictures of layouts — they are instructions for how an installation must be carried out. Learn to analyse drawings for materials, routes, accessories, and compliance requirements.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Drawings provide detailed instructions for electrical installation work.</li>
                <li>Title blocks and notes contain critical project and material information.</li>
                <li>Must be cross-referenced with specifications for complete requirements.</li>
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
            <li>Identify key installation requirements from electrical drawings.</li>
            <li>Recognise how to determine materials, routes, and accessories from drawings.</li>
            <li>Understand the role of notes, legends, and circuit codes in drawings.</li>
            <li>Cross-check requirements with project specifications effectively.</li>
            <li>Avoid common mistakes when interpreting installation needs from drawings.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content / Learning</h2>

          {/* Reading the Title Block and Notes */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">1. Reading the Title Block and Notes</h3>
            <p className="text-base text-white mb-4">
              The title block and notes provide essential information that must be understood before beginning any installation work:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow dark:text-elec-yellow mb-1">Title Block Information</p>
                    <p className="text-base text-white mb-2"><strong>Title block gives:</strong> Drawing type, project details, scale, and date.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Drawing type (layout, schematic, detail drawing)</li>
                      <li>Project name, address, and reference numbers</li>
                      <li>Scale information for accurate measurements</li>
                      <li>Issue date and revision information</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Notes often contain:</strong> Vital instructions (e.g., "all cables to be LSF – low smoke and fume").</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Material specifications and requirements</li>
                      <li>Installation method requirements</li>
                      <li>Special safety or environmental considerations</li>
                      <li>Testing and commissioning requirements</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Key principle:</strong> Always read title blocks and notes first - they contain mandatory requirements that override standard practices
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="title-block-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6" />

          {/* Identifying Materials */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">2. Identifying Materials</h3>
            <p className="text-base text-white mb-4">
              Drawings use symbols and annotations to specify exactly which materials and accessories are required:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Material Identification from Drawings</p>
                    <p className="text-base text-white mb-2"><strong>Symbols and annotations</strong> show whether to use PVC, steel conduit, trunking, tray, or other containment.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Containment symbols indicate material type and size</li>
                      <li>Different line styles may represent different materials</li>
                      <li>Annotations provide specific material codes or specifications</li>
                      <li>Legend or symbol key explains all material representations</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Socket, switch, and luminaire symbols</strong> specify accessory types.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Different symbols for socket types (13A, industrial, RCD-protected)</li>
                      <li>Switch symbols indicate type (1-way, 2-way, intermediate)</li>
                      <li>Luminaire symbols show fitting types and mounting methods</li>
                      <li>Control device symbols (PIR, timers, dimmers)</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Selection guide:</strong> Always refer to the drawing legend and cross-check with specifications for complete material details
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="materials-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
          <Separator className="my-6" />

          {/* Circuit Identification */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">3. Circuit Identification</h3>
            <p className="text-base text-white mb-4">
              Every circuit must be properly identified and cross-referenced to ensure correct installation:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-elec-yellow mb-1">Circuit Codes and References</p>
                    <p className="text-base text-white mb-2"><strong>Circuits labelled</strong> with numbers or codes (e.g., L1/03).</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Circuit numbers link to distribution board schedules</li>
                      <li>Codes may indicate floor level, area, or circuit type</li>
                      <li>Sub-circuits may have additional identification</li>
                      <li>Emergency circuits often have special coding</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Must be cross-referenced</strong> with distribution schedules.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Distribution schedules show protective device ratings</li>
                      <li>Cable sizes and types specified in schedules</li>
                      <li>Load calculations and diversity factors included</li>
                      <li>Testing requirements and acceptance criteria</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Critical process:</strong> Never assume circuit details - always cross-reference with distribution schedules and specifications
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Separator className="my-6" />

          {/* Safe Zones and Routes */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">4. Safe Zones and Routes</h3>
            <p className="text-base text-white mb-4">
              Cable routes must be carefully planned to comply with safety regulations:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 dark:text-elec-yellow mb-1">Cable Routes and Safe Zones</p>
                    <p className="text-base text-white mb-2"><strong>Drawings show intended routes</strong> within walls, floors, and ceilings.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Horizontal routes typically 150mm from ceiling or floor</li>
                      <li>Vertical routes typically 150mm from corners or edges</li>
                      <li>Routes around openings (doors, windows) clearly marked</li>
                      <li>Service zones for multi-story buildings indicated</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Routes must follow regulations</strong> for safe cable zones.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>BS 7671 requirements for concealed cable routes</li>
                      <li>Protection requirements for cables in walls</li>
                      <li>Segregation requirements for different cable types</li>
                      <li>Fire stopping requirements at compartment boundaries</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Safety priority:</strong> Routes must comply with BS 7671 safe zones to prevent damage during future work
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Separator className="my-6" />

          {/* Cross-Referencing Specifications */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">5. Cross-Referencing Specifications</h3>
            <p className="text-base text-white mb-4">
              Drawings and specifications must be used together for complete installation information:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-teal-500 bg-teal-500/5">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                  <div className="flex-1">
                    <p className="font-semibold text-teal-600 dark:text-teal-400 mb-1">Drawings and Specifications Integration</p>
                    <p className="text-base text-white mb-2"><strong>Drawings give visual positions;</strong> specifications give technical detail (e.g., cable sizes, protective devices).</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Drawings show where to install components and routing</li>
                      <li>Specifications define materials, methods, and standards</li>
                      <li>Both documents are contractually binding requirements</li>
                      <li>Conflicts must be resolved before work begins</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Both must be used together</strong> for complete installation requirements.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Never rely on drawings alone for technical details</li>
                      <li>Never rely on specifications alone for positioning</li>
                      <li>Cross-check for consistency between documents</li>
                      <li>Document any discrepancies and seek clarification</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Working principle:</strong> Drawings show where, specifications show how - both are essential for compliant installation
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="cross-reference-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
          <Separator className="my-6" />

          {/* Common Errors */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">6. Common Errors</h3>
            <p className="text-base text-white mb-4">
              Avoid these common mistakes when interpreting installation requirements from drawings:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">6</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 dark:text-elec-yellow mb-1">Common Interpretation Errors</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li><strong>Ignoring notes:</strong> Missing critical material or method requirements</li>
                      <li><strong>Misreading symbols:</strong> Installing wrong accessory or material types</li>
                      <li><strong>Assuming cable sizes:</strong> Not checking specifications for cable requirements</li>
                      <li><strong>Wrong scale interpretation:</strong> Incorrect measurements and positioning</li>
                      <li><strong>Outdated drawings:</strong> Working from superseded versions</li>
                      <li><strong>Missing cross-references:</strong> Not checking distribution schedules</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Prevention strategy:</strong> Always read carefully, check specifications, and seek clarification when uncertain
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
          <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
            <p className="text-base text-white">
              <strong>Commercial site scenario:</strong> On a commercial site, an installer assumed all sockets were standard 13A types based on the drawing symbols. However, the drawing notes specified that some sockets required RCD-protected outlets for outdoor use. The oversight led to failed inspection, rework, and project delays, costing both time and money.
            </p>
            <p className="text-sm text-white mt-2">
              <strong>Lesson:</strong> Always read all notes and cross-check with specifications - symbols alone don't provide complete information.
            </p>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/10 pb-4 last:border-b-0">
                <p className="font-medium text-white mb-2">Q: {faq.question}</p>
                <p className="text-white">A: {faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Pocket Guide</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium">Read the title block and notes first</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium">Identify materials and accessories from symbols</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium">Cross-reference circuits with schedules</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium">Always use drawings and specifications together</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium">Never assume — confirm details before starting work</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Recap</h2>
          <p className="text-base text-white mb-4">In this subsection, you learned:</p>
          <ul className="list-disc pl-6 space-y-2 text-base text-white">
            <li>How to identify installation requirements from electrical drawings effectively.</li>
            <li>The importance of title blocks, notes, and legends in drawing interpretation.</li>
            <li>How to determine materials, accessories, and routes from drawing symbols.</li>
            <li>Why cross-referencing with specifications is essential for complete information.</li>
            <li>Common mistakes and how to avoid them when interpreting installation needs.</li>
          </ul>
        </Card>

        {/* Quiz */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <Quiz questions={quizQuestions} />
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-6 border-t border-white/10">
          <Button variant="outline" asChild>
            <Link to="../1-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Planning and Preparation
            </Link>
          </Button>
          <Button asChild>
            <Link to="..">
              Section Complete
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module5Section1_5;