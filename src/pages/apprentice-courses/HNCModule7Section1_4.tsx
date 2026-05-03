/**
 * Module 7 · Section 1 · Subsection 4 — Discrimination Studies
 * HNC Electrical Engineering for Building Services (Power and Lighting Systems)
 *   Time-current curves, discrimination margins, cascading, backup protection, and coordination software for protective device selectivity
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

const TITLE = 'Discrimination Studies - HNC Module 7 Section 1.4';
const DESCRIPTION =
  'Master protective device discrimination for electrical installations: time-current curves, discrimination margins, cascading, backup protection, and coordination software tools to BS 7671.';

const quickCheckQuestions = [
  {
    id: 'discrimination-definition',
    question: 'What is discrimination (selectivity) in protective device coordination?',
    options: [
      'Using the same size device throughout an installation',
      'The ability of the nearest upstream device to operate before downstream devices',
      'Installing the largest possible protective device',
      'The ability of the device nearest the fault to operate and isolate it whilst upstream devices remain closed',
    ],
    correctIndex: 3,
    explanation:
      'Discrimination (selectivity) ensures that only the protective device nearest to the fault operates to clear it, whilst all upstream devices remain closed. This minimises disruption to healthy circuits.',
  },
  {
    id: 'total-vs-partial',
    question: 'What is the difference between total and partial discrimination?',
    options: [
      'Total discrimination uses fuses; partial uses MCBs',
      'Total discrimination works up to the maximum prospective fault current; partial only works up to a defined limit',
      'Total discrimination is for domestic; partial is for commercial',
      'There is no difference - they are interchangeable terms',
    ],
    correctIndex: 1,
    explanation:
      'Total discrimination means the downstream device operates for all fault levels up to the maximum prospective fault current. Partial discrimination only achieves selectivity up to a defined discrimination limit (I_s), beyond which both devices may operate.',
  },
  {
    id: 'time-current-curve',
    question: 'On a time-current characteristic curve, what does the x-axis represent?',
    options: [
      'Operating time in seconds',
      'Prospective fault current (typically in multiples of In or Amperes)',
      'Cable cross-sectional area',
      'Circuit impedance',
    ],
    correctIndex: 1,
    explanation:
      'Time-current curves plot operating time (y-axis, logarithmic scale) against prospective fault current (x-axis, logarithmic scale). Current is often shown in multiples of rated current (In) or in Amperes.',
  },
  {
    id: 'cascading-backup',
    question: 'What is backup protection (cascading) in protective device coordination?',
    options: [
      'Installing two devices in parallel for redundancy',
      "Using the upstream device's breaking capacity to supplement the downstream device's lower breaking capacity",
      'Connecting protective devices to a UPS',
      'Installing surge protection devices',
    ],
    correctIndex: 1,
    explanation:
      'Backup protection (cascading) allows a downstream device with limited breaking capacity to be protected by an upstream device with higher breaking capacity. This enables use of lower-rated devices where prospective fault current exceeds their individual breaking capacity.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'According to BS 7671, what is the minimum discrimination ratio typically required between upstream and downstream fuses for reliable discrimination?',
    options: ['1.5:1', '2:1', '1.6:1 for HRC fuses (gG type)', '3:1'],
    correctAnswer: 2,
    explanation:
      'For gG-type HRC fuses, a discrimination ratio of 1.6:1 (upstream to downstream) typically achieves discrimination for currents up to the I2t let-through. Actual values depend on manufacturer data and should always be verified.',
  },
  {
    id: 2,
    question: 'When analysing time-current curves, discrimination is achieved when:',
    options: [
      'The curves overlap at all points',
      'The downstream device curve is entirely to the left of and below the upstream curve at all fault levels',
      'Both devices have identical curves',
      'The curves intersect at the rated current',
    ],
    correctAnswer: 1,
    explanation:
      'Discrimination requires the downstream (nearer to fault) device to operate faster (lower on curve) at lower current (further left) than the upstream device. The curves must not cross within the range of prospective fault currents.',
  },
  {
    id: 3,
    question: 'The discrimination limit (I_s) on coordination tables indicates:',
    options: [
      'The maximum continuous current rating',
      'The current level up to which discrimination is guaranteed',
      'The minimum fault current for the device to operate',
      'The cable current-carrying capacity',
    ],
    correctAnswer: 1,
    explanation:
      'The discrimination limit (I_s) is the maximum fault current at which discrimination between upstream and downstream devices is guaranteed. Above this value, both devices may operate simultaneously (partial discrimination).',
  },
  {
    id: 4,
    question: 'What is the primary advantage of using HRC fuses over MCBs for discrimination?',
    options: [
      'HRC fuses are cheaper',
      'HRC fuses have better current limitation and more predictable time-current characteristics at high fault levels',
      'HRC fuses never need replacement',
      'MCBs cannot be used for discrimination',
    ],
    correctAnswer: 1,
    explanation:
      'HRC fuses provide excellent current limitation at high fault levels with very predictable characteristics. Their operating curves are well-defined and manufacturer tolerances are tight, making discrimination easier to achieve.',
  },
  {
    id: 5,
    question: 'In a cascading (backup protection) arrangement, what must be verified?',
    options: [
      'The downstream device has higher breaking capacity than the upstream',
      'The combination has been tested by the manufacturer and the enhanced breaking capacity is stated',
      'Both devices are from different manufacturers',
      'The cable size is the same throughout',
    ],
    correctAnswer: 1,
    explanation:
      'Cascading combinations must be manufacturer-tested and approved. The enhanced breaking capacity only applies to that specific combination of devices and must be documented. BS EN 60947-2 covers coordination testing.',
  },
  {
    id: 6,
    question: 'When using coordination software tools, what input data is essential?',
    options: [
      'Only the protective device ratings',
      'Prospective fault currents at each point, device characteristics, cable data, and system configuration',
      'Only the circuit length',
      'The installation date',
    ],
    correctAnswer: 1,
    explanation:
      'Coordination software requires comprehensive input: prospective fault current at each point, protective device types and settings, cable impedances, transformer data, and system topology. This enables accurate time-current analysis.',
  },
  {
    id: 7,
    question:
      'For discrimination between an upstream MCB and downstream MCB, what is the main challenge?',
    options: [
      'MCBs cannot achieve discrimination',
      'MCBs have overlapping magnetic trip regions, making discrimination at high fault currents difficult',
      'MCBs are too expensive',
      'MCBs trip too slowly',
    ],
    correctAnswer: 1,
    explanation:
      'MCBs have magnetic instantaneous trip regions (typically 5-10 x In for Type B, 7-15 x In for Type C). These overlapping regions at high currents make discrimination challenging without significant ratio differences or current-limiting techniques.',
  },
  {
    id: 8,
    question: 'What is I²t let-through energy and why is it important for discrimination?',
    options: [
      'It is the resistance of the circuit',
      'It represents the thermal energy let through during fault clearance - the upstream device must limit more energy than downstream for discrimination',
      'It is the voltage drop calculation',
      'It determines cable colour',
    ],
    correctAnswer: 1,
    explanation:
      "I²t (Joule integral) represents the thermal energy that passes through during fault clearance. For discrimination, the upstream device's I²t let-through must exceed the downstream device's pre-arcing I²t to ensure the downstream operates first.",
  },
  {
    id: 9,
    question: 'Zone Selective Interlocking (ZSI) in protective relay coordination:',
    options: [
      'Is a mechanical linkage between devices',
      'Uses communication between relays to achieve faster clearing at fault location whilst maintaining backup protection',
      'Only works with fuses',
      'Is not permitted by BS 7671',
    ],
    correctAnswer: 1,
    explanation:
      'ZSI enables downstream relays to signal upstream relays that they have detected a fault, allowing the upstream relay to delay operation. This achieves fast fault clearance at the fault location whilst maintaining backup protection capability.',
  },
  {
    id: 10,
    question: 'What does Regulation 536.4 of BS 7671 require regarding backup protection?',
    options: [
      'Backup protection is prohibited',
      'The characteristics of the devices shall be coordinated and the combination verified as suitable for the maximum prospective fault current',
      'Only fuses may be used',
      'All devices must have identical ratings',
    ],
    correctAnswer: 1,
    explanation:
      "BS 7671 Regulation 536.4 permits backup protection (cascading) provided that the device characteristics are coordinated and the combination's suitability for the installation conditions (particularly prospective fault current) is verified.",
  },
  {
    id: 11,
    question:
      'When plotting time-current curves on log-log scales, a 2:1 current ratio appears as:',
    options: [
      'A very large horizontal separation',
      'Approximately 0.3 decades (30% of a decade) of horizontal separation',
      'No separation at all',
      'Curves will intersect',
    ],
    correctAnswer: 1,
    explanation:
      'On logarithmic scales, a 2:1 ratio represents log₁₀(2) ≈ 0.301, or roughly 30% of a decade. This appears as a modest horizontal separation, explaining why discrimination ratios need to be significant to show clear curve separation.',
  },
  {
    id: 12,
    question:
      'An MCCB with adjustable settings (Ir, Im, Ig) provides discrimination advantages because:',
    options: [
      'It is more expensive',
      'Settings can be adjusted to achieve time and current grading with upstream and downstream devices',
      'It has a lower breaking capacity',
      'It cannot be used with fuses',
    ],
    correctAnswer: 1,
    explanation:
      'MCCBs with adjustable thermal (Ir), magnetic (Im), and ground fault (Ig) settings allow precise coordination. Time delays can be added to achieve grading, and pickup currents can be adjusted to create discrimination margins.',
  },
];

const faqs = [
  {
    question: 'Why is discrimination important in electrical installations?',
    answer:
      "Discrimination ensures that only the protective device nearest to a fault operates, whilst upstream devices remain closed. This minimises disruption - a fault in one circuit doesn't cause loss of supply to other healthy circuits. In critical installations (hospitals, data centres), poor discrimination could cause widespread outages. BS 7671 and good engineering practice require discrimination to be considered during design.",
  },
  {
    question: 'What is the difference between time grading and current grading?',
    answer:
      "Time grading relies on the upstream device having a longer operating time than the downstream device at the same fault current level (achieved through time delay settings). Current grading relies on the upstream device having a higher pickup current setting so it doesn't respond to fault currents that the downstream device will clear. Most effective discrimination uses a combination of both approaches.",
  },
  {
    question: 'How do I obtain discrimination data for protective devices?',
    answer:
      'Manufacturers provide time-current curves in product catalogues, technical datasheets, and coordination software. Many manufacturers offer free or subscription-based coordination software that includes their device libraries. For complex installations, coordination studies should be performed using these tools and documented as part of the design verification.',
  },
  {
    question: 'When is partial discrimination acceptable?',
    answer:
      'Partial discrimination may be acceptable where the probability of fault current exceeding the discrimination limit is low, or where limited supply interruption is tolerable. The discrimination limit (I_s) should exceed typical expected fault currents in the installation. Total discrimination is preferred for critical supplies but may not always be economically or technically achievable.',
  },
  {
    question: "Can different manufacturers' devices achieve discrimination?",
    answer:
      'Yes, provided you have accurate time-current data for both devices. However, cascading (backup protection) arrangements typically require manufacturer-tested combinations. For critical coordination, using devices from the same manufacturer simplifies analysis and may provide tested coordination tables.',
  },
  {
    question: 'What software tools are available for coordination studies?',
    answer:
      'Major manufacturers offer coordination software: ABB DOC, Schneider Electric Ecodial, Siemens SIMARIS, Eaton XPOLE, etc. There are also independent tools like ETAP, SKM PowerTools, and EasyPower. These tools import device libraries, calculate fault currents, plot overlaid time-current curves, and verify discrimination automatically.',
  },
];

const HNCModule7Section1_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section1")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 7 · Section 1 · Subsection 4"
            title="Discrimination Studies"
            description="Time-current curves, discrimination margins, cascading, backup protection, and coordination software for protective device selectivity"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Interpret and analyse time-current characteristic curves",
              "Calculate discrimination margins and verify selectivity",
              "Distinguish between total and partial discrimination",
              "Apply cascading and backup protection principles",
              "Use coordination software for protection studies",
              "Comply with BS 7671 requirements for protective coordination",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Fundamentals of Discrimination">
            <p>Discrimination (also called selectivity) is the coordination of protective devices to ensure that only the device nearest to a fault operates to clear it, whilst all upstream devices remain closed. This fundamental principle minimises the impact of faults on the wider installation.</p>
            <p><strong>Key discrimination principles:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Fault isolation:</strong> Only the device nearest to the fault should operate</li>
              <li><strong>Supply continuity:</strong> Healthy circuits remain energised</li>
              <li><strong>Time grading:</strong> Downstream devices operate faster than upstream</li>
              <li><strong>Current grading:</strong> Different pickup settings create selectivity zones</li>
            </ul>
            <p><strong>Types of Discrimination</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Total Discrimination:</strong> Selectivity achieved for all fault currents up to the maximum prospective fault current — Critical installations, hospitals, data centres</li>
              <li><strong>Partial Discrimination:</strong> Selectivity achieved only up to a defined discrimination limit (I_s) — General commercial and industrial where occasional simultaneous operation is acceptable</li>
              <li><strong>No Discrimination:</strong> Both devices may operate for any fault - no coordination — Not recommended - indicates poor design</li>
            </ul>
            <p><strong>BS 7671 Requirement</strong></p>
            <p>Regulation 536.4 states that where backup protection is used, the characteristics of the devices shall be coordinated such that the energy let-through of the upstream device does not exceed that which the downstream device and protected conductors can withstand.</p>
            <p><strong>Design principle:</strong> Discrimination should be verified at the design stage using manufacturer data and coordination studies, not assumed based on ratings alone.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Time-Current Characteristic Curves">
            <p>Time-current curves are the fundamental tool for analysing protective device coordination. They display the relationship between prospective fault current and the operating time of protective devices, enabling engineers to verify discrimination visually and analytically.</p>
            <p><strong>Curve Components</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>X-axis: Current (A or xIn)</li>
              <li>Y-axis: Time (seconds)</li>
              <li>Both axes logarithmic</li>
              <li>Tolerance bands shown</li>
            </ul>
            <p><strong>MCB Regions</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Thermal region (overload)</li>
              <li>Magnetic region (short-circuit)</li>
              <li>Type B: 3-5 x In magnetic</li>
              <li>Type C: 5-10 x In magnetic</li>
            </ul>
            <p><strong>HRC Fuse Curves</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Pre-arcing time (minimum)</li>
              <li>Total operating time (max)</li>
              <li>Current-limiting action</li>
              <li>Steep curve at high I</li>
            </ul>
            <p><strong>Reading Time-Current Curves</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Curve position (left/right):</strong> Current at which device operates — Downstream should be left of upstream</li>
              <li><strong>Curve position (up/down):</strong> Operating time for given current — Downstream should be below upstream</li>
              <li><strong>Band width (tolerance):</strong> Manufacturing variation range — Bands must not overlap for discrimination</li>
              <li><strong>Curve intersection point:</strong> Discrimination limit (I_s) — Above this current, both may operate</li>
              <li><strong>Vertical region (magnetic):</strong> Instantaneous trip zone — Most difficult region for discrimination</li>
            </ul>
            <p><strong>Example: MCB Discrimination Analysis</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Upstream:</strong> 63A Type C MCB (magnetic trip 5-10 x In = 315-630A)</li>
              <li><strong>Downstream:</strong> 32A Type B MCB (magnetic trip 3-5 x In = 96-160A)</li>
            </ul>
            <p><span>Analysis:</span></p>
            <p>Thermal region: 32A curve is left of 63A - OK</p>
            <p>Magnetic region: 32A trips at 96-160A; 63A trips at 315-630A</p>
            <p>Result: Discrimination achieved up to ~315A (I_s)</p>
            <p>Above 315A: Potential simultaneous operation</p>
            <p><strong>Best practice:</strong> Always use the maximum tolerance (worst case) curves when verifying discrimination - minimum time for downstream, maximum time for upstream.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Discrimination Margins and Calculations">
            <p>Achieving reliable discrimination requires adequate margins between device characteristics. These margins account for manufacturing tolerances, temperature variations, and the physics of fault current interruption.</p>
            <p><strong>Discrimination Ratios (Typical Guidelines)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>HRC Fuses (gG):</strong> Ratio &gt; 1.6:1 (upstream:downstream rating)</li>
              <li><strong>MCBs same type:</strong> Ratio &gt; 2:1 often needed for thermal region</li>
              <li><strong>MCCB to MCB:</strong> Use manufacturer coordination tables</li>
              <li><strong>Time delay relays:</strong> Minimum 0.3-0.4s grading margin</li>
            </ul>
            <p>Note: Always verify with manufacturer data - these are indicative only</p>
            <p><strong>I²t Energy Coordination</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>I²t let-through:</strong> Energy passed during fault clearance (A²s)</li>
              <li><strong>Pre-arcing I²t:</strong> Energy to initiate arc in fuse element</li>
              <li><strong>Total I²t:</strong> Pre-arcing plus arcing energy</li>
              <li><strong>Rule:</strong> Upstream total I²t &gt; Downstream pre-arcing I²t for discrimination</li>
            </ul>
            <p><strong>Time Grading Margins</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Electromechanical relays:</strong> 0.4 - 0.5 seconds — Accounts for overshoot and reset time</li>
              <li><strong>Digital/numerical relays:</strong> 0.2 - 0.3 seconds — Faster operation, less overshoot</li>
              <li><strong>MCCBs with time delay:</strong> 0.1 - 0.2 seconds — Manufacturer specific - verify data</li>
              <li><strong>Fuses only:</strong> Use I²t analysis — Time comparison less reliable for fuses</li>
            </ul>
            <p><strong>Calculation Example: Fuse Discrimination</strong></p>
            <p>Given:</p>
            <p><span> Upstream: 100A gG fuse, I²t let-through = 15,000 A²s at 10kA </span></p>
            <p><span> Downstream: 63A gG fuse, Pre-arcing I²t = 8,000 A²s at 10kA </span></p>
            <p>Verification:</p>
            <p><span> Upstream total I²t (15,000) &gt; Downstream pre-arcing I²t (8,000) </span></p>
            <p>Result: Discrimination achieved at 10kA fault level</p>
            <p>Rating ratio: 100/63 = 1.59:1 (close to 1.6:1 guideline)</p>
            <p><strong>Critical note:</strong> I²t values vary with prospective fault current. Always check discrimination at the actual fault current levels expected in the installation.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Cascading and Backup Protection">
            <p>Cascading (backup protection) is a coordination technique where an upstream device with high breaking capacity supplements a downstream device with lower breaking capacity. This allows use of smaller, more economical devices where prospective fault currents are high.</p>
            <p><strong>Cascading principles:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Current limitation:</strong> Upstream device limits fault current before downstream reaches breaking capacity</li>
              <li><strong>Energy limitation:</strong> I²t let-through kept within downstream device withstand</li>
              <li><strong>Tested combinations:</strong> Only manufacturer-verified pairings are valid</li>
              <li><strong>Enhanced rating:</strong> Combination achieves higher breaking capacity than individual devices</li>
            </ul>
            <p><strong>Cascading Requirements (BS 7671 / BS EN 60947-2)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Type-tested combination:</strong> Devices must be tested together per standards — Manufacturer coordination tables</li>
              <li><strong>Stated enhanced Ics:</strong> Combined service breaking capacity documented — Technical datasheets, software</li>
              <li><strong>Same manufacturer:</strong> Generally required for cascading validity — Manufacturer confirmation</li>
              <li><strong>Cable protection maintained:</strong> I²t let-through &lt; cable k²S² — Adiabatic calculation</li>
            </ul>
            <p><strong>Advantages of Cascading</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Lower cost downstream devices</li>
              <li>Reduced panel space</li>
              <li>Smaller cable requirements upstream</li>
              <li>System standardisation possible</li>
            </ul>
            <p><strong>Limitations and Risks</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Both devices may operate (nuisance trip)</li>
              <li>Limited to specific combinations</li>
              <li>Documentation essential</li>
              <li>Replacement must match exactly</li>
            </ul>
            <p><strong>Important Warning</strong></p>
            <p>Cascading is NOT discrimination. In a cascading arrangement, both devices typically operate during a high-level fault. The purpose is breaking capacity enhancement, not selectivity. Discrimination and cascading are different coordination objectives that may conflict.</p>
            <p><strong>Cascading Example</strong></p>
            <p>Installation conditions:</p>
            <p><span> Prospective fault current at distribution board: 25kA </span></p>
            <p>Without cascading:</p>
            <p><span> MCB required breaking capacity: ≥25kA (expensive, limited options) </span></p>
            <p>With cascading (manufacturer-verified):</p>
            <p><span> MCCB upstream: 50kA breaking capacity (current limiting) </span></p>
            <p><span>MCB downstream: 10kA individual rating</span></p>
            <p><span> Combined enhanced rating: 25kA (from coordination tables) </span></p>
            <p>Result: Compliant and more economical solution</p>
            <p><strong>Design decision:</strong> When specifying cascading, consider whether discrimination is also required. If both upstream and downstream devices operate, supply to all downstream circuits is lost - this may or may not be acceptable.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: MCB Discrimination Analysis</strong>
            </p>
            <p><strong>Scenario:</strong> Verify discrimination between 100A Type C MCB (upstream) and 32A Type B MCB (downstream).</p>
            <p>Device characteristics:</p>
            <p>Upstream: 100A Type C</p>
            <p>- Thermal trip: Per BS EN 60898 (inverse time)</p>
            <p>- Magnetic trip: 5-10 x In = 500-1000A</p>
            <p>Downstream: 32A Type B</p>
            <p>- Thermal trip: Per BS EN 60898 (inverse time)</p>
            <p>- Magnetic trip: 3-5 x In = 96-160A</p>
            <p>Analysis at different fault levels:</p>
            <p>At 96A (1 x upstream magnetic threshold minimum):</p>
            <p>Downstream trips (magnetic), upstream not activated</p>
            <p>At 200A:</p>
            <p>Downstream trips, upstream in thermal region only</p>
            <p>At 500A (upstream magnetic region begins):</p>
            <p>Both in magnetic region - potential simultaneous trip</p>
            <p>Result:</p>
            <p>Discrimination limit (I_s) ≈ 500A</p>
            <p>Partial discrimination - acceptable if Ipf &lt; 500A at downstream</p>
            <p>
              <strong>Example 2: Fuse-to-Fuse Discrimination</strong>
            </p>
            <p><strong>Scenario:</strong> Verify discrimination between 160A and 100A gG HRC fuses at 20kA fault level.</p>
            <p>Given data (from manufacturer curves at 20kA):</p>
            <p>160A fuse: Pre-arcing I²t = 65,000 A²s</p>
            <p>160A fuse: Total operating I²t = 120,000 A²s</p>
            <p>100A fuse: Pre-arcing I²t = 22,000 A²s</p>
            <p>100A fuse: Total operating I²t = 48,000 A²s</p>
            <p>Discrimination check:</p>
            <p>Upstream total I²t (160A): 120,000 A²s</p>
            <p>Downstream pre-arcing I²t (100A): 22,000 A²s</p>
            <p>120,000 &gt; 22,000 ✓</p>
            <p>Result: Full discrimination achieved at 20kA</p>
            <p>Rating ratio: 160/100 = 1.6:1 (meets guideline)</p>
            <p>Also check at other fault current levels</p>
            <p>
              <strong>Example 3: MCCB Time Grading</strong>
            </p>
            <p><strong>Scenario:</strong> Set time delays for 400A and 250A MCCBs to achieve discrimination.</p>
            <p>System requirements:</p>
            <p>Maximum Ipf at downstream MCCB: 15kA</p>
            <p>Downstream 250A MCCB clearing time at 15kA: 50ms (instantaneous)</p>
            <p>Grading margin calculation:</p>
            <p>Minimum grading margin for MCCBs: 100ms (manufacturer recommendation)</p>
            <p>Upstream 400A MCCB time delay required:</p>
            <p>= Downstream time + Grading margin + Safety factor</p>
            <p>= 50ms + 100ms + 50ms = 200ms</p>
            <p>Settings:</p>
            <p>Downstream 250A: Instantaneous (no intentional delay)</p>
            <p>Upstream 400A: Short-time delay = 200ms at Isd</p>
            <p>Result: Time-graded discrimination achieved</p>
            <p>Note: Increased fault duration - check cable withstand</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Discrimination Study Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Obtain fault level data from supply authority (Ipf at intake)</li>
              <li>Calculate prospective fault current at each distribution point</li>
              <li>Select protective devices considering discrimination requirements</li>
              <li>Obtain time-current curves from manufacturers</li>
              <li>Plot overlaid curves and identify discrimination limits</li>
              <li>Verify cascading combinations if used</li>
              <li>Document coordination study in design records</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>HRC fuse discrimination ratio: <strong>≥1.6:1</strong> (gG type)</li>
              <li>MCB discrimination: Often requires <strong>≥2:1</strong> ratio</li>
              <li>Electromechanical relay grading: <strong>0.4-0.5s</strong> margin</li>
              <li>Digital relay grading: <strong>0.2-0.3s</strong> margin</li>
              <li>Type B MCB magnetic: <strong>3-5 x In</strong></li>
              <li>Type C MCB magnetic: <strong>5-10 x In</strong></li>
              <li>Type D MCB magnetic: <strong>10-20 x In</strong></li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Assuming discrimination from ratings:</strong> Always verify with curves/data</li>
                <li><strong>Ignoring tolerance bands:</strong> Use worst-case manufacturer data</li>
                <li><strong>Mixing cascading and discrimination:</strong> These are different objectives</li>
                <li><strong>Not documenting coordination:</strong> Required for design verification</li>
                <li><strong>Ignoring motor contribution:</strong> Motors add to fault current initially</li>
                <li><strong>Using untested cascading combinations:</strong> Only verified pairs are valid</li>
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
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section1-3")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Cable sizing calculations
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section1-5")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Power quality
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule7Section1_4;
