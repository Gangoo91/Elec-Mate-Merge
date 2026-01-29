import { ArrowLeft, Thermometer, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Heat Gains and Losses - HNC Module 2 Section 5.2";
const DESCRIPTION = "Understanding internal heat gains from people, equipment and lighting, external gains and losses, steady state versus dynamic analysis, and CIBSE design data.";

const quickCheckQuestions = [
  {
    id: "sedentary-heat",
    question: "What is the typical total heat emission from a sedentary office worker according to CIBSE Guide A?",
    options: ["50W", "90W", "130W", "200W"],
    correctIndex: 2,
    explanation: "A sedentary office worker emits approximately 130W total (75W sensible, 55W latent). This varies with activity level - light office work is about 140W, walking slowly about 180W."
  },
  {
    id: "lighting-gain",
    question: "What power density (W/m²) would you typically use for modern LED office lighting heat gain?",
    options: ["5-8 W/m²", "10-12 W/m²", "20-25 W/m²", "30-35 W/m²"],
    correctIndex: 1,
    explanation: "Modern LED office lighting typically uses 10-12 W/m². All electrical energy in lighting ultimately becomes heat (either directly or after being absorbed by surfaces), so this equals the heat gain."
  },
  {
    id: "equipment-diversity",
    question: "When calculating equipment heat gains in an open-plan office, what diversity factor is typically applied?",
    options: ["0.3-0.5", "0.5-0.7", "0.7-0.9", "1.0 (no diversity)"],
    correctIndex: 1,
    explanation: "CIBSE recommends diversity factors of 0.5-0.7 for office equipment as not all equipment operates simultaneously at peak load. Without diversity, designs would be significantly oversized."
  },
  {
    id: "steady-vs-dynamic",
    question: "Which calculation method accounts for thermal mass effects when determining cooling load?",
    options: ["Steady-state heat loss", "U-value calculation", "Dynamic thermal simulation", "Degree-day method"],
    correctIndex: 2,
    explanation: "Dynamic thermal simulation accounts for thermal mass, time lag, and varying conditions throughout the day. Steady-state calculations assume equilibrium and don't capture storage effects."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What are the two components of heat emission from occupants?",
    options: [
      "Radiant and convective",
      "Sensible and latent",
      "Direct and indirect",
      "Conductive and convective"
    ],
    correctAnswer: 1,
    explanation: "Occupants emit sensible heat (raising air temperature) and latent heat (adding moisture through respiration and perspiration). The ratio varies with activity level - more latent at higher activity."
  },
  {
    id: 2,
    question: "A computer monitor rated at 65W has an electrical efficiency factor of 0.90. What is the heat gain to the space?",
    options: ["58.5W", "65W", "72.2W", "6.5W"],
    correctAnswer: 1,
    explanation: "All electrical energy consumed by equipment in a space becomes heat (conservation of energy). The 65W rating is the heat gain regardless of efficiency - efficiency affects how much useful light/work is produced."
  },
  {
    id: 3,
    question: "Which CIBSE Guide provides benchmark values for internal heat gains?",
    options: [
      "CIBSE Guide A",
      "CIBSE Guide B",
      "CIBSE Guide F",
      "CIBSE TM46"
    ],
    correctAnswer: 0,
    explanation: "CIBSE Guide A (Environmental Design) provides comprehensive tables of internal heat gains from people, equipment, and lighting for various building types and activities."
  },
  {
    id: 4,
    question: "What is the typical small power heat gain allowance for a cellular office?",
    options: [
      "10 W/m²",
      "15-20 W/m²",
      "25-30 W/m²",
      "40-50 W/m²"
    ],
    correctAnswer: 1,
    explanation: "CIBSE Guide A suggests 15-20 W/m² for cellular offices with typical IT equipment. Open-plan offices may use 20-25 W/m² due to higher equipment density."
  },
  {
    id: 5,
    question: "For a steady-state heat loss calculation, which formula is correct?",
    options: [
      "Q = U × A × (Ti - To)",
      "Q = U × A × (Ti + To)",
      "Q = A × (Ti - To) / U",
      "Q = U / A × (Ti - To)"
    ],
    correctAnswer: 0,
    explanation: "Heat loss Q = U × A × ΔT, where U is thermal transmittance (W/m²K), A is area (m²), and ΔT is temperature difference (K or °C). This gives heat flow in Watts."
  },
  {
    id: 6,
    question: "What percentage of fluorescent lamp rated power is typically emitted as heat to the room space?",
    options: [
      "20-25%",
      "40-50%",
      "70-80%",
      "100%"
    ],
    correctAnswer: 3,
    explanation: "100% of electrical power to lighting becomes heat. About 20-25% is light (which becomes heat when absorbed by surfaces), and 75-80% is direct heat. All energy ends as heat in the space."
  },
  {
    id: 7,
    question: "Which factor does NOT affect fabric heat loss in winter?",
    options: [
      "U-value of construction",
      "Solar gains through glazing",
      "Indoor-outdoor temperature difference",
      "Surface area of external elements"
    ],
    correctAnswer: 1,
    explanation: "Fabric heat loss depends on U-value, area, and temperature difference. Solar gains are separate heat gains (positive contribution) and don't affect conductive heat loss through the fabric."
  },
  {
    id: 8,
    question: "A gym with 50 people exercising (200W/person) needs what sensible cooling capacity just for occupants?",
    options: [
      "5 kW",
      "7 kW",
      "10 kW",
      "Cannot determine - need split data"
    ],
    correctAnswer: 3,
    explanation: "The 200W total includes both sensible and latent components. For exercising occupants, only about 35-40% is sensible heat. Need CIBSE data splitting sensible/latent for accurate cooling load."
  },
  {
    id: 9,
    question: "What is meant by 'peak coincident gains' in cooling load calculations?",
    options: [
      "The maximum solar gain at any time",
      "The sum of all individual maximum gains",
      "The total gains occurring simultaneously at a specific time",
      "The average of all heat sources"
    ],
    correctAnswer: 2,
    explanation: "Peak coincident gains are the total gains occurring at the same time, not the sum of individual peaks (which may occur at different times). This is the relevant value for sizing cooling plant."
  },
  {
    id: 10,
    question: "For a server room with 24/7 operation, what heat gain diversity would you apply?",
    options: [
      "0.5",
      "0.7",
      "0.85",
      "1.0"
    ],
    correctAnswer: 3,
    explanation: "Server rooms typically run at full load continuously, so diversity is 1.0 (no reduction). Applying diversity to 24/7 critical loads would result in undersized cooling and potential equipment damage."
  },
  {
    id: 11,
    question: "The 'admittance method' for cooling load calculation accounts for which phenomenon?",
    options: [
      "Air infiltration rates",
      "Thermal storage in building fabric",
      "Latent heat from occupants",
      "Ventilation heat exchange"
    ],
    correctAnswer: 1,
    explanation: "The admittance method (CIBSE Guide A) accounts for thermal storage in building elements, using admittance (Y-value) to determine how gains are absorbed and released over time."
  },
  {
    id: 12,
    question: "What is the typical occupancy density used for office cooling load calculations?",
    options: [
      "5 m²/person",
      "8-12 m²/person",
      "15-20 m²/person",
      "25 m²/person"
    ],
    correctAnswer: 1,
    explanation: "CIBSE Guide A suggests 8-12 m²/person for general offices (10 m²/person is commonly used). Call centres may be 5-8 m²/person; executive offices 15-20 m²/person."
  }
];

const faqs = [
  {
    question: "How do I split sensible and latent heat from occupants?",
    answer: "CIBSE Guide A Table 6.3 provides sensible/latent splits for various activity levels. Sedentary (20°C): 75W sensible, 55W latent. Light work: 75W/70W. Heavy work: 90W/300W. The latent fraction increases significantly with activity level due to increased perspiration."
  },
  {
    question: "Should I include heat gain from lighting that is 'uplight'?",
    answer: "Yes - all lighting power becomes heat regardless of direction. Uplighting heats the ceiling which re-radiates to the space. The only exception is if lights are in a ventilated ceiling void with extract directly above - then some heat is removed before entering the space."
  },
  {
    question: "What is the difference between installed load and design load for equipment?",
    answer: "Installed load is the total nameplate rating of all equipment. Design load applies diversity (typically 0.5-0.7) and usage factors because not all equipment operates simultaneously at full power. Always clarify which value clients specify in briefs."
  },
  {
    question: "How do I handle heat gains from adjacent spaces?",
    answer: "If adjacent space is conditioned to similar temperature, heat transfer is negligible. If unconditioned (corridor, store), calculate using temperature difference and partition U-value. For adjacent spaces with high gains (kitchens, server rooms), this can be significant."
  },
  {
    question: "When should I use steady-state versus dynamic calculations?",
    answer: "Steady-state is suitable for heating load calculations and quick estimates. Dynamic simulation is essential for cooling loads, overheating analysis, and heavyweight buildings where thermal mass significantly affects peak loads and timing."
  },
  {
    question: "How do equipment heat gains affect ventilation requirements?",
    answer: "Higher heat gains require more cooling, often delivered via increased ventilation rates. However, ventilation should be based on fresh air requirements (CO2, pollutant dilution) not just cooling. Use mechanical cooling if ventilation alone cannot maintain comfort."
  }
];

const HNCModule2Section5_2 = () => {
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
            <Thermometer className="h-4 w-4" />
            <span>Module 2.5.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Heat Gains and Losses
          </h1>
          <p className="text-white/80">
            Internal gains from occupants, equipment and lighting, plus external fabric heat flows
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Occupants:</strong> 90-200W each (sensible + latent)</li>
              <li className="pl-1"><strong>Equipment:</strong> All electrical power becomes heat</li>
              <li className="pl-1"><strong>Lighting:</strong> 10-25 W/m² depending on type</li>
              <li className="pl-1"><strong>Fabric:</strong> Q = U × A × ΔT for conductive flow</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Cooling load:</strong> Sum of all simultaneous gains</li>
              <li className="pl-1"><strong>Heating load:</strong> Fabric + ventilation losses</li>
              <li className="pl-1"><strong>Diversity:</strong> Not all loads peak together</li>
              <li className="pl-1"><strong>CIBSE data:</strong> Benchmark values for design</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Calculate heat gains from occupants for different activities",
              "Determine equipment and lighting gains using CIBSE data",
              "Apply diversity factors for realistic peak loads",
              "Calculate fabric heat losses for heating system sizing",
              "Understand steady-state versus dynamic analysis",
              "Distinguish sensible and latent heat components"
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

        {/* Section 1: Internal Gains - People */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Internal Gains - People
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Occupants are significant heat sources, emitting both sensible heat (warming the air) and latent heat
              (adding moisture). The emission rate varies substantially with activity level and environmental conditions.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key concepts:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Sensible heat:</strong> Raises air dry-bulb temperature, handled by cooling coils</li>
                <li className="pl-1"><strong>Latent heat:</strong> Adds moisture, increases humidity, requires dehumidification</li>
                <li className="pl-1"><strong>Metabolic rate:</strong> Expressed in 'Met' units (1 Met = 58.2 W/m² body area)</li>
                <li className="pl-1"><strong>Environmental effect:</strong> Higher room temperatures shift emission towards latent</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Heat Emission by Activity (CIBSE Guide A)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Activity</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Total (W)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Sensible (W)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Latent (W)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Seated at rest</td>
                      <td className="border border-white/10 px-3 py-2">115</td>
                      <td className="border border-white/10 px-3 py-2">70</td>
                      <td className="border border-white/10 px-3 py-2">45</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Sedentary office work</td>
                      <td className="border border-white/10 px-3 py-2">130</td>
                      <td className="border border-white/10 px-3 py-2">75</td>
                      <td className="border border-white/10 px-3 py-2">55</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Standing, light work</td>
                      <td className="border border-white/10 px-3 py-2">150</td>
                      <td className="border border-white/10 px-3 py-2">80</td>
                      <td className="border border-white/10 px-3 py-2">70</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Walking (retail)</td>
                      <td className="border border-white/10 px-3 py-2">180</td>
                      <td className="border border-white/10 px-3 py-2">90</td>
                      <td className="border border-white/10 px-3 py-2">90</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Factory bench work</td>
                      <td className="border border-white/10 px-3 py-2">235</td>
                      <td className="border border-white/10 px-3 py-2">100</td>
                      <td className="border border-white/10 px-3 py-2">135</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Gymnasium exercise</td>
                      <td className="border border-white/10 px-3 py-2">400+</td>
                      <td className="border border-white/10 px-3 py-2">120</td>
                      <td className="border border-white/10 px-3 py-2">280+</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Occupant Gain Calculation</p>
              <p className="font-mono text-center text-sm mb-2">Q<sub>occ</sub> = N × q × D</p>
              <p className="text-xs text-white/70 text-center">Where N = number of occupants, q = heat emission (W/person), D = diversity factor</p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Diversity note:</strong> Peak occupancy rarely occurs simultaneously with peak equipment use. Diversity factors of 0.75-0.90 are typical for office occupancy.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Internal Gains - Equipment */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Internal Gains - Equipment and Lighting
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electrical equipment and lighting convert electrical energy to heat. In modern offices, equipment gains
              often exceed occupant gains and can dominate cooling loads, particularly in IT-intensive spaces.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Equipment principles:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>First law:</strong> All electrical energy becomes heat (conservation of energy)</li>
                <li className="pl-1"><strong>Nameplate vs actual:</strong> Equipment rarely runs at rated power continuously</li>
                <li className="pl-1"><strong>Diversity:</strong> Not all equipment operates simultaneously at peak</li>
                <li className="pl-1"><strong>Standby power:</strong> Modern equipment has significant standby consumption</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">CIBSE Equipment Benchmarks</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Cellular office: 15-20 W/m²</li>
                  <li className="pl-1">Open-plan office: 20-25 W/m²</li>
                  <li className="pl-1">Dealing room: 35-50 W/m²</li>
                  <li className="pl-1">Server/comms room: 200-500 W/m²</li>
                  <li className="pl-1">Classroom: 5-10 W/m²</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Equipment Heat</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Desktop PC: 80-150W (operation)</li>
                  <li className="pl-1">Laptop: 30-60W</li>
                  <li className="pl-1">Monitor (LED 24"): 25-40W</li>
                  <li className="pl-1">Laser printer (active): 400-600W</li>
                  <li className="pl-1">Multifunction copier: 200-500W</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Lighting Heat Gains</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Space Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">LED (W/m²)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Fluorescent (W/m²)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">General office</td>
                      <td className="border border-white/10 px-3 py-2">10-12</td>
                      <td className="border border-white/10 px-3 py-2">15-18</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Corridors/circulation</td>
                      <td className="border border-white/10 px-3 py-2">5-8</td>
                      <td className="border border-white/10 px-3 py-2">8-12</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Retail sales floor</td>
                      <td className="border border-white/10 px-3 py-2">15-25</td>
                      <td className="border border-white/10 px-3 py-2">20-35</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Industrial/warehouse</td>
                      <td className="border border-white/10 px-3 py-2">5-10</td>
                      <td className="border border-white/10 px-3 py-2">8-15</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>All lighting is heat:</strong> The visible light portion (20-25%) is absorbed by surfaces and becomes heat anyway. For cooling calculations, use the full electrical power.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: External Heat Flow */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            External Heat Gains and Losses
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Heat flows through the building fabric due to temperature differences between inside and outside.
              In winter this is predominantly heat loss; in summer, gains can occur through the fabric, particularly
              through glazing and poorly insulated roofs.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Steady-State Heat Transfer</p>
              <p className="font-mono text-center text-sm mb-2">Q = U × A × (T<sub>i</sub> - T<sub>o</sub>)</p>
              <p className="text-xs text-white/70 text-center">Where U = thermal transmittance (W/m²K), A = area (m²), T = temperatures (°C)</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Components of fabric heat flow:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Walls:</strong> External, party walls to unconditioned spaces, ground-contact</li>
                <li className="pl-1"><strong>Roof:</strong> Significant in summer due to solar absorption (sol-air temperature)</li>
                <li className="pl-1"><strong>Floor:</strong> Ground contact or to unheated spaces below</li>
                <li className="pl-1"><strong>Glazing:</strong> High U-value but also solar gains (see Section 5.1)</li>
                <li className="pl-1"><strong>Thermal bridges:</strong> Junctions, lintels, reveals increase effective U-value</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Sol-Air Temperature Concept</p>
              <p className="text-sm text-white mb-2">
                In summer, external surfaces are heated by solar radiation above air temperature. The sol-air temperature
                accounts for this absorbed radiation when calculating heat gain through opaque elements.
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Surface/Orientation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Sol-Air (°C)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Dark horizontal roof</td>
                      <td className="border border-white/10 px-3 py-2">50-60</td>
                      <td className="border border-white/10 px-3 py-2">Peak summer midday</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Light horizontal roof</td>
                      <td className="border border-white/10 px-3 py-2">35-45</td>
                      <td className="border border-white/10 px-3 py-2">Reflective surface helps</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">South-facing wall</td>
                      <td className="border border-white/10 px-3 py-2">30-40</td>
                      <td className="border border-white/10 px-3 py-2">Lower due to lower incidence</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">North-facing wall</td>
                      <td className="border border-white/10 px-3 py-2">≈ Air temp</td>
                      <td className="border border-white/10 px-3 py-2">Minimal direct radiation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Heating design:</strong> Heat loss calculations use steady-state method with external design temperature (typically -4°C to -1°C UK depending on location). Include a margin for morning boost.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Steady State vs Dynamic */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Steady State vs Dynamic Analysis
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Building thermal calculations can be performed using simple steady-state methods or complex dynamic
              simulations. The choice depends on building complexity, required accuracy, and regulatory requirements.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Comparison of methods:</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Aspect</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Steady-State</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Dynamic Simulation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Time variation</td>
                      <td className="border border-white/10 px-3 py-2">Assumes equilibrium</td>
                      <td className="border border-white/10 px-3 py-2">Hour-by-hour/sub-hourly</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Thermal mass</td>
                      <td className="border border-white/10 px-3 py-2">Not modelled</td>
                      <td className="border border-white/10 px-3 py-2">Fully accounted</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Weather data</td>
                      <td className="border border-white/10 px-3 py-2">Design conditions only</td>
                      <td className="border border-white/10 px-3 py-2">Annual weather file</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Complexity</td>
                      <td className="border border-white/10 px-3 py-2">Spreadsheet/hand calc</td>
                      <td className="border border-white/10 px-3 py-2">Specialist software</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Best use</td>
                      <td className="border border-white/10 px-3 py-2">Heating loads, estimates</td>
                      <td className="border border-white/10 px-3 py-2">Cooling, overheating, energy</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">CIBSE Admittance Method</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Semi-dynamic manual method</li>
                  <li className="pl-1">Uses Y-value (admittance) for storage</li>
                  <li className="pl-1">Swing in temperature calculation</li>
                  <li className="pl-1">Good for simple single-zone spaces</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Dynamic Simulation Tools</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">IES-VE (UK industry standard)</li>
                  <li className="pl-1">EnergyPlus (US DOE)</li>
                  <li className="pl-1">TRNSYS (research applications)</li>
                  <li className="pl-1">DesignBuilder (simplified interface)</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">When Dynamic Simulation is Required</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Part L compliance (SBEM or DSM for complex buildings)</li>
                <li className="pl-1">Part O overheating assessment (TM59 method)</li>
                <li className="pl-1">BREEAM energy credits</li>
                <li className="pl-1">Heavyweight buildings with significant thermal mass</li>
                <li className="pl-1">Mixed-mode or naturally ventilated buildings</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Practical tip:</strong> Use steady-state for initial sizing and feasibility, then validate with dynamic simulation for detailed design. This saves time while ensuring accuracy.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Office Internal Gains</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Calculate the total internal heat gains for a 200m² open-plan office with
                20 occupants (sedentary), LED lighting at 12 W/m², and equipment at 22 W/m².
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Occupant gains = 20 × 130W = 2600W</p>
                <p>Lighting gains = 200m² × 12 W/m² = 2400W</p>
                <p>Equipment gains = 200m² × 22 W/m² = 4400W</p>
                <p className="mt-2">Total = 2600 + 2400 + 4400 = <strong>9400W = 9.4kW</strong></p>
                <p className="mt-2 text-white/60">Heat gain density = 9400/200 = 47 W/m² (typical for modern office)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: With Diversity Applied</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Apply typical diversity factors to the above example: occupancy 0.85,
                lighting 0.90, equipment 0.70.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Occupant gains = 2600W × 0.85 = 2210W</p>
                <p>Lighting gains = 2400W × 0.90 = 2160W</p>
                <p>Equipment gains = 4400W × 0.70 = 3080W</p>
                <p className="mt-2">Total with diversity = 2210 + 2160 + 3080 = <strong>7450W = 7.5kW</strong></p>
                <p className="mt-2 text-green-400">Reduction from diversity = 9.4 - 7.5 = 1.9kW (20%)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Fabric Heat Loss</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A room has 15m² external wall (U=0.25), 8m² double glazing (U=1.4), and
                25m² roof (U=0.18). Calculate heat loss at Ti=21°C, To=-3°C.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>ΔT = 21 - (-3) = 24K</p>
                <p className="mt-2">Wall loss = 0.25 × 15 × 24 = 90W</p>
                <p>Glazing loss = 1.4 × 8 × 24 = 269W</p>
                <p>Roof loss = 0.18 × 25 × 24 = 108W</p>
                <p className="mt-2">Total fabric loss = 90 + 269 + 108 = <strong>467W</strong></p>
                <p className="mt-2 text-white/60">Note: Glazing dominates despite smaller area (high U-value)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 4: Sensible vs Total Cooling</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A gym has 30 people exercising (200W sensible, 250W latent each).
                What are the sensible and total cooling loads from occupants?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Sensible load = 30 × 200W = <strong>6000W = 6kW sensible</strong></p>
                <p>Latent load = 30 × 250W = 7500W = 7.5kW latent</p>
                <p className="mt-2">Total = 6 + 7.5 = <strong>13.5kW total</strong></p>
                <p className="mt-2 text-white/60">Sensible Heat Ratio = 6/13.5 = 0.44 (very low, needs dehumidification)</p>
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
                <li className="pl-1"><strong>Fabric loss:</strong> Q = U × A × ΔT</li>
                <li className="pl-1"><strong>Total internal:</strong> Q = Qpeople + Qlighting + Qequipment</li>
                <li className="pl-1"><strong>With diversity:</strong> Q = Σ(Qi × Di)</li>
                <li className="pl-1"><strong>Ventilation loss:</strong> Q = ρ × cp × V × ΔT = 0.33 × n × Vol × ΔT</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Sedentary occupant: <strong>130W</strong> (75W sensible)</li>
                <li className="pl-1">Office equipment: <strong>15-25 W/m²</strong></li>
                <li className="pl-1">LED lighting: <strong>10-12 W/m²</strong> (office)</li>
                <li className="pl-1">Occupancy density: <strong>10 m²/person</strong> (typical office)</li>
                <li className="pl-1">Equipment diversity: <strong>0.5-0.7</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Forgetting latent:</strong> High-activity spaces need dehumidification</li>
                <li className="pl-1"><strong>No diversity:</strong> Summing all peaks overestimates loads by 20-30%</li>
                <li className="pl-1"><strong>Ignoring thermal mass:</strong> Heavyweight buildings store heat</li>
                <li className="pl-1"><strong>Solar as loss offset:</strong> Solar gains help winter but cause summer problems</li>
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
                <p className="font-medium text-white mb-1">Internal Gains</p>
                <ul className="space-y-0.5">
                  <li>People: 115-400W depending on activity</li>
                  <li>Equipment: 15-25 W/m² typical office</li>
                  <li>Lighting: 10-12 W/m² LED office</li>
                  <li>Apply diversity 0.5-0.9</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Fabric Heat Flow</p>
                <ul className="space-y-0.5">
                  <li>Q = U × A × ΔT</li>
                  <li>Include walls, roof, floor, glazing</li>
                  <li>Sol-air temp for summer roof gains</li>
                  <li>Thermal bridges add ~10-15%</li>
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
            <Link to="../h-n-c-module2-section5-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2-section5-3">
              Next: Thermal Mass and Time Lag
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule2Section5_2;
