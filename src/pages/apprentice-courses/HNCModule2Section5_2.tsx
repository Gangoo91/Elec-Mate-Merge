/**
 * Module 2 · Section 5 · Subsection 2 — Heat Gains and Losses
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   Internal gains from occupants, equipment and lighting; external fabric losses;
 *   diversity factors and the sensible/latent split — the heat-balance numbers
 *   behind every heating and cooling load schedule.
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

const TITLE = 'Heat Gains and Losses - HNC Module 2 Section 5.2';
const DESCRIPTION =
  'Understanding internal heat gains from people, equipment and lighting, external gains and losses, steady state versus dynamic analysis, and CIBSE design data.';

const quickCheckQuestions = [
  {
    id: 'sedentary-heat',
    question:
      'What is the typical total heat emission from a sedentary office worker according to CIBSE Guide A?',
    options: [
      '200W',
      '50W',
      '90W',
      '130W',
    ],
    correctIndex: 3,
    explanation:
      'A sedentary office worker emits approximately 130W total (75W sensible, 55W latent). This varies with activity level - light office work is about 140W, walking slowly about 180W.',
  },
  {
    id: 'lighting-gain',
    question:
      'What power density (W/m²) would you typically use for modern LED office lighting heat gain?',
    options: [
      '20-25 W/m²',
      '5-8 W/m²',
      '30-35 W/m²',
      '10-12 W/m²',
    ],
    correctIndex: 3,
    explanation:
      'Modern LED office lighting typically uses 10-12 W/m². All electrical energy in lighting ultimately becomes heat (either directly or after being absorbed by surfaces), so this equals the heat gain.',
  },
  {
    id: 'equipment-diversity',
    question:
      'When calculating equipment heat gains in an open-plan office, what diversity factor is typically applied?',
    options: [
      '0.3-0.5',
      '0.5-0.7',
      '0.7-0.9',
      '1.0 (no diversity)',
    ],
    correctIndex: 1,
    explanation:
      'CIBSE recommends diversity factors of 0.5-0.7 for office equipment as not all equipment operates simultaneously at peak load. Without diversity, designs would be significantly oversized.',
  },
  {
    id: 'steady-vs-dynamic',
    question:
      'Which calculation method accounts for thermal mass effects when determining cooling load?',
    options: [
      'Steady-state heat loss',
      'Dynamic thermal simulation',
      'U-value calculation',
      'Degree-day method',
    ],
    correctIndex: 1,
    explanation:
      "Dynamic thermal simulation accounts for thermal mass, time lag, and varying conditions throughout the day. Steady-state calculations assume equilibrium and don't capture storage effects.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What are the two components of heat emission from occupants?',
    options: [
      'Radiant and convective',
      'Sensible and latent',
      'Direct and indirect',
      'Conductive and convective',
    ],
    correctAnswer: 1,
    explanation:
      'Occupants emit sensible heat (raising air temperature) and latent heat (adding moisture through respiration and perspiration). The ratio varies with activity level - more latent at higher activity.',
  },
  {
    id: 2,
    question:
      'A computer monitor rated at 65W has an electrical efficiency factor of 0.90. What is the heat gain to the space?',
    options: [
      '72.2W',
      '58.5W',
      '65W',
      '6.5W',
    ],
    correctAnswer: 2,
    explanation:
      'All electrical energy consumed by equipment in a space becomes heat (conservation of energy). The 65W rating is the heat gain regardless of efficiency - efficiency affects how much useful light/work is produced.',
  },
  {
    id: 3,
    question: 'Which CIBSE Guide provides benchmark values for internal heat gains?',
    options: [
      'CIBSE Guide F',
      'CIBSE Guide B',
      'CIBSE TM46',
      'CIBSE Guide A',
    ],
    correctAnswer: 3,
    explanation:
      'CIBSE Guide A (Environmental Design) provides comprehensive tables of internal heat gains from people, equipment, and lighting for various building types and activities.',
  },
  {
    id: 4,
    question: 'What is the typical small power heat gain allowance for a cellular office?',
    options: [
      '15-20 W/m²',
      '10 W/m²',
      '25-30 W/m²',
      '40-50 W/m²',
    ],
    correctAnswer: 0,
    explanation:
      'CIBSE Guide A suggests 15-20 W/m² for cellular offices with typical IT equipment. Open-plan offices may use 20-25 W/m² due to higher equipment density.',
  },
  {
    id: 5,
    question: 'For a steady-state heat loss calculation, which formula is correct?',
    options: [
      'Q = U × A × (Ti + To)',
      'Q = U × A × (Ti - To)',
      'Q = U / A × (Ti - To)',
      'Q = A × (Ti - To) / U',
    ],
    correctAnswer: 1,
    explanation:
      'Heat loss Q = U × A × ΔT, where U is thermal transmittance (W/m²K), A is area (m²), and ΔT is temperature difference (K or °C). This gives heat flow in Watts.',
  },
  {
    id: 6,
    question:
      'What percentage of fluorescent lamp rated power is typically emitted as heat to the room space?',
    options: [
      '20-25%',
      '40-50%',
      '100%',
      '70-80%',
    ],
    correctAnswer: 2,
    explanation:
      '100% of electrical power to lighting becomes heat. About 20-25% is light (which becomes heat when absorbed by surfaces), and 75-80% is direct heat. All energy ends as heat in the space.',
  },
  {
    id: 7,
    question: 'Which factor does NOT affect fabric heat loss in winter?',
    options: [
      'U-value of construction',
      'Surface area of external elements',
      'Indoor-outdoor temperature difference',
      'Solar gains through glazing',
    ],
    correctAnswer: 3,
    explanation:
      "Fabric heat loss depends on U-value, area, and temperature difference. Solar gains are separate heat gains (positive contribution) and don't affect conductive heat loss through the fabric.",
  },
  {
    id: 8,
    question:
      'A gym with 50 people exercising (200W/person) needs what sensible cooling capacity just for occupants?',
    options: [
      'Cannot determine - need split data',
      'Reactive components (inductors, capacitors)',
      'CPC not connected properly at a socket',
      'Reduced latency and improved privacy',
    ],
    correctAnswer: 0,
    explanation:
      'The 200W total includes both sensible and latent components. For exercising occupants, only about 35-40% is sensible heat. Need CIBSE data splitting sensible/latent for accurate cooling load.',
  },
  {
    id: 9,
    question: "What is meant by 'peak coincident gains' in cooling load calculations?",
    options: [
      'Current-carrying conductor in a magnetic field experiences a force',
      'The total gains occurring simultaneously at a specific time',
      'Between 450 mm and 1200 mm above FFL — the "reach range".',
      'Outputting fixed test signals for system testing',
    ],
    correctAnswer: 1,
    explanation:
      'Peak coincident gains are the total gains occurring at the same time, not the sum of individual peaks (which may occur at different times). This is the relevant value for sizing cooling plant.',
  },
  {
    id: 10,
    question: 'For a server room with 24/7 operation, what heat gain diversity would you apply?',
    options: [
      '0.5',
      '0.7',
      '1.0',
      '0.85',
    ],
    correctAnswer: 2,
    explanation:
      'Server rooms typically run at full load continuously, so diversity is 1.0 (no reduction). Applying diversity to 24/7 critical loads would result in undersized cooling and potential equipment damage.',
  },
  {
    id: 11,
    question: "The 'admittance method' for cooling load calculation accounts for which phenomenon?",
    options: [
      'Air infiltration rates',
      'Ventilation heat exchange',
      'Latent heat from occupants',
      'Thermal storage in building fabric',
    ],
    correctAnswer: 3,
    explanation:
      'The admittance method (CIBSE Guide A) accounts for thermal storage in building elements, using admittance (Y-value) to determine how gains are absorbed and released over time.',
  },
  {
    id: 12,
    question: 'What is the typical occupancy density used for office cooling load calculations?',
    options: [
      '8-12 m²/person',
      '25 m²/person',
      '5 m²/person',
      '15-20 m²/person',
    ],
    correctAnswer: 0,
    explanation:
      'CIBSE Guide A suggests 8-12 m²/person for general offices (10 m²/person is commonly used). Call centres may be 5-8 m²/person; executive offices 15-20 m²/person.',
  },
];

const faqs = [
  {
    question: 'How do I split sensible and latent heat from occupants?',
    answer:
      'CIBSE Guide A Table 6.3 provides sensible/latent splits for various activity levels. Sedentary (20°C): 75W sensible, 55W latent. Light work: 75W/70W. Heavy work: 90W/300W. The latent fraction increases significantly with activity level due to increased perspiration.',
  },
  {
    question: "Should I include heat gain from lighting that is 'uplight'?",
    answer:
      'Yes - all lighting power becomes heat regardless of direction. Uplighting heats the ceiling which re-radiates to the space. The only exception is if lights are in a ventilated ceiling void with extract directly above - then some heat is removed before entering the space.',
  },
  {
    question: 'What is the difference between installed load and design load for equipment?',
    answer:
      'Installed load is the total nameplate rating of all equipment. Design load applies diversity (typically 0.5-0.7) and usage factors because not all equipment operates simultaneously at full power. Always clarify which value clients specify in briefs.',
  },
  {
    question: 'How do I handle heat gains from adjacent spaces?',
    answer:
      'If adjacent space is conditioned to similar temperature, heat transfer is negligible. If unconditioned (corridor, store), calculate using temperature difference and partition U-value. For adjacent spaces with high gains (kitchens, server rooms), this can be significant.',
  },
  {
    question: 'When should I use steady-state versus dynamic calculations?',
    answer:
      'Steady-state is suitable for heating load calculations and quick estimates. Dynamic simulation is essential for cooling loads, overheating analysis, and heavyweight buildings where thermal mass significantly affects peak loads and timing.',
  },
  {
    question: 'How do equipment heat gains affect ventilation requirements?',
    answer:
      'Higher heat gains require more cooling, often delivered via increased ventilation rates. However, ventilation should be based on fresh air requirements (CO2, pollutant dilution) not just cooling. Use mechanical cooling if ventilation alone cannot maintain comfort.',
  },
];

const HNCModule2Section5_2 = () => {
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
            eyebrow="Module 2 · Section 5 · Subsection 2"
            title="Heat Gains and Losses"
            description="Internal gains from occupants, equipment and lighting, plus external fabric heat flows."
            tone="purple"
          />

          <TLDR
            points={[
              'You compute occupant gains by activity (75 W sensible + 55 W latent for light office work; 165 W + 145 W for heavy work) — quoted from CIBSE Guide A.',
              'You apply equipment and lighting power densities (typical office: 15 W/m² IT, 8 W/m² lighting) and never use installed kW without a diversity factor.',
              'You compute fabric losses Q = U × A × ΔT for each element (walls, glazing, roof, floor) and sum them for the heating-coil duty.',
              'You separate sensible and latent loads — critical for cooling coil sizing and humidifier selection.',
            ]}
          />

          <RegsCallout
            source="CIBSE Guide A — Environmental Design (Internal Gains, Heat Loss)"
            clause="Recommended internal heat gain values for occupants by activity, equipment by space type, lighting by application; UK external winter and summer design temperatures by region; methodology for fabric heat-loss calculations."
            meaning={
              <>
                CIBSE Guide A is the master reference for the input values that go into
                every heating and cooling load calculation in the UK. Cite it on the load
                schedule alongside Guide B sizing methods so the calculation is auditable
                end-to-end.
              </>
            }
            cite="Source: CIBSE Guide A — Environmental Design; CIBSE Guide B1 — Heating; BS EN 12831-1 Energy performance of buildings — Method for calculation of the design heat load."
          />

          <LearningOutcomes
            outcomes={[
              'Calculate heat gains from occupants for different activities',
              'Determine equipment and lighting gains using CIBSE data',
              'Apply diversity factors for realistic peak loads',
              'Calculate fabric heat losses for heating system sizing',
              'Understand steady-state versus dynamic analysis',
              'Distinguish sensible and latent heat components',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="Internal Gains - People"
            plainEnglish="Bodies put out heat in two flavours: sensible (warms the air) and latent (adds moisture). The harder people work, the more goes into latent."
          >
            <p>
              Occupants are significant heat sources, emitting both sensible heat (warming the air)
              and latent heat (adding moisture). The emission rate varies substantially with
              activity level and environmental conditions.
            </p>
            <p>
              <strong>Key concepts:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Sensible heat:</strong> Raises air dry-bulb temperature, handled by cooling coils
              </li>
              <li>
                <strong>Latent heat:</strong> Adds moisture, increases humidity, requires dehumidification
              </li>
              <li>
                <strong>Metabolic rate:</strong> Expressed in 'Met' units (1 Met = 58.2 W/m² body area)
              </li>
              <li>
                <strong>Environmental effect:</strong> Higher room temperatures shift emission towards latent
              </li>
            </ul>
            <p>
              <strong>Heat emission by activity (CIBSE Guide A) - total / sensible / latent in W:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Seated at rest: 115 / 70 / 45</li>
              <li>Sedentary office work: 130 / 75 / 55</li>
              <li>Standing, light work: 150 / 80 / 70</li>
              <li>Walking (retail): 180 / 90 / 90</li>
              <li>Factory bench work: 235 / 100 / 135</li>
              <li>Gymnasium exercise: 400+ / 120 / 280+</li>
            </ul>
            <p>
              <strong>Occupant gain calculation:</strong> Q_occ = N × q × D. Where N = number of
              occupants, q = heat emission (W/person), D = diversity factor.
            </p>
            <p>
              <strong>Diversity note:</strong> Peak occupancy rarely occurs simultaneously with peak
              equipment use. Diversity factors of 0.75-0.90 are typical for office occupancy.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock
            title="Internal Gains - Equipment and Lighting"
            plainEnglish="Every watt that goes into equipment or lighting comes back out as heat. Modern offices often have more equipment heat than people heat."
          >
            <p>
              Electrical equipment and lighting convert electrical energy to heat. In modern
              offices, equipment gains often exceed occupant gains and can dominate cooling loads,
              particularly in IT-intensive spaces.
            </p>
            <p>
              <strong>Equipment principles:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>First law:</strong> All electrical energy becomes heat (conservation of energy)
              </li>
              <li>
                <strong>Nameplate vs actual:</strong> Equipment rarely runs at rated power continuously
              </li>
              <li>
                <strong>Diversity:</strong> Not all equipment operates simultaneously at peak
              </li>
              <li>
                <strong>Standby power:</strong> Modern equipment has significant standby consumption
              </li>
            </ul>
            <p>
              <strong>CIBSE equipment benchmarks:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Cellular office: 15-20 W/m²</li>
              <li>Open-plan office: 20-25 W/m²</li>
              <li>Dealing room: 35-50 W/m²</li>
              <li>Server/comms room: 200-500 W/m²</li>
              <li>Classroom: 5-10 W/m²</li>
            </ul>
            <p>
              <strong>Typical equipment heat:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Desktop PC: 80-150W (operation)</li>
              <li>Laptop: 30-60W</li>
              <li>Monitor (LED 24"): 25-40W</li>
              <li>Laser printer (active): 400-600W</li>
              <li>Multifunction copier: 200-500W</li>
            </ul>
            <p>
              <strong>Lighting heat gains (W/m² - LED / fluorescent):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>General office: 10-12 / 15-18</li>
              <li>Corridors/circulation: 5-8 / 8-12</li>
              <li>Retail sales floor: 15-25 / 20-35</li>
              <li>Industrial/warehouse: 5-10 / 8-15</li>
            </ul>
            <p>
              <strong>All lighting is heat:</strong> The visible light portion (20-25%) is absorbed
              by surfaces and becomes heat anyway. For cooling calculations, use the full electrical
              power.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock
            title="External Heat Gains and Losses"
            plainEnglish="Heat through the fabric is mostly loss in winter, gain in summer. Sol-air temperature is your shortcut for solar-warmed roofs and walls."
          >
            <p>
              Heat flows through the building fabric due to temperature differences between inside
              and outside. In winter this is predominantly heat loss; in summer, gains can occur
              through the fabric, particularly through glazing and poorly insulated roofs.
            </p>
            <p>
              <strong>Steady-state heat transfer:</strong> Q = U × A × (Ti - To). Where U = thermal
              transmittance (W/m²K), A = area (m²), T = temperatures (°C).
            </p>
            <p>
              <strong>Components of fabric heat flow:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Walls:</strong> External, party walls to unconditioned spaces, ground-contact
              </li>
              <li>
                <strong>Roof:</strong> Significant in summer due to solar absorption (sol-air temperature)
              </li>
              <li>
                <strong>Floor:</strong> Ground contact or to unheated spaces below
              </li>
              <li>
                <strong>Glazing:</strong> High U-value but also solar gains (see Section 5.1)
              </li>
              <li>
                <strong>Thermal bridges:</strong> Junctions, lintels, reveals increase effective U-value
              </li>
            </ul>
            <p>
              <strong>Sol-air temperature concept:</strong> In summer, external surfaces are heated
              by solar radiation above air temperature. The sol-air temperature accounts for this
              absorbed radiation when calculating heat gain through opaque elements.
            </p>
            <p>
              <strong>Typical sol-air values:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Dark horizontal roof: 50-60°C (peak summer midday)</li>
              <li>Light horizontal roof: 35-45°C (reflective surface helps)</li>
              <li>South-facing wall: 30-40°C (lower due to lower incidence)</li>
              <li>North-facing wall: ≈ air temp (minimal direct radiation)</li>
            </ul>
            <p>
              <strong>Heating design:</strong> Heat loss calculations use steady-state method with
              external design temperature (typically -4°C to -1°C UK depending on location). Include
              a margin for morning boost.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock
            title="Steady State vs Dynamic Analysis"
            plainEnglish="Steady-state assumes nothing's changing. Dynamic models hour-by-hour. Use steady-state for heating loads and quick estimates, dynamic for cooling and overheating."
          >
            <p>
              Building thermal calculations can be performed using simple steady-state methods or
              complex dynamic simulations. The choice depends on building complexity, required
              accuracy, and regulatory requirements.
            </p>
            <p>
              <strong>Comparison of methods (steady-state vs dynamic simulation):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Time variation:</strong> Steady-state assumes equilibrium; dynamic uses hour-by-hour/sub-hourly
              </li>
              <li>
                <strong>Thermal mass:</strong> Steady-state not modelled; dynamic fully accounted
              </li>
              <li>
                <strong>Weather data:</strong> Steady-state design conditions only; dynamic uses annual weather file
              </li>
              <li>
                <strong>Complexity:</strong> Steady-state spreadsheet/hand calc; dynamic specialist software
              </li>
              <li>
                <strong>Best use:</strong> Steady-state for heating loads, estimates; dynamic for cooling, overheating, energy
              </li>
            </ul>
            <p>
              <strong>CIBSE admittance method:</strong> Semi-dynamic manual method using Y-value
              (admittance) for storage, swing in temperature calculation, good for simple
              single-zone spaces.
            </p>
            <p>
              <strong>Dynamic simulation tools:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>IES-VE (UK industry standard)</li>
              <li>EnergyPlus (US DOE)</li>
              <li>TRNSYS (research applications)</li>
              <li>DesignBuilder (simplified interface)</li>
            </ul>
            <p>
              <strong>When dynamic simulation is required:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Part L compliance (SBEM or DSM for complex buildings)</li>
              <li>Part O overheating assessment (TM59 method)</li>
              <li>BREEAM energy credits</li>
              <li>Heavyweight buildings with significant thermal mass</li>
              <li>Mixed-mode or naturally ventilated buildings</li>
            </ul>
            <p>
              <strong>Practical tip:</strong> Use steady-state for initial sizing and feasibility,
              then validate with dynamic simulation for detailed design. This saves time while
              ensuring accuracy.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock
            title="Worked examples"
            plainEnglish="Four numerical walk-throughs covering total internal gains, the impact of diversity, fabric heat loss, and sensible/latent splits for high-activity spaces."
          >
            <p>
              <strong>Example 1 - Office internal gains:</strong> Calculate the total internal heat
              gains for a 200m² open-plan office with 20 occupants (sedentary), LED lighting at
              12 W/m², and equipment at 22 W/m².
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Occupant gains = 20 × 130W = 2600W</li>
              <li>Lighting gains = 200m² × 12 W/m² = 2400W</li>
              <li>Equipment gains = 200m² × 22 W/m² = 4400W</li>
              <li>Total = 2600 + 2400 + 4400 = <strong>9400W = 9.4kW</strong></li>
              <li>Heat gain density = 9400/200 = 47 W/m² (typical for modern office)</li>
            </ul>
            <p>
              <strong>Example 2 - With diversity applied:</strong> Apply typical diversity factors
              to the above example: occupancy 0.85, lighting 0.90, equipment 0.70.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Occupant gains = 2600W × 0.85 = 2210W</li>
              <li>Lighting gains = 2400W × 0.90 = 2160W</li>
              <li>Equipment gains = 4400W × 0.70 = 3080W</li>
              <li>Total with diversity = 2210 + 2160 + 3080 = <strong>7450W = 7.5kW</strong></li>
              <li>Reduction from diversity = 9.4 - 7.5 = 1.9kW (20%)</li>
            </ul>
            <p>
              <strong>Example 3 - Fabric heat loss:</strong> A room has 15m² external wall (U=0.25),
              8m² double glazing (U=1.4), and 25m² roof (U=0.18). Calculate heat loss at Ti=21°C,
              To=-3°C.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>ΔT = 21 - (-3) = 24K</li>
              <li>Wall loss = 0.25 × 15 × 24 = 90W</li>
              <li>Glazing loss = 1.4 × 8 × 24 = 269W</li>
              <li>Roof loss = 0.18 × 25 × 24 = 108W</li>
              <li>Total fabric loss = 90 + 269 + 108 = <strong>467W</strong></li>
              <li>Note: Glazing dominates despite smaller area (high U-value)</li>
            </ul>
            <p>
              <strong>Example 4 - Sensible vs total cooling:</strong> A gym has 30 people exercising
              (200W sensible, 250W latent each). What are the sensible and total cooling loads from
              occupants?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Sensible load = 30 × 200W = <strong>6000W = 6kW sensible</strong></li>
              <li>Latent load = 30 × 250W = 7500W = 7.5kW latent</li>
              <li>Total = 6 + 7.5 = <strong>13.5kW total</strong></li>
              <li>Sensible Heat Ratio = 6/13.5 = 0.44 (very low, needs dehumidification)</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="Practical guidance"
            plainEnglish="The handful of formulas and standard values you'll lean on for heating and cooling load sums."
          >
            <p>
              <strong>Essential formulas:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Fabric loss:</strong> Q = U × A × ΔT
              </li>
              <li>
                <strong>Total internal:</strong> Q = Qpeople + Qlighting + Qequipment
              </li>
              <li>
                <strong>With diversity:</strong> Q = Σ(Qi × Di)
              </li>
              <li>
                <strong>Ventilation loss:</strong> Q = ρ × cp × V × ΔT = 0.33 × n × Vol × ΔT
              </li>
            </ul>
            <p>
              <strong>Key values to remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Sedentary occupant: <strong>130W</strong> (75W sensible)
              </li>
              <li>
                Office equipment: <strong>15-25 W/m²</strong>
              </li>
              <li>
                LED lighting: <strong>10-12 W/m²</strong> (office)
              </li>
              <li>
                Occupancy density: <strong>10 m²/person</strong> (typical office)
              </li>
              <li>
                Equipment diversity: <strong>0.5-0.7</strong>
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Forgetting latent:</strong> High-activity spaces need dehumidification
                </li>
                <li>
                  <strong>No diversity:</strong> Summing all peaks overestimates loads by 20-30%
                </li>
                <li>
                  <strong>Ignoring thermal mass:</strong> Heavyweight buildings store heat
                </li>
                <li>
                  <strong>Solar as loss offset:</strong> Solar gains help winter but cause summer problems
                </li>
              </ul>
            }
            doInstead="Always split sensible and latent for high-activity spaces, apply realistic diversity factors (0.5-0.7 for equipment), account for thermal mass in cooling and overheating analysis, and treat winter solar gain and summer overheating as separate design issues."
          />

          <SectionRule />

          <Scenario
            title="Heat-loss calculation for a 6-bed care home extension"
            situation={
              <>
                A new 6-bed care-home extension (220 m² treated floor area) needs a heating
                load schedule for the LPHW boiler and rad-circuit design. External winter
                design is -3 °C (CIBSE Guide A, southern UK); internal target 22 °C
                bedrooms, 24 °C bathrooms (HBN 08-02 dementia-friendly).
              </>
            }
            whatToDo={
              <>
                Calculate fabric losses room-by-room: Q_fabric = Σ(U × A × ΔT) for
                walls, windows, roof, floor and party elements. Add ventilation loss
                Q_vent = 0.33 × n × V × ΔT (n = ach, V = room volume). Add a 10–15%
                margin for intermittent heating and a 1.2 boost factor for
                dementia-friendly continuous-temperature operation. Sum to get peak heating
                load. Check against installed radiator output at 50 °C mean water
                temperature (low-temperature hot water for ASHP-readiness).
              </>
            }
            whyItMatters={
              <>
                Care-home heating must hit setpoint reliably for vulnerable occupants — a
                regulated welfare requirement under CQC standards. Undersized at design
                stage means cold rooms in winter and a CQC observation. Oversized means
                cycling, poor ASHP efficiency, and a chunky bill. The CIBSE Guide A method
                gives the defendable middle ground.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Internal gains: people, equipment, lighting — each split sensible/latent (people only).',
              'Office occupant: 75 W sensible + 55 W latent ≈ 130 W total per person at light work.',
              'Equipment gain ≈ installed power × diversity factor (typically 0.4–0.6 for office IT).',
              'Lighting gain = installed lighting power × usage factor (post-LED retrofit, often &lt; 5 W/m²).',
              'Fabric loss Q = U × A × ΔT for each element; sum over the envelope.',
              'Ventilation loss Q = 0.33 × n × V × ΔT (ach × volume × ΔT × 0.33).',
              'Apply infiltration factor for naturally ventilated buildings (typical 0.5–1.0 ach winter).',
              'Always calculate sensible and latent separately for cooling — different equipment selection.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section5-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Solar radiation
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section5-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Thermal mass and time lag
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule2Section5_2;
