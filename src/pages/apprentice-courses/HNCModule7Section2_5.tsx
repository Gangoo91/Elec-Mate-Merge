/**
 * Module 7 · Section 2 · Subsection 5 — UPS Systems
 * HNC Electrical Engineering for Building Services (Power and Lighting Systems)
 *   UPS topologies, sizing calculations, battery technologies, bypass arrangements, and monitoring systems
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

const TITLE = 'UPS Systems - HNC Module 7 Section 2.5';
const DESCRIPTION =
  'Master UPS systems for building services: topologies (offline, line-interactive, online double conversion), sizing calculations, battery technologies (VRLA, lithium-ion), bypass arrangements, and monitoring systems.';

const quickCheckQuestions = [
  {
    id: 'ups-topology',
    question:
      'Which UPS topology provides the highest level of protection with zero transfer time?',
    options: [
      'Offline (standby) UPS',
      'Line-interactive UPS',
      'Online double conversion UPS',
      'Hybrid UPS',
    ],
    correctIndex: 2,
    explanation:
      'Online double conversion UPS provides continuous power conditioning with zero transfer time because the load is always powered from the inverter. The mains supply charges the batteries and powers the rectifier, but the load never experiences any break in supply during mains failure.',
  },
  {
    id: 'ups-sizing',
    question:
      'A server room has a 15 kW load at 0.9 power factor. What minimum UPS kVA rating is required?',
    options: ['13.5 kVA', '15 kVA', '16.7 kVA', '18 kVA'],
    correctIndex: 2,
    explanation:
      'kVA = kW ÷ Power Factor = 15 ÷ 0.9 = 16.67 kVA. The UPS must be rated for apparent power (kVA) not just real power (kW). A 20 kVA UPS would typically be selected to provide headroom for future expansion and avoid running at full capacity.',
  },
  {
    id: 'battery-technology',
    question: 'What is the typical design life of VRLA batteries in a UPS application?',
    options: ['3-5 years', '5-10 years', '10-15 years', '15-20 years'],
    correctIndex: 1,
    explanation:
      'VRLA (Valve Regulated Lead Acid) batteries typically have a design life of 5-10 years, depending on environmental conditions and maintenance. High ambient temperatures significantly reduce battery life - for every 10°C above 20°C, battery life is halved.',
  },
  {
    id: 'bypass-function',
    question: 'What is the primary purpose of a maintenance bypass switch in a UPS system?',
    options: [
      'To increase UPS efficiency',
      'To enable UPS servicing without disrupting the load',
      'To reduce battery charging time',
      'To provide additional power capacity',
    ],
    correctIndex: 1,
    explanation:
      'A maintenance bypass switch allows the UPS to be isolated for servicing, testing, or replacement while maintaining continuous power to the critical load through a direct mains connection. This is essential for high-availability installations.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'In an offline (standby) UPS, what happens during normal mains operation?',
    options: [
      'The load is powered directly from the inverter',
      'The load is powered directly from the mains with the inverter on standby',
      'The load is powered through a double conversion process',
      'The load alternates between mains and inverter',
    ],
    correctAnswer: 1,
    explanation:
      'In an offline UPS, the load receives power directly from the mains during normal operation. The inverter remains on standby, only activating when mains failure is detected. This results in a transfer time of 5-12ms.',
  },
  {
    id: 2,
    question: 'What is the typical transfer time of a line-interactive UPS?',
    options: ['0 ms (no transfer)', '2-4 ms', '5-12 ms', '15-25 ms'],
    correctAnswer: 1,
    explanation:
      'Line-interactive UPS systems have a typical transfer time of 2-4ms, faster than offline UPS (5-12ms) but not zero like online double conversion. The autotransformer provides voltage regulation without switching.',
  },
  {
    id: 3,
    question:
      'Calculate the autonomy time for a 10 kVA UPS with a 120 Ah battery bank at 192V DC and 80% discharge depth, powering an 8 kW load.',
    options: ['15 minutes', '23 minutes', '28 minutes', '35 minutes'],
    correctAnswer: 1,
    explanation:
      'Battery capacity = 192V × 120Ah = 23,040 Wh. Usable capacity at 80% DOD = 18,432 Wh. Autonomy = 18,432 ÷ 8,000W = 2.3 hours = 138 minutes. However, accounting for inverter efficiency (~90%), actual autonomy ≈ 23 minutes. Real-world calculation requires battery discharge curves.',
  },
  {
    id: 4,
    question: 'What advantage does lithium-ion technology offer over VRLA in UPS applications?',
    options: [
      'Lower initial cost',
      'Higher energy density and longer cycle life',
      'No monitoring required',
      'Compatible with all existing UPS systems',
    ],
    correctAnswer: 1,
    explanation:
      'Lithium-ion batteries offer 2-3 times higher energy density, 10+ year lifespan, faster recharge times, and better performance at higher temperatures compared to VRLA. However, they require sophisticated BMS and have higher initial costs.',
  },
  {
    id: 5,
    question: 'Which component in an online double conversion UPS converts AC mains to DC?',
    options: ['Inverter', 'Rectifier/charger', 'Static bypass switch', 'Output transformer'],
    correctAnswer: 1,
    explanation:
      'The rectifier/charger converts incoming AC mains to DC, which charges the batteries and feeds the inverter. This dual function ensures batteries remain charged while providing continuous DC supply for double conversion.',
  },
  {
    id: 6,
    question: 'What is the purpose of an automatic static bypass in a UPS?',
    options: [
      'To improve efficiency during light loads',
      'To transfer load to mains if UPS fails or is overloaded',
      'To reduce harmonic distortion',
      'To provide isolation for battery maintenance',
    ],
    correctAnswer: 1,
    explanation:
      'The automatic static bypass uses semiconductor switches to transfer the load to raw mains supply within microseconds if the UPS experiences a fault, overload, or inverter failure. This protects the load from complete power loss.',
  },
  {
    id: 7,
    question:
      'For a critical data centre application, which UPS configuration provides the highest availability?',
    options: [
      'Single UPS with bypass',
      'Parallel redundant (N+1)',
      '2N configuration',
      'Distributed redundant',
    ],
    correctAnswer: 2,
    explanation:
      '2N configuration uses two independent UPS systems, each capable of supporting the full load, with automatic transfer between them. This provides the highest availability as either system can fail completely without affecting the load.',
  },
  {
    id: 8,
    question: "What does 'True Online' UPS topology mean?",
    options: [
      'Internet-connected monitoring capability',
      'Continuous double conversion with zero transfer time',
      'Real-time cloud backup',
      'Online ordering for replacement parts',
    ],
    correctAnswer: 1,
    explanation:
      "True Online refers to double conversion topology where the load continuously receives power from the inverter. The term distinguishes it from line-interactive systems sometimes marketed as 'online' but which have transfer times.",
  },
  {
    id: 9,
    question:
      'What is the recommended ambient temperature range for VRLA batteries to achieve rated design life?',
    options: ['10-15°C', '15-20°C', '20-25°C', '25-30°C'],
    correctAnswer: 2,
    explanation:
      'VRLA batteries are rated for design life at 20-25°C. For every 10°C increase above 25°C, battery life is approximately halved. Data centre battery rooms typically maintain 20-22°C for optimal battery longevity.',
  },
  {
    id: 10,
    question:
      'What function does a Battery Management System (BMS) perform in a lithium-ion UPS installation?',
    options: [
      'Only monitors state of charge',
      'Controls charging, monitors cell balance, temperature, and provides protection',
      'Replaces the need for a rectifier',
      'Eliminates the requirement for cooling',
    ],
    correctAnswer: 1,
    explanation:
      'The BMS is essential for lithium-ion batteries, controlling charge/discharge rates, monitoring individual cell voltages and temperatures, balancing cells, and providing protection against overcharge, overdischarge, and thermal runaway.',
  },
  {
    id: 11,
    question: "A UPS specification states 'Input power factor: 0.99'. What does this indicate?",
    options: [
      'The UPS output power factor',
      'Unity power factor input drawing minimal reactive current',
      'The maximum load power factor supported',
      'Battery charging efficiency',
    ],
    correctAnswer: 1,
    explanation:
      'Input power factor of 0.99 indicates the UPS draws current almost in phase with voltage, minimising reactive power demand and harmonic distortion on the mains supply. Modern UPS use active PFC (Power Factor Correction) to achieve this.',
  },
  {
    id: 12,
    question: 'What is ECO mode operation in a modern UPS?',
    options: [
      'Environmentally friendly battery chemistry',
      'Reduced output voltage for energy saving',
      'Bypass mode with monitoring for improved efficiency',
      'Lower charging current for battery preservation',
    ],
    correctAnswer: 2,
    explanation:
      'ECO mode bypasses double conversion during normal operation, routing power through the static bypass for 97-99% efficiency instead of 90-94%. The UPS monitors mains quality and transfers to inverter if problems are detected.',
  },
];

const faqs = [
  {
    question: 'How do I determine the required UPS capacity for a server room?',
    answer:
      'Calculate total IT load (kW) from equipment nameplates or power monitoring, add 25-30% growth headroom, then convert to kVA using power factor (typically 0.9 for modern IT). For example: 20 kW load × 1.3 (headroom) ÷ 0.9 PF = 29 kVA minimum. Select standard size (30-40 kVA) and verify autonomy requirements can be met with the battery configuration offered.',
  },
  {
    question: 'What is the difference between standby and online UPS for critical applications?',
    answer:
      'Standby (offline) UPS has 5-12ms transfer time and provides basic protection suitable for PCs. Online double conversion has zero transfer time and continuously conditions power, essential for sensitive equipment. For servers, networking, and medical equipment, online UPS is mandatory. Line-interactive (2-4ms transfer) offers a middle ground for less critical IT loads.',
  },
  {
    question: 'How often should UPS batteries be tested and replaced?',
    answer:
      'Perform impedance testing annually and full discharge tests every 2-3 years. VRLA batteries typically require replacement at 4-5 years (50-60% of design life) to maintain reliability. Monitor float voltage, temperature, and impedance trends. Replace entire battery strings rather than individual cells. Lithium-ion systems require BMS monitoring but typically last 10-15 years.',
  },
  {
    question: 'Can I add batteries to increase UPS autonomy after installation?',
    answer:
      'Yes, most UPS systems support extended battery cabinets. Ensure the charger can handle the additional capacity (may need uprating), verify floor loading, and match battery type and age. Never mix old and new batteries in the same string. Extended autonomy also requires reviewing ventilation for hydrogen dissipation with VRLA batteries.',
  },
  {
    question: 'What causes UPS batteries to fail prematurely?',
    answer:
      'Common causes include: high ambient temperature (biggest factor - halves life per 10°C above 25°C), incorrect float voltage, deep discharge events, lack of regular testing, AC ripple on DC bus, and manufacturing defects. Proper environmental control and monitoring are essential for achieving design life.',
  },
  {
    question: 'How do parallel UPS systems share load?',
    answer:
      'Modern parallel UPS systems use digital control to balance load within 2-3% across units. Each UPS has a parallel card that communicates via fibre or copper to synchronise output voltage phase and amplitude. N+1 configurations allow one unit to fail while maintaining full load. Load sharing algorithms prevent circulating currents between units.',
  },
];

const HNCModule7Section2_5 = () => {
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
            eyebrow="Module 7 · Section 2 · Subsection 5"
            title="UPS Systems"
            description="UPS topologies, sizing calculations, battery technologies, bypass arrangements, and monitoring systems"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Compare UPS topologies and their characteristics",
              "Calculate UPS sizing including kVA, kW, and autonomy",
              "Evaluate battery technologies for different applications",
              "Design bypass arrangements for maintenance access",
              "Specify monitoring and BMS requirements",
              "Apply redundancy configurations for critical loads",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="UPS Topologies">
            <p>Uninterruptible Power Supply systems provide continuous power to critical loads by bridging the gap between mains failure and generator start-up, or providing complete power conditioning for sensitive equipment. The three main topologies offer different levels of protection, efficiency, and cost.</p>
            <p><strong>UPS Topology Comparison:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Offline (Standby):</strong> 5-12 ms — 95-98% — PCs, home office, basic protection</li>
              <li><strong>Line-Interactive:</strong> 2-4 ms — 94-97% — Small servers, networking, retail</li>
              <li><strong>Online Double Conversion:</strong> 0 ms — 90-94% — Data centres, medical, critical IT</li>
            </ul>
            <p><strong>Offline (Standby)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Load powered directly from mains</li>
              <li>Inverter activates on mains failure</li>
              <li>Basic surge protection only</li>
              <li>Lowest cost per kVA</li>
              <li>No voltage regulation</li>
            </ul>
            <p><strong>Line-Interactive</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Autotransformer regulates voltage</li>
              <li>Buck/boost without transfer</li>
              <li>Faster transfer than offline</li>
              <li>Good balance of cost/protection</li>
              <li>Popular for SME applications</li>
            </ul>
            <p><strong>Online Double Conversion</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Continuous power conditioning</li>
              <li>Complete isolation from mains</li>
              <li>Zero transfer time</li>
              <li>Highest protection level</li>
              <li>Essential for critical loads</li>
            </ul>
            <p><strong>Online Double Conversion Process</strong></p>
            <p><span>Stage 1:</span> AC mains → Rectifier → DC bus</p>
            <p><span>Stage 2:</span> DC bus → Charges batteries continuously</p>
            <p><span>Stage 3:</span> DC bus → Inverter → Clean AC to load</p>
            <p><span>On mains fail:</span> Batteries maintain DC bus seamlessly</p>
            <p><strong>Selection principle:</strong> Choose online double conversion for any load where even milliseconds of interruption could cause data loss, process failure, or safety issues.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="UPS Sizing Calculations">
            <p>Correct UPS sizing ensures adequate capacity for the connected load while providing headroom for future expansion and avoiding operation at full capacity, which reduces reliability and efficiency.</p>
            <p><strong>Fundamental Sizing Equations</strong></p>
            <p><strong>Apparent Power:</strong> S (kVA) = P (kW) ÷ Power Factor</p>
            <p><strong>With headroom:</strong> UPS Rating = S × 1.25 to 1.30</p>
            <p><strong>Battery Wh:</strong> Capacity = V × Ah × DOD × η</p>
            <p><strong>Autonomy:</strong> Time (h) = Battery Wh ÷ Load (W)</p>
            <p><strong>Sizing Parameters</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>IT load power factor:</strong> 0.9 - 0.95 — Modern servers with PFC</li>
              <li><strong>Growth headroom:</strong> 25-30% — 3-5 year planning horizon</li>
              <li><strong>Battery DOD (Depth of Discharge):</strong> 80% — Protects battery life</li>
              <li><strong>Inverter efficiency:</strong> 90-94% — Losses in conversion</li>
              <li><strong>Typical autonomy:</strong> 10-30 minutes — Generator start + stabilise</li>
            </ul>
            <p><strong>Worked Example: Server Room UPS Sizing</strong></p>
            <p><span>Given:</span> 12 servers × 800W = 9.6 kW total</p>
            <p><span>Power factor:</span> 0.9</p>
            <p><span>Autonomy required:</span> 15 minutes</p>
            <p><span>Step 1:</span> kVA = 9.6 ÷ 0.9 = 10.67 kVA</p>
            <p><span>Step 2:</span> With 25% headroom = 10.67 × 1.25 = 13.3 kVA</p>
            <p><span>Step 3:</span> Select 15 kVA UPS (standard size)</p>
            <p><span>Battery:</span> Energy = 9.6 kW × 0.25h ÷ 0.9 = 2.67 kWh</p>
            <p><span>At 80% DOD:</span> Battery capacity = 2.67 ÷ 0.8 = 3.33 kWh</p>
            <p><strong>Design tip:</strong> Always verify actual measured load before final UPS selection. Nameplate ratings often exceed actual consumption by 30-50%.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Battery Technologies and BMS">
            <p>Battery systems are the heart of UPS installations, storing energy for discharge during mains failure. The choice between VRLA (Valve Regulated Lead Acid) and lithium-ion technologies depends on space constraints, lifecycle cost, and operating environment.</p>
            <p><strong>Battery Technology Comparison</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Design life:</strong> 5-10 years — 10-15 years</li>
              <li><strong>Cycle life:</strong> 200-400 cycles — 3,000-5,000 cycles</li>
              <li><strong>Energy density:</strong> 30-40 Wh/kg — 100-150 Wh/kg</li>
              <li><strong>Recharge time:</strong> 8-12 hours — 1-4 hours</li>
              <li><strong>Temperature sensitivity:</strong> High (20-25°C optimal) — Lower (up to 40°C)</li>
              <li><strong>Initial cost:</strong> Lower — 2-3× higher</li>
              <li><strong>Lifecycle cost:</strong> Higher (replacements) — Lower over 15 years</li>
            </ul>
            <p><strong>VRLA Battery Considerations</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Float voltage: 2.27V/cell (13.6V for 12V battery)</li>
              <li>Temperature compensation essential</li>
              <li>Hydrogen venting requirements</li>
              <li>Floor loading: ~50kg per 100Ah 12V block</li>
              <li>Replace at 80% capacity retention</li>
            </ul>
            <p><strong>Lithium-Ion Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Sophisticated BMS mandatory</li>
              <li>Cell balancing during charge</li>
              <li>Thermal management system</li>
              <li>Fire suppression considerations</li>
              <li>Transportation regulations (UN38.3)</li>
            </ul>
            <p><strong>Battery Management System (BMS) Functions</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Cell monitoring:</strong> Individual voltage and temperature per cell</li>
              <li><strong>Charge control:</strong> CC/CV charging with temperature compensation</li>
              <li><strong>Balancing:</strong> Equalises cell voltages during charge</li>
              <li><strong>Protection:</strong> Overcurrent, overvoltage, thermal runaway prevention</li>
              <li><strong>State estimation:</strong> SOC (State of Charge), SOH (State of Health)</li>
              <li><strong>Communication:</strong> CAN bus, Modbus, SNMP to UPS controller</li>
            </ul>
            <p><strong>Temperature rule:</strong> VRLA battery life halves for every 10°C above 25°C. A battery rated for 10 years at 25°C will last only 5 years at 35°C.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Bypass Arrangements and Monitoring">
            <p>Bypass arrangements are essential for maintaining load power during UPS maintenance or failure conditions. Modern installations incorporate both automatic and manual bypass capabilities, complemented by comprehensive monitoring systems.</p>
            <p><strong>Bypass Types and Functions</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Automatic Static:</strong> SCR/thyristor switching — &lt;4 ms — Overload, inverter fault</li>
              <li><strong>Manual Bypass:</strong> Rotary switch or breakers — Make-before-break — Planned maintenance</li>
              <li><strong>External Maintenance:</strong> Wrap-around cabinet — Overlapping contacts — Complete UPS isolation</li>
              <li><strong>ECO Mode:</strong> Continuous bypass + monitoring — 2-4 ms to inverter — Energy efficiency mode</li>
            </ul>
            <p><strong>Maintenance Bypass Procedure (Typical)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Verify mains supply is stable and within tolerance</li>
              <li>Transfer to static bypass (UPS panel or automatic)</li>
              <li>Close maintenance bypass switch (MBB position)</li>
              <li>Open input and output breakers to UPS</li>
              <li>Apply lockout/tagout to isolated UPS</li>
              <li>Perform maintenance with load on raw mains</li>
              <li>Reverse procedure to restore UPS protection</li>
            </ul>
            <p><strong>Monitoring Parameters</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Input voltage, current, frequency</li>
              <li>Output voltage, current, power</li>
              <li>Battery voltage, charge current, temperature</li>
              <li>Load percentage and power factor</li>
              <li>Remaining autonomy (minutes)</li>
              <li>Alarm status and event log</li>
            </ul>
            <p><strong>Communication Protocols</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>SNMP:</strong> Network management integration</li>
              <li><strong>Modbus TCP/RTU:</strong> BMS integration</li>
              <li><strong>BACnet:</strong> Building automation</li>
              <li><strong>Dry contacts:</strong> Simple alarm relay outputs</li>
              <li><strong>USB/RS232:</strong> Local shutdown software</li>
              <li><strong>Web interface:</strong> Remote monitoring</li>
            </ul>
            <p><strong>Redundancy Configurations</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>N:</strong> Single UPS, no redundancy - failure = load loss</li>
              <li><strong>N+1:</strong> Parallel UPS units, one spare - one can fail</li>
              <li><strong>2N:</strong> Two independent UPS systems - either can support full load</li>
              <li><strong>2N+1:</strong> Two systems plus one spare - highest availability</li>
              <li><strong>Distributed:</strong> Multiple smaller UPS per rack - localised redundancy</li>
            </ul>
            <p><strong>Availability target:</strong> 2N configurations can achieve 99.9999% availability (seconds of downtime per year) when combined with dual utility feeds and generator backup.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Complete UPS System Sizing</strong>
            </p>
            <p><strong>Scenario:</strong> Size a UPS for a small data centre with 30 kW IT load, requiring 20 minutes autonomy.</p>
            <p>Given data:</p>
            <p>IT Load = 30 kW, PF = 0.9, Autonomy = 20 min</p>
            <p>Step 1: Calculate kVA requirement</p>
            <p>kVA = 30 kW ÷ 0.9 = 33.3 kVA</p>
            <p>Step 2: Add 25% headroom</p>
            <p>Required = 33.3 × 1.25 = 41.7 kVA</p>
            <p>Select: 50 kVA UPS (standard size)</p>
            <p>Step 3: Calculate battery energy</p>
            <p>Energy = 30 kW × (20/60)h = 10 kWh at load</p>
            <p>At 90% inverter eff: 10 ÷ 0.9 = 11.1 kWh</p>
            <p>At 80% DOD: 11.1 ÷ 0.8 = 13.9 kWh battery</p>
            <p>Step 4: Battery configuration (192V DC bus typical)</p>
            <p>Ah required = 13,900 Wh ÷ 192V = 72 Ah</p>
            <p>Select: 80 Ah battery string (next standard size)</p>
            <p>
              <strong>Example 2: Battery Replacement Planning</strong>
            </p>
            <p><strong>Scenario:</strong> Plan battery replacement for UPS installed 2019, VRLA batteries rated 10-year design life.</p>
            <p>Assessment factors:</p>
            <p>Install date: 2019, Design life: 10 years at 25°C</p>
            <p>Actual ambient: 28°C average (battery room)</p>
            <p>Temperature derating calculation:</p>
            <p>Excess temp = 28 - 25 = 3°C</p>
            <p>Life reduction = 10 years × 0.5^(3/10) = 8.1 years</p>
            <p>Conservative replacement (80% of adjusted life):</p>
            <p>Replace at = 8.1 × 0.8 = 6.5 years</p>
            <p>Plan replacement: Mid-2025</p>
            <p>Validation:</p>
            <p>Perform impedance testing annually from 2023</p>
            <p>Replace when impedance &gt;20% above baseline</p>
            <p>
              <strong>Example 3: Parallel UPS Configuration</strong>
            </p>
            <p><strong>Scenario:</strong> Design N+1 redundant UPS for 80 kVA critical load.</p>
            <p>Requirement:</p>
            <p>80 kVA load, N+1 redundancy, 15 min autonomy</p>
            <p>Configuration options:</p>
            <p>Option A: 2 × 100 kVA (each at 40% load normally)</p>
            <p>Option B: 3 × 40 kVA (each at 67% load normally)</p>
            <p>Analysis:</p>
            <p>Option A: Higher headroom, 80% load if one fails</p>
            <p>Option B: Better efficiency at part load, 100% if one fails</p>
            <p>Selected: 2 × 100 kVA</p>
            <p>Justification: Greater growth capacity, simpler system</p>
            <p>Battery sizing per UPS:</p>
            <p>Must support 80 kVA at 0.9 PF = 72 kW for 15 min</p>
            <p>Energy = 72 × 0.25h ÷ 0.9 ÷ 0.8 = 25 kWh per UPS</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>UPS Selection Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Determine actual load (measure, don't assume from nameplates)</li>
              <li>Select topology based on load criticality</li>
              <li>Calculate kVA with power factor and growth headroom</li>
              <li>Specify autonomy based on generator start time + margin</li>
              <li>Consider redundancy requirements (N, N+1, 2N)</li>
              <li>Verify environmental conditions for battery selection</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Online UPS transfer time: <strong>0 ms</strong></li>
              <li>IT load power factor: <strong>0.9 typical</strong></li>
              <li>VRLA optimal temperature: <strong>20-25°C</strong></li>
              <li>Battery DOD for sizing: <strong>80%</strong></li>
              <li>Design headroom: <strong>25-30%</strong></li>
              <li>Typical autonomy: <strong>10-30 minutes</strong></li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Undersized batteries</strong> - Using nameplate loads instead of measured values</li>
                <li><strong>Ignoring temperature</strong> - No cooling for battery room reduces life significantly</li>
                <li><strong>No maintenance bypass</strong> - Cannot service UPS without load disruption</li>
                <li><strong>Mixed battery ages</strong> - Old cells fail first, compromising entire string</li>
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
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section2-4")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Standby generator systems
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section2-6")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Testing and compliance
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule7Section2_5;
