import { ArrowLeft, Cable, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Cable Types and Selection - HNC Module 4 Section 2.5";
const DESCRIPTION = "Understand cable insulation types including XLPE, PVC, LSF, SWA armoured cables, FP fire-resistant and MI cables for building services applications.";

const quickCheckQuestions = [
  {
    id: "xlpe-advantage",
    question: "What is the main advantage of XLPE insulation over PVC?",
    options: ["Lower cost", "Higher operating temperature (90°C vs 70°C)", "Better flexibility", "Easier to terminate"],
    correctIndex: 1,
    explanation: "XLPE (cross-linked polyethylene) can operate at 90°C compared to PVC's 70°C limit. This gives XLPE higher current-carrying capacity and better fault withstand capability."
  },
  {
    id: "lsf-meaning",
    question: "What does LSF/LSZH cable designation mean?",
    options: ["Low Smoke and Fume / Low Smoke Zero Halogen", "Large Single Flex / Low Signal Zero Harmonic", "Limited Service Factor / Low Speed Zero Hertz", "Light Sheath Flexible / Low Static Zone High"],
    correctIndex: 0,
    explanation: "LSF (Low Smoke and Fume) and LSZH (Low Smoke Zero Halogen) cables emit minimal toxic smoke when burned, making them essential for occupied buildings and escape routes."
  },
  {
    id: "swa-purpose",
    question: "What is the primary purpose of SWA (Steel Wire Armoured) cable?",
    options: ["To increase current capacity", "To provide mechanical protection and can act as CPC", "To reduce electromagnetic interference", "To improve flexibility"],
    correctIndex: 1,
    explanation: "Steel wire armouring provides mechanical protection against impact and crushing. The armour can also serve as the circuit protective conductor (CPC) when properly terminated."
  },
  {
    id: "fp-cable-use",
    question: "Where are FP (Fire Performance) cables typically required?",
    options: ["In wet locations", "For circuits that must continue operating during a fire", "In high ambient temperatures only", "For underground installations"],
    correctIndex: 1,
    explanation: "FP cables maintain circuit integrity during fire conditions. They're required for fire alarm systems, emergency lighting, smoke control and other life safety circuits per BS 5839 and BS 5266."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "PVC insulated cables are limited to what maximum conductor operating temperature?",
    options: [
      "60°C",
      "70°C",
      "90°C",
      "105°C"
    ],
    correctAnswer: 1,
    explanation: "PVC (polyvinyl chloride) insulated cables have a maximum continuous operating temperature of 70°C. Exceeding this causes degradation of the insulation."
  },
  {
    id: 2,
    question: "What is the main disadvantage of standard PVC cables in a fire?",
    options: [
      "They are expensive",
      "They emit dense black smoke containing toxic halogens",
      "They conduct electricity when hot",
      "They expand excessively"
    ],
    correctAnswer: 1,
    explanation: "PVC contains chlorine (a halogen) which produces hydrogen chloride gas when burned. This is highly toxic and corrosive, obscuring escape routes and damaging equipment."
  },
  {
    id: 3,
    question: "XLPE cables can withstand short-circuit temperatures up to:",
    options: [
      "160°C",
      "200°C",
      "250°C",
      "300°C"
    ],
    correctAnswer: 2,
    explanation: "XLPE insulation can withstand 250°C during short-circuit conditions (vs 160°C for PVC). This gives XLPE cables superior fault withstand capability (k = 143 vs 115)."
  },
  {
    id: 4,
    question: "Which cable type is most suitable for a circuit feeding emergency lighting in a hospital corridor?",
    options: [
      "Standard PVC/PVC",
      "XLPE/SWA",
      "FP (fire performance) cable",
      "Flexible cord"
    ],
    correctAnswer: 2,
    explanation: "Fire performance cables maintain circuit integrity during fire, essential for emergency lighting that must operate during evacuation. BS 5266 requires enhanced fire performance for emergency lighting."
  },
  {
    id: 5,
    question: "MI (Mineral Insulated) cable uses what material for insulation?",
    options: [
      "Silicon rubber",
      "Magnesium oxide powder",
      "Glass fibre",
      "Ceramic tape"
    ],
    correctAnswer: 1,
    explanation: "MI cables use compressed magnesium oxide (MgO) powder as insulation, contained within a seamless copper or steel sheath. MgO is completely fireproof and non-combustible."
  },
  {
    id: 6,
    question: "What is a key consideration when selecting LSF cables for a data centre?",
    options: [
      "They are cheaper than PVC",
      "Reduced smoke protects sensitive equipment and personnel",
      "They have higher current ratings",
      "They are more flexible"
    ],
    correctAnswer: 1,
    explanation: "Data centres contain expensive equipment and personnel. LSF cables reduce toxic smoke during fire, protecting both. Standard PVC smoke can damage electronics and hinder evacuation."
  },
  {
    id: 7,
    question: "The armour on SWA cables can be used as the CPC provided:",
    options: [
      "The cable is installed underground",
      "The armour is properly terminated with suitable glands and earthed",
      "The cable is less than 50m long",
      "Only in domestic installations"
    ],
    correctAnswer: 1,
    explanation: "SWA armour can serve as CPC when terminated with proper glands that make low-resistance contact with the armour and connect it to the earthing system at both ends."
  },
  {
    id: 8,
    question: "Which cable construction provides both mechanical protection AND enhanced fire resistance?",
    options: [
      "PVC/SWA",
      "XLPE/SWA",
      "FP200 Gold",
      "H07RN-F"
    ],
    correctAnswer: 2,
    explanation: "FP200 Gold cables have both fire-resistant mica-glass tape insulation AND metallic armouring, providing mechanical protection and circuit integrity in fire conditions."
  },
  {
    id: 9,
    question: "For external underground installation to an outbuilding, which cable type is most appropriate?",
    options: [
      "Twin and earth",
      "SWA (Steel Wire Armoured)",
      "Flexible cord",
      "FP cable"
    ],
    correctAnswer: 1,
    explanation: "SWA cables provide the mechanical protection needed for burial and outdoor exposure. The armour protects against ground movement, digging damage and environmental conditions."
  },
  {
    id: 10,
    question: "What standard governs fire performance requirements for cables supporting emergency systems?",
    options: [
      "BS 7671 only",
      "BS 5839 (fire detection) and BS 5266 (emergency lighting)",
      "BS 8519",
      "BS EN 50575"
    ],
    correctAnswer: 1,
    explanation: "BS 5839 specifies cable requirements for fire alarm systems, and BS 5266 for emergency lighting. Both require cables that maintain circuit integrity in fire conditions."
  }
];

const faqs = [
  {
    question: "When should I specify XLPE instead of PVC cables?",
    answer: "Specify XLPE when: higher current capacity is needed for the same size, ambient temperatures exceed 30°C (XLPE handles heat better), fault levels are high (better k value), or when space is limited and smaller cables are advantageous. XLPE costs slightly more but often allows smaller cables, offsetting the price difference."
  },
  {
    question: "Are LSF/LSZH cables mandatory in all buildings?",
    answer: "Not universally, but they're required or strongly recommended in: escape routes and protected corridors, public buildings with high occupancy, hospitals and care homes, underground stations and tunnels, high-rise buildings, and anywhere specified by the fire strategy. Building Regulations Approved Document B and BS 5839/5266 provide guidance."
  },
  {
    question: "Can I use the SWA armour as the only earth conductor?",
    answer: "Yes, SWA armour can serve as the sole CPC for the circuit when: proper cable glands are used that grip and earth the armour, the armour has adequate cross-sectional area for fault current (check adiabatic equation), and connections are made at both ends. Many installations include an additional CPC within the cable for redundancy."
  },
  {
    question: "What's the difference between FP and standard fire-resistant cables?",
    answer: "FP (Fire Performance/Piren) cables like FP200 maintain circuit integrity during fire - the circuit continues to operate while the building burns. Standard 'fire resistant' may only mean the cable won't propagate flame. For life safety systems, always specify cables meeting BS 8519 Category 1 or 2."
  },
  {
    question: "Why are MI cables used less frequently despite their superior fire performance?",
    answer: "MI cables are expensive, require specialist termination skills, and the MgO insulation is hygroscopic (absorbs moisture if seals are damaged). However, for critical applications like hospital operating theatres, nuclear facilities, or extreme environments, MI remains the gold standard."
  },
  {
    question: "How do I select cables for hazardous areas (ATEX)?",
    answer: "Hazardous area cable selection depends on zone classification and specific hazards. Generally: use cables certified for the zone, prefer armoured types, ensure IP-rated glands, and follow BS EN 60079 requirements. This is specialist work requiring explosive atmosphere competency."
  }
];

const HNCModule4Section2_5 = () => {
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
            <Cable className="h-4 w-4" />
            <span>Module 4.2.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Cable Types and Selection
          </h1>
          <p className="text-white/80">
            Understanding insulation materials, armoured cables and fire-resistant constructions
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>PVC:</strong> 70°C, general purpose, low cost</li>
              <li className="pl-1"><strong>XLPE:</strong> 90°C, higher capacity, better fault withstand</li>
              <li className="pl-1"><strong>LSF/LSZH:</strong> Low smoke, for occupied buildings</li>
              <li className="pl-1"><strong>SWA:</strong> Mechanical protection, external use</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Risers:</strong> XLPE/LSF for capacity and safety</li>
              <li className="pl-1"><strong>Fire systems:</strong> FP cables mandatory</li>
              <li className="pl-1"><strong>External plant:</strong> SWA for protection</li>
              <li className="pl-1"><strong>Data centres:</strong> LSF to protect equipment</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Compare PVC, XLPE and other insulation materials",
              "Specify LSF/LSZH cables for appropriate applications",
              "Select SWA cables for mechanical protection requirements",
              "Understand fire performance cable requirements (FP, MI)",
              "Apply cable selection criteria for different environments",
              "Match cable specifications to building services applications"
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

        {/* Section 1: XLPE and PVC Insulation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            XLPE and PVC Insulation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The two most common insulation materials in building services are PVC (polyvinyl chloride)
              and XLPE (cross-linked polyethylene). Each has distinct properties affecting cable selection.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Insulation Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Property</th>
                      <th className="border border-white/10 px-3 py-2 text-left">PVC (70°C)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">XLPE (90°C)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Operating temperature</td>
                      <td className="border border-white/10 px-3 py-2">70°C</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">90°C</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Short-circuit temperature</td>
                      <td className="border border-white/10 px-3 py-2">160°C</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">250°C</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">k value (copper)</td>
                      <td className="border border-white/10 px-3 py-2">115</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">143</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Current capacity</td>
                      <td className="border border-white/10 px-3 py-2">Reference</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">~20% higher</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cost</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">Lower</td>
                      <td className="border border-white/10 px-3 py-2">Higher</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Flexibility</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">Better</td>
                      <td className="border border-white/10 px-3 py-2">Stiffer</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fire performance</td>
                      <td className="border border-white/10 px-3 py-2 text-orange-400">Produces toxic smoke</td>
                      <td className="border border-white/10 px-3 py-2">Less toxic smoke</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">When to Use PVC</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">General purpose final circuits</li>
                  <li className="pl-1">Cost-sensitive installations</li>
                  <li className="pl-1">Where flexibility is important</li>
                  <li className="pl-1">Normal ambient temperatures</li>
                  <li className="pl-1">Non-critical applications</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">When to Use XLPE</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">High ambient temperature locations</li>
                  <li className="pl-1">Main distribution and sub-mains</li>
                  <li className="pl-1">High fault level installations</li>
                  <li className="pl-1">Space-constrained cable routes</li>
                  <li className="pl-1">Underground and external use (with SWA)</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Cost tip:</strong> XLPE's higher capacity often means a smaller cable can be used, potentially offsetting the higher per-metre cost.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: LSF and LSZH Cables */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            LSF and LSZH Cables
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In occupied buildings, the smoke and gases released by burning cables can be more dangerous
              than the fire itself. Low Smoke and Fume (LSF) and Low Smoke Zero Halogen (LSZH) cables
              address this critical safety issue.
            </p>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
              <p className="text-sm font-medium text-orange-400 mb-2">PVC Fire Hazards</p>
              <p className="text-sm text-white">
                Standard PVC cables burning in a fire produce:
              </p>
              <ul className="text-sm text-white mt-2 space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Dense black smoke:</strong> Obscures escape routes</li>
                <li className="pl-1"><strong>Hydrogen chloride gas:</strong> Toxic and corrosive</li>
                <li className="pl-1"><strong>Acidic residue:</strong> Damages electronics and structures</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">LSF vs LSZH Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Designation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Full Name</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Characteristics</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">LSF</td>
                      <td className="border border-white/10 px-3 py-2">Low Smoke and Fume</td>
                      <td className="border border-white/10 px-3 py-2">Reduced smoke; may still contain some halogens</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">LSZH / LSOH</td>
                      <td className="border border-white/10 px-3 py-2">Low Smoke Zero Halogen</td>
                      <td className="border border-white/10 px-3 py-2">No halogens; minimal toxic fumes</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">OHLS</td>
                      <td className="border border-white/10 px-3 py-2">Zero Halogen Low Smoke</td>
                      <td className="border border-white/10 px-3 py-2">Same as LSZH (alternative designation)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Where LSF/LSZH is Required or Recommended</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Escape routes:</strong> Corridors, stairwells, lobbies</li>
                <li className="pl-1"><strong>Public buildings:</strong> Hospitals, schools, shopping centres</li>
                <li className="pl-1"><strong>Transport:</strong> Underground stations, tunnels, airports</li>
                <li className="pl-1"><strong>High-rise:</strong> Buildings where evacuation takes time</li>
                <li className="pl-1"><strong>Data centres:</strong> To protect sensitive equipment</li>
                <li className="pl-1"><strong>Ships and offshore:</strong> Confined spaces</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Specification tip:</strong> Check the building fire strategy document - it often mandates LSF/LSZH throughout or in specific areas.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: SWA Armoured Cables */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            SWA Armoured Cables
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Steel Wire Armoured (SWA) cables provide robust mechanical protection for demanding
              environments. They're the standard choice for external, underground and industrial applications
              in building services.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">SWA Cable Construction</p>
              <div className="text-sm text-white space-y-1">
                <p>1. <strong>Conductors:</strong> Copper or aluminium, stranded for flexibility</p>
                <p>2. <strong>Insulation:</strong> XLPE (preferred) or PVC around each conductor</p>
                <p>3. <strong>Bedding:</strong> PVC or LSF layer protecting conductors from armour</p>
                <p>4. <strong>Armour:</strong> Galvanised steel wires wound helically</p>
                <p>5. <strong>Outer sheath:</strong> PVC or LSF for corrosion protection</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">SWA Applications</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Why SWA?</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Underground supplies</td>
                      <td className="border border-white/10 px-3 py-2">Protects against ground movement, digging</td>
                      <td className="border border-white/10 px-3 py-2">Lay with warning tape above</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">External plant feeds</td>
                      <td className="border border-white/10 px-3 py-2">Weather and UV resistance</td>
                      <td className="border border-white/10 px-3 py-2">Clipped to walls or on tray</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Industrial areas</td>
                      <td className="border border-white/10 px-3 py-2">Impact and abrasion resistance</td>
                      <td className="border border-white/10 px-3 py-2">Often on ladder or tray</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Sub-mains</td>
                      <td className="border border-white/10 px-3 py-2">Mechanical protection for major circuits</td>
                      <td className="border border-white/10 px-3 py-2">Armour can act as CPC</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Outbuildings</td>
                      <td className="border border-white/10 px-3 py-2">Protected cable to detached structures</td>
                      <td className="border border-white/10 px-3 py-2">Direct burial or in duct</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Armour as CPC</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Requires proper gland termination</li>
                  <li className="pl-1">Must verify adiabatic compliance</li>
                  <li className="pl-1">Connect armour at both ends</li>
                  <li className="pl-1">Typically used with 4-core (no internal CPC)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Gland Selection</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>CW glands:</strong> Indoor, non-hazardous</li>
                  <li className="pl-1"><strong>BW glands:</strong> Indoor, weatherproof seal</li>
                  <li className="pl-1"><strong>E1W glands:</strong> Outdoor/weatherproof</li>
                  <li className="pl-1">Match gland to cable OD and armour type</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Installation note:</strong> SWA minimum bending radius is typically 6× cable diameter for fixed installations, 8× for single bend during installation.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Fire Performance and MI Cables */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Fire Performance and MI Cables
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              For life safety systems that must continue operating during a fire, standard cables are
              inadequate. Fire Performance (FP) cables and Mineral Insulated (MI) cables maintain
              circuit integrity under fire conditions.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fire Performance Classifications (BS 8519)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Category</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Fire Resistance</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Standard</td>
                      <td className="border border-white/10 px-3 py-2">Flame retardant only</td>
                      <td className="border border-white/10 px-3 py-2">General wiring</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Category 1</td>
                      <td className="border border-white/10 px-3 py-2">120 minutes at 950°C</td>
                      <td className="border border-white/10 px-3 py-2">Fire alarm, emergency lighting</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Category 2</td>
                      <td className="border border-white/10 px-3 py-2">Enhanced mechanical protection</td>
                      <td className="border border-white/10 px-3 py-2">Smoke ventilation, sprinkler pumps</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Category 3</td>
                      <td className="border border-white/10 px-3 py-2">Water resistance with fire</td>
                      <td className="border border-white/10 px-3 py-2">Firefighting lifts, wet risers</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Fire Performance Cables</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-elec-yellow mb-1">FP200 Gold</p>
                  <ul className="text-white space-y-1 text-xs">
                    <li>- Mica-glass tape insulation</li>
                    <li>- Aluminium tape screen + drain wire</li>
                    <li>- Maintains integrity in fire</li>
                    <li>- Popular for fire alarms, emergency lighting</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-elec-yellow mb-1">MICC / Pyro</p>
                  <ul className="text-white space-y-1 text-xs">
                    <li>- Mineral insulation (MgO)</li>
                    <li>- Copper sheath</li>
                    <li>- Completely fireproof</li>
                    <li>- Most demanding applications</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Life Safety System Cable Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Fire alarm (BS 5839):</strong> Enhanced fire resistance required</li>
                <li className="pl-1"><strong>Emergency lighting (BS 5266):</strong> Cable maintains circuit in fire</li>
                <li className="pl-1"><strong>Smoke control (BS 7346):</strong> Category 2 or 3 depending on system</li>
                <li className="pl-1"><strong>Firefighting lifts (BS EN 81-72):</strong> 120 minutes minimum</li>
                <li className="pl-1"><strong>Voice alarm (BS 5839-8):</strong> Enhanced fire performance</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Mineral Insulated (MI) Cables</p>
              <p className="text-sm text-white mb-2">
                MI cables use magnesium oxide powder insulation in a seamless metal sheath:
              </p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white/70 mb-1">Advantages:</p>
                  <ul className="text-white space-y-0.5 text-xs">
                    <li>+ Completely fireproof</li>
                    <li>+ Very high temperature rating</li>
                    <li>+ Long service life (50+ years)</li>
                    <li>+ Sheath provides mechanical protection</li>
                  </ul>
                </div>
                <div>
                  <p className="text-white/70 mb-1">Disadvantages:</p>
                  <ul className="text-white space-y-0.5 text-xs">
                    <li>- Expensive</li>
                    <li>- Specialist termination required</li>
                    <li>- MgO is hygroscopic (absorbs moisture)</li>
                    <li>- Less flexible, awkward to route</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Standard reference:</strong> BS 8519 specifies selection and installation of fire-resistant cables in buildings. Always check the fire strategy for specific requirements.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Selection Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Office Distribution Board Sub-Main</h3>
              <p className="text-sm text-white mb-2">
                <strong>Requirement:</strong> 100A 3-phase sub-main, 45m in riser, 35°C ambient, grouped with 5 other circuits
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/70">Decision factors:</p>
                <p>- Elevated ambient: favour XLPE (90°C rating)</p>
                <p>- Grouped circuits: XLPE capacity advantage helps</p>
                <p>- Riser location: LSF for fire safety</p>
                <p>- No mechanical hazards: no armour needed</p>
                <p className="mt-2 text-green-400">→ Select: 4-core 25mm² XLPE/LSF on cable tray</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Emergency Lighting Circuit</h3>
              <p className="text-sm text-white mb-2">
                <strong>Requirement:</strong> Emergency lighting circuit in hospital, 80m route through ceiling void and corridor
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/70">Decision factors:</p>
                <p>- Life safety circuit: fire performance required</p>
                <p>- BS 5266: enhanced fire resistance needed</p>
                <p>- Hospital: maximum smoke safety required</p>
                <p>- Ceiling void: may need mechanical protection</p>
                <p className="mt-2 text-green-400">→ Select: FP200 Gold (2-core + CPC) Category 1</p>
                <p className="text-white/60">Or MICC where budget allows maximum protection</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: External Chiller Supply</h3>
              <p className="text-sm text-white mb-2">
                <strong>Requirement:</strong> 45kW chiller on roof, supply from basement, 60m route including 30m underground
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/70">Decision factors:</p>
                <p>- Underground section: needs SWA protection</p>
                <p>- External/roof: weatherproof required</p>
                <p>- 60m length: check voltage drop (favour XLPE)</p>
                <p>- High fault level near main: verify k²S² (XLPE helps)</p>
                <p className="mt-2 text-green-400">→ Select: 4-core 16mm² XLPE/SWA throughout</p>
                <p className="text-white/60">Use E1W weatherproof glands externally</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Cable Selection Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Current capacity:</strong> PVC for standard, XLPE for high loads/temperatures</li>
                <li className="pl-1"><strong>Fire safety:</strong> LSF/LSZH in occupied buildings, FP for life safety</li>
                <li className="pl-1"><strong>Mechanical protection:</strong> SWA for external, underground, industrial</li>
                <li className="pl-1"><strong>Environment:</strong> Match sheath to conditions (UV, moisture, chemicals)</li>
                <li className="pl-1"><strong>Voltage drop:</strong> Consider XLPE or larger size for long runs</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Standards Reference</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>BS 5467:</strong> Armoured cables for voltages up to 1000V</li>
                <li className="pl-1"><strong>BS 7211:</strong> Thermosetting insulated cables</li>
                <li className="pl-1"><strong>BS 8519:</strong> Fire-resistant cable selection and installation</li>
                <li className="pl-1"><strong>BS EN 50575:</strong> Cables - reaction to fire (CPR)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Using standard PVC in escape routes:</strong> Specify LSF/LSZH</li>
                <li className="pl-1"><strong>Non-FP cables for fire alarms:</strong> Check BS 5839 requirements</li>
                <li className="pl-1"><strong>Wrong gland type for SWA:</strong> Match to environment and cable</li>
                <li className="pl-1"><strong>Ignoring CPR requirements:</strong> Euroclass ratings now required</li>
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
                <p className="font-medium text-white mb-1">Insulation Types</p>
                <ul className="space-y-0.5">
                  <li>PVC: 70°C, k=115, general use</li>
                  <li>XLPE: 90°C, k=143, higher ratings</li>
                  <li>LSF/LSZH: Low smoke, buildings</li>
                  <li>MI: Fireproof, specialist use</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Fire Performance</p>
                <ul className="space-y-0.5">
                  <li>Standard: Flame retardant only</li>
                  <li>Category 1: 120 min fire rating</li>
                  <li>Category 2: + mechanical protection</li>
                  <li>Category 3: + water resistance</li>
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
            <Link to="../h-n-c-module4-section2-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Prev: Short-Circuit Withstand
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section2-6">
              Next: Cable Installation Methods
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule4Section2_5;
