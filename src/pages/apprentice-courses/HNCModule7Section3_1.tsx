import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Lighting Fundamentals - HNC Module 7 Section 3.1";
const DESCRIPTION = "Master lighting fundamentals for building services: luminous flux, illuminance, luminance, luminous efficacy, colour temperature (CCT), and colour rendering index (CRI/Ra).";

const quickCheckQuestions = [
  {
    id: "luminous-flux",
    question: "What is the SI unit of luminous flux?",
    options: ["Candela (cd)", "Lux (lx)", "Lumen (lm)", "Watt (W)"],
    correctIndex: 2,
    explanation: "Luminous flux is measured in lumens (lm). It represents the total quantity of visible light emitted by a source in all directions, weighted according to human eye sensitivity."
  },
  {
    id: "illuminance-definition",
    question: "Illuminance is defined as:",
    options: ["Light emitted per unit solid angle", "Luminous flux incident per unit area", "Light reflected from a surface", "Power consumed per lumen output"],
    correctIndex: 1,
    explanation: "Illuminance (E) is the luminous flux incident on a surface per unit area, measured in lux (lx). One lux equals one lumen per square metre (lm/m²)."
  },
  {
    id: "colour-temperature",
    question: "A light source with a correlated colour temperature (CCT) of 2700K would appear:",
    options: ["Cool white/bluish", "Neutral white", "Warm white/yellowish", "Daylight"],
    correctIndex: 2,
    explanation: "Lower colour temperatures (2700-3000K) produce warm white light with a yellowish appearance. Higher temperatures (5000-6500K) produce cool white to daylight appearance."
  },
  {
    id: "cri-meaning",
    question: "A CRI (Ra) value of 95 indicates:",
    options: ["High luminous efficacy", "Poor colour rendering", "Excellent colour rendering", "High colour temperature"],
    correctIndex: 2,
    explanation: "CRI (Colour Rendering Index) ranges from 0-100, with higher values indicating better colour rendering. Ra &gt; 90 is considered excellent, accurately revealing object colours compared to natural light."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which photometric quantity describes the intensity of light in a particular direction?",
    options: [
      "Luminous flux (lm)",
      "Luminous intensity (cd)",
      "Illuminance (lx)",
      "Luminance (cd/m²)"
    ],
    correctAnswer: 1,
    explanation: "Luminous intensity (I) measured in candelas (cd) describes the quantity of light emitted in a specific direction per unit solid angle. One candela equals one lumen per steradian."
  },
  {
    id: 2,
    question: "What is the relationship between illuminance and distance from a point source?",
    options: ["Directly proportional", "Inversely proportional", "Inversely proportional to the square of distance", "No relationship"],
    correctAnswer: 2,
    explanation: "The inverse square law states that illuminance is inversely proportional to the square of the distance from the source: E = I/d². Doubling the distance reduces illuminance to one quarter."
  },
  {
    id: 3,
    question: "An LED luminaire consumes 40W and produces 4,400 lumens. What is its luminous efficacy?",
    options: ["0.009 lm/W", "40 lm/W", "110 lm/W", "4,400 lm/W"],
    correctAnswer: 2,
    explanation: "Luminous efficacy = luminous flux ÷ power = 4,400 lm ÷ 40 W = 110 lm/W. This is typical for modern LED luminaires and significantly higher than traditional incandescent lamps (~15 lm/W)."
  },
  {
    id: 4,
    question: "Luminance differs from illuminance in that luminance:",
    options: [
      "Is measured in lumens",
      "Describes how bright a surface appears to an observer",
      "Only applies to point sources",
      "Is independent of surface reflectance"
    ],
    correctAnswer: 1,
    explanation: "Luminance (cd/m²) describes the brightness of a surface as perceived by an observer. It depends on both the illuminance falling on the surface and the surface's reflective properties."
  },
  {
    id: 5,
    question: "Which colour temperature would be most appropriate for a hospital operating theatre?",
    options: ["2700K (warm white)", "3000K (warm white)", "4000K (neutral white)", "5000K or higher (daylight)"],
    correctAnswer: 3,
    explanation: "Operating theatres require high CCT (5000K+) for accurate tissue colour discrimination during surgery. This daylight-equivalent light ensures surgeons can clearly distinguish between tissue types."
  },
  {
    id: 6,
    question: "The luminous efficacy of a theoretical 'perfect' light source producing only light at 555nm would be:",
    options: ["100 lm/W", "250 lm/W", "683 lm/W", "1000 lm/W"],
    correctAnswer: 2,
    explanation: "The maximum theoretical luminous efficacy is 683 lm/W, achieved at 555nm (green-yellow) where the human eye is most sensitive. Real sources are always lower due to spectral distribution."
  },
  {
    id: 7,
    question: "For retail applications displaying fresh food, which CRI value would be considered acceptable?",
    options: ["Ra &gt; 60", "Ra &gt; 70", "Ra &gt; 80", "Ra &gt; 90"],
    correctAnswer: 3,
    explanation: "Retail food displays typically require Ra &gt; 90 for accurate colour rendering, ensuring meat appears red, vegetables appear vibrant, and customers perceive food as fresh and appetising."
  },
  {
    id: 8,
    question: "What is a steradian?",
    options: [
      "A unit of luminous flux",
      "A unit of solid angle in three-dimensional space",
      "A unit of colour temperature",
      "A type of light source"
    ],
    correctAnswer: 1,
    explanation: "A steradian (sr) is the SI unit of solid angle in 3D space. A sphere contains 4π steradians. Luminous intensity uses steradians: 1 cd = 1 lm/sr."
  },
  {
    id: 9,
    question: "If a surface receives 500 lux of illuminance and has a reflectance of 0.8, what is the exitance?",
    options: ["400 lm/m²", "500 lm/m²", "625 lm/m²", "4000 lm/m²"],
    correctAnswer: 0,
    explanation: "Exitance (M) is the luminous flux leaving a surface per unit area. M = E × ρ = 500 lx × 0.8 = 400 lm/m². The remaining 100 lm/m² is absorbed by the surface."
  },
  {
    id: 10,
    question: "The R9 value in extended CRI metrics specifically measures:",
    options: ["Overall colour rendering", "Red colour rendering", "Green colour rendering", "Skin tone rendering"],
    correctAnswer: 1,
    explanation: "R9 specifically measures the rendering of saturated red colours. Standard Ra averages R1-R8 only. R9 is critical for applications like retail, healthcare, and anywhere red discrimination matters."
  },
  {
    id: 11,
    question: "What luminous efficacy would you expect from a modern T5 fluorescent lamp?",
    options: ["10-20 lm/W", "40-60 lm/W", "90-105 lm/W", "150-200 lm/W"],
    correctAnswer: 2,
    explanation: "Modern T5 fluorescent lamps achieve approximately 90-105 lm/W. This is higher than older T8/T12 tubes but now surpassed by LED technology which can exceed 150 lm/W."
  },
  {
    id: 12,
    question: "In the CIE 1931 chromaticity diagram, the Planckian locus represents:",
    options: [
      "All visible colours",
      "Colours of ideal black body radiators at different temperatures",
      "Saturated spectral colours",
      "Standard illuminant positions"
    ],
    correctAnswer: 1,
    explanation: "The Planckian locus traces the chromaticity coordinates of an ideal black body radiator as its temperature increases. It forms the basis for defining colour temperature of light sources."
  }
];

const faqs = [
  {
    question: "Why do LEDs have both lumen output and efficacy ratings?",
    answer: "Lumen output (lm) tells you the total light produced, while efficacy (lm/W) tells you how efficiently electrical power is converted to light. A 100W LED might produce 15,000 lm at 150 lm/W, while a 50W LED might produce 5,000 lm at 100 lm/W. For energy efficiency comparisons, efficacy is key. For determining if a luminaire provides sufficient light for a space, lumen output matters."
  },
  {
    question: "What is the difference between CCT and CRI, and why do both matter?",
    answer: "CCT (Correlated Colour Temperature) describes the apparent warmth or coolness of the light itself - whether it appears yellowish (2700K) or bluish (6500K). CRI (Colour Rendering Index) describes how accurately the light reveals the colours of objects compared to a reference illuminant. A lamp can have any CCT with any CRI. For example, you might want 3000K warm light (CCT) with Ra &gt; 90 (CRI) for a restaurant to create ambience while ensuring food looks appetising."
  },
  {
    question: "How do I convert between photometric units?",
    answer: "Key relationships: Illuminance (lx) = Luminous flux (lm) ÷ Area (m²). For point sources: E = I/d² where I is luminous intensity (cd) and d is distance (m). Luminous efficacy = Lumens ÷ Watts. Luminance depends on surface reflectance: approximately L = E × ρ/π for diffuse surfaces. For a 1000 lm source illuminating 10m², average E = 100 lux (assuming uniform distribution)."
  },
  {
    question: "Why is Ra limited to R1-R8 and what are extended CRI metrics?",
    answer: "The standard CRI (Ra) averages only eight pastel test colour samples (R1-R8), missing saturated colours. This means two light sources could have the same Ra but render reds, blues, or skin tones very differently. Extended metrics include R9-R15 for saturated colours, and newer metrics like TM-30-18 provide Rf (fidelity) and Rg (gamut) scores with detailed colour vector graphics for comprehensive colour rendering assessment."
  },
  {
    question: "What colour temperature is best for different applications?",
    answer: "Guidelines vary by application: residential/hospitality typically use 2700-3000K for warmth and relaxation; offices often use 4000K neutral white for alertness without appearing clinical; retail depends on merchandise (warm for fashion/furniture, cool for electronics); healthcare uses 4000-5000K in clinical areas, warmer in patient rooms; industrial typically uses 4000-5000K for task visibility. Tuneable white systems allow adjustment throughout the day."
  },
  {
    question: "How does surface reflectance affect lighting design?",
    answer: "Surface reflectance directly impacts how much light bounces back into the space. A room with light-coloured walls (reflectance 0.7-0.8) requires fewer luminaires than one with dark surfaces (reflectance 0.1-0.2) to achieve the same illuminance on the working plane. The room surface reflectance affects utilisation factor calculations - typically ceiling 0.7, walls 0.5, floor 0.2 are used for design. Inter-reflections can add 10-30% to working plane illuminance."
  }
];

const HNCModule7Section3_1 = () => {
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
            <span>Module 7.3.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Lighting Fundamentals
          </h1>
          <p className="text-white/80">
            Photometric quantities, luminous efficacy, colour temperature, and colour rendering for building services lighting design
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Luminous flux (lm):</strong> Total light output from a source</li>
              <li className="pl-1"><strong>Illuminance (lx):</strong> Light falling on a surface (lm/m²)</li>
              <li className="pl-1"><strong>Luminous efficacy (lm/W):</strong> Efficiency of light production</li>
              <li className="pl-1"><strong>CCT (K):</strong> Colour appearance - warm to cool</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Values to Remember</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Max efficacy:</strong> 683 lm/W at 555nm</li>
              <li className="pl-1"><strong>LED efficacy:</strong> 100-200 lm/W typical</li>
              <li className="pl-1"><strong>Warm white:</strong> 2700-3000K</li>
              <li className="pl-1"><strong>Good CRI:</strong> Ra &gt; 80, excellent Ra &gt; 90</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define and calculate luminous flux, intensity, illuminance, and luminance",
              "Apply the inverse square law to point source calculations",
              "Explain luminous efficacy and compare light source efficiencies",
              "Describe correlated colour temperature and its applications",
              "Interpret CRI values and extended colour rendering metrics",
              "Select appropriate CCT and CRI for different building applications"
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

        {/* Section 1: Photometric Quantities */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Photometric Quantities
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Photometry is the science of measuring visible light as perceived by the human eye. Unlike radiometry
              which measures total electromagnetic radiation, photometry weights measurements according to the
              spectral sensitivity of human vision, defined by the CIE photopic luminosity function V(λ).
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The Four Core Photometric Quantities:</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Quantity</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Symbol</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Unit</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Definition</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Luminous flux</td>
                      <td className="border border-white/10 px-3 py-2">Φ (phi)</td>
                      <td className="border border-white/10 px-3 py-2">Lumen (lm)</td>
                      <td className="border border-white/10 px-3 py-2">Total visible light emitted by a source</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Luminous intensity</td>
                      <td className="border border-white/10 px-3 py-2">I</td>
                      <td className="border border-white/10 px-3 py-2">Candela (cd)</td>
                      <td className="border border-white/10 px-3 py-2">Flux per unit solid angle (cd = lm/sr)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Illuminance</td>
                      <td className="border border-white/10 px-3 py-2">E</td>
                      <td className="border border-white/10 px-3 py-2">Lux (lx)</td>
                      <td className="border border-white/10 px-3 py-2">Flux incident per unit area (lx = lm/m²)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Luminance</td>
                      <td className="border border-white/10 px-3 py-2">L</td>
                      <td className="border border-white/10 px-3 py-2">cd/m²</td>
                      <td className="border border-white/10 px-3 py-2">Intensity per unit projected area</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Understanding the Lumen</p>
              <p className="text-sm text-white">
                The lumen is derived from the candela: a source of 1 cd intensity emitting uniformly in all
                directions produces 4π lumens (approximately 12.57 lm). The lumen is weighted by the eye's
                spectral sensitivity - 1 watt of radiant power at 555nm (green-yellow, peak sensitivity)
                equals 683 lumens, while 1 watt at other wavelengths produces fewer perceived lumens.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Illuminance Levels</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Full sunlight:</strong> 100,000 lux</li>
                <li className="pl-1"><strong>Overcast day:</strong> 10,000-20,000 lux</li>
                <li className="pl-1"><strong>Office workspace:</strong> 300-500 lux</li>
                <li className="pl-1"><strong>Corridor/circulation:</strong> 100 lux</li>
                <li className="pl-1"><strong>Emergency lighting:</strong> 1 lux minimum on escape routes</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key distinction:</strong> Illuminance measures light arriving at a surface; luminance
              measures light leaving a surface (either emitted or reflected) and represents what we actually perceive as brightness.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Inverse Square Law and Calculations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Inverse Square Law and Illuminance Calculations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The inverse square law is fundamental to understanding how light diminishes with distance.
              For a point source, illuminance decreases proportionally to the square of the distance from
              the source, as light spreads over an increasingly larger area.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Inverse Square Law</p>
                <p className="text-lg font-mono text-white mb-2">E = I / d²</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">E = illuminance (lux)</li>
                  <li className="pl-1">I = luminous intensity (candela)</li>
                  <li className="pl-1">d = distance from source (metres)</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cosine Law (Oblique Incidence)</p>
                <p className="text-lg font-mono text-white mb-2">E = (I × cos θ) / d²</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">θ = angle of incidence</li>
                  <li className="pl-1">Accounts for non-perpendicular light</li>
                  <li className="pl-1">Maximum E when θ = 0°</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Distance Effects on Illuminance</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Distance</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Relative Illuminance</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Example (1000 cd source)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1 m</td>
                      <td className="border border-white/10 px-3 py-2">100%</td>
                      <td className="border border-white/10 px-3 py-2">1000 lux</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2 m</td>
                      <td className="border border-white/10 px-3 py-2">25%</td>
                      <td className="border border-white/10 px-3 py-2">250 lux</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3 m</td>
                      <td className="border border-white/10 px-3 py-2">11%</td>
                      <td className="border border-white/10 px-3 py-2">111 lux</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4 m</td>
                      <td className="border border-white/10 px-3 py-2">6.25%</td>
                      <td className="border border-white/10 px-3 py-2">62.5 lux</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Practical Application</p>
              <p className="text-sm text-white">
                The inverse square law applies strictly to point sources. For linear sources (fluorescent tubes),
                illuminance decreases linearly with distance when close, transitioning to inverse square behaviour
                at distances greater than approximately five times the source length. For large area sources,
                illuminance remains relatively constant until distance exceeds the source dimensions.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design implication:</strong> Mounting height significantly impacts illuminance and uniformity.
              Higher mounting spreads light more evenly but reduces peak illuminance, requiring more luminaires.
            </p>
          </div>
        </section>

        {/* Section 3: Luminous Efficacy */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Luminous Efficacy
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Luminous efficacy (η) measures how efficiently a light source converts electrical power into
              visible light. Expressed in lumens per watt (lm/W), it is the key metric for comparing the
              energy efficiency of different lamp technologies and is fundamental to sustainable lighting design.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Luminous Efficacy Formula</p>
              <p className="text-lg font-mono text-white mb-2">η = Φ / P</p>
              <p className="text-sm text-white">
                Where Φ = luminous flux (lumens) and P = input power (watts). The theoretical maximum for
                monochromatic light at 555nm is 683 lm/W. White light sources achieve lower values because
                they emit across the visible spectrum, including wavelengths where the eye is less sensitive.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Efficacy Comparison by Lamp Type</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Lamp Technology</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Efficacy (lm/W)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Life (hours)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Incandescent (phased out)</td>
                      <td className="border border-white/10 px-3 py-2">10-17</td>
                      <td className="border border-white/10 px-3 py-2">1,000</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Halogen</td>
                      <td className="border border-white/10 px-3 py-2">15-25</td>
                      <td className="border border-white/10 px-3 py-2">2,000-4,000</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Compact fluorescent (CFL)</td>
                      <td className="border border-white/10 px-3 py-2">50-70</td>
                      <td className="border border-white/10 px-3 py-2">8,000-15,000</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">T5 fluorescent</td>
                      <td className="border border-white/10 px-3 py-2">90-105</td>
                      <td className="border border-white/10 px-3 py-2">20,000-30,000</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LED (current)</td>
                      <td className="border border-white/10 px-3 py-2">100-200</td>
                      <td className="border border-white/10 px-3 py-2">50,000-100,000</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">High-pressure sodium</td>
                      <td className="border border-white/10 px-3 py-2">80-140</td>
                      <td className="border border-white/10 px-3 py-2">16,000-24,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Luminaire Efficacy vs Lamp Efficacy</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Lamp efficacy:</strong> Light output from bare lamp</li>
                  <li className="pl-1"><strong>Luminaire efficacy:</strong> Light from complete fitting</li>
                  <li className="pl-1">Includes optical losses (reflector, diffuser)</li>
                  <li className="pl-1">Includes driver/ballast losses</li>
                  <li className="pl-1">LOR (Light Output Ratio) = Φluminaire / Φlamp</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Factors Affecting Efficacy</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Operating temperature:</strong> LEDs lose efficacy when hot</li>
                  <li className="pl-1"><strong>Dimming:</strong> Can improve or reduce efficacy</li>
                  <li className="pl-1"><strong>Driver efficiency:</strong> Typically 85-95%</li>
                  <li className="pl-1"><strong>Lumen depreciation:</strong> Reduces over lifetime</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Energy perspective:</strong> Replacing 60W incandescent lamps (900 lm) with 8W LEDs
              (900 lm) achieves 87% energy reduction while maintaining the same light output.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Colour Temperature and Colour Rendering */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Colour Temperature and Colour Rendering
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The colour appearance of light and its ability to accurately reveal object colours are critical
              considerations in lighting design. Correlated Colour Temperature (CCT) describes the apparent
              warmth or coolness of light, while the Colour Rendering Index (CRI) measures how faithfully
              colours are reproduced compared to a reference illuminant.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Correlated Colour Temperature (CCT)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">CCT Range</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Applications</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2700-3000K</td>
                      <td className="border border-white/10 px-3 py-2">Warm white (yellowish)</td>
                      <td className="border border-white/10 px-3 py-2">Residential, hospitality, restaurants</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3500-4000K</td>
                      <td className="border border-white/10 px-3 py-2">Neutral white</td>
                      <td className="border border-white/10 px-3 py-2">Offices, retail, commercial</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5000-5700K</td>
                      <td className="border border-white/10 px-3 py-2">Daylight</td>
                      <td className="border border-white/10 px-3 py-2">Industrial, healthcare, task lighting</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">6500K+</td>
                      <td className="border border-white/10 px-3 py-2">Cool daylight (bluish)</td>
                      <td className="border border-white/10 px-3 py-2">Photography, inspection, display</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Understanding CCT</p>
              <p className="text-sm text-white">
                CCT is expressed in Kelvin (K) and relates to the temperature of an ideal black body radiator
                that would produce light of similar colour. Counter-intuitively, lower temperatures appear
                warmer (more yellow/orange) while higher temperatures appear cooler (more blue). This matches
                heated metal: red-hot is cooler than white-hot. The term "correlated" acknowledges that most
                light sources don't exactly match black body radiation but approximate its colour appearance.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Colour Rendering Index (CRI/Ra)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Definition:</strong> Measure of colour fidelity compared to reference illuminant</li>
                <li className="pl-1"><strong>Scale:</strong> 0-100, where 100 is perfect rendering</li>
                <li className="pl-1"><strong>Ra (average):</strong> Mean of R1-R8 test colour samples</li>
                <li className="pl-1"><strong>Reference:</strong> Incandescent below 5000K; daylight above 5000K</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">CRI Requirements by Application</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">CRI Range</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Quality</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Suitable Applications</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ra &gt; 90</td>
                      <td className="border border-white/10 px-3 py-2">Excellent</td>
                      <td className="border border-white/10 px-3 py-2">Retail, galleries, healthcare, food display</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ra 80-90</td>
                      <td className="border border-white/10 px-3 py-2">Good</td>
                      <td className="border border-white/10 px-3 py-2">Offices, education, general commercial</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ra 60-80</td>
                      <td className="border border-white/10 px-3 py-2">Moderate</td>
                      <td className="border border-white/10 px-3 py-2">Industrial, warehouses, car parks</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ra &lt; 60</td>
                      <td className="border border-white/10 px-3 py-2">Poor</td>
                      <td className="border border-white/10 px-3 py-2">Security lighting only (HPS)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Extended CRI Values (R9-R15)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>R9:</strong> Saturated red - critical for retail/healthcare</li>
                  <li className="pl-1"><strong>R13:</strong> Skin tone (Caucasian reference)</li>
                  <li className="pl-1"><strong>R15:</strong> Skin tone (Asian reference)</li>
                  <li className="pl-1">Standard Ra ignores saturated colours</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">TM-30-18 (Modern Alternative)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Rf:</strong> Fidelity index (like CRI, 0-100)</li>
                  <li className="pl-1"><strong>Rg:</strong> Gamut index (saturation, 60-140)</li>
                  <li className="pl-1">Uses 99 colour samples</li>
                  <li className="pl-1">Colour vector graphics show shifts</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Design consideration:</strong> CCT and CRI are independent. A 3000K lamp can have poor
              or excellent CRI. Always specify both parameters when colour quality matters.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Illuminance Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Problem:</strong> A spotlight has a luminous intensity of 2500 cd in the downward direction.
                Calculate the illuminance on a horizontal surface directly below at distances of 2m and 4m.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Using E = I / d²</p>
                <p className="mt-2">At 2m distance:</p>
                <p className="ml-4">E = 2500 / 2² = 2500 / 4 = 625 lux</p>
                <p className="mt-2">At 4m distance:</p>
                <p className="ml-4">E = 2500 / 4² = 2500 / 16 = 156.25 lux</p>
                <p className="mt-2 text-green-400">Note: Doubling distance reduces illuminance to 1/4</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Luminous Efficacy Comparison</h3>
              <p className="text-sm text-white mb-2">
                <strong>Problem:</strong> Compare the energy consumption of lighting a space with 60W incandescent
                lamps versus LED equivalents, both producing 800 lumens.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Incandescent: η = 800 lm / 60 W = 13.3 lm/W</p>
                <p>LED (modern): η = 800 lm / 8 W = 100 lm/W</p>
                <p className="mt-2">Power saving per lamp: 60 - 8 = 52 W</p>
                <p>Percentage saving: (52/60) × 100 = 86.7%</p>
                <p className="mt-2">For 100 lamps operating 3000 hours/year:</p>
                <p className="ml-4">Incandescent: 100 × 60W × 3000h = 18,000 kWh</p>
                <p className="ml-4">LED: 100 × 8W × 3000h = 2,400 kWh</p>
                <p className="ml-4 text-green-400">Annual saving: 15,600 kWh</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: CCT and CRI Selection</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Specify CCT and CRI for a supermarket with different zones.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Zone requirements:</p>
                <p className="mt-2">Fresh meat/fish counter:</p>
                <p className="ml-4">CCT: 3000K (enhances warm colours)</p>
                <p className="ml-4">CRI: Ra &gt; 90, R9 &gt; 50 (accurate red rendering)</p>
                <p className="mt-2">Bakery section:</p>
                <p className="ml-4">CCT: 2700-3000K (warm, inviting)</p>
                <p className="ml-4">CRI: Ra &gt; 90 (enhance golden tones)</p>
                <p className="mt-2">General aisles:</p>
                <p className="ml-4">CCT: 4000K (neutral, good visibility)</p>
                <p className="ml-4">CRI: Ra &gt; 80 (acceptable general rendering)</p>
                <p className="mt-2">Fresh produce:</p>
                <p className="ml-4">CCT: 4000-5000K (enhance greens)</p>
                <p className="ml-4 text-green-400">CRI: Ra &gt; 90 (vibrant vegetable colours)</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Formulae Summary</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Illuminance:</strong> E = Φ / A (lux = lm/m²)</li>
                <li className="pl-1"><strong>Inverse square law:</strong> E = I / d² (point sources)</li>
                <li className="pl-1"><strong>Luminous efficacy:</strong> η = Φ / P (lm/W)</li>
                <li className="pl-1"><strong>Exitance:</strong> M = E × ρ (reflected flux density)</li>
                <li className="pl-1"><strong>Solid angle:</strong> Total sphere = 4π steradians</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Maximum theoretical efficacy: <strong>683 lm/W</strong> at 555nm</li>
                <li className="pl-1">Modern LED efficacy: <strong>100-200 lm/W</strong></li>
                <li className="pl-1">Warm white CCT: <strong>2700-3000K</strong></li>
                <li className="pl-1">Neutral white CCT: <strong>4000K</strong></li>
                <li className="pl-1">Good colour rendering: <strong>Ra &gt; 80</strong></li>
                <li className="pl-1">Excellent colour rendering: <strong>Ra &gt; 90</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Confusing illuminance and luminance:</strong> Illuminance is incident light; luminance is perceived brightness</li>
                <li className="pl-1"><strong>Ignoring CCT psychology:</strong> Warm light feels comfortable but cool light promotes alertness</li>
                <li className="pl-1"><strong>Specifying CRI without R9:</strong> Standard Ra misses saturated red performance</li>
                <li className="pl-1"><strong>Comparing lamp vs luminaire efficacy:</strong> Always compare like with like</li>
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
                <p className="font-medium text-white mb-1">Photometric Quantities</p>
                <ul className="space-y-0.5">
                  <li>Luminous flux (Φ) - lumen (lm)</li>
                  <li>Luminous intensity (I) - candela (cd)</li>
                  <li>Illuminance (E) - lux (lx = lm/m²)</li>
                  <li>Luminance (L) - cd/m²</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">CCT Guidelines</p>
                <ul className="space-y-0.5">
                  <li>Warm white: 2700-3000K</li>
                  <li>Neutral white: 3500-4000K</li>
                  <li>Cool white/daylight: 5000K+</li>
                  <li>CRI: Ra &gt; 80 good, &gt; 90 excellent</li>
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
            <Link to="../h-n-c-module7-section3-2">
              Next: Lamp Types and Characteristics
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule7Section3_1;
