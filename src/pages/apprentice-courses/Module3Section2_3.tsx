import useSEO from "@/hooks/useSEO";
import {
  ArrowLeft,
  Package,
  AlertTriangle,
  Shield,
  Building,
  Target,
  Settings,
  CheckCircle,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import React from "react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const TITLE = "Plastic and Steel Trunking Systems - Module 3.2.3 | Level 2 Electrical Course";
const DESCRIPTION = "Complete guide to PVC and steel trunking systems. Installation, cable management, segregation and BS 7671 compliance.";

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

const faqs = [
  {
    question: "Can PVC trunking be used outdoors?",
    answer: "Yes, if it's UV-stabilised and weatherproof, but steel or SWA cable may be better for mechanical strength in exposed locations.",
  },
  {
    question: "Does steel trunking need to be earthed?",
    answer: "Yes, and electrical continuity must be tested between all sections to ensure safe fault current paths.",
  },
  {
    question: "Is trunking fire-rated?",
    answer: "Steel trunking provides better fire resistance; PVC can be made with fire-retardant materials but will still deform under high heat.",
  },
  {
    question: "What's the maximum fill factor for cables in trunking?",
    answer: "Generally 45% of the internal cross-sectional area to ensure adequate heat dissipation and future access.",
  },
];

const Module3Section2_3: React.FC = () => {
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
            <Package className="h-4 w-4" />
            <span>Module 3.2.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Plastic and Steel Trunking Systems
          </h1>
          <p className="text-white/80">
            Enclosed channels for cable routing, protection and organised access for maintenance and modifications
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li>Enclosed channels providing easy access to cables for maintenance and additions</li>
              <li>PVC: lightweight, easy install, good for offices/domestic; Steel: tough, industrial strength</li>
              <li>Must observe fill limits (45%) and segregate power/data with barriers</li>
              <li>Steel requires earthing and continuity testing; PVC is non-conductive</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Rectangular channels with removable lids, often at skirting or dado height</li>
              <li><strong>Use:</strong> PVC for offices/homes; Steel for factories/workshops with impact risks</li>
              <li><strong>Check:</strong> Fill factor, segregation barriers, lid security, support spacing, earthing (steel)</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Describe the purpose and benefits of trunking systems",
              "Identify the differences between plastic and steel trunking",
              "Select the correct trunking material for various environments",
              "Understand best practices for trunking installation and cable management",
              "Apply BS 7671 requirements for support, segregation and fill factors"
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

        {/* Section 1: Trunking Types */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Trunking Types and Applications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded bg-white/5">
                <p className="font-medium text-white text-sm mb-3">Plastic (PVC) Trunking</p>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-white/80 text-xs mb-1">Material Characteristics</p>
                    <ul className="text-xs text-white/70 space-y-1">
                      <li>Rigid PVC construction with snap-on or clip-on lids</li>
                      <li>Available profiles: mini, standard, maxi, skirting, dado</li>
                      <li>Standard colours: white, ivory, brown, grey</li>
                      <li>Sizes typically 16x16mm to 100x50mm</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white/80 text-xs mb-1">Key Advantages</p>
                    <ul className="text-xs text-white/70 space-y-1">
                      <li>Lightweight - easy to handle and install</li>
                      <li>Simple cutting with hacksaw or PVC cutter</li>
                      <li>Non-conductive - no earthing requirements</li>
                      <li>Corrosion resistant in damp conditions</li>
                      <li>Lower cost than steel alternatives</li>
                      <li>Available in decorative finishes</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white/80 text-xs mb-1">Limitations</p>
                    <ul className="text-xs text-white/70 space-y-1">
                      <li>Limited mechanical strength against impacts</li>
                      <li>UV degradation without stabilisers</li>
                      <li>Can warp under excessive heat (&gt;70C)</li>
                      <li>Not suitable for high-impact environments</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white/80 text-xs mb-1">Best Applications</p>
                    <ul className="text-xs text-white/70 space-y-1">
                      <li>Domestic installations - living areas</li>
                      <li>Office environments - desk and dado height</li>
                      <li>Retail spaces - customer areas</li>
                      <li>Low-risk commercial environments</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded bg-white/5">
                <p className="font-medium text-white text-sm mb-3">Steel Trunking</p>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-white/80 text-xs mb-1">Material Characteristics</p>
                    <ul className="text-xs text-white/70 space-y-1">
                      <li>Galvanised or powder-coated steel construction</li>
                      <li>Bolted or clip-on steel lids with gasket seals</li>
                      <li>Heavy-duty profiles from 50x50mm to 300x100mm</li>
                      <li>Available with various IP ratings up to IP54</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white/80 text-xs mb-1">Key Advantages</p>
                    <ul className="text-xs text-white/70 space-y-1">
                      <li>Excellent mechanical protection against impacts</li>
                      <li>Fire resistant - will not melt or burn</li>
                      <li>Can serve as protective conductor (earth path)</li>
                      <li>Electromagnetic shielding properties</li>
                      <li>Long service life in harsh environments</li>
                      <li>High cable capacity in large sizes</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white/80 text-xs mb-1">Limitations</p>
                    <ul className="text-xs text-white/70 space-y-1">
                      <li>Heavier and more labour-intensive to install</li>
                      <li>Higher material costs than PVC</li>
                      <li>Requires earthing and continuity testing</li>
                      <li>Potential corrosion in very damp conditions</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white/80 text-xs mb-1">Best Applications</p>
                    <ul className="text-xs text-white/70 space-y-1">
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

        {/* Section 2: Installation Practices */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Installation Best Practices
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="p-4 rounded bg-green-500/10 border border-green-400/20">
              <p className="font-medium text-white text-sm mb-3">Route Planning and Support</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-white/80 text-xs mb-1">Route Planning</p>
                  <ul className="text-xs text-white/70 space-y-1">
                    <li>Minimise bends and junctions for easier cable pulling</li>
                    <li>Plan for future expansion and cable additions</li>
                    <li>Avoid areas with excessive heat or moisture</li>
                    <li>Consider maintenance access requirements</li>
                    <li>Mark routes clearly before installation</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white/80 text-xs mb-1">Support Requirements</p>
                  <ul className="text-xs text-white/70 space-y-1">
                    <li>PVC: maximum 500mm spacing for small profiles</li>
                    <li>Steel: maximum 1200mm spacing for standard sizes</li>
                    <li>Additional support at changes of direction</li>
                    <li>Use appropriate fixings for substrate type</li>
                    <li>Allow for thermal expansion on long runs</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 rounded bg-white/5">
              <p className="font-medium text-white text-sm mb-3">Cable Management and Fill Factors</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-white/80 text-xs mb-1">Fill Factor Calculations</p>
                  <ul className="text-xs text-white/70 space-y-1">
                    <li>Maximum 45% of internal cross-sectional area</li>
                    <li>Calculate total cable areas including insulation</li>
                    <li>Allow space for heat dissipation</li>
                    <li>Reserve capacity for future additions (typically 25%)</li>
                    <li>Document cable schedules for future reference</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white/80 text-xs mb-1">Cable Organisation</p>
                  <ul className="text-xs text-white/70 space-y-1">
                    <li>Group similar cable types together</li>
                    <li>Use cable ties at regular intervals</li>
                    <li>Label cables clearly at access points</li>
                    <li>Maintain service loops at terminations</li>
                    <li>Avoid tight radius bends in trunking</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 rounded bg-amber-500/10 border border-amber-400/20">
              <p className="font-medium text-white text-sm mb-3">Segregation and Barriers</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-white/80 text-xs mb-1">Segregation Requirements</p>
                  <ul className="text-xs text-white/70 space-y-1">
                    <li>Separate power and data cables with barriers</li>
                    <li>Use different compartments for different voltages</li>
                    <li>Maintain minimum separation distances per BS 7671</li>
                    <li>Consider electromagnetic compatibility (EMC)</li>
                    <li>Fire alarm circuits may need separate trunking</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white/80 text-xs mb-1">Barrier Installation</p>
                  <ul className="text-xs text-white/70 space-y-1">
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

        {/* Section 3: Steel Trunking Earthing */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Steel Trunking Earthing and Continuity
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="p-4 rounded bg-white/5">
              <p className="font-medium text-white text-sm mb-3">Earthing Requirements</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-white/80 text-xs mb-1">Installation Requirements</p>
                  <ul className="text-xs text-white/70 space-y-1">
                    <li>All joints must be electrically continuous</li>
                    <li>Clean mating surfaces before assembly</li>
                    <li>Use star washers or serrated nuts at connections</li>
                    <li>Apply jointing compound to prevent corrosion</li>
                    <li>Earth bonding points at regular intervals</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white/80 text-xs mb-1">Testing and Verification</p>
                  <ul className="text-xs text-white/70 space-y-1">
                    <li>Test continuity between all sections</li>
                    <li>Maximum resistance: 0.05 Ohm per joint</li>
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

        {/* Section 4: Common Mistakes */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Common Mistakes and How to Avoid Them
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="p-3 rounded bg-white/5">
              <p className="font-medium text-elec-yellow text-sm mb-2">Overfilling trunking beyond capacity</p>
              <ul className="text-xs text-white/80 space-y-1">
                <li>Exceeding 45% fill factor causing overheating and difficult access</li>
                <li>Not allowing for future cable additions</li>
                <li><strong>Solution:</strong> Calculate cable cross-sectional areas properly, plan for 25% future expansion</li>
              </ul>
            </div>

            <div className="p-3 rounded bg-amber-500/10 border border-amber-400/20">
              <p className="font-medium text-amber-300 text-sm mb-2">Poor segregation of different services</p>
              <ul className="text-xs text-white/80 space-y-1">
                <li>Mixing power and data cables without barriers</li>
                <li>Electromagnetic interference affecting sensitive circuits</li>
                <li><strong>Solution:</strong> Install proper barriers, use separate compartments, follow segregation guidelines</li>
              </ul>
            </div>

            <div className="p-3 rounded bg-white/5">
              <p className="font-medium text-elec-yellow text-sm mb-2">Inadequate support spacing</p>
              <ul className="text-xs text-white/80 space-y-1">
                <li>Trunking sagging due to excessive support intervals</li>
                <li>Lids becoming difficult to remove or replace</li>
                <li><strong>Solution:</strong> Follow manufacturer guidelines, add supports at changes of direction</li>
              </ul>
            </div>

            <div className="p-3 rounded bg-white/5">
              <p className="font-medium text-elec-yellow text-sm mb-2">Steel trunking earthing failures</p>
              <ul className="text-xs text-white/80 space-y-1">
                <li>Poor electrical continuity through painted or corroded joints</li>
                <li>Missing earth bonds at main positions</li>
                <li><strong>Solution:</strong> Clean all mating surfaces, use star washers, test continuity, bond to main earth</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* BS 7671 Context */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">BS 7671 Context and Compliance</h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p className="text-sm">
              Trunking installation must comply with specific BS 7671 requirements:
            </p>

            <ul className="text-sm text-white space-y-2 ml-4">
              <li><strong>Section 521.10.202:</strong> Support and fixings to prevent premature collapse during fire conditions</li>
              <li><strong>Section 528.1:</strong> Segregation requirements - circuits of different categories must be separated or have adequate insulation</li>
              <li><strong>Section 543.2.9:</strong> Metallic trunking as protective conductor - electrical continuity and cross-sectional area requirements</li>
              <li><strong>Section 522.8.10:</strong> Selection of wiring systems appropriate to external influences</li>
              <li><strong>Section 526:</strong> Electrical connections must be accessible for inspection, testing and maintenance</li>
            </ul>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mt-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-elec-yellow text-sm mb-1">Segregation Requirement - Section 528.1</p>
                  <p className="text-sm text-white">
                    "Circuits of Band I and Band II shall be run in separate wiring systems or, if contained within the same wiring system,
                    shall be segregated by a continuous partition of insulating material."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Real-world Scenario */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-elec-yellow" />
            Real-world Scenario: Large Office Building Installation
          </h2>
          <div className="p-4 rounded-lg bg-white/5">
            <div className="flex items-start gap-3 mb-4">
              <Building className="w-6 h-6 text-elec-yellow mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium text-white mb-2">The Project</p>
                <p className="text-sm text-white/90 leading-relaxed">
                  A modern office complex required comprehensive electrical and data infrastructure across 5 floors.
                  Different areas had varying requirements:
                </p>
                <ul className="list-disc pl-4 mt-2 text-sm text-white/80 space-y-1">
                  <li>Open plan offices: Desk-level power and data access</li>
                  <li>Meeting rooms: AV equipment and presentation systems</li>
                  <li>Server room: High-density cabling with EMC requirements</li>
                  <li>Plant room: Industrial control systems and heavy machinery</li>
                </ul>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="p-3 rounded bg-green-500/10 border border-green-400/20">
                <p className="font-medium text-green-300 text-sm mb-2">Smart Trunking Strategy</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>Office areas: Dado-height PVC trunking with twin compartments</li>
                  <li>Power compartment: 13A sockets every 2 metres</li>
                  <li>Data compartment: Cat6 outlets with future capacity</li>
                  <li>Server room: Steel trunking with EMC shielding</li>
                  <li>Plant room: Heavy-duty galvanised steel, IP54 rated</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-elec-yellow/10 border border-elec-yellow/20">
                <p className="font-medium text-elec-yellow text-sm mb-2">Outstanding Results</p>
                <ul className="text-xs text-elec-yellow/80 space-y-1">
                  <li>Zero EMI issues affecting IT systems</li>
                  <li>Easy reconfigurations as teams moved</li>
                  <li>50% cable capacity reserved for expansion</li>
                  <li>Maintenance access achieved in under 2 minutes</li>
                  <li>System fully compliant with BS 7671 segregation rules</li>
                </ul>
              </div>
            </div>

            <div className="p-3 rounded bg-teal-500/10 border border-teal-400/20">
              <p className="font-medium text-teal-300 text-sm mb-1">Future-Proofing Success</p>
              <p className="text-white/80 text-xs">
                After 3 years, the installation has supported major IT upgrades, office reconfigurations, and 40% staff growth
                without requiring additional trunking - demonstrating excellent planning and specification.
              </p>
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
              Trunking systems provide accessible, organised cable management with PVC offering ease of installation
              for commercial environments and steel delivering robust protection for industrial applications.
              Proper segregation, fill factor control and earthing (for steel) ensure safe, compliant installations.
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
            <Link to="../2-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[44px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../2-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Module3Section2_3;
