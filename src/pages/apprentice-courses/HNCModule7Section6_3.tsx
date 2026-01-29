import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Earthing Systems - HNC Module 7 Section 6.3";
const DESCRIPTION = "Master earthing systems for electrical installations: TN-S, TN-C-S, TT, and IT systems, main earthing terminal, protective conductors, circuit protective conductor sizing, main equipotential bonding, supplementary bonding, and earth electrode testing.";

const quickCheckQuestions = [
  {
    id: "tns-system",
    question: "In a TN-S earthing system, how is the means of earthing provided?",
    options: ["Combined neutral and earth conductor", "Earth electrode at the installation", "Separate metallic return path via supply cable sheath", "Through the building structure"],
    correctIndex: 2,
    explanation: "In a TN-S system, the means of earthing is provided by a separate metallic return path, typically the metal sheath or armouring of the supply cable. The 'S' denotes separate neutral and protective conductors throughout."
  },
  {
    id: "tncs-pme",
    question: "What is the alternative name for a TN-C-S earthing system in the UK?",
    options: ["Terra Neutral", "Protective Multiple Earthing (PME)", "Combined Earth System", "Direct Earth Return"],
    correctIndex: 1,
    explanation: "TN-C-S is commonly known as Protective Multiple Earthing (PME) in the UK. The neutral conductor is earthed at multiple points along the distribution network, providing the means of earthing to consumers."
  },
  {
    id: "cpc-sizing",
    question: "According to the adiabatic equation, what does k represent when calculating minimum cpc size?",
    options: ["Fault current in amperes", "Disconnection time in seconds", "A factor depending on conductor material and insulation", "Cable length in metres"],
    correctIndex: 2,
    explanation: "In the adiabatic equation S = √(I²t)/k, the k value is a factor that depends on the conductor material (copper or aluminium) and the type of insulation. For thermoplastic insulated copper, k = 115."
  },
  {
    id: "main-bonding",
    question: "What is the minimum cross-sectional area for main protective bonding conductors with a 25mm² supply neutral?",
    options: ["6mm²", "10mm²", "16mm²", "25mm²"],
    correctIndex: 1,
    explanation: "Main protective bonding conductors must have a csa of not less than half the csa of the supply neutral, with a minimum of 6mm² and maximum requirement of 25mm². With a 25mm² neutral: 25 ÷ 2 = 12.5mm², so 16mm² would be required (next standard size up from 10mm²)."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "In which earthing system does the DNO provide no means of earthing, requiring the installation of an earth electrode?",
    options: [
      "TN-S",
      "TN-C-S",
      "TT",
      "TN-C"
    ],
    correctAnswer: 2,
    explanation: "In a TT system, the DNO provides no means of earthing. The installation requires its own earth electrode to be installed, and protection is typically provided by RCDs due to the higher earth fault loop impedance."
  },
  {
    id: 2,
    question: "What does the designation 'TN' indicate about an earthing system?",
    options: ["The neutral is not earthed", "The source is directly earthed and exposed-conductive-parts are connected to that earth", "Two separate neutral conductors are used", "The system uses an earth electrode"],
    correctAnswer: 1,
    explanation: "TN indicates: T = terra (source directly earthed at one point), N = neutral (exposed-conductive-parts connected to the earthed point of the source, i.e., the neutral). The earthing arrangement uses the supply neutral."
  },
  {
    id: 3,
    question: "What is the typical maximum earth fault loop impedance (Ze) for a TN-S system?",
    options: ["0.35Ω", "0.8Ω", "21Ω", "200Ω"],
    correctAnswer: 0,
    explanation: "The typical maximum Ze for a TN-S system is 0.35Ω. This low impedance is achieved because the fault return path is via the metallic cable sheath, providing a low-resistance connection back to the source."
  },
  {
    id: 4,
    question: "Why must additional precautions be taken with PME supplies when providing earthing to outbuildings?",
    options: [
      "The cable cost is higher",
      "Loss of the PEN conductor could result in dangerous voltages appearing on metalwork",
      "The supply voltage is different",
      "RCDs cannot be used"
    ],
    correctAnswer: 1,
    explanation: "If the PEN (combined protective earth and neutral) conductor is lost in a PME system, dangerous voltages can appear on all metalwork connected to the PME earth. For outbuildings, TT earthing with an earth electrode is often required."
  },
  {
    id: 5,
    question: "The main earthing terminal must be connected to which of the following?",
    options: [
      "Only the circuit protective conductors",
      "Only the main protective bonding conductors",
      "The means of earthing, all circuit cpcs, main bonding conductors, and functional earthing",
      "Only the lightning protection system"
    ],
    correctAnswer: 2,
    explanation: "The main earthing terminal (MET) is the central connection point for the installation's earthing arrangement. It must connect the means of earthing, all circuit protective conductors, main protective bonding conductors, and any functional earthing requirements."
  },
  {
    id: 6,
    question: "Using the adiabatic equation S = √(I²t)/k, calculate the minimum cpc size for a prospective fault current of 1500A, disconnection time of 0.4s, with k=115.",
    options: [
      "4mm²",
      "6mm²",
      "8.25mm² (use 10mm²)",
      "10mm²"
    ],
    correctAnswer: 2,
    explanation: "S = √(I²t)/k = √(1500² × 0.4)/115 = √(2,250,000 × 0.4)/115 = √900,000/115 = 949/115 = 8.25mm². The next standard size up is 10mm²."
  },
  {
    id: 7,
    question: "What is the purpose of supplementary equipotential bonding?",
    options: [
      "To replace main bonding conductors",
      "To reduce touch voltages by connecting simultaneously accessible metalwork in specific locations",
      "To provide a direct path for lightning currents",
      "To increase the earth fault loop impedance"
    ],
    correctAnswer: 1,
    explanation: "Supplementary bonding connects together simultaneously accessible exposed-conductive-parts and extraneous-conductive-parts within specific locations (e.g., bathrooms) to reduce touch voltages that could occur during a fault."
  },
  {
    id: 8,
    question: "Which extraneous-conductive-parts require main protective bonding?",
    options: [
      "Only metal water pipes",
      "Metal gas, water, oil pipes, structural steel, and other services entering the building",
      "Only pipes within 3m of the consumer unit",
      "All metal pipes regardless of material or location"
    ],
    correctAnswer: 1,
    explanation: "Main protective bonding is required for metal water pipes, gas installation pipes (within 600mm of the meter), oil pipes, structural steel, central heating and air conditioning systems, and any other metallic service entering the building."
  },
  {
    id: 9,
    question: "For an earth electrode serving a TT installation, what test should be performed and what is the typical maximum acceptable resistance?",
    options: [
      "Insulation resistance test, maximum 1MΩ",
      "Earth electrode resistance test, typically less than 200Ω when using 30mA RCD protection",
      "Continuity test, maximum 0.5Ω",
      "Voltage drop test, maximum 5%"
    ],
    correctAnswer: 1,
    explanation: "Earth electrode resistance should be tested using a dedicated earth electrode resistance tester. For TT systems with 30mA RCD protection, Ra × IΔn ≤ 50V means Ra ≤ 50/0.03 = 1667Ω, but practically values under 200Ω are preferred for reliable operation."
  },
  {
    id: 10,
    question: "What is an IT earthing system primarily used for?",
    options: [
      "Domestic installations",
      "Installations requiring high continuity of supply where a first fault should not cause disconnection",
      "Temporary construction sites",
      "Swimming pool installations"
    ],
    correctAnswer: 1,
    explanation: "IT systems have either an unearthed source or a source earthed through a high impedance. This means a first earth fault will not cause automatic disconnection, providing continuity of supply for critical processes like hospitals or manufacturing."
  },
  {
    id: 11,
    question: "What is the maximum allowable resistance between main bonding conductors and extraneous-conductive-parts?",
    options: [
      "0.05Ω",
      "0.5Ω",
      "5Ω",
      "There is no specific maximum, just a sound electrical connection"
    ],
    correctAnswer: 0,
    explanation: "The resistance of main protective bonding conductors should not exceed 0.05Ω (50 milliohms). This ensures an effective equipotential zone and allows adequate fault current to flow for protective device operation."
  },
  {
    id: 12,
    question: "When using Table 54.7 of BS 7671 for cpc sizing, what determines the minimum cpc size?",
    options: [
      "The length of the circuit only",
      "The cross-sectional area of the line conductor",
      "The type of protective device only",
      "The ambient temperature"
    ],
    correctAnswer: 1,
    explanation: "Table 54.7 relates minimum cpc size to the cross-sectional area of the associated line conductor. For line conductors up to 16mm², cpc must be at least equal in size. Above 16mm², different ratios apply."
  }
];

const faqs = [
  {
    question: "What is the difference between TN-S and TN-C-S systems?",
    answer: "In TN-S, the protective conductor (earth) and neutral are separate throughout the entire system, with earthing typically provided via the cable sheath. In TN-C-S (PME), they are combined in the supply network as a PEN conductor, then separated at the intake position. TN-C-S is more common for modern installations but requires additional precautions for certain applications due to the shared neutral/earth path."
  },
  {
    question: "Why is RCD protection usually required for TT installations?",
    answer: "TT systems typically have much higher earth fault loop impedance (Ze can exceed 20Ω) because the fault current must return via the general mass of earth. This high impedance means fault currents may be too low to operate overcurrent devices quickly enough. RCDs detect the imbalance caused by earth leakage and can disconnect within the required time regardless of loop impedance."
  },
  {
    question: "Can I use Table 54.7 instead of the adiabatic equation for cpc sizing?",
    answer: "Yes, Table 54.7 provides a simplified method for sizing cpcs based on line conductor size, without needing to calculate fault current and disconnection time. However, the adiabatic equation method often allows smaller conductor sizes and must be used where Table 54.7 is not applicable, such as for unusually long circuits or non-standard situations."
  },
  {
    question: "What is the 600mm rule for gas bonding?",
    answer: "Main protective bonding to gas installation pipework should be connected within 600mm of the gas meter. This ensures that the bonding is applied before any internal gas pipework, which could become live through a fault. The bonding clamp should be fitted on the consumer side of the meter on hard pipework, not on the meter itself."
  },
  {
    question: "When is supplementary bonding required in a bathroom?",
    answer: "BS 7671 has reduced requirements for supplementary bonding in bathrooms. It is not required if the location is served by circuits with RCD protection not exceeding 30mA, all exposed-conductive-parts and extraneous-conductive-parts are connected to the main earthing system, and the main protective bonding complies with current regulations."
  },
  {
    question: "How do I test earth electrode resistance?",
    answer: "Earth electrode resistance is typically measured using the fall-of-potential method with a dedicated earth electrode resistance tester. Two temporary test spikes are driven into the ground at set distances from the electrode. The tester passes a current between the electrode and one spike while measuring voltage to the other, calculating resistance from these values."
  }
];

const HNCModule7Section6_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section6">
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
            <Zap className="h-4 w-4" />
            <span>Module 7.6.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Earthing Systems
          </h1>
          <p className="text-white/80">
            TN-S, TN-C-S, TT, and IT systems, main earthing terminal, protective conductors, equipotential bonding, and earth electrode testing
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>TN-S:</strong> Separate earth via cable sheath, Ze ≤ 0.35Ω</li>
              <li className="pl-1"><strong>TN-C-S (PME):</strong> Combined neutral/earth in supply, Ze ≤ 0.35Ω</li>
              <li className="pl-1"><strong>TT:</strong> Earth electrode required, RCD protection essential</li>
              <li className="pl-1"><strong>Main bonding:</strong> Min 6mm², max requirement 25mm²</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Sizing Rules</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>CPC (Table 54.7):</strong> Line ≤16mm² → cpc = line size</li>
              <li className="pl-1"><strong>CPC (adiabatic):</strong> S = √(I²t)/k</li>
              <li className="pl-1"><strong>Main bonding:</strong> ≥ half neutral csa, min 6mm²</li>
              <li className="pl-1"><strong>Supplementary:</strong> Min 2.5mm² mech protected, 4mm² unprotected</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify and explain TN-S, TN-C-S, TT, and IT earthing systems",
              "Understand the function of the main earthing terminal",
              "Size circuit protective conductors using Table 54.7 and adiabatic equation",
              "Apply main equipotential bonding requirements correctly",
              "Determine when supplementary bonding is required",
              "Perform and interpret earth electrode resistance tests"
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

        {/* Section 1: Earthing System Types */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Earthing System Types
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The earthing system defines how the source (transformer) is earthed and how the exposed-conductive-parts
              of the installation are connected to earth. The system type affects protective device selection, earth
              fault loop impedance values, and additional protection requirements.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">System designation letters:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>First letter (relationship of supply to earth):</strong> T = direct connection to earth, I = isolated or high impedance connection</li>
                <li className="pl-1"><strong>Second letter (installation earthing):</strong> T = direct connection to earth, N = connection to earthed point of source (neutral)</li>
                <li className="pl-1"><strong>Subsequent letters:</strong> S = separate neutral and protective conductors, C = combined conductor (PEN)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">UK Earthing Systems Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">System</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Means of Earthing</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Ze</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Common Applications</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">TN-S</td>
                      <td className="border border-white/10 px-3 py-2">Cable sheath/armouring</td>
                      <td className="border border-white/10 px-3 py-2">≤ 0.35Ω</td>
                      <td className="border border-white/10 px-3 py-2">Older urban supplies, industrial</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">TN-C-S (PME)</td>
                      <td className="border border-white/10 px-3 py-2">Supply neutral (PEN)</td>
                      <td className="border border-white/10 px-3 py-2">≤ 0.35Ω</td>
                      <td className="border border-white/10 px-3 py-2">Modern domestic/commercial</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">TT</td>
                      <td className="border border-white/10 px-3 py-2">Earth electrode</td>
                      <td className="border border-white/10 px-3 py-2">≤ 21Ω (typically)</td>
                      <td className="border border-white/10 px-3 py-2">Rural, overhead supplies, outbuildings</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">IT</td>
                      <td className="border border-white/10 px-3 py-2">Isolated or high impedance</td>
                      <td className="border border-white/10 px-3 py-2">Variable</td>
                      <td className="border border-white/10 px-3 py-2">Critical systems, hospitals, process plants</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">PME Precautions</p>
              <p className="text-sm text-white">
                With TN-C-S (PME) systems, if the PEN conductor becomes open-circuit, all metalwork connected to the
                PME earth could rise to a dangerous potential. Special precautions apply for:
              </p>
              <ul className="text-sm text-white mt-2 space-y-1 list-disc list-outside ml-5">
                <li className="pl-1">Swimming pools and hot tubs - PME earthing not permitted</li>
                <li className="pl-1">Caravan parks - additional requirements apply</li>
                <li className="pl-1">Construction sites - restrictions on PME use</li>
                <li className="pl-1">Outbuildings - TT earthing often required</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Always verify the earthing system type at the origin before designing or testing an installation. The system type determines Zs values, protective device selection, and additional measures required.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Main Earthing Terminal and Protective Conductors */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Main Earthing Terminal and Protective Conductors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The main earthing terminal (MET) is the central point of the installation's earthing arrangement,
              providing a connection between the means of earthing and all protective conductors. Circuit protective
              conductors (cpcs) provide the fault current path from exposed-conductive-parts back to the source.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Main Earthing Terminal Connections</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Earthing conductor to means of earthing</li>
                  <li className="pl-1">All circuit protective conductors</li>
                  <li className="pl-1">Main protective bonding conductors</li>
                  <li className="pl-1">Functional earthing (if required)</li>
                  <li className="pl-1">Lightning protection (if applicable)</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">MET Requirements</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Must be readily accessible</li>
                  <li className="pl-1">Suitable for disconnection for testing</li>
                  <li className="pl-1">Disconnection requires tool</li>
                  <li className="pl-1">Mechanically strong and reliable</li>
                  <li className="pl-1">Label: "Safety Electrical Connection - Do Not Remove"</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">CPC Sizing - Table 54.7 Method</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Line Conductor (mm²)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Minimum CPC Size (mm²)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">S ≤ 16</td>
                      <td className="border border-white/10 px-3 py-2">S (same as line)</td>
                      <td className="border border-white/10 px-3 py-2">e.g., 2.5mm² line → 2.5mm² cpc</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">16 &lt; S ≤ 35</td>
                      <td className="border border-white/10 px-3 py-2">16</td>
                      <td className="border border-white/10 px-3 py-2">e.g., 25mm² line → 16mm² cpc</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">S &gt; 35</td>
                      <td className="border border-white/10 px-3 py-2">S/2</td>
                      <td className="border border-white/10 px-3 py-2">e.g., 70mm² line → 35mm² cpc</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Adiabatic Equation Method</p>
              <div className="font-mono text-sm space-y-2">
                <p className="text-white">S = √(I²t) / k</p>
                <p className="text-white/80">Where:</p>
                <p className="text-white/80 ml-4">S = minimum cpc cross-sectional area (mm²)</p>
                <p className="text-white/80 ml-4">I = prospective fault current (A)</p>
                <p className="text-white/80 ml-4">t = disconnection time (s)</p>
                <p className="text-white/80 ml-4">k = factor for conductor material and insulation</p>
                <p className="text-white/80 mt-2">Common k values (thermoplastic insulation):</p>
                <p className="text-white/80 ml-4">Copper conductor: k = 115</p>
                <p className="text-white/80 ml-4">Aluminium conductor: k = 76</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design tip:</strong> The adiabatic equation often permits smaller cpcs than Table 54.7, reducing cable costs on larger installations. Always verify the result is practical and meets minimum requirements.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Main Equipotential Bonding */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Main Equipotential Bonding
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Main protective bonding connects extraneous-conductive-parts to the main earthing terminal,
              creating an equipotential zone where all metalwork is at the same potential. This limits
              touch voltages during earth faults and provides a path for fault current.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Parts Requiring Main Bonding</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Water installation pipes:</strong> Bond at point of entry or as close as practicable</li>
                <li className="pl-1"><strong>Gas installation pipes:</strong> Bond within 600mm of meter outlet on consumer side</li>
                <li className="pl-1"><strong>Other services:</strong> Oil pipes, central heating, air conditioning</li>
                <li className="pl-1"><strong>Structural steel:</strong> Where it forms extraneous-conductive-part</li>
                <li className="pl-1"><strong>Lightning protection:</strong> Earth termination system</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Main Bonding Conductor Sizing</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Supply Neutral (mm²)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Min Main Bonding (mm²)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Up to 16</td>
                      <td className="border border-white/10 px-3 py-2">10 (min 6mm²)</td>
                      <td className="border border-white/10 px-3 py-2">Small domestic (60A-80A supply)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">25</td>
                      <td className="border border-white/10 px-3 py-2">16 (half of 25 = 12.5, round up)</td>
                      <td className="border border-white/10 px-3 py-2">Larger domestic (100A supply)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">35</td>
                      <td className="border border-white/10 px-3 py-2">16 (half of 35 = 17.5, round down to 16)</td>
                      <td className="border border-white/10 px-3 py-2">Commercial small</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">50 or greater</td>
                      <td className="border border-white/10 px-3 py-2">25 (maximum requirement)</td>
                      <td className="border border-white/10 px-3 py-2">Large commercial/industrial</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Bonding Connection Requirements</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Use appropriate clamps (BS 951)</li>
                  <li className="pl-1">Connect to clean, bare metal</li>
                  <li className="pl-1">Resistance not exceeding 0.05Ω</li>
                  <li className="pl-1">Label: "Safety Electrical Connection - Do Not Remove"</li>
                  <li className="pl-1">Accessible for inspection</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Connection Locations</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Water: after stopcock, before branch pipes</li>
                  <li className="pl-1">Gas: within 600mm of meter outlet</li>
                  <li className="pl-1">Before insulating sections</li>
                  <li className="pl-1">On hard pipe, not flexible connectors</li>
                  <li className="pl-1">Accessible for testing/maintenance</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Important:</strong> With PME supplies, the bonding requirements are critical. Loss of the PEN conductor could result in the neutral rising to a dangerous potential, and bonding ensures all metalwork rises equally, limiting touch voltages.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Supplementary Bonding and Earth Electrode Testing */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Supplementary Bonding and Earth Electrode Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Supplementary equipotential bonding connects simultaneously accessible exposed-conductive-parts
              and extraneous-conductive-parts within specific locations to reduce touch voltages. Earth
              electrode testing verifies that TT installations have adequate earthing for protective device operation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Supplementary Bonding Requirements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Connection Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Min Size (Protected)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Min Size (Unprotected)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Two exposed-conductive-parts</td>
                      <td className="border border-white/10 px-3 py-2">2.5mm² Cu</td>
                      <td className="border border-white/10 px-3 py-2">4mm² Cu</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Exposed to extraneous</td>
                      <td className="border border-white/10 px-3 py-2">2.5mm² Cu</td>
                      <td className="border border-white/10 px-3 py-2">4mm² Cu</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Two extraneous-conductive-parts</td>
                      <td className="border border-white/10 px-3 py-2">2.5mm² Cu</td>
                      <td className="border border-white/10 px-3 py-2">4mm² Cu</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <p className="text-sm font-medium text-green-400 mb-2">When Supplementary Bonding May Be Omitted</p>
              <p className="text-sm text-white mb-2">
                In locations such as bathrooms, supplementary bonding may be omitted where:
              </p>
              <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                <li className="pl-1">All circuits are protected by 30mA RCD</li>
                <li className="pl-1">All exposed and extraneous-conductive-parts are connected to main earthing</li>
                <li className="pl-1">Main protective bonding complies with Regulation 411.3.1.2</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Earth Electrode Testing</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Fall of Potential Method</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>1. Disconnect electrode from installation</li>
                    <li>2. Place current spike (C) at least 10× electrode depth away</li>
                    <li>3. Place potential spike (P) at 62% of distance to C</li>
                    <li>4. Measure resistance using dedicated tester</li>
                    <li>5. Move P spike to verify stable reading</li>
                    <li>6. Record and compare with requirements</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Maximum Electrode Resistance</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>TT with 30mA RCD: Ra ≤ 1667Ω (50V ÷ 0.03A)</li>
                    <li>Practical target: Ra &lt; 200Ω preferred</li>
                    <li>TT with 100mA RCD: Ra ≤ 500Ω</li>
                    <li>Lower values improve fault clearance reliability</li>
                    <li>Soil conditions affect achievable values</li>
                    <li>Multiple rods may be needed for low values</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Earth Electrode Types and Installation</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Electrode Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Minimum Size</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Driven rod (copper-clad steel)</td>
                      <td className="border border-white/10 px-3 py-2">Most common, domestic TT</td>
                      <td className="border border-white/10 px-3 py-2">1.2m minimum, often 2.4m</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Earth mat/plate</td>
                      <td className="border border-white/10 px-3 py-2">Rocky ground, low depth</td>
                      <td className="border border-white/10 px-3 py-2">Varies by soil conditions</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Foundation electrode</td>
                      <td className="border border-white/10 px-3 py-2">New builds, commercial</td>
                      <td className="border border-white/10 px-3 py-2">Embedded in concrete</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Tape/strip buried</td>
                      <td className="border border-white/10 px-3 py-2">Large sites, ring electrodes</td>
                      <td className="border border-white/10 px-3 py-2">25mm × 3mm copper tape</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Testing note:</strong> Earth electrode resistance varies with soil moisture content. Test during dry conditions for worst-case values. Seasonal variation can be significant - document testing conditions on certificates.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: CPC Sizing Using Adiabatic Equation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Calculate minimum cpc size for a circuit with Ipf = 2000A, disconnection time = 0.2s, thermoplastic copper (k=115).
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Given: I = 2000A, t = 0.2s, k = 115</p>
                <p className="mt-2">S = √(I²t) / k</p>
                <p>S = √(2000² × 0.2) / 115</p>
                <p>S = √(4,000,000 × 0.2) / 115</p>
                <p>S = √800,000 / 115</p>
                <p>S = 894.4 / 115</p>
                <p>S = 7.78mm²</p>
                <p className="mt-2 text-green-400">Select next standard size: 10mm² cpc</p>
                <p className="text-white/60">Note: If line conductor is 4mm², Table 54.7 would require 4mm² cpc</p>
                <p className="text-white/60">Adiabatic calculation may permit reduction if other conditions met</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Main Bonding Conductor Selection</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Determine main bonding conductor size for a commercial installation with 35mm² supply neutral.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Supply neutral: 35mm²</p>
                <p>Main bonding requirement: not less than half neutral csa</p>
                <p className="mt-2">Calculation:</p>
                <p>35 ÷ 2 = 17.5mm²</p>
                <p className="mt-2">Minimum requirement: 6mm² (always applies)</p>
                <p>Maximum requirement: 25mm² (cap for main bonding)</p>
                <p className="mt-2 text-green-400">Select: 16mm² main bonding conductor</p>
                <p className="text-white/60">(17.5mm² rounds to 16mm² as nearest standard below,</p>
                <p className="text-white/60">but some specify 25mm² for additional margin)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: TT System Earth Electrode Requirements</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Determine maximum earth electrode resistance for a TT installation protected by a 30mA RCD.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>RCD rating: IΔn = 30mA = 0.03A</p>
                <p>Maximum touch voltage limit: 50V</p>
                <p className="mt-2">Formula: Ra × IΔn ≤ 50V</p>
                <p>Ra ≤ 50 / IΔn</p>
                <p>Ra ≤ 50 / 0.03</p>
                <p>Ra ≤ 1666.7Ω</p>
                <p className="mt-2 text-green-400">Maximum theoretical: 1667Ω</p>
                <p className="text-white/60">Practical recommendation: Aim for Ra &lt; 200Ω</p>
                <p className="text-white/60">This provides margin for seasonal variation and reliable RCD operation</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Site Assessment Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Identify earthing system type from DNO documentation or visual inspection</li>
                <li className="pl-1">Measure Ze at origin to confirm system type and values</li>
                <li className="pl-1">Identify all extraneous-conductive-parts requiring main bonding</li>
                <li className="pl-1">Verify supply neutral size for bonding conductor sizing</li>
                <li className="pl-1">Check for PME restrictions in the installation location</li>
                <li className="pl-1">Document earthing arrangement on installation certificate</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">TN-S typical Ze: <strong>0.35Ω maximum</strong></li>
                <li className="pl-1">TN-C-S typical Ze: <strong>0.35Ω maximum</strong></li>
                <li className="pl-1">Main bonding minimum: <strong>6mm² copper</strong></li>
                <li className="pl-1">Main bonding maximum: <strong>25mm² copper</strong></li>
                <li className="pl-1">Bonding connection resistance: <strong>≤ 0.05Ω</strong></li>
                <li className="pl-1">Gas bonding: <strong>Within 600mm of meter</strong></li>
                <li className="pl-1">Thermoplastic copper k value: <strong>115</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Assuming earthing type:</strong> Always verify with measurement and documentation</li>
                <li className="pl-1"><strong>Undersized bonding:</strong> Calculate from supply neutral, not guesswork</li>
                <li className="pl-1"><strong>Gas bonding position:</strong> Must be within 600mm of meter, on hard pipe</li>
                <li className="pl-1"><strong>PME to outbuildings:</strong> Consider TT earthing for separate structures</li>
                <li className="pl-1"><strong>Missing labels:</strong> All bonding connections require safety labels</li>
                <li className="pl-1"><strong>Electrode testing:</strong> Test in dry conditions for reliable values</li>
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
                <p className="font-medium text-white mb-1">Earthing System Types</p>
                <ul className="space-y-0.5">
                  <li>TN-S: Separate earth (cable sheath)</li>
                  <li>TN-C-S: PME (PEN conductor)</li>
                  <li>TT: Earth electrode required</li>
                  <li>IT: Isolated source (special applications)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Conductor Sizing Summary</p>
                <ul className="space-y-0.5">
                  <li>CPC: Table 54.7 or S = √(I²t)/k</li>
                  <li>Main bonding: ≥ half neutral, min 6mm²</li>
                  <li>Supplementary: min 2.5mm² (protected)</li>
                  <li>Earth electrode conductor: min 16mm² Cu</li>
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
            <Link to="../h-n-c-module7-section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section6-4">
              Next: Protection Against Electric Shock
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule7Section6_3;
