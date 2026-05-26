/**
 * Module 2 · Section 3 · Subsection 1 — Air Composition and Properties
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   Composition of dry/moist air, ideal gas law, density and specific heat — the
 *   numerical foundation for every AHU, heating coil and ventilation calculation
 *   on a building services project.
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
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Air Composition and Properties - HNC Module 2 Section 3.1';
const DESCRIPTION =
  'Master the composition of dry air and water vapour mixtures, ideal gas laws, air density calculations and specific heat capacity for HVAC system design.';

const quickCheckQuestions = [
  {
    id: 'air-nitrogen',
    question: 'What is the approximate percentage of nitrogen in dry air by volume?',
    options: [
      '78%',
      '58%',
      '21%',
      '99%',
    ],
    correctIndex: 0,
    explanation:
      'Dry air is approximately 78% nitrogen by volume. Oxygen makes up about 21%, with the remaining 1% being argon, carbon dioxide and trace gases.',
  },
  {
    id: 'ideal-gas',
    question: 'Which gas constant (R) is used for dry air in ideal gas calculations?',
    options: [
      '1005 J/kg·K',
      '8.314 J/mol·K',
      '287 J/kg·K',
      '461 J/kg·K',
    ],
    correctIndex: 2,
    explanation:
      'The specific gas constant for dry air is 287 J/kg·K. This is derived from the universal gas constant (8.314 J/mol·K) divided by the molar mass of air (0.02897 kg/mol).',
  },
  {
    id: 'air-density',
    question: 'What is the approximate density of dry air at 20°C and atmospheric pressure?',
    options: [
      '1.5 kg/m³',
      '0.8 kg/m³',
      '1.2 kg/m³',
      '1.0 kg/m³',
    ],
    correctIndex: 2,
    explanation:
      'Dry air at 20°C (293K) and 101.325 kPa has a density of approximately 1.2 kg/m³. Using ρ = P/(RT) = 101325/(287 × 293) = 1.205 kg/m³.',
  },
  {
    id: 'specific-heat',
    question: 'What is the specific heat capacity of dry air at constant pressure (cp)?',
    options: [
      '718 J/kg·K',
      '287 J/kg·K',
      '1005 J/kg·K',
      '1860 J/kg·K',
    ],
    correctIndex: 2,
    explanation:
      'The specific heat capacity of dry air at constant pressure is approximately 1005 J/kg·K (or 1.005 kJ/kg·K). This value is essential for sensible heat calculations in HVAC.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which component makes up approximately 21% of dry air by volume?',
    options: [
      'Nitrogen',
      'Oxygen',
      'Argon',
      'Carbon dioxide',
    ],
    correctAnswer: 1,
    explanation:
      'Oxygen makes up approximately 21% of dry air by volume. This is essential for combustion and respiration processes considered in building ventilation design.',
  },
  {
    id: 2,
    question: "The ideal gas law equation is PV = mRT. What does 'R' represent?",
    options: [
      'As close as possible to the inductive load',
      'Safety glasses and dust mask',
      'Specific gas constant for the gas',
      'Rework, delays, or damaged installations',
    ],
    correctAnswer: 2,
    explanation:
      'In the form PV = mRT, R is the specific gas constant for the particular gas. For dry air, R = 287 J/kg·K.',
  },
  {
    id: 3,
    question: 'Calculate the density of air at 25°C and 101.325 kPa using ρ = P/(RT).',
    options: [
      '1.284 kg/m³',
      '1.084 kg/m³',
      '1.384 kg/m³',
      '1.184 kg/m³',
    ],
    correctAnswer: 3,
    explanation:
      'ρ = P/(RT) = 101325/(287 × 298) = 101325/85526 = 1.184 kg/m³. Note: Temperature must be in Kelvin (25 + 273 = 298K).',
  },
  {
    id: 4,
    question:
      'Why does moist air have a lower density than dry air at the same temperature and pressure?',
    options: [
      'Water vapour molecules displace heavier nitrogen and oxygen molecules',
      '50-65 percent of the socket-circuit nameplate aggregate, depending on equipment mix.',
      'Check status indicator shows device is functional',
      'A mandatory inspection for AC systems over 12kW, assessing efficiency and sizing',
    ],
    correctAnswer: 0,
    explanation:
      'Water vapour (M = 18 g/mol) is lighter than nitrogen (M = 28 g/mol) and oxygen (M = 32 g/mol). When water vapour displaces these heavier molecules, the mixture becomes less dense.',
  },
  {
    id: 5,
    question: 'What is the specific gas constant for water vapour?',
    options: [
      '378 J/kg·K',
      '461 J/kg·K',
      '718 J/kg·K',
      '287 J/kg·K',
    ],
    correctAnswer: 1,
    explanation:
      "The specific gas constant for water vapour is 461 J/kg·K. This higher value (compared to dry air's 287 J/kg·K) reflects water's lower molecular mass.",
  },
  {
    id: 6,
    question: 'Atmospheric pressure at sea level is approximately:',
    options: [
      '100 kPa',
      '1013.25 kPa',
      '101.325 kPa',
      '10.1325 kPa',
    ],
    correctAnswer: 2,
    explanation:
      'Standard atmospheric pressure at sea level is 101.325 kPa (or 1013.25 mbar, or 760 mmHg). This is the reference pressure for most HVAC calculations.',
  },
  {
    id: 7,
    question: 'How does air density change with increasing altitude?',
    options: [
      'Density increases',
      'Density first increases then decreases',
      'Density remains constant',
      'Density decreases',
    ],
    correctAnswer: 3,
    explanation:
      'Air density decreases with altitude because atmospheric pressure decreases. At 1500m elevation, air density is approximately 15% lower than at sea level.',
  },
  {
    id: 8,
    question: 'The ratio of specific heats (γ = cp/cv) for air is approximately:',
    options: [
      '1.4',
      '1.6',
      '1.0',
      '1.2',
    ],
    correctAnswer: 0,
    explanation:
      'For dry air, γ = cp/cv = 1005/718 = 1.4. This ratio is important for compressible flow calculations and understanding adiabatic processes.',
  },
  {
    id: 9,
    question: 'What is the molecular mass of dry air?',
    options: [
      '18 g/mol',
      '29 g/mol',
      '28 g/mol',
      '32 g/mol',
    ],
    correctAnswer: 1,
    explanation:
      'Dry air has an effective molecular mass of approximately 29 g/mol (28.97 g/mol), weighted by the proportions of nitrogen, oxygen and other gases.',
  },
  {
    id: 10,
    question:
      'An air handling unit supplies 5000 litres/s of air at 20°C. What is the mass flow rate?',
    options: [
      '5.0 kg/s',
      '5.5 kg/s',
      '6.0 kg/s',
      '6.5 kg/s',
    ],
    correctAnswer: 2,
    explanation:
      'At 20°C, air density ≈ 1.2 kg/m³. Volume flow = 5000 l/s = 5 m³/s. Mass flow = ρ × V̇ = 1.2 × 5 = 6.0 kg/s.',
  },
  {
    id: 11,
    question: 'Which factor does NOT affect air density?',
    options: [
      'Temperature',
      'Pressure',
      'Humidity',
      'Air velocity',
    ],
    correctAnswer: 3,
    explanation:
      'Air velocity does not affect density - it affects the kinetic energy and pressure distribution in moving air, but not the mass per unit volume.',
  },
  {
    id: 12,
    question: 'The specific heat at constant volume (cv) for dry air is approximately:',
    options: [
      '718 J/kg·K',
      '1860 J/kg·K',
      '287 J/kg·K',
      '1005 J/kg·K',
    ],
    correctAnswer: 0,
    explanation:
      'cv for dry air is approximately 718 J/kg·K. The relationship cp - cv = R gives: 1005 - 718 = 287 J/kg·K (the gas constant).',
  },
];

const faqs = [
  {
    question: 'Why do we treat air as an ideal gas in HVAC calculations?',
    answer:
      'At typical HVAC operating conditions (atmospheric pressure, -10°C to 50°C), air behaves very close to an ideal gas with less than 1% deviation. This simplification allows us to use straightforward equations like PV = mRT without significant error, making calculations practical for engineering design.',
  },
  {
    question: 'How does humidity affect air density?',
    answer:
      'Contrary to intuition, humid air is less dense than dry air at the same temperature and pressure. Water vapour molecules (H₂O, M = 18) are lighter than nitrogen (N₂, M = 28) and oxygen (O₂, M = 32). When water vapour displaces these heavier molecules, the overall air density decreases.',
  },
  {
    question: 'Why is the 1.2 kg/m³ value commonly used for air density?',
    answer:
      'The value 1.2 kg/m³ is a convenient approximation for standard conditions (20°C, 101.325 kPa, 50% RH). It is accurate enough for most HVAC preliminary calculations and equipment sizing. For precise work, calculate density using actual conditions.',
  },
  {
    question: 'What is the difference between mass flow rate and volume flow rate?',
    answer:
      'Volume flow rate (m³/s or l/s) measures the volume of air passing a point per unit time. Mass flow rate (kg/s) measures the actual mass of air. Because air density changes with temperature and pressure, mass flow rate is preferred for heat transfer calculations as it remains constant through a system regardless of temperature changes.',
  },
  {
    question: 'Why is cp used instead of cv in most HVAC calculations?',
    answer:
      'In HVAC systems, air flows through open systems where pressure remains approximately constant (atmospheric). Under constant pressure conditions, the specific heat at constant pressure (cp = 1005 J/kg·K) applies. cv is used for closed systems with constant volume, which is rare in HVAC.',
  },
  {
    question: 'How do I convert between different pressure units?',
    answer:
      'Common conversions: 1 bar = 100 kPa = 1000 mbar. 1 atm = 101.325 kPa = 1013.25 mbar = 760 mmHg. For HVAC work in the UK, kPa and mbar are most commonly used, with Pascal (Pa) for smaller pressure differences.',
  },
];

const HNCModule2Section3_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 2 · Section 3 · Subsection 1"
            title="Air Composition and Properties"
            description="Understanding the fundamental properties of air for HVAC system design and psychrometric analysis."
            tone="purple"
          />

          <TLDR
            points={[
              'You can state dry-air composition (78% N₂, 21% O₂) and use M = 28.97 g/mol when interrogating manufacturers&rsquo; psychrometric data.',
              'You apply the ideal gas law PV = mRT (with R = 287 J/kg·K for dry air) to derive density at any temperature, pressure or altitude on a building services project.',
              'You convert between volume flow (l/s, m³/s) and mass flow (kg/s) using ρ = P/(RT) — the bridge between fan duty schedules and coil-load calculations.',
              'You apply cp = 1005 J/kg·K to size sensible heating and cooling loads, and recognise where altitude correction (above ~500 m) changes the answer.',
            ]}
          />

          <RegsCallout
            source="CIBSE Guide A — Environmental Design (latest edition)"
            clause="Recommended internal design conditions, air densities, and specific heat values used for HVAC sizing in UK building services."
            meaning={
              <>
                CIBSE Guide A is the UK reference for the property values you plug into
                ideal-gas and sensible-heat equations. When your client or BMS data uses
                different reference conditions, document the source so the calculation
                is auditable in the project Operation &amp; Maintenance manual.
              </>
            }
            cite="Source: CIBSE Guide A — Environmental Design (latest edition); CIBSE Guide C — Reference Data."
          />

          <LearningOutcomes
            outcomes={[
              'State the composition of dry atmospheric air',
              'Apply the ideal gas law to air property calculations',
              'Calculate air density at various conditions',
              'Understand the effect of moisture on air properties',
              'Convert between mass and volume flow rates',
              'Apply specific heat values to heat transfer calculations',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="Composition of Dry Air"
            plainEnglish="Dry air is mostly nitrogen and oxygen, with a sprinkle of argon, CO₂ and trace gases. Knowing the mix matters for density, ventilation and combustion calcs."
          >
            <p>
              Dry air is a mixture of gases that exists naturally in the atmosphere. Understanding
              its composition is fundamental to psychrometric calculations and HVAC system design.
            </p>
            <p>
              <strong>Dry Air Composition by Volume:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Nitrogen (N₂):</strong> 78.09% by volume, molecular mass 28.01 g/mol
              </li>
              <li>
                <strong>Oxygen (O₂):</strong> 20.95% by volume, molecular mass 32.00 g/mol
              </li>
              <li>
                <strong>Argon (Ar):</strong> 0.93% by volume, molecular mass 39.95 g/mol
              </li>
              <li>
                <strong>Carbon dioxide (CO₂):</strong> 0.04% by volume, molecular mass 44.01 g/mol
              </li>
              <li>
                <strong>Trace gases (Ne, He, etc.):</strong> &lt;0.01% by volume, various molecular
                masses
              </li>
            </ul>
            <p>
              <strong>Key point:</strong> The effective molecular mass of dry air is 28.97 g/mol
              (often rounded to 29 g/mol), calculated from the weighted average of its components.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock
            title="Ideal Gas Laws for Air"
            plainEnglish="Pressure, volume, mass and temperature are all linked by one equation. Stick to absolute units (Pa and Kelvin) and you'll never go wrong."
          >
            <p>
              At typical HVAC operating conditions, air behaves as an ideal gas. This allows us to
              use simple equations relating pressure, volume, temperature and mass.
            </p>
            <p>
              <strong>The Ideal Gas Equation:</strong> PV = mRT
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>P = absolute pressure (Pa)</li>
              <li>V = volume (m³)</li>
              <li>m = mass (kg)</li>
              <li>R = specific gas constant (J/kg·K)</li>
              <li>T = absolute temperature (K)</li>
            </ul>
            <p>
              <strong>Gas Constants:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Dry air:</strong> R = 287 J/kg·K
              </li>
              <li>
                <strong>Water vapour:</strong> R = 461 J/kg·K
              </li>
              <li>
                <strong>Universal:</strong> R̄ = 8.314 J/mol·K
              </li>
            </ul>
            <p>
              <strong>Alternative Forms:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>ρ = P / (RT) — for density</li>
              <li>Pv = RT — specific volume form</li>
              <li>P₁V₁/T₁ = P₂V₂/T₂ — process form</li>
            </ul>
            <p>
              <strong>Remember:</strong> Always use absolute temperature (Kelvin) and absolute
              pressure (Pa or kPa) in gas law calculations. K = °C + 273.15
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock
            title="Air Density Calculations"
            plainEnglish="Hot air is thinner. Cold air is heavier. Pressure pulls density up, temperature pulls it down. ρ = P/(RT) tells you how much air you've actually got."
          >
            <p>
              Air density is crucial for converting between volume and mass flow rates, fan
              selection, and understanding buoyancy effects in buildings.
            </p>
            <p>
              <strong>Density Equation:</strong> ρ = P / (R × T), where ρ is density in kg/m³
            </p>
            <p>
              <strong>Air Density at Various Temperatures (at 101.325 kPa):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>0°C (273K):</strong> Density 1.293 kg/m³, specific volume 0.773 m³/kg
              </li>
              <li>
                <strong>10°C (283K):</strong> Density 1.247 kg/m³, specific volume 0.802 m³/kg
              </li>
              <li>
                <strong>20°C (293K):</strong> Density 1.205 kg/m³, specific volume 0.830 m³/kg
              </li>
              <li>
                <strong>25°C (298K):</strong> Density 1.184 kg/m³, specific volume 0.845 m³/kg
              </li>
              <li>
                <strong>30°C (303K):</strong> Density 1.165 kg/m³, specific volume 0.858 m³/kg
              </li>
            </ul>
            <p>
              <strong>Factors affecting air density:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Temperature:</strong> Higher temperature = lower density (inverse
                relationship)
              </li>
              <li>
                <strong>Pressure:</strong> Higher pressure = higher density (direct relationship)
              </li>
              <li>
                <strong>Humidity:</strong> More moisture = lower density (water vapour is lighter)
              </li>
              <li>
                <strong>Altitude:</strong> Higher altitude = lower pressure = lower density
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock
            title="Specific Heat Capacity"
            plainEnglish="cp tells you how much energy it takes to warm a kilo of air by one degree. It's the number you reach for every time you size a heating or cooling load."
          >
            <p>
              Specific heat capacity determines how much energy is required to change the
              temperature of air. This is fundamental to all HVAC heating and cooling calculations.
            </p>
            <p>
              <strong>Specific Heat Values for Dry Air and Water Vapour:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Specific heat (constant pressure), cp:</strong> Dry air 1005 J/kg·K, water
                vapour 1860 J/kg·K
              </li>
              <li>
                <strong>Specific heat (constant volume), cv:</strong> Dry air 718 J/kg·K, water
                vapour 1399 J/kg·K
              </li>
              <li>
                <strong>Ratio of specific heats, γ = cp/cv:</strong> Dry air 1.40, water vapour 1.33
              </li>
              <li>
                <strong>Gas constant, R:</strong> Dry air 287 J/kg·K, water vapour 461 J/kg·K
              </li>
            </ul>
            <p>
              <strong>Sensible Heat Equation:</strong> Q̇ = ṁ × cp × ΔT
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Q̇ = heat transfer rate (W or kW)</li>
              <li>ṁ = mass flow rate (kg/s)</li>
              <li>cp = specific heat (J/kg·K or kJ/kg·K)</li>
              <li>ΔT = temperature change (K or °C)</li>
            </ul>
            <p>
              <strong>Note:</strong> For moist air, the effective specific heat is slightly higher
              due to the water vapour content. A typical value of 1.02 kJ/kg·K is often used for
              humid air in HVAC calculations.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock
            title="Worked examples"
            plainEnglish="Same equations, real numbers. Density, mass flow, heating load, altitude correction."
          >
            <p>
              <strong>Example 1: Calculating Air Density.</strong> Calculate the density of dry air
              at 35°C and 101.325 kPa.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Given: T = 35°C = 308K, P = 101325 Pa, R = 287 J/kg·K</li>
              <li>Using: ρ = P / (R × T)</li>
              <li>ρ = 101325 / (287 × 308) = 101325 / 88396</li>
              <li>
                ρ = <strong>1.146 kg/m³</strong>
              </li>
              <li>Note: Lower than 1.2 kg/m³ due to higher temperature</li>
            </ul>
            <p>
              <strong>Example 2: Mass Flow Rate Conversion.</strong> An AHU delivers 8500 l/s at
              15°C. Calculate the mass flow rate.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Step 1: Calculate air density at 15°C. T = 15 + 273 = 288K</li>
              <li>ρ = 101325 / (287 × 288) = 1.226 kg/m³</li>
              <li>Step 2: Convert volume flow to m³/s. V̇ = 8500 l/s = 8.5 m³/s</li>
              <li>
                Step 3: Calculate mass flow. ṁ = ρ × V̇ = 1.226 × 8.5 ={' '}
                <strong>10.42 kg/s</strong>
              </li>
            </ul>
            <p>
              <strong>Example 3: Heating Coil Capacity.</strong> Calculate the heating capacity
              required to raise 5 kg/s of air from 10°C to 22°C.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Given: ṁ = 5 kg/s, T₁ = 10°C, T₂ = 22°C, cp = 1.005 kJ/kg·K</li>
              <li>Using: Q̇ = ṁ × cp × ΔT</li>
              <li>Q̇ = 5 × 1.005 × (22 - 10) = 5 × 1.005 × 12</li>
              <li>
                Q̇ = <strong>60.3 kW</strong>
              </li>
            </ul>
            <p>
              <strong>Example 4: Altitude Correction.</strong> A building is at 600m elevation where
              pressure is 94.3 kPa. Calculate air density at 20°C.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Given: P = 94300 Pa, T = 293K, R = 287 J/kg·K</li>
              <li>ρ = P / (R × T) = 94300 / (287 × 293) = 94300 / 84091</li>
              <li>
                ρ = <strong>1.121 kg/m³</strong>
              </li>
              <li>This is 7% less than sea level (1.205 kg/m³). Fan capacity must be increased
              accordingly.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="Practical guidance"
            plainEnglish="The handful of formulas and standard values you'll need on every job."
          >
            <p>
              <strong>Essential Formulas:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>PV = mRT</strong> — Ideal gas law
              </li>
              <li>
                <strong>ρ = P/(RT)</strong> — Air density
              </li>
              <li>
                <strong>ṁ = ρV̇</strong> — Mass flow rate
              </li>
              <li>
                <strong>Q̇ = ṁcpΔT</strong> — Sensible heat
              </li>
              <li>
                <strong>K = °C + 273</strong> — Temperature conversion
              </li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Dry air R = <strong>287 J/kg·K</strong>
              </li>
              <li>
                Dry air cp = <strong>1005 J/kg·K</strong>
              </li>
              <li>
                Standard density = <strong>1.2 kg/m³</strong> (at 20°C)
              </li>
              <li>
                Standard pressure = <strong>101.325 kPa</strong>
              </li>
              <li>
                Air composition = <strong>78% N₂, 21% O₂</strong>
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Using °C in gas law:</strong> Always convert to Kelvin
                </li>
                <li>
                  <strong>Wrong units:</strong> Pa not kPa, J not kJ in base formula
                </li>
                <li>
                  <strong>Ignoring altitude:</strong> Significant above 500m elevation
                </li>
                <li>
                  <strong>Confusing cp and cv:</strong> Use cp for open flow systems
                </li>
              </ul>
            }
            doInstead="Convert temperatures to Kelvin first, keep units consistent (Pa and J in the base form), apply altitude corrections above 500m, and use cp (not cv) for any open flow HVAC calculation."
          />

          <SectionRule />

          <Scenario
            title="Sizing the supply fan and pre-heat coil for a new office AHU"
            situation={
              <>
                You are sizing a 100% fresh-air AHU for a 1,200 m² office. The mechanical
                schedule asks for 8 l/s per person at 80 occupants — 6,400 l/s of outside
                air at -3 °C UK winter design — to be tempered to 18 °C before reaching
                the heat-recovery wheel.
              </>
            }
            whatToDo={
              <>
                Calculate density at -3 °C and 101.325 kPa using ρ = P/(RT). Convert volume
                flow to mass flow (ṁ = ρ × V̇). Apply the sensible heat equation
                Q̇ = ṁ × cp × ΔT with cp = 1.005 kJ/kg·K. Add a 10% margin for fan
                heat gain and duct losses. Cross-check against the CIBSE Guide B simplified
                method.
              </>
            }
            whyItMatters={
              <>
                Treating air at 1.2 kg/m³ regardless of temperature understates winter coil
                duty by ~7%. The plant trips on cold morning starts, the building can&rsquo;t
                hit the BMS setpoint, and the contractor swallows a free coil upgrade in
                year one. The ideal-gas calculation gives the defendable design figure.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Dry air ≈ 78% N₂, 21% O₂, 1% Ar/CO₂ — effective M = 28.97 g/mol.',
              'Ideal gas law PV = mRT applies to HVAC air with under 1% error at atmospheric conditions.',
              'Specific gas constants: dry air R = 287 J/kg·K; water vapour R = 461 J/kg·K.',
              'Density ρ = P/(RT) — always use Kelvin and absolute pressure (Pa).',
              'Standard density 1.2 kg/m³ at 20 °C — drops with temperature, humidity, and altitude.',
              'cp(air) = 1005 J/kg·K is the workhorse for sensible heat calculations: Q̇ = ṁ × cp × ΔT.',
              'Mass flow rate (kg/s) is invariant through a system — preferred over volume flow for energy balance.',
              'Above 500 m elevation, apply altitude correction to fan duty and coil load calculations.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Psychrometrics
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section3-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Humidity and Moisture Content
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule2Section3_1;
