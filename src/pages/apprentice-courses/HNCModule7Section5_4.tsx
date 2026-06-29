/**
 * Module 7 · Section 5 · Subsection 4 — Energy Metering
 * HNC Electrical Engineering for Building Services (Power and Lighting Systems)
 *   Meter types, accuracy classes, CT connections, data communications, and sub-metering strategies
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

const TITLE = 'Energy Metering - HNC Module 7 Section 5.4';
const DESCRIPTION =
  'Master energy metering systems for building services: meter types, accuracy classes per IEC 62053, CT connections, Modbus/BACnet communications, AMR systems, and sub-metering strategies per CIBSE TM39.';

const quickCheckQuestions = [
  {
    id: 'meter-accuracy-class',
    question: 'What accuracy class is required for billing meters under IEC 62053?',
    options: [
      'Class 2.0 or better',
      'Class 1.0 or better',
      'Class 0.5S or better',
      'Class 0.2S only',
    ],
    correctIndex: 1,
    explanation:
      'Billing meters typically require Class 1.0 accuracy or better under IEC 62053-21 for active energy measurement. Class 0.5S or Class 0.2S are used for higher accuracy requirements such as revenue-grade metering at utility interfaces.',
  },
  {
    id: 'ct-burden',
    question: 'What happens if a CT circuit is operated with an open secondary?',
    options: [
      'The secondary current rises to a dangerous level',
      'Dangerous high voltages develop across the secondary',
      'The CT simply reads zero with no further effect',
      'The primary circuit is automatically disconnected',
    ],
    correctIndex: 1,
    explanation:
      'Operating a CT with an open secondary is extremely dangerous. The CT attempts to maintain the magnetising current, resulting in very high voltages (potentially thousands of volts) developing across the open terminals, risking insulation breakdown and arcing.',
  },
  {
    id: 'modbus-protocol',
    question: 'In Modbus RTU communication, what is the maximum cable length for RS-485?',
    options: [
      '500 metres',
      '100 metres',
      '1,200 metres',
      '2,400 metres',
    ],
    correctIndex: 2,
    explanation:
      'RS-485, commonly used for Modbus RTU, supports cable lengths up to 1,200 metres (4,000 feet) at standard baud rates. However, at higher baud rates the practical distance reduces. For longer distances, repeaters or fibre-optic converters are required.',
  },
  {
    id: 'sub-metering-strategy',
    question:
      'According to CIBSE TM39, what percentage of total building energy should be sub-metered?',
    options: [
      'At least 50%',
      'At least 70%',
      '100% mandatory',
      'At least 90%',
    ],
    correctIndex: 3,
    explanation:
      'CIBSE TM39 recommends that sub-metering should capture at least 90% of the anticipated energy consumption to enable effective monitoring and targeting. This typically requires metering of all major loads and end-uses.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which meter type provides measurement of active power, reactive power, power factor, and harmonics in a single device?',
    options: [
      'Basic kWh meter',
      'Multi-function power meter',
      'Maximum demand indicator',
      'Power factor correction meter',
    ],
    correctAnswer: 1,
    explanation:
      'Multi-function power meters (MFMs) provide comprehensive measurement including active/reactive power, voltage, current, power factor, frequency, harmonics (THD), and energy in both directions, making them ideal for detailed energy analysis.',
  },
  {
    id: 2,
    question:
      'Under IEC 62053-21, what is the accuracy class designation for active energy meters with 1% error at rated current?',
    options: [
      'Class 2.0',
      'Class 0.5',
      'Class 1.0',
      'Class 0.2',
    ],
    correctAnswer: 2,
    explanation:
      'Class 1.0 indicates the meter has a maximum permissible error of ±1% at rated current (In) and rated voltage. The class number directly corresponds to the percentage error limit at reference conditions.',
  },
  {
    id: 3,
    question:
      'When installing CTs for energy metering, the primary current rating should be selected such that normal operating current is approximately:',
    options: [
      '100% of CT rating',
      '25% of CT rating',
      '120% of CT rating',
      '50-60% of CT rating',
    ],
    correctAnswer: 3,
    explanation:
      'CTs should be selected so normal operating current is 50-60% of the rated primary current. This ensures good accuracy (CTs are most accurate around 50-120% of rating) whilst allowing headroom for load growth and peak demands.',
  },
  {
    id: 4,
    question: 'What is the standard secondary current output for measurement CTs in the UK?',
    options: [
      'Both 1A and 5A are standard',
      'Only 5A is used in the UK',
      'Only 1A is used in the UK',
      '100mA is the standard secondary output',
    ],
    correctAnswer: 0,
    explanation:
      'Both 1A and 5A secondary outputs are standard for measurement CTs. 1A secondaries are preferred for longer cable runs as they reduce VA burden and voltage drop. 5A is more common in legacy installations and where meters are close to CTs.',
  },
  {
    id: 5,
    question: 'In a Modbus RTU network, what determines the end of a message frame?',
    options: [
      'A specific end-of-frame character',
      'A silence period of 3.5 character times',
      'A fixed message length',
      'A CRC checksum verification',
    ],
    correctAnswer: 1,
    explanation:
      'Modbus RTU uses timing to determine frame boundaries. A silence of 3.5 character times (approximately 4ms at 9600 baud) indicates the end of a frame. This timing-based approach requires continuous communication without gaps within a message.',
  },
  {
    id: 6,
    question: 'BACnet MS/TP communication operates over which physical layer?',
    options: [
      'RS-232',
      'Ethernet',
      'RS-485',
      'Fibre optic',
    ],
    correctAnswer: 2,
    explanation:
      'BACnet MS/TP (Master-Slave/Token-Passing) operates over RS-485. It uses a token-passing protocol where devices take turns to communicate, supporting up to 127 devices on a single network segment with cable lengths up to 1,200m.',
  },
  {
    id: 7,
    question: 'An AMR (Automatic Meter Reading) system typically transmits data using:',
    options: [
      'Manual readings taken by a meter reader',
      'A direct serial cable to each individual meter',
      'Pulse outputs read only at the billing meter',
      'Fixed communication networks (wired or wireless)',
    ],
    correctAnswer: 3,
    explanation:
      'AMR systems use fixed communication networks to automatically collect meter data. These include wired solutions (power line carrier, dedicated cables) and wireless technologies (radio frequency, cellular, WiFi) to transmit readings to central systems.',
  },
  {
    id: 8,
    question:
      'According to CIBSE TM39, which loads should have dedicated sub-meters in a commercial building?',
    options: [
      'Tenants, HVAC, lighting, small power, and specialist loads',
      'Only the main incoming supply at the origin',
      'Socket-outlet circuits in occupied areas only',
      'Lighting circuits above 1kW connected load only',
    ],
    correctAnswer: 0,
    explanation:
      'CIBSE TM39 recommends sub-metering tenant areas, HVAC (heating, cooling, ventilation), lighting, small power, lifts, and specialist loads (data centres, kitchens). This enables accurate allocation of energy use and identification of waste.',
  },
  {
    id: 9,
    question: 'What CT accuracy class is typically required for revenue metering applications?',
    options: [
      'Class 3',
      'Class 0.5 or Class 0.2S',
      'Class 1',
      'Class 5',
    ],
    correctAnswer: 1,
    explanation:
      'Revenue metering at utility interfaces typically requires CT accuracy of Class 0.5 or better (often Class 0.2S for high-value metering points). This minimises measurement errors that would affect billing accuracy over large energy volumes.',
  },
  {
    id: 10,
    question: 'The VA burden of a CT refers to:',
    options: [
      'The maximum voltage the CT can withstand',
      'The short-circuit rating of the CT',
      'The load capacity of the secondary circuit',
      'The power rating of the primary conductor',
    ],
    correctAnswer: 2,
    explanation:
      'VA burden is the maximum apparent power (in volt-amperes) that can be connected to the CT secondary whilst maintaining stated accuracy. It includes meter burden, cable losses, and connection resistances. Exceeding the rated burden causes measurement errors.',
  },
  {
    id: 11,
    question:
      'In a 3-phase, 4-wire system, how many CTs are required for accurate energy metering?',
    options: [
      'One CT',
      'Two CTs',
      'Four CTs',
      'Three CTs',
    ],
    correctAnswer: 3,
    explanation:
      'A 3-phase, 4-wire system requires three CTs (one per phase) to measure all line currents accurately. In a balanced 3-phase, 3-wire system, two CTs can be used (Aron connection), but 4-wire systems with neutral loads need all three phases metered.',
  },
  {
    id: 12,
    question: 'What is the primary advantage of pulse output metering over Modbus communication?',
    options: [
      'Simplicity and universal compatibility',
      'It reports real-time power and power quality data',
      'It supports the longest cable runs of any method',
      'It allows two-way communication with the meter',
    ],
    correctAnswer: 0,
    explanation:
      'Pulse output metering is simple and universally compatible with BMS and energy management systems. Each pulse represents a fixed energy increment (e.g., 1 pulse = 0.1 kWh). However, it only provides cumulative energy data, not instantaneous power or power quality parameters.',
  },
];

const faqs = [
  {
    question: 'What is the difference between Class 0.5S and Class 0.5 accuracy for CTs?',
    answer:
      "The 'S' designation indicates a 'Special' accuracy class with tighter error limits at low currents. Class 0.5S maintains ±0.5% accuracy from 1% to 120% of rated current, whereas Class 0.5 only guarantees this accuracy from 5% to 120%. Class 0.5S is essential for loads with high variation or where accurate measurement at low loads is critical for billing or monitoring purposes.",
  },
  {
    question: 'How do I calculate the correct CT ratio for a metering installation?',
    answer:
      'Select a CT primary rating slightly above the maximum expected current, ensuring normal load is 50-60% of this value. For a 250A circuit, a 300/5A or 400/5A CT would be appropriate depending on expected load profile. Always verify the CT burden rating exceeds the total connected burden (meter + cables + connections). For accuracy, use CTs rated to the same or higher accuracy class as the meter.',
  },
  {
    question: 'When should I use Modbus TCP/IP instead of Modbus RTU?',
    answer:
      'Use Modbus TCP/IP when meters connect to Ethernet networks, for longer distances (beyond 1,200m RS-485 limit), when faster polling is required, or when integrating with IT systems. Modbus RTU is preferred for simpler installations, where RS-485 infrastructure exists, or when cost is critical. TCP/IP offers easier network management but requires switches and proper IP addressing.',
  },
  {
    question: 'What sub-metering strategy does CIBSE TM39 recommend for multi-tenant buildings?',
    answer:
      'CIBSE TM39 recommends metering each tenant space separately, plus common areas, landlord services, and shared plant. Each tenant should have sub-meters for electricity (and gas if applicable). Shared services like HVAC should be metered centrally with consumption allocated by floor area, operating hours, or dedicated sub-metering. The goal is transparent, verifiable allocation of energy costs.',
  },
  {
    question: 'How do I verify CT polarity and phase sequence during commissioning?',
    answer:
      "CT polarity is verified by checking that the P1 (primary) terminal faces the supply and the S1 (secondary) terminal connects to the meter's current input terminal (often marked with a dot or 'k'). Phase sequence is verified using a phase rotation meter or by checking that meter readings show positive power flow under normal load conditions. Reversed CTs or incorrect phase connections cause negative readings or power factor errors.",
  },
  {
    question: 'What data retention periods are required for metered energy data?',
    answer:
      'UK regulations and best practice recommend retaining half-hourly metered data for at least 2 years for comparison and analysis. Building regulations and BREEAM may require 5+ years for compliance demonstration. For billing disputes, 6 years is advisable (UK limitation period). CIBSE TM39 recommends archiving at least 3 years of data for effective monitoring and targeting programmes.',
  },
];

const HNCModule7Section5_4 = () => {
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
            eyebrow="Module 7 · Section 5 · Subsection 4"
            title="Energy Metering"
            description="Meter types, accuracy classes, CT connections, data communications, and sub-metering strategies"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Specify appropriate meter types for different applications",
              "Apply IEC 62053 accuracy class requirements",
              "Design CT installations with correct burden calculations",
              "Configure Modbus RTU and BACnet communications",
              "Implement AMR systems for automatic data collection",
              "Develop sub-metering strategies per CIBSE TM39 guidance",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Meter Types and Applications">
            <p>Energy meters range from basic kWh accumulators to sophisticated multi-function power analysers. Selecting the appropriate meter type depends on the application requirements, accuracy needs, and integration with building management systems.</p>
            <p><strong>Common meter types:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Basic kWh meters:</strong> Cumulative energy measurement only, pulse output</li>
              <li><strong>Multi-function meters (MFM):</strong> V, I, kW, kVA, kVAr, PF, Hz, THD, kWh</li>
              <li><strong>Maximum demand indicators:</strong> Record peak demand for tariff management</li>
              <li><strong>Power quality analysers:</strong> Harmonics, flicker, sags, swells, transients</li>
            </ul>
            <p><strong>Meter Selection by Application</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Fiscal/billing:</strong> MID-approved kWh — Class 1.0, sealed, tamper-evident</li>
              <li><strong>Tenant sub-metering:</strong> Multi-function with comms — kWh, Modbus/pulse, DIN rail</li>
              <li><strong>Plant monitoring:</strong> Multi-function meter — Real-time V, I, kW, PF, harmonics</li>
              <li><strong>Maximum demand tariff:</strong> MD indicator/recorder — Half-hourly data, peak recording</li>
              <li><strong>Power quality analysis:</strong> Power quality analyser — EN 50160 compliance, waveform capture</li>
            </ul>
            <p><strong>Design principle:</strong> Over-specify rather than under-specify meter capability - the cost difference is small compared to retrofit costs if additional parameters are needed later.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Accuracy Classes and IEC 62053">
            <p>Meter accuracy is governed by IEC 62053 standards, which define accuracy classes based on maximum permissible percentage errors at different load and power factor conditions. Proper accuracy specification ensures reliable energy data for billing and monitoring applications.</p>
            <p><strong>IEC 62053-21</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Active energy (kWh)</li>
              <li>Classes 0.5, 1, 2</li>
              <li>Static meters</li>
              <li>Direct or CT connected</li>
            </ul>
            <p><strong>IEC 62053-22</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Active energy (kWh)</li>
              <li>Classes 0.2S, 0.5S</li>
              <li>Revenue metering</li>
              <li>Wide dynamic range</li>
            </ul>
            <p><strong>IEC 62053-23</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Reactive energy (kVArh)</li>
              <li>Classes 2, 3</li>
              <li>Power factor penalty</li>
              <li>Often combined with active</li>
            </ul>
            <p><strong>Accuracy Class Error Limits (IEC 62053-21)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Class 0.5:</strong> ±0.5% — ±1.0% — High-value sub-metering</li>
              <li><strong>Class 1.0:</strong> ±1.0% — ±1.5% — Commercial billing</li>
              <li><strong>Class 2.0:</strong> ±2.0% — ±2.5% — Monitoring only</li>
              <li><strong>Class 0.2S:</strong> ±0.2% — ±0.4% — Revenue/fiscal metering</li>
            </ul>
            <p><strong>MID (Measuring Instruments Directive)</strong></p>
            <p>For billing applications in the UK and EU, meters must be MID-approved (2014/32/EU). MID requires Class B accuracy (equivalent to IEC Class 1.0) minimum for active energy meters used in direct transactions. MID approval includes factory calibration, sealing, and traceable certification.</p>
            <p><strong>Best practice:</strong> Specify Class 1.0 or better for all billing and cost allocation applications. The marginal cost of higher accuracy is minimal compared to potential billing disputes.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="CT Connections and Installation">
            <p>Current transformers (CTs) are essential for metering circuits carrying more than 100A direct connection capacity. Correct CT selection, installation, and wiring are critical for measurement accuracy and safety.</p>
            <p><strong>Critical Safety Warning</strong></p>
            <p><strong>Never open-circuit an energised CT secondary.</strong> This creates dangerous voltages (potentially thousands of volts) that can cause arcing, insulation failure, and serious injury. Always short-circuit CT secondaries before disconnecting meters, and use CT terminal blocks with shorting links for safe isolation.</p>
            <p><strong>CT Selection Criteria</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Primary current:</strong> Select so normal load is 50-60% of rating</li>
              <li><strong>Secondary current:</strong> 1A for long runs (&gt;15m), 5A for short distances</li>
              <li><strong>Accuracy class:</strong> Match or exceed meter accuracy requirement</li>
              <li><strong>VA burden:</strong> Must exceed total connected burden</li>
              <li><strong>Window size:</strong> Must accommodate conductor or busbar</li>
            </ul>
            <p><strong>CT Burden Calculation</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Meter current input:</strong> 0.1 - 0.5 VA — Modern electronic meters</li>
              <li><strong>Cable (2.5mm², 10m):</strong> 0.7 VA (5A sec) — 0.03 VA for 1A secondary</li>
              <li><strong>Connections:</strong> 0.1 - 0.2 VA — Terminal blocks, crimps</li>
              <li><strong>Total typical:</strong> 1 - 2 VA — CT should be rated &gt;2.5 VA</li>
            </ul>
            <p><strong>CT Wiring Principles</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>P1 (primary) faces incoming supply; P2 faces load</li>
              <li>S1 (secondary) connects to meter current input terminal</li>
              <li>S2 returns to CT, often via common/star point for 3-phase</li>
              <li>Use colour-coded or numbered conductors for each phase</li>
              <li>Provide CT shorting links at terminal block for safe isolation</li>
              <li>Earth the CT secondary circuit at one point only (star point)</li>
            </ul>
            <p><strong>Installation tip:</strong> Label all CT cables clearly at both ends. Phase identification errors cause incorrect readings and are difficult to diagnose after installation is complete.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Data Communications and Sub-Metering Strategies">
            <p>Modern metering installations require robust data communications for integration with building management systems, energy management software, and automatic meter reading (AMR) infrastructure. CIBSE TM39 provides comprehensive guidance on sub-metering strategies.</p>
            <p><strong>Communication Protocols Comparison</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Modbus RTU:</strong> RS-485 — 1,200m — Local meter networks</li>
              <li><strong>Modbus TCP:</strong> Ethernet — 100m per segment — IT network integration</li>
              <li><strong>BACnet MS/TP:</strong> RS-485 — 1,200m — BMS integration</li>
              <li><strong>BACnet IP:</strong> Ethernet — Network dependent — Enterprise BMS</li>
              <li><strong>Pulse output:</strong> Volt-free contact — 500m typical — Simple BMS connection</li>
              <li><strong>M-Bus:</strong> 2-wire bus — 1,000m — Multi-utility metering</li>
            </ul>
            <p><strong>Modbus RTU Configuration</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Unique address (1-247) per device</li>
              <li>Standard: 9600 baud, 8N1</li>
              <li>RS-485 termination at both ends</li>
              <li>Maximum 32 devices per segment</li>
              <li>Daisy-chain topology required</li>
            </ul>
            <p><strong>AMR System Components</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Field devices (meters with comms)</li>
              <li>Data concentrators/gateways</li>
              <li>Communication networks (wired/wireless)</li>
              <li>Head-end software (data collection)</li>
              <li>Analysis and reporting platform</li>
            </ul>
            <p><strong>CIBSE TM39 Sub-Metering Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Coverage:</strong> Sub-meter at least 90% of anticipated consumption</li>
              <li><strong>End uses:</strong> Separate HVAC, lighting, small power, lifts, specialist loads</li>
              <li><strong>Tenants:</strong> Individual metering for each lettable area</li>
              <li><strong>Major plant:</strong> Meter chillers, boilers, AHUs, pumps individually</li>
              <li><strong>Verification:</strong> Sub-meter total should reconcile with fiscal meter (±5%)</li>
            </ul>
            <p><strong>Sub-Metering Hierarchy Example</strong></p>
            <p><strong>Level 1: Fiscal Meter</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Main incoming supply</li>
              <li>MID-approved, utility interface</li>
            </ul>
            <p><strong>Level 2: Distribution</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Main switchboard outgoings</li>
              <li>Landlord vs tenant split</li>
            </ul>
            <p><strong>Level 3: End Use</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>HVAC, lighting, small power</li>
              <li>Per floor or zone</li>
            </ul>
            <p><strong>Level 4: Equipment</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Individual chillers, AHUs</li>
              <li>Server room, kitchen loads</li>
            </ul>
            <p><strong>Data strategy:</strong> Collect half-hourly (or finer) interval data for detailed analysis. Daily totals are insufficient for effective monitoring and targeting programmes.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: CT Selection for Distribution Board</strong>
            </p>
            <p><strong>Scenario:</strong> Select CTs for metering a 400A TP+N distribution board with typical load of 280A.</p>
            <p>Given:</p>
            <p>Nominal load = 280A</p>
            <p>Maximum load = 400A (circuit rating)</p>
            <p>Meter location = 20m from board</p>
            <p>Meter accuracy = Class 1.0</p>
            <p>CT Selection:</p>
            <p>Primary: 400/1A (280A = 70% loading) or 500/1A (56% loading)</p>
            <p>Choose 400/1A for better accuracy at normal load</p>
            <p>Secondary: 1A preferred for 20m cable run</p>
            <p>Accuracy: Class 0.5 (exceeds meter requirement)</p>
            <p>Burden calculation:</p>
            <p>Meter burden: 0.2 VA</p>
            <p>Cable (2.5mm², 40m loop): 0.3 VA at 1A</p>
            <p>Connections: 0.1 VA</p>
            <p>Total: 0.6 VA</p>
            <p>Select: 400/1A, Class 0.5, 2.5VA burden rating</p>
            <p>
              <strong>Example 2: Modbus Network Design</strong>
            </p>
            <p><strong>Scenario:</strong> Design Modbus RTU network for 24 meters across a commercial building.</p>
            <p>Requirements:</p>
            <p>24 meters across 4 floors</p>
            <p>Maximum cable run: 800m</p>
            <p>Polling interval: 15 seconds per meter</p>
            <p>Network design:</p>
            <p>Physical layer: RS-485 (supports 1,200m)</p>
            <p>Topology: Single daisy-chain from BMS room</p>
            <p>Cable: CAT5 or dedicated RS-485 shielded pair</p>
            <p>Termination: 120Ω at first and last device</p>
            <p>Addressing:</p>
            <p>Ground floor: Addresses 1-6</p>
            <p>First floor: Addresses 11-16</p>
            <p>Second floor: Addresses 21-26</p>
            <p>Third floor: Addresses 31-36</p>
            <p>Polling calculation:</p>
            <p>24 meters × 15 sec = 360 seconds (6 min cycle)</p>
            <p>Acceptable for M&T but consider faster baud for real-time</p>
            <p>Configure: 9600 baud, 8N1, addresses spaced for expansion</p>
            <p>
              <strong>Example 3: Sub-Metering Strategy per CIBSE TM39</strong>
            </p>
            <p><strong>Scenario:</strong> Develop sub-metering schedule for a 10,000m² office building.</p>
            <p>Building profile:</p>
            <p>Fiscal supply: 800 kVA</p>
            <p>5 tenants + landlord areas</p>
            <p>Central HVAC (chillers, AHUs, pumps)</p>
            <p>Sub-metering schedule:</p>
            <p>Level 2 - Distribution (6 meters):</p>
            <p>M01: Tenant A supply</p>
            <p>M02: Tenant B supply</p>
            <p>M03: Tenant C supply</p>
            <p>M04: Tenant D supply</p>
            <p>M05: Tenant E supply</p>
            <p>M06: Landlord central plant</p>
            <p>Level 3 - End use (10 meters):</p>
            <p>M07: Chiller 1</p>
            <p>M08: Chiller 2</p>
            <p>M09: AHU supply (all AHUs)</p>
            <p>M10: Pumps and auxiliaries</p>
            <p>M11: Common area lighting</p>
            <p>M12: Lifts</p>
            <p>M13: Car park</p>
            <p>M14: Server room</p>
            <p>M15: Kitchen/catering</p>
            <p>M16: External lighting</p>
            <p>Coverage check:</p>
            <p>Sub-metered: 780 kVA (97.5% of supply)</p>
            <p>Meets CIBSE TM39 &gt;90% coverage requirement</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Metering Installation Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Verify CT ratio matches meter configuration</li>
              <li>Check CT polarity - P1 towards supply, S1 to meter input</li>
              <li>Confirm phase sequence and CT-to-voltage phase matching</li>
              <li>Install CT shorting links in terminal blocks</li>
              <li>Test communications before closing panels</li>
              <li>Record meter serial numbers and CT ratios</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>CT loading: <strong>50-60%</strong> at normal current</li>
              <li>Billing accuracy: <strong>Class 1.0</strong> minimum (IEC 62053-21)</li>
              <li>RS-485 maximum: <strong>1,200 metres</strong></li>
              <li>Sub-metering coverage: <strong>&gt;90%</strong> per CIBSE TM39</li>
              <li>CT secondary standard: <strong>1A or 5A</strong></li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Open-circuiting energised CTs</strong> - Dangerous high voltages result</li>
                <li><strong>Reversed CT polarity</strong> - Causes negative readings or power factor errors</li>
                <li><strong>Phase mismatch</strong> - Voltage phase must match CT phase</li>
                <li><strong>Exceeded CT burden</strong> - Causes measurement errors</li>
                <li><strong>No communications verification</strong> - Difficult to access after installation</li>
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
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section5-3")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Harmonic mitigation
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section5-5")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Demand management
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule7Section5_4;
