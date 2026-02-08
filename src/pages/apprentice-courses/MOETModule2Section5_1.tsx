import { ArrowLeft, Cable, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Conductors and Insulation Materials - MOET Module 2 Section 5.1";
const DESCRIPTION = "Comprehensive guide to electrical conductor and insulation materials for maintenance technicians: copper, aluminium, PVC, XLPE, cable construction, current-carrying capacity and BS 7671 selection.";

const quickCheckQuestions = [
  {
    id: "copper-vs-aluminium",
    question: "Why is copper the preferred conductor material for most electrical installations?",
    options: [
      "Copper is lighter than aluminium",
      "Copper has lower resistivity, higher current-carrying capacity, is easier to terminate, and is more ductile",
      "Copper is cheaper than aluminium",
      "Copper has a higher melting point than all other metals"
    ],
    correctIndex: 1,
    explanation: "Copper has a resistivity of approximately 1.72 x 10^-8 ohm-metres, compared to aluminium's 2.82 x 10^-8 ohm-metres. This lower resistivity means copper can carry more current for a given cross-sectional area. Copper is also more ductile (easier to bend and form), easier to make reliable terminations with (aluminium requires special techniques), and has excellent corrosion resistance."
  },
  {
    id: "pvc-temperature",
    question: "What is the maximum continuous operating temperature for PVC-insulated cables?",
    options: [
      "50°C",
      "70°C",
      "90°C",
      "105°C"
    ],
    correctIndex: 1,
    explanation: "PVC (polyvinyl chloride) thermoplastic insulation has a maximum continuous operating temperature of 70°C. Exceeding this temperature causes the PVC to soften, deform and eventually degrade, reducing the insulation's effectiveness and lifespan. This temperature limit is one of the factors that determines the current-carrying capacity of PVC-insulated cables as tabulated in BS 7671 Appendix 4."
  },
  {
    id: "xlpe-advantage",
    question: "What is the main advantage of XLPE insulation over PVC for power cables?",
    options: [
      "XLPE is available in more colours",
      "XLPE has a higher continuous operating temperature (90°C vs 70°C), allowing higher current ratings for the same conductor size",
      "XLPE cables are always cheaper than PVC cables",
      "XLPE cables do not need circuit protective conductors"
    ],
    correctIndex: 1,
    explanation: "XLPE (cross-linked polyethylene) is a thermosetting insulation material with a maximum continuous operating temperature of 90°C (compared to PVC's 70°C). This higher temperature rating allows XLPE-insulated cables to carry higher currents for the same conductor size, or to use smaller conductors for the same current — making them particularly useful for sub-mains and high-current circuits."
  },
  {
    id: "swa-cable",
    question: "Steel wire armoured (SWA) cable provides:",
    options: [
      "Only electrical insulation",
      "Mechanical protection for the cable and can serve as the circuit protective conductor",
      "Surge protection for the circuit",
      "Electromagnetic shielding for data cables"
    ],
    correctIndex: 1,
    explanation: "SWA (Steel Wire Armour) provides robust mechanical protection against impact, crushing and penetration. Under BS 7671, the steel wire armour can also serve as the circuit protective conductor (CPC) provided its cross-sectional area is adequate for the fault current. SWA cable is the standard choice for underground and external cable runs, and for industrial installations where mechanical damage is a risk."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The resistivity of copper at 20°C is approximately:",
    options: [
      "0.172 ohm-metres",
      "1.72 x 10^-8 ohm-metres (17.2 x 10^-9 ohm-metres)",
      "17.2 ohm-metres",
      "172 ohm-metres"
    ],
    correctAnswer: 1,
    explanation: "Copper has a resistivity of approximately 1.72 x 10^-8 ohm-metres (or 17.2 nanoohm-metres) at 20°C. This is one of the lowest resistivities of any practical conductor material, exceeded only by silver. This low resistivity is why copper is the standard conductor material for electrical installations."
  },
  {
    id: 2,
    question: "Aluminium conductors require special attention at terminations because:",
    options: [
      "Aluminium is too soft to terminate",
      "Aluminium forms a resistive oxide layer, is prone to cold-flow under pressure, and has a different thermal expansion coefficient from copper terminal components",
      "Aluminium cannot be used in electrical installations",
      "Aluminium conductors cannot carry current"
    ],
    correctAnswer: 1,
    explanation: "Aluminium forms an oxide layer (aluminium oxide, Al2O3) that is electrically resistive. At terminations, this oxide must be penetrated to achieve a good electrical connection. Aluminium also exhibits 'cold flow' — it slowly deforms under sustained mechanical pressure, which can loosen terminations over time. Special connectors, bi-metallic lugs and anti-oxidant compound are required for reliable aluminium terminations."
  },
  {
    id: 3,
    question: "A thermoplastic insulation material differs from a thermosetting insulation material in that:",
    options: [
      "Thermoplastic materials cannot be used for electrical insulation",
      "Thermoplastic softens when heated and can be re-shaped; thermosetting materials undergo a permanent chemical change and do not soften on re-heating",
      "Thermosetting materials are always cheaper",
      "There is no difference — the terms are interchangeable"
    ],
    correctAnswer: 1,
    explanation: "Thermoplastic materials (e.g., PVC) soften when heated and return to their original state on cooling — they can be repeatedly softened and re-formed. Thermosetting materials (e.g., XLPE, EPR) undergo an irreversible chemical cross-linking during manufacture. Once set, they do not soften when reheated, giving them a higher temperature rating and better resistance to deformation under load."
  },
  {
    id: 4,
    question: "The construction of a typical twin-and-earth flat cable (6242Y) consists of:",
    options: [
      "Two insulated conductors with no earth",
      "Two insulated (brown and blue) conductors plus a bare CPC, all enclosed in a PVC outer sheath",
      "Three insulated conductors with SWA",
      "A single conductor with double insulation"
    ],
    correctAnswer: 1,
    explanation: "BS 6004 / 6242Y twin-and-earth flat cable consists of two PVC-insulated conductors (brown for line, blue for neutral) and a bare copper CPC (circuit protective conductor), all enclosed within a grey PVC outer sheath. The bare CPC must be sleeved with green-and-yellow sleeving at every termination point to identify it as a protective conductor."
  },
  {
    id: 5,
    question: "Cable current-carrying capacity is determined by:",
    options: [
      "Only the conductor size",
      "The conductor material, insulation type, installation method, ambient temperature, grouping, and thermal insulation proximity",
      "Only the voltage rating",
      "The length of the cable"
    ],
    correctAnswer: 1,
    explanation: "Current-carrying capacity depends on multiple factors: the conductor material (copper or aluminium), insulation temperature rating (PVC 70°C, XLPE 90°C), installation method (clipped direct, in trunking, in thermal insulation), ambient temperature, number of cables grouped together, and proximity to thermal insulation. BS 7671 Appendix 4 provides tables and correction factors for all these variables."
  },
  {
    id: 6,
    question: "When cables are grouped together in trunking, the current-carrying capacity must be derated because:",
    options: [
      "The cables are more likely to be mechanically damaged",
      "The cables mutually heat each other and cannot dissipate heat as effectively as a single cable in free air",
      "Grouped cables have higher resistance",
      "BS 7671 requires derating for aesthetic reasons"
    ],
    correctAnswer: 1,
    explanation: "When multiple current-carrying cables are grouped together, each cable generates heat that contributes to heating the others. The reduced ability to dissipate heat to the surroundings means each cable reaches its maximum insulation temperature at a lower current. Grouping factors (Cg) from BS 7671 Table 4C1 must be applied to reduce the tabulated current-carrying capacity accordingly."
  },
  {
    id: 7,
    question: "MICC (mineral-insulated copper-clad) cable is particularly suitable for:",
    options: [
      "Temporary wiring only",
      "Fire-rated circuits, high-temperature environments and applications requiring exceptional mechanical protection",
      "Domestic lighting circuits only",
      "Underground drainage"
    ],
    correctAnswer: 1,
    explanation: "MICC (mineral-insulated copper-clad, also known as pyro cable) uses compacted magnesium oxide powder as insulation within a seamless copper sheath. It can withstand temperatures up to 250°C (normal operation) and provides inherent fire resistance — it will continue to function during a fire. It is specified for fire alarm circuits, emergency lighting, sprinkler pump supplies, and other critical circuits that must maintain integrity during a fire."
  },
  {
    id: 8,
    question: "The insulation resistance of a cable is measured:",
    options: [
      "With a low-resistance ohmmeter at test voltage of 200 mV",
      "With an insulation resistance tester (megohmmeter) at a test voltage appropriate to the circuit voltage (typically 500 V DC for circuits up to 500 V)",
      "With a loop impedance tester",
      "With an RCD tester"
    ],
    correctAnswer: 1,
    explanation: "Insulation resistance is measured between conductors (and between each conductor and earth) using an insulation resistance tester that applies a DC test voltage. For circuits up to 500 V, the test voltage is 500 V DC (BS 7671 Table 6A). The minimum acceptable insulation resistance is 1 megohm (1 MΩ). Values below this indicate insulation degradation requiring investigation."
  },
  {
    id: 9,
    question: "The harmonised colour code for a three-phase cable in the UK is:",
    options: [
      "Red, Yellow, Blue",
      "Brown, Black, Grey (with blue for neutral)",
      "Brown, Blue, Green",
      "Black, Red, White"
    ],
    correctAnswer: 1,
    explanation: "Since 2006, the UK has used the harmonised European colour code: Brown (L1), Black (L2), Grey (L3) for three-phase conductors, Blue for neutral, and Green-and-yellow for protective earth. The older UK colours (Red, Yellow, Blue, Black) may still be encountered in existing installations and must be clearly identified during maintenance."
  },
  {
    id: 10,
    question: "FP200 (fire-performance) cable achieves its fire resistance through:",
    options: [
      "A thicker PVC sheath",
      "A silicone rubber insulation that forms a ceramic barrier when exposed to fire, plus a mica tape wrap",
      "Steel wire armour only",
      "An external fire-resistant coating applied on site"
    ],
    correctAnswer: 1,
    explanation: "FP200 Gold (and similar fire-performance cables) uses modified silicone rubber insulation that, when exposed to fire temperatures, converts to a ceramic material that maintains electrical insulation. Additionally, each conductor is wrapped in mica tape which provides immediate fire resistance. The cable continues to function during a fire, making it suitable for fire alarm, emergency lighting and other critical circuits."
  },
  {
    id: 11,
    question: "When selecting cable for an outdoor installation exposed to direct sunlight, you should consider:",
    options: [
      "Only the cable colour",
      "UV resistance of the sheath material — standard PVC degrades in UV light; UV-resistant compounds or additional protection may be needed",
      "Only the cable length",
      "No special consideration is needed for outdoor cables"
    ],
    correctAnswer: 1,
    explanation: "Standard PVC sheathing degrades when exposed to prolonged ultraviolet (UV) radiation from sunlight. The sheath becomes brittle, cracks and eventually fails, exposing the insulation beneath. For outdoor installations, cables with UV-resistant sheaths (often black PVC or LSZH compounds), or cables installed in conduit or trunking that provides UV protection, should be used."
  },
  {
    id: 12,
    question: "LSZH (Low Smoke Zero Halogen) cable is specified where:",
    options: [
      "The cable must carry higher current than PVC-insulated cable",
      "Smoke and toxic gas emission during fire must be minimised — typically in public buildings, confined spaces and areas with high occupancy",
      "The cable must be cheaper than PVC",
      "LSZH is required for all domestic installations"
    ],
    correctAnswer: 1,
    explanation: "LSZH cables use halogen-free insulation and sheath compounds that produce minimal smoke and no toxic halogen gases (such as hydrogen chloride from burning PVC) during a fire. They are specified for public buildings, underground railways, hospitals, shopping centres and other locations where smoke and toxic gases from burning cables could impede escape or cause injury."
  }
];

const faqs = [
  {
    question: "Can I use aluminium cable in a domestic installation?",
    answer: "There is no BS 7671 prohibition on using aluminium cables in domestic installations, but they are rarely used due to the termination challenges and the risk of poor connections. Aluminium is commonly used for larger supply cables (meter tails, sub-mains) where the cost saving over copper becomes significant. Any aluminium terminations must use appropriate connectors designed for aluminium and must be periodically inspected for tightness."
  },
  {
    question: "How do I identify the cable type on an existing installation?",
    answer: "Cable types are identified by markings printed on the outer sheath, which typically include the cable designation (e.g., 6242Y, 6943X), the number and size of conductors, the manufacturer's name, and BS/EN standard references. Older cables may have the markings worn away, in which case identification relies on the cable construction — insulation colour, presence of armour, number of conductors, and whether the CPC is bare or insulated."
  },
  {
    question: "What is the minimum insulation resistance for a healthy circuit?",
    answer: "BS 7671 Table 6A specifies a minimum insulation resistance of 1 megohm (1 MΩ) for circuits up to 500 V. In practice, a healthy installation should give readings significantly higher than this — typically 50 MΩ or more for new installations. Readings between 1 and 2 MΩ, while technically compliant, indicate deteriorating insulation that warrants investigation and monitoring."
  },
  {
    question: "Why must the bare CPC in twin-and-earth cable be sleeved green-and-yellow?",
    answer: "The bare CPC in flat twin-and-earth cable must be sleeved with green-and-yellow insulation at every point of termination (BS 7671 Regulation 514.4.2). This provides identification as a protective conductor and prevents accidental contact with live terminations. The sleeving should be applied before the conductor is terminated, covering the exposed copper up to the terminal."
  },
  {
    question: "When should I use SWA cable instead of flat twin-and-earth?",
    answer: "SWA (steel wire armoured) cable should be used where mechanical protection is needed — underground installations, external runs, industrial environments, and anywhere the cable may be subject to impact, vibration or physical damage. SWA is also required where the cable is not installed within a building or is buried directly in the ground (with cable tiles/tape for identification). Flat twin-and-earth is suitable for internal building wiring in domestic and light commercial installations."
  }
];

const MOETModule2Section5_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Cable className="h-4 w-4" />
            <span>Module 2.5.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Conductors and Insulation Materials
          </h1>
          <p className="text-white/80">
            Electrical materials, properties and selection criteria for maintenance technicians
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Copper:</strong> Standard conductor — low resistivity, easy termination</li>
              <li className="pl-1"><strong>Aluminium:</strong> Lighter, cheaper — needs special termination care</li>
              <li className="pl-1"><strong>PVC:</strong> Thermoplastic, 70°C max — most common insulation</li>
              <li className="pl-1"><strong>XLPE:</strong> Thermosetting, 90°C max — higher current ratings</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Technician Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Identification:</strong> Recognise cable types and markings</li>
              <li className="pl-1"><strong>Selection:</strong> Correct cable for the application and environment</li>
              <li className="pl-1"><strong>Testing:</strong> Insulation resistance measurement and interpretation</li>
              <li className="pl-1"><strong>ST1426:</strong> Maps to materials and engineering principles KSBs</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Compare the properties of copper and aluminium as conductor materials",
              "Describe common insulation materials (PVC, XLPE, EPR, MICC) and their temperature ratings",
              "Identify standard cable types used in UK installations (6242Y, SWA, FP200, MICC)",
              "Understand factors affecting cable current-carrying capacity and derating",
              "Apply BS 7671 Appendix 4 for cable selection and correction factors",
              "Test insulation resistance and interpret results during periodic inspection"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Conductor Materials — Copper and Aluminium
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The choice of conductor material has a direct impact on the performance, reliability and
              maintainability of an electrical installation. Two metals dominate in electrical engineering:
              copper and aluminium. Each has distinct properties that make it suitable for different
              applications, and a maintenance technician must understand these differences to work safely
              and effectively with both materials.
            </p>
            <p>
              Copper is the standard conductor material for the vast majority of UK electrical installations.
              Its combination of low electrical resistivity (1.72 &times; 10&#8315;&#8312; ohm-metres at 20°C),
              excellent ductility, good corrosion resistance and ease of termination makes it the preferred
              choice for all but the largest conductors. Aluminium, with a resistivity approximately 1.6
              times that of copper, requires a larger cross-sectional area to carry the same current — but
              it is significantly lighter (density 2,700 kg/m³ vs copper's 8,960 kg/m³) and cheaper.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Material Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Property</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Copper</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Aluminium</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Resistivity (20°C)</td>
                      <td className="border border-white/10 px-3 py-2">1.72 &times; 10&#8315;&#8312; ohm-m</td>
                      <td className="border border-white/10 px-3 py-2">2.82 &times; 10&#8315;&#8312; ohm-m</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Density</td>
                      <td className="border border-white/10 px-3 py-2">8,960 kg/m³</td>
                      <td className="border border-white/10 px-3 py-2">2,700 kg/m³</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Termination</td>
                      <td className="border border-white/10 px-3 py-2">Standard crimps/screws</td>
                      <td className="border border-white/10 px-3 py-2">Special connectors required</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Typical application</td>
                      <td className="border border-white/10 px-3 py-2">All general wiring</td>
                      <td className="border border-white/10 px-3 py-2">Large cables, overhead lines</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Aluminium Termination Hazards</p>
              <p className="text-sm text-white">
                Hot spots and fires caused by loose or high-resistance aluminium connections are a significant
                hazard. The combination of oxide formation, cold flow (creep under sustained pressure), and
                differential thermal expansion means aluminium terminations must be periodically re-torqued and
                inspected. Thermal imaging during maintenance is particularly valuable for identifying
                deteriorating aluminium connections before they fail.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Insulation Materials and Temperature Ratings
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Cable insulation serves two critical functions: preventing current leakage between conductors
              and between conductors and earth (electrical function), and preventing accidental contact with
              live conductors (safety function). The insulation material's temperature rating directly
              determines how much current the cable can carry — because current flow generates heat, and the
              insulation must not exceed its rated temperature.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">PVC (Polyvinyl Chloride) — 70°C</h3>
                <p className="text-sm text-white">
                  The most widely used insulation material in UK installations. PVC is a thermoplastic —
                  it softens when heated and re-hardens on cooling. Maximum continuous operating temperature
                  is 70°C. PVC becomes brittle at low temperatures (below -5°C) and should not be installed
                  or handled in very cold conditions. It emits toxic hydrogen chloride gas and dense smoke
                  when burned, which limits its use in some applications.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">XLPE (Cross-Linked Polyethylene) — 90°C</h3>
                <p className="text-sm text-white">
                  A thermosetting material that undergoes irreversible chemical cross-linking during manufacture.
                  The higher temperature rating (90°C) allows approximately 15-20% more current than PVC for
                  the same conductor size. XLPE has excellent moisture resistance and dielectric properties.
                  It is the standard insulation for SWA power cables and is increasingly used for domestic
                  cables in demanding applications.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Mineral Insulation (MgO) — 250°C</h3>
                <p className="text-sm text-white">
                  MICC cable uses compacted magnesium oxide powder as insulation. This inorganic mineral
                  provides exceptional fire resistance and a very high operating temperature (up to 250°C for
                  PVC-sheathed types, higher for bare). The cable will continue to function during a fire,
                  making it the premium choice for fire alarm circuits, emergency lighting and other safety-
                  critical applications. MgO is hygroscopic — it must be properly sealed at terminations.
                </p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> When replacing cables, always use the same or better insulation type.
              Downgrading from XLPE to PVC on the same circuit would reduce the current-carrying capacity and
              potentially overload the cable. Always check BS 7671 Appendix 4 tables for the correct
              current-carrying capacity of the cable type being installed.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Common Cable Types in UK Installations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A maintenance technician will encounter a wide range of cable types during their career. Being
              able to identify the cable type, understand its construction and know its limitations is
              essential for safe maintenance, fault diagnosis and cable replacement.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Cable Types</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Designation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Flat twin and earth</td>
                      <td className="border border-white/10 px-3 py-2">6242Y</td>
                      <td className="border border-white/10 px-3 py-2">Domestic fixed wiring</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Three-core and earth</td>
                      <td className="border border-white/10 px-3 py-2">6243Y</td>
                      <td className="border border-white/10 px-3 py-2">Two-way switching circuits</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">SWA (XLPE)</td>
                      <td className="border border-white/10 px-3 py-2">6943X / 6944X</td>
                      <td className="border border-white/10 px-3 py-2">Underground, external, industrial</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">MICC</td>
                      <td className="border border-white/10 px-3 py-2">Various</td>
                      <td className="border border-white/10 px-3 py-2">Fire-rated circuits</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">FP200 Gold</td>
                      <td className="border border-white/10 px-3 py-2">FP200</td>
                      <td className="border border-white/10 px-3 py-2">Fire alarm, emergency lighting</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Flexible cord</td>
                      <td className="border border-white/10 px-3 py-2">3183Y / 3183TQ</td>
                      <td className="border border-white/10 px-3 py-2">Appliance connections</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Current-Carrying Capacity and Derating Factors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The current-carrying capacity (Iz) of a cable is not a fixed value — it depends on the
              conditions under which the cable is installed. BS 7671 Appendix 4 provides tabulated
              current-carrying capacities for various cable types and installation methods. These values
              must then be adjusted using correction factors for grouping, ambient temperature, and thermal
              insulation proximity.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Correction Factors</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Ca — Ambient temperature:</strong> If the ambient temperature exceeds 30°C, the cable can carry less current. If below 30°C, it can carry slightly more.</li>
                <li className="pl-1"><strong>Cg — Grouping:</strong> Multiple cables close together reduce each cable's capacity due to mutual heating. Factors from Table 4C1.</li>
                <li className="pl-1"><strong>Ci — Thermal insulation:</strong> Cables enclosed in thermal insulation (loft insulation, wall insulation) cannot dissipate heat and must be heavily derated — up to 0.5 for cables completely surrounded.</li>
                <li className="pl-1"><strong>Cc — BS 3036 fuse correction:</strong> 0.725 factor when BS 3036 fuses are used (due to their poor fusing factor).</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance relevance:</strong> When investigating overheating cables or nuisance tripping,
              check whether the installation conditions have changed since the original design. Additional
              loft insulation, extra cables added to trunking, or increased ambient temperatures (e.g., above
              a hot process) can all reduce the effective current-carrying capacity below the original design.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

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

        <hr className="border-white/5 my-12" />

        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Insulation Temperature Ratings</p>
                <ul className="space-y-0.5">
                  <li>PVC — 70°C (thermoplastic)</li>
                  <li>XLPE — 90°C (thermosetting)</li>
                  <li>EPR — 90°C (thermosetting)</li>
                  <li>Silicone rubber — 180°C</li>
                  <li>Mineral (MgO) — 250°C+</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key References</p>
                <ul className="space-y-0.5">
                  <li>BS 7671 Appendix 4 — Current-carrying capacity</li>
                  <li>Table 4C1 — Grouping factors</li>
                  <li>Table 4B1 — Ambient temperature factors</li>
                  <li>BS 6004 — PVC-insulated cables</li>
                  <li>BS 5467 — SWA cables</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />
        </section>

        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section Overview
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section5-2">
              Next: Selection and Use of Hand Tools
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default MOETModule2Section5_1;
