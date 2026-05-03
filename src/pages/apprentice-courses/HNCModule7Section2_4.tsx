/**
 * Module 7 · Section 2 · Subsection 4 — Standby Generator Systems
 * HNC Electrical Engineering for Building Services (Power and Lighting Systems)
 *   Generator sizing, fuel systems, starting sequences, AMF panels, and maintenance requirements for standby power installations
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

const TITLE = 'Standby Generator Systems - HNC Module 7 Section 2.4';
const DESCRIPTION =
  'Master standby generator systems for building services: generator sizing, fuel systems, starting sequences, automatic mains failure panels, load shedding, and maintenance requirements.';

const quickCheckQuestions = [
  {
    id: 'generator-sizing',
    question: 'When sizing a standby generator, what factor accounts for motor starting currents?',
    options: [
      'Power factor correction',
      'Voltage regulation',
      'Starting kVA allowance',
      'Fuel consumption rate',
    ],
    correctIndex: 2,
    explanation:
      'Starting kVA allowance must be included when sizing generators because motor starting currents can be 6-8 times the full load current. Without this allowance, voltage dip during motor starting could cause equipment malfunction or generator overload.',
  },
  {
    id: 'amf-panel',
    question: 'What is the primary function of an Automatic Mains Failure (AMF) panel?',
    options: [
      'To regulate generator output voltage',
      'To detect mains failure and automatically start the generator',
      'To synchronise multiple generators',
      'To measure fuel consumption',
    ],
    correctIndex: 1,
    explanation:
      'An AMF panel monitors mains supply and automatically starts the standby generator when mains power fails or falls outside acceptable parameters. It also manages the transfer of load and monitors generator operation.',
  },
  {
    id: 'fuel-storage',
    question:
      'For a diesel generator installation, what determines the minimum fuel storage requirement?',
    options: [
      'Generator physical size',
      'Required autonomy period plus safety margin',
      'Fuel supplier delivery schedule',
      'Building floor area',
    ],
    correctIndex: 1,
    explanation:
      'Fuel storage is determined by the required autonomy period (how long the generator must run without refuelling) plus a safety margin. Critical facilities may require 24-72 hours autonomy, calculated from fuel consumption rate multiplied by time.',
  },
  {
    id: 'maintenance-testing',
    question:
      'How often should standby generators undergo load testing according to best practice?',
    options: [
      'Annually only',
      'When installed and after major repairs',
      'Monthly with weekly no-load runs',
      'Only when mains failure occurs',
    ],
    correctIndex: 2,
    explanation:
      'Best practice requires weekly no-load test runs to ensure starting reliability, plus monthly load testing to prevent wet stacking (carbon buildup from prolonged light-load operation) and verify full load capability.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A building has a connected load of 400 kW with a power factor of 0.8. What is the minimum generator kVA rating required before applying any diversity or starting allowances?',
    options: ['320 kVA', '400 kVA', '500 kVA', '640 kVA'],
    correctAnswer: 2,
    explanation:
      'kVA = kW ÷ power factor = 400 ÷ 0.8 = 500 kVA. This is the base rating before considering starting currents, future growth, or altitude derating factors.',
  },
  {
    id: 2,
    question: "What is 'wet stacking' in diesel generators and how is it prevented?",
    options: [
      'Coolant overflow prevented by regular draining',
      'Fuel contamination prevented by filtration',
      'Carbon buildup from light loading prevented by regular load testing',
      'Battery acid spillage prevented by proper mounting',
    ],
    correctAnswer: 2,
    explanation:
      'Wet stacking occurs when diesel generators run at light loads for extended periods, causing unburnt fuel and carbon to accumulate in the exhaust system. It is prevented by regular load testing at 70-80% of rated capacity.',
  },
  {
    id: 3,
    question:
      'In an AMF panel, what is the typical mains failure detection time before initiating generator start?',
    options: ['Instantaneous (0 seconds)', '1-3 seconds', '10-15 seconds', '30-60 seconds'],
    correctAnswer: 1,
    explanation:
      'AMF panels typically have a 1-3 second delay before initiating generator start to filter out momentary voltage dips and avoid unnecessary starts. Critical loads may require shorter delays with UPS support.',
  },
  {
    id: 4,
    question: 'What is the purpose of load shedding in a standby generator system?',
    options: [
      'To reduce fuel consumption during normal operation',
      'To prevent generator overload by disconnecting non-essential loads',
      'To balance load between multiple generators',
      'To reduce noise levels during night operation',
    ],
    correctAnswer: 1,
    explanation:
      'Load shedding disconnects non-essential loads during generator operation to prevent overload and ensure essential loads receive power. Loads are prioritised and shed in sequence based on criticality.',
  },
  {
    id: 5,
    question:
      'For a hospital standby generator installation, what autonomy period is typically required?',
    options: ['4 hours', '8 hours', '24-72 hours', '168 hours (1 week)'],
    correctAnswer: 2,
    explanation:
      'Healthcare Technical Memoranda (HTM) typically require 24-72 hours fuel autonomy for hospital generators to maintain essential services during extended outages, though specific requirements depend on facility criticality.',
  },
  {
    id: 6,
    question: "What is the function of the 'cool down' period in a generator shutdown sequence?",
    options: [
      'To allow the building to switch back to mains gradually',
      'To allow the engine to cool before stopping to prevent damage',
      'To complete fuel line purging',
      'To reset the AMF panel',
    ],
    correctAnswer: 1,
    explanation:
      'The cool down period allows the engine to run at no load for 3-5 minutes, enabling gradual temperature reduction. Stopping a hot engine immediately can cause thermal shock and bearing damage.',
  },
  {
    id: 7,
    question: 'Which component in a diesel generator provides cranking power for engine starting?',
    options: [
      'The alternator',
      'The battery charger',
      'The starter motor and battery bank',
      'The fuel injection pump',
    ],
    correctAnswer: 2,
    explanation:
      'The starter motor, powered by a dedicated battery bank, provides the cranking power to start the diesel engine. The battery charger maintains battery condition during standby periods.',
  },
  {
    id: 8,
    question:
      'What derating factor should be applied to a generator installed at 1,000m above sea level?',
    options: [
      'No derating required',
      'Approximately 3-4% per 300m above 150m',
      '10% flat rate',
      '25% flat rate',
    ],
    correctAnswer: 1,
    explanation:
      'Generator output must be derated approximately 3-4% for every 300m above 150m altitude due to reduced air density affecting engine combustion and alternator cooling. At 1,000m, this equates to roughly 9-12% derating.',
  },
  {
    id: 9,
    question:
      'In a two-generator parallel system, what prevents reverse power flow when one generator fails?',
    options: ['The AMF panel', 'Reverse power relays', 'The governor', 'Load shedding contactors'],
    correctAnswer: 1,
    explanation:
      'Reverse power relays detect when a generator becomes a motor (consuming rather than producing power) and disconnect it from the busbar to prevent damage and protect the remaining generator from overload.',
  },
  {
    id: 10,
    question: 'What is the typical transfer time from mains failure to generator supplying load?',
    options: ['Under 1 second', '10-15 seconds', '30-60 seconds', '2-3 minutes'],
    correctAnswer: 1,
    explanation:
      'Typical total transfer time is 10-15 seconds comprising: mains failure detection (1-3s), engine cranking and start (5-8s), and load transfer (2-4s). Critical loads requiring faster transfer need UPS support.',
  },
  {
    id: 11,
    question: 'Gas generators compared to diesel generators typically offer:',
    options: [
      'Higher power density and lower emissions',
      'Lower emissions but slower starting times',
      'Better fuel storage and faster response',
      'Lower capital cost and higher maintenance',
    ],
    correctAnswer: 1,
    explanation:
      'Gas generators produce lower NOx and particulate emissions than diesel but have slower starting times (may require continuous pilot flame or preheating) and require mains gas supply or LPG storage.',
  },
  {
    id: 12,
    question:
      'What documentation must be maintained for a standby generator installation under BS 7671?',
    options: [
      'Only the original installation certificate',
      'Test records, maintenance logs, and periodic inspection reports',
      'Fuel delivery receipts only',
      'Manufacturer warranty documents',
    ],
    correctAnswer: 1,
    explanation:
      'Comprehensive documentation including installation certification, regular test records (weekly/monthly), maintenance logs, fuel quality records, and periodic inspection reports must be maintained to demonstrate compliance and ensure reliability.',
  },
];

const faqs = [
  {
    question: 'How do I calculate the correct generator size for a building?',
    answer:
      'Generator sizing follows a systematic process: (1) Calculate total connected load in kW, (2) Apply diversity factors based on load types, (3) Convert to kVA using power factor (typically 0.8), (4) Add starting kVA for largest motor (6-8× FLC), (5) Apply altitude and temperature derating if applicable, (6) Add 10-20% growth margin. Example: 300 kW load at 0.8 pf = 375 kVA, plus 50 kW motor starting allowance = 425 kVA minimum, rounded to 500 kVA standard size.',
  },
  {
    question: 'What is the difference between standby and prime rated generators?',
    answer:
      'Standby rated generators are designed for emergency use with limited annual running hours (typically under 200 hours) and can deliver 100% rated output during outages. Prime rated generators are designed for continuous operation as the primary power source, typically rated at 70-80% of standby rating for unlimited hours. Using a standby-rated generator for prime power will significantly reduce its lifespan.',
  },
  {
    question: 'How does an AMF panel sequence the generator start and load transfer?',
    answer:
      'The AMF sequence typically operates as: (1) Mains failure detected, timer starts (1-3s), (2) Mains confirmed failed, generator start signal sent, (3) Engine cranks and starts (5-8s), (4) Generator reaches rated voltage and frequency, (5) Generator ready signal confirmed, (6) Load transfer initiated via changeover contactor, (7) Essential loads energised. Return to mains follows similar sequence with cool-down period before generator stops.',
  },
  {
    question: 'What are the fuel storage regulations for diesel generators?',
    answer:
      'Diesel fuel storage must comply with the Control of Pollution (Oil Storage) (England) Regulations and building regulations. Key requirements include: secondary containment (bund) at 110% of tank capacity, separation from buildings and boundaries, fire-resistant construction for indoor installations, overfill protection, and regular fuel quality testing. Biofuel blends may require more frequent replacement due to degradation.',
  },
  {
    question: 'Why do hospitals require multiple generators rather than one large unit?',
    answer:
      'Hospitals use N+1 redundancy (multiple generators where N can handle full essential load) because: (1) Maintenance can occur without losing backup capability, (2) Single point of failure is eliminated, (3) Load can be distributed for efficiency, (4) Staged loading reduces voltage transients, (5) Critical care areas can have dedicated supply. Healthcare Technical Memoranda (HTM 06-01) specify redundancy requirements for different facility categories.',
  },
  {
    question: 'What causes generator hunting and how is it corrected?',
    answer:
      'Hunting (cyclic speed variation) is caused by governor instability, typically from incorrect gain settings, load fluctuations, or mechanical wear. Correction involves: adjusting governor sensitivity settings, checking for air in fuel lines, inspecting linkages for wear, ensuring stable load connection, and verifying compatible load characteristics. Isochronous governors are more prone to hunting than droop governors in parallel operation.',
  },
];

const HNCModule7Section2_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section2")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 7 · Section 2 · Subsection 4"
            title="Standby Generator Systems"
            description="Generator sizing, fuel systems, starting sequences, AMF panels, and maintenance requirements for standby power installations"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Calculate generator sizing including kVA rating, power factor, and starting allowances",
              "Compare diesel and gas generator characteristics for different applications",
              "Design fuel storage systems meeting regulatory requirements",
              "Explain AMF panel operation and starting sequences",
              "Implement load shedding strategies for generator systems",
              "Specify testing and maintenance regimes for reliable operation",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Generator Sizing and Selection">
            <p>Correct generator sizing is critical for reliable standby power. Undersized generators suffer from overloading and poor voltage regulation, whilst oversized units operate inefficiently and may experience wet stacking from prolonged light-load operation.</p>
            <p><strong>Generator Sizing Methodology</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Step 1:</strong> Calculate total connected load in kW from distribution board schedules</li>
              <li><strong>Step 2:</strong> Apply diversity factors (typically 0.7-0.9 for commercial buildings)</li>
              <li><strong>Step 3:</strong> Convert to kVA: kVA = kW ÷ power factor (typically 0.8)</li>
              <li><strong>Step 4:</strong> Add motor starting allowance (largest motor × 6-8 for DOL start)</li>
              <li><strong>Step 5:</strong> Apply derating factors for altitude and ambient temperature</li>
              <li><strong>Step 6:</strong> Add 10-20% growth margin and select next standard size</li>
            </ul>
            <p><strong>Key Sizing Parameters</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Power factor:</strong> 0.8 lagging — kVA = kW ÷ 0.8 (25% larger than kW)</li>
              <li><strong>Motor starting:</strong> 6-8× FLC (DOL) — Add starting kVA to running load</li>
              <li><strong>Altitude derating:</strong> 3-4% per 300m above 150m — Reduced air density affects combustion</li>
              <li><strong>Temperature derating:</strong> 2% per 5°C above 25°C — Higher ambient reduces cooling efficiency</li>
              <li><strong>Voltage regulation:</strong> ±2.5% steady state — Affects sensitive equipment operation</li>
            </ul>
            <p><strong>Sizing Calculation Example</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Connected load:</strong> 250 kW</li>
              <li><strong>Diversity factor:</strong> 0.8</li>
              <li><strong>Maximum demand:</strong> 250 × 0.8 = 200 kW</li>
              <li><strong>Power factor:</strong> 0.8</li>
              <li><strong>Base kVA:</strong> 200 ÷ 0.8 = 250 kVA</li>
              <li><strong>Largest motor:</strong> 30 kW (DOL start)</li>
              <li><strong>Starting kVA:</strong> 30 × 6 = 180 kVA additional</li>
              <li><strong>Total requirement:</strong> 250 + 90 = 340 kVA</li>
            </ul>
            <p><span> Selected generator: 400 kVA (next standard size with margin) </span></p>
            <p><strong>Design note:</strong> Always verify generator voltage dip during motor starting remains within 15% to prevent nuisance tripping of other equipment.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Fuel Systems and Generator Types">
            <p>The choice between diesel and gas generators depends on application requirements, emissions regulations, fuel availability, and starting speed requirements. Each fuel type has distinct characteristics affecting system design.</p>
            <p><strong>Diesel Generators</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Fast starting (8-10 seconds typical)</li>
              <li>High power density (compact size)</li>
              <li>Reliable cold starting</li>
              <li>On-site fuel storage required</li>
              <li>Higher NOx and particulate emissions</li>
              <li>Fuel degradation over time (2-3 years)</li>
            </ul>
            <p><strong>Gas Generators</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Lower emissions (reduced NOx)</li>
              <li>Slower starting (may need pilot flame)</li>
              <li>Mains gas supply required (or LPG)</li>
              <li>No fuel degradation concerns</li>
              <li>Lower power density than diesel</li>
              <li>Not suitable where gas supply uncertain</li>
            </ul>
            <p><strong>Diesel Fuel Storage Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Secondary containment:</strong> 110% of tank capacity minimum — Oil Storage Regulations 2001</li>
              <li><strong>Fire separation:</strong> 4-hour fire-rated enclosure indoor — Building Regulations Part B</li>
              <li><strong>Overfill protection:</strong> Automatic shut-off at 95% capacity — Oil Storage Regulations 2001</li>
              <li><strong>Fuel quality:</strong> Annual testing, polishing if required — BS 2869 (fuel specification)</li>
              <li><strong>Tank labelling:</strong> Contents, capacity, emergency contact — Oil Storage Regulations 2001</li>
            </ul>
            <p><strong>Fuel Storage Calculation</strong></p>
            <p><strong>Required autonomy:</strong> 48 hours (critical facility)</p>
            <p><strong>Generator rating:</strong> 500 kVA at 0.8 pf = 400 kW</p>
            <p><strong>Average load:</strong> 70% = 280 kW</p>
            <p><strong>Fuel consumption:</strong> 0.25 litres/kWh (typical diesel)</p>
            <p><strong>Hourly consumption:</strong> 280 × 0.25 = 70 litres/hour</p>
            <p><strong>48-hour requirement:</strong> 70 × 48 = 3,360 litres</p>
            <p><strong>With 20% margin:</strong> 3,360 × 1.2 = 4,032 litres</p>
            <p><strong>Specified tank:</strong> 5,000 litres (standard size)</p>
            <p><strong>Fuel management:</strong> DERV (diesel) containing biofuel blends (FAME) degrades faster - implement fuel polishing or replacement schedules.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="AMF Panels and Starting Sequences">
            <p>Automatic Mains Failure (AMF) panels are the intelligence centre of standby generator systems. They monitor mains supply, control generator starting, manage load transfer, and provide comprehensive system monitoring and protection.</p>
            <p><strong>AMF Panel Functions</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Mains monitoring:</strong> Voltage, frequency, phase sequence, and phase loss detection</li>
              <li><strong>Generator control:</strong> Start, stop, speed governing, and voltage regulation</li>
              <li><strong>Load transfer:</strong> Changeover contactor control with break-before-make operation</li>
              <li><strong>Protection:</strong> Overcurrent, reverse power, earth fault, and over/under voltage</li>
              <li><strong>Engine monitoring:</strong> Oil pressure, coolant temperature, battery voltage, fuel level</li>
              <li><strong>Remote monitoring:</strong> BMS interface, SMS/email alerts, remote start capability</li>
            </ul>
            <p><strong>Mains Failure Starting Sequence</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>T+0s:</strong> Mains failure detected (voltage &lt;80% or &gt;110%)</li>
              <li><strong>T+1-3s:</strong> Failure confirmed (filters transients)</li>
              <li><strong>T+3s:</strong> Generator start signal sent, glow plugs energise</li>
              <li><strong>T+5-10s:</strong> Engine cranking, starter motor engaged</li>
              <li><strong>T+8-12s:</strong> Engine running, voltage building</li>
              <li><strong>T+10-12s:</strong> Generator ready (voltage and frequency stable)</li>
              <li><strong>T+12-15s:</strong> Load transfer - changeover operates</li>
            </ul>
            <p><span>Total transfer time: 10-15 seconds typical</span></p>
            <p><strong>Changeover System Types</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Open transition:</strong> Break-before-make (momentary outage) — Most installations, simplest design</li>
              <li><strong>Closed transition:</strong> Make-before-break (no outage) — Sensitive loads, requires synchronisation</li>
              <li><strong>Soft loading:</strong> Gradual load transfer via synchronising — Large motors, reducing transients</li>
              <li><strong>Bypass isolation:</strong> Manual bypass for maintenance — All critical installations</li>
            </ul>
            <p><strong>Return to Mains Sequence</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Mains restored and stable for minimum 30 seconds (adjustable)</li>
              <li>Mains voltage and frequency within acceptable limits confirmed</li>
              <li>Load transfer back to mains (open or closed transition)</li>
              <li>Generator runs at no load for cool-down period (3-5 minutes)</li>
              <li>Generator stops, system returns to standby mode</li>
              <li>Battery charger maintains batteries for next start</li>
            </ul>
            <p><strong>Critical requirement:</strong> Mechanical and electrical interlocking must prevent paralleling of mains and generator unless designed for closed transition operation.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Load Management and Maintenance">
            <p>Effective load management ensures generator capacity serves essential loads during outages. Combined with rigorous maintenance schedules, this approach maximises system reliability when backup power is needed most.</p>
            <p><strong>Load Shedding Principles</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Load priority classification:</strong> Essential, important, and non-essential categories</li>
              <li><strong>Staged shedding:</strong> Progressive disconnection as load increases</li>
              <li><strong>Automatic operation:</strong> Frequency or power-based triggers</li>
              <li><strong>Manual override:</strong> Operator control for exceptional circumstances</li>
              <li><strong>Restoration sequence:</strong> Staged reconnection when capacity allows</li>
            </ul>
            <p><strong>Typical Load Priority Classification</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Priority 1 (Essential):</strong> Life safety, fire systems, emergency lighting — Never shed</li>
              <li><strong>Priority 2 (Critical):</strong> Security, BMS, IT infrastructure, lifts — Last resort only</li>
              <li><strong>Priority 3 (Important):</strong> Comfort cooling, general lighting — Shed second</li>
              <li><strong>Priority 4 (Non-essential):</strong> Catering, water heaters, EV charging — Shed first</li>
            </ul>
            <p><strong>Weekly Maintenance</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Visual inspection of generator and surroundings</li>
              <li>Check oil, coolant, and fuel levels</li>
              <li>Battery condition and electrolyte check</li>
              <li>No-load test run (15-30 minutes)</li>
              <li>Record all meter readings and alarms</li>
            </ul>
            <p><strong>Monthly Maintenance</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Load test (minimum 50% rated load, 1 hour)</li>
              <li>Transfer test (simulate mains failure)</li>
              <li>Check all protective device operation</li>
              <li>Inspect fuel system for leaks</li>
              <li>Verify remote monitoring operation</li>
            </ul>
            <p><strong>Annual/Periodic Maintenance</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Full load test (100%):</strong> Annual — Load bank or building load</li>
              <li><strong>Oil and filter change:</strong> 250-500 hours or annual — Per manufacturer specification</li>
              <li><strong>Coolant replacement:</strong> 2-3 years — Test annually for degradation</li>
              <li><strong>Fuel polishing/replacement:</strong> Annual test, replace if degraded — Critical for reliability</li>
              <li><strong>Battery replacement:</strong> 3-5 years — Load test before replacement due</li>
              <li><strong>Electrical inspection:</strong> Annual (BS 7671) — Include in building EICR</li>
            </ul>
            <p><strong>Documentation requirement:</strong> Maintain comprehensive logs of all tests, maintenance activities, and running hours for compliance and reliability analysis.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Hospital Generator Sizing</strong>
            </p>
            <p><strong>Scenario:</strong> Size a standby generator for a district hospital with essential load of 800 kW, including a 75 kW chiller motor (DOL start).</p>
            <p>Step 1: Base load calculation</p>
            <p>Essential load: 800 kW</p>
            <p>Power factor: 0.8</p>
            <p>Base kVA: 800 ÷ 0.8 = 1,000 kVA</p>
            <p>Step 2: Motor starting allowance</p>
            <p>Chiller motor: 75 kW at 0.85 pf = 88 kVA running</p>
            <p>Starting current: 6× FLC</p>
            <p>Starting kVA: 88 × 6 = 528 kVA</p>
            <p>Net additional (starting minus running): 528 - 88 = 440 kVA</p>
            <p>Step 3: Total requirement</p>
            <p>Peak kVA: 1,000 + 440 = 1,440 kVA</p>
            <p>With 15% margin: 1,440 × 1.15 = 1,656 kVA</p>
            <p>Specify: 2 × 1,000 kVA generators (N+1 redundancy per HTM 06-01)</p>
            <p>
              <strong>Example 2: AMF Panel Specification</strong>
            </p>
            <p><strong>Scenario:</strong> Specify AMF panel requirements for a data centre with 10-second maximum transfer time.</p>
            <p>AMF Panel Specification:</p>
            <p>Mains Monitoring:</p>
            <p>- Undervoltage: &lt;85% for &gt;0.5 seconds</p>
            <p>- Overvoltage: &gt;110% for &gt;0.5 seconds</p>
            <p>- Underfrequency: &lt;47.5 Hz</p>
            <p>- Phase loss/sequence detection</p>
            <p>Timing Sequence:</p>
            <p>- Mains fail detection: 0.5 seconds max</p>
            <p>- Engine start: 3 seconds (pre-heated)</p>
            <p>- Run up to speed: 4 seconds</p>
            <p>- Load transfer: 2 seconds</p>
            <p>- Total: 9.5 seconds (within 10s requirement)</p>
            <p>Additional Requirements:</p>
            <p>- Closed transition capability for return to mains</p>
            <p>- Modbus interface to BMS</p>
            <p>- Remote monitoring with SMS/email alerts</p>
            <p>
              <strong>Example 3: Load Shedding Scheme</strong>
            </p>
            <p><strong>Scenario:</strong> Design load shedding for 500 kVA generator serving 600 kW connected load.</p>
            <p>Generator capacity: 500 kVA × 0.8 pf = 400 kW</p>
            <p>Connected load: 600 kW (must shed 200 kW minimum)</p>
            <p>Load Shedding Schedule:</p>
            <p>Priority 1 - Never shed (250 kW):</p>
            <p>- Emergency lighting: 15 kW</p>
            <p>- Fire systems: 25 kW</p>
            <p>- Life safety equipment: 50 kW</p>
            <p>- Security systems: 20 kW</p>
            <p>- IT/Comms rooms: 140 kW</p>
            <p>Priority 2 - Shed at 95% load (100 kW):</p>
            <p>- General office lighting: 60 kW</p>
            <p>- Selected socket circuits: 40 kW</p>
            <p>Priority 3 - Shed at 85% load (150 kW):</p>
            <p>- Comfort cooling: 80 kW</p>
            <p>- Water heating: 30 kW</p>
            <p>- EV charging: 40 kW</p>
            <p>Essential load (250 kW) well within 400 kW capacity</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Generator Installation Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Adequate ventilation for combustion air and cooling (typically 10× engine displacement/minute)</li>
              <li>Exhaust routing with thermal insulation and rain protection</li>
              <li>Anti-vibration mounting to prevent structural transmission</li>
              <li>Acoustic treatment to meet planning/environmental requirements</li>
              <li>Fuel storage compliant with Oil Storage Regulations</li>
              <li>Adequate access for maintenance and component replacement</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Motor starting current: <strong>6-8× FLC</strong> (DOL start)</li>
              <li>Typical transfer time: <strong>10-15 seconds</strong></li>
              <li>Altitude derating: <strong>3-4% per 300m</strong> above 150m</li>
              <li>Diesel consumption: <strong>0.25 litres/kWh</strong> typical</li>
              <li>Cool-down period: <strong>3-5 minutes</strong> at no load</li>
              <li>Load test frequency: <strong>Monthly</strong> minimum</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Undersizing for motor starting:</strong> Always add starting kVA allowance</li>
                <li><strong>Neglecting fuel quality:</strong> Degraded fuel is the leading cause of start failures</li>
                <li><strong>Insufficient testing:</strong> Monthly load tests prevent wet stacking</li>
                <li><strong>Poor documentation:</strong> Maintain comprehensive maintenance records</li>
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
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section2-3")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Life safety power
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section2-5")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                UPS systems
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule7Section2_4;
