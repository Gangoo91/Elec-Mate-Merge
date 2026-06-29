/**
 * Module 2 · Section 3 · Subsection 2 — Humidity and Moisture Content
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   Relative humidity, specific humidity (g/kg), dew point and wet-bulb measurement —
 *   the moisture toolkit underpinning condensation risk, comfort design and AHU
 *   coil selection on every building services project.
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

const TITLE = 'Humidity and Moisture Content - HNC Module 2 Section 3.2';
const DESCRIPTION =
  'Master relative humidity, specific humidity, dew point temperature, wet bulb measurement and saturation conditions for HVAC psychrometric analysis.';

const quickCheckQuestions = [
  {
    id: 'rh-definition',
    question: 'What does 50% relative humidity mean?',
    options: [
      'The air is at exactly half its dew point temperature',
      'Half of the air by volume is water vapour',
      'The moisture content is fixed at 50 g/kg of dry air',
      'Air holds half the moisture it could at that temperature',
    ],
    correctIndex: 3,
    explanation:
      'Relative humidity is the ratio of actual water vapour pressure to the saturation vapour pressure at that temperature. 50% RH means the air holds half the maximum possible moisture at that dry bulb temperature.',
  },
  {
    id: 'moisture-content',
    question: 'What are typical units for moisture content (specific humidity) in HVAC?',
    options: [
      '% relative to saturation',
      'kPa (partial pressure of vapour)',
      'kJ/kg (enthalpy of the air)',
      'g/kg (grams per kg dry air)',
    ],
    correctIndex: 3,
    explanation:
      'Moisture content (specific humidity) is expressed as g/kg - grams of water vapour per kilogram of dry air. This absolute measure remains constant during sensible heating/cooling processes.',
  },
  {
    id: 'dew-point',
    question: 'What happens when air is cooled to its dew point temperature?',
    options: [
      'Condensation begins to form',
      'The air expands',
      'Relative humidity drops to 0%',
      'Pressure increases',
    ],
    correctIndex: 0,
    explanation:
      'At dew point temperature, the air becomes saturated (100% RH). Any further cooling causes water vapour to condense out as liquid water (dew, mist, or condensation on surfaces).',
  },
  {
    id: 'wet-bulb',
    question: 'Why is wet bulb temperature always lower than or equal to dry bulb temperature?',
    options: [
      'The sensor measures radiation',
      'Evaporation from the wet wick causes cooling',
      'Water has a higher specific heat',
      'The thermometer is less accurate',
    ],
    correctIndex: 1,
    explanation:
      'Evaporation from the wet wick requires latent heat, which is drawn from the surrounding air, cooling the thermometer. At 100% RH, no evaporation occurs and wet bulb equals dry bulb.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Relative humidity is defined as:',
    options: [
      'The mass of water vapour per unit mass of dry air',
      'The ratio of actual vapour pressure to saturation vapour pressure',
      'The temperature at which condensation occurs',
      'The difference between wet and dry bulb temperatures',
    ],
    correctAnswer: 1,
    explanation:
      'Relative humidity (RH) = (pv / ps) × 100%, where pv is the actual partial pressure of water vapour and ps is the saturation pressure at that temperature.',
  },
  {
    id: 2,
    question:
      'If air at 25°C has a moisture content of 10 g/kg and can hold a maximum of 20 g/kg at saturation, what is the relative humidity?',
    options: [
      '75%',
      '25%',
      '50%',
      '100%',
    ],
    correctAnswer: 2,
    explanation:
      'RH ≈ (actual moisture / saturation moisture) × 100% = (10/20) × 100% = 50%. Note: This is an approximation; precise calculation uses vapour pressures.',
  },
  {
    id: 3,
    question: 'What is the dew point temperature?',
    options: [
      'The average of wet and dry bulb temperatures',
      'The temperature at which air reaches 50% RH',
      'The temperature of the evaporator coil',
      'The temperature at which condensation begins',
    ],
    correctAnswer: 3,
    explanation:
      'Dew point is the temperature to which air must be cooled (at constant pressure and moisture content) to reach 100% saturation and begin condensation.',
  },
  {
    id: 4,
    question:
      'Air at 22°C and 60% RH is heated to 30°C. What happens to the moisture content and RH?',
    options: [
      'Moisture content stays same, RH decreases',
      'Moisture content increases, RH increases',
      'Moisture content decreases, RH increases',
      'Both stay the same',
    ],
    correctAnswer: 0,
    explanation:
      'Sensible heating adds no moisture, so moisture content (g/kg) stays constant. However, warmer air can hold more moisture, so RH decreases when temperature rises.',
  },
  {
    id: 5,
    question: 'The wet bulb temperature is measured using:',
    options: [
      'A thermometer placed inside a sealed, still container',
      'A thermometer with a wet wick in moving air',
      'An infrared thermometer aimed at a damp surface',
      'A thermometer immersed directly in a beaker of water',
    ],
    correctAnswer: 1,
    explanation:
      'Wet bulb temperature is measured with a thermometer whose bulb is wrapped in a wet muslin wick and exposed to air movement (typically using a sling psychrometer or aspirated psychrometer).',
  },
  {
    id: 6,
    question: 'What is the wet bulb depression?',
    options: [
      'The drop in air pressure caused by evaporation at the wick',
      'The difference between wet bulb and dew point temperatures',
      'The difference between dry bulb and wet bulb temperatures',
      'The fall in moisture content as air is cooled to saturation',
    ],
    correctAnswer: 2,
    explanation:
      'Wet bulb depression = Dry bulb - Wet bulb temperature. A larger depression indicates lower relative humidity; zero depression means 100% RH (saturated air).',
  },
  {
    id: 7,
    question: 'Comfort conditions for offices typically require RH in the range of:',
    options: [
      '20-30%',
      '80-90%',
      '70-80%',
      '40-60%',
    ],
    correctAnswer: 3,
    explanation:
      'CIBSE Guide A recommends 40-60% RH for comfort. Below 40% can cause dry skin and static; above 60% can feel stuffy and encourage mould growth.',
  },
  {
    id: 8,
    question: 'What is saturation vapour pressure?',
    options: [
      'The partial pressure of water vapour when air is saturated',
      'The atmospheric pressure at sea level',
      'The maximum pressure air can exert',
      'The pressure in a sealed container',
    ],
    correctAnswer: 0,
    explanation:
      'Saturation vapour pressure (ps) is the maximum partial pressure water vapour can exert at a given temperature. It increases exponentially with temperature.',
  },
  {
    id: 9,
    question: 'Why is moisture content (g/kg) preferred over RH for HVAC calculations?',
    options: [
      'It is always larger than RH, making it easier to read on a chart',
      'It remains constant during sensible heating/cooling',
      'It can be measured directly with a single dry-bulb thermometer',
      'It automatically accounts for changes in atmospheric pressure',
    ],
    correctAnswer: 1,
    explanation:
      'Moisture content (specific humidity) is an absolute measure that stays constant when air is sensibly heated or cooled. RH changes with temperature, making it less useful for tracking moisture through processes.',
  },
  {
    id: 10,
    question:
      'The latent heat of vaporisation of water at atmospheric conditions is approximately:',
    options: [
      '1000 kJ/kg',
      '2260 kJ/kg',
      '2501 kJ/kg',
      '4186 kJ/kg',
    ],
    correctAnswer: 2,
    explanation:
      'The latent heat of vaporisation at 0°C is approximately 2501 kJ/kg (hfg). This energy is absorbed when water evaporates and released when vapour condenses.',
  },
  {
    id: 11,
    question: 'If dry bulb = 24°C, wet bulb = 17°C, and dew point = 12°C, what can be concluded?',
    options: [
      'The air is fully saturated at 100% relative humidity',
      'There must be a measurement error, as dew point cannot be the lowest',
      'Condensation is already forming because dew point is below dry bulb',
      'Air is unsaturated with moderate humidity',
    ],
    correctAnswer: 3,
    explanation:
      'The wet bulb (17°C) is between dry bulb (24°C) and dew point (12°C), indicating unsaturated air. The 7°C wet bulb depression suggests moderate humidity (around 50% RH).',
  },
  {
    id: 12,
    question: 'What is the approximate saturation moisture content of air at 20°C?',
    options: [
      '14.7 g/kg',
      '58.8 g/kg',
      '7.4 g/kg',
      '29.4 g/kg',
    ],
    correctAnswer: 0,
    explanation:
      'At 20°C and 101.325 kPa, the saturation moisture content is approximately 14.7 g/kg. This value roughly doubles for every 10°C temperature rise.',
  },
];

const faqs = [
  {
    question: 'What is the difference between relative humidity and specific humidity?',
    answer:
      'Relative humidity (RH) is a percentage showing how close air is to saturation - it changes with temperature. Specific humidity (moisture content) is the actual mass of water vapour per kg of dry air (g/kg) - it stays constant during sensible heating/cooling. For HVAC calculations, moisture content is preferred because it tracks the actual water in the air.',
  },
  {
    question: 'Why does relative humidity change when air is heated without adding moisture?',
    answer:
      'Warmer air can hold more water vapour. When you heat air without adding moisture, the moisture content stays the same but the saturation capacity increases. Since RH = actual/maximum, the RH percentage decreases. This is why winter heating makes indoor air feel dry.',
  },
  {
    question: 'How do I measure relative humidity on site?',
    answer:
      'Common methods include: sling psychrometer (wet and dry bulb), electronic hygrometer/thermo-hygrometer, or data loggers. Digital hygrometers are convenient but should be calibrated periodically. For commissioning, compare readings at the same location to check consistency.',
  },
  {
    question: 'Why is dew point important in building services?',
    answer:
      "Dew point determines when condensation occurs. If surface temperatures (walls, windows, ducts) fall below the air's dew point, condensation forms. This can cause mould, corrosion, and damage. Designers must ensure surface temperatures stay above dew point or control humidity levels.",
  },
  {
    question: "What causes 'stuffiness' in buildings?",
    answer:
      "Stuffiness is typically caused by high relative humidity (above 60%) combined with elevated CO₂ levels from poor ventilation. The high humidity reduces the body's ability to cool through sweat evaporation. Increasing ventilation rates and controlling humidity improves comfort.",
  },
  {
    question: 'How does altitude affect humidity calculations?',
    answer:
      'Lower atmospheric pressure at altitude means the saturation vapour pressure represents a larger proportion of total pressure. For the same moisture content, RH is slightly lower at altitude. Most practical HVAC calculations use sea-level values unless at significant elevation (above 1000m).',
  },
];

const HNCModule2Section3_2 = () => {
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
            eyebrow="Module 2 · Section 3 · Subsection 2"
            title="Humidity and Moisture Content"
            description="Understanding humidity measurement and its role in HVAC system design and comfort."
            tone="purple"
          />

          <TLDR
            points={[
              'You distinguish RH (% — temperature-dependent) from moisture content g/kg (absolute) and use the right one for each calculation step.',
              'You compute moisture content from g = 0.622 × pv/(P − pv) and read saturation vapour pressures off CIBSE Guide C tables.',
              'You assess condensation risk by comparing surface temperature to room dew point — a project sign-off competence on glazing, ducts and cold stores.',
              'You use wet-bulb depression from a sling psychrometer to verify BMS humidity sensors during commissioning.',
            ]}
          />

          <RegsCallout
            source="CIBSE Guide A — Environmental Design (latest edition)"
            clause="Recommended internal humidity range of 40–60% RH for general office and similar comfort applications, with surface temperatures kept above the room dew point to avoid condensation, mould growth and damage to fabric."
            meaning={
              <>
                Comfort RH bands and dew-point control are CIBSE Guide A&rsquo;s anchor
                recommendations. As the HNC engineer you cite these when defending humidity
                setpoints to the architect, when sizing humidifiers, and when justifying
                glazing or insulation upgrades to eliminate condensation black-spots.
              </>
            }
            cite="Source: CIBSE Guide A — Environmental Design; CIBSE Guide C — Reference Data."
          />

          <LearningOutcomes
            outcomes={[
              'Define relative humidity and explain its significance',
              'Calculate moisture content from given conditions',
              'Explain dew point and its importance in condensation control',
              'Describe wet bulb temperature measurement',
              'Relate humidity to thermal comfort',
              'Convert between different humidity measures',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="Relative Humidity (RH)"
            plainEnglish="RH is a percentage that says how full the air is with water vapour. 100% means it can't hold any more — anything extra falls out as condensation."
          >
            <p>
              Relative humidity is the most commonly quoted humidity measure, expressing how close
              air is to being saturated with water vapour at its current temperature.
            </p>
            <p>
              <strong>Relative Humidity Definition:</strong> RH = (pv / ps) × 100%
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>pv = actual partial pressure of water vapour (Pa)</li>
              <li>ps = saturation vapour pressure at that temperature (Pa)</li>
            </ul>
            <p>
              <strong>Saturation Vapour Pressure at Different Temperatures:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>0°C:</strong> ps = 0.611 kPa, saturation 3.8 g/kg
              </li>
              <li>
                <strong>10°C:</strong> ps = 1.228 kPa, saturation 7.6 g/kg
              </li>
              <li>
                <strong>20°C:</strong> ps = 2.339 kPa, saturation 14.7 g/kg
              </li>
              <li>
                <strong>25°C:</strong> ps = 3.169 kPa, saturation 20.0 g/kg
              </li>
              <li>
                <strong>30°C:</strong> ps = 4.246 kPa, saturation 27.2 g/kg
              </li>
            </ul>
            <p>
              <strong>Key insight:</strong> Saturation capacity roughly doubles every 10°C. This is
              why warm humid air causes condensation when it contacts cold surfaces.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock
            title="Moisture Content (Specific Humidity)"
            plainEnglish="Moisture content is the actual weight of water in each kilo of dry air. Heat the air, the number doesn't change. That's why HVAC engineers love it."
          >
            <p>
              Moisture content is the absolute measure of water vapour in air, expressed as grams of
              water per kilogram of dry air. Unlike RH, it remains constant during sensible heating
              or cooling.
            </p>
            <p>
              <strong>Moisture Content Equation:</strong> g = 0.622 × pv / (P - pv)
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>g = moisture content (kg/kg dry air, multiply by 1000 for g/kg)</li>
              <li>pv = partial pressure of water vapour (kPa)</li>
              <li>P = total atmospheric pressure (kPa)</li>
              <li>0.622 = ratio of molecular masses (18/29)</li>
            </ul>
            <p>
              <strong>Why Use Moisture Content?</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Stays constant during sensible heating/cooling</li>
              <li>Directly used in latent heat calculations</li>
              <li>Represents actual water mass in air</li>
              <li>Essential for psychrometric chart plotting</li>
            </ul>
            <p>
              <strong>Typical Values (g/kg):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>UK winter outdoor:</strong> 3-6 g/kg
              </li>
              <li>
                <strong>Office comfort:</strong> 7-10 g/kg
              </li>
              <li>
                <strong>UK summer outdoor:</strong> 8-12 g/kg
              </li>
              <li>
                <strong>Tropical outdoor:</strong> 15-20 g/kg
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock
            title="Dew Point Temperature"
            plainEnglish="Cool air enough and water stops floating around as vapour and starts dripping out. That tipping point is the dew point."
          >
            <p>
              The dew point is the temperature at which air becomes saturated (100% RH) if cooled at
              constant pressure and moisture content. Below this temperature, water vapour
              condenses.
            </p>
            <p>
              <strong>Dew Point Relationship:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>At dew point: pv = ps (at dew point temperature)</li>
              <li>If surface temperature &lt; dew point → condensation occurs</li>
              <li>If surface temperature &gt; dew point → no condensation</li>
            </ul>
            <p>
              <strong>Example Dew Points for 22°C Dry Bulb:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>30% RH:</strong> moisture content 5.0 g/kg, dew point 3.5°C
              </li>
              <li>
                <strong>50% RH:</strong> moisture content 8.3 g/kg, dew point 11.1°C
              </li>
              <li>
                <strong>70% RH:</strong> moisture content 11.6 g/kg, dew point 16.3°C
              </li>
              <li>
                <strong>100% RH:</strong> moisture content 16.6 g/kg, dew point 22.0°C
              </li>
            </ul>
            <p>
              <strong>Building Services Applications:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Window condensation:</strong> Occurs if glass temperature falls below room
                dew point
              </li>
              <li>
                <strong>Cold bridges:</strong> Poorly insulated areas may reach dew point
              </li>
              <li>
                <strong>Cooling coils:</strong> Must operate below dew point for dehumidification
              </li>
              <li>
                <strong>Ductwork:</strong> External surfaces may need insulation to prevent
                condensation
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock
            title="Wet Bulb Temperature"
            plainEnglish="A thermometer with a wet sock on it. Drier air evaporates more water, so the temperature drops more. The size of the drop tells you how dry the air is."
          >
            <p>
              Wet bulb temperature is measured by a thermometer with its bulb covered by a wet wick
              in moving air. Evaporation from the wick causes cooling proportional to the air's
              humidity.
            </p>
            <p>
              <strong>Wet Bulb Depression:</strong> Depression = tdb - twb
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Larger depression = lower RH (more evaporation)</li>
              <li>Zero depression = 100% RH (saturated, no evaporation)</li>
            </ul>
            <p>
              <strong>Measurement Methods:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Sling psychrometer:</strong> Manual, rotated by hand
              </li>
              <li>
                <strong>Aspirated psychrometer:</strong> Fan-driven airflow
              </li>
              <li>
                <strong>Screen psychrometer:</strong> In weather stations
              </li>
              <li>Requires 3-5 m/s airflow over wet bulb</li>
            </ul>
            <p>
              <strong>Relationship to Other Properties:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Dew point ≤ Wet bulb ≤ Dry bulb (always)</li>
              <li>All three equal at 100% RH</li>
              <li>Wet bulb ≈ constant along adiabatic saturation</li>
              <li>Used to determine other properties on chart</li>
            </ul>
            <p>
              <strong>Example: Determining RH from Dry and Wet Bulb (at 22°C dry bulb):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>22°C wet bulb:</strong> 0°C depression, ~100% RH
              </li>
              <li>
                <strong>18°C wet bulb:</strong> 4°C depression, ~67% RH
              </li>
              <li>
                <strong>15°C wet bulb:</strong> 7°C depression, ~47% RH
              </li>
              <li>
                <strong>12°C wet bulb:</strong> 10°C depression, ~30% RH
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock
            title="Worked examples"
            plainEnglish="Run the equations through real numbers — moisture content, dew point, RH after heating, condensation risk."
          >
            <p>
              <strong>Example 1: Calculating Moisture Content.</strong> Air at 25°C has RH of 60%.
              The saturation vapour pressure at 25°C is 3.169 kPa. Find the moisture content.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Step 1: Find actual vapour pressure. pv = RH × ps = 0.60 × 3.169 = 1.901 kPa</li>
              <li>Step 2: Calculate moisture content. g = 0.622 × pv / (P - pv)</li>
              <li>g = 0.622 × 1.901 / (101.325 - 1.901) = 1.182 / 99.424 = 0.01189 kg/kg</li>
              <li>
                g = <strong>11.9 g/kg</strong>
              </li>
            </ul>
            <p>
              <strong>Example 2: Finding Dew Point.</strong> Air at 20°C, 50% RH. At what
              temperature will condensation occur on a cold surface?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>At 20°C: ps = 2.339 kPa</li>
              <li>Actual vapour pressure: pv = 0.50 × 2.339 = 1.170 kPa</li>
              <li>Dew point is where ps equals 1.170 kPa</li>
              <li>
                From tables or chart: this occurs at approximately <strong>9.3°C</strong>
              </li>
              <li>Any surface below 9.3°C will have condensation</li>
            </ul>
            <p>
              <strong>Example 3: Effect of Heating on RH.</strong> Winter air at 5°C, 80% RH is
              heated to 21°C. Find the new RH.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>At 5°C: ps = 0.872 kPa, pv = 0.80 × 0.872 = 0.698 kPa</li>
              <li>Moisture content = 0.622 × 0.698/100.627 = 4.3 g/kg</li>
              <li>After heating to 21°C (moisture unchanged): ps at 21°C = 2.487 kPa</li>
              <li>
                New RH = pv/ps = 0.698/2.487 = <strong>28%</strong>
              </li>
              <li>This is why heated buildings feel dry in winter</li>
            </ul>
            <p>
              <strong>Example 4: Condensation Risk Assessment.</strong> Room at 22°C, 55% RH. Single
              glazing has inner surface at 8°C. Will condensation occur?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Find dew point of room air. At 22°C: ps = 2.645 kPa</li>
              <li>pv = 0.55 × 2.645 = 1.455 kPa</li>
              <li>
                Dew point (from tables) ≈ <strong>12.5°C</strong>
              </li>
              <li>Glass surface: 8°C &lt; Dew point: 12.5°C</li>
              <li>
                <strong>Yes — condensation WILL occur on the glass.</strong> Solution: improve
                glazing or reduce humidity.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="Practical guidance"
            plainEnglish="The relationships and comfort numbers you'll quote on every job."
          >
            <p>
              <strong>Essential Relationships:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>RH = pv/ps × 100%</strong> — Relative humidity definition
              </li>
              <li>
                <strong>g = 0.622 pv/(P-pv)</strong> — Moisture content
              </li>
              <li>
                <strong>Dew point ≤ Wet bulb ≤ Dry bulb</strong> — Always true
              </li>
              <li>At saturation: all three temperatures equal</li>
            </ul>
            <p>
              <strong>Comfort Guidelines (CIBSE):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Recommended RH: <strong>40-60%</strong>
              </li>
              <li>Below 40%: dry skin, static electricity</li>
              <li>Above 60%: stuffy feeling, mould risk</li>
              <li>Above 70%: definite condensation risk</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Confusing RH and g:</strong> RH changes with temperature, g does not
                </li>
                <li>
                  <strong>Assuming RH stays constant:</strong> It drops when air is heated
                </li>
                <li>
                  <strong>Ignoring dew point:</strong> Critical for condensation assessment
                </li>
                <li>
                  <strong>Wet bulb measurement:</strong> Needs adequate airflow (3-5 m/s)
                </li>
              </ul>
            }
            doInstead="Track moisture content (g/kg) through processes — it's invariant under sensible heating. Always check surface temperatures against dew point before approving a build-up. Maintain at least 3 m/s airflow over the wet bulb wick when measuring with a sling or aspirated psychrometer."
          />

          <SectionRule />

          <Scenario
            title="Investigating winter glazing condensation in a refurbished meeting room"
            situation={
              <>
                A client reports persistent condensation on the inside face of single-glazed
                Crittall windows in a heritage meeting room. Internal conditions are 21 °C
                and 55% RH (post-MVHR retrofit). The architect insists the glazing must be
                retained. You are asked to write the technical brief.
              </>
            }
            whatToDo={
              <>
                Calculate room dew point: at 21 °C, ps ≈ 2.487 kPa, pv = 0.55 × 2.487
                ≈ 1.368 kPa, dew point ≈ 11.7 °C. Estimate the inner glass surface
                temperature using the glazing U-value and design external temperature. Where
                surface T &lt; dew point, recommend either secondary glazing (raises surface
                temperature) or a humidity setpoint reduction (lowers dew point). Document
                the trade-off in the project risk register.
              </>
            }
            whyItMatters={
              <>
                Sustained condensation rots the timber subframe, voids any heritage-fabric
                warranty and triggers mould-growth complaints under the Homes (Fitness for
                Human Habitation) Act 2018. The dew-point calculation puts a defendable
                number on the choice between glazing upgrade and humidity control.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Relative humidity RH = pv/ps — varies with temperature; moisture content g/kg is invariant under sensible heating/cooling.',
              'Saturation vapour pressure roughly doubles every 10 °C — driver behind summer condensation problems.',
              'Moisture content g = 0.622 × pv/(P − pv) — quote in g/kg dry air to track moisture through AHU processes.',
              'Dew point = the temperature at which the room air becomes saturated; surfaces below dew point will condense.',
              'Wet-bulb depression (tdb − twb) is the field test for RH using a sling or aspirated psychrometer.',
              'CIBSE Guide A recommends 40–60% RH for office comfort — below 40% feels dry, above 60% feels stuffy.',
              'Always check duct, glazing and cold-bridge surface temperatures against room dew point before sign-off.',
              'Latent heat of vaporisation hfg ≈ 2,501 kJ/kg at 0 °C — the energy currency in humidification and dehumidification calculations.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section3-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Air Composition
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section3-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Psychrometric Charts
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule2Section3_2;
