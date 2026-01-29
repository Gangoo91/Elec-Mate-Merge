import { ArrowLeft, Waves, CheckCircle, ThermometerSun, Gauge, Settings, ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";
import { useState } from "react";

const TITLE = "Underfloor Heating - HNC Module 8 Section 1.3";
const DESCRIPTION = "Master underfloor heating systems for building services: UFH design principles, manifold systems, pipe layouts, zone control, screed requirements and commissioning procedures.";

const quickCheckQuestions = [
  {
    id: "ufh-flow-temp",
    question: "What is the typical maximum flow temperature for wet underfloor heating systems?",
    options: ["35°C", "45°C", "55°C", "65°C"],
    correctIndex: 2,
    explanation: "Wet UFH systems typically operate at a maximum flow temperature of 55°C to prevent thermal discomfort and floor covering damage. Heat pumps may use lower temperatures (35-45°C) for improved efficiency."
  },
  {
    id: "pipe-spacing",
    question: "What is the standard pipe spacing for UFH in a well-insulated living area?",
    options: ["100mm", "150mm", "200mm", "300mm"],
    correctIndex: 2,
    explanation: "200mm pipe spacing is standard for well-insulated living areas. Higher heat loss areas like bathrooms may use 150mm spacing, whilst lower output areas might use 250-300mm."
  },
  {
    id: "manifold-purpose",
    question: "What is the primary purpose of the UFH manifold?",
    options: ["Heat generation", "Water storage", "Flow distribution and zone control", "Pressure boosting"],
    correctIndex: 2,
    explanation: "The manifold distributes heated water to individual UFH circuits and provides zone control through flow meters, actuators and isolation valves. It is the central control point for multi-zone systems."
  },
  {
    id: "screed-depth",
    question: "What is the minimum screed depth over UFH pipes in a traditional sand/cement screed?",
    options: ["25mm", "50mm", "65mm", "75mm"],
    correctIndex: 2,
    explanation: "A minimum of 65mm screed depth over UFH pipes is required for traditional sand/cement screeds to provide adequate thermal mass and structural integrity. The total screed depth is typically 65-75mm."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What heat output (W/m²) can a wet UFH system typically achieve with 55°C flow temperature?",
    options: [
      "50-70 W/m²",
      "80-100 W/m²",
      "120-150 W/m²",
      "180-200 W/m²"
    ],
    correctAnswer: 1,
    explanation: "Wet UFH systems with 55°C flow temperature can typically achieve 80-100 W/m². This is sufficient for most well-insulated buildings where heat loss is typically 40-60 W/m²."
  },
  {
    id: 2,
    question: "What is the maximum recommended circuit length for 16mm PE-X pipe in UFH?",
    options: ["60m", "80m", "100m", "120m"],
    correctAnswer: 2,
    explanation: "Maximum circuit length for 16mm PE-X pipe is typically 100m to maintain adequate flow rates and minimise pressure drop. Longer circuits require larger diameter pipes or must be split into multiple circuits."
  },
  {
    id: 3,
    question: "Which pipe layout pattern provides the most uniform heat distribution?",
    options: ["Serpentine (single)", "Bi-directional serpentine", "Spiral (snail)", "Random pattern"],
    correctAnswer: 2,
    explanation: "The spiral (snail) pattern alternates flow and return pipes, providing the most uniform floor surface temperature. Serpentine patterns create temperature gradients across the floor."
  },
  {
    id: 4,
    question: "What is the tog value limit for floor coverings over UFH?",
    options: ["0.5 tog", "1.0 tog", "1.5 tog", "2.5 tog"],
    correctAnswer: 2,
    explanation: "Floor coverings should have a combined tog value of no more than 1.5 tog (thermal resistance of 0.15 m²K/W) to ensure adequate heat transfer. Higher tog values significantly reduce heat output."
  },
  {
    id: 5,
    question: "What type of actuator is typically used for UFH zone control?",
    options: ["Pneumatic actuator", "Thermal wax actuator", "Electric motor actuator", "Solenoid valve"],
    correctAnswer: 1,
    explanation: "Thermal wax actuators (thermostatic heads) are most common for UFH zone valves. They operate on 24V or 230V AC, slowly opening/closing over 3-5 minutes to prevent water hammer."
  },
  {
    id: 6,
    question: "What is the purpose of a mixing valve in a UFH system fed from a boiler?",
    options: [
      "To increase water pressure",
      "To reduce flow temperature from boiler temperature to UFH temperature",
      "To filter the water",
      "To measure flow rate"
    ],
    correctAnswer: 1,
    explanation: "The mixing valve (thermostatic or 3-port) blends boiler return water with flow water to reduce the typical 70-80°C boiler temperature to the required 35-55°C for UFH."
  },
  {
    id: 7,
    question: "How should UFH circuits be balanced during commissioning?",
    options: [
      "By trial and error",
      "Using flow meters to achieve design flow rates",
      "By adjusting room thermostats",
      "Balancing is not required for UFH"
    ],
    correctAnswer: 1,
    explanation: "UFH circuits are balanced using the integral flow meters on the manifold to achieve design flow rates. Each circuit requires a specific flow rate based on heat output and temperature differential."
  },
  {
    id: 8,
    question: "What is the minimum drying/commissioning period for a traditional sand/cement screed before full UFH operation?",
    options: ["7 days", "14 days", "21 days", "28 days"],
    correctAnswer: 2,
    explanation: "Traditional sand/cement screed requires a minimum 21-day curing period before commissioning. The initial heating cycle then takes 7-14 days, starting at 20°C and increasing by 5°C daily."
  },
  {
    id: 9,
    question: "What is the maximum floor surface temperature recommended for occupied spaces?",
    options: ["24°C", "27°C", "29°C", "32°C"],
    correctAnswer: 2,
    explanation: "Maximum floor surface temperature should not exceed 29°C in occupied spaces for comfort and safety. Peripheral zones (under windows) may operate at up to 35°C."
  },
  {
    id: 10,
    question: "What pipe material is most commonly used for wet UFH systems?",
    options: ["Copper", "PVC", "PE-X (cross-linked polyethylene)", "Stainless steel"],
    correctAnswer: 2,
    explanation: "PE-X (cross-linked polyethylene) is the most common UFH pipe material due to its flexibility, oxygen barrier properties, long service life, and resistance to scaling and corrosion."
  },
  {
    id: 11,
    question: "What is the typical operating temperature differential (delta T) for UFH systems?",
    options: ["5°C", "10°C", "15°C", "20°C"],
    correctAnswer: 1,
    explanation: "UFH systems typically operate with a 10°C temperature differential (e.g., 45°C flow, 35°C return). This is lower than radiator systems and requires higher flow rates for the same heat output."
  },
  {
    id: 12,
    question: "How should insulation be installed below UFH pipes?",
    options: [
      "Insulation is optional",
      "25mm minimum insulation with foil facing upward",
      "50mm minimum insulation with perimeter strip",
      "100mm minimum without edge insulation"
    ],
    correctAnswer: 2,
    explanation: "A minimum of 50mm rigid insulation should be installed below UFH pipes with perimeter edge insulation strips. This minimises downward heat loss and ensures heat is directed upward into the room."
  }
];

const faqs = [
  {
    question: "Can underfloor heating work with heat pumps?",
    answer: "Yes, UFH is ideal for heat pumps due to its low operating temperatures. Air source heat pumps achieve optimal efficiency (COP 3-4) at 35-45°C flow temperatures, which is well within UFH operating range. The large floor area acts as a low-temperature radiator, maximising heat pump performance."
  },
  {
    question: "How do I calculate the number of UFH circuits required?",
    answer: "Divide the total floor area by the area covered by one circuit (typically 15-20m² for residential). Consider maximum circuit lengths (100m for 16mm pipe), zone requirements, and manifold capacity. Each zone requiring individual temperature control needs a separate circuit and actuator."
  },
  {
    question: "What happens if UFH pipes are damaged during construction?",
    answer: "PE-X pipes can be repaired using manufacturer-approved couplings, but joints should be avoided where possible. Damage should be identified during pressure testing (6 bar for 2 hours minimum) before screed is laid. Document any repairs in the system records."
  },
  {
    question: "How does UFH affect floor covering choices?",
    answer: "Floor coverings must have a combined tog value below 1.5 tog. Solid hardwood may require engineered alternatives due to expansion/contraction. Carpet and underlay must be UFH-rated. Vinyl and tiles work well but adhesives must be rated for higher temperatures."
  },
  {
    question: "What are the electrical requirements for UFH controls?",
    answer: "Zone actuators typically require 230V AC or 24V AC from a wiring centre. Room thermostats may be wired (230V or low voltage) or wireless. The wiring centre coordinates pump, boiler and zone valve operation. Always follow manufacturer wiring diagrams."
  },
  {
    question: "How long does underfloor heating take to respond to temperature changes?",
    answer: "Due to the thermal mass of the screed, UFH has a slow response time of 2-4 hours. This requires anticipating heating needs through programmable thermostats or weather compensation controls. Quick-response screeds (anhydrite) can reduce this to 1-2 hours."
  }
];

const HNCModule8Section1_3 = () => {
  useSEO(TITLE, DESCRIPTION);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section1">
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
            <Waves className="h-4 w-4" />
            <span>Module 8.1.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Underfloor Heating
          </h1>
          <p className="text-white/80">
            Wet UFH system design, manifold configuration, pipe layouts and commissioning for building services
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>UFH operates at:</strong> 35-55°C flow temperature</li>
              <li className="pl-1"><strong>Heat output:</strong> 80-100 W/m² typical</li>
              <li className="pl-1"><strong>Pipe spacing:</strong> 150-200mm centres</li>
              <li className="pl-1"><strong>Screed depth:</strong> 65-75mm minimum over pipes</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Zone control:</strong> Actuators and room thermostats</li>
              <li className="pl-1"><strong>Manifold:</strong> Central distribution and balancing</li>
              <li className="pl-1"><strong>Heat pump compatible:</strong> Ideal low-temp emitter</li>
              <li className="pl-1"><strong>Commissioning:</strong> 21-day screed cure + gradual heat-up</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand wet UFH system design principles and heat output calculations",
              "Specify manifold components and understand flow distribution",
              "Design pipe layouts using spiral and serpentine patterns",
              "Configure zone control systems with actuators and thermostats",
              "Specify screed requirements for thermal mass and floor finishes",
              "Commission UFH systems following correct curing and heat-up procedures"
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

        {/* Section 1: UFH Design Principles */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            UFH Design Principles
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Wet underfloor heating uses warm water circulating through pipes embedded in the floor structure
              to provide radiant heat. The large surface area allows operation at low temperatures, making UFH
              highly efficient and compatible with heat pumps and condensing boilers.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key design parameters:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Flow temperature:</strong> 35-55°C (lower with heat pumps)</li>
                <li className="pl-1"><strong>Return temperature:</strong> Typically 10°C below flow (delta T = 10K)</li>
                <li className="pl-1"><strong>Floor surface temperature:</strong> Maximum 29°C occupied areas, 35°C perimeter zones</li>
                <li className="pl-1"><strong>Heat output:</strong> 80-100 W/m² at 55°C flow, reducing at lower temperatures</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Heat Output Calculation</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Flow Temperature</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Output (W/m²)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">35°C</td>
                      <td className="border border-white/10 px-3 py-2">40-50 W/m²</td>
                      <td className="border border-white/10 px-3 py-2">Heat pump, Passivhaus</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">45°C</td>
                      <td className="border border-white/10 px-3 py-2">60-75 W/m²</td>
                      <td className="border border-white/10 px-3 py-2">Heat pump, well-insulated</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">55°C</td>
                      <td className="border border-white/10 px-3 py-2">80-100 W/m²</td>
                      <td className="border border-white/10 px-3 py-2">Boiler, standard insulation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">60°C</td>
                      <td className="border border-white/10 px-3 py-2">100-120 W/m²</td>
                      <td className="border border-white/10 px-3 py-2">High heat loss areas</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pipe Spacing and Heat Output</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Pipe Spacing</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Output Factor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">100mm</td>
                      <td className="border border-white/10 px-3 py-2">+20%</td>
                      <td className="border border-white/10 px-3 py-2">High heat loss, bathrooms</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">150mm</td>
                      <td className="border border-white/10 px-3 py-2">+10%</td>
                      <td className="border border-white/10 px-3 py-2">Perimeter zones, conservatories</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">200mm</td>
                      <td className="border border-white/10 px-3 py-2">Standard</td>
                      <td className="border border-white/10 px-3 py-2">Living areas, bedrooms</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">250-300mm</td>
                      <td className="border border-white/10 px-3 py-2">-10 to -15%</td>
                      <td className="border border-white/10 px-3 py-2">Low heat loss areas, corridors</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design principle:</strong> Heat output must exceed room heat loss. Calculate using Q = U × A × ΔT where Q is heat loss (W), U is U-value, A is area, and ΔT is inside-outside temperature difference.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Manifold Systems */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Manifold Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The manifold is the heart of a wet UFH system, distributing heated water to individual circuits
              and enabling zone control. Proper manifold specification and installation is critical for
              balanced, efficient operation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Manifold Components</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Flow bar:</strong> Distributes heated water with flow meters for balancing</li>
                <li className="pl-1"><strong>Return bar:</strong> Collects return water with isolation valves</li>
                <li className="pl-1"><strong>Actuator connections:</strong> Accepts thermal or electric actuators for zone control</li>
                <li className="pl-1"><strong>Isolation valves:</strong> Allow individual circuit shutdown</li>
                <li className="pl-1"><strong>Fill/drain valves:</strong> For system commissioning and maintenance</li>
                <li className="pl-1"><strong>Air vents:</strong> Automatic air release for de-aeration</li>
                <li className="pl-1"><strong>Temperature gauges:</strong> Flow and return temperature indication</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Manifold Sizing</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Residential:</strong> 2-12 port manifolds typical</li>
                  <li className="pl-1"><strong>Commercial:</strong> Multiple manifolds may be required</li>
                  <li className="pl-1"><strong>Flow capacity:</strong> Check maximum flow rate per port</li>
                  <li className="pl-1"><strong>Mounting:</strong> Wall-mounted cabinet or surface mounted</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Mixing Valve Options</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Thermostatic mixing:</strong> Fixed temperature, simple</li>
                  <li className="pl-1"><strong>3-port motorised:</strong> Weather compensation capable</li>
                  <li className="pl-1"><strong>Pump and mixing unit:</strong> Integrated solution</li>
                  <li className="pl-1"><strong>Direct connection:</strong> Heat pump at UFH temperature</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Flow Meter Reading and Balancing</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Circuit Size</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Flow Rate</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Flow Meter Range</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Small (10-15m²)</td>
                      <td className="border border-white/10 px-3 py-2">1.0-1.5 l/min</td>
                      <td className="border border-white/10 px-3 py-2">0.5-2.0 l/min</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Medium (15-20m²)</td>
                      <td className="border border-white/10 px-3 py-2">1.5-2.5 l/min</td>
                      <td className="border border-white/10 px-3 py-2">1.0-3.0 l/min</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Large (20-25m²)</td>
                      <td className="border border-white/10 px-3 py-2">2.5-3.5 l/min</td>
                      <td className="border border-white/10 px-3 py-2">2.0-4.0 l/min</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Flow rate formula:</strong> Q (l/min) = Heat output (W) ÷ (ΔT × 70). For a 1500W circuit with 10K ΔT: Q = 1500 ÷ (10 × 70) = 2.1 l/min
            </p>
          </div>
        </section>

        {/* Section 3: Pipe Layouts and Zone Control */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Pipe Layouts and Zone Control
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Pipe layout pattern affects heat distribution uniformity and installation complexity. Zone control
              enables individual room temperature regulation through actuators controlled by room thermostats.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pipe Layout Patterns</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5">
                  <p className="font-medium text-elec-yellow mb-2">Spiral (Snail) Pattern</p>
                  <ul className="text-sm space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Flow and return pipes alternate</li>
                    <li className="pl-1">Most uniform floor temperature</li>
                    <li className="pl-1">Preferred for occupied spaces</li>
                    <li className="pl-1">More complex to install</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <p className="font-medium text-elec-yellow mb-2">Serpentine Pattern</p>
                  <ul className="text-sm space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Simpler installation</li>
                    <li className="pl-1">Temperature gradient across floor</li>
                    <li className="pl-1">Suitable for smaller areas</li>
                    <li className="pl-1">Bi-directional reduces gradient</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Zone Control Components</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Thermal actuators:</strong> 230V or 24V, normally closed, 3-5 minute operation time</li>
                <li className="pl-1"><strong>Room thermostats:</strong> Digital, programmable, or smart thermostats with setback</li>
                <li className="pl-1"><strong>Wiring centre:</strong> Coordinates actuators, pump, and boiler demand</li>
                <li className="pl-1"><strong>Pump logic:</strong> Pump runs when any zone calls for heat</li>
                <li className="pl-1"><strong>Boiler interlock:</strong> Boiler fires only when pump running and zone demanding</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Actuator Wiring Configurations</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Actuator Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Voltage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Operation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Thermal wax</td>
                      <td className="border border-white/10 px-3 py-2">230V AC</td>
                      <td className="border border-white/10 px-3 py-2">NC, slow open</td>
                      <td className="border border-white/10 px-3 py-2">Most common, simple wiring</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Thermal wax</td>
                      <td className="border border-white/10 px-3 py-2">24V AC</td>
                      <td className="border border-white/10 px-3 py-2">NC, slow open</td>
                      <td className="border border-white/10 px-3 py-2">Safer, requires transformer</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Electric motor</td>
                      <td className="border border-white/10 px-3 py-2">230V AC</td>
                      <td className="border border-white/10 px-3 py-2">Fast, end switches</td>
                      <td className="border border-white/10 px-3 py-2">Position feedback available</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Wiring Centre Functions</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Receives demand signals from room thermostats</li>
                <li className="pl-1">Powers corresponding zone actuators</li>
                <li className="pl-1">Provides pump switched live when any zone is calling</li>
                <li className="pl-1">Provides boiler enable signal for interlock</li>
                <li className="pl-1">May include time clock for overall system scheduling</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Important:</strong> Zone valve actuators require adequate open time before the pump starts. Use a 2-minute pump delay or end-switch actuators to prevent pumping against closed valves.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Screed Requirements and Commissioning */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Screed Requirements and Commissioning
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The floor screed provides thermal mass for even heat distribution and structural support for floor finishes.
              Proper screed specification and curing is essential before UFH commissioning can begin.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Screed Types and Characteristics</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Screed Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Depth Over Pipes</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Curing Time</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Characteristics</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Sand/cement</td>
                      <td className="border border-white/10 px-3 py-2">65-75mm</td>
                      <td className="border border-white/10 px-3 py-2">21 days minimum</td>
                      <td className="border border-white/10 px-3 py-2">Traditional, high thermal mass</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Anhydrite (calcium sulphate)</td>
                      <td className="border border-white/10 px-3 py-2">30-35mm</td>
                      <td className="border border-white/10 px-3 py-2">7-14 days</td>
                      <td className="border border-white/10 px-3 py-2">Self-levelling, faster response</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Thin screed/tile adhesive</td>
                      <td className="border border-white/10 px-3 py-2">15-20mm</td>
                      <td className="border border-white/10 px-3 py-2">24-48 hours</td>
                      <td className="border border-white/10 px-3 py-2">Fast response, low thermal mass</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Floor Covering Thermal Resistance</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Floor Covering</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Tog Value</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Suitability</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ceramic/porcelain tiles</td>
                      <td className="border border-white/10 px-3 py-2">0.05-0.1 tog</td>
                      <td className="border border-white/10 px-3 py-2">Excellent</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Natural stone</td>
                      <td className="border border-white/10 px-3 py-2">0.1-0.2 tog</td>
                      <td className="border border-white/10 px-3 py-2">Excellent</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Engineered wood</td>
                      <td className="border border-white/10 px-3 py-2">0.5-0.7 tog</td>
                      <td className="border border-white/10 px-3 py-2">Good (check max temp)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Laminate</td>
                      <td className="border border-white/10 px-3 py-2">0.5-1.0 tog</td>
                      <td className="border border-white/10 px-3 py-2">Good (UFH rated)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Carpet + underlay</td>
                      <td className="border border-white/10 px-3 py-2">1.0-2.5 tog</td>
                      <td className="border border-white/10 px-3 py-2">Limited (&lt;1.5 tog total)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Commissioning Procedure</p>
              <ol className="text-sm text-white space-y-2 list-decimal list-outside ml-5">
                <li className="pl-1"><strong>Pre-screed pressure test:</strong> 6 bar for 2 hours minimum, record any pressure drop</li>
                <li className="pl-1"><strong>Maintain pressure during screeding:</strong> 2-3 bar whilst screed is laid</li>
                <li className="pl-1"><strong>Screed curing period:</strong> 21 days for sand/cement, 7-14 days for anhydrite</li>
                <li className="pl-1"><strong>System flush:</strong> Flush with mains water until clear, check for debris</li>
                <li className="pl-1"><strong>Fill and pressurise:</strong> Fill with inhibited water, pressurise to 2.5 bar</li>
                <li className="pl-1"><strong>Initial heat-up:</strong> Start at 20°C, increase 5°C per day until design temperature</li>
                <li className="pl-1"><strong>Flow balancing:</strong> Adjust flow meters to achieve design rates</li>
                <li className="pl-1"><strong>Zone commissioning:</strong> Test each thermostat and actuator operation</li>
                <li className="pl-1"><strong>Documentation:</strong> Record flow rates, temperatures, and test results</li>
              </ol>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-red-400/80 mb-2">Critical Installation Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Insulation:</strong> Minimum 50mm PIR/EPS below pipes with edge insulation strips</li>
                <li className="pl-1"><strong>Pipe clips:</strong> Secure at maximum 500mm centres, closer on bends</li>
                <li className="pl-1"><strong>Movement joints:</strong> Pipes must pass through movement joints in protective sleeves</li>
                <li className="pl-1"><strong>No joints:</strong> Continuous pipe runs with no underground joints</li>
                <li className="pl-1"><strong>Oxygen barrier:</strong> PE-X pipe must have integral oxygen barrier layer</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Important:</strong> Never exceed 5°C temperature increase per day during commissioning. Rapid heating can cause screed cracking and permanent damage to the floor structure.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: UFH Circuit Sizing</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A living room measures 5m × 4m with a heat loss of 50 W/m². Calculate the required UFH circuits.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Floor area = 5m × 4m = 20m²</p>
                <p>Heat requirement = 20m² × 50 W/m² = <strong>1000W</strong></p>
                <p className="mt-2">Pipe length at 200mm spacing:</p>
                <p>Length = (Area / Spacing) + Manifold run</p>
                <p>Length = (20 / 0.2) + 10m = 110m</p>
                <p className="mt-2 text-white/60">&gt; 100m maximum for 16mm pipe</p>
                <p className="mt-2 text-green-400">Solution: Split into 2 circuits of ~55m each</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Flow Rate Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Calculate the required flow rate for a UFH circuit delivering 1500W with 10K temperature differential.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Using Q = P ÷ (ΔT × c × ρ)</p>
                <p>Where c × ρ ≈ 70 for water</p>
                <p className="mt-2">Q = 1500 ÷ (10 × 70)</p>
                <p>Q = 1500 ÷ 700 = <strong>2.14 l/min</strong></p>
                <p className="mt-2 text-white/60">Set flow meter to 2.1-2.2 l/min during commissioning</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Heat Pump Temperature Selection</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A room requires 60 W/m² output. What flow temperature is needed and is it suitable for a heat pump?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>From heat output tables at 200mm spacing:</p>
                <p>45°C flow gives ~60-70 W/m²</p>
                <p className="mt-2">Heat pump COP at 45°C: typically 2.8-3.2</p>
                <p className="mt-2 text-green-400">✓ Suitable for heat pump operation</p>
                <p className="text-white/60 mt-2">At 55°C: COP drops to 2.2-2.6</p>
                <p className="text-white/60">At 35°C: COP improves to 3.5-4.0 but output only 40-50 W/m²</p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-elec-yellow" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors"
              >
                <button
                  className="w-full p-4 text-left flex items-center justify-between touch-manipulation"
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                >
                  <span className="font-medium text-white pr-4">{faq.question}</span>
                  {openFAQ === index ? (
                    <ChevronUp className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                  )}
                </button>

                {openFAQ === index && (
                  <div className="px-4 pb-4">
                    <div className="bg-black/30 p-4 rounded border border-white/10">
                      <p className="text-white/90 text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                )}
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
                <p className="font-medium text-white mb-1">UFH Design Parameters</p>
                <ul className="space-y-0.5">
                  <li>Flow temperature: 35-55°C</li>
                  <li>Delta T: 10K typical</li>
                  <li>Max floor surface: 29°C occupied</li>
                  <li>Heat output: 80-100 W/m² at 55°C</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Installation Requirements</p>
                <ul className="space-y-0.5">
                  <li>Pipe spacing: 150-200mm centres</li>
                  <li>Max circuit: 100m (16mm PE-X)</li>
                  <li>Screed depth: 65mm+ over pipes</li>
                  <li>Floor covering: &lt;1.5 tog total</li>
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
            <Link to="../h-n-c-module8-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section1-4">
              Next: Radiator Systems
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule8Section1_3;
