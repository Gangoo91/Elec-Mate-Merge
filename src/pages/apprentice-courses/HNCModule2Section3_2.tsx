import { ArrowLeft, Droplets, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Humidity and Moisture Content - HNC Module 2 Section 3.2";
const DESCRIPTION = "Master relative humidity, specific humidity, dew point temperature, wet bulb measurement and saturation conditions for HVAC psychrometric analysis.";

const quickCheckQuestions = [
  {
    id: "rh-definition",
    question: "What does 50% relative humidity mean?",
    options: [
      "Air contains 50% water by mass",
      "Air holds half the moisture it could at that temperature",
      "The dew point is at 50% of the dry bulb temperature",
      "Wet bulb is 50% lower than dry bulb"
    ],
    correctIndex: 1,
    explanation: "Relative humidity is the ratio of actual water vapour pressure to the saturation vapour pressure at that temperature. 50% RH means the air holds half the maximum possible moisture at that dry bulb temperature."
  },
  {
    id: "moisture-content",
    question: "What are typical units for moisture content (specific humidity) in HVAC?",
    options: ["% RH", "g/kg (grams per kg dry air)", "°C", "kPa"],
    correctIndex: 1,
    explanation: "Moisture content (specific humidity) is expressed as g/kg - grams of water vapour per kilogram of dry air. This absolute measure remains constant during sensible heating/cooling processes."
  },
  {
    id: "dew-point",
    question: "What happens when air is cooled to its dew point temperature?",
    options: [
      "The air expands",
      "Condensation begins to form",
      "Relative humidity drops to 0%",
      "Pressure increases"
    ],
    correctIndex: 1,
    explanation: "At dew point temperature, the air becomes saturated (100% RH). Any further cooling causes water vapour to condense out as liquid water (dew, mist, or condensation on surfaces)."
  },
  {
    id: "wet-bulb",
    question: "Why is wet bulb temperature always lower than or equal to dry bulb temperature?",
    options: [
      "The thermometer is less accurate",
      "Evaporation from the wet wick causes cooling",
      "Water has a higher specific heat",
      "The sensor measures radiation"
    ],
    correctIndex: 1,
    explanation: "Evaporation from the wet wick requires latent heat, which is drawn from the surrounding air, cooling the thermometer. At 100% RH, no evaporation occurs and wet bulb equals dry bulb."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Relative humidity is defined as:",
    options: [
      "The mass of water vapour per unit mass of dry air",
      "The ratio of actual vapour pressure to saturation vapour pressure",
      "The temperature at which condensation occurs",
      "The difference between wet and dry bulb temperatures"
    ],
    correctAnswer: 1,
    explanation: "Relative humidity (RH) = (pv / ps) × 100%, where pv is the actual partial pressure of water vapour and ps is the saturation pressure at that temperature."
  },
  {
    id: 2,
    question: "If air at 25°C has a moisture content of 10 g/kg and can hold a maximum of 20 g/kg at saturation, what is the relative humidity?",
    options: ["25%", "50%", "75%", "100%"],
    correctAnswer: 1,
    explanation: "RH ≈ (actual moisture / saturation moisture) × 100% = (10/20) × 100% = 50%. Note: This is an approximation; precise calculation uses vapour pressures."
  },
  {
    id: 3,
    question: "What is the dew point temperature?",
    options: [
      "The temperature at which air reaches 50% RH",
      "The temperature at which condensation begins",
      "The average of wet and dry bulb temperatures",
      "The temperature of the evaporator coil"
    ],
    correctAnswer: 1,
    explanation: "Dew point is the temperature to which air must be cooled (at constant pressure and moisture content) to reach 100% saturation and begin condensation."
  },
  {
    id: 4,
    question: "Air at 22°C and 60% RH is heated to 30°C. What happens to the moisture content and RH?",
    options: [
      "Moisture content increases, RH increases",
      "Moisture content stays same, RH decreases",
      "Moisture content decreases, RH increases",
      "Both stay the same"
    ],
    correctAnswer: 1,
    explanation: "Sensible heating adds no moisture, so moisture content (g/kg) stays constant. However, warmer air can hold more moisture, so RH decreases when temperature rises."
  },
  {
    id: 5,
    question: "The wet bulb temperature is measured using:",
    options: [
      "A thermometer in a water bath",
      "A thermometer with a wet wick in moving air",
      "An electronic humidity sensor",
      "A pressure gauge"
    ],
    correctAnswer: 1,
    explanation: "Wet bulb temperature is measured with a thermometer whose bulb is wrapped in a wet muslin wick and exposed to air movement (typically using a sling psychrometer or aspirated psychrometer)."
  },
  {
    id: 6,
    question: "What is the wet bulb depression?",
    options: [
      "The wet bulb temperature itself",
      "The difference between dry bulb and wet bulb temperatures",
      "The dew point temperature",
      "The saturation temperature"
    ],
    correctAnswer: 1,
    explanation: "Wet bulb depression = Dry bulb - Wet bulb temperature. A larger depression indicates lower relative humidity; zero depression means 100% RH (saturated air)."
  },
  {
    id: 7,
    question: "Comfort conditions for offices typically require RH in the range of:",
    options: ["20-30%", "40-60%", "70-80%", "80-90%"],
    correctAnswer: 1,
    explanation: "CIBSE Guide A recommends 40-60% RH for comfort. Below 40% can cause dry skin and static; above 60% can feel stuffy and encourage mould growth."
  },
  {
    id: 8,
    question: "What is saturation vapour pressure?",
    options: [
      "The maximum pressure air can exert",
      "The partial pressure of water vapour when air is saturated",
      "The atmospheric pressure at sea level",
      "The pressure in a sealed container"
    ],
    correctAnswer: 1,
    explanation: "Saturation vapour pressure (ps) is the maximum partial pressure water vapour can exert at a given temperature. It increases exponentially with temperature."
  },
  {
    id: 9,
    question: "Why is moisture content (g/kg) preferred over RH for HVAC calculations?",
    options: [
      "It is easier to measure",
      "It remains constant during sensible heating/cooling",
      "It has simpler units",
      "It is required by regulations"
    ],
    correctAnswer: 1,
    explanation: "Moisture content (specific humidity) is an absolute measure that stays constant when air is sensibly heated or cooled. RH changes with temperature, making it less useful for tracking moisture through processes."
  },
  {
    id: 10,
    question: "The latent heat of vaporisation of water at atmospheric conditions is approximately:",
    options: ["1000 kJ/kg", "2260 kJ/kg", "2501 kJ/kg", "4186 kJ/kg"],
    correctAnswer: 2,
    explanation: "The latent heat of vaporisation at 0°C is approximately 2501 kJ/kg (hfg). This energy is absorbed when water evaporates and released when vapour condenses."
  },
  {
    id: 11,
    question: "If dry bulb = 24°C, wet bulb = 17°C, and dew point = 12°C, what can be concluded?",
    options: [
      "Air is saturated",
      "Air is unsaturated with moderate humidity",
      "Air is completely dry",
      "Measurements are incorrect"
    ],
    correctAnswer: 1,
    explanation: "The wet bulb (17°C) is between dry bulb (24°C) and dew point (12°C), indicating unsaturated air. The 7°C wet bulb depression suggests moderate humidity (around 50% RH)."
  },
  {
    id: 12,
    question: "What is the approximate saturation moisture content of air at 20°C?",
    options: ["7.4 g/kg", "14.7 g/kg", "29.4 g/kg", "58.8 g/kg"],
    correctAnswer: 1,
    explanation: "At 20°C and 101.325 kPa, the saturation moisture content is approximately 14.7 g/kg. This value roughly doubles for every 10°C temperature rise."
  }
];

const faqs = [
  {
    question: "What is the difference between relative humidity and specific humidity?",
    answer: "Relative humidity (RH) is a percentage showing how close air is to saturation - it changes with temperature. Specific humidity (moisture content) is the actual mass of water vapour per kg of dry air (g/kg) - it stays constant during sensible heating/cooling. For HVAC calculations, moisture content is preferred because it tracks the actual water in the air."
  },
  {
    question: "Why does relative humidity change when air is heated without adding moisture?",
    answer: "Warmer air can hold more water vapour. When you heat air without adding moisture, the moisture content stays the same but the saturation capacity increases. Since RH = actual/maximum, the RH percentage decreases. This is why winter heating makes indoor air feel dry."
  },
  {
    question: "How do I measure relative humidity on site?",
    answer: "Common methods include: sling psychrometer (wet and dry bulb), electronic hygrometer/thermo-hygrometer, or data loggers. Digital hygrometers are convenient but should be calibrated periodically. For commissioning, compare readings at the same location to check consistency."
  },
  {
    question: "Why is dew point important in building services?",
    answer: "Dew point determines when condensation occurs. If surface temperatures (walls, windows, ducts) fall below the air's dew point, condensation forms. This can cause mould, corrosion, and damage. Designers must ensure surface temperatures stay above dew point or control humidity levels."
  },
  {
    question: "What causes 'stuffiness' in buildings?",
    answer: "Stuffiness is typically caused by high relative humidity (above 60%) combined with elevated CO₂ levels from poor ventilation. The high humidity reduces the body's ability to cool through sweat evaporation. Increasing ventilation rates and controlling humidity improves comfort."
  },
  {
    question: "How does altitude affect humidity calculations?",
    answer: "Lower atmospheric pressure at altitude means the saturation vapour pressure represents a larger proportion of total pressure. For the same moisture content, RH is slightly lower at altitude. Most practical HVAC calculations use sea-level values unless at significant elevation (above 1000m)."
  }
];

const HNCModule2Section3_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2-section3">
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
          <div className="inline-flex items-center gap-2 text-cyan-400 text-sm mb-3">
            <Droplets className="h-4 w-4" />
            <span>Module 2.3.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Humidity and Moisture Content
          </h1>
          <p className="text-white/80">
            Understanding humidity measurement and its role in HVAC system design and comfort
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-cyan-400/5 border-l-2 border-cyan-400/50">
            <p className="text-cyan-400 text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Relative humidity:</strong> % of saturation capacity</li>
              <li className="pl-1"><strong>Moisture content:</strong> g water per kg dry air</li>
              <li className="pl-1"><strong>Dew point:</strong> Temperature where condensation begins</li>
              <li className="pl-1"><strong>Wet bulb:</strong> Evaporative cooling temperature</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-cyan-400/5 border-l-2 border-cyan-400/50">
            <p className="text-cyan-400/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Comfort:</strong> 40-60% RH for occupied spaces</li>
              <li className="pl-1"><strong>Condensation:</strong> Prevent by staying above dew point</li>
              <li className="pl-1"><strong>Cooling coils:</strong> Dehumidify when below dew point</li>
              <li className="pl-1"><strong>Humidifiers:</strong> Add moisture in winter</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define relative humidity and explain its significance",
              "Calculate moisture content from given conditions",
              "Explain dew point and its importance in condensation control",
              "Describe wet bulb temperature measurement",
              "Relate humidity to thermal comfort",
              "Convert between different humidity measures"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-cyan-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 1: Relative Humidity */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">01</span>
            Relative Humidity (RH)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Relative humidity is the most commonly quoted humidity measure, expressing how close
              air is to being saturated with water vapour at its current temperature.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-cyan-400/80 mb-2">Relative Humidity Definition</p>
              <p className="font-mono text-center text-lg mb-2">RH = (p<sub>v</sub> / p<sub>s</sub>) × 100%</p>
              <div className="text-xs text-white/70 text-center space-y-1">
                <p>p<sub>v</sub> = actual partial pressure of water vapour (Pa)</p>
                <p>p<sub>s</sub> = saturation vapour pressure at that temperature (Pa)</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-cyan-400/80 mb-2">Saturation Vapour Pressure at Different Temperatures</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Temperature (°C)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">p<sub>s</sub> (kPa)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Saturation g/kg</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0</td>
                      <td className="border border-white/10 px-3 py-2">0.611</td>
                      <td className="border border-white/10 px-3 py-2">3.8</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">10</td>
                      <td className="border border-white/10 px-3 py-2">1.228</td>
                      <td className="border border-white/10 px-3 py-2">7.6</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">20</td>
                      <td className="border border-white/10 px-3 py-2">2.339</td>
                      <td className="border border-white/10 px-3 py-2">14.7</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">25</td>
                      <td className="border border-white/10 px-3 py-2">3.169</td>
                      <td className="border border-white/10 px-3 py-2">20.0</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">30</td>
                      <td className="border border-white/10 px-3 py-2">4.246</td>
                      <td className="border border-white/10 px-3 py-2">27.2</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-cyan-400/70">
              <strong>Key insight:</strong> Saturation capacity roughly doubles every 10°C. This is why warm humid air
              causes condensation when it contacts cold surfaces.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Moisture Content */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">02</span>
            Moisture Content (Specific Humidity)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Moisture content is the absolute measure of water vapour in air, expressed as grams of water
              per kilogram of dry air. Unlike RH, it remains constant during sensible heating or cooling.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-cyan-400/80 mb-2">Moisture Content Equation</p>
              <p className="font-mono text-center text-lg mb-2">g = 0.622 × p<sub>v</sub> / (P - p<sub>v</sub>)</p>
              <div className="text-xs text-white/70 text-center space-y-1">
                <p>g = moisture content (kg/kg dry air, multiply by 1000 for g/kg)</p>
                <p>p<sub>v</sub> = partial pressure of water vapour (kPa)</p>
                <p>P = total atmospheric pressure (kPa)</p>
                <p>0.622 = ratio of molecular masses (18/29)</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-cyan-400/80 mb-2">Why Use Moisture Content?</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Stays constant during sensible heating/cooling</li>
                  <li className="pl-1">Directly used in latent heat calculations</li>
                  <li className="pl-1">Represents actual water mass in air</li>
                  <li className="pl-1">Essential for psychrometric chart plotting</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-cyan-400/80 mb-2">Typical Values (g/kg)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>UK winter outdoor:</strong> 3-6 g/kg</li>
                  <li className="pl-1"><strong>Office comfort:</strong> 7-10 g/kg</li>
                  <li className="pl-1"><strong>UK summer outdoor:</strong> 8-12 g/kg</li>
                  <li className="pl-1"><strong>Tropical outdoor:</strong> 15-20 g/kg</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Dew Point Temperature */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">03</span>
            Dew Point Temperature
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The dew point is the temperature at which air becomes saturated (100% RH) if cooled at constant
              pressure and moisture content. Below this temperature, water vapour condenses.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-cyan-400/80 mb-2">Dew Point Relationship</p>
              <div className="text-sm text-white/90 space-y-2">
                <p>At dew point: p<sub>v</sub> = p<sub>s</sub> (at dew point temperature)</p>
                <p>If surface temperature &lt; dew point → condensation occurs</p>
                <p>If surface temperature &gt; dew point → no condensation</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-cyan-400/80 mb-2">Example Dew Points for 22°C Dry Bulb</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Relative Humidity</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Moisture Content</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Dew Point</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">30%</td>
                      <td className="border border-white/10 px-3 py-2">5.0 g/kg</td>
                      <td className="border border-white/10 px-3 py-2">3.5°C</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">50%</td>
                      <td className="border border-white/10 px-3 py-2">8.3 g/kg</td>
                      <td className="border border-white/10 px-3 py-2">11.1°C</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">70%</td>
                      <td className="border border-white/10 px-3 py-2">11.6 g/kg</td>
                      <td className="border border-white/10 px-3 py-2">16.3°C</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">100%</td>
                      <td className="border border-white/10 px-3 py-2">16.6 g/kg</td>
                      <td className="border border-white/10 px-3 py-2">22.0°C</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Building Services Applications:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Window condensation:</strong> Occurs if glass temperature falls below room dew point</li>
                <li className="pl-1"><strong>Cold bridges:</strong> Poorly insulated areas may reach dew point</li>
                <li className="pl-1"><strong>Cooling coils:</strong> Must operate below dew point for dehumidification</li>
                <li className="pl-1"><strong>Ductwork:</strong> External surfaces may need insulation to prevent condensation</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Wet Bulb Temperature */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">04</span>
            Wet Bulb Temperature
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Wet bulb temperature is measured by a thermometer with its bulb covered by a wet wick
              in moving air. Evaporation from the wick causes cooling proportional to the air's humidity.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-cyan-400/80 mb-2">Wet Bulb Depression</p>
              <p className="font-mono text-center text-lg mb-2">Depression = t<sub>db</sub> - t<sub>wb</sub></p>
              <div className="text-xs text-white/70 text-center space-y-1">
                <p>Larger depression = lower RH (more evaporation)</p>
                <p>Zero depression = 100% RH (saturated, no evaporation)</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-cyan-400/80 mb-2">Measurement Methods</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Sling psychrometer:</strong> Manual, rotated by hand</li>
                  <li className="pl-1"><strong>Aspirated psychrometer:</strong> Fan-driven airflow</li>
                  <li className="pl-1"><strong>Screen psychrometer:</strong> In weather stations</li>
                  <li className="pl-1">Requires 3-5 m/s airflow over wet bulb</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-cyan-400/80 mb-2">Relationship to Other Properties</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Dew point ≤ Wet bulb ≤ Dry bulb (always)</li>
                  <li className="pl-1">All three equal at 100% RH</li>
                  <li className="pl-1">Wet bulb ≈ constant along adiabatic saturation</li>
                  <li className="pl-1">Used to determine other properties on chart</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-cyan-400/80 mb-2">Example: Determining RH from Dry and Wet Bulb</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Dry Bulb</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Wet Bulb</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Depression</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Approx RH</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">22°C</td>
                      <td className="border border-white/10 px-3 py-2">22°C</td>
                      <td className="border border-white/10 px-3 py-2">0°C</td>
                      <td className="border border-white/10 px-3 py-2">100%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">22°C</td>
                      <td className="border border-white/10 px-3 py-2">18°C</td>
                      <td className="border border-white/10 px-3 py-2">4°C</td>
                      <td className="border border-white/10 px-3 py-2">67%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">22°C</td>
                      <td className="border border-white/10 px-3 py-2">15°C</td>
                      <td className="border border-white/10 px-3 py-2">7°C</td>
                      <td className="border border-white/10 px-3 py-2">47%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">22°C</td>
                      <td className="border border-white/10 px-3 py-2">12°C</td>
                      <td className="border border-white/10 px-3 py-2">10°C</td>
                      <td className="border border-white/10 px-3 py-2">30%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
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
              <h3 className="text-sm font-medium text-cyan-400/80 mb-2">Example 1: Calculating Moisture Content</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Air at 25°C has RH of 60%. The saturation vapour pressure at 25°C is 3.169 kPa. Find the moisture content.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Step 1: Find actual vapour pressure</p>
                <p>pv = RH × ps = 0.60 × 3.169 = 1.901 kPa</p>
                <p className="mt-2">Step 2: Calculate moisture content</p>
                <p>g = 0.622 × pv / (P - pv)</p>
                <p>g = 0.622 × 1.901 / (101.325 - 1.901)</p>
                <p>g = 1.182 / 99.424 = 0.01189 kg/kg</p>
                <p className="mt-2">g = <strong>11.9 g/kg</strong></p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-cyan-400/80 mb-2">Example 2: Finding Dew Point</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Air at 20°C, 50% RH. At what temperature will condensation occur on a cold surface?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>At 20°C: ps = 2.339 kPa</p>
                <p>Actual vapour pressure: pv = 0.50 × 2.339 = 1.170 kPa</p>
                <p className="mt-2">Dew point is where ps equals 1.170 kPa</p>
                <p>From tables or chart: this occurs at approximately <strong>9.3°C</strong></p>
                <p className="mt-2 text-white/60">Any surface below 9.3°C will have condensation</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-cyan-400/80 mb-2">Example 3: Effect of Heating on RH</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Winter air at 5°C, 80% RH is heated to 21°C. Find the new RH.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>At 5°C: ps = 0.872 kPa</p>
                <p>pv = 0.80 × 0.872 = 0.698 kPa</p>
                <p>Moisture content = 0.622 × 0.698/100.627 = 4.3 g/kg</p>
                <p className="mt-2">After heating to 21°C (moisture unchanged):</p>
                <p>ps at 21°C = 2.487 kPa</p>
                <p>New RH = pv/ps = 0.698/2.487 = <strong>28%</strong></p>
                <p className="mt-2 text-white/60">This is why heated buildings feel dry in winter</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-cyan-400/80 mb-2">Example 4: Condensation Risk Assessment</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Room at 22°C, 55% RH. Single glazing has inner surface at 8°C. Will condensation occur?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Find dew point of room air:</p>
                <p>At 22°C: ps = 2.645 kPa</p>
                <p>pv = 0.55 × 2.645 = 1.455 kPa</p>
                <p className="mt-2">Dew point (from tables) ≈ <strong>12.5°C</strong></p>
                <p className="mt-2">Glass surface: 8°C &lt; Dew point: 12.5°C</p>
                <p className="mt-2 text-red-400">Yes - condensation WILL occur on the glass</p>
                <p className="text-white/60">Solution: improve glazing or reduce humidity</p>
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
              <h3 className="text-sm font-medium text-cyan-400/80 mb-2">Essential Relationships</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>RH = pv/ps × 100%</strong> — Relative humidity definition</li>
                <li className="pl-1"><strong>g = 0.622 pv/(P-pv)</strong> — Moisture content</li>
                <li className="pl-1"><strong>Dew point ≤ Wet bulb ≤ Dry bulb</strong> — Always true</li>
                <li className="pl-1">At saturation: all three temperatures equal</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-cyan-400/80 mb-2">Comfort Guidelines (CIBSE)</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Recommended RH: <strong>40-60%</strong></li>
                <li className="pl-1">Below 40%: dry skin, static electricity</li>
                <li className="pl-1">Above 60%: stuffy feeling, mould risk</li>
                <li className="pl-1">Above 70%: definite condensation risk</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Confusing RH and g</strong> — RH changes with temperature, g does not</li>
                <li className="pl-1"><strong>Assuming RH stays constant</strong> — It drops when air is heated</li>
                <li className="pl-1"><strong>Ignoring dew point</strong> — Critical for condensation assessment</li>
                <li className="pl-1"><strong>Wet bulb measurement</strong> — Needs adequate airflow (3-5 m/s)</li>
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
                <p className="font-medium text-white mb-1">Humidity Measures</p>
                <ul className="space-y-0.5">
                  <li>RH: % of saturation (0-100%)</li>
                  <li>Moisture content: g/kg dry air</li>
                  <li>Dew point: condensation temperature</li>
                  <li>Wet bulb: evaporative temperature</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Values</p>
                <ul className="space-y-0.5">
                  <li>Comfort RH: 40-60%</li>
                  <li>Typical office: 7-10 g/kg</li>
                  <li>hfg (latent heat): 2501 kJ/kg</li>
                  <li>Molecular ratio: 0.622</li>
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
            <Link to="../h-n-c-module2-section3-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Air Composition
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-cyan-500 text-white hover:bg-cyan-500/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2-section3-3">
              Next: Psychrometric Charts
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule2Section3_2;
