import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Heat Loss Calculations - HNC Module 2 Section 1.6";
const DESCRIPTION = "Master heat loss calculations for building services: fabric losses, ventilation losses, total building heat load and heating system sizing using CIBSE design data.";

const quickCheckQuestions = [
  {
    id: "fabric-formula",
    question: "What is the correct formula for fabric heat loss?",
    options: ["Q = U × A × ΔT", "Q = 0.33 × n × V × ΔT", "Q = m × c × ΔT", "Q = U / A × ΔT"],
    correctIndex: 0,
    explanation: "Fabric heat loss Q = U × A × ΔT where U is the U-value (W/m²K), A is the area (m²), and ΔT is the temperature difference (K or °C)."
  },
  {
    id: "ventilation-formula",
    question: "Which formula calculates ventilation heat loss?",
    options: ["Q = U × A × ΔT", "Q = 0.33 × n × V × ΔT", "Q = P × t", "Q = V × I"],
    correctIndex: 1,
    explanation: "Ventilation heat loss Q = 0.33 × n × V × ΔT where 0.33 is the volumetric specific heat of air (Wh/m³K), n is air changes per hour, V is room volume (m³), and ΔT is temperature difference."
  },
  {
    id: "design-temp-external",
    question: "What is the typical CIBSE external design temperature for the UK?",
    options: ["+5°C", "0°C", "-1°C to -4°C", "-10°C"],
    correctIndex: 2,
    explanation: "CIBSE Guide A recommends external design temperatures between -1°C and -4°C for most UK locations, with colder temperatures for northern regions and exposed sites."
  },
  {
    id: "total-heat-load",
    question: "Total building heat load is calculated as:",
    options: [
      "Fabric loss × Ventilation loss",
      "Fabric loss + Ventilation loss",
      "Fabric loss - Ventilation loss",
      "Fabric loss ÷ Ventilation loss"
    ],
    correctIndex: 1,
    explanation: "Total building heat load is the sum of fabric heat losses (through walls, roof, floor, windows) and ventilation heat losses (air infiltration and mechanical ventilation)."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What does the U-value represent in heat loss calculations?",
    options: [
      "The area of a building element",
      "The rate of heat transfer through a material per unit area per degree temperature difference",
      "The total heat loss from a building",
      "The air change rate"
    ],
    correctAnswer: 1,
    explanation: "The U-value (thermal transmittance) measures the rate of heat transfer through a building element in W/m²K. Lower U-values indicate better insulation."
  },
  {
    id: 2,
    question: "A wall has U-value 0.3 W/m²K, area 45m², with 21°C inside and -3°C outside. What is the fabric heat loss?",
    options: ["324W", "405W", "486W", "540W"],
    correctAnswer: 0,
    explanation: "Q = U × A × ΔT = 0.3 × 45 × (21 - (-3)) = 0.3 × 45 × 24 = 324W"
  },
  {
    id: 3,
    question: "What is the volumetric specific heat capacity of air used in ventilation calculations?",
    options: ["0.25 Wh/m³K", "0.33 Wh/m³K", "0.50 Wh/m³K", "1.00 Wh/m³K"],
    correctAnswer: 1,
    explanation: "The volumetric specific heat capacity of air is approximately 0.33 Wh/m³K (or 1200 J/m³K). This value accounts for both the density and specific heat capacity of air at standard conditions."
  },
  {
    id: 4,
    question: "A room is 5m × 4m × 2.8m with 1.5 air changes per hour. ΔT is 24K. What is the ventilation heat loss?",
    options: ["332W", "443W", "554W", "665W"],
    correctAnswer: 3,
    explanation: "Volume = 5 × 4 × 2.8 = 56m³. Q = 0.33 × n × V × ΔT = 0.33 × 1.5 × 56 × 24 = 665.3W ≈ 665W"
  },
  {
    id: 5,
    question: "According to CIBSE Guide A, what is the recommended internal design temperature for a general office?",
    options: ["18°C", "20°C", "22°C", "24°C"],
    correctAnswer: 2,
    explanation: "CIBSE Guide A recommends 22°C for general offices (sedentary work). Living rooms are 21°C, bedrooms 18°C, and bathrooms 22°C."
  },
  {
    id: 6,
    question: "Why is a margin typically added to calculated heat loads?",
    options: [
      "To reduce the boiler size",
      "To account for pre-heat requirements and system losses",
      "Because CIBSE requires it by law",
      "To reduce energy consumption"
    ],
    correctAnswer: 1,
    explanation: "A margin (typically 10-20%) is added to account for pre-heat/boost requirements, distribution losses, and to ensure the system can maintain comfort during extreme weather events."
  },
  {
    id: 7,
    question: "A building has 5kW fabric loss and 2kW ventilation loss. With a 15% margin, what boiler output is needed?",
    options: ["7.0kW", "7.5kW", "8.05kW", "9.2kW"],
    correctAnswer: 2,
    explanation: "Total heat load = 5 + 2 = 7kW. With 15% margin: 7 × 1.15 = 8.05kW. The boiler would typically be sized at 9kW or 10kW to match available equipment."
  },
  {
    id: 8,
    question: "What is the typical air change rate for a living room used in heat loss calculations?",
    options: ["0.5 ACH", "1.0 ACH", "1.5 ACH", "2.0 ACH"],
    correctAnswer: 1,
    explanation: "CIBSE recommends 1.0 air change per hour for living rooms. Kitchens and bathrooms require higher rates (2-3 ACH) due to moisture and odour removal needs."
  },
  {
    id: 9,
    question: "Which building element typically has the highest U-value?",
    options: ["External wall", "Roof", "Floor", "Windows"],
    correctAnswer: 3,
    explanation: "Windows typically have the highest U-values (1.2-2.8 W/m²K for double glazing), making them the weakest thermal element. Modern walls achieve 0.18-0.3 W/m²K."
  },
  {
    id: 10,
    question: "When calculating heat loss, temperature difference (ΔT) is measured in:",
    options: ["Kelvin only", "Celsius only", "Either Kelvin or Celsius", "Fahrenheit"],
    correctAnswer: 2,
    explanation: "A temperature difference of 1K equals a difference of 1°C. While absolute temperatures differ (0°C = 273K), temperature differences are numerically identical, so either unit can be used."
  },
  {
    id: 11,
    question: "Building Regulations Part L sets maximum U-values. What is the current limit for new-build external walls?",
    options: ["0.35 W/m²K", "0.26 W/m²K", "0.18 W/m²K", "0.15 W/m²K"],
    correctAnswer: 2,
    explanation: "Building Regulations Part L (2021) sets a maximum U-value of 0.18 W/m²K for new-build external walls. This represents a significant improvement from previous standards."
  },
  {
    id: 12,
    question: "A heating system has a boiler efficiency of 89%. If the building heat load is 15kW, what boiler input is required?",
    options: ["13.4kW", "15.0kW", "16.9kW", "17.8kW"],
    correctAnswer: 2,
    explanation: "Boiler input = Heat load ÷ Efficiency = 15 ÷ 0.89 = 16.85kW ≈ 16.9kW. The boiler must provide more input energy than the useful heat output."
  }
];

const faqs = [
  {
    question: "Why do we use -3°C or -4°C for external design temperature when it can be colder?",
    answer: "CIBSE design temperatures represent the coldest conditions the heating system must handle during the occupied period, based on statistical analysis. While colder temperatures occur, they are infrequent and brief. The building's thermal mass provides a buffer. Designing for -10°C or lower would result in oversized, inefficient systems that rarely operate at full capacity."
  },
  {
    question: "Should I include internal doors in heat loss calculations?",
    answer: "Internal doors are not typically included as the temperature difference is minimal between heated spaces. However, if a room adjoins an unheated space (garage, utility), you should calculate heat loss through that partition using appropriate temperature assumptions (e.g., 10°C for unheated spaces)."
  },
  {
    question: "How do I account for intermittent heating in heat loss calculations?",
    answer: "For intermittent heating (e.g., offices heated only during occupied hours), add a pre-heat margin of 15-25% depending on building thermal mass. Heavyweight buildings (concrete, brick) need longer pre-heat times but maintain temperature better. Lightweight buildings respond faster but lose heat quickly when heating stops."
  },
  {
    question: "What is the difference between infiltration and ventilation?",
    answer: "Infiltration is uncontrolled air leakage through gaps in the building fabric (windows, doors, service penetrations). Ventilation is the controlled introduction of fresh air, either naturally (openable windows, trickle vents) or mechanically (MVHR, extract fans). Both contribute to heat loss but ventilation is necessary for indoor air quality."
  },
  {
    question: "How do solar gains affect heat loss calculations?",
    answer: "Solar gains are typically not included in heating design calculations as they cannot be relied upon during the coldest periods (winter mornings, overcast days). However, solar gains are crucial for cooling load calculations in summer and may cause overheating in heavily glazed buildings even in winter."
  },
  {
    question: "Why is floor heat loss calculated differently from walls?",
    answer: "Ground floors lose heat through the ground, which has significant thermal mass and maintains a relatively stable temperature (around 10°C). The calculation uses either simplified methods (exposed perimeter approach) or more complex analysis considering floor size, edge insulation, and soil conductivity. Suspended floors over unheated voids use the standard U × A × ΔT method."
  }
];

const HNCModule2Section1_6 = () => {
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
            <Zap className="h-4 w-4" />
            <span>Module 2.1.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Heat Loss Calculations
          </h1>
          <p className="text-white/80">
            Calculating building heat loads for heating system design using CIBSE methods
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Fabric loss:</strong> Q = U × A × ΔT (through walls, roof, floor, windows)</li>
              <li className="pl-1"><strong>Ventilation loss:</strong> Q = 0.33 × n × V × ΔT (air changes)</li>
              <li className="pl-1"><strong>Total load:</strong> Sum of fabric + ventilation losses</li>
              <li className="pl-1"><strong>Design margin:</strong> Add 10-20% for pre-heat and losses</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>CIBSE Guide A:</strong> Design temperatures and data</li>
              <li className="pl-1"><strong>Part L:</strong> Maximum U-values for compliance</li>
              <li className="pl-1"><strong>System sizing:</strong> Boiler, radiators, pipework</li>
              <li className="pl-1"><strong>Room-by-room:</strong> Individual heat emitter sizing</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Calculate fabric heat loss using U-values and areas",
              "Calculate ventilation heat loss using air change rates",
              "Determine total building heat load",
              "Apply CIBSE internal and external design temperatures",
              "Size heating systems with appropriate margins",
              "Understand Building Regulations Part L requirements"
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

        {/* Section 1: Fabric Heat Loss */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Fabric Heat Loss
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Fabric heat loss occurs through the building envelope - walls, roof, floor, windows and doors.
              It is the primary heat loss mechanism in most buildings and is directly related to the
              insulation quality (U-value) and surface area of each element.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fabric Heat Loss Formula</p>
              <p className="font-mono text-center text-lg mb-2">Q = U × A × ΔT</p>
              <div className="text-xs text-white/70 text-center space-y-1">
                <p>Q = Heat loss (Watts)</p>
                <p>U = U-value (W/m²K)</p>
                <p>A = Area (m²)</p>
                <p>ΔT = Temperature difference (K or °C)</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key principles of fabric heat loss:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Heat flows from hot to cold - always from inside to outside in winter</li>
                <li className="pl-1">Lower U-values mean better insulation and less heat loss</li>
                <li className="pl-1">Total fabric loss is the sum of losses through each element</li>
                <li className="pl-1">Window and door areas are subtracted from wall areas</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical U-Values (Building Regulations Part L 2021)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Element</th>
                      <th className="border border-white/10 px-3 py-2 text-left">New Build Max</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Existing (Refurb)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Old Building</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">External wall</td>
                      <td className="border border-white/10 px-3 py-2">0.18 W/m²K</td>
                      <td className="border border-white/10 px-3 py-2">0.30 W/m²K</td>
                      <td className="border border-white/10 px-3 py-2">1.5-2.0 W/m²K</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Roof (pitched)</td>
                      <td className="border border-white/10 px-3 py-2">0.11 W/m²K</td>
                      <td className="border border-white/10 px-3 py-2">0.16 W/m²K</td>
                      <td className="border border-white/10 px-3 py-2">0.5-1.0 W/m²K</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Floor</td>
                      <td className="border border-white/10 px-3 py-2">0.13 W/m²K</td>
                      <td className="border border-white/10 px-3 py-2">0.25 W/m²K</td>
                      <td className="border border-white/10 px-3 py-2">0.5-0.8 W/m²K</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Windows</td>
                      <td className="border border-white/10 px-3 py-2">1.2 W/m²K</td>
                      <td className="border border-white/10 px-3 py-2">1.4 W/m²K</td>
                      <td className="border border-white/10 px-3 py-2">2.8-5.0 W/m²K</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">External doors</td>
                      <td className="border border-white/10 px-3 py-2">1.0 W/m²K</td>
                      <td className="border border-white/10 px-3 py-2">1.4 W/m²K</td>
                      <td className="border border-white/10 px-3 py-2">3.0-4.0 W/m²K</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Windows typically have U-values 5-10 times higher than modern walls, making them
              the weakest thermal element despite their smaller area.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Ventilation Heat Loss */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Ventilation Heat Loss
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Ventilation heat loss occurs when warm indoor air is replaced by cold outdoor air.
              This happens through both controlled ventilation (windows, vents, MVHR) and uncontrolled
              infiltration (gaps, cracks, service penetrations).
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Ventilation Heat Loss Formula</p>
              <p className="font-mono text-center text-lg mb-2">Q = 0.33 × n × V × ΔT</p>
              <div className="text-xs text-white/70 text-center space-y-1">
                <p>Q = Heat loss (Watts)</p>
                <p>0.33 = Volumetric specific heat of air (Wh/m³K)</p>
                <p>n = Air changes per hour (ACH)</p>
                <p>V = Room volume (m³)</p>
                <p>ΔT = Temperature difference (K or °C)</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Understanding the 0.33 factor:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Air density ≈ 1.2 kg/m³ at standard conditions</li>
                <li className="pl-1">Specific heat capacity of air ≈ 1000 J/kgK</li>
                <li className="pl-1">Combined: 1.2 × 1000 = 1200 J/m³K = 0.33 Wh/m³K</li>
                <li className="pl-1">This factor accounts for the energy needed to heat incoming air</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">CIBSE Recommended Air Change Rates</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Room Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">ACH (Design)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Living room</td>
                      <td className="border border-white/10 px-3 py-2">1.0</td>
                      <td className="border border-white/10 px-3 py-2">Background ventilation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Bedroom</td>
                      <td className="border border-white/10 px-3 py-2">0.5-1.0</td>
                      <td className="border border-white/10 px-3 py-2">Lower overnight</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Kitchen</td>
                      <td className="border border-white/10 px-3 py-2">2.0-3.0</td>
                      <td className="border border-white/10 px-3 py-2">Extract ventilation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Bathroom</td>
                      <td className="border border-white/10 px-3 py-2">2.0-3.0</td>
                      <td className="border border-white/10 px-3 py-2">Moisture removal</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Office (general)</td>
                      <td className="border border-white/10 px-3 py-2">1.0-1.5</td>
                      <td className="border border-white/10 px-3 py-2">8-10 l/s per person</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Classroom</td>
                      <td className="border border-white/10 px-3 py-2">2.0-3.0</td>
                      <td className="border border-white/10 px-3 py-2">High occupancy</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Modern buildings:</strong> With improved airtightness (&lt;5 m³/h/m² at 50Pa), mechanical ventilation
              with heat recovery (MVHR) can recover 80-90% of heat from exhaust air.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Design Temperatures and CIBSE Data */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Design Temperatures and CIBSE Data
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Accurate heat loss calculations require appropriate design temperatures. CIBSE Guide A
              provides comprehensive data for internal comfort temperatures and external design
              conditions based on UK weather statistics.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Internal Design Temperatures</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Living room:</strong> 21°C</li>
                  <li className="pl-1"><strong>Dining room:</strong> 21°C</li>
                  <li className="pl-1"><strong>Bedroom:</strong> 18°C</li>
                  <li className="pl-1"><strong>Bathroom:</strong> 22°C</li>
                  <li className="pl-1"><strong>Hall/landing:</strong> 18°C</li>
                  <li className="pl-1"><strong>Kitchen:</strong> 18°C (cooking gains)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Commercial Spaces</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>General office:</strong> 22°C</li>
                  <li className="pl-1"><strong>Open plan office:</strong> 22°C</li>
                  <li className="pl-1"><strong>Retail (sales):</strong> 19-21°C</li>
                  <li className="pl-1"><strong>Restaurant:</strong> 22°C</li>
                  <li className="pl-1"><strong>Warehouse:</strong> 12-16°C</li>
                  <li className="pl-1"><strong>Factory (light work):</strong> 16-19°C</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">External Design Temperatures (CIBSE Guide A)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Location</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Winter Design Temp</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">London</td>
                      <td className="border border-white/10 px-3 py-2">-2°C</td>
                      <td className="border border-white/10 px-3 py-2">Urban heat island effect</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Birmingham</td>
                      <td className="border border-white/10 px-3 py-2">-3°C</td>
                      <td className="border border-white/10 px-3 py-2">Central England</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Manchester</td>
                      <td className="border border-white/10 px-3 py-2">-3°C</td>
                      <td className="border border-white/10 px-3 py-2">North West</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Edinburgh</td>
                      <td className="border border-white/10 px-3 py-2">-4°C</td>
                      <td className="border border-white/10 px-3 py-2">Scotland - colder</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Aberdeen</td>
                      <td className="border border-white/10 px-3 py-2">-5°C</td>
                      <td className="border border-white/10 px-3 py-2">North Scotland</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Exposed/rural sites</td>
                      <td className="border border-white/10 px-3 py-2">-1°C to -2°C lower</td>
                      <td className="border border-white/10 px-3 py-2">Additional allowance</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Calculating Temperature Difference (ΔT)</p>
              <p className="font-mono text-center text-lg mb-2">ΔT = t<sub>i</sub> - t<sub>e</sub></p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90 mt-3">
                <p>Example: Office in Manchester</p>
                <p>Internal: 22°C, External: -3°C</p>
                <p>ΔT = 22 - (-3) = <strong>25K</strong></p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>CIBSE basis:</strong> External design temperatures are based on the temperature exceeded for 99.6%
              of the year (i.e., only colder for approximately 35 hours annually).
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Total Building Heat Load and System Sizing */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Total Building Heat Load and System Sizing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The total building heat load is the sum of all fabric and ventilation losses. This
              determines the required capacity of the heating system including boiler, heat pump,
              distribution pipework and heat emitters.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Total Heat Load Formula</p>
              <p className="font-mono text-center text-lg mb-2">Q<sub>total</sub> = Q<sub>fabric</sub> + Q<sub>ventilation</sub></p>
              <div className="text-xs text-white/70 text-center mt-2">
                <p>Add margins for pre-heat (10-20%) and distribution losses (5-10%)</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">System sizing considerations:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Pre-heat margin:</strong> 10-20% for intermittent heating</li>
                <li className="pl-1"><strong>Distribution losses:</strong> 5-10% for pipe heat losses</li>
                <li className="pl-1"><strong>Safety factor:</strong> Round up to available equipment sizes</li>
                <li className="pl-1"><strong>Future-proofing:</strong> Consider building extensions or usage changes</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Heat Loss Benchmarks</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Building Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Heat Loss (W/m² floor)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Passivhaus</td>
                      <td className="border border-white/10 px-3 py-2">10-15</td>
                      <td className="border border-white/10 px-3 py-2">Ultra-low energy</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">New build (Part L 2021)</td>
                      <td className="border border-white/10 px-3 py-2">30-50</td>
                      <td className="border border-white/10 px-3 py-2">Current standards</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1990s-2000s build</td>
                      <td className="border border-white/10 px-3 py-2">50-80</td>
                      <td className="border border-white/10 px-3 py-2">Reasonable insulation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1970s-1980s build</td>
                      <td className="border border-white/10 px-3 py-2">80-120</td>
                      <td className="border border-white/10 px-3 py-2">Partial insulation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pre-1970s unimproved</td>
                      <td className="border border-white/10 px-3 py-2">120-200+</td>
                      <td className="border border-white/10 px-3 py-2">Solid walls, single glazing</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Boiler Sizing</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Output must exceed total heat load</li>
                  <li className="pl-1">Add DHW load for combis (3-5kW)</li>
                  <li className="pl-1">Consider modulation range (10:1)</li>
                  <li className="pl-1">Oversizing causes short-cycling</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Heat Pump Sizing</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">COP reduces at low external temps</li>
                  <li className="pl-1">Size to peak load or bivalent point</li>
                  <li className="pl-1">Buffer vessels for low thermal mass</li>
                  <li className="pl-1">Weather compensation essential</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Rule of thumb:</strong> Modern well-insulated homes need approximately 40-60 W/m² floor area.
              A 100m² home would need 4-6kW heating capacity.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Room Fabric Heat Loss</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Calculate the fabric heat loss for a living room with:
                External wall 12m² (U=0.3), window 4m² (U=1.4), floor 20m² (U=0.2), ceiling 20m² (U=0.15).
                Internal temp 21°C, external -3°C.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>ΔT = 21 - (-3) = 24K</p>
                <p className="mt-2">Wall loss: 0.3 × 12 × 24 = 86.4W</p>
                <p>Window loss: 1.4 × 4 × 24 = 134.4W</p>
                <p>Floor loss: 0.2 × 20 × 24 = 96W</p>
                <p>Ceiling loss: 0.15 × 20 × 24 = 72W</p>
                <p className="mt-2">Total fabric loss = 86.4 + 134.4 + 96 + 72 = <strong>388.8W</strong></p>
                <p className="mt-2 text-white/60">Note: Window contributes 35% of loss despite being 7% of envelope area</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Room Ventilation Heat Loss</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> The same living room is 5m × 4m × 2.4m with 1.0 air change per hour.
                Calculate the ventilation heat loss.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Volume = 5 × 4 × 2.4 = 48m³</p>
                <p>ΔT = 24K (from previous example)</p>
                <p className="mt-2">Q = 0.33 × n × V × ΔT</p>
                <p>Q = 0.33 × 1.0 × 48 × 24</p>
                <p>Q = <strong>380.2W</strong></p>
                <p className="mt-2 text-white/60">Ventilation loss is almost equal to fabric loss in this example</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Total Room Heat Load with Margin</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Using the results above, calculate the total heat load and recommended
                radiator size with a 10% margin.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Total heat loss = Fabric + Ventilation</p>
                <p>Total = 388.8 + 380.2 = 769W</p>
                <p className="mt-2">With 10% margin:</p>
                <p>Required = 769 × 1.10 = <strong>845.9W</strong></p>
                <p className="mt-2">Recommended radiator: <strong>900W-1000W output</strong></p>
                <p className="text-white/60">(Select next size up from manufacturer's range)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 4: Whole House Heat Load</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 120m² house has calculated room-by-room heat losses totalling 7.2kW.
                Size the boiler with appropriate margins for intermittent heating.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Base heat load: 7.2kW</p>
                <p className="mt-2">Pre-heat margin (15%): 7.2 × 0.15 = 1.08kW</p>
                <p>Distribution losses (5%): 7.2 × 0.05 = 0.36kW</p>
                <p className="mt-2">Total required: 7.2 + 1.08 + 0.36 = <strong>8.64kW</strong></p>
                <p className="mt-2">Add DHW for combi (3kW): 8.64 + 3 = 11.64kW</p>
                <p className="mt-2 text-green-400">Recommended: <strong>12-15kW combi boiler</strong></p>
                <p className="text-white/60">Or 9-10kW system boiler with separate DHW cylinder</p>
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
                <li className="pl-1"><strong>Q = U × A × ΔT</strong> — Fabric heat loss (W)</li>
                <li className="pl-1"><strong>Q = 0.33 × n × V × ΔT</strong> — Ventilation heat loss (W)</li>
                <li className="pl-1"><strong>Q<sub>total</sub> = Q<sub>fabric</sub> + Q<sub>ventilation</sub></strong> — Total heat load</li>
                <li className="pl-1"><strong>ΔT = t<sub>inside</sub> - t<sub>outside</sub></strong> — Temperature difference</li>
                <li className="pl-1"><strong>Boiler output = Total × margin factor</strong> — System sizing</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Volumetric specific heat of air: <strong>0.33 Wh/m³K</strong></li>
                <li className="pl-1">Living room internal temp: <strong>21°C</strong></li>
                <li className="pl-1">Office internal temp: <strong>22°C</strong></li>
                <li className="pl-1">UK external design temp: <strong>-1°C to -4°C</strong></li>
                <li className="pl-1">New build wall U-value: <strong>≤0.18 W/m²K</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Forgetting negatives</strong> — ΔT = 21 - (-3) = 24, not 18</li>
                <li className="pl-1"><strong>Double counting areas</strong> — Subtract window area from wall area</li>
                <li className="pl-1"><strong>Ignoring internal partitions</strong> — Heat flows to unheated spaces too</li>
                <li className="pl-1"><strong>Undersizing systems</strong> — Always add appropriate margins</li>
                <li className="pl-1"><strong>Using wrong U-values</strong> — Verify actual construction, not assumed</li>
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
                <p className="font-medium text-white mb-1">Heat Loss Formulas</p>
                <ul className="space-y-0.5">
                  <li>Fabric: Q = U × A × ΔT</li>
                  <li>Ventilation: Q = 0.33 × n × V × ΔT</li>
                  <li>Total: Q<sub>fab</sub> + Q<sub>vent</sub></li>
                  <li>With margin: Total × 1.15 typical</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Design Data</p>
                <ul className="space-y-0.5">
                  <li>Internal: 18-22°C (room dependent)</li>
                  <li>External UK: -1°C to -4°C</li>
                  <li>Air changes: 0.5-3.0 ACH</li>
                  <li>Benchmarks: 30-200 W/m² floor</li>
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
            <Link to="../h-n-c-module2-section1-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Section 1.5
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2-section2">
              Next: Section 2
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule2Section1_6;
