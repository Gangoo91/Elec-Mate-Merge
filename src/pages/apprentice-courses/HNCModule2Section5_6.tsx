import { ArrowLeft, Droplets, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Building Fabric Performance - HNC Module 2 Section 5.6";
const DESCRIPTION = "Understanding condensation analysis, interstitial condensation, moisture movement, and compliance with Building Regulations Part L and Part O.";

const quickCheckQuestions = [
  {
    id: "dew-point",
    question: "At what condition does condensation occur on a surface?",
    options: [
      "When air temperature reaches 0°C",
      "When surface temperature falls below air dew point",
      "When relative humidity reaches 50%",
      "When air pressure drops"
    ],
    correctIndex: 1,
    explanation: "Condensation occurs when a surface temperature drops below the dew point of the adjacent air. At the dew point, the air is saturated (100% RH) and water vapour condenses into liquid."
  },
  {
    id: "interstitial-location",
    question: "Where does interstitial condensation typically occur in a wall?",
    options: [
      "On the warm internal surface",
      "At the outer edge of insulation or cold side",
      "In the centre of dense materials",
      "Only on glazing surfaces"
    ],
    correctIndex: 1,
    explanation: "Interstitial condensation occurs within the construction, typically where temperature drops below dew point - usually at the cold side of insulation or where vapour resistance is low."
  },
  {
    id: "vapour-barrier",
    question: "Where should a vapour control layer (VCL) be positioned in a wall?",
    options: [
      "On the cold (external) side of insulation",
      "On the warm (internal) side of insulation",
      "In the middle of the wall",
      "Position doesn't matter"
    ],
    correctIndex: 1,
    explanation: "VCL should be on the warm side to prevent moisture-laden internal air penetrating the insulation before reaching its dew point. Placing it on the cold side would trap moisture."
  },
  {
    id: "part-l-u-value",
    question: "What is the Part L 2021 maximum U-value for external walls in new dwellings?",
    options: [
      "0.35 W/m²K",
      "0.26 W/m²K",
      "0.18 W/m²K",
      "0.15 W/m²K"
    ],
    correctIndex: 2,
    explanation: "Part L 2021 limits external wall U-value to 0.18 W/m²K for new dwellings. This is more stringent than previous versions (0.30 W/m²K). Notional building uses 0.18 W/m²K."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is dew point temperature?",
    options: [
      "The temperature at which water boils",
      "The temperature at which air becomes saturated with moisture",
      "The temperature at which ice forms",
      "The average daily temperature"
    ],
    correctAnswer: 1,
    explanation: "Dew point is the temperature at which air becomes saturated (100% RH) and water vapour begins to condense. It depends on the absolute moisture content of the air."
  },
  {
    id: 2,
    question: "What is the approximate vapour resistivity of plasterboard?",
    options: [
      "5 MN.s/g.m",
      "45-60 MN.s/g.m",
      "100-200 MN.s/g.m",
      "1500 MN.s/g.m"
    ],
    correctAnswer: 1,
    explanation: "Plasterboard has relatively low vapour resistivity (45-60 MN.s/g.m). By comparison, polythene VCL is 1500+ MN.s/g.m, and mineral wool is only 5 MN.s/g.m."
  },
  {
    id: 3,
    question: "Which assessment method is used for interstitial condensation risk?",
    options: [
      "SAP calculation",
      "Glaser method (BS EN ISO 13788)",
      "TM52 overheating assessment",
      "CIBSE admittance method"
    ],
    correctAnswer: 1,
    explanation: "The Glaser method (Dewpoint method) in BS EN ISO 13788 analyses temperature and vapour pressure profiles through construction to identify condensation risk. More sophisticated methods include dynamic simulation."
  },
  {
    id: 4,
    question: "What causes 'thermal bridging' in building construction?",
    options: [
      "Good insulation continuity",
      "Gaps in the vapour barrier",
      "Areas of higher thermal conductivity creating heat flow paths",
      "Excessive ventilation"
    ],
    correctAnswer: 2,
    explanation: "Thermal bridges are areas where insulation is reduced or bypassed (steel lintels, window frames, junctions), creating localised paths of higher heat flow and cold internal surfaces."
  },
  {
    id: 5,
    question: "What is the 'temperature factor' (fRsi) used for?",
    options: [
      "Calculating U-value",
      "Assessing mould growth risk at thermal bridges",
      "Measuring air permeability",
      "Determining heating system size"
    ],
    correctAnswer: 1,
    explanation: "Temperature factor fRsi = (Tsi - Te)/(Ti - Te) measures how well a surface maintains temperature. fRsi > 0.75 (dwellings) indicates low mould risk at thermal bridges."
  },
  {
    id: 6,
    question: "What Part L 2021 limiting U-value applies to new flat roofs?",
    options: [
      "0.25 W/m²K",
      "0.18 W/m²K",
      "0.15 W/m²K",
      "0.11 W/m²K"
    ],
    correctAnswer: 3,
    explanation: "Part L 2021 limits flat roof U-value to 0.11 W/m²K for new dwellings. Pitched roofs with insulation between and over rafters also have 0.11 W/m²K limit."
  },
  {
    id: 7,
    question: "Why might excessive insulation cause summer overheating?",
    options: [
      "Insulation generates heat",
      "Heat gains cannot escape, temperatures rise",
      "Insulation reduces ventilation",
      "It has no effect on summer conditions"
    ],
    correctAnswer: 1,
    explanation: "High insulation reduces heat loss in winter but also reduces ability to lose internal gains in summer. Combined with solar gains and low thermal mass, this can cause overheating."
  },
  {
    id: 8,
    question: "What is the purpose of a 'breather membrane' in a wall?",
    options: [
      "Provides primary waterproofing",
      "Allows vapour to escape outward while preventing water ingress",
      "Acts as a vapour barrier",
      "Improves thermal insulation"
    ],
    correctAnswer: 1,
    explanation: "Breather membranes (vapour permeable but water resistant) on the cold side of insulation allow construction to dry outward while protecting against rain penetration. Essential for vapour-open wall build-ups."
  },
  {
    id: 9,
    question: "Which Building Regulations Part specifically addresses overheating in new homes?",
    options: [
      "Part L (Conservation of fuel and power)",
      "Part F (Ventilation)",
      "Part O (Overheating)",
      "Part C (Site preparation)"
    ],
    correctAnswer: 2,
    explanation: "Part O (Overheating), introduced in 2021, specifically requires new residential buildings to demonstrate overheating risk is acceptable, using either simplified or dynamic assessment methods."
  },
  {
    id: 10,
    question: "What is the primary concern with moisture in insulation materials?",
    options: [
      "Aesthetics only",
      "Reduced thermal performance and potential structural damage",
      "Increased fire risk only",
      "No significant concerns"
    ],
    correctAnswer: 1,
    explanation: "Moisture in insulation dramatically reduces thermal performance (water conducts heat 25× better than air), can cause decay of organic materials, corrosion of metals, and structural degradation."
  },
  {
    id: 11,
    question: "What is meant by 'accredited construction details'?",
    options: [
      "Drawings approved by the architect",
      "Pre-approved junction details that demonstrate thermal bridge compliance",
      "Details listed in Building Regulations",
      "Construction drawings signed by BCO"
    ],
    correctAnswer: 1,
    explanation: "Accredited construction details are pre-calculated junction details with known psi-values (thermal bridge losses). Using these simplifies Part L compliance by avoiding bespoke thermal bridge calculations."
  },
  {
    id: 12,
    question: "For Part L 2021 dwellings, what is the default value for thermal bridging (y-value)?",
    options: [
      "0.05 W/m²K",
      "0.08 W/m²K",
      "0.15 W/m²K",
      "0.25 W/m²K"
    ],
    correctAnswer: 2,
    explanation: "The Part L default y-value is 0.15 W/m²K (added to elemental U-values). Using accredited details or thermal bridge calculations can achieve better values (0.05-0.08 typical with good details)."
  }
];

const faqs = [
  {
    question: "How do I assess condensation risk in a proposed wall construction?",
    answer: "Use the Glaser method (BS EN ISO 13788): calculate temperature profile through wall using U-values and thermal resistances, then plot vapour pressure profile using vapour resistances. Where vapour pressure exceeds saturation pressure at any point, condensation occurs. Software tools like WUFI provide more accurate dynamic analysis."
  },
  {
    question: "When is a vapour control layer essential?",
    answer: "VCL is essential when: insulation is on the cold side of structure (internal insulation), construction has low vapour resistance on cold side, high internal humidity (swimming pools, commercial kitchens), or Glaser analysis shows condensation risk. Modern 'intelligent' membranes adjust resistance seasonally."
  },
  {
    question: "What causes mould growth on walls and ceilings?",
    answer: "Mould requires surface relative humidity above ~80% sustained over time. This occurs at thermal bridges (cold spots), corners with poor air circulation, behind furniture against cold walls, or in poorly ventilated bathrooms/kitchens. Solutions include improving insulation, adding ventilation, and heating appropriately."
  },
  {
    question: "How do Part L and Part O requirements interact?",
    answer: "Part L drives insulation, airtightness and lower heating demand. Part O ensures this doesn't cause summer overheating. Tension exists: large south-facing windows help passive solar gain (Part L) but increase overheating risk (Part O). Design must balance both - often requiring external shading or reduced glazing."
  },
  {
    question: "What is the difference between U-value and R-value?",
    answer: "U-value (W/m²K) is thermal transmittance - rate of heat flow per degree difference. Lower is better. R-value (m²K/W) is thermal resistance - the inverse. Higher is better. R = 1/U for an element. U-values are standard in UK/EU; R-values common in USA/Australia."
  },
  {
    question: "How do thermal bridges affect condensation risk?",
    answer: "Thermal bridges create localised cold internal surfaces where temperature may drop below dew point, causing surface condensation and mould. The temperature factor fRsi must exceed 0.75 (dwellings) or 0.80 (swimming pools) to avoid sustained high surface humidity."
  }
];

const HNCModule2Section5_6 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2-section5">
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
            <Droplets className="h-4 w-4" />
            <span>Module 2.5.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Building Fabric Performance
          </h1>
          <p className="text-white/80">
            Condensation analysis, moisture control, and regulatory compliance for building envelopes
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Surface condensation:</strong> Cold surfaces below dew point</li>
              <li className="pl-1"><strong>Interstitial:</strong> Condensation within construction</li>
              <li className="pl-1"><strong>VCL:</strong> Vapour barrier on warm side of insulation</li>
              <li className="pl-1"><strong>Thermal bridges:</strong> Weak points in insulation continuity</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Part L:</strong> U-values, airtightness, thermal bridging</li>
              <li className="pl-1"><strong>Part O:</strong> Overheating mitigation in dwellings</li>
              <li className="pl-1"><strong>Part F:</strong> Ventilation to control moisture</li>
              <li className="pl-1"><strong>Part C:</strong> Moisture protection</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand dew point and condensation mechanisms",
              "Apply Glaser method for interstitial condensation analysis",
              "Position vapour control layers correctly in constructions",
              "Calculate U-values and identify thermal bridges",
              "Apply Part L 2021 fabric requirements",
              "Balance Part L and Part O requirements for compliant design"
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

        {/* Section 1: Condensation Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Condensation Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Condensation occurs when moist air contacts a surface at or below its dew point temperature.
              Understanding the relationship between temperature, moisture content, and relative humidity
              is essential for preventing condensation problems in buildings.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key moisture concepts:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Dew point:</strong> Temperature at which air becomes saturated (100% RH)</li>
                <li className="pl-1"><strong>Vapour pressure:</strong> Partial pressure of water vapour in air (Pa)</li>
                <li className="pl-1"><strong>Saturation pressure:</strong> Maximum vapour pressure at given temperature</li>
                <li className="pl-1"><strong>Relative humidity:</strong> Actual vapour pressure / saturation pressure × 100%</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Types of Condensation</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Location</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Causes</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Prevention</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Surface</td>
                      <td className="border border-white/10 px-3 py-2">Internal surfaces</td>
                      <td className="border border-white/10 px-3 py-2">Cold surfaces, high humidity</td>
                      <td className="border border-white/10 px-3 py-2">Insulation, ventilation, heating</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Interstitial</td>
                      <td className="border border-white/10 px-3 py-2">Within construction</td>
                      <td className="border border-white/10 px-3 py-2">Vapour reaching cold zone</td>
                      <td className="border border-white/10 px-3 py-2">VCL on warm side</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Reverse</td>
                      <td className="border border-white/10 px-3 py-2">Cold side of VCL</td>
                      <td className="border border-white/10 px-3 py-2">Summer drying inward</td>
                      <td className="border border-white/10 px-3 py-2">Variable permeability membranes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Internal Conditions</p>
              <p className="text-sm text-white">
                Occupied buildings typically have: Temperature 20-22°C, RH 40-60% (higher in kitchens/bathrooms).
                At 20°C and 50% RH, dew point is approximately 9°C. Any surface below 9°C will experience condensation.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Mould risk:</strong> Mould can grow at sustained RH above 80% at the surface (not 100%). Cold spots at thermal bridges often reach this level before visible condensation occurs.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Interstitial Condensation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Interstitial Condensation Analysis
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Interstitial condensation occurs within the building fabric, invisible until damage becomes apparent.
              The Glaser method (BS EN ISO 13788) analyses temperature and vapour pressure profiles to identify
              condensation planes within constructions.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Glaser method principles:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Temperature profile:</strong> Calculated from layer resistances and boundary conditions</li>
                <li className="pl-1"><strong>Saturation pressure:</strong> Calculated from temperature at each layer interface</li>
                <li className="pl-1"><strong>Vapour pressure:</strong> Calculated from layer vapour resistances</li>
                <li className="pl-1"><strong>Condensation:</strong> Occurs where actual vapour pressure exceeds saturation</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Vapour Resistance of Common Materials</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Material</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Vapour Resistivity (MN.s/g.m)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Resistance (MN.s/g)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Mineral wool</td>
                      <td className="border border-white/10 px-3 py-2">5</td>
                      <td className="border border-white/10 px-3 py-2">0.5 (100mm)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Plasterboard (12.5mm)</td>
                      <td className="border border-white/10 px-3 py-2">45-60</td>
                      <td className="border border-white/10 px-3 py-2">0.6-0.8</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Brick (102.5mm)</td>
                      <td className="border border-white/10 px-3 py-2">25-100</td>
                      <td className="border border-white/10 px-3 py-2">2.5-10</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">OSB (11mm)</td>
                      <td className="border border-white/10 px-3 py-2">~100</td>
                      <td className="border border-white/10 px-3 py-2">~1.1</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Polythene VCL (500 gauge)</td>
                      <td className="border border-white/10 px-3 py-2">~1500</td>
                      <td className="border border-white/10 px-3 py-2">100-250</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Foil-faced insulation</td>
                      <td className="border border-white/10 px-3 py-2">Very high</td>
                      <td className="border border-white/10 px-3 py-2">200+</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">VCL Position Rule</p>
              <p className="text-sm text-white">
                <strong>The '5:1 rule':</strong> Vapour resistance on warm side should be at least 5× that on cold side
                to minimise interstitial condensation risk. This ensures most moisture vapour is blocked before
                reaching the dew point zone within the construction.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical note:</strong> Some condensation may be acceptable if it evaporates during warmer periods.
              BS EN ISO 13788 checks annual accumulation - temporary condensation in winter may dry in summer.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Thermal Bridges */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Thermal Bridges and Moisture Risk
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Thermal bridges are localised areas where heat flow is increased compared to the general
              construction. They cause cold internal surfaces, condensation/mould risk, and additional
              heat loss that must be accounted for in Part L calculations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common thermal bridge locations:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Junctions:</strong> Wall-floor, wall-roof, wall-wall corners</li>
                <li className="pl-1"><strong>Openings:</strong> Window/door reveals, lintels, cills</li>
                <li className="pl-1"><strong>Penetrations:</strong> Structural elements, services, fixings</li>
                <li className="pl-1"><strong>Geometry:</strong> External corners, balcony connections</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Temperature Factor (fRsi)</p>
              <p className="font-mono text-center text-sm mb-2">f<sub>Rsi</sub> = (T<sub>si</sub> - T<sub>e</sub>) / (T<sub>i</sub> - T<sub>e</sub>)</p>
              <p className="text-xs text-white/70 text-center">Where Tsi = internal surface temp, Ti = internal air, Te = external air</p>
              <p className="text-xs text-white/70 text-center mt-2">Required: fRsi ≥ 0.75 (dwellings), ≥ 0.80 (high humidity spaces)</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Thermal Bridge Heat Loss (Psi-value)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Junction Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Default ψ (W/mK)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Good Practice ψ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Wall-floor (ground)</td>
                      <td className="border border-white/10 px-3 py-2">0.16</td>
                      <td className="border border-white/10 px-3 py-2">0.04-0.08</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Wall-roof (eaves)</td>
                      <td className="border border-white/10 px-3 py-2">0.06</td>
                      <td className="border border-white/10 px-3 py-2">0.02-0.04</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Window jamb</td>
                      <td className="border border-white/10 px-3 py-2">0.05</td>
                      <td className="border border-white/10 px-3 py-2">0.01-0.03</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lintel (steel)</td>
                      <td className="border border-white/10 px-3 py-2">0.30</td>
                      <td className="border border-white/10 px-3 py-2">0.05-0.15</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Corner (external)</td>
                      <td className="border border-white/10 px-3 py-2">0.09</td>
                      <td className="border border-white/10 px-3 py-2">0.02-0.05</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>y-value:</strong> The thermal bridging factor y = Σ(ψ × L) / ΣA adds to the average U-value.
              Part L default is 0.15 W/m²K; well-detailed buildings achieve 0.05-0.08 W/m²K.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Building Regulations Compliance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Part L and Part O Compliance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Part L (Conservation of fuel and power) sets minimum fabric standards and overall energy targets.
              Part O (Overheating) ensures that high insulation and airtightness don't cause summer discomfort.
              Designs must satisfy both simultaneously.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Part L 2021 Limiting U-Values (New Dwellings)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Element</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Limiting U-value</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notional Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">External wall</td>
                      <td className="border border-white/10 px-3 py-2">0.26 W/m²K</td>
                      <td className="border border-white/10 px-3 py-2">0.18 W/m²K</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Floor (ground)</td>
                      <td className="border border-white/10 px-3 py-2">0.18 W/m²K</td>
                      <td className="border border-white/10 px-3 py-2">0.13 W/m²K</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Roof (pitched)</td>
                      <td className="border border-white/10 px-3 py-2">0.16 W/m²K</td>
                      <td className="border border-white/10 px-3 py-2">0.11 W/m²K</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Roof (flat)</td>
                      <td className="border border-white/10 px-3 py-2">0.18 W/m²K</td>
                      <td className="border border-white/10 px-3 py-2">0.11 W/m²K</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Windows</td>
                      <td className="border border-white/10 px-3 py-2">1.6 W/m²K</td>
                      <td className="border border-white/10 px-3 py-2">1.2 W/m²K</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Doors</td>
                      <td className="border border-white/10 px-3 py-2">1.6 W/m²K</td>
                      <td className="border border-white/10 px-3 py-2">1.0 W/m²K</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Part L Key Requirements</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Target Fabric Energy Efficiency (TFEE)</li>
                  <li className="pl-1">Target Primary Energy Rate (TPER)</li>
                  <li className="pl-1">Max air permeability: 8 m³/h/m² @ 50Pa</li>
                  <li className="pl-1">Thermal bridges: default y = 0.15 W/m²K</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Part O Key Requirements</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Simplified method OR dynamic simulation</li>
                  <li className="pl-1">Glazing limits by orientation</li>
                  <li className="pl-1">Maximum g-values for glazing</li>
                  <li className="pl-1">Minimum purge ventilation</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Balancing Part L and Part O</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Glazing trade-off:</strong> Large south windows aid solar gain (Part L) but risk overheating (Part O)</li>
                <li className="pl-1"><strong>Shading:</strong> External shading helps Part O; consider impact on daylighting and winter gains</li>
                <li className="pl-1"><strong>Ventilation:</strong> Part O purge requirements may exceed Part F minimums</li>
                <li className="pl-1"><strong>Thermal mass:</strong> Exposed mass helps Part O but requires architectural coordination</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Future proofing:</strong> Consider Part O assessment with future weather files (2050s) to ensure homes remain comfortable as climate warms. Adaptation measures may be needed.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Dew Point Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Room air is at 20°C and 50% RH. What is the minimum surface temperature
                to avoid condensation?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>At 20°C, saturation vapour pressure ≈ 2340 Pa</p>
                <p>Actual vapour pressure = 50% × 2340 = 1170 Pa</p>
                <p className="mt-2">Dew point (where 1170 Pa = saturation) ≈ <strong>9.3°C</strong></p>
                <p className="mt-2 text-white/60">Any surface below 9.3°C will experience condensation</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Temperature Factor</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> At a window reveal, surface temperature is 12°C when internal air
                is 20°C and external is -5°C. Calculate fRsi and assess mould risk.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>fRsi = (Tsi - Te) / (Ti - Te)</p>
                <p>fRsi = (12 - (-5)) / (20 - (-5)) = 17 / 25 = <strong>0.68</strong></p>
                <p className="mt-2 text-red-400">FAIL: fRsi = 0.68 &lt; 0.75 required for dwellings</p>
                <p className="mt-2 text-white/60">High mould risk at this junction - needs improved detail</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Thermal Bridge Contribution</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A house has perimeter junctions totalling 80m with ψ = 0.12 W/mK,
                and total envelope area 300m². Calculate the y-value contribution.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Thermal bridge loss = Σ(ψ × L) = 0.12 × 80 = 9.6 W/K</p>
                <p>y-value = Σ(ψ × L) / ΣA = 9.6 / 300 = <strong>0.032 W/m²K</strong></p>
                <p className="mt-2 text-green-400">GOOD: Well below default 0.15 W/m²K</p>
                <p className="mt-2 text-white/60">Good junction detailing significantly improves overall fabric performance</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 4: Wall U-Value Check</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A cavity wall has U-value 0.24 W/m²K. Does it meet Part L 2021
                for a new dwelling?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Part L limiting U-value for walls = 0.26 W/m²K</p>
                <p>Part L notional building value = 0.18 W/m²K</p>
                <p className="mt-2">0.24 &lt; 0.26 → <span className="text-green-400">PASS limiting requirement</span></p>
                <p className="mt-2">0.24 &gt; 0.18 → Worse than notional - must compensate elsewhere</p>
                <p className="mt-2 text-white/60">Increase insulation to 0.18 or improve other elements</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Concepts</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>VCL on warm side:</strong> 5:1 resistance ratio warm:cold</li>
                <li className="pl-1"><strong>fRsi ≥ 0.75:</strong> Minimum temperature factor for dwellings</li>
                <li className="pl-1"><strong>y-value:</strong> Thermal bridging addition to U-values</li>
                <li className="pl-1"><strong>Part L notional:</strong> Target performance for compliance</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key U-Values (Part L 2021 Limiting)</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">External walls: <strong>0.26 W/m²K</strong></li>
                <li className="pl-1">Roof: <strong>0.16-0.18 W/m²K</strong></li>
                <li className="pl-1">Floor: <strong>0.18 W/m²K</strong></li>
                <li className="pl-1">Windows: <strong>1.6 W/m²K</strong></li>
                <li className="pl-1">Air permeability: <strong>8 m³/h/m² @ 50Pa</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>VCL on wrong side:</strong> Cold side VCL traps moisture</li>
                <li className="pl-1"><strong>Ignoring thermal bridges:</strong> Default y=0.15 may understate reality</li>
                <li className="pl-1"><strong>Part O afterthought:</strong> Consider overheating from concept stage</li>
                <li className="pl-1"><strong>Forgetting ventilation:</strong> Airtight buildings need controlled ventilation</li>
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
                <p className="font-medium text-white mb-1">Moisture Control</p>
                <ul className="space-y-0.5">
                  <li>VCL on warm side of insulation</li>
                  <li>Breather membrane on cold side</li>
                  <li>5:1 vapour resistance ratio</li>
                  <li>fRsi ≥ 0.75 at junctions</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Part L Compliance</p>
                <ul className="space-y-0.5">
                  <li>Meet limiting U-values</li>
                  <li>Beat or match notional building</li>
                  <li>Account for thermal bridging</li>
                  <li>Test air permeability</li>
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
            <Link to="../h-n-c-module2-section5-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2-section6">
              Next: Section 6
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule2Section5_6;
