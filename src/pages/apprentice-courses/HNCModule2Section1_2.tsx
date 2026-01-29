import { ArrowLeft, Thermometer, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Convection Heat Transfer - HNC Module 2 Section 1.2";
const DESCRIPTION = "Master convection heat transfer for building services: Newton's Law of Cooling, natural and forced convection, heat transfer coefficients, and practical applications in radiators, heating coils and ventilation systems.";

const quickCheckQuestions = [
  {
    id: "newton-cooling",
    question: "What does Newton's Law of Cooling state about heat transfer rate?",
    options: ["Q = kA(ΔT/L)", "Q = hA(Ts - T∞)", "Q = εσAT⁴", "Q = mcΔT"],
    correctIndex: 1,
    explanation: "Newton's Law of Cooling states Q = hA(Ts - T∞), where h is the heat transfer coefficient, A is the surface area, and (Ts - T∞) is the temperature difference between the surface and the surrounding fluid."
  },
  {
    id: "natural-convection",
    question: "What drives natural (free) convection?",
    options: ["External fans or pumps", "Density differences due to temperature gradients", "Electromagnetic forces", "Pressure differences from compressors"],
    correctIndex: 1,
    explanation: "Natural convection is driven by buoyancy forces resulting from density differences caused by temperature gradients. Warm fluid rises (less dense) while cooler fluid sinks (more dense), creating circulation without mechanical assistance."
  },
  {
    id: "forced-convection",
    question: "Which building services application primarily uses forced convection?",
    options: ["Panel radiators on walls", "Solar chimney ventilation", "Fan coil units", "Trombe walls"],
    correctIndex: 2,
    explanation: "Fan coil units use forced convection where a fan actively moves air across heating or cooling coils. Panel radiators, solar chimneys and Trombe walls rely primarily on natural convection."
  },
  {
    id: "h-value",
    question: "What is the typical heat transfer coefficient (h) for forced air convection?",
    options: ["5-25 W/m²K", "25-250 W/m²K", "500-10,000 W/m²K", "50,000-100,000 W/m²K"],
    correctIndex: 1,
    explanation: "Forced air convection typically has h values of 25-250 W/m²K. Natural convection in air is lower (5-25 W/m²K), while water-based systems have much higher values (500-10,000 W/m²K for forced water convection)."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is convection?",
    options: [
      "Heat transfer through direct molecular contact in solids",
      "Heat transfer by electromagnetic waves",
      "Heat transfer by fluid motion (liquid or gas)",
      "Heat transfer through a vacuum"
    ],
    correctAnswer: 2,
    explanation: "Convection is heat transfer that occurs through the bulk movement of fluids (liquids or gases). It combines diffusion with advection (bulk fluid motion)."
  },
  {
    id: 2,
    question: "A radiator surface at 70°C transfers heat to room air at 20°C. If h = 10 W/m²K and the surface area is 2m², what is the heat transfer rate?",
    options: ["100W", "500W", "1000W", "1400W"],
    correctAnswer: 2,
    explanation: "Using Q = hA(Ts - T∞): Q = 10 × 2 × (70 - 20) = 10 × 2 × 50 = 1000W"
  },
  {
    id: 3,
    question: "What is the primary mechanism that creates natural convection currents?",
    options: [
      "Pressure from mechanical fans",
      "Buoyancy forces from density differences",
      "Electromagnetic radiation",
      "Phase change of refrigerants"
    ],
    correctAnswer: 1,
    explanation: "Natural convection is driven by buoyancy forces. Heated fluid becomes less dense and rises, while cooler, denser fluid sinks. This creates circulation patterns without mechanical assistance."
  },
  {
    id: 4,
    question: "Why do forced convection systems typically have higher heat transfer rates than natural convection?",
    options: [
      "They operate at higher temperatures",
      "They use better insulation",
      "Higher fluid velocities increase the heat transfer coefficient",
      "They use different fluids"
    ],
    correctAnswer: 2,
    explanation: "Forced convection achieves higher heat transfer rates because the increased fluid velocity enhances mixing and reduces the thermal boundary layer thickness, significantly increasing the heat transfer coefficient (h)."
  },
  {
    id: 5,
    question: "What is surface film resistance in building heat transfer calculations?",
    options: [
      "The resistance of surface paint to heat flow",
      "The thermal resistance of the air layer adjacent to a surface (Rsi, Rso)",
      "The resistance of insulation materials",
      "The resistance of the wall structure"
    ],
    correctAnswer: 1,
    explanation: "Surface film resistance (Rsi for internal, Rso for external) represents the thermal resistance of the thin air layer that forms on surfaces. It equals 1/h, where h is the convective heat transfer coefficient."
  },
  {
    id: 6,
    question: "What are typical internal and external surface resistances used in UK U-value calculations?",
    options: [
      "Rsi = 0.04 m²K/W, Rso = 0.13 m²K/W",
      "Rsi = 0.13 m²K/W, Rso = 0.04 m²K/W",
      "Rsi = 0.25 m²K/W, Rso = 0.25 m²K/W",
      "Rsi = 0.10 m²K/W, Rso = 0.10 m²K/W"
    ],
    correctAnswer: 1,
    explanation: "Standard values are Rsi = 0.13 m²K/W (internal) and Rso = 0.04 m²K/W (external). The external value is lower because higher wind speeds increase the heat transfer coefficient, reducing thermal resistance."
  },
  {
    id: 7,
    question: "A heating coil transfers 5kW with a surface area of 0.5m² and temperature difference of 40K. What is the heat transfer coefficient?",
    options: ["50 W/m²K", "100 W/m²K", "250 W/m²K", "500 W/m²K"],
    correctAnswer: 2,
    explanation: "Rearranging Q = hAΔT: h = Q/(AΔT) = 5000/(0.5 × 40) = 5000/20 = 250 W/m²K"
  },
  {
    id: 8,
    question: "Which statement about panel radiators is correct?",
    options: [
      "They transfer heat primarily by radiation (>70%)",
      "They transfer heat primarily by convection (50-70%)",
      "They only work with forced air circulation",
      "They require fan assistance to operate"
    ],
    correctAnswer: 1,
    explanation: "Despite the name 'radiator', panel radiators transfer 50-70% of their heat output by natural convection and only 30-50% by radiation. The fins create channels that enhance convective air flow."
  },
  {
    id: 9,
    question: "In a naturally ventilated building, what causes the 'stack effect'?",
    options: [
      "Wind pressure on the building facade",
      "Mechanical extract fans at roof level",
      "Temperature difference between inside and outside creating buoyancy-driven airflow",
      "Pressure from the HVAC system"
    ],
    correctAnswer: 2,
    explanation: "The stack effect is caused by the temperature difference between inside and outside air. Warmer indoor air is less dense and rises, creating a pressure difference that draws in cooler air at lower levels and exhausts warmer air at higher levels."
  },
  {
    id: 10,
    question: "Why is the heat transfer coefficient for water convection much higher than for air?",
    options: [
      "Water is hotter than air",
      "Water has higher thermal conductivity and specific heat capacity",
      "Water flows faster than air",
      "Water has lower viscosity"
    ],
    correctAnswer: 1,
    explanation: "Water has approximately 25 times higher thermal conductivity and 4 times higher volumetric heat capacity than air. This allows water to transfer heat much more effectively, resulting in h values 20-100 times higher than air."
  },
  {
    id: 11,
    question: "A fan coil unit increases air velocity from 0.5 m/s to 3 m/s over the heating coil. What effect does this have?",
    options: [
      "Heat transfer decreases due to reduced contact time",
      "Heat transfer coefficient increases, improving heat output",
      "No change - temperature difference determines heat transfer",
      "Heat transfer only changes if coil temperature changes"
    ],
    correctAnswer: 1,
    explanation: "Increasing air velocity increases the heat transfer coefficient (h) by enhancing mixing and reducing the thermal boundary layer. This significantly increases the heat transfer rate from the coil to the air, improving the unit's heating capacity."
  },
  {
    id: 12,
    question: "What is the relationship between surface film resistance (R) and heat transfer coefficient (h)?",
    options: [
      "R = h × A",
      "R = 1/h",
      "R = h/A",
      "R = h²"
    ],
    correctAnswer: 1,
    explanation: "Surface film resistance R = 1/h (m²K/W). This inverse relationship means higher heat transfer coefficients result in lower thermal resistance. For example, if h = 25 W/m²K, then R = 1/25 = 0.04 m²K/W."
  }
];

const faqs = [
  {
    question: "Why are panel radiators called 'radiators' when they mainly work by convection?",
    answer: "The name is historical - early heating devices did transfer heat primarily by radiation. Modern panel radiators with convector fins actually transfer 50-70% of heat by convection. The warm panels create upward air currents that circulate room air. Some manufacturers now market them as 'convector radiators' to be more accurate."
  },
  {
    question: "How does the position of a radiator affect its performance?",
    answer: "Position significantly affects convective performance. Radiators work best under windows where they counteract cold downdraughts and promote good air circulation. Placing a radiator behind furniture or installing a deep windowsill above it restricts airflow and can reduce output by 10-20%. Wall-mounted radiators need adequate clearance above and below for natural convection."
  },
  {
    question: "What is the difference between the Nusselt number and the heat transfer coefficient?",
    answer: "The Nusselt number (Nu) is a dimensionless ratio that characterises convective heat transfer: Nu = hL/k, where h is the heat transfer coefficient, L is a characteristic length, and k is the fluid's thermal conductivity. Engineers use Nu correlations to calculate h for different flow conditions. A higher Nu indicates more effective convection relative to pure conduction."
  },
  {
    question: "Why do underfloor heating systems operate at lower temperatures than radiators?",
    answer: "Underfloor heating has a much larger surface area for heat transfer compared to radiators. Using Q = hAΔT, a larger A allows the same heat output with a smaller temperature difference (ΔT). This enables flow temperatures of 35-45°C compared to 70-80°C for radiators, making underfloor heating ideal for heat pumps which perform better at lower temperatures."
  },
  {
    question: "How do I account for convection in U-value calculations?",
    answer: "Surface film resistances account for convective heat transfer at wall surfaces. Add internal surface resistance (Rsi = 0.13 m²K/W for horizontal heat flow) and external surface resistance (Rso = 0.04 m²K/W for exposed walls) to the material resistances. Total R = Rsi + ΣR(materials) + Rso, then U = 1/R."
  },
  {
    question: "What factors affect the heat transfer coefficient in practical systems?",
    answer: "Key factors include: fluid velocity (higher = higher h), fluid properties (thermal conductivity, viscosity, density), surface geometry (fins increase effective area), surface roughness (can enhance turbulence), and flow regime (turbulent flow has higher h than laminar). Temperature also affects fluid properties, influencing h indirectly."
  }
];

const HNCModule2Section1_2 = () => {
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
            <span>Module 2.1.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Convection Heat Transfer
          </h1>
          <p className="text-white/80">
            Understanding heat transfer by fluid motion for heating, cooling and ventilation system design
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Convection:</strong> Heat transfer by fluid motion (liquids/gases)</li>
              <li className="pl-1"><strong>Newton's Law:</strong> Q = hA(Ts - T∞)</li>
              <li className="pl-1"><strong>Natural:</strong> Buoyancy-driven (radiators, stack effect)</li>
              <li className="pl-1"><strong>Forced:</strong> Fan/pump-driven (FCUs, AHUs)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Radiators:</strong> 50-70% heat by convection</li>
              <li className="pl-1"><strong>Surface resistance:</strong> Rsi = 0.13, Rso = 0.04 m²K/W</li>
              <li className="pl-1"><strong>Fan coils:</strong> Forced convection heating/cooling</li>
              <li className="pl-1"><strong>Ventilation:</strong> Stack effect, natural vs mechanical</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply Newton's Law of Cooling to calculate convective heat transfer",
              "Distinguish between natural and forced convection mechanisms",
              "Use appropriate heat transfer coefficients for different applications",
              "Calculate surface film resistance and its role in U-values",
              "Analyse convection in radiators, heating coils and ventilation",
              "Size heating and cooling equipment using convection principles"
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

        {/* Section 1: Newton's Law of Cooling */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Newton's Law of Cooling
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Newton's Law of Cooling describes the rate of heat transfer between a surface and a
              moving fluid. It is the fundamental equation for all convective heat transfer
              calculations in building services.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Newton's Law of Cooling</p>
              <p className="font-mono text-center text-lg mb-2">Q = hA(T<sub>s</sub> - T<sub>∞</sub>)</p>
              <div className="text-sm text-white/80 space-y-1">
                <p><strong>Q</strong> = Heat transfer rate (W)</p>
                <p><strong>h</strong> = Heat transfer coefficient (W/m²K)</p>
                <p><strong>A</strong> = Surface area (m²)</p>
                <p><strong>T<sub>s</sub></strong> = Surface temperature (°C or K)</p>
                <p><strong>T<sub>∞</sub></strong> = Bulk fluid temperature (°C or K)</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key principles:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Heat transfer is proportional to the temperature difference</li>
                <li className="pl-1">Larger surface areas transfer more heat</li>
                <li className="pl-1">The coefficient h characterises the effectiveness of convection</li>
                <li className="pl-1">h depends on fluid properties, velocity, and geometry</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Worked Example</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A panel radiator has a surface area of 1.8m², operates at 65°C
                in a room at 21°C, with h = 8 W/m²K. Calculate the convective heat output.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Q = hA(Ts - T∞)</p>
                <p>Q = 8 × 1.8 × (65 - 21)</p>
                <p>Q = 8 × 1.8 × 44</p>
                <p>Q = <strong>633.6W convective</strong></p>
                <p className="mt-2 text-white/60">This is the convective component; add radiant output for total</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> The temperature difference drives heat transfer - increasing supply temperature
              or reducing room temperature increases output.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Natural (Free) Convection */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Natural (Free) Convection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Natural convection occurs when fluid motion is driven by buoyancy forces resulting from
              density differences. Temperature gradients cause density variations - warm fluid rises
              while cooler fluid sinks, creating circulation without mechanical assistance.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The mechanism:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Fluid near a hot surface heats up and expands</li>
                <li className="pl-1">Expanded fluid becomes less dense than surrounding cooler fluid</li>
                <li className="pl-1">Buoyancy force causes warm fluid to rise</li>
                <li className="pl-1">Cooler, denser fluid moves in to replace it</li>
                <li className="pl-1">This creates continuous circulation (convection currents)</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Services Examples</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Panel radiators:</strong> Create rising warm air columns</li>
                  <li className="pl-1"><strong>Stack effect:</strong> Warm air rises through buildings</li>
                  <li className="pl-1"><strong>Natural ventilation:</strong> Temperature-driven airflow</li>
                  <li className="pl-1"><strong>Trombe walls:</strong> Passive solar heating</li>
                  <li className="pl-1"><strong>Solar chimneys:</strong> Buoyancy-driven extract</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical h Values (Air)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Vertical surfaces:</strong> 5-10 W/m²K</li>
                  <li className="pl-1"><strong>Horizontal (hot up):</strong> 6-12 W/m²K</li>
                  <li className="pl-1"><strong>Horizontal (hot down):</strong> 2-5 W/m²K</li>
                  <li className="pl-1"><strong>Enclosed air gaps:</strong> 3-8 W/m²K</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Stack Effect</p>
              <p className="text-sm text-white mb-3">
                In buildings, the stack effect describes buoyancy-driven airflow caused by temperature
                differences between inside and outside. The driving pressure is:
              </p>
              <div className="bg-white/5 p-3 rounded text-center">
                <p className="font-mono">ΔP = ρg·h·(T<sub>i</sub> - T<sub>o</sub>)/T<sub>o</sub></p>
                <p className="text-xs text-white/60 mt-1">Where h = height, ρ = air density, g = gravity</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design tip:</strong> In winter, warm internal air creates positive pressure at high level
              and negative pressure at low level, drawing in cold air through lower openings.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Forced Convection */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Forced Convection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Forced convection occurs when fluid motion is driven by external means such as fans,
              pumps, or blowers. The increased fluid velocity significantly enhances heat transfer
              compared to natural convection.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Why forced convection is more effective:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Higher fluid velocities increase the heat transfer coefficient</li>
                <li className="pl-1">Reduces thermal boundary layer thickness</li>
                <li className="pl-1">Increases mixing and turbulence</li>
                <li className="pl-1">Allows compact heat exchanger designs</li>
                <li className="pl-1">Provides controllable and predictable heat transfer</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Heat Transfer Coefficients - Forced Convection</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Fluid/System</th>
                      <th className="border border-white/10 px-3 py-2 text-left">h (W/m²K)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Air (low velocity)</td>
                      <td className="border border-white/10 px-3 py-2">25-50</td>
                      <td className="border border-white/10 px-3 py-2">Fan coil units, AHUs</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Air (high velocity)</td>
                      <td className="border border-white/10 px-3 py-2">50-250</td>
                      <td className="border border-white/10 px-3 py-2">Industrial cooling, car radiators</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Water (pipes)</td>
                      <td className="border border-white/10 px-3 py-2">500-3,000</td>
                      <td className="border border-white/10 px-3 py-2">Heating circuits</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Water (turbulent)</td>
                      <td className="border border-white/10 px-3 py-2">3,000-10,000</td>
                      <td className="border border-white/10 px-3 py-2">Heat exchangers</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Boiling water</td>
                      <td className="border border-white/10 px-3 py-2">2,500-25,000</td>
                      <td className="border border-white/10 px-3 py-2">Boilers, evaporators</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Condensing steam</td>
                      <td className="border border-white/10 px-3 py-2">5,000-100,000</td>
                      <td className="border border-white/10 px-3 py-2">Steam heating coils</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Services Examples</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Fan coil units:</strong> Fans move air over coils</li>
                  <li className="pl-1"><strong>AHUs:</strong> Supply/extract air handling</li>
                  <li className="pl-1"><strong>Chilled beams:</strong> Induced air circulation</li>
                  <li className="pl-1"><strong>Heat pumps:</strong> Refrigerant circulation</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Advantages</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Higher heat transfer rates</li>
                  <li className="pl-1">Smaller equipment for same output</li>
                  <li className="pl-1">Precise temperature control</li>
                  <li className="pl-1">Works against natural gradients</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Energy trade-off:</strong> Forced convection requires fan/pump energy but enables
              compact equipment and precise control - often more efficient overall than oversized natural convection systems.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Surface Film Resistance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Surface Film Resistance and Heat Transfer Coefficients
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When heat flows from a surface to a fluid (or vice versa), a thin layer of relatively
              still fluid forms at the surface. This creates a thermal resistance called the surface
              film resistance, crucial for U-value calculations.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Relationship Between h and R</p>
              <p className="font-mono text-center text-lg mb-2">R<sub>s</sub> = 1/h</p>
              <div className="text-sm text-white/80 space-y-1">
                <p><strong>R<sub>s</sub></strong> = Surface film resistance (m²K/W)</p>
                <p><strong>h</strong> = Convective heat transfer coefficient (W/m²K)</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Standard Surface Resistances (BS EN ISO 6946)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Surface</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Direction of Heat Flow</th>
                      <th className="border border-white/10 px-3 py-2 text-left">R (m²K/W)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Equivalent h (W/m²K)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Internal (Rsi)</td>
                      <td className="border border-white/10 px-3 py-2">Horizontal</td>
                      <td className="border border-white/10 px-3 py-2">0.13</td>
                      <td className="border border-white/10 px-3 py-2">7.7</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Internal (Rsi)</td>
                      <td className="border border-white/10 px-3 py-2">Upward</td>
                      <td className="border border-white/10 px-3 py-2">0.10</td>
                      <td className="border border-white/10 px-3 py-2">10.0</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Internal (Rsi)</td>
                      <td className="border border-white/10 px-3 py-2">Downward</td>
                      <td className="border border-white/10 px-3 py-2">0.17</td>
                      <td className="border border-white/10 px-3 py-2">5.9</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">External (Rso)</td>
                      <td className="border border-white/10 px-3 py-2">Any direction</td>
                      <td className="border border-white/10 px-3 py-2">0.04</td>
                      <td className="border border-white/10 px-3 py-2">25.0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">U-Value Calculation Including Surface Resistances</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Calculate the U-value of a wall: 102mm brick (k=0.77), 50mm cavity (R=0.18),
                100mm block (k=0.19), 12.5mm plasterboard (k=0.16).
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Total R = Rsi + R(brick) + R(cavity) + R(block) + R(plaster) + Rso</p>
                <p className="mt-1">R(brick) = 0.102/0.77 = 0.132 m²K/W</p>
                <p>R(cavity) = 0.18 m²K/W (from tables)</p>
                <p>R(block) = 0.100/0.19 = 0.526 m²K/W</p>
                <p>R(plaster) = 0.0125/0.16 = 0.078 m²K/W</p>
                <p className="mt-1">Total R = 0.13 + 0.132 + 0.18 + 0.526 + 0.078 + 0.04</p>
                <p>Total R = <strong>1.086 m²K/W</strong></p>
                <p className="mt-1">U = 1/R = 1/1.086 = <strong>0.92 W/m²K</strong></p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Why Rso is lower than Rsi:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">External surfaces are exposed to wind</li>
                <li className="pl-1">Higher air velocities increase convective heat transfer (higher h)</li>
                <li className="pl-1">Higher h means lower thermal resistance (R = 1/h)</li>
                <li className="pl-1">Rso = 0.04 implies h ≈ 25 W/m²K (forced convection)</li>
                <li className="pl-1">Rsi = 0.13 implies h ≈ 7.7 W/m²K (natural convection)</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Exam tip:</strong> Always include Rsi and Rso in U-value calculations. Forgetting surface
              resistances typically underestimates R by 0.17 m²K/W (about 15-20% for modern insulated walls).
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Building Services Applications */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Building Services Applications</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Panel Radiators</h3>
              <p className="text-sm text-white mb-3">
                Despite their name, panel radiators transfer 50-70% of heat by convection. The panel
                warms adjacent air, which rises and is replaced by cooler air from below.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Convector fins:</strong> Increase surface area and enhance convection</li>
                <li className="pl-1"><strong>Type 11:</strong> Single panel, single convector (~60% convection)</li>
                <li className="pl-1"><strong>Type 22:</strong> Double panel, double convector (~70% convection)</li>
                <li className="pl-1"><strong>Positioning:</strong> Under windows to counter cold downdraughts</li>
                <li className="pl-1"><strong>Output correction:</strong> Reduce by 10-15% if airflow restricted</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Heating and Cooling Coils</h3>
              <p className="text-sm text-white mb-3">
                Coils in AHUs and fan coil units use forced convection to transfer heat between
                air and water/refrigerant. Design involves optimising the heat transfer coefficient.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90 mb-3">
                <p>Coil capacity: Q = U × A × LMTD</p>
                <p className="text-white/60 text-xs mt-1">Where LMTD = Log Mean Temperature Difference</p>
              </div>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Fin spacing:</strong> Closer fins = more area but higher pressure drop</li>
                <li className="pl-1"><strong>Face velocity:</strong> 2-3 m/s typical, affects h and pressure drop</li>
                <li className="pl-1"><strong>Rows deep:</strong> More rows = more capacity but diminishing returns</li>
                <li className="pl-1"><strong>Water velocity:</strong> 0.5-2 m/s for turbulent flow in tubes</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Natural Ventilation</h3>
              <p className="text-sm text-white mb-3">
                Natural ventilation relies on buoyancy (stack effect) and wind to move air through
                buildings without mechanical systems.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Stack effect:</strong> Height × temperature difference drives flow</li>
                <li className="pl-1"><strong>Cross-ventilation:</strong> Wind creates pressure differences</li>
                <li className="pl-1"><strong>Atria:</strong> Tall spaces enhance stack-driven ventilation</li>
                <li className="pl-1"><strong>Night cooling:</strong> Purge heat using cool night air</li>
                <li className="pl-1"><strong>Solar chimneys:</strong> Sun heats air to enhance buoyancy</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Radiator Output</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A Type 22 radiator (1.4m × 0.6m, both sides exposed) operates at
                mean water temperature 60°C in a room at 20°C. Given h = 10 W/m²K for convection,
                estimate the convective heat output assuming 65% of total output is convective.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Effective surface area (both panels): A = 2 × (1.4 × 0.6) = 1.68m²</p>
                <p>Temperature difference: ΔT = 60 - 20 = 40K</p>
                <p className="mt-2">Convective output: Q = hAΔT</p>
                <p>Q = 10 × 1.68 × 40 = <strong>672W convective</strong></p>
                <p className="mt-2">If this is 65% of total:</p>
                <p>Total output = 672/0.65 = <strong>~1034W total</strong></p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Heating Coil Sizing</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A heating coil must raise 1.5 m³/s of air from 5°C to 22°C.
                LTHW at 80/60°C is available. If overall U = 45 W/m²K and LMTD = 52K, what coil area is required?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Heat required: Q = ṁ × cp × ΔT</p>
                <p>Q = (1.5 × 1.2) × 1.005 × (22-5)</p>
                <p className="text-white/60 text-xs">(ρ = 1.2 kg/m³, cp = 1.005 kJ/kgK)</p>
                <p>Q = 1.8 × 1.005 × 17 = 30.75 kW = <strong>30,750W</strong></p>
                <p className="mt-2">Coil area: A = Q/(U × LMTD)</p>
                <p>A = 30750/(45 × 52) = 30750/2340</p>
                <p>A = <strong>13.1 m² coil face area</strong></p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Stack Effect Ventilation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> An atrium is 15m tall. Indoor temperature is 22°C, outdoor is 5°C.
                Estimate the stack pressure driving natural ventilation.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>ΔP = ρ × g × h × (Ti - To)/To</p>
                <p className="text-white/60 text-xs">Using ρ = 1.2 kg/m³, g = 9.81 m/s², To in Kelvin</p>
                <p className="mt-2">ΔP = 1.2 × 9.81 × 15 × (22-5)/(273+5)</p>
                <p>ΔP = 176.6 × 17/278</p>
                <p>ΔP = <strong>10.8 Pa</strong></p>
                <p className="mt-2 text-white/60">This pressure difference drives airflow through openings</p>
              </div>
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
                <p className="font-medium text-white mb-1">Key Equations</p>
                <ul className="space-y-0.5">
                  <li>Newton's Law: Q = hA(Ts - T∞)</li>
                  <li>Surface resistance: Rs = 1/h</li>
                  <li>Total R = Rsi + ΣRmaterials + Rso</li>
                  <li>U-value: U = 1/Rtotal</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Standard Values</p>
                <ul className="space-y-0.5">
                  <li>Internal surface: Rsi = 0.13 m²K/W</li>
                  <li>External surface: Rso = 0.04 m²K/W</li>
                  <li>Natural air: h = 5-25 W/m²K</li>
                  <li>Forced air: h = 25-250 W/m²K</li>
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
            <Link to="../h-n-c-module2-section1-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Conduction
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2-section1-3">
              Next: Radiation
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule2Section1_2;
