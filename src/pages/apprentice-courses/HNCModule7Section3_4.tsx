import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Glare Assessment - HNC Module 7 Section 3.4";
const DESCRIPTION = "Master glare assessment for lighting installations: Unified Glare Rating (UGR) calculation, glare sources, shielding angles, UGR limits by application, and compliance strategies for visual comfort.";

const quickCheckQuestions = [
  {
    id: "ugr-definition",
    question: "What does UGR stand for in lighting design?",
    options: ["Universal Glare Ratio", "Unified Glare Rating", "Unit Glare Reduction", "Uniform Glare Resistance"],
    correctIndex: 1,
    explanation: "UGR stands for Unified Glare Rating, a standardised metric defined in CIE 117 for evaluating discomfort glare from luminaires in indoor lighting installations."
  },
  {
    id: "ugr-office-limit",
    question: "What is the maximum UGR limit for a typical office environment?",
    options: ["UGR ≤ 16", "UGR ≤ 19", "UGR ≤ 22", "UGR ≤ 28"],
    correctIndex: 1,
    explanation: "Offices and computer workstations require UGR ≤ 19 to ensure visual comfort during prolonged tasks. This limit is specified in BS EN 12464-1 for general office work."
  },
  {
    id: "shielding-angle",
    question: "What is the primary purpose of a luminaire shielding angle?",
    options: ["To increase light output", "To prevent direct view of the lamp from normal viewing angles", "To reduce energy consumption", "To improve colour rendering"],
    correctIndex: 1,
    explanation: "The shielding angle prevents direct view of high-luminance lamp surfaces from typical viewing positions. A higher shielding angle means the lamp is hidden at smaller angles from horizontal, reducing potential glare."
  },
  {
    id: "glare-types",
    question: "Which type of glare occurs when light reflects off shiny surfaces into the observer's eyes?",
    options: ["Direct glare", "Discomfort glare", "Reflected glare (veiling reflections)", "Disability glare"],
    correctIndex: 2,
    explanation: "Reflected glare (also called veiling reflections) occurs when light reflects off glossy surfaces such as screens, paper, or worktops. This can reduce contrast and visibility of the task."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "According to BS EN 12464-1, what UGR limit applies to detailed drawing offices?",
    options: [
      "UGR ≤ 13",
      "UGR ≤ 16",
      "UGR ≤ 19",
      "UGR ≤ 22"
    ],
    correctAnswer: 1,
    explanation: "Technical drawing offices require UGR ≤ 16 due to the precision visual tasks involved. This more stringent limit reduces discomfort during detailed work requiring high visual accuracy."
  },
  {
    id: 2,
    question: "In the UGR formula, what does the term 'Lb' represent?",
    options: ["Luminaire background luminance", "Background luminance of the room surfaces", "Lamp brightness", "Light level at the task"],
    correctAnswer: 1,
    explanation: "Lb represents the background luminance - the average luminance of the room surfaces (walls, ceiling) excluding the luminaires. Higher background luminance reduces the contrast with luminaires, lowering perceived glare."
  },
  {
    id: 3,
    question: "What UGR limit is appropriate for a warehouse or corridor?",
    options: ["UGR ≤ 16", "UGR ≤ 19", "UGR ≤ 25", "UGR ≤ 28"],
    correctAnswer: 3,
    explanation: "Corridors, warehouses, and circulation areas permit UGR ≤ 28 as these spaces involve less demanding visual tasks and shorter occupation times. The relaxed limit allows more economical luminaire selection."
  },
  {
    id: 4,
    question: "Which factor in the UGR calculation accounts for luminaire position relative to the observer?",
    options: [
      "Luminaire luminous area (A)",
      "Position index (p)",
      "Background luminance (Lb)",
      "Luminaire luminance (L)"
    ],
    correctAnswer: 1,
    explanation: "The position index (p) accounts for the luminaire's position in the observer's field of view. Luminaires directly ahead contribute more to glare than those at the periphery, reflected in the Guth position index."
  },
  {
    id: 5,
    question: "For a luminaire with high lamp luminance, what minimum shielding angle is typically recommended?",
    options: [
      "10°",
      "20°",
      "30°",
      "45°"
    ],
    correctAnswer: 2,
    explanation: "Luminaires with high lamp luminance (&gt;50,000 cd/m²) typically require shielding angles of 30° or greater. This prevents direct view of the lamp from normal working positions and reduces discomfort glare."
  },
  {
    id: 6,
    question: "What is the recommended UGR limit for a school classroom?",
    options: [
      "UGR ≤ 16",
      "UGR ≤ 19",
      "UGR ≤ 22",
      "UGR ≤ 25"
    ],
    correctAnswer: 1,
    explanation: "School classrooms require UGR ≤ 19 to support reading, writing, and viewing whiteboards/screens. This aligns with general office requirements for visual comfort during prolonged concentration."
  },
  {
    id: 7,
    question: "When assessing reflected glare on VDU screens, what luminaire position is most critical?",
    options: [
      "Directly above the workstation",
      "Behind the screen relative to the user",
      "In front of the screen in the user's direct view",
      "At 45° either side of the screen"
    ],
    correctAnswer: 1,
    explanation: "Luminaires behind the screen (in front of the user) are most likely to create reflections on the screen surface. The reflection zone depends on screen tilt angle and luminaire positioning relative to the user's viewing direction."
  },
  {
    id: 8,
    question: "How does increasing room surface reflectance typically affect UGR?",
    options: [
      "Increases UGR (worse glare)",
      "Decreases UGR (better glare control)",
      "Has no effect on UGR",
      "Only affects direct glare, not UGR"
    ],
    correctAnswer: 1,
    explanation: "Higher room surface reflectance increases background luminance (Lb), reducing the contrast between luminaires and surroundings. This typically decreases UGR values, improving visual comfort."
  },
  {
    id: 9,
    question: "What does a UGR table typically provide for a specific luminaire?",
    options: [
      "Only the single UGR value for any room",
      "UGR values for various room dimensions and reflectances",
      "The luminaire's power consumption",
      "Maintenance factor recommendations"
    ],
    correctAnswer: 1,
    explanation: "UGR tables provide glare ratings for a range of room dimensions (length, width, height ratios) and surface reflectances. This allows designers to determine UGR for specific installation conditions without complex calculations."
  },
  {
    id: 10,
    question: "In controlling glare for VDU workstations, what luminaire luminance limit is recommended when viewed at 65° from vertical?",
    options: [
      "500 cd/m²",
      "1,500 cd/m²",
      "3,000 cd/m²",
      "5,000 cd/m²"
    ],
    correctAnswer: 2,
    explanation: "BS EN 12464-1 recommends limiting luminaire luminance to 3,000 cd/m² at 65° from vertical for areas with VDU use. This reduces the likelihood of screen reflections and direct glare from luminaires in the peripheral vision."
  },
  {
    id: 11,
    question: "What type of glare temporarily reduces visual performance without necessarily causing discomfort?",
    options: [
      "Discomfort glare",
      "Disability glare",
      "Reflected glare",
      "Contrast glare"
    ],
    correctAnswer: 1,
    explanation: "Disability glare reduces visual performance by scattering light within the eye, reducing contrast sensitivity. It can occur without discomfort, such as when driving towards low sun. UGR primarily addresses discomfort glare."
  },
  {
    id: 12,
    question: "When using louvred luminaires for glare control, what is the primary trade-off?",
    options: [
      "Higher energy consumption",
      "Reduced light output ratio (LOR) and efficiency",
      "Increased maintenance requirements",
      "Poor colour rendering"
    ],
    correctAnswer: 1,
    explanation: "Louvres and deep recessing reduce UGR effectively but absorb some light, reducing the luminaire's Light Output Ratio (LOR). This means more luminaires or higher wattage may be needed to achieve required illuminance levels."
  }
];

const faqs = [
  {
    question: "How do I use a UGR table from a luminaire datasheet?",
    answer: "UGR tables present values in a matrix format. The rows represent room dimensions (X × Y × H, where X is room length along the luminaire axis, Y is width, and H is mounting height above eye level). The columns show different surface reflectance combinations (ceiling/walls/floor). Find the row matching your room dimensions and the column matching your reflectances to read the UGR value. Compare this against your application's UGR limit."
  },
  {
    question: "Can I calculate exact UGR without specialist software?",
    answer: "The UGR formula requires summing contributions from all luminaires visible from the observer position, accounting for luminance, solid angle, and position index. While the formula can be calculated manually for simple layouts, practical assessments use lighting design software (DIALux, Relux) that computes UGR across a grid of observer positions and viewing directions automatically."
  },
  {
    question: "What if my calculated UGR slightly exceeds the limit?",
    answer: "Consider these modifications: (1) Select luminaires with lower UGR ratings (micro-prismatic diffusers, deeper louvres), (2) Increase room surface reflectances where practical, (3) Reposition luminaires away from critical viewing directions, (4) Increase mounting height to reduce solid angles, (5) Reduce luminaire luminance through dimming if illuminance permits. Even 1-2 UGR points can make the difference for compliance."
  },
  {
    question: "How does natural daylight affect glare assessment?",
    answer: "UGR calculations for artificial lighting assume specific background luminances. Daylight significantly increases background luminance, typically improving (reducing) perceived glare from luminaires. However, daylight itself can cause glare from windows. BS EN 17037 addresses daylight glare using DGP (Daylight Glare Probability). A comprehensive design considers both artificial and daylight glare sources."
  },
  {
    question: "Why do VDU environments have additional luminance limits beyond UGR?",
    answer: "UGR addresses discomfort glare from direct viewing of luminaires. VDU screens create additional concerns: luminaires reflected in screens can obscure displayed information (veiling reflections). The 3,000 cd/m² luminance limit at 65° targets the typical reflection zone for screens. This is separate from UGR compliance and both criteria must be met in VDU areas."
  },
  {
    question: "Is UGR affected by the number of luminaires?",
    answer: "Yes. Adding more luminaires increases the number of glare sources in the field of view, potentially increasing UGR. The formula sums contributions from all visible luminaires. However, if additional luminaires allow lower individual luminaire output while maintaining illuminance, the overall effect may be neutral. Lighting design must balance luminaire quantity, output, and positioning for optimal UGR."
  }
];

const HNCModule7Section3_4 = () => {
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
            <span>Module 7.3.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Glare Assessment
          </h1>
          <p className="text-white/80">
            Unified Glare Rating (UGR) calculation, glare sources, shielding angles, and compliance with UGR limits for visual comfort
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>UGR:</strong> Unified Glare Rating quantifies discomfort glare</li>
              <li className="pl-1"><strong>Typical limits:</strong> Offices UGR ≤ 19, corridors UGR ≤ 28</li>
              <li className="pl-1"><strong>Shielding angle:</strong> Prevents direct lamp view</li>
              <li className="pl-1"><strong>Compliance:</strong> Design software calculates UGR from layout</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Standards</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>CIE 117:</strong> Defines UGR calculation method</li>
              <li className="pl-1"><strong>BS EN 12464-1:</strong> UGR limits by application</li>
              <li className="pl-1"><strong>SLL Code:</strong> Design guidance and recommendations</li>
              <li className="pl-1"><strong>VDU criteria:</strong> 3,000 cd/m² at 65° limit</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the UGR formula and its contributing factors",
              "Apply appropriate UGR limits for different applications",
              "Distinguish between direct, reflected, and disability glare",
              "Calculate and interpret shielding angles for luminaires",
              "Use UGR tables to assess glare for specific room conditions",
              "Implement strategies to reduce UGR in lighting designs"
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

        {/* Section 1: Glare Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Glare Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Glare is the visual discomfort or impairment caused by excessive luminance contrast in the
              field of view. In lighting design, understanding and controlling glare is essential for
              creating comfortable, productive visual environments that comply with workplace standards.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Types of Glare</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-elec-yellow/80 mb-2">Discomfort Glare</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Causes visual discomfort without necessarily impairing vision</li>
                    <li>Results from high luminance sources in the field of view</li>
                    <li>Quantified using UGR (Unified Glare Rating)</li>
                    <li>Cumulative effect over time leads to fatigue</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-elec-yellow/80 mb-2">Disability Glare</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Directly impairs visual performance</li>
                    <li>Light scattered in the eye reduces contrast</li>
                    <li>Common with bright light sources in dark environments</li>
                    <li>May occur without discomfort sensation</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Glare Sources in Interior Lighting</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Glare Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Source</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Control Method</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Direct glare</td>
                      <td className="border border-white/10 px-3 py-2">Luminaire lamps/optics</td>
                      <td className="border border-white/10 px-3 py-2">Shielding, louvres, positioning</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Reflected glare</td>
                      <td className="border border-white/10 px-3 py-2">Specular surfaces, screens</td>
                      <td className="border border-white/10 px-3 py-2">Luminaire positioning, matte finishes</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Veiling reflections</td>
                      <td className="border border-white/10 px-3 py-2">Glossy task surfaces</td>
                      <td className="border border-white/10 px-3 py-2">Indirect lighting, task orientation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Daylight glare</td>
                      <td className="border border-white/10 px-3 py-2">Windows, skylights</td>
                      <td className="border border-white/10 px-3 py-2">Blinds, shading, orientation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design principle:</strong> Glare depends on the luminance of the source, its size, position in the field of view, and the background luminance. UGR provides a standardised way to evaluate these factors together.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Unified Glare Rating (UGR) */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Unified Glare Rating (UGR)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Unified Glare Rating is defined in CIE 117 and adopted by BS EN 12464-1. It provides
              a standardised numerical assessment of discomfort glare from luminaires in indoor spaces,
              enabling designers to predict visual comfort before installation.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">UGR Formula</p>
              <div className="font-mono text-sm space-y-2">
                <p className="text-white">UGR = 8 × log₁₀ [ (0.25 / Lb) × Σ (L² × ω / p²) ]</p>
                <p className="text-white/60 text-xs mt-2">Where:</p>
                <p className="text-white/80 text-xs">Lb = Background luminance (cd/m²)</p>
                <p className="text-white/80 text-xs">L = Luminaire luminance (cd/m²)</p>
                <p className="text-white/80 text-xs">ω = Solid angle of luminaire (sr)</p>
                <p className="text-white/80 text-xs">p = Position index (Guth index)</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Factors Increasing UGR</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Higher luminaire luminance (L)</li>
                  <li className="pl-1">Larger visible luminaire area (ω)</li>
                  <li className="pl-1">Lower background luminance (Lb)</li>
                  <li className="pl-1">Luminaires directly ahead (lower p)</li>
                  <li className="pl-1">More luminaires in field of view</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Factors Decreasing UGR</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Lower luminaire luminance</li>
                  <li className="pl-1">Higher room reflectances</li>
                  <li className="pl-1">Luminaires at periphery</li>
                  <li className="pl-1">Greater mounting height</li>
                  <li className="pl-1">Effective shielding/diffusion</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">UGR Limits by Application (BS EN 12464-1)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">UGR Limit</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Rationale</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Technical drawing</td>
                      <td className="border border-white/10 px-3 py-2 text-elec-yellow">≤ 16</td>
                      <td className="border border-white/10 px-3 py-2">Precision visual tasks, fine detail</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Offices, classrooms</td>
                      <td className="border border-white/10 px-3 py-2 text-elec-yellow">≤ 19</td>
                      <td className="border border-white/10 px-3 py-2">Reading, writing, screen work</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Industrial, fine work</td>
                      <td className="border border-white/10 px-3 py-2 text-elec-yellow">≤ 19</td>
                      <td className="border border-white/10 px-3 py-2">Assembly, inspection tasks</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Industrial, medium work</td>
                      <td className="border border-white/10 px-3 py-2 text-elec-yellow">≤ 22</td>
                      <td className="border border-white/10 px-3 py-2">General manufacturing</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Retail, general</td>
                      <td className="border border-white/10 px-3 py-2 text-elec-yellow">≤ 22</td>
                      <td className="border border-white/10 px-3 py-2">Varied viewing directions</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Industrial, rough work</td>
                      <td className="border border-white/10 px-3 py-2 text-elec-yellow">≤ 25</td>
                      <td className="border border-white/10 px-3 py-2">Heavy industry, storage</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Corridors, stairs</td>
                      <td className="border border-white/10 px-3 py-2 text-elec-yellow">≤ 28</td>
                      <td className="border border-white/10 px-3 py-2">Transient occupation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Important:</strong> UGR is calculated for specific observer positions and viewing directions. Design software evaluates UGR across a grid to ensure compliance throughout the space.
            </p>
          </div>
        </section>

        {/* Section 3: Shielding Angles and Luminaire Selection */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Shielding Angles and Luminaire Selection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The shielding angle is the angle measured from horizontal below which the lamp
              is hidden from direct view. Effective shielding prevents high-luminance lamp surfaces
              from contributing to glare at normal viewing angles.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Shielding Angle Definition</p>
              <div className="text-sm space-y-2">
                <p>The shielding angle (γ) is measured from horizontal to the line from the edge of the luminaire aperture to the lamp.</p>
                <p className="font-mono text-white/80 mt-2">γ = arctan(d / h)</p>
                <p className="text-white/60 text-xs">Where: d = horizontal distance from lamp to aperture edge, h = vertical depth of recess</p>
                <p className="mt-2">A shielding angle of 30° means the lamp is not visible when viewing the luminaire at angles less than 30° above horizontal.</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Minimum Shielding Angles by Lamp Luminance</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Lamp Luminance (cd/m²)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Minimum Shielding Angle</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Lamp Types</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">20,000 - 50,000</td>
                      <td className="border border-white/10 px-3 py-2">15°</td>
                      <td className="border border-white/10 px-3 py-2">Fluorescent tubes</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">50,000 - 500,000</td>
                      <td className="border border-white/10 px-3 py-2">20°</td>
                      <td className="border border-white/10 px-3 py-2">Compact fluorescent, some LED</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">&gt; 500,000</td>
                      <td className="border border-white/10 px-3 py-2">30°</td>
                      <td className="border border-white/10 px-3 py-2">High-intensity LED, halogen</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Louvred Luminaires</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Parabolic or linear louvres</li>
                  <li className="pl-1">Excellent UGR control</li>
                  <li className="pl-1">Reduced LOR (efficiency)</li>
                  <li className="pl-1">Directional light distribution</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Micro-Prismatic Diffusers</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Refracts and spreads light</li>
                  <li className="pl-1">Good UGR with higher LOR</li>
                  <li className="pl-1">Softer appearance</li>
                  <li className="pl-1">Modern aesthetic</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Recessed Luminaires</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Deep recess creates shielding</li>
                  <li className="pl-1">Reduced visible solid angle</li>
                  <li className="pl-1">Ceiling integration</li>
                  <li className="pl-1">May require more luminaires</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">VDU Workstation Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Maximum luminaire luminance: <strong>3,000 cd/m² at 65°</strong> from vertical</li>
                <li className="pl-1">Avoid luminaires in the screen reflection zone (typically behind screen)</li>
                <li className="pl-1">Consider indirect or direct/indirect luminaires</li>
                <li className="pl-1">Matte screen surfaces reduce reflected glare</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Selection tip:</strong> Compare UGR values from luminaire datasheets at equivalent room conditions. A luminaire with UGR 16 in standard conditions may achieve UGR 19 compliance more easily than one rated UGR 19.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: UGR Tables and Design Compliance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            UGR Tables and Design Compliance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Manufacturers provide UGR tables showing glare ratings for their luminaires across
              a range of room sizes and surface reflectances. Understanding how to read and apply
              these tables is essential for early-stage luminaire selection.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Example UGR Table Structure</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left" rowSpan={2}>Room Dimensions (X:Y:H)</th>
                      <th className="border border-white/10 px-3 py-2 text-center" colSpan={3}>Ceiling/Wall/Floor Reflectance</th>
                    </tr>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-center">70/50/20</th>
                      <th className="border border-white/10 px-3 py-2 text-center">70/30/20</th>
                      <th className="border border-white/10 px-3 py-2 text-center">50/30/20</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2H : 2H</td>
                      <td className="border border-white/10 px-3 py-2 text-center">16.2</td>
                      <td className="border border-white/10 px-3 py-2 text-center">17.5</td>
                      <td className="border border-white/10 px-3 py-2 text-center">18.1</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4H : 4H</td>
                      <td className="border border-white/10 px-3 py-2 text-center">18.4</td>
                      <td className="border border-white/10 px-3 py-2 text-center">19.7</td>
                      <td className="border border-white/10 px-3 py-2 text-center">20.3</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">8H : 4H</td>
                      <td className="border border-white/10 px-3 py-2 text-center">19.1</td>
                      <td className="border border-white/10 px-3 py-2 text-center">20.4</td>
                      <td className="border border-white/10 px-3 py-2 text-center">21.0</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">12H : 12H</td>
                      <td className="border border-white/10 px-3 py-2 text-center">19.8</td>
                      <td className="border border-white/10 px-3 py-2 text-center">21.1</td>
                      <td className="border border-white/10 px-3 py-2 text-center">21.7</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/60 mt-2">H = mounting height above eye level (typically 1.2m below luminaire for seated observers)</p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Reading UGR Tables</p>
              <div className="text-sm space-y-2">
                <p><strong>Step 1:</strong> Calculate room dimensions as multiples of H (mounting height above eye level)</p>
                <p><strong>Step 2:</strong> Determine surface reflectances (ceiling/walls/floor as percentages)</p>
                <p><strong>Step 3:</strong> Find the row matching your room dimensions</p>
                <p><strong>Step 4:</strong> Find the column matching your reflectances</p>
                <p><strong>Step 5:</strong> Compare the value against your UGR limit requirement</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Surface Reflectances</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Surface</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Material/Finish</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Reflectance (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ceiling</td>
                      <td className="border border-white/10 px-3 py-2">White painted plaster</td>
                      <td className="border border-white/10 px-3 py-2">70-80</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ceiling</td>
                      <td className="border border-white/10 px-3 py-2">White suspended tiles</td>
                      <td className="border border-white/10 px-3 py-2">70-85</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Walls</td>
                      <td className="border border-white/10 px-3 py-2">Light colours</td>
                      <td className="border border-white/10 px-3 py-2">50-70</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Walls</td>
                      <td className="border border-white/10 px-3 py-2">Medium colours</td>
                      <td className="border border-white/10 px-3 py-2">30-50</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Floor</td>
                      <td className="border border-white/10 px-3 py-2">Light carpet/vinyl</td>
                      <td className="border border-white/10 px-3 py-2">20-40</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Floor</td>
                      <td className="border border-white/10 px-3 py-2">Dark carpet</td>
                      <td className="border border-white/10 px-3 py-2">10-20</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Glare Control Strategies</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Luminaire selection:</strong> Choose luminaires with appropriate UGR ratings for the application</li>
                <li className="pl-1"><strong>Increase reflectances:</strong> Light-coloured surfaces raise background luminance, reducing UGR</li>
                <li className="pl-1"><strong>Positioning:</strong> Avoid placing luminaires directly in primary viewing directions</li>
                <li className="pl-1"><strong>Mounting height:</strong> Greater height reduces solid angle and apparent luminance</li>
                <li className="pl-1"><strong>Indirect lighting:</strong> Uplighting reduces direct glare but may require higher installed power</li>
                <li className="pl-1"><strong>Task lighting:</strong> Localised lighting allows lower ambient levels</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Design verification:</strong> While UGR tables provide initial guidance, always verify compliance using lighting design software that calculates UGR at multiple observer positions and viewing directions.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Office UGR Assessment</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Assess UGR suitability for a 12m × 8m open-plan office with 2.8m ceiling height.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Given data:</p>
                <p className="ml-4">Room: 12m × 8m × 2.8m</p>
                <p className="ml-4">Desk height: 0.72m, seated eye level: 1.2m</p>
                <p className="ml-4">Reflectances: Ceiling 70%, Walls 50%, Floor 20%</p>
                <p className="ml-4">Luminaire UGR table value (4H:3H, 70/50/20): 18.7</p>
                <p className="mt-2">Calculation:</p>
                <p className="ml-4">H = 2.8 - 1.2 = 1.6m (mounting above eye level)</p>
                <p className="ml-4">X = 12 / 1.6 = 7.5H</p>
                <p className="ml-4">Y = 8 / 1.6 = 5H</p>
                <p className="mt-2">Assessment:</p>
                <p className="ml-4">Room approximates 8H × 4H category</p>
                <p className="ml-4">UGR from table ≈ 18.7</p>
                <p className="ml-4">Office requirement: UGR ≤ 19</p>
                <p className="mt-2 text-green-400">Result: Luminaire suitable for office application</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Shielding Angle Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Calculate the shielding angle for a recessed luminaire.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Given data:</p>
                <p className="ml-4">Recess depth below ceiling: 80mm</p>
                <p className="ml-4">Horizontal distance from lamp edge to aperture: 60mm</p>
                <p className="mt-2">Calculation:</p>
                <p className="ml-4">γ = arctan(60 / 80)</p>
                <p className="ml-4">γ = arctan(0.75)</p>
                <p className="ml-4">γ = 36.9°</p>
                <p className="mt-2">Assessment:</p>
                <p className="ml-4">Shielding angle ≈ 37°</p>
                <p className="ml-4">Suitable for lamps up to 500,000 cd/m² (requires 30°)</p>
                <p className="text-green-400">Adequate for high-luminance LED sources</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Improving UGR Compliance</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> A classroom design shows UGR 21, but the limit is UGR ≤ 19. Identify improvement options.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Current situation:</p>
                <p className="ml-4">Calculated UGR: 21</p>
                <p className="ml-4">Required: ≤ 19</p>
                <p className="ml-4">Gap: 2 UGR points</p>
                <p className="mt-2">Option 1: Change luminaire</p>
                <p className="ml-4">Select micro-prismatic diffuser version</p>
                <p className="ml-4">Typical UGR reduction: 2-4 points</p>
                <p className="mt-2">Option 2: Increase reflectances</p>
                <p className="ml-4">Change walls from 30% to 50% reflectance</p>
                <p className="ml-4">Typical UGR reduction: 1-2 points</p>
                <p className="mt-2">Option 3: Reposition luminaires</p>
                <p className="ml-4">Avoid rows directly facing main viewing direction</p>
                <p className="ml-4">May help 0.5-1 point</p>
                <p className="mt-2">Option 4: Increase mounting height</p>
                <p className="ml-4">Surface mount instead of recessed (+100mm)</p>
                <p className="ml-4">May improve 0.5-1 point</p>
                <p className="mt-2 text-green-400">Recommended: Option 1 (change luminaire) as primary solution</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">UGR Assessment Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Identify the application and determine the UGR limit from BS EN 12464-1</li>
                <li className="pl-1">Measure or estimate room dimensions and calculate in terms of H</li>
                <li className="pl-1">Determine surface reflectances from finishes schedule or defaults</li>
                <li className="pl-1">Review luminaire UGR tables for initial selection</li>
                <li className="pl-1">Model in lighting design software for accurate verification</li>
                <li className="pl-1">Check VDU luminance limits if screens are present</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Technical drawing: <strong>UGR ≤ 16</strong></li>
                <li className="pl-1">Offices, classrooms: <strong>UGR ≤ 19</strong></li>
                <li className="pl-1">Industrial (fine): <strong>UGR ≤ 19</strong></li>
                <li className="pl-1">Retail, industrial (medium): <strong>UGR ≤ 22</strong></li>
                <li className="pl-1">Corridors, warehouses: <strong>UGR ≤ 28</strong></li>
                <li className="pl-1">VDU areas: <strong>3,000 cd/m² at 65°</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Using single UGR value:</strong> Tables show ranges - select appropriate room/reflectance conditions</li>
                <li className="pl-1"><strong>Ignoring viewing direction:</strong> UGR varies with observer position and direction</li>
                <li className="pl-1"><strong>Forgetting VDU criteria:</strong> Screen areas have additional luminance limits beyond UGR</li>
                <li className="pl-1"><strong>Over-relying on louvres:</strong> Excessive shielding reduces efficiency and may cause dark ceilings</li>
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
                <p className="font-medium text-white mb-1">UGR Formula Factors</p>
                <ul className="space-y-0.5">
                  <li>L = Luminaire luminance (cd/m²)</li>
                  <li>Lb = Background luminance (cd/m²)</li>
                  <li>ω = Solid angle of luminaire (sr)</li>
                  <li>p = Position index (Guth)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Glare Control Methods</p>
                <ul className="space-y-0.5">
                  <li>Shielding angles and louvres</li>
                  <li>Micro-prismatic diffusers</li>
                  <li>Higher room reflectances</li>
                  <li>Luminaire positioning</li>
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
            <Link to="../h-n-c-module7-section3-5">
              Next: Daylight Integration
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule7Section3_4;
