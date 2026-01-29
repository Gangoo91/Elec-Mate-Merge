import { ArrowLeft, Lightbulb, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Illumination Calculations - HNC Module 2 Section 4.2";
const DESCRIPTION = "Master the lumen method, point-by-point calculations, maintained illuminance, utilisation factors, and CIBSE lighting guide applications for building services.";

const quickCheckQuestions = [
  {
    id: "lumen-method-formula",
    question: "In the lumen method, which formula calculates the number of luminaires required?",
    options: [
      "N = E × A × MF × UF / Φ",
      "N = (E × A) / (Φ × UF × MF)",
      "N = Φ × UF × MF / (E × A)",
      "N = (Φ × A) / (E × UF × MF)"
    ],
    correctIndex: 1,
    explanation: "N = (E × A) / (Φ × UF × MF) where E = required illuminance (lux), A = area (m²), Φ = luminaire lumens, UF = utilisation factor, MF = maintenance factor."
  },
  {
    id: "maintained-illuminance",
    question: "What is 'maintained illuminance' in lighting design?",
    options: [
      "The initial illuminance when lamps are new",
      "The minimum illuminance over the maintenance cycle",
      "The maximum illuminance achievable",
      "The illuminance at the walls"
    ],
    correctIndex: 1,
    explanation: "Maintained illuminance (Em) is the minimum average illuminance on the working plane before maintenance is required. It accounts for lamp lumen depreciation and dirt accumulation."
  },
  {
    id: "room-index",
    question: "What is the room index (RI) used for in lighting calculations?",
    options: [
      "Determining lamp wattage",
      "Calculating maintenance schedules",
      "Finding the utilisation factor from tables",
      "Measuring surface reflectances"
    ],
    correctIndex: 2,
    explanation: "The room index (RI = L×W / Hm(L+W)) describes room proportions and is used with surface reflectances to read utilisation factors from luminaire photometric tables."
  },
  {
    id: "inverse-square-law",
    question: "According to the inverse square law, if distance from a light source doubles, illuminance becomes:",
    options: ["Half", "Quarter", "One-eighth", "Double"],
    correctIndex: 1,
    explanation: "The inverse square law states E = I/d². Doubling distance (2d) gives E = I/(2d)² = I/4d², so illuminance reduces to one quarter of its original value."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What does the lumen method calculate?",
    options: [
      "Point illuminance at a specific location",
      "Average illuminance over a working plane",
      "Maximum illuminance in a room",
      "Vertical illuminance on walls"
    ],
    correctAnswer: 1,
    explanation: "The lumen method calculates average illuminance over the horizontal working plane. It is suitable for regular arrays of luminaires providing general lighting."
  },
  {
    id: 2,
    question: "An office of 120m² requires 400 lux maintained. Luminaires output 3200 lumens each. UF = 0.55, MF = 0.8. How many luminaires are needed?",
    options: ["20", "27", "34", "40"],
    correctAnswer: 2,
    explanation: "N = (E × A) / (Φ × UF × MF) = (400 × 120) / (3200 × 0.55 × 0.8) = 48000 / 1408 = 34.1, so 34 luminaires minimum."
  },
  {
    id: 3,
    question: "What factors affect the Utilisation Factor (UF)?",
    options: [
      "Room proportions and surface reflectances only",
      "Lamp type and colour temperature",
      "Room proportions, surface reflectances, and luminaire distribution",
      "Maintenance schedule and cleaning frequency"
    ],
    correctAnswer: 2,
    explanation: "UF depends on: room index (proportions), surface reflectances (ceiling, walls, floor), and luminaire light distribution characteristics. It represents how much emitted light reaches the working plane."
  },
  {
    id: 4,
    question: "The maintenance factor (MF) typically accounts for which depreciation effects?",
    options: [
      "Lamp lumen depreciation only",
      "Luminaire dirt accumulation only",
      "Both lamp depreciation and luminaire/room dirt accumulation",
      "Voltage fluctuations"
    ],
    correctAnswer: 2,
    explanation: "MF = LLMF × LSF × LMF × RSMF, accounting for lamp lumen maintenance, lamp survival, luminaire maintenance, and room surface maintenance factors."
  },
  {
    id: 5,
    question: "CIBSE LG7 recommends what maintained illuminance for general office work?",
    options: ["200 lux", "300 lux", "400-500 lux", "750 lux"],
    correctAnswer: 2,
    explanation: "CIBSE LG7 recommends 300-500 lux for general office work depending on task difficulty. 500 lux is typical for writing, typing, and reading. CAD work may require higher levels."
  },
  {
    id: 6,
    question: "What is the point-by-point method used for?",
    options: [
      "Quick estimates of average illuminance",
      "Calculating illuminance at specific points",
      "Determining lamp replacement schedules",
      "Measuring existing lighting installations"
    ],
    correctAnswer: 1,
    explanation: "The point-by-point method calculates illuminance at specific points using intensity data and geometry. It is used for detailed analysis, spotlighting, and irregular layouts."
  },
  {
    id: 7,
    question: "For the point-by-point method, what is the formula for illuminance from a point source at angle θ to normal?",
    options: [
      "E = I × cos θ / d²",
      "E = I / (d × cos θ)",
      "E = I × d² × cos θ",
      "E = I / d"
    ],
    correctAnswer: 0,
    explanation: "E = (I × cos θ) / d² combines the inverse square law with the cosine law. I is intensity towards the point (cd), d is distance (m), θ is angle from normal."
  },
  {
    id: 8,
    question: "What room index would you calculate for a room 12m × 8m with mounting height 2.5m above the working plane?",
    options: ["1.5", "1.92", "2.4", "3.2"],
    correctAnswer: 1,
    explanation: "RI = (L × W) / (Hm × (L + W)) = (12 × 8) / (2.5 × (12 + 8)) = 96 / 50 = 1.92"
  },
  {
    id: 9,
    question: "Which CIBSE document provides maintained illuminance recommendations for different building types?",
    options: ["CIBSE Guide A", "CIBSE LG series", "CIBSE TM10", "BS 7671"],
    correctAnswer: 1,
    explanation: "The CIBSE Lighting Guides (LG series) provide specific recommendations: LG1 Industrial, LG2 Hospitals, LG5 Lecture/Conference, LG6 Outdoor, LG7 Offices, LG10 Daylighting."
  },
  {
    id: 10,
    question: "A spotlight has intensity 5000 cd towards a point 3m away at 30° to the normal. What is the illuminance?",
    options: ["481 lux", "556 lux", "642 lux", "1667 lux"],
    correctAnswer: 0,
    explanation: "E = (I × cos θ) / d² = (5000 × cos 30°) / 3² = (5000 × 0.866) / 9 = 4330 / 9 = 481 lux"
  },
  {
    id: 11,
    question: "What happens to the utilisation factor as room index increases?",
    options: [
      "It decreases",
      "It increases",
      "It stays constant",
      "It fluctuates randomly"
    ],
    correctAnswer: 1,
    explanation: "As room index increases (larger, more proportionate rooms or lower mounting height), more light reaches the working plane directly, so UF increases. Small, tall rooms have low UF."
  },
  {
    id: 12,
    question: "What is a typical maintenance factor for LED luminaires in a clean office environment?",
    options: ["0.6", "0.7", "0.8", "0.95"],
    correctAnswer: 2,
    explanation: "LED luminaires in clean environments typically use MF around 0.8, accounting for gradual lumen depreciation over life and minimal dirt accumulation with regular cleaning."
  }
];

const faqs = [
  {
    question: "When should I use the lumen method versus point-by-point calculations?",
    answer: "Use the lumen method for regular arrays of luminaires providing uniform general lighting - it's quick and gives average illuminance. Use point-by-point for spotlights, accent lighting, specific task areas, irregular layouts, or when you need to know illuminance at particular locations. Most commercial projects use both: lumen method for initial sizing, software (which uses point-by-point) for detailed verification."
  },
  {
    question: "What surface reflectances should I assume for calculations?",
    answer: "CIBSE defaults are: ceiling 0.7, walls 0.5, floor 0.2 (often expressed as 70/50/20 or C70 W50 F20). Actual values depend on finishes - white ceilings can be 0.8+, dark walls 0.2-0.3. Dark rooms need more luminaires. Check actual reflectances for refurbishment projects where surfaces already exist."
  },
  {
    question: "How do I choose an appropriate maintenance factor?",
    answer: "MF depends on: lamp type (LED ~0.9 LLMF, fluorescent ~0.8), luminaire type (IP rating, optical design), room cleanliness (office ~0.9 LMF, industrial ~0.8), and maintenance interval. Overall MF = LLMF × LMF × RSMF. Typical combined values: clean office 0.8, normal industrial 0.7, dirty industrial 0.6. CIBSE SLL provides detailed guidance."
  },
  {
    question: "Why doesn't my lighting software match my manual calculations?",
    answer: "Common reasons include: software using full photometric data versus UF tables (more accurate), inter-reflections calculated differently, working plane height differences, or different MF assumptions. Software typically gives slightly different (usually higher) results than manual lumen method because it can account for all light paths. Both methods should be close - large discrepancies suggest input errors."
  },
  {
    question: "How do I calculate lighting for an irregular shaped room?",
    answer: "For L-shaped or irregular rooms, either: divide into regular sections and calculate each, use lighting design software which handles any shape, or use a conservative 'bounding rectangle' approach. Software is strongly recommended for complex spaces as it properly accounts for light exchange between areas."
  },
  {
    question: "What is the difference between maintained and initial illuminance?",
    answer: "Initial illuminance is when everything is new (lamps at full output, clean luminaires). Maintained illuminance is the minimum acceptable level just before maintenance. Initial = Maintained / MF. Design to maintained illuminance - this ensures adequate light throughout the maintenance cycle. Never design to initial illuminance unless you accept the space will become under-lit."
  }
];

const HNCModule2Section4_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2-section4">
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
            <Lightbulb className="h-4 w-4" />
            <span>Module 2.4.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Illumination Calculations
          </h1>
          <p className="text-white/80">
            The lumen method, point-by-point calculations, and CIBSE recommendations for building services lighting design
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Lumen method:</strong> N = (E × A) / (Φ × UF × MF)</li>
              <li className="pl-1"><strong>Point-by-point:</strong> E = I cos θ / d²</li>
              <li className="pl-1"><strong>Room index:</strong> RI = LW / Hm(L+W)</li>
              <li className="pl-1"><strong>Maintained illuminance:</strong> Design minimum</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Office:</strong> 300-500 lux (CIBSE LG7)</li>
              <li className="pl-1"><strong>Warehouse:</strong> 150-200 lux</li>
              <li className="pl-1"><strong>Retail:</strong> 300-500 lux</li>
              <li className="pl-1"><strong>Typical MF:</strong> 0.7-0.8</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply the lumen method to calculate number of luminaires required",
              "Calculate room index and determine utilisation factors",
              "Use point-by-point method for specific illuminance calculations",
              "Understand maintained illuminance and maintenance factors",
              "Reference CIBSE lighting guides for design recommendations",
              "Apply inverse square and cosine laws to lighting calculations"
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

        {/* Section 1: The Lumen Method */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The Lumen Method
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The lumen method is the primary technique for calculating the number of luminaires required to achieve
              a target average illuminance across a working plane. It accounts for room characteristics, surface
              finishes, and maintenance conditions through systematic factors.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Lumen Method Formula</p>
              <p className="font-mono text-center text-lg mb-2">N = (E × A) / (Φ × UF × MF)</p>
              <div className="text-xs text-white/70 grid grid-cols-2 gap-2 mt-3">
                <div>N = number of luminaires</div>
                <div>E = maintained illuminance (lux)</div>
                <div>A = area of working plane (m²)</div>
                <div>Φ = luminaire light output (lm)</div>
                <div>UF = utilisation factor</div>
                <div>MF = maintenance factor</div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Lumen method procedure:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Determine required maintained illuminance (E) from CIBSE guides</li>
                <li className="pl-1">Measure or calculate room area (A = L × W)</li>
                <li className="pl-1">Calculate room index: RI = (L × W) / [Hm × (L + W)]</li>
                <li className="pl-1">Select luminaire and note lumen output (Φ)</li>
                <li className="pl-1">Read UF from luminaire data using RI and reflectances</li>
                <li className="pl-1">Determine appropriate MF (typically 0.7-0.8)</li>
                <li className="pl-1">Calculate N and round up to next whole number</li>
                <li className="pl-1">Arrange luminaires in regular array</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Variables Explained</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Variable</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Range</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-mono">Hm</td>
                      <td className="border border-white/10 px-3 py-2">Mounting height above working plane</td>
                      <td className="border border-white/10 px-3 py-2">2.0-3.5m (offices)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-mono">RI</td>
                      <td className="border border-white/10 px-3 py-2">Room index (room proportions)</td>
                      <td className="border border-white/10 px-3 py-2">0.75-5.0</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-mono">UF</td>
                      <td className="border border-white/10 px-3 py-2">Utilisation factor</td>
                      <td className="border border-white/10 px-3 py-2">0.3-0.7</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-mono">MF</td>
                      <td className="border border-white/10 px-3 py-2">Maintenance factor</td>
                      <td className="border border-white/10 px-3 py-2">0.6-0.9</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> The lumen method gives average illuminance - actual values will vary across the space. Software verification is recommended for final designs.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Room Index and Utilisation Factor */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Room Index and Utilisation Factor
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The room index describes the proportions of a room relative to the luminaire mounting height. Combined with
              surface reflectances, it determines how efficiently light from luminaires reaches the working plane - the
              utilisation factor (UF).
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Room Index Formula</p>
              <p className="font-mono text-center text-lg mb-2">RI = (L × W) / [Hm × (L + W)]</p>
              <div className="text-xs text-white/70 text-center mt-2">
                L = length, W = width, Hm = mounting height above working plane (typically 0.85m above floor)
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Room Index Interpretation</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>RI &lt; 1:</strong> Small/tall room, low UF</li>
                  <li className="pl-1"><strong>RI 1-2:</strong> Typical rooms</li>
                  <li className="pl-1"><strong>RI 2-3:</strong> Large/low rooms</li>
                  <li className="pl-1"><strong>RI &gt; 3:</strong> Very large/low rooms, high UF</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Standard Surface Reflectances</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Ceiling:</strong> 0.7 (70%) - white</li>
                  <li className="pl-1"><strong>Walls:</strong> 0.5 (50%) - light colours</li>
                  <li className="pl-1"><strong>Floor:</strong> 0.2 (20%) - typical floor</li>
                  <li className="pl-1">Often written as C70 W50 F20</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical UF Values (Direct Luminaire, C70 W50 F20)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Room Index</th>
                      <th className="border border-white/10 px-3 py-2 text-left">0.75</th>
                      <th className="border border-white/10 px-3 py-2 text-left">1.0</th>
                      <th className="border border-white/10 px-3 py-2 text-left">1.5</th>
                      <th className="border border-white/10 px-3 py-2 text-left">2.0</th>
                      <th className="border border-white/10 px-3 py-2 text-left">3.0</th>
                      <th className="border border-white/10 px-3 py-2 text-left">5.0</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Typical UF</td>
                      <td className="border border-white/10 px-3 py-2">0.35</td>
                      <td className="border border-white/10 px-3 py-2">0.42</td>
                      <td className="border border-white/10 px-3 py-2">0.50</td>
                      <td className="border border-white/10 px-3 py-2">0.55</td>
                      <td className="border border-white/10 px-3 py-2">0.62</td>
                      <td className="border border-white/10 px-3 py-2">0.68</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/60 mt-2">Note: Actual UF values vary by luminaire type - always use manufacturer's photometric data</p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design tip:</strong> Dark surfaces significantly reduce UF. For dark ceilings or walls, expect 10-30% lower UF than standard tables suggest.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 3: Maintained Illuminance and Maintenance Factor */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Maintained Illuminance and Maintenance Factors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Lighting systems depreciate over time - lamps lose output, luminaires and room surfaces accumulate dirt.
              The maintenance factor (MF) accounts for this, ensuring the design achieves required illuminance throughout
              the maintenance cycle.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Maintenance Factor Components</p>
              <p className="font-mono text-center text-lg mb-2">MF = LLMF × LSF × LMF × RSMF</p>
              <div className="text-xs text-white/70 grid sm:grid-cols-2 gap-2 mt-3">
                <div><strong>LLMF:</strong> Lamp Lumen Maintenance Factor</div>
                <div><strong>LSF:</strong> Lamp Survival Factor</div>
                <div><strong>LMF:</strong> Luminaire Maintenance Factor</div>
                <div><strong>RSMF:</strong> Room Surface Maintenance Factor</div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">CIBSE Maintained Illuminance Recommendations</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Em (lux)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">CIBSE Reference</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Corridors, circulation</td>
                      <td className="border border-white/10 px-3 py-2">100</td>
                      <td className="border border-white/10 px-3 py-2">LG7</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Warehouse (general)</td>
                      <td className="border border-white/10 px-3 py-2">150-200</td>
                      <td className="border border-white/10 px-3 py-2">LG1</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">General office</td>
                      <td className="border border-white/10 px-3 py-2">300-500</td>
                      <td className="border border-white/10 px-3 py-2">LG7</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Retail sales areas</td>
                      <td className="border border-white/10 px-3 py-2">300-500</td>
                      <td className="border border-white/10 px-3 py-2">LG6</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fine assembly/inspection</td>
                      <td className="border border-white/10 px-3 py-2">750-1000</td>
                      <td className="border border-white/10 px-3 py-2">LG1</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Operating theatre</td>
                      <td className="border border-white/10 px-3 py-2">1000+</td>
                      <td className="border border-white/10 px-3 py-2">LG2</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Maintenance Factors by Environment</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Environment</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical MF</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Clean (office, retail)</td>
                      <td className="border border-white/10 px-3 py-2">0.80</td>
                      <td className="border border-white/10 px-3 py-2">Regular cleaning, LED lamps</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Normal (schools, workshops)</td>
                      <td className="border border-white/10 px-3 py-2">0.70</td>
                      <td className="border border-white/10 px-3 py-2">Moderate soiling</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Dirty (industrial)</td>
                      <td className="border border-white/10 px-3 py-2">0.60</td>
                      <td className="border border-white/10 px-3 py-2">High soiling, IP65+ luminaires</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Very dirty (foundry)</td>
                      <td className="border border-white/10 px-3 py-2">0.50</td>
                      <td className="border border-white/10 px-3 py-2">Heavy contamination</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key relationship:</strong> Initial illuminance = Maintained illuminance / MF. Always design to maintained, not initial values.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Point-by-Point Method */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Point-by-Point Calculations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The point-by-point method calculates illuminance at specific locations using luminous intensity data
              and geometric relationships. It combines the inverse square law (distance effect) with the cosine law
              (angle of incidence effect).
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Point-by-Point Formula</p>
              <p className="font-mono text-center text-lg mb-2">E = (I × cos θ) / d²</p>
              <div className="text-xs text-white/70 text-center mt-2">
                E = illuminance (lux), I = intensity towards point (cd), θ = angle to normal, d = distance (m)
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Inverse Square Law</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">E = I / d² (for perpendicular incidence)</li>
                  <li className="pl-1">Doubling distance quarters illuminance</li>
                  <li className="pl-1">Applies to point sources</li>
                  <li className="pl-1">Extended sources: use closer to source</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cosine Law</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">E ∝ cos θ (angle to surface normal)</li>
                  <li className="pl-1">Maximum illuminance at perpendicular</li>
                  <li className="pl-1">E = 0 at grazing incidence (90°)</li>
                  <li className="pl-1">Accounts for surface orientation</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Alternative Forms</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-center text-sm">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-elec-yellow mb-1">E = I cos³θ / H²</p>
                  <p className="text-white/70 text-xs">Using mounting height H</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-elec-yellow mb-1">E = I H / d³</p>
                  <p className="text-white/70 text-xs">For horizontal surface below source</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">When to use point-by-point calculations:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Spotlights and accent lighting design</li>
                <li className="pl-1">Calculating illuminance at specific task locations</li>
                <li className="pl-1">Checking uniformity at critical points</li>
                <li className="pl-1">Irregular luminaire layouts</li>
                <li className="pl-1">Outdoor and floodlighting applications</li>
                <li className="pl-1">Software typically uses this method internally</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Multiple sources:</strong> Total illuminance at a point = sum of contributions from all luminaires. Add individual E values calculated for each luminaire.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Lumen Method - Office Lighting</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Calculate luminaires needed for a 15m × 10m office requiring 400 lux maintained.
                Luminaires output 4000lm each. Ceiling height 3m, working plane 0.85m. Reflectances C70 W50 F20.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Step 1: Calculate room index</p>
                <p>Hm = 3.0 - 0.85 = 2.15m</p>
                <p>RI = (15 × 10) / [2.15 × (15 + 10)]</p>
                <p>RI = 150 / 53.75 = <strong>2.79</strong></p>
                <p className="mt-2">Step 2: Find UF (from tables at RI = 2.79) ≈ <strong>0.58</strong></p>
                <p className="mt-2">Step 3: Apply formula (MF = 0.8)</p>
                <p>N = (E × A) / (Φ × UF × MF)</p>
                <p>N = (400 × 150) / (4000 × 0.58 × 0.8)</p>
                <p>N = 60000 / 1856 = <strong>32.3 → 33 luminaires</strong></p>
                <p className="mt-2 text-white/60">Arrange in 11 × 3 grid or similar regular array</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Point-by-Point Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A downlight with 1200cd intensity in the relevant direction is mounted 2.5m above a display.
                The display is 1.5m horizontally from directly below the downlight. Calculate the illuminance on the display.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Step 1: Calculate geometry</p>
                <p>H = 2.5m, horizontal distance = 1.5m</p>
                <p>d = √(2.5² + 1.5²) = √(6.25 + 2.25) = √8.5 = <strong>2.92m</strong></p>
                <p className="mt-2">Step 2: Calculate angle</p>
                <p>cos θ = H / d = 2.5 / 2.92 = <strong>0.856</strong></p>
                <p className="mt-2">Step 3: Apply formula</p>
                <p>E = (I × cos θ) / d²</p>
                <p>E = (1200 × 0.856) / 2.92²</p>
                <p>E = 1027.2 / 8.53 = <strong>120 lux</strong></p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Maintenance Factor Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Calculate the maintenance factor for an LED installation in a clean office.
                LLMF = 0.9, LSF = 1.0, LMF = 0.9, RSMF = 0.95.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>MF = LLMF × LSF × LMF × RSMF</p>
                <p>MF = 0.9 × 1.0 × 0.9 × 0.95</p>
                <p>MF = <strong>0.77 (use 0.8)</strong></p>
                <p className="mt-2 text-white/60">This means the installation will deliver 77% of initial lumens at end of maintenance cycle</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Formulas to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Lumen method:</strong> N = (E × A) / (Φ × UF × MF)</li>
                <li className="pl-1"><strong>Room index:</strong> RI = (L × W) / [Hm × (L + W)]</li>
                <li className="pl-1"><strong>Point-by-point:</strong> E = I cos θ / d²</li>
                <li className="pl-1"><strong>Inverse square:</strong> E = I / d²</li>
                <li className="pl-1"><strong>Maintenance factor:</strong> MF = LLMF × LSF × LMF × RSMF</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">CIBSE Lighting Guide References</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>LG1:</strong> Industrial Environment</li>
                <li className="pl-1"><strong>LG2:</strong> Hospitals and Healthcare</li>
                <li className="pl-1"><strong>LG5:</strong> Lecture/Conference Rooms</li>
                <li className="pl-1"><strong>LG6:</strong> Outdoor Environment</li>
                <li className="pl-1"><strong>LG7:</strong> Offices</li>
                <li className="pl-1"><strong>SLL Handbook:</strong> Comprehensive reference</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Wrong Hm:</strong> Use mounting height above working plane, not floor or ceiling</li>
                <li className="pl-1"><strong>Forgetting MF:</strong> Initial illuminance is much higher than maintained</li>
                <li className="pl-1"><strong>Wrong UF tables:</strong> Must match luminaire type and reflectances</li>
                <li className="pl-1"><strong>Mixing units:</strong> Keep everything in SI units (lux, lumens, metres)</li>
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
                <p className="font-medium text-white mb-1">Lumen Method</p>
                <ul className="space-y-0.5">
                  <li>N = (E × A) / (Φ × UF × MF)</li>
                  <li>RI = LW / Hm(L+W)</li>
                  <li>Typical UF: 0.4-0.6</li>
                  <li>Typical MF: 0.7-0.8</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">CIBSE Lux Levels</p>
                <ul className="space-y-0.5">
                  <li>Corridors: 100 lux</li>
                  <li>General office: 300-500 lux</li>
                  <li>Retail: 300-500 lux</li>
                  <li>Detailed work: 500-750 lux</li>
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
            <Link to="../h-n-c-module2-section4-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Light and Vision
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2-section4-3">
              Next: Lamp Types and Efficacy
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule2Section4_2;
