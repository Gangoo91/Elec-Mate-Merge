import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Cable Sizing Calculations - HNC Module 7 Section 1.3";
const DESCRIPTION = "Master BS 7671 cable sizing methodology: current-carrying capacity, voltage drop calculations, correction factors, grouping factors, thermal constraints and adiabatic equation for fault protection.";

const quickCheckQuestions = [
  {
    id: "design-current",
    question: "What is the design current (Ib) in cable sizing?",
    options: ["The maximum fault current the cable can withstand", "The current the cable is expected to carry in normal service", "The rated current of the protective device", "The earth fault loop impedance current"],
    correctIndex: 1,
    explanation: "The design current (Ib) is the current intended to be carried by the circuit in normal service. It is determined from the connected load and forms the starting point for cable sizing calculations."
  },
  {
    id: "correction-factors",
    question: "What effect do correction factors have on tabulated current ratings?",
    options: ["They always increase the current rating", "They reduce the effective current-carrying capacity", "They have no effect on single cables", "They only apply to armoured cables"],
    correctIndex: 1,
    explanation: "Correction factors (Ca, Cg, Ci, Cc) account for conditions that reduce heat dissipation. Multiplying the tabulated rating by these factors (all less than or equal to 1) reduces the effective current-carrying capacity."
  },
  {
    id: "voltage-drop",
    question: "What is the maximum permitted voltage drop for a final circuit according to BS 7671?",
    options: ["3% of nominal voltage", "4% of nominal voltage", "5% of nominal voltage", "2.5% of nominal voltage"],
    correctIndex: 2,
    explanation: "BS 7671 limits voltage drop to 5% of nominal voltage (11.5V for 230V circuits) for final circuits from the origin of the installation. This comprises 3% for distribution circuits and 5% for final circuits when combined."
  },
  {
    id: "adiabatic-equation",
    question: "The adiabatic equation S = sqrt(I squared t) / k is used to determine:",
    options: ["The voltage drop in a cable", "The minimum cable size for fault protection", "The correction factor for ambient temperature", "The grouping factor for multiple cables"],
    correctIndex: 1,
    explanation: "The adiabatic equation calculates the minimum conductor cross-sectional area required to withstand the thermal effects of fault current for the disconnection time. This ensures the cable can safely carry fault current until the protective device operates."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "In the cable sizing equation It ≥ Ib / (Ca × Cg × Ci × Cc), what does It represent?",
    options: [
      "The design current of the circuit",
      "The tabulated current-carrying capacity from BS 7671",
      "The rated current of the protective device",
      "The earth fault current"
    ],
    correctAnswer: 1,
    explanation: "It represents the tabulated current-carrying capacity from the appropriate table in BS 7671 Appendix 4. This value must be greater than or equal to the design current divided by all applicable correction factors."
  },
  {
    id: 2,
    question: "A circuit has Ib = 28A. The protective device In = 32A. Ca = 0.87, Cg = 0.65, Ci = 1.0. What is the minimum It required?",
    options: ["28A", "32A", "49.5A", "56.6A"],
    correctAnswer: 3,
    explanation: "It ≥ In / (Ca × Cg × Ci) = 32 / (0.87 × 0.65 × 1.0) = 32 / 0.566 = 56.6A. Note: We use In (not Ib) because the protective device may allow continuous current up to its rating."
  },
  {
    id: 3,
    question: "What is the ambient temperature correction factor (Ca) for a cable installed where ambient temperature is 40°C when the reference temperature is 30°C?",
    options: ["0.71", "0.82", "0.87", "0.94"],
    correctAnswer: 2,
    explanation: "From BS 7671 Table 4B1, for thermoplastic (PVC) cables at 40°C ambient, Ca = 0.87. Higher ambient temperatures reduce the temperature differential available for heat dissipation, requiring cable derating."
  },
  {
    id: 4,
    question: "Eight single-core cables are installed in a single conduit. What is the grouping factor (Cg)?",
    options: ["0.38", "0.43", "0.52", "0.57"],
    correctAnswer: 1,
    explanation: "From BS 7671 Table 4C1, for 8 cables (4 circuits) in a conduit or enclosed space, Cg = 0.43. Grouping multiple cables together reduces their ability to dissipate heat, requiring significant derating."
  },
  {
    id: 5,
    question: "The voltage drop in a circuit is calculated as 8.2V. The nominal voltage is 230V. Does this comply with BS 7671?",
    options: [
      "Yes, it is within the 5% limit for final circuits",
      "No, it exceeds the 3% limit for all circuits",
      "Yes, it is within the 4% limit",
      "No, voltage drop is never permitted"
    ],
    correctAnswer: 0,
    explanation: "5% of 230V = 11.5V. The calculated voltage drop of 8.2V is less than 11.5V, therefore it complies with the BS 7671 requirement for voltage drop in final circuits from the origin of the installation."
  },
  {
    id: 6,
    question: "A 2.5mm² thermoplastic cable has a tabulated voltage drop of 18 mV/A/m. For a 25A load over 30m, what is the voltage drop?",
    options: ["7.5V", "10.5V", "13.5V", "18V"],
    correctAnswer: 2,
    explanation: "Voltage drop = (mV/A/m × Ib × L) / 1000 = (18 × 25 × 30) / 1000 = 13.5V. This exceeds the 11.5V limit for a 230V final circuit, so a larger cable size would be required."
  },
  {
    id: 7,
    question: "In the adiabatic equation S = √(I²t) / k, what does 'k' represent?",
    options: [
      "The cable length in metres",
      "A factor dependent on conductor and insulation materials",
      "The ambient temperature in Kelvin",
      "The protective device rating"
    ],
    correctAnswer: 1,
    explanation: "The 'k' factor is a constant that depends on the conductor material (copper or aluminium) and insulation type (thermoplastic or thermosetting). Values are given in BS 7671 Table 43.1, e.g., k = 115 for PVC-insulated copper conductors."
  },
  {
    id: 8,
    question: "A fault current of 1200A must be disconnected in 0.4s. Using k = 115, what is the minimum conductor size?",
    options: ["1.5mm²", "2.5mm²", "4mm²", "6.6mm²"],
    correctAnswer: 3,
    explanation: "S = √(I²t) / k = √(1200² × 0.4) / 115 = √(576000) / 115 = 758.9 / 115 = 6.6mm². A 10mm² cable would be the minimum standard size to satisfy this requirement."
  },
  {
    id: 9,
    question: "Which installation method typically provides the highest current-carrying capacity for a given cable size?",
    options: [
      "Cables enclosed in conduit in thermally insulated walls",
      "Cables clipped direct to a non-metallic surface",
      "Cables in free air with spacing",
      "Cables in trunking"
    ],
    correctAnswer: 2,
    explanation: "Cables in free air with adequate spacing (Reference Method E/F) have the highest current ratings because air circulation provides excellent heat dissipation. Enclosed installation methods restrict airflow and reduce ratings."
  },
  {
    id: 10,
    question: "Thermal insulation contact factor (Ci) of 0.5 applies when:",
    options: [
      "Cable is in contact with thermal insulation on one side",
      "Cable is totally surrounded by thermal insulation over 0.5m",
      "Cable passes through thermal insulation",
      "Cable is in ambient temperature above 50°C"
    ],
    correctAnswer: 1,
    explanation: "Ci = 0.5 applies when a cable is totally surrounded by thermal insulation for a distance greater than 0.5m. This severe derating reflects the significant reduction in heat dissipation when insulation prevents cooling."
  },
  {
    id: 11,
    question: "For a motor circuit with starting current of 6× full load current, what consideration affects cable sizing?",
    options: [
      "The starting current determines Ib",
      "Starting current affects voltage drop but not continuous rating",
      "Motors do not require cable sizing calculations",
      "Only the protective device rating matters"
    ],
    correctAnswer: 1,
    explanation: "For motor circuits, Ib is based on full load current (not starting current) for thermal sizing. However, starting current causes increased voltage drop which may affect motor starting. BS 7671 Appendix 4 provides guidance on motor circuit voltage drop."
  },
  {
    id: 12,
    question: "When selecting cable size, the final choice must satisfy:",
    options: [
      "Current-carrying capacity only",
      "Voltage drop requirements only",
      "Fault current withstand only",
      "All three: current capacity, voltage drop, and fault withstand"
    ],
    correctAnswer: 3,
    explanation: "Cable sizing requires checking three criteria: (1) current-carrying capacity with all correction factors, (2) voltage drop limits, and (3) fault current withstand (adiabatic equation). The cable must satisfy ALL requirements; the largest size from these checks is selected."
  }
];

const faqs = [
  {
    question: "Why do we use In rather than Ib when calculating minimum It?",
    answer: "The protective device will allow current up to its rated value (In) to flow continuously without tripping. Therefore, the cable must be sized to carry In safely, not just the expected design current Ib. Using In ensures the cable can handle the maximum continuous current the protective device permits. The relationship In ≥ Ib ≥ Iz must be maintained where Iz is the effective current-carrying capacity."
  },
  {
    question: "How do I handle multiple correction factors applying simultaneously?",
    answer: "When multiple derating conditions exist (e.g., high ambient temperature AND grouped cables AND thermal insulation), multiply all applicable correction factors together: Ct = Ca × Cg × Ci × Cc. This combined factor can become quite small (e.g., 0.87 × 0.65 × 0.75 = 0.42), significantly reducing effective capacity. In practice, this often results in selecting a cable 2-3 sizes larger than would otherwise be needed."
  },
  {
    question: "What if voltage drop is the limiting factor rather than current capacity?",
    answer: "This commonly occurs on long cable runs. If voltage drop calculations show the current-capacity-sized cable has excessive voltage drop, you must increase the cable size until voltage drop is acceptable. For very long runs, this can result in cables far larger than thermal requirements dictate. Consider running parallel cables or relocating distribution boards to reduce cable lengths."
  },
  {
    question: "How does the installation method affect cable sizing?",
    answer: "Installation method (Reference Method) dramatically affects current ratings. The same 2.5mm² cable might be rated at 24A when clipped direct (Method C), but only 18.5A when in conduit in an insulated wall (Method A). Always identify the correct reference method from BS 7671 before using the current rating tables. Where installation methods vary along a route, use the most onerous method for the entire cable."
  },
  {
    question: "When is the adiabatic equation critical in cable sizing?",
    answer: "The adiabatic equation becomes critical where: (1) Prospective fault current is high (typically near the supply origin), (2) Disconnection times are long (e.g., 5s rather than 0.4s), or (3) The cable selected for current capacity is relatively small. For circuits protected by MCBs/RCBOs with fast magnetic trip, the adiabatic check rarely increases cable size. For fuse-protected circuits or those far from supply, always verify."
  },
  {
    question: "How do I account for future load growth in cable sizing?",
    answer: "BS 7671 requires cables to be sized for the intended load, but good practice includes considering future expansion. Options include: (1) Size for anticipated maximum load from the outset, (2) Apply a diversity factor reduction and size accordingly, (3) Install spare ways in distribution boards with appropriately sized submains. Document any allowances made so future modifications consider the cable limitations."
  }
];

const HNCModule7Section1_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section1">
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
            <span>Module 7.1.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Cable Sizing Calculations
          </h1>
          <p className="text-white/80">
            Current-carrying capacity, voltage drop, correction factors, thermal constraints and BS 7671 methodology
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Design current (Ib):</strong> Current circuit will carry in normal service</li>
              <li className="pl-1"><strong>Correction factors:</strong> Ca, Cg, Ci, Cc reduce effective capacity</li>
              <li className="pl-1"><strong>Voltage drop:</strong> Max 5% for final circuits (11.5V at 230V)</li>
              <li className="pl-1"><strong>Adiabatic equation:</strong> Ensures fault current withstand</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Formula</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>It ≥ In / (Ca × Cg × Ci × Cc)</strong></li>
              <li className="pl-1"><strong>VD = (mV/A/m × Ib × L) / 1000</strong></li>
              <li className="pl-1"><strong>S = √(I²t) / k</strong> (adiabatic)</li>
              <li className="pl-1"><strong>Three checks:</strong> Capacity, VD, fault withstand</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply BS 7671 cable sizing methodology systematically",
              "Calculate effective current-carrying capacity with correction factors",
              "Determine voltage drop and assess compliance",
              "Use the adiabatic equation for fault current protection",
              "Select appropriate reference methods for installation conditions",
              "Verify cable selection satisfies all three sizing criteria"
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

        {/* Section 1: Fundamental Principles */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Fundamental Principles of Cable Sizing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Cable sizing is a critical design task that ensures cables can safely carry the intended
              current without overheating, maintain acceptable voltage at the load, and withstand
              fault currents until the protective device operates. BS 7671 provides a systematic
              methodology based on three fundamental checks.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The three cable sizing criteria:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Current-carrying capacity:</strong> Cable must carry load current without exceeding temperature limits</li>
                <li className="pl-1"><strong>Voltage drop:</strong> Voltage at load must remain within acceptable limits</li>
                <li className="pl-1"><strong>Fault current protection:</strong> Cable must withstand fault current for disconnection time</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Current Values in Cable Sizing</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Symbol</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Term</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Definition</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-mono">Ib</td>
                      <td className="border border-white/10 px-3 py-2">Design current</td>
                      <td className="border border-white/10 px-3 py-2">Current the circuit is intended to carry in normal service</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-mono">In</td>
                      <td className="border border-white/10 px-3 py-2">Rated current</td>
                      <td className="border border-white/10 px-3 py-2">Nominal current rating of the protective device</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-mono">Iz</td>
                      <td className="border border-white/10 px-3 py-2">Effective capacity</td>
                      <td className="border border-white/10 px-3 py-2">Actual current-carrying capacity after applying correction factors</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-mono">It</td>
                      <td className="border border-white/10 px-3 py-2">Tabulated current</td>
                      <td className="border border-white/10 px-3 py-2">Current rating from BS 7671 tables for given installation method</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-mono">I2</td>
                      <td className="border border-white/10 px-3 py-2">Operating current</td>
                      <td className="border border-white/10 px-3 py-2">Current causing effective operation of protective device</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Fundamental Coordination Requirement</p>
              <p className="text-sm text-white">For safe operation, the following relationship must be satisfied:</p>
              <p className="text-center font-mono text-lg mt-2 text-white">Ib ≤ In ≤ Iz</p>
              <p className="text-sm text-white/80 mt-2">
                The design current must not exceed the protective device rating, which must not exceed the
                cable's effective current-carrying capacity.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design approach:</strong> Start with the load current, select an appropriate protective device, then determine the minimum cable size to satisfy all three criteria.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Correction Factors */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Correction Factors and Current Capacity
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The tabulated current ratings in BS 7671 Appendix 4 are based on specific reference conditions.
              When actual installation conditions differ, correction factors must be applied to determine
              the effective current-carrying capacity. These factors account for reduced heat dissipation.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Ca - Ambient Temperature</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Reference: 30°C for most installations</li>
                  <li className="pl-1">Higher ambient = lower Ca value</li>
                  <li className="pl-1">Table 4B1 (thermoplastic insulation)</li>
                  <li className="pl-1">Table 4B2 (thermosetting insulation)</li>
                  <li className="pl-1">Example: 40°C = Ca 0.87 (PVC)</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cg - Grouping Factor</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Multiple circuits reduce cooling</li>
                  <li className="pl-1">Tables 4C1 to 4C5</li>
                  <li className="pl-1">More circuits = lower Cg value</li>
                  <li className="pl-1">Example: 6 cables = Cg 0.57</li>
                  <li className="pl-1">Spacing can improve rating</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Ci - Thermal Insulation</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Cables in contact with insulation</li>
                  <li className="pl-1">One side: Ci = 0.75 (50mm depth)</li>
                  <li className="pl-1">Surrounded &gt;0.5m: Ci = 0.5</li>
                  <li className="pl-1">Table 52.2 in BS 7671</li>
                  <li className="pl-1">Severe derating applies</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cc - BS 3036 Fuse Factor</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Semi-enclosed (rewirable) fuses only</li>
                  <li className="pl-1">Cc = 0.725</li>
                  <li className="pl-1">Fusing factor is 2 (not 1.45)</li>
                  <li className="pl-1">MCBs/RCBOs: Cc = 1.0</li>
                  <li className="pl-1">Cartridge fuses: Cc = 1.0</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Cable Sizing Formula</p>
              <p className="text-center font-mono text-lg text-white">It ≥ In / (Ca × Cg × Ci × Cc)</p>
              <p className="text-sm text-white/80 mt-2">
                The minimum tabulated current rating (It) must be greater than or equal to the protective
                device rating divided by the product of all applicable correction factors.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Correction Factor Values</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Factor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Condition</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ca</td>
                      <td className="border border-white/10 px-3 py-2">35°C ambient (PVC)</td>
                      <td className="border border-white/10 px-3 py-2">0.94</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ca</td>
                      <td className="border border-white/10 px-3 py-2">40°C ambient (PVC)</td>
                      <td className="border border-white/10 px-3 py-2">0.87</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cg</td>
                      <td className="border border-white/10 px-3 py-2">2 circuits touching</td>
                      <td className="border border-white/10 px-3 py-2">0.80</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cg</td>
                      <td className="border border-white/10 px-3 py-2">4 circuits in conduit</td>
                      <td className="border border-white/10 px-3 py-2">0.65</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ci</td>
                      <td className="border border-white/10 px-3 py-2">One side thermal insulation</td>
                      <td className="border border-white/10 px-3 py-2">0.75</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cc</td>
                      <td className="border border-white/10 px-3 py-2">BS 3036 fuse protection</td>
                      <td className="border border-white/10 px-3 py-2">0.725</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Important:</strong> When no special conditions exist, correction factors equal 1.0 and the tabulated rating applies directly.
            </p>
          </div>
        </section>

        {/* Section 3: Voltage Drop */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Voltage Drop Calculations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Voltage drop occurs as current flows through the impedance of cable conductors. Excessive
              voltage drop reduces equipment efficiency, causes lamps to dim, motors to run hot, and
              may prevent proper operation. BS 7671 Regulation 525 limits voltage drop to maintain
              adequate voltage at the point of utilisation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BS 7671 Voltage Drop Limits</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Circuit Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Maximum Drop</th>
                      <th className="border border-white/10 px-3 py-2 text-left">At 230V</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lighting circuits</td>
                      <td className="border border-white/10 px-3 py-2">3%</td>
                      <td className="border border-white/10 px-3 py-2">6.9V</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Other circuits</td>
                      <td className="border border-white/10 px-3 py-2">5%</td>
                      <td className="border border-white/10 px-3 py-2">11.5V</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Where supply is within +10%/-6%</td>
                      <td className="border border-white/10 px-3 py-2">3% + 5% combined</td>
                      <td className="border border-white/10 px-3 py-2">18.4V total</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Voltage Drop Formula</p>
              <p className="text-center font-mono text-lg text-white">VD = (mV/A/m × Ib × L) / 1000</p>
              <p className="text-sm text-white/80 mt-2">
                Where mV/A/m is the tabulated voltage drop per ampere per metre from BS 7671 Appendix 4,
                Ib is the design current, and L is the cable length in metres.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Example Voltage Drop Values (mV/A/m)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Cable Size</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Single Phase (PVC)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Three Phase (PVC)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1.5mm²</td>
                      <td className="border border-white/10 px-3 py-2">29 mV/A/m</td>
                      <td className="border border-white/10 px-3 py-2">25 mV/A/m</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2.5mm²</td>
                      <td className="border border-white/10 px-3 py-2">18 mV/A/m</td>
                      <td className="border border-white/10 px-3 py-2">15 mV/A/m</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4mm²</td>
                      <td className="border border-white/10 px-3 py-2">11 mV/A/m</td>
                      <td className="border border-white/10 px-3 py-2">9.5 mV/A/m</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">6mm²</td>
                      <td className="border border-white/10 px-3 py-2">7.3 mV/A/m</td>
                      <td className="border border-white/10 px-3 py-2">6.4 mV/A/m</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">10mm²</td>
                      <td className="border border-white/10 px-3 py-2">4.4 mV/A/m</td>
                      <td className="border border-white/10 px-3 py-2">3.8 mV/A/m</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">16mm²</td>
                      <td className="border border-white/10 px-3 py-2">2.8 mV/A/m</td>
                      <td className="border border-white/10 px-3 py-2">2.4 mV/A/m</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Voltage Drop Considerations</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Starting conditions:</strong> Motor starting currents cause higher transient voltage drop</li>
                <li className="pl-1"><strong>Diversity:</strong> May use actual load rather than circuit rating if justified</li>
                <li className="pl-1"><strong>Route length:</strong> Use actual cable length, not straight-line distance</li>
                <li className="pl-1"><strong>Temperature:</strong> Higher conductor temperature increases resistance slightly</li>
                <li className="pl-1"><strong>Power factor:</strong> For AC circuits, voltage drop has both resistive and reactive components</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical note:</strong> On long cable runs, voltage drop often determines the cable size rather than current-carrying capacity.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Thermal Constraints and Fault Protection */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Thermal Constraints and the Adiabatic Equation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              During a fault, very high currents flow through the cable conductors. This current
              generates heat so rapidly that there is no time for it to dissipate to surroundings -
              the process is essentially adiabatic. The cable must be sized to absorb this energy
              without the conductor temperature exceeding safe limits for the insulation.
            </p>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">The Adiabatic Equation</p>
              <p className="text-center font-mono text-lg text-white">S = √(I²t) / k</p>
              <div className="text-sm text-white/80 mt-3 space-y-1">
                <p><strong>S</strong> = Minimum conductor cross-sectional area (mm²)</p>
                <p><strong>I</strong> = Fault current in amperes (RMS for AC)</p>
                <p><strong>t</strong> = Operating time of protective device (seconds)</p>
                <p><strong>k</strong> = Factor dependent on conductor and insulation materials</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">k Values from BS 7671 Table 43.1</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Conductor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">PVC (70°C)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">XLPE/EPR (90°C)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Mineral (PVC sheath)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Copper</td>
                      <td className="border border-white/10 px-3 py-2">115</td>
                      <td className="border border-white/10 px-3 py-2">143</td>
                      <td className="border border-white/10 px-3 py-2">115</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Aluminium</td>
                      <td className="border border-white/10 px-3 py-2">76</td>
                      <td className="border border-white/10 px-3 py-2">94</td>
                      <td className="border border-white/10 px-3 py-2">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Disconnection Times (BS 7671 Regulation 411)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Circuit Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">TN System</th>
                      <th className="border border-white/10 px-3 py-2 text-left">TT System</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Final circuits ≤32A</td>
                      <td className="border border-white/10 px-3 py-2">0.4s</td>
                      <td className="border border-white/10 px-3 py-2">0.2s</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Final circuits &gt;32A</td>
                      <td className="border border-white/10 px-3 py-2">5s</td>
                      <td className="border border-white/10 px-3 py-2">1s</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Distribution circuits</td>
                      <td className="border border-white/10 px-3 py-2">5s</td>
                      <td className="border border-white/10 px-3 py-2">1s</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Worked Example: Adiabatic Check</h3>
              <p className="text-sm text-white mb-2">
                <strong>Given:</strong> Prospective fault current = 2000A, disconnection time = 0.4s,
                PVC-insulated copper cable, selected cable = 4mm²
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>k = 115 (copper/PVC from Table 43.1)</p>
                <p className="mt-2">S = √(I²t) / k</p>
                <p>S = √(2000² × 0.4) / 115</p>
                <p>S = √(1,600,000) / 115</p>
                <p>S = 1264.9 / 115</p>
                <p>S = 11.0mm²</p>
                <p className="mt-2 text-red-400">Result: 4mm² FAILS - minimum 16mm² required</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">When Adiabatic Check is Critical</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Near supply origin:</strong> High fault currents near transformer/intake</li>
                <li className="pl-1"><strong>Long disconnection times:</strong> 5s for distribution circuits</li>
                <li className="pl-1"><strong>Fuse protection:</strong> Slower than MCB magnetic trip</li>
                <li className="pl-1"><strong>Small cables:</strong> Limited thermal mass</li>
                <li className="pl-1"><strong>CPC sizing:</strong> Often the critical conductor for fault withstand</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Verification requirement:</strong> For every circuit, the selected cable must satisfy: Actual S ≥ Calculated minimum S from the adiabatic equation.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Complete Cable Sizing Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Size a cable for a 9kW single-phase load, 40m from distribution board.
                Installation: Clipped direct, 35°C ambient, grouped with 3 other circuits.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Step 1: Calculate design current (Ib)</p>
                <p>Ib = P / V = 9000 / 230 = 39.1A</p>
                <p className="mt-2 text-white/60">Step 2: Select protective device</p>
                <p>In = 40A (MCB Type B)</p>
                <p className="mt-2 text-white/60">Step 3: Determine correction factors</p>
                <p>Ca = 0.94 (35°C ambient, Table 4B1)</p>
                <p>Cg = 0.65 (4 circuits grouped, Table 4C1)</p>
                <p>Ci = 1.0 (no thermal insulation)</p>
                <p>Cc = 1.0 (MCB protection)</p>
                <p className="mt-2 text-white/60">Step 4: Calculate minimum It</p>
                <p>It ≥ In / (Ca × Cg × Ci × Cc)</p>
                <p>It ≥ 40 / (0.94 × 0.65 × 1.0 × 1.0)</p>
                <p>It ≥ 40 / 0.611 = 65.5A</p>
                <p className="mt-2 text-white/60">Step 5: Select cable from Table 4D2A (Method C)</p>
                <p>10mm² = 63A (insufficient)</p>
                <p className="text-green-400">16mm² = 85A (satisfactory)</p>
                <p className="mt-2 text-white/60">Step 6: Check voltage drop</p>
                <p>16mm² mV/A/m = 2.8</p>
                <p>VD = (2.8 × 39.1 × 40) / 1000 = 4.4V</p>
                <p className="text-green-400">4.4V &lt; 11.5V limit - PASS</p>
                <p className="mt-2 text-green-400">FINAL SELECTION: 16mm² cable</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Voltage Drop Limiting Factor</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> 20A circuit, 80m cable run, no derating factors apply.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Current capacity check:</p>
                <p>It ≥ 20A → 2.5mm² (27A rating) sufficient</p>
                <p className="mt-2 text-white/60">Voltage drop check for 2.5mm²:</p>
                <p>VD = (18 × 20 × 80) / 1000 = 28.8V</p>
                <p className="text-red-400">28.8V &gt; 11.5V - FAILS</p>
                <p className="mt-2 text-white/60">Try 4mm²:</p>
                <p>VD = (11 × 20 × 80) / 1000 = 17.6V</p>
                <p className="text-red-400">17.6V &gt; 11.5V - FAILS</p>
                <p className="mt-2 text-white/60">Try 6mm²:</p>
                <p>VD = (7.3 × 20 × 80) / 1000 = 11.7V</p>
                <p className="text-red-400">11.7V &gt; 11.5V - FAILS (marginally)</p>
                <p className="mt-2 text-white/60">Try 10mm²:</p>
                <p>VD = (4.4 × 20 × 80) / 1000 = 7.0V</p>
                <p className="text-green-400">7.0V &lt; 11.5V - PASS</p>
                <p className="mt-2 text-green-400">SELECTION: 10mm² (4× larger than thermal requirement)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Three-Phase Motor Circuit</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> 15kW three-phase motor, FLC = 28A, 25m run, 45°C ambient.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Design current:</p>
                <p>Ib = 28A (motor FLC from nameplate)</p>
                <p>In = 32A (MCB selected)</p>
                <p className="mt-2 text-white/60">Correction factors:</p>
                <p>Ca = 0.79 (45°C, Table 4B1)</p>
                <p>Cg = 1.0 (single circuit)</p>
                <p className="mt-2 text-white/60">Minimum tabulated current:</p>
                <p>It ≥ 32 / 0.79 = 40.5A</p>
                <p className="mt-2 text-white/60">From Table 4D2A (4-core SWA):</p>
                <p className="text-green-400">6mm² = 41A - satisfactory</p>
                <p className="mt-2 text-white/60">Voltage drop (using 3-phase mV/A/m):</p>
                <p>VD = (6.4 × 28 × 25) / 1000 = 4.5V</p>
                <p className="text-green-400">4.5V &lt; 11.5V - PASS</p>
                <p className="mt-2 text-white/60">Starting voltage drop (6× FLC):</p>
                <p>VD start = (6.4 × 168 × 25) / 1000 = 26.9V</p>
                <p className="text-white/60">11.7% drop at starting - acceptable for DOL start</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Cable Sizing Procedure Summary</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Determine design current Ib from connected load</li>
                <li className="pl-1">Select protective device with In ≥ Ib</li>
                <li className="pl-1">Identify installation method (Reference Method)</li>
                <li className="pl-1">Determine all applicable correction factors</li>
                <li className="pl-1">Calculate minimum It = In / (Ca × Cg × Ci × Cc)</li>
                <li className="pl-1">Select cable from appropriate table where It(table) ≥ It(calculated)</li>
                <li className="pl-1">Verify voltage drop is within limits</li>
                <li className="pl-1">Check fault current withstand using adiabatic equation</li>
                <li className="pl-1">Select largest size from all three checks</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Voltage drop limit (final circuits): <strong>5% (11.5V at 230V)</strong></li>
                <li className="pl-1">Voltage drop limit (lighting): <strong>3% (6.9V at 230V)</strong></li>
                <li className="pl-1">k factor (copper/PVC): <strong>115</strong></li>
                <li className="pl-1">k factor (copper/XLPE): <strong>143</strong></li>
                <li className="pl-1">BS 3036 correction (Cc): <strong>0.725</strong></li>
                <li className="pl-1">Reference ambient temperature: <strong>30°C</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Using Ib instead of In</strong> for calculating minimum It</li>
                <li className="pl-1"><strong>Forgetting grouping factors</strong> when cables share containment</li>
                <li className="pl-1"><strong>Using wrong reference method</strong> for installation conditions</li>
                <li className="pl-1"><strong>Ignoring thermal insulation</strong> in modern buildings</li>
                <li className="pl-1"><strong>Not checking all three criteria</strong> before final selection</li>
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
                <p className="font-medium text-white mb-1">Key Formulae</p>
                <ul className="space-y-0.5 font-mono">
                  <li>It ≥ In / (Ca × Cg × Ci × Cc)</li>
                  <li>VD = (mV/A/m × Ib × L) / 1000</li>
                  <li>S = √(I²t) / k</li>
                  <li>Ib ≤ In ≤ Iz</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">BS 7671 Tables</p>
                <ul className="space-y-0.5">
                  <li>4B1/4B2 - Ambient temperature (Ca)</li>
                  <li>4C1-4C5 - Grouping factors (Cg)</li>
                  <li>52.2 - Thermal insulation (Ci)</li>
                  <li>4D1-4J4 - Current ratings (It)</li>
                  <li>43.1 - k factors for adiabatic</li>
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
            <Link to="../h-n-c-module7-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section1-4">
              Next: Protection Coordination
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule7Section1_3;
