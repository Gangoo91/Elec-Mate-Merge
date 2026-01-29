import { ArrowLeft, Wrench, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Cable Installation Methods - HNC Module 4 Section 2.6";
const DESCRIPTION = "Master cable containment systems including tray, trunking and conduit, along with supports, bending radii, segregation and labelling requirements.";

const quickCheckQuestions = [
  {
    id: "tray-advantage",
    question: "What is the main advantage of perforated cable tray for power cables?",
    options: ["Lower cost", "Better air circulation for heat dissipation", "Easier cable pulling", "More waterproof"],
    correctIndex: 1,
    explanation: "Perforated cable tray allows air to circulate around cables, improving heat dissipation. This gives better current-carrying capacity (Reference Method E) compared to enclosed containment."
  },
  {
    id: "bend-radius",
    question: "What is the typical minimum bending radius for multicore power cables during installation?",
    options: ["2× cable diameter", "4× cable diameter", "6× cable diameter", "10× cable diameter"],
    correctIndex: 2,
    explanation: "For multicore power cables, the minimum bending radius during installation is typically 6× the overall cable diameter. Single-core cables may require 8× or more depending on conductor size."
  },
  {
    id: "segregation-reason",
    question: "Why must data/telecom cables be segregated from power cables?",
    options: ["Different colours", "Electromagnetic interference from power can corrupt data signals", "They have different temperatures", "Building regulations require it"],
    correctIndex: 1,
    explanation: "Power cables generate electromagnetic fields that can induce noise in data cables, causing signal corruption. BS 7671 Chapter 52 and BS 6701 require segregation or screening."
  },
  {
    id: "support-spacing",
    question: "What determines the spacing of cable supports?",
    options: ["Just aesthetic preference", "Cable type, size and weight to prevent sagging", "Always 1 metre", "Only manufacturer preference"],
    correctIndex: 1,
    explanation: "Support spacing depends on cable construction, weight, and the containment type. Tables in BS 7671 provide maximum spacing to prevent excessive sagging and mechanical stress."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which containment system provides the best current-carrying capacity for multicore cables?",
    options: [
      "Conduit in thermal insulation",
      "Enclosed trunking",
      "Perforated cable tray",
      "Surface-mounted conduit"
    ],
    correctAnswer: 2,
    explanation: "Perforated cable tray (Reference Method E) provides the best air circulation around cables, resulting in the highest current-carrying capacity of common containment methods."
  },
  {
    id: 2,
    question: "What is the maximum fill ratio for trunking according to BS 7671?",
    options: [
      "35%",
      "45%",
      "55%",
      "65%"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 recommends a maximum 45% fill ratio for trunking. This allows space for heat dissipation and makes cable installation and maintenance practical."
  },
  {
    id: 3,
    question: "Metal conduit can be used as the CPC provided:",
    options: [
      "It is painted",
      "Joints maintain electrical continuity and have adequate cross-sectional area",
      "It is less than 10m long",
      "Only in domestic installations"
    ],
    correctAnswer: 1,
    explanation: "Metal conduit can serve as CPC when all joints maintain electrical continuity (proper couplers, not just threaded connections) and the conduit CSA is adequate for fault current."
  },
  {
    id: 4,
    question: "When cables cross a building movement joint, what should be provided?",
    options: [
      "Rigid fixings on both sides",
      "Flexible section or loop to accommodate movement",
      "No special provision needed",
      "Concrete filling"
    ],
    correctAnswer: 1,
    explanation: "Movement joints allow building sections to expand, contract, or move independently. Cables crossing them must have slack or flexible sections to prevent damage from movement."
  },
  {
    id: 5,
    question: "What is the minimum separation between power and data cables in the same trunking?",
    options: [
      "Not permitted - must be in separate trunking",
      "50mm",
      "300mm or metal divider",
      "No separation required"
    ],
    correctAnswer: 2,
    explanation: "BS 7671 permits power and data cables in the same trunking if separated by 300mm or a metal divider. Many specifiers require complete segregation for cleaner installations."
  },
  {
    id: 6,
    question: "Why must SWA cable glands be correctly tightened?",
    options: [
      "Just for appearance",
      "To grip armour wires for electrical continuity and mechanical retention",
      "To prevent water entry only",
      "To make termination easier"
    ],
    correctAnswer: 1,
    explanation: "Glands must grip the armour wires to provide electrical continuity (for CPC function) and mechanical retention (preventing cable pullout). Both cone and nut must be properly tightened."
  },
  {
    id: 7,
    question: "What is the primary purpose of cable labelling?",
    options: [
      "To look professional",
      "For identification during maintenance, fault finding and future modifications",
      "To meet insurance requirements only",
      "To track cable costs"
    ],
    correctAnswer: 1,
    explanation: "Clear labelling enables safe isolation, efficient fault finding, and accurate identification during modifications. BS 7671 requires cables to be identifiable at termination points."
  },
  {
    id: 8,
    question: "For vertical cable runs, what is the maximum spacing for supports?",
    options: [
      "3m for all cables",
      "Depends on cable type and size",
      "5m for all cables",
      "No supports needed vertically"
    ],
    correctAnswer: 1,
    explanation: "Vertical support spacing varies by cable type. Heavy SWA cables may need supports every 1-2m, while lighter cables can span further. Tables in BS 7671 provide guidance."
  },
  {
    id: 9,
    question: "What is the purpose of fire-stopping where cables pass through compartment walls?",
    options: [
      "To support the cables",
      "To maintain fire compartmentation and prevent fire/smoke spread",
      "To improve aesthetics",
      "To reduce noise transmission"
    ],
    correctAnswer: 1,
    explanation: "Fire-stopping maintains the fire resistance of compartment walls and floors. Without it, fire and smoke could spread rapidly through cable penetrations, undermining the fire strategy."
  },
  {
    id: 10,
    question: "When should draw wires be left in conduit installations?",
    options: [
      "Never - they are removed after installation",
      "Always, for future cable additions or replacements",
      "Only in external conduit",
      "Only when specified by the client"
    ],
    correctAnswer: 1,
    explanation: "Good practice is to leave draw wires in conduit for future maintenance. This makes adding or replacing cables much easier than feeding new draw wires through long or complex runs."
  }
];

const faqs = [
  {
    question: "How do I choose between cable tray, trunking and conduit?",
    answer: "Cable tray suits large cable quantities (risers, plantrooms) and offers best current capacity. Trunking is ideal for accessible routes needing neat appearance (offices, corridors) and allows easy modification. Conduit protects individual circuits and suits surface/concealed runs. Consider cable quantity, accessibility needs, aesthetics, future modifications and cost."
  },
  {
    question: "What fire-stopping products should I use?",
    answer: "Use fire-stopping products tested and certified for the specific penetration type (cables through walls/floors). Options include intumescent collars, fire-rated pillows, ablative coatings and fire-resistant compound. The product must match the fire rating required (30, 60, 90, 120 minutes) and be installed per manufacturer's instructions."
  },
  {
    question: "Can I run cables through structural members like steelwork?",
    answer: "Generally avoid penetrating structural members. If essential, obtain structural engineer approval first. Holes must be sleeved, sized appropriately, and positioned to minimise structural impact. Fire protection may need reinstating. Consider alternative routes before penetrating structure."
  },
  {
    question: "What spacing is required between cable supports?",
    answer: "BS 7671 Table 4A provides guidance. Typically: for unarmoured horizontal cables in trunking, 450mm max; clipped direct on surface, 250-400mm depending on cable size; vertical runs may need closer spacing for heavy cables. SWA cables can span further due to their self-supporting nature."
  },
  {
    question: "How should cables be labelled?",
    answer: "Labels should be durable (engraved or printed, not handwritten), located at both ends and at intermediate access points, include circuit reference matching distribution board schedule, and use consistent format throughout the installation. Consider cable ties with labels, wraparound labels, or engraved ferrules."
  },
  {
    question: "What are the requirements for cables in ceiling voids?",
    answer: "Cables in accessible ceiling voids should be supported (not laid on ceiling tiles), adequately protected from mechanical damage, not in contact with thermal insulation (or derated appropriately), and accessible for inspection. Fire barriers may be needed at compartment boundaries."
  }
];

const HNCModule4Section2_6 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Wrench className="h-4 w-4" />
            <span>Module 4.2.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Cable Installation Methods
          </h1>
          <p className="text-white/80">
            Containment systems, supports, bending radii, segregation and labelling for professional installations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Tray:</strong> Best capacity, plantrooms/risers</li>
              <li className="pl-1"><strong>Trunking:</strong> Accessible, office environments</li>
              <li className="pl-1"><strong>Conduit:</strong> Protection for individual circuits</li>
              <li className="pl-1"><strong>Bending:</strong> Min 6× cable diameter typically</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Risers:</strong> Ladder rack for major cables</li>
              <li className="pl-1"><strong>Offices:</strong> Floor/dado trunking common</li>
              <li className="pl-1"><strong>Plant:</strong> Cable tray and basket</li>
              <li className="pl-1"><strong>Data:</strong> Segregated containment required</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Select appropriate containment systems for different applications",
              "Understand cable tray, trunking and conduit characteristics",
              "Apply minimum bending radius requirements",
              "Design cable support systems correctly",
              "Implement segregation between power and data cables",
              "Apply labelling and identification requirements"
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

        {/* Section 1: Containment Systems */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Containment Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Cable containment protects cables from damage, provides support, and organises cable routes.
              The choice of containment affects current-carrying capacity, installation cost and aesthetics.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Containment Types Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Best For</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Reference Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Characteristics</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Cable Tray (perforated)</td>
                      <td className="border border-white/10 px-3 py-2">Plantrooms, risers</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">E (best)</td>
                      <td className="border border-white/10 px-3 py-2">Best heat dissipation, easy access</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Cable Ladder</td>
                      <td className="border border-white/10 px-3 py-2">Heavy cables, long spans</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">E</td>
                      <td className="border border-white/10 px-3 py-2">Strong, good for SWA</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Cable Basket</td>
                      <td className="border border-white/10 px-3 py-2">Data cables, offices</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">E</td>
                      <td className="border border-white/10 px-3 py-2">Lightweight, flexible routing</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Trunking (metal)</td>
                      <td className="border border-white/10 px-3 py-2">Offices, corridors</td>
                      <td className="border border-white/10 px-3 py-2">B</td>
                      <td className="border border-white/10 px-3 py-2">Neat, accessible, can be decorative</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Conduit (surface)</td>
                      <td className="border border-white/10 px-3 py-2">Single circuits</td>
                      <td className="border border-white/10 px-3 py-2">B</td>
                      <td className="border border-white/10 px-3 py-2">Good protection, concealed or exposed</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Conduit (insulated wall)</td>
                      <td className="border border-white/10 px-3 py-2">Concealed runs</td>
                      <td className="border border-white/10 px-3 py-2 text-orange-400">A (poorest)</td>
                      <td className="border border-white/10 px-3 py-2">Hidden, but poor heat dissipation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cable Tray Sizing</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Calculate total cable cross-sectional area</li>
                  <li className="pl-1">Allow 50% spare for future additions</li>
                  <li className="pl-1">Consider return bends and cable joints</li>
                  <li className="pl-1">Standard widths: 75, 100, 150, 225, 300, 450, 600mm</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Trunking Fill Limits</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Maximum 45% fill recommended</li>
                  <li className="pl-1">Account for cable bends at corners</li>
                  <li className="pl-1">Space factor tables in BS 7671</li>
                  <li className="pl-1">Factor = cable OD² × quantity</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Capacity note:</strong> Reference Method E (cable tray) can give 20-40% higher current ratings than Method B (trunking) for the same cable size.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Supports and Bending Radii */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Supports and Bending Radii
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper cable support prevents sagging, mechanical stress and damage. Bending radii must
              be respected to avoid damaging cable insulation and conductors.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cable Support Spacing (Horizontal)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Cable Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Clipped Direct</th>
                      <th className="border border-white/10 px-3 py-2 text-left">On Tray/Ladder</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Small flat cables (&lt;10mm)</td>
                      <td className="border border-white/10 px-3 py-2">250mm</td>
                      <td className="border border-white/10 px-3 py-2">N/A (in trunking)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Flat T&E cables</td>
                      <td className="border border-white/10 px-3 py-2">300mm</td>
                      <td className="border border-white/10 px-3 py-2">Contained in trunking</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Multicore (&lt;9mm OD)</td>
                      <td className="border border-white/10 px-3 py-2">250mm</td>
                      <td className="border border-white/10 px-3 py-2">Tray support sufficient</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Multicore (9-15mm OD)</td>
                      <td className="border border-white/10 px-3 py-2">300mm</td>
                      <td className="border border-white/10 px-3 py-2">Tray support sufficient</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Multicore (15-20mm OD)</td>
                      <td className="border border-white/10 px-3 py-2">350mm</td>
                      <td className="border border-white/10 px-3 py-2">Tray support sufficient</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">SWA cables</td>
                      <td className="border border-white/10 px-3 py-2">450-600mm</td>
                      <td className="border border-white/10 px-3 py-2">Self-supporting over long spans</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Minimum Bending Radii</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white/70 mb-1">Multicore Cables:</p>
                  <ul className="text-white space-y-0.5">
                    <li>• Fixed installation: <strong>6× OD</strong></li>
                    <li>• During installation: <strong>6× OD</strong></li>
                    <li>• XLPE insulation: <strong>8× OD</strong> preferred</li>
                  </ul>
                </div>
                <div>
                  <p className="text-white/70 mb-1">Single-Core Cables:</p>
                  <ul className="text-white space-y-0.5">
                    <li>• 25mm² and below: <strong>6× OD</strong></li>
                    <li>• 35-120mm²: <strong>8× OD</strong></li>
                    <li>• 150mm² and above: <strong>10× OD</strong></li>
                  </ul>
                </div>
              </div>
              <p className="text-xs text-white/60 mt-2">OD = Overall Diameter of cable</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Vertical Support Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Prevent cable weight causing damage at fixings</li>
                <li className="pl-1">Heavy SWA may need supports every 1-2m vertically</li>
                <li className="pl-1">Consider cleating to prevent slippage down tray</li>
                <li className="pl-1">Fire barrier supports needed at compartment floors</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Quality check:</strong> Inspect bends during installation - kinked or flattened cables indicate the bend was too tight.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Segregation Requirements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Segregation Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Different cable types must often be segregated to prevent electromagnetic interference,
              fire spread, and to maintain system integrity. BS 7671 Chapter 52 and BS 6701 provide guidance.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cable Categories for Segregation</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Category</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Examples</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Segregation Required From</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Band I</td>
                      <td className="border border-white/10 px-3 py-2">Fire alarm, emergency comms, SELV</td>
                      <td className="border border-white/10 px-3 py-2">Band II unless screened</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Band II</td>
                      <td className="border border-white/10 px-3 py-2">Power circuits (230V/400V)</td>
                      <td className="border border-white/10 px-3 py-2">Band I; data/telecom</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Telecom/Data</td>
                      <td className="border border-white/10 px-3 py-2">Cat 6, fibre, BMS</td>
                      <td className="border border-white/10 px-3 py-2">Power cables</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Fire-resistant</td>
                      <td className="border border-white/10 px-3 py-2">FP cables</td>
                      <td className="border border-white/10 px-3 py-2">Standard cables in fire</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Segregation Methods</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white/70 mb-1">Physical Separation:</p>
                  <ul className="text-white space-y-0.5">
                    <li>• 300mm minimum spacing</li>
                    <li>• Separate containment systems</li>
                    <li>• Different cable routes</li>
                  </ul>
                </div>
                <div>
                  <p className="text-white/70 mb-1">Barriers/Screening:</p>
                  <ul className="text-white space-y-0.5">
                    <li>• Metal dividers in shared trunking</li>
                    <li>• Screened cables (STP, SWA)</li>
                    <li>• Earthed metallic conduit</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Crossing Points</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Where cables must cross, do so at <strong>90°</strong> to minimise coupling</li>
                <li className="pl-1">Maintain maximum practical spacing at crossing</li>
                <li className="pl-1">Consider screened cables for sensitive circuits</li>
                <li className="pl-1">Document crossing points for future reference</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Data centre tip:</strong> Complete physical separation is preferred - use separate tray systems at different levels for power and data.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Labelling and Documentation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Labelling and Documentation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper labelling is essential for safe operation, maintenance and future modifications.
              BS 7671 requires cables to be identifiable, and good practice extends this to
              comprehensive cable management documentation.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Label Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Both ends:</strong> Label at origin (DB) and destination (equipment)</li>
                <li className="pl-1"><strong>Intermediate points:</strong> At junction boxes, through walls, at tray junctions</li>
                <li className="pl-1"><strong>Content:</strong> Circuit reference, voltage, source DB, destination</li>
                <li className="pl-1"><strong>Durability:</strong> Engraved, printed or UV-resistant - not handwritten</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Label Types</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Durability</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Wrap-around labels</td>
                      <td className="border border-white/10 px-3 py-2">Individual cables</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">Good</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cable ties with tags</td>
                      <td className="border border-white/10 px-3 py-2">Grouped cables</td>
                      <td className="border border-white/10 px-3 py-2">Moderate</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Engraved ferrules</td>
                      <td className="border border-white/10 px-3 py-2">Termination points</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">Excellent</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Heat-shrink labels</td>
                      <td className="border border-white/10 px-3 py-2">Permanent identification</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">Excellent</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Documentation to Provide</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>As-built drawings:</strong> Showing actual cable routes, not just design intent</li>
                <li className="pl-1"><strong>Cable schedules:</strong> Type, size, length, circuit reference for each cable</li>
                <li className="pl-1"><strong>Test results:</strong> Insulation resistance, continuity, polarity</li>
                <li className="pl-1"><strong>Distribution board schedules:</strong> Matching label references</li>
                <li className="pl-1"><strong>Fire stopping:</strong> Record of products used and locations</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
              <p className="text-sm font-medium text-orange-400 mb-2">Fire Stopping Requirements</p>
              <p className="text-sm text-white mb-2">
                Where cables pass through fire compartment walls or floors:
              </p>
              <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                <li className="pl-1">Install proprietary fire-stopping to match wall/floor fire rating</li>
                <li className="pl-1">Allow for future cable additions where practical</li>
                <li className="pl-1">Label fire-stop locations for inspection access</li>
                <li className="pl-1">Record fire-stop product details in O&M manual</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Photograph cable routes before walls are closed - invaluable for future maintenance and modifications.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Installation Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Office Floor Distribution</h3>
              <p className="text-sm text-white mb-2">
                <strong>Requirement:</strong> Power and data distribution for open-plan office, 500m² floor plate
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/70">Containment selection:</p>
                <p>- Floor trunking for workstation outlets (power)</p>
                <p>- Raised floor void with basket for data cables</p>
                <p>- Metal dado trunking around perimeter</p>
                <p>- Segregation: minimum 50mm between power/data compartments</p>
                <p className="mt-2 text-white/70">Installation notes:</p>
                <p>- Maintain 45% max fill in trunking</p>
                <p>- Label all outlets to match floor plan references</p>
                <p>- Fire-stop all penetrations to riser</p>
                <p className="mt-2 text-green-400">→ Trunking allows easy modifications as office layout changes</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Main Riser Installation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Requirement:</strong> 10-storey commercial building electrical riser, sub-mains and small power
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/70">Containment selection:</p>
                <p>- Heavy-duty cable ladder for SWA sub-mains</p>
                <p>- Perforated cable tray for final circuit cables</p>
                <p>- Separate basket system for data/BMS</p>
                <p className="mt-2 text-white/70">Installation notes:</p>
                <p>- Vertical support cleats every 2m for SWA</p>
                <p>- Minimum bend radius 6× OD at floor entries</p>
                <p>- Fire barriers at each floor with fire-stop</p>
                <p>- Label all cables at each floor level</p>
                <p className="mt-2 text-green-400">→ Ladder rack supports heavy sub-mains over long vertical spans</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Plant Room Cable Management</h3>
              <p className="text-sm text-white mb-2">
                <strong>Requirement:</strong> Basement plant room with multiple AHUs, pumps and chillers
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/70">Containment selection:</p>
                <p>- Main cable tray routes from MCC</p>
                <p>- Steel conduit drops to individual motors</p>
                <p>- SWA clipped direct for short runs</p>
                <p className="mt-2 text-white/70">Installation notes:</p>
                <p>- Support tray at 1.5m centres, cleats at drops</p>
                <p>- Maintain 300mm clearance from hot surfaces</p>
                <p>- IP-rated glands for damp environment</p>
                <p>- Clear labelling of motor circuits matching MCC</p>
                <p className="mt-2 text-green-400">→ Combination of containment suits varied equipment</p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Quality Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">No kinks or tight bends - minimum 6× cable OD</li>
                <li className="pl-1">Supports correctly spaced - no excessive sagging</li>
                <li className="pl-1">Cables secured but not over-tightened in clips</li>
                <li className="pl-1">Segregation maintained throughout route</li>
                <li className="pl-1">Fire-stopping complete and labelled</li>
                <li className="pl-1">All cables labelled at both ends</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Containment Earthing</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Metal tray/trunking should be earthed throughout</li>
                <li className="pl-1">Use proper earth links at joints</li>
                <li className="pl-1">Connect to MET at origin</li>
                <li className="pl-1">Test continuity before energising circuits</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Overloading containment:</strong> Respect 45% fill limit</li>
                <li className="pl-1"><strong>Missing fire-stops:</strong> Every compartment penetration needs stopping</li>
                <li className="pl-1"><strong>Poor gland selection:</strong> Match gland IP rating to environment</li>
                <li className="pl-1"><strong>Inadequate segregation:</strong> Power/data too close causes interference</li>
              </ul>
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

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Containment Selection</p>
                <ul className="space-y-0.5">
                  <li>Cable tray: Best capacity, plant rooms</li>
                  <li>Trunking: Accessible, 45% max fill</li>
                  <li>Conduit: Individual circuits, protection</li>
                  <li>Basket: Lightweight, data cables</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Requirements</p>
                <ul className="space-y-0.5">
                  <li>Bend radius: min 6× cable OD</li>
                  <li>Segregation: 300mm or metal divider</li>
                  <li>Fire-stop: All compartment penetrations</li>
                  <li>Labels: Both ends, durable format</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section2-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Prev: Cable Types and Selection
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section3">
              Next: Section 3
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule4Section2_6;
