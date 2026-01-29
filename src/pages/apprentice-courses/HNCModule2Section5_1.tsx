import { ArrowLeft, Sun, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Solar Radiation - HNC Module 2 Section 5.1";
const DESCRIPTION = "Understanding solar geometry, altitude and azimuth angles, irradiance measurements, direct and diffuse radiation, and solar gains in building design.";

const quickCheckQuestions = [
  {
    id: "solar-constant",
    question: "What is the approximate value of the solar constant (irradiance outside Earth's atmosphere)?",
    options: ["500 W/m²", "1000 W/m²", "1367 W/m²", "2000 W/m²"],
    correctIndex: 2,
    explanation: "The solar constant is approximately 1367 W/m², representing the solar irradiance on a surface perpendicular to the sun's rays at the mean Earth-Sun distance, outside the atmosphere."
  },
  {
    id: "solar-altitude",
    question: "At solar noon in summer in the UK (latitude 52°N), approximately what is the maximum solar altitude?",
    options: ["38°", "52°", "61.5°", "90°"],
    correctIndex: 2,
    explanation: "Maximum altitude = 90° - latitude + declination. At summer solstice: 90° - 52° + 23.5° = 61.5°. The sun is never directly overhead in the UK."
  },
  {
    id: "diffuse-radiation",
    question: "What percentage of total radiation on a heavily overcast day in the UK is typically diffuse?",
    options: ["10-20%", "30-40%", "50-60%", "Nearly 100%"],
    correctIndex: 3,
    explanation: "On heavily overcast days, nearly all solar radiation reaching the ground is diffuse (scattered by clouds). Direct beam radiation is effectively zero under complete cloud cover."
  },
  {
    id: "glazing-shgc",
    question: "A window with SHGC (Solar Heat Gain Coefficient) of 0.4 and area 3m² receives 500 W/m² irradiance. What is the solar heat gain?",
    options: ["200W", "400W", "600W", "1500W"],
    correctIndex: 2,
    explanation: "Solar heat gain = Irradiance × Area × SHGC = 500 × 3 × 0.4 = 600W. The SHGC represents the fraction of incident solar energy that enters as heat."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the solar azimuth angle?",
    options: [
      "The angle between the sun and the horizon",
      "The horizontal angle measured clockwise from north to the sun's position",
      "The angle of incidence on a tilted surface",
      "The declination of the sun from the celestial equator"
    ],
    correctAnswer: 1,
    explanation: "Solar azimuth is the horizontal angle measured clockwise from true north to the point on the horizon directly below the sun. It indicates the compass direction of the sun."
  },
  {
    id: 2,
    question: "What causes the variation in solar declination throughout the year?",
    options: [
      "The elliptical orbit of Earth around the Sun",
      "The tilt of Earth's axis at 23.5° to the orbital plane",
      "Atmospheric absorption variations",
      "Changes in the solar constant"
    ],
    correctAnswer: 1,
    explanation: "The 23.5° tilt of Earth's axis relative to its orbital plane causes the sun's declination to vary from +23.5° (summer solstice) to -23.5° (winter solstice), creating seasons."
  },
  {
    id: 3,
    question: "What is the typical peak solar irradiance on a horizontal surface in the UK on a clear summer day?",
    options: [
      "400-500 W/m²",
      "600-700 W/m²",
      "800-900 W/m²",
      "1000-1100 W/m²"
    ],
    correctAnswer: 2,
    explanation: "UK peak horizontal irradiance on clear summer days is typically 800-900 W/m². This is less than the solar constant due to atmospheric absorption and the sun not being directly overhead."
  },
  {
    id: 4,
    question: "For a south-facing vertical window in the UK, when does maximum solar gain typically occur?",
    options: [
      "Summer midday",
      "Winter midday",
      "Spring/autumn equinox",
      "Summer morning/evening"
    ],
    correctAnswer: 1,
    explanation: "South-facing vertical surfaces receive maximum direct radiation when the sun is low in winter. In summer, the high sun angle means less radiation strikes vertical surfaces directly."
  },
  {
    id: 5,
    question: "What is the 'air mass' (AM) value at solar noon when the sun is at 30° altitude?",
    options: [
      "AM 1.0",
      "AM 1.5",
      "AM 2.0",
      "AM 3.0"
    ],
    correctAnswer: 2,
    explanation: "Air mass = 1/sin(altitude) = 1/sin(30°) = 1/0.5 = 2.0. This means solar radiation passes through twice the atmosphere compared to when the sun is directly overhead (AM 1.0)."
  },
  {
    id: 6,
    question: "Which factor does NOT affect the solar heat gain through a window?",
    options: [
      "Solar Heat Gain Coefficient (SHGC)",
      "Glass U-value",
      "Angle of incidence",
      "External shading devices"
    ],
    correctAnswer: 1,
    explanation: "U-value relates to conductive heat transfer (temperature difference driven), not solar heat gain. SHGC, incidence angle, and shading directly affect how much solar radiation enters as heat."
  },
  {
    id: 7,
    question: "What is the typical annual solar irradiation (kWh/m²) on a south-facing surface tilted at latitude angle in southern UK?",
    options: [
      "500-700 kWh/m²/year",
      "900-1100 kWh/m²/year",
      "1200-1400 kWh/m²/year",
      "1500-1700 kWh/m²/year"
    ],
    correctAnswer: 1,
    explanation: "Southern UK receives approximately 900-1100 kWh/m²/year on optimally tilted south-facing surfaces. This is important for PV and solar thermal system sizing."
  },
  {
    id: 8,
    question: "The CIBSE solar cooling load calculation uses which primary dataset?",
    options: [
      "Actual weather data from nearest station",
      "Design Summer Year (DSY) data",
      "Test Reference Year (TRY) data",
      "Solar radiation tables based on clear sky models"
    ],
    correctAnswer: 3,
    explanation: "CIBSE Guide A provides solar radiation tables based on clear sky models for cooling load calculations. TRY and DSY data are used for dynamic thermal simulation."
  },
  {
    id: 9,
    question: "What percentage of incident solar radiation on clear single glazing is typically transmitted?",
    options: [
      "50-55%",
      "65-70%",
      "80-85%",
      "90-95%"
    ],
    correctAnswer: 2,
    explanation: "Clear single glazing transmits approximately 80-85% of incident solar radiation at normal incidence. The remainder is reflected (8-10%) and absorbed (5-10%)."
  },
  {
    id: 10,
    question: "Why does diffuse radiation have a significant heating effect even on north-facing facades?",
    options: [
      "It has higher energy content than direct radiation",
      "It comes from all directions in the sky hemisphere",
      "It is not attenuated by the atmosphere",
      "It penetrates glass more easily"
    ],
    correctAnswer: 1,
    explanation: "Diffuse radiation arrives from the entire sky dome, not just the sun's direction. Even north-facing surfaces receive diffuse radiation from the sky hemisphere, contributing to solar gains."
  },
  {
    id: 11,
    question: "What is the typical g-value (total solar energy transmittance) of solar control double glazing?",
    options: [
      "0.15-0.25",
      "0.30-0.45",
      "0.55-0.65",
      "0.70-0.80"
    ],
    correctAnswer: 1,
    explanation: "Solar control glazing typically has g-values of 0.30-0.45, reducing solar heat gain while maintaining reasonable light transmission. Standard double glazing has g-values around 0.70-0.75."
  },
  {
    id: 12,
    question: "At what time does true solar noon occur in London (longitude 0°) during British Summer Time?",
    options: [
      "11:00",
      "12:00",
      "13:00",
      "It varies with the equation of time"
    ],
    correctAnswer: 3,
    explanation: "True solar noon varies throughout the year due to the equation of time (±16 minutes). During BST, clock noon is already 1 hour ahead, so solar noon is typically around 13:00-13:15."
  }
];

const faqs = [
  {
    question: "What is the difference between irradiance and irradiation?",
    answer: "Irradiance (W/m²) is the instantaneous rate of solar energy received per unit area - a power measurement. Irradiation (kWh/m² or MJ/m²) is the total solar energy received over a period (hour, day, year) - an energy measurement. Building services uses irradiance for peak load calculations and irradiation for annual energy assessments."
  },
  {
    question: "How do I calculate solar gain through windows for cooling load?",
    answer: "Solar gain = Irradiance × Glass area × SHGC × Frame factor × Shading factor. Use CIBSE solar irradiance data for the appropriate orientation and month. Apply correction factors for incidence angle if significantly off-normal. For detailed analysis, consider both direct and diffuse components separately."
  },
  {
    question: "Why is south-facing glazing preferred for passive solar design in the UK?",
    answer: "South-facing vertical glazing receives maximum solar radiation in winter (when heating is needed) because the low winter sun strikes it more directly. In summer, the high sun angle means less direct radiation, reducing overheating risk. East and west facades receive strong radiation at low angles in summer, causing overheating."
  },
  {
    question: "What is the equation of time and why does it matter?",
    answer: "The equation of time is the difference between true solar time and mean solar time, varying by ±16 minutes throughout the year. It matters for accurate solar calculations because the sun's position at clock noon varies. It results from Earth's elliptical orbit and axial tilt."
  },
  {
    question: "How does atmospheric air mass affect solar radiation?",
    answer: "Air mass (AM) represents the path length through the atmosphere relative to vertical. At AM 2.0 (sun at 30° altitude), radiation passes through twice the atmosphere, reducing intensity through absorption and scattering. This is why evening sun feels weaker - longer atmospheric path means more attenuation."
  },
  {
    question: "What solar data should I use for overheating assessments?",
    answer: "For overheating risk assessment under Part O or TM52/TM59, use CIBSE Design Summer Year (DSY) weather files which represent moderately warm summers. For extreme heat events, DSY2 (2003 event) or DSY3 are used. These differ from TRY files used for energy calculations."
  }
];

const HNCModule2Section5_1 = () => {
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
            <Sun className="h-4 w-4" />
            <span>Module 2.5.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Solar Radiation
          </h1>
          <p className="text-white/80">
            Understanding solar geometry, irradiance, and solar heat gains for building thermal design
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Solar altitude:</strong> Vertical angle of sun above horizon</li>
              <li className="pl-1"><strong>Solar azimuth:</strong> Horizontal direction (clockwise from north)</li>
              <li className="pl-1"><strong>Irradiance:</strong> Instantaneous power per area (W/m²)</li>
              <li className="pl-1"><strong>Solar gain:</strong> Heat entering building through glazing</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Cooling loads:</strong> Solar gains drive summer peak loads</li>
              <li className="pl-1"><strong>Daylighting:</strong> Direct vs diffuse light design</li>
              <li className="pl-1"><strong>Overheating:</strong> Part O compliance assessment</li>
              <li className="pl-1"><strong>Renewables:</strong> PV and solar thermal sizing</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Calculate solar altitude and azimuth for any location and time",
              "Distinguish between direct beam and diffuse solar radiation",
              "Apply irradiance data for different surface orientations",
              "Calculate solar heat gains through glazed elements",
              "Use CIBSE solar data for cooling load calculations",
              "Understand factors affecting solar energy reaching buildings"
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

        {/* Section 1: Solar Geometry */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Solar Geometry - Position of the Sun
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding where the sun is in the sky at any given time is fundamental to calculating
              solar heat gains. The sun's position is defined by two angles measured from any point on Earth.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key solar angles:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Solar altitude (α):</strong> Vertical angle between the sun and the horizon (0° = horizon, 90° = overhead)</li>
                <li className="pl-1"><strong>Solar azimuth (γ):</strong> Horizontal angle measured clockwise from true north (0° = north, 90° = east, 180° = south)</li>
                <li className="pl-1"><strong>Declination (δ):</strong> Angle between sun's rays and equatorial plane (varies -23.5° to +23.5° annually)</li>
                <li className="pl-1"><strong>Hour angle (ω):</strong> Angular displacement of sun from solar noon (15° per hour)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Solar Altitude at Different Times (London, 51.5°N)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Date</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Solar Noon Altitude</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Sunrise/Sunset</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Day Length</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">21 June (Summer)</td>
                      <td className="border border-white/10 px-3 py-2">62°</td>
                      <td className="border border-white/10 px-3 py-2">04:43 / 21:21</td>
                      <td className="border border-white/10 px-3 py-2">16h 38m</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">21 March/Sept (Equinox)</td>
                      <td className="border border-white/10 px-3 py-2">38.5°</td>
                      <td className="border border-white/10 px-3 py-2">06:00 / 18:00</td>
                      <td className="border border-white/10 px-3 py-2">12h 00m</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">21 December (Winter)</td>
                      <td className="border border-white/10 px-3 py-2">15°</td>
                      <td className="border border-white/10 px-3 py-2">08:04 / 15:53</td>
                      <td className="border border-white/10 px-3 py-2">7h 49m</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Altitude Calculation</p>
              <p className="font-mono text-center text-sm mb-2">sin(α) = sin(φ)sin(δ) + cos(φ)cos(δ)cos(ω)</p>
              <p className="text-xs text-white/70 text-center">Where φ = latitude, δ = declination, ω = hour angle</p>
              <p className="text-xs text-white/70 text-center mt-2">At solar noon (ω = 0): α = 90° - φ + δ</p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>UK context:</strong> The sun never reaches directly overhead (90° altitude) in the UK. Maximum altitude varies from ~62° in summer to ~15° in winter at London's latitude.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 2: Irradiance and Radiation Types */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Irradiance - Measuring Solar Energy
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Irradiance is the instantaneous solar power received per unit area, measured in watts per square metre (W/m²).
              Understanding irradiance components is essential for accurate cooling load and renewable energy calculations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Components of solar radiation:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Direct beam (Ib):</strong> Radiation arriving directly from the sun's disc in parallel rays</li>
                <li className="pl-1"><strong>Diffuse (Id):</strong> Radiation scattered by atmosphere, clouds, arriving from all sky directions</li>
                <li className="pl-1"><strong>Ground reflected:</strong> Radiation reflected from surrounding surfaces (albedo effect)</li>
                <li className="pl-1"><strong>Global (I):</strong> Total radiation = Direct + Diffuse + Ground reflected</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical UK Irradiance Values</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Clear summer noon: 800-900 W/m² horizontal</li>
                  <li className="pl-1">Overcast summer: 100-300 W/m²</li>
                  <li className="pl-1">Clear winter noon: 200-400 W/m²</li>
                  <li className="pl-1">Overcast winter: 50-100 W/m²</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Diffuse Fraction</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Clear sky: 10-20% diffuse</li>
                  <li className="pl-1">Partly cloudy: 30-50% diffuse</li>
                  <li className="pl-1">Overcast: 90-100% diffuse</li>
                  <li className="pl-1">UK annual average: ~55% diffuse</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Annual Solar Irradiation by Region (Horizontal Surface)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Location</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Annual (kWh/m²)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Summer Peak Day</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">South England</td>
                      <td className="border border-white/10 px-3 py-2">1000-1100</td>
                      <td className="border border-white/10 px-3 py-2">6-7 kWh/m²</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Midlands</td>
                      <td className="border border-white/10 px-3 py-2">900-1000</td>
                      <td className="border border-white/10 px-3 py-2">5.5-6.5 kWh/m²</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Scotland</td>
                      <td className="border border-white/10 px-3 py-2">800-950</td>
                      <td className="border border-white/10 px-3 py-2">5-6 kWh/m²</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design note:</strong> UK has high diffuse fraction compared to Mediterranean climates. This means north-facing glazing still receives significant radiation from the sky dome.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 3: Direct and Diffuse Radiation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Direct and Diffuse Radiation Behaviour
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Direct and diffuse radiation behave differently on building surfaces. Understanding this distinction
              is crucial for accurate cooling load calculations and appropriate shading design.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Characteristics comparison:</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Characteristic</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Direct Beam</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Diffuse</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Direction</td>
                      <td className="border border-white/10 px-3 py-2">From sun's disc only</td>
                      <td className="border border-white/10 px-3 py-2">From all sky directions</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Shading effectiveness</td>
                      <td className="border border-white/10 px-3 py-2">Highly effective</td>
                      <td className="border border-white/10 px-3 py-2">Limited effect</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Incidence angle effect</td>
                      <td className="border border-white/10 px-3 py-2">Strong cosine relationship</td>
                      <td className="border border-white/10 px-3 py-2">Minimal angle dependence</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Weather dependence</td>
                      <td className="border border-white/10 px-3 py-2">Zero when overcast</td>
                      <td className="border border-white/10 px-3 py-2">Always present (daylight)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Shadow formation</td>
                      <td className="border border-white/10 px-3 py-2">Creates sharp shadows</td>
                      <td className="border border-white/10 px-3 py-2">No shadows</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Irradiance on Tilted Surface</p>
              <p className="font-mono text-center text-sm mb-2">I<sub>surface</sub> = I<sub>bn</sub> × cos(θ) + I<sub>d</sub> × F<sub>sky</sub> + I<sub>g</sub> × ρ × F<sub>ground</sub></p>
              <p className="text-xs text-white/70 text-center">Where θ = angle of incidence, F = view factors, ρ = ground reflectance (albedo)</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Orientation Effects (UK)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>South vertical:</strong> Peak in winter, less in summer</li>
                  <li className="pl-1"><strong>East/West vertical:</strong> Strong summer AM/PM peaks</li>
                  <li className="pl-1"><strong>North vertical:</strong> Diffuse only, relatively constant</li>
                  <li className="pl-1"><strong>Horizontal:</strong> Maximum in summer at noon</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Air Mass Effect</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">AM 1.0: Sun directly overhead (0° zenith)</li>
                  <li className="pl-1">AM 1.5: Standard test condition (48° altitude)</li>
                  <li className="pl-1">AM 2.0: 30° altitude (UK winter noon)</li>
                  <li className="pl-1">Higher AM = more atmospheric absorption</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Shading design:</strong> External shading is highly effective against direct radiation but has limited impact on diffuse gains. For overheating control, consider glazing g-values alongside shading.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Solar Gains Through Glazing */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Solar Gains Through Glazing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Solar gains through windows often dominate summer cooling loads in commercial buildings.
              Understanding the factors affecting solar heat gain is essential for HVAC sizing and overheating prevention.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Solar Heat Gain Calculation</p>
              <p className="font-mono text-center text-sm mb-2">Q<sub>solar</sub> = I × A × SHGC × F<sub>frame</sub> × F<sub>shading</sub></p>
              <p className="text-xs text-white/70 text-center">Where I = irradiance, A = glass area, SHGC = solar heat gain coefficient</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key glazing properties:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>SHGC (g-value):</strong> Fraction of incident solar energy entering as heat (0 to 1)</li>
                <li className="pl-1"><strong>Light transmittance (τv):</strong> Visible light transmission through glass</li>
                <li className="pl-1"><strong>Selectivity:</strong> Ratio of light to solar transmittance (τv/g) - higher is better</li>
                <li className="pl-1"><strong>Shading coefficient (SC):</strong> Older term, SC = SHGC/0.87</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Glazing Performance</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Glazing Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">g-value</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Light Trans.</th>
                      <th className="border border-white/10 px-3 py-2 text-left">U-value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Single clear</td>
                      <td className="border border-white/10 px-3 py-2">0.85</td>
                      <td className="border border-white/10 px-3 py-2">0.90</td>
                      <td className="border border-white/10 px-3 py-2">5.7</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Double clear</td>
                      <td className="border border-white/10 px-3 py-2">0.75</td>
                      <td className="border border-white/10 px-3 py-2">0.81</td>
                      <td className="border border-white/10 px-3 py-2">2.8</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Double Low-E (argon)</td>
                      <td className="border border-white/10 px-3 py-2">0.63</td>
                      <td className="border border-white/10 px-3 py-2">0.76</td>
                      <td className="border border-white/10 px-3 py-2">1.4</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Solar control double</td>
                      <td className="border border-white/10 px-3 py-2">0.35-0.45</td>
                      <td className="border border-white/10 px-3 py-2">0.50-0.70</td>
                      <td className="border border-white/10 px-3 py-2">1.3-1.6</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Triple glazed</td>
                      <td className="border border-white/10 px-3 py-2">0.50</td>
                      <td className="border border-white/10 px-3 py-2">0.70</td>
                      <td className="border border-white/10 px-3 py-2">0.8</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Shading Factors</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">External louvres: 0.10-0.20</li>
                  <li className="pl-1">External awning: 0.25-0.40</li>
                  <li className="pl-1">Mid-pane blind: 0.40-0.60</li>
                  <li className="pl-1">Internal blind (white): 0.45-0.65</li>
                  <li className="pl-1">Internal blind (dark): 0.80-0.95</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Frame Factor Adjustment</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Aluminium frame: 0.75-0.80</li>
                  <li className="pl-1">Timber frame: 0.70-0.75</li>
                  <li className="pl-1">uPVC frame: 0.70-0.80</li>
                  <li className="pl-1">Curtain walling: 0.60-0.85</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Part O consideration:</strong> Building Regulations Part O limits solar gains to prevent overheating. Maximum g-value limits apply to residential glazing based on orientation and area.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Solar Altitude Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Calculate the solar altitude at solar noon on 21st June in Birmingham (latitude 52.5°N).
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>At solar noon, altitude = 90° - latitude + declination</p>
                <p>Declination on 21st June = +23.5°</p>
                <p className="mt-2">α = 90° - 52.5° + 23.5° = <strong>61°</strong></p>
                <p className="mt-2 text-white/60">The sun reaches maximum altitude of 61° above the southern horizon</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Peak Solar Gain Through Window</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A south-facing office has 20m² of solar control glazing (g-value 0.40, frame factor 0.75).
                Peak irradiance on the facade is 450 W/m². Calculate the solar heat gain.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Solar gain = Irradiance × Area × g-value × Frame factor</p>
                <p className="mt-2">Q = 450 W/m² × 20m² × 0.40 × 0.75</p>
                <p>Q = <strong>2700W = 2.7kW</strong></p>
                <p className="mt-2 text-white/60">This is the instantaneous peak solar gain requiring cooling</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Effect of External Shading</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> The same window (Example 2) has external louvres installed with shading factor 0.15.
                What is the new solar gain?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Shaded solar gain = Unshaded gain × Shading factor</p>
                <p className="mt-2">Q = 2700W × 0.15 = <strong>405W</strong></p>
                <p className="mt-2 text-green-400">Reduction = 2700 - 405 = 2295W (85% reduction)</p>
                <p className="mt-2 text-white/60">External shading is highly effective at blocking direct solar gains</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 4: Annual Irradiation for PV Sizing</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A roof-mounted PV array in London faces south at 35° tilt. Annual irradiation is 1050 kWh/m².
                What energy yield can 20m² of panels (18% efficiency) produce?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Annual energy = Irradiation × Area × Efficiency × Performance ratio</p>
                <p className="mt-2">Assume performance ratio = 0.80 (typical)</p>
                <p>E = 1050 × 20 × 0.18 × 0.80</p>
                <p>E = <strong>3024 kWh/year</strong></p>
                <p className="mt-2 text-white/60">Equivalent to ~3600W peak system (20m² × 180W/m²)</p>
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
                <li className="pl-1"><strong>Solar altitude at noon:</strong> α = 90° - φ + δ</li>
                <li className="pl-1"><strong>Air mass:</strong> AM = 1 / sin(α)</li>
                <li className="pl-1"><strong>Solar gain:</strong> Q = I × A × SHGC × Fframe × Fshade</li>
                <li className="pl-1"><strong>Direct on surface:</strong> Isurf = Ibn × cos(θ)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Solar constant: <strong>1367 W/m²</strong> (outside atmosphere)</li>
                <li className="pl-1">UK peak irradiance: <strong>800-900 W/m²</strong> (clear summer)</li>
                <li className="pl-1">UK annual irradiation: <strong>900-1100 kWh/m²</strong> (tilted south)</li>
                <li className="pl-1">Summer noon altitude (London): <strong>62°</strong></li>
                <li className="pl-1">Winter noon altitude (London): <strong>15°</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Forgetting diffuse:</strong> Even shaded surfaces receive diffuse radiation</li>
                <li className="pl-1"><strong>Wrong orientation:</strong> South-facing vertical gets more in winter than summer</li>
                <li className="pl-1"><strong>Ignoring frame:</strong> Frame factor reduces effective glass area 15-30%</li>
                <li className="pl-1"><strong>Clock vs solar time:</strong> BST means solar noon is ~13:00, not 12:00</li>
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
                <p className="font-medium text-white mb-1">Solar Geometry</p>
                <ul className="space-y-0.5">
                  <li>Altitude: 0° (horizon) to 90° (overhead)</li>
                  <li>Azimuth: Clockwise from North</li>
                  <li>Declination: ±23.5° annual variation</li>
                  <li>Hour angle: 15° per hour from noon</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Glazing Performance</p>
                <ul className="space-y-0.5">
                  <li>g-value 0.75: Standard double</li>
                  <li>g-value 0.35-0.45: Solar control</li>
                  <li>External shading: 80-90% effective</li>
                  <li>Internal blind: 35-55% effective</li>
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
            <Link to="../h-n-c-module2-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2-section5-2">
              Next: Heat Gains and Losses
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule2Section5_1;
