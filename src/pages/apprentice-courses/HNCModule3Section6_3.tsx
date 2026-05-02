/**
 * Module 3 · Section 6 · Subsection 3 — Load Management and Demand Reduction
 * HNC Electrical Engineering for Building Services (Pearson U4019)
 *   Maximum demand, load factor, demand response, peak shaving, time-of-use tariffs,
 *   BMS-coordinated staggered starts. The financial-engineering side of BSE design
 *   that converts kVA to kWh to cash.
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

const TITLE = 'Load Management and Demand Reduction - HNC Module 3 Section 6.3';
const DESCRIPTION =
  'Master load management strategies for building services: maximum demand, load factor, demand response, peak shaving, time-of-use tariffs and BMS load control systems.';

const quickCheckQuestions = [
  {
    id: 'load-factor',
    question:
      'A building has a maximum demand of 500kW and average demand of 300kW. What is the load factor?',
    options: ['0.40', '0.60', '0.80', '1.67'],
    correctIndex: 1,
    explanation:
      'Load Factor = Average Demand / Maximum Demand = 300kW / 500kW = 0.60 (60%). A higher load factor indicates more efficient use of the electrical supply capacity.',
  },
  {
    id: 'peak-shaving',
    question:
      'Which technique involves using battery storage or generators to reduce grid demand during peak periods?',
    options: ['Load shedding', 'Peak shaving', 'Time shifting', 'Load cycling'],
    correctIndex: 1,
    explanation:
      'Peak shaving uses supplementary power sources (batteries, generators, or renewable energy) to reduce the peak demand drawn from the grid, lowering demand charges and improving supply stability.',
  },
  {
    id: 'power-factor-benefit',
    question:
      'Improving power factor from 0.70 to 0.95 reduces the apparent power (kVA) by approximately what percentage for the same real power (kW)?',
    options: ['15%', '26%', '36%', '50%'],
    correctIndex: 1,
    explanation:
      'At pf 0.70: kVA = kW/0.70 = 1.43×kW. At pf 0.95: kVA = kW/0.95 = 1.05×kW. Reduction = (1.43-1.05)/1.43 = 26.6%. This reduces cable sizing and distribution losses.',
  },
  {
    id: 'demand-response',
    question: 'What is the primary purpose of demand response programmes?',
    options: [
      'Increase electricity consumption',
      'Reduce demand during grid stress periods',
      'Eliminate the need for backup generators',
      'Increase power factor',
    ],
    correctIndex: 1,
    explanation:
      'Demand response programmes reduce electricity consumption during periods of grid stress (high demand or supply shortage), helping maintain grid stability and often providing financial incentives to participants.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is maximum demand (MD) in building electrical systems?',
    options: [
      'The total installed load capacity',
      'The highest average power drawn over a defined period',
      'The peak instantaneous power',
      'The contracted supply capacity',
    ],
    correctAnswer: 1,
    explanation:
      'Maximum demand is the highest average power (usually kW or kVA) drawn over a specific time period, typically 30 minutes. It determines supply capacity requirements and often affects electricity billing.',
  },
  {
    id: 2,
    question:
      'A commercial building operates from 08:00 to 18:00 with total energy consumption of 2400 kWh and maximum demand of 400 kW. What is the load factor?',
    options: ['0.50', '0.60', '0.75', '0.80'],
    correctAnswer: 1,
    explanation:
      'Operating hours = 10h. Average demand = 2400 kWh / 10h = 240 kW. Load Factor = Average / Maximum = 240 / 400 = 0.60 (60%).',
  },
  {
    id: 3,
    question: 'Which loads should typically be given highest priority in a load shedding scheme?',
    options: [
      'Air conditioning and comfort cooling',
      'Life safety and emergency systems',
      'General lighting',
      'Electric vehicle charging',
    ],
    correctAnswer: 1,
    explanation:
      'Life safety systems (fire alarms, emergency lighting, smoke extract, lifts for evacuation) must always be protected from load shedding. These are essential for occupant safety and regulatory compliance.',
  },
  {
    id: 4,
    question:
      'What is the typical ratio between peak and off-peak electricity tariffs in UK time-of-use pricing?',
    options: ['1.2:1', '1.5:1', '2:1 to 3:1', '5:1'],
    correctAnswer: 2,
    explanation:
      'UK time-of-use tariffs typically see peak rates 2-3 times higher than off-peak rates. This provides significant incentive to shift flexible loads to cheaper periods.',
  },
  {
    id: 5,
    question:
      'A building has 500 kVA apparent power at 0.75 power factor. After installing capacitor banks, the power factor improves to 0.95. What is the new apparent power?',
    options: ['375 kVA', '395 kVA', '475 kVA', '525 kVA'],
    correctAnswer: 1,
    explanation:
      'Real power P = S × pf = 500 × 0.75 = 375 kW. New apparent power S = P / pf = 375 / 0.95 = 395 kVA. The same real power requires 21% less supply capacity.',
  },
  {
    id: 6,
    question: 'What is the recommended minimum delay for staggered motor starting in BMS systems?',
    options: ['5 seconds', '10-30 seconds', '2-5 minutes', '10 minutes'],
    correctAnswer: 1,
    explanation:
      'Typical staggered start delays of 10-30 seconds between large motors prevent coincident inrush currents. This reduces peak demand and voltage dip during building start-up.',
  },
  {
    id: 7,
    question:
      'Which demand-side management technique shifts load from peak to off-peak periods without reducing total consumption?',
    options: ['Peak clipping', 'Strategic conservation', 'Load shifting', 'Valley filling'],
    correctAnswer: 2,
    explanation:
      'Load shifting moves flexible loads (e.g., thermal storage, EV charging, water heating) from expensive peak periods to cheaper off-peak periods. Total consumption remains similar but costs and grid impact reduce.',
  },
  {
    id: 8,
    question:
      'A factory has a maximum demand charge of 12/kVA/month. Reducing MD from 800 kVA to 650 kVA saves how much annually?',
    options: ['900', '1,800', '10,800', '21,600'],
    correctAnswer: 2,
    explanation:
      'Monthly saving = (800 - 650) × 12 = 150 × 12 = 1,800. Annual saving = 1,800 × 12 months = 21,600... Wait, let me recalculate: Monthly = 150 × 12 = 1,800. Annual = 1,800 × 12 = 21,600. Actually the question says per month so: Annual = (800-650) × 12 × 12 = 21,600. But typically the charge is per kVA per month, so annual = 150 × 12 × 12 = 21,600.',
  },
  {
    id: 9,
    question: "What is the purpose of 'demand limiting' in BMS load control?",
    options: [
      'To prevent power factor penalties',
      'To keep demand below a preset maximum threshold',
      'To balance loads across phases',
      'To protect transformers from overload',
    ],
    correctAnswer: 1,
    explanation:
      'Demand limiting monitors real-time power consumption and progressively sheds non-essential loads to keep maximum demand below a preset threshold. This prevents costly demand charges and supply upgrades.',
  },
  {
    id: 10,
    question:
      'Which renewable energy technology is most effective for peak shaving in UK commercial buildings?',
    options: [
      'Wind turbines',
      'Solar PV with battery storage',
      'Ground source heat pumps',
      'Biomass CHP',
    ],
    correctAnswer: 1,
    explanation:
      'Solar PV generates most power during daytime peaks when commercial demand is highest. Combined with battery storage, excess generation can be stored for evening peaks or cloudy periods, making it highly effective for peak shaving.',
  },
];

const faqs = [
  {
    question: 'How is maximum demand measured and billed?',
    answer:
      'Maximum demand is typically measured as the highest average power (kW or kVA) over a 30-minute integration period during the billing month. Meters record the peak value which is used for demand charges. Some suppliers use shorter periods (15 minutes) or measure kVA to include reactive power. Understanding your billing basis is essential for effective demand management.',
  },
  {
    question: 'What is the difference between load shedding and demand response?',
    answer:
      'Load shedding is typically automated, building-level control that reduces loads when demand exceeds preset limits. Demand response is a grid-level programme where buildings voluntarily reduce consumption during network stress events, often in exchange for financial incentives. Both reduce demand but operate at different scales and with different triggers.',
  },
  {
    question: 'How do I calculate the payback for power factor correction equipment?',
    answer:
      'Calculate current reactive power penalty charges from bills. Determine the required kVAr to achieve target pf. Quote capacitor bank equipment and installation costs. Payback = Equipment Cost / Annual Savings. Typical paybacks are 1-3 years. Also consider reduced cable/transformer losses and potential to avoid supply upgrades.',
  },
  {
    question: 'What loads are suitable for automated load shedding?',
    answer:
      'Suitable loads have thermal mass or storage capacity and can tolerate brief interruptions: HVAC (excluding critical areas), water heating, ice storage, EV charging, non-essential lighting, and deferrable processes. Unsuitable loads include life safety systems, critical IT, lifts during occupied hours, and process-critical equipment.',
  },
  {
    question: 'How does thermal storage help with demand management?',
    answer:
      'Thermal storage (ice banks, chilled water, hot water) allows cooling or heating capacity to be built up during off-peak periods using cheaper electricity. During peak periods, stored thermal energy meets loads without running chillers/heaters, significantly reducing electrical demand. Ice storage is particularly effective as it allows chillers to be much smaller.',
  },
  {
    question: 'What BMS features support load management?',
    answer:
      'Key BMS features include: demand monitoring with trend logging, optimum start/stop to avoid peak periods, staggered motor starting sequences, demand limiting with load priority tables, time-of-use scheduling to shift loads, integration with utility demand response signals, and reporting dashboards for analysis and billing verification.',
  },
];

const HNCModule3Section6_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section6')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 3 · Section 6 · Subsection 3"
            title="Load management and demand reduction"
            description="Strategies and techniques to optimise electrical demand, reduce peak loads and minimise energy costs in building services"
            tone="purple"
          />

          <TLDR
            points={[
              'You compute load factor (LF = average demand / maximum demand) on every metered building &mdash; LF &lt; 0.4 indicates spikey load profile and PFC / battery storage opportunity.',
              'You design BMS staggered starts and load-shedding schemes that respect motor inrush sequencing and equipment criticality &mdash; sized to keep MD below DNO capacity-charge bands.',
              'You combine peak-shaving (battery / generator) with time-of-use (TOU) tariff arbitrage on commercial sites &mdash; typical payback 5&ndash;8 years with current red/amber/green DUoS bands.',
              'You document the demand-management strategy against ESOS Phase 3+ (Energy Savings Opportunity Scheme) for sites &gt; 250 employees or &pound;44m turnover.',
            ]}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 311.1 (Maximum demand)"
            clause="The maximum demand of an installation shall be assessed."
            meaning={
              <>
                BS 7671 311.1 makes maximum-demand assessment compulsory at design stage.
                Once the building is in service, &ldquo;maximum demand&rdquo; becomes a
                continuously-billed quantity on commercial half-hourly DNO tariffs &mdash;
                the difference between sized MD and operational MD is where load
                management lives. As the BSE engineer you specify the BMS load-shedding
                logic, generator interlocks, battery dispatch and EV-charger throttling
                that keep operational MD below the contractual cap.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Reg 311.1; ENA Engineering Recommendation P29 (security of supply); ESOS Regulations 2014 (large enterprise energy audit); CIBSE Guide F (energy efficiency)"
          />

          <LearningOutcomes
            outcomes={[
              "Calculate maximum demand and load factor for buildings",
              "Explain demand response and load shedding strategies",
              "Apply peak shaving techniques using storage and generation",
              "Understand time-of-use tariff structures and optimisation",
              "Quantify power factor correction benefits",
              "Design BMS load control schemes with staggered starting",
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock title="In 30 seconds">
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Maximum demand:</strong> Peak power averaged over 30 minutes</li>
              <li><strong>Load factor:</strong> Average demand / Maximum demand</li>
              <li><strong>Peak shaving:</strong> Reduce grid peaks using storage or generation</li>
              <li><strong>Load shifting:</strong> Move flexible loads to off-peak periods</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Building Services Context</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>BMS control:</strong> Automated demand limiting</li>
              <li><strong>Staggered starting:</strong> Avoid motor inrush coincidence</li>
              <li><strong>ToU tariffs:</strong> 2-3x cost difference peak vs off-peak</li>
              <li><strong>Power factor:</strong> Reduce kVA for same kW output</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Maximum Demand and Load Factor">
            <p>
              Maximum demand (MD) is the highest average power drawn by a building over a defined
              period, typically 30 minutes. It determines supply infrastructure sizing, affects
              electricity costs, and is the key metric for load management strategies.
            </p>

              <p className="text-sm font-medium text-white">Key definitions:</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Maximum Demand (MD):</strong> Highest average power over integration
                  period (kW or kVA)
                </li>
                <li>
                  <strong>Integration Period:</strong> Time over which demand is averaged (typically
                  30 minutes)
                </li>
                <li>
                  <strong>Connected Load:</strong> Total installed equipment rating
                </li>
                <li>
                  <strong>Diversity Factor:</strong> Ratio of maximum demand to connected load
                </li>
              </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Load Factor Calculation
              </p>
              <p><strong>
                Load Factor = Average Demand / Maximum Demand
              </strong></p>
              <p>
                Also expressed as: Total Energy (kWh) / (MD × Operating Hours)
              </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Typical Load Factors by Building Type
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Continuous process industry</strong> — 0.80 - 0.95 — 24/7 operation, stable loads</li>
              <li><strong>Office building</strong> — 0.40 - 0.60 — Peak morning start-up, daytime only</li>
              <li><strong>Retail premises</strong> — 0.50 - 0.65 — Extended hours, variable occupancy</li>
              <li><strong>Schools and colleges</strong> — 0.30 - 0.45 — Term-time only, holidays</li>
              <li><strong>Residential</strong> — 0.25 - 0.35 — Morning/evening peaks, diverse occupancy</li>
            </ul>

            <p>
              <strong>Commercial benefit:</strong> Higher load factor means better utilisation of
              supply infrastructure. Many suppliers offer lower unit rates to customers with high
              load factors.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <ConceptBlock title="Demand Response Strategies">
            <p>
              Demand response (DR) encompasses actions taken to reduce electricity consumption
              during periods of peak demand or grid stress. Participation in DR programmes can
              provide significant financial benefits whilst supporting grid stability.
            </p>

              <p className="text-sm font-medium text-white">Types of demand response:</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Price-based DR:</strong> Respond to time-varying electricity prices
                </li>
                <li>
                  <strong>Incentive-based DR:</strong> Receive payments for reducing load when
                  called upon
                </li>
                <li>
                  <strong>Emergency DR:</strong> Mandatory reductions during grid emergencies
                </li>
                <li>
                  <strong>Capacity market:</strong> Commit to providing demand reduction capacity
                </li>
              </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">
                  UK Demand Response Schemes
                </p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>
                    <strong>Demand Flexibility Service:</strong> National Grid payments for shifting
                    load
                  </li>
                  <li>
                    <strong>STOR:</strong> Short-term operating reserve
                  </li>
                  <li>
                    <strong>Capacity Market:</strong> Annual payments for availability
                  </li>
                  <li>
                    <strong>Triad avoidance:</strong> Avoid top 3 demand peaks
                  </li>
                </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">Typical DR Actions</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Pre-cool buildings before DR event</li>
                  <li>Reduce HVAC setpoints temporarily</li>
                  <li>Dim non-essential lighting</li>
                  <li>Defer EV charging and water heating</li>
                </ul>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                DR Event Notification Timeline
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Day-ahead</strong> — Scheduled DR, Triad avoidance — Lower</li>
              <li><strong>2-4 hours</strong> — Demand Flexibility Service — Medium</li>
              <li><strong>20-30 minutes</strong> — STOR, Emergency response — Higher</li>
            </ul>

            <p>
              <strong>Building automation:</strong> BMS integration with aggregator platforms
              enables automatic DR response, maximising participation without manual intervention.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <ConceptBlock title="Load Shedding and Prioritisation">
            <p>
              Load shedding is the systematic reduction of electrical loads to keep demand below a
              threshold. Effective load shedding requires careful prioritisation to maintain
              essential services whilst reducing non-critical consumption.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Load Priority Categories
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1 - Critical</strong> — Life safety — Fire systems, emergency lighting, lifts — Never shed</li>
              <li><strong>2 - Essential</strong> — Core operations — IT servers, security, critical process — Only in emergency</li>
              <li><strong>3 - Important</strong> — Comfort critical — Primary HVAC, main lighting — Reduce before shed</li>
              <li><strong>4 - Deferrable</strong> — Flexible loads — EV charging, water heating, storage — First to shed</li>
              <li><strong>5 - Non-essential</strong> — Amenity — Decorative lighting, displays, vending — Shed freely</li>
            </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">
                  Load Shedding Strategies
                </p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>
                    <strong>Rotating shed:</strong> Cycle loads on/off in sequence
                  </li>
                  <li>
                    <strong>Duty cycling:</strong> Limit run-time percentage
                  </li>
                  <li>
                    <strong>Staged reduction:</strong> Progressive load removal
                  </li>
                  <li>
                    <strong>Demand limiting:</strong> Auto-shed at threshold
                  </li>
                </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">
                  Implementation Requirements
                </p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Real-time demand monitoring</li>
                  <li>Controllable load circuits/contactors</li>
                  <li>BMS integration and programming</li>
                  <li>Occupant communication protocols</li>
                </ul>

            

            <p><em>
              <strong>Regulatory note:</strong> BS 7671 and building regulations require that life
              safety systems remain operational. Load shedding schemes must be designed to protect
              these circuits.
            </em></p>
          </ConceptBlock>

          <ConceptBlock title="Peak Shaving Techniques">
            <p>
              Peak shaving reduces maximum demand by supplementing grid supply with local generation
              or storage during peak periods. This reduces demand charges, improves supply
              resilience, and can provide significant cost savings.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Peak Shaving Technologies
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Battery storage (BESS)</strong> — Milliseconds — 1-4 hours — Daily peak shaving, DR</li>
              <li><strong>Diesel/gas generator</strong> — 30-60 seconds — Hours (fuel limited) — Extended peaks, backup</li>
              <li><strong>CHP (combined heat/power)</strong> — Minutes — Continuous — Base load with heat demand</li>
              <li><strong>Solar PV</strong> — Instant (when generating) — Daylight hours — Daytime peak reduction</li>
              <li><strong>Thermal storage (ice/water)</strong> — Minutes — Hours — HVAC peak shifting</li>
            </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Battery Sizing for Peak Shaving
              </p>
              <p><strong>
                Required Capacity (kWh) = Peak Reduction (kW) x Duration (hours) / DoD
              </strong></p>
              <p>
                DoD = Depth of Discharge (typically 0.8-0.9 for lithium-ion)
              </p>

              
                <p className="font-medium text-elec-yellow mb-1">Example: Battery Sizing</p>
                <p className="text-white">Reduce peak by 100 kW for 2 hours</p>
                <p className="text-white">Capacity = 100 x 2 / 0.85 = 235 kWh</p>

              
                <p className="font-medium text-elec-yellow mb-1">Economic Benefit</p>
                <p className="text-white">MD reduction: 100 kW</p>
                <p className="text-white">At £15/kVA/month = £18,000/year saving</p>

            

            <p>
              <strong>Hybrid systems:</strong> Combining solar PV with battery storage maximises
              peak shaving benefits - PV reduces daytime peaks whilst batteries handle morning
              start-up and evening peaks.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <ConceptBlock title="Time-of-Use Tariffs">
            <p>
              Time-of-use (ToU) tariffs charge different rates depending on when electricity is
              consumed. Understanding tariff structures is essential for optimising load scheduling
              and achieving cost savings through load shifting.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Typical UK ToU Tariff Periods
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Peak (Red)</strong> — 16:00-19:00 weekdays — 30-45p/kWh — Minimise consumption</li>
              <li><strong>High (Amber)</strong> — 07:00-16:00, 19:00-23:00 — 18-25p/kWh — Normal operations</li>
              <li><strong>Off-peak (Green)</strong> — 23:00-07:00, weekends — 8-15p/kWh — Shift flexible loads here</li>
            </ul>

              <p className="text-sm font-medium text-white">
                Loads suitable for time shifting:
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Electric vehicle charging:</strong> Easily deferred to overnight
                </li>
                <li>
                  <strong>Water heating:</strong> Thermal storage provides flexibility
                </li>
                <li>
                  <strong>Ice storage:</strong> Make ice overnight for daytime cooling
                </li>
                <li>
                  <strong>Batch processes:</strong> Schedule to avoid peak periods
                </li>
                <li>
                  <strong>Battery charging:</strong> Charge off-peak, discharge on-peak
                </li>
              </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Triad Periods (Half-Hourly Metered Sites)
              </p>
              <p>
                Triads are the three highest demand periods on the national grid between November
                and February. Transmission charges (TNUoS) are based on your demand during these
                periods.
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>Typical Triad periods: 17:00-18:00 on cold winter weekdays</li>
                <li>Triad charges: £50-70/kW depending on region</li>
                <li>
                  Reducing demand by 100 kW during Triads saves £5,000-7,000/year
                </li>
              </ul>

            <p>
              <strong>Forecasting:</strong> National Grid publishes Triad warnings. BMS systems can
              integrate these alerts to automatically reduce demand during likely Triad periods.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Power Factor Correction Benefits">
            <p>
              Power factor correction (PFC) reduces the reactive power drawn from the supply,
              lowering apparent power (kVA) for the same real power (kW). This reduces maximum
              demand charges, cable losses, and may avoid supply capacity upgrades.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Power Factor Relationships
              </p>

                
                  <p className="font-bold text-elec-yellow mb-1">pf = kW / kVA</p>
                  <p className="text-white text-xs">Power factor definition</p>

                
                  <p className="font-bold text-elec-yellow mb-1">kVAr = kVA x sin(cos⁻¹pf)</p>
                  <p className="text-white text-xs">Reactive power</p>

                
                  <p className="font-bold text-elec-yellow mb-1">kVA = kW / pf</p>
                  <p className="text-white text-xs">Apparent power</p>

              

              <p className="text-sm font-medium text-elec-yellow/80">
                Benefits of Power Factor Improvement
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Reduced MD charges</strong> — Lower kVA demand — 5-15% of demand charge</li>
              <li><strong>Avoid pf penalty</strong> — Suppliers penalise pf &lt; 0.90 — Varies by supplier</li>
              <li><strong>Released capacity</strong> — More kW from same kVA supply — Avoid supply upgrade cost</li>
              <li><strong>Reduced I²R losses</strong> — Lower current = less heat loss — 1-3% energy saving</li>
              <li><strong>Voltage improvement</strong> — Less voltage drop in cables — Improved equipment performance</li>
            </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">PFC Equipment Types</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>
                    <strong>Fixed capacitors:</strong> Simple, low-cost, constant loads
                  </li>
                  <li>
                    <strong>Auto-switching:</strong> Banks with contactors for varying loads
                  </li>
                  <li>
                    <strong>Static (thyristor):</strong> Fast-switching, harmonic-filtered
                  </li>
                  <li>
                    <strong>Active filters:</strong> For non-linear loads with harmonics
                  </li>
                </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">Capacitor Sizing</p>
                <p>Required kVAr to correct from pf₁ to pf₂:</p>
                <p><strong>
                  kVAr = kW × (tan(cos⁻¹pf₁) - tan(cos⁻¹pf₂))
                </strong></p>

            

            <p><em>
              <strong>Warning:</strong> Over-correction (leading pf) can cause voltage rise and
              equipment damage. Target pf of 0.95-0.98 is recommended.
            </em></p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <ConceptBlock title="Demand Side Management">
            <p>
              Demand side management (DSM) encompasses all strategies to modify consumer demand
              patterns through efficiency improvements, load shifting, and demand reduction.
              Effective DSM reduces costs, improves grid stability, and supports decarbonisation
              goals.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">DSM Strategy Types</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Peak Clipping</strong> — Reduce peaks directly — Load shedding, demand limiting</li>
              <li><strong>Valley Filling</strong> — Increase off-peak consumption — Off-peak water/ice storage</li>
              <li><strong>Load Shifting</strong> — Move loads from peak to off-peak — EV charging, batch processes</li>
              <li><strong>Strategic Conservation</strong> — Permanent demand reduction — Efficiency upgrades, LED retrofit</li>
              <li><strong>Flexible Load Shape</strong> — Adapt to grid conditions — Smart controls, price response</li>
            </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                DSM Implementation Hierarchy
              </p>
              <ol className="text-sm text-white space-y-1 list-decimal list-outside ml-5">
                <li>
                  <strong>Measure:</strong> Install sub-metering to understand load profiles
                </li>
                <li>
                  <strong>Analyse:</strong> Identify peak contributors and flexible loads
                </li>
                <li>
                  <strong>Reduce:</strong> Implement efficiency measures to lower base load
                </li>
                <li>
                  <strong>Shift:</strong> Reschedule flexible loads to off-peak periods
                </li>
                <li>
                  <strong>Automate:</strong> Integrate controls with BMS for automatic optimisation
                </li>
                <li>
                  <strong>Monitor:</strong> Track performance and refine strategies
                </li>
              </ol>

              
                <p className="font-medium text-elec-yellow mb-1">Quick Wins</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Stagger start-up sequences</li>
                  <li>Optimise HVAC schedules</li>
                  <li>Control hot water heating times</li>
                  <li>Adjust EV charging times</li>
                </ul>

              
                <p className="font-medium text-elec-yellow mb-1">Strategic Investments</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Battery energy storage</li>
                  <li>Thermal storage systems</li>
                  <li>Smart building controls</li>
                  <li>On-site generation (PV, CHP)</li>
                </ul>

            

            <p>
              <strong>Grid services:</strong> Buildings with effective DSM can participate in
              balancing services, frequency response, and capacity markets, creating revenue streams
              from flexibility.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Building Services: BMS Load Control">
            <p>
              Building Management Systems (BMS) provide the automation platform for implementing
              load management strategies. Effective BMS programming can significantly reduce maximum
              demand through demand limiting, optimum start, and staggered equipment control.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                BMS Load Control Functions
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Demand limiting</strong> — Auto-shed loads at threshold — 10-20%</li>
              <li><strong>Staggered starting</strong> — Sequential equipment start-up — 15-30%</li>
              <li><strong>Optimum start</strong> — Pre-condition before occupancy — 5-10%</li>
              <li><strong>Duty cycling</strong> — Limit equipment run-time % — 10-15%</li>
              <li><strong>Load rotation</strong> — Cycle similar loads — 5-10%</li>
            </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Staggered Motor Starting Sequence
              </p>
              <p>
                Without staggered starting, coincident motor inrush can create demand spikes 6-8
                times running current. A typical sequence for building start-up:
              </p>
              <ol className="text-sm text-white space-y-1 list-decimal list-outside ml-5">
                <li>
                  <strong>T+0s:</strong> Supply fans start (priority ventilation)
                </li>
                <li>
                  <strong>T+15s:</strong> Return fans start
                </li>
                <li>
                  <strong>T+30s:</strong> Chilled water pumps start
                </li>
                <li>
                  <strong>T+45s:</strong> Heating water pumps start
                </li>
                <li>
                  <strong>T+60s:</strong> Chiller 1 starts
                </li>
                <li>
                  <strong>T+90s:</strong> Chiller 2 starts (if required)
                </li>
                <li>
                  <strong>T+120s:</strong> Non-essential loads enabled
                </li>
              </ol>

              
                <p className="text-sm font-medium text-elec-yellow/80">
                  Demand Limiting Algorithm
                </p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Monitor kW at 1-minute intervals</li>
                  <li>Predict end-of-period demand</li>
                  <li>Shed loads when threshold approached</li>
                  <li>Restore loads in priority order</li>
                  <li>Minimum off-time to protect equipment</li>
                </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">
                  Load Priority Programming
                </p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Assign priority levels 1-10</li>
                  <li>Lowest priority shed first</li>
                  <li>Set minimum on/off times</li>
                  <li>Protect critical equipment</li>
                  <li>Log all shed events for analysis</li>
                </ul>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Soft Starter and VSD Benefits
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Soft starters:</strong> Reduce starting current from 6-8x to 2-3x FLC
                </li>
                <li>
                  <strong>VSDs:</strong> Eliminate starting current spike entirely, enable speed
                  control
                </li>
                <li>
                  Both reduce peak demand during start-up and protect supply infrastructure
                </li>
                <li>
                  VSDs additionally reduce running power at part-load (follows cube law for
                  fans/pumps)
                </li>
              </ul>

            <p><em>
              <strong>Commissioning note:</strong> Staggered start sequences must be tested during
              commissioning to verify delays are appropriate and no critical services are delayed
              excessively.
            </em></p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p className="text-sm font-medium text-elec-yellow/80">
                Example 1: Load Factor Calculation
              </p>
              <p>
                <strong>Question:</strong> An office building consumes 15,000 kWh over a 22-day
                working month, operating 10 hours per day. Maximum demand is 95 kW. Calculate the
                load factor.
              </p>

                <p>Operating hours = 22 days x 10 hours = 220 hours</p>
                <p>Average demand = Total energy / Operating hours</p>
                <p>
                  Average demand = 15,000 kWh / 220 h = <strong>68.2 kW</strong>
                </p>
                <p>Load Factor = Average demand / Maximum demand</p>
                <p>
                  Load Factor = 68.2 / 95 = <strong>0.72 (72%)</strong>
                </p>
                <p>
                  → Good load factor indicates efficient supply utilisation
                </p>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Example 2: Power Factor Correction Savings
              </p>
              <p>
                <strong>Question:</strong> A factory has 400 kW load at 0.75 pf. Calculate the kVAr
                required to improve to 0.95 pf, and the kVA reduction achieved.
              </p>

                <p>
                  Original kVA = kW / pf = 400 / 0.75 = <strong>533 kVA</strong>
                </p>
                <p>Required kVAr = kW x (tan(cos⁻¹0.75) - tan(cos⁻¹0.95))</p>
                <p>tan(cos⁻¹0.75) = 0.882</p>
                <p>tan(cos⁻¹0.95) = 0.329</p>
                <p>
                  kVAr = 400 x (0.882 - 0.329) = 400 x 0.553 = <strong>221 kVAr</strong>
                </p>
                <p>
                  New kVA = 400 / 0.95 = <strong>421 kVA</strong>
                </p>
                <p>
                  kVA reduction = 533 - 421 = <strong>112 kVA (21%)</strong>
                </p>
                <p className="mt-2 text-green-400">
                  At £12/kVA/month = £1,344/month = £16,128/year saving
                </p>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Example 3: Battery Sizing for Peak Shaving
              </p>
              <p>
                <strong>Question:</strong> A building has maximum demand of 600 kW. You want to
                limit grid demand to 450 kW for a 3-hour peak period using battery storage. Size the
                system.
              </p>

                <p>Peak reduction required = 600 - 450 = 150 kW</p>
                <p>Energy required = Power x Time = 150 kW x 3 h = 450 kWh</p>
                <p>Accounting for 85% depth of discharge:</p>
                <p>
                  Battery capacity = 450 / 0.85 = <strong>529 kWh</strong>
                </p>
                <p>
                  Inverter rating = Peak power = <strong>150 kW minimum</strong>
                </p>
                <p>→ Specify 530 kWh / 200 kW battery system</p>
                <p className="mt-2 text-green-400">
                  At £15/kVA/month demand saving = £2,250/month = £27,000/year
                </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical Guidance">
            <p className="text-sm font-medium text-elec-yellow/80">Essential Formulas</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Load Factor = Average Demand / Maximum Demand</strong>
                </li>
                <li>
                  <strong>kVA = kW / Power Factor</strong>
                </li>
                <li>
                  <strong>kVAr = kW x tan(cos⁻¹pf)</strong>
                </li>
                <li>
                  <strong>Battery kWh = Peak Reduction (kW) x Duration (h) / DoD</strong>
                </li>
                <li>
                  <strong>Annual Saving = MD Reduction x Rate x 12 months</strong>
                </li>
              </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Key Values to Remember
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  Integration period: typically <strong>30 minutes</strong>
                </li>
                <li>
                  Target power factor: <strong>0.95-0.98</strong>
                </li>
                <li>
                  Motor inrush: <strong>6-8x FLC</strong> (DOL starting)
                </li>
                <li>
                  Soft starter inrush: <strong>2-3x FLC</strong>
                </li>
                <li>
                  Typical stagger delay: <strong>10-30 seconds</strong>
                </li>
              </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Over-correcting pf:</strong> Leading power factor damages equipment
                </li>
                <li>
                  <strong>Shedding critical loads:</strong> Life safety must be protected
                </li>
                <li>
                  <strong>Ignoring rebound:</strong> Released loads can create new peak
                </li>
                <li>
                  <strong>Inadequate monitoring:</strong> Cannot manage what you do not measure
                </li>
              </ul>
              </>
            }
            doInstead="Apply the formulas with care, verify with measured values where possible, and always cross-check against BS 7671 and equipment manufacturer data."
          />

          <SectionRule />

          <ConceptBlock title="Quick Reference">
            <p className="text-sm font-medium text-elec-yellow/80">Load Management Metrics</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Maximum Demand - Highest 30-min average power</li>
                  <li>Load Factor - Average/Maximum demand ratio</li>
                  <li>Diversity Factor - MD/Connected load ratio</li>
                  <li>Power Factor - kW/kVA ratio</li>
                </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">DSM Strategies</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Peak clipping - Reduce peak directly</li>
                  <li>Load shifting - Move to off-peak periods</li>
                  <li>Valley filling - Increase off-peak use</li>
                  <li>Strategic conservation - Efficiency gains</li>
                </ul>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="Distribution warehouse with EV fleet &mdash; peak-shaving battery business case"
            situation={
              <>
                A distribution warehouse has a 1500 kVA DNO supply, current peak demand
                900 kVA, average demand 380 kVA (load factor 0.42). The operator plans
                to add 30 fleet EV chargers (22 kW each) for overnight charging. Naive
                addition would push peak to ~1450 kVA, just within supply capacity but
                tipping into the highest red-zone DUoS charge band. Operator asks the
                BSE engineer for a smart-charging + battery storage business case.
              </>
            }
            whatToDo={
              <>
                Three-step: (a) BMS smart-charging schedules EV chargers to start in
                staggered groups overnight, capping aggregate EV demand at 400 kW
                instead of 660 kW &mdash; brings peak to ~1240 kVA, below the
                red-zone trigger; (b) install a 200 kWh / 100 kW battery storage system
                that charges off-peak (green zone) and discharges during the morning
                business peak &mdash; further trims peak to ~1100 kVA; (c) integrate
                with the DNO&rsquo;s Demand Flexibility Service for additional revenue.
                Document payback (typically 6&ndash;9 years on storage alone, 4&ndash;6
                years with DUoS arbitrage) in the operator&rsquo;s ESOS submission.
              </>
            }
            whyItMatters={
              <>
                EV fleet electrification is shifting peak demand for warehouse, retail
                and depot operators. Without load management, every operator faces
                expensive substation upgrades. The HNC engineer who designs smart
                charging + storage as part of the EV connection avoids the
                substation upgrade and unlocks the DUoS arbitrage. The financial
                modelling is increasingly part of the BSE deliverable.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Maximum demand: highest 30-min average kVA over the billing period &mdash; basis of DNO capacity charges.',
              'Load factor (LF) = average demand / maximum demand &mdash; closer to 1 is flatter, more efficient.',
              'Demand response: paying users to reduce demand during grid stress &mdash; revenue stream on commercial / industrial sites via DSO services.',
              'Peak shaving: battery / generator dispatch during peak periods to suppress recorded MD.',
              'Time-of-use (TOU) tariffs: DUoS red / amber / green zones (and DNO-specific equivalents) drive arbitrage opportunity.',
              'BMS staggered starts: sequence motors during morning warm-up to avoid inrush coincidence on the busbar.',
              'Power-factor correction lifts effective kW capacity within the same kVA contract &mdash; cheap demand management.',
              'BS 7671 311.1 + ESOS Regulations 2014 anchor the regulatory case for active demand management.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module3-section6-2")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Efficiency calculations for equipment and systems
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module3-section6-4")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Energy-efficient motor and lighting design
              </div>
            </button>
          </div>

        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule3Section6_3;
