/**
 * Module 2 · Section 6 · Subsection 1 — Load Estimation Methods
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   CIBSE-grounded methodologies for heating and cooling loads, diversity factors
 *   and the steady-state vs dynamic distinction — the load schedule the boiler,
 *   chiller and AHU schedules are sized from.
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

const TITLE = 'Load Estimation Methods - HNC Module 2 Section 6.1';
const DESCRIPTION =
  'Master CIBSE load estimation methods for building services: heating and cooling load calculations, diversity factors, and design margins for commercial buildings.';

const quickCheckQuestions = [
  {
    id: 'cibse-guide-a',
    question:
      'Which CIBSE guide provides the primary methodology for heating and cooling load calculations?',
    options: [
      'CIBSE Guide F',
      'CIBSE Guide M',
      'CIBSE Guide A',
      'CIBSE Guide B',
    ],
    correctIndex: 2,
    explanation:
      'CIBSE Guide A (Environmental Design) provides the fundamental methodology for heating and cooling load calculations, including design temperatures, thermal properties, and calculation procedures.',
  },
  {
    id: 'diversity-factor',
    question: 'A diversity factor of 0.7 for small power in offices means:',
    options: [
      'Only 70% of connected load operates simultaneously at peak',
      'The cabling must be derated to 70% of its current rating',
      'The system runs at 70% efficiency under design conditions',
      'Each circuit must be loaded to at least 70% of capacity',
    ],
    correctIndex: 0,
    explanation:
      'Diversity factor accounts for the fact that not all installed equipment operates at the same time. A factor of 0.7 means only 70% of the connected load is expected to operate simultaneously at peak demand.',
  },
  {
    id: 'cooling-load-peak',
    question:
      'When calculating peak cooling loads for a west-facing office, which time typically produces the highest solar gain?',
    options: [
      '7:00 PM',
      '3:00-5:00 PM',
      '9:00 AM',
      '12:00 noon',
    ],
    correctIndex: 1,
    explanation:
      'West-facing facades receive maximum solar radiation in the late afternoon (3:00-5:00 PM), coinciding with high ambient temperatures. This timing is critical for sizing cooling systems.',
  },
  {
    id: 'heating-design-temp',
    question:
      'What is the typical CIBSE external design temperature for heating calculations in London?',
    options: [
      '-5°C',
      '+2°C',
      '0°C',
      '-2°C',
    ],
    correctIndex: 3,
    explanation:
      'CIBSE Guide A specifies -2°C as the external heating design temperature for London (central). This represents conditions exceeded for only 1% of the heating season.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the primary purpose of CIBSE TM59 in load calculations?',
    options: [
      'Calculating heating loads for industrial buildings',
      'Assessing overheating risk in dwellings',
      'Sizing air conditioning systems',
      'Determining lighting power density',
    ],
    correctAnswer: 1,
    explanation:
      "CIBSE TM59 'Design methodology for the assessment of overheating risk in homes' provides criteria for evaluating overheating in residential buildings, increasingly important for naturally ventilated designs.",
  },
  {
    id: 2,
    question: 'The sol-air temperature concept accounts for:',
    options: [
      'The internal heat gains from occupants, lighting and equipment',
      'The temperature drop across a glazing unit due to its U-value',
      'Combined effect of solar radiation and external air temperature on surfaces',
      'The latent cooling load from moisture in the incoming fresh air',
    ],
    correctAnswer: 2,
    explanation:
      'Sol-air temperature combines the effect of solar radiation absorbed by a surface with the external air temperature, providing an equivalent temperature for heat transfer calculations through the building fabric.',
  },
  {
    id: 3,
    question:
      'For a typical open-plan office, what small power diversity factor does CIBSE recommend?',
    options: [
      '0.8-0.9',
      '0.4-0.5',
      '1.0',
      '0.6-0.7',
    ],
    correctAnswer: 3,
    explanation:
      'CIBSE Guide A recommends diversity factors of 0.6-0.7 for small power in open-plan offices, recognising that not all equipment operates simultaneously at full load.',
  },
  {
    id: 4,
    question: "What does 'thermal admittance' (Y-value) indicate about building elements?",
    options: [
      'Ability to absorb and release heat over a 24-hour cycle',
      'The steady-state rate of heat loss through the element (U-value)',
      'The air leakage rate through gaps in the construction',
      'The proportion of solar radiation transmitted through glazing',
    ],
    correctAnswer: 0,
    explanation:
      'Thermal admittance (Y-value) indicates how quickly a surface can absorb and release heat in response to cyclic temperature variations. High admittance surfaces (exposed concrete) help moderate indoor temperatures.',
  },
  {
    id: 5,
    question: 'When should peak heating load calculations exclude solar and internal gains?',
    options: [
      'Only for residential buildings',
      'When sizing boiler plant capacity',
      'Only for naturally ventilated buildings',
      'Never - always include all gains',
    ],
    correctAnswer: 1,
    explanation:
      'Peak heating load calculations for boiler sizing typically exclude solar and internal gains to ensure adequate capacity during worst-case conditions (early morning, cloudy winter days with minimal occupancy).',
  },
  {
    id: 6,
    question: 'CIBSE Guide A provides degree-day data for:',
    options: [
      'Calculating instantaneous heating loads only',
      'Determining equipment maintenance schedules',
      'Estimating annual energy consumption',
      'Setting thermostat schedules',
    ],
    correctAnswer: 2,
    explanation:
      'Degree-day data allows estimation of annual heating energy consumption by correlating heating requirements with cumulative temperature differences below the base temperature throughout the heating season.',
  },
  {
    id: 7,
    question: 'What is the typical design margin applied to calculated cooling loads?',
    options: [
      '0-5%',
      '5-10%',
      '20-25%',
      '10-15%',
    ],
    correctAnswer: 3,
    explanation:
      'A design margin of 10-15% is typically applied to calculated cooling loads to account for uncertainties in occupancy patterns, equipment loads, and future changes, without excessive oversizing.',
  },
  {
    id: 8,
    question: 'Which factor has the greatest impact on cooling load in a highly glazed building?',
    options: [
      'Solar gain through glazing',
      'Lighting heat gain',
      'Infiltration',
      'Fabric heat gain through walls',
    ],
    correctAnswer: 0,
    explanation:
      'In highly glazed buildings, solar gain through windows typically dominates the cooling load, often accounting for 40-60% of the total. This is why glazing specification (g-value) is critical for cooling system sizing.',
  },
  {
    id: 9,
    question: "The CIBSE 'admittance method' for cooling load calculations:",
    options: [
      'Ignores thermal mass and treats all gains as instantaneous',
      'Accounts for time lag and decrement factor of building elements',
      'Applies only to lightweight, naturally ventilated buildings',
      'Calculates only the latent component of the fresh-air load',
    ],
    correctAnswer: 1,
    explanation:
      'The admittance method accounts for the dynamic thermal behaviour of building elements, including time lag (delay in heat transfer) and decrement factor (reduction in temperature swing through heavy construction).',
  },
  {
    id: 10,
    question:
      'For fresh air load calculations, what is the typical sensible heat ratio for UK summer conditions?',
    options: [
      '0.5-0.6',
      'It varies too much to generalise',
      '0.7-0.8',
      '0.9-1.0',
    ],
    correctAnswer: 2,
    explanation:
      'UK summer conditions typically have a sensible heat ratio of 0.7-0.8, meaning 70-80% of the cooling load from outdoor air is sensible (temperature) and 20-30% is latent (moisture).',
  },
  {
    id: 11,
    question: 'What information does CIBSE TM54 provide for load calculations?',
    options: [
      'Detailed U-value calculations for the building fabric',
      'Refrigerant charge calculations for chiller plant',
      'Peak heating load procedures for boiler sizing',
      'Realistic operational energy prediction methodology',
    ],
    correctAnswer: 3,
    explanation:
      "CIBSE TM54 'Evaluating operational energy performance of buildings at the design stage' provides methodology for predicting realistic operational energy use, addressing the gap between design predictions and actual performance.",
  },
  {
    id: 12,
    question:
      'When calculating heating loads, what infiltration rate is typically assumed for a modern sealed office building?',
    options: [
      '0.1-0.25 ACH',
      '2.5-3.0 ACH',
      '1.5-2.0 ACH',
      '0.5-1.0 ACH',
    ],
    correctAnswer: 0,
    explanation:
      'Modern sealed office buildings with controlled ventilation typically achieve 0.1-0.25 ACH infiltration. Higher rates apply to naturally ventilated buildings or older construction with poor air tightness.',
  },
];

const faqs = [
  {
    question: 'Why do calculated loads often differ from actual building performance?',
    answer:
      "The 'performance gap' arises from multiple factors: optimistic assumptions about occupancy patterns, equipment schedules not matching reality, poor commissioning, occupant behaviour differing from design assumptions, and simplified modelling of complex building physics. CIBSE TM54 methodology addresses this by using more realistic operational profiles.",
  },
  {
    question: 'How do I decide between steady-state and dynamic calculation methods?',
    answer:
      'Steady-state methods (simple U-value calculations) are appropriate for heating load estimates in heavyweight buildings with stable conditions. Dynamic methods (admittance, simulation) are essential for cooling loads, lightweight buildings, intermittent operation, or buildings with significant solar gains where thermal mass effects are important.',
  },
  {
    question: 'What is the relationship between connected load and design load?',
    answer:
      'Connected load is the sum of all installed equipment ratings. Design load applies diversity factors to connected load, recognising that not everything operates simultaneously at full capacity. For example, a floor with 100kW connected small power might have 70kW design load (0.7 diversity). Design load determines plant sizing.',
  },
  {
    question: 'Should I use the same diversity factors for all building types?',
    answer:
      'No - diversity factors vary significantly by building type and use. Hospitals may have 0.8-0.9 diversity (critical loads, predictable patterns), while speculative offices might use 0.5-0.6 (variable occupancy). Data centres require 1.0 diversity for IT loads. Always verify appropriate factors from CIBSE Guide A or client requirements.',
  },
  {
    question: 'How do climate change projections affect load calculations?',
    answer:
      'CIBSE provides future weather files (Design Summer Years for 2020s, 2050s, 2080s) for assessing overheating risk and future cooling demand. New buildings should be assessed against future scenarios. Heating loads decrease slightly but cooling loads can increase substantially, affecting system selection and sizing.',
  },
  {
    question: 'What margin should I add to calculated loads and why?',
    answer:
      'Typical margins are 10-15% for cooling, 10% for heating. These account for calculation uncertainties, minor future changes, and system degradation. Avoid excessive margins (>20%) as oversized plant operates inefficiently at part-load. Document your margin assumptions clearly for future reference.',
  },
];

const HNCModule2Section6_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section6')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 2 · Section 6 · Subsection 1"
            title="Load Estimation Methods"
            description="CIBSE methodologies for accurate heating and cooling load calculations in building services design."
            tone="purple"
          />

          <TLDR
            points={[
              'You compute heating load by summing fabric, infiltration and ventilation losses at design winter T (no internal gains credit when sizing the heat-source).',
              'You compute cooling load by summing fabric gain (cooling-design ΔT), solar gain (CIBSE irradiance × g-value), and internal gains (people, IT, lighting) at the building&rsquo;s sensible peak hour.',
              'You apply diversity factors (CIBSE Guide A occupancy and equipment) to avoid oversizing — a 0.7 IT diversity in a flexible office, 0.5 in a call centre.',
              'You distinguish steady-state (CIBSE Guide A admittance method, plant sizing) from dynamic simulation (TM52/TM54, energy and overheating studies).',
            ]}
          />

          <RegsCallout
            source="CIBSE Guide A — Environmental Design and Guide B1/B3 (Heating, Cooling)"
            clause="Recommended methodology for heating load calculations using fabric and ventilation steady-state losses, and for cooling load calculations using the admittance method or dynamic simulation; design diversities for occupants, equipment and lighting by space type."
            meaning={
              <>
                CIBSE Guide A + B1/B3 is the canonical UK approach. As HNC engineer you cite
                them on the load schedule cover sheet so the M&amp;E commissioning engineer,
                BREEAM assessor and Part L SBEM modeller are all working from the same
                load-derivation methodology.
              </>
            }
            cite="Source: CIBSE Guide A — Environmental Design; CIBSE Guide B1 — Heating; CIBSE Guide B3 — Air-Conditioning, Air Handling and Refrigeration; BS EN 12831-1 Energy performance of buildings — Method for calculation of the design heat load."
          />

          <LearningOutcomes
            outcomes={[
              'Apply CIBSE methodologies for heating load calculations',
              'Calculate cooling loads including solar and internal gains',
              'Understand and apply appropriate diversity factors',
              'Distinguish between steady-state and dynamic methods',
              'Apply suitable design margins for system sizing',
              'Recognise sources of uncertainty in load estimates',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="Heating Load Calculations"
            plainEnglish="Heating load is the rate of heat loss at the worst-case external temperature. Add fabric, infiltration and ventilation losses, leave gains out for boiler sizing."
          >
            <p>
              Heating load calculations determine the rate of heat loss from a building under design
              conditions, enabling correct sizing of boilers, heat pumps, and distribution systems.
              CIBSE Guide A provides the fundamental methodology.
            </p>
            <p>
              <strong>Components of heating load:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Fabric losses:</strong> Heat flow through walls, roof, floor, windows (Q = U × A × ΔT)
              </li>
              <li>
                <strong>Infiltration:</strong> Heat loss due to uncontrolled air leakage
              </li>
              <li>
                <strong>Ventilation:</strong> Heat required to warm fresh air supply
              </li>
              <li>
                <strong>Cold bridging:</strong> Additional losses through thermal bridges
              </li>
            </ul>
            <p>
              <strong>CIBSE design temperatures (UK), heating design temp / notes (1% exceedance):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>London (central): -2°C</li>
              <li>Birmingham: -3°C</li>
              <li>Manchester: -3°C</li>
              <li>Edinburgh: -4°C</li>
              <li>Belfast: -2°C</li>
            </ul>
            <p>
              <strong>Basic heating load formula:</strong> Q_total = Q_fabric + Q_infiltration + Q_ventilation.
              Where Q = heat loss rate (W), typically calculated at design ΔT.
            </p>
            <p>
              <strong>Key point:</strong> Peak heating load calculations typically exclude solar and
              internal gains to ensure adequate capacity during worst-case early morning conditions.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock
            title="Cooling Load Calculations"
            plainEnglish="Cooling loads are nastier than heating - solar swings, internal gains and thermal mass all interact in time. CIBSE's admittance method (or full simulation) is the way."
          >
            <p>
              Cooling load calculations are more complex than heating, involving solar gains,
              internal heat sources, and the dynamic response of building thermal mass. The CIBSE
              admittance method accounts for these time-varying effects.
            </p>
            <p>
              <strong>Components of cooling load:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Solar gain (glazing):</strong> Direct and diffuse radiation through windows
              </li>
              <li>
                <strong>Solar gain (fabric):</strong> Absorbed radiation conducted through opaque elements
              </li>
              <li>
                <strong>Internal gains:</strong> People, lighting, equipment
              </li>
              <li>
                <strong>Fresh air load:</strong> Sensible and latent cooling of outdoor air
              </li>
              <li>
                <strong>Fabric gain:</strong> Conduction when external &gt; internal temperature
              </li>
            </ul>
            <p>
              <strong>Typical internal gains (CIBSE):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>People (sedentary):</strong> 90W sensible, 60W latent
              </li>
              <li>
                <strong>Office lighting:</strong> 10-12 W/m²
              </li>
              <li>
                <strong>Small power:</strong> 15-25 W/m²
              </li>
              <li>
                <strong>Computer:</strong> 65-130W per workstation
              </li>
            </ul>
            <p>
              <strong>Peak load timing:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>East façade:</strong> 8:00-10:00 AM
              </li>
              <li>
                <strong>South façade:</strong> 12:00-2:00 PM
              </li>
              <li>
                <strong>West façade:</strong> 3:00-5:00 PM
              </li>
              <li>
                <strong>Whole building:</strong> Often 2:00-4:00 PM
              </li>
            </ul>
            <p>
              <strong>Sol-air temperature concept:</strong> T_sol-air = T_ao + (α × I / h_o) -
              (ε × ΔR / h_o). Where T_ao = outside air temp, α = solar absorptance, I = solar
              intensity, h_o = external heat transfer coefficient.
            </p>
            <p>
              <strong>Critical consideration:</strong> Solar gains through glazing often dominate
              cooling loads in modern buildings. Always verify glazing g-values and shading
              effectiveness.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock
            title="Diversity Factors"
            plainEnglish="Not everything is on at once. Diversity factors take the connected load down to a realistic peak so plant isn't grossly oversized."
          >
            <p>
              Diversity factors recognise that not all installed equipment operates simultaneously
              at full capacity. Applying appropriate diversity reduces oversizing while maintaining
              adequate capacity for realistic operating conditions.
            </p>
            <p>
              <strong>CIBSE recommended diversity factors (load type / building type / factor):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Small power / open-plan office: 0.6-0.7</li>
              <li>Small power / cellular office: 0.5-0.6</li>
              <li>Lighting / office (daylight controlled): 0.7-0.8</li>
              <li>Occupancy / open-plan office: 0.7-0.8</li>
              <li>IT equipment / data centre: 1.0</li>
              <li>All loads / hospital (critical areas): 0.85-0.95</li>
            </ul>
            <p>
              <strong>Design load calculation:</strong> Q_design = Q_connected × Diversity Factor.
              Example: 100kW connected small power × 0.7 diversity = 70kW design load.
            </p>
            <p>
              <strong>When NOT to apply diversity:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Individual circuit sizing (use full connected load)</li>
              <li>Critical/life-safety systems</li>
              <li>Equipment with known simultaneous operation</li>
              <li>Contractual requirements specifying full capacity</li>
            </ul>
            <p>
              <strong>Best practice:</strong> Document all diversity assumptions clearly. They
              significantly affect plant sizing and may need to be adjusted if building use changes.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock
            title="Design Margins and Uncertainty"
            plainEnglish="Margins cover what you don't know - occupancy changes, weather drift, control sloppiness. Too little = comfort fail. Too much = oversized, inefficient plant."
          >
            <p>
              Design margins account for calculation uncertainties, minor future changes, and the
              need for robust operation. However, excessive margins lead to oversized, inefficient
              systems that operate poorly at part-load.
            </p>
            <p>
              <strong>Recommended design margins (system / typical margin / justification):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Cooling plant: 10-15% (uncertainty in gains, future changes)</li>
              <li>Heating plant: 10% (preheat capacity, setback recovery)</li>
              <li>Air handling units: 10% (duct leakage, filter loading)</li>
              <li>Pump duties: 10-15% (system resistance uncertainty)</li>
              <li>Fan duties: 10-15% (duct pressure losses, filter condition)</li>
            </ul>
            <p>
              <strong>Sources of uncertainty in load calculations:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Occupancy patterns:</strong> Actual vs. assumed schedules
              </li>
              <li>
                <strong>Equipment loads:</strong> Future changes, actual vs. nameplate
              </li>
              <li>
                <strong>Weather data:</strong> Historic vs. future climate
              </li>
              <li>
                <strong>Construction quality:</strong> Air tightness, thermal bridging
              </li>
              <li>
                <strong>Control effectiveness:</strong> Assumed vs. achieved performance
              </li>
            </ul>
            <p>
              <strong>Dangers of excessive margins:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Increased capital cost for larger equipment</li>
              <li>Poor part-load efficiency (especially chillers)</li>
              <li>Control problems at low loads</li>
              <li>Short-cycling of boilers and chillers</li>
              <li>Wasted plant room space</li>
            </ul>
            <p>
              <strong>Professional judgement:</strong> Balance the consequences of undersizing
              (comfort failure, complaints) against oversizing (inefficiency, cost). Document your
              margin decisions.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock
            title="Worked examples"
            plainEnglish="Three sums covering an office heating load, the impact of diversity on internal gains, and the sensible+latent fresh-air cooling load."
          >
            <p>
              <strong>Example 1 - Office heating load:</strong> Calculate the peak heating load
              for a 500m² office floor in Birmingham with U-values: walls 0.25 W/m²K, windows
              1.4 W/m²K, roof 0.18 W/m²K. Assume wall area 200m², window area 80m², roof 500m².
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Design conditions: Internal 21°C, External -3°C, ΔT = 24K</li>
              <li>Walls: 0.25 × 200 × 24 = 1,200W</li>
              <li>Windows: 1.4 × 80 × 24 = 2,688W</li>
              <li>Roof: 0.18 × 500 × 24 = 2,160W</li>
              <li>Infiltration (0.25 ACH, 3m height): V = 500 × 3 × 0.25 = 375 m³/h, Q = 0.33 × 375 × 24 = 2,970W</li>
              <li>Total: 1,200 + 2,688 + 2,160 + 2,970 = <strong>9,018W ≈ 9kW</strong></li>
              <li>With 10% margin: 9.9kW design heating load</li>
            </ul>
            <p>
              <strong>Example 2 - Cooling load with diversity:</strong> Calculate the internal
              gains for a 200m² open-plan office with 20 workstations.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Lighting: 200m² × 12 W/m² = 2,400W</li>
              <li>Small power: 200m² × 20 W/m² = 4,000W</li>
              <li>People: 20 × 90W sensible = 1,800W</li>
              <li>Total connected: 8,200W</li>
              <li>With diversity: lighting × 0.75 = 1,800W; small power × 0.7 = 2,800W; occupancy × 0.75 = 1,350W</li>
              <li>Design internal gains: <strong>5,950W</strong></li>
              <li>Diversity reduced load from 8.2kW to 5.95kW (27% reduction)</li>
            </ul>
            <p>
              <strong>Example 3 - Fresh air cooling load:</strong> Calculate the cooling load from
              fresh air for 20 people at 12 l/s per person. External: 28°C/50%RH, Internal: 24°C/50%RH.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Fresh air rate: 20 × 12 = 240 l/s = 0.24 m³/s</li>
              <li>Sensible: Q_s = ρ × c_p × V̇ × ΔT = 1.2 × 1.02 × 0.24 × (28-24) = <strong>1.18 kW</strong></li>
              <li>Latent: from psychrometric chart, Δg ≈ 2 g/kg, Q_L = 1.2 × 0.24 × 0.002 × 2450 = <strong>1.41 kW</strong></li>
              <li>Total fresh air load: <strong>2.59 kW</strong></li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="Practical guidance"
            plainEnglish="The handful of formulas, gain figures and diversity numbers you'll be using on every load calc."
          >
            <p>
              <strong>Essential formulas:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Q = U × A × ΔT</strong> — Fabric heat loss/gain
              </li>
              <li>
                <strong>Q = 0.33 × V̇ × ΔT</strong> — Ventilation sensible load (W)
              </li>
              <li>
                <strong>Q = ρ × c_p × V̇ × ΔT</strong> — Air sensible cooling
              </li>
              <li>
                <strong>Design load = Connected × Diversity</strong> — Diversified load
              </li>
            </ul>
            <p>
              <strong>Key values to remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Air density: <strong>1.2 kg/m³</strong>
              </li>
              <li>
                Air specific heat: <strong>1.02 kJ/kg·K</strong>
              </li>
              <li>
                Typical office small power: <strong>15-25 W/m²</strong>
              </li>
              <li>
                Sedentary person heat output: <strong>90W sensible + 60W latent</strong>
              </li>
              <li>
                Fresh air rate (office): <strong>10-12 l/s per person</strong>
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Double-counting</strong> — Don't add margins at each stage
                </li>
                <li>
                  <strong>Wrong peak time</strong> — Different zones peak at different times
                </li>
                <li>
                  <strong>Ignoring thermal mass</strong> — Affects timing and magnitude of cooling loads
                </li>
                <li>
                  <strong>Incorrect diversity</strong> — Don't apply diversity to already-diversified figures
                </li>
              </ul>
            }
            doInstead="Apply margin once at the end, identify the actual coincident peak across zones, account for thermal mass in cooling timing, and only apply diversity to connected (not already-diversified) loads."
          />

          <SectionRule />

          <Scenario
            title="Cooling-load schedule for a 4,500 m² speculative office"
            situation={
              <>
                You are producing the Stage-3 cooling load schedule for a 4,500 m²
                speculative office. The architect has fixed glazing ratio (40% south, 30%
                north), G-value 0.4, opening lights for purge ventilation. Tenant fit-out
                density is unknown — speculative.
              </>
            }
            whatToDo={
              <>
                Apply CIBSE Guide A typical office densities: 1 person per 10 m², 25 W/m²
                small power, 8 W/m² lighting (post-LED). Use July 21 design irradiance from
                Guide A for solar gain. Apply diversity 0.8 IT, 1.0 people, 0.9 lighting
                for spec-office worst case. Sum sensible loads at peak hour (typically 15:00
                south-facing zones, 17:00 west-facing). Add a 15% margin on cooling-coil
                duty for tenant uplift, and a 10% margin on chiller duty for diversity
                across zones.
              </>
            }
            whyItMatters={
              <>
                Spec offices are sized once and sold for 25 years. Undersize: tenant moves
                out, building gets a poor reputation in the market. Oversize: capex hit, EPC
                deterioration, ESG credentials suffer. CIBSE-grounded diversities and margins
                give the defendable middle ground.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Heating load = Σ(Q_fabric + Q_vent + Q_inf) at design winter T — no internal gain credit when sizing heat source.',
              'Cooling load = Σ(Q_fabric_summer + Q_solar + Q_internal) at the building&rsquo;s sensible peak hour.',
              'Diversity factors avoid oversizing — read from CIBSE Guide A by occupancy and equipment type.',
              'Steady-state (admittance method) used for plant sizing; dynamic simulation used for energy and overheating studies.',
              'Design margins typical: 10% on heating, 15% on cooling, 20% on humidifiers — document in the schedule notes.',
              'Sensible / latent split must be clear on the cooling schedule — drives coil row count and humidifier duty.',
              'Cross-check totals against benchmark W/m² for the building type — sanity test.',
              'CIBSE Guide A + B1/B3 is the canonical UK methodology; BS EN 12831 is the harmonised European method.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section6')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Applied building services science
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section6-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Energy analysis
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule2Section6_1;
