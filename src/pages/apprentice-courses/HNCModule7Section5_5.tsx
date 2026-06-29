/**
 * Module 7 · Section 5 · Subsection 5 — Demand Management
 * HNC Electrical Engineering for Building Services (Power and Lighting Systems)
 *   Load shedding, peak shaving, demand response, tariff optimisation, and smart grid integration
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  ConceptBlock,
  CommonMistake,
  LearningOutcomes,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Demand Management - HNC Module 7 Section 5.5';
const DESCRIPTION =
  'Master demand management strategies for electrical installations: load shedding, peak shaving, demand response programmes, tariff optimisation, DUoS/TNUoS charges, smart grid integration, and half-hourly settlement.';

const quickCheckQuestions = [
  {
    id: 'max-demand-definition',
    question: 'What is maximum demand (MD) in electrical systems?',
    options: [
      'The installed capacity of equipment',
      'The average power consumption',
      'The total energy consumed over a year',
      'The highest power drawn during a specified period',
    ],
    correctIndex: 3,
    explanation:
      'Maximum demand is the highest power (kW or kVA) drawn from the supply during a defined measurement period, typically 30 minutes in the UK. It determines network capacity requirements and significantly impacts electricity costs.',
  },
  {
    id: 'load-shedding-purpose',
    question: 'What is the primary purpose of load shedding?',
    options: [
      'To increase total annual energy consumption across the site',
      'To reduce maximum demand by temporarily disconnecting non-essential loads',
      'To improve the power factor by correcting reactive power',
      'To permanently disconnect life-safety and emergency systems',
    ],
    correctIndex: 1,
    explanation:
      'Load shedding reduces maximum demand by temporarily disconnecting or reducing non-essential loads during peak periods. This prevents exceeding contracted capacity and reduces demand-related charges.',
  },
  {
    id: 'peak-shaving-method',
    question: 'Peak shaving typically involves:',
    options: [
      'Disconnecting non-essential loads entirely during peak periods',
      'Increasing the contracted capacity agreed with the DNO',
      'Shifting all energy-intensive processes to the busiest part of the day',
      'Using on-site generation or storage to reduce grid demand during peaks',
    ],
    correctIndex: 3,
    explanation:
      'Peak shaving uses on-site generation (diesel, gas, CHP) or battery energy storage systems (BESS) to supply load during peak periods, reducing the power drawn from the grid and lowering maximum demand charges.',
  },
  {
    id: 'half-hourly-settlement',
    question: 'Half-hourly (HH) settlement requires electricity consumption to be:',
    options: [
      'Estimated annually from a standard profile class',
      'Read manually once each quarter by a meter operative',
      'Measured and recorded every 30 minutes',
      'Recorded only during red band DUoS periods',
    ],
    correctIndex: 2,
    explanation:
      'Half-hourly settlement requires metering that records consumption every 30 minutes. This enables accurate billing based on actual consumption patterns and allows customers to benefit from time-of-use tariffs.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which charge is based on maximum demand rather than energy consumption?',
    options: [
      'Unit rate (p/kWh)',
      'Capacity charge (kVA)',
      'Standing charge',
      'Climate Change Levy',
    ],
    correctAnswer: 1,
    explanation:
      'Capacity charges are based on the maximum demand (kVA) registered during a billing period. This reflects the cost of providing network capacity regardless of how much energy is actually consumed.',
  },
  {
    id: 2,
    question: 'DUoS (Distribution Use of System) charges are determined by:',
    options: [
      'National Grid as the transmission system operator',
      'Maximum demand during Triad periods',
      'The Distribution Network Operator (DNO)',
      'A single flat rate set nationally by Ofgem',
    ],
    correctAnswer: 2,
    explanation:
      'DUoS charges are set by the local Distribution Network Operator (DNO) to recover the cost of maintaining and operating the distribution network. They vary by region and voltage level.',
  },
  {
    id: 3,
    question: 'Red band DUoS periods typically occur during:',
    options: [
      'Overnight hours when demand is lowest',
      'Weekend mornings throughout the year',
      'The early hours just before sunrise',
      'Peak demand periods (late afternoon/early evening)',
    ],
    correctAnswer: 3,
    explanation:
      'Red band periods cover peak demand times, typically 16:00-19:00 on weekdays during winter months. DUoS charges during red band periods are significantly higher than amber or green bands.',
  },
  {
    id: 4,
    question: 'TNUoS (Transmission Use of System) charges are based on:',
    options: [
      'Maximum demand during Triad periods',
      'Total energy consumed annually',
      'Average daily consumption',
      'Number of meters installed',
    ],
    correctAnswer: 0,
    explanation:
      'TNUoS charges for larger consumers are based on demand during the three highest national demand periods (Triads), which typically occur between November and February on cold winter evenings.',
  },
  {
    id: 5,
    question: 'A Triad period is defined as:',
    options: [
      'Any half-hour period during which red band DUoS charges apply',
      'One of the three half-hour periods of highest national demand, separated by at least 10 days',
      'The three summer months when national demand is at its lowest',
      'A fixed 30-minute window set by the supplier on the first day of each month',
    ],
    correctAnswer: 1,
    explanation:
      'Triads are the three half-hour settlement periods of highest national demand between November and February, each separated by at least 10 clear days. They determine TNUoS charges for HH-metered sites.',
  },
  {
    id: 6,
    question: 'Demand response programmes allow consumers to:',
    options: [
      'Avoid metering their consumption altogether',
      'Fix their unit rate for the lifetime of the contract',
      'Reduce or shift consumption in response to grid signals or price incentives',
      'Generate electricity and export it without a grid connection agreement',
    ],
    correctAnswer: 2,
    explanation:
      'Demand response enables consumers to reduce, shift, or increase consumption in response to price signals, grid conditions, or operator requests. Participants receive payments or reduced charges for providing flexibility.',
  },
  {
    id: 7,
    question: 'Which technology is most commonly used for peak shaving in commercial buildings?',
    options: [
      'Upgrading the building’s lighting to LED luminaires',
      'Installing additional half-hourly metering points',
      'Installing power factor correction equipment',
      'Battery Energy Storage Systems (BESS)',
    ],
    correctAnswer: 3,
    explanation:
      'BESS is increasingly the preferred peak shaving technology due to fast response, quiet operation, low emissions, and ability to provide multiple services including demand reduction, frequency response, and backup power.',
  },
  {
    id: 8,
    question: 'Smart grid integration enables demand management through:',
    options: [
      'Real-time communication between grid, suppliers, and consumers',
      'Manual quarterly meter readings collected by site staff',
      'Fixed annual tariffs that ignore the time of consumption',
      'Permanent disconnection of all non-essential loads',
    ],
    correctAnswer: 0,
    explanation:
      'Smart grids use advanced metering, sensors, and communication systems to enable real-time data exchange between all parties, allowing dynamic pricing, automated demand response, and optimised grid operation.',
  },
  {
    id: 9,
    question: 'The threshold for mandatory half-hourly (HH) metering in England is:',
    options: [
      'Sites with maximum demand greater than 100 kW',
      'All commercial customers',
      'All customers above Profile Class 5',
      'Sites consuming more than 100,000 kWh per year',
    ],
    correctAnswer: 1,
    explanation:
      'As of April 2024, all non-domestic electricity customers in Great Britain are required to be settled on a half-hourly basis (Market-wide Half-Hourly Settlement - MHHS), regardless of consumption level.',
  },
  {
    id: 10,
    question: 'Reactive power charges (kVArh) can be reduced by:',
    options: [
      'Increasing the agreed supply capacity (kVA) with the DNO',
      'Disconnecting non-essential loads during red band periods',
      'Installing power factor correction equipment',
      'Switching from a kVA to a kW-based capacity tariff',
    ],
    correctAnswer: 2,
    explanation:
      'Power factor correction using capacitor banks or active correction equipment reduces reactive power demand (kVAr), improving power factor towards unity and avoiding excess reactive power charges.',
  },
  {
    id: 11,
    question: 'Load shedding priority should typically disconnect which loads first?',
    options: [
      'Life-safety systems such as emergency lighting and fire alarms',
      'Critical IT and server room equipment',
      'Essential production processes and security systems',
      'Non-essential comfort loads (HVAC, lighting in unoccupied areas)',
    ],
    correctAnswer: 3,
    explanation:
      'Load shedding schemes prioritise loads by criticality. Non-essential comfort loads like HVAC in unoccupied areas and general lighting are typically shed first, while life safety, critical processes, and emergency systems are protected.',
  },
  {
    id: 12,
    question:
      'Which demand management strategy involves permanently shifting load to off-peak periods?',
    options: [
      'Load shifting',
      'Demand response',
      'Load shedding',
      'Peak shaving',
    ],
    correctAnswer: 0,
    explanation:
      'Load shifting permanently reschedules energy-intensive processes (such as water heating, ice storage, or batch processes) to off-peak periods when electricity costs are lower, without reducing total consumption.',
  },
];

const faqs = [
  {
    question: 'How can I predict when Triad periods will occur?',
    answer:
      'Triads typically occur on cold, dark winter weekday evenings between November and February, usually between 17:00-18:00. Triad warning services use weather forecasts, demand predictions, and historical patterns to alert subscribers when a Triad is likely. Sites can then reduce demand during these periods to minimise TNUoS charges, potentially saving thousands of pounds annually.',
  },
  {
    question: 'What is the difference between DUoS and TNUoS charges?',
    answer:
      'DUoS (Distribution Use of System) charges cover the local distribution network (11kV and below) operated by DNOs. They are banded by time (red/amber/green) and vary by region. TNUoS (Transmission Use of System) charges cover the high voltage transmission network (275/400kV) operated by National Grid. For larger consumers, TNUoS is based on Triad demand rather than total consumption.',
  },
  {
    question: 'How does Market-wide Half-Hourly Settlement (MHHS) affect my business?',
    answer:
      'MHHS means all non-domestic sites are now settled based on actual half-hourly consumption rather than profile estimates. This creates opportunities to reduce costs through demand management, as you directly benefit from shifting consumption away from expensive periods. However, it also means poor consumption patterns result in higher bills. Smart meters or AMR (Automatic Meter Reading) are required.',
  },
  {
    question: 'What size of battery storage is needed for peak shaving?',
    answer:
      'Battery sizing depends on your load profile and peak reduction target. Typically, 15-30 minutes of peak demand coverage is sufficient for peak shaving. For a site with 500 kW peak demand aiming to reduce by 200 kW for 2 hours, approximately 400 kWh of usable battery capacity would be required. Professional load analysis and simulation is recommended before investment.',
  },
  {
    question: 'Can demand response participation affect our operations?',
    answer:
      'Well-designed demand response schemes should have minimal operational impact. Options include reducing non-critical loads, using backup generation, or adjusting HVAC setpoints within comfort ranges. Participation is typically voluntary with advance notice, and sites can opt out if operational requirements prevent response. The financial benefits often significantly outweigh minor inconveniences.',
  },
  {
    question: 'How do I calculate the payback period for demand management investments?',
    answer:
      'Calculate annual savings from: (1) reduced capacity/demand charges based on lower kVA, (2) Triad avoidance savings, (3) DUoS red band avoidance, (4) reactive power charge reductions. Compare total annual savings against capital cost and maintenance. BESS systems typically achieve 3-7 year payback depending on tariff structure and usage patterns. Include any grid services revenue for comprehensive analysis.',
  },
];

const HNCModule7Section5_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section5")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 7 · Section 5 · Subsection 5"
            title="Demand Management"
            description="Load shedding, peak shaving, demand response, tariff optimisation, and smart grid integration"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Understand maximum demand and its impact on electricity costs",
              "Apply load shedding strategies to reduce peak demand",
              "Evaluate peak shaving technologies including BESS",
              "Navigate DUoS and TNUoS charging structures",
              "Implement Triad avoidance strategies",
              "Integrate demand response and smart grid technologies",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Maximum Demand and Load Shedding">
            <p>Maximum demand (MD) is the highest power drawn from the supply during a defined period, typically measured in 30-minute intervals in the UK. It directly impacts capacity charges and network costs, often representing 20-40% of a commercial customer's electricity bill.</p>
            <p><strong>Maximum Demand Concepts:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Contracted capacity:</strong> Agreed maximum import (kVA) with DNO - exceeding incurs penalties</li>
              <li><strong>Measured maximum demand:</strong> Highest recorded value in billing period</li>
              <li><strong>Diversity factor:</strong> Ratio of actual MD to sum of individual load MDs</li>
              <li><strong>Load factor:</strong> Average demand ÷ maximum demand - indicates demand profile efficiency</li>
            </ul>
            <p><strong>Load Shedding Strategies</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Priority-based shedding:</strong> Shed lowest priority first — Non-essential HVAC, decorative lighting</li>
              <li><strong>Rotational shedding:</strong> Cycle loads on/off — Refrigeration, water heating, chillers</li>
              <li><strong>Demand limiting:</strong> Prevent threshold breach — EV charging, industrial processes</li>
              <li><strong>Predictive control:</strong> Pre-emptive reduction — BMS-controlled systems</li>
            </ul>
            <p><strong>Load Priority Classification</strong></p>
            <p><span>Priority 1 (Never shed):</span> Life safety, emergency lighting, fire systems, critical IT</p>
            <p><span>Priority 2 (Last resort):</span> Essential production, server rooms, security</p>
            <p><span>Priority 3 (Shed if needed):</span> General HVAC, non-critical processes</p>
            <p><span>Priority 4 (First to shed):</span> EV charging, water heating, unoccupied area HVAC</p>
            <p><strong>Key principle:</strong> Effective load shedding reduces maximum demand without impacting critical operations or occupant comfort.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Peak Shaving and Energy Storage">
            <p>Peak shaving uses on-site generation or energy storage to reduce grid demand during peak periods. Unlike load shedding (which reduces consumption), peak shaving maintains full supply to loads while reducing the power drawn from the distribution network.</p>
            <p><strong>Battery Energy Storage (BESS)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Charge during off-peak periods</li>
              <li>Discharge to reduce grid demand at peak</li>
              <li>Sub-second response capability</li>
              <li>Silent operation, zero emissions</li>
              <li>Multiple revenue streams possible</li>
            </ul>
            <p><strong>On-site Generation</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Diesel/gas generators for peak periods</li>
              <li>CHP for combined heat and power</li>
              <li>Solar PV with battery storage</li>
              <li>May require planning permission</li>
              <li>Emission and noise considerations</li>
            </ul>
            <p><strong>BESS Operating Modes</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Peak shaving:</strong> Reduce maximum demand — Capacity charge reduction</li>
              <li><strong>Triad avoidance:</strong> Discharge during Triad warnings — TNUoS charge reduction</li>
              <li><strong>Arbitrage:</strong> Buy cheap, sell/use expensive — Energy cost savings</li>
              <li><strong>Frequency response:</strong> Grid balancing services — Ancillary services revenue</li>
              <li><strong>Backup power:</strong> UPS function during outages — Business continuity value</li>
            </ul>
            <p><strong>BESS Sizing Example</strong></p>
            <p>Site maximum demand: 800 kW</p>
            <p>Target maximum demand: 500 kW</p>
            <p>Required reduction: 300 kW</p>
            <p>Peak duration: 3 hours</p>
            <p>Minimum capacity = 300 kW × 3 h = 900 kWh</p>
            <p>With 80% depth of discharge: 900 ÷ 0.8 = 1,125 kWh installed</p>
            <p>System specification: 300 kW / 1,125 kWh lithium-ion BESS</p>
            <p><strong>Investment tip:</strong> Stack multiple revenue streams (peak shaving + Triad + frequency response) to improve BESS payback period.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Tariff Structures and Network Charges">
            <p>Understanding electricity tariff components enables effective demand management. Network charges (DUoS and TNUoS) often represent 25-35% of total electricity costs for commercial consumers and are directly influenced by consumption patterns and maximum demand.</p>
            <p><strong>Electricity Bill Components</strong></p>
            <p><span>Wholesale energy:</span> Commodity cost of electricity (40-50%)</p>
            <p><span>DUoS charges:</span> Distribution network costs (15-20%)</p>
            <p><span>TNUoS charges:</span> Transmission network costs (5-10%)</p>
            <p><span>BSUoS charges:</span> Balancing Services Use of System (2-5%)</p>
            <p><span>Supplier margin:</span> Supplier costs and profit (5-10%)</p>
            <p><span>Levies:</span> RO, FiT, CFD, CM, CCL (15-25%)</p>
            <p><strong>DUoS Time Bands (Typical Winter)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Red:</strong> 16:00-19:00 weekdays — Highest (10x green) — Minimise consumption</li>
              <li><strong>Amber:</strong> 07:00-16:00, 19:00-20:00 — Medium (3x green) — Manage where possible</li>
              <li><strong>Green:</strong> 20:00-07:00, weekends — Lowest (baseline) — Shift loads here</li>
            </ul>
            <p><strong>TNUoS and Triad Charges</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Triads:</strong> Three half-hours of highest national demand (Nov-Feb)</li>
              <li><strong>Separation:</strong> Each Triad at least 10 clear days apart</li>
              <li><strong>Zonal charges:</strong> Vary by location (£40-75/kW/year typically)</li>
              <li><strong>Calculation:</strong> Average of your demand during the three Triads × zonal rate</li>
              <li><strong>Avoidance value:</strong> Reducing demand by 100 kW could save £4,000-7,500/year</li>
            </ul>
            <p><strong>Capacity and Reactive Power Charges</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Agreed capacity:</strong> Contracted kVA — Right-size to actual need</li>
              <li><strong>Excess capacity:</strong> kVA exceeding agreement — Load shedding, peak shaving</li>
              <li><strong>Reactive power:</strong> kVArh when PF &lt; 0.95 — Power factor correction</li>
            </ul>
            <p><strong>Tariff optimisation:</strong> Review your load profile against tariff structure - often 10-15% savings are achievable through demand management alone.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Demand Response and Smart Grid Integration">
            <p>Demand response (DR) programmes enable consumers to actively participate in grid balancing by adjusting consumption in response to price signals or operator requests. Smart grid technologies enable automated, real-time demand management across the electricity system.</p>
            <p><strong>Demand Response Programme Types:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Price-based DR:</strong> Respond to time-of-use or dynamic pricing signals</li>
              <li><strong>Incentive-based DR:</strong> Receive payments for reducing demand when requested</li>
              <li><strong>Emergency DR:</strong> Mandatory reduction during grid emergencies</li>
              <li><strong>Ancillary services:</strong> Provide frequency response or reserve capacity</li>
            </ul>
            <p><strong>UK Flexibility Markets</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Capacity Market (CM)</li>
              <li>Firm Frequency Response (FFR)</li>
              <li>Dynamic Containment (DC)</li>
              <li>Short-Term Operating Reserve (STOR)</li>
              <li>DNO flexibility services</li>
            </ul>
            <p><strong>Participation Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Half-hourly metering (mandatory)</li>
              <li>Minimum capacity threshold</li>
              <li>Response time capability</li>
              <li>Telemetry and communication</li>
              <li>Aggregator contract (for smaller sites)</li>
            </ul>
            <p><strong>Smart Grid Technologies</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Smart meters:</strong> HH consumption recording — Enables settlement and monitoring</li>
              <li><strong>AMI/AMR:</strong> Automatic meter reading — Real-time data for control</li>
              <li><strong>EMS/BMS:</strong> Building/energy management — Automated demand response</li>
              <li><strong>IoT devices:</strong> Connected equipment — Granular load control</li>
              <li><strong>AI/ML platforms:</strong> Predictive optimisation — Forecast-driven scheduling</li>
            </ul>
            <p><strong>Half-Hourly Settlement (MHHS)</strong></p>
            <p>Market-wide Half-Hourly Settlement (MHHS) now applies to all non-domestic customers:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Consumption recorded every 30 minutes via smart/AMR meters</li>
              <li>Bills reflect actual consumption patterns, not profiles</li>
              <li>Direct incentive to shift consumption to cheaper periods</li>
              <li>Enables participation in flexibility markets</li>
              <li>Foundation for time-of-use and dynamic tariffs</li>
            </ul>
            <p><strong>Future trend:</strong> The transition to a smart, flexible grid means demand management will become increasingly automated, with AI-driven systems optimising consumption in real-time against multiple signals.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Triad Avoidance Savings Calculation</strong>
            </p>
            <p><strong>Scenario:</strong> Calculate potential savings from Triad avoidance at a manufacturing site.</p>
            <p>Given data:</p>
            <p>Current average Triad demand: 450 kW</p>
            <p>Target Triad demand: 150 kW (using BESS)</p>
            <p>TNUoS zonal rate: £62/kW/year</p>
            <p>Calculation:</p>
            <p>Demand reduction = 450 - 150 = 300 kW</p>
            <p>Annual saving = 300 kW × £62/kW = £18,600/year</p>
            <p>Triad avoidance value: £18,600 per year</p>
            <p>Note: This alone could justify significant BESS investment</p>
            <p>
              <strong>Example 2: DUoS Band Optimisation</strong>
            </p>
            <p><strong>Scenario:</strong> Evaluate cost savings from shifting EV charging from red to green band.</p>
            <p>Current pattern (red band charging 16:00-19:00):</p>
            <p>EV charging load: 100 kW for 3 hours = 300 kWh daily</p>
            <p>Red band DUoS: 15p/kWh</p>
            <p>Daily DUoS cost: 300 × £0.15 = £45</p>
            <p>Optimised pattern (green band charging 22:00-01:00):</p>
            <p>Green band DUoS: 1.5p/kWh</p>
            <p>Daily DUoS cost: 300 × £0.015 = £4.50</p>
            <p>Daily saving: £40.50</p>
            <p>Annual saving: £40.50 × 250 days = £10,125</p>
            <p>
              <strong>Example 3: Load Factor Improvement</strong>
            </p>
            <p><strong>Scenario:</strong> Assess the impact of demand management on load factor.</p>
            <p>Before demand management:</p>
            <p>Average demand: 400 kW</p>
            <p>Maximum demand: 800 kW</p>
            <p>Load factor = 400 ÷ 800 = 0.50 (50%)</p>
            <p>After implementing load shedding and peak shaving:</p>
            <p>Average demand: 400 kW (unchanged)</p>
            <p>Maximum demand: 550 kW (reduced)</p>
            <p>New load factor = 400 ÷ 550 = 0.73 (73%)</p>
            <p>Improvement: 23 percentage points</p>
            <p>Higher load factor = better utilisation of contracted capacity</p>
            <p>Capacity charge reduction: (800-550) × £8/kVA/month = £2,000/month</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Demand Management Implementation Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Analyse historical consumption data (HH meter data essential)</li>
              <li>Identify peak demand periods and contributing loads</li>
              <li>Classify loads by priority and flexibility</li>
              <li>Model financial impact of demand reduction strategies</li>
              <li>Implement monitoring and control systems</li>
              <li>Establish operational procedures for demand events</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>DUoS red band: <strong>16:00-19:00 weekdays</strong> (winter)</li>
              <li>Triads: <strong>November to February</strong>, typically 17:00-18:00</li>
              <li>TNUoS rates: <strong>£40-75/kW/year</strong> depending on zone</li>
              <li>Power factor threshold: <strong>0.95</strong> (charges apply below)</li>
              <li>HH settlement period: <strong>30 minutes</strong></li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Ignoring network charges</strong> - Often 25-35% of bill, directly controllable</li>
                <li><strong>Oversizing contracted capacity</strong> - Review annually against actual MD</li>
                <li><strong>Missing Triad warnings</strong> - Subscribe to forecasting services</li>
                <li><strong>Poor load priority classification</strong> - May shed critical loads inappropriately</li>
                <li><strong>Neglecting power factor</strong> - Reactive charges add up significantly</li>
              </ul>
            }
            doInstead="Cross-check assumptions against published guidance, validate measured values against design intent, and engage the wider team early when interface issues emerge."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section5-4")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Energy metering
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section5-6")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Efficiency retrofits
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule7Section5_5;
