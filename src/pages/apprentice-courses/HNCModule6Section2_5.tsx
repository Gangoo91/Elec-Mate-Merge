/**
 * Module 6 · Section 2 · Subsection 5 — Battery Storage Systems
 * HNC Electrical Engineering for Building Services (Sustainability and Environmental Engineering)
 *   Battery technologies, system sizing, charge controllers, safety requirements, and grid services
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  CommonMistake,
  ConceptBlock,
  FAQ,
  KeyTakeaways,
  LearningOutcomes,
  RegsCallout,
  Scenario,
  SectionRule,
  TLDR,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Battery Storage Systems - HNC Module 6 Section 2.5';
const DESCRIPTION =
  'Master battery storage systems for renewable energy: battery technologies, system sizing, charge controllers, battery management systems, safety requirements, and grid services.';

const quickCheckQuestions = [
  {
    id: 'battery-dod',
    question: 'What does Depth of Discharge (DoD) indicate for a battery system?',
    options: [
      'The percentage of battery capacity that has been discharged',
      'The charging speed of the battery',
      'The maximum voltage the battery can reach',
      'The number of cells in the battery pack',
    ],
    correctIndex: 0,
    explanation:
      'Depth of Discharge (DoD) indicates the percentage of battery capacity that has been discharged relative to the total capacity. A higher DoD means more energy has been extracted, which affects battery lifespan.',
  },
  {
    id: 'lithium-advantage',
    question:
      'What is a key advantage of lithium-ion batteries over lead-acid for domestic storage?',
    options: [
      'To give practical guidance on complying with legal duties',
      'Lead and rosin (colophony) fumes from solder and flux',
      'Standard inputs and methods for Part L calculations',
      'Higher cycle life and deeper discharge capability',
    ],
    correctIndex: 3,
    explanation:
      'Lithium-ion batteries offer significantly higher cycle life (4,000-10,000 cycles vs 500-1,500) and can be discharged to 80-90% DoD compared to 50% for lead-acid, making them more suitable for daily cycling applications.',
  },
  {
    id: 'bms-function',
    question: 'What is the primary function of a Battery Management System (BMS)?',
    options: [
      'To monitor and protect battery cells from damage',
      'Process material adhering to sensor surfaces',
      'To predict and plan for income and expense patterns',
      'Digital communication with diagnostics and precise positioning',
    ],
    correctIndex: 0,
    explanation:
      'The BMS monitors individual cell voltages, temperatures, and state of charge, and protects the battery by preventing overcharging, over-discharging, and thermal runaway.',
  },
  {
    id: 'grid-services',
    question: 'Which grid service involves batteries absorbing excess renewable generation?',
    options: [
      'Grid balancing and absorption',
      'Gantt charts or daily task sheets',
      'Avoid work at height where possible',
      'Environmental Protection Act 1990',
    ],
    correctIndex: 0,
    explanation:
      'Grid balancing involves batteries absorbing excess generation (often from solar or wind) when supply exceeds demand, and releasing it later when demand increases or generation drops.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A lithium iron phosphate (LiFePO4) battery has a nominal voltage of 3.2V per cell. How many cells are needed for a 48V nominal system?',
    options: [
      '12 cells',
      '15 cells',
      '16 cells',
      '20 cells',
    ],
    correctAnswer: 1,
    explanation:
      '48V ÷ 3.2V = 15 cells. LiFePO4 batteries use 3.2V nominal per cell, so 15 cells in series provide 48V nominal (range approximately 40V-54.6V depending on state of charge).',
  },
  {
    id: 2,
    question: 'What is the typical round-trip efficiency of a modern lithium-ion battery system?',
    options: [
      '98-99%',
      '70-75%',
      '90-95%',
      '80-85%',
    ],
    correctAnswer: 2,
    explanation:
      'Modern lithium-ion battery systems achieve 90-95% round-trip efficiency, meaning 90-95% of energy stored can be retrieved. Lead-acid systems typically achieve 80-85%.',
  },
  {
    id: 3,
    question:
      'For a domestic property with 10kWh daily consumption and 80% self-consumption target, what minimum usable battery capacity is appropriate?',
    options: [
      '6kWh',
      '4kWh',
      '10kWh',
      '8kWh',
    ],
    correctAnswer: 3,
    explanation:
      'With 10kWh daily consumption and 80% self-consumption target, approximately 8kWh usable capacity is needed. This accounts for the portion of consumption occurring during non-generation hours.',
  },
  {
    id: 4,
    question: 'What is the C-rate of a 10kWh battery discharging at 5kW?',
    options: [
      'C/2 (0.5C)',
      '1C',
      '2C',
      '5C',
    ],
    correctAnswer: 0,
    explanation:
      'C-rate = Power ÷ Capacity = 5kW ÷ 10kWh = 0.5C or C/2. This means the battery would fully discharge in 2 hours. Higher C-rates reduce battery lifespan.',
  },
  {
    id: 5,
    question:
      'Which battery technology is most suitable for applications requiring very high cycle counts with minimal degradation?',
    options: [
      'IP44 or higher depending on zone',
      'Lithium iron phosphate (LiFePO4)',
      'Check integrity and compliance',
      'Measuring from different reference points',
    ],
    correctAnswer: 1,
    explanation:
      'LiFePO4 offers the highest cycle life (6,000-10,000 cycles at 80% DoD) with minimal degradation, excellent thermal stability, and is considered the safest lithium chemistry for stationary storage.',
  },
  {
    id: 6,
    question:
      'According to BS EN 62619, what is required for lithium battery installations in domestic premises?',
    options: [
      'Fuse or circuit breaker suitable for DC fault current',
      'Optimal power point tracking to maximise PV harvest',
      'Fire-rated enclosure or separation from occupied spaces',
      'Degradation that occurs over time regardless of use',
    ],
    correctAnswer: 2,
    explanation:
      'BS EN 62619 requires lithium batteries in domestic premises to have appropriate fire protection, typically a fire-rated enclosure or 30-minute fire separation from occupied spaces, with adequate ventilation.',
  },
  {
    id: 7,
    question: 'What function does an MPPT charge controller provide that a PWM controller cannot?',
    options: [
      'Fast response time and high power capability',
      'Degradation that occurs over time regardless of use',
      'Fuse or circuit breaker suitable for DC fault current',
      'Optimal power point tracking to maximise PV harvest',
    ],
    correctAnswer: 3,
    explanation:
      'MPPT (Maximum Power Point Tracking) controllers actively find and maintain the optimal operating point of the PV array, harvesting 15-30% more energy than PWM controllers, especially in cold conditions or when PV voltage differs significantly from battery voltage.',
  },
  {
    id: 8,
    question:
      'A battery system is rated at 10kWh with 80% depth of discharge and 90% inverter efficiency. What usable AC energy is available?',
    options: [
      '7.2kWh',
      '8.1kWh',
      '9.0kWh',
      '8.0kWh',
    ],
    correctAnswer: 0,
    explanation:
      'Usable AC energy = Capacity × DoD × Inverter efficiency = 10kWh × 0.80 × 0.90 = 7.2kWh. Both DoD limit and conversion losses must be considered for actual available energy.',
  },
  {
    id: 9,
    question: "What is 'calendar ageing' in battery degradation?",
    options: [
      'Degradation from excessive cycling',
      'Degradation that occurs over time regardless of use',
      'Degradation from high discharge rates',
      'Degradation from temperature cycling',
    ],
    correctAnswer: 1,
    explanation:
      "Calendar ageing is capacity loss that occurs over time due to chemical processes within the battery, regardless of whether the battery is being used. It's influenced by storage temperature and state of charge.",
  },
  {
    id: 10,
    question:
      'For frequency response grid services, what characteristic is most important in a battery system?',
    options: [
      'Lithium iron phosphate (LiFePO4)',
      'Fuse or circuit breaker suitable for DC fault current',
      'Fast response time and high power capability',
      'Fire-rated enclosure or separation from occupied spaces',
    ],
    correctAnswer: 2,
    explanation:
      'Frequency response requires fast reaction times (typically under 1 second) and sufficient power capability to rapidly inject or absorb energy. Energy capacity is secondary to power and response speed.',
  },
  {
    id: 11,
    question:
      'What safety device is required between a battery bank and the inverter according to BS 7671?',
    options: [
      'Fire-rated enclosure or separation from occupied spaces',
      'Fast response time and high power capability',
      'Degradation that occurs over time regardless of use',
      'Fuse or circuit breaker suitable for DC fault current',
    ],
    correctAnswer: 3,
    explanation:
      'A suitable DC-rated fuse or circuit breaker must be installed between the battery and inverter, capable of safely interrupting the high fault currents batteries can deliver. AC-rated devices are not suitable for DC circuits.',
  },
  {
    id: 12,
    question:
      'What is the primary advantage of flow batteries over lithium-ion for grid-scale storage?',
    options: [
      'Decoupled power and energy scaling with very long duration',
      'Fast response time and high power capability',
      'Optimal power point tracking to maximise PV harvest',
      'Fuse or circuit breaker suitable for DC fault current',
    ],
    correctAnswer: 0,
    explanation:
      'Flow batteries allow independent scaling of power (stack size) and energy (tank size), making them ideal for long-duration storage (4-12+ hours). Energy capacity can be increased simply by adding more electrolyte.',
  },
];

const faqs = [
  {
    question: 'How do I size a battery for maximum self-consumption with solar PV?',
    answer:
      "Analyse the property's load profile and PV generation data. Calculate the energy consumed during non-generation hours (evening and overnight load). The battery should cover this period - typically 50-80% of daily consumption. For a home using 10kWh daily with 4kWh overnight, a 6-8kWh usable capacity battery would maximise self-consumption. Consider seasonal variation and that oversizing provides diminishing returns.",
  },
  {
    question: 'What are the main fire safety considerations for domestic battery installations?',
    answer:
      'Key considerations include: location away from escape routes and occupied spaces; fire-rated enclosure or 30-minute separation; adequate ventilation for thermal management and gas dispersal; smoke detection in the installation area; accessible isolation for emergency services; and compliance with manufacturer installation requirements. LiFePO4 chemistry has inherently lower fire risk than NMC chemistries.',
  },
  {
    question: 'Can batteries be installed in garages or outbuildings?',
    answer:
      "Yes, garages and outbuildings are often preferred locations due to natural fire separation from the dwelling. Requirements include: frost protection for the battery and electronics; adequate ventilation; protection from flooding and moisture; secure access; and appropriate cable routes back to the property's electrical installation. Temperature extremes reduce battery performance and lifespan.",
  },
  {
    question: 'What is the difference between AC-coupled and DC-coupled battery systems?',
    answer:
      'DC-coupled systems connect the battery to the PV array via a shared charge controller/inverter, converting DC to AC once. This is more efficient (95-98%) but requires compatible equipment. AC-coupled systems use separate inverters for PV and battery, converting DC-AC-DC-AC, reducing efficiency to 85-90% but offering flexibility to retrofit to existing PV systems and mix equipment brands.',
  },
  {
    question: 'How do grid services like frequency response work with domestic batteries?',
    answer:
      "Aggregators combine many domestic batteries into a 'virtual power plant' that can respond to grid operator signals. When grid frequency drops (excess demand), batteries discharge to support the grid. When frequency rises (excess supply), batteries charge. Homeowners receive payments for participation while still prioritising their own energy needs. Response times must be under 1 second for dynamic frequency response services.",
  },
  {
    question: 'What warranty considerations apply to battery systems?',
    answer:
      'Battery warranties typically guarantee minimum retained capacity (often 60-70%) after a specified period (10-15 years) or cycle count (3,000-10,000 cycles). Key factors affecting warranty claims include: operating within specified temperature range; not exceeding maximum charge/discharge rates; proper installation by certified personnel; and maintaining required state of charge limits. Always verify warranty terms before purchase.',
  },
];

const HNCModule6Section2_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section2")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 6 · Section 2 · Subsection 5"
            title="Battery Storage Systems"
            description="Battery technologies, system sizing, charge controllers, safety requirements, and grid services"
            tone="purple"
          />

          <TLDR
            points={[
              "Battery storage uses Li-ion (typically LFP for stationary applications — safer chemistry than NMC) to time-shift electricity between low-tariff/PV-export and high-tariff periods, with usable capacity typically 5–13 kWh for residential, 50–500 kWh+ for commercial.",
              "BS 7671 Section 712.421 + BS EN IEC 62619 (industrial Li-ion safety) + IET Code of Practice for Electrical Energy Storage Systems are the design backbone; Building Regulations Part Q applies to certain installations.",
              "Connection follows G98/G99 (same as PV); fire risk assessment is required for any indoor installation, with the LFP chemistry strongly preferred over NMC for room locations.",
            ]}
          />

          <RegsCallout
            source="IET Code of Practice for Electrical Energy Storage Systems (3rd edition, 2024)"
            clause="Battery energy storage systems shall be selected, installed and commissioned with consideration to the safety hazards of electric shock, arc-flash, fire, thermal runaway, and toxic gas release. Lithium-ion installations within or adjacent to dwellings or sleeping accommodation shall be located to minimise fire spread risk, with a minimum separation of 600 mm from combustible materials and shall not be installed in escape routes, loft spaces accessed only via a hatch, or beneath or above sleeping accommodation unless specified justification is documented."
            meaning={
              <>
                The IET CoP is the de facto UK BESS standard — referenced by BS 7671, by insurers, and by the LABC. Location restrictions are tighter than installers often assume: garages and outbuildings are preferred over loft, under-stair or hallway sites. Indoor installations need a documented fire-risk assessment.
              </>
            }
            cite="Source: IET Code of Practice for Electrical Energy Storage Systems, 3rd edition 2024"
          />

          <LearningOutcomes
            outcomes={[
              "Compare battery technologies: lithium-ion, lead-acid, and flow batteries",
              "Calculate system sizing for self-consumption and backup applications",
              "Understand BMS functions, cell balancing, and protection",
              "Apply safety requirements including fire separation and ventilation",
              "Design appropriate charge controller selection (MPPT vs PWM)",
              "Evaluate grid service opportunities: frequency response and peak shaving",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Battery Technologies">
            <p>Modern energy storage systems utilise various battery chemistries, each with distinct characteristics suited to different applications. Understanding these technologies enables appropriate selection for residential, commercial, and grid-scale installations.</p>
            <p><strong>Lithium-Ion Technologies:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Lithium Iron Phosphate (LiFePO4):</strong> Safest chemistry, excellent cycle life (6,000-10,000), lower energy density, preferred for stationary storage</li>
              <li><strong>Lithium Nickel Manganese Cobalt (NMC):</strong> Higher energy density, good cycle life (3,000-5,000), requires more sophisticated thermal management</li>
              <li><strong>Lithium Titanate (LTO):</strong> Very fast charging, exceptional cycle life (15,000+), lower energy density, higher cost</li>
            </ul>
            <p><strong>Battery Technology Comparison</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>LiFePO4:</strong> 6,000-10,000 — 80-90% — 92-98% — Domestic, commercial storage</li>
              <li><strong>NMC:</strong> 3,000-5,000 — 80-90% — 90-95% — High energy density needs</li>
              <li><strong>Lead-Acid AGM:</strong> 500-1,500 — 50% — 80-85% — Low-cost backup, off-grid</li>
              <li><strong>Vanadium Flow:</strong> 20,000+ — 100% — 65-80% — Grid-scale, long duration</li>
            </ul>
            <p><strong>Flow Battery Characteristics</strong></p>
            <p>Flow batteries store energy in liquid electrolytes in external tanks. Power output is determined by the cell stack size, while energy capacity depends on tank volume. This allows independent scaling of power (kW) and energy (kWh) - ideal for long-duration storage applications where 4-12 hours of discharge is required.</p>
            <p><strong>Key consideration:</strong> LiFePO4 has become the dominant technology for UK residential and commercial installations due to its safety profile, cycle life, and competitive pricing.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Capacity, Power, and System Sizing">
            <p>Correct battery sizing requires understanding the relationship between capacity (kWh), power (kW), depth of discharge, and the specific application requirements - whether maximising self-consumption, providing backup power, or participating in grid services.</p>
            <p><strong>Energy Capacity (kWh)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Total stored energy</li>
              <li>Determines runtime</li>
              <li>Usable = Total × DoD</li>
              <li>Typical domestic: 5-15kWh</li>
            </ul>
            <p><strong>Power Rating (kW)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Maximum charge/discharge rate</li>
              <li>Continuous vs peak ratings</li>
              <li>Affects C-rate and lifespan</li>
              <li>Typical domestic: 3-5kW</li>
            </ul>
            <p><strong>C-Rate</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Discharge rate relative to capacity</li>
              <li>1C = full discharge in 1 hour</li>
              <li>Lower C-rate extends life</li>
              <li>Most domestic: 0.5C typical</li>
            </ul>
            <p><strong>Self-Consumption Sizing Method</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1. Daily consumption:</strong> Annual kWh ÷ 365 — 3,650kWh ÷ 365 = 10kWh/day</li>
              <li><strong>2. Evening/night load:</strong> Consumption 4pm-8am — Typically 50-70% = 6kWh</li>
              <li><strong>3. Target self-consumption:</strong> Evening load × target % — 6kWh × 80% = 4.8kWh needed</li>
              <li><strong>4. Account for DoD:</strong> Required ÷ DoD — 4.8kWh ÷ 0.8 = 6kWh nominal</li>
              <li><strong>5. Account for efficiency:</strong> Nominal ÷ efficiency — 6kWh ÷ 0.9 = 6.7kWh system</li>
            </ul>
            <p><strong>Worked Example: Domestic System Sizing</strong></p>
            <p><strong>Property:</strong> 4-bed house, 4,000kWh annual consumption, 4kWp PV system</p>
            <p><strong>Daily consumption:</strong> 4,000 ÷ 365 = 11kWh</p>
            <p><strong>Evening/overnight load:</strong> 65% × 11kWh = 7.15kWh</p>
            <p><strong>Excess PV available:</strong> Analysis shows ~5kWh surplus on typical summer day</p>
            <p><strong>Usable capacity needed:</strong> Minimum 5kWh to capture surplus</p>
            <p><strong>Nominal capacity (80% DoD):</strong> 5 ÷ 0.8 = 6.25kWh</p>
            <p><strong>Recommendation:</strong> 6-8kWh system with 3kW continuous power rating</p>
            <p><strong>Design tip:</strong> Oversizing batteries provides diminishing returns - a larger battery may never fully charge in winter when PV output is low.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Charge Controllers and Battery Management">
            <p>Charge controllers regulate energy flow between the PV array and batteries, while the Battery Management System (BMS) monitors and protects individual cells. Both are essential for safe, efficient, and long-lasting battery operation.</p>
            <p><strong>MPPT vs PWM Charge Controllers</strong></p>
            <p>PWM (Pulse Width Modulation)</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Direct connection - PV voltage must match battery</li>
              <li>70-80% typical efficiency</li>
              <li>Lower cost, simpler design</li>
              <li>Best for small systems with matched voltages</li>
            </ul>
            <p>MPPT (Maximum Power Point Tracking)</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>DC-DC conversion - any PV voltage to battery</li>
              <li>95-99% typical efficiency</li>
              <li>15-30% more energy harvest</li>
              <li>Essential for larger systems, high-voltage strings</li>
            </ul>
            <p><strong>Battery Management System Functions</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Cell voltage monitoring:</strong> Tracks individual cell voltages to detect imbalance or failing cells</li>
              <li><strong>Cell balancing:</strong> Equalises charge across cells - passive (dissipative) or active (energy transfer)</li>
              <li><strong>Temperature monitoring:</strong> Multiple sensors detect hotspots and trigger cooling or shutdown</li>
              <li><strong>Over-charge protection:</strong> Disconnects charging when cells reach maximum voltage (4.2V NMC, 3.65V LiFePO4)</li>
              <li><strong>Over-discharge protection:</strong> Disconnects load at minimum voltage (2.5V NMC, 2.5V LiFePO4)</li>
              <li><strong>Short circuit protection:</strong> Fast-acting disconnection for fault currents</li>
              <li><strong>State of Charge (SoC):</strong> Calculates remaining capacity using coulomb counting and voltage correlation</li>
              <li><strong>State of Health (SoH):</strong> Tracks capacity degradation over time</li>
            </ul>
            <p><strong>Charge Controller Sizing</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Maximum PV voltage:</strong> Voc × number of series modules — Apply cold temperature coefficient</li>
              <li><strong>Maximum PV current:</strong> Isc × number of parallel strings — × 1.25 for irradiance peaks</li>
              <li><strong>Controller current rating:</strong> PV power ÷ battery voltage — Select next size up</li>
            </ul>
            <p><strong>Communication protocols:</strong> Modern BMS units communicate via CAN bus, RS485, or Modbus with inverters and monitoring systems, enabling real-time data logging and remote diagnostics.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Safety Requirements and Grid Services">
            <p>Battery installations must comply with stringent safety requirements covering fire protection, ventilation, and electrical safety. Beyond self-consumption, grid-connected batteries can provide valuable services to the electricity network.</p>
            <p><strong>Fire Safety Requirements (BS EN 62619, BS 7671)</strong></p>
            <p><strong>Location Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>30-minute fire separation from occupied spaces</li>
              <li>Away from escape routes</li>
              <li>Not in loft spaces (heat accumulation)</li>
              <li>Accessible for emergency services</li>
              <li>Fire-rated enclosure if in dwelling</li>
            </ul>
            <p><strong>Ventilation Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Natural or mechanical ventilation</li>
              <li>Prevent gas accumulation (hydrogen from lead-acid)</li>
              <li>Thermal management airflow</li>
              <li>Low-level inlet, high-level outlet</li>
              <li>Minimum 50cm clearance around unit</li>
            </ul>
            <p><strong>Electrical Safety Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>DC isolation:</strong> Accessible DC isolator between battery and inverter rated for DC fault current</li>
              <li><strong>Overcurrent protection:</strong> DC-rated fuses or MCBs suitable for battery short-circuit current (can exceed 10kA)</li>
              <li><strong>Earthing:</strong> Compliant with BS 7671 requirements for PV and battery systems</li>
              <li><strong>Labelling:</strong> Warning labels indicating battery presence, voltages, and isolation points</li>
              <li><strong>G98/G99 compliance:</strong> Grid connection requirements for import/export functionality</li>
            </ul>
            <p><strong>Thermal Runaway Prevention</strong></p>
            <p>Thermal runaway occurs when a cell overheats, triggering an exothermic reaction that spreads to adjacent cells. Prevention measures include: operating within specified temperature range (typically 0-45°C); adequate ventilation; BMS thermal monitoring with automatic shutdown; appropriate spacing between cells; and fire-resistant enclosures. LiFePO4 chemistry is inherently more resistant to thermal runaway than NMC.</p>
            <p><strong>Grid Services Overview</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Frequency Response:</strong> Rapid power injection/absorption to stabilise grid frequency — &lt;1 second response, high power capability</li>
              <li><strong>Peak Shaving:</strong> Reduce demand during peak periods (typically 4-7pm) — Predictable load profiles, time-of-use tariffs</li>
              <li><strong>Grid Balancing:</strong> Absorb excess renewable generation, release during low generation — Large capacity, aggregation platform</li>
              <li><strong>Voltage Support:</strong> Reactive power provision for local voltage regulation — Inverter capable of reactive power control</li>
            </ul>
            <p><strong>Revenue stacking:</strong> Domestic batteries can generate additional income through grid services while still prioritising self-consumption - typical earnings range from £50-200 per year depending on capacity and services enrolled.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Usable Energy Calculation</strong>
            </p>
            <p><strong>Scenario:</strong> Calculate the usable AC energy from a 13.5kWh battery system with 90% DoD and 95% inverter efficiency.</p>
            <p>Given:</p>
            <p>Nominal capacity = 13.5kWh</p>
            <p>Depth of Discharge = 90%</p>
            <p>Inverter efficiency = 95%</p>
            <p>Calculation:</p>
            <p>Usable DC energy = 13.5kWh × 0.90 = 12.15kWh</p>
            <p>Usable AC energy = 12.15kWh × 0.95 = 11.54kWh</p>
            <p>Result: 11.54kWh available for AC loads</p>
            <p>Note: This represents 85.5% of nominal capacity as usable AC energy</p>
            <p>
              <strong>Example 2: Battery Cycle Life Estimation</strong>
            </p>
            <p><strong>Scenario:</strong> A LiFePO4 battery is rated for 6,000 cycles at 80% DoD. If cycled once daily, estimate the calendar life.</p>
            <p>Given:</p>
            <p>Rated cycles = 6,000 at 80% DoD</p>
            <p>Usage pattern = 1 cycle per day</p>
            <p>Calculation:</p>
            <p>Cycle life in years = 6,000 cycles ÷ 365 days/year</p>
            <p>Cycle life = 16.4 years</p>
            <p>Result: ~16 years before reaching cycle life limit</p>
            <p>Note: Calendar ageing may limit actual life to 10-15 years regardless of cycles</p>
            <p>
              <strong>Example 3: C-Rate and Discharge Time</strong>
            </p>
            <p><strong>Scenario:</strong> A 10kWh battery system is discharging at 2.5kW. Calculate the C-rate and expected discharge time.</p>
            <p>Given:</p>
            <p>Battery capacity = 10kWh</p>
            <p>Discharge power = 2.5kW</p>
            <p>C-Rate Calculation:</p>
            <p>C-rate = Power ÷ Capacity</p>
            <p>C-rate = 2.5kW ÷ 10kWh = 0.25C (or C/4)</p>
            <p>Discharge Time:</p>
            <p>Time = Capacity ÷ Power = 10kWh ÷ 2.5kW = 4 hours</p>
            <p>Result: C/4 rate with 4-hour discharge time</p>
            <p>Note: Lower C-rates extend battery lifespan significantly</p>
            <p>
              <strong>Example 4: MPPT Controller Sizing</strong>
            </p>
            <p><strong>Scenario:</strong> Size an MPPT controller for a 4kWp PV array (10 × 400W panels in 2 strings of 5) with 48V battery system.</p>
            <p>Panel specifications (example):</p>
            <p>Voc = 49.5V, Vmp = 41.5V, Isc = 10.2A, Imp = 9.65A</p>
            <p>Array Configuration (2 strings × 5 panels):</p>
            <p>String Voc = 49.5V × 5 = 247.5V</p>
            <p>String Vmp = 41.5V × 5 = 207.5V</p>
            <p>Total Isc = 10.2A × 2 = 20.4A</p>
            <p>Cold temperature adjustment (−10°C, +0.3%/°C):</p>
            <p>Max Voc = 247.5V × 1.09 = 269.8V</p>
            <p>Controller Requirements:</p>
            <p>Minimum voltage rating: 270V (select 300V+ for margin)</p>
            <p>Current rating: 4000W ÷ 48V = 83.3A (select 100A)</p>
            <p>Result: 300V/100A MPPT controller suitable</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Installation Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Verify location meets fire separation and ventilation requirements</li>
              <li>Confirm mounting surface can support battery weight (typically 100-150kg)</li>
              <li>Install DC-rated isolation and overcurrent protection</li>
              <li>Ensure BMS communication with inverter is configured</li>
              <li>Apply appropriate warning labels at all isolation points</li>
              <li>Complete G98/G99 notification for grid-connected systems</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>LiFePO4 cell voltage: <strong>3.2V nominal</strong> (2.5V-3.65V range)</li>
              <li>NMC cell voltage: <strong>3.7V nominal</strong> (2.5V-4.2V range)</li>
              <li>Typical round-trip efficiency: <strong>90-95%</strong> lithium-ion</li>
              <li>Recommended DoD: <strong>80%</strong> for optimal lifespan</li>
              <li>Fire separation: <strong>30 minutes</strong> minimum</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Oversizing batteries</strong> - May never fully charge in winter, wasting investment</li>
                <li><strong>Ignoring temperature range</strong> - Reduces capacity and lifespan outside 10-35°C</li>
                <li><strong>Using AC-rated protection</strong> - DC faults require DC-rated devices</li>
                <li><strong>Poor ventilation</strong> - Causes thermal stress and potential fire risk</li>
              </ul>
            }
            doInstead="Cross-check assumptions against published guidance, validate measured values against design intent, and engage the wider team early when interface issues emerge."
          />

          <SectionRule />

          <Scenario
            title="NMC battery refused by insurer after loft install"
            situation={
              <>
                A homeowner installs a 9.5 kWh NMC chemistry battery in the loft as part of a PV upgrade. The work is MCS-signed and Building Control inspected. Six months later the home insurance renewal is refused because the insurer has updated their policy to exclude NMC batteries in habitable buildings without dedicated fire compartmentation.
              </>
            }
            whatToDo={
              <>
                Re-locate to an outbuilding or garage with fire compartmentation per IET CoP, OR replace with a wall-mount LFP unit with manufacturer-rated indoor fire enclosure, OR commission a fire risk assessment to insurer requirements (typically uneconomic). Document the change for insurance disclosure. Going forward: specify LFP for any indoor location and check insurer policy before quoting.
              </>
            }
            whyItMatters={
              <>
                BESS is the fastest-changing area of building services regulation — IET CoP, ABI, ABBA, LABC all updating annually. NMC chemistry is becoming uninsurable in residential applications. Always specify chemistry, location and fire enclosure to the latest standard.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "LFP (LiFePO4) preferred over NMC for stationary residential — safer thermal profile.",
              "IET Code of Practice for EESS is the UK design reference; BS 7671 Section 712 applies.",
              "Indoor location: not in escape routes, not in lofts (hatch-only), not over/under sleeping spaces.",
              "Outbuilding or garage with fire compartmentation is the safer default.",
              "Fire risk assessment + manufacturer-rated enclosure required for indoor installations.",
              "Connection G98/G99 (same as PV); G99 if PV+BESS combined export rating exceeds 16 A/phase.",
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section2-4")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Small-scale wind
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section2-6")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                CHP and district energy
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule6Section2_5;
