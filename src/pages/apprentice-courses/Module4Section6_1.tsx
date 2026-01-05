import { ArrowLeft, ArrowRight, Eye, Target, CheckCircle, AlertTriangle, Search, TrendingUp, Shield, Camera, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Performing a Visual Inspection - Module 4.6.1 | Level 2 Electrical Course";
const DESCRIPTION = "Master systematic visual inspection techniques for electrical installations. Learn to identify defects, ensure compliance with BS 7671, and maintain safety standards before testing begins.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "When should a visual inspection be carried out — before or after testing?",
    options: ["After testing", "Before testing", "During testing", "It doesn't matter"],
    correctIndex: 1,
    explanation: "BS 7671 Regulation 611.3 states that visual inspection shall precede testing. This ensures visible defects are identified and corrected before electrical testing begins."
  },
  {
    id: 2,
    question: "Name two defects that can be found during a visual inspection.",
    options: ["Missing grommets and exposed copper", "High resistance and earth faults", "Voltage drop and power factor", "Frequency and harmonics"],
    correctIndex: 0,
    explanation: "Visual inspections can identify physical defects like missing grommets at cable entries and exposed copper conductors at terminations - both serious safety hazards."
  },
  {
    id: 3,
    question: "Why must cables be routed in recognised safe zones?",
    options: ["For aesthetic reasons", "To prevent accidental damage", "To reduce costs", "For easier testing"],
    correctIndex: 1,
    explanation: "Safe zones protect cables from accidental damage during future building work, drilling, or maintenance activities, preventing potentially dangerous situations."
  }
];

const Module4Section6_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "According to BS 7671, when must a visual inspection be performed?",
      options: [
        "After testing",
        "Before testing",
        "After energisation",
        "Only for domestic work"
      ],
      correctAnswer: 1,
      explanation: "BS 7671 Regulation 611.3 clearly states that visual inspection shall precede testing to identify defects before energisation."
    },
    {
      id: 2,
      question: "Name one tool commonly used in visual inspections.",
      options: [
        "Torch",
        "Multimeter",
        "Insulation tester",
        "Clamp meter"
      ],
      correctAnswer: 0,
      explanation: "A torch is essential for visual inspections to illuminate areas and identify defects that may not be visible in normal lighting."
    },
    {
      id: 3,
      question: "What is the main regulatory reference for visual inspections?",
      options: [
        "BS 5839",
        "BS 7671",
        "BS EN 50200",
        "BS 5266"
      ],
      correctAnswer: 1,
      explanation: "BS 7671 is the main regulatory standard for electrical installations, including requirements for visual inspections."
    },
    {
      id: 4,
      question: "True or False: Visual inspections can identify electrical faults that cannot be seen.",
      options: [
        "True",
        "False",
        "Only sometimes",
        "Only with special equipment"
      ],
      correctAnswer: 1,
      explanation: "False - Visual inspections only identify defects that can be seen. Electrical faults like insulation breakdown require testing."
    },
    {
      id: 5,
      question: "List two common defects a visual inspection might reveal.",
      options: [
        "Missing grommets and exposed copper conductors",
        "High resistance and earth faults",
        "Voltage fluctuations and power surges",
        "Frequency variations and harmonics"
      ],
      correctAnswer: 0,
      explanation: "Missing grommets and exposed copper conductors are visible defects that compromise safety and can be identified during visual inspection."
    },
    {
      id: 6,
      question: "Why is it important to check for grommets or bushes at cable entries?",
      options: [
        "To prevent damage to cable insulation from sharp edges",
        "To improve aesthetics",
        "To reduce installation time",
        "To comply with colour coding"
      ],
      correctAnswer: 0,
      explanation: "Grommets and bushes protect cable insulation from damage caused by sharp metal edges at entry points, preventing potential safety hazards."
    },
    {
      id: 7,
      question: "What should you do if a defect is classified as dangerous?",
      options: [
        "Continue with testing",
        "Stop work, report, and make the area safe",
        "Record it and continue",
        "Inform the client later"
      ],
      correctAnswer: 1,
      explanation: "Dangerous defects require immediate action - stop work, report to supervisor, and make the area safe before proceeding."
    },
    {
      id: 8,
      question: "True or False: A visual inspection can be skipped if the installer is confident in their work.",
      options: [
        "True",
        "False",
        "Only for simple installations",
        "Only for experienced installers"
      ],
      correctAnswer: 1,
      explanation: "False - Visual inspection is mandatory under BS 7671 regardless of installer confidence or experience level."
    }
  ];

  const faqs = [
    {
      question: "Can a visual inspection replace electrical testing?",
      answer: "No — it is a complementary step that must be performed before testing but does not verify electrical performance. Both visual inspection and electrical testing are required for full compliance."
    },
    {
      question: "What if I find a dangerous fault during inspection?",
      answer: "Stop work immediately, report to the supervisor, and make the area safe before proceeding. Do not continue with any further work until the dangerous condition is resolved."
    },
    {
      question: "Do I need specialist tools for visual inspection?",
      answer: "Mostly basic hand tools, but a good light source and an inspection mirror are essential for hard-to-see areas. A camera for documentation is also highly recommended."
    },
    {
      question: "How detailed should the visual inspection documentation be?",
      answer: "Documentation should be comprehensive, including location of defects, categorisation of severity, and photographic evidence where possible. This supports quality assurance and regulatory compliance."
    },
    {
      question: "What happens if multiple defects are found?",
      answer: "All defects must be recorded and categorised by severity. Dangerous defects require immediate action, while minor issues can be scheduled for correction before final testing."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top header bar */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-card">
              <Eye className="w-6 h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
              Section 4.6.1
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Performing a Visual Inspection
          </h1>
          <p className="text-muted-foreground">
            Master systematic visual inspection techniques to ensure electrical installations are safe, compliant, and ready for testing.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Visual inspection is the mandatory first step before electrical testing begins.</li>
                <li>It identifies visible defects and ensures compliance with BS 7671 requirements.</li>
                <li>Systematic inspection prevents costly rework and ensures safety standards.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Damaged components, incorrect installations, missing safety features.</li>
                <li><strong>Use:</strong> Systematic approach, proper documentation, categorisation methods.</li>
                <li><strong>Check:</strong> Compliance with regulations, safety standards, quality requirements.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-base text-foreground">
            <li>Explain the purpose and regulatory requirements of visual inspection in electrical installation work.</li>
            <li>Identify common defects and safety hazards that can be detected through visual examination.</li>
            <li>Follow a structured, systematic approach to carry out compliant visual inspections.</li>
            <li>Record findings accurately using appropriate documentation and categorisation methods.</li>
            <li>Understand when to halt further work due to visual inspection failures and safety concerns.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Content</h2>

          {/* Purpose of Visual Inspection */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Purpose and Regulatory Framework for Visual Inspection</h3>
            <p className="text-base text-foreground mb-4">
              Visual inspection forms the foundation of electrical installation verification, ensuring safety and compliance before energisation:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-1">Regulatory Requirements and Compliance Framework</p>
                    <p className="text-base text-foreground mb-2"><strong>BS 7671 compliance verification:</strong> Ensuring installations meet current wiring regulations.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Regulation 611.3: Visual inspection shall precede testing and be carried out with the installation de-energised</li>
                      <li>Verification of compliance with Chapters 13-15 of BS 7671 covering design and installation requirements</li>
                      <li>Confirmation that installation methods align with manufacturer instructions and guidance notes</li>
                      <li>Assessment of workmanship standards against industry best practice and regulatory expectations</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Safety standard verification:</strong> Ensuring installations are free from visible hazards before energisation.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Identification of immediate danger conditions requiring urgent attention</li>
                      <li>Verification of protection against electric shock through proper installation methods</li>
                      <li>Assessment of fire risk factors including proper cable support and containment</li>
                      <li>Confirmation of environmental protection appropriate to installation location</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Quality assurance processes:</strong> Maintaining professional standards throughout installation.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Verification that installation meets both technical and aesthetic project requirements</li>
                      <li>Confirmation of proper coordination with other building services and trades</li>
                      <li>Assessment of accessibility for future maintenance and inspection activities</li>
                      <li>Documentation of installation quality for certification and warranty purposes</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Legal requirement:</strong> Visual inspection is mandatory under BS 7671 and cannot be omitted or deferred
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="timing-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6" />

          {/* What to Look For */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Comprehensive Defect Identification and Assessment</h3>
            <p className="text-base text-foreground mb-4">
              Systematic examination of all installation elements ensures comprehensive defect identification:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-1">Critical Safety and Compliance Checkpoints</p>
                    <p className="text-base text-foreground mb-2"><strong>Accessory verification:</strong> Ensuring correct type, rating, and installation of electrical accessories.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Socket outlets: Correct type for location, proper earthing, secure mounting, and appropriate IP rating</li>
                      <li>Switches: Correct rating for load, proper orientation, secure fixing, and appropriate height</li>
                      <li>Light fittings: Suitable for environment, correctly supported, and proper lamp compatibility</li>
                      <li>Distribution boards: Appropriate size, correct labelling, and secure cable terminations</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Cable installation assessment:</strong> Verifying proper cable routing, support, and protection.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Safe zone compliance: Cables routed in prescribed zones to prevent accidental damage</li>
                      <li>Support spacing: Adequate fixings at intervals compliant with BS 7671 requirements</li>
                      <li>Bend radius protection: Cables not subject to excessive bending or stress</li>
                      <li>Environmental suitability: Cable types appropriate for installation conditions</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Termination quality control:</strong> Ensuring safe and reliable electrical connections.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>No exposed copper: All live conductors properly insulated with no bare metal visible</li>
                      <li>Proper cable preparation: Correct stripping lengths and undamaged conductor cores</li>
                      <li>Secure connections: All terminations tight and properly secured according to manufacturer specifications</li>
                      <li>Correct polarity: Live, neutral, and earth conductors connected to appropriate terminals</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Environmental protection verification:</strong> Confirming appropriate protection levels for location.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>IP rating compliance: Enclosures suitable for moisture, dust, and impact conditions</li>
                      <li>Corrosion protection: Appropriate materials for environmental conditions</li>
                      <li>Temperature considerations: Components rated for ambient temperature conditions</li>
                      <li>Fire barriers: Proper sealing of penetrations to maintain compartmentation</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Systematic approach:</strong> Every element must be checked methodically to ensure nothing is missed
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="defects-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
          <Separator className="my-6" />

          {/* Inspection Sequence */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Systematic Inspection Methodology and Procedures</h3>
            <p className="text-base text-foreground mb-4">
              Following a structured sequence ensures comprehensive coverage and maintains safety throughout inspection:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Professional Inspection Sequence and Best Practices</p>
                    <p className="text-base text-foreground mb-2"><strong>Origin and distribution assessment:</strong> Starting from the main supply and working systematically outward.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Main supply connection: Verify proper earthing, bonding, and supply characteristics</li>
                      <li>Consumer unit inspection: Check RCD operation, MCB ratings, and circuit identification</li>
                      <li>Circuit distribution: Follow each circuit from origin to final connection point</li>
                      <li>Sub-distribution verification: Additional boards correctly fed and protected</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Containment system verification:</strong> Ensuring mechanical protection and support systems are adequate.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Trunking systems: Proper joints, adequate support, and correct lid retention</li>
                      <li>Conduit installations: Smooth bore, proper bending, and appropriate material selection</li>
                      <li>Cable tray systems: Adequate support, proper earthing, and appropriate loading</li>
                      <li>Clip and cleat fixing: Correct spacing, appropriate materials, and secure mounting</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Accessory installation standards:</strong> Comprehensive checking of all electrical accessories.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Mounting security: All accessories properly fixed with no movement or damage</li>
                      <li>Alignment accuracy: Consistent heights, horizontal alignment, and aesthetic standards</li>
                      <li>Functional accessibility: Easy operation and maintenance access maintained</li>
                      <li>Environmental suitability: Appropriate IP ratings and material selection</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Earthing and bonding verification:</strong> Critical safety system inspection and validation.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Main earthing connections: Secure, accessible, and properly identified connections</li>
                      <li>Equipotential bonding: All required metalwork bonded with appropriate conductors</li>
                      <li>Circuit protective conductors: Continuous throughout installation with proper termination</li>
                      <li>Bonding continuity: Visual verification of effective electrical connection</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Methodical progression:</strong> Work systematically to avoid missing critical safety elements
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="safe-zones-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
          <Separator className="my-6" />

          {/* Documentation Requirements */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Comprehensive Documentation and Reporting Standards</h3>
            <p className="text-base text-foreground mb-4">
              Accurate documentation ensures traceability, supports certification, and maintains quality standards:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-emerald-400 mb-1">Professional Documentation and Quality Assurance</p>
                    <p className="text-base text-foreground mb-2"><strong>Observation recording standards:</strong> Clear, accurate, and comprehensive defect documentation.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Location specification: Precise identification of defect location for rectification</li>
                      <li>Description accuracy: Clear description of defect nature and potential consequences</li>
                      <li>Photographic evidence: Visual documentation supporting written observations</li>
                      <li>Reference standards: Citation of relevant regulations or standards violated</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Defect categorisation system:</strong> Systematic classification based on safety and compliance impact.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Dangerous: Immediate risk to safety requiring urgent action before any further work</li>
                      <li>Requires improvement: Non-compliance with regulations requiring correction before certification</li>
                      <li>Minor: Aesthetic or minor non-compliance issues that should be addressed</li>
                      <li>Recommendation: Suggestions for improvement beyond minimum compliance requirements</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Certification and sign-off procedures:</strong> Formal completion and accountability processes.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Inspector identification: Clear identification of qualified person conducting inspection</li>
                      <li>Date and time recording: Accurate timing for audit trail and scheduling purposes</li>
                      <li>Scope documentation: Clear statement of areas and systems inspected</li>
                      <li>Limitation identification: Any areas not inspected or requiring further investigation</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Communication and follow-up protocols:</strong> Ensuring appropriate action on inspection findings.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Immediate notifications: Prompt communication of dangerous conditions to relevant personnel</li>
                      <li>Rectification scheduling: Planning and coordination of defect correction activities</li>
                      <li>Progress monitoring: Tracking correction work and verification of completion</li>
                      <li>Final verification: Confirmation that all identified defects have been properly addressed</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Legal importance:</strong> Documentation provides evidence of due diligence and supports certification
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Practical Guidance</h2>
          
          {/* Tools and Equipment */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Essential Tools and Equipment for Effective Inspection</h3>
            <div className="space-y-4">
              <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
                <p className="font-medium text-foreground mb-2">Required Tools and Equipment</p>
                <ul className="text-xs sm:text-sm text-foreground space-y-1 list-disc pl-4">
                  <li>High-quality torch or headlamp for illuminating dark spaces and recesses</li>
                  <li>Inspection mirror for viewing inaccessible areas behind accessories and in tight spaces</li>
                  <li>Basic screwdriver set for opening enclosures and checking connection security</li>
                  <li>Digital camera or smartphone for documenting defects and installation details</li>
                  <li>Measuring tape for verifying spacing, heights, and safe zone compliance</li>
                  <li>Safety equipment including safety glasses and appropriate protective clothing</li>
                </ul>
              </div>

              <div className="rounded-lg p-4 bg-card border border-green-400/30">
                <p className="font-medium text-foreground mb-2">Professional Inspection Techniques</p>
                <ul className="text-xs sm:text-sm text-foreground space-y-1 list-disc pl-4">
                  <li>Maintain systematic approach - work left to right or top to bottom consistently</li>
                  <li>Use adequate lighting to identify defects that may not be visible in normal conditions</li>
                  <li>Document findings immediately using photographs and written notes</li>
                  <li>Check manufacturer data sheets for specific installation requirements</li>
                  <li>Verify compliance with latest edition of BS 7671 and any amendments</li>
                  <li>Communicate findings clearly to installation team and project management</li>
                </ul>
              </div>

              <div className="rounded-lg p-4 bg-card border border-amber-400/30">
                <p className="font-medium text-foreground mb-2">Quality Assurance Checklist</p>
                <ol className="text-xs sm:text-sm text-foreground space-y-1 list-decimal pl-4">
                  <li>Are all accessories securely fixed with no movement or damage visible?</li>
                  <li>Are grommets or bushes fitted at all cable entry points into enclosures?</li>
                  <li>Are all circuit protective conductors (CPCs) properly terminated and secure?</li>
                  <li>Is the cable type appropriate for the installation environment and application?</li>
                  <li>Are all circuits properly identified with clear, durable labelling systems?</li>
                  <li>Is the installation free from any signs of damage, overheating, or deterioration?</li>
                </ol>
              </div>
            </div>
          </section>
        </Card>

        {/* What this means on site */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">What this means on site</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-4">
              <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
                <h3 className="font-medium text-foreground mb-2">Immediate Actions</h3>
                <ul className="text-xs sm:text-sm text-foreground space-y-1 list-disc pl-4">
                  <li>Schedule visual inspection before any electrical testing begins</li>
                  <li>Ensure adequate lighting and access for comprehensive examination</li>
                  <li>Prepare documentation sheets and photographic equipment</li>
                  <li>Coordinate with other trades to avoid interference during inspection</li>
                </ul>
              </div>
              <div className="rounded-lg p-4 bg-card border border-green-400/30">
                <h3 className="font-medium text-foreground mb-2">Quality Control Measures</h3>
                <ul className="text-xs sm:text-sm text-foreground space-y-1 list-disc pl-4">
                  <li>Use systematic approach to avoid missing critical areas</li>
                  <li>Document all findings with precise location information</li>
                  <li>Categorise defects by severity for appropriate prioritisation</li>
                  <li>Maintain clear communication channels for defect rectification</li>
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-lg p-4 bg-card border border-amber-400/30">
                <h3 className="font-medium text-foreground mb-2">Risk Management</h3>
                <ul className="text-xs sm:text-sm text-foreground space-y-1 list-disc pl-4">
                  <li>Stop all work if dangerous conditions are identified</li>
                  <li>Report safety hazards immediately to site management</li>
                  <li>Secure areas where dangerous defects have been identified</li>
                  <li>Ensure no energisation until all defects are rectified</li>
                </ul>
              </div>
              <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
                <h3 className="font-medium text-foreground mb-2">Project Coordination</h3>
                <ul className="text-xs sm:text-sm text-foreground space-y-1 list-disc pl-4">
                  <li>Schedule defect rectification to minimise project delays</li>
                  <li>Coordinate with suppliers for any replacement materials needed</li>
                  <li>Plan re-inspection following defect correction</li>
                  <li>Maintain project documentation for certification purposes</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Installation Practices */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Installation Practices</h2>
          <div className="space-y-6">
            <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
              <h3 className="font-medium text-green-600 dark:text-green-400 mb-3">Best Practice Implementation</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-foreground mb-2">Pre-inspection Preparation</p>
                  <ul className="text-xs sm:text-sm text-foreground space-y-1 list-disc pl-4">
                    <li>Ensure installation is complete and ready for inspection</li>
                    <li>Verify all covers and accessories are fitted</li>
                    <li>Confirm adequate access to all areas requiring inspection</li>
                    <li>Check availability of relevant drawings and specifications</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-2">Systematic Inspection Process</p>
                  <ul className="text-xs sm:text-sm text-foreground space-y-1 list-disc pl-4">
                    <li>Follow logical sequence from main board to final circuits</li>
                    <li>Use checklist to ensure comprehensive coverage</li>
                    <li>Document findings immediately to avoid errors</li>
                    <li>Take photographs for evidence and clarification</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
              <h3 className="font-medium text-emerald-400 dark:text-emerald-400 mb-3">Professional Standards</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-foreground mb-2">Documentation Excellence</p>
                  <ul className="text-xs sm:text-sm text-foreground space-y-1 list-disc pl-4">
                    <li>Record all observations clearly and accurately</li>
                    <li>Use industry-standard terminology consistently</li>
                    <li>Provide specific location details for all defects</li>
                    <li>Include recommendations for improvement</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-2">Communication Protocols</p>
                  <ul className="text-xs sm:text-sm text-foreground space-y-1 list-disc pl-4">
                    <li>Report dangerous conditions immediately</li>
                    <li>Discuss findings with installation team</li>
                    <li>Coordinate rectification work scheduling</li>
                    <li>Confirm completion of corrective actions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Common Mistakes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Common Mistakes</h2>
          <div className="space-y-4">
            <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
              <h3 className="font-medium text-red-600 dark:text-emerald-400 mb-3">Inspection Process Errors</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-foreground mb-2">❌ Avoid These Mistakes:</p>
                  <ul className="text-xs sm:text-sm text-foreground space-y-1 list-disc pl-4">
                    <li>Rushing inspection to meet deadlines</li>
                    <li>Inadequate lighting during examination</li>
                    <li>Missing areas due to poor access preparation</li>
                    <li>Failing to document minor defects properly</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-2">✅ Do This Instead:</p>
                  <ul className="text-xs sm:text-sm text-foreground space-y-1 list-disc pl-4">
                    <li>Allow adequate time for thorough inspection</li>
                    <li>Use proper lighting and inspection tools</li>
                    <li>Ensure complete access before starting</li>
                    <li>Record all findings regardless of severity</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-lg p-4 bg-card border border-amber-400/30">
              <h3 className="font-medium text-amber-600 dark:text-amber-400 mb-3">Documentation and Communication Errors</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-foreground mb-2">❌ Poor Practices:</p>
                  <ul className="text-xs sm:text-sm text-foreground space-y-1 list-disc pl-4">
                    <li>Vague or incomplete defect descriptions</li>
                    <li>Failing to categorise defects by severity</li>
                    <li>Poor quality photographic evidence</li>
                    <li>Delayed reporting of dangerous conditions</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-2">✅ Professional Approach:</p>
                  <ul className="text-xs sm:text-sm text-foreground space-y-1 list-disc pl-4">
                    <li>Provide clear, specific defect descriptions</li>
                    <li>Properly categorise all findings</li>
                    <li>Take clear, well-lit photographs</li>
                    <li>Report dangerous conditions immediately</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* BS 7671 Context */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">BS 7671 Context</h2>
          <div className="space-y-4">
            <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/20">
              <h3 className="font-medium text-foreground mb-2">Key Regulatory Requirements</h3>
              <ul className="text-xs sm:text-sm text-foreground space-y-2 list-disc pl-4">
                <li><strong>Regulation 611.3:</strong> Visual inspection shall precede testing and be carried out with the installation de-energised</li>
                <li><strong>Chapter 61:</strong> Initial verification requirements including visual inspection and testing procedures</li>
                <li><strong>Regulation 132.16:</strong> Accessibility for inspection, testing, and maintenance throughout installation life</li>
                <li><strong>Part 5:</strong> Selection and erection of equipment affecting visual inspection requirements</li>
                <li><strong>Regulation 514.9:</strong> Identification and marking requirements for circuits and equipment</li>
              </ul>
            </div>
            <div className="rounded-lg p-4 bg-card border border-green-400/30">
              <h3 className="font-medium text-green-600 dark:text-green-400 mb-2">Compliance Verification Points</h3>
              <ul className="text-xs sm:text-sm text-foreground space-y-2 list-disc pl-4">
                <li>Verification that installation methods comply with manufacturer instructions</li>
                <li>Confirmation of appropriate IP ratings for environmental conditions</li>
                <li>Assessment of cable support spacing against Table 4A2A requirements</li>
                <li>Verification of safe zone compliance per Section 522.6</li>
                <li>Confirmation of proper earthing and bonding arrangements per Chapter 54</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Real-world Scenarios */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Real-world Scenario</h2>
          <div className="space-y-4">
            <div className="rounded-lg p-5 border-l-4 border-l-amber-500 bg-card">
              <h3 className="font-medium text-amber-600 dark:text-amber-400 mb-3">Housing Development Project - Critical Defect Prevention</h3>
              <div className="space-y-3">
                <p className="text-base text-foreground">
                  <strong>Situation:</strong> During a large housing development project, visual inspection was scheduled before the electrical testing phase. The inspection was being conducted across 30 properties simultaneously to meet tight completion deadlines.
                </p>
                <p className="text-base text-foreground">
                  <strong>Discovery:</strong> The visual inspection revealed that several socket back boxes throughout multiple properties were missing grommets at cable entry holes. This defect was consistent across multiple properties, suggesting a systematic installation error.
                </p>
                <p className="text-base text-foreground">
                  <strong>Immediate Action:</strong> All electrical work was halted, and a comprehensive site survey was conducted to identify the extent of the problem. The installation team was briefed on proper grommet installation procedures.
                </p>
                <p className="text-base text-foreground">
                  <strong>Resolution:</strong> All affected socket boxes were retrofitted with appropriate grommets before testing commenced. Additional quality checks were implemented for the remaining properties.
                </p>
                <p className="text-base text-foreground">
                  <strong>Outcome:</strong> The early identification during visual inspection prevented potential long-term insulation damage, safety hazards, and costly post-testing rework. The project ultimately completed on time with improved quality standards.
                </p>
                <div className="rounded-lg p-3 bg-card border border-green-400/30 mt-3">
                  <p className="text-xs sm:text-sm text-foreground font-medium">
                    💡 Key Learning: Visual inspection acts as a critical quality gate, preventing systemic issues from progressing to later stages where rectification becomes more expensive and time-consuming.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Frequently Asked Questions */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="rounded-lg p-4 bg-muted/30 border border-border/20">
                <h3 className="font-medium text-foreground mb-2">Q: {faq.question}</h3>
                <p className="text-xs sm:text-sm text-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Summary</h2>
          <div className="space-y-4">
            <p className="text-base text-foreground">
              Visual inspection forms the foundation of electrical installation verification, providing the first line of defence against safety hazards and non-compliance issues. By systematically examining installations before testing begins, potential problems are identified early when correction is most cost-effective.
            </p>
            
            <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
              <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
                <h3 className="font-medium text-emerald-400 dark:text-emerald-400 mb-2">Key Benefits</h3>
                <ul className="text-xs sm:text-sm text-foreground space-y-1 list-disc pl-4">
                  <li>Early defect identification</li>
                  <li>Cost-effective problem resolution</li>
                  <li>Enhanced safety standards</li>
                  <li>Regulatory compliance assurance</li>
                </ul>
              </div>
              <div className="rounded-lg p-4 bg-card border border-green-400/30">
                <h3 className="font-medium text-green-600 dark:text-green-400 mb-2">Critical Success Factors</h3>
                <ul className="text-xs sm:text-sm text-foreground space-y-1 list-disc pl-4">
                  <li>Systematic approach</li>
                  <li>Proper documentation</li>
                  <li>Immediate action on defects</li>
                  <li>Clear communication</li>
                </ul>
              </div>
              <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
                <h3 className="font-medium text-purple-600 dark:text-emerald-400 mb-2">Quality Outcomes</h3>
                <ul className="text-xs sm:text-sm text-foreground space-y-1 list-disc pl-4">
                  <li>Safer installations</li>
                  <li>Reduced rework costs</li>
                  <li>Improved project timelines</li>
                  <li>Professional standards</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Apprentice Do's and Don'ts */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Apprentice Do's and Don'ts</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-3">
              <h3 className="font-medium text-green-600 dark:text-green-400">✅ DO</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Follow systematic inspection sequence from main board to final circuits
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Document all findings immediately with clear location details
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Use proper lighting and inspection tools for comprehensive examination
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Report dangerous conditions immediately to supervisor
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Take photographs for evidence and future reference
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-medium text-red-600 dark:text-emerald-400">❌ DON'T</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  Rush inspection process to meet deadlines - quality is paramount
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  Skip areas that are difficult to access - use proper equipment
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  Assume minor defects can be ignored - document everything
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  Proceed with testing if dangerous conditions are found
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  Rely on memory for documentation - record findings immediately
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Pocket Card Quick Reference */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Pocket Card Quick Reference</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/20">
              <h3 className="font-medium text-foreground mb-3">Visual Inspection Checklist</h3>
              <ul className="text-xs text-foreground space-y-1 list-disc pl-4">
                <li>✓ All accessories securely fixed and properly aligned</li>
                <li>✓ Grommets fitted at all cable entry points</li>
                <li>✓ No exposed copper conductors visible</li>
                <li>✓ Cables routed in safe zones with adequate support</li>
                <li>✓ IP ratings appropriate for location</li>
                <li>✓ Circuit identification clear and accurate</li>
                <li>✓ Earthing and bonding connections secure</li>
                <li>✓ No signs of damage or overheating</li>
              </ul>
            </div>
            <div className="rounded-lg p-4 bg-card border border-green-400/30">
              <h3 className="font-medium text-green-600 dark:text-green-400 mb-3">Essential Tools</h3>
              <ul className="text-xs text-foreground space-y-1 list-disc pl-4">
                <li>🔦 High-quality torch or headlamp</li>
                <li>🪞 Inspection mirror for tight spaces</li>
                <li>🔧 Basic screwdriver set</li>
                <li>📷 Camera for documentation</li>
                <li>📏 Measuring tape for verification</li>
                <li>🦺 Safety equipment and PPE</li>
                <li>📋 Inspection sheets and clipboard</li>
                <li>🏷️ Labels for marking defects</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Key References */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Key References</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-foreground mb-2">Regulatory Standards</h3>
              <ul className="text-xs sm:text-sm text-foreground space-y-1 list-disc pl-4">
                <li>BS 7671:2018+A2:2022 - Wiring Regulations</li>
                <li>Electricity at Work Regulations 1989</li>
                <li>Building Regulations Part P</li>
                <li>Health and Safety at Work Act 1974</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">Guidance Documents</h3>
              <ul className="text-xs sm:text-sm text-foreground space-y-1 list-disc pl-4">
                <li>IET Guidance Note 3 - Inspection & Testing</li>
                <li>IET On-Site Guide</li>
                <li>City & Guilds 2391 Course Materials</li>
                <li>NICEIC Technical Bulletins</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Knowledge Check */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Knowledge Check</h2>
          <Quiz questions={quizQuestions} />
        </Card>

        {/* Navigation */}
        <div className="flex justify-between pt-8 border-t border-border/20">
          <Button asChild variant="outline">
            <Link to="../5-8" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
          </Button>
          <Button asChild>
            <Link to="../6-2" className="flex items-center gap-2">
              Next
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module4Section6_1;