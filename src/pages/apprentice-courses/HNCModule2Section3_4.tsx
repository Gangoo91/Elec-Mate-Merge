/**
 * Module 2 · Section 3 · Subsection 4 — Air Conditioning Processes
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   Sensible heating and cooling, humidification, dehumidification and air mixing —
 *   the four canonical AHU processes the HNC engineer specifies, sizes and verifies
 *   on commercial HVAC projects.
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

const TITLE = 'Air Conditioning Processes - HNC Module 2 Section 3.4';
const DESCRIPTION =
  'Master sensible heating and cooling, humidification, dehumidification and air mixing processes for HVAC design with psychrometric chart plotting.';

const quickCheckQuestions = [
  {
    id: 'sensible-heating',
    question: 'During sensible heating, which property remains constant?',
    options: [
      'Dry bulb temperature',
      'Moisture content (g/kg)',
      'Relative humidity',
      'Enthalpy',
    ],
    correctIndex: 1,
    explanation:
      'Sensible heating adds heat without adding or removing moisture. The moisture content (g/kg) stays constant while dry bulb temperature increases and RH decreases.',
  },
  {
    id: 'dehumidification',
    question: 'What must happen for dehumidification to occur at a cooling coil?',
    options: [
      "That the switch operates and makes/breaks the circuit",
      "Waste and Resources Action Programme",
      "To minimise neutral current and prevent overloading",
      "Coil surface must be below the air's dew point",
    ],
    correctIndex: 3,
    explanation:
      'Dehumidification only occurs when the coil surface temperature is below the dew point of the incoming air, causing water vapour to condense on the coil surface.',
  },
  {
    id: 'adiabatic-humidification',
    question: 'In adiabatic humidification (evaporative cooling), what happens to enthalpy?',
    options: [
      'Enthalpy increases significantly',
      'Enthalpy remains approximately constant',
      'Enthalpy becomes zero',
      'Enthalpy decreases significantly',
    ],
    correctIndex: 1,
    explanation:
      'In adiabatic humidification, sensible heat from the air provides the latent heat for evaporation. Total enthalpy remains nearly constant while dry bulb drops and moisture content rises.',
  },
  {
    id: 'mixing-ratio',
    question: 'When mixing 2 kg/s of air at 30°C with 3 kg/s at 20°C, the mixed temperature is:',
    options: [
      '25°C',
      '24°C',
      '22°C',
      '26°C',
    ],
    correctIndex: 1,
    explanation:
      'Mixed temperature = (2×30 + 3×20)/(2+3) = (60+60)/5 = 120/5 = 24°C. The mixture is weighted toward the larger mass flow.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Sensible heat transfer affects which property?',
    options: [
      'Only moisture content',
      'Only temperature',
      'Both temperature and moisture content',
      'Neither temperature nor moisture content',
    ],
    correctAnswer: 1,
    explanation:
      'Sensible heat transfer changes temperature only. It does not add or remove moisture from the air. Latent heat transfer changes moisture content.',
  },
  {
    id: 2,
    question: 'The sensible heat ratio (SHR) is defined as:',
    options: [
      'Sensible heat / Latent heat',
      'Latent heat / Total heat',
      'Sensible heat / Total heat',
      'Total heat / Sensible heat',
    ],
    correctAnswer: 2,
    explanation:
      'SHR = Sensible heat / Total heat = Qs / (Qs + QL). A high SHR (near 1.0) indicates mostly temperature change; a low SHR indicates significant moisture removal.',
  },
  {
    id: 3,
    question: 'On a psychrometric chart, sensible cooling appears as:',
    options: [
      'Diagonal movement toward saturation',
      'Vertical movement downward',
      'Circular path',
      'Horizontal movement to the left',
    ],
    correctAnswer: 3,
    explanation:
      'Sensible cooling moves the state point horizontally to the left (lower dry bulb, same moisture content). RH increases but no moisture is removed.',
  },
  {
    id: 4,
    question: 'Steam humidification on a psychrometric chart appears as:',
    options: [
      'Vertical line upward (nearly)',
      'Horizontal line to the right',
      'Diagonal along wet bulb line',
      'Horizontal line to the left',
    ],
    correctAnswer: 0,
    explanation:
      'Steam humidification adds moisture with minimal temperature change, appearing as a near-vertical line upward. Some sensible heat may be added depending on steam temperature.',
  },
  {
    id: 5,
    question: 'What is the primary advantage of adiabatic (evaporative) humidification?',
    options: [
      'Vertical line upward (nearly)',
      'No energy input required beyond fan power',
      'It heats the air while removing moisture',
      'On a straight line between the two states',
    ],
    correctAnswer: 1,
    explanation:
      "Adiabatic humidification uses the air's sensible heat for evaporation, requiring no external heating energy. It is energy-efficient but limited by saturation.",
  },
  {
    id: 6,
    question: 'Cooling with dehumidification requires the coil to operate:',
    options: [
      'Above the air dew point',
      'At exactly the air dew point',
      'Below the air dew point',
      'At any temperature below dry bulb',
    ],
    correctAnswer: 2,
    explanation:
      "For dehumidification, the coil surface must be below the entering air's dew point. Only then will moisture condense from the air onto the coil.",
  },
  {
    id: 7,
    question: 'The sensible heat equation for air is:',
    options: [
      'Qs = ṁ × g × hfg',
      'Qs = V̇ × ΔP',
      'Qs = ṁ × Δg',
      'Qs = ṁ × cp × ΔT',
    ],
    correctAnswer: 3,
    explanation:
      'Qs = ṁ × cp × ΔT where ṁ is mass flow (kg/s), cp is specific heat (1.005 kJ/kg·K for air), and ΔT is temperature change (K or °C).',
  },
  {
    id: 8,
    question: 'The latent heat equation for humidification/dehumidification is:',
    options: [
      'QL = ṁ × Δg × hfg',
      'QL = V̇ × Δρ',
      'QL = ṁ × cp × ΔT',
      'QL = ṁ × Δh',
    ],
    correctAnswer: 0,
    explanation:
      'QL = ṁ × Δg × hfg where Δg is change in moisture content (kg/kg) and hfg is latent heat of vaporisation (~2501 kJ/kg at 0°C, or ~2450 kJ/kg at typical conditions).',
  },
  {
    id: 9,
    question: 'When two air streams mix, the mixture state lies:',
    options: [
      'At the higher enthalpy state',
      'On a straight line between the two states',
      'At the saturation curve',
      'At the lower temperature state',
    ],
    correctAnswer: 1,
    explanation:
      'Mixing produces a state on the straight line connecting the two original states. Position depends on mass flow ratio - closer to the larger flow.',
  },
  {
    id: 10,
    question:
      'Chemical dehumidification (desiccant) differs from cooling coil dehumidification because:',
    options: [
      'On a straight line between the two states',
      'Vertical line upward (nearly)',
      'It heats the air while removing moisture',
      'Raise temperature without adding moisture',
    ],
    correctAnswer: 2,
    explanation:
      'Desiccant dehumidification absorbs moisture and releases the heat of absorption, warming the air. The process moves diagonally down-right on the chart (lower g, higher T).',
  },
  {
    id: 11,
    question: 'Reheat after cooling coil dehumidification is used to:',
    options: [
      'No energy input required beyond fan power',
      'Horizontal movement to the left',
      'Vertical line upward (nearly)',
      'Raise temperature without adding moisture',
    ],
    correctAnswer: 3,
    explanation:
      'After dehumidification, air may be too cold for comfort. Reheat raises the dry bulb temperature (sensible heating) while maintaining the low moisture content achieved at the coil.',
  },
  {
    id: 12,
    question: 'An air conditioning process with SHR = 0.7 means:',
    options: [
      '70% of the load is sensible',
      'Temperature change is 70°C',
      '70% of the load is latent',
      'The air is 70% saturated',
    ],
    correctAnswer: 0,
    explanation:
      'SHR = 0.7 means 70% of the total cooling load is sensible (temperature reduction) and 30% is latent (moisture removal).',
  },
];

const faqs = [
  {
    question: 'Why do cooling coils both cool and dehumidify?',
    answer:
      "When coil surface temperature is below the air's dew point, the air adjacent to the coil becomes saturated and moisture condenses. The coil removes both sensible heat (cooling) and latent heat (dehumidification). If the coil were above dew point, only sensible cooling would occur.",
  },
  {
    question: 'What determines the sensible heat ratio of a space?',
    answer:
      'SHR depends on the nature of heat gains. Sensible gains include solar radiation, lighting, equipment and conduction. Latent gains come from people (respiration/perspiration) and moisture-generating processes. Offices typically have SHR 0.8-0.9; kitchens and swimming pools have lower SHR due to high latent loads.',
  },
  {
    question: 'When is reheat necessary?',
    answer:
      "Reheat is needed when dehumidification cools air below the required supply temperature. This occurs when the room sensible heat ratio is higher than the coil's natural SHR, or when humidity control is more important than temperature. Reheat wastes energy but may be unavoidable for precise humidity control.",
  },
  {
    question: 'How does spray humidification differ from steam?',
    answer:
      'Spray (adiabatic) humidification uses water sprays or wetted media. Water evaporates using sensible heat from the air, so air cools as it humidifies - following a wet bulb line. Steam humidification adds both moisture and heat, causing near-vertical movement on the chart with slight temperature rise.',
  },
  {
    question: 'Why is mixing important in HVAC systems?',
    answer:
      'Most HVAC systems mix return air with fresh outside air for energy efficiency and ventilation. Understanding mixing calculations allows engineers to determine mixed air conditions for coil sizing, predict condensation risks, and optimise the fresh air fraction for different conditions.',
  },
  {
    question: 'Can you have cooling without dehumidification?',
    answer:
      "Yes, if the cooling coil surface stays above the air's dew point. This occurs with high coil water temperatures (typically above 12-14°C) or low inlet air humidity. Chilled beams and radiant cooling often provide sensible-only cooling, requiring separate dehumidification if needed.",
  },
];

const HNCModule2Section3_4 = () => {
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
            eyebrow="Module 2 · Section 3 · Subsection 4"
            title="Air Conditioning Processes"
            description="Understanding heating, cooling, humidification and dehumidification for HVAC system design."
            tone="purple"
          />

          <TLDR
            points={[
              'You size sensible heating and cooling using Q̇s = ṁ × cp × ΔT and latent loads using Q̇l = ṁ × hfg × Δg.',
              'You select humidifier type (steam, spray, evaporative pad) by tracking the process line on the psychrometric chart against the design moisture target.',
              'You apply the apparatus dew point (ADP) and contact factor (β) when sizing a cooling coil — not just sensible duty.',
              'You calculate Sensible Heat Ratio (SHR = Q̇s / Q̇total) to match coil performance to the building&rsquo;s sensible:latent split.',
            ]}
          />

          <RegsCallout
            source="CIBSE Guide B1 — Heating; Guide B3 — Air-Conditioning, Air Handling and Refrigeration"
            clause="Recommended methods for sizing AHU coils, selecting humidification, and verifying sensible/latent split via the psychrometric chart and the cooling-coil contact factor."
            meaning={
              <>
                CIBSE Guide B is the design code of practice for the four canonical AHU
                processes. As HNC engineer you reference Guide B1/B3 when selecting plant
                schedules, especially when the architect questions why coils, humidifiers
                or fan sizes have been upgraded against the original concept.
              </>
            }
            cite="Source: CIBSE Guide B1 — Heating; CIBSE Guide B3 — Air-Conditioning, Air Handling and Refrigeration."
          />

          <LearningOutcomes
            outcomes={[
              'Calculate sensible and latent heat loads',
              'Plot heating and cooling processes on the psychrometric chart',
              'Understand humidification methods and their chart representation',
              'Analyse cooling with dehumidification processes',
              'Calculate mixed air conditions',
              'Determine sensible heat ratio for system design',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="Sensible Heating and Cooling"
            plainEnglish="Add or remove heat without touching the moisture. The chart line stays horizontal — temperature changes, moisture doesn't."
          >
            <p>
              Sensible processes change only the temperature of air, without adding or removing
              moisture. On the psychrometric chart, these appear as horizontal lines.
            </p>
            <p>
              <strong>Sensible Heat Equation:</strong> Qs = ṁ × cp × ΔT
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Qs = sensible heat rate (kW)</li>
              <li>ṁ = mass flow rate (kg/s)</li>
              <li>cp = 1.005 kJ/kg·K (dry air)</li>
              <li>ΔT = temperature change (°C or K)</li>
            </ul>
            <p>
              <strong>Sensible Process Characteristics:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Sensible heating:</strong> Horizontal right →. T↑, RH↓, h↑, g constant
              </li>
              <li>
                <strong>Sensible cooling:</strong> Horizontal left ←. T↓, RH↑, h↓, g constant
              </li>
            </ul>
            <p>
              <strong>Heating Equipment:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>LTHW heating coils (70-80°C flow)</li>
              <li>Electric heater batteries</li>
              <li>Direct gas-fired heaters</li>
              <li>Heat recovery coils</li>
            </ul>
            <p>
              <strong>Cooling Equipment:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Chilled water coils (6-12°C)</li>
              <li>Direct expansion (DX) coils</li>
              <li>Chilled beams (sensible only)</li>
              <li>Free cooling coils</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock
            title="Humidification Processes"
            plainEnglish="Two ways to wet the air: shoot steam in (heats it slightly), or evaporate water off a wet surface (cools it). Same end result, different chart paths."
          >
            <p>
              Humidification adds water vapour to air to increase moisture content and relative
              humidity. The two main methods produce different paths on the psychrometric chart.
            </p>
            <p>
              <strong>Humidification Methods Compared:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Steam injection:</strong> Chart path near vertical ↑, slight temperature
                increase, energy from boiler/steam generator
              </li>
              <li>
                <strong>Adiabatic spray:</strong> Chart path along wet bulb ↙, temperature decrease
                (cooling), energy from air's sensible heat
              </li>
              <li>
                <strong>Wetted media:</strong> Chart path along wet bulb ↙, temperature decrease
                (cooling), energy from air's sensible heat
              </li>
              <li>
                <strong>Ultrasonic:</strong> Chart path near vertical ↑, very slight temperature
                change, electrical energy
              </li>
            </ul>
            <p>
              <strong>Adiabatic Saturation Efficiency:</strong> η = (T1 - T2) / (T1 - Twb).
              Efficiency typically 70-90% for spray/media systems.
            </p>
            <p>
              <strong>Note:</strong> Adiabatic humidification has a natural limit at the wet bulb
              temperature (100% saturation efficiency would reach saturation at the wet bulb).
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock
            title="Dehumidification Processes"
            plainEnglish="Either chill the air below its dew point and let water condense out, or run it through a desiccant that grabs the moisture chemically."
          >
            <p>
              Dehumidification removes moisture from air, essential for comfort cooling in humid
              conditions and for process applications requiring low humidity.
            </p>
            <p>
              <strong>Dehumidification Methods:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cooling coil:</strong> Surface below dew point. Chart path toward ADP. Used
                in most HVAC systems.
              </li>
              <li>
                <strong>Desiccant:</strong> Moisture absorption. Chart path down-right (g↓, T↑).
                Used for low humidity needs.
              </li>
            </ul>
            <p>
              <strong>Latent Heat Equation:</strong> QL = ṁ × Δg × hfg
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>QL = latent heat rate (kW)</li>
              <li>Δg = moisture content change (kg/kg)</li>
              <li>hfg ≈ 2450 kJ/kg (at typical conditions)</li>
            </ul>
            <p>
              <strong>Cooling Coil Dehumidification:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Coil must be below air dew point</li>
              <li>Process line aims toward ADP</li>
              <li>Condensate must be drained</li>
              <li>Often followed by reheat</li>
            </ul>
            <p>
              <strong>Total Cooling Load:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Qt = Qs + QL</li>
              <li>Or: Qt = ṁ × Δh</li>
              <li>SHR = Qs / Qt</li>
              <li>Typical comfort: SHR 0.7-0.9</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock
            title="Air Mixing Processes"
            plainEnglish="Two air streams meet, the mixture sits on a straight line between them. Where on the line? Closer to the bigger flow."
          >
            <p>
              Mixing occurs when two air streams combine, such as fresh outside air with
              recirculated return air. The mixed condition lies on a straight line between the two
              original states.
            </p>
            <p>
              <strong>Mixing Equations</strong> (all properties mix by mass-weighted average):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Tm = (ṁ1·T1 + ṁ2·T2) / (ṁ1 + ṁ2)</li>
              <li>gm = (ṁ1·g1 + ṁ2·g2) / (ṁ1 + ṁ2)</li>
              <li>hm = (ṁ1·h1 + ṁ2·h2) / (ṁ1 + ṁ2)</li>
            </ul>
            <p>
              <strong>Graphical Mixing (Lever Rule):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Step 1: Plot both air states on the chart</li>
              <li>Step 2: Draw a straight line between them</li>
              <li>Step 3: Divide line by inverse mass ratio</li>
              <li>Step 4: Mixed state is closer to larger mass flow</li>
            </ul>
            <p>
              <strong>Caution:</strong> If the mixing line crosses the saturation curve, fog or
              condensation may form in the mixing chamber. This can occur in cold climates when very
              cold dry air mixes with warm humid return air.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock
            title="Worked examples"
            plainEnglish="Heating coil sizing, cooling with dehumidification, mixing, and steam humidification — the four classic AHU calcs."
          >
            <p>
              <strong>Example 1: Heating Coil Capacity.</strong> An AHU supplies 4.5 kg/s of air.
              Calculate the heating coil capacity to raise temperature from 10°C to 24°C.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Given: ṁ = 4.5 kg/s, T₁ = 10°C, T₂ = 24°C, cp = 1.005 kJ/kg·K</li>
              <li>Qs = ṁ × cp × ΔT = 4.5 × 1.005 × (24 - 10) = 4.5 × 1.005 × 14</li>
              <li>
                Qs = <strong>63.3 kW</strong>
              </li>
            </ul>
            <p>
              <strong>Example 2: Cooling with Dehumidification.</strong> Air at 28°C, 12 g/kg enters
              a cooling coil and leaves at 14°C, 9 g/kg. Calculate sensible, latent and total load
              for 3 kg/s.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Sensible: Qs = ṁ × cp × ΔT = 3 × 1.005 × (28 - 14) = <strong>42.2 kW</strong>
              </li>
              <li>Latent: QL = ṁ × Δg × hfg = 3 × (12-9)/1000 × 2450 = 3 × 0.003 × 2450</li>
              <li>
                QL = <strong>22.1 kW</strong>
              </li>
              <li>
                Total: Qt = Qs + QL = 42.2 + 22.1 = <strong>64.3 kW</strong>
              </li>
              <li>
                SHR = 42.2/64.3 = <strong>0.66</strong>
              </li>
            </ul>
            <p>
              <strong>Example 3: Air Mixing.</strong> 1.5 kg/s outside air (32°C, 18 g/kg) mixes
              with 4.5 kg/s return air (24°C, 10 g/kg). Find mixed conditions.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Total flow: ṁt = 1.5 + 4.5 = 6.0 kg/s</li>
              <li>
                Mixed temperature: Tm = (1.5×32 + 4.5×24) / 6.0 = (48 + 108) / 6 ={' '}
                <strong>26°C</strong>
              </li>
              <li>
                Mixed moisture content: gm = (1.5×18 + 4.5×10) / 6.0 = (27 + 45) / 6 ={' '}
                <strong>12 g/kg</strong>
              </li>
            </ul>
            <p>
              <strong>Example 4: Steam Humidification.</strong> How much steam (kg/h) is needed to
              raise 2 kg/s of air from 5 g/kg to 8 g/kg moisture content?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Moisture addition rate: Δg = 8 - 5 = 3 g/kg = 0.003 kg/kg</li>
              <li>Steam flow rate: ṁsteam = ṁair × Δg = 2 × 0.003 = 0.006 kg/s</li>
              <li>
                Converting to kg/h: ṁsteam = 0.006 × 3600 = <strong>21.6 kg/h</strong>
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="Practical guidance"
            plainEnglish="The four equations and the typical SHR figures you'll quote on every project."
          >
            <p>
              <strong>Essential Equations:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Qs = ṁcpΔT</strong> — Sensible heat (kW)
              </li>
              <li>
                <strong>QL = ṁΔghfg</strong> — Latent heat (kW)
              </li>
              <li>
                <strong>Qt = ṁΔh</strong> — Total heat (kW)
              </li>
              <li>
                <strong>SHR = Qs/Qt</strong> — Sensible heat ratio
              </li>
            </ul>
            <p>
              <strong>Typical SHR Values:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Offices:</strong> 0.85-0.95 (mostly sensible)
              </li>
              <li>
                <strong>Retail:</strong> 0.80-0.90
              </li>
              <li>
                <strong>Restaurants:</strong> 0.70-0.80
              </li>
              <li>
                <strong>Swimming pools:</strong> 0.50-0.65 (high latent)
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Units for Δg:</strong> Must be kg/kg in equation, not g/kg
                </li>
                <li>
                  <strong>Forgetting reheat:</strong> After dehumidification if too cold
                </li>
                <li>
                  <strong>Mixing by volume:</strong> Must use mass flow rates
                </li>
                <li>
                  <strong>Assuming sensible only:</strong> Check if coil below dew point
                </li>
              </ul>
            }
            doInstead="Always convert Δg to kg/kg before the latent equation, design reheat into any high-humidity-control scheme, mix on a mass-flow basis, and check coil surface vs entering-air dew point before assuming purely sensible cooling."
          />

          <SectionRule />

          <Scenario
            title="Specifying summer comfort cooling for a south-facing dealing-room"
            situation={
              <>
                A 220 m² City dealing-room with full-height south glazing has 65 occupants
                and 80 kW of IT load. Summer design is 30 °C, 50% RH ambient; internal
                target is 22 °C, 50% RH. The original concept used sensible-only chilled
                beams and now overheats by mid-afternoon.
              </>
            }
            whatToDo={
              <>
                Calculate the sensible load (occupants 75 W each + IT 80 kW + solar gain).
                Calculate the latent load from occupant moisture generation (≈55 g/h
                each at light office work). Compute SHR. If SHR &lt; 0.85, chilled beams
                alone are insufficient — recommend a 4-pipe FCU or AHU coil with active
                dehumidification. Plot the supply-air state on the chart and document the
                ADP and contact factor in the schedule.
              </>
            }
            whyItMatters={
              <>
                A latent-blind design strands the building at high RH and warm operative
                temperature. Productivity drops, the FM team field complaints, and
                retrofitting active dehumidification in occupied dealing rooms is brutally
                expensive. The chart-based SHR check catches the gap at design stage.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Sensible processes change tdb only — moisture content g constant; horizontal on the chart.',
              'Sensible heat: Q̇s = ṁ × cp × ΔT (cp = 1.005 kJ/kg·K).',
              'Latent processes change moisture content only at constant tdb — vertical on the chart.',
              'Latent heat: Q̇l = ṁ × hfg × Δg (use hfg ≈ 2,501 kJ/kg, Δg in kg/kg).',
              'Cooling coil with dehumidification needs surface T &lt; entering-air dew point — characterised by ADP and contact factor β.',
              'Sensible Heat Ratio SHR = Q̇s / Q̇total — drives coil and humidifier selection.',
              'Adiabatic humidification (sprays, evaporative pads): along constant-enthalpy line, tdb falls.',
              'Mixing of two streams = straight line by mass-flow lever rule, never by volume.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section3-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Psychrometric Charts
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section3-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Cooling and Heating Coils
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule2Section3_4;
