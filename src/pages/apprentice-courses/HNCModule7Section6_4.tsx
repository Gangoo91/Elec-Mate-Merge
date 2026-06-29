/**
 * Module 7 · Section 6 · Subsection 4 — Coordination Studies
 * HNC Electrical Engineering for Building Services (Power and Lighting Systems)
 *   Short-circuit calculations, protective device coordination, software tools, and study documentation
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

const TITLE = 'Coordination Studies - HNC Module 7 Section 6.4';
const DESCRIPTION =
  'Master coordination studies for electrical power systems: short-circuit calculations per IEC 60909, fault current contribution analysis, protective device coordination, time-current curves, and coordination software tools including ETAP, SKM, and Amtech.';

const quickCheckQuestions = [
  {
    id: 'short-circuit-standard',
    question:
      'Which international standard provides the methodology for short-circuit current calculations in AC systems?',
    options: [
      'BS 7671',
      'BS EN 61439',
      'IEEE 141',
      'IEC 60909',
    ],
    correctIndex: 3,
    explanation:
      'IEC 60909 (Short-circuit currents in three-phase a.c. systems) provides the internationally recognised methodology for calculating short-circuit currents, including calculation of initial symmetrical short-circuit current, peak short-circuit current, and breaking current.',
  },
  {
    id: 'coordination-purpose',
    question: 'What is the primary purpose of protective device coordination?',
    options: [
      'To ensure every protective device in the system trips simultaneously on any fault',
      'To ensure only the device nearest the fault operates, isolating the minimum portion of the system',
      'To increase the breaking capacity of each device above the prospective fault current',
      'To limit the let-through energy of the supply transformer during a short circuit',
    ],
    correctIndex: 1,
    explanation:
      'Protective device coordination ensures selectivity - the device immediately upstream of the fault operates to clear it whilst all other protective devices remain closed, thereby isolating only the faulted section and maintaining supply to healthy circuits.',
  },
  {
    id: 'tcc-curve',
    question: 'What does a time-current characteristic (TCC) curve display?',
    options: [
      'Supply voltage versus load current at the point of supply',
      'Let-through energy versus prospective fault current',
      'Conductor temperature rise versus time during a fault',
      'Operating time versus fault current magnitude',
    ],
    correctIndex: 3,
    explanation:
      'A TCC curve plots the operating time of a protective device against fault current magnitude on logarithmic scales. This enables comparison of multiple devices to verify coordination - curves must not overlap within the range of prospective fault currents.',
  },
  {
    id: 'software-tools',
    question: 'Which software packages are commonly used for coordination studies?',
    options: [
      'AutoCAD, Revit, and SketchUp',
      'MATLAB, LabVIEW, and Simulink',
      'ETAP, SKM PowerTools, and Amtech ProDesign',
      'PowerPoint, Excel, and Visio',
    ],
    correctIndex: 2,
    explanation:
      'ETAP, SKM PowerTools, and Amtech ProDesign are industry-standard electrical power system analysis software packages that include modules for short-circuit analysis, protective device coordination, and automatic TCC curve generation.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "In IEC 60909, what does the voltage factor 'c' account for?",
    options: [
      'The power factor of the connected load at the fault point',
      'Variation of system voltage and equipment impedance from nominal values',
      'The DC time constant of the fault circuit',
      'The temperature coefficient of the conductor resistance',
    ],
    correctAnswer: 1,
    explanation:
      "The voltage factor 'c' in IEC 60909 accounts for voltage variations (including tap changer positions), subtransient behaviour of generators and motors, and the differences between actual and nominal equipment impedances. Values of 1.0 for minimum and 1.05-1.1 for maximum fault current are typically used.",
  },
  {
    id: 2,
    question: 'What is the initial symmetrical short-circuit current (I"k)?',
    options: [
      'The peak instantaneous value reached in the first half-cycle of the fault',
      'The steady-state fault current remaining after the DC offset has decayed',
      'The RMS value of the AC symmetrical component at the instant of fault',
      'The average current over the full duration of the fault clearance',
    ],
    correctAnswer: 2,
    explanation:
      'I"k is the RMS value of the AC symmetrical component of the prospective short-circuit current at the instant of short circuit, assuming the short-circuit impedance retains its value at time zero. It is the fundamental value used to determine breaking capacity requirements.',
  },
  {
    id: 3,
    question: 'What is the peak short-circuit current (ip) used to determine?',
    options: [
      'The thermal withstand rating of downstream cables',
      'The minimum disconnection time required by BS 7671',
      'The breaking capacity rating needed at steady state',
      'Equipment dynamic withstand capability (making capacity)',
    ],
    correctAnswer: 3,
    explanation:
      'The peak short-circuit current (ip) determines the dynamic forces and mechanical stresses on equipment during the first cycle of fault current. Equipment must have adequate making capacity (dynamic withstand) to handle these electromechanical forces without damage.',
  },
  {
    id: 4,
    question:
      'For a three-phase short-circuit at an LV busbar fed via a 1000 kVA transformer (Uk = 6%), what is the approximate fault level?',
    options: [
      '24 kA',
      '16.7 kA',
      '6 kA',
      '36 kA',
    ],
    correctAnswer: 0,
    explanation:
      'Fault level ≈ kVA / (Uk × √3 × V). For 1000 kVA at 400V with 6% impedance: I"k = 1000000 / (0.06 × √3 × 400) = 1000000 / 41.6 ≈ 24 kA (ignoring upstream impedance). This demonstrates why transformer impedance significantly limits fault current.',
  },
  {
    id: 5,
    question: "What is meant by 'selectivity' in protective device coordination?",
    options: [
      'The ability of every device to trip together to de-energise the whole installation',
      'The ability to isolate only the faulted circuit whilst maintaining supply to healthy circuits',
      'The ability of a device to interrupt the maximum prospective fault current',
      'The ability to choose the cheapest device that still meets the load rating',
    ],
    correctAnswer: 1,
    explanation:
      'Selectivity (or discrimination) is the ability of a protection system to isolate only the faulted section whilst all upstream protective devices remain closed. This maintains supply continuity to healthy circuits and is the fundamental objective of coordination studies.',
  },
  {
    id: 6,
    question: 'What time margin is typically required between protective devices for coordination?',
    options: [
      '0.1 seconds',
      '1.0 second',
      '0.3-0.4 seconds minimum',
      'No margin required',
    ],
    correctAnswer: 2,
    explanation:
      'A minimum time margin of 0.3-0.4 seconds is typically required between the total clearing time of the downstream device and the minimum operating time of the upstream device. This accounts for tolerance in device characteristics and relay/breaker operating times.',
  },
  {
    id: 7,
    question: 'What contribution do induction motors make to fault current?',
    options: [
      'They draw no additional current and reduce the overall fault level',
      'A sustained contribution equal to full load current for the whole fault',
      'A contribution only on earth faults, never on phase-to-phase faults',
      'Initial contribution of 4-6 times full load current, decaying rapidly',
    ],
    correctAnswer: 3,
    explanation:
      'Induction motors act as generators during the initial cycles of a fault, contributing 4-6 times their full load current. This contribution decays rapidly (within 3-5 cycles) as the motor flux collapses. Large motor loads significantly increase initial fault currents.',
  },
  {
    id: 8,
    question: "In a coordination study, what does the term 'let-through energy' (I²t) represent?",
    options: [
      'Thermal energy passed through the protective device during fault clearance',
      'The reactive energy stored in the cable during normal operation',
      'The total energy the supply transformer can deliver before saturating',
      'The mechanical energy released by the breaker contacts when opening',
    ],
    correctAnswer: 0,
    explanation:
      'Let-through energy (I²t) represents the thermal energy that passes through a protective device during fault clearance. Downstream devices and cables must withstand this energy. Coordination requires the downstream device I²t to be less than the upstream device let-through.',
  },
  {
    id: 9,
    question: 'What is zone selective interlocking (ZSI)?',
    options: [
      'A mechanical lock that prevents two adjacent breakers closing together',
      'A communication scheme between protective devices to enhance selectivity',
      'A fixed time delay added to every device on the distribution board',
      'A method of increasing a breaker breaking capacity by paralleling units',
    ],
    correctAnswer: 1,
    explanation:
      'Zone selective interlocking (ZSI) uses communication between protective devices - when a downstream device detects a fault, it signals upstream devices to delay operation. If no signal is received, the device operates without intentional delay, providing faster clearance for upstream faults whilst maintaining coordination.',
  },
  {
    id: 10,
    question:
      'What type of coordination exists when devices coordinate only up to a certain fault level?',
    options: [
      'Total selectivity',
      'Current-limited selectivity',
      'Partial selectivity',
      'Time-graded selectivity',
    ],
    correctAnswer: 2,
    explanation:
      'Partial selectivity exists when coordination is achieved only up to a defined fault current level (the selectivity limit). Above this level, both devices may operate simultaneously. Total selectivity means coordination is maintained up to the maximum prospective fault current.',
  },
  {
    id: 11,
    question: 'Why is the X/R ratio important in short-circuit calculations?',
    options: [
      'It sets the maximum disconnection time permitted by BS 7671',
      'It determines the rated voltage at which the device can operate',
      'It fixes the steady-state RMS fault current regardless of timing',
      'It affects the DC component and peak asymmetrical current',
    ],
    correctAnswer: 3,
    explanation:
      'The X/R ratio of the fault circuit determines the magnitude and decay rate of the DC component in the asymmetrical fault current. Higher X/R ratios result in greater DC offset and higher peak currents, affecting equipment dynamic rating requirements and the calculation factor κ for peak current.',
  },
  {
    id: 12,
    question:
      'In coordination study documentation, what should be included in the protective device schedule?',
    options: [
      'Device ratings, settings, clearing times, and coordination margins',
      'Only the manufacturer and catalogue number of each device',
      'The X/R ratio and DC time constant at every node in the network',
      'The arc flash incident energy and PPE category for each panel',
    ],
    correctAnswer: 0,
    explanation:
      'A protective device schedule should include: device type and rating, trip unit type, instantaneous and time-delay settings, let-through characteristics, coordination margins with adjacent devices, and selectivity limits. This enables verification of settings and future modifications.',
  },
];

const faqs = [
  {
    question:
      'What is the difference between IEC 60909 and IEEE 141 (Red Book) for short-circuit calculations?',
    answer:
      'IEC 60909 uses an equivalent voltage source at the fault point and applies voltage factors (c factors) to account for system variations, whilst IEEE 141 uses actual pre-fault system conditions. IEC 60909 is the European/UK standard providing conservative results with simpler calculations. IEEE 141 may give more accurate results for specific operating conditions but requires detailed pre-fault load flow data. In the UK, IEC 60909 is the accepted methodology.',
  },
  {
    question:
      'How do I determine if coordination software is necessary versus manual calculations?',
    answer:
      "Manual calculations are adequate for simple radial systems with few protective devices (typically fewer than 10). Coordination software becomes essential for: systems with multiple fault current sources, complex network configurations with parallel paths, large numbers of protective devices requiring coordination, systems requiring arc flash analysis, and projects where coordination curves must be documented and maintained. Software also enables rapid 'what-if' analysis and automatic curve plotting.",
  },
  {
    question: 'What are the consequences of poor protective device coordination?',
    answer:
      'Poor coordination can result in: unnecessary outages affecting healthy circuits (nuisance tripping), failure to clear faults leading to equipment damage, cascading failures where multiple devices operate simultaneously, extended downtime whilst systems are restored, safety hazards from delayed fault clearance, and potential arc flash incidents with increased energy release. Proper coordination is essential for system reliability and safety.',
  },
  {
    question: 'How often should coordination studies be updated?',
    answer:
      'Coordination studies should be updated whenever: the system is modified (new loads, cables, or switchgear), utility fault levels change (notified by DNO), protective devices are replaced or settings changed, new fault current sources are added (generators, large motors), or every 5 years as good practice. Changes to upstream systems can significantly affect coordination, particularly if fault levels increase.',
  },
  {
    question: 'What is the relationship between coordination studies and arc flash analysis?',
    answer:
      'Coordination studies and arc flash analysis are closely linked - both use the same system model and fault current data. Protective device settings that achieve good coordination also affect incident energy levels. Faster clearing times generally reduce arc flash energy but may compromise coordination. Modern studies optimise both objectives, and coordination software typically includes arc flash modules that calculate incident energy based on the protective device settings determined in the coordination study.',
  },
];

const HNCModule7Section6_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section6")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 7 · Section 6 · Subsection 4"
            title="Coordination Studies"
            description="Short-circuit calculations, protective device coordination, software tools, and study documentation"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Apply IEC 60909 methodology for short-circuit current calculations",
              "Analyse fault current contributions from transformers, generators, and motors",
              "Interpret and construct time-current characteristic curves",
              "Use coordination software tools (ETAP, SKM, Amtech) for protection studies",
              "Achieve selectivity between series-connected protective devices",
              "Document coordination studies for engineering records and O&M manuals",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Short-Circuit Calculations (IEC 60909)">
            <p>IEC 60909 provides the internationally accepted methodology for calculating short-circuit currents in three-phase AC systems. Understanding these calculations is fundamental to protective device selection and coordination.</p>
            <p><strong>Key short-circuit current parameters:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>I"k (initial symmetrical):</strong> RMS value at instant of fault - determines breaking capacity</li>
              <li><strong>ip (peak):</strong> Maximum instantaneous value - determines making capacity and dynamic forces</li>
              <li><strong>Ib (breaking):</strong> RMS value at circuit breaker contact separation</li>
              <li><strong>Ik (steady-state):</strong> RMS value after transients decay - relevant for generator faults</li>
            </ul>
            <p><strong>IEC 60909 Calculation Methodology</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1:</strong> Define system topology — Single-line diagram, voltage levels, network configuration</li>
              <li><strong>2:</strong> Determine equipment impedances — Transformers (Uk%), cables (R, X), motors, utility source</li>
              <li><strong>3:</strong> Convert to common base — Typically 100 MVA base, per-unit system</li>
              <li><strong>4:</strong> Calculate equivalent impedance — Series/parallel combinations to fault point</li>
              <li><strong>5:</strong> Apply voltage factor (c) — cmax = 1.05-1.1 for maximum, cmin = 0.95-1.0 for minimum</li>
              <li><strong>6:</strong> Calculate I"k, ip, Ib — Different fault types: 3-phase, phase-earth, phase-phase</li>
            </ul>
            <p><strong>Calculation Formula - Initial Symmetrical Short-Circuit Current</strong></p>
            <p>I"k = (c × Un) / (√3 × Zk)</p>
            <p>Where:</p>
            <p>c = voltage factor (typically 1.1 for maximum)</p>
            <p>Un = nominal voltage</p>
            <p>Zk = total impedance to fault point</p>
            <p><strong>Design principle:</strong> Always calculate both maximum (for equipment ratings) and minimum (for protection sensitivity) short-circuit currents at each location.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Fault Current Contribution Analysis">
            <p>Multiple sources contribute to fault current in electrical systems. Understanding each source's contribution characteristics is essential for accurate fault level calculations and proper protective device selection.</p>
            <p><strong>Utility (Grid) Contribution</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Sustained at I"k level</li>
              <li>Obtain from DNO (fault level notice)</li>
              <li>Typically dominates at MV/LV</li>
              <li>Check for future increases</li>
            </ul>
            <p><strong>Transformer Contribution</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Limited by Uk% (impedance)</li>
              <li>I"k ≈ kVA / (Uk% × √3 × V)</li>
              <li>Typical Uk%: 4-6% distribution</li>
              <li>Parallel transformers increase fault level</li>
            </ul>
            <p><strong>Motor Contribution</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Induction: 4-6 × FLC, decays in 3-5 cycles</li>
              <li>Synchronous: higher, longer decay</li>
              <li>Significant for large motor loads</li>
              <li>Often modelled as single equivalent</li>
            </ul>
            <p><strong>Generator Contribution</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Subtransient (X"d): initial 1-2 cycles</li>
              <li>Transient (X'd): 0.5-2 seconds</li>
              <li>Synchronous (Xd): steady-state</li>
              <li>Standby generators significant</li>
            </ul>
            <p><strong>X/R Ratio and DC Component</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>&lt; 5:</strong> LV final circuits, small transformers — 1.3 - 1.5 — Rapid (&lt; 1 cycle)</li>
              <li><strong>5 - 15:</strong> LV distribution, medium transformers — 1.5 - 1.8 — Moderate (2-5 cycles)</li>
              <li><strong>15 - 50:</strong> MV systems, large transformers — 1.8 - 2.0 — Slow (5-10 cycles)</li>
              <li><strong>&gt; 50:</strong> Generator busbars, HV systems — &gt; 2.0 — Very slow (&gt; 10 cycles)</li>
            </ul>
            <p><strong>Best practice:</strong> The peak short-circuit current ip = κ × √2 × I"k, where κ depends on X/R ratio. Higher X/R ratios significantly increase dynamic stresses on equipment.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Protective Device Coordination">
            <p>Coordination ensures that only the protective device immediately upstream of a fault operates, isolating the minimum portion of the system. This maintains supply to healthy circuits and is achieved through careful analysis of device characteristics.</p>
            <p><strong>Coordination Methods</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Time grading:</strong> Upstream device has longer time delay — Overcurrent relays, adjustable trip units</li>
              <li><strong>Current grading:</strong> Upstream device has higher pickup setting — Different fault levels at each location</li>
              <li><strong>Energy (I²t):</strong> Downstream device limits energy to below upstream trip — MCB/fuse coordination, current-limiting</li>
              <li><strong>Zone selective interlocking:</strong> Communication restrains upstream devices — Modern electronic trip units, relays</li>
            </ul>
            <p><strong>Time-Current Characteristic (TCC) Curves</strong></p>
            <p>TCC curves plot operating time versus fault current on log-log scales:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>X-axis:</strong> Current (typically in multiples of rated current)</li>
              <li><strong>Y-axis:</strong> Operating time (0.01 to 1000 seconds)</li>
              <li><strong>Curve band:</strong> Tolerance between minimum and maximum operating times</li>
              <li><strong>Coordination requirement:</strong> Downstream device curve must sit entirely below and left of upstream curve within fault range</li>
            </ul>
            <p><strong>Coordination time margins:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Electromechanical relays:</strong> 0.4 seconds minimum</li>
              <li><strong>Static/digital relays:</strong> 0.3 seconds minimum</li>
              <li><strong>Circuit breakers:</strong> 0.3-0.4 seconds (accounts for relay + breaker time)</li>
              <li><strong>Fuses:</strong> Must account for pre-arcing and arcing time tolerances</li>
            </ul>
            <p><strong>Selectivity limit:</strong> The maximum fault current at which coordination is maintained. Above this level, both devices may operate simultaneously (partial selectivity).</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Software Tools and Documentation">
            <p>Modern coordination studies rely on specialised software for accurate analysis and documentation. These tools model complex systems, calculate fault currents at multiple locations, and automatically generate TCC curves.</p>
            <p><strong>Industry-Standard Software Packages</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>ETAP:</strong> ETAP/Schneider — Comprehensive analysis suite, real-time monitoring, arc flash</li>
              <li><strong>SKM PowerTools:</strong> SKM Systems Analysis — DAPPER for coordination, extensive device libraries</li>
              <li><strong>Amtech ProDesign:</strong> Trimble — UK-focused, BS 7671 compliance, protection coordination</li>
              <li><strong>CYMTCC:</strong> Eaton — TCC curve plotting, coordination analysis</li>
              <li><strong>EasyPower:</strong> ESA Inc — Short-circuit, coordination, arc flash integrated</li>
            </ul>
            <p><strong>Software Analysis Capabilities</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>IEC 60909 / IEEE fault calculations</li>
              <li>Automatic TCC curve generation</li>
              <li>Device library with manufacturer data</li>
              <li>Selectivity verification</li>
              <li>Arc flash incident energy</li>
              <li>Report generation</li>
            </ul>
            <p><strong>Study Documentation Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Single-line diagram with fault levels</li>
              <li>Protective device schedule</li>
              <li>TCC coordination plots</li>
              <li>Relay/trip unit settings</li>
              <li>Selectivity matrices</li>
              <li>Calculation assumptions</li>
            </ul>
            <p><strong>Coordination Study Report Contents</strong></p>
            <p><strong>1. Introduction:</strong> Project scope, system description, design criteria</p>
            <p><strong>2. System Data:</strong> Single-line diagram, equipment ratings, cable data, utility fault level</p>
            <p><strong>3. Short-Circuit Analysis:</strong> Fault currents at each bus, calculation method (IEC 60909)</p>
            <p><strong>4. Protective Device Schedule:</strong> All devices with ratings, types, settings, and I²t characteristics</p>
            <p><strong>5. TCC Curves:</strong> Coordination plots for each series path, showing selectivity margins</p>
            <p><strong>6. Selectivity Matrix:</strong> Table showing coordination status between device pairs</p>
            <p><strong>7. Recommendations:</strong> Any coordination issues identified and proposed solutions</p>
            <p><strong>Documentation tip:</strong> Include all input data assumptions so studies can be updated when system changes occur. Coordination studies should be living documents, revised whenever the system is modified.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Transformer Fault Level Calculation</strong>
            </p>
            <p><strong>Scenario:</strong> Calculate the maximum prospective fault current at the LV terminals of an 800 kVA, 11/0.4 kV transformer with 5% impedance. Assume utility fault level is infinite.</p>
            <p>Given:</p>
            <p>Transformer rating S = 800 kVA</p>
            <p>Secondary voltage Un = 400 V</p>
            <p>Impedance Uk = 5%</p>
            <p>Voltage factor c = 1.1 (maximum)</p>
            <p>Calculation:</p>
            <p>Rated secondary current In = S / (√3 × Un)</p>
            <p>In = 800,000 / (1.732 × 400) = 1155 A</p>
            <p>Initial symmetrical fault current:</p>
            <p>I"k = (c × In) / Uk = (1.1 × 1155) / 0.05</p>
            <p>I"k = 25.4 kA</p>
            <p>Peak current (assuming X/R = 10, κ = 1.8):</p>
            <p>ip = κ × √2 × I"k = 1.8 × 1.414 × 25.4</p>
            <p>ip = 64.6 kA (peak)</p>
            <p>
              <strong>Example 2: Time Grading Coordination</strong>
            </p>
            <p><strong>Scenario:</strong> Determine the time settings for three series-connected overcurrent relays to achieve coordination with 0.4 second margins.</p>
            <p>System configuration:</p>
            <p>Relay A (upstream) → Relay B (midstream) → Relay C (downstream)</p>
            <p>Fault current at Relay C location = 10 kA</p>
            <p>Setting calculation (working upstream from fault):</p>
            <p>Relay C operating time at 10 kA: 0.3 seconds (fastest clearance)</p>
            <p>Relay B time setting:</p>
            <p>Minimum = Relay C time + margin = 0.3 + 0.4 = 0.7 seconds</p>
            <p>Set Relay B time multiplier for 0.7s at 10 kA</p>
            <p>Relay A time setting:</p>
            <p>Minimum = Relay B time + margin = 0.7 + 0.4 = 1.1 seconds</p>
            <p>Set Relay A time multiplier for 1.1s at 10 kA</p>
            <p>Total fault clearance time at Relay C:</p>
            <p>Relay C operates in 0.3s (+ breaker time ~0.05s) = 0.35s total</p>
            <p>
              <strong>Example 3: Motor Fault Contribution</strong>
            </p>
            <p><strong>Scenario:</strong> Calculate the fault current contribution from a 200 kW induction motor group during the initial cycles of a nearby fault.</p>
            <p>Given:</p>
            <p>Motor group rating = 200 kW</p>
            <p>Supply voltage = 400 V</p>
            <p>Power factor = 0.85</p>
            <p>Efficiency = 0.92</p>
            <p>Motor contribution factor = 5 × FLC (typical induction)</p>
            <p>Calculation:</p>
            <p>Motor input power = 200 / 0.92 = 217.4 kVA</p>
            <p>Motor FLC = 217,400 / (√3 × 400) = 314 A</p>
            <p>Initial fault contribution:</p>
            <p>Imotor = 5 × 314 = 1570 A</p>
            <p>Motor contribution ≈ 1.6 kA (initial cycles)</p>
            <p>Note: This decays to zero within 3-5 cycles</p>
            <p>Must be added to utility contribution for total I"k</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Coordination Study Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Obtain utility fault level data from DNO (request maximum and minimum values)</li>
              <li>Collect accurate equipment impedance data (transformers, cables, motors)</li>
              <li>Calculate fault currents at all significant locations using IEC 60909</li>
              <li>Select protective devices with appropriate interrupting ratings</li>
              <li>Plot TCC curves for all series-connected devices</li>
              <li>Verify coordination margins (minimum 0.3-0.4 seconds)</li>
              <li>Document all settings and selectivity limits</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Voltage factor c: <strong>1.1 maximum, 0.95 minimum</strong> (LV systems)</li>
              <li>Coordination margin: <strong>0.3-0.4 seconds</strong> minimum</li>
              <li>Motor contribution: <strong>4-6 × FLC</strong> initial, decays in 3-5 cycles</li>
              <li>Peak factor κ: <strong>1.3-2.0</strong> depending on X/R ratio</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Ignoring motor contribution</strong> - can significantly increase fault levels</li>
                <li><strong>Using outdated DNO fault levels</strong> - system changes may increase prospective fault current</li>
                <li><strong>Insufficient coordination margins</strong> - device tolerances cause overlap</li>
                <li><strong>Not documenting assumptions</strong> - studies cannot be verified or updated</li>
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
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section6-3")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Earthing systems
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section6-5")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Commissioning procedures
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule7Section6_4;
