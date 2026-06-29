/**
 * Module 4 · Section 1 · Subsection 6 — Building Services Load Profiles
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   How HVAC, lighting, small power and process loads stack up across 24 hours and
 *   across the seasons. Drives accurate maximum demand, tariff selection, BESS / PV
 *   sizing and demand-side response strategy.
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

const TITLE = 'Building Services Load Profiles - HNC Module 4 Section 1.6';
const DESCRIPTION =
  'Master building services load profile analysis: HVAC patterns, lighting profiles, small power diversity, 24-hour demand profiles, and seasonal variation in commercial buildings.';

const quickCheckQuestions = [
  {
    id: 'hvac-peak',
    question: 'When does HVAC load typically peak in a UK office building?',
    options: [
      'Early morning',
      'Mid-afternoon in summer',
      'Evening',
      'Night-time',
    ],
    correctIndex: 1,
    explanation:
      'Office HVAC peaks in mid-afternoon during summer when cooling demand is highest due to solar gain, internal gains, and ambient temperature. Winter heating peak is typically early morning.',
  },
  {
    id: 'lighting-profile',
    question: 'Office lighting load profile is primarily driven by:',
    options: [
      'Ambient external temperature only',
      'Occupancy and daylight availability',
      'The supply tariff in force at the time',
      'Lift and escalator movement patterns',
    ],
    correctIndex: 1,
    explanation:
      'Lighting follows occupancy patterns with daylight-linked dimming reducing loads near windows during daytime. Peak lighting demand occurs on dark winter afternoons with full occupancy.',
  },
  {
    id: 'small-power-diversity',
    question: 'Small power load in offices typically peaks:',
    options: [
      'At switch-on in the morning',
      'During lunch break',
      'In the early afternoon',
      'After 5pm',
    ],
    correctIndex: 2,
    explanation:
      'Small power (IT equipment, monitors) builds during morning as staff arrive and peaks early afternoon with maximum occupancy. It reduces gradually in late afternoon as people leave.',
  },
  {
    id: 'seasonal-variation',
    question: 'Which building type shows the greatest seasonal variation in electrical demand?',
    options: [
      'Warehouse',
      'Air-conditioned office',
      'Hospital',
      'Data centre',
    ],
    correctIndex: 1,
    explanation:
      'Air-conditioned offices show significant seasonal variation: high summer cooling demand, lower winter demand (if gas-heated). Data centres and hospitals have more constant loads year-round.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is a load profile?',
    options: [
      'The total connected load of every circuit added together',
      'A graph showing how electrical demand varies over time',
      'A schedule listing every protective device in the installation',
      'The fixed maximum demand agreed with the DNO',
    ],
    correctAnswer: 1,
    explanation:
      "A load profile is a graphical representation showing how electrical demand varies over time - hourly, daily, weekly, or seasonally. It's essential for understanding peak demand periods.",
  },
  {
    id: 2,
    question: 'In a typical office, HVAC represents what proportion of total electrical load?',
    options: [
      '60-70%',
      '10-20%',
      '30-50%',
      '80-90%',
    ],
    correctAnswer: 2,
    explanation:
      'HVAC typically represents 30-50% of total office electrical load, making it the largest single load category. This can vary significantly with climate and building design.',
  },
  {
    id: 3,
    question: 'Pre-conditioning HVAC starts before occupancy to:',
    options: [
      'Reduce the connected load seen by the DNO supply',
      'Shift all energy use into the cheapest tariff period',
      'Avoid the need for any night-time setback control',
      'Achieve comfortable conditions at start of occupancy',
    ],
    correctAnswer: 3,
    explanation:
      'Pre-conditioning (starting HVAC 1-2 hours before occupancy) ensures comfortable temperatures when staff arrive. This shifts some load earlier but ensures conditions are met.',
  },
  {
    id: 4,
    question: 'Daylight-linked lighting control reduces electrical demand by:',
    options: [
      'Dimming artificial lights proportionally to daylight contribution',
      'Switching all luminaires off whenever any daylight is present',
      'Running luminaires at full output to match daylight colour',
      'Restricting lighting use to the hours of darkness only',
    ],
    correctAnswer: 0,
    explanation:
      'Daylight linking dims artificial lights progressively as natural daylight increases, maintaining constant illuminance while reducing electrical consumption - typically saving 20-40%.',
  },
  {
    id: 5,
    question: 'A 24-hour building (hospital) compared to a daytime office has:',
    options: [
      'Higher peak demand but lower average',
      'Lower peak demand but higher average',
      'Higher peak and higher average',
      'Similar peak and average',
    ],
    correctAnswer: 1,
    explanation:
      '24-hour buildings have more consistent demand throughout the day, resulting in lower peaks but higher average consumption. The load factor (average/peak) is higher.',
  },
  {
    id: 6,
    question: 'Which factor most affects seasonal electrical demand variation in UK buildings?',
    options: [
      'Lighting hours',
      'Occupancy patterns',
      'Cooling vs heating mode',
      'Equipment efficiency',
    ],
    correctAnswer: 2,
    explanation:
      'The shift between cooling mode (summer) and heating mode (winter) causes the greatest seasonal variation. Cooling is electrically intensive; heating is often gas-fired with only fans/pumps electrical.',
  },
  {
    id: 7,
    question: 'Small power load factor in offices is typically:',
    options: [
      '10-20%',
      '90-100%',
      '70-80%',
      '30-50%',
    ],
    correctAnswer: 3,
    explanation:
      "Small power has low load factor (30-50%) because equipment isn't continuously at full load - PCs idle, monitors sleep, not all desks occupied. This justifies high diversity factors.",
  },
  {
    id: 8,
    question: 'Retail lighting demand peaks when?',
    options: [
      'During trading hours consistently',
      'Only on dark winter afternoons',
      'In a short burst at opening time',
      'Mainly overnight for security lighting',
    ],
    correctAnswer: 0,
    explanation:
      'Retail lighting is typically at constant full output during all trading hours to maintain consistent appearance and encourage sales. It steps down only outside trading hours.',
  },
  {
    id: 9,
    question: 'Weekend electrical demand in an office building is typically:',
    options: [
      'Zero',
      '10-30% of weekday peak',
      '50-70% of weekday peak',
      'Same as weekday',
    ],
    correctAnswer: 1,
    explanation:
      'Weekend demand is typically 10-30% of weekday peak, covering base loads: servers, security, emergency lighting, minimal HVAC. Some areas may operate for Saturday working.',
  },
  {
    id: 10,
    question: 'Understanding load profiles helps with:',
    options: [
      'Selecting the correct cable colour codes for a circuit',
      'Determining the IP rating required for outdoor equipment',
      'Maximum demand assessment, tariff selection, and load management',
      'Setting the disconnection time for a final circuit RCD',
    ],
    correctAnswer: 2,
    explanation:
      'Load profiles inform multiple decisions: accurate maximum demand assessment, optimal tariff selection (time-of-use rates), demand-side management, PV/battery sizing, and generator capacity.',
  },
];

const faqs = [
  {
    question: 'How do I obtain load profile data for design?',
    answer:
      'For existing buildings, request half-hourly metering data from the energy supplier or use sub-metering. For new buildings, use CIBSE benchmarks, TM54 operational energy prediction methodology, or data from similar buildings. Building simulation software can generate predicted profiles.',
  },
  {
    question: 'How does building fabric affect load profiles?',
    answer:
      "Well-insulated buildings with high thermal mass have 'flatter' HVAC profiles - slower heat-up/cool-down means less pronounced peaks. Poor fabric leads to spiky profiles responding quickly to external conditions. Good fabric allows load shifting (pre-cooling/heating) more effectively.",
  },
  {
    question: 'What is coincident demand and why does it matter?',
    answer:
      "Coincident demand is loads that operate simultaneously and together determine peak demand. Understanding coincidence helps avoid over-designing - if HVAC peaks at 3pm and cooking peaks at 12pm, they don't fully add. Non-coincident loads reduce overall diversity factor.",
  },
  {
    question: 'How do controls affect load profiles?',
    answer:
      'Building management systems (BMS) significantly shape load profiles through: optimal start/stop (shifting HVAC timing), load shedding (limiting peaks), night setback (reducing out-of-hours loads), and demand response (responding to grid signals). Good controls flatten peaks and shift loads.',
  },
  {
    question: 'How does home working affect office load profiles?',
    answer:
      'Hybrid working reduces average occupancy, lowering overall demand but potentially maintaining similar peaks on high-attendance days. Small power reduces proportionally with occupancy; HVAC may not reduce linearly due to minimum ventilation requirements and zone-based systems.',
  },
  {
    question: 'Why do data centres have flat load profiles?',
    answer:
      "Data centres have continuous IT load (24/7 operation) with cooling closely tracking IT load. There's minimal diurnal variation - servers run constantly. This results in high load factor (0.85-0.95) and consistent maximum demand, making capacity planning straightforward but with less diversity benefit.",
  },
];

const HNCModule4Section1_6 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 4 · Section 1 · Subsection 6"
            title="Building Services Load Profiles"
            description="Analysing how electrical demand varies by time, season, and building type in commercial installations."
            tone="purple"
          />

          <TLDR
            points={[
              'A load profile maps demand over time — daily, weekly, seasonal — and exposes the gap between connected load and real maximum demand.',
              'HVAC dominates commercial building load: 40–60% of total energy, peaking mid-morning to early afternoon as solar gain and occupancy combine.',
              'Lighting drops from 30% to 15% of total with LED + occupancy / daylight controls — but still drives a sharp morning-on, evening-off step.',
              'Profiles are the basis of both DNO supply sizing and load-management strategies (peak shaving, BESS, demand response, tariff optimisation).',
              'BS 7671 Reg 311.1 mandates that maximum demand be determined for economic and reliable design — an honest profile is the only defendable basis.',
            ]}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 311.1 (Maximum demand and diversity)"
            clause="Regulation headings indicate that 'Maximum demand and diversity' are addressed under clause 311. This entails determining the maximum electrical demand of an installation and applying diversity factors where appropriate so that conductor and protective device selection matches realistic loading rather than absolute connected load."
            meaning={
              <>
                Reg 311.1 requires the designer to base sizing on realistic loading, not
                absolute connected load. Load profiles are the evidence that diversity has been
                applied honestly: peak overlap (HVAC + lighting + small power coincident at
                10:00–14:00), seasonal extremes (winter heating vs summer cooling), and
                tariff-driven dispatch (battery / demand response). Without a profile, your
                diversity numbers are guesses.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 311.1; CIBSE Guide F (Energy efficiency in buildings); CIBSE TM54."
          />

          <LearningOutcomes
            outcomes={[
              'Analyse HVAC load patterns and their drivers',
              'Understand lighting profiles with daylight and occupancy controls',
              'Apply small power diversity based on usage patterns',
              'Construct 24-hour load profiles for different building types',
              'Account for seasonal variation in demand',
              'Use load profiles for demand management and tariff optimisation',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock title="HVAC Load Patterns">
            <p>
              HVAC systems typically represent the largest single electrical load in commercial
              buildings, and their load profile is highly variable depending on time, weather, and
              building occupancy.
            </p>
            <p>
              <strong>Typical office HVAC daily profile (summer, % of peak):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>00:00-05:00: 10-20% — night setback, minimal circulation</li>
              <li>05:00-07:00: 40-60% — pre-conditioning, building cool-down</li>
              <li>07:00-09:00: 60-80% — building occupied, fresh air loads</li>
              <li>09:00-12:00: 80-95% — rising solar gain, internal gains</li>
              <li>12:00-16:00: 95-100% — peak cooling load (afternoon)</li>
              <li>16:00-19:00: 60-80% — declining occupancy, cooling off</li>
              <li>19:00-00:00: 15-30% — night setback begins</li>
            </ul>
            <p>
              <strong>HVAC load drivers — external factors:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Ambient temperature (heating/cooling)</li>
              <li>Solar gain through glazing</li>
              <li>Humidity (latent cooling)</li>
              <li>Wind (infiltration)</li>
            </ul>
            <p>
              <strong>HVAC load drivers — internal factors:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Occupancy (people heat gain)</li>
              <li>Equipment (IT, lighting heat)</li>
              <li>Fresh air requirement</li>
              <li>Process loads (kitchens, labs)</li>
            </ul>
            <p>
              <strong>HVAC system types and profiles:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Constant volume:</strong> flat profile when running, diversity ~1.0
              </li>
              <li>
                <strong>VAV (variable air volume):</strong> varies with zone demand, diversity
                0.7-0.8
              </li>
              <li>
                <strong>Fan coil units:</strong> zone-by-zone variation, diversity 0.6-0.8
              </li>
              <li>
                <strong>VRF/VRV:</strong> inverter modulation, diversity 0.5-0.7
              </li>
              <li>
                <strong>Chiller plant:</strong> staged loading, diversity 0.7-0.9
              </li>
            </ul>
            <p>
              <strong>Key insight:</strong> Modern variable-speed HVAC systems have lower diversity
              than constant-speed systems, providing better part-load efficiency.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Lighting Load Profiles">
            <p>
              Lighting profiles are driven by occupancy patterns and increasingly by daylight-linked
              controls that modulate artificial light based on natural daylight contribution.
            </p>
            <p>
              <strong>Office lighting profile (winter day, % of installed):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>00:00-06:00: 5-10% — security/emergency only</li>
              <li>06:00-08:00: 20-40% — cleaners, early arrivals</li>
              <li>08:00-09:00: 60-80% — staff arriving, daylight low</li>
              <li>09:00-12:00: 70-85% — full occupancy, some daylight</li>
              <li>12:00-14:00: 60-75% — lunch break, maximum daylight</li>
              <li>14:00-17:00: 85-95% — fading daylight, full occupancy</li>
              <li>17:00-19:00: 40-70% — staff leaving, some working late</li>
              <li>19:00-00:00: 10-20% — late workers, cleaners</li>
            </ul>
            <p>
              <strong>Lighting control strategies:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Occupancy sensing:</strong> PIR/ultrasonic sensors switch off in unoccupied
                areas (15-30% saving)
              </li>
              <li>
                <strong>Daylight linking:</strong> photocells dim lights near windows proportionally
                to daylight (20-40% saving)
              </li>
              <li>
                <strong>Time scheduling:</strong> BMS controls switch off outside occupied hours
                (10-20% saving)
              </li>
              <li>
                <strong>Task/ambient:</strong> lower general light, higher task light (10-20%
                saving)
              </li>
              <li>
                <strong>Scene setting:</strong> pre-programmed levels for different activities
              </li>
            </ul>
            <p>
              <strong>Lighting profiles by building type (profile shape / peak period):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Office:</strong> daytime peak, evening decline / winter afternoons
              </li>
              <li>
                <strong>Retail:</strong> constant during trading / all trading hours
              </li>
              <li>
                <strong>School:</strong> term-time weekdays only / 08:00-16:00
              </li>
              <li>
                <strong>Hospital:</strong> 24-hour, dimmed at night / 07:00-22:00
              </li>
              <li>
                <strong>Warehouse:</strong> shift-based, high bay / operating shifts
              </li>
            </ul>
            <p>
              <strong>Design note:</strong> Peak lighting load rarely coincides with peak HVAC —
              lighting peaks on dark winter days, HVAC peaks on hot summer days.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Small Power and IT Load Profiles">
            <p>
              Small power (socket outlets serving IT equipment, personal devices, and miscellaneous
              loads) has a distinctive profile driven by occupancy and working patterns.
            </p>
            <p>
              <strong>Office small power profile (% of connected):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>00:00-07:00: 5-15% — standby loads, servers, always-on</li>
              <li>07:00-09:00: 20-40% — early arrivals booting up</li>
              <li>09:00-12:00: 35-50% — building to peak occupancy</li>
              <li>12:00-14:00: 30-45% — lunch break, monitors sleep</li>
              <li>14:00-17:00: 40-55% — peak afternoon activity</li>
              <li>17:00-19:00: 25-40% — staff leaving, shutdown</li>
              <li>19:00-00:00: 10-20% — late workers, standby</li>
            </ul>
            <p>
              <strong>Small power components — desk equipment (per workstation):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>PC/laptop: 50-150W</li>
              <li>Monitor(s): 30-80W each</li>
              <li>Docking station: 20-40W</li>
              <li>Phone chargers: 5-20W</li>
              <li>Desk fan/heater: 0-2000W</li>
            </ul>
            <p>
              <strong>Small power components — shared equipment:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Printers/MFDs: 200-1500W</li>
              <li>Vending machines: 300-800W</li>
              <li>Water coolers: 100-200W</li>
              <li>Kettles: 2000-3000W</li>
              <li>Microwaves: 800-1500W</li>
            </ul>
            <p>
              <strong>Small power benchmarks (connected / diversified, W/m²):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>General office:</strong> 25-35 / 10-15
              </li>
              <li>
                <strong>High density/call centre:</strong> 40-60 / 20-30
              </li>
              <li>
                <strong>Dealing room:</strong> 80-120 / 50-80
              </li>
              <li>
                <strong>Hybrid working:</strong> 25-35 / 8-12
              </li>
            </ul>
            <p>
              <strong>Trend:</strong> Equipment efficiency improves, but device count increases. Net
              effect is relatively stable demand per workstation, but lower demand per m² as desk
              density increases.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="24-Hour and Seasonal Variations">
            <p>
              Understanding both daily and seasonal patterns is essential for accurate maximum
              demand assessment, tariff selection, and demand-side management strategies.
            </p>
            <p>
              <strong>Composite office profile (% of annual peak — summer / winter):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Night (00:00-06:00): 15-25% / 10-20% — base loads only</li>
              <li>Morning (06:00-09:00): 50-70% / 60-80% — pre-heat/cool, arrival</li>
              <li>Midday (09:00-14:00): 80-95% / 70-85% — building up to peak</li>
              <li>Afternoon (14:00-18:00): 90-100% / 75-90% — peak period (summer)</li>
              <li>Evening (18:00-00:00): 25-45% / 20-35% — declining, late workers</li>
              <li>Weekend: 15-25% / 15-25% — base loads, security</li>
            </ul>
            <p>
              <strong>Seasonal variation by building type (summer/winter ratio / driver):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Air-conditioned office:</strong> 1.3-1.6 / cooling vs gas heating
              </li>
              <li>
                <strong>All-electric office:</strong> 0.8-1.2 / cooling and heating electric
              </li>
              <li>
                <strong>Retail (non-food):</strong> 1.1-1.3 / cooling, lighting similar
              </li>
              <li>
                <strong>Supermarket:</strong> 1.0-1.1 / refrigeration constant
              </li>
              <li>
                <strong>Hospital:</strong> 1.0-1.2 / 24-hour, mixed loads
              </li>
              <li>
                <strong>Data centre:</strong> 0.95-1.05 / IT constant, cooling varies
              </li>
            </ul>
            <p>
              <strong>Load factor comparison (Load Factor = Average Demand ÷ Peak Demand):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Office: 0.35-0.50 (large daily variation)</li>
              <li>Retail: 0.50-0.65 (consistent during trading)</li>
              <li>Hospital: 0.65-0.80 (24-hour operation)</li>
              <li>Data centre: 0.85-0.95 (very consistent)</li>
              <li>Industrial (continuous): 0.70-0.85</li>
              <li>Higher load factor = flatter profile = less diversity benefit but more predictable demand</li>
            </ul>
            <p>
              <strong>Tariff implication:</strong> Buildings with low load factor benefit from
              time-of-use tariffs; high load factor buildings may prefer simple kWh rates.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — office daily profile:</strong> An office has HVAC 200kW, lighting
              60kW, small power 80kW installed. Estimate 3pm summer demand.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>HVAC: 200kW × 95% (near peak) = 190kW</li>
              <li>Lighting: 60kW × 70% (daylight available) = 42kW</li>
              <li>Small power: 80kW × 45% (peak occupancy) = 36kW</li>
              <li>
                Total = 190 + 42 + 36 = <strong>268kW</strong>
              </li>
              <li>Compare to connected load: 340kW (79% diversity)</li>
            </ul>
            <p>
              <strong>Example 2 — load factor calculation:</strong> An office uses 50,000 kWh/month.
              Peak demand is 280kW. Calculate load factor.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Hours in month: ~720 hours</li>
              <li>Average demand = 50,000 kWh ÷ 720h = 69.4kW</li>
              <li>Load factor = Average ÷ Peak</li>
              <li>
                Load factor = 69.4 ÷ 280 = <strong>0.25 (25%)</strong>
              </li>
              <li>Low load factor indicates significant daily variation</li>
              <li>Opportunity for demand management and TOU tariffs</li>
            </ul>
            <p>
              <strong>Example 3 — seasonal variation:</strong> An office has 350kW summer peak
              (cooling) and 280kW winter peak (gas heating). What supply capacity?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Annual peak = higher of summer/winter = 350kW</li>
              <li>Summer/winter ratio = 350/280 = 1.25</li>
              <li>Peak demand: 350kW</li>
              <li>At 0.9 pf: 350 ÷ 0.9 = 389 kVA</li>
              <li>With 20% growth: 389 × 1.2 = 467 kVA</li>
              <li>
                Request: <strong>500 kVA supply</strong>
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Load profile analysis checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Identify major load categories (HVAC, lighting, small power)</li>
              <li>Determine operational patterns for each category</li>
              <li>Estimate coincident peak (when do loads peak together?)</li>
              <li>Consider seasonal variation (summer cooling vs winter heating)</li>
              <li>Calculate load factor from energy data if available</li>
              <li>Use profiles to inform demand management strategies</li>
            </ul>
            <p>
              <strong>Key values to remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                HVAC: <strong>30-50%</strong> of office load
              </li>
              <li>
                Small power diversity: <strong>30-50%</strong>
              </li>
              <li>
                Office load factor: <strong>0.35-0.50</strong>
              </li>
              <li>
                Summer/winter ratio (AC office): <strong>1.3-1.6</strong>
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Ignoring time patterns</strong> — peak time matters for demand charges
                </li>
                <li>
                  <strong>Summing non-coincident peaks</strong> — lighting and cooling peak
                  differently
                </li>
                <li>
                  <strong>Using annual average for sizing</strong> — peak demand determines capacity
                </li>
                <li>
                  <strong>Assuming constant profiles</strong> — usage patterns change over time
                </li>
              </ul>
            }
            doInstead="Plot category profiles separately, find the worst coincident hour rather than adding individual peaks, size against that worst hour, and re-validate the profile after a year of metered data."
          />

          <SectionRule />

          <Scenario
            title="Mid-rise office — designing the load profile to justify a 250 kVA reduction"
            situation={
              <>
                A 12,000&nbsp;m² mid-rise office is being refurbished. The previous CIBSE
                benchmark (90&nbsp;VA/m²) gives 1,080&nbsp;kVA. The client argues the workforce
                is 60% hybrid, mid-week peak occupancy is 70%, and LED + occupancy controls cut
                lighting load 50%. They want to argue for a 750–800&nbsp;kVA DNO supply instead
                of 1,080.
              </>
            }
            whatToDo={
              <>
                Build a 24-hour profile per system: HVAC (cooling-led, peaks 12:00–15:00, 60% of
                connected at peak), lighting (occupancy-modulated, 50% of connected at peak),
                small power (40% of connected at peak), lifts (cycle-driven, 50%). Overlay them
                to find the coincident peak. Cross-check against measured half-hourly data from
                two comparable hybrid-pattern offices. Document the profile as the diversity
                evidence for Reg 311.1. Lodge a 800&nbsp;kVA DNO request with the profile as
                appendix — DNO will challenge the numbers, so they have to be defendable.
              </>
            }
            whyItMatters={
              <>
                A 280&nbsp;kVA reduction is a smaller DNO TX, smaller switchgear, smaller cables,
                smaller standby plant — typically £150k–£300k capital saving plus lower DNO
                connection charge and standing charge. But it has to be evidenced — Reg 311.1
                makes maximum demand determination mandatory, and the DNO will refuse a
                under-cooked submission.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Load profile = demand vs time. Hourly, daily, weekly, seasonal — different profiles answer different design questions.',
              'HVAC dominates commercial building electrical load: 40–60% of total energy and the strongest peak driver.',
              'Office peak: 10:00–14:00 (HVAC + lighting + IT coincident). Retail peak: lunchtime + evening. Hospital: 24-hour with shift transitions.',
              'Hybrid working has reshaped office profiles: lower midweek peaks (60–70% of pre-2020), Mondays and Fridays much lower than midweek.',
              'Reg 311.1 requires realistic loading-based sizing — not connected load. A profile is your evidence that diversity is honest.',
              'Profiles unlock load-management value: peak shaving, BESS dispatch, demand response, off-peak tariff use.',
              'Always cross-check calculated profiles against measured data from comparable buildings — the gap between design and operation (CIBSE TM54) is real.',
              'Document the profile as part of the design submission — it is what justifies the diversity figures and supports the DNO application.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section1-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Future load allowances
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Cable selection and sizing
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule4Section1_6;
