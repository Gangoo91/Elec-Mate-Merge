import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Cable Types and Selection - MOET Module 3.3.2";
const DESCRIPTION = "Comprehensive guide to cable types and selection for electrical maintenance technicians: cable construction, insulation materials, current-carrying capacity, voltage drop, BS 7671 requirements and application guidelines under ST1426.";

const quickCheckQuestions = [
  {
    id: "cable-construction",
    question: "What are the three main components of a power cable?",
    options: [
      "Core, sheath and gland",
      "Conductor, insulation and sheath (with possible armouring)",
      "Copper, PVC and steel",
      "Live, neutral and earth"
    ],
    correctIndex: 1,
    explanation: "A power cable consists of the conductor (copper or aluminium carrying the current), insulation (surrounding each conductor to prevent leakage and short circuits), and an outer sheath (providing mechanical and environmental protection). Many industrial cables also include armouring — steel wire or tape between the insulation and outer sheath — for additional mechanical protection."
  },
  {
    id: "xlpe-advantage",
    question: "What is the primary advantage of XLPE insulation over PVC for power cables?",
    options: [
      "XLPE is cheaper than PVC",
      "XLPE has a higher continuous operating temperature (90 degrees C vs 70 degrees C), allowing higher current ratings for the same conductor size",
      "XLPE is more flexible than PVC",
      "XLPE is available in more colours"
    ],
    correctIndex: 1,
    explanation: "Cross-linked polyethylene (XLPE) insulation can operate continuously at 90 degrees C compared to 70 degrees C for PVC. This higher temperature rating means XLPE cables can carry more current for the same conductor cross-sectional area, or a smaller cable can be used for the same current. XLPE also has better short-circuit performance, with a maximum short-circuit temperature of 250 degrees C versus 160 degrees C for PVC."
  },
  {
    id: "ccc-factors",
    question: "Which factors reduce the current-carrying capacity (CCC) of a cable below its tabulated value in BS 7671?",
    options: [
      "Cable colour and manufacturer",
      "Ambient temperature, grouping with other cables, thermal insulation contact and installation method",
      "Cable length only",
      "The type of load connected"
    ],
    correctIndex: 1,
    explanation: "BS 7671 Appendix 4 provides tabulated current-carrying capacities under reference conditions. These must be derated (reduced) for: higher ambient temperatures (correction factor Ca); grouping with other current-carrying cables (Cg); contact with thermal insulation (Ci); and the specific installation method (reference method). The actual CCC is the tabulated value multiplied by all applicable correction factors."
  },
  {
    id: "swa-purpose",
    question: "What is the primary function of steel wire armour (SWA) in a cable?",
    options: [
      "To carry the earth fault current only",
      "To provide mechanical protection against impact, crushing and penetration during installation and service",
      "To improve the cable's electrical performance",
      "To make the cable waterproof"
    ],
    correctIndex: 1,
    explanation: "Steel wire armour (SWA) provides mechanical protection against physical damage — impact, crushing, abrasion and penetration. This is essential for cables installed underground, on cable trays in industrial environments, or anywhere exposed to mechanical risk. The armour can also serve as a circuit protective conductor (CPC) if it meets the requirements of BS 7671 Regulation 543.1, but this is a secondary function — its primary purpose is mechanical protection."
  }
];

const quizQuestions = [
  { id: 1, question: "The designation '6942X' on a cable indicates:", options: ["A cable with 6 cores rated at 942 V", "A two-core XLPE-insulated, SWA, PVC-sheathed cable to BS 5467", "A flexible cord rated at 6 A", "A fire-resistant cable"], correctAnswer: 1, explanation: "The BS cable designation system uses a numeric code: the first digit (6) indicates the standard (BS 5467 for XLPE/SWA/PVC), subsequent digits indicate construction details, and the suffix indicates core configuration. '6942X' is a two-core (indicated by the '2') XLPE-insulated, steel wire armoured, PVC-sheathed cable. The 'X' suffix confirms XLPE insulation." },
  { id: 2, question: "BS 7671 Table 4D1A provides current-carrying capacities for:", options: ["All cable types in all installations", "Single-core PVC-insulated cables (non-armoured) in specific installation methods", "Only underground cables", "Only SWA cables"], correctAnswer: 1, explanation: "BS 7671 Appendix 4 contains multiple tables for different cable types and installation methods. Table 4D1A specifically covers single-core PVC-insulated non-armoured cables (e.g., singles in conduit or trunking). Other tables cover multicore cables, XLPE cables, SWA cables, MI cables, etc. Selecting the correct table for the specific cable type and installation method is essential for accurate cable sizing." },
  { id: 3, question: "The voltage drop limit for lighting circuits in BS 7671 is:", options: ["3% of the nominal supply voltage", "5% of the nominal supply voltage", "10 V", "There is no limit"], correctAnswer: 0, explanation: "BS 7671 Regulation 525.1 and Appendix 12 recommend that the voltage drop from the origin of the installation to the most remote point should not exceed 3% for lighting circuits and 5% for other circuits. For a 230 V supply, this means a maximum of 6.9 V for lighting and 11.5 V for power circuits. These are recommendations rather than absolute limits, but exceeding them can cause visible lamp flicker and reduced equipment performance." },
  { id: 4, question: "Mineral insulated (MI) cable is used in maintenance applications primarily because:", options: ["It is the cheapest cable available", "It provides inherent fire resistance (maintaining circuit integrity at temperatures exceeding 1,000 degrees C) and is non-combustible", "It is the most flexible cable type", "It has the highest current rating"], correctAnswer: 1, explanation: "Mineral insulated cable (MICC or pyro cable) uses magnesium oxide insulation and a copper or stainless steel sheath. It is completely non-combustible and maintains circuit integrity at temperatures exceeding 1,000 degrees C. This makes it essential for fire alarm circuits, emergency lighting circuits, fire pump supplies and smoke extraction systems where the cable must continue to function during a fire. BS 5839 and BS 5266 specify where fire-resistant cables are required." },
  { id: 5, question: "When selecting a cable for an industrial motor circuit, the minimum conductor size is determined by:", options: ["The motor horsepower only", "The greater of: full-load current (with applicable correction factors), voltage drop limit and earth fault loop impedance requirements", "The conduit size available", "The cable tray width"], correctAnswer: 1, explanation: "Cable selection for motor circuits must satisfy three independent criteria simultaneously: current-carrying capacity (the cable must carry the motor full-load current with all derating factors applied); voltage drop (must not exceed 5% at full load); and earth fault loop impedance (must be low enough for the protective device to operate within the required disconnection time under BS 7671 Regulation 411). The cable must meet all three criteria — the largest size required by any criterion is selected." },
  { id: 6, question: "The colour coding for a three-phase cable under BS 7671 harmonised colours is:", options: ["Red, yellow, blue", "Brown (L1), black (L2), grey (L3)", "Brown, blue, green/yellow", "Red, white, blue"], correctAnswer: 1, explanation: "BS 7671 adopted the harmonised European colour code: brown for L1, black for L2 and grey for L3, with blue for neutral and green/yellow for the protective conductor. The previous UK colours (red, yellow, blue for phases; black for neutral) are still found in older installations. During maintenance, you must be able to identify both old and new colour codes. Mixed installations should be clearly labelled at distribution boards." },
  { id: 7, question: "FP200 Gold cable is commonly specified for:", options: ["General power circuits", "Fire alarm and emergency lighting circuits requiring enhanced fire performance to BS 8434-2", "Underground installations", "High voltage circuits"], correctAnswer: 1, explanation: "FP200 Gold is a fire-performance cable that maintains circuit integrity during fire conditions. It is tested to BS 8434-2 (the standard for cable performance in fire, superseding BS 6387). It is widely used for fire detection and alarm circuits (BS 5839), emergency lighting (BS 5266) and other life-safety circuits. Unlike MI cable, it is easier to install and terminate, making it a popular choice for maintenance electricians working on fire safety systems." },
  { id: 8, question: "The grouping correction factor (Cg) is applied because:", options: ["Cables in groups cost more", "Cables grouped together share heat, reducing each cable's ability to dissipate its own heat, thereby reducing its safe current-carrying capacity", "Grouped cables are harder to identify", "Grouping improves cable performance"], correctAnswer: 1, explanation: "When cables are installed together in groups (in conduit, trunking or on cable trays), each cable's heat contributes to the temperature of adjacent cables. This mutual heating reduces each cable's ability to dissipate its own heat losses, raising its operating temperature and reducing the safe current it can carry. The grouping factor from BS 7671 Table 4C1 must be applied. Larger groups have more severe derating — for example, 6 loaded cables on a tray have a factor of approximately 0.57." },
  { id: 9, question: "An LSZH (Low Smoke Zero Halogen) sheath is specified when:", options: ["Maximum cable flexibility is required", "The cable is installed in areas where toxic smoke and corrosive gases from burning cable sheaths would endanger life or damage sensitive equipment", "The cable needs to be waterproof", "Cost savings are the priority"], correctAnswer: 1, explanation: "LSZH sheaths emit minimal smoke and no halogen gases (such as hydrogen chloride from burning PVC) when exposed to fire. This is critical in enclosed spaces (underground railways, hospitals, data centres, high-rise buildings) where toxic smoke is the primary cause of fire fatalities. LSZH cables are more expensive than PVC-sheathed equivalents, but are required by regulations in many life-safety applications. BS 7671 recommends consideration of fire performance in cable selection." },
  { id: 10, question: "The thermal withstand capacity of a cable's protective conductor (CPC) is verified using:", options: ["A visual inspection", "The adiabatic equation: S = sqrt(I squared t) / k, where S is cross-sectional area, I is fault current, t is disconnection time and k is a material constant", "A megger test", "The cable manufacturer's catalogue"], correctAnswer: 1, explanation: "BS 7671 Regulation 543.1.3 requires verification that the CPC can withstand the thermal effects of the maximum earth fault current for the disconnection time of the protective device. The adiabatic equation S = sqrt(I squared t) / k calculates the minimum CPC cross-sectional area. If the installed CPC is smaller than this calculated minimum, it could overheat and fail during a fault, leaving the circuit unprotected." },
  { id: 11, question: "When replacing a cable in an existing installation, the maintenance technician must:", options: ["Use the same size cable as the original", "Verify the cable selection against current BS 7671 requirements, as regulations and loading may have changed since the original installation", "Always upgrade to the next size up", "Use whatever cable is available in stores"], correctAnswer: 1, explanation: "Cable replacement must comply with the current edition of BS 7671 and account for any changes in load, installation conditions or regulations since the original cable was installed. The original cable may have been correctly sized at the time but may now be undersized due to increased load, additional cables in the same containment system (increased grouping), or more stringent voltage drop requirements. A fresh cable calculation should always be carried out." },
  { id: 12, question: "The bending radius of an SWA cable is typically:", options: ["Any radius the installer can manage", "A minimum of 6 times the overall cable diameter for cables up to 25 mm, and 8 times for larger cables", "Equal to the cable diameter", "Not important for installation"], correctAnswer: 1, explanation: "SWA cables have minimum bending radii specified by the manufacturer, typically 6 times the overall diameter for cables up to 25 mm overall diameter, and 8 times for larger cables. Exceeding the minimum bending radius (bending too tightly) can damage the armour wires, deform the insulation, and create points of mechanical stress that may lead to premature cable failure. During maintenance routing work, always respect the minimum bending radius." }
];

const faqs = [
  { question: "How do I determine the correct cable size for a circuit?", answer: "Cable sizing follows a systematic process: (1) determine the design current (Ib) of the circuit; (2) select a protective device with a rating (In) not less than Ib; (3) determine the correction factors for ambient temperature (Ca), grouping (Cg), thermal insulation (Ci) and any other applicable factors; (4) calculate the required tabulated current-carrying capacity: It = In / (Ca x Cg x Ci); (5) select a cable with a tabulated CCC not less than It; (6) verify voltage drop is within limits; (7) verify earth fault loop impedance; (8) verify the CPC thermal withstand. The cable must satisfy all criteria simultaneously." },
  { question: "What is the difference between SWA and non-armoured cables?", answer: "SWA (steel wire armoured) cables have a layer of galvanised steel wires between the inner and outer sheaths, providing mechanical protection against impact, crushing and penetration. Non-armoured cables rely solely on the outer sheath for protection and must be installed in protective containment (conduit, trunking) or in locations where mechanical damage risk is low. SWA cables can be installed on cable trays, cleated to surfaces or buried directly in the ground (with warning tape), making them suitable for industrial and outdoor applications." },
  { question: "When should I use XLPE cable instead of PVC?", answer: "XLPE cable should be used when: higher current-carrying capacity is needed from a given cable size (XLPE operates at 90 degrees C vs 70 degrees C for PVC); the cable may be exposed to higher ambient temperatures; better short-circuit performance is required; or when the installation environment demands superior insulation properties. XLPE is the standard choice for HV cables and is increasingly preferred for LV power distribution cables in industrial settings due to its superior thermal performance." },
  { question: "What cable records should a maintenance technician keep?", answer: "Maintain records of: cable type, size and route for every circuit; cable test results (insulation resistance, continuity, earth fault loop impedance); dates of installation and any modifications; cable condition reports from periodic inspections; and any derating factors applied during selection. These records are essential for future maintenance, circuit identification and compliance verification. BS 7671 Regulation 134.2 requires records of electrical installations to be available to those who need them." },
  { question: "How do I identify cable types on an existing installation?", answer: "Identify cables by: reading the printed markings on the outer sheath (manufacturer, standard, type designation, voltage rating, date of manufacture); checking the cable colour (XLPE outer sheaths are typically black, PVC can be grey, white or black); examining the construction (armoured vs non-armoured); and consulting the installation records and drawings. If markings are illegible, cable identification by physical examination of a sample end (conductor material, insulation colour and material, armour type) is necessary." }
];

const MOETModule3Section3_2 = () => {
  useSEO(TITLE, DESCRIPTION);
  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 3.3.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Cable Types and Selection
          </h1>
          <p className="text-white/80">
            Cable specifications, selection criteria and application guidelines for electrical maintenance
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Construction:</strong> Conductor, insulation, armour (optional), sheath</li>
              <li className="pl-1"><strong>Insulation:</strong> PVC (70 degrees C), XLPE (90 degrees C), MI (fire-rated)</li>
              <li className="pl-1"><strong>Sizing:</strong> CCC, voltage drop, Zs and CPC thermal withstand</li>
              <li className="pl-1"><strong>Standards:</strong> BS 7671 Appendix 4, BS 5467, BS 6004, BS 6724</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Replacement:</strong> Must comply with current BS 7671, not original spec</li>
              <li className="pl-1"><strong>Identification:</strong> Sheath markings, colour codes, construction type</li>
              <li className="pl-1"><strong>Testing:</strong> Insulation resistance, continuity, loop impedance</li>
              <li className="pl-1"><strong>ST1426:</strong> Maps to electrical plant and equipment maintenance KSBs</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify common cable types used in industrial and commercial installations",
              "Explain the cable sizing process including CCC, voltage drop and loop impedance",
              "Apply BS 7671 correction factors for ambient temperature, grouping and thermal insulation",
              "Select appropriate cable types for specific maintenance applications",
              "Describe the construction and properties of SWA, MI and fire-performance cables",
              "Interpret cable designation codes and harmonised colour identification"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Cable Construction and Types
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding cable construction is fundamental for every maintenance technician. The choice of cable type directly affects the safety, reliability and longevity of an electrical installation. Different applications demand different cable constructions, and selecting the wrong cable can lead to overheating, insulation failure, fire or electric shock.
            </p>
            <p>
              All power cables share a common construction principle: one or more conductors surrounded by insulation, with an outer protective covering. Industrial and commercial cables often include additional layers — screens for electromagnetic compatibility, armour for mechanical protection, and fire-resistant barriers for life-safety circuits.
            </p>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Cable Types in Industrial Maintenance</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Cable Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Standard</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2">PVC/PVC singles</td><td className="border border-white/10 px-3 py-2">BS 6004</td><td className="border border-white/10 px-3 py-2">Wiring in conduit and trunking</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">PVC/SWA/PVC</td><td className="border border-white/10 px-3 py-2">BS 6346</td><td className="border border-white/10 px-3 py-2">General power distribution, underground</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">XLPE/SWA/PVC</td><td className="border border-white/10 px-3 py-2">BS 5467</td><td className="border border-white/10 px-3 py-2">Higher-rated power distribution, industrial</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">MI (pyro)</td><td className="border border-white/10 px-3 py-2">BS EN 60702</td><td className="border border-white/10 px-3 py-2">Fire-rated circuits, hazardous areas</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">FP200 Gold</td><td className="border border-white/10 px-3 py-2">BS 7846</td><td className="border border-white/10 px-3 py-2">Fire alarm, emergency lighting</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">SY/CY flexible</td><td className="border border-white/10 px-3 py-2">BS EN 50525</td><td className="border border-white/10 px-3 py-2">Control circuits, machine connections</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">LSZH</td><td className="border border-white/10 px-3 py-2">BS 7211</td><td className="border border-white/10 px-3 py-2">Public buildings, transport, enclosed areas</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Insulation Materials Compared</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>PVC (polyvinyl chloride):</strong> Maximum continuous temperature 70 degrees C; economical, flexible, widely used; emits toxic fumes (HCl) in fire</li>
                <li className="pl-1"><strong>XLPE (cross-linked polyethylene):</strong> Maximum continuous temperature 90 degrees C; higher CCC; excellent short-circuit performance (250 degrees C); standard for HV and increasingly for LV</li>
                <li className="pl-1"><strong>Magnesium oxide (MI cable):</strong> Non-combustible; operates above 1,000 degrees C; inherently fire-resistant; requires specialist termination</li>
                <li className="pl-1"><strong>EPR (ethylene propylene rubber):</strong> Maximum continuous temperature 90 degrees C; highly flexible; good for trailing cables and mobile equipment</li>
                <li className="pl-1"><strong>LSF/LSZH:</strong> Low smoke and fume or zero halogen; reduced toxicity in fire; specified for life-safety applications</li>
              </ul>
            </div>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Conductor Materials</h3>
              <p className="text-sm text-white mb-3">
                The two conductor materials used in power cables are copper and aluminium. Each has distinct
                properties that affect cable selection, installation and maintenance.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Copper:</strong> Higher conductivity (requires smaller cross-section for the same current), easier to terminate, does not oxidise as readily, more ductile; standard for most LV installations and all cable sizes up to 300 mm squared</li>
                <li className="pl-1"><strong>Aluminium:</strong> Lighter weight (approximately 50% of copper for the same current capacity), lower cost, but requires larger cross-section, specialist termination techniques (bimetallic lugs), and is susceptible to oxidation and creep under pressure; used primarily for larger cables (typically 50 mm squared and above) and overhead lines</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Cable Designation Codes Explained</h3>
              <p className="text-sm text-white mb-3">
                British Standard cable designation codes follow a structured system that, once understood, tells
                the maintenance technician everything about a cable from its printed marking alone.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>First digit — manufacturing standard:</strong> 6 = BS 5467 (XLPE/SWA/PVC), 5 = BS 6346 (PVC/SWA/PVC)</li>
                <li className="pl-1"><strong>Second digit — conductor material:</strong> 9 = copper, 3 = aluminium</li>
                <li className="pl-1"><strong>Third digit — insulation type:</strong> 4 = thermosetting (XLPE), 3 = thermoplastic (PVC)</li>
                <li className="pl-1"><strong>Fourth digit — number of cores:</strong> 2 = two-core, 3 = three-core, 4 = four-core</li>
                <li className="pl-1"><strong>Suffix letter:</strong> X = XLPE insulation, Y = PVC insulation</li>
              </ul>
              <p className="text-sm text-white mt-3">
                <strong>Example:</strong> 6944X = BS 5467 (6), copper (9), thermosetting insulation (4), four-core (4), XLPE (X).
                This is a four-core copper XLPE/SWA/PVC cable manufactured to BS 5467 — one of the most common
                industrial power cables in the UK.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> When replacing cables during maintenance, always verify the correct cable type for the application. Do not assume the existing cable was the correct specification — it may have been a compromise or the requirements may have changed since original installation.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Cable Sizing: Current-Carrying Capacity
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Cable sizing is one of the most fundamental skills for an electrical maintenance technician. An undersized cable overheats, causing insulation degradation, fire risk and ultimately circuit failure. An oversized cable wastes money and may not be compatible with existing containment systems. BS 7671 Appendix 4 provides the framework for correct cable selection.
            </p>
            <p>
              The cable sizing process begins with the design current (Ib) — the actual current the circuit will carry under normal conditions. For motor circuits, this is the full-load current shown on the motor nameplate. For heating loads, it is the rated current of the element. The protective device rating (In) must be not less than Ib but not greater than the cable's current-carrying capacity (Iz).
            </p>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Correction Factors (BS 7671 Appendix 4)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Factor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Symbol</th>
                      <th className="border border-white/10 px-3 py-2 text-left">What It Accounts For</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2">Ambient temperature</td><td className="border border-white/10 px-3 py-2">Ca</td><td className="border border-white/10 px-3 py-2">Higher ambient reduces heat dissipation (Table 4B1/4B2)</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Grouping</td><td className="border border-white/10 px-3 py-2">Cg</td><td className="border border-white/10 px-3 py-2">Mutual heating from adjacent loaded cables (Table 4C1)</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Thermal insulation</td><td className="border border-white/10 px-3 py-2">Ci</td><td className="border border-white/10 px-3 py-2">Insulation contact reduces heat dissipation (Table 52.2)</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Semi-enclosed fuse</td><td className="border border-white/10 px-3 py-2">Cf</td><td className="border border-white/10 px-3 py-2">BS 3036 fuses need 0.725 factor due to fusing factor</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Cable Sizing Worked Example</h3>
              <p className="text-sm text-white mb-3">
                A 15 kW three-phase motor (full-load current 27.5 A) is supplied via XLPE/SWA cable on a perforated cable tray in a plant room at 35 degrees C ambient, grouped with 5 other loaded cables.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Design current (Ib) = 27.5 A</li>
                <li className="pl-1">Protective device: 32 A BS 88-2 fuse (In = 32 A)</li>
                <li className="pl-1">Ca (35 degrees C ambient, XLPE) = 0.96 (from Table 4B2)</li>
                <li className="pl-1">Cg (6 cables on tray, touching) = 0.57 (from Table 4C1)</li>
                <li className="pl-1">Required tabulated CCC: It = 32 / (0.96 x 0.57) = 58.5 A</li>
                <li className="pl-1">Select 10 mm squared 4-core XLPE/SWA (rated 63 A in reference method E)</li>
                <li className="pl-1">Then verify voltage drop and earth fault loop impedance</li>
              </ul>
            </div>
            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Installation Method Reference</p>
              <p className="text-sm text-white">
                BS 7671 defines standard installation methods (reference methods) that determine the cable's
                tabulated current-carrying capacity. Common reference methods include: Method A (clipped direct
                to a surface, enclosed in conduit or trunking on a wall); Method B (enclosed in conduit or
                trunking in a thermally insulating wall); Method C (clipped direct to a non-metallic surface);
                Method E (on perforated cable tray); and Method G (spaced in free air). The same cable has
                different current ratings depending on the installation method — Method E (cable tray) typically
                gives the highest rating because of better heat dissipation, while Method B (enclosed in an
                insulated wall) gives the lowest.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Correction Factor Application Order</h3>
              <p className="text-sm text-white mb-3">
                When multiple correction factors apply simultaneously, they must all be applied to determine
                the required tabulated current-carrying capacity. The formula is:
              </p>
              <p className="text-sm text-white font-mono bg-white/5 p-2 rounded mb-3">
                It = In / (Ca x Cg x Ci x Cf)
              </p>
              <p className="text-sm text-white">
                Where It is the minimum tabulated current-carrying capacity, In is the protective device rating,
                and Ca, Cg, Ci, Cf are the applicable correction factors. If only some factors apply (for example,
                no thermal insulation contact means Ci = 1.0), those factors are set to 1.0. Always document which
                factors were applied and their source tables — this is essential evidence for compliance
                verification during periodic inspection.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Cable sizing is not simply looking up a current in a table. Every installation has specific conditions that affect the cable's performance. Failure to apply correction factors is a common cause of cable overheating in industrial installations.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Voltage Drop and Earth Fault Loop Impedance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              After selecting a cable for current-carrying capacity, two further checks are essential: voltage drop and earth fault loop impedance. A cable that passes the CCC test may still fail on voltage drop (causing poor equipment performance) or loop impedance (failing to provide adequate fault protection).
            </p>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Voltage Drop</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Limits:</strong> 3% for lighting (6.9 V at 230 V), 5% for other uses (11.5 V at 230 V) — BS 7671 Appendix 12</li>
                <li className="pl-1"><strong>Calculation:</strong> VD = (mV/A/m x Ib x L) / 1,000 — where mV/A/m is from BS 7671 tables, Ib is design current and L is cable length in metres</li>
                <li className="pl-1"><strong>Long runs:</strong> Voltage drop often governs cable size for long cable runs, requiring a larger cable than CCC alone would demand</li>
                <li className="pl-1"><strong>Motor starting:</strong> Starting current (typically 6-8 times FLC) causes significant transient voltage drop — check this does not affect adjacent equipment</li>
              </ul>
            </div>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Earth Fault Loop Impedance (Zs)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Purpose:</strong> The total loop impedance must be low enough for the protective device to operate within the required disconnection time (0.4 s for 32 A circuits, 5 s for distribution circuits)</li>
                <li className="pl-1"><strong>Calculation:</strong> Zs = Ze + (R1 + R2), where Ze is the external loop impedance and (R1 + R2) is the resistance of the line and CPC within the circuit</li>
                <li className="pl-1"><strong>Temperature correction:</strong> Measured values at ambient temperature must be corrected to operating temperature using a factor of 1.2 for comparison with tabulated maximum values</li>
                <li className="pl-1"><strong>Maintenance check:</strong> Loop impedance testing during periodic inspection verifies that fault protection remains effective throughout the installation's life</li>
              </ul>
            </div>
            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Common Cable Selection Errors</p>
              <p className="text-sm text-white">
                The most common errors are: selecting cable based solely on current without checking voltage drop (common on long submain runs); ignoring grouping factors when additional cables are added to existing containment; not verifying loop impedance when extending circuits; and using PVC cables in environments where XLPE or fire-rated cables are required. Each of these errors can result in an unsafe installation.
              </p>
            </div>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">CPC Thermal Withstand (Adiabatic Equation)</h3>
              <p className="text-sm text-white mb-3">
                The final verification in cable selection is ensuring the circuit protective conductor (CPC) can
                withstand the thermal energy of the maximum earth fault current for the disconnection time of the
                protective device. This is calculated using the adiabatic equation:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Formula:</strong> S = sqrt(I squared t) / k — where S is the minimum CPC cross-sectional area, I is the fault current, t is the disconnection time, and k is a material constant (143 for copper PVC, 176 for copper XLPE)</li>
                <li className="pl-1"><strong>Application:</strong> If the calculated minimum S exceeds the actual CPC size, a larger CPC or separate earth conductor is required</li>
                <li className="pl-1"><strong>Maintenance relevance:</strong> When extending circuits or changing protective devices, the CPC adequacy must be re-verified</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Cable selection requires all three criteria (CCC, voltage drop and Zs) to be satisfied simultaneously. The cable size is determined by whichever criterion demands the largest conductor.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Special Cable Types and Fire Performance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Certain applications demand cables with specific properties beyond standard power distribution. Fire-resistant cables maintain circuit integrity during fire, screened cables prevent electromagnetic interference, and armoured cables resist mechanical damage. Understanding when and why these special cables are specified is essential for maintenance work where like-for-like replacement is critical for safety.
            </p>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Mineral Insulated Cable (MI / Pyro)</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Construction:</strong> Copper conductors in compacted magnesium oxide (MgO) insulation within a seamless copper or stainless steel sheath</li>
                <li className="pl-1"><strong>Fire performance:</strong> Maintains circuit integrity above 1,000 degrees C; non-combustible; zero smoke emission</li>
                <li className="pl-1"><strong>Applications:</strong> Fire pump supplies, smoke extraction fan circuits, fire alarm circuits (BS 5839), emergency lighting (BS 5266), hazardous areas</li>
                <li className="pl-1"><strong>Maintenance note:</strong> MgO insulation is hygroscopic (absorbs moisture). Exposed cable ends must be sealed immediately. Failed seals cause low insulation resistance readings — a common maintenance fault</li>
                <li className="pl-1"><strong>Termination:</strong> Requires specialist termination pots and seals; incorrect termination is the most common cause of MI cable failure</li>
              </ul>
            </div>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Fire-Performance Cables (FP200, FP Plus)</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Standard:</strong> Tested to BS 8434-2 (fire resistance) and classified to BS EN 13501-6</li>
                <li className="pl-1"><strong>Construction:</strong> Solid copper conductors, silicone rubber insulation, aluminium tape moisture barrier, LSZH outer sheath</li>
                <li className="pl-1"><strong>Advantage over MI:</strong> Easier to install and terminate using standard accessories; more flexible; no moisture ingress issues</li>
                <li className="pl-1"><strong>Limitation:</strong> Does not match MI cable's extreme temperature performance; requires clip fixings rated for fire conditions</li>
              </ul>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">SWA Cables</h3>
                <p className="text-sm text-white">
                  Steel wire armour provides mechanical protection for cables installed on open cable trays, cleated to surfaces, or buried underground. The armour can serve as a CPC if the cross-sectional area meets BS 7671 requirements. SWA cables must be correctly terminated using appropriate glands (BW for indoor, CW for outdoor with weather seal) to maintain the armour continuity for earth fault protection.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Screened Cables</h3>
                <p className="text-sm text-white">
                  Screened (shielded) cables are used for control and signal circuits in environments with electromagnetic interference. The screen — typically braided copper or aluminium foil — prevents external fields from inducing noise in the signal conductors. EMC glands must be used to maintain 360-degree screen termination at the panel entry. Broken or incorrectly terminated screens are a common cause of control system malfunctions in industrial environments.
                </p>
              </div>
            </div>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Cable Installation Considerations</h3>
              <p className="text-sm text-white mb-3">
                Beyond cable selection, proper installation practice is essential for reliable performance
                throughout the cable's service life. Incorrect installation can damage even the best cable.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Bending radius:</strong> Never exceed the minimum bending radius — typically 6 times cable diameter for SWA cables up to 25 mm, 8 times for larger cables; tighter bends damage armour and deform insulation</li>
                <li className="pl-1"><strong>Pulling tension:</strong> Maximum sidewall pressure and pulling force must not exceed manufacturer limits — excessive force during cable pulling stretches conductors and compresses insulation</li>
                <li className="pl-1"><strong>Temperature limits:</strong> PVC cables should not be installed below 0 degrees C as the sheath becomes brittle and can crack during bending; XLPE can be installed at lower temperatures</li>
                <li className="pl-1"><strong>UV protection:</strong> Standard PVC sheaths degrade in direct sunlight — use UV-resistant types or provide physical protection for outdoor exposed runs</li>
                <li className="pl-1"><strong>Proximity to heat sources:</strong> Cables routed near hot surfaces (steam pipes, heaters, flues) require additional derating or physical separation</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Cable Testing During Maintenance</h3>
              <p className="text-sm text-white mb-3">
                Cable condition assessment is a key part of periodic inspection and ongoing maintenance.
                Degraded cables must be identified before they fail in service.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Insulation resistance (IR):</strong> Measured at 500 V DC for LV cables; minimum acceptable value is 1 Mohm but healthy cables typically read much higher; a falling trend indicates deterioration</li>
                <li className="pl-1"><strong>Continuity testing:</strong> Verifies all conductors and CPC are intact; essential after any physical disturbance or building works</li>
                <li className="pl-1"><strong>Earth fault loop impedance:</strong> Confirms the protective device will operate within required time during a fault; must be within BS 7671 maximum Zs values</li>
                <li className="pl-1"><strong>Visual inspection:</strong> Check for physical damage, heat discolouration, rodent damage, water ingress and sheath deterioration</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Under BS 5839-1 and BS 5266-1, fire-resistant cables must be used for
              critical fire safety circuits. Replacing a fire-rated cable with a standard cable during
              maintenance is a serious compliance failure that could endanger lives during a fire.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Harmonised Colours and Cable Identification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Correct cable identification is fundamental to safe maintenance work. Misidentifying a conductor can result in short circuits, equipment damage or fatal electric shock. BS 7671 specifies harmonised colour coding for fixed wiring, and maintenance technicians must be familiar with both the current and legacy colour schemes encountered in existing installations.
            </p>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Harmonised vs Legacy Colours</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Conductor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Current (Harmonised)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Legacy UK</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2">Line (single-phase)</td><td className="border border-white/10 px-3 py-2">Brown</td><td className="border border-white/10 px-3 py-2">Red</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">L1 (three-phase)</td><td className="border border-white/10 px-3 py-2">Brown</td><td className="border border-white/10 px-3 py-2">Red</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">L2 (three-phase)</td><td className="border border-white/10 px-3 py-2">Black</td><td className="border border-white/10 px-3 py-2">Yellow</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">L3 (three-phase)</td><td className="border border-white/10 px-3 py-2">Grey</td><td className="border border-white/10 px-3 py-2">Blue</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Neutral</td><td className="border border-white/10 px-3 py-2">Blue</td><td className="border border-white/10 px-3 py-2">Black</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Protective (earth)</td><td className="border border-white/10 px-3 py-2">Green/yellow</td><td className="border border-white/10 px-3 py-2">Green/yellow</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Danger: Mixed Colour Installations</p>
              <p className="text-sm text-white">
                Many existing installations contain both old and new colour codes. The critical confusion point is that old-code neutral (black) is the same as new-code L2. A maintenance technician working on a distribution board with mixed colours must exercise extreme caution. BS 7671 requires warning notices at distribution boards where both old and new colours are present. If no notice exists, fit one.
              </p>
            </div>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Cable Identification Markings</h3>
              <p className="text-sm text-white mb-3">
                In addition to conductor colour coding, cables carry printed markings on their outer sheath that
                provide essential identification information for maintenance technicians.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Manufacturer name or trademark:</strong> Identifies the cable source for warranty and specification queries</li>
                <li className="pl-1"><strong>British Standard reference:</strong> Confirms the manufacturing standard (e.g., BS 5467 for XLPE/SWA/PVC)</li>
                <li className="pl-1"><strong>Cable designation code:</strong> The alphanumeric type designation (e.g., 6944X for 4-core XLPE/SWA)</li>
                <li className="pl-1"><strong>Conductor size and number of cores:</strong> e.g., 4 x 16 mm squared</li>
                <li className="pl-1"><strong>Voltage rating:</strong> e.g., 600/1,000 V</li>
                <li className="pl-1"><strong>Date of manufacture:</strong> Year and sometimes quarter — useful for assessing cable age during periodic inspections</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The maintenance technician standard requires competence in cable
              identification, selection and installation. Cable identification is a critical safety skill that
              underpins all electrical maintenance work. Always prove dead before touching any conductor,
              regardless of its colour.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

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
                <p className="font-medium text-white mb-1">Cable Sizing Process</p>
                <ul className="space-y-0.5">
                  <li>1. Determine design current (Ib)</li>
                  <li>2. Select protective device rating (In &ge; Ib)</li>
                  <li>3. Apply correction factors: Ca, Cg, Ci, Cf</li>
                  <li>4. Calculate required It = In / (Ca x Cg x Ci)</li>
                  <li>5. Verify voltage drop within 3% (lighting) / 5% (power)</li>
                  <li>6. Verify earth fault loop impedance (Zs)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Cable Standards</p>
                <ul className="space-y-0.5">
                  <li>BS 7671 Appendix 4 — current-carrying capacity tables</li>
                  <li>BS 5467 — XLPE/SWA/PVC cables</li>
                  <li>BS 6004 — PVC singles</li>
                  <li>BS EN 60702 — mineral insulated cable</li>
                  <li>BS 7846 — fire-performance cables (FP200)</li>
                  <li>Harmonised colours: Brown L1, Black L2, Grey L3</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section3-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Control Panel Layout
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section3-3">
              Next: Terminations &amp; Connectors
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule3Section3_2;
