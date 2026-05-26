/**
 * Module 2 · Section 1 · Subsection 3 — Radiation Heat Transfer
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   Stefan-Boltzmann law, emissivity, view factors, radiant exchange. The mechanism
 *   behind low-e glazing, radiant ceiling panels, mean radiant temperature and the
 *   solar gain term in any thermal model.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  LearningOutcomes,
  SectionRule,
  FAQ,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Radiation Heat Transfer - HNC Module 2 Section 1.3';
const DESCRIPTION =
  'Master thermal radiation fundamentals for building services: Stefan-Boltzmann law, emissivity, black body radiation, view factors, and practical applications in radiant heating and low-e glazing.';

const quickCheckQuestions = [
  {
    id: 'stefan-boltzmann',
    question: 'In the Stefan-Boltzmann equation Q = εσAT⁴, what does the symbol σ represent?',
    options: [
      'Measure and cut carefully',
      'Health, safety and welfare',
      'Stefan-Boltzmann constant',
      'SAP/SBEM (Part L compliance)',
    ],
    correctIndex: 2,
    explanation:
      'σ (sigma) is the Stefan-Boltzmann constant with a value of 5.67 × 10⁻⁸ W/m²K⁴. It is a fundamental physical constant that relates radiated power to temperature.',
  },
  {
    id: 'black-body',
    question: 'What is the emissivity of a perfect black body?',
    options: [
      '0',
      '0.5',
      '0.9',
      '1.0',
    ],
    correctIndex: 3,
    explanation:
      'A perfect black body has an emissivity of 1.0, meaning it absorbs and emits the maximum possible radiation at any given temperature. Real surfaces always have emissivity less than 1.',
  },
  {
    id: 'low-e-glazing',
    question: 'What is the typical emissivity of low-e coated glazing?',
    options: [
      '0.84',
      '0.50',
      '0.05',
      '0.20',
    ],
    correctIndex: 2,
    explanation:
      'Low-e (low emissivity) coatings typically have emissivity values around 0.05-0.10, compared to 0.84 for standard glass. This dramatically reduces radiant heat loss through windows.',
  },
  {
    id: 'view-factor',
    question: 'What is the sum of all view factors from any surface in an enclosure?',
    options: [
      '1.0',
      '0.5',
      '0',
      'Variable',
    ],
    correctIndex: 0,
    explanation:
      'The sum of all view factors from any surface must equal 1.0 (summation rule). This ensures all radiation leaving a surface is accounted for - it must go somewhere within the enclosure.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is thermal radiation?',
    options: [
      'Heat transfer through direct contact',
      'Heat transfer through electromagnetic waves',
      'Heat transfer through fluid movement',
      'Heat transfer through phase change',
    ],
    correctAnswer: 1,
    explanation:
      'Thermal radiation is the transfer of heat energy through electromagnetic waves (primarily infrared). Unlike conduction and convection, radiation requires no medium and can occur through a vacuum.',
  },
  {
    id: 2,
    question: 'A surface at 300K radiates 459 W/m². What power would it radiate at 600K?',
    options: [
      '3672 W/m²',
      '918 W/m²',
      '7344 W/m²',
      '1836 W/m²',
    ],
    correctAnswer: 2,
    explanation:
      'Using Stefan-Boltzmann law, Q ∝ T⁴. Doubling the absolute temperature (600K/300K = 2) increases radiation by 2⁴ = 16 times. 459 × 16 = 7344 W/m².',
  },
  {
    id: 3,
    question: 'Which surface would absorb the most solar radiation?',
    options: [
      'Red brick (α = 0.65)',
      'Polished aluminium (α = 0.10)',
      'White paint (α = 0.25)',
      'Black paint (α = 0.95)',
    ],
    correctAnswer: 3,
    explanation:
      'Absorptivity (α) determines the fraction of incident radiation absorbed. Black paint with α = 0.95 absorbs 95% of incident solar radiation, making it the most absorbing surface listed.',
  },
  {
    id: 4,
    question:
      'For an opaque surface in thermal equilibrium, what is the relationship between absorptivity (α) and emissivity (ε)?',
    options: [
      "α = ε (Kirchhoff's Law)",
      'α + ε = 1',
      'α × ε = 1',
      'α = 1 - ε',
    ],
    correctAnswer: 0,
    explanation:
      "Kirchhoff's Law states that for an opaque surface in thermal equilibrium, absorptivity equals emissivity (α = ε) at the same wavelength and temperature. This fundamental relationship is essential for radiation calculations.",
  },
  {
    id: 5,
    question:
      'A radiant ceiling panel operates at 40°C (313K) in a room at 20°C (293K). The ceiling area is 10m² with ε = 0.95. What is the net radiant heat output?',
    options: [
      '520W',
      '680W',
      '1100W',
      '850W',
    ],
    correctAnswer: 1,
    explanation:
      'Net radiation Q = εσA(T₁⁴ - T₂⁴) = 0.95 × 5.67×10⁻⁸ × 10 × (313⁴ - 293⁴) = 0.95 × 5.67×10⁻⁸ × 10 × (9.60×10⁹ - 7.37×10⁹) = 680W',
  },
  {
    id: 6,
    question: 'What is the view factor F₁₂ for two parallel, infinite plates facing each other?',
    options: [
      '0',
      '0.5',
      '1.0',
      'Depends on distance',
    ],
    correctAnswer: 2,
    explanation:
      'For two infinite parallel plates facing each other, F₁₂ = 1.0. All radiation leaving surface 1 must reach surface 2 since the plates extend infinitely in all directions.',
  },
  {
    id: 7,
    question:
      'Why do radiant heating panels provide better thermal comfort than convective heating?',
    options: [
      'Separate different voltage levels and prevent interference',
      'Annually or when systems change significantly',
      'Any person who may need assistance to evacuate the building',
      'They directly warm occupants and surfaces, not air',
    ],
    correctAnswer: 3,
    explanation:
      "Radiant panels directly warm occupants and building surfaces through radiation, providing thermal comfort at lower air temperatures. This 'radiant temperature' effect allows comfort with 2-3°C lower air temperatures.",
  },
  {
    id: 8,
    question:
      'A double-glazed window has standard glass (ε = 0.84) facing a cavity. Replacing one pane with low-e glass (ε = 0.05) reduces radiative heat transfer by approximately:',
    options: [
      '94%',
      '85%',
      '50%',
      '70%',
    ],
    correctAnswer: 0,
    explanation:
      'Radiative transfer between parallel surfaces depends on effective emissivity. Standard cavity: εeff ≈ 0.72. With low-e: εeff ≈ 0.05. Reduction = (0.72-0.05)/0.72 = 93% reduction.',
  },
  {
    id: 9,
    question:
      'What is the dominant wavelength range for thermal radiation from building surfaces at typical temperatures (20-40°C)?',
    options: [
      'Ultraviolet (0.1-0.4 μm)',
      'Far infrared (3-100 μm)',
      'Near infrared (0.7-3 μm)',
      'Visible light (0.4-0.7 μm)',
    ],
    correctAnswer: 1,
    explanation:
      "According to Wien's displacement law, the peak wavelength for radiation at 20-40°C (293-313K) is approximately 10 μm, which falls in the far infrared range. This is why thermal cameras operate in this wavelength band.",
  },
  {
    id: 10,
    question: 'Which factor does NOT affect radiative heat exchange between two surfaces?',
    options: [
      'Temperature difference',
      'Surface emissivities',
      'Thermal conductivity of surfaces',
      'View factor between surfaces',
    ],
    correctAnswer: 2,
    explanation:
      'Thermal conductivity affects conduction heat transfer, not radiation. Radiative exchange depends on temperatures (T⁴), emissivities, view factors, and surface areas - but not on how well the surfaces conduct heat internally.',
  },
];

const faqs = [
  {
    question: 'Why does radiative heat transfer depend on T⁴ rather than temperature difference?',
    answer:
      'The Stefan-Boltzmann law (Q = εσAT⁴) arises from quantum mechanics - the energy distribution of photons emitted by a hot body. This T⁴ relationship means radiation becomes increasingly dominant at higher temperatures. At room temperature, radiation and convection are comparable, but at furnace temperatures, radiation dominates completely.',
  },
  {
    question: "What's the difference between emissivity and absorptivity?",
    answer:
      "Emissivity (ε) describes how well a surface emits radiation compared to a black body. Absorptivity (α) describes how much incident radiation a surface absorbs. Kirchhoff's Law states these are equal (α = ε) at the same wavelength and temperature. However, solar absorptivity may differ from room-temperature emissivity because they occur at different wavelengths.",
  },
  {
    question: 'How do selective surfaces work in solar thermal systems?',
    answer:
      'Selective surfaces have high absorptivity for solar wavelengths (short wave, ~0.5μm) but low emissivity for thermal radiation (long wave, ~10μm). This allows them to absorb solar energy efficiently whilst minimising radiative heat loss. Black chrome and black nickel coatings achieve solar absorptivity >0.95 with thermal emissivity <0.15.',
  },
  {
    question: 'Why is low-e glass effective for reducing heat loss?',
    answer:
      'Standard glass has high emissivity (0.84), meaning it radiates heat effectively across a window cavity. Low-e coatings (typically metallic oxide films) reduce emissivity to 0.05-0.10, cutting radiative transfer by up to 90%. The coating is placed on surface 2 or 3 (cavity-facing) to minimise heat transfer whilst allowing visible light through.',
  },
  {
    question: 'When should radiant heating be considered instead of convective heating?',
    answer:
      'Radiant heating is preferred for high-ceiling spaces (warehouses, churches), intermittently occupied buildings, areas with high ventilation rates, and where thermal comfort is needed with lower air temperatures. It provides instant warmth without heating the air mass, ideal for spot heating or where air stratification would cause issues.',
  },
  {
    question: 'How do view factors affect heating system design?',
    answer:
      'View factors (F₁₂) determine how much radiation from surface 1 reaches surface 2. A radiant panel with low view factor to occupants is ineffective regardless of its temperature. Panels should be positioned to maximise view factors to occupied areas - typically high on walls or ceilings angled towards occupants, not parallel to walls where radiation escapes through windows.',
  },
];

const HNCModule2Section1_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 2 · Section 1 · Subsection 3"
            title="Radiation Heat Transfer"
            description="Electromagnetic heat transfer: from Stefan-Boltzmann law to radiant heating panels and low-e glazing."
            tone="purple"
          />

          <TLDR
            points={[
              'You will apply the Stefan-Boltzmann law (Q = εσA·T⁴) and recognise that radiation goes as the fourth power of absolute temperature — small temperature changes have large effects.',
              'You can read emissivity (ε) values for building materials and explain why a low-e coating on glazing transforms thermal performance.',
              'You apply the view-factor concept to radiant heat exchange between surfaces — the basis of radiant panel sizing and asymmetric thermal-comfort analysis.',
              'You separate solar (short-wave) radiation from thermal (long-wave) re-radiation when analysing summer overheating.',
            ]}
          />

          <RegsCallout
            source="CIBSE Guide A — Environmental Design (thermal comfort & solar gain chapters)"
            clause="The radiant component of a building&rsquo;s thermal environment is treated through mean radiant temperature, view factors and surface emissivity. Solar gain is modelled by total solar energy transmittance (g-value) of glazing assemblies and shading devices."
            meaning={
              <>
                CIBSE provides the UK design framework for radiative analysis. As an HNC
                designer your spec choices on glazing g-value, low-e coatings and radiant panel
                area follow directly from this framework. Building Regulations Part L sets the
                regulatory ceiling.
              </>
            }
            cite="Source: CIBSE Guide A — Environmental Design; BS EN 410 — Glass in building (light and solar characteristics); Building Regulations Part L"
          />

          <LearningOutcomes
            outcomes={[
              'Apply the Stefan-Boltzmann law for radiant heat transfer calculations',
              "Understand emissivity, absorptivity and Kirchhoff's Law",
              'Explain black body radiation and real surface behaviour',
              'Calculate view factors for common geometries',
              'Analyse radiative exchange between building surfaces',
              'Apply radiation principles to radiant heating and low-e glazing design',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="Stefan-Boltzmann Law and Fundamentals"
            plainEnglish="Hot stuff radiates. The hotter it gets, the more it radiates — by the FOURTH power of temperature in Kelvin. That's why a 1000°C furnace shifts heat by radiation alone."
          >
            <p>
              Thermal radiation is the transfer of heat through electromagnetic waves, predominantly
              in the infrared spectrum. Unlike conduction and convection, radiation requires no
              medium and can transfer heat through a vacuum - this is how the Sun heats the Earth.
            </p>
            <p>
              <strong>Stefan-Boltzmann Law:</strong> Q = εσAT⁴
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Q</strong> = Radiant power emitted (W)
              </li>
              <li>
                <strong>ε</strong> = Emissivity (0 to 1, dimensionless)
              </li>
              <li>
                <strong>σ</strong> = Stefan-Boltzmann constant = 5.67 × 10⁻⁸ W/m²K⁴
              </li>
              <li>
                <strong>A</strong> = Surface area (m²)
              </li>
              <li>
                <strong>T</strong> = Absolute temperature (K)
              </li>
            </ul>
            <p>
              <strong>Key principles:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>All objects above absolute zero emit thermal radiation</li>
              <li>Radiation power increases with T⁴ (doubling temperature increases radiation 16-fold)</li>
              <li>Net heat transfer occurs from hot surfaces to cold surfaces</li>
              <li>Temperature must always be in Kelvin (K = °C + 273)</li>
            </ul>
            <p>
              <strong>Net radiation between two surfaces:</strong> Qnet = εσA(T₁⁴ - T₂⁴) — net heat
              transfer from surface 1 (hot) to surface 2 (cold).
            </p>
            <p>
              <strong>Critical insight:</strong> The T⁴ relationship makes radiation dominant at
              high temperatures. At furnace temperatures (1000°C+), radiation accounts for over 90%
              of heat transfer.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock
            title="Emissivity, Absorptivity and Surface Properties"
            plainEnglish="Real surfaces don't radiate perfectly. ε says how good they are at emitting, α says how good at absorbing. At the same temperature and wavelength, they're equal — Kirchhoff's Law."
          >
            <p>
              Real surfaces emit and absorb radiation less efficiently than a perfect black body.
              Emissivity (ε) and absorptivity (α) quantify these properties and are crucial for
              accurate heat transfer calculations.
            </p>
            <p>
              <strong>Emissivity (ε):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Ratio of actual emission to black body emission</li>
              <li>Range: 0 (perfect reflector) to 1 (black body)</li>
              <li>Depends on surface finish, material, wavelength</li>
              <li>Low-e coatings: ε = 0.05-0.10</li>
            </ul>
            <p>
              <strong>Absorptivity (α):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Fraction of incident radiation absorbed</li>
              <li>α + ρ + τ = 1 (absorbed + reflected + transmitted)</li>
              <li>For opaque surfaces: α + ρ = 1</li>
              <li>Dark surfaces: high α; shiny surfaces: low α</li>
            </ul>
            <p>
              <strong>Kirchhoff's Law:</strong> α = ε. At thermal equilibrium, absorptivity equals
              emissivity at the same wavelength and temperature.
            </p>
            <p>
              <strong>Typical emissivity values:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Black body (ideal): ε = 1.00 — theoretical reference</li>
              <li>Matt black paint: ε = 0.95 — radiant panel finish</li>
              <li>Brick, concrete, plaster: ε = 0.90-0.95 — building surfaces</li>
              <li>Standard glass: ε = 0.84 — windows (uncoated)</li>
              <li>White paint: ε = 0.90 — interior surfaces</li>
              <li>Oxidised steel: ε = 0.80 — exposed steelwork</li>
              <li>Low-e coated glass: ε = 0.05-0.10 — energy-efficient glazing</li>
              <li>Polished aluminium: ε = 0.05 — reflective insulation</li>
            </ul>
            <p>
              <strong>Design note:</strong> Colour affects solar absorptivity (short wavelength) but
              has little effect on thermal emissivity (long wavelength). A white roof and black roof
              have similar ε (~0.90) but very different solar absorptivity.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock
            title="Black Body Radiation and View Factors"
            plainEnglish="A black body is a perfect absorber/emitter — useful as a reference. View factors say how much of one surface's radiation actually hits another surface — geometry matters as much as temperature."
          >
            <p>
              A black body is a theoretical surface that absorbs all incident radiation and emits
              the maximum possible radiation at any temperature. Real surfaces are compared to this
              ideal through emissivity. View factors determine how radiation is distributed between
              surfaces.
            </p>
            <p>
              <strong>Black body characteristics:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Perfect absorber: α = 1 (absorbs all wavelengths)</li>
              <li>Perfect emitter: ε = 1 (emits maximum possible radiation)</li>
              <li>Emission depends only on temperature, not material properties</li>
              <li>Black body radiation spectrum follows Planck's Law</li>
            </ul>
            <p>
              <strong>Wien's displacement law:</strong> λmax = 2898 / T. Peak wavelength (μm) is
              inversely proportional to temperature (K).
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Sun (5800K): λmax ≈ 0.5 μm (visible light)</li>
              <li>Room surfaces (300K): λmax ≈ 10 μm (far infrared)</li>
            </ul>
            <p>
              <strong>View factors (configuration factors):</strong> The view factor F₁₂ is the
              fraction of radiation leaving surface 1 that reaches surface 2.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Summation rule:</strong> ΣF₁ⱼ = 1 (all radiation must go somewhere)
              </li>
              <li>
                <strong>Reciprocity:</strong> A₁F₁₂ = A₂F₂₁ (geometric relationship)
              </li>
              <li>
                <strong>Self-viewing:</strong> Flat/convex surfaces have F₁₁ = 0
              </li>
              <li>
                <strong>Enclosure:</strong> Concave surfaces may have F₁₁ &gt; 0
              </li>
            </ul>
            <p>
              <strong>Common view factor values:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Parallel infinite plates: F₁₂ = 1.0</li>
              <li>Small surface in large enclosure: F₁₂ = 1.0</li>
              <li>Perpendicular rectangles (shared edge): F₁₂ = 0.2-0.4 (geometry dependent)</li>
              <li>Parallel equal squares (spacing = side): F₁₂ ≈ 0.2</li>
              <li>Ceiling panel to floor (typical room): F₁₂ = 0.3-0.6</li>
            </ul>
            <p>
              <strong>Practical tip:</strong> View factors can be found in charts and tables in
              CIBSE guides or calculated using software. For complex geometries, numerical methods
              are typically used.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock
            title="Building Services Applications"
            plainEnglish="Three big places radiation matters in buildings: radiant heating panels, low-e glazing, and the mean radiant temperature you feel sat in a cold-walled room."
          >
            <p>
              Radiation heat transfer principles are applied throughout building services
              engineering, from radiant heating system design to window specification and thermal
              comfort assessment.
            </p>
            <p>
              <strong>Radiant heating panels:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>High-temperature panels (150-400°C): Gas-fired, industrial applications</li>
              <li>Medium-temperature panels (40-100°C): Hot water or electric ceiling panels</li>
              <li>Low-temperature panels (30-40°C): Underfloor heating, radiant ceilings</li>
              <li>Direct radiant heating warms occupants without heating air mass</li>
              <li>Allows 2-3°C lower air temperature for same comfort level</li>
            </ul>
            <p>
              <strong>Low-emissivity glazing:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Metallic oxide coating (silver, tin oxide) applied to glass surface</li>
              <li>Reduces emissivity from 0.84 to 0.05-0.10</li>
              <li>Cuts radiative heat transfer across cavity by up to 90%</li>
              <li>Coating position: Surface 2 or 3 (cavity-facing) for optimal performance</li>
              <li>"Hard coat" (pyrolytic): durable, ε ≈ 0.15-0.20</li>
              <li>"Soft coat" (sputtered): better performance, ε ≈ 0.05, less durable</li>
            </ul>
            <p>
              <strong>Mean Radiant Temperature (MRT):</strong> MRT is the uniform temperature of an
              imaginary black enclosure that would exchange the same radiant heat as the actual
              non-uniform environment. It is critical for thermal comfort.
            </p>
            <p>Operative temperature ≈ (MRT + Tair) / 2 (simplified for low air velocities).</p>
            <p>
              <strong>Radiative heat loss through windows:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Single glazing: U = 5.4 W/m²K — minimal cavity effect</li>
              <li>Double glazing (air): U = 2.8 W/m²K — ~60% radiative in cavity</li>
              <li>Double glazing (argon): U = 2.6 W/m²K — ~60% radiative in cavity</li>
              <li>Double + low-e (argon): U = 1.2 W/m²K — ~10% radiative in cavity</li>
              <li>Triple + low-e (argon): U = 0.8 W/m²K — minimal radiation losses</li>
            </ul>
            <p>
              <strong>Surface temperature considerations:</strong> Cold internal surfaces (below
              14°C) cause radiant asymmetry discomfort and risk condensation. Well-insulated
              construction with low-e glazing maintains higher internal surface temperatures.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock
            title="Worked examples"
            plainEnglish="Three practical calcs: a radiant panel, the low-e benefit, and how a roof colour changes solar gain."
          >
            <p>
              <strong>Example 1 - radiant panel output:</strong> A radiant ceiling panel (2m × 1m)
              operates at 60°C in a room at 20°C. The panel has ε = 0.95. Calculate the net radiant
              heat output.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Convert to Kelvin: T₁ = 60 + 273 = 333K, T₂ = 20 + 273 = 293K</li>
              <li>Area: A = 2 × 1 = 2m²</li>
              <li>Net radiation: Q = εσA(T₁⁴ - T₂⁴)</li>
              <li>Q = 0.95 × 5.67×10⁻⁸ × 2 × (333⁴ - 293⁴)</li>
              <li>Q = 0.95 × 5.67×10⁻⁸ × 2 × (1.23×10¹⁰ - 7.37×10⁹)</li>
              <li>Q = 0.95 × 5.67×10⁻⁸ × 2 × 4.93×10⁹</li>
              <li>Q = <strong>531W</strong> (panel output: 266 W/m²)</li>
            </ul>
            <p>
              <strong>Example 2 - low-e glazing benefit:</strong> Calculate the effective emissivity
              for radiative exchange across a 16mm cavity with: (a) standard glass both sides (ε =
              0.84), (b) one low-e surface (ε = 0.05).
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>For two parallel surfaces, effective emissivity: εeff = 1 / (1/ε₁ + 1/ε₂ - 1)</li>
              <li>(a) Standard glass both sides: εeff = 1 / (1/0.84 + 1/0.84 - 1) = 1 / (1.19 + 1.19 - 1) = 1 / 1.38 = <strong>0.72</strong></li>
              <li>(b) One low-e surface: εeff = 1 / (1/0.84 + 1/0.05 - 1) = 1 / (1.19 + 20 - 1) = 1 / 20.19 = <strong>0.05</strong></li>
              <li>Result: 93% reduction in radiative heat transfer</li>
            </ul>
            <p>
              <strong>Example 3 - solar absorptivity:</strong> A flat roof receives 600 W/m² solar
              radiation. Compare heat absorbed by: (a) dark bitumen (α = 0.90), (b) white reflective
              coating (α = 0.25).
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Heat absorbed = α × incident radiation</li>
              <li>(a) Dark bitumen: Q = 0.90 × 600 = <strong>540 W/m²</strong></li>
              <li>(b) White coating: Q = 0.25 × 600 = <strong>150 W/m²</strong></li>
              <li>Reduction = (540 - 150) / 540 = <strong>72% reduction</strong></li>
              <li>Result: significant cooling load reduction with reflective roof</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="Practical guidance"
            plainEnglish="The formulas and standard values you'll keep coming back to."
          >
            <p>
              <strong>Essential formulas:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Q = εσAT⁴</strong> — Stefan-Boltzmann (total emission)
              </li>
              <li>
                <strong>Q = εσA(T₁⁴ - T₂⁴)</strong> — Net radiation exchange
              </li>
              <li>
                <strong>λmax = 2898/T</strong> — Wien's displacement law (μm, K)
              </li>
              <li>
                <strong>α = ε</strong> — Kirchhoff's Law (same wavelength/temperature)
              </li>
              <li>
                <strong>ΣFij = 1</strong> — View factor summation rule
              </li>
            </ul>
            <p>
              <strong>Key values to remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Stefan-Boltzmann constant: <strong>σ = 5.67 × 10⁻⁸ W/m²K⁴</strong>
              </li>
              <li>
                Black body emissivity: <strong>ε = 1.0</strong>
              </li>
              <li>
                Standard glass emissivity: <strong>ε = 0.84</strong>
              </li>
              <li>
                Low-e glass emissivity: <strong>ε = 0.05-0.10</strong>
              </li>
              <li>
                Building surfaces (brick, plaster): <strong>ε ≈ 0.90-0.95</strong>
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Using °C instead of K</strong> — Temperature must be absolute (K)
                </li>
                <li>
                  <strong>Confusing ε with α</strong> — Equal only at same wavelength
                </li>
                <li>
                  <strong>Forgetting T⁴ relationship</strong> — Small T change has large effect
                </li>
                <li>
                  <strong>Ignoring view factors</strong> — Geometry affects actual heat transfer
                </li>
              </ul>
            }
            doInstead="Always convert to Kelvin before plugging into Stefan-Boltzmann, treat ε and α as separate properties at different wavelengths, sanity-check radiation effects via T⁴ scaling, and look up view factors for the actual geometry rather than assuming F = 1."
          />

          <SectionRule />

          <Scenario
            title="Specifying glazing for a south-facing atrium"
            situation={
              <>
                A new office atrium has 80 m² of south-facing vertical glazing. The architect
                wants the &ldquo;clear glass&rdquo; visual look. The mechanical designer warns
                the cooling load will exceed plant capacity in summer.
              </>
            }
            whatToDo={
              <>
                Run the radiative analysis. Specify a low-e + solar-control double-glazed unit
                with g-value ≤ 0.30 (from BS EN 410), light transmittance ≥ 0.65 (preserves
                visual clarity), U ≤ 1.4 W/m²·K (Part L compliance). Add external solar
                shading where the g-value alone is insufficient. Re-run the cooling load — the
                radiative + transmitted solar should now be within plant capacity. Document
                the trade-off in the Part L submission and a thermal comfort report.
              </>
            }
            whyItMatters={
              <>
                Glazing is the largest single radiative gain on most buildings. A clear
                untreated assembly delivers a g-value of 0.7+; a properly specified
                solar-control unit can halve the gain at the same light transmittance.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Stefan-Boltzmann: Q = εσA·T⁴ — radiation goes as the fourth power of absolute temperature.',
              'σ (Stefan-Boltzmann constant) = 5.67 × 10⁻⁸ W/m²·K⁴ — universal constant.',
              'Emissivity ε ranges 0 (perfect reflector) to 1 (black body); typical building surfaces ε ≈ 0.85-0.95, low-e glazing ε ≈ 0.05.',
              'View factor F₁₂ — fraction of radiation leaving surface 1 that reaches surface 2 — geometric, between 0 and 1.',
              'Solar (short-wave, ~0.3-2.5 µm) and thermal (long-wave, ~5-50 µm) radiation behave differently — low-e coatings exploit the gap.',
              'Mean radiant temperature drives radiant comfort — analyse via view factors to surrounding surfaces.',
              'g-value (total solar energy transmittance) is the BS EN 410 metric for glazing solar gain.',
              'Net radiative exchange Q = εσA(T₁⁴-T₂⁴) for a surface in a large enclosure — the equation behind every radiant panel calculation.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section1-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Convection
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section1-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                U-values and thermal resistance
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule2Section1_3;
