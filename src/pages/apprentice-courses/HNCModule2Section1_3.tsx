import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Radiation Heat Transfer - HNC Module 2 Section 1.3";
const DESCRIPTION = "Master thermal radiation fundamentals for building services: Stefan-Boltzmann law, emissivity, black body radiation, view factors, and practical applications in radiant heating and low-e glazing.";

const quickCheckQuestions = [
  {
    id: "stefan-boltzmann",
    question: "In the Stefan-Boltzmann equation Q = εσAT⁴, what does the symbol σ represent?",
    options: ["Emissivity", "Surface area", "Stefan-Boltzmann constant", "Absorptivity"],
    correctIndex: 2,
    explanation: "σ (sigma) is the Stefan-Boltzmann constant with a value of 5.67 × 10⁻⁸ W/m²K⁴. It is a fundamental physical constant that relates radiated power to temperature."
  },
  {
    id: "black-body",
    question: "What is the emissivity of a perfect black body?",
    options: ["0", "0.5", "0.9", "1.0"],
    correctIndex: 3,
    explanation: "A perfect black body has an emissivity of 1.0, meaning it absorbs and emits the maximum possible radiation at any given temperature. Real surfaces always have emissivity less than 1."
  },
  {
    id: "low-e-glazing",
    question: "What is the typical emissivity of low-e coated glazing?",
    options: ["0.84", "0.50", "0.20", "0.05"],
    correctIndex: 3,
    explanation: "Low-e (low emissivity) coatings typically have emissivity values around 0.05-0.10, compared to 0.84 for standard glass. This dramatically reduces radiant heat loss through windows."
  },
  {
    id: "view-factor",
    question: "What is the sum of all view factors from any surface in an enclosure?",
    options: ["0", "0.5", "1.0", "Variable"],
    correctIndex: 2,
    explanation: "The sum of all view factors from any surface must equal 1.0 (summation rule). This ensures all radiation leaving a surface is accounted for - it must go somewhere within the enclosure."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is thermal radiation?",
    options: [
      "Heat transfer through direct contact",
      "Heat transfer through fluid movement",
      "Heat transfer through electromagnetic waves",
      "Heat transfer through phase change"
    ],
    correctAnswer: 2,
    explanation: "Thermal radiation is the transfer of heat energy through electromagnetic waves (primarily infrared). Unlike conduction and convection, radiation requires no medium and can occur through a vacuum."
  },
  {
    id: 2,
    question: "A surface at 300K radiates 459 W/m². What power would it radiate at 600K?",
    options: ["918 W/m²", "1836 W/m²", "3672 W/m²", "7344 W/m²"],
    correctAnswer: 3,
    explanation: "Using Stefan-Boltzmann law, Q ∝ T⁴. Doubling the absolute temperature (600K/300K = 2) increases radiation by 2⁴ = 16 times. 459 × 16 = 7344 W/m²."
  },
  {
    id: 3,
    question: "Which surface would absorb the most solar radiation?",
    options: [
      "Polished aluminium (α = 0.10)",
      "White paint (α = 0.25)",
      "Red brick (α = 0.65)",
      "Black paint (α = 0.95)"
    ],
    correctAnswer: 3,
    explanation: "Absorptivity (α) determines the fraction of incident radiation absorbed. Black paint with α = 0.95 absorbs 95% of incident solar radiation, making it the most absorbing surface listed."
  },
  {
    id: 4,
    question: "For an opaque surface in thermal equilibrium, what is the relationship between absorptivity (α) and emissivity (ε)?",
    options: [
      "α + ε = 1",
      "α = ε (Kirchhoff's Law)",
      "α × ε = 1",
      "α = 1 - ε"
    ],
    correctAnswer: 1,
    explanation: "Kirchhoff's Law states that for an opaque surface in thermal equilibrium, absorptivity equals emissivity (α = ε) at the same wavelength and temperature. This fundamental relationship is essential for radiation calculations."
  },
  {
    id: 5,
    question: "A radiant ceiling panel operates at 40°C (313K) in a room at 20°C (293K). The ceiling area is 10m² with ε = 0.95. What is the net radiant heat output?",
    options: ["520W", "680W", "850W", "1100W"],
    correctAnswer: 1,
    explanation: "Net radiation Q = εσA(T₁⁴ - T₂⁴) = 0.95 × 5.67×10⁻⁸ × 10 × (313⁴ - 293⁴) = 0.95 × 5.67×10⁻⁸ × 10 × (9.60×10⁹ - 7.37×10⁹) = 680W"
  },
  {
    id: 6,
    question: "What is the view factor F₁₂ for two parallel, infinite plates facing each other?",
    options: ["0", "0.5", "1.0", "Depends on distance"],
    correctAnswer: 2,
    explanation: "For two infinite parallel plates facing each other, F₁₂ = 1.0. All radiation leaving surface 1 must reach surface 2 since the plates extend infinitely in all directions."
  },
  {
    id: 7,
    question: "Why do radiant heating panels provide better thermal comfort than convective heating?",
    options: [
      "They heat air more quickly",
      "They directly warm occupants and surfaces, not air",
      "They use less energy overall",
      "They eliminate draughts completely"
    ],
    correctAnswer: 1,
    explanation: "Radiant panels directly warm occupants and building surfaces through radiation, providing thermal comfort at lower air temperatures. This 'radiant temperature' effect allows comfort with 2-3°C lower air temperatures."
  },
  {
    id: 8,
    question: "A double-glazed window has standard glass (ε = 0.84) facing a cavity. Replacing one pane with low-e glass (ε = 0.05) reduces radiative heat transfer by approximately:",
    options: ["50%", "70%", "85%", "94%"],
    correctAnswer: 3,
    explanation: "Radiative transfer between parallel surfaces depends on effective emissivity. Standard cavity: εeff ≈ 0.72. With low-e: εeff ≈ 0.05. Reduction = (0.72-0.05)/0.72 = 93% reduction."
  },
  {
    id: 9,
    question: "What is the dominant wavelength range for thermal radiation from building surfaces at typical temperatures (20-40°C)?",
    options: [
      "Ultraviolet (0.1-0.4 μm)",
      "Visible light (0.4-0.7 μm)",
      "Near infrared (0.7-3 μm)",
      "Far infrared (3-100 μm)"
    ],
    correctAnswer: 3,
    explanation: "According to Wien's displacement law, the peak wavelength for radiation at 20-40°C (293-313K) is approximately 10 μm, which falls in the far infrared range. This is why thermal cameras operate in this wavelength band."
  },
  {
    id: 10,
    question: "Which factor does NOT affect radiative heat exchange between two surfaces?",
    options: [
      "Temperature difference",
      "Surface emissivities",
      "View factor between surfaces",
      "Thermal conductivity of surfaces"
    ],
    correctAnswer: 3,
    explanation: "Thermal conductivity affects conduction heat transfer, not radiation. Radiative exchange depends on temperatures (T⁴), emissivities, view factors, and surface areas - but not on how well the surfaces conduct heat internally."
  }
];

const faqs = [
  {
    question: "Why does radiative heat transfer depend on T⁴ rather than temperature difference?",
    answer: "The Stefan-Boltzmann law (Q = εσAT⁴) arises from quantum mechanics - the energy distribution of photons emitted by a hot body. This T⁴ relationship means radiation becomes increasingly dominant at higher temperatures. At room temperature, radiation and convection are comparable, but at furnace temperatures, radiation dominates completely."
  },
  {
    question: "What's the difference between emissivity and absorptivity?",
    answer: "Emissivity (ε) describes how well a surface emits radiation compared to a black body. Absorptivity (α) describes how much incident radiation a surface absorbs. Kirchhoff's Law states these are equal (α = ε) at the same wavelength and temperature. However, solar absorptivity may differ from room-temperature emissivity because they occur at different wavelengths."
  },
  {
    question: "How do selective surfaces work in solar thermal systems?",
    answer: "Selective surfaces have high absorptivity for solar wavelengths (short wave, ~0.5μm) but low emissivity for thermal radiation (long wave, ~10μm). This allows them to absorb solar energy efficiently whilst minimising radiative heat loss. Black chrome and black nickel coatings achieve solar absorptivity >0.95 with thermal emissivity <0.15."
  },
  {
    question: "Why is low-e glass effective for reducing heat loss?",
    answer: "Standard glass has high emissivity (0.84), meaning it radiates heat effectively across a window cavity. Low-e coatings (typically metallic oxide films) reduce emissivity to 0.05-0.10, cutting radiative transfer by up to 90%. The coating is placed on surface 2 or 3 (cavity-facing) to minimise heat transfer whilst allowing visible light through."
  },
  {
    question: "When should radiant heating be considered instead of convective heating?",
    answer: "Radiant heating is preferred for high-ceiling spaces (warehouses, churches), intermittently occupied buildings, areas with high ventilation rates, and where thermal comfort is needed with lower air temperatures. It provides instant warmth without heating the air mass, ideal for spot heating or where air stratification would cause issues."
  },
  {
    question: "How do view factors affect heating system design?",
    answer: "View factors (F₁₂) determine how much radiation from surface 1 reaches surface 2. A radiant panel with low view factor to occupants is ineffective regardless of its temperature. Panels should be positioned to maximise view factors to occupied areas - typically high on walls or ceilings angled towards occupants, not parallel to walls where radiation escapes through windows."
  }
];

const HNCModule2Section1_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2-section1">
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
            <span>Module 2.1.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Radiation Heat Transfer
          </h1>
          <p className="text-white/80">
            Electromagnetic heat transfer: from Stefan-Boltzmann law to radiant heating panels and low-e glazing
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Radiation:</strong> Heat transfer via electromagnetic waves (no medium required)</li>
              <li className="pl-1"><strong>Stefan-Boltzmann:</strong> Q = εσAT⁴ (power ∝ temperature to fourth power)</li>
              <li className="pl-1"><strong>Emissivity (ε):</strong> 0-1, how well a surface radiates (black body = 1)</li>
              <li className="pl-1"><strong>View factor:</strong> Fraction of radiation leaving one surface reaching another</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Radiant panels:</strong> Direct heating of occupants and surfaces</li>
              <li className="pl-1"><strong>Low-e glazing:</strong> ε = 0.05 vs standard glass ε = 0.84</li>
              <li className="pl-1"><strong>Mean radiant temp:</strong> Key factor in thermal comfort</li>
              <li className="pl-1"><strong>Solar gains:</strong> Absorptivity determines heat gain through fabric</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply the Stefan-Boltzmann law for radiant heat transfer calculations",
              "Understand emissivity, absorptivity and Kirchhoff's Law",
              "Explain black body radiation and real surface behaviour",
              "Calculate view factors for common geometries",
              "Analyse radiative exchange between building surfaces",
              "Apply radiation principles to radiant heating and low-e glazing design"
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

        {/* Section 1: Stefan-Boltzmann Law */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Stefan-Boltzmann Law and Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Thermal radiation is the transfer of heat through electromagnetic waves, predominantly in the
              infrared spectrum. Unlike conduction and convection, radiation requires no medium and can
              transfer heat through a vacuum - this is how the Sun heats the Earth.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Stefan-Boltzmann Law</p>
              <p className="font-mono text-center text-lg mb-2">Q = εσAT⁴</p>
              <div className="text-xs text-white/70 space-y-1">
                <p><strong>Q</strong> = Radiant power emitted (W)</p>
                <p><strong>ε</strong> = Emissivity (0 to 1, dimensionless)</p>
                <p><strong>σ</strong> = Stefan-Boltzmann constant = 5.67 × 10⁻⁸ W/m²K⁴</p>
                <p><strong>A</strong> = Surface area (m²)</p>
                <p><strong>T</strong> = Absolute temperature (K)</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key principles:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">All objects above absolute zero emit thermal radiation</li>
                <li className="pl-1">Radiation power increases with T⁴ (doubling temperature increases radiation 16-fold)</li>
                <li className="pl-1">Net heat transfer occurs from hot surfaces to cold surfaces</li>
                <li className="pl-1">Temperature must always be in Kelvin (K = °C + 273)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Net Radiation Between Two Surfaces</p>
              <p className="font-mono text-center text-base mb-2">Q<sub>net</sub> = εσA(T₁⁴ - T₂⁴)</p>
              <p className="text-sm text-white/70 text-center">
                Net heat transfer from surface 1 (hot) to surface 2 (cold)
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Critical insight:</strong> The T⁴ relationship makes radiation dominant at high temperatures.
              At furnace temperatures (1000°C+), radiation accounts for over 90% of heat transfer.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Emissivity and Absorptivity */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Emissivity, Absorptivity and Surface Properties
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Real surfaces emit and absorb radiation less efficiently than a perfect black body.
              Emissivity (ε) and absorptivity (α) quantify these properties and are crucial for
              accurate heat transfer calculations.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Emissivity (ε)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Ratio of actual emission to black body emission</li>
                  <li className="pl-1">Range: 0 (perfect reflector) to 1 (black body)</li>
                  <li className="pl-1">Depends on surface finish, material, wavelength</li>
                  <li className="pl-1">Low-e coatings: ε = 0.05-0.10</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Absorptivity (α)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Fraction of incident radiation absorbed</li>
                  <li className="pl-1">α + ρ + τ = 1 (absorbed + reflected + transmitted)</li>
                  <li className="pl-1">For opaque surfaces: α + ρ = 1</li>
                  <li className="pl-1">Dark surfaces: high α; shiny surfaces: low α</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Kirchhoff's Law</p>
              <p className="font-mono text-center text-lg mb-2">α = ε</p>
              <p className="text-sm text-white/70 text-center">
                At thermal equilibrium, absorptivity equals emissivity at the same wavelength and temperature
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Emissivity Values</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Surface</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Emissivity (ε)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Black body (ideal)</td>
                      <td className="border border-white/10 px-3 py-2">1.00</td>
                      <td className="border border-white/10 px-3 py-2">Theoretical reference</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Matt black paint</td>
                      <td className="border border-white/10 px-3 py-2">0.95</td>
                      <td className="border border-white/10 px-3 py-2">Radiant panel finish</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Brick, concrete, plaster</td>
                      <td className="border border-white/10 px-3 py-2">0.90-0.95</td>
                      <td className="border border-white/10 px-3 py-2">Building surfaces</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Standard glass</td>
                      <td className="border border-white/10 px-3 py-2">0.84</td>
                      <td className="border border-white/10 px-3 py-2">Windows (uncoated)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">White paint</td>
                      <td className="border border-white/10 px-3 py-2">0.90</td>
                      <td className="border border-white/10 px-3 py-2">Interior surfaces</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Oxidised steel</td>
                      <td className="border border-white/10 px-3 py-2">0.80</td>
                      <td className="border border-white/10 px-3 py-2">Exposed steelwork</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Low-e coated glass</td>
                      <td className="border border-white/10 px-3 py-2">0.05-0.10</td>
                      <td className="border border-white/10 px-3 py-2">Energy-efficient glazing</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Polished aluminium</td>
                      <td className="border border-white/10 px-3 py-2">0.05</td>
                      <td className="border border-white/10 px-3 py-2">Reflective insulation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design note:</strong> Colour affects solar absorptivity (short wavelength) but has little effect on
              thermal emissivity (long wavelength). A white roof and black roof have similar ε (~0.90) but very different solar absorptivity.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Black Body Radiation and View Factors */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Black Body Radiation and View Factors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A black body is a theoretical surface that absorbs all incident radiation and emits
              the maximum possible radiation at any temperature. Real surfaces are compared to this
              ideal through emissivity. View factors determine how radiation is distributed between surfaces.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Black body characteristics:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Perfect absorber: α = 1 (absorbs all wavelengths)</li>
                <li className="pl-1">Perfect emitter: ε = 1 (emits maximum possible radiation)</li>
                <li className="pl-1">Emission depends only on temperature, not material properties</li>
                <li className="pl-1">Black body radiation spectrum follows Planck's Law</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Wien's Displacement Law</p>
              <p className="font-mono text-center text-lg mb-2">λ<sub>max</sub> = 2898 / T</p>
              <p className="text-sm text-white/70 text-center">
                Peak wavelength (μm) is inversely proportional to temperature (K)
              </p>
              <div className="mt-3 text-xs text-white/60">
                <p>Sun (5800K): λmax ≈ 0.5 μm (visible light)</p>
                <p>Room surfaces (300K): λmax ≈ 10 μm (far infrared)</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">View Factors (Configuration Factors)</p>
              <p className="text-sm text-white mb-3">
                The view factor F₁₂ is the fraction of radiation leaving surface 1 that reaches surface 2.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Summation rule:</strong> ΣF₁ⱼ = 1 (all radiation must go somewhere)</li>
                <li className="pl-1"><strong>Reciprocity:</strong> A₁F₁₂ = A₂F₂₁ (geometric relationship)</li>
                <li className="pl-1"><strong>Self-viewing:</strong> Flat/convex surfaces have F₁₁ = 0</li>
                <li className="pl-1"><strong>Enclosure:</strong> Concave surfaces may have F₁₁ &gt; 0</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common View Factor Values</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Configuration</th>
                      <th className="border border-white/10 px-3 py-2 text-left">View Factor F₁₂</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Parallel infinite plates</td>
                      <td className="border border-white/10 px-3 py-2">1.0</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Small surface in large enclosure</td>
                      <td className="border border-white/10 px-3 py-2">1.0</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Perpendicular rectangles (shared edge)</td>
                      <td className="border border-white/10 px-3 py-2">0.2-0.4 (geometry dependent)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Parallel equal squares (spacing = side)</td>
                      <td className="border border-white/10 px-3 py-2">≈ 0.2</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ceiling panel to floor (typical room)</td>
                      <td className="border border-white/10 px-3 py-2">0.3-0.6</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical tip:</strong> View factors can be found in charts and tables in CIBSE guides or
              calculated using software. For complex geometries, numerical methods are typically used.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 4: Building Services Applications */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Building Services Applications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Radiation heat transfer principles are applied throughout building services engineering,
              from radiant heating system design to window specification and thermal comfort assessment.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Radiant Heating Panels</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">High-temperature panels (150-400°C): Gas-fired, industrial applications</li>
                <li className="pl-1">Medium-temperature panels (40-100°C): Hot water or electric ceiling panels</li>
                <li className="pl-1">Low-temperature panels (30-40°C): Underfloor heating, radiant ceilings</li>
                <li className="pl-1">Direct radiant heating warms occupants without heating air mass</li>
                <li className="pl-1">Allows 2-3°C lower air temperature for same comfort level</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Low-Emissivity Glazing</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Metallic oxide coating (silver, tin oxide) applied to glass surface</li>
                <li className="pl-1">Reduces emissivity from 0.84 to 0.05-0.10</li>
                <li className="pl-1">Cuts radiative heat transfer across cavity by up to 90%</li>
                <li className="pl-1">Coating position: Surface 2 or 3 (cavity-facing) for optimal performance</li>
                <li className="pl-1">"Hard coat" (pyrolytic): durable, ε ≈ 0.15-0.20</li>
                <li className="pl-1">"Soft coat" (sputtered): better performance, ε ≈ 0.05, less durable</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Mean Radiant Temperature (MRT)</p>
              <p className="text-sm text-white mb-2">
                MRT is the uniform temperature of an imaginary black enclosure that would exchange the same
                radiant heat as the actual non-uniform environment. It is critical for thermal comfort.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Operative temperature ≈ (MRT + T<sub>air</sub>) / 2</p>
                <p className="text-white/60 text-xs mt-1">(simplified for low air velocities)</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Radiative Heat Loss Through Windows</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Glazing Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">U-value (W/m²K)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Radiant Component</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Single glazing</td>
                      <td className="border border-white/10 px-3 py-2">5.4</td>
                      <td className="border border-white/10 px-3 py-2">Minimal cavity effect</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Double glazing (air)</td>
                      <td className="border border-white/10 px-3 py-2">2.8</td>
                      <td className="border border-white/10 px-3 py-2">~60% radiative in cavity</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Double glazing (argon)</td>
                      <td className="border border-white/10 px-3 py-2">2.6</td>
                      <td className="border border-white/10 px-3 py-2">~60% radiative in cavity</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Double + low-e (argon)</td>
                      <td className="border border-white/10 px-3 py-2">1.2</td>
                      <td className="border border-white/10 px-3 py-2">~10% radiative in cavity</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Triple + low-e (argon)</td>
                      <td className="border border-white/10 px-3 py-2">0.8</td>
                      <td className="border border-white/10 px-3 py-2">Minimal radiation losses</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Surface temperature considerations:</strong> Cold internal surfaces (below 14°C) cause radiant
              asymmetry discomfort and risk condensation. Well-insulated construction with low-e glazing
              maintains higher internal surface temperatures.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Radiant Panel Output</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A radiant ceiling panel (2m × 1m) operates at 60°C in a room at 20°C.
                The panel has ε = 0.95. Calculate the net radiant heat output.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Convert to Kelvin:</p>
                <p>T₁ = 60 + 273 = 333K</p>
                <p>T₂ = 20 + 273 = 293K</p>
                <p className="mt-2">Area: A = 2 × 1 = 2m²</p>
                <p className="mt-2">Net radiation: Q = εσA(T₁⁴ - T₂⁴)</p>
                <p>Q = 0.95 × 5.67×10⁻⁸ × 2 × (333⁴ - 293⁴)</p>
                <p>Q = 0.95 × 5.67×10⁻⁸ × 2 × (1.23×10¹⁰ - 7.37×10⁹)</p>
                <p>Q = 0.95 × 5.67×10⁻⁸ × 2 × 4.93×10⁹</p>
                <p>Q = <strong>531W</strong></p>
                <p className="mt-2 text-white/60">Panel output: 266 W/m²</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Low-E Glazing Benefit</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Calculate the effective emissivity for radiative exchange across a
                16mm cavity with: (a) standard glass both sides (ε = 0.84), (b) one low-e surface (ε = 0.05).
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>For two parallel surfaces, effective emissivity:</p>
                <p>ε<sub>eff</sub> = 1 / (1/ε₁ + 1/ε₂ - 1)</p>
                <p className="mt-2">(a) Standard glass both sides:</p>
                <p>ε<sub>eff</sub> = 1 / (1/0.84 + 1/0.84 - 1)</p>
                <p>ε<sub>eff</sub> = 1 / (1.19 + 1.19 - 1) = 1 / 1.38 = <strong>0.72</strong></p>
                <p className="mt-2">(b) One low-e surface:</p>
                <p>ε<sub>eff</sub> = 1 / (1/0.84 + 1/0.05 - 1)</p>
                <p>ε<sub>eff</sub> = 1 / (1.19 + 20 - 1) = 1 / 20.19 = <strong>0.05</strong></p>
                <p className="mt-2 text-green-400">✓ 93% reduction in radiative heat transfer</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Solar Absorptivity</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A flat roof receives 600 W/m² solar radiation. Compare heat absorbed by:
                (a) dark bitumen (α = 0.90), (b) white reflective coating (α = 0.25).
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Heat absorbed = α × incident radiation</p>
                <p className="mt-2">(a) Dark bitumen:</p>
                <p>Q = 0.90 × 600 = <strong>540 W/m²</strong></p>
                <p className="mt-2">(b) White coating:</p>
                <p>Q = 0.25 × 600 = <strong>150 W/m²</strong></p>
                <p className="mt-2">Reduction = (540 - 150) / 540 = <strong>72% reduction</strong></p>
                <p className="mt-2 text-white/60">→ Significant cooling load reduction with reflective roof</p>
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
                <li className="pl-1"><strong>Q = εσAT⁴</strong> — Stefan-Boltzmann (total emission)</li>
                <li className="pl-1"><strong>Q = εσA(T₁⁴ - T₂⁴)</strong> — Net radiation exchange</li>
                <li className="pl-1"><strong>λmax = 2898/T</strong> — Wien's displacement law (μm, K)</li>
                <li className="pl-1"><strong>α = ε</strong> — Kirchhoff's Law (same wavelength/temperature)</li>
                <li className="pl-1"><strong>ΣFij = 1</strong> — View factor summation rule</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Stefan-Boltzmann constant: <strong>σ = 5.67 × 10⁻⁸ W/m²K⁴</strong></li>
                <li className="pl-1">Black body emissivity: <strong>ε = 1.0</strong></li>
                <li className="pl-1">Standard glass emissivity: <strong>ε = 0.84</strong></li>
                <li className="pl-1">Low-e glass emissivity: <strong>ε = 0.05-0.10</strong></li>
                <li className="pl-1">Building surfaces (brick, plaster): <strong>ε ≈ 0.90-0.95</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Using °C instead of K</strong> — Temperature must be absolute (K)</li>
                <li className="pl-1"><strong>Confusing ε with α</strong> — Equal only at same wavelength</li>
                <li className="pl-1"><strong>Forgetting T⁴ relationship</strong> — Small T change has large effect</li>
                <li className="pl-1"><strong>Ignoring view factors</strong> — Geometry affects actual heat transfer</li>
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
                <p className="font-medium text-white mb-1">Fundamental Relationships</p>
                <ul className="space-y-0.5">
                  <li>Q = εσAT⁴ (Stefan-Boltzmann)</li>
                  <li>σ = 5.67 × 10⁻⁸ W/m²K⁴</li>
                  <li>α = ε (Kirchhoff's Law)</li>
                  <li>ΣFij = 1 (view factor sum)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Building Services Values</p>
                <ul className="space-y-0.5">
                  <li>Standard glass: ε = 0.84</li>
                  <li>Low-e glass: ε = 0.05-0.10</li>
                  <li>Building surfaces: ε ≈ 0.90</li>
                  <li>Polished metals: ε ≈ 0.05</li>
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
            <Link to="../h-n-c-module2-section1-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Convection
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2-section1-4">
              Next: Combined Heat Transfer
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule2Section1_3;
