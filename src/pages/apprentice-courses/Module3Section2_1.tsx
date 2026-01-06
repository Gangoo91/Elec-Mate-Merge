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

const Module3Section2_1: React.FC = () => {
  useSEO(
    "Purpose of Containment – Module 3 (3.2.1)",
    "Purposes of cable containment: protection, organisation, compliance and maintenance. BS 7671 aligned."
  );

  const faqs = [
    {
      q: "Can containment be decorative as well as functional?",
      a: "Yes — certain containment systems are designed for both aesthetic appeal and performance, especially in commercial interiors.",
    },
    {
      q: "Is containment always needed for domestic installations?",
      a: "Not always, but it is recommended in exposed areas or where mechanical protection is needed.",
    },
    {
      q: "Does containment improve fire safety?",
      a: "Yes — appropriate supports and containment can prevent premature collapse of wiring and help maintain escape routes during a fire.",
    },
  ] as const;

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
              Back to Section 3.2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg ">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <Badge
              variant="outline"
              className="border-elec-yellow/30 text-elec-yellow"
            >
              Section 3.2.1
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Purpose of Containment in Electrical Installations
          </h1>
          <p className="text-white">
            Understanding the role of containment in protection, organisation,
            compliance and maintenance.
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
                <li>Protects cables from mechanical and environmental damage.</li>
                <li>Keeps runs neat and segregates power/data to reduce EMI.</li>
                <li>Supports BS 7671 and fire safety (secure fixings).</li>
                <li>Simplifies inspection, testing and future changes.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>Spot:</strong> Cables in PVC/steel conduit, trunking or
                  tray.
                </li>
                <li>
                  <strong>Use:</strong> Public and industrial areas, outdoors,
                  mixed services.
                </li>
                <li>
                  <strong>Check:</strong> Supports, segregation, fill and
                  environmental suitability.
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
            <li>
              Explain the primary purposes of cable containment in electrical
              installations.
            </li>
            <li>Identify situations where containment is required.</li>
            <li>
              Recognise how containment supports safety, maintenance and
              compliance.
            </li>
            <li>Distinguish between methods for different environments.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content</h2>

          {/* Main purposes */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5" /> Main Purposes of Cable Containment
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-white">
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <p className="font-medium mb-2">a) Mechanical protection</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Shields against knocks, crushing and abrasion.</li>
                  <li>Essential near vehicles, machinery or public access.</li>
                </ul>
              </div>

              <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
                <p className="font-medium mb-2">b) Environmental protection</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Protects from moisture, dust, heat and UV.</li>
                  <li>Prevents premature sheath degradation.</li>
                </ul>
              </div>

              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <p className="font-medium mb-2">c) Organisation and routing</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Neat runs, easy tracing and safe segregation.</li>
                  <li>Separates power, data and control to limit EMI.</li>
                </ul>
              </div>

              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <p className="font-medium mb-2">d) Safety compliance</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Meets BS 7671 protection against external influences.</li>
                  <li>Supports fire safety via secure fixings to prevent collapse.</li>
                </ul>
              </div>

              <div className="rounded-lg p-4 bg-transparent border border-amber-400/30">
                <p className="font-medium mb-2">e) Maintenance and future‑proofing</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Easier additions, removals and replacements.</li>
                  <li>Clear circuit identification during inspection.</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[0]} />
          <Separator className="my-6" />

          {/* When required */}
          <section className="mb-2">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" /> When Containment is Required
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <div className="flex items-center gap-2 mb-2">
                  <Building className="w-5 h-5 text-elec-yellow" />
                  <span className="font-medium text-elec-yellow">Public spaces</span>
                </div>
                <p className="text-blue-200">Prevents tampering or accidental damage.</p>
              </div>

              <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
                <div className="flex items-center gap-2 mb-2">
                  <Factory className="w-5 h-5 text-green-300" />
                  <span className="font-medium text-green-300">Industrial environments</span>
                </div>
                <p className="text-green-200">Protection against mechanical hazards.</p>
              </div>

              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <div className="flex items-center gap-2 mb-2">
                  <Home className="w-5 h-5 text-elec-yellow" />
                  <span className="font-medium text-elec-yellow">Outdoor runs</span>
                </div>
                <p className="text-purple-200">Protection from weather and UV light.</p>
              </div>

              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-elec-yellow" />
                  <span className="font-medium text-elec-yellow">Power and data</span>
                </div>
                <p className="text-orange-200">Segregation to reduce electromagnetic interference.</p>
              </div>
            </div>
          </section>

          <Separator className="my-6" />
          <InlineCheck {...quickCheckQuestions[1]} />
          <Separator className="my-6" />
          <InlineCheck {...quickCheckQuestions[2]} />
          <Separator className="my-6" />
          <InlineCheck {...quickCheckQuestions[3]} />
        </Card>

        {/* Common Mistakes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Common Mistakes and How to Avoid Them</h2>
          
          <div className="space-y-4 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <p className="font-medium mb-2 text-elec-yellow">Poor segregation of power and data cables</p>
              <ul className="list-disc pl-4 space-y-1 text-red-200">
                <li>Running power and data cables in the same containment without barriers</li>
                <li>Causes electromagnetic interference affecting data transmission</li>
                <li><strong>Solution:</strong> Use separate compartments or maintain minimum separation distances per BS 7671</li>
              </ul>
            </div>

            <div className="rounded-lg p-4 bg-transparent border border-amber-400/30">
              <p className="font-medium mb-2 text-amber-300">Insufficient support and fixings</p>
              <ul className="list-disc pl-4 space-y-1 text-amber-200">
                <li>Containment sagging due to inadequate support spacing</li>
                <li>Risk of premature collapse during fire conditions</li>
                <li><strong>Solution:</strong> Follow manufacturer guidelines for maximum support intervals (typically 1.2m for steel trunking)</li>
              </ul>
            </div>

            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <p className="font-medium mb-2 text-elec-yellow">Overfilling containment systems</p>
              <ul className="list-disc pl-4 space-y-1 text-orange-200">
                <li>Exceeding 45% fill factor causing overheating and difficult cable pulling</li>
                <li>Poor heat dissipation leading to cable derating</li>
                <li><strong>Solution:</strong> Calculate cable cross-sectional areas and plan for future additions</li>
              </ul>
            </div>

            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <p className="font-medium mb-2 text-elec-yellow">Wrong material selection for environment</p>
              <ul className="list-disc pl-4 space-y-1 text-purple-200">
                <li>Using standard PVC outdoors without UV stabilisation</li>
                <li>Non-weatherproof fittings in wet locations</li>
                <li><strong>Solution:</strong> Select containment with appropriate IP ratings and environmental resistance</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* BS 7671 Context */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">BS 7671 Context and Compliance</h2>
          
          <div className="space-y-4 text-xs sm:text-sm text-white">
            <p className="text-white">
              Cable containment selection and installation must comply with several key sections of BS 7671:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Section 522 - External influences:</strong> Selection of wiring systems according to environmental conditions (temperature, moisture, mechanical stress)</li>
              <li><strong>Section 528 - Proximity to other services:</strong> Segregation requirements for different circuit types and interference prevention</li>
              <li><strong>Section 521.10.202 - Support and fixings:</strong> Prevention of premature collapse of wiring systems during fire conditions</li>
              <li><strong>Section 514 - Identification:</strong> Clear marking and identification of circuits for inspection and maintenance</li>
              <li><strong>Section 543 - Protective conductors:</strong> Requirements when metallic containment is used as protective conductor</li>
            </ul>

            <div className="mt-6 p-4 border-l-4 border-elec-yellow bg-elec-yellow/10 rounded-r-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-elec-yellow mb-1">Regulation 522.8.10</p>
                  <p className="text-sm">
                    "Where cables are installed in locations exposed to mechanical damage, they shall be protected by being enclosed in conduit, ducting or trunking providing adequate mechanical protection."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Real‑world scenario */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 border border-border/30">
          <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
            <Target className="w-5 h-5" /> Real‑world scenario: Warehouse upgrade
          </h2>
          
          <div className="p-4 border-l-4 border-elec-yellow bg-elec-yellow/5 rounded-r-lg mb-4">
            <div className="flex items-start gap-3">
              <Factory className="w-6 h-6 text-elec-yellow mt-1 flex-shrink-0" />
              <div className="text-blue-200">
                <p className="font-medium mb-2">The Problem</p>
                <p className="text-sm leading-relaxed">
                  A food processing warehouse had power and lighting circuits surface-clipped along walls at 2.5m height. 
                  Frequent forklift movements caused repeated cable damage, leading to:
                </p>
                <ul className="list-disc pl-4 mt-2 text-sm space-y-1">
                  <li>Three RCBO trips per month due to insulation damage</li>
                  <li>Production downtime averaging 4 hours per incident</li>
                  <li>£15,000 annual loss in productivity and repairs</li>
                  <li>Health and safety concerns from exposed damaged cables</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="rounded-lg p-3 border border-green-400/30">
              <p className="font-medium text-green-300 mb-2">Solution Implemented</p>
              <ul className="list-disc pl-4 space-y-1 text-green-200 text-sm">
                <li>Steel trunking installed at 4.5m height</li>
                <li>Segregated compartments for power and data</li>
                <li>IP54 rating for washdown resistance</li>
                <li>Galvanised finish for corrosion protection</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 border border-elec-yellow/30">
              <p className="font-medium text-elec-yellow mb-2">Results Achieved</p>
              <ul className="list-disc pl-4 space-y-1 text-elec-yellow text-sm">
                <li>Zero cable damage incidents in 18 months</li>
                <li>Easy access for maintenance via mobile platform</li>
                <li>Future-proofed for additional circuits</li>
                <li>ROI achieved within 8 months</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">
            Frequently asked questions
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-white">
            {faqs.map((faq, idx) => (
              <div key={idx}>
                <p className="font-medium mb-1">{faq.q}</p>
                <p className="text-white">{faq.a}</p>
                {idx < faqs.length - 1 && (
                  <Separator className="mt-4 bg-elec-yellow/20" />
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 border border-elec-yellow/30">
          <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-2">Summary</h2>
          <p className="text-elec-yellow text-sm leading-relaxed">
            Containment is fundamental to safe, organised and compliant
            electrical work — protecting cables, supporting BS 7671 compliance
            and simplifying maintenance.
          </p>
        </Card>

        {/* Quiz */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">
            Test your knowledge
          </h2>
          <Quiz
            questions={quizQuestions}
            title="Purpose of Containment Knowledge Test"
          />
        </Card>
      </main>
    </div>
  );
};

export default Module3Section2_1;
