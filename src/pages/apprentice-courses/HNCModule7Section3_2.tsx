import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Lumen Method Calculations - HNC Module 7 Section 3.2";
const DESCRIPTION = "Master the lumen method for interior lighting design: room index calculations, utilisation factors, maintenance factors, and average illuminance calculations for building services projects.";

const quickCheckQuestions = [
  {
    id: "lumen-formula",
    question: "What is the correct formula for the lumen method?",
    options: ["E = n × F × UF × MF × A", "E = (n × F × UF × MF) / A", "n = E × A / (F × UF × MF)", "E = F / (n × UF × MF × A)"],
    correctIndex: 1,
    explanation: "The lumen method formula is E = (n × F × UF × MF) / A, where E is average illuminance (lux), n is number of luminaires, F is lamp flux (lumens), UF is utilisation factor, MF is maintenance factor, and A is area (m²)."
  },
  {
    id: "room-index-definition",
    question: "What does the room index (K) represent in lighting design?",
    options: ["The total floor area of the room", "A ratio describing room proportions relative to mounting height", "The number of luminaires required", "The reflectance of room surfaces"],
    correctIndex: 1,
    explanation: "The room index (K) is a dimensionless ratio that describes room proportions relative to luminaire mounting height above the working plane. It determines how effectively light is utilised in the space."
  },
  {
    id: "utilisation-factor",
    question: "Which factors determine the utilisation factor (UF)?",
    options: ["Only lamp type and wattage", "Room index and surface reflectances", "Maintenance schedule only", "Ceiling height and floor area only"],
    correctIndex: 1,
    explanation: "The utilisation factor depends on the room index (K) and the reflectances of ceiling, walls, and floor surfaces. These determine what proportion of lamp lumens reaches the working plane."
  },
  {
    id: "maintenance-factor",
    question: "A maintenance factor of 0.8 means:",
    options: ["80% of luminaires will fail", "Light output will reduce to 80% over the maintenance period", "20% more luminaires are needed", "The room reflectance is 80%"],
    correctIndex: 1,
    explanation: "A maintenance factor of 0.8 indicates that average illuminance will reduce to 80% of initial values over the maintenance period due to lamp lumen depreciation, luminaire dirt accumulation, and room surface degradation."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A room measures 12m × 8m with a mounting height (Hm) of 2.4m. What is the room index?",
    options: [
      "K = 1.5",
      "K = 2.0",
      "K = 2.5",
      "K = 3.0"
    ],
    correctAnswer: 1,
    explanation: "K = (L × W) / [Hm × (L + W)] = (12 × 8) / [2.4 × (12 + 8)] = 96 / (2.4 × 20) = 96 / 48 = 2.0"
  },
  {
    id: 2,
    question: "If a room requires 500 lux, has an area of 80m², UF = 0.52, and MF = 0.8, what total lamp flux is needed?",
    options: ["83,333 lumens", "96,154 lumens", "104,167 lumens", "120,000 lumens"],
    correctAnswer: 1,
    explanation: "Total flux = (E × A) / (UF × MF) = (500 × 80) / (0.52 × 0.8) = 40,000 / 0.416 = 96,154 lumens"
  },
  {
    id: 3,
    question: "Which surface reflectance has the greatest impact on utilisation factor?",
    options: ["Floor reflectance", "Ceiling reflectance", "Wall reflectance", "Desk surface reflectance"],
    correctAnswer: 1,
    explanation: "Ceiling reflectance has the greatest impact on UF because most luminaires direct light upward and downward. A highly reflective ceiling redirects upward light back to the working plane, significantly improving utilisation."
  },
  {
    id: 4,
    question: "The mounting height (Hm) in room index calculations is measured from:",
    options: [
      "Floor to ceiling",
      "Floor to luminaire",
      "Working plane to luminaire",
      "Floor to working plane"
    ],
    correctAnswer: 2,
    explanation: "Mounting height (Hm) is the vertical distance from the working plane (typically 0.85m above floor for offices) to the luminaire. This affects how light spreads across the room."
  },
  {
    id: 5,
    question: "A maintenance factor comprises which components?",
    options: [
      "Lamp survival factor only",
      "LLMF, LMF, and RSMF",
      "Room index and reflectances",
      "Utilisation factor and lamp flux"
    ],
    correctAnswer: 1,
    explanation: "Maintenance factor (MF) = LLMF × LMF × RSMF, where LLMF is lamp lumen maintenance factor, LMF is luminaire maintenance factor, and RSMF is room surface maintenance factor."
  },
  {
    id: 6,
    question: "For a room with K = 1.25, the utilisation factor from tables shows UF = 0.48 at K = 1.0 and UF = 0.55 at K = 1.5. Using interpolation, what is UF at K = 1.25?",
    options: ["0.50", "0.515", "0.52", "0.53"],
    correctAnswer: 1,
    explanation: "Linear interpolation: UF = 0.48 + [(1.25 - 1.0) / (1.5 - 1.0)] × (0.55 - 0.48) = 0.48 + 0.5 × 0.07 = 0.48 + 0.035 = 0.515"
  },
  {
    id: 7,
    question: "If 20 luminaires each with 3,200 lumens are installed in a 100m² room with UF = 0.6 and MF = 0.75, what is the maintained illuminance?",
    options: ["288 lux", "384 lux", "432 lux", "480 lux"],
    correctAnswer: 0,
    explanation: "E = (n × F × UF × MF) / A = (20 × 3,200 × 0.6 × 0.75) / 100 = 28,800 / 100 = 288 lux"
  },
  {
    id: 8,
    question: "Why does a narrow room (high length-to-width ratio) have a lower room index than a square room of equal area?",
    options: [
      "The ceiling is lower",
      "Light is absorbed by the longer walls",
      "The perimeter increases, reducing the L×W / Hm(L+W) ratio",
      "More luminaires are required"
    ],
    correctAnswer: 2,
    explanation: "For the same area, a narrow room has a larger perimeter (L + W), which increases the denominator in K = L×W / [Hm(L+W)], reducing the room index. A square room maximises K for a given area."
  },
  {
    id: 9,
    question: "A lighting scheme is designed for 400 lux maintained illuminance. If the maintenance factor is 0.8, what is the initial illuminance?",
    options: ["320 lux", "400 lux", "480 lux", "500 lux"],
    correctAnswer: 3,
    explanation: "Initial illuminance = Maintained illuminance / MF = 400 / 0.8 = 500 lux. The lighting starts brighter and reduces to the maintained level over the maintenance period."
  },
  {
    id: 10,
    question: "Typical ceiling reflectance values for a white ceiling, light walls, and dark floor would be:",
    options: [
      "0.9, 0.7, 0.3",
      "0.7, 0.5, 0.2",
      "0.5, 0.3, 0.1",
      "0.3, 0.2, 0.1"
    ],
    correctAnswer: 1,
    explanation: "Typical reflectance values: white ceiling 0.7-0.8, light coloured walls 0.5-0.7, and dark floor 0.1-0.3. These values are used to select the appropriate UF from manufacturer tables."
  },
  {
    id: 11,
    question: "When would you NOT use the lumen method for lighting design?",
    options: [
      "Large open-plan offices",
      "Sports halls",
      "Task lighting for specific workstations",
      "Retail sales floors"
    ],
    correctAnswer: 2,
    explanation: "The lumen method calculates average illuminance across a whole room. For task lighting at specific locations, point-by-point calculations are more appropriate as they account for the distance and angle from luminaire to task."
  },
  {
    id: 12,
    question: "A design requires 24 luminaires but the preferred arrangement is 5 rows of 5. What should be done?",
    options: [
      "Use 24 luminaires in irregular rows",
      "Install 25 luminaires and accept higher illuminance",
      "Use higher output luminaires to achieve required lux with fewer fittings",
      "Either B or C - recalculate to confirm compliance"
    ],
    correctAnswer: 3,
    explanation: "Both options are valid. Installing 25 luminaires gives slightly higher illuminance (acceptable if within limits). Alternatively, specifying higher output luminaires allows the preferred 25-fitting arrangement while meeting the design illuminance."
  }
];

const faqs = [
  {
    question: "What is the difference between maintained and initial illuminance?",
    answer: "Initial illuminance is the light level when luminaires are new and clean. Maintained illuminance is the minimum average level at the end of the maintenance period, after lamp depreciation and dirt accumulation. The ratio is the maintenance factor (MF). Design standards specify maintained illuminance to ensure adequate light throughout the maintenance cycle."
  },
  {
    question: "How do I find utilisation factor values?",
    answer: "Utilisation factors are provided in luminaire photometric data from manufacturers. They are presented in tables showing UF against room index (K) for various combinations of ceiling, wall, and floor reflectances (typically expressed as C/W/F, e.g., 0.7/0.5/0.2). Interpolate between values when the exact room index is not listed."
  },
  {
    question: "When should I use the lumen method versus point-by-point calculations?",
    answer: "Use the lumen method for general lighting of regular-shaped rooms where uniform illuminance is required (offices, classrooms, industrial spaces). Use point-by-point calculations for task lighting, display lighting, exterior areas, and irregular spaces where illuminance varies significantly across the working plane."
  },
  {
    question: "What maintenance factor should I use if not specified?",
    answer: "If specific MF values are not provided, typical values range from 0.7 (dirty industrial environments with infrequent cleaning) to 0.9 (clean environments with LED luminaires and regular maintenance). For office environments with LED lighting and annual cleaning, MF = 0.8 is commonly used. Always document assumptions."
  },
  {
    question: "How do I handle rooms with unusual shapes?",
    answer: "For L-shaped, T-shaped, or irregular rooms, divide into regular rectangular sections and calculate each separately. For rooms with significant obstructions (columns, partitions), treat each clear zone individually. The lumen method assumes uniform luminaire distribution, so irregular spaces may require point-by-point analysis."
  },
  {
    question: "Why does working plane height affect calculations?",
    answer: "The working plane height (typically 0.85m for desks, 0m for floor-level tasks) determines the mounting height Hm in the room index calculation. A higher working plane means a lower Hm, which increases the room index and improves utilisation factor. Always confirm the appropriate working plane for the application."
  }
];

const HNCModule7Section3_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section3">
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
            <Zap className="h-4 w-4" />
            <span>Module 7.3.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Lumen Method Calculations
          </h1>
          <p className="text-white/80">
            Room index, utilisation factors, maintenance factors, and average illuminance calculations for interior lighting design
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Lumen method:</strong> E = (n × F × UF × MF) / A</li>
              <li className="pl-1"><strong>Room index:</strong> K = L×W / [Hm(L+W)]</li>
              <li className="pl-1"><strong>UF:</strong> Depends on K and reflectances</li>
              <li className="pl-1"><strong>MF:</strong> Accounts for depreciation over time</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Practical Application</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Typical offices:</strong> 500 lux maintained</li>
              <li className="pl-1"><strong>Working plane:</strong> 0.85m above floor</li>
              <li className="pl-1"><strong>MF range:</strong> 0.7-0.9 typically</li>
              <li className="pl-1"><strong>UF range:</strong> 0.3-0.7 typically</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply the lumen method formula to calculate average illuminance",
              "Calculate room index for various room dimensions",
              "Select utilisation factors from manufacturer data",
              "Determine appropriate maintenance factors for different environments",
              "Calculate the number of luminaires required for a given illuminance",
              "Complete full lighting design calculations with worked examples"
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

        {/* Section 1: The Lumen Method Formula */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The Lumen Method Formula
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The lumen method is the standard technique for calculating average illuminance in interior spaces.
              It determines how many luminaires are needed to achieve a specified maintained illuminance level
              across the working plane of a room.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-3">Lumen Method Formula</p>
              <div className="font-mono text-lg text-center text-white mb-3">
                E = (n × F × UF × MF) / A
              </div>
              <div className="grid sm:grid-cols-2 gap-2 text-sm">
                <div><strong>E</strong> = Average illuminance (lux)</div>
                <div><strong>n</strong> = Number of luminaires</div>
                <div><strong>F</strong> = Luminous flux per luminaire (lumens)</div>
                <div><strong>UF</strong> = Utilisation factor (0-1)</div>
                <div><strong>MF</strong> = Maintenance factor (0-1)</div>
                <div><strong>A</strong> = Room area (m²)</div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Rearranged Forms of the Formula</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">To Find</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Formula</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Illuminance (E)</td>
                      <td className="border border-white/10 px-3 py-2 font-mono">E = (n × F × UF × MF) / A</td>
                      <td className="border border-white/10 px-3 py-2">Verify existing installation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Number of luminaires (n)</td>
                      <td className="border border-white/10 px-3 py-2 font-mono">n = (E × A) / (F × UF × MF)</td>
                      <td className="border border-white/10 px-3 py-2">New lighting design</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Total flux required</td>
                      <td className="border border-white/10 px-3 py-2 font-mono">Φ = (E × A) / (UF × MF)</td>
                      <td className="border border-white/10 px-3 py-2">Luminaire selection</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key assumptions of the lumen method:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Uniform distribution:</strong> Luminaires are evenly spaced across the ceiling</li>
                <li className="pl-1"><strong>Regular room shape:</strong> Rectangular rooms work best; irregular shapes need subdivision</li>
                <li className="pl-1"><strong>Average illuminance:</strong> Calculates mean value, not minimum or maximum</li>
                <li className="pl-1"><strong>Horizontal working plane:</strong> Results apply to a flat surface at specified height</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design principle:</strong> The lumen method gives average illuminance. For uniformity requirements, spacing-to-height ratios must also be checked.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Room Index Calculation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Room Index Calculation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The room index (K) is a dimensionless number that describes room proportions relative to the
              luminaire mounting height. It determines how effectively light from luminaires reaches the
              working plane.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-3">Room Index Formula</p>
              <div className="font-mono text-lg text-center text-white mb-3">
                K = (L × W) / [Hm × (L + W)]
              </div>
              <div className="grid sm:grid-cols-2 gap-2 text-sm">
                <div><strong>K</strong> = Room index (dimensionless)</div>
                <div><strong>L</strong> = Room length (m)</div>
                <div><strong>W</strong> = Room width (m)</div>
                <div><strong>Hm</strong> = Mounting height above working plane (m)</div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Mounting Height (Hm)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Ceiling height minus working plane height</li>
                  <li className="pl-1">Office working plane: typically 0.85m</li>
                  <li className="pl-1">Standing work: typically 0.95m</li>
                  <li className="pl-1">Floor-level tasks: 0m working plane</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical K Values</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Small rooms: K = 0.6-1.0</li>
                  <li className="pl-1">Medium rooms: K = 1.0-2.5</li>
                  <li className="pl-1">Large rooms: K = 2.5-5.0</li>
                  <li className="pl-1">Very large halls: K &gt; 5.0</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Room Index Example Calculations</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Room</th>
                      <th className="border border-white/10 px-3 py-2 text-left">L × W (m)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Hm (m)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Calculation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">K</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Small office</td>
                      <td className="border border-white/10 px-3 py-2">6 × 4</td>
                      <td className="border border-white/10 px-3 py-2">2.0</td>
                      <td className="border border-white/10 px-3 py-2 font-mono">24 / (2.0 × 10)</td>
                      <td className="border border-white/10 px-3 py-2">1.2</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Open plan</td>
                      <td className="border border-white/10 px-3 py-2">20 × 15</td>
                      <td className="border border-white/10 px-3 py-2">2.4</td>
                      <td className="border border-white/10 px-3 py-2 font-mono">300 / (2.4 × 35)</td>
                      <td className="border border-white/10 px-3 py-2">3.57</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Classroom</td>
                      <td className="border border-white/10 px-3 py-2">10 × 8</td>
                      <td className="border border-white/10 px-3 py-2">2.15</td>
                      <td className="border border-white/10 px-3 py-2 font-mono">80 / (2.15 × 18)</td>
                      <td className="border border-white/10 px-3 py-2">2.07</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Warehouse</td>
                      <td className="border border-white/10 px-3 py-2">40 × 25</td>
                      <td className="border border-white/10 px-3 py-2">6.0</td>
                      <td className="border border-white/10 px-3 py-2 font-mono">1000 / (6.0 × 65)</td>
                      <td className="border border-white/10 px-3 py-2">2.56</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key insight:</strong> Higher K values mean better light utilisation. Square rooms have higher K than narrow rooms of equal area.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Utilisation Factors */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Utilisation Factors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The utilisation factor (UF) represents the proportion of luminaire output that reaches
              the working plane. It depends on the room index, luminaire light distribution, and the
              reflectances of room surfaces.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Factors Affecting Utilisation Factor</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Room index (K):</strong> Higher K = higher UF (larger rooms utilise light better)</li>
                <li className="pl-1"><strong>Ceiling reflectance:</strong> Most significant; typical values 0.7-0.8 for white</li>
                <li className="pl-1"><strong>Wall reflectance:</strong> Second most important; typical values 0.3-0.7</li>
                <li className="pl-1"><strong>Floor reflectance:</strong> Least impact; typical values 0.1-0.3</li>
                <li className="pl-1"><strong>Luminaire type:</strong> Light distribution pattern (direct, indirect, general)</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Example UF Table (Typical Recessed LED Panel)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/10">
                      <th className="border border-white/10 px-2 py-2 text-left" rowSpan={2}>Room Index (K)</th>
                      <th className="border border-white/10 px-2 py-2 text-center" colSpan={3}>Reflectances (Ceiling/Walls/Floor)</th>
                    </tr>
                    <tr className="bg-white/10">
                      <th className="border border-white/10 px-2 py-2 text-center">0.7/0.5/0.2</th>
                      <th className="border border-white/10 px-2 py-2 text-center">0.7/0.3/0.2</th>
                      <th className="border border-white/10 px-2 py-2 text-center">0.5/0.3/0.1</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">0.75</td>
                      <td className="border border-white/10 px-2 py-2 text-center">0.41</td>
                      <td className="border border-white/10 px-2 py-2 text-center">0.37</td>
                      <td className="border border-white/10 px-2 py-2 text-center">0.33</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">1.00</td>
                      <td className="border border-white/10 px-2 py-2 text-center">0.48</td>
                      <td className="border border-white/10 px-2 py-2 text-center">0.44</td>
                      <td className="border border-white/10 px-2 py-2 text-center">0.39</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">1.25</td>
                      <td className="border border-white/10 px-2 py-2 text-center">0.53</td>
                      <td className="border border-white/10 px-2 py-2 text-center">0.49</td>
                      <td className="border border-white/10 px-2 py-2 text-center">0.44</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">1.50</td>
                      <td className="border border-white/10 px-2 py-2 text-center">0.57</td>
                      <td className="border border-white/10 px-2 py-2 text-center">0.53</td>
                      <td className="border border-white/10 px-2 py-2 text-center">0.47</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">2.00</td>
                      <td className="border border-white/10 px-2 py-2 text-center">0.63</td>
                      <td className="border border-white/10 px-2 py-2 text-center">0.58</td>
                      <td className="border border-white/10 px-2 py-2 text-center">0.52</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">2.50</td>
                      <td className="border border-white/10 px-2 py-2 text-center">0.67</td>
                      <td className="border border-white/10 px-2 py-2 text-center">0.62</td>
                      <td className="border border-white/10 px-2 py-2 text-center">0.56</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">3.00</td>
                      <td className="border border-white/10 px-2 py-2 text-center">0.70</td>
                      <td className="border border-white/10 px-2 py-2 text-center">0.65</td>
                      <td className="border border-white/10 px-2 py-2 text-center">0.58</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/60 mt-2">Values are illustrative. Always use manufacturer's actual photometric data.</p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Linear Interpolation for UF</p>
              <p className="text-sm text-white mb-2">When K falls between tabulated values, interpolate linearly:</p>
              <div className="font-mono text-sm text-white">
                UF = UF₁ + [(K - K₁) / (K₂ - K₁)] × (UF₂ - UF₁)
              </div>
              <p className="text-sm text-white/80 mt-2">
                Example: For K = 1.75 between K = 1.5 (UF = 0.57) and K = 2.0 (UF = 0.63):<br/>
                UF = 0.57 + [(1.75 - 1.5) / (2.0 - 1.5)] × (0.63 - 0.57) = 0.57 + 0.5 × 0.06 = 0.60
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical tip:</strong> Dark walls and ceilings significantly reduce UF. In industrial spaces with dark surfaces, UF may be 30-40% lower than in offices with light finishes.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Maintenance Factors */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Maintenance Factors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The maintenance factor (MF) accounts for the reduction in light output over time due to
              lamp depreciation, luminaire soiling, and room surface degradation. It ensures the maintained
              illuminance meets requirements at the end of the maintenance cycle.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Maintenance Factor Components</p>
              <div className="font-mono text-lg text-center text-white mb-3">
                MF = LLMF × LMF × RSMF
              </div>
              <div className="text-sm space-y-1">
                <p><strong>LLMF</strong> = Lamp Lumen Maintenance Factor (lamp output depreciation)</p>
                <p><strong>LMF</strong> = Luminaire Maintenance Factor (dirt on luminaire surfaces)</p>
                <p><strong>RSMF</strong> = Room Surface Maintenance Factor (dirt on room surfaces)</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Component Values</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Component</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Clean Environment</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Normal</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Dirty/Industrial</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LLMF (LED at 50,000h)</td>
                      <td className="border border-white/10 px-3 py-2">0.90</td>
                      <td className="border border-white/10 px-3 py-2">0.90</td>
                      <td className="border border-white/10 px-3 py-2">0.90</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LMF (3-year cycle)</td>
                      <td className="border border-white/10 px-3 py-2">0.95</td>
                      <td className="border border-white/10 px-3 py-2">0.90</td>
                      <td className="border border-white/10 px-3 py-2">0.80</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">RSMF (3-year cycle)</td>
                      <td className="border border-white/10 px-3 py-2">0.98</td>
                      <td className="border border-white/10 px-3 py-2">0.95</td>
                      <td className="border border-white/10 px-3 py-2">0.90</td>
                    </tr>
                    <tr className="bg-white/5">
                      <td className="border border-white/10 px-3 py-2 font-medium">Combined MF</td>
                      <td className="border border-white/10 px-3 py-2 font-medium">0.84</td>
                      <td className="border border-white/10 px-3 py-2 font-medium">0.77</td>
                      <td className="border border-white/10 px-3 py-2 font-medium">0.65</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Environment Categories</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Very clean:</strong> Clean rooms, hospitals (MF ≈ 0.9)</li>
                  <li className="pl-1"><strong>Clean:</strong> Offices, schools (MF ≈ 0.8)</li>
                  <li className="pl-1"><strong>Normal:</strong> Retail, light industry (MF ≈ 0.75)</li>
                  <li className="pl-1"><strong>Dirty:</strong> Heavy industry, workshops (MF ≈ 0.65)</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Maintenance Cycle Impact</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Annual cleaning:</strong> Higher LMF values</li>
                  <li className="pl-1"><strong>3-year cycle:</strong> Standard commercial</li>
                  <li className="pl-1"><strong>5-year cycle:</strong> Lower MF required</li>
                  <li className="pl-1"><strong>IP65+ luminaires:</strong> Better LMF in dirty areas</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Initial vs Maintained Illuminance</p>
              <p className="text-sm text-white">
                <strong>Initial illuminance</strong> = E / MF (what you get when luminaires are new)<br/>
                <strong>Maintained illuminance</strong> = E (what you get at end of maintenance period)<br/><br/>
                Example: If design requires 500 lux maintained and MF = 0.8:<br/>
                Initial illuminance = 500 / 0.8 = 625 lux
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design consideration:</strong> Higher MF allows fewer luminaires but requires more frequent maintenance. Balance capital cost against maintenance costs.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Office Lighting Design</h3>
              <p className="text-sm text-white mb-2">
                <strong>Brief:</strong> Design general lighting for an office 15m × 12m with 3m ceiling height and 0.85m working plane. Required illuminance: 500 lux maintained. Using LED panels rated at 4,000 lumens each.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Step 1: Calculate mounting height</p>
                <p>Hm = 3.0 - 0.85 = 2.15m</p>
                <p className="mt-2 text-white/60">Step 2: Calculate room index</p>
                <p>K = (L × W) / [Hm × (L + W)]</p>
                <p>K = (15 × 12) / [2.15 × (15 + 12)]</p>
                <p>K = 180 / (2.15 × 27) = 180 / 58.05</p>
                <p className="text-green-400">K = 3.10</p>
                <p className="mt-2 text-white/60">Step 3: Determine UF (from table, C/W/F = 0.7/0.5/0.2)</p>
                <p>For K = 3.0, UF = 0.70 (interpolate if needed)</p>
                <p className="text-green-400">UF = 0.70</p>
                <p className="mt-2 text-white/60">Step 4: Determine MF (clean office, 3-year maintenance)</p>
                <p className="text-green-400">MF = 0.80</p>
                <p className="mt-2 text-white/60">Step 5: Calculate number of luminaires</p>
                <p>n = (E × A) / (F × UF × MF)</p>
                <p>n = (500 × 180) / (4,000 × 0.70 × 0.80)</p>
                <p>n = 90,000 / 2,240</p>
                <p className="text-green-400">n = 40.2 → Use 40 luminaires</p>
                <p className="mt-2 text-white/60">Step 6: Verify illuminance with 40 luminaires</p>
                <p>E = (40 × 4,000 × 0.70 × 0.80) / 180</p>
                <p className="text-green-400">E = 497 lux ✓ (acceptable, within 10% of target)</p>
                <p className="mt-2 text-white/60">Step 7: Arrange luminaires (5 rows × 8 columns)</p>
                <p>Spacing: 15m / 8 = 1.875m (along length)</p>
                <p>Spacing: 12m / 5 = 2.4m (along width)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Classroom Verification</h3>
              <p className="text-sm text-white mb-2">
                <strong>Brief:</strong> A classroom 10m × 8m has 18 luminaires installed, each rated at 3,600 lumens. Ceiling height 3m, working plane 0.85m. Surface reflectances: ceiling 0.7, walls 0.5, floor 0.2. Verify maintained illuminance with MF = 0.75.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Step 1: Calculate mounting height and room index</p>
                <p>Hm = 3.0 - 0.85 = 2.15m</p>
                <p>K = (10 × 8) / [2.15 × (10 + 8)]</p>
                <p>K = 80 / 38.7 = 2.07</p>
                <p className="text-green-400">K ≈ 2.0</p>
                <p className="mt-2 text-white/60">Step 2: Determine UF from table</p>
                <p>For K = 2.0 and reflectances 0.7/0.5/0.2:</p>
                <p className="text-green-400">UF = 0.63</p>
                <p className="mt-2 text-white/60">Step 3: Calculate maintained illuminance</p>
                <p>A = 10 × 8 = 80 m²</p>
                <p>E = (n × F × UF × MF) / A</p>
                <p>E = (18 × 3,600 × 0.63 × 0.75) / 80</p>
                <p>E = 30,618 / 80</p>
                <p className="text-green-400">E = 383 lux</p>
                <p className="mt-2 text-white/60">Step 4: Compare with standard requirement</p>
                <p>Classroom requirement (BS EN 12464-1): 300 lux minimum</p>
                <p className="text-green-400">383 lux &gt; 300 lux ✓ Installation complies</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Industrial Workshop</h3>
              <p className="text-sm text-white mb-2">
                <strong>Brief:</strong> Calculate luminaires for a workshop 30m × 20m with 6m ceiling height (floor-level working plane). Required: 300 lux. High-bay LED luminaires rated at 20,000 lumens. Environment: normal industrial.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Step 1: Calculate room index</p>
                <p>Hm = 6.0m (working plane at floor)</p>
                <p>K = (30 × 20) / [6.0 × (30 + 20)]</p>
                <p>K = 600 / 300 = 2.0</p>
                <p className="text-green-400">K = 2.0</p>
                <p className="mt-2 text-white/60">Step 2: Determine UF (darker industrial surfaces)</p>
                <p>Reflectances approximately 0.5/0.3/0.1</p>
                <p className="text-green-400">UF = 0.52</p>
                <p className="mt-2 text-white/60">Step 3: Determine MF (industrial environment)</p>
                <p>Normal industrial, IP65 luminaires</p>
                <p className="text-green-400">MF = 0.70</p>
                <p className="mt-2 text-white/60">Step 4: Calculate number of luminaires</p>
                <p>A = 30 × 20 = 600 m²</p>
                <p>n = (E × A) / (F × UF × MF)</p>
                <p>n = (300 × 600) / (20,000 × 0.52 × 0.70)</p>
                <p>n = 180,000 / 7,280</p>
                <p className="text-green-400">n = 24.7 → Use 25 luminaires</p>
                <p className="mt-2 text-white/60">Step 5: Arrangement (5 × 5 grid)</p>
                <p>Spacing: 30m / 5 = 6m along length</p>
                <p>Spacing: 20m / 5 = 4m along width</p>
                <p className="mt-2 text-white/60">Step 6: Verify with 25 luminaires</p>
                <p>E = (25 × 20,000 × 0.52 × 0.70) / 600</p>
                <p className="text-green-400">E = 303 lux ✓</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Design Process Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Confirm illuminance requirement from BS EN 12464-1 or client specification</li>
                <li className="pl-1">Measure or obtain room dimensions (L, W) and ceiling height</li>
                <li className="pl-1">Determine working plane height for the application</li>
                <li className="pl-1">Calculate room index K = L×W / [Hm(L+W)]</li>
                <li className="pl-1">Assess surface reflectances (ceiling, walls, floor)</li>
                <li className="pl-1">Select luminaire type and obtain UF data from manufacturer</li>
                <li className="pl-1">Determine maintenance factor based on environment and cleaning regime</li>
                <li className="pl-1">Calculate number of luminaires required</li>
                <li className="pl-1">Verify illuminance achieved with practical arrangement</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Office working plane: <strong>0.85m</strong></li>
                <li className="pl-1">Office illuminance: <strong>500 lux</strong> (writing, typing, reading)</li>
                <li className="pl-1">Classroom illuminance: <strong>300-500 lux</strong></li>
                <li className="pl-1">Typical MF range: <strong>0.7-0.9</strong></li>
                <li className="pl-1">Typical UF range: <strong>0.4-0.7</strong></li>
                <li className="pl-1">White ceiling reflectance: <strong>0.7-0.8</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Wrong mounting height:</strong> Using ceiling height instead of Hm (ceiling to working plane)</li>
                <li className="pl-1"><strong>Ignoring reflectances:</strong> Using standard UF without considering actual surface colours</li>
                <li className="pl-1"><strong>Overestimating MF:</strong> Using 0.9 for normal environments (0.8 is more realistic)</li>
                <li className="pl-1"><strong>Forgetting to verify:</strong> Not recalculating illuminance with the actual number of luminaires installed</li>
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
                <p className="font-medium text-white mb-1">Key Formulae</p>
                <ul className="space-y-0.5 font-mono">
                  <li>E = (n × F × UF × MF) / A</li>
                  <li>n = (E × A) / (F × UF × MF)</li>
                  <li>K = (L × W) / [Hm × (L + W)]</li>
                  <li>MF = LLMF × LMF × RSMF</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Typical Values</p>
                <ul className="space-y-0.5">
                  <li>Office illuminance: 500 lux</li>
                  <li>Working plane: 0.85m</li>
                  <li>Office MF: 0.8</li>
                  <li>Typical UF: 0.5-0.65</li>
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
            <Link to="../h-n-c-module7-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section3-3">
              Next: Lighting Design Software
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule7Section3_2;
