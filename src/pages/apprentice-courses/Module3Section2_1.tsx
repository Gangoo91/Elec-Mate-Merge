import useSEO from "@/hooks/useSEO";
import {
  ArrowLeft,
  Shield,
  AlertTriangle,
  Factory,
  Home,
  Zap,
  Building,
  Target,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import React from "react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const TITLE = "Purpose of Containment - Module 3.2.1 | Level 2 Electrical Course";
const DESCRIPTION = "Purposes of cable containment: protection, organisation, compliance and maintenance. BS 7671 aligned.";

const quickCheckQuestions = [
  {
    id: "containment-safety",
    question: "Name two ways containment improves safety.",
    options: [
      "Mechanical protection and environmental protection",
      "Faster installation and lower costs",
      "Higher voltage rating and bigger conductors",
    ],
    correctIndex: 0,
    explanation:
      "Containment improves safety through mechanical protection (preventing damage from impacts) and environmental protection (shielding from moisture, dust, etc.)",
  },
  {
    id: "containment-maintenance",
    question: "Why is cable containment important for future maintenance?",
    options: [
      "It reduces installation costs",
      "It makes cables easier to access and replace without damaging structures",
      "It increases current capacity",
    ],
    correctIndex: 1,
    explanation:
      "Containment provides organised access routes that allow cables to be maintained, replaced, or added without damaging building structures or other installations.",
  },
  {
    id: "containment-environment",
    question: "Give one environmental factor that containment can protect against.",
    options: [
      "Low voltage",
      "Moisture, dust, heat, or UV exposure",
      "Electromagnetic interference only",
    ],
    correctIndex: 1,
    explanation:
      "Containment systems protect cables from various environmental hazards including moisture, dust, extreme temperatures, and UV radiation.",
  },
  {
    id: "containment-compliance",
    question: "Which BS 7671 regulation covers external influences on cables?",
    options: [
      "Section 522",
      "Section 434",
      "Section 711",
    ],
    correctIndex: 0,
    explanation:
      "Section 522 of BS 7671 covers external influences and the selection of appropriate wiring systems for different environmental conditions.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the primary reason for using cable containment?",
    options: [
      "To make installation faster",
      "To protect cables from damage and maintain safety",
      "To reduce cable cost",
      "To avoid testing circuits",
    ],
    correctAnswer: 1,
    explanation:
      "The primary purpose of cable containment is to protect cables from damage and maintain safety through mechanical and environmental protection.",
  },
  {
    id: 2,
    question: "Which of the following is NOT a function of containment?",
    options: [
      "Mechanical protection",
      "Environmental protection",
      "Increasing conductor size",
      "Organisation of cable runs",
    ],
    correctAnswer: 2,
    explanation:
      "Containment does not increase conductor size - it provides protection, organisation, and environmental shielding for existing cables.",
  },
  {
    id: 3,
    question:
      "True or False: Containment can help reduce electromagnetic interference between power and data cables.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. Proper containment allows for separation of different cable types, reducing electromagnetic interference between power and data cables.",
  },
  {
    id: 4,
    question: "Name one situation where containment is legally required.",
    options: [
      "All domestic installations",
      "Public spaces and industrial environments",
      "Only underground installations",
      "Temporary installations only",
    ],
    correctAnswer: 1,
    explanation:
      "Containment is legally required in public spaces and industrial environments where cables need protection from tampering, damage, or environmental hazards.",
  },
  {
    id: 5,
    question: "Which material offers the highest mechanical protection in most installations?",
    options: ["PVC", "Steel", "Aluminium foil", "Rubber"],
    correctAnswer: 1,
    explanation:
      "Steel provides the highest mechanical protection due to its strength and durability, making it ideal for industrial and high-risk environments.",
  },
  {
    id: 6,
    question: "Why does containment improve future maintenance?",
    options: [
      "It makes cables easier to locate and replace without damaging walls",
      "It reduces circuit breaker ratings",
      "It increases insulation resistance",
      "It lowers voltage drop",
    ],
    correctAnswer: 0,
    explanation:
      "Containment systems allow easier access to cables for maintenance, replacement, and additions without damage to building structures.",
  },
  {
    id: 7,
    question:
      "Give one example of an environmental hazard that containment can protect against.",
    options: [
      "Electromagnetic fields only",
      "Moisture, dust, heat, or UV light",
      "Low voltage only",
      "Circuit overloads",
    ],
    correctAnswer: 1,
    explanation:
      "Containment protects against various environmental hazards including moisture, dust, heat, UV light, and other external influences.",
  },
  {
    id: 8,
    question: "Which regulation sets requirements for cable containment in the UK?",
    options: ["BS 7909", "BS 7671 (IET Wiring Regulations)", "BS 5839", "BS 6701"],
    correctAnswer: 1,
    explanation:
      "BS 7671 (IET Wiring Regulations) sets the requirements for cable containment and protection against external influences in UK electrical installations.",
  },
];

const faqs = [
  {
    question: "Can containment be decorative as well as functional?",
    answer: "Yes - certain containment systems are designed for both aesthetic appeal and performance, especially in commercial interiors.",
  },
  {
    question: "Is containment always needed for domestic installations?",
    answer: "Not always, but it is recommended in exposed areas or where mechanical protection is needed.",
  },
  {
    question: "Does containment improve fire safety?",
    answer: "Yes - appropriate supports and containment can prevent premature collapse of wiring and help maintain escape routes during a fire.",
  },
];

const Module3Section2_1: React.FC = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 3.2.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Purpose of Containment in Electrical Installations
          </h1>
          <p className="text-white/80">
            Understanding the role of containment in protection, organisation, compliance and maintenance
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li>Protects cables from mechanical and environmental damage</li>
              <li>Keeps runs neat and segregates power/data to reduce EMI</li>
              <li>Supports BS 7671 and fire safety (secure fixings)</li>
              <li>Simplifies inspection, testing and future changes</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Cables in PVC/steel conduit, trunking or tray</li>
              <li><strong>Use:</strong> Public and industrial areas, outdoors, mixed services</li>
              <li><strong>Check:</strong> Supports, segregation, fill and environmental suitability</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the primary purposes of cable containment in electrical installations",
              "Identify situations where containment is required",
              "Recognise how containment supports safety, maintenance and compliance",
              "Distinguish between methods for different environments"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 1: Main Purposes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Main Purposes of Cable Containment
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Cable containment serves multiple critical functions in electrical installations, providing protection,
              organisation, and compliance with safety standards.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 my-6">
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white text-sm mb-1">a) Mechanical protection</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>Shields against knocks, crushing and abrasion</li>
                  <li>Essential near vehicles, machinery or public access</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-green-500/10 border border-green-400/20">
                <p className="font-medium text-white text-sm mb-1">b) Environmental protection</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>Protects from moisture, dust, heat and UV</li>
                  <li>Prevents premature sheath degradation</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white text-sm mb-1">c) Organisation and routing</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>Neat runs, easy tracing and safe segregation</li>
                  <li>Separates power, data and control to limit EMI</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white text-sm mb-1">d) Safety compliance</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>Meets BS 7671 protection against external influences</li>
                  <li>Supports fire safety via secure fixings to prevent collapse</li>
                </ul>
              </div>
            </div>

            <div className="p-3 rounded bg-amber-500/10 border border-amber-400/20">
              <p className="font-medium text-white text-sm mb-1">e) Maintenance and future-proofing</p>
              <ul className="text-xs text-white/80 space-y-1">
                <li>Easier additions, removals and replacements</li>
                <li>Clear circuit identification during inspection</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: When Required */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            When Containment is Required
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Containment is required in various situations to meet regulatory requirements and ensure safety.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 my-6">
              <div className="p-3 rounded bg-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <Building className="w-4 h-4 text-elec-yellow" />
                  <span className="font-medium text-elec-yellow text-sm">Public spaces</span>
                </div>
                <p className="text-xs text-white/80">Prevents tampering or accidental damage</p>
              </div>
              <div className="p-3 rounded bg-green-500/10 border border-green-400/20">
                <div className="flex items-center gap-2 mb-2">
                  <Factory className="w-4 h-4 text-green-300" />
                  <span className="font-medium text-green-300 text-sm">Industrial environments</span>
                </div>
                <p className="text-xs text-white/80">Protection against mechanical hazards</p>
              </div>
              <div className="p-3 rounded bg-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <Home className="w-4 h-4 text-elec-yellow" />
                  <span className="font-medium text-elec-yellow text-sm">Outdoor runs</span>
                </div>
                <p className="text-xs text-white/80">Protection from weather and UV light</p>
              </div>
              <div className="p-3 rounded bg-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-elec-yellow" />
                  <span className="font-medium text-elec-yellow text-sm">Power and data</span>
                </div>
                <p className="text-xs text-white/80">Segregation to reduce electromagnetic interference</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Common Mistakes */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Common Mistakes and How to Avoid Them
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="p-3 rounded bg-white/5">
              <p className="font-medium text-elec-yellow text-sm mb-2">Poor segregation of power and data cables</p>
              <ul className="text-xs text-white/80 space-y-1">
                <li>Running power and data cables in the same containment without barriers</li>
                <li>Causes electromagnetic interference affecting data transmission</li>
                <li><strong>Solution:</strong> Use separate compartments or maintain minimum separation distances per BS 7671</li>
              </ul>
            </div>

            <div className="p-3 rounded bg-amber-500/10 border border-amber-400/20">
              <p className="font-medium text-amber-300 text-sm mb-2">Insufficient support and fixings</p>
              <ul className="text-xs text-white/80 space-y-1">
                <li>Containment sagging due to inadequate support spacing</li>
                <li>Risk of premature collapse during fire conditions</li>
                <li><strong>Solution:</strong> Follow manufacturer guidelines for maximum support intervals (typically 1.2m for steel trunking)</li>
              </ul>
            </div>

            <div className="p-3 rounded bg-white/5">
              <p className="font-medium text-elec-yellow text-sm mb-2">Overfilling containment systems</p>
              <ul className="text-xs text-white/80 space-y-1">
                <li>Exceeding 45% fill factor causing overheating and difficult cable pulling</li>
                <li>Poor heat dissipation leading to cable derating</li>
                <li><strong>Solution:</strong> Calculate cable cross-sectional areas and plan for future additions</li>
              </ul>
            </div>

            <div className="p-3 rounded bg-white/5">
              <p className="font-medium text-elec-yellow text-sm mb-2">Wrong material selection for environment</p>
              <ul className="text-xs text-white/80 space-y-1">
                <li>Using standard PVC outdoors without UV stabilisation</li>
                <li>Non-weatherproof fittings in wet locations</li>
                <li><strong>Solution:</strong> Select containment with appropriate IP ratings and environmental resistance</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: BS 7671 Context */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            BS 7671 Context and Compliance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Cable containment selection and installation must comply with several key sections of BS 7671:
            </p>

            <ul className="text-sm text-white space-y-2 ml-4">
              <li><strong>Section 522 - External influences:</strong> Selection of wiring systems according to environmental conditions (temperature, moisture, mechanical stress)</li>
              <li><strong>Section 528 - Proximity to other services:</strong> Segregation requirements for different circuit types and interference prevention</li>
              <li><strong>Section 521.10.202 - Support and fixings:</strong> Prevention of premature collapse of wiring systems during fire conditions</li>
              <li><strong>Section 514 - Identification:</strong> Clear marking and identification of circuits for inspection and maintenance</li>
              <li><strong>Section 543 - Protective conductors:</strong> Requirements when metallic containment is used as protective conductor</li>
            </ul>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mt-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-elec-yellow text-sm mb-1">Regulation 522.8.10</p>
                  <p className="text-sm text-white">
                    "Where cables are installed in locations exposed to mechanical damage, they shall be protected by being enclosed in conduit, ducting or trunking providing adequate mechanical protection."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Real-world Scenario */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-elec-yellow" />
            Real-world Scenario: Warehouse Upgrade
          </h2>
          <div className="p-4 rounded-lg bg-white/5">
            <div className="flex items-start gap-3 mb-4">
              <Factory className="w-6 h-6 text-elec-yellow mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium text-white mb-2">The Problem</p>
                <p className="text-sm text-white/90 leading-relaxed">
                  A food processing warehouse had power and lighting circuits surface-clipped along walls at 2.5m height.
                  Frequent forklift movements caused repeated cable damage, leading to:
                </p>
                <ul className="list-disc pl-4 mt-2 text-sm text-white/80 space-y-1">
                  <li>Three RCBO trips per month due to insulation damage</li>
                  <li>Production downtime averaging 4 hours per incident</li>
                  <li>15,000 annual loss in productivity and repairs</li>
                  <li>Health and safety concerns from exposed damaged cables</li>
                </ul>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-3 rounded bg-green-500/10 border border-green-400/20">
                <p className="font-medium text-green-300 text-sm mb-2">Solution Implemented</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>Steel trunking installed at 4.5m height</li>
                  <li>Segregated compartments for power and data</li>
                  <li>IP54 rating for washdown resistance</li>
                  <li>Galvanised finish for corrosion protection</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-elec-yellow/10 border border-elec-yellow/20">
                <p className="font-medium text-elec-yellow text-sm mb-2">Results Achieved</p>
                <ul className="text-xs text-elec-yellow/80 space-y-1">
                  <li>Zero cable damage incidents in 18 months</li>
                  <li>Easy access for maintenance via mobile platform</li>
                  <li>Future-proofed for additional circuits</li>
                  <li>ROI achieved within 8 months</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Summary */}
        <section className="mb-10">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h2 className="text-lg font-semibold text-elec-yellow mb-2">Summary</h2>
            <p className="text-sm text-white leading-relaxed">
              Containment is fundamental to safe, organised and compliant electrical work - protecting cables,
              supporting BS 7671 compliance and simplifying maintenance.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[44px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../2-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Module3Section2_1;
