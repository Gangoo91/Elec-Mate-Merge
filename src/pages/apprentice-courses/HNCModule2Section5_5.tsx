import { ArrowLeft, Users, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Thermal Comfort - HNC Module 2 Section 5.5";
const DESCRIPTION = "Understanding Fanger's PMV/PPD model, CIBSE comfort criteria, operative temperature, adaptive comfort, and overheating assessment.";

const quickCheckQuestions = [
  {
    id: "pmv-range",
    question: "What PMV range is typically considered acceptable for thermal comfort?",
    options: [
      "-3 to +3",
      "-1 to +1",
      "-0.5 to +0.5",
      "0 only"
    ],
    correctIndex: 2,
    explanation: "PMV (Predicted Mean Vote) of -0.5 to +0.5 is considered 'optimal' comfort, with -1 to +1 being acceptable. PPD (Predicted Percentage Dissatisfied) is less than 10% within ±0.5 PMV."
  },
  {
    id: "operative-temp",
    question: "Operative temperature combines which two factors?",
    options: [
      "Air temperature and humidity",
      "Air temperature and mean radiant temperature",
      "Mean radiant temperature and air velocity",
      "Air temperature and air velocity"
    ],
    correctIndex: 1,
    explanation: "Operative temperature (Top) combines air temperature (Ta) and mean radiant temperature (Tr). For low air velocities, Top ≈ (Ta + Tr)/2. It represents what occupants 'feel'."
  },
  {
    id: "cibse-summer",
    question: "What is the CIBSE recommended summer comfort temperature for offices?",
    options: [
      "18-20°C",
      "21-23°C",
      "23-25°C",
      "25-28°C"
    ],
    correctIndex: 2,
    explanation: "CIBSE Guide A recommends 23-25°C operative temperature for summer office conditions. Winter recommendation is 21-23°C. These are for Category II (normal level of expectation)."
  },
  {
    id: "overheating-criteria",
    question: "Under TM52, what is the threshold temperature above which hours are counted for overheating?",
    options: [
      "25°C fixed",
      "26°C fixed",
      "28°C fixed",
      "Varies with running mean outdoor temperature"
    ],
    correctIndex: 3,
    explanation: "TM52 uses adaptive comfort limits that vary with running mean outdoor temperature. The threshold rises in warmer weather as occupants adapt. It's not a fixed temperature."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What are the six factors in Fanger's thermal comfort model?",
    options: [
      "Temperature, humidity, velocity, radiation, clothing, gender",
      "Air temperature, radiant temperature, humidity, velocity, metabolic rate, clothing",
      "Temperature, humidity, CO2, velocity, noise, light",
      "Air temperature, surface temperature, pressure, velocity, clothing, age"
    ],
    correctAnswer: 1,
    explanation: "Fanger's six factors: air temperature, mean radiant temperature, relative humidity, air velocity (4 environmental) plus metabolic rate and clothing insulation (2 personal factors)."
  },
  {
    id: 2,
    question: "What does a PMV of +2 indicate?",
    options: [
      "Thermally neutral",
      "Slightly warm",
      "Warm",
      "Hot"
    ],
    correctAnswer: 2,
    explanation: "PMV scale: -3 cold, -2 cool, -1 slightly cool, 0 neutral, +1 slightly warm, +2 warm, +3 hot. PMV +2 indicates occupants would vote 'warm' on average."
  },
  {
    id: 3,
    question: "What unit is used to measure clothing insulation?",
    options: [
      "Watts",
      "Clo",
      "Met",
      "W/m²K"
    ],
    correctAnswer: 1,
    explanation: "Clothing insulation is measured in 'clo'. 1 clo = 0.155 m²K/W. Typical summer clothing is 0.5 clo, winter business attire 1.0 clo."
  },
  {
    id: 4,
    question: "What metabolic rate (Met) is assumed for sedentary office work?",
    options: [
      "0.8 Met",
      "1.0 Met",
      "1.2 Met",
      "1.5 Met"
    ],
    correctAnswer: 2,
    explanation: "Sedentary office work is typically 1.2 Met (1 Met = 58.2 W/m² body area = ~105W for average person). Sleeping is 0.8 Met, walking slowly is 2.0 Met."
  },
  {
    id: 5,
    question: "What is the adaptive comfort principle based on?",
    options: [
      "Laboratory experiments only",
      "Mechanical system performance",
      "Occupants adapting to seasonal and local conditions",
      "Fixed temperature standards"
    ],
    correctAnswer: 2,
    explanation: "Adaptive comfort recognises that occupants in naturally ventilated buildings adapt to local conditions - adjusting clothing, opening windows, accepting wider temperature ranges than PMV/PPD predicts."
  },
  {
    id: 6,
    question: "For CIBSE Category II comfort, what is the maximum acceptable PPD?",
    options: [
      "5%",
      "10%",
      "15%",
      "20%"
    ],
    correctAnswer: 1,
    explanation: "Category II (normal expectation) allows max 10% PPD, corresponding to PMV ±0.5. Category I (high expectation) allows max 6% PPD. Category III allows 15%."
  },
  {
    id: 7,
    question: "What is the effect of increasing air velocity on thermal sensation in warm conditions?",
    options: [
      "No effect",
      "Feels warmer due to convection",
      "Feels cooler due to increased convective and evaporative heat loss",
      "Increases humidity sensation"
    ],
    correctAnswer: 2,
    explanation: "Increased air velocity enhances convective and evaporative heat loss from skin, providing a cooling effect. This is why fans can extend comfortable temperature range upward by 2-3°C."
  },
  {
    id: 8,
    question: "In TM52 overheating assessment, what are the three criteria?",
    options: [
      "Peak temperature, hours over 25°C, humidity",
      "Hours of exceedance, daily weighted exceedance, maximum temperature",
      "Mean temperature, max temperature, ventilation rate",
      "PMV, PPD, air velocity"
    ],
    correctAnswer: 1,
    explanation: "TM52 Criterion 1: Hours where ΔT > 1K (max 3% occupied hours). Criterion 2: Daily weighted exceedance (max 6). Criterion 3: Absolute maximum ΔT ≤ 4K. Fail any = overheating."
  },
  {
    id: 9,
    question: "What is 'asymmetric radiant temperature' and why does it matter?",
    options: [
      "Temperature difference between room centre and walls",
      "Temperature difference between different directions from occupant",
      "Air temperature variation with height",
      "Surface temperature of glazing"
    ],
    correctAnswer: 1,
    explanation: "Asymmetric radiant temperature is the difference in radiant temperature from different directions. Large asymmetry (cold window, warm ceiling) causes local discomfort even if mean conditions are acceptable."
  },
  {
    id: 10,
    question: "For Part O compliance, which buildings must demonstrate overheating risk is addressed?",
    options: [
      "All buildings",
      "Only naturally ventilated buildings",
      "New residential buildings",
      "Only buildings over 1000m²"
    ],
    correctAnswer: 2,
    explanation: "Part O (2021) applies to new residential buildings in England. It requires demonstrating overheating risk is acceptable using either simplified method or TM59 dynamic simulation."
  },
  {
    id: 11,
    question: "What running mean outdoor temperature is used in adaptive comfort calculations?",
    options: [
      "Mean of last 24 hours",
      "Mean of last 7 days",
      "Exponentially weighted running mean",
      "Monthly average"
    ],
    correctAnswer: 2,
    explanation: "The running mean outdoor temperature (θrm) uses exponentially weighted average where recent days have more influence. This reflects gradual adaptation to changing seasonal conditions."
  },
  {
    id: 12,
    question: "What is the recommended maximum vertical air temperature difference to avoid discomfort?",
    options: [
      "1°C between ankle and head",
      "3°C between ankle and head",
      "5°C between floor and ceiling",
      "No limit if mean is comfortable"
    ],
    correctAnswer: 1,
    explanation: "CIBSE recommends maximum 3°C difference between 0.1m (ankle) and 1.1m (head height) for seated occupants. Larger gradients cause cold feet/warm head discomfort."
  }
];

const faqs = [
  {
    question: "When should I use PMV/PPD versus adaptive comfort model?",
    answer: "Use PMV/PPD for mechanically conditioned buildings with tight temperature control and uniform conditions. Use adaptive model for naturally ventilated or mixed-mode buildings where occupants can adjust clothing and open windows. Part O and TM59 primarily use adaptive approach."
  },
  {
    question: "How does humidity affect thermal comfort?",
    answer: "Humidity has relatively small effect on thermal sensation at normal comfort temperatures. At extremes, high humidity (>70%) prevents evaporative cooling making warm conditions feel hotter. Very low humidity (<30%) can cause dry eyes and throat. CIBSE recommends 40-70% RH for comfort."
  },
  {
    question: "What is the difference between TM52 and TM59?",
    answer: "TM52 covers overheating assessment for non-domestic buildings. TM59 is specifically for domestic buildings and aligns with Part O requirements. TM59 has additional criteria for bedrooms (night-time cooling) and considers vulnerable occupants. Both use adaptive comfort principles."
  },
  {
    question: "Can increasing air velocity offset higher temperatures?",
    answer: "Yes, up to a point. CIBSE Guide A indicates each 0.1 m/s increase in air velocity can offset approximately 0.3°C temperature rise. This works up to about 1 m/s (above which draught becomes unacceptable). Maximum useful offset is about 2-3°C."
  },
  {
    question: "How do I account for radiant heating panels in comfort calculations?",
    answer: "Radiant panels affect mean radiant temperature (MRT), not air temperature. Calculate MRT using angle factors from panel to occupant. For comfort, what matters is operative temperature which averages air and MRT. Radiant systems can provide comfort at lower air temperatures."
  },
  {
    question: "What causes local thermal discomfort?",
    answer: "Local discomfort occurs even when overall PMV is acceptable. Causes include: radiant asymmetry (cold windows, warm ceilings), vertical temperature gradient, floor temperature (cold concrete, warm heated floors), and draughts. CIBSE Guide A provides limits for each."
  }
];

const HNCModule2Section5_5 = () => {
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
            <Users className="h-4 w-4" />
            <span>Module 2.5.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Thermal Comfort
          </h1>
          <p className="text-white/80">
            Understanding and achieving comfortable thermal environments for building occupants
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>PMV:</strong> Predicted Mean Vote (-3 to +3 scale)</li>
              <li className="pl-1"><strong>PPD:</strong> Predicted Percentage Dissatisfied</li>
              <li className="pl-1"><strong>Operative temp:</strong> Average of air and radiant</li>
              <li className="pl-1"><strong>Adaptive:</strong> Occupants adapt to local climate</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>HVAC design:</strong> Target conditions for sizing</li>
              <li className="pl-1"><strong>Part O:</strong> Overheating risk in dwellings</li>
              <li className="pl-1"><strong>TM52/TM59:</strong> Overheating assessment methods</li>
              <li className="pl-1"><strong>Controls:</strong> Setpoints and dead bands</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply Fanger's six-factor thermal comfort model",
              "Calculate and interpret PMV and PPD",
              "Determine operative temperature for comfort assessment",
              "Use CIBSE comfort criteria for different building types",
              "Understand adaptive comfort for natural ventilation",
              "Apply TM52/TM59 overheating assessment criteria"
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

        {/* Section 1: Fanger's Model */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Fanger's PMV/PPD Model
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Professor Ole Fanger developed the most widely used thermal comfort model, based on
              heat balance between the human body and its environment. The model predicts average
              thermal sensation and percentage of dissatisfied occupants.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The six factors affecting thermal comfort:</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-2">Environmental Factors</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1"><strong>Air temperature (Ta):</strong> °C</li>
                    <li className="pl-1"><strong>Mean radiant temp (Tr):</strong> °C</li>
                    <li className="pl-1"><strong>Relative humidity (RH):</strong> %</li>
                    <li className="pl-1"><strong>Air velocity (v):</strong> m/s</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-2">Personal Factors</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1"><strong>Metabolic rate (M):</strong> Met</li>
                    <li className="pl-1"><strong>Clothing insulation (Icl):</strong> clo</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">PMV Scale (Predicted Mean Vote)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">PMV Value</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Thermal Sensation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">PPD (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">-3</td>
                      <td className="border border-white/10 px-3 py-2">Cold</td>
                      <td className="border border-white/10 px-3 py-2">~100%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">-2</td>
                      <td className="border border-white/10 px-3 py-2">Cool</td>
                      <td className="border border-white/10 px-3 py-2">~75%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">-1</td>
                      <td className="border border-white/10 px-3 py-2">Slightly cool</td>
                      <td className="border border-white/10 px-3 py-2">~25%</td>
                    </tr>
                    <tr className="bg-green-500/10">
                      <td className="border border-white/10 px-3 py-2">0</td>
                      <td className="border border-white/10 px-3 py-2">Neutral</td>
                      <td className="border border-white/10 px-3 py-2">5%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">+1</td>
                      <td className="border border-white/10 px-3 py-2">Slightly warm</td>
                      <td className="border border-white/10 px-3 py-2">~25%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">+2</td>
                      <td className="border border-white/10 px-3 py-2">Warm</td>
                      <td className="border border-white/10 px-3 py-2">~75%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">+3</td>
                      <td className="border border-white/10 px-3 py-2">Hot</td>
                      <td className="border border-white/10 px-3 py-2">~100%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Note:</strong> Even at PMV = 0 (neutral), 5% of people will be dissatisfied due to individual variation. Perfect comfort for everyone is impossible; design aims for acceptable levels.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Operative Temperature */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Operative Temperature and CIBSE Criteria
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Operative temperature combines air and radiant temperatures into a single value representing
              what occupants actually experience. CIBSE Guide A provides recommended comfort ranges for
              different building types and seasons.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Operative Temperature</p>
              <p className="font-mono text-center text-sm mb-2">T<sub>op</sub> = (T<sub>a</sub> + T<sub>r</sub>) / 2</p>
              <p className="text-xs text-white/70 text-center">For low air velocity (&lt;0.2 m/s). More complex formula for higher velocities.</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">CIBSE Recommended Operative Temperatures</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Building Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Winter (°C)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Summer (°C)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Office (sedentary)</td>
                      <td className="border border-white/10 px-3 py-2">21-23</td>
                      <td className="border border-white/10 px-3 py-2">23-25</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Retail</td>
                      <td className="border border-white/10 px-3 py-2">19-21</td>
                      <td className="border border-white/10 px-3 py-2">21-23</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Teaching space</td>
                      <td className="border border-white/10 px-3 py-2">19-21</td>
                      <td className="border border-white/10 px-3 py-2">21-25</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Hospital ward</td>
                      <td className="border border-white/10 px-3 py-2">22-24</td>
                      <td className="border border-white/10 px-3 py-2">23-25</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Sports hall</td>
                      <td className="border border-white/10 px-3 py-2">13-16</td>
                      <td className="border border-white/10 px-3 py-2">14-18</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Factory (light work)</td>
                      <td className="border border-white/10 px-3 py-2">16-19</td>
                      <td className="border border-white/10 px-3 py-2">18-21</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Comfort categories (ISO 7730):</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Category A (high):</strong> PMV ±0.2, PPD &lt;6% (hospitals, care homes)</li>
                <li className="pl-1"><strong>Category B (normal):</strong> PMV ±0.5, PPD &lt;10% (offices, schools)</li>
                <li className="pl-1"><strong>Category C (moderate):</strong> PMV ±0.7, PPD &lt;15% (retail, light industry)</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design note:</strong> Summer temperatures can be 2°C higher than winter because occupants wear lighter clothing (lower clo value), maintaining thermal balance at higher air temperature.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Adaptive Comfort */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Adaptive Comfort Model
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The adaptive comfort model recognises that occupants in naturally ventilated buildings
              adapt to seasonal conditions by adjusting clothing, opening windows, and accepting wider
              temperature ranges. This approach is central to Part O and TM59 overheating assessment.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key principles of adaptive comfort:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Expectation:</strong> Occupants expect wider ranges in free-running buildings</li>
                <li className="pl-1"><strong>Adaptation:</strong> Clothing adjustment, window operation, activity modification</li>
                <li className="pl-1"><strong>Running mean:</strong> Comfort limit varies with recent outdoor temperature</li>
                <li className="pl-1"><strong>Control:</strong> Having personal control increases acceptable range</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Adaptive Comfort Temperature</p>
              <p className="font-mono text-center text-sm mb-2">T<sub>comf</sub> = 0.33 × θ<sub>rm</sub> + 18.8</p>
              <p className="text-xs text-white/70 text-center">Where θrm = exponentially weighted running mean outdoor temperature</p>
              <p className="text-xs text-white/70 text-center mt-2">Upper limit (Cat II) = Tcomf + 3°C; Lower limit = Tcomf - 4°C</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Comparison: PMV vs Adaptive</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Aspect</th>
                      <th className="border border-white/10 px-3 py-2 text-left">PMV/PPD</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Adaptive</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Building type</td>
                      <td className="border border-white/10 px-3 py-2">Mechanically conditioned</td>
                      <td className="border border-white/10 px-3 py-2">Naturally ventilated</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Temperature range</td>
                      <td className="border border-white/10 px-3 py-2">Fixed narrow band</td>
                      <td className="border border-white/10 px-3 py-2">Varies with outdoor temp</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Occupant control</td>
                      <td className="border border-white/10 px-3 py-2">Not considered</td>
                      <td className="border border-white/10 px-3 py-2">Central assumption</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Energy implication</td>
                      <td className="border border-white/10 px-3 py-2">Higher energy use</td>
                      <td className="border border-white/10 px-3 py-2">Lower energy use</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Mixed-mode buildings:</strong> Can use adaptive approach when in natural ventilation mode, switching to PMV criteria when mechanical cooling operates.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Overheating Assessment */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Overheating Assessment (TM52/TM59/Part O)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Overheating has become a major concern in UK buildings, driven by climate change, tighter
              construction, and increased glazing. Building Regulations Part O and CIBSE TM52/TM59
              provide assessment methods and compliance criteria.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">TM52 Criteria (Non-Domestic Buildings)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Criterion</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Requirement</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Measure</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1. Hours of exceedance</td>
                      <td className="border border-white/10 px-3 py-2">Max 3% occupied hours</td>
                      <td className="border border-white/10 px-3 py-2">ΔT &gt; 1K above limit</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2. Daily weighted</td>
                      <td className="border border-white/10 px-3 py-2">Max We = 6 on any day</td>
                      <td className="border border-white/10 px-3 py-2">Severity × hours</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3. Upper limit</td>
                      <td className="border border-white/10 px-3 py-2">ΔT never &gt; 4K</td>
                      <td className="border border-white/10 px-3 py-2">Absolute maximum</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">TM59 Additional Criteria (Domestic)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Living areas:</strong> TM52 Criteria 1 and 2 apply</li>
                <li className="pl-1"><strong>Bedrooms (night):</strong> Max 3% hours over 26°C (23:00-07:00)</li>
                <li className="pl-1"><strong>Vulnerable occupants:</strong> Fixed 26°C threshold (not adaptive)</li>
                <li className="pl-1"><strong>Noise constraint:</strong> Check if windows can realistically be opened</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Part O Compliance Routes</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-2">Simplified Method</p>
                  <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Glazing area limits by orientation</li>
                    <li className="pl-1">Maximum g-value requirements</li>
                    <li className="pl-1">Minimum free area for ventilation</li>
                    <li className="pl-1">Cross-ventilation required</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-2">Dynamic Simulation</p>
                  <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Full TM59 assessment</li>
                    <li className="pl-1">DSY weather file required</li>
                    <li className="pl-1">All three criteria assessed</li>
                    <li className="pl-1">More design flexibility</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Climate change:</strong> TM59 recommends using DSY1 (2020s high emissions) or DSY2/3 for future-proofing. What passes today may not remain comfortable by 2050.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Operative Temperature</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> An office has air temperature 22°C and mean radiant temperature 24°C
                (due to warm ceiling). Calculate operative temperature.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>For low air velocity, Top = (Ta + Tr) / 2</p>
                <p>Top = (22 + 24) / 2 = <strong>23°C</strong></p>
                <p className="mt-2 text-white/60">Within CIBSE summer comfort range for offices (23-25°C)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Adaptive Comfort Limit</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> The running mean outdoor temperature is 18°C. Calculate the
                Category II adaptive comfort upper limit.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Comfort temperature: Tcomf = 0.33 × θrm + 18.8</p>
                <p>Tcomf = 0.33 × 18 + 18.8 = 24.7°C</p>
                <p className="mt-2">Upper limit (Cat II) = Tcomf + 3 = 24.7 + 3 = <strong>27.7°C</strong></p>
                <p className="mt-2 text-white/60">Temperatures above 27.7°C count as overheating hours</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Velocity Offset</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> If air velocity increases from 0.1 to 0.4 m/s, approximately how much
                higher temperature can be tolerated while maintaining comfort?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Rule of thumb: 0.3°C per 0.1 m/s increase</p>
                <p>Velocity increase = 0.4 - 0.1 = 0.3 m/s</p>
                <p>Temperature offset = 0.3 × 3 = <strong>~0.9°C higher acceptable</strong></p>
                <p className="mt-2 text-white/60">Ceiling fans can extend acceptable range by 2-3°C in summer</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 4: TM52 Criterion 1 Check</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A building is occupied 3000 hours per year. Dynamic simulation shows
                120 hours above the adaptive comfort limit. Does it pass Criterion 1?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Criterion 1 limit = 3% of occupied hours</p>
                <p>3% of 3000 = 90 hours maximum</p>
                <p>Actual exceedance = 120 hours</p>
                <p className="mt-2 text-red-400">FAIL: 120 &gt; 90 hours (4% exceedance)</p>
                <p className="mt-2 text-white/60">Building requires design changes to reduce overheating</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Values</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>1 clo:</strong> Business suit + accessories (0.155 m²K/W)</li>
                <li className="pl-1"><strong>1 Met:</strong> 58.2 W/m² body area (~105W/person)</li>
                <li className="pl-1"><strong>PMV target:</strong> ±0.5 for Category B (normal) comfort</li>
                <li className="pl-1"><strong>Office winter:</strong> 21-23°C operative</li>
                <li className="pl-1"><strong>Office summer:</strong> 23-25°C operative</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Formulas</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Top = (Ta + Tr) / 2:</strong> Operative temperature (low velocity)</li>
                <li className="pl-1"><strong>Tcomf = 0.33θrm + 18.8:</strong> Adaptive comfort temperature</li>
                <li className="pl-1"><strong>Upper limit = Tcomf + 3:</strong> Category II adaptive limit</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Using air temp only:</strong> Radiant effects significant near windows/walls</li>
                <li className="pl-1"><strong>Ignoring adaptation:</strong> PMV too strict for free-running buildings</li>
                <li className="pl-1"><strong>Fixed overheating limit:</strong> TM52/59 use adaptive limits, not 26°C</li>
                <li className="pl-1"><strong>Bedroom hours:</strong> TM59 uses fixed 26°C at night</li>
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
                <p className="font-medium text-white mb-1">Comfort Parameters</p>
                <ul className="space-y-0.5">
                  <li>PMV: -0.5 to +0.5 (Cat B)</li>
                  <li>PPD: &lt;10% (Cat B)</li>
                  <li>Office: 21-23°C winter, 23-25°C summer</li>
                  <li>Velocity offset: ~0.3°C per 0.1 m/s</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Overheating (TM52)</p>
                <ul className="space-y-0.5">
                  <li>Criterion 1: &lt;3% hours ΔT &gt; 1K</li>
                  <li>Criterion 2: Daily We &lt; 6</li>
                  <li>Criterion 3: ΔT never &gt; 4K</li>
                  <li>Fail any criterion = overheating</li>
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
            <Link to="../h-n-c-module2-section5-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2-section5-6">
              Next: Building Fabric Performance
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule2Section5_5;
