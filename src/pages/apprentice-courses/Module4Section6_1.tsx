import { ArrowLeft, ArrowRight, Eye, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Performing a Visual Inspection - Module 4.6.1 | Level 2 Electrical Course";
const DESCRIPTION = "Master systematic visual inspection techniques for electrical installations. Learn to identify defects, ensure compliance with BS 7671, and maintain safety standards before testing begins.";

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
      options: ["After testing", "Before testing", "After energisation", "Only for domestic work"],
      correctAnswer: 1,
      explanation: "BS 7671 Regulation 611.3 clearly states that visual inspection shall precede testing to identify defects before energisation."
    },
    {
      id: 2,
      question: "Name one tool commonly used in visual inspections.",
      options: ["Torch", "Multimeter", "Insulation tester", "Clamp meter"],
      correctAnswer: 0,
      explanation: "A torch is essential for visual inspections to illuminate areas and identify defects that may not be visible in normal lighting."
    },
    {
      id: 3,
      question: "What is the main regulatory reference for visual inspections?",
      options: ["BS 5839", "BS 7671", "BS EN 50200", "BS 5266"],
      correctAnswer: 1,
      explanation: "BS 7671 is the main regulatory standard for electrical installations, including requirements for visual inspections."
    },
    {
      id: 4,
      question: "True or False: Visual inspections can identify electrical faults that cannot be seen.",
      options: ["True", "False", "Only sometimes", "Only with special equipment"],
      correctAnswer: 1,
      explanation: "False - Visual inspections only identify defects that can be seen. Electrical faults like insulation breakdown require testing."
    },
    {
      id: 5,
      question: "List two common defects a visual inspection might reveal.",
      options: ["Missing grommets and exposed copper conductors", "High resistance and earth faults", "Voltage fluctuations and power surges", "Frequency variations and harmonics"],
      correctAnswer: 0,
      explanation: "Missing grommets and exposed copper conductors are visible defects that compromise safety and can be identified during visual inspection."
    },
    {
      id: 6,
      question: "Why is it important to check for grommets or bushes at cable entries?",
      options: ["To prevent damage to cable insulation from sharp edges", "To improve aesthetics", "To reduce installation time", "To comply with colour coding"],
      correctAnswer: 0,
      explanation: "Grommets and bushes protect cable insulation from damage caused by sharp metal edges at entry points, preventing potential safety hazards."
    },
    {
      id: 7,
      question: "What should you do if a defect is classified as dangerous?",
      options: ["Continue with testing", "Stop work, report, and make the area safe", "Record it and continue", "Inform the client later"],
      correctAnswer: 1,
      explanation: "Dangerous defects require immediate action - stop work, report to supervisor, and make the area safe before proceeding."
    },
    {
      id: 8,
      question: "True or False: A visual inspection can be skipped if the installer is confident in their work.",
      options: ["True", "False", "Only for simple installations", "Only for experienced installers"],
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
              Back to Section 6
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
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 4</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 6.1</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Performing a Visual Inspection
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Master systematic visual inspection techniques to ensure electrical installations are safe, compliant, and ready for testing
            </p>
          </header>

          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Introduction
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 text-white/80 leading-relaxed">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow mb-2">In 30 Seconds</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Visual inspection is the mandatory first step before electrical testing begins</li>
                  <li>It identifies visible defects and ensures compliance with BS 7671 requirements</li>
                  <li>Systematic inspection prevents costly rework and ensures safety standards</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow mb-2">Spot it / Use it</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li><strong>Spot:</strong> Damaged components, incorrect installations, missing safety features</li>
                  <li><strong>Use:</strong> Systematic approach, proper documentation, categorisation methods</li>
                  <li><strong>Check:</strong> Compliance with regulations, safety standards, quality requirements</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Learning Outcomes
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-white/80 leading-relaxed">
              <li>Explain the purpose and regulatory requirements of visual inspection in electrical installation work</li>
              <li>Identify common defects and safety hazards that can be detected through visual examination</li>
              <li>Follow a structured, systematic approach to carry out compliant visual inspections</li>
              <li>Record findings accurately using appropriate documentation and categorisation methods</li>
              <li>Understand when to halt further work due to visual inspection failures and safety concerns</li>
            </ul>
          </section>

          {/* Purpose and Regulatory Framework */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Purpose and Regulatory Framework
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Visual inspection forms the foundation of electrical installation verification, ensuring safety and compliance before energisation.</p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-white mb-2">Regulatory Requirements and Compliance</p>
                <p className="text-sm mb-2"><strong>BS 7671 compliance verification:</strong> Ensuring installations meet current wiring regulations.</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Regulation 611.3: Visual inspection shall precede testing and be carried out with the installation de-energised</li>
                  <li>Verification of compliance with Chapters 13-15 of BS 7671 covering design and installation requirements</li>
                  <li>Confirmation that installation methods align with manufacturer instructions and guidance notes</li>
                  <li>Assessment of workmanship standards against industry best practice and regulatory expectations</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-green-500/50">
                <p className="font-medium text-white mb-2">Safety Standard Verification</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Identification of immediate danger conditions requiring urgent attention</li>
                  <li>Verification of protection against electric shock through proper installation methods</li>
                  <li>Assessment of fire risk factors including proper cable support and containment</li>
                  <li>Confirmation of environmental protection appropriate to installation location</li>
                </ul>
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

          {/* What to Look For */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Comprehensive Defect Identification
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Systematic examination of all installation elements ensures comprehensive defect identification.</p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-white mb-2">Accessory Verification</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Socket outlets: Correct type for location, proper earthing, secure mounting, and appropriate IP rating</li>
                  <li>Switches: Correct rating for load, proper orientation, secure fixing, and appropriate height</li>
                  <li>Light fittings: Suitable for environment, correctly supported, and proper lamp compatibility</li>
                  <li>Distribution boards: Appropriate size, correct labelling, and secure cable terminations</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-blue-500/50">
                <p className="font-medium text-white mb-2">Cable Installation Assessment</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Safe zone compliance: Cables routed in prescribed zones to prevent accidental damage</li>
                  <li>Support spacing: Adequate fixings at intervals compliant with BS 7671 requirements</li>
                  <li>Bend radius protection: Cables not subject to excessive bending or stress</li>
                  <li>Environmental suitability: Cable types appropriate for installation conditions</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-purple-500/50">
                <p className="font-medium text-white mb-2">Termination Quality Control</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>No exposed copper: All live conductors properly insulated with no bare metal visible</li>
                  <li>Proper cable preparation: Correct stripping lengths and undamaged conductor cores</li>
                  <li>Secure connections: All terminations tight and properly secured according to manufacturer specifications</li>
                  <li>Correct polarity: Live, neutral, and earth conductors connected to appropriate terminals</li>
                </ul>
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

          {/* Inspection Sequence */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Systematic Inspection Methodology
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Following a structured sequence ensures comprehensive coverage and maintains safety throughout inspection.</p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-green-500/50">
                <p className="font-medium text-white mb-2">Origin and Distribution Assessment</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Main supply connection: Verify proper earthing, bonding, and supply characteristics</li>
                  <li>Consumer unit inspection: Check RCD operation, MCB ratings, and circuit identification</li>
                  <li>Circuit distribution: Follow each circuit from origin to final connection point</li>
                  <li>Sub-distribution verification: Additional boards correctly fed and protected</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-white mb-2">Earthing and Bonding Verification</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Main earthing connections: Secure, accessible, and properly identified connections</li>
                  <li>Equipotential bonding: All required metalwork bonded with appropriate conductors</li>
                  <li>Circuit protective conductors: Continuous throughout installation with proper termination</li>
                  <li>Bonding continuity: Visual verification of effective electrical connection</li>
                </ul>
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

          {/* Documentation Requirements */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Documentation and Reporting Standards
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Accurate documentation ensures traceability, supports certification, and maintains quality standards.</p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-purple-500/50">
                <p className="font-medium text-white mb-2">Defect Categorisation System</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li><strong>Dangerous:</strong> Immediate risk to safety requiring urgent action before any further work</li>
                  <li><strong>Requires improvement:</strong> Non-compliance with regulations requiring correction before certification</li>
                  <li><strong>Minor:</strong> Aesthetic or minor non-compliance issues that should be addressed</li>
                  <li><strong>Recommendation:</strong> Suggestions for improvement beyond minimum compliance requirements</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
                <p className="text-sm text-amber-200"><strong>Legal importance:</strong> Documentation provides evidence of due diligence and supports certification</p>
              </div>
            </div>
          </section>

          {/* Essential Tools */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Essential Tools and Equipment
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-white mb-2">Required Tools</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>High-quality torch or headlamp for illuminating dark spaces and recesses</li>
                  <li>Inspection mirror for viewing inaccessible areas behind accessories and in tight spaces</li>
                  <li>Basic screwdriver set for opening enclosures and checking connection security</li>
                  <li>Digital camera or smartphone for documenting defects and installation details</li>
                  <li>Measuring tape for verifying spacing, heights, and safe zone compliance</li>
                  <li>Safety equipment including safety glasses and appropriate protective clothing</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Real-World Scenario */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Real-World Scenario
            </h2>
            <div className="p-4 rounded-lg bg-amber-500/10 border-l-2 border-amber-500/50">
              <p className="font-medium text-white mb-2">Housing Development Project - Critical Defect Prevention</p>
              <div className="text-white/80 text-sm space-y-2">
                <p><strong>Situation:</strong> During a large housing development project, visual inspection was scheduled before the electrical testing phase across 30 properties simultaneously.</p>
                <p><strong>Discovery:</strong> The visual inspection revealed that several socket back boxes throughout multiple properties were missing grommets at cable entry holes - a systematic installation error.</p>
                <p><strong>Resolution:</strong> All affected socket boxes were retrofitted with appropriate grommets before testing commenced. Additional quality checks were implemented.</p>
                <p><strong>Outcome:</strong> Early identification prevented potential long-term insulation damage, safety hazards, and costly post-testing rework.</p>
              </div>
            </div>
          </section>

          {/* BS 7671 Context */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">09</span>
              BS 7671 Context
            </h2>
            <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
              <p className="font-medium text-white mb-2">Key Regulatory Requirements</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-white/80">
                <li><strong>Regulation 611.3:</strong> Visual inspection shall precede testing and be carried out with the installation de-energised</li>
                <li><strong>Chapter 61:</strong> Initial verification requirements including visual inspection and testing procedures</li>
                <li><strong>Regulation 132.16:</strong> Accessibility for inspection, testing, and maintenance throughout installation life</li>
                <li><strong>Part 5:</strong> Selection and erection of equipment affecting visual inspection requirements</li>
                <li><strong>Regulation 514.9:</strong> Identification and marking requirements for circuits and equipment</li>
              </ul>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">10</span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-2">Q: {faq.question}</p>
                  <p className="text-sm text-white/70">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Apprentice Do's and Don'ts */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">11</span>
              Apprentice Do's and Don'ts
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <p className="font-medium text-green-400 mb-3">DO</p>
                <ul className="space-y-2 text-sm text-white/80">
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
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <p className="font-medium text-red-400 mb-3">DON'T</p>
                <ul className="space-y-2 text-sm text-white/80">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    Rush inspection process to meet deadlines - quality is paramount
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    Skip areas that are difficult to access - use proper equipment
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    Assume minor defects can be ignored - document everything
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    Proceed with testing if dangerous conditions are found
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    Rely on memory for documentation - record findings immediately
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Summary */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">12</span>
              Summary
            </h2>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-white/80 leading-relaxed">
                Visual inspection forms the foundation of electrical installation verification, providing the first line of defence against safety hazards and non-compliance issues. By systematically examining installations before testing begins, potential problems are identified early when correction is most cost-effective. Following BS 7671 requirements ensures that installations are safe, compliant, and ready for energisation.
              </p>
            </div>
          </section>

          {/* Quiz */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">13</span>
              Knowledge Check
            </h2>
            <Quiz questions={quizQuestions} />
          </section>

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../5-8">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Common Faults and Corrections
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../6-2">
                Next: Continuity and Polarity Checks
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module4Section6_1;
