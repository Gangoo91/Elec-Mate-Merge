/**
 * Module 6 · Section 5 · Subsection 2 — Metering Strategies
 * HNC Electrical Engineering for Building Services (Sustainability and Environmental Engineering)
 *   Main metering, sub-metering, automatic meter reading, data loggers, and metering hierarchies for building energy management
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

const TITLE = 'Metering Strategies - HNC Module 6 Section 5.2';
const DESCRIPTION =
  'Master metering strategies for building services: main metering, sub-metering hierarchies, automatic meter reading (AMR), data loggers, CT metering, accuracy classes, and BMS integration per CIBSE TM39 guidance.';

const quickCheckQuestions = [
  {
    id: 'metering-hierarchy',
    question: 'What is a metering hierarchy in building services?',
    options: [
      'A structured arrangement of meters from main intake to sub-circuits for energy apportionment',
      'Letterforms are simpler with fewer decorative strokes, helping some readers (e.g. dyslexic) distinguish characters',
      'To ensure exits are visible from a distance and confirm they lead outside',
      'The maximum load the scaffold platform is designed to carry, classified by intended use',
    ],
    correctIndex: 0,
    explanation:
      'A metering hierarchy is a structured arrangement of meters at different levels (main, sub-main, circuit) that enables energy consumption to be measured, apportioned, and analysed across a building or facility.',
  },
  {
    id: 'sub-metering-purpose',
    question: 'What is the primary purpose of sub-metering in commercial buildings?',
    options: [
      'To apportion energy costs and identify consumption patterns by area or tenant',
      'Certificates, test results, maintenance records, and as-built drawings',
      'Show the installation as actually constructed, including all variations',
      'Visual inspection, earth continuity, insulation resistance and functional test',
    ],
    correctIndex: 0,
    explanation:
      'Sub-metering enables energy costs to be apportioned fairly between tenants or departments, identifies areas of high consumption, and supports energy management initiatives by providing granular consumption data.',
  },
  {
    id: 'amr-definition',
    question: 'What does AMR (Automatic Meter Reading) provide?',
    options: [
      'To reduce short-cycling and ensure minimum run times',
      'You are significantly more likely to achieve them',
      'Special procedures and equipment certification',
      'Remote collection of meter data without manual reading',
    ],
    correctIndex: 3,
    explanation:
      'AMR systems automatically collect consumption data from meters and transfer it to a central database without the need for physical meter reading, enabling frequent data collection, billing accuracy, and energy analysis.',
  },
  {
    id: 'ct-metering',
    question: 'When is CT (Current Transformer) metering typically required?',
    options: [
      'To assist with evacuation, check designated areas are clear, and report to the assembly point',
      'The planned/unplanned ratio (or reactive/proactive split)',
      'When current exceeds direct-connect meter ratings (typically above 100A)',
      'Regulations setting minimum EPC ratings for rental properties',
    ],
    correctIndex: 2,
    explanation:
      'CT metering is used when circuit currents exceed the direct connection capability of meters (typically above 100A). CTs step down the current to a measurable level (usually 5A secondary) whilst maintaining proportionality.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'According to CIBSE TM39, what percentage of total building energy should typically be captured by sub-metering?',
    options: [
      'At least 50%',
      'At least 90%',
      'At least 70%',
      '100% mandatory',
    ],
    correctAnswer: 1,
    explanation:
      'CIBSE TM39 recommends that sub-metering should capture at least 90% of total building energy consumption to enable effective energy management and identification of consumption patterns.',
  },
  {
    id: 2,
    question: 'In a typical metering hierarchy, Level 1 meters are:',
    options: [
      'BMS monitoring points only',
      'Circuit-level meters measuring individual loads',
      'Fiscal/main meters at the building intake',
      'Sub-main meters at distribution board level',
    ],
    correctAnswer: 2,
    explanation:
      'Level 1 (or Tier 1) meters are the fiscal meters at the main building intake, measuring total energy imported from the grid. These are typically utility-owned meters used for billing purposes.',
  },
  {
    id: 3,
    question: 'What is the typical pulse output from an energy meter?',
    options: [
      '1 pulse per 10 Wh',
      '1 pulse per Wh',
      'Variable depending on load',
      '1 pulse per kWh',
    ],
    correctAnswer: 3,
    explanation:
      'Standard energy meters typically output 1 pulse per kWh (or 1000 pulses per MWh). Some high-resolution meters may output 10 or 100 pulses per kWh for greater accuracy in monitoring applications.',
  },
  {
    id: 4,
    question: 'A Class 1 electricity meter has an accuracy of:',
    options: [
      '±1.0%',
      '±0.5%',
      '±0.2%',
      '±2.0%',
    ],
    correctAnswer: 0,
    explanation:
      'Class 1 meters have an accuracy of ±1.0% under reference conditions. Class 0.5 achieves ±0.5%, Class 0.2 achieves ±0.2%. Higher accuracy classes are used for fiscal metering and high-value monitoring.',
  },
  {
    id: 5,
    question: 'What is the standard secondary current for CT metering installations?',
    options: [
      '1A',
      '5A',
      '100A',
      '10A',
    ],
    correctAnswer: 1,
    explanation:
      'The standard secondary current for CTs is 5A, although 1A secondary CTs are sometimes used for long cable runs to reduce voltage drop and power losses in the secondary circuit.',
  },
  {
    id: 6,
    question:
      'Which communication protocol is commonly used for AMR systems in commercial buildings?',
    options: [
      'DALI',
      'DMX512',
      'Modbus RTU/TCP',
      '1-Wire',
    ],
    correctAnswer: 2,
    explanation:
      'Modbus RTU (serial) and Modbus TCP (Ethernet) are widely used protocols for AMR systems, enabling meters to communicate consumption data to BMS or dedicated energy monitoring systems.',
  },
  {
    id: 7,
    question:
      'A data logger recording energy consumption every 15 minutes will generate how many readings per day?',
    options: [
      '24 readings',
      '48 readings',
      '144 readings',
      '96 readings',
    ],
    correctAnswer: 3,
    explanation:
      '15-minute intervals result in 4 readings per hour × 24 hours = 96 readings per day. This is a common interval for half-hourly settlement metering and energy analysis.',
  },
  {
    id: 8,
    question: 'For sub-metering tenant spaces, which meter configuration is most appropriate?',
    options: [
      'Three-phase CT metering with MID approval',
      'Pulse counting from existing MCBs',
      'Single-phase direct connect only',
      'Power factor meters only',
    ],
    correctAnswer: 0,
    explanation:
      'MID (Measuring Instruments Directive) approved three-phase CT meters are appropriate for tenant sub-metering as they provide the accuracy and legal traceability required for cost apportionment and potential recharging.',
  },
  {
    id: 9,
    question: 'What information does a multi-function energy meter typically provide beyond kWh?',
    options: [
      'Exposed parts may become live under fault conditions',
      'kWh, kVAh, kVArh, power factor, and demand',
      'Multiple trips to suppliers for forgotten materials',
      'To ensure exact positioning as per drawings',
    ],
    correctAnswer: 1,
    explanation:
      'Multi-function meters measure active energy (kWh), apparent energy (kVAh), reactive energy (kVArh), power factor, maximum demand, and often instantaneous voltage, current, and power values.',
  },
  {
    id: 10,
    question: 'The CT ratio for a 400A circuit using standard 5A secondary CTs would be:',
    options: [
      '400/1',
      '2000/5',
      '400/5',
      '80/1',
    ],
    correctAnswer: 2,
    explanation:
      'For a 400A circuit with 5A secondary CTs, the ratio is 400/5 (or 80:1). The meter must be programmed with this ratio to correctly calculate the primary current and energy consumption.',
  },
  {
    id: 11,
    question: 'Which CIBSE document provides detailed guidance on energy metering strategies?',
    options: [
      'TM22',
      'TM52',
      'TM46',
      'TM39',
    ],
    correctAnswer: 3,
    explanation:
      "CIBSE TM39 'Building Energy Metering' provides comprehensive guidance on metering strategies, hierarchy design, meter selection, and implementation for effective building energy management.",
  },
  {
    id: 12,
    question:
      'When integrating meters with a BMS, what is the primary advantage of using a dedicated energy monitoring system versus direct BMS connection?',
    options: [
      'Specialised analysis, reporting, and data storage capabilities',
      'Line-neutral faults where current is balanced',
      'You may replace working components and miss the real fault',
      'Overhead power lines, cables, beams and any other overhead obstructions',
    ],
    correctAnswer: 0,
    explanation:
      'Dedicated energy monitoring systems provide specialised energy analysis, trend reporting, benchmarking, alarm management, and long-term data storage that general BMS systems may not offer to the same depth.',
  },
];

const faqs = [
  {
    question: 'What is the difference between fiscal metering and sub-metering?',
    answer:
      'Fiscal meters are utility-owned meters at the building intake used for billing purposes - they must meet strict accuracy and approval standards (MID). Sub-meters are typically building-owner installed meters downstream of the fiscal meter, used for internal cost apportionment, energy management, and identifying consumption patterns. Sub-meters can be MID approved if used for tenant recharging.',
  },
  {
    question: 'How do I size CTs for metering installations?',
    answer:
      "Size CTs based on the maximum expected current, typically 125% of the circuit's design current to allow for load growth. For a 400A circuit, use 500/5 CTs. Ensure the CT accuracy class matches the meter requirements (typically 0.5 or 1.0 for energy metering). The CT burden (VA rating) must exceed the meter's VA requirement plus cable losses in the secondary circuit.",
  },
  {
    question: 'What logging interval should I use for energy data?',
    answer:
      'Common intervals are: 15 minutes for detailed analysis and demand profiling, 30 minutes for half-hourly settlement compliance, 1 hour for general monitoring. Shorter intervals provide better resolution but increase data storage requirements. For identifying short-duration loads or power quality issues, 1-minute or faster intervals may be needed.',
  },
  {
    question: 'Can sub-meter readings be used for tenant billing?',
    answer:
      "Yes, but the meters should be MID approved (for legal traceability) and the metering arrangement should be documented in the lease agreement. Calibration certificates should be maintained. Some landlords use 'check metering' where sub-meters verify utility bills rather than directly billing tenants to avoid disputes.",
  },
  {
    question: 'How do I verify sub-meter accuracy against the main meter?',
    answer:
      'Sum all sub-meter readings and compare to the main meter over the same period. The difference (distribution losses plus unmetered loads) should typically be less than 5-10%. Large discrepancies indicate unmetered circuits, CT ratio errors, meter faults, or missing sub-meters. Regular reconciliation is essential for energy management credibility.',
  },
  {
    question: 'What is M-Bus and when should it be used?',
    answer:
      'M-Bus (Meter Bus) is a European standard protocol specifically designed for remote reading of utility meters. It uses a two-wire bus system and can connect up to 250 devices over distances up to 1km. M-Bus is commonly used for heat, water, and gas metering and is increasingly supported by electricity meters for integrated utility monitoring.',
  },
];

const HNCModule6Section5_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section5")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 6 · Section 5 · Subsection 2"
            title="Metering Strategies"
            description="Main metering, sub-metering, automatic meter reading, data loggers, and metering hierarchies for building energy management"
            tone="purple"
          />

          <TLDR
            points={[
              "Building metering is structured hierarchically — main incoming meter (utility billed), then sub-meters by floor / tenancy / system (HVAC, lighting, small power, IT), each with class-1 or class-2 accuracy and BMS connection for 30-minute or finer interval data.",
              "Part L mandates sub-metering for end-uses >250 m² floor area or >10% of total demand on non-domestic buildings — the legal floor; CIBSE TM39 sets the practical metering strategy guidance.",
              "Automatic Meter Reading (AMR) and BMS integration are the basis of monitoring & targeting — without interval data, energy management is reactive and savings are unverifiable.",
            ]}
          />

          <RegsCallout
            source="Approved Document L Volume 2 + CIBSE TM39 (Building Energy Metering) + The Smart Meter Implementation Programme"
            clause="In a building with a total useful floor area greater than 1000 m², separate metering shall be provided for each fuel and for each end-use category exceeding 250 m² floor area or 10% of the building's total energy demand. Metering shall enable at least 90% of the estimated annual energy consumption of each fuel to be assigned to the various end-use categories. Each meter shall be readable both manually and remotely, and shall comply with the appropriate accuracy class for revenue or sub-billing purposes."
            meaning={
              <>
                Part L 2021 metering provisions are stricter than 2013. Every meaningful end-use needs a sub-meter; the 90% allocation rule means no large unmetered loads. Smart Meter (SMETS2) requirement for utility-billed meters separately mandates remote reading. CIBSE TM39 is the practical reference for designing the metering strategy.
              </>
            }
            cite="Source: Approved Document L Volume 2: 2021 — gov.uk; CIBSE TM39 (2021) Building Energy Metering — cibse.org"
          />

          <LearningOutcomes
            outcomes={[
              "Design metering hierarchies per CIBSE TM39 guidance",
              "Specify main metering and sub-metering arrangements",
              "Select appropriate meter accuracy classes and CT ratings",
              "Implement automatic meter reading (AMR) systems",
              "Configure data loggers and logging intervals",
              "Integrate metering with BMS and energy monitoring systems",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Metering Hierarchy and Strategy">
            <p>A well-designed metering hierarchy enables effective energy management by providing visibility of consumption at multiple levels throughout a building. CIBSE TM39 provides comprehensive guidance on metering strategy development, recommending that at least 90% of total building energy consumption should be captured by sub-metering.</p>
            <p><strong>Metering hierarchy levels:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Level 1 (Fiscal):</strong> Main utility meters at building intake - used for billing</li>
              <li><strong>Level 2 (Sub-main):</strong> Distribution board level meters - major systems or zones</li>
              <li><strong>Level 3 (Circuit):</strong> Individual circuit or load meters - specific equipment</li>
              <li><strong>Level 4 (Equipment):</strong> Individual plant items - chillers, AHUs, lifts</li>
            </ul>
            <p><strong>Typical Metering Hierarchy Structure</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Level 1:</strong> Main intake room — Utility billing — Fiscal CT meter (Class 0.5)</li>
              <li><strong>Level 2:</strong> MSB outgoing ways — System/zone allocation — CT meter (Class 1.0)</li>
              <li><strong>Level 3:</strong> Floor/tenant DBs — Tenant recharging — MID approved meter</li>
              <li><strong>Level 4:</strong> Plant equipment — Equipment monitoring — Direct connect/CT meter</li>
            </ul>
            <p><strong>CIBSE TM39 Metering Guidance</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>• Target metering coverage: <strong>≥90%</strong> of total consumption</li>
              <li>• Separate metering recommended for: HVAC, lighting, small power, lifts, catering</li>
              <li>• Tenant areas: Individual metering essential for recharging</li>
              <li>• Central plant: Each major item (chillers, boilers, pumps) separately metered</li>
            </ul>
            <p><strong>Design principle:</strong> The metering strategy should align with the building's energy management objectives, lease structure, and reporting requirements.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Main Metering and Sub-Metering">
            <p>Main metering (fiscal metering) provides the billing interface with the utility supplier, whilst sub-metering enables internal energy management, cost allocation, and consumption analysis. The choice of metering arrangement depends on building use, tenancy structure, and management objectives.</p>
            <p><strong>Main (Fiscal) Metering</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Utility-owned and maintained</li>
              <li>MID approved, Class 0.5 minimum</li>
              <li>CT metering above 100A</li>
              <li>Half-hourly data for large sites</li>
              <li>Sealed and tamper-evident</li>
            </ul>
            <p><strong>Sub-Metering</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Building owner installed</li>
              <li>Class 1.0 typical (Class 0.5 for recharging)</li>
              <li>Direct connect up to 100A</li>
              <li>Logging intervals as required</li>
              <li>BMS/monitoring system integration</li>
            </ul>
            <p><strong>Sub-Metering Strategies</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>By tenant:</strong> Multi-tenant buildings — Fair cost allocation — MID approval for recharging</li>
              <li><strong>By system:</strong> Single occupancy — Identifies energy use by end use — Requires careful categorisation</li>
              <li><strong>By zone/floor:</strong> Large floor plate buildings — Location-based analysis — May not align with systems</li>
              <li><strong>Hybrid:</strong> Complex buildings — Flexible analysis options — More meters, higher cost</li>
            </ul>
            <p><strong>CIBSE TM39 Recommended Sub-Metering Categories</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>HVAC:</strong> Chillers, boilers, pumps, fans, FCUs, splits (separately where practical)</li>
              <li><strong>Lighting:</strong> General lighting, emergency lighting, external lighting</li>
              <li><strong>Small power:</strong> General socket outlets, IT equipment, printers</li>
              <li><strong>Specialist:</strong> Lifts, catering, server rooms, process loads</li>
              <li><strong>Renewables:</strong> PV generation, battery storage (import/export)</li>
            </ul>
            <p><strong>Best practice:</strong> Install metering at design stage - retrofitting is significantly more expensive and disruptive.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Automatic Meter Reading and Data Loggers">
            <p>Automatic Meter Reading (AMR) eliminates manual meter reading, enables frequent data collection, and supports real-time energy monitoring. Data loggers store consumption profiles for analysis and can integrate with building management systems for comprehensive energy management.</p>
            <p><strong>AMR System Components</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Meters:</strong> Energy meters with communication interfaces</li>
              <li><strong>Communications:</strong> Modbus, M-Bus, BACnet, pulse outputs</li>
              <li><strong>Data concentrator:</strong> Collects data from multiple meters</li>
              <li><strong>Software:</strong> Energy monitoring and analysis platform</li>
              <li><strong>Network:</strong> Wired (RS485, Ethernet) or wireless (LoRa, GSM)</li>
            </ul>
            <p><strong>Communication Protocols</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Modbus RTU:</strong> RS485 (2-wire) — Industrial metering — 1200m</li>
              <li><strong>Modbus TCP:</strong> Ethernet — BMS integration — 100m per segment</li>
              <li><strong>M-Bus:</strong> 2-wire bus — Utility metering — 1000m</li>
              <li><strong>BACnet MS/TP:</strong> RS485 — BMS integration — 1200m</li>
              <li><strong>Pulse output:</strong> Volt-free contact — Simple counting — Application dependent</li>
            </ul>
            <p><strong>Pulse Counting</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Standard: 1 pulse = 1 kWh</li>
              <li>High resolution: 10-1000 pulses/kWh</li>
              <li>Pulse width typically 100ms</li>
              <li>Requires pulse counter/logger</li>
              <li>Simple, reliable, low cost</li>
            </ul>
            <p><strong>Data Logging Intervals</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>1 minute: Power quality, demand spikes</li>
              <li>15 minutes: Standard energy analysis</li>
              <li>30 minutes: Half-hourly settlement</li>
              <li>1 hour: General monitoring</li>
              <li>Daily: Simple trend analysis</li>
            </ul>
            <p><strong>Data Logger Functions</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Interval recording:</strong> Store readings at defined intervals (typically 15-30 minutes)</li>
              <li><strong>Maximum demand:</strong> Record peak demand in each interval for tariff analysis</li>
              <li><strong>Time-of-use:</strong> Separate registers for peak/off-peak periods</li>
              <li><strong>Power quality:</strong> Voltage, current, power factor, harmonics logging</li>
              <li><strong>Alarm logging:</strong> Record over/under voltage, power factor trips, demand limits</li>
            </ul>
            <p><strong>Integration tip:</strong> Ensure sufficient data storage capacity - 15-minute logging generates 35,000+ readings per meter per year.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="CT Metering and Accuracy Classes">
            <p>Current Transformer (CT) metering is required when circuit currents exceed the direct connection capability of meters, typically above 100A. Correct CT selection and installation is critical for metering accuracy - errors in CT ratio, burden, or class directly affect energy measurement.</p>
            <p><strong>CT Selection Criteria</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Primary current:</strong> 125% of design current — 400A circuit → 500/5 CT</li>
              <li><strong>Secondary current:</strong> 5A standard, 1A for long runs — 5A typical, 1A if &gt;30m cable</li>
              <li><strong>Accuracy class:</strong> Match meter requirements — Class 0.5 for fiscal, Class 1 for sub</li>
              <li><strong>Burden (VA):</strong> Meter VA + cable losses — 5VA meter + 2VA cable = 7.5VA CT</li>
              <li><strong>Window size:</strong> Accommodate conductor/busbar — Split-core for retrofit</li>
            </ul>
            <p><strong>Meter Accuracy Classes (IEC 62053)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Class 0.2S:</strong> ±0.2% — Revenue metering, high-value loads</li>
              <li><strong>Class 0.5S:</strong> ±0.5% — Fiscal metering, check metering</li>
              <li><strong>Class 1:</strong> ±1.0% — Commercial sub-metering</li>
              <li><strong>Class 2:</strong> ±2.0% — Domestic, monitoring only</li>
            </ul>
            <p><strong>CT Installation Best Practice</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Orientation:</strong> Install CTs with correct polarity (P1/K marking towards supply)</li>
              <li><strong>Conductor position:</strong> Centre conductor in CT window for accuracy</li>
              <li><strong>Secondary wiring:</strong> Never open-circuit secondary when primary is energised</li>
              <li><strong>Cable size:</strong> Calculate secondary cable to limit voltage drop (typically &lt;1V)</li>
              <li><strong>Phase identification:</strong> Ensure CTs match meter phase inputs (L1-L1, L2-L2, L3-L3)</li>
            </ul>
            <p><strong>Multi-Function Meter Parameters</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Active energy (kWh import/export)</li>
              <li>Reactive energy (kVArh)</li>
              <li>Apparent energy (kVAh)</li>
              <li>Maximum demand (kW, kVA)</li>
              <li>Power factor (per phase, total)</li>
              <li>Voltage, current, frequency</li>
              <li>THD (Total Harmonic Distortion)</li>
            </ul>
            <p><strong>BMS Integration Points</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Real-time power monitoring</li>
              <li>Energy totalisation</li>
              <li>Demand limiting/load shedding</li>
              <li>Power factor correction control</li>
              <li>Alarm generation (thresholds)</li>
              <li>Trend logging and analysis</li>
              <li>Report generation</li>
            </ul>
            <p><strong>Commissioning requirement:</strong> Verify CT ratios are correctly programmed in meters - incorrect ratios are a common cause of metering errors.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Metering Hierarchy Design</strong>
            </p>
            <p><strong>Scenario:</strong> Design metering hierarchy for a 6-storey office building with ground floor retail and basement car park.</p>
            <p>Level 1 - Fiscal Meters:</p>
            <p>M1: Main building intake (1000A CT meter)</p>
            <p>Level 2 - Sub-Main Meters:</p>
            <p>M2.1: Landlord common areas</p>
            <p>M2.2: Retail tenant supply</p>
            <p>M2.3: Office floors (Levels 1-6)</p>
            <p>M2.4: Central plant (basement)</p>
            <p>M2.5: Car park</p>
            <p>Level 3 - Floor/Tenant Meters:</p>
            <p>M3.1-M3.6: Individual floor tenant meters</p>
            <p>M3.7: Retail lighting</p>
            <p>M3.8: Retail power</p>
            <p>Level 4 - Equipment Meters:</p>
            <p>M4.1: Chiller 1</p>
            <p>M4.2: Chiller 2</p>
            <p>M4.3: Lifts</p>
            <p>M4.4: AHU-1</p>
            <p>Coverage check: Sum of L2 meters should equal L1 ±5%</p>
            <p>
              <strong>Example 2: CT Selection Calculation</strong>
            </p>
            <p><strong>Scenario:</strong> Select CTs for a 630A submain feeding a distribution board 25m from the meter location.</p>
            <p>Given:</p>
            <p>Circuit design current: 630A</p>
            <p>Cable run to meter: 25m</p>
            <p>Meter burden: 3VA per phase</p>
            <p>Required accuracy: Class 1.0</p>
            <p>CT Primary Selection:</p>
            <p>Minimum CT rating: 630A × 1.25 = 787.5A</p>
            <p>Select standard size: <span>800/5 CT</span></p>
            <p>Secondary Cable Calculation (2.5mm² twin):</p>
            <p>Resistance: 7.41 mΩ/m × 25m × 2 = 0.37Ω</p>
            <p>Power loss at 5A: I²R = 25 × 0.37 = 9.25W =  <span>9.25VA</span></p>
            <p>Total Burden Required:</p>
            <p>Meter: 3VA</p>
            <p>Cables: 9.25VA</p>
            <p>Total: 12.25VA</p>
            <p>Select CT burden: <span>15VA Class 1.0</span></p>
            <p>Specification: 800/5, 15VA, Class 1.0 ring-type CT × 3</p>
            <p>
              <strong>Example 3: AMR System Specification</strong>
            </p>
            <p><strong>Scenario:</strong> Specify AMR system for 20 sub-meters with BMS integration.</p>
            <p>System Requirements:</p>
            <p>• 20 × energy meters (various ratings)</p>
            <p>• 15-minute logging interval</p>
            <p>• BMS integration via Modbus TCP</p>
            <p>• Maximum cable run: 150m</p>
            <p>Communication Architecture:</p>
            <p>Meters → Modbus RTU (RS485) → Data Gateway → Modbus TCP → BMS</p>
            <p>Specification:</p>
            <p>• Meters: Multi-function with Modbus RTU interface</p>
            <p>• Bus: RS485, daisy-chain topology, 9600 baud</p>
            <p>• Gateway: 32-device capacity, internal data logger</p>
            <p>• Storage: Minimum 90 days at 15-min intervals</p>
            <p>• Integration: Modbus TCP/IP to BMS IP network</p>
            <p>Data points per meter (typical):</p>
            <p>• kWh import, kWh export, kVArh</p>
            <p>• kW demand, kVA demand</p>
            <p>• Power factor (3-phase average)</p>
            <p>• V, A per phase (instantaneous)</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Metering Design Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Define energy management objectives and reporting requirements</li>
              <li>Identify all major loads and tenant/zone boundaries</li>
              <li>Design hierarchy to capture ≥90% of total consumption</li>
              <li>Select meter accuracy class appropriate to application</li>
              <li>Size CTs for expected maximum load plus growth allowance</li>
              <li>Specify communication protocol compatible with BMS/monitoring system</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Sub-metering coverage target: <strong>≥90%</strong> (CIBSE TM39)</li>
              <li>CT sizing: <strong>125%</strong> of design current</li>
              <li>Standard secondary current: <strong>5A</strong></li>
              <li>Class 1 accuracy: <strong>±1.0%</strong></li>
              <li>Standard pulse output: <strong>1 pulse/kWh</strong></li>
              <li>15-minute logging: <strong>96 readings/day</strong></li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Undersized CTs:</strong> Circuit upgrades exceed CT rating, requiring replacement</li>
                <li><strong>Wrong CT ratio in meter:</strong> Readings incorrect by factor of CT ratio error</li>
                <li><strong>Phase mismatch:</strong> CTs and voltage references on different phases</li>
                <li><strong>Insufficient sub-metering:</strong> Cannot identify consumption patterns or apportion costs</li>
                <li><strong>No reconciliation:</strong> Sub-meter totals not verified against main meter</li>
              </ul>
            }
            doInstead="Cross-check assumptions against published guidance, validate measured values against design intent, and engage the wider team early when interface issues emerge."
          />

          <SectionRule />

          <Scenario
            title="Tenant billing dispute exposes incomplete sub-metering"
            situation={
              <>
                A multi-tenanted office building bills electricity by floor based on a single sub-meter per floor. A tenant on the second floor disputes a £45k annual bill, claiming their actual occupancy is 30% lower than the previous tenant. There is no sub-metering by tenancy within the floor — billing is allocated by lettable area.
              </>
            }
            whatToDo={
              <>
                Three-stage response: (1) immediately install temporary sub-metering at the tenant's distribution boards to measure actual consumption — this resolves the dispute; (2) plan permanent retrofit of tenant-level sub-metering, ideally with auto-billing software (e.g. NES, Coherent Research); (3) update the lease for new tenants to require tenant-level sub-metering and pay-as-used billing rather than apportioned. Long-term, this is also a Heat Network (Metering and Billing) Regulations 2014 issue if heat is included — separate metering may be a legal requirement, not a commercial choice.
              </>
            }
            whyItMatters={
              <>
                Sub-metering pays for itself the moment a tenant challenges a bill — and it pays again every time the FM team can identify a high-consumption tenant or end-use. Underspecification at design stage forces disruptive retrofit. The metering strategy is more important than most M&E equipment choices because it determines what you can manage in operation.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Hierarchy: main meter → fuel sub-meters → end-use sub-meters → equipment-level meters.",
              "Part L 2021: separate metering for end-uses >250 m² floor area or >10% of total demand.",
              "CIBSE TM39 is the UK metering strategy reference.",
              "30-minute or finer interval data essential for monitoring & targeting.",
              "Class 1 accuracy for revenue billing; Class 2 acceptable for sub-billing.",
              "AMR + BMS integration for automated data collection.",
              "Heat Network (Metering and Billing) Regulations 2014: per-customer metering on heat networks.",
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section5-1")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Energy auditing
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section5-3")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Monitoring and targeting
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule6Section5_2;
