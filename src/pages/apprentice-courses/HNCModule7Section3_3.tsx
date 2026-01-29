import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Point-by-Point Method - HNC Module 7 Section 3.3";
const DESCRIPTION = "Master point-by-point illuminance calculations: inverse square law, cosine corrections, point calculations, computer-aided design tools, isolux diagrams, and lighting design verification.";

const quickCheckQuestions = [
  {
    id: "inverse-square-law",
    question: "According to the inverse square law, if you double the distance from a light source, the illuminance becomes:",
    options: ["Half the original value", "One quarter of the original value", "One eighth of the original value", "Unchanged"],
    correctIndex: 1,
    explanation: "The inverse square law states that illuminance is inversely proportional to the square of the distance (E = I/d²). Doubling the distance means d² becomes 4 times larger, so illuminance becomes 1/4 of the original value."
  },
  {
    id: "cosine-correction",
    question: "When does cosine correction become essential in point illuminance calculations?",
    options: ["Only for vertical surfaces", "When the light ray strikes the surface at an angle other than perpendicular", "Only for outdoor lighting", "When using LED luminaires"],
    correctIndex: 1,
    explanation: "Cosine correction accounts for light striking a surface at an angle. When light hits at an angle θ from perpendicular, the effective illuminance is reduced by cos³θ due to both the spreading of light and the increased distance."
  },
  {
    id: "dialux-purpose",
    question: "What is the primary advantage of using software like DIALux over manual calculations?",
    options: ["It eliminates the need to understand lighting theory", "It can handle complex geometries, reflections, and multiple luminaires simultaneously", "It always produces accurate results without verification", "It reduces the cost of luminaires"],
    correctIndex: 1,
    explanation: "Software like DIALux can model complex room geometries, account for inter-reflections between surfaces, handle multiple luminaires, and produce detailed isolux diagrams - calculations that would be impractical to perform manually."
  },
  {
    id: "isolux-diagram",
    question: "An isolux diagram displays:",
    options: ["Luminaire positions on a floor plan", "Contour lines connecting points of equal illuminance", "The spectral output of light sources", "Cable routes for lighting circuits"],
    correctIndex: 1,
    explanation: "An isolux diagram shows contour lines (similar to topographical maps) where each line connects points of equal illuminance. This visualisation helps identify uniformity, dark spots, and over-lit areas in a lighting design."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A luminaire with intensity of 2000 cd is mounted 3 metres directly above a point. What is the illuminance at that point?",
    options: [
      "667 lux",
      "222 lux",
      "6000 lux",
      "111 lux"
    ],
    correctAnswer: 1,
    explanation: "Using E = I/d², where I = 2000 cd and d = 3 m: E = 2000/3² = 2000/9 = 222 lux. This is a direct application of the inverse square law for a point directly below the luminaire."
  },
  {
    id: 2,
    question: "For a point not directly below a luminaire, the correct formula including cosine correction is:",
    options: [
      "E = I × cosθ / d²",
      "E = I × cos³θ / h²",
      "E = I / (d × cosθ)",
      "E = I × sinθ / h²"
    ],
    correctAnswer: 1,
    explanation: "The complete point-by-point formula is E = I × cos³θ / h², where θ is the angle from nadir, h is the mounting height, and the cos³θ term accounts for both the cosine law and the increased distance at an angle."
  },
  {
    id: 3,
    question: "A luminaire (I = 1500 cd) is mounted at 4m height. Calculate the illuminance at a horizontal point 3m away from directly below.",
    options: [
      "93.75 lux",
      "48 lux",
      "61.4 lux",
      "75 lux"
    ],
    correctAnswer: 1,
    explanation: "Using E = I × cos³θ / h²: First find d = √(4² + 3²) = 5m, cosθ = h/d = 4/5 = 0.8, cos³θ = 0.512. Then E = 1500 × 0.512 / 16 = 768/16 = 48 lux."
  },
  {
    id: 4,
    question: "What is the main limitation of manual point-by-point calculations?",
    options: [
      "They are always inaccurate",
      "They cannot be verified",
      "They do not account for inter-reflected light from room surfaces",
      "They require expensive equipment"
    ],
    correctAnswer: 2,
    explanation: "Manual point-by-point calculations typically only consider direct light from luminaires. They do not easily account for light reflected from walls, ceilings, and floors, which can significantly contribute to total illuminance, especially in rooms with light-coloured surfaces."
  },
  {
    id: 5,
    question: "In DIALux software, the calculation grid determines:",
    options: [
      "The colour temperature of luminaires",
      "The spacing and resolution of illuminance calculations across a surface",
      "The electrical circuit layout",
      "The maintenance factor"
    ],
    correctAnswer: 1,
    explanation: "The calculation grid in DIALux defines the points at which illuminance values are computed. A finer grid provides more detailed results but requires more computation time. Grid spacing affects the accuracy of uniformity calculations and isolux diagram resolution."
  },
  {
    id: 6,
    question: "When verifying a lighting design, what uniformity ratio is typically required for office general lighting to BS EN 12464-1?",
    options: [
      "U₀ ≥ 0.3",
      "U₀ ≥ 0.4",
      "U₀ ≥ 0.6",
      "U₀ ≥ 0.8"
    ],
    correctAnswer: 2,
    explanation: "BS EN 12464-1 requires a minimum uniformity ratio (U₀ = Emin/Eav) of 0.6 for general office lighting. This ensures that the darkest areas receive at least 60% of the average illuminance, preventing excessive contrast."
  },
  {
    id: 7,
    question: "The inverse square law applies most accurately when:",
    options: [
      "The luminaire is very close to the calculation point",
      "The source can be treated as a point source relative to the distance",
      "The room has highly reflective surfaces",
      "Multiple luminaires are present"
    ],
    correctAnswer: 1,
    explanation: "The inverse square law assumes a point source. It applies accurately when the distance to the calculation point is at least five times the maximum dimension of the luminous area of the luminaire. Very close distances or large luminaires require different calculation methods."
  },
  {
    id: 8,
    question: "Relux and DIALux both use which fundamental method to calculate illuminance?",
    options: [
      "Lumen method only",
      "Radiosity and ray tracing algorithms",
      "Simple averaging",
      "Empirical lookup tables"
    ],
    correctAnswer: 1,
    explanation: "Modern lighting design software uses radiosity (for diffuse inter-reflections) and ray tracing (for specular reflections and complex geometries) algorithms. These mathematically model how light bounces between surfaces, providing accurate results for complex spaces."
  },
  {
    id: 9,
    question: "When calculating illuminance on a vertical surface, which formula applies?",
    options: [
      "E = I × cos²θ × sinθ / h²",
      "E = I × cos³θ / h²",
      "E = I / d²",
      "E = I × sinθ / d²"
    ],
    correctAnswer: 0,
    explanation: "For vertical surfaces, the formula is E = I × cos²θ × sinθ / h², where θ is measured from the vertical axis through the luminaire. The sinθ term accounts for the angle of incidence on the vertical plane."
  },
  {
    id: 10,
    question: "In an isolux diagram, closely spaced contour lines indicate:",
    options: [
      "Uniform illuminance across the area",
      "A rapid change in illuminance (steep gradient)",
      "Low illuminance levels",
      "High colour rendering"
    ],
    correctAnswer: 1,
    explanation: "Like topographical maps, closely spaced isolux contours indicate a steep gradient - illuminance is changing rapidly over a short distance. This might indicate the edge of a spotlight beam or the boundary between lit and unlit areas."
  },
  {
    id: 11,
    question: "What maintenance factor should typically be applied to lighting calculations for a clean office environment?",
    options: [
      "0.5",
      "0.6",
      "0.8",
      "1.0"
    ],
    correctAnswer: 2,
    explanation: "For clean office environments with regular maintenance, a maintenance factor of 0.8 is typical. This accounts for lamp lumen depreciation, luminaire dirt depreciation, and room surface depreciation over the maintenance period."
  },
  {
    id: 12,
    question: "When should point-by-point calculations be used instead of the lumen method?",
    options: [
      "For quick preliminary estimates",
      "When uniformity is not important",
      "For task areas, emergency lighting verification, or complex room geometries",
      "Only when software is unavailable"
    ],
    correctAnswer: 2,
    explanation: "Point-by-point calculations are essential when specific illuminance values at particular locations matter - task areas, emergency escape routes, outdoor floodlighting, or rooms with irregular shapes where the lumen method's assumptions break down."
  }
];

const faqs = [
  {
    question: "When should I use point-by-point calculations instead of the lumen method?",
    answer: "Use point-by-point calculations when you need to know illuminance at specific locations rather than average room illuminance. This includes task lighting verification, emergency lighting compliance (where minimum 1 lux on escape routes is mandatory), outdoor and floodlighting design, display lighting, and any situation where illuminance uniformity is critical. The lumen method gives average values; point-by-point gives precise localised values."
  },
  {
    question: "How accurate are DIALux and Relux calculations?",
    answer: "When properly configured with accurate luminaire photometric data (IES or EULUMDAT files) and realistic surface reflectances, software calculations typically achieve ±10-15% accuracy compared to measured values. Discrepancies usually arise from incorrect input data, furniture and obstructions not modelled, or differences between catalogue and actual luminaire performance. Always verify critical designs with on-site measurements."
  },
  {
    question: "What is the five-times rule for point source calculations?",
    answer: "The inverse square law assumes a point source. The 'five-times rule' states that this approximation is valid when the distance from luminaire to calculation point is at least five times the maximum dimension of the luminous area. For a 600mm × 600mm LED panel, use point calculations only for distances greater than 3 metres. Closer distances require area source calculations."
  },
  {
    question: "How do I account for reflected light in manual calculations?",
    answer: "Manual point-by-point calculations typically ignore inter-reflected light for simplicity. To approximate the contribution, you can add a reflection factor based on room reflectances - typically 10-20% of direct illuminance in rooms with average reflectances. However, for accurate results including reflections, lighting design software is essential as it performs iterative radiosity calculations."
  },
  {
    question: "What grid spacing should I use for illuminance calculations?",
    answer: "BS EN 12464-1 Annex A provides guidance: grid spacing should not exceed 0.2 × 5log₁₀(d), where d is the longer room dimension. For a typical 10m office, this gives approximately 1m spacing. Finer grids (0.5m) are needed for detailed uniformity analysis or where task areas need verification. Very fine grids (0.25m) may be needed for emergency lighting compliance checks."
  }
];

const HNCModule7Section3_3 = () => {
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
            <span>Module 7.3.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Point-by-Point Method
          </h1>
          <p className="text-white/80">
            Inverse square law, cosine corrections, point calculations, and computer-aided lighting design
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Inverse square:</strong> E = I/d² for direct illuminance</li>
              <li className="pl-1"><strong>Cosine correction:</strong> E = I × cos³θ/h² for angled rays</li>
              <li className="pl-1"><strong>Software tools:</strong> DIALux, Relux for complex designs</li>
              <li className="pl-1"><strong>Verification:</strong> Isolux diagrams and uniformity checks</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Practical Applications</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Task lighting:</strong> Verify illuminance at work positions</li>
              <li className="pl-1"><strong>Emergency lighting:</strong> Compliance with 1 lux minimum</li>
              <li className="pl-1"><strong>Floodlighting:</strong> Outdoor and sports lighting design</li>
              <li className="pl-1"><strong>Display lighting:</strong> Retail and museum applications</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply the inverse square law to calculate direct illuminance",
              "Use cosine correction formulae for angled light incidence",
              "Calculate illuminance on horizontal and vertical surfaces",
              "Navigate DIALux and Relux software for lighting design",
              "Interpret isolux diagrams and uniformity calculations",
              "Verify lighting designs against BS EN 12464-1 requirements"
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

        {/* Section 1: Inverse Square Law */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The Inverse Square Law
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The inverse square law is the fundamental principle governing how illuminance decreases with
              distance from a light source. Understanding this relationship is essential for all point
              illuminance calculations and forms the basis of lighting design.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Basic Inverse Square Law Formula</p>
              <div className="font-mono text-lg text-center py-3 text-white">
                E = I / d²
              </div>
              <div className="text-sm text-white/80 mt-2">
                <p><strong>Where:</strong></p>
                <ul className="mt-1 space-y-1">
                  <li>E = illuminance at the point (lux)</li>
                  <li>I = luminous intensity in the direction of the point (candelas)</li>
                  <li>d = distance from source to point (metres)</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key principles:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Point source assumption:</strong> Valid when distance &gt; 5× luminaire dimension</li>
                <li className="pl-1"><strong>Direct component only:</strong> Does not include reflected light</li>
                <li className="pl-1"><strong>Perpendicular incidence:</strong> Applies when light strikes surface at 90°</li>
                <li className="pl-1"><strong>Intensity direction:</strong> Must use intensity in the specific direction toward the point</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Illuminance vs Distance Relationship</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Distance (m)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">d²</th>
                      <th className="border border-white/10 px-3 py-2 text-left">E (for I = 1000 cd)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Relative Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1</td>
                      <td className="border border-white/10 px-3 py-2">1</td>
                      <td className="border border-white/10 px-3 py-2">1000 lux</td>
                      <td className="border border-white/10 px-3 py-2">Reference</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2</td>
                      <td className="border border-white/10 px-3 py-2">4</td>
                      <td className="border border-white/10 px-3 py-2">250 lux</td>
                      <td className="border border-white/10 px-3 py-2">1/4 (25%)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3</td>
                      <td className="border border-white/10 px-3 py-2">9</td>
                      <td className="border border-white/10 px-3 py-2">111 lux</td>
                      <td className="border border-white/10 px-3 py-2">1/9 (11%)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4</td>
                      <td className="border border-white/10 px-3 py-2">16</td>
                      <td className="border border-white/10 px-3 py-2">62.5 lux</td>
                      <td className="border border-white/10 px-3 py-2">1/16 (6.25%)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5</td>
                      <td className="border border-white/10 px-3 py-2">25</td>
                      <td className="border border-white/10 px-3 py-2">40 lux</td>
                      <td className="border border-white/10 px-3 py-2">1/25 (4%)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Critical insight:</strong> Illuminance drops rapidly with distance - doubling the mounting height reduces illuminance to one quarter. This has significant implications for luminaire spacing and task lighting design.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Cosine Correction */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Cosine Correction for Angled Incidence
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When light strikes a surface at an angle other than perpendicular, the illuminance is
              reduced. The cosine correction accounts for both the spreading of light over a larger
              area and the increased distance the light must travel.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                <p className="text-sm font-medium text-blue-400 mb-2">Horizontal Surface Formula</p>
                <div className="font-mono text-lg text-center py-3 text-white">
                  E = I × cos³θ / h²
                </div>
                <div className="text-sm text-white/80 mt-2">
                  <p><strong>Where:</strong></p>
                  <ul className="mt-1 space-y-1">
                    <li>θ = angle from nadir (vertical axis)</li>
                    <li>h = mounting height above surface</li>
                    <li>cos³θ = cosine cubed correction factor</li>
                  </ul>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <p className="text-sm font-medium text-green-400 mb-2">Vertical Surface Formula</p>
                <div className="font-mono text-lg text-center py-3 text-white">
                  E = I × cos²θ × sinθ / h²
                </div>
                <div className="text-sm text-white/80 mt-2">
                  <p><strong>Where:</strong></p>
                  <ul className="mt-1 space-y-1">
                    <li>θ = angle from vertical through luminaire</li>
                    <li>sinθ = accounts for vertical plane orientation</li>
                    <li>Used for wall illuminance calculations</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Understanding the cos³θ Term</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Angle θ</th>
                      <th className="border border-white/10 px-3 py-2 text-left">cosθ</th>
                      <th className="border border-white/10 px-3 py-2 text-left">cos³θ</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Effect on E</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0° (directly below)</td>
                      <td className="border border-white/10 px-3 py-2">1.000</td>
                      <td className="border border-white/10 px-3 py-2">1.000</td>
                      <td className="border border-white/10 px-3 py-2">Full illuminance</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">30°</td>
                      <td className="border border-white/10 px-3 py-2">0.866</td>
                      <td className="border border-white/10 px-3 py-2">0.650</td>
                      <td className="border border-white/10 px-3 py-2">65% of maximum</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">45°</td>
                      <td className="border border-white/10 px-3 py-2">0.707</td>
                      <td className="border border-white/10 px-3 py-2">0.354</td>
                      <td className="border border-white/10 px-3 py-2">35% of maximum</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">60°</td>
                      <td className="border border-white/10 px-3 py-2">0.500</td>
                      <td className="border border-white/10 px-3 py-2">0.125</td>
                      <td className="border border-white/10 px-3 py-2">12.5% of maximum</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">75°</td>
                      <td className="border border-white/10 px-3 py-2">0.259</td>
                      <td className="border border-white/10 px-3 py-2">0.017</td>
                      <td className="border border-white/10 px-3 py-2">1.7% of maximum</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Worked Calculation Example</p>
              <div className="text-sm space-y-2 font-mono">
                <p className="text-white/60">Given: Luminaire at 4m height, I = 1500 cd</p>
                <p className="text-white/60">Find: Illuminance 3m horizontally from directly below</p>
                <p className="mt-3">Step 1: Find the angle θ</p>
                <p className="ml-4">tan θ = horizontal distance / height = 3/4</p>
                <p className="ml-4">θ = arctan(0.75) = 36.87°</p>
                <p className="mt-2">Step 2: Calculate cos³θ</p>
                <p className="ml-4">cosθ = 4/5 = 0.8 (or cos 36.87°)</p>
                <p className="ml-4">cos³θ = 0.8³ = 0.512</p>
                <p className="mt-2">Step 3: Apply the formula</p>
                <p className="ml-4">E = I × cos³θ / h²</p>
                <p className="ml-4">E = 1500 × 0.512 / 16</p>
                <p className="ml-4 text-green-400">E = 48 lux</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical tip:</strong> For quick estimates, remember that at 45° the illuminance is roughly one-third of directly below, and at 60° it drops to about one-eighth.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Computer-Aided Design Tools */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Computer-Aided Lighting Design
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Modern lighting design relies heavily on specialist software that can perform thousands
              of point calculations, model inter-reflections, and generate comprehensive documentation.
              DIALux and Relux are the industry-standard tools available free of charge.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">DIALux</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Free professional lighting software</li>
                  <li className="pl-1">Supports IES and EULUMDAT photometry</li>
                  <li className="pl-1">Interior, exterior, and road lighting</li>
                  <li className="pl-1">Extensive manufacturer luminaire catalogues</li>
                  <li className="pl-1">Emergency lighting calculations</li>
                  <li className="pl-1">Daylight integration modelling</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Relux</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Alternative professional platform</li>
                  <li className="pl-1">Strong 3D visualisation capabilities</li>
                  <li className="pl-1">Sensor and control system simulation</li>
                  <li className="pl-1">Energy consumption analysis</li>
                  <li className="pl-1">BIM integration support</li>
                  <li className="pl-1">Cloud-based collaboration features</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Software Calculation Methods</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Point-by-point</td>
                      <td className="border border-white/10 px-3 py-2">Direct component from each luminaire summed</td>
                      <td className="border border-white/10 px-3 py-2">Base calculation for all points</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Radiosity</td>
                      <td className="border border-white/10 px-3 py-2">Iterative calculation of diffuse inter-reflections</td>
                      <td className="border border-white/10 px-3 py-2">Interior spaces with reflective surfaces</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ray tracing</td>
                      <td className="border border-white/10 px-3 py-2">Follows individual light paths for specular reflection</td>
                      <td className="border border-white/10 px-3 py-2">Spaces with mirrors, glazing, polished surfaces</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Monte Carlo</td>
                      <td className="border border-white/10 px-3 py-2">Statistical sampling of light paths</td>
                      <td className="border border-white/10 px-3 py-2">Complex geometries, daylight modelling</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Essential Input Data for Software</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm text-white">
                <div>
                  <p className="font-medium mb-1">Room Parameters</p>
                  <ul className="space-y-0.5 text-white/80">
                    <li>Accurate room geometry (dimensions)</li>
                    <li>Surface reflectances (ceiling, walls, floor)</li>
                    <li>Workplane height (typically 0.85m)</li>
                    <li>Maintenance factor</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-1">Luminaire Data</p>
                  <ul className="space-y-0.5 text-white/80">
                    <li>Photometric file (IES/LDT)</li>
                    <li>Lamp/LED lumen output</li>
                    <li>Luminaire efficiency (LOR)</li>
                    <li>Mounting positions and orientations</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Always use manufacturer-supplied photometric files rather than generic data. Verify luminaire performance claims against independent test certificates where available.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Isolux Diagrams and Verification */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Isolux Diagrams and Design Verification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Isolux diagrams provide visual representation of illuminance distribution across a surface.
              Combined with uniformity calculations and compliance checks, they form the basis for
              verifying that a lighting design meets specification requirements.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Understanding Isolux Diagrams</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Contour lines:</strong> Connect points of equal illuminance (like altitude contours on maps)</li>
                <li className="pl-1"><strong>Close spacing:</strong> Indicates rapid change in illuminance (steep gradient)</li>
                <li className="pl-1"><strong>Wide spacing:</strong> Indicates gradual, uniform illuminance distribution</li>
                <li className="pl-1"><strong>Closed loops:</strong> Show peaks (high values inside) or troughs (low values inside)</li>
                <li className="pl-1"><strong>Colour coding:</strong> Typically red/orange for high values, blue/purple for low</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Uniformity Ratios to BS EN 12464-1</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Ratio</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Definition</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Requirements</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">U₀ (uniformity)</td>
                      <td className="border border-white/10 px-3 py-2">E<sub>min</sub> / E<sub>average</sub></td>
                      <td className="border border-white/10 px-3 py-2">≥ 0.6 for task areas, ≥ 0.4 for surroundings</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">U<sub>d</sub> (diversity)</td>
                      <td className="border border-white/10 px-3 py-2">E<sub>min</sub> / E<sub>max</sub></td>
                      <td className="border border-white/10 px-3 py-2">Used for specific applications (sports lighting)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">E<sub>average</sub></td>
                      <td className="border border-white/10 px-3 py-2">Mean illuminance across calculation area</td>
                      <td className="border border-white/10 px-3 py-2">Must meet maintained illuminance requirement</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">E<sub>min</sub></td>
                      <td className="border border-white/10 px-3 py-2">Minimum point illuminance</td>
                      <td className="border border-white/10 px-3 py-2">Critical for emergency lighting (≥ 1 lux)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <p className="text-sm font-medium text-green-400 mb-2">Design Verification Checklist</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">E<sub>average</sub> meets maintained illuminance</li>
                  <li className="pl-1">Uniformity U₀ ≥ specified value</li>
                  <li className="pl-1">No dark spots below minimum threshold</li>
                  <li className="pl-1">Glare rating (UGR) within limits</li>
                  <li className="pl-1">Emergency lighting compliance verified</li>
                  <li className="pl-1">Energy efficiency targets met (W/m²/100 lux)</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
                <p className="text-sm font-medium text-orange-400 mb-2">Common Design Issues Identified</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Excessive spacing causing dark bands</li>
                  <li className="pl-1">Perimeter areas below minimum</li>
                  <li className="pl-1">Over-lighting in circulation areas</li>
                  <li className="pl-1">Task area not meeting requirements</li>
                  <li className="pl-1">Poor wall illuminance affecting room appearance</li>
                  <li className="pl-1">Luminaire orientation causing asymmetric patterns</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Grid Spacing Requirements (BS EN 12464-1 Annex A)</p>
              <div className="text-sm text-white/90">
                <p className="mb-2">Maximum grid cell size for accurate uniformity calculations:</p>
                <div className="font-mono bg-black/30 p-3 rounded mb-2">
                  p = 0.2 × 5<sup>log₁₀(d)</sup>
                </div>
                <p className="text-white/70">Where d is the longer room dimension in metres.</p>
                <div className="mt-3">
                  <p className="font-medium mb-1">Example grid sizes:</p>
                  <ul className="space-y-0.5 text-white/80">
                    <li>5m room: p ≤ 0.5m grid spacing</li>
                    <li>10m room: p ≤ 1.0m grid spacing</li>
                    <li>20m room: p ≤ 2.0m grid spacing</li>
                    <li>50m room: p ≤ 4.2m grid spacing</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Commissioning requirement:</strong> Calculated values should be verified by on-site measurements at representative points. A ±20% variance from calculated values is generally acceptable, accounting for construction tolerances and actual surface reflectances.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Multiple Luminaire Contribution</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Two identical luminaires (I = 1200 cd at nadir) mounted at 3m height, 4m apart. Calculate illuminance at the midpoint.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">The midpoint is 2m from each luminaire horizontally</p>
                <p className="mt-2">For each luminaire:</p>
                <p className="ml-4">tan θ = 2/3, θ = 33.69°</p>
                <p className="ml-4">cos θ = 0.832, cos³θ = 0.576</p>
                <p className="ml-4">E₁ = 1200 × 0.576 / 9 = 76.8 lux</p>
                <p className="mt-2">Total illuminance (both luminaires):</p>
                <p className="ml-4">E<sub>total</sub> = E₁ + E₂ = 76.8 + 76.8</p>
                <p className="ml-4 text-green-400">E<sub>total</sub> = 153.6 lux</p>
                <p className="mt-2 text-white/60">Note: Point-by-point method sums contributions from all luminaires</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Vertical Surface Illuminance</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Calculate the illuminance on a wall 2m from directly below a luminaire (I = 800 cd, h = 2.5m).
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Using vertical surface formula: E = I × cos²θ × sinθ / h²</p>
                <p className="mt-2">Step 1: Find angle θ</p>
                <p className="ml-4">tan θ = horizontal / height = 2/2.5 = 0.8</p>
                <p className="ml-4">θ = 38.66°</p>
                <p className="mt-2">Step 2: Calculate trigonometric terms</p>
                <p className="ml-4">cos θ = 0.781, cos²θ = 0.610</p>
                <p className="ml-4">sin θ = 0.625</p>
                <p className="mt-2">Step 3: Apply formula</p>
                <p className="ml-4">E = 800 × 0.610 × 0.625 / 6.25</p>
                <p className="ml-4">E = 305 / 6.25</p>
                <p className="ml-4 text-green-400">E = 48.8 lux on the vertical wall surface</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Emergency Lighting Verification</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Verify that an emergency luminaire (I = 150 cd) at 2.8m provides the required 1 lux minimum at 4m horizontal distance on an escape route.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Emergency lighting requires minimum 1 lux on centre line of escape routes</p>
                <p className="mt-2">Calculate illuminance at 4m horizontal:</p>
                <p className="ml-4">tan θ = 4/2.8 = 1.429, θ = 55.0°</p>
                <p className="ml-4">cos θ = 0.574, cos³θ = 0.189</p>
                <p className="ml-4">E = 150 × 0.189 / 7.84</p>
                <p className="ml-4 text-green-400">E = 3.6 lux ✓ Exceeds 1 lux requirement</p>
                <p className="mt-2 text-white/60">Maximum spacing between luminaires:</p>
                <p className="ml-4">At 4m each direction = 8m total spacing</p>
                <p className="ml-4 text-orange-400">Verify uniformity ratio ≥ 40:1 max/min also achieved</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Software Workflow Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Create accurate room geometry with correct dimensions</li>
                <li className="pl-1">Set appropriate surface reflectances (70/50/20 typical)</li>
                <li className="pl-1">Import manufacturer photometric data files</li>
                <li className="pl-1">Position luminaires according to layout drawings</li>
                <li className="pl-1">Define calculation areas (task area, surrounding area)</li>
                <li className="pl-1">Set appropriate grid spacing per BS EN 12464-1</li>
                <li className="pl-1">Apply correct maintenance factor</li>
                <li className="pl-1">Run calculations and verify against requirements</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Formulae Summary</h3>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Formula</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Direct below (perpendicular)</td>
                      <td className="border border-white/10 px-3 py-2 font-mono">E = I / h²</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Horizontal surface (angled)</td>
                      <td className="border border-white/10 px-3 py-2 font-mono">E = I × cos³θ / h²</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Vertical surface</td>
                      <td className="border border-white/10 px-3 py-2 font-mono">E = I × cos²θ × sinθ / h²</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Uniformity ratio</td>
                      <td className="border border-white/10 px-3 py-2 font-mono">U₀ = E<sub>min</sub> / E<sub>average</sub></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Calculation Errors</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Using lumens instead of candelas</strong> - Point calculations require intensity (cd) not flux (lm)</li>
                <li className="pl-1"><strong>Forgetting cos³θ term</strong> - Simple inverse square only applies directly below</li>
                <li className="pl-1"><strong>Incorrect angle measurement</strong> - θ is from nadir (vertical), not from horizontal</li>
                <li className="pl-1"><strong>Ignoring maintenance factor</strong> - Results show initial, not maintained values</li>
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
                <p className="font-medium text-white mb-1">Core Formulae</p>
                <ul className="space-y-0.5">
                  <li>E = I/d² (inverse square law)</li>
                  <li>E = I × cos³θ/h² (horizontal surface)</li>
                  <li>E = I × cos²θ × sinθ/h² (vertical)</li>
                  <li>U₀ = E<sub>min</sub>/E<sub>average</sub> ≥ 0.6</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Software Tools</p>
                <ul className="space-y-0.5">
                  <li>DIALux - industry standard, free</li>
                  <li>Relux - alternative with 3D focus</li>
                  <li>IES/EULUMDAT photometric files</li>
                  <li>Radiosity for inter-reflections</li>
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
            <Link to="../h-n-c-module7-section3-4">
              Next: Design Verification
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule7Section3_3;
