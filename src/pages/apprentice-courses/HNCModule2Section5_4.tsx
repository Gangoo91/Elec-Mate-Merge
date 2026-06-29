/**
 * Module 2 · Section 5 · Subsection 4 — Air Infiltration and Ventilation
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   Air change rate, permeability (m³/h·m² @ 50 Pa), stack and wind drivers,
 *   equivalent area sizing — the air-movement physics behind Part L compliance,
 *   Part F minimum rates and natural ventilation design.
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

const TITLE = 'Air Infiltration and Ventilation - HNC Module 2 Section 5.4';
const DESCRIPTION =
  'Understanding air changes per hour, air permeability testing, natural ventilation, stack effect, and wind pressure in building design.';

const quickCheckQuestions = [
  {
    id: 'ach-definition',
    question: 'What does an air change rate of 1.5 ach mean?',
    options: [
      'The air temperature changes by 1.5°C every hour',
      'Fresh air is supplied at 1.5 litres per second per person',
      '1.5% of the room air is replaced every hour',
      'The room volume is replaced 1.5 times per hour',
    ],
    correctIndex: 3,
    explanation:
      'Air changes per hour (ach) means the entire room volume is theoretically replaced that many times each hour. 1.5 ach means the volume equivalent enters/leaves 1.5 times per hour.',
  },
  {
    id: 'part-l-permeability',
    question: 'What is the maximum air permeability permitted for new dwellings under Part L 2021?',
    options: [
      '3 m³/(h.m²) @ 50Pa',
      '8 m³/(h.m²) @ 50Pa',
      '10 m³/(h.m²) @ 50Pa',
      '5 m³/(h.m²) @ 50Pa',
    ],
    correctIndex: 1,
    explanation:
      'Part L 2021 requires maximum 8 m³/(h.m²) at 50Pa for new dwellings. Better than 5 is needed for good energy performance, and Passivhaus requires less than 0.6 ach at 50Pa.',
  },
  {
    id: 'stack-effect',
    question: 'When does stack effect ventilation work most effectively?',
    options: [
      'When the wind is blowing strongly across the building',
      'When inside and outside temperatures are equal',
      'When all openings are at the same height in the wall',
      'When there is a significant temperature difference between inside and outside',
    ],
    correctIndex: 3,
    explanation:
      'Stack effect relies on buoyancy from temperature difference. Warm air inside rises and exits at high level, drawing in cooler air below. Greater temperature difference = stronger stack effect.',
  },
  {
    id: 'wind-pressure',
    question: 'On which face of a building is wind pressure typically positive (pushing air in)?',
    options: [
      'Roof only',
      'Windward (upwind) face',
      'Leeward (downwind) face',
      'All faces equally',
    ],
    correctIndex: 1,
    explanation:
      'Wind creates positive pressure (pushing in) on the windward face and negative pressure (suction) on leeward and side faces. This pressure difference drives cross-ventilation.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the difference between infiltration and ventilation?',
    options: [
      'Infiltration only happens in summer, ventilation only in winter',
      'Infiltration is unintentional air leakage, ventilation is controlled air supply',
      'Infiltration is mechanical, ventilation is always natural',
      'Infiltration removes heat, ventilation only removes moisture',
    ],
    correctAnswer: 1,
    explanation:
      'Infiltration is uncontrolled air leakage through cracks and gaps (unintentional). Ventilation is the planned provision of fresh air through openings, ducts, or mechanical systems (intentional).',
  },
  {
    id: 2,
    question: 'How do you convert air permeability (m³/h/m²@50Pa) to typical infiltration rate?',
    options: [
      'Multiply by 2',
      'Divide by 10',
      'Divide by 20',
      'No conversion needed',
    ],
    correctAnswer: 2,
    explanation:
      'As a rule of thumb, divide q50 by 20 to estimate typical infiltration rate (ach). A building with 5 m³/h/m²@50Pa would have approximately 0.25 ach infiltration under normal conditions.',
  },
  {
    id: 3,
    question:
      'What ventilation rate does Building Regulations Approved Document F require for an office?',
    options: [
      '8 l/s per person',
      '5 l/s per person',
      '15 l/s per person',
      '10 l/s per person',
    ],
    correctAnswer: 3,
    explanation:
      'ADF requires minimum 10 l/s per person for offices and similar workplaces. This provides adequate fresh air for CO2 dilution and general air quality.',
  },
  {
    id: 4,
    question: 'What is the primary driving force for stack effect ventilation?',
    options: [
      'Density difference between warm and cool air',
      'Wind pressure acting on the windward facade',
      'Mechanical fans drawing air through the building',
      'The difference in humidity between inside and outside air',
    ],
    correctAnswer: 0,
    explanation:
      'Stack effect is driven by buoyancy - warm air is less dense than cool air. The density difference creates pressure difference, causing warm air to rise and exit at height while cool air enters at low level.',
  },
  {
    id: 5,
    question: 'A room is 4m × 5m × 3m high with 2 ach. What is the volumetric flow rate?',
    options: [
      '60 m³/h',
      '120 m³/h',
      '240 m³/h',
      '30 m³/h',
    ],
    correctAnswer: 1,
    explanation: 'Volume = 4 × 5 × 3 = 60 m³. Flow rate = Volume × ach = 60 × 2 = 120 m³/h.',
  },
  {
    id: 6,
    question: 'What wind pressure coefficient (Cp) would you expect on a windward face?',
    options: [
      '-0.5 to -0.8',
      '0',
      '+0.5 to +0.8',
      '+2.0',
    ],
    correctAnswer: 2,
    explanation:
      'Windward faces typically have Cp values of +0.5 to +0.8, indicating positive pressure. Leeward faces have negative values (-0.3 to -0.5). Cp depends on building shape and wind angle.',
  },
  {
    id: 7,
    question: 'For natural ventilation design, what is the approximate neutral pressure level?',
    options: [
      'At the lowest opening in the space',
      'At the highest opening in the space',
      'At ground level outside the building',
      'Approximately mid-height of the ventilated space',
    ],
    correctAnswer: 3,
    explanation:
      'The neutral pressure level (NPL) is where internal and external pressures are equal, typically at mid-height of a naturally ventilated space. Air enters below NPL and exits above.',
  },
  {
    id: 8,
    question: 'What is the purpose of a background ventilator (trickle vent)?',
    options: [
      'Continuous background fresh air when windows are closed',
      'Rapid purge ventilation to clear smoke during a fire',
      'Extract ventilation for kitchens and bathrooms',
      'Powered supply of tempered fresh air with heat recovery',
    ],
    correctAnswer: 0,
    explanation:
      'Background ventilators (trickle vents) provide continuous low-level fresh air ventilation when windows are closed, preventing build-up of moisture and pollutants. Part F requires minimum equivalent areas.',
  },
  {
    id: 9,
    question: 'Which building orientation maximises cross-ventilation potential?',
    options: [
      'Deep plan parallel to prevailing wind',
      'Narrow plan perpendicular to prevailing wind',
      'Square plan with single aspect',
      "Orientation doesn't affect cross-ventilation",
    ],
    correctAnswer: 1,
    explanation:
      'Narrow plan buildings perpendicular to prevailing wind enable effective cross-ventilation. Wind enters windward openings and exits leeward. Maximum depth for effective cross-ventilation is typically 12-15m.',
  },
  {
    id: 10,
    question:
      'What is the heat loss due to ventilation for a room with 100 l/s fresh air and 20K temperature difference?',
    options: [
      '1.2 kW',
      '12 kW',
      '2.4 kW',
      '4.8 kW',
    ],
    correctAnswer: 2,
    explanation:
      'Q = ρ × cp × V × ΔT = 1.2 × 1.0 × 0.1 × 20 = 2.4 kW. Or use Q = 1.2 × V(l/s) × ΔT(K) = 1.2 × 100 × 20 / 1000 = 2.4 kW.',
  },
  {
    id: 11,
    question: "What is meant by 'equivalent area' of a ventilation opening?",
    options: [
      'The total floor area served by the ventilation opening',
      'The geometric area of the opening measured frame to frame',
      'The area of glazing required to provide adequate daylight',
      'The theoretical area that would pass the same airflow with no resistance',
    ],
    correctAnswer: 3,
    explanation:
      'Equivalent area is the theoretical sharp-edged orifice area that would pass the same flow. Real openings have discharge coefficients (typically 0.6-0.7) reducing effective area below geometric area.',
  },
  {
    id: 12,
    question:
      'For a naturally ventilated building, what minimum floor-to-ceiling height helps stack effect?',
    options: [
      '3.0m or greater',
      "Height doesn't affect stack effect",
      '2.4m',
      '2.7m',
    ],
    correctAnswer: 0,
    explanation:
      'Greater floor-to-ceiling height increases stack effect pressure (ΔP ∝ height). Minimum 3.0m is often recommended for naturally ventilated offices. Atria and voids further enhance stack height.',
  },
];

const faqs = [
  {
    question:
      'What is the relationship between air permeability test results and actual infiltration?',
    answer:
      'Air permeability tests at 50Pa provide a standardised comparison between buildings, but actual infiltration occurs at much lower pressures (1-10Pa). Divide q50 by approximately 20 to estimate typical infiltration. The actual factor varies with building exposure, height, and climate.',
  },
  {
    question: 'How do I calculate ventilation heat loss for a building?',
    answer:
      'Use Qv = 0.33 × n × V × ΔT (Watts), where n = air changes per hour, V = room volume (m³), ΔT = temperature difference (K). Or Qv = 1.2 × q × ΔT where q = volumetric flow rate (l/s). The 0.33 and 1.2 factors come from ρ × cp for air.',
  },
  {
    question: 'When should I use mechanical ventilation rather than natural?',
    answer:
      'Use mechanical when: building is too deep for cross-ventilation (>12-15m), noise or pollution prevents opening windows, consistent year-round ventilation is needed, heat recovery is required, or specific pressurisation is needed (cleanrooms, kitchens). Part F gives hierarchical preference for ventilation solutions.',
  },
  {
    question: 'How do wind and stack effects interact?',
    answer:
      'They can reinforce or oppose each other. In winter (high ΔT), stack effect dominates. In summer (low ΔT, higher wind), wind becomes dominant. Good design uses both: wind-driven cross-ventilation in summer, stack-effect displacement in winter. Combined effect is not simply additive.',
  },
  {
    question: 'What air permeability should I target for energy efficiency?',
    answer:
      'Part L 2021 maximum is 8 m³/h/m²@50Pa but target lower: 5 for good practice, 3 for excellent, 1 for near-Passivhaus. Very airtight buildings (below 3) require mechanical ventilation with heat recovery (MVHR) as infiltration cannot provide adequate fresh air.',
  },
  {
    question: 'How does single-sided ventilation differ from cross-ventilation?',
    answer:
      'Single-sided relies on wind turbulence and local pressure variations through openings on one facade only - effective depth limited to ~2× ceiling height (~6m for 3m ceiling). Cross-ventilation uses pressure difference between opposite facades - effective to 12-15m depth or 5× ceiling height.',
  },
];

const HNCModule2Section5_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 2 · Section 5 · Subsection 4"
            title="Air Infiltration and Ventilation"
            description="Air movement in buildings: infiltration, natural ventilation, and driving forces."
            tone="purple"
          />

          <TLDR
            points={[
              'You convert between ach and l/s/person using V × n / 3.6 = total l/s, and apply Part F minimum rates as a non-negotiable floor.',
              'You read air-permeability test results (m³/h·m² @ 50 Pa) and convert to natural infiltration ach using the AIVC rule of thumb (≈ 1/20).',
              'You size natural ventilation openings using equivalent area Aeq driven by wind ΔP and stack ΔP (ΔPstack = ρ × g × h × ΔT/T).',
              'You compute ventilation heat loss Q = 0.33 × n × V × ΔT and add it to the fabric heat-loss schedule.',
            ]}
          />

          <RegsCallout
            source="Building Regulations 2010 — Approved Document F (Ventilation) and Approved Document L (Conservation of fuel and power)"
            clause="Part F sets minimum ventilation rates for dwellings and non-domestic buildings to provide adequate indoor air quality. Part L sets a maximum air permeability target for new and refurbished envelopes (typically 8 m³/h·m² @ 50 Pa or lower for compliance) demonstrated by pressure testing."
            meaning={
              <>
                Parts F and L are the regulatory bookends. As HNC engineer you size
                ventilation to Part F minimums (occupancy-driven), then verify the
                permeability target from Part L is achievable in build, and back-calculate
                the natural infiltration component for the heating-load schedule.
              </>
            }
            cite="Source: Building Regulations 2010, Approved Documents F and L — gov.uk; CIBSE Guide A — Environmental Design; AM10 Natural Ventilation in Non-Domestic Buildings."
          />

          <LearningOutcomes
            outcomes={[
              'Calculate ventilation rates and air change rates',
              'Understand air permeability testing and Part L requirements',
              'Apply stack effect and wind pressure principles',
              'Determine ventilation heat losses',
              'Design natural ventilation openings using equivalent area',
              'Select appropriate ventilation strategies for different buildings',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="Air Changes and Air Permeability"
            plainEnglish="Air change rate tells you how often the room air swaps. Permeability tells you how leaky the envelope is at 50Pa - a standardised pressure for comparing buildings."
          >
            <p>
              Air change rate describes how often the room air is replaced, while air permeability
              measures building envelope leakage. Both affect energy use and indoor air quality.
            </p>
            <p>
              <strong>Key definitions:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Air change rate (ach):</strong> Volume changes per hour (V/h ÷ Room volume)
              </li>
              <li>
                <strong>Air permeability (q50):</strong> m³/h per m² envelope at 50Pa pressure
              </li>
              <li>
                <strong>n50:</strong> Air changes at 50Pa (alternative airtightness metric)
              </li>
              <li>
                <strong>Infiltration:</strong> Unintentional leakage through fabric
              </li>
            </ul>
            <p>
              <strong>Ventilation rate calculation:</strong> V̇ = n × Volume. Where V̇ = flow rate
              (m³/h), n = air changes per hour, Volume = room volume (m³). To convert: m³/h ÷ 3.6 = l/s.
            </p>
            <p>
              <strong>Air permeability requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Part L 2021 (dwellings): max 8 m³/(h.m²) - design value for SAP</li>
              <li>Part L 2021 (other): max 8 m³/(h.m²) - with MVHR, 5 recommended</li>
              <li>Best practice: 3-5 m³/(h.m²) - good energy performance</li>
              <li>Passivhaus: ≤0.6 ach @ 50Pa (different metric n50)</li>
            </ul>
            <p>
              <strong>Rule of thumb:</strong> Divide q50 by 20 to estimate normal infiltration rate.
              A building testing at 5 m³/h/m² would have ~0.25 ach infiltration under typical
              conditions.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock
            title="Stack Effect - Buoyancy-Driven Ventilation"
            plainEnglish="Warm air is lighter, so it rises. That gives you free ventilation if you have an opening up high and another down low - and it gets stronger as ΔT and height grow."
          >
            <p>
              Stack effect occurs because warm air is less dense than cool air. In heated buildings,
              warm air rises and exits at high level, creating negative pressure that draws in
              cooler air at low level. This natural buoyancy can provide significant ventilation.
            </p>
            <p>
              <strong>Stack pressure formula:</strong> ΔP = ρ × g × h × (Ti - To) / To. Simplified:
              ΔP ≈ 0.04 × h × ΔT (Pa) for typical conditions. Where h = height between openings (m),
              ΔT = temperature difference (K).
            </p>
            <p>
              <strong>Stack effect principles:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Neutral pressure level:</strong> Mid-height where inside = outside pressure
              </li>
              <li>
                <strong>Below NPL:</strong> Air enters (positive stack pressure outside)
              </li>
              <li>
                <strong>Above NPL:</strong> Air exits (negative stack pressure outside)
              </li>
              <li>
                <strong>Height effect:</strong> Taller buildings have stronger stack effect
              </li>
            </ul>
            <p>
              <strong>Typical stack pressures (height × ΔT):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>3m (single storey): 1.2 Pa @ 10K, 2.4 Pa @ 20K, 3.6 Pa @ 30K</li>
              <li>10m (3 storey): 4 Pa @ 10K, 8 Pa @ 20K, 12 Pa @ 30K</li>
              <li>30m (atrium): 12 Pa @ 10K, 24 Pa @ 20K, 36 Pa @ 30K</li>
            </ul>
            <p>
              <strong>Design application:</strong> Stack effect is strongest in winter (high ΔT) but
              may be needed most in summer (low ΔT). Atria and chimneys increase effective height to
              enhance stack ventilation.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock
            title="Wind Pressure - Cross-Ventilation"
            plainEnglish="Wind pushes on the windward face and sucks on the leeward. That pressure difference drives cross-flow if you give it openings to use."
          >
            <p>
              Wind creates pressure differences around buildings that can drive ventilation. The
              windward face experiences positive pressure (pushing air in), while leeward and side
              faces experience suction (pulling air out). This pressure difference enables
              cross-ventilation.
            </p>
            <p>
              <strong>Wind pressure formula:</strong> P_wind = ½ × ρ × Cp × v². Where ρ = air
              density (1.2 kg/m³), Cp = pressure coefficient, v = wind speed (m/s). Simplified:
              P ≈ 0.6 × Cp × v² (Pa).
            </p>
            <p>
              <strong>Pressure coefficients (Cp) by face:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Windward (upwind): +0.5 to +0.8 - positive pressure (in)</li>
              <li>Leeward (downwind): -0.3 to -0.5 - suction (out)</li>
              <li>Side walls: -0.4 to -0.7 - suction (out)</li>
              <li>Flat roof: -0.5 to -0.8 - suction (up and out)</li>
            </ul>
            <p>
              <strong>Cross-ventilation requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Openings on opposite facades</li>
              <li>Maximum depth ~12-15m or 5× height</li>
              <li>Clear air path across space</li>
              <li>Perpendicular to prevailing wind</li>
            </ul>
            <p>
              <strong>Single-sided ventilation:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Relies on wind turbulence</li>
              <li>Maximum depth ~2× ceiling height</li>
              <li>~6m for 3m ceiling</li>
              <li>Less predictable/reliable</li>
            </ul>
            <p>
              <strong>Combined effect:</strong> Total ventilation pressure = stack + wind, but they
              don't simply add. On windward side with high-level exhaust, they can reinforce; on
              leeward inlet, they may oppose.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock
            title="Ventilation Heat Loss Calculations"
            plainEnglish="Bringing in cold fresh air costs heat. Two formulas give you the same number depending on whether you're working in ach or l/s."
          >
            <p>
              Ventilation and infiltration are significant heat loss pathways, often accounting for
              30-50% of total building heat loss. As buildings become better insulated, the relative
              importance of ventilation loss increases.
            </p>
            <p>
              <strong>Ventilation heat loss formulas:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Qv = 0.33 × n × V × ΔT (W). Where n = ach, V = volume (m³), ΔT = temp diff (K)</li>
              <li>Qv = 1.2 × q × ΔT (W). Where q = flow rate (l/s), ΔT = temp diff (K)</li>
            </ul>
            <p>
              <strong>Ventilation heat loss coefficient:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Hv = 0.33 × n × V</strong> (W/K) - heat loss per degree difference
              </li>
              <li>Compare with fabric: Hf = ΣUA (W/K)</li>
              <li>Total: H_total = Hf + Hv</li>
              <li>Annual loss = H × degree-days × 24 (Wh)</li>
            </ul>
            <p>
              <strong>Typical ventilation rates (Part F):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Office: 10 l/s per person (occupancy basis)</li>
              <li>Classroom: 8 l/s per person (occupancy basis)</li>
              <li>Kitchen (commercial): 25-40 l/s per m² (floor area basis)</li>
              <li>WC: 6 l/s per WC pan (fixture count basis)</li>
              <li>Dwelling (whole house): 0.3-0.5 ach (air change rate basis)</li>
            </ul>
            <p>
              <strong>Heat recovery:</strong> MVHR can recover 70-90% of ventilation heat loss while
              maintaining fresh air supply. Essential for very airtight buildings where infiltration
              alone cannot provide adequate ventilation.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock
            title="Worked examples"
            plainEnglish="Four sums covering ach from supply rate, ventilation heat loss, stack pressure in an atrium, and the windward/leeward pressure split for cross-vent."
          >
            <p>
              <strong>Example 1 - Air change rate:</strong> An office (8m × 10m × 3m) requires
              400 l/s ventilation. What is the air change rate?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Volume = 8 × 10 × 3 = 240 m³</li>
              <li>Flow rate = 400 l/s = 400 × 3.6 = 1440 m³/h</li>
              <li>ach = 1440 / 240 = <strong>6 air changes per hour</strong></li>
              <li>This is high for standard conditioning; check if cooling load driven</li>
            </ul>
            <p>
              <strong>Example 2 - Ventilation heat loss:</strong> Calculate the ventilation heat
              loss for a 500m³ room with 1.5 ach, internal temperature 21°C, external -2°C.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>ΔT = 21 - (-2) = 23K</li>
              <li>Qv = 0.33 × n × V × ΔT</li>
              <li>Qv = 0.33 × 1.5 × 500 × 23</li>
              <li>Qv = <strong>5693W ≈ 5.7kW</strong></li>
              <li>This must be added to fabric losses for total heating load</li>
            </ul>
            <p>
              <strong>Example 3 - Stack effect pressure:</strong> An atrium has inlet at ground and
              outlet 20m above. Internal temp 22°C, external 10°C. Calculate the stack pressure.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Using simplified formula: ΔP ≈ 0.04 × h × ΔT</li>
              <li>ΔP = 0.04 × 20 × (22-10)</li>
              <li>ΔP = 0.04 × 20 × 12 = <strong>9.6 Pa</strong></li>
              <li>Sufficient to drive significant natural ventilation flow</li>
            </ul>
            <p>
              <strong>Example 4 - Wind pressure:</strong> Wind speed is 5 m/s. Calculate pressure
              on windward face (Cp = +0.6) and leeward face (Cp = -0.4). What is the
              cross-ventilation driving pressure?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>P = 0.6 × Cp × v²</li>
              <li>Windward: P = 0.6 × (+0.6) × 5² = +9 Pa</li>
              <li>Leeward: P = 0.6 × (-0.4) × 5² = -6 Pa</li>
              <li>Driving pressure = 9 - (-6) = <strong>15 Pa</strong></li>
              <li>This drives airflow from windward to leeward openings</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="Practical guidance"
            plainEnglish="The headline values and formulas you'll reach for when sizing openings, estimating losses, or arguing about Part L test results."
          >
            <p>
              <strong>Essential formulas:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>ach = V̇ / Volume:</strong> Air changes from flow rate
              </li>
              <li>
                <strong>Qv = 0.33 × n × V × ΔT:</strong> Ventilation heat loss (W)
              </li>
              <li>
                <strong>ΔP = 0.04 × h × ΔT:</strong> Stack pressure (Pa)
              </li>
              <li>
                <strong>P = 0.6 × Cp × v²:</strong> Wind pressure (Pa)
              </li>
            </ul>
            <p>
              <strong>Key values to remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Part L max permeability: <strong>8 m³/h/m² @ 50Pa</strong>
              </li>
              <li>
                Office ventilation: <strong>10 l/s per person</strong>
              </li>
              <li>
                Cross-ventilation depth: <strong>12-15m max</strong>
              </li>
              <li>
                Single-sided depth: <strong>2× ceiling height</strong>
              </li>
              <li>
                q50 to infiltration: <strong>divide by 20</strong>
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Forgetting infiltration:</strong> Add to designed ventilation
                </li>
                <li>
                  <strong>Ignoring wind direction:</strong> Inlets should face prevailing wind
                </li>
                <li>
                  <strong>Summer stack:</strong> Low ΔT = weak stack effect
                </li>
                <li>
                  <strong>Oversizing openings:</strong> Too large = poor control
                </li>
              </ul>
            }
            doInstead="Add infiltration on top of designed ventilation, orient inlets to the prevailing wind, plan for wind-driven flow when summer ΔT is low, and size openings for control as well as flow capacity."
          />

          <SectionRule />

          <Scenario
            title="Sizing natural ventilation openings for a stack-driven school hall"
            situation={
              <>
                A 600 m² primary-school assembly hall (4.5 m floor-to-ceiling) is targeting
                BB101-compliant natural ventilation. Capacity 250 children + 20 staff, so
                Part F demands ~3 l/s/person × 270 = 810 l/s of fresh air during summer
                full-occupancy.
              </>
            }
            whatToDo={
              <>
                Calculate stack pressure ΔPstack from indoor 24 °C, outdoor 18 °C,
                stack height 4 m: ΔPstack ≈ ρ × g × h × ΔT/T ≈ 1.2 × 9.81 × 4 ×
                6/297 ≈ 0.95 Pa. Add a wind contribution from regional design wind
                pressure. Calculate equivalent area Aeq from V̇ = Cd × Aeq × √(2ΔP/ρ).
                Specify high-level + low-level openings sized for the larger of stack-only
                and wind-only cases. Cross-check with CIBSE AM10 procedure.
              </>
            }
            whyItMatters={
              <>
                Schools designed to BB101 must demonstrate adequate ventilation by calculation,
                not assertion. Undersized openings means CO₂ rises above 1500 ppm during
                lessons, learning outcomes drop, and the design fails LA scrutiny. The AM10
                methodology is the auditable design route.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Air change rate n (ach) = total air supply ÷ room volume per hour.',
              'Air permeability tested at 50 Pa over the building envelope — typical Part L target ≤ 8 m³/h·m².',
              'Natural infiltration ach ≈ permeability ÷ 20 (rule of thumb for typical exposure).',
              'Stack-effect ΔP = ρ × g × h × ΔT/T — drives buoyancy ventilation in winter.',
              'Wind-effect ΔP = Cp × ½ρv² — drives cross ventilation in summer.',
              'Equivalent area Aeq combines opening geometry with discharge coefficient Cd ≈ 0.6.',
              'Ventilation heat loss Q = 0.33 × n × V × ΔT.',
              'Approved Documents F and L set the legal envelope; CIBSE AM10 is the design methodology for natural ventilation.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section5-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Thermal mass and time lag
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section5-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Thermal comfort
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule2Section5_4;
