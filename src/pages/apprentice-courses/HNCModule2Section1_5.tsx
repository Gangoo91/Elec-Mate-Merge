import { ArrowLeft, Thermometer, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Thermal Bridging - HNC Module 2 Section 1.5";
const DESCRIPTION = "Understand thermal bridging in building services: linear and point thermal bridges, psi and chi values, condensation risks, and mitigation strategies for building services junctions.";

const quickCheckQuestions = [
  {
    id: "psi-value-unit",
    question: "What is the SI unit for linear thermal transmittance (psi value)?",
    options: ["W/K", "W/m²K", "W/mK", "mK/W"],
    correctIndex: 2,
    explanation: "Linear thermal transmittance (ψ - psi) is measured in W/mK (Watts per metre Kelvin). It represents the additional heat loss per metre length of the thermal bridge per degree temperature difference."
  },
  {
    id: "chi-value-unit",
    question: "What is the SI unit for point thermal transmittance (chi value)?",
    options: ["W/K", "W/m²K", "W/mK", "mK/W"],
    correctIndex: 0,
    explanation: "Point thermal transmittance (χ - chi) is measured in W/K (Watts per Kelvin). It represents the additional heat loss at a single point per degree temperature difference."
  },
  {
    id: "condensation-risk",
    question: "At what relative humidity does surface condensation typically occur on cold surfaces?",
    options: ["50%", "70%", "80%", "100%"],
    correctIndex: 3,
    explanation: "Condensation occurs when the relative humidity at a surface reaches 100% (saturation). However, to avoid mould growth risk, surface relative humidity should be kept below 80%."
  },
  {
    id: "acd-purpose",
    question: "What is the primary purpose of Accredited Construction Details (ACDs)?",
    options: [
      "To increase building costs",
      "To provide standardised solutions that minimise thermal bridging",
      "To replace Building Regulations",
      "To specify electrical installation methods"
    ],
    correctIndex: 1,
    explanation: "ACDs provide pre-calculated, standardised construction details with known psi values. Using ACDs ensures compliance with Part L and reduces the need for bespoke thermal bridge calculations."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is a thermal bridge?",
    options: [
      "A heating system component",
      "An area of building fabric with higher thermal transmittance than surrounding elements",
      "A type of thermal insulation",
      "A ventilation duct"
    ],
    correctAnswer: 1,
    explanation: "A thermal bridge (or cold bridge) is an area of the building fabric that has significantly higher thermal transmittance than the surrounding materials, creating a localised pathway for heat loss."
  },
  {
    id: 2,
    question: "A window-to-wall junction has a psi value of 0.05 W/mK. If the total perimeter is 12m and ΔT is 20K, what is the heat loss through this junction?",
    options: ["0.6W", "6W", "12W", "60W"],
    correctAnswer: 2,
    explanation: "Heat loss = ψ × L × ΔT = 0.05 W/mK × 12m × 20K = 12W. This is the additional heat loss beyond what is calculated from the window and wall U-values alone."
  },
  {
    id: 3,
    question: "Which of the following is NOT a common location for linear thermal bridges?",
    options: [
      "Wall-to-floor junctions",
      "Window reveals",
      "Centre of a cavity wall",
      "Lintels above openings"
    ],
    correctAnswer: 2,
    explanation: "The centre of a properly constructed cavity wall is not typically a thermal bridge location. Thermal bridges occur at junctions, around openings, and where insulation continuity is broken."
  },
  {
    id: 4,
    question: "What does the temperature factor (fRsi) indicate?",
    options: [
      "The U-value of the building element",
      "The risk of surface condensation at a thermal bridge",
      "The air permeability of the junction",
      "The thermal mass of the wall"
    ],
    correctAnswer: 1,
    explanation: "The temperature factor (fRsi) indicates the ratio of temperature difference between the internal surface and outside air to the total temperature difference. Values below 0.75 indicate high condensation risk."
  },
  {
    id: 5,
    question: "A steel beam penetrating the thermal envelope has a chi value of 0.15 W/K. With an inside-outside temperature difference of 25K, what is the heat loss?",
    options: ["0.375W", "3.75W", "6W", "37.5W"],
    correctAnswer: 1,
    explanation: "Heat loss = χ × ΔT = 0.15 W/K × 25K = 3.75W. Point thermal bridges are calculated directly without considering length."
  },
  {
    id: 6,
    question: "What is the minimum temperature factor (fRsi) required to avoid mould growth risk in UK residential buildings?",
    options: ["0.65", "0.70", "0.75", "0.80"],
    correctAnswer: 2,
    explanation: "BRE IP 1/06 recommends a minimum fRsi of 0.75 to avoid mould growth risk. This corresponds to keeping the surface temperature above the dew point at normal internal conditions."
  },
  {
    id: 7,
    question: "Which building services element commonly creates point thermal bridges?",
    options: [
      "Skirting boards",
      "Wall fixings for cable trays penetrating insulation",
      "Surface-mounted conduit",
      "Ceiling roses"
    ],
    correctAnswer: 1,
    explanation: "Wall fixings, brackets, and supports that penetrate insulation create point thermal bridges. Each fixing provides a direct heat loss path through the thermal envelope."
  },
  {
    id: 8,
    question: "In SAP calculations, what y-value is used when Accredited Construction Details are adopted?",
    options: ["y = 0.05", "y = 0.08", "y = 0.10", "y = 0.15"],
    correctAnswer: 0,
    explanation: "When ACDs are fully adopted, a y-value of 0.05 W/m²K can be used. The default y-value without detailed assessment is 0.15 W/m²K, so ACDs provide significant benefit."
  },
  {
    id: 9,
    question: "What is the primary cause of condensation at thermal bridges?",
    options: [
      "High air movement",
      "Reduced surface temperature below dew point",
      "Excessive heating",
      "Low internal humidity"
    ],
    correctAnswer: 1,
    explanation: "At thermal bridges, the internal surface temperature drops because heat escapes more rapidly. When this temperature falls below the dew point of the internal air, water vapour condenses on the surface."
  },
  {
    id: 10,
    question: "Which mitigation strategy is most effective for cable tray penetrations through external walls?",
    options: [
      "Using larger cables to increase heat dissipation",
      "Installing thermal break sleeves and sealing around penetrations",
      "Leaving gaps for ventilation",
      "Using metal conduit instead of tray"
    ],
    correctAnswer: 1,
    explanation: "Thermal break sleeves (such as neoprene or EPDM) combined with proper sealing minimise both heat loss and air leakage at service penetrations. This maintains the thermal envelope integrity."
  }
];

const faqs = [
  {
    question: "How do thermal bridges affect building energy performance?",
    answer: "Thermal bridges can account for 20-30% of total fabric heat loss in well-insulated buildings. As U-values improve, the relative impact of thermal bridging increases. This heat loss must be compensated by the heating system, increasing energy consumption and carbon emissions. Part L requires thermal bridging to be accounted for in calculations."
  },
  {
    question: "What is the difference between repeating and non-repeating thermal bridges?",
    answer: "Repeating thermal bridges occur regularly throughout an element (like mortar joints or wall ties) and are included in U-value calculations. Non-repeating thermal bridges occur at specific locations (junctions, around openings) and must be calculated separately using psi and chi values. Building Regulations focus primarily on non-repeating bridges."
  },
  {
    question: "How do I identify potential thermal bridges in building services installations?",
    answer: "Look for any service that penetrates or is fixed to the thermal envelope: external cable entries, flue penetrations, duct connections, fixings for external equipment, and support brackets. Any continuous metal element (like a cable tray) that crosses the insulation layer creates a thermal bridge. Consider using thermal imaging during design reviews."
  },
  {
    question: "What are the consequences of ignoring thermal bridging in design?",
    answer: "Beyond increased heat loss, thermal bridges cause localised cold spots that lead to surface condensation. This promotes mould growth, affecting indoor air quality and occupant health. Persistent dampness can cause staining, material degradation, and structural damage. Addressing thermal bridges post-construction is far more expensive than designing them out initially."
  },
  {
    question: "How do Part L 2021 and Part O interact regarding thermal bridging?",
    answer: "Part L requires minimising thermal bridges to reduce heat loss and carbon emissions. Part O addresses overheating risk. Well-detailed thermal bridges (with good fRsi values) help maintain consistent internal surface temperatures, reducing cold spots in winter without significantly affecting summer overheating risk. Both regulations benefit from continuous insulation strategies."
  },
  {
    question: "Can thermal imaging detect thermal bridges?",
    answer: "Yes, infrared thermography is excellent for identifying thermal bridges in existing buildings. During heating season, thermal bridges appear as warm patches on external surfaces or cold spots internally. Building services engineers often use thermal imaging during commissioning to verify that service penetrations have been properly sealed and insulated."
  }
];

const HNCModule2Section1_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2-section1">
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
            <Thermometer className="h-4 w-4" />
            <span>Module 2.1.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Thermal Bridging
          </h1>
          <p className="text-white/80">
            Understanding heat loss pathways at building fabric junctions and service penetrations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Linear bridges (ψ):</strong> Heat loss per metre length (W/mK)</li>
              <li className="pl-1"><strong>Point bridges (χ):</strong> Heat loss at single points (W/K)</li>
              <li className="pl-1"><strong>Condensation risk:</strong> Cold surfaces below dew point</li>
              <li className="pl-1"><strong>ACDs:</strong> Pre-approved details minimising bridging</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Service penetrations:</strong> Cables, ducts, pipes through walls</li>
              <li className="pl-1"><strong>Fixings:</strong> Cable trays, equipment supports</li>
              <li className="pl-1"><strong>Part L compliance:</strong> Thermal bridge calculations</li>
              <li className="pl-1"><strong>Mitigation:</strong> Thermal breaks and sealing details</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define linear thermal bridges and calculate heat loss using psi values",
              "Define point thermal bridges and calculate heat loss using chi values",
              "Identify common thermal bridge locations in building construction",
              "Assess condensation risk using temperature factor (fRsi)",
              "Apply Accredited Construction Details to minimise thermal bridging",
              "Design building services junctions to reduce thermal bridge effects"
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

        {/* Section 1: Linear Thermal Bridges */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Linear Thermal Bridges (Psi Values)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Linear thermal bridges occur where two building elements meet, creating a continuous line
              of increased heat loss along the junction. The additional heat flow is quantified by the
              linear thermal transmittance, or psi (ψ) value.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key facts about psi values:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Symbol: ψ (Greek letter psi)</li>
                <li className="pl-1">Unit: W/mK (Watts per metre Kelvin)</li>
                <li className="pl-1">Represents heat loss per metre length of junction</li>
                <li className="pl-1">Lower values indicate better thermal performance</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Heat Loss Calculation</p>
              <p className="font-mono text-center text-lg mb-2">Q = ψ × L × ΔT</p>
              <p className="text-xs text-white/70 text-center">Where Q = heat loss (W), L = length (m), ΔT = temperature difference (K)</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Psi Values for Common Junctions</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Junction Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Poor Detail (W/mK)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">ACD Detail (W/mK)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">External wall to ground floor</td>
                      <td className="border border-white/10 px-3 py-2">0.16</td>
                      <td className="border border-white/10 px-3 py-2">0.04</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">External wall to roof (eaves)</td>
                      <td className="border border-white/10 px-3 py-2">0.12</td>
                      <td className="border border-white/10 px-3 py-2">0.04</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Window reveal (jamb)</td>
                      <td className="border border-white/10 px-3 py-2">0.08</td>
                      <td className="border border-white/10 px-3 py-2">0.02</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Window sill</td>
                      <td className="border border-white/10 px-3 py-2">0.10</td>
                      <td className="border border-white/10 px-3 py-2">0.03</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Steel lintel (uninsulated)</td>
                      <td className="border border-white/10 px-3 py-2">0.30</td>
                      <td className="border border-white/10 px-3 py-2">0.05</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Corner (external)</td>
                      <td className="border border-white/10 px-3 py-2">0.09</td>
                      <td className="border border-white/10 px-3 py-2">0.02</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The difference between poor and good detailing can reduce junction heat loss by 70-85%. This emphasises the importance of careful design and specification.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Point Thermal Bridges */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Point Thermal Bridges (Chi Values)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Point thermal bridges occur at discrete locations where a single element penetrates
              or disrupts the insulation layer. Common examples include fixings, brackets, and
              service penetrations through the thermal envelope.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key facts about chi values:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Symbol: χ (Greek letter chi)</li>
                <li className="pl-1">Unit: W/K (Watts per Kelvin)</li>
                <li className="pl-1">Represents heat loss at a single point location</li>
                <li className="pl-1">Often overlooked but can be significant in aggregate</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Heat Loss Calculation</p>
              <p className="font-mono text-center text-lg mb-2">Q = χ × ΔT</p>
              <p className="text-xs text-white/70 text-center">Where Q = heat loss (W), χ = point thermal transmittance (W/K), ΔT = temperature difference (K)</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Point Bridges</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Steel wall ties in cavity walls</li>
                  <li className="pl-1">Cladding support brackets</li>
                  <li className="pl-1">Balcony connections</li>
                  <li className="pl-1">Structural steel penetrations</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Services Point Bridges</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Cable tray and trunking fixings</li>
                  <li className="pl-1">Service entry sleeves</li>
                  <li className="pl-1">External lighting brackets</li>
                  <li className="pl-1">Flue and duct penetrations</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Chi Values</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Point Bridge Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">χ value (W/K)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Stainless steel wall tie</td>
                      <td className="border border-white/10 px-3 py-2">0.002 - 0.004</td>
                      <td className="border border-white/10 px-3 py-2">Per tie, typically 2.5/m²</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Steel fixing bracket (100mm²)</td>
                      <td className="border border-white/10 px-3 py-2">0.05 - 0.10</td>
                      <td className="border border-white/10 px-3 py-2">Through 100mm insulation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cable entry (unsealed)</td>
                      <td className="border border-white/10 px-3 py-2">0.10 - 0.20</td>
                      <td className="border border-white/10 px-3 py-2">Includes air leakage effect</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cable entry (sealed with thermal break)</td>
                      <td className="border border-white/10 px-3 py-2">0.02 - 0.05</td>
                      <td className="border border-white/10 px-3 py-2">Proper detailing critical</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Structural steel beam penetration</td>
                      <td className="border border-white/10 px-3 py-2">0.15 - 0.50</td>
                      <td className="border border-white/10 px-3 py-2">Depends on beam size</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Aggregate effect:</strong> A building with 50 unsealed service penetrations at χ = 0.15 W/K each, with ΔT = 20K, loses 150W - equivalent to leaving a desktop heater on permanently.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Common Bridge Locations and Condensation Risk */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Common Bridge Locations and Condensation Risk
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Thermal bridges create localised cold spots on internal surfaces. When the surface
              temperature falls below the dew point of the internal air, condensation forms. This
              moisture promotes mould growth and can cause material degradation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">High-Risk Thermal Bridge Locations</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white text-sm mb-2">Junctions</p>
                  <ul className="text-xs text-white/90 space-y-1 list-disc list-outside ml-4">
                    <li>Wall-to-floor junctions</li>
                    <li>Wall-to-roof junctions</li>
                    <li>External corners</li>
                    <li>Internal corners (party walls)</li>
                    <li>Intermediate floor edges</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white text-sm mb-2">Around Openings</p>
                  <ul className="text-xs text-white/90 space-y-1 list-disc list-outside ml-4">
                    <li>Window reveals (jambs, sills, heads)</li>
                    <li>Door thresholds</li>
                    <li>Lintels (especially uninsulated steel)</li>
                    <li>Meter boxes and service entries</li>
                    <li>Ventilation openings</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Temperature Factor (fRsi)</p>
              <p className="font-mono text-center text-lg mb-2">f<sub>Rsi</sub> = (T<sub>si</sub> - T<sub>e</sub>) / (T<sub>i</sub> - T<sub>e</sub>)</p>
              <div className="text-xs text-white/70 text-center space-y-1">
                <p>Where T<sub>si</sub> = internal surface temperature, T<sub>i</sub> = internal air temperature, T<sub>e</sub> = external temperature</p>
                <p className="mt-2"><strong>Minimum fRsi = 0.75</strong> required to avoid mould growth (BRE IP 1/06)</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Condensation Risk Assessment</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Surface condensation:</strong> Occurs when surface RH reaches 100%</li>
                <li className="pl-1"><strong>Mould growth threshold:</strong> Surface RH above 80% sustained</li>
                <li className="pl-1"><strong>Internal conditions assumed:</strong> 20°C, 50% RH (gives dew point ~9°C)</li>
                <li className="pl-1"><strong>External design condition:</strong> 0°C for UK calculations</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Surface Temperature vs Condensation Risk</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">fRsi Value</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Surface Temp (Ti=20°C, Te=0°C)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Risk Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0.90+</td>
                      <td className="border border-white/10 px-3 py-2">18°C+</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">Low risk</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0.75-0.90</td>
                      <td className="border border-white/10 px-3 py-2">15-18°C</td>
                      <td className="border border-white/10 px-3 py-2 text-yellow-400">Acceptable</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0.65-0.75</td>
                      <td className="border border-white/10 px-3 py-2">13-15°C</td>
                      <td className="border border-white/10 px-3 py-2 text-orange-400">Mould risk</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">&lt;0.65</td>
                      <td className="border border-white/10 px-3 py-2">&lt;13°C</td>
                      <td className="border border-white/10 px-3 py-2 text-red-400">Condensation likely</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Critical insight:</strong> At a thermal bridge with fRsi of 0.65 and standard conditions (20°C inside, 0°C outside), the surface reaches 13°C. With internal air at 50% RH, dew point is ~9°C - no condensation. But raise humidity to 70% (common in kitchens/bathrooms) and dew point rises to ~14°C, causing condensation.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Accredited Construction Details and Mitigation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Accredited Construction Details and Mitigation Strategies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Accredited Construction Details (ACDs) are pre-calculated junction details that meet
              specific performance criteria. Using ACDs simplifies compliance with Part L and ensures
              thermal bridging is properly addressed without bespoke calculations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Understanding Y-Values in SAP</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Approach</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Y-value (W/m²K)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Requirements</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Default (no assessment)</td>
                      <td className="border border-white/10 px-3 py-2">0.15</td>
                      <td className="border border-white/10 px-3 py-2">No evidence required</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">ACDs fully adopted</td>
                      <td className="border border-white/10 px-3 py-2">0.05</td>
                      <td className="border border-white/10 px-3 py-2">All junctions match ACD specifications</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Calculated (bespoke)</td>
                      <td className="border border-white/10 px-3 py-2">Varies</td>
                      <td className="border border-white/10 px-3 py-2">Thermal modelling of all junctions</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/60 mt-2">Y-value multiplied by total envelope area gives additional heat loss from thermal bridges</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Services Junction Mitigation Strategies</p>
              <div className="space-y-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white text-sm mb-2">Cable and Conduit Penetrations</p>
                  <ul className="text-xs text-white/90 space-y-1 list-disc list-outside ml-4">
                    <li>Use thermal break sleeves (neoprene, EPDM) around cables</li>
                    <li>Seal penetrations with expanding foam and intumescent mastic</li>
                    <li>Position entries away from corners and junctions</li>
                    <li>Consolidate multiple cables through single, well-detailed penetration</li>
                    <li>Consider wireless alternatives for sensors where practical</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white text-sm mb-2">Cable Tray and Trunking Supports</p>
                  <ul className="text-xs text-white/90 space-y-1 list-disc list-outside ml-4">
                    <li>Use thermally broken brackets where fixing through insulation</li>
                    <li>Fix to internal structure where possible, avoiding thermal envelope</li>
                    <li>Specify GRP or composite brackets instead of steel</li>
                    <li>Minimise number of penetrations through careful routing</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white text-sm mb-2">Ductwork and Ventilation</p>
                  <ul className="text-xs text-white/90 space-y-1 list-disc list-outside ml-4">
                    <li>Insulate ducts continuously through the thermal envelope</li>
                    <li>Use proprietary insulated duct sleeves at wall penetrations</li>
                    <li>Ensure vapour barriers are continuous and sealed</li>
                    <li>Detail MVHR and MEV terminals with thermal breaks</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white text-sm mb-2">External Equipment Mounting</p>
                  <ul className="text-xs text-white/90 space-y-1 list-disc list-outside ml-4">
                    <li>Use stand-off brackets with thermal breaks for AC units</li>
                    <li>Mount solar PV and thermal systems on thermally isolated rails</li>
                    <li>Detail EV charger and external socket installations carefully</li>
                    <li>Specify insulated flue systems for boilers and biomass</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Mitigation Principles</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Continuity:</strong> Maintain insulation layer continuity wherever possible</li>
                <li className="pl-1"><strong>Thermal breaks:</strong> Use low-conductivity materials where continuity is impossible</li>
                <li className="pl-1"><strong>Air sealing:</strong> Seal all penetrations to prevent convective heat loss</li>
                <li className="pl-1"><strong>Coordination:</strong> Early coordination between architects and services engineers</li>
                <li className="pl-1"><strong>Documentation:</strong> Record all non-standard details for compliance evidence</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Design coordination:</strong> Thermal bridging mitigation must be considered during early design stages. Retrofitting solutions is far more expensive and often less effective than designing details correctly from the outset.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Linear Thermal Bridge Heat Loss</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A building has 48m of wall-to-floor junction with ψ = 0.08 W/mK. Calculate the annual heat loss if the average indoor-outdoor temperature difference is 12K and the heating season is 5,400 hours.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Heat loss rate: Q = ψ × L × ΔT</p>
                <p>Q = 0.08 W/mK × 48m × 12K = <strong>46.1W</strong></p>
                <p className="mt-2">Annual energy loss:</p>
                <p>E = Q × hours = 46.1W × 5,400h = 249,000 Wh</p>
                <p>E = <strong>249 kWh/year</strong></p>
                <p className="mt-2 text-white/60">→ At £0.28/kWh = £70/year for this single junction</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Point Thermal Bridge Assessment</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A commercial building has 120 cable tray brackets penetrating the external wall insulation. Each bracket has χ = 0.06 W/K. Calculate the total additional heat loss at design conditions (ΔT = 25K).
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Total chi value: χ<sub>total</sub> = n × χ</p>
                <p>χ<sub>total</sub> = 120 × 0.06 = 7.2 W/K</p>
                <p className="mt-2">Heat loss at design:</p>
                <p>Q = χ<sub>total</sub> × ΔT = 7.2 × 25 = <strong>180W</strong></p>
                <p className="mt-2 text-white/60">→ Equivalent to a small fan heater running continuously</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Condensation Risk Check</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A window reveal has fRsi = 0.72. With internal conditions of 21°C and 60% RH, and external temperature of -2°C, will condensation occur?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Surface temperature: T<sub>si</sub> = T<sub>e</sub> + f<sub>Rsi</sub> × (T<sub>i</sub> - T<sub>e</sub>)</p>
                <p>T<sub>si</sub> = -2 + 0.72 × (21 - (-2))</p>
                <p>T<sub>si</sub> = -2 + 0.72 × 23 = -2 + 16.6 = <strong>14.6°C</strong></p>
                <p className="mt-2">Dew point at 21°C, 60% RH ≈ <strong>12.9°C</strong></p>
                <p className="mt-2 text-green-400">✓ Surface (14.6°C) is above dew point (12.9°C)</p>
                <p className="text-yellow-400">⚠ But close to threshold - mould risk if RH increases</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 4: Y-Value Impact on Heat Loss</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A dwelling has 450m² total envelope area. Compare annual thermal bridge heat loss using default y-value (0.15) vs ACDs (0.05). Assume average ΔT = 12K, 5,400 heating hours.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Default detail:</p>
                <p>Q = y × A × ΔT = 0.15 × 450 × 12 = 810W</p>
                <p>E = 810 × 5400 = 4,374 kWh/year</p>
                <p className="mt-2 text-white/60">With ACDs:</p>
                <p>Q = y × A × ΔT = 0.05 × 450 × 12 = 270W</p>
                <p>E = 270 × 5400 = 1,458 kWh/year</p>
                <p className="mt-2 text-green-400"><strong>Saving: 2,916 kWh/year (£816/year at £0.28/kWh)</strong></p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Formulas</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Q = ψ × L × ΔT</strong> — Linear thermal bridge heat loss</li>
                <li className="pl-1"><strong>Q = χ × ΔT</strong> — Point thermal bridge heat loss</li>
                <li className="pl-1"><strong>fRsi = (Tsi - Te) / (Ti - Te)</strong> — Temperature factor</li>
                <li className="pl-1"><strong>HTB = Σ(ψ × L) + Σχ</strong> — Total thermal bridge coefficient</li>
                <li className="pl-1"><strong>Additional loss = y × A × ΔT</strong> — Y-value method</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Minimum fRsi: <strong>0.75</strong> (to avoid mould)</li>
                <li className="pl-1">Default y-value: <strong>0.15 W/m²K</strong></li>
                <li className="pl-1">ACD y-value: <strong>0.05 W/m²K</strong></li>
                <li className="pl-1">Mould threshold: surface RH &gt; <strong>80%</strong></li>
                <li className="pl-1">Design internal conditions: <strong>20°C, 50% RH</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Ignoring point bridges</strong> — Many small bridges add up significantly</li>
                <li className="pl-1"><strong>Late coordination</strong> — Services routes designed without thermal consideration</li>
                <li className="pl-1"><strong>Unsealed penetrations</strong> — Air leakage compounds conductive losses</li>
                <li className="pl-1"><strong>Wrong units</strong> — Confusing W/mK (linear) with W/K (point)</li>
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
                <p className="font-medium text-white mb-1">Thermal Bridge Types</p>
                <ul className="space-y-0.5">
                  <li>Linear (ψ) - W/mK - Junctions</li>
                  <li>Point (χ) - W/K - Penetrations</li>
                  <li>Repeating - Included in U-value</li>
                  <li>Non-repeating - Separate calculation</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Compliance Requirements</p>
                <ul className="space-y-0.5">
                  <li>Part L: Minimise thermal bridging</li>
                  <li>SAP: y-value × envelope area</li>
                  <li>fRsi ≥ 0.75 to prevent mould</li>
                  <li>ACDs: Pre-approved details</li>
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
            <Link to="../h-n-c-module2-section1-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2-section1-6">
              Next: Air Tightness
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule2Section1_5;
