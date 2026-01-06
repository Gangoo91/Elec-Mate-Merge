import useSEO from "@/hooks/useSEO";
import {
  ArrowLeft,
  Package,
  AlertTriangle,
  Factory,
  Home,
  Shield,
  Building,
  Target,
  Scissors,
  Settings,
  CheckCircle2,
  Layers,
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
    id: "trunking-earthing",
    question: "Which trunking type requires earthing?",
    options: [
      "PVC trunking",
      "Steel trunking",
      "Both types",
    ],
    correctIndex: 1,
    explanation:
      "Steel trunking must be earthed and have electrical continuity tested between sections, as it can serve as a protective conductor.",
  },
  {
    id: "cable-fill",
    question: "Why should cable fill limits be observed in trunking?",
    options: [
      "To prevent overheating and allow future additions",
      "To reduce material costs",
      "To improve appearance",
    ],
    correctIndex: 0,
    explanation:
      "Observing fill limits prevents overheating due to poor heat dissipation and allows space for future cable additions without overcrowding.",
  },
  {
    id: "pvc-advantage",
    question: "Give one advantage of PVC trunking over steel trunking.",
    options: [
      "Higher mechanical protection",
      "Lightweight and easy to cut",
      "Better fire resistance",
    ],
    correctIndex: 1,
    explanation:
      "PVC trunking is much lighter and easier to cut and install compared to steel trunking, making it faster and less labour-intensive to work with.",
  },
  {
    id: "cable-protection",
    question: "What should be used to protect cables from sharp edges inside trunking?",
    options: [
      "Insulation tape",
      "Grommets or bushes",
      "Heat shrink tubing",
    ],
    correctIndex: 1,
    explanation:
      "Grommets or bushes should be fitted at entry points and sharp edges to prevent damage to cable insulation during installation and service.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the main advantage of PVC trunking?",
    options: [
      "Stronger mechanical protection",
      "Lightweight and easy to cut",
      "Acts as an earth path",
      "Fire-resistant",
    ],
    correctAnswer: 1,
    explanation:
      "PVC trunking's main advantage is that it's lightweight and easy to cut, making installation much faster and less labour-intensive than steel alternatives.",
  },
  {
    id: 2,
    question: "Which type of trunking is best for industrial environments with high mechanical risks?",
    options: [
      "PVC",
      "Steel",
      "Aluminium",
      "Flexible",
    ],
    correctAnswer: 1,
    explanation:
      "Steel trunking provides superior mechanical protection against impacts, making it ideal for harsh industrial environments with machinery and heavy equipment.",
  },
  {
    id: 3,
    question: "True or False: Steel trunking must be earthed.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. Steel trunking must be properly earthed and electrical continuity tested between all sections to ensure it can serve as a safe protective conductor.",
  },
  {
    id: 4,
    question: "Name one limitation of PVC trunking.",
    options: [
      "Too expensive",
      "Low mechanical strength",
      "Requires earthing",
      "Cannot be painted",
    ],
    correctAnswer: 1,
    explanation:
      "PVC trunking has lower mechanical strength compared to steel, making it unsuitable for high-impact environments or areas with mechanical hazards.",
  },
  {
    id: 5,
    question: "What should be used to protect cables from sharp edges inside trunking?",
    options: [
      "Insulation tape",
      "Grommets or bushes",
      "Plastic sleeves",
      "Heat shrink",
    ],
    correctAnswer: 1,
    explanation:
      "Grommets or bushes should be fitted at entry points and around sharp edges to prevent cable insulation damage during installation and thermal movement.",
  },
  {
    id: 6,
    question: "Why is it important to use barriers in trunking with mixed power and data cables?",
    options: [
      "To make it look neat",
      "To prevent electromagnetic interference",
      "To reduce cable cost",
      "To improve flexibility",
    ],
    correctAnswer: 1,
    explanation:
      "Barriers separate power and data cables to prevent electromagnetic interference (EMI) from power cables affecting sensitive data and communication circuits.",
  },
  {
    id: 7,
    question: "Give one reason why steel trunking might be galvanised.",
    options: [
      "To improve appearance",
      "To prevent corrosion",
      "To reduce weight",
      "To improve conductivity",
    ],
    correctAnswer: 1,
    explanation:
      "Galvanising provides a protective zinc coating that prevents corrosion, extending the service life of steel trunking, especially in damp environments.",
  },
  {
    id: 8,
    question: "Which regulation sets the requirements for trunking installation in the UK?",
    options: [
      "BS 7909",
      "BS 7671 (IET Wiring Regulations)",
      "BS 5839",
      "BS 6701",
    ],
    correctAnswer: 1,
    explanation:
      "BS 7671 (IET Wiring Regulations) sets the requirements for electrical installations including trunking systems, support spacing, and segregation requirements.",
  },
];

const Module3Section2_3: React.FC = () => {
  useSEO(
    "Plastic and Steel Trunking Systems – Module 3 (3.2.3)",
    "Complete guide to PVC and steel trunking systems. Installation, cable management, segregation and BS 7671 compliance."
  );

  const faqs = [
    {
      q: "Can PVC trunking be used outdoors?",
      a: "Yes, if it's UV-stabilised and weatherproof, but steel or SWA cable may be better for mechanical strength in exposed locations.",
    },
    {
      q: "Does steel trunking need to be earthed?",
      a: "Yes, and electrical continuity must be tested between all sections to ensure safe fault current paths.",
    },
    {
      q: "Is trunking fire-rated?",
      a: "Steel trunking provides better fire resistance; PVC can be made with fire-retardant materials but will still deform under high heat.",
    },
    {
      q: "What's the maximum fill factor for cables in trunking?",
      a: "Generally 45% of the internal cross-sectional area to ensure adequate heat dissipation and future access.",
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
              <Package className="w-6 h-6 text-white" />
            </div>
            <Badge
              variant="outline"
              className="border-elec-yellow/30 text-elec-yellow"
            >
              Section 3.2.3
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Plastic and Steel Trunking Systems
          </h1>
          <p className="text-white">
            Enclosed channels for cable routing, protection and organised access for maintenance and modifications.
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
                <li>Enclosed channels providing easy access to cables for maintenance and additions.</li>
                <li>PVC: lightweight, easy install, good for offices/domestic; Steel: tough, industrial strength.</li>
                <li>Must observe fill limits (45%) and segregate power/data with barriers.</li>
                <li>Steel requires earthing and continuity testing; PVC is non-conductive.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>Spot:</strong> Rectangular channels with removable lids, often at skirting or dado height.
                </li>
                <li>
                  <strong>Use:</strong> PVC for offices/homes; Steel for factories/workshops with impact risks.
                </li>
                <li>
                  <strong>Check:</strong> Fill factor, segregation barriers, lid security, support spacing, earthing (steel).
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
            <li>Describe the purpose and benefits of trunking systems.</li>
            <li>Identify the differences between plastic and steel trunking.</li>
            <li>Select the correct trunking material for various environments.</li>
            <li>Understand best practices for trunking installation and cable management.</li>
            <li>Apply BS 7671 requirements for support, segregation and fill factors.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content</h2>

          {/* Trunking Types */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Layers className="w-5 h-5" /> Trunking Types and Applications
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-white">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                  <p className="font-medium mb-2">Plastic (PVC) Trunking</p>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-blue-200 mb-1">Material Characteristics</p>
                      <ul className="list-disc pl-4 space-y-1 text-blue-200">
                        <li>Rigid PVC construction with snap-on or clip-on lids</li>
                        <li>Available profiles: mini, standard, maxi, skirting, dado</li>
                        <li>Standard colours: white, ivory, brown, grey</li>
                        <li>Sizes typically 16x16mm to 100x50mm</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-blue-200 mb-1">Key Advantages</p>
                      <ul className="list-disc pl-4 space-y-1 text-blue-200">
                        <li>Lightweight - easy to handle and install</li>
                        <li>Simple cutting with hacksaw or PVC cutter</li>
                        <li>Non-conductive - no earthing requirements</li>
                        <li>Corrosion resistant in damp conditions</li>
                        <li>Lower cost than steel alternatives</li>
                        <li>Available in decorative finishes</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-blue-200 mb-1">Limitations</p>
                      <ul className="list-disc pl-4 space-y-1 text-blue-200">
                        <li>Limited mechanical strength against impacts</li>
                        <li>UV degradation without stabilisers</li>
                        <li>Can warp under excessive heat (&gt;70°C)</li>
                        <li>Not suitable for high-impact environments</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-blue-200 mb-1">Best Applications</p>
                      <ul className="list-disc pl-4 space-y-1 text-blue-200">
                        <li>Domestic installations - living areas</li>
                        <li>Office environments - desk and dado height</li>
                        <li>Retail spaces - customer areas</li>
                        <li>Low-risk commercial environments</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                  <p className="font-medium mb-2">Steel Trunking</p>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-red-200 mb-1">Material Characteristics</p>
                      <ul className="list-disc pl-4 space-y-1 text-red-200">
                        <li>Galvanised or powder-coated steel construction</li>
                        <li>Bolted or clip-on steel lids with gasket seals</li>
                        <li>Heavy-duty profiles from 50x50mm to 300x100mm</li>
                        <li>Available with various IP ratings up to IP54</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-red-200 mb-1">Key Advantages</p>
                      <ul className="list-disc pl-4 space-y-1 text-red-200">
                        <li>Excellent mechanical protection against impacts</li>
                        <li>Fire resistant - will not melt or burn</li>
                        <li>Can serve as protective conductor (earth path)</li>
                        <li>Electromagnetic shielding properties</li>
                        <li>Long service life in harsh environments</li>
                        <li>High cable capacity in large sizes</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-red-200 mb-1">Limitations</p>
                      <ul className="list-disc pl-4 space-y-1 text-red-200">
                        <li>Heavier and more labour-intensive to install</li>
                        <li>Higher material costs than PVC</li>
                        <li>Requires earthing and continuity testing</li>
                        <li>Potential corrosion in very damp conditions</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-red-200 mb-1">Best Applications</p>
                      <ul className="list-disc pl-4 space-y-1 text-red-200">
                        <li>Industrial workshops and factories</li>
                        <li>Plant and machinery rooms</li>
                        <li>High-traffic or vandal-prone areas</li>
                        <li>Environments requiring EMC shielding</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[0]} />
          <Separator className="my-6" />

          {/* Installation Practices */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Settings className="w-5 h-5" /> Installation Best Practices
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-white">
              <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
                <p className="font-medium mb-2">Route Planning and Support</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-green-200 mb-1">Route Planning</p>
                    <ul className="list-disc pl-4 space-y-1 text-green-200">
                      <li>Minimise bends and junctions for easier cable pulling</li>
                      <li>Plan for future expansion and cable additions</li>
                      <li>Avoid areas with excessive heat or moisture</li>
                      <li>Consider maintenance access requirements</li>
                      <li>Mark routes clearly before installation</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-green-200 mb-1">Support Requirements</p>
                    <ul className="list-disc pl-4 space-y-1 text-green-200">
                      <li>PVC: maximum 500mm spacing for small profiles</li>
                      <li>Steel: maximum 1200mm spacing for standard sizes</li>
                      <li>Additional support at changes of direction</li>
                      <li>Use appropriate fixings for substrate type</li>
                      <li>Allow for thermal expansion on long runs</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <p className="font-medium mb-2">Cable Management and Fill Factors</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-purple-200 mb-1">Fill Factor Calculations</p>
                    <ul className="list-disc pl-4 space-y-1 text-purple-200">
                      <li>Maximum 45% of internal cross-sectional area</li>
                      <li>Calculate total cable areas including insulation</li>
                      <li>Allow space for heat dissipation</li>
                      <li>Reserve capacity for future additions (typically 25%)</li>
                      <li>Document cable schedules for future reference</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-purple-200 mb-1">Cable Organisation</p>
                    <ul className="list-disc pl-4 space-y-1 text-purple-200">
                      <li>Group similar cable types together</li>
                      <li>Use cable ties at regular intervals</li>
                      <li>Label cables clearly at access points</li>
                      <li>Maintain service loops at terminations</li>
                      <li>Avoid tight radius bends in trunking</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-4 bg-transparent border border-amber-400/30">
                <p className="font-medium mb-2">Segregation and Barriers</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-amber-200 mb-1">Segregation Requirements</p>
                    <ul className="list-disc pl-4 space-y-1 text-amber-200">
                      <li>Separate power and data cables with barriers</li>
                      <li>Use different compartments for different voltages</li>
                      <li>Maintain minimum separation distances per BS 7671</li>
                      <li>Consider electromagnetic compatibility (EMC)</li>
                      <li>Fire alarm circuits may need separate trunking</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-amber-200 mb-1">Barrier Installation</p>
                    <ul className="list-disc pl-4 space-y-1 text-amber-200">
                      <li>Fit rigid barriers between compartments</li>
                      <li>Ensure barriers extend full length of run</li>
                      <li>Seal barrier joints to prevent crossover</li>
                      <li>Use non-combustible materials for barriers</li>
                      <li>Test separation effectiveness after installation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[1]} />
          <Separator className="my-6" />

          {/* Steel Trunking Earthing */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5" /> Steel Trunking Earthing and Continuity
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-white">
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <p className="font-medium mb-2">Earthing Requirements</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-orange-200 mb-1">Installation Requirements</p>
                    <ul className="list-disc pl-4 space-y-1 text-orange-200">
                      <li>All joints must be electrically continuous</li>
                      <li>Clean mating surfaces before assembly</li>
                      <li>Use star washers or serrated nuts at connections</li>
                      <li>Apply jointing compound to prevent corrosion</li>
                      <li>Earth bonding points at regular intervals</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-orange-200 mb-1">Testing and Verification</p>
                    <ul className="list-disc pl-4 space-y-1 text-orange-200">
                      <li>Test continuity between all sections</li>
                      <li>Maximum resistance: 0.05Ω per joint</li>
                      <li>Verify earth connection to main earthing terminal</li>
                      <li>Re-test after any modifications or repairs</li>
                      <li>Document test results for certification</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[2]} />
          <Separator className="my-6" />
          <InlineCheck {...quickCheckQuestions[3]} />
        </Card>

        {/* Common Mistakes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Common Mistakes and How to Avoid Them</h2>
          
          <div className="space-y-4 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <p className="font-medium mb-2 text-elec-yellow">Overfilling trunking beyond capacity</p>
              <ul className="list-disc pl-4 space-y-1 text-red-200">
                <li>Exceeding 45% fill factor causing overheating and difficult access</li>
                <li>Not allowing for future cable additions</li>
                <li><strong>Solution:</strong> Calculate cable cross-sectional areas properly, plan for 25% future expansion</li>
              </ul>
            </div>

            <div className="rounded-lg p-4 bg-transparent border border-amber-400/30">
              <p className="font-medium mb-2 text-amber-300">Poor segregation of different services</p>
              <ul className="list-disc pl-4 space-y-1 text-amber-200">
                <li>Mixing power and data cables without barriers</li>
                <li>Electromagnetic interference affecting sensitive circuits</li>
                <li><strong>Solution:</strong> Install proper barriers, use separate compartments, follow segregation guidelines</li>
              </ul>
            </div>

            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <p className="font-medium mb-2 text-elec-yellow">Inadequate support spacing</p>
              <ul className="list-disc pl-4 space-y-1 text-orange-200">
                <li>Trunking sagging due to excessive support intervals</li>
                <li>Lids becoming difficult to remove or replace</li>
                <li><strong>Solution:</strong> Follow manufacturer guidelines, add supports at changes of direction</li>
              </ul>
            </div>

            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <p className="font-medium mb-2 text-elec-yellow">Steel trunking earthing failures</p>
              <ul className="list-disc pl-4 space-y-1 text-purple-200">
                <li>Poor electrical continuity through painted or corroded joints</li>
                <li>Missing earth bonds at main positions</li>
                <li><strong>Solution:</strong> Clean all mating surfaces, use star washers, test continuity, bond to main earth</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* BS 7671 Context */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">BS 7671 Context and Compliance</h2>
          
          <div className="space-y-4 text-xs sm:text-sm text-white">
            <p className="text-white">
              Trunking installation must comply with specific BS 7671 requirements:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Section 521.10.202:</strong> Support and fixings to prevent premature collapse during fire conditions</li>
              <li><strong>Section 528.1:</strong> Segregation requirements - circuits of different categories must be separated or have adequate insulation</li>
              <li><strong>Section 543.2.9:</strong> Metallic trunking as protective conductor - electrical continuity and cross-sectional area requirements</li>
              <li><strong>Section 522.8.10:</strong> Selection of wiring systems appropriate to external influences</li>
              <li><strong>Section 526:</strong> Electrical connections must be accessible for inspection, testing and maintenance</li>
            </ul>

            <div className="mt-6 p-4 border-l-4 border-elec-yellow bg-elec-yellow/10 rounded-r-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-elec-yellow mb-1">Segregation Requirement - Section 528.1</p>
                  <p className="text-sm">
                    "Circuits of Band I and Band II shall be run in separate wiring systems or, if contained within the same wiring system, 
                    shall be segregated by a continuous partition of insulating material."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Real‑world scenario */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 border border-border/30">
          <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
            <Target className="w-5 h-5" /> Real‑world scenario: Large office building installation
          </h2>
          
          <div className="p-4 border-l-4 border-emerald-400 bg-emerald-400/5 rounded-r-lg mb-4">
            <div className="flex items-start gap-3">
              <Building className="w-6 h-6 text-elec-yellow mt-1 flex-shrink-0" />
              <div className="text-blue-200">
                <p className="font-medium mb-2">The Project</p>
                <p className="text-sm leading-relaxed">
                  A modern office complex required comprehensive electrical and data infrastructure across 5 floors. 
                  Different areas had varying requirements:
                </p>
                <ul className="list-disc pl-4 mt-2 text-sm space-y-1">
                  <li>Open plan offices: Desk-level power and data access</li>
                  <li>Meeting rooms: AV equipment and presentation systems</li>
                  <li>Server room: High-density cabling with EMC requirements</li>
                  <li>Plant room: Industrial control systems and heavy machinery</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="rounded-lg p-3 border border-green-400/30">
              <p className="font-medium text-green-300 mb-2">Smart Trunking Strategy</p>
              <ul className="list-disc pl-4 space-y-1 text-green-200 text-sm">
                <li>Office areas: Dado-height PVC trunking with twin compartments</li>
                <li>Power compartment: 13A sockets every 2 metres</li>
                <li>Data compartment: Cat6 outlets with future capacity</li>
                <li>Server room: Steel trunking with EMC shielding</li>
                <li>Plant room: Heavy-duty galvanised steel, IP54 rated</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 border border-elec-yellow/30">
              <p className="font-medium text-elec-yellow mb-2">Outstanding Results</p>
              <ul className="list-disc pl-4 space-y-1 text-emerald-200 text-sm">
                <li>Zero EMI issues affecting IT systems</li>
                <li>Easy reconfigurations as teams moved</li>
                <li>50% cable capacity reserved for expansion</li>
                <li>Maintenance access achieved in under 2 minutes</li>
                <li>System fully compliant with BS 7671 segregation rules</li>
              </ul>
            </div>
          </div>

          <div className="bg-teal-500/10 border border-teal-400/30 rounded-lg p-3">
            <p className="font-medium text-teal-300 mb-1">Future-Proofing Success</p>
            <p className="text-teal-200 text-sm">
              After 3 years, the installation has supported major IT upgrades, office reconfigurations, and 40% staff growth 
              without requiring additional trunking - demonstrating excellent planning and specification.
            </p>
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
                  <Separator className="mt-4" />
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 border border-elec-yellow/30">
          <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-2">Summary</h2>
          <p className="text-emerald-200 text-sm leading-relaxed">
            Trunking systems provide accessible, organised cable management with PVC offering ease of installation 
            for commercial environments and steel delivering robust protection for industrial applications. 
            Proper segregation, fill factor control and earthing (for steel) ensure safe, compliant installations.
          </p>
        </Card>

        {/* Quiz */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">
            Test your knowledge
          </h2>
          <Quiz
            questions={quizQuestions}
            title="Plastic and Steel Trunking Knowledge Test"
          />
        </Card>
      </main>
    </div>
  );
};

export default Module3Section2_3;