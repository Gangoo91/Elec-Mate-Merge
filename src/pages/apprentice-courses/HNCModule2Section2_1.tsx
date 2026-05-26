/**
 * Module 2 · Section 2 · Subsection 1 — Fluid Properties and Pressure
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   Density, viscosity, compressibility, hydrostatic pressure, gauge vs absolute. The
 *   foundation of every pump-curve, pipe-sizing and pressure-budget calculation on a
 *   building services water or gas system.
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

const TITLE = 'Fluid Properties and Pressure - HNC Module 2 Section 2.1';
const DESCRIPTION =
  "Master fluid properties including density, viscosity, and pressure fundamentals for building services engineering. Covers Pascal's law and hydrostatic pressure calculations.";

const quickCheckQuestions = [
  {
    id: 'water-density',
    question: 'What is the approximate density of water at 20°C?',
    options: [
      '1500 kg/m³',
      '1000 kg/m³',
      '100 kg/m³',
      '500 kg/m³',
    ],
    correctIndex: 1,
    explanation:
      'Water has a density of approximately 1000 kg/m³ (or 1 kg/litre) at 20°C. This value is fundamental to all hydraulic calculations in building services.',
  },
  {
    id: 'pressure-types',
    question:
      'If atmospheric pressure is 101.3 kPa and gauge pressure reads 150 kPa, what is the absolute pressure?',
    options: [
      '201.3 kPa',
      '48.7 kPa',
      '251.3 kPa',
      '150 kPa',
    ],
    correctIndex: 2,
    explanation:
      'Absolute pressure = Gauge pressure + Atmospheric pressure. So 150 kPa + 101.3 kPa = 251.3 kPa. Most pressure gauges read gauge pressure (zero at atmospheric).',
  },
  {
    id: 'pascal-law',
    question: "According to Pascal's law, pressure applied to a confined fluid:",
    options: [
      'Is transmitted equally in all directions',
      'Ensure metalwork is at earth potential',
      'Clearly and legibly in permanent ink or digitally',
      'They improve appearance and make maintenance easier',
    ],
    correctIndex: 0,
    explanation:
      "Pascal's law states that pressure applied to a confined fluid is transmitted undiminished and equally in all directions. This principle enables hydraulic systems to multiply force.",
  },
  {
    id: 'hydrostatic-pressure',
    question:
      'A water tank is 8m high. What is the hydrostatic pressure at the bottom? (g = 9.81 m/s²)',
    options: [
      '98.1 kPa',
      '78.48 kPa',
      '7.85 kPa',
      '39.24 kPa',
    ],
    correctIndex: 1,
    explanation:
      'P = ρgh = 1000 × 9.81 × 8 = 78,480 Pa = 78.48 kPa. This is approximately 0.78 bar or 7.85 metres head of water.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is density?',
    options: [
      'The volume per unit mass of a substance',
      'The mass per unit volume of a substance',
      'The weight of a substance',
      'The pressure exerted by a substance',
    ],
    correctAnswer: 1,
    explanation:
      'Density (ρ) is defined as mass per unit volume, expressed in kg/m³. It is a fundamental property used in all fluid mechanics calculations.',
  },
  {
    id: 2,
    question: "Which property describes a fluid's resistance to flow?",
    options: [
      'Compressibility',
      'Density',
      'Viscosity',
      'Pressure',
    ],
    correctAnswer: 2,
    explanation:
      "Viscosity (μ) describes a fluid's internal resistance to flow - essentially its 'thickness'. Higher viscosity fluids like oil flow more slowly than lower viscosity fluids like water.",
  },
  {
    id: 3,
    question: 'The SI unit of dynamic viscosity is:',
    options: [
      'm²/s',
      'kg/m³',
      'N/m²',
      'Pa·s (Pascal-seconds)',
    ],
    correctAnswer: 3,
    explanation:
      'Dynamic viscosity (μ) is measured in Pascal-seconds (Pa·s) or equivalently kg/(m·s). Water at 20°C has a viscosity of approximately 0.001 Pa·s (1 mPa·s).',
  },
  {
    id: 4,
    question: 'What is the relationship between kinematic viscosity (ν) and dynamic viscosity (μ)?',
    options: [
      'ν = μ / ρ',
      'ν = μ × ρ',
      'ν = ρ / μ',
      'ν = μ + ρ',
    ],
    correctAnswer: 0,
    explanation:
      'Kinematic viscosity (ν) = Dynamic viscosity (μ) / Density (ρ). Units are m²/s. This relationship is important when using the Reynolds number formula.',
  },
  {
    id: 5,
    question: 'Standard atmospheric pressure at sea level is approximately:',
    options: [
      '50 kPa',
      '101.3 kPa',
      '1013 kPa',
      '10.13 kPa',
    ],
    correctAnswer: 1,
    explanation:
      'Standard atmospheric pressure is 101.325 kPa (often rounded to 101.3 kPa), equivalent to 1.013 bar or 10.33 metres head of water.',
  },
  {
    id: 6,
    question: 'A pressure gauge reading of zero indicates:',
    options: [
      'Absolute vacuum',
      'Maximum system pressure',
      'Atmospheric pressure',
      'Pump failure',
    ],
    correctAnswer: 2,
    explanation:
      'Gauge pressure uses atmospheric pressure as the reference point (zero). A gauge reading of zero means the actual (absolute) pressure equals atmospheric pressure.',
  },
  {
    id: 7,
    question: "In a building's LPHW system, why does pressure increase at lower floor levels?",
    options: [
      'Pre-agreed terms, pricing and streamlined ordering',
      'Ensure circuit is isolated and discharged',
      'Moisture, heat, mechanical damage, or aging',
      'Due to hydrostatic pressure from the water column above',
    ],
    correctAnswer: 3,
    explanation:
      'Hydrostatic pressure (P = ρgh) increases with depth. Each metre of water column adds approximately 9.81 kPa (0.1 bar) to the static pressure.',
  },
  {
    id: 8,
    question:
      "What pressure is exerted at the base of a 25m tall building's heating system header tank? (Use ρ = 1000 kg/m³, g = 10 m/s²)",
    options: [
      '250 kPa',
      '2500 kPa',
      '25 kPa',
      '100 kPa',
    ],
    correctAnswer: 0,
    explanation:
      'P = ρgh = 1000 × 10 × 25 = 250,000 Pa = 250 kPa = 2.5 bar. This static head must be considered when sizing components at lower levels.',
  },
  {
    id: 9,
    question: "Pascal's law is the fundamental principle behind:",
    options: [
      'Pa·s (Pascal-seconds)',
      'Hydraulic lifts and presses',
      'Atmospheric pressure',
      'Density and viscosity',
    ],
    correctAnswer: 1,
    explanation:
      "Pascal's law enables hydraulic systems to multiply force. A small force on a small piston creates equal pressure throughout the fluid, producing a larger force on a larger piston.",
  },
  {
    id: 10,
    question: 'How does water viscosity change as temperature increases?',
    options: [
      'Viscosity increases significantly',
      'Viscosity first increases then decreases',
      'Viscosity decreases significantly',
      'Viscosity remains constant',
    ],
    correctAnswer: 2,
    explanation:
      "Water viscosity decreases as temperature rises. At 20°C it's about 1.0 mPa·s, at 60°C it's about 0.47 mPa·s. This affects flow characteristics in heating systems.",
  },
  {
    id: 11,
    question: 'What is the specific gravity of a fluid with density 1200 kg/m³?',
    options: [
      '0.83',
      '1.0',
      '1200',
      '1.2',
    ],
    correctAnswer: 3,
    explanation:
      "Specific gravity (SG) is the ratio of a fluid's density to water's density. SG = 1200/1000 = 1.2. This dimensionless number indicates the fluid is 20% denser than water.",
  },
  {
    id: 12,
    question: 'In HVAC applications, which fluid property most affects pump power requirements?',
    options: [
      'Density and viscosity',
      'Surface tension',
      'Colour',
      'Thermal conductivity',
    ],
    correctAnswer: 0,
    explanation:
      'Density affects the mass flow rate and static head, while viscosity affects friction losses. Both directly impact the power required to pump fluids through building systems.',
  },
];

const faqs = [
  {
    question: 'Why do heating systems use pressurisation units?',
    answer:
      'Pressurisation units maintain system pressure above atmospheric to prevent air ingress and cavitation, and above the saturation pressure at operating temperature to prevent boiling. They also compensate for water volume changes during heating/cooling cycles. Typical sealed systems operate at 1.5-3 bar gauge.',
  },
  {
    question: "What's the difference between absolute and gauge pressure?",
    answer:
      'Absolute pressure is measured from a perfect vacuum (zero reference). Gauge pressure is measured from atmospheric pressure. Most instruments read gauge pressure, so you add atmospheric pressure (~101.3 kPa) to get absolute. Negative gauge pressure (vacuum) is below atmospheric.',
  },
  {
    question: 'Why does water viscosity matter in building services?',
    answer:
      'Viscosity affects friction losses in pipes and pressure drop across components. At higher temperatures (e.g., 80°C in heating systems), water flows more easily due to reduced viscosity. This is why LPHW systems have different flow characteristics to chilled water systems - they need to account for temperature-dependent viscosity.',
  },
  {
    question: 'How do I calculate the static pressure at different building levels?',
    answer:
      'Use P = ρgh where ρ = 1000 kg/m³ for water, g = 9.81 m/s², and h = height difference in metres. A useful rule of thumb: each metre of water height adds approximately 10 kPa (0.1 bar) of pressure. A 30m building has about 3 bar static pressure difference between top and bottom.',
  },
  {
    question: 'What is vapour pressure and why is it important?',
    answer:
      "Vapour pressure is the pressure at which liquid begins to boil at a given temperature. For water at 100°C, it's 101.3 kPa (1 atm). In pressurised systems, maintaining pressure above vapour pressure prevents cavitation and flash steam. This is critical at pump suctions and high points in systems.",
  },
  {
    question: 'How do glycol mixtures affect fluid properties?',
    answer:
      'Adding glycol (for freeze protection) increases density and viscosity compared to pure water. A 30% glycol solution has density ~1040 kg/m³ and significantly higher viscosity. This increases pump power requirements and reduces heat transfer efficiency, typically requiring 10-15% larger pumps and heat exchangers.',
  },
];

const HNCModule2Section2_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 2 · Section 2 · Subsection 1"
            title="Fluid Properties and Pressure"
            description="Understanding the fundamental properties of fluids and pressure principles essential for hydraulic system design."
            tone="purple"
          />

          <TLDR
            points={[
              'You will work with the four fundamental fluid properties — density (ρ), dynamic viscosity (µ), kinematic viscosity (ν), bulk modulus — and apply them in pipe-flow and pump calculations.',
              'You can convert between gauge and absolute pressure and between Pa, kPa, bar, m head — without dropping a factor of 10 in the SI unit chain.',
              'You apply the hydrostatic pressure equation (P = ρgh) and the principle that pressure at depth depends only on density and elevation, not container shape.',
              'You recognise temperature dependence — water density and viscosity change materially across LTHW operating range, and the calculation must reflect that.',
            ]}
          />

          <RegsCallout
            source="CIBSE Guide C — Reference Data"
            clause="Fluid property data for water and other building services fluids (density, dynamic viscosity, kinematic viscosity, specific heat capacity, thermal conductivity, vapour pressure) are tabulated against temperature and pressure for use in hydraulic and thermal design calculations."
            meaning={
              <>
                CIBSE Guide C is the UK reference for fluid properties used in building
                services design. As an HNC engineer your pump curves, pipe sizing and pressure
                budgets all start from these tables — interpolated to the actual operating
                temperature and pressure.
              </>
            }
            cite="Source: CIBSE Guide C — Reference Data; BS EN 12831 (heat load) for fluid property assumptions"
          />

          <LearningOutcomes
            outcomes={[
              'Define density, specific gravity, and viscosity with correct SI units',
              'Distinguish between absolute, gauge, and atmospheric pressure',
              "Apply Pascal's law to hydraulic system analysis",
              'Calculate hydrostatic pressure in building systems',
              'Understand how temperature affects fluid properties',
              'Apply fluid property knowledge to HVAC system design',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="Density and Specific Gravity"
            plainEnglish="Density = mass per cubic metre. Water = 1000 kg/m³. Specific gravity = how heavy your fluid is compared to water (a dimensionless number)."
          >
            <p>
              Density is the most fundamental fluid property - it describes how much mass is
              contained in a given volume. All hydraulic calculations in building services start
              with density.
            </p>
            <p>
              <strong>Key definitions:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Density (ρ):</strong> Mass per unit volume (kg/m³)
              </li>
              <li>
                <strong>Specific gravity (SG):</strong> Ratio of fluid density to water density (dimensionless)
              </li>
              <li>
                <strong>Specific volume:</strong> Volume per unit mass = 1/ρ (m³/kg)
              </li>
              <li>
                <strong>Specific weight:</strong> Weight per unit volume = ρg (N/m³)
              </li>
            </ul>
            <p>
              <strong>Common fluid densities in building services:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Water (4°C): 1000 kg/m³ — reference standard</li>
              <li>Water (20°C): 998 kg/m³ — chilled water systems</li>
              <li>Water (80°C): 972 kg/m³ — LPHW heating systems</li>
              <li>30% glycol solution: 1040 kg/m³ — frost protection</li>
              <li>Air (20°C, 1 atm): 1.2 kg/m³ — ventilation systems</li>
            </ul>
            <p>
              <strong>Remember:</strong> Water density decreases as temperature rises. A system
              designed for 80°C water will have slightly different flow characteristics than at
              20°C.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock
            title="Viscosity - Resistance to Flow"
            plainEnglish="Viscosity is how much a fluid fights when you try to move it. Water at 20°C is the benchmark. Heat it up, viscosity drops; add glycol, viscosity climbs."
          >
            <p>
              Viscosity describes a fluid's internal friction - its resistance to flowing or being
              deformed. It directly affects pipe friction losses and pump power requirements.
            </p>
            <p>
              <strong>Types of viscosity:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Dynamic (absolute) viscosity (μ):</strong> Measured in Pa·s or kg/(m·s)
              </li>
              <li>
                <strong>Kinematic viscosity (ν):</strong> ν = μ/ρ, measured in m²/s or Stokes
              </li>
              <li>Kinematic viscosity is used in the Reynolds number formula</li>
              <li>Water viscosity decreases significantly with temperature</li>
            </ul>
            <p>
              <strong>Water viscosity vs temperature:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>10°C:</strong> μ = 1.31 mPa·s
              </li>
              <li>
                <strong>20°C:</strong> μ = 1.00 mPa·s
              </li>
              <li>
                <strong>40°C:</strong> μ = 0.65 mPa·s
              </li>
              <li>
                <strong>60°C:</strong> μ = 0.47 mPa·s
              </li>
              <li>
                <strong>80°C:</strong> μ = 0.35 mPa·s
              </li>
            </ul>
            <p>
              <strong>Practical implications:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Lower viscosity = less friction loss</li>
              <li>LPHW systems have lower losses than CHW</li>
              <li>Glycol increases viscosity significantly</li>
              <li>Cold start-up has highest resistance</li>
            </ul>
            <p>
              <strong>Kinematic viscosity relationship:</strong> ν = μ / ρ. Where ν is in m²/s, μ in
              Pa·s, and ρ in kg/m³.
            </p>
            <p>
              <strong>Design tip:</strong> When using glycol solutions, expect 15-25% higher
              friction losses and size pumps accordingly.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="Pressure Types and Measurement"
            plainEnglish="Three flavours of pressure: atmospheric (around you), gauge (what your meter reads relative to that), and absolute (from true vacuum). Add atmospheric to gauge to get absolute."
          >
            <p>
              Pressure is force per unit area. Understanding the different types of pressure and
              their relationships is crucial for specifying equipment and ensuring safe system
              operation.
            </p>
            <p>
              <strong>Pressure relationships:</strong> Pabs = Pgauge + Patm. Absolute pressure =
              gauge pressure + atmospheric pressure.
            </p>
            <p>
              <strong>Pressure units conversion (1 atm reference):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Pascal (Pa): 101,325 — SI unit, calculations</li>
              <li>Kilopascal (kPa): 101.325 — HVAC specifications</li>
              <li>Bar: 1.013 — industrial equipment</li>
              <li>Metres head (mH₂O): 10.33 — pump specifications</li>
              <li>PSI: 14.7 — American equipment</li>
            </ul>
            <p>
              <strong>Three pressure types compared:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Atmospheric:</strong> 101.3 kPa at sea level — reference for gauges
              </li>
              <li>
                <strong>Gauge:</strong> Relative to atmosphere — most common readings
              </li>
              <li>
                <strong>Absolute:</strong> From true zero (vacuum) — thermodynamic calcs
              </li>
            </ul>
            <p>
              <strong>Useful conversion:</strong> 1 bar ≈ 100 kPa ≈ 10 metres head of water (exact:
              10.2 mH₂O).
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock
            title="Pascal's Law and Hydrostatic Pressure"
            plainEnglish="Squeeze a sealed fluid and the squeeze travels everywhere equally — that's Pascal. Stack water 10 m high and you've got 1 bar at the bottom — that's hydrostatic."
          >
            <p>
              Pascal's law and hydrostatic pressure are fundamental principles that govern how
              pressure behaves in fluids. These principles are essential for understanding building
              services systems.
            </p>
            <p>
              <strong>Pascal's Law:</strong> Pressure applied to a confined fluid is transmitted
              undiminished and equally in all directions throughout the fluid. This enables
              hydraulic force multiplication: F₂/F₁ = A₂/A₁.
            </p>
            <p>
              <strong>Hydrostatic pressure equation:</strong> P = ρgh. Where P = pressure (Pa), ρ =
              density (kg/m³), g = 9.81 m/s², h = height (m).
            </p>
            <p>
              <strong>Hydrostatic pressure in buildings:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>10 m (3 storey): ~1.0 bar — standard equipment OK</li>
              <li>30 m (10 storey): ~3.0 bar — check valve/pipe ratings</li>
              <li>60 m (20 storey): ~6.0 bar — consider pressure break tanks</li>
              <li>100 m (high-rise): ~10 bar — zoned systems required</li>
            </ul>
            <p>
              <strong>Practical applications in building services:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Static head:</strong> Components at lower levels experience higher pressure
              </li>
              <li>
                <strong>Pressurisation:</strong> Systems maintained above atmospheric to prevent air ingress
              </li>
              <li>
                <strong>Cold water:</strong> Gravity-fed systems rely on hydrostatic head
              </li>
              <li>
                <strong>Expansion vessels:</strong> Pre-charge set to balance static head
              </li>
            </ul>
            <p>
              <strong>Rule of thumb:</strong> Each 10 metres of water column adds approximately 1
              bar (100 kPa) of static pressure.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock
            title="Worked examples"
            plainEnglish="Three quick numbers: static pressure in a tall building, gauge vs absolute, and a kinematic viscosity calc."
          >
            <p>
              <strong>Example 1 - static pressure in a tall building:</strong> A 45m tall building
              has a header tank at roof level. Calculate the static pressure at ground floor level.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>P = ρgh = 1000 × 9.81 × 45 = 441,450 Pa = <strong>441.45 kPa</strong></li>
              <li>Converting to bar: 441.45 / 100 = <strong>4.41 bar</strong></li>
              <li>Components must be rated for at least 6 bar working pressure</li>
            </ul>
            <p>
              <strong>Example 2 - absolute vs gauge pressure:</strong> A sealed heating system shows
              2.5 bar on the pressure gauge. What is the absolute pressure?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Pabs = Pgauge + Patm = 2.5 bar + 1.013 bar = <strong>3.513 bar absolute</strong></li>
              <li>This absolute pressure must exceed the vapour pressure at system temperature</li>
            </ul>
            <p>
              <strong>Example 3 - kinematic viscosity calculation:</strong> Calculate the kinematic
              viscosity of water at 60°C (μ = 0.47 mPa·s, ρ = 983 kg/m³).
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>ν = μ / ρ = 0.47 × 10⁻³ Pa·s / 983 kg/m³</li>
              <li>ν = 4.78 × 10⁻⁷ m²/s = <strong>0.478 mm²/s (or 0.478 cSt)</strong></li>
              <li>This value is used in Reynolds number calculations</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock
            title="Practical guidance"
            plainEnglish="Five formulas, five values, and the unit conversions you'll lean on most."
          >
            <p>
              <strong>Essential formulas:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>ρ = m/V</strong> — Density (kg/m³)
              </li>
              <li>
                <strong>P = F/A</strong> — Pressure definition (Pa)
              </li>
              <li>
                <strong>P = ρgh</strong> — Hydrostatic pressure (Pa)
              </li>
              <li>
                <strong>ν = μ/ρ</strong> — Kinematic viscosity (m²/s)
              </li>
              <li>
                <strong>Pabs = Pgauge + Patm</strong> — Pressure relationship
              </li>
            </ul>
            <p>
              <strong>Key values to remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Water density: <strong>~1000 kg/m³</strong>
              </li>
              <li>
                Atmospheric pressure: <strong>101.3 kPa = 1.013 bar</strong>
              </li>
              <li>
                10 m water column = <strong>~1 bar</strong>
              </li>
              <li>
                Water viscosity at 20°C: <strong>1.0 mPa·s</strong>
              </li>
              <li>
                g = <strong>9.81 m/s²</strong> (often use 10 for quick calcs)
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Confusing gauge and absolute</strong> — Know which your gauge reads
                </li>
                <li>
                  <strong>Forgetting temperature effects</strong> — Density and viscosity change with temperature
                </li>
                <li>
                  <strong>Ignoring static head</strong> — Critical in tall buildings
                </li>
                <li>
                  <strong>Using wrong viscosity type</strong> — Dynamic for shear, kinematic for Reynolds
                </li>
              </ul>
            }
            doInstead="Always note whether a gauge reads gauge or absolute, use the correct fluid temperature for property lookup, add static head when sizing components on lower floors, and pick dynamic vs kinematic viscosity based on what the formula needs."
          />

          <SectionRule />

          <Scenario
            title="Setting the static pressure for a 30-storey LTHW system"
            situation={
              <>
                You are commissioning the LTHW system in a 30-storey building. The plant
                room is in the basement; the highest emitter is on Level 28 (95 m above
                plant). You need to set the static pressure to keep all parts of the system
                pressurised above ~20 kPa to prevent air ingress and pump cavitation.
              </>
            }
            whatToDo={
              <>
                Calculate the static head: P = ρgh = 970 × 9.81 × 95 ≈ 904 kPa = 9.04 bar at
                the basement plant for the highest point to sit at zero. Add a safety margin
                (20-30 kPa) and account for system temperature (use 80 °C density). Set the
                expansion vessel pre-charge accordingly. Specify pipework, valves and gaskets
                rated to PN10 or PN16 as appropriate. Document the pressure budget on a
                pressure-elevation diagram for handover.
              </>
            }
            whyItMatters={
              <>
                Tall-building LTHW systems often hit pressure ratings as the design
                constraint. Get the static head wrong and you either under-pressurise (air
                in, cavitation) or over-pressurise (pipework rating breach, fitting failures).
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Density ρ (kg/m³): water 1000 at 4 °C, 970 at 80 °C — temperature matters in LTHW.',
              'Dynamic viscosity µ (Pa·s) and kinematic viscosity ν = µ/ρ (m²/s) — both fall sharply with temperature.',
              'Pressure: 1 bar = 100 kPa = 10⁵ Pa ≈ 10 m water head; gauge = absolute - atmospheric.',
              'Hydrostatic pressure: P = ρgh — depends only on density and depth, not container shape.',
              'Compressibility: water&rsquo;s bulk modulus is high (~2.2 GPa) — usually treated as incompressible in building services.',
              'Vapour pressure rises with temperature — drives cavitation risk on pump suction at high LTHW temperatures.',
              'CIBSE Guide C tables are the UK reference — interpolate to actual operating conditions.',
              'Pressure rating of pipework and components (PN6, PN10, PN16, PN25) must exceed the static + dynamic + safety margin maximum.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Fluid mechanics
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section2-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Flow characteristics
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule2Section2_1;
