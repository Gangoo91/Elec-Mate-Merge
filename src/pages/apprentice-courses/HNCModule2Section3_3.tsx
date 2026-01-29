import { ArrowLeft, BarChart3, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Psychrometric Charts - HNC Module 2 Section 3.3";
const DESCRIPTION = "Learn to read and use psychrometric charts for HVAC design: chart construction, axes, property lines, plotting air conditions and CIBSE chart applications.";

const quickCheckQuestions = [
  {
    id: "chart-x-axis",
    question: "What property is shown on the horizontal (x) axis of a standard psychrometric chart?",
    options: ["Relative humidity", "Dry bulb temperature", "Moisture content", "Enthalpy"],
    correctIndex: 1,
    explanation: "The horizontal axis shows dry bulb temperature in °C. This is the primary reference for locating any air condition on the chart."
  },
  {
    id: "chart-y-axis",
    question: "What property is shown on the vertical (y) axis of a psychrometric chart?",
    options: ["Wet bulb temperature", "Enthalpy", "Moisture content (g/kg)", "Relative humidity"],
    correctIndex: 2,
    explanation: "The vertical axis shows moisture content (specific humidity) in g/kg of dry air. This scale typically runs from 0 to about 30 g/kg."
  },
  {
    id: "saturation-line",
    question: "What does the curved saturation line on a psychrometric chart represent?",
    options: ["Constant enthalpy", "100% relative humidity", "Constant wet bulb", "Sea level pressure"],
    correctIndex: 1,
    explanation: "The saturation curve represents 100% RH - air that is fully saturated with water vapour. All feasible air conditions lie on or below this curve."
  },
  {
    id: "two-properties",
    question: "How many independent properties are needed to fix an air state on the psychrometric chart?",
    options: ["One", "Two", "Three", "Four"],
    correctIndex: 1,
    explanation: "Any two independent psychrometric properties will fix the air state on the chart. Common combinations are: dry bulb + wet bulb, or dry bulb + RH, or dry bulb + moisture content."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The psychrometric chart is valid for a specific:",
    options: [
      "Temperature range only",
      "Atmospheric pressure (typically 101.325 kPa)",
      "Humidity range only",
      "Time of year"
    ],
    correctAnswer: 1,
    explanation: "Psychrometric charts are constructed for a specific atmospheric pressure, usually standard sea-level pressure of 101.325 kPa. Charts for different altitudes show different curves."
  },
  {
    id: 2,
    question: "On a psychrometric chart, lines of constant relative humidity are:",
    options: [
      "Straight horizontal lines",
      "Straight vertical lines",
      "Curved lines following the saturation curve shape",
      "Diagonal straight lines"
    ],
    correctAnswer: 2,
    explanation: "Constant RH lines are curved, roughly parallel to the saturation curve. The saturation curve itself is the 100% RH line."
  },
  {
    id: 3,
    question: "Wet bulb temperature lines on a psychrometric chart slope:",
    options: [
      "Vertically upward",
      "Horizontally to the right",
      "Diagonally downward from left to right",
      "Diagonally upward from left to right"
    ],
    correctAnswer: 2,
    explanation: "Wet bulb (and enthalpy) lines slope downward from left to right. They start from the saturation curve and extend into the body of the chart."
  },
  {
    id: 4,
    question: "If air at 22°C dry bulb, 50% RH is sensibly heated to 28°C, what happens on the chart?",
    options: [
      "The point moves horizontally to the right",
      "The point moves vertically upward",
      "The point moves along the saturation curve",
      "The point moves diagonally along a wet bulb line"
    ],
    correctAnswer: 0,
    explanation: "Sensible heating moves the state point horizontally to the right (higher dry bulb, same moisture content). No moisture is added or removed."
  },
  {
    id: 5,
    question: "What is the specific enthalpy of moist air at the origin (0°C, 0 g/kg)?",
    options: ["0 kJ/kg", "Approximately 0 kJ/kg", "2501 kJ/kg", "Undefined"],
    correctAnswer: 1,
    explanation: "By convention, dry air at 0°C has zero enthalpy. The chart reference point is typically 0°C dry bulb, 0 g/kg moisture content."
  },
  {
    id: 6,
    question: "Specific volume lines on a psychrometric chart are:",
    options: [
      "Horizontal lines",
      "Near-vertical lines sloping slightly",
      "The same as constant RH lines",
      "Only shown on the saturation curve"
    ],
    correctAnswer: 1,
    explanation: "Specific volume lines are nearly vertical, sloping very slightly to the right as temperature increases. They are often spaced at 0.01 m³/kg intervals."
  },
  {
    id: 7,
    question: "What happens to enthalpy when air is adiabatically humidified along a wet bulb line?",
    options: [
      "Enthalpy increases significantly",
      "Enthalpy decreases significantly",
      "Enthalpy remains approximately constant",
      "Enthalpy becomes zero"
    ],
    correctAnswer: 2,
    explanation: "Along an adiabatic saturation (wet bulb) line, enthalpy is approximately constant. The sensible heat lost equals the latent heat gained from evaporation."
  },
  {
    id: 8,
    question: "To find dew point from a chart, starting from the air state point, move:",
    options: [
      "Horizontally to the right",
      "Horizontally to the left until hitting the saturation curve",
      "Vertically downward",
      "Diagonally along a wet bulb line"
    ],
    correctAnswer: 1,
    explanation: "Dew point is found by moving horizontally left (constant moisture content) until reaching the saturation curve. The temperature at that intersection is the dew point."
  },
  {
    id: 9,
    question: "The CIBSE psychrometric chart typically covers a temperature range of:",
    options: [
      "-20°C to +20°C",
      "-10°C to +60°C",
      "0°C to +50°C",
      "+10°C to +40°C"
    ],
    correctAnswer: 1,
    explanation: "The standard CIBSE chart covers approximately -10°C to +60°C dry bulb, which accommodates most UK HVAC applications including winter and summer design conditions."
  },
  {
    id: 10,
    question: "If you know dry bulb = 20°C and wet bulb = 14°C, you can determine:",
    options: [
      "Only relative humidity",
      "Only moisture content",
      "All other psychrometric properties",
      "Nothing without more information"
    ],
    correctAnswer: 2,
    explanation: "Two independent properties fix the air state completely. From this point, you can read moisture content, RH, dew point, enthalpy, and specific volume directly from the chart."
  },
  {
    id: 11,
    question: "The enthalpy scale on a CIBSE chart typically reads in:",
    options: [
      "J/kg",
      "kJ/kg of dry air",
      "kJ/kg of moist air",
      "BTU/lb"
    ],
    correctAnswer: 1,
    explanation: "CIBSE charts use kJ/kg of dry air for enthalpy. This convention ensures consistency as moisture content changes during processes."
  },
  {
    id: 12,
    question: "Why is the psychrometric chart preferred over calculations for HVAC design?",
    options: [
      "It is more accurate",
      "It visualises processes and relationships between properties",
      "Calculations are not possible",
      "Charts are required by regulations"
    ],
    correctAnswer: 1,
    explanation: "The chart provides visual understanding of air conditioning processes and shows how properties change together. It makes it easy to plot and analyse heating, cooling, mixing and humidification."
  }
];

const faqs = [
  {
    question: "Why are there different psychrometric charts for different altitudes?",
    answer: "Psychrometric relationships depend on atmospheric pressure. At higher altitudes, lower pressure means the same moisture content represents a higher partial pressure ratio, affecting RH calculations. Charts for 1000m or 1500m elevation show different curve positions. Always use a chart matching your site pressure."
  },
  {
    question: "How accurate is reading from a psychrometric chart?",
    answer: "With careful reading using a sharp pencil and ruler, accuracy of ±0.5°C for temperatures and ±0.2 g/kg for moisture content is achievable. For precise calculations, use psychrometric equations or software. Charts are excellent for understanding processes and preliminary design."
  },
  {
    question: "What is the difference between enthalpy and wet bulb lines?",
    answer: "For practical purposes in HVAC, enthalpy and wet bulb lines are often treated as identical. Strictly, they differ slightly because the adiabatic saturation temperature (theoretical wet bulb) differs marginally from the actual wet bulb. On most charts, the error is negligible."
  },
  {
    question: "Can I use the chart for temperatures below 0°C?",
    answer: "Yes, but with care. Below 0°C, moisture may exist as ice rather than liquid water, and the latent heat values differ. Some charts extend to -10°C or lower. For very cold conditions, use charts specifically designed for low temperatures or perform calculations."
  },
  {
    question: "How do I plot a mixing process on the chart?",
    answer: "When two air streams mix, the resulting state lies on a straight line between the two original states. The position on this line depends on the mass flow ratio: closer to the larger flow. Use the lever rule: the mixed state divides the line in inverse ratio to the masses."
  },
  {
    question: "What software can replace psychrometric charts?",
    answer: "Several options exist: CIBSE Psychrometric Calculator (Excel-based), EnergyPlus, carrier HAP, Trane TRACE, and various free online calculators. These tools perform the same calculations but allow quicker iteration. Understanding the chart remains essential for interpreting results."
  }
];

const HNCModule2Section3_3 = () => {
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
            <BarChart3 className="h-4 w-4" />
            <span>Module 2.3.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Psychrometric Charts
          </h1>
          <p className="text-white/80">
            The essential graphical tool for analysing and designing air conditioning processes
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-cyan-400/5 border-l-2 border-cyan-400/50">
            <p className="text-cyan-400 text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>X-axis:</strong> Dry bulb temperature (°C)</li>
              <li className="pl-1"><strong>Y-axis:</strong> Moisture content (g/kg)</li>
              <li className="pl-1"><strong>Saturation curve:</strong> 100% RH boundary</li>
              <li className="pl-1"><strong>Two properties:</strong> Fix all others</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-cyan-400/5 border-l-2 border-cyan-400/50">
            <p className="text-cyan-400/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Design tool:</strong> Plot AHU processes</li>
              <li className="pl-1"><strong>Coil sizing:</strong> Determine load requirements</li>
              <li className="pl-1"><strong>Mixing:</strong> Calculate mixed air conditions</li>
              <li className="pl-1"><strong>Commissioning:</strong> Verify system performance</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify all lines and scales on a psychrometric chart",
              "Plot air conditions from given property pairs",
              "Read all properties from a plotted state point",
              "Understand the construction and limitations of charts",
              "Use charts to analyse air conditioning processes",
              "Apply CIBSE chart conventions for UK practice"
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

        {/* Section 1: Chart Construction */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">01</span>
            Chart Construction and Axes
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The psychrometric chart is a graphical representation of the thermodynamic properties
              of moist air. It allows engineers to visualise and analyse air conditioning processes.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-cyan-400/80 mb-3">Chart Structure</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium mb-2">Primary Axes:</p>
                  <ul className="space-y-1 text-white/90">
                    <li>• Horizontal: Dry bulb temperature (°C)</li>
                    <li>• Vertical: Moisture content (g/kg dry air)</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-2">Chart Boundaries:</p>
                  <ul className="space-y-1 text-white/90">
                    <li>• Upper curve: Saturation line (100% RH)</li>
                    <li>• Lower bound: 0 g/kg (dry air)</li>
                    <li>• Left/Right: Temperature range</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-cyan-400/80 mb-2">CIBSE Chart Specifications</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Feature</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Specification</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pressure</td>
                      <td className="border border-white/10 px-3 py-2">101.325 kPa</td>
                      <td className="border border-white/10 px-3 py-2">Sea level standard</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Temperature range</td>
                      <td className="border border-white/10 px-3 py-2">-10°C to +60°C</td>
                      <td className="border border-white/10 px-3 py-2">Covers UK conditions</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Moisture range</td>
                      <td className="border border-white/10 px-3 py-2">0 to 30 g/kg</td>
                      <td className="border border-white/10 px-3 py-2">Typical maximum</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Enthalpy reference</td>
                      <td className="border border-white/10 px-3 py-2">0°C dry air = 0 kJ/kg</td>
                      <td className="border border-white/10 px-3 py-2">Datum point</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-cyan-400/70">
              <strong>Important:</strong> The chart only shows states below the saturation curve. Points above this
              curve represent super-saturated conditions (fog) which are not normally encountered in HVAC systems.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Property Lines */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">02</span>
            Property Lines on the Chart
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Multiple property lines are overlaid on the basic chart grid, allowing all psychrometric
              properties to be read from a single state point.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-cyan-400/80 mb-2">Types of Lines on the Chart</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Line Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Appearance</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Direction</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Dry bulb temperature</td>
                      <td className="border border-white/10 px-3 py-2">Vertical straight lines</td>
                      <td className="border border-white/10 px-3 py-2">From bottom upward</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Moisture content</td>
                      <td className="border border-white/10 px-3 py-2">Horizontal straight lines</td>
                      <td className="border border-white/10 px-3 py-2">From left to right</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Relative humidity</td>
                      <td className="border border-white/10 px-3 py-2">Curved lines</td>
                      <td className="border border-white/10 px-3 py-2">Parallel to saturation curve</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Wet bulb / Enthalpy</td>
                      <td className="border border-white/10 px-3 py-2">Diagonal straight lines</td>
                      <td className="border border-white/10 px-3 py-2">Slope down left to right</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Specific volume</td>
                      <td className="border border-white/10 px-3 py-2">Near-vertical lines</td>
                      <td className="border border-white/10 px-3 py-2">Slight slope to right</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-cyan-400/80 mb-2">Reading the Chart</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Start with two known properties</li>
                  <li className="pl-1">Find intersection of their lines</li>
                  <li className="pl-1">Read other properties from that point</li>
                  <li className="pl-1">Use interpolation between printed lines</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-cyan-400/80 mb-2">Common Starting Pairs</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>t<sub>db</sub> + RH</strong> — weather data</li>
                  <li className="pl-1"><strong>t<sub>db</sub> + t<sub>wb</sub></strong> — psychrometer reading</li>
                  <li className="pl-1"><strong>t<sub>db</sub> + g</strong> — design conditions</li>
                  <li className="pl-1"><strong>t<sub>db</sub> + h</strong> — energy calculations</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Plotting Points */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">03</span>
            Plotting Air States
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Any air state within the chart boundaries can be precisely located using two known
              properties. The intersection of the corresponding lines defines the state point.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-cyan-400/80 mb-2">Step-by-Step Plotting</p>
              <ol className="text-sm text-white/90 space-y-2 list-decimal list-inside">
                <li>Identify the two known properties</li>
                <li>Locate the line for the first property</li>
                <li>Locate the line for the second property</li>
                <li>Mark the intersection point clearly</li>
                <li>Read all other properties from this point</li>
              </ol>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-cyan-400/80 mb-2">Example: Plotting 22°C db, 50% RH</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Property</th>
                      <th className="border border-white/10 px-3 py-2 text-left">How to Find</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Value Read</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Dry bulb</td>
                      <td className="border border-white/10 px-3 py-2">Given - vertical line at 22°C</td>
                      <td className="border border-white/10 px-3 py-2">22°C</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Relative humidity</td>
                      <td className="border border-white/10 px-3 py-2">Given - curved 50% line</td>
                      <td className="border border-white/10 px-3 py-2">50%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Moisture content</td>
                      <td className="border border-white/10 px-3 py-2">Read horizontally to y-axis</td>
                      <td className="border border-white/10 px-3 py-2">8.3 g/kg</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Wet bulb</td>
                      <td className="border border-white/10 px-3 py-2">Follow diagonal to saturation</td>
                      <td className="border border-white/10 px-3 py-2">15.5°C</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Dew point</td>
                      <td className="border border-white/10 px-3 py-2">Move left horizontal to saturation</td>
                      <td className="border border-white/10 px-3 py-2">11°C</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Enthalpy</td>
                      <td className="border border-white/10 px-3 py-2">Read from diagonal scale</td>
                      <td className="border border-white/10 px-3 py-2">43 kJ/kg</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Specific volume</td>
                      <td className="border border-white/10 px-3 py-2">Interpolate between v lines</td>
                      <td className="border border-white/10 px-3 py-2">0.845 m³/kg</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Process Lines */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">04</span>
            Plotting Processes
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Air conditioning processes appear as lines connecting state points on the chart.
              Each type of process produces a characteristic direction of movement.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-cyan-400/80 mb-2">Basic Process Directions</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Process</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Direction on Chart</th>
                      <th className="border border-white/10 px-3 py-2 text-left">What Changes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Sensible heating</td>
                      <td className="border border-white/10 px-3 py-2">Horizontal right →</td>
                      <td className="border border-white/10 px-3 py-2">t<sub>db</sub>↑, RH↓, g constant</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Sensible cooling</td>
                      <td className="border border-white/10 px-3 py-2">Horizontal left ←</td>
                      <td className="border border-white/10 px-3 py-2">t<sub>db</sub>↓, RH↑, g constant</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Humidification (isothermal)</td>
                      <td className="border border-white/10 px-3 py-2">Vertical up ↑</td>
                      <td className="border border-white/10 px-3 py-2">g↑, RH↑, t<sub>db</sub> constant</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Dehumidification</td>
                      <td className="border border-white/10 px-3 py-2">Vertical down ↓</td>
                      <td className="border border-white/10 px-3 py-2">g↓, RH↓, t<sub>db</sub> constant</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Adiabatic humidification</td>
                      <td className="border border-white/10 px-3 py-2">Along wet bulb line ↙</td>
                      <td className="border border-white/10 px-3 py-2">g↑, t<sub>db</sub>↓, h constant</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cooling with dehumidification</td>
                      <td className="border border-white/10 px-3 py-2">Diagonal toward saturation ↙</td>
                      <td className="border border-white/10 px-3 py-2">t<sub>db</sub>↓, g↓, follows coil</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Mixing two air streams</td>
                      <td className="border border-white/10 px-3 py-2">Straight line between states</td>
                      <td className="border border-white/10 px-3 py-2">Position by mass ratio</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-cyan-400/80 mb-2">Using Process Lines</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Plot initial state from known conditions</li>
                  <li className="pl-1">Apply process direction rules</li>
                  <li className="pl-1">Find final state from equipment capacity</li>
                  <li className="pl-1">Calculate loads from property changes</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-cyan-400/80 mb-2">Typical AHU Sequence</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">1. Outside air state (design condition)</li>
                  <li className="pl-1">2. Mixed air (after recirculation)</li>
                  <li className="pl-1">3. Off-coil state (after cooling/heating)</li>
                  <li className="pl-1">4. Supply state (after fan heat gain)</li>
                </ul>
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
              <h3 className="text-sm font-medium text-cyan-400/80 mb-2">Example 1: Finding All Properties</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A sling psychrometer reads 24°C dry bulb and 17°C wet bulb. Find RH, moisture content, dew point and enthalpy.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Step 1: Plot the state point</p>
                <p>• Find vertical line at 24°C dry bulb</p>
                <p>• Find diagonal wet bulb line at 17°C</p>
                <p>• Mark intersection</p>
                <p className="mt-2">Step 2: Read properties from intersection</p>
                <p>• RH (follow curved line): <strong>50%</strong></p>
                <p>• Moisture content (horizontal to y-axis): <strong>9.4 g/kg</strong></p>
                <p>• Dew point (horizontal left to saturation): <strong>13°C</strong></p>
                <p>• Enthalpy (from diagonal scale): <strong>48 kJ/kg</strong></p>
                <p>• Specific volume: <strong>0.855 m³/kg</strong></p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-cyan-400/80 mb-2">Example 2: Sensible Heating Process</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Air at 12°C, 70% RH is heated to 22°C. Find the new RH and verify moisture content is unchanged.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Step 1: Plot initial state (12°C, 70% RH)</p>
                <p>• Read initial moisture content: 6.2 g/kg</p>
                <p className="mt-2">Step 2: Move horizontally to 22°C</p>
                <p>• Sensible heating = horizontal line (constant g)</p>
                <p className="mt-2">Step 3: Read final state at 22°C</p>
                <p>• New RH: <strong>38%</strong> (much lower)</p>
                <p>• Moisture content: <strong>6.2 g/kg</strong> (unchanged ✓)</p>
                <p>• Enthalpy increased from 27.5 to 37.5 kJ/kg</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-cyan-400/80 mb-2">Example 3: Mixing Two Air Streams</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> 3 kg/s of outside air (30°C, 60% RH) mixes with 7 kg/s of return air (24°C, 50% RH). Find the mixed condition.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Step 1: Plot both states</p>
                <p>• Outside (O): 30°C, 60% RH → g = 16.0 g/kg</p>
                <p>• Return (R): 24°C, 50% RH → g = 9.4 g/kg</p>
                <p className="mt-2">Step 2: Draw line between O and R</p>
                <p className="mt-2">Step 3: Find mixed point (M) by lever rule</p>
                <p>• Mass ratio: 3:7 (outside:return)</p>
                <p>• M is 3/10 of distance from R toward O</p>
                <p className="mt-2">Step 4: Read mixed state properties</p>
                <p>• Mixed dry bulb: <strong>25.8°C</strong></p>
                <p>• Mixed moisture: <strong>11.4 g/kg</strong></p>
                <p>• Mixed RH: <strong>53%</strong></p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-cyan-400/80 mb-2">Example 4: Determining Dew Point for Condensation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Room air is 21°C, 55% RH. What is the minimum surface temperature to avoid condensation?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Step 1: Plot room condition (21°C, 55% RH)</p>
                <p>• Moisture content from chart: 8.6 g/kg</p>
                <p className="mt-2">Step 2: Find dew point</p>
                <p>• Move horizontally left to saturation curve</p>
                <p>• Read temperature at intersection</p>
                <p className="mt-2">Dew point = <strong>11.5°C</strong></p>
                <p className="mt-2 text-white/60">Any surface at or below 11.5°C will have condensation</p>
                <p className="text-white/60">Keep surfaces above 12°C for safety margin</p>
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
              <h3 className="text-sm font-medium text-cyan-400/80 mb-2">Chart Reading Tips</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Use a sharp pencil and clear ruler</li>
                <li className="pl-1">Interpolate carefully between printed lines</li>
                <li className="pl-1">Check readings by using different property paths</li>
                <li className="pl-1">Mark state points clearly for process plotting</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-cyan-400/80 mb-2">Process Directions to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Horizontal</strong> = sensible heat only (g constant)</li>
                <li className="pl-1"><strong>Vertical</strong> = latent heat only (t<sub>db</sub> constant)</li>
                <li className="pl-1"><strong>Along wet bulb line</strong> = adiabatic (h constant)</li>
                <li className="pl-1"><strong>Toward saturation</strong> = cooling coil operation</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Wrong chart pressure</strong> — Use sea level for UK lowlands</li>
                <li className="pl-1"><strong>Confusing wet bulb and enthalpy lines</strong> — Nearly parallel but distinct</li>
                <li className="pl-1"><strong>Plotting above saturation</strong> — Not physically possible</li>
                <li className="pl-1"><strong>Mixing line position</strong> — Divide by mass, not volume</li>
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
                <p className="font-medium text-white mb-1">Chart Axes</p>
                <ul className="space-y-0.5">
                  <li>X-axis: Dry bulb (°C)</li>
                  <li>Y-axis: Moisture (g/kg)</li>
                  <li>Curved: RH lines (%)</li>
                  <li>Diagonal: Wet bulb / enthalpy</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Process Directions</p>
                <ul className="space-y-0.5">
                  <li>Heating: → (right)</li>
                  <li>Cooling: ← (left)</li>
                  <li>Humidify: ↑ (up)</li>
                  <li>Dehumidify: ↓ (down)</li>
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
            <Link to="../h-n-c-module2-section3-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Humidity
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-cyan-500 text-white hover:bg-cyan-500/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2-section3-4">
              Next: Air Conditioning Processes
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule2Section3_3;
