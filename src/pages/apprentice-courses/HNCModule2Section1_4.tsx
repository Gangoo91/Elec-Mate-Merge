/**
 * Module 2 · Section 1 · Subsection 4 — U-Values and Thermal Resistance
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   Combined conduction-convection-radiation expressed as the U-value (W/m²·K). The single
 *   number that drives every fabric heat-loss calculation, every Part L compliance check
 *   and every SAP/SBEM model.
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

const TITLE = 'U-Values and Thermal Resistance - HNC Module 2 Section 1.4';
const DESCRIPTION =
  'Master U-value calculations and thermal resistance for building services: understanding heat loss through building elements, composite constructions, and Part L compliance.';

const quickCheckQuestions = [
  {
    id: 'u-value-definition',
    question: 'What does a U-value of 0.18 W/m²K mean?',
    options: [
      '0.18 m² of wall is needed for every watt of heat lost',
      '0.18 K of temperature difference produces 1 watt of heat flow',
      '0.18 watts pass through each m² for every 1K temperature difference',
      '0.18 watts are stored in each m² of the element',
    ],
    correctIndex: 2,
    explanation:
      'U-value represents the rate of heat transfer through a building element. 0.18 W/m²K means 0.18 watts of heat energy passes through each square metre of the element for every 1 Kelvin (or 1°C) temperature difference between inside and outside.',
  },
  {
    id: 'r-value-relationship',
    question: 'What is the relationship between U-value and total thermal resistance (RT)?',
    options: [
      'U = 1/RT',
      'U = RT × 2',
      'U = RT + Rsi + Rse',
      'U = RT²',
    ],
    correctIndex: 0,
    explanation:
      'U-value is the reciprocal of total thermal resistance: U = 1/RT. This means higher thermal resistance gives lower U-values (better insulation). RT includes all layer resistances plus surface resistances.',
  },
  {
    id: 'surface-resistance',
    question: 'What is the typical internal surface resistance (Rsi) for walls?',
    options: [
      '0.10 m²K/W',
      '0.13 m²K/W',
      '0.04 m²K/W',
      '0.17 m²K/W',
    ],
    correctIndex: 1,
    explanation:
      'The internal surface resistance (Rsi) for walls is 0.13 m²K/W. This accounts for the thin layer of still air at the surface and radiative heat transfer. External surface resistance (Rse) is typically 0.04 m²K/W due to wind effects.',
  },
  {
    id: 'part-l-wall',
    question: 'What is the limiting U-value for new external walls under Part L 2021?',
    options: [
      '0.26 W/m²K',
      '0.18 W/m²K',
      '0.30 W/m²K',
      '0.35 W/m²K',
    ],
    correctIndex: 0,
    explanation:
      'Part L 2021 (Conservation of fuel and power) sets a limiting U-value of 0.26 W/m²K for new external walls. This is a maximum - notional building specifications often target better values around 0.18 W/m²K.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the SI unit of U-value?',
    options: [
      'm²K/W',
      'W/m²K',
      'W/mK',
      'J/m²K',
    ],
    correctAnswer: 1,
    explanation:
      'U-value is measured in W/m²K (Watts per square metre per Kelvin). This represents the rate of heat transfer through 1m² of the element per degree temperature difference.',
  },
  {
    id: 2,
    question: 'A wall has a total thermal resistance of 5.0 m²K/W. What is its U-value?',
    options: [
      '0.50 W/m²K',
      '0.10 W/m²K',
      '0.20 W/m²K',
      '5.0 W/m²K',
    ],
    correctAnswer: 2,
    explanation:
      'U = 1/RT = 1/5.0 = 0.20 W/m²K. The U-value is simply the reciprocal of the total thermal resistance.',
  },
  {
    id: 3,
    question: 'How is the thermal resistance of a single homogeneous layer calculated?',
    options: [
      'R = λ/d',
      'R = λ × d',
      'R = d + λ',
      'R = d/λ',
    ],
    correctAnswer: 3,
    explanation:
      'R = d/λ where d is thickness in metres and λ (lambda) is thermal conductivity in W/mK. A thicker layer or lower conductivity gives higher resistance.',
  },
  {
    id: 4,
    question: 'Which building element typically has the worst (highest) U-value?',
    options: [
      'Windows',
      'Ground floor slab',
      'Insulated cavity wall',
      'Flat roof',
    ],
    correctAnswer: 0,
    explanation:
      'Windows typically have the highest U-values, often 1.4-2.0 W/m²K for double glazing. Even triple glazing rarely achieves below 0.8 W/m²K. This makes glazing a significant source of heat loss.',
  },
  {
    id: 5,
    question: 'What is the thermal conductivity (λ) of typical mineral wool insulation?',
    options: [
      '0.022 W/mK',
      '0.035 W/mK',
      '1.0 W/mK',
      '0.18 W/mK',
    ],
    correctAnswer: 1,
    explanation:
      'Mineral wool has a thermal conductivity of approximately 0.035-0.040 W/mK. PIR/PUR foam boards are better at around 0.022 W/mK. Lower values indicate better insulating properties.',
  },
  {
    id: 6,
    question: 'A 100mm layer of insulation has λ = 0.040 W/mK. What is its thermal resistance?',
    options: [
      '0.4 m²K/W',
      '4.0 m²K/W',
      '2.5 m²K/W',
      '40 m²K/W',
    ],
    correctAnswer: 2,
    explanation:
      'R = d/λ = 0.100/0.040 = 2.5 m²K/W. Always convert thickness to metres before calculating.',
  },
  {
    id: 7,
    question: 'What does Rse represent in U-value calculations?',
    options: [
      'Structural element resistance',
      'Solar exposure resistance',
      'Secondary element resistance',
      'External surface resistance',
    ],
    correctAnswer: 3,
    explanation:
      'Rse is the external surface resistance, accounting for the boundary layer effect and radiative heat transfer at the outside surface. Standard value is 0.04 m²K/W for exposed surfaces.',
  },
  {
    id: 8,
    question:
      'A wall has layers with R-values of 0.13, 0.45, 2.50, 0.10, and 0.04 m²K/W. What is the U-value?',
    options: [
      '0.31 W/m²K',
      '0.35 W/m²K',
      '0.28 W/m²K',
      '3.22 W/m²K',
    ],
    correctAnswer: 0,
    explanation:
      'RT = 0.13 + 0.45 + 2.50 + 0.10 + 0.04 = 3.22 m²K/W. U = 1/RT = 1/3.22 = 0.31 W/m²K',
  },
  {
    id: 9,
    question: 'What is the Part L 2021 limiting U-value for flat roofs?',
    options: [
      '0.11 W/m²K',
      '0.18 W/m²K',
      '0.16 W/m²K',
      '0.25 W/m²K',
    ],
    correctAnswer: 1,
    explanation:
      'Part L 2021 sets a limiting U-value of 0.18 W/m²K for flat roofs. Pitched roofs have the same limit. These are maximum allowable values - better performance is often required to meet overall building targets.',
  },
  {
    id: 10,
    question: 'Why is thermal bridging important in U-value assessments?',
    options: [
      'It improves the overall insulation performance',
      'It reduces condensation risk',
      'It creates localised areas of higher heat loss',
      'It is required for structural integrity',
    ],
    correctAnswer: 2,
    explanation:
      'Thermal bridges (cold bridges) are localised areas where heat bypasses insulation, creating higher heat loss and potential condensation. Common at junctions, around windows, and where structural elements penetrate insulation.',
  },
  {
    id: 11,
    question:
      'An office wall is 50m² with U = 0.25 W/m²K. Inside temp is 21°C, outside is 1°C. What is the heat loss rate?',
    options: [
      '125 W',
      '1000 W',
      '500 W',
      '250 W',
    ],
    correctAnswer: 3,
    explanation:
      'Q = U × A × ΔT = 0.25 × 50 × (21-1) = 0.25 × 50 × 20 = 250 W. This is the continuous rate of heat loss through this wall section.',
  },
  {
    id: 12,
    question: 'What R-value should be used for an unventilated cavity 25mm or greater?',
    options: [
      '0.18 m²K/W',
      '0.25 m²K/W',
      '0.04 m²K/W',
      '0.09 m²K/W',
    ],
    correctAnswer: 0,
    explanation:
      'An unventilated air cavity 25mm or greater has a thermal resistance of 0.18 m²K/W. This is due to still air being a reasonable insulator. Ventilated cavities have lower R-values due to air movement.',
  },
];

const faqs = [
  {
    question: 'What is the difference between U-value and R-value?',
    answer:
      'U-value measures overall heat transfer rate through a complete building element (W/m²K) - lower is better. R-value measures thermal resistance of individual layers or the total construction (m²K/W) - higher is better. They are reciprocals: U = 1/R. U-values are used for whole elements and building regulations; R-values are used in calculations to add up layer resistances.',
  },
  {
    question: 'Why do windows have such poor U-values compared to walls?',
    answer:
      'Glass has very high thermal conductivity (around 1.0 W/mK) and is typically only 4-6mm thick, giving minimal resistance. Double glazing improves this by trapping an insulating gas layer, achieving around 1.4 W/m²K. Triple glazing with low-e coatings and argon fill can reach 0.8 W/m²K, but this is still much worse than an insulated wall at 0.18-0.26 W/m²K.',
  },
  {
    question: 'How do I account for thermal bridging in calculations?',
    answer:
      'Thermal bridges require separate assessment using linear thermal transmittance (psi values, ψ) measured in W/mK. These are added to the basic element heat loss. Part L requires either accredited construction details (ACDs) with tabulated psi values, or numerical modelling. Common thermal bridges include window reveals, wall/floor junctions, and steel lintels penetrating insulation.',
  },
  {
    question: 'What happens if I exceed Part L limiting U-values?',
    answer:
      "Limiting U-values are maximum allowable values that cannot be exceeded for any individual element. If a wall exceeds 0.26 W/m²K, it fails compliance regardless of other building performance. However, meeting limiting values alone doesn't guarantee Part L compliance - the overall building must also meet target CO2 emission rates calculated using SAP or SBEM software.",
  },
  {
    question: 'How do I calculate U-values for ground floors?',
    answer:
      'Ground floors are more complex because heat flows through the ground, not directly to outside air. The calculation uses the floor perimeter-to-area ratio (P/A) and includes the thermal resistance of the ground itself. BS EN ISO 13370 provides the methodology. Typically, larger floors have better effective U-values because heat must travel further through the ground.',
  },
  {
    question: 'What is the difference between design U-value and in-situ U-value?',
    answer:
      "Design U-values are calculated from material properties assuming perfect construction. In-situ U-values are measured on completed buildings using heat flux sensors and often show 20-100% higher heat loss due to installation gaps, thermal bridging, moisture, and workmanship issues. This 'performance gap' is a significant industry concern.",
  },
];

const HNCModule2Section1_4 = () => {
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
            eyebrow="Module 2 · Section 1 · Subsection 4"
            title="U-Values and Thermal Resistance"
            description="Understanding heat transfer through building elements for energy-efficient design and Part L compliance."
            tone="purple"
          />

          <TLDR
            points={[
              'You will calculate the U-value of any building element from first principles using R-value addition (1/U = R_si + Σ(d/k) + R_se).',
              'You can read and reject manufacturer&rsquo;s &ldquo;ideal&rdquo; U-values that ignore thermal bridging — apply BS EN ISO 6946 corrections.',
              'You apply Part L target U-values for new and existing dwellings (and Part L2 for non-domestic) and the Limiting Fabric Standards.',
              'You feed U-values into SAP (domestic) or SBEM (non-domestic) and trace the Part L compliance back to the assembly drawing.',
            ]}
          />

          <RegsCallout
            source="Building Regulations 2010 — Approved Document L (limiting fabric U-values)"
            clause="The thermal performance of building fabric elements shall be no worse than the limiting standards set out in Approved Document L. For new dwellings (Part L1A 2021): wall ≤ 0.26 W/m²·K, roof ≤ 0.16 W/m²·K, floor ≤ 0.18 W/m²·K, window ≤ 1.6 W/m²·K (notional dwelling target U-values, indicative)."
            meaning={
              <>
                Part L sets minimum (limiting) standards and notional &ldquo;target&rdquo;
                values for the SAP / SBEM compliance calculation. As an HNC building services
                designer your fabric assumptions feed straight into the energy model and the
                Part L submission to Building Control.
              </>
            }
            cite="Source: Building Regulations 2010, Approved Document L (latest edition); BS EN ISO 6946 — calculation of thermal resistance and transmittance"
          />

          <LearningOutcomes
            outcomes={[
              'Define U-value and thermal resistance with correct SI units',
              'Calculate R-values for individual material layers',
              'Determine U-values for composite wall constructions',
              'Apply surface resistance values (Rsi and Rse)',
              'Understand Part L limiting U-values for building elements',
              'Calculate fabric heat loss for HVAC system sizing',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="U-Value Definition and Significance"
            plainEnglish="U-value is the rate at which heat leaks through one square metre of wall (or roof, or floor) for every 1°C of temperature difference. Lower number = better wall."
          >
            <p>
              The U-value (thermal transmittance) measures how effectively a building element
              transfers heat. It represents the rate of heat flow through one square metre of the
              element for each degree of temperature difference between inside and outside.
            </p>
            <p>
              <strong>Definition:</strong> U = Heat flow rate / (Area × Temperature difference).
              Unit: W/m²K (Watts per square metre per Kelvin).
            </p>
            <p>
              <strong>Key principles of U-values:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Lower is better:</strong> A U-value of 0.15 W/m²K loses less heat than 0.30 W/m²K
              </li>
              <li>
                <strong>Whole element:</strong> Includes all layers, air gaps, and surface effects
              </li>
              <li>
                <strong>Steady-state:</strong> Assumes constant temperatures (not transient behaviour)
              </li>
              <li>
                <strong>Perpendicular flow:</strong> Measures heat flow through the element, not along it
              </li>
            </ul>
            <p>
              <strong>Typical U-values for building elements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Solid brick wall (uninsulated): 2.0 W/m²K — very poor</li>
              <li>Cavity wall (unfilled): 1.5 W/m²K — poor</li>
              <li>Cavity wall (filled): 0.5 W/m²K — moderate</li>
              <li>Modern insulated wall: 0.18-0.25 W/m²K — good</li>
              <li>Passivhaus wall: 0.10-0.15 W/m²K — excellent</li>
              <li>Double glazed window: 1.4-2.0 W/m²K — moderate</li>
              <li>Triple glazed window: 0.8-1.2 W/m²K — good</li>
            </ul>
            <p>
              <strong>Remember:</strong> U-values are used directly in heat loss calculations: Q = U
              × A × ΔT (Watts).
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock
            title="Thermal Resistance (R-Values)"
            plainEnglish="R-value is the opposite of U-value — it's how much a layer resists heat flow. The big advantage: you can just add R-values for each layer, then take 1/R at the end to get the U-value."
          >
            <p>
              Thermal resistance (R-value) measures how well a material or layer resists heat flow.
              Unlike U-values, R-values can be simply added together when calculating total
              resistance of multi-layer constructions.
            </p>
            <p>
              <strong>R-value calculation:</strong> R = d / λ, where d = thickness (m) and λ =
              thermal conductivity (W/mK).
            </p>
            <p>
              <strong>Key facts about thermal resistance:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Higher is better:</strong> More resistance = less heat flow
              </li>
              <li>
                <strong>Additive:</strong> R-values of layers simply add together
              </li>
              <li>
                <strong>Unit:</strong> m²K/W (square metres Kelvin per Watt)
              </li>
              <li>
                <strong>Reciprocal of U:</strong> For the whole element, U = 1/RT
              </li>
            </ul>
            <p>
              <strong>Thermal conductivity of common materials (and R per 100mm):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>PIR/PUR foam board: λ = 0.022 W/mK (R ≈ 4.55 m²K/W per 100mm)</li>
              <li>Phenolic foam: λ = 0.020 W/mK (R ≈ 5.00 m²K/W per 100mm)</li>
              <li>Mineral wool: λ = 0.035-0.040 W/mK (R ≈ 2.50-2.86 m²K/W per 100mm)</li>
              <li>EPS (expanded polystyrene): λ = 0.032-0.038 W/mK (R ≈ 2.63-3.13 m²K/W per 100mm)</li>
              <li>Aerated concrete block: λ = 0.11 W/mK (R ≈ 0.91 m²K/W per 100mm)</li>
              <li>Dense concrete block: λ = 1.13 W/mK (R ≈ 0.09 m²K/W per 100mm)</li>
              <li>Brick: λ = 0.77 W/mK (R ≈ 0.13 m²K/W per 100mm)</li>
              <li>Plasterboard: λ = 0.21 W/mK (R ≈ 0.48 m²K/W per 100mm)</li>
              <li>Glass: λ = 1.00 W/mK (R ≈ 0.10 m²K/W per 100mm)</li>
            </ul>
            <p>
              <strong>Key insight:</strong> Insulation materials have λ values below 0.045 W/mK. The
              lower the conductivity, the better the insulator.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock
            title="Calculating U-Values for Composite Constructions"
            plainEnglish="Add up the R-values of every layer (plus the surface resistances), take the reciprocal, and that's your U-value. Six layers, one sum, one division — done."
          >
            <p>
              Real building elements comprise multiple layers. To find the U-value, calculate the
              thermal resistance of each layer, add them together with surface resistances, then
              take the reciprocal.
            </p>
            <p>
              <strong>Method:</strong> RT = Rsi + R1 + R2 + ... + Rn + Rse, then U = 1 / RT. Where
              Rsi = internal surface resistance and Rse = external surface resistance.
            </p>
            <p>
              <strong>Surface resistances (standard values):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Rsi (internal wall):</strong> 0.13 m²K/W
              </li>
              <li>
                <strong>Rse (external):</strong> 0.04 m²K/W
              </li>
              <li>
                <strong>Rsi (ceiling - upward):</strong> 0.10 m²K/W
              </li>
              <li>
                <strong>Rsi (floor - downward):</strong> 0.17 m²K/W
              </li>
            </ul>
            <p>
              <strong>Air cavity resistances:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Unventilated ≥25mm:</strong> 0.18 m²K/W
              </li>
              <li>
                <strong>Unventilated 5mm:</strong> 0.11 m²K/W
              </li>
              <li>
                <strong>Slightly ventilated:</strong> 0.09 m²K/W
              </li>
              <li>
                <strong>Highly ventilated:</strong> 0.00 m²K/W
              </li>
            </ul>
            <p>
              <strong>Worked example - cavity wall U-value:</strong> 102mm brick | 50mm cavity
              (mineral wool filled) | 100mm aerated concrete block | 12.5mm plasterboard.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>External surface (Rse): R = 0.04 m²K/W</li>
              <li>Brick outer leaf (102mm, λ = 0.77): R = 0.13 m²K/W</li>
              <li>Cavity (50mm mineral wool, λ = 0.035): R = 1.43 m²K/W</li>
              <li>Aerated concrete block (100mm, λ = 0.11): R = 0.91 m²K/W</li>
              <li>Plasterboard (12.5mm, λ = 0.21): R = 0.06 m²K/W</li>
              <li>Internal surface (Rsi): R = 0.13 m²K/W</li>
              <li>Total RT = <strong>2.70 m²K/W</strong></li>
              <li>U-value = 1/RT = 1/2.70 = <strong>0.37 W/m²K</strong></li>
              <li>Note: This exceeds Part L limiting value of 0.26 W/m²K - additional insulation required</li>
            </ul>
            <p>
              <strong>Design tip:</strong> Calculate required insulation thickness by working
              backwards from target U-value to find needed R-value.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock
            title="Part L Requirements and Building Services Applications"
            plainEnglish="Building Regs Part L sets the minimum U-values you have to hit on a new build. Designers go better than this for SAP/SBEM compliance — and to keep the heat-loss calc small enough to size a sensible heating system."
          >
            <p>
              Part L of the Building Regulations sets standards for conservation of fuel and power.
              U-values are fundamental to demonstrating compliance and are essential for sizing HVAC
              systems accurately.
            </p>
            <p>
              <strong>Part L 2021 limiting U-values (England):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>External walls: 0.26 W/m²K (new build) / 0.30 W/m²K (extension/renovation)</li>
              <li>Pitched roof (insulation at ceiling): 0.16 W/m²K</li>
              <li>Pitched roof (insulation at rafter): 0.18 W/m²K</li>
              <li>Flat roof: 0.18 W/m²K</li>
              <li>Ground floor: 0.18 W/m²K (new) / 0.25 W/m²K (extension/renovation)</li>
              <li>Windows, roof windows, doors: 1.6 W/m²K</li>
              <li>Swimming pool basin: 0.25 W/m²K</li>
            </ul>
            <p>
              <strong>Heat loss calculation for HVAC sizing:</strong> Qfabric = Σ(U × A × ΔT). Where
              Q = heat loss (W), A = area (m²), ΔT = temperature difference (K).
            </p>
            <p>
              <strong>Worked example - room heat loss:</strong> Calculate fabric heat loss for an
              office: 5m × 4m, ceiling height 2.7m, one external wall with window.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>External wall: 5m × 2.7m = 13.5m², U = 0.25 W/m²K</li>
              <li>Window in wall: 2m × 1.2m = 2.4m², U = 1.4 W/m²K</li>
              <li>Net wall area: 13.5 - 2.4 = 11.1m²</li>
              <li>Internal temp: 21°C, External temp: -3°C, ΔT = 24K</li>
              <li>Wall loss: Q = 0.25 × 11.1 × 24 = <strong>66.6 W</strong></li>
              <li>Window loss: Q = 1.4 × 2.4 × 24 = <strong>80.6 W</strong></li>
              <li>Total fabric loss = 66.6 + 80.6 = <strong>147.2 W</strong></li>
              <li>Note: Total heating load also includes ventilation heat loss and internal gains</li>
            </ul>
            <p>
              <strong>Thermal bridging considerations:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Window reveals:</strong> Insulation must wrap around to prevent cold spots
              </li>
              <li>
                <strong>Wall-floor junctions:</strong> Perimeter insulation critical
              </li>
              <li>
                <strong>Structural elements:</strong> Steel beams penetrating insulation layer
              </li>
              <li>
                <strong>Service penetrations:</strong> Pipes and cables through external envelope
              </li>
            </ul>
            <p>
              <strong>Building services impact:</strong> Better U-values reduce heating/cooling
              loads, allowing smaller HVAC systems, lower energy consumption, and reduced carbon
              emissions.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock
            title="Worked examples"
            plainEnglish="Three quick wins: working out insulation thickness backwards, checking a flat-roof build-up against Part L, and totting up the fabric loss for a small office."
          >
            <p>
              <strong>Example 1 - insulation thickness required:</strong> A wall needs to achieve U
              = 0.20 W/m²K. Current layers give RT = 1.2 m²K/W. What thickness of PIR insulation (λ
              = 0.022 W/mK) is needed?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Target RT = 1/U = 1/0.20 = 5.0 m²K/W</li>
              <li>Additional R needed = 5.0 - 1.2 = 3.8 m²K/W</li>
              <li>Using R = d/λ, rearranging: d = R × λ</li>
              <li>d = 3.8 × 0.022 = 0.0836m = <strong>84mm</strong></li>
              <li>Specify 90mm PIR board (standard size)</li>
            </ul>
            <p>
              <strong>Example 2 - roof U-value check:</strong> Flat roof construction: 150mm
              concrete deck | 120mm PIR | waterproof membrane. Does it meet Part L?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Rsi (ceiling, upward flow) = 0.10 m²K/W</li>
              <li>Concrete (λ = 1.13): R = 0.150/1.13 = 0.13 m²K/W</li>
              <li>PIR (λ = 0.022): R = 0.120/0.022 = 5.45 m²K/W</li>
              <li>Membrane: negligible</li>
              <li>Rse = 0.04 m²K/W</li>
              <li>RT = 0.10 + 0.13 + 5.45 + 0.04 = 5.72 m²K/W</li>
              <li>U = 1/5.72 = <strong>0.175 W/m²K</strong></li>
              <li>Meets Part L limit of 0.18 W/m²K for flat roofs</li>
            </ul>
            <p>
              <strong>Example 3 - total building heat loss:</strong> Calculate total fabric heat
              loss for a small office building. ΔT = 24K. Walls: 200m² at U = 0.25 W/m²K. Windows:
              40m² at U = 1.4 W/m²K. Roof: 150m² at U = 0.18 W/m²K. Floor: 150m² at U = 0.20 W/m²K.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Walls: 0.25 × 200 × 24 = 1,200 W</li>
              <li>Windows: 1.4 × 40 × 24 = 1,344 W</li>
              <li>Roof: 0.18 × 150 × 24 = 648 W</li>
              <li>Floor: 0.20 × 150 × 24 = 720 W</li>
              <li><strong>Total fabric loss = 3,912 W (3.9 kW)</strong></li>
              <li>Add ventilation loss (~2-3 kW) for total heating load</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="Practical guidance"
            plainEnglish="Formulas and numbers to memorise — the bare minimum to handle any U-value question."
          >
            <p>
              <strong>Essential formulas:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>R = d/λ</strong> — Thermal resistance of a layer
              </li>
              <li>
                <strong>RT = Rsi + ΣR + Rse</strong> — Total thermal resistance
              </li>
              <li>
                <strong>U = 1/RT</strong> — U-value from total resistance
              </li>
              <li>
                <strong>Q = U × A × ΔT</strong> — Heat loss through element
              </li>
              <li>
                <strong>d = R × λ</strong> — Required insulation thickness
              </li>
            </ul>
            <p>
              <strong>Key values to remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Rsi (walls): <strong>0.13 m²K/W</strong>
              </li>
              <li>
                Rse (external): <strong>0.04 m²K/W</strong>
              </li>
              <li>
                Air cavity ≥25mm: <strong>0.18 m²K/W</strong>
              </li>
              <li>
                Part L wall limit: <strong>0.26 W/m²K</strong>
              </li>
              <li>
                Part L roof limit: <strong>0.18 W/m²K</strong>
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Forgetting surface resistances</strong> — Always include Rsi and Rse
                </li>
                <li>
                  <strong>Wrong units</strong> — Thickness must be in metres, not mm
                </li>
                <li>
                  <strong>Confusing U and R</strong> — Lower U is better, higher R is better
                </li>
                <li>
                  <strong>Ignoring thermal bridges</strong> — Real buildings have junctions and penetrations
                </li>
              </ul>
            }
            doInstead="Always start with Rsi + Rse, work in metres, double-check whether you're tracking U or R, and add 10-15% for thermal bridges if a quick check is all you've got."
          />

          <SectionRule />

          <Scenario
            title="Specifying a wall build-up to hit the Part L target"
            situation={
              <>
                A new-build dwelling needs an external wall achieving U ≤ 0.18 W/m²·K (better
                than the limiting standard, to balance other elements in the SAP calculation).
                The proposed build-up is brick / 100 mm cavity / 100 mm aerated block / 25 mm
                plasterboard.
              </>
            }
            whatToDo={
              <>
                Calculate the as-drawn U from R values: R_si (0.13) + R_brick (0.05) +
                R_cavity (0.18 unfilled) + R_block (0.55) + R_plaster (0.05) + R_se (0.04) =
                1.0, U = 1.0 W/m²·K. That misses by a factor of 5. Fill cavity with 100 mm
                full-fill mineral wool (R 2.7), refigure: U ≈ 0.27 W/m²·K. Still over.
                Increase to 150 mm partial-fill PIR (R 6.8) within a wider cavity, refigure: U
                ≈ 0.16 W/m²·K. Pass. Add the BS EN ISO 6946 correction for wall ties (~5%) and
                document on the SAP submission.
              </>
            }
            whyItMatters={
              <>
                The first-pass &ldquo;clear cavity&rdquo; build-up is a Part L failure that
                would be caught by Building Control before sign-off. Iterating early avoids
                a re-design when foundations are in.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'U-value (W/m²·K) is heat flow per unit area per unit temperature difference — the inverse of the total R.',
              'Calculation: 1/U = R_si + Σ(d/k) + R_air gap + R_se — surface resistances + layer resistances + air gap.',
              'Surface resistances from BS EN ISO 6946: R_si ≈ 0.13 (internal), R_se ≈ 0.04 (external) for vertical walls.',
              'Each layer contributes R = d/k — high-k materials add little, low-k materials add a lot.',
              'BS EN ISO 6946 corrections: thermal bridging (wall ties, fasteners), air gaps, mechanical fixings — typically 5-10% adjustment.',
              'Part L 2021 limiting fabric U-values: wall 0.26, roof 0.16, floor 0.18, window 1.6 W/m²·K (dwellings).',
              'Notional dwelling U-values (for SAP target) are tighter than the limiting values.',
              'Glazing U-value depends on assembly (frame + glass + gas fill + spacer) — single number from BS EN ISO 10077.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section1-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Radiation
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section1-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Thermal bridging
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule2Section1_4;
