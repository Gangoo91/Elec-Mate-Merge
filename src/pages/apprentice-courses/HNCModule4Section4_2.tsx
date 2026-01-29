import { ArrowLeft, Calculator, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Interior Lighting Calculations - HNC Module 4 Section 4.2";
const DESCRIPTION = "Master interior lighting calculations for building services: the lumen method formula (N = E×A / Φ×UF×MF), room index, utilisation factors, and DIALux/Relux software applications.";

const quickCheckQuestions = [
  {
    id: "lumen-method",
    question: "In the lumen method formula N = E×A / (Φ×UF×MF), what does N represent?",
    options: ["Lumens required", "Number of luminaires", "Neutral factor", "Nominal wattage"],
    correctIndex: 1,
    explanation: "N represents the number of luminaires required to achieve the target illuminance. The formula calculates how many luminaires are needed based on the room area, target illuminance, lamp lumens, utilisation factor and maintenance factor."
  },
  {
    id: "room-index",
    question: "What is the room index formula?",
    options: ["K = L × W / (H × (L + W))", "K = (L + W) / (H × L × W)", "K = H × (L + W) / (L × W)", "K = L × W × H"],
    correctIndex: 0,
    explanation: "The room index K = (L × W) / (Hm × (L + W)) where L = room length, W = room width, and Hm = mounting height above working plane. This ratio characterises room proportions for lighting calculations."
  },
  {
    id: "utilisation-factor",
    question: "What two room properties most affect the utilisation factor?",
    options: ["Length and width", "Room index and surface reflectances", "Ceiling height and floor type", "Door positions and window area"],
    correctIndex: 1,
    explanation: "Utilisation factor depends primarily on room index (proportions) and surface reflectances (ceiling, walls, floor). These determine how much of the emitted light reaches the working plane versus being absorbed."
  },
  {
    id: "maintenance-factor",
    question: "A typical office installation has MF = 0.8. If initial illuminance is 625 lux, what is the maintained illuminance?",
    options: ["781 lux", "625 lux", "500 lux", "400 lux"],
    correctIndex: 2,
    explanation: "Maintained illuminance = Initial illuminance × MF = 625 × 0.8 = 500 lux. The maintenance factor accounts for lamp depreciation and luminaire dirt accumulation over the maintenance period."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the standard mounting height above the working plane (Hm) used in office lighting calculations?",
    options: ["1.5m", "2.0m", "2.15m (2.8m ceiling - 0.65m desk)", "3.0m"],
    correctAnswer: 2,
    explanation: "For offices with 2.8m ceiling and 0.85m working plane, Hm = 2.8 - 0.85 = 1.95m (often rounded to 2.0m). However, the actual value depends on ceiling height and working plane height for the specific application."
  },
  {
    id: 2,
    question: "An office is 12m × 8m with 2m mounting height. What is the room index?",
    options: ["0.8", "1.2", "2.0", "2.4"],
    correctAnswer: 3,
    explanation: "Room index K = (L × W) / (Hm × (L + W)) = (12 × 8) / (2 × (12 + 8)) = 96 / 40 = 2.4"
  },
  {
    id: 3,
    question: "What happens to the utilisation factor as room index increases?",
    options: [
      "It decreases significantly",
      "It increases, then levels off",
      "It remains constant",
      "It decreases then increases"
    ],
    correctAnswer: 1,
    explanation: "As room index increases, UF increases but levels off at higher values. Large rooms (high K) are more efficient because less light is lost to walls. UF tables typically range from K = 0.75 to K = 5.0."
  },
  {
    id: 4,
    question: "Which component is NOT part of the maintenance factor (MF) calculation?",
    options: [
      "Lamp lumen depreciation (LLD)",
      "Luminaire dirt depreciation (LDD)",
      "Room surface depreciation (RSD)",
      "Utilisation factor (UF)"
    ],
    correctAnswer: 3,
    explanation: "MF = LLD × LDD × RSDD. Utilisation factor (UF) is a separate factor in the lumen method formula. It relates to room geometry and reflectances, not maintenance over time."
  },
  {
    id: 5,
    question: "For a clean office environment with LED luminaires and 3-year maintenance cycle, what typical MF might be used?",
    options: ["0.6", "0.7", "0.8", "0.9"],
    correctAnswer: 2,
    explanation: "MF = 0.8 is typical for clean offices with LED sources. LEDs have good lumen maintenance (LLD ≈ 0.9), and clean environments have modest dirt accumulation (LDD ≈ 0.9). MF = 0.9 × 0.9 ≈ 0.8."
  },
  {
    id: 6,
    question: "What are standard room surface reflectances assumed in lighting calculations?",
    options: [
      "Ceiling 0.5, Walls 0.3, Floor 0.1",
      "Ceiling 0.7, Walls 0.5, Floor 0.2",
      "Ceiling 0.9, Walls 0.7, Floor 0.4",
      "Ceiling 0.8, Walls 0.6, Floor 0.3"
    ],
    correctAnswer: 1,
    explanation: "Standard reflectances are: Ceiling 0.7 (70%), Walls 0.5 (50%), Floor 0.2 (20%). These represent typical light-coloured finishes and are used unless actual surface finishes are significantly different."
  },
  {
    id: 7,
    question: "In DIALux software, what does 'point-by-point' calculation provide that the lumen method does not?",
    options: [
      "Total lumen output",
      "Energy consumption",
      "Illuminance at specific grid points showing uniformity",
      "Cable sizes"
    ],
    correctAnswer: 2,
    explanation: "Point-by-point calculation provides illuminance values at a grid of points across the room, enabling accurate uniformity assessment and identification of dark spots. The lumen method only provides average illuminance."
  },
  {
    id: 8,
    question: "What does the Flux Code on a luminaire's intensity distribution indicate?",
    options: [
      "The total lumen output",
      "The proportion of light emitted in different directions",
      "The power consumption",
      "The colour temperature"
    ],
    correctAnswer: 1,
    explanation: "The Flux Code indicates the proportion of light emitted in zones: downward (0-40°), (40-60°), (60-90°) and upward. For example, 42/77/97/100/57 indicates percentages reaching each zone boundary."
  },
  {
    id: 9,
    question: "A room requires 20 luminaires spaced on a 3m × 2m grid. What room dimensions would this suit?",
    options: [
      "9m × 8m (4 × 5 grid)",
      "12m × 8m (4 × 5 grid)",
      "15m × 8m (5 × 4 grid)",
      "Both B and C are possible arrangements"
    ],
    correctAnswer: 3,
    explanation: "20 luminaires could be arranged as 4 × 5 (12m × 10m at 3m × 2m spacing) or 5 × 4 (15m × 8m). The actual room dimensions and required spacing determine the best arrangement."
  },
  {
    id: 10,
    question: "What is the typical spacing-to-height ratio (SHR) for recessed LED panels in an office?",
    options: ["0.5:1", "1.0:1", "1.2-1.5:1", "2.0:1"],
    correctAnswer: 2,
    explanation: "SHR of 1.2-1.5:1 is typical for recessed LED panels. This provides good uniformity without excessive luminaire quantities. The specific ratio depends on the luminaire's light distribution."
  }
];

const faqs = [
  {
    question: "Why is the lumen method still used when software can do point-by-point calculations?",
    answer: "The lumen method provides a quick check of approximate luminaire quantities before detailed design. It's useful for early feasibility studies, budget estimates and verifying software results. Software gives detailed results but takes longer to set up. Both methods are part of professional practice."
  },
  {
    question: "How do I obtain utilisation factor tables for a specific luminaire?",
    answer: "Manufacturers provide UF tables in their technical data sheets and IES/LDT photometric files. These tables show UF values for different room indices (K values) and room reflectance combinations. Modern software like DIALux imports photometric files and calculates UF automatically."
  },
  {
    question: "What is the difference between DIALux and Relux software?",
    answer: "Both are professional lighting design software with similar capabilities. DIALux (from DIAL GmbH) and Relux (from Relux AG) can both perform point-by-point calculations, render 3D visualisations and produce compliance reports. Choice often depends on manufacturer plug-in availability and regional preference. Both are free to use."
  },
  {
    question: "How do I determine the correct maintenance factor to use?",
    answer: "MF depends on: lamp type (LED has better LLD than fluorescent), luminaire IP rating and optic type (affecting dirt ingress), environmental cleanliness (clean office vs dusty factory), and maintenance interval. CIBSE SLL and CIE provide guidance tables. Typical values range from MF 0.57 (dirty industrial) to MF 0.9 (clean with sealed luminaires)."
  },
  {
    question: "Can I use the lumen method for rooms with irregular shapes?",
    answer: "The lumen method assumes rectangular rooms. For L-shaped, circular or irregular spaces, either divide into rectangular zones and calculate separately, or use lighting design software which can handle any room shape. Point-by-point software calculation is essential for complex geometries."
  },
  {
    question: "What is direct/indirect ratio and when is it important?",
    answer: "Direct/indirect describes the proportion of light directed downward versus upward (reflected from ceiling). Typical office panels are 100% direct. Suspended luminaires might be 60/40 direct/indirect, improving ceiling brightness and reducing contrast. The choice affects room appearance, glare and utilisation factor."
  }
];

const HNCModule4Section4_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section4">
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
            <Calculator className="h-4 w-4" />
            <span>Module 4.4.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Interior Lighting Calculations
          </h1>
          <p className="text-white/80">
            Mastering the lumen method and modern software tools for accurate lighting design calculations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Lumen method:</strong> N = E×A / (Φ×UF×MF)</li>
              <li className="pl-1"><strong>Room index:</strong> K = LW / Hm(L+W)</li>
              <li className="pl-1"><strong>UF:</strong> From tables based on K and reflectances</li>
              <li className="pl-1"><strong>MF:</strong> Typically 0.7-0.8 for clean offices</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Software Tools</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>DIALux:</strong> Industry standard, free, 3D capable</li>
              <li className="pl-1"><strong>Relux:</strong> Alternative with similar capabilities</li>
              <li className="pl-1"><strong>IES/LDT files:</strong> Photometric data format</li>
              <li className="pl-1"><strong>Point-by-point:</strong> Grid illuminance calculation</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply the lumen method formula to calculate luminaire quantities",
              "Calculate room index for different space configurations",
              "Use utilisation factor tables with correct reflectance values",
              "Determine appropriate maintenance factors for installations",
              "Understand DIALux/Relux software calculation methods",
              "Verify designs meet illuminance and uniformity requirements"
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
            The Lumen Method Formula
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The lumen method is a simplified calculation to determine the number of luminaires required
              to achieve a target average illuminance in a rectangular room. It provides quick estimates
              for feasibility studies and verification of detailed designs.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Lumen Method Formula</p>
              <p className="font-mono text-center text-xl mb-4">N = (E × A) / (Φ × UF × MF)</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <ul className="space-y-1">
                    <li><strong>N</strong> = Number of luminaires required</li>
                    <li><strong>E</strong> = Target maintained illuminance (lux)</li>
                    <li><strong>A</strong> = Room area (m²)</li>
                  </ul>
                </div>
                <div>
                  <ul className="space-y-1">
                    <li><strong>Φ</strong> = Lamp lumens per luminaire (lm)</li>
                    <li><strong>UF</strong> = Utilisation factor (0-1)</li>
                    <li><strong>MF</strong> = Maintenance factor (0-1)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Step-by-step calculation process:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Step 1:</strong> Determine target illuminance (E) from CIBSE SLL</li>
                <li className="pl-1"><strong>Step 2:</strong> Calculate room area (A = L × W)</li>
                <li className="pl-1"><strong>Step 3:</strong> Select luminaire and note lumen output (Φ)</li>
                <li className="pl-1"><strong>Step 4:</strong> Calculate room index (K) - see Section 2</li>
                <li className="pl-1"><strong>Step 5:</strong> Read UF from manufacturer's table</li>
                <li className="pl-1"><strong>Step 6:</strong> Determine MF for environment and maintenance</li>
                <li className="pl-1"><strong>Step 7:</strong> Calculate N and round up to whole number</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> The lumen method gives average illuminance only. Use software to verify uniformity and UGR compliance.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Room Index */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Room Index and Mounting Height
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The room index (K) characterises the room's proportions relative to the mounting height.
              It determines how efficiently light reaches the working plane versus being absorbed by walls.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Room Index Formula</p>
              <p className="font-mono text-center text-xl mb-4">K = (L × W) / (H<sub>m</sub> × (L + W))</p>
              <div className="text-sm text-center">
                <p><strong>L</strong> = Room length (m)</p>
                <p><strong>W</strong> = Room width (m)</p>
                <p><strong>H<sub>m</sub></strong> = Mounting height above working plane (m)</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Mounting Height Calculation</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">H<sub>m</sub> = Ceiling height - Working plane height</li>
                  <li className="pl-1">Office desk: working plane = 0.85m</li>
                  <li className="pl-1">Industrial bench: working plane = 0.9m</li>
                  <li className="pl-1">Floor level tasks: working plane = 0m</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Room Index Ranges</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">K &lt; 1: Small or tall narrow room</li>
                  <li className="pl-1">K = 1-2: Typical office/classroom</li>
                  <li className="pl-1">K = 2-3: Large open plan office</li>
                  <li className="pl-1">K &gt; 3: Very large space (warehouse)</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Room Index Examples</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Room</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Dimensions (L×W×H<sub>m</sub>)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Room Index K</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Small office</td>
                      <td className="border border-white/10 px-3 py-2">6m × 4m × 2m</td>
                      <td className="border border-white/10 px-3 py-2">K = 24/(2×10) = 1.2</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Classroom</td>
                      <td className="border border-white/10 px-3 py-2">9m × 7m × 2.2m</td>
                      <td className="border border-white/10 px-3 py-2">K = 63/(2.2×16) = 1.8</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Open plan office</td>
                      <td className="border border-white/10 px-3 py-2">20m × 15m × 2m</td>
                      <td className="border border-white/10 px-3 py-2">K = 300/(2×35) = 4.3</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Warehouse</td>
                      <td className="border border-white/10 px-3 py-2">40m × 25m × 8m</td>
                      <td className="border border-white/10 px-3 py-2">K = 1000/(8×65) = 1.9</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design insight:</strong> Higher K means better utilisation factor. Large rooms are more efficient because proportionally less light is lost to walls.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Utilisation Factor */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Utilisation Factors and Reflectances
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The utilisation factor (UF) represents the proportion of lamp lumens that reach the working
              plane. It accounts for light absorbed by room surfaces and lost through the luminaire optics.
              UF values are obtained from manufacturer's tables.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Factors affecting UF:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Room index (K):</strong> Higher K = higher UF</li>
                <li className="pl-1"><strong>Surface reflectances:</strong> Lighter surfaces = higher UF</li>
                <li className="pl-1"><strong>Luminaire type:</strong> Light distribution affects efficiency</li>
                <li className="pl-1"><strong>Mounting:</strong> Recessed vs suspended vs surface</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Standard Surface Reflectances</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Surface</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Standard</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Light Colours</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Dark Colours</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ceiling</td>
                      <td className="border border-white/10 px-3 py-2">0.7 (70%)</td>
                      <td className="border border-white/10 px-3 py-2">0.8-0.9</td>
                      <td className="border border-white/10 px-3 py-2">0.3-0.5</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Walls</td>
                      <td className="border border-white/10 px-3 py-2">0.5 (50%)</td>
                      <td className="border border-white/10 px-3 py-2">0.6-0.7</td>
                      <td className="border border-white/10 px-3 py-2">0.2-0.3</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Floor</td>
                      <td className="border border-white/10 px-3 py-2">0.2 (20%)</td>
                      <td className="border border-white/10 px-3 py-2">0.3-0.4</td>
                      <td className="border border-white/10 px-3 py-2">0.1</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Example UF Table (Recessed LED Panel)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left" rowSpan={2}>Room Index K</th>
                      <th className="border border-white/10 px-3 py-2 text-center" colSpan={3}>Ceiling 0.7, Floor 0.2</th>
                    </tr>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-center">Walls 0.5</th>
                      <th className="border border-white/10 px-3 py-2 text-center">Walls 0.3</th>
                      <th className="border border-white/10 px-3 py-2 text-center">Walls 0.1</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0.75</td>
                      <td className="border border-white/10 px-3 py-2 text-center">0.41</td>
                      <td className="border border-white/10 px-3 py-2 text-center">0.37</td>
                      <td className="border border-white/10 px-3 py-2 text-center">0.33</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1.0</td>
                      <td className="border border-white/10 px-3 py-2 text-center">0.48</td>
                      <td className="border border-white/10 px-3 py-2 text-center">0.43</td>
                      <td className="border border-white/10 px-3 py-2 text-center">0.39</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1.5</td>
                      <td className="border border-white/10 px-3 py-2 text-center">0.56</td>
                      <td className="border border-white/10 px-3 py-2 text-center">0.51</td>
                      <td className="border border-white/10 px-3 py-2 text-center">0.46</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2.0</td>
                      <td className="border border-white/10 px-3 py-2 text-center">0.61</td>
                      <td className="border border-white/10 px-3 py-2 text-center">0.56</td>
                      <td className="border border-white/10 px-3 py-2 text-center">0.51</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3.0</td>
                      <td className="border border-white/10 px-3 py-2 text-center">0.68</td>
                      <td className="border border-white/10 px-3 py-2 text-center">0.63</td>
                      <td className="border border-white/10 px-3 py-2 text-center">0.57</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5.0</td>
                      <td className="border border-white/10 px-3 py-2 text-center">0.74</td>
                      <td className="border border-white/10 px-3 py-2 text-center">0.69</td>
                      <td className="border border-white/10 px-3 py-2 text-center">0.63</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Interpolation:</strong> For K values between table entries, interpolate linearly. For example, K = 1.25 gives UF approximately midway between K = 1.0 and K = 1.5 values.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Maintenance Factor and Software */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Maintenance Factor and Software Tools
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The maintenance factor accounts for the gradual reduction in light output over time due to
              lamp depreciation and dirt accumulation. Modern software tools like DIALux and Relux provide
              detailed point-by-point calculations that go beyond the simple lumen method.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Maintenance Factor Components</p>
              <p className="font-mono text-center text-lg mb-4">MF = LLD × LDD × RSDD</p>
              <ul className="text-sm text-white space-y-1">
                <li><strong>LLD</strong> = Lamp Lumen Depreciation (LED typically 0.9 at L70)</li>
                <li><strong>LDD</strong> = Luminaire Dirt Depreciation (0.8-0.95 depending on IP rating)</li>
                <li><strong>RSDD</strong> = Room Surface Dirt Depreciation (0.9-0.95 for clean rooms)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Maintenance Factors</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Environment</th>
                      <th className="border border-white/10 px-3 py-2 text-left">LED MF</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Fluorescent MF</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Clean office (3 year)</td>
                      <td className="border border-white/10 px-3 py-2">0.80</td>
                      <td className="border border-white/10 px-3 py-2">0.70</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Normal industrial (2 year)</td>
                      <td className="border border-white/10 px-3 py-2">0.70</td>
                      <td className="border border-white/10 px-3 py-2">0.60</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Dirty industrial (1 year)</td>
                      <td className="border border-white/10 px-3 py-2">0.65</td>
                      <td className="border border-white/10 px-3 py-2">0.55</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">IP65 sealed (5 year)</td>
                      <td className="border border-white/10 px-3 py-2">0.85</td>
                      <td className="border border-white/10 px-3 py-2">0.75</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">DIALux/Relux Features</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Point-by-point illuminance calculation</li>
                  <li className="pl-1">Uniformity verification (Uo, Ud)</li>
                  <li className="pl-1">UGR calculation from observer positions</li>
                  <li className="pl-1">3D rendering and visualisation</li>
                  <li className="pl-1">Automatic luminaire scheduling</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Photometric File Formats</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>IES:</strong> Illuminating Engineering Society (US)</li>
                  <li className="pl-1"><strong>LDT/EULUMDAT:</strong> European format</li>
                  <li className="pl-1"><strong>ULD:</strong> Universal luminaire data</li>
                  <li className="pl-1">Contains intensity distribution data</li>
                  <li className="pl-1">Available from manufacturer websites</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Professional practice:</strong> Use lumen method for initial estimates, then verify with DIALux/Relux for detailed design. Always document assumptions for MF and UF in design reports.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Office Lumen Method Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Brief:</strong> Calculate luminaires for a 15m × 10m office, 2.8m ceiling, using 600×600 LED panels (3600 lumens each). Target 500 lux maintained.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p><strong>Step 1:</strong> Room area A = 15 × 10 = 150m²</p>
                <p className="mt-2"><strong>Step 2:</strong> Mounting height Hm = 2.8 - 0.85 = 1.95m (≈ 2m)</p>
                <p className="mt-2"><strong>Step 3:</strong> Room index K = (15 × 10) / (2 × (15 + 10))</p>
                <p>K = 150 / 50 = <strong>3.0</strong></p>
                <p className="mt-2"><strong>Step 4:</strong> From UF table (K=3.0, reflectances 0.7/0.5/0.2):</p>
                <p>UF = <strong>0.68</strong></p>
                <p className="mt-2"><strong>Step 5:</strong> Clean office, 3-year maintenance: MF = <strong>0.8</strong></p>
                <p className="mt-2"><strong>Step 6:</strong> Apply lumen method:</p>
                <p>N = (E × A) / (Φ × UF × MF)</p>
                <p>N = (500 × 150) / (3600 × 0.68 × 0.8)</p>
                <p>N = 75000 / 1958.4 = <strong>38.3 → 39 luminaires</strong></p>
                <p className="mt-2 text-white/60">Arrange as 6 × 7 = 42 or 5 × 8 = 40 for regular spacing</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Verifying Spacing</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Check if 40 luminaires (5 × 8 grid) gives acceptable spacing for the above room.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Room dimensions: 15m × 10m</p>
                <p>Luminaire grid: 5 across (15m) × 8 along (10m)</p>
                <p className="mt-2">Spacing across: 15m / 5 = <strong>3.0m</strong></p>
                <p>Spacing along: 10m / 8 = <strong>1.25m</strong></p>
                <p className="mt-2">Spacing-to-height ratio:</p>
                <p>SHR (across) = 3.0 / 2.0 = <strong>1.5</strong></p>
                <p>SHR (along) = 1.25 / 2.0 = <strong>0.625</strong></p>
                <p className="mt-2 text-amber-400">⚠ Spacing uneven - consider 6 × 7 = 42 grid instead</p>
                <p className="mt-2">Alternative: 6 × 7 grid</p>
                <p>Spacing: 2.5m × 1.43m gives SHR 1.25 × 0.71</p>
                <p className="text-green-400">✓ More uniform appearance</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Warehouse Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Brief:</strong> Warehouse 30m × 20m × 8m mounting height. Target 200 lux. LED highbays at 24,000 lumens each. Determine quantity.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Area A = 30 × 20 = 600m²</p>
                <p>Room index K = (30 × 20) / (8 × (30 + 20))</p>
                <p>K = 600 / 400 = <strong>1.5</strong></p>
                <p className="mt-2">UF from table (industrial luminaire, K=1.5): UF = <strong>0.55</strong></p>
                <p>Industrial environment MF = <strong>0.7</strong></p>
                <p className="mt-2">N = (200 × 600) / (24000 × 0.55 × 0.7)</p>
                <p>N = 120000 / 9240 = <strong>13 luminaires</strong></p>
                <p className="mt-2 text-white/60">Arrange as 3 × 5 = 15 or 4 × 4 = 16 for even spacing</p>
                <p>Spacing at 15: 10m × 4m (SHR = 1.25 × 0.5)</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Lumen Method Summary</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>N = E×A / (Φ×UF×MF)</strong> - memorise this formula</li>
                <li className="pl-1"><strong>K = LW / Hm(L+W)</strong> - room index formula</li>
                <li className="pl-1">Standard reflectances: C0.7 W0.5 F0.2</li>
                <li className="pl-1">Typical MF: 0.8 (clean office), 0.7 (industrial)</li>
                <li className="pl-1">Always round N up to whole number</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Software Workflow</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Create room geometry (import from CAD or draw)</li>
                <li className="pl-1">Define surface reflectances and working plane</li>
                <li className="pl-1">Import luminaire photometric file (IES/LDT)</li>
                <li className="pl-1">Set calculation grid points and observer positions</li>
                <li className="pl-1">Run calculation and check results against criteria</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Wrong Hm:</strong> Remember to subtract working plane from ceiling height</li>
                <li className="pl-1"><strong>Initial vs maintained:</strong> UF tables give maintained values when MF applied</li>
                <li className="pl-1"><strong>Ignoring spacing:</strong> Check SHR for uniformity, not just quantity</li>
                <li className="pl-1"><strong>Wrong reflectances:</strong> Dark rooms need lower UF values</li>
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
                  <li>N = E×A / (Φ×UF×MF)</li>
                  <li>K = LW / Hm(L+W)</li>
                  <li>Standard: C0.7 W0.5 F0.2</li>
                  <li>MF typically 0.7-0.8</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Spacing Guidance</p>
                <ul className="space-y-0.5">
                  <li>SHR typically 1.0-1.5 for panels</li>
                  <li>Even spacing in both directions</li>
                  <li>Verify uniformity with software</li>
                  <li>Check UGR at observer positions</li>
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
            <Link to="../h-n-c-module4-section4-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Design Criteria
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section4-3">
              Next: Emergency Lighting
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule4Section4_2;
